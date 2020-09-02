
/**
* LED custom element.
*/
LW('lw-led', class Led extends LW.ToggleButton {
    // LED's properties.
    static get properties() {
        return {
            'shape': {
                value: 'round',
                allowedValues: ['round', 'square'],
                type: 'string'
            }
        };
    }

    /**
     * CSS files needed for the element (ShadowDOM)
     */
    static get styleUrls() {
        return [
            'lw.led.css'
        ]
    }

    /** LED's Html template. */
    template() {
        return `<div id='container' class='lw-container' role="presentation">
                    <div id='ledAnimation' class='lw-animation' role="presentation"></div>
                    <div id='button' class='lw-input' role="presentation">
                        <span id='falseContentContainer' inner-h-t-m-l='[[falseContent]]' class='lw-false-content-container'></span>
                        <span id='indeterminateContentContainer' inner-h-t-m-l='[[indeterminateContent]]' class='lw-indeterminate-content-container'></span>
                        <span id='trueContentContainer' inner-h-t-m-l='[[trueContent]]' class='lw-true-content-container'></span>
                    </div>
                    <input id='hiddenInput' class='lw-hidden-input' type='hidden'>
                </div>`;
    }

    /** Called when the element is ready. Used for one-time configuration of the Switch Button. */
    ready() {
        const that = this;

        super.ready();

        that._htmlBindOnInitialization();

        if (that.indeterminate) {
            that._valueCashe = that.checked;
            that.checked = null;
        }

        that._handleTemplate(true);
        that._handleTemplate(false);
        that._handleTemplate();

        that._updateHidenInputNameAndValue();
    }

    /**
   * Updates the LED when a property is  changed.
   * @param {string} propertyName The name of the property.
   * @param {number/string} oldValue The previously entered value.
   * @param {number/string} newValue The new entered value.
   */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'indeterminate':
                if (newValue) {
                    that._valueCashe = that.checked;
                    that.checked = null;
                }
                else {
                    that.checked = that._valueCashe;
                }
                that._updateHidenInputNameAndValue();
                break;
            case 'trueContent':
                that.trueContent = newValue;
                that._handleTemplate(true);
                break;
            case 'falseContent':
                that.falseContent = newValue;
                that._handleTemplate(false);
                break;
            case 'indeterminateContent':
                that.indeterminateContent = newValue;
                that._handleTemplate();
                break;
            case 'value':
                that._updateHidenInputNameAndValue();
                break;
            case 'checked':
                that._updateHidenInputNameAndValue();
                break;
            case 'name':
                that._updateHidenInputName();
                break;
        }
    }

    /** Changes the state wneh widget is clicked. */
    _documentUpHandler(event) {
        const that = this;

        if (!that._pressed || that.readonly) {
            return;
        }

        if (that.clickMode === 'press') {
            event.preventDefault();
            event.stopPropagation();
            that._pressed = false;
            return;
        }

        super._documentUpHandler(event);
        that.indeterminate = false;
        that._updateHidenInputNameAndValue();
        that._pressed = false;
    }

    _mouseDownHandler() {
        const that = this;

        if (that.readonly || that.disabled) {
            return;
        }

        that._pressed = true;

        if (that.clickMode === 'press' || that.clickMode === 'pressAndRelease') {
            that._changeCheckState('pointer');
            that.$.fireEvent('click');
            that.indeterminate = false;
            that._updateHidenInputNameAndValue();
        }
    }
});
