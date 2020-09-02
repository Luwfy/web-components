
/**
 * Pager custom element.
 */
LW('lw-pager', class Pager extends LW.BaseElement {
    // Pager's properties.
    static get properties() {
        return {
            'autoEllipsis': {
                value: 'none',
                type: 'string',
                // After - displays AutoEllipsis only after the Numeric Buttons.
                // Before - displays AutoEllipsis only before the Numeric Buttons.
                // Both - displays AutoEllipsis before and after the Numeric Buttons.
                // None - doesn't display AutoEllipsis.
                allowedValues: ['none', 'before', 'after', 'both']
            },
            'messages': {
                value: {
                    'en': {
                        'firstButton': 'First',
                        'lastButton': 'Last',
                        'previousButton': 'Previous',
                        'nextButton': 'Next',
                        'navigateToLabel': 'Go to:',
                        'pageSizeLabel': 'Show:',
                        'navigateToInputPlaceholder': '',
                        'ellipsis': '...',
                        'summaryString': 'of',
                        'summaryPrefix': 'of',
                        'summarySuffix': ''
                    }
                },
                type: 'object',
                extend: true
            },
            'navigationButtonsPosition': {
                value: 'both',
                allowedValues: ['near', 'far', 'both'],
                type: 'string'
            },
            'navigationInputPosition': {
                value: 'far',
                allowedValues: ['near', 'far'],
                type: 'string'
            },
            'pageIndex': {
                value: 0,
                type: 'number'
            },
            'pageIndexSelectors': {
                value: 0,
                type: 'any'
            },
            'pagesCount': {
                value: 100,
                type: 'number'
            },
            'pageSize': {
                value: 10,
                type: 'number'
            },
            'pageSizeSelectorPosition': {
                value: 'far',
                allowedValues: ['near', 'far'],
                type: 'string'
            },
            'pageSizeSelectorDataSource': {
                value: [10, 25, 50],
                type: 'array'
            },
            'showPrevNextNavigationButtons': {
                value: false,
                type: 'boolean'
            },
            'showFirstLastNavigationButtons': {
                value: false,
                type: 'boolean'
            },
            'showNavigationButtonLabels': {
                value: false,
                type: 'boolean'
            },
            'showNavigationInput': {
                value: false,
                type: 'boolean'
            },
            'showSummary': {
                value: false,
                type: 'boolean'
            },
            'showPageSizeSelector': {
                value: false,
                type: 'boolean'
            },
            'showPageIndexSelectors': {
                value: false,
                type: 'boolean'
            },
            'summaryPosition': {
                value: 'far',
                allowedValues: ['near', 'far'],
                type: 'string'
            },
            'totalRecords': {
                value: null,
                type: 'int?'
            }
        };
    }

    /**
     * Pager's event listeners.
     */
    static get listeners() {
        return {
            'click': '_navigationButtonsClickHandler',
            'nextEllipsisButton.click': '_nextEllipsisButtonClickHandler',
            'previousEllipsisButton.click': '_previousEllipsisButtonClickHandler',
            'down': '_navigationButtonsDownHandler',
            'navigateToInput.change': '_navigateToInputChangeHandler',
            'nextButton.pointerenter': '_updateInBoundsFlag',
            'nextButton.pointerleave': '_updateInBoundsFlag',
            'pageIndexSelectorsContainer.click': '_pageIndexSelectorsContainerClickHandler',
            'pageSizeSelector.change': '_pageSizeSelectorChangeHandler',
            'previousButton.pointerenter': '_updateInBoundsFlag',
            'previousButton.pointerleave': '_updateInBoundsFlag',
            'keydown': '_keyDownHandler',
            'resize': '_resizeHandler',
            'document.up': '_stopRepeat'
        };
    }

    static get requires() {
        return {
            'LW.DropDownList': 'lw.dropdownlist.js'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.dropdown.css',
            'lw.dropdownlist.css',
            'lw.pager.css'
        ]
    }

    /**
     * Pager's HTML template.
     */
    template() {
        return `<div id="container" role="presentation">
                    <div id="nearButtonsContainer" class="lw-pager-near-buttons-container" role="presentation">
                        <div id="firstButton" class="lw-first-button lw-pager-button lw-unselectable" role="button" aria-label="First"></div>
                        <div id="previousButton" class="lw-previous-page-button lw-pager-button lw-unselectable" role="button" aria-label="Previous"></div>
                    </div>
                    <div id="middleButtonsContainer" class="lw-pager-middle-buttons-container" role="presentation">
                        <span id="previousEllipsisButton" class="lw-previous-ellipsis-button lw-pager-page-index-selector" role="button" aria-label="Previous group of pages"></span>
                        <div id="pageIndexSelectorsContainer" tabindex="0" class="lw-pager-page-index-selectors-container" role="list"></div>
                        <span id="nextEllipsisButton" class="lw-next-ellipsis-button lw-pager-page-index-selector" role="button" aria-label="Next group of pages"</span>
                    </div>
                    <div id="farButtonsContainer" class="lw-pager-far-buttons-container" role="presentation">
                        <div id="nextButton" class="lw-next-page-button lw-pager-button lw-unselectable" role="button" aria-label="Next"></div>
                        <div id="lastButton" class="lw-last-button lw-pager-button lw-unselectable" role="button" aria-label="Last"></div>
                    </div>
                    <div id="pagerInputAndLabelContainer" class="lw-pager-input-and-label-container" role="presentation">
                        <span id="navigateToLabel" class="lw-pager-label"></span>
                        <input type="text" id="navigateToInput" class="lw-pager-input lw-input" />
                    </div>
                    <div id="pagerSizeSelectorAndLabelContainer" class="lw-pager-size-selector-and-label-container">
                        <span id="pageSizeLabel" class="lw-pager-label"></span>
                        <lw-drop-down-list id="pageSizeSelector" class="lw-page-size-selector"
                                animation="[[animation]]"
                                data-source="[[pageSizeSelectorDataSource]]"
                                right-to-left="[[rightToLeft]]"
                                drop-down-height="auto"
                                selection-mode="one"
                                selected-indexes=[0]
                                disabled="[[disabled]]">
                        </lw-drop-down-list>
                    </div>
                    <span id="pagerSummaryContainer" class="lw-pager-summary-container lw-pager-label"></span>
                </div>`;
    }

    /**
     * Called when the element is ready.
     */
    ready() {
        super.ready();
    }

    render() {
        const that = this;

        if (!that.$.navigateToLabel.id) {
            that.$.navigateToLabel.id = that.id + 'NavigateToLabel';
        }

        if (!that.$.pageSizeLabel.id) {
            that.$.pageSizeLabel.id = that.id + 'PageSizeLabel';
        }

        if (!that.$.pagerSummaryContainer.id) {
            that.$.pagerSummaryContainer.id = that.id + 'SummaryContainer';
        }

        that.setAttribute('role', 'navigation');
        that.setAttribute('aria-labelledby', that.$.pagerSummaryContainer.id);
        that.$.navigateToInput.setAttribute('aria-labelledby', that.$.navigateToLabel.id);
        that.$.pageSizeSelector.setAttribute('aria-labelledby', that.$.pageSizeLabel.id);

        that._render();

        super.render();
    }

    refresh() {
        const that = this;

        that._render();
    }
    /**
     * Called when a property is changed.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        switch (propertyName) {
            case 'navigationButtonsPosition':
                that._renderButtons();
                return;
            case 'navigationInputPosition':
            case 'pageSizeSelectorPosition':
            case 'summaryPosition':
            case 'totalRecords':
                that._renderSettings();
                return;
        }

        that._render();
    }

    /**
    * Moves to the next page.
    */
    next() {
        const that = this;

        that.navigateTo(that.pageIndex + 1);
    }

    /**
    * Moves to the previous page.
    */
    prev() {
        const that = this;

        that.navigateTo(that.pageIndex - 1);
    }

    beginUpdate() {
        const that = this;

        that._updating = true;
    }

    endUpdate() {
        const that = this;

        that._updating = false;
        that._render();
    }

    _render() {
        const that = this;

        if (that._updating) {
            return;
        }

        that.$.navigateToInput.value = (1 + that.pageIndex).toString();
        that._renderButtons();
        that._renderPageIndexSelectors();
        that._renderSettings();
        that._renderVisibility();

        that._localize();

        if (that.$.pageSizeSelector && that.showPageSizeSelector) {
            const index = that.pageSizeSelectorDataSource.indexOf(that.pageSize);

            if (index >= 0) {
                that.$.pageSizeSelector.selectedIndexes = [index];
            }
        }
    }


    _resizeHandler() {
        const that = this;

        that._renderVisibility();
    }

    _renderVisibility() {
        const that = this;
        const pagerWidth = that.offsetWidth - 20;

        that._pageIndexSelectorsVisibleCount = that._pageIndexSelectorsCount;

        if (that.showSummary) {
            that.$pagerSummaryContainer.removeClass('lw-hidden');
        }
        else {
            that.$pagerSummaryContainer.addClass('lw-hidden');
        }

        if (that.showPageIndexSelectors) {
            that.$middleButtonsContainer.removeClass('lw-hidden');
        }
        else {
            that.$middleButtonsContainer.addClass('lw-hidden');
        }

        if (that.showNavigationInput) {
            that.$navigateToLabel.removeClass('lw-hidden');
            that.$navigateToInput.removeClass('lw-hidden');
        }
        else {
            that.$navigateToLabel.addClass('lw-hidden');
            that.$navigateToInput.addClass('lw-hidden');
        }

        if (that.showPageSizeSelector) {
            that.$pageSizeLabel.removeClass('lw-hidden');
            that.$pageSizeSelector.removeClass('lw-hidden');
        }
        else {
            that.$pageSizeLabel.addClass('lw-hidden');
            that.$pageSizeSelector.addClass('lw-hidden');
        }

        if (that.showFirstLastNavigationButtons) {
            that.$firstButton.removeClass('lw-hidden');
            that.$lastButton.removeClass('lw-hidden');
        }
        else {
            that.$firstButton.addClass('lw-hidden');
            that.$lastButton.addClass('lw-hidden');
        }

        if (that.showPrevNextNavigationButtons) {
            that.$previousButton.removeClass('lw-hidden');
            that.$nextButton.removeClass('lw-hidden');
        }
        else {
            that.$previousButton.addClass('lw-hidden');
            that.$nextButton.addClass('lw-hidden');
        }

        that.$previousEllipsisButton.addClass('lw-hidden');
        that.$nextEllipsisButton.addClass('lw-hidden');

        if (that.autoEllipsis !== 'after' && that.autoEllipsis !== 'none' && that.pageIndex >= that._pageIndexSelectorsCount) {
            that.$previousEllipsisButton.removeClass('lw-hidden');
        }

        if (that.autoEllipsis !== 'before' && that.autoEllipsis !== 'none' && that.pageIndex < that.pagesCount - that._pageIndexSelectorsCount) {
            that.$nextEllipsisButton.removeClass('lw-hidden');
        }

        for (let i = 0; i < that._pageIndexSelectorsCount; i++) {
            if (!that.$.pageIndexSelectorsContainer.children[i]) {
                break;
            }

            that.$.pageIndexSelectorsContainer.children[i].classList.remove('lw-hidden');
        }

        const pagerSummaryWidth = that.$.pagerSummaryContainer.offsetWidth ? Math.max(100, that.$.pagerSummaryContainer.offsetWidth) : 0;

        let totalWidth = that.$.nearButtonsContainer.offsetWidth + that.$.middleButtonsContainer.offsetWidth + that.$.farButtonsContainer.offsetWidth + pagerSummaryWidth + that.$.pagerInputAndLabelContainer.offsetWidth + that.$.pagerSizeSelectorAndLabelContainer.offsetWidth;

        if (totalWidth > 0 && totalWidth > pagerWidth) {
            totalWidth -= that.$.pagerSummaryContainer.offsetWidth;

            // hides summary.
            that.$pagerSummaryContainer.addClass('lw-hidden');

            if (totalWidth > pagerWidth) {
                totalWidth -= that.$.navigateToLabel.offsetWidth;
                totalWidth -= that.$.navigateToInput.offsetWidth;

                // hides navigation input and label.
                that.$navigateToLabel.addClass('lw-hidden');
                that.$navigateToInput.addClass('lw-hidden');

                if (totalWidth > pagerWidth) {
                    totalWidth -= that.$.pageSizeLabel.offsetWidth;
                    totalWidth -= that.$.pageSizeSelector.offsetWidth;

                    // hides page size selector and label.
                    that.$pageSizeLabel.addClass('lw-hidden');
                    that.$pageSizeSelector.addClass('lw-hidden');

                    if (totalWidth > pagerWidth) {
                        that.$previousEllipsisButton.addClass('lw-hidden');
                        that.$nextEllipsisButton.addClass('lw-hidden');

                        totalWidth -= that.$.previousEllipsisButton.offsetWidth;
                        totalWidth -= that.$.nextEllipsisButton.offsetWidth;

                        for (let i = that._pageIndexSelectorsCount - 1; i >= 0; i--) {
                            const pageIndexSelector = that.$.pageIndexSelectorsContainer.children[i];

                            if (totalWidth < pagerWidth || !pageIndexSelector) {
                                break;
                            }

                            that._pageIndexSelectorsVisibleCount--;
                            totalWidth -= pageIndexSelector.offsetWidth;

                            if (pageIndexSelector.hasAttribute('selected')) {
                                continue;
                            }

                            pageIndexSelector.classList.add('lw-hidden');
                        }
                    }

                    if (totalWidth > pagerWidth && that.showFirstLastNavigationButtons) {
                        that.$firstButton.addClass('lw-hidden');
                        that.$lastButton.addClass('lw-hidden');
                    }
                }
            }
        }
    }

    _renderSettings() {
        const that = this,
            totalRecords = that.totalRecords;

        let summaryStart = that.pageIndex * that.pageSize;
        let summaryEnd = (that.pageIndex + 1) * that.pageSize;
        let totalSummaryEnd = that.pagesCount * that.pageSize;

        if (totalRecords !== null) {
            if (summaryEnd === totalSummaryEnd) {
                summaryEnd = totalRecords;
            }

            totalSummaryEnd = totalRecords;

            if (totalRecords === 0) {
                summaryStart = -1;
            }
        }

        that.$pagerSummaryContainer.removeClass('near');
        that.$pagerSizeSelectorAndLabelContainer.removeClass('near');
        that.$pagerInputAndLabelContainer.removeClass('near');

        if (that.summaryPosition === 'near') {
            that.$pagerSummaryContainer.addClass('near');
        }

        if (that.pageSizeSelectorPosition === 'near') {
            that.$pagerSizeSelectorAndLabelContainer.addClass('near');
        }

        if (that.navigationInputPosition === 'near') {
            that.$pagerInputAndLabelContainer.addClass('near');
        }

        that.$.pagerSummaryContainer.innerHTML = '<span class="lw-summary-start" role="presentation">' + (1 + summaryStart) + '</span> <span class="lw-summary-hyphen" role="presentation">-</span> <span class="lw-summary-end" role="presentation">' + (summaryEnd) + '</span>' +
            '<span class="lw-summary-prefix" role="presentation">' + that.localize('summaryPrefix') + '</span> <span class="lw-summary-total-end" role="presentation">' + totalSummaryEnd + '</span> <span class="lw-summary-suffix" role="presentation">' + that.localize('summarySuffix') + '</span>';
    }

    get _pageIndexSelectorsCount() {
        const that = this;

        let pageIndexSelectorsCount = parseInt(that.pageIndexSelectors);

        if (Array.isArray(that.pageIndexSelectors)) {
            pageIndexSelectorsCount = that.pageIndexSelectors.length;
        }

        return pageIndexSelectorsCount;
    }

    /**
     * Creates page with pageIndexSelectors, based on pageIndexSelectors and pageIndexSelectors-per-page properties.
     */
    _renderPageIndexSelectors() {
        const that = this;

        if (that.pageIndex < 0 || that.pageIndex >= that.pagesCount) {
            that.$.pageIndexSelectorsContainer.innerHTML = '';
            return;
        }

        that.$.pageIndexSelectorsContainer.innerHTML = '';

        let isArray = false;

        if (Array.isArray(that.pageIndexSelectors)) {
            isArray = true;
        }

        let pageIndexSelectorStartIndex = Math.floor(that.pageIndex / that._pageIndexSelectorsCount) * that._pageIndexSelectorsCount;
        let pageIndexSelectorEndIndex = Math.min(that.pagesCount, pageIndexSelectorStartIndex + that._pageIndexSelectorsCount);
        let pageIndexSelectorIndex = 0;

        for (let i = pageIndexSelectorStartIndex; i < pageIndexSelectorEndIndex; i++) {
            const newPageIndexSelector = document.createElement('span');
            let newPageIndexSelectorContent = i + 1;

            newPageIndexSelector.className = 'lw-pager-page-index-selector';

            if (isArray) {
                const pageIndexSelector = that.pageIndexSelectors[pageIndexSelectorIndex++];

                if (pageIndexSelector) {
                    if (pageIndexSelector.label) {
                        newPageIndexSelectorContent = that.pageIndexSelectors[i].label;
                    }
                    else if (typeof pageIndexSelector === 'string') {
                        newPageIndexSelectorContent = pageIndexSelector;
                    }

                    if (pageIndexSelector.value) {
                        newPageIndexSelector.setAttribute('value', that.pageIndexSelectors[i].value);
                    }
                }
            }

            newPageIndexSelector.index = i;
            newPageIndexSelector.innerHTML = newPageIndexSelectorContent;
            newPageIndexSelector.setAttribute('role', 'listitem');

            that.$.pageIndexSelectorsContainer.appendChild(newPageIndexSelector);

            if (i === that.pageIndex) {
                newPageIndexSelector.classList.add('lw-selected');
                newPageIndexSelector.setAttribute('selected', '');
                newPageIndexSelector.setAttribute('aria-current', 'page');
            }
        }
    }

    /**
    * Last button click handler.
    */
    _lastButtonClickHandler() {
        const that = this;

        that.last();
    }

    last() {
        const that = this;

        that.navigateTo(that.pagesCount - 1);
    }

    /**
    * First button click handler.
    */
    _firstButtonClickHandler() {
        const that = this;

        that.first();
    }

    first() {
        const that = this;

        that.navigateTo(0);
    }

    _renderButtons() {
        const that = this;

        if (that.pageIndex === 0) {
            that.$.firstButton.setAttribute('disabled', '');
            that.$.previousButton.setAttribute('disabled', '');
        }
        else {
            that.$.firstButton.removeAttribute('disabled');
            that.$.previousButton.removeAttribute('disabled');
        }

        if (that.pageIndex === that.pagesCount - 1) {
            that.$.nextButton.setAttribute('disabled', '');
            that.$.lastButton.setAttribute('disabled', '');
        }
        else {
            that.$.nextButton.removeAttribute('disabled');
            that.$.lastButton.removeAttribute('disabled');
        }

        if (that.pagesCount <= 0) {
            that.$.firstButton.setAttribute('disabled', '');
            that.$.previousButton.setAttribute('disabled', '');
            that.$.nextButton.setAttribute('disabled', '');
            that.$.lastButton.setAttribute('disabled', '');
        }

        that.$nearButtonsContainer.removeClass('far');
        that.$farButtonsContainer.removeClass('far');
        that.$nearButtonsContainer.removeClass('near');
        that.$farButtonsContainer.removeClass('near');

        switch (that.navigationButtonsPosition) {
            case 'near':
                that.$nearButtonsContainer.addClass('near');
                that.$farButtonsContainer.addClass('near');
                break;
            case 'far':
                that.$nearButtonsContainer.addClass('far');
                that.$farButtonsContainer.addClass('far');
                break;
            case 'both':
                that.$nearButtonsContainer.addClass('near');
                that.$farButtonsContainer.addClass('far');
                break;
        }
    }


    _navigateToInputChangeHandler() {
        const that = this;

        let pageIndex = parseInt(that.$.navigateToInput.value) - 1;

        if (isNaN(pageIndex)) {
            that.$.navigateToInput.value = '1';
            pageIndex = parseInt(that.$.navigateToInput.value - 1);
        }

        that.navigateTo(pageIndex);
    }

    _pageIndexSelectorsContainerClickHandler(event) {
        const that = this,
            closestPageIndexSelector = that.enableShadowDOM ? event.composedPath()[0].closest('.lw-pager-page-index-selector') : event.target.closest('.lw-pager-page-index-selector');

        if (!closestPageIndexSelector || closestPageIndexSelector.classList.contains('lw-selected')) {
            return;
        }

        that.navigateTo(closestPageIndexSelector.index);
    }

    _pageSizeSelectorChangeHandler(event) {
        const that = this;

        if (!that.showPageSizeSelector || that.disabled || that._updating) {
            return;
        }

        that.pageSize = parseInt(event.detail.value);

        that.$.fireEvent('pageSizeChanged', {
            'value': parseInt(event.detail.value)
        });
    }

    /**
    * Pager's keydown event handler.
    */
    _keyDownHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        if ((that.enableShadowDOM ? (that.shadowRoot.activeElement || document.activeElement) : document.activeElement) === that.$.navigateToInput) {
            return;
        }

        if (that.$.pageSizeSelector.getAttribute('focus') !== null) {
            return;
        }


        switch (event.key) {
            case 'End':
                that.last();
                event.preventDefault();
                break;
            case 'Home':
                that.first();
                event.preventDefault();
                break;
            case 'PageDown':
            case 'ArrowDown':
            case 'ArrowLeft':
                that.prev();
                event.preventDefault();
                break;
            case 'PageUp':
            case 'ArrowUp':
            case 'ArrowRight':
                that.next();
                event.preventDefault();
                break;
        }
    }

    /**
    * Next Page button click handler.
    */
    _nextButtonClickHandler() {
        const that = this;

        that.next();
    }

    /**
    * Previous Page button click handler.
    */
    _previousButtonClickHandler() {
        const that = this;

        that.prev();
    }

    navigateTo(pageIndex) {
        const that = this,
            oldIndex = that.pageIndex;

        if (that.disabled || that.pageIndex === pageIndex || pageIndex < 0 || pageIndex >= that.pagesCount) {
            return;
        }

        that.pageIndex = pageIndex;

        that._render();

        that.$.fireEvent('change', {
            'oldIndex': oldIndex,
            'index': pageIndex
        });
    }

    /**
    * Updates from-to summary block.
    */
    _localize() {
        const that = this,
            buttonsArray = ['firstButton', 'lastButton', 'previousButton', 'nextButton'];

        for (let i = 0; i < buttonsArray.length; i++) {
            const button = that.$[buttonsArray[i]];

            if (!that.showNavigationButtonLabels && i < 2) {
                button.innerHTML = '';
                if (i === 0) {
                    button.classList.add('lw-arrow-left-first');
                }
                else {
                    button.classList.add('lw-arrow-right-last');
                }
            }
            else if (!that.showNavigationButtonLabels && i >= 2) {
                button.innerHTML = '';
                if (i === 2) {
                    button.classList.add('lw-arrow-left');
                }
                else {
                    button.classList.add('lw-arrow-right');
                }
            }
            else {
                button.classList.remove('lw-arrow-left');
                button.classList.remove('lw-arrow-right');
                button.classList.remove('lw-arrow-left-first');
                button.classList.remove('lw-arrow-right-last');

                button.innerHTML = that.localize(buttonsArray[i]);
            }
        }

        that.$.pageSizeLabel.innerHTML = that.localize('pageSizeLabel');
        that.$.navigateToLabel.innerHTML = that.localize('navigateToLabel');
        that.$.previousEllipsisButton.innerHTML = that.localize('ellipsis');
        that.$.nextEllipsisButton.innerHTML = that.localize('ellipsis');
        that.$.navigateToInput.placeholder = that.localize('navigateToInputPlaceholder');
    }

    _nextEllipsisButtonClickHandler() {
        const that = this;

        that.navigateTo(that._pageIndexSelectorsCount + that.pageIndex);
    }

    _previousEllipsisButtonClickHandler() {
        const that = this;

        that.navigateTo(-that._pageIndexSelectorsCount + that.pageIndex);
    }

    /**
    * Updates from-to summary block.
    */
    _navigationButtonsClickHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        const targetElement = that.enableShadowDOM ? event.composedPath()[0].closest('.lw-pager-button') : event.target.closest('.lw-pager-button');

        switch (targetElement) {
            case that.$.firstButton:
                that._firstButtonClickHandler(event);
                break;
            case that.$.lastButton:
                that._lastButtonClickHandler(event);
                break;
            case that.$.previousButton:
                that._previousButtonClickHandler(event);
                break;
            case that.$.nextButton:
                that._nextButtonClickHandler(event);
                break;
        }
    }

    _navigationButtonsDownHandler(event) {
        const that = this,
            targetElement = that.enableShadowDOM ? (event.originalEvent.composedPath()[0].closest('.lw-pager-button') || event.originalEvent.composedPath()[0].closest('.lw-pager-page-index-selector')) :
                (event.originalEvent.target.closest('.lw-pager-button') || event.originalEvent.target.closest('.lw-pager-page-index-selector'));

        if (that.disabled || !targetElement) {
            return;
        }

        if (that.hasRippleAnimation) {
            LW.Utilities.Animation.Ripple.animate(targetElement, event.pageX, event.pageY);
        }

        if (targetElement === that.$.previousButton || targetElement === that.$.nextButton) {
            that._startRepeat(event, targetElement);
        }
    }

    _updateInBoundsFlag(event) {
        const that = this,
            button = that.enableShadowDOM ? event.composedPath()[0] : event.target;

        button._isPointerInBounds = true;

        if (event.type.indexOf('leave') !== -1) {
            button._isPointerInBounds = false;
        }

        const buttons = ('buttons' in event) ? event.buttons : event.which;

        if (buttons !== 1) {
            that._stopRepeat();
        }
    }

    _startRepeat(event, button) {
        const that = this;

        if (!that._initialTimer) {
            that._initialTimer = setTimeout(function () {
                that._repeatTimer = setInterval(() => {
                    if (button._isPointerInBounds) {
                        if (button === that.$.previousButton) {
                            that._previousButtonClickHandler(event);
                        }
                        else {
                            that._nextButtonClickHandler(event);
                        }
                    }
                }, 50);
            }, 150);
        }
    }

    _stopRepeat() {
        const that = this;

        if (that._repeatTimer) {
            clearInterval(that._repeatTimer);
            that._repeatTimer = null;
        }

        if (that._initialTimer) {
            clearTimeout(that._initialTimer);
            that._initialTimer = null;
        }
    }
});
