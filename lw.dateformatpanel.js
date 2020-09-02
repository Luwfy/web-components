
/*
 * Class DateFormatPanel
 * */
LW.Utilities.Assign('DateFormatPanel', class DateFormatPanel {

    constructor(formatVariants, inputDateTimeFormats, customDateTimeSelector, locale = 'en', messages = '') {
        const that = this;

        if (formatVariants) {

            that.formatVariants = formatVariants;
            that.inputDateTimeFormats = inputDateTimeFormats;
            that.value = ''; // Return format
            that.customDateTimeContainer = document.querySelector(customDateTimeSelector); // All the content holder

            // Sets localization settings
            that._setLocalizationSettings(locale, messages);

            // Holdes all lw inputs
            that._initLWInputHolder();

            // 'Add format' holder
            that._initAddMoreFormatsButton();

            // 'Clickable date time format' holder
            that._initDateTimeFormatHolder();
        }
    }

    /**
     * Set default localization settings
     */
    _setLocalizationSettings(locale, messages) {
        const that = this;

        that.locale = locale;
        that.messages = messages;

        // Sets default locale && messages
        that.defaultLocale = 'en';
        that.defaultMessages = {
            'en': {
                'apply': 'apply',
                'date': 'date',
                'time': 'time',
                'day': 'day',
                'month': 'month',
                'year': 'year',
                'hours': 'hours',
                'hour': 'hour',
                'minutes': 'minutes',
                'minute': 'minute',
                'seconds': 'seconds',
                'second': 'second',
                'milliseconds': 'milliseconds',
                'ampm': 'am/pm',
                'delete': 'delete'
            },
        };

        // If messages not passed - get default
        if (!that.messages) {
            that.messages = that.defaultMessages;
        }

        // If passed invalid language
        if (!that.messages[that.locale]) {
            if (that.messages[that.defaultLocale]) {
                that.locale = that.defaultLocale;
            }
            else {
                that.messages = that.defaultMessages;
                that.locale = that.defaultLocale;
            }
        }
    }

    /*
     * Creates the main holders
     */
    _initLWInputHolder() {
        const that = this;

        that.lwInputButtonsElementsHolder = document.createElement('div');
        that.lwInputButtonsElementsHolder.classList.add('lw-input-buttons-elements-holder');

        that.borderHolder = document.createElement('div');
        that.borderHolder.classList.add('lw-input-and-add-formats-holder');

        // lwInputListHolder - Holdes all lw inputs
        that.lwInputHolder = document.createElement('div');
        that.lwInputHolder.classList.add('lw-input-list-holder');
        that.borderHolder.appendChild(that.lwInputHolder);
        that.lwInputButtonsElementsHolder.appendChild(that.borderHolder);
        that.customDateTimeContainer.prepend(that.lwInputButtonsElementsHolder);
    }

    /*
     * Creates 'Add format' and 'Apply' buttons
     */
    _initAddMoreFormatsButton() {
        const that = this;

        // lw-drop-down-button.add-format-holder
        that.addFormatHolder = document.createElement('lw-drop-down-button');
        that.addFormatHolder.setAttribute('drop-down-width', 'auto');
        that.addFormatHolder.placeholder = '';
        that.addFormatHolder.classList.add('add-format-holder');
        that.addFormatHolder.classList.add('lw-hidden');


        // div.all-format-holders
        let allFormatHolders = document.createElement('div');
        allFormatHolders.classList.add('all-format-holders');

        // div.format-holder
        let formatHolder = document.createElement('div');
        formatHolder.classList.add('format-holder');

        //span
        let formatHolderSpan = document.createElement('span');
        formatHolderSpan.innerHTML = that.messages[that.locale].date ? that.messages[that.locale].date.toUpperCase() : that.defaultMessages[that.defaultLocale].date.toUpperCase();

        formatHolderSpan.classList.add('bold');
        formatHolder.appendChild(formatHolderSpan);

        //lw-button 
        let addDayFormatBtn = document.createElement('lw-button');
        addDayFormatBtn.innerHTML = that.messages[that.locale].day ? that.messages[that.locale].day.charAt(0).toUpperCase() + that.messages[that.locale].day.slice(1) : that.defaultMessages[that.defaultLocale].day.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].day.slice(1);
        that.addDayFormatClassName = 'add-day-format';
        addDayFormatBtn.classList.add(that.addDayFormatClassName);
        addDayFormatBtn.classList.add('flat');
        addDayFormatBtn.classList.add('text-tramsform-none');
        const addDayFormatFunction = () => that.addNewFormat('dd');
        addDayFormatBtn.addEventListener('click', addDayFormatFunction);
        addDayFormatBtn[that.addDayFormatClassName] = addDayFormatFunction;
        formatHolder.appendChild(addDayFormatBtn);

        //lw-button 
        let addMonthFormatBtn = document.createElement('lw-button');
        addMonthFormatBtn.innerHTML = that.messages[that.locale].month ? that.messages[that.locale].month.charAt(0).toUpperCase() + that.messages[that.locale].month.slice(1) : that.defaultMessages[that.defaultLocale].month.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].month.slice(1);
        that.addMonthFormatClassName = 'add-month-format';
        addMonthFormatBtn.classList.add(that.addMonthFormatClassName);
        addMonthFormatBtn.classList.add('flat');
        addMonthFormatBtn.classList.add('text-tramsform-none');
        const addMonthFormatFunction = () => that.addNewFormat('MM');
        addMonthFormatBtn.addEventListener('click', addMonthFormatFunction);
        addMonthFormatBtn[that.addMonthFormatClassName] = addMonthFormatFunction;
        formatHolder.appendChild(addMonthFormatBtn);

        //lw-button 
        let addYearFormatBtn = document.createElement('lw-button');
        addYearFormatBtn.innerHTML = that.messages[that.locale].year ? that.messages[that.locale].year.charAt(0).toUpperCase() + that.messages[that.locale].year.slice(1) : that.defaultMessages[that.defaultLocale].year.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].year.slice(1);
        that.addYearFormatClassName = 'add-year-format';
        addYearFormatBtn.classList.add(that.addYearFormatClassName);
        addYearFormatBtn.classList.add('flat');
        addYearFormatBtn.classList.add('text-tramsform-none');
        const addYearFormatFunction = () => that.addNewFormat('yyyy');
        addYearFormatBtn.addEventListener('click', addYearFormatFunction);
        addYearFormatBtn[that.addYearFormatClassName] = addYearFormatFunction;
        formatHolder.appendChild(addYearFormatBtn);

        allFormatHolders.appendChild(formatHolder);


        // div.format-holder
        formatHolder = document.createElement('div');
        formatHolder.classList.add('format-holder');

        //span
        formatHolderSpan = document.createElement('span');
        formatHolderSpan.innerHTML = that.messages[that.locale].time ? that.messages[that.locale].time.toUpperCase() : that.defaultMessages[that.defaultLocale].time.toUpperCase();
        formatHolderSpan.classList.add('bold');
        formatHolder.appendChild(formatHolderSpan);

        //lw-button 
        let addHourFormatBtn = document.createElement('lw-button');
        addHourFormatBtn.innerHTML = that.messages[that.locale].hours ? that.messages[that.locale].hours.charAt(0).toUpperCase() + that.messages[that.locale].hours.slice(1) : that.defaultMessages[that.defaultLocale].hours.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].hours.slice(1);
        that.addHourFormatClassName = 'add-hour-format';
        addHourFormatBtn.classList.add(that.addHourFormatClassName);
        addHourFormatBtn.classList.add('flat');
        addHourFormatBtn.classList.add('text-tramsform-none');
        const addHourFormatFunction = () => that.addNewFormat('HH');
        addHourFormatBtn.addEventListener('click', addHourFormatFunction);
        addHourFormatBtn[that.addHourFormatClassName] = addHourFormatFunction
        formatHolder.appendChild(addHourFormatBtn);

        //lw-button 
        let addMinutesFormatBtn = document.createElement('lw-button');
        addMinutesFormatBtn.innerHTML = that.messages[that.locale].minutes ? that.messages[that.locale].minutes.charAt(0).toUpperCase() + that.messages[that.locale].minutes.slice(1) : that.defaultMessages[that.defaultLocale].minutes.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].minutes.slice(1);
        that.addMinutesFormatClassName = 'add-minute-format';
        addMinutesFormatBtn.classList.add(that.addMinutesFormatClassName);
        addMinutesFormatBtn.classList.add('flat');
        addMinutesFormatBtn.classList.add('text-tramsform-none');
        const addMinutesFormatFunction = () => that.addNewFormat('mm');
        addMinutesFormatBtn.addEventListener('click', addMinutesFormatFunction);
        addMinutesFormatBtn[that.addMinutesFormatClassName] = addMinutesFormatFunction;
        formatHolder.appendChild(addMinutesFormatBtn);

        //lw-button 
        let addSecondFormatBtn = document.createElement('lw-button');
        addSecondFormatBtn.innerHTML = that.messages[that.locale].seconds ? that.messages[that.locale].seconds.charAt(0).toUpperCase() + that.messages[that.locale].seconds.slice(1) : that.defaultMessages[that.defaultLocale].seconds.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].seconds.slice(1);
        that.addSecondFormatClassName = 'add-second-format';
        addSecondFormatBtn.classList.add(that.addSecondFormatClassName);
        addSecondFormatBtn.classList.add('flat');
        addSecondFormatBtn.classList.add('text-tramsform-none');
        const addSecondFormatFunction = () => that.addNewFormat('ss');
        addSecondFormatBtn.addEventListener('click', addSecondFormatFunction);
        addSecondFormatBtn[that.addSecondFormatClassName] = addSecondFormatFunction;
        formatHolder.appendChild(addSecondFormatBtn);

        //lw-button 
        let addMillisecondFormatBtn = document.createElement('lw-button');
        addMillisecondFormatBtn.innerHTML = that.messages[that.locale].milliseconds ? that.messages[that.locale].milliseconds.charAt(0).toUpperCase() + that.messages[that.locale].milliseconds.slice(1) : that.defaultMessages[that.defaultLocale].milliseconds.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].milliseconds.slice(1);
        that.addMillisecondFormatClassName = 'add-millisecond-format';
        addMillisecondFormatBtn.classList.add(that.addMillisecondFormatClassName);
        addMillisecondFormatBtn.classList.add('flat');
        addMillisecondFormatBtn.classList.add('text-tramsform-none');
        const addMillisecondFormatFunction = () => that.addNewFormat('fff');
        addMillisecondFormatBtn.addEventListener('click', addMillisecondFormatFunction);
        addMillisecondFormatBtn[that.addMillisecondFormatClassName] = addMillisecondFormatFunction;
        formatHolder.appendChild(addMillisecondFormatBtn);

        //lw-button 
        let addAmPmFormatBtn = document.createElement('lw-button');
        addAmPmFormatBtn.innerHTML = that.messages[that.locale].ampm ? that.messages[that.locale].ampm.toUpperCase() : that.defaultMessages[that.defaultLocale].ampm.toUpperCase();
        that.addAmPmFormatClassName = 'add-ampm-format';
        addAmPmFormatBtn.classList.add(that.addAmPmFormatClassName);
        addAmPmFormatBtn.classList.add('flat');
        addAmPmFormatBtn.classList.add('text-tramsform-none');
        const addAmPmFormatFunction = () => that.addNewFormat('tt');
        addAmPmFormatBtn.addEventListener('click', addAmPmFormatFunction);
        addAmPmFormatBtn[that.addAmPmFormatClassName] = addAmPmFormatFunction;
        formatHolder.appendChild(addAmPmFormatBtn);


        allFormatHolders.appendChild(formatHolder);


        that.addFormatHolder.appendChild(allFormatHolders);
        that.borderHolder.appendChild(that.addFormatHolder);
        that.lwInputButtonsElementsHolder.appendChild(that.borderHolder);

        // Apply button
        // lw-button.use-format-button
        let applyButton = document.createElement('lw-button');
        applyButton.classList.add('use-format-button');
        applyButton.disabled = true;
        applyButton.classList.add('success');
        applyButton.innerHTML = that.messages[that.locale].apply ? that.messages[that.locale].apply : that.defaultMessages[that.defaultLocale].apply;
        // Sets value on apply
        const getFormatFunction = () => that.value = that.getFormat();
        applyButton.addEventListener('click', getFormatFunction);
        applyButton['apply-button-event-listener'] = getFormatFunction;

        that.useThisFormatHolder = applyButton;
        that.lwInputButtonsElementsHolder.appendChild(that.useThisFormatHolder)
        that.customDateTimeContainer.appendChild(that.lwInputButtonsElementsHolder);
    }


    /*
     * Sets the custom datetime format as clickable li's with click event listeners
     * */
    _initDateTimeFormatHolder() {
        const that = this;

        let dateTimeFormatHolder = document.createElement('div');

        const currentDate = new Date();
        that.currentDate = currentDate;
        that.dateTime = new LW.Utilities.DateTime(that.currentDate);

        // DateTime localization
        const localizedNames = LW.Utilities.DateTime.getLocalizedNames(that.locale);
        that.dateTime.calendar.days = localizedNames.days;
        that.dateTime.calendar.months = localizedNames.months;
        that.dateTime.calendar.locale = that.locale;


        // ul.date-time-format-list
        let dateTimeFormatList = document.createElement('ul');
        dateTimeFormatList.classList.add('date-time-format-list');

        for (let i = 0; i < that.inputDateTimeFormats.length; i++) {
            // li.date-time-format
            let dateTimeFormatElement = document.createElement('li');
            dateTimeFormatElement.classList.add('date-time-format');

            let dateTimeFullFormat = that.inputDateTimeFormats[i];
            let currentDateInCurrentDateTimeFormat = that.dateTime.toString(dateTimeFullFormat);

            // Set current date as value
            dateTimeFormatElement.innerHTML = currentDateInCurrentDateTimeFormat;
            dateTimeFormatElement.dataset.fullFormat = dateTimeFullFormat;

            // Add click listener on each format
            const addFormatFunction = () => that.addNewFormat(dateTimeFormatElement);
            dateTimeFormatElement.addEventListener('click', addFormatFunction);
            dateTimeFormatElement['date-time-format-' + dateTimeFullFormat] = addFormatFunction;

            dateTimeFormatList.appendChild(dateTimeFormatElement);

            if (i === 0) {
                that.addNewFormat(dateTimeFormatElement);
            }
        }

        dateTimeFormatHolder.appendChild(dateTimeFormatList);
        that.customDateTimeContainer.appendChild(dateTimeFormatHolder);
    }


    /**
  * Detach public method for removing event listeners
  * */
    detach() {
        const that = this;
        that._removeEventListeners();
    }


    /**
 * Remove event listeners
 * */

    _removeEventListeners() {
        const that = this;

        // Detach date-time-format event listeners
        let dateFormatElements = that.customDateTimeContainer.querySelectorAll('li.date-time-format');
        for (let i = 0; i < dateFormatElements.length; i++) {
            let elem = dateFormatElements[i];
            elem.removeEventListener('click', elem['date-time-format-' + elem.dataset.fullFormat]);
            delete elem['date-time-format-' + elem.dataset.fullFormat];
        }

        // Detach apply buton
        that.useThisFormatHolder.removeEventListener('click', that.useThisFormatHolder['apply-button-event-listener'])
        delete that.useThisFormatHolder['apply-button-event-listener']


        // Remove Add buttons event listeners
        that._detachAddBtnEvent(that.addDayFormatClassName);
        that._detachAddBtnEvent(that.addMonthFormatClassName);
        that._detachAddBtnEvent(that.addYearFormatClassName);
        that._detachAddBtnEvent(that.addHourFormatClassName);
        that._detachAddBtnEvent(that.addMinutesFormatClassName);
        that._detachAddBtnEvent(that.addSecondFormatClassName);
        that._detachAddBtnEvent(that.addMillisecondFormatClassName);
        that._detachAddBtnEvent(that.addAmPmFormatClassName);


        //Remove change event on lw inputs
        let lwInputs = that.customDateTimeContainer.querySelectorAll('.lw-input-list-holder lw-input.format-lw-input-list');
        for (let i = 0; i < lwInputs.length; i++) {
            let elem = lwInputs[i];
            elem.removeEventListener('change', elem['lw-input-format' + i]);
            delete elem['lw-input-format' + i];
        }

    }

    _detachAddBtnEvent(addElementClassName) {
        const that = this;
        const addDayBtn = that.customDateTimeContainer.querySelector('.all-format-holders .' + addElementClassName);
        addDayBtn.removeEventListener('click', addDayBtn[addElementClassName]);
        delete addDayBtn[addElementClassName];
    }


    /*
     * Returns the custom format
     */
    getFormat() {
        const that = this;

        const lwInputListHolder = that.lwInputHolderChildNodes;

        let returnFormat = '';
        for (let i = 0; i < lwInputListHolder.length; i++) {
            if ((lwInputListHolder[i].dataset.format) && (lwInputListHolder[i].dataset.format.length !== 0)) {
                returnFormat += lwInputListHolder[i].dataset.format;
            }
            else if (lwInputListHolder[i].value) {
                //Add custom symbol
                returnFormat += lwInputListHolder[i].value;
            }
        }

        return returnFormat;
    }

    /**
     * Adds new format and sign lw inputs
     */
    addNewFormat(dateTimeFormatElement) {
        const that = this;

        let addingSingleFormatElement = false;
        that.dateTimeFullFormatFirstPart = '';

        let dateTimeWithSelectedFormat,
            dateTimeFullFormat;

        if (dateTimeFormatElement.dataset) {
            dateTimeFullFormat = dateTimeFormatElement.dataset.fullFormat;

            // Clear elements only if new date format choosed
            if (that.lwInputHolder) {
                that.lwInputHolder.innerHTML = ''; //remove child
            }
        }
        else {
            addingSingleFormatElement = true;
            dateTimeFullFormat = ' ( ' + dateTimeFormatElement + ' ) '; //brackets are needed
        }

        dateTimeWithSelectedFormat = new LW.Utilities.DateTime(dateTimeFullFormat);

        // Enable 'use this format' button
        that.useThisFormatHolder.disabled = false;

        // Show border holder if it was hidden
        that.customDateTimeContainer.querySelector('.lw-input-and-add-formats-holder').classList.remove('lw-hidden');

        // Show format holder
        that._showElement(that.addFormatHolder);

        // All formats if object
        let formatsObject = dateTimeWithSelectedFormat.getParseRegExp(dateTimeWithSelectedFormat.calendar, dateTimeFullFormat);
        let formatsCount = Object.keys(formatsObject.groups).length;

        // For each format
        for (let i = 0; i < formatsCount; i++) {
            let currentDateFormat = formatsObject.groups[i];
            let nextDateFormat = formatsObject.groups[i + 1];

            let lwInputFormat = document.createElement('lw-input');
            lwInputFormat.dropDownWidth = 'auto';
            lwInputFormat.dropDownButtonPosition = 'right';
            lwInputFormat.readonly = true;
            lwInputFormat.dataset.format = currentDateFormat;

            const lwInputFormatFunction = () => that._handleLWInputFormatChange(lwInputFormat)
            lwInputFormat.addEventListener('change', lwInputFormatFunction);
            lwInputFormat['lw-input-format' + i] = lwInputFormatFunction


            //const addDayFormatFunction = () => that.addNewFormat('dd');
            //addDayFormatBtn.addEventListener('click', addDayFormatFunction);
            //addDayFormatBtn[that.addDayFormatClassName] = addDayFormatFunction;

            lwInputFormat.classList.add('format-lw-input-list');

            if (addingSingleFormatElement) {
                that._addSignLWInput(that.lwInputHolder, dateTimeFullFormat, currentDateFormat, nextDateFormat, addingSingleFormatElement);
            }

            // Set day
            if (that.formatVariants.day[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.day, currentDateFormat, lwInputFormat, that.messages[that.locale].day ? that.messages[that.locale].day.charAt(0).toUpperCase() + that.messages[that.locale].day.slice(1) : that.defaultMessages[that.defaultLocale].day.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].day.slice(1));
            }
            // Set month
            else if (that.formatVariants.month[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.month, currentDateFormat, lwInputFormat, that.messages[that.locale].month ? that.messages[that.locale].month.charAt(0).toUpperCase() + that.messages[that.locale].month.slice(1) : that.defaultMessages[that.defaultLocale].month.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].month.slice(1));
            }
            // Set year
            else if (that.formatVariants.year[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.year, currentDateFormat, lwInputFormat, that.messages[that.locale].year ? that.messages[that.locale].year.charAt(0).toUpperCase() + that.messages[that.locale].year.slice(1) : that.defaultMessages[that.defaultLocale].year.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].year.slice(1));
            }
            // Set hour
            else if (that.formatVariants.hour[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.hour, currentDateFormat, lwInputFormat, that.messages[that.locale].hour ? that.messages[that.locale].hour.charAt(0).toUpperCase() + that.messages[that.locale].hour.slice(1) : that.defaultMessages[that.defaultLocale].hour.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].hour.slice(1));
            }
            // Set minute
            else if (that.formatVariants.minute[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.minute, currentDateFormat, lwInputFormat, that.messages[that.locale].minute ? that.messages[that.locale].minute.charAt(0).toUpperCase() + that.messages[that.locale].minute.slice(1) : that.defaultMessages[that.defaultLocale].minute.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].minute.slice(1));
            }
            // Set second 
            else if (that.formatVariants.second[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.second, currentDateFormat, lwInputFormat, that.messages[that.locale].second ? that.messages[that.locale].second.charAt(0).toUpperCase() + that.messages[that.locale].second.slice(1) : that.defaultMessages[that.defaultLocale].second.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].second.slice(1));
            }
            // Set millisecond 
            else if (that.formatVariants.millisecond[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.millisecond, currentDateFormat, lwInputFormat, that.messages[that.locale].milliseconds ? that.messages[that.locale].milliseconds.charAt(0).toUpperCase() + that.messages[that.locale].milliseconds.slice(1) : that.defaultMessages[that.defaultLocale].milliseconds.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].milliseconds.slice(1));
            }
            // Set ampm
            else if (that.formatVariants.ampm[currentDateFormat]) {
                that._setLWInputDataSource(that.formatVariants.ampm, currentDateFormat, lwInputFormat, that.messages[that.locale].ampm ? that.messages[that.locale].ampm.charAt(0).toUpperCase() + that.messages[that.locale].ampm.slice(1) : that.defaultMessages[that.defaultLocale].ampm.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].ampm.slice(1));
            }
            that.lwInputHolder.appendChild(lwInputFormat);

            lwInputFormat.$.scrollView.attached = function () {
                requestAnimationFrame(() => {
                    that.setActiveLWInput(lwInputFormat);
                }
                );
            };

            // Add sign comboBox
            if ((i + 1) < formatsCount) {
                that._addSignLWInput(that.lwInputHolder, dateTimeFullFormat, currentDateFormat, nextDateFormat, addingSingleFormatElement);
            }

        }

        // lwInputFormats child elements
        that.lwInputHolderChildNodes = that.lwInputHolder.childNodes; // Child elemt
    }


    /**
     * Ses the dataSource values to the lw input
     */
    _setLWInputDataSource(eachFormatVariant, currentFormat, lwInputFormat, valueTitle) {
        const that = this;

        let lwInputDateTimeFormats = [],
            selctedInput, selctedInputWithDesc;
        for (let dateFormat in eachFormatVariant) {
            let dateDescription = eachFormatVariant[dateFormat];

            // Select selected value
            if (dateFormat === currentFormat) {
                selctedInputWithDesc = dateFormat + that.dateTime.toString('(' + dateFormat + ')') + ' - ' + dateDescription;
                selctedInput = valueTitle + ' ' + that.dateTime.toString('(' + dateFormat + ')');
            }

            lwInputDateTimeFormats.push(dateFormat + that.dateTime.toString('(' + dateFormat + ')') + ' - ' + dateDescription);
        }

        lwInputFormat.dataset.valueTitle = valueTitle;
        lwInputFormat.dataset.selectedValue = selctedInputWithDesc;
        lwInputDateTimeFormats.push(that.messages[that.locale].delete ? that.messages[that.locale].delete.charAt(0).toUpperCase() + that.messages[that.locale].delete.slice(1) : that.defaultMessages[that.defaultLocale].delete.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].delete.slice(1));
        lwInputFormat.dataSource = lwInputDateTimeFormats;
        lwInputFormat.value = selctedInput;

    }

    /**
     * LWFormatInput Change event handler
     */
    _handleLWInputFormatChange(lwInputFormat) {
        const that = this;
        // OnDelete - last button
        if (lwInputFormat.value === (that.messages[that.locale].delete ? that.messages[that.locale].delete.charAt(0).toUpperCase() + that.messages[that.locale].delete.slice(1) : that.defaultMessages[that.defaultLocale].delete.charAt(0).toUpperCase() + that.defaultMessages[that.defaultLocale].delete.slice(1))) {

            if (lwInputFormat.parentNode.childNodes.length === 1) {
                // Disable 'use this format' button
                that.useThisFormatHolder.disabled = true;
                that.customDateTimeContainer.querySelector('.lw-input-and-add-formats-holder').classList.add('lw-hidden');

                // Hide format holder
                that._hideElement(that.addFormatHolder);
            }

            if (lwInputFormat.nextElementSibling) {
                lwInputFormat.parentNode.removeChild(lwInputFormat.nextElementSibling); // Remove sign combo
            }
            else if (lwInputFormat.previousSibling) {
                lwInputFormat.parentNode.removeChild(lwInputFormat.previousSibling); // Remove sign combo
            }
            lwInputFormat.parentNode.removeChild(lwInputFormat); // remove lwInputFormat
        }
        else {
            lwInputFormat.dataset.selectedValue = lwInputFormat.value;
            lwInputFormat.dataset.format = lwInputFormat.value.split('(')[0];
            lwInputFormat.value = lwInputFormat.dataset.valueTitle + that.dateTime.toString('(' + lwInputFormat.dataset.format + ')');
        }
    }


    /**
     * Sets which date time format will be selected when click on the lw input
     */
    setActiveLWInput(lwInputFormat) {
        let selectedLi = document.querySelector('li[value="' + lwInputFormat.dataset.selectedValue + '"]');

        let parentUl = selectedLi.parentNode;
        let allLiElements = parentUl.querySelectorAll('li');
        for (let i = 0; i < allLiElements.length; i++) {
            let currentLi = allLiElements[i];
            if (currentLi.classList.contains('active')) {
                currentLi.classList.remove('active');
            }
        }

        selectedLi.classList.add('active');
    }

    /**
     * Hides the element passed as parameter
     */
    _hideElement(elem) {
        if (elem) {
            elem.classList.add('lw-hidden');
        }
    }

    /**
     * Shoes the element passed as parameter
     */
    _showElement(elem) {
        if (elem) {
            elem.classList.remove('lw-hidden');
        }
    }


    /**
     * Adds lw input for the signs
     */
    _addSignLWInput(lwInputListHolder, dateTimeFullFormat, currentDateFormat, nextDateFormat, addingSingleFormatElement) {
        const that = this;

        //Append ComboBox
        let comboBox = document.createElement('lw-input');
        comboBox.dropDownWidth = 'auto';
        comboBox.dropDownButtonPosition = 'right';
        comboBox.classList.add('sign-lw-input');
        let comboBoxOptions = ['-', '/', ','];

        if (!that.dateTimeFullFormatFirstPart) {
            that.dateTimeFullFormatFirstPart = dateTimeFullFormat;
        }

        let defaultComboValue = that.dateTimeFullFormatFirstPart.split(currentDateFormat)[1].split(nextDateFormat)[0];
        if (addingSingleFormatElement) {
            defaultComboValue = '-';
        }

        // Remove the format that is already used
        that.dateTimeFullFormatFirstPart = that.dateTimeFullFormatFirstPart.slice(that.dateTimeFullFormatFirstPart.indexOf(currentDateFormat) + currentDateFormat.length, that.dateTimeFullFormatFirstPart.length);

        // If sign not found && Not adding single element add the new one as last element
        let addCustomSign = true;
        for (let q = 0; q < comboBoxOptions.length; q++) {
            // Replace the value if it is with spaces
            if (defaultComboValue.trim() === comboBoxOptions[q]) {
                comboBoxOptions[q] = defaultComboValue;
            }
            if ((defaultComboValue === comboBoxOptions[q]) || (defaultComboValue.trim() === comboBoxOptions[q])) {
                addCustomSign = false;
            }
        }

        if (addCustomSign) {
            comboBoxOptions.push(defaultComboValue);
        }

        comboBox.dataSource = comboBoxOptions;
        comboBox.value = defaultComboValue;
        lwInputListHolder.appendChild(comboBox);
    }

});
