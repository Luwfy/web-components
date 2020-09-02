
/**
* Tooltip custom element.
*/
LW('lw-tooltip', class Tooltip extends LW.ContentElement {

    // Tooltip's properties.
    static get properties() {
        return {
            'arrow': {
                value: false,
                type: 'boolean'
            },
            'arrowDirection': {
                allowedValues: ['bottom', 'top', 'left', 'right'],
                value: 'bottom',
                type: 'string'
            },
            'delay': {
                value: 0,
                type: 'number'
            },
            'messages': {
                extend: true,
                value: {
                    'en': {
                        'invalidSelector': '{{elementType}}: "{{property}}" must be a String, an HTMLElement or null.',
                        'htmlTemplateNotSuported': '{{elementType}}: Browser doesn\'t support HTMLTemplate elements.',
                        'invalidTemplate': '{{elementType}}: "{{property}}" property accepts a string that must match the id of an HTMLTemplate element from the DOM.',
                        'invalidNode': '{{elementType}}: Invalid parameter "{{node}}" when calling {{method}}.'
                    }
                },
                type: 'object'
            },
            'offset': {
                value: [],
                type: 'array'
            },
            'openMode': {
                allowedValues: ['click', 'focus', 'hover', 'manual'],
                value: 'hover',
                type: 'string'
            },
            'position': {
                allowedValues: ['bottom', 'top', 'left', 'right', 'absolute', 'auto'],
                value: 'top',
                type: 'string'
            },
            'selector': {
                value: null,
                type: 'any?'
            },
            'tooltipTemplate': {
                value: null,
                type: 'any'
            },
            'value': {
                value: '',
                type: 'string',
                reflectToAttribute: false
            },
            'visible': {
                value: false,
                type: 'boolean'
            }
        };
    }

    /**
   * CSS files needed for the element (ShadowDOM)
   */
    static get styleUrls() {
        return [
            'lw.tooltip.css'
        ]
    }

    /** 
    * Tooltip's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <div id="content" class="lw-tooltip-content" inner-h-t-m-l="[[innerHTML]]" role="presentation">
                        <content></content>
                    </div>
                </div>`;
    }

    /**
    * Updates the Tooltip when a property is  changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;
        let eventType;

        switch (propertyName) {
            case 'openMode':
                that.close();
                that._handleEventListeners(oldValue);
                that._handleResize();
                break;
            case 'selector':
                that._oldOwnerElement = that._ownerElement;
                that._handleSelector(newValue);
                that._handleEventListeners();
                break;
            case 'tooltipTemplate':
                that._handleTemplate(oldValue);
                break;
            case 'value':
                that.tooltipTemplate ? that._handleTemplate() : that.$.content.innerHTML = that.value;
                break;
            case 'visible':
                eventType = newValue ? 'open' : 'close';

                that.$.fireEvent(eventType, {
                    'owner': that._ownerElement
                }, that.isInShadowDOM ? { composed: true, bubbles: true, cancelable: true } : undefined);
                break;
        }

        that._applyPosition();
    }

    /**
    * Called when the element is ready
    */
    ready() {
        const that = this;

        super.ready();

        that.setAttribute('role', 'tooltip');

        that._isParentPositionStatic = window.getComputedStyle(that.parentElement || document.querySelector('body')).position === 'static';
        that._handleSelector(that.selector);

        if (that.visible) {
            that._applyPosition();
        }

        that._handleEventListeners();
        that._handleResize();

        that.value = that.$.content.innerHTML = that.value ? that.value : that.innerHTML;
        that._handleTemplate();
    }

    /**
    * Appends a node to the tooltip.
    */
    appendChild(node) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.appendChild.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'appendChild', node: 'node' }));
            return
        }

        that.$.content.appendChild(node);
        that._applyPosition();
    }

    /**
     * Closes the tooltip
     */
    close() {
        const that = this;

        if (that._isOpening) {
            clearTimeout(that._isOpening);
        }

        if (!that.visible) {
            return;
        }

        that.$.fireEvent('close', {
            'owner': that._ownerElement
        }, that.isInShadowDOM ? { composed: true, bubbles: true, cancelable: true } : undefined);

        that.visible = false;
    }

    /**
    * Inserts a new node after another node in the tooltip.
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

        that.$.content.insertBefore(newNode, referenceNode);
        that._applyPosition();
    }

    /**
     * Open the tooltip
     */
    open() {
        const that = this;

        if (that.disabled || that.readonly || that.visible) {
            return;
        }

        that._isOpening = setTimeout(function () {
            that._applyPosition();
            that.$.fireEvent('open', {
                'owner': that._ownerElement
            }, that.isInShadowDOM ? { composed: true, bubbles: true, cancelable: true } : undefined);

            //Avoid unnecessaty propertyChangedHandler call
            const context = that.context;

            that.context = that;
            that.visible = true;
            that.context = context;
        }, that.delay);
    }

    /**
    * Removes a node from the tooltip.
    */
    removeChild(node) {
        const that = this;

        if (!that.isCompleted) {
            const args = Array.prototype.slice.call(arguments, 2);
            return HTMLElement.prototype.insertBefore.apply(that, args.concat(Array.prototype.slice.call(arguments)));
        }

        if (!node) {
            that.error(that.localize('invalidNode', { elementType: that.nodeName.toLowerCase(), method: 'removeChild', node: 'node' }));
            return
        }

        that.$.content.removeChild(node);
        that._applyPosition();
    }


    /**
     * Toggle the tooltip
     */
    toggle() {
        const that = this;

        that.visible ? that.close() : that.open();
    }

    /**
     * Returns the Array of parents of a target element
     * @param {any} element
     */
    _getDomElementPosition(element) {
        let arrayWithParentNodes = [],
            testedElement = element.parentElement;

        while (testedElement && testedElement.nodeName !== 'BODY') {
            arrayWithParentNodes.push(testedElement);

            if (this.enableShadowDOM && !testedElement.parentElement) {
                testedElement = testedElement.getRootNode().host;
                continue;
            }

            testedElement = testedElement.parentElement;
        }

        return arrayWithParentNodes;
    }

    /**
     * Returns the first non static parent of the tooltip's ownerElement
     */
    _getElementAndOwnerRelation(element) {
        const tooltipDistanceToBody = this._getDomElementPosition(element || this),
            tooltipLevelsNumber = tooltipDistanceToBody.length;
        let itemWithNonStaticPosition = null;

        for (let i = 0; i < tooltipLevelsNumber; i++) {
            let style = window.getComputedStyle(tooltipDistanceToBody[i]);

            if (style.getPropertyValue('position') !== 'static') {
                itemWithNonStaticPosition = tooltipDistanceToBody[i];
                break;
            }
        }

        return itemWithNonStaticPosition;
    }

    /**
      * Selector property handler.
      */
    _applyPosition() {
        const that = this;

        if (!that._ownerElement) {
            return;
        }

        if (!that.parentElement) {
            return;
        }

        that._isParentPositionStatic = window.getComputedStyle(that.parentElement).position === 'static';

        const ownerRectData = that._ownerElement.getBoundingClientRect(),
            parentRectData = that.parentElement ? that.parentElement.getBoundingClientRect() : { top: 0, left: 0 };
        let topPosition,
            leftPosition;

        if (that.parentElement && (that.parentElement.nodeName.toUpperCase() === 'BODY')) {
            topPosition = ownerRectData.top + window.scrollY;
            leftPosition = ownerRectData.left + window.scrollX;
        }
        else {
            topPosition = ownerRectData.top - parentRectData.top;
            leftPosition = ownerRectData.left - parentRectData.left;
        }

        const positionObject = { top: ownerRectData.top, left: ownerRectData.left, nonStaticParent: that._getElementAndOwnerRelation() },
            position = that.position;
        let translate;

        switch (position) {
            case 'auto':
            case 'bottom':
            case 'top':
            case 'left':
            case 'right':
                {
                    const pos = that['_position' + position.charAt(0).toUpperCase() + position.slice(1)](leftPosition, topPosition, positionObject);

                    topPosition = pos.top;
                    leftPosition = pos.left;
                    translate = pos.translate;
                    break;
                }
            case 'absolute':
                that.style.top = that.style.left = '';
                topPosition = leftPosition = 0;
                break;
        }

        //Arrow Translation is applied when position='auto'
        if (translate) {
            that.$.container.style.setProperty('--lw-tooltip-arrow-translate', translate + 'px');
        }
        else {
            that.$.container.style.removeProperty('--lw-tooltip-arrow-translate');
        }

        if (topPosition !== undefined && !isNaN(topPosition)) {
            topPosition += parseInt(that.offset[1]) || 0;
            that.style.top = topPosition + 'px';
        }

        if (leftPosition !== undefined && !isNaN(leftPosition)) {
            leftPosition += parseInt(that.offset[0]) || 0;
            that.style.left = leftPosition + 'px';
        }
    }

    /**
     * Handles the auto positioning of the element
     * @param {any} leftPosition - left position
     * @param {any} topPosition - right position
     * @param {any} positionObject - positionObject with details of it's first relative parent
     */
    _positionAuto(leftPosition, topPosition, positionObject) {
        const that = this;
        let parentElement = that.parentElement, overflowParent;

        while (parentElement) {
            if (getComputedStyle(parentElement).getPropertyValue('overflow') === 'hidden') {
                overflowParent = parentElement;
                break;
            }

            parentElement = parentElement.parentElement;
        }

        if (!overflowParent) {
            overflowParent = document.body;
        }

        const overFlowParentRect = overflowParent.getBoundingClientRect(),
            arrowWidth = parseFloat(window.getComputedStyle(that).getPropertyValue('--lw-tooltip-arrow-width')) || 0;
        let possiblePosition = that._positionTop(leftPosition, topPosition, positionObject),
            nonStaticParent = positionObject.nonStaticParent,
            minTranslate = that.offsetWidth / 2 - arrowWidth,
            nonStaticParentTop = 0,
            nonStaticParentLeft = 0;

        if (nonStaticParent) {
            const nonStaticParentRect = nonStaticParent.getBoundingClientRect();

            nonStaticParentTop = nonStaticParentRect.top;
            nonStaticParentLeft = nonStaticParentRect.left;
        }

        if (possiblePosition.top + nonStaticParentTop >= overFlowParentRect.top) {
            topPosition = possiblePosition.top;
            leftPosition = Math.max(overFlowParentRect.left - nonStaticParentLeft, possiblePosition.left +
                Math.min(0, overFlowParentRect.right - (possiblePosition.left + nonStaticParentLeft + that.offsetWidth)));
            return { left: leftPosition, top: topPosition, translate: Math.max(-minTranslate, Math.min(minTranslate, possiblePosition.left - leftPosition)) };
        }

        possiblePosition = that._positionBottom(leftPosition, topPosition, positionObject);

        if (possiblePosition.top + that.offsetHeight + nonStaticParentTop <= overFlowParentRect.bottom) {
            topPosition = possiblePosition.top;
            leftPosition = Math.max(overFlowParentRect.left - nonStaticParentLeft, possiblePosition.left +
                Math.min(0, overFlowParentRect.right - (possiblePosition.left + nonStaticParentLeft + that.offsetWidth)));
            return { left: leftPosition, top: topPosition, translate: Math.max(-minTranslate, Math.min(minTranslate, possiblePosition.left - leftPosition)) };
        }

        possiblePosition = that._positionLeft(leftPosition, topPosition, positionObject);

        topPosition = possiblePosition.top;
        minTranslate = that.offsetHeight / 2 - arrowWidth;

        topPosition = Math.max(overFlowParentRect.top - nonStaticParentTop, possiblePosition.top +
            Math.min(0, overFlowParentRect.bottom - (possiblePosition.top + nonStaticParentTop + that.offsetHeight)));

        if (possiblePosition.left + nonStaticParentLeft >= overFlowParentRect.left) {
            leftPosition = possiblePosition.left;
        }
        else {
            possiblePosition = that._positionRight(leftPosition, topPosition, positionObject);
            leftPosition = possiblePosition.left;
        }

        return { left: leftPosition, top: topPosition, translate: Math.max(-minTranslate, Math.min(minTranslate, possiblePosition.top - topPosition)) };
    }

    /**
     * Returns the offset off all non static parents until the target nonStaticParent
     * @param {any} nonStaticParent
     */
    _getRelativeParentOffset(nonStaticParent) {
        const that = this,
            ownerElement = that._ownerElement;
        let ownerNonStaticParent = that._getElementAndOwnerRelation(ownerElement);
        let top = 0,
            left = 0;

        if (!nonStaticParent) {
            return { left: left, top: top }
        }

        while (nonStaticParent !== ownerNonStaticParent) {
            top += ownerNonStaticParent.offsetTop;
            left += ownerNonStaticParent.offsetLeft;
            ownerNonStaticParent = that._getElementAndOwnerRelation(ownerNonStaticParent);
        }

        return { left: left, top: top }
    }

    /**
     * Position the Tooltip Above the ownerElement
     * @param {any} leftPosition - left position
     * @param {any} topPosition - right position
     * @param {any} positionObject - positionObject with details of it's first relative parent
     */
    _positionTop(leftPosition, topPosition, positionObject) {
        const that = this,
            offsetTillNonStaticParent = that._getRelativeParentOffset(positionObject.nonStaticParent);

        that.set('arrowDirection', 'bottom');

        if (positionObject.nonStaticParent === null) {
            topPosition = (positionObject.top + window.scrollY - that.offsetHeight);
            leftPosition = (positionObject.left + window.scrollX - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);
            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }


        if (that._isParentPositionStatic) {
            topPosition = (that._ownerElement.offsetTop - that.offsetHeight);
            leftPosition = (that._ownerElement.offsetLeft - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);

            if (that._ownerElement instanceof SVGElement) { // to be applied in all modes
                const rect = that._ownerElement.getBoundingClientRect(),
                    rectParent = that._ownerElement.parentNode.getBoundingClientRect();

                topPosition = (rect.top - rectParent.top - that.offsetHeight / 2);
                leftPosition = (rect.left - that.offsetWidth / 2 + rectParent.left / 2);
            }

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        if (that._ownerElement instanceof SVGElement && that._ownerElement.parentElement) {
            const rect = that._ownerElement.getBoundingClientRect(),
                rectParent = that._ownerElement.parentNode.getBoundingClientRect();

            topPosition = (rect.top - rectParent.top - that.offsetHeight);
            leftPosition = (rect.left - rectParent.left - (that.offsetWidth / 2)) + (rect.width / 2);

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        topPosition = (topPosition - that.offsetHeight);
        leftPosition = (leftPosition - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);

        return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
    }

    /**
     * Position the Tooltip Below the ownerElement
     * @param {any} leftPosition - left position
     * @param {any} topPosition - right position
     * @param {any} positionObject - positionObject with details of it's first relative parent
     */
    _positionBottom(leftPosition, topPosition, positionObject) {
        const that = this,
            offsetTillNonStaticParent = that._getRelativeParentOffset(positionObject.nonStaticParent);

        that.set('arrowDirection', 'top');

        if (positionObject.nonStaticParent === null) {
            topPosition = (positionObject.top + window.scrollY + that._ownerElement.offsetHeight);
            leftPosition = (positionObject.left + window.scrollX - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);
            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        if (that._isParentPositionStatic) {
            topPosition = (that._ownerElement.offsetTop + that._ownerElement.offsetHeight);
            leftPosition = (that._ownerElement.offsetLeft - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);
            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        topPosition = (topPosition + that._ownerElement.offsetHeight);
        leftPosition = (leftPosition - that.offsetWidth / 2 + that._ownerElement.offsetWidth / 2);

        return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
    }

    /**
     * Position the Tooltip to the Left of the ownerElement
     * @param {any} leftPosition - left position
     * @param {any} topPosition - right position
     * @param {any} positionObject - positionObject with details of it's first relative parent
     */
    _positionLeft(leftPosition, topPosition, positionObject) {
        const that = this,
            offsetTillNonStaticParent = that._getRelativeParentOffset(positionObject.nonStaticParent);

        that.set('arrowDirection', 'right');

        if (positionObject.nonStaticParent === null) {
            topPosition = (positionObject.top + window.scrollY + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
            leftPosition = (positionObject.left + window.scrollX - that.offsetWidth);

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        if (that._isParentPositionStatic) {
            topPosition = (that._ownerElement.offsetTop + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
            leftPosition = (that._ownerElement.offsetLeft - that.offsetWidth);

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        topPosition = (topPosition + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
        leftPosition = (leftPosition - that.offsetWidth);

        return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
    }

    /**
     * Position the Tooltip to the Right of the ownerElement
     * @param {any} leftPosition - left position
     * @param {any} topPosition - right position
     * @param {any} positionObject - positionObject with details of it's first relative parent
     */
    _positionRight(leftPosition, topPosition, positionObject) {
        const that = this,
            offsetTillNonStaticParent = that._getRelativeParentOffset(positionObject.nonStaticParent);

        that.set('arrowDirection', 'left');

        if (positionObject.nonStaticParent === null) {
            topPosition = (positionObject.top + window.scrollY + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
            leftPosition = (positionObject.left + window.scrollX + that._ownerElement.offsetWidth);

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        if (that._isParentPositionStatic) {
            topPosition = (that._ownerElement.offsetTop + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
            leftPosition = (that._ownerElement.offsetLeft + that._ownerElement.offsetWidth);

            return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
        }

        topPosition = (topPosition + that._ownerElement.offsetHeight / 2 - that.$.content.offsetHeight / 2);
        leftPosition = (leftPosition + that._ownerElement.offsetWidth);

        return { left: leftPosition + offsetTillNonStaticParent.left, top: topPosition + offsetTillNonStaticParent.top };
    }

    /**
     * Events Handller.
    * @param {any} event
     */
    _eventsHandler(event) {
        const that = this;

        if (that.disabled || that.readonly) {
            return;
        }

        if (event.type === 'click') {
            that.visible ? this.close() : this.open();
            return;
        }

        event.type === 'mouseenter' || event.type === 'focus' ? this.open() : this.close();
    }

    /**
    * Adds event listeners to owner
    */
    _handleEventListeners(oldValue) {
        const that = this;

        if (that._oldOwnerElement && that.openMode !== 'manual') {
            let ariaDescribedby = that._oldOwnerElement.getAttribute('aria-describedby');

            if (ariaDescribedby) {
                if (ariaDescribedby === that.id) {
                    that._oldOwnerElement.removeAttribute('aria-describedby');
                }
                else {
                    ariaDescribedby = ariaDescribedby.replace(' ' + that.id, '');
                    ariaDescribedby = ariaDescribedby.replace(that.id + ' ', '');
                    that._oldOwnerElement.setAttribute('aria-describedby', ariaDescribedby);
                }
            }

            that._oldOwnerElement.$.unlisten('mouseenter.tooltip');
            that._oldOwnerElement.$.unlisten('mouseleave.tooltip');
            that._oldOwnerElement.$.unlisten('focus.tooltip');
            that._oldOwnerElement.$.unlisten('blur.tooltip');
            that._oldOwnerElement.$.unlisten('click.tooltip');
            that._oldOwnerElement = null;
        }

        if (!that._ownerElement) {
            return;
        }

        if (oldValue) {
            //unlisten from previous event.
            switch (oldValue) {
                case 'hover':
                    that._ownerElement.$.unlisten('mouseenter.tooltip');
                    that._ownerElement.$.unlisten('mouseleave.tooltip');
                    break;
                case 'focus':
                    that._ownerElement.$.unlisten('focus.tooltip');
                    that._ownerElement.$.unlisten('blur.tooltip');
                    break;
                case 'click':
                    that._ownerElement.$.unlisten('click.tooltip');
                    break;
            }
        }

        if (that.openMode === 'manual') {
            return;
        }

        if (!(that._ownerElement instanceof LW.BaseElement)) {
            that._ownerElement.$ = LW.Utilities.Extend(that._ownerElement);
        }

        //listen to appropriate event
        switch (that.openMode) {
            case 'hover':
                that._ownerElement.$.listen('mouseenter.tooltip', that._eventsHandler.bind(that));
                that._ownerElement.$.listen('mouseleave.tooltip', that._eventsHandler.bind(that));
                break;
            case 'focus':
                that._ownerElement.$.listen('focus.tooltip', that._eventsHandler.bind(that));
                that._ownerElement.$.listen('blur.tooltip', that._eventsHandler.bind(that));
                break;
            case 'click':
                that._ownerElement.$.listen('click.tooltip', that._eventsHandler.bind(that));
                break;
            default:
                break;
        }
    }

    /**
     * Updates the position of the tooltip on window resize.
     */
    _handleResize() {
        const that = this;

        function applyPosition() {
            that._applyPosition();
        }

        if (that.openMode === 'click') {
            window.addEventListener('resize', applyPosition);
        }
        else {
            window.removeEventListener('resize', applyPosition);
        }
    }

    /**
     * Selector property handler.
     */
    _handleSelector(newValue) {
        const that = this;

        if (typeof newValue === 'string') {
            that._ownerElement = newValue.length > 0 ? document.getElementById(newValue) : undefined;
        }
        else if (newValue instanceof HTMLElement || newValue instanceof SVGElement) {
            that._ownerElement = newValue;
        }
        else if (newValue === null) {
            that._ownerElement = undefined;
            return;
        }
        else {
            that.error(that.localize('invalidSelector', { elementType: that.nodeName.toLowerCase(), property: 'selector' }));
        }

        const ariaDescribedby = that._ownerElement ? that._ownerElement.getAttribute('aria-describedby') : null;

        if (!that._ownerElement) {
            return;
        }

        if (!ariaDescribedby) {
            that._ownerElement.setAttribute('aria-describedby', that.id);
        }
        else {
            that._ownerElement.setAttribute('aria-describedby', ariaDescribedby + ' ' + that.id);
        }
    }

    /**
    * Apply the template to the tooltip.
    */
    _handleTemplate(oldValue) {
        const that = this;
        let template = that.tooltipTemplate;

        if (oldValue) {
            that.$.content.innerHTML = that.value ? that.value : '';
        }

        if (template === null || !template) {
            return;
        }

        if (typeof that.tooltipTemplate === 'function') {
            that.tooltipTemplate(that.$.content, { value: that.value });
            return;
        }

        if (!('content' in document.createElement('template'))) {
            that.error(that.localize('htmlTemplateNotSuported', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        template = document.getElementById(template);
        if (template === null || !('content' in template)) {
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase(), property: 'template' }));
            return;
        }

        const content = template.content,
            childrenCount = content.childNodes.length,
            regex = /{{\w+}}/g;
        let bindingString,
            bindingDetails = [];

        for (let i = 0; i < childrenCount; i++) {
            bindingString = regex.exec(content.childNodes[i].innerHTML);
            while (bindingString) {
                bindingDetails.push({ childNodeIndex: i, bindingString: bindingString[0] });
                bindingString = regex.exec(content.childNodes[i].innerHTML);
            }
        }

        const bindingsCount = bindingDetails.length;
        let clone = document.importNode(template.content, true),
            bindingHolderElement,
            bindingStringsCount;

        for (let b = 0; b < bindingsCount; b++) {
            bindingHolderElement = clone.childNodes[bindingDetails[b].childNodeIndex];
            bindingStringsCount = bindingDetails.length;
            for (let i = 0; i < bindingStringsCount; i++) {
                bindingHolderElement.innerHTML = bindingHolderElement.innerHTML.replace(bindingDetails[b].bindingString, that.value);
            }
        }

        that.$.content.innerHTML = '';
        for (let i = 0; i < clone.childNodes.length; i++) {
            if (clone.childNodes[i].outerHTML) {
                that.$.content.innerHTML += clone.childNodes[i].outerHTML;
            }
        }
    }
});
