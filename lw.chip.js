
/**
 * Chip item custom element.
 */
LW('lw-chip', class Chip extends LW.ContentElement {
    // Chip item's properties.
    static get properties() {
        return {
            'avatar': {
                value: null,
                type: 'string?'
            },
            'closeButton': {
                value: false,
                type: 'boolean'
            },
            'itemTemplate': {
                value: null,
                type: 'any?',
                reflectToAttribute: false
            },
            'value': {
                value: '',
                type: 'string'
            }
        };
    }

    /**
     * Chip item's event listeners.
     */
    static get listeners() {
        return {
            'click': '_clickHandler',
            'keydown': '_keyDownHandler'
        };
    }

    /**
     * CSS files needed for the element (ShadowDOM)
     */
    static get styleUrls() {
        return [
            'lw.chip.css'
        ]
    }

    /**
     * Chip's HTML template.
     */
    template() {
        return `<div id="container" role="presentation">
                    <span id="avatar" class="lw-avatar">[[avatar]]</span><!--
                --><span id="value" class="lw-value" inner-h-t-m-l="[[innerHTML]]"><content></content></span><!--
                --><span id="closeButton" class="lw-close-button" role="button" aria-label="Close"></span>
            </div>`;
    }

    /**
    * Updates the Chip when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value.
    * @param {number/string} newValue The new entered value.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);
        const that = this;

        switch (propertyName) {
            case 'disabled':
            case 'unfocusable':
                that._setFocusable();
                break;
            case 'avatar':
                that.itemTemplate ? that._setAvatar(that._customAvatar) : that._setAvatar(that.$.avatar);
                break;
            case 'itemTemplate':
                that._applyTemplate();
                break;
            case 'value':
                if (that.itemTemplate) {
                    that._applyTemplate();
                }
                else {
                    that.$.value.innerHTML = newValue || '';
                }
                break;
        }
    }

    render() {
        const that = this;

        that.value = that.value ? that.value : that.innerHTML;
        that._applyTemplate();
        that._setFocusable();

        super.render();
    }

    close() {
        const that = this;

        that.$.fireEvent('close', { 'value': that.value });
        that.parentElement.removeChild(that);
    }

    _applyTemplate() {
        const that = this;
        let template = that.itemTemplate;

        if (!template) {
            that.$.value.innerHTML = that.value;
            that._setAvatar(that.$.avatar);

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
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        let templateContent = template.innerHTML;

        that.$.container.innerHTML = templateContent.replace(/{{\s*value\s*}}/g, that.value);
        that._customAvatar = that.$.container.querySelector('.lw-avatar');
        that._setAvatar(that._customAvatar);
    }

    _clickHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        const target = that.enableShadowDOM ? that.shadowRoot.elementFromPoint(event.pageX, event.pageY) : event.target;

        if (!target.closest || !target.closest('.lw-close-button')) {
            return;
        }

        that.close();
    }

    /**
     * KeyDown handler.
     */
    _keyDownHandler(event) {
        const that = this;

        let key = event.key;

        if (that.disabled || that.readonly || key !== 'Delete') {
            return;
        }

        that.close();
    }

    _setAvatar(element) {
        if (!element) {
            return;
        }

        const that = this,
            isAvatarImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(that.avatar);

        element.innerHTML = isAvatarImage ? `<img src="${that.avatar}" aria-label="${that.value ? 'Avatar of ' + that.value : 'Avatar'}" />` : (that.avatar || '');
    }

    /**
    * Set tabIndex.
    */
    _setFocusable() {
        const that = this;

        if (that.disabled || that.unfocusable) {
            that.removeAttribute('tabindex');
            return;
        }

        that.tabIndex = that.tabIndex > 0 ? that.tabIndex : 0;
    }
});