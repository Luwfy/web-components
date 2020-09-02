
LW('lw-splitter-item', class SplitterItem extends LW.ContentElement {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'collapsed': {
                value: false,
                type: 'boolean'
            },
            'collapsible': {
                value: false,
                type: 'boolean'
            },
            'locked': {
                value: false,
                type: 'boolean'
            },
            'max': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'min': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            },
            'size': {
                value: '',
                type: 'any',
                validator: '_propertyValidator'
            }
        }
    }

    /**
    * Disables ShadowDOM for the splitter items
    */
    get enableShadowDOM() {
        return false;
    }

    /**
    * Element's template
    */
    template() {
        return `<div id="container" role="presentation">
                    <div class="lw-content" id="content" inner-h-t-m-l="[[innerHTML]]" role="presentation">
                        <content></content>
                    </div>
                </div>`;
    }

    /**
    * Element's event binding
    */
    static get listeners() {
        return {
            'mouseenter': '_mouseEventsHandler',
            'mouseleave': '_mouseEventsHandler',
            'styleChanged': '_styleChangedEventHandler'
        }
    }

    /**
   * Updates the SplitterItem when a property is  changed.
   * @param {string} propertyName The name of the property.
   * @param {number/string} oldValue The previously entered value.
   * @param {number/string} newValue The new entered value.
   */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'collapsed':
                that._ignorePropertyValue = true;
                newValue ? that.collapse() : that.expand();
                break;
            case 'collapsible':
                that._updateNearSplitterBars();
                break;
            case 'size':
            case 'min':
            case 'max':
                that._setSize(propertyName, newValue);
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
     * Called when the element is attached to the DOM
     */
    attached() {
        super.attached();

        const that = this;

        if (!that._sizeLimits) {
            that._sizeLimits = {};
        }

        const computedStyle = getComputedStyle(that);

        if (!that.min) {
            that._sizeLimits.minWidth = parseFloat(computedStyle.getPropertyValue('min-width')) || 0;
            that._sizeLimits.minHeight = parseFloat(computedStyle.getPropertyValue('min-height')) || 0;
        }

        if (!that.max) {
            that._sizeLimits.maxWidth = parseFloat(computedStyle.getPropertyValue('max-width')) || 0;
            that._sizeLimits.maxHeight = parseFloat(computedStyle.getPropertyValue('max-height')) || 0;
        }
    }

    /**
     * Called when the element is detached from the DOM
     */
    detached() {
        super.detached();

        const that = this;

        that.$.removeClass('animate');
    }

    /**
   * Appends a node to the splitter item.
   */
    appendChild(node) {
        const that = this;

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'appendChild', node: 'node' }));
            return
        }

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        that.$.content.appendChild(node);
    }

    /**
     * Collapses the item
     */
    collapse(far) {
        const that = this;

        if (!that.collapsible) {
            that.collapsed = false;
            return;
        }

        if (that._ignorePropertyValue || !that.collapsed) {
            const ownerElement = that.closest('lw-splitter') || (that.getRootNode() && that.getRootNode().host ? that.getRootNode().host.closest('lw-splitter') : undefined);

            if (!ownerElement) {
                return;
            }

            const itemIndex = ownerElement._items.indexOf(that);

            if (itemIndex === ownerElement._items.length - 1) {
                far = true;
            }
            else if (itemIndex === 0) {
                far = false;
            }

            const direction = far ? -1 : 1;
            let neighbourItemIndex = itemIndex + direction,
                neighbourItem = ownerElement._items[neighbourItemIndex];

            while (neighbourItem) {
                if (!neighbourItem.collapsed) {
                    break;
                }

                neighbourItemIndex += direction;
                neighbourItem = ownerElement._items[neighbourItemIndex];
            }

            if (!neighbourItem) {
                that.collapsed = false;
                return;
            }

            delete that._ignorePropertyValue;

            //Store the size before collapsing
            if (!that._sizeBeforeCollapse) {
                that._sizeBeforeCollapse = that[ownerElement._measurements.size];
            }

            if (!neighbourItem._sizeBeforeCollapse) {
                neighbourItem._sizeBeforeCollapse = neighbourItem[ownerElement._measurements.size];
            }

            let splitterBar;

            if (that.previousElementSibling instanceof LW.SplitterBar) {
                splitterBar = that.previousElementSibling;
            }
            else if (that.nextElementSibling instanceof LW.SplitterBar) {
                splitterBar = that.nextElementSibling;
            }

            const totalSpace = neighbourItem[ownerElement._measurements.size] + that[ownerElement._measurements.size],
                minSize = splitterBar ? splitterBar[ownerElement._measurements.size] : that._sizeLimits[ownerElement._measurements.minDimension],
                spaceAvailable = totalSpace - minSize;

            if (totalSpace && spaceAvailable < minSize) {
                that.collapsed = false;
                return;
            }

            //Add animation class
            if (ownerElement.hasAnimation && !ownerElement._isInitializing) {
                if (!that.style[ownerElement._measurements.dimension]) {
                    that.style[ownerElement._measurements.dimension] = that[ownerElement._measurements.size] + 'px';
                }

                that.$.addClass('animate');
                neighbourItem.$.addClass('animate');

                that.addEventListener('transitionend', that._transitionEndHandler, { once: true });
                that.addEventListener('transitioncancel', that._transitionEndHandler, { once: true });
                neighbourItem.addEventListener('transitionend', that._transitionEndHandler, { once: true });
                neighbourItem.addEventListener('transitioncancel', that._transitionEndHandler, { once: true });
            }

            if (!that._paddings) {
                const computedStyle = getComputedStyle(that);

                that._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position)) || 0) +
                    (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position2)) || 0);
            }

            if (neighbourItem._sizeBeforeCollapse !== undefined) {
                neighbourItem._sizeBeforeCollapse = neighbourItem._sizeBeforeCollapse + that._sizeBeforeCollapse;
            }

            if (neighbourItem._sizeLimits && neighbourItem._sizeLimits[ownerElement._measurements.maxDimension] &&
                totalSpace > neighbourItem._sizeLimits[ownerElement._measurements.maxDimension]) {
                neighbourItem._sizeLimits.ignoreUpdate = true;

                if (neighbourItem._sizeBeforeCollapse) {
                    neighbourItem.style[ownerElement._measurements.maxDimension] = neighbourItem._sizeBeforeCollapse + 'px';
                }
                else {
                    neighbourItem.style[ownerElement._measurements.maxDimension] = '';
                }
            }

            //Reset the size property
            neighbourItem.set('size', '');

            if (neighbourItem._sizeBeforeCollapse) {
                neighbourItem.style[ownerElement._measurements.dimension] = neighbourItem._sizeBeforeCollapse + 'px';
            }

            that.style[ownerElement._measurements.dimension] = that.style[ownerElement._measurements.minDimension] = '0';
            that.style.padding = '0'; //Make sure no paddings interferes with the size of the collapsed item
            that._neighbourItem = neighbourItem;

            that.collapsed = true;
            ownerElement.$.fireEvent('collapse', { itemIndex: ownerElement._items.indexOf(that) });

            if (far) {
                that.previousElementSibling.itemCollapsed = true;
                that.previousElementSibling.showFarButton = !(that.previousElementSibling.showNearButton = false);
            }
            else {
                that.nextElementSibling.itemCollapsed = true;
                that.nextElementSibling.showNearButton = !(that.nextElementSibling.showFarButton = false);
            }
        }
    }

    /**
    * Expands a splitter item
    */
    expand() {
        const that = this;

        if (that._ignorePropertyValue || that.collapsed) {
            const ownerElement = that.closest('lw-splitter') || (that.getRootNode() && that.getRootNode().host ? that.getRootNode().host.closest('lw-splitter') : undefined);

            if (!ownerElement) {
                that.collapsed = true;
                return;
            }

            if (!that._neighbourItem) {
                that.collapsed = true;
                return;
            }

            delete that._ignorePropertyValue;

            if (!that._neighbourItem._ignorePropertyValue && that._neighbourItem.collapsed) {
                let neighbourItemIndex = ownerElement._items.indexOf(that._neighbourItem);
                const direction = ownerElement._items.indexOf(that) > ownerElement._items.indexOf(that._neighbourItem) ? -1 : 1;

                that._neighbourItem = ownerElement._items[neighbourItemIndex];

                while (that._neighbourItem) {
                    if (!that._neighbourItem.collapsed) {
                        break;
                    }

                    neighbourItemIndex += direction;
                    that._neighbourItem = ownerElement._items[neighbourItemIndex];
                }
            }

            if (!that._neighbourItem) {
                that.collapsed = true;
                return;
            }

            if (that.min) {
                that._setSize('min', that.min, true);
            }

            const totalSpace = that._neighbourItem._sizeBeforeCollapse,
                minSize = that._sizeLimits[ownerElement._measurements.minDimension],
                neighbourItemMin = that._neighbourItem._sizeLimits[ownerElement._measurements.minDimension],
                spaceAvailable = totalSpace - minSize;

            if (totalSpace && spaceAvailable < neighbourItemMin) {
                that.collapsed = true;
                return;
            }

            if (!that._neighbourItem._paddings) {
                const computedStyle = getComputedStyle(that._neighbourItem);

                that._neighbourItem._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position)) || 0) +
                    (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position2)) || 0);
            }

            if (!that._paddings) {
                const computedStyle = getComputedStyle(that);

                that._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position)) || 0) +
                    (parseFloat(computedStyle.getPropertyValue('padding-' + ownerElement._measurements.position2)) || 0);
            }

            if ((that.size + '').indexOf('%') > -1 && (!that._sizeBeforeCollapse || that._sizeBeforeCollapse === 0) && that._neighbourItem._sizeBeforeCollapse) {
                let totalItemSize = 0;

                ownerElement._items.map(item => totalItemSize += !item.collapsed ?
                    (item.style[ownerElement._measurements.dimension] && item.style[ownerElement._measurements.dimension].indexOf('%') < -1 && item._sizeBeforeCollapse ?
                        item._sizeBeforeCollapse : item.getBoundingClientRect()[ownerElement._measurements.dimension]) : 0);
                that._sizeBeforeCollapse = totalItemSize * parseFloat(that.size) / 100;
            }

            const previousSize = Math.min(Math.max(minSize, that._sizeBeforeCollapse), totalSpace - that._neighbourItem._paddings - that._paddings - neighbourItemMin);

            if (previousSize < 0) {
                that.collapsed = true;
                return;
            }

            if (that.min) {
                that.style[ownerElement._measurements.minDimension] = 0;
            }

            //Add animation class
            if (that.hasAnimation && !ownerElement._isInitializing) {
                that.$.addClass('animate');
                that._neighbourItem.$.addClass('animate');

                that.addEventListener('transitionend', that._transitionEndHandler, { once: true });
                that.addEventListener('transitioncancel', that._transitionEndHandler, { once: true });
                that._neighbourItem.addEventListener('transitionend', that._transitionEndHandler, { once: true });
                that._neighbourItem.addEventListener('transitioncancel', that._transitionEndHandler, { once: true });
            }

            //Restore the size before collapsing
            that.style.padding = '';

            if (that.min) {
                that.style[ownerElement._measurements.minDimension] = that._sizeLimits[ownerElement._measurements.minDimension] + 'px';
            }

            that.style[ownerElement._measurements.dimension] = (that._sizeBeforeCollapse = previousSize) + 'px';

            that._neighbourItem.style[ownerElement._measurements.dimension] =
                (that._neighbourItem._sizeBeforeCollapse = Math.max(that._neighbourItem._sizeLimits[ownerElement._measurements.minDimension], totalSpace - previousSize)) + 'px';

            if (that._neighbourItem._sizeLimits[ownerElement._measurements.maxDimension]) {
                that._neighbourItem.style[ownerElement._measurements.maxDimension] = that._neighbourItem._sizeLimits[ownerElement._measurements.maxDimension] + 'px';
            }

            that.collapsed = false;
            ownerElement.$.fireEvent('expand', { itemIndex: ownerElement._items.indexOf(that) });

            if (ownerElement._items.indexOf(that) > ownerElement._items.indexOf(that._neighbourItem)) {
                that.previousElementSibling.itemCollapsed = false;
                that.previousElementSibling.showNearButton = that._neighbourItem.collapsible;
            }
            else {
                that.nextElementSibling.itemCollapsed = false;
                that.nextElementSibling.showFarButton = that._neighbourItem.collapsible;
            }

            const previousElement = ownerElement._items[ownerElement._items.indexOf(that) - 1],
                nextElement = ownerElement._items[ownerElement._items.indexOf(that) + 1];

            if (previousElement) {
                const previousSplitterBar = previousElement.nextElementSibling;

                if (previousSplitterBar && previousSplitterBar instanceof LW.SplitterBar) {
                    if (!previousElement.collapsed) {
                        previousSplitterBar.itemCollapsed = false;
                        previousSplitterBar.showNearButton = previousElement.collapsible;
                        previousSplitterBar.showFarButton = that.collapsible;
                    }
                    else {
                        previousSplitterBar.showNearButton = that.collapsible;
                    }
                }
            }

            if (nextElement) {
                const nextSplitterBar = nextElement.previousElementSibling;

                if (nextSplitterBar && nextSplitterBar instanceof LW.SplitterBar) {
                    if (!nextElement.collapsed) {
                        nextSplitterBar.itemCollapsed = false;
                        nextSplitterBar.showNearButton = that.collapsible;
                        nextSplitterBar.showFarButton = nextElement.collapsible;
                    }
                    else {
                        nextSplitterBar.showFarButton = nextElement.collapsed;
                    }
                }
            }

            delete that._neighbourItem;
        }
    }

    /**
  * Inserts a node before another node inside the splitter item.
  */
    insertBefore(node, referenceNode) {
        const that = this;

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore', node: 'node' }));
            return
        }

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.insertBefore.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        that.$.content.insertBefore(node, referenceNode || null);
    }

    /**
    * Locks a splitter item so it's size can't change.
    */
    lock() {
        const that = this;

        that.locked = true;
    }

    /**
    * Unlocks a splitter item
    */
    unlock() {
        const that = this;

        that.locked = false;
    }

    /**
    * Invoked when an instance of custom element is attached to the DOM for the first time.
    */
    ready() {
        super.ready();

    }

    render() {
        const that = this,
            ownerElement = that.closest('lw-splitter'),
            isOwnerReady = ownerElement && ownerElement.isCompleted;

        that.setAttribute('role', 'region');

        that._sizeLimits = {};

        let isPercentage = typeof that.min === 'string' && that.min.indexOf('%') > -1;
        const min = isNaN(parseFloat(that.min)) ? 0 : parseFloat(that.min),
            max = isNaN(parseFloat(that.max)) ? 0 : parseFloat(that.max);

        that._sizeLimits.minWidth = that._sizeLimits.minHeight = isPercentage && isOwnerReady ? min * ownerElement[ownerElement._measurements.size] / 100 : min;

        isPercentage = typeof that.max === 'string' && that.max.indexOf('%') > -1;

        that._sizeLimits.maxWidth = that._sizeLimits.maxHeight = isPercentage && isOwnerReady ? max * ownerElement[ownerElement._measurements.size] / 100 : max;

        if (that.size) {
            isPercentage = typeof that.size === 'string' && that.size.indexOf('%') > -1;

            const size = that.size === 'auto' ? that.size : isNaN(parseFloat(that.size)) ? 0 : parseFloat(that.size) + (isPercentage ? '%' : 'px');

            isOwnerReady ? that.style[ownerElement._measurements.dimension] = size : that.style.width = that.style.height = size;
        }

        if (that.min) {
            that._setSize('min', that.min);
        }

        if (that.max) {
            that._setSize('max', that.max);
        }


        that._updateNearSplitterBars();

        that.checkLicense();
        super.render();
    }

    /**
    * Removes a child from the Splitter item.
    */
    removeChild(node) {
        const that = this;

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        that.$.content.removeChild(node);
    }

    /**
     * Expands regardless of the neighbour item. Force expand
     */
    _expand() {
        const that = this;

        if (that._neighbourItem && that._neighbourItem.parentElement) {
            that.expand();
            return;
        }

        const ownerElement = that.closest('lw-splitter');

        if (!ownerElement) {
            return;
        }

        delete that._neighbourItem;

        that.collapsed = false;
        ownerElement.$.fireEvent('expand', { itemIndex: ownerElement._items.indexOf(that) });

        that.style[ownerElement._measurements.minDimension] = that.min ? that._sizeLimits[ownerElement._measurements.minDimension] + 'px' : '';
        that.style[ownerElement._measurements.dimension] = that._sizeBeforeCollapse + 'px';

        if (ownerElement._items.length < 2) {
            return;
        }

        if (that.previousElementSibling instanceof LW.SplitterBar) {
            that.previousElementSibling.itemCollapsed = false;
            that.previousElementSibling.showNearButton = ownerElement._items[ownerElement._items.indexOf(that) - 1].collapsible;
        }
    }

    /**
     * Mouse Enter/Leave event handler
     * @param {any} event
     */
    _mouseEventsHandler(event) {
        const that = this,
            ownerElement = that.closest('lw-splitter') || that.getRootNode().host;

        if (ownerElement && !ownerElement.disabled || LW.Utilities.Core.isMobile) {
            event.type === 'mouseenter' ? this.setAttribute('hover', '') : this.removeAttribute('hover');
        }
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
     * Set the width/height/min/max of the element
     */
    _setSize(propertyName, newValue, noSizeValidation) {
        const that = this;

        if (that.isCompleted && that.locked) {
            return;
        }

        const ownerElement = that.closest('lw-splitter');

        if (!ownerElement) {
            return;
        }

        if (!ownerElement.isCompleted) {
            ownerElement.whenReady(() => that._setSize(propertyName, newValue));
            return;
        }

        const isPercentage = typeof newValue === 'string' && newValue.indexOf('%') > -1,
            ownerSize = function () {
                const bars = ownerElement.bars;
                let splitterBarsSize = 0;

                for (let b = 0; b < bars.length; b++) {
                    splitterBarsSize += bars[b][ownerElement._measurements.size];
                }

                return ownerElement.$.container[ownerElement._measurements.size] - splitterBarsSize;
            }(),
            toPercentages = (val) => val * 100 / ownerSize;

        newValue = isNaN(parseFloat(newValue)) ? '' : parseFloat(newValue);

        if (!that._sizeLimits) {
            that._sizeLimits = {};
        }

        switch (propertyName) {
            case 'size': {
                const oldSize = that[ownerElement._measurements.size];

                if (arguments[1] === 'auto' || !arguments[1]) {
                    that.style[ownerElement._measurements.dimension] = arguments[1];
                    that._sizeBeforeCollapse = that[ownerElement._measurements.size];
                }
                else {
                    if (isPercentage) {
                        that.style[ownerElement._measurements.dimension] = newValue + '%';
                        that._sizeBeforeCollapse = newValue * ownerSize / 100;
                    }
                    else {
                        that.style[ownerElement._measurements.dimension] = (that._sizeBeforeCollapse = newValue || 0) + 'px';
                    }
                }

                that._validateSize();

                const sizeDifference = oldSize - that._sizeBeforeCollapse;

                if (that._originalSize) {
                    that._originalSize = isPercentage ? newValue + '%' : that._sizeBeforeCollapse;
                }

                if (ownerElement.hasAttribute('orientation-change')) {
                    break;
                }

                const lastSplitterItem = ownerElement._items[ownerElement._items.length - 1];

                if (that === lastSplitterItem) {
                    //Get the best fit item
                    let newLastItem = ownerElement._items.find(item => item !== that && !item.collapsed && !item.locked && !item.size)

                    //Get the first possible item
                    if (!newLastItem) {
                        for (let i = Math.max(0, ownerElement._items.length - 2); i >= 0; i--) {
                            if (!ownerElement._items[i].collapsed && !ownerElement._items[i].locked && ownerElement._items[i] !== that) {
                                newLastItem = ownerElement._items[i];
                                break;
                            }
                        }
                    }

                    if (newLastItem) {
                        newLastItem.style[ownerElement._measurements.dimension] = (newLastItem._sizeBeforeCollapse =
                            Math.max(0, newLastItem[ownerElement._measurements.size] + sizeDifference)) + 'px';
                    }
                }

                break;
            }
            case 'min':
                newValue = isPercentage ? newValue * ownerSize / 100 : newValue;

                that._sizeLimits['minWidth'] = that._sizeLimits['minHeight'] = newValue;
                that.style[ownerElement._measurements.minDimension] = that.collapsed || !newValue ? '' : isPercentage ? (toPercentages(newValue) + '%') : (newValue + 'px');
                that.style['min' + ownerElement._measurements.restricredDimension] = '';
                that._validateSize();

                if (!newValue && !ownerElement._noNeighbourValidation) {
                    ownerElement._validateNeighbourSizeLimits(that);
                }

                if (that.size) {
                    that._setSize('size', that.size, noSizeValidation);
                    return;
                }

                break;
            case 'max':
                that._sizeLimits['maxWidth'] = that._sizeLimits['maxHeight'] = isPercentage ? newValue * ownerSize / 100 : newValue;
                that.style[ownerElement._measurements.maxDimension] = newValue ? (isPercentage ? (toPercentages(newValue) + '%') : (newValue + 'px')) : '';
                that.style['max' + ownerElement._measurements.restricredDimension] = '';
                that._validateSize();

                if (!newValue && !ownerElement._noNeighbourValidation) {
                    ownerElement._validateNeighbourSizeLimits(that);
                }

                if (that.size) {
                    that._setSize('size', that.size, noSizeValidation);
                    return;
                }

                break;
        }

        if (!noSizeValidation && !ownerElement._noItemSizeValidation) {
            ownerElement._validateItemSize(true);
        }
    }

    /**
     * Validates the size/min/max of the item agains each other
     * @param {any} property - the name of the proeprty that is being applied
     * @param {any} newValue - the new value of the property that is being applied
     */
    _validateSize() {
        const that = this,
            ownerElement = that.closest('lw-splitter');

        if (that.collapsed && !ownerElement) {
            return;
        }

        const measurements = ownerElement._measurements,
            isPercentage = (val) => typeof val === 'string' && val.indexOf('%') > -1,
            sizeInPxls = that._sizeBeforeCollapse ? that._sizeBeforeCollapse : that.getBoundingClientRect()[measurements.dimension];

        function validateSize(prop) {
            const dimension = prop + 'Dimension',
                limit = that.style[measurements[dimension]],
                limitInPxls = that._sizeLimits[measurements[dimension]];

            if ((prop === 'min' && sizeInPxls < limitInPxls) || (prop === 'max' && sizeInPxls > limitInPxls)) {
                that.style[measurements.dimension] = isPercentage(limit) ? limit : (limitInPxls + 'px');
                that._sizeBeforeCollapse = limitInPxls;
            }
        }

        if (that.min) {
            validateSize('min');
        }

        if (that.max) {
            validateSize('max');
        }
    }

    /**
     * StyleChanged event handler
     */
    _styleChangedEventHandler(event) {
        const that = this;

        if (that.locked) {
            return;
        }

        if (that._sizeLimits.ignoreUpdate) {
            delete that._sizeLimits.ignoreUpdate;
            return;
        }

        if (that.collapsed) {
            return;
        }

        const ownerElement = that.closest('lw-splitter');
        let value;

        if (event.detail.styleProperties['min-width']) {
            value = event.detail.styleProperties['min-width'][ownerElement && ownerElement.orientation === 'horizontal' ? 'oldValue' : 'value'];
            that._sizeLimits['minWidth'] = (parseFloat(value) || 0) * (value && value.indexOf('%') > -1 ? ownerElement[ownerElement._measurements.size] / 100 : 1);
        }
        else if (event.detail.styleProperties['max-width']) {
            value = event.detail.styleProperties['max-width'][ownerElement && ownerElement.orientation === 'horizontal' ? 'oldValue' : 'value'];
            that._sizeLimits['maxWidth'] = (parseFloat(value) || 0) * (value && value.indexOf('%') > -1 ? ownerElement[ownerElement._measurements.size] / 100 : 1);
        }
        else if (event.detail.styleProperties['min-height']) {
            value = event.detail.styleProperties['min-height'][ownerElement && ownerElement.orientation === 'horizontal' ? 'value' : 'oldValue'];
            that._sizeLimits['minHeight'] = (parseFloat(value) || 0) * (value && value.indexOf('%') > -1 ? ownerElement[ownerElement._measurements.size] / 100 : 1);
        }
        else if (event.detail.styleProperties['max-height']) {
            value = event.detail.styleProperties['max-height'][ownerElement && ownerElement.orientation === 'horizontal' ? 'value' : 'oldValue'];
            that._sizeLimits['maxHeight'] = (parseFloat(value) || 0) * (value && value.indexOf('%') > -1 ? ownerElement[ownerElement._measurements.size] / 100 : 1);
        }
    }

    /**
     * Transitionend Event Handler
     */
    _transitionEndHandler() {
        const that = this;

        if (!that.isCompleted && that.$.hasClass('animate')) {
            return;
        }

        that.$.removeClass('animate');

        if (that._neighbourItem && that._neighbourItem.$.hasClass('animate')) {
            that._neighbourItem.$.removeClass('animate');
        }

        if ((that.size + '').indexOf('%') > -1 || (that._neighbourItem && (that._neighbourItem.size + '').indexOf('%') > -1)) {
            const ownerElement = (that.shadowRoot && that.getRootNode() ? that.getRootNode().host : null) || that.closest('lw-splitter');

            ownerElement._validateItemSize();
        }
    }

    /**
     * Show/Hide the arrows of the neighbour splitter bars
     */
    _updateNearSplitterBars() {
        const that = this;

        if (that.previousElementSibling instanceof LW.SplitterBar) {
            that.previousElementSibling.showFarButton = that.collapsible;
        }

        if (that.nextElementSibling instanceof LW.SplitterBar) {
            that.nextElementSibling.showNearButton = that.collapsible;
        }
    }
});

