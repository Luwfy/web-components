
/**
 * Numeric text box custom element.
 */
LW('lw-numeric-text-box', class NumericTextBox extends LW.BaseElement {
    /**
     * Numeric text box's properties.
     */
    static get properties() {
        return {
            'decimalSeparator': {
                value: '.',
                type: 'string'
            },
            'dropDownAppendTo': {
                value: null,
                type: 'any'
            },
            'enableMouseWheelAction': {
                value: false,
                type: 'boolean'
            },
            'inputFormat': {
                value: 'integer',
                allowedValues: ['integer', 'floatingPoint', 'complex'],
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
            'leadingZeros': {
                value: false,
                type: 'boolean'
            },
            'max': {
                value: null,
                type: 'any'
            },
            'messages': {
                value: {
                    'en': {
                        'binary': 'BIN',
                        'octal': 'OCT',
                        'decimal': 'DEC',
                        'hexadecimal': 'HEX',
                        'integerOnly': 'lwNumericTextBox: The property {{property}} can only be set when inputFormat is integer.',
                        'noInteger': 'lwNumericTextBox: the property {{property}} cannot be set when inputFormat is integer.',
                        'significantPrecisionDigits': 'lwNumericTextBox: the properties significantDigits and precisionDigits cannot be set at the same time.'
                    }
                },
                type: 'object',
                extend: true
            },
            'min': {
                value: null,
                type: 'any'
            },
            'name': {
                value: '',
                type: 'string'
            },
            'nullable': {
                value: false,
                type: 'boolean'
            },
            'opened': {
                value: false,
                type: 'boolean'
            },
            'outputFormatString': {
                value: null,
                type: 'string?'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'dropDownEnabled': {
                value: false,
                type: 'boolean'
            },
            'precisionDigits': {
                value: null,
                type: 'number?'
            },
            'radix': {
                value: 10,
                allowedValues: ['2', '8', '10', '16', 2, 8, 10, 16, 'binary', 'octal', 'decimal', 'hexadecimal'],
                type: 'any'
            },
            'radixDisplay': {
                value: false,
                type: 'boolean'
            },
            'radixDisplayPosition': {
                value: 'left',
                allowedValues: ['left', 'right'],
                type: 'string'
            },
            'scientificNotation': {
                value: false,
                type: 'boolean'
            },
            'showDropDownValues': {
                value: false,
                type: 'boolean'
            },
            'showUnit': {
                value: false,
                type: 'boolean'
            },
            'significantDigits': {
                value: null,
                type: 'number?'
            },
            'spinButtons': {
                value: false,
                type: 'boolean'
            },
            'spinButtonsDelay': {
                value: 75,
                type: 'number'
            },
            'spinButtonsInitialDelay': {
                value: 0,
                type: 'number'
            },
            'spinButtonsPosition': {
                value: 'right',
                allowedValues: ['left', 'right'],
                type: 'string'
            },
            'spinButtonsStep': {
                value: '1',
                type: 'any'
            },
            'type': {
                value: 'numeric',
                type: 'string',
                defaultReflectToAttribute: true,
                readonly: true
            },
            'unit': {
                value: 'kg',
                type: 'string'
            },
            'validation': {
                value: 'strict',
                allowedValues: ['strict', 'interaction'],
                type: 'string'
            },
            'value': {
                value: '0',
                type: 'any?'
            },
            'wordLength': {
                value: 'int32',
                allowedValues: ['int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64'],
                type: 'string'
            }
        };
    }

    /**
     * Numeric text box's event listeners.
     */
    static get listeners() {
        return {
            'mouseenter': '_mouseenterMouseleaveHandler',
            'mouseleave': '_mouseenterMouseleaveHandler',
            'resize': '_resizeHandler',
            'downButton.click': '_downButtonClickHandler',
            'downButton.mouseenter': '_mouseenterMouseleaveHandler',
            'downButton.mouseleave': '_mouseenterMouseleaveHandler',
            'dropDown.click': '_dropDownItemClickHandler',
            'dropDown.mouseout': '_mouseenterMouseleaveHandler',
            'dropDown.mouseover': '_mouseenterMouseleaveHandler',
            'input.blur': '_inputBlurHandler',
            'input.change': '_inputChangeHandler',
            'input.focus': '_inputFocusHandler',
            'input.keydown': '_inputKeydownHandler',
            'input.keyup': '_inputKeyupHandler',
            'input.paste': '_inputPasteHandler',
            'input.wheel': '_inputWheelHandler',
            'radixDisplayButton.click': '_radixDisplayButtonClickHandler',
            'radixDisplayButton.mouseenter': '_mouseenterMouseleaveHandler',
            'radixDisplayButton.mouseleave': '_mouseenterMouseleaveHandler',
            'upButton.click': '_upButtonClickHandler',
            'upButton.mouseenter': '_mouseenterMouseleaveHandler',
            'upButton.mouseleave': '_mouseenterMouseleaveHandler',
            'document.down': '_documentMousedownHandler',
            'document.up': '_documentMouseupHandler'
        };
    }

    /**
     * Numeric text box's required files.
     */
    static get requires() {
        if (window.NIComplex) {
            return {
                'LW.Button': 'lw.button.js',
                'LW.Utilities.BigNumber': 'lw.math.js',
                'LW.Utilities.NumericProcessor': 'lw.numeric.js'
            };
        }

        return {
            'LW.Button': 'lw.button.js',
            'LW.Utilities.Complex': 'lw.complex.js',
            'LW.Utilities.BigNumber': 'lw.math.js',
            'LW.Utilities.NumericProcessor': 'lw.numeric.js'
        };
    }

    /**
     * CSS files needed for the element (ShadowDOM)
     */
    static get styleUrls() {
        return [
            'lw.button.css',
            'lw.numerictextbox.css'
        ]
    }

    /**
     * Numeric text box's HTML template.
     */
    template() {
        const template =
            `<div id="container" class="lw-container" role="presentation">
                <span id="label" inner-h-t-m-l="[[label]]" class="lw-label"></span>
                <div id="radixDisplayButton" class="lw-unselectable lw-input-addon lw-drop-down-button lw-numeric-text-box-component lw-numeric-text-box-radix-display" role="button" aria-haspopup="listbox"></div>
                <input id="input" type="text" spellcheck="false" class="lw-input lw-numeric-text-box-component" placeholder="[[placeholder]]" readonly="[[readonly]]" disabled="[[disabled]]" name="[[name]]" aria-label="[[placeholder]]" />
                <div id="unitDisplay" class="lw-unselectable lw-input-addon lw-drop-down-button lw-numeric-text-box-component lw-numeric-text-box-unit-display" role="presentation"></div>
                <div id="spinButtonsContainer" class="lw-input-addon lw-numeric-text-box-component lw-spin-buttons-container" role="presentation">
                    <lw-repeat-button initial-delay="[[spinButtonsInitialDelay]]" delay="[[spinButtonsDelay]]" animation="[[animation]]" unfocusable id="upButton" class="lw-spin-button" aria-label="Increment" right-to-left="[[rightToLeft]]">
                        <div class="lw-arrow lw-arrow-up" role="presentation" aria-hidden="true"></div>
                    </lw-repeat-button>
                    <lw-repeat-button initial-delay="[[spinButtonsInitialDelay]]" delay="[[spinButtonsDelay]]" animation="[[animation]]" unfocusable id="downButton" class="lw-spin-button" aria-label="Decrement" right-to-left="[[rightToLeft]]">
                        <div class="lw-arrow lw-arrow-down" role="presentation" aria-hidden="true"></div>
                    </lw-repeat-button>
                </div>
                <ul id="dropDown" class="lw-visibility-hidden lw-drop-down lw-numeric-text-box-drop-down" role="listbox">
                    <li id="dropDownItem2" class="lw-list-item" data-value="2" role="option"></li>
                    <li id="dropDownItem8" class="lw-list-item" data-value="8" role="option"></li>
                    <li id="dropDownItem10" class="lw-list-item" data-value="10" role="option"></li>
                    <li id="dropDownItem16" class="lw-list-item" data-value="16" role="option"></li>
                </ul>
                <span id="hint" class="lw-hint lw-hidden" inner-h-t-m-l="[[hint]]"></span>
            </div>`;

        return template;
    }

    /**
* Called when the element is attached from the DOM.
*/
    attached() {
        const that = this;

        super.attached();

        if (!that.isCompleted) {
            return;
        }

        that._positionDetection.dropDownAttached();
        that._positionDetection.checkBrowserBounds();
    }

    /**
     * Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (that.opened) {
            that._closeRadix(true);
        }

        if (that._positionDetection) {
            that._positionDetection.dropDownDetached();
        }
    }

    /**
     * Invoked when an instance of custom element is attached to the DOM for the first time.
     */
    ready() {
        super.ready();
    }

    render() {
        const that = this;

        that._numericProcessor = new LW.Utilities.NumericProcessor(that, 'inputFormat');
        that._numberRenderer = new LW.Utilities.NumberRenderer();
        that._numberRenderer.localizationObject.decimalseparator = that.decimalSeparator;
        that._positionDetection = new LW.Utilities.PositionDetection(that, that.$.dropDown, that.$.container, '_closeRadix');
        that._positionDetection.getDropDownParent(true);
        that._dropDownListPosition = 'bottom';

        if (that.rightToLeft) {
            that.spinButtonsPosition = that.spinButtonsPosition === 'right' ? 'left' : 'right';
        }

        that._setIds();

        that.setAttribute('aria-describedby', that.$.unitDisplay.id + ' ' + that.$.hint.id);

        if (!that.getAttribute('aria-labelledby')) {
            that.setAttribute('aria-labelledby', that.$.label.id);
        }

        that.$.radixDisplayButton.setAttribute('aria-owns', that.$.dropDown.id);

        if (that.rightToLeft && that.dropDownAppendTo !== null) {
            that.$.dropDown.setAttribute('right-to-left', '');
        }

        that._radixPrefixes = { 10: 'd', 2: 'b', 8: 'o', 16: 'x' };

        // regular expressions for binary, octal, decimal and hexadecimal numbers
        that._regex = {
            2: new RegExp(/^[0-1]+$/),
            8: new RegExp(/^[0-7]+$/),
            10: new RegExp(/^[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?$/),
            16: new RegExp(/^[0-9a-f]+$/i)
        };
        // regular expressions for special values
        that._regexSpecial = {
            nan: new RegExp(/^(nan)$/i),
            inf: new RegExp(/^((-?inf(inity)?)|([+\-]?∞))$/i),
            nonNumericValue: new RegExp(/^$|(^((nan)|((-?inf(inity)?)|([+\-]?∞))|(null))$)/i),
            exaValue: new RegExp(/^[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[E][+\-]\d*)?i$/)
        }

        that._initialDropDownOptionsSet = false;

        if (that.spinButtonsPosition === 'left') {
            that.$.container.insertBefore(that.$.spinButtonsContainer, that.$.label.nextElementSibling);
        }

        if (that.radixDisplayPosition === 'right') {
            that.$.container.insertBefore(that.$.radixDisplayButton, that.$.unitDisplay.nextElementSibling);
        }

        that._setInitialComponentDisplay();

        that._initialAdjustments();

        that._refreshShape();

        that._initialized = true;

        if(!that.hint) {
            that.hint = that.placeholder;
        }
        super.render();
    }

    /**
     * Sets ids to elements from the template (whenever necessary).
     */
    _setIds() {
        const that = this;

        if (!that.$.label.id) {
            that.$.label.id = that.id + 'Label';
        }

        if (!that.$.radixDisplayButton.id) {
            that.$.radixDisplayButton.id = that.id + 'RadixDisplayButton';
        }

        if (!that.$.unitDisplay.id) {
            that.$.unitDisplay.id = that.id + 'UnitDisplay';
        }

        if (!that.$.dropDown.id) {
            that.$.dropDown.id = that.id + 'DropDown';
        }

        if (!that.$.hint.id) {
            that.$.hint.id = that.id + 'Hint';
        }
    }

    _refreshShape() {
        const that = this,
            addons = that.$.container.querySelectorAll('.lw-numeric-text-box-component:not(.lw-hidden)');

        Array.from(that.$.container.getElementsByClassName('lw-numeric-text-box-component')).forEach(addon => addon.classList.remove('lw-numeric-text-box-component-border-left', 'lw-numeric-text-box-component-border-right'));

        if (addons.length > 0) {
            addons[0].classList.add('lw-numeric-text-box-component-border-left');
            addons[addons.length - 1].classList.add('lw-numeric-text-box-component-border-right');
        }
    }

    /*
     * Public methods
     */

    /**
     * Sets or gets the value of the numeric text box.
     *
     * @param {Number/String} value Optional value to be set to the numeric text box. If this parameter is not set, the method gets the value.
     * @param {Boolean} suppressValidation Optional If true is passed, the value is not validated.
     */
    val(value, suppressValidation) {
        const that = this,
            isEmptyObject = value !== null && typeof value === 'object' && Object.keys(value).length === 0;

        if (value !== undefined && isEmptyObject === false) {
            // use as value setter
            const oldValue = that.value;

            if ((value === '' || value === null) && oldValue === null) {
                return null;
            }

            if (value === null) {
                that._triggerChangeEvent = that.validation === 'strict';
                that._validate(false, null);
                that._triggerChangeEvent = false;
                that._programmaticValueIsSet = true;
                return;
            }

            value = value.toString();
            if (value.toUpperCase() !== oldValue.toString().toUpperCase()) {
                if (suppressValidation === undefined) {
                    // sets the value after validation
                    that._triggerChangeEvent = that.validation === 'strict';
                    that._validate(false, value);
                    that._triggerChangeEvent = false;
                }
                else {
                    // sets the value without validation
                    that._setValue(value);
                }

                that._programmaticValueIsSet = true;
            }
            else {
                return value;
            }
        }
        else {
            // use as value getter
            return that.value;
        }
    }

    /**
     * Focuses the input of the numeric text box.
     */
    focus() {
        this.$.input.focus();
    }

    /*
     * Private methods
     */

    /**
     * Updates the internal spin buttons step object ("_spinButtonsStepObject").
     */
    _updateSpinButtonsStepObject() {
        const that = this;
        that._spinButtonsStepObject = that._numericProcessor.createDescriptor(that.spinButtonsStep, true);
    }

    /**
     * Sets the initial display of the various numeric text box components.
     */
    _setInitialComponentDisplay() {
        const that = this;

        if (that.spinButtons === false) {
            that.$spinButtonsContainer.addClass('lw-hidden');
        }

        if (that.radixDisplay === false) {
            that.$radixDisplayButton.addClass('lw-hidden');
        }

        if (that.showUnit === false) {
            that.$unitDisplay.addClass('lw-hidden');
        }
    }

    /**
     * Makes initial validations and adjustments to the numeric text box.
     */
    _initialAdjustments() {
        const that = this;

        that._radixNumber = that._getRadix(that.radix);
        that._wordLengthNumber = that._numericProcessor.getWordLength(that.wordLength);

        that._validatePropertyCompatibility();
        that._numericProcessor.validateMinMax(true, true);

        that._updateSpinButtonsStepObject();

        that._validate(true);
        that._programmaticValueIsSet = true;
        that._cachedInputValue = that.$.input.value;

        if (that._editableValue === undefined) {
            that._editableValue = that._cachedInputValue;
        }

        that.$.radixDisplayButton.innerHTML = that._radixPrefixes[that._radixNumber];
        that.$.unitDisplay.innerHTML = that.unit;

        if (that.disabled) {
            that.$.upButton.disabled = true;
            that.$.downButton.disabled = true;
        }

        if (that.opened) {
            if (that.dropDownEnabled && !that.disabled && that.value !== null) {
                that._openRadix();
            }
            else {
                that.opened = false;
            }
        }

        that.$.radixDisplayButton.setAttribute('aria-expanded', that.opened);
        that._setFocusable();
    }

    /**
     * Validates some initial non-numeric property values.
     */
    _validatePropertyCompatibility() {
        const that = this;

        if (that.inputFormat !== 'integer') {
            if (that._radixNumber !== 10) {
                that.error(that.localize('integerOnly', { property: 'radix' }));
            }

            if (that.radixDisplay) {
                that.error(that.localize('integerOnly', { property: 'radixDisplay' }));
            }

            if (that.dropDownEnabled) {
                that.error(that.localize('integerOnly', { property: 'dropDownEnabled' }));
            }

            if (that.wordLength !== 'int32') {
                that.error(that.localize('integerOnly', { property: 'wordLength' }));
            }
        }
        else if (that.precisionDigits !== null) {
            that.error(that.localize('noInteger', { property: 'precisionDigits' }));
        }

        if (that.significantDigits === null && that.precisionDigits === null) {
            that.significantDigits = 8;
        }
        else if (that.significantDigits !== null && that.precisionDigits !== null) {
            that.error(that.localize('significantPrecisionDigits'));
        }
    }

    /**
     * Validates the value of the numeric text box.
     */
    _validate(initialValidation, programmaticValue) {
        const that = this;
        let value;

        if (initialValidation) {
            value = that.value;

            if (value === undefined) {
                if (that.nullable) {
                    value = null;
                }
                else {
                    value = '0';
                }
            }
        }
        else {
            if (programmaticValue === undefined || (programmaticValue === null && !that.nullable)) {
                value = that.$.input.value;
                if (value === that.value && that._programmaticValueIsSet !== true) {
                    that.$.input.value = that._cachedInputValue;
                    return;
                }
            }
            else {
                value = programmaticValue;
            }
        }

        if (that.nullable && (value === null || value === '')) {
            that.value = null;
            that._number = null;
            that.$.input.value = '';
            that._cachedInputValue = '';
            that._editableValue = '';
            that._disableComponents();
            return;
        }

        const validationOptions = that._numericProcessor.prepareForValidation(initialValidation, programmaticValue, value);
        if (validationOptions === undefined) {
            that._disableComponents();
            return;
        }

        const validNumber = that._numericProcessor.createDescriptor(
            validationOptions.value,
            true,
            true,
            (!initialValidation && programmaticValue === undefined) || that.validation === 'strict',
            initialValidation || programmaticValue !== undefined,
            validationOptions.enteredComplexNumber
        );

        if (initialValidation) {
            that._number = validNumber;
            let renderedValue = that._renderValue(validNumber);
            that.value = validNumber.toString();
            that.$.input.value = renderedValue;
        }
        else {
            that._updateValue(validNumber);
        }

        that._programmaticValueIsSet = false;

        that._disableComponents();
    }

    /**
     * Validates the value of the numeric text box when it is not a number.
     */
    _handleNonNumericValue(initialValidation, programmaticValue, value) {
        const that = this;
        if (that.inputFormat !== 'integer') {
            if (that._regexSpecial.nan.test(value)) {
                // 'NaN' (or a derivative) has been entered
                that._handleNaN(initialValidation);
                return;
            }

            if (that._regexSpecial.inf.test(value)) {
                // '(-)Inf' (or a derivative) has been entered
                that._handleInfinity(initialValidation, programmaticValue, value);
                return;
            }
        }

        // invalid input
        if (initialValidation) {
            let defaultValue = that._numericProcessor.createDescriptor(0);
            that._number = that._validateRange(defaultValue);
            const defaultValidValue = that._renderValue(that._number);
            that.value = that._number.toString();
            that.$.input.value = defaultValidValue;
        }
        else {
            // the old value is reverted
            if (programmaticValue === undefined) {
                that.$.input.value = that._cachedInputValue;
            }
            else {
                const correctValue = that._number.toString();
                if (that.value !== correctValue) {
                    that.value = correctValue;
                }
            }
        }
    }

    /**
     * Handles NaN (or derivative) entered value.
     */
    _handleNaN(initialValidation) {
        const that = this;

        that.$.input.value = 'NaN';

        if (initialValidation) {
            that.value = NaN;
            that._number = NaN;
        }
        else {
            const oldValue = that.value;

            if (oldValue === null || oldValue.toString() !== 'NaN') {
                that.value = NaN;
                that._number = NaN;

                that._cachedInputValue = 'NaN';
                that._editableValue = 'NaN';
                if (that._triggerChangeEvent) {
                    that.$.fireEvent('change', { 'value': NaN, 'oldValue': oldValue, 'radix': that._radixNumber });
                }
            }
        }
    }

    /**
     * Handles (-)Infinity (or derivative) entered value.
     */
    _handleInfinity(initialValidation, programmaticValue, value) {
        const that = this;
        let newInputValue, newValue;

        if (value.charAt(0) === '-') {
            if (value.charAt(1) === '∞') {
                newInputValue = '-∞';
            }
            else {
                newInputValue = '-Inf';
            }

            newValue = -Infinity;
        }
        else {
            if (value.indexOf('∞') !== -1) {
                newInputValue = '∞';
            }
            else {
                newInputValue = 'Inf';
            }

            newValue = Infinity;
        }

        if (newValue === -Infinity && that.min === -Infinity ||
            newValue === Infinity && that.max === Infinity ||
            programmaticValue !== undefined) {
            if (initialValidation) {
                that.value = newValue;
                that._number = newValue;
                that.$.input.value = newInputValue;
            }
            else {
                const oldValue = that.value;
                if (value !== newInputValue) {
                    that.$.input.value = newInputValue;
                }

                if (oldValue !== newValue) {
                    that.value = newValue;
                    that._number = newValue;

                    that._cachedInputValue = newInputValue;
                    that._editableValue = newInputValue;
                    if (that._triggerChangeEvent) {
                        that.$.fireEvent('change', { 'value': newValue, 'oldValue': oldValue, 'radix': that._radixNumber });
                    }
                }
            }
        }
        else {
            // if -Infinity/Infinity is out of the "min"-"max" range, the value is set to "min"/"max" instead
            if (newValue === -Infinity) {
                that._validate(false, that.min);
            }
            else {
                that._validate(false, that.max);
            }
        }
    }

    /**
     * Checks if the value is within the range from min to max.
     */
    _validateRange(numberToValidate) {
        const that = this;
        numberToValidate = that._numericProcessor.validate(numberToValidate, that._minObject, that._maxObject);
        return numberToValidate;
    }

    /**
     * Invoked when the value of a public property has been changed by the user.
     */
    propertyChangedHandler(key, oldValue, value) {
        super.propertyChangedHandler(key, oldValue, value);

        const that = this,
            input = that.$.input;

        function handleLeadingZeros() {
            if (that._initialDropDownOptionsSet === true) {
                that._setDropDownOptions(true);
            }

            if (that._radixNumber === 2 || that._radixNumber === 16) {
                that._cachedInputValue = that._number.toString(that._radixNumber, that._wordLengthNumber, that.leadingZeros);
                that._editableValue = that._cachedInputValue;
                that.$.input.value = that._cachedInputValue;
            }
        }

        // eslint-disable-next-line
        if (value != oldValue) {
            switch (key) {
                case 'disabled':
                    that._setFocusable();

                    if (value === true) {
                        that.$.upButton.disabled = true;
                        that.$.downButton.disabled = true;
                    }
                    else {
                        that._disableComponents();
                    }

                    break;
                case 'dropDownAppendTo':
                    that._positionDetection.dropDownAppendToChangedHandler();

                    that.$.dropDown.removeAttribute('right-to-left');

                    if (that.rightToLeft && value !== null) {
                        that.$.dropDown.setAttribute('right-to-left', '');
                    }
                    break;
                case 'unfocusable':
                    that._setFocusable();
                    break;
                case 'enableMouseWheelAction':
                case 'placeholder':
                case 'readonly':
                case 'spinButtonsDelay':
                case 'spinButtonsInitialDelay':
                    break;
                case 'value': {
                    if (value === '' && oldValue === null) {
                        return;
                    }

                    if (value === null || value === '' || oldValue === null) {
                        that.value = oldValue;
                        that._triggerChangeEvent = that.validation === 'strict';
                        that._validate(false, value);
                        that._triggerChangeEvent = false;
                        that._programmaticValueIsSet = true;
                        return;
                    }

                    const stringValue = value.toString(),
                        stringOldValue = oldValue.toString();

                    if (stringOldValue !== stringValue) {
                        if (stringOldValue.toUpperCase() === stringValue.toUpperCase()) {
                            that.value = oldValue;
                        }

                        that.value = oldValue;
                        that._triggerChangeEvent = that.validation === 'strict';
                        that._validate(false, stringValue);
                        that._triggerChangeEvent = false;
                        that._programmaticValueIsSet = true;
                    }
                    break;
                }
                case 'radix':
                    if (that.inputFormat === 'integer') {
                        that._changeRadix(value);
                    }
                    else {
                        that.error(that.localize('integerOnly', { property: 'radix' }));
                    }
                    break;
                case 'rightToLeft':
                    if (that.dropDownAppendTo !== null) {
                        value ? that.$.dropDown.setAttribute('right-to-left', '') : that.$.dropDown.removeAttribute('right-to-left');
                    }

                    break;
                case 'leadingZeros':
                    if (that.inputFormat === 'integer' && that._number !== null) {
                        handleLeadingZeros();
                    }

                    break;
                case 'min':
                case 'max': {
                    if (value !== null) {
                        that[`_${key}IsNull`] = false;
                    }

                    that._numericProcessor.validateMinMax(key === 'min', key === 'max');

                    if (that.validation === 'strict') {
                        that._triggerChangeEvent = true;
                        that._validate(false, that.value);
                        that._triggerChangeEvent = false;
                    }
                    else if (that._regexSpecial.nonNumericValue.test(that.value) === false) {
                        const numberToValidate = that._numericProcessor.createDescriptor(that._number),
                            validValue = that._validateRange(numberToValidate);

                        if (that._numericProcessor.compare(that.value, validValue) === true) {
                            that._programmaticValueIsSet = true;
                        }
                    }
                    break;
                }
                case 'opened':
                    if (value) {
                        if (that.dropDownEnabled && !that.disabled && that.value !== null) {
                            that._openRadix();
                        }
                        else {
                            that.opened = false;
                            that.$.radixDisplayButton.setAttribute('aria-expanded', false);
                        }
                    }
                    else {
                        that._closeRadix(false, true);
                    }
                    break;
                case 'outputFormatString':
                    if (value) {
                        that._cachedInputValue = that._numberRenderer.formatNumber(that._number, value);
                        that.$.input.value = that._cachedInputValue;
                    }
                    else {
                        that._cachedInputValue = that._editableValue;
                        that.$.input.value = that._editableValue;
                    }

                    break;
                case 'dropDownEnabled':
                    if (value) {
                        if (that.inputFormat !== 'integer') {
                            that.error(that.localize('integerOnly', { property: 'dropDownEnabled' }));
                        }

                        if (that._initialDropDownOptionsSet === true) {
                            that._setDropDownOptions(true);
                        }
                    }
                    else if (that.opened) {
                        that._closeRadix(true);
                    }
                    break;
                case 'spinButtons':
                    if (value) {
                        that.$spinButtonsContainer.removeClass('lw-hidden');
                    }
                    else {
                        that.$spinButtonsContainer.addClass('lw-hidden');
                    }
                    that._refreshShape();
                    break;
                case 'spinButtonsStep':
                    that._updateSpinButtonsStepObject();
                    break;
                case 'significantDigits':
                case 'precisionDigits': {
                    if (key === 'precisionDigits' && that.inputFormat === 'integer') {
                        that.error(that.localize('noInteger', { property: key }));
                    }

                    if (key === 'significantDigits' && that.precisionDigits !== null) {
                        that.precisionDigits = null;
                    }
                    else if (key === 'precisionDigits' && that.significantDigits !== null) {
                        that.significantDigits = null;
                    }

                    if (that._regexSpecial.nonNumericValue.test(that.value) === false) {
                        const renderedValue = that._renderValue(that._number);

                        input.value = renderedValue;
                    }

                    break;
                }
                case 'decimalSeparator': {
                    that._numberRenderer.localizationObject.decimalseparator = that.decimalSeparator;

                    const numericValue = that._discardDecimalSeparator(input.value, oldValue),
                        valueWithNewSeparator = that._applyDecimalSeparator(numericValue),
                        editableValueWithNewSeparator = that._applyDecimalSeparator(that._discardDecimalSeparator(that._editableValue, oldValue));

                    input.value = valueWithNewSeparator;
                    that._editableValue = editableValueWithNewSeparator;
                    break;
                }
                case 'spinButtonsPosition':
                    if (value === 'left') {
                        that.$.container.insertBefore(that.$.spinButtonsContainer, that.$.label.nextElementSibling);
                    }
                    else {
                        that.$.container.insertBefore(that.$.spinButtonsContainer, that.$.dropDown);
                    }

                    that._refreshShape();
                    break;
                case 'wordLength':
                    that._wordLengthNumber = that._numericProcessor.getWordLength(value);

                    if (that.inputFormat === 'integer') {
                        that._numericProcessor.validateMinMax(true, true);

                        if (that._number !== null) {
                            let validValue = that._validateRange(new LW.Utilities.BigNumber(that._number));

                            that._updateValue(validValue);

                            if (that.leadingZeros) {
                                handleLeadingZeros();
                            }
                        }
                    }
                    break;
                case 'radixDisplay':
                    if (value) {
                        if (that.inputFormat !== 'integer') {
                            that.error(that.localize('integerOnly', { property: 'radixDisplay' }));
                        }

                        that.$radixDisplayButton.removeClass('lw-hidden');
                    }
                    else {
                        that.$radixDisplayButton.addClass('lw-hidden');
                    }
                    that._refreshShape();
                    break;
                case 'radixDisplayPosition':
                    if (value === 'left') {
                        that.$.container.insertBefore(that.$.radixDisplayButton, that.$.input);
                    }
                    else {
                        that.$.container.insertBefore(that.$.radixDisplayButton, that.$.unitDisplay.nextElementSibling);
                    }

                    that._refreshShape();
                    break;
                case 'inputFormat':
                    that._changeInputFormat(oldValue, value);
                    break;
                case 'showUnit':
                    if (value) {
                        that.$unitDisplay.removeClass('lw-hidden');
                    }
                    else {
                        that.$unitDisplay.addClass('lw-hidden');
                    }
                    that._refreshShape();
                    break;
                case 'unit':
                    that.$.unitDisplay.innerHTML = value;
                    break;
                case 'scientificNotation': {
                    if (that._regexSpecial.nonNumericValue.test(that.value) === false) {
                        const renderedValue = that._renderValue(that._number);
                        input.value = renderedValue;
                    }

                    break;
                }
                case 'locale':
                case 'messages':
                case 'showDropDownValues':
                    if (that.opened) {
                        that._setDropDownOptions();
                    }
                    else {
                        that._initialDropDownOptionsSet = false;
                    }

                    break;
                case 'nullable':
                    if (oldValue === true && that.value === null) {
                        that._validate(false, '0');
                    }

                    break;
                case 'validation':
                    if (value === 'strict') {
                        that._triggerChangeEvent = true;
                        that._validate(false, that.value);
                        that._triggerChangeEvent = false;
                    }

                    break;
            }
        }
        else if (typeof value !== 'string' && typeof oldValue === 'string') {
            that[key] = oldValue;
        }
        that._cachedInputValue = input.value;
    }

    /**
     * Changes the input format.
     */
    _changeInputFormat(oldFormat, newFormat) {
        const that = this;

        that._numericProcessor = new LW.Utilities.NumericProcessor(that, 'inputFormat');

        if (oldFormat === 'complex') {
            // 'complex' -> 'integer'/'floatingPoint'
            that._changeFromComplexInputFormat(newFormat);
            return;
        }

        if (newFormat === 'integer' && oldFormat === 'floatingPoint') {
            // 'floatingPoint' -> 'integer'
            that._changeFromFloatingPointToIntegerInputFormat();
        }

        if (newFormat === 'floatingPoint' && oldFormat === 'integer') {
            // 'integer' -> 'floatingPoint'
            that._changeFromIntegerToFloatingPointInputFormat();
        }

        if (newFormat === 'complex') {
            // 'integer'/'floatingPoint' -> 'complex'
            that._changeToComplexInputFormat(oldFormat);
        }

        that._updateSpinButtonsStepObject();

        if (that.value !== null) {
            that._inputFormatChangedFlag = true;
            that._validate(undefined, that._number.toString());
            that._inputFormatChangedFlag = false;
        }
    }

    /**
     * Changes the input format from 'complex' to 'integer' or 'floatingPoint'.
     */
    _changeFromComplexInputFormat(newFormat) {
        const that = this;
        that.spinButtonsStep = that._spinButtonsStepObject.realPart;
        that._updateSpinButtonsStepObject();

        if (newFormat === 'integer') {
            if (that.min === -Infinity) {
                that.min = null;
            }
            else {
                that.min = that._minObject.realPart;
            }
            if (that.max === Infinity) {
                that.max = null;
            }
            else {
                that.max = that._maxObject.realPart;
            }
        }
        else {
            if (that.min !== -Infinity) {
                that.min = that._minObject.realPart;
            }
            if (that.max !== Infinity) {
                that.max = that._maxObject.realPart;
            }
        }
        that._numericProcessor.validateMinMax(true, true);

        if (that.value !== null) {
            that._inputFormatChangedFlag = true;
            that._validate(undefined, that._number.realPart.toString());
            that._inputFormatChangedFlag = false;
        }
    }

    /**
     * Changes the input format from 'floatingPoint' to 'integer'.
     */
    _changeFromFloatingPointToIntegerInputFormat() {
        const that = this;
        if (that.min === -Infinity) {
            that.min = null;
        }
        if (that.max === Infinity) {
            that.max = null;
        }
        that._numericProcessor.validateMinMax(true, true);
    }

    /**
     * Changes the input format from 'integer' to 'floatingPoint'.
     */
    _changeFromIntegerToFloatingPointInputFormat() {
        const that = this;
        if (that.radixDisplay) {
            that.radixDisplay = false;
            that.$radixDisplayButton.addClass('lw-hidden');
        }

        if (that._radixNumber !== 10) {
            that.radix = 10;
            that._radixNumber = 10;
        }

        if (that._minIsNull) {
            that.min = -Infinity;
            that._minObject = -Infinity;
        }
        else {
            that._minObject = parseFloat(that._minObject.toString());
        }

        if (that._maxIsNull) {
            that.max = Infinity;
            that._maxObject = Infinity;
        }
        else {
            that._maxObject = parseFloat(that._maxObject.toString());
        }

        if (that.dropDownEnabled) {
            that.dropDownEnabled = false;
        }
    }

    /**
     * Changes the input format from 'integer' to 'floatingPoint'.
     */
    _changeToComplexInputFormat(oldFormat) {
        const that = this;
        if (oldFormat === 'integer') {
            if (that.radixDisplay) {
                that.radixDisplay = false;
                that.$radixDisplayButton.addClass('lw-hidden');
            }

            if (that._minIsNull) {
                that.min = null;
            }
            if (that._maxIsNull) {
                that.max = null;
            }

            if (that.dropDownEnabled) {
                that.dropDownEnabled = false;
            }
        }

        that._numericProcessor.validateMinMax(that.min !== -Infinity, that.max !== Infinity);
    }

    /**
     * Updates the value of the numeric text box input and the "value" property and triggers the respective events.
     */
    _updateValue(value) {
        const that = this,
            enteredValue = that.$.input.value,
            newValue = value.toString(that._radixNumber, that._wordLengthNumber, that.leadingZeros);

        if (enteredValue !== newValue || enteredValue !== that._cachedInputValue) {
            const renderedValue = that._renderValue(value),
                oldValue = that.value,
                newValueIsNotNumeric = that._regexSpecial.nonNumericValue.test(newValue);

            that.$.input.value = renderedValue;
            that._cachedInputValue = renderedValue;

            if (that._inputFormatChangedFlag || newValueIsNotNumeric && renderedValue !== oldValue ||
                newValueIsNotNumeric === false && that._numericProcessor.compare(value, that._number)) {
                that._number = that._numericProcessor.createDescriptor(value);

                const actualNewValue = that._number.toString();
                that.value = actualNewValue;

                that._setDropDownOptions(true);

                if (that._triggerChangeEvent) {
                    that.$.fireEvent('change', { 'value': actualNewValue, 'oldValue': oldValue, 'radix': that._radixNumber });
                }
            }
        }
        else {
            that.value = that._number.toString();
        }
    }

    /**
     * Sets a decimal numeric value to the numeric text box without any validation.
     */
    _setValue(value) {
        const that = this;

        that.value = value;
        that.$.input.value = value;

        that._number = that._numericProcessor.createDescriptor(value, true);

        that._setDropDownOptions(true);
    }

    /**
     * Changes the radix (numeral system).
     */
    _changeRadix(radix) {
        const that = this,
            newRadix = that._getRadix(radix),
            oldRadix = that.radix;

        if (newRadix === that._radixNumber) {
            return;
        }

        that.radix = radix;
        that._radixNumber = newRadix;

        const input = that.$.input,
            oldValue = input.value;
        let newValue, renderedValue;

        if (that.value !== null) {
            newValue = that._number.toString(newRadix, that._wordLengthNumber, that.leadingZeros);
            renderedValue = that._renderValue(newValue);
        }
        else {
            renderedValue = '';
        }

        input.value = renderedValue;
        that._cachedInputValue = renderedValue;

        that.$.radixDisplayButton.innerHTML = that._radixPrefixes[newRadix];

        that.$.fireEvent('radixChange', { 'radix': radix, 'oldRadix': oldRadix, 'displayedValue': renderedValue, 'oldDisplayedValue': oldValue });
    }

    /**
     * Opens the radix selection drop down.
     */
    _openRadix() {
        const that = this,
            openingEvent = that.$.fireEvent('opening');

        if (openingEvent.defaultPrevented) {
            that.opened = false;
            return;
        }

        if (that._initialDropDownOptionsSet === false) {
            that._setDropDownOptions();
            that._initialDropDownOptionsSet = true;
        }

        if (that._dropDownParent !== null) {
            that.$.dropDown.style.width = that.offsetWidth + 'px';
        }

        that.$radixDisplayButton.addClass('lw-numeric-text-box-pressed-component');
        that.$dropDown.removeClass('lw-visibility-hidden');
        that.$.dropDown.style.marginTop = null;

        that.opened = true;
        that._positionDetection.positionDropDown();

        const windowHeight = window.devicePixelRatio === 1 ? document.documentElement.clientHeight : window.innerHeight,
            dropDownBoundingRect = that.$.dropDown.getBoundingClientRect(),
            verticalCorrection = windowHeight - dropDownBoundingRect.top - that.$.dropDown.offsetHeight - parseFloat(getComputedStyle(that.$.dropDown).marginBottom);

        if (verticalCorrection < 0) {
            that.$.dropDown.style.marginTop = verticalCorrection + 'px';
        }

        that.$.fireEvent('open', { dropDown: that.$.dropDown });
        that.$.radixDisplayButton.setAttribute('aria-expanded', true);
    }

    /**
     * Closes the radix selection drop down.
     */
    _closeRadix(forceClose, closedProgrammatically) {
        const that = this;

        if (!that.opened && !closedProgrammatically) {
            return;
        }

        const closingEvent = that.$.fireEvent('closing');

        if (closingEvent.defaultPrevented && !forceClose) {
            that.opened = true;
            return;
        }

        that.$radixDisplayButton.removeClass('lw-numeric-text-box-pressed-component');
        that.$dropDown.addClass('lw-visibility-hidden');

        that.opened = false;
        that.$.fireEvent('close', { dropDown: that.$.dropDown });
        that.$.radixDisplayButton.setAttribute('aria-expanded', false);
    }

    /**
     * Checks if left button is pressed.
     */
    _isLeftButtonPressed(event) {
        const buttons = event.buttons === 0 || event.which === 1;

        return event.detail.buttons === 1 || buttons;
    }

    /**
     * Checks if incrementation and decrementation are allowed
     */
    _isIncrementOrDecrementAllowed() {
        const that = this;

        return !that.disabled && !that.readonly && that._regexSpecial.nonNumericValue.test(that.$.input.value) === false;
    }

    /**
     * Up button mousedown event handler.
     */
    _upButtonClickHandler(event) {
        const that = this,
            isLeftButton = that._isLeftButtonPressed(event);

        if (isLeftButton && that._isIncrementOrDecrementAllowed()) {
            if (!that._up) {
                that.$upButton.addClass('lw-numeric-text-box-pressed-component');
            }

            that._incrementOrDecrement('add');
        }
    }

    /**
     * Down button mousedown event handler.
     */
    _downButtonClickHandler(event) {
        const that = this,
            isLeftButton = that._isLeftButtonPressed(event);

        if (isLeftButton && that._isIncrementOrDecrementAllowed()) {
            if (!that._up) {
                that.$downButton.addClass('lw-numeric-text-box-pressed-component');
            }

            that._incrementOrDecrement('subtract');
        }
    }

    /**
     * Document mousedown event handler.
     */
    _documentMousedownHandler(event) {
        const that = this;

        that._up = false;

        if (!that.opened) {
            return;
        }

        let target = event.originalEvent.target;

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
        }

        if (!(that.shadowRoot || that).contains(target) && !that.$.dropDown.contains(target)) {
            that._closeRadix();
        }
    }

    /**
     * Document mouseup event handler.
     */
    _documentMouseupHandler() {
        const that = this;

        that._up = true;
        that.$upButton.removeClass('lw-numeric-text-box-pressed-component');
        that.$downButton.removeClass('lw-numeric-text-box-pressed-component');
    }

    /**
     * Radix display button click event handler.
     */
    _radixDisplayButtonClickHandler() {
        const that = this;
        if (that.dropDownEnabled && !that.disabled && that.value !== null) {
            if (that.opened) {
                that._closeRadix();
            }
            else {
                that._openRadix();
            }
        }
    }

    /**
     * Dropdown item click event handler.
     */
    _dropDownItemClickHandler(event) {
        if (event.target.$.hasClass('lw-list-item')) {
            const that = this;
            let radix = event.target.getAttribute('data-value');

            that._changeRadix(parseInt(radix, 10));
            that._closeRadix();
        }
    }

    /**
     * Spin button, radix display button and dropdown item mouseenter and mouseleave event handler.
     */
    _mouseenterMouseleaveHandler(event) {
        const that = this;

        if (event.target === that.$.dropDown || that.disabled || that.readonly) {
            return;
        }

        if (event.type === 'mouseenter') {
            event.target.setAttribute('hover', '');
        }
        else {
            event.target.removeAttribute('hover');
        }
    }

    /**
     * Input keydown event handler.
     */
    _inputKeydownHandler(event) {
        const that = this,
            keyCode = !event.charCode ? event.which : event.charCode;

        if (keyCode === 40 && that._isIncrementOrDecrementAllowed()) {
            // decrement when Down Arrow is pressed
            that._incrementOrDecrement('subtract');
        }
        else if (keyCode === 38 && that._isIncrementOrDecrementAllowed()) {
            // increment when Up Arrow is pressed
            that._incrementOrDecrement('add');
        }

        that._keydownInfo = { value: that.$.input.value, specialKey: event.altKey || event.ctrlKey || event.shiftKey };
    }

    /**
     * Input keyup event handler.
     */
    _inputKeyupHandler(event) {
        const that = this;

        if (event.keyCode === 13) {
            // when Enter is pressed, validation occurs
            that._suppressBlurEvent = true;

            if (that.$.input.value !== that._cachedInputValue) {
                that._triggerChangeEvent = true;
                that._validate();
                that._triggerChangeEvent = false;
                that.$.input.blur();
            }
        }
        else if (event.keyCode === 27) {
            // when Escape is pressed, changes are discarded
            that.$.input.value = that._editableValue;
        }
        else {
            const inputValue = that.$.input.value;

            if (inputValue !== '' && that._regex[that._radixNumber].test(inputValue)) {
                that.$.upButton.disabled = false;
                that.$.downButton.disabled = false;
            }
            else if (inputValue === '') {
                that.$.upButton.disabled = true;
                that.$.downButton.disabled = true;
            }

            if (that._keydownInfo &&
                that._keydownInfo.value !== inputValue &&
                !that._keydownInfo.specialKey &&
                !event.altKey && !event.ctrlKey && !event.shiftKey &&
                event.key !== 'Control') {
                that.$.fireEvent('changing', { 'currentValue': inputValue, 'validValue': that.value, 'radix': that._radixNumber });
            }
        }

        event.preventDefault();
    }

    /**
     * Input blur event handler.
     */
    _inputBlurHandler() {
        const that = this;

        if (that._suppressBlurEvent === true) {
            // suppresses validation because it was already handled in "_incrementOrDecrement" function
            that._suppressBlurEvent = false;

            if (that._formattedValue) {
                that._cachedInputValue = that._formattedValue;
                that.$.input.value = that._formattedValue;
                delete that._formattedValue;
            }
        }
        else if (that.$.input.value !== that._editableValue) {
            that._triggerChangeEvent = true;
            that._validate();
            that._triggerChangeEvent = false;
        }
        else {
            that.$.input.value = that._cachedInputValue;
        }

        if (that.radixDisplay) {
            that.$.radixDisplayButton.removeAttribute('focus');
        }

        if (that.opened) {
            that._closeRadix();
        }

        if (that.spinButtons) {
            that.$.spinButtonsContainer.removeAttribute('focus');
        }
        if (that.showUnit) {
            that.$.unitDisplay.removeAttribute('focus');
        }

        that.removeAttribute('focus');
        that.$.fireEvent('blur');
    }

    /**
     * Input focus event handler.
     */
    _inputFocusHandler() {
        const that = this;

        if (that.spinButtons) {
            that.$.spinButtonsContainer.setAttribute('focus', '');
        }
        if (that.radixDisplay) {
            that.$.radixDisplayButton.setAttribute('focus', '');
        }
        if (that.showUnit) {
            that.$.unitDisplay.setAttribute('focus', '');
        }

        if (that.opened) {
            that._closeRadix();
        }

        that.setAttribute('focus', '');

        if (that.outputFormatString) {
            that.$.input.value = that._editableValue;
        }

        that.$.fireEvent('focus');
    }

    /**
     * Input change event handler.
     */
    _inputChangeHandler(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Input paste event handler.
     */
    _inputPasteHandler() {
        const that = this;

        requestAnimationFrame(() => that.$.fireEvent('changing', { 'currentValue': that.$.input.value, 'validValue': that.value, 'radix': that._radixNumber }));
    }

    /**
     * Input wheel event handler.
     */
    _inputWheelHandler(event) {
        const that = this,
            activeElement = that.shadowRoot ? (that.shadowRoot.activeElement || document.activeElement) : document.activeElement;

        if (that.$.input === activeElement && that.enableMouseWheelAction && that._isIncrementOrDecrementAllowed()) {
            event.stopPropagation();
            event.preventDefault();
            if (event.wheelDelta > 0) {
                that._incrementOrDecrement('add');
            }
            else {
                that._incrementOrDecrement('subtract');
            }
        }
    }

    /**
     * Gets the internal numeric radix based on the "radix" property.
     */
    _getRadix(radix) {
        switch (radix.toString()) {
            case '10':
            case 'decimal':
                return 10;
            case '2':
            case 'binary':
                return 2;
            case '8':
            case 'octal':
                return 8;
            case '16':
            case 'hexadecimal':
                return 16;
        }
    }

    /**
     * Sets the dropdown list radix options.
     */
    _setDropDownOptions(updatedValues) {
        const that = this;

        if (that.dropDownEnabled === false || that._number === null) {
            return;
        }

        if (!that.showDropDownValues) {
            if (updatedValues) {
                return;
            }

            that.$.dropDownItem2.innerHTML = that.localize('binary');
            that.$.dropDownItem8.innerHTML = that.localize('octal');
            that.$.dropDownItem10.innerHTML = that.localize('decimal');
            that.$.dropDownItem16.innerHTML = that.localize('hexadecimal');
            return;
        }

        const wordLength = that._wordLengthNumber,
            leadingZeros = that.leadingZeros;

        that.$.dropDownItem2.innerHTML = `${that._number.toString(2, wordLength, leadingZeros)} (${that.localize('binary')})`;
        that.$.dropDownItem8.innerHTML = `${that._number.toString(8, wordLength)} (${that.localize('octal')})`;
        that.$.dropDownItem10.innerHTML = `${that._renderValue(that._number.toString(10, wordLength), true)} (${that.localize('decimal')})`;
        that.$.dropDownItem16.innerHTML = `${that._number.toString(16, wordLength, leadingZeros)} (${that.localize('hexadecimal')})`;
    }

    /**
     * Increments or decrements the number in the numeric text box input.
     */
    _incrementOrDecrement(func) {
        const that = this,
            activeElement = that.shadowRoot ? (that.shadowRoot.activeElement || document.activeElement) : document.activeElement;
        let cachedInputValue = that._cachedInputValue;

        if (that.$.input === activeElement) {
            cachedInputValue = that._editableValue;
            that._suppressBlurEvent = true;
        }

        if (that.$.input.value !== cachedInputValue || that._programmaticValueIsSet && that.validation === 'interaction') {
            // validates the value before incrementing or decrementing
            that._triggerChangeEvent = true;
            that._validate();
            that._triggerChangeEvent = false;
            if (that._isIncrementOrDecrementAllowed() === false) {
                return;
            }
        }

        const currentNumber = that._numericProcessor.incrementDecrement(that._number, func, that._spinButtonsStepObject),
            validNumber = that._validateRange(currentNumber);

        that._triggerChangeEvent = true;
        that._updateValue(validNumber);
        that._triggerChangeEvent = false;
    }

    /**
     * Returns a BigNumber object from a binary, octal, decimal or hexadecimal value.
     */
    _toBigNumberDecimal(number, radix) {
        const that = this;
        let result;

        if (radix === 10) {
            result = new LW.Utilities.BigNumber(number);
        }
        else {
            if (that._unsigned || that._isNegative(number, radix) === false) {
                if (that._wordLengthNumber < 64) {
                    result = parseInt(number, radix);
                    result = new LW.Utilities.BigNumber(result);
                }
                else {
                    result = that._getBigNumberFrom64BitBinOctHex(number, radix);
                }
            }
            else {
                result = that._getNegativeDecimal(number, radix);
                result = new LW.Utilities.BigNumber(result);
            }

        }
        return result;
    }

    /**
     * Checks if the passed binary, octal or hexadecimal value is negative based on the word length.
     */
    _isNegative(value, radix) {
        const that = this,
            valueLength = value.length,
            firstCharacter = value.charAt(0).toLowerCase();

        if (radix === 2) {
            return valueLength === that._wordLengthNumber && firstCharacter === '1';
        }
        else if (radix === 8) {
            switch (that._wordLengthNumber) {
                case 8:
                    return valueLength === 3 && (firstCharacter === '2' || firstCharacter === '3');
                case 16:
                    return valueLength === 5 && firstCharacter === '1';
                case 32:
                    return valueLength === 11 && (firstCharacter === '2' || firstCharacter === '3');
                case 64:
                    return valueLength === 22 && firstCharacter === '1';
            }
        }
        else {
            return valueLength === that._wordLengthNumber / 4 && ['8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].indexOf(firstCharacter) !== -1;
        }
    }

    /**
     * Returns a BigNumber object from a positive binary, octal or hexadecimal value.
     */
    _getBigNumberFrom64BitBinOctHex(number, radix) {
        let result = new LW.Utilities.BigNumber(0);
        for (let i = number.length - 1; i >= 0; i--) {
            let current = new LW.Utilities.BigNumber(parseInt(number.charAt(i), radix));
            result = result.add((current.multiply(new LW.Utilities.BigNumber(radix).pow(number.length - 1 - i))));
        }
        return result;
    }

    /**
     * Returns a BigNumber object from a negative binary, octal or hexadecimal value.
     */
    _getNegativeDecimal(value, radix) {
        const that = this;
        let negativeBinary = value;

        if (radix === 8) {
            let threeBits = [];
            for (let i = 0; i < value.length; i++) {
                let threeBit = parseInt(value.charAt(i), 8).toString(2);
                while (threeBit.length !== 3) {
                    threeBit = `0${threeBit}`;
                }
                threeBits.push(threeBit);
            }
            negativeBinary = threeBits.join('');
            while (negativeBinary.charAt(0) === '0') {
                negativeBinary = negativeBinary.slice(1);
            }
        }
        else if (radix === 16) {
            let bytes = [];
            for (let j = 0; j < value.length; j++) {
                let currentByte = parseInt(value.charAt(j), 16).toString(2);
                while (currentByte.length !== 4) {
                    currentByte = `0${currentByte}`;
                }
                bytes.push(currentByte);
            }
            negativeBinary = bytes.join('');
        }

        let negativeDecimal = negativeBinary.replace(/0/g, 'a');
        negativeDecimal = negativeDecimal.replace(/1/g, 'b');
        negativeDecimal = negativeDecimal.replace(/a/g, '1');
        negativeDecimal = negativeDecimal.replace(/b/g, '0');

        if (this._wordLengthNumber < 64) {
            negativeDecimal = (parseInt(negativeDecimal, 2) + 1) * -1;
        }
        else {
            negativeDecimal = that._getBigNumberFrom64BitBinOctHex(negativeDecimal, radix);
            negativeDecimal = negativeDecimal.add(1).negate();
        }

        return negativeDecimal;
    }

    /**
     * Replaces a custom decimal separator with the default one.
     */
    _discardDecimalSeparator(value, separator) {
        const that = this;

        if (separator === undefined) {
            separator = that.decimalSeparator;
        }

        if (separator !== '.' && value !== Infinity && value !== -Infinity) {
            let decimalSeparatorRegExp = new RegExp(separator, 'g');
            return value.replace(decimalSeparatorRegExp, '.');
        }
        else {
            return value;
        }
    }

    /**
     * Applies a custom decimal separator.
     */
    _applyDecimalSeparator(value) {
        const that = this;
        if (typeof value !== 'string') {
            value = value.toString();
        }

        if (that.decimalSeparator !== '.') {
            value = value.replace(/\./g, that.decimalSeparator);
        }

        return value;
    }

    /**
     * Applies the scientific notation, significant digits, precision digits and decimal separator settings.
     */
    _renderValue(renderedValue, valueInDropDown) {
        const that = this,
            value = renderedValue,
            ignoreRadixNumber = that._radixNumber === 10 || valueInDropDown === true;

        renderedValue = that._numericProcessor.render(renderedValue, ignoreRadixNumber);

        // decimal separator
        if (that.decimalSeparator !== '.' && ignoreRadixNumber) {
            renderedValue = that._applyDecimalSeparator(renderedValue);
        }

        if (valueInDropDown !== true) {
            that._editableValue = renderedValue;

            if (that.outputFormatString && that._radixNumber === 10) {
                const activeElement = (that.shadowRoot || that.getRootNode()).activeElement || document.activeElement,
                    formattedValue = that._numberRenderer.formatNumber(value, that.outputFormatString);

                if (activeElement !== that.$.input) {
                    return formattedValue;
                }

                that._formattedValue = formattedValue;
            }
        }

        return renderedValue;
    }

    /**
     * Sets whether the element can be focused.
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
     * Disables or enables components.
     */
    _disableComponents() {
        const that = this;

        if (that.disabled) {
            return;
        }

        const value = that.value;

        if (value === null || value.toString() === 'NaN' || Math.abs(value) === Infinity) {
            that.$.upButton.disabled = true;
            that.$.downButton.disabled = true;
        }
        else {
            that.$.upButton.disabled = false;
            that.$.downButton.disabled = false;
        }
    }

    /**
     * Resize handler.
     */
    _resizeHandler() {
        const that = this;

        if (that.opened) {
            that._closeRadix(true);
        }
    }
});
