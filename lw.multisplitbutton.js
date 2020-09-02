
/**
 * Multi Split Button custom element.
 */
LW('lw-multi-split-button', class MultiSplitButton extends LW.DropDownList {
    //Multi Split Button's properties.
    static get properties() {
        return {
            'buttonsDataSource': {
                value: [],
                type: 'array'
            },
            'dropDownOpenMode': {
                allowedValues: ['none', 'dropDownButton', 'auto'],
                value: 'dropDownButton',
                type: 'string'
            }
        };
    }

    template() {
        return `<div id="container" role="presentation">
                    <span class="lw-label" id="label">[[label]]</span>
                    <div id="content" class="lw-content" role="presentation">
                        <div id="actionButton" class ="lw-input lw-action-button" role="presentation">
                            <template>
                                <div class="lw-multi-split-button-buttons" *items={{buttonsDataSource}} role="presentation"><span class="lw-action-split-button" inner-H-T-M-L={{item}} role="button"></span></div>
                            </template>
                        </div>
                        <span id="dropDownButton" class="lw-drop-down-button" role="button" aria-label="Toggle popup">
                            <span class ="lw-drop-down-button-icon" id="arrow" aria-hidden="true"></span>
                        </span>
                        <div id="dropDownContainer" class="lw-drop-down lw-drop-down-container lw-visibility-hidden" role="presentation">
                            <lw-list-box id="listBox" unfocusable
                                    animation="[[animation]]"
                                    data-source="[[dataSource]]"
                                    disabled="[[disabled]]"
                                    display-loading-indicator="[[displayLoadingIndicator]]"
                                    display-member="[[displayMember]]"
                                    filterable="[[filterable]]"
                                    filter-mode="[[filterMode]]"
                                    filter-input-placeholder="[[filterInputPlaceholder]]"
                                    grouped="[[grouped]]"
                                    group-member="[[groupMember]]"
                                    item-height="[[itemHeight]]"
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

    static get listeners() {
        return {
            'actionButton.down': '_buttonsDownHandler',
            'actionButton.mouseenter': '_buttonsMouseEventsHandler',
            'actionButton.move': '_buttonsMouseEventsHandler',
            'actionButton.mouseleave': '_buttonsMouseEventsHandler',
            'dropDownButton.mouseenter': '_dropDownButtonMouseEventsHandler',
            'dropDownButton.mouseleave': '_dropDownButtonMouseEventsHandler',
            'actionButton.focus': '_focusEventHandler',
            'actionButton.blur': '_blurEventHandler',
            'dropDownButton.focus': '_focusEventHandler',
            'dropDownButton.blur': '_blurEventHandler'
        }
    }

    /**
   * CSS files needed for the element (ShadowDOM)
   */
    static get styleUrls() {
        return [
            'lw.dropdown.css',
            'lw.multisplitbutton.css'
        ]
    }

    /**
     * ActionButton / DropDownButton Blur event handler
     */
    _blurEventHandler() {
        const that = this;

        that.removeAttribute('focus');

        if (!that._preventDropDownClose) {
            that.close();
        }
    }

    /**
     * ActionButton / DropDownButton Focus event handler
     */
    _focusEventHandler() {
        this.setAttribute('focus', '');
    }

    _documentUpHandler(event) {
        const that = this;

        super._documentUpHandler(event);

        const splitButtons = (that.shadowRoot || that).querySelectorAll('.lw-action-split-button');

        for (let i = 0; i < splitButtons.length; i++) {
            const splitButton = splitButtons[i];

            splitButton.removeAttribute('active');
        }

        that.removeAttribute('active');
    }

    _dropDownButtonMouseEventsHandler(event) {
        const that = this;

        if (event.type === 'mouseleave') {
            that.$.dropDownButton.removeAttribute('hover');
            that.removeAttribute('hover');
        }
        else {
            that.$.dropDownButton.setAttribute('hover', '');
            that.setAttribute('hover', '');
        }
    }

    _buttonsDownHandler(event) {
        const that = this;

        const splitButtons = (that.shadowRoot || that).querySelectorAll('.lw-action-split-button');

        for (let i = 0; i < splitButtons.length; i++) {
            const splitButton = splitButtons[i];
            const rect = splitButton.getBoundingClientRect();

            if (event.type !== 'mouseleave') {
                that.setAttribute('active', '');
                splitButtons[i].removeAttribute('active');
                if (rect.left <= event.pageX && event.pageX <= rect.width + rect.left) {
                    splitButtons[i].setAttribute('active', '');
                    that.$.fireEvent('buttonClick', {
                        'index': i,
                        'label': that.buttonsDataSource[i]
                    });
                }
            }
            else {
                splitButtons[i].removeAttribute('active');
                that.removeAttribute('active', '');
            }
        }
    }

    _buttonsMouseEventsHandler(event) {
        const that = this;

        const splitButtons = (that.shadowRoot || that).querySelectorAll('.lw-action-split-button');

        for (let i = 0; i < splitButtons.length; i++) {
            const splitButton = splitButtons[i];
            const rect = splitButton.getBoundingClientRect();

            if (event.type !== 'mouseleave') {
                that.setAttribute('hover', '');
                splitButtons[i].removeAttribute('hover');
                if (rect.left <= event.pageX && event.pageX <= rect.width + rect.left) {
                    splitButtons[i].setAttribute('hover', '');
                }
            }
            else {
                splitButtons[i].removeAttribute('hover');
                that.removeAttribute('hover', '');
            }
        }
    }


    _applySelection() {
        const that = this;

        if (that.buttonsDataSource.length === 0) {
            if (that.selectionDisplayMode === 'placeholder' || that.selectedIndexes.length === 0) {
                (that.shadowRoot || that).querySelector('.lw-template-container').innerHTML = that.placeholder;
                return;
            }

            if (!that.$.listBox._items || that.$.listBox._items.length === 0) {
                return;
            }

            (that.shadowRoot || that).querySelector('.lw-template-container').innerHTML = '<div class="lw-multi-split-button-buttons"><span class="lw-action-split-button"></span></div>';
            that.$.actionButton.querySelector('.lw-action-split-button').appendChild(that._createToken());
        }
    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        if (propertyName === 'dataSource' || propertyName === 'displayMember') {
            //Check the new listBox size
            that._setDropDownSize();
            that._positionDetection.checkBrowserBounds('vertically');
            that._positionDetection.positionDropDown();
            that._positionDetection.checkBrowserBounds('horizontally');
        }
        else {
            super.propertyChangedHandler(propertyName, oldValue, newValue);
        }
    }

    /**
     * Sets WAI-ARIA relations.
     */
    _setAriaRelations() {
        const that = this;

        that.setAttribute('role', 'group');
        that.setAttribute('aria-describedby', that.$.hint.id);
        that.setAttribute('aria-labelledby', that.$.label.id);

        that.getElementsByClassName('lw-template-container')[0].setAttribute('role', 'presentation');

        const dropDownButton = that._ariaButton = that.$.dropDownButton;

        dropDownButton.setAttribute('aria-haspopup', 'listbox');
        dropDownButton.setAttribute('aria-expanded', that.opened);
        dropDownButton.setAttribute('aria-owns', that.$.listBox.id);
    }
});
