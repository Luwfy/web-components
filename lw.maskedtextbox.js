
/**
* MaskedTextBox custom element.
*/
LW('lw-masked-text-box', class MaskedTextBox extends LW.BaseElement {
    /**
    * MaskedTextBox's properties
    */
    static get properties() {
        return {
            'allowPromptAsInput': {
                value: false,
                type: 'boolean'
            },
            'asciiOnly': {
                value: false,
                type: 'boolean'
            },
            'autoFocus': {
                value: false,
                type: 'boolean'
            },
            'autoShowMask': {
                value: false,
                type: 'boolean'
            },
            'cutCopyMaskFormat': {
                value: 'excludePromptAndLiterals',
                allowedValues: ['excludePromptAndLiterals', 'includePrompt', 'includeLiterals', 'includePromptAndLiterals'],
                type: 'string'
            },
            'hidePromptOnLeave': {
                value: false,
                type: 'boolean'
            },
            'hint': {
                value: '',
                reflectToAttribute: true,
                type: 'string'
            },
            'isOverwriteMode': {
                value: false,
                type: 'boolean'
            },
            'label': {
                value: '',
                reflectToAttribute: true,
                type: 'string'
            },
            'mask': {
                value: '#####',
                type: 'string'
            },
            'maskCompleted': {
                value: false,
                type: 'boolean'
            },
            'maskFull': {
                value: false,
                type: 'boolean'
            },
            'maxLength': {
                value: null,
                type: 'number?'
            },
            'minLength': {
                value: 2,
                type: 'number'
            },
            'name': {
                value: '',
                type: 'string'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'promptChar': {
                value: '_',
                type: 'string'
            },
            'rejectInputOnFirstFailure': {
                value: false,
                type: 'boolean'
            },
            'resetOnPrompt': {
                value: false,
                type: 'boolean'
            },
            'resetOnSpace': {
                value: false,
                type: 'boolean'
            },
            'selectAllOnFocus': {
                value: false,
                type: 'boolean'
            },
            'textMaskFormat': {
                value: 'excludePromptAndLiterals',
                allowedValues: ['excludePromptAndLiterals', 'includePrompt', 'includeLiterals', 'includePromptAndLiterals'],
                type: 'string'
            },
            'validation': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'value': {
                value: null,
                reflectToAttribute: true,
                type: 'string?'
            }
        }
    }

    /**
    * MaskedTextBox's event listeners.
    */
    static get listeners() {
        return {
            'mouseenter': '_mouseEventsHandler',
            'mouseleave': '_mouseEventsHandler',
            'input.copy': '_cutCopyHandler',
            'input.change': '_textBoxChangeHandler',
            'input.cut': '_cutCopyHandler',
            'input.paste': '_textBoxPasteHandler',
            'input.keydown': '_textBoxKeyDownHandler',
            'input.keyup': '_textBoxKeyUpHandler',
            'input.blur': '_blurHandler',
            'input.focus': '_focusHandler'
        }
    }

    /**
   * CSS files needed for the element (ShadowDOM)
   */
    static get styleUrls() {
        return [
            'lw.textbox.css',
            'lw.maskedtextbox.css'
        ]
    }

    /**
    * MaskedTextBox's HTML template.
    */
    template() {
        return '<div id="container" role="presentation">' +
            '<span id="label" inner-h-t-m-l="[[label]]" class="lw-hidden lw-label"></span>' +
            `<input class="lw-input" type="text" id="input"
                   autocomplete="off"
                   autocorrect="off"
                   autocapitalize="off"
                   disabled="[[disabled]]"
                   maxlength="[[maxLength]]"
                   minlength="[[minLength]]"
                   name="[[name]]"
                   placeholder="[[placeholder]]"
                   readonly="[[readonly]]" />` +
            '<span id="hint" inner-h-t-m-l="[[hint]]" class="lw-hidden lw-hint"></span>' +
            '</div>';
    }

    /**
    * Updates the MaskedTextBox when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        // super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;
        let maskValue;

        switch (propertyName) {
            case 'hidePromptOnLeave':
                if (newValue && !that._focused) {
                    that._hidePrompt();
                }
                else if (that._promptHidden) {
                    that._showPrompt();
                }
                break;
            case 'maxLength':
                if (that.mask.length > 0) {
                    that.maxLength = oldValue;
                }
                break;
            case 'maskCompleted':
            case 'maskFull':
                that[propertyName] = oldValue;
                break;
            case 'promptChar':
                that._updatePromptChar();
                break;
            case 'placeholder':
                if (that._isPlaceholderRequired()) {
                    that.$.input.value = ''
                    that.$.removeClass('has-value');
                }
                else {
                    that._updatePromptChar();
                }
                that._updatePromptChar();
                break;
            case 'mask':
                maskValue = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, 'excludePromptAndLiterals');

                if (that._isPlaceholderRequired()) {
                    that.$.input.value = ''
                    that.$.removeClass('has-value');
                }
                else {
                    that._initializeMask();
                    that._setValueToMask(maskValue);
                    that._setMaskToInput();
                    that.maxLength = that._mask.length;

                    if (that._promptHidden) {
                        that._hidePrompt();
                    }
                }
                break;
            case 'value':
                that._overwrite = true;
                that._setValueToMask(newValue);
                that._overwrite = false;

                that._setMaskToInput();

                if (that._promptHidden) {
                    that._hidePrompt();
                }
                that._updateMaskFullAndCompleted();
                break;
            case 'disabled':
            case 'unfocusable':
                that._setFocusable();
                break;
            case 'readonly':
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }

        that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);
    }

    render() {
        const that = this;

        that._createElement();
        super.render();

    }


    /**
     * Focus method
     */
    focus() {
        this.$.input.focus();
    }

    /**
    * Sets tab index
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.$.input.tabIndex = -1;
            return;
        }

        that.$.input.removeAttribute('tabindex');
    }
    /**
    * MaskedTextBox create element method.
    */
    _createElement() {
        const that = this;

        if (that.autoFocus) {
            that.$.input.focus();
        }

        that.$.addClass('lw-input');
        that._setFocusable();
        that._initializeMask();
        that._updateMaxLength();

        if (that._isPlaceholderRequired()) {
            that.$.input.value = ''
            that.$.removeClass('has-value');
        }
        else {
            that._setValueToMask(that.value)
            that._setMaskToInput();
            that._updateMaskFullAndCompleted();
            that.$.addClass('has-value');
        }

        that.$.input.selectionStart = that.$.input.selectionEnd = 0;
        that._initializationValue = that._value = that.value;
        that._rejectInput = false;

        if (!that.$.label.id) {
            that.$.label.id = that.id + 'Label';
        }

        if (!that.$.hint.id) {
            that.$.hint.id = that.id + 'Hint';
        }

        if (!that.hint) {
            that.hint = that.placeholder;
        }

        that.setAttribute('role', 'presentation');
        that.$.input.setAttribute('aria-describedby', that.$.hint.id);
        that.$.input.setAttribute('aria-labelledby', that.$.label.id);
    }

    /**
    * MaskedTextBox blur handler.
    */
    _blurHandler() {
        const that = this,
            requiresPlaceholder = that._isPlaceholderRequired();

        if (that.disabled) {
            return;
        }

        if (that._valueBeforeChange !== that.value) {
            that.$.fireEvent('change', {
                'newValue': that.value,
                'oldValue': that._valueBeforeChange
            });
            that._valueBeforeChange = '';
        }


        that._hidePrompt();
        that._focused = false;
        that._validateMaskValue();

        that.removeAttribute('focus');
        that.$.input.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');


        if (requiresPlaceholder) {
            that.$.input.value = ''
            that.$.removeClass('has-value');
        }

        that.$.fireEvent('blur');
    }

    /*
    * Controlls maskFull and maskCompleted readonly properties
    */
    _updateMaskFullAndCompleted() {
        const that = this;
        let maskFull = true,
            maskCompleted = true,
            hasRequiredChar = false;

        for (let i = 0; i < that._mask.length; i++) {
            const maskElement = that._mask[i];

            if (maskElement.type === 'mask') {
                if (maskElement.required) {
                    hasRequiredChar = true;
                }

                if (maskElement.character === '') {
                    if (maskElement.required) {
                        maskCompleted = false;
                    }

                    maskFull = false;
                }
            }
        }

        if (!maskFull && maskCompleted && !hasRequiredChar) {
            maskCompleted = false;
        }

        that.maskFull = maskFull;
        that.maskCompleted = maskCompleted;
    }

    _isPlaceholderRequired() {
        const that = this,
            hasValue = (that.value && that.value.length > 0),
            hasPlaceholder = (that.placeholder.length > 0),
            isRequired = !hasValue && (hasPlaceholder || that.autoShowMask);

        return isRequired;
    }

    /*
    * Updates mask items with new value, based on the mask settings
    */
    _cleanMask(startsAt, endsAt) {
        const that = this;

        startsAt = startsAt ? startsAt : 0;
        endsAt = endsAt ? endsAt : that._mask.length;

        for (let i = startsAt; i < endsAt; i++) {
            let maskElement = that._mask[i];

            if (maskElement.type === 'mask') {
                that._mask[i].character = '';
            }
        }
    }

    /**
    *  Updates the clipboard data on cut/copy. The format of the value depends on cutCopyMaskFormat - ['excludePromptAndLiterals', 'includePrompt', 'includeLiterals', 'includePromptAndLiterals']
    */
    _cutCopyHandler(event, type) {
        const that = this,
            selectionStart = parseInt(that.$.input.selectionStart, 10),
            selectionEnd = parseInt(that.$.input.selectionEnd, 10),
            selection = that._getValueWithTextMaskFormat({ start: selectionStart, end: selectionEnd });

        if (window.clipboardData) {
            window.clipboardData.setData('text/plain', selection);
            window.clipboardData.setData('text/html', selection);
        }

        if (event) {
            that._preventDefault(event);
        }

        if (type === 'Copy') {
            return selection;
        }

        that._cleanMask(selectionStart, selectionEnd);
        that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);
        that._setMaskToInput();
        that.$.input.selectionStart = that.$.input.selectionEnd = selectionStart;
        that.maskFull = that.maskCompleted = false;

        return selection;
    }

    _documentUpHandler() {

    }

    /**
    *  Delete handler. Removes single character if selectionStart=selectionEnd or all selected chars aind replaces them with a mask fragment
    */
    _deleteHandler(event) {
        const that = this,
            selectionStart = that.$.input.selectionStart,
            selectionEnd = that.$.input.selectionEnd,
            key = event.key;

        let newSelectionStart = selectionStart;

        that._preventDefault(event);

        if (selectionStart === selectionEnd) {
            if (key === 'Backspace') {
                for (let i = selectionStart; i > 0; i--) {
                    const maskItem = that._mask[i - 1];

                    if (maskItem.type === 'mask') {
                        newSelectionStart = i - 1;
                        maskItem.character = '';
                        break;
                    }
                    else {
                        newSelectionStart = selectionStart - 1;
                        break;
                    }
                }
            }
            else {
                for (let i = selectionStart; i < that._mask.length; i++) {
                    const maskItem = that._mask[i];

                    if (maskItem.type === 'mask') {
                        newSelectionStart = i + 1;
                        maskItem.character = '';
                        break;
                    }
                    else {
                        newSelectionStart = selectionStart + 1;
                        break;
                    }
                }
            }
        }
        else {
            that._cleanMask(selectionStart, selectionEnd);
            if (key === 'Delete') {
                newSelectionStart = selectionEnd;
            }
        }

        that._setMaskToInput();
        that._updateMaskFullAndCompleted();
        that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);
        that.$.input.selectionStart = that.$.input.selectionEnd = newSelectionStart;
    }

    _findNextOccupiedPosition(start) {
        const that = this,
            maskLength = that._mask.length;
        let nextOccupiedPosition = start;

        for (let i = start; i < maskLength; i++) {
            let maskElement = that._mask[i];

            if ((maskElement.type === 'mask') && (maskElement.character === '')) {
                nextOccupiedPosition++;
            }
            else {
                break;
            }
        }

        return nextOccupiedPosition;
    }

    /**
    * MaskedTextBox focus handler
    */
    _focusHandler(event) {
        const that = this;

        if (event.context.nodeName.toUpperCase() !== 'INPUT') {
            that.$.input.focus();
            return;
        }

        if (that.disabled) {
            return;
        }

        that.setAttribute('focus', '');

        if (that.selectAllOnFocus) {
            that.$.input.select();
        }


        that._showPrompt();
        that._focused = true;


        if (that._isPlaceholderRequired()) {
            that._initializeMask();
            that._setValueToMask(that.value);
            that._setMaskToInput();

            const selectionStart = that._getEditableSelectionStart(0);
            that.$.input.selectionStart = that.$.input.selectionEnd = selectionStart;

        }

        that.$.fireEvent('focus');
    }

    /*
    * Combines mask elements into string and updates input's value
    */
    _setMaskToInput() {
        const that = this;
        let mask = '';

        for (let i = 0; i < that._mask.length; i++) {
            const maskElement = that._mask[i];
            let newCharacter;

            if (maskElement.type === 'literal' || maskElement.type === 'separator' || maskElement.type === 'placeholder' || maskElement.type === 'currency') {
                newCharacter = maskElement.character;
            }
            else if (maskElement.type === 'mask' && maskElement.character !== '') {
                switch (maskElement.escapeSymbol) {
                    case '>':
                        newCharacter = maskElement.character.toUpperCase();
                        break;
                    case '<':
                        newCharacter = maskElement.character.toLowerCase();
                        break;
                    case '|':
                        newCharacter = maskElement.character;
                        break;
                    case '\\':
                        newCharacter = maskElement.character;
                        break;
                    default:
                        newCharacter = maskElement.character;
                        break;
                }
            }
            else {
                newCharacter = maskElement.defaultCharacter;
            }

            mask = mask + newCharacter;
        }

        that.$.input.value = mask;
    }


    /**
    *  Check if the entered character is format symbol
    */
    _getEditableSelectionStart(selectionStart, key) {
        const that = this;

        for (let i = selectionStart; i < that._mask.length; i++) {
            const maskItem = that._mask[i];

            if (maskItem.type !== 'mask') {
                continue;
            }

            if (maskItem.character !== '' && !that.isOverwriteMode &&
                !(key === ' ' && that.resetOnSpace) &&
                !(key === that.promptChar && that.resetOnPrompt)) {
                continue;
            }

            return i;
        }

        return -1;
    }

    _getNonEditableSelectionStart(selectionStart, key) {
        const that = this;

        for (let i = selectionStart; i < that._mask.length; i++) {
            const maskItem = that._mask[i];

            if (maskItem.type === 'mask') {
                continue;
            }

            if (maskItem.character === key) {
                return i;
            }
        }

        return -1;
    }

    /**
    *  Updates value in relation to the textMaskFormat
    */
    _getValueWithTextMaskFormat(range, maskFormat) {
        const that = this,
            rangeStart = range ? range.start : 0,
            rangeEnd = range ? range.end : (that._mask.length || that.$.input.value.length);
        let value = '';

        maskFormat = maskFormat ? maskFormat : that.cutCopyMaskFormat;

        if (maskFormat === 'includePromptAndLiterals') {
            return that.$.input.value.substring(rangeStart, rangeEnd);
        }

        for (let i = rangeStart; i < rangeEnd; i++) {
            const maskElement = that._mask[i];

            switch (maskFormat) {
                case 'excludePromptAndLiterals':
                    if (maskElement.type !== 'mask') {
                        continue;
                    }

                    value = maskElement.character === '' ? (value + ' ') : (value + maskElement.character);
                    break;
                case 'includePrompt':
                    if (maskElement.type !== 'mask') {
                        continue;
                    }

                    value = maskElement.character === '' ? (value + maskElement.defaultCharacter) : (value + maskElement.character);
                    break;
                case 'includeLiterals':
                    if (maskElement.type === 'mask' && maskElement.character === '') {
                        continue;
                    }

                    value = value + maskElement.character;
                    break;
            }
        }

        return value.trim();
    }

    /**
    *  Hides prompt characters on blur when promt is hidden on hidePromptOnLeave=true
    */
    _hidePrompt() {
        const that = this,
            regex = new RegExp(that.promptChar, 'g');

        if (that.disabled || !that.hidePromptOnLeave || that.mask.length === 0) {
            return;
        }

        that.$.input.value = that.$.input.value.replace(regex, ' ');
        that._promptHidden = true;
    }

    /**
     *  Mask string is transformed to array of mask items
     */
    _initializeMask() {
        const that = this;
        let maskLength = that.mask.length,
            escapeSymbol;

        that._mask = [];

        if (that.mask === undefined || that.mask === null || that.mask.length === 0) {
            return;
        }

        for (let i = 0; i < maskLength; i++) {
            const maskChar = that.mask.charAt(i);
            let maskElement = {};

            maskElement.defaultCharacter = that.promptChar;

            switch (maskChar) {
                case '0':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask'; // types : mask, literal, placeholder, separator, currency
                    maskElement.maskCharacter = '0';
                    maskElement.regex = '\\d';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '9':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = '9';
                    maskElement.regex = '(\\d|\\s)';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '#':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = '#';
                    maskElement.regex = '(\\d|\\s|[+]|[-])';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'L':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'L';
                    maskElement.regex = '([a-zA-Zа-яА-Я])';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '?':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = '?';
                    maskElement.regex = '[a-zA-Zа-яА-Я]?';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '&':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = '&';
                    maskElement.regex = '[^\\s]';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'C':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'C';
                    maskElement.regex = '.';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'A':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'A';
                    maskElement.regex = '[a-zA-Zа-яА-Я0-9]'; //'[a-zA-Zа-яА-Я0-9]'
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'a':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'a';
                    maskElement.regex = '[a-zA-Zа-яА-Я0-9]?'; //'[a-zA-Zа-яА-Я0-9]'
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'Z':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'Z';
                    maskElement.regex = '[a-zA-Z0-9]';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'z':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'z';
                    maskElement.regex = '[a-zA-Z0-9]?';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'Y':
                    maskElement.editable = true;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'Y';
                    maskElement.regex = '[a-zA-Z]';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case 'y':
                    maskElement.editable = true;
                    maskElement.required = false;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = maskElement.escapeSymbol === '\\' ? 'literal' : 'mask';
                    maskElement.maskCharacter = 'y';
                    maskElement.regex = '[a-zA-Z]?';
                    maskElement.character = maskElement.escapeSymbol === '\\' ? maskElement.maskCharacter : '';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '.':
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'placeholder';
                    maskElement.maskCharacter = '.';
                    maskElement.regex = null;
                    maskElement.character = '.';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case ',':
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'placeholder';
                    maskElement.maskCharacter = ',';
                    maskElement.regex = null;
                    maskElement.character = ',';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case ':':
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'separator';
                    maskElement.maskCharacter = ':';
                    maskElement.regex = null;
                    maskElement.character = ':';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '/':
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'separator';
                    maskElement.maskCharacter = '/';
                    maskElement.regex = null;
                    maskElement.character = '/';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '$':
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'currency';
                    maskElement.maskCharacter = '$';
                    maskElement.regex = null;
                    maskElement.character = '$';
                    maskElement.defaultCharacter = that.promptChar;

                    escapeSymbol = null;
                    break;
                case '<':
                    //  escapeSymbol = escapeSymbol === '|' ? null : '<';
                    if (escapeSymbol) {
                        if (escapeSymbol === '|') {
                            escapeSymbol = null;
                        }
                        else if (escapeSymbol === '\\') {
                            maskElement.editable = false;
                            maskElement.required = true;
                            maskElement.escapeSymbol = escapeSymbol;
                            maskElement.type = 'literal';
                            maskElement.maskCharacter = '<';
                            maskElement.regex = '<';
                            maskElement.character = '<';
                            maskElement.defaultCharacter = that.promptChar;

                            escapeSymbol = null;
                        }
                        else {
                            escapeSymbol = '<';
                        }
                    }
                    else {
                        escapeSymbol = '<';
                    }
                    break;
                case '>':
                    //escapeSymbol = escapeSymbol === '|' ? null : '>';
                    if (escapeSymbol) {
                        if (escapeSymbol === '|') {
                            escapeSymbol = null;
                        }
                        else if (escapeSymbol === '\\') {
                            maskElement.editable = false;
                            maskElement.required = true;
                            maskElement.escapeSymbol = escapeSymbol;
                            maskElement.type = 'literal';
                            maskElement.maskCharacter = '>';
                            maskElement.regex = '>';
                            maskElement.character = '>';
                            maskElement.defaultCharacter = that.promptChar;

                            escapeSymbol = null;
                        }
                        else {
                            escapeSymbol = '>';
                        }
                    }
                    else {
                        escapeSymbol = '>';
                    }
                    break;
                case '|':
                    //escapeSymbol = '|';
                    if (escapeSymbol) {
                        if (escapeSymbol === '\\') {
                            maskElement.editable = false;
                            maskElement.required = true;
                            maskElement.escapeSymbol = escapeSymbol;
                            maskElement.type = 'literal';
                            maskElement.maskCharacter = '|';
                            maskElement.regex = '|';
                            maskElement.character = '|';
                            maskElement.defaultCharacter = that.promptChar;

                            escapeSymbol = null;
                        }
                        else {
                            escapeSymbol = '|';
                        }
                    }
                    else {
                        escapeSymbol = '|';
                    }
                    break;
                case '\\':
                    //escapeSymbol = '\\';
                    if (escapeSymbol) {
                        if (escapeSymbol === '\\') {
                            maskElement.editable = false;
                            maskElement.required = true;
                            maskElement.escapeSymbol = escapeSymbol;
                            maskElement.type = 'literal';
                            maskElement.maskCharacter = '\\';
                            maskElement.regex = '\\'; // Invalid regular expression: /\/: \ at end of pattern
                            maskElement.character = '\\';
                            maskElement.defaultCharacter = that.promptChar;

                            escapeSymbol = null;
                        }
                        else {
                            escapeSymbol = '\\';
                        }
                    }
                    else {
                        escapeSymbol = '\\';
                    }
                    break;
                default: // literals
                    maskElement.editable = false;
                    maskElement.required = true;
                    maskElement.escapeSymbol = escapeSymbol;
                    maskElement.type = 'literal';
                    maskElement.maskCharacter = maskChar;
                    maskElement.regex = null;
                    maskElement.character = maskChar;
                    maskElement.defaultCharacter = maskChar;

                    escapeSymbol = null;
                    break;
            }

            if (escapeSymbol) {
                continue;
            }

            if (maskElement.type) {
                that._mask.push(maskElement);
            }
        }
    }

    /**
     * Base keyDownHandler
     */
    _keyDownHandler() {

    }

    /**
    *  Check if the entered character is allowed symbol
    */
    _validateInput(character, position) {
        const that = this,
            maskElement = that._mask[position],
            regEx = new RegExp(maskElement.regex);

        return regEx.test(character);
    }

    /*
    * Updates mask items with new value, based on the mask settings
    */
    _setValueToMask(value, selection) {
        const that = this,
            newValue = value || '',
            valueLength = newValue.length;

        const selectionStart = selection && selection.start ? selection.start : 0;
        const selectionEnd = selection && selection.end ? selection.end : that._mask.length;

        let latestUpdatedPosition = selectionStart,
            latestValueChar = 0;

        while (latestUpdatedPosition < selectionEnd && latestValueChar < valueLength) {
            if (that._mask[latestUpdatedPosition].type === 'mask') {
                latestValueChar++;
            }

            if (that._setCharAtPosition(newValue.charAt(latestValueChar - 1), latestUpdatedPosition) || that._mask[latestUpdatedPosition].type !== 'mask') {
                latestUpdatedPosition++;
            }
        }

        if (latestUpdatedPosition < selectionEnd) {
            for (let i = latestUpdatedPosition; i < selectionEnd; i++) {
                if (that._mask[i].type === 'mask') {
                    that._mask[i].character = '';
                }
            }
        }

        if (selection) {
            selection.start = latestUpdatedPosition;
        }
    }

    /**
     *  Combination of preventDefault and stopPropagation. Used in several places
     */
    _preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        if (event.stopPropagation) {
            event.stopPropagation();
        }
    }

    /**
    *  Shows prompt characters on focus when promt is hidden on hidePromptOnLeave=true
    */
    _showPrompt() {
        const that = this;

        if (that.disabled || !that._promptHidden) {
            return;
        }

        that._setMaskToInput();
    }

    /**
    *  MaskedTextBox change handler
    */
    _textBoxChangeHandler() {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);

        if (that._valueBeforeChange !== that.value) {
            that.$.fireEvent('change', {
                'newValue': that.value,
                'oldValue': that._valueBeforeChange
            });
            that._valueBeforeChange = '';

            that._validateMaskValue();
        }
    }

    /**
    *  MaskedTextBox key down handler
    */
    _textBoxKeyDownHandler(event) {
        const that = this,
            key = event.key,
            ctrlPressed = event.ctrlKey,
            //shiftPressed = event.shiftKey,
            ctrlHandledCodes = ['KeyA', 'KeyC', 'KeyV', 'KeyX'],
            selectionEnd = that.$.input.selectionEnd,
            asciiRegExpString = 'xxx[\x00-\x7F]+xxx',
            asciiRegExp = new RegExp(asciiRegExpString),
            allSupportedKeyboardCharacters = /^[a-zA-ZÀ-ÿа-яА-Я0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/;

        let selectionStart = that.$.input.selectionStart;



        if (ctrlPressed && (ctrlHandledCodes.indexOf(event.code) > -1)) {
            const performClipboard = function (command, callback) {
                const textArea = document.createElement('textarea');

                textArea.style.position = 'absolute';
                textArea.style.left = '-1000px';
                textArea.style.top = '-1000px';

                document.body.appendChild(textArea);
                textArea.focus();
                if (command === 'Paste') {
                    setTimeout(function () {
                        let value = textArea.value;

                        if (value.length === 0 && window.clipboardData) {
                            // pasteFrom.value = window.clipboardData.getData('Text');
                            textArea.value = window.clipboardData.getData('Text');

                            value = textArea.value;
                        }

                        textArea.parentNode.removeChild(textArea);
                        that.$.input.focus();
                        callback(value);
                    }, 25);
                }
                else {
                    textArea.value = that._cutCopyHandler(null, command);
                    textArea.focus();
                    textArea.setSelectionRange(0, textArea.value.length);
                    setTimeout(function () {
                        document.designMode = 'off';
                        textArea.focus();
                        textArea.parentNode.removeChild(textArea);
                        that.$.input.focus();
                    }, 25);

                    if (window.clipboardData) {
                        window.clipboardData.setData('Text', textArea.value);
                    }
                }
            };

            switch (event.code) {
                case 'KeyA':
                    that.$.input.setSelectionRange(0, that.$.input.value.length);
                    break;
                case 'KeyC':
                    performClipboard('Copy');
                    break;
                case 'KeyV':
                    performClipboard('Paste', function (text) {
                        const context = that.context;

                        that.context = that;
                        that._textBoxPasteHandler(null, text)
                        that.context = context;
                    });
                    break;
                case 'KeyX':
                    performClipboard('Cut');
                    break;
            }

            return;
        }

        if (key === 'Backspace') {
            that._deleteHandler(event);
            that._updateMaskFullAndCompleted();
            return;
        }


        if (key === 'Delete') {
            that._deleteHandler(event);
            that._updateMaskFullAndCompleted();
            return;
        }

        if (!that.allowPromptAsInput && (key === that.promptChar)) {
            that._preventDefault(event);
            return;
        }

        if (that.disabled || that.readonly || (that.asciiOnly && !asciiRegExp.test(key)) || (!allSupportedKeyboardCharacters.test(key) || key.length > 1)) {
            return;
        }

        that._preventDefault(event);

        if (selectionStart === selectionEnd && selectionStart === that.$.input.value.length) {
            return;
        }

        if (key === ' ' && !that.resetOnSpace) {
            return;
        }

        selectionStart = that._getEditableSelectionStart(selectionStart, key);

        const nonEditableKeyHandler = function () {
            selectionStart = that._getNonEditableSelectionStart(that.$.input.selectionStart, key);
            if (selectionStart !== -1) {
                that.$.input.selectionStart = that.$.input.selectionEnd = selectionStart + 1;
            }
        }

        if (selectionStart === -1) {
            nonEditableKeyHandler();
            return;
        }

        const isChanged = that._setCharAtPosition(key, selectionStart);

        if (isChanged) {
            that._setMaskToInput();
            that._updateMaskFullAndCompleted();
            that.$.input.selectionStart = that.$.input.selectionEnd = selectionStart + 1;
        }
        else {
            nonEditableKeyHandler();
        }
    }

    /**
    *  MaskedTextBox key up handler
    */
    _textBoxKeyUpHandler() {
        const that = this;

        const value = that.value;
        that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);

        if (value !== that.value) {
            that.$.fireEvent('change', {
                'newValue': that.value,
                'oldValue': value
            });
        }
    }

    /**
    *  MaskedTextBox paste handler
    */
    _textBoxPasteHandler(event, value) {
        const that = this,
            textBoxValue = that.$.input.value,
            selectionStart = that.$.input.selectionStart;
        let newValue,
            selectionEnd = that.$.input.selectionEnd;

        if (event) {
            that._preventDefault(event);
        }

        if (window.clipboardData && window.clipboardData.getData) {
            newValue = window.clipboardData.getData('Text');
        }
        else if (event && event.clipboardData && event.clipboardData.getData) {
            newValue = event.clipboardData.getData('text/plain');
        }
        else if (value) {
            newValue = value;
        }

        if ((selectionEnd - selectionStart) !== textBoxValue.length) {
            if (selectionStart === selectionEnd) {
                that.$.input.selectionEnd = selectionEnd = that._mask.length;
            }

            if (that.rejectInputOnFirstFailure) {
                let latestTestedValueChar = 0;

                for (let i = selectionStart; i < selectionEnd; i++) {
                    if (that._mask[i].type === 'mask') {
                        if (!that._validateInput(newValue.charAt(latestTestedValueChar), i)) {
                            that.$.input.selectionStart = that.$.input.selectionEnd = selectionStart;
                            return;
                        }
                        else {
                            latestTestedValueChar++;
                        }

                        if (latestTestedValueChar > newValue.length) {
                            break;
                        }
                    }
                }
            }

            const selection = { start: selectionStart, end: selectionEnd };

            that._overwrite = true;
            that._setValueToMask(newValue, selection);
            that._setMaskToInput();
            that._updateMaskFullAndCompleted();

            that.$.input.selectionStart = that.$.input.selectionEnd = selection.start;
            that.value = that._getValueWithTextMaskFormat({ start: 0, end: that._mask.length }, that.textMaskFormat);
        }
    }

    /*
    * Updates custom mask item
    */
    _setCharAtPosition(newChar, position) {
        const that = this,
            maskItem = that._mask[position];

        if (newChar === ' ' && that.resetOnSpace) {
            newChar = '';
        }

        if (maskItem.type !== 'mask' || that.readonly || that.disabled || !maskItem.editable) {
            return false;
        }

        if (newChar === '' && !that.resetOnSpace) {
            return false;
        }

        if (newChar === that.promptChar && !that.resetOnPrompt && that.allowPromptAsInput) {
            return false;
        }

        if (!that.isOverwriteMode && newChar !== '' && newChar !== that.promptChar && maskItem.character !== '' && !that._overwrite) {
            return false;
        }

        const regex = maskItem.regex;

        if (regex) {
            let regExpr = new RegExp(regex, 'i');

            if (regExpr.test(newChar)) {
                switch (maskItem.escapeSymbol) {
                    case '>':
                        newChar = newChar.toUpperCase();
                        break;
                    case '<':
                        newChar = newChar.toLowerCase();
                        break;
                }

                that._mask[position].character = newChar;
                return true;
            }
            else if (that.resetOnSpace && newChar === '') {
                that._mask[position].character = newChar;
                return true;
            }
            else if (that.resetOnPrompt && newChar === that.promptChar && that.allowPromptAsInput) {
                that._mask[position].character = '';
                return true;
            }

            return false;
        }

        return false;
    }

    /**
     *  Updates maxLength property and input's max length
     */
    _updateMaxLength() {
        const that = this;

        if (that._mask.length > 0) {
            that.maxLength = that._mask.length;
        }
    }

    /*
    * Updates prompt char
    */
    _updatePromptChar() {
        const that = this;

        for (let i = 0; i < that._mask.length; i++) {
            let maskElement = that._mask[i];

            maskElement.defaultCharacter = that.promptChar;
        }

        that._setMaskToInput();
    }

    /*
    * Validates the value according to the 'validation' property
    */
    _validateMaskValue() {
        const that = this;

        if (that.readonly || that.disabled || !that.validation || typeof that.validation !== 'function') {
            return;
        }

        const value = that.value;

        const success = that.validation(value);

        if (!success) {
            that.setAttribute('error', '');
        }
        else {
            that.removeAttribute('error');
        }

        that.$.fireEvent('validation', {
            'success': success
        });
    }

    _keyUpHandler() {
        return;
    }

    _resizeHandler() { }
    _selectStartHandler() { }
    _mouseWheelHandler() { }
    _applySelection() { }
    _setDropDownSize() { }
    _styleChangedHandler() { }
});