
/**
 * Filter panel custom element.
 */

LW( 'lw-filter-panel', class FilterPanel extends LW.BaseElement {
    /**
     * Filter panel's properties.
     */
    static get properties() {
        return {
            'buttons': {
                value: [ 'clear', 'filter' ],
                type: 'array'
            },
            'data': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'dataField': {
                value: null,
                type: 'string?'
            },
            'dataSource': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'evaluateFilterExpression': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'filterType': {
                value: 'string',
                allowedValues: [ 'numeric', 'string', 'date', 'boolean' ],
                type: 'string'
            },
            'formatString': {
                value: 'd',
                type: 'string'
            },
            'messages': {
                value: {
                    'en': {
                        'addCondition': 'Add Condition',
                        'addGroup': 'Add Group',
                        'and': 'and',
                        'blanks': '(Blanks)',
                        'cancel': 'Cancel',
                        'clear': 'Clear',
                        'contains': 'contains',
                        'containsCaseSensitive': 'contains (case sensitive)',
                        'dateTabLabel': 'DATE',
                        'doesNotContain': 'does not contain',
                        'doesNotContainCaseSensitive': 'does not contain (case sensitive)',
                        'empty': 'empty',
                        'endsWith': 'ends with',
                        'endsWithCaseSensitive': 'ends with (case sensitive)',
                        'equal': 'equal',
                        'equalCaseSensitive': 'equal (case sensitive)',
                        'filter': 'Filter',
                        'greaterThan': 'greater than',
                        'greaterThanOrEqual': 'greater than or equal',
                        'lessThan': 'less than',
                        'lessThanOrEqual': 'less than or equal',
                        'mismatchedProperties': 'lwFilterPanel: The "filterType" and the data type of the selected "dataField" are mismatched.',
                        'missingProperty': 'lwFilterPanel: When mode is \'excel\', either "data" and "dataField" or "dataSource" of type Array have to be set.',
                        'notEmpty': 'not empty',
                        'notEqual': 'not equal',
                        'notNull': 'not null',
                        'null': 'null ',
                        'or': 'or',
                        'placeholderBoolean': 'Select value',
                        'placeholderDate': 'Enter date',
                        'placeholderNumber': 'Enter number',
                        'placeholderTime': 'Enter time',
                        'placeholderValue': 'Enter value',
                        'selectAll': '(Select All)',
                        'showRows': 'Show rows where:',
                        'startsWith': 'starts with',
                        'startsWithCaseSensitive': 'starts with (case sensitive)',
                        'timeTabLabel': 'TIME'
                    }
                },
                type: 'object',
                extend: true
            },
            'mode': {
                value: 'default',
                allowedValues: [ 'default', 'excel' ],
                type: 'string'
            }
        };
    }

    /**
     * Filter panel's event listeners.
     */
    static get listeners() {
        return {
            'cancelButton.click': 'cancel',
            'clearButton.click': 'clear',
            'filterButton.click': 'filter'
        };
    }

    /**
     * Filter panel's HTML template.
     */
    template() {
        const template =
            `<div id="container" class="lw-container" role="presentation">
                <div id="label" class="lw-filter-panel-label"></div>
                <div id="mainContainer" role="presentation"></div>
                <div id="buttonContainer" class="lw-filter-panel-button-container" role="presentation">
                    <lw-button id="filterButton" class="primary" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]"></lw-button>
                    <lw-button id="clearButton" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]"></lw-button>
                    <lw-button id="cancelButton" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]"></lw-button>
                </div>
            </div>`;

        return template;
    }

    static get styleUrls() {
        return [
            'lw.grid.css',
            'lw.dropdownlist.css',
            'lw.menu.css',
            'lw.filterpanel.css',
            'lw.textbox.css'
        ]
    }

    /**
     * Invoked when an instance of custom element is attached to the DOM for the first time.
     */
    ready() {
        super.ready();


    }

    render() {
        const that = this,
            filterType = that.filterType;

        if ( !that.$.label.id ) {
            that.$.label.id = that.id + 'Label';
        }

        that.setAttribute( 'role', 'dialog' );
        that.setAttribute( 'aria-labelledby', that.$.label.id );

        that._localize();
        that._setButtonsVisibility();
        that._filterType = filterType + 'Filter';
        that._filterHandler = new LW.Utilities[ filterType.slice( 0, 1 ).toUpperCase() + filterType.slice( 1 ) + 'FilterHandler' ]( that );

        super.render();
    }
    /**
     * Discards current filtering.
     */
    cancel() {
        const that = this;

        that._filterHandler[ that.mode + 'Cancel' ]();
        that.$.fireEvent( 'cancel' );
    }

    /**
     * Clears current filtering.
     */
    clear() {
        const that = this;

        that._filterHandler[ that.mode + 'Clear' ]();
        that.$.fireEvent( 'clear' );
    }

    reset() {
        const that = this;

        that.$.clearButton.removeAttribute( 'hover' );
        that.$.filterButton.removeAttribute( 'hover' );
        that.$.cancelButton.removeAttribute( 'hover' );

        that._filterHandler[ that.mode + 'Clear' ]();
        that._filterHandler.filterObject = new LW.Utilities.FilterGroup();
    }

    getFilter() {
        if ( this._filterHandler ) {
            const filter = new LW.Utilities.FilterGroup();

            for ( let filterProperty in this._filterHandler.filterObject ) {
                filter[ filterProperty ] = this._filterHandler.filterObject[ filterProperty ];
            }

            return filter;
        }

        return null;
    }

    /**
     * Evaluates a filter.
     */
    evaluate( value ) {
        try {
            return this._filterHandler.evaluate( value );
        }
        catch ( error ) {
            return false;
        }
    }

    /**
     * Applies current filtering.
     */
    filter() {
        const that = this;

        that._filterHandler[ that.mode + 'Filter' ]();
        that.$.fireEvent( 'filter' );
    }

    /**
     * Gets the current filter state.
     */
    getState() {
        return this._filterHandler.cachedFilter;
    }

    /**
     * Loads a previously saved filter state.
     *
     * @param {Object} state An object returned by the method getState.
     */
    loadState( state ) {
        try {
            const that = this;

            that._filterHandler.cachedFilter = state;
            that._filterHandler[ that.mode + 'Cancel' ]();
        }
        catch ( error ) {
            //
        }
    }

    /**
     * Called when a property is changed.
     */
    propertyChangedHandler( propertyName, oldValue, newValue ) {
        super.propertyChangedHandler( propertyName, oldValue, newValue );

        const that = this,
            filterHandler = that._filterHandler;

        function clearStoredObjects() {
            const objectNames = [ 'cachedFilter', 'caseSensitive', 'customExcelFilterObjects', 'customItems', 'dataSource', 'defaultListSelection', 'defaultListSource', 'displayMode', 'filterBuilder', 'filterBuilderObject', 'filterBuilderOperations', 'filterObject', 'firstInput', 'firstList', 'operationsMapping', 'operatorList', 'secondInput', 'secondList', 'timeOnly', 'tree' ];

            objectNames.forEach( function ( index ) {
                delete filterHandler[ objectNames[ index ] ];
            } );

            delete that._filterHandler;
        }

        function reRender() {
            that.$.mainContainer.innerHTML = '';
            clearStoredObjects();
            that._filterHandler = new LW.Utilities[ that.filterType.slice( 0, 1 ).toUpperCase() + that.filterType.slice( 1 ) + 'FilterHandler' ]( that );
        }

        switch ( propertyName ) {
            case 'animation':
            case 'disabled':
            case 'unfocusable':
                switch ( that.mode ) {
                    case 'default':
                        [ filterHandler.firstList, filterHandler.firstInput, filterHandler.logicalOperatorList, filterHandler.secondList, filterHandler.secondInput ].forEach( function ( element ) {
                            element[ propertyName ] = newValue;
                        } );
                        break;
                    case 'excel':
                        filterHandler.tree[ propertyName ] = newValue;
                        break;
                    case 'filterBuilder':
                        filterHandler.filterBuilder[ propertyName ] = newValue;

                        if ( filterHandler.caseSensitive ) {
                            filterHandler.caseSensitive[ propertyName ] = newValue;
                        }

                        break;
                }

                break;
            case 'buttons':
                that._setButtonsVisibility();
                break;
            case 'data':
            case 'dataField':
                if ( that.mode === 'excel' && !Array.isArray( that.dataSource ) ) {
                    reRender();
                }

                break;
            case 'dataSource':
                if ( that.mode === 'excel' ) {
                    reRender();
                }

                break;
            case 'filterType':
                that._filterType = newValue + 'Filter';
                reRender();
                break;
            case 'mode':
                reRender();
                break;
            case 'formatString':
                if ( that.filterType !== 'date' ) {
                    return;
                }

                switch ( that.mode ) {
                    case 'default':
                        filterHandler.firstInput.formatString = newValue;
                        filterHandler.secondInput.formatString = newValue;
                        break;
                    case 'excel':
                        reRender();
                        break;
                    case 'filterBuilder':
                        filterHandler.filterBuilder.formatStringDate = newValue;
                        filterHandler.filterBuilder.formatStringDateTime = newValue;
                        break;
                }

                break;
            case 'locale':
            case 'messages': {
                that._localize();

                switch ( that.mode ) {
                    case 'default': {
                        const firstListSelection = filterHandler.firstList.selectedIndexes,
                            operatorListSelection = filterHandler.logicalOperatorList.selectedIndexes,
                            secondListSelection = filterHandler.secondList.selectedIndexes,
                            inputs = [ filterHandler.firstInput, filterHandler.secondInput ];

                        filterHandler.setDefaults();
                        filterHandler.firstList.dataSource = filterHandler.defaultListSource;
                        filterHandler.logicalOperatorList.dataSource = [ { value: 0, label: that.localize( 'and' ) }, { value: 1, label: that.localize( 'or' ) } ];
                        filterHandler.secondList.dataSource = filterHandler.defaultListSource;

                        switch ( that.filterType ) {
                            case 'date':
                                inputs.forEach( function ( input ) {
                                    if ( !input.messages[ that.locale ] ) {
                                        input.messages[ that.locale ] = {};
                                    }

                                    input.messages[ that.locale ].dateTabLabel = that.localize( 'dateTabLabel' );
                                    input.messages[ that.locale ].timeTabLabel = that.localize( 'timeTabLabel' );

                                    if ( propertyName === 'locale' ) {
                                        input.locale = that.locale;
                                    }
                                    else {
                                        input.$.selectDate.innerHTML = input.messages[ that.locale ].dateTabLabel;
                                        input.$.selectTime.innerHTML = input.messages[ that.locale ].timeTabLabel;
                                    }

                                    if ( input._dropDownDisplayMode === 'timePicker' ) {
                                        input.placeholder = that.localize( 'placeholderTime' );
                                        input.placeholder = that.localize( 'placeholderTime' );
                                    }
                                    else {
                                        input.placeholder = that.localize( 'placeholderDate' );
                                        input.placeholder = that.localize( 'placeholderDate' );
                                    }
                                } );
                                break;
                            case 'numeric':
                                inputs[ 0 ].placeholder = that.localize( 'placeholderNumber' );
                                inputs[ 1 ].placeholder = that.localize( 'placeholderNumber' );
                                break;
                            case 'string':
                                inputs[ 0 ].placeholder = that.localize( 'placeholderValue' );
                                inputs[ 1 ].placeholder = that.localize( 'placeholderValue' );
                                break;
                            case 'boolean':
                                inputs[ 0 ].placeholder = that.localize( 'placeholderBoolean' );
                                inputs[ 1 ].placeholder = that.localize( 'placeholderBoolean' );
                                break;
                        }

                        filterHandler.firstList.selectedIndexes = firstListSelection;
                        filterHandler.logicalOperatorList.selectedIndexes = operatorListSelection;
                        filterHandler.secondList.selectedIndexes = secondListSelection;
                        break;
                    }
                    case 'excel':
                        filterHandler.tree.selectAll.label = that.localize( 'selectAll' );

                        if ( filterHandler.tree.blanks ) {
                            filterHandler.tree.blanks.label = that.localize( 'blanks' );
                        }
                        break;
                    case 'filterBuilder':
                        filterHandler.localizeFilterBuilder();

                        if ( propertyName === 'messages' ) {
                            filterHandler.filterBuilder._localizeInitialValues();
                            filterHandler.filterBuilder._refresh();
                        }

                        filterHandler.filterBuilder.$.scrollableContainer.refresh();
                        break;
                }

                break;
            }
        }
    }

    /**
     * Localizes element.
     */
    _localize() {
        const that = this;

        that.$.label.innerHTML = that.localize( 'showRows' );
        that.$.filterButton.innerHTML = that.localize( 'filter' );
        that.$.clearButton.innerHTML = that.localize( 'clear' );
        that.$.cancelButton.innerHTML = that.localize( 'cancel' );
    }

    /**
     * Sets buttons visibility.
     */
    _setButtonsVisibility() {
        const that = this,
            buttonsVisibility = that.buttons;

        [ 'cancel', 'clear', 'filter' ].forEach( function ( button ) {
            if ( buttonsVisibility.indexOf( button ) !== -1 ) {
                that[ '$' + button + 'Button' ].removeClass( 'lw-hidden' );
            }
            else {
                that[ '$' + button + 'Button' ].addClass( 'lw-hidden' );
            }
        } );
    }
} );
LW.Utilities.Assign( 'BaseFilterHandler', class BaseFilterHandler {
    constructor ( context ) {
        const that = this;

        that.context = context;
        that.filterObject = new LW.Utilities.FilterGroup();
        that.setDefaults();

        if ( context.filterType === 'date' ) {
            const sampleDateTime = new LW.Utilities.DateTime(),
                formatString = context.formatString,
                formatStringRegExp = sampleDateTime.getParseRegExp( sampleDateTime.calendar, formatString.replace( /y+/g, 'yyyyy' ) );

            that.displayMode = LW.Utilities.DateTime.detectDisplayMode( sampleDateTime, formatString, formatStringRegExp );
            that.timeOnly = that.displayMode === 'timePicker';
        }

        if ( context.mode === 'default' ) {
            that.createDefaultHTMLStructure();
            return;
        }

        that.operationsMapping = {
            '=': 'EQUAL',
            '<>': 'NOT_EQUAL',
            '<': 'LESS_THAN',
            '>': 'GREATER_THAN',
            '<=': 'LESS_THAN_OR_EQUAL',
            '>=': 'GREATER_THAN_OR_EQUAL',
            'isblank': 'EMPTY',
            'isnotblank': 'NOT_EMPTY',
            'contains': 'CONTAINS',
            'notcontains': 'DOES_NOT_CONTAIN',
            'startswith': 'STARTS_WITH',
            'endswith': 'ENDS_WITH',
            'NULL': 'NULL',
            'NOT_NULL': 'NOT_NULL'
        };

        if ( context.mode === 'excel' ) {
            that.createExcelHTMLStructure();
        }
        else if ( context.mode === 'filterBuilder' ) {
            that.createBuilderHTMLStructure();
        }
    }

    /**
     * Sets default source and selection.
     */
    setDefaults() {
        const that = this,
            context = that.context;

        that.defaultListSource = [
            { value: 'EQUAL', label: context.localize( 'equal' ) },
            { value: 'NOT_EQUAL', label: context.localize( 'notEqual' ) },
            { value: 'LESS_THAN', label: context.localize( 'lessThan' ) },
            { value: 'LESS_THAN_OR_EQUAL', label: context.localize( 'lessThanOrEqual' ) },
            { value: 'GREATER_THAN', label: context.localize( 'greaterThan' ) },
            { value: 'GREATER_THAN_OR_EQUAL', label: context.localize( 'greaterThanOrEqual' ) },
            { value: 'NULL', label: context.localize( 'null' ) },
            { value: 'NOT_NULL', label: context.localize( 'notNull' ) }
        ];
        that.filterBuilderOperations = [ '<', '=', '<>', '<=', '>', '>=', 'NULL', 'NOT_NULL' ];
        that.defaultListSelection = 2;
    }

    /**
     * Creates the filter panel's HTML structure in default mode.
     */
    createDefaultHTMLStructure() {
        const that = this,
            context = that.context,
            firstList = document.createElement( 'lw-drop-down-list' ),
            operatorList = document.createElement( 'lw-drop-down-list' ),
            secondList = document.createElement( 'lw-drop-down-list' ),
            fragment = document.createDocumentFragment();

        firstList.classList.add( 'lw-filter-panel-list' );
        firstList.dataSource = that.defaultListSource;
        firstList.selectedIndexes = [ that.defaultListSelection ];

        operatorList.classList.add( 'lw-filter-panel-operator-list' );
        operatorList.dataSource = [ { value: 0, label: context.localize( 'and' ) }, { value: 1, label: context.localize( 'or' ) } ];

        secondList.classList.add( 'lw-filter-panel-list' );
        secondList.dataSource = that.defaultListSource;
        secondList.selectedIndexes = [ that.defaultListSelection ];

        that.firstList = firstList;
        that.logicalOperatorList = operatorList;
        that.secondList = secondList;

        that.appendInputs();
        that.firstInput.classList.add( 'lw-filter-panel-input' );
        that.secondInput.classList.add( 'lw-filter-panel-input' );

        operatorList.dropDownHeight = 'auto';
        operatorList.selectedIndexes = [ 0 ];

        [ firstList, that.firstInput, operatorList, secondList, that.secondInput ].forEach( function ( element ) {
            element.animation = context.animation;
            element.disabled = context.disabled;
            element.unfocusable = context.unfocusable;
            element.dropDownPosition = 'bottom';
            element.dropDownAppendTo = 'body';
            element.dropDownMaxHeight = 200;
            element.rightToLeft = context.rightToLeft;
            fragment.appendChild( element );
        } );

        that.context.$.mainContainer.appendChild( fragment );
        that.cacheFilter( that.defaultListSelection, 0, that.defaultListSelection );
    }

    /**
     * Caches filter.
     */
    cacheFilter( firstFilterComparison, operator, secondFilterComparison ) {
        const that = this;

        that.cachedFilter = {
            firstFilterComparison: firstFilterComparison,
            firstFilterValue: that.firstInput.value,
            logicalOperator: operator,
            secondFilterComparison: secondFilterComparison,
            secondFilterValue: that.secondInput.value
        };
    }

    /**
     * Applies filter.
     */
    defaultFilter() {
        const that = this,
            context = that.context,
            firstFilterComparison = that.firstList.selectedValues[ 0 ],
            firstFilterValue = that.getFilterInputValue( that.firstInput ),
            operator = parseFloat( that.logicalOperatorList.selectedValues[ 0 ] ),
            secondFilterComparison = that.secondList.selectedValues[ 0 ],
            secondFilterValue = that.getFilterInputValue( that.secondInput ),
            filterObject = that.filterObject;

        filterObject.clear();

        if ( firstFilterValue !== '' || [ 'NULL', 'NOT_NULL', 'EMPTY', 'NOT_EMPTY' ].indexOf( firstFilterComparison ) !== -1 ) {
            const firstFilter = filterObject.createFilter( context._filterType, firstFilterValue, firstFilterComparison, undefined, context.formatString, context.locale, that.firstInput._dropDownDisplayMode === 'timePicker' );

            filterObject.addFilter( operator, firstFilter );
        }

        if ( secondFilterValue !== '' || [ 'NULL', 'NOT_NULL', 'EMPTY', 'NOT_EMPTY' ].indexOf( secondFilterComparison ) !== -1 ) {
            const secondFilter = filterObject.createFilter( context._filterType, secondFilterValue, secondFilterComparison, undefined, context.formatString, context.locale, that.secondInput._dropDownDisplayMode === 'timePicker' );

            filterObject.addFilter( operator, secondFilter );
        }

        that.cacheFilter( that.firstList.selectedIndexes[ 0 ], that.logicalOperatorList.selectedIndexes[ 0 ], that.secondList.selectedIndexes[ 0 ] );
    }

    /**
     * Parses filter input value.
     */
    getFilterInputValue( input ) {
        return input.value;
    }

    /**
     * Applies filter ('excel' mode).
     */
    excelFilter() {
        const that = this,
            context = that.context;

        if ( Array.isArray( context.dataSource ) ) {
            that.customExcelFilter();
            return;
        }

        const tree = that.tree,
            filterObject = that.filterObject;

        filterObject.clear();
        that.customItems = [];

        if ( tree._menuItems[ '0' ].selected ) {
            return;
        }

        const selectedIndexes = tree.selectedIndexes;

        selectedIndexes.forEach( function ( index ) {
            const item = tree._menuItems[ index ];

            if ( item instanceof LW.TreeItem ) {
                const value = item.value;

                if ( item.hasAttribute( 'default-item' ) ) {
                    const filterComparison = that.getExcelComparison( value ),
                        filter = filterObject.createFilter( context._filterType, value, filterComparison, undefined, context.formatString, context.locale, that.timeOnly );

                    filterObject.addFilter( 'or', filter );
                }
                else {
                    that.customItems.push( item );
                }
            }
        } );

        if ( selectedIndexes.length === 0 ) {
            const filterComparison = that.getExcelComparison( "Empty Filter" ),
                filter = filterObject.createFilter( context._filterType, "Empty Filter", filterComparison, undefined, context.formatString, context.locale, that.timeOnly );

            filterObject.addFilter( 'or', filter );

        }

        that.cachedFilter = selectedIndexes.slice( 0 );
    }

    /**
     * Applies filter ('excel' mode with custom data source).
     */
    customExcelFilter() {
        const that = this,
            tree = that.tree;

        delete that.customExcelFilterObjects;

        if ( tree._menuItems[ '0' ].selected ) {
            return;
        }

        const context = that.context,
            filterObjects = [],
            selectedIndexes = tree.selectedIndexes;

        selectedIndexes.forEach( function ( index ) {
            const item = tree._menuItems[ index ];

            if ( item instanceof LW.TreeItem ) {
                let value = item.value;


                if ( !Array.isArray( value ) ) {
                    return;
                }

                if ( !Array.isArray( value[ 0 ] ) ) {
                    value = [ value ];
                }

                const filterObject = new LW.Utilities.FilterGroup();

                for ( let i = 0; i < value.length; i++ ) {
                    const condition = value[ i ],
                        operation = that.operationsMapping[ condition[ 1 ] ],
                        filter = filterObject.createFilter( context._filterType, condition[ 2 ], operation, undefined, context.formatString, context.locale, that.timeOnly );

                    filterObject.addFilter( 'and', filter );
                }

                filterObjects.push( filterObject );
            }
        } );

        that.customExcelFilterObjects = filterObjects;
        that.cachedFilter = selectedIndexes.slice( 0 );
    }

    /**
     * Gets filter comparison ('excel' mode).
     */
    getExcelComparison( value ) {
        return value === '' ? 'NULL' : 'EQUAL';
    }

    /**
     * Applies filter ('filterBuilder' mode).
     */
    filterBuilderFilter() {
        const that = this,
            filterSettings = that.filterBuilder.value,
            caseSensitive = that.context.filterType === 'string' ? that.caseSensitive.checked : false,
            filterResult = { filters: [] };

        function recursion( currentContext, collection ) {
            const filterObject = new LW.Utilities.FilterGroup(),
                operator = currentContext[ 1 ];

            collection.logicalOperator = operator;

            for ( let i = 0; i < currentContext.length; i++ ) {
                if ( i === 1 ) {
                    continue;
                }

                const node = currentContext[ i ];

                if ( Array.isArray( node ) ) {
                    if ( Array.isArray( node[ 0 ] ) ) {
                        const subCollection = { filters: [] };

                        collection.filters.push( subCollection );
                        recursion( node, subCollection );
                    }
                    else {
                        filterObject.addFilter( operator, that.createFilterBuilderFilter( filterObject, node, caseSensitive ) );
                    }
                }
            }

            if ( filterObject.filters.length > 0 ) {
                collection.filters.push( filterObject );
            }
        }

        recursion( filterSettings, filterResult );
        that.filterBuilderObject = filterResult;
        that.cachedFilter = {
            filterBuilder: JSON.parse( JSON.stringify( that.filterBuilder.value ), function ( key, value ) {
                return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/.test( value ) ? new Date( value ) : value;
            } ),
            caseSensitive: caseSensitive
        };
    }

    /**
     * Calls the "createFilter" method with the correct arguments.
     */
    createFilterBuilderFilter( filterObject, node, caseSensitive ) {
        const that = this,
            context = that.context;
        let operation = that.operationsMapping[ node[ 1 ] ]

        if ( caseSensitive && [ 'CONTAINS', 'DOES_NOT_CONTAIN', 'STARTS_WITH', 'ENDS_WITH', 'EQUAL' ].indexOf( operation ) !== -1 ) {
            operation += '_CASE_SENSITIVE';
        }

        return filterObject.createFilter(
            context._filterType,
            node[ 2 ],
            operation,
            undefined,
            context.formatString,
            context.locale,
            false
        );
    }

    /**
     * Clears filter.
     */
    defaultClear() {
        const that = this;

        that.firstList.selectedIndexes = [ that.defaultListSelection ];
        that.firstInput.value = '';
        that.logicalOperatorList.selectedIndexes = [ 0 ];
        that.secondList.selectedIndexes = [ that.defaultListSelection ];
        that.secondInput.value = '';

        that.filterObject.clear();
        that.cacheFilter( that.defaultListSelection, 0, that.defaultListSelection );
    }

    /**
     * Clears filter ('excel' mode).
     */
    excelClear() {
        const that = this;

        if ( that.tree.offsetHeight !== 0 ) {
            that.tree.select( '0' );
        }
        that.filterObject.clear();
        that.cachedFilter = that.tree.selectedIndexes.slice( 0 );
    }

    /**
     * Clears filter ('filterBuilder' mode).
     */
    filterBuilderClear() {
        const that = this;

        that.filterBuilder.value = [ 'and' ];

        if ( that.context.filterType === 'string' ) {
            that.caseSensitive.checked = false;
        }

        that.cachedFilter = { filterBuilder: [ 'and' ], caseSensitive: false };
    }

    /**
     * Cancels current filter application.
     */
    defaultCancel() {
        const that = this;

        that.firstList.selectedIndexes = [ that.cachedFilter.firstFilterComparison ];
        that.firstInput.value = that.cachedFilter.firstFilterValue;
        that.logicalOperatorList.selectedIndexes = [ that.cachedFilter.logicalOperator ];
        that.secondList.selectedIndexes = [ that.cachedFilter.secondFilterComparison ];
        that.secondInput.value = that.cachedFilter.secondFilterValue;
    }

    /**
     * Cancels current filter application ('excel' mode).
     */
    excelCancel() {
        const that = this;

        that.tree.selectedIndexes = that.cachedFilter.slice( 0 );
    }

    /**
     * Cancels current filter application ('filterBuilder' mode).
     */
    filterBuilderCancel() {
        const that = this;

        that.filterBuilder.value = that.cachedFilter.filterBuilder;

        if ( that.context.filterType === 'string' ) {
            that.caseSensitive.checked = that.cachedFilter.caseSensitive;
        }
    }

    /**
     * Creates the filter panel's HTML structure in 'excel' mode.
     */
    createExcelHTMLStructure() {
        const that = this,
            context = that.context,
            tree = document.createElement( 'lw-tree' ),
            uniqueValuesDetails = { data: context.data, dataField: context.dataField, filterType: context._filterType };

        if ( !context.dataSource || !Array.isArray( context.dataSource ) ) {
            if ( !context.data || !context.dataField ) {
                context.error( context.localize( 'missingProperty' ) );
            }

            if ( context.filterType === 'date' ) {
                uniqueValuesDetails.formatString = context.formatString;
                uniqueValuesDetails.displayMode = that.displayMode;
                that.dataSource = that.filterObject.getUniqueValues( uniqueValuesDetails, context );

                try {
                    that.getHierarchicalDataSource( that.displayMode );
                }
                catch ( error ) {
                    context.error( context.localize( 'mismatchedProperties' ) );
                }

                if ( that.timeOnly ) {
                    tree.classList.add( 'standard-excel' );
                }
                else {
                    tree.classList.add( 'date-excel' );
                }
            }
            else {
                that.dataSource = that.filterObject.getUniqueValues( uniqueValuesDetails, context );
                tree.classList.add( 'standard-excel' );
            }

            if ( typeof context.dataSource === 'function' ) {
                that.dataSource = context.dataSource( that.dataSource ) || that.dataSource;
            }
        }
        else {
            that.processCustomDataSource( tree );
        }

        tree.animation = context.animation;
        tree.disabled = context.disabled;
        tree.unfocusable = context.unfocusable;
        tree.dataSource = [
            {
                label: context.localize( 'selectAll' ),
                value: '',
                items: that.dataSource,
                expanded: true,
                selected: true
            }
        ];
        tree.selectionMode = 'checkBox';
        tree.hasThreeStates = true;
        tree.toggleMode = 'arrow';
        tree.addEventListener( 'collapsing', function ( event ) {
            if ( event.detail.item.level === 1 ) {
                event.preventDefault();
            }
        } );
        tree._onCompleted = function () {
            that.cachedFilter = tree.selectedIndexes.slice( 0 );

            if ( tree.classList.contains( 'date-excel' ) ) {
                for ( let path in tree._menuItems ) {
                    if ( path === '0' ) {
                        continue;
                    }

                    const item = tree._menuItems[ path ];

                    item.firstElementChild.style.paddingLeft = ( ( item.level - 1 ) * 20 - 10 ) + 'px';
                }
            }
            else {
                tree._menuItems[ '0' ].firstElementChild.style.paddingLeft = 0;
            }

            tree.selectAll = tree._menuItems[ '0' ];
            tree.blanks = tree.querySelector( '[label="' + context.localize( 'blanks' ) + '"]' );
        }
        that.tree = tree;

        context.$.mainContainer.appendChild( tree );
    }

    /**
     * Processes custom data source in 'excel' mode.
     */
    processCustomDataSource( tree ) {
        const that = this,
            context = that.context,
            dataSource = context.dataSource;

        tree.classList.add( 'standard-excel' );
        that.dataSource = dataSource;
    }

    /**
     * Creates the filter panel's HTML structure in 'filterBuilder' mode.
     */
    createBuilderHTMLStructure() {
        const that = this,
            context = that.context,
            filterBuilder = document.createElement( 'lw-filter-builder' ),
            dataField = context.dataField,
            dataType = context.filterType === 'numeric' ? 'number' : context.filterType;

        that.filterBuilder = filterBuilder;
        filterBuilder.animation = context.animation;
        filterBuilder.disabled = context.disabled;
        filterBuilder.unfocusable = context.unfocusable;
        filterBuilder.value = [ 'and' ];
        filterBuilder.fields = [ { label: dataField, dataField: dataField, dataType: dataType, filterOperations: that.filterBuilderOperations } ];
        that.localizeFilterBuilder();
        context.$.mainContainer.appendChild( filterBuilder );

        if ( dataType === 'string' ) {
            const caseSensitive = document.createElement( 'lw-check-box' );

            caseSensitive.classList.add( 'case-sensitive' );
            caseSensitive.innerHTML = 'Case sensitive';
            caseSensitive.animation = context.animation;
            caseSensitive.disabled = context.disabled;
            caseSensitive.unfocusable = context.unfocusable;
            caseSensitive.checked = false;
            that.caseSensitive = caseSensitive;
            context.$.mainContainer.appendChild( caseSensitive );
        }
        that.filterBuilderObject = { filters: [] };
        that.cachedFilter = { filterBuilder: [ 'and' ], caseSensitive: false };
    }

    /**
     * Localizes filter builder.
     */
    localizeFilterBuilder() {
        const that = this,
            context = that.context,
            filterBuilder = that.filterBuilder;
        let defaultMessages = filterBuilder.messages[ context.locale ];

        if ( !defaultMessages ) {
            defaultMessages = {};
            filterBuilder.messages[ context.locale ] = defaultMessages;
        }

        filterBuilder.customOperations = [ {
            name: 'NULL',
            label: context.localize( 'null' ),
            hideValue: true
        },
        {
            name: 'NOT_NULL',
            label: context.localize( 'notNull' ),
            hideValue: true
        } ];
        defaultMessages[ 'addCondition' ] = context.localize( 'addCondition' );
        defaultMessages[ 'addGroup' ] = context.localize( 'addGroup' );
        defaultMessages[ '<' ] = context.localize( 'lessThan' );
        defaultMessages[ '<=' ] = context.localize( 'lessThanOrEqual' );
        defaultMessages[ '<>' ] = context.localize( 'notEqual' );
        defaultMessages[ '=' ] = context.localize( 'equal' );
        defaultMessages[ '>' ] = context.localize( 'greaterThan' );
        defaultMessages[ '>=' ] = context.localize( 'greaterThanOrEqual' );
        defaultMessages[ 'and' ] = context.localize( 'and' );
        defaultMessages[ 'contains' ] = context.localize( 'contains' );
        defaultMessages[ 'endswith' ] = context.localize( 'endsWith' );
        defaultMessages[ 'isblank' ] = context.localize( 'empty' );
        defaultMessages[ 'isnotblank' ] = context.localize( 'notEmpty' );
        defaultMessages[ 'notcontains' ] = context.localize( 'doesNotContain' );
        defaultMessages[ 'or' ] = context.localize( 'or' );
        defaultMessages[ 'startswith' ] = context.localize( 'startsWith' );
        defaultMessages[ 'dateTabLabel' ] = context.localize( 'dateTabLabel' );
        defaultMessages[ 'timeTabLabel' ] = context.localize( 'timeTabLabel' );

        filterBuilder.formatStringDate = context.formatString;
        filterBuilder.formatStringDateTime = context.formatString;
        filterBuilder.locale = context.locale;
        filterBuilder.valuePlaceholder = context.localize( 'filterBuilderPlaceholder' );
    }

    /**
     * Evaluates a filter.
     */
    evaluate( value ) {
        const that = this,
            context = that.context;

        if ( context.mode === 'default' ) {
            return that.filterObject.evaluate( value );
        }

        if ( context.mode === 'excel' ) {
            let result = false;

            if ( Array.isArray( context.dataSource ) ) {
                if ( !that.customExcelFilterObjects || that.customExcelFilterObjects.length === 0 ) {
                    return true;
                }

                for ( let i = 0; i < that.customExcelFilterObjects.length; i++ ) {
                    result = result || that.customExcelFilterObjects[ i ].evaluate( value );
                }

                return result;
            }

            if ( that.customItems && that.customItems.length > 0 ) {
                if ( that.filterObject.filters.length > 0 ) {
                    result = that.filterObject.evaluate( value );
                }

                if ( that.customItems && context.evaluateFilterExpression ) {
                    for ( let i = 0; i < that.customItems.length; i++ ) {
                        const customCalculation = context.evaluateFilterExpression( value, that.customItems[ i ].value );

                        if ( customCalculation !== undefined ) {
                            result = result || customCalculation;
                        }
                    }
                }
            }
            else {
                result = that.filterObject.evaluate( value );
            }

            return result;
        }

        function evaluateGroup( group ) {
            let result = group.logicalOperator === 'and' ? true : false;

            for ( let i = 0; i < group.filters.length; i++ ) {
                let currentResult;

                if ( group.filters[ i ] instanceof LW.Utilities.FilterGroup ) {
                    currentResult = group.filters[ i ].evaluate( value );
                }
                else {
                    currentResult = evaluateGroup( group.filters[ i ] );
                }

                result = group.logicalOperator === 'and' ? result && currentResult : result || currentResult;
            }

            return result;
        }

        if ( !that.filterBuilderObject.logicalOperator ) {
            return true;
        }

        return evaluateGroup( that.filterBuilderObject );
    }
} );

