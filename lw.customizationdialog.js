
LW('lw-customization-dialog', class CustomizationDialog extends LW.TabsWindow {
    /**
    * Element's properties
    */
    static get properties() {
        return {
            'dataSource': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'displayMember': {
                value: '',
                type: 'string'
            },
            'filtering': {
                value: false,
                type: 'boolean'
            },
            'grouping': {
                value: false,
                type: 'boolean'
            },
            'headerButtons': {
                value: ['apply', 'close'],
                type: 'array',
                reflectToAttribute: false
            },
            'messages': {
                value: {
                    'en': {
                        'sorting': 'SORTING',
                        'grouping': 'GROUPING',
                        'filtering': 'FILTERING',
                        'columnChooser': 'COLUMN CHOOSER',
                        'applyButton': 'Apply',
                        'closeButton': 'Close',
                        'columnsToSort': 'Columns to Sort',
                        'columnsToGroup': 'Columns to Group',
                        'placeholderSorting': 'No sorting applied',
                        'placeholderGrouping': 'No grouping applied',
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
                        'isnotblank': 'Is not blank'
                    }
                },
                type: 'object',
                extend: true
            },
            'modal': {
                value: true,
                type: 'boolean',
                reflectToAttribute: false
            },
            'pinned': {
                value: true,
                type: 'boolean',
                reflectToAttribute: false
            },
            'reorder': {
                value: false,
                type: 'boolean'
            },
            'selectedTab': {
                value: 0,
                type: 'int'
            },
            'sorting': {
                value: false,
                type: 'boolean'
            },
            'value': {
                value: null,
                type: 'object',
                reflectToAttribute: false
            },
            'valueMember': {
                value: '',
                type: 'string'
            },
            'visibility': {
                value: false,
                type: 'boolean'
            }
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'down': '_findАctiveListBox',
            'document.scroll': '_handleScroll',
            'resize': '_updateElementHeight',
            'applyButton.click': 'close',
            'closeButton.click': 'close',
            'tabsElement.change': '_handleChange',
            'tabsElement.dragStart': '_reorderStartHandler',
            'tabsElement.dragEnd': '_reorderEndHandler',
            'tabsElement.click': '_handleClickOnDynamicNodes',
            'filteringDropDown.change': '_handleFilteringDropDownChange',
            'sortingToggleElement.click': '_handleToggleElementClick',
            'groupingToggleElement.click': '_handleToggleElementClick',
            'allColumnsChooser.down': '_preventDragOnListItem',
            'allColumnsChooser.up': '_preventDragOnListItem',
            'selectedColumnsSorting.down': '_preventDragOnListItem',
            'selectedColumnsSorting.up': '_preventDragOnListItem',
            'selectedColumnsGrouping.down': '_preventDragOnListItem',
            'selectedColumnsGrouping.up': '_preventDragOnListItem',
            'transitionend': '_handleTransitionEnd'
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div id="container">
                    <div id="headerSection" class="lw-header-section">
                        <div id="header" class="lw-header">[[label]]</div>
                        <div id="buttonsContainer" class="lw-buttons-container">
                            <lw-button id="closeButton" class ="lw-close-button" theme="[[theme]]"></lw-button>
                            <lw-button id="applyButton" disabled class ="lw-apply-button" theme="[[theme]]"></lw-button>
                        </div>
                    </div>
                    <div id="contentSection" class="lw-content">
                       <lw-tabs id="tabsElement" selected-index="[[selectedTab]]" animation="[[animation]]" theme="[[theme]]">
                            <lw-tab-item>
                                <div id="placeholderSorting" class ="placeholder"></div>
                                <div id="selectedColumnsSortingContainer" class ="selected-columns sortable container">
                                    <lw-list-box id="selectedColumnsSorting" class ="lw-selected-columns-sorting" selection-mode="none" allow-drag allow-drop placeholder=""></lw-list-box>
                                </div>
                                <div id="allColumnsSortingContainer" class ="all-columns sortable container">
                                    <div class ="toggle-element" id="sortingToggleElement"></div>
                                    <div id="columnsToSort" class ="header-text"></div>
                                    <lw-list-box id="allColumnsSorting" class ="lw-all-columns-sorting"  placeholder="" selection-mode="checkBox"></lw-list-box>
                                </div>
                            </lw-tab-item>
                            <lw-tab-item>
                                <div id="placeholderGrouping" class="placeholder"></div>
                                <div  id="selectedColumnsGroupingContainer" class ="selected-columns sortable container">
                                    <lw-list-box id="selectedColumnsGrouping" class ="lw-selected-columns-grouping" selection-mode="none" allow-drag allow-drop placeholder=""></lw-list-box>
                                </div>
                                <div  id="allColumnsGroupingContainer" class ="all-columns sortable container">
                                    <div class ="toggle-element" id="groupingToggleElement"></div>
                                    <div id="columnsToGroup" class ="header-text"></div>
                                    <lw-list-box id="allColumnsGrouping" class ="lw-all-columns-grouping"  placeholder="" selection-mode="checkBox"></lw-list-box>
                                </div>
                            </lw-tab-item>
                            <lw-tab-item>
                                <lw-accordion id="allColumnsFiltering" placeholder="" expand-mode="multiple" tabindex="1"></lw-accordion>
                            </lw-tab-item>
                            <lw-tab-item>
                                <lw-list-box id="allColumnsChooser" class ="lw-all-columns-chooser" placeholder="" allow-drag allow-drop selection-mode="checkBox"></lw-list-box>
                            </lw-tab-item>
                        </lw-tabs>
                    </div>
                    <lw-drop-down-list id="filteringDropDown" drop-down-append-to="body" drop-down-width="auto" drop-down-height="auto" animation="[[animation]]" theme="[[theme]]" class ="lw-filtering-drop-down"></lw-drop-down-list>
                </div>`;
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.TabsWindow': 'lw.window.js',
            'LW.Accordion': 'lw.accordion.js',
            'LW.DropDownList': 'lw.dropdownlist.js'
        }
    }

    /**
     * Updates the element when a property is changed.
     * @param {string} propertyName The name of the property.
     * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
     * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

      //  super.propertyChangedHandler(propertyName, oldValue, newValue);

        switch (propertyName) {
            case 'valueMember':
            case 'displayMember':
            case 'dataSource':
                that._mapDataSource(that.dataSource, that.valueMember, that.displayMember);
                that._applyValue(that.value);
                that._handlePlaceholderAndContainer();
                that.$.applyButton.disabled = true;
                break;
            case 'value':
                that._applyValue(newValue);
                that._handlePlaceholderAndContainer();
                break;
            case 'locale':
            case 'messages':
                that._applyMessages();
                break;
            case 'sorting':
            case 'grouping':
            case 'filtering':
            case 'reorder':
            case 'visibility':
                that._toggleCustomizationOptions();
                break;
            case 'theme':
            case 'animation':
                that._applyBindings();
                break;
        }
    }

    /**
    * Element's ready method.
    */
    ready() {
        const that = this;

        that.$.addClass('lw-hidden');
        super.ready();
        that._applyBindings();
        that._mapDataSource(that.dataSource, that.valueMember, that.displayMember);
        that._applyValue(that.value);
        that._applyMessages();
        that._toggleCustomizationOptions();
        that._randomId = Math.floor((Math.random() * 100000));
        that._applyListboxTemplates();
        that._handlePlaceholderAndContainer();
        that.$.removeClass('lw-hidden');
    }


    /*
    * Open method
    */
    open() {
        const that = this;
        super.open();

        that._resizeListBoxContainers();
        that._updateElementHeight();

        if (that.animation!=='none') {
            that._resizeAtAnimationEnd = true;
            [that.$.sortingToggleElement, that.$.groupingToggleElement].forEach((item) => that._toggleGroup(item))
        }

        that.$.applyButton.disabled = true;
    }


    /*
    * Applies templates to the sortable listboxes
    */
    _applyListboxTemplates() {
        const that = this,
            data = [
                {
                    listbox: that.$.selectedColumnsSorting,
                    prefix: 'sortingTemplate',
                    template: `<span class="lw-drag-area"></span>
                        <span class="lw-label">{{label}}</span>
                        <span class="lw-close-item-button"></span>
                        <lw-check-box class ="lw-sort-button"></lw-check-box>`
                },
                {
                    listbox: that.$.selectedColumnsGrouping,
                    prefix: 'groupingTemplate',
                    template: `<span class="lw-drag-area"></span>
                        <span class="lw-label">{{label}}</span>
                        <span class="lw-close-item-button"></span>`
                },
                {
                    listbox: that.$.allColumnsChooser,
                    prefix: 'columnChooserTemplate',
                    template: `<span class="lw-drag-area"></span>
                        <span class="lw-label">{{label}}</span>`
                }
            ];

        data.forEach(item => {
            const that = this,
                template = document.createElement('template'),
                id = item.prefix + that._randomId;

            template.innerHTML = item.template;
            template.id = id;
            that.appendChild(template);
            item.listbox.itemTemplate = id;
        });
    }

    /*
    * Updates 'theme' and 'animation' settings of the custom elements in lw-tabs
    */
    _applyBindings() {
        const that = this,
            elements = ['selectedColumnsSorting', 'allColumnsSorting', 'selectedColumnsGrouping', 'allColumnsGrouping', 'allColumnsFiltering', 'allColumnsChooser'],
            properties = ['theme', 'animation'];

        elements.forEach(element => properties.forEach(property => that.$[element][property] = that[property]));
    }

    /*
    * Updates tabs and labels, according to the localization messages
    */
    _applyMessages() {
        const that = this,
            tabs = ['sorting', 'grouping', 'filtering', 'columnChooser'],
            buttons = ['closeButton', 'applyButton'],
            containers = ['columnsToSort', 'columnsToGroup', 'placeholderSorting', 'placeholderGrouping'];

        tabs.forEach((tab, i) => that.$.tabsElement.update(i, that.localize(tab)));
        buttons.forEach(button => that.$[button].title = that.localize(button));
        containers.forEach(container => that.$[container].innerText = that.localize(container));
    }

    /*
    * Populates listboxes and accordion elements according to the given value settings
    */
    _applyValue(value) {
        const that = this;

        value = that._validateValue(value);

        if (value.order && value.order.length > 0) {
            const newDataSource = that._reorderDataSource(value.order);

            that.$.allColumnsSorting.dataSource = newDataSource;
            that.$.allColumnsGrouping.dataSource = newDataSource;
            that.$.allColumnsChooser.dataSource = newDataSource;
        }

        that.$.selectedColumnsSorting.items.forEach(item => {
            const directionElement = item.getElementsByTagName('lw-check-box')[0],
                found = value.sorting.find(function (element) {
                    return element.field === item.value;
                });

            item.hidden = found ? false : true;
            directionElement.checked = found && found.sortDirection === 'desc' ? true : false;
        });


        that.$.allColumnsSorting.selectedValues = [];
        value.sorting.forEach(item=> {
            item.field && that.$.allColumnsSorting.select(item.field);
        });

        if (value.grouping && value.grouping.length > 0) {
            that.$.selectedColumnsGrouping.items.forEach(item => item.hidden = value.grouping.indexOf(item.value) > -1 ? false : true);
            that.$.allColumnsGrouping.selectedValues = [];
            value.grouping.forEach(item => that.$.allColumnsGrouping.select(item));

            that.$.selectedColumnsSorting.items.forEach(item => {
                if (value.grouping.indexOf(item.value) > -1) {
                    item.hidden = false;
                    item.disabled = true;
                }
            });
            that.$.allColumnsSorting.items.forEach(item => item.disabled = value.grouping.indexOf(item.value) > -1 ? true : false );
        }
        else {
            that.$.selectedColumnsGrouping.items.forEach(item => item.hidden = true);
        }

        that.$.allColumnsChooser.selectedValues = value.hidden;

        that._toggleBothPlaceholders();
        that._populateFilterSection();
    }

    /*
    * Gets value from the state of the listboxes
    */
    _getValueFromState(preventChangeEvent) {
        const that = this,
            oldValue = JSON.parse(JSON.stringify(that.value)),
            newValue = {};
        const filterDetails = [];

        newValue.sorting = that.$.selectedColumnsSorting.items.reduce((accumulator, current) => {
            const direction = current.getElementsByTagName('lw-check-box')[0];

            !current.hidden && accumulator.push({ 'field': current.value, 'sortDirection': direction.checked ? 'desc' : 'asc' });
            return accumulator;
        }, []);
        newValue.grouping = that.$.selectedColumnsGrouping.items.reduce((accumulator, current) => {
            !current.hidden && accumulator.push(current.value);
            return accumulator;
        }, []);
        newValue.order = that.$.allColumnsChooser.items.map(item=> {
            return item.value
        });
        newValue.hidden = that.$.allColumnsChooser.selectedValues;

        for (let key in that._filteringDetails) {
            const details = that._filteringDetails[key],
                item = {
                    field: key,
                    criteria: details.accordionItem.data.criteria,
                    pattern: details.input.value
                };

            filterDetails.push(item);
        }

        newValue.filtering = filterDetails;
        that.value = newValue;

        if (!preventChangeEvent) {
            that.$.fireEvent('change', {
                value: that.value,
                oldValue: oldValue,
                type:'customizationdialog'
            });
        }

        that.$.applyButton.disabled = false;
    }

    /*
    * Handles change events of the elements, stored in lwTabs custom element
    * - active tab change;
    * - listbox selection change (of the bottom listboxesin sorting and grouping tabs);
    * - changes in the accordion inputs
    */
    _handleChange(event) {
        const that = this,
            detail = event.detail,
            value = detail ? detail.value : '',
            selectedListBox = event.target.closest('lw-list-box'),
            selectedInput = event.target.closest('input'),
            selectedAccordionItem = event.target.closest('lw-accordion-item'),
            tabsChanged = event.target === that.$.tabsElement;

        if (tabsChanged) {
            that._resizeListBoxContainers();
            that._updateElementHeight();
        }
        else if (selectedAccordionItem && selectedInput) {
            that.$.applyButton.disabled = false;
            that._getValueFromState();
        }
        else if (selectedListBox) {
            that._handleListBoxSelectionChanges(selectedListBox, value, detail);
        }
    }

    /*
    * Handles click on dynamically created nodes (listbox close buttons, filtering drop down trigger elements)
    */
    _handleClickOnDynamicNodes(event) {
        const that = this,
            clickedCloseButton = event.target.closest('.lw-close-item-button'),
            clickedFilterOption = event.target.closest('.lw-filter-options-container-text');

        if (!clickedCloseButton && !clickedFilterOption) {
            return;
        }

        clickedCloseButton ? that._handleClickOnCloseButton(clickedCloseButton) : that._handleClickOnFilterOption(clickedFilterOption);
    }

    /*
    * Handles click on listboxes close button
    */
    _handleClickOnCloseButton(clickedCloseButton) {
        const that = this,
            clickedItem = clickedCloseButton.closest('lw-list-item'),
                value = clickedItem.value,
                selectedListBox = clickedItem.closest('lw-list-box');

        clickedItem.hidden = true;

        if (selectedListBox === that.$.selectedColumnsSorting) {
            updateSelectedValues(that.$.allColumnsSorting);

            that._toggleGroup(that.$.sortingToggleElement);
        }
        else if (selectedListBox === that.$.selectedColumnsGrouping) {
            updateSelectedValues(that.$.allColumnsGrouping);
            that._updateListBoxItem(that.$.selectedColumnsSorting, value, { disabled: false, hidden: true, selected: false });
            that._updateListBoxItem(that.$.allColumnsSorting, value, { disabled: false, selected: false });

            that._toggleGroup(that.$.groupingToggleElement);
        }

        function updateSelectedValues(listbox) {
            const oldValuesArray = listbox.selectedValues.slice();

            oldValuesArray.splice(oldValuesArray.indexOf(value), 1);
            listbox.selectedValues = oldValuesArray;
        }

        that._getValueFromState();
    }

    /*
    * Configures and open filteringDropDown element accordiong to selected option container
    */
    _handleClickOnFilterOption(selectedLabelContainer) {
        const that = this,
            selectedAccordionItem = selectedLabelContainer.closest('lw-accordion-item');

        if (!that._filterLabelContainer || that._filterLabelContainer !== selectedLabelContainer) {
            selectedLabelContainer.closest('.lw-filter-options-container').appendChild(that.$.filteringDropDown);
            that.$.filteringDropDown.dataSource = selectedAccordionItem.data.options;
            that._filterLabelContainer = selectedLabelContainer;
        }

        const selectedItem = that.$.filteringDropDown.items.find((item) => item.value === selectedAccordionItem.data.criteria);

        if (selectedItem) {
            that.$.filteringDropDown.select(selectedItem);
            that.$.filteringDropDown.ensureVisible(selectedItem);
        }

        setTimeout(function () {
            that.$.filteringDropDown.open();
            that.$.filteringDropDown.focus();
        }, 0);
    }

    /*
    * Updates filtering condition container, according to the selected drop down item
    */
    _handleFilteringDropDownChange(event) {
        const that = this,
            details = event.detail;

        if (!that._filterLabelContainer) {
            return;
        }

        const accordionItem = that._filterLabelContainer.closest('lw-accordion-item');

        if (that.$.filteringDropDown.closest('lw-accordion-item') !== accordionItem) {
            return;
        }

        that._filterLabelContainer.innerText = details.label;
        accordionItem.data.criteria = details.value;
        that.$.applyButton.disabled = false;
        that._getValueFromState();
    }

    /*
    * Handles list box changes (allColumnsSorting, allColumnsGrouping)
    */
    _handleListBoxSelectionChanges(selectedListBox, value, detail) {
        const that = this;

        if (that._activeListBox !== selectedListBox) {
            return;
        }

       switch (selectedListBox) {
            case that.$.allColumnsSorting:
                that._updateListBoxItem(that.$.selectedColumnsSorting, value, { hidden: !detail.selected });

                that._toggleGroup(that.$.sortingToggleElement);
                break;
            case that.$.allColumnsGrouping:
                that._updateListBoxItem(that.$.selectedColumnsGrouping, value, { hidden: !detail.selected });
                that._updateListBoxItem(that.$.selectedColumnsSorting, value, { disabled: detail.selected, hidden: !detail.selected });
                that._updateListBoxItem(that.$.allColumnsSorting, value, { disabled: detail.selected, selected: detail.selected });
                that._toggleGroup(that.$.groupingToggleElement);
                break;
        }

       that._getValueFromState();
       that._toggleRequired = true;
    }

    /*
    * Handles click on the toggle element between top and bottom section in sorting and grouping tabs; 
    * Resizes top to fit to the container, moves bottom below and resizes the whole window with absolute value
    */
    _handleToggleElementClick(event) {
        const that = this,
            clickedElement = event.target.closest('.toggle-element');

        if (!clickedElement) {
            return;
        }

        clickedElement.classList.remove('lw-active');
        clickedElement === that.$.sortingToggleElement ? that._updateListHeight(that.$.selectedColumnsSorting) : that._updateListHeight(that.$.selectedColumnsGrouping);
        that._updateElementHeight();
        (that.animation!=='none') && (that._resizeAtAnimationEnd = true);
    }

    /*
    * Populates all listboxes. dataSource, valueMember, displayMember in use.
    * (To consider usage of value and display member according to the settings if the grid)
    */
    _mapDataSource(dataSource, valueMember, displayMember) {
        const that = this,
            listboxInstances = ['selectedColumnsSorting', 'allColumnsSorting', 'selectedColumnsGrouping', 'allColumnsGrouping', 'allColumnsChooser'];

        valueMember = (valueMember && valueMember.length > 0) ? valueMember : 'value';
        displayMember = (displayMember && displayMember.length > 0) ? displayMember : 'label';

        for (let i = 0; i < listboxInstances.length; i++) {
            const listbox = listboxInstances[i],
                item = that.$[listbox];

            item.dataSource = dataSource || [];
            item.valueMember = valueMember;
            item.displayMember = displayMember;
        }
    }

    /*
   * Populates filtering accordion with items
   */
    _populateFilterSection() {
        const that = this;

        if (!that.dataSource || that.dataSource.length === 0) {
            return;
        }

        const value = that._validateValue(that.value),
            dataSource = value.order.length > 0 ? that._reorderDataSource(value.order) : that.dataSource,
            filteringData = value.filtering,
            criteriaOptionsArray = ['=', '<>', '>', '>=', '<', '<=', 'startswith', 'endswith', 'contains', 'notcontains', 'isblank', 'isnotblank'];

        that.$.allColumnsFiltering.$.container.innerHTML = '';
        that._filteringDetails = {};

        for (let i = 0; i < dataSource.length; i++) {
            const accordionItem = document.createElement('lw-accordion-item'),
                accordionItemInput = document.createElement('input'),
                accordionItemDropDownContainer = document.createElement('div'),
                accordionItemDropDownContainerText = document.createElement('span'),
                field = dataSource[i],
                fieldOptions = field.filteringOptions,
                criteriaOptions = (fieldOptions || criteriaOptionsArray).map((option) => ({ value: option, label: that.localize(option) }));
            let fieldData = filteringData.find(function (element) {
                return element.field === field[that.valueMember];
            });

           if (fieldData === undefined) {
                accordionItem.data = {
                    options: criteriaOptions,
                    field: field,
                    criteria: fieldOptions ? fieldOptions[0] : 'contains',
                    pattern: ''
                };
            }
            else {
                accordionItem.data = {
                    options: criteriaOptions,
                    field: fieldData.field,
                    criteria: fieldData.criteria || fieldOptions[0] || 'contains',
                    pattern: fieldData.pattern || ''
                };
            }

            accordionItem.label = field[that.displayMember];
            that.$.allColumnsFiltering.appendChild(accordionItem);

            accordionItemInput.className = 'lw-filter-input';
            accordionItemInput.name = accordionItem.data.field;
            accordionItemInput.value = accordionItem.data.pattern;

            accordionItemDropDownContainer.className = 'lw-filter-options-container';
            accordionItemDropDownContainer.label = that.localize(accordionItem.data.criteria),

            accordionItemDropDownContainerText.className = 'lw-filter-options-container-text';
            accordionItemDropDownContainerText.innerText = that.localize(accordionItem.data.criteria || 'contains');

            accordionItemDropDownContainer.appendChild(accordionItemDropDownContainerText);
            accordionItem.$.contentContainer.appendChild(accordionItemDropDownContainer);
            accordionItem.$.contentContainer.appendChild(accordionItemInput);

            that._filteringDetails[field[that.valueMember]] = {
                input: accordionItemInput,
                accordionItem: accordionItem,
                dropDownContainer: accordionItemDropDownContainer
            }
        }
    }

    /*
    * Return new reordered version of the dataSource(consider name 'columns') property
    * Depends on the value.order items, or column chooser's reorder 
    */
    _reorderDataSource(order) {
        const that = this;

        order = order || [];

        if (order.length === 0 || !that.dataSource || that.dataSource.length === 0) {
            return that.dataSource;
        }

        let newDataSource = [],
            oldDataSource = that.dataSource.slice();

        order.forEach(orderedItem => {
            const foundItem = oldDataSource.find(item => orderedItem === item[that.valueMember]);

            newDataSource.push(foundItem);
            oldDataSource.splice(oldDataSource.indexOf(foundItem), 1);
        });
        oldDataSource.forEach(orderedItem => newDataSource.push(orderedItem));

        return newDataSource;
    }

    /*
    * Reorders accordion items, allColumnsSorting and allColumnsGrouping listboxes, 
    */
    _reorderEndHandler(event) {
        const that = this,
            selectedListBox = event.target.closest('lw-list-box');

        selectedListBox.$.removeClass('lw-is-in-reorder');

        if (selectedListBox === that.$.allColumnsChooser && that._allColumnsReorder) {
            const newOrder = that.$.allColumnsChooser.items.map(item => {
                    return item.value;
                }),
                reorderedDataSource = that._reorderDataSource(newOrder),
                sortingSelectedValues = that.$.allColumnsSorting.selectedValues,
                groupingSelectedValues = that.$.allColumnsGrouping.selectedValues;

            that.$.allColumnsSorting.dataSource = reorderedDataSource;
            that.$.allColumnsSorting.items.map(item => {
                if (groupingSelectedValues && groupingSelectedValues.includes(item.value)) {
                    item.disabled = true;
                }
            }),

            sortingSelectedValues.forEach(item => that.$.allColumnsSorting.select(item));
            that.$.allColumnsGrouping.dataSource = reorderedDataSource;
            groupingSelectedValues.forEach(item => that.$.allColumnsGrouping.select(item));

            that._populateFilterSection();
            that._allColumnsReorder = false;
        }

        that._getValueFromState();
    }

    /*
    * Set custom class to reordered listbox ('lw-is-in-reorder') to allow pointer events over all items;
    * Updates the value based on listbox selection and input content
    */
    _reorderStartHandler(event) {
        const that = this,
            selectedListBox = event.target.closest('lw-list-box');

        if (!selectedListBox) {
            return;
        }

        LW.ListBox.DragDrop.Feedback && LW.ListBox.DragDrop.Feedback.classList.add('lw-customization-dialog');
        selectedListBox.allowDrop = event.detail.target.closest('.lw-input') ? false : true;
        that._getValueFromState(true);
        selectedListBox.$.addClass('lw-is-in-reorder');

        if (selectedListBox === that.$.allColumnsChooser) {
            that._allColumnsReorder = true;
        }
    }

    /*
    * Updates the height of the sorting, grouping listboxes
    */
    _resizeListBoxContainers() {
        const that = this;

        that.$.sortingToggleElement.classList.remove('lw-active');
        that.$.groupingToggleElement.classList.remove('lw-active');
        that._updateListHeight(that.$.selectedColumnsSorting);
        that._updateListHeight(that.$.selectedColumnsGrouping);
    }

    /*
    * Toggles both placeholders in sorting and grouping tabs
    */
    _toggleBothPlaceholders() {
        const that = this,
            sortingHasItems = that.$.selectedColumnsSorting.items.find(item => !item.hidden ),
            groupingHasItems = that.$.selectedColumnsGrouping.items.find(item => !item.hidden );

        sortingHasItems ? that.$.placeholderSorting.classList.add('lw-hidden') : that.$.placeholderSorting.classList.remove('lw-hidden');
        groupingHasItems ? that.$.placeholderGrouping.classList.add('lw-hidden') : that.$.placeholderGrouping.classList.remove('lw-hidden');
    }

    /*
    * Enables or disables sorting, grouping, filtering, column chooser tabs, according to the relevant properties
    */
    _toggleCustomizationOptions() {
        const that = this,
            tabs = that.$.tabsElement._tabs;

        tabs[0].disabled = !that.sorting;
        tabs[1].disabled = !that.grouping;
        tabs[2].disabled = !that.filtering;

        if (!that.reorder && !that.visibility) {
            tabs[3].disabled = true;
        }
        else {
            tabs[3].disabled = false;
            that.$.allColumnsChooser.allowDrag= that.$.allColumnsChooser.allowDrop = that.reorder;

            that.$.allColumnsChooser.selectionMode = that.visibility ? 'checkBox' : 'none';
        }
    }

    /*
    * Toggles placeholders, toggle elements and updates arrow position
    */
    _toggleGroup(toggleElement) {
        const that = this,
            selectedColumnsContainer = toggleElement.closest('lw-tab-item').getElementsByClassName('selected-columns')[0];

        toggleElement.classList.add('lw-active');
        selectedColumnsContainer.offsetHeight<selectedColumnsContainer.scrollHeight ? toggleElement.classList.add('lw-down') : toggleElement.classList.remove('lw-down');
        that._toggleBothPlaceholders();
        that.$.applyButton.disabled = false;
    }

    /*
    * Updates element's height according to the content height of the current tab
    */
    _updateElementHeight() {
        const that = this;

        if (that.style.height) {
            that.style.minHeight = that.style.height;
            return;
        }

        const headerSectionHeight = that.$.headerSection.getBoundingClientRect().height,
            tabsHeaderSectionHeight = that.$.tabsElement.$.tabsHeaderSection.getBoundingClientRect().height,
            selectedIndex = that.$.tabsElement.selectedIndex;

        that.style.minHeight = '0px';
        that.style.minHeight = that.$.tabsElement._tabs[selectedIndex].scrollHeight + headerSectionHeight + tabsHeaderSectionHeight + 'px';
    }

    /*
    * Updates list-box-item details in the list-box, given as first parameter. 
    */
    _updateListBoxItem(owner, val, details) {
        const item = owner.items.find(item => item.value === val);

        if (!item || !details || details.length === 0) {
            return;
        }

        owner.update(item.dataIndex, details);
    }

    /*
    * Updates listboxes parent container height
    */
    _updateListHeight(listbox) {
        const height = listbox.getBoundingClientRect().height;

        listbox.parentNode.style.height = height + 'px';
    }

    /*
    * Validates value, and if it's incomplete updates fields with empty array elements
    */
    _validateValue(value) {
        let validValue = value || {};

        ['sorting', 'grouping', 'filtering', 'order', 'hidden'].forEach(field=> validValue[field] = validValue[field] || []);
        return validValue;
    }

    _headerDblCickHandler() { }

    /*
    * toggles 'toggle elements' andexpand/collapses top listbox containers on scroll, if this is required
    */
    _handleScroll(event) {
        const that = this;

        if (!that.opened || !that._toggleRequired) {
            return;
        }

        (that.animation !== 'none') && (that._resizeAtAnimationEnd = true);
        that._handlePlaceholderAndContainer();
        that._updateElementHeight();
        that._toggleRequired = false;
    }

    /*
    * Prevents item reorder when is pressed close, visibility or sort direction button
    */
    _preventDragOnListItem(event) {
        const that = this,
            selectedListBox = event.target.closest('lw-list-box');

        if (event.type === 'down' && ['lw-close-item-button', 'lw-sort-button', 'lw-input'].indexOf(event.originalEvent.target.className) > -1) {
            selectedListBox.allowDrag = selectedListBox.allowDrop = true;
            that._selectedListBox = selectedListBox;
            LW.ListBox.DragDrop.Feedback && LW.ListBox.DragDrop.Feedback.classList.add('lw-hidden');
        }
        else if (that._selectedListBox && !that._selectedListBox.allowDrag) {
            that._selectedListBox.allowDrag = that._selectedListBox.allowDrop = true;
        }
    }

    /**
    * Detect animation end and updates listbox container height
    */
    _handleTransitionEnd(event) {
        const that = this;

        if(!that._resizeAtAnimationEnd && event.propertyName!=='height'){
            return;
        }

       that._resizeAtAnimationEnd = false;
       that._resizeListBoxContainers(); 
       that._updateElementHeight();
    }

    /*
    toggle placeholders, resize containers and window
    */
    _handlePlaceholderAndContainer() {
        const that = this;

        that._toggleBothPlaceholders();
        that._resizeListBoxContainers();
        that._updateElementHeight();
    }

    _findАctiveListBox(event){
        this._activeListBox = event && event.originalEvent && event.originalEvent.target.closest('lw-list-box');
    }
});