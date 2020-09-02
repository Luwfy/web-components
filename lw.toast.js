
LW('lw-toast-item', class ToastItem extends LW.ContentElement {
    /**
  * Element's properties
  */
    static get properties() {
        return {
            'showCloseButton': {
                value: false,
                type: 'boolean'
            },
            'iconClass': {
                value: null,
                type: 'string?'
            },
            'itemClass': {
                value: null,
                type: 'string?'
            },
            'opened': {
                value: false,
                type: 'boolean'
            }
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.toast.css'
        ]
    }

    /**
    *  Element template
    */
    template() {
        return `<div id="container" role="presentation">
                    <div class="lw-toast-item-header">
                        <span class="lw-toast-item-close-button" role="button" aria-label="Close"></span>
                    </div>
                    <div class="lw-toast-item-container" id="itemContainer">
                        <span class="lw-toast-item-icon" role="presentation"></span>
                        <span class="lw-toast-item-content" id="itemContent" inner-h-t-m-l="[[innerHTML]]">
                            <content></content>
                        </span>
                    </div>
                </div>`;
    }

    /**
* Updates the element when a property is changed.
* @param {string} propertyName The name of the property.
* @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
* @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
*/
    propertyChangedHandler(propertyName, oldValue, newValue) {
        switch (propertyName) {
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
    * Renders the element
    */
    render() {
        const that = this,
            iconClass = that.iconClass;

        that.setAttribute('role', 'alert');

        if (that.itemClass) {
            that.className += ' ' + that.itemClass;
        }

        that.$.itemContainer.firstElementChild.className += ' ' + (iconClass ? iconClass : 'default');

        super.render();
    }

    /**
   * Appends a node to the item
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

        that.$.itemContent.appendChild(node);
    }

    /**
    * Inserts a node before another node inside the item.
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

        that.$.itemContent.insertBefore(node, referenceNode || null);
    }

    /**
    * Removes a child from the item.
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

        that.$.itemContent.removeChild(node);
    }
})


/**
* lwToast custom element.
*/
LW('lw-toast', class Toast extends LW.ContentElement {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'appendTo': {
                value: null,
                type: 'any'
            },
            'autoClose': {
                value: false,
                type: 'boolean'
            },
            'autoCloseDelay': {
                value: 3000,
                type: 'number'
            },
            'autoOpen': {
                value: false,
                type: 'boolean'
            },
            'iconClass': {
                value: null,
                type: 'string?'
            },
            'itemClass': {
                value: null,
                type: 'string?'
            },
            'itemTemplate': {
                value: null,
                type: 'string?'
            },
            'modal': {
                value: false,
                type: 'boolean'
            },
            'position': {
                allowedValues: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                value: 'top-right',
                type: 'string'
            },
            'showCloseButton': {
                value: false,
                type: 'boolean'
            },
            'type': {
                allowedValues: ['info', 'warning', 'success', 'error', 'mail', 'time', null],
                value: 'info',
                type: 'string?'
            },
            'value': {
                value: '',
                type: 'any'
            }
        }
    }

    /**
    * ShadowDOM enable/disable flag
    */
    get enableShadowDOM() {
        return false;
    }

    /**
    * Tab Items Group's HTML template.
    */
    template() {
        return '';
    }

    /**
    * Updates the element when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        switch (propertyName) {
            case 'value': {
                const item = that._instances[that._instances.length - 1];

                if (item) {
                    if (newValue instanceof HTMLElement) {
                        item.appendChild(newValue);
                    }
                    else {
                        (item.shadowRoot ? item.shadowRoot : item).querySelector('.lw-toast-item-content').innerHTML = newValue;
                    }
                }

                break;
            }
            case 'appendTo':
            case 'modal':
            case 'position':
                that._handleContainers();
                break;
            case 'rightToLeft':
                if (that._instances) {
                    that._instances.forEach(item => item[propertyName] = newValue);
                }
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
     * Called when the element is attached to the DOM.
     */
    attached() {
        super.attached();

        const that = this,
            containers = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'Custom', 'Modal'];

        for (let i = 0; i < containers.length; i++) {
            const itemContainer = that.$['toastContainer' + containers[i]];

            if (itemContainer && itemContainer.children.length) {
                if (containers[i] === 'Custom') {
                    that._appendTo.appendChild(that._container);
                }
                else {
                    that.getShadowRootOrBody().appendChild(itemContainer);
                }
            }
        }
    }

    /**
    * Called when the element is detached from the DOM.
    */
    detached() {
        super.detached();

        const that = this,
            containers = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'Custom', 'Modal'];

        for (let i = 0; i < containers.length; i++) {
            const itemContainer = that.$['toastContainer' + containers[i]];

            if (itemContainer) {
                that._removeContainerListeners(itemContainer);
                itemContainer.parentElement.removeChild(itemContainer);
            }

            that.closeAll();
        }
    }

    /**
    * Element's ready method.
    */
    ready() {
        super.ready();
    }

    render() {
        const that = this;

        if (that.value && !(that.value instanceof HTMLElement)) {
            that.innerHTML = that.value;
        }
        else {
            that.value = that.innerHTML;
        }

        that._instances = [];

        if (that.autoOpen) {
            that.open();
        }

        super.render();
    }

    /**
    * Closes all opened toast items
    */
    closeAll() {
        const that = this;

        for (var i = that._instances.length - 1; i > -1; i--) {
            that._close(that._instances[i]);
        }
    }

    /**
    * Closes particular item
    */
    closeItem(instance) {
        const that = this;

        if (!instance || that._instances.length === 0) {
            return;
        }

        if (typeof instance === 'string') {
            instance = document.getElementById(instance);
        }
        else if (instance instanceof HTMLElement) {
            instance = instance.closest('lw-toast-item');
        }

        if (!instance || that._instances.indexOf(instance) === -1) {
            return;
        }

        that._close(instance);
    }

    /**
    * Closes the last opened toast item
    */
    closeLast() {
        const that = this;

        if (that._instances.length > 0) {
            that._close(that._instances[that._instances.length - 1]);
        }
    }

    /**
     * Opens a new toast item instance
     */
    open() {
        const that = this;

        if (that.disabled) {
            return;
        }

        that._handleContainers();

        let item = document.createElement('lw-toast-item');

        item.iconClass = that.iconClass;
        item.itemClass = that.itemClass;

        if (that.value instanceof HTMLElement) {
            item.appendChild(that.value);
        }
        else {
            item.innerHTML = that._handleItemTemplate() || that.value;
        }

        item.rightToLeft = that.rightToLeft;
        item.theme = that.theme;
        item.animation = that.animation;
        item.showCloseButton = that.showCloseButton

        for (let i = 0; i < that.classList.length; i++) {
            if (that.classList[i].indexOf('lw-') < 0) {
                item.classList.add(that.classList[i]);
            }
        }

        that._container.appendChild(item);

        if (that.type) {
            const icon = item.querySelector('.lw-toast-item-icon');

            item.classList.add(that.type);

            if (icon) {
                icon.setAttribute('aria-label', that.type + ' icon');
            }
        }

        item._parent = that._container;
        that._instances.push(item);
        that.$.fireEvent('open', { 'instance': item });

        setTimeout(function () {
            item.opened = true;
        }, 10);

        if (that.autoClose) {
            item._autoCloseTimeout = setTimeout(function () {
                that._close(item);
            }, that.autoCloseDelay);
        }

        return item;
    }

    /**
     * Container's click handler. Common for all toast containers
     */
    _containerClickHandler(event) {
        const that = this,
            target = event.target.shadowRoot ? event.composedPath()[0] : event.target,
            clickedButton = target.closest('.lw-toast-item-close-button'),
            clickedItem = (target.getRootNode().host || target).closest('lw-toast-item');

        if (clickedButton || clickedItem) {
            that.$.fireEvent('click', { 'instance': clickedItem, 'target': target });

            if (clickedButton) {
                that._close(clickedItem);
            }
        }
        else if (that.modal) {
            that.closeAll();
        }
    }

    /**
     * Closes (removes) an toast item instance
     */
    _close(instance) {
        const that = this;

        if (that._instances.indexOf(instance) > -1) {
            const closeTransitionDuration = window.getComputedStyle(instance, null).getPropertyValue('transition-duration'),
                interval = closeTransitionDuration.indexOf('ms') > -1 ? parseInt(closeTransitionDuration) : parseFloat(closeTransitionDuration) * 1000;

            instance.opened = false;
            that._instances.splice(that._instances.indexOf(instance), 1);

            setTimeout(function () {
                clearTimeout(instance._autoCloseTimeout);
                that.$.fireEvent('close', { 'instance': instance });

                if (instance.parentNode) {
                    instance.parentNode.removeChild(instance);
                }

                const parentContainer = instance._parent;

                if (parentContainer && !parentContainer.children.length && parentContainer.parentElement) {
                    that._removeContainerListeners(parentContainer);
                    parentContainer.parentElement.removeChild(parentContainer);
                }
            }, interval);
        }
    }

    /**
     * Handles the contaner in use, where all new items will be stored
     */
    _handleContainers() {
        const that = this;
        let customContainer;

        if (typeof that.appendTo === 'string') {
            customContainer = document.getElementById(that.appendTo);
        }
        else if (that.appendTo instanceof HTMLElement) {
            customContainer = that.appendTo;
        }

        //Get or create the toast items container
        that._container = that._getToastContainer(customContainer);

        if (customContainer) {
            that._appendTo = customContainer;

            if (!that._container.parentElement) {
                //Add events listeners
                that._addContainerListeners(that._container);
                that._appendTo.appendChild(that._container);
            }

            return;
        }

        if (!customContainer && that.$.toastContainerCustom && !that.$.toastContainerCustom.children.length) {
            that._removeContainerListeners(that.$.toastContainerCustom);

            if (that.$.toastContainerCustom.parentElement) {
                that.$.toastContainerCustom.parentElement.removeChild(that.$.toastContainerCustom);
            }
        }

        if (!that._container.parentElement) {
            //Add events listeners
            that._addContainerListeners(that._container);
            that.getShadowRootOrBody().appendChild(that._container);
        }
    }

    /**
     * Adds event listeners to the toast item container
     * @param {any} container
     */
    _addContainerListeners(container) {
        const that = this;

        if (!container) {
            return;
        }

        const containerId = container.getAttribute('lw-id'),
            containerEvents = that['$' + containerId];

        if (containerEvents) {
            containerEvents.listen('click', that._containerClickHandler.bind(that));
            containerEvents.listen('swipeleft', that._swipeHandler.bind(that));
            containerEvents.listen('swiperight', that._swipeHandler.bind(that));
            containerEvents.listen('swipetop', that._swipeHandler.bind(that));
            containerEvents.listen('swipebottom', that._swipeHandler.bind(that));
        }
    }

    /**
     * Removes the event listeners from the toast item container
     * @param {any} container
     */
    _removeContainerListeners(container) {
        const that = this;

        if (!container) {
            return;
        }

        const containerId = container.getAttribute('lw-id'),
            containerEvents = that['$' + containerId];

        if (containerEvents) {
            containerEvents.unlisten('click');
            containerEvents.unlisten('swipeleft');
            containerEvents.unlisten('swiperight');
            containerEvents.unlisten('swipetop');
            containerEvents.unlisten('swipebottom');
        }
    }

    /**
     * Returns a toast items container
     * @param {any} customContainer
     */
    _getToastContainer(customContainer) {
        const that = this;

        let type;

        if (customContainer) {
            type = 'Custom';
        }
        else if (that.modal) {
            type = 'Modal';
        }
        else {
            type = LW.Utilities.Core.toCamelCase(that.position);
            type = type.charAt(0).toUpperCase() + type.slice(1);
        }

        const containerName = 'toastContainer' + type;

        if (!that.$[containerName]) {
            //Create it
            let container = document.createElement('div');

            container.setAttribute('lw-id', containerName);
            container.classList.add('lw-toast-container');
            container.classList.add('lw-toast-container-' + LW.Utilities.Core.toDash(type));

            that.$['toastContainer' + type] = container;
            that['$toastContainer' + type] = LW.Utilities.Extend(container);
        }

        return that.$[containerName];
    }

    /**
   * Apply the template to the toast.
   */
    _handleItemTemplate() {
        const that = this;
        let template = that.itemTemplate;

        if (!('content' in document.createElement('template'))) {
            that.error(that.localize('htmlTemplateNotSuported', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        if (!template) {
            return that.value;
        }

        template = document.getElementById(template);

        if (template === null || !('content' in template)) {
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase(), property: 'template' }));
            return;
        }

        const content = template.innerHTML,
            regex = /{{\w+}}/g;

        return content.replace(regex, that.value);
    }

    /**
    * SwipeLeft and SwipeRight event handler.
    **/
    _swipeHandler(event) {
        const that = this,
            instance = event.originalEvent.target.closest('lw-toast-item');

        event.stopPropagation();

        if (!instance) {
            return;
        }

        that.$.fireEvent(event.type, { 'instance': instance });
    }
});