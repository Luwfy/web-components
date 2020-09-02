
LW.Utilities.Assign( 'Grid.Row', class Row {
    constructor ( row ) {
        const that = this;

        if ( !row ) {
            row = {};
        }

        Object.assign( that, row );

        if ( !row ) {
            return;
        }

        if ( that.data === undefined ) {
            const itemObject = { $: {} };

            if ( row.grid && row.grid.dataSource ) {
                const dataSource = row.grid.dataSource;

                for ( let j = 0; j < dataSource.dataFields.length; j++ ) {
                    const dataField = dataSource.dataFields ? dataSource.dataFields[ j ] : {};

                    itemObject[ dataField.name ] = '';
                }
            }
            else {
                Object.assign( itemObject, row );
            }

            if ( row.id ) {
                itemObject.$.id = row.id;
            }

            that.data = itemObject;
        }

        if ( undefined === row.$ || ( row.$ && undefined === row.$.id ) ) {
            if ( row.data ) {

                if ( row.data.$ && row.data.$.id ) {
                    that.id = row.data.$.id;
                }

                if ( !that.id ) {
                    that.id = row.index;
                }
            }
            else if ( that.id === undefined ) {
                that.id = row.index;
            }

            if ( that.id === undefined ) {
                that.id = LW.Utilities.Core.createGUID();
            }
        }

        if ( undefined === that.detailHeight ) {
            if ( that.grid ) {
                that.detailHeight = that.grid.rowDetail.height;
            }
            else {
                that.detailHeight = 200;
            }
        }

        if ( undefined === that.height && that.grid ) {
            that.height = that.grid.layout.rowMinHeight;

            if ( that.grid.__autoRowHeight ) {
                that.height = that.grid.__autoRowHeight;
            }


            if ( that.grid.layout.rowHeight ) {
                that.height = that.grid.layout.rowHeight;
            }
        }

        if ( undefined === that.cellHeight ) {
            that.cellHeight = that.height;
        }

        if ( undefined === that.showDetail ) {
            that.showDetail = false;
        }

        if ( undefined === that.index ) {
            that.index = -1;
        }

        if ( undefined === that.visibleIndex ) {
            that.visibleIndex = -1;
        }

        if ( undefined === that.freeze ) {
            that.freeze = false;
        }

        if ( undefined === that.height ) {
            that.height = null;
        }

        if ( undefined === that.minHeight ) {
            that.minHeight = 25;

            if ( that.grid ) {
                that.minHeight = that.grid.layout.rowMinHeight;
            }
        }

        if ( undefined === that.checked ) {
            that.checked = false;
        }

        if ( undefined === that.selected ) {
            that.selected = false;
            if ( that.grid && that.grid._selection.rows[ that.id ] ) {
                that.selected = true;
            }
        }
        else if ( that.selected && that.grid ) {
            that.grid._selection.rows[ that.id ] = true;
        }

        if ( undefined === that.enabled ) {
            that.enabled = true;
        }

        if ( undefined === that.visible ) {
            that.visible = true;
        }

        if ( undefined === that.allowCheck ) {
            that.allowCheck = true;
        }

        if ( undefined === that.filtered ) {
            that.filtered = true;
        }

        if ( undefined === that.allowResize ) {
            that.allowResize = true;
        }

        if ( undefined === that.allowReorder ) {
            that.allowReorder = true;
        }

        if ( undefined === that.allowToggle ) {
            that.allowToggle = true;
        }

        if ( undefined === that.allowSelect ) {
            that.allowSelect = true;
        }

        if ( undefined === that.expanded ) {
            if ( row.data && row.data.expanded !== undefined ) {
                that.expanded = row.data.expanded;
            }
            else {
                that.expanded = false;
            }
        }

        that.headerCell = null;
        that._cells = [];
    }

    get properties() {
        return [ 'allowToggle', 'allowResize', 'allowSelect', 'allowReorder', 'allowCheck', 'canNotify', 'children', 'checked', 'cells', 'detailHeight', 'detailTemplate', 'cellHeight', 'expandHeight', 'data', 'enabled', 'expanded', 'filtered', 'freeze', 'grid', 'headerCell', 'height', 'index', 'id', 'minHeight', 'unbound', 'selected', 'showDetail', 'visible', 'parent', 'leaf', 'visibleIndex' ]
    }

    createElement() {
        const that = this;
        const element = document.createElement( 'lw-grid-row' );

        that.element = element;
        element.setAttribute( 'role', 'row' );
        element._initialize( that );

        return element;
    }

    _autoSize( row ) {
        const that = this;
        const grid = that.grid;
        let height = grid.layout.rowMinHeight;
        const element = that.element;

        if ( !row ) {
            row = that;
        }

        if ( row ) {
            that.data = row.data;
        }

        if ( !element ) {
            return that.height;
        }

        if ( !grid.__autoHeightRows ) {
            grid.__autoHeightRows = [];
        }

        const updateHeight = ( row, column, cellElement ) => {
            if ( !cellElement || !column || column.autoGenerated ) {
                return 0;
            }

            const measureHeight = () => {
                cellElement.style.height = 'auto';

                if ( column.cellsWrap ) {
                    cellElement.content.classList.add( 'wrap' );
                }
                else {
                    cellElement.content.classList.add( 'nowrap' );
                }

                if ( row && column ) {
                    cellElement.content.textContent = row.data[ column.dataField ];
                }

                const height = cellElement.offsetHeight;

                cellElement.style.height = '';
                cellElement.content.classList.remove( 'wrap' );
                cellElement.content.classList.remove( 'nowrap' );

                return height;
            }

            if ( !grid.__autoHeightRows[ column.dataField ] ) {
                grid.__autoHeightRows[ column.dataField ] = [];
            }

            const length = row.data[ column.dataField ].length;
            const cachedValue = grid.__autoHeightRows[ column.dataField ][ length ];
            const cellHeight = cachedValue ? cachedValue : measureHeight();

            height = Math.max( height, cellHeight );

            if ( !cachedValue ) {
                grid.__autoHeightRows[ column.dataField ][ length ] = cellHeight;
            }
        }

        for ( let j = 0; j < grid._frozenNearColumns.length; j++ ) {
            const column = grid._frozenNearColumns[ j ];
            const cellElement = element.children[ 0 ].children[ j ];

            updateHeight( row, column, cellElement );
        }

        for ( let j = 0; j < grid._frozenFarColumns.length; j++ ) {
            const column = grid._frozenFarColumns[ j ];
            const cellElement = element.children[ 2 ].children[ j ];

            updateHeight( row, column, cellElement );
        }

        for ( let j = 0; j < element.children[ 1 ].children.length; j++ ) {
            const columnElement = grid._columnElements[ j ];
            const column = columnElement.column;
            const cellElement = element.children[ 1 ].children[ j ];

            updateHeight( row, column, cellElement );
        }

        return height;
    }

    autoSize() {
        const that = this;

        const height = that._autoSize();

        that.height = height;
    }

    getCell( column ) {
        const that = this;
        const grid = that.grid;

        if ( typeof column === 'string' || typeof column === 'number' ) {
            column = grid.columnByDataField[ column ];
        }

        if ( !column ) {
            return null;
        }

        if ( !that[ 'column_' + column.dataField ] ) {
            const cell = new LW.Grid.Cell( that, column, grid );

            that[ 'column_' + column.dataField ] = cell;

            return cell;
        }
        else {
            const cell = that[ 'column_' + column.dataField ];

            cell.column = column;

            return cell;
        }
    }

    get cells() {
        const that = this;

        if ( that._cells && that.grid && that._cells.length === that.grid.columns.length ) {
            return that._cells;
        }

        that.createCells();

        return that._cells;
    }

    get viewCells() {
        const that = this;
        const cells = [];

        for ( let i = 0; i < that.grid.viewColumns.length; i++ ) {
            const column = that.grid.viewColumns[ i ];

            if ( !that[ 'column_' + column.dataField ] ) {
                const cell = new LW.Grid.Cell( that, column, that.grid );

                that[ 'column_' + column.dataField ] = cell;

                cells.push( cell );
            }
            else {
                const cell = that[ 'column_' + column.dataField ];

                cells.push( cell );
            }
        }

        that._viewCells = cells;

        return cells;
    }

    createCells() {
        const that = this;
        const grid = that.grid;

        that._cells = [];

        for ( let i = 0; i < grid.viewColumns.length; i++ ) {
            const column = grid.viewColumns[ i ];

            if ( column.autoGenerated ) {
                continue;
            }

            if ( !that[ 'column_' + column.dataField ] ) {
                const cell = new LW.Grid.Cell( that, column, grid );

                that[ 'column_' + column.dataField ] = cell;
                that._cells.push( cell );
            }
            else {
                const cell = that[ 'column_' + column.dataField ];

                that._cells.push( cell );
            }
        }
    }

    toggle( event ) {
        const that = this;

        that.element._handleExpandCollapse( !that.expanded, event );
    }

    select() {
        const that = this;

        that.setProperty( 'selected', true );
    }

    unselect() {
        const that = this;

        that.setProperty( 'selected', false );
    }

    expand() {
        const that = this;

        that.element._handleExpandCollapse( true );
    }

    collapse() {
        const that = this;

        that.element._handleExpandCollapse( false );
    }

    render() {
        const that = this;

        that.element.row = that;

        that.element._render();
    }

    setProperty( propertyName, value ) {
        const that = this;
        const oldValue = that.getProperty( propertyName );

        that[ propertyName ] = value;

        if ( oldValue !== value ) {
            that.canNotify = false;
            that.propertyChanged( propertyName, oldValue, value );
            that.canNotify = true;
        }
    }

    getProperty( propertyName ) {
        const that = this;

        if ( propertyName === 'selected' && that.grid ) {
            let selected = false;

            if ( that.grid._selection.cells[ 'row' + that.id ] ) {
                selected = null;
            }

            if ( that.grid && that.grid._selection.rows[ that.id ] ) {
                selected = true;
            }

            that.grid.rows.canNotify = false;
            that[ propertyName ] = selected;
            that.grid.rows.canNotify = true;

            return selected;
        }

        return that[ propertyName ];
    }

    propertyChanged( propertyName, oldValue, newValue ) {
        const that = this;

        if ( propertyName === 'showDetail' ) {
            that.height = 0;

            const detail = that.element.rowDetail;

            if ( that.grid.appearance.allowRowDetailToggleAnimation && !that.grid.rowDetail.dialog.enabled ) {
                const toggleAnimation = function ( event ) {
                    const row = that.grid._toggledRow;

                    if ( row && ( event.propertyName === 'transform' || event.propertyName === 'height' ) ) {
                        endAnimation( row );
                    }
                };

                const endAnimation = function ( row ) {
                    row.grid.$.content.style.transition = '';
                    row.element.rowDetail.removeEventListener( 'transitionend', toggleAnimation );
                    row.element.rowDetail.removeEventListener( 'transitioncancel', toggleAnimation );
                    row.grid._toggledRow = null;
                    row.element.removeAttribute( 'has-detail' );

                    that.grid._refresh();
                }

                that.grid._toggledRow = that;

                detail.addEventListener( 'transitionend', toggleAnimation );
                detail.addEventListener( 'transitioncancel', toggleAnimation );

                if ( newValue ) {
                    that.element.setAttribute( 'has-detail', '' );
                    that.element.toggleDetailButton.removeAttribute( 'toggled' );
                    that.element.toggleDetailButton.classList.remove( 'lw-animate' );
                    setTimeout( () => {
                        that.element.toggleDetailButton.classList.add( 'lw-animate' );
                        that.element.toggleDetailButton.setAttribute( 'toggled', '' );
                        that.element.setAttribute( 'show-detail', '' );
                    } );

                    that.element.style.height = that.cellHeight + that.detailHeight + 'px';

                    if ( that.grid._autoHeight ) {
                        that.grid.$.content.style.transition = '0.25s height ease-in-out';
                        that.grid.$.content.style.height = parseInt( that.grid.$.content.style.height ) + that.detailHeight + 'px';
                        that.grid.$.scrollView.style.height = 'auto';
                    }


                    detail.classList.remove( 'lw-hidden' );
                    if ( detail.style.height !== that.detailHeight + 'px' ) {
                        detail.style.height = that.detailHeight + 'px';
                    }

                    if ( detail.style.lineHeight !== that.detailHeight + 'px' ) {
                        detail.style.lineHeight = that.detailHeight + 'px';
                    }

                    if ( detail.style.top !== that.cellHeight + 'px' ) {
                        detail.style.top = that.cellHeight + 'px';
                    }
                }
                else {
                    that.element.setAttribute( 'has-detail', '' );
                    that.element.toggleDetailButton.removeAttribute( 'toggled' );
                    if ( that.grid._autoHeight ) {
                        that.grid.$.content.style.transition = '0.25s height ease-in-out';
                        that.grid.$.content.style.height = parseInt( that.grid.$.content.style.height ) - that.detailHeight + 'px';
                        that.grid.$.scrollView.style.height = 'auto';
                    }

                    setTimeout( () => {
                        that.element.style.height = that.cellHeight + 'px';
                        that.element.removeAttribute( 'show-detail' );
                    } );
                }
            }
            else {
                that.grid._refresh();
            }
        }

        if ( propertyName === 'allowCheck' || propertyName === 'allowSelect' ) {
            that.grid._recycle();
        }

        if ( propertyName === 'checked' ) {
            if ( that.grid.checkBoxes.hasThreeStates ) {
                that.grid._hasThreeStates( that, that );
            }

            that.grid._recycle();
        }

        if ( propertyName === 'selected' ) {
            if (false === that.allowSelect) {
                return;
            }

            if ( newValue ) {
                that.grid._selection.rows[ that.id ] = true;
            }
            else if ( newValue === false ) {
                if ( that.grid._selection.rows[ that.id ] ) {
                    delete that.grid._selection.rows[ that.id ];
                }
            }

            if ( !that.element ) {
                return;
            }

            if ( newValue ) {
                that.element.setAttribute( 'aria-selected', true );
            }
            else {
                that.element.removeAttribute( 'aria-selected' );
            }

            that.grid._recycle();
        }

        if ( propertyName === 'visible' ) {
            that.grid.refresh();
        }

        if ( propertyName === 'expanded' ) {
            if ( !that.expandHeight ) {
                that.grid.refresh();
            }
        }
        if ( propertyName === 'height' ) {
            if ( !that.expandHeight ) {
                if ( that.cellHeight !== newValue ) {
                    that.cellHeight = newValue;
                    that.grid.refresh();
                }
            }
        }

        if ( propertyName === 'freeze' ) {
            if ( newValue === true || newValue === 'near' ) {
                that.grid._frozenNearRows.push( that );
            }
            else if ( newValue === 'far' ) {
                that.grid._frozenFarRows.push( that );
            }
            else {
                that.grid._frozenNearRows.splice( that.grid._frozenNearRows.indexOf( that ), 1 );
                that.grid._frozenFarRows.splice( that.grid._frozenFarRows.indexOf( that ), 1 );
            }

            that.grid._recycle();
        }
    }
} );

