
LW('lw-check-input', class CheckInput extends LW.MultiInput {
    // Button's properties.
    static get properties() {
        return {
            'inverted': {
                type: 'boolean',
                value: false
            }
        };
    }

    _performSelect(event) {
        const that = this;

        if (!event) {
            that.close();
            return;
        }

        const targetItem = !event.target ? event : event.target.closest('li');

        if (!targetItem) {
            return;
        }

        if (!that._selectedItems) {
            that._selectedItems = [];
        }

        targetItem.classList.toggle('selected');

        const isActive = targetItem.classList.contains('selected'),
            itemData = { label: targetItem.getAttribute('data-label'), value: targetItem.getAttribute('value') },
            items = that.$.menu.children;

        //Remove active state(checkbox bubble)
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }

        if (isActive) {
            that._selectedItems.push(itemData);
            that._setActiveDescendant(targetItem);
            targetItem.classList.add('active');
            targetItem.setAttribute('aria-selected', true);
        }
        else {
            const itemIndex = that._selectedItems.findIndex(item => item.label === itemData.label && item.value === itemData.value);

            if (itemIndex > -1) {
                that._selectedItems.splice(itemIndex, 1);
            }

            targetItem.classList.remove('active');
            targetItem.setAttribute('aria-selected', false);
        }

        targetItem.setAttribute('aria-selected', isActive);

        const targetItems = that._selectedItems,
            oldLabel = that.value,
            oldValue = that.$.input.dataValue;
        let [label, value] = [[], []];

        for (let i = 0; i < targetItems.length; i++) {
            const item = targetItems[i];

            label.push(item.label);
            value.push(item.value);
        }

        label = label.join(', ');
        that.set('value', label);
        that.$.input.dataValue = value = value.join(', ');

        if (label !== oldLabel || value !== oldValue) {
            that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
        }
    }

    _render(items) {
        const that = this;

        const listItems = items.map(function (item) {
            let label = item,
                value = item;

            if (typeof item === 'object') {
                label = item.label;
                value = item.value || label;
            }

            const listItem = document.createElement('li');
            const anchor = document.createElement('a');

            anchor.href = '#';
            listItem.id = that.id + 'Item' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            listItem.setAttribute('data-label', label);
            listItem.setAttribute('value', value);
            listItem.setAttribute('role', 'option');
            listItem.setAttribute('aria-selected', false);
            listItem.setAttribute('aria-label', label);
            anchor.innerHTML = that.highlighter ? that.highlighter(label) : that._highlighter(label);
            anchor.setAttribute('aria-hidden', true);

            if (item.icon) {
                anchor.classList.add('icon');
                anchor.classList.add(item.icon);
            }

            listItem.appendChild(anchor);

            return listItem;
        })

        that.$.menu.innerHTML = '';

        if (!that._selectedItems) {
            that._selectedItems = [];
        }

        const selectedValues = (that.$.input.dataValue || that.$.input.value).split(',').map(v => v.trim()),
            selectedLabels = that.$.input.value.split(',').map(l => l.trim());

        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i],
                value = listItem.getAttribute('value'),
                label = listItem.getAttribute('data-label'),
                itemIndex = selectedValues.indexOf(value);

            if (itemIndex > -1 && selectedLabels[itemIndex] === label) {
                listItem.classList.add('selected');
                listItem.setAttribute('aria-selected', true);
                that._setActiveDescendant(listItem);

                const itemIndex = that._selectedItems.findIndex(item => item.label === label && item.value === value);

                if (itemIndex < 0) {
                    that._selectedItems.push({ label: listItem.getAttribute('data-label'), value: listItem.getAttribute('value') });
                }
            }

            that.$.menu.appendChild(listItem);
        }
    }

    _next() {
        const that = this;
        let activeItem = that._selectedItems ? that._selectedItems[that._selectedItems.length - 1] : undefined;

        if (activeItem) {
            activeItem = that.$.menu.querySelector(`.active[data-label="${activeItem.label}"][value="${activeItem.value}"]`);
        }

        const active = activeItem || that.$.menu.querySelector('.active');

        if (!active) {
            const first = that.$.menu.firstElementChild;

            first.classList.add('active', 'focused');
            that._setActiveDescendant(first);
            return;
        }

        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active', 'focused');
        }

        that._setActiveDescendant();

        let next = active.nextElementSibling;

        if (!next) {
            next = that.$.menu.firstElementChild;
        }

        next.classList.add('active', 'focused');
        that._setActiveDescendant(next);
        that.ensureVisible();
    }

    _prev() {
        const that = this;
        let activeItem = that._selectedItems ? that._selectedItems[that._selectedItems.length - 1] : undefined;

        if (activeItem) {
            activeItem = that.$.menu.querySelector(`.active[data-label="${activeItem.label}"][value="${activeItem.value}"]`);
        }

        const active = activeItem || that.$.menu.querySelector('.active');

        if (!active) {
            const first = that.$.menu.firstElementChild;

            first.classList.add('active', 'focused');
            that._setActiveDescendant(first);
            return;
        }

        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active', 'focused');
        }

        that._setActiveDescendant();

        let prev = active.previousElementSibling;

        if (!prev) {
            prev = that.$.menu.lastElementChild;
        }

        prev.classList.add('active', 'focused');
        that._setActiveDescendant(prev);
        that.ensureVisible();
    }

    _keyUpHandler(event) {
        const that = this;

        if (event.shiftKey) {
            return;
        }

        switch (event.keyCode) {
            case 40: // down arrow
            case 38: // up arrow
            case 16: // shift
            case 17: // ctrl
            case 18: // alt
                if (event.keyCode === 40 && event.altKey) {
                    that.open();
                }
                if (event.keyCode === 38 && event.altKey) {
                    that.close();
                }

                break;

            case 9: // tab
            case 13: // enter
                if (!that.opened) {
                    return;
                }

                that._performSelect(that.$.menu.querySelector('.active'));
                event.stopPropagation()
                event.preventDefault()
                break

            case 27: // escape
                if (!that.opened) {
                    return;
                }

                that.close();
                event.stopPropagation()
                event.preventDefault()
                break

            default:
                that._lookup(event);
                if (that.opened && !event.ctrlKey && !event.shiftKey) {
                    event.stopPropagation()
                    event.preventDefault()
                }

                if (!that.readonly) {
                    that.$.input.dataValue = that.$.input.value;
                }
        }

    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        if (propertyName === 'value') {
            if (that.displayMember !== that.valueMember && typeof newValue !== 'string') {
                that.value = newValue[that.displayMember];
                that.$.input.dataValue = newValue[that.valueMember];
            }
            else {
                that.$.input.value = newValue;
            }

            that._selectedItems = [];

            //Unselect all items
            const items = that.$.menu.children;

            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('selected');
                items[i].setAttribute('aria-selected', false);
            }

            that._setActiveDescendant(that.$.menu.querySelector('active'));
        }
        else {
            super.propertyChangedHandler(propertyName, oldValue, newValue);
        }
    }

    _createElement() {
        const that = this;

        super._createElement();

        that.$.menu.setAttribute('aria-multiselectable', true);
        that.$.scrollView.classList.add('lw-check-input-drop-down-menu');
    }
});