LW.Utilities.Assign( 'NumericFilterHandler', class NumericFilterHandler extends LW.Utilities.BaseFilterHandler {
    /**
     * Appends inputs specific to filter type.
     */
    appendInputs() {
        let that = this,
            firstInput = document.createElement( 'lw-numeric-text-box' ),
            secondInput = document.createElement( 'lw-numeric-text-box' );

        firstInput.placeholder = that.context.localize( 'placeholderNumber' );
        secondInput.placeholder = that.context.localize( 'placeholderNumber' );

        if ( !LW.NumericTextBox ) {
            firstInput = document.createElement( 'input' );
            secondInput = document.createElement( 'input' );

            firstInput.setAttribute( 'aria-label', firstInput.placeholder );
            firstInput.classList.add( 'lw-input' );
            secondInput.setAttribute( 'aria-label', secondInput.placeholder );
            secondInput.classList.add( 'lw-input' );

            that.firstInput = firstInput;
            that.secondInput = secondInput;
            return;
        }

        firstInput.inputFormat = 'floatingPoint';
        firstInput.nullable = true;
        firstInput.spinButtons = true;
        firstInput.value = null;
        secondInput.inputFormat = 'floatingPoint';
        secondInput.nullable = true;
        secondInput.spinButtons = true;
        secondInput.value = null;

        that.firstInput = firstInput;
        that.secondInput = secondInput;
    }

    /**
     * Parses filter input value.
     */
    getFilterInputValue( input ) {
        if ( input.value === null || input.value === '' ) {
            return '';
        }

        return parseFloat( input.value );
    }
} );

