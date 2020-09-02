
/**
* lwWindow custom element.
*/

LW('lw-window', class Window extends LW.ContentElement {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'collapsed': {
                value: false,
                type: 'boolean'
            },
            'closeOnMaskClick': {
                value: false,
                type: 'boolean'
            },
            'disableSnap': {
                value: false,
                type: 'boolean'
            },
            'footerPosition': {
                value: 'bottom',
                allowedValues: ['bottom', 'none'],
                type: 'string'
            },
            'footerTemplate': {
                value: null,
                type: 'any'
            },
            'headerButtons': {
                value: ['close', 'maximize', 'minimize'],
                //Default built-in buttons: ['close', 'collapse', 'pin' 'maximize', 'minimize']
                type: 'array'
            },
            'headerPosition': {
                value: 'top',
                allowedValues: ['top', 'bottom', 'left', 'right', 'none'],
                type: 'string'
            },
            'headerTemplate': {
                value: null,
                type: 'any'
            },
            'label': {
                value: '',
                type: 'string'
            },
            'liveResize': {
                value: false,
                type: 'boolean'
            },
            'maximized': {
                value: false,
                type: 'boolean'
            },
            'modal': {
                value: false,
                type: 'boolean'
            },
            'minimized': {
                value: false,
                type: 'boolean'
            },
            'opened': {
                value: false,
                type: 'boolean'
            },
            'pinned': {
                value: false,
                type: 'boolean'
            },
            'resizeIndicator': {
                value: false,
                type: 'boolean'
            },
            'resizeMode': {
                allowedValues: ['none', 'horizontal', 'vertical', 'both', 'top', 'bottom', 'left', 'right'],
                value: 'none',
                type: 'string'
            },
            'windowParent': {
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
            'document.dragstart': '_dragStartHandler',
            'document.focusin': '_documentFocusInEventHandler',
            'document.move': '_documentMoveHandler',
            'document.up': '_documentUpHandler',
            'document.wheel': '_mouseWheelHandler',
            'document.selectstart': '_documentSelectStartHandler',
            'down': '_downHandler',
            'focus': '_focusHandler',
            'blur': '_focusHandler',
            'move': '_moveHandler',
            'keydown': '_keyDownHandler',
            'keyup': '_keyUpHandler'
        }
    }

    /**
    * Disables the styleObserver
    */
    get hasStyleObserver() {
        return false;
    }

    /**
     * CSS files needed for the element (ShadowDOM)
     */
    static get styleUrls() {
        return [
            'lw.button.css',
            'lw.window.css'
        ]
    }

    /**
    * Element's HTML template.
    */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header" role="presentation">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container" role="presentation">
                                <button id="pinButton" class="lw-button lw-element lw-pin-button" aria-label="Pin"></button>
                                <button id="collapseButton" class="lw-button lw-element lw-collapse-button" aria-label="Collapse"></button>
                                <button id="minimizeButton" class="lw-button lw-element lw-minimize-button"aria-label="Minimize"></button>
                                <button id="maximizeButton" class="lw-button lw-element lw-maximize-button" aria-label="Maximize"></button>
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content" inner-h-t-m-l="[[innerHTML]]"><content></content></div>
                        <div id="footer" class="lw-footer"></div>
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
        const that = this;

        switch (propertyName) {
            case 'collapsed':
                newValue ? that.collapse(true) : that.expand(true);
                break;
            case 'disabled':
            case 'unfocusable':
                that._setFocusable();
                break;
            case 'headerTemplate':
            case 'footerTemplate':
                that._applyLayoutTemplate(that.$[propertyName.split(/[T]/)[0]], newValue);
                break;
            case 'headerButtons':
                that._setHeaderButtons();
                break;
            case 'headerPosition': {
                const isMinimized = that.minimized;

                that._preventEventFiring = true;
                that.restore();
                delete that._preventEventFiring;

                if (isMinimized) {
                    that.minimize();
                }

                break;
            }
            case 'label':
                that.$.header.innerHTML = that.label;
                break;
            case 'maximized':
                newValue ? that.maximize(true) : that.restore(propertyName);
                break;
            case 'modal':
                that._setModal();
                that.setAttribute('aria-modal', newValue);
                break;
            case 'minimized':
                newValue ? that.minimize(true) : that.restore(propertyName);
                break;
            case 'opened':
                newValue ? that.open(true) : that.close(true);
                break;
            case 'resizeMode':
                //Reset the resizing indicator
                that.$.container.classList.remove('lw-window-resizing-bottom-right', 'lw-window-resizing-top-right',
                    'lw-window-resizing-top-left', 'lw-window-resizing-bottom-left', 'lw-window-resizing-top',
                    'lw-window-resizing-bottom', 'lw-window-resizing-left', 'lw-window-resizing-right');
                break;
            case 'windowParent':
                that._setElementParent(newValue);
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
        const that = this;

        that._windowParent = { initialParent: that.parentElement };
    }

    render() {
        const that = this,
            animationType = that.animation;

        if (!that.$.header.id) {
            that.$.header.id = that.id + 'Header';
        }

        if (!that.$.content.id) {
            that.$.content.id = that.id + 'Content';
        }

        if (!that.opened) {
            that.animation = 'none';
        }

        that._windowParent = { initialParent: that.parentElement };

        that.$.addClass('lw-window');
        that._createElement();
        that._setElementParent(that.windowParent); //Remove if added to attached method
        that._setHeaderButtons();

        if (that.headerTemplate) {
            that._applyLayoutTemplate(that.$.header, that.headerTemplate);
        }

        if (that.footerTemplate) {
            that._applyLayoutTemplate(that.$.footer, that.footerTemplate);
        }

        that.opened ? that.open() : that.close();

        if (that.maximized) {
            that.maximize(true);
        }

        if (that.minimized) {
            that.minimize(true);
        }

        if (that.collapsed) {
            that.collapse(true);
        }

        that.pinned ? that.pin() : that.unpin();
        that._setFocusable();

        that.animation = animationType;

        that.setAttribute('aria-modal', that.modal);
        that.setAttribute('aria-labelledby', that.$.header.id);

        super.render();
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.Button': 'lw.button.js'
        }
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
    * Appends an HTML element content section of the Window.
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

        that.$.content.appendChild(node);
    }

    /**
     * Collapses the window
     */
    collapse(propertyChange) {
        const that = this;

        if (!propertyChange && that.collapsed) {
            return;
        }

        that.collapsed = true;
        that.$.fireEvent('collapse');

        if (that.headerPosition === 'left' || that.headerPosition === 'right') {
            that.style.width = '';
        }
        else {
            that.style.height = '';
        }
    }

    /**
     * Closes the window
     */
    close(propertyChange) {
        const that = this;

        if (!propertyChange && that.$.hasClass('lw-visibility-hidden')) {
            return;
        }

        if (that.isCompleted) {
            const isOpeningEventPrevented = that.$.fireEvent('closing').defaultPrevented;

            if (isOpeningEventPrevented) {
                return;
            }

            that.$.addClass('lw-visibility-hidden');
            that.opened = false;
            if (that.isRendered) {
                that.$.fireEvent('close');
            }
        }
        else {
            that.$.addClass('lw-visibility-hidden');
            that.opened = false;
        }

        that._setModal();
        that.removeAttribute('ontop');
    }

    /**
     * Element's Attached method
     */
    attached() {
        super.attached();

        const that = this;

        if (!that.isRendered) {
            //       return;
        }
        //MoveHandler not working, if enabled. Reason: Appending twice to the same parent.
        //that._setElementParent(that.windowParent);


        if (that._windowParent.parent && that._windowParent.parent !== that.getShadowRootOrBody() &&
            that._windowParent.parent.querySelectorAll('lw-window, lw-dialog-window, lw-progress-window, lw-wait-window, ' +
                'lw-alert-window, lw-prompt-window, lw-multiline-prompt-window')) {
            const windowParentPosition = window.getComputedStyle(that._windowParent.parent).getPropertyValue('position');

            if (windowParentPosition === 'static') {
                that._windowParent.parent.style.position = 'relative';
            }
        }

        if (that.opened && that._modal) {
            that.parentElement.insertBefore(that._modal, that);
        }
    }

    /**
     * Sets the window to the top level so the user can interact with it
     */
    bringToFront() {
        const that = this;

        if (!that.parentElement) {
            return;
        }

        const parentWindow = that.parentElement.closest('.lw-window');

        if (parentWindow) {
            parentWindow.bringToFront();
            return;
        }

        const windows = document.body.getElementsByClassName('lw-window');
        let openedWindows = [];

        for (let w = 0; w < windows.length; w++) {
            const win = windows[w];

            win.removeAttribute('ontop');

            if (win.opened) {
                openedWindows.push(win);
            }
        }

        if (openedWindows.length === 1 && openedWindows[0] === that) {
            return;
        }

        that.setAttribute('ontop', '');
    }

    /**
     * Clears the content of the Window
     */
    clear() {
        const that = this;

        if (!that.isCompleted || that.nodeName !== 'LW-WINDOW') {
            return;
        }

        that.$.content.innerHTML = '';
    }

    /**
     * Element's Detached method
     */
    detached() {
        super.detached();

        const that = this;

        if (that._windowParent.parent && !that._windowParent.parent.querySelectorAll('lw-window, lw-dialog-window, lw-progress-window, lw-wait-window, ' +
            'lw-alert-window, lw-prompt-window, lw-multiline-prompt-window')) {
            that._windowParent.parent.style.position = '';
        }

        if (that._modal && that._modal.parentElement) {
            that._modal.parentElement.removeChild(that._modal);
        }

        if (that._resizeDummy && that._resizeDummy.parentElement) {
            that._handleWindowResizeDummy();
        }

        that._refreshMinimizedWindowsPosition();
    }

    /**
     * Expands the window
     */
    expand(propertyChange) {
        const that = this;

        if (!propertyChange && !that.collapsed) {
            return;
        }

        that.collapsed = false;
        that.$.fireEvent('expand');

        if (that.maximized) {
            if (that.headerPosition === 'left' || that.headerPosition === 'right') {
                //In Safari and EDGE there is a bug. If scrollHeight < clientHeight, scrollHeight is not correct
                that.style.width = (Math.max(that._windowParent.scrollElement.scrollWidth, that._windowParent.element.clientWidth) - that._windowParent.borderWidth) + 'px';
            }
            else {
                that.style.height = (Math.max(that._windowParent.scrollElement.scrollHeight, that._windowParent.element.clientHeight) - that._windowParent.borderWidth) + 'px';
            }
        }
        else {
            if (that.headerPosition === 'left' || that.headerPosition === 'right') {
                that.style.width = that.className.indexOf('lw-window-snapped-') < 0 && that._dragDetails ? that._dragDetails.width + 'px' : '';
            }
            else {
                that.style.height = that.className.indexOf('lw-window-snapped-') < 0 && that._dragDetails ? that._dragDetails.height + 'px' : '';
            }
        }
    }

    /**
     * Maximizes the window
     */
    maximize(propertyChange) {
        const that = this;

        //Fixes the issue where maximizing a window that overflows the viewport ( scrollbars are rendered ) with animation causes inproper height/width calculation if the scrollbars get hidden
        function transitionHandler() {
            if (!that.maximized || !that.hasAnimation) {
                return;
            }

            const scrollHeight = that._windowParent.scrollElement.scrollHeight,
                clientHeight = that._windowParent.element.clientHeight,
                totalParentHeight = Math.max(scrollHeight, clientHeight);

            if (that.headerPosition === 'top' || that.headerPosition === 'bottom') {
                if (!that.collapsed) {
                    that.style.height = scrollHeight > clientHeight ? (totalParentHeight - that._windowParent.borderWidth) + 'px' : '100%';
                }
            }
            else {
                that.style.height = scrollHeight > clientHeight ? (totalParentHeight - that._windowParent.borderWidth) + 'px' : '100%';
            }

            that.removeEventListener('transitionend', transitionHandler);
        }

        if (!propertyChange && that.maximized) {
            return;
        }

        if (that.minimized) {
            that._restoreFromMinimization(propertyChange);
        }

        //Save the current size and position before maximizing
        that._setDragDetails('minimize');

        //Remove resizing indicator classes if added
        if (that.resizeMode !== 'none') {
            that.$.container.classList.remove('lw-window-resizing-bottom-right', 'lw-window-resizing-top-right',
                'lw-window-resizing-top-left', 'lw-window-resizing-bottom-left', 'lw-window-resizing-top',
                'lw-window-resizing-bottom', 'lw-window-resizing-left', 'lw-window-resizing-right');
        }

        if (that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {
            that.classList.remove('lw-window-snapped-' + that._snapDummy._position);
        }

        that.maximized = true;
        that.$.fireEvent('maximize');

        that.style.left = that.style.top = 0;
        that.style.maxWidth = that.style.maxHeight = 'none';

        //NOTE: Resize event must be added in order to always fit the parent. That will hammer the performance. That's why it's not added!
        //In Safari and EDGE there is a bug. If scrollHeight < clientHeight, scrollHeight is not correct
        const scrollHeight = that._windowParent.scrollElement.scrollHeight,
            scrollWidth = that._windowParent.scrollElement.scrollWidth,
            clientHeight = that._windowParent.element.clientHeight,
            clientWidth = that._windowParent.element.clientWidth,
            totalParentHeight = Math.max(scrollHeight, clientHeight),
            totalParentWidth = Math.max(scrollWidth, clientWidth);

        if (that.headerPosition === 'top' || that.headerPosition === 'bottom') {
            that.style.width = scrollWidth > clientWidth ? (totalParentWidth - that._windowParent.borderWidth) + 'px' : '100%';

            if (!that.collapsed) {
                that.style.height = scrollHeight > clientHeight ? (totalParentHeight - that._windowParent.borderWidth) + 'px' : '100%';
            }
        }
        else {
            if (!that.collapsed) {
                that.style.width = scrollWidth > clientWidth ? (totalParentWidth - that._windowParent.borderWidth) + 'px' : '100%';
            }

            that.style.height = scrollHeight > clientHeight ? (totalParentHeight - that._windowParent.borderWidth) + 'px' : '100%';
        }

        if (that.style.height !== '100%') {
            that.addEventListener('transitionend', transitionHandler);
        }
    }

    /**
     * Minimizes the window
     * @param {any} propertyChange
     */
    minimize(propertyChange) {
        const that = this;

        if (!propertyChange && that.minimized) {
            return;
        }

        if (that.maximized) {
            that._preventEventFiring = true;
            that.restore();
            delete that._preventEventFiring;
        }

        //Save the size and position of the element before minimizing
        that._setDragDetails();

        that.minimized = true;
        that.$.fireEvent('minimize');

        if (that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {
            that.$.removeClass('lw-window-snapped-' + that._snapDummy._position);
            that.style.right = that.style.top = that.style.left = '';
        }

        const minimizedWindows = that._getAllMinimizedWindows(that._windowParent.element);

        if (minimizedWindows.length > 0) {
            const lastWindow = minimizedWindows[minimizedWindows.length - 1];

            that.style.left = (lastWindow.offsetLeft + lastWindow.offsetWidth + that._dragDetails.minWidth + 10 > that._windowParent.element.clientWidth ?
                lastWindow.offsetLeft : lastWindow.offsetLeft + lastWindow.offsetWidth + 5) + 'px';
            that.style.top = lastWindow.offsetTop + 'px';
        }
        else {
            that.style.left = '5px';

            //document.documentElement.scrollTop is always 0 in MS EDGE but not in IE11!
            that.style.top = (that._windowParent.element.clientHeight +
                that._windowParent.scrollElement.scrollTop - that.$.headerSection.offsetHeight - 5) + 'px';
        }

        that.style.width = '';
        that.style.height = that.$.headerSection.offsetHeight + 'px';
    }

    /**
     * Create Element
     */
    _createElement() {
        this.setAttribute('role', 'dialog');
    }

    /**
    * Removes an HTML element from the content section.
    */
    removeChild(node) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        that.$.content.removeChild(node);
    }

    /**
     * Unmaximizes the window
     */
    restore(propertyChange) {
        const that = this;

        if (propertyChange === 'maximized' || that.maximized) {
            that.maximized = false;
            that.style.width = that.style.height = that.style.top = that.style.left = '';
        }
        else if (propertyChange === 'minimized' || that.minimized) {
            that._restoreFromMinimization(propertyChange);
        }

        if (!that._preventEventFiring) {
            that.$.fireEvent('restore');
        }

        that.style.maxWidth = that.style.maxHeight = '';

        if (that._dragDetails) {
            that.style.left = Math.max(0, Math.min(that._dragDetails.windowX, that._windowParent.element.clientWidth - that._dragDetails.width)) + 'px';
            that.style.top = Math.max(0, Math.min(that._dragDetails.windowY, that._windowParent.scrollElement.scrollHeight - that._dragDetails.height)) + 'px';

            if (that.collapsed) {
                if (that.headerPosition === 'top' || that.headerPosition === 'bottom') {
                    that.style.width = that._dragDetails.width + 'px';
                }
                else {
                    that.style.height = that._dragDetails.height + 'px';
                }

                return;
            }

            if (that._dragDetails.resized) {
                that.style.width = that._dragDetails.width + 'px';
                that.style.height = that._dragDetails.height + 'px';
            }
        }
    }

    /**
     * Opens the window
     */
    open(propertyChange) {
        const that = this;

        if (!propertyChange && !that.$.hasClass('lw-visibility-hidden')) {
            return;
        }

        function focusAfterOpen(event) {
            if (!that.hasAnimation || event && event.target === that) {
                that.focus();
                that.removeEventListener('transitionend', focusAfterOpen);
            }
        }

        if (that.isCompleted) {
            const isOpeningEventPrevented = that.$.fireEvent('opening').defaultPrevented;

            if (isOpeningEventPrevented) {
                return;
            }

            that.$.removeClass('lw-visibility-hidden');
            that.opened = true;
            that.$.fireEvent('open');
        }
        else {
            that.$.removeClass('lw-visibility-hidden');
            that.opened = true;
        }

        that.bringToFront();
        that._setModal();
        that._handleActiveState();

        if (!that.hasAnimation) {
            focusAfterOpen();
        }
        else {
            that.addEventListener('transitionend', focusAfterOpen);
        }

    }

    /**
     * Pins the window
     */
    pin() {
        this.pinned = true;
    }

    /**
     * Unpin the window
     */
    unpin() {
        this.pinned = false;
    }

    /**
    * Apply the layout template for the header/footer
    */
    _applyLayoutTemplate(selector, template) {
        const that = this;

        if (!template) {
            selector.innerHTML = '';

            if (selector === that.$.header && that.label) {
                selector.innerHTML = that.label;
            }

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
            that.error(that.localize('invalidTemplate', {
                elementType: that.nodeName.toLowerCase(),
                property: selector === that.$.footer ? 'footerTemplate' : 'headerTemplate'
            }));
            return;
        }

        selector.innerHTML = '';
        selector.appendChild(document.importNode(template.content, true));
    }

    /**
    * Cancel the Drag operation
    * @param {any} event
    */
    _cancelDragging(event) {
        const that = this;

        if (that._dragDetails && that._dragDetails.started && that._dragDetails.type === 'drag') {
            if (!event) {
                const windowRect = that.getBoundingClientRect();

                event = { pageX: windowRect.left, pageY: windowRect.top };
            }

            that.$.fireEvent('dragEnd', { left: event.pageX, top: event.pageY });
            that.removeAttribute('dragged');
            that._dragDetails.started = false;
            delete that._mouseManipulation;
        }
    }

    /**
    * Document focusin event handler.
    * Called when an element is about to receive focus
    * @param {any} event
    */
    _documentFocusInEventHandler(event) {
        const that = this;

        if (!that._changingFocus) {
            return;
        }

        if (!that.contains(event.target) && !that.contains(event.composedPath()[0])) {
            that.focus();
        }

        delete that._changingFocus;
    }

    /**
     * Element Down event handler
     * @param {any} event
     */
    _downHandler(event) {
        const that = this;
        let target = LW.Utilities.Core.isMobile ? document.elementFromPoint(event.pageX - window.pageXOffset, event.pageY - window.pageYOffset) : event.originalEvent.target;

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
        }

        event.stopPropagation();

        //Left mouse click is 1
        if (that.disabled || (!LW.Utilities.Core.isMobile && event.which !== 1)) {
            return;
        }

        //AutoHideWindow in a LW.TabsWindow
        if (that._tabsWindow) {
            that._tabsWindow._isAutoHideWindowClicked = true;
        }

        if (!that.hasAttribute('ontop')) {
            that.bringToFront();
        }

        if (target.closest && target.closest('.lw-buttons-container') === that.$.buttonsContainer) {
            that._buttonPressed = target.closest('.lw-button');

            if (that._buttonPressed) {
                return;
            }
        }
        else if (target.getRootNode() && target.getRootNode().host) {
            that._buttonPressed = target.getRootNode().host;

            if (that._buttonPressed.closest('.lw-buttons-container') === that.$.buttonsContainer) {
                return;
            }
        }

        that._isWindowContentClicked = target.closest('.lw-content');

        let isInsideLayout = that.closest('lw-docking-layout');

        if (that.isInShadowDOM && !isInsideLayout) {
            let host = that.getRootNode().host;

            while (host) {
                isInsideLayout = host.closest('lw-docking-layout');

                if (isInsideLayout) {
                    break;
                }

                if (!host.getRootNode()) {
                    break;
                }

                host = host.getRootNode().host;
            }
        }

        if (that instanceof LW.TabsWindow && isInsideLayout && isInsideLayout.disabled) {
            return;
        }

        that._handleActiveState();

        if (that instanceof LW.TabsWindow && isInsideLayout) {
            if (that.$.hasClass('lw-docking-layout-auto-hide-window')) {
                //Check if a resize zone is entered on touchstart
                if (LW.Utilities.Core.isMobile) {
                    that._moveHandler(event);
                }

                if (that.resizeMode !== 'none' && that.$.container.className.indexOf('lw-window-resizing') > -1) {
                    that._mouseManipulation = true;
                    that._setDragDetails('resize', event);
                }
            }

            return;
        }

        if (target.closest('.lw-header-section') === that.$.headerSection) {
            if (that._dblClickDetails === undefined) {
                that._dblClickDetails = { clicks: 0 };
            }

            clearTimeout(that._dblClickDetails.timeOut);
            that._dblClickDetails.clicks++;

            that._dblClickDetails.timeOut = setTimeout(function () {
                if (that._dblClickDetails) {
                    that._dblClickDetails.clicks = 0;
                }
            }, 300);

            if (that._dblClickDetails.clicks === 2) {
                that._headerDblCickHandler(event);
                that._dblClickDetails.clicks = 0;
                return;
            }
        }

        if (that.maximized) {
            return;
        }

        //Check if a resize zone is entered on touchstart
        if (LW.Utilities.Core.isMobile) {
            that._moveHandler(event);
        }

        if (!that.pinned && !that.minimized && that.$.container.className.indexOf('lw-window-resizing') < 0) {
            target = target.closest('.lw-header-section');

            if (target && target === that.$.headerSection) {
                that._mouseManipulation = true;
                that._setDragDetails('drag', event);
            }
        }

        if (that.resizeMode !== 'none' && that.$.container.className.indexOf('lw-window-resizing') > -1) {
            that._mouseManipulation = true;
            that._setDragDetails('resize', event);
        }
    }

    /**
     * Document Move Event Handler
     * @param {any} event - event details
     */
    _documentMoveHandler(event) {
        const that = this;

        if (!that._dragDetails || !that._dragDetails.started || that.minimized || !that._mouseManipulation ||
            (Math.abs(event.pageX - that._dragDetails.x) <= 5 && Math.abs(event.pageY - that._dragDetails.y) <= 5)) {
            return;
        }

        if (!that.hasAttribute('dragged') && !that.hasAttribute('resized')) {
            that.$.fireEvent(that._dragDetails.type + 'Start', { left: event.pageX, top: event.pageY, width: that.offsetWidth, height: that.offsetHeight });
        }

        event.stopPropagation();

        if (that._dragDetails.type === 'drag' && !that.pinned) {
            that.setAttribute('dragged', '');

            if (that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {
                that.$.removeClass('lw-window-snapped-' + that._snapDummy._position);
                that.style.right = that.style.top = that.style.left = '';

                if (!that.collapsed) {
                    that.style.height = that._dragDetails.height + 'px';
                    that.style.width = that._dragDetails.width + 'px';
                }
            }

            that._drag(event, 'both');

            //document.documentElement.scrollTop is always 0 in MS EDGE but not in IE11!
            that._dragDetails.x = Math.max(that._windowParent.offsetLeft + that._dragDetails.offsetX - that._windowParent.scrollElement.scrollLeft,
                Math.min((that._windowParent.offsetLeft + that._windowParent.element.offsetWidth) - (that._windowParent.element.offsetWidth -
                    that.offsetLeft) + that._dragDetails.offsetX, event.pageX));

            that._dragDetails.y = Math.max(that._windowParent.offsetTop + that._dragDetails.offsetY - that._windowParent.scrollElement.scrollTop,
                Math.min((that._windowParent.offsetTop + that._windowParent.element.offsetHeight) - (that._windowParent.element.offsetHeight -
                    that.offsetTop) + that._dragDetails.offsetY, event.pageY));

            //Window snapping logic
            if (event.pageX >= that._windowParent.offsetLeft + that._windowParent.scrollElement.scrollWidth - 1) {
                that._handleSnapping('right');
            }
            else if (event.pageY <= that._windowParent.offsetTop) {
                that._handleSnapping('top');
            }
            else if (event.pageX <= that._windowParent.offsetLeft) {
                that._handleSnapping('left');
            }
            else {
                that._handleSnapping();
            }
        }
        else {
            that._dragDetails.resized = true;
            that._resize(that._dragDetails.side, event);

            //document.documentElement.scrollTop is always 0 in MS EDGE but not in IE11!
            that._dragDetails.x = Math.max(that._windowParent.offsetLeft + that._dragDetails.left,
                Math.min(that._windowParent.offsetLeft + that._dragDetails.left + (that._dragDetails.side.toLowerCase().indexOf('left') > -1 ? 0 : that._dragDetails.newWidth), event.pageX));

            that._dragDetails.y = Math.max(that._windowParent.offsetTop + that._dragDetails.top,
                Math.min(that._windowParent.offsetTop + that._dragDetails.top + (that._dragDetails.side.toLowerCase().indexOf('top') > -1 ? 0 : that._dragDetails.newHeight), event.pageY));
        }
    }

    /**
    * Document Down event handler
    * @param {any} event - event details
    */
    _documentUpHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if (that.disabled) {
            that.removeAttribute('active');
            delete that._buttonPressed;
            delete that._isWindowContentClicked;
            return;
        }

        if (that._dragDetails && that._dragDetails.started) {
            if (that.hasAttribute('resized')) {
                that.$.fireEvent(that._dragDetails.type + 'End', { left: event.pageX, top: event.pageY, width: that._dragDetails.newWidth, height: that._dragDetails.newHeight });
                that.removeAttribute('resized');
                that._handleWindowResizeDummy();
                that.$.container.classList.remove('lw-window-resizing-bottom-right', 'lw-window-resizing-top-right',
                    'lw-window-resizing-top-left', 'lw-window-resizing-bottom-left', 'lw-window-resizing-top',
                    'lw-window-resizing-bottom', 'lw-window-resizing-left', 'lw-window-resizing-right');
            }

            //The only way to stop the transitions when liveResize is false
            setTimeout(function () {
                that.$.removeClass('no-transition');
            }, 20);

            if (that.hasAttribute('dragged')) {
                that.$.fireEvent(that._dragDetails.type + 'End', { left: event.pageX, top: event.pageY });
                that.removeAttribute('dragged');
            }

            that._dragDetails.started = false;
            delete that._mouseManipulation;
        }

        if (that._snapDummy && !that._snapDummy.classList.contains('lw-visibility-hidden')) {
            switch (that._snapDummy._position) {
                case 'left':
                case 'top':
                    that.style.left = that.style.top = '0';
                    that.style.right = 'auto';

                    break;
                case 'right':
                    that.style.left = 'auto';
                    that.style.top = that.style.right = '0';
                    break;
            }

            that.style.width = that._snapDummy._position === 'top' ? '100%' : '50%';
            that.style.height = '100%';
            that.$.addClass('lw-window-snapped-' + that._snapDummy._position);
            that._handleSnapping();
        }

        if (that._modal && target === that._modal && !that._isWindowContentClicked) {
            that.closeOnMaskClick ? that.close() : that.focus();
        }

        if (that._isWindowButton(target)) {
            that.focus();
        }

        delete that._isWindowContentClicked;
        delete that._buttonPressed;

        const activeElement = that.shadowRoot && that._windowParent.element && that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement;

        if (!that.hasAttribute('active') || activeElement === that) {
            return;
        }

        if (!target.closest) {
            return;
        }

        let closestWindow = target.closest('.lw-window');

        while (closestWindow) {
            if (closestWindow === that) {
                break;
            }

            closestWindow = closestWindow.parentElement;

            if (closestWindow) {
                closestWindow = closestWindow.closest('.lw-window');
            }
        }

        if (that.opened && closestWindow !== that) {
            that.removeAttribute('active');
        }
    }

    /**
     * Document select start handler.
     */
    _documentSelectStartHandler(event) {
        const that = this;

        if (that._dragDetails && that._dragDetails.started) {
            event.preventDefault();
        }
    }

    /**
     * Repositions the window ( Dragging  operation )
     */
    _drag(event, direction) {
        const that = this;

        if (!event || that.pinned || that.maximized) {
            return;
        }

        let distanceX, distanceY;

        if (!that._dragDetails || !that._dragDetails.started) {
            that._setDragDetails('drag', event);
        }

        //Disables animatied movement
        that.$.addClass('no-transition');

        if (typeof (event) === 'object') {
            distanceX = event.pageX - that._dragDetails.x;
            distanceY = event.pageY - that._dragDetails.y;
        }
        else {
            distanceX = distanceY = event;
        }

        //Safari, EDGE have a different with the height of the viewport depending on the elemnets on the page
        const totalParentHeight = Math.max(that._windowParent.element.clientHeight, that._windowParent.scrollElement.scrollHeight),
            totalParentWidth = Math.max(that._windowParent.element.clientWidth, that._windowParent.scrollElement.scrollWidth);

        switch (direction) {
            case 'horizontal':
                that._dragDetails.windowX = Math.max(0, Math.min(that._dragDetails.windowX + distanceX, totalParentWidth - that.offsetWidth));
                that.style.left = that._dragDetails.windowX + 'px';
                break;
            case 'vertical':
                that._dragDetails.windowY = Math.max(0, Math.min(that._dragDetails.windowY + distanceY, totalParentHeight - that.offsetHeight));
                that.style.top = that._dragDetails.windowY + 'px';
                break;
            case 'both':
                that._dragDetails.windowX = Math.max(0, Math.min(that._dragDetails.windowX + distanceX, totalParentWidth - that.offsetWidth));
                that._dragDetails.windowY = Math.max(0, Math.min(that._dragDetails.windowY + distanceY, totalParentHeight - that.offsetHeight));
                that.style.left = that._dragDetails.windowX + 'px';
                that.style.top = that._dragDetails.windowY + 'px';
                break;
        }

        that._dragDetails.top = that.offsetTop;
        that._dragDetails.left = that.offsetLeft;
    }

    /**
     * DragStarted Event Handler
     * @param {any} event
     */
    _dragStartHandler(event) {
        const that = this;

        if (that._dragDetails && that._dragDetails.started) {
            event.preventDefault();
        }
    }

    /**
     * Element's focus/blue event handler
     * @param {any} event
     */
    _focusHandler(event) {
        const that = this;

        if (event.type === 'focus') {
            that.setAttribute('focus', '');
            that.bringToFront();
        }
        else if (!that._buttonPressed) {
            that.removeAttribute('focus');

            if (that._dragDetails && that._dragDetails.started) {
                that._handleWindowResizeDummy();
            }
        }
    }

    /**
    * Retrieves all curently minimized windows in an array.
    * @param {any} container
    */
    _getAllMinimizedWindows(container) {
        const that = this;
        let minimizedWindows = [];

        if (!container) {
            container = that._windowParent.element;
        }

        const windowElements = container.querySelectorAll('lw-window');

        for (let i = 0; i < windowElements.length; i++) {
            if (windowElements[i] !== that && windowElements[i].hasAttribute('minimized')) {
                minimizedWindows.push(windowElements[i]);
            }
        }

        minimizedWindows.sort(function (a, b) {
            let aRect = a.getBoundingClientRect(),
                bRect = b.getBoundingClientRect();

            return aRect.right - bRect.right;
        });

        return minimizedWindows;
    }

    /**
    * Handles the snapping of the window to the viewport. Adds a dummy that will determine the snapping behavior.
    * @param {any} position
    */
    _handleSnapping(position) {
        const that = this;

        function transitionEndHandler() {
            if (that._snapDummy.classList.contains('lw-visibility-hidden') && that._snapDummy.parentElement) {
                that._snapDummy.parentElement.removeChild(that._snapDummy);
            }
        }

        if (!position) {
            if (that._snapDummy && that._snapDummy.parentElement) {
                that._snapDummy.classList.add('lw-visibility-hidden');
            }

            return;
        }

        if (that.disableSnap || that.collapsed) {
            return;
        }

        if (!that._snapDummy) {
            that._snapDummy = document.createElement('div');

            that._snapDummy.addEventListener('transitionend', transitionEndHandler);
        }

        that._snapDummy.className = 'lw-window-snap-' + position + '-feedback';
        that._snapDummy._position = position;

        if (!that._snapDummy.parentElement) {
            that._windowParent.element.appendChild(that._snapDummy);
        }
    }

    /**
     * Window header double click handler.
     */
    _headerDblCickHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        if ((target !== that.$.headerSection && target !== that.$.header) || (that.$.maximizeButton && that.$.maximizeButton.offsetHeight === 0)) {
            return;
        }

        that.maximized ? that.restore() : that.maximize();
    }

    /**
    * Element Up event handler
    * @param {any} event - event details
    */
    _isWindowButton(target) {
        const that = this;

        while (target) {
            let relatedTarget = target.closest && target.closest('.lw-buttons-container');

            if (relatedTarget === that.$.buttonsContainer) {
                break;
            }

            target = target.getRootNode().host;
        }

        if (!target) {
            return;
        }

        const customButtonRegex = /lw-(\w+[-]*\w*)-button/ig;

        target = target.closest('.lw-button');

        if (!target || target !== that._buttonPressed) {
            return;
        }

        switch (target) {
            case that.$.closeButton:
                that.close();
                return true;
            case that.$.collapseButton:
                that.collapsed ? that.expand() : that.collapse();
                return true;
            case that.$.maximizeButton:
                that.maximized ? that.restore() : that.maximize();
                return true;
            case that.$.minimizeButton:
                that.minimized ? that.restore() : that.minimize();
                return true;
            case that.$.pinButton:
                that.pinned ? that.unpin() : that.pin();
                return true;
            default:
                //Custom Header Button
                if (!(customButtonRegex.test(target.className))) {
                    return;
                }

                that.$.fireEvent(LW.Utilities.Core.toCamelCase(target.className.match(customButtonRegex).toString().replace('lw-', '').replace('-button', '')), { button: target });
                return true;
        }
    }

    /**
     * Key Down event handler
     * @param {any} event - event details
     */
    _keyDownHandler(event) {
        const that = this;

        delete that._changingFocus;

        if (that.disabled || ((that.hasAttribute('dragged') || that.hasAttribute('resized')) && that._mouseManipulation)) {
            return;
        }

        event.stopPropagation();

        //Distance hardcoded to 10px
        const distance = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 10 : -10,
            activeElement = that.enableShadowDOM && that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement;

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight': {
                if (that.minimized || activeElement !== that) {
                    return;
                }

                let direction = event.key.indexOf('Right') > -1 || event.key.indexOf('Left') > -1;

                event.preventDefault();

                const isInsideLayout = (that.isInShadowDOM ? that.getRootNode().host : that).closest('lw-docking-layout');

                if (!direction && event.altKey && !(that instanceof LW.TabsWindow && isInsideLayout)) {
                    event.key === 'ArrowUp' ? that.maximize() : that.restore();
                    return;
                }

                if (that.maximized) {
                    return;
                }

                //that.style.transition = '';
                that.$.addClass('no-transition');

                if (event.ctrlKey && that.resizeMode !== 'none' && !that.collapsed) {
                    if (['horizontal', 'vertical', 'both'].indexOf(that.resizeMode) === -1) {
                        direction = that.resizeMode;
                    }
                    else {
                        direction = direction ? 'right' : 'bottom';
                    }

                    if (that.hasAttribute('dragged')) {
                        that._cancelDragging(event);
                    }

                    if (!that.hasAttribute('resized')) {
                        that.$.fireEvent('resizeStart', { 'position': { x: event.pageX, y: event.pageY } });
                    }

                    that._resize(direction, distance);
                    return;
                }

                if (!that.pinned) {
                    if (!that.hasAttribute('dragged')) {
                        that.setAttribute('dragged', '');
                        that.$.fireEvent('dragStart', { left: event.pageX, top: event.pageY });
                    }

                    that._drag(distance, direction ? 'horizontal' : 'vertical');
                }

                //that.style.transition = '';
                that.$.removeClass('no-transition');
                break;
            }
            case 'Escape':
                if (that.headerButtons.indexOf('close') > -1 && activeElement === that) {
                    that.close();
                }

                break;
            case 'p':
                if (event.altKey && that.headerButtons.indexOf('pin') > -1) {
                    that.pinned ? that.unpin() : that.pin();
                }

                break;
            case 'c':
                if (event.altKey && that.headerButtons.indexOf('collapse') > -1) {
                    that.collapsed ? that.expand() : that.collapse();
                }

                break;

            case 'm':
                if (event.altKey && that.headerButtons.indexOf('minimize') > -1) {
                    that.minimized ? that.restore() : that.minimize();
                }

                break;
            case 'Tab':
                if (that.opened && that.modal) {
                    that._changingFocus = true;
                }

                break;
            case 'Enter':
            case ' ':
                {
                    let target;

                    if (that.shadowRoot || that.isInShadowDOM) {
                        target = event.composedPath()[0];
                        that._buttonPressed = target.getRootNode().host;
                    }
                    else {
                        target = event.target.closest && event.target.closest('.lw-button');
                        that._buttonPressed = target;
                    }

                    if (!target) {
                        return;
                    }

                    that._isWindowButton(target);
                    delete that._buttonPressed;
                    break;
                }
        }
    }

    /**
     * KeyUp Event Handler
     */
    _keyUpHandler(event) {
        const that = this;

        if (!event.key) {
            return;
        }

        if (event.key === 'Control' && that._dragDetails && that.hasAttribute('resized') && !that._mouseManipulation) {
            if (!that._dragDetails.started) {
                return;
            }

            if (that._dragDetails.type !== 'drag') {
                that.removeAttribute('resized');
                that.$.fireEvent('resizeEnd', { left: event.pageX, top: event.pageY, width: that._dragDetails.newWidth, height: that._dragDetails.newHeight });
                that._handleWindowResizeDummy();
            }

            that._dragDetails.started = false;
        }

        if (event.key.indexOf('Arrow') > -1 && that.hasAttribute('dragged') && !that._mouseManipulation) {
            that._cancelDragging(event);
        }
    }

    /**
     * Document Mouse Wheel event
     */
    _mouseWheelHandler(event) {
        const that = this;

        if (that.disabled || !(that._dragDetails && that._dragDetails.started)) {
            return;
        }

        //document.documentElement.scrollTop is always 0 in MS EDGE but not in IE11!
        if (event.deltaY < 0 && that._windowParent.scrollElement.scrollTop + event.deltaY <= 0) {
            that.style.top = Math.max(0, that._dragDetails.windowY) + 'px';
            return;
        }

        if (event.deltaY > 0 && (that._dragDetails.windowY + that.offsetHeight + event.deltaY >= that._windowParent.scrollElement.scrollHeight ||
            that._windowParent.scrollElement.scrollTop + that._windowParent.element.clientHeight === that._windowParent.scrollElement.scrollHeight)) {
            return;
        }

        if (that._dragDetails.type === 'drag') {
            that._dragDetails.windowY += event.deltaY;
            that.style.top = that._dragDetails.windowY + 'px';
        }
        else {
            that._dragDetails.height += event.deltaY;
            that.style.height = that._dragDetails.height + 'px';
        }
    }

    /**
     * Element's Mouse Move handler'
     */
    _moveHandler(event) {
        const that = this;

        if (that.disabled || that.collapsed || that.maximized || that.minimized) {
            return;
        }

        //iOS Safari fix for dragging (prevents window scrolling)
        if (LW.Utilities.Core.isMobile && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && that.hasAttribute('dragged')) {
            event.originalEvent.preventDefault();
        }

        if (that._mouseManipulation) {
            return;
        }

        if (that.$.container.className.indexOf('lw-window-resizing') > -1) {
            that.$.container.classList.remove('lw-window-resizing-bottom-right', 'lw-window-resizing-top-right',
                'lw-window-resizing-top-left', 'lw-window-resizing-bottom-left', 'lw-window-resizing-top',
                'lw-window-resizing-bottom', 'lw-window-resizing-left', 'lw-window-resizing-right');
        }

        //Set resizing cursor
        if (that.resizeMode !== 'none') {
            const windowCoordinates = that.getBoundingClientRect(),
                isNearTop = event.clientY < windowCoordinates.top + 10 ? true : false,
                isNearBottom = event.clientY > windowCoordinates.bottom - 10 ? true : false,
                isNearRight = event.clientX > windowCoordinates.right - 10 ? true : false,
                isNearLeft = event.clientX < windowCoordinates.left + 10 ? true : false;

            switch (that.resizeMode) {
                case 'none':
                    break;
                case 'both':
                    if (that.resizeIndicator) {
                        if (isNearBottom && isNearRight) {
                            that.$.container.classList.add('lw-window-resizing-bottom-right');
                        }

                        return;
                    }

                    if (isNearLeft || isNearRight) {
                        if (isNearTop) {
                            that.$.container.classList.add('lw-window-resizing-top-' + (isNearLeft ? 'left' : 'right'));
                            return;
                        }
                        else if (isNearBottom) {
                            that.$.container.classList.add('lw-window-resizing-bottom-' + (isNearLeft ? 'left' : 'right'));
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-' + (isNearLeft ? 'left' : 'right'));
                        return;
                    }

                    if (isNearTop || isNearBottom) {
                        if (isNearRight) {
                            that.$.container.classList.add('lw-window-resizing-' + (isNearTop ? 'top-right' : 'bottom-right'));
                            return;
                        }
                        else if (isNearLeft) {
                            that.$.container.classList.add('lw-window-resizing-' + (isNearTop ? 'top-left' : 'bottom-left'));
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-' + (isNearTop ? 'top' : 'bottom'));
                    }

                    break;
                case 'horizontal':
                    if (that.resizeIndicator) {
                        if (isNearBottom && isNearRight) {
                            that.$.container.classList.add('lw-window-resizing-right');
                        }

                        return;
                    }

                    if (isNearLeft) {
                        that.$.container.classList.add('lw-window-resizing-left');
                        return;
                    }

                    if (isNearRight) {
                        that.$.container.classList.add('lw-window-resizing-right');
                    }

                    break;
                case 'vertical':
                    if (that.resizeIndicator) {
                        if (isNearBottom && isNearRight) {
                            that.$.container.classList.add('lw-window-resizing-bottom');
                        }

                        return;
                    }

                    if (isNearTop) {
                        that.$.container.classList.add('lw-window-resizing-top');
                        return;
                    }

                    if (isNearBottom) {
                        that.$.container.classList.add('lw-window-resizing-bottom');
                    }

                    break;
                case 'top':
                    if (isNearTop) {
                        if (that.resizeIndicator && !isNearLeft) {
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-top');
                    }

                    break;
                case 'bottom':
                    if (isNearBottom) {
                        if (that.resizeIndicator && !isNearRight) {
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-bottom');
                    }

                    break;
                case 'left':
                    if (isNearLeft) {
                        if (that.resizeIndicator && !isNearTop) {
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-left');
                    }

                    break;
                case 'right':
                    if (isNearRight) {
                        if (that.resizeIndicator && !isNearBottom) {
                            return;
                        }

                        that.$.container.classList.add('lw-window-resizing-right');
                    }

                    break;
            }
        }
    }

    /**
     * Handles the active state of the Window
     */
    _handleActiveState() {
        const that = this;

        //Remove the active state of all windows on page
        const allWindowsOnPage = document.querySelectorAll('.lw-window');

        for (let w = 0; w < allWindowsOnPage.length; w++) {
            if (!allWindowsOnPage[w].contains(that) && !that.contains(allWindowsOnPage[w])) {
                allWindowsOnPage[w].removeAttribute('active');
                allWindowsOnPage[w].removeAttribute('focus');
            }
        }

        that.setAttribute('active', '');
    }

    /**
     * Creates a resize dummy that's used during resizing ( if liveResize is off ).
     */
    _handleWindowResizeDummy() {
        const that = this;

        if (!that._resizeDummy) {
            that._resizeDummy = document.createElement('div');
            that._resizeDummy.classList.add('lw-window-resize-feedback');
        }

        if (!that.hasAttribute('resized')) {
            if (that._resizeDummy) {
                that._resizeDummy.remove();
            }

            if (!that.liveResize && that._dragDetails.type === 'resize' && that._dragDetails.started) {
                that.style.top = that._dragDetails.top + 'px';
                that.style.left = that._dragDetails.left + 'px';
                that.style.width = that._dragDetails.newWidth + 'px';
                that.style.height = that._dragDetails.newHeight + 'px';
            }

            return;
        }

        if (that._resizeDummy.parentElement || that._resizeDummy.getRootNode().host) {
            return;
        }

        that._resizeDummy.style.width = that.offsetWidth + 'px';
        that._resizeDummy.style.height = that.offsetHeight + 'px';
        that._resizeDummy.style.top = that.offsetTop + 'px';
        that._resizeDummy.style.left = that.offsetLeft + 'px';

        that._windowParent.element.appendChild(that._resizeDummy);
    }

    /**
    *
    * @param {any} side - the side from which the dragging occurs
    * @param {any} event - mouse pointer event
    */
    _resize(side, event) {
        const that = this;
        let size;

        if (!that._dragDetails || (that._dragDetails && that._dragDetails.type === 'drag')) {
            that._setDragDetails('resize');
        }

        if (!that._dragDetails) {
            return;
        }

        that._dragDetails.started = true;

        if (!that.hasAttribute('resized')) {
            that.setAttribute('resized', '');

            //Disables animatied movement
            //that.style.transition = 'none';

            if (that.hasAnimation) {
                that.$.addClass('no-transition');
            }
        }

        if (!that.liveResize) {
            that._handleWindowResizeDummy();
        }

        const width = that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position) ? 'snapWindowWidth' : 'width';

        //document.documentElement.scrollTop is always 0 in MS EDGE but not in IE11!
        switch (side) {
            case 'left': {
                size = typeof (event) === 'object' ? event.pageX - that._dragDetails.x : event;

                if (size > 0) {
                    size = Math.min(size, that._dragDetails[width] - that._dragDetails.minWidth);
                }
                else {
                    size = Math.min(that._dragDetails.maxWidth ? that._dragDetails.maxWidth - that._dragDetails[width] : that._dragDetails.left, Math.abs(size)) * -1;
                }

                that._dragDetails[width] = Math.min(that._dragDetails[width] + that._dragDetails.left - that._windowParent.scrollElement.scrollLeft, that._dragDetails[width] - size);
                that._dragDetails.windowX = Math.max(that._windowParent.scrollElement.scrollLeft, that._dragDetails.windowX + size);

                if (typeof (event) !== 'object') {
                    that._dragDetails[width] = Math.max(that._dragDetails[width], that._dragDetails.minWidth);
                }

                if (that._dragDetails[width] >= that._dragDetails.minWidth) {
                    that._dragDetails.left = that._dragDetails.windowX;
                    that._dragDetails.newWidth = that._dragDetails[width];
                }

                break;
            }
            case 'right': {
                const borderWidth = that._windowParent.element.clientWidth !== that._windowParent.element.offsetWidth ? that._windowParent.borderWidth : 0,
                    width = that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position) ? 'snapWindowWidth' : 'width';

                size = typeof (event) === 'object' ? event.pageX - that._dragDetails.x : event;

                if (size > 0 && that._dragDetails.maxWidth) {
                    size = Math.min(that._dragDetails.maxWidth - that._dragDetails[width], size);
                }

                that._dragDetails[width] = Math.min(that._windowParent.element.clientWidth + that._windowParent.scrollElement.scrollLeft - that._dragDetails.left -
                    borderWidth, Math.max(0, that._dragDetails[width] + size));

                if (typeof (event) !== 'object') {
                    that._dragDetails[width] = Math.max(that._dragDetails[width], that._dragDetails.minWidth);
                }

                that._dragDetails.left = that.offsetLeft;
                that._dragDetails.newWidth = Math.max(that._dragDetails.minWidth, that._dragDetails[width]);
                break;
            }
            case 'top':
                if (that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {
                    that._dragDetails.height = that._dragDetails.snapWindowHeight;
                }

                size = typeof (event) === 'object' ? event.pageY - that._dragDetails.y : event;

                if (size > 0) {
                    size = Math.min(size, that._dragDetails.height - that._dragDetails.minHeight);
                }
                else {
                    size = Math.min(that._dragDetails.maxHeight ? that._dragDetails.maxHeight - that._dragDetails.height : that._dragDetails.top, Math.abs(size)) * -1;
                }

                that._dragDetails.snapWindowHeight = that._dragDetails.height =
                    Math.min(that._dragDetails.height + that._dragDetails.top - that._windowParent.scrollElement.scrollTop, that._dragDetails.height - size);

                that._dragDetails.windowY = Math.max(that._windowParent.scrollElement.scrollTop, that._dragDetails.windowY + size);

                if (typeof (event) !== 'object') {
                    that._dragDetails.snapWindowHeight = that._dragDetails.height = Math.max(that._dragDetails.height, that._dragDetails.minHeight);
                }

                if (that._dragDetails.height >= that._dragDetails.minHeight) {
                    that._dragDetails.top = that._dragDetails.windowY;
                    that._dragDetails.newHeight = that._dragDetails.height;
                }

                that._dragDetails.newWidth = Math.max(that._dragDetails[width], that._dragDetails.newWidth);
                break;
            case 'bottom':
                if (that._snapDummy && that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {
                    that._dragDetails.height = that._dragDetails.snapWindowHeight;
                }

                size = typeof (event) === 'object' ? event.pageY - that._dragDetails.y : event;

                if (size > 0 && that._dragDetails.maxHeight) {
                    size = Math.min(that._dragDetails.maxHeight - that._dragDetails.height, size);
                }

                that._dragDetails.snapWindowHeight = that._dragDetails.height =
                    Math.min(that._windowParent.element.clientHeight + that._windowParent.scrollElement.scrollTop - that._dragDetails.top -
                        that._windowParent.borderWidth, Math.max(0, that._dragDetails.height + size));

                if (typeof (event) !== 'object') {
                    that._dragDetails.snapWindowHeight = that._dragDetails.height = Math.max(that._dragDetails.height, that._dragDetails.minHeight);
                }

                that._dragDetails.newHeight = Math.max(that._dragDetails.minHeight, that._dragDetails.height);
                that._dragDetails.newWidth = Math.max(that._dragDetails[width], that._dragDetails.newWidth);
                break;
            case 'bottomLeftCorner':
                that._resize('bottom', event);
                that._resize('left', event);
                break;
            case 'bottomRightCorner':
                that._resize('bottom', event);
                that._resize('right', event);
                break;
            case 'topLeftCorner':
                that._resize('top', event);
                that._resize('left', event);
                break;
            case 'topRightCorner':
                that._resize('top', event);
                that._resize('right', event);
                break;
        }

        const resizeTarget = that.liveResize ? that : that._resizeDummy;

        that._dragDetails.newHeight = Math.max(that._dragDetails.snapWindowHeight, that._dragDetails.newHeight);

        resizeTarget.style.top = that._dragDetails.top + 'px';
        resizeTarget.style.left = that._dragDetails.left + 'px';
        resizeTarget.style.width = that._dragDetails.newWidth + 'px';
        resizeTarget.style.height = that._dragDetails.newHeight + 'px';
    }

    /**
     * Restore the window from minimization
     */
    _restoreFromMinimization() {
        const that = this;

        that.minimized = false;
        that.style.width = that.style.height = that.style.top = that.style.left = '';

        //Re-arrange the rest of the minimized windows
        that._refreshMinimizedWindowsPosition();
    }

    /**
     * Recalculates the position of the minimized windows on the page
     */
    _refreshMinimizedWindowsPosition() {
        const that = this;

        const minimizedWindows = that._getAllMinimizedWindows();

        if (minimizedWindows.length === 0) {
            return;
        }

        //Some offset from the edge of the window
        minimizedWindows[0].style.left = '5px';

        let lastWindow;

        //Using style.left instead of offsetLeft to ignore the transiton of the animation if enabled
        for (let i = 1; i < minimizedWindows.length; i++) {
            if (parseFloat(minimizedWindows[i - 1].style.left) + minimizedWindows[i - 1].offsetWidth + minimizedWindows[i].offsetWidth + 10 <
                that._windowParent.element.clientWidth) {

                minimizedWindows[i].style.left = (parseFloat(minimizedWindows[i - 1].style.left) + minimizedWindows[i - 1].offsetWidth + 5) + 'px';
                minimizedWindows[i].style.top = minimizedWindows[i - 1].offsetTop + 'px';
                lastWindow = minimizedWindows[i];
            }
            else {
                minimizedWindows[i].style.left = parseFloat(lastWindow.style.left) + 'px';
                minimizedWindows[i].style.top = lastWindow.offsetTop + 'px';
            }
        }
    }

    /**
     * Set the visibility of the Header Buttons
     */
    _setHeaderButtons() {
        const that = this,
            buttons = that.headerButtons,
            currentButtons = that.$.buttonsContainer.children,
            isAlreadyCreated = function (name) {
                const button = that.$.buttonsContainer.getElementsByClassName('lw-' + (name + '').split(/(?=[A-Z])/).join('-').toLowerCase() + '-button')[0];

                if (button) {
                    button.classList.remove('lw-hidden');
                }

                return button;
            };

        for (let b = 0; b < currentButtons.length; b++) {
            currentButtons[b].classList.add('lw-hidden');
        }

        //Create a new custom header button
        if (buttons.length > 0) {

            for (let i = 0; i < buttons.length; i++) {
                let button = isAlreadyCreated(buttons[i]);

                if (!button) {
                    const buttonName = (buttons[i] + '').split(/(?=[A-Z])/);

                    button = document.createElement('button');
                    button.setAttribute('aria-label', buttonName.map(name => name.slice(0, 1).toUpperCase() + name.slice(1)).join(' '));
                    button.classList.add('lw-' + buttonName.join('-').toLowerCase() + '-button', 'lw-button', 'lw-element');
                }

                that.$.buttonsContainer.insertBefore(button, that.$.buttonsContainer.firstElementChild);
            }
        }
    }

    /**
     * Creates the Drag details for window dragging and resizing
     * @param {any} type - type of event
     * @param {any} event - event details (optional)
     */
    _setDragDetails(type, event) {
        const that = this;

        if (!that._dragDetails) {
            that._dragDetails = {};
        }

        if (that._dragDetails.minWidth === undefined || that._dragDetails.minHeight === undefined ||
            that._dragDetails.maxWidth === undefined || that._dragDetails.maxHeight === undefined) {
            const computedStyle = getComputedStyle(that);

            that._dragDetails.minWidth = parseFloat(computedStyle.getPropertyValue('min-width')) || 0;
            that._dragDetails.minHeight = parseFloat(computedStyle.getPropertyValue('min-height')) || 0;
            that._dragDetails.maxWidth = parseFloat(computedStyle.getPropertyValue('max-width')) || 0;
            that._dragDetails.maxHeight = parseFloat(computedStyle.getPropertyValue('max-height')) || 0;
        }

        that._dragDetails.windowX = that.offsetLeft;
        that._dragDetails.windowY = that.offsetTop;

        const elementStyle = that.getBoundingClientRect();

        if (!that._snapDummy || !that.$.hasClass('lw-window-snapped-' + that._snapDummy._position)) {

            // Left/Top of the direct parent of the element.
            const parentStyle = that.parentElement === document.body ?
                document.documentElement.getBoundingClientRect() : (that.parentElement ? that.parentElement.getBoundingClientRect() : document.documentElement.getBoundingClientRect());
            const scrollX = window.scrollX || window.pageXOffset,
                scrollY = window.scrollY || window.pageYOffset;

            that._windowParent.offsetLeft = parentStyle.left + scrollX;
            that._windowParent.offsetTop = parentStyle.top + scrollY;

            if (event && typeof event === 'object') {
                that._dragDetails.offsetX = event.clientX - elementStyle.left;
                that._dragDetails.offsetY = event.clientY - elementStyle.top;
            }

            if (!that.collapsed) {
                if (that.hasAnimation && type === 'minimize') {
                    that._dragDetails.width = that._dragDetails.width ? that._dragDetails.width : that.offsetWidth;
                    that._dragDetails.height = that._dragDetails.height ? that._dragDetails.height : that.offsetHeight;
                }
                else {
                    that._dragDetails.width = that.offsetWidth;
                    that._dragDetails.height = that.offsetHeight;
                }

                if (that.style.width || that.style.height) {
                    that._dragDetails.resized = true;
                }
            }
        }
        else if (that.headerPosition === 'right' && that.collapsed) {
            that._dragDetails.offsetX = elementStyle.left + that.offsetWidth - event.clientX;
        }

        if (type === 'minimize' || !type) {
            return;
        }

        that._dragDetails.type = type;
        that._dragDetails.started = true;
        that._dragDetails.snapWindowWidth = that.offsetWidth;
        that._dragDetails.snapWindowHeight = that.offsetHeight;

        if (event && typeof (event) === 'object') {
            that._dragDetails.x = event.pageX;
            that._dragDetails.y = event.pageY;
        }
        else {
            that._dragDetails.x = that.offsetLeft;
            that._dragDetails.y = that.offsetTop;
        }

        if (type === 'resize') {
            if (that.resizeMode === 'none') {
                delete that._dragDetails;
                return;
            }

            that._dragDetails.top = that.offsetTop;
            that._dragDetails.left = that.offsetLeft;
            that._dragDetails.newWidth = that._dragDetails.width;
            that._dragDetails.newHeight = that._dragDetails.height;

            if (that.$container.hasClass('lw-window-resizing-right')) {
                that._dragDetails.side = 'right';
            }
            else if (that.$container.hasClass('lw-window-resizing-left')) {
                that._dragDetails.side = 'left';
            }
            else if (that.$container.hasClass('lw-window-resizing-top')) {
                that._dragDetails.side = 'top';
            }
            else if (that.$container.hasClass('lw-window-resizing-bottom')) {
                that._dragDetails.side = 'bottom';
            }
            else if (that.$container.hasClass('lw-window-resizing-top-left')) {
                that._dragDetails.side = 'topLeftCorner';
            }
            else if (that.$container.hasClass('lw-window-resizing-bottom-left')) {
                that._dragDetails.side = 'bottomLeftCorner';
            }
            else if (that.$container.hasClass('lw-window-resizing-top-right')) {
                that._dragDetails.side = 'topRightCorner';
            }
            else if (that.$container.hasClass('lw-window-resizing-bottom-right')) {
                that._dragDetails.side = 'bottomRightCorner';
            }
        }
    }

    /**
     * Set the window parent.
     */
    _setElementParent(id) {
        const that = this;

        that._windowParent.element = undefined;

        if (that._windowParent.parent &&
            !that._windowParent.parent.querySelectorAll('lw-window, lw-dialog-window, lw-progress-window, lw-wait-window, ' +
                'lw-alert-window, lw-prompt-window, lw-multiline-prompt-window')) {
            that._windowParent.parent.style.position = '';
        }

        if (id instanceof HTMLElement) {
            that._windowParent.element = id;
        }
        else if (typeof (id) === 'string') {
            that._windowParent.element = id === 'body' ? that.getShadowRootOrBody() : document.getElementById(id);
        }

        if (!that._windowParent.element) {
            if (that._windowParent.initialParent) {
                that._windowParent.element = that._windowParent.initialParent.parentElement ? that._windowParent.initialParent : that.getShadowRootOrBody();
            }
            else {
                that._windowParent.element = that.getShadowRootOrBody();
            }
        }

        if (that.parentElement !== that._windowParent.element) {
            that._windowParent.element.appendChild(that);
        }

        if (that._windowParent.element === that.getShadowRootOrBody()) {
            that._windowParent.element = document.documentElement;
            that._windowParent.scrollElement = document.scrollingElement;
            //Neccessary because EDGE and Safari have a bug

            that._windowParent.parent = that.getShadowRootOrBody();
            that._windowParent.borderWidth = 0;
        }
        else {
            //Used in some rare cases where ShadowDOM is enabled and the parent is a Window that is not completed yet
            if (that.parentElement instanceof LW.Window && !that.parentElement.isCompleted) {
                that.parentElement.whenRendered(function () {
                    that.parentElement.appendChild(that);
                    that._setElementParent(that.windowParent)
                });
                return;
            }

            //Specific case for lwWindow nesting
            if (that._windowParent.element instanceof LW.Window) {
                that._windowParent.element = that._windowParent.element.$.content;
            }

            const computedStyle = getComputedStyle(that.parentElement),
                windowParentPosition = computedStyle.getPropertyValue('position');

            that._windowParent.borderWidth = 2 * parseInt(computedStyle.getPropertyValue('border-width') || 0);
            that._windowParent.parent = that.parentElement;
            that._windowParent.scrollElement = that._windowParent.element;

            if (windowParentPosition === 'static') {
                that.parentElement.style.position = 'relative';
            }
        }

        that._setModal();

        if (that.style.left && that.offsetLeft > that._windowParent.scrollElement.scrollWidth) {
            that.style.left = that._windowParent.scrollElement.scrollWidth - that.offsetWidth + 'px';
        }

        if (that.style.top && that.offsetTop > that._windowParent.scrollElement.scrollHeight) {
            that.style.top = that._windowParent.scrollElement.scrollHeight - that.offsetHeight + 'px';
        }
    }

    /**
     * Enable/Disable modal mode
     */
    _setModal() {
        const that = this;

        delete that._changingFocus;

        if (!that._windowParent.element) {
            return;
        }

        if (!that.modal) {
            if (that._modal && that._modal.parentElement) {
                that._modal.parentElement.removeChild(that._modal);
                delete that._modal;
            }

            return;
        }

        if (!that._modal) {
            that._modal = document.createElement('div');
            that._modal.classList.add('lw-modal');
        }

        if (that._windowParent.parent !== document.body) {
            that._modal.setAttribute('nested-modal', '');
        }
        else {
            that._modal.removeAttribute('nested-modal');
        }

        that._modal._window = that;


        if (that.opened && !that._modal.parentElement) {
            const zIndex = parseInt(getComputedStyle(that).getPropertyValue('z-index'));

            if (!isNaN(zIndex)) {
                that._modal.style.zIndex = zIndex - 1;
            }

            that.parentElement.insertBefore(that._modal, that);
        }
        else if (that._modal.parentElement) {
            that._modal.parentElement.removeChild(that._modal);
        }
    }
});

/**
* lwDialogWindow
*/
LW('lw-dialog-window', class DialogWindow extends LW.Window {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'cancelLabel': {
                value: 'Cancel',
                type: 'string'
            },
            'confirmLabel': {
                value: 'Ok',
                type: 'string'
            },
            'disableSnap': {
                value: true,
                readOnly: true,
                type: 'boolean'
            },
            'headerButtons': {
                value: ['close'],
                type: 'array'
            },
            'modal': {
                value: true,
                readOnly: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            }
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'footer.click': '_footerClickHandler'
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="pinButton" class="lw-pin-button" aria-label="Pin"></button>
                                <button id="collapseButton" class="lw-button lw-element lw-collapse-button" aria-label="Collapse"></button>
                                <button id="minimizeButton" class="lw-button lw-element lw-minimize-button" aria-label="Minimize"></button>
                                <button id="maximizeButton" class="lw-button lw-element lw-maximize-button" aria-label="Maximize"></button>
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content">
                            <content></content>
                        </div>
                        <div id="footer" class="lw-footer">
                            <button id="confirmButton" class="lw-button lw-element lw-confirm-button">[[confirmLabel]]</button>
                            <button id="cancelButton" class="lw-button lw-element lw-cancel-button">[[cancelLabel]]</button>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * Create Element
     */
    _createElement() {
        const that = this;

        that.setAttribute('role', 'alertdialog');
        that.setAttribute('aria-describedby', that.$.content.id);
    }

    /**
     * Footer Click Event Handler
     * @param {any} event
     */
    _footerClickHandler(event) {
        const that = this,
            target = event.target;

        if (target.closest('.lw-confirm-button')) {
            that.$.fireEvent('confirm');
        }
        else if (target.closest('.lw-cancel-button')) {
            that.$.fireEvent('cancel');
        }
    }

    /**
     * Key Down event handler
     * @param {any} event - event details
     */
    _keyDownHandler(event) {
        const that = this;

        delete that._changingFocus;

        if (that.disabled || ((that.hasAttribute('dragged') || that.hasAttribute('resized')) && that._mouseManipulation)) {
            return;
        }

        event.stopPropagation();

        //Distance hardcoded to 10px
        const distance = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 10 : -10,
            activeElement = that.enableShadowDOM && that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement;

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight': {
                if (that.minimized || activeElement !== that) {
                    return;
                }

                const direction = event.key.indexOf('Right') > -1 || event.key.indexOf('Left') > -1;

                event.preventDefault();

                if (!direction && event.altKey) {
                    event.key === 'ArrowUp' ? that.maximize() : that.restore();
                    return;
                }

                that.$.addClass('no-transition');

                if (that.maximized) {
                    return;
                }

                if (event.ctrlKey && that.resizeMode !== 'none') {
                    if (that.hasAttribute('dragged')) {
                        that._cancelDragging(event);
                    }

                    if (!that.hasAttribute('resized')) {
                        that.$.fireEvent('resizeStart', { 'position': { x: event.pageX, y: event.pageY } });
                    }

                    that._resize(direction ? 'right' : 'bottom', distance);
                    return;
                }

                if (!that.pinned) {
                    if (!that.hasAttribute('dragged')) {
                        that.setAttribute('dragged', '');
                        that.$.fireEvent('dragStart', { left: event.pageX, top: event.pageY });
                    }

                    that._drag(distance, direction ? 'horizontal' : 'vertical');
                }

                //that.style.transition = '';
                that.$.removeClass('no-transition');
                break;
            }
            case 'Escape':
                if (that.headerButtons.indexOf('close') > -1 && activeElement === that) {
                    that.close();
                }
                break;
            case 'Tab':
                if (that.opened && that.modal) {
                    that._changingFocus = true;
                }

                break;
            case 'Enter':
            case ' ':
                {
                    let target;

                    if (that.shadowRoot || that.isInShadowDOM) {
                        target = event.composedPath()[0];
                        that._buttonPressed = target.getRootNode().host;
                    }
                    else {
                        target = event.target.closest && event.target.closest('.lw-button');
                        that._buttonPressed = target;
                    }

                    if (!target) {
                        return;
                    }

                    that._isWindowButton(target);
                    delete that._buttonPressed;
                    break;
                }
        }
    }
});

LW('lw-alert-window', class AlertWindow extends LW.DialogWindow {
    /**
    * Element's properties
    */
    static get properties() {
        return {
            'headerButtons': {
                value: [],
                type: 'array'
            }
        }
    }

    /**
     * Create Element
     */
    _createElement() {
        const that = this;

        that.setAttribute('role', 'alertdialog');
        that.setAttribute('aria-describedby', that.$.content.id);
    }
});

LW('lw-prompt-window', class PromptWindow extends LW.DialogWindow {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'autoComplete': {
                allowedValues: ['none', 'manual', 'auto', 'inline'],
                type: 'string',
                value: 'manual'
            },
            'confirmLabel': {
                value: 'Ok',
                type: 'string'
            },
            'cancelLabel': {
                value: 'Cancel',
                type: 'string'
            },
            'disableSnap': {
                value: true,
                readOnly: true,
                type: 'boolean'
            },
            'displayMode': {
                value: 'default',
                allowedValues: ['default', 'escaped'],
                type: 'string'
            },
            'headerButtons': {
                value: ['close'],
                type: 'array'
            },
            'form': {
                value: '',
                type: 'string'
            },
            'hint': {
                value: null,
                type: 'any?'
            },
            'maxLength': {
                value: null,
                type: 'number?'
            },
            'minLength': {
                value: 2,
                type: 'number'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'missingReference': '{{elementType}}: Missing reference to {{files}}.'
                    }
                },
                type: 'object'
            },
            'modal': {
                value: true,
                readOnly: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'name': {
                value: '',
                type: 'string'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'promptLabel': {
                value: '',
                type: 'string?'
            },
            'required': {
                value: false,
                type: 'boolean'
            },
            'requiredMessage': {
                value: '',
                type: 'string'
            },
            'selectAllOnFocus': {
                value: false,
                type: 'boolean'
            },
            'value': {
                value: '',
                type: 'string'
            }
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content">
                            <content></content>
                            <lw-text-box id="textBox"
                                animation="[[animation]]"
                                auto-complete="[[autoComplete]]"
                                max-length="[[maxLength]]"
                                value="{{value}}"
                                form="[[form]]"
                                label="[[promptLabel]]"
                                hint="[[hint]]"
                                display-mode="[[displayMode]]"
                                max-length="[[maxLength]]"
                                placeholder="[[placeholder]]"
                                required="[[required]]"
                                required-message="[[requiredMessage]]"
                                select-all-on-focus="[[selectAllOnFocus]]"
                                theme="[[theme]]"
                                right-to-left="[[rightToLeft]]">
                            </lw-text-box>
                        </div>
                        <div id="footer" class="lw-footer">
                            <button id="confirmButton" class="lw-button lw-element lw-confirm-button flat">[[confirmLabel]]</button>
                            <button id="cancelButton" class="lw-button lw-element lw-cancel-button flat">[[cancelLabel]]</button>
                        </div>
                    </div>
                </div>`;
    }

    /**
* Element's event listeners.
*/
    static get listeners() {
        return {
            'footer.click': '_footerClickHandler'
        }
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.TextBox': 'lw.textbox.js'
        }
    }

    /**
     * Footer Click Event Handler
     * @param {any} event
     */
    _footerClickHandler(event) {
        const that = this,
            target = event.target;

        if (target.closest('.lw-confirm-button')) {
            that.$.fireEvent('confirm', { value: that.$.textBox.value });
        }
        else if (target.closest('.lw-cancel-button')) {
            that.$.fireEvent('cancel', { value: that.$.textBox.value });
        }
    }

    /**
     * Key Down event handler
     * @param {any} event - event details
     */
    _keyDownHandler(event) {
        const that = this;

        delete that._changingFocus;

        function endDrag() {
            if (that._dragDetails) {
                that._dragDetails.started = false;
            }

            that.$.removeClass('no-transition');
        }

        if (that.disabled || (that._dragDetails && that._dragDetails.started)) {
            return;
        }

        event.stopPropagation();

        //Distance hardcoded to 10px
        const distance = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 10 : -10,
            activeElement = that.enableShadowDOM && that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement

        //that.style.transition = '';
        that.$.removeClass('no-transition');

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();

                if (event.altKey) {
                    event.key === 'ArrowUp' ? that.maximize() : that.restore();
                    endDrag();
                    return;
                }

                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('bottom', distance);
                    endDrag();
                    return;
                }

                that._drag(distance, 'vertical');
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();
                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('right', distance);
                    endDrag();
                    return;
                }

                that._drag(distance, 'horizontal');
                that.$.removeClass('no-transition');
                break;
            case 'Escape':
                if (that.headerButtons.indexOf('close') > -1 && activeElement === that)
                    that.close();
                break;
            case 'Tab':
                if (that.opened && that.modal) {
                    that._changingFocus = true;
                }

                break;
            case 'Enter':
            case ' ':
                {
                    let target;

                    if (that.shadowRoot || that.isInShadowDOM) {
                        target = event.composedPath()[0];
                        that._buttonPressed = target.getRootNode().host;
                    }
                    else {
                        target = event.target.closest && event.target.closest('.lw-button');
                        that._buttonPressed = target;
                    }

                    if (!target) {
                        return;
                    }

                    that._isWindowButton(target);
                    delete that._buttonPressed;
                    break;
                }
        }

        endDrag();
    }
});

LW('lw-multiline-prompt-window', class MultiLinePromptWindow extends LW.PromptWindow {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'autoCapitalize': {
                value: 'none',
                allowedValues: ['none', 'words', 'characters'],
                type: 'string'
            },
            'autoExpand': {
                value: false,
                type: 'boolean'
            },
            'headerButtons': {
                value: ['close'],
                type: 'array'
            },
            'horizontalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'modal': {
                value: true,
                readOnly: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'selectionDirection': {
                value: 'none',
                allowedValues: ['forward', 'backward', 'none'],
                type: 'string'
            },
            'selectionEnd': {
                value: 0,
                reflectToAttribute: false,
                type: 'number'
            },
            'selectionStart': {
                value: 0,
                reflectToAttribute: false,
                type: 'number'
            },
            'spellCheck': {
                value: false,
                type: 'boolean'
            },
            'verticalScrollBarVisibility': {
                type: 'string',
                value: 'auto',
                allowedValues: ['auto', 'disabled', 'hidden', 'visible']
            },
            'wrap': {
                value: 'soft',
                allowedValues: ['hard', 'soft', 'off'],
                type: 'string'
            }
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content">
                            <content></content>
                           <lw-multiline-text-box id="textBox"
                                animation="[[animation]]"
                                horizontal-scroll-bar-visibility= "[[horizontalScrollBarVisibility]]"
                                vertical-scroll-bar-visibility= "[[verticalScrollBarVisibility]]"
                                auto-capitalize="[[autoCapitalize]]"
                                auto-expand = "[[autoExpand]]"
                                selection-direction= "[[selectionDirection]]"
                                selection-end= "[[selectionEnd]]"
                                selection-start="[[selectionStart]]"
                                spell-check= "[[spellCheck]]"
                                wrap="[[wrap]]"
                                max-length="[[maxLength]]"
                                value="{{value}}"
                                form="[[form]]"
                                label="[[promptLabel]]"
                                hint="[[hint]]"
                                display-mode="[[displayMode]]"
                                max-length="[[maxLength]]"
                                placeholder="[[placeholder]]"
                                required="[[required]]"
                                required-message="[[requiredMessage]]"
                                select-all-on-focus="[[selectAllOnFocus]]"
                                theme="[[theme]]"
                                right-to-left="[[rightToLeft]]">
                           </lw-multiline-text-box>
                        </div>
                        <div id="footer" class="lw-footer">
                            <button id="confirmButton" class="lw-button lw-element lw-confirm-button flat">[[confirmLabel]]</button>
                            <button id="cancelButton" class="lw-button lw-element lw-cancel-button flat">[[cancelLabel]]</button>
                        </div>
                    </div>
                </div>`;
    }

    /**
   * Element's event listeners.
   */
    static get listeners() {
        return {
            'footer.click': '_footerClickHandler'
        }
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.MultilineTextBox': 'lw.multilinetextbox.js'
        }
    }

    /**
    * Footer Click Event Handler
    * @param {any} event
    */
    _footerClickHandler(event) {
        const that = this,
            target = event.target;

        if (target.closest('.lw-confirm-button')) {
            that.$.fireEvent('confirm', { value: that.$.textBox.value });
        }
        else if (target.closest('.lw-cancel-button')) {
            that.$.fireEvent('cancel', { value: that.$.textBox.value });
        }
    }
});

