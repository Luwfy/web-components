
/**
 * Array custom element.
 */
LW('lw-array', class DataArray extends LW.BaseElement {
    /**
     * Array's properties.
     */
    static get properties() {
        return {
            'arrayIndexingMode': {
                value: 'LabVIEW',
                allowedValues: ['LabVIEW', 'JavaScript'],
                type: 'string'
            },
            'changeProperty': {
                value: null,
                type: 'function?'
            },
            'columns': {
                value: 1,
                type: 'number'
            },
            'customWidgetDefaultValue': {
                value: null,
                type: 'any?'
            },
            'dimensions': {
                value: 1,
                type: 'number'
            },
            'elementHeight': {
                value: 25,
                type: 'number'
            },
            'elementTemplate': {
                value: null,
                type: 'function?'
            },
            'elementWidth': {
                value: 75,
                type: 'number'
            },
            'getElementValue': {
                value: null,
                type: 'function?'
            },
            'indexerHeight': {
                value: 25,
                type: 'number'
            },
            'indexerWidth': {
                value: 50,
                type: 'number'
            },
            'messages': {
                value: {
                    'en': {
                        'callbackFunctionRequired': 'lw-array: When "type" is \'custom\', the {{callback}} callback function has to be implemented.'
                    }
                },
                type: 'object',
                extend: true
            },
            'rows': {
                value: 1,
                type: 'number'
            },
            'setElementValue': {
                value: null,
                type: 'function?'
            },
            'showHorizontalScrollbar': {
                value: false,
                type: 'boolean'
            },
            'showIndexDisplay': {
                value: false,
                type: 'boolean'
            },
            'showSelection': {
                value: false,
                type: 'boolean'
            },
            'showVerticalScrollbar': {
                value: false,
                type: 'boolean'
            },
            'type': {
                value: 'none',
                allowedValues: ['none', 'boolean', 'numeric', 'string', 'custom'],
                type: 'string'
            },
            'value': {
                value: null,
                type: 'array?',
                reflectToAttribute: false
            }
        };
    }

    /**
     * Array's event listeners.
     */
    static get listeners() {
        return {
            'resize': '_resizeHandler',
            'horizontalScrollbar.change': '_scrollbarChangeHandler',
            'horizontalScrollbar.click': '_scrollbarClickHandler',
            'verticalScrollbar.change': '_scrollbarChangeHandler',
            'verticalScrollbar.click': '_scrollbarClickHandler'
        };
    }

    /**
     * Array's required files.
     */
    static get requires() {
        return {
            'LW.NumericTextBox': 'lw.numerictextbox.js',
            'LW.ScrollBar': 'lw.scrollbar.js',
            'LW.SwitchButton': 'lw.switchbutton.js',
            'LW.TextBox': 'lw.textbox.js'
        }
    }

    /**
     * Array's HTML template.
     */
    template() {
        return `<div>
                    <div id="indexerContainer" class="lw-indexer-container lw-hidden"></div>
                    <div id="bigContainer" class="lw-big-container lw-array-background">
                        <div id="centralContainer">
                            <div id="mainContainer" class="lw-main-container"></div>
                            <div id="horizontalScrollbarContainer" class="lw-scrollbar-container-horizontal lw-hidden">
                                <lw-scroll-bar id="horizontalScrollbar" animation="[[animation]]" min="0" max="0" value="0" step="1"></lw-scroll-bar>
                            </div>
                        </div>
                        <div id="verticalScrollbarContainer" class="lw-scrollbar-container-vertical lw-hidden">
                            <lw-scroll-bar id="verticalScrollbar" animation="[[animation]]" orientation="vertical" min="0" max="0" value="0" step="1"></lw-scroll-bar>
                        </div>
                    </div>
                </div>`;
    }

    render() {
        const that = this;

        that._id = that.getAttribute('id') || Math.round(Math.random() * 10000);

        that._cachedWidth = that.offsetWidth;
        that._cachedHeight = that.offsetHeight;

        that._coordinates = [];
        that._getDefaultCellValue();
        that._validateProperties();
        that._addInitialDimensions();

        if (that.type !== 'none') {
            that._addElementStructure();
            that._structureAdded = true;
            that._initializeElements(false);
        }

        that._getInitialFill();
        that._updateWidgetWidth();
        that._updateWidgetHeight();

        that._cachedWidth = that.offsetWidth;
        that._cachedHeight = that.offsetHeight;

        super.render();
    }

    /**
     * Adds a dimension to the array.
     */
    addDimension(changeValueDimensions) {
        const that = this;

        if (that._suppressDimensionChange !== true && that.dimensions === 32) {
            return;
        }

        const indexer = document.createElement('lw-numeric-text-box');

        indexer.className = 'lw-array-indexer';
        indexer.style.height = that.indexerHeight + 'px';
        indexer.inputFormat = 'integer';
        indexer.spinButtons = true;
        indexer.min = 0;
        indexer.max = 4294967295;
        indexer.disabled = that.disabled;
        indexer.animation = that.animation;
        indexer.validation = 'interaction';
        indexer.wordLength = 'uint64';
        indexer.onReady = function () {
            indexer.$upButton.addClass('lw-array-indexer-increment');
            indexer.$downButton.addClass('lw-array-indexer-decrement');
        }

        that.$.indexerContainer.insertBefore(indexer, that.$.indexerContainer.children ? that.$.indexerContainer.children[0] : null);

        indexer.$.listen('change', that._indexerChangeHandler.bind(that));

        that._dimensions.push({ index: that._dimensions.length, indexer: indexer });

        if (that.arrayIndexingMode === 'LabVIEW') {
            that._indexers.unshift(indexer);
            that._coordinates.unshift(0);
        }
        else {
            that._indexers.push(indexer);
            that._coordinates.push(0);
        }

        indexer.dimension = that._indexers.length - 1;

        if (that._suppressDimensionChange !== true) {
            that.dimensions += 1;
            that.$.fireEvent('dimensionChange', { 'type': 'add' });
        }

        if (that._initialDimensions !== true && changeValueDimensions !== false) {
            that._validateValueArrayDimensions();

            if (that.arrayIndexingMode === 'LabVIEW') {
                that._filledUpTo.unshift(0);
            }
            else {
                that._filledUpTo.push(0);
            }

            if (that._oneDimensionSpecialCase === true) {
                that._oneDimensionSpecialCase = false;
                that.$.verticalScrollbar.value = 0;
                that._scroll();
            }
        }

        if (that._absoluteSelectionStart !== undefined) {
            if (that.arrayIndexingMode === 'LabVIEW') {
                that._absoluteSelectionStart.unshift(0);
            }
            else {
                that._absoluteSelectionStart.push(0);
            }
        }

        if (that._absoluteSelectionEnd !== undefined) {
            if (that.arrayIndexingMode === 'LabVIEW') {
                that._absoluteSelectionEnd.unshift(0);
            }
            else {
                that._absoluteSelectionEnd.push(0);
            }
        }

        if (!that._initialDimensions) {
            that._refreshSelection();
        }

        if (that._suppressDimensionChange === false && that.showIndexDisplay === true && (that.dimensions * (that.indexerHeight + 4) - 2 > that._cachedHeight)) {
            that._updateWidgetHeight('dimensions');
        }
    }

    /**
     * Clears the selection.
     */
    clearSelection() {
        const that = this;

        that._absoluteSelectionStart = undefined;
        that._absoluteSelectionEnd = undefined;

        if (that.showSelection) {
            that._clearSelection();
        }
    }

    /**
     * Copies the value of an array element to the clipboard.
     *
     * @param {Number} rowVisibleIndex The visible index of the row (y coordinate) of the element.
     * @param {Number} columnVisibleIndex The visible index of the column (x coordinate) of the element.
     */
    copyElementValueToClipboard(rowVisibleIndex, columnVisibleIndex) {
        const that = this,
            valueInCell = that._getValueInCell(rowVisibleIndex, columnVisibleIndex);

        if (valueInCell !== undefined) {
            try {
                const dummyInput = document.createElement('input');

                dummyInput.type = 'text';
                dummyInput.style.position = 'absolute';
                dummyInput.value = valueInCell;
                that.appendChild(dummyInput);
                dummyInput.focus();
                dummyInput.setSelectionRange(0, dummyInput.value.length);
                document.execCommand('copy');
                that.removeChild(dummyInput);
            }
            catch (err) {
                //
            }
        }
    }

    /**
     * Deletes a column in the "value" array.
     *
     * @param {Number} index Index of the column to be deleted.
     */
    deleteColumn(index) {
        const that = this,
            lV = that.arrayIndexingMode === 'LabVIEW';
        let filledColumns;

        index = Math.max(0, index);

        if (lV) {
            filledColumns = that._filledUpTo[that._filledUpTo.length - 1];
        }
        else {
            filledColumns = that._filledUpTo[0];
        }

        if (index > filledColumns) {
            return;
        }

        if (filledColumns === 0 || that._oneDimensionSpecialCase && index === 0) {
            that.emptyArray();
            return;
        }

        const oldValue = JSON.stringify(that.value);
        let targetLevel, boundColumnIndex;

        if (lV) {
            targetLevel = that.dimensions - 1;
            boundColumnIndex = index + that._coordinates[targetLevel];

            const recursion = function (arr, level) {
                if (targetLevel !== level) {
                    for (let i = 0; i < arr.length; i++) {
                        recursion(arr[i], level + 1);
                    }
                }
                else {
                    arr.splice(boundColumnIndex, 1);
                }
            };

            recursion(that.value, 0);
        }
        else {
            targetLevel = 0;
            boundColumnIndex = index + that._coordinates[0];
            that.value.splice(boundColumnIndex, 1);
        }

        if (JSON.stringify(that.value) !== oldValue) {
            that._filledUpTo[targetLevel]--;
            that._scroll();
            that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue) });
            that._setMaxValuesOfScrollBars();
        }
    }

    /**
     * Deletes a row in the "value" array.
     *
     * @param {Number} index Index of the row to be deleted.
     */
    deleteRow(index) {
        const that = this,
            oldValue = JSON.stringify(that.value),
            lV = that.arrayIndexingMode === 'LabVIEW';
        let dimension, boundRowIndex, filledRows;

        index = Math.max(0, index);

        if (lV) {
            filledRows = that._filledUpTo[that._filledUpTo.length - 2];
        }
        else {
            filledRows = that._filledUpTo[1];
        }

        if (index > filledRows) {
            return;
        }

        if (filledRows === 0) {
            that.emptyArray();
            return;
        }

        if (that.dimensions === 1) {
            if (!that._oneDimensionSpecialCase) {
                if (index === 0) {
                    that.emptyArray();
                }

                return;
            }
            else {
                that.value.splice(index + that._coordinates[0], 1);
                that._filledUpTo[0]--;
            }
        }
        else {
            if (lV) {
                dimension = that.dimensions - 2;
                boundRowIndex = index + that._coordinates[dimension];

                const recursion = function (arr, level) {
                    if (dimension !== level) {
                        for (let i = 0; i < arr.length; i++) {
                            recursion(arr[i], level + 1);
                        }
                    }
                    else {
                        arr.splice(boundRowIndex, 1);
                    }
                };

                recursion(that.value, 0);
            }
            else {
                dimension = 1;
                boundRowIndex = index + that._coordinates[1];

                for (let i = 0; i < that.value.length; i++) {
                    const currentArray = that.value[i];

                    currentArray.splice(boundRowIndex, 1);
                }
            }

            that._filledUpTo[dimension]--;
        }

        if (oldValue !== JSON.stringify(that.value)) {
            that._scroll();
            that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue) });
            that._setMaxValuesOfScrollBars();
        }
    }

    /**
     * Empties the "value" array.
     */
    emptyArray() {
        const that = this;

        if (that.type === 'none') {
            return;
        }

        const cells = that._cells,
            oldValue = that.value;

        that.value = that._returnEmptyArray();

        if (JSON.stringify(oldValue) === JSON.stringify(that.value)) {
            return;
        }

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const cellWidget = cells[i][j].widget,
                    cellWidgetDimensions = { x: j, y: i },
                    defaultValue = that._getDefaultValue();

                cellWidget.classList.add('lw-array-element-empty');

                if (that._areDifferent(that._getElementValue(cellWidget, cellWidgetDimensions), defaultValue)) {
                    cellWidget.supressChange = true;
                    that._setElementValue(defaultValue, cellWidget, cellWidgetDimensions);
                }
            }
        }

        that._getInitialFill();
        that.clearSelection();
        that.$.fireEvent('change', { 'value': that.value, 'oldValue': oldValue });
    }

    /**
     * Designates the end of a selection started with the method "startSelection".
     *
     * @param {Number} rowBoundIndex The bound index of the row (y coordinate) to end the selection to.
     * @param {Number} columnBoundIndex The bound index of the column (x coordinate) to end the selection to.
     */
    endSelection(rowBoundIndex, columnBoundIndex) {
        const that = this;

        if (that._absoluteSelectionStart === undefined) {
            return;
        }

        that._absoluteSelectionEnd = that._coordinates.slice(0);

        const dimensions = that.dimensions;

        if (that.arrayIndexingMode === 'LabVIEW') {
            that._absoluteSelectionEnd[dimensions - 1] = Math.min(columnBoundIndex, that._filledUpTo[dimensions - 1]);

            if (dimensions > 1) {
                that._absoluteSelectionEnd[dimensions - 2] = Math.min(rowBoundIndex, that._filledUpTo[dimensions - 2]);
            }
        }
        else {
            that._absoluteSelectionEnd[0] = Math.min(columnBoundIndex, that._filledUpTo[0]);

            if (dimensions > 1) {
                that._absoluteSelectionEnd[1] = Math.min(rowBoundIndex, that._filledUpTo[1]);
            }
        }

        let validation = true;

        for (let i = 0; i < dimensions; i++) {
            validation = validation && (that._absoluteSelectionStart[i] <= that._absoluteSelectionEnd[i]);
        }

        if (validation) {
            that._refreshSelection();
        }
        else {
            that._absoluteSelectionStart = undefined;
            that._absoluteSelectionEnd = undefined;
        }
    }

    /**
     * Returns the HTML element at the specified visible row and column coordinates of the array.
     *
     * @param {Number} rowVisibleIndex The visible index of the row (y coordinate) of the element.
     * @param {Number} columnVisibleIndex The visible index of the column (x coordinate) of the element.
     */
    getElement(rowVisibleIndex, columnVisibleIndex) {
        const cells = this._cells;

        if (cells[rowVisibleIndex] === undefined || cells[rowVisibleIndex][columnVisibleIndex] === undefined) {
            return undefined;
        }

        return cells[rowVisibleIndex][columnVisibleIndex].widget;
    }

    /**
     * Returns an object with the values of the array element width and height.
     */
    getElementSize() {
        const that = this;
        return { width: that.elementWidth, height: that.elementHeight };
    }

    /**
     * Gets an array with the values of all indexers.
     */
    getIndexerValue() {
        const indexers = this._indexers,
            result = [];

        for (let i = 0; i < indexers.length; i++) {
            result.push(indexers[i].val());
        }

        return result;
    }

    /**
     * Returns an HTML element from the array at the specified page coordinates and other information about this element.
     *
     * @param {Number} x Page x coordinate.
     * @param {Number} y Page y coordinate.
     */
    hitTest(x, y) {
        const that = this,
            topMostElement = document.elementFromPoint(x, y);

        if (!that.contains(topMostElement)) {
            return undefined;
        }

        const closestArrayElement = topMostElement.closest('.lw-array-element'),
            closestIndexer = topMostElement.closest('.lw-array-indexer');

        if (closestArrayElement !== null) {
            return { type: 'element', htmlElement: closestArrayElement, row: closestArrayElement.row, column: closestArrayElement.col };
        }
        else if (closestIndexer !== null) {
            let dimension = closestIndexer.dimension;

            if (that.arrayIndexingMode === 'LabVIEW') {
                dimension = that.dimensions - dimension - 1;
            }

            return { type: 'indexer', htmlElement: closestIndexer, dimension: dimension };
        }
        else {
            return { type: 'array', htmlElement: that };
        }
    }

    /**
     * Inserts a column in the "value" array before the specified column. The new column is filled with default values.
     *
     * @param {Number} index Index of the column to add a new column before.
     */
    insertColumnBefore(index, redirect) {
        const that = this,
            oldValue = JSON.stringify(that.value),
            lV = that.arrayIndexingMode === 'LabVIEW';
        let boundColumnIndex;

        if (lV && redirect !== true) {
            that.insertRowBefore(index, true);
            return;
        }

        if (that.dimensions === 1) {
            if (lV === that._oneDimensionSpecialCase) {
                that.value.splice(index + that._coordinates[0], 0, that._getDefaultValue());
                that._scroll();
                that._filledUpTo[0]++;
            }
            else {
                return;
            }
        }
        else {
            const fillUpTo = that._filledUpTo.slice(0);

            if (lV) { // inserts a row
                boundColumnIndex = index + that._coordinates[that.dimensions - 2];
                const targetLevel = that.dimensions - 2,
                    recursion = function (arr, level) {
                        if (targetLevel !== level) {
                            for (let i = 0; i < arr.length; i++) {
                                recursion(arr[i], level + 1);
                            }
                        }
                        else {
                            arr.splice(boundColumnIndex, 0, []);
                        }
                    };

                recursion(that.value, 0);
                fillUpTo[targetLevel]++;
            }
            else { // inserts a column
                boundColumnIndex = index + that._coordinates[0];
                that.value.splice(boundColumnIndex, 0, that._returnEmptyArray()[0]);
                fillUpTo[0]++;
            }

            that._fillValueArray(fillUpTo, true);
        }

        that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue) });
        that._setMaxValuesOfScrollBars();
    }

    /**
     * Inserts a row in the "value" array before the specified row. The new row is filled with default values.
     *
     * @param {Number} index Index of the row to add a new row before.
     */
    insertRowBefore(index, redirect) {
        const that = this,
            oldValue = JSON.stringify(that.value),
            lV = that.arrayIndexingMode === 'LabVIEW';

        if (lV && redirect !== true) {
            that.insertColumnBefore(index, true);
            return;
        }

        if (that.dimensions === 1) {
            if (lV && !that._oneDimensionSpecialCase || !lV && that._oneDimensionSpecialCase) {
                that.value.splice(index + that._coordinates[0], 0, that._getDefaultValue());
                that._scroll();
                that._filledUpTo[0]++;
            }
            else {
                return;
            }
        }
        else {
            const fillUpTo = that._filledUpTo.slice(0);
            let boundRowIndex;

            if (lV) { // inserts a column
                const targetLevel = that.dimensions - 1;

                boundRowIndex = index + that._coordinates[targetLevel];

                const recursion = function (arr, level) {
                    if (targetLevel !== level) {
                        for (let i = 0; i < arr.length; i++) {
                            recursion(arr[i], level + 1);
                        }
                    }
                    else {
                        arr.splice(boundRowIndex, 0, that._getDefaultValue());
                    }
                };

                recursion(that.value, 0);
                fillUpTo[targetLevel]++;
            }
            else { // inserts a row
                boundRowIndex = index + that._coordinates[1];

                for (let i = 0; i < that.value.length; i++) {
                    const currentArray = that.value[i];

                    currentArray.splice(boundRowIndex, 0, undefined);
                }

                fillUpTo[1]++;
            }

            that._fillValueArray(fillUpTo, true);
        }

        that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue) });
        that._setMaxValuesOfScrollBars();
    }

    /**
     * Sets all array members to the default value.
     */
    reinitializeArray() {
        const that = this;

        if (that.type === 'none') {
            return;
        }

        const dimensions = that.dimensions,
            oldValue = JSON.stringify(that.value);

        if (that.dimensions === 1) {
            that.value.fill(that._getDefaultValue());
        }
        else {
            const recursion = function (arr, level) {
                for (let i = 0; i < arr.length; i++) {
                    if (level === dimensions) {
                        arr[i] = that._getDefaultValue();
                    }
                    else {
                        recursion(arr[i], level + 1);
                    }
                }
            };

            recursion(that.value, 1);
        }

        if (oldValue !== JSON.stringify(that.value)) {
            that._scroll();
            that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue) });
        }
    }

    /**
     * Removes a dimension from the array.
     */
    removeDimension(propertyChangedHandler, changeValueDimensions) {
        const that = this,
            index = that._dimensions.length - 1;

        if (that._dimensions.length < 2) {
            return;
        }

        if (that._dimensions.length === 2) {
            const oldRowsCount = that.rows;

            that.rows = 1;
            that._changeRowsColumns('rows', oldRowsCount, 1, undefined, true);
        }

        that.$.indexerContainer.removeChild(that._dimensions[index].indexer);
        that._dimensions.pop();

        let indexerValue;

        if (that.arrayIndexingMode === 'LabVIEW') {
            indexerValue = that._coordinates[0];
            that._indexers.splice(0, 1);
            that._coordinates.splice(0, 1);
        }
        else {
            indexerValue = that._coordinates[index];
            that._indexers.pop();
            that._coordinates.pop();
        }

        if (that._suppressDimensionChange !== true) {
            that.dimensions -= 1;
            that.$.fireEvent('dimensionChange', { 'type': 'remove' });
        }

        if (changeValueDimensions !== false) {
            that._removeDimensionFromJSArray();

            if (that.arrayIndexingMode === 'LabVIEW') {
                that._filledUpTo.splice(0, 1);
            }
            else {
                that._filledUpTo.pop();
            }
        }

        if (that._absoluteSelectionStart !== undefined) {
            if (that.arrayIndexingMode === 'LabVIEW') {
                that._absoluteSelectionStart.splice(0, 1);
            }
            else {
                that._absoluteSelectionStart.pop();
            }
        }

        if (that._absoluteSelectionEnd !== undefined) {
            if (that.arrayIndexingMode === 'LabVIEW') {
                that._absoluteSelectionEnd.splice(0, 1);
            }
            else {
                that._absoluteSelectionEnd.pop();
            }
        }

        if (indexerValue > 0) {
            that._scroll();
        }

        if ((that.dimensions > 1 && that._suppressDimensionChange === false && that.showIndexDisplay === true && ((that.dimensions + 1) * (that.indexerHeight + 4) - 2 >= that._cachedHeight)) || that.dimensions === 1 && propertyChangedHandler !== true) {
            that._updateWidgetHeight('dimensions');
            if (that.dimensions === 1 && that.showVerticalScrollbar) {
                that._showVerticalScrollbar(false);
            }
        }
    }

    /**
     * Sets the array's "type" to 'none'.
     */
    reset(propertyChangedHandler) {
        const that = this;

        if (that.type === 'none' && propertyChangedHandler !== true) {
            return;
        }
        else {
            that.type = 'none';
        }

        let oldValue = that.rows;

        that.rows = 1;
        that._changeRowsColumns('rows', oldValue, 1, true);
        oldValue = that.columns;
        that.columns = 1;
        that._changeRowsColumns('columns', oldValue, 1);

        const remainingCell = that._cells[0][0];

        remainingCell.widget.$.unlisten('change');
        remainingCell.widget.$.unlisten('click');
        remainingCell.td.innerHTML = '';

        that._table.classList.add('lw-hidden');

        that._defaultValue = undefined;

        const oldValueArray = that.value;

        that.value = null;
        that.$.fireEvent('change', { 'value': that.value, 'oldValue': oldValueArray });

        that.$.horizontalScrollbar.max = 0;
        that.$.horizontalScrollbar.value = 0;
        that.$.verticalScrollbar.max = 0;
        that.$.verticalScrollbar.value = 0;
    }

    /**
     * Resizes array elements (changes both the column width and the row height).
     *
     * @param {Number} width The new element (column) width.
     * @param {Number} height The new element (row) height.
     */
    resizeElement(width, height) {
        const that = this;

        width = parseInt(width, 10);
        height = parseInt(height, 10);

        if (width === that.elementWidth && height === that.elementHeight) {
            return;
        }

        if (width === that.elementWidth) {
            that.setRowHeight(height);
            return;
        }

        if (height === that.elementHeight) {
            that.setColumnWidth(width);
            return;
        }

        const cellWidgets = that.getElementsByClassName('lw-array-element-' + that._id);

        that.elementWidth = width;
        that.elementHeight = height;

        if (that.type !== 'none') {
            that._updateWidgetWidth();
            that._updateWidgetHeight();

            if (that.type !== 'custom') {
                for (let i = 0; i < cellWidgets.length; i++) {
                    cellWidgets[i].style.width = width + 'px';
                    cellWidgets[i].style.height = height + 'px';
                }
            }
            else {
                if (that.changeProperty) {
                    that.changeProperty('width', width, cellWidgets);
                    that.changeProperty('height', height, cellWidgets);
                }
                else {
                    try {
                        that.warn(that.localize('callbackFunctionRequired', { callback: 'changeProperty' }));
                    }
                    catch (err) {
                        //
                    }
                }
            }

            that.$.fireEvent('sizeChange', { 'width': width, 'height': height });
        }
    }

    /**
     * Selects all members of the array.
     */
    selectAll() {
        const that = this;

        if ((that.arrayIndexingMode === 'LabVIEW' && that._filledUpTo[0] === -1) ||
            (that.arrayIndexingMode === 'JavaScript' && that._filledUpTo[that._filledUpTo.length - 1] === -1)) {
            return;
        }

        const start = new Array(that.dimensions);

        start.fill(0);

        that._absoluteSelectionStart = start;
        that._absoluteSelectionEnd = that._filledUpTo.slice(0);
        that._refreshSelection();
    }

    /**
     * Selects an element with the passed row and column bound indexes.
     *
     * @param {Number} rowBoundIndex Row bound index.
     * @param {Number} columnBoundIndex Column bound index.
     */
    selectElement(rowBoundIndex, columnBoundIndex) {
        const that = this;

        that.startSelection(rowBoundIndex, columnBoundIndex);
        that.endSelection(rowBoundIndex, columnBoundIndex);
    }

    /**
     * Sets the column (element) width.
     *
     * @param {Number} width The new column width.
     */
    setColumnWidth(width, propertyChangedHandler) {
        const that = this;

        width = parseInt(width, 10);

        if (width === that.elementWidth && propertyChangedHandler !== true) {
            return;
        }

        const cellWidgets = that.getElementsByClassName('lw-array-element-' + that._id);

        that.elementWidth = width;

        if (that.type !== 'none') {
            if (that.type !== 'custom') {
                for (let i = 0; i < cellWidgets.length; i++) {
                    cellWidgets[i].style.width = width + 'px';
                }
            }
            else {
                if (that.changeProperty) {
                    that.changeProperty('width', width, cellWidgets);
                }
                else {
                    try {
                        that.warn(that.localize('callbackFunctionRequired', { callback: 'changeProperty' }));
                    }
                    catch (err) {
                        //
                    }
                }
            }

            that._updateWidgetWidth();
            that.$.fireEvent('sizeChange', { 'width': width, 'height': that.elementHeight });
        }
    }

    /**
     * Sets the default value of array members.
     *
     * @param {any} newDefaultValue The new default value. Its data type should correspond to the type of the array.
     */
    setDefaultValue(newDefaultValue) {
        const that = this;

        if (that._areDifferent(newDefaultValue, that._defaultValue)) {
            that._defaultValue = newDefaultValue;
            that._scroll();
        }
    }

    /**
     * Sets the value of one or more array indexers.
     *
     * @param {Array} settings An array of objects with the fields index and value.
     */
    setIndexerValue(settings) {
        const that = this;
        let changed = false;

        for (let i = 0; i < settings.length; i++) {
            const index = settings[i].index,
                absoluteIndex = that.arrayIndexingMode === 'LabVIEW' ? that.dimensions - index - 1 : index,
                value = settings[i].value,
                indexer = that._indexers[index];

            if (indexer !== undefined && value !== that._coordinates[index]) {
                changed = true;
                indexer.val(value);
                that._coordinates[index] = value;

                if (that.type !== 'none' && (absoluteIndex === 0 || absoluteIndex === 1)) {
                    that._syncScrollbar(absoluteIndex, value);
                }
            }
        }

        if (changed === true) {
            that._scroll();
        }
    }

    /**
     * Sets the row (element) height.
     *
     * @param {Number} height The new row height.
     */
    setRowHeight(height, propertyChangedHandler) {
        const that = this;

        height = parseInt(height, 10);

        if (height === that.elementHeight && propertyChangedHandler !== true) {
            return;
        }

        const cellWidgets = that.getElementsByClassName('lw-array-element-' + that._id);

        that.elementHeight = height;

        if (that.type !== 'none') {
            if (that.type !== 'custom') {
                for (let i = 0; i < cellWidgets.length; i++) {
                    cellWidgets[i].style.height = height + 'px';
                }
            }
            else {
                if (that.changeProperty) {
                    that.changeProperty('height', height, cellWidgets);
                }
                else {
                    try {
                        that.warn(that.localize('callbackFunctionRequired', { callback: 'changeProperty' }));
                    }
                    catch (err) {
                        //
                    }
                }
            }

            that._updateWidgetHeight();
            that.$.fireEvent('sizeChange', { 'width': that.elementWidth, 'height': height });
        }
    }

    /**
     * Makes the last array member visible.
     */
    showLastElement() {
        const that = this,
            settings = [];
        let xDimension, yDimension;

        if (that.type === 'none') {
            return;
        }

        if (that.dimensions === 1) {
            const indexerValue = parseFloat(that._indexers[0].value),
                cellsCount = that._oneDimensionSpecialCase ? that.rows : that.columns,
                filledUpTo = that._filledUpTo[0];

            if (indexerValue + cellsCount < filledUpTo + 1 || indexerValue > filledUpTo) {
                that.setIndexerValue([{ index: 0, value: filledUpTo }]);
            }

            return;
        }

        if (that.arrayIndexingMode === 'LabVIEW') {
            xDimension = that.dimensions - 1;
            yDimension = that.dimensions - 2;
        }
        else {
            xDimension = 0;
            yDimension = 1;
        }

        for (let i = 0; i < that.dimensions; i++) {
            let currentValue = that._filledUpTo[i];

            if (i === xDimension) {
                const indexerValue = parseFloat(that._indexers[i].value);

                if (!(indexerValue + that.columns < currentValue + 1 || indexerValue > currentValue)) {
                    currentValue = indexerValue;
                }
            }
            else if (i === yDimension) {
                const indexerValue = parseFloat(that._indexers[i].value);

                if (!(indexerValue + that.rows < currentValue + 1 || indexerValue > currentValue)) {
                    currentValue = indexerValue;
                }
            }

            settings.push({ index: i, value: currentValue });
        }

        that.setIndexerValue(settings);
    }

    /**
     * Designates the start of a selection.
     *
     * @param {Number} rowBoundIndex The bound index of the row (y coordinate) to start the selection from.
     * @param {Number} columnBoundIndex The bound index of the column (x coordinate) to start the selection from.
     */
    startSelection(rowBoundIndex, columnBoundIndex) {
        const that = this;

        that._absoluteSelectionStart = that._coordinates.slice(0);

        if (that.dimensions === 1) {
            that._absoluteSelectionStart[0] = columnBoundIndex;
        }
        else {
            if (that.arrayIndexingMode === 'LabVIEW') {
                that._absoluteSelectionStart[that.dimensions - 1] = columnBoundIndex;
                that._absoluteSelectionStart[that.dimensions - 2] = rowBoundIndex;
            }
            else {
                that._absoluteSelectionStart[0] = columnBoundIndex;
                that._absoluteSelectionStart[1] = rowBoundIndex;
            }
        }

        that._absoluteSelectionEnd = undefined;
    }

    /**
     * Increases or decreases the visual gap between array elements.
     */
    toggleElementGap() {
        const that = this;

        if (that.type === 'none') {
            return;
        }

        let fn;

        if (that._elementGap === undefined) {
            that._elementGap = false;
        }

        if (that._elementGap) {
            fn = 'remove';
            that._elementGap = false;
        }
        else {
            fn = 'add';
            that._elementGap = true;
        }

        for (let i = 0; i < that.rows; i++) {
            for (let j = 0; j < that.columns; j++) {
                that._cells[i][j].td.classList[fn]('lw-array-table-data-gap');
            }
        }

        that._updateWidgetWidth();
        that._updateWidgetHeight();
    }

    /**
     * Transposes the array.
     */
    transposeArray() {
        const that = this;

        if (that.dimensions === 2) {
            const transposedValue = that.value[0].map(function (col, i) {
                return that.value.map(function (row) {
                    return row[i];
                });
            }),
                oldValue = JSON.stringify(that.value);

            that.value = transposedValue;
            that._scroll();

            that.$.fireEvent('change', { 'value': transposedValue, 'oldValue': JSON.parse(oldValue) });

            that._filledUpTo.reverse();
        }
    }

    /**
     * Sets or gets the value of the whole array or sets the value of a member of the array.
     *
     * @param {Array/any} newValue Optional If the method is used for setting the value of the whole array, the expected value is an Array. If it is used for setting the value of an array member, the value can be of any applicable type.
     * @param {Array} elementIndexes Optional If this parameter is passed, only the value of the array member with the provided dimension indexes is set. Dimension indexes that are not passed are considered to be 0.
     */
    val(newValue, elementIndexes) {
        const that = this;
        let oldValue;

        if (Array.from(arguments).filter(a => a !== undefined).length === 2) {
            if (that.type === 'none') {
                return;
            }

            oldValue = JSON.stringify(that.value);

            let tempArray = that.value,
                i;

            for (i = 0; i < that.dimensions - 1; i++) {
                let index = elementIndexes[i];

                if (index === undefined) {
                    index = 0;
                    elementIndexes[i] = 0;
                }

                if (tempArray[index] === undefined) {
                    tempArray[index] = [];
                }

                tempArray = tempArray[index];
            }

            let lastIndex = elementIndexes[i];

            if (lastIndex === undefined) {
                lastIndex = 0;
                elementIndexes[i] = 0;
            }

            if (that._areDifferent(tempArray[lastIndex], newValue)) {
                tempArray[lastIndex] = newValue;
                that._fillValueArray(elementIndexes.slice(0));
                that.$.fireEvent('change', { 'value': that.value, 'oldValue': JSON.parse(oldValue), 'dimensionIndexes': elementIndexes });
            }
        }
        else {
            if (newValue !== undefined && !(typeof newValue === 'object' && Object.keys(newValue).length === 0)) {
                if (that.type === 'none') {
                    return;
                }

                const oldValueStringified = JSON.stringify(that.value);

                if (oldValueStringified !== JSON.stringify(newValue)) {
                    oldValue = that.value;
                    that.value = newValue;
                    that._validateValue();

                    if (oldValueStringified !== JSON.stringify(that.value)) {
                        that._scroll();
                        that._getInitialFill();
                        that.$.fireEvent('change', { 'value': that.value, 'oldValue': oldValue });
                    }
                }
            }
            else {
                return that.value;
            }
        }
    }

    /**
     * Called when a property is changed.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        super.propertyChangedHandler(propertyName, oldValue, newValue);

        const that = this;

        if (newValue !== oldValue) {
            switch (propertyName) {
                case 'arrayIndexingMode':
                    that.arrayIndexingMode = oldValue; // arrayIndexingMode cannot be changed programmatically
                    break;
                case 'columns':
                case 'rows':
                    that._changeRowsColumns(propertyName, oldValue, newValue);
                    break;
                case 'customWidgetDefaultValue':
                    if (that.type === 'custom') {
                        that._defaultValue = newValue;
                        that._scroll();
                    }
                    break;
                case 'dimensions':
                    that._addRemoveMultipleDimensions(oldValue, newValue);
                    break;
                case 'animation':
                case 'disabled':
                    for (let j = 0; j < that._indexers.length; j++) {
                        that._indexers[j][propertyName] = newValue;
                    }

                    if (that.type !== 'none') {
                        const cellWidgets = that.getElementsByClassName('lw-array-element-' + that._id);

                        if (that.type !== 'custom') {
                            for (let i = 0; i < cellWidgets.length; i++) {
                                cellWidgets[i][propertyName] = newValue;
                            }
                        }
                        else {
                            if (that.changeProperty) {
                                that.changeProperty(propertyName, newValue, cellWidgets);
                            }
                            else {
                                try {
                                    that.warn(that.localize('callbackFunctionRequired', { callback: 'changeProperty' }));
                                }
                                catch (err) {
                                    //
                                }
                            }
                        }

                        that._scroll();
                    }

                    break;
                case 'elementHeight':
                    that.setRowHeight(newValue, true);
                    break;
                case 'elementTemplate':
                    if (that.type !== 'none') {
                        const cellWidgets = that.getElementsByClassName('lw-array-element-' + that._id);

                        for (let k = 0; k < cellWidgets.length; k++) {
                            let currentWidget = cellWidgets[k];

                            that.elementTemplate(currentWidget, { x: currentWidget.col, y: currentWidget.row });
                        }
                    }
                    break;
                case 'elementWidth':
                    that.setColumnWidth(newValue, true);
                    break;
                case 'indexerHeight':
                    for (let o = 0; o < that._indexers.length; o++) {
                        that._indexers[o].style.height = newValue + 'px';
                    }

                    that._updateWidgetHeight();
                    break;
                case 'indexerWidth':
                    that.$.indexerContainer.style.width = newValue + 'px';
                    that._updateWidgetWidth();
                    break;
                case 'showHorizontalScrollbar':
                    if (that._oneDimensionSpecialCase === true) {
                        that.showHorizontalScrollbar = false;
                        return;
                    }

                    that._showHorizontalScrollbar(newValue);
                    break;
                case 'showIndexDisplay':
                    if (newValue) {
                        that.$indexerContainer.removeClass('lw-hidden');
                    }
                    else {
                        that.$indexerContainer.addClass('lw-hidden');
                    }

                    that._updateWidgetWidth();
                    that._updateWidgetHeight('showIndexDisplay');
                    break;
                case 'showSelection':
                    if (newValue) {
                        that._refreshSelection();
                    }
                    else {
                        that._clearSelection();
                    }

                    break;
                case 'showVerticalScrollbar':
                    if (that.dimensions === 1 && that._oneDimensionSpecialCase === false) {
                        that.showVerticalScrollbar = false;
                        return;
                    }

                    that._showVerticalScrollbar(newValue);
                    break;
                case 'type':
                    that._getDefaultCellValue();

                    if (oldValue !== 'none' && newValue !== 'none') {
                        that._initializeElements(true);
                        that._updateWidgetWidth();
                        that._updateWidgetHeight();
                    }
                    else if (oldValue === 'none') {
                        that.value = that._returnEmptyArray();

                        if (that._structureAdded === true) {
                            that._initializeElements(false);
                            that._table.classList.remove('lw-hidden');
                        }
                        else {
                            that._addElementStructure();
                            that._structureAdded = true;
                            that._initializeElements(false);
                        }

                        that.$.centralContainer.style.width = '';
                        that.$.bigContainer.style.width = '';
                        that.$.mainContainer.style.height = '';
                        that.$.bigContainer.style.height = '';

                        that._updateWidgetWidth();
                        that._updateWidgetHeight();
                        that._getInitialFill();
                    }
                    else if (newValue === 'none') {
                        that.reset(true);
                    }
                    break;
                case 'value':
                    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                        that._validateValue();

                        if (JSON.stringify(oldValue) !== JSON.stringify(that.value)) {
                            that._scroll();
                            that._getInitialFill();
                            that.$.fireEvent('change', { 'value': that.value, 'oldValue': oldValue });
                        }
                    }

                    break;
            }
        }
    }

    /**
     * Adds dimensions to "value" array.
     */
    _addDimensionToJSArray(dimensions) {
        const that = this;

        if (that.arrayIndexingMode === 'LabVIEW') {
            that.value = [that.value];
        }
        else {
            if (dimensions === undefined) {
                dimensions = that.dimensions - 1;
            }

            const recursion = function (arr, level) {
                for (let i = 0; i < arr.length; i++) {
                    if (level !== dimensions) {
                        recursion(arr[i], level + 1);
                    }
                    else {
                        arr[i] = [arr[i]];
                    }
                }
            };

            recursion(that.value, 1);
        }
    }

    /**
     * Adds element event handlers.
     */
    _addElementHandlers(element) {
        const that = this;

        element.$.listen('change', function (event) {
            if (element.supressChange !== true || element instanceof LW.NumericTextBox) {
                element.$.removeClass('lw-array-element-empty');

                const x = element.col,
                    y = element.row;

                that._updateValue(y, x, that._getElementValue(element, { x: x, y: y }, true));
            }
            else {
                element.supressChange = false;
            }

            event.stopPropagation();
        });

        element.$.listen('click', function () {
            that.$.fireEvent('elementClick', { 'element': element });
        });
    }

    /**
     * Adds tabular element structure.
     */
    _addElementStructure() {
        const that = this;

        that._cells = [];
        that._table = document.createElement('table');
        that._table.className = 'lw-array-element-gap';

        const tableBody = document.createElement('tbody'),
            masterFragment = document.createDocumentFragment();

        for (let i = 0; i < that.rows; i++) {
            const currentRow = document.createElement('tr'),
                childFragment = document.createDocumentFragment();

            currentRow.classList.add('lw-array-table-row');
            that._cells.push([]);

            for (let j = 0; j < that.columns; j++) {
                const currentCell = document.createElement('td');

                currentCell.classList.add('lw-array-table-data');

                if (that._elementGap) {
                    currentCell.classList.add('lw-array-table-data-gap');
                }

                that._cells[i].push({ td: currentCell });
                childFragment.appendChild(currentCell);
            }

            currentRow.appendChild(childFragment);
            masterFragment.appendChild(currentRow);
        }

        tableBody.appendChild(masterFragment);
        that._table.appendChild(tableBody);
        that.$.mainContainer.appendChild(that._table);

        that._tableBody = tableBody;
    }

    /**
     * Adds initial dimensions.
     */
    _addInitialDimensions() {
        const that = this,
            numberOfInitialDimensions = that.dimensions;

        that._dimensions = [];
        that._indexers = [];
        that._suppressDimensionChange = true;
        that._initialDimensions = true;

        for (let i = 0; i < numberOfInitialDimensions; i++) {
            that.addDimension();
        }

        that._suppressDimensionChange = false;
        that._initialDimensions = false;
    }

    /**
     * Adds or removes a column.
     */
    _addRemoveColumn(action) {
        const that = this;

        if (action === 'add') {
            const rows = that._tableBody.children;

            for (let i = 0; i < that._cells.length; i++) {
                const addToRow = that._cells[i],
                    newCell = document.createElement('td');

                newCell.classList.add('lw-array-table-data');

                if (that._elementGap) {
                    newCell.classList.add('lw-array-table-data-gap');
                }

                addToRow.push({ td: newCell });
                rows[i].appendChild(newCell);
                that._initializeWidget(i, addToRow.length - 1);
            }

            that.columns++;

            if (that._suppressScroll !== true) {
                that._scroll();
            }
        }
        else if (action === 'remove' && that.columns > 1) {
            for (let j = 0; j < that._cells.length; j++) {
                const removeFromRow = that._cells[j],
                    cellToRemove = removeFromRow[removeFromRow.length - 1];

                cellToRemove.widget.$.unlisten('change');
                cellToRemove.widget.$.unlisten('click');
                cellToRemove.td.parentElement.removeChild(cellToRemove.td);

                removeFromRow.pop();
            }

            that.columns--;
        }
    }

    /**
     * Adds or removes multiple dimensions.
     */
    _addRemoveMultipleDimensions(oldvalue, value, changeValueDimensions) {
        const that = this;

        if (value < 1 || value > 32) {
            that.dimensions = 1;

            if (that.dimensions === oldvalue) {
                return;
            }
        }

        let difference = that.dimensions - oldvalue;

        that._suppressDimensionChange = true;

        if (difference > 0) {
            do {
                that.addDimension(changeValueDimensions);
                difference -= 1;
            } while (difference > 0);

            that.$.fireEvent('dimensionChange', { 'type': 'add' });
        }
        else if (difference < 0) {
            if (value === 1) {
                const oldRowsCount = that.rows;

                that.rows = 1;
                that.dimensions = oldvalue;
                that._changeRowsColumns('rows', oldRowsCount, 1, undefined, true);
                that.dimensions = value;
            }
            do {
                that.removeDimension(true, changeValueDimensions);
                difference += 1;
            } while (difference < 0);

            that.$.fireEvent('dimensionChange', { 'type': 'remove' });

            if (value === 1 && that.showVerticalScrollbar) {
                that._showVerticalScrollbar(false);
            }
        }
        else {
            return;
        }

        that._suppressDimensionChange = false;

        if (that.showIndexDisplay === true &&
            !(value !== 1 &&
                ((value - oldvalue > 0 && value * (that.indexerHeight + 4) - 2 < that._cachedHeight) ||
                    (value - oldvalue < 0 && oldvalue * (that.indexerHeight + 4) - 2 < that._cachedHeight))) ||
            value === 1) {
            that._updateWidgetHeight('dimensions');
        }
    }

    /**
     * Adds or removes a row.
     */
    _addRemoveRow(action) {
        const that = this;

        if (action === 'add' && (that.dimensions > 1 || (that.dimensions === 1 && that.columns === 1))) {
            that._cells.push([]);

            const newRow = document.createElement('tr'),
                fragment = document.createDocumentFragment(),
                newRowIndex = that._cells.length - 1,
                newCells = [];

            newRow.classList.add('lw-array-table-row');

            for (let j = 0; j < that.columns; j++) {
                const currentNewCell = document.createElement('td');

                currentNewCell.classList.add('lw-array-table-data');

                if (that._elementGap) {
                    currentNewCell.classList.add('lw-array-table-data-gap');
                }

                that._cells[newRowIndex].push({ td: currentNewCell });
                newCells.push(currentNewCell);
                fragment.appendChild(currentNewCell);
            }

            newRow.appendChild(fragment);
            that._tableBody.appendChild(newRow);

            for (let i = 0; i < newCells.length; i++) {
                that._initializeWidget(newRowIndex, i);
            }

            that.rows++;

            if (that._suppressScroll !== true) {
                that._scroll();
            }
        }
        else if (action === 'remove' && that.rows > 1) {
            const rowToRemove = that._tableBody.children[that._tableBody.children.length - 1],
                cellsToRemove = that._cells[that._cells.length - 1];

            for (let k = 0; k < cellsToRemove.length; k++) {
                cellsToRemove[k].widget.$.unlisten('change');
                cellsToRemove[k].widget.$.unlisten('click');
            }

            that._tableBody.removeChild(rowToRemove);
            that._cells.pop();
            that.rows--;
        }
    }

    /**
     * Adds selection class.
     */
    _addSelectionClass(x, y, td, skipSelectionCheck) {
        const that = this;

        if (that.showSelection && that._absoluteSelectionStart !== undefined && that._absoluteSelectionEnd !== undefined) {
            if (skipSelectionCheck === false && that._inSelection(x, y)) {
                td.classList.add('lw-array-element-selected');
            }
            else {
                td.classList.remove('lw-array-element-selected');
            }
        }
    }

    /**
     * Checks if two objects are different.
     */
    _areDifferent(a, b) {
        if (a instanceof Date) {
            if (b instanceof Date) {
                return a.getTime() !== b.getTime();
            }
            else if (typeof b === 'string') {
                try {
                    return a.getTime() !== new Date(b).getTime();
                }
                catch (err) {
                    //
                }
            }

            return true;
        }

        if (b instanceof Date) {
            if (typeof a === 'string') {
                try {
                    return b.getTime() !== new Date(a).getTime();
                }
                catch (err) {
                    //
                }
            }
            return true;
        }

        if (typeof a !== 'object' || typeof a !== typeof b) {
            if (a !== b) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (JSON.stringify(a) !== JSON.stringify(b)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    /**
     * Changes rows or columns.
     */
    _changeRowsColumns(key, oldvalue, value, reset, suppressHeightUpdate) {
        const that = this,
            functionName = '_addRemove' + key.charAt(0).toUpperCase() + key.slice(1, key.length - 1);

        if (value < 1) {
            that[key] = 1;

            if (that[key] === oldvalue) {
                return;
            }
        }

        if (that.dimensions === 1) {
            if (that._oneDimensionSpecialCase === true) {
                if (key === 'columns' && that[key] > 1) {
                    if (that.rows > 1) {
                        that.columns = 1;
                        return;
                    }

                    that._oneDimensionSpecialCase = false;
                    if (that.showVerticalScrollbar) {
                        that._showVerticalScrollbar(false);
                        that._showHorizontalScrollbar(true);
                    }
                }
            }
            else {
                if (key === 'rows') {
                    if (that.columns > 1) {
                        that.rows = 1;
                        return;
                    }
                    else if (that.rows > 1) {
                        that._oneDimensionSpecialCase = true;
                        if (that.showHorizontalScrollbar === true) {
                            that._showHorizontalScrollbar(false);
                            that._showVerticalScrollbar(true);
                        }
                    }
                }
            }
        }

        let difference = that[key] - oldvalue;

        that[key] = oldvalue;

        if (difference > 0) {
            that._suppressScroll = true;

            do {
                that[functionName]('add');
                difference -= 1;
            } while (difference > 0);

            that._suppressScroll = false;
            that._scroll();
        }
        else if (difference < 0) {
            do {
                that[functionName]('remove');
                difference += 1;
            } while (difference < 0);
        }

        that.$.fireEvent('arraySizeChange', { 'type': key, 'number': that[key], 'oldNumber': oldvalue });

        if (key === 'columns') {
            that._updateWidgetWidth();
            that._setMaxValuesOfScrollBars('horizontal');
        }
        else if (key === 'rows' && suppressHeightUpdate !== true) {
            that._updateWidgetHeight(reset === true ? 'dimensions' : undefined);
            that._setMaxValuesOfScrollBars('vertical');
        }
    }

    /**
     * Clears the selection.
     */
    _clearSelection() {
        const that = this;

        for (let i = 0; i < that.rows; i++) {
            for (let j = 0; j < that.columns; j++) {
                that._cells[i][j].td.classList.remove('lw-array-element-selected');
            }
        }
    }

    /**
     * Clones a value.
     */
    _cloneValue(value) {
        if (typeof value !== 'object') {
            return value;
        }
        else {
            if (value instanceof Date) {
                return new Date(value.getTime());
            }
            else if (Array.isArray(value) || value instanceof Object) {
                return JSON.parse(JSON.stringify(value));
            }
        }
    }

    /**
     * Fills the value array.
     */
    _fillValueArray(changedValueDimensions, skipOverride) {
        const that = this,
            dimensions = that.dimensions;

        if (that._filledUpTo !== undefined && skipOverride !== true) {
            let skipFill = true;

            for (let a = 0; a < changedValueDimensions.length; a++) {
                skipFill = skipFill && (that._filledUpTo[a] >= changedValueDimensions[a]);
                changedValueDimensions[a] = Math.max(changedValueDimensions[a], that._filledUpTo[a]);
            }

            if (skipFill === true) {
                that._scroll();
                return;
            }
        }

        that._filledUpTo = changedValueDimensions.slice(0);

        function recursion(arr, level) {
            for (let i = 0; i <= changedValueDimensions[level]; i++) {
                if (level !== dimensions - 1) {
                    if (arr[i] === undefined) {
                        arr[i] = [];
                    }

                    recursion(arr[i], level + 1);
                }
                else if (arr[i] === undefined) {
                    arr[i] = that._getDefaultValue();
                }
            }
        }

        recursion(that.value, 0);

        that._scroll();
        that._setMaxValuesOfScrollBars();
    }

    /**
     * Gets default cell value.
     */
    _getDefaultCellValue() {
        const that = this;

        switch (that.type) {
            case 'custom':
                that._defaultValue = that.customWidgetDefaultValue !== null ? that.customWidgetDefaultValue : undefined;
                break;
            case 'numeric':
                that._defaultValue = 0;
                break;
            case 'boolean':
                that._defaultValue = false;
                break;
            case 'string':
                that._defaultValue = '';
                break;
        }
    }

    /**
     * Gets the default element value.
     */
    _getDefaultValue() {
        const that = this;

        return that._cloneValue(that._defaultValue);
    }

    /**
     * Gets element value.
     */
    _getElementValue(element, dimensions, clone) {
        const that = this;
        let value;

        if (that.getElementValue) {
            value = that.getElementValue(element, dimensions);
        }
        else {
            value = that.type === 'boolean' ? element.checked : element.value;
        }

        if (clone !== true) {
            return value;
        }
        else {
            return that._cloneValue(value);
        }
    }

    /**
     * Gets the initial fill of the value array.
     */
    _getInitialFill() {
        const that = this;

        that._filledUpTo = [];

        if (that.type !== 'none') {
            let tempArray = that.value;

            for (let i = 0; i < that.dimensions; i++) {
                const lastIndex = tempArray.length - 1;

                that._filledUpTo[i] = lastIndex;
                tempArray = tempArray[lastIndex];
            }

            that._setMaxValuesOfScrollBars();
        }
    }

    /**
     * Gets the max value of the horizontal or vertical scrollbar.
     */
    _getMaxValuesOfScrollBars(scrollbar) {
        const that = this,
            length = that._filledUpTo.length;
        let max = 0,
            filledUpTo, visibleCells, value;

        if (scrollbar === 'horizontal') {
            value = that.$.horizontalScrollbar.value;

            if (that.arrayIndexingMode === 'LabVIEW') {
                filledUpTo = that._filledUpTo[length - 1];
            }
            else {
                filledUpTo = that._filledUpTo[0];
            }

            visibleCells = that.columns;
        }
        else {
            value = that.$.verticalScrollbar.value;

            if (!that._oneDimensionSpecialCase) {
                if (that.arrayIndexingMode === 'LabVIEW') {
                    filledUpTo = that._filledUpTo[length - 2];
                }
                else {
                    filledUpTo = that._filledUpTo[1];
                }
            }
            else {
                if (that.arrayIndexingMode === 'LabVIEW') {
                    filledUpTo = that._filledUpTo[length - 1];
                }
                else {
                    filledUpTo = that._filledUpTo[0];
                }
            }

            visibleCells = that.rows;
        }

        if (filledUpTo === undefined) {
            return 0;
        }

        max = filledUpTo - visibleCells + 2;

        return Math.max(max, value);
    }

    /**
     * Gets value in cell.
     */
    _getValueInCell(row, column) {
        const that = this,
            array = that.value,
            dimensionValues = that._coordinates,
            length = dimensionValues.length;
        let value;

        if (length === 1) {
            if (that._oneDimensionSpecialCase === false) {
                value = array[column + dimensionValues[0]];
            }
            else {
                value = array[row + dimensionValues[0]];
            }
        }
        else {
            const actualIndexes = dimensionValues.slice(0);

            if (that.arrayIndexingMode === 'LabVIEW') {
                actualIndexes[length - 1] += column;
                actualIndexes[length - 2] += row;
            }
            else {
                actualIndexes[0] += column;
                actualIndexes[1] += row;
            }

            const oneDimensionalArrayValue = array[actualIndexes[0]];

            if (oneDimensionalArrayValue !== undefined) {
                const twoDimensionalArrayValue = oneDimensionalArrayValue[actualIndexes[1]];

                if (twoDimensionalArrayValue !== undefined) {
                    value = twoDimensionalArrayValue;

                    if (length > 2) {
                        for (let i = 2; i < length; i++) {
                            if (value === undefined) {
                                break;
                            }

                            value = value[actualIndexes[i]];
                        }
                    }
                }
            }
        }

        return value;
    }

    /**
     * Indexer change handler.
     */
    _indexerChangeHandler(event) {
        const that = this,
            oldContext = that.context;

        that.context = that;

        const dimension = event.target.dimension,
            actualDimension = that.arrayIndexingMode === 'LabVIEW' ? that.dimensions - dimension - 1 : dimension,
            value = parseFloat(event.detail.value);

        that._coordinates[actualDimension] = value;
        that._scroll();

        if (that.type !== 'none' && (dimension === 0 || dimension === 1)) {
            that._syncScrollbar(dimension, value);
        }

        event.stopPropagation();

        that.context = oldContext;
    }

    /**
     * Initializes elements.
     */
    _initializeElements(removeOldWidgets) {
        const that = this,
            cells = that._cells;
        that._initializeElement = function () { };

        function setElementTemplate(widget) {
            if (that.elementTemplate) {
                that.elementTemplate(widget, { x: widget.col, y: widget.row });
            }
        }

        if (that.type !== 'custom') {
            switch (that.type) {
                case 'numeric':
                    that._initializeElement = function (widget, value) {
                        widget.style.width = that.elementWidth + 'px';
                        widget.style.height = that.elementHeight + 'px';
                        widget.disabled = that.disabled;
                        widget.animation = that.animation;
                        widget.inputFormat = 'floatingPoint';
                        widget.spinButtons = true;
                        widget.value = value;

                        setElementTemplate(widget);
                    };
                    break;
                case 'boolean':
                    that._initializeElement = function (widget, value) {
                        widget.style.width = that.elementWidth + 'px';
                        widget.style.height = that.elementHeight + 'px';
                        widget.disabled = that.disabled;
                        widget.animation = that.animation;
                        widget.checked = value;

                        setElementTemplate(widget);
                    };
                    break;
                case 'string':
                    that._initializeElement = function (widget, value) {
                        widget.style.width = that.elementWidth + 'px';
                        widget.style.height = that.elementHeight + 'px';
                        widget.disabled = that.disabled;
                        widget.animation = that.animation;
                        widget.value = value;

                        setElementTemplate(widget);
                    };
                    break;
            }
        }
        else {
            that._initializeElement = function (widget, value) {
                if (that.elementTemplate) {
                    const widgetDimensions = { x: widget.col, y: widget.row };

                    that.elementTemplate(widget, widgetDimensions);

                    if (value !== undefined) {
                        that._setElementValue(value, widget, widgetDimensions);
                    }
                }
                else {
                    that.error(that.localize('callbackFunctionRequired', { callback: 'elementTemplate' }));
                }
            };
        }

        for (let i = 0; i < cells.length; i++) { // rows
            for (let j = 0; j < cells[i].length; j++) { // columns
                if (removeOldWidgets === true) {
                    const cell = cells[i][j];

                    cell.widget.$.unlisten('change');
                    cell.widget.$.unlisten('click');
                    cell.td.innerHTML = '';
                }

                that._initializeWidget(i, j);
            }
        }
    }

    /**
     * Initializes custom elements.
     */
    _initializeWidget(i, j) {
        const that = this,
            cell = that._cells[i][j],
            initialValue = that._getValueInCell(i, j);
        let widget;

        switch (that.type) {
            case 'boolean':
                widget = document.createElement('lw-switch-button');
                break;
            case 'numeric':
                widget = document.createElement('lw-numeric-text-box');
                widget.validation = 'interaction';
                break;
            case 'string':
                widget = document.createElement('lw-text-box');
                break;
            case 'custom':
                widget = document.createElement('div');
                widget.$ = LW.Utilities.Extend(widget);
                break;
        }

        widget.row = i;
        widget.col = j;

        cell.widget = widget;
        that._initializeElement(widget, initialValue === undefined ? that._getDefaultValue() : initialValue, cell);
        cell.td.appendChild(widget);
        widget.classList.add('lw-array-element');
        widget.classList.add('lw-array-element-' + that._id);

        if (initialValue === undefined) {
            widget.classList.add('lw-array-element-empty');
        }

        that._addElementHandlers(widget);
    }

    /**
     * Checks if a cell is in selection.
     */
    _inSelection(x, y) {
        const that = this,
            dimensionValues = that._coordinates;
        let validation = true,
            xDimension, yDimension, boundX, boundY;

        if (that.arrayIndexingMode === 'LabVIEW') {
            xDimension = that.dimensions - 1;
            yDimension = that.dimensions - 2;
        }
        else {
            xDimension = 0;
            yDimension = 1;
        }

        if (!that._oneDimensionSpecialCase) {
            boundX = x + dimensionValues[xDimension];
            boundY = y + dimensionValues[yDimension];
        }
        else {
            boundX = y + dimensionValues[xDimension];
        }

        if (that.dimensions === 1) {
            if (boundX >= that._absoluteSelectionStart[xDimension] && boundX <= that._absoluteSelectionEnd[xDimension]) {
                return true;
            }
            else {
                return false;
            }
        }

        if (boundX >= that._absoluteSelectionStart[xDimension] &&
            boundX <= that._absoluteSelectionEnd[xDimension] &&
            boundY >= that._absoluteSelectionStart[yDimension] &&
            boundY <= that._absoluteSelectionEnd[yDimension]) {
            validation = true;
        }
        else {
            validation = false;
        }

        if (that.arrayIndexingMode === 'LabVIEW') {
            for (let i = 0; i < yDimension; i++) {
                validation = validation && (dimensionValues[i] >= that._absoluteSelectionStart[i] && dimensionValues[i] <= that._absoluteSelectionEnd[i]);
            }
        }
        else {
            for (let j = 2; j < that.dimensions; j++) {
                validation = validation && (dimensionValues[j] >= that._absoluteSelectionStart[j] && dimensionValues[j] <= that._absoluteSelectionEnd[j]);
            }
        }

        return validation;
    }

    /**
     * Moves scrollbar.
     */
    _moveScrollbar(scrollbar, type, index, value) {
        if (isNaN(value)) {
            return;
        }

        const that = this,
            max = that._getMaxValuesOfScrollBars(type),
            currentMax = scrollbar.max;
        let actualIndex;

        if (that.arrayIndexingMode === 'LabVIEW') {
            actualIndex = that.dimensions - index - 1;
        }
        else {
            actualIndex = index;
        }

        that._indexers[actualIndex].val(value);
        that._coordinates[actualIndex] = value;

        if (value <= max) {
            scrollbar.max = max;
        }
        else if (value <= currentMax) {
            scrollbar.max = value;
        }

        that._scroll();

        that.$.fireEvent('scroll', { 'direction': type });
    }

    /**
     * Refreshes selection.
     */
    _refreshSelection() {
        const that = this;

        if (that.showSelection) {
            for (let i = 0; i < that.rows; i++) {
                for (let j = 0; j < that.columns; j++) {
                    const value = that._getValueInCell(i, j),
                        skipSelectionCheck = value === undefined ? true : false;

                    that._addSelectionClass(j, i, that._cells[i][j].td, skipSelectionCheck);
                }
            }
        }
    }

    /**
     * Removes a dimension from "value" array.
     */
    _removeDimensionFromJSArray() {
        const that = this;

        if (that.arrayIndexingMode === 'LabVIEW') {
            that.value = that.value[0];
        }
        else {
            const dimensions = that.dimensions + 1,
                recursion = function (arr, level, parent, index) {
                    for (let i = 0; i < arr.length; i++) {
                        if (level !== dimensions && arr[i].length > 0) {
                            recursion(arr[i], level + 1, arr, i);
                        }
                        else {
                            if (parent !== undefined) {
                                parent[index] = arr[0];
                            }
                            else {
                                that.value = that.value[0];
                            }
                        }
                    }
                };

            recursion(that.value, 1);
        }
    }

    /**
     * Resize handler.
     */
    _resizeHandler() {
        const that = this;

        if (that.offsetWidth !== that._cachedWidth) {
            if (that.type !== 'none') {
                const valueDifference = that.offsetWidth - that._cachedWidth,
                    elementDimension = that.elementWidth;

                if (Math.abs(valueDifference) < elementDimension) {
                    that.style.width = that._cachedWidth + 'px';
                    return;
                }

                const rowsColumnsDifference = Math.round(valueDifference / elementDimension),
                    oldValue = that.columns,
                    newValue = oldValue + rowsColumnsDifference;

                that.columns = newValue;
                that._changeRowsColumns('columns', oldValue, newValue);
            }
            else {
                that._updateWidgetWidth();
            }
        }

        that._cachedWidth = that.offsetWidth;

        if (that.offsetHeight !== that._cachedHeight) {
            if (that.type === 'none') {
                that._updateWidgetHeight();
            }
            else {
                that.style.height = that._cachedHeight + 'px';
                return;
            }
        }

        that._cachedHeight = that.offsetHeight;
    }

    /**
     * Returns an empty array with the necessary dimensions.
     */
    _returnEmptyArray() {
        const that = this,
            emptyArray = [];
        let current = emptyArray;

        if (that.dimensions > 1) {
            for (let i = 1; i < that.dimensions; i++) {
                current[0] = [];
                current = current[0];
            }
        }

        return emptyArray;
    }

    /**
     * Scrolls the Array.
     */
    _scroll() {
        const that = this;

        if (that.type === 'none') {
            return;
        }

        for (let i = 0; i < that._cells.length; i++) {
            for (let j = 0; j < that._cells[i].length; j++) {
                const value = that._getValueInCell(i, j),
                    widget = that._cells[i][j].widget,
                    widgetDimensions = { x: j, y: i },
                    widgetValue = that._getElementValue(widget, widgetDimensions);
                let skipSelectionCheck;

                if (value !== undefined) {
                    widget.classList.remove('lw-array-element-empty');

                    if (that._areDifferent(widgetValue, value)) {
                        widget.supressChange = true;
                        that._setElementValue(value, widget, widgetDimensions);
                    }
                    else {
                        widget.supressChange = false;
                    }

                    skipSelectionCheck = false;
                }
                else {
                    widget.classList.add('lw-array-element-empty');

                    if (that._areDifferent(widgetValue, that._defaultValue)) {
                        widget.supressChange = true;
                        that._setElementValue(that._getDefaultValue(), widget, widgetDimensions);
                    }
                    else {
                        widget.supressChange = false;
                    }

                    skipSelectionCheck = true;
                }

                that._addSelectionClass(j, i, that._cells[i][j].td, skipSelectionCheck);
            }
        }
    }

    /**
     * Scrollbar change handler.
     */
    _scrollbarChangeHandler(event) {
        const that = this;
        let direction, index;

        event.stopPropagation();

        if (that.type === 'none') {
            return;
        }

        if (event.target === that.$.horizontalScrollbar) {
            direction = 'horizontal';
            index = 0;
        }
        else {
            direction = 'vertical';
            index = that._oneDimensionSpecialCase ? 0 : 1;
        }

        if (that._suppressScrollbarEvent !== true) {
            that._moveScrollbar(event.target, direction, index, Math.round(event.detail.value));
        }
        else {
            that._suppressScrollbarEvent = false;
        }

        if (!that._clickTriggered) {
            that._changeTriggered = true;

            setTimeout(function () {
                that._changeTriggered = false;
            }, 50);
        }
    }

    /**
     * Scrollbar click handler.
     */
    _scrollbarClickHandler(event) {
        const button = event.target.closest('.lw-scroll-button');

        if (button === null) {
            return;
        }

        const that = this,
            scrollbar = button.parentElement.parentElement;

        if (button === scrollbar.$.farButton) {
            if (that._changeTriggered) {
                return;
            }

            that._clickTriggered = true;

            setTimeout(function () {
                that._clickTriggered = false;
            }, 50);

            const scrollbarMax = scrollbar.max;
            let scrollbarValue = scrollbar.value;

            if (isNaN(scrollbarValue) === true) {
                scrollbarValue = 0;
            }

            if (scrollbarMax === scrollbarValue) {
                scrollbar.max = scrollbarMax + 1;
                scrollbar.value = scrollbarMax + 1;
            }
        }
    }

    /**
     * Sets the value of an element.
     */
    _setElementValue(value, element, dimensions) {
        const that = this;

        value = that._cloneValue(value);

        if (that.setElementValue) {
            that.setElementValue(value, element, dimensions);

            if (element.supressChange === true) {
                element.supressChange = false;
            }
        }
        else {
            if (that.type === 'boolean') {
                element.checked = value;
            }
            else {
                element.value = value;
            }
        }
    }

    /**
     * Sets the max value of the horizontal or vertical scrollbar.
     */
    _setMaxValuesOfScrollBars(which) {
        const that = this;

        if (that.showHorizontalScrollbar && (which === undefined || which === 'horizontal')) {
            that.$.horizontalScrollbar.max = that._getMaxValuesOfScrollBars('horizontal');
        }

        if (that.showVerticalScrollbar && (which === undefined || which === 'vertical')) {
            that.$.verticalScrollbar.max = that._getMaxValuesOfScrollBars('vertical');
        }
    }

    /**
     * Shows the horizontal scrollbar.
     */
    _showHorizontalScrollbar(show) {
        const that = this;

        that.showHorizontalScrollbar = show;
        that._updateWidgetHeight('showHorizontalScrollbar');

        if (show === true) {
            that.$horizontalScrollbarContainer.removeClass('lw-hidden');

            if (that.type !== 'none') {
                let xDimension;

                if (that.arrayIndexingMode === 'LabVIEW') {
                    xDimension = that.dimensions - 1;
                }
                else {
                    xDimension = 0;
                }

                that._syncScrollbar(0, that._coordinates[xDimension]);
            }
        }
        else {
            that.$horizontalScrollbarContainer.addClass('lw-hidden');
        }
    }

    /**
     * Shows the vertical scrollbar.
     */
    _showVerticalScrollbar(show) {
        const that = this;

        that.showVerticalScrollbar = show;
        that._updateWidgetWidth(true);

        if (show === true) {
            that.$verticalScrollbarContainer.removeClass('lw-hidden');

            if (that.type !== 'none') {
                let yDimension;

                if (that._oneDimensionSpecialCase) {
                    yDimension = 0;
                }
                else if (that.arrayIndexingMode === 'LabVIEW') {
                    yDimension = that.dimensions - 2;
                }
                else {
                    yDimension = 1;
                }

                that._syncScrollbar(1, that._coordinates[yDimension]);
            }
        }
        else {
            that.$verticalScrollbarContainer.addClass('lw-hidden');
        }
    }

    /**
     * Synchronizes the corresponding scrollbar.
     */
    _syncScrollbar(dimension, value) {
        const that = this;
        let max, scrollbar;

        if (dimension === 0 && that._oneDimensionSpecialCase === false) {
            if (!that.showHorizontalScrollbar) {
                return;
            }

            max = that._getMaxValuesOfScrollBars('horizontal');
            scrollbar = that.$.horizontalScrollbar;
        }
        else {
            if (!that.showVerticalScrollbar) {
                return;
            }

            max = that._getMaxValuesOfScrollBars('vertical');
            scrollbar = that.$.verticalScrollbar;
        }

        if (value > max) {
            max = value;
        }

        const currentMax = scrollbar.max;

        if (currentMax !== max) {
            if (currentMax > max) {
                that._suppressScrollbarEvent = true;
            }

            scrollbar.max = max;
        }

        if (scrollbar.value !== value) {
            that._suppressScrollbarEvent = true;
            scrollbar.value = value;
        }
    }

    /**
     * Updates the value of the Array.
     */
    _updateValue(row, column, newValue) {
        const that = this,
            oldValue = that._getValueInCell(row, column);

        if (!that._areDifferent(newValue, oldValue)) {
            return;
        }

        const dimensionValues = that._coordinates,
            actualIndexes = dimensionValues.slice(0),
            changedValueDimensions = [];

        if (that.arrayIndexingMode === 'LabVIEW') {
            actualIndexes[actualIndexes.length - 1] += column;
            actualIndexes[actualIndexes.length - 2] += row;
        }
        else {
            actualIndexes[0] += column;
            actualIndexes[1] += row;
        }

        for (let i = 0; i < that.dimensions; i++) {
            if (i === 0) { // x
                if (that._oneDimensionSpecialCase === false) {
                    changedValueDimensions.push(actualIndexes[0]);
                }
                else {
                    changedValueDimensions.push(row + dimensionValues[0]);
                }
            }
            else if (i === 1) { // y
                changedValueDimensions.push(actualIndexes[1]);
            }
            else { // other dimensions
                changedValueDimensions.push(actualIndexes[i]);
            }
        }

        let tempArr = that.value;

        for (let j = 0; j < changedValueDimensions.length; j++) {
            if (tempArr[changedValueDimensions[j]] === undefined || tempArr[changedValueDimensions[j]] === oldValue) {
                if (j !== changedValueDimensions.length - 1) {
                    tempArr[changedValueDimensions[j]] = [];
                }
                else {
                    tempArr[changedValueDimensions[j]] = newValue;
                }
            }
            tempArr = tempArr[changedValueDimensions[j]];
        }

        that._fillValueArray(changedValueDimensions.slice(0));

        that.$.fireEvent('change', { 'value': newValue, 'oldValue': oldValue, 'dimensionIndexes': changedValueDimensions });
    }

    /**
     * Updates element height.
     */
    _updateWidgetHeight(propertyChangedHandler) {
        const that = this,
            hScrollbarContainerSize = that.showHorizontalScrollbar ? 20 : 0;
        let mainHeight, indexerContaineHeight;

        if (that.showIndexDisplay) {
            const marginBottom = parseInt(window.getComputedStyle(that._indexers[0]).marginBottom, 10);

            indexerContaineHeight = that.dimensions * (that.indexerHeight + marginBottom) - marginBottom;
        }
        else {
            indexerContaineHeight = 0;
        }

        if (that.type !== 'none') {
            mainHeight = that.$.mainContainer.offsetHeight + hScrollbarContainerSize;
        }
        else {
            if (propertyChangedHandler === 'showHorizontalScrollbar') {
                const currentBigContainerHeight = that.$.bigContainer.offsetHeight;

                if (that.showHorizontalScrollbar === true) {
                    mainHeight = currentBigContainerHeight + 20;
                }
                else {
                    mainHeight = currentBigContainerHeight - 20;
                }
            }
            else if (propertyChangedHandler === 'showIndexDisplay' && that.showIndexDisplay === false || propertyChangedHandler === 'dimensions') {
                mainHeight = that.$.bigContainer.offsetHeight;
            }
            else {
                mainHeight = that.offsetHeight;
            }

            const minHeight = 18 + hScrollbarContainerSize;

            if (mainHeight < minHeight) {
                mainHeight = minHeight;
            }

            that.$.mainContainer.style.height = (mainHeight - hScrollbarContainerSize) + 'px';
        }

        that.$.verticalScrollbarContainer.style.height = (mainHeight - hScrollbarContainerSize) + 'px';
        that.$.bigContainer.style.height = mainHeight + 'px';

        const style = window.getComputedStyle(that);

        that._cachedHeight = Math.max(indexerContaineHeight, mainHeight) + parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10);

        if (that.type !== 'none') {
            that.style.minHeight = that._cachedHeight + 'px';
            that.style.maxHeight = that._cachedHeight + 'px';
        }

        that.style.height = that._cachedHeight + 'px';
    }

    /**
     * Updates element width.
     */
    _updateWidgetWidth(propertyChangedHandler) {
        const that = this,
            vScrollbarContainerSize = that.showVerticalScrollbar ? 20 : 0,
            indexerWidth = that.showIndexDisplay ? that.indexerWidth : 0,
            marginLeft = parseInt(window.getComputedStyle(that.$.bigContainer).marginLeft, 10);
        let centralContainerWidth, bigContainerWidth, width;

        if (that.type !== 'none') {
            centralContainerWidth = that.$.centralContainer.offsetWidth;
            bigContainerWidth = centralContainerWidth + vScrollbarContainerSize;
            width = bigContainerWidth + indexerWidth + marginLeft;
        }
        else {
            width = that.offsetWidth;

            if (propertyChangedHandler === true) {
                if (that.showVerticalScrollbar === true) {
                    width += 20;
                }
                else {
                    width -= 20;
                }
            }

            const minWidth = indexerWidth + 18 + vScrollbarContainerSize;

            if (width < minWidth) {
                width = minWidth;
            }

            bigContainerWidth = width - indexerWidth - marginLeft;
            centralContainerWidth = bigContainerWidth - vScrollbarContainerSize;
            that.$.centralContainer.style.width = centralContainerWidth + 'px';
        }

        that.$.bigContainer.style.width = bigContainerWidth + 'px';

        const style = window.getComputedStyle(that);

        width += parseInt(style.borderLeftWidth, 10) + parseInt(style.borderRightWidth, 10);
        that.style.width = width + 'px';
        that._cachedWidth = width;
    }

    /**
     * Validates properties.
     */
    _validateProperties() {
        const that = this;

        that._oneDimensionSpecialCase = false;

        if (that.type === 'none') {
            that.rows = 1;
            that.columns = 1;
        }
        else {
            if (that.rows < 1) {
                that.rows = 1;
            }
            if (that.columns < 1) {
                that.columns = 1;
            }
        }

        if (that.dimensions < 1 || that.dimensions > 32) {
            that.dimensions = 1;
        }

        if (that.dimensions === 1) {
            if (that.columns > 1) {
                that.rows = 1;
                if (that.showVerticalScrollbar === true) {
                    that.showVerticalScrollbar = false;
                }
            }
            else if (that.rows !== 1) {
                that._oneDimensionSpecialCase = true;
                if (that.showHorizontalScrollbar === true) {
                    that.showHorizontalScrollbar = false;
                }
            }
            else if (that.columns === 1 && that.rows === 1) {
                if (that.showVerticalScrollbar === true) {
                    that.showVerticalScrollbar = false;
                }
            }
        }

        that._validateValue();

        if (that.showIndexDisplay) {
            that.$indexerContainer.removeClass('lw-hidden');
        }

        that.$.indexerContainer.style.width = that.indexerWidth + 'px';

        if (that.showHorizontalScrollbar) {
            that.$horizontalScrollbarContainer.removeClass('lw-hidden');
        }

        if (that.showVerticalScrollbar) {
            that.$verticalScrollbarContainer.removeClass('lw-hidden');
        }
    }

    /**
     * Validates value.
     */
    _validateValue() {
        const that = this;

        if (that.type === 'none') {
            that.value = null;
        }
        else if (that.value === null || that.value === undefined) {
            that.value = that._returnEmptyArray();
        }
        else {
            that._validateValueArrayDimensions();
        }
    }

    /**
     * Validates the dimensions of the value array.
     */
    _validateValueArrayDimensions() {
        const that = this;
        let dimensions = 0,
            tempArray = that.value,
            emptyArray = false;

        while (tempArray.constructor === Array) {
            dimensions++;
            tempArray = tempArray[0];

            if (tempArray === undefined) {
                emptyArray = true;
                break;
            }
        }

        if (that.dimensions > dimensions) {
            if (emptyArray) {
                that.value = that._returnEmptyArray();
                return;
            }

            while (that.dimensions > dimensions) {
                that._addDimensionToJSArray(dimensions);
                dimensions++;
            }
        }
    }
});
