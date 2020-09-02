
LW.Utilities.Assign( 'Grid.Column', class Column {
    constructor ( column ) {
        const that = this;

        if ( typeof column !== 'string' ) {
            Object.assign( that, column );
        }
        else {
            that.label = column;
            that.dataField = column;
        }

        if ( !that.dataType ) {
            that.dataType = 'string';
        }

        if ( !that.columnGroup ) {
            that.columnGroup = '';
        }

        that.canNotify = true;

        that.data = column;

        let align = 'left';

        switch ( that.dataType ) {
            case 'string':
            case 'date':
                align = 'left';
                break;
            case 'number':
                align = 'right';
                break;
            case 'boolean':
                align = 'center';
                break;
        }

        if ( that.index === undefined ) {
            that.index = -1;
        }

        if ( that.visibleIndex === undefined ) {
            that.visibleIndex = -1;
        }

        if ( that.selected === undefined ) {
            that.selected = false;
        }

        if ( !that.label ) {
            that.label = '';
        }

        if ( !that.menuItems ) {
            that.menuItems = null;
        }

        if ( !that.icon ) {
            that.icon = 'lw-icon-user';
        }

        if ( !that.displayField ) {
            that.displayField = that.dataField;
        }

        if ( !that.template ) {
            that.template = '';
        }

        if ( !that.editor ) {
            that.editor = 'input';
        }

        if ( typeof that.editor === 'string' ) {
            that.editor = {
                template: that.editor,
                autoFocus: true
            }
        }
        else {
            if ( undefined === that.editor.autoFocus ) {
                that.editor.autoFocus = true;
            }
        }

        that.menu = null;

        if ( that.allowActionButtonAnimation === undefined ) {
            if ( that.grid ) {
                that.allowActionButtonAnimation = that.grid.appearance.allowColumnActionButtonAnimation;
            }
            else {
                that.allowActionButtonAnimation = false;
            }
        }

        if ( that.allowSortButtonAnimation === undefined ) {
            if ( that.grid ) {
                that.allowSortButtonAnimation = that.grid.appearance.allowColumnSortButtonAnimation;
            }
            else {
                that.allowSortButtonAnimation = false;
            }
        }

        if ( that.autoShowActionButton === undefined ) {
            if ( that.grid ) {
                that.autoShowActionButton = that.grid.appearance.autoShowColumnActionButton;
            }
            else {
                that.autoShowActionButton = false;
            }
        }

        if ( that.autoShowSortButton === undefined ) {
            if ( that.grid ) {
                that.autoShowSortButton = that.grid.appearance.autoShowColumnSortButton;
            }
            else {
                that.autoShowSortButton = true;
            }
        }

        if ( that.showSortButton === undefined ) {
            if ( that.grid ) {
                that.showSortButton = that.grid.appearance.showColumnSortButton;
            }
            else {
                that.showSortButton = false;
            }
        }

        if ( that.showIcon === undefined ) {
            if ( that.grid ) {
                that.showIcon = that.grid.appearance.showColumnIcon;
            }
            else {
                that.showIcon = false;
            }
        }

        if ( that.showDescriptionButton === undefined ) {
            if ( that.grid ) {
                that.showDescriptionButton = that.grid.appearance.showColumnDescriptionButton;
            }
            else {
                that.showDescriptionButton = false;
            }
        }

        if ( that.showCustomButton === undefined ) {
            if ( that.grid ) {
                that.showCustomButton = that.grid.appearance.showColumnCustomButton;
            }
            else {
                that.showCustomButton = false;
            }
        }

        if ( that.showActionButton === undefined ) {
            if ( that.grid ) {
                that.showActionButton = that.grid.appearance.showColumnActionButton;
            }
            else {
                that.showActionButton = false;
            }
        }

        if ( that.allowLabelAnimation === undefined ) {
            if ( that.grid ) {
                that.allowLabelAnimation = that.grid.appearance.allowColumnLabelAnimation;
            }
            else {
                that.allowLabelAnimation = false;
            }
        }

        if ( that.autoShowFilterButton === undefined ) {
            if ( that.grid ) {
                that.autoShowFilterButton = that.grid.appearance.autoShowColumnFilterButton;
            }
            else {
                that.autoShowFilterButton = false;
            }
        }


        if ( that.showFilterButton === undefined ) {
            if ( that.grid ) {
                that.showFilterButton = that.grid.appearance.showColumnFilterButton;
            }
            else {
                that.showFilterButton = false;
            }
        }

        if ( that.autoCloseMenu === undefined ) {
            if ( that.grid ) {
                that.autoCloseMenu = that.grid.columnMenu.autoClose;
            }
            else {
                that.autoCloseMenu = true;
            }
        }

        if ( !that.formatFunction ) {
            that.formatFunction = null;
        }

        if ( !that.sortOrder ) {
            that.sortOrder = null;
        }

        if ( !that.sortIndex ) {
            that.sortIndex = null;
        }

        if ( !that.filter ) {
            that.filter = null;
        }

        if ( !that.filterMenuMode ) {
            that.filterMenuMode = 'default';

            if ( that.grid && that.grid.filtering.filterMenu.mode === 'excel' ) {
                that.filterMenuMode = 'excel';
            }
        }

        if ( !that.align ) {
            that.align = align;
        }

        if ( !that.cellsAlign ) {
            that.cellsAlign = align;
        }

        if ( !that.cellsWrap ) {
            that.cellsWrap = false;

            if ( that.grid && that.grid.layout.allowCellsWrap ) {
                that.cellsWrap = that.grid.layout.allowCellsWrap;
            }
        }

        if ( !that.minWidth ) {
            that.minWidth = 30;
        }

        if ( !that.width ) {
            that.width = null;
        }

        if ( that.grid && that.grid.columnWidth ) {
            that.width = that.grid.columnWidth;
        }

        if ( that.visible === undefined ) {
            that.visible = true;
        }

        if ( that.allowResize === undefined ) {
            that.allowResize = true;
        }

        if ( that.allowReorder === undefined ) {
            that.allowReorder = true;
        }

        if ( that.allowHide === undefined ) {
            that.allowHide = true;
        }

        if ( that.allowSort === undefined ) {
            that.allowSort = true;
        }

        if ( that.allowSelect === undefined ) {
            that.allowSelect = true;
        }

        if ( that.allowSortToggleOnClick === undefined ) {
            that.allowSortToggleOnClick = true;
        }

        if ( that.allowGroup === undefined ) {
            that.allowGroup = true;
        }

        if ( that.allowFilter === undefined ) {
            that.allowFilter = true;
        }

        if ( that.allowEdit === undefined ) {
            that.allowEdit = true;
        }

        if ( that.allowHeaderEdit === undefined ) {
            that.allowHeaderEdit = true;
        }

        if ( that.allowExport === undefined ) {
            that.allowExport = true;
        }

        if ( that.description === undefined ) {
            that.description = '';
        }

        if ( undefined === that.group ) {
            that.group = false;
        }

        if ( !that.summary ) {
            that.summary = [];
        }

        if ( !that.formatSettings ) {
            that.formatSettings = {
                decimalPlaces: null,
                decimalSeparator: null,
                negativeWithBrackets: null,
                prefix: null,
                sufix: null,
                thousandsSeparator: null,
                dateFormat: 'd'
            }
        }

        that.selected = false;
        that.sorted = false;
        that.filtered = false;
        that.parent = null;
        that.children = [];
    }

    refresh() {
        const that = this;

        if ( that.element ) {
            that.element._refresh();
        }
    }

    render() {
        const that = this;

        that.element.column = that;

        if ( that.element ) {
            that.element._render();
        }
    }

    setProperty( propertyName, value ) {
        const that = this;
        const oldValue = that.getProperty( propertyName );

        if ( oldValue !== value ) {
            that.canNotify = false;
            that[ propertyName ] = value;
            that.propertyChanged( propertyName, oldValue, value );
            that.canNotify = true;
        }
    }

    getProperty( propertyName ) {
        const that = this;

        if ( propertyName === 'selected' ) {
            let selected = false;

            if ( that.grid._selection.cells[ 'column' + that.dataField ] ) {
                selected = null;
            }

            if ( that.grid && that.grid._selection.columns[ that.dataField ] ) {
                selected = true;
            }

            that.grid.columns.canNotify = false;
            that[ propertyName ] = selected;
            that.grid.columns.canNotify = true;

            return selected;
        }

        if ( propertyName === 'group' ) {
            if ( that.dataSource && that.dataSource.groupBy ) {
                return that.dataSource.groupBy.indexOf( that.dataField ) >= 0;
            }

            return false;
        }

        return that[ propertyName ];
    }

    get properties() {
        return [ 'allowExport', 'allowGroup', 'allowSelect', 'verticalAlign', 'columnGroup', 'cellsVerticalAlign', 'autoCloseMenu', 'autoShowActionButton', 'autoShowSortButton', 'autoShowFilterButton', 'allowLabelAnimation', 'allowActionButtonAnimation',
            'allowSortButtonAnimation', 'allowHide', 'allowEdit', 'allowHeaderEdit', 'allowFilter', 'allowSort', 'allowSortToggleOnClick', 'allowResize', 'allowReorder', 'canNotify', 'data', 'description', 'grid', 'icon', 'menuItems', 'menu', 'summary',
            'cellsFormat', 'formatSettings', 'formatFunction', 'index', 'sortIndex', 'sortOrder', 'sorted', 'groups', 'element', 'level', 'group', 'filtered', 'filterEditor', 'filter', 'filterMenuMode', 'dataField', 'displayField', 'label', 'dataType', 'align', 'cellsWrap', 'cellsAlign',
            'minWidth', 'width', 'visible', 'freeze', 'showActionButton', 'selected', 'showIcon', 'showDescriptionButton', 'treeColumn', 'computedWidth', 'computedHeight',
            'overflowWidth', 'parent', 'children', 'onAction', 'left', 'top', 'showCustomButton', 'showFilterButton', 'showSortButton', 'editor', 'template', 'visibleIndex' ]
    }

    propertyChanged( propertyName, oldValue, newValue ) {
        const that = this;

        if (that.data && that.data[propertyName] !== undefined) {
            that.data[propertyName] = newValue;
        }

        if ( propertyName === 'allowSort' ||
            propertyName === 'allowFilter'
        ) {
            that.refresh();
            return;
        }

        if ( propertyName === 'showIcon' ) {
            that.refresh();
            return;
        }

        if ( propertyName === 'visible' ) {
            that.grid.refresh( that.grid.grouping.enabled );
            return;
        }

        if ( propertyName === 'showCustomButton' ) {
            if ( newValue ) {
                that.element._showCustomButton();
            }
            else {
                that.element._hideCustomButton();
            }
        }

        if ( propertyName === 'showDescriptionButton' ) {
            if ( newValue ) {
                that.element._showDescriptionButton();
            }
            else {
                that.element._hideDescriptionButton();
            }
        }

        if ( propertyName === 'filter' ) {
            if ( that.filter ) {
                that.grid.addFilter( that.dataField, that.filter );
                that.filtered = true;
            }
            else {
                that.grid.removeFilter( that.dataField );
                that.filtered = false;
            }

            if ( that.autoShowFilterButton || that.showFilterButton ) {
                if ( newValue ) {
                    that.element._showFilterButton();
                }
                else {
                    that.element._hideFilterButton();
                }
            }
        }

        if ( propertyName === 'sortIndex' ) {
            if ( that.grid.sorting.mode === 'many' ) {
                if ( that.grid.context === document ) {
                    that.grid.sortBy( that.dataField, that.sortOrder );
                }
            }

            return;
        }

        if ( propertyName === 'selected' ) {
            if (false === that.allowSelect) {
                return;
            }

            if ( that.selectionColumn ) {
                that.refresh();
            }

            if ( newValue ) {
                if ( !that.grid._selection.columns[ that.dataField ] ) {
                    that.grid._selection.columns[ that.dataField ] = true;
                }
            }
            else if ( newValue === false ) {
                if ( that.grid._selection.columns[ that.dataField ] ) {
                    delete that.grid._selection.columns[ that.dataField ];
                }
            }

            that.grid._recycle( false );
        }

        if ( propertyName === 'formatSettings' ) {
            that.grid._recycle( false );
        }

        if ( propertyName === 'sortOrder' ) {
            that.sorted = false;

            if ( newValue === null ) {
                that.element._hideSortButton();
            }
            else {
                that.element._showSortButton();
                that.sorted = true;
            }

            if ( that.grid.context === document ) {
                that.grid.sortBy( that.dataField, that.sortOrder );
            }

            if ( that.sorted ) {
                that.element.setAttribute( 'aria-sort', that.sortOrder === 'asc' ? 'ascending' : 'descenting' );
            }
            else {
                that.element.removeAttribute( 'aria-sort' );
            }

            return;
        }

        if ( propertyName === 'group' ) {
            if ( that.grid.context === document ) {
                if ( newValue ) {
                    that.grid.addGroup( that.dataField );
                }
                else {
                    that.grid.removeGroup( that.dataField );
                }
            }

            return;
        }

        if ( propertyName === 'showActionButton' ) {
            that.element.allowAnimations = false;

            if ( newValue ) {
                that.element._showActionButton();
            }
            else {
                that.element._hideActionButton();
            }

            that.element.allowAnimations = true;
        }

        if ( propertyName === 'autoShowActionButton' ) {
            that.element.allowAnimations = false;

            if ( !newValue ) {
                that.element._showActionButton();
            }
            else {
                that.element._hideActionButton();
            }

            that.element.allowAnimations = true;
        }

        if ( propertyName === 'showFilterButton' ) {
            that.element.allowAnimations = false;

            if ( undefined === that._autoShowFilterButton ) {
                that._autoShowFilterButton = that.autoShowFilterButton;
            }

            if ( newValue ) {
                that.autoShowFilterButton = false;
                that.element._showFilterButton();
            }
            else {
                that.element._hideFilterButton();
                that.autoShowFilterButton = that._autoShowFilterButton;
            }

            that.element.allowAnimations = true;
        }

        if ( propertyName === 'showSortButton' ) {
            that.element.allowAnimations = false;

            if ( undefined === that._autoShowSortButton ) {
                that._autoShowSortButton = that.autoShowSortButton;
            }

            if ( newValue ) {
                that.autoShowSortButton = false;
                that.element._showSortButton();
            }
            else {
                that.element._hideSortButton();
                that.autoShowSortButton = that._autoShowSortButton;
            }

            that.element.allowAnimations = true;
        }

        if ( propertyName === 'autoShowSortButton' ) {
            that.element.allowAnimations = false;

            that._autoShowSortButton = that.autoShowSortButton;
            if ( !newValue ) {
                that.element._showSortButton();
            }
            else {
                that.element._hideSortButton();
            }

            that.element.allowAnimations = true;
        }


        if ( propertyName === 'menu' ) {
            if ( newValue ) {
                that.element.setAttribute( 'aria-controls', that.menu.id );
            }
            else {
                that.element.removeAttribute( 'aria-controls' );

                if ( that.autoShowActionButton ) {
                    that.element._hideActionButton();
                }
            }
        }

        if ( propertyName === 'label' ||
            propertyName === 'width' ||
            propertyName === 'minWidth' ) {
            that.grid.refresh();
        }

        if ( propertyName === 'freeze' ) {
            if ( !newValue ) {
                if ( that.freeze === true || that.freeze === 'near' ) {
                    that.element.removeAttribute( 'freeze' );

                    const index = that.grid._frozenNearColumns.indexOf( that );

                    if ( index >= 0 ) {
                        that.grid._frozenNearColumns.splice( index, 0, 0 );
                    }
                }
                else if ( that.freeze === 'far' ) {
                    const index = that.grid._frozenFarColumns.indexOf( that );

                    if ( index >= 0 ) {
                        that.grid._frozenFarColumns.splice( index, 0, 0 );
                    }
                }
            }
            else {
                that.element.setAttribute( 'freeze', '' );

                if ( that.freeze ) {
                    if ( that.freeze === true || that.freeze === 'near' ) {
                        that.grid._frozenNearColumns.push( that );
                    }
                    else {
                        that.grid._frozenFarColumns.push( that );
                    }
                }
            }


            that.grid._createColumnHeaderCellElements();
            that.grid.refresh();
        }
    }

    _measureSize( label ) {
        const that = this;
        const grid = that.grid;

        const widths = ( function () {
            const widths = [];
            const header = document.createElement( 'div' );
            const columnHeaderCellContentElement = document.createElement( 'div' );
            const labels = Array.isArray( label ) ? label : [ label ];

            columnHeaderCellContentElement.classList.add( 'lw-label' );

            header.appendChild( columnHeaderCellContentElement );
            header.style.width = 'auto';
            header.style.position = 'static';
            grid.$.columnHeader.appendChild( header );

            for ( let i = 0; i < labels.length; i++ ) {
                columnHeaderCellContentElement.innerHTML = '<span>' + labels[ i ] + '</span>';

                const width = 20 + columnHeaderCellContentElement.firstChild.offsetWidth;
                const maxWidth = Math.max( 30, width );

                widths.push( maxWidth );
            }

            grid.$.columnHeader.removeChild( header );

            return widths;
        } )();

        if ( widths.length === 1 ) {
            return widths[ 0 ];
        }

        return widths;
    }

    _autoSize( autoSizeHeadersOnly ) {
        const that = this;
        const grid = that.grid;

        let label = that.label.toString();

        if ( !autoSizeHeadersOnly ) {
            const rows = grid.isInitialized ? grid._recyclingRows : [];

            for ( let i = 0; i < rows.length; i++ ) {
                const row = rows[ i ];
                const value = '' + row.data[ that.dataField ];

                if ( value && value.length > label.length ) {
                    label = value;
                }
            }
        }

        const columnWidth = that._measureSize( label );

        return columnWidth;
    }

    autoSize( autoSizeHeadersOnly ) {
        const that = this;
        const columnWidth = that._autoSize( autoSizeHeadersOnly );

        that.width = columnWidth;
    }

    createElement() {
        const that = this;
        const element = document.createElement( 'lw-grid-column' );

        element._initialize( that );
        element.setAttribute( 'role', 'columnheader' );
        element.setAttribute( 'aria-haspopup', '' );

        that.element = element;

        that.grid.notify( function ( propertyName, oldValue, newValue ) {
            switch ( propertyName ) {
                case 'appearance_allowColumnLabelAnimation':
                    that.setProperty( 'allowLabelAnimation', newValue );
                    break;
                case 'appearance_allowColumnSortAnimation':
                    that.setProperty( 'allowSortAnimation', newValue );
                    break;
                case 'appearance_allowColumnSortButtonAnimation':
                    that.setProperty( 'allowSortButtonAnimation', newValue );
                    break;
                case 'appearance_allowColumnActionButtonAnimation':
                    that.setProperty( 'allowActionButtonAnimation', newValue );
                    break;
                case 'appearance_allowColumnFilterButtonAnimation':
                    that.setProperty( 'allowFilterButtonAnimation', newValue );
                    break;
                case 'appearance_autoShowColumnActionButton':
                    that.setProperty( 'autoShowActionButton', newValue );
                    break;
                case 'appearance_autoShowColumnSortButton':
                    that.setProperty( 'autoShowSortButton', newValue );
                    break;
                case 'appearance_autoShowColumnFilterButton':
                    that.setProperty( 'autoShowFilterButton', newValue );
                    break;
                case 'appearance_showColumnActionButton':
                    that.setProperty( 'showActionButton', newValue );
                    break;
                case 'appearance_showColumnFilterButton':
                    that.setProperty( 'showFilterButton', newValue );
                    break;
                case 'appearance_showColumnCustomButton':
                    that.setProperty( 'showCustomButton', newValue );
                    break;
                case 'appearance_showColumnDescriptionButton':
                    that.setProperty( 'showDescriptionButton', newValue );
                    break;
                case 'appearance_showColumnSortButton':
                    that.setProperty( 'showSortButton', newValue );
                    break;
                case 'appearance_showFrozenColumnBackground':
                case 'appearance_showSortColumnBackground':
                case 'appearance_showFilterColumnBackground':
                    that.grid._recycle( false );
                    break;
            }
        } );

        return element;
    }
} );


