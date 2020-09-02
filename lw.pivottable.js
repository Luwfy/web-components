
/**
 * PivotTable custom element.
 */
LW('lw-pivot-table', class PivotTable extends LW.Table {
    /** 
     * PivotTable's properties 
     */
    static get properties() {
        return {
/*             'columns': { // inherited
                value: null,
                type: 'any?',
                reflectToAttribute: false
            },
 */            'columnReorder': {
                value: false,
                type: 'boolean'
            },
            /*             'dataSource': { // inherited
                            value: null,
                            type: 'any?',
                            reflectToAttribute: false
                        },
                        'filtering': { // inherited
                            value: false,
                            type: 'boolean'
                        },
                        'freezeHeader': { // inherited
                            value: false,
                            type: 'boolean'
                        },
                        'keyboardNavigation': { // inherited
                            value: false,
                            type: 'boolean'
                        },
             */
            'messages': {
                value: {
                    'en': {
                        'groupHeader': 'Group',
                        'summaryRequired': 'lwPivotTable: At least one column with "summary" is required.'
                    }
                },
                type: 'object',
                extend: true
            },
/*             'onCellRender': { // inherited
                value: null,
                type: 'function?'
            },
            'onColumnRender': { // inherited
                value: null,
                type: 'function?'
            },
            'onInit': { // inherited
                value: null,
                type: 'function?'
            },
            'selection': { // inherited
                value: false,
                type: 'boolean'
            },
            'sortMode': { // inherited
                value: 'none',
                type: 'string',
                allowedValues: ['none', 'one', 'many']
            }
 */        }
    }

    /**
     * PivotTable's event listeners.
     */
    static get listeners() {
        return {
            'resize': '_overriddenTableHandler',
            'filterInput.keyup': '_overriddenTableHandler',
            'pager.change': '_overriddenTableHandler',
            'pager.pageSizeChanged': '_overriddenTableHandler',
            'tableContainer.change': '_overriddenTableHandler',
            'tableContainer.keyup': '_overriddenTableHandler',
            'document.down': '_overriddenTableHandler',
            'document.move': '_overriddenTableHandler',
            'document.up': '_overriddenTableHandler'
        };
    }

    template() {
        return `<div id="container" class="lw-container" role="presentation">
                    <table id="tableContainer" class="lw-table-container"></table>
                </div>`;
    }

    /**
     * Clears applied filters.
     */
    clearFilters() {
        const that = this;

        if (!that._filterInfo.appliedFilters) {
            return;
        }

        delete that._filterInfo.appliedFilters;
        that.dataSource.clearFilter();

        that.refresh(true);
        that.$.fireEvent('filter', { action: 'remove' });
    }

    /**
     * Returns the current dynamic pivot columns.
     */
    getDynamicColumns() {
        return this._dynamicColumns;
    }

    /**
     * Sorts by a summary or group column.
     *
     * @param {object} columnDefinition The dynamic column's definition.
     * @param {string} sortOrder Optional The sort order. Possible values: 'asc', 'desc', null.
     */
    sortBy(columnDefinition, sortOrder) {
        const that = this;
        let columnDataField;

        if (columnDefinition) {
            if (that._dynamicColumns.indexOf(columnDefinition) === -1 ||
                that._rowGroupColumns.length === 0) {
                return
            }

            const originalColumn = columnDefinition.dataFields[columnDefinition.dataFields.length - 1].originalColumn;

            if (originalColumn.allowSort === false) {
                return;
            }

            columnDataField = columnDefinition.id;
        }

        that._sortBy({
            column: columnDefinition,
            columnDataField: columnDataField,
            sortOrder: sortOrder,
            dataFields: that._dynamicDataFields,
            columnByDataField: '_getDynamicColumnById'
        });
    }

    /**
     * Called when a property is changed.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        function clearFilterSort() {
            delete that._filterInfo.appliedFilters;
            that._sortColumns = [];
        }

        switch (propertyName) {
            case 'columns':
                clearFilterSort();
                that._initColumns();
                that.refresh(true);
                break;
            case 'dataSource':
                clearFilterSort();
                that._validateDataSource();
                that.refresh(true);
                break;
            case 'filtering':
                if (!newValue) {
                    that.clearFilters();
                }

                break;
            case 'locale':
            case 'messages':
                that._localize();

                if (that._rowGroupColumns) {
                    const groupingHeaders = that.$.tableContainer.querySelectorAll('.lw-pivot-table-grouping-header');

                    groupingHeaders[groupingHeaders.length - 1].innerHTML = that.localize('groupHeader');
                }

                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
        }
    }

    /**
     * Renders the element. Calls only element-specific functionality.
     */
    _createElement() {
        const that = this;

        that._filterInfo = {};
        that.$.header = { offsetHeight: 0 };
        that.$.pager = { offsetHeight: 0 };

        that._validateDataSource();
        that._initColumns();
        that.refresh(true);
    }

    /**
     * Validates the data source.
     */
    _validateDataSource() {
        const that = this;

        if (that.dataSource instanceof LW.DataAdapter === false) {
            if (Array.isArray(that.dataSource)) {
                that.dataSource = new LW.DataAdapter({ dataSource: that.dataSource });
            }
            else {
                that.dataSource = new LW.DataAdapter({ dataSource: [] });
            }
        }
    }

    /**
     * Processes information about pivot columns.
     */
    _processPivotColumns() {
        const that = this,
            dataSource = that.dataSource,
            pivotColumns = [],
            rowGroupColumns = [],
            aggregateColumns = [],
            groupByPrimary = [],
            groupBySecondary = [];

        for (let i = 0; i < that._columns.length; i++) {
            const column = that._columns[i];

            if (column.pivot && column.allowPivot) {
                pivotColumns.push(column);
                groupByPrimary.push(column.dataField);
            }

            if (column.rowGroup && column.allowRowGroup) {
                rowGroupColumns.push(column);
                groupBySecondary.push(column.dataField);
            }

            if (column.summary) {
                aggregateColumns.push(column);
            }
        }

        if (aggregateColumns.length === 0) {
            that.error(that.localize('summaryRequired'));
        }

        dataSource.groupBy = groupByPrimary;
        dataSource.refreshHierarchy();
        that._primaryHierarchy = dataSource.boundHierarchy;
        that._groupByPrimary = groupByPrimary;
        that._groupBySecondary = groupBySecondary;
        that._pivotColumns = pivotColumns;
        that._rowGroupColumns = rowGroupColumns;
        that._aggregateColumns = aggregateColumns;
    }

    /**
     * Refreshes the Pivot Table.
     */
    refresh(refreshSource) {
        const that = this,
            isRendered = that.isRendered;

        that.columns.canNotify = false;

        if (isRendered) {
            that.$.tableContainer.innerHTML = '';
        }

        that._processPivotColumns();
        that._createHeader();

        if (refreshSource) {
            that._createAggregatesSource();
        }

        that._createDataRows(true);

        const sortColumns = that._sortColumns;

        if (isRendered && refreshSource && sortColumns) {
            delete that._sortColumns;
            sortColumns.forEach(sortColumn => {
                const columnDefinition = that._getDynamicColumnById[sortColumn.dataField];

                if (columnDefinition) {
                    that.sortBy(columnDefinition, sortColumn.direction);
                }
            });
        }

        that.columns.canNotify = true;
    }

    /**
     * Creates column headers based on pivot and summary columns.
     */
    _createHeader() {
        const that = this,
            selection = that.selection,
            onColumnRender = that.onColumnRender,
            thead = document.createElement('thead'),
            fragment = document.createDocumentFragment(),
            dataStructure = [],
            cellWidth = parseFloat(getComputedStyle(that.$.container).getPropertyValue('--lw-pivot-table-cell-width')),
            secondaryGrouping = that._rowGroupColumns.length > 0;

        function reachLastLevel(level, code) {
            const aggregateColumns = that._aggregateColumns;

            if (dataStructure[level] === undefined) {
                dataStructure[level] = [];
            }

            aggregateColumns.forEach(column => {
                dataStructure[level].push(`${code}Ω${column.summary}(${column.label})`);
            });

            return aggregateColumns.length;
        }

        function drillDown(collection, level, code) {
            if (dataStructure[level] === undefined) {
                dataStructure[level] = [];
            }

            let totalDescendants = 0;

            for (let i = 0; i < collection.length; i++) {
                const item = collection[i],
                    currentCode = code + '.' + i;
                let numberOfDescendants = 0;

                if (that._filterInfo.appliedFilters && !that._areChildrenFiltered(undefined, item.children)) {
                    continue;
                }

                if (item.children && item.children.length > 0 && item.children[0].leaf !== true) {
                    numberOfDescendants += drillDown(item.children, level + 1, currentCode);
                }
                else {
                    numberOfDescendants += reachLastLevel(level + 1, currentCode);
                }

                dataStructure[level].push(...Array(numberOfDescendants).fill(currentCode + 'Ω' + item.label));
                totalDescendants += numberOfDescendants;
            }

            return totalDescendants;
        }

        if (that._pivotColumns.length > 0) {
            drillDown(that._primaryHierarchy, 0, '');
        }
        else {
            reachLastLevel(0, '');
        }

        const numberOfCells = dataStructure[dataStructure.length - 1].length;

        that._createDynamicColumnDefinitions(dataStructure, numberOfCells);

        // create header cells
        for (let i = 0; i < dataStructure.length; i++) {
            const row = document.createElement('tr'),
                collection = dataStructure[i];

            if (selection) {
                if (i === dataStructure.length - 1) {
                    row.innerHTML = '<th class="lw-pivot-table-selection-header lw-table-select-all freeze-near"><div></div></th>';
                }
                else {
                    const th = document.createElement('th');

                    if (i === 0) {
                        th.style.width = getComputedStyle(that.$.container).getPropertyValue('--lw-table-row-height');
                    }

                    th.classList.add('lw-pivot-table-selection-header', 'freeze-near');
                    row.appendChild(th);
                }
            }

            if (secondaryGrouping) {
                const secondaryGroupingHeader = document.createElement('th');

                secondaryGroupingHeader.classList.add('lw-pivot-table-grouping-header');

                if (i === dataStructure.length - 1) {
                    let text = that.localize('groupHeader'),
                        columnDefinition = that._dynamicColumns[0];

                    if (onColumnRender) {
                        const settings = { text: text, cell: secondaryGroupingHeader, column: columnDefinition.dataFields[0], fullDefinition: columnDefinition };

                        that.onColumnRender(settings);
                        text = settings.text;
                    }

                    secondaryGroupingHeader.innerHTML = text;
                    that._addSortingCapability(secondaryGroupingHeader, columnDefinition);
                }

                row.appendChild(secondaryGroupingHeader);
            }

            const colSpanInfo = {};

            for (let j = 0; j < numberOfCells; j++) {
                let currentCollection = collection[j],
                    text = currentCollection.label,
                    columnDefinition = currentCollection.columnDefinition;

                if (text === undefined) {
                    break;
                }

                const th = document.createElement('th');

                if (j === 0 || collection[j - 1].label !== text) {
                    if (colSpanInfo.cell) {
                        if (colSpanInfo.span > 1) {
                            colSpanInfo.cell.colSpan = colSpanInfo.span;
                        }

                        if (i === 0) {
                            colSpanInfo.cell.style.width = cellWidth * colSpanInfo.span + 'px';
                        }
                    }

                    colSpanInfo.cell = th;
                    colSpanInfo.span = 1;
                }
                else {
                    colSpanInfo.span++;

                    if (j === numberOfCells - 1) {
                        colSpanInfo.cell.colSpan = colSpanInfo.span;

                        if (i === 0) {
                            colSpanInfo.cell.style.width = cellWidth * colSpanInfo.span + 'px';
                        }
                    }

                    continue;
                }

                text = text.replace(/^.*Ω/, '');

                if (onColumnRender) {
                    const settings = { text: text, cell: th, column: currentCollection.info, fullDefinition: columnDefinition };

                    that.onColumnRender(settings);
                    text = settings.text;
                }

                if (i === dataStructure.length - 1) {
                    that._addSortingCapability(th, columnDefinition);
                }

                th.innerHTML = text;
                row.appendChild(th);
            }

            fragment.appendChild(row);
        }

        thead.appendChild(fragment);
        that.$.tableContainer.appendChild(thead);
    }

    /**
     * Creates dynamic column definitions.
     */
    _createDynamicColumnDefinitions(dataStructure, numberOfCells) {
        const that = this,
            dynamicColumns = [],
            dynamicDataFields = [],
            getDynamicColumnById = {};

        for (let i = 0; i < numberOfCells; i++) {
            const columnDefinition = { dataFields: [] },
                columnKey = [];

            for (let j = 0; j < dataStructure.length - 1; j++) {
                const originalLabel = dataStructure[j][i],
                    label = dataStructure[j][i].replace(/^.*Ω/, ''),
                    originalColumn = that._pivotColumns[j],
                    info = {
                        originalColumn: originalColumn,
                        label: label,
                        dataField: originalColumn.dataField
                    };

                columnDefinition.dataFields.push(info);
                columnKey.push(label);

                dataStructure[j][i] = { label: originalLabel, columnDefinition: columnDefinition, info: info };
            }

            // summary data field
            const aggregateColumn = that._aggregateColumns[i % that._aggregateColumns.length],
                aggregateLabel = dataStructure[dataStructure.length - 1][i],
                info = {
                    originalColumn: aggregateColumn,
                    label: aggregateLabel,
                    dataField: aggregateColumn.dataField,
                    summary: aggregateColumn.summary
                };

            columnDefinition.dataFields.push(info);
            columnKey.push(aggregateColumn.dataField);

            dataStructure[dataStructure.length - 1][i] = { label: aggregateLabel, columnDefinition: columnDefinition, info: info };

            columnDefinition.id = columnKey.join(',').replace(/[ ,]/g, '_');
            dynamicColumns.push(columnDefinition);
            getDynamicColumnById[columnDefinition.id] = columnDefinition;
            dynamicDataFields.push({ name: columnDefinition.id, dataType: aggregateColumn.dataType });
        }

        if (that._rowGroupColumns.length > 0) {
            const label = that.localize('groupHeader'),
                groupDynamicColumn = {
                    dataFields: that._rowGroupColumns.map(col => {
                        return { originalColumn: col, label: label };
                    }), id: 'group', label: label, group: true
                };
            let dataType;

            dynamicColumns.unshift(groupDynamicColumn);
            getDynamicColumnById['group'] = groupDynamicColumn;

            for (let i = 0; i < groupDynamicColumn.dataFields.length; i++) {
                dataType = groupDynamicColumn.dataFields[i].originalColumn.dataType

                if (dataType === 'string') {
                    break;
                }
            }

            dynamicDataFields.push({ name: 'group', dataType: dataType });
        }

        that._dynamicColumns = dynamicColumns;
        that._getDynamicColumnById = getDynamicColumnById;
        that._dynamicDataFields = dynamicDataFields;

        that.$.tableContainer.removeAttribute('aria-colcount');
    }

    /**
     * Creates a new source from the aggregated values to display in data rows.
     */
    _createAggregatesSource() {
        const that = this,
            dataSource = that.dataSource,
            aggregateColumns = that._aggregateColumns,
            aggregatesSource = [],
            summaryDetails = [],
            rowNoGrouping = { id: Math.random().toString(36).substr(2, 7) };

        for (let i = 0; i < aggregateColumns.length; i++) {
            const aggregateColumn = aggregateColumns[i],
                detail = {};

            detail[aggregateColumn.dataField] = [aggregateColumn.summary];
            summaryDetails.push(detail);
        }

        function processNoRowGroups(collection, columnKey) {
            if (that._pivotColumns.length === 0) {
                const summary = dataSource.summarize(summaryDetails);

                for (let j = 0; j < aggregateColumns.length; j++) {
                    const aggregateColumn = aggregateColumns[j];

                    rowNoGrouping[aggregateColumn.dataField] = summary[aggregateColumn.dataField][aggregateColumn.summary];
                }

                return;
            }

            for (let i = 0; i < collection.length; i++) {
                const item = collection[i];

                if (item.children && item.children.length > 0) {
                    if (item.children[0].leaf !== true) {
                        processNoRowGroups(item.children, columnKey.concat([item.label]));
                    }
                    else {
                        const summary = dataSource.summarize(summaryDetails, item.children);

                        for (let j = 0; j < aggregateColumns.length; j++) {
                            const aggregateColumn = aggregateColumns[j];

                            rowNoGrouping[columnKey.concat([item.label, aggregateColumn.dataField]).join(',').replace(/[ ,]/g, '_')] =
                                summary[aggregateColumn.dataField][aggregateColumn.summary];
                        }
                    }
                }
            }
        }

        function primaryRecursion(collection, item, row, key) {
            for (let i = 0; i < collection.length; i++) {
                const child = collection[i];

                if (child.children && child.children.length > 0 && child.children[0].leaf !== true) {
                    primaryRecursion(child.children, item, row, key.concat([child.label]));
                }
                else {
                    const columnKey = key.concat([child.label]).filter(keyPart => keyPart !== undefined),
                        summary = dataSource.summarize(summaryDetails, item.children);

                    that._aggregateColumns.forEach(column => {
                        const dataField = column.dataField;

                        row[columnKey.concat([dataField]).join(',').replace(/[ ,]/g, '_')] = summary[dataField][column.summary];
                    });
                }
            }
        }

        function processWithRowGroups(level, parent, parentIndex) {
            let collection = that._getSecondaryHierarchy(level);

            if (parent) {
                for (let i = 0; i < parentIndex.length; i++) {
                    collection = collection[parentIndex[i]].children;
                }
            }

            collection.forEach((item, index) => {
                let filteredChildren = item.children.length;

                if (that._filterInfo.appliedFilters) {
                    filteredChildren = that._areChildrenFiltered(undefined, item.children);

                    if (item.data.$.filtered === false && !filteredChildren) {
                        return;
                    }
                }

                const row = {},
                    tempSource = new window.LW.DataAdapter({ dataSource: item.children, dataFields: dataSource.dataFields, groupBy: that._groupByPrimary });

                if (parent) {
                    row.parentid = parent.id;
                }

                row.id = Math.random().toString(36).substr(2, 7);
                row.level = level;
                row[that._dynamicColumns[0].id] = `${item.label} (${filteredChildren})`;

                primaryRecursion(tempSource.boundHierarchy || tempSource, item, row, []);
                aggregatesSource.push(row);

                if (level < that._groupBySecondary.length - 1) {
                    processWithRowGroups(level + 1, row, parentIndex.concat([index]));
                }
            });
        }

        if (that._rowGroupColumns.length === 0) {
            processNoRowGroups(that._primaryHierarchy, []);
            aggregatesSource.push(rowNoGrouping);
        }
        else {
            processWithRowGroups(0, undefined, []);
        }

        that.rows = new LW.DataAdapter(
            {
                dataSource: aggregatesSource,
                id: 'id',
                keyDataField: 'id',
                parentDataField: 'parentid',
                dataFields: that._dynamicDataFields
            });

        if (!that.isRendered && that.onInit) {
            that.onInit();
        }
    }

    /**
     * Gets secondary hierarchy based on level.
     */
    _getSecondaryHierarchy(level) {
        const that = this,
            dataSource = that.dataSource;

        dataSource.groupBy = that._groupBySecondary.slice(0, level + 1);
        dataSource.refreshHierarchy();

        return dataSource.boundHierarchy;
    }

    /**
     * Creates data rows.
     */
    _createDataRows(initialization) {
        const that = this,
            selection = that.selection,
            dynamicColumns = that._dynamicColumns,
            records = that.rows.boundHierarchy,
            fragment = document.createDocumentFragment();
        let tbody;

        function createRowElements(siblingRecords) {
            for (let i = 0; i < siblingRecords.length; i++) {
                const tr = document.createElement('tr'),
                    record = siblingRecords[i],
                    levelOfIndentation = record.level;

                record.tr = tr;
                tr.data = record;

                if (selection) {
                    const selectionTd = document.createElement('td'),
                        selected = that._selectedIds.indexOf(record.$.id) !== -1;

                    selectionTd.className = `lw-table-select-row freeze-near${selected ? ' selected' : ''}`;
                    selectionTd.innerHTML = '<div></div>';
                    tr.appendChild(selectionTd);
                    tr.setAttribute('aria-selected', selected);
                }

                for (let j = 0; j < dynamicColumns.length; j++) {
                    const cell = document.createElement('td'),
                        dynamicColumn = dynamicColumns[j],
                        originalValue = record[dynamicColumn.id];
                    let value = originalValue || '',
                        column, dataFieldAttribute;

                    if (j === 0 && dynamicColumn.group) {
                        // group cell
                        const leaf = record.leaf;

                        column = dynamicColumn.dataFields[levelOfIndentation].originalColumn;
                        dataFieldAttribute = 'group';
                        value = that._formatCellValue(record, column, cell, value);

                        if (!leaf) {
                            cell.classList.add('tree-cell');
                            value = `<div>
                                        <div class="hierarchy-arrow lw-arrow lw-arrow-down"></div>
                                        <div>${value}</div>
                                    </div>`;
                        }

                        if (levelOfIndentation > 0) {
                            cell.classList.add('outline-level-' + levelOfIndentation);

                            if (leaf) {
                                cell.classList.add('tree-leaf');
                            }
                        }
                    }
                    else {
                        column = dynamicColumn.dataFields[dynamicColumn.dataFields.length - 1].originalColumn;
                        dataFieldAttribute = column.dataField + j;
                        value = that._formatCellValue(record, column, cell, value);
                    }

                    if (that.onCellRender) {
                        that.onCellRender(record, dynamicColumn, originalValue, cell);
                    }

                    cell.setAttribute('data-field', dataFieldAttribute);
                    cell.innerHTML = value;
                    tr.appendChild(cell);
                }

                if (record.expanded) {
                    tr.setAttribute('aria-expanded', true);
                    tr.classList.add('expanded');
                }

                if (levelOfIndentation > 0 && that._isCollapsed(record)) {
                    tr.setAttribute('aria-hidden', true);
                    tr.classList.add('collapsed');
                }

                tr.setAttribute('row-id', record.$.id);
                fragment.appendChild(tr);

                if (record.children) {
                    createRowElements(record.children);
                }
            }
        }

        if (records) {
            createRowElements(records);
        }

        fragment.appendChild(that._createLastRow());

        if (initialization) {
            tbody = document.createElement('tbody');
            that.$.tableContainer.appendChild(tbody);
        }
        else {
            tbody = that.$.tableContainer.querySelector('tbody');
            tbody.innerHTML = '';
        }

        tbody.appendChild(fragment);
    }

    /**
     * An empty handler used to override unnecessarily inherited Table handlers.
     */
    _overriddenTableHandler() { }

    /**
     * Expand/collapse arrow click handler.
     */
    _hierarchyArrowClickHandler(row) {
        const that = this,
            animation = that.animation !== 'none',
            groupData = row.data;
        let expanded = groupData.expanded,
            children = groupData.children;

        function expandChildren(siblings) {
            siblings.forEach(child => {
                const childRow = child.tr,
                    childChildren = child.children;

                if (childRow) {
                    if (animation) {
                        childRow.classList.add('no-height');

                        childRow.ontransitionend = function () {
                            childRow.classList.remove('no-height');
                            childRow.ontransitionend = null;
                        }
                    }

                    childRow.removeAttribute('aria-hidden');
                    childRow.classList.remove('collapsed');
                }

                if (childChildren && child.expanded) {
                    expandChildren(childChildren);
                }
            });
        }

        function collapseChildren(siblings) {
            siblings.forEach(child => {
                const childRow = child.tr,
                    childChildren = child.children;

                if (childRow) {
                    childRow.setAttribute('aria-hidden', true);
                    childRow.classList.add('collapsed');
                }

                if (childChildren) {
                    collapseChildren(childChildren);
                }
            });
        }

        if (expanded) {
            collapseChildren(children);
        }
        else {
            expandChildren(children);
        }

        expanded = !expanded;

        groupData.expanded = expanded;
        row.setAttribute('aria-expanded', expanded);
        row.classList.toggle('expanded', expanded);
    }

    /**
     * Adds sorting capability to lowest-level header cells.
     */
    _addSortingCapability(cell, columnDefinition) {
        const that = this;

        if (that._rowGroupColumns.length === 0) {
            return;
        }

        cell.columnDefinition = columnDefinition;
        columnDefinition.headerCellElement = cell;

        cell.onclick = function () {
            const originalColumn = columnDefinition.dataFields[columnDefinition.dataFields.length - 1].originalColumn;

            that.$.fireEvent('columnClick', { columnDefinition: columnDefinition, dataField: originalColumn.dataField });

            if (that.sortMode === 'none' || originalColumn.allowSort === false) {
                return;
            }

            that._addSortIconContainer(columnDefinition);

            if (cell.sortIconContainerElement.classList.contains('asc')) {
                that.sortBy(columnDefinition, 'desc');
            }
            else if (cell.sortIconContainerElement.classList.contains('desc')) {
                that.sortBy(columnDefinition, null);
            }
            else {
                that.sortBy(columnDefinition, 'asc');
            }
        };
    }

    /**
     * Applies sorting; refreshes the view
     */
    _sortCallback(sortDataFields, sortOrders, sortDataTypes) {
        const that = this,
            rows = that.rows;

        rows._sort(rows.boundSource, sortDataFields, sortOrders, sortDataTypes);
        rows.refreshHierarchy();

        // refreshes the view
        that._createDataRows();
    }

    /**
     * "Select all" checkbox click handler.
     */
    _selectAllCheckboxClickHandler(checkbox) {
        super._selectAllCheckboxClickHandler(checkbox, this.rows);
    }

    /**
     * Updates the state of the "Select all" checkbox.
     */
    _updateSelectAllState() {
        super._updateSelectAllState(this.rows.length);
    }

    /**
     * Refreshes applied filters.
     */
    _refreshFilters() {
        const that = this,
            filters = [];

        for (let columnDataField in that._filterInfo.appliedFilters) {
            let filterGroup = that._filterInfo.appliedFilters[columnDataField];

            filters.push([columnDataField, filterGroup]);
        }

        if (filters.length === 0) {
            that.clearFilters();
            return;
        }

        that.dataSource._filter(filters, 'or');

        that.refresh(true);
        that.$.fireEvent('filter', { action: 'add', filters: filters });
    }

    /**
     * Returns whether at least one child is not filtered out.
     */
    _areChildrenFiltered(data, children) {
        if (arguments.length === 1) {
            children = data.children;
        }

        if (!children || children.length === 0) {
            return;
        }

        let number = 0;

        for (let i = 0; i < children.length; i++) {
            if (children[i].$.filtered !== false) {
                number++;
            }
        }

        return number;
    }

    /**
     * Localizes labels displayed in the Pivot Table.
     */
    _localize() {

    }

    /**
     * Pivot Table-specific column notify functionality.
     */
    _columnNotify(changes) {
        const that = this,
            propertyName = changes.propertyName,
            column = changes.target;

        // TO DO: handle when tool panel is enabled

        switch (propertyName) {
            case 'allowPivot':
                if (column.pivot !== true) {
                    return;
                }

                break;
            case 'allowRowGroup':
                if (column.rowGroup !== true) {
                    return;
                }

                break;
            case 'pivot':
                if (column.allowPivot !== true) {
                    return;
                }

                break;
            case 'rowGroup':
                if (column.allowRowGroup !== true) {
                    return;
                }

                break;
            case 'summary':
                break;
        }

        that._columns = that.columns._array;
        that.columnByDataField = [];
        that._columns.forEach(column => that.columnByDataField[column.dataField] = column);
        that.refresh(true);
    }
});