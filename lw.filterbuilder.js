
/**
 * lwFilterBuilder custom element.
 */
LW('lw-filter-builder', class FilterBuilder extends LW.BaseElement {
    /**
    * Element's properties
    */
    static get properties() {
        return {
            'customOperations': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'disableContextMenu': {
                value: false,
                type: 'boolean'
            },
            'fields': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'formatStringDate': {
                value: 'dd-MMM-yy',
                type: 'string'
            },
            'formatStringDateTime': {
                value: 'dd-MMM-yy HH:mm:ss',
                type: 'string'
            },
            'hint': {
                value: null,
                type: 'string?'
            },
            'icons': {
                value: {
                    '=': '=',
                    '<>': '≠',
                    '>': '>',
                    '>=': '≥',
                    '<': '<',
                    '<=': '≤',
                    'startswith': 'a|bc',
                    'endswith': 'ab|c',
                    'contains': 'abc',
                    'notcontains': '!abc',
                    'isblank': '○',
                    'isnotblank': '●'
                },
                type: 'object',
                reflectToAttribute: false
            },
            'maxConditions': {
                value: null,
                type: 'number?',
                validator: '_maxValidator'
            },
            'maxConditionsPerGroup': {
                value: null,
                type: 'number?',
                validator: '_maxValidator'
            },
            'maxLevel': {
                value: null,
                type: 'number?',
                validator: '_maxValidator'
            },
            'messages': {
                value: {
                    'en': {
                        'add': 'Add',
                        'addCondition': 'Add Condition',
                        'addGroup': 'Add Group',
                        'and': 'And',
                        'notand': 'Not And',
                        'or': 'Or',
                        'notor': 'Not Or',
                        '=': 'Equals',
                        '<>': 'Does not equal',
                        '>': 'Greater than',
                        '>=': 'Greater than or equal to',
                        '<': 'Less than',
                        '<=': 'Less than or equal to',
                        'startswith': 'Starts with',
                        'endswith': 'Ends with',
                        'contains': 'Contains',
                        'notcontains': 'Does not contain',
                        'isblank': 'Is blank',
                        'isnotblank': 'Is not blank',
                        'wrongParentGroupIndex': '{{elementType}}: Wrong parent group index in "{{method}}" method.',
                        'missingFields': '{{elementType}}: Fields are required for proper condition\'s adding. Set "fields" source and then conditions will be added as expected.',
                        'wrongElementNode': '{{elementType}}: Incorect node / node Id in "{{method}}" method.',
                        'invalidDataStructure': '{{elementType}}: Used invalid data structure in updateCondition/updateGroup method.',
                        'dateTabLabel': 'DATE',
                        'timeTabLabel': 'TIME'
                    }
                },
                type: 'object',
                extend: true
            },
            'restrictedMode': {
                value: false,
                type: 'boolean'
            },
            'showIcons': {
                value: false,
                type: 'boolean'
            },
            'value': {
                value: ['or'],
                type: 'array?',
                reflectToAttribute: false
            },
            'valueFormatFunction': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'valuePlaceholder': {
                value: '&lt;enter a value&gt;',
                type: 'string'
            }
        }
    }

    /**
    * Filter Builder's required files
    */
    static get requires() {
        return {
            'LW.Button': 'lw.button.js',
            'LW.CheckBox': 'lw.checkbox.js',
            'LW.ScrollBar': 'lw.scrollbar.js',
            'LW.ListBox': 'lw.listbox.js',
            'LW.DropDownList': 'lw.dropdownlist.js',
            'LW.ComboBox': 'lw.combobox.js',
            'LW.Calendar': 'lw.calendar.js',
            'LW.TimePicker': 'lw.timepicker.js',
            'LW.Tooltip': 'lw.tooltip.js',
            'LW.Utilities.DateTime': 'lw.date.js',
            'LW.DateTimePicker': 'lw.datetimepicker.js',
            'LW.Menu': 'lw.menu.js'
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'down': '_downHandler',
            'document.click': '_documentClickHandler',
            'conditionsMenu.itemClick': '_menuItemClickHandler',
            'container.change': '_containerChangeHandler',
            'scrollableContainer.wheel': '_scrollViewerWheelHandler',
            'scrollableOuterContainer.resize': '_resizeHandler',
            'innerContainer.keydown': '_innerContainerKeydownHandler'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.filterbuilder.css'
        ]
    }

    /**
    * Element's HTML template.
    */
    template() {
        return `<div id="container" title="[[hint]]">
                    <div id="innerContainer" class="lw-inner-container">
                            <div id="scrollableOuterContainer" class="lw-scrollable-outer-container">
                                <lw-scroll-viewer id="scrollableContainer" class="lw-scrollable-container" animation="[[animation]]">
                                    <div id="contentContainer" class="lw-content-container"></div>
                                </lw-scroll-viewer>
                            </div>
                            <div id="editorsContainer" class="lw-editors-container">
                                <div id="customEditor" class="lw-custom-editor lw-hidden"></div>
                            </div>
                    </div>
                    <lw-menu id="conditionsMenu" mode="dropDown" class="lw-conditions-menu" theme="[[theme]]" animation="[[animation]]"></lw-menu>
            </div>`;
    }

    /**
    * Updates the element when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;
        const editors = ['textBoxEditor', 'numericTextBoxEditor', 'comboBoxEditor', 'dateTimePickerEditor', 'checkBoxEditor'];
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        switch (propertyName) {
            case 'animation':
            case 'theme':
                editors.forEach(editor => that.$[editor] && (that.$[editor][propertyName] = newValue));
                break;
            case 'customOperations':
                that._handleCustomOperations();
                that._refresh();
                break;
            case 'fields':
                that._mapFieldsToMenu();
                that._refresh();
                break;
            case 'formatStringDate':
            case 'formatStringDateTime':
            case 'showIcons':
            case 'valueFormatFunction':
                that._refresh();
                break;
            case 'locale':
            case 'messages':
                that._localizeInitialValues();
                that._refresh();
                that._handleCustomOperations();//

                if (that.$.dateTimePickerEditor) {
                    if (!that.$.dateTimePickerEditor.messages[that.locale]) {
                        that.$.dateTimePickerEditor.messages[that.locale] = {};
                    }

                    that.$.dateTimePickerEditor.messages[that.locale].dateTabLabel = that.localize('dateTabLabel');
                    that.$.dateTimePickerEditor.messages[that.locale].timeTabLabel = that.localize('timeTabLabel');

                    if (propertyName === 'locale') {
                        that.$.dateTimePickerEditor.locale = that.locale;
                    }
                    else if (propertyName === 'messages') {
                        that.$.dateTimePickerEditor.$.selectDate.innerHTML = that.$.dateTimePickerEditor.messages[that.locale].dateTabLabel;
                        that.$.dateTimePickerEditor.$.selectTime.innerHTML = that.$.dateTimePickerEditor.messages[that.locale].timeTabLabel;
                    }
                }

                break;
            case 'maxConditions':
            case 'maxConditionsPerGroup':
            case 'maxLevel':
            case 'value': {
                that._totalConditions = 0;
                that._validateValue();
                that._emptyElementsStructure(true);
                that._convertValueToFlat(that.value);
                that._getFieldsFromValue();
                that._mapFieldsToMenu();
                that._generateHTMLStructureFromFlatValue();
                that.$.scrollableContainer.refresh();

                const oldValueAsString = JSON.stringify(that.value);

                if (that._oldValueAsString !== oldValueAsString) {
                    that._oldValueAsString = oldValueAsString;
                    that.$.fireEvent('change', { 'value': JSON.parse(oldValueAsString) });
                }

                break;
            }
            case 'valuePlaceholder':
                that._updatePlaceholder();
                break;
        }
    }

    /**
     * Validates the value of "maxConditions", "maxConditionsPerGroup", and "maxLevel"
     * @param {any} oldValue - the old value
     * @param {any} value - the new value
     */
    _maxValidator(oldValue, newValue) {
        if (typeof newValue !== 'number') {
            return newValue;
        }

        return Math.max(1, newValue);
    }

    /**
    * Element's ready method.
    */
    ready() {
        super.ready();

        const that = this;

        that._validateValue();
        that._setInitialValues();
        that._handleCustomOperations();
        that._emptyElementsStructure(true);
        that._totalConditions = 0;
        that._convertValueToFlat(that.value);
        that._getFieldsFromValue();
        that._generateHTMLStructureFromFlatValue();
        that.$.conditionsMenu._noAutoFocus = true;
        that._oldValueAsString = JSON.stringify(that.value);
        that.$.scrollableContainer.refresh();
    }

    /*
    * Creates new condition
    * @param {Any} parentGroup - html object or group id
    * @param {Array} data - contains dataField, operator and value
    */
    addCondition(parentGroup, data) {
        const that = this;

        that._checkFieldsExistence();
        that._addElement('condition', parentGroup, data);
    }

    /*
    * Creates new empty group by given operator and parent group
    * @param {Any} parentGroup - could be html object or nodeId
    * @param {String} groupOperator - 'and'/'or'/'notand'/'notor'
    */
    addGroup(parentGroup, groupOperator) {
        const that = this;

        that._addElement('group', parentGroup, groupOperator);
    }

    /*
    * Removes condition
    * @param {Any} elementNode - HTML element or nodeId of the element
    */
    removeCondition(elementNode) {
        const that = this;

        that._validateNode(elementNode, 'removeCondition');
        that._deleteElement(elementNode, 'condition');
        that._refresh();
    }

    /*
    * Removes a group with all of it's children
    * @param {Any} elementNode - HTML element or nodeId of the element
    */
    removeGroup(elementNode) {
        const that = this;

        that._validateNode(elementNode, 'removeGroup');
        that._deleteElement(elementNode, 'group');
        that._refresh();
    }

    /**
    * Generates string representation of the value
    * @param {Boolean} useLabels - controls the way of string representation. In mode without labels the object is stringified. In mode with
    */
    toString(useLabels) {
        const that = this;

        if (!useLabels) {
            return JSON.stringify(that.value);
        }

        let formattedValueFlat = [],
            groupsWithItems = [];

        for (let i = 0; i < that._valueFlat.length; i++) {
            const item = that._valueFlat[i];
            let formattedItem = {};

            if (item.type === 'condition') {
                const fieldData = that._getFieldByFieldName(item.data[0]),
                    type = fieldData.dataType,
                    category = '[' + (fieldData.label || fieldData.value) + ']',
                    operator = that.localize(item.data[1]),
                    value = ['boolean', 'number'].indexOf(type) !== -1 ? item.data[2] + '' : '\'' + item.data[2] + '\'';

                formattedItem.data = category + ' ' + operator + ' ' + value;
            }
            else {
                formattedItem.data = item.data;
            }

            formattedItem.nodeId = item.nodeId;
            formattedItem.parentId = item.parentId;
            formattedItem.type = item.type;

            formattedValueFlat.push(formattedItem);
        }

        for (let i = 0; i < formattedValueFlat.length; i++) {
            const item = formattedValueFlat[i];
            let group = {};

            if (item.type === 'group') {
                const hasItems = formattedValueFlat.filter(testItem => {
                    return (testItem.parentId === item.nodeId && testItem.type === 'condition');
                });

                if (hasItems.length > 0) {
                    let content = hasItems.map(mappedItem => mappedItem.data),
                        prefix = '',
                        sufix = '',
                        groupOperator = item.data;

                    if (['notand', 'notor'].indexOf(groupOperator) !== -1) {
                        prefix = 'Not (';
                        sufix = ')';
                        groupOperator = groupOperator.substring(3);
                    }

                    group.nodeId = item.nodeId;
                    group.parentId = item.parentId;
                    group.data = item.data;

                    group.structure = prefix + content.join(' ' + that.localize(groupOperator) + ' ') + sufix;
                    groupsWithItems.push(group);
                }
            }
        }

        groupsWithItems = groupsWithItems.filter(item => {
            return (item.structure.length > 1);
        });
        groupsWithItems.sort(function (a, b) {
            return (b.nodeId.split('.').length - a.nodeId.split('.').length);
        });

        for (let i = 0; i < groupsWithItems.length; i++) {
            const curentElement = groupsWithItems[i],
                parentElement = groupsWithItems.filter(item => {
                    return (item.nodeId === curentElement.parentId)
                })[0];

            if (parentElement && parentElement.structure) {
                let groupOperator = parentElement.data;

                if (['notand', 'notor'].indexOf(groupOperator) !== -1) {
                    groupOperator = groupOperator.substring(3);

                    parentElement.structure = parentElement.structure.slice(0, parentElement.structure.length - 1) + ' ' + that.localize(groupOperator) + ' (' + curentElement.structure + '))';
                }
                else {
                    parentElement.structure = parentElement.structure + ' ' + that.localize(groupOperator) + ' (' + curentElement.structure + ')';
                }
            }
        }

        return groupsWithItems[groupsWithItems.length - 1].structure;
    }

    /*
    * Updates content of a condition
    * @param {Any} elementNode - HTML element or nodeId of the element
    * @param {Array} data - an array with a new condition settings
    */
    updateCondition(elementNode, data) {
        const that = this,
            editedItem = that._validateNode(elementNode, 'updateCondition');

        that._validateUserData(data, true);

        editedItem.data = data;
        that._refresh();
    }

    /*
    * Updates content of a group
    * @param {Any} elementNode - HTML element or nodeId of the element
    * @param {String} data - the new state of the group condition operator
    */
    updateGroup(elementNode, data) {
        const that = this,
            editedItem = that._validateNode(elementNode, 'updateGroup');

        that._validateUserData(data);

        editedItem.data = data;
        that._refresh();
    }

    /*
    * Creates new group or condition
    * @param {String} type - 'group' or 'condition'
    * @param {Any} parentGroup - html object or group id
    * @param {Any} data - if type is group - contains group's operator;  if type is condition - dataField, operator and value
    */
    _addElement(type, parentGroup, data/*, noRefresh*/) {
        parentGroup = parentGroup || '0';

        const that = this,
            parentGroups = that._valueFlat.filter(item => {
                return (item.nodeId === parentGroup && item.type === 'group')
            }),
            parentGroupExists = parentGroups.length > 0 ? parentGroups[0] : false,
            siblings = that._valueFlat.filter(item => {
                return item.parentId === parentGroup
            });
        let addGroupAtPosition = 0,
            groupSeparator = '';

        if (!parentGroupExists) {
            that.error(that.localize('wrongParentGroupIndex', { elementType: that.nodeName.toLowerCase(), method: 'addGroup/addCondition' }));
        }

        if (type === 'group') {
            data = data || 'or';
        }
        else {
            if (siblings.filter(item => item.type === 'condition').length === that.maxConditionsPerGroup ||
                that._totalConditions === that.maxConditions) {
                return;
            }

            const defaultDataField = that.fields && that.fields.length > 0 ? that.fields[0].dataField : that._valueFields[0].dataField;

            that._totalConditions++;

            data = data || [];
            data[0] = data[0] || defaultDataField;
            data[1] = data[1] || '=';
            data[2] = typeof data[2] !== undefined ? data[2] : null;
        }

        if (siblings) {
            let siblingsIndexes = siblings.map(index => {
                const indexPath = index.nodeId.split('.');

                return parseInt(indexPath[indexPath.length - 1]);
            });

            siblingsIndexes = (siblingsIndexes.length === 0) ? [0] : siblingsIndexes;
            addGroupAtPosition = siblingsIndexes.reduce(function (a, b) {
                return Math.max(a, b);
            }) + 1;
        }

        if (parentGroup && parentGroup.length > 0) {
            groupSeparator = '.';
        }

        const itemId = parentGroup + groupSeparator + addGroupAtPosition,
            itemData = {
                nodeId: itemId,
                parentId: parentGroup,
                type: type,
                data: data,
                htmlNode: null
            };

        that._valueFlat.push(itemData);
        that._refresh();
    }

    /**
    * Sets condition row's value to null and sets value's container with valuePlaceholder
    */
    _clearConditionsValue(nodeId, type) {
        const that = this,
            itemAsHTML = (that.shadowRoot || that).querySelector('[node-id="' + (nodeId || 0) + '"]'),
            valueContainer = itemAsHTML.querySelector('.lw-value-container');

        for (let i = 0; i < that._valueFlat.length; i++) {
            if (that._valueFlat[i].nodeId === nodeId) {
                const item = that._valueFlat[i],
                    dataType = type ? that.fields.find(field => field.dataField === type).dataType : that.fields.find(field => field.dataField === item.data[0]).dataType;

                item.data[2] = that._defaultValueByType(dataType);
            }
        }

        valueContainer.innerHTML = that.valuePlaceholder;
        valueContainer.closest('.lw-filter-value').setAttribute('placeholder', '');
    }

    /**
    * Converts value(represented as nested array) to flat array. Used about internal data representation
    * @param {Array} groupData - an array with group data
    * @param {String} nodeId - the id of the current element
    */
    _convertValueToFlat(groupData, nodeId) {
        const that = this,
            regEx = /^(and|or|notAnd|notOr)$/i;

        if (!groupData) {
            return;
        }

        const operatorsFilter = groupData.filter(element => ((typeof element === 'string') && element.match(regEx))),
            groupOperator = operatorsFilter ? operatorsFilter[0] : null,
            conditions = groupData.filter(element => {
                return (Array.isArray(element) &&
                    element.length === 3 &&
                    element.filter(subElement => (typeof subElement === 'string') && subElement.match(regEx)).length === 0)
            }),
            subGroups = groupData.filter(element => !conditions.includes(element) && element !== groupOperator);

        if (!operatorsFilter) {
            return;
        }

        const groupSeparator = that._lastProcessedItemInCurrentGroup.parentId ? '.' : '',
            groupNodeId = (that._lastProcessedItemInCurrentGroup.parentId || '') + groupSeparator + ((nodeId || 0));

        if (that._isMaxLevelExceeded(groupNodeId)) {
            return;
        }

        const itemData = {
            nodeId: groupNodeId,
            parentId: that._lastProcessedItemInCurrentGroup.parentId,
            type: 'group',
            data: groupOperator,
            htmlNode: null
        }/*,
            allowedConditionsInGroup = that.maxConditionsPerGroup ? that.maxConditionsPerGroup : conditions.length*/;

        that._valueFlat.push(itemData);
        that._lastProcessedItemInCurrentGroup.position = 0;


        for (let i = 0; i < conditions.length; i++) {
            if (!conditions[i]) {
                break;
            }

            const conditionNodeId = groupNodeId + '.' + ((that._lastProcessedItemInCurrentGroup.position || 0));

            if (that._isMaxLevelExceeded(conditionNodeId)) {
                break;
            }

            const itemData = {
                nodeId: conditionNodeId,
                parentId: groupNodeId,
                type: 'condition',
                data: conditions[i],
                htmlNode: null
            };

            that._totalConditions++;
            that._valueFlat.push(itemData);
            that._lastProcessedItemInCurrentGroup.position++;
        }

        // process nested elements
        for (let i = 0; i < subGroups.length; i++) {
            that._lastProcessedItemInCurrentGroup.parentId = groupNodeId;
            that._convertValueToFlat(subGroups[i], conditions.length + i);
            that._lastProcessedItemInCurrentGroup.position++;
        }
    }

    /**
     * Checks the construction for maxLevel nesting
     */
    _isMaxLevelExceeded(groupId) {
        const that = this,
            valueFlat = that._valueFlat;

        if (that.maxLevel === null || valueFlat.length < 1) {
            return;
        }

        //NOTE: 2 because - 1 is for the 0th (root) group, and -1 because we want to start from 0

        //Checks a specific item
        if (groupId) {
            return groupId.split('.').length - 2 >= that.maxLevel;
        }

        //Checks the whole structure
        for (let i = 0; i < valueFlat.length; i++) {
            const data = valueFlat[i];

            if (data.nodeId.split('.').length - 2 > that.maxLevel) {
                return true;
            }
        }
    }

    /**
    * Handles click event according to the target's type (filter button, add button, delete button, etc.).
    */
    _clickHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.composedPath()[0] : event.target,
            conditionRow = target ? target.closest('.lw-filter-group-condition') : null,
            conditionId = conditionRow ? conditionRow.getAttribute('node-id') : null,
            filterGroup = target ? target.closest('.lw-filter-group') : null,
            filterGroupId = filterGroup ? filterGroup.getAttribute('node-id') : null,
            isAddButton = target.closest('.lw-filter-add-btn'),
            isDeleteButton = target.closest('.lw-filter-delete-btn'),
            isFilterButton = target.closest('.filter-builder-item'),
            itemId = conditionId || filterGroupId,
            item = that._getItemById(itemId);
        let clickedComponent;

        if (that.disabled) {
            return;
        }

        if (isFilterButton || isDeleteButton || isAddButton) {
            if (isFilterButton) {
                if (isFilterButton.classList.contains('lw-filter-field-name')) {
                    clickedComponent = 'fieldButton';
                }
                else if (isFilterButton.classList.contains('lw-filter-operation')) {
                    clickedComponent = 'operationButton';
                }
                else if (isFilterButton.classList.contains('lw-filter-value')) {
                    clickedComponent = 'valueButton';
                }
                else {
                    clickedComponent = 'groupOperationButton';
                }
            }
            else if (isAddButton) {
                clickedComponent = 'addButton';
            }
            else {
                clickedComponent = 'deleteButton';
            }

            that.$.fireEvent('itemClick', {
                id: item.nodeId,
                type: item.type,
                component: clickedComponent,
                data: item.data
            });
        }

        if (isDeleteButton) {
            const groupOperatorRow = target.closest('.lw-filter-group-operator'),
                conditionRow = target.closest('.lw-filter-group-condition');

            that._clickHandlerDeleteButton(groupOperatorRow, conditionRow, filterGroup);
            return;
        }
        else if (isAddButton) {
            that._closeEditor();
            that._contextMenuOptions = that._addOptions;
            that._handleContextMenu(target);
            return;
        }
        else if (isFilterButton) {
            const elementClassList = isFilterButton.classList;

            that._clickHandlerFilterButton(elementClassList, itemId, target);
            return;
        }

        if (that.$.conditionsMenu.opened) {
            that.$.fireEvent('menuClosing');
            that.$.conditionsMenu.close();
            that.$.fireEvent('menuClose');
        }

        const isTargetADropDown = target.closest('.lw-drop-down'),
            targetIsEditor = (that._editor && that._editor.contains(target) || (isTargetADropDown && isTargetADropDown.ownerElement === that._editor)) || target.closest('.lw-custom-editor');

        if (!that._editorIsOpen || !that._editor || targetIsEditor) {
            return;
        }

        if (that._scrollBarDown) {
            delete that._scrollBarDown;
            return;
        }

        that._closeEditor();
    }

    /**
      * Handling click on delete button
      */
    _clickHandlerDeleteButton(groupOperatorRow, conditionRow, filterGroup) {
        const that = this;

        if (that.$.conditionsMenu.opened) {
            that.$.fireEvent('menuClosing');
            that.$.conditionsMenu.close();
            that.$.fireEvent('menuClose');
        }

        that._closeEditor();

        if (groupOperatorRow) {
            that._deleteElement(filterGroup, 'group');
            that._generateValue();
        }
        else if (conditionRow) {
            that._deleteElement(conditionRow);
            that._generateValue();
        }

        that.$.scrollableContainer.refresh();
    }

    /**
    * Handling click on delete buton
    */
    _clickHandlerFilterButton(elementClassList, itemId, target) {
        const that = this;

        if (target.closest('.lw-editors-container')) {
            return;
        }

        that._closeEditor();
        that._editedItem = that._getItemById(itemId);

        if (!elementClassList.contains('lw-filter-field-name') && (!that._editedItem.data || !that._editedItem.data.length)) {
            return;
        }

        if (elementClassList.contains('lw-filter-group-operation')) {
            prepareContextMenu(target, that._groupOperationDescriptions, that._editedItem.data);
            return;
        }
        else if (elementClassList.contains('lw-filter-add-btn')) {
            prepareContextMenu(target, that._groupOperationDescriptions);
        }
        else if (elementClassList.contains('lw-filter-field-name')) {
            if (!that._fields) {
                that._mapFieldsToMenu();
            }

            prepareContextMenu(target, that._fields, that._editedItem.data[0]);
            return;
        }
        else if (elementClassList.contains('lw-filter-operation')) {
            const selectedField = that._getFieldByFieldName(that._editedItem.data[0]);

            if (!selectedField) {
                return;
            }

            let filteredOptions = that._filterOperationDescriptions.slice();

            if (selectedField && selectedField.filterOperations) {
                filteredOptions = that._filterOperationDescriptions.filter(item => {
                    return selectedField.filterOperations.indexOf(item.value) > -1;
                });
            }
            else {
                let filterOperationsByType;

                switch (selectedField.dataType) {
                    case 'number':
                        filterOperationsByType = ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                        break;
                    case 'date':
                        filterOperationsByType = ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                        break;
                    case 'dateTime':
                        filterOperationsByType = ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                        break;
                    case 'boolean':
                        filterOperationsByType = ['=', '<>', 'isblank', 'isnotblank'];
                        break;
                    case 'object':
                        filterOperationsByType = ['isblank', 'isnotblank'];
                        break;
                    case 'string':
                        filterOperationsByType = ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', 'isblank', 'isnotblank'];
                        break;
                    default:
                        filterOperationsByType = ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                        break;
                }

                filteredOptions = that._filterOperationDescriptions.filter(item => {
                    return filterOperationsByType.indexOf(item.value) > -1;
                });
            }

            if (that.showIcons) {
                filteredOptions = filteredOptions.map(item => {
                    item.label = '<div class="lw-filter-builder-icon">' + that.icons[item.value] + '</div><div class="lw-filter-builder-menu-item">' + that.localize(item.value) + '</div>';

                    return item;
                });
            }

            prepareContextMenu(target, filteredOptions.slice(), that._editedItem.data[1]);
            return;
        }
        else {
            that._openEditor(target);
            return;
        }

        function deSelectMenuItem() {
            const alredySelectedItem = that.$.conditionsMenu.querySelector('.lw-selected-menu-item');

            if (alredySelectedItem) {
                alredySelectedItem.classList.remove('lw-selected-menu-item');
            }
        }

        function prepareContextMenu(target, dataSource, selectedItem) {
            deSelectMenuItem();
            that._contextMenuOptions = dataSource.length === 0 ? that._defaultFilterOperationDescriptions : dataSource;
            that._handleContextMenu(target);

            const selectedField = selectedItem,
                chosenMenuItem = that.$.conditionsMenu.querySelector('lw-menu-item[value="' + selectedField + '"]');

            if (!that.$.conditionsMenu.opened || !chosenMenuItem) {
                return;
            }

            chosenMenuItem.classList.add('lw-selected-menu-item');
        }
    }

    /**
    * Closes an editor and sets the new value in the value's cotainer
    * @param {Boolean} preventEventFiring (optional).
    */
    _closeEditor(preventEventFiring) {
        const that = this;
        let storedValue;

        if (!that._editedItem || !that._editorIsOpen) {
            return;
        }

        if (that._editor === that.$.dateTimePickerEditor) {
            that._editor._inputChangeHandler();
            storedValue = that._editor.value;
            if (storedValue) {
                storedValue = storedValue.toDate();
            }
        }
        else if (that._editor === that.$.checkBoxEditor) {
            storedValue = that._editor.checked;
        }
        else if (that._editor === that.$.customEditor) {
            storedValue = that._selectedCustomCondition.handleValue(that._editor);
        }
        else if (that._editor === that.$.numericTextBoxEditor) {
            that._editor._inputBlurHandler();
            storedValue = that._editor.value;
        }
        else {
            const selectedField = that._getFieldByFieldName(that._editedItem.data[0]);

            if (selectedField.dataType === 'array') {
                storedValue = that._editor.value.split(',');
            }
            else if (selectedField.dataType === 'object') {
                storedValue = JSON.parse(that._editor.value);
            }
            else {
                storedValue = that._editor.value;
            }
        }

        const editedItem = that._editedItem,
            editedRow = editedItem.htmlNode,
            nodeId = editedItem.nodeId,
            valueDataType = that._getFieldByFieldName(editedItem.data[0]).dataType,
            editedHTMLvalueComponent = editedRow.querySelector('.lw-filter-value'),
            editedHTMLvalueContainer = editedRow.querySelector('.lw-value-container'),
            eventData = {
                value: storedValue,
                valueType: valueDataType || 'string',
                editedItem: editedItem
            };

        that.$.fireEvent('editorClosing', eventData);
        that._updateValueInFlatArray(nodeId, storedValue, 'value', (valueDataType || 'string'));
        that._generateValue(preventEventFiring);
        editedHTMLvalueComponent.removeAttribute('edited');
        that.$.editorsContainer.removeAttribute('open');

        if (that._editor === that.$.checkBoxEditor) {
            editedHTMLvalueContainer.innerHTML = that._editor.checked ? 'true' : 'false';
        }
        else if (that._editor === that.$.customEditor) {
            const value = that._selectedCustomCondition.valueTemplate(that._editor);
            editedHTMLvalueContainer.innerHTML = value;
        }
        else {
            editedHTMLvalueContainer.innerHTML = that._formatValueStringRepresentation(that._editor.value, that._editedItem.data[0]);
        }

        that._editor.classList.add('lw-hidden');
        that._editorIsOpen = that._enterIsPressedInEditor = false;
        that.$.fireEvent('editorClose', eventData);
        that.$.scrollableContainer.refresh();
    }

    _defaultValueByType(type) {
        let defaultValue;

        switch (type) {
            case 'number':
                defaultValue = 0;
                break;
            case 'date':
            case 'dateTime': {
                defaultValue = new Date();
                defaultValue.setHours(0, 0, 0);
                break;
            }
            case 'boolean':
                defaultValue = false;
                break;
            case 'object':
                defaultValue = null;
                break;
            default:
                defaultValue = '';
        }

        return defaultValue;
    }

    /**
    * Removes a condition and it's HTML representation
    * @param {Any} elementNode.
    * @param {String} type.
    */
    _deleteElement(elementNode, type) {
        const that = this,
            actualElement = elementNode instanceof HTMLElement ? elementNode :
                that._valueFlat.find(item => item.nodeId === elementNode).htmlNode,
            nodeId = typeof elementNode === 'string' ? elementNode : elementNode.getAttribute('node-id');

        if (!nodeId || nodeId.length === 1) {
            return;
        }

        type === 'group' ? deleteGroup(nodeId) : deleteCondition(nodeId);

        function deleteCondition(nodeId) {
            const items = that._valueFlat.filter(item => {
                return (nodeId === item.nodeId);
            });
            let item = items ? items[0] : null;

            that._valueFlat.splice(that._valueFlat.indexOf(item), 1);
            that._totalConditions--;
        }

        function deleteGroup(nodeId) {
            const items = that._valueFlat.filter(item => {
                return (nodeId === item.nodeId);
            }),
                item = items ? items[0] : null;

            for (let i = 0; i < that._valueFlat.length; i++) {
                const nestedItem = that._valueFlat[i],
                    nestedNodeId = nestedItem.nodeId;

                if (nestedItem.parentId === nodeId) {
                    nestedItem.type === 'group' ? deleteGroup(nestedNodeId) : deleteCondition(nestedNodeId);
                }
            }

            (that._valueFlat.indexOf(item) > -1) && that._valueFlat.splice(that._valueFlat.indexOf(item), 1);
        }

        for (let i = (that._valueFlat.length - 1); i >= 0; i--) {
            const parentGroup = that._valueFlat.filter(item => {
                return (that._valueFlat[i].parentId === item.nodeId);
            });

            if (parentGroup.length === 0 && that._valueFlat[i].nodeId !== '0') {
                that._valueFlat.splice(i, 1);
                that._totalConditions--;
            }
        }

        that._generateValue();
        actualElement.parentElement.removeChild(actualElement);

        function updateNodeIds(siblings, parentId) {
            siblings.forEach((element, index) => {
                const valueFlatItem = that._valueFlat.find(item => item.htmlNode === element),
                    id = parentId + '.' + index;

                element.setAttribute('node-id', id);
                valueFlatItem.parentId = parentId;
                valueFlatItem.nodeId = id;

                if (element.classList.contains('lw-filter-group')) {
                    updateNodeIds(Array.from(element.children[1].children), id);
                }
            });
        }

        updateNodeIds(Array.from(that.$.contentContainer.firstElementChild.children[1].children), '0');
    }

    /**
    * Document click handler - closes menu and/or editor on click outside of the element
    */
    _documentClickHandler(event) {
        const that = this;

        if ((that.isInShadowDOM ? event.composedPath()[0] : event.target).closest('lw-filter-builder')) {
            that._clickHandler(event);
            return;
        }

        if (that._editorIsOpen && !that._scrollBarDown) {
            that._closeEditor();
        }

        delete that._scrollBarDown;
    }

    /**
     * down handler
     */
    _downHandler(event) {
        const that = this;

        if ((that.shadowRoot || that.isInShadowDOM ? event.composedPath()[0] : event.target).closest('lw-scroll-bar')) {
            that._scrollBarDown = true;
        }
        else {
            delete that._scrollBarDown;
        }
    }

    /**
     * Editor's change handler
     */
    _containerChangeHandler(event) {
        event.stopPropagation();
    }

    /**
    * Generates HTML structure from flat array and adds/replaces
    * @param {Array} data - contains dataField, operator and value
    */
    _emptyElementsStructure(emptyValueFlat) {
        const that = this,
            contentContainer = that.$.contentContainer;

        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.firstChild);
        }

        that._valueFlat = emptyValueFlat ? [] : that._valueFlat;
        that._lastProcessedItemInCurrentGroup = { parentId: null, id: null, position: null };
    }

    /**
    * Creates filter group row
    * @param {String} groupOperator (optional).
    */
    _filterGroupRow(groupOperator) {
        const that = this;

        groupOperator = that.localize(groupOperator || 'or');

        let groupRow = document.createElement('div'),
            template = `<span class="lw-filter-delete-btn"></span>
                <span class="filter-builder-item lw-filter-group-operation">${groupOperator}</span>
                <span class="lw-filter-add-btn"></span>`;

        groupRow.className = 'lw-filter-group-operator';
        groupRow.innerHTML = template;
        groupRow.data = groupOperator || 'or';//

        return groupRow;
    }

    /**
    * Removes a condition and it's HTML representation
    * @param {Any} value.
    * @param {String} field.
    */
    _formatValueStringRepresentation(value, field) {
        const that = this,
            fieldData = that._getFieldByFieldName(field);
        let valueFormattedByType;

        if (!fieldData) {
            return value;
        }

        if (((!value || value.length === 0) && fieldData.dataType !== 'boolean' && (fieldData.dataType === 'number' && value === null)) || (fieldData.dataType === 'string' && (!value || value.length === 0))) {
            return that.valuePlaceholder;
        }

        switch (fieldData.dataType) {
            case 'date':
            case 'dateTime':
                if (value) {
                    value = validateDateTimeValue(value);
                    value.calendar.days = that._localizedDays;
                    value.calendar.months = that._localizedMonths;
                    value.calendar.locale = that.locale;
                    LW.Utilities.DateTime.cache = [];
                    valueFormattedByType = value.toString(fieldData.dataType === 'date' ? that.formatStringDate : that.formatStringDateTime);
                }
                else {
                    valueFormattedByType = that.valuePlaceholder;
                }

                break;
            case 'array':
                valueFormattedByType = typeof value === 'string' ? value.split(',') : value;
                break;
            case 'object':
                valueFormattedByType = typeof value === 'string' ? value : JSON.stringify(value);
                break;
            case 'number':
                valueFormattedByType = value;
                break;
            case 'boolean':
                valueFormattedByType = value === false ? 'false' : 'true';
                break;
            default:
                valueFormattedByType = value + '';
                break;

        }

        if (!that.valueFormatFunction) {
            return valueFormattedByType;
        }

        function validateDateTimeValue(value) {
            if (value === 0 || typeof value === 'number' || typeof value === 'string' || value === true || value === '' || value === '0' ||
                Array.isArray(value) || typeof value === 'object' && value.constructor === Date) {
                return new LW.Utilities.DateTime(value);
            }
            else {
                return value;
            }
        }

        return that.valueFormatFunction(valueFormattedByType, field, (fieldData.dataType || 'string'));
    }

    /**
    * Generates HTML structure from flat array and adds/replaces
    */
    _generateHTMLStructureFromFlatValue() {
        const that = this,
            fragment = document.createDocumentFragment();

        if (!that._valueFlat || that._valueFlat.length === 0) {
            return;
        }

        for (let i = 0; i < that._valueFlat.length; i++) {
            const item = that._valueFlat[i],
                customOperation = that.customOperations ? that.customOperations.find(operation => operation.name === item.data[1]) : false,
                parentGroupHTMLcontainer = item.parentId ? (that.shadowRoot || that).querySelector('[node-id="' + item.parentId + '"]').
                    querySelector('.lw-filter-group-condition-container') : that.$.contentContainer;

            if (item.type === 'group') {
                const groupContainerBlock = document.createElement('div'),
                    groupOperatorBlock = that._filterGroupRow(item.data),
                    groupConditionsContainerBlock = document.createElement('div');

                groupContainerBlock.className = 'lw-filter-group';
                groupConditionsContainerBlock.className = 'lw-filter-group-condition-container';
                groupContainerBlock.appendChild(groupOperatorBlock);
                groupContainerBlock.appendChild(groupConditionsContainerBlock);
                fragment.appendChild(groupContainerBlock);

                groupContainerBlock.setAttribute('node-id', item.nodeId);
                that._valueFlat[i].htmlNode = groupContainerBlock;

                if (that._isMaxLevelExceeded(item.nodeId + '.0')) {
                    groupContainerBlock.setAttribute('max-level', '');
                }
            }
            else {
                const condition = that._newFilterConditionRow(item.data);

                condition.setAttribute('node-id', item.nodeId);
                fragment.appendChild(condition);
                that._valueFlat[i].htmlNode = condition;

                if (['isblank', 'isnotblank'].indexOf(item.data[1]) !== -1 || (customOperation && customOperation.hideValue)) {
                    condition.children[3].classList.add('lw-hidden');
                }
            }

            parentGroupHTMLcontainer.appendChild(fragment);
        }
    }

    /**
    * Generates the new value of "value" property from flat array
    */
    _generateValue() {
        const that = this;
        let groupsWithItems = [],
            value = that._valueFlat.slice();

        createNestedArray(value);

        function createNestedArray(flatValue) {
            for (let i = 0; i < flatValue.length; i++) {
                const item = flatValue[i];
                let group = {};

                if (item.type === 'group') {
                    group.nodeId = item.nodeId;
                    group.parentId = item.parentId;
                    group.structure = [item.data || 'or'];
                    groupsWithItems.push(group);
                }
            }

            for (let i = 0; i < groupsWithItems.length; i++) {
                const group = groupsWithItems[i],
                    conditions = flatValue.filter(item => {
                        return (item.parentId === group.nodeId && item.type === 'condition');
                    });

                for (let i = 0; i < conditions.length; i++) {
                    i === 0 ? group.structure.unshift(conditions[i].data) : group.structure.push(conditions[i].data);
                }
            }

            groupsWithItems = groupsWithItems.filter(item => {
                return (item.structure.length > 1);
            });
            groupsWithItems.sort(function (a, b) {
                return (b.nodeId.split('.').length - a.nodeId.split('.').length);
            });

            for (let i = 0; i < groupsWithItems.length; i++) {
                const curentElement = groupsWithItems[i],
                    parentElement = groupsWithItems.filter(item => {
                        return (item.nodeId === curentElement.parentId)
                    })[0];

                if (parentElement && parentElement.structure) {
                    parentElement.structure.push(curentElement.structure);
                }
            }
        }

        if (groupsWithItems.length > 0) {
            that.value = that._valueFlat.length > 1 ? groupsWithItems[groupsWithItems.length - 1].structure : groupsWithItems;
        }
        else {
            that.value = [that._getItemById('0').data];
        }

        const oldValueAsString = JSON.stringify(that.value);

        if (that._oldValueAsString !== oldValueAsString) {
            that._oldValueAsString = oldValueAsString;
            that.$.fireEvent('change', { 'value': JSON.parse(oldValueAsString) });
        }
    }

    /**
    * Return field's data by given field name
    * @param {String} fieldName
    */
    _getFieldByFieldName(fieldName) {
        const that = this,
            fields = that.fields ? that.fields.filter(item => {
                return item.dataField === fieldName;
            }) : that._valueFields.filter(item => {
                return item.dataField === fieldName;
            });

        return fields[0] || null;
    }

    /**
    * Generates an array of field objecst, used as a backup when fields property is not set
    */
    _getFieldsFromValue() {
        const that = this,
            items = that._valueFlat,
            fieldsNames = [],
            fields = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].type === 'condition') {
                const fieldName = items[i].data[0];

                if (fieldsNames.indexOf(fieldName) === -1) {
                    const fieldElement = { label: fieldName, dataField: fieldName, dataType: 'string', format: null };

                    fieldsNames.push(fieldName);
                    fields.push(fieldElement);
                }
            }
        }

        that._valueFields = fields;
    }

    /**
    * Return item's data by given id
    * @param {String} id - item's id (or parent id - demending on the second parameter)
    * @param {Boolean} isParent (optional)  - of the items is searched by parentId
    */
    _getItemById(id, isParent) {
        const that = this,
            matches = that._valueFlat.filter(item => {
                if (isParent) {
                    return item.parentId === id;
                }
                return item.nodeId === id;
            }),
            editedItem = matches.length > 0 ? matches[0] : null;

        return editedItem;
    }

    /**
    * Handles context menu position
    * @param {HTML element} target (optional) - the component which is clicked
    */
    _handleContextMenu(target) {
        const that = this;

        if (that._selectedElement === target && that.$.conditionsMenu.opened) {
            return;
        }

        const targetCoordinates = target.getBoundingClientRect(),
            elementCoordinates = that.getBoundingClientRect(),
            offsetTop = targetCoordinates.height,
            x = targetCoordinates.left + that.$.contentContainer.scrollLeft - elementCoordinates.left,
            y = targetCoordinates.top + that.$.contentContainer.scrollTop - elementCoordinates.top + offsetTop;

        if (target.closest('.lw-filter-add-btn') && that.restrictedMode) {
            that._checkFieldsExistence();

            const conditionField = that.fields ? that.fields[0] : that._valueFields[0],
                operation = (conditionField.filterOperations && conditionField.filterOperations.length > 0) ? conditionField.filterOperations[0] : '=';

            that._addElement('condition', 0, [conditionField.dataField, operation, that._defaultValueByType(conditionField.dataType)]);
            return;
        }

        that._closeEditor();

        if (that.disableContextMenu) {
            that._selectedElement = target;
            return;
        }

        that.$.conditionsMenu.dataSource = that._contextMenuOptions;
        that.$.conditionsMenu.open(x, y);
        that._selectedElement = target;
        that.$.scrollableContainer.refresh();
    }

    /**
    * Add custom operations to the menu's operations list
    */
    _handleCustomOperations() {
        const that = this;

        that._filterOperationDescriptions = that._defaultFilterOperationDescriptions;

        for (let i = 0; i < that.customOperations.length; i++) {
            const operation = that.customOperations[i];

            that._filterOperationDescriptions.push({
                label: operation.label,
                value: operation.name,
                custom: true,
                index: i,
                editorTemplate: operation.editorTemplate,
                valueTemplate: operation.valueTemplate,
                handleValue: operation.handleValue
            });
        }
    }

    /**
    * Initializes Editors instance if it's not initialized.
    */
    _initializeEditor(editor) {
        const that = this,
            editorTagName = 'lw-' + LW.Utilities.Core.toDash(editor),
            editorElement = document.createElement(editorTagName);

        if (editor === 'numericTextBox') {
            editorElement.spinButtons = true;
            editorElement.inputFormat = 'floatingPoint';
        }
        else if (editor === 'dateTimePicker') {
            editorElement.calendarButton = true;
            editorElement.dropDownDisplayMode = 'auto';
            editorElement.enableMouseWheelAction = true;
            editorElement.locale = that.locale;

            if (!editorElement.messages[that.locale]) {
                editorElement.messages[that.locale] = {};
            }

            editorElement.messages[that.locale].dateTabLabel = that.localize('dateTabLabel');
            editorElement.messages[that.locale].timeTabLabel = that.localize('timeTabLabel');
        }

        editorElement.tabIndex = '1';
        editorElement.theme = that.theme;
        editorElement.animation = that.animation;
        that.$[editor + 'Editor'] = editorElement;
        editorElement.$ = LW.Utilities.Extend(editorElement);
        editorElement.className = editorTagName + '-editor lw-hidden';
        that.$.editorsContainer.appendChild(editorElement);
        that['_' + editor + 'Initialized'] = true;
    }

    /**
     * InnerContainer keydown eventHandler
     * @param {any} event
     */
    _innerContainerKeydownHandler(event) {
        const that = this;

        if (event.key !== 'Escape' && event.key !== 'Enter' || !that._editorIsOpen) {
            return;
        }

        that._closeEditor();
    }

    /**
    * Updates value on blur
    */
    _inputBlurHandler() {
        const that = this;
        let storedValue;

        if (that._editor === that.$.dateTimePickerEditor) {
            storedValue = that._editor.value;

            if (storedValue) {
                storedValue = storedValue.toDate();
            }
        }
        else if (that._editor === that.$.checkBoxEditor) {
            storedValue = that._editor.checked;
        }
        else if (that._editor === that.$.customEditor) {
            storedValue = that._selectedCustomCondition.handleValue(that._editor);
        }
        else {
            const selectedField = that._getFieldByFieldName(that._editedItem.data[0]);

            if (selectedField.dataType === 'array') {
                storedValue = that._editor.value.split(',');
            }
            else if (selectedField.dataType === 'object') {
                storedValue = JSON.parse(that._editor.value);
            }
            else {
                storedValue = that._editor.value;
            }

            //   storedValue = that._editor.value;
        }

        const editedItem = that._editedItem,
            nodeId = editedItem.nodeId,
            valueDataType = that._getFieldByFieldName(editedItem.data[0]).dataType;


        that._updateValueInFlatArray(nodeId, storedValue, 'value', (valueDataType || 'string'));
        that._generateValue();
    }

    /**
     * Localizes default values for the menus.
     */
    _localizeInitialValues() {
        const that = this,
            localizedNames = LW.Utilities.DateTime.getLocalizedNames(that.locale);

        that._addOptions = [
            { label: that.localize('addCondition'), value: 'addCondition' },
            { label: that.localize('addGroup'), value: 'addGroup' }
        ];
        that._groupOperationDescriptions = [
            { label: that.localize('and'), value: 'and' },
            { label: that.localize('notand'), value: 'notand' },
            { label: that.localize('or'), value: 'or' },
            { label: that.localize('notor'), value: 'notor' }
        ];
        that._defaultFilterOperationDescriptions = that._filterOperationDescriptions = [
            { label: that.localize('='), value: '=', custom: false },
            { label: that.localize('<>'), value: '<>', custom: false },
            { label: that.localize('>'), value: '>', custom: false },
            { label: that.localize('>='), value: '>=', custom: false },
            { label: that.localize('<'), value: '<', custom: false },
            { label: that.localize('<='), value: '<=', custom: false },
            { label: that.localize('startswith'), value: 'startswith', custom: false },
            { label: that.localize('endswith'), value: 'endswith', custom: false },
            { label: that.localize('contains'), value: 'contains', custom: false },
            { label: that.localize('notcontains'), value: 'notcontains', custom: false },
            { label: that.localize('isblank'), value: 'isblank', custom: false },
            { label: that.localize('isnotblank'), value: 'isnotblank', custom: false }
        ];

        that._localizedDays = localizedNames.days;
        that._localizedMonths = localizedNames.months;
    }

    /**
    * Map fields data source to match menu's label and value.
    */
    _mapFieldsToMenu() {
        const that = this;

        if (!that.fields && !that._valueFields) {
            return;
        }

        that._fields = (that.fields || that._valueFields).map(field => {
            let menuField = {};

            menuField.label = field.label;
            menuField.value = field.dataField;
            menuField.dataType = field.dataType;

            return menuField;
        });
    }

    /**
    * Handles menu item click.
    */
    _menuItemClickHandler(event) {
        const that = this,
            selectedElement = that._selectedElement.closest('.filter-builder-item'),
            details = event.detail,
            value = details.value,
            label = that.localize(value) || details.label;

        if (selectedElement) {
            const selectedIsCondition = selectedElement.closest('.lw-filter-group-condition'),
                selectedIsGroup = selectedElement.closest('.lw-filter-group'),
                nodeId = selectedIsCondition ? selectedIsCondition.getAttribute('node-id') : selectedIsGroup.getAttribute('node-id');
            let updatedPosition = 2;

            selectedElement.innerHTML = label;
            selectedElement.value = value;

            if (that._editedItem && selectedElement.classList.contains('lw-filter-field-name') && that._editedItem.data[0] !== value) {
                const valueHTMLnode = selectedElement.parentNode.querySelector('.lw-filter-value'),
                    customOperationsWithoutValue = that.customOperations.map(item => {
                        if (item.hideValue) {
                            return item.name;
                        }
                    }).filter(item => item),
                    operationsWithoutValue = customOperationsWithoutValue.concat(['isblank', 'isnotblank']);

                that._clearConditionsValue(nodeId, value);
                that._setInitialFilterOperation(nodeId, value);
                (operationsWithoutValue.indexOf(value) > -1) ? valueHTMLnode.classList.add('lw-hidden') : valueHTMLnode.classList.remove('lw-hidden');
            }

            if (selectedElement.classList.contains('lw-filter-field-name')) {
                updatedPosition = 0;
            }
            else if (selectedElement.classList.contains('lw-filter-operation')) {
                const valueHTMLnode = selectedElement.parentNode.querySelector('.lw-filter-value');
                let customOperation;

                if (that.customOperations) {
                    const customOperations = that.customOperations.filter(operation => {
                        return operation.name === value;
                    });

                    if (customOperations.length > 0) {
                        customOperation = customOperations[0];
                    }
                }

                if (['isblank', 'isnotblank'].indexOf(value) > -1 || (customOperation && customOperation.hideValue)) {
                    that._clearConditionsValue(nodeId);
                    valueHTMLnode.classList.add('lw-hidden');
                }
                else {
                    valueHTMLnode.classList.remove('lw-hidden');
                }

                updatedPosition = 1;
            }
            else if (selectedElement.classList.contains('lw-filter-group-operation')) {
                for (let i = 0; i < that._valueFlat.length; i++) {
                    if (that._valueFlat[i].nodeId === nodeId) {
                        that._valueFlat[i].data = selectedElement.value;
                    }
                }

                that._generateValue();
                that.$.scrollableContainer.refresh();
                return;
            }

            for (let i = 0; i < that._valueFlat.length; i++) {
                if (that._valueFlat[i].nodeId === nodeId) {
                    that._valueFlat[i].data[updatedPosition] = selectedElement.value;
                }
            }

            that._generateValue();
            that.$.scrollableContainer.refresh();
            return;
        }

        const selectedFilterGroup = that._selectedElement.closest('.lw-filter-group'),
            selectedFilterGroupId = selectedFilterGroup.getAttribute('node-id');

        if (that._isMaxLevelExceeded(selectedFilterGroupId + '.0')) {
            return;
        }

        if (value === 'addCondition' && ((that.maxConditions && (that._totalConditions < that.maxConditions)) || !that.maxConditions)) {
            that._checkFieldsExistence();

            const conditionField = that.fields ? that.fields[0] : that._valueFields[0],
                operation = (conditionField.filterOperations && conditionField.filterOperations.length > 0) ? conditionField.filterOperations[0] : '=';

            that._addElement('condition', selectedFilterGroupId, [conditionField.dataField, operation, that._defaultValueByType(conditionField.dataType)]);
        }
        else if (value === 'addGroup') {
            that._addElement('group', selectedFilterGroupId, 'and');
        }

        that.$.scrollableContainer.refresh();
    }

    _setInitialFilterOperation(nodeId, fieldName) {
        const that = this;
        const newField = that.fields.find(field => field.dataField === fieldName),
            selectedItem = that._valueFlat.find(item => item.nodeId === nodeId),
            operationHtmlNode = selectedItem.htmlNode.getElementsByClassName('lw-filter-operation')[0],
            newFieldOperation = (newField && newField.filterOperations && newField.filterOperations.length > 0) ? newField.filterOperations[0] : '=';
        let newFieldOperationLabel = that.localize(newFieldOperation);

        if (!newFieldOperationLabel) {
            newFieldOperationLabel = that.customOperations.find(operation => operation.name === newFieldOperation).label;
        }

        selectedItem.data[1] = newFieldOperation;
        operationHtmlNode.innerHTML = newFieldOperationLabel;
    }

    _checkFieldsExistence() {
        const that = this;

        if ((!that.fields || that.fields.length === 0) && (!that._valueFields || that._valueFields.length === 0)) {
            that.error(that.localize('missingFields', { elementType: that.nodeName.toLowerCase() }));
        }
    }

    /**
    * Creates new filter condition row
    * @param {Array} condition (optional). An array with a condition params. If "condition" parameter is not set - in the method is used default value
    */
    _newFilterConditionRow(condition) {
        condition = condition || [];

        const that = this,
            dataField = condition[0] ? condition[0] : that.fields[0].dataField,
            value = that._formatValueStringRepresentation(condition[2], condition[0]),
            dataFieldsWithLabels = that.fields ? that.fields.filter(item => {
                return item.dataField === dataField;
            }) : that._valueFields.filter(item => {
                return item.dataField === dataField;
            }),
            dataFieldsLabel = dataFieldsWithLabels.length > 0 ? dataFieldsWithLabels[0].label : condition[0];
        let operation = that.localize(condition[1]);

        if (!operation && that.customOperations && that.customOperations.length > 0) {
            operation = that.customOperations.find(operation => operation.name === condition[1]).label;
        }

        let conditionRow = document.createElement('div'),
            template = `<span class="lw-filter-delete-btn"></span>
                <span class="filter-builder-item lw-filter-field-name">${dataFieldsLabel}</span>
                <span class="filter-builder-item lw-filter-operation">${operation || ''}</span>
                <span class="filter-builder-item lw-filter-value"><span class="lw-value-container">${value}</span></span>`;

        conditionRow.className = 'lw-filter-group-condition';
        conditionRow.innerHTML = template;

        return conditionRow;
    }

    /**
    * Open an editor at the position of the current editted condition value container
    * @param {Html element} target - the clicked HTML element. Used to be localized element's data and set into editor
    */
    _openEditor(target) {
        const that = this,
            id = target && target.closest('.lw-filter-group-condition') ? target.closest('.lw-filter-group-condition').getAttribute('node-id') : null,
            valueContainer = target.closest('.lw-filter-value'),
            editedItem = that._getItemById(id),
            field = editedItem.data[0] || that.fields[0].dataField || that._valueFields[0].dataField,
            fieldData = that._getFieldByFieldName(field);
        let value;

        if (editedItem) {
            value = editedItem.data[2];

            if (value === undefined) {
                value = '';
            }
        }
        else {
            value = '';
        }

        if (!fieldData) {
            return;
        }

        if (that._editorIsOpen) {
            that._closeEditor();
        }

        if (that.$.conditionsMenu.opened) {
            that.$.conditionsMenu.close();
        }
        valueContainer.setAttribute('edited', '');
        that._editedItem = editedItem;

        const fields = that.fields || that._valueFields,
            fieldItemsMatch = fields.filter(item => {
                return item.dataField === field;
            }),
            foundCustomConditions = that._filterOperationDescriptions.filter(item => {
                return ((item.value === editedItem.data[1]) && item.custom);
            }),
            fieldItem = fieldItemsMatch.length > 0 ? fieldItemsMatch[0] : null,
            fieldType = (fieldData.lookup && fieldData.lookup.dataSource) ? 'lookup' : fieldItem.dataType;

        if (foundCustomConditions.length === 0 || !foundCustomConditions[0].editorTemplate) {
            that._openEditorByFieldType(fieldType, value, fieldData);
        }
        else {
            that._selectedCustomCondition = foundCustomConditions[0];
            that._openCustomEditor(fieldType, value, fieldData);
        }

        that.$.fireEvent('editorOpening', {
            value: value,
            type: fieldType,
            editedItem: editedItem
        });

        setTimeout(function () {
            that._editor.focus();

            if (that._editor === that.$.numericTextBoxEditor || that._editor === that.$.textBoxEditor) {
                that.$.scrollableContainer.scrollLeft = that.$.scrollableContainer.$.scrollViewerContainer.scrollLeft;
                that.$.scrollableContainer.scrollTop = that.$.scrollableContainer.$.scrollViewerContainer.oldTop;
                that.$.scrollableContainer.$.scrollViewerContainer.scrollLeft = 0;
                that.$.scrollableContainer.$.scrollViewerContainer.scrollTop = 0;
                that._editor.$.input.selectionStart = that._editor.$.input.selectionEnd = that._editor.$.input.value.length;
            }

            that.$.scrollableContainer.refresh();
            that.$.fireEvent('editorOpen', {
                value: value,
                type: fieldType,
                editedItem: editedItem
            });
        }, 0);

        that._editor.classList.remove('lw-hidden');
        that._editorIsOpen = true;
        that.$.editorsContainer.setAttribute('open', '');
        valueContainer.appendChild(that.$.editorsContainer);
        that.$.scrollableContainer.refresh();
    }

    /**
    * Open specific editor, regarding field type settings and set it's value
    * @param {String} fieldType - type of the edited field, each type has different handling
    * @param {Any} value - the value, that must be set to the editor
    */
    _openEditorByFieldType(fieldType, value, fieldData) {
        const that = this;

        switch (fieldType) {
            case 'lookup':
                if (!that._comboBoxInitialized) {
                    that._initializeEditor('comboBox');
                }

                that._editor = that.$.comboBoxEditor;
                that._editor.dataSource = fieldData.lookup.dataSource;
                that._editor.dropDownAppendTo = that.$.container;
                that._editor.selectedValues = [value];
                break;
            case 'boolean':
                if (!that._checkBoxInitialized) {
                    that._initializeEditor('checkBox');
                }

                that._editor = that.$.checkBoxEditor;
                that._editor.checked = !!value;
                break;
            case 'dateTime':
                if (!that._dateTimePickerInitialized) {
                    that._initializeEditor('dateTimePicker');
                }

                that._editor = that.$.dateTimePickerEditor;
                that._editor.formatString = that.formatStringDateTime;
                that._editor.dropDownAppendTo = that.$.container;
                that._editor.value = value;
                break;
            case 'date':
                if (!that._dateTimePickerInitialized) {
                    that._initializeEditor('dateTimePicker');
                }

                that._editor = that.$.dateTimePickerEditor;
                that._editor.formatString = that.formatStringDate;
                that._editor.dropDownAppendTo = that.$.container;
                that._editor.value = value;
                break;
            case 'number':
                if (!that._numericTextBoxInitialized) {
                    that._initializeEditor('numericTextBox');
                }

                value = value ? value : 0;
                that._editor = that.$.numericTextBoxEditor;
                that._editor.value = value;
                break;
            case 'array':
                if (!that._textBoxInitialized) {
                    that._initializeEditor('textBox');
                }

                that._editor = that.$.textBoxEditor;
                that._editor.value = value.toString();
                break;
            case 'object':
                if (!that._textBoxInitialized) {
                    that._initializeEditor('textBox');
                }

                value = value ? value : {};
                that._editor = that.$.textBoxEditor;
                that._editor.value = JSON.stringify(value);
                break;
            default:
                if (!that._textBoxInitialized) {
                    that._initializeEditor('textBox');
                }

                that._editor = that.$.textBoxEditor;
                that._editor.value = value + '';
        }
    }

    /**
    * Open custom editor
    */
    _openCustomEditor(fieldType, value, fieldData) {
        const that = this,
            editorStructure = that.customOperations[that._selectedCustomCondition.index].editorTemplate(fieldType, value, fieldData);

        that.$.customEditor.innerHTML = '';

        if (editorStructure) {
            that.$.customEditor.appendChild(editorStructure);
        }

        that._editor = that.$.customEditor;
    }

    /**
    * Refreshes the structure
    */
    _refresh() {
        const that = this;

        that._generateValue();
        that._emptyElementsStructure();
        that._generateHTMLStructureFromFlatValue();
        that.$.scrollableContainer.refresh();
    }

    /**
    * Handles scrollbars on resize
    */
    _resizeHandler() {
        const that = this;

        that.$.scrollableContainer.refresh();
    }

    /**
     * scrollViewer wheel handler.
     */
    _scrollViewerWheelHandler(event) {
        const that = this;

        if (event.type === 'wheel' && that.$.scrollableContainer.scrollHeight) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    /**
    * Set default values for the menus
    */
    _setInitialValues() {
        const that = this;

        that._mapFieldsToMenu();
        that._localizeInitialValues();
        that.$.conditionsMenu.dropDownAppendTo = that.$.container;
        that.$.conditionsMenu.dataSource = that._groupOperationDescriptions;

        that._valueFlat = [];
        that._lastProcessedItemInCurrentGroup = { parentId: null, id: null, position: null };
    }

    /**
     * Updates innerHTML of all fields.
     */
    _updatePlaceholder() {
        const that = this;

        for (let i = 0; i < that._valueFlat.length; i++) {
            const item = that._valueFlat[i];

            if (item.type === 'condition' && (item.data[2] === null || item.data[2] === '')) {
                item.htmlNode.querySelector('.lw-value-container').innerHTML = that.valuePlaceholder;
            }
        }

        if (that.$.textBoxEditor) {
            that.$.textBoxEditor.placeholder = that.valuePlaceholder;
        }
    }

    /**
    * Updates value in the flat array.
    * @param {String} nodeId
    * @param {Any} value
    * @param {String} updatedComponent
    * @param {String} valueType
    */
    _updateValueInFlatArray(nodeId, value, updatedComponent, valueType) {
        const that = this;

        if (!nodeId || that.disabled) {
            return;
        }

        valueType = valueType || 'string';
        updatedComponent = updatedComponent || 'value';

        if (value !== null) {
            switch (valueType) {
                case 'number':
                    value = parseFloat(value);
                    break;
                case 'boolean':
                    value = !!value;
                    break;
                case 'string':
                    value = value + '';
                    break;
            }
        }

        for (let i = 0; i < that._valueFlat.length; i++) {
            if (that._valueFlat[i].nodeId === nodeId) {
                switch (updatedComponent) {
                    case 'column':
                        that._valueFlat[i].data[0] = value;
                        break;
                    case 'filterCondition':
                        that._valueFlat[i].data[1] = value;
                        break;
                    case 'value':
                        that._valueFlat[i].data[2] = value;
                        break;
                    case 'groupCondition':
                        that._valueFlat[i].data = value;
                        break;
                }
            }
        }
    }

    /*
    * Validates if node exists in the internal element's structure.
    * @param {Any} elementNode - HTML element or nodeId of the element
    * @param {String} methodName - an array with a new condition settings
    */
    _validateNode(elementNode, methodName) {
        const that = this;
        let editedItem;

        if (elementNode instanceof HTMLElement) {
            editedItem = that._getItemById(elementNode.getAttribute('node-id'));
        }
        else if (typeof elementNode === 'string') {
            editedItem = that._getItemById(elementNode);
        }
        else {
            that.error(that.localize('wrongElementNode', { elementType: that.nodeName.toLowerCase(), method: methodName }));
        }

        if (!editedItem) {
            that.error(that.localize('wrongElementNode', { elementType: that.nodeName.toLowerCase(), method: methodName }));
        }

        return editedItem;
    }

    /*
    * Validates if node exists in the internal element's structure.
    * @param {Any} data - HTML element or nodeId of the element
    * @param {Boolean} isCondition - flag defined where the data will be used (condition or group)
    */
    _validateUserData(data, isCondition) {
        const that = this;

        if (isCondition) {
            if (!Array.isArray(data) || data.length < 3) {
                that.error(that.localize('invalidDataStructure', { elementType: that.nodeName.toLowerCase() }));
            }
        }
        else {
            const regEx = /^(and|or|notAnd|notOr)$/i;

            if (!(typeof data === 'string') || !data.match(regEx)) {
                that.error(that.localize('invalidDataStructure', { elementType: that.nodeName.toLowerCase() }));
            }
        }
    }

    /**
     * Validates the structure of the "value" array.
     */
    _validateValue() {
        const that = this,
            maxConditions = that.maxConditions,
            maxConditionsPerGroup = that.maxConditionsPerGroup,
            maxLevel = that.maxLevel;
        let totalConditions = 0;

        if (maxConditions === null && maxConditionsPerGroup === null && maxLevel === null) {
            return;
        }

        const value = that.value,
            finalResult = [];

        function isCondition(structure) {
            return structure.length === 3 && typeof structure[0] === 'string' && typeof structure[1] === 'string';
        }

        function process(structure, level, result) {
            let conditionsPerGroup = 0;

            structure.forEach(item => {
                if (Array.isArray(item)) {
                    if (isCondition(item)) {
                        // condition
                        if (maxConditions !== null && maxConditions === totalConditions ||
                            maxConditionsPerGroup !== null && maxConditionsPerGroup === conditionsPerGroup) {
                            return;
                        }

                        result.push(item);
                        conditionsPerGroup++;
                        totalConditions++;
                    }
                    else {
                        // inner group
                        if (maxLevel !== null && maxLevel === level + 1) {
                            return;
                        }

                        const group = [];

                        result.push(group);
                        process(item, level + 1, group);
                    }
                }
                else {
                    // operator
                    result.push(item);
                }
            });
        }

        process(value, 0, finalResult);
        that.value = finalResult;
    }
});

