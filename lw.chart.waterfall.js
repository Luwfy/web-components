
(function () {
    'use strict';

    if (!LW.Chart) {
        return;
    }

    LW.Chart.prototype._moduleWaterfall = true;

    LW.Chart.prototype._isSummary = function (groupIndex, itemIndex) {
        const group = this.seriesGroups[groupIndex];
        for (let sidx = 0; sidx < group.series.length; sidx++) {
            if (undefined === group.series[sidx].summary)
                continue;

            const summaryValue = this._getDataValue(itemIndex, group.series[sidx].summary, groupIndex);

            if (undefined !== summaryValue)
                return true;
        }

        return false;
    };

    LW.Chart.prototype._applyWaterfall = function (out, len, groupIndex, yzero, gbase, logBase, scale, inverse, isStacked) {
        const group = this.seriesGroups[groupIndex];

        if (out.length === 0)
            return out;

        let lastTo = yzero;

        // waterfall sums by serie / stack
        const wfSum = {};

        const seriesPrevVisibleIndex = [];

        let isDirectionDown;

        const seriesVisibility = [];
        for (let j = 0; j < group.series.length; j++)
            seriesVisibility.push(this._isSerieVisible(groupIndex, j));

        // The direction of the first column is relative to the baseline. For all columns after
        // that the direction is based on whether the value is positive or negative
        // For stacked series the key is -1. For non-stacked the serie index
        const firstItemRendered = {};

        for (let i = 0; i < len; i++) {
            let summaryLastTo = yzero;
            let summarySum = 0;
            const isSummaryItem = this._isSummary(groupIndex, i);

            for (let j = 0; j < out.length; j++) {
                if (!seriesVisibility[j])
                    continue;

                let refBase = 0;

                // handle summary items
                if (isSummaryItem) {
                    refBase = summaryLastTo === yzero ? gbase : 0;

                    out[j][i].value = wfSum[j];
                    out[j][i].summary = true;

                    isDirectionDown = out[j][i].value < refBase;
                    if (inverse)
                        isDirectionDown = !isDirectionDown;

                    let size = 0;
                    if (!isNaN(logBase))
                        size = this._getDataPointOffsetDiff(out[j][i].value + summarySum, summarySum === 0 ? gbase : summarySum, refBase || gbase, logBase, scale, yzero, inverse);
                    else
                        size = this._getDataPointOffsetDiff(out[j][i].value, refBase, refBase, NaN, scale, yzero, inverse);

                    out[j][i].to = summaryLastTo + (isDirectionDown ? size : -size);
                    out[j][i].from = summaryLastTo;

                    if (isStacked) {
                        summarySum += out[j][i].value;
                        summaryLastTo = out[j][i].to;
                    }

                    continue;
                }
                // end of summary items

                const k = isStacked ? -1 : j;

                if (isNaN(out[j][i].value))
                    continue;

                if (undefined === firstItemRendered[k]) {
                    refBase = gbase;
                    firstItemRendered[k] = true;
                }

                isDirectionDown = out[j][i].value < refBase;
                if (inverse)
                    isDirectionDown = !isDirectionDown;

                let y = NaN;

                if (!isStacked) {
                    y = i === 0 ? yzero : out[j][seriesPrevVisibleIndex[j]].to;
                }
                else {
                    y = lastTo;
                }

                let size = 0;
                if (!isNaN(logBase))
                    size = this._getDataPointOffsetDiff(out[j][i].value + (isNaN(wfSum[k]) ? 0 : wfSum[k]), isNaN(wfSum[k]) ? gbase : wfSum[k], refBase || gbase, logBase, scale, y, inverse);
                else
                    size = this._getDataPointOffsetDiff(out[j][i].value, refBase, refBase, NaN, scale, yzero, inverse);

                out[j][i].to = lastTo = y + (isDirectionDown ? size : -size);
                out[j][i].from = y;

                if (isNaN(wfSum[k]))
                    wfSum[k] = out[j][i].value;
                else
                    wfSum[k] += out[j][i].value;

                if (k === -1) {
                    if (isNaN(wfSum[j]))
                        wfSum[j] = out[j][i].value;
                    else
                        wfSum[j] += out[j][i].value;
                }

                if (!isStacked)
                    seriesPrevVisibleIndex[j] = i;
            }
        }

        return out;
    };
})();
