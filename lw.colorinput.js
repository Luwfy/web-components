
LW('lw-color-input', class ColorInput extends LW.Input {
    static get properties() {
        return {
            'dataSource': {
                type: 'any',
                value: null
            },
            'displayMode': {
                value: 'default',
                allowedValues: ['default', 'grid'],
                type: 'string'
            },
            'dropDownHeight': {
                type: 'any',
                value: 'auto'
            },
            'messages': {
                value: {
                    'en': {
                        'standardColors': 'Standard colors',
                        'themeShadeColors': '',
                        'themeColors': 'Theme colors'
                    }
                },
                type: 'object',
                extend: true
            },
            'placeholder': {
                value: 'Please Select Color',
                type: 'string'
            },
            'valueDisplayMode': {
                value: 'default',
                allowedValues: ['default', 'colorBox', 'colorCode'],
                type: 'string'
            },
            'valueFormat': {
                value: 'hex',
                allowedValues: ['rgb', 'rgba', 'hex'],
                type: 'string'
            }
        }
    }

    static get listeners() {
        return {
            'input.focus': '_focusHandler',
            'input.blur': '_blurHandler',
            'input.keydown': '_keyDownHandler',
            'input.keyup': '_keyUpHandler',
            'input.keypress': '_keyPressHandler',
            'input.select': '_inputSelectHandler',
            'dropDownButton.down': '_dropDownButtonDownHandler',
            'inputContainer.down': '_downHandler',
            'document.up': '_documentUpHandler'
        };
    }

    /** Button's template. */
    template() {
        return `<div id="inputContainer" role="presentation">
                    <div class="lw-content">
                        <div class="lw-buttons-container" role="presentation" id="buttonsContainer">
                            <div class="lw-action-button" id="actionButton">
                                <div id="colorSampleContainer" class="lw-color-box color-picker-sample-container" role="presentation">
                                    <div id="colorSample" class="color-picker-sample"></div>
                                </div>
                                <input class="lw-input lw-color-input" id='input' readonly='[[readonly]]' placeholder='[[placeholder]]' type='[[type]]' name='[[name]]'
                                    value='{{value::keyup}}' disabled='[[disabled]]' aria-label="[[placeholder]]" spellcheck="false" />
                            </div>
                            <div id="dropDownButton" tabindex=-1 class="lw-drop-down-button" role="button" aria-label="Toggle popup">
                                <div id="arrow" class="lw-drop-down-button-icon" aria-hidden="true"></div>
                            </div>
                        </div>
                        <span id="hint" class="lw-hint lw-hidden" inner-h-t-m-l="[[hint]]"></span>
                    </div>
                </div>`;
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

        const active = that.$.menu.querySelector('.color-sample.selected');

        if (active) {
            const dataValue = that.$.input.dataValue,
                items = that.$.menu.querySelectorAll('.color-sample');

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const label = item.getAttribute('data-label'),
                    value = item.getAttribute('value');

                if (dataValue !== undefined && value === dataValue ||
                    dataValue === undefined && label === that.$.input.value) {
                    active.removeAttribute('aria-current');
                    active.classList.remove('selected');
                    item.classList.add('selected');
                    item.setAttribute('aria-current', true);
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

    _blurHandler() {
        const that = this;

        if (!that.opened) {
            that.removeAttribute('focus');
            that.$.actionButton.removeAttribute('focus');
            that.$.dropDownButton.removeAttribute('focus');
        }

        delete that._preventLookup;

        if (!that._isValidColor(that.value)) {
            that.$.input.value = that.$.input.dataValue = that.value = '';
            that.$colorSampleContainer.addClass('no-color');
        }
    }

    _focusHandler() {
        const that = this;

        that.setAttribute('focus', '');
        that.$.actionButton.setAttribute('focus', '');
        that.$.dropDownButton.setAttribute('focus', '');

        if (!that.readonly && that.minLength === 0 && that.$.input.value.length === 0 && !that._preventLookup) {
            that._lookup();
            return;
        }

        delete that._preventLookup;
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

    /**
     * Returns the defaul colors
     */
    _getDefaultColors() {
        const that = this;

        let colors = that._generateColors();

        if (that.displayMode === 'grid') {
            return colors;
        }

        let colorList = [];

        for (let i = 0; i < colors.length; i++) {
            colorList = colorList.concat(Object.values(colors[i])[0]);
        }

        return colorList;
    }

    /**
     * Returns the defaul colors depending on the displayMode
     */
    _generateColors() {
        const that = this;

        if (that.displayMode === 'default') {
            if (that._defaultModeColors) {
                return that._defaultModeColors;
            }

            return that._defaultModeColors = [
                {
                    'themeColors': ['#FFFFFF', '#000000', '#E6E6E6', '#495469', '#5671C2', '#D48439', '#A5A5A5', '#EEC328', '#7399D3', '#85AA4C']
                },
                {
                    'themeShadeColors': [
                        '#F2F2F2', '#808080', '#D0CECE', '#D6DCE4', '#DDEBF7', '#FCE4D6', '#EBEBEB', '#FFF2CC', '#DDE5F7', '#E2EFDA',
                        '#D8D8D8', '#595959', '#AEAAAA', '#ACB9CA', '#BDD7EE', '#F6CAAD', '#DBDBDB', '#FFE699', '#B4C6E7', '#C6E0B4',
                        '#BFBFBF', '#404040', '#757171', '#8497B0', '#9BC2E6', '#F4B084', '#C0C0C0', '#FFD966', '#8EA9DB', '#A9D08E',
                        '#A6A6A6', '#262626', '#312F2F', '#333F4F', '#2F75B5', '#C65911', '#7B7B7B', '#BF8F00', '#305496', '#548235',
                        '#808080', '#0D0D0D', '#161616', '#222B35', '#1F4E78', '#833C0C', '#525252', '#806000', '#203764', '#375623'
                    ]
                },
                {
                    'standardColors': ['#A52A0D', '#DB3A15', '#EEC328', '#FEFE33', '#A6CD57', '#62AC54', '#65ADEE', '#3F6FBE', '#10205F', '#64379E']
                }
            ]
        }
        else {
            if (that._gridColors) {
                return that._gridColors;
            }

            return that._gridColors = [
                'rgba(255, 255, 255, 0)', 'rgb(0, 0, 0)', 'rgb(153, 51, 0)', 'rgb(51, 51, 0)', 'rgb(0, 51, 0)', 'rgb(0, 51, 102)',
                'rgb(0, 0, 128)', 'rgb(51, 51, 153)', 'rgb(51, 51, 51)', 'rgb(128, 0, 0)', 'rgb(255, 102, 0)',
                'rgb(128, 128, 0)', 'rgb(0, 128, 0)', 'rgb(0, 128, 128)', 'rgb(0, 0, 255)', 'rgb(102, 102, 153)',
                'rgb(128, 128, 128)', 'rgb(255, 0, 0)', 'rgb(255, 153, 0)', 'rgb(153, 204, 0)', 'rgb(51, 153, 102)',
                'rgb(51, 204, 204)', 'rgb(51, 102, 255)', 'rgb(128, 0, 128)', 'rgb(153, 153, 153)', 'rgb(255, 0, 255)',
                'rgb(255, 204, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(0, 204, 255)',
                'rgb(153, 51, 102)', 'rgb(192, 192, 192)', 'rgb(255, 153, 204)', 'rgb(255, 204, 153)', 'rgb(255, 255, 153)',
                'rgb(204, 255, 204)', 'rgb(204, 255, 255)', 'rgb(153, 204, 255)', 'rgb(204, 153, 255)', 'rgb(255, 255, 255)'];
        }
    }

    _downHandler(event) {
        const that = this;

        if (that.readonly || event.originalEvent.target.closest('.lw-color-box')) {
            that._dropDownButtonDownHandler(event);
        }
    }

    _documentUpHandler(event) {
        const that = this;

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (target === that || target.closest && target.closest('.lw-buttons-container') === that.$.buttonsContainer) {
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

        that._isPointerDown = false;
        that.close();
    }

    _formatValue(value) {
        const that = this;

        if (!that._isValidColor(value)) {
            return '';
        }

        const color = that._getRGBA(value);

        switch (that.valueFormat) {
            case 'hex':
                value = that._rgbArrayToHEX([color.r, color.g, color.b, color.a]);
                break;
            case 'rgb':
                value = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
                break;
            case 'rgba':
                value = (color.r !== null && color.g !== null && color.b !== null) ? 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')' : null;
                break;
        }

        return value || null;
    }

    _getRGBA(value) {
        const that = this,
            color = value || that.value;
        let alpha = 1;

        if (color) {
            if (that._isRGBA(color) && /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.test(color.replace(/\s/g, ''))) {
                alpha = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(color.replace(/\s/g, ''))[4];
            }
            else if (that._isHEX(value) && /(^#[0-9A-F]{8}$)/gi.test(value.replace(/\s/g, ''))) {
                alpha = parseInt(/(^#[0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2}$)/gi.exec(value.replace(/\s/g, ''))[4], 16) / 255;
            }

            alpha = Math.min(1, Math.max(0, parseFloat(alpha)));

            if (isNaN(alpha)) {
                alpha = 1;
            }
        }

        value = that._HSVtoRGBA(that._colorToHSV(color), alpha);

        const rgbaFragments = /rgba\((\d*.\d+|\d+),(\d*.\d+|\d+),(\d*.\d+|\d+)\,(\d*.\d+|\d+)\)/gi.exec(value.replace(/\s/g, ''));

        return { r: parseInt(rgbaFragments[1]), g: parseInt(rgbaFragments[2]), b: parseInt(rgbaFragments[3]), a: parseFloat(rgbaFragments[4]) };
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
            hsv.h = 0;
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

        return hsv;
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

    _HSVtoRGBA(hsv, a) {//  to return RGBA array or RGBA object!!!
        hsv = hsv || { h: 0, s: 0, v: 0 };
        const that = this,
            h = hsv.h,
            s = hsv.s,
            v = hsv.v;

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

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a !== undefined ? a : (that._getRGBA().a || 0)) + ')';
    }

    /*
  * Transform RGB/HEX/color to RGBA
  */
    _toRGBA(value, ignoreAlpha) {
        const that = this;
        let val = that.value;

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
            val = val.replace(')', ', ' + 1 + ')');
        }
        else {
            return false;
        }

        return val;
    }

    /**
     * Checks if the value is HEX
     * @param {any} value
     */
    _isHEX(value) {
        return /(^#[0-9A-F]{3}$)|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{8}$)/i.test(value);
    }

    /**
     * Checks if the value is RGB
     * @param {any} value
     */
    _isRGB(value) {
        return /rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)/i.test(value);
    }

    _isValidColorName(value) {
        return (!value || typeof this._cssColorNamesHEX[value.trim().toLowerCase()] === 'undefined') ? false : true;
    }

    /**
     * Checks if the value is RGBA
     * @param {any} value
     */
    _isRGBA(value) {
        return /rgba\((\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\s*,\s*(\d*.\d+|\d+)\)/i.test(value);
    }

    /**
     * Checks if the color is valid
     * @param {any} value
     */
    _isValidColor(value) {
        return this._isHEX(value) || this._isRGB(value) || this._isRGBA(value) || this._isValidColorName(value);
    }

    _performSelect() {
        const that = this;
        const targetItem = that.$.menu.querySelector('.selected') || that.$.menu.querySelector('.color-sample'),
            label = targetItem.getAttribute('data-label'),
            value = targetItem.getAttribute('value'),
            oldLabel = that.value,
            oldValue = that.$.input.dataValue;

        that.value = that.$.colorSample.style.backgroundColor = that._formatValue(label);
        that.$.input.dataValue = value;

        if (that.value) {
            that.$colorSampleContainer.removeClass('no-color');
            that.$.colorSample.setAttribute('aria-label', that.value);
        }
        else {
            that.$colorSampleContainer.addClass('no-color');
            that.$.colorSample.setAttribute('aria-label', 'No color');
        }

        targetItem.classList.add('selected');
        targetItem.setAttribute('aria-current', true);

        if (label !== oldLabel || value !== oldValue) {
            that.$.fireEvent('change', { value: value, label: label, oldValue: oldValue, oldLabel: oldLabel });
        }

        that.close();
    }

    _process(items) {
        const that = this;

        if (!items) {
            items = [];
        }

        items = items.slice(0);

        if (typeof items === 'string') {
            items = that.$.deserialize(items, 'array');
        }

        if (that.matcher) {
            items = items.filter(item => that.matcher(item) > -1);
        }
        else if (that.query) {
            let colorNames = [];

            for (let prop in that._cssColorNamesHEX) {
                if (that._matcher(prop, true) > -1) {
                    colorNames.push(that._cssColorNamesHEX[prop]);
                }
            }

            if (colorNames.length) {
                items = colorNames;
            }
            else {
                if (!items.length && (that.dataSource === null || that.dataSource === undefined)) {
                    let colors = that._generateColors();

                    if (that.displayMode === 'default') {
                        colors = [].concat.apply([], colors.map(colorGroup => Object.values(colorGroup)[0]));
                    }

                    items = colors.filter(item => that._matcher(item) > -1);
                }
                else {
                    items = items.filter(item => that._matcher(item) > -1);
                }
            }
        }

        items = that._sorter(items);

        if (!items.length && that.opened) {
            that.close();
        }

        if (that.query.length > 0 && !items.length || !items.length && that.dataSource !== null && that.dataSource !== undefined) {
            return;
        }

        if (that.query.length > 0) {
            that._render(items.slice(0, that.items));
        }
        else {
            that._render(items);
        }

        that._open();

        that._refreshMenu();
        that.ensureVisible();
    }

    _matcher(item, noFormatting) {
        const that = this;
        const text = that.query;

        item = noFormatting ? (item.label || item) : that._formatValue(item.label || item);

        if (!text) {
            return -1;
        }

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
                return item.toLowerCase().indexOf(text.toLowerCase());

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

    _render(items) {
        const that = this;

        that.$.menu.innerHTML = '';

        if (items.length) {
            that.$.menu.appendChild(that._createColorGroup(that._createColorSamples(items)));
        }
        else if ((that.dataSource === null || that.dataSource === undefined) && !that.query.length) {
            items = that._generateColors();

            if (that.displayMode === 'default') {
                const defaultModeColors = that._generateColors();

                for (let i = 0; i < defaultModeColors.length; i++) {
                    const colorGroup = Object.keys(defaultModeColors[i])[0],
                        colors = Object.values(defaultModeColors[i])[0];

                    const colorGroupLabel = document.createElement('div');

                    colorGroupLabel.classList.add('standard-colors-label');
                    colorGroupLabel.innerHTML = that.localize(colorGroup);
                    colorGroupLabel.id = that.id + colorGroup + 'Label';

                    that.$.menu.appendChild(colorGroupLabel);
                    that.$.menu.appendChild(that._createColorGroup(that._createColorSamples(colors), colorGroup + 'Label'));
                }
            }
            else {
                that.$.menu.appendChild(that._createColorGroup(that._createColorSamples(items)));
            }
        }
    }

    _createColorGroup(colorSamples, groupName) {
        const that = this;
        const colorGroup = document.createElement('div');

        function setActiveState() {
            const previouslyActive = that.$.menu.getElementsByClassName('selected');

            if (previouslyActive[0]) {
                previouslyActive[0].removeAttribute('aria-current');
                previouslyActive[0].classList.remove('selected');
            }

            this.classList.add('selected');
            this.setAttribute('aria-current', true);
            that._setActiveDescendant(this);
        }

        colorGroup.classList.add('grid-samples-container');
        colorGroup.setAttribute('role', 'menu');

        if (groupName) {
            colorGroup.setAttribute('aria-labelledby', that.id + groupName);
        }

        for (let i = 0; i < colorSamples.length; i++) {
            const colorSample = colorSamples[i];

            colorGroup.appendChild(colorSample);

            colorSample.onmouseenter = setActiveState;
            colorSample.onclick = setActiveState;

            colorSample.onmouseleave = function () {
                this.removeAttribute('aria-current');
                this.classList.remove('selected');
                that._setActiveDescendant(null);
            }
        }

        return colorGroup;
    }

    _createColorSamples(items) {
        const that = this;
        let colorSamples = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let label = item,
                value = item;

            if (typeof item === 'object') {
                label = item.label;
                value = item.value || label;
            }

            const colorSample = document.createElement('div');

            colorSample.id = that.id + 'Item' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            colorSample.setAttribute('data-label', label);
            colorSample.setAttribute('value', value);
            colorSample.setAttribute('role', 'menuitem');
            colorSample.setAttribute('aria-label', label);

            colorSample.classList.add('color-sample');
            colorSample.style.backgroundColor = label;

            if (label === 'rgba(255, 255, 255, 0)' || label === '#FFFFFF00' || label === 'transparent') {
                colorSample.setAttribute('transparent', '');
            }
            else {
                colorSample.removeAttribute('transparent');
            }

            colorSamples.push(colorSample);
        }

        if (colorSamples.length > 0 && !that.$.menu.querySelector('.selected')) {
            colorSamples[0].classList.add('selected');
            colorSamples[0].setAttribute('aria-current', true);
            that._setActiveDescendant(colorSamples[0]);
        }

        return colorSamples;
    }

    ensureVisible() {
        const that = this;
        const item = that.$.menu.querySelector('.color-sample.selected');

        if (!item) {
            return;
        }
    }

    _next() {
        const that = this;
        const active = that.$.menu.querySelector('.color-sample.selected');

        if (!active) {
            const first = that.$.menu.querySelector('.color-sample');

            first.classList.add('selected');
            first.setAttribute('aria-current', true);
            that._setActiveDescendant(first);
            return;
        }

        active.removeAttribute('aria-current');
        active.classList.remove('selected');

        let next = active.nextElementSibling;

        if (!next) {
            let colorSamplesContainer = active.parentElement.nextElementSibling;

            while (colorSamplesContainer) {
                if (colorSamplesContainer.classList.contains('grid-samples-container')) {
                    next = colorSamplesContainer.children[0];
                    break;
                }
                else {
                    colorSamplesContainer = colorSamplesContainer.nextElementSibling;
                }
            }

            if (!next) {
                next = that.$.menu.querySelector('.color-sample');
            }
        }

        next.classList.add('selected');
        next.setAttribute('aria-current', true);
        that._setActiveDescendant(next);
        that.ensureVisible();
    }

    _prev() {
        const that = this;
        const active = that.$.menu.querySelector('.color-sample.selected');

        if (!active) {
            const first = that.$.menu.querySelector('.color-sample');

            first.classList.add('selected');
            first.setAttribute('aria-current', true);
            that._setActiveDescendant(first);
            return;
        }

        active.removeAttribute('aria-current');
        active.classList.remove('selected');

        let prev = active.previousElementSibling;

        if (!prev) {
            let colorSamplesContainer = active.parentElement.previousElementSibling;

            while (colorSamplesContainer) {
                if (colorSamplesContainer.classList.contains('grid-samples-container')) {
                    prev = colorSamplesContainer.children[colorSamplesContainer.children.length - 1];
                    break;
                }
                else {
                    colorSamplesContainer = colorSamplesContainer.previousElementSibling;
                }
            }

            if (!prev) {
                prev = that.$.menu.querySelector('.grid-samples-container:last-of-type .color-sample:last-of-type');
            }
        }

        prev.classList.add('selected');
        prev.setAttribute('aria-current', true);
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
            case 37: // left arrow
            case 38: // up arrow
                event.preventDefault()
                that[that.rightToLeft ? '_next' : '_prev']();
                break
            case 39: // right arrow
            case 40: // down arrow
                event.preventDefault()
                that[that.rightToLeft ? '_prev' : '_next']();
                break
        }

        event.stopPropagation()
    }

    _inputSelectHandler() {
        const that = this;

        if (that.readonly) {
            that.$.input.selectionStart = that.$.input.selectionEnd;
        }
    }

    _keyDownHandler(event) {
        const that = this;

        that._suppressKeyPressRepeat = ![37, 38, 39, 40, 9, 13, 27, 16, 17, 18].includes(event.keyCode);

        if (event.shiftKey || event.ctrlKey) {
            return;
        }

        if (event.altKey) {
            if (event.key === 'ArrowUp') {
                that.close();
            }
            else if (event.key === 'ArrowDown') {
                that.open();
            }
            return;
        }

        that._move(event);
    }

    _keyUpHandler(event) {
        const that = this;

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }

        switch (event.keyCode) {
            case 40: // down arrow
            case 39: // right arrow
            case 38: // up arrow
            case 37: // left arrow
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
                    if (event.keyCode === 13) {
                        that.open();
                    }

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
                if (that.readonly) {
                    if (event.keyCode === 32 && !that.opened) {
                        that.open();
                    }

                    return;
                }

                that._lookup(event);

                if (that.opened && !event.ctrlKey && !event.shiftKey) {
                    event.stopPropagation()
                    event.preventDefault()
                }

                that.$.input.dataValue = that.$.input.value;

                if (!that._isValidColor(that.value)) {
                    that.$colorSampleContainer.addClass('no-color');
                    that.$.colorSample.setAttribute('aria-label', 'No color');
                    that.$.colorSample.style.backgroundColor = '';
                }
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
        else if (propertyName === 'readonly') {
            that._setAriaRelations();
        }
        else if (propertyName === 'theme') {
            that.$.scrollView.setAttribute(propertyName, newValue);
        }
        else if (propertyName === 'rightToLeft') {
            newValue ? that.$.scrollView.setAttribute('right-to-left', '') : that.$.scrollView.removeAttribute('right-to-left');
        }
        else if (propertyName === 'valueFormat') {
            that.value = that._formatValue(that.value);
            that.$.input.dataValue = that.value;
        }
        else if (propertyName === 'displayMode') {
            that.open();
        }
        else if (propertyName === 'value') {
            that.set('value', that.$.input.dataValue = that.$.colorSample.style.backgroundColor = that._formatValue(newValue));

            if (!that.value) {
                that.$colorSampleContainer.addClass('no-color');
            }
        }
    }

    /**
     * Called inside the render method of the Base class
     */
    _createElement() {
        const that = this,
            menu = document.createElement('div'),
            scrollView = document.createElement('div');

        scrollView.classList.add('lw-color-input-drop-down-menu', 'lw-color-panel');
        scrollView.setAttribute('theme', that.theme);
        that.$.scrollView = scrollView;

        that.rightToLeft ? that.$.scrollView.setAttribute('right-to-left', '') : that.$.scrollView.removeAttribute('right-to-left');

        that.$.menu = menu;
        that.$.menu.classList.add('default-samples-container', 'grid-mode-container', 'lw-container');

        that.$.scrollView.onclick = function (event) {
            event.stopPropagation()
            event.preventDefault()

            that._performSelect();
            that.$.input.focus();
        }

        that.classList.add('lw-drop-down-box', 'lw-color-picker');

        if (that.value) {
            that.$colorSampleContainer.removeClass('no-color');
            that.$.colorSample.setAttribute('aria-label', that.value);
        }
        else {
            that.$colorSampleContainer.addClass('no-color');
            that.$.colorSample.setAttribute('aria-label', 'No color');
        }

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
});