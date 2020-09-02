
(function () {
    'use strict';

    if (!LW.Chart) {
        return;
    }

    LW.Chart.prototype._moduleRangeSelector = true;

    /**
    * Renders the xAxis range selector
    * @private 
    * @param {number} group index
    * @param {object} bounding rectangle of the xAxis in relative coords
    */
    LW.Chart.prototype._renderXAxisRangeSelector = function (groupIndex, rect) {
        const self = this;

        const g = self.seriesGroups[groupIndex];
        const axis = self._getXAxis(groupIndex);
        const rangeSelector = axis ? axis.rangeSelector : undefined;

        if (!self._isSelectorRefresh) {
            const elHost = (rangeSelector && rangeSelector.renderTo) ? rangeSelector.renderTo : self,
                oldRangeSelector = elHost.getElementsByClassName('lw-chart-range-selector')[0];

            if (oldRangeSelector) {
                oldRangeSelector.parentElement.removeChild(oldRangeSelector);
            }
        }

        if (!axis || axis.visible === false || g.type === 'spider')
            return false;

        if (!self._isGroupVisible(groupIndex))
            return false;

        if (!rangeSelector)
            return false;

        let swapXY = g.orientation === 'horizontal';
        if (rangeSelector.renderTo)
            swapXY = false;

        if (self.rightToLeft)
            axis.flip = true;

        let axisSize = swapXY ? self.offsetHeight : self.offsetWidth;
        axisSize -= 4;

        const axisStats = this._getXAxisStats(groupIndex, axis, axisSize);

        let axisPosition = axis.position;
        if (rangeSelector.renderTo && rangeSelector.position)
            axisPosition = rangeSelector.position;

        if (!this._isSelectorRefresh) {
            const renderTo = rangeSelector.renderTo;

            const div = document.createElement('div');

            div.className = 'lw-chart-range-selector lw-unselectable';
            div.style.position = 'absolute';
            div.style.backgroundColor = 'transparent';
            div.style.onselectstart = function () {
                return false;
            };

            if (!renderTo) {
                this.renderer.getContainer().appendChild(div);

                const selectorSize = this._selectorGetSize(axis);

                if (!swapXY) {
                    div.style.left = '1px';
                    div.style.top = (rect.y + (axisPosition !== 'top' ? rect.height : -selectorSize)) + 'px';
                    div.style.height = selectorSize + 'px';
                    div.style.width = axisSize + 'px';
                }
                else {
                    div.style.left = (1 + rect.x + (axisPosition !== 'right' ? -selectorSize : rect.width)) + 'px';
                    div.style.top = '0';
                    div.style.height = axisSize + 'px';
                    div.style.width = selectorSize + 'px';

                    rect.height = selectorSize;
                }
            }
            else {
                renderTo.appendChild(div);

                div.style.width = renderTo.offsetWidth + 'px';
                div.style.height = renderTo.offsetHeight + 'px';
                rect.width = renderTo.offsetWidth;
                rect.height = renderTo.offsetHeight;
            }

            div.parentDiv = div.parentElement;
            this._refreshSelector(groupIndex, axis, axisStats, div, rect, swapXY);
        }

        this._isSelectorRefresh = false;

        return true;
    };

    LW.Chart.prototype._refreshSelector = function (groupIndex, axis, axisStats, renderTo, rect, swapXY) {
        const self = this;
        const xAxisSettings = {};
        const selector = axis.rangeSelector;

        for (let i in selector)
            xAxisSettings[i] = selector[i];

        delete xAxisSettings.padding;

        let min = xAxisSettings.minValue;
        let max = xAxisSettings.maxValue;

        if (isNaN(min))
            min = Math.min(axisStats.min.valueOf(), axisStats.dsRange.min.valueOf());
        if (isNaN(max))
            max = Math.max(axisStats.max.valueOf(), axisStats.dsRange.max.valueOf());

        if (this._isDate(axisStats.min))
            min = new Date(min);
        if (this._isDate(axisStats.max))
            max = new Date(max);

        let axisPosition = axis.position;
        if (selector.renderTo && selector.position)
            axisPosition = selector.position;

        xAxisSettings.dataField = axis.dataField;
        delete xAxisSettings.rangeSelector;
        xAxisSettings.type = axis.type;
        xAxisSettings.baseUnit = selector.baseUnit !== null ? selector.baseUnit : axis.baseUnit;
        xAxisSettings.minValue = min;
        xAxisSettings.maxValue = max;
        xAxisSettings.flip = axis.flip;
        xAxisSettings.position = axisPosition;

        const defaultPadding = 5;

        let leftPadding = 2,
            rightPadding = 2,
            topPadding = 2,
            bottomPadding = 2;

        if (!selector.renderTo) {
            leftPadding = swapXY ? 0 : rect.x;
            rightPadding = swapXY ? 0 : this._rect.width - rect.x - rect.width;
            topPadding = swapXY ? rect.y : defaultPadding;
            bottomPadding = swapXY ? this._paddedRect.height - this._plotRect.height : defaultPadding;
        }

        let padding = selector.padding;
        if ((padding === undefined || padding === null) && !selector.renderTo)
            padding = { left: leftPadding, top: topPadding, right: rightPadding, bottom: bottomPadding };
        else {
            padding = {
                left: ((padding && padding.left) ? padding.left : leftPadding),
                top: ((padding && padding.top) ? padding.top : topPadding),
                right: ((padding && padding.right) ? padding.right : rightPadding),
                bottom: ((padding && padding.bottom) ? padding.bottom : bottomPadding)
            };
        }

        let dataField = selector.dataField;
        for (let i = 0; (dataField === undefined || dataField === null) && i < this.seriesGroups.length; i++) {
            for (let j = 0; (dataField === undefined || dataField === null) && j < this.seriesGroups[i].series.length; j++)
                dataField = this.seriesGroups[i].series[j].dataField;
        }

        const rangeSelectorSettings =
        {
            parentChart: this,
            padding: padding,
            _isRangeSelectorInstance: true,
            theme: this.theme,
            caption: selector.caption,
            description: selector.description,
            titlePadding: selector.titlePadding,
            colorScheme: selector.colorScheme || this.colorScheme,
            backgroundColor: selector.backgroundColor || this.backgroundColor || self._getThemeColor('background'),
            backgroundImage: selector.backgroundImage,
            showBorderLine: selector.showBorderLine !== null ? selector.showBorderLine : (selector.renderTo ? true : false),
            borderLineWidth: selector.borderLineWidth || this.borderLineWidth,
            borderLineColor: selector.borderLineColor || this.borderLineColor || self._getThemeColor('line'),
            rightToLeft: selector.rightToLeft !== null ? selector.rightToLeft : this.rightToLeft,
            greyScale: selector.greyScale !== null ? selector.greyScale : this.greyScale,
            renderEngine: this.renderEngine,
            showLegend: false,
            animation: 'none',
            enableEvents: false,
            showToolTips: false,
            dataSource: this.dataSource,
            xAxis: xAxisSettings,
            seriesGroups:
                [
                    {
                        orientation: swapXY ? 'horizontal' : 'vertical',
                        valueAxis:
                        {
                            visible: false
                            //unitInterval: 10
                        },
                        type: selector.serieType,
                        skipOverlappingPoints: selector.skipOverlappingPoints,
                        columnSeriesOverlap: selector.columnSeriesOverlap,
                        columnsGapPercent: selector.columnsGapPercent,
                        seriesGapPercent: selector.seriesGapPercent,
                        series:
                            [
                                { dataField: dataField, opacity: 0.8, lineWidth: 1 }
                            ]
                    }
                ]
        }

        if (selector.seriesGroups) {
            rangeSelectorSettings.seriesGroups = selector.seriesGroups;
        }
        if (selector.valueAxis.visible) {
            rangeSelectorSettings.valueAxis = selector.valueAxis;
        }

        if (!rangeSelectorSettings.showBorderLine) {
            rangeSelectorSettings.borderLineWidth = 1;
            rangeSelectorSettings.borderLineColor = self._get([this.backgroundColor, this.background, self._getThemeColor('background')]);
            rangeSelectorSettings.showBorderLine = true;
        }

        self._supressBindingRefresh = true;

        renderTo.innerHTML = '';

        const rangeSelectorChart = document.createElement('lw-chart');

        rangeSelectorChart.rightToLeft = self.rightToLeft;
        rangeSelectorChart.parentDiv = renderTo;

        for (let property in rangeSelectorSettings) {
            rangeSelectorChart[property] = rangeSelectorSettings[property];
        }

        renderTo.appendChild(rangeSelectorChart);

        self._rangeSelectorInstances[groupIndex] = rangeSelectorChart;

        self._supressBindingRefresh = false;

        const createSlidersWhenRendered = function () {
            if (!rangeSelectorChart._plotRect)
                return;

            const sliderRect = rangeSelectorChart._paddedRect;

            sliderRect.height = rangeSelectorChart._plotRect.height;
            if (!swapXY && axisPosition === 'top')
                sliderRect.y += rangeSelectorChart._renderData[0].xAxis.rect.height;
            else if (swapXY) {
                const sliderXAxisWidth = rangeSelectorChart._renderData[0].xAxis.rect.width;

                sliderRect.width -= sliderXAxisWidth;
                if (axisPosition !== 'right')
                    sliderRect.x += sliderXAxisWidth;
            }

            self._createSliderElements(groupIndex, renderTo, sliderRect, selector, { min: xAxisSettings.minValue, max: xAxisSettings.maxValue });
            self._rangeSelectorEventData = { groupIndex: groupIndex, renderTo: renderTo, swapXY: swapXY };

            if (self.hasAttribute('aria-owns')) {
                const attributeValue = self.getAttribute('aria-owns');

                self.setAttribute('aria-owns', attributeValue + ' ' + rangeSelectorChart.id);
            }
            else {
                self.setAttribute('aria-owns', rangeSelectorChart.id);
            }
        };

        if (!rangeSelectorChart.isRendered) {
            rangeSelectorChart.whenRendered(() => {
                createSlidersWhenRendered();
            });
        }
        else {
            createSlidersWhenRendered();
        }
    };

    LW.Chart.prototype._createSliderElements = function (groupIndex, renderTo, rect, selectorSettings, xAxisSettings) {
        const that = this,
            oldSlider = renderTo.getElementsByClassName('slider')[0];

        if (oldSlider) {
            oldSlider.parentElement.removeChild(oldSlider);
        }

        const colorSelectedRange = selectorSettings.selectedRangeColor || 'blue';
        const selectedRangeOpacity = that._get([selectorSettings.selectedRangeOpacity, 0.1]);
        const unselectedRangeOpacity = that._get([selectorSettings.unselectedRangeOpacity, 0.5]);
        const colorUnselectedRange = selectorSettings.unselectedRangeColor || 'white';
        const colorRangeLineColor = selectorSettings.rangeLineColor || 'grey';

        const div = document.createElement('div');

        div.className = 'slider';
        div.style.position = 'absolute';
        div.style.background = colorSelectedRange;
        div.style.opacity = selectedRangeOpacity;
        div.style.left = rect.x + 'px';
        div.style.top = rect.y + 'px';
        div.style.width = rect.width + 'px';
        div.style.height = rect.height + 'px';
        renderTo.appendChild(div);

        while (this._sliders.length < groupIndex + 1)
            this._sliders.push({});

        function createDiv(background, opacity) {
            const div = document.createElement('div');

            div.className = 'slider';
            div.style.position = 'absolute';
            div.style.background = background;
            div.style.opacity = opacity;
            return div;
        }

        function createDivBarDef() {
            const div = document.createElement('div');

            div.className = 'slider';
            div.style.position = 'absolute';
            div.style.background = '#FFFFFF';
            div.style.borderStyle = 'solid';
            div.style.borderWidth = '1px';
            div.style.borderRadius = '3px';
            div.style.borderColor = colorRangeLineColor;
            div.setAttribute('role', 'slider');
            div.setAttribute('aria-controls', that.id);
            return div;
        }

        const divRect = div.getBoundingClientRect(),
            renderToRect = renderTo.getBoundingClientRect();

        this._sliders[groupIndex] = {
            element: div,
            host: renderTo.firstElementChild,
            _sliderInitialAbsoluteRect: { x: divRect.left, y: divRect.top, width: rect.width, height: rect.height },
            _hostInitialAbsolutePos: { x: renderToRect.left, y: renderToRect.top },
            getRect: function () {
                const hostRect = renderTo.getBoundingClientRect();

                return {
                    x: hostRect.left - this._hostInitialAbsolutePos.x + this._sliderInitialAbsoluteRect.x,
                    y: hostRect.top - this._hostInitialAbsolutePos.y + this._sliderInitialAbsoluteRect.y,
                    width: this._sliderInitialAbsoluteRect.width,
                    height: this._sliderInitialAbsoluteRect.height
                };
            },
            rect: rect,
            left: createDiv(colorUnselectedRange, unselectedRangeOpacity),
            right: createDiv(colorUnselectedRange, unselectedRangeOpacity),
            leftTop: createDiv(colorRangeLineColor, unselectedRangeOpacity),
            rightTop: createDiv(colorRangeLineColor, unselectedRangeOpacity),
            leftBorder: createDiv(colorRangeLineColor, unselectedRangeOpacity),
            leftBar: createDivBarDef(),
            rightBorder: createDiv(colorRangeLineColor, unselectedRangeOpacity),
            rightBar: createDivBarDef()
        };

        const slider = this._sliders[groupIndex];

        renderTo.appendChild(slider.left);
        renderTo.appendChild(slider.right);
        renderTo.appendChild(slider.leftTop);
        renderTo.appendChild(slider.rightTop);
        renderTo.appendChild(slider.leftBorder);
        renderTo.appendChild(slider.rightBorder);
        renderTo.appendChild(slider.leftBar);
        renderTo.appendChild(slider.rightBar);

        const renderData = this._renderData[groupIndex].xAxis;
        const stats = renderData.data.axisStats;

        const minValue = stats.min.valueOf();
        const maxValue = stats.max.valueOf();

        if (typeof stats.min === 'number') {
            slider.leftBar.setAttribute('aria-valuemin', xAxisSettings.min);
            slider.leftBar.setAttribute('aria-valuemax', xAxisSettings.max);
            slider.leftBar.setAttribute('aria-valuenow', minValue);

            slider.rightBar.setAttribute('aria-valuemin', xAxisSettings.min);
            slider.rightBar.setAttribute('aria-valuemax', xAxisSettings.max);
            slider.rightBar.setAttribute('aria-valuenow', maxValue);
        }
        else {
            slider.leftBar.setAttribute('aria-valuemin', xAxisSettings.min.getTime());
            slider.leftBar.setAttribute('aria-valuemax', xAxisSettings.max.getTime());
            slider.leftBar.setAttribute('aria-valuenow', stats.min.getTime());
            slider.leftBar.setAttribute('aria-valuetext', stats.min.toLocaleString());

            slider.rightBar.setAttribute('aria-valuemin', xAxisSettings.min.getTime());
            slider.rightBar.setAttribute('aria-valuemax', xAxisSettings.max.getTime());
            slider.rightBar.setAttribute('aria-valuenow', stats.max.getTime());
            slider.rightBar.setAttribute('aria-valuetext', stats.max.toLocaleString());
        }

        let startOffset = this._valueToOffset(groupIndex, minValue);
        let endOffset = this._valueToOffset(groupIndex, maxValue);

        if (startOffset > endOffset) {
            const tmp = endOffset;
            endOffset = startOffset;
            startOffset = tmp;
        }

        if (this.seriesGroups[groupIndex].orientation !== 'horizontal') {
            div.style.left = Math.round(rect.x + startOffset) + 'px';
            div.style.top = rect.y + 'px';
            div.style.width = Math.round(endOffset - startOffset) + 'px';
            div.style.height = rect.height + 'px';
        }
        else {
            div.style.left = rect.x + 'px';
            div.style.top = Math.round(rect.y + startOffset) + 'px';
            div.style.width = rect.width + 'px';
            div.style.height = Math.round(endOffset - startOffset) + 'px';
        }

        this._setSliderPositions(groupIndex, startOffset, endOffset);
    };

    LW.Chart.prototype._setSliderPositions = function (groupIndex, startOffset, endOffset) {
        const g = this.seriesGroups[groupIndex];
        const axis = this._getXAxis(groupIndex);
        const selector = axis.rangeSelector;

        let swapXY = g.orientation === 'horizontal';
        if (axis.rangeSelector.renderTo)
            swapXY = false;

        let axisPosition = axis.position;
        if (selector.renderTo && selector.position)
            axisPosition = selector.position;

        const slider = this._sliders[groupIndex];

        const posProp = swapXY ? 'top' : 'left';
        const oPosProp = swapXY ? 'left' : 'top';
        const sizeProp = swapXY ? 'height' : 'width';
        const oSizeProp = swapXY ? 'width' : 'height';
        const rectPosProp = swapXY ? 'y' : 'x';
        const rectOPosProp = swapXY ? 'x' : 'y';

        const rect = slider.rect;

        slider.startOffset = startOffset;
        slider.endOffset = endOffset;

        slider.left.style[posProp] = (rect[rectPosProp]) + 'px';
        slider.left.style[oPosProp] = (rect[rectOPosProp]) + 'px';
        slider.left.style[sizeProp] = (startOffset) + 'px';
        slider.left.style[oSizeProp] = (rect[oSizeProp]) + 'px';

        slider.right.style[posProp] = (rect[rectPosProp] + endOffset) + 'px';
        slider.right.style[oPosProp] = (rect[rectOPosProp]) + 'px';
        slider.right.style[sizeProp] = (rect[sizeProp] - endOffset + 1) + 'px';
        slider.right.style[oSizeProp] = (rect[oSizeProp]) + 'px';

        slider.leftTop.style[posProp] = (rect[rectPosProp]) + 'px';
        slider.leftTop.style[oPosProp] = (rect[rectOPosProp] + (((swapXY && axisPosition === 'right') || (!swapXY && axisPosition !== 'top')) ? 0 : rect[oSizeProp])) + 'px';
        slider.leftTop.style[sizeProp] = (startOffset) + 'px';
        slider.leftTop.style[oSizeProp] = (1) + 'px';

        slider.rightTop.style[posProp] = (rect[rectPosProp] + endOffset) + 'px';
        slider.rightTop.style[oPosProp] = (rect[rectOPosProp] + (((swapXY && axisPosition === 'right') || (!swapXY && axisPosition !== 'top')) ? 0 : rect[oSizeProp])) + 'px';
        slider.rightTop.style[sizeProp] = (rect[sizeProp] - endOffset + 1) + 'px';
        slider.rightTop.style[oSizeProp] = (1) + 'px';

        slider.leftBorder.style[posProp] = (rect[rectPosProp] + startOffset) + 'px';
        slider.leftBorder.style[oPosProp] = (rect[rectOPosProp]) + 'px';
        slider.leftBorder.style[sizeProp] = (1) + 'px';
        slider.leftBorder.style[oSizeProp] = (rect[oSizeProp]) + 'px';

        let handleBarSize = rect[oSizeProp] / 4;
        if (handleBarSize > 20)
            handleBarSize = 20;
        if (handleBarSize < 3)
            handleBarSize = 3;

        slider.leftBar.style[posProp] = (rect[rectPosProp] + startOffset - 3) + 'px';
        slider.leftBar.style[oPosProp] = (rect[rectOPosProp] + rect[oSizeProp] / 2 - handleBarSize / 2) + 'px';
        slider.leftBar.style[sizeProp] = (5) + 'px';
        slider.leftBar.style[oSizeProp] = (handleBarSize) + 'px';

        slider.rightBorder.style[posProp] = (rect[rectPosProp] + endOffset) + 'px';
        slider.rightBorder.style[oPosProp] = (rect[rectOPosProp]) + 'px';
        slider.rightBorder.style[sizeProp] = (1) + 'px';
        slider.rightBorder.style[oSizeProp] = (rect[oSizeProp]) + 'px';

        slider.rightBar.style[posProp] = (rect[rectPosProp] + endOffset - 3) + 'px';
        slider.rightBar.style[oPosProp] = (rect[rectOPosProp] + rect[oSizeProp] / 2 - handleBarSize / 2) + 'px';
        slider.rightBar.style[sizeProp] = (5) + 'px';
        slider.rightBar.style[oSizeProp] = (handleBarSize) + 'px';
    };

    LW.Chart.prototype._resizeState = {};

    LW.Chart.prototype._onSliderMouseDown = function (event) {
        event.stopImmediatePropagation();
        event.stopPropagation();

        const self = this;
        const slider = self._sliders[self._rangeSelectorEventData.groupIndex];
        if (!slider)
            return;

        if (self._resizeState.state === undefined || self._resizeState.state === null)
            self._testAndSetReadyResize(event);

        if (self._resizeState.state !== 'ready')
            return;

        self._draggingRangeSelector = true;
        self._resizeState.state = 'resizing';
    };

    LW.Chart.prototype._valueToOffset = function (groupIndex, value) {
        const group = this.seriesGroups[groupIndex];
        const slider = this._sliders[groupIndex];

        const selectorChart = slider.host;
        const renderData = selectorChart._renderData[0].xAxis;
        const stats = renderData.data.axisStats;

        const axisMin = stats.min.valueOf();
        const axisMax = stats.max.valueOf();

        let denom = axisMax - axisMin;
        if (denom === 0)
            denom = 1;

        const axis = this._getXAxis(groupIndex);
        const sizeProp = group.orientation === 'horizontal' ? 'height' : 'width';

        const percent = (value.valueOf() - axisMin) / denom;

        return slider.getRect()[sizeProp] * (axis.flip ? (1 - percent) : percent);
    };

    LW.Chart.prototype._offsetToValue = function (groupIndex, offset) {
        const slider = this._sliders[groupIndex];

        const group = this.seriesGroups[groupIndex];
        const axis = this._getXAxis(groupIndex);

        const sizeProp = group.orientation === 'horizontal' ? 'height' : 'width';

        let denom = slider.getRect()[sizeProp];
        if (denom === 0)
            denom = 1;

        const selectorChart = slider.host;
        const renderData = selectorChart._renderData[0].xAxis;
        const stats = renderData.data.axisStats;

        const axisMin = stats.min.valueOf();
        const axisMax = stats.max.valueOf();

        let value = offset / denom * (axisMax - axisMin) + axisMin;

        if (axis.flip === true) {
            value = axisMax - offset / denom * (axisMax - axisMin);
        }

        if (this._isDate(stats.min) || this._isDate(stats.max)) {
            value = new Date(value);
        }
        else {
            if (axis.dataField === undefined || axis.dataField === null || stats.useIndeces)
                value = Math.round(value);

            if (value < stats.min)
                value = stats.min;
            if (value > stats.max)
                value = stats.max;
        }

        return value;
    };

    LW.Chart.prototype._onSliderMouseUp = function (event) {
        const self = this;
        const groupIndex = self._rangeSelectorEventData.groupIndex;
        const swapXY = self._rangeSelectorEventData.swapXY;
        const slider = self._sliders[groupIndex];

        delete self._draggingRangeSelector;

        if (!slider)
            return;

        if (self._resizeState.state !== 'resizing')
            return;

        event.stopImmediatePropagation();
        event.stopPropagation();

        self._resizeState = {};

        // update
        self.style.cursor = 'default';

        const leftProp = !swapXY ? 'left' : 'top';
        const posProp = !swapXY ? 'x' : 'y';

        const from = slider.element.getBoundingClientRect()[leftProp];
        const to = from + (!swapXY ? slider.element.offsetWidth : slider.element.offsetHeight);

        const fullRect = slider.getRect();

        let minValue = self._offsetToValue(groupIndex, from - fullRect[posProp]);
        let maxValue = self._offsetToValue(groupIndex, to - fullRect[posProp]);

        const selectorChart = slider.host;
        const renderData = selectorChart._renderData[0].xAxis;
        const stats = renderData.data.axisStats;

        if (!stats.isTimeUnit && (maxValue.valueOf() - minValue.valueOf()) > 86400000) {
            minValue.setHours(0, 0, 0, 0);
            maxValue.setDate(maxValue.getDate() + 1);
            maxValue.setHours(0, 0, 0, 0);
        }

        const axis = self._getXAxis(groupIndex);
        if (axis.flip) {
            const tmp = minValue;
            minValue = maxValue;
            maxValue = tmp;
        }

        // apply to all groups that share this range selector
        for (let i = 0; i < self.seriesGroups.length; i++) {
            const groupXAxis = self._getXAxis(i);
            if (groupXAxis === axis)
                self._selectorRange[i] = { min: minValue, max: maxValue };
        }

        self._isSelectorRefresh = true;
        const animSave = self.animation;

        self.$.fireEvent('rangeSelectionChanging', { instance: self, minValue: minValue, maxValue: maxValue });

        self.animation = 'none';
        self.update();
        self.animation = animSave;

        self.$.fireEvent('rangeSelectionChanged', { instance: self, minValue: minValue, maxValue: maxValue });

        if (typeof minValue === 'number') {
            slider.leftBar.setAttribute('aria-valuenow', minValue);
            slider.rightBar.setAttribute('aria-valuenow', maxValue);
        }
        else {
            slider.leftBar.setAttribute('aria-valuenow', minValue.getTime());
            slider.leftBar.setAttribute('aria-valuetext', minValue.toLocaleString());
            slider.rightBar.setAttribute('aria-valuenow', maxValue.getTime());
            slider.rightBar.setAttribute('aria-valuetext', maxValue.toLocaleString());
        }
    };

    LW.Chart.prototype._onSliderMouseMove = function (event) {
        const self = this;
        const groupIndex = self._rangeSelectorEventData.groupIndex;
        const slider = self._sliders[groupIndex];
        const swapXY = self._rangeSelectorEventData.swapXY;

        if (!slider)
            return;

        const rect = slider.getRect();
        const element = slider.element;

        const position = { left: event.clientX, top: event.clientY };
        const coord = element.getBoundingClientRect();

        const leftProp = !swapXY ? 'left' : 'top',
            elementLeftProp = parseFloat(getComputedStyle(element)[leftProp]);
        const widthProp = !swapXY ? 'width' : 'height';

        const posProp = !swapXY ? 'x' : 'y';

        if (self._resizeState.state === 'resizing') {
            event.stopImmediatePropagation();
            event.stopPropagation();

            if (self._resizeState.side === 'left') {
                let diff = Math.round(position[leftProp] - coord[leftProp]);
                let pos = rect[posProp];
                if (coord[leftProp] + diff >= pos && coord[leftProp] + diff <= pos + rect[widthProp]) {
                    let left = parseInt(elementLeftProp);
                    let newSize = Math.max(2, (swapXY ? element.offsetHeight : element.offsetWidth) - diff);
                    element.style[widthProp] = (newSize) + 'px';
                    element.style[leftProp] = (left + diff) + 'px';
                }
            }
            else if (self._resizeState.side === 'right') {
                let elementSize = swapXY ? element.offsetHeight : element.offsetWidth;
                let diff = Math.round(position[leftProp] - coord[leftProp] - elementSize);
                let pos = rect[posProp];
                if (coord[leftProp] + elementSize + diff >= pos && coord[leftProp] + diff + elementSize <= pos + rect[widthProp]) {
                    let newSize = Math.max(2, elementSize + diff);
                    element.style[widthProp] = (newSize) + 'px';
                }
            }
            else if (self._resizeState.side === 'move') {
                let elementSize = swapXY ? element.offsetHeight : element.offsetWidth;
                let left = parseInt(elementLeftProp);
                let diff = Math.round(position[leftProp] - self._resizeState.startPos);

                if (coord[leftProp] + diff >= rect[posProp] &&
                    coord[leftProp] + diff + elementSize <= rect[posProp] + rect[widthProp]
                ) {
                    self._resizeState.startPos = position[leftProp];
                    element.style[leftProp] = (left + diff) + 'px';
                }
            }

            const startOffset = parseInt(elementLeftProp) - slider.rect[posProp];
            const endOffset = startOffset + (swapXY ? element.offsetHeight : element.offsetWidth);
            self._setSliderPositions(groupIndex, startOffset, endOffset);
        }
        else {
            self._testAndSetReadyResize(event);
        }
    };

    LW.Chart.prototype._testAndSetReadyResize = function (event) {
        const self = this,
            eventData = self._rangeSelectorEventData;
        const renderTo = eventData.renderTo;
        const groupIndex = eventData.groupIndex;
        const slider = self._sliders[groupIndex];
        const swapXY = eventData.swapXY;

        const rect = slider.getRect();
        const element = slider.element;

        const position = { left: event.clientX, top: event.clientY };
        const coord = element.getBoundingClientRect();

        const topProp = swapXY ? 'left' : 'top';
        const leftProp = !swapXY ? 'left' : 'top';
        const heightProp = swapXY ? 'width' : 'height';

        const diff = self._isTouchDevice ? 30 : 5;

        if (position[topProp] >= coord[topProp] && position[topProp] <= coord[topProp] + rect[heightProp]) {
            if (Math.abs(position[leftProp] - coord[leftProp]) <= diff) {
                renderTo.style.cursor = swapXY ? 'row-resize' : 'col-resize';
                self._resizeState = { state: 'ready', side: 'left' };
            }
            else if (Math.abs(position[leftProp] - coord[leftProp] - (!swapXY ? element.offsetWidth : element.offsetHeight)) <= diff) {
                renderTo.style.cursor = swapXY ? 'row-resize' : 'col-resize';
                self._resizeState = { state: 'ready', side: 'right' };
            }
            else if (position[leftProp] + diff > coord[leftProp] && position[leftProp] - diff < coord[leftProp] + (!swapXY ? element.offsetWidth : element.offsetHeight)) {
                renderTo.style.cursor = 'pointer';
                self._resizeState = { state: 'ready', side: 'move', startPos: position[leftProp] };
            }
            else {
                renderTo.style.cursor = 'default';
                self._resizeState = {};
            }
        }
        else {
            renderTo.style.cursor = 'default';
            self._resizeState = {};
        }
    };

    LW.Chart.prototype._selectorGetSize = function (axis) {
        if (axis.rangeSelector.renderTo)
            return 0;
        return axis.rangeSelector.size || this._paddedRect.height / 3;
    };
})();
