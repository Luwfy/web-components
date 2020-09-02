
LW( 'lw-grid', class Grid extends LW.ScrollViewer {
    // Grid's properties.
    /*

    */
    static get properties() {
        return {
            'appearance': {
                value: {
                    // context menu option.
                    'allowColumnFixing': {
                        value: false,
                        type: 'boolean'
                    },
                    'alternationStart': {
                        value: 0,
                        type: 'int'
                    },
                    'alternationEnd': {
                        value: 0,
                        type: 'int'
                    },
                    'alternationCount': {
                        value: 0,
                        type: 'int'
                    },
                    'allowHover': {
                        value: false,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'allowHeaderHover': {
                        value: true,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'allowRowToggleAnimation': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowRowDetailToggleAnimation': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowSortAnimation': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowColumnLabelAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowCheckBoxesSelectionAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnMenuAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnSortButtonAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnActionButtonAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnFilterButtonAnimation': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnStickyPosition': {
                        value: false,
                        type: 'boolean'
                    },
                    'autoShowColumnSortButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'autoShowColumnActionButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'autoGenerateRowLabelMode': {
                        value: 'number',
                        type: 'string'
                    },
                    'autoGenerateColumnLabelMode': {
                        value: 'letter',
                        type: 'string'
                    },
                    'autoShowColumnFilterButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'displayLoadingIndicator': {
                        value: false,
                        type: 'boolean'
                    },
                    'loadingIndicatorPlaceholder': {
                        value: 'Loading...',
                        type: 'string'
                    },
                    'placeholder': {
                        value: 'No Rows',
                        type: 'string'
                    },
                    'sortAnimationDuration': {
                        value: 500,
                        type: 'number'
                    },
                    'showRowHeader': {
                        value: false,
                        type: 'boolean'
                    },
                    'showRowHeaderNumber': {
                        value: false,
                        type: 'boolean'
                    },
                    'showRowHeaderEditIcon': {
                        value: true,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'showRowHeaderDragIcon': {
                        value: false,
                        type: 'boolean',
                    },
                    'showRowHeaderSelectIcon': {
                        value: false,
                        type: 'boolean'
                    },
                    'showRowHeaderFocusIcon': {
                        value: false,
                        type: 'boolean'
                    },
                    'showColumnHeaderLines': {
                        value: true,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'showColumnLines': {
                        value: true,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'showRowLines': {
                        value: true,
                        type: 'boolean',
                        defaultReflectToAttribute: true
                    },
                    'showFilterColumnBackground': {
                        value: true,
                        type: 'boolean'
                    },
                    'showSortColumnBackground': {
                        value: true,
                        type: 'boolean'
                    },
                    'showFrozenColumnBackground': {
                        value: true,
                        type: 'boolean'
                    },
                    'showFrozenRowBackground': {
                        value: true,
                        type: 'boolean'
                    },
                    'showColumnSortButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'showColumnFilterButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'showColumnDescriptionButton': {
                        value: false,
                        type: 'boolean'
                    },
                    'showColumnIcon': {
                        value: false,
                        type: 'boolean'
                    },
                    'showColumnCustomButton': {
                        value: false,
                        type: 'boolean'
                    },
                    'showColumnActionButton': {
                        value: true,
                        type: 'boolean'
                    },
                    'showTooltips': {
                        value: false,
                        type: 'boolean'
                    },
                    'showResizeTooltips': {
                        value: true,
                        type: 'boolean'
                    },
                    'showHorizontalScrollBarOnFixedColumns': {
                        value: false,
                        type: 'boolean'
                    },
                    'showVerticalScrollBarOnFixedColumns': {
                        value: false,
                        type: 'boolean'
                    }
                },
                type: 'object'
            },
            'behavior': {
                value: {
                    'allowColumnAutoSizeOnDoubleClick': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowRowAutoSizeOnDoubleClick': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowColumnReorder': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowRowReorder': {
                        value: false,
                        type: 'boolean'
                    },
                    'doubleClickTimingDelay': {
                        value: 300,
                        type: 'number'
                    },
                    'columnResizeMode': {
                        value: 'none',
                        type: 'string',
                        allowedValues: [ 'none', 'split', 'growAndShrink' ]
                    },
                    'rowResizeMode': {
                        value: 'none',
                        type: 'string',
                        allowedValues: [ 'none', 'split', 'growAndShrink' ]
                    },
                },
                type: 'object'
            },
            'layout': {
                value: {
                    'allowCellsWrap': {
                        value: false,
                        type: 'boolean'
                    },
                    'autoGenerateColumnWidth': {
                        value: null,
                        type: 'number?'
                    },
                    'columnWidth': {
                        value: null,
                        type: 'any',
                        reflectToAttribute: false
                    },
                    'columnHeight': {
                        value: null,
                        type: 'any',
                        reflectToAttribute: false
                    },
                    'columnMinHeight': {
                        value: 30,
                        type: 'any',
                        reflectToAttribute: false
                    },
                    'isDirty': {
                        value: false,
                        type: 'boolean'
                    },
                    'loadingIndicatorPosition': {
                        value: 'center',
                        allowedValues: [ 'bottom', 'center', 'top' ],
                        type: 'string'
                    },
                    'rowMinHeight': {
                        value: 30,
                        type: 'number'
                    },
                    'rowHeight': {
                        value: null,
                        type: 'any',
                        reflectToAttribute: false
                    }
                },
                type: 'object'
            },
            'dataExport': {
                value: {
                    'header': {
                        value: true,
                        type: 'boolean'
                    },
                    'filterBy': {
                        value: null,
                        type: 'object',
                    },
                    'groupBy': {
                        value: null,
                        type: 'object',
                    },
                    'style': {
                        value: null,
                        type: 'object'
                    },
                    'fileName': {
                        value: 'lwGrid',
                        type: 'string?'
                    },
                    'pageOrientation': {
                        value: 'portrait',
                        type: 'string'
                    },
                    'expandChar': {
                        value: '+',
                        type: 'string'
                    },
                    'collapseChar': {
                        value: '-',
                        type: 'string'
                    },
                    'view': {
                        value: false,
                        type: 'boolean'
                    },
                    'viewStart': {
                        value: null,
                        type: 'number?'
                    },
                    'viewEnd': {
                        value: null,
                        type: 'number?'
                    },
                    'rowIds': {
                        value: null,
                        type: 'array?'
                    },
                },
                type: 'object'
            },
            'clipboard': {
                value: {
                    'enabled': {
                        value: true,
                        type: 'boolean'
                    },
                    'autoFillMode': {
                        value: 'copy',
                        allowedValues: [ 'none', 'copy', 'fillSeries' ],
                        type: 'string'
                    },
                    'onPasteValue': {
                        value: null,
                        type: 'any'
                    }
                },
                type: 'object'
            },
            'columns': {
                value: [],
                type: 'any',
                reflectToAttribute: false
            },
            'columnMenu': {
                value: {
                    'autoClose': {
                        value: true,
                        type: 'boolean'
                    },
                    'dataSource': {
                        value: {
                            'columnMenuCustomizeType': {
                                value: {
                                    command: {
                                        value: 'customizeTypeCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-ellipsis-vert',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemRename': {
                                value: {
                                    command: {
                                        value: 'renameCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-rename',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemEditDescription': {
                                value: {
                                    command: {
                                        value: 'editDescriptionCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-circled',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemDuplicate': {
                                value: {
                                    command: {
                                        value: 'duplicateCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-duplicate',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemInsertLeft': {
                                value: {
                                    command: {
                                        value: 'insertLeftCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-insert-left',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemInsertRight': {
                                value: {
                                    command: {
                                        value: 'insertRightCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-insert-right',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemSortAsc': {
                                value: {
                                    command: {
                                        value: 'sortAscCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-sort-name-up',
                                        type: 'string'
                                    },
                                    iconAlt: {
                                        value: 'lw-icon-sort-number-up',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemSortDesc': {
                                value: {
                                    command: {
                                        value: 'sortDescCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-sort-name-down',
                                        type: 'string'
                                    },
                                    iconAlt: {
                                        value: 'lw-icon-sort-number-down',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemRemoveSort': {
                                value: {
                                    command: {
                                        value: 'removeSortCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-cancel-circled',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemFilter': {
                                value: {
                                    command: {
                                        value: 'addFilterCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-add-filter',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemRemoveFilter': {
                                value: {
                                    command: {
                                        value: 'removeFilterCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-cancel-circled',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemGroupBy': {
                                value: {
                                    command: {
                                        value: 'groupByCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-group',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemRemoveGroupBy': {
                                value: {
                                    command: {
                                        value: 'removeGroupByCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: 'auto',
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-ungroup',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemHide': {
                                value: {
                                    command: {
                                        value: 'hideColumnCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-visibility-off',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            },
                            'columnMenuItemDelete': {
                                value: {
                                    command: {
                                        value: 'deleteColumnCommand',
                                        type: 'any'
                                    },
                                    enabled: {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    visible: {
                                        value: false,
                                        type: 'any'
                                    },
                                    icon: {
                                        value: 'lw-icon-delete',
                                        type: 'string'
                                    },
                                    label: {
                                        value: '{{messages}}',
                                        type: 'string'
                                    }
                                },
                                type: 'object',
                                reflectToAttribute: false
                            }
                        },
                        type: 'object',
                        reflectToAttribute: false
                    },
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'enabled': {
                        value: true,
                        type: 'boolean'
                    },
                    'width': {
                        value: 250,
                        type: 'number'
                    },
                    'height': {
                        value: null,
                        type: 'number?'
                    }
                },
                type: 'object',
                reflectToAttribute: false
            },
            'columnGroups': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'charting': {
                value: {
                    'appendTo': {
                        value: null,
                        type: 'any'
                    },
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'colorScheme': {
                        value: 'scheme01',
                        type: 'string'
                    },
                    'description': {
                        value: '',
                        type: 'string'
                    },
                    'dialog': {
                        value: {
                            'header': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'height': {
                                value: 400,
                                type: 'any'
                            },
                            'width': {
                                value: 400,
                                type: 'any'
                            },
                            'left': {
                                value: 'center',
                                type: 'any'
                            },
                            'top': {
                                value: 'center',
                                type: 'any'
                            },
                            'enabled': {
                                value: true,
                                type: 'boolean'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'formatSettings': {
                        value: {},
                        type: 'object'
                    }
                },
                type: 'object'
            },
            'dataSource': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'grouping': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean',
                        reflectToAttribute: false
                    },
                    'allowCollapse': {
                        value: false,
                        type: 'boolean',
                        reflectToAttribute: false
                    },
                    'autoExpandAll': {
                        value: false,
                        type: 'boolean',
                        reflectToAttribute: false
                    },
                    'expandMode': {
                        value: 'buttonClick',
                        type: 'string',
                        allowedValues: [ 'buttonClick', 'rowClick' ],
                        reflectToAttribute: false
                    },
                    'renderMode': {
                        type: 'string',
                        value: 'advanced',
                        allowedValues: [ 'basic', 'compact', 'advanced' ]
                    },
                    'groupRowHeight': {
                        value: 50,
                        type: 'any',
                        reflectToAttribute: false
                    },
                    'toggleButtonIndent': {
                        value: 16,
                        type: 'number',
                        reflectToAttribute: false
                    },
                    'groupIndent': {
                        value: 16,
                        type: 'number',
                        reflectToAttribute: false
                    },
                    'groupBar': {
                        value: {
                            'visible': {
                                value: false,
                                type: 'boolean',
                                reflectToAttribute: false
                            },
                            'allowColumnDragDrop': {
                                value: true,
                                type: 'boolean',
                                reflectToAttribute: true
                            },
                            'allowColumnCloseButtons': {
                                value: true,
                                type: 'boolean',
                                reflectToAttribute: true
                            }
                        },
                        type: 'object'
                    },
                    'summaryRow': {
                        value: {
                            'inline': {
                                value: true,
                                type: 'boolean'
                            },
                            'visible': {
                                value: true,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    }
                },
                type: 'object'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidColumnProperty': '{{elementType}}: Invalid property name "{{propertyName}}" set for Column: "{{type}}"',
                        'invalidRowProperty': '{{elementType}}: Invalid property name "{{propertyName}}" set for Row"',
                        'frozenColumns': '{{elementType}}: To Pin/Freeze a column group, all columns within it should be frozen.',
                        'frozenRows': '{{elementType}}: To Pin/Freeze a special cell, all rows within it should be frozen.',
                        'columnGroups': '{{elementType}}: Please, check the initialization of the lwGrid\'s columns array. The columns in a column group are expected to be siblings in the columns array.',
                        'min': 'Min: {{value}}',
                        'max': 'Max: {{value}} ',
                        'sum': 'Sum: {{value}} ',
                        'avg': 'Avg: {{value}} ',
                        'count': 'Count: {{value}} ',
                        'pagerFirstButton': 'First',
                        'pagerLastButton': 'Last',
                        'pagerPreviousButton': 'Previous',
                        'pagerNextButton': 'Next',
                        'pagerNavigateToLabel': 'Go to:',
                        'pagerPageSizeLabel': 'Show:',
                        'pagerNavigateToInputPlaceholder': '',
                        'pagerEllipsis': '...',
                        'pagerSummaryString': 'of',
                        'pagerSummaryPrefix': 'of',
                        'pagerSummarySuffix': '',
                        'columnMenuCustomizeType': 'Customize type',
                        'columnMenuItemRename': 'Rename',
                        'columnMenuItemEditDescription': 'Edit description',
                        'columnMenuItemDuplicate': 'Duplicate',
                        'columnMenuItemInsertLeft': 'Insert left',
                        'columnMenuItemInsertRight': 'Insert right',
                        'columnMenuItemSortAsc': 'Sort {{mode}}',
                        'columnMenuItemSortDesc': 'Sort {{mode}}', //Sort A → Z
                        'columnMenuItemRemoveSort': 'Remove Sort',
                        'columnMenuItemFilter': 'Filter',
                        'columnMenuItemRemoveFilter': 'Remove Filter',
                        'columnMenuItemGroupBy': 'Group by this column',
                        'columnMenuItemRemoveGroupBy': 'Remove Group',
                        'columnMenuItemHide': 'Hide',
                        'columnMenuItemDelete': 'Delete',
                        'columnResizeTooltip': 'width: {{value}}px',
                        'rowResizeTooltip': 'height: {{value}}px',
                        'commandBarAddRow': 'Add',
                        'commandBarDeleteRow': 'Delete',
                        'commandBarBatchRevert': 'Revert',
                        'commandBarBatchSave': 'Save',
                        'commandBarFilter': 'Filter',
                        'commandBarSort': 'Sort',
                        'commandBarSearch': 'Search',
                        'commandBarCustomize': 'Customize',
                        'commandBarGroup': 'Group',
                        'commandColumnEdit': 'Edit',
                        'commandColumnDelete': 'Delete',
                        'commandColumnCancel': 'Cancel',
                        'commandColumnUpdate': 'Update',
                        'commandColumnMenu': '',
                        'expandRow': 'Expand row',
                        'collapseRow': 'Collapse row',
                        'addNewRow': 'Click here to add a new row',
                        'dialogChartHeader': '{{value}} Chart',
                        'dialogRowDetailHeader': 'Row Id: {{value}}',
                        'dialogRowDetailButtonConfirm': 'OK',
                        'dialogRowDetailButtonCancel': 'CANCEL',
                        'dialogEditHeader': 'Edit {{value}}',
                        'dialogAddButtonConfirm': 'ADD',
                        'dialogAddButtonCancel': 'CANCEL',
                        'dialogEditButtonConfirm': 'OK',
                        'dialogEditButtonCancel': 'CANCEL',
                        'dialogFilterButtonConfirm': 'FILTER',
                        'dialogFilterButtonCancel': 'CLEAR',
                        'dialogDeleteButtonConfirm': 'DELETE',
                        'dialogDeleteButtonCancel': 'CANCEL',
                        'dialogAddHeader': 'Add Row',
                        'dialogDeleteHeader': 'Delete Row',
                        'dialogFilterHeader': 'Filter by',
                        'dialogFilterMinLabel': 'Min',
                        'dialogFilterMaxLabel': 'Max',
                        'groupBarLabel': 'Drag a column header here to group by that column',
                        'dialogDeleteContent': 'Are you sure you want to delete this row?',
                        'calendar': {
                            // separator of parts of a date (e.g. '/' in 11/05/1955)
                            '/': '/',
                            // separator of parts of a time (e.g. ':' in 05:44 PM)
                            ':': ':',
                            // the first day of the week (0 = Sunday, 1 = Monday, etc)
                            firstDay: 0,
                            days: {
                                // full day names
                                names: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
                                // abbreviated day names
                                namesAbbr: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
                                // shortest day names
                                namesShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]
                            },
                            months: {
                                // full month names (13 months for lunar calendards -- 13th month should be '' if not lunar)
                                names: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', '' ],
                                // abbreviated month names
                                namesAbbr: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '' ]
                            },
                            // AM and PM designators in one of these forms:
                            // The usual view, and the upper and lower case versions
                            //      [standard,lowercase,uppercase]
                            // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                            //      null
                            AM: [ 'AM', 'am', 'AM' ],
                            PM: [ 'PM', 'pm', 'PM' ],
                            eras: [
                                // eras in reverse chronological order.
                                // name: the name of the era in this culture (e.g. A.D., C.E.)
                                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                                // offset: offset in years from gregorian calendar
                                {'name': 'A.D.', 'start': null, 'offset': 0}
                            ],
                            currencySymbol: '$',
                            currencySymbolPosition: 'before',
                            decimalSeparator: '.',
                            thousandsSeparator: ','
                        },
                        'CONTAINS': 'Contains',
                        'DOES_NOT_CONTAIN': 'Does not contain',
                        'ENDS_WITH': 'Ends with',
                        'EQUAL': 'Equal',
                        'GREATER_THAN': 'Greater than',
                        'GREATER_THAN_OR_EQUAL': 'Greater than or equal',
                        'LESS_THAN': 'Less than',
                        'LESS_THAN_OR_EQUAL': 'Less than or equal',
                        'NOT_EQUAL': 'Not equal',
                        'RANGE': 'Range',
                        'CLEAR_FILTER': 'Clear Filter',
                        'STARTS_WITH': 'Starts with',
                        'addFilter': '+ Add filter',
                        'and': 'And',
                        'apply': 'Apply',
                        'booleanFirst': '☐',
                        'booleanLast': '☑',
                        'cancel': 'Cancel',
                        'CONTAINS_CASE_SENSITIVE': 'Contains (case sensitive)',
                        'dateFirst': '1',
                        'dateLast': '9',
                        'DOES_NOT_CONTAIN_CASE_SENSITIVE': 'does not contain (case sensitive)',
                        'EMPTY': 'empty',
                        'ENDS_WITH_CASE_SENSITIVE': 'ends with (case sensitive)',
                        'EQUAL_CASE_SENSITIVE': 'equal (case sensitive)',
                        'filter': 'Filter',
                        'customize': 'Customize Columns',
                        'filteredByMultiple': '{{n}} filters',
                        'filteredByOne': '1 filter',
                        'filterValuePlaceholder': 'Value',
                        'find': 'Find a field',
                        'findInView': 'Find in view',
                        'firstBy': 'Sort by',
                        'found': '{{nth}} of {{n}}',
                        'from': 'from',
                        'noFilters': 'No filters applied',
                        'noResults': 'No results',
                        'noSorting': 'No sorting applied',
                        'NOT_EMPTY': 'not empty',
                        'NOT_NULL': 'not null',
                        'NULL': 'null',
                        'numberFirst': '1',
                        'numberLast': '9',
                        'ok': 'OK',
                        'or': 'Or',
                        'pickAnother': 'Pick another field to sort by',
                        'sort': 'Sort',
                        'group': 'Group',
                        'sortedByMultiple': 'Sorted by {{n}} fields',
                        'sortedByOne': 'Sorted by 1 field',
                        'STARTS_WITH_CASE_SENSITIVE': 'starts with (case sensitive)',
                        'stringFirst': 'A',
                        'stringLast': 'Z',
                        'thenBy': 'then by',
                        'where': 'Where',
                        'collapseAll': 'Collapse all',
                        'expandAll': 'Expand all',
                        'noGrouping': 'No grouping',
                        'groupedByMultiple': '{{n}} groups',
                        'groupedByOne': '1 group',
                        'firstByGroup': 'Group by',
                        'pickAnotherGroupBy': 'Pick another field to group by'
                    }
                },
                type: 'object'
            },
            'onCellValue': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onCellUpdate': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onBeforeInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onAfterInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onKey': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRender': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onChartInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowDetailInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowDetailUpdated': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowInserted': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowRemoved': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowUpdate': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onRowUpdated': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onColumnInit': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onColumnInserted': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onColumnRemoved': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onColumnUpdated': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onCommand': {
                value: null,
                reflectToAttribute: false,
                type: 'any'
            },
            'filtering': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'filter': {
                        value: [],
                        type: 'array',
                        reflectToAttribute: false
                    },
                    'filterRow': {
                        value: {
                            'visible': {
                                value: false,
                                type: 'boolean'
                            },
                            'menuVisible': {
                                value: false,
                                type: 'boolean'
                            },
                            'applyMode': {
                                value: 'auto',
                                type: 'string',
                                allowedValues: [ 'auto', 'click' ]
                            },
                            'autoApplyModeDelay': {
                                value: 500,
                                type: 'number'
                            }
                        },
                        type: 'object'
                    },
                    'filterMenu': {
                        value: {
                            'visible': {
                                value: true,
                                type: 'boolean'
                            },
                            'buttons': {
                                value: [ 'cancel', 'clear', 'filter' ],
                                type: 'array'
                            },
                            'dataSource': {
                                value: null,
                                type: 'any'
                            },
                            'width': {
                                value: 250,
                                type: 'number'
                            },
                            'height': {
                                value: 200,
                                type: 'number'
                            },
                            'mode': {
                                value: 'default',
                                allowedValues: [ 'default', 'excel' ],
                                type: 'string'
                            },
                            'messages': {
                                value: null,
                                type: 'object'
                            }

                        },
                        type: 'object'
                    }
                },
                type: 'object'
            },
            'editing': {
                value: {
                    'allowRowHeaderEdit': {
                        value: false,
                        type: 'any'
                    },
                    'allowColumnHeaderEdit': {
                        value: false,
                        type: 'any'
                    },
                    'active': {
                        value: false,
                        readonly: true,
                        type: 'boolean'
                    },
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'batch': {
                        value: false,
                        type: 'any'
                    },
                    'action': {
                        value: 'click',
                        type: 'string',
                        allowedValues: [ 'none', 'click', 'doubleClick' ]
                    },
                    'commandKeys': {
                        value: {
                            'commandKeyEdit': {
                                value: {
                                    command: 'commandKeyEditCommand',
                                    key: 'F2'
                                },
                                type: 'object'
                            },
                            'commandKeyCancel': {
                                value: {
                                    command: 'commandKeyCancelCommand',
                                    key: 'Escape'
                                },
                                type: 'object'
                            },
                            'commandKeyUpdate': {
                                value: {
                                    command: 'commandKeyUpdateCommand',
                                    key: 'Enter | Tab'
                                },
                                type: 'object'
                            }
                        },
                        type: 'object'
                    },
                    'commandBar': {
                        value: {
                            'visible': {
                                value: false,
                                type: 'boolean'
                            },
                            'position': {
                                value: 'near',
                                allowedValues: [ 'near', 'far', 'both' ],
                                type: 'string'
                            },
                            'displayMode': {
                                value: 'labelAndIcon',
                                allowedValues: [ 'label', 'icon', 'labelAndIcon' ],
                                type: 'string'
                            },
                            'dataSource': {
                                value: {
                                    'commandBarSearch':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandBarSearchCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-search',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandBarAddRow':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandBarAddRowCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-plus',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandBarDeleteRow':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandBarDeleteRowCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-delete',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandBarBatchSave':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandBarBatchSaveCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-ok-squared',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandBarBatchRevert':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandBarBatchRevertCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-reload',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    }
                                },
                                type: 'object'
                            }
                        },
                        type: 'object'
                    },
                    'commandColumn': {
                        value: {
                            'visible': {
                                value: false,
                                type: 'boolean'
                            },
                            'inline': {
                                value: false,
                                type: 'boolean'
                            },
                            'position': {
                                value: 'far',
                                allowedValues: [ 'near', 'far' ],
                                type: 'string'
                            },
                            'displayMode': {
                                value: 'icon',
                                allowedValues: [ 'label', 'icon', 'labelAndIcon' ],
                                type: 'string'
                            },
                            'dataSource': {
                                value: {
                                    'commandColumnMenu':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnMenuCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-menu',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandColumnEdit':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnEditCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-mode-edit',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: 'auto',
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandColumnDelete':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnDeleteCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-delete',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandColumnUpdate':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnUpdateCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-ok-squared',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: 'auto',
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandColumnCancel':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnCancelCommand',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-cancel-circled',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: 'auto',
                                                type: 'any'
                                            }
                                        },

                                        type: 'object'
                                    },
                                    'commandColumnRowMenu':
                                    {
                                        value: {
                                            'command': {
                                                value: 'commandColumnRowMenuCommand',
                                                type: 'any',
                                                reflectToAttribute: false
                                            },
                                            'icon': {
                                                value: 'lw-icon-ellipsis-vert',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '{{messages}}',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'commandColumnCustom':
                                    {
                                        value: {
                                            'command': {
                                                value: '',
                                                type: 'any'
                                            },
                                            'icon': {
                                                value: 'lw-icon-ellipsis-vert',
                                                type: 'string'
                                            },
                                            'label': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: false,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    }
                                },
                                type: 'object'
                            },
                            'width': {
                                value: null,
                                type: 'number?'
                            }
                        },
                        reflectToAttribute: false,
                        type: 'object'
                    },
                    'mode': {
                        value: 'cell',
                        allowedValues: [ 'cell', 'row' ],
                        type: 'string'
                    },
                    'addNewRow': {
                        value: {
                            'position': {
                                value: 'both',
                                allowedValues: [ 'near', 'far', 'both' ],
                                type: 'string'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            },
                            'autoCreate': {
                                value: false,
                                type: 'boolean'
                            },
                            'autoSave': {
                                value: true,
                                type: 'boolean'
                            },
                            'label': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'displayMode': {
                                value: 'row',
                                allowedValues: [ 'row', 'button' ],
                                type: 'string'
                            }
                        },
                        type: 'object'
                    },
                    'dialog': {
                        value: {
                            'header': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'height': {
                                value: 'auto',
                                type: 'any'
                            },
                            'width': {
                                value: 'auto',
                                type: 'any'
                            },
                            'left': {
                                value: 'center',
                                type: 'any'
                            },
                            'top': {
                                value: 'center',
                                type: 'any'
                            },
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'addDialog': {
                        value: {
                            'header': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'height': {
                                value: 'auto',
                                type: 'any'
                            },
                            'width': {
                                value: 'auto',
                                type: 'any'
                            },
                            'left': {
                                value: 'center',
                                type: 'any'
                            },
                            'top': {
                                value: 'center',
                                type: 'any'
                            },
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'deleteDialog': {
                        value: {
                            'header': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'height': {
                                value: 'auto',
                                type: 'any'
                            },
                            'width': {
                                value: 'auto',
                                type: 'any'
                            },
                            'left': {
                                value: 'center',
                                type: 'any'
                            },
                            'top': {
                                value: 'center',
                                type: 'any'
                            },
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    }
                },
                type: 'object'
            },
            'paging': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'spinner': {
                        value: {
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'step': {
                                value: 1,
                                type: 'number'
                            }
                        },
                        type: 'object'
                    },
                    'pageSize': {
                        value: 10,
                        type: 'int',
                        validator: 'pageSizeValidator'
                    },
                    'pageIndex': {
                        value: 0,
                        type: 'int',
                        validator: 'pageIndexValidator'
                    }
                },
                type: 'object'
            },
            'pager': {
                value: {
                    'autoEllipsis': {
                        value: 'both',
                        allowedValues: [ 'none', 'before', 'after', 'both' ],
                        type: 'string'
                    },
                    'position': {
                        value: 'far',
                        allowedValues: [ 'near', 'far', 'both' ],
                        type: 'string'
                    },
                    'template': {
                        value: '',
                        type: 'string'
                    },
                    'pageSizeSelector': {
                        value: {
                            'visible': {
                                value: false,
                                type: 'boolean'
                            },
                            'dataSource': {
                                value: [ 10, 20, 50 ],
                                type: 'object'
                            },
                            'position': {
                                value: 'far',
                                allowedValues: [ 'near', 'far' ],
                                type: 'string'
                            }
                        },
                        type: 'object'
                    },
                    'summary': {
                        value: {
                            'position': {
                                value: 'far',
                                allowedValues: [ 'near', 'far' ],
                                type: 'string'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'navigationButtons': {
                        value: {
                            'position': {
                                value: 'both',
                                allowedValues: [ 'near', 'far', 'both' ],
                                type: 'string'
                            },
                            'prevNextButtons': {
                                value: {
                                    'visible': {
                                        value: true,
                                        type: 'boolean'
                                    }
                                },
                                type: 'object'
                            },
                            'firstLastButtons': {
                                value: {
                                    'visible': {
                                        value: true,
                                        type: 'boolean'
                                    }
                                },
                                type: 'object'
                            },
                            'labels': {
                                value: {
                                    'visible': {
                                        value: false,
                                        type: 'boolean'
                                    }
                                },
                                type: 'object'
                            }
                        },
                        type: 'object'
                    },
                    'navigationInput': {
                        value: {
                            'position': {
                                value: 'far',
                                allowedValues: [ 'near', 'far' ],
                                type: 'string'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'pageIndexSelectors': {
                        value: {
                            'visible': {
                                value: true,
                                type: 'boolean'
                            },
                            'dataSource': {
                                value: 10,
                                type: 'any'
                            },
                        },
                        type: 'object'
                    },
                    'visible': {
                        value: false,
                        type: 'boolean'
                    }
                },
                type: 'object',
                reflectToAttribute: false
            },
            'rowDetail': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'height': {
                        value: 200,
                        type: 'number'
                    },
                    'position': {
                        value: 'near',
                        allowedValues: [ 'near', 'far' ],
                        type: 'string'
                    },
                    'template': {
                        value: '',
                        type: 'any',
                        reflectToAttribute: false
                    },
                    'visible': {
                        value: true,
                        type: 'boolean'
                    },
                    'dialog': {
                        value: {
                            'header': {
                                value: '{{message}}',
                                type: 'string'
                            },
                            'height': {
                                value: 300,
                                type: 'any'
                            },
                            'width': {
                                value: 360,
                                type: 'any'
                            },
                            'left': {
                                value: 'center',
                                type: 'any'
                            },
                            'top': {
                                value: 'center',
                                type: 'any'
                            },
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    }
                },
                type: 'object'
            },
            'summaryRow': {
                value: {
                    'position': {
                        value: 'far',
                        allowedValues: [ 'near', 'far' ],
                        type: 'string'
                    },
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'template': {
                        value: '',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'scrolling': {
                value: 'physical',
                allowedValues: [ 'physical', 'virtual', 'infinite', 'deferred' ],
                type: 'string'
            },
            'columnHeader': {
                value: {
                    'visible': {
                        value: true,
                        type: 'boolean'
                    }
                },
                type: 'object'
            },
            'groupHeader': {
                value: {
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'template': {
                        value: '',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'header': {
                value: {
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'template': {
                        value: '',
                        type: 'string'
                    },
                    'buttons': {
                        value: ['columns', 'filter', 'group', 'sort', 'search'],
                        type: 'array'
                    }
                },
                type: 'object'
            },
            'footer': {
                value: {
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'template': {
                        value: '',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'checkBoxes': {
                value: {
                    'visible': {
                        value: false,
                        type: 'boolean'
                    },
                    'hasThreeStates': {
                        value: false,
                        type: 'boolean'
                    }
                },
                type: 'object'
            },
            'selection': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowRowHeaderSelection': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowColumnHeaderSelection': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowRowSelection': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowCellSelection': {
                        value: false,
                        type: 'boolean'
                    },
                    'allowDragSelection': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowDragSelectionAutoScroll': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowCellDragSelectionHandle': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowCellDragDropSelectionHandle': {
                        value: true,
                        type: 'boolean'
                    },
                    'allowCellDragSelectionAutoFill': {
                        value: true,
                        type: 'boolean'
                    },
                    'selectAllMode': {
                        value: 'page',
                        allowedValues: [ 'none', 'page', 'all' ],
                        type: 'string'
                    },
                    'mode': {
                        value: 'many',
                        type: 'string',
                        allowedValues: [ 'one', 'many', 'extended' ]
                    },
                    'action': {
                        value: 'click',
                        type: 'string',
                        allowedValues: [ 'none', 'click', 'doubleClick' ]
                    },
                    'checkBoxes': {
                        value: {
                            'enabled': {
                                value: false,
                                type: 'boolean'
                            },
                            'autoShow': {
                                value: false,
                                type: 'boolean'
                            },
                            'action': {
                                value: 'click',
                                type: 'string',
                                allowedValues: [ 'none', 'click', 'doubleClick' ]
                            },
                            'selectAllMode': {
                                value: 'page',
                                allowedValues: [ 'none', 'page', 'all' ],
                                type: 'string'
                            },
                            'position': {
                                value: 'near',
                                allowedValues: [ 'near', 'far' ],
                                type: 'string'
                            }
                        },
                        type: 'object'
                    },
                    'selected': {
                        value: '',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'sorting': {
                value: {
                    'enabled': {
                        value: false,
                        type: 'boolean'
                    },
                    'sort': {
                        value: [],
                        type: 'array'
                    },
                    'mode': {
                        value: 'one',
                        allowedValues: [ 'one', 'many' ],
                        type: 'string'
                    },
                    'sortToggleThreeStates': {
                        value: true,
                        type: 'boolean'
                    }
                },
                type: 'object'
            }
        }
    }

    static get requires() {
        return {/*
                'LW.Button': 'lw.button.js',
                'LW.ScrollBar': 'lw.scrollbar.js',
                'LW.Menu': 'lw.menu.js',
                'LW.Calendar': 'lw.calendar.js',
                'LW.TimePicker': 'lw.timepicker.js',
                'LW.DateTimePicker': 'lw.datetimepicker.js',
                'LW.Tree': 'lw.tree.js',
                'LW.Utilities.Complex': 'lw.complex.js',
                'LW.Utilities.BigNumber': 'lw.math.js',
                'LW.Utilities.NumericProcessor': 'lw.numeric.js',
                'LW.NumericTextBox': 'lw.numerictextbox.js',
                'LW.Pager': 'lw.pager.js',
                'LW.ListBox': 'lw.listbox.js',
                'LW.DropDownList': 'lw.dropdownlist.js',
                'LW.ComboBox': 'lw.combobox.js',
                'LW.Utilities.DateTime': 'lw.date.js',
                'LW.FilterBuilder': 'lw.filterbuilder.js',
                'LW.FilterPanel': 'lw.filterpanel.js'      */
        }
    }

    static get styleUrls() {
        return [
            'lw.menu.css',
            'lw.filterpanel.css',
            'lw.pager.css',
            'lw.grid.css',
            'lw.textbox.css'
        ]
    }

    /** Button's template. */
    template() {
        return `<div class=\'lw-container\'id=\'container\' disabled=\'[[disabled]]\' role=\'grid\'>
                <div id=\'header\' role="toolbar" class=\'lw-grid-header lw-hidden\'>
                </div>
                <div id=\'groupHeader\' role="presentation" class=\'lw-grid-group-header lw-hidden\'></div>
                <div id=\'headerPager\' top class=\'lw-grid-pager lw-hidden\'></div>
                <div id=\'headerCommandBar\' header top class=\'lw-grid-header lw-grid-command-bar lw-hidden\'></div>
                 <div id=\'content\' class=\'lw-grid-content\'>
                    <div id=\'placeholder\' class =\'lw-hidden lw-placeholder lw-grid-placeholder\'></div>
                    <div id=\'columnHeader\' role="rowgroup" class=\'lw-grid-column-header\'>
                        <div id=\'columnNearContainer\' role="row" class=\'near lw-hidden lw-grid-column-header-cell-container\'>
                       </div>
                       <div id=\'columnContainer\' role="row" class=\'center lw-grid-column-header-cell-container\'>
                       </div>
                        <div id=\'columnFarContainer\' role="row" class=\'far lw-hidden lw-grid-column-header-cell-container\'>
                       </div>
                    </div>
                    <div id=\'scrollView' role="rowgroup" class =\'lw-grid-scroll-view\'>
                        <div id=\'rowNearContainer\' role="presentation" class=\'near lw-hidden lw-grid-row-container\'>
                        </div>
                         <div id=\'rowContainer\' role="presentation" class=\'center lw-grid-row-container\'>
                        </div>
                        <div id=\'rowFarContainer\' role="presentation" class=\'far lw-hidden lw-grid-row-container\'>
                        </div>
                        <lw-scroll-bar right-to-left="[[rightToLeft]]" id=\'verticalScrollBar\' class=\'lw-grid-scroll-bar\' wait disabled=\'[[disabled]]\' orientation=\'vertical\'></lw-scroll-bar>
                        <lw-scroll-bar right-to-left="[[rightToLeft]]" id=\'horizontalScrollBar\' class=\'lw-grid-scroll-bar\' wait disabled=\'[[disabled]]\'></lw-scroll-bar>
                    </div>
                  <div id=\'filterFooter\' class=\'lw-grid-filter-footer lw-hidden\'></div>
                </div>
                <div id=\'loadingIndicatorContainer\' class=\'lw-loader-container\'>
                    <span id=\'loadingIndicator\' class=\'lw-grid-loader lw-loader\'></span>
                    <span id=\'loadingIndicatorPlaceholder\' class =\'lw-loader-label lw-hidden\'></span>
                </div>
                <div id=\'footerCommandBar\' footer class=\'lw-grid-footer lw-grid-command-bar lw-hidden\'></div>
                <div id=\'footerPager\' class=\'lw-grid-pager lw-hidden\'></div>
                <div id=\'footer\' class=\'lw-grid-footer lw-hidden\'></div>
            </div>`;
    }

    /**
        * Grid's event listeners.
        */
    static get listeners() {
        return {
            'focus': '_focusHandler',
            'blur': '_blurHandler',
            'wheel': '_mouseWheelHandler',
            'document.up': '_upHandler',
            'document.move': '_moveHandler',
            'document.scroll': '_scrollHandler',
            'keydown': '_keyDownHandler',
            'keyup': '_keyUpHandler',
            'resize': '_resizeHandler',
            'header.click': '_headerClickHandler',
            'columnHeader.down': '_columnDownHandler',
            'columnHeader.click': '_columnClickHandler',
            'columnHeader.move': '_columnMoveHandler',
            'columnHeader.mouseleave': '_columnMouseLeaveHandler',
            'rowNearContainer.down': '_rowDownHandler',
            'rowContainer.down': '_rowDownHandler',
            'rowFarContainer.down': '_rowDownHandler',
            'container.selectstart': '_selectStartHandler',
            'styleChanged': '_styleChangedHandler',
            'swipeleft': '_swipeLeftHandler',
            'swiperight': '_swipeRightHandler'
        };
    }

    get _tabindex() {
        const that = this;

        return that.disabled || that.unfocusable ? '' : ' tabindex="0"';
    }

    pageSizeValidator( oldValue, newValue ) {
        const that = this;

        if ( newValue < 0 ) {
            return 0;
        }

        if ( that.dataSource && newValue > that.dataSource.length ) {
            return that.dataSource.length;
        }
    }

    pageIndexValidator( oldValue, newValue ) {
        const that = this;

        if ( newValue < 0 ) {
            return 0;
        }


        if ( that.dataSource ) {
            const maxPageIndex = Math.ceil( that.dataSource.length / that.paging.pageSize );

            if ( newValue > maxPageIndex - 1 ) {
                return maxPageIndex - 1;
            }
        }
    }

    _offsetTop( element ) {
        const that = this;

        if ( !element ) {
            return 0;
        }

        return element.offsetTop + that._offsetTop( element.offsetParent );
    }

    _offsetLeft( element ) {
        const that = this;

        if ( !element ) {
            return 0;
        }

        return element.offsetLeft + that._offsetLeft( element.offsetParent );
    }

    offset( element ) {
        return {left: this._offsetLeft( element ), top: this._offsetTop( element )}
    }

    getBoundingRect( element ) {
        const that = this;
        let offsetX = window.pageXOffset,
            offsetY = window.pageYOffset,
            rect = element.getBoundingClientRect();

        if ( element !== document.body ) {
            let parent = element.parentNode;

            while ( parent !== document.body ) {
                if (parent) {
                    offsetX += parent.scrollLeft;
                    offsetY += parent.scrollTop;
                }

                let currentParent = parent;
                parent = parent.parentNode;

                if ( that.enableShadowDOM && parent === that.shadowRoot ) {
                    parent = that;
                }
                else if ( that.isInShadowDOM && (parent === that.getRootNode() || currentParent === that.getRootNode() )) {
                    parent = that.getRootNode().host;
                }
            }
        }

        return {
            bottom: rect.bottom + offsetY,
            height: rect.height,
            left: rect.left + offsetX,
            right: rect.right + offsetX,
            top: rect.top + offsetY,
            width: rect.width
        };
    }



    _upHandler( event ) {
        const that = this;

        const boundingRect = that.getBoundingRect( that );

        super._upHandler();

        if ( that._tapTimer ) {
            clearTimeout( that._tapTimer );
        }

        if ( event.pageX < boundingRect.left || event.pageX > boundingRect.right || event.pageY < boundingRect.top || event.pageY > boundingRect.bottom ) {
            if ( that._inputOverlay ) {
                that._inputOverlay.classList.remove( 'lw-input-overlay-on' );
                setTimeout( () => {
                    if ( that._inputOverlay ) {
                        if ( that._inputOverlay.parentNode ) {
                            that._inputOverlay.parentNode.removeChild( that._inputOverlay );
                        }

                        that._inputOverlay = null;
                    }
                }, that.behavior.doubleClickTimingDelay );
            }

            if ( that.editing.isEditing && !that.editing.dialog.enabled ) {
                setTimeout( () => {
                    if ( event.defaultPrevented ) {
                        return;
                    }

                    if ( that.editing.editCell && that.editing.editCell.editor.instance ) {
                        that.editing.editCell.editor.instance.blur( event );

                        if ( event.defaultPrevented ) {
                            return;
                        }
                    }

                    that.endEdit();
                }, 50 );
            }

            if ( that.menu ) {
                let target, isInsideGrid, isInsideMenu, menuContainer;
                if ( that.enableShadowDOM || that.isInShadowDOM ) {
                    target = event.originalEvent.composedPath()[ 0 ];
                    isInsideGrid = function () {
                        let host = target.getRootNode().host;

                        while ( host ) {
                            if ( host === that ) {
                                return host;
                            }

                            host = host.getRootNode().host;
                        }
                    }();

                    isInsideMenu = that.menu.contains( target ) || that.menu.firstElementChild.shadowRoot.contains( target );
                    menuContainer = that.menu.firstElementChild.shadowRoot;
                }
                else {
                    target = event.originalEvent.target;
                    isInsideGrid = that.contains( target );
                    isInsideMenu = that.menu.contains( target );
                    menuContainer = that.menu;
                }

                if ( !isInsideGrid && !isInsideMenu ) {
                    const dropDownLists = menuContainer.querySelectorAll( 'lw-drop-down-list' );
                    const dateTimePickers = menuContainer.querySelectorAll( 'lw-date-time-picker' );

                    for ( let i = 0; i < dropDownLists.length; i++ ) {
                        const dropDownList = dropDownLists[ i ];
                        const dropDown = dropDownList.$.dropDownContainer;

                        if ( dropDown.contains( target ) ) {
                            return;
                        }
                    }

                    for ( let i = 0; i < dateTimePickers.length; i++ ) {
                        const dateTimePicker = dateTimePickers[ i ];
                        const dropDown = dateTimePicker.$.dropDownContainer;

                        if ( dropDown.contains( target ) ) {
                            return;
                        }
                    }

                    that.closeMenu();

                    return;
                }
            }
        }

        that._dragSelectionEnd( event );
        that._endResize( event );
        that._endDrag( event );
    }

    _nextColumn( column ) {
        const that = this;

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const currentColumn = that.viewColumns[ i ];

            if ( currentColumn.visibleIndex === column.visibleIndex + 1 ) {
                return currentColumn;
            }
        }

        return null;
    }

    _nextRow( row ) {
        const that = this;

        const rows = that._recyclingRows;
        const rowIndex = rows.indexOf( row );

        if ( rowIndex >= 0 ) {
            return rows[ rowIndex + 1 ];
        }

        return null;
    }

    _moveHandler( event ) {
        const that = this;

        if ( !that.isInitialized ) {
            return;
        }

        if ( !that._selection ) {
            return;
        }

        if ( that.selection.enabled && that.selection.allowDragSelection && !that.editing.isEditing ) {
            if ( !that._selection.selectionRect || ( that._selection.selectionRect && !that._selection.selectionRect.captured ) ) {
                that._dragSelection( event );
                const originalTarget = event.originalEvent.target.closest ? event.originalEvent.target : undefined;

                if ( LW.Utilities.Core.isMobile && originalTarget && originalTarget.closest( 'lw-grid' ) === that ) {
                    event.originalEvent.preventDefault();
                }
            }
        }

        if ( that.isScrolling ) {
            return;
        }

        if ( that.behavior.columnResizeMode !== 'none' && !that.classList.contains( 'lw-grid-row-resize-mode' ) ) {
            that._columnMoveResizeHandler( event );
        }

        if ( that.behavior.rowResizeMode !== 'none' && !that.classList.contains( 'lw-grid-column-resize-mode' ) ) {
            that._rowMoveResizeHandler( event );
        }

        that._drag( event );
    }


    _columnMouseLeaveHandler() {
        const that = this;

        if ( !that._columnElements ) {
            return;
        }

        for ( let i = 0; i < that._columnElements.length; i++ ) {
            const element = that._columnElements[ i ];
            const column = element.column;

            if ( column && column.autoShowActionButton ) {
                element._hideActionButton();
            }
        }
    }

    _columnMoveHandler( event ) {
        const that = this;

        if ( !that.isInitialized ) {
            return;
        }

        if ( that._columnResizeStartLine || that._rowResizeStartLine ) {
            return;
        }

        for ( let i = 0; i < that._columnElements.length; i++ ) {
            const element = that._columnElements[ i ];
            const column = element.column;

            if ( column && column.autoShowActionButton ) {
                const rect = element.getBoundingClientRect();
                const offset = that.offset( element );


                if ( offset.left <= event.pageX && offset.left + rect.width - 6 >= event.pageX ) {
                    if ( offset.top <= event.pageY && offset.top + rect.height >= event.pageY ) {
                        if ( !that.hasColumnMenu( column ) ) {
                            continue;
                        }

                        element._showActionButton();
                    }
                    else {
                        element._hideActionButton();
                    }
                }
                else {
                    element._hideActionButton();
                }
            }
        }
    }

    _headerClickHandler(event) {
        const that = this;

        if (that.$.headerBar) {
            const target = that.isInShadowDOM || that.shadowRoot ? event.composedPath()[0] : event.target;

            that.$.headerBar._headerClickHandler(target, that);
        }
    }

    _columnClickHandler( event ) {
        const that = this;

        const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );

        let columnDataField = null;
        let columnElement = null;
        const isDoubleClick = new Date() - that._clickTime < that.behavior.doubleClickTimingDelay;

        that._doubleClickHandler( event );

        for ( let i = 0; i < elements.length; i++ ) {
            const element = elements[ i ];

            if ( element.classList.contains( 'lw-action-button' ) ) {
                return;
            }

            if ( element.getAttribute( 'data-field' ) ) {
                columnDataField = element.getAttribute( 'data-field' );
                columnElement = element;
                break;
            }
        }

        if ( columnDataField ) {
            const column = columnElement.column;

            if ( !column ) {
                return;
            }

            if ( event.srcElement.classList.contains( 'lw-filter-button' ) ) {
                return;
            }

            if ( LW.Utilities.Core.isMobile ) {
                if ( isDoubleClick ) {
                    if ( column.allowSortToggleOnClick && that.sorting.enabled ) {
                        that.sortBy( columnDataField );
                    }
                }

                that._columnMoveHandler( event );
                event.originalEvent.preventDefault();
            }
            else {
                if ( column.allowSortToggleOnClick && that.sorting.enabled ) {
                    that.sortBy( columnDataField );
                }
            }
        }
    }

    _columnDownHandler( event ) {
        const that = this;

        const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( event.clientX, event.clientY );

        let columnDataField = null;
        let columnElement = null;
        const isDoubleClick = new Date() - that._clickTime < that.behavior.doubleClickTimingDelay;

        if (that.$.headerBar) {
            that.$.headerBar.closePanel();
        }

        that._doubleClickHandler( event );

        for ( let i = 0; i < elements.length; i++ ) {
            const element = elements[ i ];

            if ( element.classList.contains( 'lw-action-button' ) ) {
                return;
            }

            if ( element.getAttribute( 'data-field' ) ) {
                columnDataField = element.getAttribute( 'data-field' );
                columnElement = element;
                break;
            }
        }

        if ( columnDataField ) {
            const column = columnElement.column;

            if ( !column ) {
                return;
            }

            if ( columnDataField === '_commandColumn' ) {
                that._applyCommand( that.editing.commandColumn.dataSource.commandColumnMenu.command );
                return
            }

            const selectColumn = function ( action ) {
                const canSelect = column.selectionColumn ? that.selection.checkBoxes.action === action && that.selection.enabled : that.selection.action === action && that.selection.enabled;

                if ( canSelect ) {
                    if ( that.editing.enabled && that.editing.editColumn === column ) {
                        return;
                    }

                    if ( !event.shiftKey && !event.ctrlKey ) {
                        that._dragSelectionStartDataField = columnDataField;
                    }
                    else {
                        that._dragSelectionStartDataField = null;
                    }

                    if ( columnDataField === '_checkBoxColumn' ) {
                        that._toggleColumnSelection( column );
                        return;
                    }

                    that._setSelection( null, column.dataField, event );
                }
            }

            if ( that.editing.isEditing ) {
                that.endEdit();
            }

            that.$.fireEvent( 'columnClick', {
                'column': column
            } );

            selectColumn( 'click' );

            if ( isDoubleClick ) {
                that.$.fireEvent( 'columnDoubleClick', {
                    'column': column
                } );

                selectColumn( 'doubleClick' );

                that._onColumnDoubleClick( column, event );
            }

            if ( that._columnToResizeElement && !that._columnResizeLine ) {
                that._columnDownResizeHandler( event );

                return;
            }

            that._beginDrag( event, column );
        }

        that.closeMenu();
        that._clickTime = new Date();
    }

    addTransformMoveStyle( element, duration, x, y, z, opacity ) {
        element.style[ 'opacity' ] = opacity;
        element.style[ 'transition-duration' ] = duration;
        element.style[ 'transform' ] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
    }

    removeTransformMoveStyle( element ) {
        element.style[ 'opacity' ] = '';
        element.style[ 'transition-duration' ] = '';
        element.style[ 'transform' ] = '';
    }


    _rowDownHandler( event ) {
        const that = this;

        if ( that._inputOverlay ) {
            that._inputOverlay.classList.remove( 'lw-input-overlay-on' );
        }

        that._doubleClickHandler( event );
        that._closeMenu( that.menu );
        that._rowResizeHandler( event );

        if ( that._toggledRow && that.appearance.allowRowToggleAnimation ) {
            return;
        }

        if ( !event.target.classList.contains( 'lw-grid-row-container' ) && !event.target.classList.contains( 'lw-grid-selection-overlay' )
            && !event.target.classList.contains( 'lw-selection-overlay-content' ) ) {
            return;
        }

        let clientX = event.clientX;
        let clientY = event.clientY;

        if ( event.touches ) {
            clientX = event.touches[ 0 ].clientX;
            clientY = event.touches[ 0 ].clientY;
        }

        const elements = ( that.enableShadowDOM ? that.shadowRoot : that.getRootNode() ).elementsFromPoint( clientX, clientY );
        let rowElement = null;
        let toggleButton = null;
        let checkbox = null;
        let cellElement = null;

        //const refresh = function () {
        //    const scrollLeft = that._scrollView.scrollLeft;

        //    that._refreshLayout();
        //    that._recycle();
        //    that._scrollView.scrollLeft = scrollLeft;
        //}

        that._lastPointerDownTime = new Date();

        for ( let i = 0; i < elements.length; i++ ) {
            const element = elements[ i ];

            if ( element.hasAttribute( 'toggle-button' ) ) {
                toggleButton = element;
            }

            if ( element.hasAttribute( 'checkbox' ) ) {
                checkbox = element;
            }

            if ( !cellElement && element.nodeName.toLowerCase() === 'lw-grid-cell' ) {
                cellElement = element;
            }

            if ( !rowElement && element.nodeName.toLowerCase() === 'lw-grid-row' ) {
                rowElement = element;
                break;
            }
        }

        if ( rowElement && cellElement ) {
            const cell = cellElement ? cellElement.cell : null;

            if ( !cell.row.filterRow ) {
                that._closeMenu( that.filterRowMenu );
            }
            if ( toggleButton && cell && !cell.column.rowDetailColumn ) {
                const row = rowElement.row;

                row.toggle( event );
            }
            else if ( that.rowDetail.enabled && that.rowDetail.visible && toggleButton && cell && cell.column.rowDetailColumn ) {
                const row = rowElement.row;

                if ( row.showDetail ) {
                    that.hideDetail( row.id );
                }
                else {
                    that.showDetail( row.id );
                }
            }
            else {
                const row = rowElement.row;
                const cell = cellElement ? cellElement.cell : null;

                if ( cell.column._treeColumn && checkbox ) {
                    row.checked = !row.checked;
                }

                if ( cell.element === row.header && that.behavior.allowRowReorder ) {
                    that._beginDrag( event, row );
                }

                that.$.fireEvent( 'rowClick', {
                    'row': row,
                    originalEvent: event.originalEvent
                } );

                that.$.fireEvent( 'cellClick', {
                    'cell': cell,
                    originalEvent: event.originalEvent
                } );

                if ( that._tapTimer ) {
                    clearTimeout( that._tapTimer );
                }

                that._tapTimer = setTimeout( function () {
                    if ( that._clickedRow === rowElement ) {
                        that.$.fireEvent( 'rowTap', {
                            'row': row,
                            originalEvent: event.originalEvent
                        } );
                    }

                    if ( that._clickedCell === cellElement ) {

                        that.$.fireEvent( 'cellTap', {
                            'cell': cell,
                            originalEvent: event.originalEvent
                        } );
                    }
                }, that.behavior.doubleClickTimingDelay );

                //const isEditing = that.editing.isEditing;

                const selectRow = function ( action ) {
                    if ( !that.selection.enabled || row.autoGenerated || row.allowSelect !== true ) {
                        delete that.__selectionStarted;
                        return;
                    }

                    const isEditing = that.editing.isEditing;

                    if ( isEditing && that.editing.editCell && that.editing.editCell.row.id === row.id && that.editing.editCell.column.dataField === cell.column.dataField ) {
                        return;
                    }

                    if ( isEditing && that.editing.editRow && that.editing.editRow.id === row.id ) {
                        return;
                    }

                    const focus = () => {
                        that.focus();
                        setTimeout( function () {
                            that.focus();
                        }, 50 );
                    }
                    if ( that.selection.action === action ) {
                        if ( !event.shiftKey && !event.ctrlKey ) {
                            if ( !that.selection.allowRowHeaderSelection && cell.column.autoGenerated ) {
                                that._dragSelectionStartRow = null;
                            }
                            else {
                                that._dragSelectionStartRow = rowElement.row;
                            }
                        }
                        else {
                            that._dragSelectionStartRow = null;
                        }

                        if ( !event.shiftKey && !event.ctrlKey ) {
                            that._dragSelectionStartDataField = cell.column.dataField;
                        }
                        else {
                            that._dragSelectionStartDataField = null;
                        }

                        if ( cell.column.rowHeaderColumn && !that.selection.allowRowHeaderSelection ) {
                            that._dragSelectionStartRow = null;
                            focus();
                            return;
                        }

                        that._setSelection( row.id, cell.column.dataField, event );
                        focus();
                    }
                    else if ( cell.column.selectionColumn && that.selection.checkBoxes.enabled && that.selection.checkBoxes.action === action ) {
                        that._setSelection( row.id, cell.column.dataField, event );
                        focus();
                    }

                }

                const isSelected = cell.selected;
                //const focusedCell = that._selection.focusedCell;

                const quickClick = that._clickedCell === cellElement && new Date() - that._clickTime < that.behavior.doubleClickTimingDelay;

                selectRow( 'click' );

                if ( row.autoGenerated || ( cell.column.autoGenerated || cell.template ) ) {
                    that._onRowClick( row.index, row, event );
                    that._onCellClick( cell, event );
                }
                else {
                    if ( that.selection.enabled ) {
                        if ( that.selection.allowCellSelection ) {

                            if ( that.selection.mode === 'extended' ) {
                                if ( isSelected === true && isSelected === cell.selected && !that.selection.isDragging
                                    && quickClick ) {
                                    that._onRowClick( row.index, row, event );
                                    that._onCellClick( cell, event );
                                }
                            }
                            else if ( quickClick ) {
                                that._onRowClick( row.index, row, event );
                                that._onCellClick( cell, event );
                            }
                        }
                        else if ( that.selection.allowRowSelection ) {
                            if ( that.selection.mode === 'extended' ) {
                                if ( isSelected === true && isSelected === cell.selected && !that.selection.isDragging
                                    && quickClick ) {
                                    that._onRowClick( row.index, row, event );
                                    that._onCellClick( cell, event );
                                }
                            }
                            else if ( quickClick ) {
                                that._onRowClick( row.index, row, event );
                                that._onCellClick( cell, event );
                            }
                        }
                        else {
                            that._onRowClick( row.index, row, event );
                            that._onCellClick( cell, event );
                        }
                    }
                    else {
                        that._onRowClick( row.index, row, event );
                        that._onCellClick( cell, event );
                    }
                }

                if ( new Date() - that._clickTime < that.behavior.doubleClickTimingDelay ) {
                    if ( that._clickedRow === rowElement ) {
                        that._onRowDoubleClick( row.index, row, event, event );

                        that.$.fireEvent( 'rowDoubleClick', {
                            'row': row,
                            originalEvent: event.originalEvent
                        } );

                        selectRow( 'doubleClick' );
                    }

                    if ( that._clickedCell === cellElement ) {
                        that._onCellDoubleClick( cell, event );

                        that.$.fireEvent( 'cellDoubleClick', {
                            'cell': cell,
                            originalEvent: event.originalEvent
                        } );
                    }
                }

                that._clickedRow = rowElement;
                that._clickedCell = cellElement;
                that._clickTime = new Date();
            }
        }
    }

    showDetail( id ) {
        const that = this;

        const row = that.rowById[ id ];

        if ( !row ) {
            return;
        }

        row.showDetail = true;
    }

    hideDetail( id ) {
        const that = this;

        const row = that.rowById[ id ];

        if ( !row ) {
            return;
        }

        row.showDetail = false;
    }

    _focusHandler() {
        const that = this;
        that._focused = true;
    }

    _blurHandler() {
        const that = this;
        that._focused = false;
    }


    _notify( propertyName, oldValue, newValue ) {
        const that = this;

        if ( that.notifyFn ) {
            for ( let i = 0; i < that.notifyFn.length; i++ ) {
                that.notifyFn[ i ]( propertyName, oldValue, newValue );
            }
        }
    }

    notify( notifyFn ) {
        const that = this;

        if ( notifyFn ) {
            if ( !that.notifyFn ) {
                that.notifyFn = [];
            }

            that.notifyFn.push( notifyFn );
        }
    }

    _applyTemplate( selector, element ) {
        //const that = this;
        let template = null;

        if ( selector === null || selector === '' ) {
            element.innerHTML = '';
            return;
        }

        if ( selector.startsWith( '#' ) || selector.startsWith( '.' ) ) {
            template = document.querySelector( selector );
        }

        if ( template ) {
            element.innerHTML = '';
            element.appendChild( template.content.cloneNode( true ).firstElementChild );
        }
        else {
            const htmlToElement = function ( html ) {
                const template = document.createElement( 'template' );

                html = html.trim(); // Never return a text node of whitespace as the result
                template.innerHTML = html;
                return template.content.firstChild;
            }

            const templateElement = htmlToElement( selector );

            if ( templateElement ) {
                element.innerHTML = '';
                element.appendChild( templateElement );
            }
        }
    }
    /**
    * Updates the listbox when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler( propertyName, oldValue, newValue ) {
        const that = this;

        if ( !that.isInitialized ) {
            return;
        }


        that._notify( propertyName, oldValue, newValue );

        switch ( propertyName ) {
            case 'appearance_displayLoadingIndicator': {
                return;
            }
            case 'appearance_placeholder':
                that.$.placeholder.innerHTML = newValue;
                return;
            case 'appearance_showColumnHeaderLines':
            case 'appearance_showColumnLines':
            case 'appearance_showRowLines': {
                that._recycle();
                return;
            }
            case 'appearance_allowColumnStickyPosition': {
                if ( newValue ) {
                    that._stickHeader();
                }
                else {
                    that._unstickHeader();
                }

                break;
            }
            case 'appearance_showColumnIcon': {
                for ( let i = 0; i < that.columns.length; i++ ) {
                    const column = that.columns[ i ];

                    column.setProperty( 'showIcon', that.appearance.showColumnIcon );
                }

                that._recycle();


                break;
            }

            case 'appearance_showRowHeaderNumber':
            case 'appearance_showRowHeader': {
                that._initializeRowNumberColumn();

                const column = that._frozenNearColumns[ 0 ];

                if ( column.rowHeaderColumn && column.element && !column.element.parentNode ) {
                    that.$.columnNearContainer.appendChild( column.element );
                }

                that.refresh();
                break;
            }

            case 'header_template': {
                that._applyTemplate( newValue, that.$.header );
                break;
            }
            case 'footer_template': {
                that._applyTemplate( newValue, that.$.footer );
                break;
            }
            case 'columnWidth': {
                that.columns.canNotify = false;

                let width = parseInt( newValue );

                if ( isNaN( width ) ) {
                    width = null;
                }

                if ( width >= 30 || width === null ) {
                    for ( let i = 0; i < that.columns.length; i++ ) {
                        const column = that.columns[ i ];

                        column.width = width;
                    }
                }

                that.columns.canNotify = true;
                that.refresh();
                break;
            }
            case 'checkBoxes_visible': {
                that._recycle();
                return;
            }
            case 'checkBoxes_hasThreeStates': {
                that.rows.canNotify = false;
                that._applyThreeStates( that.rowHierarchy );
                that.rows.canNotify = true;
                that._recycle();
                return;
            }
            case 'columnHeader_visible': {
                that.__columnHeaderHeight = null;
                that.refresh();
                break;
            }
            case 'selection_checkBoxes_enabled': {
                that._selectionColumn.visible = newValue;
                break;
            }

            case 'selection_checkBoxes_autoShow': {
                if ( that._selectionColumn.element ) {
                    if ( newValue ) {
                        that._selectionColumn.element.setAttribute( 'auto-show', '' );
                    }
                    else {
                        that._selectionColumn.element.removeAttribute( 'auto-show' );
                    }
                }
                break;
            }

            case 'selection_checkBoxes_position': {
                let index = that.viewColumns.indexOf( that._selectionColumn );

                that.viewColumns.canNotify = false;

                that.viewColumns.splice( index, 1 );

                const nearIndex = that._frozenNearColumns.indexOf( that._selectionColumn );
                const farIndex = that._frozenFarColumns.indexOf( that._selectionColumn );

                if ( nearIndex >= 0 ) {
                    that._frozenNearColumns.splice( nearIndex, 1 );
                }

                if ( farIndex >= 0 ) {
                    that._frozenFarColumns.splice( farIndex, 1 );
                }

                if ( newValue === 'far' ) {
                    that._selectionColumn.canNotify = false;
                    that._selectionColumn.freeze = 'far';
                    that._selectionColumn.canNotify = true;
                    that._frozenFarColumns.splice( 0, 0, that._selectionColumn );
                    that.viewColumns.push( that._selectionColumn );
                    that.$.columnFarContainer.appendChild( that._selectionColumn.element );
                }
                else {
                    let autoGeneratedNearColumns = 0;
                    let index = 0;

                    for ( let i = 0; i < that.viewColumns.length; i++ ) {
                        if ( !that.viewColumns[ i ].autoGenerated && that.viewColumns[ i ].dataField === that.columns[ index++ ].dataField ) {
                            break;
                        }

                        if ( that.viewColumns[ i ].autoGenerated ) {
                            autoGeneratedNearColumns++;
                        }
                    }

                    that._selectionColumn.canNotify = false;
                    that._selectionColumn.freeze = 'near';
                    that._selectionColumn.canNotify = true;

                    that._frozenNearColumns.splice( autoGeneratedNearColumns, 0, that._selectionColumn );
                    that.viewColumns.splice( autoGeneratedNearColumns, 0, that._selectionColumn );
                    that.$.columnNearContainer.appendChild( that._selectionColumn.element );

                }

                that.viewColumns.canNotify = true;

                break;
            }
            case 'selection_mode':
                if ( that._selection ) {
                    that._selection.focusedCell = null;
                }

                if ( that.selection.allowCellSelection ) {
                    that.clearSelection();
                }
                else {
                    if ( newValue === 'one' ) {
                        const selection = that.getSelection();
                        that.clearSelection();
                        if ( selection.rows && selection.rows[ 0 ] ) {
                            selection.rows[ 0 ].row.selected = true;

                            that._selection.focusedCell = that.rowById[ selection.rows[ 0 ].row.id ].getCell( that.columns[ 0 ].dataField );
                        }
                    }
                }
                break;
            case 'filtering_enabled':
                if ( newValue ) {
                    that._createFilterPanels();
                }
                return;
            case 'filtering_filter':
                for ( let i = 0; i < that.columns.length; i++ ) {
                    const column = that.columns[ i ];

                    column.canNotify = false;
                    column.setProperty( 'filter', null );
                    column.canNotify = true;
                }

                for ( let j = 0; j < that.filtering.filter.length; j++ ) {
                    const filter = that.filtering.filter[ j ];

                    if ( filter ) {
                        const dataField = filter[ 0 ];
                        const filterExpression = filter.splice( 1 );
                        let filterGroup = null;

                        if ( filterExpression instanceof LW.FilterGroup ) {
                            filterGroup = filterExpression;
                        }
                        else {
                            const column = that.columnByDataField[ dataField ];

                            if ( column ) {
                                filterGroup = that.dataSource._createFilter( column.dataType, filterExpression );
                            }
                        }

                        if ( filterGroup ) {
                            that.addFilter( dataField, filterGroup, false );
                        }
                    }
                }

                that.refreshFilters();
                return;
            case 'messages':
            case 'locale': {
                if ( that._dialogEdit ) {
                    that._dialogEdit.close();
                    that._dialogEdit = null;
                }

                if ( that._dialogDelete ) {
                    that._dialogDelete.close();
                    that._dialogDelete = null;
                }

                if ( that._dialogAddRow ) {
                    that._dialogAddRow.close();
                    that._dialogAddRow = null;
                }

                that._recycle();
                break;
            }
            case 'paging_spinner_enabled': {
                that._refresh();
                break;
            }
            case 'pager_visible':
                that._renderPagers();
                that._refreshPaging( false );
                return;
            case 'paging_pageIndex':
            case 'pager_position':
            case 'paging_enabled':
                that._refreshPaging( true );
                return;
            case 'paging_pageSize':
                that._refreshPaging( false );
                return;
            case 'columns': {
                that._renderColumns();
                return;
            }
            case 'dataSource': {
                delete that._isFirstVirtualDataSourceRequest;
                that.dataBind();
                return;
            }
            case 'rowDetail_dialog_width':
            case 'rowDetail_dialog_height':
            case 'rowDetail_dialog_enabled':
            case 'rowDetail_dialog_visible': {
                return;
            }
            case 'rowDetail_height':
            case 'rowDetail_enabled': {
                that.beginUpdate();
                that.rows.canNotify = false;

                const allowRowDetailToggleAnimation = that.appearance.allowRowDetailToggleAnimation;
                that.appearance.allowRowDetailToggleAnimation = false;

                for ( let i = 0; i < that._recyclingRows.length; i++ ) {
                    const row = that._recyclingRows[ i ];

                    row.height = null;

                    row.setProperty( 'showDetail', false );
                    row.detailHeight = that.rowDetail.height;
                }
                that.rows.canNotify = true;

                if ( !that.rowDetail.enabled ) {
                    for ( let i = 0; i < that.viewColumns.length; i++ ) {
                        const column = that.viewColumns[ i ];

                        if ( column.rowDetailColumn ) {
                            column.visible = false;
                            break;
                        }
                    }
                }

                that.appearance.allowRowDetailToggleAnimation = allowRowDetailToggleAnimation;

                that.endUpdate();

                return;
            }
            case 'rowDetail_visible': {
                for ( let i = 0; i < that.viewColumns.length; i++ ) {
                    const column = that.viewColumns[ i ];

                    if ( column.rowDetailColumn ) {
                        column.visible = newValue;
                        break;
                    }
                }

                return;
            }
            case 'displayLoadingIndicator': {
                that._setLoadingIndicatorVisibility();
                return;
            }
            case 'filterable': {
                that._refreshLayout();
                return;
            }

            case 'rightToLeft': {
                that.refresh();
                return;
            }
            case 'selectionMode': {
                return;
            }

            case 'editing_addNewRow_visible': {
                that._renderAddNewRow();
                that.refresh();
                break;
            }

            case 'editing_addNewRow_position': {
                that._renderAddNewRow();
                that.refresh();
                return;
            }
            case 'editing_enabled': {
                if ( !newValue ) {
                    that.setAttribute( 'aria-readonly', true );
                }
                else {
                    that.removeAttribute( 'aria-readonly' );
                }
                break;
            }

            case 'editing_dialog_visible': {
                return;
            }

            case 'editing_commandColumn_visible': {
                that.refresh( true );
                return;
            }
        }

        that.refresh();
    }

    /**
    * ListBox ready method.
    */
    ready() {
        super.ready();
        const that = this;

        const vScrollBar = that._scrollView.vScrollBar;
        const hScrollBar = that._scrollView.hScrollBar;

        vScrollBar.hasStyleObserver = false;
        hScrollBar.hasStyleObserver = false;
        vScrollBar.hasResizeObserver = false;
        hScrollBar.hasResizeObserver = false;
        vScrollBar.wait = false;
        hScrollBar.wait = false;
        vScrollBar.onChange = that._verticalScrollbarHandler.bind( that );
        hScrollBar.onChange = that._horizontalScrollbarHandler.bind( that );

        that.setFocusable( true );
        that.$.loadingIndicatorPlaceholder.innerHTML = that.appearance.loadingIndicatorPlaceholder;
        that.$.placeholder.innerHTML = that.appearance.placeholder;
        that._setLoadingIndicatorVisibility();
        that._cellsMerge = [];
        that.checkLicense();
    }


    checkLicense( log ) {
        const that = this;

        if (
            ( that.grouping.enabled ) ||
            ( that.selection.enabled && that.selection.allowCellSelection ) ||
            ( that.rowDetail.enabled ) ||
            ( that.charting.enabled ) ||
            ( that.editing.enabled && that.editing.batch ) ||
            ( that.editing.enabled && that.editing.mode === 'row' ) ||
            ( that.editing.enabled && that.editing.addNewRow.visible ) ||
            ( that.editing.enabled && that.editing.commandColumn.visible ) ||
            ( that.scrolling === 'virtual' ) ||
            ( that.sorting.enabled && that.sorting.mode === 'many' ) ||
            log === true
        ) {
            super.checkLicense();
        }
    }

    _createFilterPanels() {
        const that = this;

        if ( !that._filterPanels ) {
            that._filterPanels = [];
        }
        else if ( that._filterPanels.length > 0 ) {
            return;
        }

        if ( that.filtering.enabled && that._filterPanels.length === 0 ) {
            requestAnimationFrame( () => {
                const stringPanel = document.createElement( 'lw-filter-panel' );
                const boolPanel = document.createElement( 'lw-filter-panel' );
                const numericPanel = document.createElement( 'lw-filter-panel' );
                const datePanel = document.createElement( 'lw-filter-panel' );

                boolPanel.filterType = 'boolean';
                numericPanel.filterType = 'numeric';
                datePanel.filterType = 'date';

                that._filterPanels[ 'bool' ] = boolPanel;
                that._filterPanels[ 'date' ] = datePanel;
                that._filterPanels[ 'numeric' ] = numericPanel;

                that._filterPanels[ 'string' ] = stringPanel;

                for ( let filterType in that._filterPanels ) {
                    const filterPanel = that._filterPanels[ filterType ];

                    filterPanel.rightToLeft = that.rightToLeft;
                    filterPanel.classList.add( 'lw-hidden' );
                    that.$.content.appendChild( filterPanel );
                    filterPanel.parentNode.removeChild( filterPanel );
                }
            } );
        }
    }

    _applyScrolling() {
        const that = this;
        const vScrollBar = that._scrollView.vScrollBar;

        requestAnimationFrame( () => {
            vScrollBar.largeStep = that.$.scrollView.offsetHeight;

            switch ( that.scrolling ) {
                case 'physical':
                case 'infinite':
                case 'virtual':
                    vScrollBar.step = 10;
                    vScrollBar.mechanicalAction = 'switchWhileDragging';
                    break;
                case 'deferred':
                    vScrollBar.step = 10;
                    vScrollBar.mechanicalAction = 'switchWhenReleased';
                    break;
                case 'logical':
                    vScrollBar.step = that.layout.rowMinHeight;
                    vScrollBar.mechanicalAction = 'switchWhileDragging';
                    break;
            }
        } );
    }

    get _autoRowHeight() {
        const that = this;

        if ( that.__autoRowHeight ) {
            return that.__autoRowHeight;
        }

        let measuredHeight = that.layout.rowMinHeight;

        if ( !that.dataSource || ( that.dataSource && that.dataSource.length === 0 ) ) {
            return measuredHeight;
        }

        const row = new LW.Grid.Row( {index: 0, grid: that} );
        const measureRowElement = row.createElement();


        that.$.scrollView.appendChild( measureRowElement );

        that.removeAttribute( 'grouped' );
        that.removeAttribute( 'tree' );

        if ( that.grouping.enabled && that.dataSource.groupBy && that.dataSource.groupBy.length > 0 && that.grouping.renderMode === 'advanced' ) {
            that.setAttribute( 'grouped', '' );
        }
        else if ( that.dataSource.boundHierarchy ) {
            that.setAttribute( 'tree', '' );
        }

        const data = {
        };

        for ( let i = 0; i < that.dataSource.dataFields.length; i++ ) {
            const dataField = that.dataSource.dataFields[ i ];

            data[ dataField.name ] = 'ABCDEFHIJLMNOPQRSTUVWXYZ1234567910|';
        }

        row.data = data;
        row._isMeasureRow = true;
        row.render();
        measureRowElement.style.height = '';
        measureRowElement.style.lineHeight = '';

        measuredHeight = Math.max( measureRowElement.offsetHeight, measuredHeight );

        for ( let i = 0; i < measureRowElement.children.length; i++ ) {
            measureRowElement.children[ i ].style.height = '';
        }

        for ( let i = 0; i < measureRowElement.children[ 1 ].children.length; i++ ) {
            measureRowElement.children[ 1 ].children[ i ].style.height = 'auto';

            const cell = row.getCell( that.columns[ 0 ].dataField );

            cell.render();

            measuredHeight = Math.max( measuredHeight, 8 + measureRowElement.children[ 1 ].children[ i ].offsetHeight );
            break;
        }

        that.$.scrollView.removeChild( measureRowElement );

        that.__autoRowHeight = measuredHeight;

        return measuredHeight;
    }


    get _scrollHeight() {
        const that = this;

        let rows = that._recyclingRows;

        let scrollHeight = 0;
        let measuredHeight = that._autoRowHeight;
        let nearHeight = 0;
        let farHeight = 0;

        if ( that.__scrollHeight ) {
            return that.__scrollHeight;
        }

        if ( rows.length === 0 || that.columns.length === 0 ) {
            return 0;
        }

        that.rows.canNotify = false;


        const length = rows.length;

        for ( let i = 0; i < length; i++ ) {
            let row = rows[ i ];

            if ( !row.visible || row.filtered === false ) {
                row.height = 0;
                row.cellHeight = 0;
                row.top = scrollHeight;
                continue;
            }

            let recalculateRowHeight = !row.height || !row.cellHeight || row.showDetail || row.height === 'auto' || row._height === 'auto' || that.layout.rowHeight === 'auto' || that.layout.isDirty;

            if ( recalculateRowHeight && !row.expandHeight ) {
                if ( !row.detailHeight ) {
                    row.detailHeight = 200;
                }

                if ( !that.layout.rowHeight ) {

                    if ( row.height === 'auto' || row._height === 'auto' ) {
                        row.element = that._rowElements[ 0 ];

                        if ( row.element && row.element.classList.contains( 'lw-hidden' ) ) {
                            row.element.classList.remove( 'lw-hidden' )
                        }

                        const measuredAutoHeight = row.data && that.isRendered ? row._autoSize( row ) : measuredHeight;

                        row.height = measuredAutoHeight;
                        row._height = 'auto';
                    }
                    else {
                        row.height = measuredHeight;
                    }


                    if ( row.label !== undefined && !row.summaryRow && that.grouping.renderMode === 'advanced' ) {
                        row.height = that.grouping.groupRowHeight;
                    }

                    if ( row.computedHeight ) {
                        row.height = row.computedHeight;
                    }

                    row.cellHeight = row.height;


                    if ( that.rowDetail.enabled && row.showDetail && !that.rowDetail.dialog.enabled ) {
                        row.height += row.detailHeight;
                    }
                }
                else if ( that.layout.rowHeight ) {
                    if ( typeof that.layout.rowHeight === 'number' ) {
                        if ( that.layout.rowHeight < that.layout.rowMinHeight ) {
                            that.layout.rowHeight = that.layout.rowMinHeight;
                        }

                        row.height = that.layout.rowHeight;

                        if ( row.computedHeight ) {
                            row.height = row.computedHeight;
                        }

                        if ( row.label !== undefined && that.grouping.renderMode === 'advanced' ) {
                            row.height = that.grouping.groupRowHeight;
                        }

                        row.cellHeight = row.height;

                        if ( that.rowDetail.enabled && row.showDetail && !that.rowDetail.dialog.enabled ) {
                            row.height += row.detailHeight;
                        }
                    }
                    else if ( that.layout.rowHeight === 'auto' ) {
                        if ( that.layout.rowHeight < that.layout.rowMinHeight ) {
                            that.layout.rowHeight = that.layout.rowMinHeight;
                        }

                        row.element = that._rowElements[ 0 ];

                        if ( row.element && row.element.classList.contains( 'lw-hidden' ) ) {
                            row.element.classList.remove( 'lw-hidden' )
                        }

                        const measuredAutoHeight = row.data && that.isRendered ? row._autoSize( row ) : measuredHeight;

                        row.height = measuredAutoHeight;

                        if ( row.computedHeight ) {
                            row.height = row.computedHeight;
                        }

                        if ( row.label !== undefined && that.grouping.renderMode === 'advanced' ) {
                            row.height = that.grouping.groupRowHeight;
                        }

                        row.cellHeight = row.height;

                        if ( that.rowDetail.enabled && row.showDetail && !that.rowDetail.dialog.enabled ) {
                            row.height += row.detailHeight;
                        }
                    }
                    else {
                        that.layout.rowHeight( i, row );
                        if ( !row.height ) {
                            row.height = measuredHeight;

                        }

                        row.cellHeight = row.height;

                        if ( that.rowDetail.enabled && row.showDetail && !that.rowDetail.dialog.enabled ) {
                            row.height += row.detailHeight;
                        }
                    }
                }

                if ( that._rowGap && i < that.rows.length - 1 ) {
                    row.height += that._rowGap;
                }
            }

            if ( row.freeze === true || row.freeze === 'near' ) {
                nearHeight += row.height;
            }
            else if ( row.freeze === 'far' ) {
                farHeight += row.height;
            }

            if ( row.freeze ) {
                row.top = scrollHeight;
                continue;
            }

            if ( row.top !== scrollHeight ) {
                row.top = scrollHeight;
            }

            if ( row.expandHeight ) {
                scrollHeight += row.cellHeight;
            }
            else {
                scrollHeight += row.height;
            }
        }

        if ( that._summaryRowCount && that.summaryRow.visible ) {
            scrollHeight += ( that._summaryRowCount * measuredHeight );
        }

        if ( that.filtering && that.filtering.filterRow.visible ) {
            nearHeight += measuredHeight;
        }

        that.__scrollHeight = scrollHeight;
        that.__frozenNearHeight = nearHeight;
        that.__frozenFarHeight = farHeight;

        that._scrollView.scrollHeight = scrollHeight - that.$.scrollView.offsetHeight + nearHeight + farHeight;

        scrollHeight = that.__scrollHeight + nearHeight + farHeight - 1;

        if ( that.grouping.enabled && that.dataSource.groupBy.length > 0 && that.grouping.groupIndent > 0 && that.grouping.renderMode === 'advanced' ) {
            scrollHeight += parseInt( that.grouping.groupIndent / 2 );
        }

        that.__scrollHeight = scrollHeight;


        that.rows.canNotify = true;

        return scrollHeight;
    }

    _measureColumnHeight() {
        const that = this;

        if ( that.__measuredColumnHeight ) {
            return that.__measuredColumnHeight;
        }

        const header = document.createElement( 'lw-grid-column' );
        header.style.height = 'auto';
        header.style.position = 'static';

        const columnHeaderCellContentElement = document.createElement( 'div' );

        columnHeaderCellContentElement.classList.add( 'lw-label' );
        columnHeaderCellContentElement.innerHTML = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRwWxXyYzZ1234567890';

        header.appendChild( columnHeaderCellContentElement );
        that.$.columnHeader.appendChild( header );

        let height = that.$.columnHeader.offsetHeight;

        that.$.columnHeader.removeChild( header );

        if ( that._columnHeights && that._columnHeights.length > 1 ) {
            height = that._columnHeights[ 0 ];
        }

        if ( height < that.columnMinHeight ) {
            height = that.columnMinHeight;
        }

        that.__measuredColumnHeight = height;

        return height;
    }

    _initializeColumnGroupsHierarchy() {
        const that = this;
        let totalMaxLevel = 0;

        that.$.columnContainer.innerHTML = '';

        if ( that.columnGroups.length > 0 ) {
            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                that.columnGroups[ i ].parent = null;
                that.columnGroups[ i ].groups = null;
            }

            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                that.viewColumns[ i ].parent = null;
                that.viewColumns[ i ].groups = null;
            }

            const getParentGroup = function ( name ) {
                for ( let i = 0; i < that.columnGroups.length; i++ ) {
                    let group = that.columnGroups[ i ];
                    if ( group.name === name )
                        return group;
                }
                return null;
            }

            const getColumns = function ( group ) {
                let columns = new Array();
                if ( group.columnGroup ) {
                    columns.push( group );
                }
                if ( group.groups ) {
                    for ( let i = 0; i < group.groups.length; i++ ) {
                        if ( group.groups[ i ].columnGroup ) {
                            columns.push( group.groups[ i ] );
                        }
                        else {
                            if ( group.groups[ i ].groups ) {
                                let tmpcolumns = getColumns( group.groups[ i ] );
                                for ( let j = 0; j < tmpcolumns.length; j++ ) {
                                    columns.push( tmpcolumns[ j ] );
                                }
                            }
                        }
                    }
                }
                return columns;
            }

            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                let group = that.columnGroups[ i ];
                if ( !group.groups ) {
                    group.groups = null;
                }
                if ( group.parentGroup ) {
                    let parentGroup = getParentGroup( group.parentGroup );
                    if ( parentGroup ) {
                        group.parent = parentGroup;
                        if ( !parentGroup.groups ) {
                            parentGroup.groups = new Array();
                        }
                        if ( parentGroup.groups.indexOf( group ) === -1 ) {
                            parentGroup.groups.push( group );
                        }
                    }
                }
            }
            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                let group = that.viewColumns[ i ];

                if ( group.columnGroup ) {
                    let parentGroup = getParentGroup( group.columnGroup );

                    if ( parentGroup ) {
                        if ( !parentGroup.groups ) {
                            parentGroup.groups = new Array();
                        }

                        group.parent = parentGroup;

                        if ( parentGroup.groups.indexOf( group ) === -1 ) {
                            parentGroup.groups.push( group );
                        }
                    }
                }
            }
            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                const group = that.viewColumns[ i ];
                let initialgroup = group;

                group.level = 0;
                while ( initialgroup.parent ) {
                    initialgroup = initialgroup.parent;
                    group.level++;
                }

                initialgroup = group;
                let maxlevel = group.level;
                totalMaxLevel = Math.max( totalMaxLevel, group.level );

                while ( initialgroup.parent ) {
                    initialgroup = initialgroup.parent;
                    if ( initialgroup ) {
                        initialgroup.level = --maxlevel;
                    }
                }
            }

            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                const group = that.columnGroups[ i ];
                const columns = getColumns( group );

                group.columns = columns;

                let indexes = new Array();
                let frozen = 0;
                let freezePosition = 'near';

                if ( columns.length === 0 ) {
                    frozen = -1;
                    group.visible = false;
                }

                for ( let j = 0; j < columns.length; j++ ) {
                    indexes.push( that.viewColumns.indexOf( columns[ j ] ) );
                    if ( columns[ j ].freeze ) {
                        if ( columns[ j ].freeze === 'far' ) {
                            freezePosition = 'far';
                        }
                        frozen++;
                    }
                }

                if ( frozen === columns.length ) {
                    group.freeze = freezePosition;
                }
                else if ( frozen > 0 && frozen < columns.length ) {
                    that.error( that.localize( 'frozenColumns', {elementType: 'Grid'} ) );
                }

                indexes.sort( function ( value1, value2 ) {
                    value1 = parseInt( value1 );
                    value2 = parseInt( value2 );

                    if ( value1 < value2 ) {
                        return -1;
                    }

                    if ( value1 > value2 ) {
                        return 1;
                    }
                    return 0;
                } );

                for ( let index = 1; index < indexes.length; index++ ) {
                    if ( indexes[ index ] !== indexes[ index - 1 ] + 1 ) {
                        that.error( that.localize( 'columnGroups', {elementType: 'Grid'} ) );
                    }
                }
            }
        }

        that._columnGroupsLevel = 1 + totalMaxLevel;
    }

    _refreshColumnHeights() {
        const that = this;

        that.$.columnHeader.style.height = '';
        that._viewColumnsHeight = that._measureColumnHeight();
        that._columnHeights = [];
        let height = 0;

        for ( let i = 0; i < that._columnGroupsLevel; i++ ) {
            let currentHeight = that._viewColumnsHeight;

            if ( that.columnHeight ) {
                if ( typeof that.columnHeight === 'number' ) {
                    currentHeight = that.columnHeight ? that.columnHeight : that._viewColumnsHeight;
                }
                else {
                    currentHeight = that.columnHeight ? that.columnHeight( i ) : that._viewColumnsHeight;
                }
            }

            if ( currentHeight < that.columnMinHeight ) {
                currentHeight = that.columnMinHeight;
            }

            if ( !currentHeight ) {
                height += that._viewColumnsHeight;
                that._columnHeights.push( that._viewColumnsHeight );
            }
            else {
                that._columnHeights.push( currentHeight );
                height += currentHeight;
            }
        }

        that._columnHeaderHeight = that._columnGroupsLevel * that._viewColumnsHeight;
        that._columnHeaderHeight = height;
        that.$.columnHeader.style.height = that._columnHeaderHeight + 'px';

        const getColumnTop = function ( column ) {
            let top = 0;

            for ( let i = 0; i < column.level; i++ ) {
                top += that._columnHeights[ i ];
            }

            return top;
        }

        const getColumnHeight = function ( column ) {
            let top = getColumnTop( column );
            let totalHeight = that._columnHeaderHeight - top;

            for ( let i = column.level + 1; i < that._columnHeights.length; i++ ) {
                const level = i;

                for ( let j = 0; j < that.viewColumns.length; j++ ) {
                    const currentColumn = that.viewColumns[ j ];
                    let breakLoop = false;

                    if ( currentColumn.level === level ) {
                        let col = currentColumn;

                        while ( col.parent ) {
                            if ( col.parent === column ) {
                                totalHeight = that._columnHeights[ level ];
                                breakLoop = true;
                                break;
                            }
                            col = col.parent;
                        }

                        if ( breakLoop ) {
                            break;
                        }
                    }
                }
            }

            return totalHeight;
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            const height = getColumnHeight( column );

            column.computedHeight = height;
            column.top = getColumnTop( column );
        }

        for ( let j = 0; j < that._columnGroupsLevel - 1; j++ ) {
            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                const group = that.columnGroups[ i ];
                const level = group.level;

                if ( level !== j ) {
                    continue;
                }

                if ( group.groups ) {
                    const height = getColumnHeight( group );
                    const top = getColumnTop( group );

                    group.top = top;
                    group.computedHeight = height;
                }

                const header = group.element;

                if ( !header ) {
                    continue;
                }

                header.style.width = group.computedWidth + 'px';
                if ( !that.rightToLeft ) {
                    header.style.left = group.left + 'px';
                }
                else {
                    header.style.right = group.left + 'px';
                }
                header.style.top = group.top + 'px';
                header.style.height = group.computedHeight + 'px';
                header.style.lineHeight = group.computedHeight + 'px';

            }
        }
    }

    _refreshColumnWidths() {
        const that = this;

        that.__clientSize = null;

        const vScrollWidth = ( that.$.verticalScrollBar.offsetWidth > 0 ? that.$.verticalScrollBar.offsetWidth : 0 );
        const groupByDataSource = that.dataSource.groupBy || [];

        let indent = that.grouping.enabled && that.grouping.renderMode === 'advanced' ? that.grouping.groupIndent * ( 1 + groupByDataSource.length ) : 0;
        let checkBoxesIndent = 0;

        if ( that.selection.checkBoxes.enabled ) {
            checkBoxesIndent = that._selectionColumn.computedWidth ? that._selectionColumn.computedWidth : that._selectionColumn.minWidth;
        }

        const gridWidth = that._clientSize.width - vScrollWidth - indent;

        // 375 is default for iPhone 6, 7, & 8, X. Switches to 1 column layout instead of 2 columns layout when this point is reached.
        //const phoneMinWidth = 375;
        //const columnAdaptive = gridWidth <= phoneMinWidth;

        let columnsComputedWidth = 0;
        let columnsWithAutoWidth = [];
        let nearWidth = 0;
        let farWidth = 0;
        let columnsWidth = 0;


        if ( that.editing.enabled && !that.editing.commandColumn.inline ) {
            const measureColumnWidth = function () {
                const header = document.createElement( 'div' );
                const columnHeaderCellContentElement = document.createElement( 'div' );
                const dataSource = that.editing.commandColumn.dataSource;

                let width = 0;
                let commandsHTML = '';
                let visibleColumnsLength = 0;

                columnHeaderCellContentElement.classList.add( 'lw-label' );

                for ( let item in dataSource ) {
                    const properties = dataSource[ item ];

                    let checkedVisibility = false;

                    if ( item === 'commandColumnMenu' ) {
                        continue;
                    }

                    let visible = false;

                    if ( !checkedVisibility ) {
                        if ( properties.visible === true ) {
                            visibleColumnsLength++;
                            visible = true;
                        }
                        else if ( properties.visible === 'auto' ) {
                            if ( ( ( !that.editing.editRow && !that.editing.editCell ) || that.editing.dialog.enabled ) && item === 'commandColumnEdit' ) {
                                visibleColumnsLength++;
                                visible = true;
                            }
                            else if ( ( that.editing.editRow || that.editing.editCell ) && !that.editing.dialog.enabled ) {
                                if ( item === 'commandColumnUpdate' ) {
                                    visibleColumnsLength++;
                                    visible = true;
                                }
                                else if ( item === 'commandColumnCancel' ) {
                                    visibleColumnsLength++;
                                    visible = true;
                                }
                            }
                        }

                        checkedVisibility = true;
                    }

                    if ( visible && that.editing.commandColumn.displayMode !== 'icon' ) {
                        const label = properties.label === '{{messages}}' ? that.localize( item ) : properties.label;

                        commandsHTML += '<span>' + label + '</span>';
                    }
                }

                columnHeaderCellContentElement.innerHTML = '<span>' + commandsHTML + '</span>';
                header.appendChild( columnHeaderCellContentElement );
                header.style.width = 'auto';
                header.style.position = 'static';
                that.$.columnHeader.appendChild( header );
                width = 10 + columnHeaderCellContentElement.firstChild.offsetWidth;
                that.$.columnHeader.removeChild( header );

                if ( that.editing.commandColumn.displayMode === 'icon' ) {
                    width = 20 + ( visibleColumnsLength * 20 );
                }
                else if ( that.editing.commandColumn.displayMode === 'labelAndIcon' ) {
                    width += ( visibleColumnsLength * 25 )
                }
                else {
                    width += visibleColumnsLength * 10;
                }

                return width;
            }

            that._commandColumn.visible = that.editing.commandColumn.visible;

            if ( that.editing.commandColumn.visible ) {
                const width = that.editing.commandColumn.width ? that.editing.commandColumn.width : measureColumnWidth();

                that.columns.canNotify = false;
                that._commandColumn.width = width;
                that.columns.canNotify = true;
            }
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const viewColumn = that.viewColumns[ i ];
            const column = viewColumn;
            //     const columnByDataField = that.columnByDataField[viewColumn.dataField];
            //     const column = columnByDataField ? columnByDataField : viewColumn;

            let width;

            if ( typeof column.width === 'number' ) {
                width = column.width;
            }
            else if ( column.width && column.width.toString().indexOf( '%' ) >= 0 ) {
                width = parseFloat( column.width ) / 100;
                width *= ( gridWidth - checkBoxesIndent );
            }
            else if ( column.width && ( column.width.toString().indexOf( 'em' ) >= 0 ||
                column.width.toString().indexOf( 'pt' ) >= 0 ||
                column.width.toString().indexOf( 'fr' ) >= 0 ) ) {
                width = parseFloat( column.width );
                width *= 16;
            }
            else if ( column.width === 'auto' ) {
                width = column._autoSize();
            }
            else if ( column.visible ) {
                columnsWithAutoWidth.push( column );
                width = 0;
            }

            if ( column.overflowWidth ) {
                width -= column.overflowWidth;
            }

            if ( column.visible ) {
                columnsComputedWidth += width;
            }

            if ( width < column.minWidth ) {
                width = column.minWidth;
            }

            column.computedWidth = width;
        }

        if ( columnsWithAutoWidth ) {
            let autoWidth = gridWidth - columnsComputedWidth;
            let computedAutoWidth = 0;

            if ( autoWidth < 0 ) {
                autoWidth = columnsWithAutoWidth.length * 60;
            }

            for ( let i = 0; i < columnsWithAutoWidth.length; i++ ) {
                const column = columnsWithAutoWidth[ i ];
                let width;

                width = autoWidth / columnsWithAutoWidth.length;

                if ( i === columnsWithAutoWidth.length - 1 ) {
                    width = autoWidth - computedAutoWidth;
                }

                if ( column.overflowWidth ) {
                    width -= column.overflowWidth;
                }

                if ( width < column.minWidth ) {
                    width = column.minWidth;
                }

                column.computedWidth = width;
                computedAutoWidth += width;
            }
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const viewColumn = that.viewColumns[ i ];
            let column = viewColumn; //viewColumn.autoGenerated ? viewColumn : that.columnByDataField[viewColumn.dataField];

            if ( !column.visible ) {
                continue;
            }

            if ( indent > 0 && !column.autoGenerated ) {
                column.computedWidth += indent;
                indent = 0;
            }

            if ( column.freeze ) {
                if ( column.freeze === true || column.freeze === 'near' ) {
                    column.left = nearWidth;
                    columnsWidth += column.computedWidth;
                    nearWidth += column.computedWidth;
                }
                else if ( column.freeze === 'far' ) {
                    column.left = farWidth;
                    farWidth += column.computedWidth;
                }
            }
            else {
                column.left = columnsWidth;
                columnsWidth += column.computedWidth;
            }
        }

        for ( let j = 0; j < that._columnGroupsLevel - 1; j++ ) {
            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                const group = that.columnGroups[ i ];
                const level = group.level;

                if ( level !== j ) {
                    continue;
                }

                let left = 99999;

                if ( group.groups ) {
                    const getWidth = function ( group ) {
                        let width = 0;
                        for ( let j = 0; j < group.groups.length; j++ ) {
                            let currentGroup = group.groups[ j ];
                            if ( !currentGroup.groups ) {
                                if ( !currentGroup.hidden ) {
                                    left = Math.min( currentGroup.left, left );
                                    width += currentGroup.computedWidth;
                                }
                            }
                            else {
                                width += getWidth( currentGroup );
                            }
                        }
                        return width;
                    }

                    group.computedWidth = getWidth( group );
                    group.left = left;
                }
            }
        }
    }


    _createColumnHeaderCellElements() {
        const that = this;
        const columnContainer = that.$.columnContainer;
        const fragment = document.createDocumentFragment();

        let columnsWidth = 0;
        that._columnElements = [];
        that.$.columnContainer.innerHTML = '';
        that.$.columnNearContainer.innerHTML = '';
        that.$.columnFarContainer.innerHTML = '';

        if ( that.rightToLeft ) {
            that.$.columnNearContainer.classList.remove( 'near' );
            that.$.columnNearContainer.classList.add( 'far' );

            that.$.columnFarContainer.classList.remove( 'far' );
            that.$.columnFarContainer.classList.add( 'near' );
        }
        else {
            that.$.columnNearContainer.classList.remove( 'far' );
            that.$.columnNearContainer.classList.add( 'near' );

            that.$.columnFarContainer.classList.remove( 'near' );
            that.$.columnFarContainer.classList.add( 'far' );

        }

        for ( let i = 0; i < that._frozenNearColumns.length; i++ ) {
            const column = that._frozenNearColumns[ i ];

            column.createElement();
        }

        for ( let i = 0; i < that._frozenFarColumns.length; i++ ) {
            const column = that._frozenFarColumns[ i ];

            column.createElement();
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            if ( column.freeze ) {
                continue;
            }

            const header = column.createElement();

            if ( column.computedWidth === undefined ) {
                that._columnElements.push( header );
                fragment.appendChild( header );
                continue;
            }

            columnsWidth += column.computedWidth;

            that._columnElements.push( header );

            if ( columnsWidth < 2 * that._clientSize.width ) {
                fragment.appendChild( header );
            }
        }

        for ( let i = 0; i < that.columnGroups.length; i++ ) {
            const group = that.columnGroups[ i ];
            const groupColumn = new LW.Grid.Column( {visible: group.visible !== undefined ? group.visible : true, allowSelect: false, grid: that, dataField: group.name, label: group.label, align: group.align, verticalAlign: group.verticalAlign} );

            group.column = groupColumn;

            const header = groupColumn.createElement();

            header.style.width = group.computedWidth + 'px';
            if ( !that.rightToLeft ) {
                header.style.left = group.left + 'px';
            }
            else {
                header.style.right = group.right + 'px';
            }
            header.style.top = group.top + 'px';
            header.style.height = group.computedHeight + 'px';
            header.style.lineHeight = group.computedHeight + 'px';

            fragment.appendChild( header );

            group.element = header;
            group.grid = this;
        }

        if ( !that.htmlColumnLastChild ) {
            that.htmlColumnLastChild = document.createElement( 'lw-grid-column' );
            that.htmlColumnLastChild.classList.add( 'top-far-corner' );
            that.htmlColumnLastChild.onpointerdown = ( event ) => {
                event.stopPropagation();
                event.preventDefault();
            }
            that.$.columnHeader.appendChild( that.htmlColumnLastChild );
        }

        columnContainer.appendChild( fragment );
        columnContainer.style.width = that._computedColumnsWidth + 'px';

        that._refreshFrozenColumns();
    }

    _refreshFrozenColumns() {
        const that = this;

        that.$.columnNearContainer.style.width = that._frozenColumnsNearWidth + 'px';
        that.$.columnFarContainer.style.width = that._frozenColumnsFarWidth + 'px';

        for ( let i = 0; i < that.columnGroups.length; i++ ) {
            const columnGroup = that.columnGroups[ i ];

            if ( columnGroup.freeze && columnGroup.element ) {
                if ( columnGroup.freeze === true || columnGroup.freeze === 'near' ) {
                    that.$.columnNearContainer.appendChild( columnGroup.element );
                }
                else if ( columnGroup.freeze === 'far' ) {
                    that.$.columnFarContainer.appendChild( columnGroup.element );
                }
            }
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            if ( column.freeze && column.element ) {
                if ( column.freeze === true || column.freeze === 'near' ) {
                    that.$.columnNearContainer.appendChild( column.element );
                }
                else if ( column.freeze === 'far' ) {
                    that.$.columnFarContainer.appendChild( column.element );
                }
            }
        }
    }

    get _clientSize() {
        const that = this;

        if ( that.__clientSize ) {
            return that.__clientSize;
        }

        const computedStyle = getComputedStyle( that.$.container );

        const paddingX = parseFloat( computedStyle.paddingLeft ) + parseFloat( computedStyle.paddingRight );
        const paddingY = parseFloat( computedStyle.paddingTop ) + parseFloat( computedStyle.paddingBottom );

        const borderX = parseFloat( computedStyle.borderLeftWidth ) + parseFloat( computedStyle.borderRightWidth );
        const borderY = parseFloat( computedStyle.borderTopWidth ) + parseFloat( computedStyle.borderBottomWidth );

        that.__clientSize = {
            width: that.$.container.offsetWidth - paddingX - borderX, height: that.$.container.offsetHeight - paddingY - borderY
        };

        return that.__clientSize;
    }

    _initializeRowElements() {
        const that = this;

        if ( !that.rows ) {
            return;
        }

        that.rows.canNotify = false;

        let rowsHeight = 0;
        let height = that._clientSize.height;

        that.$.rowNearContainer.innerHTML = '';
        that.$.rowFarContainer.innerHTML = '';
        that.$.rowContainer.innerHTML = '';
        that._rowElements = [];
        that._overflowOffset = Math.max( height, 300 );

        if ( that.rightToLeft ) {
            that.$.rowNearContainer.classList.remove( 'near' );
            that.$.rowNearContainer.classList.add( 'far' );

            that.$.rowFarContainer.classList.remove( 'far' );
            that.$.rowFarContainer.classList.add( 'near' );
        }
        else {
            that.$.rowFarContainer.classList.remove( 'near' );
            that.$.rowFarContainer.classList.add( 'far' );

            that.$.rowNearContainer.classList.remove( 'far' );
            that.$.rowNearContainer.classList.add( 'near' );
        }
        const offsetHeight = that.offsetHeight;
        that.$.container.classList.add( 'lw-hidden' );

        const newOffsetHeight = that.offsetHeight;
        that.$.container.classList.remove( 'lw-hidden' );

        if ( that.verticalScrollBarVisibility === 'hidden' || ( offsetHeight !== newOffsetHeight ) ) {
            height = that._scrollHeight;
        }

        const createRecyclingRows = function () {
            const documentFragment = document.createDocumentFragment();

            if ( ( that.rows && that.rows.length === 0 ) ) {
                return;
            }

            for ( let i = 0; i < that.rows.length; i++ ) {
                const row = that.rows[ i ];

                if ( row.freeze ) {
                    continue;
                }

                const rowElement = row.createElement();

                documentFragment.appendChild( rowElement );
                rowsHeight += that.layout.rowMinHeight;

                if ( rowsHeight > that._overflowOffset + height ) {
                    break;
                }
            }

            that.$.rowContainer.appendChild( documentFragment );

            const rowElements = that.$.rowContainer.children;

            for ( let i = 0; i < rowElements.length; i++ ) {
                const rowElement = rowElements[ i ];

                if ( that.rows[ i ] ) {
                    that.rows[ i ].element = rowElement;
                }

                that._rowElements[ i ] = rowElement;
            }
        }

        for ( let i = 0; i < that._frozenNearRows.length; i++ ) {
            const row = that._frozenNearRows[ i ];

            row.grid = that;

            const element = row.createElement();

            row.element = element;
            that.$.rowNearContainer.appendChild( element );
        }

        for ( let i = 0; i < that._frozenFarRows.length; i++ ) {
            const row = that._frozenFarRows[ i ];

            row.grid = that;

            const element = row.createElement();

            row.element = element;
            that.$.rowFarContainer.appendChild( element );
        }

        createRecyclingRows();

        let maxIterations = 0;

        while ( rowsHeight < 1.5 * height && ++maxIterations < 50 ) {
            createRecyclingRows();
        }

        that.rows.canNotify = true;
    }

    _initializeRows() {
        const that = this;

        let frozenIndex = 0;
        that._frozenNearDefaultRows = [];
        that._frozenFarDefaultRows = [];
        that.rows = [];
        that.rowById = [];

        that._frozenFarRows = [];
        that._frozenNearRows = [];

        const calculateSummary = function () {
            let summaryObject = [];
            let hasSummary = false;

            for ( let i = 0; i < that.columns.length; i++ ) {
                const column = that.columns[ i ];
                let columnSummary = {
                };

                if ( column.summary && column.summary.length > 0 ) {
                    hasSummary = true;
                }

                columnSummary[ column.dataField ] = column.summary;
                summaryObject.push( columnSummary );

            }

            if ( !hasSummary ) {
                that._summaryItems = [];
                return;
            }

            that._summaryItems = that.dataSource.summarize( summaryObject );
        }

        const addNewRow = function ( data, index ) {
            const row = data.grid ? data : new LW.Grid.Row( {data: data, index: index, grid: that} );

            if ( that.onRowInit ) {
                that.onRowInit( index, row );
                for ( let propertyName in row ) {
                    if ( row.properties.indexOf( propertyName ) === -1 && !propertyName.startsWith( '_' ) ) {
                        that.error( that.localize( 'invalidRowProperty', {elementType: 'Grid', propertyName: propertyName} ) );
                    }
                }
            }

            if ( row.selected ) {
                that._selection.rows[ row.id ] = true;
            }

            if ( row.freeze ) {
                if ( row.freeze === true || row.freeze === 'near' ) {
                    that.rows.splice( frozenIndex++, 0, row );

                    const frozenRow = that.rows[ frozenIndex - 1 ];

                    if ( that._frozenNearRows.indexOf( frozenRow ) === -1 ) {
                        that._frozenNearRows.push( frozenRow );
                    }
                }
                else if ( row.freeze === 'far' ) {
                    that.rows.push( row );

                    const frozenRow = that.rows[ that.rows.length - 1 ];

                    if ( that._frozenFarRows.indexOf( frozenRow ) === -1 ) {
                        that._frozenFarRows.push( frozenRow );
                    }
                }
            }
            else {
                if ( that.rows[ index ] ) {
                    that.rows.splice( index, 0, row );
                }
                else {
                    that.rows.push( row );
                }
            }

            if ( that.scrolling === 'virtual' || ( that.paging.enabled && that.dataSource && that.dataSource.virtualDataSource ) ) {
                return;
            }

            if ( that.onRowInserted ) {
                that.onRowInserted( index, row );
            }
        }

        const removeLastRow = function () {
            const lastRow = that.rows[ that.rows.length - 1 ];

            that.rows.pop();

            if ( that.onRowRemoved ) {
                that.onRowRemoved( that.rows.length, lastRow );
            }
        }

        const removeAt = function ( index ) {
            const row = that.rows[ index ];

            that.rows.splice( index, 1 );

            if ( that.onRowRemoved ) {
                that.onRowRemoved( index, row );
            }
        }

        that._add = addNewRow;
        that._removeLastRow = removeLastRow;
        that._removeAt = removeAt;

        that._rowHeight = that._autoRowHeight;

        const dataSourceLength = that.dataSource.length;

        that.setAttribute( 'aria-rowcount', dataSourceLength );

        for ( let i = 0; i < that.dataSource.length; i++ ) {
            const data = that.dataSource[ i ];

            addNewRow( data, i );
        }

        for ( let i = 0; i < that._frozenFarRows.length; i++ ) {
            const row = that._frozenFarRows[ i ];

            that.rows.splice( that.rows.indexOf( row ), 1 );
            that.rows.push( row );
        }

        calculateSummary();

        that.dataSource.notify( function ( changes ) {
            if ( that.dataSource._updating ) {
                return;
            }

            const data = changes.data;

            that.rows.canNotify = false;

            switch ( changes.action ) {
                case 'add':
                    if ( data.length ) {
                        for ( let i = 0; i < data.length; i++ ) {
                            addNewRow( data[ i ], that.dataSource.length - data.length + i );
                        }
                    }
                    else {
                        addNewRow( data, that.dataSource.length - 1 );
                    }

                    break;
                case 'update':
                    if ( data.length ) {
                        for ( let i = 0; i < data.length; i++ ) {
                            const index = changes.index[ i ];

                            if ( !that.rows[ index ] ) {
                                addNewRow( data[ i ], that.dataSource.length - 1 );
                                continue;
                            }

                            that.rows[ index ].data = data[ i ];

                            if ( that.onRowUpdated ) {
                                that.onRowUpdated( index, that.rows[ index ] );
                            }
                        }
                    }
                    else {
                        const index = changes.index;

                        if ( !that.rows[ index ] ) {
                            addNewRow( data, that.dataSource.length - 1 );
                        }
                        else {
                            that.rows[ index ].data = data;
                        }

                        if ( that.onRowUpdated ) {
                            that.onRowUpdated( index, that.rows[ index ] );
                        }
                    }
                    break;
                case 'insert':
                    addNewRow( data, changes.index );

                    for ( let i = 0; i < that.rows.length; i++ ) {
                        const row = that.rows[ i ];

                        row.index = i;
                    }
                    break;
                case 'remove':
                    removeAt( changes.index );
                    break;
                case 'removeLast':
                    removeLastRow();
                    break;
                case 'bindingComplete':
                    if ( ( that.dataSource && that.dataSource.url ) || ( that.dataSource && !that.dataSource.virtualDataSource ) ) {
                        that.appearance.displayLoadingIndicator = false;
                        that._setLoadingIndicatorVisibility();
                        that._toggledRow = null;

                        if ( that.dataSource.length !== dataSourceLength ) {
                            if ( that.paging.enabled ) {
                                const headerPager = that.$.headerPager.querySelector( 'lw-pager' );
                                const footerPager = that.$.footerPager.querySelector( 'lw-pager' );

                                if ( headerPager ) {
                                    headerPager.pagesCount = Math.ceil( that.dataSource.length / that.paging.pageSize );
                                }

                                if ( footerPager ) {
                                    footerPager.pagesCount = Math.ceil( that.dataSource.length / that.paging.pageSize );
                                }
                            }

                            that._initializeRows();
                            that._initializeRowElements();

                            that.refresh();
                        }

                        that._recycle();
                    }
                    break;
            }

            calculateSummary();

            if ( changes.action !== 'update' ) {
                that._refreshLayout();
            }

            that._recycle();

            that.rows.canNotify = true;
        } );


        that._observeRows();

        if ( that.summaryRow.visible ) {
            for ( let i = 0; i < that._summaryRowCount; i++ ) {
                const summaryNearRow = new LW.Grid.Row( {height: that.layout.rowMinHeight, freeze: 'near', visible: that.summaryRow.position === 'near', summaryRowIndex: i, summaryRow: true} );
                const summaryFarRow = new LW.Grid.Row( {height: that.layout.rowMinHeight, freeze: 'far', visible: that.summaryRow.position === 'far', summaryRowIndex: i, summaryRow: true} );

                that._frozenNearRows.splice( 0, 0, summaryNearRow );
                that._frozenFarRows.push( summaryFarRow );
            }
        }

        if ( that.filtering.enabled && that.filtering.filterRow.visible ) {
            const row = new LW.Grid.Row( {freeze: true, autoGenerated: true, filterRow: true} );

            that._frozenNearRows.splice( 0, 0, row );
        }

        that._renderAddNewRow();
    }

    _observeRows() {
        const that = this;

        const observables = {
            'allowToggle': true, 'allowResize': true, 'allowCheck': true, 'allowSelect': true, 'allowReorder': true, 'expanded': true, 'selected': true, 'checked': true, 'visible': true, 'enabled': true, 'minHeight': true, 'height': true, 'freeze': true, 'showDetail': true, 'data': true, 'visibleIndex': true, 'index': true
        }

        that._frozenNearRows = [];
        that._frozenFarRows = [];

        that.rows = new LW.ObservableArray( that.rows, null, observables );

        for ( let i = 0; i < that.rows.length; i++ ) {
            const row = that.rows[ i ];

            if ( row.freeze === true || row.freeze === 'near' ) {
                that._frozenNearRows.push( row );
            }
            else if ( row.freeze === 'far' ) {
                that._frozenFarRows.push( row );
            }

            that.rowById[ that.rows[ i ].id ] = row;
        }

        const rowPropertyChanged = function ( row, propertyName, oldValue, newValue ) {
            row.propertyChanged( propertyName, oldValue, newValue );
        }

        that.rows.notify( function ( changes ) {
            if ( !that.rows.canNotify ) {
                return;
            }

            const changeType = changes.action;

            if ( changeType === 'length' ) {
                return;
            }

            if ( changes.path ) {
                that.rows.canNotify = false;
                rowPropertyChanged( that.rows[ changes.index ], changes.propertyName, changes.oldValue, changes.newValue );
                that.rows.canNotify = true;
                return;
            }

            that.rows.canNotify = false;

            if ( !that.dataSource ) {
                return;
            }

            that.dataSource.canNotify = false;

            switch ( changeType ) {
                case 'add': {
                    const addRow = function ( index ) {
                        let row = that.rows[ index ];

                        if ( row instanceof LW.Grid.Row === false ) {
                            row = new LW.Grid.Row( row );

                            const notify = that.rows.canNotify;
                            that.rows.canNotify = false;
                            changes.object[ index ] = row;
                            row = changes.object[ index ];
                            that.rows.canNotify = notify;
                        }

                        if ( index < that.dataSource.length ) {
                            that.dataSource.insert( index, that.rows[ index ].data );

                        }
                        else {
                            that.dataSource.add( that.rows[ index ].data );
                        }

                        row.grid = that;
                        row.data = that.dataSource[ index ];

                        that.rowById[ row.id ] = row;


                        if ( row.selected ) {
                            that._selection.rows[ row.id ] = true;
                        }

                        if ( row.freeze ) {
                            if ( row.freeze === true || row.freeze === 'near' ) {
                                that._frozenNearRows.push( row );
                            }
                            else if ( row.freeze === 'far' ) {
                                that._frozenFarRows.push( row );
                            }
                        }
                    }

                    for ( let i = 0; i < changes.addedCount; i++ ) {
                        addRow( changes.index + i );
                    }

                    break;
                }
                case 'update': {
                    that.dataSource.update( changes.index, that.rows[ changes.index ] );
                    break;
                }
                case 'remove': {
                    const row = changes.removed;

                    delete that.rowById[ row.id ];

                    that.dataSource.removeAt( changes.index );
                    break;
                }
            }



            that.dataSource.canNotify = true;
            that.rows.canNotify = true;

            if ( !changeType ) {
                return;
            }

            const fullRefresh = that.isInitialized && that._rowElements && that._rowElements.length < that.rows.length;

            if ( fullRefresh ) {
                that._initializeRowElements();
            }

            that.refresh();
            that._refreshPagesCount();
        } );
    }

    render() {
        const that = this;

        const isHidden = () => {
            return that.offsetWidth === 0 || that.offsetHeight === 0;
        }


        if ( isHidden() ) {
            requestAnimationFrame( () => {
                if ( !that.isInitialized && !isHidden() ) {
                    that._render();
                }
            } );

            that.setAttribute( 'role', 'grid' );
            if ( !that.editing.enabled ) {
                that.setAttribute( 'aria-readonly', true );
            }
            super.render();
            return;
        }

        const context = that.context;
        that.context = that;
        that.setAttribute( 'role', 'grid' );

        if ( !that.editing.enabled ) {
            that.setAttribute( 'aria-readonly', true );
        }

        that._render();
        that.context = context;

        super.render();
    }

    _renderColumns( refresh ) {
        const that = this;

        that._initializeColumns();
        that._initializeColumnGroupsHierarchy();
        that._refreshColumnsResponsiveVisibility();
        that._createColumnHeaderCellElements();
        that._renderColumnGroupHeaders();

        if ( refresh !== false ) {
            that._refresh();
        }
    }

    _renderRows( refresh ) {
        const that = this;

        that._initializeRows();
        that._initializeRowElements();

        if ( refresh !== false ) {
            that._refresh();
        }
    }

    _render() {
        const that = this;

        if ( !that.isInitialized ) {
            if ( that.onBeforeInit ) {
                that.onBeforeInit();
            }

            that.$.fireEvent( 'beforeInit', {
                'grid': that
            } );
        }

        if ( that.dataSource === null ) {
            that.dataSource = new LW.DataAdapter();
        }
        else if ( Array.isArray( that.dataSource ) ) {
            that.dataSource = new LW.DataAdapter( {
                dataSource: that.dataSource
            } );
        }

        that._selection = {
            rows: [],
            columns: [],
            cells: []
        };

        if ( that.dataSource && that.dataSource.url ) {
            that.appearance.displayLoadingIndicator = true;
            that._setLoadingIndicatorVisibility();

            that.dataSource.data = {
                sorting: that.getSortedColumns(),
                filtering: that.getFilteredColumns(),
                grouping: []
            }
        }

        that._renderColumns( false );
        that._renderRows( false );
        that._renderPagers();
        that._renderCommandBar();

        if ( that.appearance.allowColumnStickyPosition ) {
            that._stickHeader();
        }

        if (that.header.visible && that.header.template === '') {
            that.$.header.innerHTML = '<lw-grid-toolbar header-position="top"></lw-grid-toolbar>'
            that.$.headerBar = that.$.header.firstElementChild;
            that.$.headerBar._init(that);
        }

        if ( !that.isInitialized ) {
            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                const column = that.viewColumns[ i ];

                if ( !column.allowSort || !column.sortOrder ) {
                    continue;
                }

                const sortAnimation = that.appearance.allowSortAnimation;

                that.appearance.allowSortAnimation = false;
                that.sortBy( column.dataField, column.sortOrder );
                that.appearance.allowSortAnimation = sortAnimation;
            }

            if ( that.filtering.filter.length > 0 ) {
                for ( let j = 0; j < that.filtering.filter.length; j++ ) {
                    const filter = that.filtering.filter[ j ];

                    if ( filter ) {
                        const dataField = filter[ 0 ];
                        const filterExpression = filter.splice( 1 );
                        let filterGroup = null;

                        if ( filterExpression instanceof LW.FilterGroup ) {
                            filterGroup = filterExpression;
                        }
                        else {
                            const column = that.columnByDataField[ dataField ];

                            if ( column ) {
                                filterGroup = that.dataSource._createFilter( column.dataType, filterExpression );
                            }
                        }

                        if ( filterGroup ) {
                            that.addFilter( dataField, filterGroup, false );
                        }
                    }
                }

                that.refreshFilters();
            }
        }
        else {
            that.refreshFilters();
        }

        that.viewColumns.canNotify = true;

        const isFirstRender = !that.isInitialized;

        if ( isFirstRender ) {
            if ( that.onInit ) {
                that.onInit();
            }

            that.$.fireEvent( 'init', {
                'grid': that
            } );
        }

        that.isInitialized = true;

        if ( that.scrolling === 'virtual' || ( that.paging.enabled && that.dataSource && that.dataSource.virtualDataSource ) ) {
            that._virtualDataRequest( 'dataBind' );
        }
        else if ( that.dataSource && that.dataSource.virtualDataSource ) {
            that._virtualDataRequest( 'dataBind' );
        }

        if ( that.header.template !== '' ) {
            that._applyTemplate( that.header.template, that.$.header );
        }

        if ( that.footer.template !== '' ) {
            that._applyTemplate( that.footer.template, that.$.footer );
        }

        that._createFilterPanels();
        that._refresh();
        that._applyScrolling();

        if ( that.grouping.enabled && that.grouping.autoExpandAll && that.rowHierarchy ) {
            that.expandAllRows();
        }

        if ( that.onRender ) {
            that.onRender();
        }

        that.isRendered = true;

        if ( that.layout.rowHeight === 'auto' ) {
            that._refreshLayout();
            that._recycle();
        }

        if ( isFirstRender ) {
            if ( that.onAfterInit ) {
                that.onAfterInit();
            }

            that.$.fireEvent( 'afterInit', {
                'grid': that
            } );

            that.isRendering = false;
            if ( that.whenRenderedCallbacks ) {
                for ( let i = 0; i < that.whenRenderedCallbacks.length; i++ ) {
                    that.whenRenderedCallbacks[ i ]();
                }

                that.whenRenderedCallbacks = [];
            }
        }
    }

    get _viewRows() {
        const that = this;

        if ( that.__viewRows ) {
            return that.__viewRows;
        }

        if ( !that._nearRowsAdded ) {
            that._nearRowsAdded = [];
            that._farRowsAdded = [];
        }

        const viewRows = !that.rowHierarchy ? that.rows.toArray() : that.rowHierarchy;

        const rows = [].concat( that._frozenNearDefaultRows, that._nearRowsAdded, viewRows, that._farRowsAdded, that._frozenFarDefaultRows );

        that.__viewRows = rows;

        return rows;
    }

    _stickHeader() {
        const that = this;

        that._stickyHeaderHandler = function () {
            that._handleStickyHeader();
        }

        that.$.columnHeader.style.top = '';
        that.$.columnHeader.classList.remove( 'lw-columns-sticky' );

        let parent = that.parentNode;

        if ( that.isInShadowDOM && parent === that.getRootNode() ) {
            parent = that.getRootNode().host;
        }

        while ( parent !== document && parent ) {
            parent.addEventListener( 'scroll', that._stickyHeaderHandler );

            parent = parent.parentNode;

            if ( that.isInShadowDOM && parent === that.getRootNode() ) {
                parent = that.getRootNode().host;
            }
        }

        try {
            if ( window.top !== null && window.top !== window.self ) {
                window.top.document.addEventListener( 'scroll', that._stickyHeaderHandler );
            }
        }
        catch ( error ) {
            //
        }

        that._handleStickyHeader();
    }

    _unstickHeader() {
        const that = this;

        that.$.columnHeader.style.top = '';
        that.$.columnHeader.classList.remove( 'lw-columns-sticky' );

        let parent = that.parentNode;

        while ( parent !== document.body ) {
            parent.removeEventListener( 'scroll', that._stickyHeaderHandler );

            parent = parent.parentNode;

            if ( that.isInShadowDOM && parent === that.getRootNode() ) {
                parent = that.getRootNode().host;
            }
        }

        try {
            if ( document.referrer !== '' || window.frameElement ) {
                if ( window.top !== null && window.top !== window.self ) {
                    window.top.document.removeEventListener( 'scroll', that._stickyHeaderHandler );
                }
            }
        }
        catch ( error ) {
            //
        }
    }
    _handleStickyHeader() {
        const that = this;

        if ( !that.appearance.allowColumnStickyPosition ) {
            return;
        }

        that.$.columnHeader.classList.add( 'lw-columns-sticky' );

        if ( document.scrollTop === 0 && that.parentElement.scrollTop === 0 ) {
            that.$.columnHeader.style.top = '';
        }
        else {
            let parent = that.parentNode;

            let top = 0;

            while ( parent !== document.body ) {
                top += parseInt( parent.scrollTop );

                parent = parent.parentNode;

                if ( that.isInShadowDOM && parent === that.getRootNode() ) {
                    parent = that.getRootNode().host;
                }
            }

            const headerTop = parseInt( that.clientTop + top );

            that.$.columnHeader.style.top = headerTop + 'px';

            let frameTop = 0;

            if ( window.top !== window.self ) {
                if ( parseInt( window.top.scrollY ) > parseInt( that._offsetTop( window.frameElement ) ) ) {
                    frameTop = parseInt( window.top.scrollY ) - parseInt( that._offsetTop( window.frameElement ) );
                }
            }

            if ( window.scrollY + frameTop > that.offsetTop ) {
                that.$.columnHeader.style.top = parseInt( window.scrollY ) - parseInt( that.offsetTop ) + headerTop + frameTop + 'px';
            }
        }
    }

    _scrollHandler() {
        const that = this;

        that._handleStickyHeader();
    }

    _initializeRowNumberColumn() {
        const that = this;

        if ( that._frozenNearColumns && that._frozenNearColumns.length > 0 && that._frozenNearColumns[ 0 ].rowHeaderColumn ) {
            that._frozenNearColumns[ 0 ].visible = that.appearance.showRowHeaderNumber || that.appearance.showRowHeader;
            return;
        }

        const column = new LW.Grid.Column( {dataField: '_rowHeaderColumn', label: '', allowSelect: false, freeze: true, visible: true, grid: that, autoGenerated: true, rowHeaderColumn: true, cellsAlign: 'center'} );
        const rowsLength = that.rows ? that.rows.length : that.dataSource ? that.dataSource.length : 0;
        let width = that.appearance.showRowHeaderNumber ? column._measureSize( rowsLength ) : 30;

        if ( that.appearance.autoGenerateColumnWidth ) {
            width = that.appearance.autoGenerateColumnWidth;
        }

        column.width = width;

        column.createElement();

        const observableColumn = new LW.Observable( column, column.observables );

        that.viewColumns.splice( 0, 0, observableColumn );
        that._frozenNearColumns.splice( 0, 0, observableColumn );

    }

    _initializeColumns() {
        const that = this;

        if ( typeof that.columns === 'number' ) {
            const boundColumns = [];

            const charCode = 'A'.charCodeAt( 0 );
            let prefix = '';
            let index = 0;

            for ( let i = 0; i < that.columns; i++ ) {
                let label = i + 1;
                const letter = String.fromCharCode( charCode + index );
                index++;

                const dataField = prefix + letter;

                if ( that.appearance.autoGenerateColumnLabelMode !== 'number' ) {
                    label = prefix + letter;
                }

                boundColumns.push( {align: 'center', label: label, dataField: dataField, width: 100} )

                if ( index >= 26 ) {
                    index = 0;
                    prefix += 'A';
                }
            }

            that._boundColumns = boundColumns;
        }
        else {
            that._boundColumns = Array.isArray( that.columns ) ? [ ...that.columns ] : [ ...that.columns.toArray() ];
        }

        that._initColumns = that.columns;
        that.columnByDataField = [];
        that.viewColumns = [];
        that.columns = new LW.ObservableArray();

        that._frozenFarColumns = [];
        that._frozenNearColumns = [];
        that._summaryRowCount = 0;
        let frozenIndex = 0;

        const _applyBoundColumnDataType = function ( column ) {
            if ( that.dataSource.dataFields ) {
                const field = that.dataSource.dataFields.find( field => {
                    if ( field.name === column.dataField ) {
                        return field;
                    }
                } );

                const dataType = field ? field.dataType || 'string' : 'string';

                column.dataType = dataType;
            }
        }

        if ( that._boundColumns.length === 0 && that.dataSource && that.dataSource[ 0 ] && that.dataSource.autoGenerateColumns !== false ) {
            const row = that.dataSource[ 0 ];

            if ( row.$ && row.$.isEmpty && that.dataSource.dataFields ) {
                for ( let i = 0; i < that.dataSource.dataFields.length; i++ ) {
                    const dataField = that.dataSource.dataFields[ i ];
                    const index = that._boundColumns.length;
                    const column = {
                        index: index, visibleIndex: index, label: dataField.name, dataField: dataField.name, dataType: dataField.dataType
                    };

                    that._boundColumns.push( column );
                }
            }
            else {
                for ( let dataField in row ) {
                    if ( dataField.startsWith( '_' ) || dataField === '$' ) {
                        continue;
                    }

                    const index = that._boundColumns.length;
                    const column = {
                        index: index, visibleIndex: index, label: dataField, dataField: dataField
                    };

                    _applyBoundColumnDataType( column );

                    that._boundColumns.push( column );
                }
            }
        }

        for ( let i = 0; i < that._boundColumns.length; i++ ) {
            let boundColumn = that._boundColumns[ i ];

            if ( typeof boundColumn === 'string' ) {
                if ( that.dataSource.dataFields ) {
                    const field = that.dataSource.dataFields.find( field => {
                        if ( field.name === boundColumn ) {
                            return field;
                        }
                    } );

                    boundColumn = {
                        label: boundColumn, dataField: boundColumn, dataType: field ? field.dataType || 'string' : 'string'
                    };
                }
            }
            else {
                _applyBoundColumnDataType( boundColumn );
            }

            boundColumn.visibleIndex = i;
            boundColumn.index = i;
            boundColumn.grid = that;

            const column = new LW.Grid.Column( boundColumn );

            if ( that.onColumnInit ) {
                that.onColumnInit( i, column );
            }

            for ( let propertyName in column ) {
                if ( column.properties.indexOf( propertyName ) === -1 && !propertyName.startsWith( '_' ) ) {
                    that.error( that.localize( 'invalidColumnProperty', {elementType: 'Grid', propertyName: propertyName, type: column.dataField || 'Column'} ) );
                }
            }
            column.grid = that;

            that.columns.push( column );

            const observableColumn = that.columns[ that.columns.length - 1 ];

            that._summaryRowCount = Math.max( that._summaryRowCount, column.summary.length );

            if ( column.freeze ) {
                if ( column.freeze === true || column.freeze === 'near' ) {
                    that.viewColumns.splice( frozenIndex++, 0, observableColumn );
                    that._frozenNearColumns.push( observableColumn );
                }
                else if ( column.freeze === 'far' ) {
                    that._frozenFarColumns.push( observableColumn );
                }
            }
            else {
                that.viewColumns.push( observableColumn );
            }

            if ( !that.columnByDataField[ column.dataField ] ) {
                that.columnByDataField[ column.dataField ] = observableColumn;
            }
            else {
                observableColumn.parent = that.columnByDataField[ column.dataField ];
                if ( !that.columnByDataField[ column.dataField ].children ) {
                    that.columnByDataField[ column.dataField ].children = [];
                }

                that.columnByDataField[ column.dataField ].children.push( observableColumn );
            }

            if ( that.onColumnInserted ) {
                that.onColumnInserted( i, column );
            }
        }

        that.viewColumns = that.viewColumns.concat( that._frozenFarColumns );

        that.setAttribute( 'aria-colcount', that._boundColumns.length );

        let autoGeneratedNearColumns = 0;

        if ( that.appearance.showRowHeaderNumber || that.appearance.showRowHeader ) {
            that._initializeRowNumberColumn();
            autoGeneratedNearColumns++;
        }

        if ( that.rowDetail.enabled ) {
            const column = new LW.Grid.Column( {dataField: '_rowDetailColumn', allowSelect: false, visible: that.rowDetail.visible, label: '', grid: that, freeze: true, rowDetailColumn: true, autoGenerated: true, cellsAlign: 'center', width: 30} );
            const observableColumn = new LW.Observable( column, column.observables );

            if ( that.rowDetail.position === 'near' ) {
                column.freeze = 'near';
                observableColumn.freeze = 'near';

                that.viewColumns.splice( autoGeneratedNearColumns, 0, observableColumn );
                that._frozenNearColumns.splice( autoGeneratedNearColumns, 0, observableColumn );
            }
            else {
                that.viewColumns.push( observableColumn );
                that._frozenFarColumns.splice( 0, 0, observableColumn );
            }

            autoGeneratedNearColumns++;
        }

        const column = new LW.Grid.Column( {dataField: '_adaptiveColumn', allowSelect: false, visible: false, label: '', grid: that, freeze: 'far', adaptiveColumn: true, autoGenerated: true, cellsAlign: 'center', width: 30} );
        const observableColumn = new LW.Observable( column, column.observables );

        observableColumn.canNotify = false;

        that.viewColumns.push( observableColumn );
        that._frozenFarColumns.splice( 0, 0, observableColumn );

        const commandColumn = new LW.Grid.Column( {dataField: '_commandColumn', allowSelect: false, visible: that.editing.enabled && that.editing.commandColumn.visible && !that.editing.commandColumn.inline, label: '', grid: that, freeze: 'far', commandColumn: true, autoGenerated: true, align: 'center', cellsAlign: 'center', width: ''} );
        const observableCommandColumn = new LW.Observable( commandColumn, commandColumn.observables );

        observableCommandColumn.canNotify = false;

        if ( that.editing.commandColumn.position === 'near' ) {
            commandColumn.freeze = 'near';
            observableCommandColumn.freeze = 'near';

            that.viewColumns.splice( autoGeneratedNearColumns, 0, observableCommandColumn );
            that._frozenNearColumns.splice( autoGeneratedNearColumns, 0, observableCommandColumn );
        }
        else {
            that.viewColumns.push( observableCommandColumn );
            that._frozenFarColumns.splice( 0, 0, observableCommandColumn );
        }

        that._commandColumn = observableCommandColumn;

        const selectionColumn = new LW.Grid.Column( {allowSelect: false, visible: that.selection.enabled && that.selection.checkBoxes.enabled, dataField: '_checkBoxColumn', label: '', freeze: that.selection.checkBoxes.position, grid: that, selectionColumn: true, autoGenerated: true, cellsAlign: 'center', width: 32} );
        const observableSelectionColumn = new LW.Observable( selectionColumn, selectionColumn.observables );

        if ( selectionColumn.freeze === 'near' ) {
            that.viewColumns.splice( autoGeneratedNearColumns, 0, observableSelectionColumn );
            that._frozenNearColumns.splice( autoGeneratedNearColumns, 0, observableSelectionColumn );
        }
        else {
            that.viewColumns.push( observableSelectionColumn );
            that._frozenFarColumns.splice( 0, 0, observableSelectionColumn );
        }

        that._selectionColumn = observableSelectionColumn;
        that._selectionColumn.canNotify = false;
        that._observeColumns();
        that._templateColumns();
    }

    get styleProperties() {
        return [
            'grid-template-columns',
            '--lw-grid-row-height',
            '--lw-grid-column-header-height',
            '--lw-grid-group-header-height',
            '--lw-grid-filter-footer-height',
            '--lw-grid-group-row-vertical',
            '--lw-grid-group-row-horizontal-offset',
            '--lw-grid-freeze-splitter-size',
            '--lw-grid-resize-line-size',
            '--lw-grid-footer-height',
            '--lw-grid-header-height'
        ];
    }

    _templateColumns() {
        const that = this;

        const computedStyle = getComputedStyle( that );
        const templateColumns = computedStyle.getPropertyValue( '--lw-grid-template-columns' ).trim();
        const columnGap = computedStyle.getPropertyValue( '--lw-grid-column-gap' ).trim();
        const rowGap = computedStyle.getPropertyValue( '--lw-grid-row-gap' ).trim();

        that._rowGap = parseInt( rowGap );
        that._columnGap = parseInt( columnGap );
        that._maxHeight = parseInt( computedStyle.maxHeight );
        that._minHeight = parseInt( computedStyle.minHeight );

        if ( templateColumns !== 'none' ) {

            let unboundColumnWidths = 0;

            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                if ( that.viewColumns[ i ].autoGenerated ) {
                    unboundColumnWidths += that.viewColumns[ i ].visible ? that.viewColumns[ i ].width : 0;
                }
            }

            let boundColumnWidths = [];
            const templateColumnsContainer = document.createElement( 'div' );

            templateColumnsContainer.style.display = 'grid';
            templateColumnsContainer.style.gridTemplateColumns = templateColumns;

            for ( let i = 0; i < that.columns.length; i++ ) {
                templateColumnsContainer.innerHTML += '<div></div>';
            }

            templateColumnsContainer.style.width = that.clientWidth - unboundColumnWidths + 'px';

            that.$.root.appendChild( templateColumnsContainer );

            const templateColumnsArray = templateColumns.split( ' ' );

            for ( let i = 0; i < that.columns.length; i++ ) {
                boundColumnWidths[ i ] = templateColumnsContainer.children[ i ].offsetWidth;

                if ( templateColumnsArray[ i ] === 'auto' ) {
                    boundColumnWidths[ i ] = null;
                }
            }

            templateColumnsContainer.parentNode.removeChild( templateColumnsContainer );


            let j = 0;

            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                const column = that.viewColumns[ i ];

                if ( column.autoGenerated ) {
                    continue;
                }

                if ( boundColumnWidths[ j ] ) {
                    column.width = column.templateWidth = boundColumnWidths[ j++ ];
                }
            }
        }
        else {
            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                const column = that.viewColumns[ i ];

                if ( column.autoGenerated ) {
                    continue;
                }

                if ( column.templateWidth ) {
                    column.width = column.templateWidth = null;
                }
            }
        }
    }

    onAttached() {
        const that = this;

        if ( !that._scrollView ) {
            that._scrollView = new LW.Utilities.Scroll( that, that.$.horizontalScrollBar, that.$.verticalScrollBar );
        }

        if ( that.isRendered && that.isCompleted ) {
            that._render();
        }
    }

    onDetached() {
        const that = this,
            dialogs = [ '_dialogChart', '_dialogAddRow', '_dialogEdit', '_dialogDelete', '_dialogRowDetail' ];

        if ( !that.isRendered ) {
            return;
        }

        dialogs.forEach( dialog => {
            if ( that[ dialog ] ) {
                that[ dialog ].close();
                that[ dialog ] = null;
            }
        } );

        if ( that.menu ) {
            that.menu.ownerElement = null;
            that.menu.remove();
            that.menu = null;
        }

        that._resetCachedLayout();

        const hScrollBar = that._scrollView.hScrollBar;
        const vScrollBar = that._scrollView.vScrollBar;

        vScrollBar.ownerElement = null;
        hScrollBar.ownerElement = null;

        vScrollBar.onChange = null;
        hScrollBar.onChange = null;

        if ( that._scrollView ) {
            that._scrollView.unlisten();
            delete that._scrollView;
        }

        if ( that._columnElements ) {
            for ( let i = 0; i < that._columnElements.length; i++ ) {
                const column = that._columnElements[ i ];

                column._detach();
            }
        }
        that._columnElements = null;

        if ( that._rowElements ) {
            for ( let i = 0; i < that._rowElements.length; i++ ) {
                const row = that._rowElements[ i ];

                row._detach();
            }
        }
        that._rowElements = null;
        that.rows = [];
        that.rowById = [];
        that._initColumns = [];
        that.columnByDataField = [];
        that.viewColumns = [];
        that._columnToResizeElement = null;

        let columnArray = Array.isArray( that.columns ) ? [ ...that.columns ] : [ ...that.columns.toArray() ]
        columnArray = columnArray.map( ( column ) => {
            if ( column.data ) {
                if ( column.data.visibleIndex !== undefined ) {
                    delete column.data.visibleIndex;
                }

                if ( column.data.index !== undefined ) {
                    delete column.data.index;
                }

                if ( column.data.grid !== undefined ) {
                    delete column.data.grid;
                }

                return column.data;
            }

            return column;
        } );

        that.rows.notifyFn = null;
        that.columns.notifyFn = null;
        that.columns.notify = null;
        that.columns._array = [];
        that.columns = columnArray;
        that._boundColumns = [];
        that._filterPanels = [];
        that._frozenFarColumns = [];
        that._frozenNearColumns = [];
        that._frozenNearDefaultRows = [];
        that._frozenFarDefaultRows = [];
        that._frozenFarRows = [];
        that._frozenNearRows = [];
        that._selection = {
            rows: [],
            columns: [],
            cells: []
        };
        that.__autoHeightRows = null;
        that._visibleRows = null;
        that.__viewRows = null;
        that.__clientSize = null;
        that.__scrollHeight = null;
        that.__scrollWidth = null;
        that.__parentCells = null;
        that._selectionColumn = null;
        that._adaptiveColumn = null;
        that._commandColumn = null;

        delete that._columnFarContainerComputedStyle;
        delete that._columnContainerComputedStyle;
        delete that._columnNearContainerComputedStyle;

        if ( that._inputOverlay ) {
            if ( that._inputOverlay.parentNode ) {
                that._inputOverlay.parentNode.removeChild( that._inputOverlay );
            }

            that._inputOverlay = null;
        }

        that._firstVisibleColumn = null;
        that._lastVisibleColumn = null;
        that._toggledRow = null;

        if ( LW( that._selector ) ) {
            delete LW( that._selector )._properties;
            delete LW( that._selector );
        }

        delete that._selector;
        delete that._initProperties;
    }

    _observeColumns() {
        const that = this;

        const columnPropertyChanged = function ( column, propertyName, oldValue, newValue ) {
            column.propertyChanged( propertyName, oldValue, newValue );
        }

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            column.onAction = function () {
                that._openMenu( this );
            }

            if ( column.autoGenerated ) {
                column.notify( function ( changes ) {
                    column.canNotify = false;
                    columnPropertyChanged( column, changes.propertyName, changes.oldValue, changes.newValue );
                    column.canNotify = true;
                } );
            }
        }

        that.columns.notify( function ( changes ) {
            let column = null;

            if ( changes.path ) {
                that.columns.canNotify = false;
                columnPropertyChanged( changes.target, changes.propertyName, changes.oldValue, changes.newValue );
                that.columns.canNotify = true;
                return;
            }

            that.columns.canNotify = false;

            const changeType = changes.action;


            let unboundColumnsCount = 0;

            switch ( changeType ) {
                case 'length': {
                    that.columns.canNotify = true;
                    return;
                }
                case 'add': {
                    const addColumn = function ( columnIndex ) {
                        column = changes.object[ columnIndex ];

                        if ( column instanceof LW.Grid.Column === false ) {
                            column = new LW.Grid.Column( column );

                            const notify = that.columns.canNotify;
                            that.columns.canNotify = false;
                            changes.object[ columnIndex ] = column;
                            column = changes.object[ columnIndex ];
                            that.columns.canNotify = notify;
                        }

                        column.grid = that;

                        if ( column.freeze ) {
                            that._frozenNearColumns.push( column );
                        }
                        else if ( column.freeze === 'far' ) {
                            that._frozenFarColumns.push( column );
                        }

                        let index = that.viewColumns.length - that._frozenFarColumns.length;

                        if ( columnIndex < that.columns.length ) {
                            that.viewColumns.splice( columnIndex + that._frozenNearColumns.length, 0, column );
                        }
                        else {
                            that.viewColumns.splice( index, 0, column );
                        }

                        if ( !that.columnByDataField[ column.dataField ] ) {
                            that.columnByDataField[ column.dataField ] = column;
                        }
                        else {
                            that.columnByDataField[ column.dataField ].children.push( column );
                            column.parent = that.columnByDataField[ column.dataField ];

                            column.valueField = column.dataField;

                            const dataField = column.dataField + '_' + column.parent.children.length;

                            that.columnByDataField[ dataField ] = column;
                            column.dataField = dataField;
                        }

                        if ( that.onColumnInserted ) {
                            that.onColumnInserted( columnIndex, column );
                        }
                    }

                    for ( let i = 0; i < changes.addedCount; i++ ) {
                        addColumn( changes.index + i );
                    }

                    break;
                }
                case 'update': {
                    column = changes.object[ changes.index ];

                    if ( column instanceof LW.Grid.Column === false ) {
                        column = new LW.Grid.Column( column );
                    }

                    column.grid = that;

                    for ( let i = 0; i < changes.index; i++ ) {
                        if ( that.viewColumns[ i ].autoGenerated ) {
                            unboundColumnsCount++;
                        }
                    }

                    that.viewColumns[ unboundColumnsCount + changes.index ] = column;
                    that.columnByDataField[ column.dataField ] = column;

                    if ( that.onColumnUpdated ) {
                        that.onColumnUpdated( changes.index, column );
                    }
                    break;
                }
                case 'remove': {
                    column = changes.removed[ 0 ];
                    let index = changes.index;

                    for ( let i = 0; i <= index; i++ ) {
                        if ( that.viewColumns[ i ].autoGenerated ) {
                            unboundColumnsCount++;
                        }
                    }

                    that.viewColumns.splice( unboundColumnsCount + index, 1 );

                    if ( column ) {
                        delete that.columnByDataField[ column.dataField ];
                    }

                    if ( that.onColumnRemoved ) {
                        that.onColumnRemoved( changes.index, column );
                    }

                    break;
                }
            }

            that._initializeColumnGroupsHierarchy();
            that._refreshColumnsResponsiveVisibility();
            that._createColumnHeaderCellElements();
            that._templateColumns();
            that.refresh();
            that.columns.canNotify = true;
        } );
    }

    /**
    * Calculates the width/height of the rows.
    */
    get _scrollWidth() {
        const that = this;

        if ( that.__scrollWidth ) {
            return that.__scrollWidth;
        }

        let width = 0;

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            if ( !column.visible ) {
                continue;
            }

            width += column.computedWidth;
        }

        width = parseInt( width );
        that.__scrollWidth = width;
        that._scrollView.scrollWidth = width - that._clientSize.width;

        return that.__scrollWidth;
    }

    /**
    * Horizontal Scroll Bar handler
    */
    _horizontalScrollbarHandler() {
        const that = this;

        that.closeMenu();
        that.isScrolling = true;

        requestAnimationFrame( () => {
            that._recycle();
            that.isScrolling = false;
        } );
    }

    /**
    * Container mousewheel event handler.
    */
    _mouseWheelHandler( event ) {
        const that = this;

        if ( that._scrollView.hScrollBar.$.hasClass( 'lw-hidden' ) && that._scrollView.vScrollBar.$.hasClass( 'lw-hidden' ) ) {
            return;
        }

        if ( !that.disabled && !that._scrollView.vScrollBar.$.hasClass( 'lw-hidden' ) && !event.shiftKey) {
            const scrollTop = that.scrollTop;

            if ( scrollTop === 0 && event.deltaY < 0 ||
                scrollTop === that.scrollHeight && event.deltaY > 0 ) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            that._scrollView.scrollTo( that._scrollView.scrollTop + that._getScrollCoefficient( event, that._clientSize.height ) );
            //            that._scrollView.scrollTop += event.deltaY < 0 ? -100 : 100;

        }
        else if ( !that.disabled && !that._scrollView.hScrollBar.$.hasClass( 'lw-hidden' ) ) {
            const scrollLeft = that.scrollLeft;

            if ( scrollLeft === 0 && event.deltaY < 0 ||
                scrollLeft === that.scrollWidth && event.deltaY > 0 ) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            that._scrollView.scrollTo( that._scrollView.scrollLeft + that._getScrollCoefficient( event, that._clientSize.width ), false );
            //            that._scrollView.scrollTop += event.deltaY < 0 ? -100 : 100;

        }
    }


    _refresh() {
        const that = this;

        if ( that._isUpdating ) {
            return;
        }

        const vScrollWidth = that.$.verticalScrollBar.offsetWidth;

        that.removeAttribute( 'grouped' );
        that.removeAttribute( 'tree' );

        let refreshColumns = true;

        if ( that.__autoHeightRows ) {
            that.__autoHeightRows = null;
            that._refreshColumnsResponsiveVisibility();
            that._recycle();
            refreshColumns = false;
        }

        if ( that.grouping.enabled && that.dataSource.groupBy && that.dataSource.groupBy.length >= 0 ) {
            that.grouping.renderMode === 'advanced' ? that.setAttribute( 'grouped', '' ) : that.setAttribute( 'tree', '' );

            that._renderGroupBar();
        }
        if ( that.grouping.enabled && that.dataSource.groupBy && that.dataSource.groupBy.length === 0 ) {
            if ( that.$.breadcrumb ) {
                that.$.breadcrumb.dataSource = [];
            }
        }
        else if ( that.dataSource.boundHierarchy ) {
            that.setAttribute( 'tree', '' );
            that.setAttribute( 'role', 'treegrid' );
        }

        if ( that.isInitialized || refreshColumns ) {
            // resize columns first, becase we have columns with auto or percentage width depending on the Grid's width.
            that._refreshColumnsResponsiveVisibility();
        }

        // refresh layout and show or hide horizontal/vertical scrollbars..
        that._refreshLayout();

        if ( vScrollWidth !== that.$.verticalScrollBar.offsetWidth ) {
            that.__scrollWidth = null;
            that._refreshColumnsResponsiveVisibility();
            that._refreshScrollBars();
        }

        that._refreshSelection();
        that._recycle();
        that._refreshHeaderBar();

        if ( that._recyclingRows && that._recyclingRows.length === 0 ) {
            const scrollViewTop = that.$.scrollView.offsetTop > 0 ? that.$.scrollView.offsetTop / 2 : 0;

            that.$.placeholder.classList.remove( 'lw-hidden' );
            that.$.placeholder.style.marginTop = scrollViewTop + 'px';

            that.scrollWidth = 0;
            that.scrollHeight = 0;
        }

        requestAnimationFrame( () => {
            that._width = that.offsetWidth;
            that._height = that.offsetHeight;
        } );
    }

    _refreshHeaderBar() {
        const that = this;

        if (!that.$.headerBar) {
            return;
        }

       that.$.headerBar._refresh();
    }
    /**
    * Grid resize handler.
    */
    _resizeHandler( event ) {
        const that = this,
            target = that.enableShadowDOM ? event.composedPath()[ 0 ] : event.target;

        if ( target === that && !that._isUpdatingScrollBars ) {

            if ( !that.isInitialized ) {
                that._render();
                return;
            }

            that._isUpdatingScrollBars = true;

            that._autoHeight = false;
            if ( that.$.content ) {
                that.$.content.classList.remove( 'auto-height' );
            }

            that.refresh();
            that._isUpdatingScrollBars = false;
        }
    }

    _refreshColumnsResponsiveVisibility() {
        const that = this;

        //const gridWidth = 1 + that.$.scrollView.offsetWidth;
        const columnContainer = that.$.columnContainer;
        const columnNearContainer = that.$.columnNearContainer;
        const columnFarContainer = that.$.columnFarContainer;

        let nearWidth = 0;
        let farWidth = 0;
        let computedColumnsWidth = 0;
        let isTreeColumnSet = false;

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            column._treeColumn = false;

            if ( that.grouping.enabled && ( column.rowDetailColumn || column.rowHeaderColumn ) ) {
                // column.canNotify = false;
                //   column.visible = false;
                //     column.canNotify = true;
            }

            if ( column.visible && !column.autoGenerated && !isTreeColumnSet && that.dataSource.boundHierarchy ) {
                column._treeColumn = true;
                isTreeColumnSet = true;
            }
        }


        that._refreshColumnWidths();

        let autoGeneratedNearWidth = 0;
        let autoGeneratedFarWidth = 0;

        for ( let i = 0; i < that.viewColumns.length; i++ ) {
            const column = that.viewColumns[ i ];

            if ( !column.visible ) {
                continue;
            }

            if ( column.freeze ) {
                if ( column.freeze === true || column.freeze === 'near' ) {
                    nearWidth += column.computedWidth;

                    if ( column.autoGenerated ) {
                        autoGeneratedNearWidth += column.computedWidth;
                    }
                }
                else if ( column.freeze === 'far' ) {
                    farWidth += column.computedWidth;

                    if ( column.autoGenerated ) {
                        autoGeneratedFarWidth += column.computedWidth;
                    }
                }

            }

            computedColumnsWidth += column.computedWidth;
        }

        columnContainer.style.width = computedColumnsWidth + 'px';
        columnNearContainer.style.width = nearWidth + 'px';
        columnFarContainer.style.width = farWidth + 'px';

        columnFarContainer.classList.remove( 'lw-hidden' );
        columnNearContainer.classList.remove( 'lw-hidden' );

        if ( farWidth === 0 ) {
            columnFarContainer.classList.add( 'lw-hidden' );
        }

        if ( nearWidth === 0 ) {
            columnNearContainer.classList.add( 'lw-hidden' );
        }

        columnFarContainer.classList.remove( 'border-collapse' );

        if ( farWidth === autoGeneratedFarWidth ) {
            columnFarContainer.classList.add( 'border-collapse' );
        }

        that._autoGeneratedColumnsNearWidth = autoGeneratedNearWidth;
        that._autoGeneratedColumnsFarWidth = autoGeneratedFarWidth;

        that._computedColumnsWidth = computedColumnsWidth;
        that._frozenColumnsNearWidth = nearWidth;
        that._frozenColumnsFarWidth = farWidth;
    }

    /**
    * Document select start handler.
    */
    _selectStartHandler( event ) {
        const that = this;

        if ( that.isScrolling || that.editing.isEditing ) {
            return;
        }

        event.preventDefault();
    }

    /**
    * Set tabIndex.
    */
    setFocusable( focusable ) {
        const that = this;

        if ( that.disabled || !focusable ) {
            that.removeAttribute( 'tabindex' );
            return;
        }

        that.tabIndex = 0;
    }

    /**
    * Set Loading Indicator Visibility
    */
    _setLoadingIndicatorVisibility() {
        const that = this;

        if ( that.appearance.displayLoadingIndicator ) {
            that.$.loadingIndicatorContainer.classList.remove( 'lw-visibility-hidden' );
            return;
        }

        that.$.loadingIndicatorContainer.classList.add( 'lw-visibility-hidden' );
    }

    _refreshElementsVisibility() {
        const that = this;

        const setVisibility = function ( element, visible ) {
            if ( !element ) {
                return;
            }

            visible ? element.classList.remove( 'lw-hidden' ) : element.classList.add( 'lw-hidden' );
        }

        setVisibility( that.$.placeholder, ( !that.rows ) || ( that.rows && that.rows.length === 0 ) || ( that.columns.length === 0 ) );
        setVisibility( that.$.footer, that.footer.visible );
        setVisibility( that.$.header, that.header.visible );
        setVisibility( that.$.groupHeader, that.groupHeader.visible || that.grouping.groupBar.visible );
        setVisibility( that.$.columnHeader, that.columnHeader.visible && that.columns.length > 0 );
        setVisibility( that.$.headerCommandBar, that.editing.commandBar.visible && that.editing.commandBar.position !== 'far' );
        setVisibility( that.$.footerCommandBar, that.editing.commandBar.visible && that.editing.commandBar.position !== 'near' );
        setVisibility( that.$.breadcrumb, that.groupHeader.visible || that.grouping.groupBar.visible );

        that.htmlColumnLastChild.classList.add( 'lw-visibility-hidden' );

        if ( that.pager && that.pager.visible && that.paging.enabled ) {
            switch ( that.pager.position ) {
                case 'near':
                    setVisibility( that.$.headerPager, true );
                    setVisibility( that.$.footerPager, false );
                    break;
                case 'far':
                    setVisibility( that.$.headerPager, false );
                    setVisibility( that.$.footerPager, true );
                    break;
                case 'both':
                    setVisibility( that.$.headerPager, true );
                    setVisibility( that.$.footerPager, true );
                    break;
            }
        }
        else {
            setVisibility( that.$.footerPager, false );
            setVisibility( that.$.headerPager, false );
        }

        that._refreshRowHierarchy();
    }

    _refreshRowHierarchy( ignoreExpanded ) {
        const that = this;

        that.rowHierarchy = null;

        let visibleIndex = 0;
        let isFlatHierarchy = false;

        if ( !that.grouping.enabled && that.dataSource.groupBy && that.dataSource.groupBy.length > 0 ) {
            isFlatHierarchy = true;
        }

        if ( that.dataSource.boundHierarchy ) {
            const reservedNames = that.dataSource.reservedNames;

            const addRow = function ( data ) {
                const row = new LW.Grid.Row( {data: data, index: that.rows.length} )

                that.rowById[ row.id ] = row;

                return row;
            }

            const refreshRowsVisibility = function ( boundSource, hierarchy ) {
                for ( let i = 0; i < boundSource.length; i++ ) {
                    const dataItem = boundSource[ i ];

                    let row = that.rowById[ dataItem.$.id ];

                    if ( !row ) {
                        row = addRow( dataItem );
                    }

                    row.data = dataItem;
                    row.leaf = dataItem[ reservedNames.leaf ] || false;
                    row.level = dataItem[ reservedNames.level ];
                    row.groupDataField = dataItem.groupDataField;
                    row.label = dataItem.label;
                    row.children = [];

                    if ( row.data ) {
                        row.filtered = row.data.$.filtered !== undefined ? row.data.$.filtered : true;
                    }

                    if ( dataItem.summaryRow ) {
                        row.summaryRow = true;
                    }

                    if ( that._toggledRow === null || ( that._toggledRow && that._toggledRow.id !== row.id ) ) {
                        row.expandHeight = 0;
                    }

                    if ( dataItem.parent ) {
                        row.parent = that.rowById[ dataItem.parent.$.id ];
                        row.parentId = dataItem.parent.$.id;
                    }
                    else {
                        row.parent = null;
                        row.parentId = null;
                    }

                    let expanded = ignoreExpanded ? true : row.expanded;

                    if ( isFlatHierarchy ) {
                        expanded = true;
                    }

                    if ( row.visible === true && row.filtered !== false ) {

                        if ( expanded || dataItem[ reservedNames.leaf ] ) {
                            hierarchy.push( row );

                            if ( dataItem.children && dataItem.children.length > 0 ) {
                                const children = refreshRowsVisibility( dataItem.children, new Array() );

                                if ( children.length === 0 ) {
                                    row.leaf = true;
                                }

                                for ( let t = 0; t < children.length; t++ ) {
                                    hierarchy.push( children[ t ] );
                                }

                                row.children = children;
                            }
                        }
                        else {
                            hierarchy.push( row );

                            if ( dataItem.children && dataItem.children.length > 0 ) {
                                const children = refreshRowsVisibility( dataItem.children, new Array() );

                                if ( children.length === 0 ) {
                                    row.leaf = true;
                                }

                                row.children = children;
                            }
                        }
                    }
                }

                return hierarchy;
            };

            let hierarchy = that.dataSource.boundHierarchy;

            if ( that.paging.enabled ) {
                hierarchy = hierarchy.slice( that.paging.pageIndex * that.paging.pageSize, ( that.paging.pageIndex + 1 ) * that.paging.pageSize );
            }

            that.rowHierarchy = refreshRowsVisibility( hierarchy, new Array() );

            let flatHierarchy = [];

            for ( let i = 0; i < that.rowHierarchy.length; i++ ) {
                const row = that.rowHierarchy[ i ];
                const notify = row.canNotify;

                if ( row.leaf ) {
                    flatHierarchy.push( row );
                }

                row.canNotify = false;
                row.visibleIndex = visibleIndex++;
                row.canNotify = notify;
            }

            if ( isFlatHierarchy ) {
                that.rowHierarchy = flatHierarchy;
            }

            if ( that._rowElements.length < that.rowHierarchy.length && !that._toggledRow ) {
                that._initializeRowElements();
            }

            if ( that.grouping.summaryRow.visible && !that.grouping.summaryRow.inline ) {
                const addHierarchySummaryRow = function ( level, hierarchy, parent, index ) {
                    if ( level !== 0 ) {
                        if ( hierarchy.length > 0 && hierarchy[ hierarchy.length - 1 ] && !hierarchy[ hierarchy.length - 1 ].summaryRow ) {
                            let dataItem = {
                                label: ' ', boundSource: [], groupDataField: parent.data.groupDataField, $: {
                                }, summaryRow: true, leaf: true, level: level, expandHeight: 0, siblings: hierarchy
                            };


                            dataItem.$.id = 'SubRow' + index + '_' + parent.data.$.id;

                            if ( parent ) {
                                dataItem.parent = parent.data;
                                dataItem.parentId = parent.data.$.id;
                            }

                            dataItem.data = Object.assign( dataItem );

                            hierarchy.push( dataItem );
                        }
                    }

                    for ( let i = 0; i < hierarchy.length; i++ ) {
                        if ( hierarchy[ i ] && hierarchy[ i ].data && hierarchy[ i ].data.children ) {
                            addHierarchySummaryRow( level + 1, hierarchy[ i ].data.children, hierarchy[ i ], i );
                        }
                    }
                }

                addHierarchySummaryRow( 0, that.rowHierarchy, null, 0 );
            }
        }
    }

    applyContent() {

    }


    _refreshContentHeight() {
        const that = this;

        let contentHeight = that._clientSize.height;

        const windowScrollY = window.scrollY;

        const offsetHeight = that.offsetHeight;
        that.$.container.classList.add( 'lw-hidden' );

        const newOffsetHeight = that.offsetHeight;
        that.$.container.classList.remove( 'lw-hidden' );

        if ( window.scrollY !== windowScrollY ) {
            window.scrollTo( window.scrollX, windowScrollY );
        }

        if ( that.verticalScrollBarVisibility === 'hidden' || ( offsetHeight !== newOffsetHeight )
            || ( that._minHeight && that._minHeight === offsetHeight ) ) {
            contentHeight = that._scrollHeight + that.$.columnHeader.offsetHeight + that.$.filterFooter.offsetHeight;

            if ( that._minHeight > contentHeight ) {
                contentHeight = that._minHeight;
            }

            that.$.content.style.height = contentHeight + 'px';

            that._contentHeight = contentHeight;

            if ( that._maxHeight < contentHeight ) {
                that._autoHeight = false;
                that.$.content.classList.remove( 'auto-height' );
                that.$.content.style.height = that._maxHeight + 'px';
                that._contentHeight = that._maxHeight;
            }
            else {
                that._autoHeight = true;
                that.$.content.classList.add( 'auto-height' );
            }
            return;
        }

        if ( that.header.visible ) {
            contentHeight -= that.$.header.offsetHeight;
        }

        if ( that.groupHeader.visible || that.grouping.groupBar.visible ) {
            contentHeight -= that.$.groupHeader.offsetHeight;
        }

        if ( that.footer.visible ) {
            contentHeight -= that.$.footer.offsetHeight;
        }

        if ( that.pager.visible ) {
            contentHeight -= that.$.headerPager.offsetHeight;
            contentHeight -= that.$.footerPager.offsetHeight;
        }

        if ( that.editing.enabled && that.editing.commandBar.visible ) {
            contentHeight -= that.$.headerCommandBar.offsetHeight;
            contentHeight -= that.$.footerCommandBar.offsetHeight;
        }

        that.$.content.style.height = contentHeight + 'px';
        that._contentHeight = contentHeight;
    }

    appendChild() {
        const args = Array.prototype.slice.call( arguments, 2 );
        return HTMLElement.prototype.appendChild.apply( this, args.concat( Array.prototype.slice.call( arguments ) ) );
    }

    removeChild() {
        const args = Array.prototype.slice.call( arguments, 2 );
        return HTMLElement.prototype.removeChild.apply( this, args.concat( Array.prototype.slice.call( arguments ) ) );
    }

    get _contentBorder() {
        const that = this;

        if ( that.__contentBorder ) {
            return that.__contentBorder;
        }

        const contentComputedStyle = getComputedStyle( that.$.content );
        const contentBorderX = parseFloat( contentComputedStyle.borderLeftWidth ) + parseFloat( contentComputedStyle.borderRightWidth );
        const contentBorderY = parseFloat( contentComputedStyle.borderTopWidth ) + parseFloat( contentComputedStyle.borderBottomWidth );

        const border = {
            left: contentBorderX, top: contentBorderY
        };

        that.__contentBorder = border;

        return border;
    }
    /**
    * Sets the initial scroll bar sizes.
    */
    _refreshLayout() {
        const that = this;
        const source = that.rows;

        if ( that._layoutSuspended ) {
            return;
        }

        that._visibleRows = null;
        that.__viewRows = null;
        that.__clientSize = null;
        that.__scrollHeight = null;
        that.__scrollWidth = null;
        that.__parentCells = null;

        that.$.columnFarContainer.classList.remove( 'vscroll' );
        that.$.columnNearContainer.classList.remove( 'vscroll' );

        that.$.scrollView.classList.remove( 'hscroll' );
        that.$.scrollView.classList.remove( 'vscroll' );

        that._refreshElementsVisibility();
        that._refreshColumnHeights();
        that._refreshContentHeight();

        if ( !( source && source.url ) ) {
            if ( !source || source === null || source.length === 0 || that.columns.length === 0 ) {
                const scrollViewTop = that.$.scrollView.offsetTop > 0 ? that.$.scrollView.offsetTop / 2 : 0;

                that.$.placeholder.classList.remove( 'lw-hidden' );
                that.$.placeholder.style.marginTop = scrollViewTop + 'px';

                that.scrollWidth = 0;
                that.scrollHeight = 0;

                return;
            }
        }

        if ( !that.__columnHeaderHeight ) {
            that.__columnHeaderHeight = that.$.columnHeader.offsetHeight;
        }

        if ( !that.__filterFooterOffsetHeight ) {
            that.__filterFooterOffsetHeight = that.$.filterFooter.classList.contains( 'lw-hidden' ) ? 0 : that.$.filterFooter.offsetHeight;
        }

        const scrollViewOffsetHeight = that._contentHeight - that.__filterFooterOffsetHeight - that.__columnHeaderHeight;

        that.$.scrollView.style.height = scrollViewOffsetHeight + 'px';
        that.htmlColumnLastChild.style.height = that.__columnHeaderHeight + 'px';


        if ( that.paging.spinner.enabled && that.paging.enabled ) {
            if ( !that.pageScroll ) {
                const pageScroll = document.createElement( 'lw-scroll-bar' );

                pageScroll.orientation = 'vertical';
                pageScroll.style.height = '100%';
                pageScroll.style.width = '100%';
                pageScroll.max = Math.ceil( that.dataSource.length / that.paging.pageSize );
                pageScroll.step = that.paging.spinner.step;
                pageScroll.largeStep = that.paging.spinner.step;
                pageScroll.setAttribute( 'spinner', '' );
                pageScroll.setAttribute( 'lw-id', 'spinner' );
                pageScroll.ownerElement = that;

                that.addPropertyBinding( '[[paging_spinner_step]]', 'step', pageScroll, that.$.columnHeader );

                pageScroll.addEventListener( 'change', function ( event ) {
                    that.paging.pageIndex = event.detail.value;
                } );

                that.pageScroll = pageScroll;
            }

            that.htmlColumnLastChild.appendChild( that.pageScroll );
        }
        else {
            that.htmlColumnLastChild.innerHTML = '';
        }

        that._refreshScrollBars();

    }

    _refreshScrollBars() {
        const that = this;
        const vScrollBar = that._scrollView.vScrollBar;
        const hScrollBar = that._scrollView.hScrollBar;

        const scrollViewOffsetHeight = that._contentHeight - that.__filterFooterOffsetHeight - that.__columnHeaderHeight;
        const scrollViewOffsetWidth = that.$.scrollView.offsetWidth;

        const hScrollWidth = that._scrollWidth - scrollViewOffsetWidth - that._contentBorder.left;
        const vScrollHeight = that._scrollHeight - scrollViewOffsetHeight - that._contentBorder.top;

        const columnNearContainerComputedStyle = that._columnNearContainerComputedStyle ? that._columnNearContainerComputedStyle : getComputedStyle( that.$.columnNearContainer );
        const columnFarContainerComputedStyle = that._columnFarContainerComputedStyle ? that._columnFarContainerComputedStyle : getComputedStyle( that.$.columnFarContainer );

        const nearWidth = parseInt( that.$.columnNearContainer.style.width ) + parseInt( columnNearContainerComputedStyle.borderRightWidth );
        const farWidth = parseInt( that.$.columnFarContainer.style.width ) + parseInt( columnFarContainerComputedStyle.borderLeftWidth );

        that.__frozenNearWidth = nearWidth;
        that.__frozenFarWidth = farWidth;

        that._columnNearContainerComputedStyle = columnNearContainerComputedStyle;
        that._columnFarContainerComputedStyle = columnFarContainerComputedStyle;

        that._refreshHorizontalScrollBarVisibility( hScrollWidth );
        that._refreshVerticalScrollBarVisibility( vScrollHeight );

        vScrollBar.style.height = scrollViewOffsetHeight + 'px';

        if ( that.computedVerticalScrollBarVisibility ) {
            if ( !that.__scrollBarSize ) {
                that.__scrollBarSize = vScrollBar.offsetWidth;
            }

            that.__scrollWidth += that.__scrollBarSize;
            that._refreshHorizontalScrollBarVisibility( that._scrollWidth - scrollViewOffsetWidth - 1 );

            if ( !that.rightToLeft ) {
                that.$.columnFarContainer.classList.add( 'vscroll' );
            }
            else {
                that.$.columnNearContainer.classList.add( 'vscroll' );
            }

            // increase the vertical scrollbar max after showing the horizontal.
            that._refreshVerticalScrollBarVisibility( vScrollHeight );

            that.htmlColumnLastChild.classList.remove( 'lw-visibility-hidden' );
        }

        hScrollBar.style.width = scrollViewOffsetWidth + 'px';

        if ( !that.rightToLeft ) {
            hScrollBar.style.left = '0px';
        }
        else {
            hScrollBar.style.right = '0px';
        }

        if ( that.computedVerticalScrollBarVisibility && that.computedHorizontalScrollBarVisibility ) {
            hScrollBar.style.width = scrollViewOffsetWidth - vScrollBar.offsetWidth + 'px';
            vScrollBar.style.height = scrollViewOffsetHeight - hScrollBar.offsetHeight + 'px';
        }

        if ( that.computedHorizontalScrollBarVisibility ) {
            that.$.scrollView.classList.add( 'hscroll' );

            if ( that._autoHeight ) {
                that.$.content.style.height = 'auto';
                that.$.scrollView.style.height = 'auto';
                that.$.scrollView.style.paddingBottom = hScrollBar.offsetHeight + 'px';
            }
            else {
                that.$.scrollView.style.paddingBottom = '';
            }
        }
        else {
            that.$.scrollView.classList.remove( 'hscroll' );
        }

        if ( ( that.__frozenNearHeight > 0 || ( that._frozenNearRows && that._frozenNearRows.length > 0 ) ) && !that.appearance.showVerticalScrollBarOnFixedColumns ) {
            const rowNearContainerComputedStyle = getComputedStyle( that.$.rowNearContainer );
            const nearHeight = that.__frozenNearHeight + parseInt( rowNearContainerComputedStyle.borderBottomWidth );

            vScrollBar.style.height = parseInt( vScrollBar.style.height ) - nearHeight + 'px';
            vScrollBar.style.top = nearHeight + 'px';
            vScrollBar.style.setProperty( '--lw-scroll-bar-near-size', nearHeight + 'px' );
        }
        else if ( that.appearance.showVerticalScrollBarOnFixedColumns ) {
            vScrollBar.style.top = '0px';

        }

        if ( ( that.__frozenFarHeight > 0 || ( that._frozenFarRows && that._frozenFarRows.length > 0 ) ) && !that.appearance.showVerticalScrollBarOnFixedColumns ) {
            const rowFarContainerComputedStyle = getComputedStyle( that.$.rowFarContainer );
            const farHeight = -2 + that.__frozenFarHeight + parseInt( rowFarContainerComputedStyle.borderTopWidth );

            vScrollBar.style.height = parseInt( vScrollBar.style.height ) - farHeight + 'px';
            vScrollBar.style.setProperty( '--lw-scroll-bar-far-size', farHeight + 'px' );

            if ( that.__frozenNearHeight === 0 ) {
                vScrollBar.style.top = '0px';
            }
        }

        if ( ( nearWidth > 0 || farWidth > 0 ) && !that.appearance.showHorizontalScrollBarOnFixedColumns ) {
            hScrollBar.style.width = parseInt( hScrollBar.style.width ) - nearWidth - farWidth + 'px';
            if ( !that.rightToLeft ) {
                hScrollBar.style.left = nearWidth + 'px';
            }
            else {
                hScrollBar.style.right = nearWidth + 'px';
            }

            hScrollBar.style.setProperty( '--lw-scroll-bar-near-size', nearWidth + parseInt( columnNearContainerComputedStyle.borderRightWidth ) + 'px' );
            hScrollBar.style.setProperty( '--lw-scroll-bar-far-size', farWidth + parseInt( columnNearContainerComputedStyle.borderLeftWidth ) + 'px' );

            if ( that.computedVerticalScrollBarVisibility ) {
                if ( !that.__scrollBarSize ) {
                    that.__scrollBarSize = vScrollBar.offsetWidth;
                }

                hScrollBar.style.setProperty( '--lw-scroll-bar-far-size', farWidth + that.__scrollBarSize + 'px' );
            }
        }

        vScrollBar.refresh();
        hScrollBar.refresh();
    }

    /**
    * Enable/Disable Horizontal Scroll bar.
    */
    _refreshHorizontalScrollBarVisibility( scrollWidth ) {
        const that = this;

        that.scrollWidth = scrollWidth;

        if ( !that.computedHorizontalScrollBarVisibility ) {
            that.scrollLeft = 0;
        }
    }

    /**
    * Enable/Disable Vertical Scroll bar.
    */
    _refreshVerticalScrollBarVisibility( scrollHeight ) {
        const that = this;

        if ( that._autoHeight ) {
            that.scrollTop = 0;
            that.scrollHeight = 0;
            return;
        }

        if ( that.computedHorizontalScrollBarVisibility ) {
            scrollHeight += that.$.horizontalScrollBar.offsetHeight;
        }

        that.scrollHeight = scrollHeight;

        if ( that.paging.enabled && that.paging.spinner.visible ) {
            that.$.verticalScrollBarVisibility.classList.remove( 'lw-hidden' );
        }

        if ( !that.computedVerticalScrollBarVisibility ) {
            that.scrollTop = 0;
        }
    }

    /**
    * Style change event.
    */
    _styleChangedHandler( event ) {
        const that = this;

        if ( event.detail.styleProperties[ 'overflow' ] || that.classList.contains( 'lw-grid-resize-mode' ) ) {
            return;
        }

        if ( event.detail.styleProperties[ 'grid-template-columns' ] ) {
            that._templateColumns();
            that.refresh();

            return;
        }

        if ( event.detail.styleProperties[ 'font-size' ] ) {
            that.layout.isDirty = true;
            that._resetCachedLayout();
            that.refresh();
            return;
        }

        if ( event.detail.styleProperties[ '--lw-grid-row-height' ] ||
            event.detail.styleProperties[ '--lw-font-size' ] ||
            event.detail.styleProperties[ '--lw-grid-column-header-height' ] ||
            event.detail.styleProperties[ '--lw-grid-group-header-height' ] ||
            event.detail.styleProperties[ '--lw-grid-filter-footer-height' ] ||
            event.detail.styleProperties[ '--lw-grid-group-row-vertical' ] ||
            event.detail.styleProperties[ '--lw-grid-group-row-horizontal-offset' ] ||
            event.detail.styleProperties[ '--lw-grid-freeze-splitter-size' ] ||
            event.detail.styleProperties[ '--lw-grid-resize-line-size' ] ||
            event.detail.styleProperties[ '--lw-grid-footer-height' ] ||
            event.detail.styleProperties[ '--lw-grid-header-height' ]
        ) {
            that.layout.isDirty = true;
        }

        if ( that.offsetWidth && that.offsetHeight > 0 ) {
            that._resetCachedLayout();
            that._refreshLayout();
            that._recycle();
        }
    }

    _resetCachedLayout() {
        const that = this;

        that.__cellsCommandTemplate = null;
        that.__autoRowHeight = null;
        that.__autoHeightRows = null;
        that.__measuredColumnHeight = null;
        that.__columnHeaderHeight = null;
        that.__filterFooterOffsetHeight = null;
    }
    /**
    * SwipeLeft event handler.
    **/
    _swipeLeftHandler() {
    }

    /**
    * SwipeRight event handler.
    */
    _swipeRightHandler() {
    }

    _getRowIndexByPosition( position ) {
        const that = this;

        const getRowIndex = ( rows ) => {
            let bottomPointer = 0;
            let topPointer = rows.length - 1;

            if ( position <= 0 ) {
                return 0;
            }

            const lastNode = rows[ rows.length - 1 ];

            if ( lastNode.top !== -1 && lastNode.top <= position ) {
                return rows.length - 1;
            }

            const condition = true;

            while ( condition ) {
                const midPointer = Math.floor( ( bottomPointer + topPointer ) / 2 );
                const currentrow = rows[ midPointer ];
                if ( that._isRowInPosition( currentrow, position ) ) {
                    return midPointer;
                }
                else if ( currentrow.top < position ) {
                    bottomPointer = midPointer + 1;
                }
                else if ( currentrow.top > position ) {
                    topPointer = midPointer - 1;
                }
                else {
                    bottomPointer = midPointer + 1;
                }
            }
        };

        const index = getRowIndex( that._recyclingRows );

        return index;
    }

    getViewRows() {
        const that = this;

        if ( that.rowHierarchy ) {
            return that.rowHierarchy;
        }

        let rows = that.getVisibleRows();

        return rows;
    }

    get _recyclingRows() {
        const that = this;

        if ( that.rowHierarchy ) {
            return that.rowHierarchy;
        }

        let rows = that.getVisibleRows();

        if ( that.paging.enabled ) {
            rows = rows.slice( that.paging.pageIndex * that.paging.pageSize, ( that.paging.pageIndex + 1 ) * that.paging.pageSize );
        }

        return rows;
    }

    _isRowInPosition( row, position ) {
        const topPixel = row.top;
        const bottomPixel = row.top + row.height;
        const pixelInRow = topPixel <= position && bottomPixel > position;

        if ( row.height === 0 ) {
            return false;
        }

        return pixelInRow;
    }

    _renderColumnGroupHeaders() {
        const that = this;

        for ( let i = 0; i < that.columnGroups.length; i++ ) {
            const columnGroup = that.columnGroups[ i ];
            columnGroup.column.render();
            columnGroup.column.allowReorder = false;
            columnGroup.column.element.setAttribute( 'columnHeader', '' );

            if ( columnGroup.columns.length === 0 ) {
                columnGroup.column.element.classList.add( 'lw-hidden' );
            }

            if ( i === 0 ) {
                columnGroup.column.element.classList.add( 'lw-grid-column-border-collapse' );
            }
        }
    }

    _isLastVisibleColumn( column ) {
        const that = this;

        for ( let i = that.viewColumns.length - 1; i >= 0; i-- ) {
            const currentColumn = that.viewColumns[ i ];

            if ( !currentColumn.visible ) {
                continue;
            }

            if ( currentColumn === column ) {
                return true;
            }

            return false;
        }

        return false;
    }

    _recycle( recycleColumns, recycleRows ) {
        const that = this;

        if ( that._layoutSuspended ) {
            return;
        }

        if ( that._isUpdating ) {
            return;
        }


        if ( that.editing.isEditing ) {
            that.endEdit();

            if ( that._isUpdating ) {
                return;
            }
        }

        if ( that._inputOverlay ) {
            if ( that._inputOverlay.parentNode ) {
                that._inputOverlay.parentNode.removeChild( that._inputOverlay );
            }

            that._inputOverlay = null;
        }

        if ( that._selection.selectionRect ) {
            that._refreshCellSelectionRect();
        }

        const value = that._scrollView.scrollTop;
        let rowIndex = that._getRowIndexByPosition( value );
        let rows = that._recyclingRows;

        let row = rows[ rowIndex ];

        let rowTop = row ? row.top : 0;
        let columnLeft = undefined;

        let nearWidth = 0;
        let j = 0;

        let rowSpanOffset = 0;
        let colSpanOffset = 0;

        for ( let i = 0; i < that._cellsMerge.length; i++ ) {
            const cell = that._cellsMerge[ i ];

            const startRowIndex = rows.indexOf( cell.row );

            if ( rowIndex > startRowIndex && rowIndex <= startRowIndex + cell.rowSpan ) {
                rowIndex = startRowIndex;
                row = cell.row;
                rowSpanOffset = Math.max( rowSpanOffset, rowTop - row.top );
                rowTop = row.top;
                that.$.rowContainer.style.top = that.__frozenNearHeight - value + rowTop + 'px';
            }

            if ( cell.colSpan > 1 ) {
                for ( let j = 0; j < that.viewColumns.length; j++ ) {
                    const viewColumn = that.viewColumns[ j ];
                    let column = viewColumn.autoGenerated ? viewColumn : that.columnByDataField[ viewColumn.dataField ];
                    if ( !column.visible ) {
                        continue;
                    }

                    if ( column.left + column.computedWidth - that._scrollView.scrollLeft >= nearWidth && column.left - column.computedWidth - that._scrollView.scrollLeft < that._clientSize.width ) {
                        let cellColumn = that.columnByDataField[ cell.column.dataField ]


                        colSpanOffset = Math.max( colSpanOffset, column.left - cellColumn.left + column.computedWidth );
                        break;
                    }
                }
            }
        }


        if ( recycleColumns !== false || that._cellsMerge.length > 0 ) {
            for ( let i = 0; i < that._columnElements.length; i++ ) {
                const columnElement = that._columnElements[ i ];

                if ( !columnElement.parentNode ) {
                    break;
                }

                columnElement.set( 'column', null, false );
                columnElement.classList.add( 'lw-visibility-hidden' );
            }

            for ( let i = 0; i < that.columnGroups.length; i++ ) {
                const column = that.columnGroups[ i ];
                const header = column.element;

                if ( !that.rightToLeft ) {
                    header.style.left = column.left + 'px';
                }
                else {
                    header.style.right = column.right + 'px';
                }
                header.style.width = column.computedWidth + 'px';
            }

            that._firstVisibleColumn = null;
            that._lastVisibleColumn = null;

            for ( let i = 0; i < that.viewColumns.length; i++ ) {
                const viewColumn = that.viewColumns[ i ];
                //      let column = viewColumn.autoGenerated ? viewColumn : that.columnByDataField[viewColumn.dataField];
                let column = viewColumn;

                if ( column.visible ) {
                    if ( !that._firstVisibleColumn ) {
                        that._firstVisibleColumn = column;
                    }

                    that._lastVisibleColumn = column;
                }

                if ( column.element ) {
                    if ( column === that._firstVisibleColumn ) {
                        column.element.classList.add( 'lw-grid-column-border-collapse' );
                    }
                    else {
                        column.element.classList.remove( 'lw-grid-column-border-collapse' );
                    }

                    column.element.removeAttribute( 'aria-colindex' );
                }

                if ( column.freeze ) {
                    if ( column.freeze === true || column.freeze === 'near' ) {
                        if ( column.visible ) {
                            nearWidth += column.computedWidth;
                        }
                    }

                    if ( !column.visible ) {
                        column.element.classList.add( 'lw-visibility-hidden' );
                    }
                    else {
                        column.element.classList.remove( 'lw-visibility-hidden' );
                        column.render();
                    }


                    continue;
                }


                if ( !column.visible ) {
                    continue;
                }

                if ( column.left + column.computedWidth - that._scrollView.scrollLeft >= nearWidth - colSpanOffset && column.left - column.computedWidth - that._scrollView.scrollLeft < that._clientSize.width ) {
                    const columnElement = that._columnElements[ j++ ];

                    columnElement.set( 'column', column, false );

                    if ( !columnElement.parentNode ) {
                        that.$.columnContainer.appendChild( columnElement );
                    }

                    column.element = columnElement;
                    column.render();
                    columnElement.setAttribute( 'aria-colindex', i + 1 );
                    if ( columnLeft === undefined ) {
                        columnLeft = column.left;
                    }
                }
            }
        }

        if ( columnLeft === undefined ) {
            columnLeft = 0;
        }

        if ( !that.rightToLeft ) {
            that.$.columnContainer.style.left = -that._scrollView.scrollLeft + 'px';
        }
        else {
            that.$.columnContainer.style.right = that._scrollView.scrollWidth - that._scrollView.scrollLeft - that._scrollView.vScrollBar.offsetWidth + 'px';
        }

        that.$.rowContainer.style.top = that.__frozenNearHeight - value + rowTop + 'px';

        if ( recycleRows === false ) {
            return;
        }

        if ( !that._rowElements ) {
            return;
        }

        if ( rowIndex >= 0 ) {
            j = 0;
            let offsetHeight = Math.max( that._clientSize.height, that._overflowOffset );

            for ( let i = rowIndex; i < rows.length; i++ ) {
                const row = rows[ i ];

                if ( row.height === 0 || !row.visible || ( row.filtered === false ) || row.freeze ) {
                    continue;
                }

                const rowHeight = row.height;

                if ( row.expandHeight ) {
                    offsetHeight += that.offsetHeight + row.expandHeight;
                }

                if ( ( rowTop + rowHeight >= value - rowSpanOffset && rowTop <= value + offsetHeight ) || that._autoHeight ) {
                    const rowElement = that._rowElements[ j++ ];

                    if ( !rowElement ) {
                        break;
                    }

                    rowElement.setAttribute( 'aria-rowindex', i + 1 );
                    row.element = rowElement;
                    row.grid = that;
                    row.render();
                }
                else {
                    break;
                }

                rowTop += rowHeight;
            }
        }

        that._renderFrozenRows();

        if ( j < that._rowElements.length ) {
            for ( let i = j; i < that._rowElements.length; i++ ) {
                const scrollRow = that._rowElements[ j++ ];

                scrollRow.classList.add( 'lw-hidden' );
                scrollRow.removeAttribute( 'aria-rowindex' );
            }
        }
    }

    _renderFrozenRows() {
        const that = this;
        let anyFrozenNearRowVisible = false;
        let anyFrozenFarRowVisible = false;

        if ( that._frozenNearRows.length === 0 ) {
            that.$.rowNearContainer.classList.add( 'lw-hidden' );
        }
        else {
            that.$.rowNearContainer.classList.remove( 'lw-hidden' );
        }

        for ( let i = 0; i < that._frozenNearRows.length; i++ ) {
            const row = that._frozenNearRows[ i ];

            if ( row.visible && row.filtered ) {
                anyFrozenNearRowVisible = true;

                row.element = that.$.rowNearContainer.children[ i ];

                if ( !row.element ) {
                    row.element = row.createElement();
                    that.$.rowNearContainer.appendChild( row.element );
                }

                row.render();
            }
        }

        if ( !anyFrozenNearRowVisible ) {
            that.$.rowNearContainer.classList.add( 'lw-hidden' );
        }

        if ( that._frozenFarRows.length === 0 ) {
            that.$.rowFarContainer.classList.add( 'lw-hidden' );
        }
        else {
            that.$.rowFarContainer.classList.remove( 'lw-hidden' );
        }

        for ( let i = 0; i < that._frozenFarRows.length; i++ ) {
            const row = that._frozenFarRows[ i ];

            if ( row.visible ) {
                anyFrozenFarRowVisible = true;
            }

            row.element = that.$.rowFarContainer.children[ i ];

            if ( !row.element ) {
                row.element = row.createElement();
                that.$.rowFarContainer.appendChild( row.element );
            }

            row.render();
        }

        if ( !anyFrozenFarRowVisible ) {
            that.$.rowFarContainer.classList.add( 'lw-hidden' );
        }
    }

    _recycleRotate( columnHeaderCellContentElement, textElement, halign, valign, value ) {
        const textRectangle = textElement.getBoundingClientRect();
        const boundingRectangle = columnHeaderCellContentElement.getBoundingClientRect();

        const padding = 4;
        let left = 0;
        let top = 0;

        if ( boundingRectangle.width === 0 ) {
            columnHeaderCellContentElement.innerHTML = value;
            return false;
        }

        if ( textRectangle.left > boundingRectangle.left ) {
            left = boundingRectangle.left - textRectangle.left;
        }

        if ( textRectangle.top < boundingRectangle.top ) {
            top = boundingRectangle.top - textRectangle.top;
        }

        if ( halign === 'left' || halign === '' ) {
            left = padding;
        }

        if ( halign === 'center' ) {
            left += boundingRectangle.width / 2 - textRectangle.width / 2;
        }

        if ( halign === 'right' ) {
            left += boundingRectangle.width - textRectangle.width - padding;
        }

        if ( valign === 'top' || valign === '' ) {
            top = padding;
        }

        if ( valign === 'center' || valign === 'middle' ) {
            top += boundingRectangle.height / 2 - textRectangle.height / 2;
        }

        if ( valign === 'bottom' ) {
            top += boundingRectangle.height - textRectangle.height - padding;
        }

        textElement.style.left = left + 'px';
        textElement.style.top = top + 'px';

        return true;
    }

    _virtualDataRequest( action ) {
        const that = this;

        let first = -1;
        let last = -1;

        if ( !that._rowElements && that.scrolling !== 'infinite' ) {
            return;
        }

        if ( that.scrolling === 'virtual' ) {
            for ( let i = 0; i < that._rowElements.length; i++ ) {
                const rowElement = that._rowElements[ i ];
                const row = rowElement.row;
                const visibleIndex = i === 0 ? row.visibleIndex : first + i;

                if ( rowElement.classList.contains( 'lw-hidden' ) ) {
                    continue;
                }

                if ( first === -1 ) {
                    first = visibleIndex;
                }

                if ( visibleIndex === -1 ) {
                    continue;
                }

                last = 1 + visibleIndex;
            }
        }
        else if ( that.scrolling === 'infinite' ) {
            first = Infinity;
            last = Infinity;
        }
        else {
            first = 0;
            last = that.dataSource.length;
        }


        if ( that.paging.enabled ) {
            first = that.paging.pageIndex * that.paging.pageSize;
            last = first + that.paging.pageSize;
        }

        if ( last !== Infinity ) {
            last = Math.min( last, that.dataSource.length );
        }

        that.appearance.displayLoadingIndicator = true;
        that._setLoadingIndicatorVisibility();

        const details = {
            first: first,
            last: last,
            sorting: that.getSortedColumns(),
            filtering: that.getFilteredColumns(),
            grouping: [],
            row: that._toggledRow ? that._toggledRow.data : null,
            action: action
        }

        const dataSourceLength = that.dataSource.length;

        if ( undefined === that._isFirstVirtualDataSourceRequest ) {
            that._isFirstVirtualDataSourceRequest = true;
        }

        that.dataSource.onVirtualDataSourceRequested( function () {
            that.appearance.displayLoadingIndicator = false;
            that._setLoadingIndicatorVisibility();
            that._toggledRow = null;

            const context = that.context;
            that.context = that;

            if ( that._isFirstVirtualDataSourceRequest && that._initColumns.length === 0 ) {
                that.columns.canNotify = false;
                that.columns = [];
                that._renderColumns();
                that.columns.canNotify = true;
            }

            if ( that.dataSource.length !== dataSourceLength || that._isFirstVirtualDataSourceRequest ) {
                if ( that.paging.enabled ) {
                    that.$.headerPager.querySelector( 'lw-pager' ).pagesCount = Math.ceil( that.dataSource.length / that.paging.pageSize );
                    that.$.footerPager.querySelector( 'lw-pager' ).pagesCount = Math.ceil( that.dataSource.length / that.paging.pageSize );
                }

                that._initializeRows();
                that._initializeRowElements();

                that.refresh();
                that._refreshPagesCount();
            }
            else if ( that.dataSource.virtualDataSourceOnExpand ) {
                that.refresh();
            }

            that._isFirstVirtualDataSourceRequest = false;
            that._recycle();
            that.context = context;
        }, details );
    }


    /**
    * Vertical Scroll Bar handler
    */
    _verticalScrollbarHandler( data ) {
        const that = this;

        if ( that.menu && that.menu.column ) {
            that.closeMenu();
        }

        that.isScrolling = true;

        if ( that._scrollTimer ) {
            clearTimeout( that._scrollTimer );
        }

        if ( that._layoutSuspended ) {
            return;
        }

        that._scrollTimer = setTimeout( () => {
            that._recycle( false );
            that.isScrolling = false;

            if ( data.max === data.value ) {
                that.$.fireEvent( 'scrollBottomReached' );

                if ( that.scrolling === 'infinite' ) {
                    that._virtualDataRequest( 'scroll' );
                    return;
                }
            }

            if ( that.scrolling === 'virtual' ) {
                that._virtualDataRequest( 'scroll' );
            }

            if ( data.min === data.value ) {
                that.$.fireEvent( 'scrollTopReached' );
            }
        } );
    }

    /*
    Public API
    */
    /**
     * Removes all rows from DOM.
     */
    clearRows() {
        const that = this;

        that.dataSource = new LW.DataAdapter( {
            dataSource: []
        } );

        that.rowHierarchy = null;
        that._visibleRows = null;
        that.__viewRows = null;
        that.rows.canNotify = false;
        that.rows.length = 0;
        that.rows.canNotify = true;
        that.clearSelection();
    }

    dataBind() {
        const that = this;

        delete that.__autoRowHeight;

        if ( that.dataSource === null || ( that.dataSource && that.dataSource.dataFields &&
            that.dataSource.length === 0 && that.dataSource.dataSource.length === 0 && !that.dataSource.virtualDataSource ) ) {
            that.clearRows();
        }
        else if ( Array.isArray( that.dataSource ) ) {
            that.dataSource = new LW.DataAdapter( {
                dataSource: that.dataSource
            } );
        }

        const sortColumns = that._sortedColumns;

        that.clearSort();

        if ( that._initColumns && that._initColumns.length === 0 ) {
            that.columns = [];
            that._renderColumns( true );
        }

        that._renderRows();

        if ( that.scrolling === 'virtual' || ( that.paging.enabled && that.dataSource && that.dataSource.virtualDataSource ) ) {
            that._virtualDataRequest( 'dataBind' );
        }
        else if ( that.dataSource && that.dataSource.virtualDataSource ) {
            that._virtualDataRequest( 'dataBind' );
        }
        else if ( that.paging.enabled && ( !that.dataSource || ( that.dataSource && !that.dataSource.url ) ) ) {
            that._refreshPagesCount();
        }

        if ( sortColumns ) {
            that._refreshSort( sortColumns );
        }
    }

    refresh( fullRefresh ) {
        const that = this;

        if ( !that.isInitialized ) {
            return;
        }

        if ( fullRefresh ) {
            that._initializeRows();
            that._initializeRowElements();
        }

        that._refresh();
    }

    refreshView() {
        const that = this;

        that._recycle();
    }

    beginUpdate() {
        const that = this;

        if ( !that._isUpdating ) {
            that._isUpdating = 0;
        }

        that._isUpdating++;
    }

    endUpdate( refresh ) {
        const that = this;

        that._isUpdating--;

        if ( that._isUpdating < 0 ) {
            that._isUpdating = 0;
        }

        if ( refresh !== false ) {
            that.refresh();
        }
        else {
            that.refreshView();
        }
    }
} );

// eslint-disable-next-line strict
( function () {
    LW.Grid.Extend = function ( module ) {
        if ( !module ) {
            return;
        }

        const methodNames = Object.getOwnPropertyNames( module.prototype );

        for ( let index in methodNames ) {
            const methodName = methodNames[ index ];

            if ( methodName === 'constructor' ) {
                continue;
            }

            LW.Grid.prototype[ methodName ] = module.prototype[ methodName ];
        }
    };

    LW.Grid.Extend( LW.Utilities.Grid.Resize );
    LW.Grid.Extend( LW.Utilities.Grid.Reorder );
    LW.Grid.Extend( LW.Utilities.Grid.Pager );
    LW.Grid.Extend( LW.Utilities.Grid.Filter );
    LW.Grid.Extend( LW.Utilities.Grid.Sort );
    LW.Grid.Extend( LW.Utilities.Grid.Menu );
    LW.Grid.Extend( LW.Utilities.Grid.Select );
    LW.Grid.Extend( LW.Utilities.Grid.Edit );
    LW.Grid.Extend( LW.Utilities.Grid.Group );
    LW.Grid.Extend( LW.Utilities.Grid.Tree );
    LW.Grid.Extend( LW.Utilities.Grid.Export );
    LW.Grid.Extend( LW.Utilities.Grid.Chart );

    LW.Grid.Cell = LW.Utilities.Grid.Cell;
    LW.Grid.Row = LW.Utilities.Grid.Row;
    LW.Grid.Column = LW.Utilities.Grid.Column;
} )();