LW( 'lw-grid-row', class Row extends LW.BaseElement {
    static get properties() {
        return {
        }
    }

    get isUtilityElement() {
        return true;
    }

    get hasStyleObserver() {
        return false;
    }

    addThemeClass() {

    }

    addDefaultClass() {

    }

    _initialize( row ) {
        const that = this;
        const grid = row.grid;
        const columnElements = grid._columnElements;
        const frozenNearColumns = grid._frozenNearColumns;
        const frozenFarColumns = grid._frozenFarColumns;

        const cellsContainerElement = document.createElement( 'div' );
        const cellsNearContainerElement = document.createElement( 'div' );
        const cellsFarContainerElement = document.createElement( 'div' );
        const fragment = document.createDocumentFragment();
        const nearFragment = document.createDocumentFragment();
        const farFragment = document.createDocumentFragment();

        if ( grid.rightToLeft ) {
            cellsNearContainerElement.classList.add( 'far', 'lw-grid-cell-container' );
            cellsContainerElement.classList.add( 'center', 'lw-grid-cell-container' );
            cellsFarContainerElement.classList.add( 'near', 'lw-grid-cell-container' );
        }
        else {
            cellsNearContainerElement.classList.add( 'near', 'lw-grid-cell-container' );
            cellsContainerElement.classList.add( 'center', 'lw-grid-cell-container' );
            cellsFarContainerElement.classList.add( 'far', 'lw-grid-cell-container' );
        }

        that.row = row;
        row.createCells();

        that._mouseEnter = function () {
            if ( grid.isScrolling || grid.editing.isEditing ) {
                return;
            }

            if ( that.commandBar ) {
                that.commandBar.parentNode.removeChild( that.commandBar );
                that.commandBar = null;
            }

            if ( grid.editing.enabled && grid.editing.commandColumn.visible && grid.editing.commandColumn.inline && !that.commandBar ) {
                const commandBar = document.createElement( 'div' );
                const template = grid._getCommandColumnCommandsTemplate();

                commandBar.classList.add( 'lw-grid-command-bar' );
                commandBar.innerHTML = template;

                cellsContainerElement.appendChild( commandBar );

                requestAnimationFrame( () => {
                    commandBar.classList.add( 'show' );
                } )

                grid._updateCommandColumnCommandsVisibility( commandBar, that.row );

                commandBar.onmousedown = function ( event ) {
                    const elements = event.path;
                    let commandItem = null;

                    for ( let i = 0; i < elements.length; i++ ) {
                        if ( elements[ i ].classList.contains( 'lw-grid-command-item' ) ) {
                            commandItem = elements[ i ];
                            break;
                        }
                    }

                    if ( !commandItem ) {
                        //    commandItem = that.querySelector('.lw-grid-command-item');
                    }

                    if ( commandItem ) {
                        const command = commandItem.getAttribute( 'command' );

                        grid._applyCommand( command, [ that.row ] );

                        if ( that.commandBar ) {
                            that.commandBar.parentNode.removeChild( that.commandBar );
                            that.commandBar = null;
                        }
                        that.removeAttribute( 'hover' );

                        event.stopPropagation();
                        event.preventDefault();
                    }
                }

                that.commandBar = commandBar;
            }
        };

        that._mouseLeave = function () {
            if ( grid.isScrolling || grid.editing.isEditing ) {
                return;
            }

            if ( that.commandBar ) {
                that.commandBar.classList.remove( 'show' );
                that.commandBar.addEventListener( 'transitionend', function () {
                    if ( that.commandBar ) {
                        that.commandBar.parentNode.removeChild( that.commandBar );
                        that.commandBar = null;
                    }
                } );

                that.commandBar.addEventListener( 'transitioncancel', function () {
                    if ( that.commandBar ) {
                        that.commandBar.parentNode.removeChild( that.commandBar );
                        that.commandBar = null;
                    }
                } );
            }
        };

        that.addEventListener( 'mouseenter', that._mouseEnter );

        that.addEventListener( 'mouseleave', that._mouseLeave );

        for ( let i = 0; i < frozenNearColumns.length; i++ ) {
            const column = frozenNearColumns[ i ];
            const cell = row.getCell( column );
            const cellElement = cell.createElement();

            nearFragment.appendChild( cellElement );
        }

        for ( let i = 0; i < frozenFarColumns.length; i++ ) {
            const column = frozenFarColumns[ i ];
            const cell = row.getCell( column );
            const cellElement = cell.createElement();

            farFragment.appendChild( cellElement );
        }

        for ( let i = 0; i < columnElements.length; i++ ) {
            const columnElement = columnElements[ i ];
            const column = columnElement.column;

            if ( !columnElement.parentNode || !column ) {
                break;
            }

            const cell = row.getCell( column );
            const cellElement = cell.createElement();

            if ( column && column._treeColumn ) {
                that.toggleButton = cellElement.toggleButton;
            }

            fragment.appendChild( cellElement );
        }

        cellsNearContainerElement.appendChild( nearFragment );
        cellsContainerElement.appendChild( fragment );
        cellsFarContainerElement.appendChild( farFragment );

        const rowDetailElement = document.createElement( 'div' );
        rowDetailElement.classList.add( 'lw-grid-row-detail', 'lw-hidden', 'lw-animate' );

        const rowContainerElement = document.createElement( 'div' );
        rowContainerElement.classList.add( 'lw-grid-row-sub-container', 'lw-hidden' );

        that._rowFragment = document.createDocumentFragment();

        that._rowFragment.appendChild( cellsNearContainerElement );
        that._rowFragment.appendChild( cellsContainerElement );
        that._rowFragment.appendChild( cellsFarContainerElement );
        that._rowFragment.appendChild( rowDetailElement );
        that._rowFragment.appendChild( rowContainerElement );

        that.appendChild( that._rowFragment );

        that.cellsNearContainerElement = that.children[ 0 ];
        that.cellsContainerElement = that.children[ 1 ];
        that.cellsFarContainerElement = that.children[ 2 ];
        that.rowDetail = that.children[ 3 ];
        that.rowContainer = that.children[ 4 ];

        if ( grid.layout.rowHeight && grid.layout.rowHeight !== 'auto' ) {
            that.style.height = grid.layout.rowHeight + 'px';
        }

        delete that._rowFragment;
    }

    get enableShadowDOM() {
        return false;
    }

    _handleExpandCollapse( expanded, event ) {
        const that = this;
        const row = that.row;
        const grid = row.grid;

        if ( !row.allowToggle ) {
            return null;
        }

        grid._toggledRow = row;

        let eventDetails = {
            'row': row
        }

        if ( event ) {
            eventDetails.originalEvent = event.originalEvent;
        }

        grid.$.fireEvent( expanded ? 'rowExpand' : 'rowCollapse', eventDetails );

        const setRowHeight = function () {
            const row = grid._toggledRow;

            grid._refresh();
            grid._refreshRowHierarchy();

            let expandHeight = 0;

            for ( let i = 0; i < grid.rowHierarchy.length; i++ ) {
                const row = grid.rowHierarchy[ i ];

                let parent = row.parent;

                while ( parent ) {
                    if ( parent.id === grid._toggledRow.id ) {
                        expandHeight += row.height;
                    }

                    parent = parent.parent;
                }
            }

            const value = grid._scrollView.scrollTop;
            const remainingHeight = grid._contentHeight - ( row.cellHeight + row.top - value );

            row.expandHeight = Math.min( remainingHeight, expandHeight );
            row.height = row.cellHeight + row.expandHeight;
        }

        const requestNewData = grid.dataSource.virtualDataSourceOnExpand && expanded && row.data._loaded !== true;

        if ( !grid.appearance.allowRowToggleAnimation || requestNewData ) {
            grid.rows.canNotify = false;
            row.expanded = expanded;
            grid.rows.canNotify = true;

            if ( requestNewData ) {
                row.data._loaded = true;
                row.data.expanded = expanded;
                grid._virtualDataRequest( 'expand' );
            }

            grid._toggledRow = null;
            grid._refresh();

            if ( requestNewData && grid.appearance.allowRowToggleAnimation ) {
                that.toggleButton.removeAttribute( 'toggled' );
                that.toggleButton.classList.remove( 'lw-animate' );
                setTimeout( () => {
                    that.toggleButton.classList.add( 'lw-animate' );
                    that.toggleButton.setAttribute( 'toggled', '' );
                }, 50 );
            }
        }
        else {
            const endAnimation = function ( row ) {
                row.height = row.cellHeight;
                grid.$.content.style.transition = '';
                row.element.rowContainer.innerHTML = '';
                row.element.rowContainer.classList.add( 'lw-hidden' );
                row.element.rowContainer.removeEventListener( 'transitionend', toggleAnimation );
                row.element.rowContainer.removeEventListener( 'transitioncancel', toggleAnimation );
                row.element.rowContainer.style.height = '';
                row.element.rowContainer.style.transform = '';
                row.element.rowContainer.style.transition = '';
                row.element.rowContainer.classList.remove( 'lw-animate' )

                if ( row.element.toggleButton ) {
                    row.element.toggleButton.classList.remove( 'lw-animate' );
                }
                grid._refresh();
            }

            const toggleAnimation = function ( event ) {
                const row = grid._toggledRow;

                that._toggleTimer = null;
                grid._toggledRow = null;
                if ( row && ( event.propertyName === 'transform' || event.propertyName === 'height' ) ) {
                    setTimeout( () => {
                        endAnimation( row );
                    }, 50 );
                }
            };

            if ( that._toggleTimer ) {
                clearTimeout( that._toggleTimer );

                const row = grid._toggledRow;
                grid._toggledRow = null;

                endAnimation( row );
            }

            that._toggleTimer = setTimeout( () => {
                const updateHeightAndRefresh = function () {
                    setRowHeight();
                    grid._recycle( false );

                    that.style.overflow = 'hidden';
                    that.style.height = 'auto';
                    that.style.lineHeight = row.cellHeight + 'px';
                }

                if ( expanded ) {
                    row.expanded = true;

                    updateHeightAndRefresh();

                    that.rowContainer.style.transform = 'scaleY(0)';
                    that.rowContainer.style.height = '0px';

                    if ( that.toggleButton ) {
                        that.toggleButton.removeAttribute( 'toggled' );
                    }

                    if ( grid._autoHeight ) {
                        grid.$.content.style.height = parseInt( grid.$.content.style.height ) - row.expandHeight + 'px';
                    }

                    setTimeout( function () {
                        if ( that.toggleButton ) {
                            that.toggleButton.classList.add( 'lw-animate' );
                            that.toggleButton.setAttribute( 'toggled', '' );
                        }
                        that.rowContainer.addEventListener( 'transitionend', toggleAnimation );
                        that.rowContainer.addEventListener( 'transitioncancel', toggleAnimation );

                        if ( grid._autoHeight ) {
                            grid.$.content.style.transition = '0.25s height ease-in-out';
                            grid.$.content.style.height = parseInt( grid.$.content.style.height ) + row.expandHeight + 'px';
                        }

                        that.rowContainer.classList.add( 'lw-animate' )
                        that.rowContainer.style.height = row.expandHeight + 'px';
                        that.rowContainer.style.transform = 'scaleY(1)';
                    } );
                }
                else {
                    updateHeightAndRefresh();
                    row.expanded = false;

                    that.rowContainer.style.transform = 'scaleY(0)';
                    that.rowContainer.style.height = '0px';

                    if ( grid._autoHeight ) {
                        grid.$.content.style.height = parseInt( grid.$.content.style.height ) - row.expandHeight + 'px';
                        grid.$.content.style.transition = '';
                        grid.$.content.style.height = parseInt( grid.$.content.style.height ) + row.expandHeight + 'px';
                    }

                    that.rowContainer.style.height = row.expandHeight + 'px';
                    that.rowContainer.style.transform = 'scaleY(1)';

                    if ( that.toggleButton ) {
                        that.toggleButton.setAttribute( 'toggled', '' );
                        that.toggleButton.classList.add( 'lw-animate' );
                    }

                    setTimeout( function () {
                        if ( that.toggleButton ) {
                            that.toggleButton.removeAttribute( 'toggled', '' );
                        }

                        if ( grid._autoHeight ) {
                            grid.$.content.style.transition = '0.25s height ease-in-out';
                            grid.$.content.style.height = parseInt( grid.$.content.style.height ) - row.expandHeight + 'px';
                        }

                        that.rowContainer.addEventListener( 'transitionend', toggleAnimation );
                        that.rowContainer.addEventListener( 'transitioncancel', toggleAnimation );
                        that.rowContainer.classList.add( 'lw-animate' )
                        //     that.rowContainer.style.transition = 'transform .25s ease-in-out, height .25s ease-in-out';
                        that.rowContainer.style.transform = 'scaleY(0)';
                        that.rowContainer.style.height = '0px';
                    }, 0 );
                }
            }, 50 );
        }
    }

    _renderAddNewRow() {
        const that = this;

        const row = that.row;
        const grid = row.grid;
        const element = row.element;
        const cell = new LW.Grid.Cell( row, grid.columns[ 0 ], grid );

        if ( row.visible ) {
            element.classList.remove( 'lw-hidden' );
        }
        else {
            element.classList.add( 'lw-hidden' );
        }

        element.innerHTML = '<lw-grid-cell><div>' + grid.localize( 'addNewRow' ) + '</div></lw-grid-cell>';
        element.firstChild.firstChild.classList.add( 'align-center' );
        element.firstChild.classList.add( 'lw-grid-column-border-collapse' );
        element.firstChild.setAttribute( 'freeze', '' );
        element.firstChild.setAttribute( 'addNewRow', '' );

        element.firstChild.style.width = '100%';
        if ( grid._scrollView.vScrollBar.offsetWidth > 0 ) {
            element.firstChild.style.width = 'calc(100% - ' + ( -1 + grid._scrollView.vScrollBar.offsetWidth ) + 'px)';
        }

        element.firstChild.cell = cell;

        if ( grid._rowGap > 0 && row !== grid.rows[ grid.rows.length - 1 ] ) {
            that.style.marginBottom = grid._rowGap + 'px';

            if ( parseInt( that.style.height ) - grid._rowGap !== row.height ) {
                that.style.height = row.height - grid._rowGap + 'px';
            }

            if ( parseInt( that.style.lineHeight ) - grid._rowGap !== row.height ) {
                that.style.lineHeight = row.height - grid._rowGap + 'px';
            }
        }
        else {
            that.style.marginBottom = '';
            if ( parseInt( that.style.height ) !== row.height ) {
                that.style.height = row.height + 'px';
            }

            if ( parseInt( that.style.lineHeight ) !== row.height ) {
                that.style.lineHeight = row.height + 'px';
            }
        }
    }

    _renderFilterRow() {
        const that = this;

        const row = that.row;
        const grid = row.grid;
        const element = row.element;
        //const cell = new LW.Grid.Cell( row, grid.columns[ 0 ], grid );

        if ( row.visible ) {
            element.classList.remove( 'lw-hidden' );
        }
        else {
            element.classList.add( 'lw-hidden' );
        }

        element.innerHTML = '<lw-grid-cell><div>' + grid.localize( 'addNewRow' ) + '</div></lw-grid-cell>';
        element.firstChild.firstChild.classList.add( 'align-center' );
        element.firstChild.classList.add( 'lw-grid-column-border-collapse' );
        element.firstChild.setAttribute( 'freeze', '' );
        element.firstChild.setAttribute( 'addNewRow', '' );

        element.firstChild.style.width = '100%';
        if ( grid._scrollView.vScrollBar.offsetWidth > 0 ) {
            element.firstChild.style.width = 'calc(100% - ' + ( -1 + grid._scrollView.vScrollBar.offsetWidth ) + 'px)';
        }

        that.style.marginBottom = '';
        if ( parseInt( that.style.height ) !== row.height ) {
            that.style.height = row.height + 'px';
        }

        if ( parseInt( that.style.lineHeight ) !== row.height ) {
            that.style.lineHeight = row.height + 'px';
        }
    }

    _renderEmpty() {
        const that = this;
        that.classList.add( 'lw-hidden' );
    }

    _renderCell( row, column, element ) {
        if ( !column ) {
            element.classList.add( 'lw-hidden' );
            return;
        }

        let cell = row.getCell( column );

        if ( cell.element !== element ) {
            cell._styleChanged = true;
        }

        if ( element.cell !== cell ) {
            if ( element.cell.background !== cell.background ||
                element.cell.borderColor !== cell.borderColor ||
                element.cell.color !== cell.color ||
                element.cell.fontSize !== cell.fontSize ||
                element.cell.fontFamily !== cell.fontFamily ||
                element.cell.fontWeight !== cell.fontWeight ||
                element.cell.fontStyle !== cell.fontStyle ) {
                cell._styleChanged = true;
            }
        }

        cell.element = element;
        element.cell = cell;

        if ( column._treeColumn && cell.element.isRendered && !LW.Utilities.Core.isMobile ) {
            cell.element._refresh();
        }

        cell.render();

        if ( column && column.rowHeaderColumn ) {
            row.header = element;
            element.setAttribute( 'data-id', row.id );
        }
    }

    _alternate() {
        const that = this;

        const row = that.row;
        const grid = row.grid;

        const start = grid.appearance.alternationStart;
        const end = grid.appearance.alternationEnd > 0 ? grid.appearance.alternationEnd : Infinity;

        if ( grid.appearance.alternationCount <= 0 ) {
            return;
        }

        that.removeAttribute( 'alternation-index' );

        if ( row.visibleIndex >= start && row.visibleIndex <= end ) {
            const alternationIndex = ( row.visibleIndex - start ) % grid.appearance.alternationCount;

            that.setAttribute( 'alternation-index', alternationIndex );
        }
    }

    _openRowDetailDialog( detail ) {
        const that = this;
        const grid = that.row.grid;
        const row = that.row;

        if ( !grid.rowDetail.dialog.enabled || !row.showDetail ) {
            return false;
        }

        const dialog = grid._dialogRowDetail || grid._createDialog( grid.rowDetail.dialog );

        if ( grid.rowDetail.dialog.visible && dialog.row !== row ) {
            row.showDetail = false;
            return;
        }


        const header = grid.rowDetail.dialog.header === '{{message}}' ? grid.localize( 'dialogRowDetailHeader', { value: row.visibleIndex + 1 } ) : grid.rowDetail.dialog.header;

        if ( grid.rowDetail.dialog.visible && grid.rowDetail.dialog.row === row && !row.showDetail ) {
            dialog.close();
            return;
        }

        dialog.header.innerHTML = header;
        dialog.content.innerHTML = '';
        dialog.content.style.width = '100%';
        dialog.content.style.height = '100%';
        dialog.row = row;
        dialog.querySelector( '.lw-footer' ).classList.add( 'lw-hidden' );

        if ( !grid._dialogRowDetail ) {
            dialog.setAttribute( 'tabindex', 0 );
            dialog.modal = true;
            dialog.btnConfirm.innerHTML = grid.localize( 'dialogRowDetailButtonConfirm' );
            dialog.btnCancel.innerHTML = grid.localize( 'dialogRowDetailButtonCancel' );
            dialog.btnCancel.classList.add( 'lw-hidden' );
            dialog.onOpen = function () {
                grid.rowDetail.dialog.visible = true;
            }

            dialog.onClose = function () {
                grid.rowDetail.dialog.visible = false;
                dialog.row.showDetail = false;
            }

            dialog.btnCancel.onclick = function () {
                dialog.close();
            }

            dialog.btnClose.onclick = function () {
                dialog.close();
            }

            dialog.btnConfirm.onclick = function () {
                dialog.close();
            }

            dialog.onkeydown = function ( event ) {
                if ( event.key === 'Escape' ) {
                    dialog.close();
                }
            }

            grid._dialogRowDetail = dialog;
        }

        dialog.open();

        setTimeout( function () {
            dialog.focus();
        }, 100 );

        dialog.content.appendChild( detail );
    }

    _renderDetail( detail ) {
        const that = this;
        const grid = that.row.grid;
        const row = that.row;
        let value = row.id;

        let template = row.detailTemplate || grid.rowDetail.template;

        if ( template.startsWith( '#' ) ) {
            template = document.querySelector( template );
        }

        if ( row._detail ) {
            if ( detail.firstChild === row._detail ) {
                if ( grid.onRowDetailUpdated ) {
                    grid.onRowDetailUpdated( row.index, row, detail.firstChild );
                }

                return;
            }

            if ( detail.firstChild ) {
                detail.removeChild( detail.firstChild );
            }

            detail.appendChild( row._detail );

            if ( grid.onRowDetailUpdated ) {
                grid.onRowDetailUpdated( row.index, row, detail.firstChild );
            }

            return;
        }

        if ( template instanceof HTMLTemplateElement ) {
            const templateContent = template.content.cloneNode( true ).firstElementChild;

            value = value.toString();
            value = value.replace( /'/ig, '\\\'' );
            value = value.replace( /"/ig, '\\"' );

            let html = templateContent.outerHTML.replace( /{{value}}/ig, value ).replace( /{{id}}/ig, row.id );

            if ( html.indexOf( '{{value=' ) >= 0 ) {
                if ( !value ) {
                    html = html.replace( /{{value=/ig, '' );
                    html = html.replace( /}}/ig, '' );
                }
                else {
                    html = html.substring( 0, html.indexOf( '{{value=' ) ) + value + html.substring( html.indexOf( '}' ) );
                    html = html.replace( /}/ig, '' );
                    html = html.replace( /{/ig, '' );
                }
            }

            html = '<div>' + html + '</div>';

            for ( let name in row.data ) {
                html = html.replace( '{{' + name + '}}', row.data[ name ] )
            }

            if ( detail.innerHTML !== html ) {
                detail.innerHTML = html;
            }
        }
        else {
            let html = '<div>' + template.replace( /{{value}}/ig, value ).replace( /{{id}}/ig, row.id ) + '</div>';

            for ( let name in row.data ) {
                html = html.replace( '{{' + name + '}}', row.data[ name ] )
            }

            if ( detail.innerHTML !== html ) {
                detail.innerHTML = html;
            }
        }

        if ( grid.onRowDetailInit ) {
            grid.onRowDetailInit( row.index, row, detail.firstChild );
        }

        if ( grid.rowDetail.dialog.enabled ) {
            that._openRowDetailDialog( detail.firstChild.firstElementChild );
        }
        else {
            row._detail = detail.firstChild;
        }
    }

    _render() {
        let that = this;
        const row = that.row;
        const grid = row.grid;

        const selected = row.getProperty( 'selected' );

        if ( selected === false && that.hasAttribute( 'selected' ) ) {
            that.removeAttribute( 'selected' );
        }
        else if ( selected === true ) {
            that.setAttribute( 'selected', '' );
        }
        else if ( selected === null ) {
            that.setAttribute( 'selected', 'indeterminate' );
        }

        if ( !row.allowSelect ) {
            that.setAttribute( 'selected', 'none' );
        }

        if ( that.hasAttribute( 'unbound' ) ) {
            that.removeAttribute( 'unbound' );
        }

        if ( row.unbound ) {
            that.setAttribute( 'unbound', '' );
        }

        that.removeAttribute( 'focus' );

        if ( !grid._toggledRow && that.classList.contains( 'lw-animate' ) ) {
            that.classList.remove( 'lw-animate' );
            that.rowContainer.innerHTML = '';
            that.rowContainer.classList.add( 'lw-hidden' );
            grid._refreshLayout();
            grid._recycle();

            return;
        }

        if ( grid.columns.length === 0 ) {
            that._renderEmpty();
            return;
        }

        if ( row.addNewRow ) {
            that._renderAddNewRow();
            return;
        }


        if ( grid._toggledRow ) {
            if ( row.id === grid._toggledRow.id ) {
                that.setAttribute( 'toggle', '' );
            }
            else if ( that.hasAttribute( 'toggle' ) ) {
                that.removeAttribute( 'toggle' );
            }
        }

        if ( grid._toggledRow && grid.appearance.allowRowToggleAnimation ) {
            let parentRow = row.parent;

            if ( !grid._toggledRow.expanded && grid._toggledRow.id === row.id ) {
                const rowContainer = that.rowContainer;

                for ( let i = 0; i < rowContainer.children.length; i++ ) {
                    const animatingRowElement = rowContainer.children[ i ];
                    const uid = animatingRowElement.getAttribute( 'data-id' );
                    const animatingRow = grid.rowById[ uid ];

                    if ( animatingRowElement.getAttribute( 'data-rendered' ) ) {
                        continue;
                    }

                    animatingRowElement.setAttribute( 'data-rendered', true );
                    animatingRow.element = animatingRowElement;

                    animatingRow.render();
                }
            }

            while ( parentRow ) {
                if ( parentRow.id === grid._toggledRow.id ) {
                    const rowContainer = parentRow.element.rowContainer;

                    if ( grid._toggledRow.expanded ) {
                        that.classList.add( 'lw-hidden' );
                        let rowElement = row.createElement( grid );

                        for ( let i = 0; i < rowContainer.children.length; i++ ) {
                            const animatingRowElement = rowContainer.children[ i ];

                            if ( animatingRowElement.getAttribute( 'data-id' ) === row.id.toString() ) {
                                rowElement = animatingRowElement;
                                return;
                            }
                        }

                        row.element = rowElement;
                        rowContainer.appendChild( rowElement );
                        rowContainer.classList.remove( 'lw-hidden' );

                        rowElement.row = row;

                        that = rowElement;
                    }
                    break;

                }

                parentRow = parentRow.parent;
            }
        }

        that._alternate();

        const nearWidth = parseFloat( grid.$.columnNearContainer.style.width );
        const centerWidth = parseFloat( grid.$.columnContainer.style.width );
        const farWidth = parseFloat( grid.$.columnFarContainer.style.width );
        const cellsCenterContainerElement = that.children[ 1 ];
        const cellsNearContainerElement = that.children[ 0 ];
        const cellsFarContainerElement = that.children[ 2 ];

        if ( !grid.rightToLeft ) {
            cellsFarContainerElement.classList.remove( 'vscroll' );

            if ( grid.computedVerticalScrollBarVisibility ) {
                cellsFarContainerElement.classList.add( 'vscroll' );
            }
        }
        else {
            cellsNearContainerElement.classList.remove( 'vscroll' );

            if ( grid.computedVerticalScrollBarVisibility ) {
                cellsNearContainerElement.classList.add( 'vscroll' );
            }
        }


        if ( that.hasAttribute( 'group' ) ) {
            that.removeAttribute( 'group' );
        }

        if ( that.hasAttribute( 'tree' ) ) {
            that.removeAttribute( 'tree' );
        }

        if ( that.hasAttribute( 'level' ) ) {
            that.removeAttribute( 'level' );
            that.removeAttribute( 'aria-level' );
        }

        if ( that.hasAttribute( 'leaf' ) ) {
            that.removeAttribute( 'leaf' );
        }

        if ( that.hasAttribute( 'expanded' ) ) {
            that.removeAttribute( 'expanded' );
        }

        if ( that.hasAttribute( 'summary' ) ) {
            that.removeAttribute( 'summary' );
        }

        if ( that.hasAttribute( 'filter' ) ) {
            that.removeAttribute( 'filter' );
        }

        if ( row.filtered === null ) {
            that.setAttribute( 'filter', 'indeterminate' )
        }

        if ( grid.dataSource.groupBy && grid.dataSource.groupBy.length > 0 && grid.grouping.renderMode === 'advanced' ) {
            that.setAttribute( 'level', row.level );
            that.setAttribute( 'aria-level', row.level );

            if ( row.expanded ) {
                that.setAttribute( 'expanded', '' );
            }

            if ( row.label !== undefined && row.level === grid.dataSource.groupBy.length - 1 ) {
                that.setAttribute( 'leaf', '' );
            }

            if ( row.label !== undefined ) {
                that.setAttribute( 'group', '' );
            }
            else {
                that.setAttribute( 'leaf', '' );
            }

            if ( row.summaryRow ) {
                that.setAttribute( 'summary', '' );
            }

            if ( that.toggleButton ) {
                that.toggleButton.classList.remove( 'lw-hidden' );
            }
        }
        else if ( grid.dataSource.boundHierarchy ) {
            that.setAttribute( 'level', row.level );
            that.setAttribute( 'aria-level', row.level );

            if ( row.expanded ) {
                that.setAttribute( 'expanded', '' );
            }

            if ( row.leaf ) {
                that.setAttribute( 'leaf', '' );
            }

            if ( row.summaryRow ) {
                that.setAttribute( 'summary', '' );
            }

            if ( that.toggleButton ) {
                that.toggleButton.classList.remove( 'lw-hidden' );
            }
        }
        else {
            row.canNotify = false;
            row.leaf = true;
            row.expanded = false;
            row.summaryRow = false;

            if ( row.data.summaryRow ) {
                row.summaryRow = true;
            }

            row.level = 0;
            if ( that.toggleButton ) {
                that.toggleButton.classList.add( 'lw-hidden' );
            }
            row.canNotify = true;
        }

        that.setAttribute( 'data-id', row.id );
        that.visible = row.visible;
        that.cellsNearContainerElement.classList.remove( 'lw-visibility-hidden' );
        that.cellsContainerElement.classList.remove( 'lw-visibility-hidden' );
        that.cellsFarContainerElement.classList.remove( 'lw-visibility-hidden' );
        that.removeAttribute( 'rowspan' );

        if ( grid._rowGap > 0 && row !== grid.rows[ grid.rows.length - 1 ] ) {
            that.style.marginBottom = grid._rowGap + 'px';

            if ( parseInt( that.style.height ) - grid._rowGap !== row.height ) {
                that.style.height = row.height - grid._rowGap + 'px';
            }

            if ( parseInt( that.style.lineHeight ) - grid._rowGap !== row.height ) {
                that.style.lineHeight = row.height - grid._rowGap + 'px';
            }
        }
        else {
            that.style.marginBottom = '';
            if ( parseInt( that.style.height ) !== row.height ) {
                that.style.height = row.height + 'px';
            }

            if ( parseInt( that.style.lineHeight ) !== row.height ) {
                that.style.lineHeight = row.height + 'px';
            }
        }

        if ( !grid.rightToLeft ) {
            if ( cellsCenterContainerElement.style.left !== -grid._scrollView.scrollLeft + 'px' ) {
                cellsCenterContainerElement.style.left = -grid._scrollView.scrollLeft + 'px';
            }
        }
        else {
            if ( cellsCenterContainerElement.style.right !== grid._scrollView.scrollWidth - grid._scrollView.scrollLeft - grid._scrollView.vScrollBar.offsetWidth + 'px' ) {
                cellsCenterContainerElement.style.right = grid._scrollView.scrollWidth - grid._scrollView.scrollLeft - grid._scrollView.vScrollBar.offsetWidth + 'px';
            }
        }

        if ( grid.rowDetail.enabled ) {
            const detail = that.rowDetail;

            that.removeAttribute( 'show-detail' );

            if ( row.showDetail ) {
                detail.classList.remove( 'lw-hidden' );

                that.setAttribute( 'show-detail', '' );

                if ( !grid.rowDetail.dialog.enabled ) {
                    if ( detail.style.height !== row.detailHeight + 'px' ) {
                        detail.style.height = row.detailHeight + 'px';
                    }

                    if ( detail.style.lineHeight !== row.detailHeight + 'px' ) {
                        detail.style.lineHeight = row.detailHeight + 'px';
                    }

                    if ( detail.style.top !== row.cellHeight + 'px' ) {
                        detail.style.top = row.cellHeight + 'px';
                    }
                }
                else {
                    detail.classList.add( 'lw-hidden' );
                }

                that._renderDetail( detail );
            }
            else {
                detail.classList.add( 'lw-hidden' );
            }
        }
        else if ( that.rowDetail ) {
            const detail = that.rowDetail;

            detail.classList.add( 'lw-hidden' );
        }

        cellsNearContainerElement.classList.remove( 'lw-hidden' );
        cellsFarContainerElement.classList.remove( 'lw-hidden' );

        if ( cellsNearContainerElement.style.width !== nearWidth + 'px' ) {
            cellsNearContainerElement.style.width = nearWidth + 'px';
        }

        if ( cellsCenterContainerElement.style.width !== centerWidth + 'px' ) {
            cellsCenterContainerElement.style.width = centerWidth + 'px';
        }

        if ( cellsFarContainerElement.style.width !== farWidth + 'px' ) {
            cellsFarContainerElement.style.width = farWidth + 'px';
        }

        cellsNearContainerElement.style.height = row.cellHeight + 'px';
        cellsCenterContainerElement.style.height = row.cellHeight + 'px';
        cellsFarContainerElement.style.height = row.cellHeight + 'px';

        if ( farWidth === 0 ) {
            cellsFarContainerElement.classList.add( 'lw-hidden' );
        }

        if ( nearWidth === 0 ) {
            cellsNearContainerElement.classList.add( 'lw-hidden' );
        }

        if ( nearWidth > 0 && parseInt( nearWidth ) === parseInt( grid._autoGeneratedColumnsNearWidth ) ) {
            //     cellsNearContainerElement.classList.add('border-collapse');
        }

        if ( farWidth > 0 && parseInt( farWidth ) === parseInt( grid._autoGeneratedColumnsFarWidth ) ) {
            cellsFarContainerElement.classList.add( 'border-collapse' );
        }

        for ( let j = 0; j < grid._frozenNearColumns.length; j++ ) {
            const column = grid._frozenNearColumns[ j ];

            let cellElement = that.children[ 0 ].children[ j ];

            if ( !cellElement ) {
                const cell = row.getCell( column );

                cellElement = cell.createElement();
                that.children[ 0 ].appendChild( cellElement );
            }

            that._renderCell( row, column, cellElement );
        }

        for ( let j = 0; j < grid._frozenFarColumns.length; j++ ) {
            const column = grid._frozenFarColumns[ j ];
            let cellElement = that.children[ 2 ].children[ j ];

            if ( !cellElement ) {
                const cell = row.getCell( column );

                cellElement = cell.createElement();
                that.children[ 2 ].appendChild( cellElement );
            }

            that._renderCell( row, column, cellElement );
        }

        for ( let j = 0; j < cellsCenterContainerElement.children.length; j++ ) {
            const columnElement = grid._columnElements[ j + grid._frozenNearColumns.length ];

            if ( !columnElement ) {
                let cellElement = that.children[ 1 ].children[ j ];

                that._renderCell( row, null, cellElement );
            }
        }


        for ( let j = 0; j < grid._columnElements.length; j++ ) {
            const columnElement = grid._columnElements[ j ];
            const column = columnElement.column;

            if ( !columnElement.parentNode || !column ) {
                if ( columnElement && !column ) {
                    let cellElement = that.children[ 1 ].children[ j ];

                    if ( cellElement ) {
                        cellElement.classList.add( 'lw-visibility-hidden' );
                    }
                }

                continue;
            }

            let cellElement = that.children[ 1 ].children[ j ];

            if ( !cellElement ) {
                if ( !columnElement.column ) {
                    columnElement.column = column;
                }

                const cell = row.getCell( column );

                cellElement = cell.createElement();
                that.children[ 1 ].appendChild( cellElement );
            }

            if ( columnElement.classList.contains( 'lw-visibility-hidden' ) ) {
                cellElement.classList.add( 'lw-visibility-hidden' );
                continue;
            }
            else {
                cellElement.classList.remove( 'lw-visibility-hidden' );
            }

            that._renderCell( row, column, cellElement );
        }

        if ( !that.visible ) {
            that.classList.add( 'lw-hidden' );
        }
        else {
            that.classList.remove( 'lw-hidden' );
        }
    }

    template() {
        return '';
    }

    _detach() {
        const that = this;

        that.row.headerCell = null;
        that.row._cells = [];
        that.row = null;
        delete that.row;

        that.element = null;

        that.removeEventListener( 'mouseenter', that._mouseEnter );
        that.removeEventListener( 'mouseleave', that._mouseLeave );

        delete that.element;
        delete that.grid;
        delete that._mouseEnter;
        delete that._mouseLeave;
        delete that.cellsNearContainerElement;
        delete that.cellsContainerElement;
        delete that.cellsFarContainerElement;
        delete that.rowDetail;
        delete that.rowContainer;
    }

    onDetached() {
        const that = this;

        that._detach();
    }
} );
