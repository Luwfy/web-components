
LW('lw-layout', class Layout extends LW.ContentElement {
    /**
    * Element's properties
    */
    static get properties() {
        return {
            'contextMenuDataSource': {
                reflectToAttribute: false,
                value: ['delete'],
                type: 'any'
            },
            'dataSource': {
                reflectToAttribute: false,
                value: '',
                type: 'any'
            },
            'itemLabel': {
                value: 'Template',
                type: 'string'
            },
            'itemGroupLabel': {
                value: 'Layout',
                type: 'string'
            },
            'messages': {
                value: {
                    'en': {
                        'invalidNode': '{{elementType}}: "{{method}}" method accepts an object or an array of objects as it\'s second parameter.',
                        'invalidIndex': '{{elementType}}: "{{method}}" method accepts an index of type number.',
                        'delete': 'Delete',
                        'noId': '{{elementType}}: requires an id in order to save/load a state.'
                    }
                },
                type: 'object',
                extend: true
            },
            'liveResize': {
                value: false,
                type: 'boolean'
            },
            'orientation': {
                allowedValues: ['horizontal', 'vertical'],
                value: 'vertical',
                type: 'string'
            },
            'placeholder': {
                value: 'Empty',
                type: 'string'
            },
            'resizeStep': {
                value: 5,
                type: 'number'
            },
            'selectedIndex': {
                value: null,
                type: 'any'
            }
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'contextmenu': '_contextMenuHandler',
            'document.down': '_documentDownHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'document.selectstart': '_documentSelectStartHandler',
        }
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.Splitter': 'lw.splitter.js'
        }
    }

    /**
    * Element's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <lw-splitter id="itemsContainer" orientation="[[orientation]]" class="lw-items-container" theme="[[theme]]">
                        <lw-splitter-item><content></content></lw-splitter-item>
                    </lw-splitter>
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

        switch (propertyName) {
            case 'contextMenuDataSource':
                if (that._contextMenu) {
                    that._closeContextMenu();
                    that._contextMenu.innerHTML = '';
                }
                break;
            case 'dataSource':
                that._dataBind(true);
                break;
            case 'selectedIndex':
                that._handleItemSelection(that.getItem(newValue + ''), true);
                break;
            case 'liveResize':
            case 'resizeStep':
            case 'animation':
            case 'rightToLeft':
                that._applySplitterProperties(propertyName);
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
     * Element's render funciton
     */
    render() {
        const that = this;

        that.setAttribute('role', 'group');
        that._dataBind();
        that._applySplitterProperties(['liveResize', 'resizeStep', 'animation', 'rightToLeft']);
        that._handleItemSelection(that.getItem(that.selectedIndex + ''), true);
        that.checkLicense();

        Object.defineProperty(that, 'dataSource', {
            get: function () {
                if (that.context === that) {
                    return that.properties.dataSource.value;
                }
                else {
                    return that._getDataSource(that._getLayoutStruture());
                }
            },
            set(value) {
                that.updateProperty(that, that._properties.dataSource, value);
            }
        });

        super.render();
    }

    /**
     * * Appends a Splitter item to the element
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

        if (that.contains(node)) {
            return;
        }

        that.querySelector('lw-splitter:last-of-type').appendChild(node);
    }

    /**
     * Inserts a new Splitter Item before another inside the element
     * @param {any} node
     * @param {any} referenceNode
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

        if (!that.contains(referenceNode)) {
            return;
        }

        referenceNode.closest('lw-splitter').insertBefore(node, referenceNode);
    }

    /**
     * Removes a splitter item from the element
     */
    removeChild(node) {
        const that = this;

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node || !(node instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        if (!that.contains(node) || that.items.length === 1) {
            return;
        }

        node.closest('lw-splitter').removeChild(node);
    }

    /**
    * Returns an array of Splitter items that are inside the element
    */
    get items() {
        const that = this;

        //Note: if isReady is not checked, an error is thrown
        if (that.isReady) {
            return that.querySelectorAll('lw-splitter-item');
        }
    }

    /**
    * Returns the Splitter item according to the index
    * @param {any} index - string, e.g. '0.1'
    */
    getItem(index) {
        const that = this;

        if (index === undefined || index === null) {
            return;
        }

        index = (index + '').split('.');

        let items = that.$.itemsContainer.items, item;

        for (let i = 0; i < index.length; i++) {
            item = items[index[i]];

            if (!item) {
                break;
            }

            const firstSplitterChild = item.querySelector('lw-splitter');

            if (!firstSplitterChild) {
                items = [];
                continue;
            }

            items = firstSplitterChild.items;
        }

        return item;
    }

    /**
    * Returns the index of a Splitter item
    */
    getItemIndex(item) {
        const that = this;

        if (!item || !that.contains(item)) {
            return;
        }

        item = item.closest('lw-splitter-item');

        if (!item) {
            return;
        }

        let closestSplitter = item.closest('lw-splitter'),
            index = [];

        while (closestSplitter) {
            index.push(closestSplitter.items.indexOf(item));

            if (!item.parentElement) {
                break;
            }

            item = closestSplitter.closest('lw-splitter-item');

            if (!item) {
                break;
            }

            closestSplitter = item.closest('lw-splitter');
        }

        return index.reverse().join('.')
    }

    /**
     * Inserts a new item at position with index
     * @param {Object|LW.SplitterItem} item - the new Splitter item to be inserted
     * @param {string|LW.SplitterItem} index - the index to insert the new item at.
     */
    insert(item, index, position) {
        const that = this;
        let targetItem;

        if (typeof index === 'string' || typeof index === 'number') {
            targetItem = that.getItem(index + '');
        }

        if (!(targetItem instanceof LW.SplitterItem)) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'insert' }));
            return;
        }

        if (typeof item === 'object' && item.constructor === Object) {
            item = that._createLayoutItem(item);
        }

        if (!(item instanceof LW.SplitterItem) || that.contains(item)) {
            return;
        }

        that._createNewItem(targetItem, position, item);
        that.$.fireEvent('stateChange', { type: 'insert', item: item });
    }

    /**
     * Removes an item from the element
     * @param {any} item
     */
    removeItem(item) {
        const that = this;

        if (typeof item === 'string' || typeof item === 'number') {
            item = that.getItem(item + '');
        }

        if (!(item instanceof LW.SplitterItem) || !that.contains(item)) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'removeItem' }));
            return;
        }

        let targetSplitter = item.closest('lw-splitter');

        that._removeItem(targetSplitter, item);
        that.$.fireEvent('stateChange', { type: 'deleteItem', item: item });
    }

    /**
     * Removes all items from the element
     */
    removeAll() {
        const that = this;

        that._clearContent();

        const lastItem = that.$.itemsContainer.items[0];

        if (lastItem) {
            lastItem.innerHTML = that.placeholder;
        }
    }

    /**
     * Updates a Splitter item
     * @param {any} item - the target Splitter item
     * @param {any} settings - an object with settings
     */
    updateItem(item, settings) {
        const that = this;

        if (typeof item === 'string' || typeof item === 'number') {
            item = that.getItem(item + '');
        }

        if (!(item instanceof LW.SplitterItem) || !that.contains(item)) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'updateItem' }));
            return;
        }

        for (let prop in settings) {
            switch (prop) {
                case 'content':
                    that._setLayoutItemContent(item, settings)
                    break;
                case 'label':
                    item._label = settings[prop];
                    break;
                case 'root':
                    item._root = settings[prop];
                    break;
                case 'buttonPosition':
                    item._buttonPosition = settings[prop];
                    break;
                case 'readonly':
                case 'min':
                case 'max':
                case 'collapsible':
                case 'size':
                case 'locked':
                    item[prop] = settings[prop];
                    break;
                case 'orientation': {
                    const splitterParent = item.closest('lw-splitter');

                    if (splitterParent) {
                        splitterParent.orientation = settings[prop];
                    }

                    break;
                }
            }
        }
    }

    /**
    * Clears the previously saved state of the element
    */
    clearState() {
        const that = this;

        if (!that.id) {
            that.warn(that.localize('noId', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        window.localStorage.removeItem('lwLayout' + that.id);
    }

    /**
     * Loads a previously saved state of the element
     * @param {Array} previousState - a previously saved state of the Layout
     */
    loadState(previousState) {
        const that = this;

        if (!previousState) {
            if (!that.id) {
                that.warn(that.localize('noId', { elementType: that.nodeName.toLowerCase() }));
                return;
            }

            previousState = JSON.parse(window.localStorage.getItem('lwLayout' + that.id));
        }

        if (previousState) {
            that.set('dataSource', []);

            const originalContext = that.context;

            that.context = document;

            that.dataSource = previousState;

            that.context = originalContext;
        }
    }

    /**
     * Saves the Layout state to LocalStorage
     */
    saveState() {
        const that = this,
            currentState = JSON.stringify(that._getLayoutStruture());

        if (!that.id) {
            that.warn(that.localize('noId', { elementType: that.nodeName.toLowerCase() }));
        }
        else {
            window.localStorage.setItem('lwLayout' + that.id, currentState);
        }

        return JSON.parse(currentState);
    }

    /**
     * Selects an item
     * @param {any} item - a Splitter Item inside the element
     */
    select(item) {
        const that = this;

        if (typeof item === 'string' || typeof item === 'number') {
            item = that.getItem(item + '');
        }

        if (!(item instanceof LW.SplitterItem) || !that.contains(item)) {
            return;
        }

        that._handleItemSelection(item, true);
    }

    /**
     * Unselects the selected item
     */
    unselect() {
        const that = this;

        that._handleItemSelection();
    }

    /**
     * Applies the Splitter properties to all splitters inside the Layout
     * @param {Array} propertyNames - the names of the properties that should be applied 
     */
    _applySplitterProperties(propertyNames) {
        const that = this,
            splitter = that.querySelectorAll('lw-splitter');

        if (!Array.isArray(propertyNames)) {
            propertyNames = [propertyNames];
        }

        for (let i = 0; i < splitter.length; i++) {
            for (let p = 0; p < propertyNames.length; p++) {
                splitter[i][propertyNames[p]] = that[propertyNames[p]];
            }
        }
    }

    /**
     * Handles context menu opening
     * @param {any} event
     */
    _contextMenuHandler(event) {
        const that = this;
        let target = event.target;

        if (target.closest) {
            if (target.closest('.lw-layout-context-menu')) {
                //Prevent default context menu opening
                event.preventDefault();
                return;
            }

            if (target.closest('lw-splitter-bar')) {
                return;
            }

            target = target.closest('lw-splitter-item');

            if (!target || target.readonly) {
                return;
            }

            //Prevent default context menu opening
            event.preventDefault();

            that._createContextMenu();

            //Disable "delete" operation for Root items when there's no conent inside them so they don't get detached
            const items = that._contextMenu.children,
                totalSplitterItems = that.querySelectorAll('lw-splitter-item');

            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.getAttribute('value') !== 'delete') {
                    continue;
                }

                if ((target._root && (!target.innerHTML || target.innerHTML === that.placeholder)) ||
                    (totalSplitterItems.length === 1 && target === totalSplitterItems[0] && target.innerHTML === that.placeholder)) {
                    item.setAttribute('disabled', '');
                }
                else {
                    item.removeAttribute('disabled');
                }
            }

            that._openContextMenu(target, event.pageX, event.pageY);
        }
    }

    /**
     * Creates the context menu
     */
    _createContextMenu() {
        const that = this;
        let menu = that._contextMenu;

        if (!menu) {
            menu = document.createElement('div');

            menu.classList.add('lw-layout-context-menu', 'lw-visibility-hidden');
            that._contextMenu = menu;
        }

        if (!menu.innerHTML) {
            const contextMenuDataSource = that.contextMenuDataSource;

            for (let i = 0; i < contextMenuDataSource.length; i++) {
                const option = contextMenuDataSource[i];
                let label, value;

                if (typeof option === 'object') {
                    label = option.label;
                    value = option.value;
                }
                else {
                    value = label = option + '';
                }

                menu.innerHTML += `<div class="lw-layout-context-menu-item" value="${value}">${that.localize(label) || label}</div>`;
            }
        }
    }

    /**
     * Opens the context menu
     */
    _openContextMenu(target, x, y) {
        const that = this,
            menu = that._contextMenu;

        if (!menu || !menu.classList.contains('lw-visibility-hidden')) {
            return;
        }

        const openingEvent = that.$.fireEvent('opening');

        if (openingEvent.defaultPrevented) {
            return;
        }

        //Set the target Splitter item that opened the menu
        if (!target.parentElement) {
            return;
        }

        menu._target = target;
        that._opening = true;
        that.$.container.appendChild(menu);
        that._positionContextMenu(x, y);
        menu.classList.remove('lw-visibility-hidden');
        that.$.fireEvent('open');
    }

    /**
     * Closes the context menu
     */
    _closeContextMenu() {
        const that = this,
            menu = that._contextMenu;

        if (!menu || menu.classList.contains('lw-visibility-hidden')) {
            return;
        }

        const closingEvent = that.$.fireEvent('closing');

        if (closingEvent.defaultPrevented) {
            return;
        }

        delete that._opening;

        if (that.hasAnimation) {
            menu.addEventListener('transitionend', that._contextMenuTransitionEndHandler.bind(that), { once: true })
        }

        menu.classList.add('lw-visibility-hidden');
        that.$.fireEvent('close');
    }

    /**
     * Context menu Transitionend event handler
     * @param {any} event
     */
    _contextMenuTransitionEndHandler() {
        const that = this,
            menu = that._contextMenu;

        if (!menu || that._opening || !menu.parentElement) {
            return;
        }

        that.$.container.removeChild(menu);
    }

    /**
     * Clears the layout
     */
    _clearContent(preventEventFiring) {
        const that = this,
            itemsContainer = that.$.itemsContainer,
            items = itemsContainer.items,
            previouslySelectedIndex = that.selectedIndex;

        //Clears all content
        for (let i = 1; i < items.length; i++) {
            itemsContainer.removeChild(items[i])
        }

        items[0].clearContent();
        items[0].innerHTML = '';

        that.selectedIndex = null;

        if (!preventEventFiring) {
            that.$.fireEvent('change',
                {
                    'selectedIndex': that.selectedIndex,
                    'oldSelectedIndex': previouslySelectedIndex
                });
        }
    }

    /**
     * Positions the Context menu
     * @param {any} event
     */
    _positionContextMenu(x, y) {
        const that = this,
            menu = that._contextMenu;

        if (!menu) {
            return;
        }

        const layoutRect = that.$.container.getBoundingClientRect();

        x -= layoutRect.left + window.pageXOffset;
        y -= layoutRect.top + window.pageYOffset;

        if (x + menu.offsetWidth > layoutRect.width) {
            x -= x + menu.offsetWidth - layoutRect.width;
        }

        if (y + menu.offsetHeight > layoutRect.height) {
            y -= y + menu.offsetHeight - layoutRect.height;
        }

        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
    }

    /**
     * Document down handler
     * @param {any} event
     */
    _documentDownHandler(event) {
        const that = this,
            target = event.originalEvent.target;

        if (that.contains(target) && target.closest) {
            that._target = target;
        }
    }

    /**
     * Document move handler
     * @param {any} event
     */
    _documentMoveHandler(event) {
        const that = this,
            target = event.originalEvent.target,
            menu = that._contextMenu;

        if (menu && !LW.Utilities.Core.isMobile) {
            if (menu.querySelector('.lw-layout-context-menu-item[hover]')) {
                const items = menu.children;

                for (let i = 0; i < items.length; i++) {
                    items[i].removeAttribute('hover');
                }
            }

            if (menu.contains(target) && target.closest && target.closest('.lw-layout-context-menu-item')) {
                target.setAttribute('hover', '');
            }
        }
    }

    /**
     * Document up handler
     * @param {any} event
     */
    _documentUpHandler(event) {
        const that = this,
            isMobile = LW.Utilities.Core.isMobile,
            target = isMobile ? document.elementFromPoint(event.pageX - window.pageXOffset, event.pageY - window.pageYOffset) : event.originalEvent.target;

        if (that._target && !that._target.closest('lw-splitter-bar')) {
            that._handleItemSelection(target);
        }

        if (that._target) {
            if (that._target !== target) {
                delete that._target;
                return;
            }

            if (!event.button && target.closest('.lw-layout-buttons-container')) {
                that._handleButtonClick(target);
            }
            else if (target.closest('.lw-layout-context-menu') && (!isMobile && !event.button || isMobile)) {
                that._handleMenuItemClick(target.closest('.lw-layout-context-menu-item'));
            }

            delete that._target;
        }
    }

    /**
    * Document Select Start event handler
    */
    _documentSelectStartHandler(event) {
        const that = this;

        if (that._target) {
            event.preventDefault();
        }
    }

    /**
     * Handles the dataSource property
     */
    _dataBind(clearContent) {
        const that = this;

        if (!that.dataSource) {
            if (clearContent) {
                that._clearContent();
            }

            const items = that.$.itemsContainer.items;

            if (items.length === 1) {
                const item = items[0];

                if (!item.innerHTML || item.innerHTML === '<content></content>') {
                    item.innerHTML = that.placeholder;
                }
            }

            return;
        }

        if (typeof that.dataSource === 'string') {
            that.dataSource = JSON.parse(that.dataSource);
        }

        if (that.dataSource !== null && Array.isArray(that.dataSource)) {
            that._createItemsFromArray(that.dataSource);
        }
    }

    /**
    * Creates the layout items
    * @param {any} source
    * @param {any} retrieveContenent
    */
    _createItemsFromArray(data) {
        const that = this,
            dataLength = data.length;
        let item;

        that._clearContent(true);

        that.$.itemsContainer.autoFitMode = 'overflow';

        for (let i = 0; i < data.length; i++) {
            item = that._createLayoutItem(data[i], i === 0);

            if (item && !item.parentElement) {
                that.$.itemsContainer.appendChild(item);
            }
        }

        that.$.itemsContainer.autoFitMode = 'proportional';

        //NOTE: The size of the first Splitter item is removed after inserting a new item. So we re-apply it
        const firstItem = that.$.itemsContainer.items[0];

        if (firstItem && firstItem.size) {
            firstItem._setSize('size', firstItem.size)
        }

        //Check if itemContainer settings are applied
        if (!dataLength) {
            that.$.itemsContainer.items[0].placeholder = that.placeholder;
        }
    }

    /**
    * Creates the Layout items
    * @param {any} settings
    * @param {any} retrieveContent
    */
    _createLayoutItem(settings, isFirstItem) {
        if (!settings) {
            return;
        }

        const that = this;
        let item;

        if (isFirstItem) {
            item = that.$.itemsContainer.items[0];
        }
        else {
            item = document.createElement('lw-splitter-item');
        }

        that._setLayoutItemContent(item, settings);
        that._setItemProperties(item, settings);

        return item;
    }

    /**
     * Sets the content of the Splitter item
     * @param {any} item - a Splitter item instance
     * @param {any} settings - an object with properties and their values
     */
    _setLayoutItemContent(item, settings) {
        const that = this;
        let content = typeof settings === 'object' ? settings.content : settings;

        if (Array.isArray(content)) {
            //Allows to style the items through CSS on element initialization
            //that.$.itemsContainer.autoFitMode = 'end';
            const splitter = document.createElement('lw-splitter');

            that._applySplitterProperties(['liveResize', 'resizeStep', 'rightToLeft']);

            splitter.orientation = settings.orientation || that.orientation;

            const defaultItemSize = (100 / content.length) + '%';

            for (let i = 0; i < content.length; i++) {
                const newItem = that._createLayoutItem(content[i]);

                if (newItem) {
                    if (!content[i].size) {
                        content[i].size = defaultItemSize;
                    }

                    that._setItemProperties(newItem, content[i]);
                    splitter.appendChild(newItem);
                }
            }

            item.appendChild(splitter);
        }
        else {
            content = content + '';

            //Check for selector by class or id
            if (/^[#.]{1}\w(\w|-)+$/gm.test(content)) {
                const elements = document.querySelectorAll(content);

                for (let e = 0; e < elements.length; e++) {
                    const el = elements[e];

                    item.appendChild(el instanceof HTMLTemplateElement ? document.importNode(el.content, true) : el);
                }
            }
            else {
                item.innerHTML = content || that.placeholder;
            }
        }
    }

    /**
     * Adds labels to the items that do not have set
     * @param {any} data
     */
    _getDataSource(data) {
        const that = this;

        function setLabel(data) {
            if (data.label) {
                return data;
            }

            data.label = typeof data.content === 'string' ? that.itemLabel : that.itemGroupLabel;
        }

        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                setLabel(data[i]);

                if (Array.isArray(data[i].content)) {
                    that._getDataSource(data[i].content);
                }
            }
        }
        else {
            setLabel(data);
        }

        return data;
    }

    /**
     * Generates the JSON array of the current structure of the element
     */
    _getLayoutStruture() {
        const that = this;

        function getItemStructure(item, splitterParent) {
            if (!item) {
                return;
            }

            let struct = {};

            //Determines if the item has a label or not
            if (item._label) {
                struct.label = item._label;
            }

            //Determines if the item can be deleted or not
            if (item._root) {
                struct.root = item._root;
            }

            if (item.content) {
                struct.content = typeof item.content === 'string' ? item.content : item.content.textContent.trim();
            }

            if (item.readonly) {
                struct.readonly = item.readonly;
            }

            if (item.min) {
                struct.min = item.min;
            }

            if (item.max) {
                struct.max = item.max;
            }

            if (item.size) {
                struct.size = item.size;
            }
            else {
                struct.size = item['offset' + (splitterParent.orientation === 'horizontal' ? 'Height' : 'Width')];
            }

            if (item.locked) {
                struct.locked = item.locked;
            }

            if (item.collapsible) {
                struct.collapsible = item.collapsible;
            }

            if (item.collapsed) {
                struct.collapsed = item.collapsed;
            }

            return struct;
        }

        let items;

        if (!arguments.length) {
            items = that.$.itemsContainer.items;
        }
        else {
            items = arguments[0];
        }

        if (!items || !items.length) {
            return;
        }

        let data = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i],
                itemStruct = getItemStructure(item, item.closest('lw-splitter')),
                nestedSplitter = item.querySelector('lw-splitter');

            if (nestedSplitter) {
                const nestedItems = that._getLayoutStruture(nestedSplitter.items);

                if (nestedItems && nestedItems.length) {
                    itemStruct.content = nestedItems;
                }

                if (nestedSplitter.orientation !== that.orientation) {
                    itemStruct.orientation = nestedSplitter.orientation;
                }
            }

            data.push(itemStruct);
        }

        return data;
    }

    /**
     * Sets the settings of the new Splitter item
     * @param {any} item
     * @param {any} settings
     */
    _setItemProperties(item, settings) {
        item.readonly = settings.readonly || false;
        item.size = settings.size || '';
        item.max = settings.max || '';
        item.max = settings.max || '';
        item.min = settings.min || 30;
        item.collapsible = settings.collapsible || false;
        //item.collapsed = settings.collapsed || false;
        item.locked = settings.locked || false;

        //Used to determines the possible button positions
        if (Array.isArray(settings.buttonPosition)) {
            item._buttonPosition = settings.buttonPosition;
        }

        //Used to make an undeletable item. Optional
        if (typeof item._root === 'boolean') {
            item._root = settings.root;
        }

        //Uset by other elements like Tree. Optional
        if (typeof item._label === 'string' || typeof item._label === 'number') {
            item._label = settings.label;
        }
    }

    /**
     * Handles item selection
     * @param {any} target - target element that was clicked
     * @param {any} isOnDemand - selection on demand
     */
    _handleItemSelection(target, isOnDemand) {
        const that = this,
            item = target ? target.closest('lw-splitter-item') : undefined,
            previouslySelectedIndex = that.selectedIndex;

        if (item && item.readonly) {
            that._closeContextMenu();
            that.selectedIndex = null;
            return;
        }

        that.querySelectorAll('lw-splitter-item').forEach(i => i.removeAttribute('selected'));
        that._closeContextMenu();

        if (!item || (!isOnDemand && !that._target)) {
            that._handleButtonsVisibility();
            that.selectedIndex = null;
            return;
        }

        if (isOnDemand || that._target.closest('lw-splitter-item') === item) {
            that._handleButtonsVisibility(item);
            item.setAttribute('selected', '');
            that.selectedIndex = that.getItemIndex(item);
        }

        if (previouslySelectedIndex !== that.selectedIndex) {
            that.$.fireEvent('change', {
                'selectedIndex': that.selectedIndex,
                'oldSelectedIndex': previouslySelectedIndex
            });
        }
    }

    /**
     * Handles Layout Button click
     * @param {any} target
     */
    _handleButtonClick(target) {
        const that = this,
            newItem = that._createNewItem(target.closest('lw-splitter-item'), target.getAttribute('position'));

        //Select the new empty item
        that._handleItemSelection(newItem, true);
        that.$.fireEvent('stateChange', { type: 'insert', item: newItem });
    }

    /**
     * Handles Context Menu item click
     * @param {any} item
     */
    _handleMenuItemClick(item) {
        const that = this;

        if (!item || item.hasAttribute('disabled')) {
            return;
        }

        const action = item.getAttribute('value'),
            menu = that._contextMenu;

        that.$.fireEvent('menuItemClick', { 'target': (menu ? menu._target : null), 'item': item, 'label': item.textContent, 'value': action });

        if (action === 'delete') {
            const target = menu._target;

            if (!target) {
                return;
            }

            const targetSplitter = target.closest('lw-splitter');

            delete menu._target;

            that._removeItem(targetSplitter, target);

            that.$.fireEvent('stateChange', { type: action, item: target });
        }
    }

    /**
     * Creates a new item by splitting the target Splitter
     */
    _createNewItem(targetItem, position, newItem) {
        const that = this,
            doc = document;

        if (!targetItem) {
            return;
        }

        if (!newItem) {
            newItem = doc.createElement('lw-splitter-item');
        }

        const splitterParent = targetItem.closest('lw-splitter');
        let splitter;

        if (!newItem.innerHTML) {
            newItem.innerHTML = that.placeholder;
        }

        if (!newItem.min) {
            newItem.min = 30;
        }

        targetItem.min = 30;

        if (splitterParent.orientation === 'vertical' && (position === 'left' || position === 'right') ||
            splitterParent.orientation === 'horizontal' && (position === 'top' || position === 'bottom')) {
            splitter = splitterParent;

            const splitterItems = splitter.items,
                newItemIndex = Math.max(0, splitterItems.indexOf(targetItem) + (position === 'top' || position === 'left' ? 0 : 1)),
                newSize = targetItem['offset' + (splitter.orientation === 'horizontal' ? 'Height' : 'Width')] / 2;

            if (!newItem.size) {
                newItem.size = newSize;
            }

            //Append the new item to the Splitter
            splitter.insertBefore(newItem, splitterItems[newItemIndex]);
            targetItem.size = newSize;
        }
        else {
            splitter = targetItem.querySelector('lw-splitter') || doc.createElement('lw-splitter');

            if (position === 'top' || position === 'bottom') {
                splitter.orientation = 'horizontal';
            }

            if (splitter.parentElement) {
                const splitterItems = splitter.items,
                    newItemIndex = Math.max(0, splitterItems.indexOf(targetItem) + (position === 'top' || position === 'left' ? 0 : 1));

                //Append the new item to the Splitter
                splitter.insertBefore(newItem, splitterItems[newItemIndex]);
                return newItem;
            }

            const currentItem = doc.createElement('lw-splitter-item'),
                targetItemContent = targetItem.content;

            that._setItemProperties(currentItem, targetItem);
            currentItem.min = 30;
            currentItem.size = '50%';

            if (!newItem.size) {
                newItem.size = '50%';
            }

            if (typeof targetItemContent === 'string') {
                currentItem.innerHTML = targetItemContent;
                targetItem.innerHTML = '';
            }
            else {
                //Transfer content from target splitter item to a new one
                while (targetItemContent.firstChild) {
                    currentItem.appendChild(targetItemContent.firstChild);
                }
            }

            //Append the items into the new Splitter
            if (position === 'bottom' || position === 'right') {
                splitter.appendChild(currentItem);
                splitter.appendChild(newItem);
            }
            else {
                splitter.appendChild(newItem);
                splitter.appendChild(currentItem);
            }

            //Append the new Splitter to the target splitter item
            targetItem.appendChild(splitter);
        }

        return newItem;
    }

    /**
     * Removes a Splitter item
     * @param {any} targetSplitter - the Splitter parent of the target item
     * @param {any} target - the target Splitter item
     */
    _removeItem(targetSplitter, target) {
        const that = this;

        if (targetSplitter === that.$.itemsContainer) {
            const itemsLeft = targetSplitter.items;

            if (itemsLeft.length === 1) {
                itemsLeft[0].innerHTML = that.placeholder;
                itemsLeft[0].size = '';
                targetSplitter.refresh();
                return;
            }
        }
        else if (target._root) {
            target.innerHTML = that.placeholder;
            targetSplitter.refresh();
            return;
        }

        //Remove the target splitter item
        targetSplitter.removeChild(target);

        const splitterItemsLeft = targetSplitter.items;

        if (splitterItemsLeft.length === 1) {
            const parentSplitterItem = targetSplitter.closest('lw-splitter-item');

            if (!parentSplitterItem) {
                return;
            }

            parentSplitterItem.removeChild(targetSplitter);

            //Move the content of the removed item to it's parent item
            const lastItem = splitterItemsLeft[0];

            //parentSplitterItem.size = '';

            if (typeof lastItem.content === 'string') {
                parentSplitterItem.innerHTML = lastItem.content;
            }
            else {
                while (lastItem.content.firstChild) {
                    parentSplitterItem.appendChild(lastItem.content.firstChild);
                }
            }

            lastItem.size = parentSplitterItem.size;
            that._setItemProperties(parentSplitterItem, lastItem);
            parentSplitterItem.collapsed = false;

            parentSplitterItem.closest('lw-splitter').refresh();
        }
    }

    /**
     * Shows/Hides the Add buttons
     * @param {any} item
     */
    _handleButtonsVisibility(item) {
        const that = this;

        if (!that._buttons) {
            that._buttons = document.createElement('div');
            that._buttons.classList.add('lw-layout-buttons-container');
            that._buttons.innerHTML = `<div role="button" position="top"></div>
                                       <div role="button" position="bottom"></div>
                                       <div role="button" position="left"></div>
                                       <div role="button" position="right"></div>`;
        }

        if (!item && that._buttons.parentElement) {
            that._buttons.parentElement.removeChild(that._buttons);
            return;
        }

        if (item && item !== that._buttons.closest('lw-splitter-item')) {
            const buttonPosition = item._buttonPosition || [],
                buttons = that._buttons.children;

            for (let b = 0; b < buttons.length; b++) {
                const button = buttons[b];

                buttonPosition.length && buttonPosition.indexOf(button.getAttribute('position')) < 0 ? button.classList.add('lw-hidden') : button.classList.remove('lw-hidden');
            }

            item.appendChild(that._buttons);
        }
    }
})