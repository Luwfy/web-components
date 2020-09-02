
/**
* ComboBox custom element.
*/
LW('lw-combo-box', class ComboBox extends LW.DropDownList {

    /** 
    * ComboBox's properties 
    */
    static get properties() {
        return {
            'autoComplete': {
                allowedValues: ['none', 'manual', 'auto', 'inline', 'list'],
                type: 'string',
                value: 'none'
            },
            'autoCompleteDelay': {
                value: 100,
                type: 'number'
            },
            'autoOpenShortcutKey': {
                value: [],
                type: 'array'
            },
            'dropDownOpenMode': {
                allowedValues: ['none', 'default', 'dropDownButton', 'auto'],
                value: 'dropDownButton',
                defaultReflectToAttribute: true,
                type: 'string'
            },
            'escKeyMode': {
                allowedValues: ['clearValue', 'firstPossibleValue', 'none', 'previousValue'],
                type: 'string',
                value: 'none'
            },
            'inputPurpose': {
                type: 'string',
                value: 'off'
            },
            'minLength': {
                type: 'number',
                value: 2
            },
            'value': {
                value: '',
                type: 'string'
            }
        }
    }

    /**
    * ComboBox's event listeners.
    */
    static get listeners() {
        return {
            'input.focus': '_inputFocusHandler',
            'input.blur': '_inputFocusHandler',
            'dropDownButton.focus': '_dropDownButtonFocusHandler',
            'dropDownButton.blur': '_dropDownButtonFocusHandler',
            'input.change': '_inputChangeEventHandler',
            'input.mouseenter': '_buttonsMouseEventsHandler',
            'input.mouseleave': '_buttonsMouseEventsHandler',
            'document.down': '_documentDownHandler',
            'document.up': '_documentUpHandler',
            'document.selectstart': '_selectStartHandler',
            'dropDownButton.down': '_buttonsDownHandler',
            'dropDownButton.mouseenter': '_buttonsMouseEventsHandler',
            'dropDownButton.mouseleave': '_buttonsMouseEventsHandler',
            'keydown': '_keyDownHandler',
            'keyup': '_keyUpHandler',
            'listBox.change': '_listBoxChangeHandler',
            'listBox.itemClick': '_listBoxItemClickHandler',
            'listBox.keydown': '_listBoxKeyDownHandler',
            'wheel': '_mouseWheelHandler'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.combobox.css'
        ]
    }

    /**
    * ComboBox's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <span class="lw-label" id="label">[[label]]</span>
                    <div id="content" class="lw-content" role="presentation">
                        <div class="lw-buttons-container" id="buttonsContainer" role="presentation">
                            <span id="actionButton" class="lw-action-button" role="presentation">
                                <input class="lw-input" id="input" placeholder="[[placeholder]]" autocomplete="[[inputPurpose]]" role="textbox" aria-label="[[placeholder]]" />
                                <div class="lw-combo-box-auto-complete-string" id="autoCompleteString"></div>
                            </span>
                            <span id="dropDownButton" class="lw-drop-down-button" role="button" aria-label="Toggle popup">
                                <span class="lw-drop-down-button-icon" id="arrow" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div id="dropDownContainer" class="lw-drop-down lw-drop-down-container lw-visibility-hidden" role="presentation">
                            <lw-list-box id="listBox" unfocusable
                                    animation="[[animation]]"
                                    data-source="[[dataSource]]"
                                    disabled="[[disabled]]"
                                    display-loading-indicator="[[displayLoadingIndicator]]"
                                    display-member="[[displayMember]]"
                                    filterable="[[filterable]]"
                                    filter-callback="[[filterCallback]]"
                                    filter-mode="[[filterMode]]"
                                    filter-input-placeholder="[[filterInputPlaceholder]]"
                                    grouped="[[grouped]]"
                                    group-member="[[groupMember]]"
                                    item-height="[[itemHeight]]"
                                    item-measure-mode="[[itemMeasureMode]]"
                                    item-template="[[itemTemplate]]"
                                    incremental-search-delay="[[incrementalSearchDelay]]"
                                    incremental-search-mode="[[incrementalSearchMode]]"
                                    loading-indicator-placeholder="[[loadingIndicatorPlaceholder]]"
                                    loading-indicator-position="[[loadingIndicatorPosition]]"
                                    name="[[name]]"
                                    placeholder="[[dropDownPlaceholder]]"
                                    readonly="[[readonly]]"
                                    right-to-left="[[rightToLeft]]"
                                    selected-indexes="{{selectedIndexes}}"
                                    selection-mode="[[selectionMode]]"
                                    selected-values="{{selectedValues}}"
                                    sorted="[[sorted]]"
                                    theme="[[theme]]"
                                    value-member="[[valueMember]]"
                                    horizontal-scroll-bar-visibility="[[horizontalScrollBarVisibility]]"
                                    vertical-scroll-bar-visibility="[[verticalScrollBarVisibility]]"
                                    virtualized="[[virtualized]]">
                                <content></content>
                            </lw-list-box>
                            <div id="resizeBar" class="lw-drop-down-resize-bar" aria-label="Resize">
                                <div></div>
                            </div>
                         </div>
                    </div>
                    <span class="lw-hint" id="hint">[[hint]]</span>
                </div>`;
    }

    /**
    * Updates the ComboBox when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'autoComplete':
                if (newValue === 'list') {
                    that.$.listBox.$.filterInput.value = '';

                    //Context Fix
                    let listBoxContext = that.$.listBox.context;

                    that.$.listBox.context = that.$.listBox;
                    that.$.listBox._filterItems(true);
                    that.$.listBox.context = listBoxContext;

                    that._setDropDownSize();
                }

                that._autoComplete(true);
                that._setAriaAutocomplete();
                //If autoComplete is disabled
                //if (newValue === 'none' && (['one', 'oneOrManyExtended', 'oneOrMany'].indexOf(that.selectionMode) > -1 && !that.selectedIndexes.length && that.items.length)) {
                //    that.select(that._focusedItem || that.items[0]);
                //}

                break;
            case 'dataSource':
            case 'displayMember':
                //when selectedValues is 0 and displayMember is changed set actionButton text to default.
                that._clearSelection(true);

                //Check the new listBox size
                that._setDropDownSize();
                that._positionDetection.checkBrowserBounds('vertically');
                that._positionDetection.positionDropDown();
                that._positionDetection.checkBrowserBounds('horizontally');

                //Issue: When changing dataSource from property, the items are not added right away so size isnt calculated properly. Needs a new event or sth...
                //that._setDropDownSize();
                break;
            case 'disabled':
                //Needed, because spans are inserted before the input in advanced selectionDisplayMode and atr syncronization doesn't affect the input.
                that.$.input.disabled = newValue;
                that._setFocusable();
                that.close();

                if (that._positionDetection) {
                    that._positionDetection.handleAutoPositioning();
                }

                that._ariaPropertyChangedHandler('disabled', newValue);
                break;
            case 'readonly':
                //Needed, because spans are inserted before the input in advanced selectionDisplayMode and atr syncronization doesn't affect the input.
                that.$.input.readOnly = newValue;
                that.close();
                that._ariaPropertyChangedHandler('readonly', newValue);
                break;
            case 'selectedValues':
            case 'selectedIndexes':
                that._clearSelection(true);
                break;
            case 'selectionMode':
            case 'selectionDisplayMode':
                that._clearSelection();
                that._applySelectionDisplayMode();

                if (that.selectionDisplayMode === 'tokens') {
                    that._currentSelection = undefined;
                }

                that._applySelection(that.selectionMode);

                if (propertyName === 'selectionMode') {
                    super.propertyChangedHandler(propertyName, oldValue, newValue);
                }

                break;
            case 'tokenTemplate':
                if (that.$.selectionField) {
                    while (that.$.selectionField.firstElementChild.nodeName === 'SPAN') {
                        that.$.selectionField.removeChild(that.$.selectionField.firstElementChild);
                    }
                }

                that._tokenTemplate = that._validateTemplate(that.tokenTemplate);
                that._applySelection();
                break;
            case 'value':
                that.clearSelection();
                that.value = that.$.input.value = that._oldValue = newValue;
                that._queryItems(true);

                if(that._currentSelection && !that._currentSelection.length) {
                    that.$.fireEvent('change', {
                        'oldValue': oldValue,
                        'value': that.$.input.value,
                        'addedItems': [],
                        'removedItems': [],
                        'selected': [],
                        'disabled': [],
                        'index': [],
                        'label': [],
                    });
                }
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
    * Removes all items from the ComboBox.
    */
    clearItems() {
        const that = this;

        that.$.listBox.clearItems();
        that._clearSelection(true);
    }

    /**
    * Unselects all items.
    */
    clearSelection() {
        const that = this;

        that.$.listBox.clearSelection();
        that._clearSelection(arguments[0] ? false : true);
    }

    /*
     ** Blur Method
    */
    blur() {
        this.$.input.blur();
    }

    /**
     * Close method.
     */
    close() {
        const that = this;

        super.close();

        that.$.input.removeAttribute('aria-controls');
    }

    /**
     * Focus method
     */
    focus() {
        this.$.input.focus();
    }

    /**
     * Open method
     */
    open() {
        const that = this;

        super.open();

        that.$.input.setAttribute('aria-controls', that.$.listBox.id);
    }

    /**
    * Sets tab index 
    */
    _setFocusable() {
        const that = this;

        if (!that.disabled && !that.unfocusable) {
            let index = that.tabIndex > 0 ? that.tabIndex : 0;

            that.$.input.tabIndex = index;
            that.dropDownOpenMode === 'dropDownButton' ? that.$.dropDownButton.setAttribute('tabindex', index) : that.$.dropDownButton.removeAttribute('tabindex');

            //that.$.dropDownButton.setAttribute('tabindex', index);
            return;
        }

        that.$.input.tabIndex = -1;
        that.$.dropDownButton.removeAttribute('tabindex');
    }

    /**
     * Handles the autoComplete functionaltiy 
     */
    _autoComplete(noSelectionRefresh) {
        const that = this;

        if (that.autoComplete === 'list') {
            return;
        }

        if (that.$.listBox._items.length === 0 && typeof that.dataSource !== 'function') {
            that.close();
            return;
        }

        const value = that.$.input.value.length < that.minLength ? '' :
            (that.displayMode === 'escaped' ? that._toDefaultDisplayMode(that.$.input.value) : that.$.input.value), //displayMode is a lwTextBox property
            isItemFocused = function (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i]._focused && items[i].hasAttribute('focus')) {
                        return true;
                    }
                }
            };

        let selectedItem;

        if (that.$.listBox.selectedValues.length === 1) {
            selectedItem = that.$.listBox.getItem(that.$.listBox.selectedValues[0]);
        }

        that.$.autoCompleteString.textContent = '';
        that.$.listBox.$.filterInput.value = that.autoComplete === 'none' || that.$.input.value.length < that.minLength ? '' : value;

        const queryCallback = function () {
            if (!that.$.listBox.isAttached || !that.$.input) {
                return;
            }

            const activeElement = that.enableShadowDOM ? that.shadowRoot.activeElement : document.activeElement;

            that._setDropDownSize();

            if (that.opened) {
                that._positionDetection.positionDropDown();
                that._positionDetection.checkBrowserBounds();
            }

            if (that.$.listBox._filteredItems && that.$.listBox._filteredItems.length > 0) {
                that.$.listBox._scrollView.scrollTop = that.$.listBox._filteredItems[0].offsetTop;

                if (that.autoComplete !== 'none' && that.$.input.value.length >= that.minLength && !isItemFocused(that.$.listBox._filteredItems)) {
                    that._focus(that.$.listBox._filteredItems[0]);
                }

                if (activeElement === that.$.input && that.autoComplete === 'inline' && that.$.input.value.length >= that.minLength) {
                    that._updateAutoCompleteHelper();
                }

                if (selectedItem && selectedItem[that.inputMember] === that.$.listBox._filteredItems[0][that.inputMember] && selectedItem.value === that.$.listBox._filteredItems[0].value) {
                    that.$.listBox.context = that.$.listBox;
                    that.$.listBox._select(that.$.listBox._filteredItems[0], true);
                    that.$.listBox.context = listBoxContext;
                }

                if (value !== that.$.listBox._filteredItems[0][that.inputMember] || (LW.TextBox && that instanceof LW.TextBox && that.dropDownOpenMode === 'auto')) {
                    if (that._closedFromKeyCombination) {
                        that._closedFromKeyCombination = false;
                        return;
                    }

                    if (value.length < that.minLength && !(LW.TextBox && that instanceof LW.TextBox && that.dropDownOpenMode === 'auto')) {
                        that.close();
                        return;
                    }

                    if (that.isCompleted && that.dropDownOpenMode !== 'none' && activeElement === that.$.input) {
                        that.open();
                    }
                }

                return;
            }

            that[typeof that.dataSource === 'function' ? 'open' : 'close']();
        }

        //Context Fix
        let listBoxContext = that.$.listBox.context;

        that.$.listBox.context = that.$.listBox;
        that.$.listBox._filterItems(noSelectionRefresh ? true : false, queryCallback, LW.TextBox && that instanceof LW.TextBox && that.dropDownOpenMode === 'auto');
        that.$.listBox.context = listBoxContext;
    }

    /**
     * Updates the autoComplete string highlighter
     */
    _updateAutoCompleteHelper() {
        const that = this,
            autoCompleteString = that.$.autoCompleteString;

        autoCompleteString.style.width = that.$.input.offsetWidth + 'px';
        autoCompleteString.style.height = that.$.input.offsetHeight + 'px';
        autoCompleteString.style.left = that.$.input.offsetLeft + 'px';
        autoCompleteString.style.top = that.$.input.offsetTop + 'px';
        autoCompleteString.style.paddingLeft = that.selectedIndexes.length > 0 ? 0 : null;

        if (!that._focusedItem) {
            autoCompleteString.textContent = '';
            return;
        }

        const inputValue = that.$.input.value,
            focusedItemlabel = that._focusedItem[that.inputMember];

        if (focusedItemlabel.length !== inputValue.length && focusedItemlabel.toLowerCase().indexOf(inputValue.toLowerCase()) === 0) {
            autoCompleteString.textContent = that.$.input.value + focusedItemlabel.slice(inputValue.length);
        }
    }

    /**
    * Fills the selection field with the labels selected items.
    */
    _applySelection(mode, details) {
        const that = this;

        if (!that.$.selectionField) {
            that.$.selectionField = that.$.actionButton;
        }

        that.$.autoCompleteString.textContent = '';

        if (that.selectedIndexes.length === 0) {
            that._clearSelection(details && details.index > -1 && that.$.input.value === that.$.listBox._items[details.index][that.inputMember]);
            return;
        }

        if (!that.$.listBox._items || that.$.listBox._items.length === 0) {
            return;
        }

        if (that.selectionMode === 'one' || that.selectionMode === 'zeroOrOne' || that.selectionMode === 'radioButton') {
            if (that._currentSelection && that._currentSelection.length > that.selectedIndexes.length) {
                that._currentSelection = that.selectedIndexes.map(i => that.$.listBox._items[i][that.inputMember]);
                that.$.input.value = that._currentSelection.toString();
                that._oldValue = that.value = that._currentSelection.toString();
                return;
            }

            that._clearSelection();
            that._currentSelection = that.selectedIndexes.map(i => that.$.listBox._items[i][that.inputMember]);
            that.$.input.value = that._currentSelection.toString();
            that._oldValue = that.value = that._currentSelection.toString();

            that.$.container.setAttribute('has-value', '');

            if (that.autoComplete !== 'none' && typeof that.dataSource !== 'function') {
                that._autoComplete(true);

                if (!that._keyboardNavigation) {
                    that.close();
                }
            }
        }
        else {
            that.$.input.value = '';
            that.$.input.placeholder = '';
            that.$.container.setAttribute('has-value', '');

            while (that.$.selectionField.firstElementChild.nodeName === 'SPAN') {
                that.$.selectionField.removeChild(that.$.selectionField.firstElementChild)
            }

            let fragment = document.createDocumentFragment(), element, icon;

            if (that.selectedIndexes.length === 1 && (that.selectionMode === 'oneOrManyExtended' || that.selectionMode === 'oneOrMany')) {
                icon = '';
            }
            else {
                icon = that.selectionDisplayMode === 'tokens' ? '&#10006' : ',';
            }

            that.selectedIndexes.map(index => {
                element = that._applyTokenTemplate(that.$.listBox._items[index][that.inputMember], icon);
                element._value = that.$.listBox._items[index].value;
                fragment.appendChild(element);
            });

            that.$.selectionField.insertBefore(fragment, that.$.input);
            that._currentSelection = that.selectedIndexes.map(i => that.$.listBox._items[i][that.inputMember]);
            that._oldValue = that.value = that._currentSelection.toString();
            that._positionDetection.positionDropDown();
        }
    }

    /**
    * Sets the selection mode for the ComboBox.
    */
    _applySelectionDisplayMode() {
        const that = this;

        if (that.selectionMode === 'one' || that.selectionMode === 'zeroOrOne' || that.selectionMode === 'radioButton') {
            that.$.removeClass('auto-height');
        }
        else {
            that.$.addClass('auto-height');
        }
    }

    /**
     * BindingComplete event Handler. When the dataSource or size of listBox is changed.
     */
    _bindingCompleteHandler() {
        const that = this;

        that._queryItems();
        that._setDropDownSize();
    }

    /**
    * ComboBox container mouse enter/leave events handler.
    */
    _buttonsMouseEventsHandler(event) {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        if (event.type === 'mouseenter') {
            event.target.setAttribute('hover', '');
            that.setAttribute('hover', '');

            if (that.dropDownOpenMode === 'auto' && !(LW.TextBox && that instanceof LW.TextBox)) {
                if (event.target === that.$.dropDownButton) {
                    that.open();
                    that.$.input.focus();
                }
                else {
                    that.close();
                }
            }
        }
        else {
            event.target.removeAttribute('hover');
            that.removeAttribute('hover');
        }
    }

    /**
    * Initializes the element.
    */
    _createElement() {
        const that = this;

        that.classList.add('lw-drop-down-box');
        that._tokenTemplate = that._validateTemplate(that.tokenTemplate);

        //Set properties.
        that._applySelectionDisplayMode();
        that._applySelection(that.selectionMode);

        if (that.autoComplete !== 'none') {
            that._autoComplete(true);
        }

        that._setDropDownSize();
        that.$.input.disabled = that.disabled;
        that.$.input.readOnly = that.readonly;
        that._setFocusable();

        if (that.$.input.value.length > 0 && that.selectedIndexes.length === 0) {
            that.$.container.setAttribute('has-value', '');
            that._oldValue = that.value = that.$.input.value;
        }

        //Flag indicator for the ripple effect. Used to append the ripple to that specific element, not his firstElementChild like it's done usually.
        //Used in class Ripple, method animate() in lwelement.
        that.$.arrow.noRipple = true;
        that.checkLicense();
        that._setAriaRelations(true);

    }

    /**
    * Reset the input and clears the selection field.
    */
    _clearSelection(resetInput) {
        const that = this;

        if (resetInput) {
            that.$.input.value = '';
            that.value = '';
        }

        that.$.input.placeholder = that.placeholder;
        that.$.autoCompleteString.textContent = '';
        that._currentSelection = [];

        if (that.$.selectionField) {
            while (that.$.selectionField.firstElementChild.nodeName === 'SPAN') {
                that.$.selectionField.removeChild(that.$.selectionField.firstElementChild)
            }
        }

        if (that.autoComplete !== 'none' && that.autoComplete !== 'list' && that.$.input.value.length > 0) {
            if (that._autoCompleteTimer) {
                clearTimeout(that._autoCompleteTimer);
            }

            if (typeof that.dataSource !== 'function') {
                that._autoCompleteTimer = setTimeout(function () {
                    that._autoComplete(true);
                }, that.autoCompleteDelay);
            }
        }

        if (!that.$.input.value.length) {
            that.$.container.removeAttribute('has-value');
        }
    }

    _documentDownHandler(event) {
        const that = this;

        super._documentDownHandler(event);

        let target = event.originalEvent.target;

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
        }

        if (target === that.$.dropDownButton && that.dropDownOpenMode !== 'none' && !LW.Utilities.Core.isMobile) {
            requestAnimationFrame(() => that.$.input.focus());
        }
    }
    /**
    * Document Up handler.
    */
    _documentUpHandler(event) {
        const that = this;
        let target = event.originalEvent.target,
            rootElement = target.closest ? target.closest('lw-combo-box') : undefined;

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
            rootElement = target.getRootNode().host;
        }

        const originalTarget = target;

        if (that._resizeDetails && that._resizeDetails.started) {
            that._resizeDetails.started = that._resizeDetails.resizeEventFired = false;
            that.removeAttribute('resizing');
            that._dropDownResized = true;

            that.$.fireEvent('resizeEnd', {
                'position': { left: event.pageX, top: event.pageY }
            });
            return;
        }

        if (that.disabled || that._isDropDownClicked || that.readonly) {
            delete that._isDropDownClicked;
            return;
        }

        if (that._overlayDown) {
            that.close();
            delete that._overlayDown;
            return;
        }

        if (target === that.$.input || typeof (target) === 'undefined' || target === that.$.resizeBar) {
            return;
        }

        if (target === that.$.selectionField) {
            that.$.input.focus();
            return;
        }

        if (target === that.$.dropDownButton && that.dropDownOpenMode !== 'none') {
            that._preventDropDownClose = true;
            target === that._buttonClicked && that.$dropDownContainer.hasClass('lw-visibility-hidden') &&
                event.originalEvent.type !== 'pointercancel' ? that.open() : that.close();

            if (!LW.Utilities.Core.isMobile) {
                requestAnimationFrame(() => that.$.input.focus());
            }

            that._buttonClicked = undefined;
            return;
        }

        if (target.classList.contains('lw-drop-down-list-selection-label') &&
            rootElement === that && that.dropDownOpenMode !== 'none') {
            const item = that.$.listBox._items.filter(item => item[that.inputMember].toString() === target.textContent)[0];

            //NOTE: Fires a new custom event for token click
            if (!item || that.$.fireEvent('tokenClick', { index: that.$.listBox._items.indexOf(item), label: item.label, value: item.value }).defaultPrevented) {
                return;
            }

            that.open();
            that.$.input.focus();

            //Scroll to that item and focus it.
            that.$.listBox.ensureVisible(item);
            that._focus(item);
            return;
        }

        if (that.selectionDisplayMode === 'tokens' && target.classList.contains('lw-drop-down-list-unselect-button') && rootElement === that) {
            if (that.selectedIndexes.length === 1 && ['zeroOrMany', 'zeroOrOne', 'checkBox'].indexOf(that.selectionMode) < 0) {
                return;
            }

            that.unselect(that.$.listBox._items.filter(item => item[that.inputMember].toString() === target.previousElementSibling.textContent)[0]);
            that.$.input.focus();
            return;
        }

        target = that._getUpEventTarget(target);

        if (target === undefined) {
            that.$.input.focus();
            return;
        }

        if ((!that.$dropDownContainer.hasClass('lw-visibility-hidden') && target !== 'dropDownContainer' && target !== 'item') ||
            (target === 'item' && that.selectionMode.indexOf('Many') < 0) && that.selectionMode !== 'checkBox') {
            that.close();
        }

        if (target === 'item' || (target === 'dropDownContainer' && originalTarget !== that.$.listBox.$.filterInput)) {
            that.$.input.focus();
        }
    }

    /**
     * DropDownButton Focus Handler
     * @param {any} event
     */
    _dropDownButtonFocusHandler(event) {
        const that = this;

        if (event.type === 'focus') {
            if (that.dropDownOpenMode !== 'dropDownButton') {
                that.$.input.focus();
            }

            that.setAttribute('focus', '')
        }
        else {
            that.removeAttribute('focus');
        }
    }

    /**
    * ComboBox input's focus/blur event handler.
    */
    _inputFocusHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        if (event.type === 'focus') {
            that.setAttribute('focus', '');

            if (!that._buttonClicked) {
                that._oldValue = that.$.input.value;
            }
            that.$.fireEvent('focus');
        }
        else {
            that.removeAttribute('focus');
            that.$.fireEvent('blur');

            event.target.value !== '' || (that.selectedIndexes.length !== 0 && event.target.value === '') ?
                that.$.container.setAttribute('has-value', '') : that.$.container.removeAttribute('has-value');

            if (!that._preventDropDownClose) {
                if (that.opened && (that.autoComplete === 'auto' || that.autoComplete === 'inline') && that.$.input.value.length > 0 &&
                    that._focusedItem && !that._focusedItem.selected) {
                    that.select(that._focusedItem);
                }

                that.close();
            }

            //Handles autoComplete mode 'list'
            if (!that._handleAutoCompleteModeList()) {
                return;
            }

            if (that.escKeyMode === 'previousValue') {
                that.value = that.$.input.value;
            }
        }
    }

    /**
     * Returns the previous value or clears the value if no item is matched
     */
    _handleAutoCompleteModeList() {
        const that = this;

        if (that.autoComplete === 'list' && !that._buttonClicked) {
            if (that.opened && that._isDropDownClicked) {
                return false;
            }

            that.$.autoCompleteString.textContent = '';

            if (that._lastSelectedItem) {
                if (!that._lastSelectedItem.selected) {
                    that.select(that._lastSelectedItem);
                }
            }
            else {
                if (that.$.input.value.length && that._oldValue) {
                    const foundItems = that.$.listBox._queryItems(that._oldValue, that.incrementalSearchMode);

                    for (let i = 0; i < foundItems.length; i++) {
                        if (!foundItems[i].hidden) {
                            if (!foundItems[i].selected) {
                                that.select(foundItems[i]);
                            }

                            that._focus(foundItems[i]);
                            break;
                        }
                    }

                    that.value = that.$.input.value = that._oldValue;
                }
                else {
                    that.value = that.$.input.value = '';
                }
            }
        }
    }

    /**
     * Input change event handler
     * @param {any} event
     */
    _inputChangeEventHandler(event) {
        const that = this;

        event.stopPropagation();

        if (that._preventInputChangeEvent) {
            delete that._preventInputChangeEvent;
            return;
        }

        if (that._isDropDownClicked || that._oldValue === that.$.input.value) {
            return;
        }

        that.$.fireEvent('change', {
            'oldValue': that._oldValue,
            'value': that.$.input.value,
            'addedItems': [],
            'removedItems': [],
            'selected': [],
            'disabled': [],
            'index': [],
            'label': [],
        });
    }

    /**
    * ComboBox keydown event handler.
    */
    _keyDownHandler(event) {
        const that = this,
            target = that.enableShadowDOM ? event.composedPath()[0] : event.target;

        if (that.disabled || that.readonly || target === that.$.listBox.$.filterInput) {
            return;
        }

        const focusedItem = typeof that._focusedItem === 'function' ? that._focusedItem() : that._focusedItem;

        switch (event.key) {
            case 'Enter':
                delete that._preventInputChangeEvent;

                if (target === that.$.input && focusedItem && that.opened) {
                    if (focusedItem.selected && that.autoComplete === 'list') {
                        that.close();
                        that._unfocus();
                        that._handleAutoCompleteModeList();
                        return;
                    }

                    if (!focusedItem.disabled) {
                        that.select(focusedItem);
                        that._preventInputChangeEvent = true;
                    }

                    if (!that.$dropDownContainer.hasClass('lw-visibility-hidden') && that.selectionMode.indexOf('one') > -1) {
                        that.close();
                        that._unfocus();
                    }
                }
                else if (target === that.$.dropDownButton) {
                    that.$.dropDownButton.setAttribute('active', '');
                    that.$dropDownContainer.hasClass('lw-visibility-hidden') && that.dropDownOpenMode !== 'none' ? that.open() : that.close();
                    that.$.input.focus();
                }
                else {
                    that.close();
                }

                //Same behavior as on blur
                that._handleAutoCompleteModeList();
                return;
            case 'Escape':
                switch (that.escKeyMode) {
                    case 'none': //Closes the drop down poppup
                        if (!that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
                            that.close();
                            that._unfocus();
                        }

                        break;
                    case 'clearValue':
                        that.value = that.$.input.value = '';
                        that.close();
                        break;
                    case 'previousValue':
                        that.$.input.value = that._oldValue;
                        break;
                    case 'firstPossibleValue': {
                        const firstPossibleItem = that.$.listBox._items.find(item => !item.disabled && !item.hidden && !item.readonly);

                        if (firstPossibleItem) {
                            const newValue = firstPossibleItem[that.inputMember];

                            if (that.$.input.value === newValue) {
                                that.close();
                            }

                            that.$.input.value = newValue;
                        }

                        that.close();
                        break;
                    }
                }

                break;
            case 'End':
            case 'Home':
            case 'PageUp':
            case 'PageDown':
            case 'ArrowUp':
            case 'ArrowDown':
                if (that._autoOpenOnKeyDown(event) === true) {
                    return;
                }

                if (event.altKey) {
                    that._closedFromKeyCombination = true;

                    if (that.$dropDownContainer.hasClass('lw-visibility-hidden') && that.dropDownOpenMode !== 'none') {
                        if (event.key === 'ArrowDown') {
                            that.open();
                        }

                        if (!that.opened) {
                            return;
                        }

                        if (that.items.length === 0) {
                            return;
                        }

                        if (that.selectedIndexes.length === 0) {
                            that._focus(that.items[0])
                        }
                        else if (that.selectedIndexes.length > 0 && !that.$.listBox._items[that.selectedIndexes[that.selectedIndexes.length - 1]].hidden) {
                            that._focus(that.items[that.selectedIndexes[that.selectedIndexes.length - 1]]);
                        }
                    }
                    else {
                        that.close();
                    }

                    return;
                }

                if (target === that.$.input && that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
                    if (event.ctrlKey) {
                        event.preventDefault();
                        that._handleKeyStroke(event.key);
                    }

                    return;
                }

                if (((event.key === 'PageUp' || event.key === 'PageDown') && !focusedItem) || target === that.$.listBox.$.filterInput) {
                    return;
                }

                event.preventDefault();

                if (!focusedItem || (focusedItem && !focusedItem._focused)) {
                    that._focus(that.items[0]);
                    return;
                }

                that._handleKeyStroke(event.key);

                //Update the autoComplete if it's manual
                if (that.autoComplete === 'inline' || that.autoComplete === 'list') {
                    that._updateAutoCompleteHelper();
                }

                break;
            case 'Backspace':
                if (that.$.input.previousElementSibling) {
                    if (that.$.input.value.length === 0) {
                        if (that.selectedIndexes.length === 1 && ['zeroOrMany', 'zeroOrOne', 'checkBox'].indexOf(that.selectionMode) < 0) {
                            return;
                        }

                        const itemToBeRemoved = that.$.listBox.getItem(that.$.input.previousElementSibling._value);

                        if (itemToBeRemoved) {
                            that.unselect(itemToBeRemoved);
                        }
                        else if (that.$.selectionField.firstElementChild && that.$.selectionField.firstElementChild.nodeName === 'SPAN') {
                            that.$.selectionField.removeChild(that.$.selectionField.firstElementChild)
                        }
                    }

                    return;
                }

                if (that.selectedIndexes.length > 1) {
                    that.clearSelection(true);
                }

                break;
            default:
                if (target === that.$.input && that.selectionMode === 'oneOrManyExtended') {
                    that.$.listBox._keysPressed[event.key] = true;
                }

                if (that._autoOpenOnKeyDown(event) === true) {
                    return;
                }
        }
    }

    /**
     * Handles keyboard keys
     * @param {any} key
     */
    _handleKeyStroke(key) {
        const that = this,
            listBox = that.$.listBox;

        if (that.autoComplete === 'none') {
            listBox._handleKeyStrokes(key);
            return;
        }

        const items = that.items;

        switch (key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                that._handleArrowKeys(true);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                that._handleArrowKeys(false);
                break;
            case 'Home':
            case 'End': {
                if (items.length === 0) {
                    return;
                }

                const isHomeKeyPressed = key === 'Home';

                that._focus(isHomeKeyPressed ? items[0] : items[items.length - 1]);
                listBox.scrollTop = isHomeKeyPressed ? 0 : listBox.scrollHeight;
                break;
            }
            case 'PageUp': {
                that._pageUpKeyHandler(items);
                break;
            }
            case 'PageDown': {
                that._pageDownKeyHandler(items);
                break;
            }
        }

        listBox._recycle();
    }

    /**
     * Handles the Arrow keys only for autoComplete modes
     * @param {any} isArrowUp
     */
    _handleArrowKeys(isArrowUp) {
        const that = this,
            listBox = that.$.listBox;

        let focusedItemIndex;

        if (that._focusedItem) {
            focusedItemIndex = that.$.listBox._indexOf(that._focusedItem);
            that._focusedItem._focused = false;
        }
        else if (that.selectedIndexes.length !== 0) {
            focusedItemIndex = that.selectedIndexes[that.selectedIndexes.length - 1]
        }
        else {
            return;
        }

        const focusedItem = isArrowUp ?
            listBox._getPreviousItem(focusedItemIndex) :
            listBox._getNextItem(focusedItemIndex);

        that._focus(focusedItem);

        if (that.autoComplete === 'list' && listBox._items[focusedItemIndex] !== focusedItem) {
            that._keyboardNavigation = true;
            listBox.clearSelection();
            listBox.select(focusedItem);
            delete that._keyboardNavigation;
        }

        that.ensureVisible(focusedItem);
    }

    /**
  * Page Down key handler.
  */
    _pageDownKeyHandler(items) {
        const that = this,
            listBox = that.$.listBox;

        let selectedItem = listBox._items[that.selectedIndexes[that.selectedIndexes.length - 1]];

        if (listBox._focusedItem) {
            selectedItem = listBox._focusedItem;
        }

        let item;
        const selectedItemIndex = listBox._indexOf(selectedItem);
        let viewTop = selectedItem.top + listBox.$.itemsContainer.offsetHeight - selectedItem.height;

        for (let i = selectedItemIndex; i < items.length; i++) {
            if (items[i].top >= viewTop) {
                item = items[i];
                break;
            }
        }

        if (!item) {
            item = items[items.length - 1];
        }

        that._focus(item);

        if (item.height + item.top > listBox.$.itemsContainer.scrollTop + listBox.$.itemsContainer.offsetHeight ||
            item.top < listBox.$.itemsContainer.scrollTop) {
            listBox.scrollTop = item.top - listBox.$.itemsContainer.offsetHeight + item.height;
        }
    }

    /**
   * Page Up key handler.
   */
    _pageUpKeyHandler(items) {
        const that = this,
            listBox = that.$.listBox;

        let selectedItem = listBox._items[that.selectedIndexes[that.selectedIndexes.length - 1]];

        if (listBox._focusedItem) {
            selectedItem = listBox._focusedItem;
        }

        const viewTop = selectedItem.top - listBox.$.itemsContainer.offsetHeight;
        const selectedItemIndex = listBox._indexOf(selectedItem);
        let item;

        for (let i = selectedItemIndex; i > 0; i--) {
            if (items[i].top <= viewTop) {
                item = items[i];
                break;
            }
        }

        if (!item) {
            item = items[0];
        }

        listBox._focus(item);

        listBox.scrollTop = item.top;

        if (listBox._indexOf(item) === 0) {
            listBox.scrollTop = 0;
        }
    }

    /**
     * Handles auto opening on specific key down
     * @param {any} event
     */
    _autoOpenOnKeyDown(event) {
        const that = this;

        if (that.opened || (!that.opened && that.autoOpenShortcutKey.indexOf(event.key) < 0)) {
            return;
        }

        if (that.selectedIndexes.length) {
            that._focus(that.items[that.selectedIndexes[that.selectedIndexes.length - 1]]);
        }

        const focusedItem = typeof that._focusedItem === 'function' ? that._focusedItem() : that._focusedItem;

        that.open();

        if (!focusedItem || (focusedItem && !focusedItem._focused)) {
            if (event.key === 'ArrowDown') {
                that._focus(that.items[0]);
            }
            else if (event.key === 'ArrowUp') {
                that._focus(that.items[that.items.length - 1]);
            }

            that.ensureVisible(that._focusedItem);
        }

        return true;
    }

    /**
    * ComboBox key up event handler.
    */
    _keyUpHandler(event) {
        const that = this,
            target = that.enableShadowDOM ? event.composedPath()[0] : event.target;

        if (that.disabled || (that.escKeyMode === 'none' && event.key === 'Escape') || target === that.$.listBox.$.filterInput) {
            return;
        }

        delete that._preventInputChangeEvent;

        if (target === that.$.input && that.selectionMode === 'oneOrManyExtended') {
            that.$.listBox._keysPressed[event.key] = false;
        }

        if (['one', 'radioButton', 'zeroOrOne'].indexOf(that.selectionMode) > -1 && that.selectedIndexes.length === 1 &&
            that.$.input.value !== (that._currentSelection ? that._currentSelection[0] : undefined)) {
            that._preventInputChangeEvent = true;
            that.unselect(that.$.listBox._items[that.selectedIndexes[0]]);
        }

        if (event.key === 'Enter') {
            that.$.dropDownButton.removeAttribute('active');
            return;
        }

        if (target === that.$.input && event.key.indexOf('Arrow') < 0 && ['Control', 'Shift'].indexOf(event.key) < 0) {
            if (that.value === that.$.input.value) {
                return;
            }

            if (that._currentSelection) {
                that.value = that._currentSelection.toString() + (that._currentSelection.length > 0 ? ',' : '') + that.$.input.value;
            }
            else {
                that.value = that.$.input.value;
            }

            that.$.autoCompleteString.textContent = '';

            if (that._closedFromKeyCombination) {
                that._closedFromKeyCombination = false;
                return;
            }

            //that._unfocus();

            if (that.autoComplete !== 'none' && that.autoComplete !== 'list') {
                if (that.$.input.value !== (that._currentSelection ? that._currentSelection.toString() : undefined) ||
                    (that.$.listBox._filteredItems && that.$.listBox._filteredItems.length !== that.$.listBox._items.length)) {
                    if (that._autoCompleteTimer) {
                        clearTimeout(that._autoCompleteTimer);
                    }

                    that._autoCompleteTimer = setTimeout(function () {
                        that._autoComplete(true);
                    }, that.autoCompleteDelay);
                }
            }
            else {
                if (that.$.input.value.length > 0) {
                    that._queryItems();
                }

                if (that._focusedItem && !(event.key === 'Escape' && that.escKeyMode === 'firstPossibleValue')) {
                    that.open();

                    if (event.key !== ' ') {
                        that.$.listBox._scrollView.scrollTop = that._focusedItem.offsetTop;
                    }
                }
            }

            if ((that.autoComplete !== 'none' && that.autoComplete !== 'list') && that.$.listBox._filteredItems && that.$.listBox._filteredItems.length === that.$.listBox._items.length) {
                that.close();
                return;
            }
        }
    }

    /**
     * Checks if input's value matches an item from the listBox
     */
    _queryItems(selectItem) {
        const that = this;

        if (!that.value || !that.$.input) {
            that.close();
            return;
        }

        let foundItems = that.$.listBox._queryItems(that.$.input.previousElementSibling ? that.$.input.value : that.value, that.incrementalSearchMode);

        if (foundItems.length === 0) {
            that._unfocus();
        }

        for (let i = 0; i < foundItems.length; i++) {
            if (!foundItems[i].hidden) {
                if (selectItem && !foundItems[i].selected) {
                    that.select(foundItems[i]);
                }

                that._focus(foundItems[i]);
                break;
            }
        }

        if (that.autoComplete === 'list' && (that.enableShadowDOM ? that.shadowRoot.activeElement : document.activeElement) === that.$.input &&
            that.$.input.value.length >= that.minLength) {
            that._lastSelectedItem = that._focusedItem;
            that._updateAutoCompleteHelper();
        }
        else {
            that._lastSelectedItem = undefined;
        }
    }

    /**
    * Document select start event handler.
    */
    _selectStartHandler(event) {
        const that = this;

        if (that._resizeDetails && that._resizeDetails.started) {
            event.preventDefault();
        }
    }

    /**
    * Unfocuses the focused list item from the ComboBox.
    */
    _unfocus() {
        const that = this;

        if (!that._focusedItem) {
            return;
        }

        that._focusedItem._focused = false;
        that.$.listBox._focusedItem = undefined;
    }

    /**
     * Sets WAI-ARIA relations.
     */
    _setAriaRelations() {
        const that = this;

        that.setAttribute('role', 'combobox');
        that.setAttribute('aria-describedby', that.$.hint.id);
        that.setAttribute('aria-expanded', that.opened);
        that.setAttribute('aria-haspopup', 'listbox');
        that.setAttribute('aria-labelledby', that.$.label.id);
        that._ariaButton = that;
        that._setAriaAutocomplete();
    }

    /**
     * Sets the WAI-ARIA property aria-autocomplete.
     */
    _setAriaAutocomplete() {
        const that = this,
            autoComplete = that.autoComplete,
            input = that.$.input;

        if (autoComplete === 'none') {
            input.setAttribute('aria-autocomplete', 'none');
        }
        else if (autoComplete === 'auto' || autoComplete === 'manual') {
            input.setAttribute('aria-autocomplete', 'list');
        }
        else {
            input.setAttribute('aria-autocomplete', 'both');
        }
    }
});
