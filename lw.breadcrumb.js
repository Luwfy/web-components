
LW.Utilities.Assign( 'DragDrop', class DragDrop {
    constructor ( element ) {
        const that = this;

        that.ownerElement = element;
        that._dragDetails = null;
        that._items = null;
        that._showFeedback = true;
    }

    capture( item, event ) {
        const that = this;

        that._dragDetails = { element: item.element || item, item: item, x: event.pageX, y: event.pageY };
    }

    get isDragging() {
        return this.feedback !== null;
    }

    get items() {
        return this._items;
    }

    set items( value ) {
        this._items = value;
    }

    get showFeedback() {
        return this._showFeedback;
    }

    set showFeedback( value ) {
        this._showFeedback = value;
    }

    findTarget( event ) {
        const that = this;
        let originalTarget = null;

        if ( !that._itemCoordinates ) {
            return null;
        }

        for ( let i = 0; i < that._itemCoordinates.coordinates.length; i++ ) {
            that._itemCoordinates.coordinates[ i ].forEach( ( item, index ) => {
                if ( that._items[ index ] && ( that._items[ index ].classList.contains( 'lw-visibility-hidden' ) || that._items[ index ].classList.contains( 'lw-hidden' ) ) ) {
                    return true;
                }
                if ( that._items[ item.index ] && ( that._items[ item.index ].classList.contains( 'lw-visibility-hidden' ) || that._items[ item.index ].classList.contains( 'lw-hidden' ) ) ) {
                    return true;
                }

                const rect = item.rect;
                if ( rect.top <= event.clientY ) {
                    if ( rect.left <= event.clientX ) {
                        originalTarget = that._items[ item.index ];
                    }
                }
            } )
        }

        return originalTarget;
    }

    createFeedback( event ) {
        const that = this;
        const dragDetails = that.dragDetails;
        let feedback;

        if ( !that.showFeedback ) {
            return;
        }

        if ( !dragDetails ) {
            return null;
        }

        if ( dragDetails.feedback ) {
            return dragDetails.feedback;
        }

        if ( Math.abs( dragDetails.x - event.pageX ) > 5 ||
            Math.abs( dragDetails.y - event.pageY ) > 5 ) {
            feedback = document.createElement( 'div' );
            feedback.className = 'lw-breadcrumb-feedback';
            feedback.style.height = that.dragDetails.element.offsetHeight + 'px';
            feedback.innerHTML = that.dragDetails.element.innerHTML;
            document.body.appendChild( feedback );
            dragDetails.feedback = feedback;
            dragDetails.element.classList.add( 'dragged' );
            that.getItemCoordinates( that.items );
            that.ownerElement.$.fireEvent( 'dragStart', { item: dragDetails.item, element: dragDetails.element, target: dragDetails.item, originalEvent: event.originalEvent } );

            if ( that.ownerElement.rightToLeft ) {
                feedback.setAttribute( 'right-to-left', true );
            }
            else {
                feedback.removeAttribute( 'right-to-left' );
            }

            return feedback;
        }

        return null;
    }

    get feedback() {
        const that = this;

        return that.dragDetails && that.dragDetails.feedback ? that.dragDetails.feedback : null;
    }

    removeFeedback( event ) {
        const that = this;
        const dragDetails = that.dragDetails;

        if ( !that.showFeedback ) {
            that.removeCapture();
            return;
        }

        if ( !dragDetails ) {
            return;
        }

        if ( dragDetails.feedback ) {
            document.body.removeChild( dragDetails.feedback );
        }

        if ( !that.ownerElement.allowDrop ) {
            that.removeCapture();
            return;
        }

        if ( event.key === 'Escape' ) {
            that.ownerElement.$.fireEvent( 'dragCancel', {
                item: dragDetails.item,
                element: dragDetails.element,
                originalEvent: event.originalEvent
            } );


            that.removeCapture();
            return;
        }

        that.ownerElement.$.fireEvent( 'dragEnd', {
            item: dragDetails.item,
            element: dragDetails.element,
            target: dragDetails.target,
            droppedBeforeTarget: dragDetails.before,
            originalEvent: event.originalEvent
        } );

        that.removeCapture();
    }

    removeCapture() {
        const that = this;
        const dragDetails = that.dragDetails;

        if ( !dragDetails ) {
            return;
        }

        that.clearItemDragClass();
        dragDetails.element.classList.remove( 'dragged' );
        that._dragDetails = null;
    }

    moveFeedback( left, top ) {
        const that = this;
        const dragDetails = that.dragDetails;

        if ( !that.showFeedback ) {
            return;
        }

        if ( !dragDetails ) {
            return;
        }

        const feedback = that.dragDetails.feedback;

        if ( feedback ) {
            feedback.style.left = left + 'px';
            feedback.style.top = top + 'px';
        }

        delete dragDetails.target;
    }

    drag( event ) {
        const that = this;

        if ( !that.dragDetails ) {
            return;
        }

        that.createFeedback( event );
        that.moveFeedback( event.pageX + 5, event.pageY + 5 );

        const target = that.findTarget( event );

        if ( target ) {
            let targetItem = target.element ? target.element : target;

            if ( targetItem ) {
                that.applyItemDragClass( targetItem, targetItem.getBoundingClientRect(), event );
                return;
            }
        }
        else {
            that.ownerElement.$.fireEvent( 'dragging', { item: that.dragDetails.item, element: that.dragDetails.element, target: null, originalEvent: event.pageX ? event : event.originalEvent } );
            that.clearItemDragClass();
        }
    }

    error() {
        const that = this;

        if ( that.dragDetails && that.dragDetails.feedback ) {
            that.dragDetails.feedback.classList.add( 'error' );
        }
    }

    data() {
        const that = this;

        if ( that.dragDetails && that.dragDetails.feedback ) {
            that.dragDetails.feedback.classList.add( 'data' );
        }
    }

    success() {
        const that = this;

        if ( that.dragDetails && that.dragDetails.feedback ) {
            that.dragDetails.feedback.classList.remove( 'error' );
            that.dragDetails.feedback.classList.remove( 'data' );
        }
    }

    /**
     * Clears the item class related to dragging.
     */
    applyItemDragClass( targetItem, targetRect, event ) {
        const that = this,
            dragDetails = that._dragDetails;
        let coordinate, position, dimension;

        that.clearItemDragClass();

        dragDetails.target = targetItem;

        if ( dragDetails && that.showFeedback && dragDetails.feedback ) {
            dragDetails.feedback.classList.remove( 'error' );
            dragDetails.before = false;
        }

        if ( !that._minimized ) {
            coordinate = event.clientX;
            position = 'left';
            dimension = 'width';
        }
        else {
            coordinate = event.clientY;
            position = 'top';
            dimension = 'height';
        }

        const nextElementSibling = targetItem[ ( that.rightToLeft ? 'previous' : 'next' ) + 'ElementSibling' ];

        if ( coordinate <= targetRect[ position ] + targetRect[ dimension ] / 2 ) {
            targetItem.classList.add( 'target' );
            if ( dragDetails ) {
                dragDetails.before = true;
            }
        }
        else if ( nextElementSibling ) {
            nextElementSibling.classList.add( 'target' );
        }
        else {
            targetItem.classList.add( 'afterTarget' );
        }

        if ( !dragDetails ) {
            return;
        }

        if ( that.rightToLeft ) {
            dragDetails.before = !dragDetails.before;
        }

        that.ownerElement.$.fireEvent( 'dragging', { item: dragDetails.item, element: dragDetails.element, target: targetItem, originalEvent: event.originalEvent } );
    }

    /**
   * Clears the item class related to dragging.
   */
    clearItemDragClass() {
        const that = this;
        if ( that.items ) {
            that.items.forEach( ( item ) => {
                const element = item instanceof HTMLElement ? item : item.element;

                element.classList.remove( 'target' );
                element.classList.remove( 'afterTarget' );
            } );
        }
    }

    /**
     * Gets item coordinates.
     */
    getItemCoordinates( items ) {
        if ( !items ) {
            return { coordinate: [], rows: [] };
        }

        const elements = items.map( ( item ) => {
            if ( item.nodeName ) {
                return item;
            }

            return item.element;
        } );

        const that = this,
            coordinates = [ [] ],
            rows = [];
        let previousTop = elements[ 0 ].offsetTop,
            level = 0;

        coordinates[ 0 ].push( { index: 0, rect: elements[ 0 ].getBoundingClientRect() } );
        rows[ 0 ] = { top: coordinates[ 0 ][ 0 ].rect.top, bottom: coordinates[ 0 ][ 0 ].rect.bottom };

        for ( let i = 1; i < elements.length; i++ ) {
            const item = elements[ i ],
                rect = item.getBoundingClientRect(),
                top = elements[ i ].offsetTop;

            if ( top > previousTop ) {
                previousTop = top;
                level++;
                coordinates[ level ] = [];
                rows[ level ] = { top: rect.top, bottom: rect.bottom };
            }

            coordinates[ level ].push( { index: i, rect: rect } );
        }

        that._itemCoordinates = { coordinates: coordinates, rows: rows };
    }


    get dragDetails() {
        return this._dragDetails;
    }
} );

