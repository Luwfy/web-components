
/**
 * Sortable custom element.
 */
LW('lw-sortable', class Sortable extends LW.ContentElement {

    // Sortable's properties.
    static get properties() {
        return {
            'dragMode': {
                value: 'item',
                allowedValues: ['item', 'handle'],
                type: 'string'
            },
            'handlePosition': {
                value: 'right',
                allowedValues: ['right', 'left', 'top', 'bottom'],
                type: 'string'
            },
            'handleVisibility': {
                value: 'hover',
                allowedValues: ['hover', 'visible'],
                type: 'string'
            },
            'items': {
                value: null,
                type: 'string?'
            },
            'mode': {
                value: 'vertical',
                allowedValues: ['horizontal', 'vertical'],
                type: 'string'
            }
        };
    }

    /**
     * Sortable's event listeners.
     */
    static get listeners() {
        return {
            'contextmenu': '_preventDefault',
            'container.down': '_containerDownHandler',
            'container.move': '_containerMoveHandler',
            'container.transitionend': '_containerTransitionendHandler',
            'document.dragstart': '_preventDefault',
            'document.move': '_documentMoveHandler',
            'document.selectstart': '_preventDefault',
            'document.up': '_documentUpHandler'
        };
    }

    /**
   * CSS files needed for the element (ShadowDOM)
   */
    static get styleUrls() {
        return [
            'lw.sortable.css'
        ]
    }

    /**
     * Sortable's HTML template.
     */
    template() {
        return '<div id="container" class="lw-sortable-container" role="presentation"><content></content></div>';
    }

    /**
    * Moves an item from one index to another.
    * @param {number} fromIndex The original index of the item.
    * @param {number} toIndex The index to move the item to.
    */
    move(fromIndex, toIndex) {
        const that = this,
            items = that._items;

        if (isNaN(fromIndex) || isNaN(toIndex) ||
            fromIndex === toIndex ||
            fromIndex < 0 || fromIndex >= items.length ||
            toIndex < 0 || toIndex >= items.length) {
            return;
        }

        const itemToMove = items[fromIndex],
            target = items[toIndex];

        if (fromIndex > toIndex) {
            that._itemsParent.insertBefore(itemToMove, target);
        }
        else {
            that._itemsParent.insertBefore(itemToMove, target.nextElementSibling);
        }

        that._getItems(false);
    }

    /**
     * Re-evaluates the items that can be sorted.
     */
    updateItems() {
        const that = this;

        that._items.forEach(item => item.classList.remove('lw-sortable-item'));
        that._getItems();
    }

    /**
    * Updates the Sortable when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'disabled':
                that._originallyDisabled = newValue;

                if (that._items.length < 2) {
                    that.disabled = true;
                }

                break;
            case 'items':
                that._itemsParent.classList.remove('lw-sortable-items-parent');
                that.updateItems();
                break;
            case 'mode':
                that._setSettingsObject();
                break;
        }
    }

    /**
     * Called when the element is ready
     */
    ready() {
        super.ready();

        const that = this;

        that.setAttribute('role', 'group');

        that._originallyDisabled = that.disabled;
        that._getItems();
        that._setSettingsObject();
    }

    /**
     * Gets items collection.
     */
    _getItems(addClass) {
        const that = this;

        if (that.items === null) {
            that._items = Array.from(that.$.container.children);
        }
        else {
            that._items = Array.from((that.shadowRoot || that).querySelectorAll('.lw-sortable-container ' + that.items));
        }

        if (addClass !== false) {
            that._items.forEach(child => child.classList.add('lw-sortable-item'));

            if (that._items.length) {
                that._itemsParent = that._items[0].parentElement;
                that._itemsParent.classList.add('lw-sortable-items-parent');

                if (that._items.length < 2) {
                    that.disabled = true;
                }
                else {
                    that.disabled = that._originallyDisabled;
                }
            }
        }
    }

    /**
     * Sets the "_settings" object.
     */
    _setSettingsObject() {
        const that = this;

        if (that.mode === 'vertical') {
            that._settings = {
                coordinateName: 'y',
                dimension: 'height',
                offsetDimension: 'offsetHeight',
                startOffset: 'top',
                endOffset: 'bottom'
            };
        }
        else {
            that._settings = {
                coordinateName: 'x',
                dimension: 'width',
                offsetDimension: 'offsetWidth',
                startOffset: 'left',
                endOffset: 'right'
            };
        }
    }

    /**
     * Prevents event's default functionality.
     */
    _preventDefault(event) {
        if (this._draggedItem) {
            event.preventDefault();
        }
    }

    /**
     * container down handler.
     */
    _containerDownHandler(event) {
        const that = this;

        if (that.disabled || that._draggedItem) {
            return;
        }

        const clickedItem = (that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target).closest('.lw-sortable-item');

        if (!clickedItem) {
            return;
        }

        const x = event.pageX - window.scrollX,
            y = event.pageY - window.scrollY,
            rect = clickedItem.getBoundingClientRect(),
            style = getComputedStyle(clickedItem),
            marginLeft = parseFloat(style.marginLeft),
            marginTop = parseFloat(style.marginTop);

        if (that.dragMode === 'handle' &&
            (event.originalEvent.target !== document.elementFromPoint(event.clientX, event.clientY) ||
                x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)) {
            // clicked on item itself, not on handle
            return;
        }

        window.getSelection().removeAllRanges();

        that._draggedItem = clickedItem;
        that._positionPlaceholder();
        that._getPositionedAncestorCoords();

        clickedItem.style.width = clickedItem.offsetWidth + 'px';
        clickedItem.style.height = clickedItem.offsetHeight + 'px';
        clickedItem.style.left = rect.left - marginLeft + ((- that._positionedAncestorCoords.x) || window.scrollX) + 'px';
        clickedItem.style.top = rect.top - marginTop + ((- that._positionedAncestorCoords.y) || window.scrollY) + 'px';
        clickedItem.classList.add('dragged');

        that._clickOffset = { x: event.pageX - rect.left + marginLeft, y: event.pageY - rect.top + marginTop };
        that._prevCoords = { x: x, y: y };

        that._getItemCoordinates();
    }

    /**
     * Adds and positions placeholder item.
     */
    _positionPlaceholder() {
        const that = this,
            draggedItem = that._draggedItem,
            style = getComputedStyle(draggedItem),
            placeholder = document.createElement('div');

        placeholder.className = 'lw-sortable-item placeholder lw-visibility-hidden';
        placeholder.style.width = draggedItem.offsetWidth + 'px';
        placeholder.style.height = draggedItem.offsetHeight + 'px';
        placeholder.style.minHeight = draggedItem.offsetHeight + 'px';
        placeholder.style.marginBottom = style.marginBottom;
        placeholder.style.marginLeft = style.marginLeft;
        placeholder.style.marginRight = style.marginRight;
        placeholder.style.marginTop = style.marginTop;
        that._itemsParent.insertBefore(placeholder, draggedItem.nextElementSibling);
        that._placeholder = placeholder;
    }

    /**
     * Gets the coordinates of the first non-statically positioned ancestor element.
     */
    _getPositionedAncestorCoords() {
        const that = this,
            positionedElement = that.offsetParent;

        that._positionedAncestorCoords = { x: 0, y: 0 };

        if (positionedElement !== document.body) {
            const positionedElementRect = positionedElement.getBoundingClientRect();

            that._positionedAncestorCoords = { x: positionedElementRect.left, y: positionedElementRect.top };
        }
    }

    /**
     * Gets item coordinates.
     */
    _getItemCoordinates() {
        const that = this,
            coordinates = [];

        that._items.forEach(function (item) {
            const rect = item.getBoundingClientRect();

            coordinates.push({
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height
            });
        });

        that._coordinates = coordinates;
    }

    /**
     * container move handler.
     */
    _containerMoveHandler(event) {
        if (this._draggedItem && event.originalEvent.type === 'touchmove') {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * container transitionend handler.
     */
    _containerTransitionendHandler(event) {
        const that = this;

        if (that._draggedItem && event.target.classList.contains('lw-sortable-item')) {
            if (event.target.classList.contains('returning')) {
                that._resolveDragging();
            }
            else {
                that._getItemCoordinates();
            }
        }
    }

    /**
     * document move handler.
     */
    _documentMoveHandler(event) {
        const that = this,
            draggedItem = that._draggedItem;

        if (!draggedItem) {
            return;
        }

        const sttngs = that._settings,
            newCoords = { x: event.pageX - window.scrollX, y: event.pageY - window.scrollY },
            coordinate = newCoords[sttngs.coordinateName];
        let direction;

        if (that._prevCoords.x === newCoords.x && that._prevCoords.y === newCoords.y) {
            return;
        }

        if (!that.hasAttribute('dragged')) {
            that.setAttribute('dragged', '');
        }

        if (that._prevCoords[sttngs.coordinateName] > coordinate) {
            direction = 'up';
        }
        else {
            direction = 'down';
        }

        that._prevCoords = newCoords;
        draggedItem.style.top = event.pageY - that._clickOffset.y + ((- that._positionedAncestorCoords.y) || window.scrollY) + 'px';
        draggedItem.style.left = event.pageX - that._clickOffset.x + ((- that._positionedAncestorCoords.x) || window.scrollX) + 'px';

        const draggedItemIndex = that._items.indexOf(draggedItem);
        let overItem;

        for (let i = 0; i < that._coordinates.length; i++) {
            const coordinateSet = that._coordinates[i];

            if (draggedItemIndex === i) {
                // ignore moving over dragged item itself
                continue;
            }

            if (direction === 'down' &&
                coordinate >= coordinateSet[sttngs.startOffset] + coordinateSet[sttngs.dimension] / 2 && coordinate <= coordinateSet[sttngs.endOffset]) {
                overItem = that._items[i];
                break;
            }
            else if (direction === 'up' &&
                coordinate >= coordinateSet[sttngs.startOffset] && coordinate <= coordinateSet[sttngs.startOffset] + coordinateSet[sttngs.dimension] / 2) {
                overItem = that._items[i];
                break;
            }
        }

        if (!overItem) {
            delete that._prevOverItem;
            return;
        }

        if (overItem !== that._prevOverItem) {
            that._prevOverItem = overItem;

            if (overItem[direction]) {
                return;
            }

            const overItemIndex = that._items.indexOf(overItem);

            that._overItem = overItem;

            if (overItem.up || overItem.down) {
                overItem.style.transform = null;
                delete overItem.up;
                delete overItem.down;
            }
            else {
                if (that.mode === 'horizontal' &&
                    (direction === 'up' && ((!that.rightToLeft && overItemIndex > draggedItemIndex) || (that.rightToLeft && overItemIndex < draggedItemIndex)) ||
                        direction === 'down' && ((!that.rightToLeft && overItemIndex < draggedItemIndex) || (that.rightToLeft && overItemIndex > draggedItemIndex)))) {
                    return;
                }
                else if (that.mode === 'vertical' && (direction === 'up' && overItemIndex > draggedItemIndex || direction === 'down' && overItemIndex < draggedItemIndex)) {
                    return;
                }

                const overItemStyle = getComputedStyle(overItem);

                overItem.style.transform = `translate${sttngs.coordinateName.toUpperCase()}(${
                    (direction === 'up' ? 1 : -1) * (overItem[sttngs.offsetDimension] +
                        parseFloat(overItemStyle['margin-' + sttngs.startOffset]) + parseFloat(overItemStyle['margin-' + sttngs.endOffset]))
                    }px)`;
                overItem[direction] = true;
            }
        }
    }

    /**
     * document up handler.
     */
    _documentUpHandler() {
        const that = this,
            draggedItem = that._draggedItem;

        if (!draggedItem) {
            return;
        }

        let overItem = that._overItem;

        if (overItem) {
            const draggedItemIndex = that._items.indexOf(draggedItem),
                overItemIndex = that._items.indexOf(overItem);

            if (draggedItemIndex < overItemIndex && overItem[that.rightToLeft && that.mode === 'horizontal' ? 'up' : 'down'] ||
                draggedItemIndex > overItemIndex && !overItem.down && !overItem.up) {

                that._insertBefore = overItem.nextElementSibling;

                overItem = that._insertBefore;

                if (overItem && overItem.nextElementSibling === draggedItem) {
                    overItem = that._placeholder;
                }
            }
            else if (draggedItemIndex > overItemIndex && overItem[that.rightToLeft && that.mode === 'horizontal' ? 'down' : 'up'] ||
                draggedItemIndex < overItemIndex && !overItem.down && !overItem.up) {
                that._insertBefore = overItem;

                if (!(draggedItemIndex > overItemIndex && overItem[that.rightToLeft && that.mode === 'horizontal' ? 'down' : 'up'])) {
                    overItem = overItem.previousElementSibling || overItem;
                }
            }
        }
        else {
            overItem = that._placeholder;
        }

        that._resolveDragging();
    }

    /**
     * Resolves dragging operation.
     */
    _resolveDragging() {
        const that = this,
            draggedItem = that._draggedItem,
            oldIndex = that._items.indexOf(draggedItem);
        let fireEvent = false;

        draggedItem.classList.remove('dragged', 'returning');
        that._removeInlineStyle();

        if (that._insertBefore !== undefined) {
            if (that._items.indexOf(that._insertBefore) !== oldIndex &&
                that._insertBefore !== that._placeholder[that.rightToLeft && that.mode === 'horizontal' ? 'previousElementSibling' : 'nextElementSibling']) {
                that._itemsParent.insertBefore(draggedItem, that._insertBefore);
                delete that._insertBefore;
                fireEvent = true;
            }
        }

        that._itemsParent.removeChild(that._placeholder);

        delete that._clickOffset;
        delete that._draggedItem;
        delete that._overItem;
        delete that._placeholder;
        delete that._prevCoords;

        that.removeAttribute('dragged');

        if (fireEvent) {
            that._getItems(false);
            that.$.fireEvent('dragEnd', { oldIndex: oldIndex, newIndex: that._items.indexOf(draggedItem) });
        }
    }

    /**
     * Removes inline styles applied to items.
     */
    _removeInlineStyle() {
        const that = this;

        that._items.forEach(function (item) {
            item.style = null;
            item.style.transition = 'none';
            delete item.up;
            delete item.down;
        });

        setTimeout(function () {
            that._items.forEach(item => item.style.transition = null);
        }, 50);
    }
});
