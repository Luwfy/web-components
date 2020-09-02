
LW.Utilities.Assign( 'Grid.Group', class Group {
    _renderGroupBar() {
        const that = this;

        if ( !that.grouping.groupBar.visible ) {
            return;
        }

        const bar = that.$.groupHeader;

        if ( !bar.firstElementChild ) {
            const breadcrumb = document.createElement( 'lw-breadcrumb' );
            const label = that.localize( 'groupBarLabel' );

            bar.appendChild( breadcrumb );
            that.$.breadcrumb = breadcrumb;
            breadcrumb.placeholder = label;
            breadcrumb.classList.add( 'lw-hidden' );
        }

        const groups = that.dataSource.groupBy;
        const dataSource = [];

        for ( let i = 0; i < groups.length; i++ ) {
            const group = groups[ i ];

            const column = that.columns.find( column => {
                return column.dataField === group;
            } );

            if ( !column ) {
                continue;
            }

            let icons = '';
            if ( column.sortOrder ) {
                icons += '<span class="lw-grid-icon show ' + ( column.sortOrder === 'asc' ? 'lw-icon-sort-up' : 'lw-icon-sort-down' ) + '"></span>';
            }

            if ( column.filter ) {
                icons += '<span class="lw-grid-icon lw-icon-filter show"></span>';

            }
            dataSource.push( {label: column.label + icons, value: column.dataField} );
        }

        that.$.breadcrumb.closeButtons = that.grouping.groupBar.allowColumnCloseButtons;
        that.$.breadcrumb.allowDrag = that.$.breadcrumb.allowDrop = that.grouping.groupBar.allowColumnDragDrop;

        that.$.breadcrumb.dataSource = dataSource;
        that.$.breadcrumb.minimizeWidth = 350;


        if ( that.offsetWidth < 350 ) {
            that.$.breadcrumb.parentElement.style.zIndex = 9999;
            that.$.breadcrumb.parentElement.style.overflow = 'visible';
        }

        that.$.breadcrumb.onminimize = () => {
            that.$.breadcrumb.parentElement.style.zIndex = 9999;
            that.$.breadcrumb.parentElement.style.overflow = 'visible';
        }

        that.$.breadcrumb.onitemclick = ( event ) => {
            const item = event.detail.item;
            const column = that.columnByDataField[ item.value ];

            if ( column.allowSortToggleOnClick && that.sorting.enabled ) {
                that.sortBy( column.dataField );
            }
        }

        that.$.breadcrumb.onmaximize = () => {
            that.$.breadcrumb.parentElement.style.zIndex = '';
            that.$.breadcrumb.parentElement.style.overflow = '';
        }

        that.$.breadcrumb.ondragstart = function ( event ) {
            const dragDrop = that.$.breadcrumb._dragDrop;
            const index = that.$.breadcrumb._items.indexOf( event.detail.item );
            const column = that.columnByDataField[ that.$.breadcrumb.dataSource[ index ].value ];

            const columnDragStartEvent = that.$.fireEvent( 'columnDragStart', {
                'column': column,
                'index': that.columns.indexOf( column ),
                'data': dragDrop,
                'originalEvent': event.detail.originalEvent
            } );

            if ( columnDragStartEvent.defaultPrevented ) {
                return;
            }

            const elements = that.columns.map( ( column ) => {
                if ( column.dataField === dataSource[ index ].value ) {
                    column.element.classList.add( 'dragged' );
                }

                return column.element;
            } );


            dragDrop.items = dragDrop.items.concat( elements );
            dragDrop.getItemCoordinates( dragDrop.items );
            dragDrop.column = column;

            that._overlay = document.createElement( 'div' );
            that._overlay.classList.add( 'lw-grid-overlay' );
            that._overlay.style.cursor = '';
            that.$.root.appendChild( that._overlay );
            that._dragLine = that._createLine( dragDrop.dragDetails.item );

            that.$.root.appendChild( that._dragLine );

            that._dragLine.style.height = dragDrop.dragDetails.item.offsetHeight + 'px';

            requestAnimationFrame( () => {
                that._dragLine.style.opacity = 1;
            } );

        }

        that.$.breadcrumb.ondragging = function ( event ) {
            const dragDrop = that.$.breadcrumb._dragDrop;
            const dragDetails = dragDrop.dragDetails;

            if ( that._dragLine && dragDetails.target ) {
                const columnRect = that.getBoundingRect( dragDetails.target );
                const rect = that.getBoundingRect( that );
                const columnHeaderRect = that.getBoundingRect( that.$.columnHeader );

                if ( dragDetails.before ) {
                    that._dragLine.style.left = -columnHeaderRect.left + columnRect.left + 'px';
                }
                else {
                    that._dragLine.style.left = -columnHeaderRect.left + columnRect.right + 'px';
                }

                if ( parseInt( that._dragLine.style.left ) < 3 ) {
                    that._dragLine.style.left = '3px';
                }

                that._dragLine.style.top = columnRect.top - rect.top + 'px';

                if ( dragDetails.target.classList.contains( 'lw-breadcrumb-item' ) ) {
                    that._dragLine.style.height = columnRect.height + 'px';
                }
                else {
                    that._dragLine.style.height = 'calc(100% - 7px - ' + that._dragLine.style.top + ')';
                }

                that.$.fireEvent( 'columnDragging', {
                    'column': dragDrop.column,
                    'index': that.columns.indexOf( dragDrop.column ),
                    'data': dragDrop,
                    'originalEvent': event.detail.originalEvent
                } );
            }
        }

        that.$.breadcrumb.ondragcancel = function () {
            if ( that._dragLine ) {
                that._dragLine.parentNode.removeChild( that._dragLine );
            }

            that.columns.forEach( column => {
                if ( column.element ) {
                    column.element.classList.remove( 'dragged' );
                }
            } );

            const dragDrop = that.$.breadcrumb._dragDrop;

            that.$.fireEvent( 'columnDragCancel', {
                'column': dragDrop.column,
                'index': that.columns.indexOf( dragDrop.column ),
                'data': dragDrop
            } );
        }

        that.$.breadcrumb.ondragend = function ( event ) {
            that.beginUpdate();

            const rect = that.getBoundingRect( that.$.breadcrumb );

            if ( event.detail.originalEvent.pageY > rect.bottom ) {
                const dragDrop = that.$.breadcrumb._dragDrop;
                const dataField = event.detail.item.data.value;
                const target = dragDrop.dragDetails.target;
                const column = that.columnByDataField[ dataField ];
                const index = that.$.breadcrumb.dataSource.findIndex( ( item ) => {
                    if ( item.value === column.dataField ) {
                        return true;
                    }

                    return false;
                } );

                const newSource = that.$.breadcrumb.dataSource.slice( 0 );

                newSource.splice( index, 1 );
                that.$.breadcrumb.dataSource = newSource;


                if ( target && target.column ) {
                    const columnDragEndEvent = that.$.fireEvent( 'columnDragEnd', {
                        'column': dragDrop.column,
                        'index': that.columns.indexOf( dragDrop.column ),
                        'newIndex': that.columns.indexOf( target.column ),
                        'data': dragDrop,
                        'originalEvent': event.detail.originalEvent
                    } );

                    if ( !columnDragEndEvent.defaultPrevented ) {
                        const columnIndex = that.columns.indexOf( column );
                        const newColumnIndex = that.columns.indexOf( target.column );

                        that.columns.move( columnIndex, newColumnIndex );
                    }
                }
            }

            const dataSource = that.$.breadcrumb.dataSource.map( item => {
                return item.value;
            } );

            if ( that._dragLine ) {
                that._dragLine.parentNode.removeChild( that._dragLine );
            }

            that.columns.forEach( column => {
                if ( column.element ) {
                    column.element.classList.remove( 'dragged' );
                }
            } );
            that.dataSource.groupBy = dataSource;
            that.refresh( true );
            that.refreshFilters();
            that.refreshSort();
            that.endUpdate();
        }

        that.$.breadcrumb.onclose = function ( event ) {
            const item = event.detail.item;

            that.removeGroup( item.value );
        }
    }

    addGroup( dataField ) {
        const that = this;

        if ( !that.dataSource || !that.grouping.enabled ) {
            return;
        }

        const index = that.dataSource.groupBy.indexOf( dataField );

        if ( index === -1 ) {
            that.dataSource.groupBy.push( dataField );

            that.refresh( true );
            that.refreshFilters();
            that.refreshSort();
        }
    }

    removeGroup( dataField ) {
        const that = this;

        if ( !that.dataSource || !that.grouping.enabled ) {
            return;
        }

        const index = that.dataSource.groupBy.indexOf( dataField );

        if ( index >= 0 ) {
            that.dataSource.groupBy.splice( index, 1 );

            that.refresh( true );
            that.refreshFilters();
            that.refreshSort();
        }
    }

    clearGroups() {
        const that = this;

        if ( !that.dataSource || !that.grouping.enabled ) {
            return;
        }


        that.dataSource.clearGroup();

        that.refresh( true );
        that.refreshFilters();
        that.refreshSort();
    }
} );
