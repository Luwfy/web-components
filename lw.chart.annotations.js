
(function () {
    'use strict';

    if (!LW.Chart) {
        return;
    }

    LW.Chart.prototype._moduleAnnotations = true;

    LW.Chart.prototype._renderAnnotation = function (groupIndex, annotation) {
        const group = this.seriesGroups[groupIndex];

        const renderer = this.renderer;

        if (isNaN(groupIndex))
            return;

        let x = this._get([this.getXAxisDataPointOffset(annotation.xValue, groupIndex), annotation.x]);
        let y = this._get([this.getValueAxisDataPointOffset(annotation.yValue, groupIndex), annotation.y]);
        let x2 = this._get([this.getXAxisDataPointOffset(annotation.xValue2, groupIndex), annotation.x2]);
        let y2 = this._get([this.getValueAxisDataPointOffset(annotation.yValue2, groupIndex), annotation.y2]);

        if (group.polar || group.spider) {
            const point = this.getPolarDataPointOffset(annotation.xValue, annotation.yValue, groupIndex);
            if (point && !isNaN(point.x) && !isNaN(point.y)) {
                x = point.x;
                y = point.y;
            }
            else {
                x = annotation.x;
                y = annotation.y;
            }
        }

        if (isNaN(y) || isNaN(x))
            return false;

        if (group.orientation === 'horizontal') {
            let tmp = x;
            x = y;
            y = tmp;

            tmp = x2;
            x2 = y2;
            y2 = tmp;
        }

        if (annotation.offset) {
            if (!isNaN(annotation.offset.x)) {
                x += annotation.offset.x;
                x2 += annotation.offset.x;
            }

            if (!isNaN(annotation.offset.y)) {
                y += annotation.offset.y;
                y2 += annotation.offset.y;
            }
        }

        const width = this._get([annotation.width, x2 - x]);
        const height = this._get([annotation.height, y2 - y]);

        let shape;
        switch (annotation.type) {
            case 'rect':
                shape = renderer.rect(x, y, width, height);
                break;
            case 'circle':
                shape = renderer.rect(x, y, annotation.radius);
                break;
            case 'line':
                shape = renderer.rect(x, y, x2, y2);
                break;
            case 'path':
                shape = renderer.path(annotation.path);
                break;
        }

        if (shape) {
            renderer.attr(shape,
                {
                    fill: annotation.fillColor,
                    stroke: annotation.lineColor,
                    opacity: this._get([annotation.fillOpacity, annotation.opacity]),
                    'stroke-opacity': this._get([annotation.lineOpacity, annotation.opacity]),
                    'stroke-width': annotation.lineWidth,
                    'stroke-dasharray': annotation.dashStyle || 'none'
                });
        }

        let txtElement;
        if (annotation.text) {
            const txt = annotation.text;

            let xOffset = 0,
                yOffset = 0;

            if (txt.offset) {
                if (!isNaN(txt.offset.x))
                    xOffset += txt.offset.x;

                if (!isNaN(txt.offset.y))
                    yOffset += txt.offset.y;
            }

            txtElement = renderer.text(
                txt.value,
                x + xOffset,
                y + yOffset,
                NaN,
                NaN,
                txt.angle,
                {},
                txt.clip === true,
                txt.horizontalAlignment || 'center',
                txt.verticalAlignment || 'center',
                txt.rotationPoint || 'centermiddle');

            renderer.attr(txtElement,
                {
                    fill: txt.fillColor,
                    stroke: txt.lineColor,
                    'class': 'lw-chart-annotation-text ' + (txt['class'] || '')
                });
        }

        const events = [
            'click',
            'mouseenter',
            'mouseleave'
        ];

        const self = this;

        for (let i = 0; i < events.length; i++) {
            const event = /*this._getEvent(events[i]) ||*/ events[i];

            if (shape)
                this.renderer.addHandler(shape, event, function () {
                    self._raiseAnnotationEvent(annotation, event);
                });

            if (txtElement)
                this.renderer.addHandler(txtElement, event, function () {
                    self._raiseAnnotationEvent(annotation, event);
                });
        }
    };

    LW.Chart.prototype._raiseAnnotationEvent = function (annotation, event) {
        this.$.fireEvent('annotation' + event.charAt(0).toUpperCase() + event.slice(1), { annotation: annotation });
    };
})();