LW.Utilities.Assign( 'StringFilterHandler', class StringFilterHandler extends LW.Utilities.BaseFilterHandler {
    /**
     * Sets default source and selection.
     */
    setDefaults() {
        const that = this,
            context = that.context;

        that.defaultListSource = [
            { value: 'EMPTY', label: context.localize( 'empty' ) },
            { value: 'NOT_EMPTY', label: context.localize( 'notEmpty' ) },
            { value: 'CONTAINS', label: context.localize( 'contains' ) },
            { value: 'CONTAINS_CASE_SENSITIVE', label: context.localize( 'containsCaseSensitive' ) },
            { value: 'DOES_NOT_CONTAIN', label: context.localize( 'doesNotContain' ) },
            { value: 'DOES_NOT_CONTAIN_CASE_SENSITIVE', label: context.localize( 'doesNotContainCaseSensitive' ) },
            { value: 'STARTS_WITH', label: context.localize( 'startsWith' ) },
            { value: 'STARTS_WITH_CASE_SENSITIVE', label: context.localize( 'startsWithCaseSensitive' ) },
            { value: 'ENDS_WITH', label: context.localize( 'endsWith' ) },
            { value: 'ENDS_WITH_CASE_SENSITIVE', label: context.localize( 'endsWithCaseSensitive' ) },
            { value: 'EQUAL', label: context.localize( 'equal' ) },
            { value: 'EQUAL_CASE_SENSITIVE', label: context.localize( 'equalCaseSensitive' ) },
            { value: 'NULL', label: context.localize( 'null' ) },
            { value: 'NOT_NULL', label: context.localize( 'notNull' ) }
        ];
        that.filterBuilderOperations = [ 'contains', 'isblank', 'isnotblank', 'notcontains', 'startswith', 'endswith', '=', 'NULL', 'NOT_NULL' ];
        that.defaultListSelection = 2;
    }

    /**
     * Appends inputs specific to filter type.
     */
    appendInputs() {
        const that = this,
            firstInput = document.createElement( 'input' ),
            secondInput = document.createElement( 'input' );

        firstInput.placeholder = that.context.localize( 'placeholderValue' );
        firstInput.setAttribute( 'aria-label', firstInput.placeholder );
        secondInput.placeholder = that.context.localize( 'placeholderValue' );
        secondInput.setAttribute( 'aria-label', secondInput.placeholder );

        firstInput.classList.add( 'lw-input' );
        secondInput.classList.add( 'lw-input' );

        that.firstInput = firstInput;
        that.secondInput = secondInput;
    }

    /**
     * Gets filter comparison ('excel' mode).
     */
    getExcelComparison( value ) {
        return value === '' ? 'EMPTY' : 'EQUAL_CASE_SENSITIVE';
    }
} );