/**
 * Breadcrumb custom element.
 */
LW( 'lw-breadcrumb', class Breadcrumb extends LW.BaseElement {
    // Breadcrumb's properties.
    static get properties() {
        return {
            'addNewItem': {
                value: false,
                type: 'boolean'
            },
            'allowDrag': {
                value: false,
                type: 'boolean'
            },
            'allowDrop': {
                value: false,
                type: 'boolean'
            },
            'closeButtons': {
                value: false,
                type: 'boolean'
            },
            'dataSource': {
                value: [],
                type: 'array',
                reflectToAttribute: false
            },
            'itemTemplate': {
                value: null,
                type: 'any'
            },
            'minimizeWidth': {
                value: 150,
                type: 'number?'
            },
            'placeholder': {
                value: '',
                type: 'string'
            }
        };
    }

    /**
     * Breadcrumb's event listeners.
     */
    static get listeners() {
        return {
            'move': '_moveHandler',
            'resize': '_resizeHandler',
            'container.click': '_containerClickHandler',
            'container.down': '_containerDownHandler',
            'container.transitionend': '_containerTransitionendHandler',
            'hamburgerIcon.click': '_hamburgerIconClickHandler',
            'document.move': '_documentMoveHandler',
            'document.keyup': '_documentKeyUpHandler',
            'document.up': '_documentUpHandler'
        };
    }

    /**
  * CSS files needed for the element (ShadowDOM)
  */
    static get styleUrls() {
        return [
            'lw.breadcrumb.css'
        ]
    }

    /**
     * Breadcrumb's HTML template.
     */
    template() {
        return `<div id="container" role="presentation">
                    <div id="minimizedHeader" class="lw-header lw-minimized-header lw-hidden" role="presentation">
                        <div id="hamburgerIcon" class="lw-hamburger-icon" role="button" aria-label="Toggle" aria-haspopup="dialog" aria-expanded="false">
                            <div id="hamburgerIconLineTop" class="lw-hamburger-icon-line lw-hamburger-icon-line-top" role="presentation"></div>
                            <div id="hamburgerIconLineCenter" class="lw-hamburger-icon-line lw-hamburger-icon-line-center" role="presentation"></div>
                            <div id="hamburgerIconLineBottom" class="lw-hamburger-icon-line lw-hamburger-icon-line-bottom" role="presentation"></div>
                        </div>
                    </div>
                    <template>
                        <div class="lw-breadcrumb-items" *items={{dataSource}} role="list">
                            <div class="lw-breadcrumb-item" role="listitem" aria-label={{item.label}}>
                                <div class="lw-breadcrumb-item-label" inner-H-T-M-L={{item.label}} role="presentation"></div>
                                <div class="lw-close-button" role="button" aria-label="Close"></div>
                            </div>
                        </div>
                    </template>
                    <div id="placeholder" class="lw-breadcrumb-placeholder lw-hidden" inner-H-T-M-L={{placeholder}}></div>
                </div>`;
    }

    /**
    * Updates the Breadcrumb when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler( propertyName, oldValue, newValue ) {
        super.propertyChangedHandler( propertyName, oldValue, newValue );

        const that = this;

        switch ( propertyName ) {
            case 'addNewItem':
                if ( newValue ) {
                    that._appendNewItemButton();
                }
                else {
                    that.$.templateContainer.firstElementChild.removeChild( that._addNewItemButton );
                    delete that._addNewItemButton;
                }

                that._setIndentation();
                break;
            case 'animation':
            case 'disabled':
            case 'unfocusable':
                if ( that.addNewItem ) {
                    that._addNewItemButton[ propertyName ] = newValue;
                }

                if ( propertyName === 'disabled' && that._minimizedDropDownOpened ) {
                    that._hamburgerIconClickHandler();
                }

                break;
            case 'itemTemplate':
                for ( let i = 0; i < that._items.length; i++ ) {
                    that._items[ i ].firstElementChild.innerHTML = that.dataSource[ i ].label;
                }

                if ( newValue ) {
                    that._applyTemplate();
                }

                break;
            case 'minimizeWidth':
                if ( newValue !== null && that.offsetWidth <= newValue ) {
                    that.minimize();
                }
                else {
                    that.maximize();
                }

                break;
            case 'closeButtons':
                if ( !that._minimized ) {
                    that._setIndentation();
                }

                break;
        }
    }

    ready() {
        super.ready();

        const that = this;

        that.setAttribute( 'role', 'navigation' );
        that.$.container.children[ 1 ].setAttribute( 'id', that.id + 'TemplateContainer' );
        that.$.container.children[ 1 ].setAttribute( 'role', 'presentation' );
        that.$.hamburgerIcon.setAttribute( 'aria-controls', that.id + 'TemplateContainer' );

        that._edgeMacFF = LW.Utilities.Core.Browser.Edge ||
            LW.Utilities.Core.Browser.Firefox && navigator.platform.toLowerCase().indexOf( 'mac' ) !== -1;
        that.templateContainer = that.$.container.children[ 1 ];
        that._dragDrop = new LW.Utilities.DragDrop( that );

        if ( that.minimizeWidth !== null && that.offsetWidth <= that.minimizeWidth ) {
            that.minimize();
        }
    }

    templateAttached() {
        this._handleDataSourceRefresh();
    }

    /**
     * Adds an item.
     *
     * @param {Object} itemDetails An Object with the fields "index", "label", and "value".
     */
    addItem( itemDetails ) {
        const that = this,
            newSource = that.dataSource.slice( 0 );

        if ( !itemDetails || typeof itemDetails !== 'object' ||
            isNaN( itemDetails.index ) || itemDetails.index < 0 ) {
            return;
        }

        newSource.splice( itemDetails.index, 0, { label: itemDetails.label, value: itemDetails.value } );
        that.dataSource = newSource;
    }

    /**
     * Maximizes the Breadcrumb.
     */
    maximize() {
        const that = this;

        if ( !that._minimized ) {
            return;
        }

        that.$minimizedHeader.addClass( 'lw-hidden' );
        that.templateContainer.classList.remove( 'lw-visibility-hidden' );

        if ( that._edgeMacFF ) {
            that.templateContainer.classList.remove( 'not-in-view' );
        }

        that.$hamburgerIcon.removeClass( 'lw-close-button' );
        that.removeAttribute( 'minimized' );
        that.$.container.children[ 1 ].setAttribute( 'role', 'presentation' );
        that._minimizedDropDownOpened = false;
        that._minimized = false;
        that.$.fireEvent( 'maximize' );
        that._setIndentation();
    }

    /**
     * Minimizes the Breadcrumb.
     */
    minimize() {
        const that = this;

        if ( that._minimized || that.offsetWidth === 0 || that.offsetHeight === 0 ) {
            return;
        }

        const animationType = that.animation,
            restoreAnimation = that.hasAnimation;

        if ( restoreAnimation ) {
            that.animation = 'none';
        }

        that.$minimizedHeader.removeClass( 'lw-hidden' );
        that.templateContainer.classList.add( 'lw-visibility-hidden' );

        if ( that._edgeMacFF ) {
            that.templateContainer.classList.add( 'not-in-view' );
        }

        if ( restoreAnimation ) {
            setTimeout( function () {
                that.animation = animationType;
            }, 0 );
        }

        that.setAttribute( 'minimized', '' );
        that.$.container.children[ 1 ].setAttribute( 'role', 'dialog' );
        that._minimized = true;
        that.$.fireEvent( 'minimize' );
        that._setIndentation();
    }

    /**
     * Removes an item.
     *
     * @param {HTMLElement} item The item to remove.
     */
    removeItem( item ) {
        const that = this,
            index = that._items.indexOf( item ),
            newSource = that.dataSource.slice( 0 );

        if ( index === -1 ) {
            return;
        }

        newSource.splice( index, 1 );
        that.dataSource = newSource;
    }

    /**
     * move handler.
     */
    _moveHandler( event ) {
        if ( event.originalEvent.type === 'touchmove' ) {
            event.originalEvent.preventDefault();
        }
    }

    /**
     * resize handler.
     */
    _resizeHandler() {
        const that = this;

        if ( that.minimizeWidth !== null && that.offsetWidth <= that.minimizeWidth ) {
            that.minimize();
        }
        else if ( that._minimized ) {
            that.maximize();
        }
        else {
            that._setIndentation();
        }
    }

    /**
     * container click handler.
     */
    _containerClickHandler( event ) {
        const that = this;

        if ( that.disabled || !that.templateContainer.contains( event.target ) ) {
            return;
        }

        const closeButton = event.target.closest( '.lw-close-button' );

        if ( !closeButton ) {
            const item = event.target.closest( '.lw-breadcrumb-item' );
            const dataItem = that.dataSource[ that._items.indexOf( item ) ];

            that.$.fireEvent( 'itemClick', { item: dataItem, element: item } );
            return;
        }


        const item = closeButton.closest( '.lw-breadcrumb-item' );
        const dataItem = that.dataSource[ that._items.indexOf( item ) ];
        const closingEvent = that.$.fireEvent( 'closing', { item: dataItem, element: item } );

        if ( !closingEvent.defaultPrevented ) {
            const newSource = that.dataSource.slice( 0 );

            newSource.splice( that._items.indexOf( item ), 1 );
            that.dataSource = newSource;
            that.$.fireEvent( 'close', { item: dataItem, element: item } );
        }
    }

    /**
     * container down handler.
     */
    _containerDownHandler( event ) {
        const that = this,
            target = event.originalEvent.target;

        if ( !that.allowDrag || that.disabled || target.classList.contains( 'lw-close-button' ) ) {
            return;
        }

        const item = target.closest( '.lw-breadcrumb-item' );

        if ( !item ) {
            return;
        }

        that._dragDrop.items = that._items;
        that._dragDrop.capture( item, event );
    }

    /**
     * container transitionend handler.
     */
    _containerTransitionendHandler( event ) {
        const that = this;

        if ( that._edgeMacFF && event.target === that.templateContainer &&
            !that._minimizedDropDownOpened && that.hasAnimation ) {
            that.templateContainer.classList.add( 'not-in-view' );
        }
    }

    /**
     * hamburger icon click handler.
     */
    _hamburgerIconClickHandler() {
        const that = this;

        if ( that._minimizedDropDownOpened ) {
            that.$hamburgerIcon.removeClass( 'lw-close-button' );
            that.templateContainer.classList.add( 'lw-visibility-hidden' );
            that.$.hamburgerIcon.setAttribute( 'aria-expanded', false );
            that._minimizedDropDownOpened = false;
        }
        else {
            that.$hamburgerIcon.addClass( 'lw-close-button' );

            if ( that._edgeMacFF ) {
                that.templateContainer.classList.remove( 'not-in-view' );
            }

            that.templateContainer.classList.remove( 'lw-visibility-hidden' );
            that.$.hamburgerIcon.setAttribute( 'aria-expanded', true );
            that._minimizedDropDownOpened = true;
        }
    }

    /**
     * document key up handler.
     */
    _documentKeyUpHandler( event ) {
        if ( event.key === 'Escape' ) {
            this.dragDrop.removeFeedback( event );
        }
    }

    /**
     * document move handler.
     */
    _documentMoveHandler( event ) {
        const that = this,
            dragDetails = that._dragDrop.dragDetails;

        if ( !dragDetails ) {
            return;
        }

        event.originalEvent.preventDefault();

        that._dragDrop.drag( event );
    }

    /**
     * document up handler.
     */
    _documentUpHandler( event ) {
        const that = this,
            dragDetails = that._dragDrop.dragDetails;

        if ( !dragDetails ) {
            return;
        }

        if ( dragDetails.feedback ) {
            const items = that._items.slice( 0 ),
                itemIndex = items.indexOf( dragDetails.item ),
                newSource = that.dataSource.slice( 0 ),
                toMove = newSource.splice( itemIndex, 1 );

            items.splice( itemIndex, 1 );

            const targetIndex = items.indexOf( dragDetails.target ) + ( dragDetails.before ? 0 : 1 );

            if ( itemIndex !== targetIndex && itemIndex >= 0 ) {
                newSource.splice( targetIndex, 0, toMove[ 0 ] );
                that.dataSource = newSource;
            }

            that._dragDrop.removeFeedback( event );
        }
        else {
            that._dragDrop.removeCapture();
        }
    }

    /**
     * Handles dataSource refresh.
     */
    _handleDataSourceRefresh() {
        const that = this;

        that._items = Array.from( that.$.templateContainer.firstElementChild.children );

        that._items.forEach( ( item, index ) => {
            item.data = that.dataSource[ index ];
        } );

        if ( that.addNewItem ) {
            that._appendNewItemButton();
        }

        that._applyTemplate();
        that._setIndentation();

        that._items.length === 0 ? that.$.placeholder.classList.remove( 'lw-hidden' ) : that.$.placeholder.classList.add( 'lw-hidden' );
    }

    /**
     * Appends "Add new item" button.
     */
    _appendNewItemButton() {
        const that = this,
            addNewItemButton = document.createElement( 'lw-button' );

        addNewItemButton.innerHTML = '+';
        addNewItemButton.animation = that.animation;
        addNewItemButton.disabled = that.disabled;
        addNewItemButton.unfocusable = that.unfocusable;
        addNewItemButton.setAttribute( 'aria-label', 'Add' );
        addNewItemButton.addEventListener( 'click', function () {
            that.$.fireEvent( 'addNewItem' );
        } );
        that.$.templateContainer.firstElementChild.appendChild( addNewItemButton );
        that._addNewItemButton = addNewItemButton;
    }

    /**
     * Sets item indentation.
     */
    _setIndentation() {
        const that = this,
            items = that._items.slice( 0 );

        if ( that._addNewItemButton ) {
            items.push( that._addNewItemButton );
        }

        if ( items.length === 0 ) {
            return;
        }

        let previousTop = items[ 0 ].offsetTop,
            level = 0;

        items.forEach( function ( item ) {
            item.style.marginLeft = item.style.marginRight = null;
        } );

        if ( that._minimized ) {
            return;
        }

        for ( let i = 1; i < items.length; i++ ) {
            const item = items[ i ],
                top = items[ i ].offsetTop;

            if ( top > previousTop ) {
                previousTop = top;
                level++
                item.style[ 'margin' + ( that.rightToLeft ? 'Right' : 'Left' ) ] = ( level * 10 ) + 'px';
            }
        }
    }

    /**
     * Applies item template.
     */
    _applyTemplate() {
        const that = this,
            itemTemplate = that.itemTemplate;

        if ( itemTemplate === null ) {
            return;
        }

        let potentialHTMLTemplate;

        if ( itemTemplate instanceof HTMLTemplateElement ) {
            potentialHTMLTemplate = itemTemplate;
        }
        else {
            potentialHTMLTemplate = document.getElementById( itemTemplate );
        }

        if ( potentialHTMLTemplate !== null && potentialHTMLTemplate instanceof HTMLTemplateElement ) {
            const templateContent = document.importNode( potentialHTMLTemplate.content, true ),
                div = document.createElement( 'div' );

            div.appendChild( templateContent );

            const templateText = div.innerHTML;

            for ( let i = 0; i < that._items.length; i++ ) {
                const dataSource = that.dataSource,
                    label = dataSource[ i ].label,
                    value = dataSource[ i ].value,
                    labelElement = that._items[ i ].firstElementChild;

                labelElement.innerHTML = templateText.replace( /{{label}}/g, label ).replace( /{{value}}/g, value );
            }
        }
    }
} );