/**
 * lwQueryBuilder custom element.
 */
LW('lw-query-builder', class QueryBuilder extends LW.BaseElement {
    /**
     * Element's properties
     */
    static get properties() {
        return {
            'allowDrag': {
                value: false,
                type: 'boolean'
            },
            'applyMode': {
                allowValues: ['immediately', 'change'],
                value: 'change',
                type: 'string'
            },
            'customOperations': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'customOperators': {
                value: {},
                type: 'object',
                reflectToAttribute: false
            },
            'dropDownWidth': {
                type: 'any',
                value: '100%'
            },
            //'disableContextMenu': {
            //    value: false,
            //    type: 'boolean'
            //},
            'fields': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'fieldsMode': {
                value: 'dynamic',
                allowedValues: ['dynamic', 'static'],
                type: 'string'
            },
            'formatStringDate': {
                value: 'dd-MMM-yy',
                type: 'string'
            },
            'formatStringDateTime': {
                value: 'dd-MMM-yy HH:mm:ss',
                type: 'string'
            },
            'getDynamicField': {
                value: null,
                type: 'function?'
            },
            'icons': {
                value: {
                    '=': 'equals',
                    '<>': 'notequals',
                    '>': 'greaterthan',
                    '>=': 'greaterthanorequal',
                    '<': 'lessthan',
                    '<=': 'lessthanorequal',
                    'startswith': 'startswith',
                    'endswith': 'endswith',
                    'contains': 'contains',
                    'notcontains': 'notcontains',
                    'isblank': 'isblank',
                    'isnotblank': 'isnotblank'
                },
                type: 'object',
                reflectToAttribute: false
            },
            //'maxConditions': {
            //    value: null,
            //    type: 'number?'
            //},
            //'maxConditionsPerGroup': {
            //    value: null,
            //    type: 'number?'
            //},
            'messages': {
                value: {
                    'en': {
                        'add': 'Add',
                        'addCondition': 'Add Condition',
                        'addGroup': 'Add Group',
                        'and': 'And',
                        'notand': 'Not And',
                        'or': 'Or',
                        'notor': 'Not Or',
                        '=': 'Equals',
                        '<>': 'Does not equal',
                        '>': 'Greater than',
                        '>=': 'Greater than or equal to',
                        '<': 'Less than',
                        '<=': 'Less than or equal to',
                        'startswith': 'Starts with',
                        'endswith': 'Ends with',
                        'contains': 'Contains',
                        'notcontains': 'Does not contain',
                        'isblank': 'Is blank',
                        'isnotblank': 'Is not blank',
                        'wrongParentGroupIndex': '{{elementType}}: Wrong parent group index in "{{method}}" method.',
                        'wrongElementNode': '{{elementType}}: Incorect node / node Id in "{{method}}" method.',
                        'invalidDataStructure': '{{elementType}}: Used invalid data structure in updateCondition/updateGroup method.',
                        'dateTabLabel': 'DATE',
                        'timeTabLabel': 'TIME',
                        'queryLabel': 'Query'
                    }
                },
                type: 'object',
                extend: true
            },
            'operatorPlaceholder': {
                value: 'Operator',
                type: 'string'
            },
            'propertyPlaceholder': {
                value: 'Property',
                type: 'string'
            },
            //'requiredFields': {
            //    value: null,
            //    type: 'array?',
            //    reflectToAttribute: false
            //},
            'showIcons': {
                value: false,
                type: 'boolean'
            },
            'value': {
                value: [],
                type: 'any',
                reflectToAttribute: false
            },
            'valueFormatFunction': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'valuePlaceholder': {
                value: 'Value',
                type: 'string'
            }
        }
    }

    /**
    *  Required files
    */
    static get requires() {
        const requiredFiles = {
            'LW.Button': 'lw.button.js',
            'LW.Calendar': 'lw.calendar.js',
            'LW.CheckBox': 'lw.checkbox.js',
            'LW.DateTimePicker': 'lw.datetimepicker.js',
            'LW.DropDownList': 'lw.dropdownlist.js',
            'LW.Input': 'lw.input.js',
            'LW.ListBox': 'lw.listbox.js',
            'LW.Menu': 'lw.menu.js',
            'LW.NumericTextBox': 'lw.numerictextbox.js',
            'LW.ScrollBar': 'lw.scrollbar.js',
            'LW.TimePicker': 'lw.timepicker.js',
            'LW.Tooltip': 'lw.tooltip.js',
            'LW.Utilities.BigNumber': 'lw.math.js',
            'LW.Utilities.DateTime': 'lw.date.js',
            'LW.Utilities.Draw': 'lw.draw.js',
            'LW.Utilities.NumericProcessor': 'lw.numeric.js',
        };

        if (!window.NIComplex) {
            requiredFiles['LW.Utilities.Complex'] = 'lw.complex.js';
        }

        return requiredFiles;
    }

    /**
     * Element's event listeners.
     */
    static get listeners() {
        return {
            'down': '_downHandler',
            'resize': '_resizeHandler',
            'editorsContainer.keydown': '_innerContainerKeydownHandler',
            'conditionsMenu.close': '_menuCloseHandler',
            'conditionsMenu.closing': '_menuClosingHandler',
            'conditionsMenu.itemClick': '_menuItemClickHandler',
            'contentContainer.change': '_contentContainerChangeHandler',
            'scrollableContainer.touchmove': '_scrollableContainerTouchmoveHandler',
            'document.down': '_documentDownHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler'
        }
    }


    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.querybuilder.css'
        ]
    }

    /**
     * Element's HTML template.
     */
    template() {
        return `<div id="container" role="presentation">
                    <lw-scroll-viewer id="scrollableContainer" class="lw-scrollable-container" animation="[[animation]]" right-to-left="[[rightToLeft]]">
                        <div id="queryLabel" class="lw-query-builder-label lw-unselectable"></div>
                        <div id="contentContainer" class="lw-content-container"></div>
                    </lw-scroll-viewer>
                    <div id="editorsContainer" class="lw-editors-container" role="presentation">
                        <div id="customEditor" class="lw-custom-editor lw-hidden"></div>
                    </div>
                    <lw-menu id="conditionsMenu" mode="dropDown" class="lw-conditions-menu" theme="[[theme]]" animation="[[animation]]" right-to-left="[[rightToLeft]]"></lw-menu>
                </div>`;
    }

    /**
   * Updates the element when a property is changed.
   * @param {string} propertyName The name of the property.
   * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
   * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
   */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'animation':
            case 'theme':
                ['textBoxEditor', 'numericTextBoxEditor', 'comboBoxEditor', 'dateTimePickerEditor', 'checkBoxEditor']
                    .forEach(editor => that.$[editor] && (that.$[editor][propertyName] = newValue));
                break;
            case 'formatStringDate':
            case 'formatStringDateTime':
            case 'valueFormatFunction':
                that._refresh();
                break;
            case 'operatorPlaceholder':
                Array.from((that.shadowRoot || that).querySelectorAll('.lw-filter-operation[placeholder]')).forEach(element => element.firstElementChild.innerHTML = newValue);
                break;
            case 'propertyPlaceholder':
                Array.from((that.shadowRoot || that).querySelectorAll('.lw-filter-field-name[placeholder]')).forEach(element => element.firstElementChild.innerHTML = newValue);
                break;
            case 'showIcons':
                that._closeEditor();

                if (newValue) {
                    that._filterOperationDescriptions.map(item => item.icon = that.icons[item.value]);
                }
                else {
                    that._filterOperationDescriptions.map(item => delete item.icon);
                }

                break;
            case 'customOperations':
            case 'fields':
            case 'value': {
                const oldValueAsString = JSON.stringify(that._validValue);

                if (propertyName === 'customOperations') {
                    that._handleCustomOperations();
                }
                else if (propertyName === '') {
                    that._mapFieldsToMenu();
                }

                that._applyValue();

                if (that._oldValueAsString !== oldValueAsString) {
                    that._oldValueAsString = oldValueAsString;
                    that.$.fireEvent('change', { value: JSON.parse(oldValueAsString), 'linq': that._parseQueryToLinq(that._validValue) });
                }

                break;
            }
            case 'valuePlaceholder':
                Array.from((that.shadowRoot || that).querySelectorAll('.lw-filter-value[placeholder]')).forEach(element => element.firstElementChild.innerHTML = newValue);
                break;
            case 'locale':
            case 'messages':
                that._localizeInitialValues();
                that._refresh();
                that._handleCustomOperations();//

                if (that.$.dateTimePickerEditor) {
                    if (!that.$.dateTimePickerEditor.messages[that.locale]) {
                        that.$.dateTimePickerEditor.messages[that.locale] = {};
                    }

                    that.$.dateTimePickerEditor.messages[that.locale].dateTabLabel = that.localize('dateTabLabel');
                    that.$.dateTimePickerEditor.messages[that.locale].timeTabLabel = that.localize('timeTabLabel');

                    if (propertyName === 'locale') {
                        that.$.dateTimePickerEditor.locale = that.locale;
                    }
                    else if (propertyName === 'messages') {
                        that.$.dateTimePickerEditor.$.selectDate.innerHTML = that.$.dateTimePickerEditor.messages[that.locale].dateTabLabel;
                        that.$.dateTimePickerEditor.$.selectTime.innerHTML = that.$.dateTimePickerEditor.messages[that.locale].timeTabLabel;
                    }
                }

                break;
            case 'icons':
                that._closeEditor();
                break;
        }
    }

    /**
    * Element's ready method.
    */
    ready() {
        super.ready();

        const that = this;

        if (!that.$.queryLabel.id) {
            that.$.queryLabel.id = that.id + 'Label';
        }

        that.setAttribute('role', 'dialog');
        that.setAttribute('aria-labelledby', that.$.queryLabel.id);

        if (navigator.platform.toLowerCase().lastIndexOf('mac') !== -1) {
            that.$.contentContainer.classList.add('mac');
        }

        that._setInitialValues();
        that._handleCustomOperations();
        that._applyValue();

        Object.defineProperty(that, 'value', {
            get: function () {
                if (that.context === that) {
                    return that.properties.value.value;
                }
                else {
                    return that._validValue;
                }
            },
            set(value) {
                that.updateProperty(that, that._properties.value, value);
            }
        });
    }

    /**
     * Returns a LINQ representation of the current value
     */
    getLinq() {
        const that = this;

        if (!that._validValue) {
            return;
        }

        return that._parseQueryToLinq(that._validValue)
    }

    /**
   * Set default values for the menus
   */
    _setInitialValues() {
        const that = this;

        that._autoScrollCoefficient = LW.Utilities.Core.Browser.Firefox ? 4 : LW.Utilities.Core.Browser.Edge ? 8 : 2;
        that._isMobile = LW.Utilities.Core.isMobile;

        that._manuallyAddedFields = [];
        that._localizeInitialValues();
        that.$.conditionsMenu.dropDownAppendTo = that.$.container;
        that.$.conditionsMenu.dataSource = that._groupOperationDescriptions;

        that._valueFlat = [];
        that._lastProcessedItemInCurrentGroup = { parentId: null, id: null, position: null };
    }

    /**
     * Applies value.
     */
    _applyValue() {
        const that = this;

        that._emptyElementsStructure(true);
        that._validateValue();
        //that._setRequiredFields();
        that._convertValueToFlat(that.value);
        that._getFieldsFromValue();
        that._mapFieldsToMenu();
        that._validateValueByType();
        that._generateHTMLStructureFromFlatValue(true);
        that._restrictNesting();
        that._validValue = that._getValidValue();
        that._oldValueAsString = JSON.stringify(that._validValue);
    }

    /**
     * Validates the value field inside the conditions according to the dataType of the field
     */
    _validateValueByType() {
        const that = this;

        if (!that._valueFlat || !that._valueFlat.length) {
            return;
        }

        const items = that._valueFlat;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.type !== 'condition') {
                continue;
            }

            const field = item.data[0];

            if (!field || item.data.length < 3) {
                continue;
            }

            item.data[2] = that._validateStoredValue(item.data[2], field);
        }

        that._generateValue(true);
    }

    /**
     * Set's the requested fields
     */
    _setRequiredFields() {
        const that = this;

        if (!that.requiredFields || !that.requiredFields.length) {
            return;
        }

        const currentValue = that.value;
        let reqGroup = [];

        for (let i = 0; i < that.requiredFields.length; i++) {
            const reqField = that.requiredFields[i],
                field = that.fields.find(field => field.dataField === reqField);

            if (field) {
                let valueRecords = [];

                if (currentValue) {
                    let i = 0;

                    //Doing a lookup on the value for records that contain 'requiredFields'
                    //Modifies the value dynamically
                    while (i < currentValue.length) {
                        const val = currentValue[i];

                        if (Array.isArray(val)) {
                            let r = 0;

                            while (r < val.length) {
                                let record = val[r];

                                if (record && record[0] === field.dataField) {
                                    valueRecords.push(record);
                                    val.splice(r > 0 ? r - 1 : r, 2);
                                    continue;
                                }

                                r++;
                            }
                        }

                        if (!val.length) {
                            currentValue.splice(i, 2);
                            continue;
                        }

                        i++;
                    }
                }

                //Check if group records exist inside value
                if (valueRecords) {
                    for (let r = 0; r < valueRecords.length; r++) {
                        reqGroup.push(valueRecords[r]);
                        reqGroup.push('and');
                    }
                }
                else {
                    //If no records create a placeholder
                    reqGroup.push([reqField]);
                    reqGroup.push('and');
                }
            }
        }

        //Remove the lastly added 'and' condition
        if (typeof reqGroup[reqGroup.length - 1] === 'string') {
            reqGroup.pop();
        }

        //Add the Required Fields on Top of the value
        that.value.unshift(reqGroup, 'and')
    }

    /**
     * Change event Handler for the ContentContainer
     * @param {any} event
     */
    _contentContainerChangeHandler(event) {
        const that = this;

        event.stopPropagation();

        if (that.applyMode !== 'immediately' || !that._editorIsOpen || !that._editor) {
            return;
        }

        const editedHTMLField = that._editor.closest('.filter-builder-item');

        if (!editedHTMLField.classList.contains('lw-filter-value')) {
            that._closeEditor();
        }
    }

    /**
    * Map field's data with menu's label and value.
    */
    _mapFieldsToMenu() {
        const that = this;

        if (!that.fields && !that._valueFields) {
            return;
        }

        that._fields = (that.fields || that._valueFields).concat(that._manuallyAddedFields).map(field => {
            return { label: field.label, value: field.dataField, dataType: field.dataType, filterOperations: field.filterOperations, lookup: field.lookup };
        });
    }

    /**
    * Localizes default values for the menus.
    */
    _localizeInitialValues() {
        const that = this;

        that.$.queryLabel.innerHTML = that.localize('queryLabel');

        that._addOptions = [
            { label: that.localize('addCondition'), value: 'addCondition' },
            { label: that.localize('addGroup'), value: 'addGroup' }
        ];

        that._groupOperationDescriptions = [
            { label: that.localize('and'), value: 'and' },
            //{ label: that.localize('notand'), value: 'notand' },
            { label: that.localize('or'), value: 'or' }
            //{ label: that.localize('notor'), value: 'notor' }
        ];

        that._defaultFilterOperationDescriptions = that._filterOperationDescriptions = [
            { label: that.localize('='), value: '=', custom: false },
            { label: that.localize('<>'), value: '<>', custom: false },
            { label: that.localize('>'), value: '>', custom: false },
            { label: that.localize('>='), value: '>=', custom: false },
            { label: that.localize('<'), value: '<', custom: false },
            { label: that.localize('<='), value: '<=', custom: false },
            { label: that.localize('startswith'), value: 'startswith', custom: false },
            { label: that.localize('endswith'), value: 'endswith', custom: false },
            { label: that.localize('contains'), value: 'contains', custom: false },
            { label: that.localize('notcontains'), value: 'notcontains', custom: false },
            { label: that.localize('isblank'), value: 'isblank', custom: false },
            { label: that.localize('isnotblank'), value: 'isnotblank', custom: false }
        ];

        //TODO: To Be moved to _formatValueStringRepresentation
        const localizedNames = LW.Utilities.DateTime.getLocalizedNames(that.locale);

        that._localizedDays = localizedNames.days;
        that._localizedMonths = localizedNames.months;
    }

    /**
    * Add custom operations to the menu's operations list
    */
    _handleCustomOperations() {
        const that = this;

        that._filterOperationDescriptions = that._defaultFilterOperationDescriptions.slice(0);

        for (let i = 0; i < that.customOperations.length; i++) {
            let operation = that.customOperations[i],
                existingOperationIndex = that._filterOperationDescriptions.findIndex(op => op.value === operation.name),
                newOperation = {
                    label: operation.label,
                    value: operation.name,
                    custom: true,
                    index: i,
                    editorTemplate: operation.editorTemplate,
                    valueTemplate: operation.valueTemplate,
                    handleValue: operation.handleValue,
                    hideValue: operation.hideValue
                };

            if (existingOperationIndex > -1) {
                that._filterOperationDescriptions[existingOperationIndex] = newOperation;
                continue;
            }

            that._filterOperationDescriptions.push(newOperation);
        }
    }

    /**
   * InnerContainer keydown eventHandler
   * @param {any} event
   */
    _innerContainerKeydownHandler(event) {
        const that = this;

        if (that._editorIsOpen && (event.key === 'Escape' || event.key === 'Enter')) {
            that._closeEditor();
        }
    }

    /**
     * Document down handler - closes menu and/or editor on click outside of the element
     */
    _documentDownHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if ((target.shadowParent && target.shadowParent.closest('.lw-input-drop-down-menu')) || target.closest('.lw-input-drop-down-menu') || that.$.conditionsMenu.contains(target)) {
            return;
        }

        const isDropDown = target.closest('.lw-drop-down');

        if (target.getRootNode().host === that || target.closest('lw-query-builder') === that || (isDropDown && that.contains(isDropDown.ownerElement))) {
            if (that._isMobile) {
                const currentScroll = that.$.scrollableContainer.scrollTop,
                    currentTop = that.getBoundingClientRect().top;

                setTimeout(function () {
                    if (that.$.scrollableContainer.scrollTop !== currentScroll ||
                        that.getBoundingClientRect().top !== currentTop) {
                        return;
                    }
                    else {
                        const oldContext = that.context;

                        that.context = that;
                        that._clickHandler(event.originalEvent);
                        that.context = oldContext;
                    }
                }, 250);
            }
            else {
                that._clickHandler(event.originalEvent);
            }

            return;
        }

        if (that._editorIsOpen && !that._scrollBarDown) {
            that._closeEditor();
        }

        delete that._scrollBarDown;
    }

    /**
    * Generates HTML structure from flat array and adds/replaces
    * @param {Array} data - contains dataField, operator and value
    */
    _emptyElementsStructure(emptyValueFlat) {
        const that = this,
            contentContainer = that.$.contentContainer;

        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.firstChild);
        }

        that._valueFlat = emptyValueFlat ? [] : that._valueFlat;
        that._lastProcessedItemInCurrentGroup = { parentId: null, id: null, position: null };
    }

    /**
    * Resize handler
    */
    _resizeHandler() {
        this.$.scrollableContainer.refresh();
    }

    /**
     * Returns the number of all conditions
     */
    _getTotalConditions() {
        return this.getElementsByClassName('lw-filter-group-condition').length;
    }

    /**
     * Finds and returns the valid queries in a Linq expressions
     * @param {any} expr
     */
    _getQueryFromExpression(expr) {
        const that = this;
        let allQueries = [];
        const getQuery = function (expr) {
            //string check for expresions
            const customOperatorsWithExpressions = that.customOperations.filter(op => op.expressionTemplate);

            for (let i = 0; i < customOperatorsWithExpressions.length; i++) {
                const operator = customOperatorsWithExpressions[i],
                    expRegex = new RegExp(operator.expressionTemplate.replace(/\(/gm, '\\(').
                        replace(/\)/gm, '\\)').replace(/\[/gm, '\\[').replace(/\]/gm, '\\]').
                        replace(/"{\d+}"/gm, '\\W*"([^"]*)[^a-zA-Z0-9-\\s\\)]+').replace(/{\d+}/gm, '([@|$]*\\w+(?!\\s)*)\\s{0}').
                        replace(/ /gm, '\\s'), 'gm');

                if (expRegex.test(expr)) {
                    expRegex.lastIndex = 0;

                    let fieldName, value,
                        match = expRegex.exec(expr);

                    match = match.filter((item, index) => match.indexOf(item) === index);

                    //Custom Expression. Expect an object with fieldName and value
                    if (operator.expressionReaderCallback) {
                        let customArguments = operator.expressionReaderCallback(match[0], match.slice(1));

                        if (customArguments) {
                            fieldName = customArguments.fieldName;
                            value = customArguments.value;
                        }
                    }

                    if (fieldName === undefined) {
                        fieldName = match[1] || '';
                    }

                    if (value === undefined) {
                        value = match[2] || '';
                    }

                    allQueries.push({ expr: match[0], query: [fieldName, operator.name, value] });
                    return match[0]
                }
            }
        }

        if (!expr) {
            return;
        }

        //Find all valid LinQ expressions and converts them to queries
        while (expr.length) {
            if (expr) {
                expr = expr.trim();

                //Removes the starting/ending brackets
                if (expr[0] === '(' && expr[expr.length - 1] === ')') {
                    expr = expr.trim().replace(/^\(|\)$/gm, '');
                }

                //Removes the logical operators infron and after an expressions
                expr = expr.replace(/^&{2}|^\|{2}|&{2}$|\|{2}$/gm, '').trim();
            }

            //Check for valid expression
            const match = getQuery(expr);

            if (!match) {
                break;
            }

            //Remove the match from the expressions
            expr = expr.replace(match, '').trim();
        }

        //Returns the final query with the logical operators between the groups
        return that._constructValueFromQueries(arguments[0], allQueries);
    }

    /**
     * Constructs the final value from LinQ expression
     */
    _constructValueFromQueries(expression, queries) {
        let newValue = [];

        //Sorts the queries depending on their possition in the expression
        queries.sort((a, b) => {
            return expression.indexOf(a.expr) - expression.indexOf(b.expr)
        });

        //Finds the correct Logical operators between the groups
        for (let i = 0; i < queries.length; i++) {
            let previousExpr = queries[i - 1];

            if (previousExpr) {
                const operator = expression.substring(expression.indexOf(previousExpr.expr) + previousExpr.expr.length, expression.indexOf(queries[i].expr)).trim();

                newValue.push(operator === '||' ? 'or' : 'and');
            }

            if (queries[i].outher) {
                queries[i].query.forEach(q => newValue.push(Array.isArray(q) ? [q] : q));
            }
            else {
                newValue.push(queries[i].query);
            }
        }

        return newValue;
    }

    /**
     * Parses Dynamic LINQ to QueryBuilder value
     */
    _parseLinqToValue() {
        const that = this,
            queryString = that.value;
        let groupStarted = 0,
            groupStartIndex,
            leafQueries = [];

        //Find the query groups surrounded by brackets
        for (let i = 0; i < queryString.length; i++) {
            if (queryString[i] === '(') {
                groupStarted++;

                if (groupStartIndex === undefined) {
                    groupStartIndex = i;
                }
            }
            else if (queryString[i] === ')' && groupStarted > 0) {
                groupStarted--;

                if (groupStarted === 0) {
                    let group = queryString.substring(groupStartIndex, i + 1).trim();

                    if (group.length && (group.includes('&&') || group.includes('||'))) {
                        leafQueries.push({ expr: group });
                    }

                    groupStartIndex = undefined;
                }
            }
        }

        //Handle any expressions that are not surrounded by brackets ( outher groups )
        let outherGroups = [], previousGroup;

        if (leafQueries.length) {
            for (let g = 0; g < leafQueries.length; g++) {
                let outherGroup;

                leafQueries[g].query = that._getQueryFromExpression(leafQueries[g].expr);

                if (previousGroup) {
                    outherGroup = queryString.substring(queryString.indexOf(previousGroup) + previousGroup.length, queryString.indexOf(leafQueries[g].expr)).trim();
                }
                else {
                    outherGroup = queryString.substring(0, queryString.indexOf(leafQueries[g].expr)).trim();
                }

                if (outherGroup) {
                    outherGroups.push(outherGroup);
                }

                previousGroup = leafQueries[g].expr;
            }
        }

        //Handles outher groups after a subGroup
        if (previousGroup) {
            outherGroups.push(queryString.substring(queryString.indexOf(previousGroup) + previousGroup.length).trim());
        }
        else {
            outherGroups.push(queryString.trim());
        }

        //Handles all outher groups
        for (let i = 0; i < outherGroups.length; i++) {
            const outherGroup = outherGroups[i].replace(/^&{2}|^\|{2}|&{2}$|\|{2}$/gm, '').trim();

            if (outherGroup.length) {
                leafQueries.push({ expr: outherGroup, query: that._getQueryFromExpression(outherGroup), outher: true });
            }
        }

        //Builds the final query and sets it as the new value of the element
        that.set('value', that._constructValueFromQueries(queryString, leafQueries))
    }

    /**
     * Converts the value to Dynamic Linq expression
     * @param {any} query
     */
    _getExpressionFromQuery(query) {
        const that = this,
            name = query[0],
            operation = query[1];
        let value = query[2];

        const operator = that.customOperations.find(customOp => customOp.name === operation);

        if (!operator || !operator.expressionTemplate) {
            return '';
        }

        // In the case where a property value has a quotation in it we need to explicitly json
        // the property value so it is a valid dynamic linq expression when built
        if (typeof value === 'string' && value.includes('"') && operator.expressionTemplate.includes('"')) {
            value = JSON.stringify(value).slice(1, -1);
        }

        // Handle building of dynamic linq expression based upon the selected property/operation
        return operator.expressionBuilderCallback ? operator.expressionBuilderCallback(name, operation, value) :
            operator.expressionTemplate.replace('{0}', name).replace('{1}', value)

    }

    /**
     * Builds a Dynamic Linq expression from the value of the element
     * @param {any} value
     */
    _parseQueryToLinq(value) {
        const that = this,
            logicalOperator = {
                'and': '&&',
                'or': '||'
            };
        let queryString = '';

        for (let i = 0; i < value.length; i++) {
            const query = value[i];

            if (Array.isArray(query)) {
                if (query.indexOf('and') > -1 || query.indexOf('or') > -1 || (query.length === 1 && Array.isArray(query[0]))) {
                    const nestedQuery = that._parseQueryToLinq(query);

                    if (nestedQuery) {
                        queryString += query.length > 1 ? '(' + nestedQuery + ')' : nestedQuery;
                    }
                    else if (/\s(&|\|){2}\s$/gm.test(queryString)) {
                        //Remove the unnecessary logical operator for the empty expression
                        queryString = queryString.replace(/\s(&|\|){2}\s$/gm, '');
                    }
                }
                else {
                    queryString += that._getExpressionFromQuery(query) || '';
                }
            }
            else {
                if (queryString) {
                    queryString += ' ' + logicalOperator[query] + ' ';
                }
            }
        }

        return queryString;
    }

    /**
     * Validates the structure of the "value" array.
     */
    _validateValue() {
        const that = this;

        if (typeof that.value === 'string') {
            that._parseLinqToValue();
        }

        const value = that.value;

        if (!Array.isArray(value) ||
            JSON.stringify(value).replace(/[\[\]]/g, '') === '') {
            that.value = [[[]]];
            return;
        }

        if (value.length === 3 && typeof value[0] === 'string') {
            that.value = [[value]];
        }

        if (Array.isArray(value[0]) && value[0].length === 3 && typeof value[0][0] === 'string') {
            that.value = [value];
        }

        while (typeof value[0] === 'string') {
            value.shift();
        }

        while (typeof value[value.length - 1] === 'string') {
            value.pop();
        }

        that.value.forEach(item => {
            if (Array.isArray(item) && item.length === 0) {
                item.push([]);
            }
        });
    }

    /**
    * Converts value(represented as nested array) to flat array. Used for internal data representation
    * @param {Array} groupData - an array with group data
    * @param {String} nodeId - the id of the current element
    */
    _convertValueToFlat(groupData) {
        const that = this,
            operatorList = ['and', 'or', 'notAnd', 'notOr'];

        if (!groupData) {
            return;
        }

        let totalConditions = 0,
            totalGroups = 0;

        function createItems(groupData, groupIndex) {
            let operator;

            for (let i = 0; i < groupData.length; i++) {
                const data = groupData[i],
                    isDataAnOperator = typeof data === 'string' && (operatorList.indexOf(data) > -1 || that.customOperators[data]);
                let item = { htmlNode: null };

                if (isDataAnOperator) {
                    operator = (that.customOperators[data] || data).trim();
                    continue;
                }

                operator = operator || 'and';

                //Check if condition/group
                if (Array.isArray(data)) {
                    let groupConditions = that._valueFlat.filter(item => item.parentId + '' === groupIndex + '').length;

                    //Check if condition
                    if (!data.find(item => Array.isArray(item))) {

                        if (that.maxConditions && totalConditions >= that.maxConditions || that.maxConditionsPerGroup && groupConditions >= that.maxConditionsPerGroup) {
                            continue;
                        }

                        //Create Operator
                        if (i !== 0) {
                            that._valueFlat.push({ nodeId: groupIndex + '.' + groupConditions, type: 'operator', data: operator, parentId: groupIndex + '' });
                            operator = '';
                            groupConditions++;
                        }

                        //Create Condition
                        item.nodeId = groupIndex + '.' + groupConditions;
                        item.parentId = groupIndex + '';
                        item.type = 'condition';
                        item.data = data;

                        totalConditions++;
                        that._valueFlat.push(item);
                    }
                    else {
                        item.nodeId = (totalGroups += 1) + '';
                        item.type = 'group';
                        item.data = operator;
                        that._valueFlat.push(item);

                        createItems(data, item.nodeId);
                        operator = '';
                    }
                }
            }
        }

        //Empty the flat value
        that._valueFlat = [];
        createItems(groupData, 0);

        delete that._totalGroups;
    }

    /**
    * Generates an array of field objects, used as a backup when fields property is not set
    */
    _getFieldsFromValue() {
        const that = this,
            items = that._valueFlat,
            fieldsNames = [],
            fields = [];

        function getDataType(data) {
            if (typeof data === 'boolean') {
                return 'boolean';
            }

            if (data instanceof Date) {
                if (data.getHours() > 0 || data.getMinutes() > 0 || data.getSeconds() > 0) {
                    return 'dateTime';
                }

                return 'date';
            }

            if (!isNaN(data)) {
                return 'number';
            }

            return 'string';
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.type === 'condition') {
                const fieldName = item.data[0];

                if (fieldName && fieldsNames.indexOf(fieldName) === -1) {
                    const fieldElement = { label: fieldName, dataField: fieldName, dataType: getDataType(item.data[2]), format: null };

                    fieldsNames.push(fieldName);
                    fields.push(fieldElement);
                }
            }
        }

        that._valueFields = fields;
    }

    /*
    * Creates new group or condition
    * @param {String} type - 'group' or 'condition'
    * @param {Any} parentGroup - html object or group id
    * @param {Any} data - if type is group - contains group's operator;  if type is condition - dataField, operator and value
    */
    _addElement(type, parentGroup, data, noRefresh) {
        const that = this,
            siblings = that._valueFlat.filter(item => {
                return item.parentId === parentGroup
            });
        let addGroupAtPosition = 0,
            groupSeparator = '';

        data = data || (type === 'group' ? 'or' : []);

        if (siblings.length) {
            let siblingsIndexes = siblings.map(index => {
                const indexPath = index.nodeId.split('.');

                return parseInt(indexPath[indexPath.length - 1]);
            });

            siblingsIndexes = (siblingsIndexes.length === 0) ? [0] : siblingsIndexes;
            addGroupAtPosition = siblingsIndexes.reduce((a, b) => Math.max(a, b)) + 1;
        }

        if (parentGroup && parentGroup.length > 0) {
            groupSeparator = '.';
        }

        let itemId = (parentGroup || '') + groupSeparator + (type === 'group' ? that._valueFlat.filter(item => item.type === 'group').length + 1 : addGroupAtPosition);

        let lastGroupSibling = siblings[0];

        if (siblings.length) {
            for (let s = 0; s < siblings.length; s++) {
                const sibling = siblings[s],
                    siblingIndex = sibling.nodeId.split('.').pop();

                if (parseInt(siblingIndex) > parseInt(lastGroupSibling.nodeId.split('.').pop())) {
                    lastGroupSibling = sibling;
                }
            }
        }
        else {
            lastGroupSibling = that._valueFlat.find(item => item.nodeId === parentGroup);
        }

        let lastGroupSiblingIndex = lastGroupSibling ? that._valueFlat.indexOf(lastGroupSibling) + 1 : that._valueFlat.length;

        if (type === 'condition' && siblings.length > 0) {
            that._valueFlat.splice(lastGroupSiblingIndex, 0, { nodeId: itemId, parentId: parentGroup, type: 'operator', data: ['and'], htmlNode: null });
            itemId = (parentGroup || '') + groupSeparator + (addGroupAtPosition + 1);
            lastGroupSiblingIndex++;
        }

        const itemData = {
            nodeId: itemId,
            parentId: parentGroup,
            type: type,
            data: data,
            htmlNode: null
        };

        that._valueFlat.splice(lastGroupSiblingIndex, 0, itemData);

        if (type === 'group') {
            that._addElement('condition', itemId, [], true);
        }

        if (!noRefresh) {
            that._refresh();
        }
    }

    /**
    * Removes a condition and it's HTML representation
    * @param {Any} elementNode.
    * @param {String} type.
    */
    _deleteElement(elementNode, type) {
        const that = this,
            nodeId = typeof elementNode === 'string' ? elementNode : elementNode.getAttribute('node-id');

        if (!nodeId || nodeId.length === 1) {
            return;
        }

        function deleteOperator(index) {
            const operator = that._valueFlat[index];

            //Remove the nested operator for the condition
            if (operator && operator.type === 'operator') {
                that._valueFlat.splice(index, 1);
                operator.htmlNode.parentElement.removeChild(operator.htmlNode);
                return true;
            }
        }

        function deleteCondition(nodeId) {
            let item,
                indexInGroup = 0,
                groupId = nodeId.split('.');

            groupId.pop();
            groupId = groupId.join('.');

            for (let i = 0; i < that._valueFlat.length; i++) {
                const flatItem = that._valueFlat[i];

                if (flatItem.type !== 'condition') {
                    continue;
                }

                if (flatItem.nodeId === nodeId) {
                    item = flatItem;
                    break;
                }

                if (flatItem.parentId === groupId) {
                    indexInGroup++;
                }
            }

            const itemIndex = that._valueFlat.indexOf(item);

            //Remove the condition
            that._valueFlat.splice(itemIndex, 1);
            //that._totalConditions--;
            item.htmlNode.parentElement.removeChild(item.htmlNode);

            //Remove the operator for the condition
            const isPreviousOperatorRemoved = deleteOperator(itemIndex - 1);

            //If the removed condition was 1st in the group, remove the next nested condition as well
            if (!indexInGroup) {
                deleteOperator(itemIndex - (isPreviousOperatorRemoved ? 1 : 0));
            }

            const groupNode = that._valueFlat.filter(item => item.nodeId === groupId)[0].htmlNode;

            if (groupNode.children[1].childElementCount > 0 && groupNode.children[2].hasAttribute('limit-selection') &&
                !groupNode.children[1].lastElementChild.hasAttribute('limit-selection')) {
                groupNode.children[2].removeAttribute('limit-selection');
            }
        }

        function deleteGroup(nodeId) {
            const item = that._valueFlat.filter(item => nodeId === item.nodeId && item.type === 'group')[0];

            for (let i = 0; i < that._valueFlat.length; i++) {
                const nestedItem = that._valueFlat[i],
                    nestedNodeId = nestedItem.nodeId;

                if (nestedItem.parentId === nodeId) {
                    nestedItem.type === 'group' ? deleteGroup(nestedNodeId) : deleteCondition(nestedNodeId);
                }
            }

            that._valueFlat.indexOf(item) > -1 && that._valueFlat.splice(that._valueFlat.indexOf(item), 1);
            item.htmlNode.parentElement.removeChild(item.htmlNode);
        }

        type === 'group' ? deleteGroup(nodeId) : deleteCondition(nodeId);

        //Delete the group if it's empty
        if (!type || type === 'condition') {
            let groupId = nodeId.split('.');

            groupId.pop();
            groupId = groupId.join('.');

            if (!that._valueFlat.filter(i => i.parentId === groupId).length) {
                if (that._valueFlat.filter(item => item.type === 'group').length > 1) {
                    deleteGroup(groupId);
                }

                //Set the new 0th group
                if (groupId === '0') {
                    const firstGroup = that._valueFlat.find(item => item.type === 'group'),
                        oldGroupId = firstGroup.nodeId;

                    firstGroup.nodeId = '0';
                    firstGroup.htmlNode.setAttribute('node-id', '0');

                    const groupConditions = that._valueFlat.filter(item => item.parentId === oldGroupId);

                    for (let c = 0; c < groupConditions.length; c++) {
                        const con = groupConditions[c];

                        con.parentId = '0';
                        con.nodeId = '0.' + c;
                        con.htmlNode.setAttribute('node-id', con.nodeId);
                    }
                }
            }

            //if (that.requiredFields && that.requiredFields.length) {
            //    const firstNonRestrictedGroup = that._valueFlat.find(item => item.type === 'group' && !item.restricted);

            //    if (firstNonRestrictedGroup) {
            //        firstNonRestrictedGroup.htmlNode.querySelector('.lw-filter-group-operator').setAttribute('restricted', '');
            //    }
            //}

            that._generateValue();
        }
    }

    /**
     * Generates a flat structure form HTML
     */
    _generateHTMLStructureFromFlatValue(validation) {
        const that = this,
            fragment = document.createDocumentFragment();

        if (!that._valueFlat || that._valueFlat.length === 0) {
            return;
        }

        //let lastGroup;

        for (let i = 0; i < that._valueFlat.length; i++) {
            const item = that._valueFlat[i],
                customOperation = that.customOperations ? that.customOperations.find(operation => operation.name === item.data[1]) : false,
                parentGroupHTMLcontainer = item.parentId ? (that.shadowRoot || that).querySelector('[node-id="' + item.parentId + '"]').
                    querySelector('.lw-filter-group-condition-container') : that.$.contentContainer;

            if (item.type === 'group') {
                const groupContainerBlock = document.createElement('div'),
                    groupOperator = that.localize(item.data) || '';

                groupContainerBlock.className = 'lw-filter-group';
                groupContainerBlock.innerHTML = '<div class="lw-filter-group-operator" role="button" aria-expanded="false" aria-haspopup="menu">' + groupOperator + '</div>' +
                    '<div class="lw-filter-group-condition-container" role="group"></div>' +
                    '<div class="lw-filter-add-condition-btn" role="button" aria-label="Add condition"><div>' + that.localize('add') + '</div></div>' +
                    '<div class="lw-filter-add-btn" role="button" aria-expanded="false" aria-haspopup="menu" aria-label="Add group"></div>';

                //Set the group operator 'data' attribute
                groupContainerBlock.firstElementChild.data = groupOperator;

                fragment.appendChild(groupContainerBlock);

                groupContainerBlock.setAttribute('node-id', item.nodeId);
                that._valueFlat[i].htmlNode = groupContainerBlock;

                //if (!lastGroup && that.requiredFields && that.requiredFields.length) {
                //    groupContainerBlock.setAttribute('restricted', '');
                //    item.restricted = true;
                //}

                //lastGroup = groupContainerBlock;
            }
            else if (item.type === 'condition') {
                const condition = that._newFilterConditionRow(item.data);

                condition.setAttribute('node-id', item.nodeId);
                fragment.appendChild(condition);
                that._valueFlat[i].htmlNode = condition;

                if (item.data[0] !== undefined && item.data[1] === undefined) {
                    const validOperations = that._getFilterOperations(that._fields.find(field => field.value === item.data[0]));

                    that._handleOnlyOperation(validOperations, item.data, condition);
                }
                else if (['isblank', 'isnotblank'].indexOf(item.data[1]) !== -1 || (customOperation && customOperation.hideValue)) {
                    item.data.splice(2, 1);
                    condition.children[2].classList.add('lw-visibility-hidden');
                }
            }
            else {
                const operator = document.createElement('div');

                operator.className = 'lw-filter-nested-operator';
                operator.setAttribute('node-id', item.nodeId);
                operator.setAttribute('role', 'button');
                operator.setAttribute('aria-expanded', false);
                operator.setAttribute('aria-haspopup', 'menu');
                operator.innerHTML = that.localize(item.data);

                fragment.appendChild(operator);
                that._valueFlat[i].htmlNode = operator;
            }

            parentGroupHTMLcontainer.appendChild(fragment);
        }

        if (validation) {
            that._validateValueAdvanced();
        }

        that.$.scrollableContainer.refresh();
    }

    /**
     * Advanced value validation.
     */
    _validateValueAdvanced() {
        const that = this,
            value = that.value;
        let toRefresh = false,
            toRefreshValue = false,
            consecutiveStrings = 0;

        for (let i = 0; i < value.length; i++) {
            const group = value[i];

            if (typeof group === 'string') {
                continue;
            }

            for (let j = group.length - 1; j >= 0; j--) {
                let item = group[j];

                if (Array.isArray(item) && item.length === 0 && j !== group.length - 1) {
                    group.splice(j, 1);

                    if (j === 0) {
                        group.splice(0, 1);
                    }

                    toRefresh = true;
                }
                else if (typeof item === 'string') {
                    item = item.toLowerCase();
                    consecutiveStrings++;

                    if (consecutiveStrings > 1 || item !== 'and' && item !== 'or') {
                        toRefreshValue = true;
                    }

                    continue;
                }

                consecutiveStrings = 0;
            }
        }

        if (toRefresh) {
            that._emptyElementsStructure(true);
            that._convertValueToFlat(that.value);
            that._generateHTMLStructureFromFlatValue();
        }

        if (toRefreshValue) {
            that._generateValue(true);
        }
    }

    /**
     * Restict nesting in condition groups if a "placeholder" condition is already present.
     */
    _restrictNesting() {
        const that = this,
            addConditionBtns = Array.from(that.getElementsByClassName('lw-filter-add-condition-btn'));

        addConditionBtns.forEach(btn => {
            const lastCondition = btn.previousElementSibling.lastElementChild;

            if (lastCondition && lastCondition.hasAttribute('limit-selection')) {
                btn.setAttribute('limit-selection', '');
            }
        });
    }

    /**
    * Handles click event according to the target's type (filter button, add button, delete button, etc.).
    */
    _clickHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.composedPath()[0] : event.target;

        if (that.disabled || !target || !target.closest || (!that._isMobile && event.button !== 0)) {
            return;
        }

        if (that._scrollBarDown) {
            delete that._scrollBarDown;
            return;
        }

        const isTargetADropDown = target.closest('.lw-drop-down'),
            targetIsEditor = (that._editor && that._editor.contains(target) || (isTargetADropDown && (that._editor.contains(isTargetADropDown.ownerElement) ||
                that._editor === isTargetADropDown.ownerElement))) || target.closest('.lw-custom-editor');

        if (that._editor && that._editorIsOpen && !targetIsEditor) {
            that._closeEditor();
        }

        const filterItem = target.closest('.lw-filter-group-condition') || target.closest('.lw-filter-nested-operator') || target.closest('.lw-filter-group');

        if (!filterItem) {
            return;
        }

        const item = that._getItemById(filterItem.getAttribute('node-id'));

        if (!item) {
            return;
        }

        that.$.fireEvent('itemClick', {
            id: item.nodeId,
            type: item.type,
            data: item.data
        });

        if (target.closest('.lw-filter-delete-btn')) {
            that._clickHandlerDeleteButton(item.htmlNode);
            return;
        }

        const isAddButton = target.closest('.lw-filter-add-btn') || target.closest('.lw-filter-add-condition-btn');

        //Add group
        if (isAddButton) {
            const selectedFilterGroupId = isAddButton.closest('.lw-filter-group').getAttribute('node-id');

            if (isAddButton.classList.contains('lw-filter-add-condition-btn') && ((that.maxConditions && (that._getTotalConditions() < that.maxConditions)) || !that.maxConditions)) {
                that._addElement('condition', selectedFilterGroupId, []);
                //that._totalConditions++;
            }
            else {
                that._clickHandlerFilterButton(isAddButton.classList, item.nodeId, target);
            }

            return;
        }

        const isFilterButton = target.closest('.filter-builder-item') || target.closest('.lw-filter-group-operator') || target.closest('.lw-filter-nested-operator');

        if (isFilterButton) {
            const elementClassList = isFilterButton.classList;

            that._clickHandlerFilterButton(elementClassList, item.nodeId, target);
        }
    }

    /**
     * down handler
     */
    _downHandler(event) {
        const that = this;

        if (!event.originalEvent || (!that._isMobile && event.button !== 0)) {
            return;
        }

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target,
            isDraggingPossible = that.rightToLeft ? (event.pageX > target.getBoundingClientRect().right) : (event.pageX < target.getBoundingClientRect().left);

        if (that.allowDrag && target.classList.contains('lw-filter-group-condition') && isDraggingPossible) {
            const conditions = that._valueFlat.filter(item => item.type === 'condition');

            if (conditions.length === 1 ||
                conditions.length === 2 && conditions[0].parentId === conditions[1].parentId &&
                conditions[1].htmlNode.hasAttribute('limit-selection')) {
                return;
            }

            that._dragDetails = {
                coords: {
                    x: event.pageX, y: event.pageY
                },
                item: target,
                originalEvent: event
            };

            that.$.scrollableContainer._scrollView.disableSwipeScroll = true;
            that._hoveredCondition = target;
            window.getSelection().removeAllRanges();
            return;
        }

        this._scrollBarDown = target.closest('lw-scroll-bar');

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * scrollableContainer touchmove handler.
     */
    _scrollableContainerTouchmoveHandler(event) {
        if (this._dragDetails && event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * document move handler.
     */
    _documentMoveHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;

        if (!dragDetails) {
            return;
        }

        const draggedItem = dragDetails.item;

        if (!dragDetails.feedbackShown) {
            if (Math.abs(dragDetails.coords.x - event.pageX) > 5 ||
                Math.abs(dragDetails.coords.y - event.pageY) > 5) {
                const draggedItemData = that._valueFlat.filter(item => item.htmlNode === draggedItem)[0],
                    dragStartEvent = that.$.fireEvent('dragStart', { data: draggedItemData.data, item: draggedItem, originalEvent: event });

                if (dragStartEvent.defaultPrevented) {
                    delete that._dragDetails;
                    delete that._hoveredCondition;
                    that.$.scrollableContainer._scrollView.disableSwipeScroll = false;
                    return;
                }

                dragDetails.allConditions = Array.from((that.shadowRoot || that).querySelectorAll('.lw-filter-group-condition'));
                dragDetails.data = draggedItemData;
                dragDetails.feedback = that._addDragFeedback();
                dragDetails.feedbackShown = true;

                draggedItem.classList.add('dragged');
            }
            else {
                return;
            }
        }

        const y = event.clientY;
        let target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target,
            hoveredItem;

        that.$.fireEvent('dragging', { data: dragDetails.data, item: draggedItem, originalEvent: event });
        that.setAttribute('dragging', '');

        dragDetails.feedback.style.left = (event.pageX + 10) + 'px';
        dragDetails.feedback.style.top = (event.pageY + 10) + 'px';

        if (that._isMobile) {
            const oldHoveredItem = that._hoveredCondition;

            if (oldHoveredItem) {
                oldHoveredItem.classList.remove('drop-target', 'top', 'bottom');
                delete that._hoveredCondition;
            }

            const realTarget = document.elementFromPoint(event.clientX, y);

            if (realTarget) {
                target = realTarget;
            }
        }

        let closestCondition = target.closest('.lw-filter-group-condition'),
            side;

        if (closestCondition) {
            hoveredItem = closestCondition;

            const rect = hoveredItem.getBoundingClientRect(),
                topDistance = Math.abs(y - rect.top),
                bottomDisatnce = Math.abs(y - rect.bottom);

            side = topDistance < bottomDisatnce ? 'top' : 'bottom';
        }
        else {
            let closest, closestDistance;

            dragDetails.allConditions.forEach(condition => {
                const rect = condition.getBoundingClientRect(),
                    topDistance = Math.abs(y - rect.top),
                    bottomDisatnce = Math.abs(y - rect.bottom),
                    bestDistance = Math.min(topDistance, bottomDisatnce);

                if (closestDistance === undefined || bestDistance < closestDistance) {
                    closest = condition;
                    closestDistance = bestDistance;
                    side = topDistance < bottomDisatnce ? 'top' : 'bottom';
                }
            });

            closestCondition = closest;
        }

        if (closestCondition !== draggedItem && !(closestCondition.hasAttribute('limit-selection') && side === 'bottom')) {
            const conditionsInGroup = Array.from(closestCondition.parentElement.getElementsByClassName('lw-filter-group-condition')),
                indexOfDraggedItem = conditionsInGroup.indexOf(draggedItem);

            if (indexOfDraggedItem !== -1) {
                if (side === 'top' && closestCondition === conditionsInGroup[indexOfDraggedItem + 1] ||
                    side === 'bottom' && closestCondition === conditionsInGroup[indexOfDraggedItem - 1]) {
                    closestCondition = undefined;
                }
            }
        }
        else {
            closestCondition = undefined;
        }

        hoveredItem = closestCondition;
        dragDetails.side = side;

        clearInterval(that._dragInterval);
        that._dragInterval = setInterval(function () {
            const rect = that.getBoundingClientRect();

            if (that.$.scrollableContainer.scrollHeight > 0 &&
                rect.left <= event.clientX && rect.left + rect.width >= event.clientX) {
                if (y >= rect.top && y <= rect.top + 36) {
                    that.$.scrollableContainer.scrollTop -= that._autoScrollCoefficient;
                }
                else if (y >= rect.top + rect.height - 36 && y <= rect.top + rect.height) {
                    that.$.scrollableContainer.scrollTop += that._autoScrollCoefficient;
                }
                else {
                    clearInterval(that._dragInterval);
                }
            }
            else {
                clearInterval(that._dragInterval);
            }
        }, 1);

        if (hoveredItem) {
            if (that._hoveredCondition && hoveredItem !== that._hoveredCondition) {
                that._hoveredCondition.classList.remove('drop-target', 'top', 'bottom');
            }

            const hoveredItemGroup = hoveredItem.closest('.lw-filter-group');

            if (hoveredItemGroup && hoveredItemGroup.hasAttribute('restricted')) {
                that._hoveredCondition = undefined;
                return;
            }

            that._hoveredCondition = hoveredItem;
            hoveredItem.classList.remove('top', 'bottom');
            hoveredItem.classList.add(side, 'drop-target');
        }
        else if (that._hoveredCondition) {
            that._hoveredCondition.classList.remove('drop-target', 'top', 'bottom');
            delete that._hoveredCondition;
        }
    }

    /**
     * Adds drag feedback.
     */
    _addDragFeedback() {
        const that = this,
            feedback = document.createElement('div');

        that.rightToLeft ? feedback.setAttribute('right-to-left', '') : feedback.removeAttribute('right-to-left');

        feedback.className = 'lw-query-builder-drag-feedback';

        if (that.theme) {
            feedback.setAttribute('theme', that.theme);
        }

        document.body.appendChild(feedback);
        return feedback;
    }

    /**
     * document move handler.
     */
    _documentUpHandler(event) {
        const that = this,
            dragDetails = that._dragDetails;

        if (!dragDetails) {
            if (that.$.conditionsMenu.opened && that._selectedElement && !that._selectedElement.classList.contains('lw-filter-add-btn')) {
                that.$.conditionsMenu._hoverViaKeyboard(that.$.conditionsMenu.querySelector('lw-menu-item[value="' + that._editedItem.data + '"]'));
            }

            return;
        }

        const draggedItem = dragDetails.item,
            draggedItemData = dragDetails.data,
            hoveredItem = that._hoveredCondition;

        delete that._dragDetails;
        delete that._hoveredCondition;
        that.$.scrollableContainer._scrollView.disableSwipeScroll = false;

        if (!that.hasAttribute('dragging')) {
            return;
        }

        clearInterval(that._dragInterval);
        window.getSelection().removeAllRanges();
        that.removeAttribute('dragging');
        draggedItem.classList.remove('dragged');
        dragDetails.feedback.remove();

        if (!hoveredItem) {
            that.$.fireEvent('dragEnd', { data: draggedItemData.data, item: draggedItem, originalEvent: event, target: null, targetData: null, targetSide: null });
            return;
        }

        const hoveredItemData = that._valueFlat.filter(item => item.htmlNode === hoveredItem)[0],
            dragEndEvent = that.$.fireEvent('dragEnd', {
                data: draggedItemData.data,
                item: draggedItem,
                originalEvent: event,
                target: hoveredItem,
                targetData: hoveredItemData.data,
                targetSide: dragDetails.side
            });

        hoveredItem.classList.remove('drop-target', 'top', 'bottom');

        if (dragEndEvent.defaultPrevented) {
            return;
        }

        const value = that.value,
            draggedPath = draggedItemData.nodeId.split('.').map(index => parseFloat(index)),
            groupInValue = value[(draggedPath[0] - 1) * 2],
            hoveredPath = hoveredItemData.nodeId.split('.').map(index => parseFloat(index)),
            targetGroupInValue = value[(hoveredPath[0] - 1) * 2];
        let operator = 'and';

        if (groupInValue.length > 1) {
            if (draggedPath[1] === 0) {
                // condition is first in group
                operator = groupInValue[1];
                groupInValue[1] = '!remove!';
            }
            else {
                // condition is not first in group
                operator = groupInValue[draggedPath[1] - 1];
                groupInValue[draggedPath[1] - 1] = '!remove!';
            }
        }

        groupInValue[draggedPath[1]] = '!remove!';

        if (dragDetails.side === 'top') {
            targetGroupInValue.splice(hoveredPath[1], 0, draggedItemData.data, operator);
        }
        else {
            targetGroupInValue.splice(hoveredPath[1] + 1, 0, operator, draggedItemData.data);
        }

        for (let i = 0; i < value.length; i++) {
            if (Array.isArray(value[i])) {
                value[i] = value[i].filter(member => member !== '!remove!');
            }
        }

        for (let i = value.length - 1; i >= 0; i--) {
            if (Array.isArray(value[i]) && value[i].length === 0) {
                if (i === 0) {
                    value.splice(0, 2);
                }
                else {
                    value.splice(i - 1, 2);
                    i--;
                }
            }
        }

        that._emptyElementsStructure(true);
        that._convertValueToFlat(value);
        that._generateHTMLStructureFromFlatValue();
        that._validValue = that._getValidValue();

        const oldValueAsString = JSON.stringify(that._validValue);

        if (that._oldValueAsString !== oldValueAsString) {
            that._oldValueAsString = oldValueAsString;
            that.$.fireEvent('change', { value: JSON.parse(oldValueAsString), 'linq': that._parseQueryToLinq(that._validValue) });
        }
    }

    /**
    * Handling click on delete button
    */
    _clickHandlerDeleteButton(item, isEmptyCheck) {
        const that = this;

        if (!item || !item.classList) {
            return;
        }

        that._closeEditor();

        if (that.getElementsByClassName('lw-filter-group-condition').length === 1) {
            // resets only condition
            const containers = that._valueFlat[1].htmlNode.children;

            that.value = [[[]]];
            that._validValue = that._getValidValue();

            that._valueFlat[1].data = [];
            that._valueFlat[1].htmlNode.setAttribute('limit-selection', '');
            containers[0].setAttribute('placeholder', '');
            containers[1].setAttribute('placeholder', '');
            containers[2].setAttribute('placeholder', '');
            containers[0].firstElementChild.innerHTML = that.propertyPlaceholder;
            containers[1].firstElementChild.innerHTML = that.operatorPlaceholder;
            containers[2].firstElementChild.innerHTML = that.valuePlaceholder;

            const oldValueAsString = JSON.stringify(that._validValue);

            if (that._oldValueAsString !== oldValueAsString) {
                that._oldValueAsString = oldValueAsString;
                that.$.fireEvent('change', { value: JSON.parse(oldValueAsString), 'linq': that._parseQueryToLinq(that._validValue) });
            }

            return;
        }

        if (item.classList.contains('lw-filter-group')) {
            if (isEmptyCheck && that._valueFlat.filter(conditionItem => conditionItem.parentId === item.getAttribute('node-id')).length > 0) {
                return;
            }

            that._deleteElement(item, 'group');
        }
        else {
            that._deleteElement(item);
        }

        that._generateValue();
        that.$.scrollableContainer.refresh();

        Array.from(that.$.contentContainer.children).forEach((filterGroup, index) => {
            const parentId = (index + 1).toString();

            filterGroup.setAttribute('node-id', parentId);
            that._valueFlat.filter(item => item.htmlNode === filterGroup)[0].nodeId = parentId;

            Array.from(filterGroup.children[1].children).forEach((element, index) => {
                const valueFlatItem = that._valueFlat.filter(item => item.htmlNode === element)[0],
                    id = parentId + '.' + index;

                element.setAttribute('node-id', id);
                valueFlatItem.parentId = parentId;
                valueFlatItem.nodeId = id;
            });
        });
    }

    /**
     * Handles menu closing.
     */
    _menuCloseHandler() {
        const that = this,
            button = that.$.conditionsMenu.controlledBy;

        button.setAttribute('aria-expanded', false);
        button.removeAttribute('aria-controls');
        delete that.$.conditionsMenu.controlledBy;
    }

    /**
     * Handles menu closing.
     */
    _menuClosingHandler(event) {
        const detail = event.detail;

        if (detail.trigger === 'interaction' && this._selectedElement === detail.target) {
            event.preventDefault();
        }
    }

    /**
     * Handles menu item click.
     */
    _menuItemClickHandler(event) {
        const that = this,
            selectedElement = that._selectedElement.closest('.lw-filter-group-operator, .lw-filter-nested-operator'),
            details = event.detail,
            value = details.value;
        let nodeId;

        if (selectedElement) {
            selectedElement.innerHTML = that.localize(value) || details.label;
            selectedElement.value = value;

            if (selectedElement.classList.contains('lw-filter-nested-operator')) {
                nodeId = selectedElement.getAttribute('node-id');
            }
            else {
                nodeId = selectedElement.parentElement.getAttribute('node-id');
            }

            for (let i = 0; i < that._valueFlat.length; i++) {
                if (that._valueFlat[i].nodeId === nodeId) {
                    that._valueFlat[i].data = selectedElement.value;
                    break;
                }
            }

            that._generateValue();
        }
        else {
            nodeId = that._selectedElement.parentElement.getAttribute('node-id');
            that._addElement('group', null, value);
        }

        that.$.scrollableContainer.refresh();
    }

    /**
    * Creates new filter condition row
    * @param {Array} condition (optional). An array with a condition params. If "condition" parameter is not set - in the method is used default value
    */
    _newFilterConditionRow(condition = []) {
        const that = this,
            dataField = condition[0];
        let dataFieldWithLabel = that._fields.find(item => item.value === dataField),
            dataFieldsLabel = dataFieldWithLabel ? dataFieldWithLabel.label : undefined;
        let operation;

        if (dataField === undefined || !dataFieldsLabel && that.fieldsMode === 'static') {
            condition.length = 0;
        }
        else {
            if (!dataFieldsLabel) {
                dataFieldWithLabel = that._getDynamicFieldInfo(dataField);
                dataFieldsLabel = dataFieldWithLabel.label;
                condition[0] = dataFieldWithLabel.dataField;
            }

            const validOperations = that._getFilterOperations(dataFieldWithLabel);

            operation = validOperations.find(validOperation => validOperation.value === condition[1]);

            if (!operation) {
                condition.splice(1, 2);
            }
            else {
                operation = operation.label;
            }
        }

        const value = that._formatValueStringRepresentation(condition[2], condition[0], condition[1]);
        let conditionRow = document.createElement('div'),
            id = 'condition' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
            template = '<div class="filter-builder-item lw-filter-field-name" id="' + id + 'Field" ' + (dataFieldsLabel ? '><div class="lw-value-container" role="presentation">' + dataFieldsLabel : 'placeholder><div class="lw-value-container" role="presentation">' + that.propertyPlaceholder) + '</div></div>' +
                '<div class="filter-builder-item lw-filter-operation" id="' + id + 'Operation" ' + (operation ? '><div class="lw-value-container" role="presentation">' + operation : 'placeholder><div class="lw-value-container" role="presentation">' + that.operatorPlaceholder) + '</div></div>' +
                '<div class="filter-builder-item lw-filter-value" id="' + id + 'Value" ' +
                (condition[2] !== undefined ? '><div class="lw-value-container" role="presentation">' + value : 'placeholder><div class="lw-value-container" role="presentation">' + that.valuePlaceholder) + '</div></div>' +
                '<div class="lw-filter-delete-btn" role="button" aria-label="Close"></div>';

        conditionRow.className = 'lw-filter-group-condition';
        conditionRow.setAttribute('role', 'group');

        conditionRow.innerHTML = template;
        that._setAriaLabel(conditionRow);

        if (!condition.length) {
            conditionRow.setAttribute('limit-selection', '');
        }

        return conditionRow;
    }

    /**
     * Sets the WAI-ARIA property aria-label
     */
    _setAriaLabel(conditionRow) {
        const label = [];

        for (let i = 0; i < conditionRow.children.length - 1; i++) {
            const child = conditionRow.children[i];

            if (!child.classList.contains('lw-visibility-hidden') &&
                !child.hasAttribute('placeholder')) {
                label.push(conditionRow.children[i].innerText);
            }
        }

        if (label.length === 0) {
            conditionRow.setAttribute('aria-label', 'Empty condition row');
            return;
        }

        conditionRow.setAttribute('aria-label', label.join(' '));
    }

    /**
    * Removes a condition and it's HTML representation
    * @param {Any} value.
    * @param {String} field.
    */
    _formatValueStringRepresentation(value, field, operation) {
        const that = this,
            fieldData = that._getFieldByFieldName(field);
        let valueFormattedByType;

        if (!fieldData) {
            return value;
        }

        if (value === undefined || value === null) {
            return that.valuePlaceholder;
        }

        if (operation !== undefined && that.customOperations && that.customOperations.length > 0) {
            operation = that.customOperations.find(customOperation => customOperation.name === operation);

            if (operation && operation.valueTemplate) {
                return '<span>' + operation.valueTemplate(that._editor, value) + '</span>';
            }
        }

        switch (fieldData.dataType.toLowerCase()) {
            case 'date':
            case 'datetime':
                value = value instanceof Date || typeof value === 'string' || (typeof value === 'number' && !isNaN(value)) ? new LW.Utilities.DateTime(value) : value;
                value.calendar.days = that._localizedDays;
                value.calendar.months = that._localizedMonths;
                value.calendar.locale = that.locale;
                valueFormattedByType = value.toString(fieldData.dataType === 'date' ? that.formatStringDate : that.formatStringDateTime);
                break;
            case 'array':
                valueFormattedByType = typeof value === 'string' ? value.split(',') : value;
                break;
            case 'object':
                valueFormattedByType = typeof value === 'string' ? value : JSON.stringify(value);
                break;
            case 'number':
                valueFormattedByType = value;
                break;
            case 'boolean':
                valueFormattedByType = !!value;
                break;
            default:
                valueFormattedByType = value + '';
                break;

        }

        if (!that.valueFormatFunction) {
            return '<span>' + valueFormattedByType + '</span>';
        }

        return '<span>' + that.valueFormatFunction(valueFormattedByType, field, (fieldData.dataType || 'string')) + '</span>';
    }

    /**
    * Return field's data by given field name
    * @param {String} fieldName
    */
    _getFieldByFieldName(fieldName) {
        return Object.assign({}, this._fields.find(item => item.value === fieldName));
    }

    /**
    * Refreshes the structure
    */
    _refresh() {
        const that = this;

        that._generateValue();
        that._emptyElementsStructure();
        that._generateHTMLStructureFromFlatValue();
        that._restrictNesting();
    }

    /**
    * Generates the new value of "value" property from flat
    */
    _generateValue(preventEventFiring) {
        const that = this;
        let groupsWithItems = [],
            value = that._valueFlat.slice(0),
            structure = [];

        //Get all condition groups
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            let group = {};

            if (item.type === 'group') {
                group.nodeId = item.nodeId;
                group.parentId = item.parentId;
                group.data = item.data;
                //group.structure = [item.data || 'or'];
                //group.structure = item.data ? [item.data] : [];
                group.structure = [];
                groupsWithItems.push(group);
            }
        }

        for (let i = 0; i < groupsWithItems.length; i++) {
            const group = groupsWithItems[i];
            //let conditions = [],
            //operators = [];

            for (let g = 0; g < value.length; g++) {
                const item = value[g];

                if (item.parentId === group.nodeId) {
                    if (item.type === 'condition') {
                        //const operator = value.filter(item => {
                        //    return (item.parentId === group.nodeId && item.type === 'condition' && item.data.length)
                        //});
                        const operator = value[g - 1];

                        if (operator && operator.parentId === group.nodeId && operator.type === 'operator') {
                            group.structure.push(operator.data.toString());
                        }

                        group.structure.push(item.data);
                    }
                    //else if (item.type === 'operator') {
                    //    operators.push(item);
                    //}
                }
            }

            //conditions = value.filter(item => {
            //    return (item.parentId === group.nodeId && item.type === 'condition' && item.data.length);
            //}),
            //operators = value.filter(item => {
            //    return (item.parentId === group.nodeId && item.type === 'condition' && item.data.length);
            //});

            //for (let i = 0; i < conditions.length; i++) {
            //   i === 0 ? group.structure.unshift(conditions[i].data) : group.structure.push(conditions[i].data);
            //}
        }

        groupsWithItems = groupsWithItems.filter(item => {
            return (item.structure.length > 0);
        });

        groupsWithItems.sort(function (a, b) {
            return (b.nodeId.split('.').length - a.nodeId.split('.').length);
        });

        for (let i = 0; i < groupsWithItems.length; i++) {
            const currentElement = groupsWithItems[i],
                group = groupsWithItems.filter(item => {
                    return (item.nodeId === currentElement.parentId)
                })[0];

            if (group && group.structure) {
                group.structure.push(currentElement.structure);
                continue;
            }

            if (currentElement.nodeId === '0') {
                structure = structure.concat(currentElement.structure);
                continue;
            }

            //Push the group operator
            if (currentElement.data) {
                if (i > 0) {
                    structure.push(currentElement.data);
                }

                //Concat the group structure
                structure.push(currentElement.structure);
            }
        }

        //if (groupsWithItems.length > 0) {
        //    that.value = that._valueFlat.length > 1 ? groupsWithItems[groupsWithItems.length - 1].structure : groupsWithItems;
        //}
        //else {
        //const data = that._getItemById('0').data;

        //that.value = data ? [data] : [];
        //}

        that.value = structure;
        that._validateValue();
        that._validValue = that._getValidValue();

        if (!preventEventFiring) {
            const oldValueAsString = JSON.stringify(that._validValue);

            if (that._oldValueAsString !== oldValueAsString) {
                that._oldValueAsString = oldValueAsString;
                that.$.fireEvent('change', { value: JSON.parse(oldValueAsString), 'linq': that._parseQueryToLinq(that._validValue) });
            }
        }
    }

    /**
    * Return item's data by given id
    * @param {String} id - item's id (or parent id - demending on the second parameter)
    * @param {Boolean} isParent (optional)  - of the items is searched by parentId
    */
    _getItemById(id, isParent) {
        const that = this,
            matches = that._valueFlat.filter(item => {
                if (isParent) {
                    return item.parentId === id;
                }
                return item.nodeId === id;
            }),
            editedItem = matches.length > 0 ? matches[0] : null;

        return editedItem;
    }

    /**
     * Validates the value that is going to be stored
     */
    _validateStoredValue(storedValue, fieldName) {
        const that = this;

        if (!fieldName && !that._editedItem) {
            return storedValue;
        }

        if (!fieldName) {
            fieldName = that._editedItem.data[0];

            if (!fieldName) {
                return storedValue;
            }
        }

        const dataType = that._getFieldByFieldName(fieldName).dataType;

        if (dataType === undefined) {
            return storedValue + '';
        }

        //Validate the value
        switch (dataType.toLowerCase()) {
            case 'date':
            case 'datetime':
                storedValue = new LW.Utilities.DateTime(storedValue).toDate();
                break;
            case 'number':
                if (typeof storedValue !== 'number') {
                    storedValue = parseFloat(storedValue);
                }
                break;
            case 'boolean':
                if (typeof storedValue !== 'boolean') {
                    storedValue = !!storedValue;
                }
                break;
            case 'object':
                if (typeof storedValue !== 'object') {
                    storedValue = {};
                }

                break;
            case 'array':
                if (!Array.isArray(storedValue)) {
                    storedValue = [storedValue];
                }
                break;
            default:
                if (typeof storedValue !== 'string') {
                    storedValue += '';
                }
                break;
        }

        return storedValue;
    }

    /**
    * Closes an editor and sets the new value in the value's cotainer
    * @param {Boolean} preventEventFiring (optional).
    */
    _closeEditor(preventEventFiring) {
        const that = this;
        let storedValue;

        if (!that._editedItem || !that._editorIsOpen) {
            return;
        }

        const editedItem = that._editedItem,
            //editedRow = editedItem.htmlNode,
            //nodeId = editedItem.nodeId,
            editedHTMLField = that._editor.closest('.filter-builder-item'),
            editedHTMLvalueContainer = editedHTMLField.querySelector('.lw-value-container'),
            condition = editedHTMLField.parentElement,
            valueContainer = condition.children[2];

        if (that._editor === that.$.dateTimePickerEditor) {
            that._editor._inputChangeHandler();
            storedValue = that._editor.value;

            if (storedValue) {
                storedValue = storedValue.toDate();
            }
        }
        else if (that._editor === that.$.checkBoxEditor) {
            storedValue = that._editor.checked;
        }
        else if (that._editor === that.$.customEditor) {
            if (that._editor) {
                const customNumericTextBoxes = Array.from(that._editor.getElementsByTagName('lw-numeric-text-box'));

                customNumericTextBoxes.forEach(customNumericTextBox => customNumericTextBox._inputBlurHandler());
            }

            storedValue = that._validateStoredValue(that._selectedCustomCondition.handleValue(that._editor));
        }
        else if (that._editor === that.$.numericTextBoxEditor) {
            that._editor._inputBlurHandler();
            storedValue = that._editor.value;
        }
        else if (editedHTMLField.classList.contains('lw-filter-value')) {
            const selectedField = that._getFieldByFieldName(that._editedItem.data[0]);

            if (selectedField.dataType === 'array') {
                storedValue = that._editor.value.split(',');
            }
            else if (selectedField.dataType === 'object') {
                storedValue = JSON.parse(that._editor.value);
            }
            else {
                storedValue = that._editor.value;
            }
        }
        else {
            storedValue = that._editor.value;
        }

        //editedHTMLvalueComponent = editedRow.querySelector('.lw-filter-value'),

        //that._updateValueInFlatArray(nodeId, storedValue, 'value', (valueDataType || 'string'));
        //Converted the new value to the appropriate type


        //Update the condition object with the new value
        if (editedHTMLField.classList.contains('lw-filter-field-name')) {
            if (storedValue.trim() === '') {
                that._hideEditor(editedHTMLField, editedItem.data[0] === undefined);
                return;
            }

            if (condition.hasAttribute('limit-selection')) {
                // "placeholder" condition
                condition.removeAttribute('limit-selection');
                condition.parentElement.nextElementSibling.removeAttribute('limit-selection');
            }

            const existingField = that._fields.find(item => item.label === storedValue),
                oldFieldValue = editedItem.data[0];

            if (existingField) {
                editedItem.data[0] = existingField.value;
            }
            else if (that.fieldsMode === 'dynamic') {
                const dynamicFieldInfo = that._getDynamicFieldInfo(storedValue);

                storedValue = dynamicFieldInfo.label;
                editedItem.data[0] = dynamicFieldInfo.dataField;
            }
            else {
                editedHTMLvalueContainer.innerHTML = that._fields.find(item => item.value === oldFieldValue).label;
                that._hideEditor(editedHTMLField);
                return;
            }

            editedHTMLvalueContainer.innerHTML = storedValue;
            that._handleFieldChange([oldFieldValue, editedItem.data[0]], [valueContainer, editedItem, condition]);
        }
        else if (editedHTMLField.classList.contains('lw-filter-operation')) {
            that._handleOperationChange([editedItem, storedValue, that._editor.$.input.dataValue], [editedHTMLvalueContainer, valueContainer]);
        }
        else {
            editedItem.data[2] = storedValue;
            editedHTMLvalueContainer.innerHTML = that._formatValueStringRepresentation(storedValue, that._editedItem.data[0], that._editedItem.data[1]);
        }

        that._generateValue(preventEventFiring);
        that._hideEditor(editedHTMLField);
    }

    /**
     * Gets the info of a dynamic field.
     */
    _getDynamicFieldInfo(value) {
        const that = this,
            dynamicFieldInfo = { label: value, dataField: value, dataType: 'string' };

        if (that.getDynamicField) {
            const customInfo = that.getDynamicField(value);

            if (customInfo.label) {
                dynamicFieldInfo.label = customInfo.label;
            }

            if (customInfo.dataField) {
                dynamicFieldInfo.dataField = customInfo.dataField;
            }

            if (customInfo.dataType) {
                dynamicFieldInfo.dataType = customInfo.dataType;
            }

            if (customInfo.filterOperations &&
                Array.isArray(customInfo.filterOperations) && customInfo.filterOperations.length > 0) {
                dynamicFieldInfo.filterOperations = customInfo.filterOperations;
            }

            if (customInfo.lookup) {
                dynamicFieldInfo.lookup = customInfo.lookup;
            }
        }

        that._manuallyAddedFields.push(dynamicFieldInfo);
        that._mapFieldsToMenu();
        return dynamicFieldInfo;
    }

    /**
     * Handles field change.
     */
    _handleFieldChange(fields, elements) {
        const that = this,
            oldFieldValue = fields[0],
            editedItem = elements[1],
            condition = elements[2],
            valueContainer = elements[0],
            newField = that._fields.find(field => field.value === fields[1]),
            newOperations = that._getFilterOperations(newField),
            propertySelectedCheck = function () {
                if (newField.value !== oldFieldValue) {
                    that.$.fireEvent('propertySelected', { label: newField.label, value: newField.value });
                }
            };

        if (!oldFieldValue || editedItem.data[1] === undefined) {
            that._handleOnlyOperation(newOperations, editedItem.data, condition);
            propertySelectedCheck();
            return;
        }

        const oldField = that._fields.find(field => field.value === oldFieldValue),
            oldFieldType = oldField.dataType,
            newFieldType = newField.dataType;

        if (newField === oldField ||
            newFieldType === oldFieldType && !newField.filterOperations && !oldField.filterOperations) {
            return;
        }

        const validInNewOperations = !!newOperations.find(operation => operation.value === editedItem.data[1]);

        if (validInNewOperations) {
            if (newFieldType === oldFieldType) {
                return;
            }

            if (newFieldType === 'date' && oldFieldType === 'dateTime' ||
                newFieldType === 'dateTime' && oldFieldType === 'date') {
                // reformat previous value
                valueContainer.firstElementChild.innerHTML = that._formatValueStringRepresentation(editedItem.data[2], editedItem.data[0], editedItem.data[1]);
                propertySelectedCheck();
                return;
            }

            // remove previous value
            editedItem.data.splice(2, 1);
            valueContainer.setAttribute('placeholder', '');
            valueContainer.firstElementChild.innerHTML = that.valuePlaceholder;
            propertySelectedCheck();
            return;
        }

        // remove previous operator and value
        editedItem.data.splice(1, 2);
        condition.children[1].setAttribute('placeholder', '');
        condition.children[1].firstElementChild.innerHTML = that.operatorPlaceholder;
        valueContainer.setAttribute('placeholder', '');
        valueContainer.firstElementChild.innerHTML = that.valuePlaceholder;
        valueContainer.classList.remove('lw-visibility-hidden');

        that._handleOnlyOperation(newOperations, editedItem.data, condition);
        propertySelectedCheck();
    }

    /**
     * Handles change to a field with only one operation.
     */
    _handleOnlyOperation(newOperations, data, condition) {
        if (newOperations.length === 1) {
            const onlyOperation = newOperations[0];

            data[1] = onlyOperation.value;
            condition.children[1].removeAttribute('placeholder', '');
            condition.children[1].firstElementChild.innerHTML = newOperations[0].label;

            if (onlyOperation.value === 'isblank' || onlyOperation.value === 'isnotblank' || onlyOperation.custom && onlyOperation.hideValue) {
                data.splice(2, 1);
                condition.children[2].classList.add('lw-visibility-hidden');
            }
        }
    }

    /**
     * Handles operation change.
     */
    _handleOperationChange(data, elements) {
        const that = this,
            editedItem = data[0],
            storedLabel = data[1],
            storedValue = data[2],
            editedHTMLvalueContainer = elements[0],
            valueContainer = elements[1],
            oldOperation = editedItem.data[1] !== undefined ? that._filterOperationDescriptions.find(item => item.value === editedItem.data[1]) : undefined,
            newOperation = that._filterOperationDescriptions.find(item => item.value === storedValue),
            newOperationValue = newOperation.value;

        if (newOperation === oldOperation) {
            return;
        }

        const fieldName = editedItem.data[0],
            operation = editedItem.data[1],
            value = editedItem.data[2];

        editedItem.data[1] = newOperationValue;
        editedHTMLvalueContainer.innerHTML = storedLabel;

        if (newOperationValue === 'isblank' || newOperationValue === 'isnotblank' || newOperation.custom && newOperation.hideValue) {
            editedItem.data.splice(2, 1);
            valueContainer.classList.add('lw-visibility-hidden');
        }
        else if (valueContainer.classList.contains('lw-visibility-hidden')) {
            valueContainer.setAttribute('placeholder', '');
            valueContainer.classList.remove('lw-visibility-hidden');
            valueContainer.firstElementChild.innerHTML = that.valuePlaceholder;
        }
        else if (newOperation.custom) {
            //Sets that._editor to the custom editor
            const field = that._getFieldByFieldName(fieldName);

            if (newOperation.editorTemplate) {
                const editorStructure = newOperation.editorTemplate(field.dataType, operation, field);

                if (editorStructure) {
                    that.$.customEditor.innerHTML = '';
                    that.$.customEditor.appendChild(editorStructure);
                }
            }

            valueContainer.firstElementChild.innerHTML = newOperation.valueTemplate ? newOperation.valueTemplate(that.$.customEditor, value) : value;
        }
        else if (value === undefined) {
            editedItem.data.splice(2, 1);
            valueContainer.setAttribute('placeholder', '');
            valueContainer.firstElementChild.innerHTML = that.valuePlaceholder;
        }
        else if (!newOperation.custom) {
            valueContainer.firstElementChild.innerHTML = value;
        }
    }

    /**
     * Hides editor.
     */
    _hideEditor(editedHTMLField, placeholder) {
        const that = this;

        if (placeholder) {
            editedHTMLField.setAttribute('placeholder', '');
        }

        editedHTMLField.removeAttribute('edited');
        that.$.editorsContainer.removeAttribute('open');

        if (that._editor.close) {
            that._editor.close();
        }

        that._editor.classList.add('lw-hidden');
        that._editorIsOpen = that._enterIsPressedInEditor = false;
        that.$.scrollableContainer.refresh();
        that._setAriaLabel(editedHTMLField.parentElement);
    }

    /**
    * Handling click on delete buton
    */
    _clickHandlerFilterButton(elementClassList, itemId, target) {
        const that = this;

        function prepareContextMenu(target, dataSource, selectedItem) {
            that._contextMenuOptions = dataSource.length === 0 ? that._defaultFilterOperationDescriptions : dataSource;
            that._handleContextMenu(target);

            if (that.$.conditionsMenu.opened) {
                that.$.conditionsMenu._discardKeyboardHover();
                that.$.conditionsMenu._hoverViaKeyboard(that.$.conditionsMenu.querySelector('lw-menu-item[value="' + selectedItem + '"]'));
            }
        }

        if (target.closest('.lw-editors-container')) {
            return;
        }

        that._closeEditor();
        that._editedItem = that._getItemById(itemId);

        if (elementClassList.contains('lw-filter-add-btn')) {
            prepareContextMenu(target, that._groupOperationDescriptions);
            return;
        }

        if (!elementClassList.contains('lw-filter-field-name') && (!that._editedItem.data || !that._editedItem.data.length)) {
            return;
        }

        if (elementClassList.contains('lw-filter-group-operator') || elementClassList.contains('lw-filter-nested-operator')) {
            prepareContextMenu(target, that._groupOperationDescriptions, that._editedItem.data);
        }
        else {
            const filterBuilderItem = target.closest('.filter-builder-item');

            filterBuilderItem.removeAttribute('placeholder');

            that._openEditor(target);
        }
    }

    /**
    * Handles context menu position
    * @param {HTML element} target (optional) - the component that is clicked
    */
    _handleContextMenu(target) {
        const that = this;

        if (that._selectedElement === target && that.$.conditionsMenu.opened) {
            that.$.conditionsMenu.close();
            return;
        }

        that._closeEditor();

        if (that.disableContextMenu) {
            that._selectedElement = target;
            return;
        }

        const targetCoordinates = target.getBoundingClientRect(),
            elementCoordinates = that.getBoundingClientRect(),
            x = targetCoordinates.left + that.$.contentContainer.scrollLeft - elementCoordinates.left,
            y = targetCoordinates.top + that.$.contentContainer.scrollTop - elementCoordinates.top + targetCoordinates.height;

        if (target.hasAttribute('aria-haspopup')) {
            if (that.$.conditionsMenu.controlledBy) {
                that.$.conditionsMenu.controlledBy.setAttribute('aria-expanded', false);
                that.$.conditionsMenu.controlledBy.removeAttribute('aria-controls');
            }

            target.setAttribute('aria-controls', that.$.conditionsMenu.id);
            target.setAttribute('aria-expanded', true);
            that.$.conditionsMenu.controlledBy = target;
        }

        that.$.conditionsMenu.dataSource = that._contextMenuOptions;
        that.$.conditionsMenu.open(x, y + 3);
        that._selectedElement = target;
        that.$.scrollableContainer.refresh();
    }

    /**
    * Open an editor at the position of the current editted condition value container
    * @param {Html element} target - the clicked HTML element. Used to be localized element's data and set into editor
    */
    _openEditor(target) {
        const that = this,
            id = target && target.closest('.lw-filter-group-condition') ? target.closest('.lw-filter-group-condition').getAttribute('node-id') : null,
            valueContainer = target.closest('.filter-builder-item'),
            editedItem = that._getItemById(id);
        let field = '';

        if (editedItem.data[0] !== undefined) {
            field = editedItem.data[0];
        }
        else if (that._fields.length) {
            field = that._fields[0].value;
        }

        let fieldData = that._getFieldByFieldName(field),
            value = '', dataValue;
        //filterItemIndex = target.contains('lw-filter-field-name') ? 0 : (target.contains('lw-filter-operation') ? 1 : 2);
        //value = editedItem ? editedItem.data[filterItemIndex] : '' || '';

        let filterItemIndex;

        if (valueContainer.classList.contains('lw-filter-field-name')) {
            filterItemIndex = 0;

            if (!that._fields) {
                that._mapFieldsToMenu();
            }

            fieldData.lookup = { dataSource: that._fields.slice(), readonly: false };
            value = fieldData.label || '';
            dataValue = fieldData.value;
        }
        else if (valueContainer.classList.contains('lw-filter-operation')) {
            filterItemIndex = 1;

            let filteredOptions = that._getFilterOperations(fieldData);

            fieldData.lookup = { dataSource: filteredOptions, readonly: true };

            let correspondingOption = filteredOptions.find(option => option.value === editedItem.data[filterItemIndex]) ||
                filteredOptions[0];

            value = correspondingOption.label;
            dataValue = correspondingOption.value;
        }
        else {
            filterItemIndex = 2;
            value = editedItem.data[filterItemIndex];

            if (value === undefined) {
                value = '';
            }
        }

        if (that._editorIsOpen) {
            that._closeEditor();
        }

        valueContainer.setAttribute('edited', '');
        that._editedItem = editedItem;

        const fields = that._fields,
            fieldItemsMatch = fields.filter(item => {
                return item.value === field;
            }),
            foundCustomConditions = that._filterOperationDescriptions.filter(item => {
                return ((item.value === editedItem.data[1]) && item.custom);
            }),
            fieldItem = fieldItemsMatch.length > 0 ? fieldItemsMatch[0] : null,
            fieldType = (fieldData.lookup && fieldData.lookup.dataSource) ? 'lookup' : fieldItem.dataType;

        if (filterItemIndex !== 2 || foundCustomConditions.length === 0 || !foundCustomConditions[0].editorTemplate) {
            that._openEditorByFieldType(fieldType, value, fieldData, dataValue);
        }
        else {
            that._selectedCustomCondition = foundCustomConditions[0];
            that._openCustomEditor(fieldType, value, fieldData);
        }

        that._editor.classList.remove('lw-hidden');
        that._editorIsOpen = true;
        that.$.editorsContainer.setAttribute('open', '');
        valueContainer.appendChild(that.$.editorsContainer);
        that.$.scrollableContainer.refresh();

        if (!that._editor.classList.contains('lw-custom-editor')) {
            requestAnimationFrame(() => that._editor.focus());
        }

        if (fieldData.lookup && fieldData.lookup.readonly) {
            that._editor.open();
        }
    }

    /**
     * Returns filter operations by field.
     */
    _getFilterOperations(fieldData) {
        const that = this;
        let filteredOptions = that._filterOperationDescriptions.slice();

        if (fieldData.filterOperations) {
            filteredOptions = that._filterOperationDescriptions.filter(item => fieldData.filterOperations.indexOf(item.value) > -1);
        }
        else {
            let filterOperationsByType;

            switch (fieldData.dataType) {
                case 'date':
                case 'dateTime':
                case 'number':
                    filterOperationsByType = ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                    break;
                case 'boolean':
                    filterOperationsByType = ['=', '<>', 'isblank', 'isnotblank'];
                    break;
                case 'object':
                    filterOperationsByType = ['isblank', 'isnotblank'];
                    break;
                case 'string':
                    filterOperationsByType = ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', 'isblank', 'isnotblank'];
                    break;
                default:
                    filterOperationsByType = ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'];
                    break;
            }

            filteredOptions = that._filterOperationDescriptions.filter(item => filterOperationsByType.indexOf(item.value) > -1);
        }

        if (that.showIcons) {
            filteredOptions.map(item => item.icon = that.icons[item.value]);
        }

        return filteredOptions;
    }

    /**
     * Open custom editor
     */
    _openCustomEditor(fieldType, value, fieldData) {
        const that = this,
            editorStructure = that.customOperations[that._selectedCustomCondition.index].editorTemplate(fieldType, value, fieldData);

        that.$.customEditor.innerHTML = '';

        if (editorStructure) {
            that.$.customEditor.appendChild(editorStructure);
        }

        that._editor = that.$.customEditor;
    }

    /**
    * Open specific editor, regarding field type settings and set it's value
    * @param {String} fieldType - type of the edited field, each type has different handling
    * @param {Any} value - the value, that must be set to the editor
    */
    _openEditorByFieldType(fieldType, value, fieldData, dataValue) {
        const that = this;

        if (fieldType) {
            switch (fieldType.toLowerCase()) {
                case 'boolean':
                    that._initializeEditor('checkBox');
                    that._editor.checked = !!value;
                    return;
                case 'date':
                case 'datetime':
                    that._initializeEditor('dateTimePicker');
                    that._editor.formatString = fieldType === 'date' ? that.formatStringDate : that.formatStringDateTime;
                    that._editor.value = value;
                    return;
                case 'number':
                    that._initializeEditor('numericTextBox');
                    that._editor.value = value ? value : 0;
                    return;
            }
        }

        that._initializeEditor('input');

        that._editor.dropDownWidth = that.dropDownWidth;

        if (fieldType === 'lookup') {
            const minLength = fieldData.lookup.minLength;

            that._editor.autoCompleteDelay = fieldData.lookup.autoCompleteDelay || 100;
            that._editor.dataSource = fieldData.lookup.dataSource;
            that._editor.dropDownAppendTo = that.$.container;
            that._editor.dropDownButtonPosition = that.rightToLeft ? 'left' : 'right';
            that._editor.minLength = isNaN(minLength) || minLength === null ? 1 : minLength;
            that._editor.readonly = !!fieldData.lookup.readonly;
        }
        else {
            that._editor.dataSource = [];
            that._editor.dropDownButtonPosition = 'none';
            that._editor.readonly = false;
        }

        if (fieldType === 'object') {
            that._editor.value = JSON.stringify(value ? value : {});
        }
        else {
            if (value === '' && that._editor.readonly) {
                value = fieldData.lookup.dataSource[0].label || '';
            }

            that._editor.value = value + '';

            if (dataValue) {
                that._editor.$.input.dataValue = dataValue;
            }
        }
    }

    /**
    * Initializes Editors instance if it's not initialized.
    */
    _initializeEditor(editor) {
        const that = this;

        if (that.$[editor + 'Editor']) {
            that._editor = that.$[editor + 'Editor'];
            return;
        }

        const editorElement = document.createElement('lw-' + LW.Utilities.Core.toDash(editor));

        if (editor === 'numericTextBox') {
            editorElement.spinButtons = true;
            editorElement.inputFormat = 'floatingPoint';
        }
        else if (editor === 'dateTimePicker') {
            editorElement.dropDownAppendTo = that.$.container;
            editorElement.calendarButton = true;
            editorElement.dropDownDisplayMode = 'auto';
            editorElement.enableMouseWheelAction = true;
            editorElement.locale = that.locale;

            if (!editorElement.messages[that.locale]) {
                editorElement.messages[that.locale] = {};
            }

            editorElement.messages[that.locale].dateTabLabel = that.localize('dateTabLabel');
            editorElement.messages[that.locale].timeTabLabel = that.localize('timeTabLabel');
        }

        editorElement.rightToLeft = that.rightToLeft;
        editorElement.theme = that.theme;
        editorElement.animation = that.animation;
        editorElement.$.addClass('lw-hidden underlined');

        that.$.editorsContainer.appendChild(editorElement);

        that._editor = that.$[editor + 'Editor'] = editorElement;
    }

    /**
     * Gets the value without invalid or incomplete conditions.
     */
    _getValidValue() {
        const that = this,
            value = that.properties.value.value,
            result = [];
        let emptyGroup = false;

        value.forEach((group) => {
            if (Array.isArray(group)) {
                let groupIsValid = false,
                    emptyCondition = false;
                const groupContent = [];

                group.forEach((condition) => {
                    if (Array.isArray(condition)) {
                        const field = condition[0],
                            operation = condition[1],
                            val = condition[2];

                        if (field === undefined || operation === undefined) {
                            emptyCondition = true;
                            return;
                        }

                        if (val !== undefined || operation === 'isblank' || operation === 'isnotblank') {
                            groupIsValid = true;
                            groupContent.push(condition);
                            return;
                        }

                        const operationInfo = that._filterOperationDescriptions.find(currentOperation => currentOperation.value === operation);

                        if (operationInfo.custom && operationInfo.hideValue) {
                            groupIsValid = true;
                            groupContent.push(condition);
                        }
                        else {
                            emptyCondition = true;
                        }
                    }
                    else if (emptyCondition) {
                        emptyCondition = false;
                    }
                    else {
                        groupContent.push(condition);
                    }
                });

                if (groupIsValid) {
                    if (typeof groupContent[groupContent.length - 1] === 'string') {
                        groupContent.pop();
                    }

                    result.push(groupContent);
                }
                else {
                    emptyGroup = true;
                }
            }
            else if (emptyGroup) {
                emptyGroup = false;
            }
            else {
                result.push(group);
            }
        });

        if (typeof result[result.length - 1] === 'string') {
            result.pop();
        }

        return result;
    }
});
