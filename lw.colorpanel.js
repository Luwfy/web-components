
/**
* ColorPanel custom element.
*/

LW('lw-color-panel', class ColorPanel extends LW.BaseElement {
    // ColorPanel's properties.
    static get properties() {
        return {
            'applyValueMode': {
                value: 'instantly',
                allowedValues: ['instantly', 'useButtons'],
                type: 'string'
            },
            'columnCount': {
                value: 8,
                type: 'number?'
            },
            'displayMode': {
                value: 'default',
                allowedValues: ['default', 'grid', 'palette', 'radial', 'hexagonal', 'spectrumGrid', 'materialGrid'],
                type: 'string'
            },
            'disableUndo': {
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
            'hideAlphaEditor': {
                value: false,
                type: 'boolean'
            },
            'hideContentToFit': {
                value: ['RGB', 'HEX', 'alpha', 'previewContainer'],
                type: 'array'
            },
            'hideHEXEditor': {
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
            'inverted': {
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
            'tooltipDisplayMode': {
                value: 'hex',
                allowedValues: ['none', 'rgba', 'rgb', 'hex'],
                type: 'string'
            },
            'value': {
                value: null,
                type: 'string?'
            },
            'valueFormat': {
                value: 'default',
                allowedValues: ['rgb', 'rgba', 'hex', 'default'],
                type: 'string'
            },
            'valueMember': {
                value: 'value',
                type: 'string?'
            }
        };
    }

    /**
     * ColorPanel's event listeners.
     */
    static get listeners() {
        return {
            'container.click': '_containerClickHandler',
            'container.mouseover': '_handleGridModeCellHover',
            'paletteModeContainer.down': '_paletteDownHandler',
            'container.change': '_handleInputChange',
            'document.move': '_moveThumbHandler',
            'document.up': '_releaseThumbUpHandler',
            'paletteModeContainer.wheel': '_inputWheelHandler',
            'resize': '_hideControlsByPriority',

            //NOTE: The size of the hexagon is determines by size of a color-sample span element. It's size is set via CSS variable
            'hexModeResizeTrigger.resize': '_resizeHoneycombItems',

            //NOTE: iOS fix. iOS doesn't support CSS prop 'touch-action: none'
            'paletteModeContainer.move': '_paletteModeContainerMoveHandler'
        };
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.Utilities.Draw': 'lw.draw.js',
            'LW.Button': 'lw.button.js',
            'LW.Tooltip': 'lw.tooltip.js'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.button.css',
            'lw.tooltip.css',
            'lw.colorpanel.css'
        ]
    }

    /**
    * DropDownButton's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <div id="gridModeContainer" class="grid-mode-container" role="presentation"></div>
                    <div id="paletteModeContainer" class="palette-mode-container" role="presentation">
                        <div id="colorPaletteContainer" class="color-palette-container" role="presentation">
                            <div id="colorPalette" class="color-palette no-touch" aria-label="Color palette">
                                <div id="colorPaletteThumb" class="color-palette-thumb" role="presentation"></div>
                            </div>
                            <div id="hueScale" class="hue-scale no-touch" aria-label="Hue scale" role="slider" aria-valuemin="0" aria-valuemax="360">
                                <div id="hueScaleThumb" class="hue-scale-thumb" role="presentation"></div>
                            </div>
                            <div id="colorPaletteRadial" class="color-palette-radial no-touch" aria-label="Radial color palette">
                                <span class="white-radial-gradient" role="presentation"></span>
                                <div id="colorPaletteRadialThumb" class="color-palette-radial-thumb" role="presentation"></div>
                            </div>
                            <div id="colorPaletteHexagonal" class="color-palette-hexagonal" aria-label="Hexagonal color palette"></div>
                            <div id="brightnessScale" class="brightness-scale no-touch" aria-label="Brightness scale" role="slider" aria-valuemin="0" aria-valuemax="1">
                                <div id="brightnessScaleThumb" class="brightness-scale-thumb" role="presentation"></div>
                            </div>
                            <span id="hexModeResizeTrigger" class="color-sample hex-mode-resize-trigger"></span>
                            <div id="colorControlsContainer" class="color-controls-container" role="presentation"></div>
                        </div>
                        <div id="alphaChannelContainer" class="alpha-channel-container"></div>
                    </div>
                    <div id="buttonsContainer" class="buttons-container"></div>
                    <input id="hiddenInput" type="hidden" name="[[name]]">
                </div>`;
    }

    /**
    * Updates the ColorPanel when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'applyValueMode':
                if (newValue === 'instantly' && !that.value) {
                    that._HSV = { h: 0, s: 0, v: 1 };

                    if (that._selectedItem && that._selectedItem.classList.contains('selected')) {
                        that._selectedItem.classList.remove('selected');
                        that._selectedItem.removeAttribute('aria-current');
                        that._selectedItem.style.stroke = null;
                    }
                }

                if (that.displayMode === 'palette' || that.displayMode === 'radial' || that.displayMode === 'hexagonal') {
                    that._handleCancelButtonClick();
                }

                if (newValue === 'useButtons') {
                    that._createApplyValueButtons();
                }

                break;
            case 'paletteColors':
                that._customPalette = that._mapDataSourceToPalette();
                updateDisplayMode(that.displayMode);
                break;
            case 'inverted': {
                if (['hexagonal', 'radial', 'spectrumGrid'].indexOf(that.displayMode) === -1) {
                    return;
                }

                const previousValue = that.value,
                    hueScaleThumbHeight = that.$.hueScaleThumb.offsetHeight,
                    brightness = that._validateInRange(hueScaleThumbHeight / 2, 0, that.$.hueScale.offsetHeight - hueScaleThumbHeight) / that.$.brightnessScale.offsetHeight;

                if (isNaN(brightness)) {
                    that._generateGridStructures();
                    return;
                }

                if (newValue) {
                    that._HSV.v = that._HSV.s;
                    that._HSV.s = 1 - brightness;
                }
                else {
                    that._HSV.s = that._HSV.v;
                    that._HSV.v = 1 - brightness;
                }

                that.value = that._HSVtoRGBA(that._HSV);
                that.$.colorPaletteRadial.style.setProperty('--lw-color-panel-brightness', (that.$.brightnessScaleThumb.s || 0));

                updateDisplayMode(that.displayMode);

                if (that.value !== previousValue) {
                    that.$.fireEvent('change', {
                        'oldValue': previousValue,
                        'value': that.value
                    });
                }

                break;
            }
            case 'palette':
                updateDisplayMode(that.displayMode);
                that._updatePreviewContainerValues(that.value);
                break;
            case 'displayMode':
            case 'gridThemeColors':
            case 'gridShadeColors':
            case 'gridStandardColors':
                if (propertyName === 'displayMode') {
                    const previousValue = that.value;

                    if (that.$.container.className.indexOf('custom-color-selection') > -1) {
                        //that._handleOkButtonClick();
                        that._handleCancelButtonClick();
                    }

                    if (that.value !== null && newValue !== 'palette' && newValue !== 'hexagonal' && newValue !== 'radial') {
                        if (!that.editAlphaChannel && that.$.alphaChannelThumb) {
                            that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                            that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = 0;
                            that.$.alphaChannelThumb.a = that._RGBA.a = 1;
                            that.$.alphaChannelScale.setAttribute('aria-valuenow', 1);
                        }

                        that.value = that._getValue(that.valueFormat);
                        updateDisplayMode();

                        that.$.fireEvent('change', {
                            'oldValue': previousValue,
                            'value': that.value
                        });
                        break;
                    }

                    if (that.value === null && (newValue === 'palette' || newValue === 'hexagonal' || newValue === 'radial')) {
                        that._RGBA = { r: 255, g: 255, b: 255, a: 1 };
                        that._HSV = { h: 0, s: 0, v: 1 }
                        that.value = that._getValue(that.valueFormat);
                        updateDisplayMode();

                        that.$.fireEvent('change', {
                            'oldValue': previousValue,
                            'value': that.value
                        });
                        break;
                    }

                    that.value = that._getValue(that.valueFormat);

                    if (LW.Utilities.Core.Browser.Firefox && oldValue === 'radial') {
                        const canvas = that.$.colorPaletteRadial.querySelector('canvas');

                        if (canvas) {
                            canvas.remove();
                        }
                    }
                }

                updateDisplayMode(that.displayMode);
                break;
            case 'locale':
            case 'messages':
                that._localizeLabels();
                break;
            case 'paletteCustomColors':
                that._userPalette = newValue || [];

                if (that.displayMode.toLowerCase().indexOf('grid') > -1 || that.displayMode === 'default') {
                    that._generatePaletteUserColorGrid(true);
                }

                break;
            case 'editAlphaChannel': {
                !newValue && (that._RGBA.a = 1);

                if (newValue) {
                    that._createAlphaChannel();
                }

                if (!that.value) {
                    return;
                }

                const previousValue = that.value;

                that.value = that._getValue(that.valueFormat);

                if (that.value !== previousValue) {
                    that.$.fireEvent('change', {
                        'oldValue': previousValue,
                        'value': that.value
                    });
                }

                break;
            }
            case 'value': {
                newValue = typeof newValue === 'string' ? newValue.trim() : newValue;

                if (!that._isValidColor(newValue)) {
                    that._reset();
                    return;
                }

                that._applyValue(newValue);
                that.value = that._getValue(that.valueFormat);

                if (that.displayMode === 'hexagonal') {
                    that._generateHoneycomb(that.columnCount, that.inverted ? { s: that._HSV.s } : { v: that._HSV.v });
                }

                if (oldValue !== that.value) {
                    that.$.fireEvent('change', {
                        'oldValue': oldValue,
                        'value': that.value
                    });
                }

                break;
            }
            case 'columnCount': {
                const style = that.$.container.style;

                (newValue === null || isNaN(newValue)) ? style.removeProperty('--lw-color-panel-grid-mode-column-count') : style.setProperty('--lw-color-panel-grid-mode-column-count', newValue);

                that._generatePaletteUserColorGrid();

                if (that.displayMode === 'spectrumGrid') {
                    that._generateSpectrumGrid(parseInt(newValue));
                }
                else if (that.displayMode === 'hexagonal') {
                    that._generateHoneycomb(newValue, that._HSV);
                }
            }
                break;
            case 'valueFormat':
                {
                    if (!that.value) {
                        return;
                    }

                    const oldValue = that.value;

                    that.value = that._getValue(newValue);

                    that.$.fireEvent('change', {
                        'oldValue': oldValue,
                        'value': that.value
                    });

                    break;
                }
            case 'tooltipDisplayMode':
                if (!that.$.tooltip) {
                    return;
                }

                if (newValue === 'none') {
                    that.$.tooltip.close();
                    that.$.tooltip.disabled = true;
                }
                else {
                    that.$.tooltip.disabled = false;
                }

                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);

                if (propertyName === 'disabled') {
                    const inputs = that.getElementsByClassName('color-input');

                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i][propertyName] === newValue;
                    }
                }

                if (propertyName === 'disabled' || propertyName === 'theme' || propertyName === 'animation') {
                    if (that.$.buttonOk) {
                        that.$.buttonOk[propertyName] = newValue;
                    }

                    if (that.$.buttonCancel) {
                        that.$.buttonCancel[propertyName] = newValue;
                    }

                    if (that.$.buttonCustom) {
                        that.$.buttonCustom[propertyName] = newValue;
                    }

                    if (that.$.tooltip) {
                        that.$.tooltip[propertyName] = newValue;
                    }
                }

                break;
        }

        function updateDisplayMode() {
            that._generateGridStructures();
            that._applyValue(that.value);
        }
    }

    /**
    * ColorPanel ready method.
    */
    ready() {
        super.ready();
    }

    render() {
        const that = this;

        that.setAttribute('role', 'dialog');

        that._initializeBaseVars();

        if (that.columnCount === null || isNaN(that.columnCount)) {
            that.$.container.style.removeProperty('--lw-color-panel-grid-mode-column-count');
        }
        else {
            that.$.container.style.setProperty('--lw-color-panel-grid-mode-column-count', that.columnCount);
        }

        if (that.applyValueMode === 'useButtons') {
            that._createApplyValueButtons();
        }

        if (that.editAlphaChannel) {
            that._createAlphaChannel();
        }

        that._generateGridStructures();
        that._localizeLabels();

        //In displayMode = 'hexagonal' || 'radial' value can't be null
        if (!that.value && (that.displayMode === 'hexagonal' || that.displayMode === 'radial' || that.displayMode === 'palette')) {
            that.value = that._getValue(that.valueFormat);
        }

        that._applyValue(that.value);

        that._hideControlsByPriority();//

        if (that.enableShadowDOM) {
            that.appendChild(that.$.hiddenInput);
        }

        super.render();
        
    }

    /**
    * Creates the ApplyValue buttons
    */
    _createApplyValueButtons(createOnDemand) {
        const that = this;

        if (!createOnDemand && that.applyValueMode !== 'useButtons') {
            return
        }

        if (that.$.buttonsContainer.innerHTML.trim()) {
            return;
        }

        function createButton(type) {
            let button = document.createElement('lw-button');

            button.classList.add(type);
            button.classList.add('primary');
            button.rightToLeft = that.rightToLeft;

            button.disabled = that.disabled;
            button.theme = that.theme;
            button.animation = that.animation;

            that.$.buttonsContainer.appendChild(button);

            return button;
        }

        that.$.buttonOk = createButton('button-ok');
        that.$.buttonCancel = createButton('button-cancel');

        that.$.buttonOk.content = that.localize('ok');
        that.$.buttonCancel.content = that.localize('cancel');
    }

    /**
     * Creates the alpha channel components
     */
    _createAlphaChannel() {
        const that = this;

        if (!that.editAlphaChannel || (that.editAlphaChannel && that.$.alphaChannelContainer.innerHTML.trim())) {
            return;
        }

        that.$.alphaChannelContainer.innerHTML = `
                            <div class="alpha-channel-scale no-touch" aria-label="Alpha channel scale" role="slider">
                                <div class="alpha-channel-thumb" aria-hidden="true"></div>
                            </div>
                            <label for="${that.id}aChannelInput" class="a-channel"></label>
                            <input type="number" step="0.01" id="${that.id}aChannelInput" class="color-input a-channel" value="1" min="0" max="1">`;

        that.$.alphaChannelScale = that.$.alphaChannelContainer.querySelector('.alpha-channel-scale');
        that.$.alphaChannelThumb = that.$.alphaChannelContainer.querySelector('.alpha-channel-thumb');

        that.$.alphaChannelScale.setAttribute('role', 'slider');
        that.$.alphaChannelScale.setAttribute('aria-valuemin', 0);
        that.$.alphaChannelScale.setAttribute('aria-valuemin', 1);

        const aChannel = that.$.alphaChannelContainer.querySelector('input');

        aChannel.disabled = that.disabled;

        that._localizeLabels();
        that._applyAlphaValue(that._RGBA.a, 'alphaScale');
    }

    /**
     * Creates the components for the Grid modes
     */
    _createGridModeComponents() {
        const that = this,
            id = that.id;

        let nonGridModes = ['radial', 'palette', 'hexagonal'];

        if (nonGridModes.indexOf(that.displayMode) > -1) {
            return false;
        }

        if (that.$.gridModeContainer.innerHTML.trim()) {
            return;
        }

        const gridModeContainer = that.$.gridModeContainer;

        gridModeContainer.innerHTML = `
                        <div id="${id}defaultSamplesContainer" class="default-samples-container"></div>
                        <div id="${id}gridSamplesContainer" class="grid-samples-container"></div>
                        <div id="${id}materialGridSamplesContainer" class="material-grid-samples-container" role="menu"></div>
                        <div id="${id}spectrumGridSamplesContainer" class="spectrum-grid-samples-container"></div>
                        <lw-button id="${id}buttonCustom" class="button-custom-color primary"></lw-button>
                        <div id="${id}userSamplesContainer" class="user-samples-container" aria-label="User colors"></div>
                        <lw-tooltip id="${id}tooltip" arrow position="auto"></lw-tooltip>`;

        that.$.defaultSamplesContainer = gridModeContainer.querySelector('.default-samples-container');
        that.$.gridSamplesContainer = gridModeContainer.querySelector('.grid-samples-container');
        that.$.materialGridSamplesContainer = gridModeContainer.querySelector('.material-grid-samples-container');

        //Uses addClass/removeClass
        that.$.materialGridSamplesContainer.$ = LW.Utilities.Extend(that.$.materialGridSamplesContainer);

        that.$.spectrumGridSamplesContainer = gridModeContainer.querySelector('.spectrum-grid-samples-container');
        that.$.userSamplesContainer = gridModeContainer.querySelector('.user-samples-container');
        that.$.buttonCustom = gridModeContainer.querySelector('lw-button');
        that.$.tooltip = gridModeContainer.querySelector('lw-tooltip');

        that.$.buttonCustom.disabled = that.disabled;
        that.$.buttonCustom.rightToLeft = that.rightToLeft;
        that.$.buttonCustom.animation = that.animation;
        that.$.buttonCustom.theme = that.theme;
        that.$.buttonCustom.content = that.localize('customColor');

        that.$.tooltip.disabled = that.disabled || that.tooltipDisplayMode === 'none';
        that.$.tooltip.rightToLeft = that.rightToLeft;
        that.$.tooltip.animation = that.animation;
        that.$.tooltip.theme = that.theme;
    }

    /**
     * Creates the components for display modes: 'hexahon', 'palette', 'radial'
     */
    _createColorControls(createOnDemand) {
        const that = this,
            id = that.id;

        let nonGridModes = ['radial', 'palette', 'hexagonal'];

        if (!createOnDemand && nonGridModes.indexOf(that.displayMode) < 0) {
            return false;
        }

        const colorControlsContainer = that.$.colorControlsContainer;

        if (colorControlsContainer.innerHTML.trim()) {
            return;
        }

        colorControlsContainer.innerHTML =
            `<div id="${id}previewContainer" class="preview-container gradient-background" aria-label="Preview">` +
            '<span class="preview-container-top" aria-label="Current color"></span>' +
            '<span class="preview-container-bottom" aria-label="New color"></span>' +
            '</div>' +
            `<label for="${id}rChannelInput" id="${id}rChannelLabel" class="r-channel"></label>` +
            `<input type="number" min="0" max="255" id="${id}rChannelInput" class="color-input r-channel" value="255">` +
            `<label for="${id}gChannelInput" id="${id}gChannelLabel" class="g-channel"></label>` +
            `<input type="number" min="0" max="255" id="${id}gChannelInput" class="color-input g-channel" value="255">` +
            `<label for="${id}bChannelInput" id="${id}bChannelLabel" class="b-channel"></label>` +
            `<input type="number" min="0" max="255" id="${id}bChannelInput" class="color-input b-channel" value="255">` +
            `<label for="${id}hexInput" id="${id}hexLabel" class="hex"></label>` +
            `<input type="text" id="${id}hexInput" class="color-input hex" value="FFFFFF" maxlength="6">`;

        const inputs = colorControlsContainer.getElementsByClassName('color-input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = that.disabled;
        }

        that._localizeLabels();
    }

    /**
    * Container Click Handler
    * @param {any} event
    */
    _containerClickHandler(event) {
        const that = this;

        if (that.disabled || that.readonly || !event.target) {
            return;
        }

        if (event.target.classList.contains('color-sample')) {
            that._handleSampleClick(event);
            return;
        }

        const isButton = event.target.closest('lw-button');

        if (isButton === that.$.buttonCancel) {
            that._handleCancelButtonClick(true);
            return;
        }

        if (isButton === that.$.buttonCustom) {
            that.$container.addClass('custom-color-selection');

            that._createApplyValueButtons(true);
            that._createColorControls(true);

            //Prepare the Palette
            that._applyValueInPaletteMode();

            that._customColorSelection = true;

            if (that._RGBA.a === 1 && that.$.alphaChannelThumb) {
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = 0;
                that.$.alphaChannelThumb.a = that._RGBA.a;
                that.$.alphaChannelScale.setAttribute('aria-valuenow', that._RGBA.a);
            }

            that.$.fireEvent('customColorSelection', { value: true });
            return;
        }
        if (isButton === that.$.buttonOk) {
            that._handleOkButtonClick(true);
            return;
        }

        if (event.target === (that.shadowRoot || that).querySelector('.preview-container-top') && that.applyValueMode === 'useButtons' && !that.disableUndo) {
            that._applyValue(that.value);
        }
    }

    /**
     * Resets the colorPicker to it's initial value
     */
    _reset(oldValue = this.value) {
        const that = this;

        that._RGBA = { r: 255, g: 255, b: 255, a: 1 };
        that._HSV = { h: 0, s: 0, v: 1 };
        that.$.hueScaleThumb.h = 0;
        that.$.colorPaletteThumb.s = 0;
        that.$.colorPaletteThumb.v = 1;
        that.$.colorPaletteRadialThumb.h = 0;
        that.$.colorPaletteRadialThumb.s = 0;
        that.$.brightnessScaleThumb.v = 1;
        that.$.brightnessScaleThumb.s = 0;

        if (that.displayMode !== 'hexagonal' && that.displayMode !== 'radial' && that.displayMode !== 'palette') {
            that.value = null;

            if (that._selectedItem && that._selectedItem.classList.contains('selected')) {
                that._selectedItem.classList.remove('selected');
                that._selectedItem.removeAttribute('aria-current');
                that._selectedItem.style.stroke = null;
            }
        }
        else {
            that.value = that._getValue(that.valueFormat);
        }

        that._applyValue(that.value);

        that.$.fireEvent('change', {
            'oldValue': oldValue,
            'value': that.value
        });
    }

    /*
    * Handles down on color palette in 'palette' or 'radial' mode
    */
    _handleColorPaletteDown(event) {
        const that = this,
            coord = that._getXYcoordinates(event);

        if (!coord) {
            return;
        }

        const activeThumb = (that.displayMode === 'palette' || that.displayMode === 'grid') ? that.$.colorPaletteThumb : that.$.colorPaletteRadialThumb;

        that._activeComponent = coord.container;

        if (that.displayMode === 'palette' || that.$.container.className.indexOf('custom-color-selection') > -1) {
            activeThumb.s = that._HSV.s = coord.x / coord.container.offsetWidth;
            activeThumb.v = that._HSV.v = 1 - coord.y / coord.container.offsetHeight;

            // When open custom colors in grid mode and click on colorPalette
            if (that.displayMode === 'grid') {
                that._moveThumbHandler(event, true);
                that._applyValueInPaletteMode(event);
                return;
            }
        }
        else if (that.displayMode === 'radial') {
            const diameter = that.$.colorPaletteRadial.offsetWidth,
                dx = coord.x - diameter / 2,
                dy = coord.y - diameter / 2;

            activeThumb.h = that._HSV.h = that._calcHueAngle(dx, dy) < 0 ? 360 + that._calcHueAngle(dx, dy) : that._calcHueAngle(dx, dy);

            const brightnessScaleThumb = that.$.brightnessScaleThumb,
                brightnessScale = that.$.brightnessScale,
                value = that._validateInRange(2 * that._calcSatDistance(dx, dy) / diameter, 0, 1),
                maxScale = brightnessScale.offsetHeight - brightnessScaleThumb.offsetHeight,
                brightness = that._validateInRange(brightnessScaleThumb.offsetTop, 0, maxScale) / maxScale;

            if (that.inverted) {
                activeThumb.v = that._HSV.v = value;
                activeThumb.s = that._HSV.s = 1 - brightness;
            }
            else {
                activeThumb.s = that._HSV.s = value;
                activeThumb.v = that._HSV.v = 1 - brightness;
            }
        }

        that._applyValue(that._HSVtoRGBA(that._HSV), event);
        that._instantUpdate();
    }

    /*
    * Handles down on HUE/Brightness/Alpha scales
    */
    _handleScalesDown(event) {
        const that = this,
            coord = that._getXYcoordinates(event);

        if (!coord) {
            return;
        }

        that._activeComponent = coord.container;

        if (coord.container === that.$.hueScale) {
            that._updateHueScale(coord);
        }
        else if (coord.container === that.$.brightnessScale) {
            that._updateBrightnessScale(coord);

            if (that.displayMode === 'hexagonal') {
                that._generateHoneycomb(that.columnCount, that._HSV);
            }
        }
        else if (that.$.alphaChannelScale) {
            that.$.alphaChannelThumb.a = that._RGBA.a = parseFloat(((coord.container.offsetWidth - coord.x) / coord.container.offsetWidth).toFixed(2));

            if (that.rightToLeft) {
                that.$.alphaChannelThumb.a = that._RGBA.a = (1 - that._RGBA.a).toFixed(2);
            }

            that._applyAlphaValue(that._RGBA.a, 'alphaScale');
        }

        that._applyValue(that._HSVtoRGBA(that._HSV), event);
        that._instantUpdate();
    }

    /**
     * Updates the Brightness Scale
     * @param {any} coord - coordinates Object
     */
    _updateBrightnessScale(coord) {
        const that = this;

        const thumbCenter = coord.y - that.$.brightnessScaleThumb.offsetHeight / 2,
            thumbMaxRange = that.$.brightnessScale.offsetHeight - that.$.brightnessScaleThumb.offsetHeight,
            brightness = Math.min(Math.max(parseFloat(thumbCenter), 0), parseFloat(thumbMaxRange)) / thumbMaxRange;


        if (that.inverted) {
            that.$.brightnessScaleThumb.s = that._HSV.s = 1 - brightness;
        }
        else {
            that.$.brightnessScaleThumb.v = that._HSV.v = 1 - brightness;
        }

        that.$.brightnessScale.setAttribute('aria-valuenow', that._HSV.v);
        that.$.brightnessScaleThumb.style.top = (thumbMaxRange * brightness) + 'px';

        that.$.colorPaletteRadial.style.setProperty('--lw-color-panel-brightness', brightness);
    }

    /**
     * Update the Hue Scale
     * @param {any} coord
     */
    _updateHueScale(coord) {
        const that = this,
            thumbCenter = coord.y - that.$.hueScaleThumb.offsetHeight / 2,
            hueHeight = that.$.hueScale.offsetHeight,
            thumbMaxRange = hueHeight - that.$.hueScaleThumb.offsetHeight;

        that.$.hueScaleThumb.h = that._HSV.h = 360 * (hueHeight - coord.y) / hueHeight;

        that.$.hueScale.setAttribute('aria-valuenow', that.$.hueScaleThumb.h);
        that.$.hueScaleThumb.style.top = (thumbMaxRange * Math.min(Math.max(parseFloat(thumbCenter), 0), parseFloat(thumbMaxRange)) / thumbMaxRange) + 'px';
    }

    /**
     * paletteModeContainer move event handler.
     */
    _paletteModeContainerMoveHandler(event) {
        const that = this;

        if (!LW.Utilities.Core.isMobile) {
            event.stopPropagation();
        }

        if (event.originalEvent.type === 'touchmove' && that._dragDetails) {
            event.originalEvent.preventDefault();
        }
    }

    /*
    * Calculates value, according to the x,y coordinates of pointer related to palette, HUE scale or alpha channel scale
    */
    _moveThumbHandler(event, customColorSelect) {
        const that = this,
            pageX = event.pageX - window.pageXOffset,
            pageY = event.pageY - window.pageYOffset;

        if (that.disabled || that.readonly || !that._activeComponent || !that._dragDetails || (that._dragDetails.x === pageX && that._dragDetails.y === pageY && !customColorSelect)) {
            return;
        }

        const coord = that._getXYcoordinates(event);

        if (!coord) {
            return;
        }

        const containerWidth = that._activeComponent.offsetWidth,
            containerHeight = that._activeComponent.offsetHeight;

        switch (that._activeComponent) {
            case (that.$.colorPalette): {
                that.$.colorPaletteThumb.style.left = 100 * coord.x / containerWidth + '%';
                that.$.colorPaletteThumb.style.top = 100 * coord.y / containerHeight + '%';
                that.$.colorPaletteThumb.s = that._HSV.s = coord.x / containerWidth;
                that.$.colorPaletteThumb.v = that._HSV.v = 1 - coord.y / containerHeight;

                break;
            }
            case (that.$.colorPaletteRadial): {
                const diameter = containerWidth,
                    dx = coord.x - diameter / 2,
                    dy = coord.y - diameter / 2;

                that.$.colorPaletteRadialThumb.h = that._HSV.h = that._calcHueAngle(dx, dy) < 0 ? 360 + that._calcHueAngle(dx, dy) : that._calcHueAngle(dx, dy);

                if (that.inverted) {
                    that.$.colorPaletteRadialThumb.v = that._HSV.v = that._validateInRange(2 * that._calcSatDistance(dx, dy) / diameter, 0, 1);
                }
                else {
                    that.$.colorPaletteRadialThumb.s = that._HSV.s = that._validateInRange(2 * that._calcSatDistance(dx, dy) / diameter, 0, 1);
                }

                const previewContainerBottom = (that.shadowRoot || that).querySelector('.preview-container-bottom');

                if (previewContainerBottom) {
                    previewContainerBottom.style.backgroundColor = that._HSVtoRGBA();
                }

                break;
            }
            case (that.$.hueScale): {
                that._updateHueScale(coord);
                break;
            }
            case (that.$.brightnessScale): {
                that._updateBrightnessScale(coord);

                if (that.displayMode === 'hexagonal') {
                    that._generateHoneycomb(that.columnCount, that.inverted ? { s: that._HSV.s } : { v: that._HSV.v });
                }

                break;
            }
            case (that.$.alphaChannelScale): {
                that.$.alphaChannelThumb.a = that._RGBA.a = parseFloat(((containerWidth - coord.x) / containerWidth).toFixed(2));

                if (that.rightToLeft) {
                    that.$.alphaChannelThumb.a = that._RGBA.a = (1 - that._RGBA.a).toFixed(2);
                }

                break;
            }
        }

        that._applyValue(that._HSVtoRGBA(that._HSV), event);
        that._instantUpdate();
    }

    /*
    * Fires change event and updates value
    */
    _releaseThumbUpHandler() {
        const that = this,
            hasActiveComponent = !!that._activeComponent;

        that._activeComponent = null;

        if (that.disabled || that.readonly || !hasActiveComponent) {
            return;
        }

        if (that._dragDetails && that._dragDetails.isPalettePressed) {
            return;
        }

        that._instantUpdate();
    }

    /*
    * Handles only cancel button click - called from _handleButtonClick
    */
    _handleCancelButtonClick(fireClickEvent) {
        const that = this,
            oldValue = that.value;

        // Unselect selected color
        if (that.displayMode !== 'palette' && that.displayMode !== 'radial' && that.displayMode !== 'hexagonal') {
            that.value = oldValue;
            that._HSV = that._getValue('hsv', that.value) || { h: 1, s: 0, v: 1 };
            that._RGBA = that._getValue('HSVtoRGBAarray', that.value);
        }
        else {
            that._HSV = that._getValue('hsv', that.value) || { h: 1, s: 0, v: 1 };
            that._RGBA = that._getValue('HSVtoRGBAarray', that.value);
            that.value = that._getValue(that.valueFormat);
        }

        that._applyValue(that.value);

        switch (that.displayMode) {
            case 'radial':
                that._generateRadialCanvas();
                break;
            case 'hexagonal':
                that._generateHoneycomb(that.columnCount, that._HSV);
                break;
        }

        if (that.value === null && that._selectedItem && that._selectedItem.classList.contains('selected')) {
            that._selectedItem.classList.remove('selected');
            that._selectedItem.removeAttribute('aria-current');
        }

        if (oldValue !== that.value) {
            that.$.fireEvent('change', {
                'oldValue': oldValue,
                'value': that.value
            });
        }

        if (that.$.container.className.indexOf('custom-color-selection') > -1) {
            that._applyValueInPaletteMode();
        }

        if (fireClickEvent) {
            that.$.fireEvent('cancelButtonClick');
        }

        // Main cancel
        if (that._customColorSelection === false) {
            that._updatePreviewContainerValues(that.value);

            // Unselect selected colors
            const container = that.displayMode === 'hexagonal' ? that.$.colorPaletteHexagonal : that.$.gridModeContainer;
            let selectedColor = container.getElementsByClassName('selected');

            for (let i = 0; i < selectedColor.length; i++) {
                if (selectedColor[i] && (!that.value || !that._equalValues(selectedColor[i].colorCode, that.value))) {
                    selectedColor[i].style.stroke = null;
                    selectedColor[i].classList.remove('selected');
                    selectedColor[i].removeAttribute('aria-current');
                }
            }
        }
        else {
            // Close the palette custom color select
            that.$container.removeClass('custom-color-selection');
            that.$.fireEvent('customColorSelection', { value: false });
        }

        that._customColorSelection = false;
        that._customTempColor = undefined;

        if (that.displayMode === 'palette' || that.displayMode === 'radial') {
            const previewContainerTop = (that.shadowRoot || that).querySelector('.preview-container-top');

            if (previewContainerTop) {
                previewContainerTop.style.backgroundColor = that.value;
            }
        }
    }

    /*
    * Handles only ok button click - called from _handleButtonClick
    */
    _handleOkButtonClick(fireClickEvent) {
        const that = this,
            oldValue = that.value;

        // Main ok - visible only in ApplyValueMode: 'useButtons'
        if ((that._customColorSelection === false) || (typeof that._customColorSelection === 'undefined')) {

            // Add the selected color
            if (that._customTempColor) {
                that._userPalette.unshift(that._customTempColor);
                that._generatePaletteUserColorGrid();
                that._generateNewPalette = false;
                that._customTempColor = '';
            }

            if (that.displayMode !== 'palette' && that.displayMode !== 'radial' && that.displayMode !== 'hexagonal' &&
                (!that._selectedItem || !that._selectedItem.classList.contains('selected'))) {
                that.value = null;
            }
            else {
                that.value = that._getValue(that.valueFormat);
            }

            // If not selected value, or clicked cancel before
            if (that.value === null) {
                if (that.displayMode === 'palette') {
                    //(that._HSVtoRGBA(that._HSV)
                    that._applyValue(that._HSVtoRGBA(that._HSV), event);
                }
                else {
                    // Unselect selected colors
                    let selectedColor = that.$.gridModeContainer.getElementsByClassName('selected');

                    for (let i = 0; i < selectedColor.length; i++) {
                        if (selectedColor[i]) {
                            selectedColor[i].classList.remove('selected');
                            selectedColor[i].removeAttribute('aria-current');
                        }
                    }
                }
            }

            if (oldValue !== that.value) {
                that.$.fireEvent('change', {
                    'oldValue': oldValue,
                    'value': that.value
                });
            }
        }
        else {
            // Palette ok - instantly or use buttons
            const customColor = that._getValue(that.valueFormat);

            if (that.applyValueMode !== 'useButtons') {
                that.value = customColor;
            }

            // Close the palette custom color select
            that._userPalette.unshift(customColor);
            that._generatePaletteUserColorGrid();
            that._customColorSelection = false;

            if (oldValue !== that.value) {
                that.$.fireEvent('change', {
                    'oldValue': oldValue,
                    'value': that.value
                });
            }

            if (fireClickEvent) {
                that.$.fireEvent('okButtonClick', {});
            }

            that.$container.removeClass('custom-color-selection');
            return;
        }

        if (fireClickEvent) {
            that.$.fireEvent('okButtonClick', {});
        }

        that._customColorSelection = false;

        if (that.applyValueMode !== 'useButtons' || that._equalValues(that.value, that._HSVtoRGBA())) {
            return;
        }

        that._updatePreviewContainerValues(that._getValue('rgba'), true);
    }

    /*
    * Handles changes of RGB, HEX, alpha inputs
    */
    _handleInputChange(event) {
        const that = this,
            oldValue = that.value,
            target = event.target;

        if (that.disabled || that.readonly) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const isRGBInput = ['r-channel', 'g-channel', 'b-channel'].find(className => target.className.indexOf(className) > -1),
            isAlphaChannelInput = target.classList.contains('a-channel');

        if (isRGBInput || isAlphaChannelInput) {
            //Validates the value of the Input
            target.value = isRGBInput ? Math.min(255, Math.max(0, target.value)) : Math.min(1, Math.max(0, parseFloat(target.value) || 0));

            that._RGBA = that._getRGBAFromInputs();
            that._HSV = that._getValue('hsv', 'rgba(' + that._RGBA.r + ', ' + that._RGBA.g + ', ' + that._RGBA.b + ', ' + that._RGBA.a + ')');
        }
        else if (target.classList.contains('hex')) {
            const oldValue = that.value ? that._getValue('hex') : null,
                testValue = '#' + target.value;

            if (that._isHEX(testValue)) {
                that._RGBA.a = 1;
                that._applyValue(that.editAlphaChannel ? that._toRGBA(testValue) : that._toHEX(testValue));
            }
            else {
                target.value = oldValue ? oldValue.substring(1) : 'ffffff';
            }
        }

        that._applyValue(that.editAlphaChannel ? that._getValue('rgba') : that._getValue('hex'));

        if (that.applyValueMode === 'useButtons' || that.$.container.className.indexOf('custom-color-selection') > -1) {
            return;
        }

        //that.value = that.editAlphaChannel ? that._getValue('rgba') : that._getValue('hex');
        that.value = that._getValue(that.valueFormat);
        that.$.fireEvent('change', {
            'oldValue': oldValue,
            'value': that.value
        });
    }

    /*
    * Apply the value according to selected grid mode
    */
    _applyValue(value, event) {
        const that = this;

        if ((!value) || (value === null) || value === 'rgba(NaN, NaN, NaN, 1)') {
            that._RGBA = { r: 255, g: 255, b: 255, a: 1 };
            that.$.hiddenInput.value = that.value;
            return;
        }

        that._HSVRGBArefresh(value.trim());

        if (that.displayMode === 'palette' || that.$.container.className.indexOf('custom-color-selection') > -1) {
            that._applyValueInPaletteMode(event);
        }
        else if (that.displayMode === 'radial') {
            that._applyValueInRadialMode(event);
        }
        else if (that.displayMode === 'hexagonal') {
            that._applyValueInHexagonalMode(event);
        }
        else {
            that._applyValueInAnyGridMode(value.trim());
        }

        that._applyAlphaValue(that._RGBA.a);
        that.$.hiddenInput.value = that.value;
    }

    /*
    * Applies allpha value to alpha input, alpha scale, preview box etc.
    * Vendor can be changed value (default option),  alpha scale, alpha input, 
    */
    _applyAlphaValue(value, vendor) {
        const that = this;

        //value = that._toFixed(value);
        value = parseFloat(value);

        if (that.$.alphaChannelScale) {
            if (vendor !== 'alphaScale') {
                const thumbWidth = that.$.alphaChannelThumb.offsetWidth,
                    scaleWidth = that.$.alphaChannelScale.offsetWidth,
                    offset = (((1 - value) * scaleWidth) > thumbWidth) ? ((1 - value) * thumbWidth) : 0;

                that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = ((1 - value) * scaleWidth - offset) + 'px';
            }

            if (vendor !== 'alphaInput') {
                const aInput = that.$.alphaChannelContainer.querySelector('input.a-channel');

                aInput.value = value;
            }

            that.$.alphaChannelScale.setAttribute('aria-valuenow', value);
        }

        that._RGBA.a = value;
        that._updatePreviewContainerValues(that._getValue('rgba'));
    }

    /*
    * Applies the value 'palette' displayMode
    */
    _applyValueInPaletteMode(event) {
        const that = this,
            HEXvalue = that._getValue('hex'),
            scaleHeight = that.$.hueScale.offsetHeight,
            thumbHeight = that.$.hueScaleThumb.offsetHeight,
            hsvYoffsetinPX = that._HSV.h ? (scaleHeight * ((360 - that._HSV.h) / 360)) : 0,
            hexInput = (that.shadowRoot || that).querySelector('input.hex');

        that._setRGBAToInputs();

        if (hexInput) {
            hexInput.value = HEXvalue.substring(1);
        }

        that.$.alphaChannelContainer.style.setProperty('--lw-color-panel-alpha-channel-color', that._rgbArrayToHEX([that._RGBA.r, that._RGBA.g, that._RGBA.b, 1]));

        if (!that._activeComponent) {
            if (that.$.alphaChannelThumb) {
                const thumbWidth = that.$.alphaChannelThumb.offsetWidth,
                    scaleWidth = that.$.alphaChannelScale.offsetWidth,
                    offset = (((1 - that._RGBA.a) * scaleWidth) > thumbWidth) ? ((1 - that._RGBA.a) * thumbWidth) : 0;

                that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = ((1 - that._RGBA.a) * scaleWidth - offset) + 'px';
                that.$.alphaChannelScale.setAttribute('aria-valuenow', that._RGBA.a);
            }

            that.$.hueScaleThumb.style.top = Math.max(0, Math.min(scaleHeight - thumbHeight, hsvYoffsetinPX - thumbHeight / 2)) + 'px';
            that._setPalettePointerXYPosition();
        }

        if (that._activeComponent === that.$.hueScale) {
            that.$.colorPalette.style.backgroundColor = that._rgbaToRGB(that._HSVtoRGBA({ h: that.$.hueScaleThumb.h, s: 1, v: 1 }));
        }

        if (!that._activeComponent || that._activeComponent === that.$.colorPalette) {
            that._setPalettePointerXYPosition(event);
        }

        if (that.event) {
            that._HSV.h = that.$.hueScaleThumb.h;
        }
        else {
            that.$.hueScaleThumb.h = that._HSV.h;
            that.$.colorPalette.style.backgroundColor = that._rgbaToRGB(that._HSVtoRGBA({ h: that._HSV.h, s: 1, v: 1 }));

        }

        that._updatePreviewContainerValues(that._getValue('rgba'));
        that.$.hueScale.setAttribute('aria-valuenow', that.$.hueScaleThumb.h);
    }

    /*
    * Applies the value 'radial' displayMode
    */
    _applyValueInRadialMode(event) {
        const that = this,
            HEXvalue = that._getValue('hex'),
            hexInput = (that.shadowRoot || that).querySelector('input.hex');

        that._setRGBAToInputs();

        if (hexInput) {
            hexInput.value = HEXvalue.substring(1);
        }

        that.$.alphaChannelContainer.style.setProperty('--lw-color-panel-alpha-channel-color', that._rgbArrayToHEX([that._RGBA.r, that._RGBA.g, that._RGBA.b, 1]));

        if (!that._activeComponent) {
            const thumbMaxRange = that.$.brightnessScale.offsetHeight - that.$.brightnessScaleThumb.offsetHeight;

            if (that.$.alphaChannelThumb) {
                const thumbWidth = that.$.alphaChannelThumb.offsetWidth,
                    scaleWidth = that.$.alphaChannelScale.offsetWidth,
                    offset = (((1 - that._RGBA.a) * scaleWidth) > thumbWidth) ? ((1 - that._RGBA.a) * thumbWidth) : 0;

                that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = ((1 - that._RGBA.a) * scaleWidth - offset) + 'px';
                that.$.alphaChannelScale.setAttribute('aria-valuenow', that._RGBA.a);
            }

            const brightness = (that.inverted ? that._HSV.v : 1 - that._HSV.v);

            that.$.brightnessScale.setAttribute('aria-valuenow', that._HSV.v);
            that.$.brightnessScaleThumb.style.top = thumbMaxRange * brightness + 'px';
            that.$.colorPaletteRadial.style.setProperty('--lw-color-panel-brightness', brightness);
        }

        if (!that._activeComponent || that._activeComponent === that.$.colorPaletteRadial) {
            that._setPalettePointerXYPosition(event);
        }

        that._updatePreviewContainerValues(that._getValue('rgba'));

        if (that.inverted) {
            const color1 = that.value === null ? 'black' : that._HSVtoRGBA({ h: that._HSV.h, s: 1, v: that._HSV.v });

            that.$.brightnessScale.style.backgroundImage = 'linear-gradient(' + color1 + ', white)';
        }
        else {
            const color1 = that.value === null ? 'white' : that._HSVtoRGBA({ h: that._HSV.h, s: that._HSV.s, v: 1 });

            that.$.brightnessScale.style.backgroundImage = 'linear-gradient(' + color1 + ', black)';
        }
    }

    /*
    * Applies the value 'PaletteHexagonal' displayMode. To be renamed as 'hexagonal' mode later, and old hexagonal to be removed
    */
    _applyValueInHexagonalMode() {
        const that = this,
            HEXvalue = that._getValue('hex'),
            hexInput = (that.shadowRoot || that).querySelector('input.hex');

        that._setRGBAToInputs();

        if (hexInput) {
            hexInput.value = HEXvalue ? HEXvalue.substring(1) : null;
        }

        that.$.alphaChannelContainer.style.setProperty('--lw-color-panel-alpha-channel-color', that._rgbArrayToHEX([that._RGBA.r, that._RGBA.g, that._RGBA.b, 1]));

        if (!that._activeComponent && !that._targetItem) {
            const thumbMaxRange = that.$.brightnessScale.offsetHeight - that.$.brightnessScaleThumb.offsetHeight;

            if (that.$.alphaChannelThumb) {
                const thumbWidth = that.$.alphaChannelThumb.offsetWidth,
                    scaleWidth = that.$.alphaChannelScale.offsetWidth,
                    offset = (((1 - that._RGBA.a) * scaleWidth) > thumbWidth) ? ((1 - that._RGBA.a) * thumbWidth) : 0;

                that.$.alphaChannelThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
                that.$.alphaChannelThumb.style[that.rightToLeft ? 'right' : 'left'] = ((1 - that._RGBA.a) * scaleWidth - offset) + 'px';
                that.$.alphaChannelScale.setAttribute('aria-valuenow', that._RGBA.a);
            }

            const brightness = that.inverted ? that._HSV.v : 1 - that._HSV.v;

            that.$.brightnessScale.setAttribute('aria-valuenow', that._HSV.v);
            that.$.brightnessScaleThumb.style.top = thumbMaxRange * brightness + 'px';
        }

        const rgbaTempValue = that._getValue('rgba');

        that._updatePreviewContainerValues(rgbaTempValue ? rgbaTempValue : that._getValue('hex'));

        if (that.inverted) {
            const color1 = that._HSVtoRGBA({ h: that._HSV.h, s: 1, v: that._HSV.v }, 1);
            that.$.brightnessScale.style.backgroundImage = 'linear-gradient(' + color1 + ', white)';
        }
        else {
            const color1 = that._HSVtoRGBA({ h: that._HSV.h, s: that._HSV.s, v: 1 }, 1);
            that.$.brightnessScale.style.backgroundImage = 'linear-gradient(' + color1 + ', black)';
        }

        that._applyValueInAnyGridMode(HEXvalue, that.$.colorPaletteHexagonal);//
    }

    /*
    * Calculates position of the thumb, according to the given center of the circle(x,y) angle and distance from the center
    */
    _radialThumbPoint(x, y, angle, distance) {
        const point = {
            x: Math.round(Math.cos(angle * Math.PI / 180) * distance * x + x),
            y: Math.round(Math.sin(angle * Math.PI / 180) * distance * x + y)
        };

        return point;
    }

    /*
    * Updates preview containers background, according to current color/tempColor
    */
    _updatePreviewContainerValues(newValue, okClick) {
        const that = this,
            previewContainer = (that.shadowRoot || that).querySelector('.preview-container');

        if (!previewContainer) {
            return;
        }

        //Top preview Container
        if (that.applyValueMode === 'instantly' || okClick) {
            previewContainer.firstElementChild.style.backgroundColor = newValue;
        }

        //Bottom Preview Container
        previewContainer.lastElementChild.style.backgroundColor = newValue;
    }

    /*
    * Gets all color containers in current grid mode(grid, hexagonal, default, spectrumGrid); Compares 
    */
    _applyValueInAnyGridMode(value, container) {
        const that = this;

        if (!value && value !== null) {
            return;
        }

        if (!container) {
            switch (that.displayMode) {
                case 'default':
                    container = that.$.defaultSamplesContainer;
                    break;
                case 'grid':
                    container = that.$.gridSamplesContainer;
                    break;
                case 'materialGrid':
                    container = that.$.materialGridSamplesContainer;
                    break;
                case 'spectrumGrid':
                    container = that.$.spectrumGridSamplesContainer;
                    break;
                default:
                    container = that.$.gridModeContainer;
                    break;
            }
        }

        if (!container) {
            return;
        }

        const samples = Array.from(container.getElementsByClassName('color-sample'));
        let match = that._targetItem;

        //Find match by colorCode
        if (match === undefined || match === null) {
            for (let i = 0; i < samples.length; i++) {
                const item = samples[i];

                if (that._equalValues(item.colorCode, value)) {
                    match = samples[i];
                    break;
                }
            }
        }

        //Bugfix for grid mode when click custom color and slide hue scale
        if (that.$.container.className.indexOf('custom-color-selection') > -1 && that._HSV.h) {
            that._applyValueInPaletteMode();
        }

        that._changeSampleSelection(match);
    }

    /*
    * Generates palette grid, according to the chosen palette type
    */
    _generatePaletteGrid() {
        const that = this;

        if (!that.$.gridSamplesContainer) {
            return;
        }

        const palette = that['_' + that.palette + 'Palette'];
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < palette.length; i++) {
            const colorSample = document.createElement('span'),
                colorCode = palette[i];

            colorSample.setAttribute('role', 'menuitem');
            colorSample.setAttribute('aria-label', colorCode);

            colorSample.className = 'color-sample';
            colorSample.colorCode = colorCode;
            colorSample.style.backgroundColor = colorCode;

            if (that._toRGBA(colorCode) === 'rgba(255, 255, 255, 0)' || that._toHEX(that._toRGBA(colorCode)) === '#FFFFFF00' || colorCode === 'transparent') {
                colorSample.setAttribute('transparent', '');
            }
            else {
                colorSample.removeAttribute('transparent');
            }

            fragment.appendChild(colorSample);
        }

        that.$.gridSamplesContainer.setAttribute('role', 'menu');
        that.$.gridSamplesContainer.innerHTML = '';
        that.$.gridSamplesContainer.appendChild(fragment);
    }

    /*
    * Generates palette grid, according to the chosen user colors (to be commbined with _generatePaletteGrid function)
    */
    _generatePaletteUserColorGrid(noSelection) {
        const that = this;

        if (!that.$.userSamplesContainer) {
            return;
        }

        if (!that._userPalette || !that._userPalette.length) {
            that.$.userSamplesContainer.innerHTML = '';
            return;
        }

        let palette = that._userPalette.filter(v => v !== '').slice(0, that.columnCount || 1),
            fragment = document.createDocumentFragment();
        let newColor;

        palette = [...new Set(palette)];

        for (let i = 0; i < palette.length; i++) {
            if (palette[i]) {
                const colorItem = that._createColorSample(palette[i], 'user-color');

                fragment.appendChild(colorItem);

                if (!newColor) {
                    newColor = colorItem;
                }
            }
        }

        that.$.userSamplesContainer.innerHTML = '';
        that.$.userSamplesContainer.appendChild(fragment);
        that.$.userSamplesContainer.setAttribute('role', 'menu');

        if (!noSelection && newColor && newColor.colorCode) {
            that._changeSampleSelection(newColor);
        }

        that.paletteCustomColors = that._userPalette.slice(0);
    }

    /*
    * Generates palette grid, according to the chosen palette type
    */
    _initializeBaseVars() {
        const that = this;

        if (that._RGBA !== undefined) {
            return;
        }

        that._RGBA = { r: 255, g: 255, b: 255, a: 1 };
        that._HSV = { h: 0, s: 0, v: 1 };
        that.$.hueScaleThumb.h = 0;
        that.$.colorPaletteThumb.s = 0;
        that.$.colorPaletteThumb.v = 1;
        that.$.colorPaletteRadialThumb.h = 0;
        that.$.colorPaletteRadialThumb.s = 0;

        that._defaultPalette = [ // Palettes names to be updated according to the latest displayMode settings/options/etc.
            'rgba(255, 255, 255, 0)', 'rgb(0, 0, 0)', 'rgb(153, 51, 0)', 'rgb(51, 51, 0)', 'rgb(0, 51, 0)', 'rgb(0, 51, 102)',
            'rgb(0, 0, 128)', 'rgb(51, 51, 153)', 'rgb(51, 51, 51)', 'rgb(128, 0, 0)', 'rgb(255, 102, 0)',
            'rgb(128, 128, 0)', 'rgb(0, 128, 0)', 'rgb(0, 128, 128)', 'rgb(0, 0, 255)', 'rgb(102, 102, 153)',
            'rgb(128, 128, 128)', 'rgb(255, 0, 0)', 'rgb(255, 153, 0)', 'rgb(153, 204, 0)', 'rgb(51, 153, 102)',
            'rgb(51, 204, 204)', 'rgb(51, 102, 255)', 'rgb(128, 0, 128)', 'rgb(153, 153, 153)', 'rgb(255, 0, 255)',
            'rgb(255, 204, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(0, 204, 255)',
            'rgb(153, 51, 102)', 'rgb(192, 192, 192)', 'rgb(255, 153, 204)', 'rgb(255, 204, 153)', 'rgb(255, 255, 153)',
            'rgb(204, 255, 204)', 'rgb(204, 255, 255)', 'rgb(153, 204, 255)', 'rgb(204, 153, 255)', 'rgb(255, 255, 255)'
        ];

        that._grayPalette = that._generateShades(40, 'gray');
        that._redPalette = that._generateShades(40, 'red');
        that._greenPalette = that._generateShades(40, 'green');
        that._bluePalette = that._generateShades(40, 'blue');

        that._customPalette = that._mapDataSourceToPalette();
        that._userPalette = that.paletteCustomColors || [];
        that._colorPalette = {};

        that._cssColorNamesHEX = {
            'aliceblue': '#f0f8ff',
            'antiquewhite': '#faebd7',
            'aqua': '#00ffff',
            'aquamarine': '#7fffd4',
            'azure': '#f0ffff',
            'beige': '#f5f5dc',
            'bisque': '#ffe4c4',
            'black': '#000000',
            'blanchedalmond': '#ffebcd',
            'blue': '#0000ff',
            'blueviolet': '#8a2be2',
            'brown': '#a52a2a',
            'burlywood': '#deb887',
            'cadetblue': '#5f9ea0',
            'chartreuse': '#7fff00',
            'chocolate': '#d2691e',
            'coral': '#ff7f50',
            'cornflowerblue': '#6495ed',
            'cornsilk': '#fff8dc',
            'crimson': '#dc143c',
            'cyan': '#00ffff',
            'darkblue': '#00008b',
            'darkcyan': '#008b8b',
            'darkgoldenrod': '#b8860b',
            'darkgray': '#a9a9a9',
            'darkgreen': '#006400',
            'darkkhaki': '#bdb76b',
            'darkmagenta': '#8b008b',
            'darkolivegreen': '#556b2f',
            'darkorange': '#ff8c00',
            'darkorchid': '#9932cc',
            'darkred': '#8b0000',
            'darksalmon': '#e9967a',
            'darkseagreen': '#8fbc8f',
            'darkslateblue': '#483d8b',
            'darkslategray': '#2f4f4f',
            'darkturquoise': '#00ced1',
            'darkviolet': '#9400d3',
            'deeppink': '#ff1493',
            'deepskyblue': '#00bfff',
            'dimgray': '#696969',
            'dodgerblue': '#1e90ff',
            'firebrick': '#b22222',
            'floralwhite': '#fffaf0',
            'forestgreen': '#228b22',
            'fuchsia': '#ff00ff',
            'gainsboro': '#dcdcdc',
            'ghostwhite': '#f8f8ff',
            'gold': '#ffd700',
            'goldenrod': '#daa520',
            'gray': '#808080',
            'green': '#008000',
            'greenyellow': '#adff2f',
            'honeydew': '#f0fff0',
            'hotpink': '#ff69b4',
            'indianred ': '#cd5c5c',
            'indigo': '#4b0082',
            'ivory': '#fffff0',
            'khaki': '#f0e68c',
            'lavender': '#e6e6fa',
            'lavenderblush': '#fff0f5',
            'lawngreen': '#7cfc00',
            'lemonchiffon': '#fffacd',
            'lightblue': '#add8e6',
            'lightcoral': '#f08080',
            'lightcyan': '#e0ffff',
            'lightgoldenrodyellow': '#fafad2',
            'lightgrey': '#d3d3d3',
            'lightgreen': '#90ee90',
            'lightpink': '#ffb6c1',
            'lightsalmon': '#ffa07a',
            'lightseagreen': '#20b2aa',
            'lightskyblue': '#87cefa',
            'lightslategray': '#778899',
            'lightsteelblue': '#b0c4de',
            'lightyellow': '#ffffe0',
            'lime': '#00ff00',
            'limegreen': '#32cd32',
            'linen': '#faf0e6',
            'magenta': '#ff00ff',
            'maroon': '#800000',
            'mediumaquamarine': '#66cdaa',
            'mediumblue': '#0000cd',
            'mediumorchid': '#ba55d3',
            'mediumpurple': '#9370d8',
            'mediumseagreen': '#3cb371',
            'mediumslateblue': '#7b68ee',
            'mediumspringgreen': '#00fa9a',
            'mediumturquoise': '#48d1cc',
            'mediumvioletred': '#c71585',
            'midnightblue': '#191970',
            'mintcream': '#f5fffa',
            'mistyrose': '#ffe4e1',
            'moccasin': '#ffe4b5',
            'navajowhite': '#ffdead',
            'navy': '#000080',
            'oldlace': '#fdf5e6',
            'olive': '#808000',
            'olivedrab': '#6b8e23',
            'orange': '#ffa500',
            'orangered': '#ff4500',
            'orchid': '#da70d6',
            'palegoldenrod': '#eee8aa',
            'palegreen': '#98fb98',
            'paleturquoise': '#afeeee',
            'palevioletred': '#d87093',
            'papayawhip': '#ffefd5',
            'peachpuff': '#ffdab9',
            'peru': '#cd853f',
            'pink': '#ffc0cb',
            'plum': '#dda0dd',
            'powderblue': '#b0e0e6',
            'purple': '#800080',
            'rebeccapurple': '#663399',
            'red': '#ff0000',
            'rosybrown': '#bc8f8f',
            'royalblue': '#4169e1',
            'saddlebrown': '#8b4513',
            'salmon': '#fa8072',
            'sandybrown': '#f4a460',
            'seagreen': '#2e8b57',
            'seashell': '#fff5ee',
            'sienna': '#a0522d',
            'silver': '#c0c0c0',
            'skyblue': '#87ceeb',
            'slateblue': '#6a5acd',
            'slategray': '#708090',
            'snow': '#fffafa',
            'springgreen': '#00ff7f',
            'steelblue': '#4682b4',
            'tan': '#d2b48c',
            'teal': '#008080',
            'thistle': '#d8bfd8',
            'tomato': '#ff6347',
            'turquoise': '#40e0d0',
            'violet': '#ee82ee',
            'wheat': '#f5deb3',
            'white': '#ffffff',
            'whitesmoke': '#f5f5f5',
            'yellow': '#ffff00',
            'yellowgreen': '#9acd32'
        };

        that._defaultModeThemeColors = that.gridThemeColors === null ?
            ['#FFFFFF', '#000000', '#E6E6E6', '#495469', '#5671C2', '#D48439', '#A5A5A5', '#EEC328', '#7399D3', '#85AA4C'] : that.gridThemeColors;

        that._defaultModeStandardColors = that.gridStandardColors === null ?
            ['#A52A0D', '#DB3A15', '#EEC328', '#FEFE33', '#A6CD57', '#62AC54', '#65ADEE', '#3F6FBE', '#10205F', '#64379E'] : that.gridStandardColors;

        that._defaultModeShadesColors = that.gridShadeColors === null ? [
            '#F2F2F2', '#808080', '#D0CECE', '#D6DCE4', '#DDEBF7', '#FCE4D6', '#EBEBEB', '#FFF2CC', '#DDE5F7', '#E2EFDA',
            '#D8D8D8', '#595959', '#AEAAAA', '#ACB9CA', '#BDD7EE', '#F6CAAD', '#DBDBDB', '#FFE699', '#B4C6E7', '#C6E0B4',
            '#BFBFBF', '#404040', '#757171', '#8497B0', '#9BC2E6', '#F4B084', '#C0C0C0', '#FFD966', '#8EA9DB', '#A9D08E',
            '#A6A6A6', '#262626', '#312F2F', '#333F4F', '#2F75B5', '#C65911', '#7B7B7B', '#BF8F00', '#305496', '#548235',
            '#808080', '#0D0D0D', '#161616', '#222B35', '#1F4E78', '#833C0C', '#525252', '#806000', '#203764', '#375623'
        ] : that.gridShadeColors;

        that._materialColors = {
            'Red': { '50': 'rgb(255, 235, 238)', '100': 'rgb(255, 205, 210)', '200': 'rgb(239, 154, 154)', '300': 'rgb(229, 115, 115)', '400': 'rgb(239, 83, 80)', '500': 'rgb(244, 67, 54)', '600': 'rgb(229, 57, 53)', '700': 'rgb(211, 47, 47)', '800': 'rgb(198, 40, 40)', '900': 'rgb(183, 28, 28)', 'A 100': 'rgb(255, 138, 128)', 'A 200': 'rgb(255, 82, 82)', 'A 400': 'rgb(255, 23, 68)', 'A 700': 'rgb(213, 0, 0)' },
            'Pink': { '50': 'rgb(252, 228, 236)', '100': 'rgb(248, 187, 208)', '200': 'rgb(244, 143, 177)', '300': 'rgb(240, 98, 146)', '400': 'rgb(236, 64, 122)', '500': 'rgb(233, 30, 99)', '600': 'rgb(216, 27, 96)', '700': 'rgb(194, 24, 91)', '800': 'rgb(173, 20, 87)', '900': 'rgb(136, 14, 79)', 'A 100': 'rgb(255, 128, 171)', 'A 200': 'rgb(255, 64, 129)', 'A 400': 'rgb(245, 0, 87)', 'A 700': 'rgb(197, 17, 98)' },
            'Purple': { '50': 'rgb(243, 229, 245)', '100': 'rgb(225, 190, 231)', '200': 'rgb(206, 147, 216)', '300': 'rgb(186, 104, 200)', '400': 'rgb(171, 71, 188)', '500': 'rgb(156, 39, 176)', '600': 'rgb(142, 36, 170)', '700': 'rgb(123, 31, 162)', '800': 'rgb(106, 27, 154)', '900': 'rgb(74, 20, 140)', 'A 100': 'rgb(234, 128, 252)', 'A 200': 'rgb(224, 64, 251)', 'A 400': 'rgb(213, 0, 249)', 'A 700': 'rgb(170, 0, 255)' },
            'Deep Purple': { '50': 'rgb(237, 231, 246)', '100': 'rgb(209, 196, 233)', '200': 'rgb(179, 157, 219)', '300': 'rgb(149, 117, 205)', '400': 'rgb(126, 87, 194)', '500': 'rgb(103, 58, 183)', '600': 'rgb(94, 53, 177)', '700': 'rgb(81, 45, 168)', '800': 'rgb(69, 39, 160)', '900': 'rgb(49, 27, 146)', 'A 100': 'rgb(179, 136, 255)', 'A 200': 'rgb(124, 77, 255)', 'A 400': 'rgb(101, 31, 255)', 'A 700': 'rgb(98, 0, 234)' },
            'Indigo': { '50': 'rgb(232, 234, 246)', '100': 'rgb(197, 202, 233)', '200': 'rgb(159, 168, 218)', '300': 'rgb(121, 134, 203)', '400': 'rgb(92, 107, 192)', '500': 'rgb(63, 81, 181)', '600': 'rgb(57, 73, 171)', '700': 'rgb(48, 63, 159)', '800': 'rgb(40, 53, 147)', '900': 'rgb(26, 35, 126)', 'A 100': 'rgb(140, 158, 255)', 'A 200': 'rgb(83, 109, 254)', 'A 400': 'rgb(61, 90, 254)', 'A 700': 'rgb(48, 79, 254)' },
            'Blue': { '50': 'rgb(227, 242, 253)', '100': 'rgb(187, 222, 251)', '200': 'rgb(144, 202, 249)', '300': 'rgb(100, 181, 246)', '400': 'rgb(66, 165, 245)', '500': 'rgb(33, 150, 243)', '600': 'rgb(30, 136, 229)', '700': 'rgb(25, 118, 210)', '800': 'rgb(21, 101, 192)', '900': 'rgb(13, 71, 161)', 'A 100': 'rgb(130, 177, 255)', 'A 200': 'rgb(68, 138, 255)', 'A 400': 'rgb(41, 121, 255)', 'A 700': 'rgb(41, 98, 255)' },
            'Light Blue': { '50': 'rgb(225, 245, 254)', '100': 'rgb(179, 229, 252)', '200': 'rgb(129, 212, 250)', '300': 'rgb(79, 195, 247)', '400': 'rgb(41, 182, 246)', '500': 'rgb(3, 169, 244)', '600': 'rgb(3, 155, 229)', '700': 'rgb(2, 136, 209)', '800': 'rgb(2, 119, 189)', '900': 'rgb(1, 87, 155)', 'A 100': 'rgb(128, 216, 255)', 'A 200': 'rgb(64, 196, 255)', 'A 400': 'rgb(0, 176, 255)', 'A 700': 'rgb(0, 145, 234)' },
            'Cyan': { '50': 'rgb(224, 247, 250)', '100': 'rgb(178, 235, 242)', '200': 'rgb(128, 222, 234)', '300': 'rgb(77, 208, 225)', '400': 'rgb(38, 198, 218)', '500': 'rgb(0, 188, 212)', '600': 'rgb(0, 172, 193)', '700': 'rgb(0, 151, 167)', '800': 'rgb(0, 131, 143)', '900': 'rgb(0, 96, 100)', 'A 100': 'rgb(132, 255, 255)', 'A 200': 'rgb(24, 255, 255)', 'A 400': 'rgb(0, 229, 255)', 'A 700': 'rgb(0, 184, 212)' },
            'Teal': { '50': 'rgb(224, 242, 241)', '100': 'rgb(178, 223, 219)', '200': 'rgb(128, 203, 196)', '300': 'rgb(77, 182, 172)', '400': 'rgb(38, 166, 154)', '500': 'rgb(0, 150, 136)', '600': 'rgb(0, 137, 123)', '700': 'rgb(0, 121, 107)', '800': 'rgb(0, 105, 92)', '900': 'rgb(0, 77, 64)', 'A 100': 'rgb(167, 255, 235)', 'A 200': 'rgb(100, 255, 218)', 'A 400': 'rgb(29, 233, 182)', 'A 700': 'rgb(0, 191, 165)' },
            'Green': { '50': 'rgb(232, 245, 233)', '100': 'rgb(200, 230, 201)', '200': 'rgb(165, 214, 167)', '300': 'rgb(129, 199, 132)', '400': 'rgb(102, 187, 106)', '500': 'rgb(76, 175, 80)', '600': 'rgb(67, 160, 71)', '700': 'rgb(56, 142, 60)', '800': 'rgb(46, 125, 50)', '900': 'rgb(27, 94, 32)', 'A 100': 'rgb(185, 246, 202)', 'A 200': 'rgb(105, 240, 174)', 'A 400': 'rgb(0, 230, 118)', 'A 700': 'rgb(0, 200, 83)' },
            'Light Green': { '50': 'rgb(241, 248, 233)', '100': 'rgb(220, 237, 200)', '200': 'rgb(197, 225, 165)', '300': 'rgb(174, 213, 129)', '400': 'rgb(156, 204, 101)', '500': 'rgb(139, 195, 74)', '600': 'rgb(124, 179, 66)', '700': 'rgb(104, 159, 56)', '800': 'rgb(85,139,47)', '900': 'rgb(51,105,30)', 'A 100': 'rgb(204,255,144)', 'A 200': 'rgb(178,255,89)', 'A 400': 'rgb(118,255,3)', 'A 700': 'rgb(100, 221, 23)' },
            'Lime': { '50': 'rgb(249, 251, 231)', '100': 'rgb(255, 249, 196)', '200': 'rgb(255, 245, 157)', '300': 'rgb(255, 241, 118)', '400': 'rgb(255, 238, 88)', '500': 'rgb(255, 235, 59)', '600': 'rgb(253, 216, 53)', '700': 'rgb(251, 192, 45)', '800': 'rgb(249, 168, 37)', '900': 'rgb(245, 127, 23)', 'A 100': 'rgb(244, 255, 129)', 'A 200': 'rgb(238, 255, 65)', 'A 400': 'rgb(198, 255, 0)', 'A 700': 'rgb(174, 234, 0)' },
            'Yellow': { '50': 'rgb(255, 253, 231)', '100': 'rgb(255, 249, 196)', '200': 'rgb(255, 245, 157)', '300': 'rgb(255, 241, 118)', '400': 'rgb(255, 238, 88)', '500': 'rgb(255, 235, 59)', '600': 'rgb(253, 216, 53)', '700': 'rgb(251, 192, 45)', '800': 'rgb(249, 168, 37)', '900': 'rgb(245, 127, 23)', 'A 100': 'rgb(255, 255, 141)', 'A 200': 'rgb(255, 255, 0)', 'A 400': 'rgb(255, 234, 0)', 'A 700': 'rgb(255, 214, 0)' },
            'Amber': { '50': 'rgb(255, 248, 225)', '100': 'rgb(255, 236, 179)', '200': 'rgb(255, 224, 130)', '300': 'rgb(255, 213, 79)', '400': 'rgb(255, 202, 40)', '500': 'rgb(255, 193, 7)', '600': 'rgb(255, 179, 0)', '700': 'rgb(255, 160, 0)', '800': 'rgb(255, 143, 0)', '900': 'rgb(255, 111, 0)', 'A 100': 'rgb(255, 229, 127)', 'A 200': 'rgb(255, 215, 64)', 'A 400': 'rgb(255, 196, 0)', 'A 700': 'rgb(255, 171, 0)' },
            'Orange': { '50': 'rgb(255, 243, 224)', '100': 'rgb(255, 224, 178)', '200': 'rgb(255, 204, 128)', '300': 'rgb(255, 183, 77)', '400': 'rgb(255, 167, 38)', '500': 'rgb(255, 152, 0)', '600': 'rgb(251, 140, 0)', '700': 'rgb(245, 124, 0)', '800': 'rgb(239, 108, 0)', '900': 'rgb(230, 81, 0)', 'A 100': 'rgb(255, 209, 128)', 'A 200': 'rgb(255, 171, 64)', 'A 400': 'rgb(255, 145, 0)', 'A 700': 'rgb(255, 109, 0)' },
            'Deep Orange': { '50': 'rgb(251, 233, 231)', '100': 'rgb(255, 204, 188)', '200': 'rgb(255, 171, 145)', '300': 'rgb(255, 138, 101)', '400': 'rgb(255, 112, 67)', '500': 'rgb(255, 87, 34)', '600': 'rgb(244, 81, 30)', '700': 'rgb(230, 74, 25)', '800': 'rgb(216, 67, 21)', '900': 'rgb(191, 54, 12)', 'A 100': 'rgb(255, 158, 128)', 'A 200': 'rgb(255, 110, 64)', 'A 400': 'rgb(255, 61, 0)', 'A 700': 'rgb(221, 44, 0)' },
            'Brown': { '50': 'rgb(239, 235, 233)', '100': 'rgb(215, 204, 200)', '200': 'rgb(188, 170, 164)', '300': 'rgb(161, 136, 127)', '400': 'rgb(141, 110, 99)', '500': 'rgb(121, 85, 72)', '600': 'rgb(109, 76, 65)', '700': 'rgb(93, 64, 55)', '800': 'rgb(78, 52, 46)', '900': 'rgb(62, 39, 35)', 'A 100': '', 'A 200': '', 'A 400': '', 'A 700': '' },
            'Grey': { '50': 'rgb(250, 250, 250)', '100': 'rgb(245, 245, 245)', '200': 'rgb(238, 238, 238)', '300': 'rgb(224, 224, 224)', '400': 'rgb(189, 189, 189)', '500': 'rgb(158, 158, 158)', '600': 'rgb(117, 117, 117)', '700': 'rgb(97, 97, 97)', '800': 'rgb(66, 66, 66)', '900': 'rgb(33, 33, 33)', 'A 100': '', 'A 200': '', 'A 400': '', 'A 700': '' },
            'Blue Grey': { '50': 'rgb(236, 239, 241)', '100': 'rgb(207, 216, 220)', '200': 'rgb(176, 190, 197)', '300': 'rgb(144, 164, 174)', '400': 'rgb(120, 144, 156)', '500': 'rgb(96, 125, 139)', '600': 'rgb(84, 110, 122)', '700': 'rgb(69, 90, 100)', '800': 'rgb(55, 71, 79)', '900': 'rgb(38, 50, 56)', 'A 100': '', 'A 200': '', 'A 400': '', 'A 700': '' }
        };
    }

    /*
    * Return color palett regarding to users color settings in dataSource property
    */
    _mapDataSourceToPalette() {
        const that = this;
        let customPalette = [];

        if (!that.paletteColors || !Array.isArray(that.paletteColors) || that.paletteColors.length === 0) {
            return [];
        }

        for (let i = 0; i < that.paletteColors.length; i++) {
            let item = that.paletteColors[i];

            if (typeof item === 'object' && (item[that.valueMember] && typeof item[that.valueMember] === 'string')) {
                item = item[that.valueMember];
            }

            item += '';

            if (that._isValidColor(item)) {
                customPalette.push(item);
            }
        }

        return customPalette;
    }

    /*
    * Handles click on color sample, regarding to the settings of "applyValueMode" property
    */
    _handleSampleClick(event) {
        const that = this,
            item = event.target,
            oldValue = that.value;
        let itemColor = item.colorCode;

        if (that.displayMode === 'hexagonal') {
            itemColor = that._HSVtoRGBA({ h: item.h, s: item.s, v: item.v }, that._RGBA.a);

            if (that._hexagonItems.indexOf(item) > -1) {
                that._HSV.h = item.h;

                if (that.inverted) {
                    that._HSV.s = item.s;
                    that._HSV.v = item.v;
                }
                else {
                    that._HSV.s = item.s
                    that._HSV.v = item.v;
                }

                that._targetItem = item;
                that._applyValue(that._HSVtoRGBA(that._HSV), event);
                //that._instantUpdate();
                delete that._targetItem;
            }
        }
        else {
            that._changeSampleSelection(item);
        }

        that._HSVRGBArefresh(item.classList.contains('selected') ? itemColor : null);

        if (that.applyValueMode !== 'instantly') {
            return;
        }

        that.$.hiddenInput.value = that.value = that._getValue(that.valueFormat, item.classList.contains('selected') ? itemColor : null);

        //that._updatePreviewContainerValues(that.value);

        if (that.value !== oldValue) {
            that.$.fireEvent('change', {
                'oldValue': oldValue,
                'value': that.value
            });
        }
    }

    /*
    * Check if selected color is any of the 
    */
    _changeSampleSelection(item) {
        const that = this;

        if (that._selectedItem && that.displayMode !== 'radial' && that.displayMode !== 'hexagonal' && (!item || (that._selectedItem === item && item.classList.contains('selected')))) {
            return;
        }

        if (!item) {
            return;
        }

        const strokeColor = that._getContrastColor(that._rgbaToHEX(that._toRGBA(item.colorCode))),
            svg = item.closest('svg');

        Array.from((that.shadowRoot || that).querySelectorAll('.selected')).forEach(item => {
            item.classList.remove('selected');
            item.removeAttribute('aria-current');
            item.style.stroke = null;
        });

        item.classList.add('selected');
        item.setAttribute('aria-current', true);
        that._selectedItem = item;

        if (svg) {
            item.style.stroke = strokeColor;
            svg.appendChild(item);
        }

        return true;
    }

    /**
     * Returns a contrasting color of the target color
     * @param {any} color
     */
    _getContrastColor(color) {
        if (color === undefined) {
            return undefined;
        }

        function hexToRgb(h, e, x) {
            return [parseInt(h, 16), parseInt(e, 16), parseInt(x, 16)];
        }

        let rgb = hexToRgb(color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)),
            luminance = (0.299 * rgb[0] + 0.61 * rgb[1] + 0.114 * rgb[2]) / 255;

        if (luminance > 0.6) {
            return '#000000';
        }
        else {
            return '#FFFFFF';
        }
    }

    /*
    * Gets x, y cusrsor coordinates, according to active element
    */
    _getXYcoordinates(event) {
        if (!event) {
            return;
        }

        const that = this,
            target = that._activeComponent || (event.originalEvent || event).target;

        if (!target.closest) {
            return;
        }

        const parent = target.closest('.color-palette') || target.closest('.color-palette-radial') || target.closest('.hue-scale') || target.closest('.brightness-scale') || target.closest('.alpha-channel-scale');

        if (!parent || that.disabled || that.readonly) {
            return;
        }

        const parentRect = parent.getBoundingClientRect();
        let offsetX = event.pageX - window.pageXOffset - parentRect.left,
            offsetY = event.pageY - window.pageYOffset - parentRect.top;

        if (offsetX < 0) {
            offsetX = 0;
        }
        else if (offsetX > parent.offsetWidth) {
            offsetX = parent.offsetWidth;
        }

        if (offsetY < 0) {
            offsetY = 0;
        }
        else if (offsetY > parent.offsetHeight) {
            offsetY = parent.offsetHeight;
        }

        return { x: offsetX, y: offsetY, container: parent };
    }

    /*
    * Updates input's value via mouse wheel
    */
    _inputWheelHandler(event) {
        const that = this,
            oldValue = that.value,
            target = event.target;

        if (!(event.target instanceof HTMLInputElement) || event.target.classList.contains('hex')) {
            return;
        }

        event.preventDefault();

        let value;

        if (target.classList.contains('a-channel')) {
            value = parseFloat(target.value) || 0;
            value = event.deltaY < 0 ? value + 0.01 : value - 0.01;
            target.value = that._toFixed(that._validateInRange(value, 0, 1));
            that._RGBA = that._getRGBAFromInputs();
            that._applyAlphaValue(that._RGBA.a, 'alphaInput');
        }
        else {
            value = parseInt(target.value) || 0;
            value = event.deltaY < 0 ? value + 1 : value - 1;
            target.value = that._validateInRange(value, 0, 255);
            that._RGBA = that._getRGBAFromInputs();
            that._HSV = that._getValue('hsv', 'rgba(' + that._RGBA.r + ', ' + that._RGBA.g + ', ' + that._RGBA.b + ', ' + that._RGBA.a + ')');
        }

        that._updatePreviewContainerValues(that._getValue(that.valueFormat));
        that._setPalettePointerXYPosition();

        if (that.applyValueMode === 'useButtons') {
            if (that.displayMode === 'palette') {
                that._applyValueInPaletteMode();
            }
            else if (that.displayMode === 'radial') {
                that._applyValueInRadialMode();
            }
            else if (that.displayMode === 'hexagonal') {
                that._generateHoneycomb(that.columnCount, that._HSV);
            }
        }

        if (that.$.container.className.indexOf('custom-color-selection') > -1) {
            that._applyValue(that._HSVtoRGBA(that._HSV));
            return;
        }

        if (that.applyValueMode === 'useButtons') {
            return;
        }

        that.value = that._getValue(that.valueFormat);
        that._applyValue(that.value, event);
        that.$.fireEvent('change', {
            'oldValue': oldValue,
            'value': that.value
        });
    }

    /**
    * Palette Mode Container Down Handler
    * @param {any} event
    */
    _paletteDownHandler(event) {
        const that = this;

        if ((!LW.Utilities.Core.isMobile && event.button !== 0) || that.disabled || that.readonly) {
            return;
        }

        that._dragDetails = { x: event.pageX - window.pageXOffset, y: event.pageY - window.pageYOffset };

        const target = (event.originalEvent || event).target;

        if (!target || !target.closest) {
            return;
        }

        that._dragDetails.target = target.closest('.color-palette') || target.closest('.color-palette-radial')

        if (target.closest('.color-palette') || target.closest('.color-palette-radial')) {
            that._handleColorPaletteDown(event.originalEvent);
            that._dragDetails.isPalettePressed = true;
            return;
        }

        if (target.closest('.hue-scale') || target.closest('.alpha-channel-scale') || target.closest('.brightness-scale')) {
            that._handleScalesDown(event.originalEvent);
        }
    }

    /*
    * Updates palette pointer position, based on external color settings
    */
    _setPalettePointerXYPosition(event) {
        const that = this;
        let coord;

        if (that.displayMode === 'palette' || that.$.container.className.indexOf('custom-color-selection') > -1) {
            coord = that._getXYcoordinates(event);

            that.$.colorPaletteThumb.style.left = (event && coord && coord.x) ? 100 * coord.x / coord.container.offsetWidth + '%' : 100 * that._HSV.s + '%';
            that.$.colorPaletteThumb.style.top = (event && coord && coord.y) ? 100 * coord.y / coord.container.offsetHeight + '%' : 100 * (1 - that._HSV.v) + '%';
        }
        else if (that.displayMode === 'radial') {
            if (event) {
                coord = that._getXYcoordinates(event);

                if (!coord) {
                    return;
                }

                const offsetW = coord.container.offsetWidth ? coord.container.offsetWidth : that.$.colorPaletteRadial.offsetWidth,
                    offsetH = coord.container.offsetHeight ? coord.container.offsetHeight : that.$.colorPaletteRadial.offsetHeight;

                const paletteCoordX = Math.round(Math.cos(that._HSV.h * Math.PI / 180) * offsetW / 2 + offsetW / 2),
                    paletteCoordY = Math.round(Math.sin(that._HSV.h * Math.PI / 180) * offsetW / 2 + offsetH / 2);

                // Bugfix when values are close (in the center of radial mode)               
                if (Math.abs((offsetW / 2) - coord.x) < 5) {
                    that.$.colorPaletteRadialThumb.style.left = 100 * coord.x / that.$.colorPaletteRadial.offsetWidth + '%';
                    that.$.colorPaletteRadialThumb.style.top = 100 * coord.y / that.$.colorPaletteRadial.offsetHeight + '%';
                    return;
                }

                that.$.colorPaletteRadialThumb.style.left = 100 * (coord.x < offsetW / 2 ? Math.max(paletteCoordX, coord.x) : Math.min(paletteCoordX, coord.x)) / offsetW + '%';
                that.$.colorPaletteRadialThumb.style.top = 100 * (coord.y < offsetH / 2 ? Math.max(paletteCoordY, coord.y) : Math.min(paletteCoordY, coord.y)) / offsetH + '%';

                return;
            }
            else {
                const thumb = that._radialThumbPoint(that.$.colorPaletteRadial.offsetWidth / 2, that.$.colorPaletteRadial.offsetHeight / 2, that._HSV.h, that._HSV.s);

                that.$.colorPaletteRadialThumb.style.left = 100 * thumb.x / that.$.colorPaletteRadial.offsetWidth + '%';
                that.$.colorPaletteRadialThumb.style.top = 100 * thumb.y / that.$.colorPaletteRadial.offsetHeight + '%';
            }
        }
    }

    /*
    * Handles tooltip appearange, on mouseover color samples
    */
    _handleGridModeCellHover(event) {
        const that = this,
            targetCell = event.target.closest('.color-sample');

        if (that.disabled || !targetCell || that.tooltipDisplayMode === 'none' || !that.$.tooltip) {
            return;
        }

        that.$.tooltip.arrow = that.displayMode !== 'hexagonal';

        if (!that._isValidColor(targetCell.colorCode)) {
            that.$.tooltip.disabled = true;
            return;
        }

        that.$.tooltip.disabled = false;
        that.$.tooltip.selector = targetCell;

        const itemColor = targetCell.h && targetCell.s && targetCell.v ?
            that._HSVtoRGBA({ h: targetCell.h, s: targetCell.s, v: targetCell.v }, that._RGBA.a) : that._toRGBA(targetCell.colorCode);

        switch (that.tooltipDisplayMode) {
            case 'rgba':
                that.$.tooltip.value = itemColor || '';
                break;
            case 'rgb':
                that.$.tooltip.value = that._rgbaToRGB(itemColor) || '';
                break;
            case 'hex':
                that.$.tooltip.value = that._rgbaToHEX(itemColor) || '';
                break;
        }
    }

    /*
    * Handles button's and labels text content
    */
    _localizeLabels() {
        const that = this,
            rLabel = (that.shadowRoot || that).querySelector('label.r-channel'),
            gLabel = (that.shadowRoot || that).querySelector('label.g-channel'),
            bLabel = (that.shadowRoot || that).querySelector('label.b-channel'),
            aLabel = (that.shadowRoot || that).querySelector('label.a-channel'),
            hexLabel = (that.shadowRoot || that).querySelector('label.hex');

        if (rLabel) {
            rLabel.innerHTML = that.localize('redPrefix');
        }

        if (gLabel) {
            gLabel.innerHTML = that.localize('greenPrefix');
        }

        if (bLabel) {
            bLabel.innerHTML = that.localize('bluePrefix');
        }

        if (aLabel) {
            aLabel.innerHTML = that.localize('alphaPrefix');
        }

        if (hexLabel) {
            hexLabel.innerHTML = that.localize('hexPrefix');
        }

        if (that.$.buttonCustom) {
            that.$.buttonCustom.content = that.localize('customColor');
        }

        if (that.$.buttonOk) {
            that.$.buttonOk.content = that.localize('ok');
        }

        if (that.$.buttonCancel) {
            that.$.buttonCancel.content = that.localize('cancel');
        }

        if (that.$.defaultSamplesContainer) {
            //Theme colors label
            const themeColorsLabel = that.$.defaultSamplesContainer.querySelector('.theme-colors-label'),
                standardColorsLabel = that.$.defaultSamplesContainer.querySelector('.standard-colors-label');

            if (themeColorsLabel) {
                themeColorsLabel.innerHTML = that.localize('themeColors');
            }

            if (standardColorsLabel) {
                standardColorsLabel.innerHTML = that.localize('standardColors');
            }
        }
    }

    /*
    * Generates honeycomb with particular number of elements(hexagons)
    */
    _generateHoneycomb(cols, customHSV) {
        const that = this,
            shortStep = parseInt(getComputedStyle(that).getPropertyValue('--lw-color-panel-grid-mode-item-size')) / 4,
            hexagonSideSize = Math.sqrt(5 * Math.pow(shortStep, 2)),
            columns = cols % 2 === 0 ? parseInt(cols) + 1 : parseInt(cols),
            saturation = (customHSV && customHSV.s !== undefined) ? customHSV.s : 1,
            brightness = (customHSV && customHSV.v !== undefined) ? customHSV.v : 1,
            offsets = that._calculateHexagonCoords(columns, hexagonSideSize, 1),
            centerElement = offsets[Math.floor(offsets.length / 2)],
            hexagonSize = that._getHoneycomb30degDimmensions(offsets.length, hexagonSideSize, 1);

        if (!that._draw) {
            that._draw = new LW.Utilities.Draw(that.$.colorPaletteHexagonal);
        }

        that._draw.clear();

        that.$.colorPaletteHexagonal.firstElementChild.setAttribute('role', 'presentation');
        that.$.colorPaletteHexagonal.firstElementChild.firstElementChild.setAttribute('role', 'menu');

        that._hexagonItems = [];

        // Bugfix when changing mode from materialGrid to hexagonal

        if (that.$.materialGridSamplesContainer) {
            that.$.materialGridSamplesContainer.$.addClass('lw-hidden');
        }

        for (let i = 0; i < offsets.length; i++) {
            const dx = offsets[i].x - centerElement.x,
                dy = offsets[i].y - centerElement.y,
                satValCoefficient = that._validateInRange(that._calcSatDistance(dx, dy) / centerElement.x, 0, 1);
            let hue = that._calcHueAngle(dx, dy) < 0 ? 360 + that._calcHueAngle(dx, dy) : that._calcHueAngle(dx, dy);
            let s, v;

            if (that.inverted) {
                s = saturation;
                v = satValCoefficient;
            }
            else {
                s = satValCoefficient;
                v = brightness;
            }

            switch (that.palette) {
                case 'red':
                    hue = 0;
                    break;
                case 'green':
                    hue = 120;
                    break;
                case 'blue':
                    hue = 240;
                    break;
                case 'gray':
                    s = 0;
                    v = that.inverted ? satValCoefficient : 1 - satValCoefficient
                    break;
            }

            const settings = {
                offsetX: offsets[i].x,
                offsetY: offsets[i].y,
                style: {
                    'fill': that._HSVtoRGBA({ h: hue, s: s, v: v }, 1),
                    'class': 'color-sample'
                }
            };

            let item = that._hexagon(hexagonSideSize, settings);

            item.colorCode = that._HSVtoRGBA({ h: hue, s: s, v: v });
            item.h = hue;
            item.s = s;
            item.v = v;
            item.setAttribute('role', 'menuitem');
            item.setAttribute('aria-label', item.colorCode);

            that._hexagonItems.push(item);
        }

        that._draw.host.style.width = hexagonSize.width + 'px';
        that._draw.host.style.height = hexagonSize.height + 'px';
        that.$.container.style.setProperty('--lw-color-panel-palette-width', hexagonSize.width + 'px');
        that.$.container.style.setProperty('--lw-color-panel-palette-height', hexagonSize.height + 'px');
        that._applyValueInHexagonalMode();
        that._hideControlsByPriority(); // 
    }

    /*
    * Creates hexagonal shape, based on the size of its side and style settings
    */
    _hexagon(side, settings) { //
        const that = this,
            shortStep = that._shortStepHexagon(side),
            longStep = 2 * shortStep,
            startX1 = longStep + (settings.offsetX || 0),
            startY1 = settings.offsetY || 0,
            startX2 = startX1 + longStep,
            startY2 = startY1 + shortStep,
            startX3 = startX2,
            startY3 = startY2 + side,
            startX4 = startX3 - longStep,
            startY4 = startY3 + shortStep,
            startX5 = startX4 - longStep,
            startY5 = startY4 - shortStep,
            startX6 = startX5,
            startY6 = startY5 - side,
            points = 'M ' + startX1 + ',' + startY1 + ' L ' + startX2 + ',' + startY2 + ' L ' + startX3 + ',' + startY3 + ' L ' + startX4 + ',' + startY4 + ' L ' + startX5 + ',' + startY5 + ' L ' + startX6 + ',' + startY6 + ' Z',
            hexagon = that._draw.path(points, settings.style || { 'class': 'color-sample' });

        return hexagon;
    }

    /*
    * Calculates the shortest path from an edge of hexagon to an edge of the enclosing rectangle
    */
    _shortStepHexagon(sideSize) {
        return Math.sqrt(Math.pow(sideSize, 2) / 5);
    }

    /*
    * Gets the dimensions of honeycomb, according to the number of total cells
    */
    _getHoneycomb30degDimmensions(cells, itemSideSize, offset) {
        const that = this,
            cellsNumberOnSide = 0.5 * (1 + Math.sqrt(1 - 4 * ((1 - cells) / 3))),
            step = that._shortStepHexagon(itemSideSize),
            hexagonSquareWidth = step * 4,
            honeycombWidth = (2 * cellsNumberOnSide - 1) * hexagonSquareWidth + 2 * cellsNumberOnSide * 2 * offset,
            honeycombHeight = (2 * cellsNumberOnSide - 1) * itemSideSize + 2 * cellsNumberOnSide * step + cellsNumberOnSide * 2 * offset;

        return { width: honeycombWidth, height: honeycombHeight };
    }

    /*
    * Calclulates the values of color shades, based on the number of disllayed columns
    */
    _generateShades(items, shadesOf) {
        const that = this,
            type = shadesOf || 'gray',
            base = 255;
        let color,
            colors = [];

        items = Math.max(parseInt(items), 2);

        const step = 255 / (items - 1);

        for (let i = 0; i < items; i++) {
            let shadeValue = Math.max(parseInt(base - i * step), 0);

            if (that.inverted) {
                shadeValue = 255 - shadeValue;
            }

            switch (type) {
                case 'red':
                    color = 'rgb(' + shadeValue + ', 0, 0)';
                    break;
                case 'green':
                    color = 'rgb(0, ' + shadeValue + ', 0)';
                    break;
                case 'blue':
                    color = 'rgb(0, 0, ' + shadeValue + ')';
                    break;
                default:
                    color = 'rgb(' + shadeValue + ', ' + shadeValue + ', ' + shadeValue + ')';
            }

            colors.push(color);
        }

        return colors;
    }

    /*
    * Generates list of colors, based on HUE, Saturation and Value settings; color generation could be inverted according to "inverted property"
    */
    _generateColorSpectrum(columns) {
        const that = this;
        let colors = [];

        columns = Math.max(parseInt(columns), 2);

        const hueStep = 360 / (columns - 1),
            svStep = 2 / columns;
        let hue = 0,
            saturation = 1,
            brightnessValue = 1;

        for (let i = 0; i < columns; i++) {
            if (!that.inverted) {
                if (i === 0) {
                    brightnessValue = 1;
                }
                else if (i < columns / 2) {
                    brightnessValue = Math.max((brightnessValue - svStep), (svStep / 2));
                }
                else if (i < (columns - 1)) {
                    saturation = Math.max((saturation - svStep), (svStep / 2));
                    brightnessValue = Math.min((brightnessValue + svStep), 1);
                }
                else {
                    saturation = Math.max((saturation - svStep), (svStep / 2));
                    brightnessValue = Math.min((brightnessValue + svStep / 4), 1);
                }
            }
            else {
                if (i === 0) {
                    saturation = 1;
                }
                else if (i < columns / 2) {
                    saturation = Math.max((saturation - svStep), (svStep / 2));
                }
                else if (i < (columns - 1)) {
                    brightnessValue = Math.max((brightnessValue - svStep), (svStep / 2));
                    saturation = Math.min((saturation + svStep), 1);
                }
                else {
                    brightnessValue = Math.max((brightnessValue - svStep), (svStep / 2));
                    saturation = Math.min((saturation + svStep / 4), 1);
                }
            }

            for (let j = 0; j < columns; j++) {
                hue = parseInt(hueStep * j);
                hue = hue === 360 ? 360 - hueStep / 2 : hue;

                colors.push(that._HSVtoRGBA({ h: hue, s: saturation, v: brightnessValue }, 1));
            }
        }

        return colors;
    }

    /*
    * Generates spectrum grid structure - gray shades row, spectrum scale, user defined colors row
    */
    _generateSpectrumGrid(columns) {
        const that = this;

        if (!that.$.spectrumGridSamplesContainer) {
            return;
        }

        const spectrumItems = Math.pow(columns, 2),
            fragment = document.createDocumentFragment(),
            containers = {},
            containersNames = ['grayShadesBox', 'spectrumBox', 'customColorsBox'],
            grayRowShades = that._generateShades(columns, 'gray'),
            customColors = that._customPalette;
        let spectrumColors;

        containersNames.forEach(name => {
            const element = document.createElement('div');
            let label = LW.Utilities.Core.toDash(name).split('-').join(' ');

            containers[name] = element;

            element.className = LW.Utilities.Core.toDash(name);
            element.setAttribute('role', 'menu');
            element.setAttribute('aria-label', label.slice(0, 1).toUpperCase() + label.slice(1));

            fragment.appendChild(element);
        });

        if (that.palette === 'default') {
            spectrumColors = that._generateColorSpectrum(columns); // to be replaced with the case of custom colors
        }
        else if (['gray', 'red', 'green', 'blue'].indexOf(that.palette) > -1) {
            spectrumColors = that._generateShades(spectrumItems, that.palette);
        }
        else {
            spectrumColors = that._generateColorSpectrum(columns);
        }

        for (let i = 0; i < columns; i++) {
            const colorSample = that._createColorSample(grayRowShades[i], 'gray-shade');
            containers.grayShadesBox.appendChild(colorSample);
        }

        for (let i = 0; i < spectrumItems; i++) {
            const colorSample = that._createColorSample(spectrumColors[i], 'spectrum');
            containers.spectrumBox.appendChild(colorSample);
        }

        for (let i = 0; i < columns; i++) {
            const colorCode = customColors[i];

            if (!colorCode) {
                break;
            }

            const colorSample = that._createColorSample(colorCode, 'custom-color');
            containers.customColorsBox.appendChild(colorSample);
        }

        that.$.spectrumGridSamplesContainer.innerHTML = '';
        that.$.spectrumGridSamplesContainer.appendChild(fragment);
    }

    /*
    * Generates default grid structure - theme colors row, color shades row, standard colors row
    */
    _generateDefaultGrid() {
        const that = this;

        if (!that.$.defaultSamplesContainer) {
            return;
        }

        const columns = 10,
            containers = {},
            containersNames = ['themeColorsLabel', 'themeColorsBox', 'themeShadesBox', 'standardColorsLabel', 'standardColorsBox'],
            themeColors = that.gridThemeColors === null ? that._defaultModeThemeColors : that.gridThemeColors,
            shadeColors = that.gridShadeColors === null ? that._defaultModeShadesColors : that.gridShadeColors,
            standardColors = that.gridStandardColors === null ? that._defaultModeStandardColors : that.gridStandardColors,
            fragment = document.createDocumentFragment();

        containersNames.forEach(name => {
            const element = document.createElement('div');

            containers[name] = element;

            element.className = LW.Utilities.Core.toDash(name);

            if (name.indexOf('Box') !== -1) {
                element.setAttribute('role', 'menu');
            }
            else if (name.indexOf('Label') !== -1) {
                element.id = that.id + name;
            }

            fragment.appendChild(element);
        });

        containers.themeColorsLabel.innerHTML = that.localize('themeColors'); 'Theme colors';
        containers.standardColorsLabel.innerHTML = that.localize('standardColors'); 'Standard colors';
        containers.themeColorsBox.setAttribute('aria-labelledby', that.id + 'themeColorsLabel');
        containers.themeShadesBox.setAttribute('aria-labelledby', that.id + 'themeColorsLabel');
        containers.standardColorsBox.setAttribute('aria-labelledby', that.id + 'standardColorsLabel');

        for (let i = 0; i < that._defaultModeShadesColors.length; i++) {
            containers.themeShadesBox.appendChild(that._createColorSample(shadeColors[i], 'shades-color'));
        }

        for (let i = 0; i < columns; i++) {
            containers.themeColorsBox.appendChild(that._createColorSample(themeColors[i], 'theme-color'));
            containers.standardColorsBox.appendChild(that._createColorSample(standardColors[i], 'standard-color'));
        }

        that.$.defaultSamplesContainer.innerHTML = '';
        that.$.defaultSamplesContainer.appendChild(fragment);
    }

    /**
        * Mixes two colors with a shade 
        * @param {any} colorA - HEX value of colorA
        * @param {any} colorB - HEX value of colorB
        * @param {any} shade - from 0 to 1
        */
    _mixColors(colorA, colorB, shade) {
        const decToHex = d => d.toString(16),
            hexToDec = h => parseInt(h, 16);
        let mixedColorPair,
            colorBlend = '#';

        shade = (typeof (shade) !== 'undefined') ? shade : 0.5;

        //Remove the # sign
        colorA = colorA.replace(/#/g, '');
        colorB = colorB.replace(/#/g, '');

        // Get the R,G,B value pairs
        for (let i = 0; i <= 5; i += 2) {
            const colorPair1 = hexToDec(colorA.substr(i, 2)),
                colorPair2 = hexToDec(colorB.substr(i, 2));

            //Mixing the pairs from every color by appling specified shade
            mixedColorPair = decToHex(Math.round(colorPair2 + (colorPair1 - colorPair2) * (shade)));

            //Adds a leading zero if value is shorter
            while (mixedColorPair.length < 2) {
                mixedColorPair = '0' + mixedColorPair;
            }

            colorBlend += mixedColorPair;
        }

        //Return the new color as a HEX value by prepending the # sign
        return colorBlend;
    }

    /*
    * Generates material grid structure - row 
    */
    _generateMaterialGrid() {
        const that = this;

        if (!that.$.materialGridSamplesContainer) {
            return;
        }

        const fragment = document.createDocumentFragment();

        // Bugfix when changing mode from materialGrid to hexagonal
        that.$.materialGridSamplesContainer.$.removeClass('lw-hidden');

        //Create the column labels
        fragment.appendChild(that._createColorSample('rgb(255, 255, 255, 0)', 'material-color label-column'));

        Object.entries(that._materialColors['Red']).forEach(color => {
            const colorSample = that._createColorSample('rgb(255, 255, 255, 0)', 'material-color header');

            colorSample.textContent = color[0];
            fragment.appendChild(colorSample);
        });

        Object.entries(that._materialColors).forEach(gama => {
            const colorSample1 = that._createColorSample('rgb(255, 255, 255, 0)', 'material-color label-column');

            colorSample1.textContent = gama[0];
            fragment.appendChild(colorSample1);

            Object.entries(gama[1]).forEach(color => {
                fragment.appendChild(that._createColorSample(color[1], 'material-color'));
            });
        });

        that.$.materialGridSamplesContainer.innerHTML = '';
        that.$.materialGridSamplesContainer.appendChild(fragment);
    }

    /*
    * Creates span element as color box container
    */
    _createColorSample(color, className) {
        const colorSample = document.createElement('div'),
            empty = color ? '' : ' empty';

        if (color && className.indexOf('label-column') === -1 && className.indexOf('header') === -1) {
            colorSample.setAttribute('role', 'menuitem');
            colorSample.setAttribute('aria-label', color);
        }

        colorSample.className = 'color-sample ' + className + empty;

        if (className.indexOf('header') > -1 || className.indexOf('label-column') > -1) {
            return colorSample;
        }

        colorSample.colorCode = color;
        colorSample.style.backgroundColor = color;

        return colorSample;
    }

    /*
    * Calculates how many hexagon elements can have honeycomb in each bound row, according to the size of the middle row
    */
    _calculateHexagonCoords(columns, elementSideSize, offset) {
        const that = this,
            rows = columns,
            firstRowSize = colsToSide(columns),
            step = that._shortStepHexagon(elementSideSize),
            offsetXnextItemInRow = 4 * step + 2 * offset,
            offsetXnextRow = 2 * step + offset,
            offsetYnextRow = elementSideSize + step + offset,
            firstRowX = offsetXnextRow * (rows - 1) / 2;
        let coordinates = [];

        for (let i = 0; i < rows; i++) {
            const rowSize = i < firstRowSize ? firstRowSize + i : columns - 1 - (i - firstRowSize),
                x0 = i < firstRowSize ? firstRowX - i * offsetXnextRow : firstRowX - (columns - i - 1) * offsetXnextRow,
                y0 = i * offsetYnextRow;

            for (let j = 0; j < rowSize; j++) {
                const x = x0 + j * offsetXnextItemInRow;

                coordinates.push({ x: x, y: y0 });
            }
        }

        function colsToSide(columns) {
            columns = columns % 2 === 0 ? columns + 1 : columns;
            return (columns + 1) / 2;
        }

        return coordinates;
    }

    /*
    * Generates grid structure according to the display mode
    */
    _generateGridStructures() {
        const that = this,
            displayMode = that.displayMode;

        //Used by ColorPicker to lazy initialize the element
        if (that._initializeOnOpening) {
            return;
        }

        // WAI-ARIA roles
        function setAriaRoles() {
            switch (displayMode) {
                case 'default':
                case 'grid':
                    that.$.colorPaletteRadial.setAttribute('aria-hidden', true);
                    that.$.brightnessScale.setAttribute('aria-hidden', true);
                    break;
                case 'hexagonal':
                    that.$.colorPaletteRadial.setAttribute('aria-hidden', true);
                    that.$.brightnessScale.removeAttribute('aria-hidden');
                    break;
                case 'materialGrid':
                    that.$.colorPaletteRadial.removeAttribute('aria-hidden');
                    that.$.brightnessScale.removeAttribute('aria-hidden');
                    break;
                case 'palette':
                    that.$.colorPaletteRadial.removeAttribute('aria-hidden');
                    that.$.brightnessScale.setAttribute('aria-hidden', true);
                    break;
                case 'radial':
                case 'spectrumGrid':
                    break;
            }
        }

        if (that._createGridModeComponents() === undefined) {
            switch (displayMode) {
                case 'spectrumGrid':
                    that._generateSpectrumGrid(that.columnCount);
                    break;
                case 'materialGrid':
                    that._generateMaterialGrid();
                    break;
                case 'default':
                    that._generateDefaultGrid();
                    break;
                case 'grid':
                    that._generatePaletteGrid();
                    break;
            }

            that._generatePaletteUserColorGrid();
            setAriaRoles();
            return;
        }

        that._createColorControls();

        switch (displayMode) {
            case 'radial':
                that._generateRadialCanvas();
                break;
            case 'hexagonal':
                that._generateHoneycomb(that.columnCount, that._HSV);
                break;
        }

        setAriaRoles();
    }

    /**
     * Creates a Canvas that acts as a fallback for the lack of CSS gradient support on iOS devices
     */
    _generateRadialCanvas() {
        const that = this;

        if (that.displayMode !== 'radial' || (that.displayMode === 'radial' && !LW.Utilities.Core.Browser.Firefox)) {
            return;
        }

        const diameter = that.$.colorPaletteRadial.offsetWidth,
            radius = diameter / 2;
        let canvas = that.$.colorPaletteRadial.querySelector('canvas');

        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('role', 'presentation');
        }

        let ctx = canvas.getContext('2d'),
            image = ctx.createImageData(diameter, diameter),
            data = image.data;

        canvas.width = canvas.height = diameter;

        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {
                let [r, phi] = that._xy2polar(x, y);

                if (r > radius) {
                    // skip all (x,y) coordinates that are outside of the circle
                    continue;
                }

                // Figure out the starting index of this pixel in the image data array.
                let rowLength = 2 * radius,
                    adjustedX = x + radius, // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    adjustedY = y + radius, // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    pixelWidth = 4, // each pixel requires 4 slots in the data array
                    index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;

                let hue = that._rad2deg(phi),
                    saturation = 1.0,
                    value = 1.0;

                const [red, green, blue] = that._hsv2rgb(hue, saturation, value);

                data[index] = red;
                data[index + 1] = green;
                data[index + 2] = blue;
                data[index + 3] = 255;
            }
        }

        ctx.putImageData(image, 0, 0);

        that.$.colorPaletteRadial.appendChild(canvas);
    }

    _xy2polar(x, y) {
        let r = Math.sqrt(x * x + y * y),
            phi = Math.atan2(y, x);

        return [r, phi];
    }

    _rad2deg(rad) {
        return ((rad + Math.PI) / (2 * Math.PI)) * 360;
    }

    _hsv2rgb(hue, saturation, value) {
        let chroma = value * saturation,
            hue1 = hue / 60,
            x = chroma * (1 - Math.abs((hue1 % 2) - 1)),
            r1, g1, b1;

        if (hue1 >= 0 && hue1 <= 1) {
            ([r1, g1, b1] = [chroma, x, 0]);
        }
        else if (hue1 >= 1 && hue1 <= 2) {
            ([r1, g1, b1] = [x, chroma, 0]);
        }
        else if (hue1 >= 2 && hue1 <= 3) {
            ([r1, g1, b1] = [0, chroma, x]);
        }
        else if (hue1 >= 3 && hue1 <= 4) {
            ([r1, g1, b1] = [0, x, chroma]);
        }
        else if (hue1 >= 4 && hue1 <= 5) {
            ([r1, g1, b1] = [x, 0, chroma]);
        }
        else if (hue1 >= 5 && hue1 <= 6) {
            ([r1, g1, b1] = [chroma, 0, x]);
        }

        let m = value - chroma,
            [r, g, b] = [r1 + m, g1 + m, b1 + m];

        // Change r,g,b values from [0,1] to [0,255]
        return [255 * r, 255 * g, 255 * b];
    }

    /*
    * Hides particular elements on palette resize
    */
    _hideControlsByPriority() {
        const that = this,
            colorControlsContainer = (that.shadowRoot || that).querySelector('.color-controls-container');

        if (!colorControlsContainer.innerHTML.trim()) {
            return;
        }

        function hideComponent(className) {
            const components = that.getElementsByClassName(className);

            for (let i = 0; i < components.length; i++) {
                components[i].classList.add('lw-hidden');
            }
        }

        const priority = that.hideContentToFit.slice().reverse(),
            controlledElements = ['hex', 'r-channel', 'g-channel', 'b-channel', 'a-channel', 'preview-container'];
        let i = priority.length;

        controlledElements.forEach(item => {
            //if (that['$' + item]) {
            //    that['$' + item].removeClass('lw-hidden');
            //}

            const elements = that.getElementsByClassName(item);

            for (let e = 0; e < elements.length; e++) {
                elements[e].classList.remove('lw-hidden');
            }
        });

        while (colorControlsContainer.scrollHeight > colorControlsContainer.offsetHeight && i > 0) {
            i--;

            switch (priority[i]) {
                case 'HEX':
                    //controlledElements.slice(0, 2).forEach(item => that['$' + item].addClass('lw-hidden'));
                    //controlledElements.slice(0, 2).forEach(item => that['$' + item].addClass('lw-hidden'));
                    hideComponent(controlledElements[0]);
                    break;
                case 'RGB':
                    //controlledElements.slice(2, 8).forEach(item => that['$' + item].addClass('lw-hidden'));
                    controlledElements.slice(1, 4).forEach(className => hideComponent(className));
                    break;
                case 'previewContainer':
                    //that.$previewContainer.addClass('lw-hidden');
                    hideComponent(controlledElements[5]);
                    break;
                case 'alpha':
                    //controlledElements.slice(9, 11).forEach(item => that['$' + item].addClass('lw-hidden'));
                    hideComponent(controlledElements[4]);
                    break;
            }
        }

        that._generateRadialCanvas();
    }

    /*
    * Redraws honeycomb if the variable related to items size is updated
    */
    _resizeHoneycombItems() {
        const that = this;

        if (that.displayMode !== 'hexagonal') {
            return;
        }

        that._generateHoneycomb(that.columnCount, that._HSV);
    }

    /*
    * Return value string, regarding to prefered type
    */
    _getValue(type, randomColor) {
        const that = this,
            color = that._RGBA;
        let value = null,
            rgbaFragments;

        switch (type) {
            case 'hex':
                value = that._rgbArrayToHEX([color.r, color.g, color.b, color.a]);
                break;
            case 'rgb':
                value = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
                break;
            case 'rgba':
                value = (color.r !== null && color.g !== null && color.b !== null) ? 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')' : null;
                break;
            case 'HSVtoRGBAarray': {
                let alpha = that.displayMode === 'hexagonal' || that.displayMode === 'radial' || that.displayMode === 'palette' ? that._RGBA.a : 1;

                if (randomColor) {
                    if (that._isRGBA(randomColor) && /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.test(randomColor.replace(/\s/g, ''))) {
                        alpha = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(randomColor.replace(/\s/g, ''))[4];
                    }
                    else if (that._isHEX(randomColor) && /(^#[0-9A-F]{8}$)/gi.test(randomColor.replace(/\s/g, ''))) {
                        alpha = parseInt(/(^#[0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2}$)/gi.exec(randomColor.replace(/\s/g, ''))[4], 16) / 255;
                    }

                    alpha = Math.min(1, Math.max(0, parseFloat(alpha)));

                    if (isNaN(alpha)) {
                        alpha = that._RGBA.a;
                    }
                }

                value = that._HSVtoRGBA(that._HSV, alpha);
                rgbaFragments = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(value.replace(/\s/g, ''));
                value = { r: parseInt(rgbaFragments[1]), g: parseInt(rgbaFragments[2]), b: parseInt(rgbaFragments[3]), a: parseFloat(rgbaFragments[4]) };
                break;
            }
            case 'hsv':
                if (randomColor && that._isValidColor(randomColor)) {
                    value = that._colorToHSV(randomColor);
                }

                break;
            default:
                if (that.displayMode === 'radial' || that.displayMode === 'hexagonal' || that.displayMode === 'palette') {
                    value = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';

                    if (!that.editAlphaChannel) {
                        value = that._rgbaToRGB(value);
                    }
                }
                else if (randomColor !== null) {
                    value = that._rgbArrayToHEX([color.r, color.g, color.b, color.a]);
                }
                else {
                    value = null;
                }

                break;
        }

        return value || null;
    }

    /*
    * Updates value and fires event according to applyValueMode
    */
    _instantUpdate() { // rename?remove?update?
        const that = this,
            oldValue = that.value;

        if (that.applyValueMode !== 'instantly' || that.$.container.className.indexOf('custom-color-selection') > -1) {
            return;
        }

        that.value = that._getValue(that.valueFormat);
        that.$.fireEvent('change', {
            'oldValue': oldValue,
            'value': that.value
        });
    }

    /*
    * Compares if two color values are equal, no matter of their type of representation
    */
    _equalValues(value1, value2) {
        const that = this;

        if (value1 === value2) {
            return true;
        }
        else if (!value1 || !value2) {
            return false;
        }

        return that._toRGBA(value1, true) === that._toRGBA(value2, true)
    }

    /*
    * Transform to Hex
    */
    _toHEX(value) {
        const that = this;

        if (that._isHEX(value)) {
            return value;
        }

        if (that._isRGB(value)) {
            value = value.toLowerCase().replace('rgb', 'rgba');
            value = that.editAlphaChannel ? value.replace(')', ', ' + (that._RGBA.a || 1) + ')') : value.replace(')', ', 1)');
        }

        if (that._isRGBA(value)) {
            return that._rgbaToHEX(value);
        }
    }

    /*
    * Transform RGB/HEX/color to RGBA
    */
    _toRGBA(value, ignoreAlpha) { // check if these transformations are required when there are central _HSV and _RGBA containers
        const that = this;
        let val = that.value;

        if (that._isRGBA(value)) {
            if (ignoreAlpha) {
                let rgb = value.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/gi);

                return 'rgba(' + rgb + ', 1)';
            }

            return value;
        }

        if (that._isValidColorName(value)) {
            val = hexToRgba(that._cssColorNamesHEX[value.trim().toLowerCase()]);
        }
        else if (that._isHEX(value)) {
            val = hexToRgba(value);
        }
        else if (that._isRGB(value)) {
            val = value.toLowerCase();
            val = val.replace('rgb', 'rgba');
            val = that.editAlphaChannel ? val.replace(')', ', ' + (that._RGBA.a || 1) + ')') : val.replace(')', ', 1)');
        }
        else {
            return false;
        }

        return val;

        function hexToRgba(value) {
            const shortHexResult = /^#(.)(.)(.)$/gi.exec(value),
                longHexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(value),
                r = shortHexResult ? parseInt(shortHexResult[1] + shortHexResult[1], 16) : parseInt(longHexResult[1], 16),
                g = shortHexResult ? parseInt(shortHexResult[2] + shortHexResult[2], 16) : parseInt(longHexResult[2], 16),
                b = shortHexResult ? parseInt(shortHexResult[3] + shortHexResult[3], 16) : parseInt(longHexResult[3], 16),
                a = shortHexResult ? parseInt(shortHexResult[4] + shortHexResult[4], 16) : parseInt(longHexResult[4], 16);

            if (ignoreAlpha) {
                return 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
            }

            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (isNaN(a) ? '1' : (a / 255)) + ')';
        }
    }

    /*
    * Color transformations
    */
    _rgbaToRGB(value) {
        const rgba = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(value.replace(/\s/g, ''));
        return 'rgb(' + rgba[1].trim() + ', ' + rgba[2].trim() + ', ' + rgba[3].trim() + ')';
    }
    _rgbaToHEX(value) {
        const that = this,
            rgba = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(value.replace(/\s/g, ''));
        return that._rgbArrayToHEX([rgba[1], rgba[2], rgba[3], rgba[4]]);
    }
    _rgbArrayToHEX(color) {
        let hex = '#';

        if (Array.isArray(color) && color[0] === null) {
            return null;
        }

        for (let i = 0; i < 3; i++) {
            let hexI = parseInt(color[i]).toString(16).toUpperCase();

            hexI = hexI.length === 1 ? 0 + hexI : hexI;
            hex = hex + hexI;
        }

        let alpha = parseFloat(color[3]);

        if (!isNaN(alpha)) {
            alpha = parseInt((alpha * 255)).toString(16).toUpperCase();

            if (alpha !== 'FF') {
                hex = hex.slice(0, 7) + (alpha.length === 1 ? 0 + alpha : alpha);
            }
        }

        return hex;
    }

    _colorToHSV(value) {
        const that = this;

        if (!that._isValidColor(value)) {
            return;
        }

        value = that._toRGBA(value).replace(/\s/g, '');

        const rgbaFragments = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(value),
            r = Math.min(255, Math.max(0, parseFloat(rgbaFragments[1]))) / 255,
            g = Math.min(255, Math.max(0, parseFloat(rgbaFragments[2]))) / 255,
            b = Math.min(255, Math.max(0, parseFloat(rgbaFragments[3]))) / 255;
        let hsv = { h: 0, s: 0, v: 0 },
            min = 0,
            max = 0;

        if (r >= g && r >= b) {
            max = r;
            min = (g > b) ? b : g;
        }
        else if (g >= b && g >= r) {
            max = g;
            min = (r > b) ? b : r;
        }
        else {
            max = b;
            min = (g > r) ? r : g;
        }

        hsv.v = max;
        hsv.s = max ? ((max - min) / max) : 0;

        if (!hsv.s) {
            hsv.h = that._HSV.h ? that._HSV.h : 0;
        }
        else {
            const delta = max - min;

            if (r === max) {
                hsv.h = (g - b) / delta;
            }
            else if (g === max) {
                hsv.h = 2 + (b - r) / delta;
            }
            else {
                hsv.h = 4 + (r - g) / delta;
            }

            //hsv.h = Math.round(hsv.h * 60);
            hsv.h = hsv.h * 60;

            if (hsv.h < 0) {
                hsv.h += 360;
            }
        }

        hsv.s = parseFloat(hsv.s);
        hsv.v = parseFloat(hsv.v);

        //Invert the saturation and value
        //if (that.inverted) {
        //    const saturation = hsv.s;

        //    hsv.s = hsv.v;
        //    hsv.v = saturation;
        //}

        return hsv;
    }
    _HSVtoRGBA(hsv, a) {//  to return RGBA array or RGBA object!!!
        hsv = hsv || { h: 0, s: 0, v: 0 };
        const that = this,
            h = (hsv && hsv.h >= 0) ? hsv.h : that._HSV.h,
            s = (hsv && hsv.s >= 0) ? hsv.s : that._HSV.s,
            v = (hsv && hsv.v >= 0) ? hsv.v : that._HSV.v;

        let chroma = v * s,
            hue = h / 60,
            x = chroma * (1 - Math.abs((hue % 2) - 1)),
            r1, g1, b1;

        if (hue >= 0 && hue <= 1) {
            ([r1, g1, b1] = [chroma, x, 0]);
        }
        else if (hue >= 1 && hue <= 2) {
            ([r1, g1, b1] = [x, chroma, 0]);
        }
        else if (hue >= 2 && hue <= 3) {
            ([r1, g1, b1] = [0, chroma, x]);
        }
        else if (hue >= 3 && hue <= 4) {
            ([r1, g1, b1] = [0, x, chroma]);
        }
        else if (hue >= 4 && hue <= 5) {
            ([r1, g1, b1] = [x, 0, chroma]);
        }
        else if (hue >= 5 && hue <= 6) {
            ([r1, g1, b1] = [chroma, 0, x]);
        }

        const m = v - chroma,
            r = Math.round((r1 + m) * 255),
            g = Math.round((g1 + m) * 255),
            b = Math.round((b1 + m) * 255);

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a !== undefined ? a : (that._RGBA.a || 0)) + ')';
    }
    _HSVRGBArefresh(value) {
        const that = this;

        that._HSV = that._getValue('hsv', value) || { h: 1, s: 0, v: 1 };
        that._RGBA = that._getValue('HSVtoRGBAarray', value);
    }

    /*
    * Return floating point to precision
    */
    _toFixed(value, symbols) {
        return parseFloat(parseFloat(value).toFixed(symbols || 2));
    }

    /*
    * Validates number in range
    */
    _validateInRange(value, min, max) {
        return Math.min(Math.max(parseFloat(value), parseFloat(min)), parseFloat(max))
    }

    /*
    * Validation functions about HEX, RGB, RGBA, supported color names
    */
    _isHEX(value) {
        return /(^#[0-9A-F]{3}$)|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{8}$)/i.test(value);
    }

    _isRGB(value) {
        return /rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)/i.test(value);
    }

    _isRGBA(value) {
        return /rgba\((\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\)/i.test(value);
    }

    _isValidColorName(value) {
        return (!value || typeof this._cssColorNamesHEX[value.trim().toLowerCase()] === 'undefined') ? false : true;
    }

    _isValidColor(value) {
        return this._isHEX(value) || this._isRGB(value) || this._isRGBA(value) || this._isValidColorName(value)
    }

    /*
    * Getting/setting inputs, related to Red, Green, Blue, Alpha channels
    */
    _getRGBAFromInputs() {
        const that = this;
        let r = (that.shadowRoot || that).querySelector('input.r-channel'),
            g = (that.shadowRoot || that).querySelector('input.g-channel'),
            b = (that.shadowRoot || that).querySelector('input.b-channel'),
            a = (that.shadowRoot || that).querySelector('input.a-channel');

        r = r ? r.value : that._RGBA.r;
        g = g ? g.value : that._RGBA.g;
        b = b ? b.value : that._RGBA.b;
        a = a ? a.value : that._RGBA.a;

        return { r: parseInt(r), g: parseInt(g), b: parseInt(b), a: a };
    }

    _setRGBAToInputs() {
        const that = this;
        Object.entries(that._RGBA).forEach(entry => {
            const input = (that.shadowRoot || that).querySelector('input.' + entry[0] + '-channel');

            if (input) {
                input.value = that._RGBA[entry[0]];
            }
        });
    }

    /*
    * Circular mode calculations - HUE angle, saturation distance
    */
    _calcHueAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }
    _calcSatDistance(dx, dy) {
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
});