LW('lw-progress-window', class ProgressWindow extends LW.Window {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'completeLabel': {
                value: 'Continue',
                type: 'string'
            },
            'disableSnap': {
                value: true,
                readOnly: true,
                type: 'boolean'
            },
            'headerButtons': {
                value: ['close'],
                type: 'array'
            },
            'indeterminate': {
                value: false,
                type: 'boolean'
            },
            'inverted': {
                value: false,
                type: 'boolean'
            },
            'formatFunction': {
                value: null,
                type: 'function'
            },
            'max': {
                value: 100,
                type: 'number'
            },
            'modal': {
                value: true,
                readOnly: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'min': {
                value: 0,
                type: 'number'
            },
            'showProgressValue': {
                value: false,
                type: 'boolean'
            },
            'value': {
                value: 0,
                type: 'number?'
            }
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content" inner-h-t-m-l="[[innerHTML]]">
                            <content></content>
                        </div>
                        <div id="footer" class="lw-footer">
                            <lw-progress-bar id="progressBar"
                                animation="[[animation]]"
                                min="[[min]]"
                                max="[[max]]"
                                indeterminate="[[inditerminate]]"
                                inverted="[[inverted]]"
                                format-function="[[formatFunction]]"
                                show-progress-value="[[showProgressValue]]"
                                theme="[[theme]]"
                                right-to-left="[[rightToLeft]]"
                                value="{{value}}">
                            </lw-progress-bar>
                            <button id="completeButton" class="lw-button lw-element lw-complete-button lw-visibility-hidden">[[completeLabel]]</button>
                        </div>
                    </div>
                </div>`;
    }

    /** Checks for missing modules.
        */
    static get requires() {
        return {
            'LW.ProgressBar': 'lw.progressbar.js'
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

        switch (propertyName) {
            case 'value':
                that._handleCompletion();
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    /**
     * Create Element method
     */
    _createElement() {
        const that = this;

        that.setAttribute('role', 'dialog');
        that._handleCompletion();
    }

    /**
     * Show the complete button when value === max
     */
    _handleCompletion() {
        const that = this;

        if (that.$.completeButton) {
            if (that.value >= that.max) {
                that.$completeButton.removeClass('lw-visibility-hidden');
                that.$progressBar.addClass('lw-visibility-hidden');
            }
            else {
                that.$completeButton.addClass('lw-visibility-hidden');
                that.$progressBar.removeClass('lw-visibility-hidden');
            }
        }
    }

    /**
     * Key Down event handler
     * @param {any} event - event details
     */
    _keyDownHandler(event) {
        const that = this;

        delete that._changingFocus;

        function endDrag() {
            if (that._dragDetails) {
                that._dragDetails.started = false;
            }

            that.$.removeClass('no-transition');
        }

        if (that.disabled || (that._dragDetails && that._dragDetails.started)) {
            return;
        }

        event.stopPropagation();

        //Distance hardcoded to 10px
        const distance = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 10 : -10,
            activeElement = that.enableShadowDOM && that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement;

        //that.style.transition = '';
        that.$.removeClass('no-transition');

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();
                if (event.altKey) {
                    event.key === 'ArrowUp' ? that.maximize() : that.restore();
                    endDrag()
                    return;
                }

                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('bottom', distance);
                    endDrag()
                    return;
                }

                that._drag(distance, 'vertical');
                that.$.removeClass('no-transition');
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();

                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('right', distance);
                    endDrag()
                    return;
                }

                that._drag(distance, 'horizontal');
                that.$.removeClass('no-transition');
                break;
            case 'Escape':
                if (that.headerButtons.indexOf('close') > -1 && activeElement === that) {
                    that.close();
                }

                break;
            case 'Tab':
                if (that.opened && that.modal) {
                    that._changingFocus = true;
                }

                break;
            case 'Enter':
            case ' ':
                {
                    let target;

                    if (that.shadowRoot || that.isInShadowDOM) {
                        target = event.composedPath()[0];
                        that._buttonPressed = target.getRootNode().host;
                    }
                    else {
                        target = event.target.closest && event.target.closest('.lw-button');
                        that._buttonPressed = target;
                    }

                    if (!target) {
                        return;
                    }

                    that._isWindowButton(target);
                    delete that._buttonPressed;
                    break;
                }
        }

        endDrag()
    }
});

LW('lw-tabs-window', class TabsWindow extends LW.Window {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'disableSnap': {
                value: true,
                readOnly: true,
                type: 'boolean'
            },
            //Property used by DockingLayouts only
            'dropPosition': {
                //allowedValues: ['all', 'top', 'left', 'right', 'bottom', 'center', 'header', 'none'],
                value: ['all'],
                type: 'array'
            },
            'addNewTab': {
                value: false,
                type: 'boolean'
            },
            'allowToggle': {
                value: false,
                type: 'boolean'
            },
            'autoHide': {
                value: false,
                type: 'boolean'
            },
            'autoHideWindow': {
                value: null,
                type: 'any'
            },
            'dataSource': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            },
            'tabCloseButtonMode': {
                value: 'default',
                allowedValues: ['default', 'selected'],
                type: 'string'
            },
            'tabCloseButtons': {
                value: false,
                type: 'boolean'
            },
            'messages': {
                value: {
                    'en': {
                        'ambiguousIndexes': 'lw-tabs: Initially set lw-tab-item indexes are ambiguous and are ignored in favour of the HTML structure.',
                        'detailsObjectRequired': 'lw-tabs: The method "insert" requires a details Object to be passed as a second argument.',
                        'invalidIndex': 'lw-tabs: "{{method}}" method accepts an index of type number.',
                        'referenceNodeNotChild': 'lw-tabs: Passed {{argument}} is not part of this lw-tabs element.',
                        'tabItemRequired': 'lw-tabs: The method "{{method}}" requires a "lw-tab-item" element to be passed as an argument.'
                    }
                },
                type: 'object',
                extend: true
            },
            'tabOverflow': {
                value: 'auto',
                allowedValues: ['auto', 'hidden', 'scroll'],
                type: 'string'
            },
            'tabReorder': {
                value: false,
                type: 'boolean'
            },
            'tabResize': {
                value: false,
                type: 'boolean'
            },
            'tabScrollButtonsPosition': {
                value: 'both',
                allowedValues: ['near', 'far', 'both'],
                type: 'string'
            },
            'selectedIndex': {
                value: null,
                type: 'number?'
            },
            'selectionMode': {
                value: 'click',
                allowedValues: ['click', 'dblclick', 'mouseenter', 'none'],
                type: 'string'
            },
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
                type: 'any'
            },
            'min': {
                value: '',
                type: 'any'
            },
            'size': {
                value: '',
                type: 'any'
            },
            'tabLayout': {
                value: 'scroll',
                allowedValues: ['scroll', 'dropdown', 'wrap', 'shrink'],
                type: 'string',
                defaultReflectToAttribute: true
            },
            'tabPosition': {
                value: 'top',
                allowedValues: ['top', 'bottom', 'left', 'right', 'hidden'],
                type: 'string'
            },
            'tabTextOrientation': {
                value: 'horizontal',
                allowedValues: ['horizontal', 'vertical'],
                type: 'string'
            },
            //Property used by DockingLayouts only
            'layout': {
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
            'tabsElement.blur': '_tabsFocusHandler',
            'tabsElement.change': '_tabsChangeHandler',
            'tabsElement.focus': '_tabsFocusHandler',
            'autoHideWindow.close': '_autoHideWindowCloseHandler',
            'autoHideWindow.open': '_autoHideWindowOpenHandler'
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="minimizeButton" class="lw-button lw-element lw-minimize-button" aria-label="Minimize"></button>
                                <button id="maximizeButton" class="lw-button lw-element lw-maximize-button" aria-label="Maximize"></button>
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div id="contentSection" class="lw-content">
                           <lw-tabs id="tabsElement"
                                animation="[[animation]]"
                                add-new-tab="[[addNewTab]]"
                                allow-toggle="[[allowToggle]]"
                                close-button-mode="[[tabCloseButtonMode]]"
                                close-buttons="[[tabCloseButtons]]"
                                disabled="[[disabled]]"
                                overflow="[[tabOverflow]]"
                                reorder="[[tabReorder]]"
                                resize="[[tabResize]]"
                                scroll-buttons-position="[[tabScrollButtonsPosition]]"
                                selected-index="{{selectedIndex}}"
                                selection-mode="[[selectionMode]]"
                                tab-layout="[[tabLayout]]"
                                tab-position="[[tabPosition]]"
                                tab-text-orientation="[[tabTextOrientation]]"
                                theme="[[theme]]"
                                right-to-left="[[rightToLeft]]">
                                <content></content>
                            </lw-tabs>
                        </div>
                        <div id="footer" class="lw-footer lw-hidden"></div>
                    </div>
                </div>`;
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.Tabs': 'lw.tabs.js'
        }
    }

    /**
     * Appens a Tab item to the Window
     * @param {any} node
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

        if (!(node instanceof LW.TabItem)) {
            that.error(that.localize('tabItemRequired', { method: 'removeChild' }));
        }

        that.$.tabsElement.appendChild(node);
    }

    /**
     * Insert Tab items into the Window
     * @param {any} index
     * @param {any} details
     */
    insert(index, details) {
        this.$.tabsElement.insert(index, details);
    }

    /**
     * Insert a Tab item before another item inside the Window
     * @param {any} node
     */
    insertBefore(node, referenceNode) {
        this.$.tabsElement.insertBefore(node, referenceNode);
    }

    /**
     * Removes a Tab item from the Window
     */
    removeAt(index) {
        this.$.tabsElement.removeAt(index);
    }

    /**
     * Removes a Tab item from the Window
     * @param {any} node
     */
    removeChild(node) {
        const that = this;

        if (!that.isCompleted || node instanceof HTMLElement && node.classList.contains('lw-resize-trigger-container')) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.removeChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        if (!(node instanceof LW.TabItem)) {
            that.error(that.localize('tabItemRequired', { method: 'removeChild' }));
        }

        if (!(that.shadowRoot || that).contains(node)) {
            that.error(that.localize('referenceNodeNotChild', { argument: 'node' }));
        }

        that.$.tabsElement.removeChild(node);
    }

    /**
     * Refreshes the Header Section of the Tabs element inside the Window
     */
    refreshTabHeader() {
        const that = this;

        if (that.$.tabsElement && that.$.tabsElement.isCompleted) {
            that.$.tabsElement.refreshTabHeader();
        }
    }

    /**
     * Refreshes the Tabs element/ Tabs resize/styleChanged handler
     */
    refreshTabs() {
        const that = this;

        if (that.$.tabsElement && that.$.tabsElement.isCompleted) {
            that.$.tabsElement._applyTabOverflow();
        }
    }

    /**
     * Selects a Tab item inside the Window
     * @param {any} index
     */
    select(index) {
        this.$.tabsElement.select(index);
    }

    /**
     * Update Tab Item element method
     * @param {any} index
     * @param {any} label
     * @param {any} content
     */
    update(index, label, content) {
        this.$.tabsElement.update(index, label, content);
    }

    /**
     * Returns all tab items
     */
    get items() {
        const that = this;

        if (!that.isCompleted || !that.$.tabsElement) {
            return;
        }

        return this.$.tabsElement._tabs;
    }

    /**
     * Returns all tab labels
     */
    get itemLabels() {
        const that = this;

        if (!that.$) {
            return;
        }

        return this.$.tabsElement._tabLabelContainers;
    }

    /**
    * Returns a list of all sibling TabsWindow components IF the element is docked inside a DockingLaoyut
    */
    get siblings() {
        const that = this;
        let siblings = [];

        if (!that.isCompleted) {
            return siblings;
        }

        const closestSplitter = that.closest('lw-splitter');

        if (!closestSplitter || !closestSplitter.closest('lw-docking-layout')) {
            return siblings;
        }

        const items = closestSplitter._items;

        if (!items || !items.length) {
            return siblings;
        }

        for (let s = 0; s < items.length; s++) {
            const item = items[s];

            if (item !== that.closest('lw-splitter-item')) {
                const siblingItem = item.querySelector('lw-tabs-window');

                if (siblingItem.closest('lw-splitter') === closestSplitter) {
                    siblings.push(item.querySelector('lw-tabs-window'));
                }
            }
        }

        return siblings;
    }

    /**
     * Updates the element when a property is changed.
     * @param {string} propertyName The name of the property.
     * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
     * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        if (propertyName !== 'collapsed') {
            super.propertyChangedHandler(propertyName, oldValue, newValue);
        }

        switch (propertyName) {
            case 'theme':
                if (oldValue !== '') {
                    that.$.closeButton.classList.remove(oldValue);
                    that.$.collapseButton.classList.remove(oldValue);
                    that.$.maximizeButton.classList.remove(oldValue);
                    that.$.pinButton.classList.remove(oldValue);
                }

                that._applyTheme(newValue);
                break;
            case 'autoHideWindow':
                that._handleAutoHideWindow();
                break;
            case 'autoHide':
                if (!newValue) {
                    //Delete the additionaly added cached property
                    if (that.$.tabsElement.selectedIndex !== null) {
                        that.$.tabsElement._tabs[that.$.tabsElement.selectedIndex]._autoHideWindowSize = undefined;
                    }

                    if (that._autoHideWindow) {
                        that._autoHideWindow.close();
                    }
                }

                break;
            case 'dataSource':
                that.$.tabsElement.dataSource = newValue;
                break;
            case 'layout':
                that._handleLayoutProperty();
                break;
            case 'collapsible':
            case 'collapsed':
            case 'locked':
            case 'max':
            case 'min':
            case 'size': {
                const parent = (that.isInShadowDOM ? that.getRootNode().host : that);

                const isInsideLayout = parent.closest('lw-docking-layout'),
                    splitterItemParent = that.closest('lw-splitter-item');

                if (!isInsideLayout) {
                    if (propertyName === 'collapsed') {
                        super.propertyChangedHandler(propertyName, oldValue, newValue);
                    }

                    return;
                }

                if (splitterItemParent) {
                    splitterItemParent[propertyName] = newValue;
                }

                break;
            }
        }
    }

    /**
     * Apply theme to internal custom elements
     */
    _applyTheme(theme) {
        const that = this;

        if (theme !== '') {
            const headerButtons = that.$.buttonsContainer.children;

            for (let i = 0; i < headerButtons.length; i++) {
                headerButtons[i].classList.add(theme);
            }
        }
    }

    /**
     * AutoHideContainer Close event handler
     */
    _autoHideWindowCloseHandler() {
        const that = this;

        if (that.allowToggle && that.$.tabsElement.selectedIndex !== null) {
            that.$.tabsElement.select(that.$.tabsElement.selectedIndex);
        }

        if (that._autoHideWindow) {
            that._moveContent(that._autoHideWindow.items[0], that._autoHideWindow._tab);
        }
    }

    /**
     * AutoHideContainer Open event handler
     * @param {any} event
     */
    _autoHideWindowOpenHandler() {
        const that = this;

        if (that.$.tabsElement.selectedIndex) {
            that._handleAutoHide(that.$.tabsElement.selectedIndex);
        }
    }

    /**
    * Create method called on ready stage
    **/
    _createElement() {
        const that = this;

        that.setAttribute('role', 'dialog');

        if (that.$.tabsElement.$.tabHeaderControls && !that.$.tabsElement.$.tabHeaderControls.innerHTML) {
            that.$.tabsElement.$tabHeaderControls.addClass('lw-hidden');
        }

        that.$.tabsElement.dataSource = that.dataSource;

        that._applyTheme(that.theme);
        that._handleAutoHideWindow();

        if (that.autoHide) {
            that._handleAutoHide(that.$.tabsElement.selectedIndex);
        }

        //Two-way binding possible issue. The Tabs element has selectedIndex but TabsWindow element has null
        //This leads to setting the attribute 'selectedIndex' of the Tabs element to null even tho
        //It's actual value is not null
        if (!that.allowToggle && !that.selectedIndex && that.$.tabsElement.selectedIndex !== null) {
            that.selectedIndex = that.$.tabsElement.selectedIndex;
            that.$.tabsElement.setAttribute('selected-index', that.selectedIndex);
        }

        that._handleLayoutProperty();

        const isInsideLayout = (that.isInShadowDOM ? that.getRootNode().host : that || that).closest('lw-docking-layout'),
            splitterItemParent = that.closest('lw-splitter-item');

        if (isInsideLayout && splitterItemParent) {
            splitterItemParent.collapsible = that.collapsible;
            splitterItemParent.collapsed = that.collapsed;
            splitterItemParent.min = that.min;
            splitterItemParent.max = that.max;
            splitterItemParent.size = that.size;
            splitterItemParent.locked = that.locked;
        }

    }

    attached() {
        super.attached();

        const that = this;

        that.classList.add('lw-window');

        if (that.shadowRoot) {
            that.$.root.classList.add('lw-window');
        }
    }

    /**
     * Hnadle layout property
     */
    _handleLayoutProperty() {
        const that = this;
        let ownerLayout = that.closest('lw-docking-layout');

        if (!LW.DockingLayout) {
            return;
        }

        if (!that.ownerLayout && that.getRootNode()) {
            let host = that.getRootNode().host;

            while (host) {
                if (!host.closest) {
                    return;
                }

                if (host.closest('lw-docking-layout')) {
                    ownerLayout = host.closest('lw-docking-layout');
                    break;
                }

                host = host.getRootNode() ? host.getRootNode().host : undefined;
            }
        }

        if (ownerLayout) {
            that.layout = ownerLayout;
            return;
        }

        if (that.layout instanceof LW.DockingLayout) {
            return;
        }

        if (typeof that.layout === 'string') {
            that.layout = document.getElementById(that.layout);
        }
    }

    /**
    * Window header double click handler.
    */
    _headerDblCickHandler(event) {
        const that = this,
            target = that.shadowRoot || that.isInShadowDOM ? event.originalEvent.composedPath()[0] : event.originalEvent.target;

        //NOTE: DoubleCLick + ctrlKey is used in DockingLayout
        if (event.ctrlKey || (target !== that.$.headerSection && target !== that.$.header) ||
            (that.$.maximizeButton && that.$.maximizeButton.offsetHeight === 0)) {
            return;
        }

        that.maximized ? that.restore() : that.maximize();
    }

    /**
    * Document Down event handler
    * @param {any} event - event details
    */
    _documentUpHandler(event) {
        const that = this;
        let target = event.originalEvent.target.closest ? event.originalEvent.target.closest('.lw-window') : event.originalEvent.target,
            isClickInside = target === that || target === that._autoHideWindow || that._isAutoHideWindowClicked,
            isInsideLayout = that.closest('lw-docking-layout');

        if (that.shadowRoot || that.isInShadowDOM) {
            target = event.originalEvent.composedPath()[0];
            isClickInside = target.getRootNode() === that.shadowRoot || target.closest('.lw-window') === that ||
                target.closest('.lw-window') === that._autoHideWindow || that._isAutoHideWindowClicked;
        }

        isInsideLayout = ((that.isInShadowDOM ? that.getRootNode().host : that) || that).closest('lw-docking-layout');

        if (isInsideLayout && isInsideLayout.disabled) {
            delete that._isWindowContentClicked;
            return;
        }

        super._documentUpHandler(event);

        delete that._isAutoHideWindowClicked;

        if (!that.autoHide || !that._autoHideWindow) {
            return;
        }

        if (!isClickInside || !that._autoHideWindow.opened) {
            that.selectedIndex = null;

            if (that._autoHideWindow.parentElement && that._autoHideWindow.parentElement.closest('.lw-window') === that) {
                that._autoHideWindow.close();
            }
        }
    }

    /**
     * Handles the positioning and content of the auto hide container
     */
    _handleAutoHide(index) {
        const that = this;

        if (!that.autoHide || index === null) {
            return;
        }

        if (!that._autoHideWindow) {
            that._handleAutoHideWindow(true);
        }

        if (!that._autoHideWindow) {
            return;
        }

        if (that._autoHideWindow._tabsWindow && that._autoHideWindow._tabsWindow !== that) {
            that._autoHideWindow._tabsWindow.selectedIndex = null;
        }

        const targetTab = that.$.tabsElement._tabs[index];

        if (that._autoHideWindow._tab !== targetTab) {
            that._moveContent(that._autoHideWindow.items[0], that._autoHideWindow._tab);
        }

        that._autoHideWindow.label = targetTab.label;
        that._autoHideWindow.draggable = targetTab.draggable;
        that._autoHideWindow.floatable = targetTab.floatable;
        that._autoHideWindow._tab = targetTab;
        that._moveContent(that._autoHideWindow._tab, that._autoHideWindow.items[0]);
        that._autoHideWindow.bringToFront();
        that._setAutoHideWindowSize(index);
        that._autoHideWindow.open();
        that._autoHideWindow._tabsWindow = that;

        if (that._autoHideWindow.controlledBy) {
            that._autoHideWindow.controlledBy.removeAttribute('aria-controls');
        }

        that._autoHideWindow.controlledBy = that.$.tabsElement._tabLabelContainers[index];
        that._autoHideWindow.controlledBy.setAttribute('aria-controls', that._autoHideWindow.id);
    }

    /**
     * Sets the cursor on element move event
     * @param {any} event
     */
    _moveHandler(event) {
        const that = this,
            isInsideLayout = that.closest('lw-docking-layout');

        if (isInsideLayout) {
            const layoutItems = isInsideLayout.items;

            if (layoutItems.indexOf(that) > -1) {
                return;
            }
        }

        //iOS Safari fix for dragging (prevents window scrolling)
        if (LW.Utilities.Core.isMobile && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) &&
            that.layout instanceof LW.DockingLayout && that.layout.hasAttribute('dragged')) {
            event.originalEvent.preventDefault();
        }

        super._moveHandler(event);
    }

    /**
     * Calculates the width/height/top/left of the autoHideWindow
     * @param {any} selectedIndex - the selectedIndex of the tabs inside the TabsWindow
     */
    _setAutoHideWindowSize(selectedIndex) {
        const that = this;

        if (!that._autoHideWindow) {
            return;
        }

        that._autoHideWindow.$.addClass('no-transition');
        that._autoHideWindow.style.maxWidth = that._autoHideWindow.style.maxHeight = '';

        const targetTab = that.$.tabsElement._tabs[selectedIndex],
            autoHideWindowParent = (that._autoHideWindow.isInShadowDOM ? that._autoHideWindow.getRootNode().host : that._autoHideWindow).closest('lw-docking-layout') || that._autoHideWindow.parentElement;
        let windowParentRect, tabsRect;

        if (!targetTab) {
            return;
        }

        if (that.tabPosition === 'top' || that.tabPosition === 'bottom') {
            that._autoHideWindow.resizeMode = that.tabPosition === 'top' ? 'bottom' : 'top';
            that._autoHideWindow.style.width = that.$.tabsElement.offsetWidth + 'px';

            windowParentRect = autoHideWindowParent.getBoundingClientRect();
            tabsRect = that.$.tabsElement.getBoundingClientRect();

            let height = targetTab._autoHideWindowSize ? parseFloat(targetTab._autoHideWindowSize) || '' : '';

            if (LW.DockingLayout && autoHideWindowParent instanceof LW.DockingLayout) {
                if (height) {
                    height = Math.min(autoHideWindowParent.$.itemsContainer.offsetHeight, height) + 'px';
                }

                that._autoHideWindow.style.maxHeight = autoHideWindowParent.$.itemsContainer.offsetHeight + 'px';
            }

            that._autoHideWindow.style.height = height;
            that._autoHideWindow.style.left = (tabsRect.left - windowParentRect.left) + 'px';

            if (that._autoHideWindow) {
                if (that.tabPosition === 'top') {
                    that._autoHideWindow.style.top = (tabsRect.top + -windowParentRect.top + tabsRect.height) + 'px';
                }
                else {
                    that._autoHideWindow.style.top = (tabsRect.top - windowParentRect.top - that._autoHideWindow.offsetHeight) + 'px';
                }
            }
        }
        else {
            that._autoHideWindow.resizeMode = that.tabPosition === 'left' ? 'right' : 'left';
            that._autoHideWindow.style.height = that.$.tabsElement.offsetHeight + 'px';

            let width = targetTab._autoHideWindowSize ? parseFloat(targetTab._autoHideWindowSize) || '' : '';

            if (autoHideWindowParent instanceof LW.DockingLayout) {
                if (width) {
                    width = Math.min(autoHideWindowParent.$.itemsContainer.offsetWidth, width) + 'px';
                }

                that._autoHideWindow.style.maxWidth = autoHideWindowParent.$.itemsContainer.offsetWidth + 'px';
            }

            that._autoHideWindow.style.width = width;

            windowParentRect = autoHideWindowParent.getBoundingClientRect();
            tabsRect = that.$.tabsElement.getBoundingClientRect();

            that._autoHideWindow.style.top = (tabsRect.top - windowParentRect.top) + 'px';

            if (that.tabPosition === 'left') {
                that._autoHideWindow.style.left = (tabsRect.left - windowParentRect.left + that.$.tabsElement.offsetWidth) + 'px';
            }
            else {
                that._autoHideWindow.style.left = (tabsRect.left - windowParentRect.left - that._autoHideWindow.offsetWidth) + 'px';
            }
        }

        //Causing the maxWidth/maxHeight to be recalculated
        if (that._autoHideWindow._dragDetails) {
            that._autoHideWindow._dragDetails.maxWidth = undefined;
        }

        //Make sure the new dimensions are set
        that._autoHideWindow._setDragDetails('resize');
        that._autoHideWindow._dragDetails.started = false;

        that._autoHideWindow.$.removeClass('no-transition');
    }

    /**
     * Handles the autoHideWindow instance when 'autoHide' property is enabled
     */
    _handleAutoHideWindow(createWindow) {
        const that = this;

        if (that.autoHideWindow) {
            if (that._autoHideWindow) {
                that._autoHideWindow.parentElement.removeChild(that._autoHideWindow);
            }

            if (typeof (that.autoHideWindow) === 'string') {
                that._autoHideWindow = document.getElementById(that.autoHideWindow);
                return;
            }
            else if (that.autoHideWindow instanceof LW.Window) {
                that._autoHideWindow = that.autoHideWindow;
                return;
            }
        }

        if (!createWindow || that._autoHideWindow || (that.$.contentSection.children.length === 2 && that.$.contentSection.children[1] instanceof LW.Window)) {
            return;
        }

        //Create the autoHideWindow
        const autoHideWindow = document.createElement('lw-window');

        autoHideWindow.$ = LW.Utilities.Extend(autoHideWindow);
        autoHideWindow.disableSnap = autoHideWindow.pinned = true;
        autoHideWindow.headerButtons = ['close'];

        that.$.contentSection.appendChild(autoHideWindow);

        that._autoHideWindow = autoHideWindow;
    }

    /**
     * Moves the content from one element to another. Used for the autoHideWindow
     * @param {any} from - Source element
     * @param {any} to - target element
     */
    _moveContent(from, to) {
        if (!from || !to) {
            return;
        }

        const contentNodes = [].slice.call(from.$.content.childNodes);

        for (let i = 0; i < contentNodes.length; i++) {
            to.appendChild(contentNodes[i]);
        }
    }

    /**
     * lwtabs element change event handler
     * @param {any} event
     */
    _tabsChangeHandler(event) {
        const that = this;

        if (event.target !== that.$.tabsElement || !that.autoHide) {
            return;
        }

        if (!that._autoHideWindow) {
            that._handleAutoHideWindow(true);
        }


        if (event.detail.oldIndex !== null && that._autoHideWindow.opened) {
            const previousTabItem = that.$.tabsElement._tabs[event.detail.oldIndex];

            previousTabItem._autoHideWindowSize =
                that._autoHideWindow.style[that.$.tabsElement.tabPosition === 'right' || that.$.tabsElement.tabPosition === 'left' ? 'width' : 'height'];

        }

        if (!that.autoHide || event.detail.index === null || event.detail.index === undefined) {
            that._autoHideWindow.setAttribute('active', '');
            that._autoHideWindow.close();
            return;
        }

        that._handleAutoHide(event.detail.index);
    }

    /**
     * Tabs element focus/blur event handler
     */
    _tabsFocusHandler(event) {
        const that = this;

        if (event.type === 'focus') {
            that.bringToFront();
            that.setAttribute('focus', '');
        }
        else {
            that.removeAttribute('focus');
        }
    }
});