LW.Utilities.Assign( 'DateFilterHandler', class DateFilterHandler extends LW.Utilities.BaseFilterHandler {
    /**
     * Appends inputs specific to filter type.
     */
    appendInputs() {
        let that = this,
            context = that.context,
            firstInput = document.createElement( 'lw-date-time-picker' ),
            secondInput = document.createElement( 'lw-date-time-picker' );

        if ( !LW.DateTimePicker ) {
            firstInput = document.createElement( 'input' );
            secondInput = document.createElement( 'input' );

            firstInput.placeholder = context.localize( 'placeholderDate' );
            firstInput.setAttribute( 'aria-label', firstInput.placeholder );
            firstInput.classList.add( 'lw-input' );
            secondInput.placeholder = context.localize( 'placeholderDate' );
            secondInput.setAttribute( 'aria-label', secondInput.placeholder );
            secondInput.classList.add( 'lw-input' );

            that.firstInput = firstInput;
            that.secondInput = secondInput;
            return;
        }

        firstInput.calendarButton = true;
        firstInput.editMode = 'partial';
        firstInput.formatString = context.formatString;
        firstInput.dropDownDisplayMode = 'auto';
        firstInput.locale = context.locale;

        if ( !firstInput.messages[ context.locale ] ) {
            firstInput.messages[ context.locale ] = {};
        }

        firstInput.messages[ context.locale ].dateTabLabel = context.localize( 'dateTabLabel' );
        firstInput.messages[ context.locale ].timeTabLabel = context.localize( 'timeTabLabel' );
        firstInput.nullable = true;
        firstInput.value = null;

        secondInput.calendarButton = true;
        secondInput.editMode = 'partial';
        secondInput.formatString = context.formatString;
        secondInput.dropDownDisplayMode = 'auto';
        secondInput.locale = context.locale;

        if ( !secondInput.messages[ context.locale ] ) {
            secondInput.messages[ context.locale ] = {};
        }

        secondInput.messages[ context.locale ].dateTabLabel = context.localize( 'dateTabLabel' );
        secondInput.messages[ context.locale ].timeTabLabel = context.localize( 'timeTabLabel' );
        secondInput.nullable = true;
        secondInput.value = null;
        secondInput._onCompleted = function () {
            if ( secondInput._dropDownDisplayMode === 'timePicker' ) {
                firstInput.placeholder = context.localize( 'placeholderTime' );
                secondInput.placeholder = context.localize( 'placeholderTime' );
            }
            else {
                firstInput.placeholder = context.localize( 'placeholderDate' );
                secondInput.placeholder = context.localize( 'placeholderDate' );
            }
        };

        that.firstInput = firstInput;
        that.secondInput = secondInput;
    }

    /**
     * Parses filter input value.
     */
    getFilterInputValue( input ) {
        if ( input.value === null ) {
            return '';
        }

        if ( !LW.DateTimePicker ) {
            return new Date( input.value );
        }

        const result = input.value.toDate();

        if ( this.displayMode === 'calendar' ) {
            result.setHours( 0, 0, 0 );
        }

        return result;
    }

    /**
     * Clears filter.
     */
    defaultClear() {
        const that = this;

        that.firstList.selectedIndexes = [ that.defaultListSelection ];
        that.firstInput.value = null;
        that.logicalOperatorList.selectedIndexes = [ 0 ];
        that.secondList.selectedIndexes = [ that.defaultListSelection ];
        that.secondInput.value = null;

        that.filterObject.clear();
        that.cacheFilter( that.defaultListSelection, 0, that.defaultListSelection );
    }

    /**
     * Gets hierarchical data source ('excel' mode).
     */
    getHierarchicalDataSource( displayMode ) {
        const that = this,
            dataSource = that.dataSource,
            mapping = {},
            treeSource = [];
        let blanks;

        if ( displayMode === 'timePicker' ) {
            return;
        }

        if ( dataSource[ dataSource.length - 1 ].value === '' ) {
            blanks = dataSource[ dataSource.length - 1 ];
            dataSource.pop();
        }

        dataSource.forEach( function ( item ) {
            const date = item.value,
                year = date.getFullYear(),
                month = new Intl.DateTimeFormat( that.context.locale, { month: 'long' } ).format( date ),
                day = date.getDate();

            if ( !mapping[ year ] ) {
                mapping[ year ] = {};
            }

            if ( !mapping[ year ][ month ] ) {
                mapping[ year ][ month ] = {};
            }

            if ( !mapping[ year ][ month ][ day ] ) {
                if ( displayMode === 'calendar' ) {
                    mapping[ year ][ month ][ day ] = date;
                    return;
                }
                else {
                    mapping[ year ][ month ][ day ] = {};
                }
            }

            if ( displayMode === 'calendar' ) {
                return;
            }

            const hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();

            if ( !mapping[ year ][ month ][ day ][ hours ] ) {
                mapping[ year ][ month ][ day ][ hours ] = {};
            }

            if ( !mapping[ year ][ month ][ day ][ hours ][ minutes ] ) {
                mapping[ year ][ month ][ day ][ hours ][ minutes ] = {};
            }

            if ( !mapping[ year ][ month ][ day ][ hours ][ minutes ][ seconds ] ) {
                mapping[ year ][ month ][ day ][ hours ][ minutes ][ seconds ] = date;
            }
        } );

        for ( let year in mapping ) {
            const yearLevelItem = { label: year, items: [], customAttribute: 'default-item' };

            treeSource.push( yearLevelItem );

            for ( let month in mapping[ year ] ) {
                const monthLevelItem = { label: month, items: [], customAttribute: 'default-item' };

                yearLevelItem.items.push( monthLevelItem );

                for ( let day in mapping[ year ][ month ] ) {
                    const dayLeveItem = { label: day, customAttribute: 'default-item' };

                    monthLevelItem.items.push( dayLeveItem );

                    if ( displayMode === 'calendar' ) {
                        dayLeveItem.value = mapping[ year ][ month ][ day ];
                        continue;
                    }

                    dayLeveItem.items = [];

                    for ( let hours in mapping[ year ][ month ][ day ] ) {
                        const hoursLevelItem = { label: '0'.repeat( 2 - hours.length ) + hours, items: [], customAttribute: 'default-item' };

                        dayLeveItem.items.push( hoursLevelItem );

                        for ( let minutes in mapping[ year ][ month ][ day ][ hours ] ) {
                            const minutesLevelItem = { label: ':' + '0'.repeat( 2 - minutes.length ) + minutes, items: [], customAttribute: 'default-item' };

                            hoursLevelItem.items.push( minutesLevelItem );

                            for ( let seconds in mapping[ year ][ month ][ day ][ hours ][ minutes ] ) {
                                const secondsLevelItem = {
                                    label: ':' + '0'.repeat( 2 - seconds.length ) + seconds,
                                    value: mapping[ year ][ month ][ day ][ hours ][ minutes ][ seconds ],
                                    customAttribute: 'default-item'
                                };

                                minutesLevelItem.items.push( secondsLevelItem );
                            }
                        }
                    }
                }
            }
        }

        if ( blanks ) {
            treeSource.push( blanks );
        }

        that.dataSource = treeSource;
    }
} );

