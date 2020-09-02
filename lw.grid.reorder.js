
LW.Utilities.Assign( 'Grid.Reorder', class Reorder {
    _createLine( item ) {
        const that = this;

        const createColumnLine = function () {
            const dragLine = document.createElement( 'div' );
            const columnRect = that.getBoundingRect( item );
            const columnHeaderRect = that.getBoundingRect( that.$.columnHeader );
            const rect = that.getBoundingRect( that );
            const height = that.$.content.offsetHeight - 7 - that._scrollView.hScrollBar.offsetHeight - columnRect.top + rect.top;

            dragLine.classList.add( 'lw-grid-drag-line' );

            if ( that.rightToLeft ) {
                dragLine.style.left = -columnHeaderRect.left + columnRect.left + 'px';
            }
            else {
                dragLine.style.left = -columnHeaderRect.left + columnRect.right + 'px';
            }
            dragLine.style.top = columnRect.top - rect.top + 'px';
            dragLine.style.height = height + 'px';

            dragLine.style.opacity = 0;
            return dragLine;
        }

        const createRowLine = function () {
            const dragLine = document.createElement( 'div' );
            const rowRect = that.getBoundingRect( item );

            dragLine.classList.add( 'lw-grid-drag-line', 'row' );

            dragLine.style.width = that.$.scrollView.offsetWidth - item.offsetLeft - item.row.header.offsetWidth - that._scrollView.vScrollBar.offsetWidth + 'px';
            dragLine.style.left = item.row.header.offsetWidth + 'px';
            dragLine.style.top = rowRect.bottom - that.offsetTop + 'px';
            dragLine.style.opacity = 0;

            return dragLine;
        }

        if ( item.classList.contains( 'lw-breadcrumb-item' ) || item.column ) {
            return createColumnLine();
        }
        else {
            return createRowLine();
        }
    }

    _drag( event ) {
        const that = this;
        const moveEvent = event.originalEvent;

        if ( !that._dragDrop ) {
            return;
        }

        const dragDetails = that._dragDrop.dragDetails;
        let feedback = dragDetails.feedback;

        if ( !feedback && that._dragDrop.showFeedback ) {
            feedback = that._dragDrop.createFeedback( moveEvent );

            if ( !feedback ) {
                return;
            }
            else {
                that._overlay = document.createElement( 'div' );
                that._overlay.classList.add( 'lw-grid-overlay' );
                that._overlay.style.cursor = '';
                that.$.root.appendChild( that._overlay );

                if ( that._dragDrop.column ) {
                    that._dragLine = that._createLine( that._dragDrop.column.element );
                    that.$.root.appendChild( that._dragLine );

                    requestAnimationFrame( () => {
                        that._dragLine.style.opacity = 1;
                    } );

                    that._dragDrop.feedbackLine = that._dragLine;
                }
                else {
                    const row = that._dragDrop.row;
                    let rowFeedback = '<div>';

                    for ( let i = 0; i < that.columns.length; i++ ) {
                        const column = that.columns[ i ];

                        rowFeedback += '<div>' + column.label + ': ' + row[ 'column_' + column.dataField ].value + '</div>';
                    }

                    that._dragDrop.items = that._rowElements;
                    that._dragDrop.getItemCoordinates( that._rowElements );
                    rowFeedback += '</div>';
                    feedback.innerHTML = rowFeedback;
                    that._dragLine = that._createLine( that._dragDrop.row.element );
                    that.$.root.appendChild( that._dragLine );

                    requestAnimationFrame( () => {
                        that._dragLine.style.opacity = 1;
                    } );

                    feedback.classList.add( 'lw-grid-row-drag-feedback' );
                    that._dragDrop.feedbackLine = that._dragLine;
                }
            }
        }

        that._dragDrop.drag( event );

        that._dragDrop.column ? that._dragColumn( event ) : that._dragRow( event );

        moveEvent.preventDefault();
    }

    _dragRow( event ) {
        const that = this;
        const dragDetails = that._dragDrop.dragDetails;
        //const feedback = dragDetails.feedback;
        const dragLine = that._dragLine;
        const moveEvent = event.originalEvent;

        const rect = that.getBoundingRect( that );
        if ( event.pageY < rect.top || event.pageY > rect.bottom || event.pageX < rect.left || event.pageX > rect.right || ( dragDetails.target && !dragDetails.target.row ) || !dragDetails.target ) {
            that._dragDrop.error();

            dragLine.style.opacity = 0;
        }
        else {
            that._dragDrop.getItemCoordinates( that._dragDrop.items );
            dragLine.style.opacity = 1;
            that._dragDrop.success();

            if ( !dragDetails.target ) {
                return;
            }

            let rowRect = that.getBoundingRect( dragDetails.target );

            dragLine.style.width = that.$.scrollView.offsetWidth - that._dragDrop.row.offsetLeft - that._dragDrop.row.header.offsetWidth - that._scrollView.vScrollBar.offsetWidth + 'px';
            dragLine.style.left = that._dragDrop.row.header.offsetWidth + 'px';

            let top = rowRect.top - that.offsetTop - that.scrollTop;

            if ( that._recyclingRows[ that._recyclingRows.length - 1 ].element === dragDetails.target && event.pageY > rect.bottom - 10 ) {
                dragDetails.before = false;
            }

            if ( event.pageY > top + that.offsetTop + rowRect.height - 7 ) {
                dragDetails.before = false;
            }

            dragLine.style.top = dragDetails.before ? top + 'px' : top + rowRect.height - 7 + 'px';
        }

        that.$.fireEvent( 'rowDragging', {
            'row': that._dragDrop.row,
            'index': that._dragDrop.visibleIndex,
            'data': that._dragDrop,
            'originalEvent': moveEvent
        } );
    }

    _dragColumn( event ) {
        const that = this;
        const dragDetails = that._dragDrop.dragDetails;
        //const feedback = dragDetails.feedback;
        const rect = that.getBoundingRect( that );
        const moveEvent = event.originalEvent;

        if ( event.pageY < rect.top || event.pageY > rect.bottom || event.pageX < rect.left || event.pageX > rect.right ) {
            that._dragDrop.error();

            that._dragLine.style.opacity = 0;
        }
        else {
            that._dragLine.style.opacity = 1;
        }

        if ( dragDetails.target && that._dragDrop.feedback && !that._dragDrop.feedback.classList.contains( 'error' ) ) {
            that._dragDrop.getItemCoordinates( that._dragDrop.items );
            const columnRect = that.getBoundingRect( dragDetails.target );
            const contentRect = that.getBoundingRect( that.$.content );

            if ( that._dragDrop.column ) {
                that._dragLine.style.opacity = 1;

                if ( dragDetails.before === false ) {
                    that._dragLine.style.left = -that.offsetLeft + columnRect.right - that.scrollLeft + 'px';

                }
                else {
                    that._dragLine.style.left = -that.offsetLeft + columnRect.left - that.scrollLeft + 'px';
                }

                if ( dragDetails.target.classList.contains( 'lw-breadcrumb-item' ) ) {
                    that._dragLine.style.top = columnRect.top - rect.top - that.scrollTop + 'px';
                    that._dragLine.style.height = columnRect.height + 'px';

                    that.$.breadcrumb.dataSource.forEach( item => {
                        if ( item.value === dragDetails.item.column.dataField ) {
                            that._dragLine.style.opacity = 0;
                            that._dragDrop.error();
                        }
                    } );
                }
                else {
                    that._dragLine.style.top = columnRect.top - rect.top - that.scrollTop + 'px';
                    const height = that.$.content.offsetHeight - 7 - that._scrollView.hScrollBar.offsetHeight - columnRect.top + contentRect.top;

                    that._dragLine.style.height = height + 'px';
                }

                if ( parseInt( that._dragLine.style.left ) < 3 ) {
                    that._dragLine.style.left = '3px';
                }
                else if ( parseInt( that._dragLine.style.left ) >= that.offsetWidth - 3 ) {
                    that._dragLine.style.left = that.offsetWidth - 7 + 'px';
                }
            }
        }
        else {
            that._dragLine.style.opacity = 0;
        }

        that.$.fireEvent( 'columnDragging', {
            'column': that._dragDrop.column,
            'index': that.columns.indexOf( that._dragDrop.column ),
            'data': that._dragDrop,
            'originalEvent': moveEvent
        } );
    }

    _beginRowDrag( event, row ) {
        const that = this;

        let allowReorder = false;

        if ( that.behavior.allowRowReorder && row.allowReorder ) {
            allowReorder = true;
        }

        if ( !allowReorder ) {
            return;
        }

        const rowDragStartEvent = that.$.fireEvent( 'rowDragStart', {
            'row': row,
            'index': row.visibleIndex,
            'data': null,
            'originalEvent': event.originalEvent
        } );

        if ( rowDragStartEvent.defaultPrevented ) {
            return;
        }

        that._dragDrop = new LW.Utilities.DragDrop( that );
        that._dragDrop.capture( row.element, event );
        that._dragDrop.row = row;
        that._recycle( false );

        if ( that._dragInterval ) {
            clearInterval( that._dragInterval );
        }

        that._dragInterval = setInterval( function () {
            const dragDetails = that._dragDrop.dragDetails;

            if ( !dragDetails.feedback ) {
                return;
            }

            const left = parseInt( dragDetails.feedback.style.left );
            const top = parseInt( dragDetails.feedback.style.top );

            const rect = that.getBoundingClientRect();

            if ( that._dragLine ) {
                if ( rect.left <= left && rect.left + rect.width >= left ) {
                    if ( top >= rect.top && top <= rect.top + 20 ) {
                        that.scrollTop -= 5;
                    }
                    else if ( top >= rect.top + rect.height + 5 && top <= rect.top + rect.height + 20 ) {
                        that.scrollTop += 5;
                    }
                }
            }
        }, 10 );
    }

    _beginDrag( event, item ) {
        const that = this;

        if ( !item.dataField ) {
            that._beginRowDrag( event, item );
            return;
        }

        const column = item;

        if ( that.behavior.allowColumnReorder && column.allowReorder ) {
            const columnDragStartEvent = that.$.fireEvent( 'columnDragStart', {
                'column': column,
                'index': that.columns.indexOf( column ),
                'data': null,
                'originalEvent': event.originalEvent
            } );

            if ( !columnDragStartEvent.defaultPrevented ) {
                that._dragDrop = new LW.Utilities.DragDrop( that );
                that._dragDrop.capture( column.element, event );
                that._dragDrop.column = column;

                const elements = that.columns.map( ( column ) => {
                    return column.element;
                } );

                if ( that.$.breadcrumb ) {
                    that._dragDrop.items = elements.concat( that.$.breadcrumb._items );
                }
                else {
                    that._dragDrop.items = elements;
                }

                if ( that._dragInterval ) {
                    clearInterval( that._dragInterval );
                }

                that._dragInterval = setInterval( function () {
                    const dragDetails = that._dragDrop.dragDetails;

                    if ( !dragDetails.feedback ) {
                        return;
                    }

                    const left = parseInt( dragDetails.feedback.style.left );
                    //const top = parseInt( dragDetails.feedback.style.top );

                    const rect = that.getBoundingClientRect();

                    if ( that._dragLine ) {
                        if ( rect.left <= left && rect.left + rect.width >= left ) {

                            if ( left >= rect.left && left <= rect.left + 20 ) {
                                that.scrollLeft -= 5;
                            }
                            else if ( left >= rect.left + rect.width - 20 && left <= rect.left + rect.width ) {
                                that.scrollLeft += 5;
                            }
                        }
                    }
                }, 3 );
            }
        }
    }

    _cancelDrag() {
        const that = this;

        if ( that._dragLine ) {
            if ( that._dragLine.parentNode ) {
                that._dragLine.parentNode.removeChild( that._dragLine );
            }

            that._dragLine = null;
        }

        if ( that._dragDrop ) {
            that._dragDrop.removeFeedback();
            that._dragDrop = null;
        }

        if ( that._dragInterval ) {
            clearInterval( that._dragInterval );
        }

        that._recycle();
    }

    _endDrag( event ) {
        const that = this;
        if ( that._dragDrop ) {
            const dragDetails = that._dragDrop.dragDetails;

            if ( !dragDetails.feedback || ( dragDetails.feedback && dragDetails.feedback.classList.contains( 'error' ) && !dragDetails.feedback.classList.contains( 'data' ) ) ) {
                that._cancelDrag();
                return;
            }

            if ( event.key && event.key === 'Escape' ) {
                if ( that._dragDrop.column ) {
                    that.$.fireEvent( 'columnDragCancel', {
                        'column': dragDetails.item.column,
                        'index': that.columns.indexOf( that._dragDrop.column ),
                        'data': that._dragDrop
                    } );
                }
                else if ( that._dragDrop.row ) {
                    that.$.fireEvent( 'rowDragCancel', {
                        'row': that._dragDrop.row,
                        'index': that._dragDrop.row.visibleIndex,
                        'data': that._dragDrop
                    } );

                }

                that._cancelDrag();
                return;
            }

            that.beginUpdate();

            let target = dragDetails.target;
            const before = dragDetails.before;

            if ( that._dragDrop.column ) {
                if ( target && target.column && !( event.key === 'Escape' ) && !dragDetails.feedback.classList.contains( 'data' ) ) {
                    const columnDragEndEvent = that.$.fireEvent( 'columnDragEnd', {
                        'column': that._dragDrop.column,
                        'index': that.columns.indexOf( that._dragDrop.column ),
                        'newIndex': that.columns.indexOf( target.column ),
                        'data': that._dragDrop,
                        'originalEvent': event.originalEvent
                    } );

                    if ( !columnDragEndEvent.defaultPrevented ) {
                        const columnIndex = that.columns.indexOf( that._dragDrop.column );
                        const newColumnIndex = that.columns.indexOf( target.column );

                        that._dragDrop.column.columnGroup = target.column.columnGroup;

                        that.columns.move( columnIndex, newColumnIndex );
                    }
                }
                else {
                    that.$.fireEvent( 'columnDragEnd', {
                        'column': that._dragDrop.column,
                        'index': that.columns.indexOf( that._dragDrop.column ),
                        'newIndex': -1,
                        'data': that._dragDrop,
                        'originalEvent': event.originalEvent
                    } );
                }

                if ( !( event.key === 'Escape' ) && that.$.breadcrumb ) {
                    const breadcrumbRect = that.getBoundingRect( that.$.breadcrumb );

                    if ( event.originalEvent.pageY >= breadcrumbRect.top - that.scrollTop && event.originalEvent.pageY <= breadcrumbRect.bottom - that.scrollTop ) {
                        const targetIndex = that.$.breadcrumb._items.indexOf( target );
                        const column = that._dragDrop.dragDetails.item.column;

                        const newSource = that.$.breadcrumb.dataSource.slice( 0 );
                        newSource.splice( Math.max( 0, targetIndex + ( before ? 0 : 1 ) ), 0, { label: column.label, value: column.dataField } );

                        that.$.breadcrumb.dataSource = newSource;
                        const dataSource = that.$.breadcrumb.dataSource.map( item => {
                            return item.value;
                        } );
                        that.dataSource.groupBy = dataSource;
                        that.refresh( true );
                        that.refreshFilters();
                    }
                }
            }
            else if ( that._dragDrop.row ) {
                if ( target && target.row && !( event.key === 'Escape' ) && !dragDetails.feedback.classList.contains( 'data' ) ) {
                    const rowDragEndEvent = that.$.fireEvent( 'rowDragEnd', {
                        'row': that._dragDrop.row,
                        'index': that._dragDrop.row.visibleIndex,
                        'newIndex': target.row.visibleIndex,
                        'data': that._dragDrop,
                        'originalEvent': event.originalEvent
                    } );

                    if ( !rowDragEndEvent.defaultPrevented ) {
                        const rowIndex = that._dragDrop.row.visibleIndex;
                        let newRowIndex = target.row.visibleIndex;

                        if ( !dragDetails.before ) {
                            newRowIndex++;
                        }

                        if ( rowIndex < newRowIndex ) {
                            newRowIndex--;
                        }

                        that.rows.move( rowIndex, newRowIndex );
                    }
                }
                else {
                    that.$.fireEvent( 'rowDragEnd', {
                        'row': that._dragDrop.row,
                        'index': that._dragDrop.row.visibleIndex,
                        'newIndex': -1,
                        'data': that._dragDrop,
                        'originalEvent': event.originalEvent
                    } );
                }
            }

            that._cancelDrag();

            that.endUpdate();

            if ( that.columnGroups ) {
                that._renderColumns( true );
            }
        }
    }
} );