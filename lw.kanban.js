
/**
 * Kanban custom element.
 */
LW('lw-kanban', class Kanban extends LW.DataView {
    // Kanban's properties.
    static get properties() {
        return {
            'allowDrag': {
                value: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'allowDrop': {
                value: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'autoLoadState': {
                value: false,
                type: 'boolean'
            },
            'autoSaveState': {
                value: false,
                type: 'boolean'
            },
            'currentUser': {
                value: null,
                type: 'any'
            },
            'dragOffset': {
                value: 'auto',
                type: 'any'
            },
            'formatStringDate': {
                value: 'd',
                type: 'string'
            },
            'formatStringTime': {
                value: 'MMM d, HH:mm',
                type: 'string'
            },
            'hierarchy': {
                value: 'columns',
                allowedValues: ['columns', 'tabs'],
                type: 'string'
            },
            'messages': {
                value: {
                    'en': {
                        'actionsIcon': 'Actions icon',
                        'addSubtask': 'Add subtask',
                        'assignedTo': 'Assigned to',
                        'checklist': 'Checklist',
                        'color': 'Color',
                        'commentsIcon': 'Comments icon',
                        'copy': 'Copy',
                        'customize': 'Customize tasks',
                        'dueDate': 'Due date',
                        'edit': 'Edit',
                        'editTask': 'Edit task "{{taskId}}"',
                        'high': 'High',
                        'low': 'Low',
                        'newComment': 'New comment',
                        'newSubtask': 'New subtask',
                        'normal': 'Normal',
                        'priority': 'Priority',
                        'priorityIcon': 'Priority icon',
                        'progress': 'Progress',
                        'promptComment': 'Are you sure you want to remove this comment?',
                        'promptTask': 'Are you sure you want to remove the task "{{taskText}}"?',
                        'remove': 'Remove',
                        'removeSubtask': 'Remove subtask',
                        'send': 'Send',
                        'startDate': 'Start date',
                        'status': 'Status',
                        'swimlane': 'Swimlane',
                        'tags': 'Tags',
                        'text': 'Text',
                        'userId': 'User ID',
                        'userIcon': 'User icon'
                    }
                }
            },
            'selectionMode': {
                value: 'zeroOrOne',
                allowedValues: ['zeroOrOne', 'zeroOrManyExtended'],
                type: 'string'
            },
            'swimlanes': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'swimlanesFrom': {
                value: 0,
                type: 'number'
            },
            'swimlanesTo': {
                value: null,
                type: 'number?'
            },
            'tags': {
                value: [],
                type: 'array'
            },
            'taskActions': {
                value: false,
                type: 'boolean'
            },
            'taskComments': {
                value: false,
                type: 'boolean'
            },
            'taskDue': {
                value: false,
                type: 'boolean'
            },
            'taskPosition': {
                value: 'all',
                allowedValues: ['all', 'leaf'],
                type: 'string'
            },
            'taskPriority': {
                value: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'taskProgress': {
                value: false,
                type: 'boolean'
            },
            'taskTags': {
                value: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'taskUserIcon': {
                value: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'textTemplate': {
                value: null,
                type: 'any'
            },
            'userList': {
                value: false,
                type: 'boolean'
            },
            'users': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            }
        };
    }

    /**
     * Kanban's event listeners.
     */
    static get listeners() {
        return {
            'body.focusin': '_bodyFocusinHandler',
            'container.click': '_containerClickHandler',
            'container.down': '_containerDownHandler',
            'container.keydown': '_containerKeydownHandler',
            'container.touchmove': '_scrollViewerTouchmoveHandler'
        };
    }

    /**
     * Kanban's HTML template.
     */
    template() {
        const tabindex = this._tabindex;

        return `<div id="container" role="presentation">
                    <div id="header" class="lw-data-view-header" role="toolbar">
                        <div id="customizeButton" class="lw-data-view-header-button lw-data-view-customize-button lw-unselectable"${tabindex} role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Customize tasks"><div role="presentation"></div></div>
                        <div id="filterButton" class="lw-data-view-header-button lw-data-view-filter-button lw-unselectable"${tabindex} role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Filter"><div role="presentation"></div></div>
                        <div id="sortButton" class="lw-data-view-header-button lw-data-view-sort-button lw-unselectable"${tabindex} role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Sort"><div role="presentation"></div></div>
                        <div id="searchButton" class="lw-data-view-header-button lw-data-view-search-button lw-unselectable"${tabindex} role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Search"></div>
                        <div id="headerDropDown" class="lw-data-view-header-drop-down lw-visibility-hidden" role="dialog">
                            <div id="customize" class="lw-hidden" role="presentation"></div>
                            <div id="filter" class="lw-hidden" role="presentation"></div>
                            <div id="sort" class="lw-hidden" role="presentation"></div>
                            <div id="search" class="lw-data-view-search-box lw-hidden" role="presentation">
                                <input type="text" id="searchInput" spellcheck="false" aria-label="Search" />
                                <div id="searchLabel" class="lw-data-view-search-label lw-unselectable"></div>
                                <div id="searchPrev" class="lw-data-view-search-prev"${tabindex} role="button" aria-label="Previous"></div>
                                <div id="searchNext" class="lw-data-view-search-next"${tabindex} role="button" aria-label="Next"></div>
                                <div id="searchClose" class="lw-data-view-search-close"${tabindex} role="button" aria-label="Close search box"></div>
                            </div>
                        </div>
                    </div>
                    <div id="body" class="lw-kanban-body" role="presentation"></div>
                </div>`;
    }

    render() {
        const that = this,
            computedStyle = getComputedStyle(that);

        Object.defineProperty(that, 'dataSource', {
            get: function () {
                if (that.context === that) {
                    return that.properties.dataSource.value;
                }
                else {
                    return that._getCurrentDataSource();
                }
            },
            set(value) {
                that.updateProperty(that, that._properties.dataSource, value);
            }
        });

        that._autoScrollCoefficient = LW.Utilities.Core.Browser.Firefox ? 4 : LW.Utilities.Core.Browser.Edge ? 8 : 2;
        that._kanbanTaskMinWidth = parseFloat(computedStyle.getPropertyValue('--lw-kanban-task-min-width'));
        that._dataViewPadding = parseFloat(computedStyle.getPropertyValue('--lw-data-view-padding'));
        that._allColumns = [];
        that._customTags = [];
        that._selectedTasks = [];
        that._dblclickObject = { numberOfClicks: 0 };
        that._appliedFiltering = { filters: [], operator: 'and' };
        that._appliedSorting = { dataFields: [], dataTypes: [], orderBy: [] };
        that._sortPanelDataSource = [
            { label: that.localize('text'), dataField: 'text', dataType: 'string' },
            { label: that.localize('userId'), dataField: 'userId', dataType: 'string' },
            { label: that.localize('tags'), dataField: 'tags', dataType: 'string' },
            { label: that.localize('priority'), dataField: 'priority', dataType: 'string' },
            { label: that.localize('progress'), dataField: 'progress', dataType: 'number' },
            { label: that.localize('startDate'), dataField: 'startDate', dataType: 'date' },
            { label: that.localize('dueDate'), dataField: 'dueDate', dataType: 'date' }
        ]

        that._getInnerElementMessages();
        that._localizeHeader();
        that._handleHeaderPosition(that.$.body);
        that._validateSwimlanes();
        that._renderColumns();
        that._handleSwimlanes();

        let successfullyLoaded = false;

        if (that.autoLoadState) {
            successfullyLoaded = that.loadState();
        }

        if (!successfullyLoaded) {
            that._processDataSource();
        }

        that._getCurrentUser();
        that._setUserList();
        that._setActionsList();
        that._setCommentsList();

        that._autoSaveState();

        super.render();
    }

    /**
     * Called when the element is attached to the DOM.
     */
    attached() {
        const that = this;

        super.attached();

        if (that.isCompleted && that._dialog) {
            that._addDialogHandlers();
            that.getShadowRootOrBody().appendChild(that._dialog);
        }
    }

    /**
     * Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (!that._dialog) {
            return;
        }

        const dialog = that._dialog;

        dialog.removeEventListener('open', that._dialogEventHandler);
        dialog.removeEventListener('closing', that._dialogEventHandler);
        dialog.removeEventListener('close', that._dialogEventHandler);
        dialog.removeEventListener('click', that._dialogClickHandler);
        dialog.remove();
    }

    /**
     * Adds a task to a Kanban column.
     *
     * @param {Object} data Optional An object containing the new task's data.
     */
    addTask(data = {}) {
        const that = this,
            columns = that.columns;

        if (typeof data !== 'object' || columns.length === 0 || !that._currentUser.allowAdd) {
            return;
        }

        if (data.status === undefined) {
            data.status = columns[0].dataField;
        }

        that._createTask(data, true);
        that._autoSaveState('dataSource');
    }

    /**
     * Adds sorting.
     *
     * @param {Array/String} dataFields The data field(s) to sort by.
     * @param {Array/String} orderBy The sort direction(s) to sort the data field(s) by.
     */
    addSort(dataFields, orderBy) {
        const that = this,
            dataSource = that.dataSource;
        let sortByInfo;

        function validate(dataField, index) {
            const validDataField = that._sortPanelDataSource.find(field => field.dataField === dataField);

            if (validDataField) {
                let columnOrderBy = Array.isArray(orderBy) ? orderBy[index] : typeof orderBy === 'string' ? orderBy : 'ascending';

                sortByInfo.dataFields.push(dataField);
                sortByInfo.dataTypes.push(validDataField.dataType);
                columnOrderBy = columnOrderBy ? columnOrderBy.indexOf('desc') !== -1 ? 'descending' : 'ascending' : 'ascending';
                sortByInfo.orderBy.push(columnOrderBy);
            }
        }

        if (arguments.length === 0 || !dataSource || dataSource.length === 0) {
            return;
        }

        that.closePanel();

        if (arguments.length === 1 && typeof dataFields === 'object') {
            sortByInfo = dataFields;
        }
        else {
            sortByInfo = { dataFields: [], dataTypes: [], orderBy: [] };

            if (Array.isArray(dataFields)) {
                dataFields.forEach(validate);
            }
            else if (typeof dataFields === 'string') {
                validate(dataFields, 0);
            }
            else {
                return;
            }
        }

        super.addSort(sortByInfo);
    }

    /**
     * Begins an edit operation.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     */
    beginEdit(task) {
        const that = this;

        if (!that._currentUser.allowEdit || that.disabled) {
            return;
        }

        task = that._validateTaskArgument(task);

        if (!task) {
            return;
        }

        that._openDialog(task, 'edit');
    }

    /**
     * Ends the current edit operation and discards changes.
     */
    cancelEdit() {
        const dialog = this._dialog;

        if (dialog && dialog.opened && dialog.classList.contains('edit')) {
            dialog.close();
        }
    }

    /**
     * Collapses a Kanban column.
     *
     * @param {String|Number} column The index or dataField of the column to collapse.
     */
    collapse(column) {
        const that = this;

        if (!that.collapsible) {
            return;
        }

        column = that._validateColumnArgument(column);

        if (!column || column.collapsed || !column.collapsible) {
            return;
        }

        const columnElement = that._columnToElement.get(column),
            siblingColumns = columnElement.siblingColumns;
        let collapsedSiblings = 0;

        column.collapsed = true;
        columnElement.classList.add('collapsed');

        siblingColumns.forEach(col => col.collapsed && collapsedSiblings++);

        if (collapsedSiblings === siblingColumns.length) {
            const toExpand = siblingColumns.indexOf(column) !== 0 ? 0 : 1,
                columnToExpand = siblingColumns[toExpand],
                columnElement = that._columnToElement.get(columnToExpand);

            columnToExpand.collapsed = false;
            columnElement.classList.remove('collapsed');

            that._updateColumnWidths(siblingColumns, columnElement.parentElement);
        }
        else {
            that._updateColumnWidths(siblingColumns, columnElement.parentElement);
        }

        that._allColumns.forEach(col => that._refreshScrollViewer(col));
        that._autoSaveState('collapsed');
        that._handleSwimlanes(true);
    }

    /**
     * Creates a copy of a task in the same column.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     */
    copyTask(task) {
        const that = this;

        if (!that._currentUser.allowAdd) {
            return;
        }

        task = that._validateTaskArgument(task);

        if (!task) {
            return;
        }

        const data = Object.assign({}, task.data);

        data.id = Math.floor(Math.random() * 90000 + 10000);
        that._createTask(data, true);
        that._autoSaveState('dataSource');
    }

    /**
     * Ends the current edit operation and saves changes.
     */
    endEdit() {
        const dialog = this._dialog;

        if (dialog && dialog.opened && dialog.classList.contains('edit')) {
            dialog.ok = true;
            dialog.close();
        }
    }

    /**
     * Makes sure a task is visible by scrolling to it.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     */
    ensureVisible(task) {
        const that = this;

        task = that._validateTaskArgument(task);

        if (!task || task.filteredOut) {
            return;
        }

        const parentScrollViewer = task.closest('lw-scroll-viewer');

        if (parentScrollViewer.scrollHeight === 0) {
            return task;
        }

        const parentScrollViewerScrollTop = parentScrollViewer.scrollTop,
            taskOffsetTop = task.offsetTop;

        if (parentScrollViewerScrollTop <= taskOffsetTop && parentScrollViewerScrollTop + parentScrollViewer.offsetHeight >= taskOffsetTop + task.offsetHeight) {
            return task;
        }

        parentScrollViewer.scrollTop = taskOffsetTop;
        return task;
    }

    /**
     * Expands a Kanban column.
     *
     * @param {String|Number} column The index or dataField of the column to expand.
     */
    expand(column) {
        const that = this;

        column = that._validateColumnArgument(column);

        if (!column || !column.collapsed) {
            return;
        }

        const columnElement = that._columnToElement.get(column);

        column.collapsed = false;
        columnElement.classList.remove('collapsed');
        that._updateColumnWidths(columnElement.siblingColumns, columnElement.parentElement);
        that._allColumns.forEach(col => that._refreshScrollViewer(col));
        that._autoSaveState('collapsed');
        that._handleSwimlanes(true);
    }

    /**
     * Expands all Kanban columns.
     *
     */
    expandAll() {
        const that = this;

        that._allColumns.forEach(column => {
            column.collapsed = false;
            that._columnToElement.get(column).classList.remove('collapsed');
        });
        that._allColumns.forEach(column => that._refreshScrollViewer(column));

        that._columnContainers.forEach(container => that._updateColumnWidths(container.children, container));
        that._autoSaveState('collapsed');
        that._handleSwimlanes(true);
    }

    /**
     * Exports the Kanban's data.
     *
     * @param {String} dataFormat The file format to export to.
     * @param {String} fileName Optional The name of the file to export to.
     * @param {Function} callback Optional A callback function to pass the exported data to (if fileName is not provided).
     */
    exportData(dataFormat, fileName, callback) {
        const that = this,
            computedStyle = getComputedStyle(that),
            borderColor = computedStyle.borderRightColor,
            swimlanes = that.swimlanes,
            dataExporter = new LW.Utilities.DataExporter(),
            dataSource = that._getCurrentDataSource(),
            dataSourceForExport = [
                {
                    id: 'Task ID',
                    text: 'Text',
                    status: 'Status',
                    swimlane: 'Swimlane',
                    asignee: 'Asignee',
                    priority: 'Priority',
                    progress: 'Progress',
                    startDate: 'Start date',
                    dueDate: 'Due date',
                    subTasks: 'Completed sub-tasks',
                    tags: 'Tags'
                }
            ],
            cachedStatuses = {},
            cachedSwimlanes = {},
            cachedAsignees = {};

        dataExporter.style = {
            border: '1px solid ' + borderColor,
            borderCollapse: 'collapse',
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            fontFamily: 'Helvetica',
            header: {
                border: '1px solid ' + borderColor,
                fontWeight: 'bold'
            },
            columns: {
                border: '1px solid ' + borderColor,
                progress: { format: 'p0' },
                startDate: { format: that.formatStringDate },
                dueDate: { format: that.formatStringDate }
            },
            rows: {}
        };

        if (swimlanes.length === 0) {
            delete dataSourceForExport[0].swimlane;
        }

        for (let i = 0; i < dataSource.length; i++) {
            const dataPoint = dataSource[i];
            let status = dataPoint.status,
                swimlane = dataPoint.swimlane,
                asignee = dataPoint.userId,
                progress = dataPoint.progress;

            if (cachedStatuses[status]) {
                status = cachedStatuses[status];
            }
            else {
                status = that._allColumns.find(column => column.dataField === status).label;
                cachedStatuses[dataPoint.status] = status;
            }

            if (asignee === null) {
                asignee = '';
            }
            else if (cachedAsignees[asignee]) {
                asignee = cachedAsignees[asignee];
            }
            else {
                asignee = that.users.find(user => user.id === asignee).name;
                cachedAsignees[dataPoint.userId] = asignee;
            }

            if (progress === null) {
                progress = '';
            }
            else {
                progress = progress / 100;
            }

            const record = {
                id: dataPoint.id,
                text: dataPoint.text,
                status: status,
                asignee: asignee,
                priority: dataPoint.priority,
                progress: progress,
                startDate: dataPoint.startDate || '',
                dueDate: dataPoint.dueDate || '',
                subTasks: that._getCompletedSubTasks(dataPoint.checklist),
                tags: dataPoint.tags
            };

            if (swimlanes.length) {
                if (!swimlane) {
                    swimlane = '';
                }
                else if (cachedSwimlanes[swimlane]) {
                    swimlane = cachedSwimlanes[swimlane];
                }
                else {
                    swimlane = swimlanes.find(swmln => swmln.dataField === swimlane).label;
                    cachedSwimlanes[dataPoint.swimlane] = swimlane;
                }

                record.swimlane = swimlane;
            }

            dataSourceForExport.push(record);

            if (dataPoint.color) {
                dataExporter.style.rows[i] = { backgroundColor: dataPoint.color };
            }
        }

        return dataExporter.exportData(dataSourceForExport, dataFormat, fileName, callback);
    }

    /**
     * Gets the Kanban's state.
     */
    getState() {
        const that = this,
            collapsed = {},
            state = {
                collapsed: collapsed,
                dataSource: that._getCurrentDataSource(),
                filtering: that._appliedFiltering,
                selection: {
                    selected: that._selectedTasks.map(task => task.data.id),
                    selectionStart: that._selectionStart ? that._selectionStart.data.id : null
                },
                sorting: that._appliedSorting,
                tabs: that._selectedTabs,
                visibility: {
                    taskActions: that.taskActions,
                    taskComments: that.taskComments,
                    taskDue: that.taskDue,
                    taskPriority: that.taskPriority,
                    taskProgress: that.taskProgress,
                    taskTags: that.taskTags,
                    taskUserIcon: that.taskUserIcon
                }
            };
        let selectionInColumn = null,
            swimlane = null;

        if (that._selectionInView) {
            selectionInColumn = that._selectionInView.closest('.lw-kanban-column').column.dataField;
            swimlane = that._selectionInView.getAttribute('swimlane');
        }

        state.selection.selectionInColumn = selectionInColumn;
        state.selection.swimlane = swimlane;

        that._allColumns.forEach(column => collapsed[column.dataField] = column.collapsed);

        return state;
    }

    /**
     * Loads the Kanban's state.
     *
     * @param {Object} state Optional An object returned by one of the methods getState or saveState.
     */
    loadState(state) {
        const that = this;

        if (!state) {
            state = window.localStorage.getItem('lwKanban' + that.id);

            if (!state) {
                return false;
            }
        }

        if (typeof state === 'string') {
            state = JSON.parse(state, (key, value) => (!value || ['startDate', 'dueDate', 'time'].indexOf(key) === -1) ? value : new Date(value));
        }

        that._selectedTasks = [];
        delete that._selectionStart;
        delete that._selectionInView;

        that.expandAll();

        Array.from(that.$.container.querySelectorAll('lw-scroll-viewer.lw-kanban-column-content-tasks')).forEach(scrollViewer => scrollViewer.clearContent());

        that._allColumns.forEach(column => {
            if (state.collapsed[column.dataField]) {
                that.collapse(column);
            }
        });

        for (let propertyName in state.visibility) {
            that[propertyName] = state.visibility[propertyName];
        }

        that.dataSource = state.dataSource;
        that._processDataSource();
        that.addFilter(that._constructFilterGroups(state.filtering), state.filtering.operator);
        that.addSort(state.sorting);
        that._autoSaveState(state);
        state.selection.selected.forEach(id => {
            const task = that.$.container.querySelector(`.lw-kanban-task[data-id="${id}"]`);

            if (task) {
                task.setAttribute('selected', '');
                that._selectedTasks.push(task);
            }
        });

        if (state.selection.selectionStart) {
            that._selectionStart = that.$.container.querySelector(`.lw-kanban-task[data-id="${state.selection.selectionStart}"]`);
        }

        if (state.selection.selectionInColumn) {
            const columnElement = that._columnToElement.get(that._allColumns.find(column => column.dataField === state.selection.selectionInColumn));

            if (state.selection.swimlane) {
                that._selectionInView = columnElement.querySelector(`lw-scroll-viewer[swimlane=${state.selection.swimlane}]`);
            }
            else {
                that._selectionInView = columnElement.querySelector('lw-scroll-viewer');
            }
        }

        if (state.tabs) {
            const tabsHierarchy = that.hierarchy === 'tabs';

            that._allColumns.forEach(column => {
                if (column.selected !== undefined) {
                    const columnElement = that._columnToElement.get(column),
                        selected = state.tabs.indexOf(column.dataField) !== -1;

                    column.selected = selected;

                    if (tabsHierarchy) {
                        columnElement.classList.toggle('lw-hidden', !selected);
                        columnElement.tab.classList.toggle('selected', selected);
                        columnElement.tab.setAttribute('aria-selected', selected);
                    }
                }
            });
        }

        return true;
    }

    /**
     * Moves a task to a different column.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     * @param {String} newStatus The new status of the task (its new column's dataField).
     */
    moveTask(task, newStatus) {
        const that = this;

        if (that.disabled || !newStatus) {
            return;
        }

        task = that._validateTaskArgument(task);

        if (!task || task.status === newStatus) {
            return;
        }

        const newColumn = that._allColumns.find(col => col.dataField === newStatus);

        if (!newColumn) {
            return;
        }

        const oldColumnScrollViewer = task.closest('lw-scroll-viewer'),
            newColumnElement = that._columnToElement.get(newColumn),
            data = task.data,
            newColumnScrollViewer = that.getTaskScrollViewer(newColumnElement, data);

        data.status = newStatus;

        newColumnScrollViewer.appendChild(task);

        if (!that._dialog || !that._dialog.ok) {
            if (that.textTemplate) {
                that._renderTask(task);
            }

            that._autoSaveState('dataSource');
        }

        that._refreshScrollViewer(oldColumnScrollViewer, true);
        that._refreshScrollViewer(newColumnScrollViewer, true);

        if (task.hasAttribute('selected')) {
            task.removeAttribute('selected');
            that._selectedTasks = that._selectedTasks.filter(t => t !== task);
            that._autoSaveState('selection');
        }

        task.removeAttribute('focus');

        if ((that.shadowRoot || that.getRootNode()).activeElement === oldColumnScrollViewer) {
            that._focusTask(that._getFirstItem(oldColumnScrollViewer.$.content));
        }
    }

    /**
     * Opens the "Customize tasks" header panel (drop down).
     */
    openCustomizePanel() {
        const that = this,
            dataSource = that.dataSource;

        if (!dataSource || dataSource.length === 0 || that.disabled || that.headerPosition === 'none') {
            return;
        }

        const customizePart = that.$.customize,
            columnPanelDataSource = [
                { label: that.localize('actionsIcon'), dataField: 'taskActions', visible: that.taskActions },
                { label: that.localize('commentsIcon'), dataField: 'taskComments', visible: that.taskComments },
                { label: that.localize('dueDate'), dataField: 'taskDue', visible: that.taskDue },
                { label: that.localize('priorityIcon'), dataField: 'taskPriority', visible: that.taskPriority },
                { label: that.localize('progress'), dataField: 'taskProgress', visible: that.taskProgress },
                { label: that.localize('tags'), dataField: 'taskTags', visible: that.taskTags },
                { label: that.localize('userIcon'), dataField: 'taskUserIcon', visible: that.taskUserIcon }
            ];
        let columnPanel;

        that._closeDialog();

        that.$.headerDropDown.classList.add('customize-panel');
        that.$.headerDropDown.classList.remove('filter-panel', 'sort-panel', 'search-panel');
        customizePart.classList.remove('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that.$.search.classList.add('lw-hidden');
        that._closeSearchPanel();

        if (!that._customizePartCreated) {
            columnPanel = document.createElement('lw-column-panel');
            columnPanel.animation = that.animation;
            columnPanel.dataSource = columnPanelDataSource;
            columnPanel.locale = that.locale;
            columnPanel.messages = that._innerElementMessages.columnPanel;
            columnPanel.rightToLeft = that.rightToLeft;
            columnPanel.theme = that.theme;
            that.$.customize.appendChild(columnPanel);
            columnPanel.$.sortable.disabled = true;
            that._customizePartCreated = true;
        }
        else {
            columnPanel = customizePart.firstElementChild;
            columnPanel.set('dataSource', columnPanelDataSource);
            columnPanel.propertyChangedHandler('dataSource', undefined, columnPanelDataSource);
            columnPanel.rightToLeft = that.rightToLeft;
        }

        that._openHeaderDropDown(that.$.customizeButton);
    }

    /**
     * Opens the "Filter" header panel (drop down).
     */
    openFilterPanel() {
        const that = this,
            filterPanelDataSource = [
                { label: that.localize('text'), dataField: 'text', dataType: 'string' },
                { label: that.localize('userId'), dataField: 'userId', dataType: 'string' },
                { label: that.localize('tags'), dataField: 'tags', dataType: 'string' },
                {
                    label: that.localize('priority'), dataField: 'priority', dataType: 'enum',
                    options: [
                        { label: that.localize('high'), value: 'high' },
                        { label: that.localize('normal'), value: 'normal' },
                        { label: that.localize('low'), value: 'low' }
                    ]
                },
                { label: that.localize('progress'), dataField: 'progress', dataType: 'number' },
                { label: that.localize('startDate'), dataField: 'startDate', dataType: 'date' },
                { label: that.localize('dueDate'), dataField: 'dueDate', dataType: 'date' }
            ],
            filterPanelEditorCallback = function (editor, column) {
                if (column.dataField === 'progress') {
                    editor.min = 0;
                    editor.max = 100;
                    editor.showUnit = true;
                    editor.unit = '%';
                }
                else if (column.dataType === 'date') {
                    editor.formatString = that.formatStringDate;
                }
            };

        super.openFilterPanel(filterPanelDataSource, filterPanelEditorCallback);
    }

    /**
     * Opens the "Sort" header panel (drop down).
     */
    openSortPanel() {
        const that = this,
            sortPanelDataSource = that._sortPanelDataSource.map(field => {
                const index = that._appliedSorting.dataFields.indexOf(field.dataField);

                return Object.assign({}, field, { sortIndex: index, sortDirection: index === -1 ? 'ascending' : that._appliedSorting.orderBy[index] });
            });

        super.openSortPanel(sortPanelDataSource);
    }

    /**
     * Removes a task.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     * @param {Boolean} prompt Optional Whether or not to prompt the user before removing the task.
     */
    removeTask(task, prompt) {
        const that = this;

        if (!that._currentUser.allowRemove) {
            return;
        }

        task = that._validateTaskArgument(task);

        if (!task) {
            return;
        }

        if (!prompt) {
            const scrollViewer = task.closest('lw-scroll-viewer');

            task.remove();
            that._refreshScrollViewer(scrollViewer, true);
            that._autoSaveState('dataSource');
        }
        else {
            that._openDialog(task, 'prompt');
        }
    }

    /**
     * Saves the Kanban's state to the browser's localStorage.
     */
    saveState() {
        const that = this,
            state = that.getState();

        window.localStorage.setItem('lwKanban' + that.id, JSON.stringify(state));

        return state;
    }

    /**
     * Updates a task.
     *
     * @param {Number|String|HTMLElement} task The task's id or corresponding HTMLElement.
     * @param {Object} newData The new data to visualize in the task.
     */
    updateTask(task, newData) {
        const that = this;

        if (!that._currentUser.allowEdit || !newData) {
            return;
        }

        task = that._validateTaskArgument(task);

        if (!task) {
            return;
        }

        const oldData = task.data;

        newData = Object.assign({}, oldData, newData);

        if (newData.checklist && newData.checklist.length === 0) {
            newData.checklist = null;
        }

        if (JSON.stringify(newData) === JSON.stringify(oldData)) {
            return;
        }

        task.data = newData;

        if (newData.status !== oldData.status) {
            that.moveTask(task, newData.status);
        }

        if (newData.swimlane !== oldData.swimlane) {
            const columnElement = task.closest('.lw-kanban-column');

            if (that._hasSwimlane(columnElement.index)) {
                columnElement.querySelector(`lw-scroll-viewer[swimlane=${newData.swimlane}]`).appendChild(task);

                if (oldData.swimlane) {
                    that._refreshScrollViewer(columnElement.querySelector(`lw-scroll-viewer[swimlane=${oldData.swimlane}]`));
                }
            }
            else {
                delete newData.swimlane;
            }
        }

        if (that.textTemplate || newData.text !== oldData.text || newData.tags !== oldData.tags || newData.priority !== oldData.priority) {
            that._renderTask(task);
        }
        else {
            if (newData.userId !== oldData.userId) {
                that._updateUserIcon(task);
            }

            if (newData.dueDate !== oldData.dueDate) {
                that._updateTaskDueDate(task);
            }

            if (newData.color !== oldData.color) {
                that._updateTaskColor(task);
            }

            if (JSON.stringify(newData.checklist) !== JSON.stringify(oldData.checklist)) {
                that._updateTaskChecked(task);
                that._updateTaskProgress(task);
            }
            else if (parseFloat(newData.progress) !== parseFloat(oldData.progress)) {
                that._updateTaskProgress(task);
            }
        }

        that.$.fireEvent('change', { task: task, value: newData, oldValue: oldData });
        that._refreshScrollViewer(task.closest('lw-scroll-viewer'));
        that._autoSaveState('dataSource');
    }

    /**
     * Updates the Kanban when a property is changed.
     * @param {String} propertyName The name of the property.
     * @param {Number|String} oldValue The previously entered value.
     * @param {Number|stStringring} newValue The new entered value.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this,
            dialog = that._dialog;

        function changeUser() {
            that.cancelEdit();

            if (dialog) {
                dialog.close();
            }

            that._closeList(that._commentsList, '_commentSelectionFor');
            that._getCurrentUser();
        }

        super.propertyChangedHandler(propertyName, oldValue, newValue);

        switch (propertyName) {
            case 'allowDrag':
                that._getCurrentUser();
                break;
            case 'animation':
            case 'theme': {
                let affectedElements = Array.from(that.$.container.querySelectorAll('lw-column-panel, lw-multi-column-filter-panel, lw-sort-panel'));

                if (dialog) {
                    affectedElements.push(dialog);

                    if (dialog.editPanelPopulated) {
                        affectedElements = affectedElements.concat(Array.from(dialog.$.container.querySelectorAll('.lw-element.editor')));
                    }
                }

                affectedElements.forEach(element => element[propertyName] = newValue);
                Array.from(that.$.container.getElementsByClassName('lw-kanban-task')).forEach(task => that._updateTaskColor(task));
                break;
            }
            case 'autoSaveState':
                that._autoSaveState();
                break;
            case 'collapsible':
                if (!newValue) {
                    that.expandAll();
                }

                break;
            case 'columns':
                that.dataSource = that._getCurrentDataSource();
                that._reset();

                if (dialog && dialog.editPanelPopulated) {
                    dialog.editors.status.dataSource = that._allColumns.map(col => ({ label: col.label, value: col.dataField }));
                }

                break;
            case 'currentUser':
                changeUser();
                break;
            case 'dataSource':
                if (that.columns.length === 0) {
                    that._renderColumns();
                    that._handleSwimlanes();
                    that._processDataSource();
                    return;
                }

                Array.from(that.$.container.querySelectorAll('lw-scroll-viewer.lw-kanban-column-content-tasks')).forEach(scrollViewer => scrollViewer.clearContent());
                that._processDataSource();
                break;
            case 'disabled':
                that.cancelEdit();
                that.closePanel();
                that._closeList(that._actionsList, '_actionSelectionFor');
                that._closeList(that._commentsList, '_commentSelectionFor');
                that._closeList(that._userList, '_userSelectionFor');
                that._setFocusable();
                break;
            case 'formatStringDate':
                Array.from(that.$.container.getElementsByClassName('lw-kanban-task')).forEach(task => that._updateTaskDueDate(task));

                if (dialog) {
                    dialog.editors.startDate.formatString = newValue;
                    dialog.editors.dueDate.formatString = newValue;
                }

                break;
            case 'formatStringTime':
                that._closeList(that._commentsList, '_commentSelectionFor');
                break;
            case 'editable':
                that.cancelEdit();

                if (!that._actionsList.classList.contains('edit-comment')) {
                    that._closeList(that._actionsList, '_actionSelectionFor');
                }

                that._getCurrentUser();
                break;
            case 'headerPosition':
                that._handleHeaderPosition(that.$.body);
                that._allColumns.forEach(column => that._refreshScrollViewer(column));
                break;
            case 'hierarchy':
                if (that.swimlanes.length === 0 && that.columns.length !== that._allColumns.length) {
                    that._reset();
                }

                break;
            case 'locale':
            case 'messages':
                that.closePanel();
                that._localizeHeader();
                that._getInnerElementMessages();

                that._closeList(that._actionsList, '_actionSelectionFor');
                that._closeList(that._commentsList, '_commentSelectionFor');
                that._setActionsList();
                that._setCommentsList();

                if (dialog) {
                    that.cancelEdit();
                    dialog.close();
                    dialog.$.footer.firstElementChild.innerHTML = that.localize('ok');
                    dialog.$.footer.children[1].innerHTML = that.localize('cancel');

                    if (dialog.editPanelPopulated) {
                        dialog.editors.priority.dataSource = [{ label: that.localize('low'), value: 'low' }, { label: that.localize('normal'), value: 'normal' }, { label: that.localize('high'), value: 'high' }];
                        dialog.$.container.querySelector('.new-subtask').placeholder = that.localize('newSubtask');
                        dialog.$.container.querySelector('lw-button.add').title = that.localize('addSubtask');

                        Array.from(dialog.$.container.getElementsByClassName('editor-label')).forEach(label => {
                            let purpose = label.id.slice(that.id.length + 5);

                            purpose = purpose.slice(0, 1).toLowerCase() + purpose.slice(1);
                            label.innerHTML = that.localize(purpose);
                        });
                    }
                }

                if (that._customizePartCreated) {
                    that.$.customize.firstElementChild.messages = that._innerElementMessages.columnPanel;
                    that.$.customize.firstElementChild.locale = that.locale;
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
                that._reset(true);
                break;
            case 'selectionMode':
                if (newValue === 'zeroOrOne' && that._selectedTasks.length > 1) {
                    const selectionStart = that._selectionStart;

                    that._selectedTasks.forEach(selectedTask => selectedTask !== selectionStart && selectedTask.removeAttribute('selected'));
                    that._selectedTasks = [selectionStart];
                }

                break;
            case 'swimlanes':
                that._validateSwimlanes();

                if (JSON.stringify(that.swimlanes) === JSON.stringify(oldValue)) {
                    return;
                }

                that._reset();

                if (dialog && dialog.editPanelPopulated) {
                    dialog.editors.swimlane.dataSource = that.swimlanes.map(swimlane => ({ label: swimlane.label, value: swimlane.dataField }));
                }

                break;
            case 'swimlanesFrom':
            case 'swimlanesTo': {
                const swimlanesFrom = that.swimlanesFrom,
                    swimlanesTo = that.swimlanesTo;

                if (swimlanesFrom < 0) {
                    that.swimlanesFrom = 0;
                }

                if (swimlanesTo !== null) {
                    if (swimlanesFrom > swimlanesTo) {
                        that.swimlanesFrom = swimlanesTo;
                    }
                }

                if (that.swimlanes.length > 0) {
                    that._reset();
                }

                break;
            }
            case 'tags':
            case 'textTemplate':
                Array.from(that.$.container.getElementsByClassName('lw-kanban-task')).forEach(task => that._renderTask(task));
                that._allColumns.forEach(column => that._refreshScrollViewer(column));
                break;
            case 'unfocusable':
                that._setFocusable();
                break;
            case 'users':
                that._closeList(that._userList, '_userSelectionFor');
                that._setUserList();
                Array.from(that.$.container.getElementsByClassName('lw-kanban-task')).forEach(task => that._updateUserIcon(task));

                if (dialog && dialog.editPanelPopulated) {
                    dialog.editors.userId.dataSource = that.users.map(user => ({ label: user.name, value: user.id }));
                }

                changeUser();
                break;
        }
    }

    /**
     * Resets the Kanban.
     */
    _reset(removeDialog) {
        const that = this,
            currentState = that.getState();

        that._allColumns = [];
        that._customTags = [];
        that._selectedTasks = [];

        if (that._dialog) {
            that.cancelEdit();

            if (removeDialog) {
                that._dialog.remove();
                delete that._dialog;
            }
        }

        that.closePanel();
        that._closeList(that._actionsList, '_actionSelectionFor');
        that._closeList(that._commentsList, '_commentSelectionFor');
        that._closeList(that._userList, '_userSelectionFor');

        that.$.body.innerHTML = '';
        Array.from(that.$.container.getElementsByClassName('swimlane')).forEach(swimlane => swimlane.remove());
        that._renderColumns();
        that._handleSwimlanes();

        that.loadState(currentState);
    }

    /**
     * Container click handler.
     */
    _containerClickHandler(event) {
        const that = this,
            target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target;

        if (that.$.header.contains(target)) {
            that._headerClickHandler(target, that.$.body);
            return;
        }

        const columnHeader = target.closest('.lw-kanban-column-header');

        if (columnHeader) {
            const column = columnHeader.parentElement.column;

            if (target.closest('.lw-kanban-column-header-add')) {
                that.addTask({ status: column.dataField });
                return;
            }

            if (that.collapsible && column.collapsible) {
                that[column.collapsed ? 'expand' : 'collapse'](column);
                return;
            }
        }

        const tab = target.closest('.lw-kanban-tab');

        if (tab) {
            if (tab.classList.contains('selected')) {
                return;
            }

            const previousSelection = tab.parentElement.querySelector('.selected');

            previousSelection.classList.remove('selected');
            previousSelection.setAttribute('aria-selected', false);
            previousSelection.columnElement.classList.add('lw-hidden');
            previousSelection.columnElement.column.selected = false;

            tab.classList.add('selected');
            tab.setAttribute('aria-selected', true);
            tab.columnElement.classList.remove('lw-hidden');
            tab.columnElement.column.selected = true;

            that._selectedTabs = that._allColumns.filter(column => column.selected).map(column => column.dataField);
            that._autoSaveState('tabs');

            that._allColumns.forEach(column => that._refreshScrollViewer(column));
            return;
        }

        const listItem = target.closest('.lw-kanban-list .item');

        if (listItem) {
            const dataId = parseFloat(listItem.getAttribute('data-id')),
                userSelectionFor = that._userSelectionFor;

            if (userSelectionFor) {
                userSelectionFor.data.userId = dataId;
                that._updateUserIcon(userSelectionFor);
                that._closeList(that._userList, '_userSelectionFor');
                return;
            }

            const actionSelectionFor = that._actionSelectionFor;

            if (actionSelectionFor) {
                switch (dataId) {
                    case 0:
                        if (that._actionsList.classList.contains('edit-comment')) {
                            that._commentsList.textarea.value = actionSelectionFor.comment.text;
                            that._commentsList.textarea.focus();
                            that._commentsList.editing = actionSelectionFor;
                            actionSelectionFor.parentElement.scrollTop = actionSelectionFor.offsetTop;
                        }
                        else {
                            that.beginEdit(actionSelectionFor);
                        }

                        break;
                    case 1:
                        that.copyTask(actionSelectionFor);
                        break;
                    case 2:
                        if (that._actionsList.classList.contains('edit-comment')) {
                            that._openDialog(actionSelectionFor, 'prompt', 'comment');
                        }
                        else {
                            that.removeTask(actionSelectionFor, true);
                        }

                        break;
                }

                that._closeList(that._actionsList, '_actionSelectionFor');
                return;
            }
        }

        if (target.closest('.lw-kanban-list.comments')) {
            const sendButton = target.closest('.send');

            if (sendButton) {
                if (sendButton.disabled) {
                    return;
                }

                that._createComment();

                that._commentsList.textarea.value = '';
                sendButton.disabled = true;
            }
            else if (target.classList.contains('remove-button') && target.classList.contains('enabled')) {
                const comment = target.closest('.comment');

                if (!that._actionSelectionFor || that._actionSelectionFor !== comment && !that._actionSelectionFor.classList.contains('lw-kanban-task') &&
                    (!that._actionsList.parentElement || that._actionsList.classList.contains('lw-visibility-hidden'))) {
                    that._openActionsList(target, undefined, comment);
                }
            }

            return;
        }

        const task = target.closest('.lw-kanban-task');

        if (!task) {
            return;
        }

        if (target.classList.contains('lw-kanban-task-user')) {
            if (that.userList && that._currentUser.allowEdit &&
                (!that._userSelectionFor || that._userSelectionFor !== task &&
                    (!that._userList.parentElement || that._userList.classList.contains('lw-visibility-hidden')))) {
                that._openUserList(target, task);
            }

            return;
        }

        if (that.taskActions && target.classList.contains('lw-kanban-task-actions')) {
            if (!that._actionSelectionFor || that._actionSelectionFor !== task && !that._actionSelectionFor.classList.contains('comment') &&
                (!that._actionsList.parentElement || that._actionsList.classList.contains('lw-visibility-hidden'))) {
                that._openActionsList(target, task);
            }

            return;
        }

        if (that.taskComments && target.classList.contains('lw-kanban-task-comments')) {
            if (that.users.length > 0 &&
                (!that._commentSelectionFor || that._commentSelectionFor !== task &&
                    (!that._commentsList.parentElement || that._commentsList.classList.contains('lw-visibility-hidden')))) {
                that._openCommentsList(target, task);
            }

            return;
        }

        if (!that._preventSelection) {
            that._selectTask(event, task);
        }

        if (!that._currentUser.allowEdit || !event.type) {
            return;
        }

        clearTimeout(that._dblclickObject.timeout);
        that._dblclickObject.numberOfClicks++;

        if (that._dblclickObject.numberOfClicks === 2) {
            that._dblclickObject.numberOfClicks = 0;
            that.beginEdit(task);
        }
        else {
            that._dblclickObject.timeout = setTimeout(function () {
                that._dblclickObject.numberOfClicks = 0;
            }, 300);
        }
    }

    /**
     * Selects a task on click.
     */
    _selectTask(event, task) {
        const that = this,
            selectionMode = that.selectionMode;

        function selectSingleExtended() {
            that._selectedTasks.forEach(selectedTask => selectedTask !== task && selectedTask.removeAttribute('selected'));

            if (!task.hasAttribute('selected')) {
                task.setAttribute('selected', '');
                that._selectedTasks = [task];
            }

            that._selectionStart = task;
            that._selectionInView = task.closest('lw-scroll-viewer');
            that._autoSaveState('selection');
            that._focusTask(task);
        }

        if (selectionMode === 'zeroOrOne') {
            that._selectedTasks.forEach(selectedTask => selectedTask !== task && selectedTask.removeAttribute('selected'));

            if (task.hasAttribute('selected')) {
                that._focusTask(task);
                task.removeAttribute('selected');
                that._selectedTasks = [];
                delete that._selectionInView;
            }
            else {
                task.setAttribute('selected', '');
                that._selectedTasks = [task];
                that._selectionStart = task;
                that._selectionInView = task.closest('lw-scroll-viewer');
                that._focusTask(task);
            }
        }
        else {
            if (!event.ctrlKey && !event.shiftKey ||
                that._selectedTasks.length === 0 ||
                task.closest('lw-scroll-viewer') !== that._selectionInView) {
                selectSingleExtended();
                return;
            }

            if (event.ctrlKey) {
                if (task.hasAttribute('selected')) {
                    task.removeAttribute('selected');
                    that._selectedTasks = that._selectedTasks.filter(currentTask => currentTask !== task);
                }
                else {
                    task.setAttribute('selected', '');
                    that._selectedTasks.push(task);
                    that._selectionStart = task;
                }
            }
            else if (event.shiftKey) {
                if (task === that._selectionStart) {
                    if (that._selectedTasks.length > 1) {
                        selectSingleExtended();
                    }

                    return;
                }

                const tasksInColumn = Array.from(task.parentElement.children);
                let startIndex = tasksInColumn.indexOf(that._selectionStart),
                    endIndex = tasksInColumn.indexOf(task);
                const temp = startIndex;

                startIndex = Math.min(startIndex, endIndex);
                endIndex = Math.max(temp, endIndex);

                that._selectedTasks = [];

                tasksInColumn.forEach((currentTask, index) => {
                    if (index >= startIndex && index <= endIndex && !currentTask.filteredOut) {
                        currentTask.setAttribute('selected', '');
                        that._selectedTasks.push(currentTask);
                    }
                    else {
                        currentTask.removeAttribute('selected');
                    }
                });
            }

            that._focusTask(task);
        }

        that._autoSaveState('selection');
    }

    /**
     * Processes data source.
     */
    _processDataSource() {
        const that = this,
            dataSource = that.dataSource;

        if (that.columns.length === 0 || dataSource === null) {
            return;
        }

        dataSource.forEach(data => {
            that._createTask(data);
        });

        that.whenRendered(() => that._allColumns.forEach(column => that._refreshScrollViewer(column)));
    }

    /**
     * Creates or updates the user list.
     */
    _setUserList() {
        const that = this,
            list = document.createElement('div');

        list.id = that.id + 'UserList';
        list.className = 'lw-kanban-list users lw-visibility-hidden';
        list.setAttribute('role', 'listbox');

        if (!that.disabled && !that.unfocusable) {
            list.tabIndex = 0;
        }

        that.users.forEach(user => {
            const div = document.createElement('div');

            div.className = 'item';
            div.innerHTML = `<div class="icon" style="background-image: url('${user.image}')"></div><div class="name">${user.name}</div>`;
            div.setAttribute('data-id', user.id);
            div.setAttribute('role', 'option');
            list.appendChild(div);
        });

        that._userList = list;
    }

    /**
     * Opens an options list.
     */
    _openList(button, list, right) {
        const that = this,
            containerRect = that.$.container.getBoundingClientRect(),
            buttonRect = button.getBoundingClientRect();
        let left = buttonRect.left,
            top = buttonRect.top + button.offsetHeight,
            windowWidth, windowHeight;

        function check() {
            if (list.getBoundingClientRect().height === 0) {
                requestAnimationFrame(check);
            }
            else {
                list.focus();
            }
        }

        right = that.rightToLeft ? (right ? false : true) : right;

        if (window.devicePixelRatio === 1) {
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        }
        else {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }

        that.$.container.appendChild(list);

        if (right) {
            left = buttonRect.right - list.offsetWidth;
        }

        if (left + list.offsetWidth > windowWidth) {
            left = windowWidth - list.offsetWidth;
        }

        if (top + list.offsetHeight > windowHeight) {
            top = windowHeight - list.offsetHeight;
        }

        list.style.left = Math.max(0, left) - containerRect.left + 'px';
        list.style.top = top - containerRect.top + 'px';
        list.classList.remove('lw-visibility-hidden');

        button.setAttribute('aria-expanded', true);
        button.setAttribute('aria-controls', list.id);

        if (!that.unfocusable) {
            requestAnimationFrame(check);
        }

        list.openedFrom = button;
    }

    /**
     * Opens the user list.
     */
    _openUserList(icon, task) {
        const that = this;

        if (that.users.length === 0) {
            return;
        }

        const userId = task.data.userId,
            userList = that._userList,
            selectedUser = userList.querySelector('.selected');

        if (selectedUser) {
            selectedUser.classList.remove('selected');
            selectedUser.removeAttribute('aria-selected');
        }

        that._openList(icon, userList);

        if (userId !== null) {
            const selectedUser = Array.from(userList.children).find(user => user.getAttribute('data-id') === userId.toString());

            if (selectedUser) {
                selectedUser.classList.add('selected');
                selectedUser.setAttribute('aria-selected', true);
                userList.scrollTop = selectedUser.offsetTop;
            }
        }

        that._userSelectionFor = task;
    }

    /**
     * Closes a list.
     */
    _closeList(list, flag) {
        const that = this;

        if (!list || !list.parentElement) {
            return;
        }

        const controller = that.$.container.querySelector(`[aria-expanded="true"][aria-controls="${list.id}"]`);

        function check() {
            if (!list.classList.contains('lw-visibility-hidden')) {
                return;
            }

            if (list.getBoundingClientRect().height > 0) {
                requestAnimationFrame(check);
            }
            else {
                list.remove();
                delete list.openedFrom;
                delete that[flag];
            }
        }

        list.classList.add('lw-visibility-hidden');
        requestAnimationFrame(check);

        if (controller) {
            controller.removeAttribute('aria-expanded');
            controller.removeAttribute('aria-controls');
        }
    }

    /**
     * Creates or updates the task actions list.
     */
    _setActionsList() {
        const that = this,
            list = document.createElement('div');

        list.id = that.id + 'ActionsList';
        list.className = 'lw-kanban-list actions lw-visibility-hidden';
        list.setAttribute('role', 'menu');

        if (!that.disabled && !that.unfocusable) {
            list.tabIndex = 0;
        }

        list.innerHTML = `<div class="item" data-id="0" role="menuitem"><div class="name">${that.localize('edit')}</div></div>
<div class="item" data-id="1" role="menuitem"><div class="name">${that.localize('copy')}</div></div>
<div class="item" data-id="2" role="menuitem"><div class="name">${that.localize('remove')}</div></div>`;

        that._actionsList = list;
    }

    /**
     * Opens the task actions list.
     */
    _openActionsList(icon, task, comment) {
        const that = this,
            currentUser = that._currentUser,
            list = that._actionsList;

        that._openList(icon, list, comment);
        list.classList.toggle('edit-comment', !!comment);
        that._actionSelectionFor = task || comment;

        list.firstElementChild.toggleAttribute('disabled', !!(task && !currentUser.allowEdit));
        list.children[1].toggleAttribute('disabled', !!(task && !currentUser.allowAdd));
        list.children[2].toggleAttribute('disabled', !!(task && !currentUser.allowRemove));
        Array.from(list.children).forEach(item => item.classList.remove('selected'));
    }

    /**
     * Creates or updates the task comments list.
     */
    _setCommentsList() {
        const that = this,
            list = document.createElement('div');

        list.id = that.id + 'CommentsList';
        list.className = 'lw-kanban-list comments lw-visibility-hidden';
        list.setAttribute('role', 'dialog');

        if (!that.disabled && !that.unfocusable) {
            list.tabIndex = 0;
        }

        list.innerHTML = `<div class="lw-kanban-comments" role="list"></div>
<div class="lw-kanban-new-comment" role="presentation">
    <textarea placeholder="${that.localize('newComment')}"></textarea>
    <lw-button class="send primary" disabled${that._rtlAttr}>${that.localize('send')}</lw-button>
</div>`;

        const textarea = list.querySelector('textarea'),
            button = list.querySelector('lw-button');

        button.tabIndex = 0;

        textarea.onfocus = () => {
            list.classList.add('expanded');
            button.disabled = textarea.value === '';
        };
        textarea.onblur = (event) => {
            if (!button.contains(event.relatedTarget)) {
                list.classList.remove('expanded');
            }
        };
        textarea.onkeyup = () => {
            button.disabled = textarea.value === '';
        };
        textarea.oncut = () => {
            button.disabled = textarea.value === '';
        };
        textarea.onpaste = () => {
            button.disabled = textarea.value === '';
        };

        list.textarea = textarea;
        list.button = button;
        that._commentsList = list;
    }

    /**
     * Opens the task actions list.
     */
    _openCommentsList(icon, task) {
        const that = this,
            list = that._commentsList;

        list.classList.remove('expanded');
        list.firstElementChild.innerHTML = '';
        list.textarea.value = '';
        list.textarea.disabled = !that._currentUser.allowComment;

        if (that.unfocusable) {
            list.textarea.tabIndex = -1;
        }
        else {
            list.textarea.removeAttribute('tabindex');
        }

        delete list.editing;

        task.data.comments.forEach(comment => that._createComment(comment));

        that._openList(icon, list);
        that._commentSelectionFor = task;
    }

    /**
     * Creates a comment.
     */
    _createComment(comment) {
        const that = this,
            commentElement = document.createElement('div');
        let newComment, user;

        if (!comment) {
            const enteredText = that._commentsList.textarea.value,
                editedCommentElement = that._commentsList.editing;

            if (editedCommentElement) {
                editedCommentElement.querySelector('.comment-body').innerHTML = enteredText;
                editedCommentElement.comment.text = enteredText;
                delete that._commentsList.editing;
                return;
            }

            const data = that._commentSelectionFor.data;

            newComment = true;
            comment = {
                text: enteredText,
                userId: that._currentUser.info.id,
                time: new Date()
            };

            user = that._currentUser.info;

            data.comments.push(comment);
            that._commentSelectionFor.querySelector('.lw-kanban-task-comments').setAttribute('num', data.comments.length || '');
        }
        else {
            user = that.users.find(user => user.id === comment.userId);
        }

        if (!user) {
            return;
        }

        const commentsSection = that._commentsList.firstElementChild;

        commentElement.classList = 'comment';
        commentElement.setAttribute('role', 'listitem');
        commentElement.innerHTML = `<div class="comment-indent" role="presentation">
    <div class="user-icon" style="background-image: url('${user.image}');" role="img" aria-label="Icon of user ${(user.name || user.id)}"></div>
</div>
<div class="comment-main" role="presentation">
    <div class="comment-header" role="presentation">
        <div class="user-name" aria-label="User name">${user.name}</div>
        <div class="time" aria-label="Comment time">${comment.time ? new LW.Utilities.DateTime(comment.time).toString(that.formatStringTime) : ''}</div>
        <div class="remove-button${that._currentUser.info && user.id === that._currentUser.info.id && that._currentUser.allowComment ? ' enabled' : ''}"${that._tabindex} role="button" aria-haspopup="menu" aria-label="Comment settings"></div>
    </div>
    <div class="comment-body" aria-label="Comment text">${comment.text || ''}</div >
</div>`;
        commentElement.comment = comment;

        commentsSection.appendChild(commentElement);

        if (newComment) {
            commentsSection.scrollTop = commentsSection.scrollHeight - commentsSection.offsetHeight;
        }
    }

    /**
     * Creates a task.
     */
    _createTask(data, refreshScrollbar) {
        const that = this,
            column = that._allColumns.find(column => column.dataField === data.status);

        if (!column) {
            return;
        }

        const task = document.createElement('div'),
            columnElement = that._columnToElement.get(column),
            columnScrollViewer = that.getTaskScrollViewer(columnElement, data);

        if (data.id === undefined) {
            data.id = Math.floor(Math.random() * 90000 + 10000);
        }

        task.className = 'lw-kanban-task lw-unselectable';
        task.setAttribute('role', 'listitem');
        task.setAttribute('data-id', data.id);
        task.data = data;
        that._renderTask(task);

        if (data.class && typeof data.class === 'string') {
            task.classList.add(data.class);
        }

        columnScrollViewer.appendChild(task);

        that._updateTaskColor(task);

        if (refreshScrollbar) {
            if (column.collapsed) {
                columnScrollViewer.toRefresh = true;
            }
            else {
                columnScrollViewer.refresh();
            }
        }
    }

    /**
     * Gets a task's ScrollViewer.
     */
    getTaskScrollViewer(columnElement, data) {
        const that = this;
        let scrollViewer;

        if (that._hasSwimlane(columnElement.index)) {
            if (data.swimlane !== undefined && that.swimlanes.find(swimlane => swimlane.dataField === data.swimlane)) {
                scrollViewer = columnElement.querySelector(`lw-scroll-viewer[swimlane="${data.swimlane}"]`);
            }
            else {
                scrollViewer = columnElement.querySelector('lw-scroll-viewer');
                data.swimlane = scrollViewer.getAttribute('swimlane');
            }
        }
        else {
            scrollViewer = columnElement.querySelector('lw-scroll-viewer');
            delete data.swimlane;
        }

        return scrollViewer;
    }

    /**
     * Renders task.
     */
    _renderTask(task) {
        const that = this;

        that._applyTaskTemplate(task);
        that._updateUserIcon(task);
        that._updateTaskChecked(task);
        that._updateTaskProgress(task);
        that._updateTaskDueDate(task);

        if (task.parentElement) {
            that._updateTaskColor(task);
        }
    }

    /**
     * Applies task template.
     */
    _applyTaskTemplate(task) {
        const that = this,
            tags = that.tags,
            data = task.data,
            tabindex = that._tabindex;
        let text = data.text,
            taskTags = data.tags,
            tagsContent = '';

        if (text === undefined) {
            text = '';
            data.text = '';
        }

        text = that._applyTextTemplate(text, data, task);

        if (taskTags && typeof taskTags === 'string') {
            taskTags = taskTags.replace(/\s+/g, '').split(',');

            if (tags.length > 0) {
                taskTags = taskTags.filter(tag => tags.indexOf(tag) !== -1);
                data.tags = taskTags.join(', ');
            }
            else {
                taskTags.forEach(tag => {
                    if (that._customTags.indexOf(tag) === -1) {
                        that._customTags.push(tag);
                    }
                });
            }

            tagsContent = taskTags.map(tag => `<span class="lw-kanban-task-tag" role="listitem">${tag}</span>`).join('');
        }
        else {
            data.tags = '';
        }

        if (typeof data.priority === 'string') {
            data.priority = data.priority.toLowerCase();
        }

        if (data.priority !== 'high' && data.priority !== 'low') {
            data.priority = 'normal';
        }

        if (!data.comments || !Array.isArray(data.comments)) {
            data.comments = [];
        }

        task.innerHTML = `<div class="lw-kanban-task-content" role="presentation">
    <div class="lw-kanban-task-text ${data.priority}">${text}</div>
    <div class="lw-kanban-task-user"${tabindex} role="button" aria-haspopup="listbox"></div>
</div>
<div class="lw-kanban-task-info" role="presentation">
    <div class="lw-kanban-task-progress-container">
        <div class="lw-kanban-task-progress" role="progressbar" aria-label="Task progress" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="lw-kanban-task-checked" aria-label="Completed sub-tasks"></div>
    </div>
    <div class="lw-kanban-task-due" aria-label="Task due date"></div>
</div>
<div class="lw-kanban-task-footer" role="toolbar" aria-label="Task footer">
    <div class="lw-kanban-task-tags" role="list" aria-label="Tags list">${tagsContent}</div>
    <div class="lw-kanban-task-actions"${tabindex} role="button" aria-haspopup="menu" aria-label="Open actions list"></div>
    <div class="lw-kanban-task-comments"${tabindex} num="${data.comments.length || ''}" role="button" aria-haspopup="dialog" aria-label="Open comments list"></div>
</div>`;
        task.setAttribute('aria-label', data.text);
    }

    /**
     * Applies text template.
     */
    _applyTextTemplate(text, data, task) {
        let template = this.textTemplate;

        if (!template) {
            return text;
        }

        let result = '';

        if (typeof template === 'function') {
            const settings = { data: data, task: task, text: text, template: null };

            template(settings);

            text = settings.text;

            if (settings.template === null) {
                return text;
            }

            template = settings.template;
        }

        if (template.startsWith('#')) {
            const templateElement = document.querySelector(template);

            if (templateElement && templateElement instanceof HTMLTemplateElement) {
                const templateContent = templateElement.content.cloneNode(true),
                    tempElement = document.createElement('div');

                tempElement.appendChild(templateContent);

                text = text.toString();
                text = text.replace(/'/ig, '\\\'');
                text = text.replace(/"/ig, '\\"');

                result = tempElement.innerHTML.replace(/{{text}}/ig, text).replace(/{{id}}/ig, data.id);

                if (result.indexOf('{{text=') >= 0) {
                    if (!text) {
                        result = result.replace(/{{text=/ig, '');
                        result = result.replace(/}}/ig, '');
                    }
                    else {
                        result = result.substring(0, result.indexOf('{{text=')) + text + result.substring(result.indexOf('}'));
                        result = result.replace(/}/ig, '');
                        result = result.replace(/{/ig, '');
                    }
                }

                return result;
            }
        }

        result = template.replace(/{{text}}/ig, text).replace(/{{id}}/ig, data.id);
        return result;
    }

    /**
     * Updates a task's user icon.
     */
    _updateUserIcon(task) {
        const data = task.data,
            userIcon = task.getElementsByClassName('lw-kanban-task-user')[0];

        if (data.userId !== undefined && data.userId !== null) {
            const user = this.users.find(user => user.id === data.userId);

            if (user) {
                userIcon.classList.remove('empty');
                userIcon.style.backgroundImage = 'url("' + user.image + '")';
                userIcon.setAttribute('aria-label', 'Icon of user ' + (user.name || user.id));
                return;
            }
        }

        data.userId = null;
        userIcon.classList.add('empty');
        userIcon.style.backgroundImage = null;
        userIcon.setAttribute('aria-label', 'Empty user icon');
    }

    /**
     * Updates a task's progress.
     */
    _updateTaskProgress(task) {
        const data = task.data,
            progressBar = task.querySelector('.lw-kanban-task-progress');
        let progress = data.progress;

        if (progress === undefined) {
            data.progress = null;
            progressBar.setAttribute('aria-valuenow', 0);
            return;
        }

        progress = parseFloat(progress);

        if (isNaN(progress)) {
            data.progress = null;
            progressBar.setAttribute('aria-valuenow', 0);
            return;
        }

        progress = Math.max(0, Math.min(parseFloat(progress), 100));
        data.progress = progress;
        progressBar.style.width = progress + '%';

        progressBar.classList.toggle('bottom', data.checklist !== null);
        progressBar.setAttribute('aria-valuenow', progress);
    }

    /**
     * Updates checked subtask number.
     */
    _updateTaskChecked(task) {
        const data = task.data,
            checklist = data.checklist,
            checked = task.querySelector('.lw-kanban-task-checked');

        if (checklist && Array.isArray(checklist) && checklist.length > 0) {
            checked.innerHTML = this._getCompletedSubTasks(checklist);
        }
        else {
            data.checklist = null;
            checked.innerHTML = '';
        }
    }

    /**
     * Gets a string representing the number of completed sub-tasks.
     */
    _getCompletedSubTasks(checklist) {
        if (checklist === null) {
            return '';
        }

        let completedTasks = 0;

        checklist.forEach(subTask => subTask.completed && completedTasks++);
        return completedTasks + '/' + checklist.length;
    }

    /**
     * Updates a task's due date.
     */
    _updateTaskDueDate(task) {
        const data = task.data,
            dueDate = data.dueDate,
            dateContainer = task.querySelector('.lw-kanban-task-due');

        if (dueDate) {
            dateContainer.innerHTML = new LW.Utilities.DateTime(dueDate).toString(this.formatStringDate);
            dateContainer.classList.toggle('overdue', dueDate.getTime() < new Date().getTime() && data.progress !== 100);
        }
        else {
            data.dueDate = null;
            dateContainer.innerHTML = '';
            dateContainer.classList.remove('overdue');
        }

        if (!data.startDate) {
            data.startDate = null;
        }
    }

    /**
     * Updates a task's color.
     */
    _updateTaskColor(task) {
        const that = this,
            data = task.data,
            progressContainer = task.querySelector('.lw-kanban-task-progress-container'),
            progress = task.querySelector('.lw-kanban-task-progress'),
            borderColor = that.rightToLeft ? 'borderRightColor' : 'borderLeftColor';

        function hex(dec) {
            let hex = parseFloat(dec).toString(16);

            hex = '0'.repeat(2 - hex.length) + hex;
            return hex.toUpperCase();
        }

        function toHex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (!rgb) {
                return null;
            }

            return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        task.style.borderLeftColor = null;
        task.style.borderRightColor = null;

        if (data.color) {
            task.style[borderColor] = data.color;

            const color = getComputedStyle(task)[borderColor],
                alpha = that.theme === 'dark' ? 0.4 : 0.1;

            data.color = toHex(color);

            progressContainer.style.backgroundColor = `rgba(${color.slice(4, color.length - 1)}, ${alpha})`;
            progress.style.backgroundColor = color;
        }
        else {
            data.color = null;
            progressContainer.style.backgroundColor = null;
            progress.style.backgroundColor = null;
        }
    }

    /**
     * Validates swimlanes.
     */
    _validateSwimlanes() {
        const that = this,
            swimlanesFrom = that.swimlanesFrom,
            swimlanesTo = that.swimlanesTo,
            validSwimlanes = [];

        if (swimlanesFrom < 0) {
            that.swimlanesFrom = 0;
        }

        if (swimlanesTo !== null) {
            if (swimlanesFrom > swimlanesTo) {
                that.swimlanesFrom = swimlanesTo;
            }
        }

        that.swimlanes.forEach(swimlane => {
            if (typeof swimlane === 'string') {
                swimlane = { dataField: swimlane, label: swimlane };
            }

            if (!swimlane.dataField && !swimlane.label) {
                return;
            }

            if (!swimlane.label) {
                swimlane.label = swimlane.dataField;
            }

            if (!swimlane.dataField) {
                swimlane.dataField = swimlane.label;
            }

            validSwimlanes.push(swimlane);
        });

        that.swimlanes = validSwimlanes;
    }

    /**
     * Handles swimlane creation and positioning.
     */
    _handleSwimlanes(update) {
        const that = this,
            swimlanes = that.swimlanes;

        if (swimlanes.length === 0 || that.columns.length === 0) {
            return;
        }

        const columns = that.columns,
            headerSize = parseFloat(getComputedStyle(that).getPropertyValue('--lw-kanban-header-size')),
            container = that.$.container,
            containerRect = that.$.container.getBoundingClientRect(),
            columnsWithSwimlanes = that.$.container.querySelectorAll('.lw-kanban-column.has-swimlane');
        let firstColumn = columnsWithSwimlanes[0],
            lastColumn = columnsWithSwimlanes[columnsWithSwimlanes.length - 1];

        if (that.rightToLeft) {
            let temp = firstColumn;

            firstColumn = lastColumn;
            lastColumn = temp;
        }

        const firstColumnRect = firstColumn.getBoundingClientRect(),
            lastColumnRect = columnsWithSwimlanes.length > 1 ? lastColumn.getBoundingClientRect() : firstColumnRect,
            scrollViewers = Array.from(firstColumn.getElementsByTagName('lw-scroll-viewer'));
        let restoreCollapsed = false,
            allColumnsCollapsed = true,
            to = that.swimlanesTo,
            swimlaneElements, width, left, tops;

        if (to === null) {
            to = columns.length - 1;
        }

        if (update) {
            swimlaneElements = container.getElementsByClassName('swimlane');
        }

        if (firstColumn.column.collapsed) {
            firstColumn.classList.remove('collapsed');
            restoreCollapsed = true;
        }

        for (let i = that.swimlanesFrom; i <= to; i++) {
            allColumnsCollapsed = allColumnsCollapsed && columns[i].collapsed;
        }

        if (!allColumnsCollapsed) {
            width = lastColumnRect.right - firstColumnRect.left + 'px';
            left = firstColumnRect.left - containerRect.left + 'px';
            tops = scrollViewers.map(scrollViewer => scrollViewer.getBoundingClientRect().top - containerRect.top - headerSize - that._dataViewPadding + 'px');
        }

        swimlanes.forEach((swimlane, index) => {
            let swimlaneElement;

            if (update) {
                swimlaneElement = swimlaneElements[index];
            }
            else {
                swimlaneElement = document.createElement('div');
                swimlaneElement.innerHTML = `<div class="swimlane-label">${swimlane.label}</div>`;
                swimlaneElement.className = 'swimlane';
                swimlaneElement.setAttribute('role', 'heading');
                swimlaneElement.setAttribute('aria-level', 2);

                if (swimlane.color) {
                    swimlaneElement.style.backgroundColor = swimlane.color;
                }
            }

            swimlaneElement.classList.toggle('lw-visibility-hidden', allColumnsCollapsed);

            if (!allColumnsCollapsed) {
                swimlaneElement.style.width = width;
                swimlaneElement.style.left = left;
                swimlaneElement.style.top = tops[index];
            }

            if (!update) {
                container.appendChild(swimlaneElement);
            }
        });

        if (restoreCollapsed) {
            firstColumn.classList.add('collapsed');
        }
    }

    /**
     * Renders Kanban columns.
     */
    _renderColumns() {
        const that = this,
            collapsibleColumns = that.collapsible,
            validColumns = [],
            body = that.$.body,
            structure = document.createDocumentFragment();
        let columns = that.columns;

        that._columnToElement = new Map();
        that._columnContainers = [];

        if (columns.length === 0) {
            const dataSource = that.dataSource;

            if (dataSource && dataSource.length !== 0) {
                columns = [];

                dataSource.forEach(data => {
                    const status = data.status;

                    if (status && columns.indexOf(status) === -1) {
                        columns.push(status);
                    }
                });
            }
        }

        function validateSiblingColumns(originalArray, validArray, level) {
            const selectedTabs = [];
            let collapsedSiblings = 0;

            originalArray.forEach((column) => {
                if (typeof column === 'string') {
                    column = { dataField: column, label: column };
                }

                if (!column.dataField && !column.label) {
                    return;
                }

                if (!column.label) {
                    column.label = column.dataField;
                }

                if (!column.dataField) {
                    column.dataField = column.label;
                }

                if (column.orientation !== 'horizontal') {
                    column.orientation = 'vertical';
                }

                if (column.collapsible !== false) {
                    column.collapsible = true;
                }

                if (!column.collapsed || !collapsibleColumns || !column.collapsible) {
                    column.collapsed = false;
                }
                else {
                    collapsedSiblings++;
                }

                if (column.addNewButton !== false) {
                    column.addNewButton = true;
                }

                if (level === 0) {
                    delete column.selected;
                }
                else if (column.selected === true) {
                    selectedTabs.push(column);
                }
                else {
                    column.selected = false;
                }

                if (column.columns) {
                    column.validColumns = [];
                    validateSiblingColumns(column.columns, column.validColumns, level + 1);
                    column.columns = column.validColumns;
                    delete column.validColumns;
                }

                validArray.push(column);
            });

            if (collapsedSiblings && collapsedSiblings === validArray.length) {
                validArray[0].collapsed = false;
            }

            if (selectedTabs.length > 1) {
                for (let i = selectedTabs.length - 2; i >= 0; i--) {
                    selectedTabs[i].selected = false;
                }
            }
            else if (level > 0 && selectedTabs.length === 0 && validArray.length > 0) {
                validArray[0].selected = true;
            }
        }

        validateSiblingColumns(columns, validColumns, 0);
        that.columns = validColumns;

        if (that.swimlanes.length === 0) {
            if (that.hierarchy === 'columns') {
                that._createColumnElements(validColumns, structure, body, 1);
            }
            else {
                that._createColumnElementsTabs(validColumns, structure, body);
            }
        }
        else {
            that._createColumnElementsSwimlanes(validColumns, structure, body);
        }

        body.appendChild(structure);

        that._selectedTabs = that._allColumns.filter(column => column.selected).map(column => column.dataField);
        that._autoSaveState('tabs');
    }

    /**
     * Creates column elements (no swimlanes).
     */
    _createColumnElements(siblingColumns, parent, container, level) {
        const that = this,
            id = that.id,
            gridTemplateColumns = [],
            columnFractions = [];
        let numberOfColumns = 0;

        siblingColumns.forEach((column, index) => {
            const columnElement = document.createElement('div');
            let innerHTML =
                `${that._getColumnHeader(column, index < siblingColumns.length - 1, level)}
                <div class="lw-kanban-column-contentAAA" role="presentation">
                    <lw-scroll-viewer class="lw-kanban-column-content-tasks"${that._rtlAttr}${that._tabindex} role="list"></lw-scroll-viewer>BBB
                </div>`,
                numberOfLeafColumns = 0;

            if (column.columns) {
                innerHTML = innerHTML.replace('AAA', '');
                innerHTML = innerHTML.replace('BBB', '<div class="lw-kanban-column-content-columns" role="presentation"></div>');
            }
            else {
                innerHTML = innerHTML.replace('AAA', ' no-sub-columns');
                innerHTML = innerHTML.replace('BBB', '');
            }

            columnElement.className = 'lw-kanban-column';
            columnElement.setAttribute('role', 'group');
            columnElement.setAttribute('aria-labelledby', `${id}ColumnHeaderLabel${column.dataField}`);
            columnElement.setAttribute('orientation', column.orientation);

            if (column.collapsible) {
                columnElement.setAttribute('collapsible', '');
            }

            if (column.addNewButton) {
                columnElement.setAttribute('add-new-button', '');
            }

            columnElement.innerHTML = innerHTML;
            columnElement.siblingColumns = siblingColumns;

            parent.appendChild(columnElement);

            columnElement.column = column;
            columnElement.index = index;

            that._columnToElement.set(column, columnElement);

            if (column.columns) {
                const innerColumnContainer = columnElement.querySelector('.lw-kanban-column-content-columns');

                numberOfLeafColumns = that._createColumnElements(column.columns, innerColumnContainer, innerColumnContainer, level + 1);
                numberOfColumns += numberOfLeafColumns;
            }
            else {
                numberOfColumns += 1;
            }

            const fraction = (numberOfLeafColumns || 1) + 'fr';

            if (column.collapsed) {
                columnElement.classList.add('collapsed');
                gridTemplateColumns.push('auto');
            }
            else {
                gridTemplateColumns.push(fraction);
            }

            columnFractions.push(fraction);
            that._allColumns.push(column);
        });

        container.style.gridTemplateColumns = gridTemplateColumns.join(' ');
        container.fractions = columnFractions;
        that._columnContainers.push(container);
        return numberOfColumns;
    }

    /**
     * Creates column elements with tabs for sub-columns (no swimlanes).
     */
    _createColumnElementsTabs(siblingColumns, parent, container, tabs) {
        const that = this,
            id = that.id,
            gridTemplateColumns = [],
            columnFractions = [];

        siblingColumns.forEach((column, index) => {
            const columnElement = document.createElement('div');
            let innerHTML =
                `<div class="lw-kanban-column-contentAAA" role="presentation">
                    <lw-scroll-viewer class="lw-kanban-column-content-tasks"${that._rtlAttr}${that._tabindex} role="list"></lw-scroll-viewer>BBB
                </div>`;

            if (column.columns) {
                innerHTML = innerHTML.replace('AAA', '');
                innerHTML = innerHTML.replace('BBB', '<div class="lw-kanban-column-content-columns has-tabs" role="presentation"></div>');
            }
            else {
                innerHTML = innerHTML.replace('AAA', ' no-sub-columns');
                innerHTML = innerHTML.replace('BBB', '');
            }

            columnElement.className = 'lw-kanban-column';
            columnElement.setAttribute('orientation', column.orientation);

            if (column.collapsible) {
                columnElement.setAttribute('collapsible', '');
            }

            if (column.addNewButton) {
                columnElement.setAttribute('add-new-button', '');
            }

            if (tabs) {
                const tab = document.createElement('div'),
                    tabId = `${id}Tab${column.dataField}`,
                    columnElementId = `${id}Column${column.dataField}`;

                tab.id = tabId;
                tab.className = 'lw-kanban-tab lw-unselectable';

                if (!that.disabled && !that.unfocusable) {
                    tab.tabIndex = 0;
                }

                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-controls', columnElementId);
                tab.innerHTML = `<div class="lw-kanban-tab-label">${column.label}</div>`;
                tab.columnElement = columnElement;
                columnElement.id = columnElementId;
                columnElement.setAttribute('role', 'tabpanel');
                columnElement.setAttribute('aria-labelledby', tabId);
                columnElement.tab = tab;
                tabs.appendChild(tab);

                if (column.selected) {
                    tab.classList.add('selected');
                }
                else {
                    columnElement.classList.add('lw-hidden');
                }

                tab.setAttribute('aria-selected', column.selected);
            }
            else {
                innerHTML = that._getColumnHeader(column, index < siblingColumns.length - 1) + innerHTML;
                columnElement.setAttribute('role', 'group');
                columnElement.setAttribute('aria-labelledby', `${id}ColumnHeaderLabel${column.dataField}`);
            }

            columnElement.innerHTML = innerHTML;
            columnElement.siblingColumns = siblingColumns;

            parent.appendChild(columnElement);

            columnElement.column = column;
            columnElement.index = index;

            that._columnToElement.set(column, columnElement);

            if (column.columns) {
                const innerColumnContainer = columnElement.querySelector('.lw-kanban-column-content-columns'),
                    ownTabs = document.createElement('div');

                ownTabs.className = 'lw-kanban-tab-strip';
                ownTabs.setAttribute('role', 'tablist');
                innerColumnContainer.appendChild(ownTabs);
                that._createColumnElementsTabs(column.columns, innerColumnContainer, innerColumnContainer, ownTabs);
            }

            if (!tabs) {
                if (column.collapsed) {
                    columnElement.classList.add('collapsed');
                    gridTemplateColumns.push('auto');
                }
                else {
                    gridTemplateColumns.push('1fr');
                }

                columnFractions.push('1fr');
            }

            that._allColumns.push(column);
        });

        if (!tabs) {
            container.style.gridTemplateColumns = gridTemplateColumns.join(' ');
            container.fractions = columnFractions;
            that._columnContainers.push(container);
        }
    }

    /**
     * Creates column elements (with swimlanes).
     */
    _createColumnElementsSwimlanes(siblingColumns, parent, container) {
        const that = this,
            id = that.id,
            swimlanes = that.swimlanes,
            gridTemplateColumns = [],
            columnFractions = [];

        siblingColumns.forEach((column, index) => {
            const columnElement = document.createElement('div');
            let innerHTML =
                `${that._getColumnHeader(column, index < siblingColumns.length - 1)}
                <div class="lw-kanban-column-content no-sub-columns" role="presentation"></div>`;

            columnElement.className = 'lw-kanban-column';
            columnElement.setAttribute('role', 'group');
            columnElement.setAttribute('aria-labelledby', `${id}ColumnHeaderLabel${column.dataField}`);
            columnElement.setAttribute('orientation', column.orientation);

            if (column.collapsible) {
                columnElement.setAttribute('collapsible', '');
            }

            if (column.addNewButton) {
                columnElement.setAttribute('add-new-button', '');
            }

            columnElement.innerHTML = innerHTML;
            columnElement.siblingColumns = siblingColumns;

            const columnContent = columnElement.children[1];
            let columnContentInnerHTML = '';

            if (!that._hasSwimlane(index)) {
                columnContentInnerHTML = `<lw-scroll-viewer class="lw-kanban-column-content-tasks"${that._rtlAttr}${that._tabindex} role="list"></lw-scroll-viewer>`;
            }
            else {
                let gridTemplateRows = [];

                for (let i = 0; i < swimlanes.length; i++) {
                    columnContentInnerHTML += `<lw-scroll-viewer class="lw-kanban-column-content-tasks" swimlane="${swimlanes[i].dataField}"${that._rtlAttr}${that._tabindex} role="list"></lw-scroll-viewer>`;
                    gridTemplateRows.push('1fr');
                }

                columnElement.classList.add('has-swimlane');
                columnContent.classList.add('has-swimlane');
                columnContent.style.gridTemplateRows = gridTemplateRows.join(' ');
            }

            columnContent.innerHTML = columnContentInnerHTML;

            parent.appendChild(columnElement);

            columnElement.column = column;
            columnElement.index = index;

            that._columnToElement.set(column, columnElement);

            if (column.collapsed) {
                columnElement.classList.add('collapsed');
                gridTemplateColumns.push('auto');
            }
            else {
                gridTemplateColumns.push('1fr');
            }

            columnFractions.push('1fr');
            that._allColumns.push(column);
        });

        container.style.gridTemplateColumns = gridTemplateColumns.join(' ');
        container.fractions = columnFractions;
        that._columnContainers.push(container);
    }

    /**
     * Returns the HTML of a column's header.
     */
    _getColumnHeader(column, left, level = 1) {
        const that = this,
            tabindex = that._tabindex;

        return `<div class="lw-kanban-column-header lw-unselectable"${tabindex} role="heading" aria-level=${level}>
                    <div class="lw-kanban-column-header-add"${tabindex} role="button" aria-label="Add new task"></div>
                    <div id="${that.id}ColumnHeaderLabel${column.dataField}" class="lw-kanban-column-header-label">${column.label}</div>
                    <div class="lw-arrow lw-arrow-${left ? 'left' : 'right'}" aria-hidden="true"></div>
                </div>`;
    }

    /**
     * Determines whether there are swimlanes in a column.
     */
    _hasSwimlane(columnIndex) {
        const that = this,
            swimlanes = that.swimlanes;

        if (swimlanes.length === 0) {
            return false;
        }

        const swimlanesFrom = that.swimlanesFrom;
        let swimlanesTo = that.swimlanesTo;

        if (swimlanesTo === null) {
            swimlanesTo = that.columns.length - 1;
        }

        return columnIndex >= swimlanesFrom && columnIndex <= swimlanesTo;
    }

    /**
     * Updates column widths.
     */
    _updateColumnWidths(columns, container) {
        const fractions = container.fractions,
            gridTemplateColumns = [];

        for (let i = 0; i < columns.length; i++) {
            gridTemplateColumns.push(columns[i].collapsed ? 'auto' : fractions[i]);
        }

        container.style.gridTemplateColumns = gridTemplateColumns.join(' ');
    }

    /**
     * Validates the column argument passed to a public method.
     */
    _validateColumnArgument(column) {
        if (!isNaN(column)) {
            return this.columns[column];
        }

        const allColumns = this._allColumns;

        if (typeof column === 'string') {
            return allColumns.find(col => col.dataField === column);
        }

        if (typeof column === 'object') {
            return allColumns.find(col => col === column);
        }

        return null;
    }

    /**
     * resize handler.
     */
    _resizeHandler() {
        const that = this;

        clearTimeout(that._resizeTimeout);

        that._resizeTimeout = setTimeout(function () {
            that._allColumns.forEach(column => that._refreshScrollViewer(column));
        }, 50);

        that._handleSwimlanes(true);
    }

    /**
     * Refreshes a column's ScrollViewer.
     */
    _refreshScrollViewer(column, force) {
        const that = this,
            columnElement = column instanceof HTMLElement ? column : this._columnToElement.get(column);

        function refresh(scrollViewer, index) {
            if (!force && scrollViewer.$.scrollViewerContentContainer.innerHTML.trim() === '') {
                return;
            }

            if (column.collapsed) {
                scrollViewer.toRefresh = true;
            }
            else {
                delete scrollViewer.toRefresh;
                requestAnimationFrame(() => {
                    scrollViewer.refresh();

                    if (index === 0 && column.orientation === 'horizontal') {
                        if (scrollViewer.$.content.offsetWidth <= 2 * that._kanbanTaskMinWidth + that._dataViewPadding) {
                            columnElement.setAttribute('orientation', 'vertical');
                        }
                        else if (columnElement.getAttribute('orientation') === 'vertical') {
                            columnElement.setAttribute('orientation', 'horizontal');
                        }
                    }
                });
            }
        }

        if (column instanceof LW.ScrollViewer) {
            refresh(column);
            return;
        }

        if (this.swimlanes.length > 0) {
            Array.from(columnElement.querySelectorAll('lw-scroll-viewer')).forEach((scrollViewer, index) => refresh(scrollViewer, index));
        }
        else {
            refresh(columnElement.querySelector('lw-scroll-viewer'), 0);
        }
    }

    /**
     * Container down handler.
     */
    _containerDownHandler(event) {
        const that = this,
            target = that.isInShadowDOM || that.shadowRoot ? event.originalEvent.composedPath()[0] : event.originalEvent.target,
            task = target.closest('.lw-kanban-task');

        delete that._preventSelection;

        if (task) {
            that._focusTask(task);

            that._startDragging(task, event);
        }
    }

    /**
     * Container keydown handler
     */
    _containerKeydownHandler(event) {
        const that = this;

        if (that._dragDetails) {
            return;
        }

        const key = event.key,
            target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target,
            columnElement = target.closest('.lw-kanban-column');

        function emulateClick(t = target) {
            delete that._preventSelection;
            that._documentUpHandler({ originalEvent: { target: t } });
            that._containerClickHandler({ target: t, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey });
            event.preventDefault();
        }

        if (columnElement) {
            if (target.classList.contains('lw-kanban-column-content-tasks')) {
                that._selectViaKeyboard(target.$.content, event, emulateClick);
                return;
            }
            else if (key === 'Enter' || key === ' ') {
                emulateClick();
            }

            return;
        }

        if (that.$.headerDropDown.contains(target)) {
            if (key === 'Escape') {
                that.closePanel();
                that.$[/\s?([a-z]+)-panel/g.exec(that.$.headerDropDown.className)[1] + 'Button'].focus();
            }

            return;
        }

        if ((target.classList.contains('lw-data-view-header-button') ||
            target.closest('.lw-data-view-search-box') ||
            target.classList.contains('remove-button')) &&
            (key === 'Enter' || key === ' ')) {
            emulateClick();
        }

        if (target.classList.contains('lw-kanban-list')) {
            const list = target;

            switch (key) {
                case 'ArrowDown':
                    that._selectListItem(that._getNextItem(list));
                    break;
                case 'ArrowUp':
                    that._selectListItem(that._getPrevItem(list));
                    break;
                case 'Home':
                    that._selectListItem(that._getFirstItem(list));
                    break;
                case 'End':
                    that._selectListItem(that._getLastItem(list));
                    break;
                case 'Escape':
                    list.openedFrom.focus();
                    that._closeList(list, list === that._actionsList ? '_actionSelectionFor' :
                        (list === that._commentsList ? '_commentSelectionFor' : '_userSelectionFor'));
                    break;
                case 'Enter':
                case ' ': {
                    const selectedItem = that._getSelectedItem(list);

                    if (selectedItem) {
                        emulateClick(selectedItem);
                    }

                    break;
                }
                default:
                    return;
            }

            event.preventDefault();
            return;
        }
    }

    /**
     * Selects task(s) via keyboard.
     */
    _selectViaKeyboard(container, event, emulateClick) {
        const that = this;
        let key = event.key;

        if (that.rightToLeft) {
            if (key === 'ArrowRight') {
                key = 'ArrowLeft';
            }
            else if (key === 'ArrowLeft') {
                key = 'ArrowRight';
            }
        }

        switch (key) {
            case 'ArrowDown':
            case 'ArrowRight':
                that._focusTask(that._getNextItem(container, true));
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                that._focusTask(that._getPrevItem(container, true));
                break;
            case 'Home':
                that._focusTask(that._getFirstItem(container));
                break;
            case 'End':
                that._focusTask(that._getLastItem(container));
                break;
            case 'Enter':
            case ' ':
            case 'F2':
            case 'Delete': {
                const focusedItem = that._getSelectedItem(container, true);

                if (focusedItem) {
                    if (key === 'F2') {
                        that.beginEdit(focusedItem);
                    }
                    else if (key === 'Delete') {
                        that.removeTask(focusedItem, true);
                    }
                    else {
                        emulateClick(focusedItem);
                    }
                }

                break;
            }
            default:
                return;
        }

        event.preventDefault();
    }

    /**
     * Gets first enabled item from a list.
     */
    _getFirstItem(list) {
        const items = list.children;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (!item.hasAttribute('disabled') && getComputedStyle(item).display !== 'none') {
                return item;
            }
        }
    }

    /**
     * Gets last enabled item from a list.
     */
    _getLastItem(list) {
        const items = list.children;

        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            if (!item.hasAttribute('disabled') && getComputedStyle(item).display !== 'none') {
                return item;
            }
        }
    }

    /**
     * Gets previous enabled item from a list.
     */
    _getPrevItem(list, task) {
        const that = this,
            selectedItem = that._getSelectedItem(list, task);

        let prev = selectedItem ? selectedItem.previousElementSibling : that._getLastItem(list);

        while (prev) {
            if (!prev.hasAttribute('disabled') && getComputedStyle(prev).display !== 'none') {
                return prev;
            }

            prev = prev.previousElementSibling;
        }
    }

    /**
     * Gets next enabled item from a list.
     */
    _getNextItem(list, task) {
        const that = this,
            selectedItem = that._getSelectedItem(list, task);

        let next = selectedItem ? selectedItem.nextElementSibling : that._getFirstItem(list);

        while (next) {
            if (!next.hasAttribute('disabled') && getComputedStyle(next).display !== 'none') {
                return next;
            }

            next = next.nextElementSibling;
        }
    }

    /**
     * Gets selected item from a list.
     */
    _getSelectedItem(list, task) {
        if (task) {
            return list.querySelector('[focus]');
        }

        return list.querySelector('.selected');
    }

    /**
     * Selects an item from a list.
     */
    _selectListItem(item) {
        if (!item) {
            return;
        }

        const list = item.parentElement,
            previouslySelected = list.querySelector('.selected');

        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
            previouslySelected.removeAttribute('aria-selected');
        }

        item.classList.add('selected');
        item.setAttribute('aria-selected', true);
        list.scrollTop = item.offsetTop;
    }

    /**
     * Focuses a task.
     */
    _focusTask(task) {
        if (!task) {
            return;
        }

        const previouslyFocused = Array.from(task.parentElement.querySelectorAll('[focus]'));

        previouslyFocused.forEach(focusedTask => focusedTask.removeAttribute('focus'));

        task.setAttribute('focus', '');
        this.ensureVisible(task);
    }

    /**
     * Sets whether the element can be focused.
     */
    _setFocusable() {
        const that = this,
            container = that.$.container,
            unfocusable = that.disabled || that.unfocusable;
        let elements = [
            that.$.customizeButton, that.$.filterButton, that.$.sortButton, that.$.searchButton,
            that.$.searchPrev, that.$.searchNext, that.$.searchClose,
            that._actionsList, that._userList
        ];

        elements = elements.concat(Array.from(
            container.querySelectorAll('.lw-kanban-column-header, .lw-kanban-column-header-add, .lw-kanban-tab, .lw-kanban-column-content-tasks, .lw-kanban-task-user, .lw-kanban-task-actions, .lw-kanban-task-comments')));

        elements.forEach(element => {
            if (unfocusable) {
                element.removeAttribute('tabindex');
            }
            else if (element.getAttribute('tabindex') === null || element.getAttribute('tabindex') < 0) {
                element.setAttribute('tabindex', 0);
            }
        });

        if (that._dialog && that._dialog.editPanelPopulated) {
            const nativeElements = Array.from(that._dialog.$.container.querySelectorAll('.text-editor, .new-subtask'));

            if (unfocusable) {
                nativeElements.forEach(element => element.tabIndex = -1);
            }
            else {
                nativeElements.forEach(element => element.removeAttribute('tabindex'));
            }

            Array.from(that._dialog.$.container.querySelectorAll('.lw-element.editor, lw-button.add, lw-button.ok, lw-button.cancel')).forEach(element => element.unfocusable = unfocusable);
            that._dialog.unfocusable = unfocusable;
        }
    }

    /**
     * Starts dragging operation
     */
    _startDragging(pressedTask, event) {
        const that = this;

        if (!that._currentUser.allowDrag) {
            return;
        }

        const scrollViewer = pressedTask.closest('lw-scroll-viewer'),
            rect = pressedTask.getBoundingClientRect();
        let items = pressedTask.hasAttribute('selected') ? Array.from(pressedTask.parentElement.querySelectorAll('[selected]')) : [pressedTask];

        that._dragDetails = {
            StartPosition: { left: event.pageX, top: event.pageY },
            Items: items,
            Item: pressedTask,
            FeedbackShown: false,
            OriginalEvent: event,
            PointerOffset: [rect.x - event.clientX, rect.y - event.clientY],
            ScrollViewer: scrollViewer,
            StartTime: new Date(),
            Dragging: true
        };

        LW.Kanban.kanbanTaskDragged = true;
        scrollViewer._scrollView.disableSwipeScroll = true;

        if (that.allowDrop) {
            LW.Kanban.hoveredKanban = that;
            LW.Kanban.hoveredItem = pressedTask;
        }
    }

    /**
     * document move handler.
     */
    _documentMoveHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;

        function clear() {
            delete that._dragDetails;
            delete LW.Kanban.kanbanTaskDragged;
            delete LW.Kanban.hoveredKanban;
            delete LW.Kanban.hoveredItem;
            dragDetails.ScrollViewer._scrollView.disableSwipeScroll = false;
        }

        if (!dragDetails) {
            return;
        }

        if (!dragDetails.FeedbackShown) {
            const now = new Date(),
                timePassed = now.getTime() - dragDetails.StartTime.getTime() > 500,
                moved = Math.abs(dragDetails.StartPosition.left - event.pageX) > 5 ||
                    Math.abs(dragDetails.StartPosition.top - event.pageY) > 5;

            if (moved && (!that._isMobile || that._isMobile && timePassed)) {
                const dragStartEvent = that.$.fireEvent('dragStart', {
                    'item': dragDetails.Item,
                    'items': dragDetails.Items,
                    'data': dragDetails,
                    'container': that,
                    'previousContainer': that,
                    'originalEvent': dragDetails.OriginalEvent
                });

                if (dragStartEvent.defaultPrevented) {
                    clear();
                    return;
                }

                that.closePanel();
                that._hideBodyOverflow();
                dragDetails.Feedback = that._addDragFeedback();
                dragDetails.FeedbackShown = true;
                dragDetails.Items.forEach(item => item.classList.add('dragged'));
            }
            else {
                if (that._isMobile && moved && !timePassed) {
                    clear();
                }

                return;
            }
        }

        let dragOffset = that.dragOffset,
            realTarget;

        dragOffset = dragOffset === 'auto' || !Array.isArray(dragOffset) ? dragDetails.PointerOffset : dragOffset;

        that.$.fireEvent('dragging', {
            'item': dragDetails.Item,
            'items': dragDetails.Items,
            'data': dragDetails,
            'originalEvent': event
        });

        dragDetails.Feedback.style.left = (event.pageX + (dragOffset[0] || 0)) + 'px';
        dragDetails.Feedback.style.top = (event.pageY + (dragOffset[1] || 0)) + 'px';

        if (LW.Kanban.hoveredKanban) {
            clearInterval(LW.Kanban.hoveredKanban._dragInterval);
            delete LW.Kanban.hoveredKanban;
        }

        if (LW.Kanban.hoveredItem) {
            LW.Kanban.hoveredItem.classList.remove('drop-target');
            LW.Kanban.hoveredItem.classList.remove('before', 'after');
            delete LW.Kanban.hoveredItem;
        }

        if (that._isMobile) {
            realTarget = (that.shadowRoot || that.getRootNode()).elementFromPoint(event.clientX, event.clientY);
        }
        else {
            realTarget = that.isInShadowDOM || that.shadowRoot ? event.originalEvent.composedPath()[0] : event.originalEvent.target;
        }

        if (!realTarget) {
            return;
        }

        const hoveredKanban = (that.shadowRoot ? realTarget.getRootNode().host : realTarget).closest('lw-kanban');

        if (!hoveredKanban || !hoveredKanban.allowDrop) {
            return;
        }

        const hoveredScrollViewer = realTarget.closest('.lw-kanban-column-content-tasks');

        LW.Kanban.hoveredKanban = hoveredKanban;

        if (!hoveredScrollViewer) {
            return;
        }

        const orientation = hoveredScrollViewer.parentElement.parentElement.getAttribute('orientation'),
            siblingTasks = Array.from(hoveredScrollViewer.$.content.children);
        let numberOfFiteredOut = 0;

        siblingTasks.forEach(sibling => sibling.filteredOut && numberOfFiteredOut++);

        if (siblingTasks.length === 0 || siblingTasks.length === numberOfFiteredOut) {
            LW.Kanban.hoveredItem = hoveredScrollViewer.$.scrollViewerContainer;
            LW.Kanban.hoveredItem.classList.add('drop-target');
            return;
        }

        if (hoveredScrollViewer.scrollHeight > 0) {
            hoveredKanban._dragInterval = setInterval(function () {
                const rect = hoveredScrollViewer.getBoundingClientRect();

                if (rect.left <= event.clientX && rect.left + rect.width >= event.clientX) {
                    if (event.clientY >= rect.top && event.clientY <= rect.top + 20) {
                        hoveredScrollViewer.scrollTop -= that._autoScrollCoefficient;
                    }
                    else if (event.clientY >= rect.top + rect.height - 20 && event.clientY <= rect.top + rect.height) {
                        hoveredScrollViewer.scrollTop += that._autoScrollCoefficient;
                    }
                    else {
                        clearInterval(hoveredKanban._dragInterval);
                    }
                }
                else {
                    clearInterval(hoveredKanban._dragInterval);
                }
            }, 2);
        }

        let hoveredItem = realTarget.closest('.lw-kanban-task');

        if (!hoveredItem || dragDetails.Items.indexOf(hoveredItem) !== -1) {
            if (hoveredItem && siblingTasks.length === 1) {
                return;
            }

            if (hoveredItem && dragDetails.Items.length === 1) {
                hoveredItem = that[`_${orientation}ClosestTaskToHover`](
                    [hoveredItem.previousElementSibling, hoveredItem.nextElementSibling], event, true
                );
            }
            else {
                hoveredItem = that[`_${orientation}ClosestTaskToHover`](
                    siblingTasks, event, hoveredItem || realTarget === hoveredScrollViewer.$.content
                );
            }
        }
        else {
            const hoveredItemRect = hoveredItem.getBoundingClientRect();

            if (orientation === 'vertical' && event.clientY - hoveredItemRect.top <= hoveredItemRect.height / 2 ||
                orientation === 'horizontal' && event.clientX - hoveredItemRect.left <= hoveredItemRect.width / 2) {
                hoveredItem.classList.add('before');
            }
            else {
                hoveredItem.classList.add('after');
            }
        }

        if (hoveredItem) {
            hoveredItem.classList.add('drop-target');
            LW.Kanban.hoveredItem = hoveredItem;
        }
    }

    /**
     * Hides body overflow.
     */
    _hideBodyOverflow() {
        const that = this,
            isVerticalScrollable = (document.scrollingElement || document.documentElement).scrollHeight > document.documentElement.clientHeight,
            isHorizontalScrollable = (document.scrollingElement || document.documentElement).scrollWidth > document.documentElement.clientWidth;

        const body = that.isInShadowDOM ? that.getRootNode().host : document.body;
        that._originalBodyOverflow = { overflowX: body.style.overflowX, overflowY: body.style.overflowY, overflow: body.style.overflow };

        body.classList.add('lw-dragging');
        body.style.overflow = body.style.overflowX = body.style.overflowY = '';

        if (isVerticalScrollable && !isHorizontalScrollable) {
            body.style.overflowX = 'hidden';
        }
        else if (isHorizontalScrollable && !isVerticalScrollable) {
            body.style.overflowY = 'hidden';
        }
        else if (!isHorizontalScrollable && !isVerticalScrollable) {
            body.style.overflow = 'hidden';
        }
    }

    /**
     * Gets the closest task to hover (vertical orientation).
     */
    _verticalClosestTaskToHover(tasks, event, fromTop) {
        const draggedTasks = this._dragDetails.Items,
            clientY = event.clientY;
        let shortestDistance = Infinity,
            from = 0,
            to = tasks.length - 1,
            increaseBy = 1,
            nearestTask, className;

        if (!fromTop) {
            from = to;
            to = 0;
            increaseBy = -1;
        }

        while (from !== to + increaseBy) {
            const currentTask = tasks[from];

            from += increaseBy;

            if (!currentTask || currentTask.filteredOut || draggedTasks.indexOf(currentTask) !== -1) {
                continue;
            }

            if (!fromTop) {
                nearestTask = currentTask;
                className = 'after';
                break;
            }

            const rect = currentTask.getBoundingClientRect(),
                rectInfo = rect.top + rect.height / 2,
                currentDistance = Math.abs(clientY - rectInfo);

            if (currentDistance < shortestDistance) {
                shortestDistance = currentDistance;
                nearestTask = currentTask;
                className = clientY <= rectInfo ? 'before' : 'after';
            }
            else {
                break;
            }
        }

        if (nearestTask) {
            nearestTask.classList.add(className);
        }

        return nearestTask;
    }

    /**
     * Gets the closest task to hover (horizontal orientation).
     */
    _horizontalClosestTaskToHover(tasks, event) {
        const draggedTasks = this._dragDetails.Items,
            y = event.clientY,
            x = event.clientX;
        let closest, closestDistance, side;

        tasks.forEach(currentTask => {
            if (!currentTask || currentTask.filteredOut || draggedTasks.indexOf(currentTask) !== -1) {
                return;
            }

            const rect = currentTask.getBoundingClientRect(),
                topDistance = Math.abs(y - rect.top),
                bottomDisatnce = Math.abs(y - rect.bottom),
                bestVerticalDistance = Math.min(topDistance, bottomDisatnce),
                leftDistance = Math.abs(x - rect.left),
                rightDistance = Math.abs(x - rect.right),
                bestHorizontalDistance = Math.min(leftDistance, rightDistance),
                overallDistance = Math.sqrt(Math.pow(bestHorizontalDistance, 2) + Math.pow(bestVerticalDistance, 2));

            if (closestDistance === undefined || overallDistance < closestDistance) {
                closest = currentTask;
                closestDistance = overallDistance;
                side = leftDistance < rightDistance ? 'before' : 'after';
            }
        });

        if (closest) {
            closest.classList.add(side);
        }

        return closest;
    }

    /**
     * ScrollViewer touchmove handler.
     */
    _scrollViewerTouchmoveHandler(event) {
        const that = this;

        if (!that._dragDetails) {
            return;
        }

        const target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target;

        if (target.closest('lw-scroll-viewer') && event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Document up handler.
     */
    _documentUpHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;

        if (that.$.container.hasAttribute('modal')) {
            return;
        }

        const target = that.isInShadowDOM || that.shadowRoot ? event.originalEvent.composedPath()[0] : event.originalEvent.target,
            header = that.$.header;

        if (that._userSelectionFor && !that._userList.contains(target)) {
            that._closeList(that._userList, '_userSelectionFor');
        }

        if (that._actionSelectionFor && !that._actionsList.contains(target)) {
            that._closeList(that._actionsList, '_actionSelectionFor');
        }

        if (that._commentSelectionFor) {
            const commentsList = that._commentsList;

            if ((that.shadowRoot || that.getRootNode()).activeElement !== commentsList.textarea) {
                if (!that._actionSelectionFor && !commentsList.contains(target)) {
                    that._closeList(commentsList, '_commentSelectionFor');
                }
                else if (commentsList.classList.contains('expanded') && target !== commentsList.textarea &&
                    !commentsList.button.contains(target) && !target.classList.contains('remove-button')) {
                    commentsList.classList.remove('expanded');
                }
            }
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

        if (!dragDetails) {
            return;
        }

        const targetKanban = LW.Kanban.hoveredKanban,
            targetItem = LW.Kanban.hoveredItem;

        delete that._dragDetails;
        delete LW.Kanban.kanbanTaskDragged;
        delete LW.Kanban.hoveredKanban;
        delete LW.Kanban.hoveredItem;
        dragDetails.ScrollViewer._scrollView.disableSwipeScroll = false;

        if (!dragDetails.FeedbackShown) {
            return;
        }

        const dropTarget = targetKanban || (that.shadowRoot || that.getRootNode()).elementFromPoint(event.clientX, event.clientY);

        that._preventSelection = true;

        const body = that.isInShadowDOM ? that.getRootNode().host : document.body;

        body.classList.remove('lw-dragging');
        body.style.overflow = that._originalBodyOverflow.overflow;
        body.style.eoverflowX = that._originalBodyOverflow.overflowX;
        body.style.overflowY = that._originalBodyOverflow.overflowY;
        delete that._originalBodyOverflow;

        dragDetails.Feedback.remove();

        if (targetKanban) {
            clearInterval(targetKanban._dragInterval);
        }

        const draggedItem = dragDetails.Item,
            draggedItems = dragDetails.Items;

        draggedItems.forEach(item => item.classList.remove('dragged'));

        if (!dropTarget) {
            return;
        }

        if (!targetItem) {
            // drops item somewhere in the DOM
            that.$.fireEvent('dragEnd', {
                'item': draggedItem,
                'items': draggedItems,
                'target': dropTarget,
                'data': dragDetails,
                'previousContainer': that,
                'container': dropTarget,
                'originalEvent': event
            });
            return;
        }

        if (!(targetKanban && targetKanban.allowDrop && !targetKanban.disabled)) {
            return;
        }

        let dropAfter = false;

        targetItem.classList.remove('drop-target');

        if (targetItem.classList.contains('before')) {
            targetItem.classList.remove('before');
        }
        else if (targetItem.classList.contains('after')) {
            targetItem.classList.remove('after');
            dropAfter = true;
        }

        dragDetails.DropDetails = { item: targetItem, after: dropAfter };

        const dragEndEvent = that.$.fireEvent('dragEnd', {
            'item': draggedItem,
            'items': draggedItems,
            'target': targetItem,
            'data': dragDetails,
            'previousContainer': that,
            'container': targetKanban,
            'originalEvent': event
        });

        if (dragEndEvent.defaultPrevented) {
            return;
        }

        that._moveDraggedItems(dragDetails);
    }

    /**
     * Adds drag feedback.
     */
    _addDragFeedback() {
        const that = this,
            draggedItem = that._dragDetails.Item,
            numberOfDraggedItems = that._dragDetails.Items.length,
            feedback = document.createElement('div'),
            clone = draggedItem.cloneNode(true),
            width = draggedItem.offsetWidth + 'px',
            height = draggedItem.offsetHeight + 'px';

        clone.style.width = width;
        clone.style.height = height;

        feedback.className = 'lw-kanban-feedback';
        feedback.setAttribute('parent-kanban-id', that.id);

        if (that.theme) {
            feedback.setAttribute('theme', that.theme);
        }

        ['rightToLeft', 'taskActions', 'taskComments', 'taskDue', 'taskPriority', 'taskProgress', 'taskTags', 'taskUserIcon'].forEach(propertyName => {
            if (that[propertyName]) {
                feedback.setAttribute(LW.Utilities.Core.toDash(propertyName), '');
            }
        });

        feedback.appendChild(clone);

        if (numberOfDraggedItems > 1) {
            const additionalTask = document.createElement('div');

            additionalTask.style.width = width;
            additionalTask.style.height = height;
            additionalTask.className = 'lw-kanban-feedback-additional';
            feedback.insertBefore(additionalTask, clone);
            clone.setAttribute('num', numberOfDraggedItems);

            if (numberOfDraggedItems > 2) {
                additionalTask.classList.add('multiple');
            }
        }

        that.getShadowRootOrBody().appendChild(feedback);
        return feedback;
    }

    /**
     * Moves dragged items to new destination.
     */
    _moveDraggedItems(dragDetails) {
        const that = this;
        let dropDetails = dragDetails.DropDetails,
            dropTarget = dropDetails.item,
            dropColumn = dropTarget.closest('.lw-kanban-column'),
            originScrollViewer = dragDetails.Item.closest('lw-scroll-viewer'),
            columnObject = dropColumn.column;
        let dropParent;

        if (dropTarget.classList.contains('lw-kanban-task')) {
            dropParent = dropTarget.parentElement;

            if (dropDetails.after) {
                dropTarget = dropTarget.nextElementSibling;
            }

            dragDetails.Items.forEach(task => {
                dropParent.insertBefore(task, dropTarget);
                task.data.status = columnObject.dataField;
            });
        }
        else {
            dropParent = dropTarget.firstElementChild;
            dragDetails.Items.forEach(task => {
                dropParent.appendChild(task);
                task.data.status = columnObject.dataField;
            });
        }

        dropParent = dropParent.closest('lw-scroll-viewer');

        if (that.swimlanes.length > 0) {
            const dropSwimlane = dropParent.getAttribute('swimlane');

            if (dropSwimlane) {
                dragDetails.Items.forEach(task => task.data.swimlane = dropSwimlane);
            }
            else {
                dragDetails.Items.forEach(task => delete task.data.swimlane);
            }
        }

        that._focusTask(dragDetails.Item);

        if (originScrollViewer !== dropParent) {
            dropParent.focus();

            if (that.textTemplate) {
                dragDetails.Items.forEach(task => that._renderTask(task));
            }

            if (dragDetails.Item.hasAttribute('selected')) {
                dragDetails.Items.forEach(task => task.removeAttribute('selected'));
                that._selectedTasks = [];
                that._autoSaveState('selection');
            }

            that._refreshScrollViewer(originScrollViewer, true);
            that._refreshScrollViewer(dropParent, true);
        }

        that._autoSaveState('dataSource');
    }

    /**
     * Gets the current data source - after user interaction.
     */
    _getCurrentDataSource() {
        const allTasks = Array.from(this.$.container.getElementsByClassName('lw-kanban-task')),
            currentDataSource = [];

        for (let i = 0; i < allTasks.length; i++) {
            currentDataSource.push(allTasks[i].data);
        }

        return currentDataSource;
    }

    /**
     * Validates the "task" argument in public methods.
     */
    _validateTaskArgument(task) {
        const that = this;

        if (task instanceof HTMLElement && that.$.container.contains(task) && task.classList.contains('lw-kanban-task')) {
            return task;
        }
        else if (task !== null && (typeof task === 'number' || typeof task === 'string')) {
            return that.$.container.querySelector(`.lw-kanban-task[data-id="${task}"]`);
        }
    }

    /**
     * Opens dialog.
     */
    _openDialog(taskOrComment, purpose, type = 'task') {
        const that = this,
            openingEventDetail = { purpose: purpose };

        openingEventDetail[type] = taskOrComment;

        const openingEvent = that.$.fireEvent('opening', openingEventDetail);

        if (openingEvent.defaultPrevented) {
            return;
        }

        if (!that._dialog) {
            that._createDialog();
        }

        const dialog = that._dialog,
            isPrompt = purpose === 'prompt';

        dialog.openedFrom = (that.shadowRoot || that.getRootNode()).activeElement;
        dialog.classList.toggle('prompt', isPrompt);
        dialog.classList.toggle('edit', !isPrompt);
        dialog.taskOrComment = taskOrComment;

        if (isPrompt) {
            const text = type === 'task' ?
                that.localize('promptTask', { taskText: taskOrComment.data.text }) : that.localize('promptComment');

            dialog.setAttribute('aria-label', text);
            dialog.headerPosition = 'none';
            dialog.$.container.querySelector('.prompt').innerHTML = text;
        }
        else {
            dialog.removeAttribute('aria-label');
            dialog.headerPosition = 'top';
            dialog.label = that.localize('editTask', { taskId: taskOrComment.id });

            if (!dialog.editPanelPopulated) {
                that._populateEditPanel();
            }

            that._beginEdit(taskOrComment);
        }

        that.$.container.setAttribute('modal', '');

        dialog.open();
    }

    /**
     * Creates dialog.
     */
    _createDialog() {
        const that = this,
            dialog = document.createElement('lw-window'),
            footerTemplate = document.createElement('template');

        footerTemplate.innerHTML = `<lw-button class="ok primary"${that._rtlAttr}>${that.localize('ok')}</lw-button>
<lw-button class="cancel"${that._rtlAttr}>${that.localize('cancel')}</lw-button>`;

        dialog.animation = that.animation;
        dialog.footerTemplate = footerTemplate;
        dialog.headerButtons = ['close'];
        dialog.rightToLeft = that.rightToLeft;
        dialog.theme = that.theme;
        dialog.className = 'lw-kanban-window';
        dialog.innerHTML = `<div class="prompt"></div>
<div class="edit"></div>`;
        dialog.ownerElement = that;

        that._dialog = dialog;
        that._addDialogHandlers();
        that.getShadowRootOrBody().appendChild(dialog);
    }

    /**
     * Adds window handlers.
     */
    _addDialogHandlers() {
        const that = this,
            dialog = that._dialog;

        dialog.addEventListener('open', that._dialogEventHandler);
        dialog.addEventListener('closing', that._dialogEventHandler);
        dialog.addEventListener('close', that._dialogEventHandler);
        dialog.addEventListener('click', that._dialogClickHandler);
    }

    /**
     * Dialog event handler.
     */
    _dialogEventHandler(event) {
        const dialog = this,
            that = dialog.ownerElement,
            type = event.type,
            oldContext = that.context;

        if ((dialog.isInShadowDOM || dialog.shadowRoot ? event.composedPath()[0] : event.target) !== dialog) {
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
                delete dialog.ok;
            }
        }
        else if (type === 'close') {
            that.$.fireEvent('close');
            that._dialogCloseHandler(event);
        }

        that.context = oldContext;
    }

    /**
     * Dialog click handler.
     */
    _dialogClickHandler(event) {
        const dialog = this,
            target = dialog.isInShadowDOM || dialog.shadowRoot ? event.composedPath()[0] : event.target;

        if (target.closest('.ok')) {
            dialog.ok = true;
            dialog.close();
        }
        else if (target.closest('.cancel')) {
            dialog.close();
        }
        else if (target.closest('.add')) {
            const newTaskInput = dialog.editors.newSubtask,
                newTaskLabel = newTaskInput.value;

            if (newTaskLabel === '') {
                return;
            }

            const listBox = dialog.editors.checklist;

            listBox.insert(listBox.items.length, { label: newTaskLabel });
            newTaskInput.value = '';
            dialog.$.content.scrollTop = dialog.$.content.scrollHeight - dialog.$.content.offsetHeight;
        }
        else if (target.classList.contains('remove-subtask')) {
            dialog.editors.checklist.removeChild(target.closest('lw-list-item'));
        }
    }

    /**
     * Edit window close handler.
     */
    _dialogCloseHandler() {
        const that = this,
            dialog = that._dialog;

        that.$.container.removeAttribute('modal');

        if (dialog.ok) {
            // OK
            if (dialog.classList.contains('prompt')) {
                const commentParentTask = that._commentSelectionFor;

                if (commentParentTask) {
                    const data = commentParentTask.data;

                    data.comments = data.comments.filter(comment => comment !== dialog.taskOrComment.comment);
                    dialog.taskOrComment.remove();
                    commentParentTask.querySelector('.lw-kanban-task-comments').setAttribute('num', data.comments.length || '');

                    if (that._commentsList.editing) {
                        that._commentsList.textarea.value = '';
                        delete that._commentsList.editing;
                    }
                }
                else {
                    that.removeTask(dialog.taskOrComment);
                }
            }
            else {
                that._endEdit();
            }

            delete dialog.ok;
        }

        if (dialog.openedFrom) {
            requestAnimationFrame(() => {
                if (that.getRootNode().contains(dialog.openedFrom) && dialog.openedFrom.focus) {
                    dialog.openedFrom.focus();
                }

                delete dialog.openedFrom;
            });
        }

        delete dialog.taskOrComment;
    }

    /**
     * Closes the edit dialog.
     */
    _closeDialog() {
        const that = this;

        if (that._dialog) {
            that._dialog.close();
        }
    }

    /**
     * Populates edit panel.
     */
    _populateEditPanel() {
        const that = this,
            id = that.id,
            dialog = that._dialog,
            editPanel = dialog.$.container.querySelector('.edit'),
            asigneeSource = that.users.map(user => ({ label: user.name, value: user.id })),
            statusSource = that._allColumns.map(col => ({ label: col.label, value: col.dataField })),
            prioritySource = [{ label: that.localize('low'), value: 'low' }, { label: that.localize('normal'), value: 'normal' }, { label: that.localize('high'), value: 'high' }],
            swimLanesSource = that.swimlanes.map(swimlane => ({ label: swimlane.label, value: swimlane.dataField })),
            checklistTemplate = document.createElement('template'),
            sync = ` animation="${that.animation}"${that._rtlAttr} theme="${that.theme}"${that.unfocusable ? ' unfocusable' : ''}`;

        checklistTemplate.innerHTML = `<div class="lw-kanban-sub-task"><span class="label">{{label}}</span><span class="remove-subtask" aria-label="Remove subtask" title="${that.localize('removeSubtask')}"></span></div>`;
        checklistTemplate.id = that.id + 'ChecklistTemplate';
        dialog.$.container.appendChild(checklistTemplate);

        editPanel.innerHTML = `<div id="${id}LabelText" class="editor-label">${that.localize('text')}</div>
<textarea class="editor text-editor" aria-labelledby="${id}LabelText"></textarea>
<div id="${id}LabelTags" class="editor-label">${that.localize('tags')}</div>
<lw-combo-box class="editor tags-editor" selection-mode="zeroOrMany" selection-display-mode="tokens"${sync} aria-labelledby="${id}LabelTags"></lw-combo-box>
<div class="editor-container">
    <div id="${id}LabelStatus" class="editor-label">${that.localize('status')}</div>
    <div id="${id}LabelSwimlane" class="editor-label">${that.localize('swimlane')}</div>
    <lw-input class="editor status-editor" data-source='${JSON.stringify(statusSource)}' drop-down-button-position="right" readonly${sync} aria-labelledby="${id}LabelStatus"></lw-input>
    <lw-input class="editor swimlane-editor" data-source='${JSON.stringify(swimLanesSource)}'${swimLanesSource.length === 0 ? ' disabled' : ''} drop-down-button-position="right" readonly${sync} aria-labelledby="${id}LabelSwimlane"></lw-input>
</div>
<div class="editor-container">
    <div id="${id}LabelAssignedTo" class="editor-label">${that.localize('assignedTo')}</div>
    <div id="${id}LabelProgress" class="editor-label">${that.localize('progress')}</div>
    <lw-input class="editor asignee-editor" data-source='${JSON.stringify(asigneeSource)}'${asigneeSource.length === 0 ? ' disabled' : ''} drop-down-button-position="right"${sync} aria-labelledby="${id}LabelAssignedTo"></lw-input>
    <lw-numeric-text-box class="editor progress-editor" input-format="floatingPoint" min="0" max="100" show-unit unit="%"${sync} aria-labelledby="${id}LabelProgress"></lw-numeric-text-box>
</div>
<div class="editor-container">
    <div id="${id}LabelStartDate" class="editor-label">${that.localize('startDate')}</div>
    <div id="${id}LabelDueDate" class="editor-label">${that.localize('dueDate')}</div>
    <lw-date-time-picker class="editor start-date-editor" calendar-button drop-down-append-to="body" drop-down-display-mode="calendar" format-string="${that.formatStringDate}" nullable${sync} aria-labelledby="${id}LabelStartDate"></lw-date-time-picker>
    <lw-date-time-picker class="editor due-date-editor" calendar-button drop-down-append-to="body" drop-down-display-mode="calendar" format-string="${that.formatStringDate}" nullable${sync} aria-labelledby="${id}LabelDueDate"></lw-date-time-picker>
</div>
<div class="editor-container">
    <div id="${id}LabelPriority" class="editor-label">${that.localize('priority')}</div>
    <div id="${id}LabelColor" class="editor-label">${that.localize('color')}</div>
    <lw-input class="editor priority-editor" data-source='${JSON.stringify(prioritySource)}' drop-down-button-position="right" readonly${sync} aria-labelledby="${id}LabelPriority"></lw-input>
    <lw-color-input class="editor color-editor" drop-down-button-position="right"${sync} aria-labelledby="${id}LabelColor"></lw-color-input>
</div>
<div id="${id}LabelChecklist" class="editor-label">${that.localize('checklist')}</div>
<div class="new-container">
    <input type="text" class="new-subtask" placeholder="${that.localize('newSubtask')}" />
    <lw-button class="add primary" title="${that.localize('addSubtask')}" aria-label="Add subtask"${sync}>+</lw-button>
</div>
<lw-list-box class="editor checklist-editor" item-template="${checklistTemplate.id}" selection-mode="checkBox"${sync} aria-labelledby="${id}LabelChecklist"></lw-list-box>`;

        dialog.editors = {
            text: editPanel.querySelector('.text-editor'),
            tags: editPanel.querySelector('.tags-editor'),
            userId: editPanel.querySelector('.asignee-editor'),
            status: editPanel.querySelector('.status-editor'),
            swimlane: editPanel.querySelector('.swimlane-editor'),
            startDate: editPanel.querySelector('.start-date-editor'),
            dueDate: editPanel.querySelector('.due-date-editor'),
            progress: editPanel.querySelector('.progress-editor'),
            priority: editPanel.querySelector('.priority-editor'),
            color: editPanel.querySelector('.color-editor'),
            newSubtask: editPanel.querySelector('.new-subtask'),
            checklist: editPanel.querySelector('.checklist-editor')
        }

        dialog.editPanelPopulated = true;
    }

    /**
     * Begins an edit operation.
     */
    _beginEdit(task) {
        const that = this,
            data = task.data,
            dialog = that._dialog,
            editors = dialog.editors,
            tagsDataSource = that.tags.length > 0 ? that.tags : that._customTags,
            column = that._allColumns.find(col => col.dataField === data.status);

        dialog.label = that.localize('editTask', { taskId: data.id });

        editors.text.value = data.text;
        editors.tags.dataSource = tagsDataSource;
        editors.tags.disabled = tagsDataSource.length === 0;

        if (data.tags) {
            editors.tags.selectedValues = data.tags.replace(/\s+/g, '').split(',');
        }
        else {
            editors.tags.selectedValues = [];
        }

        editors.userId.value = data.userId !== null ? that.users.find(user => user.id === data.userId).name : '';
        delete editors.userId.$.input.dataValue;
        editors.status.value = column.label;
        delete editors.status.$.input.dataValue;

        if (that._hasSwimlane(that.columns.indexOf(column))) {
            editors.swimlane.value = that.swimlanes.find(swimlane => swimlane.dataField === data.swimlane).label;
        }
        else {
            editors.swimlane.value = '';
        }

        delete editors.swimlane.$.input.dataValue;

        editors.startDate.value = data.startDate || null;
        editors.dueDate.value = data.dueDate || null;
        editors.progress.value = parseFloat(data.progress) || 0;
        editors.priority.value = that.localize(data.priority);
        delete editors.priority.$.input.dataValue;
        editors.color.value = data.color || '';

        const selectedSubtasks = [],
            subtaskDataSource = [];

        (data.checklist || []).forEach((subtask, index) => {
            if (subtask.completed) {
                selectedSubtasks.push(index);
            }

            subtaskDataSource.push({ label: subtask.text, selected: subtask.completed === true });
        });

        editors.newSubtask.value = '';
        editors.checklist.dataSource = subtaskDataSource;
        editors.checklist.selectedIndexes = selectedSubtasks;
    }

    /**
     * Ends the current edit operation and saves changes.
     */
    _endEdit() {
        const that = this,
            dialog = that._dialog,
            editors = dialog.editors,
            task = dialog.taskOrComment,
            oldData = task.data,
            newData = Object.assign({}, oldData);
        let newStartDate = editors.startDate.value,
            newDueDate = editors.dueDate.value;

        newData.text = editors.text.value;
        newData.tags = editors.tags.selectedValues.join(', ');
        newData.progress = parseFloat(editors.progress.value);
        newData.color = editors.color.value;

        if (!newData.color) {
            delete newData.color;
        }

        if (editors.userId.$.input.dataValue !== undefined) {
            newData.userId = parseFloat(editors.userId.$.input.dataValue);
        }

        if (editors.status.$.input.dataValue) {
            newData.status = editors.status.$.input.dataValue;
        }

        if (editors.swimlane.$.input.dataValue) {
            newData.swimlane = editors.swimlane.$.input.dataValue;
        }

        if (newStartDate) {
            newStartDate = newStartDate.toDate();
        }

        if (newDueDate) {
            newDueDate = newDueDate.toDate();
        }

        newData.startDate = newStartDate;
        newData.dueDate = newDueDate;

        if (editors.priority.$.input.dataValue) {
            newData.priority = editors.priority.$.input.dataValue;
        }

        newData.checklist = editors.checklist.items.map(item => ({ text: item.label, completed: item.selected }));

        that.updateTask(task, newData);
    }

    /**
     * Gets the current user and their privileges.
     */
    _getCurrentUser() {
        const that = this,
            users = that.users;
        let currentUser = that.currentUser,
            allowAdd = true,
            allowComment = false,
            allowDrag = that.allowDrag,
            allowEdit = that.editable,
            allowRemove = true;

        if (users && currentUser !== null) {
            currentUser = users.find(user => user.id === currentUser);

            if (currentUser) {
                allowAdd = currentUser.allowAdd !== false;
                allowComment = currentUser.allowComment !== false;
                allowDrag = allowDrag && currentUser.allowDrag !== false;
                allowEdit = allowEdit && currentUser.allowEdit !== false;
                allowRemove = currentUser.allowRemove !== false;
            }
        }

        that._currentUser = {
            allowAdd: allowAdd,
            allowComment: allowComment,
            allowDrag: allowDrag,
            allowEdit: allowEdit,
            allowRemove: allowRemove,
            info: currentUser
        }
    }

    /**
     * Automatically saves the Kanban's state.
     */
    _autoSaveState(toUpdate) {
        const that = this;

        if (!that.autoSaveState) {
            return;
        }

        if (typeof toUpdate === 'object') {
            that._autoSavedState = toUpdate;
            return;
        }

        if (!toUpdate || !that._autoSavedState) {
            that._autoSavedState = that.saveState();
            return;
        }

        switch (toUpdate) {
            case 'collapsed': {
                that._allColumns.forEach(column => that._autoSavedState.collapsed[column.dataField] = column.collapsed);
                break;
            }
            case 'dataSource':
                that._autoSavedState.dataSource = that._getCurrentDataSource()
                break;
            case 'filtering':
                that._autoSavedState.filtering = that._appliedFiltering;
                break;
            case 'selection': {
                let selectionInColumn = null,
                    swimlane = null;

                if (that._selectionInView) {
                    selectionInColumn = that._selectionInView.closest('.lw-kanban-column').column.dataField;
                    swimlane = that._selectionInView.getAttribute('swimlane');
                }

                that._autoSavedState.selection = {
                    selected: that._selectedTasks.map(task => task.data.id),
                    selectionStart: that._selectionStart ? that._selectionStart.data.id : null,
                    selectionInColumn: selectionInColumn,
                    swimlane: swimlane
                };
                break;
            }
            case 'sorting':
                that._autoSaveState.sorting = that._appliedSorting;
                break;
            case 'tabs':
                that._autoSaveState.tabs = that._selectedTabs;
                break;
            case 'visibility':
                that._autoSavedState.visibility = {
                    taskActions: that.taskActions,
                    taskComments: that.taskComments,
                    taskDue: that.taskDue,
                    taskPriority: that.taskPriority,
                    taskProgress: that.taskProgress,
                    taskTags: that.taskTags,
                    taskUserIcon: that.taskUserIcon
                };
                break;
        }

        window.localStorage.setItem('lwKanban' + that.id, JSON.stringify(that._autoSavedState));
    }

    /**
     * Applies filtering.
     */
    _applyFilter(filters, operator) {
        const that = this,
            dataSource = new LW.DataAdapter({
                dataSource: that._getCurrentDataSource(),
                dataFields: [
                    'text: string',
                    'tags: string',
                    'priority: string',
                    'progress: number',
                    'startDate: date',
                    'dueDate: date',
                    'userId: string'
                ],
                id: 'id'
            });

        try {
            dataSource._filter(filters, operator);
        }
        catch (error) {
            return;
        }

        const allTasks = Array.from(that.$.container.getElementsByClassName('lw-kanban-task'));

        for (let i = 0; i < dataSource.length; i++) {
            const task = allTasks[i],
                filteredOut = !dataSource[i].$.filtered;

            task.classList.toggle('lw-hidden', filteredOut);
            task.filteredOut = filteredOut;
        }

        that._allColumns.forEach(column => that._refreshScrollViewer(column));

        that._autoSaveState('filtering');
    }

    /**
     * Header panels apply handler.
     */
    _applyHandler(event) {
        const that = this,
            target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target,
            detail = event.detail;

        if (that.$.customize.contains(target)) {
            detail.value.forEach(property => that[property.dataField] = property.visible);
            that._allColumns.forEach(column => that._refreshScrollViewer(column));
            that._autoSaveState('visibility');
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
     * Applies sorting.
     */
    _applySort() {
        const that = this,
            sortByInfo = that._appliedSorting;

        that._autoSaveState('sorting');

        if (sortByInfo.dataFields.length === 0) {
            return;
        }

        that._allColumns.forEach(column => {
            const columnElement = that._columnToElement.get(column),
                tasksParent = columnElement.querySelector('.lw-scroll-viewer-content-container'),
                siblingTasks = Array.from(tasksParent.children),
                data = [];

            if (siblingTasks.length < 2) {
                return;
            }

            siblingTasks.forEach((task, index) => {
                const dataPoint = Object.assign({ taskIndex: index }, task.data);

                if (dataPoint.priority === 'low') {
                    dataPoint.priority = 'z';
                }

                data.push(dataPoint);
            });

            const dataSource = new LW.DataAdapter({
                dataSource: data,
                dataFields: [
                    'taskIndex: number',
                    'text: string',
                    'tags: string',
                    'priority: string',
                    'progress: number',
                    'startDate: date',
                    'dueDate: date',
                    'userId: string'
                ],
                id: 'id'
            });

            dataSource.sortBy(sortByInfo.dataFields, sortByInfo.dataTypes, sortByInfo.orderBy);

            for (let i = 0; i < dataSource.length; i++) {
                tasksParent.appendChild(siblingTasks[dataSource[i].taskIndex]);
            }
        });
    }

    /**
     * Closes search panel.
     */
    _closeSearchPanel() {
        const that = this;

        if (that._searchInfo) {
            Array.from(that.$.container.querySelectorAll('.lw-kanban-task.lw-data-view-found, .lw-kanban-task.lw-data-view-highlighted'))
                .forEach(task => task.classList.remove('lw-data-view-found', 'lw-data-view-highlighted'));
            delete that._searchInfo;
        }
    }

    /**
     * Constructs FilterGroup object(s) from filtering information.
     */
    _constructFilterGroups(filterInfo) {
        const dataTypes = {
            text: 'string',
            tags: 'string',
            priority: 'string',
            progress: 'number',
            startDate: 'date',
            dueDate: 'date',
        },
            filterGroups = {},
            result = [];

        filterInfo.filters.forEach(filter => {
            const dataField = filter[0],
                dataType = dataTypes[dataField];
            let value = filter[2],
                filterGroup = filterGroups[dataField];

            if (filterGroup === undefined) {
                filterGroup = new LW.Utilities.FilterGroup();
                filterGroups[dataField] = filterGroup;
            }

            if (dataType === 'date' && typeof value === 'string') {
                value = new Date(value);
            }

            const filterObject = filterGroup.createFilter(dataType, value, filter[1]);

            filterGroup.addFilter(filterInfo.operator, filterObject);
        });

        for (let dataField in filterGroups) {
            result.push([dataField, filterGroups[dataField]]);
        }

        return result;
    }

    /**
     * Opens search panel.
     */
    _openSearchPanel() {
        const that = this;

        that.$.headerDropDown.classList.add('search-panel');
        that.$.headerDropDown.classList.remove('customize-panel', 'filter-panel', 'sort-panel');
        that.$.search.classList.remove('lw-hidden');
        that.$.customize.classList.add('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that._openHeaderDropDown(that.$.searchButton);

        that._searchInfo = {
            source: that._getCurrentDataSource(),
            stringDataFields: ['text', 'tags']
        }

        if (that.$.searchInput.value !== '') {
            that._search(that.$.searchInput.value, false);
        }
    }

    /**
     * Searches by a query.
     */
    _search(query, highlight = true) {
        const that = this;

        that._searchInfo.query = query;
        Array.from(that.$.container.querySelectorAll('.lw-kanban-task.lw-data-view-found, .lw-kanban-task.lw-data-view-highlighted'))
            .forEach(task => task.classList.remove('lw-data-view-found', 'lw-data-view-highlighted'));

        if (query === '') {
            that.$.search.classList.remove('matches', 'no-matches');
            delete that._searchInfo.foundIdsArray;
            delete that._searchInfo.foundIdsObject;
            delete that._searchInfo.highlighted;
            return;
        }

        const source = new LW.DataAdapter({
            dataSource: that._searchInfo.source,
            dataFields: [
                'text: string',
                'tags: string'],
            id: 'id'
        }),
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

        that._searchInfo.foundIdsArray = foundIdsArray;
        that._searchInfo.foundIdsObject = foundIdsObject;

        Array.from(that.$.container.getElementsByClassName('lw-kanban-task')).forEach(task => {
            const id = task.data.id;

            if (foundIdsObject[id]) {
                if (task.filteredOut) {
                    foundIdsArray.splice(foundIdsArray.indexOf(id), 1);
                    delete foundIdsObject[id];
                    return;
                }

                if (highlight && foundIdsArray[0] === id) {
                    task.classList.add('lw-data-view-highlighted');
                }

                task.classList.add('lw-data-view-found');
            }
        });

        if (foundIdsArray.length > 0) {
            if (highlight) {
                let highlighted = foundIdsArray[0];

                that._searchInfo.highlighted = highlighted;
                that.ensureVisible(highlighted);
            }

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
     * Kanban body focusin handler.
     */
    _bodyFocusinHandler(event) {
        const that = this;
        let target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target;

        if (!target.classList.contains('lw-kanban-column-content-tasks')) {
            return;
        }

        target = target.$.content;

        const focusedTask = that._getSelectedItem(target, true);

        if (!focusedTask) {
            that._focusTask(that._getFirstItem(target));
        }
    }

    /**
     * Gets "right-to-left" attribute if applicable.
     */
    get _rtlAttr() {
        return this.rightToLeft ? ' right-to-left' : '';
    }

    /**
     * Gets "tabindex" attribute if applicable.
     */
    get _tabindex() {
        const that = this;

        return that.disabled || that.unfocusable ? '' : ' tabindex="0"';
    }
});