LW( 'lw-grid-column', class Column extends LW.BaseElement {
    _showSortButton( refresh ) {
        const that = this;

        if ( !that.column ) {
            return;
        }

        if ( that.column.autoGenerated ) {
            return;
        }

        that.sortButton.classList.remove( 'asc' );
        that.sortButton.classList.remove( 'desc' );

        if ( !that.column.autoShowSortButton ) {
            if ( that.column.allowSort ) {
                that.sortButton.classList.add( 'lw-icon-sort', 'lw-grid-icon' );
            }
        }

        if ( that.column.sortOrder === 'asc' ) {
            that.sortButton.classList.add( 'asc' );
        }
        else if ( that.column.sortOrder === 'desc' ) {
            that.sortButton.classList.add( 'desc' );
        }

        if ( that.column.showSortButton ) {
            that.sortButton.classList.add( 'show' );

            if ( refresh !== false ) {
                that._refresh();
            }
        }
    }

    _hideSortButton( refresh ) {
        const that = this;

        if ( !that.column ) {
            return;
        }

        that.sortButton.classList.remove( 'asc' );
        that.sortButton.classList.remove( 'desc' );

        if ( !that.column.showSortButton || that.column.autoShowSortButton ) {
            that.sortButton.classList.remove( 'show' );
            that.sortButton.classList.remove( 'lw-icon-sort' );

            if ( refresh !== false ) {
                that._refresh();
            }
        }
    }

    _showFilterButton() {
        const that = this;

        if ( !that.column || that.column.autoGenerated ) {
            return;
        }

        that.filterButton.classList.add( 'show' );
        that._refresh();
    }

    _hideFilterButton() {
        const that = this;

        if ( !that.column ) {
            return;
        }

        that.filterButton.classList.remove( 'show' );
        that._refresh();
    }

    _showDescriptionButton() {
        const that = this;

        if ( !that.column || that.column.autoGenerated ) {
            return;
        }

        that.descriptionButton.setAttribute( 'title', that.column.description );
        that.descriptionButton.classList.add( 'show' );
        that._refresh();
    }

    _hideDescriptionButton() {
        const that = this;

        if ( !that.column ) {
            return;
        }

        that.descriptionButton.classList.remove( 'show' );
        that._refresh();
    }

    _showIcon() {
        const that = this;

        if ( !that.column || that.column.autoGenerated ) {
            return;
        }

        that.icon.classList.add( 'show' );
        that._refresh();
    }

    _hideIcon() {
        const that = this;

        that.icon.classList.remove( 'show' );
        that._refresh();
    }

    _showCustomButton() {
        const that = this;

        if ( !that.column || that.column.autoGenerated ) {
            return;
        }

        that.customButton.classList.add( 'show' );
        that._refresh();
    }

    _hideCustomButton() {
        const that = this;

        if ( !that.column ) {
            return;
        }

        that.customButton.classList.remove( 'show' );
        that._refresh();
    }

    _showActionButton() {
        const that = this;

        if ( !that.column ) {
            return;
        }

        if ( that.column.showActionButton && that.column.grid.hasColumnMenu( that.column ) && !that.column.autoGenerated ) {
            if ( that.actionButton ) {
                that.actionButton.classList.add( 'show' );
                that._refresh();
            }
        }
    }

    _hideActionButton() {
        const that = this;

        if ( !that.column ) {
            return;
        }

        if ( that.column.showActionButton ) {
            if ( that.actionButton && !that.hasAttribute( 'aria-controls' ) ) {
                that.actionButton.classList.remove( 'show' );
                that._refresh();
            }
        }
    }

    _rotate() {
        const that = this;
        const span = document.createElement( 'span' );

        that.label.innerHTML = '';
        span.innerHTML = that.column.label;
        that.label.appendChild( span );

        span.className = 'rotate'
        span.style.transform = 'rotate(' + that.column.rotationAngle + 'deg)';

        return that.column.grid._recycleRotate( that.label, span, that.column.align, that.column.verticalAlign, that.column.label );
    }

    _align() {
        const that = this;

        let align = that.column.align;

        if ( that.column.grid.rightToLeft ) {
            if ( align === 'left' ) {
                align = 'right';
            }
            else if ( align === 'right' ) {
                align = 'left';
            }
        }

        switch ( align ) {
            case 'left':
                that.label.classList.add( 'align-left' );
                break;
            case 'center':
                that.label.classList.add( 'align-center' );
                break;
            case 'right':
                that.label.classList.add( 'align-right' );
                break;
        }

        switch ( that.column.verticalAlign ) {
            case 'top':
                that.label.classList.add( 'align-top' );
                break;
            case 'middle':
                that.label.classList.add( 'align-middle' );
                break;
            case 'bottom':
                that.label.classList.add( 'align-bottom' );
                break;
        }
    }

    _refresh() {
        const that = this;
        const grid = that.column.grid;

        that.sortButton.classList.remove( 'filter' );
        that.sortButton.classList.remove( 'action' );

        that.label.className = 'lw-label';

        if ( that.column.visible && that.column.dataField === '_checkBoxColumn' ) {
            const grid = that.column.grid;

            let visibleRows = grid.getVisibleRows();

            if ( grid.paging.enabled && grid.selection.checkBoxes.selectAllMode === 'page' ) {
                visibleRows = visibleRows.slice( grid.paging.pageIndex * grid.paging.pageSize, ( grid.paging.pageIndex + 1 ) * grid.paging.pageSize );
            }

            const selectedRows = grid.paging.enabled && grid.selection.checkBoxes.selectAllMode === 'page' ? grid._getSelectedRows( true, true ) : grid._getSelectedRows( true, false );

            if ( grid.selection.checkBoxes.autoShow ) {
                that.setAttribute( 'auto-show', '' );
            }
            else {
                that.removeAttribute( 'auto-show' );
            }

            if ( selectedRows.length === visibleRows.length ) {
                that.setAttribute( 'selected', '' );
            }
            else if ( selectedRows.length > 0 && selectedRows.length < visibleRows.length ) {
                that.setAttribute( 'selected', 'indeterminate' );
            }
            else if ( selectedRows.length === 0 || visibleRows.length === 0 ) {
                that.removeAttribute( 'selected' );
            }

            that.removeAttribute( 'checkbox' );
            that.label.classList.remove( 'lw-input' );

            if ( grid.selection.checkBoxes.selectAllMode !== 'none' ) {
                that.setAttribute( 'checkbox', '' );
                that.label.classList.add( 'lw-input' );
            }

            return;
        }

        if ( that.column.dataField === '_commandColumn' ) {
            const grid = that.column.grid;
            const showLabel = grid.editing.commandColumn.displayMode !== 'icon';
            const showIcon = grid.editing.commandColumn.displayMode !== 'label';
            const properties = grid.editing.commandColumn.dataSource.commandColumnMenu;

            let commandColumnItem = '<div class="lw-grid-command-item">';

            const label = properties.label === '{{messages}}' ?
                grid.localize( 'commandColumnMenu' ) :
                properties.label;

            const icon = properties.icon;

            if ( showIcon && showLabel ) {
                commandColumnItem += '<span class="lw-grid-icon ' + icon + '"></span>';
                commandColumnItem += '<span class="lw-grid-label">' + label + '</span>';
            }
            else if ( showIcon && !showLabel ) {
                commandColumnItem += '<span class="lw-grid-icon ' + icon + '"></span>';
            }
            else if ( showLabel && !showIcon ) {
                commandColumnItem += '<span class="lw-grid-label">' + label + '</span>';
            }

            commandColumnItem += '</div>';

            if ( properties.visible ) {
                that.label.innerHTML = commandColumnItem;
            }
        }

        const selected = that.column.getProperty( 'selected' );

        if ( selected === false && that.hasAttribute( 'selected' ) ) {
            that.removeAttribute( 'selected' );
        }
        else if ( selected === true ) {
            that.setAttribute( 'selected', '' );
        }
        else if ( selected === null ) {
            that.setAttribute( 'selected', 'indeterminate' );
        }

        if ( that.column.allowSortButtonAnimation ) {
            that.sortButton.classList.add( 'lw-animate' );
        }
        else {
            that.sortButton.classList.remove( 'lw-animate' );
        }

        if ( grid.dragDrop && grid.dragDrop.column === that.column ) {
            that.classList.add( 'dragged' );
        }
        else {
            that.classList.remove( 'dragged' );
        }

        if ( !that.column.sorted ) {
            that._hideSortButton( false );
        }
        else {
            that._showSortButton( false );
        }

        if ( that.column.allowFilterButtonAnimation ) {
            that.filterButton.classList.add( 'lw-animate' );
        }
        else {
            that.filterButton.classList.remove( 'lw-animate' );
        }

        if ( that.column.allowActionButtonAnimation && that.allowAnimations !== false ) {
            that.buttonsGroup.classList.add( 'lw-animate' );
        }
        else {
            that.buttonsGroup.classList.remove( 'lw-animate' );
        }

        if ( that.column.allowLabelAnimation && that.allowAnimations !== false ) {
            that.label.classList.add( 'lw-animate' );
        }
        else {
            that.label.classList.remove( 'lw-animate' );
        }

        that.buttonsGroup.classList.remove( 'action' );

        if ( that.actionButton.classList.contains( 'show' ) ) {
            that.buttonsGroup.classList.add( 'action' );
        }

        if ( that.column.showIcon ) {
            that.icon.classList.add( 'show' );
        }
        else {
            that.icon.classList.remove( 'show' );
        }

        if ( that.icon.classList.contains( 'show' ) ) {
            that.icon.classList.add( that.column.icon );
        }

        let buttonsCount = that.column.showIcon ? 1 : 0;


        for ( let i = 0; i < that.buttonsGroup.children.length; i++ ) {
            if ( that.buttonsGroup.children[ i ].classList.contains( 'show' ) ) {
                buttonsCount++;
            }
        }

        switch ( buttonsCount ) {
            case 1:
                that.label.classList.add( 'one' );
                break;
            case 2:
                that.label.classList.add( 'two' );
                break;
            case 3:
                that.label.classList.add( 'three' );
                break;
            case 4:
                that.label.classList.add( 'four' );
                break;
            case 5:
                that.label.classList.add( 'five' );
                break;
            case 6:
                that.label.classList.add( 'six' );
                break;
        }

        that.classList.remove( 'lw-visibility-hidden' );

        if ( that.column.grid._columnGap > 0 ) {
            that.classList.add( 'lw-grid-column-border' );
        }
        else {
            that.classList.remove( 'lw-grid-column-border' );
        }

        if ( !that.column.grid.appearance.showColumnHeaderLines ) {
            that.classList.add( 'lw-grid-vertical-border-collapse' );
        }
        else {
            that.classList.remove( 'lw-grid-vertical-border-collapse' );
        }

        if ( that.column.rotationAngle ) {
            const rotateResult = that._rotate();

            if ( !rotateResult ) {
                return;
            }
        }

        that._align();
    }

    _render() {
        const that = this;

        const columnDataField = that.column.dataField ? that.column.dataField : '';
        const isLastColumn = that.column === that.column.grid._lastVisibleColumn;

        if ( that.label.firstChild ) {
            if ( that.label.firstChild.textContent !== that.column.label ) {
                that.label.firstChild.textContent = that.column.label;
            }
        }
        else {
            that.label.innerHTML = '<span>' + that.column.label + '</span>';
        }

        that._refresh();

        if ( that.column.autoGenerated || isLastColumn ) {
            that.style.width = that.column.computedWidth + 'px';
        }
        else {
            that.style.width = that.column.computedWidth - that.column.grid._columnGap + 'px';
        }

        if ( that.style.height !== that.column.computedHeight + 'px' ) {
            that.style.height = that.column.computedHeight + 'px';
        }

        if ( that.style.lineHeight !== that.column.computedHeight + 'px' ) {
            that.style.lineHeight = that.column.computedHeight + 'px';
        }

        if ( !that.column.grid.rightToLeft ) {
            if ( that.style.left !== that.column.left + 'px' ) {
                that.style.left = that.column.left + 'px';
            }
        }
        else {
            if ( that.style.right !== that.column.left + 'px' ) {
                that.style.right = that.column.left + 'px';
            }
        }

        if ( that.style.top !== that.column.top + 'px' ) {
            that.style.top = that.column.top + 'px';
        }

        if ( that.getAttribute( 'data-field' ) !== columnDataField ) {
            that.setAttribute( 'data-field', columnDataField );
        }

        that.setAttribute( 'header', '' );

        if ( that.column.freeze ) {
            that.setAttribute( 'freeze', '' );
        }

        if ( that.column.level > 0 ) {
            that.style.top = that.column.top + 'px';
        }
    }

    get hasStyleObserver() {
        return false;
    }

    get enableShadowDOM() {
        return false;
    }

    addThemeClass() {

    }

    addDefaultClass() {

    }

    get isUtilityElement() {
        return true;
    }


    _initialize( column ) {
        const that = this;

        const label = document.createElement( 'div' );
        const sortButton = document.createElement( 'div' );
        const filterButton = document.createElement( 'div' );
        const actionButton = document.createElement( 'div' );
        const descriptionButton = document.createElement( 'div' );
        const customButton = document.createElement( 'div' );
        const icon = document.createElement( 'div' );
        const buttonsGroup = document.createElement( 'div' );

        that.column = column;
        that.classList.add( 'lw-visibility-hidden' );

        icon.classList.add( 'lw-icon', 'lw-grid-icon' );
        label.classList.add( 'lw-label' );
        sortButton.classList.add( 'lw-sort-button', 'lw-grid-icon' );
        filterButton.classList.add( 'lw-filter-button', 'lw-icon-filter', 'lw-grid-icon' );
        actionButton.classList.add( 'lw-action-button', 'lw-grid-icon' );
        actionButton.setAttribute( 'aria-haspopup', '' );
        descriptionButton.classList.add( 'lw-description-button', 'lw-icon-info-circled', 'lw-grid-icon' );
        customButton.classList.add( 'lw-custom-button', column.customButtonIcon ? column.customButtonIcon : 'lw-icon-tools', 'lw-grid-icon' );

        buttonsGroup.classList.add( 'lw-buttons-group' );
        actionButton.innerHTML = '<div></div>';
        that.style.width = that.column.computedWidth + 'px';

        that.appendChild( icon );
        that.appendChild( label );
        that.appendChild( buttonsGroup );

        buttonsGroup.appendChild( sortButton );
        buttonsGroup.appendChild( filterButton );
        buttonsGroup.appendChild( descriptionButton );
        buttonsGroup.appendChild( customButton );
        buttonsGroup.appendChild( actionButton );

        that.icon = icon;
        that.label = label;
        that.sortButton = sortButton;
        that.filterButton = filterButton;
        that.actionButton = actionButton;
        that.descriptionButton = descriptionButton;
        that.customButton = customButton;
        that.buttonsGroup = buttonsGroup;

        const downEvent = window.PointerEvent ? 'pointerdown' : 'mousedown';
        const upEvent = window.PointerEvent ? 'pointerup' : 'mouseup';

        that._filterDownEvent = function ( event ) {
            event.preventDefault();
            event.stopPropagation();

            if ( that.column.onAction ) {
                that.column.onAction( event );
            }
        }.bind( that );

        that._filterUpEvent = function ( event ) {
            event.preventDefault();
            event.stopPropagation();
        };

        that._actionUpEvent = function ( event ) {
            event.preventDefault();
            event.stopPropagation();
        };

        that._actionDownEvent = function ( event ) {
            event.preventDefault();
            event.stopPropagation();

            if ( that.column.onAction ) {
                that.column.onAction( event );
            }
        }.bind( that );

        that.filterButton.addEventListener( downEvent, that._filterDownEvent );
        that.filterButton.addEventListener( upEvent, that._filterUpEvent );
        that.actionButton.addEventListener( upEvent, that._actionUpEvent );
        that.actionButton.addEventListener( downEvent, that._actionDownEvent );

        if ( !that.column.autoShowActionButton && that.column.showActionButton ) {
            that._showActionButton();
        }

        if ( !that.column.autoShowSortButton && that.column.showSortButton ) {
            that._showSortButton();
        }

        if ( !that.column.autoShowFilterButton && that.column.showFilterButton ) {
            that._showFilterButton();
        }

        if ( that.column.showDescriptionButton ) {
            that._showDescriptionButton();
        }

        if ( that.column.showCustomButton ) {
            that._showCustomButton();
        }

        if ( that.column.showIcon ) {
            that._showIcon();
        }

        if ( that.column.dataField === '_rowHeaderColumn' ) {
            that.classList.add( 'top-near-corner' );
        }

        that.customButton.onclick = function ( event ) {
            if ( that.column.onCustomButtonClick ) {
                that.column.onCustomButtonClick( event );
            }
        }.bind( that );
    }

    template() {
        return '';
    }

    _detach() {
        const that = this;
        const downEvent = window.PointerEvent ? 'pointerdown' : 'mousedown';
        const upEvent = window.PointerEvent ? 'pointerup' : 'mouseup';

        that.filterButton.removeEventListener( downEvent, that._filterDownEven );
        that.filterButton.removeEventListener( upEvent, that._filterUpEvent );
        that.actionButton.removeEventListener( upEvent, that._actionUpEvent );
        that.actionButton.removeEventListener( downEvent, that._actionDownEvent );

        that.element = null;
        if ( that.column ) {
            that.column.grid = null;
            that.column.element = null;
        }
        that.icon = null;
        that.label = null;
        that.sortButton = null;
        that.filterButton = null;
        that.actionButton = null;
        that.descriptionButton = null;
        that.customButton = null;
        that.buttonsGroup = null;
        that.column = null;

        delete that.grid;
        delete that.column;
        delete that.icon;
        delete that.label;
        delete that.sortButton;
        delete that.filterButton;
        delete that.actionButton;
        delete that.descriptionButton;
        delete that.customButton;
        delete that.buttonsGroup;
    }

    onDetached() {
        const that = this;

        that._detach();
    }
} );