LW.Utilities.Assign( 'BooleanFilterHandler', class BooleanFilterHandler extends LW.Utilities.BaseFilterHandler {
    /**
     * Caches filter.
     */
    cacheFilter( firstFilterComparison, operator, secondFilterComparison ) {
        const that = this;

        that.cachedFilter = {
            firstFilterComparison: firstFilterComparison,
            firstFilterValue: that.firstInput.selectedIndexes.slice( 0 ),
            logicalOperator: operator,
            secondFilterComparison: secondFilterComparison,
            secondFilterValue: that.secondInput.selectedIndexes.slice( 0 )
        };
    }

    /**
     * Sets default source and selection.
     */
    setDefaults() {
        const that = this,
            context = that.context;

        that.defaultListSource = [
            { value: 'EQUAL', label: context.localize( 'equal' ) },
            { value: 'NOT_EQUAL', label: context.localize( 'notEqual' ) },
            { value: 'NULL', label: context.localize( 'null' ) },
            { value: 'NOT_NULL', label: context.localize( 'notNull' ) }
        ];
        that.filterBuilderOperations = [ '=', '<>', 'NULL', 'NOT_NULL' ];
        that.defaultListSelection = 0;
    }

    /**
     * Appends inputs specific to filter type.
     */
    appendInputs() {
        const that = this,
            firstInput = document.createElement( 'lw-drop-down-list' ),
            secondInput = document.createElement( 'lw-drop-down-list' );

        firstInput.dataSource = [ { value: true, label: 'true' }, { value: false, label: 'false' } ];
        firstInput.placeholder = that.context.localize( 'placeholderBoolean' );
        firstInput.selectedIndexes = [];
        firstInput.selectionMode = 'zeroOrOne';
        secondInput.dataSource = [ { value: true, label: 'true' }, { value: false, label: 'false' } ];
        secondInput.placeholder = that.context.localize( 'placeholderBoolean' );
        secondInput.selectedIndexes = [];
        secondInput.selectionMode = 'zeroOrOne';

        that.firstInput = firstInput;
        that.secondInput = secondInput;
    }

    /**
     * Parses filter input value.
     */
    getFilterInputValue( input ) {
        if ( input.selectedValues.length === 0 ) {
            return '';
        }

        return input.selectedValues[ 0 ] === 'true';
    }

    /**
     * Clears filter.
     */
    defaultClear() {
        const that = this;

        that.firstList.selectedIndexes = [ that.defaultListSelection ];
        that.firstInput.selectedIndexes = [];
        that.logicalOperatorList.selectedIndexes = [ 0 ];
        that.secondList.selectedIndexes = [ that.defaultListSelection ];
        that.secondInput.selectedIndexes = [];

        that.filterObject.clear();
        that.cacheFilter( that.defaultListSelection, 0, that.defaultListSelection );
    }

    /**
     * Cancels current filter application.
     */
    defaultCancel() {
        const that = this;

        that.firstList.selectedIndexes = [ that.cachedFilter.firstFilterComparison ];
        that.firstInput.selectedIndexes = that.cachedFilter.firstFilterValue;
        that.logicalOperatorList.selectedIndexes = [ that.cachedFilter.logicalOperator ];
        that.secondList.selectedIndexes = [ that.cachedFilter.secondFilterComparison ];
        that.secondInput.selectedIndexes = that.cachedFilter.secondFilterValue;
    }
} );
