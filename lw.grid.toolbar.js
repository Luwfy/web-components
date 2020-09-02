
LW('lw-grid-toolbar', class GridToolbar extends LW.DataView {
    template() {
        return `<div id="container" role="presentation">
                    <div id="header" class="lw-data-view-header" role="toolbar">
                        <div id="customizeButton" class="lw-data-view-header-button lw-data-view-customize-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Customize cards"><div role="presentation"></div></div>
                        <div id="filterButton" class="lw-data-view-header-button lw-data-view-filter-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Filter"><div role="presentation"></div></div>
                        <div id="sortButton" class="lw-data-view-header-button lw-data-view-sort-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Sort"><div role="presentation"></div></div>
                        <div id="groupButton" class="lw-data-view-header-button lw-data-view-group-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Group"><div role="presentation"></div></div>
                        <div id="searchButton" class="lw-data-view-header-button lw-data-view-search-button lw-unselectable" role="button" aria-expanded="false" aria-haspopup="dialog" aria-label="Search"></div>
                        <div id="headerDropDown" class="lw-data-view-header-drop-down lw-visibility-hidden" role="dialog">
                            <div id="customize" class="lw-hidden" role="presentation"></div>
                            <div id="filter" class="lw-hidden" role="presentation"></div>
                            <div id="sort" class="lw-hidden" role="presentation"></div>
                            <div id="group" class="lw-hidden" role="presentation"></div>
                            <div id="search" class="lw-data-view-search-box lw-hidden" role="presentation">
                                <input type="text" id="searchInput" spellcheck="false" aria-label="Search" />
                                <div id="searchLabel" class="lw-data-view-search-label lw-unselectable"></div>
                                <div id="searchPrev" class="lw-data-view-search-prev" role="button" aria-label="Previous"></div>
                                <div id="searchNext" class="lw-data-view-search-next" role="button" aria-label="Next"></div>
                                <div id="searchClose" class="lw-data-view-search-close" role="button" aria-label="Close search box"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    render() {
        const that = this;

        that._appliedFiltering = { filters: [], operator: 'and' };
        that._appliedSorting = { dataFields: [], dataTypes: [], orderBy: [] };

        that._localizeHeader();
        that._getInnerElementMessages();

        super.render();
    }


    /**
     * Opens the "Filter" header panel (drop down).
     */
    openFilterPanel(column) {
        const that = this,
            dataSource = that.dataSource,
            filterPanelDataSource = this.columns.map(col => {
                const field = Object.assign({}, col);

                field.dataType = dataSource.dataFields.find(dataField => dataField.name === field.dataField).dataType;
                return field;
            }).filter(col => {
                return col.allowFilter;
            });

        super.openFilterPanel(filterPanelDataSource, null);

        if (column) {
            const filterPanel = that.$.headerDropDown.querySelector('lw-multi-column-filter-panel');

            filterPanel.$.itemsContainer.appendChild(filterPanel._createItem(that.columns.find((value) => {
                if (value.dataField === column.dataField) {
                    return true;
                }

                return false;
            }), column.dataType === 'string' ? 'CONTAINS' : 'EQUAL', ''));

            const items = filterPanel.querySelectorAll('.lw-grid-panel-item');

            setTimeout(() => {
                items[items.length-1].querySelector('.editor').focus();
            }, 50);
        }
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
            }).filter(col => {
                return col.allowSort;
            });


        super.openSortPanel(sortPanelDataSource);

        const sortPanel = that.$.headerDropDown.querySelector('lw-sort-panel');
        const input = sortPanel.$.inputNotSorted;

        const updateInputVisibility = () =>{
            const items = sortPanel.querySelectorAll('.lw-grid-panel-item');

            if (that.grid.sorting.mode === 'many' || items.length < 1) {
                input.classList.remove('lw-visibility-hidden');
            }
            else if (items.length >= 1){
                input.classList.add('lw-visibility-hidden');
            }
        }

        sortPanel.onDataSourceChange = () => {
            updateInputVisibility();
        }

        updateInputVisibility();
    }

    openCustomizePanel() {
        const that = this,
            dataSource = that.dataSource;

        if (!dataSource || dataSource.length === 0 || that.disabled || that.headerPosition === 'none') {
            return;
        }

        that._refreshColumns();

        const customizePart = that.$.customize,
            columnPanelDataSource = that.columns.map(col => {
                const newColumn = Object.assign({}, col);

                if ([that.coverField, that.titleField].indexOf(newColumn.dataField) !== -1) {
                    newColumn.disableToggle = true;
                }
                else {
                    newColumn.disableToggle = false;
                }

                if (!col.allowHide){
                    newColumn.disableToggle = true;
                }

                return newColumn;
            });

        let columnPanel;
        that._closeDialog();

        that.$.headerDropDown.classList.add('customize-panel');
        that.$.headerDropDown.classList.remove('filter-panel', 'sort-panel', 'search-panel', 'group-panel');
        customizePart.classList.remove('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that.$.search.classList.add('lw-hidden');
        that.$.group.classList.add('lw-hidden');

        that._closeSearchPanel();

        if (!that._customizePartCreated) {
            const fragment = document.createDocumentFragment(),
            columnPanel = document.createElement('lw-column-panel');
            columnPanel.rightToLeft = that.rightToLeft;
            columnPanel.animation = that.animation;
            columnPanel.dataSource = columnPanelDataSource;
            columnPanel.locale = that.locale;
            columnPanel.messages = that._innerElementMessages.columnPanel;
            columnPanel.theme = that.theme;

            fragment.appendChild(columnPanel);
            that.$.customize.appendChild(fragment);
            that._customizePartCreated = true;
        }
        else {
            columnPanel = customizePart.querySelector('lw-column-panel');

            columnPanel.set('dataSource', columnPanelDataSource);
            columnPanel.propertyChangedHandler('dataSource', undefined, columnPanelDataSource);
            columnPanel.rightToLeft = that.rightToLeft;
        }

        that._changedVisibility = new Map();
        that._openHeaderDropDown(that.$.customizeButton);
    }

       /**
     * Applies filtering.
     */
    _applyFilter(filters, operator) {
        const that = this;

        that.grid.beginUpdate();
        that.grid.context = that.grid;

        that.grid.clearFilter();

        for(let i = 0; i < filters.length; i++) {
            const item = filters[i];
            const dataField = item[0];
            const filter = item[1];
            const column = that.grid.columnByDataField[dataField];

            column.filter = filter;
        }

        that.grid._filterOperator = operator;

        that.grid.endUpdate();
        that.grid.refreshFilters();
        that.grid.context = document;
    }

    /**
     * Applies sorting.
     */
    _applySort() {
        const that = this,
            sortByInfo = that._appliedSorting;

        that.grid.beginUpdate();
        that.grid.context = that.grid;

        that.grid.clearSort();

        for(let i = 0; i < sortByInfo.dataFields.length; i++) {
            that.grid.sortBy(sortByInfo.dataFields[i],  sortByInfo.orderBy[i])
        }

        that.grid.endUpdate();
        that.grid.context = document;
    }

    _applyHandler(event) {
        const that = this,
            target = event.target,
            detail = event.detail,
            customize = that.$.customize

        if (customize.contains(target)) {
            that._applyColumns(detail.value);
        }
        else if (that.$.filter.contains(target)) {
            that.addFilter(detail.filters, detail.operator, detail.value);
        }
        else if (that.$.sort.contains(target)) {
            that.addSort(detail.sortByInfo);
        }

        that.closePanel();
    }

    _refreshColumns() {
        const that = this;
        const grid = that.grid;
        let columns = Array.isArray( grid.columns ) ? [ ...grid.columns ] : [ ...grid.columns.toArray() ]

        columns = columns.map( ( column ) => {
            if ( column.data ) {
                if (column.data.grid !== undefined) {
                    delete column.data.grid;
                }

                column.data.allowSort = column.allowSort;
                column.data.allowFilter = column.allowFilter;
                column.data.allowGroup = column.allowGroup;
                column.data.allowHide = column.allowHide;
                column.data.visible = column.visible;

                return column.data;
            }

            return column;
        } );

        that.columns = columns;
    }

    _init(grid) {
        const that = this;

        that.grid = grid;

        if (grid.dataSource && grid.dataSource.boundSource) {
            that._refreshColumns();

            that.dataSource = new LW.DataAdapter({ observable: false, dataSource: [...grid.dataSource.boundSource.toArray()], dataFields: grid.dataSource.dataFields });
        }
    }

    _refresh() {
        const that = this;
        const grid = that.grid;

         grid.header.buttons.indexOf('sort') >= 0  && grid.sorting.enabled? that.$.sortButton.classList.remove('lw-hidden') : that.$.sortButton.classList.add('lw-hidden');
         grid.header.buttons.indexOf('filter') >= 0 && grid.filtering.enabled ? that.$.filterButton.classList.remove('lw-hidden') : that.$.filterButton.classList.add('lw-hidden');
         grid.header.buttons.indexOf('group')  >= 0 && grid.grouping.enabled?  that.$.groupButton.classList.remove('lw-hidden') : that.$.groupButton.classList.add('lw-hidden');
         grid.header.buttons.indexOf('columns') >= 0 ?  that.$.customizeButton.classList.remove('lw-hidden') : that.$.customizeButton.classList.add('lw-hidden');
         grid.header.buttons.indexOf('search') >= 0 ? that.$.searchButton.classList.remove('lw-hidden') : that.$.searchButton.classList.add('lw-hidden');

        if (grid._sortedColumns) {
            const sortDataFields = [];
            const sortOrders = [];
            const sortDataTypes = [];

            for (let i = 0; i < grid._sortedColumns.length; i++) {
                const sortColumn = grid._sortedColumns[i];

                sortDataFields.push(sortColumn.dataField);
                sortOrders.push(sortColumn.sortOrder);
                sortDataTypes.push(sortColumn.dataType);
            }

            that._appliedSorting  = { dataFields: sortDataFields, dataTypes: sortDataTypes, orderBy: sortOrders };
            that._refreshSortButton();
        }

        const newFiltering = { filters: [], operator: 'and' };

        const filters = grid.getFilteredColumns();

        if (filters) {
            for(let dataField in filters) {
                const filterGroup = filters[dataField];

                for(let i = 0; i < filterGroup.filters.length; i++) {
                    const filterObject = filterGroup.filters[i];

                    newFiltering.filters.push([dataField, filterObject.condition, filterObject.value]);

                }
            }
        }

        if (that._appliedFiltering) {
            newFiltering.operator = that._appliedFiltering.operator;
        }

        that._appliedFiltering = newFiltering;
        that._refreshFilterButton();

        if (that._appliedGrouping) {
            that._appliedGrouping.dataFields = grid.dataSource.groupBy;
        }
        else {
            that._appliedGrouping = {dataFields: grid.dataSource.groupBy, expandAll: false, collapseAll:false};
        }

        that._refreshGroupButton();
    }

    openGroupPanel() {
        const that = this;

        let groupPanel;
        const grid = that.grid;
        that.$.headerDropDown.classList.add('group-panel');
        that.$.headerDropDown.classList.remove('customize-panel', 'sort-panel', 'search-panel');
        that.$.group.classList.remove('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.customize.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that.$.search.classList.add('lw-hidden');

        const groupPanelDataSource = that.columns.map(col => {
            const newColumn = Object.assign({}, col);

            if (that._appliedGrouping && that._appliedGrouping.dataFields) {
                const index = that._appliedGrouping.dataFields.indexOf(newColumn.dataField);

                newColumn.groupIndex = index;
            }

            return newColumn;
        }).filter(col => {
            return col.allowGroup;
        });

        if (!that._groupPartCreated) {
            groupPanel = document.createElement('lw-group-panel');
            groupPanel.rightToLeft = that.rightToLeft;
            groupPanel.animation = that.animation;
            groupPanel.locale = that.locale;
            groupPanel.messages = that._innerElementMessages.groupPanel;
            groupPanel.theme = that.theme;
            groupPanel.dataSource = groupPanelDataSource;
            that.$.group.appendChild(groupPanel);
            that._groupPartCreated = true;

            groupPanel.onExpandAll = () => {
                that._appliedGrouping.expandAll = true;
                that._appliedGrouping.collapseAll = false;
            }

            groupPanel.onCollapseAll = () => {
                that._appliedGrouping.expandAll = false;
                that._appliedGrouping.collapseAll = true;
            }

            groupPanel.addEventListener('apply',  (event) => {
                const detail = event.detail.sortByInfo;

                that._appliedGrouping.dataFields = detail.dataFields;

                grid.beginUpdate();

                grid.clearGroups();

                for( let i = 0; i < detail.dataFields.length; i++) {
                    const dataField = detail.dataFields[i];

                    grid.addGroup(dataField);
                }

                if (that._appliedGrouping.expandAll) {
                    grid.expandAllRows();
                }

                if (that._appliedGrouping.collapseAll) {
                    grid.collapseAllRows();
                }

                grid.endUpdate();
            });
        }
        else {
            groupPanel = that.$.group.firstElementChild;
            groupPanel.rightToLeft = that.rightToLeft;
            groupPanel.dataSource = groupPanelDataSource;
        }

        that._refreshGroupButton();
        that._openHeaderDropDown(that.$.groupButton);
    }


    _refreshGroupButton() {
        const that = this;
        const numberOfGroups = that._appliedGrouping.dataFields ? that._appliedGrouping.dataFields.length : 0;

        if (numberOfGroups === 0) {
            that.$.groupButton.firstElementChild.innerHTML = that.localize('group');
            that.$.groupButton.classList.remove('grouped');
            return;
        }

        if (numberOfGroups === 1) {
            that.$.groupButton.firstElementChild.innerHTML = that.localize('groupedByOne');
        }
        else {
            that.$.groupButton.firstElementChild.innerHTML = that.localize('groupedByMultiple', { n: numberOfGroups });
        }

        that.$.groupButton.classList.add('grouped');
    }

    openSearchPanel() {
        this._openSearchPanel();
    }
       /**
     * Opens search panel.
     */
    _openSearchPanel() {
        const that = this;
        const grid = that.grid;

        that.$.headerDropDown.classList.add('search-panel');
        that.$.headerDropDown.classList.remove('customize-panel', 'filter-panel', 'sort-panel', 'group-panel');
        that.$.search.classList.remove('lw-hidden');
        that.$.customize.classList.add('lw-hidden');
        that.$.group.classList.add('lw-hidden');
        that.$.filter.classList.add('lw-hidden');
        that.$.sort.classList.add('lw-hidden');
        that._openHeaderDropDown(that.$.searchButton);

        const rows = [];
        const visibleRows = grid.getVisibleRows();

        for (let i = 0; i < visibleRows.length; i++) {
            rows.push(Object.assign(visibleRows[i].data));
        }

        const dataAdapter = new LW.DataAdapter({ observable: false, dataSource: rows, dataFields: grid.dataSource.dataFields });

        that._searchInfo = {
            source: dataAdapter,
            stringDataFields: that.dataSource.dataFields.filter(dataField => {
                return dataField.dataType === 'string';
            }).map(dataField => dataField.name)
        };

        if (that.$.searchInput.value !== '') {
            that._search(that.$.searchInput.value, false);
        }
    }

    _search(query, highlight = true) {
        const that = this;

        that._searchInfo.query = query;

        if (query === '') {
            that.$.search.classList.remove('matches', 'no-matches');
            delete that._searchInfo.foundIdsArray;
            delete that._searchInfo.foundIdsObject;
            delete that._searchInfo.highlighted;
            that.grid.highlighted = null;
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
                foundIdsArray.push(record.id);
                foundIdsObject[record.id] = true;
            }
        }

        that._searchInfo.foundIdsArray = foundIdsArray;
        that._searchInfo.foundIdsObject = foundIdsObject;

        that.grid.highlighted = null;

        if (foundIdsArray.length > 0) {
            that.$.search.classList.remove('no-matches');
            that.$.search.classList.add('matches');
            that.$.searchLabel.innerHTML = that.localize('found', { nth: highlight ? 1 : 0, n: foundIdsArray.length });

            that._searchInfo.highlighted = foundIdsArray[0];
            that.grid.highlighted = that._searchInfo.highlighted;
            that.grid.ensureVisible(that._searchInfo.highlighted);
            that.grid._recycle(false);
            return;
        }

        that.$.search.classList.remove('matches');
        that.$.search.classList.add('no-matches');
        that.$.searchLabel.innerHTML = that.localize('found', { nth: 0, n: 0 });
    }

    _applyColumns(columns) {
        const that = this;
        const grid = that.grid;

        grid.beginUpdate();

        for(let index in columns) {
            const column = columns[index];
            const gridColumn = grid.columnByDataField[column.dataField];
            const gridColumnIndex = grid.columns.indexOf(gridColumn);
            const columnIndex = parseInt(index);

            gridColumn.visible = column.visible;

            if (gridColumnIndex !== columnIndex) {
                grid.columns.move(gridColumnIndex, columnIndex);
            }
        }

        grid.endUpdate();
    }
});