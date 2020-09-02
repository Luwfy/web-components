
LW.Utilities.Assign('Grid.Export', class Export {
    exportData(dataFormat, callback) {
        const that = this;
        const dataExporter = new LW.Utilities.DataExporter({ exportHeader: that.dataExport.header });
        const formattedRows = [];

        dataExporter.expandChar = that.dataExport.expandChar;
        dataExporter.collapseChar = that.dataExport.collapseChar;
        dataExporter.pageOrientation = that.dataExport.pageOrientation;
        dataExporter.style = that.dataExport.style;
        dataExporter.filterBy = that.dataExport.filterBy;
        dataExporter.groupBy = that.dataExport.groupBy;
        dataExporter.header = {
            columns: that.columns.toArray().slice(0),
            columngroups: that.columnGroups.slice(0)
        };

        if (!that.dataExport.style) {
            const computedStyle = window.getComputedStyle(that);
            const columnComputedStyle = window.getComputedStyle(that.columns.length > 0 && that.columns[0].element ? that.columns[0].element : that.$.columnHeader);
            const headerComputedStyle = window.getComputedStyle(that.$.columnHeader);
            const isHidden = that.offsetWidth === 0 || that.offsetHeight === 0;

            if (!isHidden) {
                const getStyle = (computedStyle) => {
                    const fontFamily = 'Helvetica';
                    const fontSize = computedStyle.fontSize;
                    const borderColor = computedStyle.borderRightColor;
                    const backgroundColor = computedStyle.backgroundColor;
                    const color = computedStyle.color;

                    const hexDigits = new Array
                        ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                    //Function to convert rgb color to hex format
                    function toHex(rgb) {
                        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                        if (!rgb) {
                            return '#ffffff';
                        }

                        return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]).toUpperCase();
                    }

                    function hex(x) {
                        return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                    }

                    return {
                        borderColor: toHex(borderColor),
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                        color: toHex(color),
                        backgroundColor: toHex(backgroundColor)
                    }
                }

                const gridStyle = getStyle(computedStyle);
                const columnStyle = getStyle(columnComputedStyle);
                const headerStyle = getStyle(headerComputedStyle);

                const header = {
                    height: that.$.columnHeader.offsetHeight + 'px',
                    border: '1px solid ' + gridStyle.borderColor,
                    fontFamily: headerStyle.fontFamily,
                    fontSize: headerStyle.fontSize,
                    color: headerStyle.color,
                    backgroundColor: columnStyle.backgroundColor,
                    fontWeight: '400'
                };

                const columns = {
                    border: '1px solid ' + gridStyle.borderColor,
                    fontFamily: gridStyle.fontFamily,
                    fontSize: gridStyle.fontSize
                };

                const rows = {
                    height: that.rowMinHeight + 'px'
                };

                for (let i = 0; i < that.columns.length; i++) {
                    const column = that.columns[i];

                    if (!column.allowExport) {
                        continue;
                    }

                    if (!column.visible) {
                        continue;
                    }

                    header[column.dataField] = {
                        textAlign: column.align,
                        width: column.computedWidth + 'px',
                        format: column.cellsFormat || ''
                    };

                    let cellsFormat = column.cellsFormat || '';

                    if (column.dataType === 'date') {
                        cellsFormat = 'd';
                    }
                    else if (column.dataType === 'dateTime') {
                        cellsFormat = 'D';
                    }
                    else if (column.dataType === 'time') {
                        cellsFormat = 't';
                    }

                    const columnStyleObject = {
                        textAlign: column.cellsAlign,
                        format: cellsFormat
                    };

                    columns[column.dataField] = columnStyleObject;

                    if (that.dataExport.view && ['html', 'jpeg', 'pdf', 'png'].indexOf(dataFormat) !== -1 && (column.template || column.formatFunction)) {
                        for (let i = 0; i < that.rows.length; i++) {
                            const row = that.rows[i];
                            let cell = that.rows[i]['column_' + column.dataField];

                            if (that.dataExport.viewStart && i < that.dataExport.viewStart || (that.dataExport.viewEnd && i > that.dataExport.viewEnd)) {
                                continue;
                            }

                            if (!cell || (row && row.element && row.element.classList.contains('lw-hidden'))) {
                                const rowElement = that._rowElements[0];

                                if (!rowElement) {
                                    continue;
                                }

                                row.element = rowElement;
                                row.grid = that;
                                row.render();
                                cell = row['column_' + column.dataField];

                                if (!cell) {
                                    continue;
                                }
                            }

                            const cellStyleObject = {};

                            cellStyleObject.border = cell.borderColor;
                            cellStyleObject.background = cell.background;
                            cellStyleObject.color = cell.color;

                            const index = that.dataExport.viewStart !== undefined ? i - that.dataExport.viewStart : i;

                            formattedRows[i] = Object.assign({}, row.data);
                            formattedRows[i][column.dataField] = cell.element.textContent;

                            columnStyleObject[index] = cellStyleObject;
                        }
                    }
                }

                if (that.appearance.alternationCount > 0) {
                    rows.alternationCount = that.appearance.alternationCount;
                    rows.alternationStart = that.appearance.alternationStart;
                    rows.alternationEnd = that.appearance.alternationEnd;
                    rows.alternationIndex0Color = gridStyle.color;
                    rows.alternationIndex0BackgroundColor = gridStyle.backgroundColor;
                    rows.alternationIndex1Color = gridStyle.color;
                    rows.alternationIndex1BackgroundColor = '#F5F5F5';
                }
                dataExporter.style = {
                    border: '1px solid ' + gridStyle.borderColor,
                    borderCollapse: 'collapse',
                    header: header,
                    columns: columns,
                    rows: rows
                }
            }
        }

        const viewRows = !that.rowHierarchy || that.grouping.enabled ? that.rows.toArray() : that.rowHierarchy,
            rowIds = that.dataExport.rowIds,
            rowIdsSet = rowIds !== null;
        //const rows = [].concat(that._frozenNearDefaultRows, that._nearRowsAdded, viewRows, that._farRowsAdded, that._frozenFarDefaultRows);
        let data = [];

        if (that.dataExport.view) {

            that._recyclingRows.forEach((row, index) => {
                if (that.dataExport.viewStart && index < that.dataExport.viewStart || (that.dataExport.viewEnd && index > that.dataExport.viewEnd)) {
                    return true;
                }

                if (formattedRows[index]) {
                    data.push(formattedRows[index]);
                }
                else {
                    data.push(row.data)
                }
            });
        }
        else {
            for (let i = 0; i < viewRows.length; i++) {
                const row = viewRows[i];

                if (row.visible && (row.filtered !== false || row.filtered === undefined)) {
                    if (rowIdsSet && rowIds.indexOf(row.id) === -1) {
                        continue;
                    }

                    data.push(row.data);
                }
            }

            if (viewRows === that.rowHierarchy && !rowIdsSet) {
                data = that.dataSource.boundHierarchy;
                dataExporter.hierarchical = true;
            }
        }

        if (!that.dataExport.groupBy && that.grouping.enabled && that.dataSource && that.dataSource.groupBy) {
            dataExporter.groupBy = that.dataSource.groupBy && that.dataSource.groupBy.toArray ? that.dataSource.groupBy.toArray() : null;
        }

        that.checkLicense(true);
        const output = dataExporter.exportData(data, dataFormat, that.dataExport.fileName, callback);

        if (that.dataExport.view) {
            that._recycle(false);
        }

        return output;
    }

    print() {
        const that = this;
        const fileName = that.dataExport.fileName;

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
});
