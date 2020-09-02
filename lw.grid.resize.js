
LW.Utilities.Assign('Grid.Resize', class Resize {

    autoSizeRows(rows) {
        const that = this;
        const rowsToAutoSize = !rows ? that._recyclingRows : rows;

        that.rows.canNotify = false;

        for (let i = 0; i < rowsToAutoSize.length; i++) {
            const row = rowsToAutoSize[i];

            row.element = that._rowElements[1];
            row.grid = that;

            const height = row._autoSize(row);

            if (row.cellHeight !== height) {
                row.cellHeight = height;
            }

            row.height = height;
        }

        that.rows.canNotify = true;

        that.refresh();
    }

    autoSizeColumns(autoSizeHeadersOnly, columns) {
        const that = this;
        const columnsToAutoSize = !columns ? that.columns : columns;
        let labels = [];

        if (!autoSizeHeadersOnly) {
            const rows = that._recyclingRows;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];

                for (let j = 0; j < columnsToAutoSize.length; j++) {
                    const column = columnsToAutoSize[j];
                    const cell = row.getCell(column.dataField);

                    if (!labels[column.dataField]) {
                        labels[column.dataField] = column.label;
                    }

                    if (cell.value && cell.value.toString().length > labels[column.dataField].length) {
                        labels[column.dataField] = cell.value;
                    }
                }
            }
        }

        const measureLabels = [];

        for (let j = 0; j < columnsToAutoSize.length; j++) {
            const column = columnsToAutoSize[j];
            const label = labels[column.dataField] ? labels[column.dataField] : column.label;

            measureLabels.push(label);
        }

        const columnWidths = columnsToAutoSize[0]._measureSize(measureLabels);

        that.columns.canNotify = false;

        for (let j = 0; j < columnsToAutoSize.length; j++) {
            const column = columnsToAutoSize[j];

            column.width = columnWidths[j];
        }

        that.columns.canNotify = true;

        that.refresh();
    }

    _doubleClickHandler(event) {
        const that = this;

        if (that.behavior.rowResizeMode === 'none' && that.behavior.columnResizeMode === 'none') {
            return;
        }

        const isDoubleClick = that._downTime ? new Date() - that._downTime < 300 : false;

        if (isDoubleClick) {
            const elements = (that.enableShadowDOM ? that.shadowRoot : that.getRootNode()).elementsFromPoint(event.clientX, event.clientY);

            let columnDataField = null;
            let columnElement = null;
            let rowId = null;
            let rowElement = null;

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];

                if (element.getAttribute('data-field')) {
                    columnDataField = element.getAttribute('data-field');
                    columnElement = element;
                    break;
                }

                if (element.getAttribute('data-id')) {
                    rowId = element.getAttribute('data-id');
                    rowElement = element;
                    break;
                }
            }

            const column = that.columnByDataField[columnDataField];
            const row = that.rowById[rowId];

            if (that.appearance.allowColumnAutoSizeOnDoubleClick && column && column.allowResize && that.behavior.columnResizeMode !== 'none') {
                const columnRight = columnElement.getBoundingClientRect().right;
                const columnResizeBreakpoint = 10;

                if (columnRight - columnResizeBreakpoint <= event.clientX && event.clientX <= columnRight + columnResizeBreakpoint) {
                    column.autoSize();
                }
            }

            if (that.appearance.allowRowAutoSizeOnDoubleClick && row && row.allowResize && that.behavior.rowResizeMode !== 'none') {
                const rowBottom = rowElement.getBoundingClientRect().bottom;
                const rowResizeBreakpoint = 10;

                if (rowBottom - rowResizeBreakpoint <= event.clientY && event.clientY <= rowBottom + rowResizeBreakpoint) {
                    row.computedHeight = null;
                    row.autoSize();
                }
            }
        }

        that._downTime = new Date();
    }

    _endResize(/*event*/) {
        const that = this;

        if (that._overlay) {
            that._overlay.parentNode.removeChild(that._overlay);
            that._overlay = null;
        }

        const boundingRect = that.getBoundingRect(that);

        that.classList.remove('lw-grid-resize-mode');
        that.$.root.classList.remove('lw-grid-resize-mode');
        that.classList.remove('lw-grid-row-resize-mode');
        that.classList.remove('lw-grid-column-resize-mode');

        if (that._rowToResize && that._rowResizeStartLine && that._rowResizeLine) {
            const row = that.rowById[that._rowToResizeId];

            const newRowHeight = row.cellHeight + parseFloat(that._rowResizeLine.style.top) - parseFloat(that._rowResizeStartLine.style.top)
            const oldHeight = row.cellHeight;

            that.rows.canNotify = false;
            row.height = null;

            if (that.behavior.rowResizeMode === 'split') {
                const nextRow = that._nextRow(row);
                const offset = parseInt(row.height - newRowHeight + row.cellHeight);

                row.computedHeight = newRowHeight;
                nextRow.computedHeight = parseInt(nextRow.height) + offset;
                nextRow.height = null;
            }
            else {
                row.computedHeight = newRowHeight;
            }

            that.rows.canNotify = true;

            that._rowResizeStartLine.parentNode.removeChild(that._rowResizeStartLine);
            that._rowResizeLine.parentNode.removeChild(that._rowResizeLine);
            if (that.appearance.showResizeTooltips) {
                that._rowResizeTooltip.parentNode.removeChild(that._rowResizeTooltip);
            }

            if (that._rowToResize.header) {
                that._rowToResize.header.style.cursor = '';
            }
            that._rowResizeLine = null;
            that._rowToResize = null;
            that._rowToResizeId = null;

            that.refresh();

            that.$.fireEvent('rowResize', {
                'row': row,
                'oldHeight': oldHeight,
                'height': newRowHeight
            });

            return;
        }

        if (!that._columnToResizeElement || !that._columnResizeLine) {
            return;
        }

        const column = that.columnByDataField[that._columnToResizeDataField];
        const columnRect = that._columnToResizeRect;
        let newColumnWidth = boundingRect.left + parseInt(that._columnResizeLine.style.left) - columnRect.left + that.scrollLeft;
        const oldWidth = column.width;

        if (that.rightToLeft) {
            newColumnWidth = boundingRect.left - parseFloat(that._columnResizeLine.style.left) + columnRect.right - that.scrollLeft - that._scrollView.vScrollBar.offsetWidth;
        }

        if (newColumnWidth < column.minWidth) {
            newColumnWidth = column.minWidth;
        }

        that.columns.canNotify = false;
        if (that.behavior.columnResizeMode === 'split') {
            const nextColumn = that._nextColumn(column);
            const offset = parseInt(column.computedWidth - newColumnWidth);

            column.width = newColumnWidth;
            nextColumn.width = parseInt(nextColumn.computedWidth) + offset;
        }
        else {
            column.width = newColumnWidth;
        }
        that.columns.canNotify = true;
        that._columnResizeLine.parentNode.removeChild(that._columnResizeLine);
        that._columnResizeLine = null;
        that._columnResizeStartLine.parentNode.removeChild(that._columnResizeStartLine);
        if (that._columnResizeTooltip.parentNode) {
            that._columnResizeTooltip.parentNode.removeChild(that._columnResizeTooltip);
        }
        that._columnResizeStartLine = null;
        that._columnToResizeElement.style.cursor = '';
        that._columnToResizeElement.sortButton.style.cursor = '';
        that._columnToResizeElement.filterButton.style.cursor = '';

        that._columnToResizeElement = null;
        that._columnToResizeRect = null;
        that._columnToResizeDataField = null;
        that._columnResizeTooltip = null;

        that.refresh();

        that.$.fireEvent('columnResize', {
            'column': column,
            'oldWidth': oldWidth,
            'width': newColumnWidth
        });

    }

    _columnDownResizeHandler() {
        const that = this;

        const columnRect = that._columnToResizeRect;
        const columnHeaderRect = that.getBoundingRect(that.$.columnHeader);

        if (that._dragDetails) {
            return;
        }

        const createLine = function () {
            const resizeLine = document.createElement('div');

            resizeLine.classList.add('lw-grid-resize-line');

            if (that.rightToLeft) {
                resizeLine.style.left = -columnHeaderRect.left + columnRect.left + 'px';
            }
            else {
                resizeLine.style.left = -columnHeaderRect.left + columnRect.right + 'px';
            }
            resizeLine.style.top = -columnHeaderRect.top + columnRect.top + 'px';
            resizeLine.style.height = 'calc(100% - ' + resizeLine.style.top + ')';
            resizeLine.style.cursor = 'col-resize';

            return resizeLine;
        }

        const resizeTooltip = document.createElement('div');

        resizeTooltip.classList.add('lw-grid-resize-tooltip');

        that._columnResizeTooltip = resizeTooltip;
        that._columnResizeTooltip.style.left = -columnHeaderRect.left + columnRect.right + 'px';
        if (that.rightToLeft) {
            that._columnResizeTooltip.style.left = -columnHeaderRect.left + columnRect.left + 'px';
        }

        that._columnResizeTooltip.innerHTML = that.localize('columnResizeTooltip', { value: columnRect.width });

        that._columnResizeLine = createLine();
        that._columnResizeStartLine = createLine();

        if (that.behavior.columnResizeMode === 'growAndShrink') {
            that.classList.add('lw-grid-resize-mode');
            that.classList.add('lw-grid-column-resize-mode');
            that.$.root.classList.add('lw-grid-resize-mode');
        }

        if (that.appearance.showResizeTooltips) {
            that.$.root.appendChild(that._columnResizeTooltip);
        }

        that.$.root.appendChild(that._columnResizeLine);
        that.$.root.appendChild(that._columnResizeStartLine);

        that._overlay = document.createElement('div');
        that._overlay.classList.add('lw-grid-overlay');
        that._overlay.style.cursor = 'col-resize';
        that.$.root.appendChild(that._overlay);
    }

    _columnMoveResizeHandler(event) {
        const that = this;
        const columnResizeBreakpoint = 5;

        if (that._dragDetails) {
            return;
        }

        const updateTooltip = function (boundingRect) {
            const columnRect = that._columnToResizeRect;
            let newColumnWidth = boundingRect.left + parseFloat(that._columnResizeLine.style.left) - columnRect.left + that.scrollLeft;

            if (that.rightToLeft) {
                newColumnWidth = boundingRect.left - parseFloat(that._columnResizeLine.style.left) + columnRect.right - that.scrollLeft - that._scrollView.vScrollBar.offsetWidth;
            }

            const column = that.columnByDataField[that._columnToResizeDataField];

            if (newColumnWidth < column.minWidth) {
                newColumnWidth = column.minWidth;
            }

            if (that.appearance.showResizeTooltips) {
                that._columnResizeTooltip.innerHTML = that.localize('columnResizeTooltip', { value: parseInt(newColumnWidth) });
            }
        }

        if (that._columnResizeLine) {
            const column = that.columnByDataField[that._columnToResizeDataField];
            const columnRect = that._columnToResizeRect;
            const minWidth = column.minWidth;
            const maxWidth = column.maxWidth;
            const nextColumn = that._nextColumn(column);
            const boundingRect = that.getBoundingRect(that);

            if (!that.rightToLeft) {
                if (event.pageX < boundingRect.left) {
                    return;
                }

                if (that.behavior.columnResizeMode === 'split' && nextColumn) {
                    if (event.pageX >= boundingRect.left + nextColumn.left + nextColumn.computedWidth - nextColumn.minWidth - that.scrollLeft) {
                        that._columnResizeLine.style.left = -boundingRect.left + boundingRect.left + nextColumn.computedWidth + nextColumn.left - nextColumn.minWidth - that.scrollLeft + 'px';
                        updateTooltip(boundingRect);
                        return;
                    }
                }

                if (columnRect.left + minWidth - that.scrollLeft >= event.pageX) {
                    that._columnResizeLine.style.left = -boundingRect.left + columnRect.left + minWidth - that.scrollLeft + 'px';

                    updateTooltip(boundingRect);
                    return;
                }

                if (columnRect.left + maxWidth - that.scrollLeft <= event.pageX) {
                    that._columnResizeLine.style.left = -boundingRect.left + columnRect.left + maxWidth - that.scrollLeft + 'px';
                    updateTooltip(boundingRect);
                    return;
                }

                that._columnResizeLine.style.left = -boundingRect.left + event.pageX + 'px';
                updateTooltip(boundingRect);
            }
            else {
                if (event.pageX > boundingRect.right) {
                    return;
                }

                if (that.behavior.columnResizeMode === 'split' && nextColumn) {
                    if (event.pageX <= that.offsetWidth - that.scrollLeft - nextColumn.left - nextColumn.computedWidth + nextColumn.minWidth) {
                        that._columnResizeLine.style.left = that.offsetWidth - that.scrollLeft - nextColumn.left - nextColumn.computedWidth + nextColumn.minWidth + 'px';
                        updateTooltip(boundingRect);
                        return;
                    }
                }

                if (columnRect.right - minWidth - that.scrollLeft <= event.pageX) {
                    that._columnResizeLine.style.left = -boundingRect.left + columnRect.right - minWidth - that.scrollLeft + 'px';

                    updateTooltip(boundingRect);
                    return;
                }

                if (columnRect.left + maxWidth - that.scrollLeft >= event.pageX) {
                    that._columnResizeLine.style.left = -boundingRect.left + columnRect.right - maxWidth - that.scrollLeft + 'px';
                    updateTooltip(boundingRect);
                    return;
                }

                that._columnResizeLine.style.left = -boundingRect.left + event.pageX + 'px';
                updateTooltip(boundingRect);
            }
        }
        else {
            const that = this;

            if (event.composedPath && event.composedPath().indexOf(this) === -1) {
                return;
            }

            const elements = (that.enableShadowDOM ? that.shadowRoot : that.getRootNode()).elementsFromPoint(event.clientX, event.clientY);

            let columnDataField = null;
            let columnElement = null;

            if (that._columnResizeLine) {
                return;
            }

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];

                if (element.hasAttribute('data-field') && element.hasAttribute('header')) {
                    columnDataField = element.getAttribute('data-field');
                    columnElement = element;
                    break;
                }
            }

            if (that._columnToResizeElement) {
                that._columnToResizeElement.style.cursor = '';
                that._columnToResizeElement.sortButton.style.cursor = '';
                that._columnToResizeElement.filterButton.style.cursor = '';

                that._columnToResizeElement = null;
            }

            if (columnDataField) {
                const columnRight = !that.rightToLeft ? columnElement.getBoundingClientRect().right : columnElement.getBoundingClientRect().left;

                columnElement.style.cursor = ''
                columnElement.sortButton.style.cursor = '';
                columnElement.filterButton.style.cursor = '';

                if (columnRight - columnResizeBreakpoint <= event.clientX && event.clientX <= columnRight + columnResizeBreakpoint) {
                    const column = that.columnByDataField[columnDataField];

                    if (!column || (column && !column.allowResize)) {
                        return;
                    }

                    const isLastColumn = that._isLastVisibleColumn(column);

                    if (that.behavior.columnResizeMode === 'split' && isLastColumn) {
                        return;
                    }

                    columnElement.style.cursor = 'col-resize';
                    columnElement.sortButton.style.cursor = 'col-resize';
                    columnElement.filterButton.style.cursor = 'col-resize';

                    that._columnToResizeRect = that.getBoundingRect(columnElement);
                    that._columnToResizeElement = columnElement;
                    that._columnToResizeDataField = columnDataField;
                }
            }
        }
    }

    _rowMoveResizeHandler(event) {
        const that = this;

        const elements = (that.enableShadowDOM ? that.shadowRoot : that.getRootNode()).elementsFromPoint(event.clientX, event.clientY);
        const rowResizeBreakpoint = 5;
        const resizeLineHeight = 1;

        let rowId = null;
        let rowElement = null;

        if (that._rowResizeLine) {
            const scrollViewTop = that._offsetTop(that.$.scrollView);
            const scrollViewBounds = {
                top: scrollViewTop, bottom: that.$.scrollView.offsetHeight + scrollViewTop
            };

            if (event.pageY <= scrollViewBounds.top) {
                return;
            }

            if (event.pageY >= scrollViewBounds.bottom) {
                return;
            }

            const updateTooltip = function () {
                const newRowHeight = row.cellHeight + parseFloat(that._rowResizeLine.style.top) - parseFloat(that._rowResizeStartLine.style.top);

                if (that.appearance.showResizeTooltips) {
                    that._rowResizeTooltip.innerHTML = that.localize('rowResizeTooltip', { value: parseInt(newRowHeight) });
                }
            }


            const row = that.rowById[that._rowToResizeId];
            const nextRow = that._nextRow(row);
            const rowBounds = that._rowToResizeBounds;

            const minHeight = row.minHeight;
            const maxHeight = row.maxHeight;


            if (that.behavior.rowResizeMode === 'split' && nextRow) {
                if (rowBounds.bottom + nextRow.height - nextRow.minHeight <= event.pageY) {
                    that._rowResizeLine.style.top = rowBounds.bottom + nextRow.height - nextRow.minHeight - scrollViewTop + 'px';
                    updateTooltip();
                    return;
                }
            }

            if (rowBounds.top + minHeight + rowResizeBreakpoint >= event.pageY) {
                that._rowResizeLine.style.top = rowBounds.top + minHeight + rowResizeBreakpoint - scrollViewTop + 'px';
                updateTooltip();
                return;
            }

            if (rowBounds.top + maxHeight >= event.pageY - scrollViewTop) {
                that._rowResizeLine.style.top = rowBounds.top + maxHeight + rowResizeBreakpoint - scrollViewTop + 'px';
                updateTooltip();
                return;
            }

            that._rowResizeLine.style.top = -scrollViewTop + event.pageY - resizeLineHeight + 'px';
            updateTooltip();
            return;
        }
        else {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];

                if (element.hasAttribute('data-id') && element.hasAttribute('header')) {
                    rowElement = element;
                    rowId = element.getAttribute('data-id');
                    break;
                }
            }

            if (that._rowToResize) {
                that._rowToResize.style.cursor = '';
                that._rowToResize = null;
            }

            if (rowId !== null) {
                const rowBottom = that._offsetTop(rowElement) + rowElement.offsetHeight;

                rowElement.style.cursor = '';

                if (rowBottom - rowResizeBreakpoint <= event.clientY && event.clientY <= rowBottom + rowResizeBreakpoint) {
                    const row = that.rowById[rowId];

                    if (!row || (row && !row.allowResize)) {
                        return;
                    }

                    if (row.header) {
                        row.header.style.cursor = 'row-resize';
                    }

                    const top = that._offsetTop(rowElement);

                    that._rowToResizeBounds = {
                        top: top, bottom: rowElement.offsetHeight + top, height: rowElement.offsetHeight
                    };
                    that._rowToResize = rowElement;
                    that._rowToResizeId = rowId;
                }
            }
        }
    }

    _rowDownResizeHandler() {
        const that = this;

        const rowBounds = that._rowToResizeBounds;

        const createLine = function () {
            const resizeLine = document.createElement('div');

            resizeLine.classList.add('lw-grid-resize-line', 'row');

            resizeLine.style.width = that.$.scrollView.offsetWidth - that._rowToResize.offsetLeft + 'px';
            resizeLine.style.left = '0px';
            resizeLine.style.top = -that._offsetTop(that.$.scrollView) + rowBounds.bottom + 'px';
            resizeLine.style.cursor = 'row-resize';

            return resizeLine;
        }

        const resizeTooltip = document.createElement('div');

        resizeTooltip.classList.add('lw-grid-resize-tooltip');

        that._rowResizeTooltip = resizeTooltip;
        that._rowResizeTooltip.style.top = -that._offsetTop(that.$.scrollView) + rowBounds.bottom + 'px';
        that._rowResizeTooltip.innerHTML = that.localize('rowResizeTooltip', { value: rowBounds.height });
        that._rowResizeTooltip.style.right = '20px';
        that._rowResizeTooltip.style.bottom = 'initial';

        if (that.behavior.rowResizeMode === 'growAndShrink') {
            that.classList.add('lw-grid-resize-mode');
            that.classList.add('lw-grid-row-resize-mode');
            that.$.root.classList.add('lw-grid-resize-mode');
        }

        that._rowResizeLine = createLine();
        that._rowResizeStartLine = createLine();
        that._overlay = document.createElement('div');
        that._overlay.classList.add('lw-grid-overlay');
        that._overlay.style.cursor = 'row-resize';

        that.$.root.appendChild(that._overlay);

        that.$.scrollView.appendChild(that._rowResizeLine);
        that.$.scrollView.appendChild(that._rowResizeStartLine);
        if (that.appearance.showResizeTooltips) {
            that.$.scrollView.appendChild(that._rowResizeTooltip);
        }
    }

    _rowResizeHandler(event) {
        const that = this;

        let clientX = event.clientX;
        let clientY = event.clientY;

        if (clientX === undefined || clientY === undefined) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }

        const elements = (that.enableShadowDOM ? that.shadowRoot : that.getRootNode()).elementsFromPoint(clientX, clientY);
        let rowId = null;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.getAttribute('data-id')) {
                rowId = element.getAttribute('data-id');
            }
        }

        if (rowId !== null) {
            if (that._rowToResize && !that._rowResizeLine) {
                that._rowDownResizeHandler(event);

                return;
            }
        }
    }
});