LW('lw-wait-window', class WaitWindow extends LW.ProgressWindow {

    /**
    * Element's properties
    */
    static get properties() {
        return {
            'headerButtons': {
                value: [],
                type: 'array'
            },
            'disableSnap': {
                value: true,
                readOnly: true,
                type: 'boolean'
            },
            'modal': {
                value: true,
                readOnly: true,
                type: 'boolean',
                defaultReflectToAttribute: true
            },
            'pinned': {
                value: true,
                type: 'boolean',
                readOnly: true
            }
        }
    }

    /**
   * Element's HTML template.
   */
    template() {
        return `<div role="presentation">
                    <div class="lw-content-container" id="container">
                        <div id="headerSection" class="lw-header-section" role="heading" aria-level="1">
                            <div id="header" class="lw-header">[[label]]</div>
                            <div id="buttonsContainer" class="lw-buttons-container">
                                <button id="closeButton" class="lw-button lw-element lw-close-button" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="lw-content">
                            <content></content>
                            <lw-progress-bar id="progressBar" animation="[[animation]]" indeterminate theme="[[theme]]" right-to-left="[[rightToLeft]]"></lw-progress-bar>
                        </div>
                        <div id="footer" class="lw-footer"></div>
                    </div>
                </div>`;
    }

    /**
     * Key Down event handler
     * @param {any} event - event details
     */
    _keyDownHandler(event) {
        const that = this;

        delete that._changingFocus;

        function endDrag() {
            if (that._dragDetails) {
                that._dragDetails.started = false;
            }

            that.$.removeClass('no-transition');
        }

        if (that.disabled || (that._dragDetails && that._dragDetails.started)) {
            return;
        }

        const activeElement = that.shadowRoot || that._windowParent.element.getRootNode() ? that._windowParent.element.getRootNode().activeElement : document.activeElement;

        event.stopPropagation();

        //Distance hardcoded to 10px
        const distance = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 10 : -10;

        //that.style.transition = '';
        that.$.removeClass('no-transition');

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();

                if (event.altKey) {
                    event.key === 'ArrowUp' ? that.maximize() : that.restore();
                    endDrag()
                    return;
                }

                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('bottom', distance);
                    endDrag()
                    return;
                }

                that._drag(distance, 'vertical');
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                if (activeElement !== that) {
                    return;
                }

                event.preventDefault();
                that.$.addClass('no-transition');

                if (event.ctrlKey) {
                    that._resize('right', distance);
                    endDrag()
                    return;
                }

                that._drag(distance, 'horizontal');
                break;
            case 'Tab':
                if (that.opened && that.modal) {
                    that._changingFocus = true;
                }

                break;
            case 'Enter':
            case ' ':
                {
                    let target;

                    if (that.shadowRoot || that.isInShadowDOM) {
                        target = event.composedPath()[0];
                        that._buttonPressed = target.getRootNode().host;
                    }
                    else {
                        target = event.target.closest && event.target.closest('.lw-button');
                        that._buttonPressed = target;
                    }

                    if (!target) {
                        return;
                    }

                    that._isWindowButton(target);
                    delete that._buttonPressed;
                    break;
                }
        }

        endDrag()
    }
});