
(function () {
    'use strict';

    if (!LW.Chart) {
        return;
    }

    LW.Chart.prototype._moduleApi = true;

    LW.Chart.prototype.getItemsCount = function (groupIndex, serieIndex) {
        const g = this.seriesGroups[groupIndex];

        if (!this._isSerieVisible(groupIndex, serieIndex))
            return 0;

        const renderData = this._renderData;
        if (!g || !renderData || renderData.length <= groupIndex)
            return 0;

        const serie = g.series[serieIndex];
        if (!serie)
            return 0;

        return renderData[groupIndex].offsets[serieIndex].length;
    };

    LW.Chart.prototype.getXAxisRect = function (groupIndex) {
        const renderData = this._renderData;
        if (!renderData || renderData.length <= groupIndex)
            return undefined;

        if (!renderData[groupIndex].xAxis)
            return undefined;

        return renderData[groupIndex].xAxis.rect;
    };

    LW.Chart.prototype.getXAxisLabels = function (groupIndex) {
        const output = [];

        let renderData = this._renderData;
        if (!renderData || renderData.length <= groupIndex)
            return output;

        renderData = renderData[groupIndex].xAxis;
        if (!renderData)
            return output;

        const group = this.seriesGroups[groupIndex];

        if (group.polar || group.spider) {
            for (let i = 0; i < renderData.polarLabels.length; i++) {
                const label = renderData.polarLabels[i];
                output.push({ offset: { x: label.x, y: label.y }, value: label.value });
            }

            return output;
        }

        const xAxis = this._getXAxis(groupIndex);
        const rect = this.getXAxisRect(groupIndex);
        const swapPosition = xAxis.position === 'top' || xAxis.position === 'right';
        const swapXY = group.orientation === 'horizontal';

        for (let i = 0; i < renderData.data.length; i++) {
            if (swapXY)
                output.push({ offset: { x: rect.x + (swapPosition ? 0 : rect.width), y: rect.y + renderData.data.data[i] }, value: renderData.data.xvalues[i] });
            else
                output.push({ offset: { x: rect.x + renderData.data.data[i], y: rect.y + (swapPosition ? rect.height : 0) }, value: renderData.data.xvalues[i] });
        }

        return output;
    };

    LW.Chart.prototype.getValueAxisRect = function (groupIndex) {
        const renderData = this._renderData;
        if (!renderData || renderData.length <= groupIndex)
            return undefined;

        if (!renderData[groupIndex].valueAxis)
            return undefined;

        return renderData[groupIndex].valueAxis.rect;
    };

    LW.Chart.prototype.getValueAxisLabels = function (groupIndex) {
        const output = [];

        let renderData = this._renderData;
        if (!renderData || renderData.length <= groupIndex)
            return output;

        renderData = renderData[groupIndex].valueAxis;
        if (!renderData)
            return output;

        const valueAxis = this._getValueAxis(groupIndex);
        const swapPosition = valueAxis.position === 'top' || valueAxis.position === 'right';

        const group = this.seriesGroups[groupIndex];
        const swapXY = group.orientation === 'horizontal';

        if (group.polar || group.spider) {
            for (let i = 0; i < renderData.polarLabels.length; i++) {
                const label = renderData.polarLabels[i];
                output.push({ offset: { x: label.x, y: label.y }, value: label.value });
            }

            return output;
        }

        for (let i = 0; i < renderData.items.length; i++) {
            if (swapXY) {
                output.push(
                    {
                        offset:
                        {
                            x: renderData.itemOffsets[renderData.items[i]].x + renderData.itemWidth / 2,
                            y: renderData.rect.y + (swapPosition ? renderData.rect.height : 0)
                        },
                        value: renderData.items[i]
                    }
                );
            }
            else {
                output.push(
                    {
                        offset:
                        {
                            x: renderData.rect.x + renderData.rect.width,
                            y: renderData.itemOffsets[renderData.items[i]].y + renderData.itemWidth / 2
                        },
                        value: renderData.items[i]
                    }
                );

            }
        }

        return output;
    };

    LW.Chart.prototype.getPlotAreaRect = function () {
        return this._plotRect;
    };

    LW.Chart.prototype.getRect = function () {
        return this._rect;
    };

    LW.Chart.prototype.showToolTip = function (groupIndex, serieIndex, itemIndex, showDelay, hideDelay) {
        const coord = this.getItemCoord(groupIndex, serieIndex, itemIndex);
        if (isNaN(coord.x) || isNaN(coord.y))
            return;

        this._startTooltipTimer(groupIndex, serieIndex, itemIndex, coord.x, coord.y, showDelay, hideDelay);
    };

    LW.Chart.prototype.hideToolTip = function (hideDelay) {
        if (isNaN(hideDelay))
            hideDelay = 0;

        const self = this;
        self._cancelTooltipTimer();

        setTimeout(function () {
            self._hideToolTip(0);
        }, hideDelay);
    };
})();
