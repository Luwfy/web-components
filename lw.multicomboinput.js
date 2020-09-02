
LW('lw-multi-combo-input', class MultiComboInput extends LW.CheckInput {
    // Button's properties.
    static get properties() {
        return {
            'inputTagsMode': {
                allowedValues: ['one', 'many'],
                value: 'many',
                type: 'string'
            },
            'hideInputTagsCloseButton': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                value: {
                    'en': {
                        'tagLabel': ' item(s) selected',
                        'selectAll': 'Select All',
                        'unselectAll': 'Unselect All'
                    }
                },
                type: 'object',
                extend: true
            },
            'selectAll': {
                value: false,
                type: 'boolean'
            }
        };
    }

    /** Button's template. */
    template() {
        return '<div id="inputContainer" role="presentation"><div class="lw-action-button" role="presentation" id="actionButton"> <input class="lw-input" id=\'input\' readonly=\'[[readonly]]\' placeholder=\'[[placeholder]]\' type=\'[[type]]\' name=\'[[name]]\' disabled=\'[[disabled]]\' aria-label="[[placeholder]]" /></div><span class="lw-hidden lw-hint" id="span">[[hint]]</span><div id="dropDownButton" tabindex=-1 class="lw-drop-down-button" role="button" aria-label="Toggle popup"><div id="arrow" class="arrow" aria-hidden="true"></div></div></div>';
    }

    _downHandler(event) {
        const that = this,
            target = event.originalEvent.target;

        if ((that._tokenCloseButtonClick = target.closest('.lw-drop-down-list-unselect-button'))) {
            return;
        }

        if (that.readonly) {
            that._dropDownButtonDownHandler(event);
        }
    }

    _documentUpHandler(event) {
        const that = this;

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (that._tokenCloseButtonClick && that._tokenCloseButtonClick === target.closest('.lw-drop-down-list-unselect-button')) {
            const token = target.closest('.lw-token'),
                [tokenLabel, tokenValue] = [token.getAttribute('data-label'), token.getAttribute('value')],
                itemIndex = that._selectedItems.findIndex(i => tokenLabel === i.label && tokenValue === i.value),
                [oldLabel, oldValue] = [that.value, that.$.input.dataValue];
            let value, label;

            if (itemIndex > -1) {
                that._selectedItems.splice(itemIndex, 1);
            }

            that.set('value', label = that._selectedItems.map(i => i.label).join(that.separator));
            that.$.input.dataValue = value = that._selectedItems.map(i => i.value).join(that.separator);

            if (that.$.actionButton.contains(token)) {
                that.$.actionButton.removeChild(token);
            }

            that.close();

            if (label !== oldLabel || value !== oldValue) {
                that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
            }

            return;
        }

        if (that.contains(target)) {
            return;
        }

        if (that.$.dropDownContainer.contains(target.shadowParent || target)) {
            if (that._isPointerDown) {
                that._isPointerDown = false;

                if (that.opened) {
                    that._preventLookup = true;
                }

                that.$.input.focus();
            }

            return;
        }

        if (that.opened) {
            that._preventLookup = true;
        }

        if (!that._isPointerDown) {
            that.close();
        }

        that._isPointerDown = false;
    }

    _performSelect(event, noChangeEvent) {
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
            items[i].setAttribute('aria-selected', false);
        }

        if (isActive) {
            that._selectedItems.push(itemData);

            if (!event.noActiveState) {
                that._setActiveDescendant(targetItem);
                targetItem.classList.add('active');
            }
        }
        else {
            const itemIndex = that._selectedItems.findIndex(item => item.label === itemData.label && item.value === itemData.value);

            if (itemIndex > -1) {
                that._selectedItems.splice(itemIndex, 1);
            }

            targetItem.classList.remove('active');
        }

        targetItem.setAttribute('aria-selected', isActive);

        that._updateValue(noChangeEvent);
    }

    _updateValue(noChangeEvent) {
        const that = this;
        const targetItems = that._selectedItems,
            oldLabel = that.value,
            oldValue = that.$.input.dataValue;
        let [label, value] = [[], []];

        for (let i = 0; i < targetItems.length; i++) {
            const item = targetItems[i];

            label.push(item.label);
            value.push(item.value);
        }

        that._createTags();

        label = label.join(that.separator);
        that.set('value', label);
        that.$.input.dataValue = value = value.join(that.separator);
        that.$.input.value = '';
        if (that.value === '') {
            that.removeAttribute('value');
        }
        else {
            that.setAttribute('value', that.value);
        }

        if (!noChangeEvent && (label !== oldLabel || value !== oldValue)) {
            that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
        }

        if (that.selectAll) {
            that._setSelectAllItemState();
        }

        if (!that.opened) {
            return;
        }

        //Reposition the scrollView
        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;

        that.$.dropDownContainer.style.left = -3 + rect.left + scrollX + 'px';
        that.$.dropDownContainer.style.top = rect.bottom + scrollY + 1 + 'px';
    }


    _createTags() {
        const that = this;
        const targetItems = that._selectedItems || [];
        let fragment = document.createDocumentFragment();
        let token;

        while (that.$.actionButton.firstElementChild.nodeName === 'SPAN') {
            that.$.actionButton.removeChild(that.$.actionButton.firstElementChild)
        }

        for (let i = 0; i < targetItems.length; i++) {
            const item = targetItems[i];

            if (that.inputTagsMode === 'one' && !token || that.inputTagsMode === 'many') {
                const itemLabel = that.inputTagsMode === 'one' ? targetItems.length + that.localize('tagLabel') : item.label;

                token = document.createElement('span');
                token.classList.add('lw-token');
                token.innerHTML = '<span class=\'lw-drop-down-list-selection-label\' role="presentation">' + itemLabel + '</span><span class=\'lw-drop-down-list-unselect-button\' role="button" aria-label="Unselect"></span>';

                if (that.inputTagsMode === 'many') {
                    token.setAttribute('data-label', item.label);
                    token.setAttribute('value', item.value);
                    token.setAttribute('separator', that.separator);
                }

                fragment.appendChild(token);
            }
        }

        that.$.actionButton.insertBefore(fragment, that.$.input);

        //Reposition the scrollView
        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;

        that.$.scrollView.style.left = -3 + rect.left + scrollX + 'px';
        that.$.scrollView.style.top = rect.bottom + scrollY + 1 + 'px';
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

        let selectedValues = that._selectedItems.map(i => i.value);

        if (!selectedValues.length) {
            selectedValues = (that.$.input.dataValue || that.$.input.value).split(that.separator).map(v => v.trim())
        }

        let selectedLabels = Array.from(that.$.actionButton.getElementsByClassName('lw-token')).map(i => i.textContent.trim());

        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i],
                value = listItem.getAttribute('value'),
                label = listItem.getAttribute('data-label'),
                itemIndex = selectedValues.indexOf(value);

            if (itemIndex > -1 && (that.inputTagsMode === 'one' || selectedLabels[itemIndex] === label)) {
                listItem.classList.add('selected');
                listItem.setAttribute('aria-selected', true);
                that._setActiveDescendant(listItem);

                const itemIndex = that._selectedItems.findIndex(item => item.label === label && item.value === value);

                if (itemIndex < 0) {
                    that._selectedItems.push({ label: listItem.getAttribute('data-label'), value: listItem.getAttribute('value') });
                }
            }

            that._setSelectAllItemState();

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

    _keyDownHandler(event) {
        const that = this;

        that._suppressKeyPressRepeat = ![40, 38, 9, 13, 27, 16, 17, 18].includes(event.keyCode);

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            delete that._inputValue;
            return;
        }

        that._move(event);
        that._inputValue = that.$.input.value;
    }

    _keyUpHandler(event) {
        const that = this;

        //update value
        let inputValue = that.$.input.value;

        if (that._selectedItems) {
            inputValue = that._selectedItems.map(i => i.label)
            inputValue.push(that.$.input.value);
            inputValue = inputValue.join(that.separator);
        }

        that.set('value', inputValue);
        if (that.value === '') {
            that.removeAttribute('value');
        }
        else {
            that.setAttribute('value', inputValue);
        }

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

            case 8: { // Backspace
                if (that.readonly) {
                    break;
                }

                if (that.opened) {
                    that.close();
                }

                if (that._inputValue && that._inputValue.length) {
                    break;
                }

                if (!that._selectedItems) {
                    if (!that.readonly) {
                        that.$.input.dataValue = that.$.input.value;
                    }

                    break;
                }

                const lastSelectedItem = that._selectedItems[that._selectedItems.length - 1];

                if (!lastSelectedItem) {
                    break;
                }

                const targetItem = that.$.menu.querySelector(`li[data-label="${lastSelectedItem.label}"][value="${lastSelectedItem.value}"]`);

                if (targetItem) {
                    that._performSelect(targetItem);
                }
                else {
                    that._selectedItems.pop();
                    that._updateValue();
                }
                break;
            }
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
        }

        delete that._inputValue;
    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        if (propertyName === 'value') {
            if (that.displayMember !== that.valueMember && typeof newValue !== 'string') {
                that.value = newValue[that.displayMember];
                that.$.input.dataValue = newValue[that.valueMember];
            }
            else {
                that.$.input.dataValue = '';
                that.$.input.value = newValue;
            }

            that._selectedItems = [];

            while (that.$.actionButton.firstElementChild.nodeName === 'SPAN') {
                that.$.actionButton.removeChild(that.$.actionButton.firstElementChild)
            }

            //Unselect all items
            const items = that.$.menu.children;

            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('selected');
                items[i].setAttribute('aria-selected', false);
            }

            that._setActiveDescendant(that.$.menu.querySelector('active'));
        }
        else if (propertyName === 'separator') {
            const tokens = that.$.actionButton.children;

            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];

                if (!token.classList.contains('lw-token')) {
                    continue;
                }

                token.setAttribute('separator', newValue);
            }
        }
        else if (propertyName === 'inputTagsMode') {
            that._createTags();
        }
        else if (propertyName === 'theme' || propertyName === 'rightToLeft') {
            that.$.scrollView[propertyName] = newValue;

            if (newValue) {
                that.$.dropDownContainer.setAttribute(LW.Utilities.Core.toDash(propertyName), '');
            }
            else {
                that.$.dropDownContainer.removeAttribute(LW.Utilities.Core.toDash(propertyName));
            }
        }
        else if (propertyName === 'inverted') {
            newValue ? that.$.dropDownContainer.setAttribute('inverted', '') : that.$.dropDownContainer.removeAttribute('inverted');
        }
        else if (propertyName === 'selectAll') {
            that._handleSelectAllItem();
        }
        else {
            super.propertyChangedHandler(propertyName, oldValue, newValue);
        }
    }

    _createElement() {
        const that = this;
        const menu = document.createElement('ul');
        const scrollView = document.createElement('lw-scroll-viewer');
        const dropDownContainer = document.createElement('div');

        scrollView.rightToLeft = that.rightToLeft;
        scrollView.theme = that.theme;
        scrollView.horizontalScrollBarVisibility = 'hidden';
        scrollView.classList.add('lw-multi-combo-input-scroll-viewer');

        if (that.rightToLeft) {
            dropDownContainer.setAttribute('right-to-left', '');
        }

        dropDownContainer.setAttribute('theme', that.theme);
        dropDownContainer.classList.add('lw-multi-combo-input-drop-down-menu', 'lw-input-drop-down-menu', 'lw-check-input-drop-down-menu');

        that.inverted ?
            dropDownContainer.setAttribute('inverted', '') :
            dropDownContainer.removeAttribute('inverted');

        that.classList.add('lw-input');

        dropDownContainer.appendChild(scrollView);

        menu.setAttribute('aria-multiselectable', true);

        that.$.scrollView = scrollView;
        that.$.menu = menu;
        that.$.dropDownContainer = dropDownContainer;

        //that.$.inputContainer.tabIndex = 0;
        that.$.menu.onclick = function (event) {
            event.stopPropagation()
            event.preventDefault()

            that._performSelect(event);
            that.$.input.focus();
        }

        that.classList.add('lw-input');

        that.$.input.value = that.value;

        that._handleSelectAllItem();
    }

    _handleSelectAllItem() {
        const that = this;

        if (!that.selectAll) {
            if (that.$.selectAll) {
                that.$.selectAll.remove();
            }

            return;
        }

        if (!that.$.selectAll) {
            const listContainer = document.createElement('ul');
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');

            anchor.href = '#';
            anchor.innerHTML = that.localize('selectAll');
            anchor.setAttribute('aria-hidden', true);

            listItem.id = that.id + 'Item' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            listItem.setAttribute('role', 'option');
            listItem.setAttribute('value', that.localize('selectAll'));
            listItem.setAttribute('aria-label', that.localize('selectAll'));
            listItem.classList.add('lw-select-all');
            listItem.appendChild(anchor);

            listItem.onclick = function (event) {
                event.stopPropagation()
                event.preventDefault();

                if (Array.from(that.$.menu.children).find(item => !item.classList.contains('selected'))) {
                    that._selectAll();
                }
                else {
                    that._clearSelection();
                }

                that._setSelectAllItemState();

                if (listItem.classList.contains('selected')) {
                    listItem.classList.add('active');
                }

                that.$.input.focus();
            }

            listContainer.appendChild(listItem);

            that.$.selectAll = listContainer;
        }

        that._setSelectAllItemState();
        that.$.dropDownContainer.insertBefore(that.$.selectAll, that.$.scrollView);
    }

    _setSelectAllItemState() {
        const that = this;

        if (!that.$.selectAll) {
            return;
        }

        const selectAllItem = that.$.selectAll.firstElementChild,
            anchor = selectAllItem.firstElementChild,
            areAllItemsSelected = !Array.from(that.$.menu.children).find(item => !item.classList.contains('selected'));

        selectAllItem.removeAttribute('indeterminate');
        selectAllItem.classList.remove('selected', 'active');

        anchor.innerHTML = that.localize('selectAll');

        if (that._selectedItems && that._selectedItems.length > 0) {
            if (areAllItemsSelected) {
                selectAllItem.classList.add('selected');
                anchor.innerHTML = that.localize('unselectAll');
            }
            else {
                selectAllItem.setAttribute('indeterminate', '');
            }
        }
    }

    _selectAll() {
        const that = this,
            selectedItemsCount = that._selectedItems.length,
            oldValue = that.$.input.dataValue,
            oldLabel = that.value;

        //Unselect all items
        that._clearSelection(true);

        //Unselect all items
        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (!item.classList.contains('selected')) {
                that._performSelect({ target: items[i], noActiveState: true }, true);
            }
        }

        if (selectedItemsCount !== that._selectedItems.length) {
            that.$.fireEvent('change', { value: that.$.input.dataValue, label: that.value, oldValue: oldValue, oldLabel: oldLabel });
        }
    }

    _clearSelection(noChangeEvent) {
        const that = this;

        if (!that._selectedItems.length) {
            return;
        }

        const oldValue = that.$.input.dataValue,
            oldLabel = that.value;

        that.$.input.dataValue = '';
        that.value = that.$.input.value;

        that._selectedItems = [];

        while (that.$.actionButton.firstElementChild.nodeName === 'SPAN') {
            that.$.actionButton.removeChild(that.$.actionButton.firstElementChild)
        }

        //Unselect all items
        const items = that.$.menu.children;

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('selected');
            items[i].classList.remove('active');
            items[i].setAttribute('aria-selected', false);
        }

        that._setActiveDescendant(that.$.menu.querySelector('active'));

        if (!noChangeEvent) {
            that.$.fireEvent('change', { value: '', label: '', oldValue: oldValue, oldLabel: oldLabel });
        }

        //Reposition the scrollView
        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;

        that.$.dropDownContainer.style.left = -3 + rect.left + scrollX + 'px';
        that.$.dropDownContainer.style.top = rect.bottom + scrollY + 1 + 'px';
    }

    _open() {
        const that = this;
        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;
        let xCorrection = 0,
            yCorrection = 0;

        if (this.opened) {
            return;
        }

        if (that.timer) {
            clearTimeout(that.timer);
        }

        that.$.scrollView.classList.remove('lw-input-drop-down-menu');

        that.$.dropDownContainer.id = that.id + '_' + that.tagName.toLowerCase() + '_menu_' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

        document.body.appendChild(that.$.dropDownContainer);

        that.setAttribute('aria-owns', that.$.dropDownContainer.id);

        if (!that.readonly) {
            that.$.input.setAttribute('aria-controls', that.$.dropDownContainer.id);
        }

        if (that.$.scrollView.enableShadowDOM && !that._importedStyle) {
            that.$.scrollView.importStyle(that._getStyleUrl('lw.textbox.css'));
            that._importedStyle = true;
        }

        if (getComputedStyle(document.body).position !== 'static') {
            const bodyRect = document.body.getBoundingClientRect();

            xCorrection = bodyRect.left;
            yCorrection = bodyRect.top;
        }

        that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', '');
        that.$.dropDownContainer.style.left = -3 + rect.left + scrollX - xCorrection + 'px';
        that.$.dropDownContainer.style.top = rect.bottom + scrollY - yCorrection + 1 + 'px';
        that.$.dropDownContainer.classList.remove('open');


        that.$.dropDownContainer.onpointerdown = function () {
            that._isPointerDown = true;
        }

        requestAnimationFrame(function () {
            const dropDownWidth = that.dropDownWidth;

            if (that.$.scrollView.refresh) {
                that.$.scrollView.refresh();
            }

            that._refreshMenu();
            that.$.dropDownContainer.setAttribute('open', '');
            that.setAttribute('open', '');
            that.$.dropDownButton.setAttribute('open', '');
            that.$.input.setAttribute('open', '');

            if (dropDownWidth && typeof dropDownWidth === 'string' && dropDownWidth.indexOf('%') !== -1) {
                const fraction = parseFloat(dropDownWidth) / 100;

                that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', that.offsetWidth * fraction + 'px');
            }
            else if (dropDownWidth !== 'auto' && dropDownWidth) {
                that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', parseFloat(dropDownWidth) + 'px');
            }
            else if (dropDownWidth === 'auto') {
                that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', '');

                if (that.$.scrollView.$.scrollViewerContainer.classList.contains('vscroll')) {
                    // compensates for scrollbar's width
                    const autoWidth = that.$.scrollView.offsetWidth + parseFloat(getComputedStyle(that.$.scrollView).getPropertyValue('--lw-scroll-bar-size'));

                    that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', autoWidth + 'px');
                }
            }
            else {
                that.$.menu.style.width = 'auto';

                let menuWidth = that.$.menu.offsetWidth;

                const listItems = that.$.menu.querySelectorAll('li');

                for (let i = 0; i < listItems.length; i++) {
                    that._maxDropDownWidth = Math.max((listItems[i].firstElementChild || listItems[i]).offsetWidth, that._maxDropDownWidth);
                }

                if (that.$.scrollView.computedVerticalScrollBarVisibility) {
                    menuWidth += that.$.scrollView.$ && that.$.scrollView.$.verticalScrollBar ? that.$.scrollView.$.verticalScrollBar.offsetWidth : 30;
                }

                that.$.dropDownContainer.style.setProperty('--lw-input-drop-down-menu-width', Math.max(menuWidth, that.offsetWidth - 8) + 'px');

                that.$.menu.style.width = '';
            }

            //ShadowDOM ScrollBar styles are not loaded when the method is invoked
            if ((that.shadowRoot || that.isInShadowDOM) && that.$.scrollView._scrollView && LW.ScrollBar) {
                requestAnimationFrame(() => that.$.scrollView._scrollView.vScrollBar.refresh());
            }
        });


        if (that.$.scrollView.refresh) {
            that.$.scrollView.refresh();
        }

        that._refreshMenu();

        this.opened = true;
        that.setAttribute('aria-expanded', true);
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
            if (that.$.dropDownContainer.parentNode && !that.opened) {
                document.body.removeChild(that.$.dropDownContainer);
                that.removeAttribute('aria-owns');

                if (!that.readonly) {
                    that.$.input.removeAttribute('aria-controls');
                }
            }
        }, 1000);

        that.$.dropDownContainer.removeAttribute('open');
        that.$.dropDownButton.removeAttribute('open');
        that.$.input.removeAttribute('open');
        that.removeAttribute('open');

        that.opened = false;
        that.setAttribute('aria-expanded', false);
        that.$.input.focus();
        return true;
    }
});