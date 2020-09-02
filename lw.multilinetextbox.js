
/**
* MultilineTextBox custom element.
*/
LW('lw-multiline-text-box', class MultilineTextBox extends LW.TextBox {
    /**
    * MultilineTextBox's properties
    */
    static get properties() {
        return {
            'autoCapitalize': {
                value: 'none',
                allowedValues: ['none', 'words', 'characters'],
                type: 'string'
            },
            'autoComplete': {
                value: 'off',
                allowedValues: ['on', 'off'],
                type: 'string'
            },
            'autoExpand': {
                value: false,
                type: 'boolean'
            },
            'cols': {
                value: 20,
                type: 'number?'
            },
            'enterKeyBehavior': {
                value: 'newLine',
                allowedValues: ['submit', 'clearOnSubmit', 'newLine'],
                type: 'string'
            },
            'horizontalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'minLength': {
                value: 0,
                type: 'number'
            },
            'resizable': {
                value: false,
                type: 'boolean'
            },
            'rows': {
                value: 5,
                type: 'number?'
            },
            'selectionDirection': {
                value: 'none',
                allowedValues: ['forward', 'backward', 'none'],
                type: 'string'
            },
            'selectionEnd': {
                value: 0,
                reflectToAttribute: false,
                type: 'number'
            },
            'selectionStart': {
                value: 0,
                reflectToAttribute: false,
                type: 'number'
            },
            'spellCheck': {
                value: false,
                type: 'boolean'
            },
            'type': {
                value: 'textarea',
                type: 'string',
                defaultReflectToAttribute: true,
                readonly: true
            },
            'verticalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'wrap': {
                value: 'soft',
                allowedValues: ['hard', 'soft', 'off'],
                type: 'string'
            }
        }
    }

    /**
   * CSS files needed for the element (ShadowDOM)
   */
    static get styleUrls() {
        return [
            'lw.textbox.css',
            'lw.multilinetextbox.css'
        ]
    }

    /**
    * MultilineTextBox's event listeners.
    */
    static get listeners() {
        return {
            'document.mousemove': '_documentSelectionOutsideHandler',
            'container.resize': '_handleScrollbarsDisplay',
            'document.move': '_resizeMoveHandler',
            'document.up': '_upHandler',
            'focus': '_focusHandler',
            'horizontalScrollBar.change': '_horizontalScrollbarHandler',
            'keydown': '_keyDownHandler',
            'mouseenter': '_mouseEventsHandler',
            'mouseleave': '_mouseEventsHandler',
            'resize': '_handleScrollbarsDisplay',
            'resizeElement.down': '_resizeDownHandler',
            'styleChanged': '_handleScrollbarsDisplay',
            'input.change': '_textBoxChangeHandler',
            'input.focus': '_focusHandler',
            'input.blur': '_blurHandler',
            'input.keydown': '_textBoxKeyDownHandler',
            'input.keyup': '_keyUpHandler',
            'input.paste': '_textBoxChangeHandler',
            'input.select': '_textBoxSelectHandler',
            'input.touchmove': '_inputTouchmoveHandler',
            'input.touchstart': '_inputTouchstartHandler',
            'wheel': '_mouseWheelHandler',
            'verticalScrollBar.change': '_verticalScrollbarHandler'
        }
    }

    /**
     * Called when the element is attached to the DOM.
     */
    attached() {
        const that = this;

        super.attached();

        if (!that._scrollView) {
            that._scrollView = new LW.Utilities.Scroll(that.$.input, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        }
    }

    detached() {
        const that = this;

        super.detached();

        if (that._scrollView) {
            that._scrollView.unlisten();
            delete that._scrollView;
        }
    }

    static get requires() {
        return {
            'LW.ScrollBar': 'lw.scrollbar.js'
        }
    }

    /**
    * MultilineTextBox's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <span id="label" inner-h-t-m-l="[[label]]" class="lw-label"></span>
                    <div id="innerContainer" class="lw-inner-container" role="presentation">
                            <textarea class="lw-input" id="input"
                                autocapitalize="[[autoCapitalize]]"
                                autocomplete="off"
                                cols="[[cols]]"
                                disabled="[[disabled]]"
                                maxlength="[[maxLength]]"
                                minlength="[[minLength]]"
                                name="[[name]]"
                                placeholder="[[placeholder]]"
                                readonly="[[readonly]]"
                                required="[[required]]"
                                rows="[[rows]]"
                                spellcheck="[[spellCheck]]"
                                wrap="[[wrap]]"
                                aria-label="[[placeholder]]"
                                autocomplete="[[inputPurpose]]"></textarea>
                            <lw-scroll-bar id="verticalScrollBar" right-to-left="[[rightToLeft]]" animation="[[animation]]" disabled="[[disabled]]" orientation="vertical"></lw-scroll-bar>
                            <lw-scroll-bar id="horizontalScrollBar" right-to-left="[[rightToLeft]]" animation="[[animation]]" disabled="[[disabled]]"></lw-scroll-bar>
                            <div id="resizeElement" class="lw-resize-element" aria-label="Resize"></div>

                            <textarea id="textBoxHidden"
                            class="lw-text-box-hidden"
                            autocapitalize="[[autoCapitalize]]"
                            autocomplete="off"
                            cols="[[cols]]"
                            disabled="[[disabled]]"
                            inner-h-t-m-l="[[value]]"
                            maxlength="[[maxLength]]"
                            minlength="[[minLength]]"
                            name="[[name]]"
                            placeholder="[[placeholder]]"
                            readonly="[[readonly]]"
                            required="[[required]]"
                            rows="[[rows]]"
                            spellcheck="[[spellCheck]]"
                            wrap="[[wrap]]"></textarea>
                    </div>
                    <span id="hint" class="lw-hidden lw-hint"></span>
                </div>`;
    }

    /**
    * Updates the TextBox when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'autoExpand':
                that._autoExpandUpdate();
                break;
            case 'displayMode':
                switch (newValue) {
                    case 'escaped':
                        that.$.input.value = that._toEscapedDisplayMode(that.value);
                        break;
                    default:
                        that.$.input.value = that.value = that._toDefaultDisplayMode(that.$.input.value);
                        break;
                }

                that._autoExpandUpdate();
                that._handleScrollbarsDisplay();
                break;
            case 'value':
                if (that._preventProgramaticValueChange) {
                    that._userValue = that.displayMode === 'escaped' ? that._toDefaultDisplayMode(that.$.input.value) : that.$.input.value;
                    that._programmaticValue = newValue;
                }
                else {
                    that._userValue = that._programmaticValue = newValue;
                }

                switch (that.displayMode) {
                    case 'escaped':
                        that.$.input.value = that._toEscapedDisplayMode(that._userValue);
                        break;
                    default:
                        that.$.input.value = that._userValue;
                        break;
                }

                that._oldValue = oldValue;
                that._autoExpandUpdate();
                that._handleScrollbarsDisplay();
                break;
            case 'horizontalScrollBarVisibility':
            case 'verticalScrollBarVisibility':
            case 'singleLine':
            case 'wrap':
            case 'resizable':
            case 'placeholder':
                that._autoExpandUpdate();
                that._handleScrollbarsDisplay();
                break;
            case 'selectionEnd':
            case 'selectionStart':
                that._handleSelectedText();
                break;
            case 'rows':
            case 'cols':
                that._updateSizeRowsCols();
                break;
            case 'disabled':
                that._setFocusable();
                that._ariaPropertyChangedHandler('disabled', newValue);
                break;
            case 'animation':
                break;
            case 'readonly':
                that._ariaPropertyChangedHandler('readonly', newValue);
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
    * Gets selected text in relation to a display mode
    */
    selection(displayMode) {
        const that = this;
        let start = that.$.input.selectionStart,
            end = that.$.input.selectionEnd,
            value = that.value;

        if (that.displayMode === 'escaped') {
            value = that.$.input.value.substring(start, end);

            if (displayMode === 'escaped') {
                return value;
            }
            else {
                return that._toDefaultDisplayMode(value);
            }
        }

        if (displayMode === 'escaped') {
            value = value.substring(start, end);
            return that._toEscapedDisplayMode(value);
        }

        value = value.substring(start, end);
        return value;
    }

    /**
    * Select Method
    */
    select(start, end) {
        const that = this,
            args = Array.from(arguments).slice(0, 2);

        let selectionStart, selectionEnd;

        for (let i in args) {
            args[i] = parseInt(args[i]) || 0;
        }

        if (args.length === 2) {
            selectionStart = Math.min([start, end]);
            selectionEnd = Math.max([start, end]);
        }
        else {
            selectionStart = args[0];
        }

        if (args.length === 2) {
            selectionStart = parseInt(selectionStart)

            if (selectionStart > 0) {
                selectionStart = selectionStart < that.$.input.length ? that.$.input.length : selectionStart;
            }
            else {
                selectionStart = 0;
            }

            if (selectionEnd < selectionStart) {
                selectionEnd = selectionStart;
            }
            else if (selectionEnd > that.$.input.length) {
                selectionStart = 0;
            }

            that.$.input.focus();
            that.$.input.setSelectionRange(selectionStart, selectionEnd);

            return;
        }
        else if (args.length === 1) {
            that.$.input.focus();
            that.$.input.setSelectionRange(selectionStart, selectionStart + 1);

            return;
        }

        that.$.input.select();
    }

    /**
    * Updates the height of the multiline text box according to the number of text rows
    */
    _autoExpandUpdate() {
        const that = this,
            input = that.$.input,
            textBoxHidden = that.$.textBoxHidden,
            vScroll = that.$.verticalScrollBar;

        if (!that.autoExpand) {
            input.style.height = vScroll.style.height = textBoxHidden.style.height = null;
            return;
        }

        const maxHeight = parseFloat(window.getComputedStyle(that).getPropertyValue('max-height'));

        textBoxHidden.style.height = 0;
        textBoxHidden.value = input.value;

        let resizeTriggerHeight = 0;

        //Note: Checks if the element has height 'auto'
        if (that.resizeTrigger) {
            resizeTriggerHeight = that.resizeTrigger.clientHeight;

            const multilineTextBox = that.clientHeight

            if (resizeTriggerHeight === multilineTextBox) {
                resizeTriggerHeight = 0;
            }
        }

        input.style.height = vScroll.style.height = (isNaN(maxHeight) ? textBoxHidden.scrollHeight :
            Math.min((maxHeight || 0) - resizeTriggerHeight, textBoxHidden.scrollHeight)) + 'px';
    }

    _blurHandler() {
        const that = this;

        if (that._outsideAutoScroll) {
            clearInterval(that._outsideAutoScroll); // new
        }

        that.removeAttribute('focus');
        that._preventProgramaticValueChange = false;
        that._oldValue = that.value;
        that.value = that._userValue || that.value;
        that.$.fireEvent('blur');
    }

    /**
    * MultilineTextBox create element method.
    */
    _createElement() {
        const that = this;

        if (!that.$.input.id) {
            that.$.input.id = that.id + 'Input';
        }

        if (that.autoFocus) {
            //that.$.input.focus();
            if (navigator.userAgent.match(/Edge/)) {
                setTimeout(function () {
                    that.$.input.focus();
                    that.setAttribute('focus', '');
                }, 10);
            }
            else {
                that.$.input.focus();
                that.setAttribute('focus', '');
            }
        }

        //  that.autoExpand = (that.theme.indexOf('material') > -1 || that.autoExpand) ? true : false;//

        const wrappedText = that.$.input.innerHTML;

        if (that.value) {
            that.$.input.innerHTML = that.displayMode === 'escaped' ? that._toEscapedDisplayMode(that.value) : that.value;
        }
        else if ((wrappedText.length > 0) && that.displayMode === 'escaped') {
            that.value = wrappedText;
            that.$.input.innerHTML = that._toEscapedDisplayMode(wrappedText)
        }
        else if (wrappedText.length > 0) {
            that.value = wrappedText;
        }

        that._setFocusable();
        that._syncTextBoxContentOnInitialization();
        that._scrollView = new LW.Utilities.Scroll(that.$.input, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        that._autoExpandUpdate();
        that._handleScrollbarsDisplay();
        that._initializationValue = that._oldValue = that.value;
        that.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');
        that._handleHintContainer();

        that.setAttribute('role', 'textbox');
        that.setAttribute('aria-multiline', true);
        that.setAttribute('aria-describedby', that.$.hint.id);
        that.setAttribute('aria-labelledby', that.$.label.id);
        that.$.verticalScrollBar.setAttribute('aria-controls', that.$.input.id);
        that.$.horizontalScrollBar.setAttribute('aria-controls', that.$.input.id);


    }

    /**
    * Handles the display of the scrollbars, based on set properties and text length.
    */
    _handleScrollbarsDisplay(event) {
        const that = this,
            textBox = that.$.input;

        requestAnimationFrame(() => {
            that._autoExpandUpdate();

            switch (that.horizontalScrollBarVisibility) {
                case 'disabled':
                    that.$container.addClass('hscroll');
                    that.$.horizontalScrollBar.disabled = true;
                    break;
                case 'hidden':
                    that.$container.removeClass('hscroll');
                    break;
                case 'visible':
                    that.$container.addClass('hscroll');
                    that._scrollView.scrollWidth = textBox.scrollWidth - textBox.clientWidth;
                    that._scrollView.scrollTo(that.$.input.scrollLeft, true);
                    that.$.horizontalScrollBar.disabled = false;
                    break;
                default:
                    if (textBox.scrollWidth > textBox.clientWidth) {
                        that.$container.addClass('hscroll');

                        that._scrollView.scrollWidth = textBox.scrollWidth - textBox.clientWidth;

                        if (event && event.type === 'resize') {
                            that.$.input.scrollLeft = that._scrollView.scrollLeft;
                        }
                        else {
                            that._scrollView.scrollTo(that.$.input.scrollLeft, true);
                        }
                    }
                    else {
                        that.$container.removeClass('hscroll');
                    }
                    that.$.horizontalScrollBar.disabled = false;
            }

            switch (that.verticalScrollBarVisibility) {
                case 'disabled':
                    that.$container.addClass('vscroll');
                    that.$.verticalScrollBar.disabled = true;
                    break;
                case 'hidden':
                    that.$container.removeClass('vscroll');
                    break;
                case 'visible':
                    that.$container.addClass('vscroll');
                    that._scrollView.scrollHeight = textBox.scrollHeight - textBox.clientHeight;
                    that._scrollView.scrollTo(that.$.input.scrollTop);
                    that.$.verticalScrollBar.disabled = false;
                    break;
                default:
                    if (textBox.scrollHeight > textBox.clientHeight) {
                        that.$container.addClass('vscroll');

                        that._scrollView.scrollHeight = textBox.scrollHeight - textBox.clientHeight;

                        if (event && event.type === 'resize') {
                            that.$.input.scrollTop = that._scrollView.scrollTop;
                        }
                        else {
                            that._scrollView.scrollTo(that.$.input.scrollTop);
                        }
                    }
                    else {
                        that.$container.removeClass('vscroll');
                    }

                    that.$.verticalScrollBar.disabled = false;
            }
        })
    }

    /**
   * Focus handler. Selects whole text in element's text area on selectAllOnFocus: true
   */
    _focusHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        if (event.target === that) {
            that.$.input.focus();
            that._edgeSelect = false;
            return;
        }

        that.setAttribute('focus', '');

        if (that.selectAllOnFocus) {
            if (navigator.userAgent.match(/Edge/)) {
                const scrollTop = that.$.input.scrollTop;

                if (that._edgeSelect) {
                    that._edgeSelect = false;
                    return;
                }

                setTimeout(function () {
                    that._edgeSelect = true;
                    that.$.input.select();
                    that.$.input.scrollTop = scrollTop;
                }, 5);
            }
            else {
                that.$.input.select();
            }
        }

        that.$.fireEvent('focus');
    }

    /**
    * Returns the scrollLeft of the input
    */
    _getScrollLeft(scrollLeft, scrollWidth) {
        const that = this;

        if (!that.rightToLeft) {
            return scrollLeft;
        }

        //Note: Chrome has a bug with direction: rtl. Doesn't inverse the scrollLeft
        //see: https://bugs.chromium.org/p/chromium/issues/detail?id=721759
        if (LW.Utilities.Core.Browser.Chrome) {
            if (!scrollWidth) {
                scrollWidth = that.$.input.scrollWidth - that.$.input.offsetWidth;
            }

            scrollLeft = scrollWidth - scrollLeft;
        }
        else {
            scrollLeft *= -1;
        }

        return scrollLeft;
    }

    /**
    * Horizontal scrollbar handler.
    */
    _horizontalScrollbarHandler(event) {
        const that = this;

        if (that.disabled || that.horizontalScrollBarVisibility === 'hidden' || that.horizontalScrollBarVisibility === 'disabled') {
            return;
        }

        event.stopPropagation();
        that.$.input.scrollLeft = that._getScrollLeft(event.detail.value);
    }

    /**
    * keyDown event handler.
    */
    _keyDownHandler(event) {
        const that = this,
            key = event.key,
            shiftKey = event.shiftKey,
            ctrlKey = event.ctrlKey,
            value = that.$.input.value;

        function replaceEscapedKeyWith(newValue) {
            let selectionStart = that.$.input.selectionStart,
                selectionEnd = that.$.input.selectionEnd,
                value = that.$.input.value;

            event.preventDefault();
            that.$.input.value = value.substring(0, selectionStart) + newValue + value.substring(selectionEnd, value.length);
            that.value = that._toDefaultDisplayMode(that.$.input.value);

            that.$.input.selectionStart = selectionStart + 2;
            that.$.input.selectionEnd = selectionStart + 2;
        }

        if (that.allowVerticalScrollbar && that.$.input.selectionEnd > (that.$.input.value.length - 5)) {
            that._scrollView.scrollTo(that._scrollView.scrollTop + (event.deltaY < 0 ? -that.offsetHeight : that.offsetHeight));
        }

        if (key.indexOf('Arrow') > -1) {
            event.stopPropagation();
            return;
        }

        switch (key) {
            case 'Enter': {
                if ((that.enterKeyBehavior === 'newLine' && !ctrlKey && !shiftKey) || (that.enterKeyBehavior !== 'newLine' && (ctrlKey || shiftKey))) {
                    if (that.displayMode === 'escaped') {
                        replaceEscapedKeyWith('\\n');
                    }

                    break;
                }

                event.preventDefault();

                that._userValue = that.displayMode === 'escaped' ? that._toDefaultDisplayMode(that.$.input.value) : that.$.input.value;
                that.value = that._userValue;

                if ((that.enterKeyBehavior === 'submit' || that.enterKeyBehavior === 'clearOnSubmit') || (value !== '' && that._userValue !== that._oldValue)) {
                    that.$.fireEvent('change', {
                        'oldValue': that._oldValue,
                        'value': value,
                        'type': 'submit'
                    });
                }

                if (that.enterKeyBehavior === 'clearOnSubmit') {
                    that.$.input.value = '';
                }

                that._oldValue = that.value = that._toDefaultDisplayMode(that.$.input.value);
                that._submitted = true;

                if (that.displayMode === 'escaped' && that.enterKeyBehavior.toLowerCase().indexOf('submit') < 0 && !ctrlKey && !shiftKey) {
                    replaceEscapedKeyWith('\\n');
                }

                if ((that.enterKeyBehavior === 'submit') || (that.enterKeyBehavior === 'newLine' && ctrlKey)) {
                    that.$.input.blur();
                }

                break;
            }
            case 'Escape':
                if (that.escKeyMode === 'none') {
                    return;
                }

                switch (that.escKeyMode) {
                    case 'none':
                        break;
                    case 'clearValue':
                        that.value = that.$.input.value = '';
                        break;
                    case 'previousValue':
                        that.$.input.value = that.displayMode === 'escaped' ? that._toEscapedDisplayMode(that._oldValue) : that._oldValue;
                        break;
                }

                break;
            case ' ':
                if (that.displayMode === 'escaped') {
                    replaceEscapedKeyWith('\\s');
                }
                break;
            case 'Backspace':
                if ((that.displayMode === 'escaped') && (that.$.input.selectionStart === that.$.input.selectionEnd)) {
                    let carretPosition = that.$.input.selectionStart;

                    if ((value[carretPosition - 2] === '\\') && ((value[carretPosition - 1] === 's') || (value[carretPosition - 1] === 'n'))) {
                        that.$.input.value = that.$.input.value.substring(0, carretPosition - 2) + that.$.input.value.substring(carretPosition - 2, that.$.input.value.length);
                        that.$.input.selectionStart = carretPosition - 2;
                    }
                }

                if (that._scrollView) {
                    that._handleScrollbarsDisplay();
                }
                break;
        }
    }

    /**
    * TextBox keyUp event handler.
    */
    _keyUpHandler(event) {
        const that = this,
            key = event.key;

        switch (key) {
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                that._handlePointerInEscapedSymbol();
                break;
            case 'ArrowRight':
                that._handlePointerInEscapedSymbol('next');
                break;
        }

        that._userValue = that.displayMode === 'escaped' ? that._toDefaultDisplayMode(that.$.input.value) : that.$.input.value;

        that._submitKeyUpHandler();
    }

    /**
   * MultilineTextBox keyDown event handler.
   */
    _textBoxKeyDownHandler(event) {
        const that = this,
            key = event.key;

        if (that._scrollView) {
            that._handleScrollbarsDisplay();
        }

        that.value && that.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');

        if (['Enter', 'Escape'].indexOf(key) === -1) {
            that._preventProgramaticValueChange = true;
        }

        if (['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].indexOf(key) > -1) {
            that._scrollView.scrollTo(that.$.input.scrollTop);
        }

        if (['PageUp', 'PageDown'].indexOf(key) > -1 && LW.Utilities.Core.Browser.Chrome) {
            if (event.key === 'PageUp') {
                that.$.input.setSelectionRange(0, 0);
                that.$.input.scrollTop = 0;
            }

            if (event.key === 'PageDown') {
                that.$.input.setSelectionRange(that.$.input.value.length, that.$.input.value.length);
                that.$.input.scrollTop = that._scrollView.verticalScrollBar.max;
            }

            event.preventDefault();
        }
    }

    /**
    * Mouse wheel handler.
    */
    _mouseWheelHandler(event) {
        const that = this;

        if (that.disabled || that.$.verticalScrollBar.disabled) {
            return;
        }

        that._scrollView.scrollTo(that._scrollView.scrollTop + (event.deltaY < 0 ? -that.offsetHeight : that.offsetHeight));
        that.$.input.scrollTop += event.deltaY < 0 ? -that.offsetHeight : that.offsetHeight;

        if (that.$.input.scrollTop > 0) {
            event.preventDefault();
        }
    }

    /**
    * Gets the text in the TextBox before widget's initialization
    */
    _syncTextBoxContentOnInitialization() {
        const that = this;
        let value;

        if (that.value === '') {
            value = that.innerHTML;
        }
        else {
            value = that.value;
        }

        if (that.displayMode === 'escaped') {
            if (value.match(/\r\n|\n\r|\n|\r|\s|\t|\f|\r/g)) {
                that.value = that._initializationValue = value;
                that.$.input.value = that._toEscapedDisplayMode(value);
            }
            else {
                that.value = that._initializationValue = that._toDefaultDisplayMode(value);
                that.$.input.value = value;
            }

            return;
        }

        that.$.input.value = that.value = that._initializationValue = value;
    }

    /**
    * TextBox change handler.
    */
    _textBoxChangeHandler(event) {
        const that = this,
            clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData) || window.clipboardData,
            oldValue = that.value;

        if (that.displayMode === 'escaped') {
            const selectionStart = that.$.input.selectionStart,
                selectionEnd = that.$.input.selectionEnd;

            if (clipboardData) {
                let clipboardValue = clipboardData.getData('text'),
                    value = that.$.input.value;

                event.preventDefault();
                clipboardValue = that._toEscapedDisplayMode(clipboardValue);
                that.$.input.value = value.substring(0, selectionStart) + clipboardValue + value.substring(selectionEnd, value.length);
            }

            that.value = that._toDefaultDisplayMode(that.$.input.value);
        }
        else {
            that.value = that.$.input.value;
        }

        that._handleScrollbarsDisplay();
        that.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');

        if (!clipboardData) {
            that.$.fireEvent('change', {
                'value': that.value,
                'oldValue': oldValue,
                'type': 'blur'
            });
        }

        that._handleHintContainer();
    }

    /**
     * input touchmove handler.
     */
    _inputTouchmoveHandler(event) {
        const that = this;

        if ((that._resizeStarted || that._touchmoveInside) && event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const computedVerticalScrollBarVisibility = that.$.container.classList.contains('vscroll'),
            coords = that._touchCoords;

        if (!that.$.container.classList.contains('hscroll') && !computedVerticalScrollBarVisibility ||
            !coords) {
            return;
        }

        const scrollView = that._scrollView,
            touches = event.touches[0];
        let scrolled, scrollSize, coord, previousCoord;

        that._touchCoords = [touches.pageX, touches.pageY];

        if (computedVerticalScrollBarVisibility) {
            scrolled = scrollView.scrollTop;
            scrollSize = scrollView.scrollHeight;
            coord = touches.pageY;
            previousCoord = coords[1];
        }
        else {
            scrolled = scrollView.scrollLeft;
            scrollSize = scrollView.scrollWidth;
            coord = touches.pageX;
            previousCoord = coords[0];
        }

        const normalizedCoord = parseFloat(coord.toFixed(5)),
            normalizedPreviousCoord = parseFloat(previousCoord.toFixed(5));

        if (scrolled === 0 && normalizedCoord >= normalizedPreviousCoord || // pan up
            scrolled === scrollSize && normalizedCoord <= normalizedPreviousCoord) { // pan down
            return;
        }

        if (coord !== previousCoord) {
            that._touchmoveInside = true;
        }

        if (event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * input touchstart handler.
     */
    _inputTouchstartHandler(event) {
        const touches = event.touches[0];

        this._touchCoords = [touches.pageX, touches.pageY];
    }

    /**
    * Resize Element down handler.
    */
    _resizeDownHandler() {
        const that = this;

        if (that.disabled || !that.resizable) {
            return;
        }

        that._resizeStarted = true;
        that.$container.addClass('lw-resize');

        if (!that.readonly) {
            that.$.input.setAttribute('readonly', '');
        }
    }

    /**
    * Resize Element move handler.
    */
    _resizeMoveHandler(event) {
        const that = this;

        if (that.disabled || !that.resizable || !that._resizeStarted) {
            return;
        }

        const rectObject = that.getBoundingClientRect(),
            min = { width: 50, height: 50 },
            newWidth = that.rightToLeft ? (rectObject.width + rectObject.left - event.clientX) : (event.clientX - rectObject.left),
            newHeight = event.clientY - rectObject.top;

        if (newWidth > min.width) {
            that.style.width = newWidth + 'px';
        }

        if (newHeight > min.height) {
            that.style.height = newHeight + 'px';
        }
    }

    /**
    * Update size on cols and rows change.
    */
    _updateSizeRowsCols() {
        const that = this;

        that.$.container.removeAttribute('style');

        setTimeout(function () {
            if ((that.horizontalScrollBarVisibility === 'disabled' || that.horizontalScrollBarVisibility === 'hidden') && (that.verticalScrollBarVisibility === 'disabled' || that.verticalScrollBarVisibility === 'hidden')) {
                return;
            }

            const rectObject = that.getBoundingClientRect();

            that.$.container.style.width = rectObject.width + 'px';
            that.$.container.style.height = rectObject.height + 'px';
        }, 0);
    }

    /**
    * Up handler.
    */
    _upHandler(event) {
        const that = this;

        delete that._touchCoords;
        delete that._touchmoveInside;
        that._selectionStarted = false;

        if (that.disabled) {
            return;
        }

        if (event.originalEvent.target === that.$.input) {
            that._handlePointerInEscapedSymbol();
            return;
        }

        that.$container.removeClass('lw-resize');

        if (!that.readonly) {
            that.$.input.removeAttribute('readonly');
        }

        if (that._resizeStarted) {
            that.$.input.focus();
        }

        that._resizeStarted = false;
    }

    /**
    * Vertical scrollbar handler.
    */
    _verticalScrollbarHandler(event) {
        const that = this;

        if (that.disabled || that.verticalScrollBarVisibility === 'disabled' || that.verticalScrollBarVisibility === 'hidden') {
            return;
        }

        event.stopPropagation();
        that.$.input.scrollTop = event.detail.value;
    }

    /**
    * Used in drag outside support.
    */
    _documentDownHandler(event) {
        const that = this;

        that._selectionStarted = false;

        if (!event.originalEvent || !that.$.input.contains(event.originalEvent.target)) {
            return;
        }

        that._selectionStarted = true;
        that._selectionStartTime = new Date();
        that._pointerDown = { pageX: event.pageX, pageY: event.pageY };
        that._edgeSelect = false;
    }

    _documentSelectionOutsideHandler(event) {
        const that = this,
            coordOffset = 10;

        clearInterval(that._outsideAutoScroll);

        if (!that._selectionStarted) {
            return;
        }

        const inputCoord = that.$.input.getBoundingClientRect(),
            topBound = inputCoord.y + coordOffset,
            bottomBound = inputCoord.y + inputCoord.height - coordOffset;

        if (event.pageY > topBound && event.pageY < bottomBound) {
            return;
        }

        const standardClickDelay = 300;
        const isClick = new Date() - that._selectionStartTime < standardClickDelay;
        const isDrag = !isClick &&
            (Math.abs(that._pointerDown.pageX - event.pageX) >= 3 ||
                Math.abs(that._pointerDown.pageY - event.pageY) >= 3);

        if (!isDrag) {
            return;
        }

        that._outsideAutoScroll = setInterval(function () {
            scrollElement();
            scrollElement(true);
        }, 10);

        function scrollElement(horizontally) {
            const elementCoordinates = that.getBoundingClientRect(),
                documentElement = document.documentElement,
                pointerOffset = horizontally ? elementCoordinates.left + documentElement.scrollLeft - event.pageX : elementCoordinates.top + documentElement.scrollTop - event.pageY,
                suffix = horizontally ? 'Left' : 'Top';

            if (pointerOffset > 0) {
                that.$.input['scroll' + suffix] -= 10;
                that._scrollView['scroll' + suffix] -= 10;
            }
            else {
                that.$.input['scroll' + suffix] += 10;
                that._scrollView['scroll' + suffix] += 10;
            }
        }
    }

    _selectStartHandler() { }
    _styleChangedHandler() { }
});