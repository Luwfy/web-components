
/**
 * CardView custom element.
 */
LW('lw-card-view', class CardView extends LW.DataView {
    // CardView's properties.
    static get properties() {
        return {
            'cardHeight': {
                value: null,
                type: 'number?'
            },
            'cellOrientation': {
                value: 'vertical',
                allowedValues: ['horizontal', 'vertical'],
                type: 'string'
            },
            'coverField': {
                value: null,
                type: 'string?'
            },
            'coverMode': {
                value: 'crop',
                allowedValues: ['fit', 'crop'],
                type: 'string'
            },
            'messages': {
                value: {
                    'en': {
                        'addImage': 'Add',
                        'coverField': 'Cover field',
                        'crop': 'Crop',
                        'customize': 'Customize cards',
                        'dateTabLabel': 'DATE',
                        'draggedRecord': 'Record {{id}}',
                        'fit': 'Fit',
                        'imageUrl': 'New image URL:',
                        'incorrectStructure': '"dataSource" must be an instance of LW.DataAdapter or an array of objects with key-value pairs.',
                        'nextRecord': 'Next record',
                        'noCoverField': 'No cover field',
                        'noData': 'No data to display',
                        'noMatches': 'No matched records',
                        'now': 'Now',
                        'previousRecord': 'Previous record',
                        'removeImage': 'Remove',
                        'timeTabLabel': 'TIME',
                        'toggleVisibility': 'Toggle field visibility'
                    }
                }
            },
            'onRecordInserted': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'onRecordRemoved': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'scrolling': {
                value: 'physical',
                allowedValues: ['physical', 'virtual', 'infinite', 'deferred'],
                type: 'string'
            },
            'titleField': {
                value: null,
                type: 'string?'
            }
        };
    }

    /**
     * CardView's event listeners.
     */
    static get listeners() {
        return {
            'click': '_clickHandler',
            'move': '_moveHandler',
            'addNewButton.click': '_addNewButtonClickHandler',
            'cardContainer.down': '_cardContainerDownHandler',
            'scrollViewer.touchmove': '_scrollViewerTouchmoveHandler'
        };
    }

    /**
     * CardView's required files.
     */
    static get requires() {
        return {
            'LW.Button': 'lw.button.js',
            'LW.Card': 'lw.card.js',
            'LW.Carousel': 'lw.carousel.js',
            'LW.CheckBox': 'lw.checkbox.js',
            'LW.ColumnPanel': 'lw.gridpanel.js',
            'LW.DataAdapter': 'lw.data.js',
            'LW.DateTimePicker': 'lw.datetimepicker.js',
            'LW.Input': 'lw.input.js',
            'LW.NumericTextBox': 'lw.numerictextbox.js',
            'LW.ScrollBar': 'lw.scrollbar.js',
            'LW.SwitchButton': 'lw.switchbutton.js',
            'LW.Window': 'lw.window.js',
            'LW.Utilities.DateTime': 'lw.date.js'
        };
    }

    get hasStyleObserver() {
        return false;
    }

    get editInfo() {
        return this._editInfo;
    }

    /**
     * ShadowDOM style references
     */
    static get styleUrls() {
        return [
            'lw.cardview.css'
        ]
    }

    /**
     * CardView's HTML template.
     */
    template() {
        return `<div id="container" role="presentation">
                    <div id="header" class="lw-data-view-header" role="toolbar">
                        <div id="customizeButton" class="lw-data-view-header-button lw-data-view-customize-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Customize cards"><div role="presentation"></div></div>
                        <div id="filterButton" class="lw-data-view-header-button lw-data-view-filter-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Filter"><div role="presentation"></div></div>
                        <div id="sortButton" class="lw-data-view-header-button lw-data-view-sort-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Sort"><div role="presentation"></div></div>
                        <div id="searchButton" class="lw-data-view-header-button lw-data-view-search-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Search"></div>
                        <div id="headerDropDown" class="lw-data-view-header-drop-down lw-visibility-hidden" role="dialog">
                            <div id="customize" class="lw-hidden" role="presentation"></div>
                            <div id="filter" class="lw-hidden" role="presentation"></div>
                            <div id="sort" class="lw-hidden" role="presentation"></div>
                            <div id="search" class="lw-data-view-search-box lw-hidden" role="presentation">
                                <input type="text" id="searchInput" spellcheck="false" aria-label="Search" />
                                <div id="searchLabel" class="lw-data-view-search-label lw-unselectable"></div>
                                <div id="searchPrev" class="lw-data-view-search-prev" role="button" aria-label="Previous"></div>
                                <div id="searchNext" class="lw-data-view-search-next" role="button" aria-label="Next"></div>
                                <div id="searchClose" class="lw-data-view-search-close" role="button" aria-label="Close search box"></div>
                            </div>
                        </div>
                    </div>
                    <lw-scroll-viewer id="scrollViewer" animation="[[animation]]" horizontal-scroll-bar-visibility="hidden" right-to-left="[[rightToLeft]]">
                        <div id="cardContainer" class="lw-card-container" role="list"></div>
                    </lw-scroll-viewer>
                    <div id="loadingIndicatorContainer" class="lw-loader-container lw-hidden" aria-label="Loading">
                        <span id="loadingIndicator" class="lw-loader" role="presentation"></span>
                    </div>
                    <div id="addNewButton" class="lw-add-new-button" role="button" aria-label="Add new card"></div>
                </div>`;
    }

    /**
     * Called when the element is attached to the DOM.
     */
    attached() {
        const that = this;

        super.attached();

        if (that.isCompleted && that._editInfo) {
            that._addWindowHandlers();
            document.body.appendChild(that._editInfo.window);
        }
    }

    /**
     * Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (!that._editInfo) {
            return;
        }

        const window = that._editInfo.window;

        window.removeEventListener('open', that._windowEventHandler);
        window.removeEventListener('closing', that._windowEventHandler);
        window.removeEventListener('close', that._windowEventHandler);
        window.removeEventListener('click', that._windowClickHandler);
        window.removeEventListener('prev', that._prevNextHandler);
        window.removeEventListener('next', that._prevNextHandler);
        window.remove();
    }

    /**
     * Called when the element is ready
     */
    ready() {
        super.ready();
    }

    render() {
        const that = this,
            dataSource = that.dataSource,
            scrolling = that.scrolling,
            computedStyle = getComputedStyle(that);

        if (LW.Utilities.NumberRenderer) {
            that._numericFormatter = new LW.Utilities.NumberRenderer();
        }

        if (that.shadowRoot) {
            that.importStyle(LW.Utilities.Core.getScriptLocation() + LW.StyleBaseUrl.replace('/scoped/', '/lw.scrollviewer.css'));
            that.importStyle(LW.Utilities.Core.getScriptLocation() + LW.StyleBaseUrl.replace('/scoped/', '/lw.carousel.css'));
            that.importStyle(LW.Utilities.Core.getScriptLocation() + LW.StyleBaseUrl.replace('/scoped/', '/lw.button.css'));
            that.importStyle(LW.Utilities.Core.getScriptLocation() + LW.StyleBaseUrl.replace('/scoped/', '/lw.sortable.css'));
        }

        that._gap = parseFloat(computedStyle.getPropertyValue('--lw-card-view-gap'));
        that._verticalOffset = parseFloat(computedStyle.getPropertyValue('--lw-card-view-vertical-offset'));
        that._cards = [];
        that._collapsed = {};
        that._collapsedRows = {};
        that._numberOfCollapsedRows = 0;
        that._cardScrolling = {};
        that._cardSelectedCover = {};
        that._cardHeight = that.cardHeight;
        that._autoCardHeight = that._cardHeight === null;
        that._cachedWidth = that.offsetWidth;
        that._cachedHeight = that.offsetHeight;
        that._appliedFiltering = { filters: [], operator: 'and' };
        that._appliedSorting = { dataFields: [], dataTypes: [], orderBy: [] };
        that._start = { view: 0, data: 0 };
        that._autoScrollCoefficient = LW.Utilities.Core.Browser.Firefox ? 8 : LW.Utilities.Core.Browser.Edge ? 16 : 4;

        that._normalizeDataSource();
        that._getVisibleRecords();
        that._normalizeColumns();
        that._handleHeaderPosition(that.$.scrollViewer);
        that._localizeHeader();
        that._getInnerElementMessages();

        if (scrolling === 'deferred') {
            that.$.scrollViewer.$.verticalScrollBar.mechanicalAction = 'switchWhenReleased';
        }
        else if ((scrolling === 'virtual' || scrolling === 'infinite') &&
            dataSource && dataSource.onVirtualDataSourceRequested === undefined) {
            that.scrolling = 'physical';
        }

        that._createTemplate();

        if (scrolling === 'infinite') {
            that._requestInitialCards();
        }
        else {
            that._createCards();
        }

        that.$.scrollViewer._verticalScrollbarHandler = that._onVerticalChange.bind(that);
        that.$.scrollViewer.hasStyleObserver = false;
        that.$.scrollViewer.$.verticalScrollBar.hasStyleObserver = false;
        that.$.scrollViewer.$.horizontalScrollBar.hasStyleObserver = false;

        super.render();
    }

    /**
     * Adds a new record.
     *
     * @param {Number/String} recordId Optional The id of the record to add.
     * @param {Object} data Optional The data of the record to add.
     * @param {String} position Optional The position to add the record to. Possible values: 'first' and 'last'.
     */
    addRecord(recordId, data = {}, position = 'last') {
        const that = this,
            dataSource = that.dataSource,
            scrolling = that.scrolling;

        function refresh() {
            if (position !== 'first') {
                position = 'last';
                dataSource.insert(dataSource.length, data);

                if (dataSource !== that._visibleSource) {
                    that._visibleSource.push(dataSource[dataSource.length - 1]);
                }
            }
            else {
                dataSource.insert(0, data);

                if (dataSource !== that._visibleSource) {
                    that._visibleSource.unshift(dataSource[0]);
                }
            }

            that._closeSearchPanel();
            that._fullRefresh();
        }

        if (typeof data !== 'object') {
            return;
        }

        if (that.dataSource.dataFields.length === 0) {
            const newDataSource = [data];

            that.dataSource = newDataSource;
            that.propertyChangedHandler('dataSource', null, newDataSource);
            return;
        }

        const idMember = dataSource.id;

        if (idMember) {
            if (recordId !== null && recordId !== undefined && recordId !== '') {
                data[idMember] = recordId;
            }
            else if (data[idMember] === undefined) {
                if (dataSource[0] && !dataSource[0].$.isEmpty && typeof dataSource[0].$.id === 'number') {
                    data[idMember] = Math.floor(Math.random() * (1000000 - dataSource.length)) + dataSource.length;
                }
                else {
                    data[idMember] = Math.random().toString(36).substring(7);
                }
            }
        }

        if (scrolling === 'physical' || scrolling === 'deferred') {
            refresh();
            return;
        }

        // 'virtual'/'infinite' scroll modes
        function commit(result) {
            if (result) {
                refresh();
            }
        }

        if (that.onRecordInserted) {
            that.onRecordInserted(idMember ? data[idMember] : recordId, data, position, commit);
        }
    }

    /**
     * Begins an edit operation.
     *
     * @param {Number/String} recordId The id of the record to edit.
     */
    beginEdit(recordId) {
        const that = this;

        if (!that.editable || that.disabled) {
            return;
        }

        const record = that._visibleSource.find(record => record.$.id === recordId);

        if (!record) {
            return;
        }

        const card = that.ensureVisible(recordId);

        if (that.scrolling !== 'virtual') {
            that._openEditDialog(card.dataId);
        }
        else {
            that._beginEditOnLoad = recordId;
        }
    }

    /**
     * Ends the current edit operation and discards changes.
     */
    cancelEdit() {
        const that = this,
            editInfo = that._editInfo;

        if (!editInfo || !editInfo.window.opened) {
            return;
        }

        editInfo.window.close();
    }

    /**
     * Ends the current edit operation and saves changes.
     */
    endEdit() {
        const that = this,
            editInfo = that._editInfo;

        if (!editInfo || !editInfo.window.opened) {
            return;
        }

        editInfo.ok = true;
        editInfo.window.close();
    }

    /**
     * Makes sure a record is visible by scrolling to it.
     *
     * @param {Number/String} recordId The id of the record to scroll to.
     */
    ensureVisible(recordId) {
        const that = this,
            dataSource = that._visibleSource,
            record = dataSource.find(record => record.$.id === recordId);

        if (!record) {
            return;
        }

        const index = dataSource.indexOf(record),
            cardsPerRow = that._cardsPerRow,
            fullCardHeight = that._cardHeight + that._gap,
            verticalScrollBar = that.$.scrollViewer.$.verticalScrollBar,
            rowOfIndex = Math.floor(index / cardsPerRow),
            rowStart = Math.max(0, rowOfIndex * cardsPerRow);
        let scrollValue = 0,
            cardsWithDataId, cardMatch;

        if (that._numberOfCollapsedRows > 0) {
            const numberOfAllRows = Math.floor((dataSource.length - 1) / cardsPerRow) + 1;

            for (let i = 0; i < numberOfAllRows; i++) {
                const currentRowIndex = i;

                if (currentRowIndex === rowOfIndex) {
                    break;
                }

                if (that._collapsedRows[currentRowIndex]) {
                    scrollValue += fullCardHeight - that._cardContentHeight;
                }
                else {
                    scrollValue += fullCardHeight;
                }
            }
        }
        else {
            scrollValue = Math.floor(rowStart / cardsPerRow) * fullCardHeight;
        }

        scrollValue = Math.min(scrollValue, verticalScrollBar.max);

        if (Math.abs(verticalScrollBar.value - scrollValue) <
            that.$.scrollViewer.$.scrollViewerContainer.offsetHeight / 50) {
            cardsWithDataId = that._cards.filter(card => card.dataId === index && !card.classList.contains('lw-hidden'));
            cardMatch = cardsWithDataId[cardsWithDataId.length - 1];

            return cardMatch;
        }

        verticalScrollBar.value = scrollValue;
        that._onVerticalChange({ detail: { value: scrollValue } });

        cardsWithDataId = that._cards.filter(card => card.dataId === index && !card.classList.contains('lw-hidden'));
        cardMatch = cardsWithDataId[cardsWithDataId.length - 1];

        return cardMatch;
    }

    /**
     * Hides a column.
     * @param {String} dataField The data field of the column.
     */
    hideColumn(dataField) {
        this._toggleColumn(dataField, false);
    }

    /**
     * Opens the "Customize cards" header panel (drop down).
     */
    openCustomizePanel() {
        const that = this,
            dataSource = that.dataSource;

        if (!dataSource || dataSource.length === 0 || that.disabled || that.headerPosition === 'none') {
            return;
        }

        const customizePart = that.$.customize,
            columnPanelDataSource = that.columns.map(col => {
                const newColumn = Object.assign({}, col);

                if ([that.coverField, that.titleField].indexOf(newColumn.dataField) !== -1) {
                    newColumn.disableToggle = true;
                }
                else {
                    newColumn.disableToggle = false;
                }

                return newColumn;
            }),
            inputSource = [that.localize('noCoverField')].concat(that.columns.filter(col => col.image));
        let switchButton, input, columnPanel;

        that._closeDialog();

        that.$.headerDropDown.classList.add('customize-panel');
        that.$.headerDropDown.classList.remove('filter-panel', 'sort-panel', 'search-panel');
        customizePart.classList.remove('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that.$.search.classList.add('lw-hidden');
        that._closeSearchPanel();

        if (!that._customizePartCreated) {
            const fragment = document.createDocumentFragment(),
                container = document.createElement('div'),
                innerContainer = document.createElement('div'),
                label = document.createElement('div');

            switchButton = document.createElement('lw-switch-button');
            input = document.createElement('lw-input');
            columnPanel = document.createElement('lw-column-panel');

            label.id = that.id + 'CoverFieldLabel';
            label.innerHTML = that.localize('coverField');

            switchButton.rightToLeft = that.rightToLeft;
            switchButton.setAttribute('crop', that.localize('crop'));
            switchButton.setAttribute('fit', that.localize('fit'));
            switchButton.setAttribute('aria-labelledby', label.id);
            switchButton.inverted = true;
            switchButton.animation = that.animation;
            switchButton.theme = that.theme;

            input.dataSource = inputSource;
            input.dropDownButtonPosition = 'right';
            input.rightToLeft = that.rightToLeft;
            input.readonly = true;
            input.animation = that.animation;
            input.theme = that.theme;

            columnPanel.rightToLeft = that.rightToLeft;
            columnPanel.animation = that.animation;
            columnPanel.dataSource = columnPanelDataSource;
            columnPanel.locale = that.locale;
            columnPanel.messages = that._innerElementMessages.columnPanel;
            columnPanel.theme = that.theme;

            innerContainer.appendChild(label);
            innerContainer.appendChild(switchButton);
            container.classList.add('lw-card-view-customize-top');
            container.appendChild(innerContainer);
            container.appendChild(input);
            fragment.appendChild(container);
            fragment.appendChild(columnPanel);
            that.$.customize.appendChild(fragment);
            that._customizePartCreated = true;
        }
        else {
            switchButton = customizePart.getElementsByTagName('lw-switch-button')[0];
            switchButton.rightToLeft = that.rightToLeft;
            input = customizePart.getElementsByTagName('lw-input')[0];
            input.dataSource = inputSource;
            input.rightToLeft = that.rightToLeft;
            delete input.$.input.dataValue;
            columnPanel = customizePart.children[1];
            columnPanel.set('dataSource', columnPanelDataSource);
            columnPanel.propertyChangedHandler('dataSource', undefined, columnPanelDataSource);
            columnPanel.rightToLeft = that.rightToLeft;
        }

        switchButton.checked = that.coverMode === 'fit';
        input.value = that.coverField ? that.columns.find(col => col.dataField === that.coverField).label : that.localize('noCoverField');
        that._changedVisibility = new Map();
        that._openHeaderDropDown(that.$.customizeButton);
    }

    /**
     * Opens the "Filter" header panel (drop down).
     */
    openFilterPanel() {
        const that = this,
            dataSource = that.dataSource,
            filterPanelDataSource = this.columns.map(col => {
                const field = Object.assign({}, col);

                field.dataType = dataSource.dataFields.find(dataField => dataField.name === field.dataField).dataType;
                return field;
            });

        super.openFilterPanel(filterPanelDataSource, null);
    }

    /**
     * Opens the "Sort" header panel (drop down).
     */
    openSortPanel() {
        const that = this,
            dataSource = that.dataSource,
            sortPanelDataSource = that.columns.map(col => {
                const newColumn = Object.assign({}, col),
                    preSortedIndex = that._appliedSorting.dataFields.indexOf(newColumn.dataField);

                newColumn.dataType = dataSource.dataFields.find(dataField => dataField.name === newColumn.dataField).dataType;
                newColumn.sortIndex = preSortedIndex;

                if (preSortedIndex !== -1) {
                    newColumn.sortDirection = that._appliedSorting.orderBy[preSortedIndex];
                }

                return newColumn;
            });

        super.openSortPanel(sortPanelDataSource);
    }

    /**
     * Removes a record.
     * 
     * @param {Number/String} recordId The id of the record to remove.
     */
    removeRecord(recordId) {
        const that = this,
            scrolling = that.scrolling;

        function refresh() {
            const dataSource = that.dataSource,
                record = dataSource.find(record => record.$.id === recordId);

            if (!record) {
                return;
            }

            const indexInSource = dataSource.indexOf(record),
                indexInVisibleSource = that._visibleSource.indexOf(record);

            dataSource.removeAt(indexInSource);

            if (dataSource !== that._visibleSource) {
                if (indexInVisibleSource === -1) {
                    return;
                }

                that._visibleSource.splice(indexInVisibleSource, 1);
            }

            that._closeSearchPanel();
            that._fullRefresh();
        }

        if (scrolling === 'physical' || scrolling === 'deferred') {
            refresh();
            return;
        }

        // 'virtual'/'infinite' scroll modes
        function commit(result) {
            if (result) {
                refresh();
            }
        }

        if (that.onRecordRemoved) {
            that.onRecordRemoved(recordId, commit);
        }
    }

    /**
     * Shows a column.
     *
     * @param {String} dataField The data field of the column.
     */
    showColumn(dataField) {
        this._toggleColumn(dataField, true);
    }

    /**
    * Updates the CardView when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'allowDrag':
            case 'coverMode':
            case 'onRecordInserted':
            case 'onRecordRemoved':
                break;
            case 'addNewButton':
                if (newValue && that.dataSource.dataFields.length === 0) {
                    that.addNewButton = false;
                }

                break;
            case 'animation':
            case 'theme':
                that._cards.forEach(card => {
                    const carousel = card.getElementsByTagName('lw-carousel');

                    if (carousel) {
                        carousel[propertyName] = newValue;
                    }
                });

                if (that._editInfo) {
                    that._editInfo.window[propertyName] = newValue;

                    for (let dataField in that._editInfo.editors) {
                        that._editInfo.editors[dataField].element[propertyName] = newValue;
                    }
                }

                if (that._customizePartCreated) {
                    that.$.customize.firstElementChild.firstElementChild.children[1][propertyName] = newValue;
                    that.$.customize.firstElementChild.children[1][propertyName] = newValue;
                    that.$.customize.children[1][propertyName] = newValue;
                }

                if (that._filterPartCreated) {
                    that.$.filter.firstElementChild[propertyName] = newValue;
                }

                if (that._sortPartCreated) {
                    that.$.sort.firstElementChild[propertyName] = newValue;
                }

                break;
            case 'disabled':
                that.closePanel();

                if (that._editInfo) {
                    that._editInfo.window.disabled = newValue;
                }

                break;
            case 'cardHeight':
                that._updateCardHeight(newValue);
                break;
            case 'cellOrientation':
            case 'collapsible':
                if (!that.dataSource || that.dataSource.length === 0) {
                    return;
                }

                that._fullRefresh();
                break;
            case 'columns':
                that._updateColumns();
                break;
            case 'coverField':
            case 'titleField': {
                if (newValue !== null) {
                    const validColumn = that.columns.find(column => column.dataField === newValue);

                    if (!validColumn || propertyName === 'coverField' && !validColumn.image) {
                        that[propertyName] = oldValue;
                        return;
                    }
                }

                that._createTemplate();

                if (!that.dataSource || that.dataSource.length === 0) {
                    return;
                }

                that._fullRefresh();
                break;
            }
            case 'dataSource':
                that._close();
                that._normalizeDataSource();
                that._getVisibleRecords();
                that._clearFilterAndSortUI();
                that._normalizeColumns();
                that._createTemplate();
                that._fullRefresh(false);
                break;
            case 'editable':
                if (!newValue) {
                    that._closeDialog();
                }

                break;
            case 'headerPosition':
                that._handleHeaderPosition(that.$.scrollViewer);

                if ((newValue === 'none' || oldValue === 'none') &&
                    that.dataSource && that.dataSource.length > 0) {
                    that._partialRefresh();
                }

                break;
            case 'locale':
            case 'messages':
                that.closePanel();
                that._localizeHeader();
                that._getInnerElementMessages();

                if (that._editInfo) {
                    const window = that._editInfo.window;

                    window.$.buttonsContainer.firstElementChild.title = that.localize('previousRecord');
                    window.$.buttonsContainer.children[1].title = that.localize('nextRecord');
                    window.$.footer.firstElementChild.innerHTML = that.localize('ok');
                    window.$.footer.children[1].innerHTML = that.localize('cancel');

                    Array.from(window.getElementsByClassName('toggle-visibility')).forEach(element => element.title = that.localize('toggleVisibility'));
                    Array.from(window.querySelectorAll('.lw-card-view-editor.image')).forEach(element => {
                        Array.from(element.firstElementChild.children).forEach(thumbnail => thumbnail.title = that.localize('removeImage'));
                        element.children[1].innerHTML = that.localize('imageUrl');
                        element.children[2].children[1].title = that.localize('addImage');
                    });

                    Array.from(window.getElementsByTagName('lw-date-time-picker')).forEach(element => {
                        element.messages = that._innerElementMessages.dateTimePicker;
                        element.locale = that.locale;
                    });
                }

                if (that._customizePartCreated) {
                    const switchButton = that.$.customize.getElementsByTagName('lw-switch-button')[0];

                    that.$.customize.firstElementChild.firstElementChild.firstElementChild.innerHTML = that.localize('coverField');
                    that.$.customize.children[1].messages = that._innerElementMessages.columnPanel;
                    that.$.customize.children[1].locale = that.locale;
                    switchButton.setAttribute('crop', that.localize('crop'));
                    switchButton.setAttribute('fit', that.localize('fit'));
                }

                if (that._filterPartCreated) {
                    that.$.filter.firstElementChild.messages = that._innerElementMessages.multiColumnFilterPanel;
                    that.$.filter.firstElementChild.locale = that.locale;
                    that.$.filter.firstElementChild.editorPlaceholder = that.localize('filterValuePlaceholder');
                }

                if (that._sortPartCreated) {
                    that.$.sort.firstElementChild.messages = that._innerElementMessages.sortPanel;
                    that.$.sort.firstElementChild.locale = that.locale;
                }

                break;
            case 'rightToLeft':
                if (that._editInfo && !that._editInfo.updateWindowContent) {
                    that._editInfo.window.rightToLeft = newValue;
                    that.columns.forEach(function (column) {
                        const editorInfo = that._editInfo.editors[column.dataField],
                            element = editorInfo.element;

                        if (editorInfo.type === 'date') {
                            element.calendarButtonPosition = newValue ? 'left' : 'right';
                        }
                        else if (editorInfo.type === 'number') {
                            if (newValue) {
                                element.spinButtonsPosition = 'left';
                                element.radixDisplayPosition = 'right';
                            }
                            else {
                                element.spinButtonsPosition = 'right';
                                element.radixDisplayPosition = 'left';
                            }
                        }
                        else if (editorInfo.type === 'string' && element instanceof HTMLTextAreaElement) {
                            that.rightToLeft ? element.setAttribute('right-to-left', '') : element.removeAttribute('right-to-left');
                        }

                        element.rightToLeft = that.rightToLeft;
                    });
                }

                that.closePanel();
                break
            case 'scrolling': {
                const virtualModes = ['virtual', 'infinite'];

                if (virtualModes.indexOf(newValue) !== -1 || virtualModes.indexOf(oldValue) !== -1) {
                    // cannot switch from/to 'virtual' or 'infinite' "scrolling", because "dataSource" has been set up for a particular mode
                    that.scrolling = oldValue;
                    return;
                }

                that.$.scrollViewer.$.verticalScrollBar.mechanicalAction =
                    newValue === 'deferred' ? 'switchWhenReleased' : 'switchWhileDragging';
                break;
            }
        }
    }

    /**
     * Updates the columns property.
     */
    _updateColumns() {
        const that = this;

        that._normalizeColumns();
        that._createTemplate();
        that._fullRefresh();
    }

    /**
     * "Add new" button (+) click handler.
     */
    _addNewButtonClickHandler() {
        this._openEditDialog();
    }

    /**
     * click handler.
     */
    _clickHandler(event) {
        const that = this,
            target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target;

        if (that.$.header.contains(target)) {
            that._headerClickHandler(target, that.$.cardContainer);
            return;
        }

        const card = target.closest('lw-card');

        if (!card || target.classList.contains('lw-indicator') ||
            that._dragDetails && that._dragDetails.feedbackShown) {
            return;
        }

        if (that._dragDetails) {
            delete that._dragDetails;
            that.$.scrollViewer._scrollView.disableSwipeScroll = false;
        }

        if (!target.classList.contains('lw-arrow-up')) {
            if (that.editable && !that._clickToDrag) {
                that._openEditDialog(card.dataId);
            }

            return;
        }

        const dataContainer = card.getElementsByClassName('lw-card-view-content')[0],
            recordId = that._visibleSource[card.dataId].$.id;

        dataContainer.removeEventListener('transitionend', that._transitionendHandlerExpand);
        dataContainer.removeEventListener('transitionend', that._transitionendHandlerCollapse);

        if (that._collapsed[recordId]) {
            delete that._collapsed[recordId];
            that._getNumberOfCollapsedRows();

            if (that.hasAnimation) {
                that._expandDataContainer(dataContainer);
            }
            else {
                card.classList.remove('collapsed');
                target.classList.remove('collapsed');
                dataContainer.classList.remove('lw-visibility-hidden');
                that._partialRefresh();
            }

            window.getSelection().removeAllRanges();
        }
        else {
            that._collapsed[recordId] = true;
            that._getNumberOfCollapsedRows();
            card.classList.add('collapsed');
            target.classList.add('collapsed');

            if (that.hasAnimation) {
                that._collapseDataContainer(dataContainer);
            }
            else {
                dataContainer.classList.add('lw-visibility-hidden');
                that._partialRefresh();
            }
        }
    }

    /**
     * Edit dialog click handler.
     */
    _windowClickHandler(event) {
        const window = this,
            that = window.ownerElement,
            target = event.target.shadowRoot ? event.composedPath()[0] : event.target;

        if (target.closest('.ok')) {
            that._editInfo.ok = true;
            window.close();
        }
        else if (target.closest('.cancel')) {
            window.close();
        }
        else if (target.closest('.add')) {
            const container = target.closest('.container'),
                input = container.firstElementChild;

            if (input.value.trim() !== '') {
                const newImage = document.createElement('div');

                newImage.className = 'thumbnail';
                newImage.style.backgroundImage = `url("${input.value}")`;
                newImage.title = that.localize('removeImage');
                container.parentElement.firstElementChild.appendChild(newImage);
                input.value = '';
            }
        }
        else if (target.classList.contains('thumbnail')) {
            target.parentElement.removeChild(target);
        }
        else if (target.classList.contains('toggle-visibility')) {
            const column = that.columns.find(col => target.parentElement.getAttribute('data-field') === col.dataField);

            target.classList.toggle('hidden');
            that._changedVisibility.set(column, !target.classList.contains('hidden'));
        }
    }

    /**
     * Expands a card's data container.
     */
    _expandDataContainer(dataContainer) {
        const that = this,
            oldHeight = dataContainer.style.height,
            containerHeight = (that._cardContentHeight - that._verticalOffset) + 'px';

        dataContainer.style.height = containerHeight;
        dataContainer.classList.remove('lw-visibility-hidden');
        dataContainer.previousElementSibling.children[1].classList.remove('collapsed');

        if (oldHeight === containerHeight ||
            !parseFloat(oldHeight) && !parseFloat(containerHeight)) {
            that._transitionendHandlerExpand(that, dataContainer);
            return;
        }

        dataContainer.addEventListener('transitionend', that._transitionendHandlerExpand);
    }

    /**
     * Expand animation transitionend handler.
     */
    _transitionendHandlerExpand() {
        let cardView, container;

        if (arguments.length === 1) {
            container = this;
            cardView = cardView = container.closest('lw-card-view') || (container.getRootNode() && container.getRootNode().host ?
                container.getRootNode().host.closest('lw-card-view') : undefined);
        }
        else {
            cardView = arguments[0];
            container = arguments[1];
        }

        container.removeEventListener('transitionend', cardView._transitionendHandlerExpand);
        container.style.height = null;
        container.parentElement.parentElement.parentElement.classList.remove('collapsed');
        cardView._partialRefresh();
    }

    /**
     * Collapses a card's data container.
     */
    _collapseDataContainer(dataContainer) {
        const that = this,
            containerHeight = (that._cardContentHeight - that._verticalOffset) + 'px';

        dataContainer.style.transition = 'none';

        requestAnimationFrame(function () {
            dataContainer.style.height = containerHeight;
            dataContainer.style.transition = null;

            requestAnimationFrame(function () {
                dataContainer.style.height = '0px';
                dataContainer.classList.add('lw-visibility-hidden');

                if (containerHeight === '0px') {
                    that._transitionendHandlerCollapse(that, dataContainer);
                }
            });
        });

        dataContainer.addEventListener('transitionend', that._transitionendHandlerCollapse);
    }

    /**
     * Collapse animation transitionend handler.
     */
    _transitionendHandlerCollapse() {
        let cardView, container;

        if (arguments.length === 1) {
            container = this;
            cardView = container.closest('lw-card-view') || (container.getRootNode() && container.getRootNode().host ?
                container.getRootNode().host.closest('lw-card-view') : undefined);
        }
        else {
            cardView = arguments[0];
            container = arguments[1];
        }

        container.removeEventListener('transitionend', cardView._transitionendHandlerCollapse);
        container.style.height = null;
        cardView._partialRefresh();
    }

    /**
     * Gets the number of collapsed rows.
     */
    _getNumberOfCollapsedRows() {
        const that = this,
            dataSource = that._visibleSource,
            cardsPerRow = that._cardsPerRow,
            processedRows = [],
            collapsedRows = {};
        let number = 0;

        for (let recordId in that._collapsed) {
            const recordIndex = dataSource.findIndex ? dataSource.findIndex(record => record.$.id.toString() === recordId) :
                dataSource.boundSource.findIndex(record => record.$.id.toString() === recordId),
                row = Math.floor(recordIndex / cardsPerRow);

            if (processedRows.indexOf(row) !== -1) {
                continue;
            }

            const firstIndex = Math.max(0, row * cardsPerRow);
            let rowCollapsed = true;

            processedRows.push(row);

            for (let i = 0; i < cardsPerRow; i++) {
                const currentRecord = dataSource[i + firstIndex];

                if (!currentRecord) {
                    break;
                }

                if (!that._collapsed[currentRecord.$.id]) {
                    rowCollapsed = false;
                    break;
                }
            }

            if (rowCollapsed) {
                collapsedRows[row] = true;
                number++;
            }
        }

        that._collapsedRows = collapsedRows;
        that._numberOfCollapsedRows = number;
    }

    /**
     * Opens edit dialog.
     */
    _openEditDialog(dataId) {
        const that = this,
            dataSource = that._visibleSource,
            record = dataSource[dataId],
            openingEvent = that.$.fireEvent('opening', { record: record });

        if (openingEvent.defaultPrevented) {
            return;
        }

        that.$.container.setAttribute('modal', '');

        that.closePanel();
        that._changedVisibility = new Map();

        if (that._editInfo && !that._editInfo.updateWindowContent) {
            that._updateEditedView(dataId, true);
            return;
        }

        const structureFragment = document.createDocumentFragment(),
            editors = {};

        that.columns.forEach(function (column) {
            const dataField = column.dataField,
                value = record ? record[dataField] : '',
                label = document.createElement('div');
            let editor;

            label.className = `lw-card-view-label${column.icon ? ' icon ' + column.icon : ''}`;
            label.setAttribute('data-field', dataField);
            label.innerHTML = `${column.label}<span class="toggle-visibility${column.visible === false ? ' hidden' : ''}${
                (dataField === that.coverField || dataField === that.titleField) ? ' lw-hidden' : ''}" title="${that.localize('toggleVisibility')}" role="button" aria-label="Toggle field visibility"></span>`;
            structureFragment.appendChild(label);

            if (column.image) {
                editor = document.createElement('div');
                editor.className = 'lw-card-view-editor image';
                editor.setAttribute('aria-label', column.label);
                editor.innerHTML = `<div>${that._updateImgThumbNails(value)}</div>
<div class="label">${that.localize('imageUrl')}</div>
<div class="container" role="presentation">
    <lw-input aria-label="New image URL"></lw-input>
    <lw-button class="add" title="${that.localize('addImage')}" aria-label="Add image">+</lw-button>
</div>`;
                structureFragment.appendChild(editor);
                editors[dataField] = { element: editor, type: 'image' };
                return;
            }

            const type = that.dataSource.dataFields.find(dataField => dataField.name === column.dataField).dataType;

            if (type === 'date') {
                editor = document.createElement('lw-date-time-picker');
                editor.calendarButton = true;
                editor.calendarButtonPosition = that.rightToLeft ? 'left' : 'right';
                editor.dropDownAppendTo = 'body';
                editor.dropDownDisplayMode = 'auto';
                editor.dropDownPosition = 'bottom';
                editor.locale = that.locale;
                editor.messages = that._innerElementMessages.dateTimePicker;
                editor.nullable = true;
                editor.value = value || null;

                if (column.formatSettings && column.formatSettings.formatString) {
                    editor.formatString = column.formatSettings.formatString;
                }
            }
            else if (type === 'number') {
                editor = document.createElement('lw-numeric-text-box');
                editor.inputFormat = 'floatingPoint';
                editor.spinButtons = true;
                editor.nullable = true;

                if (that.rightToLeft) {
                    editor.spinButtonsPosition = 'left';
                    editor.radixDisplayPosition = 'right';
                }

                editor.value = value !== undefined && value !== null ? value : null;

                if (column.formatSettings && column.formatSettings.formatString) {
                    editor.outputFormatString = column.formatSettings.formatString;
                }
            }
            else if (type === 'boolean') {
                editor = document.createElement('lw-check-box');
                editor.checked = value || false;
            }
            else {
                if (typeof value === 'string' && value.length > 50) {
                    editor = document.createElement('textarea');

                    if (that.rightToLeft) {
                        editor.setAttribute('right-to-left', '');
                    }
                }
                else {
                    editor = document.createElement('lw-input');
                }

                editor.value = value !== undefined && value !== null ? value.toString() : '';
            }

            editor.className = 'lw-card-view-editor';
            editor.setAttribute('aria-label', column.label);
            editor.animation = that.animation;
            editor.theme = that.theme;
            editor.rightToLeft = that.rightToLeft;
            structureFragment.appendChild(editor);

            editors[dataField] = { element: editor, type: type };
        });

        if (that._editInfo && that._editInfo.updateWindowContent) {
            that._editInfo.window.clear();
            that._editInfo.window.appendChild(structureFragment);

            that._openWindow();
            that._editInfo.dataId = dataId;
            that._editInfo.editors = editors;
            delete that._editInfo.updateWindowContent;
            return;
        }

        const window = document.createElement('lw-window'),
            footerTemplate = document.createElement('template');

        footerTemplate.innerHTML = `<lw-button class="ok primary">${that.localize('ok')}</lw-button>
                                    <lw-button class="cancel">${that.localize('cancel')}</lw-button>`;

        window.classList.add('lw-card-view-window', 'lw-visibility-hidden');
        window.footerTemplate = footerTemplate;
        window.headerButtons = ['close', 'next', 'prev'];
        window.label = record ? record[that.titleField] : '';
        window.animation = that.animation;
        window.rightToLeft = that.rightToLeft;
        window.theme = that.theme;
        window.ownerElement = that;
        window.appendChild(structureFragment);
        document.body.appendChild(window);

        that._editInfo = { dataId: dataId, editors: editors, window: window };
        that._addWindowHandlers();

        window.whenRendered(() => {
            that.setAttribute('aria-owns', window.id);
            window.$.buttonsContainer.firstElementChild.title = that.localize('previousRecord');
            window.$.buttonsContainer.children[1].title = that.localize('nextRecord');
            that._openWindow();
        });
    }

    /**
     * Opens the instance of lwWindow.
     */
    _openWindow() {
        const lwWindow = this._editInfo.window,
            clientWidth = document.documentElement.clientWidth,
            clientHeight = document.documentElement.clientHeight,
            pageXOffset = window.pageXOffset,
            pageYOffset = window.pageYOffset;

        lwWindow.style.top = ((clientHeight - lwWindow.offsetHeight) / 2 + pageYOffset) + 'px';
        lwWindow.style.left = ((clientWidth - lwWindow.offsetWidth) / 2 + pageXOffset) + 'px';
        lwWindow.open();
    }

    /**
     * Adds window handlers.
     */
    _addWindowHandlers() {
        const that = this,
            window = that._editInfo.window;

        window.addEventListener('open', that._windowEventHandler);
        window.addEventListener('closing', that._windowEventHandler);
        window.addEventListener('close', that._windowEventHandler);
        window.addEventListener('click', that._windowClickHandler);
        window.addEventListener('prev', that._prevNextHandler);
        window.addEventListener('next', that._prevNextHandler);
    }

    /**
     * Edit dialog event handler.
     */
    _windowEventHandler(event) {
        const that = this.ownerElement,
            type = event.type,
            oldContext = that.context;

        if (event.target !== this) {
            // event is triggered from an editor
            return;
        }

        that.context = that;

        if (type === 'open') {
            that.$.fireEvent('open');
        }
        else if (type === 'closing') {
            const customEvent = that.$.fireEvent('closing');

            if (customEvent.defaultPrevented) {
                event.preventDefault();
            }
        }
        else if (type === 'close') {
            that.$.fireEvent('close');
            that._windowCloseHandler(event);
        }

        that.context = oldContext;
    }

    /**
     * Updates edited view.
     */
    _updateEditedView(dataId, toOpen) {
        const that = this,
            record = that._visibleSource[dataId];

        if (record && record.$.isEmpty) {
            return;
        }

        that._editInfo.dataId = dataId;

        that.columns.forEach(function (column) {
            const dataField = column.dataField,
                value = record ? record[dataField] : '',
                editorInfo = that._editInfo.editors[dataField];

            if (editorInfo.type === 'image') {
                editorInfo.element.firstElementChild.innerHTML = that._updateImgThumbNails(value);
            }
            else if (editorInfo.type === 'boolean') {
                editorInfo.element.checked = value || false;
            }
            else if (editorInfo.type === 'date') {
                editorInfo.element.value = value || null;
            }
            else if (editorInfo.type === 'number') {
                editorInfo.element.value = value !== undefined && value !== null ? value : null;
            }
            else {
                if (editorInfo.element instanceof HTMLTextAreaElement) {
                    that.rightToLeft ? editorInfo.element.setAttribute('right-to-left', '') : editorInfo.element.removeAttribute('right-to-left');
                }

                editorInfo.element.value = value !== undefined && value !== null ? value.toString() : '';
            }

            editorInfo.element.rightToLeft = that.rightToLeft;
        });

        that._editInfo.window.label = record ? record[that.titleField] : '';

        if (toOpen) {
            that._openWindow();
        }
    }

    /**
     * Updates image thumbnails in editor.
     */
    _updateImgThumbNails(value) {
        if (value.trim() === '') {
            return '';
        }

        const urlList = value.split(',').map(url => url.trim());
        let htmlResult = '';

        urlList.forEach(url => htmlResult += `<div class="thumbnail" style="background-image: url('${url}');" title="${this.localize('removeImage')}" role="img"></div>`);
        return htmlResult;
    }

    /**
     * move event handler.
     */
    _moveHandler(event) {
        if (event.originalEvent.type === 'touchmove') {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * "prev"/"next" button click handler.
     */
    _prevNextHandler(event) {
        const that = this.ownerElement,
            oldContext = that.context,
            dataId = that._editInfo.dataId,
            nextDataId = event.type === 'prev' ? dataId - 1 : dataId + 1;

        if (that._visibleSource[nextDataId] && !that._visibleSource[nextDataId].$.isEmpty) {
            that.context = that;
            that._saveChanges();
            that._updateEditedView(nextDataId);
            that.context = oldContext;
        }
    }

    /**
     * Saves changes.
     */
    _saveChanges() {
        const that = this,
            dataId = that._editInfo.dataId;
        let record, card;

        if (dataId !== undefined) {
            // saving changes to existing record
            const cardsWithDataId = that._cards.filter(card => card.dataId === dataId);

            record = that._visibleSource[dataId];
            card = cardsWithDataId[cardsWithDataId.length - 1];
        }
        else {
            // adding a new record
            record = {};
        }

        that.columns.forEach(function (column) {
            const dataField = column.dataField,
                editorInfo = that._editInfo.editors[dataField],
                element = editorInfo.element;

            if (editorInfo.type === 'image') {
                const newUrls = [];

                Array.from(editorInfo.element.getElementsByClassName('thumbnail')).forEach(thumbnail => {
                    newUrls.push(thumbnail.style.backgroundImage.replace(/url\(["'](.+)["']\)/g, '$1'));
                });

                record[dataField] = newUrls.join(',');

                if (card && dataField === that.coverField) {
                    card.firstElementChild.firstElementChild.dataSource = newUrls;
                    return;
                }
            }
            else if (editorInfo.type === 'boolean') {
                record[dataField] = element.checked;
            }
            else if (editorInfo.type === 'date') {
                record[dataField] = element.value ? element.value.toDate() : null;
            }
            else {
                record[dataField] = element.value;
            }

            if (card) {
                if (dataField === that.titleField) {
                    card.getElementsByClassName('lw-card-view-title')[0].firstElementChild.innerHTML = that._formatValue(record[dataField], record, column);
                }
                else if (column.visible) {
                    const field = card.querySelector(`[data-field="${dataField}"] > .lw-card-view-value`);

                    if (field) {
                        field.innerHTML = that._formatValue(record[dataField], record, column);
                    }
                }
            }
        });

        if (dataId === undefined) {
            that.addRecord(null, record);
        }
    }

    /**
     * Closes header panel (drop down) and edit dialog.
     */
    _close() {
        const that = this;

        that.closePanel();
        that._closeDialog();
    }

    /**
     * Closes the edit dialog.
     */
    _closeDialog() {
        const that = this;

        if (that._editInfo) {
            that._editInfo.window.close();
        }
    }

    /**
     * resize handler.
     */
    _resizeHandler() {
        const that = this;

        if (that._suppressResizeHandler || that.hasAttribute('empty') || that.hasAttribute('no-matches')) {
            return;
        }

        clearTimeout(that._resizeTimeout);
        that.$.loadingIndicatorContainer.classList.remove('lw-hidden');

        that._resizeTimeout = setTimeout(function () {
            that.$.loadingIndicatorContainer.classList.add('lw-hidden');
            if (that._cards.length === that._visibleSource.length) {
                // no virtual items

                // horizontal resize
                if (that.offsetWidth !== that._cachedWidth) {
                    const oldCardsPerRow = that._cardsPerRow;

                    that._getCardsPerRow();

                    if (oldCardsPerRow !== that._cardsPerRow) {
                        that._getNumberOfCollapsedRows();
                    }

                    that._cachedWidth = that.offsetWidth;
                }
                else {
                    that._cachedHeight = that.offsetHeight;
                }

                if (that._cards.length > 0) {
                    if (that._autoCardHeight) {
                        that._updateCardHeight(null);
                    }

                    that.$.scrollViewer.refresh();
                }

                return;
            }

            // vertical resize
            if (that.offsetHeight !== that._cachedHeight) {
                that._cachedHeight = that.offsetHeight;

                if (Math.abs(that._refreshedAtDimensions.height - that._cachedHeight) >= 20) {
                    that._dataSourceProcessed = true;
                    that._partialRefresh();
                    delete that._dataSourceProcessed;
                }
                else {
                    that.$.scrollViewer.$.verticalScrollBar.max = Math.max(0, that._scrollHeight - that.$.scrollViewer.$.scrollViewerContainer.offsetHeight - that._numberOfCollapsedRows * that._cardContentHeight);
                }
            }

            // horizontal resize
            if (that.offsetWidth !== that._cachedWidth) {
                const oldCardsPerRow = that._cardsPerRow;

                that._cachedWidth = that.offsetWidth;
                that._getCardsPerRow();

                if (oldCardsPerRow !== that._cardsPerRow) {
                    that._dataSourceProcessed = true;
                    that._partialRefresh();
                    delete that._dataSourceProcessed;
                }
            }
        }, 75);
    }

    /**
     * Edit window close handler.
     */
    _windowCloseHandler() {
        const that = this;

        that.$.container.removeAttribute('modal');

        if (that._editInfo.ok) {
            // OK
            that._updateColumnsVisibility(function () {
                that._saveChanges();
            });
            delete that._editInfo.ok;
            return;
        }

        // Cancel
        that._changedVisibility.forEach(function (visible, column) {
            if (column.visible !== visible) {
                that._editInfo.window.querySelector(`[data-field="${column.dataField}"]`).
                    firstElementChild.classList.toggle('hidden');
            }
        });
    }

    /**
     * Updates the visibility of columns.
     */
    _updateColumnsVisibility(callback, skipValidation) {
        const that = this;
        let updateHeight = false;

        that._changedVisibility.forEach(function (visible, column) {
            if (skipValidation !== true && column.visible === visible) {
                return;
            }

            const dataField = column.dataField;

            column.visible = visible;

            if (visible) {
                that._cardContent = that._cardContent.replace(`class="lw-card-view-cell lw-hidden" data-field="${dataField}"`,
                    `class="lw-card-view-cell" data-field="${dataField}"`);

                if (!callback && that._editInfo) {
                    that._editInfo.window.querySelector(`[data-field="${dataField}"]`).firstElementChild.classList.remove('hidden');
                }
            }
            else {
                that._cardContent = that._cardContent.replace(`class="lw-card-view-cell" data-field="${dataField}"`,
                    `class="lw-card-view-cell lw-hidden" data-field="${dataField}"`);

                if (!callback && that._editInfo) {
                    that._editInfo.window.querySelector(`[data-field="${dataField}"]`).firstElementChild.classList.add('hidden');
                }
            }

            that._cards.forEach(card => {
                const cell = card.querySelector(`[data-field="${dataField}"]`);

                cell.classList.toggle('lw-hidden');

                if (visible) {
                    const record = that._visibleSource[card.dataId];

                    cell.children[1].innerHTML = that._formatValue(record[dataField], record, column);
                }
            });
            updateHeight = true;
        });

        if (callback) {
            callback();
        }

        if (that._autoCardHeight && updateHeight) {
            that._updateCardHeight(null);
        }
    }

    /**
     * Header panels apply handler.
     */
    _applyHandler(event) {
        const that = this,
            target = event.target,
            detail = event.detail,
            customize = that.$.customize,
            columns = that.columns;

        if (customize.contains(target)) {
            const switchButton = customize.getElementsByTagName('lw-switch-button')[0],
                input = customize.getElementsByTagName('lw-input')[0],
                newCoverMode = switchButton.checked ? 'fit' : 'crop';
            let newCoverField = columns.find(col => col.label === input.value) || null,
                differentCoverField = false;

            if (newCoverMode !== that.coverMode) {
                that.coverMode = newCoverMode;
            }

            if (newCoverField) {
                newCoverField = newCoverField.dataField;
            }

            if (newCoverField !== that.coverField) {
                that.coverField = newCoverField;
                differentCoverField = true;
            }

            if (differentCoverField || detail.positionChanged) {
                if (detail.positionChanged) {
                    that.columns = detail.value;
                }

                that._createTemplate();
                that._fullRefresh();

                if (detail.positionChanged && that._editInfo) {
                    that._editInfo.updateWindowContent = true;
                }
            }
            else {
                detail.value.forEach(col => {
                    const cardViewColumn = columns.find(column => column.dataField === col.dataField);

                    if (cardViewColumn.visible !== col.visible) {
                        that._changedVisibility.set(cardViewColumn, col.visible);
                    }
                });
                that._updateColumnsVisibility();
            }
        }
        else if (that.$.filter.contains(target)) {
            that.addFilter(detail.filters, detail.operator, detail.value);
        }
        else if (that.$.sort.contains(target)) {
            that.addSort(detail.sortByInfo);
        }

        that.closePanel();
    }

    /**
     * Makes a full refresh of the view.
     */
    _fullRefresh(preserveScrolling = true) {
        const that = this,
            cardContainer = that.$.cardContainer;
        let fraction;

        if (preserveScrolling) {
            fraction = that._getFractionOfMax();
        }

        that._suppressResizeHandler = true;

        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }

        that._cards = [];
        that._createCards();

        if (that._visibleSource.length === 0) {
            that.$.scrollViewer.refresh();
        }

        that._setFractionOfMax(fraction);
    }

    /**
     * Normalizes the representation of the data source.
     */
    _normalizeDataSource() {
        const that = this;
        let dataSource = that.dataSource;

        function getDataFieldsFromColumns() {
            if (that.columns.length === 0) {
                that.addNewButton = false;
                return [];
            }

            const dataFields = [];

            that.columns.forEach(column => {
                try {
                    dataFields.push({ name: column.dataField || column.label || column, dataType: 'string' });
                }
                catch (error) {
                    return;
                }
            });

            return dataFields;
        }

        if (dataSource instanceof LW.DataAdapter) {
            if (dataSource.dataFields.length === 0) {
                dataSource.dataFields = getDataFieldsFromColumns();
            }

            return;
        }

        if (!dataSource) {
            dataSource = [];
        }
        else if (!Array.isArray(dataSource)) {
            if (typeof dataSource === 'object' && Object.keys(dataSource).length > 0) {
                dataSource = [dataSource];
            }
            else {
                that.error(that.localize('incorrectStructure'));
                return;
            }
        }

        let dataFields = [];

        if (dataSource.length === 0) {
            dataFields = getDataFieldsFromColumns();
        }
        else {
            let i = 0,
                record = dataSource[i],
                keys = Object.keys(record);

            while (record && keys.length === 0) {
                i++;
                record = dataSource[i];
                keys = Object.keys(record);
            }

            if (keys.length === 0) {
                dataFields = getDataFieldsFromColumns();
            }
            else {
                keys.forEach(key => {
                    const value = record[key];
                    let type;

                    if (value.constructor === Date) {
                        type = 'date';
                    }
                    else if (typeof value === 'boolean') {
                        type = 'boolean';
                    }
                    else if (!isNaN(value) && value !== null && value !== '') {
                        type = 'number';
                    }
                    else {
                        type = 'string';
                    }

                    dataFields.push(`${key}: ${type}`);
                });
            }
        }

        that.dataSource = new LW.DataAdapter({ dataSource: dataSource, dataFields: dataFields });
    }

    /**
     * Normalizes the representation of the columns.
     */
    _normalizeColumns() {
        const that = this,
            columns = that.columns,
            dataFields = that.dataSource.dataFields,
            validColumns = [];

        if (!Array.isArray(columns) && !(columns instanceof LW.ObservableArray)) {
            return;
        }

        columns.forEach(column => {
            let columnDataField, formatFunction, formatSettings, icon, image, label, template, visible;

            if (typeof column === 'object') {
                columnDataField = column.dataField;
                formatFunction = column.formatFunction;
                formatSettings = column.formatSettings;
                icon = column.icon;
                image = column.image || false;
                label = column.label || columnDataField;
                template = column.template;
                visible = columnDataField !== that.titleField && columnDataField !== that.coverField ?
                    (column.visible !== undefined ? column.visible : true) : true;
            }
            else if (typeof column === 'string') {
                columnDataField = column;
                image = false;
                label = columnDataField;
                visible = true;
            }

            if (dataFields.find(dataField => dataField.name === columnDataField)) {
                validColumns.push({ dataField: columnDataField, formatFunction: formatFunction, formatSettings: formatSettings, icon: icon, image: image, label: label, template: template, visible: visible });
            }
        });

        if (validColumns.length === 0) {
            dataFields.forEach(dataField => {
                validColumns.push({ dataField: dataField.name, image: false, label: dataField.name, visible: true });
            });
        }

        if (!validColumns.find(col => col.dataField === that.titleField)) {
            that.titleField = null;
        }

        if (!validColumns.find(col => col.dataField === that.coverField && col.image)) {
            that.coverField = null;
        }

        that.columns = new LW.ObservableArray(validColumns);
        that.columns.canNotify = true;
        that.columns.notify(function (changeArgs) {
            if (that.context !== that && changeArgs.newValue !== changeArgs.oldValue) {
                that._close();

                if (changeArgs.action === 'update') {
                    const column = changeArgs.target;

                    switch (changeArgs.propertyName) {
                        case 'dataField':
                            that._updateColumns();
                            break;
                        case 'formatFunction':
                        case 'formatSettings':
                        case 'template':
                            that._createTemplate();
                            that._fullRefresh();
                            break;
                        case 'icon':
                        case 'label':
                            if (column.dataField !== that.coverField && column.dataField !== that.titleField) {
                                that._createTemplate();
                                that._fullRefresh();
                            }

                            break;
                        case 'image':
                            if (!changeArgs.newValue &&
                                that.coverField === column.dataField) {
                                that.coverField = null;
                                that.propertyChangedHandler('coverField', column.dataField, null);
                            }
                            else {
                                that._createTemplate();
                                that._fullRefresh();
                            }
                            break;
                        case 'visible': {
                            const updatedColumnDataField = column.dataField;

                            if (!changeArgs.newValue &&
                                (updatedColumnDataField === that.coverField ||
                                    updatedColumnDataField === that.titleField)) {
                                column.visible = true;
                                return;
                            }

                            that._toggleColumn(updatedColumnDataField, changeArgs.newValue, true);
                            break;
                        }
                    }
                }
                else {
                    that._updateColumns();
                }

                if (that._editInfo) {
                    that._editInfo.updateWindowContent = true;
                }
            }
        });

        if (that._editInfo) {
            that._editInfo.updateWindowContent = true;
        }
    }

    /**
     * Localizes labels in the header.
     */
    _localizeHeader() {
        const that = this;

        super._localizeHeader();

        that.$.cardContainer.setAttribute('no-data', that.localize('noData'));
        that.$.cardContainer.setAttribute('no-matches', that.localize('noMatches'));
    }

    /**
     * Opens search panel.
     */
    _openSearchPanel() {
        const that = this;
        let source;

        that.$.headerDropDown.classList.add('search-panel');
        that.$.headerDropDown.classList.remove('customize-panel', 'filter-panel', 'sort-panel');
        that.$.search.classList.remove('lw-hidden');
        that.$.customize.classList.add('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that._openHeaderDropDown(that.$.searchButton);

        if (Array.isArray(that._visibleSource)) {
            source = new LW.DataAdapter({ dataSource: that._visibleSource, dataFields: that.dataSource.dataFields, id: '_id' });
        }
        else {
            const sortByInfo = that._appliedSorting;
            let id = that._visibleSource.id;

            if (id) {
                source = that._visibleSource;
            }
            else {
                id = 'id';
                source = [];

                for (let i = 0; i < that._visibleSource.length; i++) {
                    const currentRecord = that._visibleSource[i];

                    source.push(Object.assign({ id: currentRecord.$.id }, currentRecord));
                }
            }

            source = new LW.DataAdapter({
                dataSource: source,
                dataFields: that.dataSource.dataFields,
                id: id
            });

            if (sortByInfo.dataFields.length > 0) {
                source.sortBy(sortByInfo.dataFields, sortByInfo.dataTypes, sortByInfo.orderBy);
            }
        }

        that._searchInfo = {
            source: source,
            stringDataFields: that.dataSource.dataFields.filter(dataField => {
                return dataField.dataType === 'string' &&
                    that.columns.find(column => column.dataField === dataField.name && !column.image);
            }).map(dataField => dataField.name)
        };

        if (that.$.searchInput.value !== '') {
            that._search(that.$.searchInput.value, false);
        }
    }

    /**
     * Creates card template.
     */
    _createTemplate() {
        const that = this,
            titleField = that.titleField;
        let content = '';

        if (titleField) {
            content += `<div class="lw-card-view-title" data-field="${titleField}" role="heading" aria-level="1"><div>{{${titleField}}}</div><div class="lw-arrow-up" role="button" aria-label="Toggle card"></div></div>`;
        }
        else {
            content += '<div class="lw-card-view-title empty" role="heading" aria-level="1"><div>&nbsp;</div><div class="lw-arrow-up" role="button" aria-label="Toggle card"></div></div>';
        }

        content += '<div class="lw-card-view-content" role="grid">';

        that.columns.forEach(column => {
            const columnField = column.dataField;

            if (column.visible !== false) {
                column.visible = true;
            }

            if (columnField === titleField || columnField === that.coverField) {
                return;
            }

            content += `<div class="lw-card-view-cell${column.visible ? '' : ' lw-hidden'}" data-field="${columnField}" role="row"><div class="lw-card-view-label${column.icon ? ' icon ' + column.icon : ''}" role="rowheader">${column.label}</div>
<div class="lw-card-view-value" role="gridcell">{{${columnField}}}</div></div>`;
        });

        content += '</div>';
        that._cardContent = content;
    }

    /**
     * Requests initial cards when "scrolling" is 'infinite'.
     */
    _requestInitialCards() {
        const that = this;

        that.setAttribute('loading', '');
        that.$.loadingIndicatorContainer.classList.remove('lw-hidden');

        that.dataSource.onVirtualDataSourceRequested(function () {
            that._createCards();
            that.removeAttribute('loading');
            that.$.loadingIndicatorContainer.classList.add('lw-hidden');
        }, { first: Infinity, last: Infinity, sorting: [], filtering: [], grouping: [], action: '' });
    }

    /**
     * Creates cards and fills them with data.
     */
    _createCards() {
        const that = this,
            dataSource = that._visibleSource;

        if (!dataSource || dataSource.length === 0) {
            return;
        }

        const scrolling = that.scrolling,
            virtual = scrolling === 'virtual',
            viewHeight = that.$.scrollViewer.$.scrollViewerContainer.offsetHeight;
        let dataSourceLength = dataSource.length,
            numberOfRealRows = 1,
            currentRowOffsetTop = 0,
            maxHeight = 0,
            cardsPerRow;

        that._ignoreVerticalChange = true;
        that.removeAttribute('empty');

        if (virtual) {
            that.setAttribute('loading', '');
        }

        for (let i = 0; i < dataSourceLength; i++) {
            const card = that._createCard(dataSource[i], i);

            that._cards.push(card);
            that.$.cardContainer.appendChild(card);

            that.$.scrollViewer.refresh();

            if (that._autoCardHeight) {
                maxHeight = Math.max(card.offsetHeight, maxHeight);
            }

            if (card.offsetTop > currentRowOffsetTop) {
                numberOfRealRows++;
                currentRowOffsetTop = card.offsetTop;

                if (!cardsPerRow) {
                    that._getCardsPerRow();
                    cardsPerRow = that._cardsPerRow;
                }
            }

            if (numberOfRealRows >= 3 &&
                that._cards.length % cardsPerRow === 0 &&
                that.$.cardContainer.offsetHeight > viewHeight + 2 * (that.cardHeight || maxHeight) &&
                that._cards.length + 5 < dataSourceLength) {
                break;
            }
        }

        cardsPerRow = cardsPerRow || that._cards.length;

        if (scrolling === 'infinite') {
            while (that._cards.length % cardsPerRow !== 0) {
                that._createEmptyCard();
            }
        }

        if (that._autoCardHeight) {
            that._cardHeight = maxHeight;
            that._cards.forEach(card => card.style.height = maxHeight + 'px');
        }

        that._cardContentHeight = that._cards[0].getElementsByClassName('lw-card-view-content')[0].offsetHeight + that._verticalOffset;
        that._cards.forEach(card => that._toggleCard(card, card.firstElementChild.lastElementChild, that._visibleSource[card.dataId].$.id));

        const numberOfVirtualRows = Math.ceil(dataSourceLength / cardsPerRow),
            scrollHeight = (that._cardHeight + that._gap) * numberOfVirtualRows - that._gap;

        that.$.scrollViewer.$.scrollViewerContentContainer.style.top = 0;
        that.$.scrollViewer.$.verticalScrollBar.max = Math.max(0, scrollHeight - viewHeight - that._numberOfCollapsedRows * that._cardContentHeight);

        that._cardsPerRow = cardsPerRow;
        that._scrollHeight = scrollHeight;
        that._refreshedAtDimensions = { width: that._cachedWidth, height: that._cachedHeight };
        that._getNumberOfCollapsedRows();

        delete that._ignoreVerticalChange;
        delete that._suppressResizeHandler;

        if (virtual) {
            that.$.loadingIndicatorContainer.classList.remove('lw-hidden');
            that.dataSource.onVirtualDataSourceRequested(
                that._virtualDataSourceRequestedCallback.bind(that, 0, 0, true),
                { first: 0, last: that._cards.length, sorting: [], filtering: [], grouping: [], action: '' });
        }
    }

    /**
     * "onVirtualDataSourceRequested" callback function.
     */
    _virtualDataSourceRequestedCallback(startOfView, startOfData, initialization) {
        const that = this;

        that._ignoreVerticalChange = true;
        that.$.loadingIndicatorContainer.classList.add('lw-hidden');

        that._updateVisibleCards(startOfView, startOfData, initialization);

        that.removeAttribute('loading');
        delete that._ignoreVerticalChange;

        if (that._beginEditOnLoad) {
            const cardsWithDataId = that._cards.filter(card => card.dataId === that._beginEditOnLoad),
                cardMatch = cardsWithDataId[cardsWithDataId.length - 1];

            if (cardMatch) {
                that._openEditDialog(cardMatch.dataId);
            }

            delete that._beginEditOnLoad;
        }
    }

    /**
     * Creates a card.
     */
    _createCard(record = {}, dataId) {
        const that = this,
            coverField = that.coverField,
            visibleSource = that._visibleSource,
            card = document.createElement('lw-card'),
            cardDataContainer = document.createElement('div');

        requestAnimationFrame(() => card.hasStyleObserver = false);
        card.setAttribute('aria-setsize', visibleSource.length);
        card.setAttribute('aria-posinset', dataId + 1);
        card.dataId = dataId;

        card.whenRendered(function () {
            card.setAttribute('role', 'listitem');
            card.firstElementChild.onscroll = function () {
                const id = visibleSource[this.parentElement.dataId].$.id;

                that._cardScrolling[id] = this.scrollTop;
            }
        });

        if (!that._autoCardHeight) {
            card.style.height = that._cardHeight + 'px';
        }

        cardDataContainer.className = 'lw-card-data-container';
        cardDataContainer.setAttribute('role', 'presentation');
        that._applyTemplate(record, card, cardDataContainer, true);

        if (coverField) {
            const carousel = document.createElement('lw-carousel');
            let carouselSource = record[coverField];

            if (that.shadowRoot) {
                carousel._isInShadowDOM = true;
            }

            carouselSource = typeof carouselSource === 'string' ? carouselSource.split(',').map(url => url.trim()) : [];
            carousel.dataSource = carouselSource;
            carousel.hideArrows = true;
            carousel.unfocusable = true;
            carousel.animation = that.animation;
            carousel.theme = that.theme;
            carousel.rightToLeft = that.rightToLeft;
            carousel.onIndexChange = function (index) {
                that._cardSelectedCover[visibleSource[card.dataId].$.id] = index;
            };
            carousel.whenReady(function () {
                carousel.hasStyleObserver = false;
                carousel.$.arrowLeft.hasStyleObserver = false;
                carousel.$.arrowRight.hasStyleObserver = false;
            });

            card.appendChild(carousel);
        }

        card.appendChild(cardDataContainer);

        return card;
    }

    /**
     * Toggles a card.
     */
    _toggleCard(card, dataContainer, recordId) {
        const that = this;

        card.setAttribute('updating', '');

        if (that._collapsed[recordId]) {
            card.classList.add('collapsed');
            dataContainer.firstElementChild.children[1].classList.add('collapsed');
            dataContainer.children[1].classList.add('lw-visibility-hidden');
        }
        else {
            card.classList.remove('collapsed');
            dataContainer.firstElementChild.children[1].classList.remove('collapsed');
            dataContainer.children[1].classList.remove('lw-visibility-hidden');
        }

        setTimeout(function () {
            card.removeAttribute('updating');
        }, 100);
    }

    /**
     * Creates an empty card.
     */
    _createEmptyCard(hidden = true) {
        const that = this,
            card = that._createCard({});

        if (hidden) {
            card.classList.add('lw-hidden');
        }

        card.style.height = that._cardHeight + 'px';
        that._cards.push(card);
        that.$.cardContainer.appendChild(card);
    }

    /**
     * Applies card template.
     */
    _applyTemplate(record, card, container, create) {
        const that = this,
            columns = that.columns,
            titleField = that.titleField;

        if (create) {
            let content = that._cardContent;

            for (let i = 0; i < columns.length; i++) {
                const column = columns[i];

                if (!column.visible) {
                    continue;
                }

                const dataField = column.dataField,
                    regex = new RegExp(`{{${dataField}}}`, 'g'),
                    data = that._formatValue(record[dataField], record, column);

                content = content.replace(regex, data);
            }

            container.innerHTML = content.replace(/{{\w+}}/g, '');

            if (titleField) {
                const titleId = that.id + 'Title' + (record.$ && record.$.id !== undefined ? record.$.id : 'Empty' + Math.floor(Math.random() * 1000));

                container.firstElementChild.firstElementChild.id = titleId;
                card.setAttribute('aria-labelledby', titleId);
            }

            return;
        }

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];

            if (!column.visible) {
                continue;
            }

            const dataField = column.dataField,
                element = container.querySelector(`[data-field="${dataField}"]`);

            if (element) {
                const data = that._formatValue(record[dataField], record, column);

                if (dataField === titleField) {
                    element.firstElementChild.innerHTML = data;
                }
                else {
                    element.children[1].innerHTML = data;
                }
            }
        }
    }

    /**
     * Formats a value based on formatFunction, formatString or template.
     */
    _formatValue(value, record, column) {
        const that = this;

        if (Object.keys(record).length === 0) {
            return '';
        }

        const settings = { column: column, record: record, template: column.template, value: value };

        if (column.formatFunction) {
            column.formatFunction(settings);
        }

        value = settings.value;

        if (settings.template) {
            return that._applyCellTemplate(settings.template, value, record, column);
        }
        else if (column.formatSettings) {
            let result = '';

            if (column.formatSettings.prefix) {
                result += column.formatSettings.prefix;
            }

            if (column.formatSettings.formatString && value !== undefined && value !== null) {
                if (value.constructor === Date) {
                    value = new LW.Utilities.DateTime(value).toString(column.formatSettings.formatString);
                }
                else if (value instanceof LW.Utilities.DateTime) {
                    value = value.toString(column.formatSettings.formatString);
                }
                else if (!isNaN(value) && that._numericFormatter) {
                    value = that._numericFormatter.formatNumber(value, column.formatSettings.formatString);
                }
            }

            result += value;

            if (column.formatSettings.sufix) {
                result += column.formatSettings.sufix;
            }

            return result;
        }

        return value;
    }

    /**
     * Applies cell template.
     */
    _applyCellTemplate(template, value = '', record, column) {
        let result = '';

        if (typeof template === 'function') {
            const settings = { column: column, record: record, template: null, value: value };

            template(settings);

            value = settings.value;

            if (settings.template === null) {
                return value;
            }

            template = settings.template;
        }

        if (template.startsWith('#')) {
            const templateElement = document.querySelector(template);

            if (templateElement && templateElement instanceof HTMLTemplateElement) {
                const templateContent = templateElement.content.cloneNode(true),
                    tempElement = document.createElement('div');

                tempElement.appendChild(templateContent);

                value = value.toString();
                value = value.replace(/'/ig, '\\\'');
                value = value.replace(/"/ig, '\\"');

                result = tempElement.innerHTML.replace(/{{value}}/ig, value).replace(/{{id}}/ig, record.$.id);

                if (result.indexOf('{{value=') >= 0) {
                    if (!value) {
                        result = result.replace(/{{value=/ig, '');
                        result = result.replace(/}}/ig, '');
                    }
                    else {
                        result = result.substring(0, result.indexOf('{{value=')) + value + result.substring(result.indexOf('}'));
                        result = result.replace(/}/ig, '');
                        result = result.replace(/{/ig, '');
                    }
                }

                return result;
            }
        }

        result = template.replace(/{{value}}/ig, value).replace(/{{id}}/ig, record.$.id);
        return result;
    }

    /**
     * Gets the current number of cards per row.
     */
    _getCardsPerRow() {
        const that = this,
            cards = that._cards;

        if (cards.length === 0) {
            that._cardsPerRow = 0;
            return;
        }

        let previousTop = cards[0].offsetTop,
            number = 1;

        for (let i = 1; i < cards.length; i++) {
            if (cards[i].offsetTop > previousTop) {
                break;
            }

            number++;
        }

        that._cardsPerRow = number;
    }

    /**
     * Vertical scrolling handler.
     */
    _onVerticalChange(event) {
        const that = this;

        if (that._ignoreVerticalChange) {
            return;
        }

        const dataSource = that._visibleSource,
            scrolling = that.scrolling,
            fullCardHeight = that._cardHeight + that._gap,
            cardsPerRow = that._cardsPerRow;
        let value = event.detail.value;

        if (that._cards.length === dataSource.length) {
            // no virtual items
            const start = Math.floor(value / fullCardHeight) * cardsPerRow;

            that._start = { view: start, data: start };

            if (that._dataSourceProcessed) {
                that._refreshCardContent();
            }

            that.$.scrollViewer.$.scrollViewerContentContainer.style.top = -value + 'px';

            if (scrolling === 'infinite' &&
                that.$.scrollViewer.$.verticalScrollBar.value === that.$.scrollViewer.$.verticalScrollBar.max) {
                that._onScrollBottomReached(start, start);
            }

            return;
        }

        let startOfView, startOfData;

        clearTimeout(that._scrollingTimeout);

        if (that._numberOfCollapsedRows > 0) {
            const numberOfAllRows = Math.floor((dataSource.length - 1) / cardsPerRow) + 1;
            let height = 0,
                difference;

            startOfView = cardsPerRow;

            for (let i = 0; i < numberOfAllRows; i++) {
                const currentRowIndex = i,
                    previousHeight = height;

                if (that._collapsedRows[currentRowIndex]) {
                    height += fullCardHeight - that._cardContentHeight;
                }
                else {
                    height += fullCardHeight;
                }

                if (startOfData === undefined && value <= height) {
                    startOfData = currentRowIndex * cardsPerRow;
                    difference = value - previousHeight;
                    break;
                }
            }

            value = difference + fullCardHeight;
        }
        else {
            value = value % (2 * fullCardHeight) + fullCardHeight;

            if (value < fullCardHeight) {
                value += fullCardHeight;
            }

            while (value + that.$.scrollViewer.$.scrollViewerContainer.offsetHeight > that.$.cardContainer.offsetHeight) {
                value -= fullCardHeight;
            }

            startOfView = Math.floor(value / fullCardHeight) * cardsPerRow;
            startOfData = Math.floor(event.detail.value / fullCardHeight) * cardsPerRow;

            if (startOfView < 0) {
                startOfData -= startOfView;
                startOfView = 0;
            }
        }

        const endOfData = Math.min(startOfData + that._cards.length - startOfView - 1, dataSource.length - 1);

        if (scrolling === 'virtual' && (dataSource[startOfData].$.isEmpty || dataSource[endOfData].$.isEmpty)) {
            const size = endOfData - startOfData;
            let first, last;

            for (let i = startOfData; i <= endOfData; i++) {
                if (dataSource[i].$.isEmpty) {
                    first = i;
                    last = first;
                    break;
                }
            }

            while (dataSource[last + 1] && dataSource[last + 1].$.isEmpty && last - first < size) {
                last++;
            }

            that.setAttribute('loading', '');
            that.$.loadingIndicatorContainer.classList.remove('lw-hidden');
            that.$.scrollViewer.$.scrollViewerContentContainer.style.top = -value + 'px';
            that._scrollingTimeout = setTimeout(function () {
                that.dataSource.onVirtualDataSourceRequested(
                    that._virtualDataSourceRequestedCallback.bind(that, startOfView, startOfData),
                    { first: first, last: last, sorting: [], filtering: [], grouping: [], action: '' });
            }, 300);
            return;
        }

        that.$.scrollViewer.$.scrollViewerContentContainer.style.top = -value + 'px';
        that._updateVisibleCards(startOfView, startOfData);

        if (scrolling === 'virtual') {
            that.removeAttribute('loading');
            that.$.loadingIndicatorContainer.classList.add('lw-hidden');
        }
        else if (scrolling === 'infinite' &&
            that.$.scrollViewer.$.verticalScrollBar.value === that.$.scrollViewer.$.verticalScrollBar.max) {
            that._onScrollBottomReached(startOfView, startOfData);
        }
    }

    /**
     * Scroll bottom reached handler when "scrolling" is 'infinite'.
     */
    _onScrollBottomReached(startOfView, startOfData) {
        const that = this;

        that.$.loadingIndicatorContainer.classList.remove('lw-hidden');

        that.dataSource.onVirtualDataSourceRequested(function () {
            that._updateVisibleCards(startOfView, startOfData);

            const numberOfVirtualRows = Math.ceil(that._visibleSource.length / that._cardsPerRow),
                scrollHeight = (that._cardHeight + that._gap) * numberOfVirtualRows - that._gap,
                viewHeight = that.$.scrollViewer.$.scrollViewerContainer.offsetHeight;

            that.$.scrollViewer.$.verticalScrollBar.max = Math.max(0, scrollHeight - viewHeight - that._numberOfCollapsedRows * that._cardContentHeight);
            that._scrollHeight = scrollHeight;
            that.$.loadingIndicatorContainer.classList.add('lw-hidden');
        }, { first: Infinity, last: Infinity, sorting: [], filtering: [], grouping: [], action: '' });
    }

    /**
     * Updates visible cards.
     */
    _updateVisibleCards(startOfView, startOfData, initialization) {
        const that = this,
            startCoefficient = startOfData - startOfView,
            visibleSourceLength = that._visibleSource.length;

        for (let i = 0; i < startOfView; i++) {
            const card = that._cards[i];

            card.setAttribute('aria-hidden', true);

            if (card.classList.contains('collapsed')) {
                that._toggleCard(card, card.firstElementChild.lastElementChild);
            }
        }

        for (let i = startOfView; i < that._cards.length; i++) {
            const card = that._cards[i],
                newDataId = startCoefficient + i;

            card.removeAttribute('aria-hidden');

            if (newDataId < that._visibleSource.length) {
                card.classList.remove('lw-hidden');
                card.setAttribute('aria-setsize', visibleSourceLength);
                card.setAttribute('aria-posinset', newDataId + 1);

                if (card.dataId !== newDataId || initialization || that._dataSourceProcessed) {
                    that._updateVirtualCard(card, newDataId);
                }
            }
            else {
                card.classList.add('lw-hidden');
            }
        }

        that._start = { view: startOfView, data: startOfData };
    }

    /**
     * Toggles the visibility of a column.
     */
    _toggleColumn(dataField, visible, skipValidation) {
        const that = this,
            dataSource = that._visibleSource;

        if (!dataField || typeof dataField !== 'string' ||
            dataField === that.coverField || dataField === that.titleField ||
            !dataSource || dataSource.length === 0) {
            return;
        }

        const column = that.columns.find(col => col.dataField === dataField);

        if (!column) {
            return;
        }

        that._close();
        that._changedVisibility = new Map();
        that._changedVisibility.set(column, visible);
        that._updateColumnsVisibility(undefined, skipValidation);
    }

    /**
     * Updates virtual card with new data.
     */
    _updateVirtualCard(card, newDataId) {
        const that = this,
            record = that._visibleSource[newDataId],
            recordId = record.$.id,
            dataContainer = card.firstElementChild.lastElementChild,
            coverField = that.coverField;

        card.dataId = newDataId;
        that._applyTemplate(record, card, dataContainer);

        card.firstElementChild.scrollTop = that._cardScrolling[recordId] || 0;

        if (that._dragDetails) {
            if (card.dataId === that._dragDetails.index) {
                card.classList.add('dragged');
            }
            else {
                card.classList.remove('dragged');
            }
        }

        if (that._searchInfo) {
            if (that._searchInfo.foundIdsObject[recordId]) {
                card.classList.add('lw-data-view-found');

                if (that._searchInfo.highlighted === recordId) {
                    card.classList.add('lw-data-view-highlighted');
                }
                else {
                    card.classList.remove('lw-data-view-highlighted');
                }
            }
            else {
                card.classList.remove('lw-data-view-found', 'lw-data-view-highlighted');
            }
        }

        that._toggleCard(card, dataContainer, recordId);

        if (coverField) {
            const carousel = card.firstElementChild.firstElementChild;
            let carouselSource = record[coverField];

            carouselSource = typeof carouselSource === 'string' ? carouselSource.split(',').map(url => url.trim()) : [];
            carousel.set('dataSource', carouselSource);

            if (carouselSource.length > 0) {
                const selectedIndex = that._cardSelectedCover[recordId] || 0;

                carousel._generateIndicators();
                carousel._indicators[selectedIndex].classList.add('lw-active');
                carousel._generateItems();
                carousel._items[selectedIndex].classList.add('lw-active');
                carousel._currentIndex = selectedIndex;
            }
        }
    }

    /**
     * Updates virtual card with new data.
     */
    _updateCardHeight(newHeight) {
        const that = this,
            cards = that._cards;

        if (newHeight === null) {
            // apply "auto" height
            let maxHeight = 0,
                restoreCollapsedState = [];

            that._autoCardHeight = true;

            if (that._cards.length === 0) {
                return;
            }

            cards.forEach(card => {
                card.style.height = null;

                if (card.classList.contains('collapsed')) {
                    card.setAttribute('updating', '');
                    card.classList.remove('collapsed');
                    card.getElementsByClassName('lw-card-view-content')[0].classList.remove('lw-visibility-hidden');
                    restoreCollapsedState.push(card);
                }
            });
            cards.forEach(card => maxHeight = Math.max(card.offsetHeight, maxHeight));
            cards.forEach(card => card.style.height = maxHeight + 'px');
            that._cardContentHeight = that._cards[0].getElementsByClassName('lw-card-view-content')[0].offsetHeight + that._verticalOffset;

            if (restoreCollapsedState.length > 0) {
                restoreCollapsedState.forEach(card => {
                    card.classList.add('collapsed');
                    card.getElementsByClassName('lw-card-view-content')[0].classList.add('lw-visibility-hidden');
                });

                setTimeout(function () {
                    restoreCollapsedState.forEach(card => card.removeAttribute('updating'));
                }, 100);
            }

            if (that._cardHeight === maxHeight) {
                return;
            }

            that._cardHeight = maxHeight;
        }
        else {
            const firstCard = that._cards[0];
            let restoreCollapsedState;

            that._autoCardHeight = false;

            if (that._cardHeight === newHeight) {
                return;
            }

            that._cardHeight = newHeight;

            if (!firstCard) {
                return;
            }

            cards.forEach(card => card.style.height = newHeight + 'px');

            if (firstCard.classList.contains('collapsed')) {
                firstCard.setAttribute('updating', '');
                firstCard.classList.remove('collapsed');
                firstCard.getElementsByClassName('lw-card-view-content')[0].classList.remove('lw-visibility-hidden');
                restoreCollapsedState = true;
            }

            that._cardContentHeight = that._cards[0].getElementsByClassName('lw-card-view-content')[0].offsetHeight + that._verticalOffset;

            if (restoreCollapsedState) {
                firstCard.classList.add('collapsed');
                firstCard.getElementsByClassName('lw-card-view-content')[0].classList.add('lw-visibility-hidden');

                setTimeout(function () {
                    firstCard.removeAttribute('updating');
                }, 100);
            }
        }

        that._partialRefresh();
    }

    /**
     * Refreshes the view and adds or removes cards if necessary.
     */
    _partialRefresh() {
        const that = this;

        that._refreshedAtDimensions = { width: that._cachedWidth, height: that._cachedHeight };

        if (that._cards.length === that._visibleSource.length) {
            if (that._dataSourceProcessed) {
                that._refreshCardContent();
            }

            that.$.scrollViewer.refresh();
            return;
        }

        that._getCardsPerRow();

        const viewHeight = that.$.scrollViewer.$.scrollViewerContainer.offsetHeight,
            fullCardHeight = that._cardHeight + that._gap,
            numberOfCollapsedCards = Object.keys(that._collapsed).length;
        let cardsPerRow = that._cardsPerRow;

        function regulateNumberOfCards() {
            let targetCardNum = ((viewHeight + 2 * fullCardHeight) / fullCardHeight) * cardsPerRow;

            targetCardNum = targetCardNum - (targetCardNum % cardsPerRow) + cardsPerRow;

            while (numberOfCollapsedCards > 0 && targetCardNum * (fullCardHeight - that._cardContentHeight) < viewHeight + 2 * fullCardHeight) {
                targetCardNum++;
            }

            targetCardNum = Math.min(targetCardNum, that._visibleSource.length);

            while (that._cards.length < targetCardNum) {
                that._createEmptyCard(false);
            }

            while (that._cards.length > targetCardNum) {
                that._cards[that._cards.length - 1].remove();
                that._cards.pop();
            }

            while (that.scrolling === 'infinite' && that._cards.length % cardsPerRow !== 0) {
                that._createEmptyCard();
            }
        }

        regulateNumberOfCards();
        that._getCardsPerRow();

        if (cardsPerRow !== that._cardsPerRow) {
            cardsPerRow = that._cardsPerRow;
            regulateNumberOfCards();
        }

        that._getNumberOfCollapsedRows();

        const fractionOfMax = that._getFractionOfMax(),
            numberOfVirtualRows = Math.ceil(that._visibleSource.length / that._cardsPerRow),
            scrollHeight = fullCardHeight * numberOfVirtualRows - that._gap,
            newMax = Math.max(0, scrollHeight - viewHeight - that._numberOfCollapsedRows * that._cardContentHeight);

        that.$.scrollViewer.$.verticalScrollBar.max = newMax;
        that._scrollHeight = scrollHeight;

        if (newMax === 0) {
            that.$.scrollViewer.refresh();
        }

        that._setFractionOfMax(fractionOfMax);
    }

    /**
     * Gets what part of max has been scrolled.
     */
    _getFractionOfMax() {
        const verticalScrollBar = this.$.scrollViewer.$.verticalScrollBar,
            max = verticalScrollBar.max;

        if (max === 0) {
            return 0;
        }

        return verticalScrollBar.value / verticalScrollBar.max;
    }

    /**
     * Scrolls to a fraction of max.
     */
    _setFractionOfMax(fractionOfMax) {
        const that = this,
            verticalScrollBar = this.$.scrollViewer.$.verticalScrollBar,
            newValue = verticalScrollBar.max * fractionOfMax;

        verticalScrollBar.value = newValue;
        that._onVerticalChange({ detail: { value: newValue } });
    }

    /**
     * Refreshes currently visible cards. Should be called when only the values in cards have to be changed.
     */
    _refreshCardContent() {
        const that = this;

        that._updateVisibleCards(that._start.view, that._start.data, true);
    }

    /**
     * Gets visible records.
     */
    _getVisibleRecords() {
        const that = this,
            dataSource = that.dataSource;

        if (that._appliedFiltering.filters.length === 0) {
            that._visibleSource = dataSource;
        }
        else {
            that._visibleSource = [];

            for (let i = 0; i < dataSource.length; i++) {
                const record = that.dataSource[i];

                if (record.$.filtered !== false) {
                    that._visibleSource.push(record);
                    that._visibleSource[that._visibleSource.length - 1]._id = record.$.id;
                }
            }
        }

        if (!dataSource || dataSource.length === 0) {
            that.setAttribute('empty', '');
            that.removeAttribute('no-matches');
        }
        else {
            that.removeAttribute('empty');

            if (that._visibleSource.length === 0) {
                that.setAttribute('no-matches', '');
            }
            else {
                that.removeAttribute('no-matches');
            }
        }
    }

    /**
     * Searches by a query.
     */
    _search(query, highlight = true) {
        const that = this;

        that._searchInfo.query = query;
        that._cards.forEach(card => card.classList.remove('lw-data-view-found', 'lw-data-view-highlighted'));

        if (query === '') {
            that.$.search.classList.remove('matches', 'no-matches');
            delete that._searchInfo.foundIdsArray;
            delete that._searchInfo.foundIdsObject;
            delete that._searchInfo.highlighted;
            return;
        }

        const source = that._searchInfo.source,
            filters = [],
            foundIdsArray = [],
            foundIdsObject = {};

        that._searchInfo.stringDataFields.forEach(dataField => {
            const filterGroup = new LW.Utilities.FilterGroup(),
                filterObject = filterGroup.createFilter('string', query, 'CONTAINS');

            filterGroup.addFilter('or', filterObject);
            filters.push([dataField, filterGroup]);
        });

        source._filter(filters, 'or');

        for (let i = 0; i < source.length; i++) {
            const record = source[i];

            if (record.$.filtered !== false) {
                foundIdsArray.push(record.$.id);
                foundIdsObject[record.$.id] = true;
            }
        }

        let highlighted = foundIdsArray[0];

        that._searchInfo.foundIdsArray = foundIdsArray;
        that._searchInfo.foundIdsObject = foundIdsObject;

        if (foundIdsArray.length > 0) {
            if (highlight) {
                that._searchInfo.highlighted = highlighted;
                that.ensureVisible(highlighted);
            }

            that._cards.forEach(card => {
                const id = that._visibleSource[card.dataId].$.id;

                if (foundIdsObject[id]) {
                    if (highlight && highlighted === id) {
                        card.classList.add('lw-data-view-highlighted');
                    }

                    card.classList.add('lw-data-view-found');
                }
            });

            that.$.search.classList.remove('no-matches');
            that.$.search.classList.add('matches');
            that.$.searchLabel.innerHTML = that.localize('found', { nth: highlight ? 1 : 0, n: foundIdsArray.length });
            return;
        }

        that.$.search.classList.remove('matches');
        that.$.search.classList.add('no-matches');
        that.$.searchLabel.innerHTML = that.localize('found', { nth: 0, n: 0 });
    }

    /**
     * Closes search panel.
     */
    _closeSearchPanel() {
        const that = this;

        if (that._searchInfo) {
            that._cards.forEach(card => card.classList.remove('lw-data-view-found', 'lw-data-view-highlighted'));
            delete that._searchInfo;
        }
    }

    /**
     * Card container down handler.
     */
    _cardContainerDownHandler(event) {
        const that = this;

        delete that._clickToDrag;

        if (!that.allowDrag || !that._isMobile && event.button !== 0) {
            return;
        }

        const target = event.originalEvent.target;

        if (target.closest('.lw-indicator') ||
            target.closest('.lw-arrow-up')) {
            if (that._isMobile) {
                that.$.scrollViewer._scrollView.disableSwipeScroll = true;
            }

            return;
        }

        const card = event.originalEvent.target.closest('lw-card');

        if (!card) {
            return;
        }

        that._dragDetails = {
            card: card,
            coords: {
                x: event.pageX, y: event.pageY
            },
            index: card.dataId,
            originalEvent: event,
            record: that._visibleSource[card.dataId],
            startTime: new Date()
        };

        that.$.scrollViewer._scrollView.disableSwipeScroll = true;
        window.getSelection().removeAllRanges();
    }

    /**
     * document move handler.
     */
    _documentMoveHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;
        if (!dragDetails) {
            return;
        }

        if (!dragDetails.feedbackShown) {
            const now = new Date(),
                timePassed = now.getTime() - dragDetails.startTime.getTime() > 500,
                moved = Math.abs(dragDetails.coords.x - event.pageX) > 5 ||
                    Math.abs(dragDetails.coords.y - event.pageY) > 5;

            if (moved && (!that._isMobile || that._isMobile && timePassed)) {
                const startedDragging = that._startDragging(event);

                if (!startedDragging) {
                    return;
                }
            }
            else {
                if (that._isMobile && moved && !timePassed) {
                    delete that._dragDetails;
                    that.$.scrollViewer._scrollView.disableSwipeScroll = false;
                }

                return;
            }
        }

        const draggedCard = dragDetails.card,
            record = dragDetails.record,
            y = event.clientY,
            x = event.clientX;
        let target = event.originalEvent.target;

        that.$.fireEvent('dragging', { card: draggedCard, originalEvent: event, record: record });

        dragDetails.feedback.style.left = (event.pageX + 10) + 'px';
        dragDetails.feedback.style.top = (event.pageY + 10) + 'px';

        if (that._isMobile) {
            const realTarget = document.elementFromPoint(x, y);

            if (realTarget) {
                target = realTarget;
            }
        }

        clearInterval(that._dragInterval);
        that._dragInterval = setInterval(function () {
            const rect = that.$.scrollViewer.getBoundingClientRect();

            if (that.$.scrollViewer.scrollHeight > 0 &&
                rect.left <= x && rect.left + rect.width >= x) {
                if (y >= rect.top && y <= rect.top + 36) {
                    that.$.scrollViewer.scrollTop -= that._autoScrollCoefficient;
                }
                else if (y >= rect.top + rect.height - 36 && y <= rect.top + rect.height) {
                    that.$.scrollViewer.scrollTop += that._autoScrollCoefficient;
                }
                else {
                    clearInterval(that._dragInterval);
                }
            }
            else {
                clearInterval(that._dragInterval);
            }
        }, 2);

        let closestCard = target.closest('lw-card'),
            side;

        if (dragDetails.hoveredCard) {
            dragDetails.hoveredCard.classList.remove('drop-target', 'left', 'right');
            delete dragDetails.hoveredCard;
        }

        if (closestCard && closestCard.dataId === dragDetails.index) {
            return;
        }

        if (closestCard) {
            const rect = closestCard.getBoundingClientRect(),
                leftDistance = Math.abs(x - rect.left),
                rightDistance = Math.abs(x - rect.right);

            side = leftDistance < rightDistance ? 'left' : 'right';
        }
        else if (target === that.$.addNewButton) {
            return;
        }
        else {
            let closest, closestDistance;

            that._cards.forEach(card => {
                const rect = card.getBoundingClientRect(),
                    topDistance = Math.abs(y - rect.top),
                    bottomDisatnce = Math.abs(y - rect.bottom),
                    bestVerticalDistance = Math.min(topDistance, bottomDisatnce),
                    leftDistance = Math.abs(x - rect.left),
                    rightDistance = Math.abs(x - rect.right),
                    bestHorizontalDistance = Math.min(leftDistance, rightDistance),
                    overallDistance = Math.sqrt(Math.pow(bestHorizontalDistance, 2) + Math.pow(bestVerticalDistance, 2));

                if (closestDistance === undefined || overallDistance < closestDistance) {
                    closest = card;
                    closestDistance = overallDistance;
                    side = leftDistance < rightDistance ? 'left' : 'right';
                }
            });

            closestCard = closest;

            if (closestCard.dataId === dragDetails.index) {
                return;
            }
        }

        if (closestCard) {
            closestCard.classList.add(side, 'drop-target');
            dragDetails.hoveredCard = closestCard;
            dragDetails.side = side;
        }
    }

    /**
     * Starts dragging operation.
     */
    _startDragging(event) {
        const that = this,
            dragDetails = that._dragDetails,
            draggedCard = dragDetails.card,
            record = dragDetails.record;
        const dragStartEvent = that.$.fireEvent('dragStart', { card: draggedCard, originalEvent: event, record: record });

        if (dragStartEvent.defaultPrevented) {
            delete that._dragDetails;
            that.$.scrollViewer._scrollView.disableSwipeScroll = false;
            return false;
        }

        dragDetails.feedback = that._addDragFeedback(record);
        dragDetails.feedbackShown = true;

        that.setAttribute('dragging', '');
        draggedCard.classList.add('dragged');
        that.closePanel();
        that._clickToDrag = true;
        return true;
    }

    /**
     * Adds drag feedback.
     */
    _addDragFeedback(record) {
        const that = this,
            feedback = document.createElement('div');
        let innerHTML = '';

        feedback.className = 'lw-card-view-drag-feedback';

        if (that.theme) {
            feedback.setAttribute('theme', that.theme);
        }

        if (that.coverField) {
            innerHTML += `<div class="drag-feedback-thumbnail" style="background-image: url('${record[that.coverField].split(',')[0].trim()}');"></div>`;
        }

        if (that.titleField) {
            innerHTML += `<div class="drag-feedback-label">${record[that.titleField]}</div>`;
        }
        else if (!that.coverField) {
            innerHTML += `<div class="drag-feedback-label">${that.localize('draggedRecord', { id: record.$.id })}</div>`;
        }

        feedback.innerHTML = innerHTML;

        if (that.rightToLeft) {
            feedback.setAttribute('right-to-left', '');
        }

        document.body.appendChild(feedback);
        return feedback;
    }

    /**
     * document up handler.
     */
    _documentUpHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;

        that.$.scrollViewer._scrollView.disableSwipeScroll = false;

        if (!dragDetails) {
            let target = event.originalEvent.target;
            const header = that.$.header;

            if (that.shadowRoot && target === that) {
                target = event.originalEvent.composedPath()[0];
            }

            if (that.headerPosition !== 'none' && !that.$.headerDropDown.classList.contains('lw-visibility-hidden') &&
                !that.$.headerDropDown.classList.contains('search-panel') && (target === header || !header.contains(target))) {
                const closestInputPopup = target.closest('lw-scroll-viewer'),
                    closestDateTimePickerPopup = target.closest('.lw-drop-down');

                if ((!closestInputPopup || !header.contains(closestInputPopup.ownerElement)) &&
                    (!closestDateTimePickerPopup || closestDateTimePickerPopup.ownerElement && !header.contains(closestDateTimePickerPopup.ownerElement))) {
                    that.closePanel();
                }
            }

            return;
        }

        const draggedCard = dragDetails.card,
            draggedRecord = dragDetails.record,
            hoveredCard = dragDetails.hoveredCard;

        delete that._dragDetails;

        if (!that.hasAttribute('dragging')) {
            return;
        }

        const withDraggedClass = that.$.cardContainer.getElementsByClassName('dragged');

        Array.from(withDraggedClass).forEach(card => card.classList.remove('dragged'));

        that.removeAttribute('dragging');
        dragDetails.feedback.remove();
        clearInterval(that._dragInterval);
        window.getSelection().removeAllRanges();

        if (!hoveredCard) {
            that.$.fireEvent('dragEnd', { card: draggedCard, originalEvent: event, record: draggedRecord });
            return;
        }

        const hoveredRecord = that._visibleSource[hoveredCard.dataId],
            dragEndEvent = that.$.fireEvent('dragEnd', {
                card: draggedCard,
                originalEvent: event,
                record: draggedRecord,
                targetCard: hoveredCard,
                targetRecord: hoveredRecord,
                targetSide: dragDetails.side
            });

        hoveredCard.classList.remove('drop-target', 'left', 'right');

        if (dragEndEvent.defaultPrevented) {
            return;
        }

        const dataSource = that.dataSource;
        let fromIndexInSource, toIndexInSource;

        for (let i = 0; i < dataSource.length; i++) {
            const currentRecord = dataSource[i];

            if (currentRecord.$.isEmpty) {
                continue;
            }

            if (currentRecord === draggedRecord) {
                fromIndexInSource = i;
            }
            else if (currentRecord === hoveredRecord) {
                toIndexInSource = i;
            }

            if (fromIndexInSource !== undefined && toIndexInSource !== undefined) {
                break;
            }
        }

        if (!that.rightToLeft && dragDetails.side === 'right' || that.rightToLeft && dragDetails.side === 'left') {
            toIndexInSource++;
        }

        dataSource.move(fromIndexInSource, toIndexInSource);
        that._getVisibleRecords();

        that._dataSourceProcessed = true;
        that._partialRefresh();
        delete that._dataSourceProcessed;
    }

    /**
     * scrollViewer touchmove handler.
     */
    _scrollViewerTouchmoveHandler(event) {
        if (this._dragDetails && event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Applies filtering.
     */
    _applyFilter(filters, operator) {
        const that = this;

        try {
            that.dataSource._filter(filters, operator);
        }
        catch (error) {
            return;
        }

        that._getVisibleRecords();
        that._fullRefresh();
    }

    /**
     * Applies sorting.
     */
    _applySort() {
        const that = this,
            sortByInfo = that._appliedSorting;

        that.dataSource.sortBy(sortByInfo.dataFields, sortByInfo.dataTypes, sortByInfo.orderBy);
        that._getVisibleRecords();
        that._refreshCardContent();
    }
});
