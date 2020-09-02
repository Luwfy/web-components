
/*
 * Class validator
 * */
LW.Utilities.Assign('Validator', class Validator {

    constructor(rules, validationSummarySelector = '') {
        const that = this;

        that.errors = {};
        that.inputs = {};

        if (rules) {
            that.rules = rules;

            // Create validation summary holder
            that.validationSummarySelector = validationSummarySelector;
            if (that.validationSummarySelector) {
                for (let i = 0; i < that.rules.length; i++) {
                    const rule = that.rules[i];
                    const errorSummary = document.createElement('span');
                    errorSummary.setAttribute('input-selector', rule.input);
                    document.querySelector(that.validationSummarySelector).appendChild(errorSummary);
                }
            }

            that._configureInputs();
            that._addEventListeners();
        }
    }

    /**
     * Attach public method for adding event listeners
     * */
    attach() {
        const that = this;
        that._removeEventListeners();
        that._addEventListeners();
    }

    /**
     * Detach public method for removing event listeners
     * */
    detach() {
        const that = this;
        that.reset();
        that._removeEventListeners();
    }

    /**
     * Reset public method that clears the error messages
     * */
    reset() {
        const that = this;

        for (let i = 0; i < that.rules.length; i++) {
            let rule = that.rules[i],
                inputElements = document.querySelectorAll(rule.input);

            for (let i = 0; i < inputElements.length; i++) {
                that._resetAttributes(inputElements[i], rule);
            }

            rule.hint = '';
        }
    }

    /**
     * Remove success and error input attributes
     */
    _resetAttributes(inputElement, rule) {
        const that = this;

        if (inputElement.hasAttribute('lw-validation-success')) {
            that._removeErrorOrSuccessAttr(inputElement, 0);
        }

        if (inputElement.hasAttribute('lw-validation-error')) {
            that._removeErrorOrSuccessAttr(inputElement, 1);

            if (that.validationSummarySelector) {
                document.querySelector('span[input-selector=\'' + rule.input + '\']').innerHTML = '';
            }
        }
    }

    /**
     * Validate public method, that validates all the rules
     */
    validate(result, input) {
        const that = this;

        let valid = true,
            temp,
            tempElement,
            invalid = [],
            ruleFuncsCount = 0

        for (let i = 0; i < that.rules.length; i += 1) {
            const rule = that.rules[i];

            if (input) {
                if (rule.input !== input) {
                    continue;
                }
            }

            if (typeof that.rules[i].type === 'function') {
                ruleFuncsCount++;
            }
        }

        for (let i = 0; i < that.rules.length; i += 1) {
            const rule = that.rules[i];

            if (input) {
                if (rule.input !== input) {
                    continue;
                }
            }

            if (typeof that.rules[i].type === 'function') {
                const validate = function (isValid, rule) {
                    temp = isValid;
                    const tempElement = document.querySelector(rule.input);

                    if (false === temp) {
                        valid = false;
                        invalid.push(tempElement);
                    }
                    ruleFuncsCount--;
                    if (ruleFuncsCount === 0) {
                        if (typeof result === 'function') {
                            if (result) result(valid);
                        }
                    }

                    tempElement.errors = that.errors[rule.input];
                }
                that._validateRule(that.rules[i], validate);
            }
            else {
                temp = that._validateRule(that.rules[i]);
            }

            if (false === temp) {
                valid = false;
                invalid.push(tempElement);
            }

            tempElement = document.querySelector(that.rules[i].input);
            tempElement.errors = that.errors[rule.input];
        }

        for(let input in that.inputs) {
            const errors = that.errors['#' + input];
            let valid = true;

            for(let error in errors){
                valid = valid && (errors[error] === false);
            }

            const element = document.querySelector('#' + input);

            element.classList.remove('lw-valid');
            element.classList.remove('lw-invalid');

            valid ? element.classList.add('lw-valid') : element.classList.add('lw-invalid');
        }

        if (ruleFuncsCount === 0) {
            return valid;
        }
        else {
            return undefined;
        }
    }

    /**
     * Method that calculates the position of input errors
     */
    _calculateErrorMsgTooltipPosition(inputElement, errorMsgHolder) {
        const bodyRect = document.body.getBoundingClientRect(),
            elemRect = inputElement.getBoundingClientRect(),
            offsetTop = elemRect.top - bodyRect.top;

        errorMsgHolder.style.top = offsetTop + elemRect.height + 'px';
        errorMsgHolder.style.left = elemRect.left + 'px';
    }

    /**
     * Add error attribute on the selected input
     */
    _addErrorAttr(inputElement, errorMsg) {
        const that = this;

        /**
        * Adding custom event listeners
        * */
        function _addCustomListenerTo(errorSelector, eventName, showErrorSelector) {
            let inputElem = inputElement;
            const lwInput = inputElement.querySelector('.lw-validation-error input.lw-input') || inputElement.querySelector('.lw-validation-error textarea.lw-input');
            if (lwInput) {
                inputElem = lwInput;
            }

            let showSelectorFunction;

            if (showErrorSelector) {
                showSelectorFunction = () => errorSelector.classList.remove('lw-hidden');
            }
            else {
                showSelectorFunction = () => errorSelector.classList.add('lw-hidden');
            }

            inputElem.addEventListener(eventName, showSelectorFunction);
            inputElem[eventName + inputElem.id] = showSelectorFunction;
        }

        inputElement.setAttribute('lw-validation-error', errorMsg);
        inputElement.classList.add('lw-validation-error');

        //Check if input is html input element and dont have label already - add the label [Because: After is not allowed on input]
        if ((inputElement.tagName.toLowerCase() === 'input' || inputElement.tagName.toLowerCase() === 'textarea') && (inputElement.type !== 'button') && (inputElement.type !== 'radio')) {
            const inputNextSibling = inputElement.nextSibling;

            //Add error label
            if (inputNextSibling &&
                ((typeof inputNextSibling.tagName === 'undefined') ||
                    (inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() !== 'label') && (inputNextSibling.className !== 'lw-error-label-like-after-element')))) {
                let inputErrMsgLabel = document.createElement('label');
                inputErrMsgLabel.setAttribute('class', 'lw-error-label-like-after-element');
                inputElement.parentNode.insertBefore(inputErrMsgLabel, inputNextSibling);
            }
        }

        // Add hidden error msg
        const errorMsgHolder = document.createElement('span');
        errorMsgHolder.classList.add('lw-error-holder');
        errorMsgHolder.classList.add('lw-hidden');
        errorMsgHolder.classList.add(inputElement.id);
        errorMsgHolder.innerHTML = errorMsg;
        const bodySelector = document.body;
        bodySelector.appendChild(errorMsgHolder);

        // Calculate position of errorMsg
        that._calculateErrorMsgTooltipPosition(inputElement, errorMsgHolder);

        // Add listener for errorMsgs position recalculation on orientation change
        window.addEventListener('orientationchange', function () {
            setTimeout(function () {
                that._calculateErrorMsgTooltipPosition(inputElement, errorMsgHolder)
            }, 300);
        });

        // Add listener for errorMsgs position recalculation on resize event
        window.addEventListener('resize', function () {
            that._calculateErrorMsgTooltipPosition(inputElement, errorMsgHolder)
        });

        inputElement.addEventListener('focus', () => {
            that._calculateErrorMsgTooltipPosition(inputElement, errorMsgHolder)
        });

        // Add listener to input to show the hidden error msg
        const lwInput = inputElement.querySelector('.lw-validation-error input.lw-input');
        if (lwInput) {
            // Add event listener for the error msg holder
            _addCustomListenerTo(errorMsgHolder, 'click', 1);
            if ((lwInput.type !== 'radio') && (lwInput.type !== 'checkbox')) {
                _addCustomListenerTo(errorMsgHolder, 'focusin', 1);
            }
            _addCustomListenerTo(errorMsgHolder, 'focusout', 0);
        }
        else {
            _addCustomListenerTo(errorMsgHolder, 'click', 1);
            if ((inputElement.type !== 'radio') && (inputElement.type !== 'checkbox')) {
                _addCustomListenerTo(errorMsgHolder, 'focusin', 1);
            }
            _addCustomListenerTo(errorMsgHolder, 'focusout', 0);
        }
    }

    /**
     * Add Success attribute on selected input
     */
    _addSuccessAttr(inputElement) {
        inputElement.setAttribute('lw-validation-success', '');
        inputElement.classList.add('lw-validation-success');
        const inputNextSibling = inputElement.nextSibling;

        if (!inputNextSibling) {
            return;
        }

        if (inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() === 'label') && (inputNextSibling.className === 'lw-error-label-like-after-element')) {
            const inputErrMsgLabel = document.createElement('label');
            inputErrMsgLabel.setAttribute('class', 'lw-success-label-like-after-element');
            inputElement.parentNode.insertBefore(inputErrMsgLabel, inputNextSibling);
        }

        if (inputElement.tagName.toLowerCase() === 'input') {

            // Remove error label
            if (inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() === 'label') && (inputNextSibling.className === 'lw-error-label-like-after-element')) {
                inputNextSibling.remove();
            }

            // Add success label
            if ((typeof inputNextSibling.tagName === 'undefined') || (inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() !== 'label') && (inputNextSibling.className !== 'lw-success-label-like-after-element'))) {
                const inputErrMsgLabel = document.createElement('label');
                inputErrMsgLabel.setAttribute('class', 'lw-success-label-like-after-element');
                inputElement.parentNode.insertBefore(inputErrMsgLabel, inputNextSibling);
            }
        }
    }

    /**
    * Remove Success Or Error attribute from the selected input
    */
    _removeErrorOrSuccessAttr(inputElement, isErrorAttr) {
        const inputNextSibling = inputElement.nextSibling;

        //_removeErrorAttr
        if (isErrorAttr === 1) {
            inputElement.removeAttribute('lw-validation-error');
            inputElement.classList.remove('lw-validation-error');

            //Remove error msg
            const spanErrorMsg = document.querySelector('span.lw-error-holder.' + inputElement.id);
            if (spanErrorMsg) {
                spanErrorMsg.remove();
            }

            //Remove error label
            if (inputNextSibling && inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() === 'label') && (inputNextSibling.className === 'lw-error-label-like-after-element')) {
                inputNextSibling.remove();
            }
        }

        //_removeSuccessAttr
        if (isErrorAttr === 0) {
            inputElement.removeAttribute('lw-validation-success');
            inputElement.classList.remove('lw-validation-success');

            //Remove success label
            if (inputNextSibling && inputNextSibling.tagName && (inputNextSibling.tagName.toLowerCase() === 'label') && (inputNextSibling.className === 'lw-success-label-like-after-element')) {
                inputNextSibling.remove();
            }
        }
    }

    /**
     * Validate rule method that validates each rule one by one
     */
    _validateRule(rule, validate) {
        const that = this,
            inputElements = document.querySelectorAll(rule.input + ':not(.lw-error-holder)');

        let hint,
            valid = true;

        if ((!inputElements) || (inputElements[0] === null)) {
            return;
        }

        let ruleResult = false;
        if (typeof rule.type === 'function') {
            ruleResult = rule.type.call(that, inputElements[0], rule);

            if (ruleResult === true && validate) {
                validate(true, rule);
            }
        }

        if (typeof rule.type === 'function' && ruleResult === false) {
            if (typeof rule.hintRender === 'function' && !rule.hint && !that._higherPriorityActive(rule)) {
                hint = rule.hintRender.apply(this, [rule.message, inputElements[0]]);
                that._removeLowPriorityHints(rule);
                rule.hint = hint;

                for (let i = 0; i < inputElements.length; i++) {
                    that._removeErrorOrSuccessAttr(inputElements[i], 0)
                    that._addErrorAttr(inputElements[i], rule.message)
                }

                if (that.validationSummarySelector) {
                    document.querySelector('span[input-selector=\'' + rule.input + '\']').innerHTML = rule.message;
                }
            }
            valid = false;
            if (validate) {
                validate(false, rule);
            }
        }
        else {
            that._hideHintByRule(rule);
        }

        if ((inputElements[0]) && (!inputElements[0].hasAttribute('lw-validation-error'))) {
            if (inputElements.length > 1) {
                for (let i = 0; i < inputElements.length; i++) {
                    that._removeErrorOrSuccessAttr(inputElements[i], 1)
                }
            }
            else {
                that._addSuccessAttr(inputElements[0])
            }
        }

        if (!that.errors[rule.input]) {
            that.errors[rule.input] = {};
        }


        that.errors[rule.input][rule._type] = !valid;
        return valid;
    }

    /**
     * Function that hides hint depending of the rule
     */
    _hideHintByRule(rule) {
        const that = this,
            inputElements = document.querySelectorAll(rule.input);

        let hint;

        if (rule) {
            hint = rule.hint;
            if (hint) {

                for (let i = 0; i < inputElements.length; i++) {
                    if (inputElements.length > 1) {
                        that._removeErrorOrSuccessAttr(inputElements[i], 1)
                    }
                    else {
                        that._removeErrorOrSuccessAttr(inputElements[i], 1);
                        that._addSuccessAttr(inputElements[i]);
                    }
                }

                if (that.validationSummarySelector) {
                    document.querySelector('span[input-selector=\'' + rule.input + '\']').innerHTML = '';
                }

                hint.remove();
            }

            rule.hint = null;
        }
    }

    /**
     * Remove current editing hint
     */
    _removeLowPriorityHints(rule) {
        const that = this;
        let reach = false,
            current;

        for (let i = 0; i < that.rules.length; i += 1) {
            current = that.rules[i];
            if (reach && current.input === rule.input) {
                that._hideHintByRule(current);
            }
            if (current === rule) {
                reach = true;
            }
        }
    }

    /**
     * Remove event listeners
     * */
    _removeEventListeners() {
        const that = this;

        let rule,
            inputElements,
            listeners;

        for (let i = 0; i < that.rules.length; i += 1) {
            rule = that.rules[i];
            listeners = rule.action.split(',');
            inputElements = document.querySelectorAll(rule.input);

            for (let j = 0; j < listeners.length; j += 1) {

                for (let k = 0; k < inputElements.length; k++) {
                    let _eachInputElement = inputElements[k];
                    if (inputElements.length === 1) {
                        k = '';
                    }

                    // blur,focus bugfix
                    let isJQWidget = false;
                    if (that._isjQWidget(_eachInputElement)) {
                        isJQWidget = true;
                    }
                    if (isJQWidget && (listeners[j].trim() === 'blur' || listeners[j].trim() === 'focus')) {
                        if (_eachInputElement && _eachInputElement.nodeName.toLowerCase() !== 'input') {
                            _eachInputElement = _eachInputElement.querySelector('input');
                        }
                    }

                    _eachInputElement.removeEventListener(listeners[j].trim(), _eachInputElement[listeners[j].trim() + rule.input + rule.message.split(' ').join('_') + i + '' + k]);
                    delete _eachInputElement[listeners[j].trim() + rule.input + rule.message.split(' ').join('_') + i + '' + k];
                }
            }
        }
    }

    /**
     * Adding event listeners
     * */
    _addEventListeners() {
        const that = this;

        let inputElements;
        for (let ruleNum = 0; ruleNum < that.rules.length; ruleNum += 1) {
            let rule = that.rules[ruleNum];
            inputElements = document.querySelectorAll(rule.input);

            for (let radioCounter = 0; radioCounter < inputElements.length; radioCounter++) {
                let _eachInputElement = inputElements[radioCounter];
                if (inputElements.length === 1) {
                    radioCounter = '';
                }

                const listeners = rule.action.split(',');
                let isJQWidget = false;
                if (that._isjQWidget(_eachInputElement)) {
                    isJQWidget = true;
                }

                for (let m = 0; m < listeners.length; m += 1) {
                    const eventName = listeners[m].trim();

                    // blur,focus bugfix
                    if (isJQWidget && (eventName === 'blur' || eventName === 'focus')) {
                        if (_eachInputElement && _eachInputElement.nodeName.toLowerCase() !== 'input') {
                            _eachInputElement = _eachInputElement.querySelector('input');
                        }
                    }

                    const validationFunction = () => that._validateRule(rule);
                    if (_eachInputElement !== null) {
                        _eachInputElement.addEventListener(eventName, validationFunction);
                        _eachInputElement[eventName + rule.input + rule.message.split(' ').join('_') + ruleNum + '' + radioCounter] = validationFunction;
                    }
                }

            }
        }

        const handlers = {};

        for (let ruleNum = 0; ruleNum < that.rules.length; ruleNum += 1) {
            let rule = that.rules[ruleNum];
            let inputElement = document.querySelector(rule.input);
            let $input = LW.Utilities.Extend(inputElement);

            if (!that.inputs[inputElement.id]) {
                that.inputs[inputElement.id] = [];
            }

            that.inputs[inputElement.id].push(rule);

            if (!inputElement || handlers[rule.input]) {
                continue;
            }

            handlers[rule.input] = true;

            inputElement.checkValidity = () => {
                return that.validate(null, '#' + inputElement.id);
            }

            const validate = (input) => {
                if (that.errors[input]) {
                    const validityState = {};
                    let isValid = true;
                    for(let error in that.errors[input]) {
                        const valid = that.errors[input][error] === false;

                        isValid = isValid && valid;

                        if (!valid && error === 'required') {
                            validityState.valueMissing = true;
                        }
                        else if (!valid && error === 'minLength') {
                            validityState.tooShort = true;
                        }
                        else if (!valid && error === 'maxLength') {
                            validityState.tooLong = true;
                        }
                        else if (!valid && error === 'min') {
                            validityState.rangeUnderflow = true;
                        }
                        else if (!valid && error === 'max') {
                            validityState.rangeOverflow = true;
                        }
                        else if (!valid && error === 'pattern') {
                            validityState.patternMismatch = true;
                        }
                        else if (!valid) {
                            validityState[error] = false;
                        }
                    }

                    validityState.valid = isValid;

                    inputElement.errors = that.errors[input];
                    inputElement.classList.remove('lw-valid');
                    inputElement.classList.remove('lw-invalid');

                    inputElement.setAttribute('aria-invalid', !isValid);


                    if (!isValid) {
                        inputElement.classList.add('lw-invalid');

                        $input.fireEvent('invalid', {
                            errors: that.errors[input],
                            validityState: validityState
                        });
                    }
                    else {
                        inputElement.classList.add('lw-valid');
                        $input.fireEvent('valid');
                    }

                }
            }

            inputElement.addEventListener('change', () => {
                validate(rule.input);
            });

            inputElement.addEventListener('blur', () => {
                validate(rule.input);
            });

            inputElement.addEventListener('keyup', () => {
                validate(rule.input);
            });
        }
    }

    /**
     * Initialization input method
     * */
    _configureInputs() {
        const that = this;

        that.rules = that.rules || [];
        for (let i = 0; i < that.rules.length; i += 1) {
            that._handleInput(i);
        }
    }

    /**
     * handle each input method used in _configureInputs
     */
    _handleInput(ruleId) {
        const that = this;

        const rule = that.rules[ruleId];
        if (!rule['message']) {
            rule['message'] = 'Validation Failed!';
        }
        if (!rule['action']) {
            rule['action'] = 'blur';
        }
        if (!rule['hintRender']) {
            rule['hintRender'] = (() => document.createElement('div'));
        }

        if (rule.type) {
            rule._type = rule.type;
        }

        if (!rule['type']) {
            rule['type'] = null;
        }
        else {
            that._handleRule(rule);
        }
    }


    _handleRule(rule) {
        const that = this;
        const validation = rule.type;

        let func,
            wrongParameter = false;

        func = that['_' + validation];

        if (func) {
            rule.type = function (inputElement) {
                return func.apply(that, [inputElement].concat(rule));
            };
        }
        else {
            wrongParameter = true;
        }

        if (wrongParameter) {
            throw new Error('Wrong parameter: ' + rule.type);
        }
    }

    /**
     * required rule
     */
    _required(inputElement, rule) {
        const that = this;

        if (inputElement instanceof HTMLDivElement) {
            let validMultipleRadio = false;

            const inputs = inputElement.querySelectorAll('input');
            const radioButtons = inputElement.querySelectorAll('lw-radio-button');
            const checkBoxes = inputElement.querySelectorAll('lw-check-box');

            const getValues = (inputs) => {
                let values = [];

                for(let i = 0; i < inputs.length; i++) {
                    const input = inputs[i];

                    if (input.value === '' && input.checked) {
                        values.push(true);
                    }
                    else if (input.value === '' && input.checked === false) {
                        values.push(false);
                    }
                    else if (input.checked) {
                        values.push(input.value);
                    }
                }

                if (values.length === 1) {
                    return values[0];
                }

                if (values.length === 0) {
                    return '';
                }

                return values;
            }

            const value = getValues( radioButtons.length > 0 ? radioButtons : (checkBoxes.length > 0 ? checkBoxes : inputs));

            if (value === false) {
                validMultipleRadio = false;
            }
            else if (value === true) {
                validMultipleRadio = true;
            }
            else if (value !== '') {
                validMultipleRadio = true;
            }

            return validMultipleRadio;
        }

        switch (that._getType(inputElement)) {
            case 'lw-input-inner': {
                let inputInsideInputElement = inputElement.querySelector('input').value;
                if (inputInsideInputElement.length > 0) {
                    return (inputInsideInputElement.trim()) !== '';
                }
                break;
            }
            case 'lw-combo-box':
            case 'lw-drop-down-list': {
                if (inputElement.querySelector('input[lw-id="hiddenInput"]')) {
                    let dropdownInputValue = inputElement.querySelector('input[lw-id="hiddenInput"]').value;
                    return dropdownInputValue ? dropdownInputValue.trim() !== '' : false;
                }

                if (inputElement.value) {
                    return true;
                }

                return false;
            }
            case 'lw-masked-text-box':
                return inputElement.maskFull;
            case 'textarea':
            case 'password':
            case 'lw-input':
            case 'lw-multi-input':
            case 'lw-check-input':
            case 'lw-numeric-text-box':
            case 'lw-date-time-picker':
            case 'lw-date-range-input':
            case 'lw-multi-combo-input':
            case 'lw-text-box-element':
            case 'text':
            case 'number':
                return inputElement.value ? (inputElement.value.trim && inputElement.value.trim() !== '') : false;
            case 'radio':
            case 'lw-radio-button': {
                const inputElementsRadios = document.querySelectorAll(rule.input);
                let validMultipleRadio = false;

                if ((inputElementsRadios === null) || (inputElementsRadios.length <= 0)) {
                    return;
                }

                for (let i = 0; i < inputElementsRadios.length; i++) {
                    if (inputElementsRadios[i].checked) {
                        validMultipleRadio = true;
                    }
                }
                return validMultipleRadio;
            }
            case 'lw-check-box':
            case 'checkbox':
                return inputElement.checked;
        }
        return false;
    }

    /**
     * Additional rule - notNumber
     */
    _notNumber(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const re = /\d/;
            return !re.test(text);
        });
    }

    /**
     * Additional rule - startWithLetter
     */
    _startWithLetter(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const re = /\d/;
            return !re.test(text.substring(0, 1));
        });
    }

    /**
     * numeric rule
     */
    _numeric(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const inputElementValue = new Number(text);

            return !isNaN(inputElementValue) && isFinite(inputElementValue);
        });
    }

    /**
     * Additional rule - phone
     */
    _phone(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const phone = /^\(\d{3}\)(\d){3}-(\d){4}$/;
            return phone.test(text);
        });
    }

    /**
     * stringLength rule
     */
    _stringLength(inputElement, rule) {
        const that = this;
        let checkMin = true,
            checkMax = true;

        if (rule.min) {
            checkMin = that._minLength(inputElement, rule.min);
        }

        if (rule.max) {
            checkMax = that._maxLength(inputElement, rule.max)
        }

        return checkMin && checkMax;
    }

    /**
     * used in _stringLength rule
     */
    _maxLength(inputElement, len) {
        const that = this;

        len = parseInt(len, 10);
        return that._validateText(inputElement, function (text) {
            return text.length <= len;
        });
    }

    /**
     * used in _stringLength rule
     */
    _minLength(inputElement, len) {
        const that = this;

        len = parseInt(len, 10);
        return that._validateText(inputElement, function (text) {
            if (text !== undefined) {
                return text.length >= len;
            }
        });
    }

    /**
     * pattern rule
     */
    _pattern(inputElement, rule) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            return rule.pattern.test(text);
        });
    }

    /**
     * compare rule
     */
    _compare(inputElement, rule) {
        const that = this;
        return that._validateText(inputElement, function (text) {

            switch (rule.comparisonType) {
                case '!=':
                    // eslint-disable-next-line
                    return text != rule.comparisonTarget(inputElement, rule);
                case '!==':
                    return text !== rule.comparisonTarget(inputElement, rule);
                case '<':
                    return text < rule.comparisonTarget(inputElement, rule);
                case '<=':
                    return text <= rule.comparisonTarget(inputElement, rule);
                case '==':
                    // eslint-disable-next-line
                    return text == rule.comparisonTarget(inputElement, rule);
                case '===':
                    return text === rule.comparisonTarget(inputElement, rule);
                case '>':
                    return text > rule.comparisonTarget(inputElement, rule);
                case '>=':
                    return text >= rule.comparisonTarget(inputElement, rule);
                default:
                    // eslint-disable-next-line
                    return text == rule.comparisonTarget(inputElement, rule);
            }

        });
    }

    /**
     * custom rule
     */
    _custom(inputElement, rule) {
        return rule.validationCallback(inputElement, rule);
    }

    /**
     * range rule
     */
    _range(inputElement, rule) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            let checkMin = true,
                checkMax = true;

            //Compare dates
            if (typeof rule.max.getMonth === 'function') {
                text = new Date(text);
            }

            if (rule.min) {
                checkMin = text >= rule.min;
            }

            if (rule.max) {
                checkMax = text <= rule.max;
            }

            return checkMin && checkMax;

        });
    }

    /**
     * email rule
     */
    _email(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return false;

            const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return email.test(text);
        });
    }

    /**
     * Additional rule - zipCode
     */
    _zipCode(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const zip = /^(^\d{5}$)|(^\d{5}-\d{4}$)|(\d{3}-\d{2}-\d{4})$/;
            return zip.test(text);
        });
    }

    /**
     * Additional rule - ssn
     */
    _ssn(inputElement) {
        const that = this;

        return that._validateText(inputElement, function (text) {
            if (text === '')
                return true;

            const ssn = /\d{3}-\d{2}-\d{4}/;
            return ssn.test(text);
        });
    }

    /**
     * help function for the other rules
     */
    _validateText(inputElement, condition) {
        const that = this;
        let value;

        if (that._isTextInput(inputElement)) {
            if (that._isjQWidget(inputElement)) {
                let inputInsideInputElement = inputElement.querySelector('input');
                if (inputInsideInputElement) {
                    inputInsideInputElement = inputInsideInputElement.value;
                    if (inputInsideInputElement.length > 0) {
                        value = inputInsideInputElement;
                    }
                    else {
                        value = inputElement.value;
                    }
                }
            }
            else {
                value = inputElement.value;
            }
            return condition(value);
        }
        return false;
    }

    /*
     * Method that checkes the tagname of passed as argument element and returns true if it is lw element
     * */
    _isjQWidget(inputElement) {

        if (inputElement.tagName.toLowerCase().indexOf('lw') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-input') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-password-text-box') >= 0) { //old: lw-password-input
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-complex-input') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-formatted-input') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-masked-text-box') >= 0) { //old: lw-masked-input
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-date-time-picker') >= 0) { //old: lw-date-time-input
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-numeric-text-box') >= 0) { //old: lw-number-input
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-check-box') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lw-radio-button') >= 0) {
            return true;
        }
        if (inputElement.tagName.toLowerCase().indexOf('lwcheckbox') >= 0) {
            return true;
        }

        if (inputElement.tagName.toLowerCase().indexOf('angular') >= 0) {
            return true;
        }
        return false;
    }

    /**
     * Checkes if element is text input
     */
    _isTextInput(inputElement) {
        const that = this;

        if (!inputElement) {
            return;
        }

        const type = that._getType(inputElement);
        return type === 'text' || type === 'textarea' || type === 'password' || type === 'lw-input-inner' || type === 'lw-numeric-text-box'
            || inputElement.classList.contains('lw-input') || inputElement.classList.contains('lw-date-time-range-input') || inputElement.classList.contains('lw-multi-combo-input') || inputElement.classList.contains('lw-multi-input') || inputElement.classList.contains('lw-check-input') || inputElement.classList.contains('lw-masked-text-box') || inputElement.classList.contains('lw-text-box') || inputElement.classList.contains('lw-date-time-picker');
    }

    /**
     * Get the types of the input element
     */
    _getType(inputElement) {

        if (!inputElement)
            return;

        const tag = inputElement.tagName.toLowerCase();

        let tagChild = tag,
            inputChild = inputElement;

        const inputElementChildInput = inputElement.querySelector('.lw-input'),
            inputChildWithInputChild = inputChild.querySelector('.lw-input'),
            inputElementTextbox = inputElement.querySelector('.lw-text-box-element'),
            inputChildTextbox = inputChild.querySelector('.lw-text-box-element');

        if ((tag) && (tag !== 'input')) {
            inputChild = inputElement.querySelector('input');
            if (inputChild) {
                tagChild = inputChild.tagName.toLowerCase();
            }
        }

        if ((tag === 'lw-password-text-box') || (tagChild === 'lw-password-text-box')) {
            return 'password';
        }

        if ((tag === 'lw-masked-text-box') || (tagChild === 'lw-masked-text-box')) {
            return 'lw-masked-text-box';
        }

        if ((tag === 'lw-check-box') || (tagChild === 'lw-check-box')) {
            return 'lw-check-box';
        }

        if ((tag === 'lw-radio-button') || (tagChild === 'lw-radio-button')) {
            return 'lw-radio-button';
        }

        if ((tag === 'lw-drop-down-list') || (tagChild === 'lw-drop-down-list')) {
            return 'lw-drop-down-list';
        }

        if ((tag === 'lw-numeric-text-box') || (tagChild === 'lw-numeric-text-box')) {
            return 'lw-numeric-text-box';
        }

        if ((tag === 'textarea') || (tagChild === 'textarea')) {
            return 'textarea';
        }
        else if ((inputElementChildInput) || (inputChildWithInputChild)) {
            return 'lw-input';
        }
        else if (inputElementTextbox || inputChildTextbox) {
            return 'lw-text-box-element';
        }
        else if ((inputElementChildInput && (inputElementChildInput.value) && ((inputElementChildInput.value.length) > 0))
            || (inputChildWithInputChild && (inputChildWithInputChild.value) && ((inputChildWithInputChild.value.length) > 0))
        ) {
            return 'lw-input-inner';
        }
        else if ((tag === 'input') || (tagChild === 'input')) {

            const inputChildType = inputChild.type ? inputChild.type.toLowerCase() : undefined;
            if (inputChildType) {
                return inputChildType;
            }

            const inputType = inputElement.type ? inputElement.type.toLowerCase() : undefined;
            if (inputType) {
                return inputType;
            }

            return 'text';
        }

        return tag;
    }

    /**
     * Manage hint for current editing rule
     */
    _higherPriorityActive(rule) {
        const that = this;
        let reach = false,
            current;

        for (let i = that.rules.length - 1; i >= 0; i -= 1) {
            current = that.rules[i];
            if (reach && current.input === rule.input && current.hint) {
                return true;
            }
            if (current === rule) {
                reach = true;
            }
        }
        return false;
    }

});
