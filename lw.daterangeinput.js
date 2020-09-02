
LW('lw-date-range-input', class DateRangeInput extends LW.Input {
    // DateRangeInput's properties.
    static get properties() {
        return {
            'dateFormat': {
                type: 'object',
                value: { day: 'numeric', month: 'numeric', year: 'numeric' }
            },
            'dropDownHeight': {
                type: 'any',
                value: 'auto'
            },
            'icons': {
                type: 'boolean',
                value: false
            },
            'max': {
                value: new Date(2100, 1, 1),
                type: 'any',
                defaultValue: new Date(2100, 1, 1)
            },
            'messages': {
                value: {
                    'en': {
                        'done': 'Done',
                        'today': 'Today',
                        'clear': 'Clear',
                        'hours': 'Hours',
                        'minutes': 'Minutes',
                        'am': 'am',
                        'pm': 'pm'
                    }
                },
                type: 'object',
                extend: true
            },
            'min': {
                value: new Date(1900, 1, 1),
                type: 'any',
                defaultValue: new Date(1900, 1, 1)
            },
            'months': {
                value: 1,
                type: 'number',
                defaultValue: 1
            },
            'separator': {
                value: ' - ',
                type: 'string'
            },
            'timeFormat': {
                type: 'object',
                value: { hour: '2-digit', minute: '2-digit' }
            },
            'timepicker': {
                value: false,
                type: 'boolean'
            },
            'value': {
                type: 'any',
                value: '',
                validator: '_valueValidator'
            },
            'valueType': {
                allowedValues: ['string', 'object'],
                value: 'string',
                type: 'string'
            }
        };
    }

    /** Button's template. */
    template() {
        return '<div id="inputContainer" role="presentation"><input class="lw-input" id=\'input\' readonly=\'[[readonly]]\' placeholder=\'[[placeholder]]\' type=\'[[type]]\' name=\'[[name]]\' disabled=\'[[disabled]]\' aria-label="[[placeholder]]" /><span class="lw-hidden lw-hint" id="span">[[hint]]</span><div id="dropDownButton" tabindex=-1 class="lw-drop-down-button" role="button" aria-label="Toggle popup"><div id="arrow" class="arrow" aria-hidden="true"></div></div></div>';
    }

    static get listeners() {
        return {
            'input.change': '_changeHandler',
            'input.focus': '_focusHandler',
            'input.blur': '_blurHandler',
            'input.keydown': '_keyDownHandler',
            'input.keyup': '_keyUpHandler',
            'input.keypress': '_keyPressHandler',
            'dropDownButton.down': '_dropDownButtonDownHandler',
            'inputContainer.down': '_downHandler',
            'document.up': '_documentUpHandler'
        };
    }

    focus() {
        const that = this;

        that.$.input.focus();
    }

    select() {
        const that = this;

        if (!that.readonly) {
            that.$.input.select();
        }
        else {
            that.$.input.focus();
        }
    }

    _documentUpHandler(event) {
        const that = this;

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (that.contains(target)) {
            requestAnimationFrame(() => {
                const calendar = that.$.calendar;

                if (that.opened && calendar.selectedDates.length === 1 && !calendar._newRangeSelectionStarted) {
                    calendar._newRangeSelectionStarted = true;
                }
            })
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

    _changeHandler(event) {
        const that = this;

        event.stopPropagation();

        that._performSelect(undefined);
    }

    _focusHandler() {
        const that = this;

        that.setAttribute('focus', '');

        if (!that.readonly && that.minLength === 0 && that.$.input.value.length === 0 && !that._preventLookup) {
            return;
        }

        that.$.fireEvent('focus');

        delete that._preventLookup;
    }

    _blurHandler() {
        const that = this;

        if (!that.opened) {
            that.removeAttribute('focus');
        }

        that.$.fireEvent('blur');

        delete that._preventLookup;
    }

    _performSelect(event, noChangeEvent) {
        const that = this;
        let date = that.$.input.value.split(that.separator),
            dateFrom, dateTo, propertyChangedValue;

        if (event !== undefined && typeof event !== 'object') {
            propertyChangedValue = event;
            event = undefined;
        }

        let oldValue = that._oldValue ? that._oldValue :
            that._formatValue(propertyChangedValue !== undefined ? propertyChangedValue : that.value, 'string');

        if (event) {
            let timeFrom, timeTo;
            if (event.type) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (that.timepicker && that._timepicker) {
                timeFrom = that._timepicker._from;
                timeTo = that._timepicker._to;
            }

            date = event.detail.value.slice(0).sort((a, b) => a.getTime() - b.getTime());

            if (!date.length) {
                date = '';
            }
            else if (date.length === 1) {
                dateFrom = new Date(date[0]);

                if (timeFrom) {
                    dateFrom.setHours(timeFrom.hours, timeFrom.minutes);
                }

                date = [dateFrom];
            }
            else {
                dateFrom = new Date(date[0]);
                dateTo = new Date(date[date.length - 1]);

                if (timeFrom) {
                    dateFrom.setHours(timeFrom.hours, timeFrom.minutes);
                }

                if (timeTo) {
                    dateTo.setHours(timeTo.hours, timeTo.minutes);
                }

                date = [dateFrom, dateTo];
            }
        }
        else {
            date = that.$.input.value.split(that.separator);

            if (!date.length) {
                date = '';
            }
            else if (date.length === 1) {
                date = new Date(that.$.input.value.trim());

                if (isNaN(date.getTime())) {
                    date = '';
                }
                else {
                    dateFrom = new Date(date);
                    that._noCalendarChange = true;
                    that.$.calendar.selectedDates = [date];
                    date = [dateFrom];
                }
            }
            else {
                date = date.map(d => new Date(d)).filter(d => !isNaN(d.getTime()));
                date.sort((a, b) => a.getTime() - b.getTime());

                if (date.length) {
                    //Store selectedDates as a range in Calendar
                    let calendarDates = [];
                    let dateTemp = date[0];

                    dateFrom = new Date(date[0]);

                    if (date.length > 1) {
                        dateTo = date[date.length - 1];
                    }

                    calendarDates.push(new Date(dateTemp));

                    if (dateFrom && dateTo) {
                        const newDate = new Date(dateTemp);

                        dateTemp = new Date(newDate.setDate(newDate.getDate() + 1));

                        if (dateTemp.getTime() <= dateTo.getTime()) {
                            while (dateTemp.getTime() < dateTo.getTime() && (dateTemp.getDate() !== dateTo.getDate() ||
                                dateTemp.getMonth() !== dateTo.getMonth() || dateTemp.getFullYear() !== dateTo.getFullYear())) {
                                calendarDates.push(new Date(dateTemp));
                                dateTemp.setDate(dateTemp.getDate() + 1);
                            }

                            calendarDates.push(dateTemp);
                        }
                    }

                    that._noCalendarChange = true;
                    that.$.calendar.selectedDates = calendarDates;
                }
            }

            if ((!date || !date.length) && that.$.calendar.isRendered) {
                that._noCalendarChange = true;
                that.$.calendar.clearSelection();

                if (that._timepicker) {
                    that._timepicker.classList.add('lw-visibility-hidden');

                    const timepickerButtons = that.$.scrollView.querySelectorAll('.lw-timepicker-button');

                    for (let i = 0; i < timepickerButtons.length; i++) {
                        timepickerButtons[i].removeAttribute('selected');
                    }
                }
            }
        }

        if (that.timepicker && that._timepicker) {
            if (dateFrom) {
                that._timepicker._from = { hours: dateFrom.getHours(), minutes: dateFrom.getMinutes() };
            }

            if (dateTo) {
                that._timepicker._to = { hours: dateTo.getHours(), minutes: dateTo.getMinutes() };
            }
        }

        const timeFromButton = that.$.scrollView.querySelector('.lw-timepicker-button.from'),
            timeToButton = that.$.scrollView.querySelector('.lw-timepicker-button.to');

        if (timeFromButton) {
            if (dateFrom && !isNaN(dateFrom.getTime())) {
                timeFromButton.textContent = dateFrom.toLocaleTimeString(that.locale, that.timeFormat);
            }
            else {
                timeFromButton.textContent = '';
            }
        }

        if (timeToButton) {
            if (dateTo && !isNaN(dateTo.getTime())) {
                timeToButton.textContent = dateTo.toLocaleTimeString(that.locale, that.timeFormat);
            }
            else {
                timeToButton.textContent = '';
            }
        }

        that.set('value', that.$.input.value = that._oldValue = date = that._formatDate(date));

        if (!noChangeEvent && date !== oldValue) {
            that.$.fireEvent('change', { value: that._formatValue(date), label: date, oldValue: that._formatValue(oldValue), oldLabel: oldValue });
        }

        delete that._noCalendarChange;
    }

    _formatValue(value, type) {
        const that = this;

        if (!type) {
            type = that.valueType;
        }

        if (type === 'string' && typeof value === 'string' || type === 'object' && value.from) {
            return value;
        }

        let dateFrom, dateTo, date;

        if (Array.isArray(value)) {
            dateFrom = value[0];
            dateTo = value[value.length - 1];
        }
        else if (typeof value === 'object') {
            dateFrom = value.from;
            dateTo = value.to;
        }
        else {
            date = value.split(that.separator);

            if (date.length) {
                date = date.map(d => new Date(d)).filter(d => !isNaN(d.getTime()));
                date.sort((a, b) => a.getTime() - b.getTime());

                dateFrom = date[0];
                dateTo = date[date.length - 1];
            }
        }

        if (type === 'string') {
            return that._formatDate([dateFrom, dateTo]);
        }
        else {
            return { from: new Date(dateFrom), to: new Date(dateTo) };
        }
    }

    _formatDate(date) {
        const that = this;

        if (!date) {
            return '';
        }

        if (date instanceof Date) {
            date = [date];
        }

        date = date.filter(d => d !== undefined);

        if (that.timepicker) {
            date = date.map(d => new Date(d).toLocaleString(that.locale, Object.assign({}, that.dateFormat, that.timeFormat)));
        }
        else {
            date = date.map(d => new Date(d).toLocaleDateString(that.locale, that.dateFormat));
        }

        return date.length === 1 ? date[0] : date.join(that.separator);
    }

    _open() {
        const that = this;
        const rect = that.getBoundingClientRect(),
            scrollX = window.scrollX,
            scrollY = window.scrollY;
        let xCorrection = 0,
            yCorrection = 0;

        if (this.opened) {
            return;
        }

        if (that.timer) {
            clearTimeout(that.timer);
        }

        document.body.appendChild(that.$.scrollView);

        that.setAttribute('aria-owns', that.$.scrollView.id);

        if (!that.readonly) {
            that.$.input.setAttribute('aria-controls', that.$.scrollView.id);
        }

        if (that.$.scrollView.enableShadowDOM && !that._importedStyle) {
            that.$.scrollView.importStyle(that._getStyleUrl('lw.textbox.css'));
            that._importedStyle = true;
        }

        if (getComputedStyle(document.body).position !== 'static') {
            const bodyRect = document.body.getBoundingClientRect();

            xCorrection = bodyRect.left;
            yCorrection = bodyRect.top;
        }

        that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', '');
        that.$.scrollView.style.left = -3 + rect.left + scrollX - xCorrection + 'px';
        that.$.scrollView.style.top = rect.bottom + scrollY - yCorrection + 1 + 'px';
        that.$.scrollView.classList.remove('open');


        that.$.scrollView.onpointerdown = function () {
            that._isPointerDown = true;
        }

        requestAnimationFrame(function () {
            const dropDownWidth = that.dropDownWidth,
                calendar = that.$.calendar;

            that.$.scrollView.setAttribute('open', '');
            that.setAttribute('open', '');
            that.$.dropDownButton.setAttribute('open', '');
            that.$.input.setAttribute('open', '');

            if (dropDownWidth && typeof dropDownWidth === 'string' && dropDownWidth.indexOf('%') !== -1) {
                const fraction = parseFloat(dropDownWidth) / 100;

                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', that.offsetWidth * fraction + 'px');
                calendar.style.width = '100%';
            }
            else if (dropDownWidth !== 'auto' && dropDownWidth) {
                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', parseFloat(dropDownWidth) + 'px');
                calendar.style.width = '100%';
            }
            else if (dropDownWidth === 'auto') {
                calendar.style.width = null;
                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', 'auto');
            }
            else {
                calendar.style.width = null;

                let menuWidth = calendar.offsetWidth;

                that.$.scrollView.style.setProperty('--lw-input-drop-down-menu-width', Math.max(menuWidth, that.offsetWidth - 8) + 'px');
            }
        });

        this.opened = true;
    }

    close() {
        const that = this;

        if (!that.opened) {
            return false;
        }

        if (that.timer) {
            clearTimeout(that.timer);
        }

        that.timer = setTimeout(function () {
            if (that.$.scrollView.parentNode && !that.opened) {
                document.body.removeChild(that.$.scrollView);
                that.removeAttribute('aria-owns');

                if (!that.readonly) {
                    that.$.input.removeAttribute('aria-controls');
                }
            }
        }, 1000);

        if (that._timepicker) {
            that._timepicker.classList.add('lw-visibility-hidden');

            const timepickerButtons = that.$.scrollView.querySelectorAll('.lw-timepicker-button');

            for (let i = 0; i < timepickerButtons.length; i++) {
                timepickerButtons[i].removeAttribute('selected');
            }
        }

        that.$.scrollView.removeAttribute('open');
        that.$.dropDownButton.removeAttribute('open');
        that.$.input.removeAttribute('open');
        that.removeAttribute('open');

        that.opened = false;
        return true;
    }

    _lookup() {

    }

    _downHandler(event) {
        const that = this;

        if (that.readonly) {
            that._dropDownButtonDownHandler(event);
        }
    }

    _dropDownButtonDownHandler(event) {
        const that = this;

        that._toggle();

        event.preventDefault();
        event.stopPropagation();

        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();

        return false;
    }

    _toggle() {
        const that = this;

        if (that.opened) {
            that.close();
        }
        else {
            that.open();
        }
    }

    open() {
        const that = this;

        //Set date
        that._process();

        that.$.input.focus();

        setTimeout(function () {
            that.$.input.focus();
        }, 25);
    }

    _process() {
        const that = this;

        that._performSelect(undefined, true);
        that._open();
    }

    _matcher() {

    }

    _sorter() {

    }

    _highlighter() {

    }

    _render() {
    }

    ensureVisible() {

    }

    _next() {

    }

    _prev() {

    }

    _move(event) {
        event.stopPropagation()
    }

    _keyDownHandler(event) {
        const that = this;

        that._suppressKeyPressRepeat = ![40, 38, 9, 13, 27, 16, 17, 18].includes(event.keyCode);

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }
    }

    _keyPressHandler(event) {
        const that = this;

        if (that._suppressKeyPressRepeat) {
            return;
        }

        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return;
        }
    }

    _keyUpHandler(event) {
        const that = this;

        if (event.shiftKey) {
            return;
        }

        switch (event.keyCode) {
            case 40: // down arrow
            case 38: // up arrow
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
            case 27: // escape
                if (!that.opened) {
                    return;
                }

                that.close();
                event.stopPropagation()
                event.preventDefault()
                break
        }

    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'value':
                that.$.input.value = that._formatValue(newValue, 'string');
                that._performSelect(oldValue);
                break;
            case 'month':
            case 'min':
            case 'max':
                that.$.calendar[propertyName] = newValue;
                break;
            case 'theme':
            case 'rightToLeft':
            case 'animation':
            case 'inverted':
                that.$.calendar[propertyName] = newValue;

                if (newValue) {
                    that.$.scrollView.setAttribute(LW.Utilities.Core.toDash(propertyName), typeof newValue === 'boolean' ? '' : newValue);
                }
                else {
                    that.$.scrollView.removeAttribute(LW.Utilities.Core.toDash(propertyName));
                }
                break;
            case 'timepicker':
            case 'icons':
                newValue ? that.$.scrollView.setAttribute(propertyName, '') : that.$.scrollView.removeAttribute(propertyName);

                //Show/Hide Time
                that._performSelect(undefined);

                if (!newValue && that._timepicker) {
                    that._timepicker.classList.add('lw-visibility-hidden');
                    that._timepicker.remove();

                    const timepickerButtons = that.$.scrollView.querySelectorAll('.lw-timepicker-button');

                    for (let i = 0; i < timepickerButtons.length; i++) {
                        timepickerButtons[i].removeAttribute('selected');
                    }
                }

                break;
            case 'locale':
                {
                    const todayIcon = that.$.calendar.querySelector('.lw-icon-today'),
                        clearIcon = that.$.calendar.querySelector('.lw-icon-clear');

                    if (todayIcon) {
                        todayIcon.innerHTML = that.localize('today');
                    }

                    if (clearIcon) {
                        todayIcon.innerHTML = that.localize('clear');
                    }

                    that._performSelect(undefined, true);
                    that.$.calendar.locale = newValue;
                    break;
                }
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    _createElement() {
        const that = this;
        const scrollView = document.createElement('div');
        const calendar = document.createElement('lw-calendar'),
            footerTemplate = document.createElement('template');

        scrollView.classList.add('lw-input-drop-down-menu', 'lw-date-range-input-drop-down-menu');

        scrollView.setAttribute('animation', that.animation);
        scrollView.setAttribute('role', 'presentation');

        that.rightToLeft ? scrollView.setAttribute('right-to-left', '') : scrollView.removeAttribute('right-to-left');
        that.inverted ? scrollView.setAttribute('inverted', '') : scrollView.removeAttribute('inverted');

        scrollView.onclick = function (event) {
            event.stopPropagation();
            event.preventDefault();

            const target = event.target;

            that.$.input.focus();

            const timepickerButton = target.closest('.lw-timepicker-button');

            if (timepickerButton) {
                const timepickerButtons = scrollView.querySelectorAll('.lw-timepicker-button');

                for (let i = 0; i < timepickerButtons.length; i++) {
                    timepickerButtons[i].removeAttribute('selected');
                }

                if (target.closest('.lw-icon-clear')) {
                    that.$.calendar.clearSelection();

                    if (that._timepicker) {
                        that._timepicker.classList.add('lw-visibility-hidden');

                        const timepickerButtons = that.$.scrollView.querySelectorAll('.lw-timepicker-button');

                        for (let i = 0; i < timepickerButtons.length; i++) {
                            timepickerButtons[i].removeAttribute('selected');
                            timepickerButtons[i].setAttribute('aria-selected', false);

                        }
                    }

                    return;
                }

                if (target.closest('.lw-icon-today')) {
                    that.$.calendar.today();
                    return;
                }

                timepickerButton.setAttribute('selected', '');
                that._toggleTimepicker(event);
                return;
            }

            if (target.closest('lw-done-button')) {
                that.close();
                return;
            }

            if (target.closest('.lw-timepicker')) {
                that._handleTimeSelection(target.closest('.lw-calendar-cell'));
                return;
            }
        }

        Object.defineProperty(that, 'value', {
            get: function () {
                return that._formatValue(that.properties.value.value);

            },
            set(value) {
                that.updateProperty(that, that._properties.value, value);
            }
        });

        if (!scrollView.id) {
            const elementName = scrollView.tagName.toLowerCase();

            scrollView.id = elementName.slice(0, 1).toLowerCase() + elementName.slice(1) +
                Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        that.$.scrollView = scrollView;

        that.classList.add('lw-input');

        calendar.theme = that.theme;
        calendar.unfocusable = true;
        calendar.rightToLeft = that.rightToLeft;
        calendar.animation = that.animation;
        calendar.months = that.months;
        calendar.max = that.max;
        calendar.min = that.min;
        calendar.locale = that.locale;
        calendar.viewSections = ['header', 'footer'];
        calendar.selectionMode = 'range';

        if (that.button) {
            scrollView.setAttribute('button', '');
        }

        if (that.timepicker) {
            scrollView.setAttribute('timepicker', '');
        }

        if (that.icons) {
            scrollView.setAttribute('icons', '');
        }

        if (!that.$.calendar) {
            calendar.$.listen('change', () => {
                if (that._noCalendarChange) {
                    delete that._noCalendarChange;
                    return;
                }

                that._performSelect(event);
            });
        }

        footerTemplate.innerHTML = `
        <div class="lw-date-range-input-footer-controls">
            <div class="lw-timepicker-buttons">
                <div class="lw-timepicker-button from"></div>
                <div class="lw-timepicker-button to"></div>
            </div>
            <div class="lw-button-controls">
                <div class="lw-icon-today lw-timepicker-button">${that.localize('today')}</div>
                <div class="lw-icon-clear lw-timepicker-button">${that.localize('clear')}</div>
            </div>
        </div>`;

        calendar.footerTemplate = footerTemplate;
        that.$.calendar = calendar;

        scrollView.appendChild(that.$.calendar);
    }

    _toggleTimepicker(event) {
        const that = this;

        if (!that.timepicker) {
            if (that._timepicker) {
                that._timepicker.classList.add('lw-visibility-hidden');
                that._timepicker.remove();
            }

            return;
        }

        if (!that._timepicker) {
            const timepicker = document.createElement('div');

            timepicker.innerHTML = `
                <div class="hour-selection lw-calendar-week" role="row"><div class="header" role="rowheader"></div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="0">12</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="1">01</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="2">02</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="3">03</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="4">04</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="5">05</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="6">06</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="7">07</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="8">08</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="9">09</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="10">10</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="11">11</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="12" pm>12</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="13" pm>01</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="14" pm>02</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="15" pm>03</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="16" pm>04</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="17" pm>05</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="18" pm>06</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="19" pm>07</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="20" pm>08</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="21" pm>09</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="22" pm>10</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="23" pm>11</div>
                </div>
                <div class="minute-selection lw-calendar-week" role="row"><div class="header" role="rowheader"></div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="0">00</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="5">05</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="10">10</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="15">15</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="20">20</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="25">25</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="30">30</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="35">35</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="40">40</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="45">45</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="50">50</div>
                    <div class="lw-calendar-cell" role="gridcell" aria-selected="false" value="55">55</div>
                </div>`;

            timepicker.classList.add('lw-timepicker', 'lw-calendar', 'lw-visibility-hidden');
            timepicker.setAttribute('role', 'grid');

            //Handle hover
            if (!LW.Utilities.Core.isMobile) {
                timepicker.onmouseover = function (event) {
                    const timepickerCell = event.target.closest('.lw-calendar-cell');

                    if (timepickerCell) {
                        timepickerCell.setAttribute('hover', '');
                    }
                }

                timepicker.onmouseout = function (event) {
                    const timepickerCell = event.target.closest('.lw-calendar-cell');

                    if (timepickerCell) {
                        timepickerCell.removeAttribute('hover');
                    }
                }
            }

            that._timepicker = timepicker;

            //Set the initial timeFrom and timeTo
            const selectedDates = that.$.calendar.selectedDates;

            if (selectedDates.length) {
                let timeFrom, timeTo, dateFrom, dateTo;

                if (selectedDates.length === 1) {
                    dateFrom = selectedDates[0];
                    timeFrom = { hours: dateFrom.getHours(), minutes: dateFrom.getMinutes() };
                }
                else if (selectedDates.length > 1) {
                    dateFrom = selectedDates[0];
                    dateTo = selectedDates[selectedDates.length - 1];
                    timeFrom = { hours: dateFrom.getHours(), minutes: dateFrom.getMinutes() };
                    timeTo = { hours: dateTo.getHours(), minutes: dateTo.getMinutes() };
                }

                if (timeFrom) {
                    that._timepicker._from = timeFrom;
                }

                if (timeTo) {
                    that._timepicker._to = timeTo;
                }
            }
        }

        //Lozalize the labels and position the timepicker
        const hourSelection = that._timepicker.querySelector('.hour-selection'),
            minuteSelection = that._timepicker.querySelector('.minute-selection'),
            calendar = that.$.calendar;

        hourSelection.setAttribute('am-label', that.localize('am'));
        hourSelection.setAttribute('pm-label', that.localize('pm'));

        hourSelection.querySelector('.header').textContent = that.localize('hours');
        minuteSelection.querySelector('.header').textContent = that.localize('minutes');

        that._timepicker.style.top = calendar.offsetTop + 'px';
        that._timepicker.style.left = calendar.offsetLeft + 'px';
        that._timepicker.style.width = calendar.offsetWidth + 'px';

        const oldRangeType = that._timepicker._rangeType;

        delete that._timepicker._rangeType;

        const timepickerButton = event.target.closest('.lw-timepicker-button'),
            rangeType = timepickerButton.classList.contains('from') ? 'from' : 'to';

        if (timepickerButton) {
            that._timepicker._rangeType = rangeType;
        }

        //Referesh the time selection
        Array.from(that._timepicker.querySelectorAll('div[selected]')).map(i => {
            i.removeAttribute('selected');
            i.setAttribute('aria-selected', false);
        });

        const targetTime = that._timepicker[`_${rangeType}`];

        if (targetTime) {
            const targetCells = that._timepicker.querySelectorAll(`.hour-selection div[value="${targetTime.hours}"], .minute-selection div[value="${targetTime.minutes}"]`);

            for (let i = 0; i < targetCells.length; i++) {
                const cell = targetCells[i];

                if (cell) {
                    cell.setAttribute('selected', true);
                    cell.setAttribute('aria-selected', true);
                }
            }
        }

        const isTimepickerHidden = that._timepicker.classList.contains('lw-visibility-hidden')

        if (!isTimepickerHidden && oldRangeType && oldRangeType !== rangeType) {
            return;
        }

        const isInDom = that._timepicker.parentElement;

        if (!isInDom) {
            that.$.scrollView.appendChild(that._timepicker);
        }

        if (isTimepickerHidden) {
            if (!isInDom) {
                requestAnimationFrame(() => that._timepicker.classList.remove('lw-visibility-hidden'));
            }
            else {
                that._timepicker.classList.remove('lw-visibility-hidden');
            }
        }
        else {
            that._timepicker.classList.add('lw-visibility-hidden');

            const timepickerButtons = that.$.scrollView.querySelectorAll('.lw-timepicker-button');

            for (let i = 0; i < timepickerButtons.length; i++) {
                timepickerButtons[i].removeAttribute('selected');
                timepickerButtons[i].setAttribute('aria-selected', false);
            }
        }
    }

    _handleTimeSelection(target, noChangeEvent) {
        const that = this;

        if (!target) {
            return;
        }

        if (target.closest('.hour-selection')) {
            Array.from(that._timepicker.querySelectorAll('.hour-selection div[selected]')).map(i => {
                i.removeAttribute('selected');
                i.setAttribute('aria-selected', false);
            });
        }
        else {
            Array.from(that._timepicker.querySelectorAll('.minute-selection div[selected]')).map(i => {
                i.removeAttribute('selected');
                i.setAttribute('aria-selected', false);
            });
        }

        target.setAttribute('selected', true);
        target.setAttribute('aria-selected', true);

        const rangeType = that._timepicker._rangeType;

        if (!rangeType) {
            return;
        }

        let targetTime = that._timepicker[`_${rangeType}`],
            [hours, minutes] = targetTime ? [targetTime.hours, targetTime.minutes] : [0, 0];

        if (target.closest('.hour-selection')) {
            //Handle hour selection
            hours = parseInt(target.getAttribute('value')) || 0;
        }
        else {
            //Handle minutes selection
            minutes = parseInt(target.getAttribute('value')) || 0;
        }

        that._timepicker[`_${rangeType}`] = { hours: hours, minutes: minutes };

        const selectedDates = that.$.calendar.selectedDates;

        if (!selectedDates.length) {
            return;
        }

        //Update the value
        that._performSelect({ detail: { value: selectedDates }, noChangeEvent });
    }

    _valueValidator(oldValue, newValue) {
        const that = this;

        if ((that.valueType === 'object' && newValue.from) || typeof newValue === 'string') {
            return newValue;
        }

        return that.valueType === 'object' ? {} : ''
    }

    _refreshMenu() { }

    _setAriaRelations() {
        const that = this,
            label = that.getAttribute('aria-label');

        if (that.readonly) {
            that.setAttribute('role', 'button');

            if (!label && that.placeholder) {
                that.setAttribute('aria-label', that.placeholder);
            }

            that.removeAttribute('aria-readonly');
            that.$.input.setAttribute('aria-hidden', true);
            that.$.input.removeAttribute('aria-controls');
            that.$.dropDownButton.setAttribute('aria-hidden', true);
        }
        else {
            that.setAttribute('role', 'presentation');

            if (label && label === that.placeholder) {
                that.removeAttribute('aria-label');
            }

            that.$.input.removeAttribute('aria-hidden');
            that.$.dropDownButton.removeAttribute('aria-hidden');
        }

        that.setAttribute('aria-haspopup', 'dialog');
        that.$.scrollView.setAttribute('role', 'dialog');
    }

    _setActiveDescendant() { }
    _setInputPurpose() { }
});
