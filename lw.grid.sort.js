
LW.Utilities.Assign('Grid.Sort', class Sort {
    clearSort() {
        const that = this;

        if (that._isSorting) {
            return;
        }

        if (!that.dataSource) {
            return;
        }

        that._isSorting = true;

        that.dataSource.clearSort();

        if (!that._sortedColumns) {
            that._sortedColumns = [];
        }

        for (let i = 0; i < that._sortedColumns.length; i++) {
            const sortColumn = that._sortedColumns[i];
            const column = that.columnByDataField[sortColumn.dataField];

            if (!column) {
                continue;
            }

            column.setProperty('sortOrder', null);
            column.setProperty('sortIndex', null);
        }

        that._sortedColumns = [];

        for (let i = 0; i < that.dataSource.length; i++) {
            const row = that.rows[i];
            const data = that.dataSource[i];

            if (row) {
                row.data = data;
                row.boundIndex = data.boundIndex;
            }
        }

        that._recycle();
        that._refreshHeaderBar();

        that._isSorting = false;
    }

    getSortedColumns() {
        const that = this;
        const sortedColumns = [];

        if (that._sortedColumns) {
            for (let i = 0; i < that._sortedColumns.length; i++) {
                const sortColumn = that._sortedColumns[i];

                sortedColumns[sortColumn.dataField] = { sortOrder: sortColumn.sortOrder, sortIndex: sortColumn.sortIndex };
                sortedColumns.length++;
            }
        }

        return sortedColumns;
    }

    addSort(dataField, sortOrder) {
        const that = this;

        that.sortBy(dataField, sortOrder);
    }

    removeSort(dataField) {
        const that = this;

        that.sortBy(dataField, null);
    }

    refreshSort() {
        const that = this;

        that._refreshSort(that._sortedColumns);
    }

    _refreshSort(sortedColumns) {
        const that = this;

        if (that._isSorting || !sortedColumns) {
            return;
        }


        const sortDataFields = [];
        const sortOrders = [];
        const sortDataTypes = [];

        that._isSorting = true;

        for (let i = 0; i < sortedColumns.length; i++) {
            const sortColumn = sortedColumns[i];

            const column = that.columnByDataField[sortColumn.dataField];

            if (!column) {
                continue;
            }

            column.setProperty('sortOrder', sortColumn.sortOrder);

            sortDataFields.push(sortColumn.dataField);
            sortOrders.push(sortColumn.sortOrder);
            sortDataTypes.push(sortColumn.dataType);
        }

        const sort = function () {
            if (that.dataSource && that.dataSource.virtualDataSource) {
                that._virtualDataRequest('sort');
            }
            else {
                that.dataSource.sortBy(sortDataFields, sortDataTypes, sortOrders);

                if (that.dataSource.boundHierarchy) {
                    that._refreshRowHierarchy();
                    if (that.dataSource.groupBy.length > 0) {
                        that.refresh();
                    }
                }
                else {
                    for (let i = 0; i < that.dataSource.length; i++) {
                        const row = that.rows[i];
                        const data = that.dataSource[i];

                        row.data = data;
                        row.boundIndex = data.boundIndex;
                    }
                }

                that._recycle();
            }
        }

        sort();

        that._refreshHeaderBar();
        that._isSorting = false;

        that._sortedColumns = sortedColumns;
    }

    sortBy(columnDataField, sortOrder) {
        const that = this;
        const column = that.columnByDataField[columnDataField];
        const sortDataFields = [];
        const sortOrders = [];
        const sortDataTypes = [];
        const toggleSort = sortOrder === undefined ? true : false;

        if (that._isSorting || !column) {
            return;
        }

        that._isSorting = true;

        if (sortOrder === 'descending') {
            sortOrder = 'desc';
        }

        if (undefined === sortOrder || sortOrder === 'ascending') {
            sortOrder = 'asc';
        }

        const clearSortColumn = function (column) {
            if (column) {
                column.setProperty('sortOrder', null);
            }
        }

        const clearSortColumns = function () {
            if (that._sortedColumns.length > 0) {
                for (let i = 0; i < that._sortedColumns.length; i++) {
                    const sortColumn = that._sortedColumns[i];
                    const column = that.columnByDataField[sortColumn.dataField];

                    clearSortColumn(column);
                }
            }

            that._sortedColumns = [];
        }

        if (column === null) {
            clearSortColumns();
            that._isSorting = false;
            return;
        }

        if (!that.sorting.enabled || !that.dataSource || !column.allowSort || that._sortAnimation) {
            that._isSorting = false;
            return;
        }


        clearSortColumn(column);

        if (!that._sortedColumns) {
            that._sortedColumns = [];
        }

        let dataType = 'string';

        for (let i = 0; i < that.dataSource.dataFields.length; i++) {
            const field = that.dataSource.dataFields[i];

            if (field.name === columnDataField) {
                dataType = field.dataType;
                break;
            }
        }

        let addNewSortColumn = true;

        for (let i = 0; i < that._sortedColumns.length; i++) {
            const sortColumn = that._sortedColumns[i];

            if (sortColumn.dataField === columnDataField) {
                addNewSortColumn = false;

                sortColumn.sortIndex = column.sortIndex;

                if (toggleSort) {
                    if (sortColumn.sortOrder === 'asc') {
                        sortColumn.sortOrder = 'desc';
                        sortOrder = 'desc';
                    }
                    else if (sortColumn.sortOrder === 'desc') {
                        if (that.sorting.sortToggleThreeStates) {
                            that._sortedColumns.splice(i, 1);
                            clearSortColumn(column);
                            sortOrder = null;
                        }
                        else {
                            sortColumn.sortOrder = 'asc';
                            sortOrder = 'asc';
                        }
                        break;
                    }
                }
                else {
                    sortColumn.sortOrder = sortOrder;

                    if (sortOrder === null) {
                        that._sortedColumns.splice(i, 1);
                        clearSortColumn(column);
                    }
                }
            }
        }

        if (addNewSortColumn) {
            if (that.sorting.mode === 'one') {
                clearSortColumns();
            }

            if (sortOrder !== null) {
                that._sortedColumns.push({ dataField: columnDataField, sortOrder: sortOrder, sortIndex: column.sortIndex, dataType: dataType });
            }
        }

        column.setProperty('sortOrder', sortOrder);

        that._sortedColumns.sort((a, b) => {
            if (typeof a.sortIndex === 'string' && typeof b.sortIndex === 'string') {
                return 0;
            }

            if (typeof a.sortIndex === 'number' && typeof b.sortIndex === 'string') {
                return -1;
            }

            if (typeof a.sortIndex === 'string' && typeof b.sortIndex === 'number') {
                return 1;
            }

            if (typeof a.sortIndex === 'number' && typeof b.sortIndex === 'number') {
                return a.sortIndex - b.sortIndex;
            }
        });

        for (let i = 0; i < that._sortedColumns.length; i++) {
            const sortColumn = that._sortedColumns[i];

            sortDataFields.push(sortColumn.dataField);
            sortOrders.push(sortColumn.sortOrder);
            sortDataTypes.push(sortColumn.dataType);
        }

        const sort = function () {
            if (that.dataSource && that.dataSource.virtualDataSource) {
                that._virtualDataRequest('sort');
            }
            else {
                that.dataSource.sortBy(sortDataFields, sortDataTypes, sortOrders);

                if (that.dataSource.boundHierarchy) {
                    that._refreshRowHierarchy();
                    if (that.dataSource.groupBy.length > 0) {
                        that.refresh();
                    }
                }
                else {
                    for (let i = 0; i < that.dataSource.length; i++) {
                        const row = that.rows[i];
                        const data = that.dataSource[i];

                        row.data = data;
                        row.boundIndex = data.boundIndex;
                    }
                }

                that._recycle();
            }

            const detailColumns = [];

            for (let i = 0; i < that._sortedColumns.length; i++) {
                const column = that.columnByDataField[that._sortedColumns[i].dataField];

                if (column) {
                    detailColumns.push(column);
                }
            }

            that._refreshHeaderBar();

            that.$.fireEvent('sort', {
                'columns': detailColumns,
                'data': that._sortedColumns
            });
        }

        if (that.appearance.allowSortAnimation) {
            let positions = [];
            let takenPositions = [];

            that.rows.canNotify = false;
            that._sortAnimation = true;

            const refreshRows = function () {
                for (let i = 0; i < that._rowElements.length; i++) {
                    const rowElement = that._rowElements[i];

                    rowElement.classList.remove('lw-grid-sort-animation');
                    that.removeTransformMoveStyle(rowElement);

                    if (rowElement.offsetHeight > 0) {
                        positions.push(rowElement.offsetTop);
                    }
                }
            }

            refreshRows();

            that._sortTimer = setTimeout(function () {
                refreshRows();
                that._sortAnimation = false;
                that.rows.canNotify = true;
            }, that.appearance.sortAnimationDuration);

            that._sortTimer2 = setTimeout(function () {
                sort();
            }, that.appearance.sortAnimationDuration / 2);

            for (let i = 0; i < positions.length; i++) {
                const rowElement = that._rowElements[i];

                rowElement.classList.remove('lw-grid-sort-animation');

                that.removeTransformMoveStyle(rowElement);
                let randomIndex = Math.floor((Math.random() * positions.length - 1) + 1);

                while (takenPositions[randomIndex]) {
                    randomIndex = Math.floor((Math.random() * positions.length - 1) + 1);
                }

                takenPositions[randomIndex] = true;

                that.addTransformMoveStyle(rowElement, '0ms', 0, -rowElement.offsetTop + positions[randomIndex], 0, 0.5);
                rowElement.classList.add('lw-grid-sort-animation');

                setTimeout(function () {
                    that.addTransformMoveStyle(rowElement, that.appearance.sortAnimationDuration + 'ms', 0, 0, 0, 1);
                });

                setTimeout(function () {
                    rowElement.classList.remove('lw-grid-sort-animation');
                }, that.appearance.sortAnimationDuration);
            }
        }
        else {
            sort();
        }

        that._isSorting = false;
    }
});
