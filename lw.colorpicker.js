
/**
* ColorPicker custom element.
*/
LW('lw-color-picker', class ColorPicker extends LW.DropDownButton {
    // ColorPicker's properties.
    static get properties() {
        return {
            'applyValueMode': {
                value: 'instantly',
                allowedValues: ['instantly', 'useButtons'],
                type: 'string'
            },
            'columnCount': {
                value: 8,
                type: 'number'
            },
            'gridThemeColors': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'gridShadeColors': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'gridStandardColors': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'paletteColors': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'paletteCustomColors': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'disableUndo': {
                value: false,
                type: 'boolean'
            },
            'displayMode': {
                value: 'default',
                allowedValues: ['default', 'grid', 'palette', 'radial', 'hexagonal', 'spectrumGrid', 'materialGrid'],
                type: 'string'
            },
            'dropDownAppendTo': {
                value: null,
                type: 'any'
            },
            'dropDownHeight': {
                value: 'auto',
                type: 'string'
            },
            'dropDownWidth': {
                value: 'auto',
                type: 'string'
            },
            'editable': {
                value: false,
                type: 'boolean'
            },
            'editAlphaChannel': {
                value: false,
                type: 'boolean'
            },
            'enableCustomColors': {
                value: false,
                type: 'boolean'
            },
            'hidePreviewContainer': {
                value: false,
                type: 'boolean'
            },
            'hideRGBEditor': {
                value: false,
                type: 'boolean'
            },
            'hideHEXEditor': {
                value: false,
                type: 'boolean'
            },
            'hideAlphaEditor': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                value: {
                    'en': {
                        'redPrefix': 'R:',
                        'greenPrefix': 'G:',
                        'bluePrefix': 'B:',
                        'hexPrefix': '#:',
                        'alphaPrefix': 'Alpha:',
                        'ok': 'OK',
                        'cancel': 'CANCEL',
                        'customColor': 'CUSTOM COLOR',
                        'standardColors': 'Standard colors',
                        'themeColors': 'Theme colors'
                    }
                },
                type: 'object',
                extend: true
            },
            'name': {
                value: '',
                type: 'string'
            },
            'palette': {
                value: 'default',
                allowedValues: ['default', 'gray', 'red', 'green', 'blue', 'custom'],
                type: 'string'
            },
            'placeholder': {
                value: 'Please Select Color',
                type: 'string'
            },
            'tooltipDisplayMode': {
                value: 'hex',
                allowedValues: ['none', 'rgba', 'rgb', 'hex'],
                type: 'string'
            },
            'value': {
                value: null,
                type: 'string?'
            },
            'valueDisplayMode': {
                value: 'default',
                allowedValues: ['default', 'colorBox', 'colorCode', 'none'], // default => (colorBox + text), colorBox(only color box), text(only input), none(only button with placeholder); editable to enable text input in default and text modes, otherwise input to be disabled
                type: 'string'
            },
            'valueFormat': {
                value: 'default',
                allowedValues: ['default', 'rgb', 'rgba', 'hex'], // in 'default' mode the value is shown in format 'as is' entered by the user
                type: 'string'
            },
            'inverted': {
                value: false,
                type: 'boolean'
            },
            'hideContentToFit': {
                value: ['RGB', 'HEX', 'alpha', 'previewContainer'], // hides palette editors in a sequence if there is not enought space
                type: 'array'
            }
        };
    }

    /**
     * ColorPicker's event listeners.
     */
    static get listeners() {
        return {
            'input.change': '_inputChangeHandler',
            'input.focus': '_focusEventHandler',
            'input.blur': '_blurEventHandler',
            'colorPanel.cancelButtonClick': '_cancelButtonHandler',
            'colorPanel.okButtonClick': '_okButtonHandler',
            'colorPanel.customColorSelection': '_customColorSelectionHandler',
            'colorPanel.change': '_colorPanelChangeHandler',
            'keydown': '_keyDownHandler'
        };
    }
    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.ColorPanel': 'lw.colorpanel.js',
            'LW.DropDownButton': 'lw.dropdownbutton.js'
        }
    }

    /**
      * CSS files needed for the element (ShadowDOM)
      */
    static get styleUrls() {
        return [
            'lw.colorpanel.css',
            'lw.colorpicker.css'
        ]
    }

    /**
    * ColorPicker's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <span class="lw-label" id="label">[[label]]</span>
                    <div id="content" class="lw-content" role="presentation">
                        <div id="buttonsContainer" class="lw-buttons-container" role="presentation">
                            <div id="actionButton" class="lw-action-button">
                                <div id="colorSampleContainer" class="lw-color-box color-picker-sample-container" role="presentation">
                                    <div id="colorSample" class="color-picker-sample"></div>
                                </div>
                                <input type="text" id="input" class="lw-input lw-color-input color-picker-action-input" placeholder="[[placeholder]]" spellcheck="false" autocomplete="off" aria-label="[[placeholder]]" />
                            </div>
                            <span id="dropDownButton" class="lw-drop-down-button">
                                <span class="lw-drop-down-button-icon" id="arrow" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div id="dropDownContainer" class="lw-drop-down lw-drop-down-color-picker lw-drop-down-container lw-visibility-hidden" role="dialog">
                            <lw-color-panel id="colorPanel" wait
                                             animation="[[animation]]"
                                             apply-value-mode="[[applyValueMode]]"
                                             column-count="[[columnCount]]"
                                             disabled="[[disabled]]"
                                             display-mode="[[displayMode]]"
                                             edit-alpha-channel="[[editAlphaChannel]]"
                                             enable-custom-colors="[[enableCustomColors]]"
                                             grid-theme-colors="[[gridThemeColors]]"
                                             grid-shade-colors="[[gridShadeColors]]"
                                             grid-standard-colors="[[gridStandardColors]]"
                                             hide-content-to-fit="[[hideContentToFit]]"
                                             hide-preview-container="[[hidePreviewContainer]]"
                                             hide-r-g-b-editor="[[hideRGBEditor]]"
                                             hide-h-e-x-editor="[[hideHEXEditor]]"
                                             hide-alpha-editor="[[hideAlphaEditor]]"
                                             inverted="[[inverted]]"
                                             locale="[[locale]]"
                                             messages="[[messages]]"
                                             name="[[name]]"
                                             palette-colors="[[paletteColors]]"
                                             palette-custom-colors="[[paletteCustomColors]]"
                                             palette="[[palette]]"
                                             right-to-left="[[rightToLeft]]"
                                             theme="[[theme]]"
                                             tooltip-display-mode="[[tooltipDisplayMode]]"
                                             value="{{value}}"
                                             value-format="[[valueFormat]]">
                            </lw-color-panel>
                            <div id="resizeBar" class="lw-drop-down-resize-bar" aria-label="Resize">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <span class="lw-hint" id="hint">[[hint]]</span>
                </div>`;
    }

    /**
    * Updates the DropDownButton when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'editable':
            case 'disabled':
            case 'readonly':
                that.$.input.readOnly = that.disabled || that.readonly || !that.editable;
                break;
            case 'value':
                if (that.$.colorPanel._isValidColor(that.value)) {
                    that._applyValue(that.value);
                }
                break;
            case 'displayMode':
                that._applyValue(that.value);
                break;
            case 'dropDownOpenMode':
                super.propertyChangedHandler(propertyName, oldValue, newValue);

                if (newValue === 'dropDownButton') {
                    that.$.actionButton.setAttribute('aria-label', that.value || that.placeholder);
                }
                else {
                    that.$.actionButton.removeAttribute('aria-label');
                }

                break;
            case 'resizeMode':
                that.$.dropDownContainer.setAttribute('resize-mode', that.resizeMode);
                break;
            case 'valueDisplayMode':
                if (newValue === 'none') {
                    that.$.actionButton.setAttribute('role', 'presentation');
                }
                else {
                    that.$.actionButton.removeAttribute('role');
                }

                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }

        if (propertyName === 'displayMode') {
            //Resize event not thrown
            that.$.colorPanel._hideControlsByPriority();
        }
    }

    /**
     * Open method. Opens the popup
     */
    open() {
        const that = this,
            dropDownsInDOM = document.querySelectorAll('lw-drop-down-button, lw-color-picker');

        //Lazy generate the ColorPanel structure before opening. The first time only
        if (that.$.colorPanel._initializeOnOpening) {
            delete that.$.colorPanel._initializeOnOpening;
            that.$.colorPanel._generateGridStructures();
            that.$.colorPanel._applyValue(that.value);
            that.$.colorPanel._hideControlsByPriority();
        }

        //NOTE: Will not close other DropDown's on page ! For example, DropDownList, DateTimePickers, etc ...
        //Make sure all dropDownButton popups are closed before openning this one
        for (let i = 0; i < dropDownsInDOM.length; i++) {
            if (dropDownsInDOM[i] !== that && dropDownsInDOM[i].opened) {
                dropDownsInDOM[i].close();
            }
        }

        //Closes palette for custom color selection
        if (that.$.colorPanel && that.$.colorPanel.$container.hasClass('custom-color-selection')) {
            that.$.colorPanel._handleCancelButtonClick();
        }

        that._open();
    }

    /**
     * Blur method
     */
    blur() {
        this.$.input.blur();
    }

    /**
     * Focus method
     */
    focus() {
        this.$.input.focus();
    }

    /**
     * ColorPicker ready method
     */
    _createElement() {
        const that = this;

        that.$.colorPanel._initializeOnOpening = !that.opened;
        that.$.colorPanel.wait = false;
        that.$.colorPanel.setAttribute('role', 'presentation');

        that.$.input.readOnly = that.disabled || that.readonly || !that.editable;

        if (that.editable) {
            that.dropDownOpenMode = 'dropDownButton';
        }

        that._setAriaRelations(true);

        if (that.valueDisplayMode === 'none') {
            that.$.actionButton.setAttribute('role', 'presentation');
        }
        else {
            that.$.actionButton.removeAttribute('role');
        }

        that._applyValue(that.$.colorPanel.value);
        that._setFocusable();
    }

    /*
    * Applies the value
    */
    _colorPanelChangeHandler(event) {
        const that = this;

        that._applyValue(event.detail.value);

        event.stopPropagation();

        that.$.fireEvent('change', event.detail);
    }

    /**
     * Handles Cancel Button Click
     */
    _cancelButtonHandler(event) {
        const that = this;

        event.stopPropagation();

        if (that.$.colorPanel.$.container.className.indexOf('custom-color-selection') > -1) {
            that.$.fireEvent(event.type, event.detail);
            return;
        }

        that.close();
        that.$.fireEvent(event.type, event.detail);
    }

    /**
     * Handles the Custom Color Selection view change
     * @param {any} event
     */
    _customColorSelectionHandler(event) {
        const that = this;

        event.stopPropagation();

        //Check the Browser bounds
        that._positionDetection.checkBrowserBounds('vertically');
        that._positionDetection.positionDropDown();
        that._positionDetection.checkBrowserBounds('horizontally');
        that.$.fireEvent(event.type, event.detail);
    }

    /*
    * Closes the dropdown and applies the value
    */
    _okButtonHandler(event) {
        const that = this;

        event.stopPropagation();

        if (that.$.colorPanel.$.container.className.indexOf('custom-color-selection') > -1) {
            that.$.fireEvent(event.type, event.detail);
            return;
        }

        that._applyValue(that.$.colorPanel.value);
        that.close();
        that.$.fireEvent(event.type, event.detail);
    }

    /**
     * Makes the element focusable or not
     */
    _setFocusable() {
        const that = this;

        if (!that.disabled && !that.unfocusable) {
            let index = that.tabIndex > 0 ? that.tabIndex : 0;

            that.$.input.tabIndex = index;
            that.dropDownOpenMode === 'dropDownButton' ? that.$.dropDownButton.setAttribute('tabindex', index) : that.$.dropDownButton.removeAttribute('tabindex');
            return;
        }

        that.$.input.tabIndex = -1;
        that.$.dropDownButton.removeAttribute('tabindex');
    }

    /*
    * Applies value 
    */
    _inputChangeHandler(event) {
        const that = this;

        event.preventDefault();
        event.stopPropagation();

        that.value = that.$.colorPanel.value = that.$.input.value;
    }

    /*
    * Applies the value to value property, color sample, color panel
    */
    _applyValue(tempValue) {
        const that = this;

        that.value = that.$.colorPanel.value = that.$.colorSample.style.backgroundColor = that.$.input.value = tempValue;

        if (tempValue) {
            that.$colorSampleContainer.removeClass('no-color');
            that.$.colorSample.setAttribute('aria-label', tempValue);
        }
        else {
            that.$colorSampleContainer.addClass('no-color');
            that.$.colorSample.setAttribute('aria-label', 'No color');
        }

        if (!that.label) {
            that._ariaButton.setAttribute('aria-label', tempValue || that.placeholder);
        }

        if (that.dropDownOpenMode === 'dropDownButton') {
            that.$.actionButton.setAttribute('aria-label', tempValue || that.placeholder);
        }
    }

    /**
    * Key down handler 
    * @param {any} event
    */
    _keyDownHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.composedPath()[0] : event.target,
            activeElement = (that.shadowRoot || that.getRootNode()).activeElement || document.activeElement;

        if (that.disabled || that.readonly ||
            (activeElement !== that && activeElement !== that.$.dropDownButton && activeElement !== that.$.input)) {
            return;
        }

        switch (event.key) {
            case 'Enter':
            case ' ':
                if (target !== that.$.input) {
                    if (that.opened && event.key === 'Enter') {
                        event.preventDefault();
                        that.close();
                    }
                    else if (!that.opened && !that.readonly && that.dropDownOpenMode !== 'none') {
                        event.preventDefault();
                        that.open();
                    }
                }
                else if (event.key === 'Enter') {
                    event.preventDefault();
                    that.$.colorPanel.value = that.$.input.value;
                }

                break;
            case 'ArrowUp':
            case 'ArrowDown':
                if (event.altKey) {
                    if (!that.disabled && !that.readonly && that.dropDownOpenMode !== 'none') {
                        event.key === 'ArrowDown' ? that.open() : that.close();
                    }

                    return;
                }

                event.preventDefault();
                break;
            case 'Escape':
                event.preventDefault();
                that.close();
                break;
        }
    }
});
