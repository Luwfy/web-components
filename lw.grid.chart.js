
LW.Utilities.Assign('Grid.Chart', class Chart {
    _getChartDataFields(data) {
        const that = this;
        const record = data[0];
        let stringOnly = true,
            xAxisDataField,
            series = [];

        for (let dataField in record) {
            if (dataField === '$') {
                continue;
            }

            const dataType = that.dataSource.dataFields.find(gridField => gridField.name === dataField).dataType;

            if (dataType === 'string') {
                const index = that.columns.findIndex(col => col.dataField === dataField);

                if (index === 0) {
                    xAxisDataField = dataField;
                }
            }
            else {
                stringOnly = false;
                series.push({ dataField: dataField, displayText: dataField });
            }
        }

        return { xAxisDataField: xAxisDataField, series: series, stringOnly: stringOnly };
    }

    createChart(type, dataSource) {
        const that = this;
        const gridSelection = that.getSelection(),
            selectedRows = gridSelection.rows,
            selectedColumns = gridSelection.columns,
            selectedCells = gridSelection.cells,
            chart = document.createElement('lw-chart'),
            chartData = [],
            seriesGroup = {};
        let rowsToPlot = [],
            columnsToPlot = [],
            series;

        if (selectedCells && selectedCells.length > 1) {
            selectedCells.forEach(cell => {
                if (rowsToPlot.indexOf(cell.row.index) === -1) {
                    rowsToPlot.push(cell.row.index);
                }

                if (columnsToPlot.indexOf(cell.dataField) === -1) {
                    columnsToPlot.push(cell.dataField);
                }
            });
        }

        if (dataSource) {
            chartData.concat(dataSource);
        }
        else {
            for (let i = 0; i < that.dataSource.length; i++) {
                const record = {};

                if (selectedRows) {
                    if (!selectedRows.find(rowObject => rowObject.row.index === i)) {
                        continue;
                    }
                }
                else if (selectedColumns) {
                    selectedColumns.forEach(column => {
                        record[column.dataField] = that.dataSource[i][column.dataField];
                    });

                    chartData.push(record);
                    continue;
                }
                else if (selectedCells) {
                    if (selectedCells.length > 1) {
                        if (rowsToPlot.indexOf(i) === -1) {
                            continue;
                        }

                        columnsToPlot.forEach(dataField => {
                            record[dataField] = that.dataSource[i][dataField];
                        });
                        chartData.push(record);
                        continue;
                    }
                }

                that.columns.forEach(column => record[column.dataField] = that.dataSource[i][column.dataField]);
                chartData.push(record);
            }
        }

        const chartDataFields = that._getChartDataFields(chartData);

        if (chartDataFields.stringOnly) {
            if (that.header.visible && that.$.header.firstElementChild) {
                const chartIcon = that.enableShadowDOM ? that.shadowRoot.getElementById(type) : that.querySelector('#' + type);

                that.$.header.firstElementChild.classList.add('warning');

                if (chartIcon) {
                    chartIcon.classList.add('warning');
                }

                setTimeout(function () {
                    that.$.header.firstElementChild.classList.remove('warning');

                    if (chartIcon) {
                        chartIcon.classList.remove('warning');
                    }
                }, 1000);
            }

            return;
        }

        series = chartDataFields.series;

        chart.caption = '';
        chart.description = '';
        chart.clip = false;
        chart.showLegend = true;
        chart.showBorderLine = false;
        chart.padding = { left: 5, top: 10, right: 5, bottom: 5 };
        chart.dataSource = chartData;
        chart.xAxis =
            {
                dataField: chartDataFields.xAxisDataField,
                gridLines: {
                    visible: true
                }
            };
        chart.valueAxis =
            {
                displayValueAxis: true,
                description: that.charting.description,
                axisSize: 'auto',
                formatSettings: that.charting.formatSettings
            };
        chart.colorScheme = that.charting.colorScheme;
        chart.seriesGroups = [seriesGroup];

        seriesGroup.formatSettings = that.charting.formatSettings;
        seriesGroup.series = series;

        if (type === 'line') {
            series.forEach(function (serie) {
                serie.symbolSize = 8;
                serie.symbolType = 'square';
            });
        }
        else if (type === 'pie') {
            const pieDataField = series[0].dataField;

            delete seriesGroup.formatSettings;
            seriesGroup.formatFunction = function (value, index) {
                if (isNaN(value)) {
                    if (typeof value === 'object') {
                        return index;
                    }

                    return value;
                }

                return value;
            };
            seriesGroup.showLabels = true;
            series.length = 0;
            series.push({
                dataField: pieDataField,
                displayText: chartDataFields.xAxisDataField,
                initialAngle: 0
            });
        }
        else if (type === 'bar') {
            type = 'column';
            seriesGroup.orientation = 'horizontal';
            chart.xAxis.textRotationAngle = 90;
            chart.valueAxis.textRotationAngle = 30;
            chart.valueAxis.flip = true;
        }
        else if (type === 'area') {
            let opacity = 1;

            for (let i = 0; i < series.length; i++) {
                series[i].opacity = opacity;
                opacity -= 0.2;
                opacity = Math.max(0.3, opacity);
            }
        }

        seriesGroup.type = type;

        if (that.onChartInit) {
            that.onChartInit(chart);
        }

        if (that.charting.appendTo) {
            const container = that.charting.appendTo === 'string' ? document.querySelector(that.charting.appendTo) : that.charting.appendTo;

            if (container) {
                container.appendChild(chart);
            }
        }
        else {
            that._openChartDialog(chart, type);
        }
    }

    _openChartDialog(chart, chartType) {
        const that = this;

        if (!that.charting.dialog.enabled) {
            return false;
        }

        const dialog = that._dialogChart || that._createDialog(that.charting.dialog);
        const chartLabel = chartType.substring(0, 1).toUpperCase() + chartType.substring(1);
        const header = that.charting.dialog.header === '{{message}}' ? that.localize('dialogChartHeader', { value: chartLabel }) : that.charting.dialog.header;

        chart.style.width = '100%';
        chart.style.height = '100%';

        dialog.header.innerHTML = header;
        dialog.content.innerHTML = '';
        dialog.content.style.width = '100%';
        dialog.content.style.height = '100%';
        dialog.btnCancel.classList.add('lw-hidden');

        if (!that._dialogChart) {
            dialog.modal = true;

            dialog.onOpen = function () {
                that.charting.dialog.visible = true;
            }

            dialog.onClose = function () {
                that.charting.dialog.visible = false;
            }

            dialog.btnConfirm.onclick = function () {
                dialog.close();
            }

            dialog.btnClose.onclick = function () {
                dialog.close();
            }

            dialog.onkeydown = function (event) {
                if (event.key === 'Escape') {
                    dialog.close();
                }
            }
            that._dialogChart = dialog;
        }

        dialog.open();

        setTimeout(function () {
            dialog.btnConfirm.focus();
            dialog.content.appendChild(chart);
        }, 100);
    }
});