LW('lw-splitter-bar', class SplitterBar extends LW.BaseElement {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'showNearButton': {
                value: false,
                type: 'boolean'
            },
            'showFarButton': {
                value: false,
                type: 'boolean'
            },
            'itemCollapsed': {
                value: false,
                type: 'boolean'
            },
            'locked': {
                value: false,
                type: 'boolean'
            }
        }
    }

    /**
    * Disables ShadowDOM for the splitter bars
    */
    get enableShadowDOM() {
        return false;
    }

    /**
    * Element's template
    */
    template() {
        return `<div id="container" role="presentation">
                    <div class="lw-splitter-far-collapse-button" id="farCollapseButton" role="button" aria-label="Collapse next">
                        <span id="arrowNear" class="lw-arrow" aria-hidden="true"></span>
                    </div>
                    <div class="lw-splitter-resize-button" id="resizeButton" aria-hidden="true">
                        <span></span>
                    </div>
                    <div class="lw-splitter-near-collapse-button" id="nearCollapseButton" role="button" aria-label="Collapse previous">
                        <span id="arrowFar" class="lw-arrow" aria-hidden="true"></span>
                    </div>
                </div>`;
    }

    /**
    * Element's event binding
    */
    static get listeners() {
        return {
            'mouseenter': '_mouseEventsHandler',
            'mouseleave': '_mouseEventsHandler',
            'mouseover': '_mouseEventsHandler',
            'mouseout': '_mouseEventsHandler',
            'focus': '_focusEventHandler',
            'blur': '_focusEventHandler'
        }
    }

    /**
   * Updates the SplitterBar when a property is  changed.
   * @param {string} propertyName The name of the property.
   * @param {number/string} oldValue The previously entered value.
   * @param {number/string} newValue The new entered value.
   */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'unfocusable':
                that._setFocusable();
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
  * Invoked when an instance of custom element is attached to the DOM for the first time.
  */
    ready() {
        super.ready();

        const that = this;

        that.setAttribute('role', 'separator');
        that.setAttribute('aria-label', 'Resize');

        that._setFocusable();
    }

    /**
     * Hides the Splitter Bar
     */
    hide() {
        const that = this,
            ownerElement = that.closest('lw-splitter');

        that.$.addClass('lw-hidden');

        if (ownerElement) {
            const ownerItems = ownerElement.items;

            if (ownerElement.hasAnimation) {
                let animatedItem;

                for (let i = 0; i < ownerItems.length; i++) {
                    if (ownerItems[i].$.hasClass('animate')) {
                        animatedItem = true;
                        ownerItems[i].addEventListener('transitionend', function () {
                            that.closest('lw-splitter')._autoFitItems();
                        }, { once: true });
                    }
                }

                if (animatedItem) {
                    return;
                }
            }

            ownerElement._autoFitItems();
        }
    }

    /**
     * Shows the Splitter Bar
     */
    show() {
        const that = this,
            ownerElement = that.closest('lw-splitter');

        that.$.removeClass('lw-hidden');

        if (ownerElement) {
            const ownerItems = ownerElement.items;

            if (ownerElement.hasAnimation) {
                let animatedItem;

                for (let i = 0; i < ownerItems.length; i++) {
                    if (ownerItems[i].$.hasClass('animate')) {
                        animatedItem = true;
                        ownerItems[i].addEventListener('transitionend', function () {
                            that.closest('lw-splitter')._validateItemSize();
                        }, { once: true });
                    }
                }

                if (animatedItem) {
                    return;
                }
            }

            ownerElement._validateItemSize();
        }
    }

    /**
    * Locks a splitter bar so it can't be dragged
    */
    lock() {
        const that = this;

        that.locked = that.unfocusable = true;

        if (that.showNearButton || that.showFarButton) {
            return;
        }

        that._setFocusable();
    }

    /**
    * Unlocks a splitter bar
    */
    unlock() {
        const that = this;

        that.locked = that.unfocusable = false;
        that._setFocusable();
    }

    /**
     * Focus/Blur event handler
     * @param {any} event
     */
    _focusEventHandler(event) {
        event.type === 'focus' ? this.setAttribute('focus', '') : this.removeAttribute('focus');
    }

    /**
    * Sets tab index
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.removeAttribute('tabindex');
            return;
        }

        that.tabIndex = that.tabIndex > 0 ? that.tabIndex : 0;
    }

    /**
     * MouseEnter and MouseLeave event handler for the hover state of the Splitter Bar
     */
    _handleHoveredState(ownerElement, type) {
        const that = this;

        switch (type) {
            case 'mouseenter':
                if (!ownerElement._getTargetItem(that, 'previousElementSibling') || !(ownerElement.resizeMode === 'adjacent' ?
                    ownerElement._getTargetItem(that, 'nextElementSibling') : ownerElement._getTargetItem(that, 'previousElementSibling', true))) {
                    return;
                }

                that.setAttribute('hover', '');
                break;
            case 'mouseleave': {
                that.removeAttribute('hover');
                break;
            }
        }
    }

    /**
    * Mouse Over/Out event handler
    * @param {any} event
    */
    _mouseEventsHandler(event) {
        const that = this,
            ownerElement = that.closest('lw-splitter') || that.getRootNode().host;

        if (ownerElement && ownerElement.disabled || LW.Utilities.Core.isMobile) {
            return;
        }

        if (event.type === 'mouseenter' || event.type === 'mouseleave') {
            that._handleHoveredState(ownerElement, event.type);
            return;
        }

        if (event.target.closest('.lw-splitter-far-collapse-button') === that.$.farCollapseButton) {
            event.type === 'mouseover' ? that.$.farCollapseButton.setAttribute('hover', '') : that.$.farCollapseButton.removeAttribute('hover');
            return;
        }

        if (event.target.closest('.lw-splitter-near-collapse-button') === that.$.nearCollapseButton) {
            event.type === 'mouseover' ? that.$.nearCollapseButton.setAttribute('hover', '') : that.$.nearCollapseButton.removeAttribute('hover');
            return;
        }

        if (event.target.closest('.lw-splitter-resize-button') === that.$.resizeButton) {
            event.type === 'mouseover' ? that.$.resizeButton.setAttribute('hover', '') : that.$.resizeButton.removeAttribute('hover');
        }
    }
});

