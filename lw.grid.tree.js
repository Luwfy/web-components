
LW.Utilities.Assign( 'Grid.Tree', class Tree {
    _setRowProperty( id, propertyName, value ) {
        const that = this;

        const row = that.rowById[ id ];

        if ( !row ) {
            return;
        }

        row[ propertyName ] = value;
    }

    _setRowsProperty( propertyName, value, ids ) {
        const that = this;

        that._refreshRowHierarchy( true );
        that._refreshLayout();

        const rows = that._recyclingRows;

        that.rows.canNotify = false;

        for ( let i = 0; i < rows.length; i++ ) {
            const row = rows[ i ];

            if ( ids ) {
                if ( ids.indexOf( row.id ) === -1 ) {
                    continue;
                }
            }

            row[ propertyName ] = value;
        }

        that.rows.canNotify = true;
        that.refresh();
    }

    _applyThreeStates( row ) {
        const that = this,
            branch = row !== that.rowHierarchy,
            children = branch ? row.children : that.rowHierarchy.filter( ( row ) => {
                if ( row.level === 0 ) return row;
            } );
        let checkedChildren = 0, indeterminateChildren = 0;

        for ( let i = 0; i < children.length; i++ ) {
            const currentChild = children[ i ];

            if ( row.checked ) {
                currentChild.checked = true;
            }

            if ( currentChild.leaf === false ) {
                that._applyThreeStates( currentChild );
            }

            if ( branch ) {
                if ( currentChild.checked ) {
                    checkedChildren++;
                }
                else if ( currentChild.checked === null ) {
                    indeterminateChildren++;
                }
            }
        }

        if ( !branch ) {
            return;
        }

        if ( checkedChildren === row.children.length ) {
            row.checked = true;
        }
        else if ( checkedChildren === 0 && indeterminateChildren === 0 ) {
            row.checked = false;
        }
        else if ( that.checkBoxes.hasThreeStates ) {
            row.checked = null;
        }
        else {
            row.checked = false;
        }
    }

    _hasThreeStates( row, callerRow ) {
        function checkUncheckChildren( row, check ) {
            const children = row.children;

            for ( let i = 0; i < children.length; i++ ) {
                const currentChild = children[ i ];

                currentChild.checked = check;

                if ( currentChild.leaf === false ) {
                    checkUncheckChildren( currentChild, check );
                }
            }
        }

        const that = this;
        let currentRow = row;

        if ( row !== callerRow ) {
            if ( row.checked ) {
                row.checked = false;
            }
            else {
                row.checked = true;
            }
        }

        while ( currentRow.parent ) {
            const parent = currentRow.parent,
                children = parent.children;
            let checkedChildren = 0, indeterminateChildren = 0;

            for ( let i = 0; i < children.length; i++ ) {
                if ( children[ i ].checked ) {
                    checkedChildren++;
                }
                else if ( that.checkBoxes.hasThreeStates && children[ i ].checked === null ) {
                    indeterminateChildren++;
                }
            }

            if ( checkedChildren === parent.children.length ) {
                parent.checked = true;
            }
            else if ( checkedChildren === 0 && indeterminateChildren === 0 ) {
                parent.checked = false;
            }
            else if ( that.checkBoxes.hasThreeStates ) {
                parent.checked = null;
            }
            else {
                parent.checked = false;
            }

            currentRow = parent;
        }

        if ( !row.leaf ) {
            checkUncheckChildren( row, row.checked );
        }
    }

    /* Public API */


    expandRow( id ) {
        const that = this;

        if ( id && Array.isArray( id ) ) {
            that._setRowsProperty( 'expanded', true, id );
            return;
        }

        that._setRowProperty( id, 'expanded', true );
    }

    expandAllRows() {
        const that = this;

        that._setRowsProperty( 'expanded', true );
    }

    collapseAllRows() {
        const that = this;

        that._setRowsProperty( 'expanded', false );
    }

    toggleRow( id ) {
        const that = this;

        const row = that.rowById[ id ];

        if ( !row ) {
            return;
        }

        if ( row.expanded ) {
            row.expanded = false;
        }
        else {
            row.expanded = true;
        }
    }

    collapseRow( id ) {
        const that = this;

        if ( id && Array.isArray( id ) ) {
            that._setRowsProperty( 'expanded', false, id );
            return;
        }

        that._setRowProperty( id, 'expanded', false );
    }

    checkRow( id ) {
        const that = this;

        if ( id && Array.isArray( id ) ) {
            that._setRowsProperty( 'checked', true, id );
            return;
        }

        that._setRowProperty( id, 'checked', true );
    }

    uncheckRow( id ) {
        const that = this;

        if ( id && Array.isArray( id ) ) {
            that._setRowsProperty( 'checked', false, id );
            return;
        }

        that._setRowProperty( id, 'checked', false );
    }

    checkAllRows() {
        const that = this;

        that._setRowsProperty( 'checked', true );
    }

    uncheckAllRows() {
        const that = this;

        that._setRowsProperty( 'checked', false );
    }

} );
