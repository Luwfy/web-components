
/**
* PasswordTextBox custom element.
*/
LW('lw-password-text-box', class PasswordTextBox extends LW.BaseElement {
    /**
    * PasswordTextBox's properties
    */
    static get properties() {
        return {
            'autoFocus': {
                value: false,
                type: 'boolean'
            },
            'hint': {
                value: '',
                reflectToAttribute: true,
                type: 'string'
            },
            'label': {
                value: '',
                reflectToAttribute: true,
                type: 'string'
            },
            'maxLength': {
                value: null,
                type: 'number?'
            },
            'minLength': {
                value: 2,
                type: 'number'
            },
            'messages': {
                value: {
                    'en': {
                        'passwordStrength': 'Password strength',
                        'short': 'Short',
                        'weak': 'Weak',
                        'far': 'Far',
                        'good': 'Good',
                        'strong': 'Strong',
                        'showPassword': 'Show password'
                    }
                },
                type: 'object',
                extend: true
            },
            'name': {
                value: '',
                type: 'string'
            },
            'passwordStrength': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'selectAllOnFocus': {
                value: false,
                type: 'boolean'
            },
            'showPasswordIcon': {
                value: false,
                type: 'boolean'
            },
            'showPasswordStrength': {
                value: false,
                type: 'boolean'
            },
            'tooltipArrow': {
                value: false,
                type: 'boolean'
            },
            'tooltipDelay': {
                value: 0,
                type: 'number'
            },
            'tooltipPosition': {
                allowedValues: ['bottom', 'top', 'left', 'right', 'absolute'],
                value: 'top',
                type: 'string'
            },
            'tooltipTemplate': {
                value: null,
                type: 'string?'
            },
            'type': {
                value: 'password',
                type: 'string',
                defaultReflectToAttribute: true,
                readonly: true
            },
            'value': {
                value: '',
                reflectToAttribute: false,
                type: 'string'
            }
        }
    }

    /**
    * PasswordTextBox's event listeners.
    */
    static get listeners() {
        return {
            'document.up': '_documentUpHandler',
            'mouseenter': '_mouseEventsHandler',
            'mouseleave': '_mouseEventsHandler',
            'passwordIcon.down': '_showPassword',
            'input.change': '_textBoxChangeHandler',
            'input.paste': '_textBoxChangeHandler',
            'input.keyup': '_textBoxChangeHandler',
            'input.blur': '_blurHandler',
            'input.focus': '_focusHandler'
        }
    }

    static get requires() {
        return {
            'LW.Tooltip': 'lw.tooltip.js'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.textbox.css',
            'lw.passwordtextbox.css'
        ]
    }

    /**
    * PasswordTextBox's HTML template.
    */
    template() {
        return '<div id="container" role="presentation">' +
            '<span id="label" inner-h-t-m-l="[[label]]" class="lw-hidden lw-label"></span>' +
            '<div id="innerContainer" class="lw-content" role="presentation">' +
            `<input class="lw-input" type="password" id="input"
                    disabled="[[disabled]]"
                    maxlength="[[maxLength]]"
                    minlength="[[minLength]]"
                    name="[[name]]"
                    placeholder="[[placeholder]]"
                    readonly="[[readonly]]"
                    value="[[value]]">` +
            '<span id="passwordIcon" title="Show Password" class="lw-password-icon lw-hidden" role="button" aria-label="Show Password"></span>' +
            '</div>' +
            '<span id="hint" inner-h-t-m-l="[[hint]]" class="lw-hint lw-hidden"></span>' +
            `<lw-tooltip id="tooltip"
                    open-mode="manual"
                    arrow="[[tooltipArrow]]"
                    right-to-left="[[rightToLeft]]"
                    tooltip-template="[[tooltipTemplate]]"
                    position="[[tooltipPosition]]"
                    delay="[[tooltipDelay]]">` +
            '</lw-tooltip>' +
            '</div>';
    }

    /**
    * Updates the PasswordTextBox when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;
        let strength;

        switch (propertyName) {
            case 'locale':
            case 'messages':
            case 'passwordStrength':
                strength = that._evaluatePasswordStrength();

                that._updateTooltipString(strength);
                that.$.passwordIcon.setAttribute('title', that.localize('showPassword'));
                that._updatePasswordStrengthStyles(strength);
                break;
            case 'tooltipPosition':
                that.$.tooltip.position = that.tooltipPosition;
                break;
            case 'tooltipTemplate':
                that.$.tooltip.tooltipTemplate = that.tooltipTemplate;
                break;
            case 'value':
                strength = that._evaluatePasswordStrength();

                that._updateTooltipString(strength);
                that._updatePasswordStrengthStyles(strength);
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

    blur() {
        that.$.input.blur();
    }

    /**
     * Reset Method. Reset to the initialization value
     */
    reset() {
        const that = this;

        that.$.input.value = that.value = that._initializationValue;
    }

    /**
     * Element's create method
     */
    _createElement() {
        const that = this;

        if (that.autoFocus) {
            that.$.input.focus();
        }

        that.$.addClass('lw-input');
        that._setFocusable();
        that.$.tooltip.selector = that.$.innerContainer;
        that.$.passwordIcon.setAttribute('title', that.localize('showPassword'));
        that._updateTooltipString('short');
        that._updatePasswordStrengthStyles();
        that._initializationValue = that.value;
        that.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');
        that._handleHintContainer();

        if (!that.hint) {
            that.hint = that.placeholder;
        }
        //NOTE: Tooltip styles are loaded with a delay
        if (that.shadowRoot) {
            that.$.tooltip.style.display = 'none';
            requestAnimationFrame(() => that.$.tooltip.style.display = '');
        }

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
        that.$.innerContainer.removeAttribute('aria-describedby');
        that.$.input.setAttribute('aria-describedby', that.$.tooltip.id + ' ' + that.$.hint.id);
        that.$.input.setAttribute('aria-labelledby', that.$.label.id);
    }

    /**
     * Handles the Hint
     */
    _handleHintContainer() {
        const that = this;

        if (!that.hint) {
            return;
        }

        const container = that.$.hint;

        if (typeof that.hint === 'function') {
            const value = that.value,
                invalid = that.hint(value, container);

            invalid ? that.$.addClass('invalid') : that.$.removeClass('invalid');
        }
        else if (typeof that.hint === 'string') {
            container.innerHTML = that.hint;
            that.$.removeClass('invalid');
        }
    }

    /**
    * PasswordTextBox focus handler.
    */
    _focusHandler() {
        const that = this;

        if (that.disabled) {
            return;
        }

        if (that.selectAllOnFocus) {
            that.$.input.select();
        }

        if (that.showPasswordIcon) {
            that.$passwordIcon.removeClass('lw-hidden');
        }

        that.setAttribute('focus', '');

        that._valueBeforeChange = that.value;

        if (!that.showPasswordStrength) {
            return;
        }

        if (!that._tooltipOpened) {
            that.$.tooltip.open();
            that._tooltipOpened = true;
        }

        that.$.fireEvent('focus');
    }

    /**
    * PasswordTextBox blur handler.
    */
    _blurHandler() {
        const that = this;

        if (that.disabled || that._passwordIconPressed) {
            return;
        }

        if (that._valueBeforeChange !== that.value) {
            that.$.fireEvent('change', {
                'newValue': that.value,
                'oldValue': that._valueBeforeChange
            });
            that._valueBeforeChange = '';
        }

        if (that.showPasswordIcon) {
            that.$passwordIcon.addClass('lw-hidden');
        }

        that.removeAttribute('focus');
        that.value.length > 0 ? that.$.addClass('has-value') : that.$.removeClass('has-value');
        that.$.fireEvent('blur');

        if (!that._tooltipOpened) {
            return;
        }

        that.$.tooltip.close();
        that._tooltipOpened = false;
    }

    /**
    * Shows password if show passwor icon is pressed.
    */
    _showPassword() {
        const that = this;

        if (that.disabled || !that.showPasswordIcon) {
            return;
        }

        that.$.input.type = 'text';
        that._passwordIconPressed = true;
    }

    /**
    * Hides password.
    */
    _documentUpHandler() {
        const that = this;

        if (that.disabled || !that.showPasswordIcon || !that._passwordIconPressed) {
            return;
        }

        that.$.input.type = 'password';
        that._passwordIconPressed = false;
        that.$.input.focus();
    }

    /**
    *  PasswordTextBox change handler.
    */
    _textBoxChangeHandler() {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        that.value = that.$.input.value;
        let strength = that._evaluatePasswordStrength();

        that._updateTooltipString(strength);
        that._updatePasswordStrengthStyles(strength);
    }

    /**
    *  Updates container's styles related to the password strength.
    */
    _updatePasswordStrengthStyles(strength) {
        const that = this,
            passwordStrengthOptions = ['short', 'weak', 'far', 'good', 'strong'];

        strength = strength || 'short';

        for (let i = 0; i < passwordStrengthOptions.length; i++) {
            that.$container.removeClass('lw-password-' + passwordStrengthOptions[i]);
        }

        if (that.disabled) {
            return;
        }

        that.$container.addClass('lw-password-' + strength);
    }

    /**
    *  Evaluates the strength of the password string.
    */
    _evaluatePasswordStrength() {
        const that = this,
            password = that.$.input.value,
            passwordLength = password.length,
            allowedSymbols = '<>@!#$%^&*()_+[]{}?:;|\'"\\,./~`-=';

        if (that.disabled) {
            return;
        }

        if (that.passwordStrength) {
            return that.passwordStrength(password, allowedSymbols);
        }

        let letters = 0,
            numbers = 0,
            specials = 0,
            passwordStrength = 0;

        for (var i = 0; i < passwordLength; i++) {
            const charAt = password.charAt(i),
                charCodeAt = password.charCodeAt(i);

            if ((charCodeAt > 64 && charCodeAt < 91) || (charCodeAt > 96 && charCodeAt < 123) || (charCodeAt > 127 && charCodeAt < 155) || (charCodeAt > 159 && charCodeAt < 166)) {
                letters += 1;
                continue
            }
            if (isNaN(charAt) === false) {
                numbers += 1;
                continue
            }
            if (allowedSymbols.indexOf(charAt) !== -1) {
                specials += 1;
                continue
            }
        }

        passwordStrength = letters + numbers + 2 * specials + letters * numbers / 2 + passwordLength;

        if (passwordLength < 8) {
            return 'short';
        }
        else {
            if (passwordStrength < 20) {
                return 'weak';
            }
            else if (passwordStrength < 30) {
                return 'far';
            }
            else if (passwordStrength < 40) {
                return 'good';
            }
            else {
                return 'strong';
            }
        }
    }

    _keyUpHandler() { }
    _mouseWheelHandler() { }
    _resizeHandler() { }
    _selectStartHandler() { }
    _setDropDownSize() { }
    _styleChangedHandler() { }

    /**
   * PasswordTextBox container mouse enter/leave events handler.
   */
    _mouseEventsHandler(event) {
        const that = this;

        event.type === 'mouseenter' ? that.setAttribute('hover', '') : that.removeAttribute('hover');
    }

    _updateTooltipString(strength) {
        const that = this;

        that.$.tooltip.value = '<span class="password-strength-label">' + that.localize('passwordStrength') + ': </span><span class="password-strength-value">' + that.localize(strength) + '</span>';
    }
});