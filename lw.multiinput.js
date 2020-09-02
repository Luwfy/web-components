
LW('lw-multi-input', class MultiInput extends LW.Input {
    // Button's properties.
    static get properties() {
        return {
            'separator': {
                value: ', ',
                type: 'string'
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

        targetItem.classList.toggle('active');

        const isActive = targetItem.classList.contains('active'),
            itemData = { label: targetItem.getAttribute('data-label'), value: targetItem.getAttribute('value') };

        if (isActive) {
            that._selectedItems.push(itemData);
            targetItem.setAttribute('aria-selected', true);
            that._setActiveDescendant(targetItem);
        }
        else {
            const itemIndex = that._selectedItems.findIndex(item => item.label === itemData.label && item.value === itemData.value);

            if (itemIndex > -1) {
                that._selectedItems.splice(itemIndex, 1);
            }

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

        label = label.join(that.separator);
        that.set('value', label);
        that.$.input.dataValue = value = value.join(that.separator);

        if (label !== oldLabel || value !== oldValue) {
            that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
        }
    }

    close() {
        const that = this;

        if (!that.opened) {
            return false;
        }

        if (that.timer) {
            clearTimeout(that.timer);
        }

        that.timer = setTimeout(function () {
            if (that.$.scrollView.parentNode && !that.opened) {
                that.$.scrollView.remove();
                that.removeAttribute('aria-owns');

                if (!that.readonly) {
                    that.$.input.removeAttribute('aria-controls');
                }

            }
        }, 1000);

        that.$.scrollView.removeAttribute('open');
        that.$.dropDownButton.removeAttribute('open');
        that.$.input.removeAttribute('open');
        that.removeAttribute('open');

        that.opened = false;
        that.setAttribute('aria-expanded', false);
        that.$.input.focus();
        return true;
    }

    open() {
        const that = this;

        let items;

        if (!that.dropDownDataSource) {
            items = typeof that.dropDownDataSource === 'function' ? that.dropDownDataSource(that.query) : that.dropDownDataSource;
        }
        else {
            that.query = '';
            items = typeof that.dataSource === 'function' ? that.dataSource(that.query) : that.dataSource;
        }

        that._process(items);

        that.ensureVisible();

        that.$.input.focus();
        setTimeout(function () {
            that.$.input.focus();
        }, 25);
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
                listItem.classList.add('active');
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

            that._performSelect(first);
            return;
        }

        if (that._selectedItems) {
            that._selectedItems = [];
        }

        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
            items[i].setAttribute('aria-selected', false);
        }

        that._setActiveDescendant();

        let next = active.nextElementSibling;

        if (!next) {
            next = that.$.menu.firstElementChild;
        }

        that._performSelect(next);
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

            that._performSelect(first);
            return;
        }

        if (that._selectedItems) {
            that._selectedItems = [];
        }

        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
            items[i].setAttribute('aria-selected', false);
        }

        that._setActiveDescendant();

        let prev = active.previousElementSibling;

        if (!prev) {
            prev = that.$.menu.lastElementChild;
        }

        that._performSelect(prev);
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

                that._performSelect();
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
                items[i].classList.remove('active');
                items[i].setAttribute('aria-selected', false);
            }

            that._setActiveDescendant();
        }
        else if (propertyName === 'separator') {
            that.set('value', that.value.replace(new RegExp(oldValue, 'g'), newValue));

            if (that.$.input.dataValue) {
                that.$.input.dataValue = that.$.input.dataValue.replace(new RegExp(oldValue, 'g'), newValue);
            }
        }
        else {
            super.propertyChangedHandler(propertyName, oldValue, newValue);
        }
    }

    _createElement() {
        const that = this;
        const menu = document.createElement('ul');
        const scrollView = document.createElement('lw-scroll-viewer');

        scrollView.rightToLeft = that.rightToLeft;

        scrollView.theme = that.theme;
        scrollView.horizontalScrollBarVisibility = 'hidden';
        scrollView.classList.add('lw-multi-input-drop-down-menu');

        that.inverted ?
            scrollView.setAttribute('inverted', '') :
            scrollView.removeAttribute('inverted');

        that.classList.add('lw-input');

        menu.setAttribute('aria-multiselectable', true);

        that.$.scrollView = scrollView;
        that.$.menu = menu;

        //that.$.inputContainer.tabIndex = 0;
        that.$.menu.onclick = function (event) {
            event.stopPropagation()
            event.preventDefault()

            that._performSelect(event);
            that.$.input.focus();
        }
    }

    /**
     * Sets WAI-ARIA property aria-activedescendant.
     */
    _setActiveDescendant(item) {
        const that = this;

        if (!that.readonly) {
            if (item) {
                that.setAttribute('aria-activedescendant', item.id);
            }
            else {
                that.removeAttribute('aria-activedescendant');
            }
        }
    }
});