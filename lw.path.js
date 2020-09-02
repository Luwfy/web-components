
LW('lw-path', class Path extends LW.BaseElement {
    // Element's properties.
    static get properties() {
        return {
            'value': {
                value: '',
                type: 'string'
            },
            'hint': {
                value: '',
                type: 'string'
            },
            'label': {
                value: '',
                type: 'string'
            },
            'dataSource': {
                value: [{ label: 'notAPath' }, { label: 'validPath' }],
                type: 'any',
                reflectToAttribute: false
            },
            'dropDownAppendTo': {
                value: null,
                type: 'any'
            },
            'dropDownPosition': {
                allowedValues: ['auto', 'top', 'bottom', 'overlay-top', 'overlay-center', 'overlay-bottom', 'center-bottom', 'center-top'],
                value: 'auto',
                type: 'string'
            },
            'dropDownMinHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownMaxHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownMinWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownMaxWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownOverlay': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'incorrectArgument': '{{elementType}}: Incorrect argument {{argumentName}} in method {{methodName}}.',
                        'missingReference': '{{elementType}}: Missing reference to {{file}} in method {{methodName}}.',
                        'notAPath': 'Set to not a path',
                        'validPath': 'Set to valid path'
                    }
                },
                type: 'object'
            },
            'name': {
                value: '',
                type: 'string'
            },
            'opened': {
                value: false,
                type: 'boolean'
            },
            'placeholder': {
                value: 'Enter a path',
                type: 'string'
            },
            'pathFormat': {
                allowedValues: ['windows', 'unix'],
                value: 'windows',
                type: 'string'
            },
            'indicator': {
                value: false,
                type: 'boolean'
            },
            'displayMember': {
                value: '',
                type: 'string'
            },
            'valueMember': {
                value: '',
                type: 'string'
            },
            'wrap': {
                value: false,
                type: 'boolean'
            }
        };
    }

    /** Element's template. */
    template() {
        return `<div id="container" role="presentation">
                    <span class="lw-label" id="label">[[label]]</span>
                    <div id="content" class="lw-content" role="presentation">
                        <div class="lw-buttons-container" id="buttonsContainer" role="presentation">
                            <span id="dropDownButton" class="lw-drop-down-button" role="button" aria-label="Open popup">
                                <span id="icon" aria-hidden="true"></span>
                            </span>
                            <div id="inputContainer" class="lw-path-input-container" role="presentation">
                                <div id="pathWrapper" class="lw-path-input-wrapper" role="presentation"></div>
                                <input id="input" autocomplete="off" spellcheck="false" type="text" name="[[name]]" class="lw-input lw-path-input" role="textbox" aria-autocomplete="none" aria-label="[[placeholder]]" />
                                <div class="lw-path-multiline-container lw-hidden" id="multilineContainer" role="presentation">
                                    <div id="multiline" contenteditable="true" spellcheck="false" class="lw-input lw-path-input" role="textbox" aria-autocomplete="none" aria-label="[[placeholder]]"></div>
                                </div>
                            </div>
                            <span id="browseButton" class="lw-browse-button" role="button" aria-label="Browse">
                                <span id="icon" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div id="dropDownContainer" class="lw-drop-down lw-drop-down-container lw-visibility-hidden" role="listbox"></div>
                    </div>
                    <span class="lw-hint" id="hint">[[hint]]</span>
                </div>`
    }

    static get listeners() {
        return {
            'inputContainer.change': '_inputChangeHandler',
            'inputContainer.keydown': '_inputKeyDownHandler',
            'inputContainer.keyup': '_inputKeyUpHandler',
            'document.down': '_documentDownHandler',
            'document.up': '_documentUpHandler',
            'container.mouseover': '_mouseOverEventHandler',
            'container.mouseout': '_mouseOverEventHandler',
            'dropDownContainer.mouseover': '_mouseOverEventHandler',
            'dropDownContainer.mouseout': '_mouseOverEventHandler',
            'inputContainer.focusin': '_focusHandler',
            'inputContainer.focusout': '_focusHandler',
            'resize': '_resizeHandler',
            'styleChanged': '_styleChangedHandler'
        };
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.dropdown.css',
            'lw.path.css'
        ]
    }

    /**
     * Property Change handler
     * @param {any} propertyName
     * @param {any} oldValue
     * @param {any} newValue
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'dropDownAppendTo':
                that._positionDetection.dropDownAppendToChangedHandler();

                if (that.rightToLeft) {
                    that.$.dropDownContainer.setAttribute('right-to-left', '')
                }
                else {
                    that.$.dropDownContainer.removeAttribute('right-to-left');
                }

                break;
            case 'dataSource':
                that._dataBind();
                //Check the new listBox size
                that._setDropDownSize();
                that._positionDetection.checkBrowserBounds('vertically');
                that._positionDetection.positionDropDown();
                that._positionDetection.checkBrowserBounds('horizontally');
                break;
            case 'dropDownMinWidth':
            case 'dropDownWidth':
            case 'dropDownMaxWidth':
            case 'dropDownHeight':
            case 'dropDownMinHeight':
            case 'dropDownMaxHeight':
                that._setDropDownSize();
                break;
            case 'dropDownOverlay':
                if (!newValue) {
                    that._positionDetection.removeOverlay();
                }

                break;
            case 'wrap':
                that._setInput();
                that._handleValue(that.value);

                if ((that.getRootNode() || document).activeElement !== that) {
                    that._trim();
                }

                break;
            case 'readonly':
                that.$.multiline.readOnly = that.$.input.readOnly = newValue;

                if (newValue) {
                    that.$.multiline.setAttribute('aria-readonly', true);
                    that.$.input.setAttribute('aria-readonly', true);
                }
                else {
                    that.$.multiline.removeAttribute('aria-readonly');
                    that.$.input.removeAttribute('aria-readonly');
                }

                break;
            case 'rightToLeft':
                if (that.dropDownAppendTo !== null) {
                    newValue ? that.$.dropDownContainer.setAttribute('right-to-left', '') : that.$.dropDownContainer.removeAttribute('right-to-left');
                }

                break;
            case 'value':
            case 'pathFormat':
                that._handleValue(that.value);

                if (propertyName === 'value' && that.value !== oldValue) {
                    that.$.fireEvent('change', { oldValue: oldValue, value: that.value });
                }

                if ((that.getRootNode() || document).activeElement !== that) {
                    that._trim();
                }

                break;
            case 'placeholder':
                that.$.input.placeholder = that.$.multiline.placeholder = that.placeholder;
                break;
        }
    }

    /**
   * Called when the element is attached from the DOM.
   */
    attached() {
        const that = this;

        super.attached();

        if (!that.isCompleted || !that.$.dropDownContainer) {
            return;
        }

        that._positionDetection.dropDownAttached('_setDropDownSize');
        that._positionDetection.checkBrowserBounds();
    }

    /**
    * Called when the element is detached from the DOM.
    */
    detached() {
        const that = this;

        super.detached();

        if (!that.$.dropDownContainer) {
            return;
        }

        that.close();
        that._positionDetection.dropDownDetached();
    }

    render() {
        const that = this;

        //Configure the Input
        that._setInput();

        //Handles the AutoPositioning of the DropDown
        that._positionDetection = new LW.Utilities.PositionDetection(that, that.$.dropDownContainer, that.$.container, 'close');
        that._positionDetection.getDropDownParent(true);
        that._positionDetection.setDropDownPosition();
        that._calculateDropDownSize();
        that._positionDetection.handleAutoPositioning();
        that._setDropDownSize();

        if (!that.$.label.id) {
            that.$.label.id = that.id + 'Label';
        }

        if (!that.$.dropDownContainer.id) {
            that.$.dropDownContainer.id = that.id + 'DropDown';
        }

        if (!that.$.hint.id) {
            that.$.hint.id = that.id + 'Hint';
        }

        that.setAttribute('role', 'combobox');
        that.setAttribute('aria-describedby', that.$.hint.id);
        that.setAttribute('aria-expanded', false);
        that.setAttribute('aria-labelledby', that.$.label.id);
        that.setAttribute('aria-owns', that.$.dropDownContainer.id);
        that.$.dropDownButton.setAttribute('aria-controls', that.$.dropDownContainer.id);

        if (that.rightToLeft && that.dropDownAppendTo !== null) {
            that.$.dropDownContainer.setAttribute('right-to-left', '');
        }

        //Validate the value
        that.wrap ? that._wrapRefresh() : that._handleValue(that.value);

        //Trim the value
        that._trim();

        if (that.opened) {
            that.open();
        }

        super.render();
    }

    /**
     * Blurs the element
     */
    blur() {
        this.$[this.wrap ? 'multiline' : 'input'].blur();
    }

    /**
     * Focuses the element
     */
    focus() {
        this.$[this.wrap ? 'multiline' : 'input'].focus();
    }

    /**
     * Set to 'Not a path' state
     */
    setToNotAPath() {
        this._setPathTo('//');
    }

    /**
     * Set to 'Not a path' state
     */
    setToEmptyPath() {
        this._setPathTo('////');
    }

    /**
     * Handles the 'setToEmptyPath' and 'setToNotAPath' methods
     * @param {any} value
     */
    _setPathTo(value) {
        const that = this,
            oldValue = that.value;

        that.set('value', value);
        that.$.input.value = that.$.multiline.value = '';

        if (oldValue !== that.value) {
            that.$.fireEvent('change', { oldValue: oldValue, value: that.value });
        }
    }

    /**
    * Hides the drop down list.
    */
    close() {
        const that = this;

        if (that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
            return;
        }

        const isClosingEventPrevented = that.$.fireEvent('closing').defaultPrevented;

        if (isClosingEventPrevented) {
            return;
        }

        that.$dropDownContainer.addClass('lw-visibility-hidden');
        that.$.fireEvent('close');

        that.opened = that._isDropDownClicked = that._preventDropDownClose = false;
        that.setAttribute('aria-expanded', false);
        that._positionDetection.removeOverlay(true);

        if (that._edgeMacFF && !that.hasAnimation && that.$.dropDownContainer) {
            that.$.dropDownContainer.style.top = that.$.dropDownContainer.style.left = '';
            that.$dropDownContainer.addClass('not-in-view');
        }
    }

    /**
   * Shows the drop down List.
   */
    open() {
        const that = this;

        if (that.disabled || !that.offsetHeight) {
            return;
        }

        if (!that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
            return;
        }

        if (that.dataSource.length && !that.$.dropDownContainer.firstElementChild) {
            that._dataBind();
        }

        that._handleItemSelection();

        //Set disabled state where necessary
        that._updateDropDown();

        if (that.$dropDownContainer.hasClass('not-in-view')) {
            that.$dropDownContainer.removeClass('not-in-view');
        }

        that.$.dropDownContainer.style.transition = null;

        if (that.dropDownAppendTo && that.dropDownAppendTo.length > 0) {
            const rect = that.getBoundingClientRect();

            // handles the case, when the dropdown is opened, while it is still part of the dropdownlist's tree. 
            if (that.$.container.contains(that.$.dropDownContainer)) {
                let iterations = 0;
                const interval = setInterval(function () {
                    const rect = that.getBoundingClientRect();

                    iterations++;

                    if (rect.top === that._positionTop && iterations < 10) {
                        return;
                    }

                    that.open();
                    clearInterval(interval);
                    that._positionTop = rect.top;
                }, 100);

                return;
            }
            else if (rect.top !== that._positionTop) {
                that._positionTop = rect.top;
            }
        }

        const isOpeningEventPrevented = that.$.fireEvent('opening').defaultPrevented;

        if (isOpeningEventPrevented) {
            return;
        }

        that.opened = true;
        that.setAttribute('aria-expanded', true);

        that._positionDetection.placeOverlay();
        that._positionDetection.checkBrowserBounds('vertically');
        that._positionDetection.positionDropDown();
        that._positionDetection.checkBrowserBounds('horizontally');

        that.$dropDownContainer.removeClass('lw-visibility-hidden');
        that.$.fireEvent('open');

        that._handleKeyStrokes('Home');

        if (!LW.Utilities.Core.isMobile) {
            that.wrap ? that.$.multiline.focus() : that.$.input.focus();
        }
    }

    /**
   * Calculates the dropDownSize and creates an object with the sizes
   */
    _calculateDropDownSize() {
        const that = this;

        that._dropDownSize = {};

        const computedStyle = window.getComputedStyle(that.$.dropDownContainer);
        const topBorder = parseFloat(computedStyle.getPropertyValue('border-top-width').trim()),
            bottomBorder = parseFloat(computedStyle.getPropertyValue('border-bottom-width').trim()),
            topMargin = parseFloat(computedStyle.getPropertyValue('margin-top').trim()),
            bottomMargin = parseFloat(computedStyle.getPropertyValue('margin-bottom').trim()),
            topPaddinng = parseFloat(computedStyle.getPropertyValue('padding-top').trim()),
            bottomPaddinng = parseFloat(computedStyle.getPropertyValue('padding-bottom').trim());

        if (LW.Utilities.Core.CSSVariablesSupport()) {
            that._dropDownSize.width = computedStyle.getPropertyValue('--lw-drop-down-list-drop-down-width').trim();
            that._dropDownSize.height = computedStyle.getPropertyValue('--lw-drop-down-list-drop-down-height').trim();
        }

        if (!that._dropDownSize.width || that._dropDownSize.width.indexOf('initial') > -1) {
            that._dropDownSize.width = that.offsetWidth;
        }

        if (!that._dropDownSize.height) {
            that._dropDownSize.height = 'auto';
        }

        that._dropDownSize.minHeight = parseFloat(computedStyle.getPropertyValue('min-height').trim());
        that._dropDownSize.maxHeight = parseFloat(computedStyle.getPropertyValue('max-height').trim());
        that._dropDownSize.borderWidth = (isNaN(topBorder) ? 0 : topBorder) + (isNaN(bottomBorder) ? 0 : bottomBorder);
        that._dropDownSize.paddingWidth = (isNaN(topPaddinng) ? 0 : topPaddinng) + (isNaN(bottomPaddinng) ? 0 : bottomPaddinng);
        that._dropDownSize.marginWidth = (isNaN(topMargin) ? 0 : topMargin) + (isNaN(bottomMargin) ? 0 : bottomMargin);
    }

    /**
     * Input Focus Handler
     * @param {any} event
     */
    _focusHandler(event) {
        const that = this;

        //Focusin handling
        if (event.type === 'focusin') {
            that.setAttribute('focus', '');

            //Untrim
            if (that.wrap) {
                that._wrapRefresh();
            }
            else {
                that._handleValue(that.value);
            }

            that._refreshInputSelection(true);
            return;
        }

        if (that._buttonClicked || that._isDropDownClicked) {
            that.focus();
            return;
        }

        that.removeAttribute('focus');

        //FocusOUT handling
        if (that.wrap) {
            const oldValue = that.value;

            that._handleValue(that.$.multiline.value, true);

            if (that.value !== oldValue) {
                that.$.fireEvent('change', { oldValue: oldValue, value: that.value });
            }
        }
        else {
            that._handleValue(that.$.input.value, true);
        }

        if (!that._buttonClicked && !that._isDropDownClicked) {
            that.close();
        }

        that._trim();
    }

    /**
     * Configures the Path Input
     */
    _setInput() {
        const that = this;
        let input = that.$.input,
            multiline = that.$.multiline

        if (!multiline.value) {
            Object.defineProperty(multiline, 'value', {
                get() {
                    return this.textContent;
                },
                set(value) {
                    this.innerHTML = value;

                    if (!value) {
                        this.setAttribute('show-placeholder', '');
                    }
                    else {
                        this.removeAttribute('show-placeholder');
                    }

                    input.value = this.textContent;
                }
            });
        }

        if (!multiline.readOnly) {
            Object.defineProperty(multiline, 'readOnly', {
                get() {
                    return this.getAttribute('contenteditable');
                },
                set(value) {
                    this.setAttribute('contenteditable', !value);
                }
            });
        }

        if (that.wrap) {
            input.$.addClass('lw-hidden');
            that.$multilineContainer.removeClass('lw-hidden');
        }
        else {
            input.$.removeClass('lw-hidden');
            that.$multilineContainer.addClass('lw-hidden');
        }

        input.placeholder = multiline.placeholder = that.placeholder;
        input.readOnly = multiline.readOnly = that.readonly;

        multiline.value = '';
        multiline.setAttribute('placeholder', that.placeholder);
        multiline.setAttribute('readonly', that.readonly);
    }

    /**
     * Handles the selection of a path item
     * @param {any} pathItem - the selected item
     */
    _handleItemSelection(pathItem, eventType) {
        const that = this,
            items = that.$.dropDownContainer.getElementsByClassName('lw-path-item');

        for (let i = 0; i < items.length; i++) {
            items[i].removeAttribute('active');
        }

        if (!pathItem || pathItem.hasAttribute('disabled')) {
            return;
        }

        if (eventType) {
            that.$.fireEvent(eventType, {
                'label': pathItem.label,
                'value': pathItem.value
            });
        }

        const oldValue = that.value;

        pathItem.setAttribute('active', '');

        if (pathItem.value === 'notAPath') {
            that.set('value', '//');
            that.$.input.value = that.$.multiline.value = '';
        }
        else if (pathItem.value === 'validPath') {
            that.set('value', '////');
            that.$.input.value = that.$.multiline.value = '';
        }

        if (oldValue !== that.value) {
            that.$.fireEvent('change', { oldValue: oldValue, value: that.value });
        }

        that.close();
    }

    /**
     * Handles DropDown keystrokes
     * @param {any} key
     */
    _handleKeyStrokes(key) {
        const that = this,
            items = [].slice.call(that.$.dropDownContainer.children),
            focusedItem = items.find(item => item.hasAttribute('focus')),
            getNonDisableSibling = function (item, type) {
                if (!item) {
                    return;
                }

                let targetItem;

                targetItem = item[type + 'ElementSibling'];

                while (targetItem) {
                    if (!targetItem.hasAttribute('disabled')) {
                        return targetItem;
                    }

                    targetItem = targetItem[type + 'ElementSibling'];
                }
            };
        let targetItem;

        if (!items.length) {
            return;
        }

        switch (key) {
            case 'ArrowDown':
                targetItem = focusedItem ? getNonDisableSibling(focusedItem, 'next') : items.find(item => !item.hasAttribute('disabled'));
                break;
            case 'ArrowUp':
                targetItem = focusedItem ? getNonDisableSibling(focusedItem, 'previous') : items.find(item => !item.hasAttribute('disabled'));
                break;
            case 'Home':
                targetItem = items.find(item => !item.hasAttribute('disabled'));
                break;
            case 'End':
                for (let i = items.length - 1; i >= 0; i--) {
                    if (!items[i].hasAttribute('disabled')) {
                        targetItem = items[i];
                        break;
                    }
                }

                break;
        }

        if (targetItem) {
            //unfocus all
            items.map(item => item.removeAttribute('focus'));

            //Focus target
            targetItem.setAttribute('focus', '');
            that.setAttribute('aria-activedescendant', targetItem.id);
        }
    }

    /**
     * Returns the Type of the path
     * @param {any} value
     */
    _getPathType(value) {
        if (!value || !value.length) {
            return;
        }

        if (value.indexOf('//rel//') === 0) {
            return 'rel';
        }
        else if (value.indexOf('//abs//') === 0) {
            return 'abs';
        }
        else if (value.indexOf('//unc//') === 0) {
            return 'unc';
        }

        if (/(^|[\/\\])(\.{1,2})[\/\\]/g.test(value)) {
            return 'rel';
        }
        else if (/^[\w\d]{1}:\\/gmi.test(value) || /^\/[\w\d]+\//gmi.test(value)) {
            return 'abs';
        }
        else if (/^\\\\[\w\d]+\\/gmi.test(value) || /^\/\/[\w\d]+\//gmi.test(value)) {
            return 'unc';
        }

        return 'rel';
    }

    /**
     * Returns the Drive name of the path
     * @param {any} path
     * @param {any} pathType
     */
    _getDriveName(path, pathType) {
        const that = this;
        let drive;

        if (pathType === 'rel') {
            drive = path[0].replace(/[:\\\/]+|\s/gmi, '');

            path[0] = drive;
        }
        else if (pathType === 'abs') {
            drive = path[0].replace(/[:\\\/]+|[.]{1,}|\s/gmi, '');

            if (that.pathFormat === 'windows') {
                drive += ':';
            }
            else if (that.pathFormat === 'unix') {
                drive = '/' + drive;
            }

            path[0] = drive;
        }
        else if (pathType === 'unc') {
            drive = path[0].replace(/[:\\/]+|[.]{1,}|\s/gmi, '');

            if (that.pathFormat === 'windows') {
                drive = '\\\\' + drive;
            }
            else {
                drive = '//' + drive;
            }

            path[0] = drive;
        }

        return drive;
    }

    /**
     * Handles the value
     * @param {any} value
     */
    _handleValue(value) {
        const that = this;

        if (value === '//' || value === '////') {
            that.$.multiline.value = that.$.input.value = '';
            return;
        }

        value = value.trim();

        const pathType = that._getPathType(value);

        if (!value || !value.length || !pathType) {
            that.set('value', '//');
            that.$.multiline.value = that.$.input.value = '';
            return;
        }

        //Remove any uneccessary characters
        value = value.replace(/^(\/+((abs)|(rel)|(unc))\/+)|([?*"<>|]+)/gmi, '');

        const separator = '>';

        //Set the special separators
        value = value.replace(/[\\|\/]+/gmi, separator);

        const path = value.split(separator).filter(item => item.length);

        if (!path.length) {
            that.$.multiline.value = that.$.input.value = '';
            that.set('value', that._formatValue(pathType));
            return;
        }

        for (let p = 0; p < path.length - 1; p++) {
            // '...' is invalid when typing a path manually
            if (path[p] === '...') {
                path[p] = '';
                continue;
            }

            // trailing periods (.) in folder names are trimmed; leading periods and periods inside folder names are valid
            if (/^\.+$/g.test(path[p]) === false) {
                while (path[p].charAt(path[p].length - 1) === '.') {
                    path[p] = path[p].slice(0, path[p].length - 1);
                }
            }
        }

        if (pathType === 'rel') {
            // Remove period combinations other than '.' and '..'
            for (let p = 0; p < path.length - 1; p++) {
                if (/^\.{3,}$/g.test(path[p])) {
                    path[p] = '';
                }
            }
        }
        else {
            //Remove invalid '.' characters from folder names
            for (let p = 0; p < path.length - 1; p++) {
                if (/^\.+$/g.test(path[p])) {
                    path[p] = '';
                }
            }
        }

        const drive = that._getDriveName(path, pathType);

        //Construct the value
        that.set('value', that._formatValue(that._constructPath(path, separator, drive), pathType));

        //Construct the path for the input value
        that.$.multiline.value = that.$.input.value = that._constructPath(path, that.pathFormat === 'windows' ? '\\' : '/', drive);
    }

    /**
     * Constructs the final path for the input
     * @param {any} path
     * @param {any} separator
     * @param {any} drive
     */
    _constructPath(path, separator, drive) {
        let value = '';

        for (let p = 0; p < path.length; p++) {
            let pathSection = path[p];
            const isOnNewLine = pathSection.indexOf('<div>') === 0;

            pathSection = pathSection.replace(/(<div>)|(<\/div>)/gmi, '');

            if (pathSection !== drive) {
                pathSection = pathSection.replace(/[:\\\/]+|\s+$/gmi, '');
            }

            if (this.wrap) {
                pathSection = pathSection !== drive ? separator + pathSection : pathSection;
            }
            else {
                pathSection = pathSection + separator;
            }

            if (isOnNewLine) {
                pathSection = '<div role="presentation">' + pathSection + '</div>';
            }

            value += pathSection;
        }

        //Remove the last separator
        if (!this.wrap && (path.length > 1 || (path.length === 1 && path[0].indexOf(':') < 0))) {
            value = value.slice(0, -1);
        }

        return value;
    }

    /**
     * Trims the path
     */
    _trim() {
        const that = this;

        if ((that.getRootNode() || document).activeElement === that) {
            return;
        }

        const separator = that.pathFormat === 'windows' ? '\\' : '/',
            value = that.value;

        if (!value || value === '//' || value === '////') {
            that.$.multiline.value = that.$.input.value = '';
            return;
        }

        const pathWrapper = that.$.pathWrapper,
            inputWrapper = that.wrap ? that.$.multiline : that.$.input;
        let path = value.replace(/^(\/+((abs)|(rel)|(unc))\/+)|([?*"<>]+)/gmi, '').split('/');
        const isDriveFirst = that._getDriveName(path, that._getPathType(value));

        //Handles multiline trimming
        if (that.wrap) {
            let trimmedPath = that._trimVertically(path, isDriveFirst);

            //Trim Horizontally
            while (pathWrapper.offsetHeight > that.offsetHeight) {
                const indexToReplace = trimmedPath.length <= 2 ? 0 : 1;

                if (!trimmedPath.length) {
                    break;
                }

                trimmedPath.splice(indexToReplace, 1, '...');
                trimmedPath = that._trimVertically(trimmedPath, isDriveFirst);
                pathWrapper.innerHTML = that._constructPath(trimmedPath, separator, isDriveFirst ? trimmedPath[0] : undefined)

                if (pathWrapper.offsetHeight > that.offsetHeight) {
                    trimmedPath.splice(indexToReplace, 1);
                }
            }

            path = trimmedPath;
        }

        //Set the width of the pathWrapper to 'auto'
        //pathWrapper.style.width = 'auto';

        pathWrapper.innerHTML = that._constructPath(path, separator, isDriveFirst ? path[0] : undefined);

        while (pathWrapper.offsetWidth > inputWrapper.offsetWidth) {
            const indexToReplace = path.length <= 2 ? 0 : 1;

            if (!path.length) {
                break;
            }

            path.splice(indexToReplace, 1, '...');
            pathWrapper.innerHTML = that._constructPath(path, separator, isDriveFirst ? path[0] : undefined)

            if (pathWrapper.offsetWidth > inputWrapper.offsetWidth) {
                path.splice(indexToReplace, 1);
            }
        }

        if (!path.length) {
            pathWrapper.innerHTML = '...';
        }

        //Reset the width of the pathWrapper
        //pathWrapper.style.width = '';

        that.$.multiline.value = that.$.input.value = pathWrapper.innerHTML;
    }

    /**
     * Trims the path vertically for multiline input
     * @param {any} path
     * @param {any} isDriveFirst
     */
    _trimVertically(path, isDriveFirst) {
        const that = this,
            pathWrapper = that.$.pathWrapper,
            inputWrapper = that.wrap ? that.$.multiline : that.$.input,
            separator = that.pathFormat === 'windows' ? '\\' : '/',
            //Finds the last single line path segment
            getLastSegmentIndex = () => {
                let lastIndex = -1;

                for (let p = 0; p < path.length; p++) {
                    if (p !== 0 && path[p].indexOf('<div>') < 0) {
                        lastIndex = p;
                    }
                }

                return lastIndex;
            };

        //Set the width of the pathWrapper to 'auto'
        //pathWrapper.style.width = 'auto';

        //Remove all new lines from path
        for (let i = 0; i < path.length; i++) {
            path[i] = path[i].replace(/(<div>)|(<\/div>)/gmi, '');
        }

        //Separates the path segments in new lines where neccessary
        pathWrapper.innerHTML = that._constructPath(path, separator, isDriveFirst ? path[0] : undefined);

        while (pathWrapper.offsetWidth > inputWrapper.offsetWidth) {
            let pathIndex = getLastSegmentIndex();

            if (pathIndex <= 1 || path[pathIndex] === '...') {
                break;
            }

            path[pathIndex] = '<div>' + path[pathIndex] + '</div>';

            pathWrapper.innerHTML = that._constructPath(path, separator, isDriveFirst ? path[0] : undefined);
        }

        if (!path.length) {
            pathWrapper.innerHTML = '...';
        }

        that.$.multiline.value = that.$.input.value = pathWrapper.innerHTML;

        //Reset the width of the PathWrapper
        //pathWrapper.style.width = '';

        return path;
    }

    /**
     * Encodes the value
     * @param {any} value
     */
    _formatValue(value, pathType) {
        const that = this;

        if (!value) {
            value = that.wrap ? that.$.multiline.value : that.$.input.value;
        }

        return !pathType ? '//' : '//' + pathType + '//' + value.replace(/[:]+|\\+|\/+/gmi, '').replace(/>/g, '/');
    }

    /**
     * Input Change event handler
     * @param {any} event
     */
    _inputChangeHandler(event) {
        const that = this,
            oldValue = that.value;

        event.preventDefault();
        event.stopPropagation();

        that._handleValue((that.wrap ? that.$.multiline : that.$.input).value, true);

        if (oldValue !== that.value) {
            that.$.fireEvent('change', { oldValue: oldValue, value: that.value });
        }

        that._updateDropDown();
    }

    /**
     * Updates the options inside the DropDown
     */
    _updateDropDown() {
        const that = this;

        const items = that.$.dropDownContainer.children,
            input = that.wrap ? that.$.multiline : that.$.input;
        let notAPathItem, validPath;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.value === 'notAPath') {
                notAPathItem = item;
            }
            else if (item.value === 'validPath') {
                validPath = item;
            }

            if (notAPathItem && validPath) {
                break;
            }
        }

        if (notAPathItem) {
            if (!input.value.length || that.indicator) {
                notAPathItem.setAttribute('disabled', '');
                notAPathItem.setAttribute('aria-disabled', true);

                if (notAPathItem.hasAttribute('focus')) {
                    notAPathItem.removeAttribute('focus');
                }
            }
            else {
                notAPathItem.removeAttribute('disabled');
                notAPathItem.removeAttribute('aria-disabled');
            }
        }

        if (validPath) {
            if (input.value.length || that.indicator) {
                validPath.setAttribute('disabled', '');
                validPath.setAttribute('aria-disabled', true);

                if (validPath.hasAttribute('focus')) {
                    validPath.removeAttribute('focus');
                }
            }
            else {
                validPath.removeAttribute('disabled');
                validPath.removeAttribute('aria-disabled');
            }
        }
    }

    /**
     * Update the content of the DropDown
     */
    _dataBind() {
        const that = this,
            dataSource = that.dataSource;
        let items = [];

        that.$.dropDownContainer.innerHTML = '';

        if (!dataSource || !dataSource.length) {
            return;
        }

        if (typeof dataSource === 'string') {
            that.dataSource = JSON.parse(dataSource);
        }

        if (Array.isArray(dataSource)) {
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < dataSource.length; i++) {
                const item = dataSource[i],
                    htmlItem = that._createItem(item);

                items.push(htmlItem);

                if (fragment) {
                    fragment.appendChild(htmlItem);
                }
            }

            that.$.dropDownContainer.appendChild(fragment);
        }
    }

    /**
    * Document mouse down event handler.
    */
    _documentDownHandler(event) {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        let target = event.originalEvent.target;

        if (target === that._overlay) {
            that._overlayDown = true;
        }

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];

            let rootElement = target;

            while (rootElement) {
                if (rootElement.closest('.lw-drop-down-container') === that.$.dropDownContainer) {
                    that._isDropDownClicked = true;
                    break;
                }

                rootElement = rootElement.getRootNode().host;
            }
        }
        else {
            that._isDropDownClicked = target.closest('.lw-drop-down-container') === that.$.dropDownContainer;
        }

        if ((that.shadowRoot || that).contains(target)) {
            that._buttonClicked = target.closest('.lw-browse-button') || target.closest('.lw-drop-down-button');
            that._isPathInputDown = target.closest('.lw-path-input');
        }

        let listItem = target.closest('.lw-path-item');

        if (!that.$.dropDownContainer.contains(listItem)) {
            listItem = undefined;
        }

        if (listItem) {
            if (that.hasRippleAnimation && !listItem.hasAttribute('disabled') && !listItem.hasAttribute('readonly')) {
                LW.Utilities.Animation.Ripple.animate(listItem, event.pageX, event.pageY);
            }

            that._itemClicked = listItem;
            that._preventDropDownClose = true;
        }

        if (that._isDropDownClicked) {
            that._preventDropDownClose = true;
        }
    }

    /**
     * Document Up Event Handler
     * @param {any} event
     */
    _documentUpHandler(event) {
        if (event.originalEvent.type === 'pointercancel') {
            return;
        }

        const that = this;
        let target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;
        const pathItem = target.closest('.lw-path-item');

        if (pathItem === that._itemClicked) {
            that._handleItemSelection(pathItem, 'itemClick');
            return;
        }

        that._itemClicked = undefined;

        if (that._buttonClicked) {
            if (that.hasRippleAnimation) {
                LW.Utilities.Animation.Ripple.animate(that._buttonClicked, event.pageX + that._buttonClicked.offsetWidth / 4, event.pageY + that._buttonClicked.offsetHeight / 4);
            }

            if (target.closest('.lw-browse-button') === that._buttonClicked && that._buttonClicked === that.$.browseButton) {
                that.$.fireEvent('browseButtonClick');
            }
            else if (target.closest('.lw-drop-down-button') === that._buttonClicked && that._buttonClicked === that.$.dropDownButton) {
                that.$.fireEvent('dropDownButtonClick');
            }
        }

        if (target.closest('.lw-drop-down-button') === that._buttonClicked && that._buttonClicked === that.$.dropDownButton) {
            //Open/Close the dropDownList
            that.$dropDownContainer.hasClass('lw-visibility-hidden') ? that.open() : that.close();
            that._buttonClicked = undefined;
            return;
        }

        that._buttonClicked = undefined;

        if (that._isDropDownClicked) {
            that._isDropDownClicked = false;
        }

        if (that._isPathInputDown === that.$.input || that._isPathInputDown === that.$.multiline) {
            that._isPathInputDown = undefined;
            return;
        }

        target = that._getUpEventTarget(target);

        if (target === undefined) {
            return;
        }

        if (target !== 'dropDownContainer' && target !== 'item' || target === 'item') {
            that.close();
        }
    }

    /**
     * Input keyDown event handler
     * @param {any} event
     */
    _inputKeyDownHandler(event) {
        const that = this;

        if (that.opened) {
            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowUp':
                case 'Home':
                case 'End':
                    event.preventDefault();

                    if (event.altKey && event.key === 'ArrowUp') {
                        that.close()
                        return;
                    }

                    that._handleKeyStrokes(event.key);
                    return;
            }
        }
        else if (event.altKey && event.key === 'ArrowDown') {
            event.preventDefault();
            that.open()
            return;
        }
        else if (event.key === 'PageDown' || event.key === 'PageUp') {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            if (that.wrap) {
                event.preventDefault();
            }

            if (that.opened) {
                that._handleItemSelection(that._focusedItem(), 'itemClick');
                that.close();
            }

            return;
        }

        if (that.opened && event.key === 'Escape') {
            event.preventDefault();
            that.close();
            return;
        }

        const meaniningfullKeys = /^[a-z0-9\/\\.:\s]$/gmi;

        if (meaniningfullKeys.test(event.key)) {
            that.$.multiline.removeAttribute('show-placeholder');
        }
    }

    /**
     * Return the focused item
     */
    _focusedItem() {
        const items = this.$.dropDownContainer.children;

        for (let i = 0; i < items.length; i++) {
            if (items[i].hasAttribute('focus')) {
                return items[i];
            }
        }
    }

    /**
     * Input keyUp event handler
     * @param {any} event
     */
    _inputKeyUpHandler(event) {
        const that = this;

        if (that.wrap) {
            const value = that.$.multiline.value;

            if (!value) {
                that.$.multiline.setAttribute('show-placeholder', '');
            }

            that.$.input.value = value;

            if (event.key === 'Enter') {
                const oldValue = that.value;

                that._handleValue(value);

                if (!value) {
                    that.set('value', '//');
                    that.$.multiline.value = that.$.input.value = '';
                }

                //Restores the curet position after the valeu is updated
                if (value) {
                    that._refreshInputSelection();
                }

                if (that.value !== oldValue) {
                    that.$.fireEvent('change', { oldValue: oldValue, value: value });
                }
            }

            that._updateDropDown();
            return;
        }

        if (that.opened) {
            that._inputChangeHandler(event);
        }

        if (event.key === 'Enter' && !that.$.input.value.length) {
            that.set('value', '//');
        }
    }

    /**
     * Refreshes the input selection after unTrimming the value
     */
    _refreshInputSelection(isFocusin) {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        if (!that.wrap) {
            that.$.input.setSelectionRange(0, that.$.input.value.length);
            return;
        }

        const range = new Range(),
            selection = window.getSelection(),
            lastNode = that.$.multiline.childNodes[that.$.multiline.childNodes.length - 1];

        if (!lastNode) {
            return;
        }

        range.setStart(lastNode, lastNode.length);
        range.collapse(true);

        if (isFocusin) {
            range.selectNodeContents(lastNode);
        }

        selection.removeAllRanges();
        selection.addRange(range);
    }

    /**
    * Gets the target of a document up event.
    */
    _getUpEventTarget(originalTarget) {
        const that = this;
        let target = originalTarget;

        target = target.parentElement === undefined ? target.getRootNode().host : target.parentElement;

        while (target) {
            if (target === that.$.dropDownContainer) {
                target = 'dropDownContainer';
                break;
            }

            target = target.parentElement === undefined ? target.getRootNode().host : target.parentElement;
        }

        return target;
    }

    /**
     * MouseOver Event Handler
     * @param {any} event
     */
    _mouseOverEventHandler(event) {
        const target = this.shadowRoot || this.isInShadowDOM ? event.composedPath()[0] : event.target,
            hoveredElement = target.closest('.lw-drop-down-button') || target.closest('.lw-browse-button') || target.closest('.lw-input') || target.closest('.lw-path-item');

        if (!hoveredElement || hoveredElement.hasAttribute('disabled')) {
            return;
        }

        if (event.type === 'mouseover') {
            hoveredElement.setAttribute('hover', '');
        }
        else {
            hoveredElement.removeAttribute('hover');
        }
    }


    /**
     * Creates the items for the drop down
     */
    _createItem(item) {
        const that = this;

        const htmlItem = document.createElement('div');

        if (typeof item === 'number') {
            item = '' + item;
        }

        const getMemberValue = function (memberName, defaultMemberName) {
            if (item[memberName] !== undefined) {
                return '' + item[memberName];
            }

            return item[defaultMemberName];
        }

        let label = (typeof item === 'string' ? item : getMemberValue(that.displayMember, 'label')) || '',
            value = (typeof item === 'string' ? item : getMemberValue(that.valueMember, 'value')) || '';

        htmlItem.label = htmlItem.innerHTML = '' + (that.localize(label) || label);
        htmlItem.value = '' + (value || label);

        item.disabled ? htmlItem.setAttribute('disabled', '') : htmlItem.removeAttribute('disabled');

        htmlItem.classList.add('lw-path-item');
        htmlItem.setAttribute('role', 'option');

        if (!htmlItem.id) {
            htmlItem.id = that.id + 'Item' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return htmlItem;
    }

    /**
    * Resize handler - recalculate the size of the popup if the element is initialized with a different size.
    */
    _resizeHandler() {
        const that = this;

        //Refresh the Multiline Trimming
        that._wrapRefresh();

        if (that.resizeMode === 'none') {
            that._calculateDropDownSize();
            that._setDropDownSize();
        }

        that._trim();
    }

    /**
     * Checks if trimming is neccessary when wrap is enable
     */
    _wrapRefresh() {
        const that = this;

        if (!that.wrap) {
            return;
        }

        that._handleValue(that.value);

        that.$.multiline.removeAttribute('position-absolute');

        //Used to prevent the multiline from interfere with the expected height of the element
        //It will not be used if the height of the element is 'auto'
        if (that.offsetHeight < that.$.multiline.offsetHeight) {
            that.$.multiline.setAttribute('position-absolute', '');
        }
    }

    /**
     * Style Changed event handler
     */
    _styleChangedHandler() {
        this._trim();
    }

    /**
    * Set DropDown Size.
    */
    _setDropDownSize() {
        const that = this;

        if (!that._dropDownSize) {
            that._calculateDropDownSize();
        }

        ['dropDownMinWidth', 'dropDownMinHeight', 'dropDownMaxWidth', 'dropDownMaxHeight'].forEach((name) => {
            that.$.dropDownContainer.style[name.replace('dropDown', '').replace(/^./, 'm')] = that[name] ? that[name] + (that[name].toString().endsWith('%') ? '%' : 'px') : null;
        });

        if (that.dropDownWidth) {
            if (that.dropDownWidth !== 'auto') {
                that.$.dropDownContainer.style.width = (that.dropDownWidth === 'initial' ? that.offsetWidth : parseFloat(that.dropDownWidth)) + 'px';
            }
            else {
                that.$.dropDownContainer.style.width = 'auto';
            }
        }
        else {
            that.$.dropDownContainer.style.width = that._dropDownSize.width === 'auto' ? 'auto' : (parseFloat(that._dropDownSize.width) || 0) + 'px';
        }

        if (that.dropDownHeight && that.dropDownHeight !== 'auto') {
            that.$.dropDownContainer.style.height = parseFloat(that.dropDownHeight) + ((that.dropDownHeight + '').indexOf('%') > -1 ? '%' : 'px');
        }
        else {
            that.$.dropDownContainer.style.height = that._dropDownSize.height;
        }
    }
});
