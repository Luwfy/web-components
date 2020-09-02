
/**
* DropDownLst custom element.
*/
LW('lw-drop-down-list', class DropDownList extends LW.ContentElement {

    /**
    * DropDownList's properties
    */
    static get properties() {
        return {
            'autoCloseDelay': {
                value: 100,
                type: 'number'
            },
            'dataSource': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'displayLoadingIndicator': {
                value: false,
                type: 'boolean'
            },
            'displayMember': {
                value: '',
                type: 'string'
            },
            'displayMode': {
                allowedValues: ['outlined', 'filled', 'underlined'],
                value: 'outlined',
                type: 'string'
            },
            'dropDownAppendTo': {
                value: null,
                type: 'any'
            },
            'dropDownButtonPosition': {
                allowedValues: ['none', 'left', 'right', 'top', 'bottom'],
                value: 'right',
                defaultReflectToAttribute: true,
                type: 'string'
            },
            'dropDownMinHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownMaxHeight': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownOpenMode': {
                allowedValues: ['none', 'default', 'dropDownButton', 'auto'],
                value: 'default',
                type: 'string'
            },
            'dropDownOverlay': {
                value: false,
                type: 'boolean'
            },
            'dropDownPlaceholder': {
                value: 'No Items',
                type: 'string'
            },
            'dropDownPosition': {
                allowedValues: ['auto', 'top', 'bottom', 'overlay-top', 'overlay-center', 'overlay-bottom', 'center-bottom', 'center-top'],
                value: 'auto',
                type: 'string'
            },
            'dropDownMinWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'dropDownMaxWidth': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'filterable': {
                value: false,
                type: 'boolean'
            },
            'filterInputPlaceholder': {
                value: '',
                type: 'string'
            },
            'filterCallback': {
                value: null,
                type: 'function?'
            },
            'filterMode': {
                value: 'startsWithIgnoreCase',
                allowedValues: ['contains', 'containsIgnoreCase', 'doesNotContain', 'doesNotContainIgnoreCase', 'equals', 'equalsIgnoreCase', 'startsWith', 'startsWithIgnoreCase', 'endsWith', 'endsWithIgnoreCase', 'custom'],
                type: 'string'
            },
            'grouped': {
                value: false,
                type: 'boolean'
            },
            'groupMember': {
                value: '',
                type: 'string'
            },
            'hint': {
                value: '',
                type: 'string'
            },
            'horizontalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'incrementalSearchDelay': {
                value: 700,
                type: 'number?'
            },
            'incrementalSearchMode': {
                value: 'startsWithIgnoreCase',
                allowedValues: ['contains', 'containsIgnoreCase', 'doesNotContain', 'doesNotContainIgnoreCase', 'equals', 'equalsIgnoreCase', 'startsWith', 'startsWithIgnoreCase', 'endsWith', 'endsWithIgnoreCase'],
                type: 'string'
            },
            'itemMeasureMode': {
                value: 'auto',
                allowedValues: ['auto', 'precise'],
                type: 'string'
            },
            'inputMember': {
                value: 'label',
                type: 'string'
            },
            'itemTemplate': {
                value: null,
                type: 'any'
            },
            'itemHeight': {
                value: null,
                type: 'number?'
            },
            'label': {
                value: '',
                type: 'string'
            },
            'loadingIndicatorPlaceholder': {
                value: 'Loading...',
                type: 'string'
            },
            'loadingIndicatorPosition': {
                value: 'center',
                allowedValues: ['bottom', 'center', 'top'],
                type: 'string'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidNode': '{{elementType}}: Invalid parameter "{{node}}" when calling {{method}}.'
                    }
                },
                type: 'object'
            },
            'name': {
                value: '',
                type: 'string'
            },
            'opened': {
                value: false,
                type: 'boolean'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'resizeMode': {
                value: 'none',
                allowedValues: ['none', 'horizontal', 'vertical', 'both'],
                type: 'string'
            },
            'resizeIndicator': {
                value: false,
                type: 'boolean'
            },
            'selectionDisplayMode': {
                value: 'plain',
                allowedValues: ['plain', 'placeholder', 'tokens'],
                type: 'string'
            },
            'selectionMode': {
                value: 'one',
                allowedValues: ['none', 'oneOrManyExtended', 'zeroOrMany', 'oneOrMany', 'zeroOrOne', 'one', 'checkBox', 'radioButton'],
                type: 'string'
            },
            'selectedIndexes': {
                value: [],
                type: 'array'
            },
            'selectedValues': {
                value: [],
                type: 'array'
            },
            'sorted': {
                value: false,
                type: 'boolean'
            },
            'sortDirection': {
                value: 'asc',
                type: 'string'
            },
            'tokenTemplate': {
                value: null,
                type: 'any'
            },
            'type': {
                value: 'list',
                type: 'string',
                defaultReflectToAttribute: true,
                readonly: true
            },
            'valueMember': {
                value: '',
                type: 'string'
            },
            'virtualized': {
                value: false,
                type: 'boolean'
            },
            'verticalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            }
        }
    }

    /**
    * DropDownList's event listeners.
    */
    static get listeners() {
        return {
            'actionButton.down': '_buttonsDownHandler',
            'actionButton.mouseenter': '_buttonsMouseEventsHandler',
            'actionButton.mouseleave': '_buttonsMouseEventsHandler',
            'actionButton.focus': '_buttonsFocusHandler',
            'actionButton.blur': '_buttonsFocusHandler',
            'document.selectstart': '_selectStartHandler',
            'document.dragstart': '_dragStartHandler',
            'document.down': '_documentDownHandler',
            'document.up': '_documentUpHandler',
            'document.move': '_documentMoveHandler',
            'dropDownButton.down': '_buttonsDownHandler',
            'dropDownButton.mouseenter': '_buttonsMouseEventsHandler',
            'dropDownButton.mouseleave': '_buttonsMouseEventsHandler',
            'keydown': '_keyDownHandler',
            'keyup': '_keyUpHandler',
            'focus': '_focusEventHandler',
            'blur': '_blurEventHandler',
            'dropDownButton.focus': '_buttonsFocusHandler',
            'dropDownButton.blur': '_buttonsFocusHandler',
            'dropDownContainer.transitionend': '_dropDownTransitionendHandler',
            'listBox.change': '_listBoxChangeHandler',
            'listBox.itemClick': '_listBoxItemClickHandler',
            'listBox.keydown': '_listBoxKeyDownHandler',
            'listBox.bindingComplete': '_bindingCompleteHandler',
            'mouseenter': '_mouseEnterHandler',
            'mouseleave': '_mouseLeaveHandler',
            'resize': '_resizeHandler',
            'resizeBar.move': '_resizeBarMoveHandler',
            'styleChanged': '_styleChangedHandler',
            'wheel': '_mouseWheelHandler'
        };
    }

    /**
    * DropDownList's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <span class="lw-label" id="label">[[label]]</span>
                    <div id="content" class="lw-content" role="presentation">
                        <div class="lw-buttons-container" id="buttonsContainer" role="presentation">
                            <span id="actionButton" class ="lw-action-button" role="presentation">[[placeholder]]</span>
                            <span id="dropDownButton" class="lw-drop-down-button">
                                <span class ="lw-drop-down-button-icon" id="arrow" aria-hidden="true"></span>
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
                                    right-to-left="[[rightToLeft]]"
                                    readonly="[[readonly]]"
                                    selected-indexes="{{selectedIndexes}}"
                                    selection-mode="[[selectionMode]]"
                                    selected-values="{{selectedValues}}"
                                    sorted="[[sorted]]"
                                    sort-direction="[[sortDirection]]"
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
                    <span class="lw-hint lw-hidden" id="hint">[[hint]]</span>
                </div>`;
    }

    /*
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.dropdownlist.css',
            'lw.dropdown.css'
        ]
    }

    /**
    * Updates the DropDownList when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'animation':
                that.$.dropDownContainer.setAttribute('animation', that.animation);
                break;
            case 'disabled':
                that._setFocusable();
                that.close();
                that._positionDetection.handleAutoPositioning();
                break;
            case 'dataSource':
            case 'displayMember':
            case 'inputMember':
                //when selectedValues is 0 and displayMember is changed set actionButton text to default.
                if (that.$.actionButton) {
                    that.$.actionButton.innerHTML = that.placeholder;
                }

                //Check the new listBox size
                that._setDropDownSize();
                that._positionDetection.checkBrowserBounds('vertically');
                that._positionDetection.positionDropDown();
                that._positionDetection.checkBrowserBounds('horizontally');
                break;
            case 'dropDownAppendTo':
                that._positionDetection.dropDownAppendToChangedHandler();
                break;
            case 'dropDownOpenMode':
                that._setFocusable();

                //Close the dropDownList without throwing events.
                that.$dropDownContainer.addClass('lw-visibility-hidden');
                that.$.dropDownButton.removeAttribute('selected');
                that.removeAttribute('drop-down-button-focus');
                that.removeAttribute('action-button-focus');
                that.opened = false;

                if (that._ariaButton) {
                    that._ariaButton.setAttribute('aria-expanded', false);
                }

                that._setAriaRelations();
                break;
            case 'dropDownOverlay':
                if (!newValue) {
                    that._positionDetection.removeOverlay();
                }

                break;
            case 'dropDownPosition':
                that._positionDetection.dropDownPositionChangedHandler();
                break;
            case 'dropDownMinWidth':
            case 'dropDownWidth':
            case 'dropDownMaxWidth':
            case 'dropDownHeight':
            case 'dropDownMinHeight':
            case 'dropDownMaxHeight':
                that._setDropDownSize();
                break;
            case 'filterable':
                //NOTE: We need this property to be applied in time before _setDropDownSize() is called
                that.$.listBox.filterable = newValue;

                if (that._dropDownSize && that._dropDownSize.height === 'auto') {
                    that._setDropDownSize();
                }

                break;
            case 'label':
                if (!that._ariaButton) {
                    return;
                }

                if (newValue) {
                    that._ariaButton.setAttribute('aria-labelledby', that.$.label.id);
                }
                else if (that.elementName === 'DropDownList') {
                    that._ariaButton.setAttribute('aria-labelledby', that.$.actionButton.id);
                }

                break;
            case 'opened':
                if (that.disabled || that.readonly) {
                    return;
                }

                newValue ? that.open() : that.close();
                break;
            case 'placeholder':
                that._applySelection();
                break;
            case 'readonly':
                that.close();
                break;
            case 'resizeIndicator':
                if (newValue) {
                    that.$.dropDownContainer.setAttribute('resize-indicator', '');
                }
                else {
                    that.$.dropDownContainer.removeAttribute('resize-indicator');
                }

                break;
            case 'resizeMode':
                that.$.dropDownContainer.setAttribute('resize-mode', that.resizeMode);
                break;
            case 'selectedValues':
            case 'selectedIndexes':
                if (newValue.length === 0) {
                    that.$.actionButton.innerHTML = that.placeholder;
                }
                else {
                    that._applySelection();
                }
                break;
            case 'selectionMode':
                //NOTE: Manually apply the selectionMode in order to resize the drop down after the mode is changed
                if (that.$.listBox) {
                    that.$.listBox[propertyName] = newValue;

                    if (newValue === 'checkBox' || newValue === 'radioButton' || oldValue === 'checkBox' || oldValue === 'radioButton') {
                        that._setDropDownSize();
                    }
                }
                break;
            case 'selectionDisplayMode':
                that._applySelection();
                break;
            case 'tokenTemplate':
                that._tokenTemplate = that._validateTemplate(that.tokenTemplate);
                that._applySelection();
                break;
            case 'unfocusable':
                that._setFocusable();
                break;
        }
    }

    /**
    * Appends a lw-list-item to the end of the DropDownList.
    */
    appendChild(node) {
        const that = this;

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'appendChild', node: 'node' }));
            return
        }

        that.$.listBox.appendChild(node);

        if (that._dropDownSize && that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    /**
    * Called when the element is attached from the DOM.
    */
    attached() {
        const that = this;

        super.attached();

        if (!that.isCompleted || !that.$.dropDownContainer) {
            return;
        }

        that._positionDetection.dropDownAttached('_setDropDownSize');
        that._positionDetection.checkBrowserBounds();

        //Refresh the selection
        if (that.selectedIndexes) {
            that._applySelection()
        }
    }

    /**
     * Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (!that.$.dropDownContainer) {
            return;
        }

        that.close();

        if (that._positionDetection) {
            that._positionDetection.dropDownDetached();
        }
    }

    /**
    * Removes all items from DOM.
    */
    clearItems() {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.clearItems();
        that.$.actionButton.innerHTML = that.placeholder;
    }

    /**
    * Unselects all items.
    */
    clearSelection() {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.clearSelection();
        that.$.actionButton.innerHTML = that.placeholder;
    }

    /**
    * Hides the drop down list.
    */
    close() {
        const that = this;

        if (that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
            return;
        }

        const isClosingEventPrevented = that.$.fireEvent('closing').defaultPrevented;

        if (isClosingEventPrevented) {
            return;
        }

        that.$dropDownContainer.addClass('lw-visibility-hidden');
        that.$.fireEvent('close');

        if (that.$.dropDownButton) {
            that.$.dropDownButton.removeAttribute('selected');
        }

        that.opened = false;

        if (that._ariaButton) {
            that._ariaButton.setAttribute('aria-expanded', false);
        }

        that._preventDropDownClose = false;
        that._positionDetection.removeOverlay(true);
        that.$.listBox.removeAttribute('focus');

        if (that._edgeMacFF && !that.hasAnimation && that.$.dropDownContainer) {
            that.$.dropDownContainer.style.top = that.$.dropDownContainer.style.left = '';
            that.$dropDownContainer.addClass('not-in-view');
        }
    }

    /**
    * Creates a clone of the element.
    */
    cloneNode() {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        let clone = HTMLElement.prototype.cloneNode.apply(that, Array.prototype.slice.call(arguments, 0, 1));

        //Set only those properties that have reflectToAttribute set to false.
        clone.dataSource = that.dataSource;
        return clone;
    }

    /**
    * Ensures the desired item is visible by scrolling to it.
    */
    ensureVisible(item) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.ensureVisible(item);
    }

    /**
    * Returns a LW.ListItem element if it's value is matched.
    */
    getItem(value) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        return that.$.listBox.getItem(value);
    }

    /**
    * Returns an array with the items from the list.
    */
    get items() {
        const that = this;

        if (!that.$ || !that.$.listBox) {
            return [];
        }

        return that.$.listBox.items;
    }

    /**
    * Returns the focused item;
    */
    get _focusedItem() {
        const that = this;

        if (!that.$ || !that.$.listBox) {
            return;
        }

        return that.$.listBox._focusedItem;
    }

    /**
    * Inserts an item at a specified position.
    * @param {number} index The index at which a new item will be inserted.
    * @param {string/object/array} item Describes the properties of the item that will be inserted.
     If string is passed, it will be processed as the label for the new item.
     If an object is passed, it must contain valid properties for the item, e.g. { label, value, group, disabled }.
     If an array is passed, multiple items will be inserted in the list with the coressponding settings.
    */
    insert(index, item) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.insert(index, item);

        //Add the item to the ActionButton if the item is selected.
        that._applySelection()

        if (that._dropDownSize && that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    /**
    * Inserts a lw-list-item to the DropDownList at a certain position.
    */
    insertBefore(newNode, referenceNode) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.insertBefore.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!newNode || !referenceNode) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore', node: 'newNode/referenceNode' }));
            return;
        }

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.insertBefore(newNode, referenceNode);

        if (that._dropDownSize && that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    /**
    * Shows the drop down List.
    */
    open() {
        const that = this,
            getFirstFocusableItem = function () {
                for (let i = 0; i < that.items.length; i++) {
                    if (!that.items[i].disabled) {
                        return that.items[i];
                    }
                }
            };

        if (that.disabled || !that.offsetHeight) {
            return;
        }

        if (!that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
            return;
        }

        if (that.$dropDownContainer.hasClass('not-in-view')) {
            that.$dropDownContainer.removeClass('not-in-view');
        }

        that.$.dropDownContainer.style.transition = null;

        if (that.dropDownAppendTo && that.dropDownAppendTo.length > 0) {
            const rect = that.getBoundingClientRect();

            // handles the case, when the dropdown is opened, while it is still part of the dropdownlist's tree.
            if (that.$.container.contains(that.$.dropDownContainer)) {
                let iterations = 0;
                const interval = setInterval(function () {
                    const rect = that.getBoundingClientRect();

                    iterations++;

                    if (rect.top === that._positionTop && iterations < 10) {
                        return;
                    }

                    that.open();
                    clearInterval(interval);
                    that._positionTop = rect.top;
                }, 100);

                return;
            }
            else if (rect.top !== that._positionTop) {
                that._positionTop = rect.top;
            }
        }

        const isOpeningEventPrevented = that.$.fireEvent('opening').defaultPrevented;

        if (isOpeningEventPrevented) {
            return;
        }

        if (that._shadowDOMStylesDelay) {
            that._setDropDownSize();
            delete that._shadowDOMStylesDelay;
        }

        that.opened = true;

        if (that._ariaButton) {
            that._ariaButton.setAttribute('aria-expanded', true);
        }

        that.$.listBox.setAttribute('focus', '');

        that._positionDetection.placeOverlay();
        that._positionDetection.checkBrowserBounds('vertically');
        that._positionDetection.positionDropDown();
        that._positionDetection.checkBrowserBounds('horizontally');

        that.$dropDownContainer.removeClass('lw-visibility-hidden');
        that.$.fireEvent('open');

        if (that.$.dropDownButton) {
            if (that.dropDownOpenMode === 'dropDownButton') {
                that.$.dropDownButton.setAttribute('selected', '');
            }
            else {
                that.$.dropDownButton.removeAttribute('selected');
            }
        }

        if (that.$.listBox && !that._focusedItem || (that._focusedItem && !that._focusedItem._focused)) {
            if (that.selectedIndexes.length > 0) {
                that._focus(that.items[that.selectedIndexes[0]]);
            }
            else {
                that._focus(getFirstFocusableItem);
            }
        }

        if (that.$.input && !LW.Utilities.Core.isMobile) {
            that.$.input.focus();
        }
    }

    /**
    * DropDownList ready method.
    */
    ready() {
        super.ready();
    }

    /**
     * DropDownList render method
     */
    render() {
        const that = this;

        if (that.rightToLeft) {
            that.dropDownButtonPosition = that.dropDownButtonPosition === 'right' ? 'left' : 'right';
        }

        that.classList.add('lw-drop-down-box');
        if (that.$.dropDownContainer) {
            that._positionDetection = new LW.Utilities.PositionDetection(that, that.$.dropDownContainer, that.$.container, 'close');
            that._positionDetection.getDropDownParent(true);
            that._positionDetection.setDropDownPosition();
            that._calculateDropDownSize();
            that.$.dropDownContainer.setAttribute('resize-mode', that.resizeMode);

            if (that.resizeIndicator) {
                that.$.dropDownContainer.setAttribute('resize-indicator', '');
            }

            that._positionDetection.handleAutoPositioning();
        }

        if (that.opened) {
            that.open();
        }

        //Used for the scroll handling
        that._positionTop = that.getBoundingClientRect().top;

        that._edgeMacFF = LW.Utilities.Core.Browser.Edge ||
            LW.Utilities.Core.Browser.Firefox && navigator.platform.toLowerCase().indexOf('mac') !== -1;

        if (that._edgeMacFF && that.hasAnimation && that.$.dropDownContainer) {
            that.$dropDownContainer.addClass('not-in-view');
        }

        if (that.$.label && !that.$.label.id) {
            that.$.label.id = that.id + 'Label';
        }

        if (that.$.actionButton && !that.$.actionButton.id) {
            that.$.actionButton.id = that.id + 'ActionButton';
        }

        if (that.$.hint && !that.$.hint.id) {
            that.$.hint.id = that.id + 'Hint';
        }

        if (!that.hint) {
            that.hint = that.placeholder;
        }

        that._createElement();

        super.render();
    }
    /**
    * Removes an item from the list box.
    * @param {number} index The index at which a new item will be inserted.
    */
    removeAt(index) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.removeAt(index);

        //Remove the item from the ActionButton if its present.
        that._applySelection();

        if (that._dropDownSize && that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    /**
    * Removes a lw-list-item frop the DropDownList.
    */
    removeChild(node) {
        const that = this;

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node || !(node instanceof LW.ListItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        that.$.listBox.removeChild(node);

        if (that._dropDownSize && that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    get value() {
        const that = this;

        if (!that.isRendered) {
            return null;
        }

        if (!that.$.listBox) {
            return null;
        }

        return that.$.listBox.value;
    }

    set value(newValue) {
        const that = this;

        if (!that.isRendered) {
            return null;
        }

        if (!that.$.listBox) {
            return null;
        }

        that.$.listBox.value = newValue;
    }
    /**
    * Selects an item by its HTML Element or Value.
    */
    select(item) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.select(item);
    }

    /**
    * Sets tab index
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.removeAttribute('tabindex');
            that.$.actionButton.removeAttribute('tabindex');
            that.$.dropDownButton.removeAttribute('tabindex');
            return;
        }

        let index = that.tabIndex > 0 ? that.tabIndex : 0;

        if (that.dropDownOpenMode === 'dropDownButton') {
            that.removeAttribute('tabindex');
            that.$.actionButton.setAttribute('tabindex', index);
            that.$.dropDownButton.setAttribute('tabindex', index);
        }
        else {
            that.$.actionButton.removeAttribute('tabindex');
            that.$.dropDownButton.removeAttribute('tabindex');
            that.tabIndex = index;
        }
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.ListBox': 'lw.listbox.js'
        }
    }

    /**
    * Unselects an item by its HTML Element or Value.
    */
    unselect(item) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.unselect(item);
    }

    /**
    * Updates an item from the list.
    * @param {number} index The index at which a new item will be inserted.
    * @param {string/object} settings The settings that will be applied to the item that will be updated.
      If a string is passed, it will be considered as the new label for the item.
      If an object is passed, it will should describe valid properties for the item, e.g. { label, value, group, disabled}.
    */
    update(index, details) {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        that.$.listBox.update(index, details);
        that._applySelection();
    }

    /**
     * Resizebar mousemouve event handler.
     * @param {any} event
     */
    _resizeBarMoveHandler(event) {
        //Used to prevent page scrolling on iOS devices
        if (event.originalEvent.type === 'touchmove') {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * Creates a token for the selected items
     */
    _createToken() {
        const that = this;
        let icon,
            buttonLabel = false;
        const fragment = document.createDocumentFragment(),
            lastSelectedIndex = that.selectedIndexes[that.selectedIndexes.length - 1];

        if (that.selectionDisplayMode === 'plain' && (that.selectionMode === 'one' || that.selectionMode === 'zeroOrOne' || that.selectionMode === 'radioButton')) {
            icon = '';
        }
        else {
            if (that.selectionDisplayMode === 'tokens') {
                if (that.selectedIndexes.length === 1 && (['oneOrManyExtended', 'oneOrMany', 'one', 'radioButton'].indexOf(that.selectionMode) > -1)) {
                    icon = '';
                }
                else {
                    icon = '&#10006';
                    buttonLabel = true;
                }
            }
            else {
                icon = that.selectedIndexes.length === 1 ? '' : ',';
            }
        }

        const selectedIndexes = that.selectedIndexes,
            items = that.$.listBox._items;

        for (let i = 0; i < selectedIndexes.length; i++) {
            const selectedIndex = selectedIndexes[i];

            if (items[selectedIndex]) {
                fragment.appendChild(that._applyTokenTemplate(items[selectedIndex][that.inputMember],
                    that.selectionDisplayMode !== 'tokens' && selectedIndex === lastSelectedIndex ? '' : icon,
                    buttonLabel));
            }
        }

        return fragment;
    }
    /**
    * Sets the selection mode for the DropDownList.
    */
    _applySelection() {
        const that = this;

        if (that.selectionDisplayMode === 'placeholder' || that.selectedIndexes.length === 0) {
            that.$.actionButton.innerHTML = that.placeholder;
            return;
        }

        if (!that.$.listBox._items || that.$.listBox._items.length === 0) {
            return;
        }

        if (that.selectionDisplayMode === 'plain') {
            const selectedIndexes = that.$.listBox.selectedIndexes, //that.selectedIndexes,
                items = that.$.listBox._items;
            let newValue = [];

            for (let i = 0; i < selectedIndexes.length; i++) {
                const selectedIndex = selectedIndexes[i];

                if (items[selectedIndex]) {
                    newValue.push(items[selectedIndex][that.inputMember]);
                }
            }

            that.$.actionButton.innerHTML = !newValue.length ? '' : `<span class="lw-token">${newValue.join(', ').trim()}</span>`;
            return;
        }

        that.$.actionButton.innerHTML = '';
        that.$.actionButton.appendChild(that._createToken());
    }

    /**
    * Applies a template to the tokens
    */
    _applyTokenTemplate(label, icon, buttonLabel) {
        const that = this;
        const element = document.createElement('span'),
            token = function () {
                return '<span class=\'lw-drop-down-list-selection-label\' role="presentation">' + label +
                    `</span><span class=\'lw-drop-down-list-unselect-button\' role="button"${buttonLabel ? ' aria-label="Unselect"' : ''}>${icon}</span>`;
            };

        element.classList.add('lw-token');

        if (that._tokenTemplate) {
            let content = document.importNode(that._tokenTemplate.content, true);
            const childrenCount = content.childNodes.length,
                regex = /{{\w+}}/g;
            let bindingString;

            for (let i = 0; i < childrenCount; i++) {
                bindingString = regex.exec(content.childNodes[i].innerHTML);

                if (bindingString) {
                    content.childNodes[i].innerHTML = content.childNodes[i].innerHTML.replace(bindingString[0], token());
                }

                if (content.childNodes[i].outerHTML) {
                    element.innerHTML += content.childNodes[i].outerHTML;
                }
            }
        }
        else if (typeof that.tokenTemplate === 'function') {
            that.tokenTemplate(element, { label: label, iconSeparator: icon });
        }
        else {
            element.innerHTML = token();
        }

        return element;
    }

    /**
     * BindingComplete event Handler. When the dataSource or size of listBox is changed.
     */
    _bindingCompleteHandler() {
        const that = this;

        if (!that.$.listBox) {
            return;
        }

        requestAnimationFrame(() => {
            that._setDropDownSize();
            that._positionDetection.checkBrowserBounds();
        });
    }

    /**
    * Action/DropDown button mouse down event handler.
    */
    _buttonsDownHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        if (that.hasRippleAnimation) {
            if (!that.$.buttonsContainer || that.dropDownOpenMode === 'dropDownButton') {
                LW.Utilities.Animation.Ripple.animate(event.target, event.pageX, event.pageY);
            }
            else {
                const target = that.$.buttonsContainer;

                target.firstElementChild.noRipple = true;
                LW.Utilities.Animation.Ripple.animate(target, event.pageX, event.pageY);
                target.firstElementChild.noRipple = false;
            }
        }

        that._preventsSelectStart = true;

        if (that.tagName.toLowerCase().indexOf('lw-drop-down-') > -1 && that.dropDownOpenMode === 'dropDownButton' && event.target === that.$.actionButton) {
            that.$.actionButton.setAttribute('active', '');
        }

        //Used to handle closing after blur event is thrown
        if (that.opened) {
            that._preventDropDownClose = true;
        }
    }

    /**
    * DropDownList container mouse enter/leave events handler.
    */
    _buttonsMouseEventsHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        if (event.type === 'mouseenter') {
            that.setAttribute('hover', '');
            event.target.setAttribute('hover', '');
        }
        else {
            that.removeAttribute('hover');
            event.target.removeAttribute('hover');
        }
    }

    /**
    * Calculates the dropDownSize and creates an object with the sizes
    */
    _calculateDropDownSize() {
        const that = this;

        that._dropDownSize = {};

        const computedStyle = window.getComputedStyle(that.$.dropDownContainer);
        const topBorder = parseFloat(computedStyle.getPropertyValue('border-top-width').trim()),
            bottomBorder = parseFloat(computedStyle.getPropertyValue('border-bottom-width').trim()),
            topMargin = parseFloat(computedStyle.getPropertyValue('margin-top').trim()),
            bottomMargin = parseFloat(computedStyle.getPropertyValue('margin-bottom').trim()),
            topPaddinng = parseFloat(computedStyle.getPropertyValue('padding-top').trim()),
            bottomPaddinng = parseFloat(computedStyle.getPropertyValue('padding-bottom').trim());

        if (LW.Utilities.Core.CSSVariablesSupport()) {
            that._dropDownSize.width = computedStyle.getPropertyValue('--lw-drop-down-list-drop-down-width').trim();
            that._dropDownSize.height = computedStyle.getPropertyValue('--lw-drop-down-list-drop-down-height').trim();
        }

        if (!that._dropDownSize.width || that._dropDownSize.width.indexOf('initial') > -1) {
            that._dropDownSize.width = that.offsetWidth;
        }

        if (!that._dropDownSize.height) {
            that._dropDownSize.height = 'auto';
        }

        that._dropDownSize.minHeight = parseFloat(computedStyle.getPropertyValue('min-height').trim());
        that._dropDownSize.maxHeight = parseFloat(computedStyle.getPropertyValue('max-height').trim());
        that._dropDownSize.borderWidth = (isNaN(topBorder) ? 0 : topBorder) + (isNaN(bottomBorder) ? 0 : bottomBorder);
        that._dropDownSize.paddingWidth = (isNaN(topPaddinng) ? 0 : topPaddinng) + (isNaN(bottomPaddinng) ? 0 : bottomPaddinng);
        that._dropDownSize.marginWidth = (isNaN(topMargin) ? 0 : topMargin) + (isNaN(bottomMargin) ? 0 : bottomMargin);
    }



    /**
    * Initializes the element.
    */
    _createElement() {
        const that = this;

        that._tokenTemplate = that._validateTemplate(that.tokenTemplate);

        //Set properties.
        that._applySelection();
        that._setDropDownSize();
        that._setFocusable();

        //Flag indicator for the ripple effect. Used to append the ripple to that specific element, not his firstElementChild like it's done usually.
        //Used in class Ripple, method animate() in lwelement.
        that.$.arrow.noRipple = true;

        that._shadowDOMStylesDelay = that.shadowRoot;

        that._setAriaRelations(true);

    }

    /**
    * Document mouse down event handler.
    */
    _documentDownHandler(event) {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        let target = event.originalEvent.target;

        if (target === that._overlay) {
            that._overlayDown = true;
        }

        if (that.shadowRoot) {
            target = event.originalEvent.composedPath()[0];

            let rootElement = target.getRootNode().host;

            while (rootElement) {
                if (rootElement.closest('.lw-drop-down-container') === that.$.dropDownContainer) {
                    that._isDropDownClicked = true;
                }

                rootElement = rootElement.getRootNode().host;
            }
        }
        else {
            if (that.isInShadowDOM) {
                target = event.originalEvent.composedPath()[0];
            }

            that._isDropDownClicked = target.closest('.lw-drop-down-container') === that.$.dropDownContainer;
        }

        that._buttonClicked = target.closest('.lw-action-button') || target.closest('.lw-drop-down-button');

        if (that.$.listBox) {
            let listItem = target.closest('lw-list-item');

            if (!that.$.listBox.contains(listItem)) {
                listItem = undefined;
            }

            if (that.hasRippleAnimation && listItem) {
                LW.Utilities.Animation.Ripple.animate(listItem, event.pageX, event.pageY);
            }

            if (listItem || target === that.$.listBox.$.filterInput || target.closest('.lw-token')) {
                that._preventDropDownClose = true;
            }
        }

        if (that._isDropDownClicked) {
            that._preventDropDownClose = true;
        }

        if (target !== that.$.resizeBar || that.resizeMode === 'none') {
            return;
        }

        if (!that._resizeDetails) {
            that._resizeDetails = {};
        }

        const computedStyle = that.$.dropDownContainer.getBoundingClientRect();

        that._resizeDetails.started = true;
        that._resizeDetails.x = event.pageX;
        that._resizeDetails.y = event.pageY;
        that._resizeDetails.width = that.$.dropDownContainer.offsetWidth;
        that._resizeDetails.height = that.$.dropDownContainer.offsetHeight;
        that._resizeDetails.offsetXL = event.clientX - computedStyle.left;
        that._resizeDetails.offsetXR = computedStyle.left + that.$.dropDownContainer.offsetWidth - event.clientX;
        that._resizeDetails.offsetY = computedStyle.top + that.$.dropDownContainer.offsetHeight - event.clientY;
        that._resizeDetails.offsetYtop = event.clientY - computedStyle.top;
        that._preventDropDownClose = true;
    }


    /**
     * Document Move Event handler
     * @param {any} event
     */
    _documentMoveHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (that.dropDownOpenMode === 'auto' && that.dropDownAppendTo !== null) {
            if (that.contains(target) || that.$.dropDownContainer.contains(target)) {
                that._isElementHovered = true;
            }
            else {
                that._isElementHovered = false;
                that._autoClose();
            }
        }

        if (!that._resizeDetails || (that._resizeDetails && !that._resizeDetails.started)) {
            return;
        }

        that.setAttribute('resizing', '');

        if (!that._resizeDetails.resizeEventFired) {
            that.$.fireEvent('resizeStart', {
                'position': { left: event.pageX, top: event.pageY }
            });

            that._resizeDetails.resizeEventFired = true;
        }

        const doc = document.documentElement,
            computedStyle = that.$.dropDownContainer.getBoundingClientRect(),
            dropDownStyle = that.getBoundingClientRect(),
            direction = that.$.dropDownContainer.hasAttribute('top') ? 'top' : 'bottom';
        let size;

        function verticalResize() {
            size = event.pageY - that._resizeDetails.y;

            if (direction === 'bottom') {
                //6 is the margin of document.body, we don't want scrollbars to be shown
                that._resizeDetails.height = Math.min(doc.clientHeight - computedStyle.top - 6,
                    Math.max(0, that._resizeDetails.height + size));

                that._resizeDetails.y = Math.max(computedStyle.top + doc.scrollTop - that._resizeDetails.offsetY,
                    Math.min(doc.clientHeight + doc.scrollTop - that._resizeDetails.offsetY * 1.5, event.pageY));
            }
            else {
                that._resizeDetails.height = Math.min(that._dropDownSize.maxHeight, Math.max(0, Math.min(dropDownStyle.top, that._resizeDetails.height - size)));

                size = Math.max(0, computedStyle.top + (computedStyle.height - Math.max(that._dropDownSize.minHeight, that._resizeDetails.height)));

                if (that.dropDownAppendTo && that.dropDownAppendTo.length > 0) {
                    const margin = Math.abs(parseFloat(getComputedStyle(that.$.dropDownContainer).getPropertyValue('margin-bottom'))) || 0;

                    that.$.dropDownContainer.style.top = that.dropDownAppendTo && that.dropDownAppendTo.length > 0 ? (margin + size) + 'px' : '';
                }

                const minYCondition = dropDownStyle.top + doc.scrollTop + that._resizeDetails.offsetYtop;

                that._resizeDetails.y = Math.max(that._resizeDetails.offsetYtop,
                    Math.min(minYCondition, Math.max(minYCondition - that._dropDownSize.maxHeight, event.pageY)));
            }

            that.$.dropDownContainer.style.height = that._resizeDetails.height + 'px';
        }

        function horizontalResize() {
            //Resize only from corner
            //if (that._resizeDetails.offsetXR > 20) {
            //    return;
            //}

            size = event.pageX - that._resizeDetails.x;

            //6 is the margin of document.body, we don't want scrollbars to be shown
            that._resizeDetails.width = Math.min(doc.clientWidth - computedStyle.left - 6,
                Math.max(0, that._resizeDetails.width + size));

            that.$.dropDownContainer.style.width = that._resizeDetails.width + 'px';

            that._resizeDetails.x = Math.max(computedStyle.left + doc.scrollLeft - that._resizeDetails.offsetXR,
                Math.min(doc.clientWidth + doc.scrollLeft - that._resizeDetails.offsetXR * 1.5, event.pageX));
        }

        switch (that.resizeMode) {
            case 'vertical':
                verticalResize();
                break;
            case 'horizontal':
                horizontalResize();
                break;
            case 'both':
                horizontalResize();
                verticalResize();
                break;
        }
    }

    /**
    * Document Up handler.
    */
    _documentUpHandler(event) {
        const that = this;

        that.$.actionButton.removeAttribute('active');

        if (that._resizeDetails && that._resizeDetails.started) {
            that._resizeDetails.started = that._resizeDetails.resizeEventFired = false;
            that.removeAttribute('resizing');
            that._preventDropDownClose = false;
            that.focus();

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

        let target = event.originalEvent.target,
            rootElement = target.closest ? target.closest('lw-drop-down-list') : undefined;

        if (that.enableShadowDOM || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
            rootElement = target.getRootNode().host;
        }

        that._preventsSelectStart = false;

        if (typeof (target) === 'undefined' || target === that.$.resizeBar) {
            return;
        }

        if (that.selectionDisplayMode === 'tokens' && target.classList.contains('lw-drop-down-list-selection-label') && rootElement === that) {
            if (that.dropDownOpenMode !== 'none') {
                that.open();
            }

            let item = that.$.listBox._items.filter(item => item[that.inputMember].toString() === target.textContent)[0];

            //Scroll to that item and focus it.
            that.$.listBox._scrollView.scrollTop = item.offsetTop;
            that._focus(item);
            return;
        }

        if (that.selectionDisplayMode === 'tokens' && target.classList.contains('lw-drop-down-list-unselect-button') && rootElement === that) {
            if (that.selectedIndexes.length === 1 && ['zeroOrMany', 'zeroOrOne', 'checkBox'].indexOf(that.selectionMode) < 0) {
                return;
            }

            that.unselect(that.$.listBox._items.filter(item => item[that.inputMember].toString() === target.previousElementSibling.textContent)[0]);
            return;
        }

        const isActionButtonPressed = target.closest('.lw-action-button');
        let openDropDown;

        if (that._buttonClicked) {
            if (that.dropDownOpenMode === 'dropDownButton' && isActionButtonPressed && that._buttonClicked === that.$.actionButton) {
                that.$.fireEvent('actionButtonClick');
            }
            else if (target.closest('.lw-drop-down-button') === that._buttonClicked || isActionButtonPressed === that._buttonClicked) {
                openDropDown = true;
                that.$.fireEvent('dropDownButtonClick');
            }
        }

        that._buttonClicked = undefined;

        if (isActionButtonPressed === that.$.actionButton || target.closest('.lw-drop-down-button') === that.$.dropDownButton) {
            if (that.dropDownOpenMode === 'dropDownButton' && isActionButtonPressed === that.$.actionButton) {
                that.close();
                return;
            }

            //Open/Close the dropDownList
            that.$dropDownContainer.hasClass('lw-visibility-hidden') && that.dropDownOpenMode !== 'none' &&
                openDropDown && event.originalEvent.type !== 'pointercancel' ? that.open() : that.close();
            return;
        }

        target = that._getUpEventTarget(target);

        if (target === undefined) {
            return;
        }

        if (target !== 'dropDownContainer' && target !== 'item' || target === 'item' && that.selectionMode !== 'checkBox' && that.selectionMode.indexOf('Many') < 0) {
            that.close();
        }
    }

    /**
    * DragStarted Event Handler
    * @param {any} event
    */
    _dragStartHandler(event) {
        const that = this;

        if (that._resizeDetails && that._resizeDetails.started) {
            event.preventDefault();
        }
    }

    /**
    * Dropdown transitionend handler.
    */
    _dropDownTransitionendHandler() {
        const that = this;

        if (that._edgeMacFF && !that.opened && that.hasAnimation) {
            that.$.dropDownContainer.style.top = that.$.dropDownContainer.style.left = '';
            that.$dropDownContainer.addClass('not-in-view');
        }
    }

    /**
    * Focuses an item. Accepts a LW.ListItem element or a string, representing the value of an item.
    */
    _focus(item) {
        this.$.listBox._focus(item);
    }

    /**
     * Element/DropDownButton blur event handler
     * @param {any} event
     */
    _blurEventHandler() {
        const that = this;

        if (that.$.dropDownButton) {
            that.removeAttribute('focus');
            that.$.dropDownButton.removeAttribute('focus');
        }

        if (that.$.actionButton) {
            that.removeAttribute('focus');
            that.$.actionButton.removeAttribute('focus');
        }

        //NOT Applicable to lwDropDownButton, because the contento of the popup is focusable !
        if (that.nodeName && that.nodeName.toLowerCase() === 'lw-drop-down-list' && !that._preventDropDownClose) {
            that.close();
        }
    }

    /**
     * Element focus event handler
     */
    _focusEventHandler() {
        const that = this;

        if (that.$.dropDownButton) {
            that.setAttribute('focus', '');
            that.$.dropDownButton.setAttribute('focus', '');
        }

        if (that.$.actionButton) {
            that.setAttribute('focus', '');
            that.$.actionButton.setAttribute('focus', '');
        }

        that.removeAttribute('drop-down-button-focus');
        that.removeAttribute('action-button-focus');
    }

    /**
     * DropDownList drop-down-button and action-button focus/blur handlers
     * @param {any} event
     */
    _buttonsFocusHandler(event) {
        const that = this;

        if (event.target === that.$.dropDownButton) {
            if (event.type === 'focus') {
                that.setAttribute('drop-down-button-focus', '');
            }
            else {
                that.removeAttribute('drop-down-button-focus');

                //NOT Applicable to lwDropDownButton, because the contento of the popup is focusable !
                if (that.nodeName && that.nodeName.toLowerCase() === 'lw-drop-down-list' && !that._preventDropDownClose) {
                    that.close();
                }
            }
        }
        else {
            event.type === 'focus' ? that.setAttribute('action-button-focus', '') : that.removeAttribute('action-button-focus');
        }
    }

    /**
     * Gets the target of a document up event.
     */
    _getUpEventTarget(originalTarget) {
        const that = this;
        let target = originalTarget;

        target = target.parentElement === undefined ? target.getRootNode().host : target.parentElement;

        while (target) {
            if (target === that.$.dropDownContainer) {
                target = 'dropDownContainer';
                break;
            }

            target = target.parentElement === undefined ? target.getRootNode().host : target.parentElement;
        }

        return target;
    }

    /**
    * DropDown keydown event handler.
    */
    _keyDownHandler(event) {
        const that = this,
            activeElement = that.enableShadowDOM ? (that.shadowRoot.activeElement || document.activeElement) : document.activeElement,
            target = that.enableShadowDOM ? event.composedPath()[0] : event.target;

        if (that.$.listBox && target === that.$.listBox.$.filterInput ||
            (activeElement !== that && activeElement !== that.$.dropDownButton && activeElement !== that.$.actionButton)) {
            return;
        }

        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();

                if (target !== that.$.actionButton) {
                    that._keyPressed = true;

                    if (that.opened) {
                        if (that._focusedItem) {
                            that.select(that._focusedItem);
                        }

                        if ((event.key === 'Enter' && ['none'].indexOf(that.selectionMode) < 0) || (event.key === ' ' && ['none', 'one', 'radioButton'].indexOf(that.selectionMode) > -1)) {
                            that.close();
                        }
                    }
                    else if (!that.opened && !that.readonly && that.dropDownOpenMode !== 'none') {
                        that.open();
                    }
                }

                if (that.dropDownOpenMode === 'dropDownButton') {
                    target.setAttribute('active', '');
                }

                break;
            case 'End':
            case 'Home':
            case 'PageUp':
            case 'PageDown':
            case 'ArrowUp':
            case 'ArrowDown':
                if (that.readonly) {
                    return;
                }

                if (event.altKey) {
                    that._keyPressed = false;
                    that.$dropDownContainer.hasClass('lw-visibility-hidden') ? that.open() : that.close();
                    return;
                }

                event.preventDefault();
                that.$.listBox._handleKeyStrokes(event.key);
                break;
            case 'Escape':
                event.preventDefault();
                that.close();
                break;
            default:
                if (that.readonly) {
                    return;
                }

                if (that.selectionMode === 'oneOrManyExtended') {
                    that.$.listBox._keysPressed[event.key] = true;
                }

                that.$.listBox._applyIncrementalSearch(event.key);
                break;
        }
    }

    /**
    * DropDown key up event handler.
    */
    _keyUpHandler(event) {
        const that = this,
            target = that.enableShadowDOM ? event.composedPath()[0] : event.target;

        if (that.$.listBox && target === that.$.listBox.$.filterInput) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            target.removeAttribute('active');

            if (!that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
                that._keyPressed = false;
                //that.$.listBox.focus();
            }
        }

        if (that.$.listBox && that.selectionMode === 'oneOrManyExtended') {
            that.$.listBox._keysPressed[event.key] = false;
        }
    }

    /**
    * DropDownList Change event handler.
    */
    _listBoxChangeHandler(event) {
        const that = this;

        if (event.target !== that.$.listBox) {
            event.stopPropagation();
            return;
        }

        if ((that.dropDownAppendTo && that.dropDownAppendTo.length > 0) || that.enableShadowDOM) {
            that.$.fireEvent('change', event.detail);
        }

        if (that.autoComplete === 'list' && event.detail) {
            const lastSelectedItem = that.$.listBox._items[event.detail.index];

            that._lastSelectedItem = lastSelectedItem && lastSelectedItem.selected ? lastSelectedItem : undefined;
        }

        that._applySelection(that.selectionMode, event.detail);
    }

    /**
     * ListBox itemClick event handler
     * @param {any} event
     */
    _listBoxItemClickHandler(event) {
        const that = this;

        if ((that.dropDownAppendTo && that.dropDownAppendTo.length > 0) || that.enableShadowDOM) {
            that.$.fireEvent(event.type, event.detail);
        }

        if (that.selectionMode !== 'checkBox' && that.selectionMode.indexOf('Many') < 0) {
            that.close();
        }

        if (!LW.Utilities.Core.isMobile) {
            that.focus();
        }

        delete that._isDropDownClicked;
    }

    /**
    * DropDownList key down handler.
    */
    _listBoxKeyDownHandler(event) {
        const that = this;

        if (event.key === 'Enter') {
            that.close();
            that.dropDownOpenMode === 'dropDownButton' ? that.$.dropDownButton.focus() : that.focus();
            event.stopPropagation();
            return;
        }

        if (event.key === 'Escape') {
            that.close();
            return;
        }
    }

    /**
    * Element container mouse enter event handler.
    */
    _mouseEnterHandler() {
        const that = this;

        that._isElementHovered = true;

        if (that.tagName.toLowerCase().indexOf('lw-drop-down-') > -1 && that.dropDownOpenMode === 'auto' && !that.disabled && !that.readonly) {
            that.open();
        }
    }

    /**
    * Element container mouse leave event handler.
    */
    _mouseLeaveHandler() {
        const that = this;

        that.removeAttribute('hover');
        that._isElementHovered = false;

        if (that.dropDownOpenMode === 'auto' && !that.disabled && !that.readonly) {
            that._autoClose()
        }
    }

    /**
    * Mouse wheel event handler.
    */
    _mouseWheelHandler(event) {
        const that = this;

        if (that.disabled || that.readonly || (that.items && that.items.length === 0)) {
            return;
        }

        if (that.$dropDownContainer && !that.$dropDownContainer.hasClass('lw-visibility-hidden')) {
            return;
        }

        if (that.$.listBox) {
            event.preventDefault();
            that.$.listBox._handleKeyStrokes(event.deltaY > 0 ? 'ArrowDown' : 'ArrowUp');
        }
    }

    /**
     * Automatically closes the dropdown.
     */
    _autoClose() {
        const that = this;

        that._autoCloseTimeout = setTimeout(function () {
            if (!that._isElementHovered) {
                that.close();
            }

            clearTimeout(that._autoCloseTimeout);
        }.bind(that), that.autoCloseDelay);
    }

    /**
    * Validates the value of the property
    * @param {any} oldValue - the old value
    * @param {any} value - the new value
    */
    _propertyValidator(oldValue, newValue) {
        if (typeof newValue !== 'number' && typeof newValue !== 'string') {
            return oldValue;
        }

        return newValue;
    }

    /**
     * Resize handler - recalculate the size of the popup if the element is initialized with a different size.
     */
    _resizeHandler() {
        const that = this;

        if (that.resizeMode === 'none') {
            that._calculateDropDownSize();
            that._setDropDownSize();
        }
    }

    /**
    * Document select start event handler.
    */
    _selectStartHandler(event) {

        if (this._preventsSelectStart) {
            event.preventDefault();
        }
    }

    /**
     * Sets WAI-ARIA relations.
     */
    _setAriaRelations(initialization) {
        const that = this;
        let oldButton, newButton;

        if (that.dropDownOpenMode !== 'dropDownButton') {
            oldButton = that.$.dropDownButton;
            oldButton.setAttribute('aria-hidden', true);
            newButton = that;
            that.$.actionButton.removeAttribute('role');
        }
        else {
            oldButton = that;
            newButton = that.$.dropDownButton;
            newButton.removeAttribute('aria-hidden');
            that.$.actionButton.setAttribute('role', 'button');
        }

        that._ariaButton = newButton;

        newButton.setAttribute('role', 'button');
        newButton.setAttribute('aria-haspopup', 'listbox');
        newButton.setAttribute('aria-owns', that.$.listBox.id);
        newButton.setAttribute('aria-describedby', that.$.hint.id);

        if (that.label) {
            newButton.setAttribute('aria-labelledby', that.$.label.id);
        }
        else if (that.elementName === 'DropDownList') {
            newButton.setAttribute('aria-labelledby', that.$.actionButton.id);
        }

        oldButton.setAttribute('role', 'presentation');
        oldButton.removeAttribute('aria-owns');

        if (initialization) {
            newButton.setAttribute('aria-expanded', that.opened);
        }
        else {
            oldButton.removeAttribute('aria-describedby');
            oldButton.removeAttribute('aria-expanded');
            oldButton.removeAttribute('aria-haspopup');
            oldButton.removeAttribute('aria-labelledby');
        }
    }

    /**
    * Set DropDown Size.
    */
    _setDropDownSize() {
        const that = this;
        let dropDownHeight;

        if (!that._dropDownSize) {
            that._calculateDropDownSize();
        }

        ['dropDownMinWidth', 'dropDownMaxWidth'].forEach((name) => {
            that.$.dropDownContainer.style[name.replace('dropDown', '').replace(/^./, 'm')] = that[name] === 'initial' ? that.offsetWidth + 'px' :
                (that[name] ? parseFloat(that[name]) + (that[name].toString().endsWith('%') ? '%' : 'px') : null);
        });

        ['dropDownMinHeight', 'dropDownMaxHeight'].forEach((name) => {
            that.$.dropDownContainer.style[name.replace('dropDown', '').replace(/^./, 'm')] = that[name] ? parseFloat(that[name]) + (that[name].toString().endsWith('%') ? '%' : 'px') : null;
        });

        if (that.dropDownWidth) {
            if (that.dropDownWidth !== 'auto') {
                that.$.dropDownContainer.style.width = (that.dropDownWidth === 'initial' ? that.offsetWidth : parseFloat(that.dropDownWidth)) + 'px';
            }
            else {
                that.$.dropDownContainer.style.width = 'auto';
            }
        }
        else {
            that.$.dropDownContainer.style.width = that._dropDownSize.width === 'auto' ? 'auto' : (parseFloat(that._dropDownSize.width) || 0) + 'px';
        }

        if (that.dropDownHeight && that.dropDownHeight !== 'auto') {
            that.$.dropDownContainer.style.height = parseFloat(that.dropDownHeight) + ((that.dropDownHeight + '').indexOf('%') > -1 ? '%' : 'px');
        }
        else {
            if (that.$.listBox && (that._dropDownSize.height === 'auto' || that.dropDownHeight === 'auto')) {
                that.$.dropDownContainer.style.height = '';

                let verticalOffset = 2 * parseInt(window.getComputedStyle(that.$.listBox.$.itemsContainer).getPropertyValue('--lw-list-item-vertical-offset'));

                if (isNaN(verticalOffset)) {
                    verticalOffset = 6;
                }

                dropDownHeight = verticalOffset;

                if (that.$.listBox.items.length > 0) {
                    that.$.listBox.items.map(item => dropDownHeight += item.height || item.offsetHeight);
                }
                else {
                    dropDownHeight = that.$.listBox.$.placeholder.offsetHeight;
                }

                if (that.filterable) {
                    const filterInputContainer = that.$.listBox.$.filterInputContainer;

                    dropDownHeight += filterInputContainer.offsetHeight + filterInputContainer.offsetTop;
                }

                dropDownHeight = dropDownHeight + that._dropDownSize.paddingWidth + that._dropDownSize.borderWidth;

                that.$.dropDownContainer.style.height = dropDownHeight + 'px';
            }
            else {
                that.$.dropDownContainer.style.height = that._dropDownSize.height;
            }
        }

        if (that.$.listBox) {
            that.$.listBox._refreshLayout();

            if (dropDownHeight === undefined || !that.$.listBox.$) {
                return;
            }

            const vScrollOverlapHeight = Math.max(0, that._dropDownSize.minHeight - (dropDownHeight - that.$.listBox.$.horizontalScrollBar.offsetHeight));

            if (vScrollOverlapHeight) {
                that.$.dropDownContainer.style.height = (dropDownHeight + vScrollOverlapHeight) + 'px';
            }
        }
    }

    /**
     * Style changed event handler
     * @param {any} event
     */
    _styleChangedHandler(event) {
        const that = this;

        if (that.dropDownAppendTo && that.dropDownAppendTo.length > 0) {
            const styleProperties = event.detail.styleProperties,
                fontProperties = ['font-size', 'font-family', 'font-style', 'font-weight'];

            for (let s = 0; s < fontProperties.length; s++) {
                if (styleProperties[fontProperties[s]]) {
                    that.$.dropDownContainer.style[fontProperties[s]] = styleProperties[fontProperties[s]].value;
                }
            }

        }

        if (that._dropDownSize.height === 'auto') {
            that._setDropDownSize();
        }
    }

    /**
    * Checks for HTMLTemplate support and returns it's content.
    */
    _validateTemplate(template) {
        const that = this;

        if (!template) {
            return;
        }

        if (typeof template === 'function') {
            return;
        }

        if (!('content' in document.createElement('template'))) {
            that.error(that.localize('htmlTemplateNotSuported', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        if (!(template instanceof HTMLTemplateElement)) {
            template = document.getElementById(template);
        }

        if (template === null || !('content' in template)) {
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase(), property: 'tokenTemplate' }));
            return;
        }

        return template;
    }
});
