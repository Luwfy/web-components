
/**
 * lwGanttChart custom element
 */
LW('lw-gantt-chart', class GanttChart extends LW.ScrollViewer {

    // Gantt Chart's properties
    static get properties() {
        return {
            'autoSchedule': {
                value: false,
                type: 'boolean'
            },
            'autoScheduleStrictMode': {
                value: false,
                type: 'boolean'
            },
            'autoScrollStep': {
                value: 5,
                type: 'number'
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
                    'itemType': {
                        value: 'task',
                        type: 'string'
                    },
                    'includeHidden': {
                        value: false,
                        type: 'boolean'
                    },
                    'fileName': {
                        value: 'lwGanttChart',
                        type: 'string?'
                    },
                    'pageOrientation': {
                        value: 'portrait',
                        type: 'string'
                    },
                    'expandChar': {
                        value: '+',
                        type: 'string'
                    },
                    'collapseChar': {
                        value: '-',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'dataSource': {
                value: [],
                type: 'any',
                reflectToAttribute: false
            },
            'dayFormat': {
                value: 'short',
                allowedValues: ['2-digit', 'numeric', 'long', 'short', 'narrow'],
                type: 'string'
            },
            'dateEnd': {
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'dateStart': {
                value: '',
                type: 'any',
                validator: '_dateValidator'
            },
            'disableAutoScroll': {
                value: false,
                type: 'boolean'
            },
            'disableTaskDrag': {
                value: false,
                type: 'boolean'
            },
            'disableTaskProgressChange': {
                value: false,
                type: 'boolean'
            },
            'disableTaskResize': {
                value: false,
                type: 'boolean'
            },
            'disableSelection': {
                value: false,
                type: 'boolean'
            },
            'disableWindowEditor': {
                value: false,
                type: 'boolean'
            },
            'durationUnit': {
                value: 'milisecond',
                allowedValues: ['day', 'week', 'hour', 'minute', 'second', 'milisecond'],
                type: 'string'
            },
            'headerTemplate': {
                value: null,
                type: 'any'
            },
            'hourFormat': {
                value: 'default',
                allowedValues: ['default', '2-digit', 'numeric'],
                type: 'string'
            },
            'hideTimelineHeaderDetails': {
                value: false,
                type: 'boolean'
            },
            'hideResourcePanel': {
                value: false,
                type: 'boolean'
            },
            'inverted': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidValue': '{{elementType}}: Invalid {{property}} value. {{property}} should be of type {{typeOne}} or {{typeTwo}}.',
                        'incorrectArgument': '{{elementType}}: Incorrect argument {{argumentName}} in method {{methodName}}.',
                        'outOfBounds': '{{elementType}}: Out of bounds argument {{argumentName}} in method {{methodName}}.',
                        'missingReference': '{{elementType}}: Missing reference to {{file}} in method {{methodName}}.',
                        'noId': 'lwGanttChart requires an id in order to save/load/clear a state.',
                        'ok': 'Ok',
                        'cancel': 'Cancel',
                        'delete': 'Delete',
                        'confirm': '{{componentName}} will be deleted permanently, <b>are you sure? </b>',
                        'taskColumnLabel': 'Task Name',
                        'resourceColumnLabel': 'Resource Name',
                        'deleteLink': 'Delete link',
                        'unassigned': 'Unassigned'
                    }
                },
                type: 'object'
            },
            'monthFormat': {
                value: 'short',
                allowedValues: ['2-digit', 'numeric', 'long', 'short', 'narrow'],
                type: 'string'
            },
            'max': {
                value: new Date(2100, 0, 1),
                type: 'any',
                validator: '_dateValidator'
            },
            'min': {
                value: new Date(1900, 0, 1),
                type: 'any',
                validator: '_dateValidator'
            },
            'nonworkingDays': {
                value: [],
                type: 'array'
            },
            //NOTE: if type is 'any', by setting a number it could be possible to set the nonworking hours count instead of specific hours array
            'nonworkingHours': {
                value: [],
                type: 'array'
            },
            'popupWindowCustomizationFunction': {
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'progressLabelFormatFunction': {
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'resizeHandlesVisibility': {
                allowedValues: ['auto', 'hidden', 'visible'],
                value: 'auto',
                type: 'string'
            },
            'resourceColumns': {
                value: [{ label: 'resourceColumnLabel', value: 'label' }],
                type: 'array',
                reflectToAttribute: false
            },
            'resourcePanelHeaderTemplate': {
                value: null,
                type: 'any'
            },
            'resourcePanelMin': {
                value: 100,
                type: 'any'
            },
            'resourcePanelSize': {
                value: '',
                type: 'any'
            },
            'resourcePanelRefreshRate': {
                value: 0,
                reflectToAttribute: false,
                type: 'number'
            },
            'resourceTimelineFormatFunction': {
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'resourceTimelineMode': {
                allowedValues: ['diagram', 'histogram', 'custom'],
                value: 'diagram',
                type: 'string'
            },
            'resourceTimelineView': {
                allowedValues: ['hours', 'tasks', 'custom'],
                value: 'hours',
                type: 'string'
            },
            'selectedIndexes': {
                value: [],
                type: 'array'
            },
            'showProgressLabel': {
                value: false,
                type: 'boolean'
            },
            'snapToNearest': {
                value: false,
                type: 'boolean'
            },
            'sortable': {
                value: false,
                type: 'boolean'
            },
            'sortMode': {
                value: 'one',
                allowedValues: ['one', 'many'],
                type: 'string'
            },
            'taskColumns': {
                value: [{ label: 'taskColumnLabel', value: 'label' }],
                type: 'array',
                reflectToAttribute: false
            },
            'taskPanelMin': {
                value: 200,
                type: 'any'
            },
            'taskPanelSize': {
                value: '',
                type: 'any'
            },
            'timelineMin': {
                value: 200,
                type: 'any'
            },
            'treeMin': {
                value: 100,
                type: 'any'
            },
            'treeSize': {
                value: '20%',
                type: 'any'
            },
            'timelineHeaderFormatFunction': {
                value: null,
                reflectToAttribute: false,
                type: 'function?'
            },
            'verticalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'view': {
                value: 'year',
                //year shows months, month shows weeks, week shows days and day shows hours
                allowedValues: ['day', 'week', 'month', 'year', 'resource'],
                type: 'any'
            },
            'yearFormat': {
                value: 'numeric',
                allowedValues: ['2-digit', 'numeric'],
                type: 'string'
            },
            'weekFormat': {
                value: 'long',
                allowedValues: ['long', 'numeric'],
                type: 'string'
            }
        };
    }

    /**
    * GanntChart's template
    */
    template() {
        return `<div id="container" role="presentation">
                    <lw-splitter id="mainSplitter" auto-fit-mode="end" keep-proportions-on-resize right-to-left="[[rightToLeft]]" animation="[[animation]]" orientation="horizontal">
                        <lw-splitter-item id="taskSplitterItem" class="lw-task-splitter-item">
                            <div id="taskSplitterItemHeader" class="lw-task-panel-header"></div>
                            <lw-splitter id="taskSplitter" class="lw-task-splitter" auto-fit-mode="end" right-to-left="[[rightToLeft]]" animation="[[animation]]">
                                 <lw-splitter-item id="treeSplitterItem" min="[[treeMin]]">
                                    <lw-splitter id="taskTreeSplitter" auto-fit-mode="end" class="lw-tree-splitter" unfocusable right-to-left="[[rightToLeft]]" animation="[[animation]]">
                                        <lw-splitter-item id="taskTreeSplitterItem">
                                            <div class="lw-task-tree-header"></div>
                                            <div class="lw-task-tree-content">
                                                <lw-tree class="lw-hidden" id="taskTree" selection-mode="zeroOrOne" overflow="hidden" toggle-mode="arrow" animation="[[animation]]"
                                                    aria-controls="[[id]]" right-to-left="[[rightToLeft]]">
                                                </lw-tree>
                                            </div>
                                        </lw-splitter-item>
                                    <lw-splitter>
                                </lw-splitter-item>
                                <lw-splitter-item id="timelineSplitterItem" class="lw-timeline-splitter-item" min="[[timelineMin]]">
                                        <div id="timeline" class="lw-timeline">
                                            <div id="timelineContainer" class="lw-timeline-container" role="presentation">
                                                <div id="timelineHeader" class="lw-timeline-header" role="rowgroup">
                                                    <div class="lw-timeline-view-details" id="timelineViewDetails" role="row"></div>
                                                    <div class="lw-timeline-view-cells" id="timelineViewCells" role="row"></div>
                                                </div>
                                                <div id="timelineContent" class="lw-timeline-content">
                                                    <div id="taskTimelineCellsContainer" class="lw-timeline-cells-container" aria-hidden="true"></div>
                                                    <div id="timelineConnectionsContainer" class="lw-timeline-connections-container" role="group"></div>
                                                    <div id="timelineTasksContainer" class="lw-timeline-tasks-container" role="group"></div>
                                                </div>
                                                <div id="timelineAnimationContainer" class="lw-timeline-animation-container lw-visibility-hidden" aria-hidden="true">
                                                    <div class="lw-timeline-animation-inner-container">
                                                        <div><div></div><div></div></div><div><div></div><div></div></div><div><div></div><div></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <lw-scroll-bar id="verticalScrollBar" class="lw-timeline-scroll-bar" orientation="vertical"
                                                right-to-left="[[rightToLeft]]" aria-controls="[[id]]" animation="[[animation]]">
                                        </lw-scroll-bar>
                                </lw-splitter-item>
                            </lw-splitter>
                        </lw-splitter-item>
                        <lw-splitter-item id="resourceSplitterItem" class="lw-resource-splitter-item">
                            <div id="resourceSplitterItemHeader" class="lw-resource-panel-header"></div>
                            <lw-splitter id="resourceSplitter" class="lw-resource-splitter" auto-fit-mode="end" right-to-left="[[rightToLeft]]" animation="[[animation]]">
                                <lw-splitter-item id="resourceTreeItem" min="[[treeMin]]">
                                    <lw-splitter id="resourceTreeSplitter" class="lw-tree-splitter" auto-fit-mode="end" unfocusable right-to-left="[[rightToLeft]]" animation="[[animation]]">
                                        <lw-splitter-item id="resourceTreeSplitterItem">
                                            <div class="lw-resource-tree-header"></div>
                                            <div class="lw-resource-tree-content">
                                                <lw-tree class="lw-hidden" id="resourceTree" selection-mode="zeroOrOne" overflow="hidden" toggle-mode="arrow" animation="[[animation]]"
                                                    aria-controls="[[id]]" right-to-left="[[rightToLeft]]">
                                                </lw-tree>
                                            </div>
                                        </lw-splitter-item>
                                    </lw-splitter>
                                </lw-splitter-item>
                                <lw-splitter-item id="resourceTimelineSplitterItem" class="lw-timeline-splitter-item" min="[[timelineMin]]">
                                    <div id="resourceTimeline" class="lw-timeline">
                                        <div class="lw-timeline-container" role="presentation">
                                            <div id="resourceTimelineHeader" class="lw-timeline-header" role="rowgroup">
                                                <div class="lw-timeline-view-cells" id="resourceTimelineViewCells" role="row"></div>
                                            </div>
                                            <div id="resourceTimelineContent" class="lw-timeline-content" role="rowgroup">
                                                <div id="resourceTimelineCellsContainer" class="lw-timeline-cells-container" aria-hidden="true"></div>
                                            </div>
                                            <div id="resourceTimelineAnimationContainer" class="lw-timeline-animation-container lw-visibility-hidden" aria-hidden="true">
                                                <div class="lw-timeline-animation-inner-container">
                                                    <div><div></div><div></div></div><div><div></div><div></div></div><div><div></div><div></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <lw-scroll-bar id="resourceVerticalScrollBar" class="lw-timeline-scroll-bar lw-resource-scroll-bar" orientation="vertical"
                                            right-to-left="[[rightToLeft]]" aria-controls="[[id]]" animation="[[animation]]">
                                     </lw-scroll-bar>
                                </lw-splitter-item>
                            </lw-splitter>
                        </lw-splitter-item>
                    </lw-splitter>
                    <lw-scroll-bar wait right-to-left="[[rightToLeft]]" animation="[[animation]]" id="horizontalScrollBar" class="lw-timeline-scroll-bar"></lw-scroll-bar>
                </div>`;
    }

    /**
     * GanntChart's Event Listeners
     */
    static get listeners() {
        return {
            'down': '_downHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'document.dragstart': '_dragStartHandler',
            'container.wheel': '_mouseWheelHandler',
            'horizontalScrollBar.change': '_horizontalScrollbarHandler',
            'verticalScrollBar.change': '_verticalScrollbarHandler',
            'resourceVerticalScrollBar.change': '_verticalScrollbarHandler',
            'mainSplitter.resizeEnd': '_resizeEventHandler',
            'mainSplitter.resize': '_resizeEventHandler',
            'move': '_moveHandler',
            'taskTree.change': '_taskTreeChangeHandler',
            'taskTree.collapse': '_taskTreeExpandHandler',
            'taskTree.expand': '_taskTreeExpandHandler',
            'taskTree.blur': '_treeBlurHandler',
            'timelineAnimationContainer.transitionend': '_timelineAnimationContainerTransitionendHandler'
        };
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.ganttchart.css'
        ]
    }

    /**
     * Element Attached method. Called when element is attached to the DOM.
     */
    attached() {
        const that = this;

        super.attached();

        if (!that._scrollView) {
            that._scrollView = new LW.Utilities.Scroll(that.$.taskSplitterItem, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        }

        if (!that._resourceScrollView && that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            that._handleResourceTreeEvents(true);
            that._resourceScrollView = new LW.Utilities.Scroll(that.$.resourceSplitterItem, that.$.horizontalScrollBar, that.$.resourceVerticalScrollBar);
        }

        const popupWindows = ['taskPopupWindow', 'connectionPopupWindow', 'confirmPopupWindow'];

        for (let i = 0; i < popupWindows.length; i++) {
            const popupWindow = popupWindows[i];

            if (that.$[popupWindow] && that.$[popupWindow].opened) {
                //Open the modal
                that._handleModal(true);

                //Bind to events
                that['$' + popupWindow].listen('close', that._popupWindowCloseHandler.bind(that));
                that['$' + popupWindow].listen('closing', that._popupWindowClosingHandler.bind(that));
                that['$' + popupWindow].listen('open', that._popupWindowOpenHandler.bind(that));
                that['$' + popupWindow].listen('click', that._popupWindowClickHandler.bind(that));
                that['$' + popupWindow].listen('transitionend', that._popupWindowTransitionendHandler.bind(that));

                that.getShadowRootOrBody().appendChild(that.$[popupWindow]);
            }
        }
    }

    /**
     * Element Detached method. Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (that._scrollView) {
            that._scrollView.unlisten();
            delete that._scrollView;
        }

        if (that._resourceScrollView) {
            that._handleResourceTreeEvents();
            that._resourceScrollView.unlisten();
            delete that._resourceScrollView;
        }

        //Remove additional event listeners
        const popupWindows = ['taskPopupWindow', 'connectionPopupWindow', 'confirmPopupWindow'];

        //Remove the modal
        that._handleModal();

        for (let i = 0; i < popupWindows.length; i++) {
            const popupWindow = popupWindows[i];

            if (that.$[popupWindow] && that.$[popupWindow].parentElement) {
                that.$[popupWindow].parentElement.removeChild(that.$[popupWindow]);
            }

            if (that['$' + popupWindow]) {
                that['$' + popupWindow].unlisten('open');
                that['$' + popupWindow].unlisten('close');
                that['$' + popupWindow].unlisten('closing');
                that['$' + popupWindow].unlisten('transitionend');
            }
        }
    }

    /**
    * Called when a property is changed.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'animation':
                that.$.resourceTree.animation = that.$.taskTree.animation = newValue;
                break;
            case 'autoSchedule':
                newValue ? that._autoSchedule() : that._autoScheduleRestore();
                break;
            case 'autoScheduleStrictMode':
                if (newValue) {
                    that._autoSchedule();
                    that._refreshTimeline(that.view);
                }

                break;
            case 'dataSource':
                that._createTasks();
                that._createTreeColumns(that.$.taskTreeSplitter);
                that._createTimeline();
                that._createResourceTimeline();
                that._setAriaControls();

                //Not called in some cases, so call it manually
                //that.$.mainSplitter.refresh();

                that._refresh();
                break;
            case 'disableSelection':
                if (newValue) {
                    that.$.taskTree.selectionMode = 'none';
                    that.$.resourceTree.selectionMode = 'none';
                    that._unselectAll('task');
                    that._unselectAll('resource');
                }
                else {
                    that.$.taskTree.selectionMode = 'zeroOrOne';
                    that.$.resourceTree.selectionMode = 'zeroOrOne';
                }

                break;
            case 'durationUnit':
                //Validate all tasks
                for (let t = 0; t < that._tasks.length; t++) {
                    const task = that._tasks[t];

                    that._validateTaskProperties(task, task.$.project);
                }

                //Recreate timeline
                that._createTimelineCells();

                //Update timeline taskBars/connections
                for (let t = 0; t < that._tasks.length; t++) {
                    const task = that._tasks[t];

                    that._setTimelineTaskBar(task, true);
                    that._refreshTaskConnections(task);
                }

                break;
            case 'headerTemplate':
                that._handleHeaderTemplate();
                break;
            case 'inverted':
                that._handleInverted();

                //Update the scrollLeft after clearing the timeline because it was reset
                if (that.scrollLeft) {
                    that.$.timeline.scrollLeft = that._getScrollLeft(that.scrollLeft);
                }
                break;
            case 'rightToLeft':
                //NOTE: Property Binding is not working when dynamically changed
                //Synhronizes the property for all custom elements
                Array.from(that.querySelectorAll('lw-splitter, lw-tree, lw-scroll-bar')).forEach(el => el[propertyName] = newValue);
                that.closeWindow();
                that._handleInverted();
                that._refreshTimeline();

                //Update the progress bar of each task
                that._tasks.forEach(task => that._setTaskBarProgress(task));
                that.$.taskTree.toggleElementPosition = newValue ? 'far' : 'near';
                break;
            case 'dateStart':
            case 'dateEnd':
            case 'nonworkingDays':
            case 'nonworkingHours':
                that._refreshTimeline();
                break;
            case 'messages':
            case 'locale':
            case 'dayFormat':
            case 'hourFormat':
            case 'timelineHeaderFormatFunction':
            case 'monthFormat':
            case 'yearFormat':
                that._refreshHeaderDate(true);
                that._refreshColumnsHeaders();
                that._recycleResourceHeaderCells();
                break;
            case 'hideResourcePanel':
                that._createResourceTimeline();
                that.$.taskTree.refresh();
                that._refresh();
                break;
            case 'selectedIndexes':
                that._applySelection(oldValue);
                break;
            case 'resourceColumns':
                delete that._resourceSplitterItemSizeSet;
                that._createTreeColumns(that.$.resourceTreeSplitter);

                //Highlight the resources corresponding to the selected task
                that._highlightAssignedItem('task', that.selectedIndexes[0]);
                break;
            case 'resourcePanelHeaderTemplate':
                that._handleHeaderTemplate('resource');
                break;
            case 'resourceTimelineView':
            case 'resourceTimelineMode':
            case 'resourceTimelineFormatFunction':
                if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    that._resources.forEach(r => that._refreshResourceTimelineContent(r));
                }

                break;
            case 'showProgressLabel':
            case 'progressLabelFormatFunction':
                //Update the progress bar of each task
                that._tasks.forEach(task => that._setTaskBarProgress(task));
                break;
            case 'sortable':
            case 'sortMode':
                that._sortTasks();
                that._sortResources();
                break;
            case 'taskColumns': {
                const selectedIndexes = that.selectedIndexes.slice(0);

                delete that._taskSplitterItemSizeSet;

                that._createTreeColumns(that.$.taskTreeSplitter);
                that.set('selectedIndexes', selectedIndexes);
                that._applySelection();
                break;
            }
            case 'timelineMin':
                //Fallback for the binded property because the binding isn't working
                that.$.timelineSplitterItem.min = newValue;
                that.$.taskSplitter.refresh();

                //Resource Timeline
                if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    that._synchronizeSplitters(that.$.taskSplitter, that.$.resourceSplitter);
                }
                break;
            case 'treeMin':
            case 'treeSize': {
                //Fallback for the binded property because the binding isn't working
                const splitterPropName = propertyName.toLowerCase().indexOf('size') > -1 ? 'size' : 'min';

                //Task Timeline
                that.$.treeSplitterItem[splitterPropName] = newValue;
                that.$.taskSplitter.refresh();

                //Resource Timeline
                if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    that._synchronizeSplitters(that.$.taskSplitter, that.$.resourceSplitter);
                }
                break;
            }
            case 'taskPanelMin':
            case 'taskPanelSize':
            case 'resourcePanelSize':
            case 'resourcePanelMin': {
                const property = propertyName.indexOf('Min') > -1 ? 'min' : 'size',
                    panelName = propertyName.indexOf('resource') > -1 ? 'resource' : 'task';

                if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    that.$[`${panelName}SplitterItem`][property] = newValue;
                    //Resets the size of the Task Panel. Nedded when Gantt has height 'auto'
                    that.$.taskSplitterItem._setSize('size', that.taskPanelSize);
                    that.refresh();
                }

                break;
            }
            case 'unfocusable':
                that._setFocusable();
                break;
            case 'view':
                that._refreshTimeline(oldValue);
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
     * Predefines the getters for dateStart/dateEnd properties
     */
    _predefPropertyGetter(propertyName) {
        const that = this;

        Object.defineProperty(that, propertyName, {
            get: function () {
                switch (propertyName) {
                    case 'dataSource': {
                        if (that.context === that) {
                            return that.properties[propertyName].value;
                        }

                        //Remove the private attribures contained in $
                        const prepareDataSource = function (data) {
                            if (!data.length) {
                                return data;
                            }

                            for (let i = 0; i < data.length; i++) {
                                const task = data[i];
                                let subTasks = task.tasks;

                                if (subTasks && Array.isArray(subTasks)) {
                                    subTasks = prepareDataSource(subTasks.filter(t => t.$ && t.$.project === task));
                                }

                                data[i] = that._cloneObject(task);

                                if (subTasks && subTasks.length) {
                                    data[i].tasks = subTasks;
                                }
                                else {
                                    delete data[i].tasks;
                                }
                            }

                            return data;
                        }

                        return prepareDataSource(that.properties[propertyName].value.slice(0));
                    }
                    case 'dateStart':
                    case 'dateEnd': {
                        const timelineCells = that._timelineCells;

                        if (timelineCells.length) {
                            return new Date(propertyName === 'dateStart' ? timelineCells[0].date : timelineCells[timelineCells.length - 1].date);
                        }

                        return that.properties[propertyName].value;
                    }
                    case 'view':
                        return that.context === document ? that.properties[propertyName].value : that._view || that.properties[propertyName].value;
                    default:
                        return that.properties[propertyName].value;
                }
            },
            set(value) {
                if (propertyName === 'dataSource') {
                    that.updateProperty(that, that._properties[propertyName], value);
                    return;
                }

                if (propertyName === 'view' && value === 'resource') {
                    if (that._view) {
                        return;
                    }

                    that._view = that._properties[propertyName].value;
                }
                else {
                    delete that._view;
                }

                that.updateProperty(that, that._properties[propertyName], value);
            }
        });
    }

    /**
     * GanttChart's ready function. Called on initialization
     */
    ready() {
        //Used in LW.ScrollViewer. Indicates that the ScrollView object will be custom
        this._customScrollView = true;

        super.ready();
    }

    render() {
        const that = this;

        //Stopping resizeObservers
        //NOTE: Doesn't work when Tree has 'wait'. Never enters the 'ready' method
        //that.$.taskTreeSplitter.hasResizeObserver = false;
        //that.$.taskTree.hasResizeObserver = false;
        //that.$.taskTree.wait = false;

        //Note: Tree causes unwanted height to be calculated before the element is
        //initialized when ResourceSplitter is visible. That's why we need lw-hidden
        that.$.taskTree.classList.remove('lw-hidden');
        that.$.resourceTree.classList.remove('lw-hidden');

        //Accessibility
        that.setAttribute('role', 'treegrid');

        //Pre-define the getter for the dateStart/dateEnd properties
        that._predefPropertyGetter('dataSource');
        that._predefPropertyGetter('dateStart');
        that._predefPropertyGetter('dateEnd');
        that._predefPropertyGetter('view');

        //NOTE: The styles of the Splitter,Window,etc are loaded but not applied yet
        if (that.shadowRoot) {
            requestAnimationFrame(() => {
                //Timeline Tree Splitter Item
                that.$.treeSplitterItem.size = that.treeSize;

                //Timeline Tree Splitter Item
                that.$.resourceTreeSplitterItem.size = that.treeSize;
            });
        }
        else {
            //Timeline Tree Splitter Item
            that.$.treeSplitterItem.size = that.treeSize;

            //Timeline Tree Splitter Item
            that.$.resourceTreeSplitterItem.size = that.treeSize;
        }

        //Set the arrow positions of the Tree
        if (that.rightToLeft) {
            that.$.taskTree.toggleElementPosition = 'far';
            that.$.resourceTree.toggleElementPosition = 'far';
        }
        else {
            //NOTE: The binding is not working on initialization
            that.$.verticalScrollBar.removeAttribute('right-to-left');
            that.$.taskTree.toggleElementPosition = 'near';
            that.$.resourceTree.toggleElementPosition = 'near';
        }

        //Disable Tree default hover handling
        that.$.taskTree.setAttribute('disable-hover', '');
        that.$.resourceTree.setAttribute('disable-hover', '');

        //Callbacks for Trees item navigation
        that.$.taskTree._ensureVisibleCallback = that._ensureVisible.bind(that);
        that.$.taskTree._hoverViaKeyboardCallback = that._hoverViaKeyboardCallback.bind(that);
        that.$.resourceTree._ensureVisibleCallback = that._ensureVisible.bind(that);
        that.$.resourceTree._hoverViaKeyboardCallback = that._hoverViaKeyboardCallback.bind(that);

        //Disable animation interruptions. Setting this property will wait for the animation to finish before starting a new one
        that.$.taskTree._waitAnimation = true;
        that.$.resourceTree._waitAnimation = true;

        //Disable kinetic scrolling of the Trees
        that.$.taskTree.$.scrollViewer._scrollView.disableSwipeScroll = true;
        that.$.taskTree.$.scrollViewer.disabled = true;
        that.$.resourceTree.$.scrollViewer._scrollView.disableSwipeScroll = true;
        that.$.resourceTree.$.scrollViewer.disabled = true;

        if (that.disableSelection) {
            that.$.taskTree.selectionMode = 'none';
            that.$.resourceTree.selectionMode = 'none';
            that._unselectAll('task');
            that._unselectAll('resource');
        }

        //Set Task Panel size/min properties
        that.$.taskSplitterItem.min = that.taskPanelMin;

        //Set Resource Panel size/min
        that.$.resourceSplitterItem.min = that.resourcePanelMin;
        that.$.resourceSplitterItem.size = that.resourcePanelSize;

        //Configures the ScrollBars
        that._setScrollBars();

        //NOTE: Resize not thrown at this moment, so call the handler manually
        that.$.taskTreeSplitter.refresh();
        //that.$.resourceSplitter.refresh();

        if (that.view === 'resource') {
            that._view = that._properties['view'].defaultValue;
        }

        //Flags used to indicate that the size of the Splitter Items have already been set
        delete that._taskSplitterItemSizeSet;
        delete that._resourceSplitterItemSizeSet;

        that._handleHeaderTemplate();
        that._handleInverted(true);
        that._createTasks();
        that._createTimeline();
        that._createTreeColumns(that.$.taskTreeSplitter);
        that._createResourceTimeline();
        that._applySelection();
        that._setAriaControls();
        that._setFocusable();
        that.checkLicense();

        //NOTE: Necessary when Gantt is with height 'auto'. Sets the size of the Task Panel
        that.$.taskSplitterItem._setSize('size', that.taskPanelSize);

        //NOTE: The styles of the Splitter,Window,etc are loaded but not applied yet
        if (that.shadowRoot) {
            requestAnimationFrame(() => that.refresh());
        }

        super.render();
    }

    /**
     * Refreshes the ScrollBars
     */
    refresh(fullRefresh) {
        const that = this;

        if (fullRefresh) {
            that._refreshTimeline(that.view, true);
            that._createTreeColumns(that.$.taskTreeSplitter);
            that._createResourceTimeline();
            that._applySelection();
            that._createResourceTimeline();
            return;
        }

        that._resizeEventHandler();
    }

    clearSelection() {
        const that = this;

        that._unselectAll('task');
        that._unselectAll('resource');
    }

    /**
   * Checks for missing modules.
   */
    static get requires() {
        return {
            'LW.Splitter': 'lw.splitter.js',
            'LW.Tree': 'lw.tree.js',
            'LW.Window': 'lw.window.js'
        }
    }

    /**
     * Ensures an item is inside the View area
     * @param {any} item - string/number representing the index of an item
     * @param {string} type - indicates whether the item is a task or a resource
     */
    ensureVisible(item, type = 'task') {
        const that = this,
            items = that[`_${type}s`];

        if (item === undefined || item === null || !items.length) {
            return;
        }

        if (typeof item === 'number') {
            item = items[Math.max(0, Math.min(item, items.length - 1))];
        }
        else if (typeof item === 'string') {
            item = items.find((i) => i.id && i.id.toString() === item);

            if (!item) {
                item = that._getItemByTreeIndex('task', arguments[0]);
            }
        }
        else if (typeof item === 'object') {
            item = items[that._getItemIndex(item, type)];
        }
        else {
            return;
        }

        if (!item) {
            return;
        }

        //Vertical ensure
        that._ensureVisible(item, type);

        //Horizontal ensure
        that._scrollTo(item.dateStart, true);
    }

    /**
     * Removes all connections
     */
    removeAllConnections() {
        const that = this;

        if (!that.isCompleted) {
            return;
        }

        that.$.timelineConnectionsContainer.innerHTML = '';

        that._tasks.map(task => task.connections = []);
    }

    /**
     * Removes a connection based on parameters
     * @param {any} connectionId - the id of the connection : startTaskIndex + endTaskIndex + connectionType, e.g. ('0-1-1')
     * or (startTaskId, endTaskId, connectionType), e.g. (0, 1, 1)
     */
    removeConnection() {
        const that = this,
            args = Array.from(arguments).filter(a => a !== undefined);

        if (!that.isCompleted) {
            return;
        }

        let connectionId;

        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                const connection = document.getElementById(args[0]);

                if (connection) {
                    connectionId = connection.getAttribute('connection-id');
                }
            }

            if (!connectionId) {
                connectionId = (args[0] + '').split('-');
                connectionId = that._getValidConnectionId(connectionId[0], connectionId[1], connectionId[2], 'removeConnection');
            }
        }
        else if (args.length === 3) {
            connectionId = that._getValidConnectionId(args[0], args[1], args[2], 'removeConnection');
        }

        if (!connectionId) {
            return;
        }

        that._removeConnection(connectionId);

        that.$.fireEvent('itemRemove', { type: 'connection', item: { source: connectionId[0], target: connectionId[1], type: connectionId[2] } });
    }

    /**
     * Removes the connections of a Task or between two tasks
     * @param {any} taskId
     */
    removeTaskConnection(taskStartId, taskEndId) {
        const that = this;

        if (!that.isCompleted) {
            return;
        }

        taskStartId += '';

        if (taskStartId.indexOf('-') > -1 && !taskEndId) {
            const ids = taskStartId.split('-');

            taskEndId = ids[1];
            taskStartId = ids[0];
        }

        taskStartId = that._getTaskIndexById(taskStartId);
        taskEndId = that._getTaskIndexById(taskEndId);

        if (isNaN(taskStartId)) {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'removeTaskConnection', argumentName: 'taskEndIndex' }));
            return;
        }

        //A flag indicating to remove also the connections that are not from view="resource"
        that._removeAllTaskConnections = true;

        that._removeConnection('' + taskStartId + (isNaN(taskEndId) ? '' : taskEndId));

        delete that._removeAllTaskConnections;
    }

    /**
     * Marks the start of a batch update
     */
    beginUpdate() {
        const that = this;

        that._isUpdating = { started: true, type: {}, selectedTasks: that.selectedIndexes.map(t => that._tasks[t]) };

        that.$.fireEvent('beginUpdate');
    }

    /**
     * Ends the batch update
     * @param {any} refresh
     */
    endUpdate() {
        const that = this;

        function refreshTaskPanel() {
            that._sortTasks();

            if (!that._unsortedTasks) {
                that._createTreeColumns(that.$.taskTreeSplitter);

                //Deletes the last hovered task
                delete that._hoveredTimelineTask;

                //Timeline Task cells
                that.$.taskTimelineCellsContainer.innerHTML = '';

                //Timeline Connections
                that.$.timelineConnectionsContainer.innerHTML = '';

                //Timeline Tasks
                that.$.timelineTasksContainer.innerHTML = '';

                that._createTimeline();
                that._setAriaControls();

                const selectedIndexes = that.selectedIndexes,
                    tasks = that._tasks;

                if (selectedTasks && !selectedTasks.every(t => selectedIndexes.includes(tasks.indexOf(t)))) {
                    that.set('selectedIndexes', selectedTasks.map(t => tasks.indexOf(t)));
                }

                that._applySelection();
            }

            //Refresh the resource columns
            const resources = that._resources;

            for (let i = 0; i < resources.length; i++) {
                that._refreshTreeColumnsData(resources[i], undefined, 'resource');
            }
        }

        function refreshResourcePanel() {
            if (that.hideResourcePanel) {
                return;
            }

            that._sortResources();

            if (!that._unsortedResources) {
                that._createResourceTimeline();
            }

            //Refresh the resource columns
            const tasks = that._tasks;

            for (let i = 0; i < tasks.length; i++) {
                that._refreshTreeColumnsData(tasks[i]);
            }
        }

        if (!that._isUpdating) {
            return;
        }

        const updateType = Object.keys(that._isUpdating.type).length === 1 ? Object.keys(that._isUpdating.type)[0] : undefined,
            selectedTasks = that._isUpdating.selectedTasks;

        delete that._isUpdating;

        switch (updateType) {
            case 'task':
                refreshTaskPanel();
                break;
            case 'resource':
                refreshResourcePanel();
                break;
            default:
                refreshTaskPanel();
                refreshResourcePanel();
                break;
        }

        that.$.fireEvent('endUpdate');
    }

    /**
     * Deletes all tasks and clears the timeline
     */
    clearTasks() {
        const that = this;

        that._clearTasks();
    }

    _clearTasks() {
        const that = this;

        delete that.__tasks;
        delete that._unsortedTasks;

        that._tasks = [];
        that._timelineCells = [];
        that._timelineHeaderCells = [];

        //reset the width of the timeline header
        that.$.timelineContent.style.width = that.$.timelineAnimationContainer.style.width = '';

        //Remove the variable for the height of the column lines
        that.$.container.style.removeProperty('--lw-gantt-chart-task-timeline-content-height');

        //Timeline header details
        that.$.timelineViewDetails.innerHTML = '';

        //Timeline header
        that.$.timelineViewCells.innerHTML = '';

        //Timeline Task cells
        that.$.taskTimelineCellsContainer.innerHTML = '';

        //Timeline Connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        //Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';

        //Deletes the last hovered task
        delete that._hoveredTimelineTask;

        //TaskTree
        const taskTreeSplitterItems = that.$.taskTreeSplitter._items;

        for (let i = 0; i < taskTreeSplitterItems.length; i++) {
            const splitterItem = taskTreeSplitterItems[i];

            if (splitterItem === that.$.taskTreeSplitterItem) {
                that.$.taskTree.dataSource = [];
            }
            else {
                const dataContainer = splitterItem.getElementsByClassName('lw-task-tree-content')[0];

                if (dataContainer) {
                    dataContainer.innerHTML = '';
                }
            }
        }

        //Refresh the scrollViwer
        that._refresh();
    }

    /**
     * Deletes all resources
     */
    clearResources() {
        const that = this;

        that._unselectAll('resource');

        //ResourceTree
        const treeSplitterItems = that.$.resourceTreeSplitter._items;

        for (let i = 0; i < treeSplitterItems.length; i++) {
            const splitterItem = treeSplitterItems[i];

            if (splitterItem === that.$.resourceTreeSplitterItem) {
                that.$.resourceTree.dataSource = [];
            }
            else {
                const dataContainer = splitterItem.getElementsByClassName('lw-resource-tree-content')[0];

                if (dataContainer) {
                    dataContainer.innerHTML = '';
                }
            }
        }

        that._resources = [];

        delete that._unsortResources;

        //Clear the resource timeline
        that.$.resourceTimelineCellsContainer.innerHTML = '';

        //Remove all resource from the tasks
        that._tasks.forEach(t => {
            t.resources = [];
            that._refreshTreeColumnsData(t, ['resources']);
        });

        //Refreshes the Task Timeline
        that._refreshTimeline();

        //Hides the Resource Panel
        that._createResourceTimeline();
    }

    /**
     * Creates a connection between tasks
     * @param {any} connectionId - the id of the connection : startTaskIndex + endTaskIndex + connectionType, e.g. (011)
     * or (startTaskId, endTaskId, connectionType), e.g. (0, 1, 1)
     */
    createConnection() {
        const that = this,
            tasks = that._tasks;
        let connectionId,
            args = Array.from(arguments).filter(a => a !== undefined);

        if (!that.isCompleted || tasks.length === 0) {
            return;
        }

        if (args.length === 1) {
            connectionId = (args[0] + '').split('-');
        }
        else if (args.length === 3) {
            connectionId = args;
        }

        connectionId = that._getValidConnectionId(connectionId[0], connectionId[1], connectionId[2], 'createConnection');

        if (!connectionId) {
            return;
        }

        that._connectTask(connectionId);

        connectionId = connectionId.split('-');

        that.$.fireEvent('itemInsert', { type: 'connection', item: { source: connectionId[0], target: connectionId[1], type: connectionId[2] } });
    }

    /**
     * Collapses a Project Task
     */
    collapse(task) {
        this._handleCollapseExpandMethods(task, 'collapse');
    }

    /**
     * Expands a Project Task
     */
    expand(task) {
        this._handleCollapseExpandMethods(task, 'expand');
    }

    /**
     * Handles the collapse and expand methods()
     * @param {*} index - the index/task to be collapsed/expanded
     * @param {string} action - the action to execute ( collapse or expand )
     */
    _handleCollapseExpandMethods(index, action) {
        const that = this,
            tasks = that._unsortedTasks || that._tasks;

        if (index === undefined || index === null || !tasks || !tasks.length) {
            return;
        }

        const taskDetails = that._getValidTaskAndIndex(index);

        if (!taskDetails || !taskDetails.item) {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'collapse', argumentName: 'task' }));
            return;
        }

        let task = taskDetails.item;

        if (task.type !== 'project') {
            task = task.$.project;
        }

        if (task.hidden) {
            task.expanded = action === 'expand';
            return;
        }

        task = that.$.taskTree.querySelectorAll('lw-tree-item, lw-tree-items-group')[tasks.filter(t => !t.hidden).indexOf(task)];

        if (task === undefined) {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: action, argumentName: 'task' }));
            return;
        }

        that.$.taskTree[`${action}Item`](task instanceof LW.TreeItemsGroup ? task : task.parentItem);
    }

    /**
     * Validates and returns the task and it's index from an input parameter
     * * @param {*} index - the input argument for the target task.
     */
    _getValidTaskAndIndex(index, itemType = 'task') {
        const that = this;
        let items, item, isSorted;

        if (itemType === 'task') {
            isSorted = !!that._unsortedTasks;
            items = that._unsortedTasks || that._tasks;
        }
        else {
            isSorted = !!that._unsortedResources;
            items = that._unsortedResources || that._resources;
        }

        const targetItems = isSorted ? (itemType === 'task' ? 'unsortedTask' : 'unsortedResource') : itemType;

        if (index === undefined || index === null || !items || !items.length) {
            return;
        }

        if (typeof index === 'string') {
            item = items.find((item) => item.id && item.id.toString() === arguments[0].toString());

            if (!item) {
                index = items.indexOf(that._getItemByTreeIndex(targetItems, index));
                item = items[index];
            }
            else {
                index = items.indexOf(item);
            }
        }
        if (typeof index === 'number') {
            item = items[index] || items.find((item) => item.id && item.id.toString() === index.toString());
        }
        else if (typeof index === 'object') {
            item = items[that._getItemIndex(index, targetItems)];
            index = items.indexOf(item);
        }

        return { item: item, index: index }
    }


    /**
     * Exports the TaskTree to XLSX or PDF
     */
    exportData(dataFormat, callback) {
        const that = this;

        //Function to convert rgb color to hex format
        function toHex(rgb) {
            function hex(x) {
                const hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
                return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
            }

            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (!rgb) {
                return '#ffffff';
            }

            return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]).toUpperCase();
        }

        //Creates a record from a item object
        function getRecord(item) {
            let record = {};

            //Create the Header
            for (let c = 0; c < itemColumns.length; c++) {
                const col = itemColumns[c];

                if (item) {
                    record[col.value] = item[col.value];
                    record._keyDataField = items.indexOf(item);

                    if (item.tasks) {
                        record._expanded = !!item.expanded;
                    }

                    if (item.$.project) {
                        record._parentDataField = items.indexOf(item.$.project);
                    }
                }
                else {
                    record[col.value] = col.label;
                }
            }

            return record;
        }

        if (!LW.Utilities.DataExporter) {
            that.error(that.localize('missingReference', { elementType: that.nodeName.toLowerCase(), methodName: 'exportData', file: 'lw.export.js' }));
            return;
        }
        try {
            new JSZip();
        }
        catch (error) {
            that.error(that.localize('missingReference', { elementType: that.nodeName.toLowerCase(), methodName: 'exportData', file: 'jszip.min.js' }));
            return;
        }

        if (dataFormat === 'pdf') {
            if (!window.pdfMake) {
                that.error(that.localize('missingReference', { elementType: that.nodeName.toLowerCase(), methodName: 'exportData', file: 'pdfMake.min.js' }));
                return;
            }
        }

        const type = that.dataExport.itemType,
            items = that.dataExport.includeHidden ? that[`_${type}s`] : that[`_${type}s`].filter(i => !i.hidden),
            itemColumns = that[`${type}Columns`];

        if (!items || !items.length || !itemColumns.length) {
            return;
        }

        const dataExporter = new LW.Utilities.DataExporter(
            {
                collapseChar: that.dataExport.collapseChar,
                exportHeader: that.dataExport.header,
                expandChar: that.dataExport.expandChar,
                hierarchical: true,
                pageOrientation: that.dataExport.pageOrientation,
                style: that.dataExport.style
            });

        const header = getRecord();
        let dataExporterHeader = { columns: [] };

        for (let h in header) {
            dataExporterHeader.columns.push({ label: header[h], dataField: h });
        }

        dataExporter.header = dataExporterHeader;

        if (!dataExporter.style) {
            const computedStyle = window.getComputedStyle(that),
                headerStyle = window.getComputedStyle(that.$.timelineHeader),
                header = {
                    height: that.$[`${type}TreeSplitter`].querySelector(`.lw-${type}-tree-header`).offsetHeight + 'px',
                    border: '1px solid ' + toHex(headerStyle.borderRightColor),
                    fontFamily: 'Helvetica',
                    fontSize: headerStyle.fontSize,
                    color: toHex(headerStyle.color),
                    backgroundColor: toHex(headerStyle.backgroundColor),
                    fontWeight: '400'
                },
                columns = {
                    border: '1px solid ' + toHex(computedStyle.borderColor),
                    fontFamily: computedStyle.fontFamily,
                    fontSize: computedStyle.fontSize
                },
                columnsData = dataExporterHeader.columns,
                treeSplitterItems = that.$[`${type}TreeSplitter`].items;

            const getItemWidth = (item) => {
                if (dataFormat === 'pdf') {
                    return item.offsetWidth * 100 / that.$[`${type}TreeSplitter`].offsetWidth + '%'
                }
                else {
                    return item.offsetWidth + 'px'
                }
            }

            for (let i = 0; i < columnsData.length; i++) {
                const column = columnsData[i],
                    itemColumn = itemColumns.find(col => col.value === column.dataField),
                    row = treeSplitterItems[i].querySelector('.lw-tree-item-label-container') || treeSplitterItems[i].querySelector(`.lw-${type}-label-container`);

                header[column.dataField] = {
                    textAlign: headerStyle.textAlign,
                    width: getItemWidth(treeSplitterItems[i])
                }

                let textAlign;

                if (row) {
                    textAlign = getComputedStyle(row).justifyContent || getComputedStyle(row).textAlign;
                }

                columns[column.dataField] = {
                    textAlign: ['left', 'center', 'right', 'justify'].indexOf(textAlign) < 0 ? 'start' : textAlign,
                    format: itemColumn.exportFormat || (column.dataField.indexOf('date') > -1 ? 'd' : '')
                };
            }

            dataExporter.style = {
                border: '1px solid ' + toHex(computedStyle.borderColor),
                borderCollapse: 'collapse',
                header: header,
                columns: columns,
                rows: {
                    height: (parseFloat(computedStyle.getPropertyValue('--lw-gantt-chart-task-default-height')) || 0) + 'px'
                }
            }
        }

        //Prepare the data to export
        let data = [];

        //Create task records
        for (let t = 0; t < items.length; t++) {
            data.push(getRecord(items[t]));
        }

        //Includes the Resources to the export data
        //if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
        //    const resources = that._resources;

        //    if (resources.length) {
        //        data.push(getRecord(undefined, 'resource'))

        //        //Create resource records
        //        for (let r = 0; r < resources.length; r++) {
        //            data.push(getRecord(resources[r], 'resource'));
        //        }
        //    }
        //}

        return dataExporter.exportData(data, dataFormat, that.dataExport.fileName, callback);
    }

    /**
     * Prepares the element for printing
     */
    print() {
        const that = this,
            fileName = that.dataExport.fileName;

        that.dataExport.fileName = null;

        const output = that.exportData('html');

        const newWindow = window.open('', '', 'width=800,height=500'),
            printDocument = newWindow.document.open(),
            pageContent =
                '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8" />' +
                '<title>' + fileName + '</title>' +
                '</head>' +
                '<body>' + output + '</body></html>';

        try {
            printDocument.write(pageContent);
            printDocument.close();

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 100);
        }
        catch (error) {
            //
        }

        that.dataExport.fileName = fileName;
    }

    /**
     * Returns the current state of the Element as JSON
     */
    getState() {
        const that = this,
            tasks = that._getTasksJSON(true) || [];

        return {
            tasks: JSON.parse(JSON.stringify(tasks)),
            selectedIndexes: that.selectedIndexes.slice(0),
            resources: JSON.parse(JSON.stringify((that._unsortedResources || that._resources).slice(0)))
        };
    }

    /**
    * Returns an array of all the tasks inside the element
    */
    get tasks() {
        const that = this,
            tasks = that._tasks;

        if (!that.isReady || !tasks || !tasks.length) {
            return [];
        }

        return tasks.map(t => that._cloneObject(t));
    }

    /**
   * Returns an array of all the tasks inside the element
   */
    get resources() {
        const that = this,
            resources = that._resources;

        if (!that.isReady || !resources || !resources.length) {
            return [];
        }

        return resources.map(r => that._cloneObject(r));
    }

    /**
     * Returns the index of a Task
     * @param {any} task
     */
    getItemPath(item) {
        const that = this,
            itemType = ['milestone', 'project', 'task'].indexOf(item.type) > -1 ? 'task' : 'resource';

        item = that._getValidTaskAndIndex(item, itemType);

        if (!item) {
            //No such item
            return;
        }

        return that._getItemPath(item.item, itemType);
    }

    /**
     * Returns the index of a Task
     * @param {any} task
     */
    getTaskIndex(task) {
        const that = this;

        return that._getItemIndex(task, that._unsortedTasks ? 'unsortedTask' : 'task');
    }

    /**
     * Returns the project of a Task if not undefined
     * @param {any} task
     */
    getTaskProject(task) {
        const that = this,
            tasks = that._tasks;

        task = tasks[that._getItemIndex(task, that._unsortedTasks ? 'unsortedTask' : 'task')];

        if (!task || !task.$ || !task.$.project) {
            return;
        }

        return that._cloneObject(task.$.project);
    }

    /**
    * Returns the index of a Task
    * @param {any} task
    */
    getResourceIndex(task) {
        return this._getItemIndex(task, 'resource');
    }

    /**
     * Returns the tasks assigned to a resource
     * @param {GanttChartResource} resource
     */
    getResourceTasks(resource) {
        const that = this,
            resources = that._resources;

        if (!resources) {
            return;
        }

        resource = resources[this._getItemIndex(resource, that._unsortedResources ? 'unsortedResource' : 'resource')];

        if (!resource) {
            return;
        }

        return that._getTasksAssigned(resource);
    }

    /**
     * Private method. Returns the tasks assigned to a resource
     * @param {GanttChartResource} resource
     */
    _getTasksAssigned(resource) {
        const that = this,
            tasks = that._tasks || [];
        let assignedTo = [];

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (!task.disableResources && task.resources.find(res => res === resource.id)) {
                assignedTo.push(that._cloneObject(task));
            }
        }

        return assignedTo;
    }

    /**
     * Returns the index of a task/resource
     * @param {any} item - task or a resource object
     * @param {any} type - type of item ( task or resource)
     */
    _getItemIndex(item, type) {
        const that = this;

        if (item instanceof LW.TreeItem || item instanceof LW.TreeItemsGroup) {
            return [].slice.call(that.$.taskTree.querySelectorAll('lw-tree-item, lw-tree-items-group')).indexOf(item);
        }

        if (!type) {
            type = 'task';
        }

        const items = that[`_${type}s`];

        if (type === 'unsortedTask') {
            type = 'task';
        }
        else if (type === 'unsortedResource') {
            type = 'resource';
        }

        if (item instanceof HTMLElement && item.classList.contains('lw-timeline-task')) {
            return items.indexOf(item[`_${type}`]);
        }

        //Properties that will be compared
        const itemProperties = type === 'resource' ? ['id', 'label', 'value', 'progress'] : ['id', 'type', 'class', 'dateStart', 'dateEnd', 'resources', 'connections'];

        //Matches a task according to it's major properties'
        if (typeof item === 'object') {

            //Compares the object to the tasks to find a match
            for (let i = 0; i < items.length; i++) {
                if (itemProperties.every(prop => {
                    if (Array.isArray(item[prop])) {
                        return JSON.stringify(item[prop]) === JSON.stringify(items[i][prop])
                    }
                    else if (prop.indexOf('date') > -1) {
                        return new Date(item[prop]).getTime() === new Date(items[i][prop]).getTime()
                    }
                    else {
                        return item[prop] === items[i][prop]
                    }
                })) {
                    return items.indexOf(items[i])
                }
            }
        }

        return -1;
    }

    /**
     * Returns the path of a task. Public method
     */
    getTaskPath(task) {
        const that = this;

        if (task instanceof LW.TreeItem || task instanceof LW.TreeItemsGroup) {
            return that.$.taskTree.contains(task) ? task.path : -1;
        }

        const tasks = that._tasks;

        if (task instanceof HTMLElement && task.classList.contains('lw-timeline-task') && that.$.mainSplitter.contains(task)) {
            return that._getItemPath(task._task);
        }

        //Matches a task according to it's major properties'
        if (typeof task === 'object') {
            //Compares the object to the tasks to find a match
            task = tasks.find(t =>
                (task.id && t.id && t.id === task.id) || (task.type === t.type && task.label === t.label && task.class === t.class &&
                    task.dateStart && new Date(task.dateStart).getTime() === new Date(t.dateStart).getTime() &&
                    task.dateEnd && new Date(task.dateEnd).getTime() === new Date(t.dateEnd).getTime()) &&
                task.resources.every(res => t.resources.includes(res)));
        }

        return that._getItemPath(task);
    }

    /**
     * Returns the path of a task/resource
     * @param {any} item
     */
    _getItemPath(item, type = 'task') {
        const that = this,
            items = that[`_${type}s`];

        if (!items || !items.length) {
            return;
        }

        if (!item || !item.$) {
            return '';
        }

        if (!item.$.project) {
            return items.filter(t => !t.$.project).indexOf(item).toString();
        }

        let project = item.$.project,
            path = [];

        while (project) {
            path.push(project.tasks.filter(t => t.$.project === project).indexOf(item).toString());
            item = project;
            project = item.$.project;
        }

        path.push(items.filter(t => t.$.project === project).indexOf(item).toString());

        return path.reverse().join('.');
    }

    /**
    * Clears the previously saved state
    */
    clearState() {
        const that = this;

        if (!that.id) {
            that.warn(that.localize('noId'));
            return;
        }

        window.localStorage.removeItem('lwGanttChart' + that.id);
    }

    /**
     * Loads a previously saved state of the element
     * @param {any} state - must be an array of tasks
     */
    loadState(state) {
        const that = this;

        if (!state) {
            if (!that.id) {
                return;
            }

            state = JSON.parse(window.localStorage.getItem('lwGanttChart' + that.id));
        }

        if (!state) {
            return;
        }

        let dataSource = JSON.stringify(state.tasks),
            selectedIndexes = JSON.stringify(state.selectedIndexes),
            resources = JSON.stringify(state.resources);

        if (dataSource) {
            dataSource = JSON.parse(dataSource);
        }

        if (selectedIndexes) {
            selectedIndexes = JSON.parse(selectedIndexes);
        }

        if (resources) {
            resources = JSON.parse(resources);
        }

        //Prevents 'change' event firing from the Tree element
        that._noChangeEvent = true;

        let isResourceView;

        //The size of the task/resource splitter items will be reset
        delete that._taskSplitterItemSizeSet;
        delete that._resourceSplitterItemSizeSet;

        if (Array.isArray(dataSource)) {
            that._createTasks(dataSource);

            isResourceView = that._view !== undefined && that.__tasks;

            //Update the dataSource property
            that.set('dataSource', dataSource);
        }

        //Loads the resources
        if (Array.isArray(resources)) {
            let res = resources;

            for (let i = 0; i < res.length; i++) {
                const res = resources[i];
                let resource = that._resources.find(r => r.id && r.id.toString() === res.id.toString()) || {};

                that._setResource(resource, res);

                if (Object.values(resource).length && !that._resources.includes(resource)) {
                    that._resources.push(resource);
                }
            }

            if (that.sortable) {
                that._sortResources();
            }
        }

        if (isResourceView) {
            delete that._noChangeEvent;
            return;
        }

        that._createTimeline();
        that._createTreeColumns(that.$.taskTreeSplitter);
        that._createResourceTimeline();

        if (Array.isArray(selectedIndexes)) {
            //Update the selectedIndexes
            that.set('selectedIndexes', selectedIndexes);
            that._applySelection();
        }

        delete that._noChangeEvent;
    }

    /**
    * Saves the current state of the Layout
    */
    saveState() {
        const that = this;

        if (!that.id) {
            that.warn(that.localize('noId'));
            return;
        }

        //Save to LocalStorage
        window.localStorage.setItem('lwGanttChart' + that.id, JSON.stringify(that.getState()));
    }

    /**
     * Insert a task
     * @param {string || number} index - the target index where the new task should ne inserted.
     */
    insertTask(index, newTask) {
        const that = this,
            args = Array.from(arguments).filter(a => a !== undefined);

        if (args.length === 1) {
            newTask = args[0];
        }

        if (typeof newTask !== 'object') {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'insertTask', argumentName: 'newTask' }));
            return;
        }

        if (!that._tasks) {
            return;
        }

        const newTasks = that._createTasks([newTask], true);

        if (!newTasks.length) {
            return;
        }

        that._unsortTasks();

        //Resource view. Refresh the timeline
        if (that.view !== 'resource' && that._view !== undefined) {
            const originalTasks = that.__tasks || that._tasks;

            for (let t = 0; t < newTasks.length; t++) {
                originalTasks.push(newTasks[t]);
            }

            if (that._isUpdating) {
                if (that.__tasks) {
                    //Revert the connections to their original state
                    that.__tasks.forEach(task => task.connections.forEach(con => {
                        const targetIndex = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]);

                        if (targetIndex > -1) {
                            con.target = targetIndex
                        }
                    }));
                }

                that._isUpdating.type['task'] = true;
                that._isUpdating.type['resource'] = true;
                return;
            }

            that._refreshTimeline();
            // that._refreshTaskResources(targetTask);
            that.$.fireEvent('itemInsert', { type: 'task', item: that._cloneObject(newTasks[0]) });
            return;
        }

        const tasks = that._tasks.slice(0);
        let targetTask, insertAsLastItem, targetTaskPath;

        if (typeof index === 'string') {
            targetTask = tasks.find((task) => task.id && task.id.toString() === arguments[0].toString());

            if (!targetTask) {
                targetTask = that._getItemByTreeIndex('task', index);

                if (targetTask && targetTask.type === 'project' && that.view !== 'resource' && !that._view) {
                    targetTaskPath = that._getItemPath(targetTask);
                    insertAsLastItem = index !== targetTaskPath;
                }
            }

            if (insertAsLastItem) {
                index = tasks.indexOf(targetTask.tasks.length ? targetTask.tasks[targetTask.tasks.length - 1] : targetTask) + 1;
            }
            else {
                index = tasks.indexOf(targetTask);
            }
        }
        else if (typeof index === 'number') {
            targetTask = tasks[index];
        }
        else if (typeof index === 'object') {
            targetTask = tasks[that._getItemIndex(index)];
            index = tasks.indexOf(targetTask);
        }
        //else {
        //    that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'insertTask', argumentName: 'index' }));
        //    return;
        //}

        if (!targetTask) {
            index = that._tasks.length;
        }

        //Add the tasks to the parent projects
        if (targetTask && targetTask.$.project) {
            newTasks[0].$.project = targetTask.$.project;

            let targetProject = targetTask.$.project;

            while (targetProject) {
                const targetSubTask = insertAsLastItem && targetTask.tasks && targetTask.tasks.length ? targetTask.tasks[targetTask.tasks.length - 1] : targetTask;

                targetProject.tasks.splice.apply(targetProject.tasks, [targetProject.tasks.indexOf(targetSubTask) + (insertAsLastItem ? 1 : 0), 0].concat(newTasks))
                targetProject = targetProject.$.project;
            }
        }

        //Reset hover state
        that._handleTreeItemHover();
        that._unfocusTreeItems(that.$.taskTreeSplitter);

        //Set the project of the newly added project
        if (insertAsLastItem) {
            //newTasks[0] is always the project if newTasks > 1
            newTasks[0].$.project = targetTask;
            //Add the sub tasks as well
            for (let t = 0; t < newTasks.length; t++) {
                targetTask.tasks.push(newTasks[t]);
            }
        }


        //Handles 'hidden' property
        that._synchronizeProjectVisibility(newTasks[0].$.project, newTasks[0]);

        //remove all connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        //Refresh connection indexes
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (task.connections) {
                for (let c = 0; c < task.connections.length; c++) {
                    const con = task.connections[c];

                    if (typeof con.target === 'number' && con.target >= index) {
                        con.target += newTasks.length;
                    }
                }
            }
        }

        //Insert the new project/task
        tasks.splice.apply(tasks, [index, 0].concat(newTasks));

        that._tasks = tasks;

        if (that._isUpdating) {
            that._isUpdating.type['task'] = true;
            that._isUpdating.type['resource'] = true;
            return;
        }

        that._taskAPIManipulation = true;

        const selectedTasks = that.selectedIndexes.map(t => that._tasks[t]);

        that._sortItems();

        that._createTreeColumns(that.$.taskTreeSplitter);

        //Deletes the last hovered task
        delete that._hoveredTimelineTask;

        //Timeline Task cells
        that.$.taskTimelineCellsContainer.innerHTML = '';

        //Remove current Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';
        delete that._hoveredTimelineTask;

        //Remove current Timeline Connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        that._createTimeline();

        if (targetTask) {
            if (targetTask.type === 'project') {
                that._refreshProject(targetTask);
            }
            else {
                that._refreshProject(targetTask.$.project);
            }
        }

        that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)));
        that._applySelection();

        delete that._taskAPIManipulation;

        that._refreshTaskResources(targetTask);

        that.$.fireEvent('itemInsert', { type: 'task', item: that._cloneObject(newTasks[0]) });
    }

    /**
     * Opens the popupWindow editor for a certain Task
     */
    openWindow(target) {
        const that = this;

        if (that.disableWindowEditor) {
            return;
        }

        //If target is a Connection
        if (typeof target === 'string') {
            if (target.indexOf('.') > -1) {
                const targetTask = that._getItemByTreeIndex('task', target);

                if (targetTask) {
                    that._openPopupWindow(Array.from(that.$.timelineTasksContainer.children).find(t => t._task === targetTask));
                }
                return;
            }
            else if (target.indexOf('-') > -1) {
                let connectionId = (arguments[0] + '').split('-');

                connectionId = that._getValidConnectionId(connectionId[0], connectionId[1], connectionId[2], 'openEditor');

                if (connectionId) {
                    that._openPopupWindow(that.$.timelineConnectionsContainer.querySelector('.lw-task-connection[connection-id^="' + connectionId + '"]'));
                    return;
                }
            }
        }

        const task = that._tasks[that._getTaskIndexById(target)];

        //If target is a Task
        if (task) {
            that._openPopupWindow(Array.from(that.$.timelineTasksContainer.children).find(t => t._task === task));
            return;
        }
    }

    /**
     * Closes the Task Editor
     */
    closeWindow() {
        const that = this,
            popupWindows = ['confirm', 'task', 'connection'];

        for (let i = 0; i < popupWindows.length; i++) {
            const popupWindow = that.$[popupWindows[i] + 'PopupWindow'];

            if (popupWindow) {
                popupWindow.close();
                delete popupWindow._target;
            }
        }
    }

    /**
     * Adds a new task to the end of a project's tasks
     */
    addTaskTo(task, project) {
        const that = this,
            tasks = that._tasks;

        if (!tasks.length) {
            return;
        }

        if (typeof project === 'string') {
            project = tasks.find((task) => task.id && task.id.toString() === project.toString());

            if (!project) {
                project = that._getItemByTreeIndex(that._unsortedTasks ? 'unsortedTask' : 'task', project);
            }
        }
        else if (typeof project === 'number') {
            project = tasks[project];
        }
        else {
            return;
        }

        if (!project) {
            return;
        }

        that.insertTask(that._getItemPath(project, that._unsortedTasks ? 'unsortedTask' : 'task') + '.' + project.tasks.length, task);
    }

    /**
     * Updates the properties of a task
     */
    updateTask(index, taskDetails) {
        const that = this;

        //Validates the task and returns it and it's index
        const taskInfo = that._getValidTaskAndIndex(index);

        if (!taskInfo || !taskInfo.item) {
            //Throw Error
            return;
        }

        let tasks = that._unsortedTasks || that._tasks,
            task = taskInfo.item;
        const selectedTasks = that.selectedIndexes.map(t => tasks[t]),
            isSorted = !!that._unsortedTasks;

        index = taskInfo.index;

        if (typeof taskDetails !== 'object') {
            //Throw Error
            return;
        }

        if (task === undefined || index < 0) {
            return;
        }

        that._unsortTasks();

        tasks = that._tasks;

        const taskEditor = that.$.taskPopupWindow;

        if (taskEditor && taskEditor._target && taskEditor._target._task === task) {
            taskEditor.close();
        }

        index = Math.max(0, Math.min(tasks.length - 1, index));

        const timelineTask = that.$.timelineTasksContainer.children[index],
            isTaskHidden = task.hidden;
        let taskResources = that._getTaskResources(task, true);

        for (let prop in taskDetails) {
            let oldValue = task[prop],
                newValue = taskDetails[prop];

            if ((newValue instanceof Date && newValue.getTime() === new Date(oldValue).getTime()) || newValue === oldValue) {
                continue;
            }

            if (!isSorted && timelineTask && prop === 'class') {
                timelineTask.classList.remove(task.class);

                if (newValue) {
                    timelineTask.classList.add(newValue);
                }
            }

            //Handles type conversion. e.g. Project <-> Task <-> Milestone
            if (prop === 'type' && task.type !== taskDetails[prop] && ['task', 'project', 'milestone'].indexOf(taskDetails[prop]) > -1) {
                let refereshTaskTree;

                //Handles convertion from "project" to something else
                if (task.type === 'project') {
                    if (that.view !== 'resource' && that._view) {
                        continue;
                    }

                    const targetTasks = task.tasks,
                        originalTasks = tasks.slice(0);

                    for (let i = targetTasks.length - 1; i > -1; i--) {
                        const subTaskIndex = originalTasks.indexOf(targetTasks[i]);

                        if (!isSorted && !that._isUpdating) {
                            //Remove connections that target the subTask that's going to be removed
                            that._removeConnectionsToTask(subTaskIndex, originalTasks, targetTasks);
                            that._removeConnection(subTaskIndex);

                            that.$.timelineTasksContainer.removeChild(that.$.timelineTasksContainer.children[subTaskIndex]);
                            that.$.taskTimelineCellsContainer.removeChild(that.$.taskTimelineCellsContainer.children[subTaskIndex]);
                        }

                        tasks.splice(subTaskIndex, 1);
                    }

                    if (!isSorted) {
                        //Update connected tasks
                        for (let i = 0; i < tasks.length; i++) {
                            const t = tasks[i];

                            if (t.connections) {
                                t.connections.forEach(con => con.target = tasks.indexOf(originalTasks[con.target]));
                            }
                        }

                        //Update the project tasks
                        if (!that._isUpdating && task.$.project && task.tasks && task.tasks.length) {
                            let taskProject = task.$.project;

                            while (taskProject) {
                                taskProject.tasks.splice.apply(taskProject.tasks, [taskProject.tasks.indexOf(task.tasks[0]), task.tasks.length]);
                                that._refreshProject(taskProject);
                                taskProject = taskProject.$.project;
                            }
                        }
                    }

                    refereshTaskTree = true;
                    delete task.tasks;
                }
                else if (taskDetails[prop] === 'project') {
                    if (!task.tasks) {
                        task.tasks = [];
                    }

                    delete task.expanded;
                    refereshTaskTree = true;
                }

                if (!isSorted && !that._isUpdating) {
                    //Convert the corresponding Task Tree items
                    if (refereshTaskTree) {
                        that._taskAPIManipulation = true;

                        that._handleTreeItemHover();
                        that._unfocusTreeItems(that.$.taskTreeSplitter);

                        //Insert a new Task Tree item
                        const taskTreeSplitterItems = that.$.taskTreeSplitter._items;

                        for (let i = 0; i < taskTreeSplitterItems.length; i++) {
                            const splitterItem = taskTreeSplitterItems[i];

                            if (that.$.taskTreeSplitterItem === splitterItem) {
                                const taskPath = that._getItemPath(task);
                                let treeTask = Object.assign({}, task);

                                if (that.$.taskTree.selectedIndexes.includes(taskPath)) {
                                    treeTask.selected = true;
                                }

                                that.$.taskTree.removeItem(taskPath);
                                that.$.taskTree.insert(treeTask, taskPath);
                            }
                            else {
                                const dataContainer = splitterItem.getElementsByClassName('lw-task-tree-content')[0];

                                if (!dataContainer) {
                                    continue;
                                }

                                const targetTaskItem = dataContainer.getElementsByClassName('lw-task-item')[index];

                                if (taskDetails[prop] === 'project' && !targetTaskItem.lastElementChild.classList.contains('lw-task-drop-down')) {
                                    const dropDownContainer = document.createElement('div');

                                    dropDownContainer.classList.add('lw-task-drop-down', 'lw-visibility-hidden');
                                    targetTaskItem.appendChild(dropDownContainer);
                                }
                                else if (targetTaskItem.lastElementChild.classList.contains('lw-task-drop-down')) {
                                    targetTaskItem.lastElementChild.remove();
                                }
                            }
                        }

                        delete that._taskAPIManipulation;
                    }

                    //Convert the Timeline task
                    const timelineTask = that.$.timelineTasksContainer.children[index];

                    if (taskDetails[prop] === 'milestone' || task.type === 'milestone') {
                        timelineTask.style.width = '';
                        timelineTask.innerHTML = that._createTaskBar(taskDetails[prop]).innerHTML;
                    }

                    timelineTask.classList.remove(task.type);
                    timelineTask.classList.add(taskDetails[prop]);
                }
            }

            if (task.type === 'project' && task.synchronized && (prop.toLowerCase().indexOf('date') > -1 || prop.toLowerCase().indexOf('duration') > -1)) {
                continue;
            }

            if (prop === 'dateEnd') {
                task.duration = undefined;
            }

            task[prop] = newValue;

            if (prop === 'resources') {
                that._handleResources(task);

                //Filter out duplicates
                taskResources = taskResources.concat(that._getTaskResources(task, true));
                taskResources = taskResources.filter((r, index) => taskResources.indexOf(r) === index);

                if (!that._isUpdating && that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    // that._highlightAssignedItem('resource', that.$.resourceTree.selectedIndexes[0]);
                    that._highlightAssignedItem('resource', that._resources.indexOf(that._getItemByTreeIndex('resource', that.$.resourceTree.selectedIndexes[0])))
                }
            }

            if (task.type === 'milestone' && (prop === 'dateStart' || prop === 'dateEnd')) {
                task.dateEnd = task.dateStart = newValue;
            }
        }

        //task.duration = undefined;
        that._validateTaskProperties(task, task.$.project);

        if (task.type === 'project' && task.tasks.length && task.hidden) {
            task.tasks.forEach(t => t.hidden = task.hidden);
        }

        //Handles 'hidden' property
        that._synchronizeProjectVisibility(task.$.project, task);

        //Resource view. Refresh the timeline
        if (that.view !== 'resource' && that._view !== undefined) {

            if (that._isUpdating) {
                //Revert the connections to their original state
                if (that.__tasks) {
                    that.__tasks.forEach(task => task.connections.forEach(con => {
                        const targetIndex = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]);

                        if (targetIndex > -1) {
                            con.target = targetIndex
                        }
                    }));
                }

                that._isUpdating.type['task'] = true;
                return;
            }

            that._refreshTimeline();
            that._refreshTaskResources(task, taskResources);
            that.$.fireEvent('itemUpdate', { type: 'task', item: that._cloneObject(task) });
            return;
        }

        if (that._isUpdating) {
            that._isUpdating.type['task'] = true;
            return;
        }

        if (isSorted) {
            that._sortTasks();
            that.$.fireEvent('itemUpdate', { type: 'task', item: that._cloneObject(task) });
            return;
        }

        if (isTaskHidden !== task.hidden) {
            that._taskAPIManipulation = true;
            that._createTreeColumns(that.$.taskTreeSplitter);

            //Deletes the last hovered task
            delete that._hoveredTimelineTask;

            //Timeline Task cells
            that.$.taskTimelineCellsContainer.innerHTML = '';

            //Timeline Connections
            that.$.timelineConnectionsContainer.innerHTML = '';

            //Timeline Tasks
            that.$.timelineTasksContainer.innerHTML = '';

            that._createTimeline();
            that._setAriaControls();
            delete that._taskAPIManipulation;
            that._applySelection();

            if (task.resources.length) {
                that._highlightAssignedItem('resource', that._resources.indexOf(that._getItemByTreeIndex('resource', that.$.resourceTree.selectedIndexes[0])))
            }
        }
        else {
            //that._removeConnection(index);
            that._setTaskBarProgress(task);
            that._setTaskBarLabel(task);

            //Refresh the timeline cells
            that._refreshTimeline(that.view);

            //Update the Task Columns
            that._refreshTreeColumnsData(task);

            //Refresh the connections of the Task
            that._refreshTaskConnections(task);

            //Re-schedule if needed
            that._autoSchedule();
        }

        // that._ensureVisible(task);

        const currentlySelectedTasks = that.selectedIndexes.map(t => tasks[t]);

        if (selectedTasks.includes(task) && !currentlySelectedTasks.includes(task)) {
            //Select the new Task
            that._taskAPIManipulation = true;
            that._select('task', task);
            delete that._taskAPIManipulation;
        }

        that._refreshTaskResources(task, taskResources);

        that.$.fireEvent('itemUpdate', { type: 'task', item: that._cloneObject(task) });
    }

    _insertTimelineTask(index, item, insertAsLastItem) {
        const that = this;

        that._taskAPIManipulation = true;

        const selectedTasks = that.selectedIndexes.map(t => that._tasks[t]);

        that._sortItems();

        //Insert a new Task Tree item
        that._insertNewTreeItem(index, item, insertAsLastItem, 'task');

        //Remove current Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';
        delete that._hoveredTimelineTask;

        //Remove current Timeline Connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        that._createTimeline();

        if (item.type === 'project') {
            that._refreshProject(item);
        }
        else {
            that._refreshProject(item.$.project);
        }

        that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)));
        that._applySelection();

        delete that._taskAPIManipulation;
    }

    /**
     * Removes a Task
     */
    removeTask(index) {
        const that = this;

        let tasks = (that._unsortedTasks || that._tasks).slice(0), targetTask;

        if (typeof index === 'string') {
            targetTask = tasks.find((task) => task.id && task.id.toString() === arguments[0].toString());

            if (!targetTask) {
                targetTask = that._getItemByTreeIndex(that._unsortedTasks ? 'unsortedTask' : 'task', index);

                if (index !== that._getItemPath(targetTask, that._unsortedTasks ? 'unsortedTask' : 'task')) {
                    return;
                }
            }

            index = tasks.indexOf(targetTask);
        }
        else if (typeof index === 'number') {
            targetTask = tasks[index] || tasks.find((task) => task.id && task.id.toString() === index.toString());
        }
        else if (typeof index === 'object') {
            targetTask = tasks[that._getItemIndex(index, that._unsortedTasks ? 'unsortedTask' : 'task')];
        }
        else {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'insertTask', argumentName: 'index' }));
            return;
        }

        if (!targetTask) {
            //TODO: Throw out of bounds error
            return;
        }

        if (that.selectedIndexes.indexOf(index) > -1) {
            that._select('task', targetTask, true);
            that._highlightAssignedItem('task');
        }

        const selectedTasks = that.selectedIndexes.map(t => that._tasks[t]);

        that._unsortTasks();

        tasks = that._tasks;

        index = tasks.indexOf(targetTask);

        const taskEditor = that.$.taskPopupWindow;

        if (taskEditor && taskEditor._target === targetTask) {
            taskEditor.close();
        }

        //Resource view. Refresh the timeline
        if (that.view !== 'resource' && that._view !== undefined) {
            tasks = that._tasks; //that.__tasks;

            const updateTaskConnections = function (index) {
                //Refresh connection indexes
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];

                    if (!task.connections) {
                        continue;
                    }

                    for (let c = 0; c < task.connections.length; c++) {
                        let con = task.connections[c];

                        //Update the connectionTarget index
                        if (that._getTaskIndexById(con.target, tasks) >= index && typeof con.target === 'number') {
                            con.target -= 1;
                        }
                    }
                }
            }

            if (targetTask.type === 'project') {
                //Remove the connections targeting the tasks
                targetTask.tasks.forEach(t => {
                    that._removeConnectionsToTask(that._tasks.indexOf(t), that._tasks, targetTask.tasks)
                    that._refreshTaskResources(that._tasks.indexOf(t));
                });

                if (that.__tasks) {
                    //Revert the connections to their original state
                    that.__tasks.forEach(task => task.connections.forEach(con => {
                        const targetIndex = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]);

                        if (targetIndex > -1) {
                            con.target = targetIndex
                        }
                    }));
                }

                //Remove the tasks itself and update the connectionsId's of the rest tasks
                for (let i = 0; i < targetTask.tasks.length; i++) {
                    const subTaskIndex = tasks.indexOf(targetTask.tasks[i]);

                    //Updates the connections of the tasks
                    updateTaskConnections(subTaskIndex);
                    tasks.splice(subTaskIndex, 1);
                }
            }
            else {
                //Remove the connections targeting the tasks
                that._removeConnectionsToTask(that._tasks.indexOf(targetTask), that._tasks, [targetTask]);

                if (that.__tasks) {
                    //Revert the connections to their original state
                    tasks.forEach(task => task.connections.forEach(con => con.target = tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)])));
                }

                updateTaskConnections(tasks.indexOf(targetTask));
            }

            tasks.splice(tasks.indexOf(targetTask), 1);

            if (targetTask.$._project) {
                targetTask.$._project.tasks.splice(targetTask.$._project.tasks.indexOf(targetTask), 1 + (targetTask.tasks ? targetTask.tasks.length : 0));
            }
            else if (!that.__tasks && targetTask.$.project) {
                let targetProject = targetTask.$.project;

                while (targetProject) {
                    targetProject.tasks.splice.apply(targetProject.tasks, [targetProject.tasks.indexOf(targetTask), 1 + (targetTask.tasks ? targetTask.tasks.length : 0)]);
                    targetProject = targetProject.$.project;
                }

                that._refreshProject(targetTask.$.project);
            }

            if (that._isUpdating) {
                that._isUpdating.type['task'] = true;
                that._isUpdating.type['resource'] = true;
                return;
            }

            that._refreshTimeline();

            that._refreshTaskResources(targetTask);
            that.$.fireEvent('itemRemove', { type: 'task', item: that._cloneObject(targetTask) });
            return;
        }

        that._taskAPIManipulation = true;

        that._removeConnection(index);
        that._removeConnectionsToTask(index, tasks);

        let removedTasks = 1;

        if (targetTask.type === 'project') {
            const targetTasks = targetTask.tasks || [];

            //Remove connections of all related tasks
            for (let i = 0; i < targetTasks.length; i++) {
                const subTaskIndex = tasks.indexOf(targetTasks[i]);

                //Remove connections that target the subTask that's going to be removed
                that._removeConnectionsToTask(subTaskIndex, tasks, targetTasks);
                that._removeConnection(subTaskIndex);
            }

            //Remove all related tasks
            for (let i = 0; i < targetTasks.length; i++) {
                tasks.splice(tasks.indexOf(targetTasks[i]), 1);
                removedTasks++;
            }

            targetTask.tasks = [];
        }

        if (targetTask.$.project) {
            let targetProject = targetTask.$.project;

            while (targetProject) {
                targetProject.tasks.splice.apply(targetProject.tasks, [targetProject.tasks.indexOf(targetTask), 1 + (targetTask.tasks ? targetTask.tasks.length : 0)]);
                targetProject = targetProject.$.project;
            }
        }

        tasks.splice(tasks.indexOf(targetTask), 1);

        //Refresh connection indexes
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (task.connections) {
                for (let c = 0; c < task.connections.length; c++) {
                    const con = task.connections[c],
                        conTarget = that._getTaskIndexById(con.target);

                    if (conTarget >= index) {
                        //Delete the old connection elements from the container
                        const connectionContainer = that.$.timelineConnectionsContainer,
                            connections = connectionContainer.querySelectorAll('.lw-task-connection[connection-id^="' + (i >= index ? i + removedTasks : i) + '-' + conTarget + '"]');

                        for (let i = 0; i < connections.length; i++) {
                            connectionContainer.removeChild(connections[i])
                        }

                        //Update the connectionTarget index
                        if (typeof con.target === 'number') {
                            con.target -= removedTasks;
                        }
                    }
                }
            }
        }

        //Set the CSS variable for the content height. Used by the header's pseudo elements
        // that.$.container.style.setProperty('--lw-gantt-chart-task-timeline-content-height', that.$.taskTimelineCellsContainer.offsetHeight + 'px');
        that._tasks = tasks;

        if (that._isUpdating) {
            delete that._taskAPIManipulation;
            that._isUpdating.type['task'] = true;
            that._isUpdating.type['resource'] = true;
            return;
        }

        that._sortItems();

        //Remove current Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';
        delete that._hoveredTimelineTask;

        //Timeline Task cells
        that.$.taskTimelineCellsContainer.innerHTML = '';

        //Remove current Timeline Connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        //Recreates the timeline
        that._createTreeColumns(that.$.taskTreeSplitter);
        that._createTimeline();

        that._refreshProject(targetTask.$.project);

        that._createResourceTimeline();

        that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)));
        that._applySelection();

        delete that._taskAPIManipulation;
        // that._refreshTaskResources(targetTask);

        that.$.fireEvent('itemRemove', { type: 'task', item: that._cloneObject(targetTask) });
    }

    /**
     * Validate the arguments for removeConnection/createConnection methods
     * @param {any} taskStartIndex - index of the starting task
     * @param {any} taskEndIndex - index of the end task
     * @param {any} type - type of connection between tasks
     */
    _getValidConnectionId(taskStartIndex, taskEndIndex, type, methodName) {
        const that = this,
            tasks = that._tasks,
            isPrivateMethod = methodName.indexOf('_') === 0;
        let indexFromId;

        if (typeof taskStartIndex === 'string') {
            indexFromId = that._getTaskIndexById(taskStartIndex);

            if (indexFromId >= 0) {
                taskStartIndex = indexFromId;
            }
        }

        if (typeof taskEndIndex === 'string') {
            indexFromId = that._getTaskIndexById(taskEndIndex);

            if (indexFromId >= 0) {
                taskEndIndex = indexFromId;
            }
        }

        taskStartIndex = parseInt(taskStartIndex);
        taskEndIndex = parseInt(taskEndIndex);
        type = parseInt(type);

        if (isNaN(taskStartIndex) || isNaN(taskEndIndex) || taskStartIndex === taskEndIndex) {
            if (!isPrivateMethod) {
                that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: methodName, argumentName: 'taskIndex' }));
            }

            return;
        }

        if (taskStartIndex >= tasks.length || taskStartIndex < 0 || taskEndIndex >= tasks.length || taskEndIndex < 0) {
            if (!isPrivateMethod) {
                that.error(that.localize('outOfBounds', { elementType: that.nodeName.toLowerCase(), methodName: methodName, argumentName: 'taskIndex' }));
            }

            return;
        }

        if (isNaN(type) || type < 0 || type > 3) {
            if (!isPrivateMethod) {
                that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: methodName, argumentName: 'connectionType' }));
            }

            return;
        }

        if (isPrivateMethod) {
            return [taskStartIndex, taskEndIndex, type];
        }

        return taskStartIndex + '-' + taskEndIndex + '-' + type;
    }

    /**
     * Applies the new selection via that.selectedIndexes
     */
    _applySelection(oldValue) {
        const that = this,
            newSelection = that.selectedIndexes.slice(0);

        if (!that._tasks || !that._tasks.length) {
            that.set('selectedIndexes', []);
            return;
        }

        let previouslySelectedTasks = [];

        if (oldValue && oldValue.length > 0) {
            previouslySelectedTasks = oldValue.filter(taskIndex => that._tasks.filter(t => !t.hidden)[taskIndex]);
        }

        //Prevent 'change' event firing
        that._taskAPIManipulation = true;

        for (let i = 0; i < newSelection.length; i++) {
            let itemToSelect = newSelection[i];

            if (typeof itemToSelect === 'string' && itemToSelect.indexOf('.') > -1) {
                itemToSelect = that._getItemByTreeIndex('task', itemToSelect);
            }
            else {
                itemToSelect = that._tasks[itemToSelect];
            }

            if (itemToSelect && previouslySelectedTasks.indexOf(itemToSelect) < 0) {
                that._select('task', itemToSelect);
            }
        }

        if (!newSelection.length) {
            that._select('task');
        }

        delete that._taskAPIManipulation;

        if (oldValue && !that._noChangeEvent) {
            that.$.fireEvent('change', { value: newSelection, oldValue: oldValue });
        }
    }

    /**
     * Auto schedules the tasks according to their connections
     * @param {any} tasks
     */
    _autoSchedule(tasks) {
        const that = this,
            allTasks = that._tasks;

        if (!that.autoSchedule) {
            return;
        }

        if (!tasks) {
            tasks = allTasks;
        }
        else if (!Array.isArray(tasks)) {
            tasks = [tasks];
        }

        //Validate the tasks according to their connections
        for (let t = 0; t < tasks.length; t++) {
            const task = tasks[t];

            if (!(task.type === 'project' && task.synchronized)) {
                task.minDateStart = task.minDateEnd = undefined;
                that._autoScheduleTasks(task);
            }
        }

        if (!that._isUpdateRequired) {
            return;
        }

        //Recreate the timeline cells
        that._createTimelineCells();

        //update the Timeline tasks
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];

            if (task.hidden) {
                continue;
            }

            that._setTimelineTaskBar(task, true);
            that._refreshTaskConnections(task);
            that._refreshTreeColumnsData(task);
        }

        delete that._isUpdateRequired;
    }

    /**
     * Validates the dates of the tasks on autoSchedule
     * Info regarding Project(Project Management) lag: https://dhtmlx.com/blog/lead-lag-need-know-auto-scheduling-gantt/
     * @param {any} task - task
     * @param {any} connections - task's connections
     * @param {any} checkSubTasks - flag to indicate whether or not to validate it's sub tasks
     */
    _autoScheduleTasks(task) {
        const that = this,
            tasks = that._tasks,
            taskIndex = tasks.indexOf(task),
            subTaskConnections = task.connections;

        //Validates the timeline for loops connected to the task
        for (let i = 0; i < subTaskConnections.length; i++) {
            that._isAutoScheduled(task, tasks[that._getTaskIndexById(subTaskConnections[i].target)], true);
        }

        const connectedTasks = that._getConnectedTasks(taskIndex);
        let newDate, timeDiff, newMinDate;

        for (let c = 0; c < connectedTasks.length; c++) {
            const conTask = connectedTasks[c],
                connection = conTask.connections.find(con => that._getTaskIndexById(con.target) === taskIndex),
                conType = connection.type,
                conLag = connection.lag || 0;

            if (conTask.type === 'project' && conTask.synchronized) {
                continue;
            }

            if (conType === 0 || conType === 1) {
                //Note: Setting the minDateStart to take advantage of the minDateStart limiters during dragging
                newMinDate = new Date((conType === 0 ? conTask.dateStart : conTask.dateEnd).getTime() + conLag);
                task.minDateStart = new Date(task.minDateStart ? Math.max(task.minDateStart.getTime(), newMinDate.getTime()) : newMinDate);
                timeDiff = task.minDateStart.getTime() - task.dateStart.getTime();
                newDate = new Date(task.dateEnd.getTime() + (that.autoScheduleStrictMode ? timeDiff : Math.max(0, timeDiff)));

                if (newDate.getTime() !== task.dateEnd.getTime()) {
                    task.dateEnd = newDate;
                    that._isUpdateRequired = true;
                }

                if (that.autoScheduleStrictMode && task.minDateStart.getTime() !== task.dateStart.getTime()) {
                    task.dateStart = task.minDateStart;
                    that._isUpdateRequired = true;
                }
            }
            else {
                //Note: Setting the minDateEnd to take advantage ot the minDateStart limiters during dragging
                newMinDate = new Date((conType === 2 ? conTask.dateEnd : conTask.dateStart).getTime() + conLag);
                task.minDateEnd = new Date(task.minDateEnd ? Math.min(task.minDateEnd.getTime(), newMinDate.getTime()) : newMinDate);
                timeDiff = task.minDateEnd.getTime() - task.dateEnd.getTime();
                newDate = new Date(task.dateStart.getTime() + (that.autoScheduleStrictMode ? timeDiff : Math.max(0, timeDiff)));

                if (newDate.getTime() !== task.dateStart.getTime()) {
                    task.dateStart = newDate;
                    that._isUpdateRequired = true;
                }

                if (that.autoScheduleStrictMode && task.minDateEnd.getTime() !== task.dateEnd.getTime()) {
                    task.dateEnd = task.minDateEnd;
                    that._isUpdateRequired = true;
                }
            }

            //validate the dates of the task
            that._validateTaskProperties(task, task.$.project);
        }

        for (let t = 0; t < subTaskConnections.length; t++) {
            const subTask = tasks[subTaskConnections[t].target];

            if (subTask && !(subTask.type === 'project' && subTask.synchronized)) {
                subTask.minDateStart = subTask.minDateEnd = undefined;
                that._autoScheduleTasks(subTask);
            }
        }
    }

    /**
     * Returns the tasks that are connected to the target task
     * @param {any} taskId
     */
    _getConnectedTasks(taskId) {
        const that = this,
            tasks = that._tasks;

        if (!tasks || tasks.length === 0) {
            return;
        }

        let connectedTasks = [];

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i],
                connections = task.connections;

            if (connections) {
                for (let c = 0; c < connections.length; c++) {
                    if (connections[c].target === taskId) {
                        connectedTasks.push(task);
                    }
                }
            }
        }

        return connectedTasks;
    }

    /**
     * Restore the items from autoSchedule
     * @param {any} tasks - a timeline task
     * @param {any} conType - connection type to restore from
     */
    _autoScheduleRestore(tasks, conType) {
        const that = this,
            allTasks = that._tasks;

        if (!tasks) {
            tasks = allTasks;
        }

        if (!Array.isArray(tasks)) {
            tasks = [tasks];
        }

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (allTasks.indexOf(tasks[i]) > -1) {
                if (!conType) {
                    task.minDateStart = task.minDateEnd = undefined;
                }
                else {
                    conType === 0 || conType === 1 ? task.minDateStart = undefined : task.minDateEnd = undefined;
                }
            }
        }
    }

    /**
    * Handles autoScroll functionality
    * @param {any} event
    */
    _autoScroll(event) {
        const that = this;

        function continueOperation(coeff, isVerticallScroll) {
            if (!that._dragDetails) {
                clearInterval(that._scrollInterval);
                that._scrollInterval = undefined;
                delete that._autoScrolling;
                return;
            }

            that._autoScrolling = true;

            if (!isVerticallScroll) {
                that.scrollLeft -= (that.rightToLeft ? -1 : 1) * that.autoScrollStep * coeff;
                that._dragDetails.coordinates.x += that.autoScrollStep * coeff;
            }
            else {
                that.scrollTop -= that.autoScrollStep * coeff;
                that._dragDetails.coordinates.y += that.autoScrollStep * coeff;
            }

            if (that.hasAttribute('dragged')) {
                that._handleTaskBarDrag(event);
            }
            else if (that.hasAttribute('resized')) {
                that._handleTaskBarResize(event);
            }
        }

        if (that.disableAutoScroll || !event || (!that.hasAttribute('dragged') && !that.hasAttribute('resized') && !that.hasAttribute('connecting-task'))) {
            return;
        }

        const timelineRect = that.$.timeline.getBoundingClientRect();

        if (that._scrollInterval) {
            clearInterval(that._scrollInterval);
        }

        that._scrollInterval = setInterval(function () {
            //20px is the autoScroll zone size
            if ((that.scrollLeft || that.rightToLeft) && event.clientX <= timelineRect.left + 20) {
                continueOperation(1);
            }
            else if (that.scrollLeft !== (that.rightToLeft ? 0 : that.scrollWidth) && event.clientX >= timelineRect.left + timelineRect.width - 20) {
                continueOperation(-1);
            }
            else {
                if (that.scrollTop && event.clientY <= timelineRect.top + 20) {
                    continueOperation(1, true);
                }
                else if (that.scrollTop !== that.scrollHeight && event.clientY >= timelineRect.top + timelineRect.height - 20) {
                    continueOperation(-1, true);
                }
                else {
                    clearInterval(that._scrollInterval);
                    that._scrollInterval = undefined;
                    delete that._autoScrolling;
                }
            }
        }, 1);
    }

    /**
     * Checks if the Timeline Task is reziable or not
     * @param {any} timelineTask
     */
    _checkTaskBarResizability(event) {
        const that = this,
            tasks = that._tasks.filter(t => !t.hidden);
        let target = event.originalEvent.target;

        if (that.shadowRoot && target === that) {
            target = event.originalEvent.composedPath()[0];
        }

        const timeline = that.$.timeline;

        if (!target.closest) {
            timeline.removeAttribute('task-bar-hovered');
            return;
        }

        let timelineTaskCell = target.closest('.lw-timeline-task-cell') || target.closest('.lw-timeline-task'), timelineTask;

        if (that.disabled || that.disableTaskResize || !timelineTaskCell || !timeline.contains(timelineTaskCell)) {
            timeline.removeAttribute('task-bar-hovered');
            return;
        }

        if (timelineTaskCell.classList.contains('lw-timeline-task-cell')) {
            timelineTask = that.$.timelineTasksContainer.children[tasks.indexOf(timelineTaskCell._task)];
        }
        else if (timelineTaskCell.classList.contains('lw-timeline-task')) {
            timelineTask = timelineTaskCell;
            timelineTaskCell = that.$.taskTimelineCellsContainer.children[tasks.indexOf(timelineTaskCell._task)];
        }

        //execute if (timelineTask && !timelineTask._task.synchronized && !timelineTask._task.disableResize)
        if (!timelineTask || timelineTask.classList.contains('milestone') || (timelineTask._task.synchronized || timelineTask._task.disableResize)) {
            return;
        }

        if (target.classList && target.classList.contains('lw-task-connection-point')) {
            timeline.removeAttribute('task-bar-hovered');
            return;
        }

        const pageX = event.pageX - window.pageXOffset,
            minOffset = that.resizeHandlesVisibility === 'visible' || LW.Utilities.Core.isMobile ? 20 : 5,
            taskBarRect = timelineTask.getBoundingClientRect(),
            taskRect = timelineTaskCell.getBoundingClientRect(),
            distanceStart = Math.min(minOffset, pageX - taskRect.left),
            distanceEnd = Math.min(minOffset, taskRect.left + taskRect.width - pageX);

        if (Math.round(taskBarRect.left) + distanceStart >= pageX && Math.round(taskBarRect.left) - distanceStart <= pageX) {
            timeline.setAttribute('task-bar-hovered', 'left');
        }
        else if (Math.round(taskBarRect.left + taskBarRect.width) + distanceEnd >= pageX &&
            Math.round(taskBarRect.left + taskBarRect.width) - distanceEnd <= pageX) {
            timeline.setAttribute('task-bar-hovered', 'right');
        }
        else {
            timeline.removeAttribute('task-bar-hovered');
        }
    }

    /**
     * Executes specific functions when a specific style is loaded insnide ShadowDOM
     */
    _onShadowDomLoaded(target, styleName, handler) {
        function checkLoadedStyles() {
            const linkElements = (target.shadowRoot || target.getRootNode()).querySelectorAll('link');

            for (let i = 0; i < linkElements.length; i++) {
                if (linkElements[i].href.indexOf(styleName) !== -1) {
                    handler()
                    return;
                }
            }

            requestAnimationFrame(checkLoadedStyles);
        }

        requestAnimationFrame(checkLoadedStyles);
    }

    /**
     * Opens the popupWindow
     */
    _openPopupWindow(target, isConfirmWindow) {
        const that = this;

        function configureWindow() {
            function positionWindow() {
                //Positions the windiow in the center always
                const rect = that.getBoundingClientRect();

                popupWindow.style.left = Math.max(rect.left + window.pageXOffset, (rect.left + window.pageXOffset + rect.width / 2 - popupWindow.offsetWidth / 2)) + 'px';
                popupWindow.style.top = Math.max(rect.top + window.pageYOffset, (rect.top + window.pageYOffset + rect.height / 2 - popupWindow.offsetHeight / 2)) + 'px';

                if (popupWindow.opened) {
                    popupWindow.bringToFront();
                    popupWindow._handleActiveState();
                }
                else {
                    popupWindow.open();
                }
            }

            //Set the Content for the Window
            if (that.popupWindowCustomizationFunction) {
                that.popupWindowCustomizationFunction(popupWindow, type,
                    target.classList.contains('lw-task-connection') ? target.getAttribute('connection-id') : that._tasks.indexOf(target._task));
            }

            that._setPopupWindowTemplate('header', type, target);
            that._setPopupWindowTemplate('footer', type, target);
            that._setPopupWindowTemplate('content', type, target);

            if (!that._popupWindow[type + 'PopupWindow']) {
                const windowExtended = that['$' + type + 'PopupWindow'];

                windowExtended.unlisten('transitionend');
                windowExtended.unlisten('open');
                windowExtended.unlisten('close');
                windowExtended.unlisten('closing');
                windowExtended.unlisten('click');

                //Bind to events
                windowExtended.listen('transitionend', that._popupWindowTransitionendHandler.bind(that));
                windowExtended.listen('open', that._popupWindowOpenHandler.bind(that));
                windowExtended.listen('close', that._popupWindowCloseHandler.bind(that));
                windowExtended.listen('closing', that._popupWindowClosingHandler.bind(that));
                windowExtended.listen('click', that._popupWindowClickHandler.bind(that));
            }

            if (popupWindow.shadowRoot) {
                //The styles for the input
                popupWindow.importStyle(LW.Utilities.Core.getScriptLocation() + LW.StyleBaseUrl.replace('/scoped/', '/lw.textbox.css'));

                that._onShadowDomLoaded(popupWindow, 'lw.window.css', positionWindow);
            }
            else {
                positionWindow();
            }

            //Set Aria to indicate the owner
            const ariaOwns = (that.getAttribute('aria-owns') || '') + ' ' + popupWindow.id;

            that.setAttribute('aria-owns', ariaOwns.trim());

            that._popupWindow[type + 'PopupWindow'] = popupWindow;
        }

        if (!target) {
            return;
        }

        const type = isConfirmWindow ? 'confirm' : (target.classList.contains('lw-task-connection') ? 'connection' : 'task'),
            popupWindow = that._createPopupWindow(type);

        if (!isConfirmWindow) {
            const isOpeningEventPrevented = that.$.fireEvent('opening', { target: popupWindow, type: type }).defaultPrevented;

            if (isOpeningEventPrevented) {
                return;
            }
        }

        //Used to destinguish the windows. Target can be a connection or a task
        popupWindow._target = target;

        if (!that._popupWindow) {
            that._popupWindow = {};
        }

        if (!popupWindow.parentElement) {
            that.getShadowRootOrBody().appendChild(popupWindow);
        }

        if (!popupWindow.isCompleted) {
            popupWindow.whenReady(() => configureWindow());
        }
        else {
            configureWindow();
        }
    }

    /**
     * Creates the Popup Window for task/connection editing
     */
    _createPopupWindow(type) {
        const that = this,
            windowName = type + 'PopupWindow';

        if (that.$[windowName]) {
            return that.$[windowName];
        }

        const popupWindow = document.createElement('lw-window');

        popupWindow.classList.add('lw-' + type + '-popup-window');
        popupWindow.classList.add('lw-gantt-chart-popup-window');

        //Configure
        popupWindow.setAttribute('lw-id', windowName);
        that.$[windowName] = popupWindow;
        that['$' + windowName] = LW.Utilities.Extend(popupWindow);

        //Set properties
        //popupWindow.modal = true;
        popupWindow.rightToLeft = that.rightToLeft;
        popupWindow.theme = that.theme;
        popupWindow.animation = that.animation;
        popupWindow.disableSnap = true;
        popupWindow.headerButtons = ['close'];

        //Bind properties
        //that.addPropertyBinding('[[pager_navigationButtons_position]]', 'navigationButtonsPosition', popupwindow);

        return popupWindow;
    }

    /**
     * PopupWindow Open event handler
     */
    _popupWindowOpenHandler(event) {
        const that = this,
            targetWindow = that['$' + event.target.getAttribute('lw-id')];

        if (targetWindow) {
            that._handleModal(true);
            that.$.fireEvent(event.type, event.detail);
            targetWindow.unlisten('open');
        }
    }
    /**
     * PopupWindow Closing event handler
     */
    _popupWindowClosingHandler(event) {
        const that = this,
            windowName = event.target.getAttribute('lw-id'),
            targetWindow = that['$' + windowName];

        if (!targetWindow) {
            return;
        }

        const windowType = event.target.classList.contains('lw-confirm-popup-window') ? 'confirm' :
            (event.target.classList.contains('lw-connection-popup-window') ? 'connection' : 'task');

        if (that.$.fireEvent(event.type, { target: event.target, type: windowType }).defaultPrevented) {
            event.preventDefault();
            return;
        }

        targetWindow.unlisten(event.type);
    }

    /**
     * PopupWindow Close event handler
     */
    _popupWindowCloseHandler(event) {
        const that = this,
            windowName = event.target.getAttribute('lw-id'),
            targetWindow = that['$' + windowName];

        if (targetWindow) {
            that._handleModal();
            that.$.fireEvent(event.type, event.detail);
            targetWindow.unlisten('close');
            targetWindow.unlisten('click');

            //Remove the Aria for the ownership of the window
            if (that.hasAttribute('aria-owns')) {
                const ariaOwns = that.getAttribute('aria-owns').replace(that._popupWindow[windowName].id, '').trim();

                ariaOwns ? that.setAttribute('aria-owns', ariaOwns) : that.removeAttribute('aria-owns');
            }

            delete that._popupWindow[windowName];

            //Focus the original popupWindow
            const popupWindows = Object.keys(that._popupWindow);

            if (popupWindows.length === 1 && that._popupWindow.confirmPopupWindow) {
                delete that._popupWindow.confirmPopupWindow._target;
                that._popupWindow.confirmPopupWindow.close();
                return;
            }

            if (windowName === 'confirmPopupWindow' && popupWindows.length) {
                requestAnimationFrame(() => {
                    const lastVisibleWindow = that._popupWindow[popupWindows[popupWindows.length - 1]];

                    if (lastVisibleWindow) {
                        lastVisibleWindow.focus();
                    }
                });
            }
        }
    }

    /**
     * PopupWindow Transitionend Event Handler
     */
    _popupWindowTransitionendHandler(event) {
        const that = this,
            targetWindow = event.target;

        //Removes the popupWindow from the DOM when it's closed
        if (targetWindow instanceof LW.Window && !targetWindow.opened && event.propertyName === 'visibility') {

            that['$' + targetWindow.getAttribute('lw-id')].unlisten('transitionend');

            if (targetWindow.parentElement) {
                targetWindow.parentElement.removeChild(targetWindow);
            }
        }
    }

    /**
     * Handles the modal
     * @param {any} open
     */
    _handleModal(open) {
        const that = this;

        let modal = (that.shadowRoot || that).querySelector('.lw-popup-window-modal');

        if (open) {
            if (!modal) {
                //Create the modal for the element
                modal = document.createElement('div');
                modal.classList.add('lw-popup-window-modal');
            }

            if (!modal.parentElement) {
                that.$.container.appendChild(modal);
                that.setAttribute('modal', '');
            }
        }
        else if (modal && modal.parentElement && Object.keys(that._popupWindow).length < 2) {
            modal.parentElement.removeChild(modal);
            that.removeAttribute('modal');
        }
    }

    /**
    * Creates a Task Editor for the Task Popup Window
    */
    _createTaskEditor(column, task, editorContainers) {
        const that = this,
            label = column.value,
            value = task[column.value];
        let editorContainer = editorContainers.find(cont => cont._label === label),
            labelElement, editElement;

        if (editorContainer) {
            labelElement = editorContainer.firstElementChild;
            editElement = editorContainer.lastElementChild;
        }
        else {
            editorContainer = document.createElement('div');

            editorContainer.classList.add('lw-gantt-chart-popup-window-editor');
            editorContainer._label = label;

            if (column.customEditor) {
                editorContainer.appendChild(column.customEditor(label, value));
                return editorContainer;
            }

            labelElement = document.createElement('label');

            if (!labelElement.id) {
                labelElement.id = 'editorLabel' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            if (typeof value === 'number' || typeof value === 'string') {
                editElement = document.createElement('input');
                editElement.classList.add('lw-input');
            }
            else if (value instanceof Date) {
                if (LW.DateTimePicker) {
                    editElement = document.createElement('lw-date-time-picker');
                    editElement.locale = that.locale;
                    editElement.dropDownAppendTo = 'body';
                    editElement.calendarButton = true;
                    editElement.dropDownDisplayMode = 'auto';
                    editElement.enableMouseWheelAction = true;
                    editElement.formatString = 'yyyy-MMM-dd HH:mm:ss';
                }
                else {
                    editElement = document.createElement('input');
                    editElement.type = 'datetime-local';
                    //editElement.pattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}'; //Standart JS pattern
                }
            }
            else if (Array.isArray(value)) {
                if (LW.DropDownList) {
                    editElement = document.createElement('lw-drop-down-list');
                    editElement.virtualized = true;
                    editElement.dropDownAppendTo = 'body';
                    editElement.selectionMode = 'zeroOrMany';
                }
                else {
                    editElement = document.createElement('input');
                    editElement.classList.add('lw-input');

                    const dataList = document.createElement('datalist');

                    dataList.id = 'resourceList';
                    editElement.setAttribute('list', dataList.id);
                    editorContainer.appendChild(dataList);
                }
            }

            if (editElement) {
                editElement.setAttribute('aria-labelledby', labelElement.id);
            }
        }


        if (!editorContainer.parentElement) {
            editorContainer.appendChild(labelElement);
            editorContainer.appendChild(editElement);

            return editorContainer;
        }

        //Set the content now because the editors are already in the DOM
        that._setPopupWindowEditors(column, task, editorContainer);
    }

    /**
    * Sets the aria-controls property to the task bars and their representing Tree tasks
    */
    _setAriaControls(type) {
        const that = this;

        //Sets are to the Task Bars
        function setArialControls(items) {
            const timelineTasks = that.$.timelineTasksContainer.children;

            for (let i = 0; i < items.length; i++) {
                let item = items[i], taskBarControlled;

                if (item.path) {
                    taskBarControlled = timelineTasks[that._tasks.indexOf(that._getItemByTreeIndex(type, item.path))];
                }
                else {
                    taskBarControlled = timelineTasks[that._getTreeItemIndex(item)];
                    item = item.parentElement;
                }

                if (taskBarControlled) {
                    item.setAttribute('aria-controls', taskBarControlled.id);
                    taskBarControlled.setAttribute('aria-controls', ((taskBarControlled.getAttribute('aria-controls') || '') + ' ' + (item.id || '')).trim());
                }
            }
        }

        if (!type) {
            type = 'task';
        }

        const treeSplitterItems = that.$[`${type}TreeSplitter`]._items;

        for (let i = 0; i < treeSplitterItems.length; i++) {
            const splitterItem = treeSplitterItems[i];
            let items;

            if (that.$.taskTreeSplitterItem === splitterItem) {
                items = that.$.taskTree.querySelectorAll('lw-tree-item, lw-tree-items-group');
            }
            else {
                const dataContainer = splitterItem.querySelector(`.lw-${type}-tree-content`);

                if (!dataContainer) {
                    continue;
                }

                items = dataContainer.querySelectorAll(`.lw-${type}-label-container`);
            }

            setArialControls(items);
        }

        //if (!arguments.length) {
        //    that._setAriaControls('resource');
        //}
    }

    /**
     * Sets the value of the editors inside the Poup Window
     */
    _setPopupWindowEditors(column, targetTask, editorContainer) {
        const that = this,
            labelElement = editorContainer.firstElementChild,
            editElement = editorContainer.lastElementChild,
            label = (column.value + '').split(/(?=[A-Z])/).join(' '),
            value = targetTask[column.value];

        if (!column.customEditor) {
            labelElement.innerHTML = that.localize(column.value) || label.charAt(0).toUpperCase() + label.slice(1);

            if (typeof value === 'number') {
                editElement.value = parseFloat(value.toFixed(2));
            }
            else if (typeof value === 'string') {
                editElement.value = value;
            }
            else if (value instanceof Date) {
                editElement.value = new Date(value);
            }
            else if (Array.isArray(value)) {
                const resources = that._resources;

                editElement.placeholder = that.localize('unassigned');

                if (LW.DropDownList && editElement instanceof LW.DropDownList) {
                    editElement.dataSource = resources.map(res => {
                        return { label: res.label, value: res.id }
                    });
                    editElement.selectedValues = targetTask.disableResources ? [] : targetTask.resources.map(res => res.toString());
                }
                else {
                    let dataList = editorContainer.querySelector('datalist'),
                        fragment = document.createDocumentFragment();

                    dataList.innerHTML = '';

                    for (let i = 0; i < resources.length; i++) {
                        const res = resources[i],
                            option = document.createElement('option');

                        option.value = res.id;
                        option.innerHTML = res.label;

                        fragment.appendChild(option);
                    }

                    editElement.value = targetTask.resources.toString();
                    dataList.appendChild(fragment);
                }
            }

            if (targetTask.type === 'project' && targetTask.synchronized && (label.toLowerCase().indexOf('date') > -1 || label.toLowerCase().indexOf('duration') > -1) ||
                (label === 'resources' && targetTask.disableResources)) {
                editElement.disabled = true;
            }
            else {
                editElement.disabled = false;
            }

            //'disableEdit' determines whether the editor is disabled or not for the column
            editElement.disabled = !!column.disableEdit;
            editElement.rightToLeft = that.rightToLeft;
            editElement.animation = that.animation;
            editElement.theme = that.theme;
        }
        else if (column.setCustomEditorValue) {
            column.setCustomEditorValue(editorContainer, label, value);
        }
    }

    /**
     * Sets the content for the Popup Windows
     * @param {any} type
     * @param {any} target
     */
    _setPopupWindowContent(type, target) {
        const that = this,
            popupWindow = that.$[type + 'PopupWindow'],
            targetTask = target._task,
            editorContainers = [].slice.call(popupWindow.getElementsByClassName('lw-gantt-chart-popup-window-editor'));

        if (!popupWindow.content || (popupWindow.content.innerHTML && !editorContainers.length)) {
            return;
        }

        if (type === 'task' && targetTask) {
            const taskColumns = that.taskColumns;

            for (let i = 0; i < taskColumns.length; i++) {
                const col = taskColumns[i];

                if (targetTask[col.value] === undefined) {
                    continue;
                }

                const newEditor = that._createTaskEditor(col, targetTask, editorContainers);

                if (newEditor) {
                    popupWindow.appendChild(newEditor);

                    //Set the value of the editors here because now they are in the DOM
                    that._setPopupWindowEditors(col, targetTask, newEditor);
                }
            }

            //Accessibility
            if (target.id) {
                popupWindow.setAttribute('aria-controls', target.id);
            }
        }
        else if (type === 'confirm') {
            popupWindow.innerHTML = '<div class="lw-gantt-chart-popup-window-editor">' + that.localize('confirm', { componentName: 'The task' }) + '</div >';

            //Accessibility
            if (that._popupWindow) {
                const popupWindows = Object.keys(that._popupWindow);

                popupWindow.setAttribute('aria-controls', that._popupWindow[popupWindows[popupWindows.length - 1]].id);
            }
        }
        else {
            const conDetails = target.getAttribute('connection-id').split('-'),
                taskStart = that._tasks[conDetails[0]],
                taskEnd = that._tasks[conDetails[1]];

            popupWindow.innerHTML = '<div class="lw-gantt-chart-popup-window-editor">' + that.localize('deleteLink') +
                '<b> ' + taskStart.label + ' - ' + taskEnd.label + '?</b></div>'
        }
    }

    /**
     * Returns the template for the Popup Window
     * @param {any} section - the section of the Window
     * @param {any} type - type of content for the Window
     */
    _setPopupWindowTemplate(section, type, target) {
        const that = this,
            popupWindow = that.$[type + 'PopupWindow'];

        if (section === 'content') {
            that._setPopupWindowContent(type, target);
            return;
        }

        if (!popupWindow[section + 'Template']) {
            popupWindow[section + 'Template'] = that._createPopupWindowTemplate(section, type, target);
        }

        //Update the content of the template
        if (section === 'header' && target && target._task) {
            const label = (popupWindow.shadowRoot || popupWindow).querySelector('.lw-popup-window-label');

            if (label) {
                label.innerHTML = target._task.label
            }

            //const dateStart = target._task.dateStart,
            //    dateEnd = target._task.dateEnd;

            //if (!dateStart || !dateEnd) {
            //    template.innerHTML = '';
            //}

            //const dayFormat = ['2-digit', 'numeric'][that.dayFormat] || 'numeric';

            //template.innerHTML = dateStart.toLocaleDateString(that.locale, { day: dayFormat, month: that.monthFormat, year: that.yearFormat }) + ' - ' +
            //    dateEnd.toLocaleDateString(that.locale, { day: dayFormat, month: that.monthFormat, year: that.yearFormat });
        }
        else if (section === 'footer') {
            const buttons = (popupWindow.shadowRoot || popupWindow).querySelectorAll('.lw-popup-window-button');

            for (let b = 0; b < buttons.length; b++) {
                const button = buttons[b];

                //Avoids problems when ShadowDOM is applied
                button.innerHTML = type === 'task' ? '<span class="lw-icon"></span>' : '';
                button.theme = that.theme;
                button.rightToLeft = that.rightToLeft;
                button.animation = that.animation;

                if (button.classList.contains('ok')) {
                    button.innerHTML += that.localize('ok');
                    button.setAttribute('aria-label', 'ok');
                }
                else if (button.classList.contains('cancel')) {
                    button.innerHTML += that.localize('cancel');
                    button.setAttribute('aria-label', 'cancel');
                }
                else if (button.classList.contains('delete')) {
                    button.innerHTML += that.localize('delete');
                    button.setAttribute('aria-label', 'delete');
                }

                //Remove ripple element left from incomplete animation
                const unfinishedRippleElement = button.querySelector('.lw-ripple');

                if (unfinishedRippleElement) {
                    unfinishedRippleElement.parentElement.removeChild(unfinishedRippleElement);
                }
            }
        }
    }

    /**
     * Creates the Template for the corresponding section of the popupWindow
     */
    _createPopupWindowTemplate(section, type) {
        const that = this,
            template = document.createElement('template');

        if (section === 'footer') {
            switch (type) {
                case 'task':
                    template.innerHTML =
                        `<lw-button class="lw-popup-window-button ok primary"
                            animation="${that.animation}" theme="${that.theme}" ${that.rightToLeft ? 'right-to-left' : ''}>
                        </lw-button>
                        <lw-button class="lw-popup-window-button cancel"
                            animation="${that.animation}" theme="${that.theme}" ${that.rightToLeft ? 'right-to-left' : ''}>
                        </lw-button>
                        <lw-button class="lw-popup-window-button delete secondary"
                            animation="${that.animation}" theme="${that.theme}" ${that.rightToLeft ? 'right-to-left' : ''}>
                        </lw-button>`;
                    break;
                case 'connection':
                case 'confirm':
                    template.innerHTML =
                        `<lw-button class="lw-popup-window-button ok primary"
                            animation="${that.animation}" theme="${that.theme}" ${that.rightToLeft ? 'right-to-left' : ''}>
                        </lw-button>
                    <lw-button class="lw-popup-window-button cancel"
                        animation="${that.animation}" theme="${that.theme}" ${that.rightToLeft ? 'right-to-left' : ''}>
                    </lw-button>`;
                    break;
            }
        }
        else if (section === 'header' && (type === 'task' || type === 'confirm')) {
            template.innerHTML = '<span class="lw-popup-window-label"></span>';
        }

        return template;
    }

    /**
     * Click Handler for the Popup Window
     * @param {any} event
     */
    _popupWindowClickHandler(event) {
        const that = this;
        let target = (event.originalEvent || event).target;

        if (target.shadowRoot) {
            target = (event.originalEvent || event).composedPath()[0];
        }

        const popupWindow = target.closest('lw-window') || (target.getRootNode() && target.getRootNode().host ? target.getRootNode().host : undefined),
            popupWindowTarget = popupWindow._target;

        if (target.closest('.lw-popup-window-button.cancel')) {
            if (that._popupWindow && that._popupWindow.confirmPopupWindow && popupWindow !== that._popupWindow.confirmPopupWindow) {
                that._popupWindow.confirmPopupWindow.close();
            }

            popupWindow.close();

            delete popupWindow._target;
            return;
        }

        if (target.closest('.lw-popup-window-button.ok')) {
            if (popupWindow === that.$.connectionPopupWindow && popupWindowTarget.classList.contains('lw-task-connection')) {
                that._removeConnection(popupWindowTarget);
            }
            else if (popupWindow === that.$.confirmPopupWindow) {
                if (popupWindowTarget._task.$._resourceId !== undefined) {
                    that.removeResource(popupWindowTarget._task.$._resourceId)
                }
                else {
                    that.removeTask(that._tasks.indexOf(popupWindowTarget._task));
                }

                popupWindow.close();

                if (that.$.taskPopupWindow) {
                    that.$.taskPopupWindow.close();
                }

                delete popupWindow._target;
            }
            else {
                const editors = (popupWindow.shadowRoot || popupWindow).querySelectorAll('.lw-gantt-chart-popup-window-editor');
                let taskDetails = {};

                for (let e = 0; e < editors.length; e++) {
                    const propName = editors[e]._label,
                        taskColumn = that.taskColumns.find(taskC => taskC.value === propName);

                    if (taskColumn.customEditor && taskColumn.getCustomEditorValue) {
                        taskDetails[propName] = taskColumn.getCustomEditorValue(editors[e]);
                    }
                    else {
                        const editor = editors[e].lastElementChild;
                        let editorValue;

                        if (LW.DateTimePicker && editor instanceof LW.DateTimePicker) {
                            editorValue = editor.value.toDate();
                        }
                        else if (editor instanceof HTMLInputElement && editor.type === 'datetime-local') {
                            editorValue = new Date(editor.value);
                        }
                        else if (LW.DropDownList && editor instanceof LW.DropDownList) {
                            editorValue = editor.selectedValues.slice(0);
                        }
                        else {
                            editorValue = editor.hasAttribute('list') ? editor.value.split(',').map(v => v.trim()) : editor.value;
                        }

                        if (editorValue instanceof Date && isNaN(editorValue.getTime())) {
                            editorValue = undefined;
                        }

                        if (editorValue !== undefined && editorValue !== null) {
                            taskDetails[propName] = editorValue;
                        }
                    }
                }

                if (popupWindowTarget._task.$._resourceId !== undefined) {
                    that.updateResource(popupWindowTarget._task.$._resourceId, taskDetails)
                }
                else {
                    that.updateTask(that._tasks.indexOf(popupWindowTarget._task), taskDetails);
                }
            }

            if (that._popupWindow && that._popupWindow.confirmPopupWindow && popupWindow !== that._popupWindow.confirmPopupWindow) {
                that._popupWindow.confirmPopupWindow.close();
            }

            popupWindow.close();

            delete popupWindow._target;
            return;
        }

        if (target.closest('.lw-popup-window-button.delete')) {
            that._openPopupWindow(popupWindow._target, true);
            return;
        }
    }

    /**
     * Creates the tasks object
     */
    _createTasks(dataSource, isCustomTaskList) {
        const that = this;

        if (!isCustomTaskList) {
            //Clear all tasks
            that.clearTasks();
        }

        let tasks = [];

        function loadTasks(source, project) {
            let projectTasks = [];

            if (source.length === 0) {
                return;
            }

            for (let d = 0; d < source.length; d++) {
                let task = source[d];

                if (typeof task !== 'object') {
                    continue;
                }

                task = that._validateTaskProperties(task, project);

                if (!task) {
                    continue;
                }

                task.$.project = project;

                if (task.tasks instanceof Array && task.tasks.length > 0) {
                    if (task.synchronized) {
                        task.dateStart = task.minDateStart = task.maxDateStart = undefined;
                        task.dateEnd = task.minDateEnd = task.maxDateEnd = undefined;
                    }

                    task.type = 'project';
                    task.tasks = loadTasks(task.tasks, task);

                    if (task.tasks.length === 0) {
                        delete task.tasks;
                    }
                    else {
                        task.hidden = !task.tasks.some(t => !t.hidden);

                        if (task.hidden) {
                            task.tasks.forEach(t => t.hidden = task.hidden);
                        }
                        else {
                            that._synchronizeProjectVisibility(project, task);
                        }
                    }
                }

                if (!task.type || ['project', 'task', 'milestone'].indexOf(task.type) < 0) {
                    task.type = 'task';
                }

                if (project && task.type === 'project' && task.tasks.length > 0) {
                    projectTasks.push(task);
                    projectTasks = projectTasks.concat(task.tasks);
                    continue;
                }

                if (!project) {
                    if (isCustomTaskList && task.type === 'project' && task.synchronized) {
                        tasks.push(task);
                    }
                    else if (task.dateStart && task.dateEnd && !isNaN(task.dateStart.getTime()) && !isNaN(task.dateEnd.getTime())) {
                        tasks.push(task);
                    }

                    if (task.tasks) {
                        tasks = tasks.concat(task.tasks);
                    }
                }

                projectTasks.push(task);
            }

            return projectTasks;
        }

        loadTasks(dataSource || that.dataSource);

        if (isCustomTaskList) {
            return tasks.slice(0);
        }

        that._tasks = tasks.slice(0);

        if (that.sortable) {
            that._sortTasks(true);
        }

        that._handleResources();
    }

    /**
     * Creates the Timeline according to the tasks
     */
    _createTimeline() {
        const that = this;

        if (!that._tasks || that._tasks.length === 0) {
            that._clearTasks();
            return;
        }

        delete that.__tasks;

        that._autoSchedule();

        that._createTimelineCells();

        that._prepareViewTasks(true);

        //--- Reset the timeline
        that._resetTimeline();
        // ---

        that._insertTimelineTasks(that._tasks);

        that.$.taskSplitter.refresh();

        //Update the resource properties
        //that._resources.forEach(r => that._refreshResource(r, 'capacity'));
    }

    /**
     * Inserts a new item into the Tree
     * @param {array} arguments - array of arguments
     */
    _insertNewTreeItem() {
        const that = this,
            [index, item, insertAsLastItem, itemType] = [...arguments];

        //Insert a new Resource Tree item
        const treeSplitterItems = that.$[`${itemType}TreeSplitter`]._items,
            tree = that.$[`${itemType}Tree`];

        for (let i = 0; i < treeSplitterItems.length; i++) {
            const splitterItem = treeSplitterItems[i];

            if (splitterItem.contains(tree)) {
                //Inserts a resource into a group
                if (insertAsLastItem) {
                    tree.insert(item, that._getItemPath(item, itemType));
                }
                else {
                    tree.insert(item, typeof index === 'number' ? tree.querySelectorAll('lw-tree-item, lw-tree-items-group')[index] : index);
                }
            }
            else {
                const dataContainer = splitterItem.getElementsByClassName(`lw-${itemType}-tree-content`)[0],
                    headerDetails = that[`${itemType}Columns`][i];

                if (!dataContainer || !headerDetails || !headerDetails.value) {
                    continue;
                }

                let targetColumnItem;

                if (insertAsLastItem) {
                    targetColumnItem = dataContainer.getElementsByClassName(`lw-${itemType}-item`)[index];

                    //Insert it inside the dropDown container of the targetItem
                    targetColumnItem.lastElementChild.appendChild(that._createTreeItemContainers([item], headerDetails, itemType));
                    continue;
                }

                targetColumnItem = dataContainer.getElementsByClassName(`lw-${itemType}-item`)[index];

                if (targetColumnItem) {
                    targetColumnItem.parentElement.insertBefore(that._createTreeItemContainers([item], headerDetails, itemType), targetColumnItem);
                }
                else {
                    dataContainer.appendChild(that._createTreeItemContainers([item], headerDetails, itemType));
                }
            }
        }
    }

    /**
     * Inserts Tasks / task cells into the Timeline and updates it
     * @param {any} tasks
     */
    _insertTimelineTasks(tasks, index, newItemsInsert) {
        const that = this,
            isTaskVisible = function (task) {
                let projectTask = task.$.project;

                while (projectTask) {
                    if (!projectTask.expanded) {
                        return false;
                    }

                    projectTask = projectTask.$.project;
                }

                return true;
            };
        let lazyLoadConnections = {};

        //Remove current Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';
        delete that._hoveredTimelineTask;

        for (let t = 0; t < tasks.length; t++) {
            const task = tasks[t],
                connections = task.connections;

            if (task.hidden) {
                continue;
            }

            that._createTimelineTask(task, index ? index + t : undefined);
            that._setTimelineTaskBar(task);
            that._setTaskBarProgress(task);
            that._setTaskBarLabel(task);

            if (newItemsInsert) {
                continue;
            }

            //Handles expanding/collapsing
            that._expandTask(task);

            if (!isTaskVisible(task)) {
                continue;
            }

            //Handle task connecting
            for (let c = 0; c < connections.length; c++) {
                const targetId = that._getTaskIndexById(connections[c].target);

                if (targetId === undefined || targetId === null || isNaN(targetId) || targetId < 0 || targetId >= tasks.length || targetId === t) {
                    connections.splice(connections.indexOf(connections[c]), 1);
                    continue;
                }

                const connectionId = t + '-' + targetId + '-' + connections[c].type;

                if (targetId > t) {
                    if (!lazyLoadConnections[targetId]) {
                        lazyLoadConnections[targetId] = [];
                    }

                    if (lazyLoadConnections[targetId].indexOf(connectionId) < 0) {
                        lazyLoadConnections[targetId].push(connectionId);
                    }

                    continue;
                }

                that._connectTask(connectionId);
            }

            if (lazyLoadConnections[t]) {
                for (let l = 0; l < lazyLoadConnections[t].length; l++) {
                    that._connectTask(lazyLoadConnections[t][l]);
                }

                delete lazyLoadConnections[t];
            }
        }

        that._refresh();

        //Avoid animation on Timeline redraw
        that.$.timelineViewCells.setAttribute('no-transition', '');

        //Set the CSS variable for the content height. Used by the header's pseudo elements
        that.$.container.style.setProperty('--lw-gantt-chart-task-timeline-content-height', that.$.taskTimelineCellsContainer.offsetHeight + 'px');

        requestAnimationFrame(() => that.$.timelineViewCells.removeAttribute('no-transition'));
    }

    /**
     * Ensures an item is always visible
     * @param {any} item
     */
    _ensureVisible(item, type = 'task') {
        const that = this;

        if (that._isEnsureVisibleCalled) {
            delete that._isEnsureVisibleCalled;
            return;
        }

        if (item === undefined || item === null) {
            return;
        }

        const items = that[`_${type}s`].filter(i => !i.hidden);
        let tree, itemIndex, treeItem;

        if (item instanceof HTMLElement) {
            tree = item.menu || item.closest('lw-tree');
            treeItem = item;
        }
        else if (!items || !items.length) {
            return;
        }

        if (!tree) {
            tree = that.$[`${type}Tree`];
        }

        const treeItems = Array.from(tree.querySelectorAll('lw-tree-item, lw-tree-items-group'));

        if (item instanceof HTMLElement) {
            itemIndex = treeItems.indexOf(treeItem);
        }
        else {
            itemIndex = items.indexOf(item);
        }

        if (itemIndex < 0) {
            return;
        }

        //Scrolls the Tree vertically
        if (treeItems.length) {
            if (typeof item === 'number') {
                treeItem = treeItems[Math.min(Math.max(0, item), treeItems.length - 1)];
            }

            if (!treeItem) {
                treeItem = typeof item === 'object' ? treeItems[itemIndex] : item;
            }

            //Prevents multiple invocation of the method
            that._isEnsureVisibleCalled = true;

            if (!tree._isBranchExpanded(treeItem)) {
                let treeGroup = treeItem.parentItem;

                while (treeGroup && !tree._isBranchExpanded(treeGroup)) {
                    treeGroup = treeGroup.parentItem;
                }

                if (treeGroup) {
                    treeItem = treeGroup;
                }
            }

            tree.ensureVisible(treeItem);

            if (!itemIndex) {
                itemIndex = treeItems.indexOf(treeItem);
            }
        }

        delete that._isEnsureVisibleCalled;

        let timelineCells, timelineContent, vScroll, scrollName;

        if (tree === that.$.taskTree) {
            [vScroll, timelineContent] = [that, that.$.timelineContent];
            [timelineCells, scrollName] = [that.$.taskTimelineCellsContainer, 'scrollTop'];
        }
        else {
            [vScroll, timelineContent] = [that.$.resourceVerticalScrollBar, that.$.resourceTimelineContent];
            [timelineCells, scrollName] = [that.$.resourceTimelineCellsContainer, 'value'];
        }

        const cell = timelineCells.children[itemIndex];

        if (!cell) {
            return;
        }

        if (cell.offsetTop + cell.offsetHeight > vScroll[scrollName] + timelineContent.offsetHeight) {
            vScroll[scrollName] = Math.max(0, cell.offsetTop + cell.offsetHeight - timelineContent.offsetHeight);
        }
        else if (cell.offsetTop < vScroll[scrollName]) {
            vScroll[scrollName] = Math.max(0, cell.offsetTop);
        }

        timelineContent.scrollTop = vScroll[scrollName];
    }

    /**
     * Expands/Collapses a timeline task.
     * @param {any} task - a Project task
     * @param {any} expand - flag indicating whether to expand or collapse.
     */
    _expandTask(task, expand) {
        const that = this;

        if (!task) {
            return true;
        }

        const projectTask = task.type === 'project' ? task : task.$.project;

        if (!projectTask || !projectTask.tasks || !projectTask.tasks.length) {
            return true;
        }

        //Reset the animation necessities
        that.$.timelineContent.style.minHeight = '';
        that.$.timelineContent.style.maxHeight = '';

        if (expand === undefined) {
            expand = projectTask.expanded;

            if (expand && expand === projectTask.expanded) {
                return true;
            }
        }
        else {
            if (!that._isTaskExpanded(projectTask)) {
                that._handleTaskItemExpanding(projectTask, expand);
                projectTask.expanded = expand;
                return;
            }

            //Animates the timeline during expanding/collapsing
            that._animateTimelineExpanding(projectTask, expand);
            return;
        }

        //Expand/Collapse a task
        that._handleExpanding(projectTask, expand);

        return projectTask.expanded;
    }

    /**
     * Handles the actual collapse/expand operation
     * @param {any} projectTask - the project task to be expanded
     * @param {any} expand - a flag indicating whether to expand or collapse
     */
    _handleExpanding(projectTask, expand) {
        const that = this,
            tasks = that._tasks.filter(t => !t.hidden),
            connectionsContainer = that.$.timelineConnectionsContainer,
            connections = [].slice.call(connectionsContainer.children),
            taskTimelineCellsContainerChildren = that.$.taskTimelineCellsContainer.children,
            timelineTasksContainerChildren = that.$.timelineTasksContainer.children,
            projectTasks = projectTask.tasks.filter(t => !t.hidden),
            taskBarHeight = parseFloat(window.getComputedStyle(that).getPropertyValue('--lw-gantt-chart-task-default-height')) || 0;
        let timelineContentHeight = that.$.taskTimelineCellsContainer.offsetHeight,
            taskIndex = 0;

        that._handleTaskItemExpanding(projectTask, expand);

        for (let t = 0; t < projectTasks.length; t++) {
            taskIndex = tasks.indexOf(projectTasks[t]);

            const taskBar = timelineTasksContainerChildren[taskIndex],
                timelineCell = taskTimelineCellsContainerChildren[taskIndex];

            if (!taskBar) {
                continue;
            }

            //Removes the connection lines
            for (let c = 0; c < connections.length; c++) {
                const con = connections[c],
                    conId = con.getAttribute('connection-id').split('-');

                if ((parseInt(conId[1]) === taskIndex || parseInt(conId[0]) === taskIndex) && con.parentElement) {
                    connectionsContainer.removeChild(con);
                }
            }

            if (expand) {
                if (!taskBar.classList.contains('lw-visibility-hidden')) {
                    continue;
                }

                const taskProject = taskBar._task.$.project;

                if (taskProject && taskProject !== projectTask && !that._isTaskExpanded(taskBar._task, projectTask)) {
                    continue;
                }

                //Show the taskBar and it's connections
                taskBar.classList.remove('lw-visibility-hidden');
                timelineCell.classList.remove('lw-visibility-hidden');

                //NOTE: calculating the Timeline height here. If not transitions will interfere with the calculation later.
                //Refresh the Height of the Timeline

                timelineContentHeight += taskBarHeight;

                that.$.container.style.setProperty('--lw-gantt-chart-task-timeline-content-height', timelineContentHeight + 'px');

                //Refreshes the connections
                that._refreshTaskConnections(taskBar);
            }
            else {
                if (taskBar.classList.contains('lw-visibility-hidden')) {
                    continue;
                }

                //Hide the taskBar and it's connections
                taskBar.classList.add('lw-visibility-hidden');
                timelineCell.classList.add('lw-visibility-hidden');

                timelineContentHeight -= taskBarHeight;

                //NOTE: calculating the Timeline height here. If not transitions will interfere with the calculation later.
                //Refresh the Height of the Timeline
                that.$.container.style.setProperty('--lw-gantt-chart-task-timeline-content-height', timelineContentHeight + 'px');
            }
        }

        //Update the top position of the tasks below the target
        for (let i = tasks.indexOf(projectTask) + 1; i < timelineTasksContainerChildren.length; i++) {
            //for (let i = taskIndex + 1; i < timelineTasksContainerChildren.length; i++) {
            const timelineTaskBar = timelineTasksContainerChildren[i];

            timelineTaskBar.style.top = (taskTimelineCellsContainerChildren[i].offsetTop) + 'px';

            //Refreshes the connections
            that._refreshTaskConnections(timelineTaskBar);
        }

        projectTask.expanded = expand;

        //Refresh the ScrollBars
        that._refresh();

        //lwTree and Splitter have lw-resize-trigger that add 2px to the overal height. So SplitterBar have to be recalculated
        //that.$.taskTreeSplitter._validateBarsSize();
        //that.$.mainSplitter._validateBarsSize();
    }

    /**
     * Handles expanding/collapsing of Task Tree column items
     * @param {any} projectTask - the project task to be expanded/collapsed
     * @param {any} expand - flag indicating whether to expand or collapse the task
     */
    _handleTaskItemExpanding(projectTask, expand) {
        const that = this,
            tasks = that._tasks.filter(t => !t.hidden),
            taskIndex = tasks.indexOf(projectTask),
            taskColumns = that.$.taskTreeSplitter._items,
            isProjectExpanded = that._isTaskExpanded(projectTask);

        function transitionendHandler(event) {
            const that = this;

            if (event.propertyName === 'visibility') {
                return;
            }

            that.style.height = '';
            that.removeEventListener('transitionend', transitionendHandler);
        }

        for (let i = 0; i < taskColumns.length; i++) {
            if (taskColumns[i] === that.$.taskTreeSplitterItem) {
                continue;
            }

            const taskItems = taskColumns[i].getElementsByClassName('lw-task-item');

            if (!taskItems.length || !taskItems[taskIndex]) {
                continue;
            }

            const dropDown = taskItems[taskIndex].lastElementChild;

            if (that._noAnimation || !that.hasAnimation || !isProjectExpanded) {
                expand ? dropDown.classList.remove('lw-visibility-hidden') : dropDown.classList.add('lw-visibility-hidden');
                continue;
            }

            //Necessary to see the full transitions
            requestAnimationFrame(function () {
                //NOTE: Height is 'auto' but we need a fixed height for the Transitions
                let childrenHeight = 0;

                for (let c = 0; c < dropDown.children.length; c++) {
                    childrenHeight += dropDown.children[c].offsetHeight;
                }

                dropDown.style.height = childrenHeight + 'px';
                dropDown.addEventListener('transitionend', transitionendHandler);

                if (expand) {
                    dropDown.classList.remove('lw-visibility-hidden');
                }
                else {
                    dropDown.classList.add('lw-visibility-hidden');

                    //Necessary because the start height is 'auto'
                    requestAnimationFrame(function () {
                        dropDown.style.height = '0';
                    });
                }
            });
        }
    }

    /**
     * Checks if a Task is expanded or not
     * @param {any} task
     */
    _isTaskExpanded(task, ignoredProject) {
        if (!task) {
            return;
        }

        let isExpanded,
            taskProject = task.$.project;

        if (!taskProject) {
            return true;
        }

        while (taskProject) {
            isExpanded = taskProject.expanded;

            if (!isExpanded) {
                return;
            }

            taskProject = taskProject.$.project;

            if (taskProject === ignoredProject) {
                break;
            }
        }

        return isExpanded;
    }

    /**
     * Handles keyboard hover/focus states of the Task Tree. Callback used inside Tree's keydown handler
     * @param {any} hoveredTreeitem
     */
    _hoverViaKeyboardCallback(hoveredTreeitem) {
        const that = this;

        //Unfocuses the Task Tree items
        that._unfocusTreeItems();

        if (!hoveredTreeitem) {
            return;
        }

        const tree = hoveredTreeitem.menu || hoveredTreeitem.closest('lw-splitter');
        let cellsContainer, aninationContainer, splitter, itemName;

        if (tree === that.$.taskTree) {
            [cellsContainer, aninationContainer] = [that.$.taskTimelineCellsContainer, that.$.timelineAnimationContainer];
            [splitter, itemName] = [that.$.taskTreeSplitter, 'task'];
        }
        else {
            [cellsContainer, aninationContainer] = [that.$.resourceTimelineCellsContainer, that.$.resourceTimelineAnimationContainer];
            [splitter, itemName] = [that.$.resourceTreeSplitter, 'resource'];
        }

        const itemIndex = Array.from(tree.querySelectorAll('lw-tree-item, lw-tree-items-group')).indexOf(hoveredTreeitem),
            timelineTaskCell = cellsContainer.children[itemIndex];

        if (timelineTaskCell) {
            timelineTaskCell.setAttribute('focus', '');
        }

        //Set focus state to the task inside the animation container
        if (!aninationContainer.classList.contains('lw-visibility-hidden')) {
            if (itemName === 'task') {
                const animationTasks = aninationContainer.getElementsByClassName(`lw-timeline-${itemName}`);

                for (let t = 0; t < animationTasks.length; t++) {
                    const animationTask = animationTasks[t];

                    if (that._tasks.indexOf(animationTask._task) === itemIndex) {
                        animationTask.setAttribute('focus', '');
                        break;
                    }
                }
            }
        }

        const taskSplitterItems = splitter._items;

        //set hover state
        for (let i = 0; i < taskSplitterItems.length; i++) {
            const taskSplitterItem = taskSplitterItems[i];

            if (taskSplitterItem !== that.$[itemName + 'TreeSplitterItem']) {
                //Unfocus last item
                const item = taskSplitterItem.getElementsByClassName(`lw-${itemName}-label-container`)[itemIndex];

                if (item) {
                    item.setAttribute('focus', '');
                }
            }
        }

        that._focusedItem = itemIndex;
    }

    /**
     * Unfocuses teh last focused Task Tree item.
     */
    _unfocusTreeItems(treeSplitter) {
        const that = this;

        function unfocusTreeItems(treeSplitter) {
            if (!that.$.mainSplitter.contains(treeSplitter)) {
                return;
            }

            const splitterItems = treeSplitter._items,
                [itemName, taskTimelineCellsContainer] = treeSplitter === that.$.taskTreeSplitter ?
                    ['task', that.$.taskTimelineCellsContainer] : ['resource', that.$.resourceTimelineCellsContainer];

            //remove focus state
            for (let i = 0; i < splitterItems.length; i++) {
                const splitterItem = splitterItems[i];

                if (splitterItem !== that.$[itemName + 'TreeSplitterItem']) {
                    const items = splitterItem.getElementsByClassName(`lw-${itemName}-label-container`);

                    for (let t = 0; t < items.length; t++) {
                        items[t].removeAttribute('focus');
                    }
                }
            }

            const timelineCells = taskTimelineCellsContainer.children;

            for (let i = 0; i < timelineCells.length; i++) {
                const cell = timelineCells[i];

                if (cell.hasAttribute('focus')) {
                    cell.removeAttribute('focus');
                }
            }

            if (itemName === 'task') {
                delete that._focusedItem;
            }
        }

        //Unfocus only the target Tree
        if (treeSplitter) {
            unfocusTreeItems(treeSplitter);
            return;
        }

        //Unfocus both Trees
        unfocusTreeItems(that.$.taskTreeSplitter);
        unfocusTreeItems(that.$.resourceTreeSplitter);
    }

    /**
     * Removes the content from the animation container
     */
    _emptyAnimationContainer() {
        const timelineAnimationChildren = this.$.timelineAnimationContainer.firstElementChild.children;

        for (let i = 0; i < timelineAnimationChildren.length; i++) {
            timelineAnimationChildren[i].firstElementChild.innerHTML = '';
            timelineAnimationChildren[i].lastElementChild.innerHTML = '';
        }
    }

    /**
     * Animates the Timeline during collapsing/expanding of tasks
     * @param {any} projectTask
     * @param {any} expand
     */
    _animateTimelineExpanding(projectTask, expand) {
        const that = this,
            timelineAnimationContainer = that.$.timelineAnimationContainer,
            timelineAnimationInnerContainer = timelineAnimationContainer.firstElementChild,
            contentBefore = timelineAnimationInnerContainer.children[0],
            contentAnimation = timelineAnimationInnerContainer.children[1],
            contentAfter = timelineAnimationInnerContainer.children[2];

        if (that.animation === 'none') {
            timelineAnimationContainer.classList.add('lw-visibility-hidden');
            that._emptyAnimationContainer();
            that._handleExpanding(projectTask, expand);
            return;
        }

        const tasks = that._tasks.filter(t => !t.hidden),
            timelineTasks = that.$.timelineTasksContainer.children,
            timelineConnections = that.$.timelineConnectionsContainer.children,
            isProjectTask = function (task) {
                let taskProject = task.$.project;

                while (taskProject) {
                    if (taskProject === projectTask) {
                        return true;
                    }

                    taskProject = taskProject.$.project;
                }
            },
            expandedProjectTasks = projectTask.tasks.filter(task => !task.hidden && (task.$.project === projectTask || that._isTaskExpanded(task, projectTask)));

        let taskIndex = tasks.indexOf(projectTask);
        const taskBarHeight = timelineTasks[taskIndex].offsetHeight,
            timelineContentOffsetTop = that.$.timelineContent.offsetTop;

        that._emptyAnimationContainer();

        //Set the initial state of the project task
        expand ? contentAnimation.classList.add('animate') : contentAnimation.classList.remove('animate');

        let contentBeforeTaskIndexes = [],
            contentAnimationIndexes = [],
            contentAfterIndexes = [],
            contentAnimationHeight = 0;

        //Fill with tasks
        for (let i = 0; i < timelineTasks.length; i++) {
            const task = timelineTasks[i],
                clone = task.cloneNode(true),
                timelineTaskIndex = tasks.indexOf(task._task),
                taskProject = task._task.$.project;

            //if (taskProject && taskProject !== projectTask && !taskProject.expanded) {
            if (taskProject && taskProject !== projectTask && !that._isTaskExpanded(task._task, projectTask)) {
                continue;
            }

            clone.style['margin' + (that.rightToLeft ? 'Right' : 'Left')] = clone.style[that.rightToLeft ? 'right' : 'left'];
            clone.classList.remove('lw-visibility-hidden');

            if (timelineTaskIndex <= taskIndex) {
                contentBefore.lastElementChild.appendChild(clone);
                contentBeforeTaskIndexes.push(timelineTaskIndex);
            }
            else if (isProjectTask(task._task)) {
                contentAnimation.lastElementChild.appendChild(clone);
                contentAnimationIndexes.push(timelineTaskIndex);
                contentAnimationHeight += clone.offsetHeight;
            }
            else {
                contentAfter.lastElementChild.appendChild(clone);
                contentAfterIndexes.push(timelineTaskIndex);
            }

            if (that._focusedItem !== undefined && that._focusedItem === taskIndex && timelineTaskIndex === taskIndex) {
                clone.setAttribute('focus', '');
            }
        }

        //Temporarly avoid transitions
        contentAnimation.style.transition = 'none';

        //NOTE: The order of execution is important for the Transition
        if (expand) {
            that._handleExpanding(projectTask, expand);
        }

        //Fill with connections
        for (let i = 0; i < timelineConnections.length; i++) {
            const con = timelineConnections[i],
                clone = con.cloneNode(),
                conId = clone.getAttribute('connection-id').split('-');

            if (contentBeforeTaskIndexes.indexOf(parseInt(conId[0])) > -1 && contentBeforeTaskIndexes.indexOf(parseInt(conId[1])) > -1) {
                contentBefore.firstElementChild.appendChild(clone);
            }
            else if (contentAnimationIndexes.indexOf(parseInt(conId[0])) > -1 && contentAnimationIndexes.indexOf(parseInt(conId[1])) > -1) {
                contentAnimation.firstElementChild.appendChild(clone);
            }
            else if (contentAfterIndexes.indexOf(parseInt(conId[0])) > -1 && contentAfterIndexes.indexOf(parseInt(conId[1])) > -1) {
                contentAfter.firstElementChild.appendChild(clone);
            }
        }

        //Position the connections to their target
        contentAnimation.firstElementChild.style.transform = 'translateY(-' + (contentBefore.offsetHeight) + 'px)';
        contentAfter.firstElementChild.style.transform = 'translateY(-' + (contentAnimationHeight + contentBefore.offsetHeight) + 'px)';

        //NOTE: The order of execution is important for the Transition
        let timelineContentHeight;

        if (!expand) {
            that._handleExpanding(projectTask, expand);
        }

        //Keep the original scrollTop to retrieve it after the animation
        that.$.timelineContent._scrollTop = that.$.timelineContent.scrollTop;

        timelineContentHeight = that.$.timelineContent.offsetHeight;

        if (timelineContentHeight !== timelineAnimationInnerContainer.offsetHeight) {
            that.$.timelineContent.style[(expand ? 'max' : 'min') + 'Height'] = timelineAnimationInnerContainer.offsetHeight + 'px';
        }

        //Position the animation container
        timelineAnimationContainer.style.top = timelineContentOffsetTop + 'px';
        timelineAnimationInnerContainer.style.top = (-that.scrollTop) + 'px';

        //Show the timeline animation container
        timelineAnimationContainer.classList.remove('lw-visibility-hidden');

        //Hide the Timeline tasks Container
        that.$.timelineContent.classList.add('lw-visibility-hidden');

        //Necessary to see the full transitions
        requestAnimationFrame(function () {
            //NOTE: Height is 'auto' but we need a fixed height for the Transitions
            contentAnimation.style.height = expandedProjectTasks.length * taskBarHeight + 'px';

            //Reset the transition
            contentAnimation.style.transition = '';

            if (expand) {
                contentAnimation.classList.remove('animate');
                that.$.timelineContent.style.maxHeight = timelineContentHeight + 'px';
            }
            else {
                contentAnimation.classList.add('animate');

                //Necessary because the start height is 'auto'
                requestAnimationFrame(function () {
                    contentAnimation.style.height = '0';
                    that.$.timelineContent.style.minHeight = timelineContentHeight + 'px';
                });
            }
        });
    }

    /**
     * Handles the timeline Animation container's transitionEnd event
     */
    _timelineAnimationContainerTransitionendHandler(event) {
        const that = this;

        if (event.propertyName === 'height') {
            const timelineAnimationContainer = that.$.timelineAnimationContainer;

            timelineAnimationContainer.classList.add('lw-visibility-hidden');
            that.$.timelineContent.classList.remove('lw-visibility-hidden');
            that._emptyAnimationContainer();
            that.$.timelineContent.style.minHeight = '';
            that.$.timelineContent.style.maxHeight = '';

            if (that.$.timelineContent._scrollTop) {
                that.$.timelineContent.scrollTop = that.$.timelineContent._scrollTop;
                delete that.$.timelineContent._scrollTop;
            }

            //Resetting the height of the Content section
            timelineAnimationContainer.firstElementChild.children[1].style.height = '';
        }

        //Clears the fallback transition removing Timeout
        clearTimeout(that._transitionTimeout);
        requestAnimationFrame(() => that.$.taskSplitter.classList.remove('transition-scroll-bars'));
    }

    /**
     * Returns the task by tree index
     * @param {any} index
     */
    _getItemByTreeIndex(itemType, index, onlyProjects) {
        const that = this;

        if (!index) {
            return;
        }

        const targetPath = index.split('.'),
            items = that[`_${itemType}s`];

        if (itemType === 'unsortedTask') {
            itemType = 'task';
        }
        else if (itemType === 'unsortedResource') {
            itemType = 'resource';
        }

        let targetProject = items.filter(item => !item.$.project)[index.split('.')[0]];

        if (!targetProject) {
            return;
        }

        if (!targetProject[`${itemType}s`] || !targetProject[`${itemType}s`].length) {
            return onlyProjects ? null : targetProject;
        }

        for (let p = 1; p < targetPath.length; p++) {
            const target = targetProject[`${itemType}s`].filter(item => !item.hidden && item.$.project === targetProject)[targetPath[p]];

            if (!target || (onlyProjects && target.type !== 'project')) {
                break;
            }

            targetProject = target;

            if (targetProject.type !== 'project') {
                break;
            }
        }

        if (onlyProjects) {
            return targetProject && targetProject.type === 'project' ? targetProject : undefined;
        }

        return targetProject;
    }

    /**
     * Task Tree Blur Handler
     */
    _treeBlurHandler(event) {
        const that = this;

        that._unfocusTreeItems(event.target === that.$.taskTree ? that.$.taskTreeSplitter : that.$.resourceTreeSplitter);
    }

    /**
     * Task Tree change event handler
     * @param {any} event
     */
    _taskTreeChangeHandler(event) {
        const that = this,
            treeType = event.target === that.$.taskTree ? 'task' : 'resource';
        let isTreeChangePrevented;

        if (that._itemClickDetails) {
            isTreeChangePrevented = that._itemClickDetails.type === treeType;
        }

        event.stopPropagation();

        if (that[`_${treeType}APIManipulation`] || isTreeChangePrevented || that._dragDetails) {
            return;
        }

        that[`_${treeType}TreeChangeEventFired`] = true;
        that._select(treeType, that._getItemByTreeIndex(treeType, event.detail.selectedIndexes[0]));
        delete that[`_${treeType}TreeChangeEventFired`];
    }

    /**
     * Task Tree expand event handler
     * @param {any} event
     */
    _taskTreeExpandHandler(event) {
        const that = this,
            treeType = event.target === that.$.taskTree ? 'task' : 'resource';

        event.stopPropagation();

        if (!that[`${treeType}s`] || !that[`${treeType}s`].length) {
            return;
        }

        const index = event.detail.item.path,
            targetProject = that._getItemByTreeIndex(treeType, index, true);

        if (!targetProject) {
            return;
        }

        that.$.fireEvent(event.type, { index: that._tasks.indexOf(targetProject), label: targetProject.label, value: targetProject.value });

        const targetSplitter = that.$[`${treeType}Splitter`];

        if (that.hasAnimation) {
            targetSplitter.classList.add('transition-scroll-bars');
        }

        if (event.type === 'collapse') {
            //Handle collapse
            that._expandTask(targetProject, false);
        }
        else {
            //Handle expand
            that._expandTask(targetProject, true);
        }

        //Fallback since transitioncancel does not have full support
        that._transitionTimeout = setTimeout(() => targetSplitter.classList.remove('transition-scroll-bars'), 1000);
    }

    /**
     * Resets the Timeline by removing all of the cells
     */
    _resetTimeline() {
        const that = this;

        that.$.taskTimelineCellsContainer.innerHTML = '';

        const taskBars = that.$.timelineTasksContainer.children;

        for (let i = 0; i < taskBars.length; i++) {
            delete taskBars[i]._cellStart;
            delete taskBars[i]._cellEnd;
        }
    }

    /**
     * Recreates the timeline and scrolls to the last known position
     * @param {any} lastView
     */
    _refreshTimeline(lastView, useSameTasks) {
        const that = this;

        if (!lastView) {
            lastView = that.view;
        }

        //Scroll to last possible position
        const dateInView = that._getDateFromCell(that.scrollLeft, that._getFirstCellObjInView(), lastView),
            isResourceViewChange = that._view || that.__tasks !== undefined;
        let selectedTasks;

        if (!useSameTasks) {
            // if (that.__tasks) {
            selectedTasks = that.selectedIndexes.map(t => that._tasks[t]);
            // }

            //Prepares the tasks for the new view
            that._prepareViewTasks();
        }

        const scrollTop = that.scrollTop;

        //reset the scrollLeft
        that.scrollLeft = 0;

        that._resetTimeline();
        that._createTimelineCells();

        if (isResourceViewChange) {
            //Remove current Timeline Connections
            that.$.timelineConnectionsContainer.innerHTML = '';

            //Restore selected task after/before the Resource View
            if (selectedTasks) {
                that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)).filter(i => i > -1));
            }

            //Re-create the Timeline
            that._autoSchedule();
            that._insertTimelineTasks(that._tasks);
            that._applySelection();
            that._refreshResourceTimeline();
            // that._highlightAssignedItem('resource', that.$.resourceTree.selectedIndexes[0]);
            that._highlightAssignedItem('resource', that._resources.indexOf(that._getItemByTreeIndex('resource', that.$.resourceTree.selectedIndexes[0])))
        }
        else {
            //Refreshes the Timeline
            const tasks = that._tasks;

            for (let t = 0; t < tasks.length; t++) {
                const task = tasks[t];

                if (task.hidden) {
                    continue;
                }

                const taskDateStart = task.dateStart,
                    taskDateEnd = task.dateEnd;

                that._createTimelineTaskCells(task);
                that._setTimelineTaskBar(task);
                that._refreshTaskConnections(task);

                if (that.selectedIndexes.includes(t)) {
                    const timelineTaskCell = Array.from(that.$.taskTimelineCellsContainer.children).find(t => t._task === task);

                    if (timelineTaskCell) {
                        timelineTaskCell.setAttribute('selected', '');
                    }
                }

                if (taskDateStart.getTime() !== task.dateStart.getTime() || taskDateEnd.getTime() !== task.dateEnd.getTime()) {
                    that._refreshTreeColumnsData(task);
                }
            }

            if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                that._refreshResourceTimeline();
                that._highlightAssignedItem('resource', that._resources.indexOf(that._getItemByTreeIndex('resource', that.$.resourceTree.selectedIndexes[0])))
            }

            that._refresh();
        }

        that._scrollTo(dateInView);
        that.scrollTop = scrollTop;
    }

    /**
     * Prepares and sets the tasks for the 'resource' view
     * @param {any} view - the current timeline view
     */
    _prepareViewTasks(isInit) {
        const that = this;

        //Finds a matching resourceId
        function getResourceId(task) {
            for (let resId in resourceObj) {
                if (resourceObj[resId].includes(task)) {
                    return resId;
                }
            }

            return '';
        }

        //Recreates the data inside the Task Columns
        function reCreateTaskColumnsData() {
            const columnHeadersDetails = that.taskColumns,
                taskTreeSplitterItems = that.$.taskTreeSplitter.items,
                treeTasks = that._getTasksJSON().filter(i => !i.hidden);

            if (taskTreeSplitterItems.length !== columnHeadersDetails.length) {
                that._createTreeColumns(that.$.taskTreeSplitter);
            }
            else {
                for (let i = 0; i < columnHeadersDetails.length; i++) {
                    that._createTreeColumnsData(taskTreeSplitterItems[i].closest('lw-splitter-item'), columnHeadersDetails[i], treeTasks);
                    that._setColumnHeadersSorting('task');
                }
            }
        }

        if (!that._view && !that.__tasks) {
            return;
        }

        if (that.view !== 'resource' && !that._view && that.__tasks) {
            //Retrieve the original tasks
            if (that.__tasks) {

                that._restoreTaskFromResourceView();
                that._unsortTasks();
                that._sortItems();

                //Update the Column's data
                reCreateTaskColumnsData();
            }

            return;
        }

        that._unsortTasks();

        //Keep a copy of the original tasks to restore it later
        if (!that.__tasks) {
            that.__tasks = that._tasks;
        }
        else {
            // //Revert the connections to their original state
            // that.__tasks.forEach(task => task.connections.forEach(con => con.target = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)])));
            that.__tasks.forEach(task => task.connections.forEach(con => {
                const targetIndex = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]);

                if (targetIndex > -1) {
                    con.target = targetIndex
                }
            }));
        }

        let tasks = that.__tasks,
            resourceObj = {},
            resourceViewTasks = [];

        //Groups the tasks by resources
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (task.disableResources) {
                continue;
            }

            //Cache the original project of the task
            if (task.$.project && task.$.project.$._resourceId === undefined) {
                task.$._project = task.$.project;
            }

            if (task.resources.length) {
                task.resources.forEach(function (res) {
                    const foundResourceId = getResourceId(task);

                    //If the resource was removed
                    if (!that._resources.find(r => r.id === (res + ''))) {
                        if (!foundResourceId) {
                            !resourceObj['unassigned'] ? resourceObj['unassigned'] = [task] : resourceObj['unassigned'].push(task);
                        }
                    }
                    else {
                        let resourceId = res;

                        if (foundResourceId) {
                            //Remove the duplicate task
                            resourceObj[foundResourceId].splice(resourceObj[foundResourceId].indexOf(task), 1);
                            resourceId = []
                            resourceId.push(foundResourceId)
                            resourceId.push(res);
                            resourceId = resourceId.sort().join(',');
                        }

                        !resourceObj[resourceId] ? resourceObj[resourceId] = [task] : (resourceObj[resourceId].push(task));
                    }
                });
            }
            else {
                !resourceObj['unassigned'] ? resourceObj['unassigned'] = [task] : resourceObj['unassigned'].push(task);
            }
        }

        let resIds = Array.from(Object.keys(resourceObj));

        //Sort Ascending by id
        // resIds.sort((a, b) => a.localeCompare(b));
        let labelColumn = that.taskColumns.find(col => col.value === 'label'), sortDirection;

        if (labelColumn) {
            sortDirection = labelColumn.sort === 'desc' ? 'desc' : 'asc';
        }

        //Create the new tasks
        for (let i = 0; i < resIds.length; i++) {
            const resId = resIds[i];

            if (!resourceObj[resId].length) {
                continue;
            }

            let resourceLabel;

            if (resId !== 'unassigned') {
                const resources = resId.split(',');

                resourceLabel = [];

                for (let r = 0; r < resources.length; r++) {
                    const foundRes = that._resources.find(res => res.id && res.id.toString() === resources[r].toString());

                    if (foundRes) {
                        resourceLabel.push(foundRes.label);
                    }
                }

                resourceLabel = resourceLabel.sort(sortDirection === 'asc' ?
                    (a, b) => a.localeCompare(b) : (a, b) => b.localeCompare(a)).join(', ').trim();
            }

            const project = that._createTasks([{
                label: resourceLabel ? resourceLabel : that.localize('unassigned'),
                expanded: true,
                synchronized: true,
                disableResources: true,
                type: 'project'
            }], true)[0];

            project.$._resourceId = resId;
            project.tasks = resourceObj[resId];

            //Set the new project of the tasks
            resourceViewTasks.push(project);

            resourceObj[resId].forEach(task => {
                task.$.project = project;
                task.expanded = true;
                resourceViewTasks.push(task);

                //Synchronize the dates of the project with it's tasks
                that._synchronizeProjectDates(project, task);
            });
        }

        //Updates the connections of the task
        for (let i = 0; i < resourceViewTasks.length; i++) {
            resourceViewTasks[i].connections = resourceViewTasks[i].connections.filter(con => {
                const originalTask = that.__tasks[that._getTaskIndexById(con.target)],
                    resourceViewTaskIndex = resourceViewTasks.indexOf(originalTask);

                if (resourceViewTaskIndex < 0) {
                    resourceViewTasks[i].$._connections ?
                        resourceViewTasks[i].$._connections.push(Object.assign({}, con)) : resourceViewTasks[i].$._connections = [Object.assign({}, con)];
                    return false;
                }

                con.target = resourceViewTaskIndex;
                return true;
            });
        }

        that._tasks = resourceViewTasks;

        that._sortItems();

        if (!isInit) {
            reCreateTaskColumnsData();
        }
    }

    _restoreTaskFromResourceView() {
        const that = this;

        if (!that.__tasks) {
            return;
        }

        //Check if an items has been removed/updated/added
        let newTasks = [];
        const resourceViewTasks = that._tasks;

        //Exclude the removed tasks
        for (let i = 0; i < that.__tasks.length; i++) {
            const task = that.__tasks[i];

            if (resourceViewTasks.includes(task) || task.disableResources) {
                newTasks.push(task);
            }
        }

        //Include the newly added tasks
        for (let i = 0; i < resourceViewTasks.length; i++) {
            const task = resourceViewTasks[i];

            //Collect the newly added tasks only
            if (task.$._resourceId === undefined && !that.__tasks.includes(task)) {
                newTasks.push(task)
            }

            //Retrieve the original Project of the task
            if (task.$._project) {
                task.$.project = task.$._project;
            }
            else {
                delete task.$.project;
            }

            //Handles 'hidden' property
            that._synchronizeProjectVisibility(task.$.project, task);

            delete task.$._project;
        }

        //Updates the connections of the task
        for (let i = 0; i < newTasks.length; i++) {
            const newTask = newTasks[i];

            if (!newTask.disableResources) {
                //Updates the indexes of the connections
                newTasks[i].connections = newTasks[i].connections.filter(con => {
                    const targetIndex = newTasks.indexOf(resourceViewTasks[that._getTaskIndexById(con.target)]);

                    if (targetIndex < 0) {
                        return false;
                    }

                    con.target = targetIndex;
                    return true;
                });
            }

            //Refresh the Synchroznied projects
            that._refreshProject(newTasks[i].$.project);

            if (newTask.$._connections) {
                newTask.connections.push.apply(newTask.connections, newTask.$._connections);
                delete newTask.$._connections;
            }
        }

        that._tasks = newTasks;
        delete that.__tasks;
    }

    /**
     * Scrolls to the target date - can be a public method
     * @param {any} date
     */
    _scrollTo(date, scrollToCellDate) {
        const that = this,
            timelineCells = that._timelineCells;
        let left;

        if (date === undefined || isNaN(new Date(date).getTime())) {
            return;
        }

        for (let i = 0; i < timelineCells.length; i++) {
            const cell = timelineCells[i],
                cellDate = cell.date;

            switch (that.view) {
                case 'year':
                    if (cellDate.getFullYear() === date.getFullYear() && cellDate.getMonth() === date.getMonth()) {
                        if (scrollToCellDate) {
                            left = cell.left;
                            break;
                        }

                        let daysInMonth = new Date(date);

                        daysInMonth.setMonth(date.getMonth() + 1);
                        daysInMonth.setDate(0);

                        daysInMonth = daysInMonth.getDate();
                        left = cell.left + ((date.getDate() - 1) / daysInMonth * cell.width);
                    }

                    break;
                case 'month': {
                    let startDate = new Date(cellDate),
                        endDate = new Date(cellDate);

                    startDate.setDate(startDate.getDate() - startDate.getDay());
                    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()) + 1);
                    endDate.setMilliseconds(endDate.getMilliseconds() - 1);

                    if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
                        left = cell.left + (scrollToCellDate ? 0 : (scrollToCellDate ? 0 : (date.getDay() / 7 * cell.width)));
                    }

                    break;
                }
                case 'week':
                    if (cellDate.getFullYear() === date.getFullYear() && cellDate.getMonth() === date.getMonth() && cellDate.getDate() === date.getDate()) {
                        left = cell.left + (parseFloat(date.getHours() + '.' + date.getMinutes() + date.getSeconds()) / 24 * cell.width);
                    }
                    break;
                case 'day':
                    if (cellDate.getFullYear() === date.getFullYear() && cellDate.getMonth() === date.getMonth() &&
                        cellDate.getDate() === date.getDate() && cellDate.getHours() === date.getHours()) {
                        left = cell.left + (scrollToCellDate ? 0 : (parseFloat(date.getMinutes() + date.getSeconds()) / 60 * cell.width));
                    }

                    break;
            }

            if (left !== undefined) {
                that.scrollLeft = that.$.resourceTimeline.scrollLeft = left;

                if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
                    that._refreshResourceTimeline();
                }
                return;
            }
        }
    }

    /**
     * Updates the connection of the related tasks(start and end tasks)
     * @param {any} connection
     */
    _updateConnection(connectionId, deleteTask) {
        const that = this;

        function removeConnectionObject(startTask, endTaskId, type) {
            const startTaskConnections = startTask.connections;
            let isConnectionRetained;

            //Check if exists
            for (let c = 0; c < startTaskConnections.length; c++) {
                const targetId = that._getTaskIndexById(startTaskConnections[c].target);

                if (targetId === endTaskId) {
                    if (!deleteTask && type !== undefined && startTaskConnections[c].type === type && !isConnectionRetained) {
                        isConnectionRetained = true;
                        continue;
                    }

                    startTaskConnections.splice(c, 1);
                }
            }

            return isConnectionRetained;
        }

        connectionId += '';
        connectionId = connectionId.split('-');

        const tasks = that._tasks,
            startTaskId = parseInt(connectionId[0]),
            endTaskId = parseInt(connectionId[1]),
            connectionType = parseInt(connectionId[2]),
            startTask = tasks[startTaskId],
            endTask = tasks[endTaskId];

        if (!startTask) {
            return;
        }

        if (!endTask) {
            startTask.connections = [];

            if (that._removeAllTaskConnections) {
                delete startTask.$._connections;
            }

            return;
        }

        if (connectionType === undefined) {
            return;
        }

        //remove the connection for the starTask
        const isConnectionRetained = removeConnectionObject(startTask, endTaskId, connectionType);

        //remove the connection from the related task
        removeConnectionObject(tasks[endTaskId], startTaskId);

        if (deleteTask || isConnectionRetained) {
            return;
        }

        startTask.connections.push({ target: endTaskId, type: connectionType });

        //check for a duplicate in the endTask
        const duplicateConnection = endTask.connections.find(con => that._getTaskIndexById(con.target) === startTaskId && con.type === connectionType);

        if (duplicateConnection) {
            endTask.connections.splice(endTask.connections.indexOf(duplicateConnection), 1);
        }
    }

    /**
     * Creates the cells used for the Timeline
     */
    _createTimelineCells() {
        const that = this,
            tasks = that._tasks,
            elementDateStart = that.properties['dateStart'].value,
            elementDateEnd = that.properties['dateEnd'].value;
        let dateStart, dateEnd;

        if (elementDateStart) {
            dateStart = elementDateStart;
        }

        if (elementDateEnd) {
            dateEnd = elementDateEnd;
        }

        if (tasks.length > 0) {
            let taskDateStart = tasks[0].dateStart,
                taskDateEnd = tasks[0].dateEnd;

            for (let t = 0; t < tasks.length; t++) {
                if (!tasks[t].dateStart || !tasks[t].dateEnd) {
                    continue;
                }

                if (!taskDateStart) {
                    taskDateStart = tasks[t].dateStart;
                }

                if (!taskDateEnd) {
                    taskDateEnd = tasks[t].dateEnd;
                }

                if (taskDateStart.getTime() > tasks[t].dateStart.getTime()) {
                    taskDateStart = tasks[t].dateStart;
                }

                if (taskDateEnd.getTime() < tasks[t].dateEnd.getTime()) {
                    taskDateEnd = tasks[t].dateEnd;
                }
            }

            if (!dateStart || dateStart.getTime() > taskDateStart.getTime()) {
                dateStart = taskDateStart;
            }

            if (!dateEnd || dateEnd.getTime() < taskDateEnd.getTime()) {
                dateEnd = taskDateEnd;
            }
        }

        if (!dateStart || !dateEnd) {
            return;
        }

        //Validate the dates according to min/max
        dateStart = that._minMaxDateValidator(dateStart);
        dateEnd = that._minMaxDateValidator(dateEnd);

        that._createTimelineHeader(dateStart, that._getCellsCount(dateStart, dateEnd));
    }

    /**
     * Returns the nubmer of cells that should be created depending on the view
     * @param {any} dateStart
     * @param {any} dateEnd
     * @param {any} view
     */
    _getCellsCount(dateStart, dateEnd, view) {
        let cellsCount, years, months, weeks, days, hours,
            dayStart = new Date(dateStart),
            dayEnd = new Date(dateEnd);

        //Years between two dates
        const yearDifference = dateEnd.getFullYear() - dateStart.getFullYear();

        years = cellsCount = Math.round(yearDifference) + 1;

        if (view === 'year') {
            return { year: years };
        }

        //Resetting the time while preserving the hours
        dayStart.setHours(dayStart.getHours(), 0, 0, 0);
        dayEnd.setHours(dayEnd.getHours(), 0, 0, 0);

        hours = Math.floor((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60));

        if (hours > 0) {
            let date = new Date(dayStart);

            hours = 1;

            //Big performance optimization for cases where the year interval is big
            if (dayStart.getFullYear() !== dayEnd.getFullYear()) {
                let firstDateEnd = new Date(dayStart.getFullYear() + 1, 0, 1, 0, 0, 0, 0);

                //Hours till the end of the year
                while (date.getTime() !== firstDateEnd.getTime()) {
                    const currentTime = date.getTime();

                    date.setHours(date.getHours() + 1);

                    //Safari bug fix. When daylight date is reached Safari doesn't change the date. The result is an infinite loop
                    if (date.getTime() === currentTime) {
                        date.setHours(date.getHours() + 2);
                    }

                    hours++;
                }

                const yearsTillEnd = dayEnd.getFullYear() - firstDateEnd.getFullYear();

                for (let y = 0; y < yearsTillEnd; y++) {
                    const year = date.getFullYear();

                    //-1 to avoid counting twice the start hour from every year
                    hours += (((year % 100 === 0 ? year % 400 === 0 : year % 4 === 0) ? 366 : 365) * 24) - 1;
                    date.setFullYear(year + 1);
                }
            }

            //Standart method for finding number of hours. Slow with many years.
            while (date.getTime() !== dayEnd.getTime()) {
                const currentTime = date.getTime();

                date.setHours(date.getHours() + 1);

                //Safari bug fix. When daylight date is reached Safari doesn't change the date. The result is an infinite loop
                if (date.getTime() === currentTime) {
                    date.setHours(date.getHours() + 2);
                }

                hours++;
            }
        }

        //const manualCalculation = function () {
        //    let hours = 1;
        //    let date = new Date(dayStart);

        //    while (date.getTime() !== dayEnd.getTime()) {
        //        date.setHours(date.getHours() + 1);
        //        hours++;
        //    }

        //    return hours;
        //}();

        if (view === 'hour') {
            return { hour: hours };
        }

        //Days between two dates
        dayStart.setHours(0, 0, 0, 0);
        dayEnd.setHours(23, 59, 59, 999);

        days = cellsCount = Math.round((dayEnd.getTime() - dayStart.getTime()) / (1000 * 60 * 60 * 24));

        if (view === 'day') {
            return { day: days };
        }

        dayStart.setDate(dayStart.getDate() - dayStart.getDay());
        dayEnd.setDate(dayEnd.getDate() + 6 - dayEnd.getDay());

        //Weeks between two dates
        weeks = cellsCount = Math.round((dayEnd.getTime() - dayStart.getTime()) / (1000 * 60 * 60 * 24 * 7));


        if (view === 'week') {
            return { week: weeks };
        }

        //NOTE: if view is 'month' the full week must be shown. Which means all months for visible weeks should be shown
        if (this.view === 'month') {
            if (dateStart.getDay() !== 0) {
                dateStart = new Date(dateStart.setDate(dateStart.getDate() - dateStart.getDay()));
            }

            if (dateEnd.getDay() !== 6) {
                dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 6 - dateEnd.getDay()));
            }
        }

        //Months between two dates
        if (dateStart.getFullYear() !== dateEnd.getFullYear()) {
            cellsCount = 12 - dateStart.getMonth();

            const yearEnd = dateEnd.getFullYear();

            for (let y = dateStart.getFullYear() + 1; y <= yearEnd; y++) {
                cellsCount += y === dateEnd.getFullYear() ? dateEnd.getMonth() + 1 : 12;
            }
        }
        else {
            cellsCount = dateEnd.getMonth() - dateStart.getMonth() + 1; // +1 because January is the 0
        }

        months = Math.ceil(cellsCount);

        if (view === 'months') {
            return { month: months };
        }

        return { year: years, month: months, week: weeks, day: days, hour: hours };
    }

    /**
     * Creates the Timeline tasks
     * @param {any} task - a Timeline task
     */
    _createTimelineTask(task, index) {
        const that = this,
            taskBar = that._createTaskBar(task.type),
            isProjectSynchronized = task.type === 'project' && task.synchronized;

        task.disableDrag || (isProjectSynchronized && !task.dragProject) ? taskBar.setAttribute('disable-drag', '') : taskBar.removeAttribute('disable-drag');
        task.disableResize || isProjectSynchronized ? taskBar.setAttribute('disable-resize', '') : taskBar.removeAttribute('disable-resize');

        if (task.id) {
            taskBar.id = task.id;
        }
        else {
            taskBar.id = 'ganttTask' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        that._createTimelineTaskCells(task, index);

        taskBar._task = task;
        taskBar.classList.add('lw-timeline-task');

        if (task.class) {
            taskBar.classList.add(task.class);
        }

        //Accessibility
        //Formats a date to ISO format, 'yyyy-mm-dd'
        const dateFormatter = (date) => date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) +
            '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        taskBar.setAttribute('aria-label', task.label + ' Start date: ' + dateFormatter(task.dateStart) + ', End date: ' + dateFormatter(task.dateEnd));
        taskBar.setAttribute('aria-selected', 'false');

        that.$.timelineTasksContainer.insertBefore(taskBar, that.$.timelineTasksContainer.children[index]);
    }

    /**
     * Creates the cells for a timeline task
     * @param {any} task - a task from the dataSource
     */
    _createTimelineTaskCells(task, index) {
        const that = this,
            taskElementWrapper = document.createElement('div');

        if (task.$.project && !that._isTaskExpanded(task)) {
            taskElementWrapper.classList.add('lw-visibility-hidden');
        }

        taskElementWrapper._task = task;
        taskElementWrapper.classList.add('lw-timeline-task-cell');

        that.$.taskTimelineCellsContainer.insertBefore(taskElementWrapper, that.$.taskTimelineCellsContainer.children[index]);
    }

    /**
     * Creates Timeline cells
     * @param {any} count - number of cells to create
     * @param {any} startDate - date for the first cell
     * @param {any} type - type of cell
     */
    _createCells(count) {
        let cell,
            fragment = document.createDocumentFragment();

        for (let c = 0; c < count; c++) {
            cell = document.createElement('div');
            cell.classList.add('lw-timeline-view-cell');

            //Accesibility
            cell.setAttribute('role', 'columnheader');
            fragment.appendChild(cell);
        }

        return fragment;
    }

    /**
     * Returns the count of timeline cells that should be rendered/visible
     */
    _getTimelineVisibleCellsCount() {
        const that = this,
            timelineCells = that._timelineCells;

        if (!timelineCells) {
            return;
        }

        const firstCellObj = that._getFirstCellObjInView(),
            firstCellOffset = 1 - (firstCellObj.left + firstCellObj.width - that.scrollLeft) / timelineCells[0].width;

        return Math.ceil(parseFloat((that.$.timeline.offsetWidth / firstCellObj.width).toFixed(2)) + firstCellOffset);
    }

    /**
     * Returns the number of header details view cells that should be rendered
     */
    _getHeaderVisibleCellsCount() {
        const that = this;

        if (!that._timelineHeaderCells) {
            return;
        }

        const scrollLeft = Math.abs(that.scrollLeft),
            offsetWidth = that.$.timeline.parentElement.offsetWidth,
            timelineViewCells = that._timelineHeaderCells;
        let headerDetailsObjCount = 0;

        for (let i = 0; i < timelineViewCells.length; i++) {
            const cell = timelineViewCells[i];

            if (cell.left + cell.width > scrollLeft && cell.left < offsetWidth + scrollLeft) {
                headerDetailsObjCount++;
            }
        }

        return headerDetailsObjCount;
    }

    /**
     * Refreshes the content of the header cells
     */
    _refreshHeaderDate(refreshContentOnly) {
        const that = this,
            type = that._getCellsViewType(),
            //scrollLeft = that.$.scrollViewer.scrollLeft,
            scrollLeft = that.scrollLeft,
            cells = that.$.timelineViewCells.children,
            cellsObj = that._timelineCells;
        let startTimelineCellIndex;

        //Update the content of the additional header
        that._refreshHeaderDetailsDate(refreshContentOnly);

        //Get the first visible timeline cell
        for (let i = 0; i < cellsObj.length; i++) {
            const cellObj = cellsObj[i];

            if (scrollLeft <= cellObj.left + cellObj.width) {
                startTimelineCellIndex = i;
                break;
            }
        }

        //Update the content of the header cells
        for (let c = 0; c < cells.length; c++) {
            const cell = cells[c],
                cellObj = cellsObj[startTimelineCellIndex];

            if (!cellObj) {
                break;
            }

            startTimelineCellIndex++;

            const date = cellObj.date;

            cell.innerHTML = `<div>${that._getDateString(new Date(date), type)}</div>`;

            if (refreshContentOnly) {
                continue;
            }

            cell._date = new Date(date);
            cell.style.width = cellObj.width + 'px';
            cell.style[that.rightToLeft ? 'right' : 'left'] = cellObj.left + 'px';
            cellObj.weekend ? cell.setAttribute('weekend', '') : cell.removeAttribute('weekend');
            cellObj.nonworking ? cell.setAttribute('nonworking', '') : cell.removeAttribute('nonworking');
        }
    }

    /**
     * Returns the Date string according to the view
     * @param {any} date
     * @param {any} type
     */
    _getDateString(date, type, isHeaderDetailsContainer) {
        const that = this,
            dateFormat = ['2-digit', 'numeric'][that.dayFormat] || 'numeric';
        let dateValue;

        if (type === 'year') {
            dateValue = date.toLocaleDateString(that.locale, { year: that.yearFormat });
        }
        else if (type === 'month') {
            dateValue = date.toLocaleDateString(that.locale, { month: that.monthFormat });
        }
        else if (type === 'week') {
            dateValue = that.weekFormat !== 'numeric' && isHeaderDetailsContainer ?
                date.toLocaleDateString(that.locale, { day: dateFormat, month: that.monthFormat, year: that.yearFormat }) : that._getWeekNumber(date);
        }
        else if (type === 'day') {
            dateValue = date.toLocaleDateString(that.locale, that.view === 'day' ?
                { day: dateFormat, month: that.monthFormat, year: that.yearFormat } :
                (['long', 'short', 'narrow'].indexOf(that.dayFormat) > -1 ? { weekday: that.dayFormat } : { day: that.dayFormat }));
        }
        else if (type === 'hour') {
            dateValue = that.hourFormat === 'default' ?
                date.toLocaleTimeString(that.locale, { hour12: false }) : date.toLocaleDateString(that.locale, { hour: that.hourFormat });
        }

        if (that.timelineHeaderFormatFunction) {
            return that.timelineHeaderFormatFunction(date, type, isHeaderDetailsContainer, dateValue);
        }

        return dateValue;
    }

    /**
     * Sets the content of the header details cells
     * @param {any} startCellIndex
     */
    _refreshHeaderDetailsDate(refreshContentOnly) {
        const that = this,
            view = that.view,
            scrollLeft = that.scrollLeft,
            headerDetailsCells = that.$.timelineViewDetails.children,
            headerCells = that._timelineHeaderCells;
        let startCellIndex

        //Get the first visible timeline cell
        for (let i = 0; i < headerCells.length; i++) {
            const cellObj = headerCells[i];

            if (scrollLeft <= cellObj.left + cellObj.width) {
                startCellIndex = i;
                break;
            }
        }

        for (let i = 0; i < headerDetailsCells.length; i++) {
            const cellObj = headerCells[startCellIndex],
                cell = headerDetailsCells[i];
            let date = new Date(cellObj.date);

            if (that.view === 'week') {
                date.setDate(date.getDate() - date.getDay());
            }

            startCellIndex++;

            //Ensures that the date is always visible
            date = new Date(Math.max(cellObj.date.getTime(), date.getTime()));

            cell.innerHTML = `<div>${that._getDateString(date, view, true)}</div>`;

            if (refreshContentOnly) {
                continue;
            }

            cell._date = date;
            cell.style[that.rightToLeft ? 'right' : 'left'] = cellObj.left + 'px';
            cell.style.width = cellObj.width + 'px';
        }
    }

    /**
    * Returns the number of the week.
    */
    _getWeekNumber(date) {
        let newYear = new Date(date.getFullYear(), 0, 1),
            dayNumber = Math.round((date.getTime() - newYear.getTime() - (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1,
            day = newYear.getDay(), //the day of week the year begins on
            weeknum;

        day = day >= 0 ? day : day + 7;

        //if the year starts before the middle of a week
        if (day < 4) {
            weeknum = Math.floor((dayNumber + day - 1) / 7) + 1;

            if (weeknum > 52) {
                newYear = new Date(date.getFullYear() + 1, 0, 1);
                day = newYear.getDay();
                day = day >= 0 ? day : day + 7;

                //if the next year starts before the middle of the week, it is week #1 of that year
                weeknum = day < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.round((dayNumber + day - 1) / 7);
        }

        return weeknum;
    }

    /**
     * Converts the duration of a task to miliseconds or back to it's original value according to durationUnit.
     * @param {number} duration - a number representing the time duration
     * @param {boolean} toDurationUnit - a flag inidicating whether the returned value should be according to durationUnit property or in not
     */
    _convertDuration(duration, toDurationUnit) {
        if (!duration) {
            return 0;
        }

        let milSeconds;

        switch (this.durationUnit) {
            case 'day':
                milSeconds = 1000 * 60 * 60 * 24;
                break;
            case 'hour':
                milSeconds = 1000 * 60 * 60;
                break;
            case 'minute':
                milSeconds = 1000 * 60;
                break;
            case 'second':
                milSeconds = 1000;
                break;
            case 'milisecond':
                return duration;
            case 'week':
                milSeconds = 1000 * 60 * 60 * 24 * 7;
        }

        return Math.max(0, toDurationUnit ? duration / milSeconds : duration * milSeconds);
    }

    /**
     * Creates a taskBar DIV element
     * @param {any} type
     */
    _createTaskBar(type) {
        const taskBar = document.createElement('div');

        taskBar.classList.add('lw-timeline-task');
        taskBar.classList.add(type);

        taskBar.innerHTML = type === 'milestone' ?
            `<div class="lw-task-container" aria-hidden="true">
                <div class="lw-task-connection-point start"></div>
                <div class="lw-timeline-task-fill"></div>
                <div class="lw-task-connection-point end"></div>
            </div>`
            :
            `<div class="lw-task-container" aria-hidden="true">
                <div class="lw-task-connection-point start"></div>
                <div class="lw-timeline-task-fill">
                    <div class="lw-timeline-task-progress"></div>
                </div>
                <div class="lw-timeline-task-progress-thumb"></div>
                <div class="lw-timeline-task-label"></div>
                <div class="lw-task-connection-point end"></div>
            </div>`;

        return taskBar;
    }

    /**
     * Sets the header section
     */
    _createTimelineHeader(dateStart, cellsCount) {
        const that = this,
            type = that._getCellsViewType();

        if (!dateStart) {
            const monthCells = that.$.timelineViewCells.children;

            if (monthCells.length === 0) {
                return;
            }

            dateStart = monthCells[0]._date;
        }

        if (that.view !== 'day') {
            dateStart.setHours(0, 0, 0, 0);
        }

        //Avoids recreating the timeline objects when unnecessary
        if (that.$.timelineContent.offsetWidth === that.$.timeline.offsetWidth && that._timelineCells && that._timelineCells[0] &&
            that._timelineCells[0].date.getTime() === dateStart.getTime() && that._timelineCells.length === cellsCount[that._getCellsViewType()]) {

            //Timeline scrollBars refresh
            that._refresh();
            return;
        }

        //reset the width of the timeline header
        that.$.timelineContent.style.width = that.$.timelineAnimationContainer.style.width = '';

        //Creates the cell objects
        that._createTimelineCellsObj(dateStart, cellsCount);
        that._createTimelineHeaderCellsObj(dateStart, cellsCount);

        //Creates the Header View Details cells
        that.$.timelineViewDetails.innerHTML = '';
        that.$.timelineViewDetails.appendChild(that._createCells(that._getHeaderVisibleCellsCount()));

        //Creates View Header cells
        that.$.timelineViewCells.innerHTML = '';
        that.$.timelineViewCells.appendChild(that._createCells(that._getTimelineVisibleCellsCount()));

        //Refreshes the content of the header
        that._refreshHeaderDate();

        //Set size to the timeline
        that.$.timelineContent.style.width = that.$.timelineAnimationContainer.style.width =
            Math.max(cellsCount[type] * that._timelineCells[0].width, that.$.timeline.parentElement.offsetWidth) + 'px';

        //Timeline scrollBars refresh
        that._refresh();

        //Update the scrollLeft after clearing the timeline because it was reset
        if (that.scrollLeft) {
            that.$.timeline.scrollLeft = that._getScrollLeft(that.scrollLeft);
        }

        //Update the scrollTop after clearing the timeline because it was reset
        if (that.scrollTop) {
            that.$.timelineContent.scrollTop = that.scrollTop;
        }
    }

    /**
     * Returns the type of the header cells according to the view
     */
    _getCellsViewType() {
        switch (this.view) {
            case 'year':
                return 'month';
            case 'month':
                return 'week';
            case 'week':
                return 'day';
            case 'day':
                return 'hour';
        }
    }

    /**
     * Creates the cell objects ( virtual cells)
     * @param {any} startDate - the date for the first cell
     * @param {any} cellsCount - the number of cells to be created
     * @param {any} type - type of date for the cells
     */
    _createTimelineCellsObj(startDate, cellsCount) {
        const that = this,
            type = that._getCellsViewType();

        cellsCount = cellsCount[type];

        const computedStyle = window.getComputedStyle(that),
            viewSize = that.$.timeline.parentElement.offsetWidth;
        let cellWidth = Math.max(parseFloat(computedStyle.getPropertyValue('--lw-gantt-chart-timeline-cell-size')) || 0,
            parseFloat(computedStyle.getPropertyValue('--lw-gantt-chart-timeline-cell-min-size') || 0)),
            //cellBorderWidth = parseFloat(computedStyle.getPropertyValue('--lw-gantt-chart-timeline-column-border-width')) || 0,
            left = 0,
            date = new Date(startDate);

        if (cellsCount * cellWidth < viewSize) {
            cellWidth = viewSize / cellsCount;
        }

        cellWidth = parseFloat(cellWidth.toFixed(2));

        that._timelineCells = [];

        //let endDate;

        for (let i = 0; i < cellsCount; i++) {
            const cellObj = { left: left, width: cellWidth };

            if (type === 'year') {
                date.setMonth(0);
                cellObj.date = new Date(date);
                date.setFullYear(date.getFullYear() + 1);
            }
            else if (type === 'month') {
                //if first day is non working set it to 2 or whatever
                date.setDate(1);
                cellObj.date = new Date(date);
                date.setMonth(date.getMonth() + 1);
            }
            else if (type === 'week') {

                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() - date.getDay());
                cellObj.date = new Date(date);
                date.setDate(date.getDate() + 7);
            }
            else if (type === 'day') {
                if (that.nonworkingDays.indexOf(date.getDay()) > -1) {
                    cellObj.nonworking = true;
                }

                date.setHours(0, 0, 0, 0);
                cellObj.date = new Date(date);
                date.setDate(date.getDate() + 1);
                cellObj.weekend = cellObj.date.getDay() === 0 || cellObj.date.getDay() === 6;
            }
            else if (type === 'hour') {
                if (that.nonworkingHours.indexOf(date.getHours()) > -1 || that.nonworkingDays.indexOf(date.getDay()) > -1) {
                    cellObj.nonworking = true;
                }

                date.setHours(date.getHours(), 0, 0, 0);
                cellObj.date = new Date(date);

                const currentTime = date.getTime();

                date.setHours(date.getHours() + 1);

                //Safari bug fix
                if (currentTime === date.getTime()) {
                    date.setHours(date.getHours() + 2);
                }

                cellObj.weekend = cellObj.date.getDay() === 0 || cellObj.date.getDay() === 6;
            }

            that._timelineCells.push(cellObj);
            left = parseFloat((left + cellWidth).toFixed(2));
        }
    }

    /**
     * Creates the header view cell objects
     * @param {any} dateStart
     * @param {any} cellsCount
     */
    _createTimelineHeaderCellsObj(dateStart, cellsCount) {
        const that = this,
            view = that.view;
        let lastCellIndex = 0,
            //date = new Date(that._timelineCells[0].date);
            date = new Date(dateStart);

        cellsCount = cellsCount[view];

        that._timelineHeaderCells = [];

        for (let i = 0; i < cellsCount; i++) {
            const cellObj = {};

            cellObj.date = new Date(date);

            switch (view) {
                case 'year':
                    date.setFullYear(date.getFullYear() + 1);
                    break;
                case 'month':
                    date.setDate(1);
                    date.setMonth(date.getMonth() + 1);
                    break;
                case 'week':
                    date.setDate(date.getDate() + 7);
                    break;
                case 'day':
                    date.setDate(date.getDate() + 1);
                    break;
            }

            lastCellIndex = that._refreshViewDetailCell(cellObj, lastCellIndex, i);

            that._timelineHeaderCells.push(cellObj);
        }
    }

    /**
     * Validates a date according to element's min/max property
     * @param {any} date
     */
    _minMaxDateValidator(date) {
        if (!date || isNaN(date.getTime())) {
            return date;
        }

        const that = this,
            min = new Date(that.min),
            max = new Date(that.max);

        if (min) {
            date = new Date(Math.max(min.getTime(), date.getTime()))
        }

        if (max) {
            date = new Date(Math.min(max.getTime(), date.getTime()));
        }

        return date;
    }

    /**
     * Date validator for the startDate, endDate properties
     */
    _dateValidator(oldValue, newValue) {
        const that = this;
        let newDate;

        if (newValue instanceof Date) {
            return that._minMaxDateValidator(newValue);
        }
        else if (LW.Utilities.DateTime && newValue instanceof LW.Utilities.DateTime) {
            return that._minMaxDateValidator(newValue.toDate());
        }
        else if (typeof (newValue) === 'string') {
            //regex for the time
            const regexTime = /\d+:\d+:\d+/;

            if (newValue.trim() === 'new Date()' || newValue.trim() === 'new LW.Utilities.DateTime()') {
                return that._minMaxDateValidator(new Date());
            }
            else if (!isNaN(Date.parse(newValue))) {
                newDate = new Date(Date.parse(newValue));

                if (!regexTime.test(newValue)) {
                    newDate.setHours(0, 0, 0, 0);
                }

                newValue = newDate;
            }
            else {
                const regexDate = /(\d+[,-.\/]{1}\s*\d+[,-.\/]{1}\s*\d+)/;

                if (regexDate.test(newValue)) {
                    const date = regexDate.exec(newValue)[0].replace(/[,-.\/]/g, ',').split(',');

                    if (date.length === 3) {
                        const [day, year] = parseInt(date[0]) < parseInt(date[2]) ? [date[0], date[2]] : [date[2], date[0]];

                        newDate = new Date(parseInt(year), parseInt(date[1]) - 1, parseInt(day));

                        if (regexTime.test(newValue)) {
                            const time = regexTime.exec(newValue)[0].split(':');

                            newDate.setHours(time[0] || 0, time[1] || 0, time[2] || 0);
                        }

                        newValue = newDate;
                    }
                }
            }
        }
        else {
            return that._minMaxDateValidator(oldValue);
        }

        return that._minMaxDateValidator(new Date(newValue));
    }

    /**
     * Returns the min/max left position of the taskBar according to the dateName.
     * @param {any} task - timeline task
     * @param {any} dateName - dateName can be dateStart or dateEnd
     */
    _getTaskBarPositionLimits(task, dateName) {
        const that = this;

        function getLimit(date) {
            const dateCell = that._getTimelineTaskCellByDate(date);

            if (dateCell) {
                return dateCell.left + that._getTimelineTaskOffset(dateCell, date) || 0;
            }
        }

        return { min: getLimit(task['min' + dateName]), max: getLimit(task['max' + dateName]) };
    }

    /**
     * Returns the offsetLeft of a Timeline task according to the date by passing the cell that the date belongs to.
     * @param {any} dateCell - a timeline cell
     * @param {any} date - a random date that's in the range of the dateCell's date.
     */
    _getTimelineTaskOffset(dateCell, date) {
        const that = this;

        if (!dateCell) {
            return;
        }

        let maxDate, offset;

        switch (that.view) {
            case 'year':
                {
                    const timeOffsetInDays = ((date.getHours() / 24) + (date.getMinutes() / (60 * 24)) + (date.getSeconds() / (60 * 60 * 24)));

                    maxDate = new Date(dateCell.date.getFullYear(), dateCell.date.getMonth() + 1, 0);
                    offset = (date.getDate() - 1 + timeOffsetInDays) / maxDate.getDate() * dateCell.width;
                    break;
                }
            case 'month':
                offset = (date.getDay() / 7) * dateCell.width;
                break;
            case 'week':
                offset = parseFloat(date.getHours() + date.getMinutes() / 60 + date.getSeconds() / (60 * 60)) / 24 * dateCell.width;
                break;
            case 'day':
                offset = parseFloat(date.getMinutes() + date.getSeconds() / 60) / 60 * dateCell.width;
                break;
        }

        return offset;
    }

    /**
     * Returns the min/max Dates of a TaskBar
     * @param {any} taskBar
     * @param {any} resizeSide - the resizing side that is selected
     */
    _getTaskBarSizeLimits(timelineTask, resizeSide) {
        const that = this,
            getTaskRange = that._getTaskBarDateRange(timelineTask); //TODO: Get them from the Task itself instead of calculting them again
        let possibleDuration,
            timeZoneOffset = 0,
            minDuration = that._convertDuration(timelineTask._task.minDuration) || that._getMinDuration(timelineTask, resizeSide),
            maxDuration = that._convertDuration(timelineTask._task.maxDuration);

        function getSizeLimit(duration, isMin) {
            if (!duration) {
                return;
            }

            let dayOffset, dateStart;

            if ((resizeSide === 'left' && !that.rightToLeft) || (resizeSide === 'right' && that.rightToLeft)) {
                duration = -1 * duration;
                dateStart = getTaskRange.dateEnd;
            }
            else {
                dateStart = getTaskRange.dateStart;
            }

            if (isMin && Math.abs(dayOffset) === Math.abs(duration)) {
                dayOffset = 0;
            }

            //let endDate = new Date(dateStart.getTime() + duration);
            let endDate = that._getTaskWorkingDateEnd({ dateStart: dateStart }, duration);

            const time = endDate.getTime() + (endDate.getTimezoneOffset() - dateStart.getTimezoneOffset()) * 60 * 1000,
                dateCell = that._getTimelineTaskCellByDate(new Date(time));

            if (!dateCell) {
                return;
            }

            const offset = that._getTimelineTaskOffset(dateCell, new Date(time));

            //NOTE: In RTL mode, dateCell.left represents the right position, while in LTR is left
            return that.rightToLeft ?
                (resizeSide === 'left' ? (offset - (that.$.timelineContent.offsetWidth - timelineTask.offsetLeft - timelineTask.offsetWidth - dateCell.left)) :
                    ((that.$.timelineContent.offsetWidth - timelineTask.offsetLeft - dateCell.left) - offset)) :
                (resizeSide === 'left' ? timelineTask.offsetLeft + timelineTask.offsetWidth - dateCell.left - offset : dateCell.left - timelineTask.offsetLeft + offset);
        }

        if ((resizeSide === 'left' && !that.rightToLeft) || (resizeSide === 'right' && that.rightToLeft)) {
            const maxDateStart = timelineTask._task.maxDateStart,
                minDateStart = timelineTask._task.minDateStart;

            if (minDateStart) {
                timeZoneOffset = (minDateStart.getTimezoneOffset() - getTaskRange.dateEnd.getTimezoneOffset()) * 60 * 1000;
                possibleDuration = Math.abs(minDateStart.getTime() - getTaskRange.dateEnd.getTime()) + timeZoneOffset;
                maxDuration = maxDuration ? Math.min(possibleDuration, maxDuration) : possibleDuration;
            }

            if (maxDateStart) {
                timeZoneOffset = (maxDateStart.getTimezoneOffset() - getTaskRange.dateEnd.getTimezoneOffset()) * 60 * 1000;
                possibleDuration = Math.abs(maxDateStart.getTime() - getTaskRange.dateEnd.getTime()) + timeZoneOffset;
                minDuration = minDuration ? Math.max(possibleDuration, minDuration) : possibleDuration;
            }
        }
        else {
            const maxDateEnd = timelineTask._task.maxDateEnd,
                minDateEnd = timelineTask._task.minDateEnd;

            if (minDateEnd) {
                timeZoneOffset = (minDateEnd.getTimezoneOffset() - getTaskRange.dateStart.getTimezoneOffset()) * 60 * 1000;
                possibleDuration = Math.abs(minDateEnd.getTime() - getTaskRange.dateStart.getTime()) + timeZoneOffset;
                minDuration = minDuration ? Math.max(possibleDuration, minDuration) : possibleDuration;
            }

            if (maxDateEnd) {
                timeZoneOffset = (maxDateEnd.getTimezoneOffset() - getTaskRange.dateStart.getTimezoneOffset()) * 60 * 1000;
                possibleDuration = Math.abs(maxDateEnd.getTime() - getTaskRange.dateStart.getTime()) + timeZoneOffset;
                maxDuration = maxDuration ? Math.min(possibleDuration, maxDuration) : possibleDuration;
            }
        }

        if (maxDuration) {
            minDuration = Math.min(minDuration, maxDuration);
        }

        return { min: getSizeLimit(minDuration, true), max: getSizeLimit(maxDuration) };
    }

    /**
     * Returns the min duration of a cell according to hte CSS variable and the view
     * @param {any} timelineTask
     * @param {any} resizeSide
     */
    _getMinDuration(timelineTask, resizeSide) {
        const that = this,
            minSize = parseFloat(getComputedStyle(that).getPropertyValue('--lw-gantt-chart-timeline-task-min-width')) || 0;

        if (!minSize || !that._timelineCells || that._timelineCells.length === 0) {
            return;
        }

        const task = timelineTask._task;
        let dateStart, offsetLeft, operator = 1;

        if (that.rightToLeft) {
            offsetLeft = parseFloat(timelineTask.style.right) || (that.$.timelineContent.offsetWidth - timelineTask.offsetLeft - timelineTask.offsetWidth);
        }
        else {
            offsetLeft = parseFloat(timelineTask.style.left) || timelineTask.offsetLeft;
        }

        if (resizeSide === 'left') {
            dateStart = task.dateEnd;
            offsetLeft += (parseFloat(timelineTask.style.width) || timelineTask.offsetWidth);
            operator = -1;
        }
        else {
            dateStart = task.dateStart;
        }

        //find the timeline cell for the minDate
        const minOffsetLeft = offsetLeft + operator * minSize;
        let targetCell;

        for (let i = 0; i < that._timelineCells.length; i++) {
            const timelineCell = that._timelineCells[i];

            if (minOffsetLeft < timelineCell.left) {
                break;
            }

            targetCell = timelineCell;
        }

        const minDate = that._getDateFromCell(minOffsetLeft, targetCell);

        if (!minDate) {
            return;
        }

        return Math.abs(dateStart.getTime() - minDate.getTime());
    }

    /**
     * Creates a delimiter for the task bar
     */
    _createDelimiter(name, resizeSide) {
        const that = this,
            limit = name.slice(0, 3),
            delimiter = document.createElement('div');

        delimiter.classList.add('lw-task-bar-limitter-' + name);

        if (name.indexOf('date') > -1) {
            if (!this._dragDetails[limit].left) {
                return;
            }

            const taskBar = that._dragDetails.timelineTask,
                timelineTaskCells = that.$.taskTimelineCellsContainer.children[that._tasks.indexOf(taskBar._task)];

            if (limit.indexOf('max') > -1) {
                delimiter.style.width = (timelineTaskCells.offsetWidth - that._dragDetails[limit].left - taskBar.offsetWidth) + 'px';
            }
            else {
                delimiter.style.width = that._dragDetails[limit].left + 'px';
            }

        }
        else {
            if (!this._dragDetails[limit].width) {
                return;
            }

            delimiter.style[resizeSide === 'left' ? 'right' : 'left'] = that._dragDetails[limit].width + 'px';
        }

        return delimiter;
    }

    /**
     * Double click handler
     * @param {any} event
     */
    _doubleClickHandler(event) {
        const that = this;
        let eventTarget = event.target;

        if (that.disabled || that.disableWindowEditor) {
            return;
        }

        if (that.shadowRoot && eventTarget === that) {
            eventTarget = event.composedPath()[0];
        }

        let target = eventTarget.closest ? eventTarget.closest('.lw-task-connection') : undefined;

        if (target) {
            that._openPopupWindow(target);
            return;
        }

        target = eventTarget.closest('.lw-timeline-task') || eventTarget.closest('.lw-task-label-container') || eventTarget.closest('.lw-tree-item-label-container');

        if (target && that.$.taskSplitter.contains(target)) {
            if (target.classList.contains('lw-timeline-task')) {
                that._openPopupWindow(target);
            }
            else {
                that._openPopupWindow(that.$.timelineTasksContainer.children[that._getTreeItemIndex(target)]);
            }

            return;
        }
    }

    /**
     * Checks for mouse double click on tasks
     */
    _checkDoubleClick(event) {
        const that = this;
        let pressedItem = event.target;

        if (that.shadowRoot && pressedItem === that) {
            pressedItem = event.composedPath()[0];
        }

        //Check for double click
        if (that._dblClickDetails === undefined) {
            that._dblClickDetails = { clicks: 0 };
        }

        clearTimeout(that._dblClickDetails.timeOut);

        if (pressedItem !== that._dblClickDetails.target) {
            that._dblClickDetails.clicks = 0;
        }

        that._dblClickDetails.target = pressedItem;
        that._dblClickDetails.clicks++;

        that._dblClickDetails.timeOut = setTimeout(function () {
            if (that._dblClickDetails) {
                that._dblClickDetails.clicks = 0;
            }
        }, 300);

        if (that._dblClickDetails.clicks === 2) {
            that._doubleClickHandler(event);
            that._dblClickDetails.clicks = 0;
            return true;
        }
    }

    /**
     * Element Down Event Handler
     * @param {any} event
     */
    _downHandler(event) {
        const that = this,
            originalEvent = event.originalEvent,
            target = (that.shadowRoot || that.isInShadowDOM ? originalEvent.composedPath()[0] : originalEvent.target),
            timelineTaskCell = target.closest ? (target.closest('.lw-timeline-task-cell') || target.closest('.lw-timeline-task')) : null;

        event.stopPropagation();

        delete that._itemClickDetails;
        delete that._columnHeaderClicked;

        if (that._dragDetails) {
            //TODO: Terminate all interaction processes like drag/resize, etc
            delete that._dragDetails;
            that._setConnectionFeedback();
            return;
        }

        const targetType = that.$.resourceSplitter.contains(target) ? 'resource' : 'task';

        //Focus the Tree to use it's key handling
        if (target.closest('.lw-timeline-content') || target.closest(`.lw-${targetType}-tree-content`)) {
            requestAnimationFrame(() => that.$[`${targetType}Tree`].focus({ preventScroll: true }));
        }

        that._itemClickDetails = { target: target };

        if (!LW.Utilities.Core.isMobile && event.button !== 0) {
            return;
        }

        if (!timelineTaskCell) {
            if (target.classList.contains('lw-popup-window-modal')) {
                if (that._popupWindow) {
                    const popupWindows = Object.keys(that._popupWindow);

                    requestAnimationFrame(() => that._popupWindow[popupWindows[popupWindows.length - 1]].focus());
                }

                return;
            }

            if ((target.closest('.lw-tree-item-label-container') && !target.classList.contains('lw-arrow-down')) ||
                target.closest('.lw-task-connection') || target.closest('.lw-task-label-container')) {

                if (that._checkDoubleClick(originalEvent)) {
                    return;
                }
            }

            if (!target.closest('.lw-tree-item-label-container') && !target.closest('lw-scroll-bar')) {
                const index = that._getTreeItemIndex(target);
                let item;

                if (index !== undefined) {
                    item = that[`_${targetType}s`].filter(i => !i.hidden)[index];

                    that._itemClickDetails.type = targetType;

                    that._select(targetType, item);
                }
                else {
                    const timelineResource = target.closest('.lw-timeline-resource-cell');

                    if (timelineResource) {
                        that._dragDetails = { target: timelineResource };
                    }
                }
            }

            that._columnHeaderClicked = target.closest('.lw-task-tree-header') || target.closest('.lw-resource-tree-header');
            return;
        }

        if (target.closest('.lw-resource-timeline-view-cell') || that.disabled) {
            return;
        }

        const timelineTask = Array.from(that.$.timelineTasksContainer.children).find(t => t._task === timelineTaskCell._task);

        if (!timelineTask) {
            return;
        }

        const task = timelineTask._task;

        if (!task) {
            return;
        }

        //Task-bar Details
        if (timelineTask.getElementsByClassName('lw-timeline-task-fill')[0] || that.$.timeline.hasAttribute('task-bar-hovered')) {
            //Check if Fill of a TaskBar is pressed
            if (target.closest('.lw-timeline-task-fill') || (timelineTask.classList.contains('milestone') && target.closest('.lw-task-container'))) {
                if (that._checkDoubleClick(originalEvent)) {
                    return;
                }
            }

            const taskBarThumb = target.closest('.lw-timeline-task-progress-thumb'),
                pageX = event.pageX - window.pageXOffset,
                pageY = event.pageY - window.pageYOffset;

            that._dragDetails = {};

            that._dragDetails.target = taskBarThumb || target;
            that._dragDetails.timelineTask = timelineTask;
            that._dragDetails.coordinates = { x: pageX, y: pageY };

            const targetRect = (taskBarThumb || timelineTask).getBoundingClientRect();

            that._dragDetails.offset = { x: pageX - targetRect.left, y: pageY - targetRect.top };

            if (taskBarThumb || (!taskBarThumb && task.type === 'project' && task.synchronized && !task.dragProject)) {
                if (target.closest('.lw-task-connection-point')) {
                    that._dragDetails.timelineTask = undefined;
                    that._dragDetails.relatedConnections = {};
                }

                return;
            }

            if (that.resizeHandlesVisibility === 'visible' || (LW.Utilities.Core.isMobile && that.resizeHandlesVisibility === 'auto')) {
                if (target.closest('.lw-timeline-task-fill')) {
                    that._checkTaskBarResizability(event);
                }
                else {
                    that.$.timeline.removeAttribute('task-bar-hovered');
                }
            }

            if (that.rightToLeft) {
                that._dragDetails.originalPosition = { x: that.$.timelineContent.offsetWidth - (timelineTask.offsetLeft + timelineTask.offsetWidth), y: timelineTask.offsetTop };
            }
            else {
                that._dragDetails.originalPosition = { x: timelineTask.offsetLeft, y: timelineTask.offsetTop };
            }

            that._dragDetails.originalSize = { width: timelineTask.offsetWidth, height: timelineTask.offsetHeight };
            that._dragDetails.min = {};
            that._dragDetails.max = {};

            that._setDragLimits(target);
        }
    }


    /**
     * Document Move Event Handler
     * @param {any} event
     */
    _documentMoveHandler(event) {
        const that = this;

        //Hovers a task
        if (!that._dragDetails || !that._dragDetails.target) {
            let target = event.originalEvent.target;

            if (that.shadowRoot && target === that) {
                target = event.originalEvent.composedPath()[0];
            }

            that._handleTreeItemHover(that._getTreeItemIndex(target), target);

            if (that._hoveredItemDetails === undefined) {
                that._handleTimelineHover(event);
            }

            that._checkTaskBarResizability(event);
            return;
        }

        //Handles the connection line feedback
        if (that._dragDetails.target.classList.contains('lw-task-connection-point')) {
            that._setConnectionFeedback(event);
            that._handleTimelineHover(event);

            //Handles autoScroll
            that._autoScroll(event);
            return;
        }

        //Handles Task Progress manipulation
        if (that._dragDetails.target.classList.contains('lw-timeline-task-progress-thumb')) {
            that._handleTaskProgressChange(event);
            return;
        }

        //Handles autoScroll
        that._autoScroll(event);

        if (that._autoScrolling) {
            return;
        }

        //Handles Task Bar resizing
        if (that.$.timeline.hasAttribute('task-bar-hovered')) {
            that._handleTaskBarResize(event);
            return;
        }

        //Handles Task bar dragging
        if (that._dragDetails.target.closest('.lw-timeline-task-fill') && that._dragDetails.timelineTask && !that._dragDetails.timelineTask.hasAttribute('disable-drag')) {
            that._handleTaskBarDrag(event);
            return;
        }
    }

    /**
    * Document Up event Handler
    * @param {any} event
    */
    _documentUpHandler(event) {
        const that = this,
            originalEvent = event.originalEvent;
        let target = originalEvent.target;

        that._upHandler();

        //Handle sorting by column
        that._handleColumnSorting(target);

        if (!that._dragDetails) {
            that._handleItemClick(originalEvent);
            return;
        }

        that._scrollView.disableSwipeScroll = false;

        if (that.shadowRoot && target === that) {
            target = originalEvent.composedPath()[0];
        }

        if (that.hasAttribute('connecting-task')) {
            const connectionDetails = that._connectTask(event),
                tasks = that._tasks

            that._setConnectionFeedback();

            if (connectionDetails) {
                that.$.fireEvent('connectionEnd', {
                    startIndex: tasks.indexOf(connectionDetails.taskStart),
                    endIndex: tasks.indexOf(connectionDetails.target),
                    type: connectionDetails.type
                });
                that._autoSchedule(connectionDetails.taskStart._task);
            }

            if (LW.Utilities.Core.isMobile) {
                that._handleTimelineHover(event, true);
            }

            delete that._dragDetails;
            return;
        }

        const targetTaskBar = that._dragDetails.timelineTask;

        if (!targetTaskBar) {
            delete that._dragDetails;
            return;
        }

        let targetTask;

        if (targetTaskBar) {
            targetTask = Array.from(that.$.taskTimelineCellsContainer.children).find(t => t._task === targetTaskBar._task);
        }

        if (that.hasAttribute('dragged')) {
            that._snapToNearest(targetTaskBar);
            that._checkWorkingDays(targetTaskBar);

            //Refresh the project if any
            that._refreshProject(targetTask._task.$.project);

            const taskMinDateLine = targetTask.getElementsByClassName('lw-task-bar-limitter-min-date')[0],
                taskMaxDateLine = targetTask.getElementsByClassName('lw-task-bar-limitter-max-date')[0]

            if (taskMinDateLine) {
                taskMinDateLine.parentElement.removeChild(taskMinDateLine);
            }

            if (taskMaxDateLine) {
                taskMaxDateLine.parentElement.removeChild(taskMaxDateLine);
            }

            that._autoSchedule(targetTaskBar._task);

            if (that._resourceTreeRefreshTimeout) {
                clearTimeout(that._resourceTreeRefreshTimeout);
                delete that._resourceTreeRefreshTimeout;
                that._refreshAssignedResources(targetTask._task);
            }
            else if (that.snapToNearest || that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0) {
                that._refreshAssignedResources(targetTask._task);
            }

            that.removeAttribute('dragged');

            that.$.fireEvent('dragEnd', {
                index: that._tasks.indexOf(targetTask._task),
                dateStart: new Date(targetTask._task.dateStart),
                dateEnd: new Date(targetTask._task.dateEnd)
            });
        }
        else if (that.hasAttribute('progress-change')) {
            if (that._resourceTreeRefreshTimeout) {
                clearTimeout(that._resourceTreeRefreshTimeout);
                delete that._resourceTreeRefreshTimeout;
                that._refreshAssignedResources(targetTask._task, ['progress']);
            }

            that.removeAttribute('progress-change');
            that.$.fireEvent('progressChangeEnd', { index: that._tasks.indexOf(targetTask._task), progress: targetTask._task.progress || 0 });
        }
        else if (that.hasAttribute('resized')) {
            that._snapToNearest(targetTaskBar);

            //Refresh the project if any
            that._refreshProject(targetTask._task.$.project);

            if (that._resourceTreeRefreshTimeout) {
                clearTimeout(that._resourceTreeRefreshTimeout);
                delete that._resourceTreeRefreshTimeout;
                that._refreshAssignedResources(targetTask._task, ['workload']);
            }
            else if (that.snapToNearest) {
                that._refreshAssignedResources(targetTask._task, ['workload']);
            }

            that.removeAttribute('resized');
            that.$.fireEvent('resizeEnd', {
                index: that._tasks.indexOf(targetTask._task),
                dateStart: targetTask._task.dateStart,
                dateEnd: targetTask._task.dateEnd
            });
            that._autoSchedule(targetTaskBar._task);
        }
        else {
            const taskBar = target.closest('.lw-timeline-task');

            if (taskBar === targetTaskBar) {
                that._select('task', targetTask._task, true);
                delete that._dragDetails;
                that._handleItemClick(originalEvent);
            }
        }

        const taskMaxLine = targetTaskBar.getElementsByClassName('lw-task-bar-limitter-max')[0],
            taskMinLine = targetTaskBar.getElementsByClassName('lw-task-bar-limitter-min')[0];

        if (taskMaxLine) {
            taskMaxLine.parentElement.removeChild(taskMaxLine);
        }

        if (taskMinLine) {
            taskMinLine.parentElement.removeChild(taskMinLine);
        }

        delete that._dragDetails;
    }

    /**
     * Handles item click event
     * @param {Object} event
     */
    _handleItemClick(event) {
        const that = this,
            eventTarget = event.target;

        if (that._dragDetails || !that._itemClickDetails || that._itemClickDetails.target !== eventTarget) {
            delete that._itemClickDetails;
            return;
        }

        let target, item, type;

        if (eventTarget.closest('.lw-timeline-task-fill')) {
            item = that._cloneObject(eventTarget.closest('.lw-timeline-task')._task);
            type = 'task';
        }
        else {
            target = eventTarget.closest('.lw-task-connection');

            if (target) {
                item = target.getAttribute('connection-id').split('-');
                item = { source: item[0], target: item[1], type: item[2] };
                type = 'connection';
            }
            else {
                target = eventTarget.closest('.lw-tree-item-label-container') || eventTarget.closest('.lw-task-label-container') ||
                    eventTarget.closest('.lw-resource-label-container');

                if (target) {
                    type = that.$.taskSplitter.contains(target) ? 'task' : 'resource';
                    item = that[`_${type}s`].filter(i => !i.hidden)[that._getTreeItemIndex(target)];
                }
            }
        }

        if (!item) {
            return;
        }

        delete that._itemClickDetails;
        that.$.fireEvent('itemClick', { originalEvent: event, type: type, item: item });
    }

    /**
     * Handles Column Sorting on DocumentUp
     * @param {Object} target - the event.target from DocumentUp event
     */
    _handleColumnSorting(target) {
        if (!target) {
            return;
        }

        const that = this,
            isColumnHeader = target.closest('.lw-task-tree-header') || target.closest('.lw-resource-tree-header');

        if (that.sortable && that._columnHeaderClicked && isColumnHeader && that._columnHeaderClicked === isColumnHeader) {
            const columnType = isColumnHeader.classList.contains('lw-task-tree-header') ? 'task' : 'resource',
                columnsHeaders = target.closest('lw-splitter').items,
                columnIndex = columnsHeaders.findIndex(item => item.contains(target)),
                sortingDirections = ['asc', 'desc'],
                columns = that[`${columnType}Columns`];
            let sortDirection = columnsHeaders[columnIndex].getAttribute('sort');

            if (that.sortMode === 'one') {
                columns.forEach(col => delete col.sort);
            }

            if (columns[columnIndex]) {
                if (!sortDirection) {
                    sortDirection = sortingDirections[0];
                }
                else if (sortDirection === sortingDirections[0]) {
                    sortDirection = sortingDirections[1]
                }
                else {
                    delete columns[columnIndex].sort;

                    if (that.sortMode === 'many') {
                        delete columns[columnIndex].sortOrder;
                    }

                    sortDirection = null;
                }

                if (sortDirection) {
                    if (that.sortMode === 'many') {
                        const sortOrder = parseInt(columns.filter(c => c.sort).map(c => c.sortOrder).reverse()[0] + '');

                        columns[columnIndex].sortOrder = isNaN(sortOrder) ? 0 : sortOrder - 1;
                    }

                    columns[columnIndex].sort = sortDirection;
                }
            }

            if (columnType === 'task') {
                //Sort Tasks
                that._sortTasks();
            }
            else {
                //Sort resources
                that._sortResources();
            }
        }

        delete that._columnHeaderClicked;
    }

    /**
     * Element move handler . Important! iOS Safari/Chrome fix, CSS 'touchAction' has no support on iOS
     */
    _moveHandler(event) {
        const that = this;

        if (!LW.Utilities.Core.isMobile) {
            event.stopPropagation();
        }

        if (that.hasAttribute('dragged') || that.hasAttribute('progress-change')) {
            if (event.originalEvent.type === 'touchmove') {
                event.originalEvent.preventDefault();
            }
        }
    }

    /**
     * Returns the hovered/selected tree task index
     * @param {any} target
     */
    _getTreeItemIndex(target) {
        const that = this;

        if (!target || !target.closest || !(that.shadowRoot || that).contains(target)) {
            return;
        }

        let item = target.closest('.lw-task-label-container') || target.closest('.lw-resource-label-container'), itemType;

        if (item) {
            itemType = item.classList.contains('lw-resource-label-container') ? 'resource' : 'task';

            return [].slice.call(item.closest('lw-splitter-item').getElementsByClassName(`lw-${itemType}-label-container`)).indexOf(item);
        }

        item = target.closest('.lw-tree-item-label-container');

        if (item) {
            return [].slice.call(item.closest('lw-tree').getElementsByClassName('lw-tree-item-label-container')).indexOf(item);
        }
    }

    /**
     * Set hover state to the Task Tree section
     * @param {any} index - index of the row to be hovered
     */
    _handleTreeItemHover(index, target) {
        const that = this;
        let splitter;

        if (target) {
            splitter = that.$.taskSplitter.contains(target) ? that.$.taskTreeSplitter : that.$.resourceTreeSplitter;
        }

        if (that._hoveredItemDetails && that._hoveredItemDetails.index === index && that._hoveredItemDetails.splitter === splitter) {
            return;
        }

        //Remove hovered state from the tree items
        const labelContainers = that.$.mainSplitter.querySelectorAll('lw-tree-item[hover], lw-tree-items-group[hover],' +
            ' .lw-task-label-container[hover], .lw-resource-label-container[hover]');

        for (let i = 0; i < labelContainers.length; i++) {
            labelContainers[i].removeAttribute('hover');
        }

        if (index === undefined || index < 0) {
            that._hoveredItemDetails = undefined;
            that._handleTimelineHover({ target: that });
            return;
        }

        const itemType = splitter === that.$.taskTreeSplitter ? 'task' : 'resource';

        if (LW.Utilities.Core.isMobile || !that[itemType + 'Columns'].length) {
            return;
        }

        const taskSplitterItems = splitter._items;

        //Set hover state to the new item
        for (let i = 0; i < taskSplitterItems.length; i++) {
            const taskSplitterItem = taskSplitterItems[i];
            let items;

            if (taskSplitterItem === that.$[itemType + 'TreeSplitterItem']) {
                items = [].slice.call(taskSplitterItem.querySelectorAll('lw-tree-item, lw-tree-items-group'));
            }
            else {
                items = [].slice.call(taskSplitterItem.getElementsByClassName(`lw-${itemType}-label-container`));
            }

            if (items[index]) {
                items[index].setAttribute('hover', '');
            }
        }

        that._hoveredItemDetails = { index: index, splitter: splitter };

        that._handleTimelineHover({
            target: that.$[itemType === 'task' ? 'timelineTasksContainer' : 'resourceTimelineCellsContainer'].children[index]
        });

    }

    /**
     * Checks for nonworkingdays/nonworkinghours after drag operation
     * @param {any} target
     */
    _checkWorkingDays(target) {
        const that = this;

        if (!that._dragDetails._taskDuration && !that._timelineCells.length) {
            return;
        }

        if (target instanceof HTMLElement && target.classList.contains('lw-timeline-task') && that.hasAttribute('dragged')) {
            if (that.nonworkingDays.length === 0 && that.nonworkingHours.length === 0 || !that._dragDetails._taskDuration) {
                return;
            }

            const timelineTask = target._task,
                workingDateEnd = that._getTaskWorkingDateEnd(timelineTask);

            //Calculate the max timeline date
            let maxTimelineDate = new Date(that._timelineCells[that._timelineCells.length - 1].date);

            if (that.view === 'year') {
                maxTimelineDate.setMonth(maxTimelineDate.getMonth() + 1);
                maxTimelineDate.setDate(0);
                maxTimelineDate.setHours(23, 59, 59, 999);
            }
            else if (that.view === 'month') {
                maxTimelineDate.setDate(maxTimelineDate.getDate() + 6 - maxTimelineDate.getDay());
                maxTimelineDate.setHours(23, 59, 59, 999);
            }
            else if (that.view === 'week') {
                maxTimelineDate.setHours(23, 59, 59, 999);
            }
            else {
                maxTimelineDate.setHours(maxTimelineDate.getHours(), 59, 59, 999);
            }

            //Refresh the timelineTaskBar
            timelineTask.dateEnd = timelineTask.maxDateEnd ? new Date(Math.min(workingDateEnd.getTime(), timelineTask.maxDateEnd.getTime())) : workingDateEnd;
            timelineTask.dateEnd = new Date(Math.min(maxTimelineDate.getTime(), timelineTask.dateEnd.getTime()));

            timelineTask.duration = that._convertDuration(that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0 ?
                that._getWorkingTime(timelineTask.dateStart, timelineTask.dateEnd) : timelineTask.dateEnd.getTime() - timelineTask.dateStart.getTime(), true);

            //Refresh the task's position
            that._setTimelineTaskBar(target._task, true);
            that._refreshTaskConnections(target._task);
            that._refreshTreeColumnsData(timelineTask, ['dateEnd', 'duration']);
        }
    }

    /**
     * Returns the dateEnd according to the duration of a task
     * @param {any} timelineTask
     */
    _getTaskWorkingDateEnd(timelineTask, workDuration) {
        if (!timelineTask || !timelineTask.dateStart) {
            return;
        }

        const that = this;
        let tempDate = new Date(timelineTask.dateStart), timeLeft, nextDate;

        if (!workDuration) {
            workDuration = that._dragDetails ? that._dragDetails._taskDuration : that._getWorkingTime(timelineTask.dateStart, timelineTask.dateEnd);
        }

        const sign = workDuration < 0 ? -1 : 1;

        //if (workDuration === that._getWorkingTime(timelineTask.dateStart, timelineTask.dateEnd)) {
        //    return new Date(tempDate.getTime() + workDuration);
        //}

        workDuration = Math.abs(workDuration);

        while (workDuration > 0) {
            const timeDiff = Math.min(workDuration, 60 * 60 * 1000 - (tempDate.getMinutes() * 60 * 1000 + tempDate.getSeconds() * 1000 + tempDate.getMilliseconds()));

            if (that.nonworkingDays.indexOf(tempDate.getDay()) > -1) {
                nextDate = new Date(tempDate);
                nextDate.setHours(0, 0, 0, 0);
                nextDate.setDate(tempDate.getDate() + sign * 1);

                timeLeft = Math.min(timeDiff, nextDate.getTime() - tempDate.getTime());

                tempDate = new Date(tempDate.getTime() + timeLeft);
                continue;
            }

            if (that.nonworkingHours.indexOf(tempDate.getHours()) > -1) {
                nextDate = new Date(tempDate);

                const currentTime = nextDate.getTime();

                nextDate.setHours(tempDate.getHours() + sign * 1, 0, 0, 0);

                if (currentTime === nextDate.getTime()) {
                    nextDate.setHours(tempDate.getHours() + sign * 2, 0, 0, 0);
                }

                timeLeft = Math.min(timeDiff, nextDate.getTime() - tempDate.getTime());

                tempDate = new Date(tempDate.getTime() + timeLeft);
                continue;
            }

            workDuration -= timeDiff;
            tempDate = new Date(tempDate.getTime() + sign * timeDiff);
        }

        return tempDate;
    }

    /**
     * Creates the connection line - a div element and appends in to the Timeline container
     * @param {any} x - x coordinate
     * @param {any} y - y coordinate
     * @param {any} size - width/height of the line
     * @param {any} orientation - horizontal/ vertical orientation
     */
    _createConnectingElement(x, y, size, orientation, arrow) {
        const that = this;

        if (!that._connectionDetails || !that._connectionDetails.start) {
            return;
        }

        const connectionDetails = that._connectionDetails,
            connectionType = connectionDetails.type,
            connectionContainer = that.$.timelineConnectionsContainer;

        let connection = connectionDetails.connections.shift();

        if (!connection) {
            connection = document.createElement('div');
            connection.classList.add('lw-task-connection');
        }

        connection.style.width = connection.style.width = '';

        if (orientation === 'horizontal') {
            connection.style.width = Math.abs(size) + 'px';
            connection.style.height = '';
        }
        else {
            connection.style.width = '';
            connection.style.height = Math.abs(size) + 'px';
        }

        //Reset from RTL
        connection.style[that.rightToLeft ? 'left' : 'right'] = '';
        connection.style[that.rightToLeft ? 'right' : 'left'] = x + 'px';
        connection.style.top = y + 'px';
        connection.setAttribute('connection-id', connectionDetails.id);

        //Accessibility
        const startLabel = connectionDetails.start.task._task.label,
            startPoint = connectionType === 0 || connectionType === 3 ? 'start' : 'end',
            endLabel = connectionDetails.end.task._task.label,
            endPoint = connectionType === 0 || connectionType === 1 ? 'start' : 'end';

        connection.setAttribute('aria-label', 'Connection between ' + startLabel + ' (' + startPoint + ') and ' + endLabel + ' (' + endPoint + ')');

        if (arrow) {
            let arrowDirection = connectionType === 0 || connectionType === 1 ? 'right' : 'left';

            if (that.rightToLeft) {
                arrowDirection = arrowDirection === 'left' ? 'right' : 'left';
            }

            connection.setAttribute('arrow-direction', arrowDirection);
        }
        else {
            connection.removeAttribute('arrow-direction');
        }

        if (!connection.parentElement) {
            connectionContainer.appendChild(connection);
        }
    }

    /**
    * Returns the type of connection between two timeline tasks
    * @param {any} connectionStart - the connection point FROM which the connection begins
    * @param {any} connectionEnd - the connection point TO which the connection ends
    */
    _getConnectionType(connectionStart, connectionEnd) {
        if (!connectionStart || !connectionEnd) {
            return;
        }

        let isFromStart = !connectionStart.classList.contains('end'),
            isToEnd = connectionEnd.classList.contains('end');

        //start-to-start
        if (isFromStart && !isToEnd) {
            return 0;
        }
        //end-to-start
        else if (!isFromStart && !isToEnd) {
            return 1;
        }
        //end-to-end
        else if (!isFromStart && isToEnd) {
            return 2;
        }
        //start-to-end
        else if (isFromStart && isToEnd) {
            return 3;
        }
    }

    /**
    * Sets the connection feedback
    * @param {any} event
    */
    _setConnectionFeedback(event) {
        const that = this;

        if (!that._dragDetails || !that._dragDetails.target || !event) {
            if (that._connectionFeedback && that._connectionFeedback.parentElement) {
                that._connectionFeedback.closest('.lw-timeline-task').removeAttribute('connection-point');
                that._connectionFeedback.parentElement.removeChild(that._connectionFeedback);
            }

            that.removeAttribute('connecting-task');
            delete that._connectionFeedback;
            return;
        }

        if (!that._dragDetails.target || !that._dragDetails.target.classList.contains('lw-task-connection-point')) {
            return;
        }

        const taskBar = that._dragDetails.target.closest('.lw-timeline-task');

        if (!taskBar) {
            return;
        }

        if (!that.hasAttribute('connecting-task')) {
            if (that.$.fireEvent('connectionStart', { startIndex: that._tasks.indexOf(taskBar._task) }).defaultPrevented) {
                delete that._dragDetails.target;
                return;
            }

            that.setAttribute('connecting-task', '');

            if (LW.Utilities.Core.isMobile) {
                that._scrollView.disableSwipeScroll = true;
            }
        }

        const isMilestone = taskBar.classList.contains('milestone');
        let startSideOffsetX = isMilestone ? -1 * taskBar.offsetHeight / 2 : 0;

        if (that._dragDetails.target.classList.contains('end')) {
            taskBar.setAttribute('connection-point', 'end');
            startSideOffsetX = isMilestone ? -1 * startSideOffsetX : taskBar.offsetWidth;
        }

        if (!that._connectionFeedback) {
            that._connectionFeedback = document.createElement('div');
            that._connectionFeedback.classList.add('lw-task-connection-feedback');
        }

        const startX = that._dragDetails.coordinates.x + ((that.rightToLeft ? -1 : 1) * startSideOffsetX),
            startY = that._dragDetails.coordinates.y,
            offsetX = that._dragDetails.offset.x - (that.rightToLeft ? taskBar.offsetWidth : 0),
            offsetY = that._dragDetails.offset.y,
            currentX = event.pageX - window.pageXOffset + offsetX,
            currentY = event.pageY - window.pageYOffset + offsetY - taskBar.offsetHeight / 2;

        //calculates the rotation angle and length of the connection
        that._connectionFeedback.style.width = Math.sqrt(Math.pow(Math.abs(currentX - startX), 2) + Math.pow(Math.abs(currentY - startY), 2)) + 'px';
        that._connectionFeedback.style.transform = that.rightToLeft ?
            'rotate(' + ((Math.atan2(startY - currentY, startX - currentX) || 0) * 180 / Math.PI) + 'deg)' :
            'rotate(' + ((Math.atan2(currentY - startY, currentX - startX) || 0) * 180 / Math.PI) + 'deg)';

        if (!that._connectionFeedback.parentElement) {
            taskBar.firstElementChild.appendChild(that._connectionFeedback);
        }
    }

    /**
     * Determines the tasks to be connected
     * @param {any} event
     */
    _connectTask(event) {
        const that = this;
        let connectionStart, connectionEnd, taskBarStart, taskBarEnd, connectionType;

        if (event.originalEvent) {
            const originalEvent = event.originalEvent;
            let target = LW.Utilities.Core.isMobile ?
                document.elementFromPoint(originalEvent.pageX - window.pageXOffset, originalEvent.pageY - window.pageYOffset) : originalEvent.target;

            if (!that._dragDetails || !that._dragDetails.target || !target || !target.classList) {
                return;
            }

            if (that.shadowRoot && target === that) {
                target = LW.Utilities.Core.isMobile ?
                    that.shadowRoot.elementFromPoint(originalEvent.pageX - window.pageXOffset, originalEvent.pageY - window.pageYOffset) : originalEvent.composedPath()[0];
            }

            connectionStart = that._dragDetails.target.classList.contains('lw-task-connection-point') ? that._dragDetails.target : undefined;
            connectionEnd = target.classList.contains('lw-task-connection-point') ? target : undefined;

            if (connectionStart) {
                taskBarStart = connectionStart.closest('.lw-timeline-task');
            }

            if (connectionEnd) {
                taskBarEnd = connectionEnd.closest('.lw-timeline-task');
            }
            else if (LW.Utilities.Core.isMobile && target.classList.contains('lw-timeline-task-fill')) {
                taskBarEnd = target.closest('.lw-timeline-task');

                if (taskBarEnd) {
                    const left = originalEvent.pageX - window.pageXOffset - taskBarEnd.getBoundingClientRect().left;

                    connectionEnd = taskBarEnd.querySelector('.lw-task-connection-point.' + (left >= taskBarEnd.offsetWidth / 2 ? 'end' : 'start'));
                }

            }
        }
        //Handle direct task connection
        else {
            if (!event || event.length < 3) {
                return;
            }

            event = (event + '').split('-');
            event = that._getValidConnectionId(event[0], event[1], event[2], '_connectTask');

            if (event === undefined) {
                return;
            }

            const tasks = that._tasks;
            const getTimelineTask = function (index) {
                const timelineTasks = that.$.timelineTasksContainer.children;

                for (let i = 0; i < timelineTasks.length; i++) {
                    if (timelineTasks[i]._task === tasks[index]) {
                        return timelineTasks[i];
                    }
                }
            };
            const [taskStart, taskEnd] = [tasks[parseInt(event[0])], tasks[parseInt(event[1])]];

            connectionType = parseInt(event[2]);

            if (!taskStart || !taskEnd) {
                return;
            }

            if (taskStart.hidden || taskEnd.hidden) {
                //Check if the targetTask is already connected in the same chain
                if (that._isAutoScheduled(taskStart, taskEnd)) {
                    return;
                }

                //Update the task with the new connection info
                if (!that.hasAttribute('dragged') && !that.hasAttribute('resized')) {
                    that._updateConnection(tasks.indexOf(taskStart) + '-' + tasks.indexOf(taskEnd) + '-' + connectionType);
                }

                return;
            }

            taskBarStart = getTimelineTask([parseInt(event[0])]);
            taskBarEnd = getTimelineTask([parseInt(event[1])]);

            if (taskBarStart && taskBarEnd) {
                connectionStart = taskBarStart.querySelector('.lw-task-connection-point.' + (connectionType === 0 || connectionType === 3 ? 'start' : 'end'));
                connectionEnd = taskBarEnd.querySelector('.lw-task-connection-point.' + (connectionType === 0 || connectionType === 1 ? 'start' : 'end'));
            }
        }

        if (!connectionStart || !connectionEnd || !taskBarStart || !taskBarEnd || taskBarStart === taskBarEnd ||
            taskBarStart.classList.contains('lw-visibility-hidden') || taskBarEnd.classList.contains('lw-visibility-hidden')) {
            return;
        }

        //Check if the targetTask is already connected in the same chain
        if (that._isAutoScheduled(taskBarStart, taskBarEnd)) {
            return;
        }

        if (connectionType === undefined) {
            connectionType = that._getConnectionType(connectionStart, connectionEnd);
        }

        that._connectionDetails = {
            start: { point: connectionStart }, end: { point: connectionEnd }, type: connectionType
        };

        //Create the Task details for the connection
        that._setConnectionDetails();

        //Create the task connection
        that._createTaskConnection();

        const tasks = that._tasks,
            startTaskIndex = tasks.indexOf(taskBarStart._task),
            endTaskIndex = tasks.indexOf(taskBarEnd._task);

        //Update the task with the new connection info
        if (!that.hasAttribute('dragged') && !that.hasAttribute('resized')) {
            that._updateConnection(startTaskIndex + '-' + endTaskIndex + '-' + that._connectionDetails.type);
        }

        taskBarStart.setAttribute('connected', '');
        taskBarEnd.setAttribute('connected', '');

        if (event.originalEvent) {
            that.$.fireEvent('itemInsert', { type: 'connection', item: { source: startTaskIndex, target: endTaskIndex, type: that._connectionDetails.type } });
        }

        delete that._connectionDetails;

        return { taskStart: taskBarStart, taskEnd: taskBarEnd, type: connectionType };
    }

    /**
     * Checks if the target task is already connected to the starTask's connection chain
     */
    _isAutoScheduled(taskStart, taskEnd, removeLastConnection) {
        const that = this,
            tasks = that._tasks;
        let checkedTasks = {};

        function isConnected(task, targetIndex) {
            const taskEndConnections = task.connections || [],
                taskIndex = tasks.indexOf(task);

            checkedTasks[taskIndex] = true;

            for (let i = 0; i < taskEndConnections.length; i++) {
                const con = taskEndConnections[i],
                    conTarget = that._getTaskIndexById(con.target);

                if (conTarget === targetIndex) {
                    if (removeLastConnection) {
                        that._removeConnection(taskIndex + '-' + conTarget + '-' + con.type, true);
                    }

                    return true;
                }

                if (!checkedTasks[conTarget]) {
                    if (isConnected(tasks[conTarget], targetIndex)) {
                        return true;
                    }
                }
            }
        }

        if (!that.autoSchedule) {
            return;
        }

        //NOTE: Removes the connection between synhronized project and it's own subtasks
        //if (taskStart.type === 'project' && taskStart.synchronized && taskStart.tasks.indexOf(taskEnd) > -1) {
        //    that._removeConnection(tasks.indexOf(task) + '-' + tasks.indexOf(taskEnd) + '-' + con.type, true);
        //    return true;
        //}

        if (taskStart instanceof HTMLElement) {
            taskStart = taskStart._task;
        }

        if (taskEnd instanceof HTMLElement) {
            taskEnd = taskEnd._task;
        }

        return isConnected(taskEnd, tasks.indexOf(taskStart));
    }

    /**
     * Calculates the details for the connection
     */
    _setConnectionDetails() {
        const that = this;

        if (!that._connectionDetails) {
            return;
        }

        const connectionDetails = that._connectionDetails,
            connectionStart = connectionDetails.start.point,
            connectionEnd = connectionDetails.end.point,
            connectionType = connectionDetails.type;

        if (!connectionStart || !connectionEnd) {
            return;
        }

        let taskStart = connectionStart.closest('.lw-timeline-task'),
            taskEnd = connectionEnd.closest('.lw-timeline-task'), inverted,
            taskStartWidth = taskStart.offsetWidth,
            taskEndWidth = taskEnd.offsetWidth,
            taskStartOffsetLeft = taskStart.offsetLeft,
            taskEndOffsetLeft = taskEnd.offsetLeft,
            taskStartOffsetTop = taskStart.offsetTop,
            taskEndOffsetTop = taskEnd.offsetTop,
            connectionStartOffset = connectionStart.offsetLeft,
            connectionEndOffset = connectionEnd.offsetLeft;
        const isStartMilestone = taskStart.classList.contains('milestone'),
            isEndMilestone = taskEnd.classList.contains('milestone'),
            timelineTasks = [].slice.call(that.$.timelineTasksContainer.children),
            taskStartIndex = timelineTasks.indexOf(taskStart),
            taskEndIndex = timelineTasks.indexOf(taskEnd);

        if (that.rightToLeft) {
            const contentWidth = that.$.timelineContent.offsetWidth;

            taskStartOffsetLeft = contentWidth - (taskStartOffsetLeft + taskStartWidth);
            taskEndOffsetLeft = contentWidth - (taskEndOffsetLeft + taskEndWidth);
        }

        connectionDetails.id = (taskStartIndex + '-') + (taskEndIndex + '-') + connectionType;

        if (isStartMilestone) {
            taskStartWidth = taskStart.offsetHeight;
            taskStartOffsetLeft -= taskStartWidth / 2;
        }
        else if (isEndMilestone) {
            taskEndWidth = taskEnd.offsetHeight;
            taskEndOffsetLeft -= taskEndWidth / 2;
        }

        if (!connectionDetails.connectionStartOffset || !connectionDetails.connectionEndOffset) {
            //Calculate the start/end connectionPoint offsets
            if (connectionType === 0) {
                if (that.rightToLeft) {
                    connectionStartOffset = connectionStartOffset - (isStartMilestone ? taskStartWidth / 2 : taskStartWidth);
                    connectionEndOffset = connectionEndOffset - (isEndMilestone ? taskEndWidth / 2 : taskEndWidth);
                }
                else {
                    connectionStartOffset = Math.abs(connectionStartOffset) - connectionStart.offsetWidth - (isStartMilestone ? taskStartWidth / 2 : 0);
                    connectionEndOffset = Math.abs(connectionEndOffset) - connectionEnd.offsetWidth - (isEndMilestone ? taskEndWidth / 2 : 0);
                }
            }
            else if (connectionType === 1) {
                if (that.rightToLeft) {
                    connectionStartOffset = Math.abs(connectionStartOffset) - connectionStart.offsetWidth - (isStartMilestone ? taskStartWidth / 2 : 0);
                    connectionEndOffset = connectionEndOffset - (isEndMilestone ? taskEndWidth / 2 : taskEndWidth);
                }
                else {
                    connectionStartOffset = connectionStartOffset - (isStartMilestone ? taskStartWidth / 2 : taskStartWidth);
                    connectionEndOffset = Math.abs(connectionEndOffset) - connectionEnd.offsetWidth - (isEndMilestone ? taskEndWidth / 2 : 0);
                }
            }
            else if (connectionType === 2) {
                if (that.rightToLeft) {
                    connectionStartOffset = Math.abs(connectionStartOffset) - connectionStart.offsetWidth - (isStartMilestone ? taskStartWidth / 2 : 0);
                    connectionEndOffset = Math.abs(connectionEndOffset) - connectionEnd.offsetWidth - (isEndMilestone ? taskEndWidth / 2 : 0);
                }
                else {
                    connectionStartOffset = connectionStartOffset - (isStartMilestone ? taskStartWidth / 2 : taskStartWidth);
                    connectionEndOffset = connectionEndOffset - (isEndMilestone ? taskEndWidth / 2 : taskEndWidth);
                }
            }
            else {
                if (that.rightToLeft) {
                    connectionStartOffset = connectionStartOffset - (isStartMilestone ? taskStartWidth / 2 : taskStartWidth);
                    connectionEndOffset = Math.abs(connectionEndOffset) - connectionEnd.offsetWidth - (isEndMilestone ? taskEndWidth / 2 : 0);
                }
                else {
                    connectionStartOffset = Math.abs(connectionStartOffset) - connectionStart.offsetWidth - (isStartMilestone ? taskStartWidth / 2 : 0);
                    connectionEndOffset = connectionEndOffset - (isEndMilestone ? taskEndWidth / 2 : taskEndWidth);
                }
            }

            connectionDetails.start.offset = connectionStartOffset = connectionStartOffset + connectionStart.offsetWidth / 2;
            connectionDetails.end.offset = connectionEndOffset = connectionEndOffset + connectionEnd.offsetWidth / 2;
        }

        //Check if the connection should be inverted
        if ((connectionType === 0 && taskStartOffsetLeft > taskEndOffsetLeft) ||
            (connectionType === 1 && taskStartOffsetLeft + taskStartWidth + connectionStartOffset > taskEndOffsetLeft - connectionEndOffset && taskEndOffsetTop > taskStartOffsetTop) ||
            (connectionType === 2 && taskEndOffsetLeft + taskEndWidth > taskStartOffsetLeft + taskStartWidth) ||
            (connectionType === 3 && ((taskStartOffsetLeft - connectionStartOffset < taskEndOffsetLeft + taskEndWidth + connectionEndOffset && taskEndOffsetTop > taskStartOffsetTop) ||
                (taskStartOffsetLeft - connectionStartOffset > taskEndOffsetLeft + taskEndWidth + connectionEndOffset && taskStartOffsetTop > taskEndOffsetTop)))) {
            inverted = true;

            //Reverse the connection details
            let originalValue = taskStart;

            taskStart = taskEnd;
            taskEnd = originalValue;

            originalValue = connectionStartOffset;

            connectionStartOffset = connectionEndOffset;
            connectionEndOffset = originalValue;

            originalValue = taskStartWidth;

            taskStartWidth = taskEndWidth;
            taskEndWidth = originalValue;

            originalValue = taskStartOffsetLeft;

            taskStartOffsetLeft = taskEndOffsetLeft;
            taskEndOffsetLeft = originalValue;

            originalValue = taskStartOffsetTop;

            taskStartOffsetTop = taskEndOffsetTop
            taskEndOffsetTop = originalValue
        }

        //Calculate the start/end point
        let startX = taskStartOffsetLeft,
            endX = taskEndOffsetLeft;

        if ((!inverted && connectionType === 1) || (inverted && connectionType === 3)) {
            startX += taskStartWidth;
        }
        else if ((!inverted && connectionType === 3) || (inverted && connectionType === 1)) {
            endX += taskEndWidth;
        }
        else if (connectionType === 2) {
            startX += taskStartWidth;
            endX += taskEndWidth;
        }

        let connections = that.$.timelineConnectionsContainer.querySelectorAll('.lw-task-connection[connection-id^="' + taskStartIndex + '-' + taskEndIndex + '-' + '"]');

        //Check for the same connection but inverted
        if (connections.length === 0) {
            connections = that.$.timelineConnectionsContainer.
                querySelectorAll('.lw-task-connection[connection-id^="' + (taskEndIndex + '-' + taskStartIndex) + '"]');
        }

        connectionDetails.connections = [].slice.call(connections);

        connectionDetails.start.x = startX;
        connectionDetails.start.y = taskStartOffsetTop + connectionStart.offsetTop;
        connectionDetails.start.task = taskStart;

        connectionDetails.end.x = endX;
        connectionDetails.end.y = taskEndOffsetTop + connectionEnd.offsetTop;
        connectionDetails.end.task = taskEnd;

        connectionDetails.type = connectionType;
        connectionDetails.inverted = inverted;
    }

    /**
     * The Algorithm for creating the connection lines
     */
    _createTaskConnection() {
        const that = this,
            connectionDetails = that._connectionDetails;

        if (!connectionDetails) {
            return;
        }

        const borderWidth = 2 * (parseFloat(getComputedStyle(that).getPropertyValue('--lw-gantt-chart-timeline-task-connection-width')) || 1),
            startX = connectionDetails.start.x,
            startY = connectionDetails.start.y,
            connectionStartOffset = connectionDetails.start.offset,
            connectionStartOffsetTop = connectionDetails.start.point.offsetTop,
            endX = connectionDetails.end.x,
            endY = connectionDetails.end.y,
            connectionEndOffset = connectionDetails.end.offset,
            connectionType = connectionDetails.type,
            inverted = connectionDetails.inverted,
            isConnectionEndToStart = (!inverted && connectionType === 3) || (inverted && connectionType === 1),
            isConnectionStartToEnd = (!inverted && connectionType === 1) || (inverted && connectionType === 3);
        let x, y, length,
            lineStartX = startX,
            lineEndX = endX;

        if (isConnectionEndToStart) {
            lineStartX = startX - connectionEndOffset;
            lineEndX = endX + connectionEndOffset;
        }
        else if (isConnectionStartToEnd) {
            lineStartX = startX + connectionStartOffset;
            lineEndX = endX - connectionEndOffset;
        }

        const isStartBeforeEnd = lineStartX <= lineEndX && isConnectionEndToStart,
            isEndBeforeStart = lineStartX >= lineEndX && isConnectionStartToEnd,
            includeBorderWidth = connectionType === 2 || isConnectionStartToEnd;

        //recursive function for connection line drawing
        function createConnectionLine(direction) {
            if (x === endX) {
                return;
            }

            if (!direction) {
                if (!x) {
                    //Start
                    x = startX;
                    y = startY;

                    if (connectionType === 0 || (!inverted && connectionType === 3) || (inverted && connectionType === 1)) {
                        x -= connectionStartOffset;
                    }

                    that._createConnectingElement(x, y, connectionStartOffset, 'horizontal', connectionDetails.inverted);

                    if (includeBorderWidth) {
                        x += connectionStartOffset - borderWidth;
                    }

                    if (!isStartBeforeEnd && !isEndBeforeStart) {
                        createConnectionLine('vertical');
                    }
                    else {
                        that._createConnectingElement(x, y -= startY > endY ? connectionStartOffsetTop : 0, connectionStartOffsetTop, 'vertical');
                        y += startY < endY ? connectionStartOffsetTop : 0;
                    }
                }
                else {
                    //End
                    length = Math.abs(x - endX);

                    if (x >= endX) {
                        x += -1 * length;
                        length += borderWidth;
                    }

                    that._createConnectingElement(x, y + (startY < endY ? Math.abs(y - endY) : 0), length, 'horizontal', !connectionDetails.inverted);
                    x = endX;
                }

                createConnectionLine('horizontal');
            }
            else {
                if (direction === 'horizontal') {
                    length = x - endX + (isStartBeforeEnd ? -1 : 1) * connectionStartOffset;
                    x = lineStartX > lineEndX ? x - Math.abs(length) : x;
                    that._createConnectingElement(x, y, (lineStartX === lineEndX ? 0 : Math.abs(length)) + (includeBorderWidth ? borderWidth : 0), 'horizontal');

                    //Update the x position before creating the vertical line
                    x = lineStartX < lineEndX ? x - length : x;
                    createConnectionLine('vertical');
                }
                else {
                    length = Math.abs(y - endY);
                    y += startY < endY ? 0 : -1 * length;
                    x -= (inverted && connectionType === 1) || (!inverted && connectionType === 3 && startY > endY) ? borderWidth : 0;
                    that._createConnectingElement(x, y, length, 'vertical');

                    createConnectionLine();
                }
            }
        }

        createConnectionLine();

        //Removes unnececssary connecion elements
        connectionDetails.connections.map(con => con.parentElement.removeChild(con));
    }

    /**
     * Returns the numeric index of a task by it's id
     * @param {any} id
     */
    _getTaskIndexById(id, tasks) {
        const that = this;

        if (!tasks) {
            tasks = that._tasks;
        }

        let task = tasks.find(t => t.id === id);

        if (task) {
            return tasks.indexOf(task);
        }

        if (typeof id === 'number') {
            return isNaN(parseInt(id)) ? -1 : parseInt(id);
        }

        if (typeof id === 'object') {
            return that._getItemIndex(id, that._unsortedTasks ? 'unsortedTask' : 'task');
        }
    }

    /**
     * Refreshes the connections of a Task
     * @param {any} taskBar - a timeline Task bar
     */
    _refreshTaskConnections(taskBar) {
        const that = this,
            task = taskBar instanceof HTMLElement ? taskBar._task : taskBar,
            taskBarIndex = that._tasks.indexOf(task);

        if (taskBarIndex === undefined || (taskBar.classList && taskBar.classList.contains('lw-visibility-hidden'))) {
            return;
        }

        let relatedConnections;

        if (that._dragDetails) {
            relatedConnections = that._dragDetails.relatedConnections[taskBarIndex];
        }

        if (!relatedConnections) {
            relatedConnections = {};

            const tasks = that._tasks;

            for (let t = 0; t < tasks.length; t++) {
                const connections = tasks[t].connections.filter(con => that._getTaskIndexById(con.target) === taskBarIndex);

                if (connections.length > 0) {
                    relatedConnections[t] = connections;
                }
            }

            if (that._dragDetails) {
                that._dragDetails.relatedConnections[taskBarIndex] = relatedConnections;
            }
        }

        const connections = task.connections;

        //refresh the connections that start from the task
        for (let c = 0; c < connections.length; c++) {
            const con = connections[c];

            that._connectTask(taskBarIndex + '-' + that._getTaskIndexById(con.target) + '-' + con.type);
        }

        //refresh the connections that target tha task
        if (Object.keys(relatedConnections).length > 0) {
            for (const con in relatedConnections) {
                const cons = relatedConnections[con];

                for (let c = 0; c < cons.length; c++) {
                    that._connectTask(con + '-' + that._getTaskIndexById(cons[c].target) + '-' + cons[c].type);
                }
            }
        }
    }

    /**
     * Document Drag Start
     * @param {any} event
     */
    _dragStartHandler(event) {
        const that = this,
            closest = event.target.closest;

        if (that._dragDetails || (closest && closest.call(that, 'lw-gantt-chart') === that)) {
            event.preventDefault();
        }
    }

    /**
     * Returns the first visible cell object
     */
    _getFirstCellObjInView(timelineCells) {
        const that = this;

        if (!timelineCells) {
            timelineCells = that._timelineCells;
        }

        if (!timelineCells) {
            return;
        }

        const scrollLeft = Math.abs(that.scrollLeft);
        let firstCellObj, lastCellObj;

        for (let i = 0; i < timelineCells.length; i++) {
            const cellObj = timelineCells[i];

            if (cellObj.left + cellObj.width > scrollLeft) {
                firstCellObj = cellObj;
                break;
            }

            lastCellObj = cellObj;
        }

        if (!firstCellObj && lastCellObj) {
            firstCellObj = scrollLeft > lastCellObj.left ? lastCellObj : timelineCells[0];
        }

        return firstCellObj;
    }

    /**
    * Returns the limits of a project's subtasks. Used when dragProject attribute is set
    * @param {any} timelineTask
    */
    _getSubTaskLimits(timelineTask) {
        const that = this;

        if (!timelineTask) {
            return;
        }

        const task = timelineTask._task,
            subTasks = task.tasks;
        let min, max;

        if (!task.tasks || task.tasks.length === 0) {
            return;
        }

        let firstSubTask = subTasks[0],
            lastSubTask = subTasks[0];

        for (let i = 0; i < subTasks.length; i++) {
            const subTask = subTasks[i];

            if (!subTasks[i].dateEnd || !subTasks[i].dateStart) {
                continue;
            }

            if (!firstSubTask.dateStart) {
                firstSubTask = subTask[i];
            }

            if (!lastSubTask.dateEnd) {
                lastSubTask = subTask[i];
            }

            if (subTasks[i].dateEnd.getTime() > lastSubTask.dateEnd.getTime()) {
                lastSubTask = subTasks[i];
            }

            if (subTasks[i].dateStart.getTime() < firstSubTask.dateStart.getTime()) {
                firstSubTask = subTasks[i];
            }
        }

        const taskMaxWidth = that.$.timelineContent.offsetWidth;
        let subTaskOffsets, timelineSubTaskOffsetLeft, timelineSubTaskOffsetWidth;

        if (firstSubTask) {
            subTaskOffsets = that._getTimelineSubTaskOffset(firstSubTask);

            if (subTaskOffsets) {
                timelineSubTaskOffsetLeft = subTaskOffsets.left;
                timelineSubTaskOffsetWidth = subTaskOffsets.width;

                min = Math.max(0, that.rightToLeft ?
                    ((taskMaxWidth - timelineTask.offsetLeft - timelineTask.offsetWidth) - (taskMaxWidth - timelineSubTaskOffsetLeft - timelineSubTaskOffsetWidth)) :
                    (timelineTask.offsetLeft - timelineSubTaskOffsetLeft));
            }
        }

        if (lastSubTask) {
            subTaskOffsets = that._getTimelineSubTaskOffset(lastSubTask);

            if (subTaskOffsets) {
                timelineSubTaskOffsetLeft = subTaskOffsets.left;
                timelineSubTaskOffsetWidth = subTaskOffsets.width;

                if (that.rightToLeft) {
                    const timelineTaskRight = taskMaxWidth - timelineTask.offsetLeft - timelineTask.offsetWidth;

                    max = Math.max(timelineTaskRight, timelineTaskRight + taskMaxWidth - (taskMaxWidth - timelineSubTaskOffsetLeft));
                }
                else {
                    max = Math.max(timelineTask.offsetLeft, timelineTask.offsetLeft + taskMaxWidth - (timelineSubTaskOffsetLeft + timelineSubTaskOffsetWidth));
                }
            }
        }

        return { min: min, max: max }
    }
    /**
     * Calcuates the position and size of a task based on it's dates
     * @param {*} task - a GanttChartTask
     */
    _getTimelineSubTaskOffset(task) {
        const that = this,
            timelineTasks = that.$.timelineTasksContainer.children,
            timelineSubTask = timelineTasks[that._tasks.filter(t => !t.hidden).indexOf(task)];
        let taskOffsetLeft, taskOffsetRight, taskOffsetWidth;

        if (!timelineSubTask) {
            const cellStart = that._getTimelineTaskCellByDate(task.dateStart),
                cellEnd = that._getTimelineTaskCellByDate(task.dateEnd);

            if (cellStart) {
                taskOffsetLeft = cellStart.left + that._getTimelineTaskOffset(cellStart, task.dateStart) || 0;
            }

            if (cellEnd) {
                taskOffsetRight = cellEnd.left + that._getTimelineTaskOffset(cellEnd, task.dateEnd) || 0;
            }

            taskOffsetWidth = taskOffsetRight - taskOffsetLeft;
        }
        else {
            taskOffsetLeft = timelineSubTask.offsetLeft;
            taskOffsetWidth = timelineSubTask.offsetWidth;
        }

        return { left: taskOffsetLeft, width: taskOffsetWidth }
    }

    /**
     * Returns the limits in pixels according to minDateStart/minDateEnd/maxDateStart/maxDateEnd task attributes
     * @param {any} task
     */
    _getTaskDragLimits(task) {
        const that = this;

        //Calculates the min/max dateStart/dateEnd
        const dateStartLimits = that._getTaskBarPositionLimits(task._task, 'DateStart'),
            dateEndLimits = that._getTaskBarPositionLimits(task._task, 'DateEnd'),
            taskBar = that._dragDetails.timelineTask;
        let limits = {};

        if (dateStartLimits.min || dateEndLimits.min) {
            limits.min = Math.max(dateStartLimits.min || 0, Math.max(0, (dateEndLimits.min || 0) - taskBar.offsetWidth));
        }

        if (dateEndLimits.max) {
            limits.max = Math.max(0, dateEndLimits.max - taskBar.offsetWidth);
        }

        if (dateStartLimits.max) {
            limits.max = limits.max ? Math.min(dateStartLimits.max, limits.max) : dateStartLimits.max;
        }

        return limits;
    }

    /**
     * Returns the exact Date Range (start, end) according to the position of the taskBar
     * @param {any} taskBar
     */
    _getTaskBarDateRange(taskBar) {
        if (!taskBar) {
            return;
        }

        const that = this,
            taskBarLeft = that.rightToLeft ?
                (parseFloat(taskBar.style.right) || (that.$.timelineContent.offsetWidth - taskBar.offsetLeft - taskBar.offsetWidth)) :
                (parseFloat(taskBar.style.left) || taskBar.offsetLeft),
            taskBarWidth = parseFloat(taskBar.style.width) || taskBar.offsetWidth,
            cellStart = taskBar._cellStart,
            cellEnd = taskBar._cellEnd,
            timelineTask = taskBar._task,
            minDateStart = timelineTask.minDateStart,
            maxDateEnd = timelineTask.maxDateEnd;

        let dateStart, dateEnd;

        dateStart = that._getDateFromCell(taskBarLeft, cellStart);

        if (minDateStart && !(taskBar._task.type === 'project' && taskBar._task.synchronized)) {
            dateStart = new Date(Math.max(minDateStart.getTime(), dateStart.getTime()));
        }

        dateEnd = that._getDateFromCell(taskBarLeft + taskBarWidth, cellEnd);

        if (maxDateEnd && !(taskBar._task.type === 'project' && taskBar._task.synchronized)) {
            dateEnd = new Date(Math.min(maxDateEnd.getTime(), dateEnd.getTime()));
        }

        return { dateStart: dateStart, dateEnd: dateEnd };
    }

    /**
     * Returns the position and size of the Task Bar according to the Task startDate and startEnd
     * @param {any} taskBar
     */
    _getTaskBarDetails(taskBar) {
        const that = this;

        if (!taskBar.classList || !taskBar.classList.contains('lw-timeline-task')) {
            return;
        }

        const timelineTask = that.$.taskTimelineCellsContainer.children[that._tasks.filter(t => !t.hidden).indexOf(taskBar._task)];

        if (!timelineTask) {
            return;
        }

        let dateStart = new Date(timelineTask._task.dateStart);
        const dateEnd = new Date(timelineTask._task.dateEnd),
            cellStart = taskBar._cellStart,
            cellEnd = taskBar._cellEnd;

        if (!cellStart || !cellEnd) {
            //hide the task since it has no dateStart/dateEnd
            taskBar.classList.add('lw-visibility-hidden');
            return;
        }

        if (that.snapToNearest) {
            let left, width,
                dateStart = taskBar._task.dateStart,
                dateEnd = taskBar._task.dateEnd;
            const dateStartMin = new Date(cellStart.date),
                dateStartMax = that._getDateFromCell(cellStart.left + cellStart.width, cellStart),
                dateEndMin = new Date(cellEnd.date),
                dateEndMax = that._getDateFromCell(cellEnd.left + cellEnd.width, cellEnd);

            if (dateStartMax.getTime() - dateStart.getTime() >= dateStartMax.getTime() - dateStartMin.getTime()) {
                dateStart = dateStartMin;
                left = cellStart.left;
            }
            else {
                dateStart = dateStartMax;
                left = cellStart.left + cellStart.width;
            }

            if (taskBar._task.type !== 'milestone') {
                if (dateEndMax.getTime() - dateEnd.getTime() >= dateEnd.getTime() - dateEndMin.getTime()) {
                    dateEnd = dateEndMin;
                    width = cellEnd.left - left;
                }
                else {
                    dateEnd = dateEndMax;
                    width = cellEnd.left - left + cellEnd.width;
                }
            }

            taskBar._task.dateEnd = dateEnd;

            if (dateEnd.getTime() < dateStart.getTime()) {
                dateStart = new Date(dateEnd);
            }

            taskBar._task.dateStart = dateStart;

            return { left: left, width: width, top: timelineTask.offsetTop };
        }

        let taskBarLeft, taskBarWidth, daysInStartMonth, daysInEndMonth, startTimeProportion, endTimeProportion;

        switch (that.view) {
            case 'year': {
                daysInStartMonth = (new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0)).getDate();
                daysInEndMonth = (new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0)).getDate();

                const timeOffsetInDaysStart = ((dateStart.getHours() / 24) + (dateStart.getMinutes() / (60 * 24)) + (dateStart.getSeconds() / (60 * 60 * 24))),
                    timeOffsetinDaysEnd = ((dateEnd.getHours() / 24) + (dateEnd.getMinutes() / (60 * 24)) + (dateEnd.getSeconds() / (60 * 60 * 24)));

                // - 1 because month start with day 1 not day 0
                taskBarLeft = cellStart.left + ((dateStart.getDate() - 1 + timeOffsetInDaysStart) / daysInStartMonth * cellStart.width);
                taskBarWidth = cellEnd.left + ((dateEnd.getDate() - 1 + timeOffsetinDaysEnd) / daysInEndMonth * cellEnd.width) - taskBarLeft;
                break;
            }
            case 'month': {
                startTimeProportion = parseFloat(dateStart.getHours() + '.' + dateStart.getMinutes() + dateStart.getSeconds()) / 24 * (cellStart.width / 7);
                endTimeProportion = parseFloat(dateEnd.getHours() + '.' + dateEnd.getMinutes() + dateEnd.getSeconds()) / 24 * (cellStart.width / 7);

                taskBarLeft = cellStart.left + (((dateStart.getDay()) / 7) * cellStart.width) + startTimeProportion;
                taskBarWidth = cellEnd.left + (((dateEnd.getDay()) / 7) * cellEnd.width) - taskBarLeft + endTimeProportion;
                break;
            }
            case 'week': {
                startTimeProportion = parseFloat(dateStart.getHours() + '.' + dateStart.getMinutes() + dateStart.getSeconds()) / 24 * cellStart.width;
                endTimeProportion = parseFloat(dateEnd.getHours() + '.' + dateEnd.getMinutes() + dateEnd.getSeconds()) / 24 * cellStart.width;

                taskBarLeft = cellStart.left + startTimeProportion;
                taskBarWidth = cellEnd.left + (endTimeProportion - startTimeProportion) - cellStart.left;
                break;
            }
            case 'day':
                startTimeProportion = parseFloat(dateStart.getMinutes() + dateStart.getSeconds() / 60) / 60 * cellStart.width;
                endTimeProportion = parseFloat(dateEnd.getMinutes() + dateEnd.getSeconds() / 60) / 60 * cellStart.width;

                taskBarLeft = cellStart.left + startTimeProportion;
                taskBarWidth = cellEnd.left + (endTimeProportion - startTimeProportion) - cellStart.left;
                break;
        }

        return { width: timelineTask._task.type === 'milestone' ? '' : taskBarWidth, left: taskBarLeft, top: timelineTask.offsetTop };
    }

    /**
     * Returns the Task cell that contains the date
     * @param {any} task
     * @param {any} date
     */
    _getTimelineTaskCellByDate(date) {
        if (!date) {
            return;
        }

        const that = this,
            dateCells = that._timelineCells;
        let targetCell;

        dateCellsLoop: for (let c = 0; c < dateCells.length; c++) {
            const cell = dateCells[c];

            switch (that.view) {
                case 'year':
                    if (cell.date.getYear() === date.getYear() && cell.date.getMonth() === date.getMonth()) {
                        targetCell = dateCells[c];
                        break dateCellsLoop;
                    }

                    break;
                case 'month': {
                    let cellEndDate = new Date(cell.date);

                    cellEndDate.setDate(cellEndDate.getDate() + (6 - cellEndDate.getDay()) + 1);
                    cellEndDate.setMilliseconds(cellEndDate.getMilliseconds() - 1);

                    if (date.getTime() >= cell.date.getTime() && date.getTime() <= cellEndDate.getTime()) {
                        targetCell = dateCells[c];
                        break dateCellsLoop;
                    }

                    break;
                }
                case 'week':
                    if (cell.date.getYear() === date.getYear() && cell.date.getMonth() === date.getMonth() && cell.date.getDate() === date.getDate()) {
                        targetCell = dateCells[c];
                        break dateCellsLoop;
                    }

                    break;
                case 'day':
                    if (cell.date.getYear() === date.getYear() && cell.date.getMonth() === date.getMonth() &&
                        cell.date.getDate() === date.getDate() && cell.date.getHours() === date.getHours()) {
                        targetCell = dateCells[c];
                        break dateCellsLoop;
                    }

                    break;
            }
        }

        return targetCell;
    }

    /**
     * Handles inverted property. Reverses the position of the Timeline and Tree.
     */
    _handleInverted(isInitializing) {
        const that = this;

        if (isInitializing && !that.inverted && !that.rightToLeft) {
            return;
        }

        function invertSplitterItems(type) {
            if (!type) {
                type = 'task';
            }

            const splitter = that.$[`${type}Splitter`],
                [treeItem, timelineItem, vScroll, timelineContent, scrollName] = type === 'task' ?
                    [that.$.treeSplitterItem, that.$.timelineSplitterItem, that, that.$.timelineContent, 'scrollTop'] :
                    [that.$.resourceTreeItem, that.$.resourceTimelineSplitterItem, that.$.resourceVerticalScrollBar, that.$.resourceTimelineContent, 'value'],
                treeSize = that.treeSize !== treeItem.size ? treeItem.style[splitter._measurements.dimension] : that.treeSize;

            treeItem.size = '';
            splitter.removeChild(timelineItem);

            if ((that.inverted && !that.rightToLeft) || (!that.inverted && that.rightToLeft)) {
                splitter.insertBefore(timelineItem, treeItem);
            }
            else {
                splitter.appendChild(timelineItem);
            }

            treeItem.size = treeSize;
            timelineContent.scrollTop = vScroll[scrollName];
        }

        invertSplitterItems('task');
        invertSplitterItems('resource');
    }

    /**
     * Prepares the Resource Timeline
     */
    _createResourceTimeline() {
        const that = this;

        if (!that._resources) {
            return;
        }

        const resources = that._resources.filter(res => !res.hidden);

        that._handleResourcePanelVisibility();

        if (!that.$.mainSplitter.contains(that.$.resourceSplitterItem)) {
            if (!that._resources.length) {
                //Remove the items from the Resource Tree Splitter
                const treeSplitterItem = that.$.resourceTreeSplitter.items,
                    tree = that.$.resourceTree;

                for (let i = 0; i < treeSplitterItem.length; i++) {
                    const splitterItem = treeSplitterItem[i];

                    if (splitterItem.contains(tree)) {
                        tree.dataSource = [];
                    }
                    else {
                        const dataContainer = splitterItem.getElementsByClassName('lw-resource-tree-content')[0];

                        if (dataContainer) {
                            dataContainer.innerHTML = '';
                        }
                    }
                }

                that.$.resourceTimelineCellsContainer.innerHTML = '';
            }

            return;
        }

        const headerContent = that.$.resourceSplitterItemHeader.innerHTML;

        if (that.resourcePanelHeaderTemplate && !headerContent || !that.resourcePanelHeaderTemplate && headerContent) {
            that._handleHeaderTemplate('resource');
        }

        that._recycleResourceHeaderCells();

        that.$.resourceTimelineCellsContainer.innerHTML = '';

        const selectedIndexes = that.$.resourceTree.selectedIndexes,
            selectedResources = selectedIndexes.map(i => that._getItemByTreeIndex('resource', i));

        for (let i = 0; i < resources.length; i++) {
            const cellsContainer = document.createElement('div');

            cellsContainer.classList.add('lw-timeline-resource-cell');
            cellsContainer._resource = resources[i];

            if (selectedResources.includes(resources[i])) {
                cellsContainer.setAttribute('selected', '');
            }

            //Populates the cellsContainer with cells
            that._refreshResourceTimeline(cellsContainer);

            that.$.resourceTimelineCellsContainer.appendChild(cellsContainer);
        }

        that.$.container.style.setProperty('--lw-gantt-chart-resource-timeline-content-height', that.$.resourceTimelineCellsContainer.offsetHeight + 'px');

        that.$.resourceTimelineContent.style.width = that.$.timelineContent.style.width;

        //Fixes a FireFox issue when height is 'auto'
        const isFireFox = LW.Utilities.Core.Browser.Firefox && !that.resourcePanelSize;

        if (isFireFox) {
            that.$.resourceSplitter.resizeTrigger.style.display = 'none';
        }

        that._synchronizeSplitters(that.$.taskSplitter, that.$.resourceSplitter);

        that.$.resourceTimeline.scrollLeft = that.$.timeline.scrollLeft;

        //Create the Resource Tree
        that._createTreeColumns(that.$.resourceTreeSplitter);
        that.$.resourceTree.refresh();

        that.$.resourceSplitter.resizeTrigger.style.display = null;

        //Recalc the splitte bar
        that.$.resourceSplitter.refresh();

        //Refresh the Timeline scrollbars
        that._refresh();

        //Highlight the resources corresponding to the selected task
        that._highlightAssignedItem('task', that.selectedIndexes[0]);
        that._highlightAssignedItem('resource', that._resources.indexOf(selectedResources[0]));
    }

    /**
     * Shows/Hidees the Resource panel
     */
    _handleResourcePanelVisibility() {
        const that = this,
            resources = that._resources.filter(res => !res.hidden),
            mainSplitter = that.$.mainSplitter,
            resourocesSplitterItem = that.$.resourceSplitterItem,
            taskSplitterItem = that.$.taskSplitterItem;

        if (!resources || !resources.length || that.hideResourcePanel) {
            if (!resourocesSplitterItem.size) {
                resourocesSplitterItem._size = resourocesSplitterItem.style[mainSplitter._measurements.dimension];
            }

            if (that._resourceScrollView) {
                that._resourceScrollView.unlisten();
                delete that._resourceScrollView;
            }

            that._handleResourceTreeEvents();

            if (mainSplitter.contains(resourocesSplitterItem)) {
                mainSplitter.removeChild(resourocesSplitterItem);
                that._refresh();
            }

            //Reset the size/min props of the TaskPanel
            taskSplitterItem.size = '';
            taskSplitterItem.min = '';
            that.$.resourceTree.selectedIndexes = [];
            that._highlightAssignedItem('resource');
            return;
        }

        if (!mainSplitter.contains(resourocesSplitterItem)) {
            resourocesSplitterItem.size = resourocesSplitterItem._size || that.resourcePanelSize;
            that._handleResourceTreeEvents(true);
            mainSplitter.appendChild(resourocesSplitterItem);

            //NOTE: Necessary when Gantt is with height 'auto'. Sets the size of the Task Panel
            that.$.taskSplitterItem._setSize('size', that.taskPanelSize);

            //Set the previous size of the Task Splitter Panel
            that._resourceScrollView = new LW.Utilities.Scroll(that.$.resourceSplitterItem, that.$.horizontalScrollBar, that.$.resourceVerticalScrollBar);
        }

        //Synchronize the min/size properties between Timelines
        that._synchronizeSplitters(that.$.taskSplitter, that.$.resourceSplitter);
    }

    /**
     * Recycles the content of the resource Timeline Cells
     */
    _refreshResourceTimeline(cellsContainer) {
        const that = this;

        if (!that._resources) {
            return;
        }

        const resources = that._resources.filter(res => !res.hidden);

        if (that.hideResourcePanel || !resources.length) {
            return;
        }

        //Updates a specific resource Timeline cell
        if (cellsContainer) {
            that._refreshResourceTimelineContent(cellsContainer._resource, cellsContainer);
            return;
        }

        that._recycleResourceHeaderCells();
        that.$.resourceTimelineContent.style.width = that.$.timelineContent.style.width;
    }

    /**
     * Sets the content of the resource timeline cells. Load Diagram / Histogram
     * @param {any} resource
     */
    _refreshResourceTimelineContent(resource, timelineResource) {
        const that = this,
            index = that._resources.indexOf(resource);

        if (index < 0) {
            return;
        }

        const timelineTasksContainer = that.$.timelineTasksContainer.children,
            resourceTimelineCellsContainer = that.$.resourceTimelineCellsContainer,
            resourceTasks = that._getResourceTasks(resource, true);

        function getTimelineCellsContainer() {
            const resourceTimelineCells = resourceTimelineCellsContainer.children;

            //Reset the Resource timeline content
            for (let i = 0; i < resourceTimelineCells.length; i++) {
                if (resourceTimelineCells[i]._resource === resource) {
                    return resourceTimelineCells[i];
                }
            }
        }

        if (!timelineTasksContainer.length) {
            const resourceTimelineCells = resourceTimelineCellsContainer.children;

            //Reset the Resource timeline content
            for (let i = 0; i < resourceTimelineCells.length; i++) {
                resourceTimelineCells[i].innerHTML = '';
            }

            return;
        }

        if (!resourceTasks.length || resource.hidden) {
            const timelineResource = getTimelineCellsContainer();

            if (timelineResource) {
                timelineResource.innerHTML = '';
            }

            return;
        }

        if (!timelineResource) {
            timelineResource = getTimelineCellsContainer();

            if (!timelineResource) {
                return;
            }
        }

        let timelineResourceCells = timelineResource.children;

        if (!timelineResourceCells) {
            return;
        }

        const timelineViewContainer = that.$.timelineViewCells,
            timelineViewCells = timelineViewContainer.children,
            cellsNeeded = timelineViewCells.length;
        let fragment;

        if (timelineResourceCells.length !== cellsNeeded) {
            fragment = document.createDocumentFragment();

            while (timelineResourceCells.length) {
                fragment.appendChild(timelineResource.firstElementChild);
            }

            timelineResourceCells = fragment.children;

            if (timelineResourceCells.length > cellsNeeded) {
                while (timelineResourceCells.length && timelineResourceCells.length !== cellsNeeded) {
                    fragment.removeChild(fragment.firstElementChild);
                }
            }
            else if (timelineResourceCells.length < cellsNeeded) {
                while (timelineResourceCells.length !== cellsNeeded) {
                    fragment.appendChild(timelineViewCells[0].cloneNode());
                }
            }

            if (that.hasAnimation) {
                timelineResource.appendChild(fragment);
                timelineResourceCells = timelineResource.children;
            }
        }

        //Reset the load
        for (let i = 0; i < timelineResourceCells.length; i++) {
            const cell = timelineResourceCells[i],
                timelineCell = timelineViewCells[i];

            cell.classList.remove('hide-left-border', 'hide-right-border');
            cell.classList.add('lw-resource-timeline-view-cell');
            cell.style.width = timelineCell.style.width;
            cell.style.left = timelineCell.style.left;
            cell.style.right = timelineCell.style.right;
            cell.removeAttribute('load');
            cell.style.height = '';
            cell.innerHTML = '';

            if (resource.class) {
                cell.classList.add(resource.class);
            }
        }

        //Calcualtes the working time for a given cell
        function getCellWorkingTime(task, cell) {
            const taskDateStart = task.dateStart,
                taskDateEnd = task.dateEnd,
                cellDateStart = cell._date,
                cellDateEnd = (date => {
                    switch (that._view || that.view) {
                        case 'year':
                            return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
                        case 'month':
                            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - date.getDay(), 23, 59, 59, 999);
                        case 'week':
                            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                        case 'day':
                            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 59, 59, 999);
                    }
                })(cellDateStart),
                dateFrom = task.dateStart.getTime() < cellDateStart.getTime() ? cellDateStart : taskDateStart,
                dateTo = taskDateEnd.getTime() > cellDateEnd.getTime() ? cellDateEnd : taskDateEnd,
                workTime = Math.round(that._getWorkingTime(dateFrom, dateTo) / (1000 * 60 * 60));

            //Convert to Hours
            return {
                value: workTime,
                max: dateFrom.getTime() === cellDateStart.getTime() && dateTo.getTime() === cellDateEnd.getTime() ?
                    workTime : Math.round(that._getWorkingTime(cellDateStart, cellDateEnd) / (1000 * 60 * 60))
            }
        }

        //Counts the number of taks assigned to a cell
        let cellTaskIndexAssigned = {};
        const tasks = that._tasks.filter(t => !t.hidden);

        //Recalculate the load
        for (let i = 0; i < resourceTasks.length; i++) {
            const task = resourceTasks[i];

            if (task.hidden) {
                continue;
            }

            const taskIndex = tasks.indexOf(task),
                timelineTask = timelineTasksContainer[taskIndex],
                taskCellStartDate = timelineTask._cellStart.date,
                taskCellEndDate = timelineTask._cellEnd.date;

            for (let c = 0; c < timelineViewCells.length; c++) {
                let cell = timelineViewCells[c],
                    cellDateStart = cell._date;

                if (!cellDateStart) {
                    continue;
                }

                if (cellDateStart.getTime() < taskCellStartDate.getTime() || cellDateStart.getTime() > taskCellEndDate.getTime() ||
                    task.dateEnd.getTime() === cellDateStart.getTime()) {
                    continue;
                }

                let capacity, maxCapacity;

                if (cellTaskIndexAssigned[c] && cellTaskIndexAssigned[c].indexOf(taskIndex) < 0) {
                    cellTaskIndexAssigned[c].push(taskIndex);
                }
                else if (!cellTaskIndexAssigned[cell]) {
                    cellTaskIndexAssigned[c] = [taskIndex];
                }

                if (that.resourceTimelineMode === 'custom') {
                    if (!that.resourceTimelineFormatFunction) {
                        continue;
                    }

                    cell = timelineResourceCells[c];

                    cell.innerHTML = that.resourceTimelineFormatFunction.call(that, cellTaskIndexAssigned[c] || [], index, new Date(cellDateStart)) || '';
                    continue;
                }

                if (that.resourceTimelineView === 'tasks') {
                    capacity = 1;
                    maxCapacity = resource.maxCapacity;
                }
                else if (that.resourceTimelineView === 'hours') {
                    const workTime = getCellWorkingTime(task, cell),
                        numberOfDays = workTime.max / 24;

                    capacity = Math.round(workTime.value / workTime.max * resource.capacity * numberOfDays);
                    maxCapacity = Math.min(workTime.max, Math.round(resource.maxCapacity * numberOfDays));
                }
                else {
                    if (!that.resourceTimelineFormatFunction) {
                        continue;
                    }

                    let details = that.resourceTimelineFormatFunction.call(that, cellTaskIndexAssigned[c] || [], index, new Date(cellDateStart));

                    cell = timelineResourceCells[c];

                    if (details !== undefined && details !== null) {
                        details = typeof details !== 'object' ? [details] : Object.values(details);

                        if (details.length === 2) {
                            capacity = parseFloat(details[0]) || 0;
                            maxCapacity = parseFloat(details[1]) || 0;
                        }
                        else if (details.length === 1) {
                            cell.setAttribute('load', details[0]);
                            continue;
                        }
                    }
                }

                cell = timelineResourceCells[c];

                const load = (parseFloat(cell.getAttribute('load')) || 0) + (capacity || 0);

                load > maxCapacity ? cell.classList.add('warning') : cell.classList.remove('warning');

                if (that.resourceTimelineMode === 'histogram') {
                    const cellHeight = Math.min(100, parseFloat((load / maxCapacity).toFixed(2)) * 100),
                        previousCell = cell.previousElementSibling;

                    //Configure the side borders for the cells of the Histogram
                    if (previousCell) {
                        const previousCellHeight = parseFloat(previousCell.style.height) || 0;

                        if (cellHeight) {
                            if (previousCellHeight === cellHeight) {
                                cell.classList.add('hide-left-border');
                                previousCell.classList.add('hide-right-border');
                            }
                            else if (previousCellHeight > cellHeight) {
                                cell.classList.add('hide-left-border');
                                previousCell.classList.remove('hide-right-border');
                            }
                            else if (previousCellHeight < cellHeight) {
                                cell.classList.remove('hide-left-border');
                                previousCell.classList.add('hide-right-border');
                            }
                        }
                        else {
                            cell.classList.remove('hide-left-border');
                            previousCell.classList.remove('hide-right-border');
                        }
                    }

                    //Set new cell height
                    cell.style.height = cellHeight + '%';

                    if (load) {
                        cell.setAttribute('load', load + '/' + maxCapacity);
                    }

                    continue;
                }

                if (load) {
                    cell.setAttribute('load', load);
                }
            }
        }

        if (!that.hasAnimation && fragment) {
            timelineResource.appendChild(fragment);
        }
    }

    /**
     * Handles the event listeners of the Resource Tree
     * @param {any} listen
     */
    _handleResourceTreeEvents(listen) {
        const that = this;

        if (listen) {
            if (that._isResourceTreeListening) {
                return;
            }

            //Add Tree event listeners
            that.$resourceTree.listen('blur', that._treeBlurHandler.bind(that));
            that.$resourceTree.listen('change', that._taskTreeChangeHandler.bind(that));
            //that.$resourceTree.listen('collapse', that._taskTreeExpandHandler.bind(that));
            //that.$resourceTree.listen('expand', that._taskTreeExpandHandler.bind(that));
            that._isResourceTreeListening = true;
        }
        else {
            //Remove event listeners
            that.$resourceTree.unlisten('blur');
            that.$resourceTree.unlisten('change');
            //that.$resourceTree.unlisten('collapse');
            //that.$resourceTree.unlisten('expand');
            delete that._isResourceTreeListening;
        }
    }

    /**
     * Updates the header of the Resource timeline
     */
    _recycleResourceHeaderCells() {
        const that = this;

        if (!that.$.mainSplitter.contains(that.$.resourceSplitterItem)) {
            return;
        }

        const resourceTimelineViewContainer = that.$.resourceTimelineViewCells,
            resourceTimelineViewCells = resourceTimelineViewContainer.children,
            timelineViewCells = that.$.timelineViewCells.children;
        let fragment = document.createDocumentFragment();

        //Recycle the header
        if (timelineViewCells.length === resourceTimelineViewCells.length) {
            while (resourceTimelineViewCells.length) {
                fragment.appendChild(resourceTimelineViewContainer.firstElementChild);
            }

            for (let i = 0; i < timelineViewCells.length; i++) {
                const timelineViewCell = timelineViewCells[i],
                    resourceTimelineCell = fragment.children[i];

                resourceTimelineCell.style.left = timelineViewCell.style.left;
                resourceTimelineCell.style.right = timelineViewCell.style.right;

                resourceTimelineCell.style.width = timelineViewCell.style.width;
                resourceTimelineCell.innerHTML = timelineViewCell.innerHTML;

                if (timelineViewCell.hasAttribute('weekend')) {
                    resourceTimelineCell.setAttribute('weekend', '');
                }
                else {
                    resourceTimelineCell.removeAttribute('weekend');
                }

                if (timelineViewCell.hasAttribute('nonworking')) {
                    resourceTimelineCell.setAttribute('nonworking', '');
                }
                else {
                    resourceTimelineCell.removeAttribute('nonworking', '');
                }
            }
        }
        else {
            resourceTimelineViewContainer.innerHTML = '';

            for (let i = 0; i < timelineViewCells.length; i++) {
                fragment.appendChild(timelineViewCells[i].cloneNode(true));
            }
        }

        resourceTimelineViewContainer.appendChild(fragment);

        //Recycle the content
        if (that.$.resourceTimelineCellsContainer.children.length) {
            that._resources.forEach(r => that._refreshResourceTimelineContent(r));
        }
    }

    /**
     * Refreshes the vertical scroll bar for the resources
     */
    _refreshResourceScrollBar() {
        const that = this,
            resourceVScroll = that.$.resourceVerticalScrollBar;

        if (!that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            return;
        }

        //Caching the size's before they are re-calculated. Used to check if width/height of the container have changed.
        const newScrollHeight = Math.max(0, that.$.resourceTimelineCellsContainer.offsetHeight - that.$.resourceTimelineContent.offsetHeight);

        if (newScrollHeight === 0 && that.verticalScrollBarVisibility === 'visible') {
            resourceVScroll.max = 1;
        }
        else {
            resourceVScroll.max = newScrollHeight;
        }

        resourceVScroll.disabled = that.verticalScrollBarVisibility === 'disabled' || that.disabled || newScrollHeight <= 0;

        if (!that.$.container.classList.contains('vscroll') && resourceVScroll.disabled) {
            resourceVScroll.classList.add('lw-hidden');
        }
        else {
            resourceVScroll.classList.remove('lw-hidden');
            resourceVScroll.refresh();

            if (that.$.container.classList.contains('hscroll')) {
                that.$.horizontalScrollBar.classList.add('bottom-corner');
            }
            else if (!that.$.container.classList.contains('vscroll')) {
                that.$.horizontalScrollBar.classList.remove('bottom-corner');
            }
        }
    }

    /**
     * Handles the Resources
     */
    _handleResources(task) {
        const that = this,
            tasks = task ? [task] : that._tasks;

        if (!that._resources) {
            that._resources = [];
        }

        for (let i = 0; i < tasks.length; i++) {
            let taskResources = tasks[i].resources;

            if (!Array.isArray(taskResources)) {
                //Flattens the array
                taskResources = [taskResources].reduce((acc, value) => acc.concat(value), []);
            }

            for (let r = 0; r < taskResources.length; r++) {
                let res = taskResources[r];

                //if (typeof res === 'string' || typeof res === 'number') {
                //    res = { id: res };
                //}

                if (typeof res !== 'object' || !res || res.id === undefined || res.id === null) {
                    if (typeof res === 'number') {
                        taskResources[r] = res + '';
                    }

                    continue;
                }

                let resource = that._resources.find(r => r.id && r.id.toString() === res.id.toString()) || {};

                that._setResource(resource, res, tasks[i]);

                taskResources[r] = resource.id;

                if (Object.values(resource).length && !that._resources.includes(resource)) {
                    that._resources.push(resource);

                    //Calculate the properties that are based on the Tasks owners
                    that._refreshResource(resource);
                }
            }
        }

        if (that.sortable) {
            that._sortResources(true);
        }
    }

    /**
    * Refreshes the Resource assigned to a Task after user interaction with the Task Timeline
    * @param {any} task
    */
    _refreshAssignedResources(task, additionalColumns = []) {
        const that = this;

        if (!task || that._tasks.indexOf(task) < 0) {
            return;
        }

        //Refresh the workload of the assigned resources
        const taskResources = that._getTaskResources(task, true);

        for (let i = 0; i < taskResources.length; i++) {
            const resource = taskResources[i];
            let resourceColumns = [];

            that.resourceColumns.forEach(col => {
                if (col.formatFunction !== undefined) {
                    resourceColumns.push(col.value);
                }
            });

            resourceColumns.concat(additionalColumns);

            that._refreshResourceTimelineContent(resource);

            if (additionalColumns.includes('workload')) {
                that._refreshResource(resource, 'workload');
            }
            else if (additionalColumns.includes('progress')) {
                that._refreshResource(resource, 'progress');
            }

            if (resourceColumns.length) {
                that._refreshTreeColumnsData(resource, resourceColumns, 'resource');
            }
        }
    }

    /**
     * Refreshes the resource properties that are based on the Tasks
     * @param {any} resource
     * @param {any} prop
     */
    _refreshResource(resource, property) {
        const that = this;

        if (!that._resources.length) {
            return;
        }

        const resTasks = that._getResourceTasks(resource, true),
            //Workload and Capacity are always calculated in hours a day
            hourInMs = 1000 * 60 * 60 * 24;

        switch (property) {
            case 'progress':
                //Progress is based on the number of tasks a resource is assigned to
                resource.progress = parseFloat((resTasks.reduce((total, value) => total + value.progress, 0) / resTasks.length).toFixed(2));
                break;
            //NOTE: Total capacity calculation
            //case 'capacity':
            //    //Capacity is automatically calculated by default. Determined by the range of the Timeline
            //resource.capacity = parseFloat(((that._getWorkingTime(that.dateStart, that.dateEnd) / hourInMs) * resource.maxCapacity).toFixed(2));
            //    break;
            case 'workload':
                //Workload is determines by the duration of the tasks assigned to the resource
                resource.workload = parseFloat((that._convertDuration(resTasks.reduce((total, task) => total + task.duration, 0)) / hourInMs * resource.maxCapacity).toFixed(2));
                break;
            default:
                resource.progress = parseFloat((resTasks.reduce((total, value) => total + value.progress, 0) / resTasks.length).toFixed(2));
                //resource.capacity = parseFloat(((that._getWorkingTime(that.dateStart, that.dateEnd) / hourInMs) * resource.maxCapacity).toFixed(2));
                resource.workload = parseFloat((that._convertDuration(resTasks.reduce((total, task) => total + task.duration, 0)) / hourInMs * resource.maxCapacity).toFixed(2));
        }

        that._refreshResourceTimelineContent(resource);
    }

    /**
     * Sets the property of a resouce
     * @param {any} resource
     * @param {any} res
     */
    _setResource(resource, res) {
        if (!res || typeof res !== 'object') {
            return;
        }

        if (!resource.id) {
            resource.id = (res.id + '').trim();
        }
        else {
            resource.id = resource.id.trim();
        }

        if (!resource.$) {
            resource.$ = {};
        }

        resource.class = res.class || resource.class; // Timeline class for the resource
        resource.minCapacity = res.minCapacity || resource.minCapacity || 0; // 0 hours
        resource.maxCapacity = res.maxCapacity || resource.maxCapacity || 24; // 24 hours
        resource.progress = res.progress || resource.progress || 0; //The personal progress of the resource
        resource.capacity = res.capacity || resource.capacity || 8; // The capacity ( per cell) of the resource
        resource.type = res.type || resource.type; // the type of the resource
        resource.hidden = !!(typeof res.hidden === 'boolean' ? res.hidden : resource.hidden); //Used to filter resources
        resource.workload = resource.workload || 0;


        //resource.timelineFormatFunction = res.timelineFormatFunction || resource.timelineFormatFunction;

        //Total Capacity
        ////Capacity is automatically calculated by default. Determined by the range of the Timeline
        ////Capacity represents the maximum possible working capacity
        //if (that.dateStart && that.dateEnd) {
        //    resource.capacity = (that._getWorkingTime(that.dateStart, that.dateEnd) / (1000 * 60 * 60)) * resource.maxCapacity;
        //}

        //The capacity of the resource, e.g. how many hours can a user work per day, etc
        //resource.capacity = Math.min(Math.max(resource.minCapacity, resource.capacity), resource.maxCapacity);

        //The Label inside the Task Tree
        if (res.label) {
            resource.label = res.label;
        }
        else if (resource.label === undefined) {
            resource.label = '';
        }

        //TODO: Resource grouping
        //if (res.group) {
        //    resource.group = res.group;
        //}
        //else {
        //    resources.group = that.localize('Other');
        //}

        //The quantity of the resource
        if (res.value) {
            resource.value = res.value;
        }

        ////Formatting function for the label
        //if (res.formatFunction) {
        //    resource.formatFunction = res.formatFunction;
        //}

        return resource;
    }

    /**
     * Inserts a new resource
     * @param {any} resource
     */
    insertResource(index, resource) {
        const that = this,
            args = Array.from(arguments).filter(a => a !== undefined);
        let resources = that._resources;

        if (args.length === 1) {
            resource = args[0];
        }

        if (typeof resource !== 'object') {
            that.error(that.localize('incorrectArgument', { elementType: that.nodeName.toLowerCase(), methodName: 'insertResources', argumentName: 'resource' }));
            return;
        }

        if (resource.id && resources.find(r => r.id && r.id.toString() === resource.id.toString())) {
            that.updateResource(resource.id, resource);
            return;
        }

        let assignedTasks;

        if (resource.assignedTo) {
            assignedTasks = [resource.assignedTo].reduce((acc, value) => acc.concat(value, []));
        }

        resource = that._setResource({}, resource);

        if (!resource) {
            return;
        }

        const isSorted = !!that._unsortedResources;

        that._unsortResources();

        resources = that._resources;

        let targetItem;

        if (typeof index === 'number' && !isNaN(index)) {
            targetItem = resources[index];
        }
        else if (typeof index === 'string') {
            targetItem = resources.find((res) => res.id && res.id.toString() === index.toString());

            if (!targetItem) {
                targetItem = that._getItemByTreeIndex('resource', index);
            }
        }
        else if (typeof index === 'object') {
            targetItem = resources[that._getItemIndex(index, 'resource')];
        }

        index = resources.indexOf(targetItem);

        if (index < 0) {
            resources.push(resource);
        }
        else {
            resources.splice(index, 0, resource);
        }

        const tasks = that._tasks;

        //Assignes a resource to Task
        if (tasks.length) {
            if (assignedTasks !== undefined) {
                let targetTasks = [];

                if (!Array.isArray(assignedTasks)) {
                    assignedTasks = [assignedTasks];
                }

                assignedTasks.forEach(t => {
                    if (typeof t === 'number') {
                        targetTasks.push(tasks[t]);
                    }
                    else {
                        targetTasks = targetTasks.concat(tasks.filter(task => task.id && t.toString() === task.id.toString()));
                    }
                });

                for (let i = 0; i < targetTasks.length; i++) {
                    const task = targetTasks[i];

                    if (!task.disableResources && !task.resources.includes(resource.id.toString())) {
                        task.resources.push(resource.id);
                    }
                }

                if (that._isUpdating) {
                    that._isUpdating.type['resource'] = true;
                    return;
                }

                //Highlight the resources corresponding to the selected task
                that._highlightAssignedItem('task', that.selectedIndexes[0]);
                that._refreshResource(resource);
            }

            //Refreshes the Task Tree column associated with Resources
            if (that.taskColumns.find(taskCol => taskCol.value === 'resources')) {
                if (that._isUpdating) {
                    that._isUpdating.type['resource'] = true;
                    that._isUpdating.type['task'] = true;
                    return;
                }

                if (that.view !== 'resource' && that._view) {
                    that._refreshTimeline();
                }
                else {
                    const tasksToRefresh = that._tasks.filter(task => task.resources.includes(resource.id));

                    for (let i = 0; i < tasksToRefresh.length; i++) {
                        that._refreshTreeColumnsData(tasksToRefresh[i], ['resources']);
                    }
                }
            }
        }

        if (that._isUpdating) {
            that._isUpdating.type['resource'] = true;
            return;
        }

        if (isSorted) {
            that._sortResources();
            that.$.fireEvent('itemInsert', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        that._createResourceTimeline();

        that.$.fireEvent('itemInsert', { type: 'resource', item: that._cloneObject(resource) });
    }

    /**
     * Inserts a timeline resource
     * @param {any} index - index to insert at
     * @param {any} resource - the resource object
     */
    _insertTimelineResource(index, resource, insertAsLastItem) {
        const that = this,
            resourceCellsContainer = that.$.resourceTimelineCellsContainer;

        //Add the resource to the Timeline
        const cellsContainer = document.createElement('div');

        cellsContainer.classList.add('lw-timeline-resource-cell');
        cellsContainer._resource = resource;

        //Sets the content of the timeline resource
        that._refreshResourceTimelineContent(resource, cellsContainer);

        //Appends the new resource to the Timeline
        that.$.resourceTimelineCellsContainer.insertBefore(cellsContainer, index > -1 ? resourceCellsContainer.children[index] : undefined);

        //Update the size of the Resource Panel Splitter bar
        that.$.container.style.setProperty('--lw-gantt-chart-resource-timeline-content-height', resourceCellsContainer.offsetHeight + 'px');

        //Refreshes the Resource scroll bar
        that._refreshResourceScrollBar();

        //Insert a new Resource Tree item
        that._insertNewTreeItem(index, resource, insertAsLastItem, 'resource');

        //Refresh The tree
        that.$.resourceTree.refresh();

        //Highlight the resources corresponding to the selected task
        that._highlightAssignedItem('task', that.selectedIndexes[0]);
    }

    /**
     * Updates the Resources with the Task ids
     * @param {any} task
     * @param {any} taskResources
     */
    updateResource(resourceId, settings) {
        const that = this,
            isSorted = that._unsortedResources,
            resources = that._unsortedResources || that._resources;

        if (resourceId === undefined) {
            return;
        }

        const resDetails = that._getValidTaskAndIndex(resourceId, 'resource');

        if (!resDetails || !resDetails.item) {
            return;
        }

        let resource = resDetails.item;

        const isResourceHidden = resource.hidden;

        that._setResource(resource, settings);

        if (that._isUpdating) {
            that._isUpdating.type['resource'] = true;
            return;
        }

        //Refreshes the Task Tree column associated with Resources
        if (that.taskColumns.find(taskCol => taskCol.value === 'resources')) {
            if (that.view !== 'resource' && that._view) {
                that._refreshTimeline();
            }
            else {
                const tasksToRefresh = that._tasks.filter(task => task.resources.includes(resource.id));

                for (let i = 0; i < tasksToRefresh.length; i++) {
                    that._refreshTreeColumnsData(tasksToRefresh[i], ['resources']);
                }
            }
        }

        if (isSorted) {
            that._sortResources();
            that.$.fireEvent('itemUpdate', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        if (isResourceHidden !== resource.hidden) {
            //Add or remove the timeline resource
            const timelineResourceContainer = that.$.resourceTimelineCellsContainer;

            if (resource.hidden) {
                for (let i = 0; i < timelineResourceContainer.children.length; i++) {
                    const timelineResource = timelineResourceContainer.children[i];

                    if (timelineResource._resource === resource) {
                        //Remove the resource from the Timeline
                        timelineResourceContainer.removeChild(timelineResource)

                        //Remove the Resource from the Tree
                        that._removeTreeItem(i, 'resource');
                        that.$.container.style.setProperty('--lw-gantt-chart-resource-timeline-content-height', that.$.resourceTimelineCellsContainer.offsetHeight + 'px');
                        break;
                    }
                }
            }
            else {
                that._insertTimelineResource(resources.filter(r => !r.hidden).indexOf(resource), resource);
            }

            //Refresh the Timeline scrollbars
            that._refresh();

            //Hides the resource panel if no resources are left
            that._handleResourcePanelVisibility();
            that.$.fireEvent('itemUpdate', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        //Refresh the Tree columns of the resources
        that._refreshTreeColumnsData(resource, undefined, 'resource');

        //Refresh the Timeline Content of the Resource
        const timelineCellsContainers = that.$.resourceTimelineCellsContainer.children;

        for (let i = 0; i < timelineCellsContainers.length; i++) {
            const timelineCellsContainer = timelineCellsContainers[i];

            if (timelineCellsContainer._resource === resource) {
                that._refreshResourceTimelineContent(resource, timelineCellsContainer);
            }
        }

        that.$.fireEvent('itemUpdate', { type: 'resource', item: that._cloneObject(resource) });
    }

    /**
     * Removes a resource by id
     * @param {any} resourceId
     */
    removeResource(resourceId) {
        const that = this,
            isSorted = that._unsortedResources,
            resources = that._unsortedResources || that._resources;

        if (resourceId === undefined) {
            return;
        }

        let resource;

        if (typeof resourceId === 'number' && !isNaN(resourceId)) {
            resource = resources[resourceId];
        }
        else if (typeof resourceId === 'string') {
            resource = resources.find((res) => res.id && res.id.toString() === resourceId.toString());

            if (!resource) {
                resource = that._getItemByTreeIndex(that._unsortedResources ? 'unsortedResource' : 'resource', resourceId);
            }
        }
        else if (typeof resourceId === 'object') {
            resource = resources[that._getItemIndex(resourceId, that._unsortedResources ? 'unsortedResource' : 'resource')];
        }

        if (!resource) {
            return;
        }

        const index = resources.indexOf(resource);

        if (that._isUpdating) {
            resources.splice(resources.indexOf(resource), 1);

            //Will refresh both Panels
            that._isUpdating.type['resource'] = true;
            that._isUpdating.type['task'] = true;
            return;
        }

        resources.splice(resources.indexOf(resource), 1);

        //Refreshes the Task Tree column associated with Resources
        if (that.taskColumns.find(taskCol => taskCol.value === 'resources')) {
            if (that.view !== 'resource' && that._view) {
                that._refreshTimeline();
            }
            else {
                const tasksToRefresh = that._tasks.filter(task => task.resources.includes(resource.id));

                for (let i = 0; i < tasksToRefresh.length; i++) {
                    that._refreshTreeColumnsData(tasksToRefresh[i], ['resources']);
                }
            }
        }

        if (isSorted) {
            that._sortResources();
            that._resizeEventHandler();
            that.$.fireEvent('itemRemove', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        if (!resources.filter(r => !r.hidden).length) {
            that._createResourceTimeline();
            that._resizeEventHandler();
            that.$.fireEvent('itemRemove', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        //Remove the Resource from the Tree
        that._removeTreeItem(index, 'resource');

        //Remove the Resource from the Timeline
        if (that.$.resourceTimelineCellsContainer.children[index]) {
            that.$.resourceTimelineCellsContainer.removeChild(that.$.resourceTimelineCellsContainer.children[index]);
        }

        that.$.container.style.setProperty('--lw-gantt-chart-resource-timeline-content-height', that.$.resourceTimelineCellsContainer.offsetHeight + 'px');

        if (!that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            that.$.fireEvent('itemRemove', { type: 'resource', item: that._cloneObject(resource) });
            return;
        }

        //Refreshes the Resource scroll bar
        that._refreshResourceScrollBar();
        that._resizeEventHandler();
        that.$.fireEvent('itemRemove', { type: 'resource', item: that._cloneObject(resource) });
    }

    /**
     * Returns the tasks that a resource is assigned to
     */
    _getResourceTasks(resourceId, original) {
        const that = this,
            resources = that._resources,
            tasks = that._tasks;

        if (!resources.length || !tasks.length) {
            return;
        }

        let resource;

        if (typeof resourceId === 'object') {
            resource = resources.find(r => r.id && r.id.toString() === resourceId.id.toString());
        }
        else if (typeof resourceId === 'string' || typeof resourceId === 'number') {
            resource = resources.find(res => res.id && res.id.toString() === resourceId.toString()) || resources[resourceId];
        }

        if (!resource) {
            return;
        }

        let resourceTasks = [];
        const visibleTasks = that._tasks.filter(t => !t.hidden);

        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].resources.includes(resource.id)) {
                continue;
            }

            const task = tasks[i];

            resourceTasks.push(original ? task : {
                id: task.id,
                index: visibleTasks.indexOf(task),
                label: task.label,
                type: task.type,
                hidden: task.hidden,
                expanded: task.expanded,
                dateStart: task.dateStart,
                dateEnd: task.dateEnd,
                progress: task.progress,
                duration: task.duration
            });
        }

        return resourceTasks;
    }

    /**
     * Returns the resources of a task
     */
    _getTaskResources(taskId, original) {
        const that = this,
            tasks = that._tasks;
        let task;

        if (taskId === undefined || taskId === null || !tasks || !tasks.length) {
            return [];
        }

        if (typeof taskId === 'string') {
            task = tasks.find((task) => task.id && task.id.toString() === arguments[0].toString());

            if (!task) {
                task = tasks[that._tasks.indexOf(that._getItemByTreeIndex('task', taskId))];
            }
        }
        else if (typeof taskId === 'number') {
            task = tasks[taskId];
        }
        else if (typeof taskId === 'object') {
            task = tasks[that._getItemIndex(taskId, that._unsortedTasks ? 'unsortedTask' : 'task')];
        }

        if (task === undefined) {
            return [];
        }

        const taskResources = [task.resources].reduce((acc, value) => acc.concat(value), []);
        let resources = [];
        const visibleResources = that._resources.filter(r => !r.hidden);

        for (let i = 0; i < taskResources.length; i++) {
            const resource = that._resources.find(r => r.id && r.id.toString() === taskResources[i].toString());

            if (resource) {
                resources.push(original ? resource : {
                    id: resource.id,
                    index: visibleResources.indexOf(resource),
                    label: resource.label,
                    value: resource.value,
                    hidden: resource.hidden,
                    type: resource.type,
                    capacity: resource.capacity,
                    maxCapacity: resource.maxCapacity,
                    minCapacity: resource.minCapacity,
                    progress: resource.progress,
                    formatFunction: resource.formatFunction
                });
            }
        }

        return resources;
    }

    /**
     * Validator for the resources property
     * @param {any} oldValue - oldValue
     * @param {any} newValue - newValue
     */
    _resourceValidator(oldValue, newValue) {
        const that = this;

        if (Array.isArray(newValue) || newValue instanceof LW.ObservableArray || typeof newValue === 'number' ||
            typeof newValue === 'string' || newValue === null || newValue === undefined) {
            return newValue;
        }

        that.error(that.localize('invalidValue', { elementType: that.nodeName.toLowerCase(), property: 'resources', typeOne: 'array', typeTwo: 'number' }));
        return null;
    }

    /**
     * Handles the Task bar progress changing by dragging the thumb inside the task progress area
     * @param {any} event
     */
    _handleTaskProgressChange(event) {
        const that = this,
            targetTaskBarThumb = that._dragDetails.target,
            targetTask = targetTaskBarThumb.closest('.lw-timeline-task');

        if (that.disableTaskProgressChange) {
            return;
        }

        if (!that.hasAttribute('progress-change')) {
            if (that.$.fireEvent('progressChangeStart', { index: that._tasks.indexOf(targetTask._task), progress: targetTask._task.progress || 0 }).defaultPrevented) {
                delete that._dragDetails.target;
                return;
            }

            that.setAttribute('progress-change', '');
            that._scrollView.disableSwipeScroll = true;
        }

        const targetTaskProgressElement = targetTask.querySelector('.lw-timeline-task-progress'),
            taskFillElement = targetTaskProgressElement.parentElement,
            targetParentOffsetleft = taskFillElement.getBoundingClientRect().left,
            maxWidth = taskFillElement.offsetWidth,
            pageX = event.pageX - window.pageXOffset;

        if (!that._dragDetails.progress) {
            that._dragDetails.progress = targetTaskProgressElement.offsetWidth;
        }

        that._dragDetails.progress = Math.max(0, Math.min(maxWidth, that._dragDetails.progress + (that.rightToLeft ? -1 : 1) * (pageX - that._dragDetails.coordinates.x)));
        that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + that._dragDetails.offset.x,
            Math.min(targetParentOffsetleft + maxWidth + that._dragDetails.offset.x, pageX));

        const progress = that._dragDetails.timelineTask._task.progress = that._dragDetails.progress / maxWidth * 100,
            task = that._dragDetails.timelineTask._task;

        //Update the task with the new progress
        task.progress = parseFloat(progress.toFixed(2));

        that._setTaskBarProgress(task, targetTask);

        //Refresh
        that._refreshTreeColumnsData(task, ['progress']);

        //Throttling the resource refresh invocation
        if (that._resourceTreeRefreshTimeout) {
            clearTimeout(that._resourceTreeRefreshTimeout);
        }

        that._resourceTreeRefreshTimeout = setTimeout(function () {
            that._refreshAssignedResources(task, ['progress']);
            delete that._resourceTreeRefreshTimeout;
        }, that.resourcePanelRefreshRate);
    }

    /**
    * Handles the dragging of a Task Bar
    * @param {any} event
    */
    _handleTaskBarDrag(event) {
        const that = this;

        if (that.disableTaskDrag) {
            return;
        }

        if (Math.abs(event.pageX - that._dragDetails.coordinates.x) <= 5) {
            that._scrollView.disableSwipeScroll = true;
            return;
        }

        const targetTaskBar = that._dragDetails.timelineTask,
            timelineTask = Array.from(that.$.taskTimelineCellsContainer.children).find(t => t._task === targetTaskBar._task);

        if (!that.hasAttribute('dragged')) {
            if (that.$.fireEvent('dragStart', {
                index: that._tasks.indexOf(targetTaskBar._task),
                dateStart: targetTaskBar._task.dateStart,
                dateEnd: targetTaskBar._task.dateEnd
            }).defaultPrevented) {
                delete that._dragDetails.timelineTask;
                return;
            }

            that.setAttribute('dragged', '');

            const minPositionDelimiter = that._createDelimiter('min-date'),
                maxPositionDelimiter = that._createDelimiter('max-date');

            if (minPositionDelimiter) {
                timelineTask.appendChild(minPositionDelimiter);
            }

            if (maxPositionDelimiter) {
                timelineTask.appendChild(maxPositionDelimiter);
            }
        }

        if (!that._dragDetails.position) {
            that._dragDetails.position = { x: that._dragDetails.originalPosition.x, y: that._dragDetails.originalPosition.y };
        }

        const targetParentOffsetleft = timelineTask.getBoundingClientRect().left,
            maxWidth = timelineTask.offsetWidth,
            targetWidth = targetTaskBar.offsetWidth,
            minLeft = that._dragDetails.min.left || 0,
            maxLeft = that._dragDetails.max.left,
            pageX = event.pageX - window.pageXOffset;
        let maxLeftOffset = 0;

        that._dragDetails.position.x = Math.max(minLeft,
            Math.min(maxWidth - targetWidth, that._dragDetails.position.x + (that.rightToLeft ? -1 : 1) * (pageX - that._dragDetails.coordinates.x)));

        if (maxLeft !== undefined) {
            that._dragDetails.position.x = Math.min(maxLeft, that._dragDetails.position.x);
            maxLeftOffset = maxWidth - targetWidth - maxLeft;
        }

        if (that.rightToLeft) {
            that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + that._dragDetails.offset.x + maxLeftOffset,
                Math.min(targetParentOffsetleft + maxWidth - (targetWidth - that._dragDetails.offset.x + minLeft), pageX));
        }
        else {
            that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + that._dragDetails.offset.x + minLeft,
                Math.min(targetParentOffsetleft + maxWidth - (targetWidth - that._dragDetails.offset.x + maxLeftOffset), pageX));
        }

        const offsetLeftDiff = that._dragDetails.position.x -
            (that.rightToLeft ? (timelineTask.offsetWidth - targetTaskBar.offsetLeft - targetTaskBar.offsetWidth) : targetTaskBar.offsetLeft);

        targetTaskBar.style[that.rightToLeft ? 'right' : 'left'] = that._dragDetails.position.x + 'px';

        that._refreshTask(targetTaskBar);
        that._refreshProject(targetTaskBar._task.$.project);

        if (targetTaskBar._task.type === 'project' && targetTaskBar._task.dragProject) {
            that._refreshProjectTasks(timelineTask, offsetLeftDiff);
        }

        if (!that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            return;
        }

        //Throttling the resource refresh invocation
        if (that._resourceTreeRefreshTimeout) {
            clearTimeout(that._resourceTreeRefreshTimeout);
        }

        that._resourceTreeRefreshTimeout = setTimeout(function () {
            that._refreshAssignedResources(targetTaskBar._task);
            delete that._resourceTreeRefreshTimeout;
        }, that.resourcePanelRefreshRate);
    }

    /**
    * Handles the resizing of a Task Bar
    * @param {any} event
    */
    _handleTaskBarResize(event) {
        const that = this;

        if (that.disableTaskResize) {
            return;
        }

        const targetTaskBar = that._dragDetails.timelineTask,
            timelineTask = Array.from(that.$.taskTimelineCellsContainer.children).find(t => t._task === targetTaskBar._task);
        let eventPrevented;

        if (!that.hasAttribute('resized')) {
            if (that.$.fireEvent('resizeStart', {
                index: that._tasks.indexOf(targetTaskBar._task),
                dateStart: targetTaskBar._task.dateStart,
                dateEnd: targetTaskBar._task.dateEnd
            }).defaultPrevented) {
                that.$.timeline.removeAttribute('task-bar-hovered');
                return;
            }

            that.setAttribute('resized', '');
            that._scrollView.disableSwipeScroll = true;
        }

        if (!that._dragDetails.position) {
            that._dragDetails.position = { x: that._dragDetails.originalPosition.x, y: that._dragDetails.originalPosition.y };
        }

        if (!that._dragDetails.size) {
            that._dragDetails.size = { width: that._dragDetails.originalSize.width };
        }

        if (eventPrevented) {
            return;
        }

        const resizeSide = that.$.timeline.getAttribute('task-bar-hovered'),
            targetParentOffsetleft = timelineTask.getBoundingClientRect().left,
            taskBarMinWidth = that._dragDetails.min.width || 0,
            taskBarMaxWidth = that._dragDetails.max.width,
            pageX = event.pageX - window.pageXOffset;
        let taskBarWidth = that._dragDetails.size.width;

        let size = typeof (event) === 'object' ? pageX - that._dragDetails.coordinates.x : event;

        //Resize From Left side
        if ((resizeSide === 'left' && !that.rightToLeft) || (resizeSide === 'right' && that.rightToLeft)) {
            if (that.rightToLeft) {
                if (size < 0) {
                    size = Math.min(Math.abs(size), taskBarWidth - (taskBarMinWidth || 0)) * -1;
                }
                else if (taskBarMaxWidth !== undefined) {
                    size = Math.min(taskBarMaxWidth - taskBarWidth, Math.abs(size));
                }

                taskBarWidth = that._dragDetails.size.width = Math.max(taskBarMinWidth, Math.min(timelineTask.offsetWidth - targetTaskBar.offsetLeft, taskBarWidth + size));

                const targetTaskBarLeft = targetTaskBar.offsetLeft;

                targetTaskBar.style.left = '';
                targetTaskBar.style.right = (Math.max(0, (parseFloat(targetTaskBar.style.right) ||
                    (timelineTask.offsetWidth - targetTaskBar.offsetLeft - targetTaskBar.offsetWidth)) - size)) + 'px';

                that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + targetTaskBar.offsetLeft + taskBarMinWidth,
                    Math.min(targetParentOffsetleft + targetTaskBarLeft + taskBarWidth, pageX));
            }
            else {
                if (size > 0) {
                    size = Math.min(size, taskBarWidth - (taskBarMinWidth || 0));
                }
                else if (taskBarMaxWidth !== undefined) {
                    size = Math.min(taskBarMaxWidth - taskBarWidth, Math.abs(size)) * -1;
                }

                taskBarWidth = that._dragDetails.size.width = Math.max(taskBarMinWidth, Math.min(targetTaskBar.offsetLeft + taskBarWidth, taskBarWidth - size));

                targetTaskBar.style.right = '';
                targetTaskBar.style.left = (Math.max(0, (parseFloat(targetTaskBar.style.left) || targetTaskBar.offsetLeft) + size)) + 'px';

                that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + targetTaskBar.offsetLeft,
                    Math.min(targetParentOffsetleft + targetTaskBar.offsetLeft + taskBarWidth - taskBarMinWidth, pageX));
            }
        }
        //Resize From Right side
        else {
            if (that.rightToLeft) {
                if (size < 0 && taskBarMaxWidth !== undefined) {
                    size = Math.min(taskBarMaxWidth - taskBarWidth, Math.abs(size)) * -1;
                }

                taskBarWidth = that._dragDetails.size.width = Math.max(taskBarMinWidth, Math.min(targetTaskBar.offsetLeft + targetTaskBar.offsetWidth,
                    taskBarWidth - size));

                targetTaskBar.style.width = that._dragDetails.size.width + 'px';

                that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + targetTaskBar.offsetLeft,
                    Math.min(targetParentOffsetleft + targetTaskBar.offsetLeft + taskBarWidth - taskBarMinWidth, pageX));
            }
            else {
                if (size > 0 && taskBarMaxWidth !== undefined) {
                    size = Math.min(taskBarMaxWidth - taskBarWidth, size);
                }

                taskBarWidth = that._dragDetails.size.width = Math.max(taskBarMinWidth, Math.min(timelineTask.offsetWidth - targetTaskBar.offsetLeft,
                    taskBarWidth + size));

                that._dragDetails.coordinates.x = Math.max(targetParentOffsetleft + targetTaskBar.offsetLeft + taskBarMinWidth,
                    Math.min(targetParentOffsetleft + targetTaskBar.offsetLeft + (taskBarMaxWidth || taskBarWidth), pageX));
            }
        }

        targetTaskBar.style.width = that._dragDetails.size.width + 'px';

        that._refreshTask(targetTaskBar);
        that._refreshProject(targetTaskBar._task.$.project);

        //Throttling the resource refresh invocation
        if (that._resourceTreeRefreshTimeout) {
            clearTimeout(that._resourceTreeRefreshTimeout);
        }

        //Refresh the workload of the assigned resources
        that._resourceTreeRefreshTimeout = setTimeout(function () {
            that._refreshAssignedResources(targetTaskBar._task, ['workload']);
            delete that._resourceTreeRefreshTimeout;
        }, that.resourcePanelRefreshRate);
    }

    /**
     * Handles connection hover state
     * @param {any} target
     */
    _handleTimelineConnectionHover(target) {
        const that = this;

        if (!(that.shadowRoot || that).contains(target)) {
            return;
        }

        const connections = that.$.timelineConnectionsContainer.children,
            connection = target.closest('.lw-task-connection');

        if (!connection && that.$.timelineConnectionsContainer.querySelector('.lw-task-connection[hover]')) {
            for (let i = 0; i < connections.length; i++) {
                connections[i].removeAttribute('hover');
            }

            return;
        }

        if (connection) {
            const connectionId = connection.getAttribute('connection-id');

            for (let i = 0; i < connections.length; i++) {
                const con = connections[i];

                if (con.getAttribute('connection-id') === connectionId) {
                    con.setAttribute('hover', '');
                }
                else {
                    con.removeAttribute('hover');
                }
            }

            that._hoveredConnectionTasks = connection.tasks;
        }
    }

    /**
     * Handles timeline task hover state
     * @param {any} timelineTask
     */
    _handleTimelineHover(event, reset) {
        const that = this,
            originalEvent = (event.originalEvent || event),
            tasks = that._tasks.filter(t => !t.hidden);
        let target = originalEvent.pageX && LW.Utilities.Core.isMobile ?
            document.elementFromPoint(originalEvent.pageX - window.pageXOffset, originalEvent.pageY - window.pageYOffset) : originalEvent.target;

        if (originalEvent.pageX && that.shadowRoot && target === that) {
            target = originalEvent.pageX && LW.Utilities.Core.isMobile ?
                that.shadowRoot.elementFromPoint(originalEvent.pageX - window.pageXOffset, originalEvent.pageY - window.pageYOffset) : originalEvent.composedPath()[0];
        }

        function resetHoverState() {
            if (that._hoveredTimelineTask) {
                const targetTask = tasks.indexOf(that._hoveredTimelineTask._task);

                if (targetTask > -1) {
                    that.$.taskTimelineCellsContainer.children[targetTask].removeAttribute('hover');
                }

                that._hoveredTimelineTask.removeAttribute('hover');
                that.$.timeline.removeAttribute('task-bar-hovered');
                delete that._hoveredTimelineTask;
            }
        }

        if (!target || !target.closest) {
            return;
        }

        if (target === that) {
            resetHoverState();
            that._handleResourceTimelineHover(target, true);
            return;
        }

        if (that.$.resourceSplitter.contains(target)) {
            that._handleResourceTimelineHover(target, reset);
            return;
        }

        that._handleTimelineConnectionHover(target);

        let timelineTask = target.closest('.lw-timeline-task-cell') || target.closest('.lw-timeline-task');

        if (reset || !timelineTask || !(that.shadowRoot || that).contains(timelineTask)) {
            resetHoverState();
            return;
        }

        const timelineTaskIndex = tasks.indexOf(timelineTask._task),
            isTaskConnecting = timelineTask && that._connectionFeedback && timelineTask.contains(that._connectionFeedback);

        if (timelineTask.classList.contains('lw-timeline-task-cell')) {
            timelineTask = that.$.timelineTasksContainer.children[timelineTaskIndex];
        }

        if (that._hoveredTimelineTask && that._hoveredTimelineTask === timelineTask) {
            return;
        }

        if (timelineTask !== that._hoveredTimelineTask || (isTaskConnecting && that._hoveredTimelineTask === timelineTask)) {
            resetHoverState();
        }

        if (timelineTask && !isTaskConnecting) {
            that._hoveredTimelineTask = timelineTask;

            if (isTaskConnecting) {
                return;
            }

            timelineTask.setAttribute('hover', '');
            that.$.taskTimelineCellsContainer.children[timelineTaskIndex].setAttribute('hover', '');
        }

        if (timelineTask) {
            //Hover the task tree item as well
            that._handleTreeItemHover(tasks.indexOf(timelineTask._task), target);
        }
    }

    /**
     * Handles the hovering of Resource Timeline cells
     * @param {any} target - the event target
     * @param {any} reset - flag to remove hover state
     */
    _handleResourceTimelineHover(target, reset) {
        const that = this;

        function resetHoverState() {
            if (that._hoveredTimelineResource) {
                that._hoveredTimelineResource.removeAttribute('hover');
                delete that._hoveredTimelineResource;
            }
        }

        let timelineResource = target.closest('.lw-timeline-resource-cell');

        if (reset || !timelineResource || !(that.shadowRoot || that).contains(timelineResource)) {
            resetHoverState();
            return;
        }

        if (that._hoveredTimelineResource && that._hoveredTimelineResource === timelineResource) {
            return;
        }

        resetHoverState();

        that._hoveredTimelineResource = timelineResource;
        timelineResource.setAttribute('hover', '');

        //Hover the task tree item as well
        that._handleTreeItemHover(that._resources.filter(r => !r.hidden).indexOf(timelineResource._resource), target);
    }

    /**
    * Returns the scrollLeft of the itemsContainer
    */
    _getScrollLeft(scrollLeft, scrollWidth) {
        const that = this;

        if (!that.rightToLeft) {
            return scrollLeft;
        }

        //Note: Chrome has a bug with direction: rtl. Doesn't inverse the scrollLeft
        //see: https://bugs.chromium.org/p/chromium/issues/detail?id=721759
        if (LW.Utilities.Core.Browser.Chrome) {
            if (!scrollWidth) {
                scrollWidth = that.scrollWidth;
            }

            scrollLeft = scrollWidth - scrollLeft;
        }
        else {
            scrollLeft *= -1;
        }

        return scrollLeft;
    }

    /**
     * Synchronizes the the tree and timeline splitter items between the two major splitters - tasks and resources
     * @param {any} splitterFrom - splitter
     * @param {any} splitterTo
     */
    _synchronizeSplitters(splitterFrom, splitterTo) {
        const that = this;

        if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            const measurements = splitterFrom._measurements,
                splitterFromItems = splitterFrom.items,
                splitterToItems = splitterTo.items;
            const [dimension, minDimension, maxDimension] = [measurements.dimension, measurements.minDimension, measurements.maxDimension],
                [itemToA, itemFromA] = [splitterToItems[0], splitterFromItems[0]],
                [itemToB, itemFromB] = [splitterToItems[1], splitterFromItems[1]];

            //Updates the size/min properties of the resource splitters
            splitterTo.keepProportionsOnResize = true;

            //Used as a flag
            splitterTo.setAttribute('orientation-change', '');

            [minDimension, maxDimension, dimension,].forEach(dim => {
                const propName = dim === dimension ? 'size' : (dim === minDimension ? 'min' : 'max');

                //Reset the properties
                itemToA.set(propName, '');
                itemToB.set(propName, '');

                //Set the new values
                itemToA[propName] = itemFromA.style[dim];
                itemToB[propName] = itemFromB.style[dim];
            });

            splitterTo.removeAttribute('orientation-change');
            splitterTo.keepProportionsOnResize = false;
        }
    }

    /**
     * MainSplitter resizeEnd Event Handler
     * @param {any} event
     */
    _resizeEventHandler(event) {
        const that = this,
            taskSplitter = that.$.taskSplitter;

        function resizeSplitter(splitter) {
            // splitter.keepProportionsOnResize = true;
            splitter.refresh();
            // splitter.keepProportionsOnResize = false;

            if (splitter === taskSplitter) {
                resizeSplitter(that.$.taskTreeSplitter);

                //Synhronizes the tree and timeline splitter items between the two splitters
                that._synchronizeSplitters(taskSplitter, that.$.resourceSplitter);
            }
        }

        if (event && event.type === 'resizeEnd') {
            if (event.target === that.$.taskTreeSplitter || event.target === that.$.resourceTreeSplitter) {
                resizeSplitter(event.target);
                return;
            }

            if (event.target === that.$.resourceSplitter) {
                that._synchronizeSplitters(that.$.resourceSplitter, taskSplitter);
            }
        }

        const timelineTasks = that.$.taskTimelineCellsContainer.children,
            refreshTimeline = that.offsetWidth !== that.$.timeline.offsetWidth;

        if (!that._timelineCells) {
            that._refresh();
            return;
        }

        //Refresh the Timeline cells if necessary or just refresh the scrollBars
        if (refreshTimeline) {
            //In cases where the size is in percentages the resizeHandler must be thrown
            that.$.mainSplitter.refresh();
            //Call Task Splitter resizeHandler
            resizeSplitter(taskSplitter);
            that._createTimelineCells();
            that._refreshResourceTimeline();
        }
        else {
            that._refresh();
        }

        that._recycle();

        for (let d = 0; d < timelineTasks.length; d++) {
            that._setTimelineTaskBar(timelineTasks[d]._task, refreshTimeline);
            that._refreshTaskConnections(timelineTasks[d]._task);
        }

        //Update the scrollLeft/scrollTop after resizing
        that.$.timeline.scrollLeft = that._getScrollLeft(that.scrollLeft);
        that.$.timelineContent.scrollTop = that.scrollTop;

        //NOTE: A possible solution for the Many Resize Triggers. Uncomment after setting display: none to the triggers
        //Call TaskTree resizeHandler
        that.$.taskTree.refresh();

        //Call Tree Splitter resizeHander
        resizeSplitter(that.$.taskTreeSplitter);

        const isFireFox = LW.Utilities.Core.Browser.Firefox && !that.resourcePanelSize,
            resourceSplitterResizeTrigger = that.$.resourceSplitter.resizeTrigger;

        if (isFireFox && resourceSplitterResizeTrigger) {
            resourceSplitterResizeTrigger.style.display = 'none';
        }

        //Call Resource Tree Splitter resizeHandler
        resizeSplitter(that.$.resourceSplitter);
        resizeSplitter(that.$.resourceTreeSplitter);

        if (resourceSplitterResizeTrigger) {
            resourceSplitterResizeTrigger.style.display = null;
        }

        //Call ResourceTree resizeHandler
        that.$.resourceTree.refresh();

        //call Main Splitter resizeHandler
        that.$.mainSplitter.refresh();

        //Update the ScrollTop of TreeSplitter and ResourceSplitter
        that._refreshTreeSplitterScrollTop(that.$.taskTreeSplitter);
        that._refreshTreeSplitterScrollTop(that.$.resourceTreeSplitter);
    }

    /**
    * Recycles the timeline header cells and updates them with fresh data
    */
    _recycle(event) {
        const that = this;

        if (!event || event.context.orientation === 'horizontal') {
            //Refresh the timeline cells
            that._recycleHeaderCells(that.$.timelineViewCells);

            //Refresh the header cells
            that._recycleHeaderCells(that.$.timelineViewDetails);

            //Refresh the resource header cells
            that._recycleResourceHeaderCells();
            return;
        }

        const scrollTop = Math.round(event.detail.value);

        if (that.$.mainSplitter.contains(that.$.resourceSplitter) && event.target === that.$.resourceVerticalScrollBar) {
            that._refreshTreeSplitterScrollTop(that.$.resourceTreeSplitter, scrollTop);
            return;
        }
        else if (!event) {
            that._refreshTreeSplitterScrollTop(that.$.resourceTreeSplitter, scrollTop);
        }

        that._refreshTreeSplitterScrollTop(that.$.taskTreeSplitter, scrollTop);
    }

    /**
     * Updates the ScrollTop of the TreeSplitter items
     * @param {any} splitter
     */
    _refreshTreeSplitterScrollTop(splitter, scrollTop) {
        const that = this;

        if (!that.$.mainSplitter.contains(splitter)) {
            return;
        }

        const treeColumns = splitter._items,
            itemName = splitter === that.$.taskTreeSplitter ? 'task' : 'resource';

        if (scrollTop === undefined) {
            scrollTop = that.$[itemName + 'Tree'].$.scrollViewer.scrollTop;
        }

        for (let i = 0; i < treeColumns.length; i++) {
            const column = treeColumns[i];

            if (column === that.$[itemName + 'TreeSplitterItem']) {
                that.$[itemName + 'Tree'].$.scrollViewer.scrollTop = scrollTop;
            }
            else {
                const content = column.getElementsByClassName(`lw-${itemName}-tree-content`)[0];

                content.scrollTop = scrollTop;
            }
        }
    }

    /**
     * Updates the content of the timeline cells and header during scrolling
     * @param {any} event
     * @param {any} container
     */
    _recycleHeaderCells(container) {
        const that = this,
            viewCells = container.children,
            scrollLeft = that.scrollLeft,
            isHeaderContainer = container === that.$.timelineViewCells,
            timelineCells = isHeaderContainer ? that._timelineCells : that._timelineHeaderCells;

        if (!timelineCells.length) {
            return;
        }

        let fragment = document.createDocumentFragment();

        while (viewCells.length) {
            fragment.appendChild(container.firstElementChild);
        }

        const firstCellObj = that._getFirstCellObjInView(timelineCells),
            firstCellOffset = 1 - (firstCellObj.left + firstCellObj.width - Math.abs(scrollLeft)) / timelineCells[0].width,
            cellsAvailable = fragment.children.length,
            cellsNeeded = isHeaderContainer ?
                Math.ceil((parseFloat((that.$.timeline.offsetWidth / firstCellObj.width).toFixed(2)) + firstCellOffset).toFixed(2)) : that._getHeaderVisibleCellsCount();

        //Generate additional cells if needed

        if (cellsAvailable > cellsNeeded) {
            while (fragment.children.length && fragment.children.length !== cellsNeeded) {
                fragment.removeChild(fragment.firstElementChild);
            }
        }
        else if (cellsAvailable < cellsNeeded) {
            const newFragment = that._createCells(cellsNeeded - cellsAvailable);

            while (newFragment.children.length) {
                fragment.appendChild(newFragment.firstElementChild);
            }
        }

        const cellType = isHeaderContainer ? that._getCellsViewType() : that.view;
        let cellIndex = timelineCells.indexOf(firstCellObj);

        for (let i = 0; i < fragment.children.length; i++) {
            const fragmentCell = fragment.children[i],
                timelineCell = timelineCells[cellIndex];

            if (!timelineCell) {
                break;
            }

            let date = new Date(timelineCell.date);

            if (!isHeaderContainer && that.view === 'week') {
                date.setDate(date.getDate() - date.getDay());
                //Ensures that the date is always visible
                date = new Date(Math.max(timelineCell.date.getTime(), date.getTime()));
            }

            fragmentCell.style[that.rightToLeft ? 'right' : 'left'] = timelineCell.left + 'px';
            fragmentCell.style.width = timelineCell.width + 'px';
            fragmentCell._date = date;
            fragmentCell.innerHTML = `<div>${that._getDateString(date, cellType, !isHeaderContainer)}</div>`;

            timelineCell.weekend ? fragmentCell.setAttribute('weekend', '') : fragmentCell.removeAttribute('weekend');
            timelineCell.nonworking ? fragmentCell.setAttribute('nonworking', '') : fragmentCell.removeAttribute('nonworking');

            cellIndex++;
        }

        container.appendChild(fragment);
    }

    /**
    * Refreshes the ScrollBars
    */
    _refresh() {
        const that = this;

        function getScrollWidth() {
            const scrollWidth = that.$.taskTimelineCellsContainer.offsetWidth - that.$.timeline.offsetWidth;

            if (scrollWidth > 0 && that.horizontalScrollBarVisibility !== 'hidden' || that.horizontalScrollBarVisibility === 'visible') {
                that.$container.addClass('hscroll');
            }
            else {
                that.$container.removeClass('hscroll');
            }

            return scrollWidth;
        }

        function getScrollHeight() {
            const scrollHeight = that.$.taskTimelineCellsContainer.offsetHeight - that.$.timelineContent.offsetHeight;

            if (scrollHeight > 0 && that.verticalScrollBarVisibility !== 'hidden' || that.verticalScrollBarVisibility === 'visible') {
                that.$container.addClass('vscroll');
                //that.$taskSplitter.addClass('vscroll');
            }
            else {
                that.$container.removeClass('vscroll');
                //that.$taskSplitter.removeClass('vscroll');
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


        if (that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            //Refreshes the Resource scroll bar
            that._refreshResourceScrollBar();
            that._refreshTreeSplitterScrollTop(that.$.resourceTreeSplitter);
        }

        //if (that.computedVerticalScrollBarVisibility) {
        //    that.scrollHeight += that._scrollView.hScrollBar.offsetHeight;
        //}

        //if (that.computedHorizontalScrollBarVisibility) {
        //    that.scrollWidth += that._scrollView.vScrollBar.offsetWidth;
        //}
    }

    /**
     * Updates the position of the project tasks and refreshes the task data.
     */
    _refreshProjectTasks(projectTimelineTask, offsetLeftDiff) {
        const that = this,
            task = projectTimelineTask._task;

        if (!task.tasks || (task.tasks instanceof Array && task.tasks.length === 0)) {
            return;
        }

        const projectTasks = task.tasks,
            tasks = that._tasks.filter(t => !t.hidden);

        for (let t = 0; t < projectTasks.length; t++) {
            const timelineTaskBar = that.$.timelineTasksContainer.children[tasks.indexOf(projectTasks[t])];

            if (timelineTaskBar) {
                if (that.rightToLeft) {
                    timelineTaskBar.style.right = (that.$.timelineContent.offsetWidth - (timelineTaskBar.offsetLeft + timelineTaskBar.offsetWidth - offsetLeftDiff)) + 'px';
                }
                else {
                    timelineTaskBar.style.left = (timelineTaskBar.offsetLeft + offsetLeftDiff) + 'px';
                }

                that._refreshTask(timelineTaskBar);
            }
        }
    }

    /**
     * Refresh the project task
     */
    _refreshProject(project) {
        const that = this;

        function getTaskBarOffsets(task) {
            let taskBarLeft, taskBarRight, taskBarWidth;

            if (task instanceof HTMLElement) {
                taskBarLeft = task.offsetLeft;
                taskBarWidth = task.offsetWidth;
            }
            else if (task) {
                const dateCellStart = that._getTimelineTaskCellByDate(task.dateStart),
                    dateCellEnd = that._getTimelineTaskCellByDate(task.dateEnd);

                if (dateCellStart && dateCellEnd) {
                    taskBarLeft = dateCellStart.left + that._getTimelineTaskOffset(dateCellStart, task.dateStart) || 0;
                    taskBarRight = dateCellEnd.left + that._getTimelineTaskOffset(dateCellEnd, task.dateEnd) || 0;

                    taskBarWidth = taskBarRight - taskBarLeft;
                }
            }

            return [taskBarLeft, taskBarWidth]
        }

        if (!project) {
            return;
        }

        if (!project.synchronized) {
            that._refreshProject(project.$.project);
            return;
        }

        const tasks = that._tasks.filter(t => !t.hidden);

        while (project) {
            if (!project.synchronized) {
                break;
            }

            const projectTasks = project.tasks;
            let minTask = projectTasks[0],
                maxTask = projectTasks[0];

            for (let t = 0; t < projectTasks.length; t++) {
                if (minTask.dateStart.getTime() >= projectTasks[t].dateStart.getTime()) {
                    minTask = projectTasks[t];
                }

                if (maxTask.dateEnd.getTime() <= projectTasks[t].dateEnd.getTime()) {
                    maxTask = projectTasks[t];
                }
            }

            const timelineTasksContainer = that.$.timelineTasksContainer.children,
                projectBar = timelineTasksContainer[tasks.indexOf(project)],
                minTaskBar = timelineTasksContainer[tasks.indexOf(minTask)],
                maxTaskBar = timelineTasksContainer[tasks.indexOf(maxTask)],
                maxTaskSize = that.$.timelineContent.offsetWidth;

            if (!projectBar) {
                if (minTask) {
                    project.dateStart = minTask.dateStart;
                }

                if (maxTask) {
                    project.dateEnd = maxTask.dateEnd;
                }

                project = project.$.project;
                continue;
            }

            if (minTask) {
                project.dateStart = minTask.dateStart;
            }

            let [taskBarLeft, taskBarWidth] = getTaskBarOffsets(minTaskBar || minTask);

            if (taskBarLeft !== undefined && taskBarWidth !== undefined) {
                if (that.rightToLeft) {
                    projectBar.style.width = (projectBar.offsetWidth - ((maxTaskSize - taskBarLeft - taskBarWidth) -
                        (maxTaskSize - projectBar.offsetLeft - projectBar.offsetWidth))) + 'px';
                    projectBar.style.right = minTaskBar ? minTaskBar.style.right : (taskBarLeft + 'px');
                }
                else {
                    projectBar.style.width = (projectBar.offsetWidth - (taskBarLeft - projectBar.offsetLeft)) + 'px';
                    projectBar.style.left = minTaskBar ? minTaskBar.style.left : (taskBarLeft + 'px');
                }
            }

            if (maxTask) {
                project.dateEnd = maxTask.dateEnd;
            }

            [taskBarLeft, taskBarWidth] = getTaskBarOffsets(maxTaskBar || maxTask);

            if (taskBarLeft !== undefined && taskBarWidth !== undefined) {
                if (that.rightToLeft) {
                    projectBar.style.width = (projectBar.offsetWidth - (maxTaskSize - projectBar.offsetLeft - (maxTaskSize - taskBarLeft))) + 'px';
                }
                else {
                    projectBar.style.width = (projectBar.offsetWidth - (projectBar.offsetLeft + projectBar.offsetWidth - (taskBarLeft + taskBarWidth))) + 'px';
                }
            }

            that._refreshTask(projectBar);
            project = project.$.project;
        }
    }

    /**
     * Refreshes the dateStart/End of a task
     * @param {any} taskBar
     */
    _refreshTask(taskBar) {
        const that = this;

        //Refresh Task From TaskBar change
        const cellRange = that._getTaskBarCellRange(taskBar),
            cellStart = cellRange.cellStart,
            cellEnd = cellRange.cellEnd;

        if (!cellRange || !cellStart || !cellEnd) {
            return;
        }

        //Set the new Range to the Task Bar
        taskBar._cellStart = cellStart;
        taskBar._cellEnd = cellEnd;

        const dateRange = that._getTaskBarDateRange(taskBar);

        if (!dateRange) {
            return;
        }

        const task = taskBar._task,
            timelineTaskElement = Array.from(that.$.taskTimelineCellsContainer.children).find(t => t._task === task);

        if (!timelineTaskElement) {
            return;
        }

        timelineTaskElement._task.dateStart = task.dateStart = dateRange.dateStart;
        timelineTaskElement._task.dateEnd = task.dateEnd = dateRange.dateEnd;
        timelineTaskElement._task.duration = task.duration = that._convertDuration(that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0 ?
            that._getWorkingTime(task.dateStart, task.dateEnd) : task.dateEnd.getTime() - task.dateStart.getTime(), true);

        //Accessibility
        //Formats a date to ISO format, 'yyyy-mm-dd'
        const dateFormatter = (date) => date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) +
            '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        taskBar.setAttribute('aria-label', task.label + ' Start date: ' + dateFormatter(task.dateStart) + ', End date: ' + dateFormatter(task.dateEnd));

        that._refreshTaskConnections(taskBar);

        //Updates the Task Tree Data
        that._refreshTreeColumnsData(task, ['dateStart', 'dateEnd', 'duration']);
    }

    /**
    * Refreshes the resources panel columns of a task
    * @param {any} task
    */
    _refreshTaskResources(task, taskResources = []) {
        const that = this;

        if (!task) {
            return;
        }

        if (!taskResources) {
            taskResources = that._getTaskResources(task, true);
        }

        if (taskResources.length) {
            for (let i = 0; i < taskResources.length; i++) {
                const resource = taskResources[i];

                that._refreshResource(resource);
                that._refreshTreeColumnsData(resource, undefined, 'resource');
            }
        }
    }

    /**
     * Refreshes the data inside the Task columns
     * @param {any} item
     * @param {any} properties
     */
    _refreshTreeColumnsData(item, properties, type) {
        const that = this;

        if (!type) {
            type = 'task';
        }

        const columns = that[`${type}Columns`];

        function getColumnIndex(prop) {
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].value === prop) {
                    return i;
                }
            }
        }

        if (!item) {
            return;
        }

        const splitter = that.$[`${type}TreeSplitter`];

        if (!that.$.mainSplitter.contains(splitter)) {
            return;
        }

        const itemIndex = that[`_${type}s`].filter(t => !t.hidden).indexOf(item);
        let columnIndexes = [];

        if (properties) {
            for (let i = 0; i < properties.length; i++) {
                const columnIndex = getColumnIndex(properties[i]);

                if (columnIndex !== undefined) {
                    columnIndexes.push(columnIndex);
                }
            }
        }
        else {
            columnIndexes = columns.map((col, index) => index);
        }

        for (let i = 0; i < columnIndexes.length; i++) {
            const column = splitter._items[columnIndexes[i]],
                headerDetails = columns[columnIndexes[i]];
            let taskItem;

            if (!column) {
                continue;
            }

            if (column === that.$[`${type}TreeSplitterItem`]) {
                taskItem = column.querySelectorAll('lw-tree-item, lw-tree-items-group')[itemIndex];

                if (taskItem) {
                    taskItem.label = that._formatColumnData(item, headerDetails, true);
                }
            }
            else {
                taskItem = column.getElementsByClassName(`lw-${type}-label-container`)[itemIndex];

                if (taskItem) {
                    taskItem.innerHTML = that._formatColumnData(item, headerDetails);
                }
            }
        }

        that.$[`${type}TreeSplitter`].refresh();
    }

    /**
     * Removes a task/resource from it's Tree
     * @param {any} index - the index of the item to be removed
     * @param {any} itemType - the type of item to be removed
     */
    _removeTreeItem(index, itemType = 'task') {
        const that = this;

        if (index === undefined) {
            return;
        }

        //Remove the item from the Task Tree
        const treeSplitterItem = that.$[`${itemType}TreeSplitter`]._items,
            tree = that.$[`${itemType}Tree`];

        for (let i = 0; i < treeSplitterItem.length; i++) {
            const splitterItem = treeSplitterItem[i];

            if (splitterItem.contains(tree)) {
                tree.removeItem(tree.querySelectorAll('lw-tree-item, lw-tree-items-group')[index]);
            }
            else {
                const dataContainer = splitterItem.getElementsByClassName(`lw-${itemType}-tree-content`)[0],
                    headerDetails = that[`${itemType}Columns`][i];

                if (!dataContainer || !headerDetails || !headerDetails.value) {
                    continue;
                }

                const targetTask = dataContainer.getElementsByClassName(`lw-${itemType}-item`)[index];

                if (targetTask) {
                    targetTask.parentElement.removeChild(targetTask);
                }
            }
        }
    }

    /*
    * Removes a connection
    * @param {string} connection - this argument represents the id of a connection or a direct instance of a connection
    */
    _removeConnection(connectionId, noAutoScheduling) {
        const that = this,
            conPopupWindow = that.$.connectionPopupWindow,
            fireEvent = conPopupWindow && conPopupWindow._target === connectionId,
            connectionContainer = that.$.timelineConnectionsContainer;

        if (connectionId.classList && connectionId.classList.contains('lw-task-connection')) {
            connectionId = connectionId.getAttribute('connection-id');
        }
        else {
            connectionId += '';
        }

        if (connectionId === undefined) {
            return;
        }

        const connections = connectionContainer.querySelectorAll('.lw-task-connection[connection-id^="' + connectionId + (connectionId.indexOf('-') < 0 ? '-' : '') + '"]'),
            tasks = that._tasks,
            getTimelineTask = function (index) {
                const timelineTasks = that.$.timelineTasksContainer.children,
                    tasks = that._tasks

                for (let i = 0; i < timelineTasks.length; i++) {
                    if (timelineTasks[i]._task === tasks[index]) {
                        return timelineTasks[i];
                    }
                }
            },
            connectionIdDetails = connectionId.split('-'),
            taskStartId = parseInt(connectionIdDetails[0]),
            taskEndId = parseInt(connectionIdDetails[1]);

        for (let i = 0; i < connections.length; i++) {
            connectionContainer.removeChild(connections[i])
        }

        const timelineTaskStart = getTimelineTask(taskStartId),
            timelineTaskEnd = getTimelineTask(taskEndId);

        //update the task
        that._updateConnection(connectionId, true);

        if (timelineTaskStart && tasks[taskStartId].connections.length === 0 &&
            !tasks.find(task => task.connections.find(con => that._getTaskIndexById(con.target) === taskStartId))) {
            timelineTaskStart.removeAttribute('connected');
        }

        if (timelineTaskEnd && tasks[taskEndId].connections.length === 0 &&
            !tasks.find(task => task.connections.find(con => that._getTaskIndexById(con.target) === taskEndId))) {
            timelineTaskEnd.removeAttribute('connected');
        }

        if (!noAutoScheduling && that.autoSchedule) {
            that._autoScheduleRestore(tasks[taskEndId], parseInt(connectionIdDetails[2]));
            that._autoSchedule(tasks[taskEndId]);
        }

        if (fireEvent) {
            that.$.fireEvent('itemRemove', { type: 'connection', item: { source: connectionIdDetails[0], target: connectionIdDetails[1], type: connectionIdDetails[2] } });
        }
    }

    /**
    * Removes all connections that target a task
    * @param {any} index - the target task
    * @param {any} tasks - list of tasks
    * @param {any} ignoredTasks - tasks that should be ignored
    */
    _removeConnectionsToTask(index, tasks, ignoredTasks) {
        const that = this;

        if (!index) {
            return;
        }

        if (!tasks) {
            tasks = that._tasks;
        }

        for (let t = 0; t < tasks.length; t++) {
            const task = tasks[t];

            if (!task.connections || !task.connections.length || (ignoredTasks && ignoredTasks.indexOf(task) > -1)) {
                continue;
            }

            const taskConnections = task.connections;

            for (let c = 0; c < taskConnections.length; c++) {
                if (taskConnections[c].target === index) {
                    that._removeConnection(t, index);
                }
            }
        }
    }

    /**
     * Sets the connection points of a hovered task
     */
    _setConnectionPoints(timelineTask) {
        const that = this;
        let connectionPoints;

        if (!timelineTask || that._hoveredTimelineTask !== timelineTask) {
            //Hide connection points
            const timelineTasks = that.$.taskTimelineCellsContainer.children;

            for (let t = 0; t < timelineTasks.length; t++) {
                const timelineTask = timelineTasks[t];

                if (timelineTask && !timelineTask.hasAttribute('selected')) {
                    connectionPoints = timelineTask.getElementsByClassName('lw-task-connection-point');

                    for (let cp = 0; cp < connectionPoints.length; cp++) {
                        connectionPoints[cp].classList.add('lw-visibility-hidden');
                    }
                }
            }

            return;
        }

        //Show task's connection points
        connectionPoints = timelineTask.getElementsByClassName('lw-task-connection-point');

        for (let cp = 0; cp < connectionPoints.length; cp++) {
            connectionPoints[cp].classList.remove('lw-visibility-hidden');
        }
    }

    /**
    * Selects a Timeline task/resource
    * @param {any} task
    */
    _select(type = 'task', item, noScrolling) {
        const that = this;

        if (that.disableSelection) {
            that._unselectAll(type);
            return;
        }

        //Handles Task Bar selection
        const items = that[`_${type}s`];

        //The actual index of the Item in the full item list
        const actualIndex = items.indexOf(item);

        // the index inside the Timeline
        const itemIndex = items.filter(i => !i.hidden).indexOf(item);

        if (itemIndex < 0) {
            if (actualIndex < 0) {
                //Unselect previous items
                that._unselectAll(type);
            }

            return;
        }

        const targetCell = that.$[type + 'TimelineCellsContainer'].children[itemIndex],
            timelineTask = that.$.timelineTasksContainer.children[itemIndex];

        if (targetCell && targetCell.hasAttribute('selected')) {
            //Unselect previous items
            that._unselectAll(type);
            return;
        }

        const oldSelection = that.selectedIndexes.slice(0);

        //Unselect previous items
        that._unselectAll(type, true);

        if (targetCell) {
            targetCell.setAttribute('selected', '');
        }

        if (type === 'task' && timelineTask) {
            timelineTask.setAttribute('selected', '');
            timelineTask.setAttribute('aria-selected', 'true');
        }

        //Focus the Tree so the user can use the keyboard navigation
        const scrollElement = document.scrollingElement || document.documentElement,
            x = scrollElement.scrollLeft,
            y = scrollElement.scrollTop;

        that.$[`${type}Tree`].focus({ preventScroll: true });
        window.scrollTo(x, y);

        //Select the tree item
        that.$[`${type}Tree`].select(that.$[`${type}Tree`].querySelectorAll('lw-tree-item, lw-tree-items-group')[itemIndex]);

        //Set selected attribute to the item in the rest of the columns
        const splitterItems = that.$[`${type}TreeSplitter`]._items;

        for (let i = 0; i < splitterItems.length; i++) {
            const splitterItem = splitterItems[i];
            let items;

            if (splitterItem === that.$[`${type}TreeSplitterItem`]) {
                continue;
            }

            items = [].slice.call(splitterItem.getElementsByClassName(`lw-${type}-label-container`));

            if (items[itemIndex]) {
                items[itemIndex].setAttribute('selected', '');
            }
        }

        //Highlights the assigned items
        that._highlightAssignedItem(type, itemIndex);

        if (type === 'resource') {
            return;
        }

        //Scroll to the first possible cell before task's start cell
        if (!noScrolling) {
            const taskCellStart = timelineTask._cellStart;

            if (that.scrollLeft > taskCellStart.left || taskCellStart.left + timelineTask.offsetWidth > that.scrollLeft + that.$.timeline.offsetWidth) {
                const taskCellIndex = that._timelineCells.indexOf(taskCellStart);

                that._scrollTo((that._timelineCells[taskCellIndex - 1] ? that._timelineCells[taskCellIndex - 1] : taskCellStart).date);
            }
        }

        if (oldSelection[0] !== actualIndex) {
            that.selectedIndexes = [actualIndex];

            if (!that._noChangeEvent) {
                that.$.fireEvent('change', { value: [actualIndex], oldValue: oldSelection });
            }
        }
    }

    /**
     * Highlights the assigned Tasks/Resources
     * @param {any} itemType - type of item (task/resource)
     * @param {any} index - the index of the item
     */
    _highlightAssignedItem(type, index) {
        const that = this,
            items = that[`_${type}s`].filter(t => !t.hidden),
            highlightType = type === 'task' ? 'resource' : 'task',
            treeSplitterItem = that.$[`${highlightType}TreeSplitterItem`];
        let highlightedItems;

        //Removes the 'assigned' attribute from the items
        highlightedItems = Array.from(that.$.mainSplitter.
            querySelectorAll(`.lw-timeline-${highlightType}-cell[assigned], .lw-${highlightType}-label-container[assigned],
                                  .lw-timeline-${highlightType}[assigned]`)).
            concat(Array.from(treeSplitterItem.querySelectorAll('.lw-tree-item[assigned], lw-tree-items-group[assigned]')));

        for (let i = 0; i < highlightedItems.length; i++) {
            highlightedItems[i].removeAttribute('assigned');
        }

        if (!items.length || that.hideResourcePanel) {
            return;
        }

        const item = items[index];

        if (!item || item.hidden) {
            return;
        }

        const splitterItems = that.$[`${highlightType}TreeSplitter`]._items,
            timelineCells = that.$[`${highlightType}TimelineCellsContainer`].children,
            taskBars = that.$.timelineTasksContainer.children;

        if (!timelineCells.length) {
            return;
        }

        highlightedItems = that[type === 'resource' ? '_getResourceTasks' : '_getTaskResources'](item).filter(i => !i.hidden).map(item => item.index);

        highlightedItems.forEach(i => {
            if (timelineCells[i]) {
                timelineCells[i].setAttribute('assigned', '');
            }

            //Highlight the Timeline Task Bar when selecting a resources
            if (type === 'resource') {
                const timelineTask = taskBars[i];

                if (timelineTask) {
                    timelineTask.setAttribute('assigned', '');
                }
            }
        });

        for (let i = 0; i < splitterItems.length; i++) {
            const splitterItem = splitterItems[i];
            let items;

            if (splitterItem === treeSplitterItem) {
                items = splitterItem.querySelectorAll('lw-tree-item, lw-tree-items-group');
            }
            else {
                items = splitterItem.getElementsByClassName(`lw-${highlightType}-label-container`);
            }

            for (let h = 0; h < highlightedItems.length; h++) {
                items[highlightedItems[h]].setAttribute('assigned', '');
            }
        }

        const targetItems = that[`_${highlightType}s`].filter(t => !t.hidden);

        that._ensureVisible(targetItems[highlightedItems[0]], highlightType);
    }

    /**
     * Selectes a resource
     * @param {any} resource
     */
    _selectResource(resource) {
        const that = this,
            resourceIndex = that._resources.indexOf(resource);

        if (resourceIndex < 0) {
            that._unselectAll('resource');
            return;
        }

        const targetTaskCell = that.$.resourceTimelineCellsContainer.children[resourceIndex];

        //Unselect previous resource
        if (targetTaskCell && targetTaskCell.hasAttribute('selected')) {
            that._unselectAllTasks();
            return;
        }

        that.$.resourceTree.focus({ preventScroll: true });
    }

    /**
    * Snaps the Task to the nearest cell start/end
    * @param {any} target
    */
    _snapToNearest(target) {
        const that = this;

        if (target instanceof HTMLElement && target.classList.contains('lw-timeline-task')) {
            if (that.snapToNearest) {
                const cellRange = that._getTaskBarCellRange(target);

                if (!cellRange) {
                    return;
                }

                const cellStart = cellRange.cellStart,
                    cellEnd = cellRange.cellEnd;
                let targetWidth = parseFloat(target.style.width) || target.offsetWidth,
                    targetLeft = parseFloat(target.style[that.rightToLeft ? 'right' : 'left']) || target.offsetLeft;

                if (that.hasAttribute('dragged')) {
                    const distanceToCellEnd = cellEnd.width - (targetLeft + targetWidth - cellEnd.left);

                    if (targetLeft - cellStart.left <= distanceToCellEnd) {
                        target.style[that.rightToLeft ? 'right' : 'left'] = cellStart.left + 'px';
                    }
                    else {
                        target.style[that.rightToLeft ? 'right' : 'left'] = (targetLeft + distanceToCellEnd) + 'px';
                    }
                }
                else if (that.hasAttribute('resized')) {
                    const minSize = cellStart === cellEnd ? parseFloat(getComputedStyle(that).getPropertyValue('--lw-gantt-chart-timeline-task-min-width')) || 0 : 0;
                    let sizeDiff;

                    if (that.$.timeline.getAttribute('task-bar-hovered') === 'left') {
                        sizeDiff = targetLeft - cellStart.left;
                        sizeDiff = sizeDiff - (sizeDiff >= cellStart.width / 2 ? (cellStart.width - minSize) : 0);
                        target.style[that.rightToLeft ? 'right' : 'left'] = (targetLeft -= sizeDiff) + 'px';

                        if (targetLeft + targetWidth > cellEnd.left + cellEnd.width / 2) {
                            sizeDiff = cellEnd.left + cellEnd.width - (targetLeft + targetWidth);
                        }
                        else {
                            sizeDiff = cellEnd.left - (targetLeft + targetWidth);
                        }

                        target.style.width = Math.max(minSize, targetWidth + sizeDiff) + 'px';
                    }
                    else {
                        if (targetLeft > cellStart.left + cellStart.width / 2) {
                            target.style[that.rightToLeft ? 'right' : 'left'] = cellStart.left + cellStart.width + 'px';
                        }
                        else {
                            target.style[that.rightToLeft ? 'right' : 'left'] = cellStart.left + 'px';
                        }

                        targetLeft = parseFloat(target.style[that.rightToLeft ? 'right' : 'left']) || target.offsetLeft;

                        sizeDiff = targetLeft + targetWidth - cellEnd.left;
                        sizeDiff = -1 * (sizeDiff - (sizeDiff >= cellStart.width / 2 ? (cellEnd.width) : minSize));

                        target.style.width = (targetWidth + sizeDiff) + 'px';
                    }
                }

                that._refreshTask(target);

                const task = target._task;

                if (task.type !== 'project' || !task.dragProject) {
                    return;
                }

                const projectTasks = task.tasks;

                if (!projectTasks || !Array.isArray(projectTasks)) {
                    return;
                }

                for (let t = 0; t < projectTasks.length; t++) {
                    const timelineTaskBar = that.$.timelineTasksContainer.children[that._tasks.indexOf(projectTasks[t])];

                    if (timelineTaskBar) {
                        that._snapToNearest(timelineTaskBar);
                    }
                }
            }
        }
    }

    /**
    * Sets the limits for resizing and dragging. Adds them to the _dragDetails object
    * @param {any} target
    */
    _setDragLimits(target) {
        const that = this;

        if (!that._dragDetails) {
            return;
        }

        const timelineTask = that._dragDetails.timelineTask;

        if (!timelineTask || !target) {
            return;
        }

        const resizeSide = that.$.timeline.getAttribute('task-bar-hovered'),
            task = timelineTask._task;

        //If hovered set min/max limits
        if (resizeSide) {
            if (task.disableResize) {
                delete that._dragDetails;
                return;
            }

            const sizeLimits = that._getTaskBarSizeLimits(timelineTask, resizeSide);

            that._dragDetails.min.width = sizeLimits.min;
            that._dragDetails.max.width = sizeLimits.max;

            const minDelimeter = that._createDelimiter('min', resizeSide),
                maxDelimeter = that._createDelimiter('max', resizeSide);

            if (minDelimeter) {
                timelineTask.appendChild(minDelimeter);
            }

            if (maxDelimeter) {
                timelineTask.appendChild(maxDelimeter);
            }
        }
        else if (target.closest('.lw-task-connection-point')) {
            that._dragDetails.timelineTask = undefined;
        }
        else if (target.closest('.lw-timeline-task') === timelineTask) {
            if (task.disableDrag || (timelineTask.hasAttribute('connected') && that.autoSchedule && that.autoScheduleStrictMode)) {
                delete that._dragDetails.target;
                return;
            }

            that._dragDetails._taskDuration = that._getWorkingTime(task.dateStart, task.dateEnd);

            if (timelineTask.classList.contains('milestone')) {
                that._dragDetails.target = timelineTask.getElementsByClassName('lw-timeline-task-fill')[0];
            }

            const dragLimits = that._getTaskDragLimits(timelineTask),
                timelineTaskOffset = that.rightToLeft ? that.$.timelineContent.offsetWidth - timelineTask.offsetLeft - timelineTask.offsetWidth : timelineTask.offsetLeft;

            if (dragLimits.min !== undefined) {
                that._dragDetails.min.left = dragLimits.min;

                if (timelineTask._task.type === 'project' && dragLimits.min > timelineTaskOffset) {
                    that._dragDetails.min.left = timelineTaskOffset;
                }
            }

            if (dragLimits.max !== undefined) {
                that._dragDetails.max.left = dragLimits.max;

                if (timelineTask._task.type === 'project' && dragLimits.max < timelineTaskOffset) {
                    that._dragDetails.max.left = timelineTaskOffset;
                }
            }

            if (task.type === 'project' && task.dragProject && !that.synchronized) {
                const subTaskLimits = that._getSubTaskLimits(timelineTask);

                if (subTaskLimits.min !== undefined) {
                    that._dragDetails.min.left = that._dragDetails.min.left ? Math.max(that._dragDetails.min.left, subTaskLimits.min) : subTaskLimits.min;
                }

                if (subTaskLimits.max !== undefined) {
                    that._dragDetails.max.left = that._dragDetails.max.left ? Math.min(that._dragDetails.max.left, subTaskLimits.max) : subTaskLimits.max;
                }
            }
            else if (task.type === 'milestone') {
                that._dragDetails.target = timelineTask.getElementsByClassName('lw-timeline-task-fill')[0];
            }
        }
        else {
            that._dragDetails.timelineTask = undefined;
        }

        that._dragDetails.relatedConnections = {};
    }

    /**
    * Configures the Scroll Bars on initialization
    */
    _setScrollBars() {
        const that = this;

        if (!that._scrollView) {
            that._scrollView = new LW.Utilities.Scroll(that.$.taskSplitterItem, that.$.horizontalScrollBar, that.$.verticalScrollBar);
        }

        const vScrollBar = that._scrollView.vScrollBar,
            hScrollBar = that._scrollView.hScrollBar,
            resVScrollBar = that.$.resourceVerticalScrollBar;

        hScrollBar.$.addClass('lw-hidden');
        vScrollBar.$.addClass('lw-hidden');
        resVScrollBar.$.addClass('lw-hidden');

        //Cancel Style/Resize observers of the ScrollBars
        vScrollBar.hasStyleObserver = false;
        hScrollBar.hasStyleObserver = false;
        resVScrollBar.hasStyleObserver = false;
        vScrollBar.hasResizeObserver = false;
        hScrollBar.hasResizeObserver = false;
        resVScrollBar.hasResizeObserver = false;

        hScrollBar.wait = false;

        //Refreshes the ScrollBars
        that._refresh();
    }

    /**
     * Returns the working time between two dates
     * @param {any} dateStart - start date
     * @param {any} dateEnd - end date
     */
    _getWorkingTime(dateStart, dateEnd) {
        if (!dateStart || !dateEnd) {
            return;
        }

        const that = this;

        //Calculates the actual workingTime in miliseconds
        function getWorkingTime(dateStart, dateEnd) {
            let dateTime = dateEnd.getTime() - dateStart.getTime(),
                tempDate = new Date(dateStart), timeLeft, nextDate, workingTime = 0;

            while (dateTime > 0) {
                const timeDiff = Math.min(dateTime, 60 * 60 * 1000 - (tempDate.getMinutes() * 60 * 1000 + tempDate.getSeconds() * 1000 + tempDate.getMilliseconds()));

                if (that.nonworkingDays.indexOf(tempDate.getDay()) > -1) {
                    nextDate = new Date(tempDate);
                    nextDate.setHours(0, 0, 0, 0);
                    nextDate.setDate(tempDate.getDate() + 1);

                    timeLeft = Math.min(timeDiff, nextDate.getTime() - tempDate.getTime());

                    tempDate = new Date(tempDate.getTime() + timeLeft);
                    dateTime -= timeLeft;
                    continue;
                }

                if (that.nonworkingHours.indexOf(tempDate.getHours()) > -1) {
                    nextDate = new Date(tempDate);

                    const currentTime = nextDate.getTime();

                    nextDate.setHours(tempDate.getHours() + 1, 0, 0, 0);

                    //Safari bug fix
                    if (currentTime === nextDate.getTime()) {
                        nextDate.setHours(tempDate.getHours() + 2, 0, 0, 0);
                    }

                    timeLeft = Math.min(timeDiff, nextDate.getTime() - tempDate.getTime());

                    tempDate = new Date(tempDate.getTime() + timeLeft);
                    dateTime -= timeLeft;
                    continue;
                }

                workingTime += timeDiff;
                dateTime -= timeDiff;
                tempDate = new Date(tempDate.getTime() + timeDiff);
            }

            return workingTime;
        }

        if (dateStart.getFullYear() === dateEnd.getFullYear()) {
            return getWorkingTime(dateStart, dateEnd);
        }

        //Optimized malgorithm for calculating the working days of long date ranges
        let firstDateEnd = new Date(dateStart.getFullYear() + 1, 0, 1, 0, 0, 0, 0);

        //WorkHours from the starting date till the end of the year
        let workTime = getWorkingTime(dateStart, firstDateEnd);

        if (dateEnd.getFullYear() > firstDateEnd.getFullYear()) {
            const yearsTillEnd = Math.max(0, dateEnd.getFullYear() - (firstDateEnd.getFullYear()));

            for (let y = 0; y < yearsTillEnd; y++) {
                let workDaysInAnYear = that._getWorkingDaysBetweenDays(firstDateEnd);

                //Remove the nonworking hours from the calculation
                workTime += ((workDaysInAnYear * 24) - workDaysInAnYear * that.nonworkingHours.length) * 60 * 60 * 1000;

                firstDateEnd.setFullYear(firstDateEnd.getFullYear() + 1);
            }
        }

        //WorkHours from the beginning of the end year till the end time
        workTime += getWorkingTime(firstDateEnd, dateEnd);

        return workTime;
    }

    /**
     * Calculates the working days of an year
     * @param {any} date
     */
    _getWorkingDaysBetweenDays(date) {
        const that = this,
            year = date.getFullYear(),
            daysInYear = (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0) ? 366 : 365;

        let tempDate = new Date(date),
            workingDays = 0;

        for (let d = 0; d < daysInYear; d++) {
            if (that.nonworkingDays.indexOf(tempDate.getDay()) < 0) {
                workingDays++;
            }

            tempDate.setDate(tempDate.getDate() + 1);
        }

        return workingDays;
    }
    /**
    * Sets the tab index
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.tabIndex = -1;
            return;
        }

        that.tabIndex = that.tabIndex > 0 ? that.tabIndex : 0;
    }

    /**
    * Set the label of the TaskBar
    * @param {any} task - the actual task from the dataSource
    * @param {any} label - a new custom label. (Optional)
    */
    _setTaskBarLabel(task, label) {
        const that = this,
            tasks = that._tasks.filter(t => !t.hidden),
            taskBar = (that.shadowRoot || that).querySelectorAll('.lw-timeline-task')[tasks.indexOf(task)];

        if (!taskBar) {
            return;
        }

        const taskLabel = taskBar.getElementsByClassName('lw-timeline-task-label')[0];

        if (!taskLabel) {
            return;
        }

        taskLabel.innerHTML = task.formatFunction ? (task.formatFunction(task.label, tasks.indexOf(task)) || '') : (label || task.label);
    }

    /**
     * Sets the progress of the Task Bar
     * @param {any} task
     */
    _setTaskBarProgress(task, taskBar) {
        const that = this;

        if (!taskBar) {
            taskBar = that.$.timelineTasksContainer.children[that._tasks.filter(t => !t.hidden).indexOf(task)];
        }

        if (!taskBar || !task) {
            return;
        }

        let progress = task.progress;
        const taskProgressBar = taskBar.querySelector('.lw-timeline-task-progress'),
            taskBarThumb = taskBar.querySelector('.lw-timeline-task-progress-thumb');

        if (!taskProgressBar) {
            return;
        }

        progress = (Math.min(100, Math.max(0, progress)) || 0);

        taskBarThumb.style[that.rightToLeft ? 'left' : 'right'] = '';
        taskBarThumb.style[that.rightToLeft ? 'right' : 'left'] = taskProgressBar.style.width = progress + '%';

        if (that.showProgressLabel) {
            const labelFormatFunction = that.progressLabelFormatFunction;

            taskProgressBar.setAttribute('value', labelFormatFunction ? (labelFormatFunction(progress) + '') : (parseFloat(progress.toFixed(2)) + '%'));
        }
        else {
            taskProgressBar.removeAttribute('value');
        }
    }

    /**
     * Configures the Timeline Task Bar's settings like size, progress, etc.
     */
    _setTimelineTaskBar(taskDetails, reset) {
        const that = this,
            taskBarIndex = that._tasks.filter(t => !t.hidden).indexOf(taskDetails),
            taskBars = that.$.timelineTasksContainer.children,
            taskBar = taskBars[taskBarIndex];

        let cellStart, cellEnd;

        if (taskBars.length === 0 || !taskBar) {
            return;
        }

        cellStart = (!reset && taskBar._cellStart) || that._getTimelineCellByDate(taskDetails.dateStart instanceof Date ? taskDetails.dateStart : new Date(taskDetails.dateStart));
        cellEnd = (!reset && taskBar._cellEnd) || that._getTimelineCellByDate(taskDetails.dateEnd instanceof Date ? taskDetails.dateEnd : new Date(taskDetails.dateEnd));

        taskBar._cellStart = cellStart;
        taskBar._cellEnd = cellEnd;

        const taskBarDetails = that._getTaskBarDetails(taskBar);

        if (taskBarDetails) {
            taskBar.style.top = taskBarDetails.top + 'px';
            //Reset from RTL
            taskBar.style[that.rightToLeft ? 'left' : 'right'] = '';
            taskBar.style[that.rightToLeft ? 'right' : 'left'] = taskBarDetails.left + 'px';
            taskBar.style.width = taskBarDetails.width + 'px';
        }

        if (taskDetails.$.project && !that._isTaskExpanded(taskDetails)) {
            taskBar.classList.add('lw-visibility-hidden');
        }
        else {
            taskBar.classList.remove('lw-visibility-hidden');
        }
    }

    /**
     * Returns the timeline cell according to a date
     */
    _getTimelineCellByDate(targetDate) {
        const that = this,
            dateCells = that._timelineCells;

        if (!dateCells || dateCells.length === 0) {
            return;
        }

        for (let m = 0; m < dateCells.length; m++) {
            const cell = dateCells[m],
                cellDate = cell.date;

            switch (that.view) {
                case 'year':
                    if (cellDate.getFullYear() === targetDate.getFullYear() && cellDate.getMonth() === targetDate.getMonth()) {
                        return cell;
                    }

                    break;
                case 'month': {
                    const startDate = new Date(cellDate);
                    let endDate = new Date(cellDate);

                    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()) + 1);
                    endDate.setMilliseconds(endDate.getMilliseconds() - 1);

                    if (targetDate.getTime() >= startDate.getTime() && targetDate.getTime() <= endDate.getTime()) {
                        return cell;
                    }

                    break;
                }
                case 'week':
                    if (cellDate.getFullYear() === targetDate.getFullYear() && cellDate.getMonth() === targetDate.getMonth() &&
                        cellDate.getDate() === targetDate.getDate()) {
                        return cell;
                    }

                    break;
                case 'day':
                    if (cellDate.getFullYear() === targetDate.getFullYear() && cellDate.getMonth() === targetDate.getMonth() &&
                        cellDate.getDate() === targetDate.getDate() && cellDate.getHours() === targetDate.getHours()) {
                        return cell;
                    }

                    break;
            }
        }
    }

    /**
     * Refreshes the size and position of the header view detail cells
     * @param {any} cell
     * @param {any} cellIndex
     */
    _refreshViewDetailCell(viewDetailObj, timelineCellIndex, index) {
        const that = this,
            timelineCells = that._timelineCells,
            date = viewDetailObj.date;
        let cellWidth = 0, left = index === 0 ? 0 : undefined;

        if (timelineCellIndex === undefined) {
            timelineCellIndex = 0;
        }

        for (timelineCellIndex; timelineCellIndex < timelineCells.length; timelineCellIndex++) {
            const timelineCellObj = timelineCells[timelineCellIndex],
                width = that._getCellWidth(timelineCellObj, date);

            if (!width) {
                if (timelineCellObj.date.getTime() > date.getTime()) {
                    break;
                }
                else {
                    continue;
                }
            }

            if (left === undefined) {
                left = timelineCellObj.left + timelineCellObj.width - width;
            }

            cellWidth += width;
        }

        if (that._isLastWeekCellNotFull) {
            delete that._isLastWeekCellNotFull;
            timelineCellIndex--;
        }

        viewDetailObj.width = cellWidth;
        //viewDetailObj.width = cellWidth + (timelineCellIndex - 2);
        viewDetailObj.left = left;

        return timelineCellIndex;
    }

    /**
     * Returns the widh
     * @param {any} cell
     * @param {any} date2
     */
    _getCellWidth(cell, date2) {
        const that = this,
            date1 = cell.date,
            isSameYear = (date1, date2) => (date1.getFullYear() === date2.getFullYear()),
            isSameMonth = (date1, date2) => (date1.getMonth() === date2.getMonth()),
            cellWidth = cell.width;

        switch (that.view) {
            case 'month':
                {
                    let cellStartDate = new Date(date1),
                        cellEndDate = new Date(cellStartDate),
                        weekDays = 0;

                    cellEndDate.setDate(cellEndDate.getDate() + (6 - cellStartDate.getDay()) + 1);
                    cellEndDate.setMilliseconds(cellEndDate.getMilliseconds() - 1);

                    while (cellStartDate.getTime() <= cellEndDate.getTime()) {
                        if (isSameYear(cellStartDate, date2) && isSameMonth(cellStartDate, date2)) {
                            weekDays++;
                        }

                        cellStartDate.setDate(cellStartDate.getDate() + 1);
                    }

                    if (weekDays === 0) {
                        return;
                    }

                    //Used to determine if the cell should be checked again for next month
                    that._isLastWeekCellNotFull = weekDays / 7 !== 1;

                    return cellWidth * weekDays / 7;
                }
            case 'year':
                if (isSameYear(date1, date2)) {
                    return cellWidth;
                }

                break;
            case 'week':
                {
                    const weekStartDate = new Date(date2),
                        weekEndDate = new Date(date2);

                    weekStartDate.setDate(date2.getDate() - date2.getDay());
                    weekEndDate.setDate(date2.getDate() + (6 - date2.getDay()));

                    if (date1.getTime() >= weekStartDate.getTime() && date1.getTime() <= weekEndDate.getTime()) {
                        return cellWidth;
                    }

                    break;
                }
            case 'day':
                if (isSameYear(date1, date2) && isSameMonth(date1, date2) && date1.getDate() === date2.getDate()) {
                    return cellWidth;
                }
                break;
        }
    }

    /**
     * Returns the timeline cell according to the offsetleft
     * @param {any} offsetLeft
     */
    _getCellByOffsetLeft(offsetLeft) {
        const that = this,
            timelineCells = that._timelineCells;

        if (!offsetLeft) {
            return;
        }

        let targetCell;

        for (let i = 0; i < timelineCells.length; i++) {
            if (timelineCells[i].left >= offsetLeft) {
                break;
            }

            targetCell = timelineCells[i];
        }

        return targetCell;
    }

    /**
     * Unselects all Tasks
     */
    _unselectAll(itemType, noEventFiring) {
        const that = this,
            timelineCellsContainer = that.$[`${itemType}TimelineCellsContainer`];

        //Unselect all timeline cells
        const allTimelineCells = timelineCellsContainer.querySelectorAll(`.lw-timeline-${itemType}-cell[selected]`);

        for (let t = 0; t < allTimelineCells.length; t++) {
            allTimelineCells[t].removeAttribute('selected');
        }

        //Unselect all Timeline tasks
        if (itemType === 'task') {
            const allTimelineTasks = that.$.timelineTasksContainer.querySelectorAll('.lw-timeline-task[selected]');

            for (let t = 0; t < allTimelineTasks.length; t++) {
                allTimelineTasks[t].removeAttribute('selected');
                allTimelineTasks[t].setAttribute('aria-selected', 'false');
            }
        }

        //Handle Tree task unselection
        if (!that[`_${itemType}TreeChangeEventFired`]) {
            that.$[itemType + 'Tree'].clearSelection();
        }

        const labelContainers = that.$[`${itemType}TreeSplitter`].getElementsByClassName(`lw-${itemType}-label-container`);

        //Remove hovered state from all items
        for (let i = 0; i < labelContainers.length; i++) {
            labelContainers[i].removeAttribute('selected');
        }

        that._highlightAssignedItem(itemType);

        if (noEventFiring || itemType !== 'task') {
            return;
        }

        const oldSelection = that.selectedIndexes.slice(0);

        if (oldSelection.length) {
            that.selectedIndexes = [];

            if (!that._noChangeEvent) {
                that.$.fireEvent('change', { value: [], oldValue: oldSelection, type: itemType });
            }
        }
    }

    /**
    * Returns the Timeline cells that contains the start and end dates of the taskBar
    * @param {any} position - the numeric representation of the x coordinate of the target
    */
    _getTaskBarCellRange(taskBar) {
        const that = this;

        if (!taskBar.classList || !taskBar.classList.contains('lw-timeline-task')) {
            return;
        }

        let taskBarWidth = parseFloat(taskBar.style.width) || taskBar.offsetWidth;

        const timelineCells = that._timelineCells,
            timelineContent = that.$.timelineContent,
            taskBarLeft = parseFloat(taskBar.style[that.rightToLeft ? 'right' : 'left']) ||
                (that.rightToLeft ? (parseFloat(timelineContent.style.width) || timelineContent.offsetWidth) - (taskBar.offsetLeft + taskBar.offsetWidth) : taskBar.offsetLeft);
        let cellStart, cellEnd;

        if (!taskBarWidth && taskBar.classList.contains('milestone')) {
            taskBarWidth = taskBar.offsetHeight / 2;
        }

        for (let c = 0; c < timelineCells.length; c++) {
            const cell = timelineCells[c],
                cellLeft = cell.left,
                cellWidth = cell.width,
                cellRight = parseFloat((cellLeft + cellWidth).toFixed(2)),
                taskBarRight = parseFloat((taskBarLeft + taskBarWidth).toFixed(2));

            if (taskBarLeft >= cellLeft && taskBarLeft <= cellRight) {
                cellStart = cell;
            }

            if (!cellEnd && taskBarRight > cellLeft && taskBarRight <= cellRight) {
                cellEnd = cell;
            }

            if (cellStart && cellEnd) {
                break;
            }
        }

        if (!cellStart) {
            cellStart = taskBar.classList.contains('milestone') && cellEnd ? cellEnd : timelineCells[0];
        }

        if (!cellEnd) {
            cellEnd = timelineCells[timelineCells.length - 1];
        }

        return { cellStart: cellStart, cellEnd: cellEnd };
    }

    /**
    * Returns the Date according to the offset
    * @param {any} offset - taskBar offsetLeft
    * @param {any} cell - the target cell
    */
    _getDateFromCell(offset, cell, view) {
        if (!cell) {
            return new Date();
        }

        const that = this,
            cellDate = new Date(cell.date);
        let timeInterval,
            startDay = 0,
            startHour = 0;

        if (!view) {
            view = that.view;
        }

        switch (view) {
            case 'year': {
                //Description: Shows the months of the year
                timeInterval = new Date(cellDate.getFullYear(), cellDate.getMonth() + 1, 0).getDate();
                startDay = 1;
                break;
            }
            case 'month': {
                //Description: Shows the first day of each week
                startDay = cellDate.getDate();
                timeInterval = 7;
                break;
            }
            case 'week':
                //Description: Shows the days of the week
                timeInterval = 1;
                startDay = cellDate.getDate();
                break;
            case 'day':
                //Description: Shows the Time of the day
                timeInterval = 1 / 24;
                startDay = cellDate.getDate();
                startHour = cellDate.getHours();
                break;
        }

        const dayProportion = parseFloat((((offset - cell.left) / cell.width) * timeInterval).toFixed(12)),
            day = Math.min(timeInterval, Math.floor(dayProportion)),
            hoursProportion = dayProportion % 1 * 24,
            hours = Math.floor(hoursProportion),
            minutesProportion = Math.abs((hoursProportion - hours)) * 60,
            minutes = Math.floor(minutesProportion),
            secondsProportion = Math.abs((minutesProportion - minutes)) * 60,
            seconds = Math.floor(secondsProportion),
            miliSecondProportion = Math.abs((secondsProportion - seconds)) * 1000,
            miliSeconds = Math.floor(miliSecondProportion);

        return new Date(cellDate.getFullYear(), cellDate.getMonth(), startDay + day, startHour + hours, minutes, seconds, miliSeconds);
    }

    /**
     * Creates a dataSource for the Tree custom element
     * @param {any} tasks
     */
    _createTreeTasks(tasks, attrName) {
        if (!tasks) {
            return [];
        }

        let treeTasks = [];

        for (let t = 0; t < tasks.length; t++) {
            const treeTask = {};

            treeTask.label = tasks[t][attrName];

            if (tasks[t].tasks) {
                treeTask.items = this._createTreeTasks(tasks[t].tasks, attrName);
            }

            treeTasks.push(treeTask);
        }

        return treeTasks;
    }

    /**
     * Returns the JSON structure of the items
     */
    _getTasksJSON(originalState) {
        const that = this;
        let allTasks = that._tasks, isResourceView,
            isSorted,
            projectName = 'project';

        if (originalState) {
            if (that.view !== 'resource' && that._view !== undefined) {
                projectName = '_project';
                allTasks = that.__tasks.slice(0);
                isResourceView = true;
            }

            if (that.sortable && that._unsortedTasks) {
                allTasks = that._unsortedTasks.slice(0);
                that._unsortTasks(allTasks);
                isSorted = true;
            }
        }

        function getTasksJSON(tasks, project) {
            if (!tasks) {
                return;
            }

            let tasksJSON = [];

            for (let t = 0; t < tasks.length; t++) {
                const task = tasks[t];
                let clonedObject;

                if ((!task.$[projectName] && !project) || task.$[projectName] === project) {
                    clonedObject = that._cloneObject(task, true);
                    clonedObject.tasks = getTasksJSON(task.tasks, task);

                    if (isResourceView) {
                        if (!task.disableResources) {
                            clonedObject.connections.map(connection => Object.assign({}, connection));
                            clonedObject.connections.forEach(con => con.target = that.__tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]));
                        }

                        //Connections of 'disableResource' tasks that are not visible in Resoruce View
                        if (clonedObject.$._connections) {
                            clonedObject.connections.push.apply(clonedObject.connections, clonedObject.$._connections);
                            delete clonedObject.$._connections;
                        }
                    }
                    else if (isSorted) {
                        clonedObject.connections.forEach(con => con.target = allTasks.indexOf(that._tasks[that._getTaskIndexById(con.target)]));
                    }

                    delete clonedObject.$;

                    tasksJSON.push(clonedObject);
                }
            }

            return tasksJSON;
        }

        return getTasksJSON(allTasks);
    }

    _cloneObject(obj, isJSON) {
        let newObj = {};

        for (let prop in obj) {
            let objValue = obj[prop];

            if (prop === 'tasks') {
                continue;
            }

            if (prop === 'connections') {
                newObj[prop] = JSON.parse(JSON.stringify(objValue));
                continue;
            }

            if (objValue instanceof Date) {
                newObj[prop] = isJSON ? objValue.toISOString() : new Date(objValue);
                continue;
            }

            newObj[prop] = objValue;
        }

        if (!isJSON) {
            delete newObj.$;
        }

        return newObj;
    }

    /**
     * Refresh the Task Tree and the other task columns. Updates the headers and fills the cells with content
     */
    _createTreeColumns(splitter) {
        const that = this,
            [items, columnHeadersDetails, itemName] = splitter === that.$.taskTreeSplitter ?
                [that._getTasksJSON(), that.taskColumns, 'task'] : [that._resources.map(r => Object.assign({}, r)), that.resourceColumns, 'resource'],
            columnHeaders = splitter.getElementsByClassName(`lw-${itemName}-tree-header`);

        if (!that.contains(splitter)) {
            return;
        }

        if (columnHeadersDetails.length > columnHeaders.length) {
            while (columnHeadersDetails.length > columnHeaders.length) {
                const splitterItem = document.createElement('lw-splitter-item');

                splitterItem.innerHTML = `<div class="lw-${itemName}-tree-header"></div><div class="lw-${itemName}-tree-content">`;
                splitter.appendChild(splitterItem);
            }
        }
        else {
            const items = splitter.items;

            while (columnHeaders.length > columnHeadersDetails.length) {
                if (columnHeaders.length === 1) {
                    break;
                }

                splitter.removeChild(items[items.length - 1]);
            }
        }

        if (!columnHeadersDetails.length) {
            that.$[itemName + 'Tree'].dataSource = [];
            columnHeaders[0].innerHTML = '';
            return;
        }

        const rootColumn = columnHeadersDetails.find(col => col.root === true),
            rootColumnIndex = columnHeadersDetails.indexOf(rootColumn),
            splitterItems = splitter._items,
            taskTreeSplitterItem = splitterItems.find(item => item.contains(that.$.taskTree) || item.contains(that.$.resourceTree));

        if (rootColumn && splitterItems.indexOf(taskTreeSplitterItem) !== rootColumnIndex) {
            splitter.insert(rootColumnIndex, taskTreeSplitterItem);
        }
        else if (!rootColumn && splitterItems.indexOf(taskTreeSplitterItem) !== 0) {
            splitter.insert(0, taskTreeSplitterItem);
        }

        const columnsCount = columnHeadersDetails.length,
            columnMinWidth = parseFloat(getComputedStyle(that).getPropertyValue('--lw-gantt-chart-timeline-cell-min-size') || 0);

        for (let i = 0; i < columnsCount; i++) {
            const headerDetails = columnHeadersDetails[i],
                columnHeader = columnHeaders[i],
                columnHeaderSplitterItem = columnHeader.closest('lw-splitter-item');

            columnHeader.innerHTML = `<div>${that.localize(headerDetails.label) || headerDetails.label}</div>`;

            if (columnHeaderSplitterItem && !that[`_${itemName}SplitterItemSizeSet`]) {
                if (headerDetails.size) {
                    if (that.shadowRoot) {
                        requestAnimationFrame(() => columnHeaderSplitterItem.size = headerDetails.size);
                    }
                    else {
                        columnHeaderSplitterItem.size = headerDetails.size;
                    }
                }

                //columnHeaderSplitterItem.size = headerDetails.size ? headerDetails.size : 100 / columnsCount + '%';
                columnHeaderSplitterItem.min = headerDetails.min ? headerDetails.min : columnMinWidth;
                columnHeaderSplitterItem.max = headerDetails.max ? headerDetails.max : columnHeaderSplitterItem.max;
                columnHeaderSplitterItem.locked = headerDetails.locked ? headerDetails.locked : columnHeaderSplitterItem.locked;

                const splitterBar = columnHeaderSplitterItem.nextElementSibling || columnHeaderSplitterItem.previousElementSibling;

                if (splitterBar) {
                    headerDetails.hideResizeBar ? splitterBar.hide() : splitterBar.show();
                }
            }

            that._createTreeColumnsData(columnHeaderSplitterItem, headerDetails, items.filter(i => !i.hidden), itemName);
        }

        const parentSplitter = splitter.closest('lw-splitter');

        if (parentSplitter.isCompleted) {
            parentSplitter.refresh();

            //The treeSplitter is resized after the element scrollwidth is calculated
            // and needs to be resized again
            if (that.treeSize === 'auto') {
                that._resizeEventHandler();
            }
        }

        that[`_${itemName}SplitterItemSizeSet`] = true;

        //Sets the styles for sorting
        that._setColumnHeadersSorting(itemName);

        that._refresh();
    }

    /**
     * Refreshes the labels of the headers of the Columns
     */
    _refreshColumnsHeaders(type) {
        const that = this;

        if (!type) {
            type = 'task';
        }

        const columnHeadersDetails = that[`${type}Columns`],
            columnHeaders = that.$[`${type}TreeSplitter`].getElementsByClassName(`lw-${type}-tree-header`);

        for (let i = 0; i < columnHeaders.length; i++) {
            columnHeaders[i].innerHTML = `<div>${that.localize(columnHeadersDetails[i].label) || columnHeadersDetails[i].label}</div>`;
        }

        if (!arguments.length && that.$.mainSplitter.contains(that.$.resourceSplitter)) {
            that._refreshColumnsHeaders('resource');
        }
    }

    /**
     * Populates the Task Tree with data
     * @param {any} splitterItem - the parent splitter of a task tree column
     * @param {any} headerDetails - object containing the details for the column data
     * @param {any} tasks - JSON array of the tasks inside the element
     */
    _createTreeColumnsData(splitterItem, headerDetails, items, itemName) {
        const that = this;

        function prepareTaskData(item, returnTask) {
            if (item.tasks) {
                item.tasks = item.tasks.filter(t => !t.hidden);
                item.tasks.forEach(item => prepareTaskData(item));
            }

            if (item.hidden) {
                return;
            }

            item[headerDetails.value] = that._formatColumnData(item, headerDetails, true);

            if (returnTask) {
                return item;
            }
        }

        if (!splitterItem) {
            return;
        }

        if (!itemName) {
            itemName = 'task';
        }

        const value = headerDetails.value,
            tree = splitterItem.querySelector('lw-tree');

        if (tree) {
            if (value) {
                tree.itemsMember = itemName + 's';
                tree.displayMember = headerDetails.value;

                const newDataSource = items.map((item) => prepareTaskData(item, true)).filter(i => i !== undefined);

                if (newDataSource.length) {
                    //Updates the dataSource of the tree element
                    //Note: remove,insert,update will not update the dataSource of the Tree
                    //if the newDataSource is the same as before item manipulation,
                    //so it will not be updated if set via default way tree.dataSource = newDataSource;
                    tree.set('dataSource', []);
                }

                tree.dataSource = newDataSource;

                that._unfocusTreeItems(tree === that.$.taskTree ? that.$.taskTreeSplitter : that.$.resourceTreeSplitter);
            }
            else {
                tree.dataSource = [];
            }

            tree.$.scrollViewer.scrollTop = itemName === 'task' ? that.scrollTop : that.$.resourceVerticalScrollBar.value;
            return;
        }

        const dataContainer = splitterItem.getElementsByClassName(`lw-${itemName}-tree-content`)[0];

        if (!dataContainer) {
            return;
        }

        dataContainer.innerHTML = '';

        if (!value) {
            return;
        }

        dataContainer.appendChild(that._createTreeItemContainers(items, headerDetails, itemName));
    }

    /**
     * Creates a Task Tree container
     * @param {any} tasks - tasks array
    * @param {any} tasks - header Details
     */
    _createTreeItemContainers(items, headerDetails, itemName) {
        const that = this,
            fragment = document.createDocumentFragment();

        for (let i = 0; i < items.length; i++) {
            const item = items[i],
                taskContainer = document.createElement('div');

            taskContainer.innerHTML = `<div class="lw-${itemName}-label-container"></div>`;
            taskContainer.firstElementChild.innerHTML = that._formatColumnData(item, headerDetails);

            if (item.tasks && item.tasks.length > 0) {
                taskContainer.setAttribute('group', '');
                taskContainer.innerHTML += `<div class="lw-${itemName}-drop-down ${!item.expanded ? 'lw-visibility-hidden' : ''}"></div>`;
                taskContainer.lastElementChild.appendChild(that._createTreeItemContainers(item.tasks, headerDetails, itemName));
            }

            taskContainer.classList.add(`lw-${itemName}-item`);

            //Accessibility
            if (!taskContainer.id) {
                taskContainer.setAttribute('id', `${itemName}Item` + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
            }

            fragment.appendChild(taskContainer);
        }

        return fragment;
    }

    /**
     * Formats the column data
     * @param {any} data
     * @param {any} headerDetails
     */
    _formatColumnData(item, headerDetails, noEllipsisWrapper) {
        const that = this;
        let type = that.taskColumns.includes(headerDetails) ? 'task' : 'resource';

        if (type === 'task') {
            type = that._unsortedTasks ? 'unsortedTask' : type;
        }
        else {
            type = that._unsortedResources ? 'unsortedResource' : type;
        }

        let data = item[headerDetails.value]

        //NOTE: Since Flexbox + ellipsis can't work toghether, a wrapper is necessary
        function getEllipsisWrapper(text) {
            return noEllipsisWrapper ? text : '<span>' + (text) + '</span>';
        }

        if (typeof headerDetails.formatFunction === 'function') {
            return headerDetails.formatFunction.call(that, headerDetails.value.toLowerCase().indexOf('date') > -1 ? new Date(data) : data, that._getItemIndex(item, type));
        }

        if (headerDetails.value) {
            const headerValue = (headerDetails.value + '').toLowerCase();

            if (headerValue.indexOf('date') > -1) {
                const date = Date.parse(data);

                if (!isNaN(date)) {
                    return getEllipsisWrapper(new Date(date).toLocaleDateString(that.locale, { year: 'numeric', month: '2-digit', day: 'numeric' }));
                }
            }
            else if (headerValue.indexOf('duration') > -1) {
                return getEllipsisWrapper(parseFloat(data.toFixed(1)));
            }
            else if (headerValue === 'resources') {
                if (item.disableResources) {
                    return '';
                }

                if (!Array.isArray(data)) {
                    data = [data].reduce((acc, value) => acc.concat(value), [])
                }

                let result = [];

                for (let i = 0; i < data.length; i++) {
                    const match = that._resources.find(res => res.id && res.id.toString() === data[i].toString());

                    if (match && match.label !== undefined) {
                        result.push(match.label);
                    }
                }

                data = result.length ? result : undefined;
            }
        }

        return getEllipsisWrapper(data !== undefined ? data.toString() : that.localize('unassigned'));
    }

    /**
     * Validates the properties of the task
     * @param {any} task
     */
    _validateTaskProperties(task, project) {
        const that = this;

        function validateDate(task, date) {
            task[date] = that._dateValidator(undefined, task[date]);

            if (!task[date] || isNaN(task[date].getTime())) {
                task[date] = undefined;
            }

            return task[date];
        }

        if (task.id === undefined) {
            delete task.id;
        }


        if (!task.$) {
            task.$ = {};
        }

        //Validate duration
        let duration = that._convertDuration(parseInt(task.duration)) || 0,
            minDuration = that._convertDuration(parseInt(task.minDuration)) || 0,
            maxDuration = that._convertDuration(parseInt(task.maxDuration)) || 0;

        if (minDuration && maxDuration) {
            maxDuration = Math.max(minDuration, maxDuration);
        }

        if (task.hidden === undefined && project) {
            task.hidden = project.hidden;
        }

        task.hidden = !!task.hidden;

        if (duration) {
            if (minDuration) {
                duration = Math.max(minDuration, duration);
            }
            else if (maxDuration) {
                duration = Math.min(duration, maxDuration);
            }
        }

        if (task.resources === undefined) {
            task.resources = [];
        }
        else {
            //Flatten the array
            task.resources = [task.resources].reduce((acc, value) => acc.concat(value), []);
        }

        //Set the validated duration in the appropriate unit accordint to durationUnit
        task.duration = that._convertDuration(duration, true)
        task.minDuration = that._convertDuration(minDuration, true);
        task.maxDuration = that._convertDuration(maxDuration, true);

        //Validates minDateStart/maxDateStart
        task.minDateStart = validateDate(task, 'minDateStart');
        task.maxDateStart = validateDate(task, 'maxDateStart');

        if (task.minDateStart && task.maxDateStart) {
            task.maxDateStart = new Date(Math.max(task.minDateStart.getTime(), task.maxDateStart.getTime()));
        }

        task.minDateEnd = validateDate(task, 'minDateEnd');
        task.maxDateEnd = validateDate(task, 'maxDateEnd');

        if (task.minDateEnd && task.maxDateEnd) {
            task.maxDateEnd = new Date(Math.max(task.minDateEnd.getTime(), task.maxDateEnd.getTime()));
        }

        //Validate dateStart/dateEnd
        task.dateStart = validateDate(task, 'dateStart');
        task.dateEnd = validateDate(task, 'dateEnd');

        if (!task.dateStart) {
            if (task.minDateStart) {
                task.dateStart = task.minDateStart;
            }
            else if (task.maxDateStart) {
                task.dateStart = task.maxDateStart;
            }
            else {
                task.dateStart = that.dateStart;
            }
        }

        if (!task.dateEnd) {
            if (task.minDateEnd) {
                task.dateEnd = task.minDateEnd;
            }
            else if (task.maxDateEnd) {
                task.dateEnd = task.maxDateEnd;
            }
        }

        if (task.minDateStart) {
            task.dateStart = new Date(Math.max(task.minDateStart.getTime(), task.dateStart.getTime()));
        }

        if (task.maxDateStart) {
            task.dateStart = new Date(Math.min(task.maxDateStart.getTime(), task.dateStart.getTime()));
        }

        if (task.minDateEnd) {
            task.dateEnd = new Date(Math.max(task.minDateEnd.getTime(), task.dateEnd.getTime()));
        }

        if (task.maxDateEnd) {
            task.dateEnd = new Date(Math.min(task.maxDateEnd.getTime(), task.dateEnd.getTime()));
        }

        if (task.dateStart) {
            if (that.min) {
                duration = Math.min(task.dateStart.getTime() - that.min.getTime(), duration);
            }

            if (that.max) {
                duration = Math.min(that.max.getTime() - task.dateStart.getTime(), duration);
            }
        }

        if (!task.dateStart && duration && task.dateEnd) {
            task.dateStart = new Date(task.dateEnd.getTime() - duration);
        }

        if (task.type === 'task' && (!task.dateStart || isNaN(task.dateStart.getTime())) && project) {
            task.dateStart = new Date(project.dateStart);
        }

        //Validate agains the minDuration
        if (minDuration && task.dateStart) {
            if (that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0) {
                const minDateEnd = that._getTaskWorkingDateEnd(task, minDuration);

                task.dateEnd = new Date(Math.max(task.dateEnd ? task.dateEnd.getTime() : 0, minDateEnd.getTime()));
            }
            else {
                task.dateEnd = new Date(Math.max(task.dateEnd ? task.dateEnd.getTime() : 0, task.dateStart.getTime() + duration));
            }
        }

        if (duration && task.dateStart) {
            //Validate accroding to workDays/workHours
            task.dateEnd = that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0 ? that._getTaskWorkingDateEnd(task, duration) : new Date(task.dateStart.getTime() + duration);
        }

        if (duration || maxDuration) {
            let possibleMaxDate;

            if (that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0) {
                possibleMaxDate = that._getTaskWorkingDateEnd(task, Math.max(duration, maxDuration));
            }
            else {
                possibleMaxDate = new Date(task.dateStart.getTime() + Math.max(duration, maxDuration));
            }

            if (task.dateEnd.getTime() > possibleMaxDate.getTime()) {
                task.dateEnd = possibleMaxDate;
            }
        }

        if (task.type === 'task' && !task.dateEnd && project) {
            task.dateEnd = new Date(project.dateEnd);
        }

        //Validate agains min/max
        task.dateStart = that._minMaxDateValidator(task.dateStart);
        task.dateEnd = that._minMaxDateValidator(task.dateEnd);

        if (task.type === 'milestone') {
            task.dateStart = validateDate(task, 'dateStart');
            task.dateEnd = validateDate(task, 'dateEnd');

            task.dateStart = task.dateEnd = new Date(Math.max(task.dateStart ? task.dateStart.getTime() : 0, task.dateEnd ? task.dateEnd.getTime() : 0));
        }

        //Update the project's start/end
        if (project) {
            that._synchronizeProjectDates(project, task);
        }

        if (task.expanded !== undefined) {
            task.expanded = !!task.expanded;
        }

        task.progress = Math.min(Math.max(0, parseFloat(task.progress) || 0), 100);

        if (!task.dateStart && !task.dateEnd && (task.type === 'project' && !task.synchronized)) {
            return;
        }

        if (task.type !== 'milestone' && task.dateStart && (task.dateEnd && (task.dateStart.getTime() > task.dateEnd.getTime()) || !task.dateEnd)) {
            task.dateEnd = new Date(task.dateStart.getTime() + 1000 * 60 * 60 * (that.view === 'day' ? 1 : 24));
        }

        if (task.dateStart && task.dateEnd) {
            task.duration = that._convertDuration(that.nonworkingDays.length > 0 || that.nonworkingHours.length > 0 ?
                that._getWorkingTime(task.dateStart, task.dateEnd) : task.dateEnd.getTime() - task.dateStart.getTime(), true);
        }

        //Validate the task connections
        const connections = task.connections;

        if (!(connections instanceof Array)) {
            task.connections = [];
        }
        else {
            for (let c = 0; c < connections.length; c++) {
                const con = connections[c],
                    target = con.target = typeof con.target === 'string' ? con.target : parseInt(con.target),
                    type = con.type = parseInt(con.type);

                if (target === undefined || target === null || (typeof target === 'number' && isNaN(target)) || isNaN(type)) {
                    connections.splice(connections.indexOf(con), 1);
                    c--;
                    continue;
                }

                con.lag = parseInt(con.lag) || 0;
            }

            task.connections = task.connections.map(con => Object.assign({}, con));
        }

        task.class = task.class ? task.class + '' : '';
        task.class = task.class !== undefined && task.class !== null ? task.class : '';

        return task;
    }

    /**
     * Synchronizes the dateStart and dateEnd between synchronized Projects and their tasks
     * @param {any} project
     * @param {any} task
     */
    _synchronizeProjectDates(project, task) {
        function getDate(dateName, operation) {
            const projectTasks = project.tasks;
            let taskDate = task[dateName];

            if (projectTasks) {
                for (let i = 0; i < projectTasks.length; i++) {
                    const projectTaskDate = projectTasks[i][dateName];

                    // if (projectTasks[i].$.project === project && projectTasks[i][dateName]) {
                    if (projectTaskDate instanceof Date) {
                        taskDate = new Date(Math[operation](projectTaskDate.getTime(), taskDate.getTime()))
                    }
                }
            }

            return new Date(taskDate);
        }

        if (!project) {
            return;
        }

        if (project.synchronized) {
            if (task.dateStart) {
                project.dateStart = getDate('dateStart', 'min');
            }

            if (task.dateEnd) {
                project.dateEnd = getDate('dateEnd', 'max');
            }

            if (task.minDateStart) {
                project.minDateStart = getDate('minDateStart', 'max');
            }

            if (task.maxDateStart) {
                project.maxDateStart = getDate('maxDateStart', 'min');
            }

            if (task.minDateEnd) {
                project.minDateEnd = getDate('minDateEnd', 'max');
            }

            if (task.maxDateEnd) {
                project.maxDateEnd = getDate('maxDateEnd', 'min');
            }

            if (project.dateStart && project.dateEnd) {
                project.duration = this._convertDuration(project.dateEnd.getTime() - project.dateStart.getTime(), true);
            }
        }

        if (project.$) {
            this._synchronizeProjectDates(project.$.project, task);
        }
    }

    _synchronizeProjectVisibility(project, task) {
        const that = this;

        if (!project) {
            return;
        }

        if (project.hidden && !task.hidden) {
            project.hidden = task.hidden;

            if (project.$) {
                that._synchronizeProjectVisibility(project.$.project, project);
            }
        }
    }

    /**
     * Mouse wheel event handler
     * @param {any} event
     */
    _mouseWheelHandler(event) {
        const that = this,
            popupWindow = (that.shadowRoot || that).querySelector('.lw-task-popup-window');

        if (popupWindow && popupWindow.modal && popupWindow.opened) {
            event.stopPropagation();
            return;
        }

        if (that.disabled || (!that.computedHorizontalScrollBarVisibility && !that.computedVerticalScrollBarVisibility)) {
            return;
        }

        if (event.shiftKey) {
            that._handleHorizontalScroll();
            return;
        }

        if (that.$.resourceSplitterItem.contains(event.target)) {
            that._handleVerticalScroll(true);
            return;
        }

        if (that.$.taskSplitterItem.contains(event.target)) {
            that._handleVerticalScroll();
        }
    }

    /**
     * Handles mouse wheel vertical scrolling inside the Timeline
     * @param {Boolean} isResourceScrollBar - determines whether it's ResourcePanel VScroll or TaskPanel
     */
    _handleVerticalScroll(isResourceScrollBar) {
        const that = this;
        let scrollBar, scrollTop, scrollMax, scrollView;

        if (isResourceScrollBar) {
            scrollBar = that.$.resourceVerticalScrollBar;

            if (scrollBar.classList.contains('lw-hidden')) {
                return true;
            }

            scrollTop = scrollBar.value;
            scrollMax = scrollBar.max;
            scrollView = that._resourceScrollView;
        }
        else {
            if (!that.computedVerticalScrollBarVisibility) {
                return true;
            }

            scrollTop = that.scrollTop;
            scrollMax = that.scrollHeight
            scrollView = that;
        }

        if (scrollTop === 0 && event.deltaY < 0 ||
            scrollTop === scrollMax && event.deltaY > 0) {
            event.stopPropagation();
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        scrollView.scrollTo(scrollTop + that._getScrollCoefficient(event, that.offsetHeight));
    }

    /**
     * Handles mouse wheel horizontal scrolling inside the Timeline
     */
    _handleHorizontalScroll() {
        const that = this;

        if (!that.computedHorizontalScrollBarVisibility) {
            return true;
        }

        const scrollLeft = that.scrollLeft;

        if (scrollLeft === 0 && event.deltaX < 0 ||
            scrollLeft === that.scrollHeight && event.deltaX > 0) {
            event.stopPropagation();
        }

        event.stopPropagation();
        event.preventDefault();

        if (that.scrollWidth > 0) {
            that.scrollTo(undefined, that.scrollLeft + that._getScrollCoefficient(event, that.offsetWidth));
        }
    }

    /**
    * Set's the Template for the Timeline header
    * @param - type - the type of the template: task or resource
    */
    _handleHeaderTemplate(type = 'task') {
        const that = this;

        if (!('content' in document.createElement('template'))) {
            that.error(that.localize('htmlTemplateNotSuported', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        const selector = that.$[`${type}SplitterItemHeader`],
            splitterItem = that.$[`${type}SplitterItem`],
            propertyName = type === 'task' ? 'headerTemplate' : 'resourcePanelHeaderTemplate';
        let template = that[propertyName];

        //Empty the container
        splitterItem.removeAttribute('show-header');
        selector.innerHTML = '';

        if (!template) {
            return;
        }

        if (typeof template === 'function') {
            template(selector, {});

            if (selector.innerHTML) {
                splitterItem.setAttribute('show-header', '');
            }
            else {
                splitterItem.removeAttribute('show-header');
            }

            return;
        }
        else if (typeof (template) === 'string') {
            template = document.getElementById(template);
        }

        if (template === null || !('content' in template)) {
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase(), property: propertyName }));
            return;
        }

        let clone = document.importNode(template.content, true);

        splitterItem.setAttribute('show-header', '');

        if (that.shadowRoot) {
            selector.innerHTML = '<slot></slot>'
            that.appendChild(clone);
            return;
        }

        selector.appendChild(clone);
    }

    /**
     * Horizontal Scroll Bar Change handler
     * @param {any} event
     */
    _horizontalScrollbarHandler(event) {
        const that = this;

        event.stopPropagation();

        that.$.timeline.scrollLeft = that.$.resourceTimeline.scrollLeft = that._getScrollLeft(event.detail.value);

        that._recycle(event);

        //if (event.context.max === event.context.value) {
        //    that.$.fireEvent('scrollLeftReached');
        //    return;
        //}

        //if (event.context.min === event.context.value) {
        //    that.$.fireEvent('scrollRightReached');
        //}
    }

    /**
     * Vertical Scroll Bar change handler
     * @param {any} event
     */
    _verticalScrollbarHandler(event) {
        const that = this;

        event.stopPropagation();

        if (event.target === that.$.resourceVerticalScrollBar) {
            that.$.resourceTimelineContent.scrollTop = Math.round(event.detail.value);
        }
        else {
            that.$.timelineContent.scrollTop = Math.round(event.detail.value);
        }

        that._recycle(event);

        if (event.context.max === event.context.value) {
            that.$.fireEvent('scrollBottomReached');
            return;
        }

        if (event.context.min === event.context.value) {
            that.$.fireEvent('scrollTopReached');
        }
    }

    /**
     * Sorts the Tasks/Resources inside the Gantt Chart
     * @param {[ value: string, sortOrder: number, type: string ]} - sortColumns - array of objects that determine what to sort
     */
    sort(columns) {
        const that = this;

        if (!that.sortable) {
            return;
        }

        if (!Array.isArray(columns)) {
            columns = typeof columns === 'object' ? [columns] : [];
        }

        const taskColumns = that.taskColumns,
            resourceColumns = that.resourceColumns;

        taskColumns.forEach(col => delete col.sort);
        resourceColumns.forEach(col => delete col.sort);

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i],
                itemColumns = column.type === 'resource' ? resourceColumns : taskColumns,
                itemColumn = itemColumns.find(col => column.value && col.value === column.value);

            if (!itemColumn) {
                continue;
            }

            let order = column.sortOrder;

            if (typeof order !== 'number') {
                order = parseInt(order + '');
                order = isNaN(order) ? undefined : order;
            }

            itemColumn.sort = column.direction === 'desc' ? 'desc' : 'asc';

            if (order !== undefined) {
                itemColumn.sortOrder = order;
            }
        }

        that._sortTasks();
        that._sortResources();
    }

    /**
     * Sorts/Unsorts the Tasks
     */
    _sortTasks(isInitializing) {
        const that = this;

        if (!that.sortable && !that._unsortedTasks) {
            return;
        }

        const isSorted = !!that._unsortedTasks,
            selectedTasks = that.selectedIndexes.map(t => that._tasks[t]);

        that._unsortTasks();

        if (that.view !== 'resource' && that._view !== undefined) {
            that._refreshTimeline();

            const selectedIndexes = that.selectedIndexes;

            //Apply selection only if needed
            if (!selectedTasks.every(t => selectedIndexes.includes(that._tasks.indexOf(t)))) {
                that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)));
                that._applySelection();
            }

            that._createResourceTimeline();
            return;
        }

        //Sort the Tasks
        that._sortItems('task');

        if (!isSorted && !that._unsortedTasks) {
            return;
        }

        //Remove current Timeline Tasks
        that.$.timelineTasksContainer.innerHTML = '';
        delete that._hoveredTimelineTask;

        //Remove current Timeline Connections
        that.$.timelineConnectionsContainer.innerHTML = '';

        if (!isInitializing) {
            // that._taskAPIManipulation = true;
            that._noChangeEvent = true;
            that._unselectAll('task');
            //Recreates the timeline
            that._createTreeColumns(that.$.taskTreeSplitter);
            that._createTimeline();
            // that._createResourceTimeline();

            //Recycle the content
            if (that.$.resourceTimelineCellsContainer.children.length) {
                that._resources.forEach(r => that._refreshResourceTimelineContent(r));
                that._highlightAssignedItem('resource', that._resources.indexOf(that._getItemByTreeIndex('resource', that.$.resourceTree.selectedIndexes[0])));
            }

            if (!that.taskColumns.length) {
                that._setColumnHeadersSorting('task');
            }

            // delete that._taskAPIManipulation;
            delete that._noChangeEvent;
        }

        const selectedIndexes = that.selectedIndexes;

        if (!selectedTasks.every(t => selectedIndexes.includes(that._tasks.indexOf(t)))) {
            that.set('selectedIndexes', selectedTasks.map(t => that._tasks.indexOf(t)));
            that._applySelection();
        }
    }

    /**
    * Sorts/Unsorts the Resources
    */
    _sortResources(isInitializing) {
        const that = this;

        if (!that.sortable && !that._unsortedResources) {
            return;
        }

        const isSorted = !!that._unsortedResources,
            selectedResources = that.$.resourceTree.selectedIndexes.map(r => that._getItemByTreeIndex('resource', r));

        that._unsortResources();

        //Sort the resources
        that._sortItems('resource');

        if (!isSorted && !that._unsortedResources) {
            return;
        }

        delete that._hoveredTimelineResource;

        if (!isInitializing) {
            const flag = that._resourceAPIManipulation;

            that._resourceAPIManipulation = true;
            that.$.resourceTree.selectedIndexes = [];
            that._createResourceTimeline();

            //Restore the selection before sorting
            if (selectedResources.length) {
                that._select('resource', selectedResources[0]);
            }

            that._resourceAPIManipulation = flag;

            if (!that.resourceColumns.length) {
                that._setColumnHeadersSorting('resource');
            }
        }
    }

    /**
     * Sets the appearance for the Tree Column Headers for sorting
     */
    _setColumnHeadersSorting(itemType) {
        const that = this,
            splitter = that.$[`${itemType}TreeSplitter`];

        if (!that.$.mainSplitter.contains(splitter)) {
            return;
        }

        const columns = splitter.items,
            itemColumns = that[`${itemType}Columns`],
            sortedColumns = itemColumns.filter(col => col.sort);

        columns.forEach(colHeader => colHeader.removeAttribute('sort'));

        if (!that.sortable) {
            return;
        }

        for (let i = 0; i < sortedColumns.length; i++) {
            const columnIndex = itemColumns.indexOf(sortedColumns[i]);

            columns[columnIndex].setAttribute('sort', sortedColumns[i].sort);

            if (that.sortMode === 'one') {
                return;
            }
        }
    }

    /**
     * Unsorts previiusly sorted tasks
     */
    _unsortTasks(tasks = this._unsortedTasks) {
        const that = this,
            isCustomTaskList = arguments[0];

        if (!tasks) {
            return;
        }

        let isResourceView;

        //Resource view
        if (that.view !== 'resource' && that._view !== undefined && that.__tasks) {
            isResourceView = true;

            if (!isCustomTaskList) {
                that._restoreTaskFromResourceView();
            }
        }

        //Unsort Tasks
        if (!isCustomTaskList) {
            //Update connections
            tasks.forEach(task => task.connections.forEach(con => con.target = tasks.indexOf(that._tasks[that._getTaskIndexById(con.target)])));

            that._tasks = tasks;
        }

        const projects = tasks.filter(t => t.tasks),
            projectAttribute = isCustomTaskList && isResourceView ? '_project' : 'project';

        projects.forEach(p => p.tasks = tasks.filter(t => t.$[projectAttribute] === p));

        //Restores the propper order of project's subtasks
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            let parentProject = project.$.project;

            while (parentProject) {
                const projectIndex = parentProject.tasks.indexOf(project);

                if (projectIndex > -1) {
                    Array.prototype.splice.apply(parentProject.tasks, [parentProject.tasks.indexOf(project) + 1, 0].concat(project.tasks));
                }

                parentProject = parentProject.$.project;
            }
        }

        if (!isCustomTaskList) {
            delete that._unsortedTasks;
        }
    }

    /**
     * Unsorts the Resources
     */
    _unsortResources() {
        const that = this;

        if (!that._unsortedResources) {
            return;
        }

        //Unsort Tasks
        that._resources = that._unsortedResources;

        delete that._unsortedResources;
    }

    /**
     * Sorts the Tasks
     */
    _sortItems(itemType = 'task') {
        const that = this;

        if (!that.sortable) {
            return;
        }

        const originalItems = that[`_${itemType}s`];

        if (!originalItems) {
            return;
        }

        const items = originalItems.filter(t => !t.$.project);

        if (!items.length) {
            return;
        }

        // let rootColumn;
        let sortColumns = [];
        const itemColumns = that[`${itemType}Columns`];

        for (let i = 0; i < itemColumns.length; i++) {
            const col = itemColumns[i];

            if (col.sort) {
                sortColumns.push(col);

                if (that.sortMode === 'one') {
                    break;
                }

                if (!col.sortOrder) {
                    col.sortOrder = 0;
                }
            }
        }

        if (!sortColumns.length) {
            itemType === 'task' ? that._unsortTasks() : that._unsortResources();
            return;
        }

        const sampleItem = items[0];
        let sortedItems = [];

        const sortBy = sortColumns.map(col => {
            const propName = col.value,
                sortOrder = parseInt(col.sortOrder + '');
            let type = '';

            if (typeof sampleItem[propName] === 'number') {
                type = 'number'
            }
            else if (sampleItem[propName] instanceof Date) {
                type = 'date'
            }

            col.sort = col.sort === 'desc' ? 'desc' : 'asc';

            return { value: propName, type: type, direction: col.sort, order: isNaN(sortOrder) ? 0 : sortOrder }
        }).sort((a, b) => b.order - a.order),
            sortSubTasks = (items) => {
                that._applySorting(items, sortBy);

                let sortedItems = items.slice(0);

                for (let t = 0; t < items.length; t++) {
                    const task = items[t];

                    if (task.tasks) {
                        task.tasks = sortSubTasks(task.tasks.filter(t => t.$.project === task));
                        Array.prototype.splice.apply(sortedItems, [sortedItems.indexOf(task) + 1, 0].concat(task.tasks));
                    }
                }

                return sortedItems;
            };

        that._applySorting(items, sortBy);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.$.project) {
                continue;
            }

            sortedItems.push(item);

            if (item.tasks) {
                item.tasks = sortSubTasks(item.tasks.filter(t => t.$.project === item));
                sortedItems = sortedItems.concat(item.tasks);
            }
        }

        if (itemType === 'resource') {
            that._unsortedResources = that._resources;
            that._resources = sortedItems;
            return;
        }

        that._unsortedTasks = that.__tasks || that._tasks;

        sortedItems.forEach(task => task.connections.forEach(con => con.target = sortedItems.indexOf(that._tasks[that._getTaskIndexById(con.target)])));
        that._tasks = sortedItems;
    }

    /**
     * Applies the sorting function for the Task/Resource sorting
     * @param {Array} tasks - the tasks to be sorted
     * @param {Array} sortBy - an array of values to sort by
     */
    _applySorting(tasks, sortBy = []) {
        const compare = (a, b, property, type) => {
            if (type === 'date') {
                return a[property].getTime() - b[property].getTime()
            }
            else if (type === 'number') {
                return a[property] - b[property]
            }
            else {
                return (a[property] + '').localeCompare(b[property] + '')
            }
        };

        tasks.sort((a, b) => {
            let index = 0;

            for (let i = 0; i < sortBy.length; i++) {
                index = sortBy[i].direction === 'asc' ?
                    compare(a, b, sortBy[i].value, sortBy[i].type) :
                    compare(b, a, sortBy[i].value, sortBy[i].type);

                if (index !== 0) {
                    break;
                }
            }

            return index;
        });
    }
});