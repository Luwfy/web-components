
LW('lw-input', class Input extends LW.BaseElement {
    // Button's properties.
    static get properties() {
        return {
            'autoCompleteDelay': {
                value: 100,
                type: 'number'
            },
            'dataSource': {
                type: 'any',
                value: [],
                reflectToAttribute: false
            },
            'dropDownDataSource': {
                type: 'any',
                value: []
            },
            'dropDownHeight': {
                type: 'any',
                value: 200
            },
            'dropDownWidth': {
                type: 'any',
                value: null
            },
            'dropDownButtonPosition': {
                allowedValues: ['none', 'left', 'right'],
                value: 'none',
                type: 'string'
            },
            'hint': {
                type: 'string',
                value: ''
            },
            'inputPurpose': {
                type: 'string',
                value: 'off'
            },
            'items': {
                type: 'number',
                value: 8
            },
            'minLength': {
                type: 'number',
                value: 1
            },
            'name': {
                value: '',
                type: 'string'
            },
            'opened': {
                value: false,
                type: 'boolean'
            },
            'query': {
                type: 'string',
                value: ''
            },
            'queryMode': {
                allowedValues: ['contains', 'containsIgnoreCase', 'doesNotContain', 'doesNotContainIgnoreCase', 'equals', 'equalsIgnoreCase', 'startsWith', 'startsWithIgnoreCase', 'endsWith', 'endsWithIgnoreCase'],
                type: 'string',
                value: 'containsIgnoreCase'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'readonly': {
                type: 'boolean',
                value: false
            },
            'sorted': {
                value: false,
                type: 'boolean'
            },
            'sortDirection': {
                value: 'asc',
                type: 'string'
            },
            'type': {
                type: 'string'
            },
            'value': {
                type: 'string',
                value: ''
            }
        };
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.textbox.css'
        ]
    }

    /** Input's template. */
    template() {
        return '<div id="inputContainer" role="presentation"><input class="lw-input" id=\'input\' readonly=\'[[readonly]]\' placeholder=\'[[placeholder]]\' type=\'[[type]]\' name=\'[[name]]\' value=\'{{value::keyup}}\' disabled=\'[[disabled]]\' aria-label="[[placeholder]]" /><span class="lw-hidden lw-hint" id="span">[[hint]]</span><div id="dropDownButton" tabindex=-1 class="lw-drop-down-button" role="button" aria-label="Toggle popup"><div id="arrow" class="arrow" aria-hidden="true"></div></div></div>';
    }

    static get listeners() {
        return {
            'input.focus': '_focusHandler',
            'input.blur': '_blurHandler',
            'input.keydown': '_keyDownHandler',
            'input.keyup': '_keyUpHandler',
            'input.keypress': '_keyPressHandler',
            'dropDownButton.down': '_dropDownButtonDownHandler',
            'inputContainer.down': '_downHandler',
            'document.up': '_documentUpHandler'
        };
    }

    focus() {
        const that = this;

        that.$.input.focus();
    }

    select() {
        const that = this;

        if (!that.readonly) {
            that.$.input.select();
        }
        else {
            that.$.input.focus();
        }
    }

    _documentUpHandler(event) {
        const that = this;

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (target === that ||
            target === that.$.dropDownButton ||
            target === that.$.input ||
            target === that.$.arrow) {
            return;
        }

        if (that.$.scrollView.contains(target.shadowParent || target)) {
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

    _focusHandler() {
        const that = this;

        that.setAttribute('focus', '');

        if (!that.readonly && that.minLength === 0 && that.$.input.value.length === 0 && !that._preventLookup) {
            that._lookup();
            return;
        }

        that.$.fireEvent('focus');

        delete that._preventLookup;
    }

    _blurHandler() {
        const that = this;

        if (!that.opened) {
            that.removeAttribute('focus');
        }

        that.$.fireEvent('blur');

        delete that._preventLookup;
    }

    _refreshMenu() {
        const that = this;

        that.$.menu.classList.remove('scroll');

        if (that.$.scrollView.computedVerticalScrollBarVisibility) {
            that.$.menu.classList.add('scroll');
        }
    }

    _performSelect() {
        const that = this;
        const targetItem = that.$.menu.querySelector('.active'),
            label = targetItem.getAttribute('data-label'),
            value = targetItem.getAttribute('value'),
            oldLabel = that.value,
            oldValue = that.$.input.dataValue;

        that.value = label;
        that.$.input.dataValue = value;

        if (label !== oldLabel || value !== oldValue) {
            that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
        }

        that.close();
    }

    _open() {
        const that = this;

        if (that.opened) {
            return;
        }

        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;
        let xCorrection = 0,
            yCorrection = 0;

        if (that.timer) {
            clearTimeout(that.timer);
        }

        if (that.getRootNode() && that.getRootNode().host) {
            that.getRootNode().host.shadowRoot.appendChild(that.$.scrollView);
        }
        else {
            document.body.appendChild(that.$.scrollView);
        }

        that.setAttribute('aria-owns', that.$.scrollView.id);

        if (!that.readonly) {
            that.$.input.setAttribute('aria-controls', that.$.scrollView.id);
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

        that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', '');
        that.$.scrollView.style.left = -3 + rect.left + scrollX - xCorrection + 'px';
        that.$.scrollView.style.top = rect.bottom + scrollY - yCorrection + 1 + 'px';
        that.$.scrollView.classList.remove('open');

        that.$.scrollView.onpointerdown = function () {
            that._isPointerDown = true;
        }

        requestAnimationFrame(function () {
            const dropDownWidth = that.dropDownWidth;

            if (that.$.scrollView.refresh) {
                that.$.scrollView.refresh();
            }

            that._refreshMenu();
            that.$.scrollView.setAttribute('open', '');
            that.setAttribute('open', '');
            that.$.dropDownButton.setAttribute('open', '');
            that.$.input.setAttribute('open', '');

            if (dropDownWidth && typeof dropDownWidth === 'string' && dropDownWidth.indexOf('%') !== -1) {
                const fraction = parseFloat(dropDownWidth) / 100;

                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', that.offsetWidth * fraction + 'px');
            }
            else if (dropDownWidth !== 'auto' && dropDownWidth) {
                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', parseFloat(dropDownWidth) + 'px');
            }
            else if (dropDownWidth === 'auto') {
                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', '');

                if (that.$.scrollView.$.scrollViewerContainer.classList.contains('vscroll')) {
                    // compensates for scrollbar's width
                    const autoWidth = that.$.scrollView.offsetWidth + parseFloat(getComputedStyle(that.$.scrollView).getPropertyValue('--lw-scroll-bar-size'));

                    that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', autoWidth + 'px');
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

                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', Math.max(menuWidth, that.offsetWidth - 8) + 'px');

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

    _lookup(event) {
        const that = this;

        let items = [];
        that.query = that.$.input.value;

        if (that.$.input.readonly) {
            if (!that._incrementalSearchQuery) {
                that._incrementalSearchQuery = '';
            }

            that._incrementalSearchQuery += event.key;

            if (that._incrementalSearchTimer) {
                clearTimeout(that._incrementalSearchTimer);
            }

            that.query = that._incrementalSearchQuery;
            that._incrementalSearchTimer = setTimeout(function () {
                that._incrementalSearchQuery = '';
            }, 700);
        }

        if (that.query.length < that.minLength) {
            that.close();
            return;
        }

        items = typeof that.dataSource === 'function' ? that.dataSource(that.query) : that.dataSource;

        clearTimeout(that._autoCompleteTimeout);

        that._autoCompleteTimeout = setTimeout(function () {
            const oldContext = that.context;

            that.context = that;
            that._process(items);
            that.context = oldContext;
        }, that.autoCompleteDelay);
    }

    _downHandler(event) {
        const that = this;

        if (that.readonly) {
            that._dropDownButtonDownHandler(event);
        }
    }

    _dropDownButtonDownHandler(event) {
        const that = this;

        that._toggle();

        event.preventDefault();
        event.stopPropagation();

        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();

        return false;
    }

    _toggle() {
        const that = this;

        if (that.opened) {
            that.close();
        }
        else {
            that.open();
        }
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

        const active = that.$.menu.querySelector('.active');

        if (active) {
            const dataValue = that.$.input.dataValue;

            for (let i = 0; i < that.$.menu.children.length; i++) {
                const item = that.$.menu.children[i];
                const label = item.getAttribute('data-label'),
                    value = item.getAttribute('value');

                if (dataValue !== undefined && value === dataValue ||
                    dataValue === undefined && label === that.$.input.value) {
                    active.classList.remove('active');
                    item.classList.add('active');
                    that._setActiveDescendant(item);
                    that.$.input.dataValue = value;
                    break;
                }
            }
        }

        that.ensureVisible();

        that.$.input.focus();
        setTimeout(function () {
            that.$.input.focus();
        }, 25);
    }

    _process(items) {
        const that = this;

        if (typeof items === 'string') {
            items = that.$.deserialize(items, 'array');
        }

        items = items.filter(function (item) {
            return that.matcher ? that.matcher(item) : that._matcher(item);
        })

        items = that._sorter(items);

        if (that.sorted) {
            items.sort((a, b) => {
                if (a.label !== undefined) {
                    return a.label.localeCompare(b.label);
                }

                return a.localeCompare(b);
            });

            if (that.sortDirection === 'desc') {
                items.reverse();
            }
        }

        if (!items.length && that.opened) {
            that.close();
        }

        if (items.length === 0) {
            return;
        }

        if (that.query.length > 0) {
            that._render(items.slice(0, that.items));
        }
        else {
            that._render(items);
        }

        that._open();

        if (that.$.scrollView.refresh) {
            that.$.scrollView.refresh();
        }

        that._refreshMenu();
        that.ensureVisible();
    }

    _matcher(item) {
        const that = this;
        const text = that.query;

        item = item.label || item;

        switch (that.queryMode) {
            case 'startsWith':
                return item.startsWith(text);

            case 'startsWithIgnoreCase':
                return item.toLowerCase().startsWith(text.toLowerCase());

            case 'doesNotContain':
                return item.indexOf(text) < 0;

            case 'doesNotContainIgnoreCase':
                return item.toLowerCase().indexOf(text.toLowerCase()) < 0;

            case 'contains':
                return item.indexOf(text) > -1;

            default:
            case 'containsIgnoreCase':
                return ~item.toLowerCase().indexOf(text.toLowerCase());

            case 'equals':
                return item.localeCompare(text) === 0;

            case 'equalsIgnoreCase':
                return (item.toLowerCase().localeCompare(text.toLowerCase()) === 0);

            case 'endsWith':
                return item.endsWith(text);

            case 'endsWithIgnoreCase':
                return item.toLowerCase().endsWith(text.toLowerCase());
        }
    }

    _sorter(items) {
        const that = this;

        let beginswith = []
            , caseSensitive = []
            , caseInsensitive = []
            , item

        // eslint-disable-next-line
        while (item = items.shift()) {
            const label = item.label || item;

            if (!label.toLowerCase().indexOf(that.query.toLowerCase())) {
                beginswith.push(item)
            }
            else if (~label.indexOf(that.query)) {
                caseSensitive.push(item)
            }
            else {
                caseInsensitive.push(item)
            }
        }

        return beginswith.concat(caseSensitive, caseInsensitive)
    }

    _highlighter(item) {
        const that = this;
        const query = that.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');

        return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
            return '<strong>' + match + '</strong>'
        })
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

        if (listItems.length > 0) {
            listItems[0].classList.add('active');
            that._setActiveDescendant(listItems[0]);
        }

        that.$.menu.innerHTML = '';

        function setActiveState() {
            const previouslyActive = that.$.menu.getElementsByClassName('active');

            if (previouslyActive[0]) {
                previouslyActive[0].classList.remove('active');
            }

            this.classList.add('active');
            that._setActiveDescendant(this);
        }

        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];

            that.$.menu.appendChild(listItem);

            listItem.onmouseenter = setActiveState;

            listItem.onmouseleave = function () {
                this.classList.remove('active');
                that._setActiveDescendant(null);
            }

            listItem.onclick = setActiveState;
        }
    }

    ensureVisible() {
        const that = this;
        const item = that.$.menu.querySelector('.active');

        if (!item) {
            return;
        }

        if (item.offsetTop + item.offsetHeight >= that.$.scrollView.scrollTop + that.$.scrollView.offsetHeight) {
            that.$.scrollView.scrollTop = item.offsetTop + item.offsetHeight;
        }

        if (item.offsetTop <= that.$.scrollView.scrollTop || item.offsetTop >= that.$.scrollView.scrollTop + that.$.scrollView.offsetHeight) {
            that.$.scrollView.scrollTop = item.offsetTop;
        }

        if ([...that.$.menu.children].indexOf(item) === 0) {
            that.$.scrollView.scrollTop = 0;
        }
        else if ([...that.$.menu.children].indexOf(item) === that.$.menu.children.length - 1) {
            that.$.scrollView.scrollTop = that.$.scrollView.scrollHeight;
        }
    }

    _next() {
        const that = this;
        const active = that.$.menu.querySelector('.active');

        if (!active) {
            const first = that.$.menu.firstElementChild;

            first.classList.add('active');
            that._setActiveDescendant(first);
            return;
        }

        active.classList.remove('active');

        let next = active.nextElementSibling;

        if (!next) {
            next = that.$.menu.firstElementChild;
        }

        next.classList.add('active');
        that._setActiveDescendant(next);
        that.ensureVisible();
    }

    _prev() {
        const that = this;
        const active = that.$.menu.querySelector('.active');

        if (!active) {
            const first = that.$.menu.firstElementChild;

            first.classList.add('active');
            that._setActiveDescendant(first);
            return;
        }

        active.classList.remove('active');

        let prev = active.previousElementSibling;

        if (!prev) {
            prev = that.$.menu.lastElementChild;
        }

        prev.classList.add('active');
        that._setActiveDescendant(prev);
        that.ensureVisible();
    }

    _move(event) {
        const that = this;

        if (!that.opened) {
            return;
        }

        switch (event.keyCode) {
            case 9: // tab
            case 13: // enter
            case 27: // escape
                event.preventDefault()
                break

            case 38: // up arrow
                event.preventDefault()
                that._prev()
                break

            case 40: // down arrow
                event.preventDefault()
                that._next()
                break
        }

        event.stopPropagation()
    }

    _keyDownHandler(event) {
        const that = this;

        that._suppressKeyPressRepeat = ![40, 38, 9, 13, 27, 16, 17, 18].includes(event.keyCode);

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }

        that._move(event);
    }

    _keyPressHandler(event) {
        const that = this;

        if (that._suppressKeyPressRepeat) {
            return;
        }

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }

        that._move(event)
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

                that.$.input.dataValue = that.$.input.value;
        }

    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        if (propertyName === 'dropDownHeight') {
            that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-height', that.dropDownHeight + 'px');
        }
        else if (propertyName === 'opened') {
            that.opened = oldValue;

            if (newValue) {
                that.open();
            }
            else {
                that.close();
            }
        }
        else if (propertyName === 'placeholder') {
            if (that.readonly) {
                const label = that.getAttribute('aria-label');

                if (label && label !== oldValue) {
                    return;
                }

                if (newValue) {
                    that.setAttribute('aria-label', newValue);
                }
                else {
                    that.removeAttribute('aria-label');
                }
            }
        }
        else if (propertyName === 'value') {
            if (that.displayMember !== that.valueMember && typeof newValue !== 'string') {
                that.value = newValue[that.displayMember];
                that.$.input.dataValue = newValue[that.valueMember];
            }
            else {
                that.$.input.value = newValue;
            }
        }
        else if (propertyName === 'readonly') {
            that._setAriaRelations();
            that._setInputPurpose();
        }
        else if (propertyName === 'theme' || propertyName === 'rightToLeft') {
            that.$.scrollView[propertyName] = newValue;
        }
        else if (propertyName === 'inputPurpose') {
            that._setInputPurpose();
        }
        else if (propertyName === 'inverted') {
            newValue ? that.$.scrollView.setAttribute('inverted', '') : that.$.scrollView.removeAttribute('inverted');
        }
    }

    render() {
        const that = this;

        if (!that.hint) {
            that.hint = that.placeholder;
        }

        if (that._createElement) {
            that._createElement();
        }

        if (that.opened) {
            that.opened = false;
            that.open();
        }

        const scrollView = that.$.scrollView;

        const menu = that.$.menu;

        if (menu) {
            menu.setAttribute('role', 'presentation');
            scrollView.appendChild(menu);
        }

        scrollView.style.setProperty('--lw-input-drop-down-menu-height', that.dropDownHeight + 'px');
        scrollView.classList.add('lw-input-drop-down-menu');

        scrollView.id = that.id + '_' + that.tagName.toLowerCase() + '_menu_' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        scrollView.ownerElement = that;

        that._setAriaRelations();
        that._setInputPurpose();

        super.render();
    }

    _createElement() {
        const that = this;
        const menu = document.createElement('ul');
        const scrollView = document.createElement('lw-scroll-viewer');

        scrollView.rightToLeft = that.rightToLeft;
        scrollView.theme = that.theme;
        scrollView.horizontalScrollBarVisibility = 'hidden';

        that.inverted ?
            scrollView.setAttribute('inverted', '') :
            scrollView.removeAttribute('inverted');

        that.$.scrollView = scrollView;
        that.$.menu = menu;

        //that.$.inputContainer.tabIndex = 0;
        that.$.menu.onclick = function (event) {
            event.stopPropagation()
            event.preventDefault()

            that._performSelect();
            that.$.input.focus();
        }
    }

    /**
     * Sets WAI-ARIA relations.
     */
    _setAriaRelations() {
        const that = this,
            label = that.getAttribute('aria-label');

        if (that.readonly) {
            that.setAttribute('role', 'button');

            if (!label && that.placeholder) {
                that.setAttribute('aria-label', that.placeholder);
            }

            that.removeAttribute('aria-readonly');
            that.$.input.setAttribute('aria-hidden', true);
            that.$.input.removeAttribute('aria-activedescendant');
            that.$.input.removeAttribute('aria-controls');
            that.$.dropDownButton.setAttribute('aria-hidden', true);
        }
        else {
            that.setAttribute('role', 'combobox');

            if (label && label === that.placeholder) {
                that.removeAttribute('aria-label');
            }

            that.$.input.setAttribute('role', 'searchbox');
            that.$.input.removeAttribute('aria-hidden', true);
            that.$.dropDownButton.removeAttribute('aria-hidden');
        }

        that.setAttribute('aria-expanded', that.opened);
        that.setAttribute('aria-haspopup', 'listbox');
        that.$.scrollView.setAttribute('role', 'listbox');
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

    /**
     * Sets the HTML autocomplete attribute based on the property "inputPurpose".
     */
    _setInputPurpose() {
        const that = this;

        if (that.readonly) {
            that.$.input.removeAttribute('autocomplete');
        }
        else {
            that.$.input.setAttribute('autocomplete', that.inputPurpose);
        }
    }
});


LW('lw-text-area', class TextArea extends LW.Input {
    /** Input's template. */
    template() {
        return '<div id="inputContainer" role="presentation"><textarea class="lw-input" id=\'input\' readonly=\'[[readonly]]\' placeholder=\'[[placeholder]]\'  name=\'[[name]]\' value=\'{{value::keyup}}\' disabled=\'[[disabled]]\' aria-label="[[placeholder]]"></textarea><span class="lw-hidden lw-hint" id="span">[[hint]]</span><div id="dropDownButton" tabindex=-1 class="lw-drop-down-button" role="button" aria-label="Toggle popup"><div id="arrow" class="arrow" aria-hidden="true"></div></div></div>';
    }

    render() {
        const that = this;

        super.render();

        that.classList.add('lw-input');
    }
});