LW('lw-splitter', class Splitter extends LW.ContentElement {

    /**
    * Splitter's properties
    */
    static get properties() {
        return {
            'autoFitMode': {
                allowedValues: ['end', 'proportional', 'overflow'],
                value: 'proportional',
                type: 'string'
            },
            'dataSource': {
                value: null,
                type: 'object?',
                reflectToAttribute: false
            },
            'orientation': {
                allowedValues: ['horizontal', 'vertical'],
                value: 'vertical',
                type: 'string'
            },
            'keepProportionsOnResize': {
                value: false,
                type: 'boolean'
            },
            'resizeMode': {
                allowedValues: ['none', 'adjacent', 'end', 'proportional'],
                value: 'adjacent',
                type: 'string'
            },
            'resizeStep': {
                value: 5,
                type: 'number'
            },
            'liveResize': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidIndex': '{{elementType}}: "{{method}}" method accepts an index of type number.',
                        'indexOutOfBound': '{{elementType}}: Out of bound index/indexes in "{{method}}" method.',
                        'invalidNode': '{{elementType}}: "{{method}}" method accepts an object or an array of objects as it\'s second parameter.',
                        'invalidSettings': '{{elementType}}: "{{method}}" method accepts a string or an object as it\'s second parameter.',
                        'invalidType': '{{elementType}}: "{{propertyName}}" must be of type string or number.'
                    }
                },
                type: 'object'
            }
        };
    }

    /**
    * Splitter's event listeners
    */

    static get listeners() {
        return {
            'focus': '_focusHandler',
            'blur': '_focusHandler',
            'down': '_downHandler',
            'move': '_moveHandler',
            'document.dragstart': '_dragStartHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'keydown': '_keyDownHandler',
            'resize': '_resizeEventHandler'
        }
    }

    /**
   * Element ShadowDOM enabler getter
   */
    get enableShadowDOM() {
        const that = this,
            enableShadowDOM = LW.EnableShadowDOM;

        //NOTE: DockingLayout flag for shadowDOM. Splitter insinde DockingLayout do not need to have shadowRoot
        if (that._isInShadowDOM) {
            return !that._isInShadowDOM;
        }

        if (that.isCompleted) {
            return that.shadowRoot !== null;
        }

        return enableShadowDOM;
    }

    /**
     * CSS files needed for the element (ShadowDOM)
     */
    static get styleUrls() {
        return [
            'lw.button.css',
            'lw.splitter.css'
        ]
    }

    /** 
    * Splitter's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <content></content>
                </div>`;
    }

    /**
    * Updates the Splitter when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'dataSource':
                that._createLayout();
                break;
            case 'resizeMode':
                delete that._dragDetails;
                break;
            case 'orientation': {
                that.bars.forEach(bar => bar.setAttribute('aria-orientation', newValue));
                that._setMeasurements();

                //Used to avoid the animation if enabled
                that.setAttribute('orientation-change', '');

                for (let i = 0; i < that._items.length; i++) {
                    const item = that._items[i];

                    if (item.collapsed) {
                        item.style[that._measurements.dimension] = '';
                        item.style[that._measurements.restricredDimension.toLowerCase()] = '100%';
                        continue;
                    }

                    if (item.size) {
                        item.style[that._measurements.dimension] = '';
                        item._setSize('size', item.size, true);
                    }
                    else {
                        item.style[that._measurements.dimension] = item['offset' + that._measurements.restricredDimension] + 'px';
                    }

                    item.style[that._measurements.restricredDimension.toLowerCase()] = '100%';
                    item._setSize('min', item.min, true);
                    item._setSize('max', item.max, true);
                }

                that._validateItemSize();

                //Used to avoid  the animation if enabled
                that.removeAttribute('orientation-change');
                break;
            }
            case 'unfocusable':
                that._setFocusable();
                break
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
    * Appends a node to the splitter.
    */
    appendChild(node) {
        const that = this;

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);

            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node || !(node instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'appendChild', node: 'node' }));
            return
        }

        that.insertBefore(node, null);
    }

    /**
    * Called when the element is attached to the DOM
    */
    attached() {
        super.attached();

        const that = this;

        //Make sure items are calculated properly on attached
        if (that.isRendered) {
            that._validateItemSize();
        }
    }

    /**
    * Collapses a splitter item
    * item - Number indicating the index of the item / An isntance of LW.SplitterItem
    * far - indicates whether the item should collapse to it's far or near side
    */
    collapse(item, far) {
        const that = this;

        if (typeof item === 'number') {
            item = that._items[item];
        }

        if (!item) {
            return;
        }

        const closestSplitter = that.closest('lw-splitter') || (that.getRootNode() && that.getRootNode().host ? that.getRootNode().host.closest('lw-splitter') : undefined);

        if (item instanceof LW.SplitterItem && closestSplitter === that) {
            item.collapse(far);
            return;
        }

        if (typeof item !== 'number' || !that._items[item]) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'collapse' }));
            return;
        }

        item.collapse(far);
    }

    /**
    * Expands a splitter item
    */
    expand(item) {
        const that = this;

        if (typeof item === 'number') {
            item = that._items[item];
        }

        if (!item) {
            return;
        }

        const closestSplitter = that.closest('lw-splitter') || (that.getRootNode() && that.getRootNode().host ? that.getRootNode().host.closest('lw-splitter') : undefined);

        if (item instanceof LW.SplitterItem && closestSplitter === that) {
            item.expand();
            return;
        }

        if (typeof item !== 'number' || !that._items[item]) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'expand' }));
            return;
        }

        item.expand();
    }

    /**
     * Hides a splitter bar
     * index - the valid index of a lwSplitterBar or its instance
     */
    hideBar(item) {
        const that = this;

        if (typeof item === 'number') {
            item = that.bars[item];
        }

        if (!(item instanceof LW.SplitterBar)) {
            that.error(that.localize('indexOutOfBound', { elementType: that.nodeName.toLowerCase(), method: 'hideBar' }));
            return;
        }

        if (item instanceof LW.SplitterBar && (that.enableShadowDOM ? item.getRootNode().host : item.closest('lw-splitter')) === that) {
            item.hide();
        }
    }

    /**
    * Returns an array of Splitter items that are inside the element
    */
    get items() {
        const that = this;

        if (!that.isReady) {
            return [];
        }

        const children = that.$.container.children;

        let items = [];

        for (let i = 0; i < children.length; i++) {
            if (children[i] instanceof LW.SplitterItem || children[i].tagName.toLowerCase() === 'lw-splitter-item') {
                items.push(children[i]);
            }
        }

        return items;
    }

    /**
     * Insert a new Splitter item at a given position
     * index - indicates the index at which a new item will be inserted
     */
    insert(index, details) {
        const that = this;

        if (typeof details === 'string') {
            details = { content: details };
        }

        if (!details || typeof details !== 'object') {
            that.error(that.localize('invalidSettings', { elementType: that.nodeName.toLowerCase(), method: 'insert' }));
            return;
        }

        if (typeof index !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'insert' }));
            return;
        }

        const item = details instanceof LW.SplitterItem ? details : that._createItem(details);

        if (that.contains(item)) {
            if (that._items.indexOf(item) === index) {
                return;
            }

            that.removeChild(item);
        }

        if (index >= that._items.length || that._items.length === 0) {
            that.appendChild(item);
        }
        else {
            that.insertBefore(item, that._items[index]);
        }
    }

    /**
    * Inserts a new node after another node in the splitter.
    */
    insertBefore(node, referenceNode) {
        const that = this;

        function validateNodeSize() {
            const previousItem = function () {
                let item = node.previousElementSibling;

                while (item) {
                    if (item instanceof LW.SplitterItem) {
                        return item;
                    }

                    item = item.previousElementSibling;
                }
            }();

            const lastItem = that._items[0];

            if (that.autoFitMode !== 'overflow' && that._items.length === 1) {
                const isLocked = lastItem.locked;

                lastItem.locked = false;
                lastItem._setSize('size', lastItem.size || '', true);
                lastItem.locked = isLocked;
            }

            that._resizeHostItemOnInsert(previousItem, node, splitterBar);

            if (that._items) {
                that._items.splice(referenceNode ? that._items.indexOf(referenceNode) : that._items.length, 0, node);
            }

            if (previousItem) {
                if (previousItem.max) {
                    previousItem._setSize('max', previousItem.max, true);
                }

                if (previousItem.min) {
                    previousItem._setSize('min', previousItem.min, true);
                }
            }

            that._validateItemSize();
        }

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.insertBefore.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node || !(node instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore', node: 'newNode/referenceNode' }));
            return;
        }

        if (referenceNode && !(referenceNode instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore', node: 'newNode/referenceNode' }));
            return;
        }

        //Set the restricted to fill the Splitter
        node.style[that._measurements.restricredDimension.toLowerCase()] = '100%';

        if (node.size) {
            const unit = typeof node.size === 'string' && node.size.indexOf('%') > -1 ? '%' : 'px';

            node.style[that._measurements.dimension] = node.size === 'auto' ? node.size : isNaN(parseFloat(node.size)) ? '' : parseFloat(node.size) + unit;

            if (that.autoFitMode !== 'overflow' && that._items.length === 1) {
                that._items[0].size = '';
                //that._items[0]._setSize('size', that._items[0].size, true);
            }
        }
        else {
            node.style[that._measurements.dimension] = '';
        }

        if (node._sizeBeforeCollapse) {
            if (node.size) {
                const unit = typeof node.size === 'string' && node.size.indexOf('%') > -1 ? '%' : 'px';

                node.style[that._measurements.dimension] = (node.size === 'auto' ? node.size : isNaN(parseFloat(node.size)) ? 0 : parseFloat(node.size) + unit);
                node._sizeBeforeCollapse = node[that._measurements.size];
            }
            else {
                delete node._sizeBeforeCollapse;
            }
        }

        node.style['max' + that._measurements.restricredDimension] = 'none';

        node.style[that._measurements.maxDimension] = node._sizeLimits && node.max ? node._sizeLimits[that._measurements.maxDimension] + 'px' : '';

        if (node.collapsed) {
            node.style.minWidth = node.style.minHeight = '';
            node.style[that._measurements.minDimension] = node.style[that._measurements.dimension] = '0';
        }
        else {
            node.style[that._measurements.minDimension] = node._sizeLimits && node.min ? node._sizeLimits[that._measurements.minDimension] + 'px' : '';
        }

        for (let i = 0; i < that._items.length; i++) {
            if (!that._items[i]._sizeBeforeCollapse) {
                that._items[i]._sizeBeforeCollapse = that._items[i][that._measurements.size];
            }
        }

        that.$.container.insertBefore(node, referenceNode || null);

        let splitterBar;
        const currentSplitterBars = that.bars;

        if (node.previousElementSibling instanceof LW.SplitterItem) {
            splitterBar = that._createBar(node, node.previousElementSibling);
            that.$.container.insertBefore(splitterBar, node);
        }
        else if (node.nextElementSibling instanceof LW.SplitterItem) {
            splitterBar = that._createBar(node, node.nextElementSibling);
            that.$.container.insertBefore(splitterBar, node.nextElementSibling);
        }

        if (splitterBar && currentSplitterBars.length > 0) {
            splitterBar.style[that._measurements.restricredDimension.toLowerCase()] = currentSplitterBars[0].style[that._measurements.restricredDimension.toLowerCase()];
        }

        //MS EDGE specific code. In EDGE browser _validateItemSize() is called before the attached method is called
        if (!node.isCompleted) {
            node.__onCompleted = node._onCompleted;

            node._onCompleted = function () {
                if (node.__onCompleted) {
                    node.__onCompleted();
                    delete node.__onCompleted;
                }

                validateNodeSize();

            }
        }
        else {
            validateNodeSize();
        }
    }

    /**
     * Locks a splitter item so it's size can't change.
     * @param {any} item - the index of a Splitter Item or it's instance
     */
    lockItem(item) {
        const that = this;

        if (item instanceof LW.SplitterItem) {
            item.lock();
            return;
        }

        if (typeof item !== 'number' || !that._items[item]) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'lockItem' }));
            return;
        }

        item = that._items[item];

        if (item) {
            item.lock();
        }
    }

    /**
    * Locks a splitter bar so it can't be dragged.
    * @param {any} item - the index of a Splitter Bar or it's instance
    */
    lockBar(item) {
        const that = this;

        if (item instanceof LW.SplitterBar) {
            item.lock();
            return;
        }

        if (typeof item !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'lockBar' }));
            return;
        }

        item = that.bars[item];

        if (item) {
            item.lock();
        }
    }

    /**
    * Set the styleObserver to listen only for resizing
    */
    get hasStyleObserver() {
        return 'resize';
    }

    /**
    * Called when the element is ready
    */
    ready() {
        super.ready();
    }

    render() {
        const that = this;

        that.setAttribute('role', 'group');

        //a flag used to avoid animations on startup
        that._isInitializing = true;

        that._createLayout();

        delete that._isInitializing;

        that._setFocusable();
        super.render();
    }

    /**
     * Refreshes the layout of the element
     */
    refresh() {
        this._resizeEventHandler();
    }

    /**
     * Removes a Splitter item at a given position
     * index - indicates the index at which a new item will be inserted
     */
    removeAt(index) {
        const that = this;

        if (index instanceof LW.SplitterItem && index.closest('lw-splitter') === that) {
            that.removeChild(index);
            return;
        }

        if (typeof index !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'remove' }));
            return;
        }

        if (index > that._items.length || index < 0) {
            that.error(that.localize('indexOutOfBound', { elementType: that.nodeName.toLowerCase(), method: 'remove' }));
            return;
        }

        that.removeChild(that._items[index]);
    }

    /**
     * Remove all items
     */
    removeAll() {
        const that = this;

        that._items = [];
        that.$.container.innerHTML = '';
    }

    /**
    * Removes a node from the splitter.
    */
    removeChild(node) {
        const that = this;

        function getNewNeighbourItem(deletedItemIndex, item, direction) {
            let index = deletedItemIndex,
                newNeighbourItem = that._items[index];

            while (newNeighbourItem) {
                if (!newNeighbourItem.collapsed) {
                    break;
                }

                newNeighbourItem = that._items[index += direction]
            }

            return newNeighbourItem;
        }

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node || !(node instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        if (!that._items) {
            return;
        }

        let itemIndex = that._items.indexOf(node);

        if (node.collapsed) {
            that.$.container.removeChild(that._items.indexOf(node._neighbourItem) > itemIndex ? node.nextElementSibling : node.previousElementSibling);
        }
        else {
            if (node.previousElementSibling instanceof LW.SplitterBar) {
                that.$.container.removeChild(node.previousElementSibling);
            }
            else if (node.nextElementSibling instanceof LW.SplitterBar) {
                that.$.container.removeChild(node.nextElementSibling);
            }
        }

        that._items.splice(itemIndex, 1);
        itemIndex = Math.max(0, itemIndex - 1);

        let totalItemSize = 0
        const uncollapsedItems = that._items.filter(item => !item.collapsed && !item.locked),
            nodeSize = node._sizeBeforeCollapse || node[that._measurements.size];

        uncollapsedItems.map(item => totalItemSize += ((item.style[that._measurements.dimension] ? item._sizeBeforeCollapse : 0) || item[that._measurements.size]));

        that.$.content.removeChild(node);

        //If all left items are collapsed, force uncollapsing of the last item
        if ((that._items.length === 1 && that._items[0].collapsed) || (that._items.length > 0 && that._items.map(item => item.collapsed).indexOf(false) < 0)) {
            const lastItem = that._items[that._items.length - 1];
            let context = lastItem.context;

            lastItem.context = lastItem;
            lastItem._expand();
            lastItem.context = context;
        }

        for (let i = 0; i < that._items.length; i++) {
            if (that._items[i].collapsed && that._items[i]._neighbourItem === node) {
                let splitterBar, splitterBarContext;

                that._items[i]._neighbourItem = getNewNeighbourItem(itemIndex, that._items[i], 1);

                if (!that._items[i]._neighbourItem) {
                    that._items[i]._neighbourItem = getNewNeighbourItem(itemIndex, that._items[i], -1);
                    splitterBar = that._items[i].previousElementSibling;

                    if (splitterBar) {
                        splitterBarContext = splitterBar.context;
                        splitterBar.context = splitterBar;
                        splitterBar.itemCollapsed = true;
                        splitterBar.showFarButton = !(splitterBar.showNearButton = false);
                        splitterBar.context = splitterBarContext;
                    }
                }
                else {
                    splitterBar = that._items[i].nextElementSibling;

                    if (splitterBar) {
                        splitterBarContext = splitterBar.context;
                        splitterBar.context = splitterBar;
                        splitterBar.itemCollapsed = true;
                        splitterBar.showNearButton = !(splitterBar.showFarButton = false);
                        splitterBar.context = splitterBarContext;
                    }
                }
            }
        }

        if (that.autoFitMode === 'proportional') {
            let currentItemSize, newSize, itemMinSize;

            for (let i = 0; i < uncollapsedItems.length; i++) {
                currentItemSize = uncollapsedItems[i]._sizeBeforeCollapse || uncollapsedItems[i][that._measurements.size];
                newSize = currentItemSize + (nodeSize * (currentItemSize / totalItemSize));

                //Check for item min size
                itemMinSize = uncollapsedItems[i]._sizeLimits[that._measurements.minDimension] || 0;
                uncollapsedItems[i].style[that._measurements.dimension] = (uncollapsedItems[i]._sizeBeforeCollapse = Math.max(0, newSize)) + 'px';

                if (itemMinSize > currentItemSize) {
                    uncollapsedItems[i][that._measurements.minDimension] = newSize + 'px';
                }
            }
        }

        that._autoFitItems();
    }

    /**
     * Unhides a Splitter Bar
     * item - the index of the splitter bar or it's instance
     */
    showBar(item) {
        const that = this;

        if (item instanceof LW.SplitterBar) {
            item.show();
            return;
        }

        if (typeof item !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'showBar' }));
            return;
        }

        item = that.bars[item];

        if (!(item instanceof LW.SplitterBar)) {
            that.error(that.localize('indexOutOfBound', { elementType: that.nodeName.toLowerCase(), method: 'showBar' }));
            return;
        }

        item.show();
    }

    /**
    * Returns an array of Splitter items that are inside the element
    */
    get bars() {
        const that = this;

        if (!that.isReady) {
            // return Array.from(that.querySelectorAll('lw-splitter-bar'));
            return [];
        }

        const children = that.$.container.children;

        let items = [];

        for (let i = 0; i < children.length; i++) {
            if (children[i] instanceof LW.SplitterBar || children[i].tagName.toLowerCase() === 'lw-splitter-bar') {
                items.push(children[i]);
            }
        }

        return items;
    }

    /**
    * Unlocks a previously locked splitter item
    * @param {any} item - the index of a Splitter Item or it's instance
    */
    unlockItem(item) {
        const that = this;

        if (item instanceof LW.SplitterItem) {
            item.unlock();
            return;
        }

        if (typeof item !== 'number' || !that._items[item]) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'unlockItem' }));
            return;
        }

        item = that._items[item];

        if (item) {
            item.unlock();
        }
    }

    /**
    * Unlocks a previously locked splitter bar
    * @param {any} item - the index of a Splitter Bar or it's instance
    */
    unlockBar(item) {
        const that = this;

        if (item instanceof LW.SplitterBar) {
            item.unlock();
            return;
        }

        if (typeof item !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'unlockBar' }));
            return;
        }

        item = that.bars[item];

        if (item) {
            item.unlock();
        }
    }

    /**
     * Updates the Splitter item's properties
     * @param {any} index - index of the splitter item
     * @param {any} settings - object of properties and value
     */
    update(item, settings) {
        const that = this;

        if (typeof item === 'number') {
            item = that._items[item];

            if (!item) {
                that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'update' }));
                return;
            }
        }

        if (!(item instanceof LW.SplitterItem) || !settings || (that.enableShadowDOM ? item.getRootNode().host : that.closest('lw-splitter')) !== that) {
            return;
        }

        for (let key in settings) {
            if (item[key] !== undefined) {
                item[key] = settings[key];
            }
        }
    }

    /**
    * Fits the last item according to the free space left in the Splitter.
    */
    _autoFitItems() {
        const that = this,
            itemsCount = that._items.length;

        if (itemsCount === 0 || that.autoFitMode === 'overflow') {
            return;
        }

        let lastItem,
            lockedItems = [],
            collapsedItems = [],
            itemsWithoutSize = [];

        for (let i = itemsCount - 1; i >= 0; i--) {
            if (that._items[i].collapsed) {
                collapsedItems.push(that._items[i]);
            }
            else if (that._items[i].locked) {
                lockedItems.push(that._items[i]);
            }
            else if (!lastItem) {
                lastItem = that._items[i];
            }
            else if (!that._items[i].size) {
                itemsWithoutSize.push(that._items[i]);
            }
        }

        if (lastItem && lastItem.size && itemsWithoutSize.length > 0) {
            lastItem = itemsWithoutSize.filter(item => !item.max && !item._sizeLimits[that._measurements.maxDimension])[0] || lastItem;
        }

        if (collapsedItems.length === itemsCount) {
            lastItem = collapsedItems[0];
            lastItem.expand();
            lastItem.unlock();
        }

        that._autoFitLastItem(lastItem, collapsedItems, lockedItems);
    }

    /**
     * AutoFits the items by shrinking the last item.
     */
    _autoFitLastItem(lastItem, collapsedItems, lockedItems) {
        const that = this,
            itemsCount = that._items.length;
        let lastLockedItem;

        if (itemsCount === 1 && that._items[0].locked) {
            lastLockedItem = that._items[0];
            lastLockedItem.locked = false;
        }

        if (lockedItems.length === itemsCount) {
            lockedItems[0].unlock();
        }

        if (!lastItem) {
            lastItem = lockedItems[0];
            lastItem.unlock();
        }


        if (that._items.length === 1) {
            lastItem._setSize('size', '100%', true);
            delete lastItem._originalSize;
        }
        else {
            let totalItemSize = 0,
                totalBarsSize = 0;

            that._items.map(item => totalItemSize += !item.collapsed ?
                (item.style[that._measurements.dimension] && item.style[that._measurements.dimension].indexOf('%') < -1 && item._sizeBeforeCollapse ?
                    item._sizeBeforeCollapse : item.getBoundingClientRect()[that._measurements.dimension]) : 0);

            that.bars.map(bar => totalBarsSize += bar[that._measurements.size]);

            const currentSplitterSize = totalItemSize + totalBarsSize,
                containerSize = that.$.container.getBoundingClientRect()[that._measurements.dimension];

            if (currentSplitterSize !== containerSize) {
                let lastItemSize;

                if (lastItem.style[that._measurements.dimension].indexOf('%') < -1) {
                    lastItemSize = lastItem._sizeBeforeCollapse ? lastItem._sizeBeforeCollapse : lastItem.getBoundingClientRect()[that._measurements.dimension];
                }
                else {
                    lastItemSize = lastItem.getBoundingClientRect()[that._measurements.dimension];
                }

                let sizeDifference = Math.abs(containerSize - currentSplitterSize),
                    sign = currentSplitterSize < containerSize ? 1 : -1;
                const newSize = Math.max(0, (lastItemSize + sign * sizeDifference));

                lastItem.style[that._measurements.dimension] =
                    (lastItem._sizeBeforeCollapse = newSize) + 'px';

                delete lastItem._originalSize;

                that._validateItemLimits(lastItem, newSize);
            }
        }

        if (lastLockedItem) {
            lastLockedItem.locked = true;
        }
    }

    /**
     * Validates 
     * @param {any} item - the target Splitter item
     * @param {any} newSize - the new size of the target Splitter item
     */
    _validateItemLimits(item, newSize) {
        const that = this,
            containerSize = that.$.container.getBoundingClientRect()[that._measurements.dimension];

        let isPercentage, expectedSize, sizeLimit;

        sizeLimit = item._min || item.min;

        if (sizeLimit) {
            isPercentage = typeof sizeLimit === 'string' && sizeLimit.indexOf('%') > -1;
            expectedSize = isPercentage ? parseFloat(sizeLimit) * containerSize / 100 : parseFloat(sizeLimit);

            if (expectedSize > newSize) {
                item.style[that._measurements.minDimension] = isPercentage ? (newSize * 100 / containerSize) + '%' : (newSize + 'px');
                item._sizeLimits[that._measurements.minDimension] = newSize;
                item._min = sizeLimit;
                item.set('min', item.style[that._measurements.minDimension]);
            }
            else if (expectedSize < newSize) {
                item.style[that._measurements.minDimension] = isPercentage ? (expectedSize * 100 / containerSize) + '%' : (expectedSize + 'px');
                item._sizeLimits[that._measurements.minDimension] = expectedSize;
                item.set('min', sizeLimit);
                delete item._min;
            }
        }

        sizeLimit = item._max || item.max;

        if (sizeLimit) {
            isPercentage = typeof sizeLimit === 'string' && sizeLimit.indexOf('%') > -1;
            expectedSize = isPercentage ? parseFloat(sizeLimit) * containerSize / 100 : parseFloat(sizeLimit);

            if (expectedSize < newSize) {
                item.style[that._measurements.maxDimension] = isPercentage ? (newSize * 100 / containerSize) + '%' : (newSize + 'px');
                item._sizeLimits[that._measurements.maxDimension] = newSize;
                item._max = sizeLimit;
                item.set('max', item.style[that._measurements.maxDimension]);
            }
            else if (expectedSize > newSize) {
                item.style[that._measurements.maxDimension] = isPercentage ? (expectedSize * 100 / containerSize) + '%' : (expectedSize + 'px');
                item._sizeLimits[that._measurements.maxDimension] = expectedSize;
                item.set('max', sizeLimit);
                delete item._max;
            }
        }
    }

    /**
     * AutoFits the items by proportionally reducing the size of all items
     */
    _autoFitItemsProportionally(newItem, splitterBar) {
        const that = this,
            uncollapsedItems = that._items.filter(item => !item.collapsed && !item.locked);
        let newItemSize = newItem[that._measurements.size],
            totalItemSize = 0;

        uncollapsedItems.map(item => totalItemSize += item._sizeBeforeCollapse || item[that._measurements.size]);

        if (splitterBar) {
            totalItemSize -= splitterBar[that._measurements.size];
        }

        if (newItem.size && !newItem.isCompleted) {
            newItem._setSize('size', newItemSize);
            newItemSize = newItem._sizeBeforeCollapse;
        }

        newItemSize = Math.min(that.$.container[that._measurements.size] / 2, newItem[that._measurements.size]);

        if (typeof newItem.size === 'string' && newItem.size.indexOf('%') > -1) {
            const containerSize = that.$.container.getBoundingClientRect()[that._measurements.dimension];

            newItem._sizeBeforeCollapse = newItemSize;
            newItem.style[that._measurements.dimension] = (newItemSize * 100 / containerSize) + '%';
        }
        else {
            newItem.style[that._measurements.dimension] = (newItem._sizeBeforeCollapse = newItemSize) + 'px';
        }

        let currentItemSize, newSize, itemMinSize;

        for (let i = 0; i < uncollapsedItems.length; i++) {
            currentItemSize = uncollapsedItems[i]._sizeBeforeCollapse || uncollapsedItems[i][that._measurements.size];
            newSize = (totalItemSize - newItemSize) * (currentItemSize / totalItemSize);

            //Check for item min size
            itemMinSize = uncollapsedItems[i]._sizeLimits[that._measurements.minDimension] || 0;
            uncollapsedItems[i].style[that._measurements.dimension] = (uncollapsedItems[i]._sizeBeforeCollapse = Math.max(itemMinSize, newSize)) + 'px';
            delete uncollapsedItems[i]._originalSize;
        }
    }

    /**
     * Reads the dataSource and populates the Splitter with items.
     */
    _createLayout() {
        const that = this;

        that._items = [];

        if (typeof that.dataSource === 'string') {
            that.dataSource = JSON.parse(that.dataSource);
        }

        if (that.dataSource !== null && Array.isArray(that.dataSource)) {
            that.$.container.innerHTML = '';

            let fragment = document.createDocumentFragment(), item;

            for (let i = 0; i < that.dataSource.length; i++) {
                item = that._createItem(that.dataSource[i]);
                fragment.appendChild(item);
            }

            that._handleSplitterBars(fragment);
            return;
        }

        that._handleSplitterBars(that.$.container);

    }

    /**
     * Creates a splitter bar
     * @param {any} item - the item that precedes a splitter item
     */
    _createBar(item, neighbourItem) {
        const that = this,
            splitBar = document.createElement('lw-splitter-bar');

        if (item.collapsed) {
            splitBar.itemCollapsed = true;

            if (that._items.indexOf(item) === that._items.length - 1) {
                splitBar.showNearButton = true;
            }
            else {
                splitBar.showFarButton = true;
            }
        }
        else {
            if (item.collapsible) {
                splitBar.showNearButton = true;
            }

            if (neighbourItem && neighbourItem instanceof LW.SplitterItem && neighbourItem.collapsible) {
                neighbourItem === item.nextElementSibling ? splitBar.showFarButton = true : splitBar.showNearButton = true;
            }
        }

        splitBar.setAttribute('aria-controls', item.id + (neighbourItem ? ' ' + neighbourItem.id : ''));
        splitBar.setAttribute('aria-orientation', that.orientation);

        return splitBar;
    }

    /**
     * Creates a splitter item
     */
    _createItem(data) {
        const item = document.createElement('lw-splitter-item');

        if (data.id) {
            item.id = data.id;
        }

        item.innerHTML = data.content || '';
        item.collapsible = data.collapsible || false;
        item.collapsed = data.collapsed || false;
        item.locked = data.locked || false;

        if (data.max) {
            item.max = data.max;
        }

        if (data.min) {
            item.min = data.min;
        }

        if (data.size) {
            item.size = data.size;
        }

        return item;
    }

    /**
    * Finishes the resizing operation
    */
    _completeResizing(canceled) {
        const that = this;

        if (that._dragDetails) {
            if (that._splitBarDummy && that._splitBarDummy.parentElement) {
                if (!canceled) {
                    that._dragDetails.firstItem.style[that._measurements.dimension] =
                        (that._dragDetails.firstItem._sizeBeforeCollapse = that._dragDetails.firstItem.currentSize + that._dragDetails.firstItem._paddings) + 'px';
                    delete that._dragDetails.firstItem._originalSize;

                    if (that.resizeMode !== 'proportional') {
                        that._dragDetails.secondItem.style[that._measurements.dimension] =
                            (that._dragDetails.secondItem._sizeBeforeCollapse = that._dragDetails.splitAreaSize -
                                that._dragDetails.firstItem.currentSize + that._dragDetails.secondItem._paddings) + 'px';
                        delete that._dragDetails.secondItem._originalSize;
                    }
                    else {
                        const itemCount = that._dragDetails.itemProportions.length;

                        if (itemCount > 1) {
                            for (let p = 0; p < itemCount; p++) {
                                that._dragDetails.itemProportions[p].item.style[that._measurements.dimension] =
                                    (that._dragDetails.itemProportions[p].item._sizeBeforeCollapse = that._dragDetails.itemProportions[p].currentSize +
                                        that._dragDetails.itemProportions[p].item._paddings) + 'px';
                                delete that._dragDetails.itemProportions[p]._originalSize;
                            }
                        }
                        else {
                            that._dragDetails.secondItem[0].style[that._measurements.dimension] =
                                (that._dragDetails.secondItem[0]._sizeBeforeCollapse = Math.floor(that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize +
                                    that._dragDetails.firstItem._paddings)) + 'px';
                            delete that._dragDetails.secondItem[0]._originalSize;
                        }
                    }

                }

                that._validateBarsSize();

                that.$.fireEvent('resizeEnd', {
                    firstItem: {
                        index: that._items.indexOf(that._dragDetails.firstItem),
                        oldSize: that._dragDetails.firstItem.originalSize,
                        newSize: that._dragDetails.firstItem[that._measurements.size]
                    },
                    secondItem: Array.isArray(that._dragDetails.secondItem) ?
                        {
                            index: that._dragDetails.secondItem.map(item => that._items.indexOf(item)),
                            oldSize: that._dragDetails.secondItem.map(item => item.originalSize),
                            newSize: that._dragDetails.secondItem.map(item => item[that._measurements.size])
                        } :
                        {
                            index: that._items.indexOf(that._dragDetails.secondItem),
                            oldSize: that._dragDetails.secondItem.originalSize,
                            newSize: that._dragDetails.secondItem[that._measurements.size]
                        }
                });

                that._splitBarDummy.classList.remove('limit-reached');
                that._splitBarDummy.parentElement.removeChild(that._splitBarDummy);
            }

            that.removeAttribute('dragged');

            delete that._dragDetails;
            delete that._keyboardResizing;
        }
    }

    /**
     * Document DragStart event handler
     * @param {any} event
     */
    _dragStartHandler(event) {
        const that = this;

        if (that._dragDetails) {
            event.preventDefault();
        }
    }

    /**
     * Splitter mouse down event handler
     */
    _downHandler(event) {
        const that = this;

        event.stopPropagation();

        if (that.disabled) {
            return;
        }

        if (that._keyboardResizing) {
            that._completeResizing();
            return;
        }

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;
        let closestSplitter = target.closest('lw-splitter');

        if (!closestSplitter) {
            closestSplitter = target.getRootNode() && target.getRootNode().host ? target.getRootNode().host.closest('lw-splitter') : undefined;
        }

        const closestSplitterBar = target && target.closest ? target.closest('lw-splitter-bar') : null;

        if (closestSplitterBar && closestSplitter === that) {
            //Collapse Near item
            if (target.closest('.lw-splitter-near-collapse-button') === closestSplitterBar.$.nearCollapseButton) {
                that._collapseButtonPressed = {
                    splitBar: closestSplitterBar,
                    item: closestSplitterBar.previousElementSibling,
                    target: closestSplitterBar.$.nearCollapseButton,
                    farCollapse: false
                };
                return;
            }

            //Collapse far item
            if (target.closest('.lw-splitter-far-collapse-button') === closestSplitterBar.$.farCollapseButton) {
                that._collapseButtonPressed = {
                    splitBar: closestSplitterBar,
                    item: closestSplitterBar.nextElementSibling,
                    target: closestSplitterBar.$.farCollapseButton,
                    farCollapse: true
                };
                return;
            }

            if (!closestSplitterBar.itemCollapsed && !closestSplitterBar.locked && that.resizeMode !== 'none') {
                that._setDragDetails(closestSplitterBar, event);
            }
        }
    }

    /**
     * iOS Safari bug fix. (iOS Safari doesn't support 'touch-action: none')
     */
    _moveHandler() {
        if (this.hasAttribute('dragged') && LW.Utilities.Core.isMobile) {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * Document move event handler
     */
    _documentMoveHandler(event) {
        const that = this;

        if (that._keyboardResizing || that.disabled) {
            return;
        }

        that._resize(event);
    }

    /**
     * Document move event handler
     */
    _documentUpHandler(event) {
        const that = this;

        that.removeAttribute('dragging-not-allowed');
        that.removeAttribute('show-locked-items');

        if (that.disabled) {
            delete that._dragDetails;
            delete that._collapseButtonPressed;
            return;
        }

        const target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        that._completeResizing();

        if (that._collapseButtonPressed &&
            target.closest('.' + that._collapseButtonPressed.target.classList[0]) === that._collapseButtonPressed.target) {
            if (that._collapseButtonPressed.item.collapsed) {
                that.expand(that._collapseButtonPressed.item);
            }
            else {
                that.collapse(that._collapseButtonPressed.item, that._collapseButtonPressed.farCollapse);
            }

            delete that._collapseButtonPressed;
            return;
        }
    }

    /**
     * Ensures that all items are attached and ready.
     * @param {any} nodes - nodes that are not ready
     * @param {any} callback - a function to be called when all items are ready
     */
    _ensureItemsReady(nodes, callback) {
        const that = this;

        const contextCallback = function () {
            const setContext = function (context) {
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].context = context === 'node' ? nodes[i] : document;
                }
            }

            setContext('node');
            callback();
            setContext();
        }

        if (nodes.length === 0) {
            contextCallback();
        }
        else {
            that._nodesReadyListeners = 0;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                const readyEventHandler = function () {
                    that._nodesReadyListeners--;
                    if (that._nodesReadyListeners === 0) {
                        contextCallback();

                        delete that._nodesReadyListeners;
                    }
                }.bind(that);

                if (!node.isCompleted) {
                    that._nodesReadyListeners++;
                    node._onCompleted = readyEventHandler;
                }
            }

            if (that._nodesReadyListeners === 0) {
                contextCallback();
            }
        }
    }

    /**
     * Element's focus handler
     */
    _focusHandler(event) {
        const that = this;

        event.type === 'focus' ? that.setAttribute('focus', '') : that.removeAttribute('focus');
    }

    /**
     * Used in _setDragDetails() method to get the desired item ( first and second )
     * @param {any} sibling - next item
     * @param {any} reverse - reverse order flag
     */
    _getTargetItem(splitter, sibling, reverse) {
        const that = this;
        let previousItem = reverse ? that._items[that._items.length - 1] : splitter[sibling];

        while (previousItem) {

            if (previousItem instanceof LW.SplitterItem && !previousItem.collapsed) {
                if (!previousItem.locked) {
                    return previousItem;
                }

                if (that._dragDetails && !that._dragDetails.firstItem) {
                    that._dragDetails.lockedItemsSize += previousItem[that._measurements.size] + (previousItem.previousElementSibling instanceof LW.SplitterBar ?
                        previousItem.previousElementSibling[that._measurements.size] : 0);
                }
            }

            previousItem = previousItem[sibling];
        }
    }

    /**
     * Adds/Removes split bars
     */
    _handleSplitterBars(itemContainer) {
        const that = this;

        if (that._items.length < 1) {
            //IE11 has no support for DocumentFragment.children. Use childNodes instead if no polyfill is provided
            that._items = itemContainer.parentElement ? that.items : Array.from(itemContainer.children);
        }

        if (!that._measurements) {
            that._setMeasurements();
        }

        if (that._items.length < 2) {
            const splitBars = that.bars;

            for (let i = 0; i < splitBars.length; i++) {
                itemContainer.removeChild(splitBars[i]);
            }
        }

        //Note: attached() is called after render() of the SplitterIte
        //This flag doesn't allow item size validation
        that._noItemSizeValidation = true;

        if (!itemContainer.parentElement && itemContainer !== that.$.container) {
            that.$.container.appendChild(itemContainer);
            itemContainer = that.$.container;
        }

        that._noItemSizeValidation = false;

        let item;

        for (let i = 0; i < that._items.length; i++) {
            item = that._items[i];

            //Remvoes all elements before the first item
            if (i === 0) {
                while (itemContainer.firstElementChild && itemContainer.firstElementChild !== item) {
                    itemContainer.removeChild(itemContainer.firstElementChild);
                }
            }

            item.style[that._measurements.restricredDimension.toLowerCase()] = '100%';
            item.style['max' + that._measurements.restricredDimension] = 'none';

            if (!item.size) {
                item.style[that._measurements.dimension] = item._sizeBeforeCollapse ? item._sizeBeforeCollapse + 'px' : '';
            }

            const min = item.min,
                max = item.max;

            if (typeof min === 'string' && min.indexOf('%') > -1) {
                item._setSize('min', min);
            }

            if (typeof max === 'string' && max.indexOf('%') > -1) {
                item._setSize('max', max);
            }

            item.style[that._measurements.maxDimension] = item.max ?
                item._sizeLimits[that._measurements.maxDimension] + 'px' : '';

            if (item.nextElementSibling) {
                let nextElementSibling = item.nextElementSibling;

                //Create a SplitterBar between the two items
                if (nextElementSibling instanceof LW.SplitterItem || nextElementSibling.tagName.toLowerCase() === 'lw-splitter-item') {
                    item.parentNode.insertBefore(that._createBar(item, item.nextElementSibling), item.nextElementSibling);
                }
                else {
                    if (nextElementSibling instanceof LW.SplitterBar || nextElementSibling.tagName.toLowerCase() === 'lw-splitter-bar') {
                        nextElementSibling = nextElementSibling.nextElementSibling;
                    }

                    //Remove any between the items 
                    while (nextElementSibling && (!(nextElementSibling instanceof LW.SplitterItem) || (nextElementSibling.tagName.toLowerCase() !== 'lw-splitter-item'))) {
                        nextElementSibling.parentNode.removeChild(nextElementSibling);
                        nextElementSibling = nextElementSibling.nextElementSibling;
                    }
                }
            }

            if (item.collapsed) {
                const collapsible = item.collapsible;

                item.style.minWidth = item.style.minHeight = '';
                item.style[that._measurements.minDimension] = '0';
                item._ignorePropertyValue = true;

                //Force collapse it
                item.collapsible = true;
                item.collapse();

                //Return original proeprty value
                item.collapsible = collapsible;
            }
            else {
                item.style[that._measurements.minDimension] = item._sizeLimits && item.min ?
                    item._sizeLimits[that._measurements.minDimension] + 'px' : '';
            }
        }

        //Remvoes all unnecessary elements after the last item
        if (item) {
            while (itemContainer.lastElementChild !== item) {
                itemContainer.removeChild(itemContainer.lastElementChild);
            }
        }

        //MS EDGE fix when items are supposed to be ready but they are not yet
        that._ensureItemsReady(that._items, that._validateItemSize.bind(that));
    }

    /**
     * Key down event handler
     * @param {any} event
     */
    _keyDownHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        let splitterBar = that.enableShadowDOM ? that.shadowRoot.activeElement : document.activeElement;

        if (event.key === 'w' && event.altKey) {
            //Prevents container scrolling
            event.preventDefault();

            const firstItem = that.enableShadowDOM ? that.shadowRoot.querySelector('lw-splitter-bar') : that.querySelector('lw-splitter-bar');

            if (splitterBar !== firstItem) {
                that._completeResizing(true);
            }

            firstItem.focus();
            return;
        }

        if (!event.ctrlKey && that._splitBarDummy && that._splitBarDummy.parentElement) {
            splitterBar = that._splitBarDummy;
        }
        else if (!(splitterBar instanceof LW.SplitterBar)) {
            return;
        }

        if ((that.enableShadowDOM ? splitterBar.getRootNode().host : splitterBar.closest('lw-splitter')) !== that) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown': {
                if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && that.orientation === 'vertical') {
                    return;
                }

                if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && that.orientation === 'horizontal') {
                    return;
                }

                //Prevents container scrolling
                event.preventDefault();

                const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;

                if (event.ctrlKey) {

                    //Cancel resizing if it's in motion
                    that._completeResizing(true);

                    let neighbourItem, targetItem;

                    if (direction < 0) {
                        targetItem = splitterBar.previousElementSibling;
                        neighbourItem = splitterBar.nextElementSibling;
                    }
                    else {
                        neighbourItem = splitterBar.previousElementSibling;
                        targetItem = splitterBar.nextElementSibling;
                    }

                    neighbourItem.collapsed ? neighbourItem.expand() : targetItem.collapse(direction > 0);
                    return;
                }

                if (splitterBar.locked) {
                    return;
                }

                if (that.resizeMode === 'none') {
                    return;
                }

                that._keyboardResizing = true;

                let currentPosition;

                if (!that._dragDetails) {
                    that._setDragDetails(splitterBar);
                    currentPosition = splitterBar[that._measurements.offset] + direction * that.resizeStep;
                }
                else {
                    currentPosition = that._dragDetails.position + direction * that.resizeStep;
                }

                //Requires event parameter so we imitate it with an object
                that._resize({ pageX: currentPosition, pageY: currentPosition });
                break;
            }
            case 'Enter':
                that._completeResizing();
                break;
            case 'Escape':
            case 'Tab':
                that._completeResizing(true);
                break;
        }
    }

    /**
     * Mouse Enter/Leave event handler
     * @param {any} event
     */
    _mouseEventsHandler(event) {
        event.type === 'mouseenter' && !LW.Utilities.Core.isMobile ? this.setAttribute('hover', '') : this.removeAttribute('hover');
    }

    /**
    * Used to recalculate the Proportions during resizing when resizeMode is 'proportional'
    * @param {any} amount - amount of size that has changed since the start of the operation till now
    * @param {any} totalItemsCount - total number of all items that are being resized
    * @param {any} resizableItemsCount - the number of items that can be resized.
    */
    _recalcItemSize(amount, totalItemsCount, resizableItemsCount) {
        const that = this;
        let usedSize, minSize;

        if (!resizableItemsCount) {
            resizableItemsCount = totalItemsCount;
        }

        if (amount > 0) {
            for (let p = 0; p < totalItemsCount; p++) {
                minSize = that._dragDetails.itemProportions[p].item._sizeLimits[that._measurements.minDimension];

                if (that._dragDetails.itemProportions[p].currentSize > minSize) {
                    if (that._dragDetails.itemProportions[p].currentSize - minSize < amount / resizableItemsCount) {
                        usedSize = that._dragDetails.itemProportions[p].currentSize - minSize;
                    }
                    else {
                        usedSize = amount / resizableItemsCount;
                    }

                    amount -= usedSize;
                    that._dragDetails.itemProportions[p].currentSize = Math.max(minSize, that._dragDetails.itemProportions[p].currentSize - usedSize);
                    delete that._dragDetails.itemProportions[p]._originalSize;
                }

                resizableItemsCount = Math.max(1, resizableItemsCount - 1);
            }
        }
        else {
            const maxSize = (that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize) -
                (totalItemsCount > 1 ? that._dragDetails.secondItemTotalMinSize - that._dragDetails.itemProportions[0].item._sizeLimits[that._measurements.minDimension] : 0);
            let itemMaxSize;

            for (let p = 0; p < totalItemsCount; p++) {
                if (that._dragDetails.itemProportions[p].item._sizeLimits[that._measurements.maxDimension]) {
                    itemMaxSize = Math.min(that._dragDetails.itemProportions[p].item._sizeLimits[that._measurements.maxDimension], maxSize);
                }
                else {
                    itemMaxSize = maxSize;
                }

                if (that._dragDetails.itemProportions[p].currentSize < itemMaxSize) {
                    if (that._dragDetails.itemProportions[p].currentSize - amount / resizableItemsCount > itemMaxSize) {
                        usedSize = -1 * (itemMaxSize - that._dragDetails.itemProportions[p].currentSize);
                    }
                    else {
                        usedSize = amount / resizableItemsCount;
                    }

                    amount -= usedSize;
                    that._dragDetails.itemProportions[p].currentSize = Math.min(itemMaxSize, that._dragDetails.itemProportions[p].currentSize - usedSize);
                    delete that._dragDetails.itemProportions[p]._originalSize;
                }

                resizableItemsCount = Math.max(1, resizableItemsCount - 1);
            }
        }

        //size less than 0.1 is too small to care. JS can't compute properly with too small values
        if (Math.abs(amount) > 0.1) {
            that._recalcItemSize(amount, totalItemsCount, resizableItemsCount);
        }
    }

    /**
    * Resizes the splitter items
    */
    _resize(event) {
        const that = this;

        if (!that._dragDetails) {
            return;
        }

        let distance = event[that._measurements.pagePosition] - that._dragDetails.position, isLimitReached;

        const direction = Math.sign(distance),
            firstItemMinSize = that._dragDetails.firstItem._sizeLimits[that._measurements.minDimension],
            firstItemMaxSize = that._dragDetails.firstItem._sizeLimits[that._measurements.maxDimension];

        let sizeAvailable, isPossibleToResize;

        if (!that.hasAttribute('dragged')) {
            that.$.fireEvent('resizeStart', {
                firstItem: {
                    index: that._items.indexOf(that._dragDetails.firstItem),
                    size: that._dragDetails.firstItem[that._measurements.size]
                },
                secondItem: Array.isArray(that._dragDetails.secondItem) ?
                    {
                        index: that._dragDetails.secondItem.map(item => that._items.indexOf(item)),
                        size: that._dragDetails.secondItem.map(item => item[that._measurements.size])
                    } :
                    {
                        index: that._items.indexOf(that._dragDetails.secondItem),
                        size: that._dragDetails.secondItem[that._measurements.size]
                    }
            });
        }

        that.setAttribute('dragged', '');

        if (Math.abs(distance) < that.resizeStep) {
            return;
        }

        let coercedDistance = Math.max(that.resizeStep, Math.floor(Math.abs(distance) / that.resizeStep) * that.resizeStep);
        const offset = distance - (direction * coercedDistance);

        switch (that.resizeMode) {
            case 'adjacent':
            case 'end':
                if (direction > 0) {
                    sizeAvailable = that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize;
                    isPossibleToResize = () => sizeAvailable - that._dragDetails.secondItemTotalMinSize >= coercedDistance ||
                        (firstItemMaxSize && that._dragDetails.firstItem.currentSize + that.resizeStep <= firstItemMaxSize);
                    isLimitReached = () => (firstItemMaxSize && that._dragDetails.firstItem.currentSize === firstItemMaxSize) ||
                        sizeAvailable - that.resizeStep <= that._dragDetails.secondItemTotalMinSize;
                }
                else {
                    sizeAvailable = that._dragDetails.firstItem.currentSize;
                    isPossibleToResize = () => sizeAvailable - firstItemMinSize >= coercedDistance ||
                        (that._dragDetails.secondItemTotalMaxSize &&
                            that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize + that.resizeStep <= that._dragDetails.secondItemTotalMaxSize);
                    isLimitReached = () => (that._dragDetails.secondItemTotalMaxSize &&
                        that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize === that._dragDetails.secondItemTotalMaxSize) ||
                        sizeAvailable - that.resizeStep <= firstItemMinSize;
                }

                distance = 0;

                while (coercedDistance > 0) {
                    if (isPossibleToResize()) {
                        distance += direction * that.resizeStep;
                    }

                    coercedDistance -= that.resizeStep;
                }

                that._resizeItem(event, distance, offset);
                break;
            case 'proportional': {
                const initialRemainingSpace = (that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize);

                if (direction > 0) {
                    sizeAvailable = Math.abs(initialRemainingSpace - that._dragDetails.secondItemTotalMinSize);
                    isPossibleToResize = () => sizeAvailable >= coercedDistance ||
                        (firstItemMaxSize && that._dragDetails.firstItem.currentSize + that.resizeStep <= firstItemMaxSize);
                    isLimitReached = () => (firstItemMaxSize && that._dragDetails.firstItem.currentSize === firstItemMaxSize) ||
                        that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize - that.resizeStep < that._dragDetails.secondItemTotalMinSize;
                }
                else {
                    sizeAvailable = that._dragDetails.firstItem.currentSize;
                    //TODO: ResizeStep is not taken into account properly
                    isPossibleToResize = () => sizeAvailable - firstItemMinSize >= coercedDistance &&
                        (that._dragDetails.secondItemTotalMaxSize ? that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize +
                            that.resizeStep <= that._dragDetails.secondItemTotalMaxSize : true);
                    isLimitReached = () => (that._dragDetails.secondItemTotalMaxSize &&
                        that._dragDetails.splitAreaSize + that.resizeStep - that._dragDetails.firstItem.currentSize >= that._dragDetails.secondItemTotalMaxSize) ||
                        that._dragDetails.firstItem.currentSize - that.resizeStep < firstItemMinSize;
                }

                let newSize, isResized;

                while (coercedDistance > 0) {
                    if (isPossibleToResize()) {
                        isResized = true;
                        newSize = Math.min(firstItemMaxSize ?
                            Math.min(firstItemMaxSize, that._dragDetails.splitAreaSize - that._dragDetails.secondItemTotalMinSize) :
                            that._dragDetails.splitAreaSize - that._dragDetails.secondItemTotalMinSize,
                            Math.max(firstItemMinSize, that._dragDetails.firstItem.currentSize + direction * that.resizeStep));

                        that._dragDetails.firstItem.currentSize = that._dragDetails.firstItem._sizeBeforeCollapse = Math.floor(newSize);
                    }

                    coercedDistance -= that.resizeStep;
                }

                if (!isResized) {
                    break;
                }

                const remaningSpaceAfterResize = that._dragDetails.splitAreaSize - that._dragDetails.firstItem.currentSize,
                    itemCount = that._dragDetails.itemProportions.length;

                //Recalculate the proportions
                that._recalcItemSize(initialRemainingSpace - remaningSpaceAfterResize, itemCount);

                if (that.liveResize) {
                    that._dragDetails.firstItem.style[that._measurements.dimension] = (that._dragDetails.firstItem.currentSize + that._dragDetails.firstItem._paddings) + 'px';

                    if (itemCount > 1) {
                        for (let p = 0; p < itemCount; p++) {
                            that._dragDetails.itemProportions[p].item.style[that._measurements.dimension] =
                                that._dragDetails.itemProportions[p].item._sizeBeforeCollapse =
                                (that._dragDetails.itemProportions[p].currentSize + that._dragDetails.itemProportions[p].item._paddings) + 'px';
                        }
                    }
                    else {
                        that._dragDetails.secondItem[0].style[that._measurements.dimension] =
                            (that._dragDetails.secondItem[0]._sizeBeforeCollapse = Math.floor(remaningSpaceAfterResize + that._dragDetails.itemProportions[0].item._paddings)) + 'px';
                    }
                }
                else {
                    that._splitBarDummy.style[that._measurements.position] = (that._dragDetails.firstItem[that._measurements.offset] +
                        that._dragDetails.firstItem.currentSize + that._dragDetails.lockedItemsSize + that._dragDetails.firstItem._paddings) + 'px';
                }

                const edge = that._dragDetails.firstItem.getBoundingClientRect()[that.orientation === 'vertical' ? 'left' : 'top'] + that._dragDetails.splitBarOffset;

                const maxPosition = firstItemMaxSize &&
                    that._dragDetails.splitAreaSize - firstItemMaxSize > that._dragDetails.secondItemTotalMinSize ?
                    firstItemMaxSize : that._dragDetails.splitAreaSize - that._dragDetails.secondItemTotalMinSize;

                that._dragDetails.position = Math.max(edge + (that._dragDetails.secondItemTotalMaxSize ?
                    Math.max(that._dragDetails.splitAreaSize - that._dragDetails.secondItemTotalMaxSize, firstItemMinSize) : firstItemMinSize) +
                    that._dragDetails.lockedItemsSize + that._dragDetails.firstItem._paddings,
                    Math.min(edge + maxPosition + that._dragDetails.lockedItemsSize + that._dragDetails.firstItem._paddings, event[that._measurements.pagePosition] - offset));
                break;
            }
        }

        if (!that.liveResize) {
            isLimitReached() ? that._splitBarDummy.classList.add('limit-reached') : that._splitBarDummy.classList.remove('limit-reached');
        }

        //Should be called only when Splitter's width is auto
        that._validateBarsSize();
    }

    /**
     * Style Changed Event Handler - Refits the items if necessary
     */
    _resizeEventHandler() {
        const that = this;

        if (!that._items) {
            return;
        }

        that._resizeEventFired = true;
        that._validateItemSize();
        that._resizeEventFired = false
    }

    /**
     * Resize the host item when inserting a new one inside it
     * @param {any} hostItem
     */
    _resizeHostItemOnInsert(hostItem, newItem, splitterBar) {
        const that = this;

        if (that.autoFitMode === 'proportional') {
            that._autoFitItemsProportionally(newItem, splitterBar);
            return;
        }

        if (!hostItem || hostItem.locked || that.autoFitMode === 'overflow') {
            return;
        }

        if (newItem.size) {
            const itemWithoutSize = function () {
                let item = newItem.previousElementSibling;

                while (item) {
                    if (item instanceof LW.SplitterItem && !item.size) {
                        return item;
                    }

                    item = item.previousElementSibling;
                }
            }();

            hostItem = itemWithoutSize || hostItem;
        }

        const hostItemNewSize = hostItem[that._measurements.size] - newItem[that._measurements.size] - splitterBar[that._measurements.size],
            hostItemSize = Math.max(hostItem._sizeLimits[that._measurements.minDimension], hostItemNewSize);

        hostItem.style[that._measurements.maxDimension] = hostItem.max ?
            isNaN(parseFloat(hostItem.max)) ? '' : (parseFloat(hostItem.max) + typeof hostItem.max === 'string' && hostItem.max.indexOf('%') > -1 ? '%' : 'px') : '';

        //StyleChanged not fired yet
        const hostItemMax = hostItem.style[that._measurements.maxDimension] ? parseFloat(hostItem.style[that._measurements.maxDimension]) : 0;

        if (newItem.size) {
            hostItem.style[that._measurements.dimension] = (hostItem._sizeBeforeCollapse = hostItemMax ?
                Math.min(hostItemMax, hostItemSize) : hostItemSize) + 'px';
        }
        else {
            hostItem.style[that._measurements.dimension] = hostItem.size ? (hostItem.size === 'auto' ? hostItem.size :
                isNaN(parseFloat(hostItem.size)) ? 0 : parseFloat(hostItem.size) + (typeof hostItem.size === 'string' && hostItem.size.indexOf('%') > -1 ? '%' : 'px')) : '';
            hostItem._sizeBeforeCollapse = hostItem[that._measurements.size];
        }
    }

    /**
     * Resize a single item
     * @param {any} event
     * @param {any} distance
     * @param {any} offset
     */
    _resizeItem(event, distance, offset) {
        const that = this;

        //Validate min accoridng to first Item
        let newSize = Math.max(that._dragDetails.firstItem._sizeLimits[that._measurements.minDimension],
            Math.min(that._dragDetails.splitAreaSize - that._dragDetails.secondItem._sizeLimits[that._measurements.minDimension],
                that._dragDetails.firstItem._sizeLimits[that._measurements.maxDimension] ?
                    Math.min(that._dragDetails.firstItem._sizeLimits[that._measurements.maxDimension],
                        that._dragDetails.firstItem.currentSize + distance) : that._dragDetails.firstItem.currentSize + distance));
        let minSize = that._dragDetails.firstItem._sizeLimits[that._measurements.minDimension];

        if (that._dragDetails.secondItem._sizeLimits[that._measurements.maxDimension] &&
            that._dragDetails.splitAreaSize - newSize > that._dragDetails.secondItem._sizeLimits[that._measurements.maxDimension]) {
            minSize = newSize = that._dragDetails.splitAreaSize - that._dragDetails.secondItem._sizeLimits[that._measurements.maxDimension];
        }

        that._dragDetails.firstItem.currentSize = newSize;

        if (that.liveResize) {
            that._dragDetails.firstItem.style[that._measurements.dimension] = (that._dragDetails.firstItem._sizeBeforeCollapse = newSize + that._dragDetails.firstItem._paddings) + 'px';
            that._dragDetails.secondItem.style[that._measurements.dimension] =
                (that._dragDetails.secondItem._sizeBeforeCollapse = that._dragDetails.splitAreaSize - newSize + that._dragDetails.firstItem._paddings) + 'px';

            //Reset the original size
            delete that._dragDetails.firstItem._originalSize;
            delete that._dragDetails._originalSize;
        }
        else {
            //TODO: Doesn't include collpased items offset
            that._splitBarDummy.style[that._measurements.position] = (that._dragDetails.firstItem[that._measurements.offset] + newSize + that._dragDetails.lockedItemsSize + that._dragDetails.firstItem._paddings) + 'px';
        }

        const edge = that._dragDetails.firstItem.getBoundingClientRect()[that.orientation === 'vertical' ? 'left' : 'top'] + that._dragDetails.splitBarOffset;

        that._dragDetails.position = Math.max(edge + minSize + that._dragDetails.firstItem._paddings,
            Math.min(edge + that._dragDetails.splitAreaSize - that._dragDetails.secondItem._sizeLimits[that._measurements.minDimension]
                + that._dragDetails.lockedItemsSize + that._dragDetails.firstItem._paddings,
                event[that._measurements.pagePosition] - offset));

        if (that._dragDetails.firstItem._sizeLimits[that._measurements.maxDimension]) {
            that._dragDetails.position = Math.min(edge + that._dragDetails.firstItem._sizeLimits[that._measurements.maxDimension], that._dragDetails.position)
        }
    }

    /**
    * Sets tab index
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.removeAttribute('tabindex');
            return;
        }

        that.tabIndex = that.tabIndex > 0 ? that.tabIndex : 0;
    }

    /**
     * Set drag details for a splitter item
     * @param {any} event
     */
    _setDragDetails(target, event) {
        const that = this;

        that._dragDetails = {};

        if (!that._measurements) {
            that._setMeasurements();
        }

        that._dragDetails.scrollAmount = target.parentElement[that._measurements.scroll];
        that._dragDetails.lockedItemsSize = 0;

        that.setAttribute('show-locked-items', '');

        if (!(that._dragDetails.firstItem = that._getTargetItem(target, 'previousElementSibling'))) {
            delete that._dragDetails;
            that.setAttribute('dragging-not-allowed', '');
            return;
        }

        that._dragDetails.firstItem.set('size', '');

        that._dragDetails.firstItem.currentSize = that._dragDetails.firstItem[that._measurements.size];
        that._dragDetails.firstItem.originalSize = that._dragDetails.firstItem.currentSize;

        let computedStyle = getComputedStyle(that._dragDetails.firstItem);

        that._dragDetails.firstItem._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position)) || 0) +
            (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position2)) || 0);

        //if (that._dragDetails.firstItem.currentSize < that._dragDetails.firstItem._sizeLimits[that._measurements.minDimension]) {
        //    delete that._dragDetails;
        //    return;
        //}

        that._dragDetails.firstItem.currentSize -= that._dragDetails.firstItem._paddings;

        that._dragDetails.splitAreaSize = 0;
        that._dragDetails.secondItemTotalMaxSize = 0;
        that._dragDetails.secondItemTotalMinSize = 0;

        if (that.resizeMode === 'proportional') {
            if (that._setProportionalDetails()) {
                return;
            }
        }
        else {
            if (that._setAdjacentOrEndDetails(target)) {
                return;
            }
        }

        let splitterBarPagePosition;

        if (!event || typeof (event) !== 'object') {
            event = { pageX: target[that._measurements.offset], pageY: target[that._measurements.offset] };
            splitterBarPagePosition = target[that._measurements.offset];
        }
        else {
            splitterBarPagePosition = target.getBoundingClientRect()[that._measurements.position];
        }

        that._dragDetails.position = event[that._measurements.pagePosition];
        that._dragDetails.splitBarOffset = that._dragDetails.position - splitterBarPagePosition;

        if (that.liveResize) {
            return;
        }

        if (!that._splitBarDummy) {
            that._splitBarDummy = document.createElement('div');
            that._splitBarDummy.classList.add('lw-splitter-bar-feedback');
            that._splitBarDummy.setAttribute(that.orientation, '');
        }

        that._splitBarDummy.style.width = target.offsetWidth + 'px';
        that._splitBarDummy.style.height = target.offsetHeight + 'px';
        that._splitBarDummy.style.top = target.offsetTop + 'px';
        that._splitBarDummy.style.left = target.offsetLeft + 'px';
        that._splitBarDummy.setAttribute(that.orientation, '');
        target.parentElement.appendChild(that._splitBarDummy);
    }

    /**
     * Sets the drag details when resizeMode === 'adjacent' or 'end'
     */
    _setAdjacentOrEndDetails(target) {
        const that = this;

        if (!(that._dragDetails.secondItem = (that.resizeMode === 'adjacent' ?
            that._getTargetItem(target, 'nextElementSibling') : that._getTargetItem(target, 'previousElementSibling', true)))) {
            delete that._dragDetails;
            that.setAttribute('dragging-not-allowed', '');
            return true;
        }

        that._dragDetails.secondItem.set('size', '');

        that._dragDetails.secondItem.currentSize = that._dragDetails.secondItem[that._measurements.size];
        that._dragDetails.secondItem.originalSize = that._dragDetails.secondItem.currentSize;

        const computedStyle = getComputedStyle(that._dragDetails.secondItem);

        that._dragDetails.secondItem._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position)) || 0) +
            (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position2)) || 0);

        that._dragDetails.secondItem.currentSize -= that._dragDetails.secondItem._paddings;

        that._dragDetails.splitAreaSize = that._dragDetails.firstItem.currentSize + that._dragDetails.secondItem.currentSize;
        that._dragDetails.secondItemTotalMaxSize = that._dragDetails.secondItem._sizeLimits[that._measurements.maxDimension];
        that._dragDetails.secondItemTotalMinSize = that._dragDetails.secondItem._sizeLimits[that._measurements.minDimension];
    }

    /**
     * Sets the measurement object that will be used during resizing
     */
    _setMeasurements() {
        const that = this;

        that._measurements = {};

        if (that.orientation === 'horizontal') {
            that._measurements.dimension = 'height';
            that._measurements.minDimension = 'minHeight';
            that._measurements.maxDimension = 'maxHeight';
            that._measurements.restricredDimension = 'Width';
            that._measurements.size = 'offsetHeight';
            that._measurements.offset = 'offsetTop';
            that._measurements.position = 'top';
            that._measurements.position2 = 'bottom';
            that._measurements.pagePosition = 'pageY';
            that._measurements.scroll = 'scrollTop';
        }
        else {
            that._measurements.dimension = 'width';
            that._measurements.minDimension = 'minWidth';
            that._measurements.maxDimension = 'maxWidth';
            that._measurements.restricredDimension = 'Height';
            that._measurements.size = 'offsetWidth';
            that._measurements.offset = 'offsetLeft';
            that._measurements.position = 'left';
            that._measurements.position2 = 'right';
            that._measurements.pagePosition = 'pageX';
            that._measurements.scroll = 'scrollLeft';
        }

        that._measurements.overflow = getComputedStyle(that).getPropertyValue('overflow');
    }

    /**
     * Sets the dragging details when resizeMode = 'proportional'
     */
    _setProportionalDetails() {
        const that = this;

        that._dragDetails.secondItem = that._items.slice(that._items.indexOf(that._dragDetails.firstItem) + 1).filter(item => !item.collapsed && !item.locked);

        if (that._dragDetails.secondItem.length === 0) {
            delete that._dragDetails;
            return true;
        }

        that._dragDetails.splitAreaSize += that._dragDetails.firstItem.currentSize;
        that._dragDetails.itemProportions = [];

        let noMaxLimit;

        for (let i = 0; i < that._dragDetails.secondItem.length; i++) {
            that._dragDetails.secondItem[i].set('size', '');
            that._dragDetails.secondItem[i].currentSize = that._dragDetails.secondItem[i][that._measurements.size];
            that._dragDetails.secondItem[i].originalSize = that._dragDetails.secondItem[i].currentSize

            const computedStyle = getComputedStyle(that._dragDetails.secondItem[i]);

            that._dragDetails.secondItem[i]._paddings = (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position)) || 0) +
                (parseFloat(computedStyle.getPropertyValue('padding-' + that._measurements.position2)) || 0);

            that._dragDetails.secondItem[i].currentSize -= that._dragDetails.secondItem[i]._paddings;

            that._dragDetails.splitAreaSize += that._dragDetails.secondItem[i].currentSize;
            that._dragDetails.itemProportions.push({
                item: that._dragDetails.secondItem[i],
                currentSize: that._dragDetails.secondItem[i].currentSize
            });

            if (!that._dragDetails.secondItem[i]._sizeLimits[that._measurements.maxDimension]) {
                noMaxLimit = true;
            }

            that._dragDetails.secondItemTotalMinSize += that._dragDetails.secondItem[i]._sizeLimits[that._measurements.minDimension];
            that._dragDetails.secondItemTotalMaxSize += that._dragDetails.secondItem[i]._sizeLimits[that._measurements.maxDimension];
        }

        if (noMaxLimit) {
            that._dragDetails.secondItemTotalMaxSize = 0;
        }
    }

    /**
     * Validates the size of the Splitter Bars inside the Splitter
     */
    _validateBarsSize() {
        const that = this;

        //Check if size of the SplitterBar is explicitly set
        if ((getComputedStyle(that).getPropertyValue('--lw-splitter-bar-fit-size') + '').trim() !== '100%') {
            that.bars.forEach(bar => bar.style[that._measurements.restricredDimension.toLowerCase()] = null);
            return;
        }

        //NOTE: Checks if the Splitter has height 'auto'
        if (!that._dragDetails && that.orientation === 'vertical' && that.resizeTrigger) {
            const splitterSize = that.offsetHeight;

            that.resizeTrigger.style.display = 'none';

            if (that.offsetHeight !== splitterSize) {
                that.resizeTrigger.style.display = null;
                return;
            }

            that.resizeTrigger.style.display = null;
        }

        let biggestItem = that._items[0];
        const size = 'offset' + that._measurements.restricredDimension,
            bars = that.bars;

        if (bars.length === 0) {
            return;
        }

        for (let i = 0; i < that._items.length; i++) {
            if (that._items[i][size] > biggestItem[size]) {
                biggestItem = that._items[i];
            }
        }

        if (!biggestItem) {
            return;
        }

        if (biggestItem[size] !== bars[0][size]) {
            bars.map(bar => bar.style[that._measurements.restricredDimension.toLowerCase()] = biggestItem[size] + 'px');
        }
    }

    /**
    * Validates the sizes of the Splitter items and resizes them to fit if the overflow is set to 'none' or 'visible'
    */
    _validateItemSize(noStyleChangedIgnoring) {
        const that = this;

        if (that.autoFitMode === 'overflow') {
            return;
        }

        const items = that._items,
            dimension = that._measurements.dimension,
            containerSize = that.$.container.getBoundingClientRect()[dimension],
            isPercentage = (sizeProperty) => typeof sizeProperty === 'string' && sizeProperty.indexOf('%') > -1;
        let totalItemSize = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            //Refresh min/max if in percentages
            if (item.min && isPercentage(item.min)) {
                item._sizeLimits[that._measurements.minDimension] = parseFloat(item.min) * containerSize / 100;
            }

            if (item.max && isPercentage(item.max)) {
                item._sizeLimits[that._measurements.maxDimension] = parseFloat(item.max) * containerSize / 100;
            }

            if (!item.collapsed) {
                const sizeApplied = item.style[dimension];

                totalItemSize += (sizeApplied && sizeApplied.indexOf('%') < -1 && item._sizeBeforeCollapse ?
                    item._sizeBeforeCollapse : item.getBoundingClientRect()[dimension])
            }
        }

        if (that.keepProportionsOnResize && that._resizeEventFired) {
            that._keepItemProportionsOnResize();
        }
        else {
            //NOTE: Checks if the Splitter has height 'auto'
            if (that.orientation === 'horizontal' && that.resizeTrigger) {
                const splitterSize = that.offsetHeight;

                that.resizeTrigger.style.display = 'none';

                if (that.offsetHeight !== splitterSize) {
                    that.resizeTrigger.style.display = null;
                    return;
                }

                that.resizeTrigger.style.display = null;
            }

            const totalBarsSize = that.bars.reduce((acc, bar) => acc + bar[that._measurements.size], 0);

            let sizeDifference = totalItemSize + totalBarsSize - containerSize;

            if (sizeDifference > 0) {
                that._validateItemsSizeOverflowing(sizeDifference, noStyleChangedIgnoring);
            }
            else if (sizeDifference < 0) {
                that._validateItemsSizeUnderflowing(sizeDifference, noStyleChangedIgnoring);
            }
        }

        that._autoFitItems();

        //Should be called only when Splitter's width is 'auto'
        that._validateBarsSize();

        //Keeping the last valid splitter size
        that._splitterSize = containerSize;

        //NOTE: Elements in ShadowDOM get initialized in reverse order ( from outher to inner elements). That's why this is necessary.
        if (that.enableShadowDOM) {
            const host = that.getRootNode().host;

            if (host && host.enableShadowDOM && host.isCompleted && host._validateItemSize) {
                host._validateItemSize();
            }
        }
    }

    /**
     * Validates the min/max properties of the neighbour items
     * @param {any} item
     */
    _validateNeighbourSizeLimits(item) {
        const that = this;

        function checkLimits(neighbourItem) {
            if (!neighbourItem) {
                return;
            }

            if (neighbourItem.min) {
                neighbourItem._setSize('min', neighbourItem.min, true);
            }

            if (neighbourItem.max) {
                neighbourItem._setSize('max', neighbourItem.max, true);
            }
        }

        if (!that._items || !that._items.length) {
            return;
        }

        that._noNeighbourValidation = true;

        const itemIndex = that._items.indexOf(item);

        //Previous item
        checkLimits(that._items[itemIndex - 1]);

        //Next item
        checkLimits(that._items[itemIndex + 1]);

        delete that._noNeighbourValidation;
    }

    /**
     * Keeps the same proportion of the items during resizing. Handles the keepProportionsOnResize proeprty
     */
    _keepItemProportionsOnResize() {
        const that = this;
        let currentItemsSize = 0,
            resizableItems = [];

        for (let i = 0; i < that._items.length; i++) {
            if (that._items[i].collapsed) {
                continue;
            }

            resizableItems.push(that._items[i]);
            currentItemsSize += that._items[i]._sizeBeforeCollapse || that._items[i][that._measurements.size];
        }

        if (that._splitterSize) {
            currentItemsSize = that._splitterSize;
        }

        if (that._items.length === 1) {
            return;
        }

        const splitterSizeAfterResize = that.$.container.getBoundingClientRect()[that._measurements.dimension];

        for (let i = 0; i < resizableItems.length; i++) {
            const resizableItem = resizableItems[i],
                itemSize = resizableItem.style[that._measurements.dimension],
                itemMin = resizableItem.style[that._measurements.minDimension];

            if (itemSize.indexOf('%') > -1 || itemMin.indexOf('%') > -1) {
                that._validateItemLimits(resizableItem, resizableItem[that._measurements.size] / currentItemsSize * splitterSizeAfterResize);
                continue;
            }

            const currentSize = (resizableItem._sizeBeforeCollapse || resizableItem[that._measurements.size]),
                newSize = currentSize / currentItemsSize * splitterSizeAfterResize;

            if (currentSize === newSize) {
                continue;
            }

            resizableItem.style[that._measurements.dimension] = newSize + 'px';

            //Splitter has no fixed size
            if (splitterSizeAfterResize !== that.$.container.getBoundingClientRect()[that._measurements.dimension]) {
                resizableItem.style[that._measurements.dimension] = currentSize + 'px';
                return;
            }

            resizableItem.style[that._measurements.dimension] = (resizableItem._sizeBeforeCollapse = newSize) + 'px';
            that._validateItemLimits(resizableItem, newSize);
        }
    }

    /**
     * Validates and recalculates the sizes of the items if they overflow the container
     */
    _validateItemsSizeOverflowing(sizeDifference, noStyleChangedIgnoring) {
        const that = this,
            itemsCount = that._items.length;
        let newSize = 0,
            initialSize, itemsLocked = [], currentSize, currentlySetSize, lastLockedItem,
            containerRect = that.$.container.getBoundingClientRect();

        for (let i = 0; i < that._items.length; i++) {
            const item = that._items[i];

            //Note: If the size is set in percentages via CSS, it's not possible check if it's really percentages or not 
            //because even getComputedStyle returns the computed size not the original.
            //The only way to work is by setting the size property to a percentage value !
            currentlySetSize = item.style[that._measurements.dimension];

            if (!currentlySetSize) {
                //NOTE: Can't get the original CSS width/height of an item unless it is a CSS variable!
                //Checks the variable for the width/height of the items for a value
                currentlySetSize = window.getComputedStyle(that).getPropertyValue('--lw-splitter-item-size') || '';
            }

            currentSize = currentlySetSize.indexOf('%') > -1 ? currentlySetSize : item[that._measurements.size];

            if (!currentlySetSize && !item.size && item.size !== 0) {
                delete item._originalSize;
            }

            const isAuto = (currentSize === 'auto' && item.size && isNaN(parseFloat(item.size))) || item.size === 'auto';

            item._originalSize = item._originalSize && !isAuto ? item._originalSize : currentSize;

            itemsLocked.push(item.locked);
        }

        if (itemsLocked.indexOf(false) < 0) {
            lastLockedItem = that._items[that._items.length - 1];
            lastLockedItem.locked = false;
        }

        //Check how many items should be resized to fit
        for (let i = itemsCount - 1; i >= 0; i--) {
            const item = that._items[i];

            if (item.collapsed || item.locked || sizeDifference === 0) {
                continue;
            }

            if ((item._originalSize + '').indexOf('%') > -1) {
                initialSize = item.style[that._measurements.dimension] || item[that._measurements.size];

                if (typeof initialSize === 'string' && initialSize.indexOf('%') > -1) {
                    initialSize = parseFloat(initialSize) / 100 * containerRect[that._measurements.dimension];
                }

                item.style[that._measurements.dimension] = item._originalSize;
                item._sizeBeforeCollapse = containerRect[that._measurements.dimension] * parseFloat(item._originalSize) / 100;

                sizeDifference -= parseFloat(initialSize) - item._sizeBeforeCollapse;
                continue;
            }

            //Doesn't include the item paddings
            initialSize = item.getBoundingClientRect()[that._measurements.dimension];

            newSize = initialSize - sizeDifference;

            //May trigger the styleChanged event
            item.style[that._measurements.dimension] =
                (item._sizeBeforeCollapse = Math.max(item._sizeLimits ? item._sizeLimits[that._measurements.minDimension] : 0, newSize)) + 'px';

            sizeDifference -= initialSize - item._sizeBeforeCollapse;
        }

        //Reduce the min-sizes if necessary
        if (sizeDifference > 0) {
            for (let i = itemsCount - 1; i >= 0; i--) {
                const item = that._items[i];

                if (item.collapsed || item.locked) {
                    continue;
                }

                initialSize = item.getBoundingClientRect()[that._measurements.dimension];
                newSize = initialSize - sizeDifference;

                let itemMin = item._sizeLimits[that._measurements.minDimension] || item.min;

                if (itemMin) {
                    if ((itemMin + '').indexOf('%') > -1) {
                        itemMin = parseFloat(itemMin) / 100 * item.parentElement[that._measurements.size];
                    }
                    else {
                        itemMin = parseFloat(itemMin);
                    }

                    if (itemMin > newSize) {
                        //Ignore the StyleChanged event
                        item._sizeLimits.ignoreUpdate = noStyleChangedIgnoring ? false : true;
                        item.style[that._measurements.minDimension] = Math.max(0, newSize) + 'px';
                    }
                }

                if (sizeDifference === 0 && item._originalSize && (item._originalSize + '').indexOf('%') > -1) {
                    continue;
                }

                item._sizeLimits.ignoreUpdate = noStyleChangedIgnoring ? false : true;
                item.style[that._measurements.dimension] = (item._sizeBeforeCollapse = Math.max(0, newSize)) + 'px';

                sizeDifference -= initialSize - item._sizeBeforeCollapse;
            }
        }

        if (lastLockedItem) {
            lastLockedItem.locked = true;
        }
    }

    /**
     * Validates the sizes of the items if the're underflowing the container ( should fit )
     */
    _validateItemsSizeUnderflowing(sizeDifference, noStyleChangedIgnoring) {
        const that = this,
            itemsCount = that._items.length;
        let newSize = 0,
            initialSize, lastLockedItem;

        sizeDifference = Math.abs(sizeDifference);

        if (that._items.length > 0 && that._items.map(item => item.locked).indexOf(false) < 0) {
            lastLockedItem = that._items[that._items.length - 1];
            lastLockedItem.locked = false;
        }

        //Increase the min-size of the items if it has been changed
        for (let i = 0; i < itemsCount; i++) {
            const item = that._items[i];

            if (item.collapsed || item[that._measurements.size] >= (item._sizeLimits ? item._sizeLimits[that._measurements.minDimension] : 0)) {
                continue;
            }

            initialSize = item[that._measurements.size];
            newSize = item[that._measurements.size] + sizeDifference;

            if (item[that._measurements.size] < item._sizeLimits[that._measurements.minDimension]) {
                //Ignore the StyleChanged event
                item._sizeLimits.ignoreUpdate = noStyleChangedIgnoring ? false : true;
                item.style[that._measurements.minDimension] =
                    (item._sizeBeforeCollapse = Math.max(0, Math.min(item._sizeLimits[that._measurements.minDimension], newSize))) + 'px';
            }

            sizeDifference -= (item._sizeBeforeCollapse || item[that._measurements.size]) - initialSize;

            if (sizeDifference <= 0) {
                break;
            }
        }

        const containerSize = that.$.container.getBoundingClientRect()[that._measurements.dimension];

        if (sizeDifference > 0) {
            for (let i = 0; i < itemsCount; i++) {
                const item = that._items[i];
                let usedSize;

                if (item.collapsed || item.locked || item._originalSize === undefined) {
                    continue;
                }

                if ((item._originalSize + '').indexOf('%') > -1) {
                    const sizeInPxls = (parseFloat(item._originalSize) * containerSize) / 100;

                    newSize = Math.min(sizeInPxls, item[that._measurements.size] + sizeDifference);

                    usedSize = newSize - item[that._measurements.size];

                    if (item[that._measurements.minDimension] < item._sizeLimits[that._measurements.minDimension]) {
                        item.style[that._measurements.minDimension] = Math.min(item._sizeLimits[that._measurements.minDimension], newSize) + 'px';
                    }

                    item.style[that._measurements.dimension] = sizeInPxls === newSize ? item._originalSize : newSize + 'px';
                    item._sizeBeforeCollapse = Math.max(0, newSize);
                    sizeDifference -= usedSize;
                }
                else if (item[that._measurements.size] >= item._originalSize) {
                    sizeDifference += item[that._measurements.size] - item._originalSize;
                    item.style[that._measurements.dimension] = (item._sizeBeforeCollapse = item._originalSize) + 'px';
                }
                else {
                    newSize = Math.min(item._originalSize, item[that._measurements.size] + sizeDifference);

                    usedSize = newSize - item[that._measurements.size];

                    if (item[that._measurements.minDimension] < item._sizeLimits[that._measurements.minDimension]) {
                        item.style[that._measurements.minDimension] = Math.min(item._sizeLimits[that._measurements.minDimension], newSize) + 'px';
                    }

                    item.style[that._measurements.dimension] = (item._sizeBeforeCollapse = Math.max(0, Math.min(newSize, item._originalSize))) + 'px';
                    sizeDifference -= usedSize;
                }

                if (sizeDifference <= 0) {
                    break;
                }
            }
        }

        if (lastLockedItem) {
            lastLockedItem.locked = true;
        }
    }
});