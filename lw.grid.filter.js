
LW.Utilities.Assign( 'Grid.Filter', class Filter {
    addFilter( dataField, filter, refreshFilters ) {
        const that = this;
        const column = that.columnByDataField[ dataField ];

        if ( typeof filter === 'string' ) {
            filter = that.dataSource._createFilter( column.dataType, [ filter ] );
        }

        if ( column && column.canNotify ) {
            column.setProperty( 'filter', filter );

            if ( that._isUpdating ) {
                return;
            }

            if ( refreshFilters !== false ) {
                that.refreshFilters();
            }
        }
    }

    removeFilter( dataField, refreshFilters ) {
        const that = this;
        const column = that.columnByDataField[ dataField ];

        if ( column && column.canNotify ) {
            column.setProperty( 'filter', null );

            if ( that._isUpdating ) {
                return;
            }

            if ( refreshFilters !== false ) {
                that.refreshFilters();
            }
        }
    }

    clearFilter() {
        const that = this;

        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            column.setProperty( 'filter', null );
        }

        that.refreshFilters();
    }

    getFilteredColumns() {
        const that = this;

        if ( that._filters ) {
            const columns = [];

            for ( let i = 0; i < that._filters.length; i++ ) {
                const filter = that._filters[ i ];

                columns[ filter[ 0 ] ] = filter[ 1 ];

                columns.length++;
            }

            return columns;
        }

        return [];
    }

    getVisibleRows() {
        const that = this;

        if ( that._visibleRows ) {
            return that._visibleRows;
        }

        const visibleRows = [];
        const viewRows = that._viewRows;
        const offset = that.editing.addNewRow.visible && that.editing.addNewRow.position !== 'far' ? 1 : 0;

        for ( let i = 0; i < viewRows.length; i++ ) {
            const row = viewRows[ i ];

            row.canNotify = false;
            row.visibleIndex = -1;

            if ( row.visible && ( row.filtered !== false || row.filtered === undefined ) ) {
                row.visibleIndex = visibleRows.length - offset;
                visibleRows.push( row );
            }

            row.canNotify = true;
        }

        that._visibleRows = visibleRows;

        return visibleRows;
    }

    refreshFilters() {
        const that = this;

        const filters = [];

        if ( !that._filters ) {
            that._filters = [];
        }

        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            if ( column.filter ) {
                filters.push( [ column.dataField, column.filter ] );
            }
        }

        that.scrollTop = 0;
        that.closeMenu();

        if ( that.dataSource && !that.dataSource.onFilter ) {
            that.dataSource.onFilter = function () {
                const viewRows = that._viewRows;

                for ( let i = 0; i < viewRows.length; i++ ) {
                    const row = viewRows[ i ];

                    if ( row.data && !row.addNewRow ) {
                        row.filtered = row.data.$.filtered !== undefined ? row.data.$.filtered : true;
                    }
                }

                that.refresh();
            }
        }

        if ( JSON.stringify( that._filters ) === JSON.stringify( filters ) ) {
            that._visibleRows = null;
            return;
        }

        that._filters = filters;
        that._visibleRows = null;

        if ( that.dataSource && that.dataSource.virtualDataSource ) {
            that.closeMenu();
            that._virtualDataRequest( 'filter' );
        }
        else {
            const operator = that._filterOperator || 'and';

            that.dataSource._filter( filters, operator );
        }

        if ( that.paging.enabled && that.dataSource && !that.dataSource.virtualDataSource ) {
            that._refreshPagesCount();
        }

        let detailColumns = [];
        for ( let i = 0; i < that.columns.length; i++ ) {
            const column = that.columns[ i ];

            if ( column.filter ) {
                detailColumns.push( column );
            }
        }

        let data = [];

        if ( that._filters ) {
            for ( let i = 0; i < that._filters.length; i++ ) {
                const filter = that._filters[ i ];

                data.push( {dataField: filter[ 0 ], filter: filter[ 1 ]} );
            }
        }

        that.$.fireEvent( 'filter', {
            'columns': detailColumns,
            'data': data
        } );
    }

    _handleFilterCellFocus( cell ) {
        const that = this;
        const filterInfo = cell.column._filterInfo;
        const editor = filterInfo.editor;
        const input = filterInfo.input;
        const column = cell.column;
        const dataType = column.dataType;

        editor.setAttribute( 'focus', '' );
        that.filtering.filterRow.cell = cell;

        if ( filterInfo.condition === 'RANGE' ) {
            that._openFilterCellDialog( cell, ( column ) => {
                const filterInfo = column._filterInfo;
                const editor = filterInfo.editor;
                const range = filterInfo.range;
                const input = filterInfo.input;
                const cell = filterInfo.cell;


                if ( range ) {
                    const filterGroup = new LW.FilterGroup();

                    filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.min, 'GREATER_THAN_OR_EQUAL' ) );
                    filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.max, 'LESS_THAN_OR_EQUAL' ) );

                    that.addFilter( column.dataField, filterGroup );
                }
                else {
                    that.removeFilter( column.dataField );
                }

                if ( !editor ) {
                    return;
                }

                if ( input ) {
                    input.type = '';

                    if ( !range ) {
                        input.value = '';
                    }
                    else {
                        const min = cell.getFormattedValue( range.min, column.cellsFormat );
                        const max = cell.getFormattedValue( range.max, column.cellsFormat );

                        input.value = min + ' - ' + max;
                    }
                }
            } );
        }
        else {
            if ( dataType === 'number' || dataType === 'int' || dataType === 'float' ) {
                input.type = 'number';
            }
            else {
                input.type = '';
            }

            if ( filterInfo.value ) {
                input.value = filterInfo.value;

                if (dataType === 'date') {
                    input.value = cell.getFormattedValue( filterInfo.value, column.cellsFormat );
                }
            }
        }
    }

    _handleFilterCellBlur( cell ) {
        const that = this;
        const filterInfo = cell.column._filterInfo;
        const editor = filterInfo.editor;
        const input = filterInfo.input;
        const column = cell.column;
        const condition = filterInfo.condition;

        that.filtering.filterRow.cell = null;

        if (column.filterRowMenu && column.filterRowMenu.classList.contains( 'open' )) {
            editor.removeAttribute( 'focus' );
            return;
        }

        if ( input.value !== '' && condition !== 'RANGE' ) {
            if ( column.dataType === 'date' ) {
                filterInfo.value = new Date( input.value );
                input.value = cell.getFormattedValue( filterInfo.value, column.cellsFormat );
            }
            else if ( column.dataType === 'number' || column.dataType === 'int' || column.dataType === 'float' ) {
                filterInfo.value = parseFloat( input.value );
                input.type = '';
                input.value = cell.getFormattedValue( filterInfo.value, column.cellsFormat );
            }
            else {
                filterInfo.value = input.value;
            }
        }

        if (that.filtering.filterRow.applyMode === 'auto') {
            that._handleFilterCellValue(cell);
        }

        editor.removeAttribute( 'focus' );
    }

    _handleFilterCellValue(cell) {
        const that = this;
        const filterInfo = cell.column._filterInfo;
        const column = cell.column;
        const condition = filterInfo.condition;

        if (condition === 'RANGE') {
            const range = filterInfo.range;

            if (range) {
                const filterGroup = new LW.FilterGroup();
                filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.min, 'GREATER_THAN_OR_EQUAL' ) );
                filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.max, 'LESS_THAN_OR_EQUAL' ) );

                that.addFilter( column.dataField, filterGroup );
            }
            else {
                that.removeFilter(column.dataField);
            }
        }
        else {
            const value = filterInfo.value;

            if (value !== '' && value !== undefined) {
                const filterGroup = new LW.FilterGroup();

                filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, value, filterInfo.condition || (column.dataType === 'string' ? 'CONTAINS' : 'EQUAL' )) );
                that.addFilter( column.dataField, filterGroup );
            }
            else {
                that.removeFilter(column.dataField);
            }
        }
    }

    _handleFilterCellKeyDown( cell, event ) {
        const that = this;
        const column = cell.column;
        const input = column._filterInfo.input;

        if (event.ctrlKey && event.key === 'a') {
            input.select();
        }
        else if (event.altKey && event.key === 'ArrowDown') {
            that._handleFilterCellIconClick(cell);
        }
    }

    _handleFilterCellKeyUp( cell, event ) {
        const column = cell.column;
        const input = column._filterInfo.input;
        const that = this;
        const filterInfo = column._filterInfo;
        const key = event.key;

        filterInfo.value = input.value;

        if (key === 'Escape') {
            filterInfo.value = '';
            filterInfo.range = null;
            input.value = '';
        }

        if (key === 'Enter' || key === 'Escape' || input.value === '') {
            that._handleFilterCellValue(cell);
        }
        else if (that.filtering.filterRow.applyMode === 'auto' && key !== 'Ctrl' && key !== 'Shift') {
            that._filterRowTimer = setTimeout(() => {
                that._handleFilterCellValue(cell);
            }, that.filtering.filterRow.autoApplyModeDelay);
        }

        if (event.ctrlKey && key === 'a') {
            input.select();
        }
    }

    _handleFilterCellCheckBoxClick(cell) {
        const that = this;
        const column = cell.column;
        const filterInfo = column._filterInfo;

        if (filterInfo.value === undefined) {
            filterInfo.value = null;
        }

        if (filterInfo.value === true) {
            filterInfo.value = false;
        }
        else if (filterInfo.value === false) {
            filterInfo.value = null;
        }
        else if (filterInfo.value === null) {
            filterInfo.value = true;
        }

        const checkbox = cell.element.querySelector('.lw-input');

        if (filterInfo.value) {
            checkbox.setAttribute('checked', filterInfo.value);
        }
        else if (filterInfo.value === null) {
            checkbox.setAttribute('checked', 'indeterminate')
        }
        else {
            checkbox.removeAttribute('checked');
        }

        if (filterInfo.value === null) {
            that.removeFilter(column.dataField);
            return;
        }

        const filterGroup = new LW.FilterGroup();

        filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, filterInfo.value === true ? true : false, 'EQUAL' ) );
        that.addFilter( column.dataField, filterGroup );

    }

    _handleFilterCellIconClick( cell ) {
        const that = this;
        const column = cell.column;

        if ( column.filterRowMenu && column.filterRowMenu.classList.contains( 'open' ) ) {
            that._closeMenu( column.filterRowMenu );
            return;
        }

        that._openColumnFilterMenu( column );
    }

    _handleFilterCalendarCellClick( cell ) {
        const that = this;

        that._openFilterCellDialog( cell, ( column ) => {
            const filterInfo = column._filterInfo;
            const input = filterInfo.editor.querySelector( 'input' );
            const value = filterInfo.value;

            if ( input ) {
                if ( !value ) {
                    input.value = '';
                    that.removeFilter( column.dataField );
                }
                else {
                    input.value = cell.getFormattedValue( value, column.cellsFormat || '' );

                    const filterGroup = new LW.FilterGroup();

                    filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, value, filterInfo.condition || 'EQUAL' ) );
                    that.addFilter( column.dataField, filterGroup );
                }
            }
        } );
    }

    _handleFilterMenuClick( column, properties ) {
        const that = this;
        const filterInfo = column._filterInfo;
        const editor = filterInfo.editor;
        const input = filterInfo.input;

        editor.firstElementChild.innerHTML = `<i class="lw-grid-icon ${properties.icon} show"></i>`;

        if ( properties.value === 'CLEAR_FILTER' ) {
            input.value = '';
            editor.firstElementChild.innerHTML = '<i class="lw-grid-icon lw-icon-search show"></i>';
            filterInfo.condition = null;
            filterInfo.value = '';
            filterInfo.range = null;
        }

        input.type = '';

        if ( filterInfo.condition === 'RANGE' && properties.value !== 'RANGE' ) {
            let range = filterInfo.range;

            filterInfo.value = range.min;
        }
        else if ( properties.value === 'RANGE' && filterInfo.condition !== 'RANGE' && filterInfo.condition !== null ) {
            let range = filterInfo.range;

            if ( filterInfo.value ) {
                range = {min: filterInfo.value, max: filterInfo.value};
                filterInfo.range = range;
            }
        }

        if ( properties.value === 'RANGE' ) {
            input.readonly = true;
            const filterGroup = new LW.FilterGroup();
            const range = filterInfo.range;

            if (range) {
                filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.min, 'GREATER_THAN_OR_EQUAL' ) );
                filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, range.max, 'LESS_THAN_OR_EQUAL' ) );

                that.addFilter( column.dataField, filterGroup );

                const min = filterInfo.cell.getFormattedValue( range.min, column.cellsFormat );
                const max = filterInfo.cell.getFormattedValue( range.max, column.cellsFormat );

                input.value = min + ' - ' + max;
            }
            else {
                input.value = '';
            }

            filterInfo.condition = properties.value;
            return;
        }
        else {
            input.readonly = false;
       }

       if (properties.value !== 'CLEAR_FILTER') {
            filterInfo.condition = properties.value;
       }

        if ( input.value === '' ) {
            that.removeFilter( column.dataField );
        }
        else {
            const filterGroup = new LW.FilterGroup();
            const value = filterInfo.value;

            filterGroup.addFilter( 'and', filterGroup.createFilter( column.dataType, value, filterInfo.condition || 'EQUAL' ) );
            that.addFilter( column.dataField, filterGroup );

            input.value = filterInfo.cell.getFormattedValue( value, column.cellsFormat );
        }

        setTimeout(() => {
            input.focus();
        },25);
    }

    _handleFilterNumberCellEditor(cell, element, customSpinFn) {
        const numberInput = element.querySelector( 'input' );
        const spinnerUp = element.querySelector( '.up' );
        const spinnerDown = element.querySelector( '.down' );
        const column = cell.column;
        const that = this;

        let spinValue = (step) => {
            const filterInfo = column._filterInfo;

            if (filterInfo.condition === 'RANGE') {
                numberInput.focus();
                return;
            }

            let oldValue = parseFloat( filterInfo.value );

            if ( isNaN( oldValue ) ) {
                filterInfo.value = 0;
                numberInput.value = 0;
                return;
            }

            const condition = step < 0 ? ( oldValue > numberInput.min || numberInput.min === '' ) : oldValue < numberInput.max || numberInput.max === '' ;

            if ( condition) {
                numberInput.value = oldValue + step;
                filterInfo.value = numberInput.value;
                numberInput.focus();
                that._handleFilterCellValue(cell);
           }
        }

        if (customSpinFn) {
            spinValue = customSpinFn;
        }

        const setupSpinButtons = (button, step) => {
            let spin, spinInterval;

            button.onpointerdown = function (event) {
                spinValue(step);

                if (spin) {
                    clearTimeout(spin);
                }

                spin = setTimeout(() => {
                    if (spinInterval) {
                        clearInterval(spinInterval);
                    }

                    spinInterval = setInterval(() => {
                        spinValue(step);
                    }, 50);
                }, 300);

                event.preventDefault();
                event.stopPropagation();
            };

            button.onpointerup = () => {
                if (spinInterval) {
                    clearInterval(spinInterval);
                }
                if (spin) {
                    clearTimeout(spin);
                }
                spinInterval = null;
            }

            button.onpointerenter = () => {
                if (spinInterval) {
                    clearInterval(spinInterval);
                    spinInterval = setInterval(() => {
                        spinValue(1);
                    }, 50);
                }
            }

            button.onpointerleave = () => {
                clearInterval(spinInterval);
            }

            document.addEventListener('pointerup', ()=> {
                if (spinInterval) {
                    clearInterval(spinInterval);
                }

                spinInterval = null;

                if (spin) {
                    clearTimeout(spin);
                }
            });
        }

        setupSpinButtons(spinnerUp, 1);
        setupSpinButtons(spinnerDown, -1);
    }

    _openFilterCellDialog( cell, confirm ) {
        const that = this;

        const dialog = that._dialogFilter || that._createDialog();
        const header = that.localize( 'dialogFilterHeader' ) + ' ' + cell.column.label;
        const content = dialog.content;

        dialog.header.innerHTML = header;
        dialog.confirm = confirm;
        let layoutRow = null;
        let layoutRowIndex = 0;

        if ( !that._cellEditors ) {
            that._cellEditors = [];
        }

        if ( !that._dialogFilter ) {
            dialog.modal = true;
            dialog.btnConfirm.innerHTML = that.localize( 'dialogFilterButtonConfirm' );
            dialog.btnCancel.innerHTML = that.localize( 'dialogFilterButtonCancel' );

            dialog.onOpen = function () {
                dialog.focus();

                const cell = that._dialogFilterCell;
                const range = cell.column._filterInfo.range;
                const value = cell.column._filterInfo.value;

                if ( cell.column.dataType === 'date' ) {
                    const calendar = content.querySelector( 'lw-calendar' );

                    setTimeout( () => {
                        if ( cell.column._filterInfo.condition === 'RANGE' && range ) {
                            calendar.selectedDates = [ new Date( range.min.getTime() ), new Date( range.max.getTime() ) ];
                            calendar._selectMultipleDates( new Date( range.min.getTime() ), new Date( range.max.getTime() ) );
                        }
                        else if ( value ) {
                            calendar.selectedDates = [ new Date( value.getTime() ) ];
                        }
                        calendar.focus();
                     }, 100 );


                    calendar.focus();
                }
                else {
                    const inputs = content.querySelectorAll( 'input' );

                    inputs[ 0 ].focus();

                    if ( range ) {
                        inputs[ 0 ].value = range.min;
                        inputs[ 1 ].value = range.max;
                    }
                }
            }

            dialog.onClose = function () {
            }

            dialog.btnCancel.onclick = function () {
                dialog.close();

                const cell = that._dialogFilterCell;

                cell.column._filterInfo.range = null;
                cell.column._filterInfo.value = null;
                dialog.confirm( cell.column );
            }

            dialog.btnClose.onclick = function () {
                dialog.close();
            }

            dialog.btnConfirm.onclick = function () {
                const cell = that._dialogFilterCell;

                cell.column._filterInfo.range = null;
                cell.column._filterInfo.value = null;

                if ( cell.column.dataType === 'date' ) {
                    const calendar = content.querySelector( 'lw-calendar' );
                    const dates = calendar.selectedDates;


                    if ( calendar.selectionMode === 'range' ) {
                        cell.column._filterInfo.range = {min: new Date( dates[ 0 ].getTime() ), max: new Date( dates[ dates.length - 1 ].getTime() )};
                    }
                    else {
                        cell.column._filterInfo.value = new Date( dates[ 0 ].getTime() );
                    }
                }
                else {
                    const numberInputs = content.querySelectorAll( 'input' );
                    let min = numberInputs[ 0 ].value;
                    let max = numberInputs[ 1 ].value;

                    if ( max === '' ) {
                        max = 100;
                    }

                    if ( min === '' ) {
                        min = 0;
                    }

                    cell.column._filterInfo.range = {min: min, max: max};
                }

                dialog.confirm( cell.column );
                dialog.close();
            }

            dialog.onkeydown = function ( event ) {
                const key = event.key;

                if ( key === 'Enter' ) {
                    dialog.btnConfirm.onclick();
                }
                else if ( key === 'Escape' ) {
                    dialog.close();
                }
            }
        }

        content.classList.remove( 'lw-grid-layout' );

        content.innerHTML = '';


        const validate = () => {
            const inputs = content.querySelectorAll( 'input' );

            dialog.btnConfirm.disabled = true;

            if ( inputs[ 0 ].value === '' ) {
                inputs[ 0 ].value = 0;
            }

            if ( inputs[ 1 ].value === '' ) {
                inputs[ 1 ].value = 100;
            }

            let min = parseFloat( inputs[ 0 ].value );
            let max = parseFloat( inputs[ 1 ].value );

            if ( min <= max ) {
                dialog.btnConfirm.disabled = false;
            }
        }


        if ( cell.column.dataType !== 'date' ) {
            content.classList.add( 'lw-grid-layout' );
        }
        for ( let i = 0; i < 2; i++ ) {
            const column = cell.column;

            if ( column.dataType === 'date' ) {
                const fieldEditor = document.createElement( 'div' );

                if ( column._filterInfo.condition === 'RANGE' ) {
                    fieldEditor.innerHTML = '<lw-calendar selection-mode="range"></lw-calendar>';
                }
                else {
                    fieldEditor.innerHTML = '<lw-calendar></lw-calendar>';
                }
                content.appendChild( fieldEditor );


                break;
            }

            if ( layoutRowIndex % 2 === 0 ) {
                layoutRow = document.createElement( 'div' );
                layoutRow.classList.add( 'row' );
                content.appendChild( layoutRow );
            }

            const col = document.createElement( 'div' );

            col.classList.add( 'col-sm-6' );

            const stack = document.createElement( 'div' );

            stack.classList.add( 'column' );

            const label = document.createElement( 'label' );

            label.innerHTML = i === 0 ? that.localize( 'dialogFilterMinLabel' ) : that.localize( 'dialogFilterMaxLabel' );

            const fieldEditor = document.createElement( 'div' );

            fieldEditor.classList.add( 'lw-grid-dialog-editor' )
            fieldEditor.setAttribute( 'editor', column.dataField );
            fieldEditor.setAttribute( 'template', column.editor.template );

            col.appendChild( stack );
            layoutRow.appendChild( col );
            stack.appendChild( label );
            stack.appendChild( fieldEditor );
            layoutRowIndex++;
            fieldEditor.innerHTML = '<div class="lw-grid-cell-editor lw-filter-input-value lw-grid-number-input-cell-editor"><input class="lw-input" type="number"><div class="nav"><div tabindex="-1" class="up"></div><div tabindex="-1" class="down"></div></div></div>';

            const numberInput = fieldEditor.querySelector( 'input' );

            numberInput.onchange = () => {
                validate();
            }

            that._handleFilterNumberCellEditor(cell, fieldEditor,  (step) => {
                let oldValue = parseFloat(numberInput.value);

                if ( isNaN( oldValue ) ) {
                    numberInput.value = 0;
                    return;
                }

                const condition = step < 0 ? ( oldValue > numberInput.min || numberInput.min === '' ) : oldValue < numberInput.max || numberInput.max === '' ;

                if ( condition) {
                    numberInput.value = oldValue + step;
                }

                validate();
            })
        }

        that._dialogFilter = dialog;
        that._dialogFilterCell = cell;

        const columnRect = cell.column.element.getBoundingClientRect();

        const offset = that.offset( that );
        let left = columnRect.left + window.pageXOffset - offset.left;
        let top = columnRect.bottom + that.layout.rowMinHeight + window.pageYOffset - offset.top;

        dialog.open( left, top );
    }
} );
