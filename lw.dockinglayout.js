
/**
* lwDockingLayout custom element.
*/
LW('lw-docking-layout', class DockingLayout extends LW.ContentElement {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'autoLoadState': {
                value: false,
                type: 'boolean'
            },
            'autoSaveState': {
                value: false,
                type: 'boolean'
            },
            'draggable': {
                value: true,
                type: 'boolean'
            },
            'floatable': {
                value: true,
                type: 'boolean'
            },
            'hideSplitterBars': {
                value: false,
                type: 'boolean'
            },
            'layout': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'liveResize': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                value: {
                    'en': {
                        'invalidNode': '{{elementType}}: "{{method}}" method accepts an instance of LW.TabsWindow',
                        'invalidNodeRemove': '{{elementType}}: "{{method}}" method accepts an instance of LW.TabsWindow that is a child of the DockingLayout.',
                        'invalidNodeType': '{{elementType}}: The method "{{method}}" requires a "lw-tabs-window" element to be passed as an argument.',
                        'invalidTargetNode': '{{elementType}}: The method "{{method}}" requires an index of an item that is not hidden/closed. Only visible items that are part of the Layout are valid.',
                        'invalidIndex': '{{elementType}}: "{{method}}" method accepts an index of type number.',
                        'noId': 'lwDockingLayout requires an id in order to save/load a state.'
                    }
                },
                type: 'object',
                extend: true
            },
            'resizeStep': {
                value: 5,
                type: 'number'
            },
            'snapMode': {
                value: 'advanced',
                allowedValues: ['simple', 'advanced'],
                type: 'string'
            }
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'autoHideWindow.close': '_autoHideWindowCloseHandler',
            'autoHideWindow.resizeEnd': '_autoHideWindowResizeEndHandler',
            'container.dock': '_dockEventHandler',
            'move': '_moveHandler',
            'document.down': '_documentDownHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'document.selectstart': '_documentSelectStartHandler',
            'document.dragstart': '_documentDragStartHandler',
            'container.tabStripResize': '_containerTabStripResizeHandler',
            'horizontalHiddenItemsContainer.resize': '_resizeHandler',
            'itemsContainer.close': '_itemsContainerCloseHandler',
            'itemsContainer.autoHide': '_itemsContainerAutoHideHandler',
            'itemsContainer.resizeEnd': '_itemsContainerResizeHandler',
            'keydown': '_keyDownHandler',
            'keyup': '_keyUpHandler',
            'mouseleave': '_mouseLeaveHandler'
        }
    }

    /**
      * CSS files needed for the element (ShadowDOM)
      */
    static get styleUrls() {
        return [
            'lw.dockinglayout.css'
        ]
    }

    /**
    * Element's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <lw-splitter id="horizontalHiddenItemsContainer" class="lw-horizontal-hidden-items-container" orientation="horizontal">
                        <lw-splitter-item class="lw-docking-layout-item-holder">
                            <lw-splitter id="verticalHiddenItemsContainer" class="lw-vertical-hidden-items-container">
                                <lw-splitter-item class="lw-docking-layout-item-holder">
                                    <lw-splitter id="itemsContainer" class="lw-items-container">
                                        <content></content>
                                        <lw-splitter-item id="placeholderItem" class="lw-placeholder" pinned>
                                            <lw-tabs-window tab-position="hidden" opened header-buttons='[]'>
                                                <lw-tab-item></lw-tab-item>
                                            </lw-tabs-window>
                                        </lw-splitter-item>
                                    </lw-splitter>
                                </lw-splitter-item>
                            </lw-splitter>
                        </lw-splitter-item>
                    </lw-splitter>
                    <lw-tabs-window id="tabsWindowFeedback" class="lw-tabs-window-feedback lw-hidden"></lw-tabs-window>
                    <lw-tabs-window id="autoHideWindow" class="lw-docking-layout-auto-hide-window" pinned header-buttons='["close", "dock"]'
                        right-to-left="[[rightToLeft]]" tab-position="hidden">
                            <lw-tab-item></lw-tab-item>
                    </lw-tabs-window>
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
            case 'autoSaveState':
                that._handleAutoSave();
                break;
            case 'layout':
                that._handleLayout();
                break;
            case 'liveResize':
            case 'resizeStep': {
                const allSplitters = that.getElementsByTagName('lw-splitter');

                for (let i = 0; i < allSplitters.length; i++) {
                    allSplitters[i][propertyName] = newValue;
                }

                if (propertyName === 'liveResize') {
                    that.$.autoHideWindow[propertyName] = newValue;
                }

                break;
            }
            case 'snapMode':
                that._handleSnapping();
                that._snapFeedback = undefined;
                break;
            case 'hideSplitterBars':
                that._setSplitterBarVisibility();
                break;
            case 'rightToLeft':
            case 'theme':
                if (that._items) {
                    that._items.forEach(item => item[propertyName] = newValue);
                }
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
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

        that.setAttribute('role', 'group');

        //AutoLoadState
        if (that.autoLoadState) {
            const previousState = that.loadState();

            if (previousState) {
                that.layout = previousState;
            }
        }

        that.$.itemsContainer.liveResize = that.liveResize;
        that.$.itemsContainer.resizeStep = that.resizeStep;

        that._handleLayout();

        //Prevents visual redraw on element initialization
        that.$tabsWindowFeedback.removeClass('lw-hidden');
        that._setFocusable();
        that.checkLicense();
        super.render();
    }
    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.TabsWindow': 'lw.window.js',
            'LW.Splitter': 'lw.splitter.js'
        }
    }

    /**
    * Appends an HTML element content section of the Window.
    */
    appendChild(node) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'appendChild' }));
            return
        }

        if (!(node instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'appendChild' }));
            return;
        }

        that.insertBefore(node, null);
    }

    /**
     * AutoHides and item to the bottom side
     * @param {any} item
     */
    autoHideBottom(item) {
        this._autoHide(item, 'bottom');
    }

    /**
     * AutoHides and item to the left side
     * @param {any} item
     */
    autoHideLeft(item) {
        this._autoHide(item, 'left');
    }

    /**
     * AutoHides and item to the right side
     * @param {any} item
     */
    autoHideRight(item) {
        this._autoHide(item, 'right');
    }

    /**
     * AutoHides and item to the top side
     * @param {any} item
     */
    autoHideTop(item) {
        this._autoHide(item, 'top');
    }

    /**
     * Clears the previously saved state
     */
    clearState() {
        const that = this;

        if (!that.id) {
            that.warn(that.localize('noId'));
            return;
        }

        window.localStorage.removeItem('lwDockingLayout' + that.id);
    }

    /**
     * Docks an autoHidden item/ Inserts an external window into the Layout
     * @param {any} item
     */
    dock(item) {
        this._dock(item);
    }

    /**
     * Undocks a tabsWindow or TabItem if it was docked( inside the Layout )
     */
    undock(tabsWindow) {
        const that = this;

        if (typeof tabsWindow === 'number') {
            tabsWindow = that._items[tabsWindow];
        }
        else if (typeof tabsWindow === 'string') {
            tabsWindow = that._getItemById(tabsWindow);
        }

        if (!tabsWindow) {
            return;
        }

        if (!(that.shadowRoot || that).contains(tabsWindow) && that._getClosestDockingLayout(tabsWindow) !== that) {
            return;
        }

        const shadowHost = tabsWindow.getRootNode() && tabsWindow.getRootNode().host ? tabsWindow.getRootNode().host : undefined,
            splitterItem = tabsWindow.closest('lw-splitter-item') || (shadowHost ? shadowHost.closest('lw-splitter-item') : undefined);

        if (!splitterItem) {
            return;
        }

        const splitterItemRect = splitterItem.getBoundingClientRect();
        let targetWindow;

        if (tabsWindow instanceof LW.TabsWindow) {
            if (tabsWindow.autoHide) {

                //Close the autoHideWindow
                that.$.autoHideWindow.close();

                if (tabsWindow._autoHideWindow) {
                    tabsWindow.style.width = tabsWindow._autoHideWindow.offsetWidth + 'px';
                    tabsWindow.style.height = tabsWindow._autoHideWindow.offsetHeight + 'px';
                }

                if (tabsWindow.tabPosition === 'left' || tabsWindow.tabPosition === 'right') {
                    tabsWindow.style.height = that.offsetHeight + 'px';
                }
                else {
                    tabsWindow.style.width = that.offsetWidth + 'px';
                }
            }
            else {
                tabsWindow.style.width = tabsWindow.offsetWidth + 'px';
                tabsWindow.style.height = tabsWindow.offsetHeight + 'px';
            }

            tabsWindow.windowParent = 'body';

            //Reset window properties
            tabsWindow.opened = true;

            if (tabsWindow.autoHide) {
                tabsWindow.tabPosition = 'top';
            }

            //Reset the proeprties of the Window
            tabsWindow.autoHide = tabsWindow.allowToggle = tabsWindow.pinned = false;
            tabsWindow.style.maxWidth = tabsWindow.style.maxHeight = '';
            targetWindow = tabsWindow;

            const splitterParent = splitterItem.closest('lw-splitter');

            splitterParent.removeChild(splitterItem);
            that._removeUnneccessaryItems(splitterParent);
        }
        else if (tabsWindow instanceof LW.TabItem) {
            const parentTabsWindow = tabsWindow.closest('lw-tabs-window') || (shadowHost ? shadowHost.closest('lw-tabs-window') : undefined);
            let newTabsWindow;

            if (parentTabsWindow.items.length === 1) {
                newTabsWindow = parentTabsWindow;
                splitterItem.closest('lw-splitter').removeChild(splitterItem);
            }
            else {
                newTabsWindow = that._createTabsWindowFromObject({ label: tabsWindow.label });

                parentTabsWindow.removeChild(tabsWindow); //Removes the Tab label from the parent lwTabs
                newTabsWindow.appendChild(tabsWindow);
            }

            if (newTabsWindow.windowParent !== 'body') {
                newTabsWindow.windowParent = 'body';
            }

            if (newTabsWindow.parentElement !== that.getShadowRootOrBody()) {
                that.getShadowRootOrBody().appendChild(newTabsWindow);

                that._ownTabWindow(newTabsWindow);
            }

            newTabsWindow.allowToggle = newTabsWindow.autoHide = newTabsWindow.pinned = false;
            newTabsWindow.label = tabsWindow.label;
            newTabsWindow.opened = true;

            //Remember the previous item
            newTabsWindow._parentInfo = {
                closestItem: parentTabsWindow,
                position: tabsWindow.index
            };

            targetWindow = newTabsWindow;
            tabsWindow = parentTabsWindow;
        }
        else {
            return;
        }

        if (tabsWindow._originalTabPosition) {
            targetWindow.tabPosition = tabsWindow._originalTabPosition;
        }
        else if (tabsWindow.autoHide) {
            targetWindow.tabPosition = 'top';
        }

        targetWindow.tabTextOrientation = tabsWindow._originalTextOrientation || 'horizontal';

        if (targetWindow === tabsWindow) {
            delete targetWindow._originalTabPosition;
            delete targetWindow._originalTextOrientation;
        }

        that._setFloatingItemsHeaderButtons(targetWindow);

        //Position on the same place
        targetWindow.style.left = splitterItemRect.left + 'px';
        targetWindow.style.top = splitterItemRect.top + 'px';

        targetWindow.resizeMode = 'both';

        const itemIndex = that._items.indexOf(tabsWindow);

        targetWindow.layout = that;

        if (itemIndex > -1) {
            that._items.splice(itemIndex, 1);

            if (targetWindow.position) {
                targetWindow.style.top = targetWindow.position.top;
                targetWindow.style.left = targetWindow.position.left;
                delete targetWindow.position;
            }
        }

        if (that._items.filter(item => item.opened).length === 0 && !that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.appendChild(that.$.placeholderItem);
        }

        that._validateWindowPosition(targetWindow);
        that._setAutoHidePaddings();

        if (!that._noStateChangeFiring) {
            that._handleAutoSave();
            that.$.fireEvent('stateChange', { type: 'float', item: targetWindow });
        }

        if (document.activeElement !== targetWindow) {
            const scrollElement = document.scrollingElement || document.documentElement,
                x = scrollElement.scrollLeft,
                y = scrollElement.scrollTop;

            targetWindow.focus();
            targetWindow.bringToFront();
            window.scrollTo(x, y);
        }
    }

    /**
     * Inserts a TabsWindow element before another inside the Layout
     */
    insertBefore(newNode, node, topLevelInsert) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.insertBefore.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        let newTabsWindow = newNode;

        if (newTabsWindow instanceof LW.TabsWindow) {
            newNode = document.createElement('lw-splitter-item');

            newNode.size = newTabsWindow.size || '';
            newNode.max = newTabsWindow.max || '';
            newNode.min = newTabsWindow.min || '';
            newNode.locked = newTabsWindow.locked || false;
            newNode.collapsible = newTabsWindow.collapsible || false;
            newNode.collapsed = newTabsWindow.collapsed || false;

            newNode.appendChild(newTabsWindow);
        }
        else if (newTabsWindow instanceof LW.SplitterItem) {
            newTabsWindow = newTabsWindow.querySelector('lw-tabs-window');
        }
        else {
            that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore' }));
        }

        newTabsWindow.opened = newTabsWindow.pinned = true;
        newTabsWindow.style.width = newTabsWindow.style.height = '';
        newTabsWindow.style.top = newTabsWindow.style.left = '';
        newTabsWindow.style.paddingTop = newTabsWindow.style.paddingBottom = '';
        newTabsWindow.style.paddingLeft = newTabsWindow.style.paddingRight = '';
        newNode.style.top = newNode.style.left = '';

        let parentSplitter;

        if (that._items.indexOf(newTabsWindow) > -1) {
            that._items.splice(that._items.indexOf(newTabsWindow), 1);
        }

        if (node) {
            parentSplitter = node.closest('lw-splitter');

            if (parentSplitter === that.$.verticalHiddenItemsContainer || parentSplitter === that.$.horizontalHiddenItemsContainer) {
                parentSplitter = that.$.itemsContainer;

                if (that._items.length === 0) {
                    node = null;
                }
                else if (node.tabPosition === 'top' || node.tabPosition === 'left') {
                    node = that._items[0];
                }
                else {
                    node = that._items[that._items.length - 1];
                }
            }
            else if (topLevelInsert) {
                parentSplitter = that.$.itemsContainer;
            }

            if (!(node instanceof LW.TabsWindow)) {
                that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'insertBefore' }));
                return;
            }

            parentSplitter.autoFitMode = 'proportional';

            parentSplitter.insertBefore(newNode, parentSplitter._items.filter(item => item.contains(node))[0]);

            that._items.splice(that._items.indexOf(node), 0, newTabsWindow);
        }
        else {
            parentSplitter = that.$.itemsContainer;

            if (that._dockingAutoHideTabItem) {
                parentSplitter.autoFitMode = 'end';
            }

            that._items.push(newTabsWindow);

            that.$.itemsContainer.insertBefore(newNode);
        }

        parentSplitter.autoFitMode = 'proportional';

        if (newTabsWindow.autoHide) {
            that._autoHide(newTabsWindow, newTabsWindow.autoHidePosition);
        }
        else {
            //Reset the TabsWindow if it's been an autoHidden one
            newTabsWindow.autoHide = newTabsWindow.allowToggle = false;

            if (newTabsWindow._originalTabPosition) {
                newTabsWindow.tabPosition = newTabsWindow._originalTabPosition;
                delete newTabsWindow._originalTabPosition;
            }

            if (newTabsWindow._originalTextOrientation) {
                newTabsWindow.tabTextOrientation = newTabsWindow._originalTextOrientation;
                delete newTabsWindow._originalTextOrientation;
            }

            that._setDockedItemsHeaderButtons(newTabsWindow);

            const scrollElement = document.scrollingElement || document.documentElement,
                x = scrollElement.scrollLeft,
                y = scrollElement.scrollTop;

            newTabsWindow.focus();
            window.scrollTo(x, y);
        }

        if (that._items.filter(item => item.opened).length > 0 && that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.removeChild(that.$.placeholderItem);
        }

        newTabsWindow.layout = that;
        newTabsWindow.minimized = false;
        newTabsWindow.maximized = false;
        newTabsWindow.locked = false;
        newTabsWindow.resizeMode = 'none';

        that._handleAutoHiddenSplitterBars();
        that._setSplitterBarVisibility();
        that._handleAutoSave();
        that.$.fireEvent('stateChange', { type: 'dock', item: newTabsWindow });
    }

    /**
     * Inserts a new item before the targetItem that corresponds to the index
     * @param {any} index - the index of the target item
     * @param {any} item - the new item to be inserted
     */
    insertBeforeItem(index, item) {
        this._insert(index, item, 'top', 'insertBeforeItem');
    }

    /**
     * Inserts a new item after the targetItem that corresponds to the index
     * @param {any} index - the index of the target item
     * @param {any} item - the new item to be inserted
     */
    insertAfterItem(index, item) {
        this._insert(index, item, 'bottom', 'insertAfterItem');
    }

    /**
     * Inserts a new item inside the target item at it's left side
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertIntoLeft(index, item) {
        this._insert(index, item, 'inside-left', 'insertIntoLeft');
    }

    /**
     * Inserts a new item inside the target item at it's right side
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertIntoRight(index, item) {
        this._insert(index, item, 'inside-right', 'insertIntoRight');
    }

    /**
     * Inserts a new item inside the target item at it's top side
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertIntoTop(index, item) {
        this._insert(index, item, 'inside-top', 'insertIntoTop');
    }

    /**
     * Inserts a new item inside the target item at it's top side
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertIntoBottom(index, item) {
        this._insert(index, item, 'inside-bottom', 'insertIntoBottom');
    }

    /**
     * Inserts a new item at top level of hierarchy inside the layout at position top
     */
    insertLayoutTop(item) {
        this._insert(0, item, 'layout-top', 'insertLayoutTop');
    }

    /**
     * Inserts a new item at top level of hierarchy inside the layout at position bottom
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertLayoutBottom(item) {
        this._insert(0, item, 'layout-bottom', 'insertLayoutBottom');
    }

    /**
     * Inserts a new item at top level of hierarchy inside the layout at position left
     */
    insertLayoutLeft(item) {
        this._insert(0, item, 'layout-left', 'insertLayoutLeft');
    }

    /**
     * Inserts a new item at top level of hierarchy inside the layout at position left
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertLayoutRight(item) {
        this._insert(0, item, 'layout-right', 'insertLayoutRight');
    }

    /**
     * Inserts a new item at position top by creating a new splitter with two items. One is the new item and the other is the Splitter parent of the target item.
     * @param {any} index - the index of the target Layout item
     * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
     */
    insertOutsideTargetGroupTop(index, item) {
        this._insert(index, item, 'outside-top', 'insertOutsideTargetGroupTop');
    }

    /**
    * Inserts a new item at position bottom by creating a new splitter with two items. One is the new item and the other is the Splitter parent of the target item.
    * @param {any} index - the index of the target Layout item
    * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
    */
    insertOutsideTargetGroupBottom(index, item) {
        this._insert(index, item, 'outside-bottom', 'insertOutsideTargetGroupBottom');
    }

    /**
    * Inserts a new item at position left by creating a new splitter with two items. One is the new item and the other is the Splitter parent of the target item.
    * @param {any} index - the index of the target Layout item
    * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
    */
    insertOutsideTargetGroupLeft(index, item) {
        this._insert(index, item, 'outside-left', 'insertOutsideTargetGroupLeft');
    }

    /**
    * Inserts a new item at position right by creating a new splitter with two items. One is the new item and the other is the Splitter parent of the target item.
    * @param {any} index - the index of the target Layout item
    * @param {any} item - an instance of LW.TabsWindow or an object defining a TabsWindow.
    */
    insertOutsideTargetGroupRight(index, item) {
        this._insert(index, item, 'outside-right', 'insertOutsideTargetGroupRight');
    }

    /**
    * Returns an array of auto-hide items that are available inside the Layout
    * @param {any} orientation
    */
    getAutoHideItems(orientation) {
        const that = this;

        function getItems(splitter) {
            let items = [];

            if (!splitter._items) {
                return items;
            }

            for (let i = 0; i < splitter._items.length; i++) {
                if (!splitter._items[i].$.hasClass('lw-docking-layout-item-holder')) {
                    items.push(splitter._items[i].getElementsByTagName('lw-tabs-window')[0]);
                }
            }

            return items;
        }

        if (!orientation) {
            return getItems(that.$.horizontalHiddenItemsContainer).concat(getItems(that.$.verticalHiddenItemsContainer));
        }

        if (orientation === 'horizontal') {
            return getItems(that.$.horizontalHiddenItemsContainer);
        }

        return getItems(that.$.verticalHiddenItemsContainer);
    }

    /**
     * Returns the index of the item
     * @param {any} item
     */
    getIndex(item) {
        const that = this;

        if (!that.isReady) {
            return;
        }

        if (!that._items.length) {
            return;
        }

        return that._items.indexOf(item);
    }

    /**
    * Returns an array of Splitter items that are auto hidden inside the element
    */
    get autoHideItems() {
        const that = this;

        if (!that.isReady) {
            return []
        }

        return that.getAutoHideItems();
    }

    /**
     * Returns an array of Splitter items that are inside the element
     */
    get items() {
        const that = this;

        if (!that.isReady) {
            return [];
        }

        return that._items.filter(item => item.opened).concat(that.getAutoHideItems());
    }

    /**
    * Returns all closed TabsWindow items
    */
    get closedItems() {
        const that = this;

        if (!that.isReady) {
            return []
        }

        return that._items.filter(item => !item.opened);
    }

    /**
     * Returns all items of the DockingLayout that have been undocked
     */
    get undockedItems() {
        const that = this;

        if (!that.isReady) {
            return [];
        }

        const tabsWindows = document.getElementsByTagName('lw-tabs-window');
        let undockedWindows = [];

        for (let i = 0; i < tabsWindows.length; i++) {
            if ((!tabsWindows[i].closest('lw-docking-layout') && !that._getClosestDockingLayout(tabsWindows[i])) && tabsWindows[i].layout === that) {
                tabsWindows[i].undocked = true;
                undockedWindows.push(tabsWindows[i]);
            }
        }

        return undockedWindows;
    }

    /**
     * Returns the Splitter parent of a Layout item
     */
    getItemGroupElement(item) {
        const that = this;

        if (!that.isReady || !item || !(item instanceof LW.TabsWindow) || !(that.shadowRoot || that).contains(item)) {
            return;
        }

        return item.closest('lw-splitter');
    }

    /**
    * Returns the current Layout structure as an array of objects. Contains HTML references.
    */
    getState(noInstances) {
        const that = this,
            autoHideItems = that.getAutoHideItems(),
            undockedItems = that.undockedItems,
            structure = [];

        for (let i = 0; i < autoHideItems.length; i++) {
            structure.push(that._createTabsWindowStructure(autoHideItems[i], noInstances));
        }

        for (let i = 0; i < undockedItems.length; i++) {
            structure.push(that._createTabsWindowStructure(undockedItems[i], noInstances));
        }

        return [{
            type: 'LayoutGroup',
            items: structure.concat(that._createLayoutStructure(that.$.itemsContainer, noInstances)),
            orientation: that.$.itemsContainer.orientation
        }];
    }

    /**
    * Returns the nearest splitter bars of an item
    * @param {any} item - a lwTabsWindow item or it's index or id
    */
    getClosestSplitterBars(item) {
        const that = this;

        if (!that._items || !that._items.length) {
            return;
        }

        if (typeof item === 'string') {
            item = that._getItemById(item);
        }
        else if (typeof item === 'number') {
            item = that._items[parseInt(item)];
        }

        if (!(item instanceof LW.TabsWindow) || !that._items.find(i => i === item)) {
            return
        }

        let closestSplitter = item.closest('lw-splitter');

        while (closestSplitter) {
            if (closestSplitter.bars.length) {
                break;
            }

            closestSplitter = closestSplitter.closest('lw-splitter');
        }

        if (closestSplitter) {
            return closestSplitter.bars;
        }
    }

    /**
     * Returns a JSON structure of the current Layout state. Does not contain any HTML references. Used for local storaging.
     */
    getJSONStructure() {
        return this.getState(true);
    }

    /**
     * Load the previously saved state of the Layout
     */
    loadState(previousState) {
        const that = this;

        if (!previousState) {
            if (!that.id) {
                that.warn(that.localize('noId'));
                return;
            }

            previousState = JSON.parse(window.localStorage.getItem('lwDockingLayout' + that.id));
        }

        if (previousState) {
            that._loadState(previousState);
            return previousState;
        }
    }

    /**
    * Removes a TabsWindow element from the Layout.
    */
    removeAt(item) {
        const that = this;

        if (typeof (item) === 'number') {
            item = that._items[item];
        }
        else if (typeof item === 'string') {
            item = that._getItemById(item);
        }

        if (!(item instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: 'remove' }));
            return;
        }

        if (item.closest('lw-docking-layout') !== that && that._getClosestDockingLayout(item) !== that) {
            that.error(that.localize('invalidNodeRemove', { elementType: that.nodeName.toLowerCase(), method: 'remove' }));
            return;
        }

        that.removeChild(item);
    }

    /**
     * Removes all items from the Layout
     */
    removeAll() {
        this._removeAll();
    }

    /**
    * Removes a lwTabsWindow item from the Layout
    */
    removeChild(node) {
        const that = this;

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild' }));
            return
        }

        if (!(node instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'removeChild' }));
            return;
        }

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        const splitterItem = node.closest('lw-splitter-item');

        if (!splitterItem) {
            return;
        }

        const splitter = splitterItem.closest('lw-splitter');

        if (!splitter) {
            return;
        }

        splitterItem.closest('lw-splitter').removeChild(splitterItem);

        that._items.splice(that._items.indexOf(node), 1);

        that._removeUnneccessaryItems(splitter);

        if (that._items.filter(item => item.opened).length === 0 && !that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.appendChild(that.$.placeholderItem);
        }

        node.layout = that;
        that._handleAutoSave();
        that.$.fireEvent('stateChange', { type: 'remove', item: node });
    }

    /**
    * Saves the current state of the Layout
    */
    saveState() {
        const that = this;

        if (!that.id) {
            that.warn(that.localize('noId'));
            return;
        }

        //Save to LocalStorage
        window.localStorage.setItem('lwDockingLayout' + that.id, JSON.stringify(that.getJSONStructure()));
    }

    /**
     * Updates the content of a TabsWindow item
     * @param {any} index
     * @param {any} item
     * @param {any} position
     */
    update(item, settings) {
        const that = this;

        if (typeof item === 'number') {
            item = that._items[parseInt(item)];
        }
        else if (typeof item === 'string') {
            item = that._getItemById(item);
        }

        if (!item || !(item instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'update' }));
            return;
        }

        if (!(that.shadowRoot || that).contains(item) && that._getClosestDockingLayout(item) !== that) {
            return;
        }

        if (!settings || typeof settings !== 'object') {
            return;
        }

        if (settings.items) {
            for (let i = 0; i < settings.items.length; i++) {
                const tabItemIndex = settings.items[i].index;

                if (typeof tabItemIndex !== 'number' || isNaN(tabItemIndex)) {
                    continue;
                }

                if (item.items && !item.items[tabItemIndex]) {
                    item.insert(tabItemIndex, settings.items[i])
                }
                else {
                    item.update(settings.items[i].index, settings.items[i].label, settings.items[i].content);
                }
            }
        }

        if (settings.id) {
            item.id = settings.id;
        }

        if (settings.label) {
            item.label = settings.label;
        }

        item.tabCloseButtons = settings.tabCloseButtons || false;

        if (settings.headerButtons && Array.isArray(settings.headerButtons)) {
            item.headerButtons = settings.headerButtons.length === 0 ? ['close', 'autoHide'] : settings.headerButtons;
        }

        const parentSplitterItem = item.closest('lw-splitter-item');

        if (!parentSplitterItem) {
            return;
        }

        if (item.autoHide) {
            that._autoHide(item);
        }
        else {
            parentSplitterItem.size = settings.size !== undefined ? settings.size : parentSplitterItem.size;
            parentSplitterItem.min = settings.min !== undefined ? settings.min : parentSplitterItem.min;
            parentSplitterItem.max = settings.max !== undefined ? settings.max : parentSplitterItem.max;
            parentSplitterItem.locked = settings.locked !== undefined ? settings.locked : parentSplitterItem.locked;
            parentSplitterItem.collapsible = settings.collapsible !== undefined ? settings.collapsible : parentSplitterItem.collapsible;
            parentSplitterItem.collapsed = settings.collapsed !== undefined ? settings.collapsed : parentSplitterItem.collapsed;
        }
    }

    /**
    * Autohides a TabsWindow
    */
    _autoHide(tabsWindow, position) {
        const that = this;

        if (typeof tabsWindow === 'number') {
            tabsWindow = that._items[tabsWindow];
        }
        else if (typeof tabsWindow === 'string') {
            tabsWindow = that._getItemById(tabsWindow);
        }

        if (!tabsWindow) {
            return;
        }

        if (tabsWindow instanceof LW.TabItem) {
            const parentTabsWindow = tabsWindow.closest('lw-tabs-window') ||
                (tabsWindow.getRootNode() && tabsWindow.getRootNode().host ? tabsWindow.getRootNode().host.closest('lw-tabs-window') : undefined);

            if (parentTabsWindow && parentTabsWindow.items.length < 2) {
                tabsWindow = parentTabsWindow;
            }
            else {
                const tabItem = tabsWindow;

                if (parentTabsWindow) {
                    if (parentTabsWindow.autoHide && parentTabsWindow.tabPosition === position) {
                        return;
                    }

                    parentTabsWindow.removeChild(tabsWindow);
                }

                tabsWindow = that._createTabsWindowFromObject({ label: tabsWindow.label });
                tabsWindow.appendChild(tabItem);
            }
        }

        if (!(tabsWindow instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidNodeType', { elementType: that.nodeName.toLowerCase(), method: 'appendChild' }));
            return;
        }

        let splitterItem = tabsWindow.closest('lw-splitter-item'), tabsWindowSize;
        const splitterContainer = tabsWindow.closest('lw-splitter') || (tabsWindow.isInShadowDOM ? tabsWindow.getRootNode().host : undefined) || that.$.itemsContainer,
            positionDetails = that._getAutoHidePositionDetails(position, tabsWindow, splitterItem),
            autoHideSplitter = positionDetails.autoHideSplitter;

        position = positionDetails.position;

        if (tabsWindow.offsetHeight) {
            tabsWindowSize = position === 'left' || position === 'right' ? tabsWindow.offsetWidth : tabsWindow.offsetHeight;
        }

        if (!splitterItem) {
            splitterItem = document.createElement('lw-splitter-item');
            splitterItem.appendChild(tabsWindow);
        }

        splitterItem.min = 30;

        const autoHideName = 'auto-hide-' + position;

        //Check if it's already autoHidden
        if (tabsWindow.autoHide && splitterItem.$.hasClass(autoHideName)) {
            return;
        }

        const tabsWindowIndex = that._items.indexOf(tabsWindow);

        that._items.splice(tabsWindowIndex, tabsWindowIndex > -1 ? 1 : 0);

        if (that._items.filter(item => item.opened).length === 0 && !that.$.placeholderItem.parentElement) {
            position === 'left' ? that.$.itemsContainer.insert(1, that.$.placeholderItem) : that.$.itemsContainer.appendChild(that.$.placeholderItem);
        }

        that._handleAutoHideWindow({
            position: position,
            tabsWindow: tabsWindow,
            splitterItem: splitterItem,
            autoHideName: autoHideName,
            splitterContainer: splitterContainer,
            autoHideSplitter: autoHideSplitter
        });

        autoHideSplitter.bars.map(bar => bar.hide());

        if (!that.shadowRoot || (that.shadowRoot && that.isCompleted)) {
            that._setAutoHidePaddings();
        }

        const tabsWindowItems = tabsWindow.items;

        if (tabsWindowItems) {
            for (let i = 0; i < tabsWindowItems.length; i++) {
                if (!tabsWindowItems[i]._autoHideWindowSize) {
                    tabsWindowItems[i]._autoHideWindowSize = tabsWindowSize;
                }
            }
        }

        if (that.$.autoHideWindow.opened && that.$.autoHideWindow._tabsWindow) {
            that.$.autoHideWindow._tabsWindow._setAutoHideWindowSize(that.$.autoHideWindow._tabsWindow.selectedIndex);
        }

        if (that.isCompleted) {
            that._handleAutoSave();
            that.$.fireEvent('stateChange', { type: 'autoHide', item: tabsWindow });

            //NOTE: ShadowDOM Styles are loaded slwly so additional recalculation is required !
            if (that.shadowRoot) {
                setTimeout(function () {
                    if (position === 'top' || position === 'bottom') {
                        that.$.horizontalHiddenItemsContainer.items.filter(item => item.className.indexOf('auto-hide-') > -1).forEach(item => {
                            const tabsWindow = item.querySelector('lw-tabs-window');

                            item.style.height = '';
                            tabsWindow.refreshTabs();
                        });

                        that.$.horizontalHiddenItemsContainer.refresh();
                    }
                    else {
                        that.$.verticalHiddenItemsContainer.items.filter(item => item.className.indexOf('auto-hide-') > -1).forEach(item => {
                            const tabsWindow = item.querySelector('lw-tabs-window');

                            item.style.width = '';
                            tabsWindow.refreshTabs();
                        });

                        that.$.verticalHiddenItemsContainer.refresh();
                    }

                    that._setAutoHidePaddings();
                }, 150);
            }
        }
    }

    /**
    * iOS Safari bug fix. (iOS Safari doesn't support 'touch-action: none')
    */
    _moveHandler(event) {
        if (this.hasAttribute('dragged') && event.originalEvent.type === 'touchmove') {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * Returns the position and the autoHideSplitter according to the position
     * @param {any} position
     */
    _getAutoHidePositionDetails(position, tabsWindow, splitterItem) {
        const that = this,
            splitterContainer = tabsWindow.closest('lw-splitter') || that.$.itemsContainer,
            index = splitterContainer ? splitterContainer._items.indexOf(splitterItem) : 0;
        let autoHideSplitter;

        switch (position) {
            case 'top':
            case 'bottom':
                autoHideSplitter = that.$.horizontalHiddenItemsContainer;
                break;
            case 'left':
            case 'right':
                autoHideSplitter = that.$.verticalHiddenItemsContainer;
                break;
            default:
                if (splitterContainer.orientation === 'vertical') {
                    autoHideSplitter = that.$.verticalHiddenItemsContainer;

                    const autoHiddenItems = autoHideSplitter.items.filter(item => item.className.indexOf('auto-hide-') > -1);

                    if (autoHiddenItems.length === 1 && that._items.length === 1) {
                        position = autoHiddenItems[0].$.hasClass('auto-hide-right') ? 'right' : 'left';
                    }
                    else {
                        position = index >= splitterContainer.items.length / 2 ? 'right' : 'left';
                    }

                }
                else {
                    autoHideSplitter = that.$.horizontalHiddenItemsContainer;

                    const autoHiddenItems = autoHideSplitter.items.filter(item => item.className.indexOf('auto-hide-') > -1);

                    if (autoHiddenItems.length === 1 && that._items.length === 1) {
                        position = autoHiddenItems[0].$.hasClass('auto-hide-bottom') ? 'bottom' : 'top';
                    }
                    else {
                        position = index >= splitterContainer.items.length / 2 ? 'bottom' : 'top';
                    }
                }

                break;
        }

        return { autoHideSplitter: autoHideSplitter, position: position };
    }

    /**
     * Places the target Window in a new AutoHideWindow or an already existing one
     * @param {any} details
     */
    _handleAutoHideWindow(details) {
        const that = this,
            autoHideName = details.autoHideName,
            splitterItem = details.splitterItem,
            splitterContainer = details.splitterContainer,
            position = details.position,
            autoHideSplitter = details.autoHideSplitter;
        let tabsWindow = details.tabsWindow,
            autoHiddenItem = (that.shadowRoot || that).querySelector('.' + autoHideName),
            size = 'offset' + (position === 'left' || position === 'right' ? 'Width' : 'Height');

        //splitterItem.locked = false;
        tabsWindow.locked = false;

        if (autoHiddenItem) {
            const tabItems = [].slice.call(tabsWindow.isCompleted ? tabsWindow.items : tabsWindow.children),
                autoHideTabsWindow = autoHiddenItem.querySelector('lw-tabs-window'),
                autoHiddenItemsCount = autoHideTabsWindow.items.length;

            for (let i = 0; i < tabItems.length; i++) {
                autoHideTabsWindow.insert(autoHiddenItemsCount, { node: tabItems[i] });
                tabItems[i]._autoHideWindowSize = tabsWindow[size];
            }

            if (splitterItem.parentElement) {
                splitterContainer.removeChild(splitterItem);
            }

            that._removeUnneccessaryItems(splitterContainer);
            tabsWindow = autoHideTabsWindow;
        }
        else {
            if (splitterContainer && splitterContainer.contains(splitterItem)) {
                splitterContainer.removeChild(splitterItem);
            }

            //Remembers the tabPosition before autoHidding
            if (that._initializingItems || !tabsWindow.autoHide) {
                tabsWindow._originalTabPosition = tabsWindow.tabPosition;
                tabsWindow._originalTextOrientation = tabsWindow.tabTextOrientation;
                tabsWindow._originalLocked = tabsWindow.locked;
            }

            tabsWindow.autoHideWindow = that.$.autoHideWindow;
            tabsWindow.autoHide = tabsWindow.allowToggle = true;

            tabsWindow.selectedIndex = null;

            if (tabsWindow.$.tabsElement && tabsWindow.$.tabsElement.selectedIndex !== tabsWindow.selectedIndex) {
                tabsWindow.$.tabsElement.selectedIndex = tabsWindow.selectedIndex;
            }

            tabsWindow.tabTextOrientation = position === 'right' || position === 'left' ? 'vertical' : 'horizontal';
            tabsWindow.tabPosition = position;
            tabsWindow.style.top = tabsWindow.style.left = '';
            tabsWindow.style.width = tabsWindow.style.height = '';
            tabsWindow.opened = true;

            tabsWindow.resizeMode = 'none';

            //Make sure no other auto-hide classes are added
            for (let c = 0; c < splitterItem.classList.length; c++) {
                if (splitterItem.classList[c].indexOf('auto-hide-') > -1) {
                    splitterItem.$.removeClass(splitterItem.classList[c]);
                }
            }

            splitterItem.$.addClass(autoHideName);
            splitterItem.style.paddingLeft = splitterItem.style.paddingRight = splitterItem.style.paddingTop = splitterItem.style.paddingBottom = '';

            if (splitterItem.min) {
                splitterItem.min = '';
            }

            that._removeUnneccessaryItems(splitterContainer);

            if (position === 'top' || position === 'left') {
                autoHideSplitter.insert(0, splitterItem);
            }
            else {
                autoHideSplitter.appendChild(splitterItem);
            }

            autoHideSplitter.autoFitMode = 'proportional';

            //Specific browser bug fixes with height: auto and textOrientation: vertical
            if (LW.Utilities.Core.Browser.Safari && (position === 'left' || position === 'right')) {
                const tabStrip = tabsWindow.querySelector('.lw-tab-strip');

                tabsWindow.size = tabStrip.offsetWidth;
            }
            else {
                if (LW.Utilities.Core.Browser.Firefox && (position === 'top' || position === 'bottom')) {
                    const tabStrip = (tabsWindow.shadowRoot || tabsWindow).querySelector('.lw-tab-strip');

                    if (tabStrip) {
                        tabsWindow.size = tabStrip.offsetHeight;
                    }
                }

                tabsWindow.size = 'auto';
            }

            //Refreshes the min property
            if (tabsWindow.min) {
                tabsWindow.min = '';
            }

            tabsWindow.min = 30;
            tabsWindow.locked = true;

            autoHideSplitter.autoFitMode = 'end';
        }
    }

    /**
    * AutoHideContainer Close event handler
    */
    _autoHideWindowCloseHandler() {
        const that = this,
            targetTabsWindow = that.$.autoHideWindow._tabsWindow,
            scrollElement = document.scrollingElement || document.documentElement,
            x = scrollElement.scrollLeft,
            y = scrollElement.scrollTop;

        targetTabsWindow._moveContent(targetTabsWindow._autoHideWindow.items[0], targetTabsWindow._autoHideWindow._tab);

        if (!that.$.autoHideWindow.opened) {
            targetTabsWindow.selectedIndex = null;

            if (document.activeElement !== targetTabsWindow.$.tabsElement) {
                targetTabsWindow.$.tabsElement.focus();
                window.scrollTo(x, y);
            }

            return;
        }

        if (!targetTabsWindow.allowToggle) {
            return;
        }

        if (targetTabsWindow.$.tabsElement.selectedIndex !== null) {
            targetTabsWindow.select(targetTabsWindow.$.tabsElement.selectedIndex);

            if (document.activeElement !== targetTabsWindow.$.tabsElement) {
                targetTabsWindow.$.tabsElement.focus();
                window.scrollTo(x, y);
            }
        }
    }

    /**
     * AutoHideWindow ResizeEnd event handler
     */
    _autoHideWindowResizeEndHandler(event) {
        const autoHideWindow = event.target,
            dimension = autoHideWindow.resizeMode === 'left' || autoHideWindow.resizeMode === 'right' ? 'width' : 'height';

        if (autoHideWindow._tab) {
            autoHideWindow._tab._autoHideWindowSize = event.detail[dimension];
        }
    }

    /**
     * Cancels a drag operation and returns the item ot it's initial position. Used when dragging operation is interupted
     */
    _cancelDragOperation(noEndDrag) {
        const that = this;

        that.removeAttribute('dragged');
        that._dragDetails.windowFeedback.removeAttribute('tabs-window-dragged');
        that._dragDetails.windowFeedback.removeAttribute('ontop');
        that._returnItemToOrigin(that._dragDetails.windowFeedback);
        that._noStateChangeFiring = true;

        if (!noEndDrag) {
            that._endDrag();
        }
    }

    /**
    * Creates a new TabsWindow from an Object
    */
    _createTabsWindowFromObject(settings, retrieveContent) {
        const that = this,
            tabsWindow = document.createElement('lw-tabs-window');
        let item, headerButtons = ['close', 'autoHide'];

        tabsWindow.layout = that;

        if (settings.id) {
            tabsWindow.id = settings.id;
        }

        if (settings.disabled) {
            tabsWindow.disabled = settings.disabled;
        }

        if (settings.label) {
            tabsWindow.label = settings.label;
        }

        if (settings.headerPosition) {
            tabsWindow.headerPosition = settings.headerPosition;
        }

        if (settings.tabCloseButtons) {
            tabsWindow.tabCloseButtons = settings.tabCloseButtons;
        }

        if (settings.dropPosition) {
            tabsWindow.dropPosition = settings.dropPosition;
        }

        if (settings.resizeMode) {
            tabsWindow.resizeMode = settings.resizeMode;
        }

        tabsWindow.animation = that.animation;
        tabsWindow.rightToLeft = that.rightToLeft;
        tabsWindow.theme = that.theme;

        tabsWindow.draggable = settings.draggable !== undefined ? settings.draggable : true;
        tabsWindow.floatable = settings.floatable !== undefined ? settings.floatable : true;
        tabsWindow.tabCloseButtons = settings.tabCloseButtons ? settings.tabCloseButtons : tabsWindow.tabCloseButtons;

        if (settings.autoHide) {
            tabsWindow.autoHideWindow = that.$.autoHideWindow;
            tabsWindow.autoHide = tabsWindow.allowToggle = settings.autoHide;
            tabsWindow.autoHidePosition = settings.autoHidePosition;
        }
        else if (settings.undocked) {
            headerButtons = ['close', 'maximize', 'minimize'];
            tabsWindow.undocked = settings.undocked;
            tabsWindow.position = {
                top: settings.top ? ((settings.top + '').indexOf('%') > -1 ? settings.top : parseFloat(settings.top) + 'px') : undefined,
                left: settings.left ? ((settings.left + '').indexOf('%') > -1 ? settings.left : parseFloat(settings.left) + 'px') : undefined,
                width: settings.width,
                height: settings.height
            };
        }

        tabsWindow.tabPosition = settings.tabPosition || tabsWindow.tabPosition;
        tabsWindow.opened = tabsWindow.pinned = true;

        if (settings.headerButtons) {
            headerButtons = settings.headerButtons;
        }

        if (!settings.headerButtons || Array.isArray(settings.headerButtons) && settings.headerButtons.length === 0) {
            headerButtons = ['close', 'autoHide'];
        }

        tabsWindow.headerButtons = headerButtons;
        tabsWindow.size = settings.size || '';
        tabsWindow.max = settings.max || '';
        tabsWindow.min = settings.min ? settings.min : 30;
        tabsWindow.locked = settings.locked || false;
        tabsWindow.collapsible = settings.collapsible || false;
        tabsWindow.collapsed = settings.collapsed || false;

        if (settings.items && Array.isArray(settings.items)) {
            for (let i = 0; i < settings.items.length; i++) {
                if (retrieveContent && settings.items[i].instance) {
                    item = settings.items[i].instance;
                    item.index = null;
                    item.id = settings.items[i].id || '';
                }
                else {
                    item = document.createElement('lw-tab-item');
                    item.label = settings.items[i].label ? settings.items[i].label : '';
                    item.id = settings.items[i].id || '';

                    //Get Content from that.layout property
                    const content = settings.items[i].content,
                        selectorRegex = /^[#.]{1}\w(\w|-)+$/gm;

                    if (selectorRegex.test(content)) {
                        const elements = document.querySelectorAll(content);

                        for (let e = 0; e < elements.length; e++) {
                            const el = elements[e];

                            item.appendChild(el instanceof HTMLTemplateElement ? document.importNode(el.content, true) : el);
                        }
                    }
                    else {
                        item.content = settings.items[i].content ? settings.items[i].content : '';
                    }

                    item.selected = settings.items[i].selected ? settings.items[i].selected : false;
                    tabsWindow._isItemSelected = true;
                }

                item.draggable = settings.items[i].draggable !== undefined ? settings.items[i].draggable : true;
                item.floatable = settings.items[i].floatable !== undefined ? settings.items[i].floatable : true;
                if (settings.items[i].id) {
                    item.id = settings.items[i].id;
                }

                tabsWindow.appendChild(item);
            }
        }

        return tabsWindow;
    }

    /**
     * Creates Layout items from Array
     * @param {any} source
     * @param {any} retrieveContenent
     */
    _createItemsFromArray(source, retrieveContenent) {
        const that = this;
        let layoutConfig = source;
        const layoutLength = layoutConfig.length;

        that._removeAll(true);

        that._initializingItems = true;

        //Remove all undocked windows
        const undockedItems = that.undockedItems;

        for (let i = 0; i < undockedItems.length; i++) {
            undockedItems[i].layout = null;
            undockedItems[i].parentElement.removeChild(undockedItems[i]);
        }

        //Check if itemContainer settings are applied
        if (layoutLength === 1 && layoutConfig[0].type && layoutConfig[0].type.toLowerCase() === 'layoutgroup') {
            that.$.itemsContainer.orientation = layoutConfig[0].orientation || that.$.itemsContainer.orientation;
            that.$.itemsContainer.liveResize = layoutConfig[0].liveResize || that.$.itemsContainer.liveResize;
            that.$.itemsContainer.resizeMode = layoutConfig[0].resizeMode || that.$.itemsContainer.resizeMode;
            layoutConfig = layoutConfig[0].items;
        }

        let item;

        //Allows to style the items through CSS on element initialization
        that.$.itemsContainer.autoFitMode = 'end';

        for (let i = 0; i < layoutConfig.length; i++) {
            item = that._createLayoutItem(layoutConfig[i], retrieveContenent);

            if (item) {
                if (that.$.placeholderItem.parentElement) {
                    that.$.itemsContainer.removeChild(that.$.placeholderItem);
                }

                that.$.itemsContainer.appendChild(item);
            }
        }

        if (that._items.filter(item => item.opened).length === 0) {
            if (!that.$.placeholderItem.parentElement) {
                that.$.itemsContainer.appendChild(that.$.placeholderItem);
            }
        }
        else if (that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.removeChild(that.$.placeholderItem);
        }

        //Restore the desired autoFitMode
        that.$.itemsContainer.autoFitMode = 'proportional';

        delete that._initializingItems;
    }

    /**
     * Creates the Layout items
     * @param {any} settings
     * @param {any} retrieveContent
     */
    _createLayoutItem(settings, retrieveContent) {
        if (!settings) {
            return;
        }

        const that = this,
            splitteritem = document.createElement('lw-splitter-item');
        let item;

        if (settings.type && settings.type.toLowerCase() === 'layoutgroup') {
            //Create a splitter
            item = document.createElement('lw-splitter');

            item._isInShadowDOM = that.isInShadowDOM;

            item.autoFitMode = 'proportional';

            if (settings.id) {
                item.id = settings.id;
            }

            if (settings.orientation) {
                item.orientation = settings.orientation;
            }

            if (settings.resizeMode) {
                item.resizeMode = settings.resizeMode;
            }

            item.liveResize = that.liveResize;
            item.resizeStep = that.resizeStep;

            let newItem;

            for (let i = 0; i < settings.items.length; i++) {
                newItem = that._createLayoutItem(settings.items[i], retrieveContent);

                if (newItem) {
                    item.appendChild(newItem);
                }
            }

            if (!item.querySelector('lw-splitter-item')) {
                return;
            }
        }
        else {
            //Create a TabsWindow item
            item = that._createTabsWindowFromObject(settings.type && settings.type.toLowerCase() === 'layoutgroup' ? settings.items[0] : settings, retrieveContent);

            if (item.autoHide) {
                that._autoHide(item, item.autoHidePosition);
                delete item.autoHidePosition;
                return;
            }
            else if (item.undocked) {
                that.undock(item);
                that.getShadowRootOrBody().appendChild(item);
                that._ownTabWindow(item);
                item.opened = true;
                item.pinned = false;
                item.layout = that;

                if (item.position) {
                    item.style.left = item.position.left;
                    item.style.top = item.position.top;
                    item.style.width = item.position.width;
                    item.style.height = item.position.height;
                    delete item.position;
                }

                if (item.size) {
                    item.style.left = item.position.left;
                    item.style.top = item.position.top;
                }
                return;
            }

            that._items.push(item);
        }

        splitteritem.size = settings.size || '';
        splitteritem.max = settings.max || '';
        splitteritem.min = settings.min || 30;
        splitteritem.locked = settings.locked || false;
        splitteritem.collapsible = settings.collapsible || false;
        splitteritem.collapsed = settings.collapsed || false;

        splitteritem.appendChild(item);
        return splitteritem;
    }

    /**
     * Creates a JSON Array with the item structure of the Layout
     * @param {any} splitter
     */
    _createLayoutStructure(splitter, noInstance) {
        const that = this,
            structure = [];
        let items = splitter._items,
            item, splitterItem;
        const firstItemChild = items[0].$.content.children[0];

        function getItem(container) {
            let item = container.firstElementChild;

            while (item) {
                if (item instanceof LW.Splitter) {
                    return item;
                }
                else if (item instanceof LW.TabsWindow) {
                    return item;
                }

                item = item.nextElementSibling;
            }
        }

        if (items.length === 1 && firstItemChild instanceof LW.Splitter) {
            items = firstItemChild._items;

            if (splitter === that.$.itemsContainer) {
                that.$.itemsContainer.orientation = firstItemChild.orientation;
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i] === that.$.placeholderItem) {
                continue;
            }

            splitterItem = getItem(items[i].$.content);

            if (splitterItem instanceof LW.TabsWindow) {
                item = that._createTabsWindowStructure(splitterItem, noInstance);
            }
            else if (splitterItem instanceof LW.Splitter) {

                //Avoids unneccessarly complex structures like a single splitter in a splitter parent
                while (splitterItem._items.length === 1 && splitterItem._items[0].$.content.children[0] instanceof LW.Splitter) {
                    splitterItem = splitterItem._items[0].$.content.children[0];
                }

                //Avoids unnecesssary splitter creations with only 1 item inside
                if (splitterItem._items.length === 1) {
                    item = that._createTabsWindowStructure(splitterItem._items[0].$.content.children[0], noInstance);
                }
                else {
                    item = {
                        type: 'LayoutGroup',
                        items: that._createLayoutStructure(splitterItem, noInstance),
                        orientation: splitterItem.orientation
                    };
                }

                if (splitterItem.id) {
                    item.id = splitterItem.id
                }

                //Splitter settings
                if (splitterItem.resizeMode !== 'adjacent') {
                    item.resizeMode = splitterItem.resizeMode;
                }

                if (splitterItem.resizeStep !== 5) {
                    item.resizeStep = splitterItem.resizeStep;
                }

                if (splitterItem.liveResize) {
                    item.resizeStep = splitterItem.liveResize;
                }
            }

            //SplitterItem settings
            item.size = items[i][splitter._measurements.size];

            if (items[i].locked) {
                item.locked = true;
            }

            if (items[i].min) {
                item.min = items[i].min;
            }

            if (items[i].max) {
                item.max = items[i].max;
            }

            structure.push(item);
        }

        return structure;
    }

    /**
     * Cretes the JSON structure for a TabsWindow
     * @param {any} tabsWindow
     */
    _createTabsWindowStructure(tabsWindow, noInstance) {
        function createTabItemStructure(tabItem) {
            const tabItemStructure = {};

            tabItemStructure.type = 'LayoutPanelItem';
            tabItemStructure.label = tabItem.label || '';

            if (tabItem.selected) {
                tabItemStructure.selected = tabItem.selected;
            }

            if (tabItem.disabled) {
                tabItemStructure.disabled = tabItem.disabled;
            }

            tabItemStructure.draggable = tabItem.draggable !== undefined ? tabItem.draggable : true;
            tabItemStructure.floatable = tabItem.floatable !== undefined ? tabItem.floatable : true;

            if (!noInstance) {
                tabItemStructure.instance = tabItem;
            }

            if (tabItem.id) {
                tabItemStructure.id = tabItem.id;
            }

            return tabItemStructure;
        }

        const item = { type: 'LayoutPanel' };

        if (tabsWindow.id) {
            item.id = tabsWindow.id;
        }

        if (tabsWindow.disabled) {
            item.disabled = tabsWindow.disabled;
        }

        if (tabsWindow.label) {
            item.label = tabsWindow.label;
        }

        if (tabsWindow.autoHide) {
            item.autoHide = tabsWindow.autoHide;
            item.autoHidePosition = tabsWindow.tabPosition;
        }
        else if (tabsWindow.tabPosition !== 'top') {
            item.tabPosition = tabsWindow.tabPosition;
        }

        if (!tabsWindow.closest('lw-docking-layout') && !this._getClosestDockingLayout(tabsWindow)) {
            item.undocked = true;
            item.top = tabsWindow.style.top;
            item.left = tabsWindow.style.left;
            item.width = tabsWindow.style.width;
            item.height = tabsWindow.style.height;
        }

        if (tabsWindow.dropPosition && tabsWindow.dropPosition[0] !== 'all') {
            item.dropPosition = tabsWindow.dropPosition;
        }

        item.draggable = tabsWindow.draggable !== undefined ? tabsWindow.draggable : true;
        item.floatable = tabsWindow.floatable !== undefined ? tabsWindow.floatable : true;

        if (tabsWindow.floatable !== undefined) {
            item.floatable = tabsWindow.floatable;
        }

        if (tabsWindow.resizeMode !== 'none') {
            item.resizeMode = tabsWindow.resizeMode;
        }

        if (tabsWindow.items) {
            item.items = [];

            for (let i = 0; i < tabsWindow.items.length; i++) {
                item.items.push(createTabItemStructure(tabsWindow.items[i]));
            }
        }

        return item;
    }

    /**
    * Called when the tab strip of the Tab has been resized via inline JS. Check function called _fixTabStripNotChrome() in lw.tabs.js
    */
    _containerTabStripResizeHandler(event) {
        const that = this,
            splitter = event.target.closest('lw-splitter');

        if (splitter === that.$.horizontalHiddenItemsContainer || splitter === that.$.verticalHiddenItemsContainer) {
            splitter._resizeEventHandler();
            that._setAutoHidePaddings();
        }
    }

    /**
     * Finds a TabItem/TabsWindow by id inside ShadowDOMs
     */
    _getItemById(tabsWindow) {
        const that = this,
            itemId = tabsWindow;

        tabsWindow = document.getElementById(itemId);

        if (tabsWindow) {
            return tabsWindow;
        }

        if (that.shadowRoot) {
            //Check for TabsWindow
            tabsWindow = that.shadowRoot.querySelector('#' + itemId);

            //Check for TabItem
            if (!tabsWindow) {
                let items = that.items;

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];

                    if (item.shadowRoot) {
                        tabsWindow = item.shadowRoot.querySelector('#' + itemId);

                        if (tabsWindow) {
                            return tabsWindow;
                        }
                    }
                }

                //Searhes for external TabsWindows that belong to the DockingLayout
                items = document.querySelectorAll('lw-tabs-window');

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];

                    if (item.layout !== that) {
                        continue;
                    }

                    if (item.shadowRoot) {
                        tabsWindow = item.shadowRoot.querySelector('#' + itemId);

                        if (tabsWindow) {
                            return tabsWindow;
                        }
                    }
                }
            }
        }
    }

    /**
    * Docks a TabsWindow
    */
    _dock(tabsWindow, position) {
        const that = this;

        if (typeof tabsWindow === 'number') {
            tabsWindow = that._items[tabsWindow];
        }
        else if (typeof tabsWindow === 'string') {
            tabsWindow = that._getItemById(tabsWindow);
        }

        if (!tabsWindow) {
            return;
        }

        let newTabsWindow;

        if (tabsWindow instanceof LW.TabItem) {
            const tabItemDockingDetails = that._handleTabItemDocking(tabsWindow);

            tabsWindow = tabItemDockingDetails.tabsWindow;
            newTabsWindow = tabItemDockingDetails.newTabsWindow;
        }
        else if (typeof tabsWindow === 'object' && !(tabsWindow instanceof HTMLElement)) {
            tabsWindow = that._createTabsWindowFromObject(tabsWindow);
        }
        if (!(tabsWindow instanceof LW.TabsWindow) || !tabsWindow.autoHide) {
            if (that._items.indexOf(tabsWindow) < 0 || (!tabsWindow.opened && !tabsWindow.parentElement)) {
                tabsWindow.autoHide = false;

                //TODO: Check if lastItem and if it is use the tabsWindow instead
                if (tabsWindow.items.length === 0 && that.snapMode === 'simple') {
                    tabsWindow.parentElement.removeChild(tabsWindow);
                }

                //Dock inside the Layout
                if (!position) {
                    that.appendChild(tabsWindow);
                }
                else {
                    that._insert(-1, tabsWindow, position ? 'layout-' + position : undefined);
                }
            }

            return;
        }

        if (!(that.shadowRoot || that).contains(tabsWindow)) {
            return;
        }

        const splitterItem = tabsWindow.closest('lw-splitter-item'),
            splitter = tabsWindow.closest('lw-splitter'),
            isLastItem = splitterItem.nextElementSibling ? false : true;

        if (!position) {
            if (splitter.orientation === 'horizontal') {
                position = isLastItem ? 'bottom' : 'top';
            }
            else {
                position = isLastItem ? 'right' : 'left';
            }
        }

        if (tabsWindow.items.length === 0) {
            splitterItem.closest('lw-splitter').removeChild(splitterItem);
        }

        if (newTabsWindow) {
            tabsWindow = newTabsWindow;
        }

        if (tabsWindow.autoHide) {
            if (that.$.verticalHiddenItemsContainer.contains(tabsWindow)) {
                that.$.verticalHiddenItemsContainer.removeChild(tabsWindow.closest('lw-splitter-item'))
            }
            else if (that.$.horizontalHiddenItemsContainer.contains(tabsWindow)) {
                that.$.horizontalHiddenItemsContainer.removeChild(tabsWindow.closest('lw-splitter-item'))
            }

            tabsWindow.tabPosition = tabsWindow._originalTabPosition || 'top';
            delete tabsWindow._originalTabPosition;
        }

        that._setDockedItemsHeaderButtons(tabsWindow);

        //Reset the proeprties of the Window
        tabsWindow.autoHide = tabsWindow.allowToggle = tabsWindow.maximized = tabsWindow.minimized = tabsWindow.collapsed = tabsWindow.locked = false;
        tabsWindow.tabTextOrientation = 'horizontal';

        that.$.autoHideWindow.close();
        that._insert(-1, tabsWindow, 'layout-' + position);
        that._setAutoHidePaddings();
        delete that._dockingAutoHideTabItem;
    }

    /**
     * Handles the dokcing of TabItems. Called in _dock method.
     * @param {any} tabsWindow
     */
    _handleTabItemDocking(tabsWindow) {
        const that = this,
            parentTabsWindow = (tabsWindow.isInShadowDOM ? tabsWindow.getRootNode().host : tabsWindow).closest('lw-tabs-window');
        let newTabsWindow;

        if (parentTabsWindow) {
            const autoHideWindow = that.$.autoHideWindow;

            if (!parentTabsWindow.autoHide) {
                return { tabsWindow: parentTabsWindow, newTabsWindow: parentTabsWindow };
            }

            that._dockingAutoHideTabItem = true;

            newTabsWindow = parentTabsWindow.items.length === 1 ? parentTabsWindow : document.createElement('lw-tabs-window');

            delete tabsWindow._autoHideWindowSize;

            newTabsWindow.size = autoHideWindow.resizeMode === 'left' || autoHideWindow.resizeMode === 'right' ? autoHideWindow.offsetWidth : autoHideWindow.offsetHeight;
            parentTabsWindow.removeChild(tabsWindow);

            if (parentTabsWindow.items.length === 0 && !newTabsWindow.id) {

                if (!(that.shadowRoot || that).contains(parentTabsWindow)) {
                    parentTabsWindow.parentElement.removeChild(parentTabsWindow);
                }
            }

            //Copy settings to the new Window
            newTabsWindow.tabCloseButtons = parentTabsWindow.tabCloseButtons;
            newTabsWindow.dropPosition = parentTabsWindow.dropPosition;
            newTabsWindow.draggable = tabsWindow.draggable;
            newTabsWindow.floatable = tabsWindow.floatable;
        }

        if (!newTabsWindow) {
            newTabsWindow = document.createElement('lw-tabs-window');
        }

        newTabsWindow.animation = that.animation;
        newTabsWindow.rightToLeft = that.rightToLeft;
        newTabsWindow.theme = that.theme;

        newTabsWindow.min = 30;
        newTabsWindow.opened = newTabsWindow.pinned = newTabsWindow.autoHide = true;
        newTabsWindow.style.maxWidth = newTabsWindow.style.maxHeight = '';
        newTabsWindow._originalTabPosition = parentTabsWindow._originalTabPosition || undefined;
        newTabsWindow._originalTextOrientation = parentTabsWindow._originalTextOrientation || undefined;

        if (newTabsWindow !== parentTabsWindow) {
            delete parentTabsWindow._originalTabPosition;
            delete parentTabsWindow._originalTextOrientation;
        }

        newTabsWindow.label = tabsWindow.label;
        newTabsWindow.appendChild(tabsWindow);
        tabsWindow = parentTabsWindow;

        return { tabsWindow: tabsWindow, newTabsWindow: newTabsWindow };
    }

    /**
    * lwTabsWindow Dock event handler
    * @param {any} event
    */
    _dockEventHandler(event) {
        const that = this;
        let tabsWindow = event.target;

        if (tabsWindow._tabsWindow) {
            tabsWindow = tabsWindow._tabsWindow;
        }

        if (tabsWindow.autoHide) {
            that._dock(tabsWindow.items[tabsWindow.selectedIndex]);
        }
        else {
            that._autoHide(tabsWindow, that._items.indexOf(tabsWindow) < (that._items.length - 1) / 2);
        }
    }

    /**
     * Down Event Handler
     * @param {any} event
     */
    _documentDownHandler(event) {
        const that = this;
        let target = event.originalEvent.target;

        if (target.shadowRoot) {
            target = event.originalEvent.composedPath()[0];

            while (target) {
                if (target.closest('.lw-window')) {
                    target = target.closest('.lw-window');
                    break;
                }

                target = target.getRootNode().host;
            }
        }
        else {
            target = target.closest('.lw-window');
        }

        if (that.$.autoHideWindow._tabsWindow && (!target || (target !== that.$.autoHideWindow && target !== that.$.autoHideWindow._tabsWindow))) {
            that.$.autoHideWindow._tabsWindow.selectedIndex = null;
        }

        if (that._dragDetails) {
            that._cancelDragOperation();
            return;
        }

        //Check for TabsWindow because all TabsWindows should be abble to be inserted into the Layout
        if (!(target instanceof LW.TabsWindow) || !that.draggable || that.disabled) {
            return;
        }

        if (that._dragDetails || target.maximized || target.minimized || (!LW.Utilities.Core.isMobile && event.which !== 1) ||
            (target._dragDetails && target._dragDetails.type === 'resize' && target._dragDetails.started)) {
            return;
        }

        const originalTarget = event.originalEvent.target.shadowRoot ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        target = originalTarget.closest('.lw-header-section') || originalTarget.closest('.lw-tab-label-container');

        that._dragDetails = {};

        if (target && target.classList.contains('lw-header-section') && (that.snapMode === 'simple' || originalTarget.closest('.lw-buttons-container'))) {
            target = undefined;
        }

        that._dragDetails.windowFeedback = that.$.tabsWindowFeedback;

        if (target) {
            const rootNode = target.getRootNode() && target.getRootNode().host ? target.getRootNode().host : target;

            that._dragDetails.selectedTabsWindow = target.closest('lw-tabs-window') || (rootNode ? rootNode.closest('lw-tabs-window') : undefined);

            if (that._dragDetails.selectedTabsWindow === that.$.autoHideWindow) {
                that._dragDetails.selectedItem = that.$.autoHideWindow._tabsWindow.closest('lw-splitter-item');

                if (!that.$.autoHideWindow._tabsWindow.draggable) {
                    that._dragDetails = undefined;
                    return;
                }
            }
            else {
                that._dragDetails.selectedItem = that._dragDetails.selectedTabsWindow.closest('lw-splitter-item');
            }

            if (!that._dragDetails.selectedTabsWindow || !that._dragDetails.selectedTabsWindow.draggable || that._dragDetails.selectedTabsWindow.layout !== that) {
                that._dragDetails = undefined;
                return;
            }

            that._dragDetails.offset = { x: 0, y: 0 };

            that._dragDetails.selectedTabLabel = target;
            that._dragDetails.x = event.pageX;
            that._dragDetails.y = event.pageY;

            if (that._dragDetails.selectedTabLabel.$.hasClass('lw-header-section')) {
                if (!that._dragDetails.selectedItem && that._dragDetails.selectedTabsWindow.pinned) {
                    that._dragDetails = undefined;
                    return;
                }

                that._dragDetails.windowFeedback = that._dragDetails.selectedTabsWindow;

                const targetRect = target.getBoundingClientRect();

                that._dragDetails.offset.x = event.clientX - targetRect.left;
                that._dragDetails.offset.y = event.clientY - targetRect.top;
            }
            else {
                if (!that._dragDetails.selectedTabLabel.tab || (that._dragDetails.selectedTabLabel.tab.draggable !== undefined && !that._dragDetails.selectedTabLabel.tab.draggable)) {
                    that._dragDetails = undefined;
                    return;
                }

                if (that._dragDetails.selectedTabsWindow.items.length === 1) {
                    that._dragDetails.windowFeedback = that._dragDetails.selectedTabsWindow;
                    that._dragDetails.windowFeedback.floatable = that._dragDetails.selectedTabsWindow.items[0].floatable;
                }
            }
        }

        that._items.map(item => item.removeAttribute('ontop'));


        if (that._dragDetails.windowFeedback !== that.$.autoHideWindow) {
            that._dragDetails.windowFeedback.setAttribute('ontop', '');
        }
    }



    /**
     * ShadowDOM check if the target is inside the element
     */
    _getClosestDockingLayout(target) {
        const that = this,
            targetElement = (that.shadowRoot || that.isInShadowDOM ? that.getRootNode().host : that).nodeName.toLowerCase(),
            closestDockingHost = this._getClosestElement(targetElement, target);

        return closestDockingHost ? that : closestDockingHost;
    }

    _getClosestElement(hostName, target) {
        const that = this;

        if (!target || !that.isInShadowDOM) {
            return;
        }

        if (!target.getRootNode()) {
            return;
        }

        let host = target.getRootNode().host;

        while (host) {
            if (!host.closest) {
                return;
            }

            if (host.closest(hostName)) {
                return host.closest(hostName);
            }

            host = host.getRootNode() ? host.getRootNode().host : undefined;
        }
    }

    /**
    * Document Move Event Handler
    * @param {any} event
    */
    _documentMoveHandler(event) {
        const that = this,
            target = LW.Utilities.Core.isMobile ? document.elementFromPoint(event.pageX - window.pageXOffset, event.pageY - window.pageYOffset) :
                ((that.isInShadowDOM || event.originalEvent.target.shadowRoot) ? event.originalEvent.composedPath()[0] : event.originalEvent.target);

        if (that.disabled || !that._dragDetails || (that._dragDetails && !that._dragDetails.selectedTabsWindow) || !target) {
            return;
        }

        if (Math.abs(event.pageX - that._dragDetails.x) <= 5 && Math.abs(event.pageY - that._dragDetails.y) <= 5) {
            return;
        }

        //Keep starting x,y scoll cordinates
        const scrollElement = document.scrollingElement || document.documentElement,
            x = scrollElement.scrollLeft,
            y = scrollElement.scrollTop,
            selectedTabsWindow = that._dragDetails.selectedTabsWindow;

        that._dragDetails.isInsideTheLayout = target.closest && target.closest('lw-docking-layout') === that;

        if (!that._dragDetails.isInsideTheLayout && (that.shadowRoot || that.isInShadowDOM)) {
            that._dragDetails.isInsideTheLayout = that._getClosestDockingLayout(target);
        }

        that._dragDetails.started = true;

        if (that._dragDetails.windowFeedback === that.$.autoHideWindow) {
            const selectedTabsWindowRect = that._dragDetails.selectedTabsWindow.getBoundingClientRect();
            let newTabsWindow;

            if (that.$.autoHideWindow._tabsWindow.items.length === 1) {
                newTabsWindow = that.$.autoHideWindow._tabsWindow;
            }
            else {
                newTabsWindow = document.createElement('lw-tabs-window');
                newTabsWindow.draggable = true;
                newTabsWindow.min = 30;
                newTabsWindow.layout = that;
            }

            newTabsWindow.style.width = selectedTabsWindowRect.width + 'px';
            newTabsWindow.style.height = selectedTabsWindowRect.height + 'px';
            newTabsWindow.style.left = selectedTabsWindowRect.left + 'px';
            newTabsWindow.style.top = selectedTabsWindowRect.top + 'px';

            newTabsWindow.setAttribute('ontop', '');
            that._dragDetails.windowFeedback = newTabsWindow;
            that.$.autoHideWindow.$.addClass('no-transition');
            that.$.autoHideWindow.close();
            that.$.autoHideWindow.$.removeClass('no-transition');
        }

        that._setDragDetailsOnMove(target);

        that.$.autoHideWindow.close();

        if (!that._dragDetails.windowFeedback.classList.contains('lw-tabs-window-feedback')) {
            that._handleWindowOnDrag();
        }
        else {
            if (!that._dragDetails._parentInfo) {
                that._dragDetails._parentInfo = {
                    closestItem: selectedTabsWindow,
                    position: that._originalTabIndex || that._dragDetails.selectedTabLabel.tab.index
                };

                that._originalTabIndex = undefined;
            }

            if (!that.getShadowRootOrBody().contains(that._dragDetails.windowFeedback)) {
                that.getShadowRootOrBody().appendChild(that._dragDetails.windowFeedback);
            }

            if (that._dragDetails.selectedItem) {
                const closestSplitter = that._dragDetails.selectedItem.closest('lw-splitter');

                if (!that._dragDetails.windowFeedback.size && closestSplitter) {
                    that._dragDetails.windowFeedback.size = that._dragDetails.selectedTabsWindow[closestSplitter._measurements.size];
                }
            }
        }

        if (!that._dragDetails.selectedTabLabel.classList.contains('lw-header-section')) {
            that._dragDetails.windowFeedback.setAttribute('tabs-window-dragged', '');
        }

        if (that._dragDetails.windowFeedback.hasAttribute('tabs-window-dragged') || that._dragDetails.selectedTabsWindow === that.$.autoHideWindow ||
            (that._dragDetails._parentInfo && typeof (that._dragDetails._parentInfo.position) === 'string')) {
            that._dragDetails.windowFeedback.style.left = (event.pageX - that._dragDetails.offset.x) + 'px';
            that._dragDetails.windowFeedback.style.top = (event.pageY - that._dragDetails.offset.y) + 'px';
            that._setWindowFeedbackSize();
        }

        that._dragDetails.windowFeedback.opened = true;

        if (document.activeElement !== that) {
            that.focus();
            window.scrollTo(x, y);
        }

        let tabHeader = that._dragDetails.hoveredTabsWindow ? target.closest('.lw-tabs-header-section') : undefined;
        if (!tabHeader && (that.shadowRoot || that.isInShadowDOM)) {
            tabHeader = that._getClosestElement('.lw-tabs-header-section', target);
        }

        if (tabHeader) {
            that._dragDetails.hoveredTabArea = tabHeader;
        }
        else {
            that._dragDetails.hoveredTabArea = that._dragDetails.hoveredTabsWindow && target.closest('.lw-tabs-content-section') ?
                that._dragDetails.hoveredTabsWindow.$.tabsElement.$.tabContentSection : that._dragDetails.hoveredTabsWindow;
        }

        //Fixes the tabSelectionBar
        if (that.shadowRoot && that._dragDetails.selectedTabsWindow === that._dragDetails.windowFeedback) {
            requestAnimationFrame(() => {
                if (that._dragDetails) {
                    that._dragDetails.windowFeedback.refreshTabHeader();
                }
            })
        }

        //Snapping handler
        that._setSnappingMarkers(event, tabHeader);
    }

    /**
     * Sets additional dragDetails on DocumentMove. Used in _documentMoveHandler
     * @param {any} target
     */
    _setDragDetailsOnMove(target) {
        const that = this;
        let closestDockingLayout;

        if (!that.hasAttribute('dragged')) {
            //Avoid page scrollbar appearing
            that._originalBodyOverflow = { overflowX: document.body.style.overflowX, overflowY: document.body.style.overflowY, overflow: document.body.style.overflow };

            const isVerticalScrollable = (document.scrollingElement || document.documentElement).scrollHeight > document.documentElement.clientHeight,
                isHorizontalScrollable = (document.scrollingElement || document.documentElement).scrollWidth > document.documentElement.clientWidth;
            let selectedTabsWindow = that._dragDetails.selectedTabsWindow;

            document.body.style.overflow = document.body.style.overflowX = document.body.style.overflowY = '';

            if (isVerticalScrollable && !isHorizontalScrollable) {
                document.body.style.overflowX = 'hidden';
            }
            else if (isHorizontalScrollable && !isVerticalScrollable) {
                document.body.style.overflowY = 'hidden';
            }
            else if (!isHorizontalScrollable && !isVerticalScrollable) {
                document.body.style.overflow = 'hidden';
            }

            if (that._dragDetails.windowFeedback.$.hasClass('lw-tabs-window-feedback') || selectedTabsWindow === that.$.autoHideWindow) {
                const tabItem = that._dragDetails.selectedTabLabel.tab || that.$.autoHideWindow._tab;
                let feedbackWindow = that.$.tabsWindowFeedback

                if (selectedTabsWindow === that.$.autoHideWindow) {
                    selectedTabsWindow = that.$.autoHideWindow._tabsWindow;
                    feedbackWindow = that._dragDetails.windowFeedback;
                    feedbackWindow.label = tabItem.label;
                    feedbackWindow.floatable = tabItem.draggable;
                    feedbackWindow.floatable = tabItem.floatable;
                }

                //Prevents touchmove event from braking on iOS
                if (LW.Utilities.Core.isMobile && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
                    that._dragDetails.selectedTabLabel._lazyRemove = true;
                }

                if (tabItem.parentElement) {
                    selectedTabsWindow.removeChild(tabItem);

                    if (!that._dragDetails.selectedItem.style.width) {
                        that._dragDetails.selectedItem.closest('lw-splitter').refresh();
                    }
                }

                that._originalTabIndex = tabItem.index;

                feedbackWindow.appendChild(tabItem);

                const draggedWindow = that._dragDetails.selectedTabsWindow;

                if (draggedWindow === that.$.autoHideWindow) {
                    if (draggedWindow._tabsWindow.items.length > 1) {
                        feedbackWindow.tabPosition = draggedWindow.tabPosition;
                        feedbackWindow.tabTextOrientation = draggedWindow._originalTextOrientation || draggedWindow.tabTextOrientation;
                    }
                }
                else {
                    const isAutoHide = draggedWindow.autoHide;

                    feedbackWindow.tabPosition = draggedWindow._originalTabPosition || (isAutoHide ? 'top' : draggedWindow.tabPosition);
                    feedbackWindow.tabTextOrientation = draggedWindow._originalTextOrientation || (isAutoHide ? 'horizontal' : draggedWindow.tabTextOrientation);
                }

                if (tabItem._autoHideWindowSize) {
                    feedbackWindow.size = tabItem._autoHideWindowSize;
                }
                else if (selectedTabsWindow.autoHide) {
                    const sizeName = 'offset' + (selectedTabsWindow.tabPosition === 'top' || selectedTabsWindow.tabPosition === 'bottom' ? 'Height' : 'Width');

                    feedbackWindow.size = (selectedTabsWindow._autoHideWindow || selectedTabsWindow)[sizeName];
                }
            }

            closestDockingLayout = that._dragDetails.selectedTabsWindow.closest('lw-docking-layout');

            if (!closestDockingLayout && that.shadowRoot) {
                closestDockingLayout = that._getClosestDockingLayout(that._dragDetails.selectedTabsWindow);
            }

            if (!closestDockingLayout && !that._dragDetails.windowFeedback._originalPinnedState) {
                that._dragDetails.windowFeedback._originalPinnedState = that._dragDetails.windowFeedback.pinned;
            }

            that._dragDetails.windowFeedback.pinned = false;
            that.setAttribute('dragged', '');
        }

        that._dragDetails.hoveredItem = target.closest('lw-splitter-item');

        if (!that._dragDetails.hoveredItem && (that.shadowRoot || that.isInShadowDOM)) {
            that._dragDetails.hoveredItem = that._getClosestElement('lw-splitter-item', target);
        }

        if (that._dragDetails.hoveredItem) {
            closestDockingLayout = that._dragDetails.hoveredItem.closest('lw-docking-layout');

            if (!closestDockingLayout && that.shadowRoot) {
                closestDockingLayout = that._getClosestDockingLayout(that._dragDetails.hoveredItem);
            }

            if (closestDockingLayout && closestDockingLayout === that) {
                that._dragDetails.hoveredTabsWindow = that._dragDetails.hoveredItem.querySelector('lw-tabs-window');
            }
            else {
                that._dragDetails.hoveredItem = that._dragDetails.hoveredTabsWindow = undefined;
            }
        }
        else {
            that._dragDetails.hoveredTabsWindow = target.closest('lw-tabs-window') ||
                (target.getRootNode() && target.getRootNode().host ? target.getRootNode().host.closest('lw-tabs-window') : undefined);
        }

        if (that._dragDetails.hoveredTabsWindow) {
            closestDockingLayout = that._dragDetails.hoveredTabsWindow.closest('lw-docking-layout');

            if (!closestDockingLayout && that.shadowRoot) {
                closestDockingLayout = that._getClosestDockingLayout(that._dragDetails.hoveredTabsWindow);
            }

            if (closestDockingLayout && closestDockingLayout !== that) {
                that._dragDetails.hoveredTabsWindow = undefined;
            }
            else {
                that._dragDetails.hoveredTabsWindow.bringToFront();
            }
        }
    }

    /**
     * Document Drag Start event handler
     * @param {any} event
     */
    _documentDragStartHandler(event) {
        const that = this;

        if (that.contains(event.target) || that.contains(event.composedPath()[0]) ||
            (that.snapMode === 'simple' && that._dragDetails && that._dragDetails.selectedTabLabel)) {
            event.preventDefault();
        }
    }

    /**
     * Document Select Start event handler
     */
    _documentSelectStartHandler(event) {
        const that = this;

        if (that._dragDetails && that._dragDetails.started) {
            event.preventDefault();
        }
    }

    /**
     * Document Up Event Handler
     */
    _documentUpHandler(event) {
        const that = this,
            originalEvent = event.originalEvent || event,
            target = originalEvent.target.getRootNode().host ? originalEvent.composedPath()[0] : originalEvent.target;

        if (!that._dragDetails || (that._dragDetails && !that._dragDetails.started) || that.disabled) {
            delete that._dragDetails;
            return;
        }

        that._noStateChangeFiring = true;
        that.removeAttribute('dragged');
        that._dragDetails.windowFeedback.removeAttribute('tabs-window-dragged');
        that._dragDetails.windowFeedback.removeAttribute('ontop');

        let isInsideTheLayout = target.closest && target.closest('lw-docking-layout');

        if (!isInsideTheLayout && (that.shadowRoot || that.isInShadowDOM)) {
            isInsideTheLayout = that._getClosestDockingLayout(target);
        }

        if (event.ctrlKey) {
            that._snapFeedback._position = isInsideTheLayout = undefined;
        }

        const snapFeedbackPosition = that._snapFeedback ? that._snapFeedback._position : undefined;

        if ((!isInsideTheLayout && !snapFeedbackPosition) || (isInsideTheLayout && !that._dragDetails.hoveredTabArea && !snapFeedbackPosition)) {
            that._dropWindowOutsideLayout(event, snapFeedbackPosition, isInsideTheLayout);
        }
        else if (that._dragDetails.hoveredTabsWindow && snapFeedbackPosition) {
            if (that._dragDetails.hoveredTabArea && that._dragDetails.hoveredTabArea.classList.contains('lw-tabs-header-section')) {
                let tabLabelCount = that._dragDetails.hoveredTabsWindow.itemLabels.length;

                let hoveredTabLabel = target.closest('.lw-tab-label-container'), addToEnd;

                if (!hoveredTabLabel || hoveredTabLabel.$.hasClass('lw-add-new-tab') || !hoveredTabLabel.tab) {
                    hoveredTabLabel = that._dragDetails.hoveredTabsWindow.itemLabels[tabLabelCount - 1];
                    addToEnd = true;
                }

                let items;

                if (that._dragDetails.selectedTabLabel.$.hasClass('lw-tab-label-container') && that._dragDetails.windowFeedback.$.hasClass('lw-tabs-window-feedback')) {
                    items = [that._dragDetails.selectedTabLabel.tab];
                }
                else {
                    items = [].slice.call(that._dragDetails.windowFeedback.items);
                }

                let size;

                if (that._dragDetails.hoveredTabsWindow.autoHide) {
                    const autoHidePosition = that._dragDetails.hoveredTabsWindow.tabPosition;

                    size = that._dragDetails.windowFeedback['offset' + (autoHidePosition === 'top' || autoHidePosition === 'bottom' ? 'Height' : 'Width')];
                }

                for (let i = 0; i < items.length; i++) {
                    items[i]._autoHideWindowSize = size || that._dragDetails.windowFeedback.size;
                    that._dragDetails.windowFeedback.removeChild(items[i]);
                    that._dragDetails.hoveredTabsWindow.insert(addToEnd ? tabLabelCount : hoveredTabLabel.tab.index, { node: items[i] });
                    tabLabelCount = that._dragDetails.hoveredTabsWindow.items.length;
                }

                that._dragDetails.targetWindow = that._dragDetails.hoveredTabsWindow;
            }
            else {
                that._dragDetails.targetWindow = that._handleItemNesting();
                that._eventAlreadyFired = true;
            }

            //Close the autoHideWindow
            that.$.autoHideWindow.close();
            that._noStateChangeFiring = false;
        }

        //Fixes the tabSelectionBar
        if (that.shadowRoot || that.isInShadowDOM) {
            const targetWindow = that._dragDetails.targetWindow;

            setTimeout(() => targetWindow.refreshTabHeader(), 100);
        }

        that._endDrag();
    }

    /**
     * Drops a dragged window outside of the Layout. A possible outcome from _documentUpHandler
     * @param {any} event
     * @param {any} snapFeedbackPosition
     */
    _dropWindowOutsideLayout(event, snapFeedbackPosition, isInsideTheLayout) {
        const that = this;
        let targetWindow;

        if (!that.floatable || (that._dragDetails.windowFeedback.floatable !== undefined && !that._dragDetails.windowFeedback.floatable)) {
            that._cancelDragOperation(true);
            return;
        }

        if (that._dragDetails.windowFeedback.classList.contains('lw-tabs-window-feedback')) {
            const tabItem = that._dragDetails.windowFeedback.items[0];

            if (tabItem && tabItem.floatable !== undefined && !tabItem.floatable) {
                that._cancelDragOperation(true);
                return;
            }

            //Leave outside the Layout
            const selectedTabItem = that._dragDetails.selectedTabLabel.tab;
            let newWindow = document.createElement('lw-tabs-window');


            newWindow.opened = true;
            newWindow.animation = that.animation;
            newWindow.rightToLeft = that.rightToLeft;
            newWindow.theme = that.theme;
            newWindow.label = selectedTabItem.label;

            that._dragDetails.windowFeedback.removeChild(selectedTabItem);
            that._dragDetails.selectedTabLabel.tab.$.removeClass('lw-visibility-hidden');
            newWindow.appendChild(that._dragDetails.selectedTabLabel.tab);
            newWindow.style.left = event.pageX + 'px';
            newWindow.style.top = event.pageY + 'px';
            newWindow.style.maxWidth = newWindow.style.maxHeight = '';
            newWindow.resizeMode = that._dragDetails.selectedTabsWindow.resizeMode;
            newWindow.tabTextOrientation = that._dragDetails.windowFeedback.tabTextOrientation;
            newWindow.tabPosition = that._dragDetails.windowFeedback.tabPosition;
            newWindow.min = 30;
            newWindow.style.width = that._dragDetails.windowFeedback.style.width;
            newWindow.style.height = that._dragDetails.windowFeedback.style.height
            newWindow.draggable = selectedTabItem.draggable !== undefined ? selectedTabItem.draggable : true;
            newWindow.floatable = selectedTabItem.floatable !== undefined ? selectedTabItem.floatable : true;

            that.getShadowRootOrBody().appendChild(newWindow);

            newWindow.pinned = newWindow.autoHide = newWindow.allowToggle = false;
            that._noStateChangeFiring = false;
            targetWindow = newWindow;
        }
        else {
            if (that._dragDetails._parentInfo && that._dragDetails._parentInfo.closestItem) {
                if (that._dragDetails.windowFeedback.parentElement !== that.getShadowRootOrBody()) {
                    that._dragDetails.windowFeedback.windowParent = 'body';
                    that.getShadowRootOrBody().appendChild(that._dragDetails.windowFeedback);
                }

                //Reset window properties
                that._dragDetails.windowFeedback.style.maxWidth = that._dragDetails.windowFeedback.style.maxHeight = '';
                that._dragDetails.windowFeedback.pinned = that._dragDetails.windowFeedback.allowToggle = that._dragDetails.windowFeedback.autoHide = false;

                if (that._dragDetails.selectedTabLabel.$.hasClass('lw-tab-label-container')) {
                    that._dragDetails.windowFeedback.label = that._dragDetails.selectedTabLabel.tab.label;
                }
            }
            else if (!snapFeedbackPosition && !(that._dragDetails.selectedItem instanceof LW.SplitterItem) &&
                that._dragDetails.selectedTabLabel.$.hasClass('lw-tab-label-container')) {
                that._returnItemToOrigin(that._dragDetails.windowFeedback);
            }

            targetWindow = that._dragDetails.windowFeedback;
            targetWindow.locked = false;

            if (that._dragDetails.selectedItem) {
                that._noStateChangeFiring = false;
            }
        }

        //Close the autoHideWindow
        that.$.autoHideWindow.close();

        if (!isInsideTheLayout) {
            that._dragDetails.windowFeedback.pinned = false;
        }

        that._validateWindowPosition(targetWindow);

        //Remember the previous item
        if (that._dragDetails._parentInfo) {
            targetWindow._parentInfo = {
                closestItem: that._dragDetails._parentInfo.closestItem,
                position: that._dragDetails._parentInfo.position
            };
        }

        targetWindow.layout = that;
        that._dragDetails.targetWindow = targetWindow;

        //Reset the tabPosition of floating windows
        targetWindow.resizeMode = 'both';
        that._setFloatingItemsHeaderButtons(targetWindow);
        that._ownTabWindow(targetWindow);
    }

    /**
    * Resets the position of a dragged item if the destination is invalid
    */
    _endDrag() {
        const that = this,
            windowFeedback = that._dragDetails.windowFeedback;

        that.$.tabsWindowFeedback.close();

        if (windowFeedback.$.tabsElement._tabs.length === 0 &&
            !windowFeedback.$.hasClass('lw-tabs-window-feedback')) {
            windowFeedback.remove();
        }

        if (!(that.shadowRoot || that).contains(that._dragDetails.windowFeedback) && that._dragDetails.windowFeedback._originalPinnedState !== undefined) {
            that._dragDetails.windowFeedback.pinned = that._dragDetails.windowFeedback._originalPinnedState;
            delete that._dragDetails.windowFeedback._originalPinnedState;
        }

        if (that._originalBodyOverflow) {
            document.body.style.overflow = that._originalBodyOverflow.overflow;
            document.body.style.eoverflowX = that._originalBodyOverflow.overflowX;
            document.body.style.overflowY = that._originalBodyOverflow.overflowY;
            delete that._originalBodyOverflow;
        }

        if (that._dragDetails.targetWindow) {
            that._dragDetails.targetWindow.focus();

            if (that._dragDetails.selectedTabsWindow) {
                that._dragDetails.selectedTabsWindow.removeAttribute('active');
            }
        }
        else {
            that._dragDetails.windowFeedback.bringToFront();
        }

        //Ends the dragging
        that._dragDetails.started = false;
        that._dragDetails.hoveredItem = that._dragDetails.hoveredTabsWindow = that._dragDetails.isInsideTheLayout = undefined;
        windowFeedback.removeAttribute('dragged');
        that._handleSnapping();

        if (that._dragDetails.selectedTabsWindow) {
            delete that._dragDetails.selectedTabsWindow._ownerLayout;
        }

        if (windowFeedback.items.length === 0) {
            if ((that.shadowRoot || that).contains(windowFeedback)) {
                windowFeedback.opened = false;
            }

            if (windowFeedback.$.hasClass('lw-tabs-window-feedback')) {
                that.$.container.appendChild(windowFeedback);
            }
        }

        if (!that._eventAlreadyFired && !that._noStateChangeFiring) {
            that._handleAutoSave();

            let eventDetail = { item: that._dragDetails.targetWindow };

            eventDetail.type = that._items.indexOf(that._dragDetails.targetWindow) > -1 ? 'dock' : 'float';

            that.$.fireEvent('stateChange', eventDetail);
        }

        that._noStateChangeFiring = that._eventAlreadyFired = undefined;

        if (that._dragDetails._parentInfo && that._dragDetails._parentInfo.closestItem) {
            that._removeUnneccessaryItems(that._dragDetails._parentInfo.closestItem.closest('lw-splitter'));
        }

        let isInsideDockingLayout = that._getClosestDockingLayout(windowFeedback);

        if (windowFeedback.closest('lw-docking-layout') || isInsideDockingLayout) {
            windowFeedback.style.top = windowFeedback.style.left = '';
            delete that._dragDetails;
            return;
        }

        if (windowFeedback.top) {
            windowFeedback.style.top = windowFeedback.top;
        }

        if (windowFeedback.left) {
            windowFeedback.style.left = windowFeedback.left;
        }

        //iOS Safari bug. Can't remove the HTMLElement that is being dragged on 'move' event
        if (that._dragDetails.selectedTabLabel && that._dragDetails.selectedTabLabel._lazyRemove) {
            if (that._dragDetails.selectedTabLabel) {
                that._dragDetails.selectedTabLabel.remove();
            }

            delete that._dragDetails.selectedTabLabel._lazyRemove;
        }

        windowFeedback._cancelDragging();

        delete that._dragDetails;
    }

    /**
     * Returns the contents of a TabItem as a DocumentFragment
     * @param {any} tabItem
     */
    _getTabItemContent(tabItem) {
        const content = tabItem.isCompleted ? tabItem.$.content : tabItem,
            fragment = document.createDocumentFragment();

        while (content.firstChild) {
            fragment.appendChild(content.firstChild);
        }

        return fragment;
    }

    /**
     * Returns the dimension of the header label that hovered
     */
    _getHeaderLabelDimensions(event) {
        const that = this;

        function continueOperation(coeff) {
            if (!that._dragDetails) {
                clearInterval(that._scrollInterval);
                that._scrollInterval = undefined;
                return;
            }

            tabStrip.scrollLeft += coeff;
            tabsElement._updateScrollButtonVisibility();
            tabsElement._positionTabSelectionBar(tabsElement._tabLabelContainers[tabsElement.selectedIndex], true);
        }

        if (!that._dragDetails || !that._dragDetails.hoveredTabsWindow) {
            return;
        }

        const tabsElement = that._dragDetails.hoveredTabsWindow.$.tabsElement,
            tabStrip = tabsElement.$.tabStrip,
            tabStripRect = tabStrip.getBoundingClientRect(),
            isTabPositionVertical = tabsElement.tabPosition === 'left' || tabsElement.tabPosition === 'right',
            scrollLeft = that.rightToLeft && LW.Utilities.Core.Browser.Chrome ? tabStrip.scrollLeft - (tabStrip.scrollWidth - tabStrip.offsetWidth) : tabStrip.scrollLeft;
        let nearTabStripScrollButtonOffsetLeft = 0,
            nearTabStripScrollButtonOffsetTop = 0;

        if (tabsElement.tabTextOrientation === 'horizontal') {
            nearTabStripScrollButtonOffsetLeft = tabsElement.$.scrollButtonNear.offsetWidth;
        }
        else {
            nearTabStripScrollButtonOffsetTop = tabsElement.$.scrollButtonNear.offsetHeight;
        }

        if (tabsElement.tabPosition === 'top' || tabsElement.tabPosition === 'bottom') {
            if (that._scrollInterval) {
                clearInterval(that._scrollInterval);
            }

            //AutoScroll the TabItems inside the TabStrip
            that._scrollInterval = setInterval(function () {
                //20px is the autoScroll zone size
                if (event && (scrollLeft || that.rightToLeft) && event.clientX <= tabStripRect.left + Math.max(nearTabStripScrollButtonOffsetLeft, 20)) {
                    continueOperation(-1);
                }
                else if (event && scrollLeft !== (that.rightToLeft ? 0 : tabStrip.scrollWidth) &&
                    event.clientX >= tabStripRect.left + tabStripRect.width - Math.max(nearTabStripScrollButtonOffsetLeft, 20)) {
                    continueOperation(1);
                }
                else {
                    clearInterval(that._scrollInterval);
                    that._scrollInterval = undefined;
                }
            }, 1);
        }

        let lastTabItemOffsetLeft = 0,
            lastTabItemOffsetTop = 0,
            width, height;

        //Tab header item
        if (that._dragDetails.hoveredTabArea) {
            width = that._dragDetails.hoveredTabArea.offsetWidth;
            height = that._dragDetails.hoveredTabArea.offsetHeight;
            lastTabItemOffsetLeft = that._dragDetails.hoveredTabArea.offsetLeft;
            lastTabItemOffsetTop = that._dragDetails.hoveredTabArea.offsetTop;
        }
        else {
            if (tabStrip.children.length > 0) {
                const lastTabItem = tabsElement.$.tabStrip.children[tabsElement.$.tabStrip.children.length - 1];

                lastTabItemOffsetLeft = lastTabItem.offsetLeft + (that.rightToLeft ? -1 : 1) * (!isTabPositionVertical ? lastTabItem.offsetWidth : 0);
                lastTabItemOffsetTop = lastTabItem.offsetTop + (isTabPositionVertical ? lastTabItem.offsetHeight : 0);
                width = lastTabItem.offsetWidth;
                height = lastTabItem.offsetHeight;
            }
        }

        //In case no item is hovered, use the whole tabHeaderSection offsets
        that._dragDetails.hoveredTabArea = tabsElement.$.tabsHeaderSection;

        const hoveredAreaRect = that._dragDetails.hoveredTabArea.getBoundingClientRect(),
            left = (tabStripRect.left - hoveredAreaRect.left) + hoveredAreaRect.left + lastTabItemOffsetLeft - scrollLeft - nearTabStripScrollButtonOffsetLeft,
            top = (tabStripRect.top - hoveredAreaRect.top) + hoveredAreaRect.top + lastTabItemOffsetTop - tabStrip.scrollTop - nearTabStripScrollButtonOffsetTop,
            leftHiddenSize = Math.min(lastTabItemOffsetLeft - scrollLeft - nearTabStripScrollButtonOffsetLeft, 0),
            topHiddenSize = Math.min(lastTabItemOffsetTop - tabStrip.scrollTop - nearTabStripScrollButtonOffsetTop, 0);

        return {
            width: Math.min(tabStripRect.width, Math.max(0, width + leftHiddenSize), Math.max(0, tabStripRect.left + tabStripRect.width - left)),
            height: Math.min(tabStripRect.height, Math.max(0, height + topHiddenSize), Math.max(0, tabStripRect.top + tabStripRect.height - top)),
            top: top + window.pageYOffset - topHiddenSize,
            left: left + window.pageXOffset - leftHiddenSize
        };
    }

    /**
    * Handles AutoSaveState property
    */
    _handleAutoSave() {
        const that = this;

        if (!that.autoSaveState) {
            return;
        }

        that.saveState();
    }

    /**
     * Hides the Splitter Bars that are before or after a locked auto-hidden item
     */
    _handleAutoHiddenSplitterBars() {
        const that = this,
            autoHiddenItems = that.$.itemsContainer.querySelectorAll('.auto-hide-left,.auto-hide-right, .auto-hide-top, .auto-hide-bottom');

        for (let i = 0; i < autoHiddenItems.length; i++) {
            if (autoHiddenItems[i].previousElementSibling instanceof LW.SplitterBar) {
                autoHiddenItems[i].previousElementSibling.hide();
            }
            else if (autoHiddenItems[i].nextElementSibling instanceof LW.SplitterBar) {
                autoHiddenItems[i].nextElementSibling.hide();
            }
        }
    }

    /**
     * Handle item insertion with position
     */
    _handleItemPositionInserting(item, targetItem, position) {
        const that = this;

        if (item.autoHide || position.indexOf('layout') > -1) {
            that._handleLayoutItemInserting(targetItem, item, position);
        }
        else if (position.indexOf('outside-') > -1) {
            that._handleOutsideItemInserting(targetItem, item, position);
        }
        else {
            if (position.indexOf('inside-') > -1) {
                that._handleInsideItemInserting(targetItem, item, position)
            }
            else {
                that._handleNormalItemInserting(targetItem, item, position);
            }

            that._handleAutoSave();
            that.$.fireEvent('stateChange', { type: 'dock', item: item });
            that._setSplitterBarVisibility();
        }
    }

    /**
    * Creates a new Splitter when nesting items
    * @param {any} targetItem
    */
    _handleInsideItemInserting(targetItem, item, position) {
        const that = this,
            newItem = document.createElement('lw-splitter-item'),
            newHostItem = document.createElement('lw-splitter-item');
        let targetSplitterItem = targetItem.closest('lw-splitter-item'),
            targetSplitter = targetItem.closest('lw-splitter'),
            targetItemIndex = that._items.indexOf(targetItem), newSplitter;

        if (targetSplitter && targetSplitter._items.length === 1) {
            newSplitter = targetSplitter;
        }
        else {
            newSplitter = document.createElement('lw-splitter');
        }

        newSplitter._isInShadowDOM = that.isInShadowDOM;

        newSplitter.autoFitMode = 'proportional';
        newSplitter.liveResize = that.liveResize;
        newSplitter.resizeStep = that.resizeStep;

        item.windowParent = null;

        newItem.appendChild(item);

        targetItem.windowParent = null;

        position = position.replace('inside-', '');
        newSplitter.orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

        const newItemMaxSize = targetSplitterItem[newSplitter.orientation === 'horizontal' ? 'offsetHeight' : 'offsetWidth'] / 2;

        if (newSplitter.parentElement) {
            newSplitter.insertBefore(newItem, position === 'top' || position === 'left' ? targetSplitterItem : null);
        }
        else {
            newHostItem.appendChild(targetItem);

            if (targetItem.min) {
                newHostItem.min = targetItem.min;
            }

            if (position === 'top' || position === 'left') {
                newSplitter.appendChild(newItem);
                newSplitter.appendChild(newHostItem);
            }
            else {
                newSplitter.appendChild(newHostItem);
                newSplitter.appendChild(newItem);
            }

            targetSplitterItem.appendChild(newSplitter);
        }


        if (item.size) {
            const isInPercentages = typeof (item.size) === 'string' && item.size.indexOf('%') > -1;

            newItem.size = isInPercentages ? item.size : Math.min(newItemMaxSize, parseFloat(item.size));
        }

        newItem.max = item.max || '';
        newItem.min = item.min ? item.min : 30;
        newItem.locked = item.locked || false;
        newItem.collapsible = item.collapsible || false;
        newItem.collapsed = item.collapsed || false;

        if (position === 'bottom' || position === 'right') {
            targetItemIndex = Math.min(targetItemIndex + 1, that._items.length);
        }

        item.pinned = true;
        item.autoHide = item.allowToggle = item.maximized = item.minimized = item.collapsed = false;

        if (item._originalTabPosition) {
            item.tabPosition = item._originalTabPosition;
            delete item._originalTabPosition;
        }
        else {
            item.tabPosition = 'top';
        }

        if (item._originalTextOrientation) {
            item.tabTextOrientation = item._originalTextOrientation;
            delete item._originalTextOrientation;
        }
        else {
            item.tabTextOrientation = 'horizontal';
        }

        that._items.splice(targetItemIndex, 0, item);
        that._handleAutoHiddenSplitterBars();
    }

    /**
     * Creates a new Splitter inside the main layout
     * @param {any} targetItem
     */
    _handleLayoutItemInserting(targetItem, item, position) {
        const that = this,
            newSplitterItem = document.createElement('lw-splitter-item'),
            size = position === 'bottom' || position === 'top' ? 'offsetHeight' : 'offsetWidth';

        if (!item.size) {
            item.size = item[size];
        }

        position = position.replace('layout-', '');

        newSplitterItem.size = item.size || '';
        newSplitterItem.max = item.max || '';
        newSplitterItem.min = item.min || '';
        newSplitterItem.locked = item.locked || false;
        newSplitterItem.collapsible = item.collapsible || false;
        newSplitterItem.collapsed = item.collapsed || false;

        if (newSplitterItem.size && !that._dockingAutoHideTabItem) {
            newSplitterItem.size = Math.min(that[size] / 2, parseFloat(item.size));
        }

        if (that.$.itemsContainer.orientation === 'horizontal' && (position === 'right' || position === 'left') ||
            that.$.itemsContainer.orientation === 'vertical' && (position === 'top' || position === 'bottom')) {
            let newSplitterItemWithCurrentItems,
                currentItemsContainerOrientation = that.$.itemsContainer.orientation;
            const mainSplitter = that.$.itemsContainer,
                currentItems = [].slice.call(mainSplitter._items),
                appendItemsToMainSplitter = function (currentItem, newItem) {
                    mainSplitter.appendChild(currentItem);
                    mainSplitter.insertBefore(newItem, position === 'right' || position === 'bottom' ? null : currentItem);
                };

            item.windowParent = null;
            newSplitterItem.appendChild(item);
            currentItems.map(item => item.size = item[mainSplitter._measurements.size]);

            const isLastItem = position === 'right' || position === 'bottom';

            isLastItem ? that._items.push(item) : that._items.splice(0, 0, item);
            mainSplitter.removeAll();
            mainSplitter.orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

            const newSplitterItemWithCurrentItemsSize = mainSplitter[mainSplitter._measurements.size] - newSplitterItem.size;

            if (currentItems.length > 1) {
                const currentItemsSplitter = document.createElement('lw-splitter');

                currentItemsSplitter._isInShadowDOM = that.isInShadowDOM;

                //The insert item logic of 'end' mode is needed
                currentItemsSplitter.autoFitMode = 'end';
                currentItemsSplitter.orientation = currentItemsContainerOrientation;
                currentItemsSplitter.liveResize = that.liveResize;
                currentItemsSplitter.resizeStep = that.resizeStep;

                newSplitterItemWithCurrentItems = document.createElement('lw-splitter-item');

                //Setting a default min
                newSplitterItemWithCurrentItems.min = 30;
                newSplitterItemWithCurrentItems.appendChild(currentItemsSplitter);
                newSplitterItemWithCurrentItems.size = newSplitterItemWithCurrentItemsSize;

                appendItemsToMainSplitter(newSplitterItemWithCurrentItems, newSplitterItem);

                //Append the items in the approriate order so their size can be calculated properly
                for (let i = 0; i < currentItems.length; i++) {
                    currentItemsSplitter.appendChild(currentItems[i]);
                }

                currentItemsSplitter.autoFitMode = 'proportional';
            }
            else {
                currentItems[0].size = newSplitterItemWithCurrentItemsSize;

                if (that._dockingAutoHideTabItem) {
                    mainSplitter.autoFitMode = 'end';
                }

                appendItemsToMainSplitter(currentItems[0], newSplitterItem);
                mainSplitter.autoFitMode = 'proportional';
            }

            that._handleAutoHiddenSplitterBars();
            that._handleAutoSave();
            that.$.fireEvent('stateChange', { type: 'dock', item: item });
            that._setSplitterBarVisibility();
        }
        else {
            const itemToBeInsertedBefore = position.indexOf('left') > -1 || position.indexOf('top') > -1 ? that._items.filter(item => item.opened)[0] : undefined;

            item.windowParent = null;
            newSplitterItem.appendChild(item);
            that.insertBefore(newSplitterItem, itemToBeInsertedBefore, that.$.itemsContainer);
            return true;
        }
    }

    /**
    * Inserts a new item in the same splitter as the target item at a specified position
    * @param {any} targetItem
    * @param {any} item
    * @param {any} position
    */
    _handleNormalItemInserting(targetItem, item, position) {
        let targetSplitterItem = targetItem.closest('lw-splitter-item');
        const that = this,
            targetSplitter = targetItem.closest('lw-splitter'),
            newItem = document.createElement('lw-splitter-item'),
            targetSplitterItemIndex = position === 'right' || position === 'bottom' ?
                targetSplitter._items.indexOf(targetSplitterItem) + 1 : targetSplitter._items.indexOf(targetSplitterItem);
        let targetItemIndex = that._items.indexOf(targetItem);

        item.windowParent = null;

        newItem.appendChild(item);
        newItem.size = item.size || '';
        newItem.min = item.min || '';
        targetSplitter.insert(targetSplitterItemIndex, newItem);

        if (position === 'bottom' || position === 'right') {
            targetItemIndex = Math.min(targetItemIndex + 1, that._items.length);
        }

        item.pinned = true;
        item.locked = false;
        item.autoHide = item.allowToggle = item.maximized = item.minimized = item.collapsed = false;

        if (item._originalTabPosition) {
            item.tabPosition = item._originalTabPosition;
            delete that._originalTabPosition;
        }
        else {
            item.tabPosition = 'top';
        }

        if (item._originalTextOrientation) {
            item.tabTextOrientation = item._originalTextOrientation;
            delete item._originalTextOrientation;
        }
        else {
            item.tabTextOrientation = 'horizontal';
        }

        that._items.splice(targetItemIndex, 0, item);
        that._handleAutoHiddenSplitterBars();
    }

    /**
     * Inserts the new item outside of the target by nesting the target and it's splitter ( if possible) inside a new splitter item
     * @param {any} targetItem
     * @param {any} item
     * @param {any} position
     */
    _handleOutsideItemInserting(targetItem, item, position) {
        const that = this,
            newSplitterItem = document.createElement('lw-splitter-item');
        let targetSplitter = targetItem.closest('lw-splitter');

        if (!targetSplitter) {
            targetSplitter = that.$.itemsContainer;
        }

        newSplitterItem.size = item.size || '';
        newSplitterItem.max = item.max || '';
        newSplitterItem.min = item.min || '';
        newSplitterItem.locked = item.locked || false;
        newSplitterItem.collapsible = item.collapsible || false;
        newSplitterItem.collapsed = item.collapsed || false;

        if (targetSplitter !== that.$.itemsContainer) {
            let targetSplitterItem = targetSplitter.closest('lw-splitter-item');
            const newSplitter = document.createElement('lw-splitter'),
                newSplitterItemWithCurrentItems = document.createElement('lw-splitter-item');

            newSplitter._isInShadowDOM = that.isInShadowDOM;

            position = position.replace('outside-', '');
            newSplitter.autoFitMode = 'proportional';
            newSplitter.liveResize = that.liveResize;
            newSplitter.resizeStep = that.resizeStep;

            item.windowParent = null;
            newSplitterItem.appendChild(item);

            //Setting a default min for the item
            newSplitterItemWithCurrentItems.min = 30;
            newSplitterItemWithCurrentItems.appendChild(targetSplitter);

            newSplitter.orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';
            targetSplitterItem.appendChild(newSplitter);

            if (position === 'right' || position === 'bottom') {
                newSplitter.appendChild(newSplitterItemWithCurrentItems);
                newSplitter.appendChild(newSplitterItem);
                that._items.splice(that._items.indexOf(targetItem) + 1, 0, item);
            }
            else {
                newSplitter.appendChild(newSplitterItem);
                newSplitter.appendChild(newSplitterItemWithCurrentItems);
                that._items.splice(that._items.indexOf(targetItem), 0, item);
            }

            if (!newSplitterItem.size) {
                newSplitterItem.size = newSplitter[newSplitter._measurements.size] / 2;
            }
            else {
                const newSize = newSplitterItem.size;

                newSplitterItem.size = '';
                newSplitterItem.size = newSize;
            }

            that._handleAutoHiddenSplitterBars();
            that._handleAutoSave();
            that.$.fireEvent('stateChange', { type: 'dock', item: item });
            that._setSplitterBarVisibility();
        }
        else {
            item.windowParent = null;
            newSplitterItem.appendChild(item);
            that.insertBefore(newSplitterItem, position.indexOf('left') > -1 || position.indexOf('top') > -1 ? that._items[0] : undefined, that.$.itemsContainer);
            return true;
        }
    }

    /**
     * Apply the layout
     */
    _handleLayout() {
        const that = this;

        that._items = [];

        if (typeof that.layout === 'string') {
            that.layout = JSON.parse(that.layout);
        }

        if (that.layout !== null && Array.isArray(that.layout)) {
            that._createItemsFromArray(that.layout);
            return;
        }

        const initialItems = Array.from(that.$.itemsContainer.children);

        that.$.itemsContainer.innerHTML = '';

        for (let i = 0; i < initialItems.length; i++) {
            if (initialItems[i].tagName !== 'LW-TABS-WINDOW') {
                initialItems[i].parentElement.removeChild(initialItems[i]);
            }

            initialItems[i].layout = that;

            const splitterItem = document.createElement('lw-splitter-item');

            splitterItem.appendChild(initialItems[i]);

            that.$.itemsContainer.appendChild(splitterItem);
            that._items.push(initialItems[i]);
        }
    }

    /**
    * Handles the snapping feedback
    * @param {any} position
    */
    _handleSnapping(position, event) {
        const that = this;

        if (that.snapMode === 'simple') {
            that._handleSimpleSnapping(position, event);
        }
        else {
            that._handleAdvancedSnapping(event);
        }
    }

    /**
     * Handles Advanced snapping mode
     */
    _handleAdvancedSnapping(event) {
        const that = this;

        if (!that._dragDetails) {
            return;
        }

        if (that._snapFeedback && !that._dragDetails.hoveredTabsWindow) {
            that._snapFeedback._position = undefined;

            if (that._snapFeedback.areaHighlighter && that.getShadowRootOrBody().contains(that._snapFeedback.areaHighlighter)) {
                that._snapFeedback.areaHighlighter.remove();
            }

            if (that._snapFeedback.headerHighlighter && that.getShadowRootOrBody().contains(that._snapFeedback.headerHighlighter)) {
                that._snapFeedback.headerHighlighter.remove();
            }

            if (!that._dragDetails.hoveredItem) {
                if (that._snapFeedback.innerSnapElement && that.getShadowRootOrBody().contains(that._snapFeedback.innerSnapElement)) {
                    that._snapFeedback.innerSnapElement.remove();
                }

                if (that._snapFeedback.outherSnapElement && !that._dragDetails.isInsideTheLayout) {
                    const outherElements = [].slice.call(that.$.container.children);

                    for (let i = 0; i < outherElements.length; i++) {
                        if (outherElements[i].className.indexOf('lw-docking-layout-snap') > -1) {
                            that._snapFeedback.outherSnapElement.appendChild(outherElements[i]);
                        }
                    }
                }

                return;
            }
        }

        if (!that._snapFeedback) {
            that._snapFeedback = {
                innerSnapElement: document.createElement('div'),
                outherSnapElement: document.createElement('div'),
                areaHighlighter: document.createElement('div'),
                headerHighlighter: document.createElement('div')
            };

            that._snapFeedback.innerSnapElement.classList.add('lw-docking-layout-snap');
            that._snapFeedback.areaHighlighter.classList.add('lw-docking-layout-snap-highlighter');
            that._snapFeedback.headerHighlighter.classList.add('lw-docking-layout-snap-highlighter-header');

            that._snapFeedback.innerSnapElement.innerHTML = `
                            <div>
                                <div class="top">
                                    <div><div></div></div>
                                </div>
                            </div>
                            <div>
                                <div class="left">
                                    <div><div></div></div>
                                </div>
                                <div class="center">
                                    <div><div></div></div>
                                </div>
                                <div class="right">
                                    <div><div></div></div>
                                </div>
                            </div>
                            <div>
                                <div class="bottom">
                                    <div><div></div></div>
                                </div>
                            </div>`;

            that._snapFeedback.outherSnapElement.innerHTML = `
                            <div class="lw-docking-layout-snap layout-top">
                                <div><div></div></div>
                            </div>
                            <div class="lw-docking-layout-snap layout-left">
                                <div><div></div></div>
                            </div>
                            <div class="lw-docking-layout-snap layout-right">
                                <div><div></div></div>
                            </div>
                            <div class="lw-docking-layout-snap layout-bottom">
                                <div><div></div></div>
                            </div>`;
        }

        if (that._snapFeedback.areaHighlighter.parentElement) {
            that._snapFeedback.areaHighlighter.removeAttribute('position');
            that._snapFeedback.areaHighlighter.classList.remove('lw-hidden');
        }

        that._snapFeedback.areaHighlighter.style.width = '';
        that._snapFeedback.areaHighlighter.style.height = '';

        that._snapFeedback._position = that._dragDetails.hoveredItem && !(that._dragDetails.hoveredItem instanceof LW.SplitterItem) ? that._dragDetails.hoveredItem.className : '';

        if (that._dragDetails.hoveredItem && that._dragDetails.hoveredItem.className.indexOf('layout-') > -1) {
            that._snapFeedback._position = that._snapFeedback._position.replace('lw-docking-layout-snap ', '');
            that._snapFeedback.areaHighlighter.setAttribute('position', that._snapFeedback._position);

            const selectedTabsWindow = that._dragDetails.selectedTabsWindow;

            if (selectedTabsWindow.dropPosition.indexOf('all') > -1 || selectedTabsWindow.dropPosition.indexOf(that._snapFeedback._position) > -1) {
                that._dragDetails.hoveredItem.setAttribute('show', '');
                that.$.container.appendChild(that._snapFeedback.areaHighlighter);
                that._dragDetails.hoveredTabsWindow = true;

                //Sets the size of the outher(layout) highlighters
                if (['layout-left', 'layout-right'].indexOf(that._snapFeedback._position) > -1) {
                    that._snapFeedback.areaHighlighter.style.width = that._dragDetails.windowFeedback.style.width || (that._dragDetails.windowFeedback.offsetWidth + 'px');
                }
                else if (['layout-top', 'layout-bottom'].indexOf(that._snapFeedback._position) > -1) {
                    that._snapFeedback.areaHighlighter.style.height = that._dragDetails.windowFeedback.style.height || (that._dragDetails.windowFeedback.offsetHeight + 'px');
                }
            }
            else {
                that._dragDetails.hoveredItem.removeAttribute('show');
                that._snapFeedback._position = undefined;
            }

            return;
        }

        let dropPosition = that._dragDetails.hoveredTabsWindow ? that._dragDetails.hoveredTabsWindow.dropPosition : ['all'];

        if (dropPosition.length === 0) {
            dropPosition = ['all'];
        }

        if (that._dragDetails.hoveredTabsWindow instanceof LW.TabsWindow && that._dragDetails.hoveredTabArea &&
            that._dragDetails.hoveredTabArea.closest('.lw-tabs-header-section') && (dropPosition.indexOf('all') > -1 || dropPosition.indexOf('header') > -1)) {
            that._dragDetails.hoveredTabArea = that._dragDetails.hoveredTabArea.classList.contains('lw-tab-label-container') ? that._dragDetails.hoveredTabArea : undefined;

            const dimensions = that._getHeaderLabelDimensions(event),
                headerHighLighter = that._snapFeedback.headerHighlighter;

            headerHighLighter.style.width = dimensions.width + 'px';
            headerHighLighter.style.height = dimensions.height + 'px';
            headerHighLighter.style.top = dimensions.top + 'px';
            headerHighLighter.style.left = dimensions.left + 'px';
            headerHighLighter.classList.remove('lw-hidden');

            if (!that.getShadowRootOrBody().contains(headerHighLighter)) {
                that.getShadowRootOrBody().appendChild(headerHighLighter);
            }

            that._snapFeedback._position = 'header';
        }
        else {
            if (that._scrollInterval) {
                clearInterval(that._scrollInterval);
                that._scrollInterval = undefined;
            }

            that._snapFeedback.headerHighlighter.style.width = that._snapFeedback.headerHighlighter.style.height = 0;
        }

        const innerSnapElementParent = that._snapFeedback.innerSnapElement.closest('lw-splitter-item');

        if (that._dragDetails.hoveredItem instanceof LW.SplitterItem) {
            if (innerSnapElementParent && that._dragDetails.hoveredItem !== innerSnapElementParent) {
                innerSnapElementParent.removeChild(that._snapFeedback.innerSnapElement);
            }

            if (that._dragDetails.hoveredItem.className.indexOf('auto-hide') < 0) {
                const highlighSections = that._snapFeedback.innerSnapElement.querySelectorAll('.top, .bottom, .left, .right, .center');

                for (let i = 0; i < highlighSections.length; i++) {

                    if (dropPosition.indexOf(highlighSections[i].className) > -1 || dropPosition.indexOf('all') === 0) {
                        highlighSections[i].setAttribute('show', '');
                    }
                    else {
                        highlighSections[i].removeAttribute('show');
                    }
                }

                that._snapFeedback.innerSnapElement.classList.remove('lw-hidden');

                if (!that._dragDetails.hoveredItem.contains(that._snapFeedback.innerSnapElement)) {
                    that._dragDetails.hoveredItem.appendChild(that._snapFeedback.innerSnapElement);
                }
            }

            const outherElements = [].slice.call(that._snapFeedback.outherSnapElement.children),
                selectedTabsWindow = that._dragDetails.selectedTabsWindow;
            let position;

            for (let i = 0; i < outherElements.length; i++) {
                position = outherElements[i].className.replace('lw-docking-layout-snap ', '');
                outherElements[i].classList.remove('lw-hidden');

                if (selectedTabsWindow.dropPosition.indexOf('all') > -1 || selectedTabsWindow.dropPosition.indexOf(position) > -1) {
                    outherElements[i].setAttribute('show', '');
                }
                else {
                    outherElements[i].removeAttribute('show');
                }

                that.$.container.appendChild(outherElements[i]);
            }
        }

        if (!that._snapFeedback._position || dropPosition.indexOf('all') < 0 && dropPosition.indexOf(that._snapFeedback._position) < 0) {
            that._snapFeedback._position = that._dragDetails.hoveredTabArea = undefined;
            return;
        }

        if (that._snapFeedback._position === 'center' && that._items.filter(item => item.opened).length > 0) {
            that._dragDetails.hoveredTabArea = that._dragDetails.hoveredTabsWindow.$.tabsElement.$.tabsHeaderSection;
        }

        //Sets the size of the inner highlighters
        if (['left', 'right'].indexOf(that._snapFeedback._position) > -1) {
            that._snapFeedback.areaHighlighter.style.width = that._dragDetails.windowFeedback.style.width || (that._dragDetails.windowFeedback.offsetWidth + 'px');
        }
        else if (['top', 'bottom'].indexOf(that._snapFeedback._position) > -1) {
            that._snapFeedback.areaHighlighter.style.height = that._dragDetails.windowFeedback.style.height || (that._dragDetails.windowFeedback.offsetHeight + 'px');
        }

        that._snapFeedback.areaHighlighter.setAttribute('position', that._snapFeedback._position);

        if (that._snapFeedback._position === 'header') {
            that._dragDetails.hoveredTabsWindow.$.tabsElement.$.tabContentSection.appendChild(that._snapFeedback.areaHighlighter);
        }
        else {
            const orientation = that._dragDetails.hoveredTabsWindow.closest('lw-splitter').orientation;

            if (((that._snapFeedback._position === 'left' || that._snapFeedback._position === 'right') && orientation === 'horizontal') ||
                ((that._snapFeedback._position === 'top' || that._snapFeedback._position === 'bottom') && orientation === 'vertical')) {
                that._snapFeedback._position = 'inside-' + that._snapFeedback._position;
            }

            that._dragDetails.hoveredItem.closest('lw-splitter-item').appendChild(that._snapFeedback.areaHighlighter);
        }
    }

    /**
     * Handles Simple snapping mode
     * @param {any} position
     */
    _handleSimpleSnapping(position, event) {
        const that = this;

        function transitionEndHandler() {
            if (that._snapFeedback.classList.contains('lw-visibility-hidden') && that.getShadowRootOrBody().contains(that._snapFeedback)) {
                that._snapFeedback.remove();
            }
        }

        if (!position) {
            if (that._dragDetails) {
                that._dragDetails.hoveredTabsWindow = that._dragDetails.hoveredTabArea = undefined;
            }

            if (that._snapFeedback instanceof HTMLElement) {
                that._snapFeedback._position = undefined;

                if (that.getShadowRootOrBody().contains(that._snapFeedback)) {
                    that._snapFeedback.classList.add('lw-visibility-hidden');
                }
            }

            return;
        }

        if (!that._snapFeedback) {
            that._snapFeedback = document.createElement('div');
            that._snapFeedback.addEventListener('transitionend', transitionEndHandler);
        }

        for (let i = 0; i < that._snapFeedback.classList.length; i++) {
            if (that._snapFeedback.classList[i].indexOf('lw-docking-snap-') > -1) {
                that._snapFeedback.classList.remove(that._snapFeedback.classList[i]);
            }
        }

        that._snapFeedback._position = position;

        position = position.replace('inside-', '');

        that._snapFeedback.classList.add('lw-docking-snap-' + position + '-feedback');
        that._snapFeedback.classList.remove('lw-visibility-hidden');

        let dropPosition = position.indexOf('layout') === 0 ? that._dragDetails.selectedTabsWindow.dropPosition : that._dragDetails.hoveredTabsWindow.dropPosition;

        if (dropPosition.length === 0) {
            dropPosition = ['all'];
        }

        if (dropPosition.indexOf('all') > -1 || dropPosition.indexOf(position) > -1) {
            that._snapFeedback.removeAttribute('disabled');
        }
        else {
            that._snapFeedback.setAttribute('disabled', '');
            that._snapFeedback._position = undefined;
        }

        let width, height, top, left, hoveredAreaRect;
        const layoutRect = that.getBoundingClientRect(),
            tabsWindowStyles = getComputedStyle(that._dragDetails.hoveredTabsWindow.$.contentSection),
            paddingLeft = parseFloat(tabsWindowStyles.getPropertyValue('padding-left') || 0),
            paddingRight = parseFloat(tabsWindowStyles.getPropertyValue('padding-right') || 0),
            paddingTop = parseFloat(tabsWindowStyles.getPropertyValue('padding-top') || 0),
            paddingBottom = parseFloat(tabsWindowStyles.getPropertyValue('padding-bottom') || 0),
            leftHiddenItem = that.$.verticalHiddenItemsContainer.getElementsByClassName('auto-hide-left')[0],
            topHiddenItem = that.$.horizontalHiddenItemsContainer.getElementsByClassName('auto-hide-top')[0];

        //Resets the highlighter
        that._snapFeedback.style.display = '';

        switch (position) {
            case 'header': {
                const dimensions = that._getHeaderLabelDimensions(event);

                width = dimensions.width;
                height = dimensions.height;
                top = dimensions.top;
                left = dimensions.left;

                //Hides the highlighter if it's overflowing
                if (!width || !height) {
                    that._snapFeedback.style.display = 'none';
                }

                break;
            }
            case 'left':
            case 'right':
                hoveredAreaRect = that._dragDetails.hoveredTabArea.getBoundingClientRect();

                height = that._dragDetails.hoveredTabArea.offsetHeight;
                width = that._dragDetails.hoveredTabArea.offsetWidth / 2;
                top = hoveredAreaRect.top + window.pageYOffset;
                left = hoveredAreaRect.left + (position === 'right' ? that._dragDetails.hoveredTabArea.offsetWidth / 2 : 0) + window.pageXOffset;
                break;
            case 'top':
            case 'bottom':
                hoveredAreaRect = that._dragDetails.hoveredTabArea.getBoundingClientRect();

                height = that._dragDetails.hoveredTabArea.offsetHeight / 2;
                width = that._dragDetails.hoveredTabArea.offsetWidth;
                top = hoveredAreaRect.top + window.pageYOffset + (position === 'bottom' ? that._dragDetails.hoveredTabArea.offsetHeight / 2 : 0);
                left = hoveredAreaRect.left + window.pageXOffset;
                break;
            case 'layout-left':
            case 'layout-right': {
                if (that.getShadowRootOrBody().contains(that._snapFeedback) && that._snapFeedback.maxWidth === undefined) {
                    that._snapFeedback.maxWidth = parseFloat(getComputedStyle(that._snapFeedback).getPropertyValue('max-width')) || 0;
                }

                width = that.$.itemsContainer.offsetWidth * 0.07 - (paddingLeft + paddingRight);

                if (that._snapFeedback.maxWidth) {
                    width = Math.min(that._snapFeedback.maxWidth, width);
                }

                height = that.$.itemsContainer.offsetHeight - (paddingTop + paddingBottom);
                top = layoutRect.top + window.pageYOffset + paddingTop + (topHiddenItem ? topHiddenItem.offsetHeight : 0);
                left = layoutRect.left + window.pageXOffset + (position === 'layout-left' ? paddingLeft : 0) + (leftHiddenItem ? leftHiddenItem.offsetWidth : 0) +
                    (position === 'layout-right' ? that.$.itemsContainer.offsetWidth - width - paddingRight : 0);
                break;
            }
            case 'layout-top':
            case 'layout-bottom':
                if (that.getShadowRootOrBody().contains(that._snapFeedback) && that._snapFeedback.maxHeight === undefined) {
                    that._snapFeedback.maxHeight = parseFloat(getComputedStyle(that._snapFeedback).getPropertyValue('max-height')) || 0;
                }

                height = that.$.itemsContainer.offsetHeight * 0.07 - (paddingTop + paddingBottom);

                if (that._snapFeedback.maxHeight) {
                    height = Math.min(that._snapFeedback.maxHeight, height);
                }

                width = that.$.itemsContainer.offsetWidth - (paddingLeft + paddingRight);
                top = layoutRect.top + window.pageYOffset + (topHiddenItem ? topHiddenItem.offsetHeight : 0) +
                    (position === 'layout-bottom' ? that.$.itemsContainer.offsetHeight - height + paddingTop : paddingTop);
                left = layoutRect.left + window.pageXOffset + paddingLeft + (leftHiddenItem ? leftHiddenItem.offsetWidth : 0);
                break;
        }

        that._snapFeedback.style.height = height + 'px';
        that._snapFeedback.style.width = width + 'px';
        that._snapFeedback.style.left = left + 'px';
        that._snapFeedback.style.top = top + 'px';

        if (!that._snapFeedback._position) {
            that._dragDetails.hoveredTabArea = undefined;
        }

        if ((that._snapFeedback && !that.getShadowRootOrBody().contains(that._snapFeedback))) {
            that.getShadowRootOrBody().appendChild(that._snapFeedback);
        }
    }

    /**
    * Nest item inside another item.
    **/
    _handleItemNesting() {
        const that = this;
        let targetWindow = that._dragDetails.windowFeedback;

        if (targetWindow.classList.contains('lw-tabs-window-feedback')) {
            let newWindow = document.createElement('lw-tabs-window');
            const selectedTabItem = that._dragDetails.selectedTabLabel.tab;

            newWindow.min = 30;
            newWindow.opened = newWindow.pinned = true;
            newWindow.headerPosition = that._dragDetails.selectedTabsWindow.headerPosition;


            if (that._dragDetails.selectedTabsWindow.autoHide) {
                newWindow.tabTextOrientation = that._dragDetails.selectedTabsWindow._originalTextOrientation || 'horizontal';
                newWindow.tabPosition = that._dragDetails.selectedTabsWindow._originalTabPosition || 'top';
            }
            else {
                newWindow.tabPosition = that._dragDetails.selectedTabsWindow.tabPosition;
                newWindow.tabTextOrientation = that._dragDetails.selectedTabsWindow.tabTextOrientation;
            }

            newWindow.animation = that.animation;
            newWindow.rightToLeft = that.rightToLeft;
            newWindow.theme = that.theme;

            if (that._snapFeedback._position.indexOf('top') > -1 || that._snapFeedback._position.indexOf('bottom') > -1) {
                newWindow.size = parseFloat(targetWindow.style.height) || targetWindow.offsetHeight;
            }
            else {
                newWindow.size = parseFloat(targetWindow.style.width) || targetWindow.offsetWidth;
            }

            newWindow.label = selectedTabItem.label;
            newWindow.id = '';

            that._dragDetails.windowFeedback.removeChild(selectedTabItem);
            newWindow.appendChild(selectedTabItem);
            newWindow.style.left = newWindow.style.top = '';
            newWindow.draggable = selectedTabItem.draggable !== undefined ? selectedTabItem.draggable : true;
            newWindow.floatable = selectedTabItem.floatable !== undefined ? selectedTabItem.floatable : true;
            targetWindow = newWindow;
        }
        else {
            //Returns the window to it's initial position
            const context = targetWindow.context;

            targetWindow.context = targetWindow;
            targetWindow.windowParent = null;
            targetWindow.context = context;

            targetWindow.animation = that.animation;
            targetWindow.rightToLeft = that.rightToLeft;
            targetWindow.theme = that.theme;

            if (that._snapFeedback._position.indexOf('top') > -1 || that._snapFeedback._position.indexOf('bottom') > -1) {
                targetWindow.size = parseFloat(targetWindow.style.height) || targetWindow.offsetHeight;
            }
            else {
                targetWindow.size = parseFloat(targetWindow.style.width) || targetWindow.offsetWidth;
            }

            targetWindow.style.top = targetWindow.style.left = targetWindow.style.width = targetWindow.style.height = '';
            targetWindow.pinned = true;
            //targetWindow.locked = false;

            if (!targetWindow._originalTabPosition) {
                targetWindow._originalTabPosition = targetWindow.tabPosition;
            }
        }

        that._insert(that._items.indexOf(that._dragDetails.hoveredTabsWindow), targetWindow, that._snapFeedback._position);
        that._disownTabWindow(targetWindow);
        return targetWindow;
    }

    /**
    * Handles windows that are not dummies while dragging. Applies settings and caches data related to them.
    */
    _handleWindowOnDrag() {
        const that = this;

        //Avoids unnecessary calls
        if (that._dragDetails.windowFeedback.hasAttribute('dragged')) {
            return;
        }

        let selectedItem = that._dragDetails.selectedItem,
            selectedTabsWindow = that._dragDetails.selectedTabsWindow,
            closestSplitter = selectedTabsWindow.closest('lw-splitter');

        that._setWindowFeedbackSize();

        if (selectedTabsWindow === that.$.autoHideWindow && !that._dragDetails._parentInfo) {
            that._dragDetails._parentInfo = {};

            if (selectedTabsWindow._tabsWindow.items.length > 1) {
                that._dragDetails._parentInfo.closestItem = selectedTabsWindow._tabsWindow;
                that._dragDetails._parentInfo.position = that.$.autoHideWindow._tab.index;
            }
            else {
                that._dragDetails._parentInfo.closestItem = that.$.itemsContainer;
                that._dragDetails._parentInfo.position = selectedTabsWindow._tabsWindow.tabPosition;
                that._dragDetails.windowFeedback.headerButtons = that.$.autoHideWindow._tabsWindow.headerButtons;
                that._noStateChangeFiring = true;
                that.undock(that._dragDetails.windowFeedback);
            }

            that._originalTabIndex = undefined;
        }
        else {
            if (closestSplitter && closestSplitter !== that.$.itemsContainer && closestSplitter._items.length === 1) {
                while (closestSplitter._items.length === 1 && closestSplitter !== that.$.itemsContainer) {
                    closestSplitter = closestSplitter.parentElement.closest('lw-splitter');
                    selectedItem = selectedItem.parentElement.closest('lw-splitter-item');
                }
            }

            if (!that._dragDetails._parentInfo) {
                that._dragDetails._parentInfo = {};

                if (selectedTabsWindow.closest('lw-docking-layout') === that || that._getClosestDockingLayout(selectedTabsWindow) === that) {
                    if (selectedTabsWindow.autoHide) {
                        that._dragDetails._parentInfo.closestItem = that.$.itemsContainer;
                        that._dragDetails._parentInfo.position = selectedTabsWindow.tabPosition;

                        if (selectedTabsWindow._originalTabPosition) {
                            selectedTabsWindow.tabPosition = selectedTabsWindow._originalTabPosition;
                        }

                        if (selectedTabsWindow._originalTextOrientation) {
                            selectedTabsWindow.tabTextOrientation = selectedTabsWindow._originalTextOrientation;
                        }
                    }
                    else if (closestSplitter) {
                        const selectedItemIndex = closestSplitter._items.indexOf(selectedItem),
                            itemsCount = closestSplitter._items.length;

                        if (itemsCount === 1) {
                            that._dragDetails._parentInfo.position = closestSplitter.orientation === 'horizontal' ? 'top' : 'left';
                            that._dragDetails._parentInfo.closestItem = undefined;
                        }
                        else {
                            if (selectedItemIndex === 0) {
                                that._dragDetails._parentInfo.position = closestSplitter.orientation === 'horizontal' ? 'top' : 'left';
                                that._dragDetails._parentInfo.closestItem = closestSplitter._items[selectedItemIndex + 1].getElementsByTagName('lw-tabs-window')[0];
                            }
                            else {
                                that._dragDetails._parentInfo.position = closestSplitter.orientation === 'horizontal' ? 'bottom' : 'right';
                                that._dragDetails._parentInfo.closestItem = closestSplitter._items[selectedItemIndex - 1].getElementsByTagName('lw-tabs-window')[0];
                            }

                            that._dragDetails._parentInfo.closestItemSize = that._dragDetails._parentInfo.closestItem[closestSplitter._measurements.size];

                            if (closestSplitter !== that._dragDetails._parentInfo.closestItem.closest('lw-splitter')) {
                                if (closestSplitter === that.$.itemsContainer) {
                                    that._dragDetails._parentInfo.position = 'layout-' + that._dragDetails._parentInfo.position;
                                }
                                else {
                                    that._dragDetails._parentInfo.position = 'outside-' + that._dragDetails._parentInfo.position;
                                }
                            }
                            else if (closestSplitter._items.length === 2) {
                                that._dragDetails._parentInfo.position = 'inside-' + that._dragDetails._parentInfo.position;
                            }
                        }
                    }
                }
                else {
                    that._dragDetails._parentInfo.position = {
                        top: selectedTabsWindow.offsetTop,
                        left: selectedTabsWindow.offsetLeft
                    };
                }
            }
        }

        if (closestSplitter) {
            that._dragDetails.windowFeedback.size = that._dragDetails.windowFeedback[closestSplitter._measurements.size];
        }
        else if (selectedTabsWindow === that.$.autoHideWindow) {
            const autoHidePosition = that.$.autoHideWindow._tabsWindow.tabPosition;

            that._dragDetails.windowFeedback.size = that.$.autoHideWindow['offset' + (autoHidePosition === 'top' || autoHidePosition === 'bottom' ? 'Height' : 'Width')];
        }

        that._dragDetails.windowFeedback.setAttribute('dragged', '');

        if (that._dragDetails.windowFeedback.parentElement !== that.getShadowRootOrBody()) {
            that._dragDetails.windowFeedback.windowParent = 'body';

            that.getShadowRootOrBody().appendChild(that._dragDetails.windowFeedback);

            that._ownTabWindow(that._dragDetails.windowFeedback);
        }

        //Reset tabPosition
        if ((that.snapMode !== 'advanced' && that._dragDetails.windowFeedback.tabPosition === 'none') || that._dragDetails.windowFeedback.autoHide) {
            that._dragDetails.windowFeedback.tabPosition = that._dragDetails.windowFeedback._originalTabPosition || 'top';
        }

        //Reset the proeprties of the Window
        that._dragDetails.windowFeedback.autoHide = false;
        that._dragDetails.windowFeedback.allowToggle = false;

        const itemIndex = that._items.indexOf(that._dragDetails.windowFeedback);

        if (itemIndex > -1) {
            that._items.splice(itemIndex, 1);
        }

        if (selectedItem && selectedItem.parentElement) {
            if (that._items.filter(item => item.opened).length === 0 && !that.$.placeholderItem.parentElement) {
                that.$.itemsContainer._items[0].className.indexOf('auto-hide') > -1 ?
                    that.$.itemsContainer.insert(1, that.$.placeholderItem) : that.$.itemsContainer.insert(0, that.$.placeholderItem);
            }

            if (closestSplitter) {
                closestSplitter.removeChild(selectedItem);
                that._dragDetails.initialSplitterOrientation = closestSplitter.orientation === 'horizontal';
                that._removeUnneccessaryItems(closestSplitter);
            }
            else if (selectedTabsWindow === that.$.autoHideWindow && that.$.autoHideWindow._tabsWindow.items.length === 0) {
                that.$.autoHideWindow._tabsWindow.closest('lw-splitter').removeChild(selectedItem);
            }

            that._setAutoHidePaddings();
        }
    }

    /**
     * Sets the size of the window feedback on documentMove
     */
    _setWindowFeedbackSize() {
        const that = this,
            selectedTabsWindow = that._dragDetails.selectedTabsWindow;

        if (!that._dragDetails._isWindowFeedbackSizeSet) {
            let width, height;

            if (selectedTabsWindow.autoHide && selectedTabsWindow._autoHideWindow) {
                if (selectedTabsWindow.tabPosition === 'top' || selectedTabsWindow.tabPosition === 'bottom') {
                    width = selectedTabsWindow.offsetWidth + 'px';
                    height = selectedTabsWindow._autoHideWindow.offsetHeight + 'px';
                }
                else {
                    width = selectedTabsWindow._autoHideWindow.offsetWidth + 'px';
                    height = selectedTabsWindow.offsetHeight + 'px';
                }
            }
            else {
                width = selectedTabsWindow.style.width || (selectedTabsWindow.offsetWidth + 'px');
                height = selectedTabsWindow.style.height || (selectedTabsWindow.offsetHeight + 'px');
            }

            that._dragDetails.windowFeedback.style.width = width;
            that._dragDetails.windowFeedback.style.height = height;
            that._dragDetails._isWindowFeedbackSizeSet = true;
        }
    }

    /**
    * Inserts a TabsWindow element inside the Layout.
    * index - lwTabsWindow index or it's instance
    * item - a lwTabsWindow instance to be inserted
    * position - defines the position ( top, bottom, left, right ) if the item should be nested
    */
    _insert(index, item, position) {
        const that = this;
        let targetItem;

        if (typeof index === 'string') {
            targetItem = that._getItemById(item);

            if (targetItem) {
                index = that._items.indexOf(targetItem);
            }
        }
        else if (index instanceof LW.TabsWindow && that.contains(index)) {
            index = that._items.indexOf(index);
        }

        if (typeof index !== 'number') {
            that.error(that.localize('invalidIndex', { elementType: that.nodeName.toLowerCase(), method: arguments[3] || 'insert' }));
            return;
        }

        if (typeof item === 'object' && !(item instanceof HTMLElement)) {
            item = that._createTabsWindowFromObject(item);
        }
        else if (typeof item === 'string') {
            item = that._getItemById(item);
        }
        else if (item instanceof LW.TabItem) {
            let parentTabsWindow = item.closest('lw-tabs-window');

            if (!parentTabsWindow && that.shadowRoot && item.getRootNode() && item.getRootNode().host) {
                parentTabsWindow = item.getRootNode().host.closest('lw-tabs-window');
            }

            if (parentTabsWindow && parentTabsWindow.autoHide) {
                that._dock(parentTabsWindow, position);
                return;
            }

            item = that._createTabsWindowFromObject({ label: item.label, items: [{ label: item.label, content: item.content }] });
        }

        if (!item || !(item instanceof LW.TabsWindow)) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: arguments[3] || 'insert' }));
            return;
        }

        if ((that.shadowRoot || that).contains(item) && item.autoHide) {
            that._dock(item, position);
            return;
        }

        if (position && position.indexOf('layout') > -1) {
            const openedItems = that._items.filter(item => item.opened);

            if (openedItems > 0) {
                index = position.indexOf('left') > -1 || position.indexOf('top') > -1 ? 0 : openedItems[openedItems.length - 1];
            }
            else {
                index = 0;
            }
        }

        targetItem = that._items[index];

        if (that._items[index] && !that._items[index].opened) {
            targetItem = that._items.filter(item => item.opened)[0];
        }

        if (that._items.length === 0) {
            that.$.itemsContainer.orientation = position.indexOf('left') > -1 || position.indexOf('right') > -1 ? 'vertical' : 'horizontal';
        }

        item.style.top = item.style.left = '';
        item.style.width = item.style.height = '';
        item.opened = true;
        item.pinned = true;

        const parentSplitterItem = item.closest('lw-splitter-item');

        if (!targetItem) {
            that.insertBefore(item, targetItem || null);

            if (parentSplitterItem) {
                let closestSplitter = parentSplitterItem.closest('lw-splitter');

                if (!closestSplitter && that.shadowRoot && parentSplitterItem.getRootNode() && parentSplitterItem.getRootNode().host) {
                    closestSplitter = parentSplitterItem.getRootNode().host.closest('lw-splitter');
                }

                if (closestSplitter) {
                    closestSplitter.removeChild(parentSplitterItem);
                }
            }
            return;
        }

        delete item._parentInfo;

        if (item.autoHide) {
            if (that.$.verticalHiddenItemsContainer.contains(item)) {
                that.$.verticalHiddenItemsContainer.removeChild(item.closest('lw-splitter-item'))
            }
            else if (that.$.horizontalHiddenItemsContainer.contains(item)) {
                that.$.horizontalHiddenItemsContainer.removeChild(item.closest('lw-splitter-item'))
            }
        }

        if (position) {
            that._handleItemPositionInserting(item, targetItem, position);
        }
        else {
            that.insertBefore(item, targetItem || null);
        }

        if (parentSplitterItem) {
            const closestSplitter = parentSplitterItem.closest('lw-splitter');

            if (closestSplitter) {
                closestSplitter.removeChild(parentSplitterItem);
            }
        }

        if (item.autoHide) {
            that._autoHide(item, position);
        }
        else {
            const scrollElement = document.scrollingElement || document.documentElement,
                x = scrollElement.scrollLeft,
                y = scrollElement.scrollTop;

            item.focus(); //Note: Applying focus sometimes breaks the style
            window.scrollTo(x, y);
        }

        if (that._items.filter(item => item.opened).length > 0 && that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.removeChild(that.$.placeholderItem);
        }

        item.layout = that;
        item.resizeMode = 'none';
        item.minimized = false;
        item.maximized = false;
        that._setDockedItemsHeaderButtons(item);
    }

    /**
     * Tabs Windows(inside itemsContainer) Close Event Handler
     * @param {any} event
     */
    _itemsContainerCloseHandler(event) {
        const that = this;

        if (event.target instanceof LW.Tabs) {
            const targetTabs = event.target;

            if (targetTabs._tabs.length === 0) {
                that.removeChild(targetTabs.closest('lw-tabs-window'));
            }

            return;
        }

        if (!(event.target instanceof LW.TabsWindow)) {
            return;
        }

        const splitterItem = event.target.closest('lw-splitter-item'),
            splitter = splitterItem.closest('lw-splitter');

        if (splitter) {
            splitter.removeChild(splitterItem);
            that._removeUnneccessaryItems(splitter);
        }

        event.target.close();
        event.target.remove();

        if (that._items.filter(item => item.opened).length === 0 && !that.$.placeholderItem.parentElement) {
            that.$.itemsContainer.appendChild(that.$.placeholderItem);
        }
    }

    /**
     * Menu autoHide event handler
     */
    _itemsContainerAutoHideHandler(event) {
        const that = this,
            button = event.detail.button,
            tabsWindow = button.closest('lw-tabs-window') || button.getRootNode().host;

        if (!tabsWindow) {
            return;
        }

        const closestSplitterItem = tabsWindow.closest('lw-splitter-item');

        if (!closestSplitterItem) {
            return;
        }

        const closestSplitter = tabsWindow.closest('lw-splitter');

        if (!closestSplitter) {
            return;
        }

        const closestSplitterItems = closestSplitter.items,
            isHorizontal = closestSplitter.orientation === 'horizontal',
            isFarItem = closestSplitterItems.indexOf(closestSplitterItem) >= closestSplitterItems.length / 2;

        if (isHorizontal) {
            isFarItem ? that.autoHideBottom(tabsWindow) : that.autoHideTop(tabsWindow);
        }
        else {
            isFarItem ? that.autoHideRight(tabsWindow) : that.autoHideLeft(tabsWindow);
        }

    }

    /**
     * Menu open/close event handler
     */
    _itemsContainerMenuHandler(event) {
        const that = this,
            menu = that.$.menu,
            layoutRect = that.getBoundingClientRect(),
            menuButtonRect = event.detail.button.getBoundingClientRect();

        menu.open(menuButtonRect.left - layoutRect.left, menuButtonRect.top - layoutRect.top);
        that._menuOpenButton = event.detail.button;
    }

    /**
     * ItemsContainer resizeEnd event handler. Called when a splitter item inside the Layout has been resized
     */
    _itemsContainerResizeHandler() {
        const that = this,
            targetItem = event.target._items ? event.target._items[event.detail.firstItem.index] : undefined;

        that._handleAutoSave();
        that.$.fireEvent('stateChange', { type: 'resize', item: targetItem });
    }

    /**
     * Key down event handler
     * @param {any} event
     */
    _keyDownHandler(event) {
        const that = this;

        if (that.disabled || !that.hasAttribute('dragged') || !that._snapFeedback) {
            return;
        }

        event.preventDefault();

        if (event.key === 'Control') {
            //Hide the snap feedback
            if (that.snapMode === 'advanced') {
                for (let el in that._snapFeedback) {
                    if (that._snapFeedback[el] instanceof HTMLElement) {
                        if (el === 'outherSnapElement') {
                            const outherElements = that.$.container.children;

                            for (let i = 0; i < outherElements.length; i++) {
                                if (outherElements[i].className.indexOf('lw-docking-layout-snap') > -1) {
                                    outherElements[i].classList.add('lw-hidden');
                                }
                            }

                            continue;
                        }

                        that._snapFeedback[el].classList.add('lw-hidden');
                    }
                }
            }
            else {
                that._snapFeedback.classList.add('lw-hidden');
            }
        }
        else if (event.key === 'Escape') {
            that._cancelDragOperation();
        }
    }

    /**
    * Key up event handler
    * @param {any} event
    */
    _keyUpHandler(event) {
        const that = this;

        if (that.disabled || event.key !== 'Control' || !that.hasAttribute('dragged') || !that._snapFeedback) {
            return;
        }

        event.preventDefault();

        //Show that._snapFeedback
        if (that.snapMode === 'advanced') {
            for (let el in that._snapFeedback) {
                if (that._snapFeedback[el] instanceof HTMLElement) {
                    if (el === 'outherSnapElement') {
                        const outherElements = that.$.container.children;

                        for (let i = 0; i < outherElements.length; i++) {
                            if (outherElements[i].className.indexOf('lw-docking-layout-snap') > -1) {
                                outherElements[i].classList.remove('lw-hidden');
                            }
                        }

                        continue;
                    }

                    that._snapFeedback[el].classList.remove('lw-hidden');
                }
            }

            that._handleSnapping();
        }
        else {
            that._snapFeedback.classList.remove('lw-hidden');
        }
    }

    /**
     * Loads the previously saved state to the element
     * @param {any} state
     */
    _loadState(state) {
        const that = this;

        that._createItemsFromArray(state, true);
    }

    /**
    * Removes all Layout items
    */
    _removeAll(noPlaceholder) {
        const that = this;

        function removeAutoHideItems(splitter) {
            const items = splitter._items;

            if (!items) {
                return;
            }

            for (let i = 0; i < items.length; i++) {
                if (!items[i].$.hasClass('lw-docking-layout-item-holder')) {
                    splitter.removeChild(items[i]);
                }
            }
        }

        that.$.itemsContainer.removeAll();

        //Remove auto-hidden-items
        removeAutoHideItems(that.$.horizontalHiddenItemsContainer);
        removeAutoHideItems(that.$.verticalHiddenItemsContainer);

        that._items = [];

        if (!noPlaceholder) {
            that.$.itemsContainer.appendChild(that.$.placeholderItem);
        }
    }

    /**
     * Removes unneccessary splitter elements when moving or removing items
     * @param {any} splitterContainer
     * @param {any} splitterItemForRemoval
     */
    _removeUnneccessaryItems(splitterContainer) {
        if (!splitterContainer) {
            return;
        }

        const that = this;
        let parentItem;

        while (splitterContainer._items && splitterContainer._items.length === 0 && splitterContainer !== that.$.itemsContainer) {
            (parentItem = splitterContainer.closest('lw-splitter-item')).removeChild(splitterContainer);
            splitterContainer = parentItem.closest('lw-splitter');
            splitterContainer.removeChild(parentItem);
        }
    }

    /**
    * Return item to original position
    * @param {any} item
    */
    _returnItemToOrigin(item) {
        const that = this;

        if (!item || !that._dragDetails) {
            return;
        }

        let parentInfo = that._dragDetails._parentInfo;

        if (!parentInfo) {
            return;
        }

        if (typeof (parentInfo.position) === 'number') {
            const tabItems = [].slice.call(item.items);

            for (let i = 0; i < tabItems.length; i++) {
                item.removeChild(tabItems[i]);
                parentInfo.closestItem.insert(parentInfo.position, { node: tabItems[i] });
            }
        }
        else if (typeof parentInfo.position === 'object') {
            item.style.top = parentInfo.position.top + 'px';
            item.style.left = parentInfo.position.left + 'px';
        }
        else {
            if (!parentInfo.closestItem) {
                that.appendChild(item);
            }
            else {
                if (parentInfo.closestItem === that.$.itemsContainer) {
                    that._autoHide(item, parentInfo.position);
                }
                else {
                    that._insert(that._items.indexOf(parentInfo.closestItem), item, parentInfo.position);
                }
            }
        }
    }

    /**
     * Calculates the paddings if the horizontal autoHidden items if vertical auto hiden items are present.
     */
    _setAutoHidePaddings() {
        const that = this,
            leftAutoHiddenItem = that.$.verticalHiddenItemsContainer.getElementsByClassName('auto-hide-left')[0],
            rightAutoHiddenItem = that.$.verticalHiddenItemsContainer.getElementsByClassName('auto-hide-right')[0],
            topAutoHiddenitem = that.$.horizontalHiddenItemsContainer.getElementsByClassName('auto-hide-top')[0],
            bottomAutoHiddenitem = that.$.horizontalHiddenItemsContainer.getElementsByClassName('auto-hide-bottom')[0];

        if (topAutoHiddenitem) {
            topAutoHiddenitem.style.paddingLeft = leftAutoHiddenItem ? leftAutoHiddenItem.offsetWidth + 'px' : '';
            topAutoHiddenitem.style.paddingRight = rightAutoHiddenItem ? rightAutoHiddenItem.offsetWidth + 'px' : '';
        }

        if (bottomAutoHiddenitem) {
            bottomAutoHiddenitem.style.paddingLeft = leftAutoHiddenItem ? leftAutoHiddenItem.offsetWidth + 'px' : '';
            bottomAutoHiddenitem.style.paddingRight = rightAutoHiddenItem ? rightAutoHiddenItem.offsetWidth + 'px' : '';
        }
    }

    /**
     * Sets the header buttons for all docked items
     * @param {any} tabsWindow
     */
    _setDockedItemsHeaderButtons(tabsWindow) {
        let headerButtons = tabsWindow.headerButtons,
            reservedButtons = ['close', 'maximize', 'minimize'];

        let dockedItemHeaderButtons = headerButtons.filter(buttonName => reservedButtons.indexOf(buttonName) < 0);

        if (dockedItemHeaderButtons.length === 0) {
            dockedItemHeaderButtons = ['close', 'autoHide'];
        }
        else {
            dockedItemHeaderButtons = headerButtons;
        }

        tabsWindow.headerButtons = dockedItemHeaderButtons;
    }

    /**
     * Sets the header buttons for the Floating Items
     * @param {any} tabsWindow
     */
    _setFloatingItemsHeaderButtons(tabsWindow) {
        const defaultButtons = ['close', 'autoHide']; // ['dock', 'autoHide']

        tabsWindow._originalTabPosition = tabsWindow.tabPosition;

        let floatingItemButtons = tabsWindow.headerButtons.filter(buttonName => defaultButtons.indexOf(buttonName) < 0);

        //Default FloatingItems buttons
        if (floatingItemButtons.length === 0) {
            floatingItemButtons = ['close', 'maximize', 'minimize'];
        }
        else {
            floatingItemButtons = tabsWindow.headerButtons;
        }

        tabsWindow.headerButtons = floatingItemButtons;
    }

    /**
    * Sets tab index
    */
    _setFocusable() {
        const that = this;

        if (!that.disabled && !that.unfocusable) {
            let index = that.tabIndex > 0 ? that.tabIndex : 0;

            that.setAttribute('tabindex', index);
        }
        else {
            that.removeAttribute('tabindex');
        }
    }

    /**
     * Checks if snapping highlighters/markers should appear or not
     */
    _setSnappingMarkers(event, tabHeader) {
        const that = this;
        let target = LW.Utilities.Core.isMobile ? document.elementFromPoint(event.pageX - window.pageXOffset, event.pageY - window.pageYOffset) : event.originalEvent.target;
        let isInsideLayout = target.closest && target.closest('lw-docking-layout');

        if (target.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
        }

        if (!isInsideLayout) {
            isInsideLayout = that._getClosestDockingLayout(target);
        }

        if (that.snapMode === 'advanced') {
            if (event.ctrlKey) {
                return;
            }

            that._dragDetails.hoveredItem = target.closest('.lw-docking-layout-snap') ? target :
                (that._dragDetails.hoveredItem && that._dragDetails.hoveredItem.getElementsByTagName('lw-splitter').length > 0 ? undefined : that._dragDetails.hoveredItem);
            that._dragDetails.hoveredTabArea = tabHeader ? (target.closest('.lw-tab-label-container') || tabHeader) : that._dragDetails.hoveredTabArea;
            that._handleSnapping('', event);
            return;
        }

        if (!isInsideLayout || isInsideLayout !== that) {
            that._handleSnapping();
            return;
        }

        if (!that._dragDetails.hoveredTabsWindow || (that._dragDetails.windowFeedback !== that.$.tabsWindowFeedback &&
            that._dragDetails.hoveredTabsWindow === that._dragDetails.selectedTabsWindow)) {
            that._dragDetails.hoveredItem = target.closest('.lw-docking-layout-snap') ? target :
                (that._dragDetails.hoveredItem && that._dragDetails.hoveredItem.getElementsByTagName('lw-splitter').length > 0 ? undefined : that._dragDetails.hoveredItem);
            that._handleSnapping();
            return;
        }

        let hoveredTabOffset = {};

        if (that._dragDetails.hoveredItem) {
            const hoveredItemRect = that._dragDetails.hoveredItem.getBoundingClientRect(),
                mainSplitterRect = that.$.itemsContainer.getBoundingClientRect();

            hoveredTabOffset.left = that._dragDetails.hoveredItem ? hoveredItemRect.left - mainSplitterRect.left : 0;
            hoveredTabOffset.top = that._dragDetails.hoveredItem ? hoveredItemRect.top - mainSplitterRect.top : 0;
        }
        else {
            hoveredTabOffset.left = hoveredTabOffset.top = 0;
        }

        const layoutRect = that.getBoundingClientRect(),
            itemsContainerRect = that.$.itemsContainer.getBoundingClientRect(),
            left = Math.max(0, event.pageX - window.pageXOffset - layoutRect.left - (itemsContainerRect.left - layoutRect.left)),
            top = Math.max(0, event.pageY - window.pageYOffset - layoutRect.top - (itemsContainerRect.top - layoutRect.top));

        if (that._dragDetails.hoveredTabArea === tabHeader) {
            that._dragDetails.hoveredTabArea = target.closest('.lw-tab-label-container');
            that._handleSnapping('header', event);
        }
        else if (that._dragDetails.hoveredItem && !that._dragDetails.hoveredTabsWindow.autoHide) {
            if (left < that.$.itemsContainer.offsetWidth * 0.05 && left < that._dragDetails.hoveredItem.offsetWidth * 0.15) {
                that._handleSnapping('layout-left');
            }
            else if (left > that.$.itemsContainer.offsetWidth * 0.95 && left > that._dragDetails.hoveredItem.offsetWidth * 0.85 + that._dragDetails.hoveredItem.offsetLeft) {
                that._handleSnapping('layout-right');
            }
            else if (top < that.$.itemsContainer.offsetHeight * 0.05) {
                that._handleSnapping('layout-top');
            }
            else if (top > that.$.itemsContainer.offsetHeight * 0.95) {
                that._handleSnapping('layout-bottom');
            }
            else if (target.closest('.lw-tabs-content-section')) {
                const orientation = that._dragDetails.hoveredItem.closest('lw-splitter').orientation;

                if (left < hoveredTabOffset.left + that._dragDetails.hoveredTabArea.offsetWidth * 0.3) {
                    that._handleSnapping(orientation === 'horizontal' ? 'inside-left' : 'left');
                }
                else if (left > hoveredTabOffset.left + that._dragDetails.hoveredTabArea.offsetWidth * 0.7) {
                    that._handleSnapping(orientation === 'horizontal' ? 'inside-right' : 'right');
                }
                else if (top < hoveredTabOffset.top + that._dragDetails.hoveredTabArea.offsetTop + that._dragDetails.hoveredTabArea.offsetHeight * 0.5 +
                    that._dragDetails.hoveredTabsWindow.$.headerSection.offsetHeight) {
                    that._handleSnapping(orientation === 'vertical' ? 'inside-top' : 'top');
                }
                else {
                    that._handleSnapping(orientation === 'vertical' ? 'inside-bottom' : 'bottom');
                }
            }
            else {
                that._handleSnapping();
            }
        }
        else {
            that._handleSnapping();
        }
    }

    /**
     * Handles the hideSplitterBars property
     */
    _setSplitterBarVisibility() {
        const that = this,
            splitterBars = that.$.itemsContainer.getElementsByTagName('lw-splitter-bar');

        for (let i = 0; i < splitterBars.length; i++) {
            that.hideSplitterBars ? splitterBars[i].hide() : splitterBars[i].show();
        }
    }

    /**
     * Keeps the window in the browser viewport
     * @param {any} targetWindow
     */
    _validateWindowPosition(targetWindow) {
        //Keeps the target inside view if possible. documentElement.clientSize !== scrollElement.clientSize in EDGE and Safari !

        targetWindow.$.addClass('no-transition', '');

        const scrollElement = document.scrollingElement || document.documentElement;

        if (scrollElement.scrollTop > 0) {
            targetWindow.style.top = (parseFloat(targetWindow.style.top) || targetWindow.offsetTop) + 'px';
        }
        else {
            //Keeps the window in the available ( window ) drop zone
            targetWindow.style.top = Math.max(0, Math.min(parseFloat(targetWindow.style.top) || targetWindow.offsetTop,
                document.documentElement.clientHeight - targetWindow.offsetHeight)) + 'px';
        }

        if (scrollElement.scrollLeft > 0) {
            targetWindow.style.left = (parseFloat(targetWindow.style.left) || targetWindow.offsetLeft) + 'px';
        }
        else {
            //Keeps the window in the available ( window ) drop zone
            targetWindow.style.left = Math.max(0, Math.min(parseFloat(targetWindow.style.left) || targetWindow.offsetLeft,
                document.documentElement.clientWidth - targetWindow.offsetWidth)) + 'px';
        }

        //Avoid transitions
        requestAnimationFrame(() => targetWindow.$.removeClass('no-transition'));
    }

    /**
     * Sets the WAI-ARIA property aria-owns
     */
    _ownTabWindow(tabWindow) {
        const that = this,
            tabWindowId = tabWindow.id;
        let owns = that.getAttribute('aria-owns');

        if (!owns) {
            that.setAttribute('aria-owns', tabWindowId);
            return;
        }

        owns = owns.split(' ');

        if (owns.indexOf(tabWindowId) === -1) {
            owns.push(tabWindowId);
            that.setAttribute('aria-owns', owns.join(' '));
        }
    }

    /**
     * Removes a TabsWindow from the aria-owns collection
     */
    _disownTabWindow(tabWindow) {
        const that = this,
            tabWindowId = tabWindow.id;
        let owns = that.getAttribute('aria-owns');

        if (!owns) {
            return;
        }

        owns = owns.split(' ');

        const index = owns.indexOf(tabWindowId);

        if (index === -1) {
            return;
        }

        owns.splice(index, 1).join(' ');

        if (owns.length > 0) {
            that.setAttribute('aria-owns', owns);
        }
        else {
            that.removeAttribute('aria-owns');
        }
    }

    /**
    * Docking Layout resize handler
    */
    _resizeHandler() {
        const that = this;

        //Repositiones the AutoHideWindow if opened
        if (that.$.autoHideWindow.opened && that.$.autoHideWindow._tabsWindow) {
            that.$.autoHideWindow._tabsWindow._setAutoHideWindowSize(that.$.autoHideWindow._tabsWindow.selectedIndex);
        }
    }

});
