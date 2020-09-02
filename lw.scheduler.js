
/**
 * lwSheduler custom element
 */
LW('lw-scheduler', class Scheduler extends LW.ScrollViewer {
    // Element's properties.
    static get properties() {
        return {
            'allowDrag': {
                value: false,
                type: 'boolean'
            },
            'allowDrop': {
                value: false,
                type: 'boolean'
            },
            'eventIndicatorTemplate': { //Indicator shown when there's no room for all events in a cell
                value: null,
                type: 'any'
            },
            'eventTemplate': {
                value: null,
                type: 'any'
            },
            'autoScrollStep': {
                value: 5,
                type: 'number'
            },
            'tooltipTemplate': { //Tooltip template for the events
                value: null,
                type: 'any'
            },
            'cellDuration': { //Duration of the timeline cells in minutes 0-60
                value: 60,
                type: 'number'
            },
            'cellTemplate': { //A template for the Timeline cells
                value: null,
                type: 'any'
            },
            'dateCurrent': { //Deterines the current visible date
                value: new Date(),
                type: 'any',
                validator: '_dateValidator'
            },
            'dateEnd': { //Determines the end date for the timeline. Validated againts the events
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'dateStart': { //Determines the start date for the timeline. Validated againts the events
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'dataSource': {
                value: [],
                type: 'any',
                reflectToAttribute: false
            },
            'dataExport': {
                value: {
                    'header': {
                        value: true,
                        type: 'boolean'
                    },
                    'style': {
                        value: null,
                        type: 'object'
                    },
                    'fileName': {
                        value: 'lwScheduler',
                        type: 'string?'
                    },
                    'pageOrientation': {
                        value: 'portrait',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'dateSelectorFormatFunction': { //Allows to reformat the text inside the date range selector in the Header
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'dayFormat': {
                value: 'numeric',
                allowedValues: ['2-digit', 'numeric'],
                type: 'string'
            },
            'disableAutoScroll': {
                value: false,
                type: 'boolean'
            },
            'disableEventDrag': { //Disables event dragging
                value: false,
                type: 'boolean'
            },
            'disableEventResize': { //disabled event resizing
                value: false,
                type: 'boolean'
            },
            'disableSelection': { //disables cell/event selection
                value: false,
                type: 'boolean'
            },
            'disableWindowEditor': { //disable editing via the Window
                value: false,
                type: 'boolean'
            },
            'dragFeedbackFormatFunction': { //Feedback for the events while dragging
                value: null,
                type: 'any'
            },
            'dragOffset': {
                value: [10, 10],
                type: 'array'
            },
            'firstDayOfWeek': {
                value: 0,
                type: 'number',
                defaultValue: 0,
                validator: '_firstDayOfWeekValidator'
            },
            //Appointments are grouped by date first and then by resource; opposite if false.
            //Applies only if events are grouped and groupOrientation is "horizontal". 
            'groupByDate': {
                value: false,
                type: 'boolean'
            },
            'groupOrientation': { //Can be defined forS each view as well
                allowedValues: ['horizontal', 'vertical'],
                value: 'basic',
                type: 'string',
            },
            'groups': { //Defines the list of groups for the Timeline. The order is important
                value: [],
                type: 'array'
            },
            'hourEnd': { //Determines the end hour for the timeline. Validated againts the events
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'hourStart': { //Determines the start hour for the timeline. Validated againts the events
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'headerTemplate': { //A template for the Header section
                value: null,
                type: 'any'
            },
            'headerDatePosition': {
                value: 'near',
                allowedValues: ['near', 'far'],
                type: 'string'
            },
            'hideAllDay': { //Hides the all day panel along with the all-day events
                value: false,
                type: 'boolean'
            },
            'nonworkingDates': { //Define a list of non working dates(Date | String)/days(number)
                value: [],
                type: 'array'
            },
            'nonworkingHours': {
                value: [],
                type: 'array'
            },
            'max': { //Maximal selectable date in the Timeline
                value: new Date(2100, 0, 1),
                type: 'any',
                validator: '_dateValidator'
            },
            'min': { //Minimal selectable date in the Timeline
                value: new Date(1900, 0, 1),
                type: 'any',
                validator: '_dateValidator'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidValue': '{{elementType}}: Invalid {{property}} value. {{property}} should be of type {{typeOne}} or {{typeTwo}}.',
                        'invalidTimeZone': '{{elementType}}: Invalid timeZone value. TimeZone should be from the IANA time zone database.',
                        'incorrectArgument': '{{elementType}}: Incorrect argument {{argumentName}} in method {{methodName}}.',
                        'agenda': 'Agenda',
                        'day': 'Day',
                        'week': 'Week',
                        'month': 'Month',
                        'timelineDay': 'Timeline Day',
                        'timelineWeek': 'Timeline Week',
                        'timelineMonth': 'Timeline Month'
                    }
                },
                type: 'object'
            },
            'monthFormat': {
                value: 'short',
                allowedValues: ['2-digit', 'numeric', 'long', 'short', 'narrow'],
                type: 'string'
            },
            'scrollButtonsPosition': {
                value: 'both',
                allowedValues: ['near', 'far', 'both'],
                type: 'string'
            },
            'selectedDates': {
                value: [],
                type: 'array'
            },
            'spinButtonsDelay': {
                value: 80,
                type: 'number'
            },
            'spinButtonsInitialDelay': {
                value: 0,
                type: 'number'
            },
            'timelineHeaderFormatFunction': { //Allows to reformat the Timeline header
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'timeZone': { //Custom time zone. This option accepts values from the IANA time zone database.
                value: Intl.DateTimeFormat().resolvedOptions().timeZone,
                type: 'string',
                validator: '_timezoneValidator'
            },
            'view': {
                allowedValues: ['agenda', 'day', 'week', 'month', 'timelineDay', 'timelineWeek', 'timelineMonth'],
                value: 'day',
                type: 'string',
            },
            'views': {  //Predefined view Options for the Header
                value: ['day', 'week'],
                type: 'array',
                validator: '_viewsValidator'
            },
            'viewSelectorType': { //Determines the selector type for the View selector. 'auto' will determine the type depending on the space avaiable
                allowedValues: ['auto', 'tabs', 'menu'],
                value: 'basic',
                type: 'string',
            },
            'yearFormat': {
                value: 'numeric',
                allowedValues: ['2-digit', 'numeric'],
                type: 'string'
            },
        };
    }

    //Events List
    // 'dragStart'
    // 'dragging'
    // 'dragEnd'
    // 'change'
    // 'itemInsert'
    // 'itemUpdate'
    // 'itemRemove'
    // 'itemClick'
    // 'editDialogCreate',
    // 'editDialogOpen',
    // 'editDialogClose',
    // 'contextMenuCreate',
    // 'contextMenuOpen',
    // 'contextMenuClose'

    /** Element's template. */
    template() {
        return `<div id="container" role="presentation">
                    <div id="header" class="lw-scheduler-header">
                        <div id="dateSelectorContainer" class="lw-scheduler-date-selector">
                            <lw-repeat-button prev-date id="previousDate" initial-delay="[[spinButtonsInitialDelay]]" delay="[[spinButtonsDelay]]"
                             aria-label="Previous date"></lw-repeat-button>
                            <lw-button current-date id="currentDate" right-to-left="[[rightToLeft]]"></lw-button>
                            <lw-repeat-button next-date id="nextDate" initial-delay="[[spinButtonsInitialDelay]]" delay="[[spinButtonsDelay]]" 
                             aria-label="Previous date"></lw-repeat-button>
                        </div>
                        <div id="viewSelectorContainer" class="lw-scheduler-view-selector">
                            <div id="viewItemsContainer" class="lw-scheduler-view-items-container"></div>
                            <lw-button id="viewItemsButton" class="lw-scheduler-view-items-button lw-visibility-hidden" 
                            aria-label="View items popup" right-to-left="[[rightToLeft]]"></lw-button>
                        </div>
                    </div>
                    <div id="timelineContainer" class="lw-scheduler-timeline-container">
                        <div id="timeline" class="lw-timeline">
                            <div id="timelineContainer" class="lw-timeline-container" role="presentation">
                                <div id="timelineHeader" class="lw-timeline-header" role="rowgroup">
                                    <div class="lw-timeline-view-cells" id="timelineViewCells" role="row"></div>
                                </div>
                                <div id="timelineContent" class="lw-timeline-content">
                                    <div id="timelineCellsContainer" class="lw-timeline-cells-container" aria-hidden="true"></div>
                                </div>
                            </div>
                        </div>
                        <lw-scroll-bar wait id="verticalScrollBar" class="lw-timeline-scroll-bar" orientation="vertical" 
                        right-to-left="[[rightToLeft]]" aria-controls="[[id]]" animation="[[animation]]"></lw-scroll-bar>
                        <lw-scroll-bar wait id="horizontalScrollBar" class="lw-timeline-scroll-bar"  
                        right-to-left="[[rightToLeft]]" aria-controls="[[id]]" animation="[[animation]]"></lw-scroll-bar>
                    </div>
                    <div id="footer" class="lw-scheduler-footer"></div>
                    <lw-tooltip id="tooltip" class="lw-scheduler-tooltip"></lw-tooltip>
                </div>`
    }

    static get listeners() {
        return {
            'down': '_downHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'document.dragstart': '_dragStartHandler',
            'dateSelectorContainer.click': '_timelineHeaderClickHandler',
            'container.wheel': '_mouseWheelHandler',
            'horizontalScrollBar.change': '_horizontalScrollbarHandler',
            'verticalScrollBar.change': '_verticalScrollbarHandler',
            'move': '_moveHandler',
            'resize': '_resizeEventHandler'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.scheduler.css'
        ]
    }

    /**
     * * Checks for missing modules.
     * */
    static get requires() {
        return {
            'LW.Window': 'lw.window.js',
            'LW.Calendar': 'lw.calendar.js',
            // 'LW.Menu': 'lw.menu.js',
            // 'LW.Tooltip': 'lw.tooltip.js'
        }
    }

    /**
     * Property Change handler
     * @param {any} propertyName
     * @param {any} oldValue
     * @param {any} newValue
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        // switch (propertyName) {
        //     case '':
        //         break;
        // }
    }

    /**
    * Element Attached method. Called when element is attached to the DOM.
    */
    attached() {
        const that = this;

        super.attached();

        //Handle ScrollViewer events
        if (!that._scrollView) {
            that._scrollView = new LW.Utilities.Scroll(that.$.timeline, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        }
    }

    /**
     * Element Detached method. Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        //Handle ScrollView events
        if (that._scrollView) {
            that._scrollView.unlisten();
            delete that._scrollView;
        }
    }

    /**
     * Renders the element
     */
    render() {
        const that = this;

        //Accessibility
        that.setAttribute('role', 'treegrid');

        //Configures the ScrollBars
        that._setScrollBars();

        that._setHeader();

        super.render();
    }

    /**
     * Refreshes the ScrollBars
     * @param {Boolean} fullRefresh - re-renders the Timeline
     */
    refresh(fullRefresh) {

    }

    /**
     * Create an event
     */
    insertAppointment() {

    }

    /**
     * Update an appintment
     */
    updateAppointment() {

    }

    /**
     * Remove an appintment
     */
    removeAppointment() {

    }

    /**
     * Insert a resource
     */
    insertResource() {

    }

    /**
     * Update a resource
     */
    updateResource() {

    }

    /**
     * Remove a resource
     */
    removeResourse() {

    }

    /**
     * Mark the begining of a batch update
     */
    beginUpdate() {

    }

    /**
     * Marks the end of a batch update
     */
    endUpdate() {

    }

    /**
     * Scrolls the Timeline to a certain Date 
     * @param {Date | { year: number, month: number, dat: number}} date - target date
     */
    scrollToDate(date) {

    }

    /**
     * Scrolls the Timeline to a certain Time
     * * @param {Boolean | { hours: number, minutes: number, seconds: number }} time - target time
     */
    scrollToTime(time) {

    }

    /**
     * Opens the window to edit a date/event
     * @param {Date | string | Object} event - target event/event id/ date
     */
    openWindow(eventId) {

    }

    /**
     * Closes the Editor Window
     */
    closeWindow() {

    }

    /**
     * Open event Tooltip 
     * @param {*} event 
     */
    openAppointmentTooltip(event) {

    }

    /**
     * Close event tooltip
     */
    closeAppointmentTooltip() {

    }

    /**
    * Element Down Event Handler
    * @param {any} event
    */
    _downHandler(event) {
        const that = this,
            originalEvent = event.originalEvent,
            target = (that.shadowRoot || that.isInShadowDOM ? originalEvent.composedPath()[0] : originalEvent.target);

        event.stopPropagation();

        if (that._dragDetails) {
            //TODO: Terminate all interaction processes like drag/resize, etc
            delete that._dragDetails;
            return;
        }

        that._itemClickDetails = { target: target };

        if (!LW.Utilities.Core.isMobile && event.button !== 0) {
            return;
        }

        //TODO: Create that._dragDetails
    }

    _documentMoveHandler(event) {

    }

    _documentUpHandler(event) {
        const that = this,
            originalEvent = event.originalEvent;
        let target = (that.shadowRoot || that.isInShadowDOM ? originalEvent.composedPath()[0] : originalEvent.target);

        that._upHandler();

        if (!that._dragDetails) {
            // that._handleItemClick(originalEvent);
            return;
        }

        delete that._dragDetails;
    }

    /**
    * Document Drag Start
    * @param {any} event
    */
    _dragStartHandler(event) {
        const that = this,
            closest = event.target.closest;

        if (that._dragDetails || (closest && closest.call(that, 'lw-scheduler') === that)) {
            event.preventDefault();
        }
    }

    _mouseWheelHandler(event) {

    }

    _horizontalScrollbarHandler(event) {

    }

    _verticalScrollbarHandler(event) {

    }

    _moveHandler(event) {

    }

    /**
     * Timeline header click handler
     * @param {Event} event 
     */
    _timelineHeaderClickHandler(event) {
        const that = this,
            target = (event || event.originalEvent).target;

        //TODO: Handle View Item selection [selected] attr

    }

    _resizeEventHandler(event) {
        const that = this;

        that._refresh();
    }

    /**
    * Configures the Scroll Bars on initialization
    */
    _setScrollBars() {
        const that = this;

        if (!that._scrollView) {
            that._scrollView = new LW.Utilities.Scroll(that.$.timeline, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        }

        const vScrollBar = that._scrollView.vScrollBar,
            hScrollBar = that._scrollView.hScrollBar;

        hScrollBar.$.addClass('lw-hidden');
        vScrollBar.$.addClass('lw-hidden');

        //Cancel Style/Resize observers of the ScrollBars
        vScrollBar.hasStyleObserver = false;
        hScrollBar.hasStyleObserver = false;
        vScrollBar.hasResizeObserver = false;
        hScrollBar.hasResizeObserver = false;

        hScrollBar.wait = false;
        vScrollBar.wait = false;

        //Refreshes the ScrollBars
        that._refresh();
    }

    /**
     * Refreshes the ScrollBars
     */
    _refresh() {
        const that = this;

        function getScrollWidth() {
            const scrollWidth = that.$.timelineContent.offsetWidth - that.$.timeline.offsetWidth;

            if (scrollWidth > 0 && that.horizontalScrollBarVisibility !== 'hidden' || that.horizontalScrollBarVisibility === 'visible') {
                that.$container.addClass('hscroll');
            }
            else {
                that.$container.removeClass('hscroll');
            }

            return scrollWidth;
        }

        function getScrollHeight() {
            const scrollHeight = that.$.timelineContent.offsetHeight - that.$.timeline.offsetHeight;

            if (scrollHeight > 0 && that.verticalScrollBarVisibility !== 'hidden' || that.verticalScrollBarVisibility === 'visible') {
                that.$container.addClass('vscroll');
            }
            else {
                that.$container.removeClass('vscroll');
            }

            return scrollHeight;
        }

        //Caching the size's before they are re-calculated. Used to check if width/height of the container have changed.
        const initialWidth = that.scrollWidth,
            initialHeight = that.scrollHeight;
        let newScrollWidth = getScrollWidth(),
            newScrollHeight = getScrollHeight();

        //double check in case vScroll has become hidden and hScroll visibility should be checked 
        if (!newScrollHeight || initialHeight !== newScrollHeight) {
            newScrollWidth = getScrollWidth();
        }

        //doble check in case hScroll has become hidden and vScroll visibility should be checked
        if (!newScrollWidth || initialWidth !== newScrollWidth) {
            newScrollHeight = getScrollHeight();
        }

        that.scrollWidth = newScrollWidth;
        that.scrollHeight = newScrollHeight;

        //Bottom-corner refresh
        that.$.horizontalScrollBar.refresh();
        that.$.verticalScrollBar.refresh();
    }

    _setHeader() {
        const that = this,
            header = that.$.header;

        if (that.headerTemplate) {
            header.innerHTML = '';
            //TODO: Handle Header Template
            //that._handleTemplate();
            return;
        }

        const dateSelectorContainer = that.$.dateSelectorContainer;

        //Set the original header
        if (!header.contains(dateSelectorContainer)) {
            header.innerHTML = '';
            header.appendChild(dateSelectorContainer);
            header.appendChild(that.$.viewSelectorContainer);
        }

        that._refreshDateSelector();
        that._refreshViewSelector();
    }

    /**
     * Updates the Date Seletor inside the Header
     */
    _refreshDateSelector() {
        const that = this;
        let currentDate = new Date(that.currentDate);

        if (isNaN(currentDate.getTime())) {
            currentDate = new Date();
        }

        let dateString = '';

        //set the dateCurrent
        if (that.dateCurrentFormatFunction) {
            dateString = that.dateCurrentFormatFunction(currentDate) + '';
        }
        else {
            const view = that.view.toLowerCase();


            if (view.indexOf('day') > -1) {
                dateString = currentDate.toLocaleDateString(that.locale, { day: that.dayFormat, timezone: that.timezone });
            }
            else if (view.indexOf('week') > -1) {
                const firstDayOfWeek = new Date(currentDate),
                    lastDayOfWeek = new Date(currentDate);

                firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
                lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

                dateString = firstDayOfWeek.toLocaleDateString(that.locale, { day: that.dayFormat, timezone: that.timezone }) +
                    ' ' + lastDayOfWeek.toLocaleDateString(that.locale, { day: that.dayFormat, timezone: that.timezone });
            }

            dateString += ' ' + currentDate.toLocaleDateString(that.locale, { month: that.monthFormat, timezone: that.timezone }) +
                ' ' + currentDate.toLocaleDateString(that.locale, { year: that.yearFormat, timezone: that.timezone });
        }

        that.$.currentDate.innerHTML = dateString;
    }

    /**
     * Validates the Views
     * @param {string | object} oldValue
     * @param {string | object} newValue 
     */
    _viewsValidator(oldValue, newValue) {
        const that = this;

        //TODO: Check the newValue objects/strings for valid view configurations

        return newValue;
    }

    /**
     * Updates the View Selector inside the Header
     */
    _refreshViewSelector() {
        const that = this,
            views = that.views,
            viewSelectorType = that.viewSelectorType,
            viewSelectorContainer = that.$.viewSelectorContainer,
            viewItemsContainer = that.$.viewItemsContainer,
            viewItemsButton = that.$.viewItemsButton;

        //Hide the view selection container
        viewSelectorContainer.classList.add('lw-visibility-hidden');
        viewItemsButton.classList.add('lw-visibility-hidden');

        //Remove it from the DOM
        viewItemsContainer.remove();

        //Remove unnecessary view items
        while (views.length < viewItemsContainer.children.length) {
            viewItemsContainer.firstElementChild.remove();
        }

        //Add aditional items
        while (views.length > viewItemsContainer.children.length) {
            const viewItem = document.createElement('div');

            viewItem.classList.add('lw-scheduler-view-item');
            viewItemsContainer.appendChild(viewItem);
        }

        //Update items content
        const viewItems = viewItemsContainer.children;

        for (let i = 0; i < viewItems.length; i++) {
            const viewItem = viewItems[i],
                viewLabel = views[i];

            if (typeof views[i] === 'string') {
                viewItem.innerHTML = '<div>' + that.localize(views[i]) + '</div>';
            }
            else {
                const label = viewLabel.label,
                    type = viewLabel.type;

                viewItem.innerHTML = '<div>' + typeof label === 'string' || !isNaN(label) ? label : that.localize(type) + '</div>';
            }
        }

        //Add it back to the DOM
        viewSelectorContainer.appendChild(viewItemsContainer);

        if (viewSelectorType === 'tabs') {
            //Show the view selection container
            viewSelectorContainer.classList.add('lw-visibility-hidden');
            return;
        }

        const shouldMinimize = viewSelectorContainer.offsetWidth - viewItemsContainer.offsetWidth < 0;


        if (viewSelectorType === 'menu' || shouldMinimize) {
            viewItemsButton.classList.remove('lw-visibility-hidden');
            //TODO: Add the viewItemsContainer to the popup
        }

        //Show the view selection container
        viewSelectorContainer.classList.remove('lw-visibility-hidden');
    }

    /**
     * Validates the timeZone property
     * @param {string} oldValue - old time zone
     * @param {string} newValue  - new time zone
     */
    _timezoneValidator(oldValue, newValue) {
        const that = this;

        try {
            Intl.DateTimeFormat(newValue);
            return newValue;
        }
        catch (exeption) {
            //Throw error
            that.error(that.localize('invalidTimeZone', { elementType: that.nodeName.toLowerCase() }));
            return oldValue;
        }
    }
});
