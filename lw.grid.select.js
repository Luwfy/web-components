
LW.Utilities.Assign( 'Grid.Select', class Select {
    _refreshSelection() {
        const that = this;

        if ( that.selection.enabled ) {
            const column = that._selectionColumn;

            column.refresh();
        }

        that._refreshCellSelectionRect();
    }

    _toggleColumnSelection( column ) {
        const that = this;

        if ( !that.selection.enabled || that.selection.checkBoxes.selectAllMode === 'none' ) {
            if ( that._inputOverlay && that._inputOverlay.parentNode ) {
                that._inputOverlay.parentNode.removeChild( that._inputOverlay );
            }

            return;
        }


        let selected = column.element.getAttribute( 'selected' );

        if ( selected === 'indeterminate' ) {
            selected = true;
        }
        else if ( selected === '' ) {
            selected = false;
        }
        else {
            selected = true;
        }

        let visibleRows = that._recyclingRows;

        that._selectionColumn._selecting = true;

        that.beginUpdate();

        for ( let i = 0; i < visibleRows.length; i++ ) {
            const row = visibleRows[ i ];

            row.selected = selected;
        }

        that._selectionColumn._selecting = false;

        that.endUpdate( false );
        that._recycle( false );

        if ( that.selection.enabled && that.selection.checkBoxes.enabled && that.selection.checkBoxes.selectAllMode !== 'none' ) {
            const element = column.element;
            const input = element.querySelector( '.lw-input' );

            if ( that._inputOverlay ) {
                if ( that._inputOverlay.parentNode !== that.$.columnHeader ) {
                    if ( that._inputOverlay.parentNode ) {
                        that._inputOverlay.parentNode.removeChild( that._inputOverlay );
                    }

                    that._inputOverlay = document.createElement( 'div' );
                    that.$.columnHeader.appendChild( that._inputOverlay );
                }
            }
            else {
                that._inputOverlay = document.createElement( 'div' );
                that.$.columnHeader.appendChild( that._inputOverlay );
            }

            that._inputOverlay.column = column;

            that._inputOverlay.onpointerdown = function () {
                if ( !that._inputOverlay ) {
                    that._inputOverlay.onpointerdown = null;
                }

                const column = that._inputOverlay.column;
                that._inputOverlay.classList.remove( 'lw-animate' );
                that._selectionColumn._selecting = true;

                that.beginUpdate();

                let selected = column.element.hasAttribute( 'selected' );

                let visibleRows = that._recyclingRows;
                for ( let i = 0; i < visibleRows.length; i++ ) {
                    const row = visibleRows[ i ];

                    row.selected = !selected;
                }


                that._selectionColumn._selecting = false;

                const overlay = that._inputOverlay;

                that.endUpdate( false );
                that._recycle();

                that.$.columnHeader.appendChild( overlay );
                that._inputOverlay = overlay;
                that._inputOverlay.classList.add( 'lw-animate' );
                return false;
            }

            that._inputOverlay.classList.add( 'lw-input-overlay' );
            that._inputOverlay.classList.add( 'lw-input-overlay-column' );
            if ( that.appearance.allowCheckBoxesSelectionAnimation ) {
                that._inputOverlay.classList.add( 'lw-animate' );
            }
            that._inputOverlay.style.top = ( element.offsetHeight - input.offsetHeight ) / 4 + 1 + 'px';

            const left = that._selectionColumn.element.parentElement.offsetLeft + that._selectionColumn.element.offsetLeft;

            if ( that.rightToLeft ) {
                that._inputOverlay.style.right = left + 'px';
            }
            else {
                that._inputOverlay.style.left = left + 'px';
            }

            that._inputOverlay.style.height = element.offsetWidth + 'px';
            that._inputOverlay.style.width = element.offsetWidth + 'px';
            that._inputOverlay.onmousedown = null;

            that._inputOverlay.classList.add( 'lw-input-overlay-on' );

            that._selectionColumn.refresh();
        }
    }

    _refreshCheckBoxColumnSelection() {
        const that = this;

        if ( that.selection.enabled && that.selection.checkBoxes.enabled ) {
            const element = that._selectionColumn.element;

            if ( that.selection.checkBoxes.selectAllMode === 'none' ) {
                element.removeAttribute( 'checkbox' );
                element.label.classList.remove( 'lw-input' );
            }
            else {
                element.setAttribute( 'checkbox', '' );
                element.label.classList.add( 'lw-input' );
            }

            that._selectionColumn.refresh();
        }
    }

    _handleExtendedRowSelection( row, event ) {
        const that = this;

        if ( !row ) {
            return;
        }

        let visibleRows = that._recyclingRows;

        if ( that.paging.enabled && that.selection.selectAllMode === 'page' ) {
            visibleRows = visibleRows.slice( that.paging.pageIndex * that.paging.pageSize, ( that.paging.pageIndex + 1 ) * that.paging.pageSize );
        }

        if ( event && !event.ctrlKey ) {
            that._selection.rows = [];
        }

        if ( event && !event.shiftKey ) {
            that._rangeSelectionStartRow = row;
            that._rangeSelectionEndRow = row;
        }

        if ( event && event.shiftKey ) {
            that._rangeSelectionEndRow = row;

            const startIndex = visibleRows.indexOf( that._rangeSelectionStartRow );
            const endIndex = visibleRows.indexOf( that._rangeSelectionEndRow );
            const minIndex = Math.min( startIndex, endIndex );
            const maxIndex = Math.max( startIndex, endIndex );

            if ( startIndex === -1 || endIndex === -1 ) {
                return;
            }

            for ( let i = minIndex; i <= maxIndex; i++ ) {
                const visibleRow = visibleRows[ i ];

                if ( visibleRow.allowSelect ) {
                    visibleRow.setProperty( 'selected', true );
                }
            }
        }
        else {
            if ( row.allowSelect !== false) {
                if ( event && event.ctrlKey ) {
                    if ( row.selected === null ) {
                        row.setProperty( 'selected', true );
                    }
                    else {
                        row.setProperty( 'selected', !row.selected );
                    }
                }
                else {
                    row.setProperty( 'selected', true );
                }
            }
        }
    }

    _setSelection( rowId, dataField, event ) {
        const that = this;

        if ( !that.selection.enabled ) {
            return;
        }

        that._lastColumnSelectionRange = null;
        that._lastRowSelectionRange = null;
        that.closeMenu();

        if ( rowId === null && dataField === null ) {
            that.clearSelection();
            return;
        }

        const clearSelection = function () {
            if ( event && !event.ctrlKey && !event.shiftKey || that.selection.mode === 'one' ) {
                if ( that.selection.mode !== 'many' ) {
                    for ( let rowId in that._selection.rows ) {
                        const row = that.rowById[ rowId ];
                        row.canNotify = false;
                        row.selected = false;
                        row.canNotify = true;
                    }

                    that._selection.rows = [];
                    that._selection.columns = [];
                    that._selection.cells = [];
                }

                that._selection.focusedCell = null;
            }

            if ( that._selection.selectionRect ) {
                const selectionRect = that._selection.selectionRect;

                selectionRect.parentNode.removeChild( selectionRect );

                const eventNames = {
                    down: 'pointerdown',
                    move: 'pointermove',
                    up: 'pointerup'
                };

                if ( LW.Utilities.Core.isMobile ) {
                    eventNames.down = 'touchstart';
                    eventNames.move = 'touchmove';
                    eventNames.up = 'touchend';
                }

                document.removeEventListener( eventNames.move, selectionRect.onMove );
                document.removeEventListener( eventNames.up, selectionRect.onUp );
                document.removeEventListener( eventNames.down, selectionRect.onDown );

                that._selection.selectionRect = null;
            }
        }

        that.beginUpdate();

        const column = that.columnByDataField[ dataField ];

        const selectRow = () => {
            const row = that.rowById[ rowId ];

            if ( row  && (row.allowSelect || (row.allowSelect === null && !event))) {
                clearSelection();
                that._selectRow( rowId, event );
            }
        }

        if ( that.selection.allowCellSelection && rowId !== undefined && rowId !== null && column && !column.autoGenerated ) {
            const row = that.rowById[ rowId ];
            let cell = row.getCell( dataField );

            const parentCell = that._getParentCell( row, dataField );

            if ( parentCell ) {
                cell = parentCell.row.getCell( parentCell.column.dataField );
            }

            clearSelection();

            if ( event && !event.ctrlKey ) {
                that._selection.rows = [];
                that._selection.columns = [];

                if ( that.selection.mode !== 'many' ) {
                    that._selection.cells = [];
                }
            }

            if ( that.selection.mode === 'extended' ) {
                if ( event && event.ctrlKey ) {
                    cell.selected = !cell.selected;
                }
                else {
                    cell.selected = true;
                }
            }
            else {
                if ( that.selection.mode === 'one' ) {
                    cell.selected = true;
                }
                else {
                    cell.selected = !cell.selected;
                }
            }

            if ( event && !event.shiftKey || !that._selection.focusedCell ) {
                that._selection.focusedCell = cell;
            }

            if ( event && ( event.shiftKey || that._selection.focusedCell === cell ) && that.selection.mode === 'extended' ) {
                if ( !parentCell ) {
                    that._renderCellSelectionRect( cell.row, cell.column, cell.row, cell.column );
                }
                else {
                    that._renderCellSelectionRect( cell.row, cell.column, parentCell.endRow, parentCell.endColumn );
                }
            }
        }
        else if ( that.selection.allowRowHeaderSelection && rowId !== undefined && rowId !== null && that.columnByDataField[ dataField ] === undefined ) {
            selectRow();
        }
        else if ( that.selection.checkBoxes.enabled && rowId !== undefined && rowId !== null && dataField === '_checkBoxColumn' && that.columnByDataField[ dataField ] === undefined ) {
            selectRow();
        }
        else if ( rowId !== undefined && rowId !== null && ( dataField === undefined || that.columnByDataField[ dataField ] !== undefined ) && that.selection.allowRowSelection ) {
            selectRow();
        }
        else if ( that.selection.allowColumnHeaderSelection && column ) {
            clearSelection();
            that._selectColumn( dataField, event || new KeyboardEvent( 'keydown' ));
        }

        that.endUpdate( false );
        that._recycle();

        if ( rowId !== undefined && rowId !== null && !column ) {
            that._renderInputOverlay( rowId, event );
        }

        that.__selectionStarted = new Date();
    }

    _renderCellSelectionRect( beginRow, beginColumn, endRow, endColumn ) {
        const that = this;

        let visibleRows = that._recyclingRows;

        const startRowIndex = visibleRows.indexOf( beginRow );
        const endRowIndex = visibleRows.indexOf( endRow );

        //const startColumnIndex = that.columns.indexOf(beginColumn);
        //const endColumnIndex = that.columns.indexOf(endColumn);

        if ( startRowIndex >= 0 && endRowIndex >= 0 ) {
            if ( !that._selection.selectionRect ) {
                const createSelectionRect = function ( canResize ) {
                    const fillContent = document.createElement( 'div' );
                    const borderContent = document.createElement( 'div' );
                    const overlay = document.createElement( 'div' );

                    overlay.classList.add( 'lw-selection-overlay' );
                    overlay.appendChild( borderContent );

                    borderContent.appendChild( fillContent );
                    fillContent.classList.add( 'lw-selection-overlay-content' );
                    borderContent.classList.add( 'lw-selection-overlay-border-content' );

                    if ( that.selection.allowCellDragSelectionHandle && canResize ) {
                        borderContent.classList.add( 'handle' );
                    }

                    that.$.scrollView.appendChild( overlay );

                    return overlay;
                }

                const selectionRect = that._selection.selectionRect = createSelectionRect( true );

                if ( that.selection.allowCellDragSelectionHandle ) {
                    let capturePoint = null;
                    let isHorizontalDrag = null;
                    let isVerticalDrag = null;

                    selectionRect.onMove = function ( event ) {
                        const selectionRect = that._selection.selectionRect;
                        let clientX = event.clientX;
                        let clientY = event.clientY;

                        if ( event.touches ) {
                            clientX = event.touches[ 0 ].clientX;
                            clientY = event.touches[ 0 ].clientY;
                        }

                        const getElements = function ( event ) {
                            const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );
                            let columnDataField = null;

                            for ( let i = 0; i < elements.length; i++ ) {
                                const element = elements[ i ];

                                if ( element.getAttribute( 'data-field' ) ) {
                                    columnDataField = element.getAttribute( 'data-field' );
                                    break;
                                }
                            }

                            let row = null;

                            for ( let i = 0; i < elements.length; i++ ) {
                                const element = elements[ i ];

                                if ( element.getAttribute( 'data-id' ) ) {
                                    row = element.row;
                                    break;
                                }
                            }

                            return {
                                column: that.columnByDataField[ columnDataField ], row: row
                            };
                        }

                        if ( selectionRect.capturedDrag ) {
                            const eventData = {
                                clientX: clientX, clientY: clientY
                            };

                            let beginElements = getElements( eventData );
                            let row = getElements( { clientX: clientX, clientY: clientY + selectionRect.top } ).row;
                            let column = getElements( { clientX: clientX + selectionRect.left, clientY: clientY } ).column;

                            if ( !row ) {
                                row = visibleRows[ visibleRows.length - 1 ];
                            }

                            if ( !column ) {
                                column = beginElements.column;
                            }

                            if ( row && column && beginElements.row && beginElements.column ) {
                                selectionRect.row = beginElements.row;
                                selectionRect.column = beginElements.column;
                                selectionRect.endDragRow = selectionRect.endRow = row;
                                selectionRect.endDragColumn = selectionRect.endColumn = column;
                                that._dragSelectionStartDataField = selectionRect.column.dataField;
                                that._dragSelectionStartRow = selectionRect.row;
                                that._selection.focusedCell = selectionRect.row.getCell( selectionRect.column.dataField );
                            }


                            that._resizeSelectionRect();
                            event.preventDefault();
                        }
                        else if ( selectionRect.captured ) {
                            that._dragSelectionStartDataField = that._selection.focusedCell.column.dataField;
                            that._dragSelectionStartRow = that._selection.focusedCell.row;

                            if ( isHorizontalDrag === null && isVerticalDrag === null ) {
                                if ( Math.abs( clientX - capturePoint.left ) >= 30 ) {
                                    isHorizontalDrag = true;
                                }
                                else if ( Math.abs( clientY - capturePoint.top ) >= 30 ) {
                                    isVerticalDrag = true;
                                }
                            }

                            if ( selectionRect.lastPoint && Math.abs( selectionRect.lastPoint.top - clientY ) >= 40 ) {
                                isHorizontalDrag = null;
                                isVerticalDrag = true;
                            }
                            else if ( selectionRect.lastPoint && Math.abs( selectionRect.lastPoint.left - clientX ) >= 40 ) {
                                isVerticalDrag = null;
                                isHorizontalDrag = true;
                            }

                            if ( isHorizontalDrag ) {
                                const endDataField = selectionRect.endDragColumn.dataField;
                                //const endRow = selectionRect.endDragRow;
                                const eventData = {
                                    clientX: clientX, clientY: capturePoint.top - 5
                                };
                                const elements = getElements( eventData );

                                if ( elements.row && elements.column ) {
                                    selectionRect.endDragRow = selectionRect.endRow;
                                    selectionRect.endDragColumn = elements.column;

                                    if ( selectionRect.endDragColumn.dataField !== endDataField ) {
                                        selectionRect.lastPoint = {
                                            left: clientX, top: clientY
                                        };
                                    }

                                    that._resizeSelectionRect();
                                }
                            }
                            else if ( isVerticalDrag ) {
                                //const endColumn = selectionRect.endDragColumn;
                                const endRow = selectionRect.endDragRow;
                                const eventData = {
                                    clientX: capturePoint.left - 5, clientY: clientY
                                };
                                const elements = getElements( eventData );

                                if ( elements.row && elements.column ) {
                                    selectionRect.endDragRow = elements.row;
                                    selectionRect.endDragColumn = selectionRect.endColumn;

                                    if ( selectionRect.endDragRow.id && selectionRect.endDragRow.id !== endRow.id ) {
                                        selectionRect.lastPoint = {
                                            left: clientX, top: clientY
                                        };
                                    }

                                    that._resizeSelectionRect();
                                }
                            }

                            //    event.preventDefault();
                        }

                        if ( ( selectionRect.captured ) && that.selection.allowDragSelectionAutoScroll ) {
                            if ( that._autoScrollSelectionDragInterval ) {
                                clearInterval( that._autoScrollSelectionDragInterval );
                            }

                            that.selection.isDragging = true;
                            //  event.preventDefault();

                            that._autoScrollSelectionDragInterval = setInterval( function () {
                                const rect = that.$.scrollView.getBoundingClientRect();

                                if ( clientX <= rect.left + 20 ) {
                                    that.scrollLeft -= 15;
                                    that._resizeSelectionRect();
                                }
                                else if ( clientX >= rect.left + rect.width - 20 ) {
                                    that.scrollLeft += 15;
                                    that._resizeSelectionRect();
                                }

                                if ( clientY <= rect.top + 20 ) {
                                    that.scrollTop -= 15;
                                    that._resizeSelectionRect();
                                }
                                else if ( clientY >= rect.top + rect.height - 20 ) {
                                    that.scrollTop += 15;
                                    that._resizeSelectionRect();
                                }
                            }, 5 );
                        }
                    }

                    selectionRect.onUp = function (/*event*/ ) {

                        if ( !selectionRect.captured ) {
                            return;
                        }

                        if ( that._autoScrollSelectionDragInterval ) {
                            clearInterval( that._autoScrollSelectionDragInterval );
                        }

                        if ( !that.editing.editCell && !that.editing.editRow ) {
                            that.focus();
                        }

                        selectionRect.capturedDrag = false;
                        selectionRect.captured = false;
                        isHorizontalDrag = null;
                        isVerticalDrag = null;
                        capturePoint = null;
                        selectionRect.lastPoint = null;

                        const cellValues = selectionRect.cellValues;

                        if ( selectionRect.minRow && selectionRect.maxRow &&
                            selectionRect.maxRow && selectionRect.maxColumn ) {

                            // select cells on mouse up.
                            that._selectCellsRange( selectionRect.minRow, selectionRect.maxRow, selectionRect.minColumn.dataField, selectionRect.maxColumn.dataField );

                            selectionRect.row = selectionRect.minRow;
                            selectionRect.column = selectionRect.minColumn;
                            selectionRect.endColumn = selectionRect.maxColumn;
                            selectionRect.endRow = selectionRect.maxRow;
                            selectionRect.cellValues = cellValues;
                            that._resizeSelectionRect();

                            if ( that.selection.allowCellDragSelectionAutoFill ) {
                                that._pasteSelectedCells( {
                                    row: selectionRect.row,
                                    endRow: selectionRect.endDragRow,
                                    column: selectionRect.column,
                                    endColumn: selectionRect.endColumn
                                },
                                    cellValues
                                );
                            }
                        }

                        selectionRect.endDragColumn = null;
                        selectionRect.endDragRow = null;
                        selectionRect.minColumn = null;
                        selectionRect.minRow = null;
                        selectionRect.maxColumn = null;
                        selectionRect.maxRow = null;
                    }

                    selectionRect.onDown = function ( event ) {
                        if ( selectionRect.captured && !capturePoint ) {
                            let clientX = event.clientX;
                            let clientY = event.clientY;

                            if ( event.touches ) {
                                clientX = event.touches[ 0 ].clientX;
                                clientY = event.touches[ 0 ].clientY;
                            }

                            capturePoint = {
                                left: clientX, top: clientY
                            };
                        }
                    }

                    const eventNames = {
                        down: 'pointerdown',
                        move: 'pointermove',
                        up: 'pointerup'
                    };

                    if ( LW.Utilities.Core.isMobile ) {
                        eventNames.down = 'touchstart';
                        eventNames.move = 'touchmove';
                        eventNames.up = 'touchend';
                    }

                    selectionRect[ 'on' + eventNames.down ] = function ( event ) {
                        const rect = selectionRect.getBoundingClientRect();

                        let clientX = event.clientX;
                        let clientY = event.clientY;

                        if ( event.touches ) {
                            clientX = event.touches[ 0 ].clientX;
                            clientY = event.touches[ 0 ].clientY;
                        }


                        if ( clientX >= rect.right - 5 && clientY >= rect.bottom - 5 ) {
                            selectionRect.captured = true;
                            selectionRect.endDragRow = selectionRect.endRow;
                            selectionRect.endDragColumn = selectionRect.endColumn;
                        }
                        else if ( that.selection.allowCellDragDropSelectionHandle && clientY >= rect.bottom - 5 ) {
                            selectionRect.captured = true;
                            selectionRect.capturedDrag = true;
                            selectionRect.endDragRow = selectionRect.endRow;
                            selectionRect.endDragColumn = selectionRect.endColumn;

                            selectionRect.left = selectionRect.endColumn.left - selectionRect.column.left;
                            selectionRect.top = selectionRect.endRow.top - selectionRect.row.top;
                        }
                        else {
                            if ( !selectionRect.captured ) {
                                that._rowDownHandler( event );
                            }
                        }
                    }

                    document.addEventListener( eventNames.move, selectionRect.onMove, { passive: false } );
                    document.addEventListener( eventNames.up, selectionRect.onUp, { passive: false } );
                    document.addEventListener( eventNames.down, selectionRect.onDown, {
                        passive: false
                    } );
                }
            }

            const selectionRect = that._selection.selectionRect;

            selectionRect.row = that._selection.focusedCell.row;
            selectionRect.column = that._selection.focusedCell.column;
            selectionRect.endRow = endRow;
            selectionRect.endDragRow = endRow;
            selectionRect.endColumn = endColumn;
            selectionRect.endDragColumn = endColumn;

            that._refreshCellSelectionRect();
        }
    }

    _resizeSelectionRect() {
        const that = this;

        const selectionRect = that._selection.selectionRect;

        if ( !selectionRect ) {
            return;
        }

        let visibleRows = that._recyclingRows;

        let row = selectionRect.row;
        let endRow = selectionRect.endDragRow;
        let column = selectionRect.column;
        let endColumn = selectionRect.endDragColumn;

        const startRowIndex = visibleRows.indexOf( row );
        const endRowIndex = visibleRows.indexOf( endRow );
        const endSelectedRowIndex = visibleRows.indexOf( selectionRect.endRow );

        const startColumnIndex = that.columns.indexOf( column );
        const endColumnIndex = that.columns.indexOf( endColumn );
        const endSelectedColumnIndex = that.columns.indexOf( selectionRect.endColumn );

        const minRowIndex = Math.min( endSelectedRowIndex, Math.min( startRowIndex, endRowIndex ) );
        const maxRowIndex = Math.max( endSelectedRowIndex, Math.max( startRowIndex, endRowIndex ) );

        const minColumnIndex = Math.min( endSelectedColumnIndex, Math.min( startColumnIndex, endColumnIndex ) );
        const maxColumnIndex = Math.max( endSelectedColumnIndex, Math.max( startColumnIndex, endColumnIndex ) );

        if ( endSelectedRowIndex <= Math.min( startRowIndex, endRowIndex ) ) {
            selectionRect.minRow = selectionRect.endRow;
        }
        else {
            if ( startRowIndex <= endRowIndex ) {
                selectionRect.minRow = row;
            }
            else {
                selectionRect.minRow = endRow;
            }
        }

        if ( endSelectedRowIndex >= Math.max( startRowIndex, endRowIndex ) ) {
            selectionRect.maxRow = selectionRect.endRow;
        }
        else {
            if ( startRowIndex >= endRowIndex ) {
                selectionRect.maxRow = row;
            }
            else {
                selectionRect.maxRow = endRow;
            }
        }


        if ( endSelectedColumnIndex <= Math.min( startColumnIndex, endColumnIndex ) ) {
            selectionRect.minColumn = selectionRect.endColumn;
        }
        else {
            if ( startColumnIndex <= endColumnIndex ) {
                selectionRect.minColumn = column;
            }
            else {
                selectionRect.minColumn = endColumn;
            }
        }

        if ( endSelectedColumnIndex >= Math.max( startColumnIndex, endColumnIndex ) ) {
            selectionRect.maxColumn = selectionRect.endColumn;
        }
        else {
            if ( startColumnIndex >= endColumnIndex ) {
                selectionRect.maxColumn = column;
            }
            else {
                selectionRect.maxColumn = endColumn;
            }
        }

        let top = 0;
        let height = 0;
        let left = 0;
        let width = 0;

        for ( let i = minRowIndex; i <= maxRowIndex; i++ ) {
            const visibleRow = visibleRows[ i ];

            if ( i === minRowIndex ) {
                top = visibleRow.top;
            }

            if ( i === maxRowIndex ) {
                height = visibleRow.top + visibleRow.height - top;
            }

            for ( let j = minColumnIndex; j <= maxColumnIndex; j++ ) {
                const dataField = that.columns[ j ].dataField;
                const cell = visibleRow.getCell( dataField );


                if ( j === minColumnIndex ) {
                    left = cell.column.left;
                }

                if ( j === maxColumnIndex ) {
                    width = cell.column.left + cell.column.computedWidth - left
                }

            }
        }


        selectionRect.style.top = top - that.scrollTop - 1 + 'px';

        if ( that.rightToLeft ) {
            selectionRect.style.right = left - that.scrollLeft + 'px';
        }
        else {
            selectionRect.style.left = left - that.scrollLeft + 'px';
        }

        selectionRect.style.height = height + 1 + 'px';
        selectionRect.style.width = width + 1 + 'px';

    }

    _getPatternValue( rowIndex, columnIndex, selectedValues ) {
        let patternArray = [];
        let index = 0;
        let rowPatterns = [];
        let columnPatterns = [];
        let names = [];
        let dayMonths = [];

        const days = {
            // full day names
            names: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
            // abbreviated day names
            namesAbbr: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
            // shortest day names
            namesShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]
        };

        const months = {
            // full month names (13 months for lunar calendards -- 13th month should be '' if not lunar)
            names: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', '' ],
            // abbreviated month names
            namesAbbr: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '' ]
        };

        const parseValue = function ( value ) {
            if ( value === undefined ) {
                return undefined;
            }


            if ( value.toString().indexOf( 'GMT+' ) >= 0 || value.toString().indexOf( 'GMT-' ) >= 0 ) {
                return undefined;
            }

            if ( isNaN( parseFloat( value ) ) ) {
                if ( days.names.indexOf( value ) >= 0 ) {
                    dayMonths = days.names;

                    return days.names.indexOf( value );
                }

                if ( days.namesAbbr.indexOf( value ) >= 0 ) {
                    dayMonths = days.namesAbbr;

                    return days.namesAbbr.indexOf( value );
                }

                if ( days.namesShort.indexOf( value ) >= 0 ) {
                    dayMonths = days.namesShort;

                    return days.namesShort.indexOf( value );
                }

                if ( months.names.indexOf( value ) >= 0 ) {
                    dayMonths = months.names;

                    return months.names.indexOf( value );
                }

                if ( months.namesAbbr.indexOf( value ) >= 0 ) {
                    dayMonths = months.namesAbbr;

                    return months.namesAbbr.indexOf( value );
                }

                if ( undefined !== value ) {
                    if ( value === null ) {
                        value = '';
                    }

                    const hasNumber = /\d+/.test( value.toString() );

                    if ( hasNumber ) {
                        names.push( value.toString().replace( /[0-9]/, '#' ) );
                        names[ names.length - 1 ] = names[ names.length - 1 ].replace( /[0-9]/g, '' );

                        const result = parseFloat( value.toString().replace( /\D/g, '' ) );

                        if ( isNaN( result ) ) {
                            return 0;
                        }
                        else {
                            return result;
                        }
                    }
                }

                return undefined;
            }

            const hasLetters = /[A-Za-z]/.test( value.toString() );

            if ( hasLetters ) {
                return undefined;
            }

            return parseFloat( value );
        }

        let columnsCount = 0;

        for ( let rowId in selectedValues ) {
            let row = selectedValues[ rowId ];

            patternArray[ index ] = [];
            columnsCount = 0;

            for ( let columnDataField in row ) {
                let value = parseValue( row[ columnDataField ] );

                if ( value === undefined ) {
                    continue;
                }

                patternArray[ index ].push( value );
                columnsCount++;
            }

            if ( patternArray[ index ].length === 0 ) {
                continue;
            }

            let stepStart = patternArray[ index ][ 0 ];
            let step = 0;

            for ( let i = 0; i < patternArray[ index ].length; i++ ) {
                let prevValue = parseValue( patternArray[ index ][ i - 1 ] );
                let value = parseValue( patternArray[ index ][ i ] );

                if ( i === 0 ) {
                    prevValue = value;
                }

                stepStart += value;
                step += value - prevValue;
            }

            stepStart /= patternArray[ index ].length;
            stepStart -= patternArray[ index ][ 0 ];
            stepStart += patternArray[ index ][ patternArray[ index ].length - 1 ];

            if ( step !== 0 ) {
                step /= ( patternArray[ index ].length - 1 );
            }

            if ( dayMonths.length > 0 || names.length > 0 ) {
                step = 1;
                stepStart = patternArray[ index ][ 0 ];
            }

            if ( patternArray[ index ].length <= 2 ) {
                stepStart = patternArray[ index ][ patternArray[ index ].length - 1 ] + step;
            }

            rowPatterns.push( { step: step, stepStart: stepStart } );
            index++;
        }

        for ( let i = 0; i < columnsCount; i++ ) {
            let stepStart = patternArray[ 0 ][ i ];
            let step = 0;

            for ( let j = 1; j < patternArray.length; j++ ) {
                const prevValue = parseValue( patternArray[ j - 1 ][ i ] );
                const value = parseValue( patternArray[ j ][ i ] );

                stepStart += value;
                step += value - prevValue;
            }

            stepStart /= patternArray.length;
            stepStart -= patternArray[ 0 ][ i ];
            stepStart += patternArray[ patternArray.length - 1 ][ i ];

            if ( step !== 0 ) {
                step /= ( patternArray.length - 1 );
            }

            if ( dayMonths.length > 0 || names.length > 0 ) {
                step = 1;
                stepStart = patternArray[ 0 ][ i ];
            }

            if ( patternArray.length <= 2 ) {
                stepStart = patternArray[ patternArray.length - 1 ][ i ] + step;
            }

            columnPatterns.push( { step: step, stepStart: stepStart } );
        }

        if ( !patternArray[ rowIndex ] ) {
            let startRowIndex = patternArray.length;

            for ( let i = startRowIndex; i <= rowIndex; i++ ) {
                patternArray[ i ] = [];

                for ( let j = 0; j <= columnIndex; j++ ) {
                    if ( !columnPatterns[ j ] ) {
                        columnPatterns[ j ] = columnPatterns[ j - 1 ];
                    }

                    if ( !columnPatterns[ j ] ) {
                        continue;
                    }

                    if ( i === startRowIndex ) {
                        patternArray[ i ][ j ] = columnPatterns[ j ].stepStart;
                    }
                    else {
                        patternArray[ i ][ j ] = patternArray[ i - 1 ][ j ] + columnPatterns[ j ].step;

                        if ( dayMonths.length > 1 && patternArray[ i ][ j ] >= dayMonths.length ) {
                            patternArray[ i ][ j ] = 0;
                        }
                    }
                }
            }

            if ( dayMonths.length > 0 ) {
                return dayMonths[ patternArray[ rowIndex ][ columnIndex ] ];
            }
            else if ( names.length > 0 ) {
                return names[ rowIndex % names.length ].replace( '#', patternArray[ rowIndex ][ columnIndex ] );
            }

            return patternArray[ rowIndex ][ columnIndex ];
        }

        if ( !patternArray[ rowIndex ][ columnIndex ] ) {
            let startColumnIndex = columnsCount;

            for ( let i = startColumnIndex; i <= columnIndex; i++ ) {
                if ( !rowPatterns[ rowIndex ] ) {
                    continue;
                }

                if ( i === startColumnIndex ) {
                    patternArray[ rowIndex ].push( rowPatterns[ rowIndex ].stepStart );
                }
                else {
                    patternArray[ rowIndex ][ i ] = patternArray[ rowIndex ][ i - 1 ] + rowPatterns[ rowIndex ].step;

                    if ( dayMonths.length > 1 && patternArray[ rowIndex ][ i ] >= dayMonths.length ) {
                        patternArray[ rowIndex ][ i ] = 0;
                    }
                }
            }

            if ( dayMonths.length > 0 ) {
                return dayMonths[ patternArray[ rowIndex ][ columnIndex ] ];
            }
            else if ( names.length > 0 ) {
                return names[ rowIndex % names.length ].replace( '#', patternArray[ rowIndex ][ columnIndex ] );
            }

            return patternArray[ rowIndex ][ columnIndex ];
        }

        if ( patternArray[ rowIndex ] && patternArray[ rowIndex ][ columnIndex ] ) {
            if ( names.length > 0 ) {
                return names[ rowIndex % names.length ].replace( '#', patternArray[ rowIndex ][ columnIndex ] );
            }

            return patternArray[ rowIndex ][ columnIndex ];
        }

        return 0;
    }

    _pasteDataType( args ) {
        const that = this;

        const unboundMode = that.dataSource && typeof ( that.dataSource.dataSource ) === 'number';
        const cell = args.cell;
        const value = args.value;

        let dataType = cell.column.dataType;

        if ( !dataType || unboundMode ) {
            if ( isNaN( parseFloat( value ) ) ) {
                dataType = 'string';
            }
            else if ( value instanceof Date ) {
                dataType = 'date';
            }
            else if ( value === 'true' || value === 'false' ) {
                dataType = 'boolean';
            }
            else {
                dataType = 'number';
            }
        }

        return dataType;
    }

    _pasteModeCopy( args ) {
        const that = this;

        const unboundMode = that.dataSource && typeof ( that.dataSource.dataSource ) === 'number';
        const dataType = that._pasteDataType( args );
        const cell = args.cell;
        //const selectedValues = args.selectedValues;
        const value = args.value;
        const dataField = args.dataField;

        if ( dataType === 'string' ) {
            cell.value = value;
        }
        else if ( dataType === 'bool' || dataType === 'boolean' ) {
            if ( value === 1 || value === '1' || value === true || value === 'true' || value === 'TRUE' || value === 'True' ) {
                cell.value = true;
            }
        }
        else if ( dataType === 'date' || dataType === 'time' || dataType === 'dateTime' ) {
            const column = that.columnByDataField[ dataField ];

            if ( unboundMode ) {
                cell.value = value;
            }
            else {
                if ( column && column.dataType !== dataType ) {
                    cell.value = null;
                }
                else {
                    cell.value = value;
                }
            }
        }
        else if ( dataType === 'number' || dataType === 'float' || dataType === 'int' ) {
            const column = that.columnByDataField[ dataField ];

            if ( unboundMode ) {
                cell.value = value;
            }
            else {
                if ( column && column.dataType !== dataType ) {
                    cell.value = null;
                }
                else {
                    if ( value !== null ) {
                        if ( dataType === 'int' || dataType === 'integer' ) {
                            cell.value = parseInt( value );
                        }
                        else {
                            cell.value = parseFloat( value );
                        }
                    }
                    else {
                        cell.value = null;
                    }
                }
            }
        }
    }

    _pasteModeFill( args ) {
        const that = this;

        const unboundMode = that.dataSource && typeof ( that.dataSource.dataSource ) === 'number';
        const dataType = that._pasteDataType( args );
        const cell = args.cell;
        const selectedValues = args.selectedValues;
        const minRowIndex = args.minRowIndex;
        const minColumnIndex = args.minColumnIndex;
        const currentRowIndex = args.currentRowIndex;
        const currentColumnIndex = args.currentColumnIndex;
        const columnDataField = args.dataField;

        let value = args.value;

        if ( dataType === 'string' ) {
            const hasNumber = /\d+/.test( value.toString() );

            if ( hasNumber ) {
                value = that._getPatternValue( currentRowIndex - minRowIndex, currentColumnIndex - minColumnIndex, selectedValues );

                if ( value === undefined ) {
                    if ( selectedValues[ currentRowIndex - minRowIndex ] && selectedValues[ currentRowIndex - minRowIndex ][ currentColumnIndex - minColumnIndex ] ) {
                        value = selectedValues[ currentRowIndex - minRowIndex ][ currentColumnIndex - minColumnIndex ];
                    }
                }
            }
            else {
                value = that._getPatternValue( currentRowIndex - minRowIndex, currentColumnIndex - minColumnIndex, selectedValues );

                if ( value === undefined ) {
                    if ( selectedValues[ currentRowIndex - minRowIndex ] ) {
                        value = selectedValues[ currentRowIndex - minRowIndex ][ currentColumnIndex - minColumnIndex ];
                    }
                    else {
                        value = args.value;
                    }
                }
                else {
                    value = args.value;
                }
            }

            if ( value !== undefined ) {
                cell.value = value;
            }
        }
        else if ( dataType === 'bool' || dataType === 'boolean' ) {
            if ( value === 1 || value === '1' || value === true || value === 'true' || value === 'TRUE' || value === 'True' ) {
                cell.value = true;
            }
        }
        else if ( dataType === 'date' || dataType === 'time' || dataType === 'dateTime' ) {
            const column = that.columnByDataField[ columnDataField ];

            if ( unboundMode ) {
                cell.value = value;
            }
            else {
                if ( column && column.dataType !== dataType ) {
                    cell.value = null;
                }
            }

            if ( selectedValues[ currentRowIndex - minRowIndex ] ) {
                value = selectedValues[ currentRowIndex - minRowIndex ][ currentColumnIndex - minColumnIndex ];

                if ( value !== undefined ) {
                    cell.value = value;
                }
            }
        }
        else if ( dataType === 'number' || dataType === 'float' || dataType === 'int' ) {
            value = that._getPatternValue( currentRowIndex - minRowIndex, currentColumnIndex - minColumnIndex, selectedValues );

            const column = that.columnByDataField[ columnDataField ];

            if ( unboundMode ) {
                cell.value = value;
            }
            else {
                if ( column && column.dataType !== dataType ) {
                    cell.value = null;
                }
                else {
                    if ( value !== null ) {
                        if ( dataType === 'int' || dataType === 'integer' ) {
                            cell.value = parseInt( value );
                        }
                        else {
                            cell.value = parseFloat( value );
                        }
                    }
                    else {
                        cell.value = null;
                    }
                }
            }
        }
    }

    _pasteSelectedCells( selectionRect, selectedValues ) {
        const that = this;

        that.beginUpdate();

        let visibleRows = that._recyclingRows;

        let row = selectionRect.row;
        let endRow = selectionRect.endRow;
        let column = selectionRect.column;
        let endColumn = selectionRect.endColumn;

        const startRowIndex = visibleRows.indexOf( row );
        const endRowIndex = visibleRows.indexOf( endRow );
        const endSelectedRowIndex = visibleRows.indexOf( selectionRect.endRow );

        const startColumnIndex = that.columns.indexOf( column );
        const endColumnIndex = that.columns.indexOf( endColumn );
        const endSelectedColumnIndex = that.columns.indexOf( selectionRect.endColumn );

        const minRowIndex = Math.min( endSelectedRowIndex, Math.min( startRowIndex, endRowIndex ) );
        const maxRowIndex = Math.max( endSelectedRowIndex, Math.max( startRowIndex, endRowIndex ) );

        const minColumnIndex = Math.min( endSelectedColumnIndex, Math.min( startColumnIndex, endColumnIndex ) );
        const maxColumnIndex = Math.max( endSelectedColumnIndex, Math.max( startColumnIndex, endColumnIndex ) );

        let maxCapturedRowIndex = 0;
        let maxCapturedColumnIndex = 0;
        let capturedColumnIndex = 0;
        let capturedRowIndex = 0;

        for ( let rowId in selectedValues ) {
            if ( maxCapturedRowIndex === 0 ) {
                //for (let column in selectedValues[rowId]) {
                //    maxCapturedColumnIndex++;
                //}
                maxCapturedColumnIndex += Object.keys( selectedValues[ rowId ] ).length;
            }
            maxCapturedRowIndex++;
        }


        for ( let i = minRowIndex; i <= maxRowIndex; i++ ) {
            const visibleRow = visibleRows[ i ];

            //let columnIndex = 0;
            capturedColumnIndex = 0;

            for ( let j = minColumnIndex; j <= maxColumnIndex; j++ ) {
                const dataField = that.columns[ j ].dataField;
                const cell = visibleRow.getCell( dataField );

                let currentCapturedRowIndex = 0;

                for ( let rowId in selectedValues ) {
                    if ( currentCapturedRowIndex === capturedRowIndex ) {
                        let currentCapturedColumnIndex = 0;
                        let row = selectedValues[ rowId ];

                        for ( let columnDataField in row ) {
                            if ( capturedColumnIndex === currentCapturedColumnIndex ) {
                                let value = row[ columnDataField ];

                                let canSetValue = true;

                                if ( selectedValues[ visibleRow.id ] ) {
                                    if ( selectedValues[ visibleRow.id ][ dataField ] ) {
                                        canSetValue = false;
                                    }
                                }

                                if ( canSetValue && that.clipboard.autoFillMode !== 'none' ) {
                                    const args = {
                                        value: value, oldValue: cell.value, dataField: columnDataField, id: rowId
                                    };

                                    if ( that.clipboard.onPasteValue ) {
                                        that.clipboard.onPasteValue( args );
                                        cell.value = args.value;
                                    }
                                    else {
                                        args.cell = cell;
                                        args.selectedValues = selectedValues;
                                        args.minRowIndex = minRowIndex;
                                        args.maxRowIndex = maxRowIndex;
                                        args.minColumnIndex = minColumnIndex;
                                        args.maxColumnIndex = maxColumnIndex;
                                        args.currentColumnIndex = j;
                                        args.currentRowIndex = i;

                                        if ( that.clipboard.autoFillMode === 'copy' ) {
                                            that._pasteModeCopy( args );
                                        }
                                        else if ( that.clipboard.autoFillMode === 'fillSeries' ) {
                                            that._pasteModeFill( args );
                                        }
                                    }
                                }
                            }

                            currentCapturedColumnIndex++;
                        }

                    }

                    currentCapturedRowIndex++;
                }

                capturedColumnIndex++;

                if ( capturedColumnIndex >= maxCapturedColumnIndex ) {
                    capturedColumnIndex = 0;
                }
            }

            capturedRowIndex++;

            if ( capturedRowIndex >= maxCapturedRowIndex ) {
                capturedRowIndex = 0;
            }
        }

        that.endUpdate( false );
        that._recycle( false );
    }

    _refreshCellSelectionRect() {
        const that = this;

        const selectionRect = that._selection.selectionRect;

        if ( !selectionRect || ( selectionRect && selectionRect.captured ) ) {
            return;
        }

        let visibleRows = that._recyclingRows;

        let row = selectionRect.row;
        let endRow = selectionRect.endRow;
        let column = selectionRect.column;
        let endColumn = selectionRect.endColumn;

        const startRowIndex = visibleRows.indexOf( row );
        const endRowIndex = visibleRows.indexOf( endRow );

        const startColumnIndex = that.columns.indexOf( column );
        const endColumnIndex = that.columns.indexOf( endColumn );

        let minRowIndex = Math.min( startRowIndex, endRowIndex );
        let maxRowIndex = Math.max( startRowIndex, endRowIndex );

        let minColumnIndex = Math.min( startColumnIndex, endColumnIndex );
        let maxColumnIndex = Math.max( startColumnIndex, endColumnIndex );

        minColumnIndex = Math.max( 0, minColumnIndex );
        minRowIndex = Math.max( 0, minRowIndex );

        const updateMinMax = function ( parentCell ) {
            const rowStartIndex = visibleRows.indexOf( parentCell.row );
            const rowEndIndex = visibleRows.indexOf( parentCell.endRow );
            const rowStartColumnIndex = that.columns.indexOf( parentCell.column );
            const rowEndColumnIndex = that.columns.indexOf( parentCell.endColumn );

            minRowIndex = Math.min( minRowIndex, rowStartIndex );
            minRowIndex = Math.min( minRowIndex, rowEndIndex );
            minRowIndex = Math.max( 0, minRowIndex );

            maxRowIndex = Math.max( maxRowIndex, rowStartIndex );
            maxRowIndex = Math.max( maxRowIndex, rowEndIndex );

            minColumnIndex = Math.min( minColumnIndex, rowStartColumnIndex );
            minColumnIndex = Math.min( minColumnIndex, rowEndColumnIndex );
            minColumnIndex = Math.max( 0, minColumnIndex );

            maxColumnIndex = Math.max( maxColumnIndex, rowStartColumnIndex );
            maxColumnIndex = Math.max( maxColumnIndex, rowEndColumnIndex );
        }

        const parentCell = that._getParentCell( row, column.dataField );
        const parentCell2 = that._getParentCell( row, endColumn.dataField );
        const endParentCell = that._getParentCell( endRow, endColumn.dataField );
        const endParentCell2 = that._getParentCell( endRow, column.dataField );

        if ( parentCell ) {
            updateMinMax( parentCell );
        }

        if ( parentCell2 ) {
            updateMinMax( parentCell2 );
        }

        if ( endParentCell ) {
            updateMinMax( endParentCell );
        }

        if ( endParentCell2 ) {
            updateMinMax( endParentCell2 );
        }

        let top = 0;
        let height = 0;
        let left = 0;
        let width = 0;

        selectionRect.cellValues = [];

        for ( let i = minRowIndex; i <= maxRowIndex; i++ ) {
            const visibleRow = visibleRows[ i ];

            if ( i === minRowIndex ) {
                top = visibleRow.top;

                if ( visibleRow.freeze !== true && visibleRow.freeze !== 'near' ) {
                    top += that.__frozenNearHeight;
                }

                if ( visibleRow.freeze === 'far' ) {
                    top = visibleRow.top + that.__scrollHeight + that.scrollTop - that._scrollView.hScrollBar.offsetHeight;
                }
            }

            if ( i === maxRowIndex ) {
                let lastTop = visibleRow.top;

                if ( visibleRow.freeze === 'far' ) {
                    lastTop = visibleRow.top + that.__scrollHeight + that.scrollTop - that._scrollView.hScrollBar.offsetHeight;
                }

                height = lastTop + visibleRow.height - top;

                if ( visibleRow.freeze !== true && visibleRow.freeze !== 'near' ) {
                    height += that.__frozenNearHeight;
                }

            }

            selectionRect.cellValues[ visibleRow.id ] = [];

            for ( let j = minColumnIndex; j <= maxColumnIndex; j++ ) {
                const dataField = that.columns[ j ].dataField;
                const cell = visibleRow.getCell( dataField );

                selectionRect.cellValues[ visibleRow.id ][ dataField ] = cell.value;

                if ( j === minColumnIndex ) {
                    left = cell.column.left;

                    if ( cell.column.freeze && cell.column.freeze === 'far' ) {
                        left = that.__clientSize.width - that.__frozenFarWidth + left + that.scrollLeft - that._scrollView.vScrollBar.offsetWidth;
                    }
                }

                if ( j === maxColumnIndex ) {
                    let maxLeft = cell.column.left;

                    if ( cell.column.freeze && cell.column.freeze === 'far' ) {
                        maxLeft = that.__clientSize.width - that.__frozenFarWidth + maxLeft + that.scrollLeft - that._scrollView.vScrollBar.offsetWidth;
                    }

                    width = maxLeft + cell.column.computedWidth - left;
                }

                cell.selected = true;
            }
        }

        selectionRect.style.top = top - that.scrollTop - 1 + 'px';
        if ( that.rightToLeft ) {
            selectionRect.style.right = left - that.scrollLeft + 'px';
        }
        else {
            selectionRect.style.left = left - that.scrollLeft + 'px';
        }

        selectionRect.style.height = height + 1 + 'px';
        selectionRect.style.width = width + 1 + 'px';
    }

    _renderInputOverlay( id, event, isSameRow ) {
        const that = this;
        const row = that.rowById[ id ];

        if ( !row ) {
            return;
        }

        if ( (false === row.allowSelect) || row.label ) {
            return;
        }

        if ( event && that.selection.checkBoxes.enabled ) {
            if ( that._inputOverlay && that._inputOverlay.classList.contains( 'lw-input-overlay-column' ) ) {
                if ( that._inputOverlay.parentNode ) {
                    that._inputOverlay.parentNode.removeChild( that._inputOverlay );
                }

                that._inputOverlay = null;
            }

            if ( !that._inputOverlay ) {
                that._inputOverlay = document.createElement( 'div' );
                that.$.scrollView.appendChild( that._inputOverlay );
                that._inputOverlay.classList.add( 'lw-input-overlay' );
            }

            let top = !row.freeze ? that.__frozenNearHeight + row.top : row.top;

            const center = Math.round( ( row.cellHeight - that._selectionColumn.computedWidth ) / 2 );

            const left = that._selectionColumn.element.parentElement.offsetLeft + that._selectionColumn.element.offsetLeft;

            that._inputOverlay.style.left = left + 'px';

            that._inputOverlay.style.height = that._selectionColumn.computedWidth + 'px';
            that._inputOverlay.style.width = that._selectionColumn.computedWidth + 'px';
            that._inputOverlay.style.top = top + center - that.scrollTop + 'px';

            that._inputOverlay.row = row;
            that._inputOverlay.onpointerdown = function () {
                if ( !that._inputOverlay ) {
                    that._inputOverlay.onpointerdown = null;
                }

                const row = that._inputOverlay.row;

                that.beginUpdate();
                row.selected = !row.selected;
                that.endUpdate( false );

                that._recycle();
                that._renderInputOverlay( row.id, event, true );
            }

            if ( that.appearance.allowCheckBoxesSelectionAnimation && isSameRow === undefined ) {
                that._inputOverlay.classList.add( 'lw-animate' );
            }

            requestAnimationFrame( () => {
                if ( that._inputOverlay ) {
                    that._inputOverlay.classList.add( 'lw-input-overlay-on' );
                }
            } );
        }
    }

    _selectRow( id, event ) {
        const that = this;
        const row = that.rowById[ id ];

        if ( !row || !that.selection.enabled ) {
            return;
        }

        if ( row.header && row.header.style.cursor === 'row-resize' ) {
            return;
        }

        if ( event ) {
            if ( !event.shiftKey || !that._selection.focusedCell ) {
                that._selection.focusedCell = row.getCell( that.columns[ 0 ].dataField );
            }
        }

        that._lastRowsSelectionRange = null;

        if ( that.selection.mode === 'extended' ) {
            that._handleExtendedRowSelection( row, event );
        }
        else {
            if ( that.selection.mode === 'one' ) {
                row.selected = true;
            }
            else {
                row.selected = !row.selected;
            }
        }
    }

    _getParentCell( row, dataField ) {
        const that = this;

        let visibleRows = that._recyclingRows;

        for ( let i = 0; i < that._cellsMerge.length; i++ ) {
            const cell = that._cellsMerge[ i ];

            let rows = [];
            let columns = [];

            rows.push( cell.row );

            if ( cell.rowSpan > 1 ) {
                const startRowIndex = visibleRows.indexOf( cell.row );

                if ( startRowIndex >= 0 ) {
                    for ( let r = startRowIndex; r < startRowIndex + cell.rowSpan; r++ ) {
                        if ( visibleRows[ r ] && rows.indexOf( visibleRows[ r ] ) === -1 ) {
                            rows.push( visibleRows[ r ] );
                        }
                    }
                }
            }

            columns.push( cell.column.dataField );

            if ( cell.colSpan > 1 ) {
                const startColumnIndex = that.columns.indexOf( that.columnByDataField[ cell.column.dataField ] );

                for ( let r = startColumnIndex; r < startColumnIndex + cell.colSpan; r++ ) {
                    if ( that.columns[ r ] && columns.indexOf( that.columns[ r ].dataField ) === -1 ) {
                        columns.push( that.columns[ r ].dataField );
                    }
                }
            }

            if ( rows.indexOf( row ) >= 0 && columns.indexOf( dataField ) >= 0 ) {
                return {
                    row: cell.row, column: cell.column, endRow: rows[ rows.length - 1 ], endColumn: that.columnByDataField[ columns[ columns.length - 1 ] ]
                };
            }
        }

        return null;
    }

    _selectCellsRange( startRow, endRow, dataField, endDataField ) {
        const that = this;
        const selectionRect = that._selection.selectionRect;

        if ( that._lastRowsSelectionRange && that._lastRowsSelectionRange.id === startRow.id && that._lastRowsSelectionRange.endId === endRow.id &&
            ( that._lastColumnSelectionRange && that._lastColumnSelectionRange.dataField === dataField && that._lastColumnSelectionRange.endDataField === endDataField ) ) {
            return;
        }

        that.beginUpdate();
        that._clearSelection();

        that._lastRowsSelectionRange = {
            id: startRow.id, endId: endRow.id
        };
        that._lastColumnSelectionRange = {
            dataField: dataField, endDataField: endDataField
        };


        if ( !selectionRect || ( selectionRect && !selectionRect.captured ) ) {
            if ( that._selection.focusedCell ) {
                that._renderCellSelectionRect(
                    that._selection.focusedCell.row, // begin row
                    that._selection.focusedCell.column, // begin column
                    that.rowById[ that._lastRowsSelectionRange.endId ], // end row
                    that.columnByDataField[ that._lastColumnSelectionRange.endDataField ] ); // end column
            }
        }

        let visibleRows = that._recyclingRows;

        let startColumnIndex = -1;
        let endColumnIndex = that.columns.length;

        let startIndex = visibleRows.indexOf( startRow );
        let endIndex = visibleRows.indexOf( endRow );

        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            if ( !column.allowSelect ) {
                continue;
            }

            if ( column.dataField === dataField ) {
                startColumnIndex = i;
            }

            if ( column.dataField === endDataField ) {
                endColumnIndex = i;
            }
        }


        let minIndex = Math.min( startIndex, endIndex );
        let maxIndex = Math.max( startIndex, endIndex );

        let minColumnIndex = Math.min( startColumnIndex, endColumnIndex );
        let maxColumnIndex = Math.max( startColumnIndex, endColumnIndex );

        const updateMinMax = function ( parentCell ) {
            const rowStartIndex = visibleRows.indexOf( parentCell.row );
            const rowEndIndex = visibleRows.indexOf( parentCell.endRow );
            const rowStartColumnIndex = that.columns.indexOf( parentCell.column );
            const rowEndColumnIndex = that.columns.indexOf( parentCell.endColumn );

            minIndex = Math.min( minIndex, rowStartIndex );
            minIndex = Math.min( minIndex, rowEndIndex );

            maxIndex = Math.max( maxIndex, rowStartIndex );
            maxIndex = Math.max( maxIndex, rowEndIndex );

            minColumnIndex = Math.min( minColumnIndex, rowStartColumnIndex );
            minColumnIndex = Math.min( minColumnIndex, rowEndColumnIndex );

            maxColumnIndex = Math.max( maxColumnIndex, rowStartColumnIndex );
            maxColumnIndex = Math.max( maxColumnIndex, rowEndColumnIndex );
        }

        const parentCell = that._getParentCell( startRow, dataField );
        const endParentCell = that._getParentCell( endRow, endDataField );

        if ( parentCell ) {
            updateMinMax( parentCell );
        }

        if ( endParentCell ) {
            updateMinMax( endParentCell );
        }

        if ( maxIndex < 0 || minIndex < 0 ) {
            that.endUpdate( false );
            that._recycle();
            return;
        }

        for ( let i = minIndex; i <= maxIndex; i++ ) {
            const row = visibleRows[ i ];

            if ( !row.allowSelect ) {
                continue;
            }

            for ( let j = 0; j < that.columns.length; j++ ) {
                const column = that.columns[ j ];

                if ( !column.allowSelect ) {
                    continue;
                }

                if ( j >= minColumnIndex && j <= maxColumnIndex ) {
                    const cell = row.getCell( column.dataField );

                    cell.selected = true;
                }
            }
        }

        that.endUpdate( false );
        that._recycle();
    }

    _selectRowsRange( startRow, endRow ) {
        const that = this;

        if ( that._lastRowsSelectionRange && that._lastRowsSelectionRange.id === startRow.id && that._lastRowsSelectionRange.endId === endRow.id ) {
            return;
        }

        that.beginUpdate();
        that._clearSelection();

        that._lastRowsSelectionRange = {
            id: startRow.id, endId: endRow.id
        };

        let visibleRows = that._recyclingRows;

        const startIndex = visibleRows.indexOf( startRow );
        const endIndex = visibleRows.indexOf( endRow );
        const minIndex = Math.min( startIndex, endIndex );
        const maxIndex = Math.max( startIndex, endIndex );

        if ( maxIndex < 0 ) {
            that.endUpdate( false );
            that._recycle();
            return;
        }

        for ( let i = minIndex; i <= maxIndex; i++ ) {
            const visibleRow = visibleRows[ i ];

            if ( !visibleRow ) {
                continue;
            }

            if ( !visibleRow.allowSelect ) {
                continue;
            }

            visibleRow.selected = true;
        }

        that.endUpdate( false );
        that._recycle();
    }

    _selectColumnsRange( dataField, endDataField ) {
        const that = this;

        if ( that._lastColumnSelectionRange && that._lastColumnSelectionRange.dataField === dataField && that._lastColumnSelectionRange.endDataField === endDataField ) {
            return;
        }

        that.beginUpdate();
        that._clearSelection();

        that._lastColumnSelectionRange = {
            dataField: dataField, endDataField: endDataField
        };

        let startIndex = -1;
        let endIndex = that.columns.length;

        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            if ( !column.allowSelect ) {
                continue;
            }

            if ( column.dataField === dataField ) {
                startIndex = i;
            }

            if ( column.dataField === endDataField ) {
                endIndex = i;
            }
        }

        const minIndex = Math.min( startIndex, endIndex );
        const maxIndex = Math.max( startIndex, endIndex );

        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            if ( !column.allowSelect ) {
                continue;
            }

            if ( i >= minIndex && i <= maxIndex ) {
                column.selected = true;
            }
        }

        that.endUpdate( false );
        that._recycle();
    }

    _selectColumn( dataField, event ) {
        const that = this;
        const column = that.columnByDataField[ dataField ];

        if ( !column ||
            !that.selection.enabled ||
            (false === column.allowSelect) ||
            !that.selection.allowColumnHeaderSelection ) {
            return;
        }

        if ( column && column.element.style.cursor === 'col-resize' ) {
            return;
        }

        let canSelect = false;

        if ( column  && (column.allowSelect || (column.allowSelect === null && !event))) {
            canSelect = true;
        }

        if (!canSelect) {
            return;
        }

        if ( event ) {
            if ( that.selection.mode === 'extended' ) {
                if ( !event.ctrlKey && !event.shiftKey ) {
                    that._rangeSelectionStartColumn = column;
                    that._rangeSelectionEndColumn = column;
                }

                column.selected = true;

                if ( event && event.shiftKey ) {
                    if ( !that._rangeSelectionStartColumn ) {
                        that._rangeSelectionStartColumn = column;
                    }

                    that._rangeSelectionEndColumn = column;
                    that._selection.columns = [];

                    const startIndex = that.columns.indexOf( that._rangeSelectionStartColumn );
                    const endIndex = that.columns.indexOf( that._rangeSelectionEndColumn );
                    const minIndex = Math.min( startIndex, endIndex );
                    const maxIndex = Math.max( startIndex, endIndex );

                    for ( let i = minIndex; i <= maxIndex; i++ ) {
                        const column = that.columns[ i ];

                        if (column.allowSelect !== false) {
                            column.selected = true;
                        }
                    }
                }
            }
            else {
                if ( that.selection.mode === 'one' ) {
                    column.selected = true;

                }
                else {
                    if ( column.selected === null ) {
                        column.selected = true;
                    }
                    else {
                        column.selected = !column.selected;
                    }
                }
            }
        }
    }

    _getSelectedRows( onlyVisibleRows, onlyInCurrentPage ) {
        const that = this;
        const selectedRows = [];

        let rows = that.rows;

        that.rows.canNotify = false;

        if ( onlyVisibleRows ) {
            rows = that.getVisibleRows();
        }

        if ( that.paging.enabled && onlyInCurrentPage ) {
            rows = rows.slice( that.paging.pageIndex * that.paging.pageSize, ( that.paging.pageIndex + 1 ) * that.paging.pageSize );
        }

        for ( let i = 0; i < rows.length; i++ ) {
            const row = rows[ i ];

            if ( row.getProperty( 'selected' ) ) {
                selectedRows.push( row );
            }
            else {
                row.canNotify = false;
                row.selected = false;
                row.canNotify = true;
            }
        }

        that.rows.canNotify = true;

        return selectedRows;
    }

    _dragSelectionEnd( event ) {
        const that = this;

        that._dragSelectionStartDataField = null;
        that._dragSelectionStartRow = null;

        if ( that.__selectionStarted ) {
            that.$.fireEvent( 'change', {
                started: false,
                finished: true,
                originalEvent: event
            } );

            delete that.__selectionStarted;
            delete that.__selectionStartedFired;
        }

        if ( !that.selection.allowDragSelection || !that.selection.isDragging ) {
            return;
        }

        that.selection.isDragging = false;

        if ( that._autoScrollSelectionDragInterval ) {
            clearInterval( that._autoScrollSelectionDragInterval );

            if ( !that.editing.isEditing ) {
                that._recycle();
            }
        }
    }

    _dragSelection( event ) {
        const that = this;

        if ( that.selection.mode !== 'extended' || that.selection.allowDragSelection === false ) {
            return;
        }

        if ( !that._dragSelectionStartDataField && !that._dragSelectionStartRow ) {
            return;
        }

        const fireSelectionEvent = () => {
            if ( that.__selectionStarted && !that.__selectionStartedFired ) {
                that.$.fireEvent( 'change', {
                    started: true,
                    finished: false,
                    originalEvent: event
                } );

                that.__selectionStartedFired = true;
            }

            that.$.fireEvent( 'change', {
                started: false,
                finished: false,
                originalEvent: event
            } );
        }

        if ( that.selection.allowCellSelection &&
            ( that._dragSelectionStartDataField && !that._columnResizeLine && !that._dragSelectionStartDataField.startsWith( '_' ) ) &&
            ( that._dragSelectionStartRow && !that._rowResizeLine ) ) {
            const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );
            let columnDataField = null;

            for ( let i = 0; i < elements.length; i++ ) {
                const element = elements[ i ];

                if ( element.getAttribute( 'data-field' ) ) {
                    columnDataField = element.getAttribute( 'data-field' );
                    break;
                }
            }

            let row = null;

            for ( let i = 0; i < elements.length; i++ ) {
                const element = elements[ i ];

                if ( element.getAttribute( 'data-id' ) ) {
                    row = element.row;
                    break;
                }
            }


            if ( columnDataField && row ) {
                if ( row.id === that._dragSelectionStartRow.id && that._dragSelectionStartDataField === columnDataField ) {
                    return;
                }

                let canFireEvent = true;

                if ( that._lastRowsSelectionRange && that._lastRowsSelectionRange.id === that._dragSelectionStartRow.id && that._lastRowsSelectionRange.endId === row.id &&
                    ( that._lastColumnSelectionRange && that._lastColumnSelectionRange.dataField === that._dragSelectionStartDataField && that._lastColumnSelectionRange.endDataField === columnDataField ) ) {
                    canFireEvent = false;
                }

                that._selectCellsRange( that._dragSelectionStartRow, row, that._dragSelectionStartDataField, columnDataField );

                if ( canFireEvent ) {
                    fireSelectionEvent();
                }
            }

            if ( that.selection.allowDragSelectionAutoScroll ) {
                if ( that._autoScrollSelectionDragInterval ) {
                    clearInterval( that._autoScrollSelectionDragInterval );
                }

                that.selection.isDragging = true;

                that._autoScrollSelectionDragInterval = setInterval( function () {
                    const rect = that.$.scrollView.getBoundingClientRect();

                    if ( event.clientX <= rect.left + 20 ) {
                        that.scrollLeft -= 15;
                    }
                    else if ( event.clientX >= rect.left + rect.width - 20 ) {
                        that.scrollLeft += 15;
                    }

                    if ( event.clientY <= rect.top + 20 ) {
                        that.scrollTop -= 15;
                    }
                    else if ( event.clientY >= rect.top + rect.height - 20 ) {
                        that.scrollTop += 15;
                    }
                }, 5 );
            }

            return;
        }


        if ( that._dragSelectionStartRow && !that._rowResizeLine &&
            ( ( that.selection.allowRowSelection && !that._dragSelectionStartDataField.startsWith( '_' ) ) || ( that.selection.allowRowHeaderSelection && that._dragSelectionStartDataField.startsWith( '_' ) ) ) ) {
            const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );
            let row = null;

            for ( let i = 0; i < elements.length; i++ ) {
                const element = elements[ i ];

                if ( element.getAttribute( 'data-id' ) ) {
                    row = element.row;
                    if ( !row && element.cell ) {
                        row = element.cell.row;
                    }
                    break;
                }
            }

            let canFireEvent = true;

            if ( that._lastRowsSelectionRange && that._lastRowsSelectionRange.id === that._dragSelectionStartRow.id && row && that._lastRowsSelectionRange.endId === row.id ) {
                canFireEvent = false;
            }

            if (row && !row.allowSelect) {
                canFireEvent = false;
            }

            if ( row && row.allowSelect) {
                that._selectRowsRange( that._dragSelectionStartRow, row );
            }

            if ( that._autoScrollSelectionDragInterval ) {
                clearInterval( that._autoScrollSelectionDragInterval );
            }

            that.selection.isDragging = true;

            if ( canFireEvent ) {
                fireSelectionEvent();
            }

            that._autoScrollSelectionDragInterval = setInterval( function () {
                const rect = that.$.scrollView.getBoundingClientRect();

                if ( event.clientY <= rect.top + 20 ) {
                    that.scrollTop -= 15;
                }
                else if ( event.clientY >= rect.top + rect.height - 20 ) {
                    that.scrollTop += 15;
                }
            }, 5 );
        }
        else if ( that._dragSelectionStartDataField && !that._columnResizeLine && !that._dragSelectionStartDataField.startsWith( '_' ) && that.selection.allowColumnHeaderSelection ) {
            const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );
            let columnDataField = null;

            for ( let i = 0; i < elements.length; i++ ) {
                const element = elements[ i ];

                if ( element.getAttribute( 'data-field' ) ) {
                    columnDataField = element.getAttribute( 'data-field' );
                    break;
                }
            }

            if ( columnDataField ) {
                that._selectColumnsRange( that._dragSelectionStartDataField, columnDataField );
            }

            if ( that._autoScrollSelectionDragInterval ) {
                clearInterval( that._autoScrollSelectionDragInterval );
            }

            let canFireEvent = true;

            if ( ( that._lastColumnSelectionRange && that._lastColumnSelectionRange.dataField === that._dragSelectionStartDataField && that._lastColumnSelectionRange.endDataField === columnDataField ) ) {
                canFireEvent = false;
            }

            if ( canFireEvent ) {
                fireSelectionEvent();
            }

            that.selection.isDragging = true;

            that._autoScrollSelectionDragInterval = setInterval( function () {
                const rect = that.$.scrollView.getBoundingClientRect();

                if ( event.clientX <= rect.left + 20 ) {
                    that.scrollLeft -= 15;
                }
                else if ( event.clientX >= rect.left + rect.width - 20 ) {
                    that.scrollLeft += 15;
                }
            }, 5 );
        }

    }

    // PUBLIC API

    select( id, dataField ) {
        const that = this;

        that._setSelection( id, dataField );

        that.$.fireEvent( 'change', {
            started: false,
            finished: true
        } );
    }

    selectRange( id, dataField, endId, endDataField ) {
        const that = this;

        const selectAndUpdate = function () {
            const event = new KeyboardEvent( 'keydown', {
                shiftKey: true
            } );

            requestAnimationFrame( () => {
                if ( that.selection.mode !== 'extended' ) {
                    that._clearSelection();
                }

                that.beginUpdate();

                that._setSelection( id, dataField );
                that._setSelection( endId, endDataField, event );
                that.ensureVisible( id, dataField );

                that.endUpdate( false );
                that._recycle();
            } );
        }

        selectAndUpdate();

        that.$.fireEvent( 'change', {
            started: false,
            finished: true
        } );
    }

    unselect( id, dataField ) {
        const that = this;

        if ( that._selection ) {
            if ( that._selection.rows && that._selection.rows[ id ] ) {
                delete that._selection.rows[ id ];
            }

            if ( that._selection.columns && that._selection.columns[ dataField ] ) {
                delete that._selection.columns[ dataField ];
            }

            if ( that._selection.cells ) {
                if ( that._selection.cells[ 'row' + id ] ) {
                    delete that._selection.cells[ 'row' + id ][ dataField ];

                    if ( Object.getOwnPropertyNames( that._selection.cells[ 'row' + id ] ).length === 1 ) {
                        delete that._selection.cells[ 'row' + id ];
                    }
                }

                if ( that._selection.cells[ 'column' + dataField ] ) {
                    delete that._selection.cells[ 'column' + dataField ][ id ];

                    if ( Object.getOwnPropertyNames( that._selection.cells[ 'column' + dataField ] ).length === 1 ) {
                        delete that._selection.cells[ 'column' + dataField ];
                    }
                }
            }

            that.$.fireEvent( 'change', {
                started: false,
                finished: true
            } );
        }
    }

    getSelection() {
        const that = this;
        let rows = null;
        let columns = null;
        let cells = null;
        let focused = null;

        if ( that._selection.rows && Object.keys( that._selection.rows ).length > 0 ) {
            const rowKeys = Object.keys( that._selection.rows );

            rows = [];

            for ( let i = 0; i < rowKeys.length; i++ ) {
                const rowKey = rowKeys[ i ];

                rows.push( { id: rowKey, row: that.rowById[ rowKey ] } );
            }
        }

        if ( that._selection.columns && Object.keys( that._selection.columns ).length > 0 ) {
            const columnKeys = Object.keys( that._selection.columns );

            columns = [];

            for ( let i = 0; i < columnKeys.length; i++ ) {
                const columnKey = columnKeys[ i ];

                columns.push( { dataField: columnKey, column: that.columnByDataField[ columnKey ] } );
            }
        }

        if ( that._selection.cells ) {
            for ( let propertyName in that._selection.cells ) {
                if ( propertyName.startsWith( 'row' ) ) {
                    let id = propertyName.replace( 'row', '' );
                    let dataField = null;

                    for ( let columnDataField in that._selection.cells[ propertyName ] ) {
                        dataField = columnDataField.replace( 'column', '' );

                        if ( !cells ) {
                            cells = [];
                        }

                        cells.push( { id: id, dataField: dataField, column: that.columnByDataField[ dataField ], row: that.rowById[ id ] } );
                    }
                }
            }
        }

        if ( that._selection.focusedCell ) {
            focused = { id: that._selection.focusedCell.row.id, dataField: that._selection.focusedCell.column.dataField };
        }

        return {
            rows: rows,
            columns: columns,
            cells: cells,
            focused: focused
        }
    }

    _clearSelection( removeFocus ) {
        const that = this;

        that._selection.rows = [];
        that._selection.columns = [];
        that._selection.cells = [];

        if ( removeFocus ) {
            that._selection.focusedCell = null;

            if ( that._selection.selectionRect ) {
                const selectionRect = that._selection.selectionRect;

                selectionRect.parentNode.removeChild( selectionRect );

                const eventNames = {
                    down: 'pointerdown',
                    move: 'pointermove',
                    up: 'pointerup'
                };

                if ( LW.Utilities.Core.isMobile ) {
                    eventNames.down = 'touchstart';
                    eventNames.move = 'touchmove';
                    eventNames.up = 'touchend';
                }

                document.removeEventListener( eventNames.move, selectionRect.onMove );
                document.removeEventListener( eventNames.up, selectionRect.onUp );
                document.removeEventListener( eventNames.down, selectionRect.onDown );

                that._selection.selectionRect = null;
            }
        }

        that._recycle();

        const column = that._selectionColumn;

        column.refresh();
    }


    _getSelectionCellValues() {
        const that = this;

        if ( that._selection.selectionRect ) {
            return that._selection.selectionRect.cellValues;
        }

        if ( that._selection.rows.length > 0 ) {
            let cellValues = [];

            for ( let id in that._selection.rows ) {
                const row = that.rowById[ id ];

                for ( let j = 0; j < that.columns.length; j++ ) {
                    const column = that.columns[ j ];

                    if ( !column ) {
                        continue;
                    }

                    if ( !cellValues[ id ] ) {
                        cellValues[ id ] = [];
                    }

                    cellValues[ id ][ column.dataField ] = row.data[ column.dataField ];
                }
            }

            return cellValues;
        }

        if ( that._selection.columns.length > 0 ) {
            let cellValues = [];

            for ( let dataField in that._selection.columns ) {
                const column = that.columnByDataField[ dataField ];

                if ( !column ) {
                    continue;
                }

                for ( let j = 0; j < that._recyclingRows.length; j++ ) {
                    const row = that._recyclingRows[ j ];

                    if ( !row ) {
                        continue;
                    }

                    if ( !cellValues[ row.id ] ) {
                        cellValues[ row.id ] = [];
                    }

                    cellValues[ row.id ][ column.dataField ] = row.data[ column.dataField ];
                }
            }

            return cellValues;
        }
    }

    _clipboardHandler( key, event ) {
        const that = this;

        if ( that.clipboard.enabled ) {
            if ( event.ctrlKey && ( key === 'c' || key === 'x' ) ) {
                const values = that._getSelectionCellValues();

                let clipboard = '';
                let rows = Object.keys( values ).length;
                let rowIndex = 0;

                for ( let row in values ) {
                    let clipboardLine = '';
                    let cols = Object.keys( values[ row ] ).length;
                    let colIndex = 0;

                    for ( let column in values[ row ] ) {
                        const value = values[ row ][ column ];

                        clipboardLine += value;
                        colIndex++;

                        if ( colIndex < cols ) {
                            clipboardLine += '\t';
                        }
                    }


                    clipboard += clipboardLine;
                    rowIndex++;

                    if ( rowIndex < rows ) {
                        clipboard += '\r\n';
                    }

                    if ( key === 'x' ) {
                        //if (selection.cells) {
                        //    that.beginUpdate();

                        //    for (let i = 0; i < selection.cells.length; i++) {
                        //        const cell = selection.cells[i];
                        //        const row = that.rowById[cell.id];

                        //        if (row) {
                        //            const rowCell = row.getCell(cell.dataField);

                        //            rowCell.value = null;
                        //        }
                        //    }

                        //    that.endUpdate(false);
                        //    that._recycle();
                        //}
                    }
                }

                navigator.clipboard.writeText( clipboard ).then( function () {
                    /* clipboard successfully set */
                }, function () {
                    /* clipboard write failed */
                } );
            }

            if ( event.ctrlKey && key === 'v' ) {
                navigator.clipboard.readText().then( text => {
                    const clipboardValues = [];
                    //const clipboard = text;
                    const rows = text.split( '\r' );

                    for ( let i = 0; i < rows.length; i++ ) {
                        const row = rows[ i ];
                        const cells = row.split( '\t' );

                        let data = {};

                        for ( let j = 0; j < cells.length; j++ ) {
                            data[ j ] = cells[ j ].trim();
                        }

                        clipboardValues[ i ] = data;
                    }

                    const selectionRect = that._selection.selectionRect;

                    if ( selectionRect ) {
                        that._pasteSelectedCells( {
                            row: selectionRect.row,
                            endRow: selectionRect.endDragRow,
                            column: selectionRect.column,
                            endColumn: selectionRect.endColumn
                        },
                            clipboardValues
                        );
                    }
                    else {
                        let minRow = null;
                        let maxRow = null;

                        for ( let id in that._selection.rows ) {
                            const row = that.rowById[ id ];

                            if ( !minRow ) {
                                minRow = row;
                            }

                            if ( !maxRow ) {
                                maxRow = row;
                            }

                            if ( minRow.visibleIndex > row.visibleIndex ) {
                                minRow = row;
                            }

                            if ( maxRow.visibleIndex < row.visibleIndex ) {
                                maxRow = row;
                            }
                        }

                        if ( minRow && maxRow ) {
                            that._pasteSelectedCells( {
                                row: minRow,
                                endRow: maxRow,
                                column: that.columns[ 0 ],
                                endColumn: that.columns[ that.columns.length - 1 ]
                            },
                                clipboardValues

                            );
                        }
                    }
                }
                );
            }
        }
    }
    /**
  * KeyDown handler.
  */
    _keyDownHandler( event ) {
        const that = this;

        if ( that.onKey ) {
            that.onKey( event );

            if ( event.defaultPrevented ) {
                return;
            }
        }

        let key = event.key;

        if ( that.disabled ) {
            return;
        }

        if ( that.dataSource.length === 0 || that.disabled || that.displayLoadingIndicator ) {
            return;
        }

        if ( that.editing.editRow || that.editing.editCell || that.filtering.filterRow.cell ) {
            return;
        }

        if ( that.rightToLeft ) {
            if ( key === 'ArrowLeft' ) {
                key = 'ArrowRight';
            }
            else if ( key === 'ArrowRight' ) {
                key = 'ArrowLeft';
            }
        }

        that._refreshCellSelectionRect();

        const selection = that.getSelection();
        let focused = selection.focused;

        if ( !selection.focused ) {
            if ( that.editing.enabled && that.editing.isEditing !== true && ( key === 'F2' || key === 'Enter' ) ) {
                if ( selection.columns && selection.columns.length > 0 ) {
                    const lastColumn = selection.columns[ selection.columns.length - 1 ]

                    if ( lastColumn.column.allowHeaderEdit ) {
                        that._beginColumnEdit( lastColumn.column );
                    }
                }
            }

            return;
        }

        const parentCell = that._getParentCell( that.rowById[ focused.id ], focused.dataField );

        if ( parentCell ) {
            //const cell = parentCell.row.getCell(parentCell.column.dataField);

            if ( key === 'ArrowLeft' ) {
                focused.id = parentCell.row.id;
                focused.dataField = parentCell.column.dataField;
            }
            else if ( key === 'ArrowRight' ) {
                focused.id = parentCell.row.id;
                focused.dataField = parentCell.endColumn.dataField;
            }
            else if ( key === 'ArrowUp' ) {
                focused.id = parentCell.row.id;
                focused.dataField = parentCell.column.dataField;
            }
            else if ( key === 'ArrowDown' ) {
                focused.id = parentCell.endRow.id;
                focused.dataField = parentCell.column.dataField;
            }
        }

        if ( that._selection.selectionRect && event.shiftKey && !event.ctrlKey ) {
            if ( that._selection.selectionRect.endRow ) {
                focused.id = that._selection.selectionRect.endRow.id;
            }

            if ( that._selection.selectionRect.endColumn ) {
                focused.dataField = that._selection.selectionRect.endColumn.dataField;
            }
        }
        else if ( that.selection.allowRowSelection && !that.selection.allowCellSelection && that._rangeSelectionEndRow !== undefined ) {
            focused.id = that._rangeSelectionEndRow.id;
        }

        that._clipboardHandler( key, event );

        if ( ( event.ctrlKey && key !== 'x' && key !== 'c' && key !== 'v' && key !== 'Control' ) || key === 'Tab' ) {
            that._selection.rows = [];
            that._selection.columns = [];
            that._selection.cells = [];
        }

        if ( key === 'Escape' ) {
            that.closeMenu();
            that.cancelEdit();
            that._setSelection( focused.id, focused.dataField, event );
            return;
        }

        if ( that.hasMenu() ) {
            return;
        }

        if ( event.altKey ) {
            if ( key === 'ArrowDown' ) {
                const column = that.columnByDataField[ focused.dataField ];

                if ( column && that.hasColumnMenu( column ) ) {
                    column.showActionButton = true;
                    column.onAction();

                    if ( that.menu ) {
                        that.menu.querySelector( 'lw-menu' ).focus();
                        that.menu.querySelector( 'lw-menu' ).$.dispatch( event );
                    }
                }
            }
            else if ( key === 'ArrowUp' ) {
                that.closeMenu();
            }

            if ( key.toLowerCase() === 's' ) {
                const column = that.columnByDataField[ focused.dataField ];

                if ( column ) {
                    if ( !column.sorted ) {
                        that.sortBy( column.dataField, 'asc' );
                    }
                    else if ( column.sortOrder === 'asc' ) {
                        that.sortBy( column.dataField, 'desc' );
                    }
                    else {
                        that.sortBy( column.dataField, null );
                    }
                }
            }

            if ( key.toLowerCase() === 'g' ) {
                const column = that.columnByDataField[ focused.dataField ];

                if ( column ) {
                    column.group = !column.group;
                }
            }
            return;
        }

        const selectAndUpdate = function ( id, dataField ) {
            requestAnimationFrame( () => {
                if ( that.selection.mode !== 'extended' ) {
                    that._clearSelection( true );
                }

                that.beginUpdate();

                that._setSelection( id, dataField, event );
                that.ensureVisible( id, dataField );

                that.endUpdate( false );
                that._recycle();

                if (event.shiftKey) {
                    if ( that.__selectionStarted && !that.__selectionStartedFired ) {
                        that.$.fireEvent( 'change', {
                            started: true,
                            finished: false
                        } );

                        that.__selectionStartedFired = true;
                    }
                    else {
                        that.$.fireEvent( 'change', {
                            started: false,
                            finished: false
                        } );
                    }
                }
                else {
                    that.$.fireEvent( 'change', {
                        started: false,
                        finished: true
                    } );
                }
            } );
            event.stopPropagation();
            event.preventDefault(); //prevent window scrolling
        }

        switch ( key ) {
            case 'Tab': {
                const column = !event.shiftKey ? that.nextColumn( focused.dataField ) : that.prevColumn( focused.dataField );

                if ( column ) {
                    that._selection.focusedCell = that.rowById[ focused.id ].getCell( column.dataField );
                    that._setSelection( focused.id, column.dataField, event );
                    that.focus();
                    event.stopPropagation();
                    event.preventDefault();
                }
                else {
                    let row = !event.shiftKey ? that.nextRow( focused.id ) : that.prevRow( focused.id );
                    let dataField = !event.shiftKey ? that.firstColumn().dataField : that.lastColumn().dataField;

                    if ( that.editing.addNewRow.autoCreate && !event.shiftKey && focused.id === that.lastRow().id ) {
                        that.addUnboundRow( 1 );
                        row = that.lastRow();
                    }

                    if ( !row ) {
                        return;
                    }

                    if ( event.shiftKey ) {
                        that._selection.focusedCell = null;
                    }

                    selectAndUpdate( row.id, dataField );
                }

                break;
            }
            case ' ':
            case 'F2': {
                const row = that.rowById[ focused.id ];

                if ( !row || that.editing.editCell ) {
                    return;
                }

                if ( key === ' ' && that.dataSource.boundHierarchy ) {
                    row.checked = !row.checked;
                }

                if ( that.editing.enabled ) {
                    that._beginEdit( row, focused.dataField );

                    setTimeout( function () {
                        if ( that.editing.editCell && that.editing.editCell.column.dataType.indexOf( 'bool' ) >= 0 ) {
                            const editor = that.editing.editCell.editor.instance;
                            const value = editor.getValue();

                            editor.setValue( !value );
                        }
                    }, 50 );
                }
                break;
            }
            case 'Delete':
            case 'Backspace': {
                const row = that.rowById[ focused.id ];

                if ( !row || that.editing.editCell ) {
                    return;
                }

                const rowCell = row.getCell( focused.dataField );
                const value = rowCell.value;

                if ( selection.cells ) {
                    that.beginUpdate();

                    for ( let i = 0; i < selection.cells.length; i++ ) {
                        const cell = selection.cells[ i ];
                        const row = that.rowById[ cell.id ];

                        if ( row ) {
                            const rowCell = row.getCell( cell.dataField );

                            rowCell.value = null;
                        }
                    }

                    that.endUpdate( false );
                    that._recycle();
                }

                if ( key === 'Backspace' ) {
                    that._beginEdit( row, focused.dataField );
                    rowCell.canNotify = false;
                    rowCell.value = value;
                    rowCell.canNotify = true;
                }

                break;
            }
            default: {
                if ( that.editing.enabled && !that.editing.editCell && !event.ctrlKey && !event.altKey && !that.editing.editRow ) {
                    const row = that.rowById[ focused.id ];

                    if ( !row ) {
                        return;
                    }

                    if ( [ 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
                        'Shift', 'Up', 'Down', 'Left', 'Right', 'Control', 'F2', 'Esc', ' ', 'Home',
                        'End', 'PageUp', 'PageDown' ].indexOf( key ) >= 0 ) {
                        return;
                    }

                    that._beginEdit( row, focused.dataField );

                    setTimeout( function () {
                        if ( that.editing.editCell ) {
                            that.editing.editCell.editor.instance.setValue( key );
                        }
                        else if ( that.editing.editRow ) {
                            const cell = that.editing.editRow.getCell( focused.dataField );

                            if ( !cell ) {
                                return;
                            }

                            cell.editor.instance.setValue( key );
                        }
                    }, 50 );
                }
                break;
            }
            case 'Home': {
                const row = that.firstRow();

                if ( !row ) {
                    return;
                }

                selectAndUpdate( row.id, focused.dataField );
                break;
            }
            case 'End': {
                const row = that.lastRow();

                if ( !row ) {
                    return;
                }

                selectAndUpdate( row.id, focused.dataField );
                break;
            }
            case 'PageUp': {
                const rows = that._recyclingRows;
                const row = that.rowById[ focused.id ];
                const index = rows.indexOf( row );

                for ( let i = index; i >= 0; i-- ) {
                    const currentRow = rows[ i ];

                    if ( row.top - currentRow.top >= that.$.scrollView.offsetHeight ) {
                        selectAndUpdate( currentRow.id, focused.dataField );
                        return;
                    }
                }

                selectAndUpdate( that.firstRow().id, focused.dataField );
                break;
            }
            case 'PageDown': {
                const rows = that._recyclingRows;
                const row = that.rowById[ focused.id ];
                const index = rows.indexOf( row );

                for ( let i = index; i < rows.length; i++ ) {
                    const currentRow = rows[ i ];

                    if ( currentRow.top - row.top >= that.$.scrollView.offsetHeight ) {
                        selectAndUpdate( currentRow.id, focused.dataField );
                        return;
                    }
                }

                selectAndUpdate( that.lastRow().id, focused.dataField );
                break;
            }
            case 'ArrowDown':
            case 'Enter': {
                let row = !event.ctrlKey ? that.nextRow( focused.id ) : that.lastRow();

                if ( that.editing.addNewRow.autoCreate && key === 'Enter' && focused.id === that.lastRow().id ) {
                    that.addUnboundRow( 1 );
                    row = that.lastRow();
                }

                if ( !row ) {
                    return;
                }

                selectAndUpdate( row.id, focused.dataField );
                break;
            }
            case 'ArrowUp': {
                const row = !event.ctrlKey ? that.prevRow( focused.id ) : that.firstRow();

                if ( !row ) {
                    return;
                }

                selectAndUpdate( row.id, focused.dataField );
                break;
            }
            case 'ArrowRight': {
                const row = that.rowById[ focused.id ];
                const isTreeColumn = that.columnByDataField[ focused.dataField ]._treeColumn;

                if ( !that.selection.allowCellSelection || isTreeColumn ) {
                    if ( false === row.leaf ) {
                        if ( !row.expanded ) {
                            row.expand();
                            return;
                        }
                        else {
                            const firstChildRow = that.nextRow( focused.id );

                            if ( firstChildRow ) {
                                selectAndUpdate( firstChildRow.id, focused.dataField );
                                return;
                            }
                        }
                    }
                }

                const column = !event.ctrlKey ? that.nextColumn( focused.dataField ) : that.lastColumn();

                if ( !column ) {
                    return;
                }

                selectAndUpdate( focused.id, column.dataField );
                break;
            }
            case 'ArrowLeft': {
                const row = that.rowById[ focused.id ];
                const isTreeColumn = that.columnByDataField[ focused.dataField ]._treeColumn;

                if ( !that.selection.allowCellSelection || isTreeColumn ) {
                    if ( false === row.leaf ) {
                        if ( row.expanded ) {
                            row.collapse();
                        }
                        else if ( row.parent ) {
                            selectAndUpdate( row.parent.id, focused.dataField );
                        }
                        return;
                    }
                    else if ( row.leaf === true && row.parent ) {
                        selectAndUpdate( row.parent.id, focused.dataField );
                        return;
                    }
                }

                const column = !event.ctrlKey ? that.prevColumn( focused.dataField ) : that.firstColumn();

                if ( !column ) {
                    return;
                }

                selectAndUpdate( focused.id, column.dataField );
                break;
            }
        }


        if ( [ 'Shift', 'Up', 'Down', 'Left', 'Right', 'Control', 'F2', 'Esc', ' ', 'Home', 'End', 'PageUp', 'PageDown' ].indexOf( key ) < 0 ) {
            return;
        }

        event.stopPropagation();
        event.preventDefault(); //prevent window scrolling
    }

    /*
    * KeyUp handler.
    */
    _keyUpHandler( event ) {
        const that = this;

        if ( event.key === 'Escape' && that.dragDrop ) {
            that._endDrag( event );
        }

        if ( !that._focused ) {
            return;
        }

        if (event.key === 'Shift') {
            that.$.fireEvent( 'change', {
                started: false,
                finished: true
            } );
        }
    }

    /*
    Public API
    */

    firstRow() {
        const that = this;
        const rows = that._recyclingRows;

        if ( rows && rows.length > 0 ) {
            if ( !rows[ 0 ].autoGenerated ) {
                return rows[ 0 ];
            }
            else {
                for ( let i = 0; i < rows.length; i++ ) {
                    if ( !rows[ i ].autoGenerated ) {
                        return rows[ i ];
                    }
                }
            }
        }

        return null;
    }

    lastRow() {
        const that = this;
        const rows = that._recyclingRows;

        if ( rows && rows.length > 0 ) {
            const row = rows[ rows.length - 1 ];

            if ( !row.autoGenerated ) {
                return row;
            }
            else {
                for ( let i = rows.length - 1; i >= 0; i-- ) {
                    if ( !rows[ i ].autoGenerated ) {
                        return rows[ i ];
                    }
                }
            }

        }

        return null;
    }

    nextRow( id ) {
        const that = this;
        const rows = that._recyclingRows;
        const row = that.rowById[ id ];
        const index = rows.indexOf( row );

        if ( index >= 0 && rows[ index + 1 ] && !rows[ index + 1 ].autoGenerated ) {
            const newRow = rows[ index + 1 ];

            if ( newRow.allowSelect && !newRow.disabled ) {
                return newRow;
            }
            else {
                for ( let i = index + 1; i < rows.length; i++ ) {
                    const newRow = rows[ i ];

                    if ( newRow.allowSelect && !newRow.disabled ) {
                        return newRow;
                    }
                }
            }
        }

        return null;
    }

    prevRow( id ) {
        const that = this;
        const rows = that._recyclingRows;
        const row = that.rowById[ id ];
        const index = rows.indexOf( row );

        if ( index >= 0 && rows[ index - 1 ] && !rows[ index - 1 ].autoGenerated ) {
            const newRow = rows[ index - 1 ];

            if ( newRow.allowSelect && !newRow.disabled ) {
                return newRow;
            }
            else {
                for ( let i = index - 1; i >= 0; i-- ) {
                    const newRow = rows[ i ];

                    if ( newRow.allowSelect && !newRow.disabled ) {
                        return newRow;
                    }
                }
            }
        }

        return null;
    }

    firstColumn() {
        const that = this;
        const columns = that.columns;

        if ( columns && columns.length > 0 ) {
            return columns[ 0 ];
        }

        return null;
    }

    lastColumn() {
        const that = this;
        const columns = that.columns;

        if ( columns && columns.length > 0 ) {
            return columns[ columns.length - 1 ];
        }

        return null;
    }

    nextColumn( dataField ) {
        const that = this;
        const columns = that.columns;
        const column = that.columnByDataField[ dataField ];
        const index = columns.indexOf( column );

        if ( columns[ index + 1 ] ) {
            return columns[ index + 1 ];
        }

        return null;
    }

    prevColumn( dataField ) {
        const that = this;
        const columns = that.columns;
        const column = that.columnByDataField[ dataField ];
        const index = columns.indexOf( column );

        if ( columns[ index - 1 ] ) {
            return columns[ index - 1 ];
        }

        return null;
    }

    isVisible( id, dataField ) {
        const that = this;

        const vScrollBar = that._scrollView.vScrollBar;
        const hScrollBar = that._scrollView.hScrollBar;

        const row = that.rowById[ id ];
        const column = that.columnByDataField[ dataField ];

        const isRowVisible = ( function ( row ) {
            if ( !row ) {
                return false;
            }

            const index = row.visibleIndex;

            if ( index === -1 ) {
                return false;
            }

            if ( row.top + row.height + hScrollBar.offsetHeight + that.__frozenNearHeight >= that._scrollView.scrollTop + that.$.scrollView.offsetHeight - that.__frozenFarHeight ) {
                return false;
            }

            if ( row.top <= that._scrollView.scrollTop ) {
                return false;
            }

            return true;
        } )( row );

        const isColumnVisible = ( function ( column ) {
            if ( !dataField ) {
                return false;
            }

            const index = column.visibleIndex;

            if ( index === -1 ) {
                return false;
            }

            if ( column.left + column.computedWidth + vScrollBar.offsetWidth >= that._scrollView.scrollLeft + that._clientSize.width ) {
                return false;
            }

            if ( column.left <= that._scrollView.scrollLeft ) {
                return false;
            }

            return true
        } )( column );

        return { row: isRowVisible, column: isColumnVisible };
    }

    ensureVisible( id, dataField ) {
        const that = this;

        const vScrollBar = that._scrollView.vScrollBar;
        const hScrollBar = that._scrollView.hScrollBar;

        const row = that.rowById[ id ];
        const column = that.columnByDataField[ dataField ];

        const ensureRowVisible = function ( row ) {
            if ( !row ) {
                return;
            }

            const index = row.visibleIndex;

            if ( index === -1 ) {
                return;
            }

            if ( row.top + row.height + hScrollBar.offsetHeight + that.__frozenNearHeight >= that._scrollView.scrollTop + that.$.scrollView.offsetHeight - that.__frozenFarHeight ) {
                that._scrollView.scrollTop = row.top + row.height;
            }

            if ( row.top <= that._scrollView.scrollTop ) {
                that._scrollView.scrollTop = row.top;
            }

            if ( index === 0 ) {
                that._scrollView.scrollTop = 0;
            }
            else if ( index === that.dataSource.length - 1 ) {
                that._scrollView.scrollTop = that._scrollView.scrollHeight;
            }
        }

        ensureRowVisible( row );

        const ensureColumnVisible = function ( column ) {
            if ( !dataField ) {
                return;
            }

            const index = column.visibleIndex;

            if ( index === -1 ) {
                return;
            }

            if ( column.left + column.computedWidth + vScrollBar.offsetWidth >= that._scrollView.scrollLeft + that._clientSize.width ) {
                that._scrollView.scrollLeft = that._scrollView.scrollLeft + column.computedWidth;
            }

            if ( column.left <= that._scrollView.scrollLeft ) {
                that._scrollView.scrollLeft = column.left;
            }

            if ( index === 0 ) {
                that._scrollView.scrollLeft = 0;
            }
            else if ( index === that.columns.length - 1 ) {
                that._scrollView.scrollLeft = that._scrollView.scrollWidth;
            }
        }

        ensureColumnVisible( column );
    }

    clearSelection() {
        const that = this;

        delete that._rangeSelectionStartRow;
        delete that._rangeSelectionEndRow;

        that._clearSelection( true );
        that.$.fireEvent( 'change', {
            started: false,
            finished: true
        } );
    }
} );
