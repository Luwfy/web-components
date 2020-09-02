
/**
 * Chart custom element.
 */
LW('lw-chart', class Chart extends LW.BaseElement {
    /**
     * Chart's properties.
     */
    static get properties() {
        return {
            'animationDuration': {
                value: 300,
                type: 'number'
            },
            'backgroundColor': {
                value: null,
                type: 'string?'
            },
            'backgroundImage': {
                value: '',
                type: 'string'
            },
            'borderLineColor': {
                value: null,
                type: 'string?'
            },
            'borderLineWidth': {
                value: 1,
                type: 'number'
            },
            'caption': {
                value: 'Caption',
                type: 'string'
            },
            'clip': {
                value: true,
                type: 'boolean'
            },
            'colorScheme': {
                value: 'scheme01',
                type: 'string'
            },
            'columnSeriesOverlap': {
                value: false,
                type: 'boolean'
            },
            'crosshairsColor': {
                value: null,
                type: 'string?'
            },
            'crosshairsDashStyle': {
                value: '2,2',
                type: 'string'
            },
            'crosshairsLineWidth': {
                value: 1,
                type: 'number'
            },
            'dataSource': {
                value: [],
                type: 'object',
                reflectToAttribute: false
            },
            'description': {
                value: 'Description',
                type: 'string'
            },
            'draw': {
                value: null,
                type: 'function?'
            },
            'drawBefore': {
                value: null,
                type: 'function?'
            },
            'enableAxisTextAnimation': {
                value: false,
                type: 'boolean'
            },
            'enableCrosshairs': {
                value: false,
                type: 'boolean'
            },
            'greyScale': {
                value: false,
                type: 'boolean'
            },
            'legendLayout': {
                value: {
                    'flow': {
                        value: 'horizontal',
                        allowedValues: ['horizontal', 'vertical'],
                        type: 'string'
                    },
                    'height': {
                        value: null,
                        type: 'number?'
                    },
                    'left': {
                        value: null,
                        type: 'number?'
                    },
                    'top': {
                        value: null,
                        type: 'number?'
                    },
                    'width': {
                        value: null,
                        type: 'number?'
                    }
                },
                type: 'object?'
            },
            'localization': {
                value: {
                    'decimalSeparator': {
                        value: '.',
                        type: 'string'
                    },
                    'patterns': {
                        value: null,
                        type: 'object?'
                    },
                    'thousandsSeparator': {
                        value: '',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'messages': {
                value: {
                    'en': {
                        'invalidRadiusDataField': 'lw-chart: Invalid radiusDataField value at [{{index}}]',
                        'invalidSeries': 'lw-chart: Invalid property: each series group must have a \'series\' property which must be a valid array.',
                        'invalidSeriesGroups': 'lw-chart: Invalid property: \'seriesGroups\' property is required and must be a valid array.',
                        'invalidType': 'lw-chart: Invalid serie type "{{type}}".',
                        'missingAxis': 'lw-chart: seriesGroup[{{index}}] is missing {{axis}} definition.',
                        'missingReference': 'lw-chart: Missing reference to {{files}}.',
                        'missingType': 'lw-chart: Invalid property: each series group must have a valid \'type\' property.'
                    }
                },
                type: 'object',
                extend: true
            },
            'padding': {
                value: {
                    'bottom': {
                        value: 5,
                        type: 'number'
                    },
                    'left': {
                        value: 5,
                        type: 'number'
                    },
                    'right': {
                        value: 5,
                        type: 'number'
                    },
                    'top': {
                        value: 5,
                        type: 'number'
                    }
                },
                type: 'object'
            },
            'renderEngine': {
                value: '',
                allowedValues: ['', 'SVG', 'HTML5'],
                type: 'string'
            },
            'rightToLeft': {
                value: false,
                type: 'boolean'
            },
            'seriesGroups': {
                value: [],
                type: 'any',
                reflectToAttribute: false
            },
            'showBorderLine': {
                value: true,
                type: 'boolean'
            },
            'showLegend': {
                value: true,
                type: 'boolean'
            },
            'showToolTips': {
                value: true,
                type: 'boolean'
            },
            'showToolTipsOnAllSeries': {
                value: false,
                type: 'boolean'
            },
            'theme': {
                value: 'light',
                allowedValues: ['light', 'dark'],
                type: 'string'
            },
            'titlePadding': {
                value: {
                    'bottom': {
                        value: 10,
                        type: 'number'
                    },
                    'left': {
                        value: 5,
                        type: 'number'
                    },
                    'right': {
                        value: 5,
                        type: 'number'
                    },
                    'top': {
                        value: 5,
                        type: 'number'
                    }
                },
                type: 'object'
            },
            'toolTipBackground': {
                value: null,
                type: 'string?'
            },
            'toolTipFormatFunction': {
                value: null,
                type: 'function?'
            },
            'toolTipHideDelay': {
                value: 4000,
                type: 'number'
            },
            'toolTipLineColor': {
                value: null,
                type: 'string?'
            },
            'toolTipShowDelay': {
                value: 300,
                type: 'number'
            },
            'valueAxis': {
                value: {
                    'alternatingBackgroundColor': {
                        value: '',
                        type: 'string'
                    },
                    'alternatingBackgroundColor2': {
                        value: '',
                        type: 'string'
                    },
                    'alternatingBackgroundOpacity': {
                        value: 1,
                        type: 'number'
                    },
                    'axisSize': {
                        value: null,
                        type: 'any'
                    },
                    'bands': {
                        value: null,
                        type: 'array?'
                    },
                    'baselineValue': {
                        value: 0,
                        type: 'any'
                    },
                    'customDraw': {
                        value: false,
                        type: 'boolean'
                    },
                    'flip': {
                        value: false,
                        type: 'boolean'
                    },
                    'formatFunction': {
                        value: null,
                        type: 'function?'
                    },
                    'formatSettings': {
                        value: {
                            'dateFormat': {
                                value: null,
                                type: 'string?'
                            },
                            'decimalPlaces': {
                                value: null,
                                type: 'number?'
                            },
                            'decimalSeparator': {
                                value: null,
                                type: 'string?'
                            },
                            'negativeWithBrackets': {
                                value: false,
                                type: 'boolean'
                            },
                            'prefix': {
                                value: '',
                                type: 'string'
                            },
                            'sufix': {
                                value: '',
                                type: 'string'
                            },
                            'thousandsSeparator': {
                                value: null,
                                type: 'string?'
                            }
                        },
                        type: 'object'
                    },
                    'gridLines': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'labels': {
                        value: {
                            'angle': {
                                value: 0,
                                type: 'number'
                            },
                            'autoRotate': {
                                value: false,
                                type: 'boolean'
                            },
                            'class': {
                                value: null,
                                type: 'string?'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'formatFunction': {
                                value: null,
                                type: 'function?'
                            },
                            'formatSettings': {
                                value: {
                                    'dateFormat': {
                                        value: null,
                                        type: 'string?'
                                    },
                                    'decimalPlaces': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'decimalSeparator': {
                                        value: null,
                                        type: 'string?'
                                    },
                                    'negativeWithBrackets': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'prefix': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'sufix': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'thousandsSeparator': {
                                        value: null,
                                        type: 'string?'
                                    }
                                },
                                type: 'object'
                            },
                            'horizontalAlignment': {
                                value: 'center',
                                allowedValues: ['left', 'center', 'right'],
                                type: 'string'
                            },
                            'offset': {
                                value: {
                                    'x': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'y': {
                                        value: 0,
                                        type: 'number'
                                    }
                                },
                                type: 'object'
                            },
                            'rotationPoint': {
                                value: 'auto',
                                allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                                type: 'string'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'verticalAlignment': {
                                value: 'center',
                                allowedValues: ['top', 'center', 'bottom'],
                                type: 'string'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'line': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'logarithmicScale': {
                        value: false,
                        type: 'boolean'
                    },
                    'logarithmicScaleBase': {
                        value: 10,
                        type: 'number'
                    },
                    'maxValue': {
                        value: NaN,
                        type: 'any'
                    },
                    'minValue': {
                        value: NaN,
                        type: 'any'
                    },
                    'padding': {
                        value: {
                            'bottom': {
                                value: 0,
                                type: 'number'
                            },
                            'left': {
                                value: 0,
                                type: 'number'
                            },
                            'right': {
                                value: 0,
                                type: 'number'
                            },
                            'top': {
                                value: 0,
                                type: 'number'
                            }
                        },
                        type: 'object'
                    },
                    'position': {
                        value: 'left',
                        allowedValues: ['left', 'right', 'top', 'bottom'],
                        type: 'string'
                    },
                    'textRotationAngle': {
                        value: null,
                        type: 'number?'
                    },
                    'textRotationPoint': {
                        value: 'auto',
                        allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                        type: 'string'
                    },
                    'tickMarks': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'size': {
                                value: 4,
                                type: 'number'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'title': {
                        value: {
                            'class': {
                                value: null,
                                type: 'string?'
                            },
                            'horizontalAlignment': {
                                value: 'center',
                                allowedValues: ['left', 'center', 'right'],
                                type: 'string'
                            },
                            'text': {
                                value: '',
                                type: 'string'
                            },
                            'verticalAlignment': {
                                value: 'center',
                                allowedValues: ['top', 'center', 'bottom'],
                                type: 'string'
                            },
                            'visible': {
                                value: true,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'unitInterval': {
                        value: null,
                        type: 'number?'
                    },
                    'valuesOnTicks': {
                        value: true,
                        type: 'boolean'
                    },
                    'visible': {
                        value: true,
                        type: 'boolean'
                    }
                },
                type: 'object'
            },
            'xAxis': {
                value: {
                    'alternatingBackgroundColor': {
                        value: '',
                        type: 'string'
                    },
                    'alternatingBackgroundColor2': {
                        value: '',
                        type: 'string'
                    },
                    'alternatingBackgroundOpacity': {
                        value: 1,
                        type: 'number'
                    },
                    'axisSize': {
                        value: null,
                        type: 'any'
                    },
                    'bands': {
                        value: null,
                        type: 'array?'
                    },
                    'baseUnit': {
                        value: null,
                        allowedValues: ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', null],
                        type: 'string?'
                    },
                    'customDraw': {
                        value: false,
                        type: 'boolean'
                    },
                    'dataField': {
                        value: '',
                        type: 'string'
                    },
                    'dateFormat': {
                        value: null,
                        type: 'string?'
                    },
                    'displayText': {
                        value: null,
                        type: 'string?'
                    },
                    'flip': {
                        value: false,
                        type: 'boolean'
                    },
                    'formatFunction': {
                        value: null,
                        type: 'function?'
                    },
                    'formatSettings': {
                        value: {
                            'dateFormat': {
                                value: null,
                                type: 'string?'
                            },
                            'decimalPlaces': {
                                value: null,
                                type: 'number?'
                            },
                            'decimalSeparator': {
                                value: null,
                                type: 'string?'
                            },
                            'negativeWithBrackets': {
                                value: false,
                                type: 'boolean'
                            },
                            'prefix': {
                                value: '',
                                type: 'string'
                            },
                            'sufix': {
                                value: '',
                                type: 'string'
                            },
                            'thousandsSeparator': {
                                value: null,
                                type: 'string?'
                            }
                        },
                        type: 'object'
                    },
                    'gridLines': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'labels': {
                        value: {
                            'angle': {
                                value: 0,
                                type: 'number'
                            },
                            'autoRotate': {
                                value: false,
                                type: 'boolean'
                            },
                            'class': {
                                value: null,
                                type: 'string?'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'formatFunction': {
                                value: null,
                                type: 'function?'
                            },
                            'formatSettings': {
                                value: {
                                    'dateFormat': {
                                        value: null,
                                        type: 'string?'
                                    },
                                    'decimalPlaces': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'decimalSeparator': {
                                        value: null,
                                        type: 'string?'
                                    },
                                    'negativeWithBrackets': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'prefix': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'sufix': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'thousandsSeparator': {
                                        value: null,
                                        type: 'string?'
                                    }
                                },
                                type: 'object'
                            },
                            'horizontalAlignment': {
                                value: 'center',
                                allowedValues: ['left', 'center', 'right'],
                                type: 'string'
                            },
                            'offset': {
                                value: {
                                    'x': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'y': {
                                        value: 0,
                                        type: 'number'
                                    }
                                },
                                type: 'object'
                            },
                            'rotationPoint': {
                                value: 'auto',
                                allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                                type: 'string'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'verticalAlignment': {
                                value: 'center',
                                allowedValues: ['top', 'center', 'bottom'],
                                type: 'string'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'line': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'logarithmicScale': {
                        value: false,
                        type: 'boolean'
                    },
                    'logarithmicScaleBase': {
                        value: 10,
                        type: 'number'
                    },
                    'maxValue': {
                        value: NaN,
                        type: 'any'
                    },
                    'minValue': {
                        value: NaN,
                        type: 'any'
                    },
                    'padding': {
                        value: {
                            'bottom': {
                                value: 0,
                                type: 'number'
                            },
                            'left': {
                                value: 0,
                                type: 'number'
                            },
                            'right': {
                                value: 0,
                                type: 'number'
                            },
                            'top': {
                                value: 0,
                                type: 'number'
                            }
                        },
                        type: 'object'
                    },
                    'position': {
                        value: 'bottom',
                        allowedValues: ['bottom', 'top', 'left', 'right'],
                        type: 'string'
                    },
                    'rangeSelector': {
                        value: {
                            'backgroundColor': {
                                value: null,
                                type: 'string?'
                            },
                            'backgroundImage': {
                                value: '',
                                type: 'string'
                            },
                            'baseUnit': {
                                value: null,
                                allowedValues: ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', null],
                                type: 'string?'
                            },
                            'borderLineColor': {
                                value: null,
                                type: 'string?'
                            },
                            'borderLineWidth': {
                                value: null,
                                type: 'number?'
                            },
                            'caption': {
                                value: '',
                                type: 'string'
                            },
                            'colorScheme': {
                                value: null,
                                type: 'string?'
                            },
                            'columnSeriesOverlap': {
                                value: false,
                                type: 'boolean'
                            },
                            'columnsGapPercent': {
                                value: 25,
                                type: 'number'
                            },
                            'dataField': {
                                value: null,
                                type: 'string?'
                            },
                            'description': {
                                value: '',
                                type: 'string'
                            },
                            'greyScale': {
                                value: null,
                                type: 'boolean?'
                            },
                            'gridLines': {
                                value: {
                                    'color': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'custom': {
                                        value: null,
                                        type: 'array?'
                                    },
                                    'dashStyle': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'lineWidth': {
                                        value: 1,
                                        type: 'number'
                                    },
                                    'step': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'unitInterval': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'visible': {
                                        value: true,
                                        type: 'any'
                                    }
                                },
                                type: 'object'
                            },
                            'labels': {
                                value: {
                                    'angle': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'autoRotate': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'class': {
                                        value: null,
                                        type: 'string?'
                                    },
                                    'custom': {
                                        value: null,
                                        type: 'array?'
                                    },
                                    'formatFunction': {
                                        value: null,
                                        type: 'function?'
                                    },
                                    'formatSettings': {
                                        value: {
                                            'dateFormat': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'decimalPlaces': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'decimalSeparator': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'negativeWithBrackets': {
                                                value: false,
                                                type: 'boolean'
                                            },
                                            'prefix': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'sufix': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'thousandsSeparator': {
                                                value: null,
                                                type: 'string?'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'horizontalAlignment': {
                                        value: 'center',
                                        allowedValues: ['left', 'center', 'right'],
                                        type: 'string'
                                    },
                                    'offset': {
                                        value: {
                                            'x': {
                                                value: 0,
                                                type: 'number'
                                            },
                                            'y': {
                                                value: 0,
                                                type: 'number'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'rotationPoint': {
                                        value: 'auto',
                                        allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                                        type: 'string'
                                    },
                                    'step': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'unitInterval': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'verticalAlignment': {
                                        value: 'center',
                                        allowedValues: ['top', 'center', 'bottom'],
                                        type: 'string'
                                    },
                                    'visible': {
                                        value: true,
                                        type: 'any'
                                    }
                                },
                                type: 'object'
                            },
                            'maxValue': {
                                value: NaN,
                                type: 'any'
                            },
                            'minValue': {
                                value: NaN,
                                type: 'any'
                            },
                            'padding': {
                                value: {
                                    'bottom': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'left': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'right': {
                                        value: 0,
                                        type: 'number'
                                    },
                                    'top': {
                                        value: 0,
                                        type: 'number'
                                    }
                                },
                                type: 'object'
                            },
                            'position': {
                                value: null,
                                allowedValues: ['bottom', 'top', 'left', 'right'],
                                type: 'string?'
                            },
                            'renderTo': {
                                value: null,
                                type: 'any'
                            },
                            'rightToLeft': {
                                value: null,
                                type: 'boolean?'
                            },
                            'seriesGapPercent': {
                                value: 10,
                                type: 'number'
                            },
                            'seriesGroups': {
                                value: null,
                                type: 'array?'
                            },
                            'serieType': {
                                value: 'area',
                                type: 'string'
                            },
                            'showBorderLine': {
                                value: null,
                                type: 'boolean?'
                            },
                            'size': {
                                value: null,
                                type: 'number?'
                            },
                            'skipOverlappingPoints': {
                                value: true,
                                type: 'boolean'
                            },
                            'titlePadding': {
                                value: {
                                    'bottom': {
                                        value: 10,
                                        type: 'number'
                                    },
                                    'left': {
                                        value: 5,
                                        type: 'number'
                                    },
                                    'right': {
                                        value: 5,
                                        type: 'number'
                                    },
                                    'top': {
                                        value: 5,
                                        type: 'number'
                                    }
                                },
                                type: 'object'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'valueAxis': {
                                value: {
                                    'alternatingBackgroundColor': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'alternatingBackgroundColor2': {
                                        value: '',
                                        type: 'string'
                                    },
                                    'alternatingBackgroundOpacity': {
                                        value: 1,
                                        type: 'number'
                                    },
                                    'axisSize': {
                                        value: null,
                                        type: 'any'
                                    },
                                    'bands': {
                                        value: null,
                                        type: 'array?'
                                    },
                                    'baselineValue': {
                                        value: 0,
                                        type: 'any'
                                    },
                                    'customDraw': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'flip': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'formatFunction': {
                                        value: null,
                                        type: 'function?'
                                    },
                                    'formatSettings': {
                                        value: {
                                            'dateFormat': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'decimalPlaces': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'decimalSeparator': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'negativeWithBrackets': {
                                                value: false,
                                                type: 'boolean'
                                            },
                                            'prefix': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'sufix': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'thousandsSeparator': {
                                                value: null,
                                                type: 'string?'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'gridLines': {
                                        value: {
                                            'color': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'custom': {
                                                value: null,
                                                type: 'array?'
                                            },
                                            'dashStyle': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'lineWidth': {
                                                value: 1,
                                                type: 'number'
                                            },
                                            'step': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'unitInterval': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'labels': {
                                        value: {
                                            'angle': {
                                                value: 0,
                                                type: 'number'
                                            },
                                            'autoRotate': {
                                                value: false,
                                                type: 'boolean'
                                            },
                                            'class': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'custom': {
                                                value: null,
                                                type: 'array?'
                                            },
                                            'formatFunction': {
                                                value: null,
                                                type: 'function?'
                                            },
                                            'formatSettings': {
                                                value: {
                                                    'dateFormat': {
                                                        value: null,
                                                        type: 'string?'
                                                    },
                                                    'decimalPlaces': {
                                                        value: null,
                                                        type: 'number?'
                                                    },
                                                    'decimalSeparator': {
                                                        value: null,
                                                        type: 'string?'
                                                    },
                                                    'negativeWithBrackets': {
                                                        value: false,
                                                        type: 'boolean'
                                                    },
                                                    'prefix': {
                                                        value: '',
                                                        type: 'string'
                                                    },
                                                    'sufix': {
                                                        value: '',
                                                        type: 'string'
                                                    },
                                                    'thousandsSeparator': {
                                                        value: null,
                                                        type: 'string?'
                                                    }
                                                },
                                                type: 'object'
                                            },
                                            'horizontalAlignment': {
                                                value: 'center',
                                                allowedValues: ['left', 'center', 'right'],
                                                type: 'string'
                                            },
                                            'offset': {
                                                value: {
                                                    'x': {
                                                        value: 0,
                                                        type: 'number'
                                                    },
                                                    'y': {
                                                        value: 0,
                                                        type: 'number'
                                                    }
                                                },
                                                type: 'object'
                                            },
                                            'rotationPoint': {
                                                value: 'auto',
                                                allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                                                type: 'string'
                                            },
                                            'step': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'unitInterval': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'verticalAlignment': {
                                                value: 'center',
                                                allowedValues: ['top', 'center', 'bottom'],
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'line': {
                                        value: {
                                            'color': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'dashStyle': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'lineWidth': {
                                                value: 1,
                                                type: 'number'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'logarithmicScale': {
                                        value: false,
                                        type: 'boolean'
                                    },
                                    'logarithmicScaleBase': {
                                        value: 10,
                                        type: 'number'
                                    },
                                    'maxValue': {
                                        value: NaN,
                                        type: 'any'
                                    },
                                    'minValue': {
                                        value: NaN,
                                        type: 'any'
                                    },
                                    'padding': {
                                        value: {
                                            'bottom': {
                                                value: 0,
                                                type: 'number'
                                            },
                                            'left': {
                                                value: 0,
                                                type: 'number'
                                            },
                                            'right': {
                                                value: 0,
                                                type: 'number'
                                            },
                                            'top': {
                                                value: 0,
                                                type: 'number'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'position': {
                                        value: 'left',
                                        allowedValues: ['left', 'right', 'top', 'bottom'],
                                        type: 'string'
                                    },
                                    'textRotationAngle': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'textRotationPoint': {
                                        value: 'auto',
                                        allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                                        type: 'string'
                                    },
                                    'tickMarks': {
                                        value: {
                                            'color': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'custom': {
                                                value: null,
                                                type: 'array?'
                                            },
                                            'dashStyle': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'lineWidth': {
                                                value: 1,
                                                type: 'number'
                                            },
                                            'size': {
                                                value: 4,
                                                type: 'number'
                                            },
                                            'step': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'unitInterval': {
                                                value: null,
                                                type: 'number?'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'any'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'title': {
                                        value: {
                                            'class': {
                                                value: null,
                                                type: 'string?'
                                            },
                                            'horizontalAlignment': {
                                                value: 'center',
                                                allowedValues: ['left', 'center', 'right'],
                                                type: 'string'
                                            },
                                            'text': {
                                                value: '',
                                                type: 'string'
                                            },
                                            'verticalAlignment': {
                                                value: 'center',
                                                allowedValues: ['top', 'center', 'bottom'],
                                                type: 'string'
                                            },
                                            'visible': {
                                                value: true,
                                                type: 'boolean'
                                            }
                                        },
                                        type: 'object'
                                    },
                                    'unitInterval': {
                                        value: null,
                                        type: 'number?'
                                    },
                                    'valuesOnTicks': {
                                        value: true,
                                        type: 'boolean'
                                    },
                                    'visible': {
                                        value: false,
                                        type: 'boolean'
                                    }
                                },
                                type: 'object'
                            },
                            'visible': {
                                value: false,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'textRotationAngle': {
                        value: null,
                        type: 'number?'
                    },
                    'textRotationPoint': {
                        value: 'auto',
                        allowedValues: ['auto', 'left', 'center', 'right', 'topleft', 'topcenter', 'topright', 'bottomleft', 'bottomcenter', 'bottomright', 'centermiddle'],
                        type: 'string'
                    },
                    'tickMarks': {
                        value: {
                            'color': {
                                value: '',
                                type: 'string'
                            },
                            'custom': {
                                value: null,
                                type: 'array?'
                            },
                            'dashStyle': {
                                value: '',
                                type: 'string'
                            },
                            'lineWidth': {
                                value: 1,
                                type: 'number'
                            },
                            'size': {
                                value: 4,
                                type: 'number'
                            },
                            'step': {
                                value: null,
                                type: 'number?'
                            },
                            'unitInterval': {
                                value: null,
                                type: 'number?'
                            },
                            'visible': {
                                value: true,
                                type: 'any'
                            }
                        },
                        type: 'object'
                    },
                    'title': {
                        value: {
                            'class': {
                                value: null,
                                type: 'string?'
                            },
                            'horizontalAlignment': {
                                value: 'center',
                                allowedValues: ['left', 'center', 'right'],
                                type: 'string'
                            },
                            'text': {
                                value: '',
                                type: 'string'
                            },
                            'verticalAlignment': {
                                value: 'center',
                                allowedValues: ['top', 'center', 'bottom'],
                                type: 'string'
                            },
                            'visible': {
                                value: true,
                                type: 'boolean'
                            }
                        },
                        type: 'object'
                    },
                    'toolTipFormatFunction': {
                        value: null,
                        type: 'function?'
                    },
                    'toolTipFormatSettings': {
                        value: {
                            'dateFormat': {
                                value: null,
                                type: 'string?'
                            },
                            'decimalPlaces': {
                                value: null,
                                type: 'number?'
                            },
                            'decimalSeparator': {
                                value: null,
                                type: 'string?'
                            },
                            'negativeWithBrackets': {
                                value: false,
                                type: 'boolean'
                            },
                            'prefix': {
                                value: '',
                                type: 'string'
                            },
                            'sufix': {
                                value: '',
                                type: 'string'
                            },
                            'thousandsSeparator': {
                                value: null,
                                type: 'string?'
                            }
                        },
                        type: 'object'
                    },
                    'type': {
                        value: 'auto',
                        allowedValues: ['auto', 'date', 'basic', 'linear'],
                        type: 'string'
                    },
                    'unitInterval': {
                        value: null,
                        type: 'number?'
                    },
                    'valuesOnTicks': {
                        value: true,
                        type: 'boolean'
                    },
                    'visible': {
                        value: true,
                        type: 'boolean'
                    }
                },
                type: 'object',
                reflectToAttribute: false
            }
        };
    }

    get _legendLayout() {
        const legendLayout = this.legendLayout;

        return legendLayout.height !== null || legendLayout.left !== null || legendLayout.top !== null || legendLayout.width !== null || legendLayout.flow === 'vertical';
    }

    _getFormatSettings(obj, propertyName) {
        if (!obj) {
            return null;
        }

        const formatSettings = obj[propertyName ? propertyName : 'formatSettings'];

        if (!formatSettings) {
            return null;
        }

        return (formatSettings.dateFormat || formatSettings.decimalPlaces !== null || formatSettings.decimalSeparator ||
            formatSettings.negativeWithBrackets || formatSettings.prefix || formatSettings.sufix || formatSettings.thousandsSeparator) ? formatSettings : null;
    }

    /**
     * Chart's event listeners.
     */
    static get listeners() {
        return {
            'click': '_clickHandler',
            'down': '_downMoveHandler',
            'mouseleave': '_mouseleaveHandler',
            'move': '_moveHandler',
            'resize': '_resizeHandler',
            'document.move': '_downMoveHandler',
            'document.up': '_documentUpHandler'
        };
    }

    /**
     * Chart's required files.
     */
    static get requires() {
        return {
            'LW.Utilities.Draw': 'lw.draw.js'
        };
    }

    static get styleUrls() {
        return [
            'lw.chart.css'
        ]
    }

    /**
     * Chart's HTML template.
     */
    template() {
        return '<div role="presentation"></div>';
    }

    /**
     * Called when the element is ready. Used for one-time configuration of the Array.
     */
    ready() {
        super.ready();

        this.checkLicense();
    }

    render() {
        const that = this;

        that._observeSeriesGroups();
        that._isTouchDevice = LW.Utilities.Core.isMobile;
        that._setDefaults();
        that._createColorsCache();
        that.refresh();

        that._setAriaProperties();

        super.render();
    }

    /**
     * Called when the element is attached to the DOM.
     */
    attached() {
        const that = this;

        super.attached();

        if (!that.isCompleted || that._isRangeSelectorInstance) {
            return;
        }

        Object.values(that._rangeSelectorInstances).forEach(rangeSelector => {
            rangeSelector.parentDiv.parentDiv.appendChild(rangeSelector.parentDiv);
        });
    }

    /**
     * Called when the element is detached from the DOM.
     */
    detached() {
        const that = this;

        super.detached();

        if (that._isRangeSelectorInstance) {
            return;
        }

        if (that._ttEl && that._ttEl.box) {
            that._ttEl.box.remove();
        }

        delete that._ttEl;

        Object.values(that._rangeSelectorInstances).forEach(rangeSelector => {
            rangeSelector.parentDiv.remove();
        });
    }

    /**
     * Sets WAI-ARIA properties and generates a comprehensive description of the Chart.
     */
    _setAriaProperties() {
        const that = this;

        if (that._isRangeSelectorInstance) {
            return;
        }

        const xAxis = that.xAxis,
            valueAxis = that.valueAxis,
            seriesGroups = that.seriesGroups;
        let descriptionContainer = that.$.content.children[1],
            description = '',
            flip = true;

        that.setAttribute('role', 'figure');

        if (!descriptionContainer) {
            descriptionContainer = document.createElement('div');
            descriptionContainer.id = that.id + 'DescriptionContainer';
            descriptionContainer.className = 'lw-hidden';
            that.$.content.appendChild(descriptionContainer);
        }

        that.setAttribute('aria-labelledby', that.id + 'TitleText');
        that.setAttribute('aria-describedby', that.id + 'TitleDescription ' + descriptionContainer.id);

        //this._getXAxisStats(groupIndex, axis, axisSize)
        // inverted
        // x and y axis description
        // x and y axis from-to
        // data for (data fields)

        description += 'This chart displays:';

        function processAxis(axis, name) {
            if (!axis || (!(axis.title && axis.title.text) && !axis.description && !axis.dataField)) {
                return;
            }

            description += '; "';

            if (axis.title && axis.title.text) {
                description += axis.title.text;
            }
            else {
                description += axis.description || axis.dataField;
            }

            description += '" on the ' + name;

            if (!isNaN(axis.minValue)) {
                description += ' from ' + axis.minValue;
            }

            if (!isNaN(axis.maxValue)) {
                description += ' up to ' + axis.maxValue;
            }
        }

        processAxis(xAxis, 'x-axis');
        processAxis(valueAxis, 'y-axis');

        for (let i = 0; i < seriesGroups.length; i++) {
            const seriesGroup = seriesGroups[i];

            processAxis(seriesGroup.valueAxis, 'y-axis');

            if (!seriesGroup.series) {
                continue;
            }

            flip = flip && seriesGroup.orientation === 'horizontal';

            for (let j = 0; j < seriesGroup.series.length; j++) {
                const series = seriesGroup.series[j];

                if (j === 0) {
                    if (i === 0) {
                        description += ' for ';
                    }
                    else {
                        description += '; ';
                    }
                }

                description += '"' + (series.displayText || series.dataField) + '"';

                if (j !== seriesGroup.series.length - 1) {
                    description += ', ';
                }
            }
        }

        description = description.replace(':;', ':');
        description = description.replace(/<.+?>/g, '');

        if (flip) {
            description = description.replace(/x-axis/g, '@@@');
            description = description.replace(/y-axis/g, 'x-axis');
            description = description.replace(/@@@/g, 'y-axis');
        }

        if (that.description) {
            description = '; ' + description;
        }

        descriptionContainer.innerHTML = description;
    }

    /**
     * Makes "seriesGroups" an observable array.
     */
    _observeSeriesGroups() {
        const that = this;

        function notifyCallback(changeArgs) {
            if (that.context !== that && changeArgs.newValue !== changeArgs.oldValue) {
                that.update();
            }
        }

        that._validateSeriesGroups();
        that.seriesGroups = new LW.ObservableArray(that.seriesGroups);
        that.seriesGroups.canNotify = true;

        for (let i = 0; i < that.seriesGroups.length; i++) {
            that.seriesGroups[i].series = new LW.ObservableArray(that.seriesGroups[i].series);
            that.seriesGroups[i].series.canNotify = true;
            that.seriesGroups[i].series.notify(notifyCallback);
        }

        that.seriesGroups.notify(notifyCallback);
    }

    /**
     * down/document move handler.
     */
    _downMoveHandler(event) {
        const that = this;
        let target = event.originalEvent.target;

        if (that.shadowRoot && target === that) {
            target = event.originalEvent.composedPath()[0];
        }

        const rangeSelectorContainer = target.closest('.lw-chart-range-selector');

        if (!rangeSelectorContainer) {
            return;
        }

        const rangeSelectorChart = rangeSelectorContainer.firstElementChild,
            parentChart = rangeSelectorChart.parentChart;

        if (that !== rangeSelectorChart && that !== parentChart) {
            return;
        }

        parentChart['_onSliderMouse' + event.type.slice(0, 1).toUpperCase() + event.type.slice(1)](event);
    }

    /**
     * document up handler.
     */
    _documentUpHandler(event) {
        const that = this

        if (that._draggingRangeSelector) {
            that._onSliderMouseUp(event);
        }
    }

    /**
     * Sets the deefault values of private properties.
     */
    _setDefaults() {
        const that = this;

        that.axisPadding = 5;
        that.enableEvents = true;
        that.enableSampling = true;
        that._itemsToggleState = [];
        that._isToggleRefresh = false;
        that._isSelectorRefresh = false;
        that._sliders = [];
        that._selectorRange = [];
        that._rangeSelectorInstances = {};
        that._resizeState = {};
        that._isRangeSelectorInstance = that._isRangeSelectorInstance || false;
        that._renderData = {};
        that._lwPlot = null;
        that._animTickInt = 50;

        that._seriesTypes = [
            'line', 'stackedline', 'stackedline100',
            'spline', 'stackedspline', 'stackedspline100',
            'stepline', 'stackedstepline', 'stackedstepline100',
            'area', 'stackedarea', 'stackedarea100',
            'splinearea', 'stackedsplinearea', 'stackedsplinearea100',
            'steparea', 'stackedsteparea', 'stackedsteparea100',
            'rangearea', 'splinerangearea', 'steprangearea',
            'column', 'stackedcolumn', 'stackedcolumn100', 'rangecolumn',
            'scatter', 'stackedscatter', 'stackedscatter100',
            'bubble', 'stackedbubble', 'stackedbubble100',
            'pie',
            'donut',
            'candlestick',
            'ohlc',
            'waterfall', 'stackedwaterfall'
        ];

        that.colorSchemes = [
            { name: 'scheme01', colors: ['#307DD7', '#AA4643', '#89A54E', '#71588F', '#4198AF'] },
            { name: 'scheme02', colors: ['#7FD13B', '#EA157A', '#FEB80A', '#00ADDC', '#738AC8'] },
            { name: 'scheme03', colors: ['#E8601A', '#FF9639', '#F5BD6A', '#599994', '#115D6E'] },
            { name: 'scheme04', colors: ['#D02841', '#FF7C41', '#FFC051', '#5B5F4D', '#364651'] },
            { name: 'scheme05', colors: ['#25A0DA', '#309B46', '#8EBC00', '#FF7515', '#FFAE00'] },
            { name: 'scheme06', colors: ['#0A3A4A', '#196674', '#33A6B2', '#9AC836', '#D0E64B'] },
            { name: 'scheme07', colors: ['#CC6B32', '#FFAB48', '#FFE7AD', '#A7C9AE', '#888A63'] },
            { name: 'scheme08', colors: ['#3F3943', '#01A2A6', '#29D9C2', '#BDF271', '#FFFFA6'] },
            { name: 'scheme09', colors: ['#1B2B32', '#37646F', '#A3ABAF', '#E1E7E8', '#B22E2F'] },
            { name: 'scheme10', colors: ['#5A4B53', '#9C3C58', '#DE2B5B', '#D86A41', '#D2A825'] },
            { name: 'scheme11', colors: ['#993144', '#FFA257', '#CCA56A', '#ADA072', '#949681'] },
            { name: 'scheme12', colors: ['#105B63', '#EEEAC5', '#FFD34E', '#DB9E36', '#BD4932'] },
            { name: 'scheme13', colors: ['#BBEBBC', '#F0EE94', '#F5C465', '#FA7642', '#FF1E54'] },
            { name: 'scheme14', colors: ['#60573E', '#F2EEAC', '#BFA575', '#A63841', '#BFB8A3'] },
            { name: 'scheme15', colors: ['#444546', '#FFBB6E', '#F28D00', '#D94F00', '#7F203B'] },
            { name: 'scheme16', colors: ['#583C39', '#674E49', '#948658', '#F0E99A', '#564E49'] },
            { name: 'scheme17', colors: ['#142D58', '#447F6E', '#E1B65B', '#C8782A', '#9E3E17'] },
            { name: 'scheme18', colors: ['#4D2B1F', '#635D61', '#7992A2', '#97BFD5', '#BFDCF5'] },
            { name: 'scheme19', colors: ['#844341', '#D5CC92', '#BBA146', '#897B26', '#55591C'] },
            { name: 'scheme20', colors: ['#56626B', '#6C9380', '#C0CA55', '#F07C6C', '#AD5472'] },
            { name: 'scheme21', colors: ['#96003A', '#FF7347', '#FFBC7B', '#FF4154', '#642223'] },
            { name: 'scheme22', colors: ['#5D7359', '#E0D697', '#D6AA5C', '#8C5430', '#661C0E'] },
            { name: 'scheme23', colors: ['#16193B', '#35478C', '#4E7AC7', '#7FB2F0', '#ADD5F7'] },
            { name: 'scheme24', colors: ['#7B1A25', '#BF5322', '#9DA860', '#CEA457', '#B67818'] },
            { name: 'scheme25', colors: ['#0081DA', '#3AAFFF', '#99C900', '#FFEB3D', '#309B46'] },
            { name: 'scheme26', colors: ['#0069A5', '#0098EE', '#7BD2F6', '#FFB800', '#FF6800'] },
            { name: 'scheme27', colors: ['#FF6800', '#A0A700', '#FF8D00', '#678900', '#0069A5'] },
            { name: 'scheme28', colors: ['#3A43BA', '#281E5D', '#48AAAD', '#0492C2', '#1E456E', '#59788D', '#52B2C0', '#82EDFD'] },
            { name: 'scheme29', colors: ['#003F5C', '#BC5090', '#58508D', '#FF6361', '#FFA600'] },
            { name: 'scheme30', colors: ['#16736F', '#A2D56A', '#1C515C', '#62B773', '#EEEF63', '#1F313F', '#309577'] },
            { name: 'scheme31', colors: ['#74CC66', '#191A4D', '#2D867A', '#EEE3CD', '#224D19', '#0D261B', '#5771C7', '#B6D7E7', '#206052', '#6B5724', '#C3AF4B', '#603620', '#536722', '#B6E7B9', '#34819D', '#94ACDB'] },
            { name: 'scheme32', colors: ['#87C5FF', '#5B5B60', '#9BE076', '#F7A384', '#7479D3', '#F13A80', '#E4D388', '#2BC6B2', '#F45B14'] }
        ];
    }

    /**
     * click handler.
     */
    _clickHandler(event) {
        const self = this;

        if (self.disabled || self._isRangeSelectorInstance)
            return;

        let x = event.pageX || event.clientX || event.screenX;
        let y = event.pageY || event.clientY || event.screenY;
        const pos = self.getBoundingClientRect();

        if (self._isTouchDevice) {
            //var cursorPos = $.lw.position(event);
            x = event.pageX;// cursorPos.left;
            y = event.pageY;//cursorPos.top;
        }

        x -= pos.left;
        y -= pos.top;

        self._mouseX = x;
        self._mouseY = y;


        if (!isNaN(self._lastClickTs)) {
            if ((new Date()).valueOf() - self._lastClickTs < 100)
                return;
        }

        this._hostClickTimer = setTimeout(function () {
            if (!self._isTouchDevice) {
                self._cancelTooltipTimer();
                self._hideToolTip();
                self._unselect();
            }

            if (self._pointMarker && self._pointMarker.element) {
                const group = self.seriesGroups[self._pointMarker.gidx];
                const serie = group.series[self._pointMarker.sidx];

                event.stopImmediatePropagation();
                self._raiseItemEvent('click', group, serie, self._pointMarker.iidx);
            }
        },
            100);

        if (self.renderEngine === 'HTML5') {
            self._canvasClickHandler(x, y);
        }
    }

    /**
     * Canvas click handler.
     */
    _canvasClickHandler(x, y) {
        const that = this,
            elements = that.renderer._elements;
        let clickedElement;

        for (let index in elements) {
            if (elements.hasOwnProperty(index) && index !== '0') {
                const element = elements[index];

                if (y > element.y && y < element.y + element.height
                    && x > element.x && x < element.x + element.width) {
                    clickedElement = element;
                    break;
                }
            }
        }

        if (!clickedElement) {
            return;
        }

        if (clickedElement.purpose && clickedElement.purpose === 'legend-toggle') {
            const data = clickedElement.data;

            that._toggleSerie(data.groupIndex, data.seriesIndex, data.itemIndex);
        }
    }

    /**
     * mouseleave handler.
     */
    _mouseleaveHandler() {
        const self = this;

        if (self.disabled || self._isRangeSelectorInstance)
            return;

        const x = self._mouseX;
        const y = self._mouseY;

        const rect = self._plotRect;

        if (rect && x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height)
            return;

        self._cancelTooltipTimer();
        self._hideToolTip(0);
        self._unselect();
    }

    /**
     * move handler.
     */
    _moveHandler(event) {
        const self = this;

        if (self.disabled)
            return;

        if (self._isRangeSelectorInstance) {
            const parentChart = self.parentChart;

            if (parentChart.xAxis.rangeSelector.renderTo === null) {
                parentChart._unselect();
                parentChart._hideToolTip();
            }

            if (event.originalEvent.type === 'touchmove') {
                event.originalEvent.preventDefault();
            }
        }
        else {
            self.style.cursor = 'default';
        }

        let x = event.pageX || event.clientX || event.screenX;
        let y = event.pageY || event.clientY || event.screenY;
        const pos = self.getBoundingClientRect();

        if (self._isTouchDevice) {
            x = event.pageX;
            y = event.pageY;
        }

        x -= pos.left;
        y -= pos.top;

        self.onmousemove(x, y);
    }

    /**
     * resize handler.
     */
    _resizeHandler() {
        const self = this,
            animation = self.animation;

        if (self._isRangeSelectorInstance) {
            return;
        }

        self.animation = 'none';
        self.refresh();
        self.animation = animation;
    }

    /** @private */
    //_refreshOnDownloadComlete() {
    //    var self = this;
    //    var source = this.dataSource;
    //    if (source instanceof LW.DataAdapter) {
    //        var adapteroptions = source._options;
    //        if (adapteroptions === undefined || adapteroptions === null || (adapteroptions !== undefined && !adapteroptions.autoBind)) {
    //            source.autoSync = false;
    //            source.dataBind();
    //        }

    //        var elementId = self.id;
    //        if (source.length === 0) {
    //            var updateFunc = function () {
    //                // sends a callback function to the user. This allows him to add additional initialization logic before the chart is rendered.
    //                if (self.onReady)
    //                    self.onReady();

    //                self.refresh();
    //            };

    //            source.unbindDownloadComplete(elementId);
    //            source.bindDownloadComplete(elementId, updateFunc);
    //        }
    //        else {
    //            // sends a callback function to the user. This allows him to add additional initialization logic before the chart is rendered.
    //            if (self.onReady)
    //                self.onReady();
    //        }

    //        //source.unbindBindingUpdate(elementId);
    //        //source.bindBindingUpdate(elementId, function () {
    //        //    if (self._supressBindingRefresh)
    //        //        return;

    //        //    self.refresh();
    //        //});
    //    }
    //}

    propertyChangedHandler(key, oldValue, value) {
        const that = this;
        //if (key === 'source')
        //    this._refreshOnDownloadComlete();

        switch (key) {
            case 'animation':
            case 'theme':
                if (that._ttEl) {
                    that._ttEl.box.setAttribute(key, value);
                }

                break;
            case 'rightToLeft':
                if (!that._ttEl || !that._ttEl.box) {
                    break;
                }

                value ? that._ttEl.box.setAttribute('right-to-left', value) : that._ttEl.box.removeAttribute('right-to-left');
                break;
            case 'seriesGroups':
                that._observeSeriesGroups();
                break;
            case 'xAxis_rangeSelector_renderTo':
                if (value === null) {
                    const oldRangeSelector = oldValue.getElementsByClassName('lw-chart-range-selector')[0];

                    oldRangeSelector.parentElement.removeChild(oldRangeSelector);
                }

                break;
        }

        this.refresh();
    }

    /** @private */
    _initRenderer() {
        const that = this;

        that._draw = new LW.Utilities.Draw(that.$.content, that.renderEngine);
        that.renderer = that._draw.renderer;

        if (!that._lwPlot)
            that._lwPlot = new LW.Utilities.Plot(that.renderer);

        that.$.content.firstElementChild.setAttribute('role', 'presentation');
    }

    /** @private */
    _internalRefresh() {
        const self = this;

        // validate visiblity
        if (!(self.offsetWidth || self.offsetHeight || self.getClientRects().length)) {
            return;
        }

        self._stopAnimations();

        if (!self.renderer || (!self._isToggleRefresh && !self._isUpdate)) {
            self._hideToolTip(0);
            self.$.content.innerHTML = '';
            self._initRenderer();
        }

        const renderer = self.renderer;
        if (!renderer)
            return;

        const rect = renderer.getRect();

        self._render({ x: 1, y: 1, width: rect.width, height: rect.height });

        this.$.fireEvent('refreshBegin', { instance: this });

        if (renderer instanceof LW.Utilities.HTML5Renderer)
            renderer.refresh();

        self._isUpdate = false;

        this.$.fireEvent('refreshEnd', { instance: this });
    }

    saveAsPNG(filename) {
        return this._saveAsImage('png', filename);
    }

    saveAsJPEG(filename) {
        return this._saveAsImage('jpeg', filename);
    }

    saveAsPDF(filename, pageOrientation) {
        return this._saveAsImage('pdf', filename, pageOrientation);
    }

    print() {
        return this._saveAsImage('print');
    }

    /** @private */
    _saveAsImage(type, fileName, pageOrientation) {
        const that = this;

        return that._draw._widgetToImage(that, type, fileName, that._hasRangeSelector ? that._selectorSaveAsImageCallback : undefined, pageOrientation);
    }

    _selectorSaveAsImageCallback(instance, canvas) {
        let self = instance;

        for (let i = 0; i < self.seriesGroups.length; i++) {
            let xAxis = self._getXAxis(i);
            if (!xAxis || !xAxis.rangeSelector || !xAxis.rangeSelector.visible || xAxis.rangeSelector.renderTo)
                continue;

            let selectorInstance = self._rangeSelectorInstances[i];
            if (!selectorInstance)
                continue;

            let rect = selectorInstance.renderer.getRect();
            let selectorCanvas = selectorInstance.renderer.getContainer().getElementsByTagName('canvas')[0];

            let selectorContext = selectorCanvas.getContext('2d');

            let slider = self._sliders[i];
            let swapXY = self.seriesGroups[i].orientation === 'horizontal';
            let widthProp = !swapXY ? 'width' : 'height';
            let rwidthProp = swapXY ? 'width' : 'height';
            let posProp = !swapXY ? 'x' : 'y';
            let rposProp = swapXY ? 'x' : 'y';

            let selectedRect = {};
            selectedRect[posProp] = slider.startOffset + slider.rect[posProp];
            selectedRect[rposProp] = slider.rect[rposProp];
            selectedRect[widthProp] = slider.endOffset - slider.startOffset;
            selectedRect[rwidthProp] = slider.rect[rwidthProp];


            let colorSelectedRange = xAxis.rangeSelector.colorSelectedRange || 'blue';
            let colorRangeLineColor = xAxis.rangeSelector.colorRangeLine || 'grey';


            let elements = [];
            elements.push(selectorInstance.renderer.rect(selectedRect.x, selectedRect.y, selectedRect.width, selectedRect.height, { fill: colorSelectedRange, opacity: 0.1 }));

            const renderer = self.renderer;

            if (!swapXY) {
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(slider.rect.x), renderer._ptrnd(slider.rect.y), renderer._ptrnd(selectedRect.x), renderer._ptrnd(slider.rect.y), { stroke: colorRangeLineColor, opacity: 0.5 }));
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(selectedRect.x + selectedRect.width), renderer._ptrnd(slider.rect.y), renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(slider.rect.y), { stroke: colorRangeLineColor, opacity: 0.5 }));

                elements.push(selectorInstance.renderer.line(renderer._ptrnd(selectedRect.x), renderer._ptrnd(slider.rect.y), renderer._ptrnd(selectedRect.x), renderer._ptrnd(slider.rect.y + slider.rect.height), { stroke: colorRangeLineColor, opacity: 0.5 }));
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(selectedRect.x + selectedRect.width), renderer._ptrnd(slider.rect.y), renderer._ptrnd(selectedRect.x + selectedRect.width), renderer._ptrnd(slider.rect.y + slider.rect.height), { stroke: colorRangeLineColor, opacity: 0.5 }));
            }
            else {
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(slider.rect.y), renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(selectedRect.y), { stroke: colorRangeLineColor, opacity: 0.5 }));
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(selectedRect.y + selectedRect.height), renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(slider.rect.y + slider.rect.height), { stroke: colorRangeLineColor, opacity: 0.5 }));

                elements.push(selectorInstance.renderer.line(renderer._ptrnd(slider.rect.x), renderer._ptrnd(selectedRect.y), renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(selectedRect.y), { stroke: colorRangeLineColor, opacity: 0.5 }));
                elements.push(selectorInstance.renderer.line(renderer._ptrnd(slider.rect.x), renderer._ptrnd(selectedRect.y + selectedRect.height), renderer._ptrnd(slider.rect.x + slider.rect.width), renderer._ptrnd(selectedRect.y + selectedRect.height), { stroke: colorRangeLineColor, opacity: 0.5 }));
            }

            selectorInstance.renderer.refresh();

            let imgdata = selectorContext.getImageData(rect.x, rect.y, rect.width, rect.height);

            const hostContext = canvas.getContext('2d'),
                chartRect = self.getBoundingClientRect(),
                selectorInstanceRect = selectorInstance.getBoundingClientRect();

            hostContext.putImageData(
                imgdata,
                selectorInstanceRect.left - chartRect.left,
                selectorInstanceRect.top - chartRect.top,
                1,
                1,
                rect.width,
                rect.height);

            for (let j = 0; j < elements.length; j++)
                selectorInstance.renderer.removeElement(elements[j]);

            selectorInstance.renderer.refresh();

        }

        return true;
    }

    refresh() {
        const that = this;

        that._internalRefresh();
        that._setAriaProperties();
    }

    update() {
        this._isUpdate = true;
        this._internalRefresh();
    }



    clear() {
        const self = this;

        //for (var setting in self._defaultSettings)
        //    self[setting] = self._defaultSettings[setting];

        self.caption = '';
        self.description = '';

        self.refresh();
    }

    _validateSeriesGroups() {
        const that = this;

        if (!(Array.isArray(this.seriesGroups) || that.seriesGroups instanceof LW.ObservableArray))
            that.error(that.localize('invalidSeriesGroups'));
        for (let i = 0; i < this.seriesGroups.length; i++) {
            const group = this.seriesGroups[i];
            if (!group.type)
                that.error(that.localize('missingType'));

            if (!(Array.isArray(group.series) || group.series instanceof LW.ObservableArray))
                that.error(that.localize('invalidSeries'));
        }
    }

    /** @private */
    _render(rect) {
        var self = this;
        var renderer = self.renderer;

        self._colorsCache.clear();

        if (!self._isToggleRefresh && self._isUpdate && self._renderData)
            self._renderDataClone();

        self._renderData = [];

        renderer.clear();
        self._unselect();
        self._hideToolTip(0);

        var bckgImg = self.backgroundImage;
        if (bckgImg === undefined || bckgImg === null || bckgImg === '')
            self.style.backgroundImage = '';
        //self.host.css({ 'background-image': '' });
        else
            self.style.backgroundImage = (bckgImg.indexOf('(') !== -1 ? bckgImg : 'url("' + bckgImg + '")');
        //self.host.css({ 'background-image': (bckgImg.indexOf('(') !== -1 ? bckgImg : 'url('' + bckgImg + '')') });

        self._rect = rect;

        var padding = self.padding || { left: 5, top: 5, right: 5, bottom: 5 };

        var clipAll = renderer.createClipRect(rect);
        var groupAll = renderer.beginGroup();
        renderer.setClip(groupAll, clipAll);

        var rFill = renderer.rect(rect.x, rect.y, rect.width - 2, rect.height - 2);

        if (bckgImg === undefined || bckgImg === null || bckgImg === '')
            renderer.attr(rFill, { fill: self.backgroundColor || self._getThemeColor('background') });
        else
            renderer.attr(rFill, { fill: 'transparent' });

        if (self.showBorderLine !== false) {
            var borderLineWidth = this.borderLineWidth;
            if (isNaN(borderLineWidth) || borderLineWidth < 0 || borderLineWidth > 10)
                borderLineWidth = 1;

            renderer.attr(rFill, { 'stroke-width': borderLineWidth, stroke: self.borderLineColor || self._getThemeColor('line') });
        }

        // Invoke user-defined drawing
        if (typeof self.drawBefore === 'function') {
            self.drawBefore(renderer, rect);
        }

        var paddedRect = { x: padding.left, y: padding.top, width: rect.width - padding.left - padding.right, height: rect.height - padding.top - padding.bottom };
        self._paddedRect = paddedRect;
        var titlePadding = self.titlePadding || { left: 2, top: 2, right: 2, bottom: 2 };

        var sz;
        if (self.caption && self.caption.length > 0) {
            sz = renderer.measureText(self.caption, 0, { 'class': 'lw-chart-title-text' });
            const element = renderer.text(self.caption, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - (titlePadding.left + titlePadding.right), sz.height, 0, { 'class': 'lw-chart-title-text' }, true, 'center', 'center');

            element.id = self.id + 'TitleText';

            paddedRect.y += sz.height;
            paddedRect.height -= sz.height;
        }
        if (self.description && self.description.length > 0) {
            sz = renderer.measureText(self.description, 0, { 'class': 'lw-chart-title-description' });
            const element = renderer.text(self.description, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - (titlePadding.left + titlePadding.right), sz.height, 0, { 'class': 'lw-chart-title-description' }, true, 'center', 'center');

            element.id = self.id + 'TitleDescription';

            paddedRect.y += sz.height;
            paddedRect.height -= sz.height;
        }

        if (self.caption || self.description) {
            paddedRect.y += (titlePadding.bottom + titlePadding.top);
            paddedRect.height -= (titlePadding.bottom + titlePadding.top);
        }

        var plotRect = { x: paddedRect.x, y: paddedRect.y, width: paddedRect.width, height: paddedRect.height };
        self._plotRect = plotRect;

        // build stats
        self._buildStats(plotRect);

        var isPieOnly = self._isPieOnlySeries();

        var seriesGroups = self.seriesGroups;

        // axis validation
        var swap;
        var hashAxis = { xAxis: {}, valueAxis: {} };
        for (let i = 0; i < seriesGroups.length && !isPieOnly; i++) {
            if (seriesGroups[i].type === 'pie' || seriesGroups[i].type === 'donut')
                continue;

            var xAxis = self._getXAxis(i);
            if (!xAxis)
                self.error(self.localize('missingAxis', { index: i, axis: 'xAxis' }));

            let xAxisId = xAxis === self._getXAxis() ? -1 : i;
            hashAxis.xAxis[xAxisId] = 0x00;
        }

        var axisPadding = self.axisPadding;
        if (isNaN(axisPadding))
            axisPadding = 5;

        // get vertical axis width
        var wYAxis = { left: 0, right: 0, leftCount: 0, rightCount: 0 };
        var wYAxisArr = [];

        for (let i = 0; i < seriesGroups.length; i++) {
            const g = seriesGroups[i];
            if (g.type === 'pie' || g.type === 'donut' || g.spider === true || g.polar === true) {
                wYAxisArr.push({ width: 0, position: 0, xRel: 0 });
                continue;
            }

            swap = g.orientation === 'horizontal';

            var xAxis = self._getXAxis(i);
            let xAxisId = xAxis === self._getXAxis() ? -1 : i;

            var valueAxis = self._getValueAxis(i);
            var valueAxisId = valueAxis === self._getValueAxis() ? -1 : i;

            var w = !swap ? valueAxis.axisSize : xAxis.axisSize;
            var axisR = { x: 0, y: plotRect.y, width: plotRect.width, height: plotRect.height };
            var position = swap ? self._getXAxis(i).position : valueAxis.position;

            if (!w || w === 'auto') {
                if (swap) {
                    w = this._renderXAxis(i, axisR, true, plotRect).width;
                    if ((hashAxis.xAxis[xAxisId] & 0x01) === 0x01)
                        w = 0;
                    else if (w > 0)
                        hashAxis.xAxis[xAxisId] |= 0x01;
                }
                else {
                    w = self._renderValueAxis(i, axisR, true, plotRect).width;
                    if ((hashAxis.valueAxis[valueAxisId] & 0x01) === 0x01)
                        w = 0;
                    else if (w > 0)
                        hashAxis.valueAxis[valueAxisId] |= 0x01;
                }
            }

            if (position !== 'left' && self.rightToLeft === true)
                position = 'right';
            if (position !== 'right')
                position = 'left';

            if (wYAxis[position + 'Count'] > 0 && wYAxis[position] > 0 && w > 0)
                wYAxis[position] += axisPadding;

            wYAxisArr.push({ width: w, position: position, xRel: wYAxis[position] });
            wYAxis[position] += w;
            wYAxis[position + 'Count']++;
        }

        var measureSize = Math.max(1, Math.max(rect.width, rect.height));

        // get horizontal axis height
        var hXAxis = { top: 0, bottom: 0, topCount: 0, bottomCount: 0 };
        var hXAxisArr = [];

        for (let i = 0; i < seriesGroups.length; i++) {
            const g = seriesGroups[i];
            if (g.type === 'pie' || g.type === 'donut' || g.spider === true || g.polar === true) {
                hXAxisArr.push({ height: 0, position: 0, yRel: 0 });
                continue;
            }

            swap = g.orientation === 'horizontal';

            var valueAxis = this._getValueAxis(i);
            var valueAxisId = valueAxis === self._getValueAxis() ? -1 : i;

            var xAxis = self._getXAxis(i);
            let xAxisId = xAxis === self._getXAxis() ? -1 : i;

            let h = !swap ? xAxis.axisSize : valueAxis.axisSize;
            var position = swap ? valueAxis.position : xAxis.position;

            if (!h || h === 'auto') {
                if (swap) {
                    h = self._renderValueAxis(i, { x: 0, y: 0, width: measureSize, height: 0 }, true, plotRect).height;
                    if ((hashAxis.valueAxis[valueAxisId] & 0x02) === 0x02)
                        h = 0;
                    else if (h > 0)
                        hashAxis.valueAxis[valueAxisId] |= 0x02;
                }
                else {
                    h = self._renderXAxis(i, { x: 0, y: 0, width: measureSize, height: 0 }, true).height;
                    if ((hashAxis.xAxis[xAxisId] & 0x02) === 0x02)
                        h = 0;
                    else if (h > 0)
                        hashAxis.xAxis[xAxisId] |= 0x02;
                }
            }

            if (position !== 'top')
                position = 'bottom';

            if (hXAxis[position + 'Count'] > 0 && hXAxis[position] > 0 && h > 0)
                hXAxis[position] += axisPadding;

            hXAxisArr.push({ height: h, position: position, yRel: hXAxis[position] });

            hXAxis[position] += h;
            hXAxis[position + 'Count']++;
        }

        self._createAnimationGroup('series');

        const showLegend = (self.showLegend !== false),
            customlegendLayout = self._legendLayout;

        var szLegend = !showLegend ? { width: 0, height: 0 } : self._renderLegend(customlegendLayout ? self._rect : paddedRect, true);
        if (customlegendLayout && (!isNaN(this.legendLayout.left) || !isNaN(this.legendLayout.top)))
            szLegend = { width: 0, height: 0 };

        if (paddedRect.height < hXAxis.top + hXAxis.bottom + szLegend.height || paddedRect.width < wYAxis.left + wYAxis.right) {
            renderer.endGroup();
            return;
        }

        plotRect.height -= hXAxis.top + hXAxis.bottom + szLegend.height;

        plotRect.x += wYAxis.left;
        plotRect.width -= wYAxis.left + wYAxis.right;
        plotRect.y += hXAxis.top;

        var xAxisRect = [];

        if (!isPieOnly) {
            for (let i = 0; i < seriesGroups.length; i++) {
                const g = seriesGroups[i];
                if (g.polar === true || g.spider === true || g.type === 'pie' || g.type === 'donut')
                    continue;

                swap = g.orientation === 'horizontal';
                var xAxisId = self._getXAxis(i) === self._getXAxis() ? -1 : i;
                var valueAxisId = self._getValueAxis(i) === self._getValueAxis() ? -1 : i;

                let axisR = { x: plotRect.x, y: 0, width: plotRect.width, height: hXAxisArr[i].height };
                if (hXAxisArr[i].position !== 'top')
                    axisR.y = plotRect.y + plotRect.height + hXAxisArr[i].yRel;
                else
                    axisR.y = plotRect.y - hXAxisArr[i].yRel - hXAxisArr[i].height;

                if (swap) {
                    if ((hashAxis.valueAxis[valueAxisId] & 0x04) === 0x04)
                        continue;

                    if (!self._isGroupVisible(i))
                        continue;

                    self._renderValueAxis(i, axisR, false, plotRect);

                    hashAxis.valueAxis[valueAxisId] |= 0x04;
                }
                else {
                    xAxisRect.push(axisR);

                    if ((hashAxis.xAxis[xAxisId] & 0x04) === 0x04)
                        continue;

                    if (!self._isGroupVisible(i))
                        continue;

                    self._renderXAxis(i, axisR, false, plotRect);
                    hashAxis.xAxis[xAxisId] |= 0x04;
                }
            }
        }

        if (showLegend) {
            const customlegendLayout = self._legendLayout,
                containerRect = customlegendLayout ? self._rect : paddedRect;

            var x = paddedRect.x + this.renderer._ptrnd((paddedRect.width - szLegend.width) / 2);
            var y = plotRect.y + plotRect.height + hXAxis.bottom;
            var w = paddedRect.width;
            let h = szLegend.height;
            if (customlegendLayout) {
                if (!isNaN(self.legendLayout.left))
                    x = self.legendLayout.left;

                if (!isNaN(self.legendLayout.top))
                    y = self.legendLayout.top;

                if (!isNaN(self.legendLayout.width))
                    w = self.legendLayout.width;

                if (!isNaN(self.legendLayout.height))
                    h = self.legendLayout.height;
            }

            if (x + w > containerRect.x + containerRect.width)
                w = containerRect.x + containerRect.width - x;
            if (y + h > containerRect.y + containerRect.height)
                h = containerRect.y + containerRect.height - y;

            self._renderLegend({ x: x, y: y, width: w, height: h });
        }

        self._hasHorizontalLines = false;
        if (!isPieOnly) {
            for (let i = 0; i < seriesGroups.length; i++) {
                const g = seriesGroups[i];

                if (g.polar === true || g.spider === true || g.type === 'pie' || g.type === 'donut')
                    continue;

                swap = seriesGroups[i].orientation === 'horizontal';
                let axisR = { x: plotRect.x - wYAxisArr[i].xRel - wYAxisArr[i].width, y: plotRect.y, width: wYAxisArr[i].width, height: plotRect.height };
                if (wYAxisArr[i].position !== 'left')
                    axisR.x = plotRect.x + plotRect.width + wYAxisArr[i].xRel;

                var xAxisId = self._getXAxis(i) === self._getXAxis() ? -1 : i;
                var valueAxisId = self._getValueAxis(i) === self._getValueAxis() ? -1 : i;

                if (swap) {
                    xAxisRect.push(axisR);

                    if ((hashAxis.xAxis[xAxisId] & 0x08) === 0x08)
                        continue;

                    if (!self._isGroupVisible(i))
                        continue;

                    self._renderXAxis(i, axisR, false, plotRect);
                    hashAxis.xAxis[xAxisId] |= 0x08;
                }
                else {
                    if ((hashAxis.valueAxis[valueAxisId] & 0x08) === 0x08)
                        continue;

                    if (!self._isGroupVisible(i))
                        continue;

                    self._renderValueAxis(i, axisR, false, plotRect);
                    hashAxis.valueAxis[valueAxisId] |= 0x08;
                }
            }
        }

        if (plotRect.width <= 0 || plotRect.height <= 0)
            return;

        self._plotRect = { x: plotRect.x, y: plotRect.y, width: plotRect.width, height: plotRect.height };

        for (let i = 0; i < seriesGroups.length; i++) {
            this._drawPlotAreaLines(i, true, { gridLines: false, tickMarks: false, alternatingBackground: true });
            this._drawPlotAreaLines(i, false, { gridLines: false, tickMarks: false, alternatingBackground: true });
        }

        for (let i = 0; i < seriesGroups.length; i++) {
            this._drawPlotAreaLines(i, true, { gridLines: true, tickMarks: true, alternatingBackground: false });
            this._drawPlotAreaLines(i, false, { gridLines: true, tickMarks: true, alternatingBackground: false });
        }

        var hasCustomDraw = false;
        for (let i = 0; i < seriesGroups.length && !hasCustomDraw; i++) {
            const g = seriesGroups[i];
            if (g.annotations !== undefined ||
                typeof g.draw === 'function' ||
                typeof g.drawBefore === 'function'
            ) {
                hasCustomDraw = true;
                break;
            }
        }

        var gPlot = renderer.beginGroup();

        if (self.clip && !hasCustomDraw) {
            var clip = renderer.createClipRect({ x: plotRect.x - 2, y: plotRect.y, width: plotRect.width + 4, height: plotRect.height });
            renderer.setClip(gPlot, clip);
        }

        for (let i = 0; i < seriesGroups.length; i++) {
            const g = seriesGroups[i];
            var isValid = false;
            for (var validtype in self._seriesTypes) {
                if (self._seriesTypes[validtype] === g.type) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid)
                self.error(self.localize('invalidType', { type: g.type }));

            // custom drawing before the group
            if (typeof g.drawBefore === 'function')
                g.drawBefore(renderer, rect, i, this);

            // polar series drawing
            if (g.polar === true || g.spider === true) {
                if (g.type.indexOf('pie') === -1 && g.type.indexOf('donut') === -1)
                    self._renderSpiderAxis(i, plotRect);
            }

            self._renderAxisBands(i, plotRect, true);
            self._renderAxisBands(i, plotRect, false);
        }

        for (let i = 0; i < seriesGroups.length; i++) {
            const g = seriesGroups[i];

            if (self._isColumnType(g.type))
                self._renderColumnSeries(i, plotRect);
            else if (g.type.indexOf('pie') !== -1 || g.type.indexOf('donut') !== -1)
                self._renderPieSeries(i, plotRect);
            else if (g.type.indexOf('line') !== -1 || g.type.indexOf('area') !== -1)
                self._renderLineSeries(i, plotRect);
            else if (g.type.indexOf('scatter') !== -1 || g.type.indexOf('bubble') !== -1)
                self._renderScatterSeries(i, plotRect);
            else if (g.type.indexOf('candlestick') !== -1 || g.type.indexOf('ohlc') !== -1)
                self._renderCandleStickSeries(i, plotRect, g.type.indexOf('ohlc') !== -1);

            if (g.annotations) {
                if (!this._moduleAnnotations)
                    self.error(self.localize('missingReference', { files: 'lw.chart.annotations.js' }));

                for (let j = 0; j < g.annotations.length; j++)
                    self._renderAnnotation(i, g.annotations[j], plotRect);
            }

            // custom drawing after the group
            if (typeof g.draw === 'function')
                g.draw(renderer, rect, i, this);
        }

        renderer.endGroup();

        if (self.disabled) {
            var el = renderer.rect(rect.x, rect.y, rect.width, rect.height);
            renderer.attr(el, { fill: '#777777', opacity: 0.5, stroke: '#00FFFFFF' });
        }

        // Invoke user-defined drawing
        if (typeof self.draw === 'function') {
            self.draw(renderer, rect);
        }

        renderer.endGroup();

        self._startAnimation('series');

        if (self._credits) {
            self._credits();
        }

        // render range selector
        var hasRangeSelector = false;
        for (let i = 0; i < self.seriesGroups.length && !hasRangeSelector; i++) {
            var xAxis = self._getXAxis(i);
            if (xAxis && xAxis.rangeSelector && xAxis.rangeSelector.visible) {
                hasRangeSelector = true;
                self._hasRangeSelector = true;
            }
        }

        if (hasRangeSelector) {
            if (!this._moduleRangeSelector)
                self.error(self.localize('missingReference', { files: 'lw.chart.rangeselector.js' }));

            var isRendered = [];

            if (!self._isSelectorRefresh)
                self._rangeSelectorInstances = {};

            for (let i = 0; i < self.seriesGroups.length; i++) {
                var axis = this._getXAxis(i);

                if (isRendered.indexOf(axis) === -1) {
                    if (this._renderXAxisRangeSelector(i, xAxisRect[i]))
                        isRendered.push(axis);
                }
            }
        }
    }

    _credits() {
        //DEPRECATED
    }

    /** @private */
    _isPieOnlySeries() {
        let seriesGroups = this.seriesGroups;
        if (seriesGroups.length === 0)
            return false;

        for (let i = 0; i < seriesGroups.length; i++) {
            if (seriesGroups[i].type !== 'pie' && seriesGroups[i].type !== 'donut')
                return false;
        }

        return true;
    }

    /** @private */
    _renderChartLegend(data, rect, isMeasure, isVerticalFlow) {
        var self = this;
        var renderer = self.renderer;

        var r = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        var padding = 3;
        if (r.width >= 2 * padding) {
            r.x += padding;
            r.width -= 2 * padding;
        }
        if (r.height >= 2 * padding) {
            r.y += padding;
            r.height -= 2 * padding;
        }

        var szMeasure = { width: r.width, height: 0 };

        var x = 0, y = 0;
        var rowH = 20;
        var rowW = 0;
        var barSize = 10;
        var space = 10;
        var maxWidth = 0;
        for (let i = 0; i < data.length; i++) {
            var css = data[i].css;
            if (!css)
                css = 'lw-chart-legend-text';

            rowH = 20;
            var text = data[i].text;
            var sz = renderer.measureText(text, 0, { 'class': css });

            if (sz.height > rowH) {
                rowH = sz.height;
            }

            if (sz.width > maxWidth)
                maxWidth = sz.width;

            if (isVerticalFlow) {
                if (i !== 0)
                    y += rowH;

                if (y > r.height) {
                    y = 0;
                    x += maxWidth + 2 * space + barSize;
                    maxWidth = sz.width;
                    szMeasure.width = x + maxWidth;
                }
            }
            else {
                if (x !== 0)
                    x += space;

                if (x + 2 * barSize + sz.width > r.width && sz.width < r.width) {
                    x = 0;
                    y += rowH;
                    rowH = 20;
                    rowW = r.width;
                    szMeasure.height = y + rowH;
                }
            }

            var wrap = false;
            if (sz.width > r.width) {
                wrap = true;
                var wrapWidth = r.width;
                var legendInfo = text;
                var words = legendInfo.split(/\s+/);
                let textInfo = [];
                let currentLine = '';
                for (let iWord = 0; iWord < words.length; iWord++) {
                    var txt = currentLine + ((currentLine.length > 0) ? ' ' : '') + words[iWord];
                    var textSize = self.renderer.measureText(txt, 0, { 'class': css });

                    if (textSize.width > wrapWidth && txt.length > 0 && currentLine.length > 0) {
                        textInfo.push({ text: currentLine });
                        currentLine = words[iWord];
                    }
                    else
                        currentLine = txt;

                    if (iWord + 1 === words.length)
                        textInfo.push({ text: currentLine });
                }

                sz.width = 0;
                var height = 0;
                for (let t = 0; t < textInfo.length; t++) {
                    var textItem = textInfo[t].text;
                    var textSize = self.renderer.measureText(textItem, 0, { 'class': css });
                    sz.width = Math.max(sz.width, textSize.width);
                    height += sz.height;
                }
                sz.height = height;
            }

            var renderInBounds = (x + sz.width < r.width) && (y + sz.height < rect.height);

            if (self._legendLayout) {
                var renderInBounds = r.x + x + sz.width < self._rect.x + self._rect.width &&
                    r.y + y + sz.height < self._rect.y + self._rect.height;
            }

            if (!isMeasure && renderInBounds
            ) {
                var sidx = data[i].seriesIndex;
                var gidx = data[i].groupIndex;
                var iidx = data[i].itemIndex;
                var fillColor = data[i].fillColor;
                var lineColor = data[i].lineColor;

                var isVisible = self._isSerieVisible(gidx, sidx, iidx);
                var g = renderer.beginGroup();
                var opacity = isVisible ? data[i].opacity : 0.1;
                if (wrap) {
                    var legendInfo = text;
                    var wrapWidth = r.width;
                    var words = legendInfo.split(/\s+/);
                    var dy = 0;
                    let textInfo = [];

                    let currentLine = '';
                    for (let iWord = 0; iWord < words.length; iWord++) {
                        var txt = currentLine + ((currentLine.length > 0) ? ' ' : '') + words[iWord];
                        var textSize = self.renderer.measureText(txt, 0, { 'class': css });

                        if (textSize.width > wrapWidth && txt.length > 0 && currentLine.length > 0) {
                            textInfo.push({ text: currentLine, dy: dy });
                            dy += textSize.height;

                            currentLine = words[iWord]
                        }
                        else
                            currentLine = txt;

                        if (iWord + 1 === words.length)
                            textInfo.push({ text: currentLine, dy: dy });
                    }


                    for (let t = 0; t < textInfo.length; t++) {
                        var textItem = textInfo[t].text;
                        dy = textInfo[t].dy;
                        var textSize = self.renderer.measureText(textItem, 0, { 'class': css });
                        if (isVerticalFlow) {
                            self.renderer.text(textItem, r.x + x + 1.5 * barSize, r.y + y + dy, sz.width, rowH, 0, { 'class': css }, false, 'left', 'center');
                        }
                        else {
                            self.renderer.text(textItem, r.x + x + 1.5 * barSize, r.y + y + dy, sz.width, rowH, 0, { 'class': css }, false, 'center', 'center');
                        }
                    }

                    let elem = renderer.rect(r.x + x, r.y + y + barSize / 2 + dy / 2, barSize, barSize);
                    if (isVerticalFlow)
                        y += dy;

                    self.renderer.attr(elem, { fill: fillColor, 'fill-opacity': opacity, stroke: lineColor, 'stroke-width': 1, 'stroke-opacity': data[i].opacity });
                }
                else {
                    let elem = renderer.rect(r.x + x, r.y + y + barSize / 2, barSize, barSize);
                    self.renderer.attr(elem, {
                        fill: fillColor, 'fill-opacity': opacity, stroke: lineColor, 'stroke-width': 1, 'stroke-opacity': data[i].opacity,
                        purpose: 'legend-toggle', data: data[i]
                    });

                    let textElem;

                    if (isVerticalFlow) {
                        textElem = self.renderer.text(text, r.x + x + 1.5 * barSize, r.y + y, sz.width, sz.height + barSize / 2, 0, { 'class': css }, false, 'left', 'center');
                    }
                    else {
                        textElem = self.renderer.text(text, r.x + x + 1.5 * barSize, r.y + y, sz.width, rowH, 0, { 'class': css }, false, 'center', 'center');
                    }

                    renderer.attr(textElem, { purpose: 'legend-toggle', data: data[i] });
                }
                self.renderer.endGroup();

                self._setLegendToggleHandler(gidx, sidx, iidx, g);
            }

            if (!isVerticalFlow) {
                x += sz.width + 2 * barSize;
                if (rowW < x)
                    rowW = x;
            }
        }

        if (isMeasure) {
            szMeasure.height = this.renderer._ptrnd(y + rowH + 5);
            szMeasure.width = this.renderer._ptrnd(rowW);
            return szMeasure;
        }
    }

    isSerieVisible(groupIndex, serieIndex, itemIndex) {
        return this._isSerieVisible(groupIndex, serieIndex, itemIndex);
    }

    /** @private */
    _isSerieVisible(groupIndex, serieIndex, itemIndex) {
        while (this._itemsToggleState.length < groupIndex + 1)
            this._itemsToggleState.push([]);

        let g = this._itemsToggleState[groupIndex];
        while (g.length < serieIndex + 1)
            g.push(isNaN(itemIndex) ? true : []);

        let s = g[serieIndex];
        if (isNaN(itemIndex))
            return s;

        if (!Array.isArray(s))
            g[serieIndex] = s = [];

        while (s.length < itemIndex + 1)
            s.push(true);

        return s[itemIndex];
    }

    isGroupVisible(groupIndex) {
        return this._isGroupVisible(groupIndex);
    }

    /** @private */
    _isGroupVisible(groupIndex) {
        let isGroupVisible = false;
        let series = this.seriesGroups[groupIndex].series;
        if (!series)
            return isGroupVisible;

        for (let i = 0; i < series.length; i++) {
            if (this._isSerieVisible(groupIndex, i)) {
                isGroupVisible = true;
                break;
            }
        }

        return isGroupVisible;
    }

    /** @private */
    _toggleSerie(groupIndex, serieIndex, itemIndex, enable) {
        let state = !this._isSerieVisible(groupIndex, serieIndex, itemIndex);
        if (enable !== undefined)
            state = enable;

        let group = this.seriesGroups[groupIndex];
        let serie = group.series[serieIndex];

        this.$.fireEvent('toggle', { state: state, seriesGroup: group, serie: serie, elementIndex: itemIndex });

        if (isNaN(itemIndex))
            this._itemsToggleState[groupIndex][serieIndex] = state;
        else {
            let s = this._itemsToggleState[groupIndex][serieIndex];

            if (!Array.isArray(s))
                s = [];

            while (s.length < itemIndex)
                s.push(true);

            s[itemIndex] = state;
        }

        this._isToggleRefresh = true;
        this.update();
        this._isToggleRefresh = false;
    }

    showSerie(groupIndex, serieIndex, itemIndex) {
        this._toggleSerie(groupIndex, serieIndex, itemIndex, true);
    }

    hideSerie(groupIndex, serieIndex, itemIndex) {
        this._toggleSerie(groupIndex, serieIndex, itemIndex, false);
    }

    /** @private */
    _setLegendToggleHandler(groupIndex, serieIndex, itemIndex, element) {
        let g = this.seriesGroups[groupIndex];
        let s = g.series[serieIndex];

        let enableSeriesToggle = s.enableSeriesToggle;
        if (enableSeriesToggle === undefined || enableSeriesToggle === null)
            enableSeriesToggle = g.enableSeriesToggle !== false;

        if (enableSeriesToggle) {
            let self = this;
            this.renderer.addHandler(element, 'click', function () {
                //e.preventDefault();

                self._toggleSerie(groupIndex, serieIndex, itemIndex);
            });
        }
    }

    /** @private */
    _renderLegend(rect, isMeasure) {
        let self = this;
        let legendData = [];

        for (let gidx = 0; gidx < self.seriesGroups.length; gidx++) {
            let g = self.seriesGroups[gidx];
            if (g.showLegend === false)
                continue;

            for (let sidx = 0; sidx < g.series.length; sidx++) {
                let s = g.series[sidx];
                if (s.showLegend === false)
                    continue;

                let settings = self._getSerieSettings(gidx, sidx);
                let legendText;

                if (g.type === 'pie' || g.type === 'donut') {
                    let xAxis = self._getXAxis(gidx);
                    const fs = s.legendFormatSettings || g.legendFormatSettings || self._getFormatSettings(xAxis) || self._getFormatSettings(s) || self._getFormatSettings(g);
                    let ff = s.legendFormatFunction || g.legendFormatFunction || xAxis.formatFunction || s.formatFunction || g.formatFunction;

                    let dataLength = self._getDataLen(gidx);
                    for (let i = 0; i < dataLength; i++) {
                        legendText = self._getDataValue(i, s.displayText, gidx);
                        legendText = self._formatValue(legendText, fs, ff, gidx, sidx, i);

                        let colors = self._getColors(gidx, sidx, i);

                        legendData.push({ groupIndex: gidx, seriesIndex: sidx, itemIndex: i, text: legendText, css: s.displayTextClass, fillColor: colors.fillColor, lineColor: colors.lineColor, opacity: settings.opacity });
                    }

                    continue;
                }

                const fs = s.legendFormatSettings || g.legendFormatSettings;
                let ff = s.legendFormatFunction || g.legendFormatFunction;

                legendText = self._formatValue(s.displayText || s.dataField || '', fs, ff, gidx, sidx, NaN);
                let colors = self._getSeriesColors(gidx, sidx);
                let fillColor = this._get([s.legendFillColor, s.legendColor, colors.fillColor]);
                let lineColor = this._get([s.legendLineColor, s.legendColor, colors.lineColor]);

                legendData.push({ groupIndex: gidx, seriesIndex: sidx, text: legendText, css: s.displayTextClass, fillColor: fillColor, lineColor: lineColor, opacity: settings.opacity });
            }
        }

        return self._renderChartLegend(legendData, rect, isMeasure, (self._legendLayout && self.legendLayout.flow === 'vertical'));
    }

    _getInterval(settings, baseUnitInterval) {
        if (!settings)
            return baseUnitInterval;

        let unitInterval = this._get([settings.unitInterval, baseUnitInterval]);
        if (!isNaN(settings.step) && settings.step !== null)
            unitInterval = settings.step * baseUnitInterval;

        return unitInterval;
    }

    _getOffsets(key, axis, size, stats, settings, padding, valuesOnTicks, baseUnitInterval, useMidVal) {
        let interval = this._getInterval(settings[key], baseUnitInterval);

        let vals = [];
        if (key === '' || (settings[key].visible && settings[key].visible !== 'custom'))
            vals = this._generateIntervalValues(stats, interval, baseUnitInterval, valuesOnTicks, useMidVal);

        let offs;
        if (key !== 'labels') {
            let xOffsetAdj = valuesOnTicks ? padding.left : 0;
            if (!valuesOnTicks && baseUnitInterval > 1) {
                xOffsetAdj = padding.left * (baseUnitInterval + 1);
            }

            // special case with a single value
            if (vals.length === 1)
                xOffsetAdj *= 2;

            offs = this._valuesToOffsets(vals, axis, stats, size, padding, false, xOffsetAdj);
            if (!valuesOnTicks) {
                let adjust = (padding.left + padding.right) * interval / baseUnitInterval;
                if (axis.flip)
                    offs.unshift(offs[0] + adjust);
                else
                    offs.push(offs[offs.length - 1] + adjust);
            }
        }
        else {
            let xOffsetAdj = padding.left;

            // special case with a single value
            if (vals.length === 1)
                xOffsetAdj *= 2;

            offs = this._valuesToOffsets(vals, axis, stats, size, padding, valuesOnTicks, xOffsetAdj);
        }
        let out = this._arraysToObjectsArray([vals, offs], ['value', 'offset']);

        if (axis[key] && axis[key].custom) {
            let customVals = this._objectsArraysToArray(axis[key].custom, 'value');
            let customOffs = this._objectsArraysToArray(axis[key].custom, 'offset');
            let customValsOffs = this._valuesToOffsets(customVals, axis, stats, size, padding, valuesOnTicks, padding.left);
            for (let i = 0; i < axis[key].custom.length; i++) {
                out.push({
                    value: customVals[i],
                    offset: isNaN(customOffs[i]) ? customValsOffs[i] : customOffs[i]
                });
            }
        }

        return out;
    }

    /** @private */
    _renderXAxis(groupIndex, rect, isMeasure, chartRect) {
        let self = this;
        let axis = self._getXAxis(groupIndex);
        let g = self.seriesGroups[groupIndex];
        let swapXY = g.orientation === 'horizontal';
        let szMeasure = { width: 0, height: 0 };
        let settings = self._getAxisSettings(axis);

        if (!axis || !settings.visible || g.type === 'spider')
            return szMeasure;

        // check if the group has visible series
        if (!self._isGroupVisible(groupIndex) || this._isPieGroup(groupIndex))
            return szMeasure;

        let valuesOnTicks = self._alignValuesWithTicks(groupIndex);

        while (self._renderData.length < groupIndex + 1)
            self._renderData.push({});

        // TODO: Update RTL/FLIP flag
        if (self.rightToLeft)
            axis.flip = true;

        let axisSize = swapXY ? rect.height : rect.width;

        let offsets = self._calculateXOffsets(groupIndex, axisSize);
        let axisStats = offsets.axisStats;

        let rangeSelector = axis.rangeSelector && axis.rangeSelector.visible;
        let selectorSize = 0;
        if (rangeSelector) {
            if (!this._moduleRangeSelector)
                self.error(self.localize('missingReference', { files: 'lw.chart.rangeselector.js' }));

            selectorSize = this._selectorGetSize(axis);
        }

        let isMirror = (swapXY && axis.position === 'right') || (!swapXY && axis.position === 'top');

        if (!isMeasure && rangeSelector) {
            if (swapXY) {
                rect.width -= selectorSize;
                if (axis.position !== 'right')
                    rect.x += selectorSize;
            }
            else {
                rect.height -= selectorSize;
                if (axis.position === 'top')
                    rect.y += selectorSize;
            }
        }

        let renderData = {
            rangeLength: offsets.rangeLength,
            itemWidth: offsets.itemWidth,
            intervalWidth: offsets.intervalWidth,
            data: offsets,
            settings: settings,
            isMirror: isMirror,
            rect: rect
        };

        self._renderData[groupIndex].xAxis = renderData;

        let ui = axisStats.interval;
        if (isNaN(ui))
            return szMeasure;

        if (swapXY) {
            settings.title.angle -= 90;
            settings.labels.angle -= 90;
        }

        let gridLinesInterval = this._getInterval(settings.gridLines, ui);
        let tickMarksInterval = this._getInterval(settings.tickMarks, ui);
        let labelsInterval = this._getInterval(settings.labels, ui);

        let labelOffsets;

        let min = axisStats.min;
        let max = axisStats.max;

        let padding = offsets.padding;

        let flip = axis.flip === true || self.rightToLeft;

        let range = { min: min, max: max };
        if (axisStats.logAxis.enabled) {
            range.min = axisStats.logAxis.minPow;
            range.max = axisStats.logAxis.maxPow;
        }

        if (axis.type === 'date') {
            settings.gridLines.offsets = this._generateDTOffsets(min, max, axisSize, padding, gridLinesInterval, ui, axisStats.dateTimeUnit, valuesOnTicks, NaN, false, flip);
            settings.tickMarks.offsets = this._generateDTOffsets(min, max, axisSize, padding, tickMarksInterval, ui, axisStats.dateTimeUnit, valuesOnTicks, NaN, false, flip);
            labelOffsets = this._generateDTOffsets(min, max, axisSize, padding, labelsInterval, ui, axisStats.dateTimeUnit, valuesOnTicks, NaN, true, flip);
        }
        else {
            settings.gridLines.offsets = this._getOffsets('gridLines', axis, axisSize, axisStats, settings, padding, valuesOnTicks, ui);
            settings.tickMarks.offsets = this._getOffsets('tickMarks', axis, axisSize, axisStats, settings, padding, valuesOnTicks, ui);
            labelOffsets = this._getOffsets('labels', axis, axisSize, axisStats, settings, padding, valuesOnTicks, ui);
        }

        let oldPositions;
        if (self._elementRenderInfo && self._elementRenderInfo.length > groupIndex)
            oldPositions = self._elementRenderInfo[groupIndex].xAxis;

        let items = [];

        // prepare the axis labels
        let ffn;
        if (settings.labels.formatFunction)
            ffn = settings.labels.formatFunction;

        const labelsFormatSettings = self._getFormatSettings(settings.labels);
        let fs;
        if (labelsFormatSettings)
            fs = Object.assign({}, labelsFormatSettings);

        if (axis.type === 'date') {
            if (axis.dateFormat && !ffn) {
                if (fs)
                    fs.dateFormat = fs.dateFormat || axis.dateFormat;
                else
                    fs = { dateFormat: axis.dateFormat };
            }
            else if (!ffn && (!fs || (fs && !fs.dateFormat))) {
                ffn = this._getDefaultDTFormatFn(axis.baseUnit || 'day');
            }
        }

        for (let i = 0; i < labelOffsets.length; i++) {
            let value = labelOffsets[i].value;
            let x = labelOffsets[i].offset;
            if (isNaN(x))
                continue;

            let idx = undefined;

            if (axis.type !== 'date' && axisStats.useIndeces && axis.dataField) {
                idx = Math.round(value);
                value = self._getDataValue(idx, axis.dataField, groupIndex);
                if (value === undefined || value === null)
                    value = '';
            }

            let text = self._formatValue(value, fs, ffn, groupIndex, undefined, idx);

            if (text === undefined || text === null || text.toString() === '') {
                if (isNaN(idx))
                    idx = i;

                if (idx >= axisStats.filterRange.min && idx <= axisStats.filterRange.max)
                    text = axisStats.useIndeces ? (axisStats.min + idx).toString() : (value === undefined ? '' : value.toString());
            }

            let obj = { key: value, text: text, targetX: x, x: x };
            if (oldPositions && oldPositions.itemOffsets[value]) {
                obj.x = oldPositions.itemOffsets[value].x;
                obj.y = oldPositions.itemOffsets[value].y;
            }

            items.push(obj);
        }
        ///

        let anim = self._getAnimProps(groupIndex);
        let duration = anim.enabled && items.length < 500 ? anim.duration : 0;
        if (self.enableAxisTextAnimation === false)
            duration = 0;

        let itemsInfo = { items: items, renderData: renderData };

        let sz = self._renderAxis(swapXY, isMirror, settings, { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, chartRect, ui, false, true /*valuesOnTicks*/, itemsInfo, isMeasure, duration);

        if (swapXY)
            sz.width += selectorSize;
        else
            sz.height += selectorSize;

        return sz;
    }

    /** @private */
    _animateAxisText(context, percent) {
        let items = context.items;
        let textSettings = context.textSettings;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (!item)
                continue;

            if (!item.visible)
                continue;

            let x = item.targetX;
            let y = item.targetY;
            if (!isNaN(item.x) && !isNaN(item.y)) {
                x = item.x + (x - item.x) * percent;
                y = item.y + (y - item.y) * percent;
            }

            // TODO: Optimize via text reponsitioning.
            // Requires SVG text rendering changes
            if (item.element) {
                this.renderer.removeElement(item.element);
                item.element = undefined;
            }

            item.element = this.renderer.text(
                item.text,
                x,
                y,
                item.width,
                item.height,
                textSettings.angle,
                { 'class': textSettings.style },
                false,
                textSettings.halign,
                textSettings.valign,
                textSettings.textRotationPoint);
        }
    }

    /** @private */
    _getPolarAxisCoords(groupIndex, rect) {
        let group = this.seriesGroups[groupIndex];

        let offsetX = rect.x + this._draw.getNum([group.offsetX, rect.width / 2]);
        let offsetY = rect.y + this._draw.getNum([group.offsetY, rect.height / 2]);

        let availableSize = Math.min(rect.width, rect.height);

        let radius = group.radius;

        if (this._isPercent(radius))
            radius = parseFloat(radius) / 100 * availableSize / 2;

        if (isNaN(radius))
            radius = availableSize / 2 * 0.6;

        let valuesOnTicks = this._alignValuesWithTicks(groupIndex);

        let startAngle = this._get([group.startAngle, group.minAngle, 0]) - 90;

        if (isNaN(startAngle))
            startAngle = 0;
        else {
            startAngle = 2 * Math.PI * startAngle / 360;
        }

        let endAngle = this._get([group.endAngle, group.maxAngle, 360]) - 90;

        if (isNaN(endAngle))
            endAngle = 2 * Math.PI;
        else {
            endAngle = 2 * Math.PI * endAngle / 360;
        }

        if (startAngle > endAngle) {
            let swap = startAngle;
            startAngle = endAngle;
            endAngle = swap;
        }

        let axisSizeRatio = this.renderer._rnd(Math.abs(startAngle - endAngle) / (Math.PI * 2), 0.001, true);
        let axisSize = Math.PI * 2 * radius * axisSizeRatio;

        let offsets = this._calcGroupOffsets(groupIndex, rect).xoffsets;
        if (!offsets)
            return;

        let isClosedCircle = !(Math.abs(Math.abs(endAngle - startAngle) - Math.PI * 2) > 0.00001),
            adjRadius;

        if (group.spider) {
            const axisStats = this._getXAxisStats(groupIndex, this._getXAxis(groupIndex), axisSize);
            let interval = axisStats.interval;
            if (isNaN(interval) || interval === 0)
                interval = 1;

            let slices = (axisStats.max - axisStats.min) / interval + (isClosedCircle ? 1 : 0);
            slices = Math.round(slices);

            if (slices > 2) {
                let cos = Math.cos(Math.abs(endAngle - startAngle) / 2 / slices);
                cos = this.renderer._rnd(cos, 0.01);

                if (cos === 0)
                    cos = 1
                adjRadius = radius / cos;

                if (adjRadius > radius && valuesOnTicks)
                    radius = adjRadius;
            }
        }

        radius = this.renderer._ptrnd(radius);
        //  axisSize = this.renderer._ptrnd(Math.PI * 2 * radius * axisSizeRatio);

        return {
            x: offsetX,
            y: offsetY,
            r: radius,
            adjR: this._get([adjRadius, radius]),
            itemWidth: offsets.itemWidth,
            rangeLength: offsets.rangeLength,
            valuesOnTicks: valuesOnTicks,
            startAngle: startAngle,
            endAngle: endAngle,
            isClosedCircle: isClosedCircle,
            axisSize: axisSize
        };
    }

    /** @private */
    _toPolarCoord(polarAxisCoords, rect, x, y) {
        let axisSizeRatio = Math.abs(polarAxisCoords.startAngle - polarAxisCoords.endAngle) / (Math.PI * 2);

        let angle = (x - rect.x) * 2 * Math.PI * axisSizeRatio / Math.max(1, rect.width) + polarAxisCoords.startAngle;

        let radius = ((rect.height + rect.y) - y) * polarAxisCoords.r / Math.max(1, rect.height);

        let px = polarAxisCoords.x + radius * Math.cos(angle);
        let py = polarAxisCoords.y + radius * Math.sin(angle);

        return { x: this.renderer._ptrnd(px), y: this.renderer._ptrnd(py) };
    }

    /** @private */
    _renderSpiderAxis(groupIndex, rect) {
        let self = this;
        let axis = self._getXAxis(groupIndex);
        let axisSettings = this._getAxisSettings(axis);

        if (!axis || !axisSettings.visible)
            return;

        let group = self.seriesGroups[groupIndex];

        let polarCoords = self._getPolarAxisCoords(groupIndex, rect);
        if (!polarCoords)
            return;

        let offsetX = this.renderer._ptrnd(polarCoords.x);
        let offsetY = this.renderer._ptrnd(polarCoords.y);
        let radius = polarCoords.adjR;
        let startAngle = polarCoords.startAngle;
        let endAngle = polarCoords.endAngle;

        if (radius < 1)
            return;

        let axisSizeRatio = this.renderer._rnd(Math.abs(startAngle - endAngle) / (Math.PI * 2), 0.001, true);

        let axisSize = Math.PI * 2 * radius * axisSizeRatio;

        let isClosedCircle = polarCoords.isClosedCircle;

        let offsets = this._renderData[groupIndex].xoffsets;
        if (!offsets.rangeLength)
            return;

        let ui = offsets.axisStats.interval;
        if (isNaN(ui) || ui < 1)
            ui = 1;

        while (self._renderData.length < groupIndex + 1)
            self._renderData.push({});

        let renderData = {
            rangeLength: offsets.rangeLength,
            itemWidth: offsets.itemWidth,
            data: offsets,
            rect: rect,
            settings: axisSettings
        };

        self._renderData[groupIndex].xAxis = renderData;
        self._renderData[groupIndex].polarCoords = polarCoords;

        // dedup identical axis drawing
        let showXAxis = true;
        for (let i = 0; i < groupIndex; i++) {
            let polarCoordscompare = self._renderData[i].polarCoords;
            let xAxisCompare = self._getXAxis(i);

            let nomatch = false;
            for (let j in polarCoords)
                if (polarCoords[j] !== polarCoordscompare[j]) {
                    nomatch = true;
                    break;
                }

            if (!nomatch || xAxisCompare !== axis)
                showXAxis = false;
        }

        let gridLinesSettings = axisSettings.gridLines;
        let tickMarksSettings = axisSettings.tickMarks;
        let labelsSettings = axisSettings.labels;

        let gridLinesInterval = this._getInterval(gridLinesSettings, ui);
        let tickMarksInterval = this._getInterval(tickMarksSettings, ui);
        let labelsInterval = this._getInterval(labelsSettings, ui);

        let valuesOnTicks = self._alignValuesWithTicks(groupIndex);

        let renderer = self.renderer;

        let labelOffsets;

        let axisStats = offsets.axisStats;

        let min = axisStats.min;
        let max = axisStats.max;

        let padding = this._getPaddingSize(offsets.axisStats, axis, valuesOnTicks, axisSize, true, isClosedCircle, false);

        let flip = axis.flip === true || self.rightToLeft;

        if (axis.type === 'date') {
            gridLinesSettings.offsets = this._generateDTOffsets(min, max, axisSize, padding, gridLinesInterval, ui, axis.baseUnit, true, 0, false, flip);
            tickMarksSettings.offsets = this._generateDTOffsets(min, max, axisSize, padding, tickMarksInterval, ui, axis.baseUnit, true, 0, false, flip);
            labelOffsets = this._generateDTOffsets(min, max, axisSize, padding, labelsInterval, ui, axis.baseUnit, true, 0, true, flip);
        }
        else {
            axisSettings.gridLines.offsets = this._getOffsets('gridLines', axis, axisSize, axisStats, axisSettings, padding, true, ui);
            axisSettings.tickMarks.offsets = this._getOffsets('tickMarks', axis, axisSize, axisStats, axisSettings, padding, true, ui);
            labelOffsets = this._getOffsets('labels', axis, axisSize, axisStats, axisSettings, padding, true, ui);

        }

        let oldPositions;
        if (self._elementRenderInfo && self._elementRenderInfo.length > groupIndex)
            oldPositions = self._elementRenderInfo[groupIndex].xAxis;

        let items = [];

        let dataLen = this._getDataLen(groupIndex);

        for (let i = 0; i < labelOffsets.length; i++) {
            let x = labelOffsets[i].offset;
            let value = labelOffsets[i].value,
                idx;

            if (axis.type !== 'date' && axisStats.useIndeces && axis.dataField) {
                idx = Math.round(value);
                if (idx >= dataLen)
                    continue;

                value = self._getDataValue(idx, axis.dataField);
                if (value === undefined || value === null)
                    value = '';
            }
            let text = self._formatValue(value, self._getFormatSettings(labelsSettings.formatSettings), labelsSettings.formatFunction, groupIndex, undefined, idx);
            if (text === undefined || text === null || text.toString() === '')
                text = axisStats.useIndeces ? (axisStats.min + i).toString() : (value === undefined || value === null ? '' : value.toString());

            let obj = { key: value, text: text, targetX: x, x: x };
            if (oldPositions && oldPositions.itemOffsets[value]) {
                obj.x = oldPositions.itemOffsets[value].x;
                obj.y = oldPositions.itemOffsets[value].y;
            }

            items.push(obj);
        }

        // draw the spider
        let strokeAttributes = { stroke: gridLinesSettings.color || self._getThemeColor('line'), fill: 'none', 'stroke-width': gridLinesSettings.width, 'stroke-dasharray': gridLinesSettings.dashStyle || '' };

        if (!group.spider) {
            if (axisSizeRatio === 1)
                renderer.circle(offsetX, offsetY, radius, strokeAttributes);
            else {
                let aStart = -startAngle / Math.PI * 180;
                let aEnd = -endAngle / Math.PI * 180;

                this.renderer.pieslice(
                    offsetX,
                    offsetY,
                    0, // innerRadius
                    radius,
                    Math.min(aStart, aEnd),
                    Math.max(aStart, aEnd),
                    undefined,
                    strokeAttributes);
            }
        }

        //let  cnt = items.length;
        //let  aIncrement = 2 * Math.PI / (cnt);
        let aIncrementAdj = startAngle;

        // draw x-axis grid lines
        if (gridLinesSettings.visible && showXAxis) {
            if (!valuesOnTicks && !isClosedCircle) {
                gridLinesSettings.offsets.unshift({ offset: -padding.right });
            }

            for (let i = 0; i < gridLinesSettings.offsets.length; i++) {
                let offset = gridLinesSettings.offsets[i].offset;
                if (!valuesOnTicks) {
                    if (isClosedCircle)
                        offset += padding.right / 2;
                    else
                        offset += padding.right;
                }

                const angle = aIncrementAdj + offset * 2 * Math.PI * axisSizeRatio / Math.max(1, axisSize);
                if (angle - endAngle > 0.01)
                    continue;

                let px = this.renderer._ptrnd(offsetX + radius * Math.cos(angle));
                let py = this.renderer._ptrnd(offsetY + radius * Math.sin(angle));

                renderer.line(offsetX, offsetY, px, py, strokeAttributes);
            }
        }

        // draw tick marks
        if (tickMarksSettings.visible && showXAxis) {
            let tickMarkSize = 5;

            let ticksStrokeAttributes = { stroke: tickMarksSettings.color || self._getThemeColor('line'), fill: 'none', 'stroke-width': tickMarksSettings.width, 'stroke-dasharray': tickMarksSettings.dashStyle || '' };
            if (!valuesOnTicks && !isClosedCircle) {
                tickMarksSettings.offsets.unshift({ offset: -padding.right });
            }

            for (let i = 0; i < tickMarksSettings.offsets.length; i++) {
                let offset = tickMarksSettings.offsets[i].offset;
                if (!valuesOnTicks) {
                    if (isClosedCircle)
                        offset += padding.right / 2;
                    else
                        offset += padding.right;
                }

                const angle = aIncrementAdj + offset * 2 * Math.PI * axisSizeRatio / Math.max(1, axisSize);
                if (angle - endAngle > 0.01)
                    continue;

                let p1 = { x: offsetX + radius * Math.cos(angle), y: offsetY + radius * Math.sin(angle) };
                let p2 = { x: offsetX + (radius + tickMarkSize) * Math.cos(angle), y: offsetY + (radius + tickMarkSize) * Math.sin(angle) };
                renderer.line(this.renderer._ptrnd(p1.x), this.renderer._ptrnd(p1.y), this.renderer._ptrnd(p2.x), this.renderer._ptrnd(p2.y), ticksStrokeAttributes);
            }
        }

        let offsetAngles = [];

        // get spider angles
        if (group.spider) {
            let spiderOffsets = [];
            if (axis.type === 'date')
                spiderOffsets = this._generateDTOffsets(min, max, axisSize, padding, ui, ui, axis.baseUnit, true, 0, false, flip);
            else {
                spiderOffsets = this._getOffsets('', axis, axisSize, axisStats, axisSettings, padding, true, ui);
            }

            if (!valuesOnTicks && !isClosedCircle)
                spiderOffsets.unshift({ offset: -padding.right });

            for (let i = 0; i < spiderOffsets.length; i++) {
                let offset = spiderOffsets[i].offset;
                if (!valuesOnTicks) {
                    if (isClosedCircle)
                        offset += padding.right / 2;
                    else
                        offset += padding.right;
                }

                const angle = aIncrementAdj + offset * 2 * Math.PI * axisSizeRatio / Math.max(1, axisSize);
                if (angle - endAngle > 0.01)
                    continue;

                offsetAngles.push(angle);
            }

            renderData.offsetAngles = offsetAngles;
        }

        // draw value axis
        let arrRadius = self._renderSpiderValueAxis(groupIndex, rect, (valuesOnTicks ? polarCoords.adjR : polarCoords.r), offsetAngles);
        if (!arrRadius)
            arrRadius = [];

        // draw the spider lines
        if (group.spider) {
            if (!valuesOnTicks) {
                for (let i = 0; i < arrRadius.length; i++)
                    arrRadius[i] = arrRadius[i] * polarCoords.adjR / polarCoords.r;
            }
            arrRadius.push(radius);

            this._renderSpiderLines(offsetX, offsetY, arrRadius, polarCoords, offsetAngles, strokeAttributes);
        }

        // draw text items
        if (showXAxis && labelsSettings.visible) {
            renderData.polarLabels = [];

            for (let i = 0; i < items.length; i++) {
                let offset = items[i].x;
                let angle = aIncrementAdj + offset * 2 * Math.PI * axisSizeRatio / Math.max(1, axisSize);

                angle = (360 - angle / (2 * Math.PI) * 360) % 360;
                if (angle < 0)
                    angle = 360 + angle;

                let sz = renderer.measureText(items[i].text, 0, { 'class': axisSettings.labels.style });

                let labelsRadius = (valuesOnTicks ? polarCoords.adjR : polarCoords.r) + (tickMarksSettings.visible ? 7 : 2);

                let labels = axisSettings.labels;
                let labelOffset;

                if (labels.autoRotate) {
                    let pt1 = this._draw._ptRotate(offsetX - sz.width / 2, offsetY - labelsRadius - sz.height, offsetX, offsetY, -angle / 180 * Math.PI);
                    let pt2 = this._draw._ptRotate(offsetX + sz.width / 2, offsetY - labelsRadius, offsetX, offsetY, -angle / 180 * Math.PI);

                    sz.width = Math.abs(pt1.x - pt2.x);
                    sz.height = Math.abs(pt1.y - pt2.y);

                    labelOffset = { x: Math.min(pt1.x, pt2.x), y: Math.min(pt1.y, pt2.y) };
                }
                else {
                    labelOffset = this._adjustTextBoxPosition(
                        offsetX,
                        offsetY,
                        sz,
                        labelsRadius,
                        angle,
                        false,
                        false,
                        false
                    );
                }

                renderData.polarLabels.push({ x: labelOffset.x, y: labelOffset.y, value: items[i].text });

                renderer.text(
                    items[i].text,
                    labelOffset.x,
                    labelOffset.y,
                    sz.width,
                    sz.height,
                    labels.autoRotate ? 90 - angle : labels.angle,
                    { 'class': labels.style },
                    false,
                    labels.halign,
                    labels.valign);
            }
        }
    }

    _renderSpiderLines(x, y, arrRadius, polarCoords, offsetAngles, strokeAttributes) {
        let renderer = this.renderer;

        let isClosedCircle = polarCoords.isClosedCircle;

        for (let j = 0; j < arrRadius.length; j++) {
            let radius = arrRadius[j];

            let ptPrev = undefined, ptFirst = undefined;
            for (let i = 0; i < offsetAngles.length; i++) {
                let angle = offsetAngles[i];

                let px = this.renderer._ptrnd(x + radius * Math.cos(angle));
                let py = this.renderer._ptrnd(y + radius * Math.sin(angle));

                if (ptPrev)
                    renderer.line(ptPrev.x, ptPrev.y, px, py, strokeAttributes);

                ptPrev = { x: px, y: py };
                if (!ptFirst)
                    ptFirst = { x: px, y: py };
            }

            if (ptFirst && isClosedCircle)
                renderer.line(ptPrev.x, ptPrev.y, ptFirst.x, ptFirst.y, strokeAttributes);
        }
    }

    /** @private */
    _renderSpiderValueAxis(groupIndex, rect, radius, offsetAngles) {
        var self = this;
        var group = this.seriesGroups[groupIndex];

        var polarCoords = this._getPolarAxisCoords(groupIndex, rect);
        if (!polarCoords)
            return;

        var offsetX = this.renderer._ptrnd(polarCoords.x);
        var offsetY = this.renderer._ptrnd(polarCoords.y);
        radius = radius || polarCoords.r;
        var startAngle = polarCoords.startAngle;
        var endAngle = polarCoords.endAngle;

        var axisSizeRatio = this.renderer._rnd(Math.abs(startAngle - endAngle) / (Math.PI * 2), 0.001, true);

        if (radius < 1)
            return;

        radius = this.renderer._ptrnd(radius);

        var valueAxis = this._getValueAxis(groupIndex);
        const settings = this._getAxisSettings(valueAxis);

        if (!valueAxis || false === settings.visible)
            return;

        var ui = this._stats.seriesGroups[groupIndex].mu;

        var labelsSettings = settings.labels;

        var valueAxisformatSettings = self._getFormatSettings(labelsSettings);
        var isStacked100 = group.type.indexOf('stacked') !== -1 && group.type.indexOf('100') !== -1;
        if (isStacked100 && !valueAxisformatSettings)
            valueAxisformatSettings = { sufix: '%' };

        var labelsFrequency = this._get([labelsSettings.step, labelsSettings.unitInterval / ui]);
        if (isNaN(labelsFrequency))
            labelsFrequency = 1;

        labelsFrequency = Math.max(1, Math.round(labelsFrequency));

        this._calcValueAxisItems(groupIndex, radius, labelsFrequency);

        var gridLines = settings.gridLines;
        var tickMarks = settings.tickMarks;

        var labels = settings.labels;

        var strokeAttributes = { stroke: gridLines.color || self._getThemeColor('line'), fill: 'none', 'stroke-width': 1, 'stroke-dasharray': gridLines.dashStyle || '' };

        // draw value axis text
        var axisRenderData = this._renderData[groupIndex].valueAxis;
        var items = axisRenderData.items;
        var angle = startAngle;
        if (items.length && settings.line.visible) {
            if (!isNaN(settings.line.angle)) {
                angle = 2 * Math.PI * settings.line.angle / 360;
            }

            var x2 = offsetX + Math.cos(angle) * radius;
            var y2 = offsetY + Math.sin(angle) * radius;

            if (offsetAngles.indexOf(angle) === -1) {
                var lineAttributes = Object.assign({}, strokeAttributes);
                lineAttributes['stroke-width'] = settings.line.lineWidth;
                lineAttributes['stroke'] = settings.line.color || self._getThemeColor('line');
                lineAttributes['stroke-dasharray'] = settings.line.dashStyle;
                this.renderer.line(offsetX, offsetY, x2, y2, lineAttributes);
            }
        }

        items = items.reverse();

        var renderer = this.renderer;

        axisRenderData.polarLabels = [];

        for (let i = 0; i < items.length - 1; i++) {
            var value = items[i];
            if (isNaN(value))
                continue;

            var text = (labels.formatFunction) ? labels.formatFunction(value) : this._formatNumber(value, valueAxisformatSettings);

            var sz = renderer.measureText(text, 0, { 'class': labels.style });

            var x = offsetX + (valueAxis.showTickMarks !== false ? 3 : 2);
            let y = offsetY - axisRenderData.itemWidth * i - sz.height / 2;

            {
                var pt1 = this._draw._ptRotate(x, y, offsetX, offsetY, angle);
                var pt2 = this._draw._ptRotate(x + sz.width, y + sz.height, offsetX, offsetY, angle);

                x = Math.min(pt1.x, pt2.x);
                y = Math.min(pt1.y, pt2.y);

                sz.width = Math.abs(pt1.x - pt2.x);
                sz.height = Math.abs(pt1.y - pt2.y);
            }

            x += settings.labels.textOffset.x;
            y += settings.labels.textOffset.y;

            axisRenderData.polarLabels.push({ x: x, y: y, value: text });

            renderer.text(
                text,
                x,
                y,
                sz.width,
                sz.height,
                labels.autoRotate ? (90 + startAngle * 180 / Math.PI) : labels.angle,
                { 'class': labels.style },
                false,
                labels.halign,
                labels.valign
                //'top','left'
            );
        }

        var valuesOnTicks = valueAxis.valuesOnTicks !== false;
        var gstat = this._stats.seriesGroups[groupIndex];
        var mu = gstat.mu;

        var logAxis = valueAxis.logarithmicScale === true;
        if (logAxis)
            mu = 1;

        var axisStats = { min: gstat.min, max: gstat.max, logAxis: { enabled: logAxis === true, base: valueAxis.logarithmicScaleBase, minPow: gstat.minPow, maxPow: gstat.maxPow } };

        // draw value axis grid lines
        if (gridLines.visible || group.spider || valueAxis.alternatingBackgroundColor || valueAxis.alternatingBackgroundColor2) {
            gridLines.offsets = this._getOffsets('gridLines', valueAxis, radius, axisStats, settings, { left: 0, right: 0 }, valuesOnTicks, mu);
        }

        var arrRadius = [];
        if (gridLines.visible || group.spider) {
            let strokeAttributes = { stroke: gridLines.color || self._getThemeColor('line'), fill: 'none', 'stroke-width': 1, 'stroke-dasharray': gridLines.dashStyle || '' };
            for (let i = 0; i < gridLines.offsets.length; i++) {
                let y = this.renderer._ptrnd(gridLines.offsets[i].offset);
                if (y === radius)
                    continue;

                if (group.spider) {
                    arrRadius.push(y);
                    continue;
                }

                if (axisSizeRatio !== 1) {
                    var aStart = -startAngle / Math.PI * 180;
                    var aEnd = -endAngle / Math.PI * 180;

                    this.renderer.pieslice(
                        offsetX,
                        offsetY,
                        0, // innerRadius
                        y,
                        Math.min(aStart, aEnd),
                        Math.max(aStart, aEnd),
                        undefined,
                        strokeAttributes);
                }
                else {
                    renderer.circle(offsetX, offsetY, y, strokeAttributes);
                }
            }
        }

        if (!valueAxis.tickMarks || (!valueAxis.tickMarks.visible && !valueAxis.showTickMarks))
            tickMarks.visible = false;

        // draw value axis tick marks
        if (tickMarks.visible) {
            tickMarks.offsets = this._getOffsets('tickMarks', valueAxis, radius, axisStats, settings, { left: 0, right: 0 }, valuesOnTicks, mu);

            const tickMarkSize = tickMarks.size * 2;
            let strokeAttributes = { stroke: tickMarks.color || self._getThemeColor('line'), fill: 'none', 'stroke-width': 1, 'stroke-dasharray': tickMarks.dashStyle || '' };

            for (let i = 0; i < tickMarks.offsets.length; i++) {
                var tickMarkRadius = tickMarks.offsets[i].offset;

                var pt1 = {
                    x: offsetX + tickMarkRadius * Math.cos(angle) - tickMarkSize / 2 * Math.sin(angle + Math.PI / 2),
                    y: offsetY + tickMarkRadius * Math.sin(angle) - tickMarkSize / 2 * Math.cos(angle + Math.PI / 2)
                };
                var pt2 = {
                    x: offsetX + tickMarkRadius * Math.cos(angle) + tickMarkSize / 2 * Math.sin(angle + Math.PI / 2),
                    y: offsetY + tickMarkRadius * Math.sin(angle) + tickMarkSize / 2 * Math.cos(angle + Math.PI / 2)
                };

                renderer.line(this.renderer._ptrnd(pt1.x), this.renderer._ptrnd(pt1.y), this.renderer._ptrnd(pt2.x), this.renderer._ptrnd(pt2.y), strokeAttributes);
            }
        }

        return arrRadius;
    }

    /** @private */
    _renderAxis(isVertical, isMirror, axisSettings, rect, chartRect, ui, isLogAxis, valuesOnTicks, itemsInfo, isMeasure, animationDuration) {
        if (axisSettings.customDraw && !isMeasure)
            return { width: NaN, height: NaN };

        let titleSettings = axisSettings.title,
            textSettings = axisSettings.labels,
            tickMarksSettings = axisSettings.tickMarks,
            axisPadding = axisSettings.padding;

        let tickMarkSize = tickMarksSettings.visible ? tickMarksSettings.size : 0;
        let padding = 2;

        let szMeasure = { width: 0, height: 0 };
        let szMeasureDesc = { width: 0, height: 0 };

        if (isVertical)
            szMeasure.height = szMeasureDesc.height = rect.height;
        else
            szMeasure.width = szMeasureDesc.width = rect.width;

        if (!isMeasure && isMirror) {
            if (isVertical)
                rect.x -= rect.width;
        }

        let renderData = itemsInfo.renderData;

        let itemWidth = renderData.itemWidth;

        if (titleSettings.visible && titleSettings.text !== undefined && titleSettings.text !== null && titleSettings !== '') {
            let angle = titleSettings.angle;
            let sz = this.renderer.measureText(titleSettings.text, angle, { 'class': titleSettings.style });
            szMeasureDesc.width = sz.width;
            szMeasureDesc.height = sz.height;

            if (!isMeasure) {
                this.renderer.text(
                    titleSettings.text,
                    rect.x + titleSettings.offset.x + (isVertical ? (!isMirror ? padding + axisPadding.left : -axisPadding.right - padding + 2 * rect.width - szMeasureDesc.width) : 0),
                    rect.y + titleSettings.offset.y + (!isVertical ? (!isMirror ? rect.height - padding - szMeasureDesc.height - axisPadding.bottom : axisPadding.top + padding) : 0),
                    isVertical ? szMeasureDesc.width : rect.width,
                    !isVertical ? szMeasureDesc.height : rect.height,
                    angle,
                    { 'class': titleSettings.style },
                    true,
                    titleSettings.halign,
                    titleSettings.valign,
                    titleSettings.rotationPoint);
            }
        }

        let offset = 0;
        let textXAdjust = valuesOnTicks ? -itemWidth / 2 : 0;

        if (valuesOnTicks && !isVertical) {
            textSettings.halign = 'center';
        }

        let baseX = rect.x;
        let baseY = rect.y;

        let userOffset = textSettings.textOffset;
        if (userOffset) {
            if (!isNaN(userOffset.x))
                baseX += userOffset.x;
            if (!isNaN(userOffset.y))
                baseY += userOffset.y;
        }

        if (!isVertical) {
            baseX += textXAdjust;

            if (isMirror) {
                baseY += szMeasureDesc.height > 0 ? szMeasureDesc.height + 3 * padding : 2 * padding;
                baseY += tickMarkSize - (valuesOnTicks ? tickMarkSize : tickMarkSize / 4);
            }
            else {
                baseY += valuesOnTicks ? tickMarkSize : tickMarkSize / 4;
            }

            baseY += axisPadding.top;
        }
        else {
            baseX += axisPadding.left + padding + (szMeasureDesc.width > 0 ? szMeasureDesc.width + padding : 0) + (isMirror ? rect.width - szMeasureDesc.width : 0);
            baseY += textXAdjust;
        }

        let h = 0;
        let w = 0;

        let items = itemsInfo.items;

        renderData.itemOffsets = {};

        if (this._isToggleRefresh || !this._isUpdate)
            animationDuration = 0;

        let canAnimate = false;

        let widthSum = 0;

        for (let i = 0; i < items.length && textSettings.visible; i++ , offset += itemWidth) {
            if (!items[i] || isNaN(itemWidth))
                continue;

            let text = items[i].text;
            if (!isNaN(items[i].targetX))
                offset = items[i].targetX;

            let sz = this.renderer.measureText(text, textSettings.angle, { 'class': textSettings.style });
            if (sz.width > w)
                w = sz.width;
            if (sz.height > h)
                h = sz.height;

            widthSum += isVertical ? h : w;

            if (!isMeasure) {
                if ((isVertical && offset > rect.height + 2) || (!isVertical && offset > rect.width + 2))
                    continue;

                const x = isVertical ? baseX + (isMirror ? (szMeasureDesc.width === 0 ? tickMarkSize : tickMarkSize - padding) : 0) : baseX + offset;
                let y = isVertical ? baseY + offset : baseY;

                renderData.itemOffsets[items[i].key] = { x: x, y: y };

                if (!canAnimate)
                    if (!isNaN(items[i].x) || !isNaN(items[i].y) && animationDuration)
                        canAnimate = true;

                items[i].targetX = x;
                items[i].targetY = y;
                items[i].width = !isVertical ? itemWidth : rect.width - axisPadding.left - axisPadding.right - 2 * padding - tickMarkSize - ((szMeasureDesc.width > 0) ? szMeasureDesc.width + padding : 0);
                items[i].height = isVertical ? itemWidth : rect.height - axisPadding.top - axisPadding.bottom - 2 * padding - tickMarkSize - ((szMeasureDesc.height > 0) ? szMeasureDesc.height + padding : 0);
                items[i].visible = true;
            }
        }

        renderData.avgWidth = items.length === 0 ? 0 : widthSum / items.length;

        if (!isMeasure) {
            let ctx = { items: items, textSettings: textSettings };
            if (isNaN(animationDuration) || !canAnimate)
                animationDuration = 0;

            this._animateAxisText(ctx, animationDuration === 0 ? 1 : 0);

            if (animationDuration !== 0) {
                let self = this;
                this._enqueueAnimation(
                    'series',
                    undefined,
                    undefined,
                    animationDuration,
                    function (element, ctx, percent) {
                        self._animateAxisText(ctx, percent);
                    },
                    ctx);
            }
        }

        szMeasure.width += 2 * padding + tickMarkSize + szMeasureDesc.width + w + (isVertical && szMeasureDesc.width > 0 ? padding : 0);
        szMeasure.height += 2 * padding + tickMarkSize + szMeasureDesc.height + h + (!isVertical && szMeasureDesc.height > 0 ? padding : 0);

        if (!isVertical)
            szMeasure.height += axisPadding.top + axisPadding.bottom;
        else
            szMeasure.width += axisPadding.left + axisPadding.right;

        if (!isMeasure && axisSettings.line.visible) {
            let lineAttributes = { stroke: axisSettings.line.color || self._getThemeColor('line'), 'stroke-width': axisSettings.line.width, 'stroke-dasharray': axisSettings.line.dashStyle || '' };

            if (isVertical) {
                let x = rect.x + rect.width + (isMirror ? axisPadding.left : -axisPadding.right);
                x = this.renderer._ptrnd(x);
                this.renderer.line(x, rect.y, x, rect.y + rect.height, lineAttributes);
            }
            else {
                let y = this.renderer._ptrnd(rect.y + (isMirror ? rect.height - axisPadding.bottom : axisPadding.top));

                this.renderer.line(this.renderer._ptrnd(rect.x), y, this.renderer._ptrnd(rect.x + rect.width + 1), y, lineAttributes);
            }
        }

        szMeasure.width = this.renderer._rup(szMeasure.width);
        szMeasure.height = this.renderer._rup(szMeasure.height);

        return szMeasure;
    }

    _drawPlotAreaLines(groupIndex, isValueAxis, itemsToDraw) {
        var g = this.seriesGroups[groupIndex];
        var swapXY = g.orientation !== 'horizontal';

        if (!this._renderData || this._renderData.length <= groupIndex)
            return;

        var key = isValueAxis ? 'valueAxis' : 'xAxis';

        var renderData = this._renderData[groupIndex][key];
        if (!renderData)
            return;

        var state = this._renderData.axisDrawState;
        if (!state)
            state = this._renderData.axisDrawState = {};

        var axisKey = '', axis;

        if (isValueAxis) {
            axisKey = 'valueAxis_' + ((g.valueAxis) ? groupIndex : '') + (swapXY ? 'swap' : '');
            axis = this._getValueAxis(groupIndex);
        }
        else {
            axisKey = 'xAxis_' + (g.xAxis ? groupIndex : '') + (swapXY ? 'swap' : '');
            axis = this._getXAxis(groupIndex);
        }

        if (state[axisKey])
            state = state[axisKey];
        else
            state = state[axisKey] = {};

        if (!isValueAxis)
            swapXY = !swapXY;

        var settings = renderData.settings;
        if (!settings)
            return;

        if (settings.customDraw)
            return;

        var gridLinesSettings = settings.gridLines,
            tickMarksSettings = settings.tickMarks,
            padding = settings.padding;

        var rect = renderData.rect;
        var chartRect = this._plotRect;

        if (!gridLinesSettings || !tickMarksSettings)
            return;

        var rndErr = 0.5
        var gridLinePts = {};
        let strokeAttributes = { stroke: gridLinesSettings.color || self._getThemeColor('line'), 'stroke-width': gridLinesSettings.width, 'stroke-dasharray': gridLinesSettings.dashStyle || '' };

        // render grid lines & alternate background colors
        var startOffset = isValueAxis ? rect.y + rect.height : rect.x;
        var offsets = gridLinesSettings.offsets;

        if (isValueAxis && !axis.flip) {
            //offsets = $.extend([], offsets);
            offsets = offsets.slice(0);
            offsets = offsets.reverse();
        }

        let lineOffset;

        if (offsets && offsets.length > 0) {
            var prevOffset = NaN;
            for (let i = 0; i < offsets.length; i++) {
                if (swapXY) {
                    lineOffset = this.renderer._ptrnd(rect.y + offsets[i].offset);
                    if (lineOffset < rect.y - rndErr)
                        lineOffset = this.renderer._ptrnd(rect.y);

                    if (lineOffset > rect.y + rect.height)
                        lineOffset = rect.y + rect.height;
                }
                else {
                    lineOffset = this.renderer._ptrnd(rect.x + offsets[i].offset);
                    if (lineOffset > rect.x + rect.width + rndErr)
                        lineOffset = this.renderer._ptrnd(rect.x + rect.width);
                }

                if (isNaN(lineOffset))
                    continue;

                if (!isNaN(prevOffset) && Math.abs(lineOffset - prevOffset) < 2)
                    continue;

                prevOffset = lineOffset;

                if (itemsToDraw.gridLines && gridLinesSettings.visible !== false && state.gridLines !== true) {
                    if (swapXY)
                        this.renderer.line(this.renderer._ptrnd(chartRect.x), lineOffset, this.renderer._ptrnd(chartRect.x + chartRect.width), lineOffset, strokeAttributes);
                    else
                        this.renderer.line(lineOffset, this.renderer._ptrnd(chartRect.y), lineOffset, this.renderer._ptrnd(chartRect.y + chartRect.height), strokeAttributes);
                }

                gridLinePts[lineOffset] = true;

                if (itemsToDraw.alternatingBackground && (gridLinesSettings.alternatingBackgroundColor || gridLinesSettings.alternatingBackgroundColor2) && state.alternatingBackground !== true) {
                    var fillColor = ((i % 2) === 0) ? gridLinesSettings.alternatingBackgroundColor2 : gridLinesSettings.alternatingBackgroundColor;
                    if (i > 0 && fillColor) {
                        var rectElement;
                        if (swapXY)
                            rectElement = this.renderer.rect(this.renderer._ptrnd(chartRect.x), startOffset, this.renderer._ptrnd(chartRect.width - 1), lineOffset - startOffset, strokeAttributes);
                        else
                            rectElement = this.renderer.rect(startOffset, this.renderer._ptrnd(chartRect.y), lineOffset - startOffset, this.renderer._ptrnd(chartRect.height), strokeAttributes);

                        this.renderer.attr(rectElement, { 'stroke-width': 0, fill: fillColor, opacity: gridLinesSettings.alternatingBackgroundOpacity || 1 });
                    }
                }

                startOffset = lineOffset;
            } // for
        }

        // render axis tick marks
        strokeAttributes = { stroke: tickMarksSettings.color || self._getThemeColor('line'), 'stroke-width': tickMarksSettings.width, 'stroke-dasharray': tickMarksSettings.dashStyle || '' };

        if (itemsToDraw.tickMarks && tickMarksSettings.visible && state.tickMarks !== true) {
            var tickMarkSize = tickMarksSettings.size;
            let offsets = tickMarksSettings.offsets;
            var prevOffset = NaN;
            for (let i = 0; i < offsets.length; i++) {
                if (swapXY) {
                    lineOffset = this.renderer._ptrnd(rect.y + offsets[i].offset);
                    if (lineOffset < rect.y - rndErr)
                        lineOffset = this.renderer._ptrnd(rect.y);

                    if (lineOffset > rect.y + rect.height)
                        lineOffset = rect.y + rect.height;
                }
                else {
                    lineOffset = this.renderer._ptrnd(rect.x + offsets[i].offset);
                    if (lineOffset > rect.x + rect.width + rndErr)
                        lineOffset = this.renderer._ptrnd(rect.x + rect.width);
                }

                if (isNaN(lineOffset))
                    continue;

                if (!isNaN(prevOffset) && Math.abs(lineOffset - prevOffset) < 2)
                    continue;

                if (gridLinePts[lineOffset - 1])
                    lineOffset--;
                else if (gridLinePts[lineOffset + 1])
                    lineOffset++;

                if (swapXY) {
                    if (lineOffset > rect.y + rect.height + rndErr)
                        break;
                }
                else {
                    if (lineOffset > rect.x + rect.width + rndErr)
                        break;
                }

                prevOffset = lineOffset;

                var tickSize = !renderData.isMirror ? -tickMarkSize : tickMarkSize;
                if (swapXY) {
                    var x = rect.x + rect.width + (axis.position === 'right' ? padding.left : -padding.right);
                    if (!isValueAxis)
                        x = rect.x + (renderData.isMirror ? padding.left : -padding.right + rect.width);

                    this.renderer.line(x, lineOffset, x + tickSize, lineOffset, strokeAttributes);
                }
                else {
                    var y = rect.y + (renderData.isMirror ? rect.height : 0);
                    y += renderData.isMirror ? -padding.bottom : padding.top;

                    y = this.renderer._ptrnd(y);
                    this.renderer.line(lineOffset, y, lineOffset, y - tickSize, strokeAttributes);
                }
            }
        }

        state.tickMarks = state.tickMarks || itemsToDraw.tickMarks;
        state.gridLines = state.gridLines || itemsToDraw.gridLines;
        state.alternatingBackground = state.alternatingBackground || itemsToDraw.alternatingBackground;
    }

    /** @private */
    _calcValueAxisItems(groupIndex, axisLength, labelsFrequency) {
        let gstat = this._stats.seriesGroups[groupIndex];
        if (!gstat || !gstat.isValid) {
            return false;
        }

        let g = this.seriesGroups[groupIndex];
        let axis = this._getValueAxis(groupIndex);

        let valuesOnTicks = axis.valuesOnTicks !== false;
        let ints = gstat.intervals;
        let unitH = axisLength / ints;

        let min = gstat.min;
        let mu = gstat.mu;

        let logAxis = axis.logarithmicScale === true;
        let logBase = axis.logarithmicScaleBase || 10;
        let isStacked100 = g.type.indexOf('stacked') !== -1 && g.type.indexOf('100') !== -1;

        if (logAxis)
            mu = !isNaN(axis.unitInterval) ? axis.unitInterval : 1;

        if (!valuesOnTicks)
            ints = Math.max(ints - 1, 1);

        while (this._renderData.length < groupIndex + 1)
            this._renderData.push({});

        this._renderData[groupIndex].valueAxis = {};
        let renderData = this._renderData[groupIndex].valueAxis;

        renderData.itemWidth = renderData.intervalWidth = unitH;
        renderData.items = [];
        let items = renderData.items;

        for (let i = 0; i <= ints; i++) {
            let value = 0;
            if (logAxis) {
                if (isStacked100)
                    value = gstat.max / Math.pow(logBase, ints - i);
                else
                    value = min * Math.pow(logBase, i);
            }
            else {
                value = valuesOnTicks ? min + i * mu : min + (i + 0.5) * mu;
            }

            if (i % labelsFrequency !== 0) {
                items.push(NaN);
                continue;
            }

            items.push(value);
        }

        renderData.rangeLength = logAxis && !isStacked100 ? gstat.intervals : (gstat.intervals) * mu;

        if (axis.flip !== true)
            items = items.reverse();

        return true;
    }

    _getDecimalPlaces(arr, key, limit) {
        let decimalPlaces = 0;
        if (isNaN(limit))
            limit = 10;

        for (let i = 0; i < arr.length; i++) {
            let value = key === undefined ? arr[i] : arr[i][key];
            if (isNaN(value))
                continue;

            let valueTxt = value.toString();
            for (let j = 0; j < valueTxt.length; j++) {
                if (valueTxt[j] < '0' || valueTxt[j] > '9') {
                    decimalPlaces = valueTxt.length - (j + 1);
                    if (decimalPlaces >= 0)
                        return Math.min(decimalPlaces, limit);
                }
            }

            if (decimalPlaces > 0)
                value *= Math.pow(10, decimalPlaces);

            while (Math.round(value) !== value && decimalPlaces < limit) {
                decimalPlaces++;
                value *= 10;
            }
        }

        return decimalPlaces;
    }

    /** @private */
    _renderValueAxis(groupIndex, rect, isMeasure, chartRect) {
        let g = this.seriesGroups[groupIndex];
        let swapXY = g.orientation === 'horizontal';
        let axis = this._getValueAxis(groupIndex);
        if (!axis)
            this.error(this.localize('missingAxis', { index: groupIndex, axis: 'valueAxis' }));

        let szMeasure = { width: 0, height: 0 };

        if (!this._isGroupVisible(groupIndex) || this._isPieOnlySeries() || g.type === 'spider')
            return szMeasure;

        let valuesOnTicks = axis.valuesOnTicks !== false;
        let gstat = this._stats.seriesGroups[groupIndex];
        let mu = gstat.mu;

        let logAxis = axis.logarithmicScale === true;
        let logBase = axis.logarithmicScaleBase || 10;

        if (logAxis)
            mu = !isNaN(axis.unitInterval) ? axis.unitInterval : 1;

        if (mu === 0)
            mu = 1;

        if (isNaN(mu))
            return szMeasure;

        let axisSettings = this._getAxisSettings(axis);
        let titleSettings = axisSettings.title,
            labelsSettings = axisSettings.labels;

        let labels = axis.labels || {};
        let halign = this._get([axis.horizontalTextAlignment, labels.horizontalAlignment]);
        if (!halign && labelsSettings.angle === 0)
            labelsSettings.halign = swapXY ? 'center' : (axis.position === 'right' ? 'left' : 'right');

        let labelsFrequency = this._get([labelsSettings.step, labelsSettings.unitInterval / mu]);
        if (isNaN(labelsFrequency))
            labelsFrequency = 1;

        labelsFrequency = Math.max(1, Math.round(labelsFrequency));

        if (!this._calcValueAxisItems(groupIndex, (swapXY ? rect.width : rect.height), labelsFrequency) || !axisSettings.visible)
            return szMeasure;

        if (!swapXY) {
            titleSettings.angle = (!this.rightToLeft ? -90 : 90);
            if (titleSettings.rotationPoint === 'centercenter') {
                if (titleSettings.valign === 'top')
                    titleSettings.rotationPoint = 'rightcenter';
                else if (titleSettings.valign === 'bottom')
                    titleSettings.rotationPoint = 'leftcenter';
            }
        }

        let renderData = this._renderData[groupIndex].valueAxis;

        let formatSettings = this._getFormatSettings(labelsSettings);

        let isStacked100 = g.type.indexOf('stacked') !== -1 && g.type.indexOf('100') !== -1;
        if (isStacked100 && !formatSettings)
            formatSettings = { sufix: '%' };

        if (!labelsSettings.formatFunction && (!formatSettings || (formatSettings.decimalPlaces === null || formatSettings.decimalPlaces === undefined))) {
            formatSettings = formatSettings || {};
            formatSettings.decimalPlaces = this._getDecimalPlaces([gstat.min, gstat.max, mu], undefined, 3);
        }

        let gridLines = axisSettings.gridLines;

        let axisSize = swapXY ? rect.width : rect.height;

        let flip = (axis.flip === true);

        // force verse due to y-axis layout
        axis.flip = !flip;

        let axisStats = { min: gstat.min, max: gstat.max, logAxis: { enabled: logAxis === true, base: logBase, minPow: gstat.minPow, maxPow: gstat.maxPow } };

        if (gridLines.visible || axis.alternatingBackgroundColor || axis.alternatingBackgroundColor2) {
            gridLines.offsets = this._getOffsets('gridLines', axis, axisSize, axisStats, axisSettings, { left: 0, right: 0 }, valuesOnTicks, mu);
        }

        let tickMarks = axisSettings.tickMarks;
        if (tickMarks.visible) {
            tickMarks.offsets = this._getOffsets('tickMarks', axis, axisSize, axisStats, axisSettings, { left: 0, right: 0 }, valuesOnTicks, mu);
        }

        const labelOffsets = this._getOffsets('labels', axis, axisSize, axisStats, axisSettings, { left: 0, right: 0 }, valuesOnTicks, mu, !valuesOnTicks);

        // restore original value
        axis.flip = flip;

        let items = [];

        let oldPositions;
        if (this._elementRenderInfo && this._elementRenderInfo.length > groupIndex)
            oldPositions = this._elementRenderInfo[groupIndex].valueAxis;

        for (let i = 0; i < labelOffsets.length; i++) {
            let value = labelOffsets[i].value;
            if (isNaN(labelOffsets[i].offset)) {
                items.push(undefined);
                continue;
            }

            let text = (labelsSettings.formatFunction) ? labelsSettings.formatFunction(value) : (!isNaN(value)) ? this._formatNumber(value, formatSettings) : value;

            let obj = { key: value, text: text };
            if (oldPositions && oldPositions.itemOffsets[value]) {
                obj.x = oldPositions.itemOffsets[value].x;
                obj.y = oldPositions.itemOffsets[value].y;
            }

            obj.targetX = labelOffsets[i].offset;

            if (!isNaN(obj.targetX))
                items.push(obj);
        }

        let isMirror = (swapXY && axis.position === 'top') || (!swapXY && axis.position === 'right') || (!swapXY && this.rightToLeft && axis.position !== 'left');

        let itemsInfo = { items: items, renderData: renderData };

        let anim = this._getAnimProps(groupIndex);
        let duration = anim.enabled && items.length < 500 ? anim.duration : 0;
        if (this.enableAxisTextAnimation === false)
            duration = 0;

        renderData.settings = axisSettings;

        renderData.isMirror = isMirror;
        renderData.rect = rect;

        return this._renderAxis(!swapXY, isMirror, axisSettings, rect, chartRect, mu, logAxis, true, itemsInfo, isMeasure, duration);
    }

    _objectsArraysToArray(array, key) {
        let out = [];
        if (!Array.isArray(array))
            return out;

        for (let i = 0; i < array.length; i++)
            out.push(array[i][key]);

        return out;
    }

    _arraysToObjectsArray(arrays, keys) {
        let out = [];
        if (arrays.length !== keys.length)
            return out;

        for (let i = 0; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                if (out.length <= j)
                    out.push({});

                out[j][keys[i]] = arrays[i][j];
            }
        }

        return out;
    }

    _valuesToOffsets(values, axis, stats, size, padding, valuesOnTicks, offsetAdj) {
        let out = [];

        if (!axis || !Array.isArray(values))
            return out;

        let logBase = stats.logAxis.base;
        let type = stats.logAxis.enabled ? 'logarithmic' : 'linear';
        let flip = axis.flip;

        let paddedSize = size;
        let leftPadding = 0, rightPadding = 0;
        if (padding && !isNaN(padding.left)) {
            leftPadding = padding.left;
        }
        if (padding && !isNaN(padding.right)) {
            rightPadding = padding.right;
        }

        paddedSize = size - leftPadding - rightPadding;
        size = paddedSize; // TODO: values on ticks is not needed as param

        for (let i = 0; i < values.length; i++) {
            let x = this._lwPlot.scale(
                values[i],
                {
                    min: stats.min.valueOf(),
                    max: stats.max.valueOf(),
                    type: type,
                    base: logBase
                },
                {
                    min: 0,
                    max: valuesOnTicks ? size : paddedSize,
                    flip: flip
                },
                {
                    //   'ignore_range': true
                }
            );

            if (!isNaN(x)) {
                if (!isNaN(offsetAdj))
                    x += offsetAdj;

                if (x <= size + leftPadding + rightPadding + 1)
                    out.push(this.renderer._ptrnd(x));
                else
                    out.push(NaN);
            }
            else
                out.push(NaN);
        }

        return out;
    }


    _generateIntervalValues(axisStats, interval, baseInterval, valuesOnTicks, useMidVal) {
        let intervals = [];

        let min = axisStats.min;
        let max = axisStats.max;

        if (axisStats.logAxis && axisStats.logAxis.enabled) {
            min = axisStats.logAxis.minPow;
            max = axisStats.logAxis.maxPow;
        }

        if (min === undefined || min === null || max === undefined || max === null)
            return intervals;

        if (min === max) {
            if (axisStats.logAxis && axisStats.logAxis.enabled)
                return [Math.pow(axisStats.logAxis.base, min)];
            else
                return [min];
        }

        let factor = 1;
        if (baseInterval < 1) {
            // adjust to bigger number to avoid js rounding issues
            factor = 1000000;
            min *= factor;
            max *= factor;
            baseInterval *= factor;
        }

        for (let i = min; i <= max; i += baseInterval)
            intervals.push(i / factor + (useMidVal ? baseInterval / 2 : 0));

        if (interval > baseInterval) {
            let out = [];
            let ratio = Math.round(interval / baseInterval);
            for (let i = 0; i < intervals.length; i++)
                if ((i % ratio) === 0)
                    out.push(intervals[i]);

            intervals = out;
        }

        if (axisStats.logAxis && axisStats.logAxis.enabled) {
            for (let i = 0; i < intervals.length; i++)
                intervals[i] = Math.pow(axisStats.logAxis.base, intervals[i]);
        }

        return intervals;
    }

    /** @private */
    _generateDTOffsets(min, max, axisSize, padding, interval, baseInterval, dateTimeUnit, isTicksMode, tickPadding, isValue, flip) {
        if (!dateTimeUnit)
            dateTimeUnit = 'day';

        var offsets = [];

        if (min > max)
            return offsets;

        if (min === max) {
            if (isValue)
                offsets.push({ offset: isTicksMode ? axisSize / 2 : padding.left, value: min });
            else if (isTicksMode)
                offsets.push({ offset: axisSize / 2, value: min });

            return offsets;
        }

        var paddedSize = axisSize - padding.left - padding.right;

        var curr = min;
        var initialOffset = padding.left;
        var offset = initialOffset;

        baseInterval = Math.max(baseInterval, 1);
        var realInterval = baseInterval;
        var frac = Math.min(1, baseInterval);

        if (baseInterval > 1 && dateTimeUnit !== 'millisecond')
            baseInterval = 1;

        while (this.renderer._ptrnd(offset) <= this.renderer._ptrnd(padding.left + paddedSize + (isTicksMode ? 0 : padding.right))) {
            offsets.push({ offset: offset, value: curr });

            var date = new Date(curr.valueOf());

            if (dateTimeUnit === 'millisecond')
                date.setMilliseconds(curr.getMilliseconds() + baseInterval);
            else if (dateTimeUnit === 'second')
                date.setSeconds(curr.getSeconds() + baseInterval);
            else if (dateTimeUnit === 'minute')
                date.setMinutes(curr.getMinutes() + baseInterval);
            else if (dateTimeUnit === 'hour') {
                var before = date.valueOf();
                date.setHours(curr.getHours() + baseInterval);

                if (before === date.valueOf()) // DST FF bug
                    date.setHours(curr.getHours() + baseInterval + 1);
            }
            else if (dateTimeUnit === 'day')
                date.setDate(curr.getDate() + baseInterval);
            else if (dateTimeUnit === 'month')
                date.setMonth(curr.getMonth() + baseInterval);
            else if (dateTimeUnit === 'year')
                date.setFullYear(curr.getFullYear() + baseInterval);

            curr = date;

            offset = initialOffset + (curr.valueOf() - min.valueOf()) * frac / (max.valueOf() - min.valueOf()) * paddedSize;
        }

        if (flip) {
            for (let i = 0; i < offsets.length; i++)
                offsets[i].offset = axisSize - offsets[i].offset;
        }

        if (realInterval > 1 && dateTimeUnit !== 'millisecond') {
            var out = [];
            for (let i = 0; i < offsets.length; i += realInterval)
                out.push({ offset: offsets[i].offset, value: offsets[i].value });

            offsets = out;
        }

        if (!isTicksMode && !isValue && offsets.length > 1) {
            var out = [];
            out.push({ offset: 0, value: undefined });
            for (let i = 1; i < offsets.length; i++) {
                out.push({ offset: offsets[i - 1].offset + (offsets[i].offset - offsets[i - 1].offset) / 2, value: undefined });
            }

            var len = out.length;
            if (len > 1)
                out.push({ offset: out[len - 1].offset + (out[len - 1].offset - out[len - 2].offset) });
            else
                out.push({ offset: axisSize, value: undefined });

            offsets = out;
        }

        if (interval > baseInterval) {
            var out = [];
            var ratio = Math.round(interval / realInterval);
            for (let i = 0; i < offsets.length; i++)
                if ((i % ratio) === 0)
                    out.push({ offset: offsets[i].offset, value: offsets[i].value });

            offsets = out;
        }

        return offsets;
    }

    _hasStackValueReversal(groupIndex, gbase) {
        let group = this.seriesGroups[groupIndex];
        let isStacked = -1 !== group.type.indexOf('stacked');
        if (!isStacked)
            return false;

        let isWaterfall = -1 !== group.type.indexOf('waterfall');

        let len = this._getDataLen(groupIndex);

        let waterfallStackSum = 0;
        let stackIntialized = false;

        let seriesVisibility = [];

        for (let j = 0; j < group.series.length; j++)
            seriesVisibility[j] = this._isSerieVisible(groupIndex, j);

        for (let i = 0; i < len; i++) {
            let isDirectionDown = undefined;
            if (!isWaterfall)
                stackIntialized = false;

            for (let sidx = 0; sidx < group.series.length; sidx++) {
                if (!seriesVisibility[sidx])
                    continue;

                const val = this._getDataValueAsNumber(i, group.series[sidx].dataField, groupIndex);
                if (isNaN(val))
                    continue;

                if (group.series[sidx].summary) {
                    let summary = this._getDataValue(i, group.series[sidx].summary, groupIndex);
                    if (undefined !== summary)
                        continue;
                }

                let currDirectionDown = !stackIntialized ? val < gbase : val < 0;
                stackIntialized = true;

                if (isDirectionDown === undefined)
                    isDirectionDown = currDirectionDown;

                if (currDirectionDown !== isDirectionDown)
                    return true;

                isDirectionDown = currDirectionDown;

                waterfallStackSum += val;
            }
        }

        return false;
    }

    _getValueAxis(groupIndex) {
        let valueAxis = groupIndex === undefined || groupIndex === null ? this.valueAxis : this.seriesGroups[groupIndex].valueAxis || this.valueAxis;

        if (!valueAxis)
            valueAxis = this.valueAxis = {};

        return valueAxis;
    }

    /** @private */
    _buildStats(rect) {
        var stat = { seriesGroups: [] };
        this._stats = stat;

        for (let gidx = 0; gidx < this.seriesGroups.length; gidx++) {
            var group = this.seriesGroups[gidx];
            stat.seriesGroups[gidx] = {};

            var xAxis = this._getXAxis(gidx);
            var valueAxis = this._getValueAxis(gidx);

            var xAxisStats = this._getXAxisStats(gidx, xAxis, (group.orientation !== 'horizontal') ? rect.width : rect.height);

            let grst = stat.seriesGroups[gidx];
            grst.isValid = true;

            var valueAxisSize = (group.orientation === 'horizontal') ? rect.width : rect.height;

            var logAxis = valueAxis.logarithmicScale === true;
            var logBase = valueAxis.logarithmicScaleBase;
            if (isNaN(logBase))
                logBase = 10;

            var isStacked = -1 !== group.type.indexOf('stacked');
            var isStacked100 = isStacked && -1 !== group.type.indexOf('100');
            var isRange = -1 !== group.type.indexOf('range');
            var isWaterfall = group.type.indexOf('waterfall') !== -1;

            if (isWaterfall && !this._moduleWaterfall)
                self.error(self.localize('missingReference', { files: 'lw.chart.waterfall.js' }));

            if (isStacked100) {
                grst.psums = [];
                grst.nsums = [];
            }

            var gmin = NaN, gmax = NaN;
            var gsumP = NaN, gsumN = NaN;
            var gbase = valueAxis ? valueAxis.baselineValue : NaN;
            if (isNaN(gbase))
                gbase = logAxis && !isStacked100 ? 1 : 0;

            var hasStackValueReversal = false;
            if (gbase !== 0 && isStacked) {
                hasStackValueReversal = this._hasStackValueReversal(gidx, gbase);
                if (hasStackValueReversal)
                    gbase = 0;
            }

            if (isStacked && isWaterfall)
                hasStackValueReversal = this._hasStackValueReversal(gidx, gbase);

            var len = this._getDataLen(gidx);
            var gMaxRange = 0;
            var minPercent = NaN;

            var seriesPrevValue = [];
            if (isWaterfall) {
                // init series prev value array for waterfall series
                for (let sidx = 0; sidx < group.series.length; sidx++)
                    seriesPrevValue.push(NaN);
            }

            var prevValueWaterfall = NaN;

            for (let i = 0; i < len && grst.isValid; i++) {
                if (xAxis.rangeSelector && xAxis.rangeSelector.visible) {
                    var xAxisValue = xAxis.dataField ? this._getDataValue(i, xAxis.dataField, gidx) : i;
                    if (xAxisValue && xAxisStats.isDateTime)
                        xAxisValue = this._castAsDate(xAxisValue, xAxis.dateFormat);
                    if (xAxisStats.useIndeces)
                        xAxisValue = i;

                    // skip values outside of xAxis min/max
                    if (xAxisValue && (xAxisValue.valueOf() < xAxisStats.min.valueOf() || xAxisValue.valueOf() > xAxisStats.max.valueOf()))
                        continue;
                }

                var min = valueAxis.minValue;
                var max = valueAxis.maxValue;


                if (/*hasValueAxis && */valueAxis.baselineValue) {
                    if (isNaN(min))
                        min = gbase;
                    else
                        min = Math.min(gbase, min);

                    if (isNaN(max))
                        max = gbase;
                    else
                        max = Math.max(gbase, max);
                }

                var sumP = 0, sumN = 0;

                for (let sidx = 0; group.series && sidx < group.series.length; sidx++) {
                    if (!this._isSerieVisible(gidx, sidx))
                        continue;

                    var val = NaN, valMax = NaN, valMin = NaN;
                    if (group.type.indexOf('candle') !== -1 || group.type.indexOf('ohlc') !== -1) {
                        var fields = ['Open', 'Low', 'Close', 'High'];
                        for (var j in fields) {
                            var valField = this._getDataValueAsNumber(i, group.series[sidx]['dataField' + fields[j]], gidx);
                            if (isNaN(valField))
                                continue;

                            valMin = isNaN(valMax) ? valField : Math.min(valMin, valField);
                            valMax = isNaN(valMax) ? valField : Math.max(valMax, valField);
                        }
                    }
                    else {
                        if (isRange) {
                            var valFrom = this._getDataValueAsNumber(i, group.series[sidx].dataFieldFrom, gidx);
                            var valTo = this._getDataValueAsNumber(i, group.series[sidx].dataFieldTo, gidx);

                            valMax = Math.max(valFrom, valTo);
                            valMin = Math.min(valFrom, valTo);
                        }
                        else {
                            val = this._getDataValueAsNumber(i, group.series[sidx].dataField, gidx);

                            if (isWaterfall) {
                                if (this._isSummary(gidx, i)) {
                                    var summary = this._getDataValue(i, group.series[sidx].summary, gidx);
                                    if (summary !== undefined)
                                        continue;
                                }

                                if (!isStacked) {
                                    if (isNaN(seriesPrevValue[sidx]))
                                        seriesPrevValue[sidx] = val;
                                    else
                                        val += seriesPrevValue[sidx];

                                    seriesPrevValue[sidx] = val;
                                }
                                else {
                                    if (!isNaN(prevValueWaterfall))
                                        val += prevValueWaterfall;

                                    prevValueWaterfall = val;
                                }
                            }


                            if (isNaN(val) || (logAxis && val <= 0))
                                continue;

                            valMin = valMax = val;
                        }
                    }


                    if ((isNaN(max) || valMax > max) && ((isNaN(valueAxis.maxValue)) ? true : valMax <= valueAxis.maxValue))
                        max = valMax;

                    if ((isNaN(min) || valMin < min) && ((isNaN(valueAxis.minValue)) ? true : valMin >= valueAxis.minValue))
                        min = valMin;

                    if (!isNaN(val) && isStacked && !isWaterfall) {
                        if (val > gbase)
                            sumP += val;
                        else if (val < gbase)
                            sumN += val;
                    }
                } // for sidx

                // stacked series fit within min-max settings
                if (!isStacked100) {// && hasValueAxis) {
                    if (!isNaN(valueAxis.maxValue))
                        sumP = Math.min(valueAxis.maxValue, sumP);
                    if (!isNaN(valueAxis.minValue))
                        sumN = Math.max(valueAxis.minValue, sumN);
                }

                if (logAxis && isStacked100) {
                    for (let sidx = 0; sidx < group.series.length; sidx++) {
                        if (!this._isSerieVisible(gidx, sidx)) {
                            minPercent = 0.01;
                            continue;
                        }

                        var val = this._getDataValueAsNumber(i, group.series[sidx].dataField, gidx);
                        if (isNaN(val) || val <= 0) {
                            minPercent = 0.01;
                            continue;
                        }

                        var p = sumP === 0 ? 0 : val / sumP;
                        if (isNaN(minPercent) || p < minPercent)
                            minPercent = p;
                    }
                }

                var range = sumP - sumN;
                if (gMaxRange < range)
                    gMaxRange = range;

                if (isStacked100) {
                    grst.psums[i] = sumP;
                    grst.nsums[i] = sumN;
                }

                if (max > gmax || isNaN(gmax))
                    gmax = max;
                if (min < gmin || isNaN(gmin))
                    gmin = min;

                if (sumP > gsumP || isNaN(gsumP))
                    gsumP = sumP;
                if (sumN < gsumN || isNaN(gsumN))
                    gsumN = sumN;
            } // for i

            if (isStacked100) {
                gsumP = gsumP === 0 ? 0 : Math.max(gsumP, -gsumN);
                gsumN = gsumN === 0 ? 0 : Math.min(gsumN, -gsumP);
            }

            if (gmin === gmax) {
                if (!isNaN(valueAxis.minValue) && isNaN(valueAxis.maxValue)) {
                    gmin = valueAxis.minValue;
                    gmax = logAxis ? gmin * logBase : gmin + 1;
                }
                else if (isNaN(valueAxis.minValue) && !isNaN(valueAxis.maxValue)) {
                    gmax = valueAxis.maxValue;
                    gmin = logAxis ? gmax / logBase : gmax - 1;
                }
            }

            if (gmin === gmax) {
                if (gmin === 0) {
                    gmin = -1;
                    gmax = 1;
                }
                else if (gmin < 0)
                    gmax = 0;
                else {
                    if (!logAxis)
                        gmin = 0;
                    else if (gmin === 1) {
                        gmin = gmin / logBase;
                        gmax = gmax * logBase;
                    }
                }
            }

            var groupContext = {
                gmin: gmin, gmax: gmax, gsumP: gsumP, gsumN: gsumN, gbase: gbase, isLogAxis: logAxis, logBase: logBase,
                minPercent: minPercent, gMaxRange: gMaxRange, isStacked: isStacked, isStacked100: isStacked100, isWaterfall: isWaterfall,
                hasStackValueReversal: hasStackValueReversal, valueAxis: valueAxis, valueAxisSize: valueAxisSize
            };

            if (groupContext.isStacked) {
                if (groupContext.gsumN < 0)
                    groupContext.gmin = Math.min(groupContext.gmin, groupContext.gbase + groupContext.gsumN);

                if (groupContext.gsumP > 0)
                    groupContext.gmax = Math.max(groupContext.gmax, groupContext.gbase + groupContext.gsumP);
            }

            grst.context = groupContext;
        } // for gidx


        this._mergeCommonValueAxisStats();
        for (let i = 0; i < stat.seriesGroups.length; i++) {
            let grst = stat.seriesGroups[i];
            if (!grst.isValid)
                continue;

            var out = this._calcOutputGroupStats(grst.context);
            for (let j in out)
                grst[j] = out[j];

            delete grst.context;
        }
    }

    _mergeCommonValueAxisStats() {
        let common = {};
        for (let i = 0; i < this.seriesGroups.length; i++) {
            if (!this._isGroupVisible(i))
                continue

            if (this.seriesGroups[i].valueAxis)
                continue;

            let stats = this._stats.seriesGroups[i].context;
            common.gbase = stats.gbase;

            if (isNaN(common.gmin) || stats.gmin < common.gmin)
                common.gmin = stats.gmin;

            if (isNaN(common.gmax) || stats.gmax > common.gmax)
                common.gmax = stats.gmax;

            if (isNaN(common.gsumP) || stats.gsumP > common.gsumP)
                common.gsumP = stats.gsumP;

            if (isNaN(common.gsumN) || stats.gsumN < common.gsumN)
                common.gsumN = stats.gsumN;

            if (isNaN(common.logBase) || stats.logBase < common.logBase)
                common.logBase = stats.logBase;

            if (isNaN(common.minPercent) || stats.minPercent < common.minPercent)
                common.minPercent = stats.minPercent;

            if (common.gsumN > 0)
                common.gmin = Math.min(common.gmin, common.gbase + common.gsumN);

            if (common.gsumP > 0)
                common.gmax = Math.max(common.gmax, common.gbase + common.gsumP);
        }

        for (let i = 0; i < this.seriesGroups.length; i++) {
            if (this.seriesGroups[i].valueAxis)
                continue;

            let ctx = this._stats.seriesGroups[i].context;
            for (let j in common)
                ctx[j] = common[j];
        }

    }


    _calcOutputGroupStats(context) {
        let gmin = context.gmin,
            gmax = context.gmax,
            gsumP = context.gsumP,
            gsumN = context.gsumN,
            gbase = context.gbase,
            logAxis = context.isLogAxis,
            logBase = context.logBase,
            minPercent = context.minPercent,
            gMaxRange = context.gMaxRange,
            isStacked = context.isStacked,
            isStacked100 = context.isStacked100,
            isWaterfall = context.isWaterfall,
            hasStackValueReversal = context.hasStackValueReversal,
            valueAxis = context.valueAxis,
            valueAxisSize = context.valueAxisSize;

        /// interval calculation
        let mu = context.valueAxis.unitInterval;
        if (!mu) {
            mu = this._calcInterval(
                gmin,
                gmax,
                Math.max(valueAxisSize / 80, 2));
        }

        if (gmin === gmax) {
            gmin = gbase;
            gmax = 2 * gmax;
        }

        let intervals = NaN;

        // log axis scale
        let minPow = 0;
        let maxPow = 0;
        if (logAxis) {
            if (isStacked100) {
                intervals = 0;
                let p = 1;
                minPow = maxPow = this._draw.log(100, logBase);

                while (p > minPercent) {
                    p /= logBase;
                    minPow--;
                    intervals++;
                }

                gmin = Math.pow(logBase, minPow);

            }
            else {
                if (isStacked && !isWaterfall)
                    gmax = Math.max(gmax, gsumP);

                maxPow = this.renderer._rnd(this._draw.log(gmax, logBase), 1, true);
                gmax = Math.pow(logBase, maxPow);

                minPow = this.renderer._rnd(this._draw.log(gmin, logBase), 1, false);
                gmin = Math.pow(logBase, minPow);
            }

            mu = logBase;
        } // if logAxis

        if (gmin < gsumN)
            gsumN = gmin;

        if (gmax > gsumP)
            gsumP = gmax;

        let mn = gmin;
        let mx = gmax;
        if (!logAxis) {
            if (0 !== Math.abs(mx - mn) % mu) {
                mn = this.renderer._rnd(gmin, mu, false);
                mx = this.renderer._rnd(gmax, mu, true);
            }
        }



        if (isStacked100 && mx > 100)
            mx = 100;

        if (isStacked100 && !logAxis) {
            mx = (mx > 0) ? 100 : 0;
            mn = (mn < 0) ? -100 : 0;
            mu = valueAxis.unitInterval;
            if (isNaN(mu) || mu <= 0 || mu >= 100)
                mu = 10;

            if ((100 % mu) !== 0) {
                // ensure devision without reminder
                for (; mu >= 1; mu--)
                    if ((100 % mu) === 0)
                        break;
            }
        }

        if (isNaN(mx) || isNaN(mn) || isNaN(mu))
            return {};

        if (isNaN(intervals)) {
            intervals = parseInt(((mx - mn) / (mu === 0 ? 1 : mu)).toFixed());
        }

        if (logAxis && !isStacked100) {
            intervals = maxPow - minPow;
            gMaxRange = Math.pow(logBase, intervals);
        }

        if (intervals < 1)
            return {};

        let result = {
            min: mn,
            max: mx,
            logarithmic: logAxis,
            logBase: logBase,
            base: logAxis ? mn : gbase,
            minPow: minPow,
            maxPow: maxPow,
            sumP: gsumP,
            sumN: gsumN,
            mu: mu,
            maxRange: gMaxRange,
            intervals: intervals,
            hasStackValueReversal: hasStackValueReversal
        };

        return result;
    }


    /** @private */
    _getDataLen(groupIndex) {
        let ds = this.dataSource;
        if (groupIndex !== undefined && groupIndex !== null && groupIndex !== -1 && this.seriesGroups[groupIndex].dataSource)
            ds = this.seriesGroups[groupIndex].dataSource;

        if (ds)
            return ds.length;

        return 0;
    }

    /** @private */
    _getDataValue(index, dataField, groupIndex) {
        let ds = this.dataSource;
        if (groupIndex !== undefined && groupIndex !== null && groupIndex !== -1)
            ds = this.seriesGroups[groupIndex].dataSource || ds;

        if (!ds || index < 0 || index > ds.length - 1)
            return undefined;

        if (typeof dataField === 'function')
            return dataField(index, ds);

        return (dataField && dataField !== '') ? ds[index][dataField] : ds[index];
    }

    /** @private */
    _getDataValueAsNumber(index, dataField, groupIndex) {
        let val = this._getDataValue(index, dataField, groupIndex);
        if (this._isDate(val))
            return val.valueOf();

        if (typeof (val) !== 'number')
            val = parseFloat(val);
        if (typeof (val) !== 'number')
            val = undefined;

        return val;
    }

    _isPieGroup(groupIndex) {
        let group = this.seriesGroups[groupIndex];
        if (!group || !group.type)
            return false;

        return group.type.indexOf('pie') !== -1 || group.type.indexOf('donut') !== -1;
    }

    /** @private */
    _renderPieSeries(groupIndex, rect) {
        let dataLength = this._getDataLen(groupIndex);
        let group = this.seriesGroups[groupIndex];

        let renderData = this._calcGroupOffsets(groupIndex, rect).offsets;

        for (let sidx = 0; sidx < group.series.length; sidx++) {
            let s = group.series[sidx];

            if (s.customDraw)
                continue;

            let settings = this._getSerieSettings(groupIndex, sidx);

            let anim = this._getAnimProps(groupIndex, sidx);
            let duration = anim.enabled && dataLength < 5000 && !this._isToggleRefresh && anim.duration;
            if (this._isTouchDevice && (this.renderer instanceof LW.Utilities.HTML5Renderer))
                duration = 0;

            let minAngle = this._get([s.minAngle, s.startAngle]);
            if (isNaN(minAngle) || minAngle < 0 || minAngle > 360)
                minAngle = 0;
            let maxAngle = this._get([s.maxAngle, s.endAngle]);
            if (isNaN(maxAngle) || maxAngle < 0 || maxAngle > 360)
                maxAngle = 360;

            let ctx = { rect: rect, minAngle: minAngle, maxAngle: maxAngle, groupIndex: groupIndex, serieIndex: sidx, settings: settings, items: [] };

            // render
            for (let i = 0; i < dataLength; i++) {
                let itemRenderData = renderData[sidx][i];
                if (!itemRenderData.visible)
                    continue;

                let from = itemRenderData.fromAngle;
                let to = itemRenderData.toAngle;

                let pieSliceElement = this.renderer.pieslice(
                    itemRenderData.x,
                    itemRenderData.y,
                    itemRenderData.innerRadius,
                    itemRenderData.outerRadius,
                    from,
                    duration === 0 ? to : from,
                    itemRenderData.centerOffset);

                this._setRenderInfo(groupIndex, sidx, i, { element: pieSliceElement });

                let ctxItem = {
                    displayValue: itemRenderData.displayValue,
                    itemIndex: i,
                    visible: itemRenderData.visible,
                    x: itemRenderData.x,
                    y: itemRenderData.y,
                    innerRadius: itemRenderData.innerRadius,
                    outerRadius: itemRenderData.outerRadius,
                    fromAngle: from,
                    toAngle: to,
                    centerOffset: itemRenderData.centerOffset
                };

                ctx.items.push(ctxItem);
            } // for i

            this._animatePieSlices(ctx, 0);
            let self = this;
            this._enqueueAnimation(
                'series',
                undefined,
                undefined,
                duration,
                function (element, ctx, percent) {
                    self._animatePieSlices(ctx, percent);
                },
                ctx);
        }
    }

    /** @private */
    _sliceSortFunction(a, b) {
        return a.fromAngle - b.fromAngle;
    }

    /** @private */
    _animatePieSlices(ctx, percent) {
        var renderInfo;
        if (this._elementRenderInfo &&
            this._elementRenderInfo.length > ctx.groupIndex &&
            this._elementRenderInfo[ctx.groupIndex].series &&
            this._elementRenderInfo[ctx.groupIndex].series.length > ctx.serieIndex) {
            renderInfo = this._elementRenderInfo[ctx.groupIndex].series[ctx.serieIndex];
        }

        //var animMaxAngle = 360 * percent;
        var labelsSettings = this._getLabelsSettings(ctx.groupIndex, ctx.serieIndex, NaN);
        var showLabels = labelsSettings.visible;

        var arr = [];
        for (let i = 0; i < ctx.items.length; i++) {
            const item = ctx.items[i];

            // render the slice
            if (!item.visible)
                continue;

            let fromAngle = item.fromAngle;
            var toAngle = item.fromAngle + percent * (item.toAngle - item.fromAngle);

            if (renderInfo && renderInfo[item.displayValue]) {
                var oldFromAngle = renderInfo[item.displayValue].fromAngle;
                var oldToAngle = renderInfo[item.displayValue].toAngle;

                fromAngle = oldFromAngle + (fromAngle - oldFromAngle) * percent;
                toAngle = oldToAngle + (toAngle - oldToAngle) * percent;
            }

            arr.push({ index: i, from: fromAngle, to: toAngle });
        }

        if (renderInfo)
            arr.sort(this._sliceSortFunction);

        var prevToAngle = NaN;
        for (let i = 0; i < arr.length; i++) {
            const item = ctx.items[arr[i].index];

            var elementRenderInfo = this._getRenderInfo(ctx.groupIndex, ctx.serieIndex, item.itemIndex);

            let fromAngle = arr[i].from;
            var toAngle = arr[i].to;

            if (renderInfo) {
                if (!isNaN(prevToAngle) && fromAngle > prevToAngle)
                    fromAngle = prevToAngle;

                prevToAngle = toAngle;
                if (i === arr.length - 1 && toAngle !== arr[0].from)
                    toAngle = ctx.maxAngle + arr[0].from;
            }

            var cmd = this.renderer.pieSlicePath(item.x, item.y, item.innerRadius, item.outerRadius, fromAngle, toAngle, item.centerOffset);
            this.renderer.attr(elementRenderInfo.element, { 'd': cmd });

            var colors = this._getColors(ctx.groupIndex, ctx.serieIndex, item.itemIndex, 'radialGradient', item.outerRadius);
            var settings = ctx.settings;

            elementRenderInfo.colors = colors;
            elementRenderInfo.settings = settings;

            this.renderer.attr(
                elementRenderInfo.element,
                {
                    fill: colors.fillColor,
                    stroke: colors.lineColor,
                    'stroke-width': settings.stroke,
                    'fill-opacity': settings.opacity,
                    'stroke-opacity': settings.opacity,
                    'stroke-dasharray': 'none' || settings.dashStyle
                });

            // Label rendering
            if (showLabels) {
                this._showPieLabel(ctx.groupIndex, ctx.serieIndex, item.itemIndex, labelsSettings, undefined, elementRenderInfo.colors.lineColor);
            }

            // Install mouse event handlers
            if (percent === 1.0) {
                this._installHandlers(elementRenderInfo.element, 'pieslice', ctx.groupIndex, ctx.serieIndex, item.itemIndex);
            }
        }
    }

    _showPieLabel(groupIndex, serieIndex, itemIndex, labelsSettings, radiusAdjustment) {
        let renderInfo = this._renderData[groupIndex].offsets[serieIndex][itemIndex];

        // remove lablel element if exists
        if (renderInfo.elementInfo.labelElement)
            this.renderer.removeElement(renderInfo.elementInfo.labelElement);

        if (!labelsSettings)
            labelsSettings = this._getLabelsSettings(groupIndex, serieIndex, NaN);

        if (!labelsSettings.visible)
            return;

        let angleFrom = renderInfo.fromAngle, angleTo = renderInfo.toAngle;
        let diff = Math.abs(angleFrom - angleTo);
        if (diff > 360) {
            angleFrom = 0;
            angleTo = 360;
        }

        let midAngle = diff / 2 + angleFrom;

        midAngle = midAngle % 360;
        let radMid = midAngle * Math.PI * 2 / 360;

        let labelAngleOverride;
        if (labelsSettings.autoRotate === true)
            labelAngleOverride = midAngle < 90 || midAngle > 270 ? 360 - midAngle : 180 - midAngle;

        let labelLinesEnabled = labelsSettings.linesEnabled;

        // measure
        let sz = this._showLabel(groupIndex, serieIndex, itemIndex, { x: 0, y: 0, width: 0, height: 0 }, 'center', 'center', true, false, false, labelAngleOverride);
        let labelRadius = labelsSettings.radius || renderInfo.outerRadius + Math.max(sz.width, sz.height);
        if (this._isPercent(labelRadius))
            labelRadius = parseFloat(labelRadius) / 100 * Math.min(this._plotRect.width, this._plotRect.height) / 2;

        labelRadius += renderInfo.centerOffset;

        if (isNaN(radiusAdjustment))
            radiusAdjustment = 0;

        labelRadius += radiusAdjustment;

        let g = this.seriesGroups[groupIndex];
        let s = g.series[serieIndex];

        let offsetX = this._draw.getNum([s.offsetX, g.offsetX, this._plotRect.width / 2]);
        let offsetY = this._draw.getNum([s.offsetY, g.offsetY, this._plotRect.height / 2]);

        let cx = this._plotRect.x + offsetX;
        let cy = this._plotRect.y + offsetY;

        let labelOffset = this._adjustTextBoxPosition(
            cx,
            cy,
            sz,
            labelRadius,
            midAngle,
            renderInfo.outerRadius > labelRadius,
            labelsSettings.linesAngles !== false,
            labelsSettings.autoRotate === true);

        const renderedRect = {},
            widthAdjustment = labelOffset.x < cx ? 0 : sz.width / 2,
            sliceColor = Math.sqrt(Math.pow(labelOffset.x - cx, 2) + Math.pow(labelOffset.y - cy, 2)) + widthAdjustment < renderInfo.outerRadius ? arguments[5] : undefined;

        renderInfo.elementInfo.labelElement = this._showLabel(
            groupIndex,
            serieIndex,
            itemIndex,
            { x: labelOffset.x, y: labelOffset.y, width: sz.width, height: sz.height },
            'left',
            'top',
            false,
            false,
            false,
            labelAngleOverride,
            renderedRect,
            sliceColor);

        if (labelRadius > renderInfo.outerRadius + radiusAdjustment + 5 && labelLinesEnabled !== false) {
            let lineSettings = {
                lineColor: renderInfo.elementInfo.colors.lineColor,
                stroke: renderInfo.elementInfo.settings.stroke,
                opacity: renderInfo.elementInfo.settings.opacity,
                dashStyle: renderInfo.elementInfo.settings.dashStyle
            };

            renderInfo.elementInfo.labelArrowPath = this._updateLebelArrowPath(
                renderInfo.elementInfo.labelArrowPath,
                cx,
                cy,
                labelRadius,
                renderInfo.outerRadius + radiusAdjustment,
                radMid,
                labelsSettings.linesAngles !== false,
                lineSettings,
                renderedRect);
        }
    }

    _updateLebelArrowPath(pathElement, cx, cy, labelRadius, outerRadius, angle, useLineAngles, lineSettings, renderedRect) {
        const renderer = this.renderer;
        let x1 = renderer._ptrnd(cx + (labelRadius - 0) * Math.cos(angle));
        let y1 = renderer._ptrnd(cy - (labelRadius - 0) * Math.sin(angle));
        let x2 = renderer._ptrnd(cx + (outerRadius + 2) * Math.cos(angle));
        let y2 = renderer._ptrnd(cy - (outerRadius + 2) * Math.sin(angle));

        // sort the points of possible connections to the label rect by distance to center
        let points = [];
        points.push({ x: renderedRect.x + renderedRect.width / 2, y: renderedRect.y });
        points.push({ x: renderedRect.x + renderedRect.width / 2, y: renderedRect.y + renderedRect.height });
        points.push({ x: renderedRect.x, y: renderedRect.y + renderedRect.height / 2 });
        points.push({ x: renderedRect.x + renderedRect.width, y: renderedRect.y + renderedRect.height / 2 });

        if (!useLineAngles) {
            // include corner points
            points.push({ x: renderedRect.x, y: renderedRect.y });
            points.push({ x: renderedRect.x + renderedRect.width, y: renderedRect.y });
            points.push({ x: renderedRect.x + renderedRect.width, y: renderedRect.y + renderedRect.height });
            points.push({ x: renderedRect.x, y: renderedRect.y + renderedRect.height });
        }

        points = points.sort(function (a, b) {
            return renderer._ptdist(a.x, a.y, cx, cy) - renderer._ptdist(b.x, b.y, cx, cy);
        });
        points = points.sort(function (a, b) {
            return (Math.abs(a.x - cx) + Math.abs(a.y - cy)) - (Math.abs(b.x - cx) + Math.abs(b.y - cy));
        });

        for (let i = 0; i < points.length; i++) {
            points[i].x = renderer._ptrnd(points[i].x);
            points[i].y = renderer._ptrnd(points[i].y);
        }

        // get the best point of the closest corners
        x1 = points[0].x;
        y1 = points[0].y;

        let path = 'M ' + x1 + ',' + y1 + ' L' + x2 + ',' + y2;
        if (useLineAngles) {
            path = 'M ' + x1 + ',' + y1 + ' L' + x2 + ',' + y1 + ' L' + x2 + ',' + y2;
        }

        if (pathElement)
            renderer.attr(pathElement, { 'd': path });
        else
            pathElement = renderer.path(path, {});

        renderer.attr(
            pathElement,
            {
                fill: 'none',
                stroke: lineSettings.lineColor,
                'stroke-width': lineSettings.stroke,
                'stroke-opacity': lineSettings.opacity,
                'stroke-dasharray': 'none' || lineSettings.dashStyle
            });

        return pathElement;
    }

    _adjustTextBoxPosition(cx, cy, sz, labelRadius, angle, adjustToCenter, labelLinesAngles, labelsAutoRotate) {
        let angleInRad = angle * Math.PI * 2 / 360;

        let x = this.renderer._ptrnd(cx + labelRadius * Math.cos(angleInRad));
        let y = this.renderer._ptrnd(cy - labelRadius * Math.sin(angleInRad));

        if (labelsAutoRotate) {
            let w = sz.width;
            let h = sz.height;

            let b = Math.atan(h / w) % (Math.PI * 2);
            let a = angleInRad % (Math.PI * 2);

            let radiusCorrection = 0;
            if (a <= b) {
                radiusCorrection = w / 2 * Math.cos(angleInRad);
            }
            else if (a >= b && a < Math.PI - b) {
                radiusCorrection = (h / 2) * Math.sin(angleInRad);
            }
            else if (a >= Math.PI - b && a < Math.PI + b) {
                radiusCorrection = w / 2 * Math.cos(angleInRad);
            }
            else if (a >= Math.PI + b && a < 2 * Math.PI - b) {
                radiusCorrection = h / 2 * Math.sin(angleInRad);
            }
            else if (a >= 2 * Math.PI - b && a < 2 * Math.PI) {
                radiusCorrection = w / 2 * Math.cos(angleInRad);
            }

            labelRadius += Math.abs(radiusCorrection) + 3;

            let x = this.renderer._ptrnd(cx + labelRadius * Math.cos(angleInRad));
            let y = this.renderer._ptrnd(cy - labelRadius * Math.sin(angleInRad));

            x -= sz.width / 2;
            y -= sz.height / 2;

            return { x: x, y: y };
        }

        if (!adjustToCenter) {
            if (!labelLinesAngles) {
                //0 -  45 && 315-360: left, middle
                //45 - 135: center, bottom
                //135 - 225: right, middle
                //225 - 315: center, top
                if (angle >= 0 && angle < 45 || angle >= 315 && angle < 360)
                    y -= sz.height / 2;
                else if (angle >= 45 && angle < 135) {
                    y -= sz.height;
                    x -= sz.width / 2;
                }
                else if (angle >= 135 && angle < 225) {
                    y -= sz.height / 2;
                    x -= sz.width;
                }
                else if (angle >= 225 && angle < 315) {
                    x -= sz.width / 2;
                }
            }
            else {
                //90 -  270: right, middle
                //0 - 90, 270 - 360: left, middle
                if (angle >= 90 && angle < 270) {
                    y -= sz.height / 2;
                    x -= sz.width;
                }
                else {
                    y -= sz.height / 2;
                }

            }
        }
        else {
            x -= sz.width / 2;
            y -= sz.height / 2;
        }

        return { x: x, y: y };
    }

    _isColumnType(type) {
        return (type.indexOf('column') !== -1 || type.indexOf('waterfall') !== -1);
    }

    /** @private */
    _getColumnGroupsCount(orientation) {
        let cnt = 0;
        orientation = orientation || 'vertical';
        let sg = this.seriesGroups;
        for (let i = 0; i < sg.length; i++) {
            let groupOrientation = sg[i].orientation || 'vertical';
            if (this._isColumnType(sg[i].type) && groupOrientation === orientation)
                cnt++;
        }

        if (this.columnSeriesOverlap)
            cnt = 1;

        return cnt;
    }

    /** @private */
    _getColumnGroupIndex(groupIndex) {
        let idx = 0;
        let orientation = this.seriesGroups[groupIndex].orientation || 'vertical';
        for (let i = 0; i < groupIndex; i++) {
            let sg = this.seriesGroups[i];
            let sgOrientation = sg.orientation || 'vertical';
            if (this._isColumnType(sg.type) && sgOrientation === orientation)
                idx++;
        }

        return idx;
    }

    _renderAxisBands(groupIndex, rect, isXAxis) {
        var axis = isXAxis ? this._getXAxis(groupIndex) : this._getValueAxis(groupIndex);
        var group = this.seriesGroups[groupIndex];
        var bands = isXAxis ? undefined : group.bands;

        if (!bands) {
            for (let i = 0; i < groupIndex; i++) {
                var compareAxis = isXAxis ? this._getXAxis(i) : this._getValueAxis(i)
                if (compareAxis === axis)
                    return; // axis already rendered in earlier group
            }

            bands = axis.bands;
        }

        if (!Array.isArray(bands))
            return;

        var gRect = rect;

        var swapXY = group.orientation === 'horizontal';
        if (swapXY)
            gRect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        this._calcGroupOffsets(groupIndex, gRect);

        for (let i = 0; i < bands.length; i++) {
            var band = bands[i];

            var valFrom = band.minValue;
            var valTo = band.maxValue;

            var from = isXAxis ? this.getXAxisDataPointOffset(valFrom, groupIndex) : this.getValueAxisDataPointOffset(valFrom, groupIndex);
            var to = isXAxis ? this.getXAxisDataPointOffset(valTo, groupIndex) : this.getValueAxisDataPointOffset(valTo, groupIndex);

            if (isNaN(from) || isNaN(to))
                continue;

            var diff = Math.abs(from - to);

            var bandElement;

            if (group.polar || group.spider) {
                var renderData = this._renderData[groupIndex];
                var polarAxisCoords = renderData.polarCoords;

                if (!isXAxis) {
                    var pt0 = this._toPolarCoord(polarAxisCoords, rect, rect.x, renderData.baseOffset);
                    var pt1 = this._toPolarCoord(polarAxisCoords, rect, rect.x, from);
                    var pt2 = this._toPolarCoord(polarAxisCoords, rect, rect.x, to);

                    var r0 = this.renderer._ptdist(pt0.x, pt0.y, pt1.x, pt1.y);
                    var r1 = this.renderer._ptdist(pt0.x, pt0.y, pt2.x, pt2.y);

                    var startAngle = Math.round(-polarAxisCoords.startAngle * 360 / (2 * Math.PI));
                    var endAngle = Math.round(-polarAxisCoords.endAngle * 360 / (2 * Math.PI));

                    if (startAngle > endAngle) {
                        const tmp = startAngle;
                        startAngle = endAngle;
                        endAngle = tmp;
                    }

                    if (group.spider) {
                        var offsetAngles = renderData.xAxis.offsetAngles;
                        let path = '';
                        var rArr = [r1, r0];

                        var angles = offsetAngles;
                        if (polarAxisCoords.isClosedCircle) {
                            //angles = $.extend([], offsetAngles);
                            angles = offsetAngles.slice(0);
                            angles.push(angles[0]);
                        }

                        for (var k in rArr) {
                            for (let j = 0; j < angles.length; j++) {
                                var idx = k === 0 ? j : offsetAngles.length - j - 1;
                                var px = polarAxisCoords.x + rArr[k] * Math.cos(angles[idx]);
                                var py = polarAxisCoords.y + rArr[k] * Math.sin(angles[idx]);

                                if (path === '')
                                    path += 'M ';
                                else
                                    path += ' L';

                                path += this.renderer._ptrnd(px) + ',' + this.renderer._ptrnd(py);
                            }

                            if (k === 0) {
                                var px = polarAxisCoords.x + rArr[1] * Math.cos(angles[idx]);
                                var py = polarAxisCoords.y + rArr[1] * Math.sin(angles[idx]);

                                path += ' L' + this.renderer._ptrnd(px) + ',' + this.renderer._ptrnd(py);
                            }
                        }

                        path += ' Z';

                        bandElement = this.renderer.path(path);
                    }
                    else {
                        bandElement = this.renderer.pieslice(
                            polarAxisCoords.x,
                            polarAxisCoords.y,
                            r0, // innerRadius
                            r1, // outerRadius
                            startAngle,
                            endAngle);
                    }
                }
                else {
                    if (group.spider) {
                        const p1 = this.getPolarDataPointOffset(valFrom, this._stats.seriesGroups[groupIndex].max, groupIndex),
                            p2 = this.getPolarDataPointOffset(valTo, this._stats.seriesGroups[groupIndex].max, groupIndex);

                        let path = 'M ' + polarAxisCoords.x + ',' + polarAxisCoords.y;
                        path += ' L ' + p1.x + ',' + p1.y;
                        path += ' L ' + p2.x + ',' + p2.y;

                        bandElement = this.renderer.path(path);
                    }
                    else {
                        var elementInfo = {};
                        var columnRect = { x: Math.min(from, to), y: rect.y, width: diff, height: rect.height };

                        this._columnAsPieSlice(elementInfo, rect, polarAxisCoords, columnRect);
                        bandElement = elementInfo.element;
                    }
                }
            }
            else {
                var elRect = { x: Math.min(from, to), y: gRect.y, width: diff, height: gRect.height };
                if (!isXAxis)
                    elRect = { x: gRect.x, y: Math.min(from, to), width: gRect.width, height: diff };

                if (swapXY) {
                    let tmp = elRect.x;
                    elRect.x = elRect.y;
                    elRect.y = tmp;

                    tmp = elRect.width;
                    elRect.width = elRect.height;
                    elRect.height = tmp;
                }

                if (diff === 0 || diff === 1) {
                    bandElement = this.renderer.line(
                        this.renderer._ptrnd(elRect.x),
                        this.renderer._ptrnd(elRect.y),
                        this.renderer._ptrnd(elRect.x + (swapXY ? 0 : elRect.width)),
                        this.renderer._ptrnd(elRect.y + (swapXY ? elRect.height : 0))
                    );
                }
                else
                    bandElement = this.renderer.rect(elRect.x, elRect.y, elRect.width, elRect.height);
            }

            var fillColor = band.color || this._getThemeColor('band');
            var lineColor = band.lineColor || fillColor;
            var lineWidth = band.lineWidth;
            if (isNaN(lineWidth))
                lineWidth = 1;

            var opacity = band.opacity;
            if (isNaN(opacity) || opacity < 0 || opacity > 1)
                opacity = 1;

            this.renderer.attr(bandElement, { fill: fillColor, 'fill-opacity': opacity, stroke: lineColor, 'stroke-opacity': opacity, 'stroke-width': lineWidth, 'stroke-dasharray': band.dashStyle });
        } // for
    }

    _getColumnGroupWidth(groupIndex, xoffsets, size) {
        let g = this.seriesGroups[groupIndex];
        let isStacked = g.type.indexOf('stacked') !== -1;

        let columnGroupsCount = this._getColumnGroupsCount(g.orientation);
        if (isNaN(columnGroupsCount) || 0 === columnGroupsCount)
            columnGroupsCount = 1;

        let availableWidth = xoffsets.rangeLength >= 1 ? xoffsets.itemWidth : size * 0.9;

        let minWidth = g.columnsMinWidth;
        if (isNaN(minWidth))
            minWidth = 1;

        if (!isNaN(g.columnsMaxWidth))
            minWidth = Math.min(g.columnsMaxWidth, minWidth);

        // not all items will fit so try to maximize available width
        if (minWidth > availableWidth && xoffsets.length > 0)
            availableWidth = Math.max(availableWidth, size * 0.9 / xoffsets.length);

        // calculate required width for the group
        // for stacked seires it will be at least the minWidth
        let requiredWidth = minWidth;

        // calculate requiredWidth for non-stacked series
        if (!isStacked) {
            let seriesGap = g.seriesGapPercent;
            if (isNaN(seriesGap) || seriesGap < 0)
                seriesGap = 10;

            seriesGap /= 100;

            let serieMinWidth = minWidth;
            serieMinWidth *= (1 + seriesGap);

            requiredWidth += g.series.length * serieMinWidth;
        }

        let targetWidth = Math.max(availableWidth / columnGroupsCount, requiredWidth);

        return { requiredWidth: requiredWidth, availableWidth: availableWidth, targetWidth: targetWidth };
    }

    _getColumnSerieWidthAndOffset(groupIndex, serieIndex) {
        let group = this.seriesGroups[groupIndex];

        let inverse = group.orientation === 'horizontal';

        let rect = this._plotRect;
        if (inverse)
            rect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        let renderData = this._calcGroupOffsets(groupIndex, rect);
        if (!renderData || renderData.xoffsets.length === 0)
            return;

        let valuesOnTicks = true;

        let columnGroupsCount = this._getColumnGroupsCount(group.orientation);
        if (group.type === 'candlestick' || group.type === 'ohlc')
            columnGroupsCount = 1;

        let relativeGroupIndex = this._getColumnGroupIndex(groupIndex);

        let groupWidth = this._getColumnGroupWidth(groupIndex, renderData.xoffsets, inverse ? rect.height : rect.width);

        let intialOffset = 0;
        let itemWidth = groupWidth.targetWidth;

        if (this.columnSeriesOverlap === true || (Math.round(itemWidth) > Math.round(groupWidth.availableWidth / columnGroupsCount))) {
            columnGroupsCount = 1;
            relativeGroupIndex = 0;
        }

        if (valuesOnTicks)
            intialOffset -= (itemWidth * columnGroupsCount) / 2;

        intialOffset += itemWidth * relativeGroupIndex;

        // get columns gap
        let columnGap = group.columnsGapPercent;

        if (columnGap <= 0)
            columnGap = 0;

        if (isNaN(columnGap) || columnGap >= 100)
            columnGap = 25;

        columnGap /= 100;

        // get item gap size
        let itemGapWidth = itemWidth * columnGap;

        if (itemGapWidth + groupWidth.requiredWidth > groupWidth.targetWidth)
            itemGapWidth = Math.max(0, groupWidth.targetWidth - groupWidth.requiredWidth);

        if (Math.round(itemWidth) > Math.round(groupWidth.availableWidth))
            itemGapWidth = 0;

        itemWidth -= itemGapWidth;

        intialOffset += itemGapWidth / 2;

        // get serie gap
        let seriesGap = group.seriesGapPercent;
        if (isNaN(seriesGap) || seriesGap < 0)
            seriesGap = 10;

        let isStacked = group.type.indexOf('stacked') !== -1;

        // get width per serie
        let serieWidth = itemWidth;
        if (!isStacked)
            serieWidth /= group.series.length;

        // calculate serie gap
        let serieSpace = this._get([group.seriesGap, (itemWidth * seriesGap / 100) / (group.series.length - 1)]);
        if (group.polar === true || group.spider === true || isStacked || group.series.length <= 1)
            serieSpace = 0;

        let spacesSum = serieSpace * (group.series.length - 1);
        if (group.series.length > 1 && spacesSum > itemWidth - group.series.length * 1) {
            spacesSum = itemWidth - group.series.length * 1;
            serieSpace = spacesSum / Math.max(1, (group.series.length - 1));
        }

        // get columnWidth
        let columnWidth = serieWidth - (spacesSum / group.series.length);

        // adjust for max width
        let columnMaxAdj = 0;

        let columnsMaxWidth = group.columnsMaxWidth;
        if (!isNaN(columnsMaxWidth)) {
            if (columnWidth > columnsMaxWidth) {
                columnMaxAdj = columnWidth - columnsMaxWidth;
                columnWidth = columnsMaxWidth;
            }
        }

        // get relative serie position
        let seriePos = 0;

        if (!isStacked) {
            let firstPos = (itemWidth - (columnWidth * group.series.length) - spacesSum) / 2;
            let spacesBeforeSerie = Math.max(0, serieIndex);
            seriePos = firstPos + columnWidth * serieIndex + spacesBeforeSerie * serieSpace;
        }
        else {
            seriePos = columnMaxAdj / 2;
        }

        return { width: columnWidth, offset: intialOffset + seriePos };
    }

    /** @private */
    _renderColumnSeries(groupIndex, rect) {
        let group = this.seriesGroups[groupIndex];
        if (!group.series || group.series.length === 0)
            return;

        let inverse = group.orientation === 'horizontal';

        let gRect = rect;
        if (inverse)
            gRect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        let renderData = this._calcGroupOffsets(groupIndex, gRect);
        if (!renderData || renderData.xoffsets.length === 0)
            return;

        let polarAxisCoords;
        if (group.polar === true || group.spider === true) {
            polarAxisCoords = this._getPolarAxisCoords(groupIndex, gRect);
        }

        let ctx = { groupIndex: groupIndex, rect: rect, vertical: !inverse, seriesCtx: [], renderData: renderData, polarAxisCoords: polarAxisCoords };
        ctx.columnGroupWidth = this._getColumnGroupWidth(groupIndex, renderData.xoffsets, inverse ? gRect.height : gRect.width);

        let gradientType = this._getGroupGradientType(groupIndex),
            duration;

        for (let sidx = 0; sidx < group.series.length; sidx++) {
            let s = group.series[sidx];
            if (s.customDraw)
                continue;

            let anim = this._getAnimProps(groupIndex, sidx);
            duration = anim.enabled && !this._isToggleRefresh && renderData.xoffsets.length < 100 ? anim.duration : 0;

            // Calculate horizontal adjustment
            let columnWidthAndOffset = this._getColumnSerieWidthAndOffset(groupIndex, sidx);

            let isVisible = this._isSerieVisible(groupIndex, sidx);

            let serieSettings = this._getSerieSettings(groupIndex, sidx);
            let serieColors = this._getColors(groupIndex, sidx, NaN, this._getGroupGradientType(groupIndex), 4);

            let itemsColors = [];
            if (typeof s.colorFunction === 'function' && !polarAxisCoords) {
                for (let i = renderData.xoffsets.first; i <= renderData.xoffsets.last; i++)
                    itemsColors.push(this._getColors(groupIndex, sidx, i, gradientType, 4));
            }

            let serieCtx = {
                seriesIndex: sidx,
                serieColors: serieColors,
                itemsColors: itemsColors,
                settings: serieSettings,
                columnWidth: columnWidthAndOffset.width,
                xAdjust: columnWidthAndOffset.offset,
                isVisible: isVisible
            };

            ctx.seriesCtx.push(serieCtx);
        }

        this._animColumns(ctx, duration === 0 ? 1 : 0);

        let self = this;
        this._enqueueAnimation(
            'series',
            undefined,
            undefined,
            duration,
            function (element, ctx, percent) {
                self._animColumns(ctx, percent);
            },
            ctx);
    }

    _getPercent(value, defValue, minValue, maxValue) {
        if (isNaN(value))
            value = defValue;

        if (!isNaN(minValue) && !isNaN(value) && value < minValue)
            value = minValue;

        if (!isNaN(maxValue) && !isNaN(value) && value > maxValue)
            value = maxValue;

        if (isNaN(value))
            return NaN;

        return value;
    }

    /** @private */
    _getColumnVOffsets(renderData, groupIndex, seriesCtx, itemIndex, isStacked, percent) {
        var group = this.seriesGroups[groupIndex];

        var columnsTopWidthPercent = this._getPercent(group.columnsTopWidthPercent, 100, 0, 100);
        var columnsBottomWidthPercent = this._getPercent(group.columnsBottomWidthPercent, 100, 0, 100);

        if (columnsTopWidthPercent === 0 && columnsBottomWidthPercent === 0)
            columnsBottomWidthPercent = 100;

        var neckHeightPercent = this._getPercent(group.columnsNeckHeightPercent, NaN, 0, 100) / 100;
        var neckWidthPercent = this._getPercent(group.columnsNeckWidthPercent, 100, 0, 100) / 100;

        var offsets = [];

        var prevTo = NaN;
        for (let iSerie = 0; iSerie < seriesCtx.length; iSerie++) {
            var serieCtx = seriesCtx[iSerie];
            var sidx = serieCtx.seriesIndex;

            var from = renderData.offsets[sidx][itemIndex].from;
            var to = renderData.offsets[sidx][itemIndex].to;
            var xOffset = renderData.xoffsets.data[itemIndex];

            var itemStartState;

            var isVisible = serieCtx.isVisible;
            if (!isVisible)
                to = from;

            var elementRenderInfo = this._elementRenderInfo;
            if (isVisible &&
                elementRenderInfo &&
                elementRenderInfo.length > groupIndex &&
                elementRenderInfo[groupIndex].series.length > sidx
            ) {
                var xvalue = renderData.xoffsets.xvalues[itemIndex];
                itemStartState = elementRenderInfo[groupIndex].series[sidx][xvalue];
                if (itemStartState && !isNaN(itemStartState.from) && !isNaN(itemStartState.to)) {
                    from = itemStartState.from + (from - itemStartState.from) * percent;
                    to = itemStartState.to + (to - itemStartState.to) * percent;
                    xOffset = itemStartState.xoffset + (xOffset - itemStartState.xoffset) * percent;
                }
            }

            if (!itemStartState)
                to = from + (to - from) * (isStacked ? 1 : percent);

            if (isNaN(from))
                from = isNaN(prevTo) ? renderData.baseOffset : prevTo;

            if (!isNaN(to) && isStacked)
                prevTo = to;
            else
                prevTo = from;

            if (isNaN(to))
                to = from;

            var item = { from: from, to: to, xOffset: xOffset };
            if (columnsTopWidthPercent !== 100 || columnsBottomWidthPercent !== 100) {
                item.funnel = true;
                item.toWidthPercent = columnsTopWidthPercent;
                item.fromWidthPercent = columnsBottomWidthPercent;
            }

            offsets.push(item);
        }

        if (isStacked && offsets.length > 1 && !(this._elementRenderInfo && this._elementRenderInfo.length > groupIndex)) {
            var sumP = 0, sumN = 0, minP = -Infinity, maxP = Infinity, minN = Infinity, maxN = -Infinity;
            for (let i = 0; i < offsets.length; i++) {
                var serieCtx = seriesCtx[i];
                if (serieCtx.isVisible) {
                    if (offsets[i].to >= offsets[i].from) {
                        sumN += offsets[i].to - offsets[i].from;

                        minN = Math.min(minN, offsets[i].from);
                        maxN = Math.max(maxN, offsets[i].to);
                    }
                    else {
                        sumP += offsets[i].from - offsets[i].to;

                        minP = Math.max(minP, offsets[i].from);
                        maxP = Math.min(maxP, offsets[i].to);
                    }
                }
            }

            var sumPSave = sumP;
            var sumNSave = sumN;

            sumP *= percent;
            sumN *= percent;

            var curP = 0, curN = 0;
            for (let i = 0; i < offsets.length; i++) {
                if (offsets[i].to >= offsets[i].from) {
                    let diff = offsets[i].to - offsets[i].from;
                    if (diff + curN > sumN) {
                        diff = Math.max(0, sumN - curN);
                        offsets[i].to = offsets[i].from + diff;
                    }

                    if (columnsTopWidthPercent !== 100 || columnsBottomWidthPercent !== 100) {
                        offsets[i].funnel = true;

                        if (!isNaN(neckHeightPercent) && sumNSave * neckHeightPercent >= curN)
                            offsets[i].fromWidthPercent = neckWidthPercent * 100;
                        else
                            offsets[i].fromWidthPercent = (Math.abs(offsets[i].from - minN) / sumNSave) * (columnsTopWidthPercent - columnsBottomWidthPercent) + columnsBottomWidthPercent;

                        if (!isNaN(neckHeightPercent) && sumNSave * neckHeightPercent >= (0 + (curN + diff)))
                            offsets[i].toWidthPercent = neckWidthPercent * 100;
                        else
                            offsets[i].toWidthPercent = (Math.abs(offsets[i].to - minN) / sumNSave) * (columnsTopWidthPercent - columnsBottomWidthPercent) + columnsBottomWidthPercent;
                    }

                    curN += diff;
                }
                else {
                    let diff = offsets[i].from - offsets[i].to;
                    if (diff + curP > sumP) {
                        diff = Math.max(0, sumP - curP);
                        offsets[i].to = offsets[i].from - diff;
                    }

                    if (columnsTopWidthPercent !== 100 || columnsBottomWidthPercent !== 100) {
                        offsets[i].funnel = true;

                        if (!isNaN(neckHeightPercent) && sumPSave * neckHeightPercent >= curP)
                            offsets[i].fromWidthPercent = neckWidthPercent * 100;
                        else
                            offsets[i].fromWidthPercent = (Math.abs(offsets[i].from - minP) / sumPSave) * (columnsTopWidthPercent - columnsBottomWidthPercent) + columnsBottomWidthPercent;

                        if (!isNaN(neckHeightPercent) && sumPSave * neckHeightPercent >= (0 + (curP + diff)))
                            offsets[i].toWidthPercent = neckWidthPercent * 100;
                        else
                            offsets[i].toWidthPercent = (Math.abs(offsets[i].to - minP) / sumPSave) * (columnsTopWidthPercent - columnsBottomWidthPercent) + columnsBottomWidthPercent;
                    }

                    curP += diff;
                }
            }
        }

        return offsets;
    }

    /** @private */
    _columnAsPieSlice(elementInfo, plotRect, polarAxisCoords, columnRect) {
        let pointOuter = this._toPolarCoord(polarAxisCoords, plotRect, columnRect.x, columnRect.y);
        let pointInner = this._toPolarCoord(polarAxisCoords, plotRect, columnRect.x, columnRect.y + columnRect.height);

        let innerRadius = this.renderer._ptdist(polarAxisCoords.x, polarAxisCoords.y, pointInner.x, pointInner.y);
        let outerRadius = this.renderer._ptdist(polarAxisCoords.x, polarAxisCoords.y, pointOuter.x, pointOuter.y);
        let width = plotRect.width;

        let angleRange = Math.abs(polarAxisCoords.startAngle - polarAxisCoords.endAngle) * 180 / Math.PI;

        let toAngle = -((columnRect.x - plotRect.x) * angleRange) / width;
        let fromAngle = -((columnRect.x + columnRect.width - plotRect.x) * angleRange) / width;

        let startAngle = polarAxisCoords.startAngle;
        startAngle = 360 * startAngle / (Math.PI * 2);

        toAngle -= startAngle;
        fromAngle -= startAngle;

        if (elementInfo) {
            if (elementInfo.element !== undefined && elementInfo.element !== null) {
                let cmd = this.renderer.pieSlicePath(polarAxisCoords.x, polarAxisCoords.y, innerRadius, outerRadius, fromAngle, toAngle, 0);
                cmd += ' Z';
                this.renderer.attr(elementInfo.element, { 'd': cmd });
            }
            else {
                elementInfo.element = this.renderer.pieslice(
                    polarAxisCoords.x,
                    polarAxisCoords.y,
                    innerRadius,
                    outerRadius,
                    fromAngle,
                    toAngle,
                    0);
            }
        }

        return { fromAngle: fromAngle, toAngle: toAngle, innerRadius: innerRadius, outerRadius: outerRadius };
    }

    _setRenderInfo(groupIndex, serieIndex, itemIndex, elementInfo) {
        this._renderData[groupIndex].offsets[serieIndex][itemIndex].elementInfo = elementInfo;
    }

    _getRenderInfo(groupIndex, serieIndex, itemIndex) {
        return this._renderData[groupIndex].offsets[serieIndex][itemIndex].elementInfo || {};
    }

    /** @private */
    _animColumns(context, percent) {
        var self = this;

        var gidx = context.groupIndex;
        var group = this.seriesGroups[gidx];
        var renderData = context.renderData;
        var isWaterfall = group.type.indexOf('waterfall') !== -1;
        var xAxis = this._getXAxis(gidx);

        var isStacked = group.type.indexOf('stacked') !== -1;

        var polarAxisCoords = context.polarAxisCoords;

        //var gradientType = this._getGroupGradientType(gidx);

        //var columnWidth = context.columnGroupWidth.targetWidth;

        var firstVisibleSerie = -1;
        for (let j = 0; j < group.series.length; j++) {
            if (this._isSerieVisible(gidx, j)) {
                firstVisibleSerie = j;
                break;
            }
        }

        var minPos = NaN, maxPos = NaN;
        for (let j = 0; j < context.seriesCtx.length; j++) {
            var serieCtx = context.seriesCtx[j];
            if (isNaN(minPos) || minPos > serieCtx.xAdjust)
                minPos = serieCtx.xAdjust;
            if (isNaN(maxPos) || maxPos < serieCtx.xAdjust + serieCtx.columnWidth)
                maxPos = serieCtx.xAdjust + serieCtx.columnWidth;
        }

        var realGroupWidth = Math.abs(maxPos - minPos);
        var gapPercent = this._get([group.columnsGapPercent, 25]) / 100;
        if (isNaN(gapPercent) < 0 || gapPercent >= 1)
            gapPercent = 0.25;

        var realGroupGapWidth = gapPercent * realGroupWidth;

        var xoffsets = context.renderData.xoffsets;

        var xPrev = -1;

        var yWaterfallPrev = {};

        // skipOverlappingPoints is off by default in column series
        var skipOverlappingPoints = group.skipOverlappingPoints === true;

        for (let i = xoffsets.first; i <= xoffsets.last; i++) {
            var x = xoffsets.data[i];
            if (isNaN(x))
                continue;

            if (xPrev !== -1 && Math.abs(x - xPrev) < (realGroupWidth - 1 + realGroupGapWidth) && skipOverlappingPoints)
                continue;
            else
                xPrev = x;

            var offsets = this._getColumnVOffsets(renderData, gidx, context.seriesCtx, i, isStacked, percent);

            var isSummary = false;

            if (isWaterfall) {
                for (let iSerie = 0; iSerie < group.series.length; iSerie++) {
                    if (group.series[iSerie].summary && xoffsets.xvalues[i][group.series[iSerie].summary])
                        isSummary = true;
                }
            }

            for (let iSerie = 0; iSerie < context.seriesCtx.length; iSerie++) {
                var serieCtx = context.seriesCtx[iSerie];
                var sidx = serieCtx.seriesIndex;
                var serie = group.series[sidx];

                var from = offsets[iSerie].from;
                var to = offsets[iSerie].to;
                var xOffset = offsets[iSerie].xOffset;

                var startOffset = (context.vertical ? context.rect.x : context.rect.y) + serieCtx.xAdjust;

                var settings = serieCtx.settings;
                let colors = serieCtx.itemsColors.length !== 0 ? serieCtx.itemsColors[i - renderData.xoffsets.first] : serieCtx.serieColors;

                var isVisible = this._isSerieVisible(gidx, sidx);

                if (!isVisible /*&& !isStacked*/)
                    continue;

                var x = this.renderer._ptrnd(startOffset + xOffset);

                var rect = { x: x, width: serieCtx.columnWidth };

                if (offsets[iSerie].funnel) {
                    rect.fromWidthPercent = offsets[iSerie].fromWidthPercent;
                    rect.toWidthPercent = offsets[iSerie].toWidthPercent;
                }

                var isInverseDirection = true;

                if (context.vertical) {
                    rect.y = from;
                    rect.height = to - from;
                    if (rect.height < 0) {
                        rect.y += rect.height;
                        rect.height = -rect.height;
                        isInverseDirection = false;
                    }
                }
                else {
                    rect.x = from < to ? from : to;
                    rect.width = Math.abs(from - to);
                    isInverseDirection = from - to < 0;
                    rect.y = x;
                    rect.height = serieCtx.columnWidth;
                }

                var size = from - to;
                if (isNaN(size))
                    continue;

                size = Math.abs(size);

                var pieSliceInfo = undefined;

                var elementRenderInfo = self._getRenderInfo(gidx, sidx, i);
                var element = elementRenderInfo.element;
                var labelElement = elementRenderInfo.labelElement;
                var isNewElement = element === undefined || element === null;

                if (labelElement) {
                    self.renderer.removeElement(labelElement);
                    labelElement = undefined;
                }

                if (!polarAxisCoords) {
                    if (offsets[iSerie].funnel) {
                        // funnel or pyramid
                        var path = this._getTrapezoidPath(Object.assign({}, rect), context.vertical, isInverseDirection);
                        if (isNewElement)
                            element = this.renderer.path(path, {});
                        else
                            this.renderer.attr(element, { d: path });
                    }
                    else { // regular column
                        if (isNewElement) {
                            element = this.renderer.rect(rect.x, rect.y, context.vertical ? rect.width : 0, context.vertical ? 0 : rect.height);
                        }
                        else {
                            if (context.vertical === true)
                                this.renderer.attr(element, { x: rect.x, y: rect.y, height: size });
                            else
                                this.renderer.attr(element, { x: rect.x, y: rect.y, width: size });
                        }
                    }
                }
                else {
                    // column on polar axis
                    var elementInfo = { element: element };
                    pieSliceInfo = this._columnAsPieSlice(elementInfo, context.rect, polarAxisCoords, rect);
                    element = elementInfo.element;

                    colors = this._getColors(gidx, sidx, undefined, 'radialGradient', pieSliceInfo.outerRadius);
                }

                if (size < 1 && (percent !== 1 || polarAxisCoords))
                    this.renderer.attr(element, { display: 'none' });
                else
                    this.renderer.attr(element, { display: 'block' });

                if (isNewElement)
                    this.renderer.attr(element, { fill: colors.fillColor, 'fill-opacity': settings.opacity, 'stroke-opacity': settings.opacity, stroke: colors.lineColor, 'stroke-width': settings.stroke, 'stroke-dasharray': settings.dashStyle });

                if (labelElement)
                    this.renderer.removeElement(labelElement);

                if (!isVisible || (size === 0 && percent < 1)) {
                    elementRenderInfo = { element: element, labelElement: labelElement };
                    self._setRenderInfo(gidx, sidx, i, elementRenderInfo);
                    continue;
                }

                /// Waterfall start
                if (isWaterfall && this._get([serie.showWaterfallLines, group.showWaterfallLines]) !== false) {
                    if (!isStacked || (isStacked && iSerie === firstVisibleSerie)) {
                        var serieKey = isStacked ? -1 : iSerie;
                        if (percent === 1 && !isNaN(renderData.offsets[iSerie][i].from) && !isNaN(renderData.offsets[iSerie][i].to)) {
                            var prevWFInfo = yWaterfallPrev[serieKey];
                            if (prevWFInfo !== undefined && prevWFInfo !== null) {

                                var p1 =
                                    {
                                        x: prevWFInfo.x,
                                        y: this.renderer._ptrnd(prevWFInfo.y)
                                    };

                                var p2 = {
                                    x: x,
                                    y: p1.y
                                };

                                var topWP = group.columnsTopWidthPercent / 100;
                                if (isNaN(topWP))
                                    topWP = 1;
                                else if (topWP > 1 || topWP < 0)
                                    topWP = 1;

                                var bottomWP = group.columnsBottomWidthPercent / 100;
                                if (isNaN(bottomWP))
                                    bottomWP = 1;
                                else if (bottomWP > 1 || bottomWP < 0)
                                    bottomWP = 1;

                                var sz = context.vertical ? rect.width : rect.height;

                                p1.x = p1.x - sz / 2 + sz / 2 * topWP;

                                if (isSummary) {
                                    let adj = sz * topWP / 2;
                                    p2.x = p2.x + sz / 2 - (xAxis.flip ? -adj : adj);
                                }
                                else {
                                    let adj = sz * bottomWP / 2;
                                    p2.x = p2.x + sz / 2 - (xAxis.flip ? -adj : adj);
                                }

                                if (!context.vertical) {
                                    this._swapXY([p1]);
                                    this._swapXY([p2]);
                                }

                                this.renderer.line(
                                    p1.x,
                                    p1.y,
                                    p2.x,
                                    p2.y,
                                    {
                                        stroke: prevWFInfo.color,
                                        'stroke-width': settings.stroke,
                                        'stroke-opacity': settings.opacity,
                                        'fill-opacity': settings.opacity,
                                        'stroke-dasharray': settings.dashStyle
                                    }
                                );
                            }
                        }
                    }

                    if (percent === 1 && size !== 0) {
                        yWaterfallPrev[isStacked ? -1 : iSerie] = { y: to, x: (context.vertical ? rect.x + rect.width : rect.y + rect.height), color: colors.lineColor };
                    }
                }
                // Waterfall end

                if (polarAxisCoords) {
                    var sz = this._showLabel(gidx, sidx, i, rect, undefined, undefined, true);
                    var labelRadius = pieSliceInfo.outerRadius + 10;

                    const labelOffset = this._adjustTextBoxPosition(
                        polarAxisCoords.x,
                        polarAxisCoords.y,
                        sz,
                        labelRadius,
                        (pieSliceInfo.fromAngle + pieSliceInfo.toAngle) / 2,
                        true,
                        false,
                        false);

                    labelElement = this._showLabel(gidx, sidx, i, { x: labelOffset.x, y: labelOffset.y }, undefined, undefined, false, false, false);
                }
                else {
                    labelElement = this._showLabel(gidx, sidx, i, rect, undefined, undefined, false, false, isInverseDirection);
                }

                elementRenderInfo = { element: element, labelElement: labelElement };
                self._setRenderInfo(gidx, sidx, i, elementRenderInfo);

                if (percent === 1.0) {
                    this._installHandlers(element, 'column', gidx, sidx, i);
                }
            }
        }
    }

    _getTrapezoidPath(rect, isVertical, isInverseDirection) {
        let path = '';

        let fromP = rect.fromWidthPercent / 100;
        let toP = rect.toWidthPercent / 100;

        if (!isVertical) {
            let tmp = rect.width;
            rect.width = rect.height;
            rect.height = tmp;
            tmp = rect.x;
            rect.x = rect.y;
            rect.y = tmp;
        }

        let x = rect.x + rect.width / 2;

        let points = [
            { x: x - rect.width * (!isInverseDirection ? fromP : toP) / 2, y: rect.y + rect.height },
            { x: x - rect.width * (!isInverseDirection ? toP : fromP) / 2, y: rect.y },
            { x: x + rect.width * (!isInverseDirection ? toP : fromP) / 2, y: rect.y },
            { x: x + rect.width * (!isInverseDirection ? fromP : toP) / 2, y: rect.y + rect.height }
        ];

        if (!isVertical)
            this._swapXY(points);

        path += 'M ' + this.renderer._ptrnd(points[0].x) + ',' + this.renderer._ptrnd(points[0].y);

        for (let i = 1; i < points.length; i++)
            path += ' L ' + this.renderer._ptrnd(points[i].x) + ',' + this.renderer._ptrnd(points[i].y);

        path += ' Z';

        return path;
    }

    _swapXY(points) {
        for (let i = 0; i < points.length; i++) {
            let tmp = points[i].x;
            points[i].x = points[i].y;
            points[i].y = tmp;
        }
    }

    /** @private */
    _renderCandleStickSeries(groupIndex, rect, isOHLC) {
        let self = this;
        let group = self.seriesGroups[groupIndex];
        if (!group.series || group.series.length === 0)
            return;

        let inverse = group.orientation === 'horizontal';

        let gRect = rect;
        if (inverse)
            gRect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        let renderData = self._calcGroupOffsets(groupIndex, gRect);

        if (!renderData || renderData.xoffsets.length === 0)
            return;

        let polarAxisCoords;
        if (group.polar || group.spider) {
            polarAxisCoords = self._getPolarAxisCoords(groupIndex, gRect);
        }

        let gradientType = self._getGroupGradientType(groupIndex);

        let columnsInfo = [];
        for (let sidx = 0; sidx < group.series.length; sidx++)
            columnsInfo[sidx] = self._getColumnSerieWidthAndOffset(groupIndex, sidx);

        for (let sidx = 0; sidx < group.series.length; sidx++) {
            if (!this._isSerieVisible(groupIndex, sidx))
                continue;

            let settings = self._getSerieSettings(groupIndex, sidx);

            let s = group.series[sidx];
            if (s.customDraw)
                continue;

            let colors = typeof s.colorFunction === 'function' ? undefined : self._getColors(groupIndex, sidx, NaN, gradientType);

            let ctx = {
                rect: rect,
                inverse: inverse,
                groupIndex: groupIndex,
                seriesIndex: sidx,
                symbolType: s.symbolType,
                symbolSize: s.symbolSize,
                'fill-opacity': settings.opacity,
                'stroke-opacity': settings.opacity,
                'stroke-width': settings.stroke,
                'stroke-dasharray': settings.dashStyle,
                gradientType: gradientType,
                colors: colors,
                renderData: renderData,
                polarAxisCoords: polarAxisCoords,
                columnsInfo: columnsInfo,
                isOHLC: isOHLC,
                items: [],
                self: self
            };

            let anim = self._getAnimProps(groupIndex, sidx);
            let duration = anim.enabled && !self._isToggleRefresh && renderData.xoffsets.length < 5000 ? anim.duration : 0;

            self._animCandleStick(ctx, 0);

            self._enqueueAnimation('series', undefined, undefined, duration,
                function (undefined, context, percent) {
                    self._animCandleStick(context, percent);
                }, ctx);
        }
    }

    /** @private */
    _animCandleStick(ctx, percent) {
        var fields = ['Open', 'Low', 'Close', 'High'];

        var columnWidth = ctx.columnsInfo[ctx.seriesIndex].width;

        var group = ctx.self.seriesGroups[ctx.groupIndex];
        var xoffsets = ctx.renderData.xoffsets;

        var xPrev = -1;

        var xRange = Math.abs(xoffsets.data[xoffsets.last] - xoffsets.data[xoffsets.first]);
        xRange *= percent;

        var minPos = NaN, maxPos = NaN;
        for (let j = 0; j < ctx.columnsInfo.length; j++) {
            var serieCtx = ctx.columnsInfo[j];
            if (isNaN(minPos) || minPos > serieCtx.offset)
                minPos = serieCtx.offset;
            if (isNaN(maxPos) || maxPos < serieCtx.offset + serieCtx.width)
                maxPos = serieCtx.offset + serieCtx.width;
        }

        var realGroupWidth = Math.abs(maxPos - minPos);

        // skipOverlappingPoints is on by default in candlestick & OHLC series
        var skipOverlappingPoints = group.skipOverlappingPoints !== false;

        for (let i = xoffsets.first; i <= xoffsets.last; i++) {
            var x = xoffsets.data[i];
            if (isNaN(x))
                continue;

            if (xPrev !== -1 && Math.abs(x - xPrev) < realGroupWidth && skipOverlappingPoints)
                continue;

            // skip drawing elements outside the anim % range
            var xDiff = Math.abs(xoffsets.data[i] - xoffsets.data[xoffsets.first]);
            if (xDiff > xRange)
                break;

            xPrev = x;

            var item = ctx.items[i] = ctx.items[i] || {};

            for (let j in fields) {
                var val = ctx.self._getDataValueAsNumber(i, group.series[ctx.seriesIndex]['dataField' + fields[j]], ctx.groupIndex);
                if (isNaN(val))
                    break;

                var y = ctx.renderData.offsets[ctx.seriesIndex][i][fields[j]];
                if (isNaN(y))
                    break;

                item[fields[j]] = y;
            }

            x += ctx.inverse ? ctx.rect.y : ctx.rect.x;

            if (ctx.polarAxisCoords) {
                var point = this._toPolarCoord(ctx.polarAxisCoords, this._plotRect, x, y);
                x = point.x;
                y = point.y;
            }

            x = this.renderer._ptrnd(x);

            for (var it in fields)
                item[it] = this.renderer._ptrnd(item[it]);

            var colors = ctx.colors;
            if (!colors)
                colors = ctx.self._getColors(ctx.groupIndex, ctx.seriesIndex, i, ctx.gradientType);

            if (!ctx.isOHLC) {
                var lineElement = item.lineElement;

                if (!lineElement) {
                    lineElement = ctx.inverse ? this.renderer.line(item.Low, x, item.High, x) : this.renderer.line(x, item.Low, x, item.High);
                    this.renderer.attr(lineElement, { fill: colors.fillColor, 'fill-opacity': ctx['fill-opacity'], 'stroke-opacity': ctx['fill-opacity'], stroke: colors.lineColor, 'stroke-width': ctx['stroke-width'], 'stroke-dasharray': ctx['stroke-dasharray'] });
                    item.lineElement = lineElement;
                }

                var stickElement = item.stickElement;
                x -= columnWidth / 2;

                if (!stickElement) {
                    var fillColor = colors.fillColor;
                    if (item.Close <= item.Open && colors.fillColorAlt)
                        fillColor = colors.fillColorAlt;

                    stickElement = ctx.inverse ?
                        this.renderer.rect(Math.min(item.Open, item.Close), x, Math.abs(item.Close - item.Open), columnWidth) :
                        this.renderer.rect(x, Math.min(item.Open, item.Close), columnWidth, Math.abs(item.Close - item.Open));

                    this.renderer.attr(stickElement, { fill: fillColor, 'fill-opacity': ctx['fill-opacity'], 'stroke-opacity': ctx['fill-opacity'], stroke: colors.lineColor, 'stroke-width': ctx['stroke-width'], 'stroke-dasharray': ctx['stroke-dasharray'] });
                    item.stickElement = stickElement;
                }

                if (percent === 1.0)
                    this._installHandlers(stickElement, 'column', ctx.groupIndex, ctx.seriesIndex, i);
            }
            else {
                var path =
                    'M' + x + ',' + item.Low + ' L' + x + ',' + item.High + ' ' +
                    'M' + (x - columnWidth / 2) + ',' + item.Open + ' L' + x + ',' + item.Open + ' ' +
                    'M' + (x + columnWidth / 2) + ',' + item.Close + ' L' + x + ',' + item.Close;

                if (ctx.inverse) {
                    path =
                        'M' + item.Low + ',' + x + ' L' + item.High + ',' + x + ' ' +
                        'M' + item.Open + ',' + (x - columnWidth / 2) + ' L' + item.Open + ',' + x + ' ' +
                        'M' + item.Close + ',' + x + ' L' + item.Close + ',' + (x + columnWidth / 2);
                }

                var lineElement = item.lineElement;

                if (!lineElement) {
                    lineElement = this.renderer.path(path, {});
                    this.renderer.attr(lineElement, { fill: colors.fillColor, 'fill-opacity': ctx['fill-opacity'], 'stroke-opacity': ctx['fill-opacity'], stroke: colors.lineColor, 'stroke-width': ctx['stroke-width'], 'stroke-dasharray': ctx['stroke-dasharray'] });
                    item.lineElement = lineElement;
                } /*
                    else {
                        this.renderer.attr(lineElement, { 'd': path });
                    }*/

                if (percent === 1.0)
                    this._installHandlers(lineElement, 'column', ctx.groupIndex, ctx.seriesIndex, i);
            }

        } // for
    }


    /** @private */
    _renderScatterSeries(groupIndex, rect, valueField) {
        var group = this.seriesGroups[groupIndex];
        if (!group.series || group.series.length === 0)
            return;

        var isBubble = group.type.indexOf('bubble') !== -1;

        var inverse = group.orientation === 'horizontal';

        var gRect = rect;
        if (inverse)
            gRect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        var renderData = this._calcGroupOffsets(groupIndex, gRect);

        if (!renderData || renderData.xoffsets.length === 0)
            return;

        var scaleWidth = gRect.width;

        var polarAxisCoords;
        if (group.polar || group.spider) {
            polarAxisCoords = this._getPolarAxisCoords(groupIndex, gRect);
            scaleWidth = 2 * polarAxisCoords.r;
        }

        var gradientType = this._getGroupGradientType(groupIndex);

        if (!valueField)
            valueField = 'to';

        for (let sidx = 0; sidx < group.series.length; sidx++) {
            var settings = this._getSerieSettings(groupIndex, sidx);

            var s = group.series[sidx];
            if (s.customDraw)
                continue;

            var dataField = s.dataField;

            var hasColorFunction = typeof s.colorFunction === 'function';

            var colors = this._getColors(groupIndex, sidx, NaN, gradientType);

            var min = NaN, max = NaN;
            if (isBubble) {
                for (let i = renderData.xoffsets.first; i <= renderData.xoffsets.last; i++) {
                    var val = this._getDataValueAsNumber(i, (s.radiusDataField || s.sizeDataField), groupIndex);
                    if (typeof val !== 'number')
                        this.error(this.localize('invalidRadiusDataField', { index: i }));

                    if (!isNaN(val)) {
                        if (isNaN(min) || val < min)
                            min = val;
                        if (isNaN(max) || val > max)
                            max = val;
                    }
                }
            }

            var minRadius = s.minRadius || s.minSymbolSize;
            if (isNaN(minRadius))
                minRadius = scaleWidth / 50;

            var maxRadius = s.maxRadius || s.maxSymbolSize;
            if (isNaN(maxRadius))
                maxRadius = scaleWidth / 25;

            if (minRadius > maxRadius)
                maxRadius = minRadius;

            var radius = s.radius;
            if (isNaN(radius) && !isNaN(s.symbolSize)) {
                radius = (s.symbolType === 'circle') ? s.symbolSize / 2 : s.symbolSize;
            }
            else
                radius = 5;

            var anim = this._getAnimProps(groupIndex, sidx);
            var duration = anim.enabled && !this._isToggleRefresh && renderData.xoffsets.length < 5000 ? anim.duration : 0;

            var ctx = {
                groupIndex: groupIndex,
                seriesIndex: sidx,
                symbolType: s.symbolType,
                symbolSize: s.symbolSize,
                'fill-opacity': settings.opacity,
                'stroke-opacity': settings.opacity,
                'stroke-width': settings.stroke,
                'stroke-width-symbol': settings.strokeSymbol,
                'stroke-dasharray': settings.dashStyle,
                items: [],
                polarAxisCoords: polarAxisCoords
            };

            var ptSave = undefined;

            for (let i = renderData.xoffsets.first; i <= renderData.xoffsets.last; i++) {
                var val = this._getDataValueAsNumber(i, dataField, groupIndex);
                if (typeof (val) !== 'number')
                    continue;

                var x = renderData.xoffsets.data[i];
                var xvalue = renderData.xoffsets.xvalues[i];
                var y = renderData.offsets[sidx][i][valueField];

                if (y < gRect.y || y > gRect.y + gRect.height)
                    continue;

                if (isNaN(x) || isNaN(y))
                    continue;

                if (inverse) {
                    var tmp = x;
                    x = y;
                    y = tmp + rect.y;
                }
                else {
                    x += rect.x;
                }

                if (!hasColorFunction && ptSave && this.enableSampling && this.renderer._ptdist(ptSave.x, ptSave.y, x, y) < 1)
                    continue;

                ptSave = { x: x, y: y };

                var r = radius;
                if (isBubble) {
                    var rval = this._getDataValueAsNumber(i, (s.radiusDataField || s.sizeDataField), groupIndex);
                    if (typeof (rval) !== 'number')
                        continue;
                    r = minRadius + (maxRadius - minRadius) * (rval - min) / Math.max(1, max - min);
                    if (isNaN(r))
                        r = minRadius;
                }

                renderData.offsets[sidx][i].radius = r;

                var yOld = NaN, xOld = NaN;
                var rOld = 0;
                var elementRenderInfo = this._elementRenderInfo;
                if (xvalue !== undefined && xvalue !== null &&
                    elementRenderInfo &&
                    elementRenderInfo.length > groupIndex &&
                    elementRenderInfo[groupIndex].series.length > sidx
                ) {
                    var itemStartState = elementRenderInfo[groupIndex].series[sidx][xvalue];
                    if (itemStartState && !isNaN(itemStartState.to)) {
                        yOld = itemStartState.to;
                        xOld = itemStartState.xoffset;
                        rOld = radius;

                        if (inverse) {
                            var tmp = xOld;
                            xOld = yOld;
                            yOld = tmp + rect.y;
                        }
                        else {
                            xOld += rect.x;
                        }

                        if (isBubble) {
                            rOld = minRadius + (maxRadius - minRadius) * (itemStartState.valueRadius - min) / Math.max(1, max - min);
                            if (isNaN(rOld))
                                rOld = minRadius;
                        }
                    }
                }


                if (hasColorFunction)
                    colors = this._getColors(groupIndex, sidx, i, gradientType);

                ctx.items.push({
                    from: rOld,
                    to: r,
                    itemIndex: i,
                    fill: colors.fillColor,
                    stroke: colors.lineColor,
                    x: x,
                    y: y,
                    xFrom: xOld,
                    yFrom: yOld
                });
            } // i

            this._animR(ctx, 0);

            var self = this;

            this._enqueueAnimation('series', undefined, undefined, duration,
                function (undefined, context, percent) {
                    self._animR(context, percent);
                }, ctx);
        }
    }

    /** @private */
    _animR(ctx, percent) {
        let items = ctx.items;

        let symbolType = ctx.symbolType || 'circle';
        let symbolSize = ctx.symbolSize;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let x = item.x;
            let y = item.y;

            let r = Math.round((item.to - item.from) * percent + item.from);
            if (!isNaN(item.yFrom))
                y = item.yFrom + (y - item.yFrom) * percent;
            if (!isNaN(item.xFrom))
                x = item.xFrom + (x - item.xFrom) * percent;

            if (ctx.polarAxisCoords) {
                let point = this._toPolarCoord(ctx.polarAxisCoords, this._plotRect, x, y);
                x = point.x;
                y = point.y;
            }

            x = this.renderer._ptrnd(x);
            y = this.renderer._ptrnd(y);
            r = this.renderer._ptrnd(r);

            let elementRenderInfo = this._getRenderInfo(ctx.groupIndex, ctx.seriesIndex, items[i].itemIndex);
            let element = elementRenderInfo.element;
            let labelElement = elementRenderInfo.labelElement;

            if (symbolType === 'circle') {
                if (!element) {
                    element = this.renderer.circle(x, y, r);
                    this.renderer.attr(element, { fill: item.fill, 'fill-opacity': ctx['fill-opacity'], 'stroke-opacity': ctx['fill-opacity'], stroke: item.stroke, 'stroke-width': ctx['stroke-width'], 'stroke-dasharray': ctx['stroke-dasharray'] });
                }

                this.renderer.attr(element, { r: r, cy: y, cx: x });
            }
            else {
                if (element)
                    this.renderer.removeElement(element);

                element = this._drawSymbol(
                    symbolType,
                    x,
                    y,
                    item.fill,
                    ctx['fill-opacity'],
                    item.stroke,
                    ctx['stroke-opacity'] || ctx['fill-opacity'],
                    ctx['stroke-width-symbol'],
                    ctx['stroke-dasharray'],
                    symbolSize || r);
            }

            if (labelElement)
                this.renderer.removeElement(labelElement);

            labelElement = this._showLabel(ctx.groupIndex, ctx.seriesIndex, item.itemIndex, { x: x - r, y: y - r, width: 2 * r, height: 2 * r });

            if (percent >= 1)
                this._installHandlers(element, 'circle', ctx.groupIndex, ctx.seriesIndex, item.itemIndex);

            this._setRenderInfo(ctx.groupIndex, ctx.seriesIndex, items[i].itemIndex, { element: element, labelElement: labelElement });
        }
    }

    _showMultiSeriesToolTip(iidx) {
        let self = this;

        let content = '<div style=\'text-align:left\'>';

        let prevXAxisText = '';
        for (let gidx = 0; gidx < self.seriesGroups.length; gidx++) {
            if (self._isPieGroup(gidx))
                continue;

            let xAxis = self._getXAxis(gidx);
            let yAxis = self._getValueAxis(gidx);

            let group = self.seriesGroups[gidx];

            let xAxisSettings = this._getAxisSettings(xAxis);
            let xAxisFS = this._getFormatSettings(xAxisSettings, 'toolTipFormatSettings');
            let xAxisFF = xAxisSettings.toolTipFormatFunction;

            let xAxisValue = self._getDataValue(iidx, xAxis.dataField, gidx);
            if (xAxis.dataField === undefined || xAxis.dataField === null || xAxis.dataField === '')
                xAxisValue = iidx;
            if (xAxis.type === 'date')
                xAxisValue = self._castAsDate(xAxisValue, (xAxisFS ? xAxisFS.dateFormat : undefined) || xAxis.dateFormat);


            if (!xAxisFF && !xAxisFS && xAxis.type === 'date')
                xAxisFF = this._getDefaultDTFormatFn(xAxis.baseUnit || 'day');

            let xAxisDisplayText = (xAxis.displayText || xAxis.dataField || '');
            if (xAxisDisplayText !== '')
                xAxisDisplayText += ': ';

            let xAxisText = xAxisDisplayText + self._formatValue(xAxisValue, xAxisFS, xAxisFF, gidx, undefined, iidx);

            if (prevXAxisText !== xAxisText) {
                if (prevXAxisText !== '')
                    content += '<br />';
                content += xAxisText + '<br /><br />';
                prevXAxisText = xAxisText;
            }

            for (let sidx = 0; sidx < group.series.length; sidx++) {
                let serie = group.series[sidx];

                if (group.showToolTips === false || serie.showToolTips === false)
                    continue;

                if (!self._isSerieVisible(gidx, sidx))
                    continue;

                let valfs = self._get([
                    self._getFormatSettings(serie, 'toolTipFormatSettings'),
                    self._getFormatSettings(group, 'toolTipFormatSettings'),
                    self._getFormatSettings(yAxis, 'toolTipFormatSettings'),
                    self._getFormatSettings(self, 'toolTipFormatSettings')]);
                let valff = self._get([serie.toolTipFormatFunction, group.toolTipFormatFunction, yAxis.toolTipFormatFunction, self.toolTipFormatFunction]);

                let serieValueText = self._getFormattedValue(gidx, sidx, iidx, valfs, valff);

                let colors = self._getColors(gidx, sidx, iidx);

                content += '<span style="color:' + colors.lineColor + ';">' + serieValueText + '</span><br />\n';

            }
        }

        let cssToolTip = this._get([self.toolTipClass, 'lw-chart-tooltip-text']);
        let toolTipFill = this._get([self.toolTipBackground, self._getThemeColor('background')]);
        let toolTipStroke = this._get([self.toolTipLineColor, self._getThemeColor('line')]);
        let toolTipFillOpacity = this._get([self.toolTipOpacity, 1]);


        content += '</div>';

        let coord = this.getItemCoord(self._ttEl.gidx, self._ttEl.sidx, self._ttEl.iidx);

        coord.x += window.pageXOffset;
        coord.y += window.pageYOffset;

        self._createTooltip(coord, self.seriesGroups[self._ttEl.gidx], content, { css: cssToolTip, fill: toolTipFill, stroke: toolTipStroke, fillOpacity: toolTipFillOpacity, symbolSize: 3 });
    }

    /** @private */
    _showToolTip(x, y, gidx, sidx, iidx) {
        let self = this;
        let xAxis = self._getXAxis(gidx);
        let yAxis = self._getValueAxis(gidx);

        if (self._ttEl &&
            gidx === self._ttEl.gidx &&
            sidx === self._ttEl.sidx &&
            iidx === self._ttEl.iidx)
            return;

        let group = self.seriesGroups[gidx];
        let series = group.series[sidx];

        let enableCrosshairs = self.enableCrosshairs;

        if (self._pointMarker) {
            // make it relative to the marker instead of cursor
            x = parseInt(self._pointMarker.x + 5);
            y = parseInt(self._pointMarker.y - 5);
        }
        else {
            enableCrosshairs = false;
        }

        let isCrossHairsOnly = enableCrosshairs && self.showToolTips === false;

        x = this.renderer._ptrnd(x);
        y = this.renderer._ptrnd(y);

        if (group.showToolTips === false || series.showToolTips === false)
            return;

        if (!self._ttEl) {
            self._ttEl = {};
        }

        self._ttEl.sidx = sidx;
        self._ttEl.gidx = gidx;
        self._ttEl.iidx = iidx;

        let seriesCount = 0;
        for (let i = 0; i < self.seriesGroups.length; i++)
            for (let j = 0; j < self.seriesGroups[i].series.length; j++)
                seriesCount++;

        if (enableCrosshairs) {
            let _x = this.renderer._ptrnd(self._pointMarker.x);
            let _y = this.renderer._ptrnd(self._pointMarker.y);
            let color = self.crosshairsColor || self._getThemeColor('line');

            if (group.polar || group.spider) {
                let polarCoords = this._getPolarAxisCoords(gidx, this._plotRect);

                let dist = this.renderer._ptdist(_x, _y, polarCoords.x, polarCoords.y);
                if (dist > polarCoords.r)
                    return;

                let posAngle = Math.atan2(_y - polarCoords.y, _x - polarCoords.x);
                let x2 = Math.cos(posAngle) * polarCoords.r + polarCoords.x;
                let y2 = Math.sin(posAngle) * polarCoords.r + polarCoords.y;

                if (self._ttEl.vLine)
                    self.renderer.attr(self._ttEl.vLine, { x1: polarCoords.x, y1: polarCoords.y, x2: x2, y2: y2 });
                else
                    self._ttEl.vLine = self.renderer.line(polarCoords.x, polarCoords.y, x2, y2, { stroke: color, 'stroke-width': self.crosshairsLineWidth || 1.0, 'stroke-dasharray': self.crosshairsDashStyle || '' });
            }
            else {
                if (self._ttEl.vLine && self._ttEl.hLine) {
                    self.renderer.attr(self._ttEl.vLine, { x1: _x, x2: _x });
                    self.renderer.attr(self._ttEl.hLine, { y1: _y, y2: _y });
                }
                else {
                    self._ttEl.vLine = self.renderer.line(_x, self._plotRect.y, _x, self._plotRect.y + self._plotRect.height, { stroke: color, 'stroke-width': self.crosshairsLineWidth || 1.0, 'stroke-dasharray': self.crosshairsDashStyle || '' });
                    self._ttEl.hLine = self.renderer.line(self._plotRect.x, _y, self._plotRect.x + self._plotRect.width, _y, { stroke: color, 'stroke-width': self.crosshairsLineWidth || 1.0, 'stroke-dasharray': self.crosshairsDashStyle || '' });
                }
            }
        }
        if (self.showToolTipsOnAllSeries &&
            !self._isPieGroup(gidx) &&
            seriesCount > 1
        ) {
            self._showMultiSeriesToolTip(iidx);
            return;
        }

        let valfs = self._get([
            self._getFormatSettings(series, 'toolTipFormatSettings'),
            self._getFormatSettings(group, 'toolTipFormatSettings'),
            self._getFormatSettings(yAxis, 'toolTipFormatSettings'),
            self._getFormatSettings(self, 'toolTipFormatSettings')]);
        let valff = self._get([series.toolTipFormatFunction, group.toolTipFormatFunction, yAxis.toolTipFormatFunction, self.toolTipFormatFunction]);

        let colors = self._getColors(gidx, sidx, iidx);

        let xAxisValue = self._getDataValue(iidx, xAxis.dataField, gidx);
        if (xAxis.dataField === undefined || xAxis.dataField === null || xAxis.dataField === '')
            xAxisValue = iidx;
        if (xAxis.type === 'date')
            xAxisValue = self._castAsDate(xAxisValue, (valfs ? valfs.dateFormat : undefined) || xAxis.dateFormat);

        let text = '';

        if (typeof valff === 'function') {
            let value = {};
            let cnt = 0;
            for (let field in series)
                if (field.indexOf('dataField') === 0) {
                    value[field.substring(9, field.length).toLowerCase()] = self._getDataValue(iidx, series[field], gidx);
                    cnt++;
                }

            if (cnt === 0)
                value = self._getDataValue(iidx, undefined, gidx);
            else if (cnt === 1)
                value = value[''];

            text = valff(value, iidx, series, group, xAxisValue, xAxis);
        }
        else {
            text = self._getFormattedValue(gidx, sidx, iidx, valfs, valff);

            let xAxisSettings = this._getAxisSettings(xAxis);

            let catfs = self._getFormatSettings(xAxisSettings, 'toolTipFormatSettings');
            let catff = xAxisSettings.toolTipFormatFunction;

            if (!catff && !catfs && xAxis.type === 'date')
                catff = this._getDefaultDTFormatFn(xAxis.baseUnit || 'day');

            let categoryText = self._formatValue(xAxisValue, catfs, catff, gidx, sidx, iidx);

            if (!self._isPieGroup(gidx)) {
                let t = (xAxis.displayText || xAxis.dataField || '');
                if (t.length > 0)
                    text = t + ': ' + categoryText + '<br>' + text;
                else
                    text = categoryText + '<br>' + text;
            }
            else {
                xAxisValue = self._getDataValue(iidx, series.displayText || series.dataField, gidx);
                categoryText = self._formatValue(xAxisValue, catfs, catff, gidx, sidx, iidx);
                text = categoryText + ': ' + text;
            }
        }

        if (!isCrossHairsOnly && self.showToolTips !== false) {
            let cssToolTip = this._get([series.toolTipClass, group.toolTipClass, self.toolTipClass, 'lw-chart-tooltip-text']);
            let toolTipFill = this._get([series.toolTipBackground, group.toolTipBackground, self.toolTipBackground, self._getThemeColor('background')]);
            let toolTipStroke = this._get([series.toolTipLineColor, group.toolTipLineColor, self.toolTipLineColor, colors.lineColor, self._getThemeColor('line')]);
            let toolTipFillOpacity = this._get([series.toolTipOpacity, group.toolTipOpacity, self.toolTipOpacity, 1]);

            let coord = this.getItemCoord(gidx, sidx, iidx);

            coord.y = Math.min(Math.max(coord.y, this._plotRect.y), this._plotRect.y + this._plotRect.y + this._plotRect.height);

            let symbolSize = 0;

            if (self._pointMarker && self._pointMarker.element) {
                symbolSize = series.symbolSizeSelected;
                if (isNaN(symbolSize))
                    symbolSize = series.symbolSize;
                if (isNaN(symbolSize) || symbolSize > 50 || symbolSize < 0)
                    symbolSize = group.symbolSize;
                if (isNaN(symbolSize) || symbolSize > 50 || symbolSize < 0)
                    symbolSize = 8;
            }

            self._createTooltip(coord, group, text, { css: cssToolTip, fill: toolTipFill, stroke: toolTipStroke, fillOpacity: toolTipFillOpacity, symbolSize: symbolSize });
        }
    }

    _fitTooltip(bounds, elementRect, rect, group, symbolSize) {
        let fitOptions = {};

        let space = 2 + symbolSize / 2;
        let arrowSize = 7;

        //try fit left
        if (elementRect.x - rect.width - arrowSize - space > bounds.x &&
            elementRect.y + elementRect.height / 2 - rect.height / 2 > bounds.y &&
            elementRect.y + elementRect.height / 2 + rect.height / 2 < bounds.y + bounds.height) {

            fitOptions.left = {
                arrowLocation: 'right',
                x: elementRect.x - rect.width - arrowSize - space,
                y: elementRect.y + elementRect.height / 2 - rect.height / 2,
                width: rect.width + arrowSize,
                height: rect.height
            };
        }

        //try fit right
        if (elementRect.x + elementRect.width + rect.width + arrowSize + space < bounds.x + bounds.width &&
            elementRect.y + elementRect.height / 2 - rect.height / 2 > bounds.y &&
            elementRect.y + elementRect.height / 2 + rect.height / 2 < bounds.y + bounds.height) {

            fitOptions.right = {
                arrowLocation: 'left',
                x: elementRect.x + elementRect.width + space,
                y: elementRect.y + elementRect.height / 2 - rect.height / 2,
                width: rect.width + arrowSize,
                height: rect.height
            };
        }

        //try fit top
        if (elementRect.y - rect.height - space - arrowSize > bounds.y &&
            elementRect.x + elementRect.width / 2 - rect.width / 2 > bounds.x &&
            elementRect.x + elementRect.width / 2 + rect.width / 2 < bounds.x + bounds.width) {

            fitOptions.top = {
                arrowLocation: 'bottom',
                x: elementRect.x + elementRect.width / 2 - rect.width / 2,
                y: elementRect.y - rect.height - space - arrowSize,
                width: rect.width,
                height: rect.height + arrowSize
            };
        }

        //try fit bottom
        if (elementRect.y + elementRect.height + rect.height + arrowSize + space < bounds.y + bounds.height &&
            elementRect.x + elementRect.width / 2 - rect.width / 2 > bounds.x &&
            elementRect.x + elementRect.width / 2 + rect.width / 2 < bounds.x + bounds.width) {

            fitOptions.bottom = {
                arrowLocation: 'top',
                x: elementRect.x + elementRect.width / 2 - rect.width / 2,
                y: elementRect.y + elementRect.height + space,
                width: rect.width,
                height: rect.height + arrowSize
            };
        }

        if (elementRect.width > elementRect.height ||
            ((group.type.indexOf('stackedcolumn') !== -1 || group.type.indexOf('stackedwaterfall') !== -1) && group.orientation !== 'horizontal')

        ) {
            if (fitOptions.left)
                return fitOptions.left;
            if (fitOptions.right)
                return fitOptions.right;
        }
        else {
            if (fitOptions.top)
                return fitOptions.top
            if (fitOptions.bottom)
                return fitOptions.bottom
        }

        for (let i in fitOptions) {
            if (fitOptions[i])
                return fitOptions[i];
        }

        return { arrowLocation: '' }
    }

    /** @private */
    _createTooltip(position, group, content, style) {
        const self = this,
            groupType = group.type;

        // create tooltip elements
        let divToolTip = self._ttEl.box;

        if (!divToolTip) {
            divToolTip = self._ttEl.box = document.createElement('div');
            divToolTip.id = self.id + 'Tooltip';
            divToolTip.className = 'lw-chart-tooltip';
            divToolTip.setAttribute('animation', self.animation);
            divToolTip.setAttribute('theme', self.theme);
            divToolTip.setAttribute('role', 'tooltip');

            const arrowOuterDiv = document.createElement('div'),
                arrowInnerDiv = document.createElement('div'),
                contentDiv = document.createElement('div');

            arrowOuterDiv.className = 'lw-chart-tooltip-arrow-outer';
            arrowOuterDiv.setAttribute('role', 'presentation');
            arrowInnerDiv.className = 'lw-chart-tooltip-arrow-inner';
            arrowInnerDiv.setAttribute('role', 'presentation');
            contentDiv.className = 'lw-chart-tooltip-content';
            contentDiv.setAttribute('role', 'presentation');

            divToolTip.appendChild(contentDiv);
            divToolTip.appendChild(arrowOuterDiv);
            divToolTip.appendChild(arrowInnerDiv);

            if (self.getRootNode().host) {
                self.getShadowRootOrBody().appendChild(divToolTip);
            }
            else {
                document.body.appendChild(divToolTip);
            }

            if (self.hasAttribute('aria-owns')) {
                const attributeValue = self.getAttribute('aria-owns');

                self.setAttribute('aria-owns', attributeValue + ' ' + divToolTip.id);
            }
            else {
                self.setAttribute('aria-owns', divToolTip.id);
            }
        }

        if (!content || content.length === 0) {
            divToolTip.classList.add('lw-visibility-hidden');
            return;
        }

        self.rightToLeft ? divToolTip.setAttribute('right-to-left', '') : divToolTip.removeAttribute('right-to-left');

        divToolTip.classList.add('lw-visibility-hidden');

        const contentDiv = divToolTip.firstElementChild,
            arrowOuterDiv = divToolTip.children[1],
            arrowInnerDiv = divToolTip.children[2];

        arrowInnerDiv.style.opacity = arrowOuterDiv.style.opacity = style.fillOpacity;

        // set styles and content
        contentDiv.style.backgroundColor = style.fill;
        contentDiv.style.borderColor = style.stroke;
        contentDiv.style.opacity = style.fillOpacity;

        const html = '<span class="' + style.css + '" role="presentation">' + content + '</span>';

        contentDiv.innerHTML = html;

        const size = self._measureHtml(html);

        // calculate tooltip positioning and arrow location
        const rect = self._plotRect;

        if (size.width > rect.width || size.height > rect.height)
            return;

        let totalSize = { width: size.width, height: size.height };

        let arrowLocation = '';
        let arrowSize = 7;

        let isColumn = self._isColumnType(groupType);

        let x = Math.max(position.x, rect.x),
            y = Math.max(position.y, rect.y);

        if (groupType.indexOf('pie') !== -1 || groupType.indexOf('donut') !== -1) {
            let midAngle = (position.fromAngle + position.toAngle) / 2;
            midAngle = midAngle * (Math.PI / 180);

            let radius = (!isNaN(position.innerRadius) && position.innerRadius > 0) ? (position.innerRadius + position.outerRadius) / 2 : position.outerRadius * 0.75;

            x = position.x = position.center.x + Math.cos(midAngle) * radius;
            y = position.y = position.center.y - Math.sin(midAngle) * radius;
            position.width = position.height = 1;
        }
        else if (isColumn && (group.polar || group.spider)) {
            position.width = position.height = 1;
        }

        let ttFit = this._fitTooltip(this._plotRect, position, totalSize, group, style.symbolSize);
        if (ttFit.arrowLocation !== '') {
            arrowLocation = ttFit.arrowLocation;
            x = ttFit.x;
            y = ttFit.y;
            totalSize.width = ttFit.width;
            totalSize.height = ttFit.height;
        }

        if (arrowLocation === 'top' || arrowLocation === 'bottom') {
            totalSize.height += arrowSize;
            x -= arrowSize / 2;
            if (arrowLocation === 'bottom')
                y -= arrowSize;
        }
        else if (arrowLocation === 'left' || arrowLocation === 'right') {
            totalSize.width += arrowSize;
            y -= arrowSize / 2;
            if (arrowLocation === 'right')
                x -= arrowSize;
        }

        if (x + totalSize.width > rect.x + rect.width) {
            arrowLocation = '';
            x = rect.x + rect.width - totalSize.width;
        }

        if (y + totalSize.height > rect.y + rect.height) {
            arrowLocation = '';
            y = rect.y + rect.height - totalSize.height;
        }

        // set arrow and content position
        let arrowPosition = { x: 0, y: 0 }, contentPosition = { x: 0, y: 0 };
        contentDiv.style.width = size.width + 'px';
        contentDiv.style.height = size.height + 'px';

        arrowOuterDiv.style['margin-top'] = arrowOuterDiv.style['margin-left'] = 0;
        arrowInnerDiv.style['margin-top'] = arrowInnerDiv.style['margin-left'] = 0;
        contentDiv.style['margin-top'] = contentDiv.style['margin-left'] = 0;

        let arrowSizeSolid = arrowSize + 'px solid';
        let arrowSizeSolidTransparent = arrowSize + 'px solid transparent';

        switch (arrowLocation) {
            case 'left':
                arrowPosition = { x: 0, y: (size.height - arrowSize) / 2 };
                contentPosition = { x: arrowSize, y: 0 };
                contentDiv.style['margin-left'] = arrowSize + 'px';

                arrowOuterDiv.style['margin-left'] = 0 + 'px';
                arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                arrowOuterDiv.style['border-left'] = '';
                arrowOuterDiv.style['border-right'] = arrowSizeSolid + ' ' + style.stroke;
                arrowOuterDiv.style['border-top'] = arrowSizeSolidTransparent;
                arrowOuterDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                arrowInnerDiv.style['margin-left'] = 1 + 'px';
                arrowInnerDiv.style['margin-top'] = arrowPosition.y + 'px';
                arrowInnerDiv.style['border-left'] = '';
                arrowInnerDiv.style['border-right'] = arrowSizeSolid + ' ' + style.fill;
                arrowInnerDiv.style['border-top'] = arrowSizeSolidTransparent;
                arrowInnerDiv.style['border-bottom'] = arrowSizeSolidTransparent;
                break;
            case 'right':
                arrowPosition = { x: totalSize.width - arrowSize, y: (size.height - arrowSize) / 2 };
                contentPosition = { x: 0, y: 0 };

                arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';
                arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                arrowOuterDiv.style['border-left'] = arrowSizeSolid + ' ' + style.stroke;
                arrowOuterDiv.style['border-right'] = '';
                arrowOuterDiv.style['border-top'] = arrowSizeSolidTransparent;
                arrowOuterDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                arrowInnerDiv.style['margin-left'] = arrowPosition.x - 1 + 'px';
                arrowInnerDiv.style['margin-top'] = arrowPosition.y + 'px';

                arrowInnerDiv.style['border-left'] = arrowSizeSolid + ' ' + style.fill;
                arrowInnerDiv.style['border-right'] = '';
                arrowInnerDiv.style['border-top'] = arrowSizeSolidTransparent;
                arrowInnerDiv.style['border-bottom'] = arrowSizeSolidTransparent;

                break;
            case 'top':
                arrowPosition = { x: totalSize.width / 2 - arrowSize / 2, y: 0 };
                contentPosition = { x: 0, y: arrowSize };

                contentDiv.style['margin-top'] = contentPosition.y + 'px';
                arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';

                arrowOuterDiv.style['border-top'] = '';
                arrowOuterDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.stroke;
                arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                arrowInnerDiv.style['margin-top'] = 1 + 'px';
                arrowInnerDiv.style['border-top'] = '';
                arrowInnerDiv.style['border-bottom'] = arrowSizeSolid + ' ' + style.fill;
                arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;
                break;
            case 'bottom':
                arrowPosition = { x: totalSize.width / 2 - arrowSize / 2, y: totalSize.height - arrowSize };
                contentPosition = { x: 0, y: 0 }

                arrowOuterDiv.style['margin-left'] = arrowPosition.x + 'px';
                arrowOuterDiv.style['margin-top'] = arrowPosition.y + 'px';

                arrowOuterDiv.style['border-top'] = arrowSizeSolid + ' ' + style.stroke;
                arrowOuterDiv.style['border-bottom'] = '';
                arrowOuterDiv.style['border-left'] = arrowSizeSolidTransparent;
                arrowOuterDiv.style['border-right'] = arrowSizeSolidTransparent;

                arrowInnerDiv.style['margin-left'] = arrowPosition.x + 'px';
                arrowInnerDiv.style['margin-top'] = arrowPosition.y - 1 + 'px';
                arrowInnerDiv.style['border-top'] = arrowSizeSolid + ' ' + style.fill;
                arrowInnerDiv.style['border-bottom'] = '';
                arrowInnerDiv.style['border-left'] = arrowSizeSolidTransparent;
                arrowInnerDiv.style['border-right'] = arrowSizeSolidTransparent;

                break;
        }

        if (arrowLocation === '') {
            arrowOuterDiv.classList.add('lw-hidden');
            arrowInnerDiv.classList.add('lw-hidden');
        }
        else {
            arrowOuterDiv.classList.remove('lw-hidden');
            arrowInnerDiv.classList.remove('lw-hidden');
        }

        // update size
        divToolTip.style.width = totalSize.width + 'px';
        divToolTip.style.height = totalSize.height + 'px';

        const hostPosition = self.getBoundingClientRect();

        divToolTip.style.left = x + hostPosition.left + window.pageXOffset + 'px';
        divToolTip.style.top = y + hostPosition.top + window.pageYOffset + 'px';
        divToolTip.classList.remove('lw-visibility-hidden');
    }

    /** @private */
    _measureHtml(html) {
        const that = this;
        let measureDiv = that._measureDiv;

        if (!measureDiv) {
            that._measureDiv = measureDiv = document.createElement('div');
            measureDiv.className = 'lw-chart-tooltip';
            measureDiv.style.position = 'absolute';
            measureDiv.style.visibility = 'hidden';
            measureDiv.style.left = 0;
            measureDiv.style.top = 0;
            (that.shadowRoot || that).appendChild(measureDiv);
        }

        measureDiv.innerHTML = html;

        const sz = { width: measureDiv.offsetWidth + 2, height: measureDiv.offsetHeight + 2 };

        if (LW.Utilities.Core.Browser.Firefox) {
            sz.height += 3;
        }

        return sz;
    }

    /** @private */
    _hideToolTip() {
        if (!this._ttEl)
            return;

        if (this._ttEl.box) {
            this._ttEl.box.classList.add('lw-visibility-hidden');
        }

        this._hideCrosshairs();

        this._ttEl.gidx = undefined;
    }

    /** @private */
    _hideCrosshairs() {
        if (!this._ttEl)
            return;

        if (this._ttEl.vLine) {
            this.renderer.removeElement(this._ttEl.vLine);
            this._ttEl.vLine = undefined;
        }

        if (this._ttEl.hLine) {
            this.renderer.removeElement(this._ttEl.hLine);
            this._ttEl.hLine = undefined;
        }
    }

    _get(arr) {
        return this._draw.getByPriority(arr);
    }

    _getAxisSettings(axis) {
        if (!axis)
            return {};

        let self = this;

        // grid lines settings
        let gridLinesProperties = axis.gridLines || {};

        let gridLinesSettings = {
            visible: self._get([gridLinesProperties.visible, true]),
            color: self._get([gridLinesProperties.color, self._getThemeColor('line')]),
            unitInterval: gridLinesProperties.unitInterval,
            step: gridLinesProperties.step,
            dashStyle: gridLinesProperties.dashStyle,
            width: self._get([gridLinesProperties.lineWidth, 1]),
            offsets: [],
            alternatingBackgroundColor: axis.alternatingBackgroundColor,
            alternatingBackgroundColor2: axis.alternatingBackgroundColor2,
            alternatingBackgroundOpacity: axis.alternatingBackgroundOpacity
        };

        // tick marks settings
        let tickMarksProperties = axis.tickMarks || {};
        let tickMarksSettings =
            {
                visible: self._get([tickMarksProperties.visible, axis.showTickMarks, true]),
                color: self._get([tickMarksProperties.color, axis.tickMarksColor, self._getThemeColor('line')]),
                unitInterval: self._get([tickMarksProperties.unitInterval, tickMarksProperties.interval, axis.tickMarksInterval]),
                step: self._get([tickMarksProperties.step, axis.tickMarksStep]),
                dashStyle: self._get([tickMarksProperties.dashStyle, axis.tickMarksDashStyle]),
                width: self._get([tickMarksProperties.lineWidth, 1]),
                size: self._get([tickMarksProperties.size, 4]),
                offsets: []
            };

        // title settings
        let titleProperties = axis.title || {};

        let titleSettings =
            {
                visible: self._get([titleProperties.visible, true]),
                text: self._get([axis.description, titleProperties.text]),
                style: self._get([axis.descriptionClass, titleProperties['class'], 'lw-chart-axis-description']),
                halign: self._get([axis.horizontalDescriptionAlignment, titleProperties.horizontalAlignment, 'center']),
                valign: self._get([axis.verticalDescriptionAlignment, titleProperties.verticalAlignment, 'center']),
                angle: 0,
                rotationPoint: self._get([titleProperties.rotationPoint, 'centercenter']),
                offset: self._get([titleProperties.offset, { x: 0, y: 0 }])
            };

        let lineProperties = axis.line || {};
        let lineSettings =
            {
                visible: self._get([lineProperties.visible, true]),
                color: self._get([lineProperties.color, gridLinesSettings.color, self._getThemeColor('line')]),
                dashStyle: self._get([lineProperties.dashStyle, gridLinesSettings.dashStyle, '']),
                width: self._get([lineProperties.lineWidth, 1]),
                angle: self._get([lineProperties.angle, NaN])
            };

        let padding = axis.padding || {};

        padding = {
            left: padding.left || 0,
            right: padding.right || 0,
            top: padding.top || 0,
            bottom: padding.bottom || 0
        };

        let labelsSettings = this._getAxisLabelsSettings(axis);

        let result =
            {
                visible: this._get([axis.visible, true]),
                customDraw: this._get([axis.customDraw, false]),
                gridLines: gridLinesSettings,
                tickMarks: tickMarksSettings,
                line: lineSettings,
                title: titleSettings,
                labels: labelsSettings,
                padding: padding,
                toolTipFormatFunction: this._get([axis.toolTipFormatFunction, axis.formatFunction, labelsSettings.formatFunction]),
                toolTipFormatSettings: this._get([self._getFormatSettings(axis, 'toolTipFormatSettings'), self._getFormatSettings(axis), self._getFormatSettings(labelsSettings)])
            };

        return result;
    }

    _getAxisLabelsSettings(axis) {
        let self = this;

        let labels = axis.labels || {};

        let settings = {
            visible: self._get([axis.showLabels, labels.visible, true]),
            unitInterval: self._get([labels.unitInterval, labels.interval, axis.labelsInterval]),
            step: self._get([labels.step, axis.labelsStep]),
            angle: self._get([axis.textRotationAngle, labels.angle, 0]),
            style: self._get([axis['class'], labels['class'], 'lw-chart-axis-text']),
            halign: self._get([axis.horizontalTextAlignment, labels.horizontalAlignment, 'center']),
            valign: self._get([axis.verticalTextAlignment, labels.verticalAlignment, 'center']),
            textRotationPoint: self._get([axis.textRotationPoint, labels.rotationPoint, 'auto']),
            textOffset: self._get([axis.textOffset, labels.offset, { x: 0, y: 0 }]),
            autoRotate: self._get([axis.labelsAutoRotate, labels.autoRotate, false]),
            formatSettings: self._get([self._getFormatSettings(axis), self._getFormatSettings(labels), undefined]),
            formatFunction: self._get([axis.formatFunction, labels.formatFunction, undefined])
        };

        return settings;
    }

    _getLabelsSettings(gidx, sidx, iidx, options) {
        let g = this.seriesGroups[gidx];
        let s = g.series[sidx];
        let value = isNaN(iidx) ? undefined : this._getDataValue(iidx, s.dataField, gidx);

        let properties = options || [
            'Visible',
            'Offset',
            'Angle',
            'HorizontalAlignment',
            'VerticalAlignment',
            'Class',
            'BackgroundColor',
            'BorderColor',
            'BorderOpacity',
            'Padding',
            'Opacity',
            'BackgroundOpacity',
            'LinesAngles',
            'LinesEnabled',
            'AutoRotate',
            'Radius'
        ];

        let result = {};
        for (let i = 0; i < properties.length; i++) {
            let key = properties[i];
            let name = 'labels' + key;
            let altName = 'label' + key;
            let altName2 = key.substring(0, 1).toLowerCase() + key.substring(1);

            let propValue = undefined;
            if (g.labels && typeof (g.labels) === 'object')
                propValue = g.labels[altName2];

            if (s.labels && typeof (s.labels) === 'object' && s.labels[altName2] !== undefined && s.labels[altName2] !== null)
                propValue = s.labels[altName2];

            propValue = this._get([s[name], s[altName], propValue, g[name], g[altName]]);

            if (typeof propValue === 'function')
                result[altName2] = propValue(value, iidx, s, g);
            else
                result[altName2] = propValue;
        }

        result['class'] = result['class'] || 'lw-chart-label-text';

        result['visible'] = this._get([result['visible'], s.showLabels, g.showLabels, s.labels !== undefined && s.labels !== null ? true : undefined, g.labels !== undefined && g.labels !== null ? true : undefined]);

        let paddingValue = result['padding'] || 1;

        result['padding'] = {
            left: this._get([paddingValue.left, isNaN(paddingValue) ? 1 : paddingValue]),
            right: this._get([paddingValue.right, isNaN(paddingValue) ? 1 : paddingValue]),
            top: this._get([paddingValue.top, isNaN(paddingValue) ? 1 : paddingValue]),
            bottom: this._get([paddingValue.bottom, isNaN(paddingValue) ? 1 : paddingValue])
        }

        return result;
    }

    /** @private */
    _showLabel(gidx, sidx, iidx, rect, halign, valign, isMeasure, inverseHAlign, inverseVAlign, labelAngleOverride, renderedRect) {
        let sz = { width: 0, height: 0 }, szSave;

        if (isNaN(iidx))
            return;

        let settings = this._getLabelsSettings(gidx, sidx, iidx);

        if (!settings.visible)
            return isMeasure ? sz : undefined;

        if (rect.width < 0 || rect.height < 0)
            return isMeasure ? sz : undefined;

        let labelsAngle = settings.angle;
        if (!isNaN(labelAngleOverride))
            labelsAngle = labelAngleOverride;

        let offset = settings.offset || {};
        let labelOffset = { x: offset.x, y: offset.y };
        if (isNaN(labelOffset.x))
            labelOffset.x = 0;
        if (isNaN(labelOffset.y))
            labelOffset.y = 0;

        halign = halign || settings.horizontalAlignment || 'center';
        valign = valign || settings.verticalAlignment || 'center';

        let text = this._getFormattedValue(gidx, sidx, iidx, undefined, undefined, true);

        let w = rect.width;
        let h = rect.height;

        if (inverseHAlign === true && halign !== 'center')
            halign = halign === 'right' ? 'left' : 'right';

        if (inverseVAlign === true && valign !== 'center' && valign !== 'middle') {
            valign = valign === 'top' ? 'bottom' : 'top';
            labelOffset.y *= -1;
        }

        sz = this.renderer.measureText(text, labelsAngle, { 'class': settings['class'] });

        if (isMeasure)
            return sz;

        let x = 0, y = 0;

        if (w > 0) {
            if (halign === '' || halign === 'center')
                x += (w - sz.width) / 2;
            else if (halign === 'right')
                x += (w - sz.width);
        }

        if (h > 0) {
            if (valign === '' || valign === 'center')
                y += (h - sz.height) / 2;
            else if (valign === 'bottom')
                y += (h - sz.height);
        }

        x += rect.x + labelOffset.x;
        y += rect.y + labelOffset.y;

        let plotRect = this._plotRect;

        if (x <= plotRect.x)
            x = plotRect.x + 2;

        if (y <= plotRect.y)
            y = plotRect.y + 2;

        let labelSize = { width: Math.max(sz.width, 1), height: Math.max(sz.height, 1) };

        if (y + labelSize.height >= plotRect.y + plotRect.height)
            y = plotRect.y + plotRect.height - (szSave ? (labelSize.height + szSave.height) / 2 : labelSize.height) - 2;

        if (x + labelSize.width >= plotRect.x + plotRect.width)
            x = plotRect.x + plotRect.width - labelSize.width - 2;

        let renderGroup;

        let labelsBackground = settings.backgroundColor;
        let labelsBorder = settings.borderColor;

        let padding = settings.padding;
        if (labelsBackground || labelsBorder) {
            renderGroup = this.renderer.beginGroup();

            this.renderer.rect(
                x - padding.left,
                y - padding.top,
                sz.width + padding.left + padding.right,
                sz.height + padding.bottom + padding.bottom,
                {
                    fill: labelsBackground || 'transparent',
                    'fill-opacity': settings.backgroundOpacity || 1,
                    stroke: labelsBorder || 'transparent',
                    'stroke-opacity': settings.borderOpacity,
                    'stroke-width': 1
                }
            );
        }

        let elemLabel = this.renderer.text(text, x, y, sz.width, sz.height, labelsAngle, { 'class': settings['class'], opacity: settings.opacity || 1 }, false, 'center', 'center', undefined, arguments[11]);

        if (renderedRect) {
            // return the renderedRect
            renderedRect.x = x - padding.left;
            renderedRect.y = y - padding.top;
            renderedRect.width = sz.width + padding.left + padding.right;
            renderedRect.height = sz.height + padding.bottom + padding.bottom;
        }

        if (renderGroup)
            this.renderer.endGroup();

        return renderGroup || elemLabel;
    }

    /** @private */
    _getAnimProps(gidx, sidx) {
        let g = this.seriesGroups[gidx];
        let s = !isNaN(sidx) ? g.series[sidx] : undefined;

        let enabled = this.hasAnimation;

        if (g.animation)
            enabled = g.animation !== 'none';

        if (s && s.animation)
            enabled = s.animation !== 'none';

        let duration = this.animationDuration;
        if (isNaN(duration))
            duration = 1000;

        let gd = g.animationDuration;
        if (!isNaN(gd))
            duration = gd;

        if (s) {
            let sd = s.animationDuration;
            if (!isNaN(sd))
                duration = sd;
        }

        if (duration > 5000)
            duration = 1000;

        return { enabled: enabled, duration: duration };
    }

    _isColorTransition(groupIndex, s, renderData, current) {
        if (current - 1 < renderData.xoffsets.first)
            return false;

        let currentColor = this._getColors(groupIndex, s, current, this._getGroupGradientType(groupIndex));
        let prevColor = this._getColors(groupIndex, s, current - 1, this._getGroupGradientType(groupIndex));

        return (currentColor.fillColor !== prevColor.fillColor);
    }

    /** @private */
    _renderLineSeries(groupIndex, rect) {
        var group = this.seriesGroups[groupIndex];
        if (!group.series || group.series.length === 0)
            return;

        var isArea = group.type.indexOf('area') !== -1;
        var isStacked = group.type.indexOf('stacked') !== -1;
        var isStacked100 = isStacked && group.type.indexOf('100') !== -1;
        var isSpline = group.type.indexOf('spline') !== -1;
        var isStep = group.type.indexOf('step') !== -1;
        var isRange = group.type.indexOf('range') !== -1;
        var isPolar = group.polar === true || group.spider === true;
        if (isPolar)
            isStep = false;

        if (isStep && isSpline)
            return;

        var swapXY = group.orientation === 'horizontal';
        var flipCategory = this._getXAxis(groupIndex).flip === true;

        var gRect = rect;
        if (swapXY)
            gRect = { x: rect.y, y: rect.x, width: rect.height, height: rect.width };

        var renderData = this._calcGroupOffsets(groupIndex, gRect);

        if (!renderData || renderData.xoffsets.length === 0)
            return;

        if (!this._linesRenderInfo)
            this._linesRenderInfo = {};

        this._linesRenderInfo[groupIndex] = {};

        for (let sidx = group.series.length - 1; sidx >= 0; sidx--) {
            var serieSettings = this._getSerieSettings(groupIndex, sidx);

            var serieCtx = {
                groupIndex: groupIndex,
                rect: gRect,
                serieIndex: sidx,
                swapXY: swapXY,
                isArea: isArea,
                isSpline: isSpline,
                isRange: isRange,
                isPolar: isPolar,
                settings: serieSettings,
                segments: [],
                pointsLength: 0
            };

            var isVisible = this._isSerieVisible(groupIndex, sidx);
            if (!isVisible) {
                this._linesRenderInfo[groupIndex][sidx] = serieCtx;
                continue;
            }

            var serie = group.series[sidx];
            if (serie.customDraw)
                continue;

            var hasColorFunction = typeof serie.colorFunction === 'function';

            var curr = renderData.xoffsets.first;
            var last = curr;

            var color = this._getColors(groupIndex, sidx, NaN, this._getGroupGradientType(groupIndex));

            var continueOnCurr;
            do {
                var points = [];
                var rangeBasePoints = [];
                var pointsStart = [];

                var px = 0, py = 0;
                var xPrev = NaN;
                var yPrev = NaN;
                var pyStart = NaN;

                if (renderData.xoffsets.length < 1)
                    continue;

                var anim = this._getAnimProps(groupIndex, sidx);
                var duration = anim.enabled && !this._isToggleRefresh && renderData.xoffsets.length < 10000 && anim.duration;
                var first = curr;
                continueOnCurr = false;

                var ptSave = undefined;
                for (let i = curr; i <= renderData.xoffsets.last; i++) {
                    curr = i;

                    var x = renderData.xoffsets.data[i];
                    var xvalue = renderData.xoffsets.xvalues[i];

                    if (isNaN(x))
                        continue;

                    x = Math.max(x, 1);
                    px = x;

                    py = renderData.offsets[sidx][i].to;


                    if (!hasColorFunction && ptSave && this.enableSampling && this.renderer._ptdist(ptSave.x, ptSave.y, px, py) < 1)
                        continue;

                    ptSave = { x: px, y: py };


                    var pyFrom = renderData.offsets[sidx][i].from;
                    if (isNaN(py) || isNaN(pyFrom)) {
                        if (serie.emptyPointsDisplay === 'connect') {
                            continue;
                        }
                        else if (serie.emptyPointsDisplay === 'zero') {
                            if (isNaN(py))
                                py = renderData.baseOffset;
                            if (isNaN(pyFrom))
                                pyFrom = renderData.baseOffset;
                        }
                        else {
                            continueOnCurr = true;
                            break;
                        }
                    }

                    if (hasColorFunction && this._isColorTransition(groupIndex, sidx, renderData, curr)) {
                        if (points.length > 1) {
                            curr--;
                            break;
                        }
                    }

                    var elementRenderInfo = this._elementRenderInfo;
                    if (elementRenderInfo &&
                        elementRenderInfo.length > groupIndex &&
                        elementRenderInfo[groupIndex].series.length > sidx
                    ) {
                        var itemStartState = elementRenderInfo[groupIndex].series[sidx][xvalue];
                        var pyStart = this.renderer._ptrnd(itemStartState ? itemStartState.to : undefined);
                        var pxStart = this.renderer._ptrnd(gRect.x + (itemStartState ? itemStartState.xoffset : undefined));

                        pointsStart.push(swapXY ? { y: pxStart, x: pyStart, index: i } : { x: pxStart, y: pyStart, index: i });
                    }

                    last = i;

                    if (serieSettings.stroke < 2) {
                        if (py - gRect.y <= 1)
                            py = gRect.y + 1;
                        if (pyFrom - gRect.y <= 1)
                            pyFrom = gRect.y + 1;
                        if (gRect.y + gRect.height - py <= 1)
                            py = gRect.y + gRect.height - 1;
                        if (gRect.y + gRect.height - pyFrom <= 1)
                            pyFrom = gRect.y + gRect.height - 1;
                    }

                    if (!isArea && isStacked100) {
                        if (py <= gRect.y)
                            py = gRect.y + 1;
                        if (py >= gRect.y + gRect.height)
                            py = gRect.y + gRect.height - 1;

                        if (pyFrom <= gRect.y)
                            pyFrom = gRect.y + 1;
                        if (pyFrom >= gRect.y + gRect.height)
                            pyFrom = gRect.y + gRect.height - 1;
                    }

                    // TODO: validate condition
                    x = Math.max(x, 1);
                    px = x + gRect.x;

                    if (group.skipOverlappingPoints === true && !isNaN(xPrev) && Math.abs(xPrev - px) <= 1)
                        continue;

                    if (isStep && !isNaN(xPrev) && !isNaN(yPrev)) {
                        if (yPrev !== py)
                            points.push(swapXY ? { y: px, x: this.renderer._ptrnd(yPrev) } : { x: px, y: this.renderer._ptrnd(yPrev) });
                    }

                    points.push(swapXY ? { y: px, x: this.renderer._ptrnd(py), index: i } : { x: px, y: this.renderer._ptrnd(py), index: i });
                    rangeBasePoints.push(swapXY ? { y: px, x: this.renderer._ptrnd(pyFrom), index: i } : { x: px, y: this.renderer._ptrnd(pyFrom), index: i });

                    xPrev = px;
                    yPrev = py;
                    if (isNaN(pyStart))
                        pyStart = py;
                }

                if (points.length === 0) {
                    curr++;
                    continue;
                }

                var lastItemIndex = points[points.length - 1].index;
                if (hasColorFunction)
                    color = this._getColors(groupIndex, sidx, lastItemIndex, this._getGroupGradientType(groupIndex));

                var left = gRect.x + renderData.xoffsets.data[first];
                var right = gRect.x + renderData.xoffsets.data[last];

                if (isArea && group.alignEndPointsWithIntervals === true) {
                    if (left > gRect.x) {
                        left = gRect.x;
                    }
                    if (right < gRect.x + gRect.width)
                        right = gRect.x + gRect.width;

                    if (flipCategory) {
                        var tmp = left;
                        left = right;
                        right = tmp;
                    }
                }
                right = this.renderer._ptrnd(right);
                left = this.renderer._ptrnd(left);

                var yBase = renderData.baseOffset;
                pyStart = this.renderer._ptrnd(pyStart);

                var pyEnd = this.renderer._ptrnd(py) || yBase;

                if (isRange) {
                    points = points.concat(rangeBasePoints.reverse());
                }

                serieCtx.pointsLength += points.length;

                var segmentCtx = {
                    lastItemIndex: lastItemIndex,
                    colorSettings: color,
                    pointsArray: points,
                    pointsStart: pointsStart,
                    left: left,
                    right: right,
                    pyStart: pyStart,
                    pyEnd: pyEnd,
                    yBase: yBase,
                    labelElements: [],
                    symbolElements: []
                };

                serieCtx.segments.push(segmentCtx);
            }
            while (curr < renderData.xoffsets.first + renderData.xoffsets.length - 1 || continueOnCurr);

            this._linesRenderInfo[groupIndex][sidx] = serieCtx;
        } // for s

        var contexts = this._linesRenderInfo[groupIndex];
        var contextsArr = [];
        for (let i in contexts)
            contextsArr.push(contexts[i]);

        contextsArr = contextsArr.sort(function (a, b) {
            return a.serieIndex - b.serieIndex;
        });

        if (isArea && isStacked)
            contextsArr.reverse();

        for (let i = 0; i < contextsArr.length; i++) {
            var serieCtx = contextsArr[i];
            this._animateLine(serieCtx, duration === 0 ? 1 : 0);

            var self = this;
            this._enqueueAnimation(
                'series',
                undefined,
                undefined,
                duration,
                function (element, context, percent) {
                    self._animateLine(context, percent);
                },
                serieCtx);
        }

    }

    /** @private */
    _animateLine(serieCtx, percent) {
        let settings = serieCtx.settings;
        let groupIndex = serieCtx.groupIndex;
        let serieIndex = serieCtx.serieIndex;
        let group = this.seriesGroups[groupIndex];
        let serie = group.series[serieIndex];

        let symbol = this._getSymbol(groupIndex, serieIndex);
        let showLabels = this._getLabelsSettings(groupIndex, serieIndex, NaN, ['Visible']).visible;

        let isClosedPolar = true;
        if (serieCtx.isPolar) {
            if (!isNaN(group.endAngle) && Math.round(Math.abs((isNaN(group.startAngle) ? 0 : group.startAngle) - group.endAngle)) !== 360)
                isClosedPolar = false;
        }

        if (serie.endPointsConnect === false)
            isClosedPolar = false;

        let startPoint = 0;
        for (let iSegment = 0; iSegment < serieCtx.segments.length; iSegment++) {
            let ctx = serieCtx.segments[iSegment];
            let cmd = this._calculateLine(groupIndex, serieCtx.pointsLength, startPoint, ctx.pointsArray, ctx.pointsStart, ctx.yBase, percent, serieCtx.isArea, serieCtx.swapXY);
            startPoint += ctx.pointsArray.length;

            if (cmd === '')
                continue;

            let split = cmd.split(' ');
            //let  cnt = split.length;

            let lineCmd = cmd;
            if (lineCmd !== '')
                lineCmd = this._buildLineCmd(
                    cmd,
                    serieCtx.isRange,
                    ctx.left,
                    ctx.right,
                    ctx.pyStart,
                    ctx.pyEnd,
                    ctx.yBase,
                    serieCtx.isArea,
                    serieCtx.isPolar,
                    isClosedPolar,
                    serieCtx.isSpline,
                    serieCtx.swapXY
                );
            else
                lineCmd = 'M 0 0';

            let colorSettings = ctx.colorSettings;

            if (!ctx.pathElement) {
                ctx.pathElement = this.renderer.path(
                    lineCmd,
                    {
                        'stroke-width': settings.stroke,
                        'stroke': colorSettings.lineColor,
                        'stroke-opacity': settings.opacity,
                        'fill-opacity': settings.opacity,
                        'stroke-dasharray': settings.dashStyle,
                        fill: serieCtx.isArea ? colorSettings.fillColor : 'none'
                    });

                this._installHandlers(ctx.pathElement, 'path', groupIndex, serieIndex, ctx.lastItemIndex);
            }
            else {
                this.renderer.attr(ctx.pathElement, { 'd': lineCmd });
            }

            if (ctx.labelElements) {
                for (let i = 0; i < ctx.labelElements.length; i++)
                    this.renderer.removeElement(ctx.labelElements[i]);

                ctx.labelElements = [];
            }

            if (ctx.symbolElements) {
                for (let i = 0; i < ctx.symbolElements.length; i++)
                    this.renderer.removeElement(ctx.symbolElements[i]);

                ctx.symbolElements = [];
            }


            if (ctx.pointsArray.length === split.length) {
                if (symbol !== 'none' || showLabels) {
                    let symbolSize = serie.symbolSize;

                    let gRect = this._plotRect;

                    for (let i = 0; i < split.length; i++) {
                        let point = split[i].split(',');
                        point = { x: parseFloat(point[0]), y: parseFloat(point[1]) };

                        if (point.x < gRect.x || point.x > gRect.x + gRect.width ||
                            point.y < gRect.y || point.y > gRect.y + gRect.height)
                            continue;

                        if (symbol !== 'none') {
                            let itemColors = this._getColors(groupIndex, serieIndex, ctx.pointsArray[i].index, this._getGroupGradientType(groupIndex));
                            let symbolElement = this._drawSymbol(
                                symbol,
                                point.x,
                                point.y,
                                itemColors.fillColorSymbol,
                                settings.opacity,
                                itemColors.lineColorSymbol,
                                settings.opacity,
                                settings.strokeSymbol,
                                undefined,
                                symbolSize);

                            ctx.symbolElements.push(symbolElement);
                        }

                        if (showLabels) {
                            point = this._adjustLineLabelPosition(groupIndex, serieIndex, ctx.pointsArray[i].index, point);

                            if (point) {
                                let labelElement = this._showLabel(groupIndex, serieIndex, ctx.pointsArray[i].index, { x: point.x, y: point.y, width: 0, height: 0 });
                                ctx.labelElements.push(labelElement);
                            }
                        }
                    }
                }
            }


            if (percent === 1 && symbol !== 'none') {
                for (let i = 0; i < ctx.symbolElements.length; i++) {
                    if (isNaN(ctx.pointsArray[i].index))
                        continue;
                    this._installHandlers(ctx.symbolElements[i], 'symbol', groupIndex, serieIndex, ctx.pointsArray[i].index);
                }
            }
        } // iSegment
    }

    /** @private */
    _adjustLineLabelPosition(gidx, sidx, iidx, pt) {
        let labelSize = this._showLabel(gidx, sidx, iidx, { width: 0, height: 0 }, '', '', true);
        if (!labelSize)
            return;

        let ptAdj = { x: pt.x - labelSize.width / 2, y: 0 };

        ptAdj.y = pt.y - 1.5 * labelSize.height;

        return ptAdj;
    }

    /** @private */
    _calculateLine(groupIndex, seriePointsLength, startPoint, pointsArray, pointsStartArray, yBase, percent, isArea, swapXY) {
        let g = this.seriesGroups[groupIndex];

        let polarAxisCoords;
        if (g.polar === true || g.spider === true)
            polarAxisCoords = this._getPolarAxisCoords(groupIndex, this._plotRect);

        let cmd = '';

        let cnt = pointsArray.length;
        if (!isArea && pointsStartArray.length === 0) {
            let stop = seriePointsLength * percent;
            cnt = stop - startPoint;
        }

        for (let i = 0; i < cnt + 1 && i < pointsArray.length; i++) {
            if (i > 0)
                cmd += ' ';
            let y = pointsArray[i].y;
            let x = pointsArray[i].x;
            let baseY = !isArea ? y : yBase;
            let baseX = x;
            if (pointsStartArray && pointsStartArray.length > i) {
                baseY = pointsStartArray[i].y;
                baseX = pointsStartArray[i].x;
                if (isNaN(baseY) || isNaN(baseX)) {
                    baseY = y;
                    baseX = x;
                }
            }

            if (cnt <= pointsArray.length && i > 0 && i === cnt) {
                baseX = pointsArray[i - 1].x;
                baseY = pointsArray[i - 1].y;
            }

            if (swapXY) {
                x = this.renderer._ptrnd((x - baseY) * (isArea ? percent : 1) + baseY);
                y = this.renderer._ptrnd(y);
            }
            else {
                x = this.renderer._ptrnd((x - baseX) * percent + baseX);
                y = this.renderer._ptrnd((y - baseY) * percent + baseY);
            }

            if (polarAxisCoords) {
                let point = this._toPolarCoord(polarAxisCoords, this._plotRect, x, y);
                x = point.x;
                y = point.y;
            }

            cmd += x + ',' + y;

            //if (pointsArray.length === 1 && !isArea)
            //    cmd += ' ' + (x + 2) + ',' + (y + 2);
        }

        return cmd;
    }

    /** @private */
    _buildLineCmd(pointsArray, isRange, left, right, pyStart, pyEnd, yBase, isArea, isPolar, isClosedPolar, isSpline, swapXY) {
        let cmd = pointsArray;

        let ptBottomLeft = swapXY ? yBase + ',' + left : left + ',' + yBase;
        let ptBottomRight = swapXY ? yBase + ',' + right : right + ',' + yBase;

        if (isArea && !isPolar && !isRange) {
            cmd = ptBottomLeft + ' ' + pointsArray + ' ' + ptBottomRight;
        }

        if (isSpline)
            cmd = this._getBezierPoints(cmd);

        let split = cmd.split(' ');
        if (split.length === 0)
            return '';

        // handle single point case
        if (split.length === 1) {
            let points = split[0].split(',');
            return 'M ' + split[0] + ' L' + (parseFloat(points[0]) + 1) + ',' + (parseFloat(points[1]) + 1);
        }

        let firstPoint = split[0].replace('M', '');

        if (isArea && !isPolar) {
            if (!isRange) {
                cmd = 'M ' + ptBottomLeft + ' L ' + firstPoint + ' ' + cmd;
            }
            else {
                cmd = 'M ' + firstPoint + ' L ' + firstPoint + (isSpline ? '' : (' L ' + firstPoint + ' ')) + cmd;
            }
        }
        else {
            if (!isSpline)
                cmd = 'M ' + firstPoint + ' ' + 'L ' + firstPoint + ' ' + cmd;
        }

        if ((isPolar && isClosedPolar) || isRange)
            cmd += ' Z';

        return cmd;
    }

    /** @private */
    _getSerieSettings(groupIndex, seriesIndex) {
        let group = this.seriesGroups[groupIndex];
        let isArea = group.type.indexOf('area') !== -1;
        let isLine = group.type.indexOf('line') !== -1;

        let serie = group.series[seriesIndex];

        let dashStyle = serie.dashStyle || group.dashStyle || '';

        let opacity = serie.opacity || group.opacity;
        if (isNaN(opacity) || opacity < 0 || opacity > 1)
            opacity = 1;

        let stroke = serie.lineWidth;
        if (isNaN(stroke) && stroke !== 'auto')
            stroke = group.lineWidth;

        if (stroke === 'auto' || isNaN(stroke) || stroke < 0 || stroke > 15) {
            if (isArea)
                stroke = 2;
            else if (isLine)
                stroke = 3;
            else
                stroke = 1;
        }

        let strokeSymbol = serie.lineWidthSymbol;
        if (isNaN(strokeSymbol))
            strokeSymbol = 1;

        return { stroke: stroke, strokeSymbol: strokeSymbol, opacity: opacity, dashStyle: dashStyle };
    }

    /** @private */
    _getColors(gidx, sidx, iidx, gradientType, gradientStops) {
        let group = this.seriesGroups[gidx];
        let serie = group.series[sidx];

        let useGradient = this._get([serie.useGradientColors, group.useGradientColors, false]);

        let colors = this._getSeriesColors(gidx, sidx, iidx);

        //if (!colors.fillColor) {
        //    colors.fillColor = color;
        //    colors.fillColorSelected = this.renderer.adjustColor(color, 1.1);
        //    colors.fillColorAlt = this.renderer.adjustColor(color, 4.0);
        //    colors.fillColorAltSelected = this.renderer.adjustColor(color, 3.0);
        //    colors.lineColor = colors.symbolColor = this.renderer.adjustColor(color, 0.9);
        //    colors.lineColorSelected = colors.symbolColorSelected = this.renderer.adjustColor(color, 0.9);
        //}

        let stops2 = [[0, 1.4], [100, 1]];
        let stops4 = [[0, 1], [25, 1.1], [50, 1.4], [100, 1]];
        let stopsR = [[0, 1.3], [90, 1.2], [100, 1.0]];

        let stops = NaN;
        if (!isNaN(gradientStops)) {
            stops = gradientStops === 2 ? stops2 : stops4;
        }

        if (useGradient) {
            let copy = {};
            for (let i in colors)
                copy[i] = colors[i];

            colors = copy;

            if (gradientType === 'verticalLinearGradient' || gradientType === 'horizontalLinearGradient') {
                let stopsParam = gradientType === 'verticalLinearGradient' ? stops || stops2 : stops || stops4;
                let keys = ['fillColor', 'fillColorSelected', 'fillColorAlt', 'fillColorAltSelected'];
                for (let key in keys) {
                    let color = colors[keys[key]];
                    if (color)
                        colors[keys[key]] = this.renderer._toLinearGradient(color, gradientType === 'verticalLinearGradient', stopsParam);
                }
            }
            else if (gradientType === 'radialGradient') {
                let params;
                let stops = stops2;
                if ((group.type === 'pie' || group.type === 'donut' || group.polar) && iidx !== undefined && iidx !== null && this._renderData[gidx] && this._renderData[gidx].offsets[sidx]) {
                    params = this._renderData[gidx].offsets[sidx][iidx];
                    stops = stopsR;
                }

                colors.fillColor = this.renderer._toRadialGradient(colors.fillColor, stops, params);
                colors.fillColorSelected = this.renderer._toRadialGradient(colors.fillColorSelected, stops, params);
            }
        }

        return colors;
    }

    /** @private */
    _installHandlers(element, elementType, gidx, sidx, iidx) {
        if (!this.enableEvents)
            return false;

        var self = this;
        var g = this.seriesGroups[gidx];
        var s = this.seriesGroups[gidx].series[sidx];

        var isLineType = g.type.indexOf('line') !== -1 || g.type.indexOf('area') !== -1;

        if (!isLineType && !(g.enableSelection === false || s.enableSelection === false)) {
            this.renderer.addHandler(element, 'mousemove', function (e) {
                var selected = self._selected;
                if (selected && selected.isLineType && selected.linesUnselectMode === 'click' && !(selected.group === gidx && selected.series === sidx))
                    return;

                //e.preventDefault();

                //var x = e.pageX || e.clientX || e.screenX;
                //var y = e.pageY || e.clientY || e.screenY;

                //const pos = self.getBoundingClientRect();
                //x -= pos.left;
                //y -= pos.top;

                //if (self._mouseX === x && self._mouseY === y)
                //    return;

                if (self._ttEl) {
                    if (self._ttEl.gidx === gidx &&
                        self._ttEl.sidx === sidx &&
                        self._ttEl.iidx === iidx)
                        return;
                }

                self._startTooltipTimer(gidx, sidx, iidx);
            });
        }

        if (!(g.enableSelection === false || s.enableSelection === false)) {
            this.renderer.addHandler(element, 'mouseover', function () {
                //e.preventDefault();

                var selected = self._selected;
                if (selected && selected.isLineType && selected.linesUnselectMode === 'click' && !(selected.group === gidx && selected.series === sidx))
                    return;

                self._select(element, elementType, gidx, sidx, iidx, iidx);
            });
        }

        this.renderer.addHandler(element, 'click', function (e) {
            clearTimeout(self._hostClickTimer);

            self._lastClickTs = (new Date()).valueOf();

            if (isLineType && (elementType !== 'symbol' && elementType !== 'pointMarker'))
                return;

            if (self._isColumnType(g.type))
                self._unselect();

            if (isNaN(iidx))
                return;

            e.stopImmediatePropagation();
            self._raiseItemEvent('click', g, s, iidx);
        });
    }

    /** @private */
    _getHorizontalOffset(gidx, sidx, x, y) {
        let rect = this._plotRect;
        let dataLength = this._getDataLen(gidx);
        if (dataLength === 0)
            return { index: undefined, value: x };

        let renderData = this._calcGroupOffsets(gidx, this._plotRect);
        if (renderData.xoffsets.length === 0)
            return { index: undefined, value: undefined };

        let px = x;
        let py = y;

        let g = this.seriesGroups[gidx];

        let polarAxisCoords;
        if (g.polar || g.spider)
            polarAxisCoords = this._getPolarAxisCoords(gidx, rect);

        let minDist, idx, x1Selected, y1Selected;

        for (let i = renderData.xoffsets.first; i <= renderData.xoffsets.last; i++) {
            let x1 = renderData.xoffsets.data[i];
            let y1 = renderData.offsets[sidx][i].to;

            let dist = 0;

            if (polarAxisCoords) {
                let point = this._toPolarCoord(polarAxisCoords, rect, x1 + rect.x, y1);
                x1 = point.x;
                y1 = point.y;
                dist = this.renderer._ptdist(px, py, x1, y1);
            }
            else {
                if (g.orientation === 'horizontal') {
                    x1 += rect.y;
                    let tmp = y1;
                    y1 = x1;
                    x1 = tmp;
                    dist = this.renderer._ptdist(px, py, x1, y1);
                }
                else {
                    x1 += rect.x;
                    dist = Math.abs(px - x1);
                }
            }

            if (isNaN(minDist) || minDist > dist) {
                minDist = dist;
                idx = i;
                x1Selected = x1;
                y1Selected = y1;

            }
        }

        return { index: idx, value: renderData.xoffsets.data[idx], polarAxisCoords: polarAxisCoords, x: x1Selected, y: y1Selected };
    }

    /** @private */
    onmousemove(x, y) {
        if (this._mouseX === x && this._mouseY === y)
            return;

        this._mouseX = x;
        this._mouseY = y;

        if (!this._selected)
            return;

        let gidx = this._selected.group;
        let sidx = this._selected.series;
        let g = this.seriesGroups[gidx];
        let s = g.series[sidx];

        let rect = this._plotRect;
        if (this.renderer) {
            rect = this.renderer.getRect();
            rect.x += 5;
            rect.y += 5;
            rect.width -= 10;
            rect.height -= 10;
        }

        if (x < rect.x + window.scrollX || x > rect.x + rect.width + window.scrollX ||
            y < rect.y + window.scrollY || y > rect.y + rect.height + window.scrollY) {
            this._hideToolTip();
            this._unselect();
            return;
        }

        let inverse = g.orientation === 'horizontal';

        rect = this._plotRect;
        if (g.type.indexOf('line') !== -1 || g.type.indexOf('area') !== -1) {
            let offset = this._getHorizontalOffset(gidx, this._selected.series, x, y);
            let i = offset.index;
            if (i === undefined || i === null)
                return;

            if (this._selected.item !== i) {
                let segs = this._linesRenderInfo[gidx][sidx].segments;
                let segId = 0;

                while (i > segs[segId].lastItemIndex) {
                    segId++;
                    if (segId >= segs.length)
                        return;
                }


                let element = segs[segId].pathElement;
                let iidxBase = segs[segId].lastItemIndex;

                this._unselect(false);

                this._select(element, 'path', gidx, sidx, i, iidxBase);
            }
            //  else
            //      return;

            let symbolType = this._getSymbol(this._selected.group, this._selected.series);
            if (symbolType === 'none')
                symbolType = 'circle';

            let renderData = this._calcGroupOffsets(gidx, rect);
            let to = renderData.offsets[this._selected.series][i].to;

            let from = to;
            if (g.type.indexOf('range') !== -1) {
                from = renderData.offsets[this._selected.series][i].from;
            }

            let cmp = inverse ? x : y;
            if (!isNaN(from) && Math.abs(cmp - from) < Math.abs(cmp - to))
                y = from;
            else
                y = to;

            if (isNaN(y))
                return;

            x = offset.value;

            if (inverse) {
                let tmp = x;
                x = y;
                y = tmp + rect.y;
            }
            else {
                x += rect.x;
            }

            if (offset.polarAxisCoords) {
                x = offset.x;
                y = offset.y;
            }

            y = this.renderer._ptrnd(y);
            x = this.renderer._ptrnd(x);

            if (this._pointMarker && this._pointMarker.element) {
                this.renderer.removeElement(this._pointMarker.element);
                this._pointMarker.element = undefined;
            }

            if (isNaN(x) || isNaN(y)) {
                return;
            }

            let colors = this._getSeriesColors(gidx, sidx, i);
            let settings = this._getSerieSettings(gidx, sidx);

            let symbolSize = s.symbolSizeSelected;
            if (isNaN(symbolSize))
                symbolSize = s.symbolSize;
            if (isNaN(symbolSize) || symbolSize > 50 || symbolSize < 0)
                symbolSize = g.symbolSize;
            if (isNaN(symbolSize) || symbolSize > 50 || symbolSize < 0)
                symbolSize = 8;

            if (this.showToolTips || this.enableCrosshairs) {
                this._pointMarker = { type: symbolType, x: x, y: y, gidx: gidx, sidx: sidx, iidx: i };
                this._pointMarker.element = this._drawSymbol(
                    symbolType,
                    x,
                    y,
                    colors.fillColorSymbolSelected,
                    settings.opacity,
                    colors.lineColorSymbolSelected,
                    settings.opacity,
                    settings.strokeSymbol,
                    settings.dashStyle,
                    symbolSize);

                this._installHandlers(this._pointMarker.element, 'pointMarker', gidx, sidx, i);
            }

            this._startTooltipTimer(gidx, this._selected.series, i);
        }
    }

    /** @private */
    _drawSymbol(type, x, y, fillColor, fillOpacity, lineColor, lineOpacity, lineWidth, lineDashArray, size) {
        let element,
            sz = size || 6,
            sz2 = sz / 2,
            path;

        switch (type) {
            case 'none':
                return undefined;
            case 'circle':
                element = this.renderer.circle(x, y, sz / 2);
                break;
            case 'square':
                sz = sz - 1; sz2 = sz / 2;
                element = this.renderer.rect(x - sz2, y - sz2, sz, sz);
                break;
            case 'diamond':
                {
                    path = 'M ' + (x - sz2) + ',' + (y) + ' L' + (x) + ',' + (y - sz2) + ' L' + (x + sz2) + ',' + (y) + ' L' + (x) + ',' + (y + sz2) + ' Z';
                    element = this.renderer.path(path);
                } break;
            case 'triangle_up': case 'triangle':
                {
                    path = 'M ' + (x - sz2) + ',' + (y + sz2) + ' L ' + (x + sz2) + ',' + (y + sz2) + ' L ' + (x) + ',' + (y - sz2) + ' Z';
                    element = this.renderer.path(path);
                } break;
            case 'triangle_down':
                {
                    path = 'M ' + (x - sz2) + ',' + (y - sz2) + ' L ' + (x) + ',' + (y + sz2) + ' L ' + (x + sz2) + ',' + (y - sz2) + ' Z';
                    element = this.renderer.path(path);
                } break;
            case 'triangle_left':
                {
                    path = 'M ' + (x - sz2) + ',' + (y) + ' L ' + (x + sz2) + ',' + (y + sz2) + ' L ' + (x + sz2) + ',' + (y - sz2) + ' Z';
                    element = this.renderer.path(path);
                } break;
            case 'triangle_right':
                {
                    path = 'M ' + (x - sz2) + ',' + (y - sz2) + ' L ' + (x - sz2) + ',' + (y + sz2) + ' L ' + (x + sz2) + ',' + (y) + ' Z';
                    element = this.renderer.path(path);
                } break;
            default:
                element = this.renderer.circle(x, y, sz);
        }

        this.renderer.attr(element, { fill: fillColor, 'fill-opacity': fillOpacity, stroke: lineColor, 'stroke-width': lineWidth, 'stroke-opacity': lineOpacity, 'stroke-dasharray': lineDashArray || '' });

        // pass extra parameters required for HTML5 rendering
        if (type !== 'circle') {
            this.renderer.attr(element, { r: sz / 2 });
            if (type !== 'square')
                this.renderer.attr(element, { x: x, y: y });
        }

        return element;
    }

    /** @private */
    _getSymbol(groupIndex, seriesIndex) {
        let symbols = ['circle', 'square', 'diamond', 'triangle_up', 'triangle_down', 'triangle_left', 'triangle_right'];
        let g = this.seriesGroups[groupIndex];
        let s = g.series[seriesIndex];
        let symbolType;
        if (s.symbolType !== undefined && s.symbolType !== null)
            symbolType = s.symbolType;
        if (symbolType === undefined || symbolType === null)
            symbolType = g.symbolType;

        if (symbolType === 'default')
            return symbols[seriesIndex % symbols.length];
        else if (symbolType !== undefined && symbolType !== null)
            return symbolType;

        return 'none';
    }

    /** @private */
    _startTooltipTimer(gidx, sidx, iidx, x, y, showDelay, hideDelay) {
        this._cancelTooltipTimer();
        let self = this;
        let delay = this.toolTipShowDelay;
        if (isNaN(delay) || delay > 10000 || delay < 0)
            delay = 500;

        if (this._ttEl || (true === this.enableCrosshairs && false === this.showToolTips))
            delay = 0;

        if (!isNaN(showDelay))
            delay = showDelay;

        clearTimeout(this._tttimerHide);

        if (isNaN(x))
            x = self._mouseX;

        if (isNaN(y))
            y = self._mouseY - 3;

        if (delay === 0)
            self._showToolTip(x, y, gidx, sidx, iidx);

        this._tttimer = setTimeout(function () {
            if (delay !== 0)
                self._showToolTip(x, y, gidx, sidx, iidx);

            let toolTipHideDelay = self.toolTipHideDelay;
            if (!isNaN(hideDelay))
                toolTipHideDelay = hideDelay;

            if (isNaN(toolTipHideDelay))
                toolTipHideDelay = 4000;

            self._tttimerHide = setTimeout(function () {
                self._hideToolTip();
                self._unselect();
            }, toolTipHideDelay);
        }, delay);
    }

    /** @private */
    _cancelTooltipTimer() {
        clearTimeout(this._tttimer);
    }

    /** @private */
    _getGroupGradientType(gidx) {
        let g = this.seriesGroups[gidx];

        if (g.type.indexOf('area') !== -1)
            return g.orientation === 'horizontal' ? 'horizontalLinearGradient' : 'verticalLinearGradient';
        else if (this._isColumnType(g.type) || g.type.indexOf('candle') !== -1) {
            if (g.polar)
                return 'radialGradient';
            return g.orientation === 'horizontal' ? 'verticalLinearGradient' : 'horizontalLinearGradient';
        }
        else if (g.type.indexOf('scatter') !== -1 || g.type.indexOf('bubble') !== -1 || this._isPieGroup(gidx))
            return 'radialGradient';

        return undefined;
    }

    /** @private */
    _select(element, type, gidx, sidx, iidx, iidxBase) {
        if (this._selected) {
            if ((this._selected.item !== iidx ||
                this._selected.series !== sidx ||
                this._selected.group !== gidx)
            ) {
                this._unselect();
            }
            else {
                return;
            }
        }

        let g = this.seriesGroups[gidx];
        let s = g.series[sidx];

        if (g.enableSelection === false || s.enableSelection === false)
            return;

        let isLineType = g.type.indexOf('line') !== -1 && g.type.indexOf('area') === -1;

        this._selected = { element: element, type: type, group: gidx, series: sidx, item: iidx, iidxBase: iidxBase, isLineType: isLineType, linesUnselectMode: s.linesUnselectMode || g.linesUnselectMode };

        let colors = this._getColors(gidx, sidx, iidxBase || iidx, this._getGroupGradientType(gidx));
        let fillColor = colors.fillColorSelected;
        if (isLineType)
            fillColor = 'none';

        let settings = this._getSerieSettings(gidx, sidx);

        let lineColorSelected = (type === 'symbol') ? colors.lineColorSymbolSelected : colors.lineColorSelected;
        fillColor = (type === 'symbol') ? colors.fillColorSymbolSelected : fillColor;

        let lineWidth = (type === 'symbol') ? 1 : settings.stroke;

        if (type !== 'symbol' && this.renderer.getAttr(element, 'fill') === colors.fillColorAlt)
            fillColor = colors.fillColorAltSelected;

        this.renderer.attr(element, { 'stroke': lineColorSelected, fill: fillColor, 'stroke-width': lineWidth });

        if (g.type.indexOf('pie') !== -1 || g.type.indexOf('donut') !== -1) {
            this._applyPieSelect();
        }

        // raise mouseover event
        this._raiseItemEvent('mouseover', g, s, iidx);

        if (this._isTouchDevice) {
            this._startTooltipTimer(gidx, sidx, iidx);
        }
    }

    _applyPieSelect() {
        var self = this;

        self._createAnimationGroup('animPieSlice');

        var selected = this._selected;
        if (!selected)
            return;

        var coord = this.getItemCoord(selected.group, selected.series, selected.item);
        if (!coord)
            return;

        var element = this._getRenderInfo(selected.group, selected.series, selected.item);
        var ctx = { element: element, coord: coord };

        this._enqueueAnimation(
            'animPieSlice',
            undefined,
            undefined,
            300,
            function (element, ctx, percent) {
                var coord = ctx.coord;
                var radiusAdj = coord.selectedRadiusChange * percent;
                var cmd = self.renderer.pieSlicePath(coord.center.x, coord.center.y, coord.innerRadius === 0 ? 0 : (coord.innerRadius + radiusAdj), coord.outerRadius + radiusAdj, coord.fromAngle, coord.toAngle, coord.centerOffset);
                self.renderer.attr(ctx.element.element, { 'd': cmd });

                self._showPieLabel(selected.group, selected.series, selected.item, undefined, radiusAdj, ctx.element.colors.lineColor);
            },
            ctx);

        self._startAnimation('animPieSlice');
    }

    _applyPieUnselect() {
        this._stopAnimations();

        let selected = this._selected;
        if (!selected)
            return;

        let coord = this.getItemCoord(selected.group, selected.series, selected.item);
        if (!coord || !coord.center)
            return;

        let cmd = this.renderer.pieSlicePath(coord.center.x, coord.center.y, coord.innerRadius, coord.outerRadius, coord.fromAngle, coord.toAngle, coord.centerOffset);
        this.renderer.attr(selected.element, { 'd': cmd });
        this._showPieLabel(selected.group, selected.series, selected.item, undefined, 0, this._getRenderInfo(selected.group, selected.series, selected.item).colors.lineColor);
    }

    /** @private */
    _unselect() {
        let self = this;

        if (self._selected) {
            let gidx = self._selected.group;
            let sidx = self._selected.series;
            let iidx = self._selected.item;
            let iidxBase = self._selected.iidxBase;
            let type = self._selected.type;
            let g = self.seriesGroups[gidx];
            let s = g.series[sidx];

            let isLineType = g.type.indexOf('line') !== -1 && g.type.indexOf('area') === -1;

            let colors = self._getColors(gidx, sidx, iidxBase || iidx, self._getGroupGradientType(gidx));
            let fillColor = colors.fillColor;
            if (isLineType)
                fillColor = 'none';

            let settings = self._getSerieSettings(gidx, sidx);

            let lineColor = (type === 'symbol') ? colors.lineColorSymbol : colors.lineColor;
            fillColor = (type === 'symbol') ? colors.fillColorSymbol : fillColor;

            if (type !== 'symbol' && this.renderer.getAttr(self._selected.element, 'fill') === colors.fillColorAltSelected)
                fillColor = colors.fillColorAlt;

            let lineWidth = (type === 'symbol') ? 1 : settings.stroke;

            self.renderer.attr(self._selected.element, { 'stroke': lineColor, fill: fillColor, 'stroke-width': lineWidth });

            if (g.type.indexOf('pie') !== -1 || g.type.indexOf('donut') !== -1) {
                this._applyPieUnselect();
            }

            self._selected = undefined;

            if (!isNaN(iidx))
                self._raiseItemEvent('mouseout', g, s, iidx);
        }

        if (self._pointMarker) {
            if (self._pointMarker.element) {
                self.renderer.removeElement(self._pointMarker.element);
                self._pointMarker.element = undefined;
            }
            self._pointMarker = undefined;
            self._hideCrosshairs();
        }
    }

    /** @private */
    _raiseItemEvent(event, group, serie, index) {
        let fn = serie[event] || group[event];
        let gidx = 0;
        for (; gidx < this.seriesGroups.length; gidx++)
            if (this.seriesGroups[gidx] === group)
                break;
        if (gidx === this.seriesGroups.length)
            return;

        let args = { event: event, seriesGroup: group, serie: serie, elementIndex: index, elementValue: this._getDataValue(index, serie.dataField, gidx) };
        if (fn && typeof fn === 'function')
            fn(args);

        this.$.fireEvent(event, args);
    }

    /** @private */
    _calcInterval(min, max, countHint) {
        let diff = Math.abs(max - min);

        let approx = diff / countHint;

        let up = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100];
        let dw = [0.5, 0.25, 0.125, 0.1];

        let scale = 0.1;
        let arr = up;

        if (approx < 1) {
            arr = dw;
            scale = 10;
        }

        let idx = 0;

        do {
            idx = 0;
            if (approx >= 1)
                scale *= 10;
            else
                scale /= 10;

            for (let i = 1; i < arr.length; i++) {
                if (Math.abs(arr[idx] * scale - approx) > Math.abs(arr[i] * scale - approx))
                    idx = i;
                else
                    break;
            }
        }
        while (idx === arr.length - 1);

        return arr[idx] * scale;
    }

    //** @private */
    _renderDataClone() {
        if (!this._renderData || this._isToggleRefresh)
            return;

        let info = this._elementRenderInfo = [];

        if (this._isSelectorRefresh)
            return;

        for (let groupIndex = 0; groupIndex < this._renderData.length; groupIndex++) {
            //let  catField = this._getXAxis(groupIndex).dataField;

            while (info.length <= groupIndex)
                info.push({});

            let groupInfo = info[groupIndex];
            let data = this._renderData[groupIndex];
            if (!data.offsets)
                continue;

            if (data.valueAxis) {
                groupInfo.valueAxis = { itemOffsets: {} };
                for (let key in data.valueAxis.itemOffsets) {
                    groupInfo.valueAxis.itemOffsets[key] = data.valueAxis.itemOffsets[key];
                }
            }

            if (data.xAxis) {
                groupInfo.xAxis = { itemOffsets: {} };
                for (let key in data.xAxis.itemOffsets) {
                    groupInfo.xAxis.itemOffsets[key] = data.xAxis.itemOffsets[key];
                }
            }

            groupInfo.series = [];
            let series = groupInfo.series;

            let isPieSeries = this._isPieGroup(groupIndex);

            for (let s = 0; s < data.offsets.length; s++) {
                series.push({});
                for (let i = 0; i < data.offsets[s].length; i++)
                    if (!isPieSeries) {
                        series[s][data.xoffsets.xvalues[i]] = { value: data.offsets[s][i].value, /*valueFrom: data.offsets[s][i].valueFrom,*/valueRadius: data.offsets[s][i].valueRadius, xoffset: data.xoffsets.data[i], from: data.offsets[s][i].from, to: data.offsets[s][i].to };
                    }
                    else {
                        let item = data.offsets[s][i];
                        series[s][item.displayValue] = { value: item.value, x: item.x, y: item.y, fromAngle: item.fromAngle, toAngle: item.toAngle };
                    }
            }
        }
    }

    getPolarDataPointOffset(xValue, yValue, groupIndex) {
        let renderData = this._renderData[groupIndex];
        if (!renderData)
            return { x: NaN, y: NaN };

        let y = this.getValueAxisDataPointOffset(yValue, groupIndex);
        let x = this.getXAxisDataPointOffset(xValue, groupIndex);

        let pt = this._toPolarCoord(renderData.polarCoords, renderData.xAxis.rect, x, y);

        return { x: pt.x, y: pt.y };
    }

    /** @private */
    _getDataPointOffsetDiff(value1, value2, baseValue, logBase, scale, yzero, inverse) {
        let offset1 = this._getDataPointOffset(value1, baseValue, logBase, scale, yzero, inverse);
        let offset2 = this._getDataPointOffset(value2, baseValue, logBase, scale, yzero, inverse);

        return Math.abs(offset1 - offset2);
    }

    _getXAxisRenderData(groupIndex) {
        if (groupIndex >= this._renderData.length)
            return;

        let group = this.seriesGroups[groupIndex];

        let renderData = this._renderData[groupIndex].xAxis;
        if (!renderData)
            return;

        if (group.xAxis === undefined || group.xAxis === null) {
            // get common xAxis render data (it will be attached to the 1st group)
            for (let i = 0; i <= groupIndex; i++) {
                if (this.seriesGroups[i].xAxis === undefined || this.seriesGroups[i].xAxis === null) {
                    renderData = this._renderData[i].xAxis;
                    break;
                }
            }

        }

        return renderData;
    }

    getXAxisDataPointOffset(value, groupIndex) {
        let group = this.seriesGroups[groupIndex]

        if (isNaN(value))
            return NaN;

        const renderData = this._getXAxisRenderData(groupIndex);
        if (!renderData)
            return NaN;

        let stats = renderData.data.axisStats;

        let axisMin = stats.min.valueOf();
        let axisMax = stats.max.valueOf();

        let denom = axisMax - axisMin;
        if (denom === 0)
            denom = 1;

        if (value.valueOf() > axisMax || value.valueOf() < axisMin)
            return NaN;

        let axis = this._getXAxis(groupIndex);
        let sizeProp = group.orientation === 'horizontal' ? 'height' : 'width';
        let xProp = group.orientation === 'horizontal' ? 'y' : 'x';

        let percent = (value.valueOf() - axisMin) / denom;

        let size = renderData.rect[sizeProp] - renderData.data.padding.left - renderData.data.padding.right;

        if (group.polar || group.spider) {
            let polarCoords = this._renderData[groupIndex].polarCoords;

            if (polarCoords.isClosedCircle)
                size = renderData.data.axisSize;
        }

        return this._plotRect[xProp] + renderData.data.padding.left + size * (axis.flip ? (1 - percent) : percent);
    }


    getValueAxisDataPointOffset(value, groupIndex) {
        let valueAxis = this._getValueAxis(groupIndex);
        if (!valueAxis)
            return NaN;

        let renderData = this._renderData[groupIndex];
        if (!renderData)
            return NaN;

        let flip = valueAxis.flip === true;
        let logBase = renderData.logBase;
        let scale = renderData.scale;
        let baseValue = renderData.gbase;
        let yzero = renderData.baseOffset;

        return this._getDataPointOffset(value, baseValue, logBase, scale, yzero, flip);
    }

    /** @private */
    _getDataPointOffset(value, baseValue, logBase, scale, yzero, inverse) {
        let offset;

        if (isNaN(value))
            value = baseValue;

        if (!isNaN(logBase)) {
            offset = (this._draw.log(value, logBase) - this._draw.log(baseValue, logBase)) * scale;
        }
        else {
            offset = (value - baseValue) * scale;
        }

        if (inverse)
            offset = yzero + offset;
        else
            offset = yzero - offset;

        return offset;
    }

    /** @private */
    _calcGroupOffsets(groupIndex, rect) {
        let group = this.seriesGroups[groupIndex];

        while (this._renderData.length < groupIndex + 1)
            this._renderData.push({});

        if (this._renderData[groupIndex] !== null && this._renderData[groupIndex].offsets !== undefined)
            return this._renderData[groupIndex];

        if (this._isPieGroup(groupIndex)) {
            return this._calcPieSeriesGroupOffsets(groupIndex, rect);
        }

        let valueAxis = this._getValueAxis(groupIndex);

        if (!valueAxis || !group.series || group.series.length === 0)
            return this._renderData[groupIndex];

        let inverse = valueAxis.flip === true;
        let logAxis = valueAxis.logarithmicScale === true;
        let logBase = valueAxis.logarithmicScaleBase || 10;

        let out = [];

        let isStacked = group.type.indexOf('stacked') !== -1;
        let isStacked100 = isStacked && group.type.indexOf('100') !== -1;
        let isRange = group.type.indexOf('range') !== -1;
        let isColumn = this._isColumnType(group.type);
        let isWaterfall = group.type.indexOf('waterfall') !== -1;


        let dataLength = this._getDataLen(groupIndex);
        let gbase = group.baselineValue || valueAxis.baselineValue || 0;
        if (isStacked100)
            gbase = 0;

        let stat = this._stats.seriesGroups[groupIndex];
        if (!stat || !stat.isValid)
            return;

        let hasValuesOnBothSidesOfBase = stat.hasStackValueReversal;
        if (hasValuesOnBothSidesOfBase)
            gbase = 0;

        if (isWaterfall && isStacked)
            if (hasValuesOnBothSidesOfBase) // not supported
                return;
            else
                gbase = stat.base;

        if (gbase > stat.max)
            gbase = stat.max;
        if (gbase < stat.min)
            gbase = stat.min;

        let range = (isStacked100 || logAxis) ? stat.maxRange : stat.max - stat.min;

        let min = stat.min;
        let max = stat.max;

        let scale = rect.height / (logAxis ? stat.intervals : range);

        let yzero = 0;
        if (isStacked100) {
            if (min * max < 0) {
                range /= 2;
                yzero = -(range + gbase) * scale;
            }
            else {
                yzero = -gbase * scale;
            }
        }
        else
            yzero = -(gbase - min) * scale;

        if (inverse)
            yzero = rect.y - yzero;
        else
            yzero += rect.y + rect.height;

        let yPOffset = [];
        let yNOffset = [];
        let yOffsetError = [];

        let pIntervals;
        if (logAxis) {
            pIntervals = this._draw.log(max, logBase) - this._draw.log(gbase, logBase);
            if (isStacked) {
                // force base value @ min for stacked log series
                pIntervals = stat.intervals;
                gbase = isStacked100 ? 0 : min;
            }

            if (!inverse)
                yzero = rect.y + pIntervals / stat.intervals * rect.height;
        }

        yzero = this.renderer._ptrnd(yzero);

        let th = (min * max < 0) ? rect.height / 2 : rect.height;

        let logSums = [];

        let stackSums = [];
        let useOffsetBasedStackCalculation = isStacked && (isColumn || logAxis);

        let firstItemRendered = [];

        out = new Array(group.series.length);
        for (let j = 0; j < group.series.length; j++)
            out[j] = new Array(dataLength);

        for (let i = 0; i < dataLength; i++) {
            if (!isWaterfall && isStacked)
                stackSums = [];

            for (let j = 0; j < group.series.length; j++) {
                if (!isStacked && logAxis)
                    logSums = [];

                let serie = group.series[j];

                let dataField = serie.dataField;
                let dataFieldFrom = serie.dataFieldFrom;
                let dataFieldTo = serie.dataFieldTo;
                let dataFieldRadius = serie.radiusDataField || serie.sizeDataField;

                out[j][i] = {};

                let isVisible = this._isSerieVisible(groupIndex, j);

                if (group.type.indexOf('candle') !== -1 || group.type.indexOf('ohlc') !== -1) {
                    // handle financial series
                    let fields = ['Open', 'Close', 'High', 'Low'];
                    for (let f in fields) {
                        let field = 'dataField' + fields[f];
                        if (serie[field]) {
                            out[j][i][fields[f]] = this._getDataPointOffset(
                                this._getDataValueAsNumber(i, serie[field], groupIndex),
                                gbase,
                                logAxis ? logBase : NaN,
                                scale,
                                yzero,
                                inverse);
                        }
                    }

                    continue;
                }

                if (isStacked) {
                    while (stackSums.length <= i)
                        stackSums.push(0);
                }

                let valFrom = NaN;
                if (isRange) {
                    valFrom = this._getDataValueAsNumber(i, dataFieldFrom, groupIndex);
                    if (isNaN(valFrom))
                        valFrom = gbase;
                }

                let val = NaN;
                if (isRange)
                    val = this._getDataValueAsNumber(i, dataFieldTo, groupIndex);
                else
                    val = this._getDataValueAsNumber(i, dataField, groupIndex);

                let valR = this._getDataValueAsNumber(i, dataFieldRadius, groupIndex);
                if (isStacked)
                    stackSums[i] += isVisible ? val : 0;

                if (!isVisible)
                    val = NaN;

                if (isNaN(val) || (logAxis && val <= 0)) {
                    out[j][i] = { from: undefined, to: undefined };
                    continue;
                }

                let yOffset;

                if (isStacked) {
                    if (useOffsetBasedStackCalculation) {
                        yOffset = (val >= gbase) ? yPOffset : yNOffset;
                    }
                    else
                        val = stackSums[i];
                }

                let h = scale * (val - gbase);

                if (isRange)
                    h = scale * (val - valFrom);

                if (isStacked && useOffsetBasedStackCalculation) {
                    if (!firstItemRendered[i]) {
                        firstItemRendered[i] = true;
                        h = scale * (val - gbase);
                    }
                    else {
                        h = scale * val;
                    }
                }

                if (logAxis) {
                    while (logSums.length <= i)
                        logSums.push({ p: { value: 0, height: 0 }, n: { value: 0, height: 0 } });

                    let base = (isRange || isRange) ? valFrom : gbase;
                    let sums = val > base ? logSums[i].p : logSums[i].n;

                    sums.value += val;

                    if (isStacked100) {
                        val = sums.value / (stat.psums[i] + stat.nsums[i]) * 100;
                        h = (this._draw.log(val, logBase) - stat.minPow) * scale;
                    }
                    else {
                        h = this._draw.log(sums.value, logBase) - this._draw.log(base, logBase);

                        h *= scale;
                    }

                    h -= sums.height;
                    sums.height += h;
                }

                let y = yzero;
                if (isRange) {
                    let yDiff = 0;
                    if (logAxis)
                        yDiff = (this._draw.log(valFrom, logBase) - this._draw.log(gbase, logBase)) * scale;
                    else
                        yDiff = (valFrom - gbase) * scale;

                    y += inverse ? yDiff : -yDiff;
                }

                if (isStacked) {
                    if (isStacked100 && !logAxis) {
                        let irange = (stat.psums[i] - stat.nsums[i]);

                        if (val > gbase) {
                            h = (stat.psums[i] / irange) * th;
                            if (stat.psums[i] !== 0)
                                h *= val / stat.psums[i];
                        }
                        else {
                            h = (stat.nsums[i] / irange) * th;
                            if (stat.nsums[i] !== 0)
                                h *= val / stat.nsums[i];
                        }
                    }

                    if (useOffsetBasedStackCalculation) {
                        if (isNaN(yOffset[i]))
                            yOffset[i] = y;

                        y = yOffset[i];
                    }
                }

                if (isNaN(yOffsetError[i]))
                    yOffsetError[i] = 0;

                let err = yOffsetError[i];

                h = Math.abs(h);
                let hSave = h;
                if (h >= 1) {
                    const h_new = this.renderer._ptrnd(h) - 1;
                    if (Math.abs(h - h_new) > 0.5)
                        h = Math.round(h);
                    else
                        h = h_new;
                }

                err += h - hSave;

                if (!isStacked)
                    err = 0;

                if (Math.abs(err) > 0.5) {
                    if (err > 0) {
                        h -= 1;
                        err -= 1;
                    }
                    else {
                        h += 1;
                        err += 1;
                    }
                }

                yOffsetError[i] = err;

                // adjust the height to make sure it span the entire height
                // otherwise there will be a few pixels inaccuracy
                if (j === group.series.length - 1 && isStacked100) {
                    let sumH = 0;
                    for (let k = 0; k < j; k++)
                        sumH += Math.abs(out[k][i].to - out[k][i].from);
                    sumH += h;
                    if (sumH < th) {
                        if (h > 0.5)
                            h = this.renderer._ptrnd(h + th - sumH);
                        else {
                            let k = j - 1;
                            while (k >= 0) {
                                let diff = Math.abs(out[k][i].to - out[k][i].from);
                                if (diff > 1) {
                                    if (out[k][i].from > out[k][i].to) {
                                        out[k][i].from += th - sumH;
                                    }
                                    break;
                                }
                                k--;
                            }
                        }
                    }
                }

                if (inverse)
                    h *= -1;

                let drawOpositeDirection = val < gbase;
                if (isRange)
                    drawOpositeDirection = valFrom > val;

                let outVal = isNaN(valFrom) ? val : { from: valFrom, to: val };
                if (drawOpositeDirection) {
                    if (useOffsetBasedStackCalculation)
                        yOffset[i] += h;
                    out[j][i] = { from: y, to: y + h, value: outVal, valueRadius: valR };
                }
                else {
                    if (useOffsetBasedStackCalculation)
                        yOffset[i] -= h;
                    out[j][i] = { from: y, to: y - h, value: outVal, valueRadius: valR };
                }

            } // for j
        } // for i

        let renderData = this._renderData[groupIndex];
        renderData.baseOffset = yzero;
        renderData.gbase = gbase;
        renderData.logBase = logAxis ? logBase : NaN;
        renderData.scale = scale;
        renderData.offsets = !isWaterfall ? out : this._applyWaterfall(out, dataLength, groupIndex, yzero, gbase, logAxis ? logBase : NaN, scale, inverse, isStacked);

        renderData.xoffsets = this._calculateXOffsets(groupIndex, rect.width);

        return this._renderData[groupIndex];
    }

    _isPercent(value) {
        return (typeof (value) === 'string' && value.length > 0 && value.indexOf('%') === value.length - 1);
    }

    /** @private */
    _calcPieSeriesGroupOffsets(groupIndex, rect) {
        var self = this;
        var dataLength = this._getDataLen(groupIndex);
        var group = this.seriesGroups[groupIndex];

        var renderData = this._renderData[groupIndex] = {};
        var out = renderData.offsets = [];

        for (let sidx = 0; sidx < group.series.length; sidx++) {
            var s = group.series[sidx];
            var minAngle = this._get([s.minAngle, s.startAngle]);
            if (isNaN(minAngle) || minAngle < 0 || minAngle > 360)
                minAngle = 0;
            var maxAngle = this._get([s.maxAngle, s.endAngle]);
            if (isNaN(maxAngle) || maxAngle < 0 || maxAngle > 360)
                maxAngle = 360;

            var angleRange = maxAngle - minAngle;

            var initialAngle = s.initialAngle || 0;
            if (initialAngle < minAngle)
                initialAngle = minAngle;
            if (initialAngle > maxAngle)
                initialAngle = maxAngle;

            var centerOffset = s.centerOffset || 0;
            var offsetX = this._draw.getNum([s.offsetX, group.offsetX, rect.width / 2]);
            var offsetY = this._draw.getNum([s.offsetY, group.offsetY, rect.height / 2]);

            var availableSize = Math.min(rect.width, rect.height) / 2;

            var currentAngle = initialAngle;

            // outer radius
            var radius = s.radius;

            if (self._isPercent(radius))
                radius = parseFloat(radius) / 100 * availableSize;

            if (isNaN(radius))
                radius = availableSize * 0.4;

            // inner radius
            var innerRadius = s.innerRadius;
            if (self._isPercent(innerRadius))
                innerRadius = parseFloat(innerRadius) / 100 * availableSize;

            if (isNaN(innerRadius) || innerRadius >= radius)
                innerRadius = 0;

            // selected radius
            var selectedRadiusChange = s.selectedRadiusChange;
            if (self._isPercent(selectedRadiusChange))
                selectedRadiusChange = parseFloat(selectedRadiusChange) / 100 * (radius - innerRadius);

            if (isNaN(selectedRadiusChange))
                selectedRadiusChange = 0.1 * (radius - innerRadius);


            out.push([]);

            // compute the sum
            var sumP = 0;
            var sumN = 0;
            for (let i = 0; i < dataLength; i++) {
                var val = this._getDataValueAsNumber(i, s.dataField, groupIndex);
                if (isNaN(val))
                    continue;

                if (!this._isSerieVisible(groupIndex, sidx, i) && s.hiddenPointsDisplay !== true)
                    continue;

                if (val > 0)
                    sumP += val;
                else
                    sumN += val;
            }

            var range = sumP - sumN;
            if (range === 0)
                range = 1;

            // render
            for (let i = 0; i < dataLength; i++) {
                var val = this._getDataValueAsNumber(i, s.dataField, groupIndex);
                if (isNaN(val)) {
                    out[sidx].push({});
                    continue;
                }

                var displayField = s.displayText || s.displayField;
                var displayValue = this._getDataValue(i, displayField, groupIndex);
                if (displayValue === undefined || displayValue === null)
                    displayValue = i;

                var angle = 0;

                var isVisible = this._isSerieVisible(groupIndex, sidx, i);
                if (isVisible || s.hiddenPointsDisplay === true) {
                    angle = Math.abs(val) / range * angleRange;
                }

                var x = rect.x + offsetX;
                var y = rect.y + offsetY;

                var centerOffsetValue = centerOffset;
                if (typeof centerOffset === 'function') {
                    centerOffsetValue = centerOffset({ seriesIndex: sidx, seriesGroupIndex: groupIndex, itemIndex: i });
                }
                if (isNaN(centerOffsetValue))
                    centerOffsetValue = 0;

                var sliceRenderData = { key: groupIndex + '_' + sidx + '_' + i, value: val, displayValue: displayValue, x: x, y: y, fromAngle: currentAngle, toAngle: currentAngle + angle, centerOffset: centerOffsetValue, innerRadius: innerRadius, outerRadius: radius, selectedRadiusChange: selectedRadiusChange, visible: isVisible };
                out[sidx].push(sliceRenderData);

                currentAngle += angle;
            }
        }

        return renderData;
    }

    /** @private */
    _isPointSeriesOnly() {
        for (let i = 0; i < this.seriesGroups.length; i++) {
            let g = this.seriesGroups[i];
            if (g.type.indexOf('line') === -1 && g.type.indexOf('area') === -1 && g.type.indexOf('scatter') === -1 && g.type.indexOf('bubble') === -1)
                return false;
        }

        return true;
    }

    /** @private */
    _hasColumnSeries() {
        let types = ['column', 'ohlc', 'candlestick', 'waterfall'];
        for (let i = 0; i < this.seriesGroups.length; i++) {
            let g = this.seriesGroups[i];
            for (let j in types)
                if (g.type.indexOf(types[j]) !== -1)
                    return true;
        }

        return false;
    }

    /** @private */
    _alignValuesWithTicks(groupIndex) {
        let psonly = this._isPointSeriesOnly();

        let g = this.seriesGroups[groupIndex];

        // if xAxis
        let xAxis = this._getXAxis(groupIndex);
        let xAxisValuesOnTicks = xAxis.valuesOnTicks === undefined || xAxis.valuesOnTicks === null ? psonly : xAxis.valuesOnTicks !== false;
        if (xAxis.logarithmicScale)
            xAxisValuesOnTicks = true;

        if (groupIndex === undefined || groupIndex === null)
            return xAxisValuesOnTicks;

        if (g.valuesOnTicks === undefined || g.valuesOnTicks === null)
            return xAxisValuesOnTicks;

        return g.valuesOnTicks;
    }

    _getYearsDiff(from, to) {
        return to.getFullYear() - from.getFullYear();
    }

    _getMonthsDiff(from, to) {
        return 12 * (to.getFullYear() - from.getFullYear()) + to.getMonth() - from.getMonth();
    }

    _getDateDiff(from, to, baseUnit, round) {
        let diff = 0;
        if (baseUnit !== 'year' && baseUnit !== 'month')
            diff = to.valueOf() - from.valueOf();

        switch (baseUnit) {
            case 'year':
                diff = this._getYearsDiff(from, to);
                break;
            case 'month':
                diff = this._getMonthsDiff(from, to);
                break;
            case 'day':
                diff /= (24 * 3600 * 1000);
                break;
            case 'hour':
                diff /= (3600 * 1000);
                break;
            case 'minute':
                diff /= (60 * 1000);
                break;
            case 'second':
                diff /= (1000);
                break;
            case 'millisecond':
                break;
        }

        if (baseUnit !== 'year' && baseUnit !== 'month' && round !== false)
            diff = this.renderer._rnd(diff, 1, true);

        return diff;
    }

    _getBestDTUnit(min, max, groupIndex, axisSize, targetItemWidth) {
        let dateTimeUnit = 'day';

        let range = max.valueOf() - min.valueOf();
        if (range < 1000)
            dateTimeUnit = 'second';
        else if (range < 3600000)
            dateTimeUnit = 'minute';
        else if (range < 86400000)
            dateTimeUnit = 'hour';
        else if (range < 2592000000)
            dateTimeUnit = 'day';
        else if (range < 31104000000)
            dateTimeUnit = 'month';
        else
            dateTimeUnit = 'year';

        let units = [
            { key: 'year', cnt: range / (1000 * 60 * 60 * 24 * 365) },
            { key: 'month', cnt: range / (1000 * 60 * 60 * 24 * 30) },
            { key: 'day', cnt: range / (1000 * 60 * 60 * 24) },
            { key: 'hour', cnt: range / (1000 * 60 * 60) },
            { key: 'minute', cnt: range / (1000 * 60) },
            { key: 'second', cnt: range / 1000 },
            { key: 'millisecond', cnt: range }
        ];

        let i = -1;
        for (let j = 0; j < units.length; j++)
            if (units[j].key === dateTimeUnit) {
                i = j;
                break;
            }

        let bestCnt = -1, bestIndex = -1;
        for (; i < units.length; i++) {
            if (units[i].cnt / 100 > axisSize)
                break;
            let interval = this._estAxisInterval(min, max, groupIndex, axisSize, units[i].key, targetItemWidth);
            let cnt = this._getDTIntCnt(min, max, interval, units[i].key);
            if (bestCnt === -1 || bestCnt < cnt) {
                bestCnt = cnt;
                bestIndex = i;
            }
        }

        dateTimeUnit = units[bestIndex].key;

        return dateTimeUnit;
    }

    /** @private */
    _getXAxisStats(groupIndex, xAxis, axisSize) {
        let dataLength = this._getDataLen(groupIndex);
        let isDateTime = xAxis.type === 'date' || xAxis.type === 'time';

        if (isDateTime && !this._autoDateFormats) {
            if (!this._autoDateFormats)
                this._autoDateFormats = [];

            let detectedFormat = this._testXAxisDateFormat();
            if (detectedFormat)
                this._autoDateFormats.push(detectedFormat);
        }

        let axisMin = isDateTime ? this._castAsDate(xAxis.minValue, xAxis.dateFormat) : this._castAsNumber(xAxis.minValue);
        let axisMax = isDateTime ? this._castAsDate(xAxis.maxValue, xAxis.dateFormat) : this._castAsNumber(xAxis.maxValue);

        if (this._selectorRange && this._selectorRange[groupIndex]) {
            let rangeMin = this._selectorRange[groupIndex].min;
            if (!isNaN(rangeMin))
                axisMin = isDateTime ? this._castAsDate(rangeMin, xAxis.dateFormat) : this._castAsNumber(rangeMin);

            let rangeMax = this._selectorRange[groupIndex].max;
            if (!isNaN(rangeMax))
                axisMax = isDateTime ? this._castAsDate(rangeMax, xAxis.dateFormat) : this._castAsNumber(rangeMax);
        }

        let min = axisMin, max = axisMax;

        let minDS, maxDS;

        let autoDetect = xAxis.type === undefined || xAxis.type === null || xAxis.type === 'auto';

        let useIndeces = (autoDetect || xAxis.type === 'basic');

        let cntDateTime = 0, cntNumber = 0;
        for (let i = 0; i < dataLength && xAxis.dataField; i++) {
            let value = this._getDataValue(i, xAxis.dataField, groupIndex);
            value = isDateTime ? this._castAsDate(value, xAxis.dateFormat) : this._castAsNumber(value);

            if (isNaN(value))
                continue;

            if (isDateTime)
                cntDateTime++;
            else
                cntNumber++;

            if (isNaN(minDS) || value < minDS)
                minDS = value;

            if (isNaN(maxDS) || value >= maxDS)
                maxDS = value;
        }

        if (autoDetect &&
            ((!isDateTime && cntNumber === dataLength) || (isDateTime && cntDateTime === dataLength))
        ) {
            useIndeces = false;
        }

        if (useIndeces) {
            minDS = 0;
            maxDS = Math.max(0, dataLength - 1);
        }

        // use the data source min/max if not set
        if (isNaN(min))
            min = minDS;
        if (isNaN(max))
            max = maxDS;

        // convert to date
        if (isDateTime) {
            if (!this._isDate(min))
                min = this._isDate(max) ? max : new Date();

            if (!this._isDate(max))
                max = this._isDate(min) ? min : new Date();
        }
        else {
            if (isNaN(min))
                min = 0;

            if (isNaN(max))
                max = useIndeces ? Math.max(0, dataLength - 1) : min;
        }

        if (minDS === undefined || minDS === null)
            minDS = min;

        if (maxDS === undefined || maxDS === null)
            maxDS = max;

        // ensure min/max ranges are within the selector ranges
        let rangeSelector = xAxis.rangeSelector && xAxis.rangeSelector.visible;
        if (rangeSelector) {
            let selectorMin = rangeSelector.minValue || min;
            if (selectorMin && isDateTime)
                selectorMin = this._castAsDate(selectorMin, rangeSelector.dateFormat || xAxis.dateFormat);

            let selectorMax = rangeSelector.maxValue || max;
            if (selectorMax && isDateTime)
                selectorMax = this._castAsDate(selectorMax, rangeSelector.dateFormat || xAxis.rangeSelector);

            if (min < selectorMin)
                min = selectorMin;

            if (max < selectorMin)
                max = selectorMax;

            if (min > selectorMax)
                min = selectorMin;

            if (max > selectorMax)
                max = selectorMax;
        }

        let dateTimeUnit, isTimeUnit;

        if (isDateTime) {
            dateTimeUnit = xAxis.baseUnit;
            if (!dateTimeUnit) {
                dateTimeUnit = this._getBestDTUnit(min, max, groupIndex, axisSize);
            }

            isTimeUnit = dateTimeUnit === 'hour' || dateTimeUnit === 'minute' || dateTimeUnit === 'second' || dateTimeUnit === 'millisecond';
        }

        let isLogAxis = xAxis.logarithmicScale === true;
        let logBase = xAxis.logarithmicScaleBase;
        if (isNaN(logBase) || logBase <= 1)
            logBase = 10;

        let interval = xAxis.unitInterval;
        if (isLogAxis)
            interval = 1;
        else if (isNaN(interval) || interval <= 0)
            interval = this._estAxisInterval(min, max, groupIndex, axisSize, dateTimeUnit);

        let filterRange = { min: min, max: max };

        let group = this.seriesGroups[groupIndex],
            minPow, maxPow;

        if (isLogAxis) {
            if (!min) {
                min = 1;
                if (max && min > max)
                    min = max;
            }
            if (!max) {
                max = min;
            }

            filterRange = { min: min, max: max };

            minPow = this.renderer._rnd(this._draw.log(min, logBase), 1, false);
            maxPow = this.renderer._rnd(this._draw.log(max, logBase), 1, true);

            max = Math.pow(logBase, maxPow);
            min = Math.pow(logBase, minPow);
        }
        else if (!isDateTime && (group.polar || group.spider)) { // TODO: evaluate applying to all series
            min = this.renderer._rnd(min, interval, false);
            max = this.renderer._rnd(max, interval, true);
        }

        return { min: min, max: max, logAxis: { enabled: isLogAxis, base: logBase, minPow: minPow, maxPow: maxPow }, dsRange: { min: minDS, max: maxDS }, filterRange: filterRange, useIndeces: useIndeces, isDateTime: isDateTime, isTimeUnit: isTimeUnit, dateTimeUnit: dateTimeUnit, interval: interval };
    }

    /** @private */
    _getDefaultDTFormatFn(dateTimeUnit) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let fn;
        if (dateTimeUnit === 'year' || dateTimeUnit === 'month' || dateTimeUnit === 'day') {
            fn = function (value) {
                return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
            };
        }
        else {
            fn = function (value) {
                return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear() + '<br>' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            };
        }

        return fn;
    }

    /** @private */
    _getDTIntCnt(min, max, interval, dateTimeUnit) {

        let cnt = 0;
        let curr = new Date(min);
        let maxDate = new Date(max);
        maxDate = maxDate.valueOf();

        if (interval <= 0)
            return 1;

        while (curr.valueOf() < maxDate) {
            if (dateTimeUnit === 'millisecond')
                curr = new Date(curr.valueOf() + interval);
            else if (dateTimeUnit === 'second')
                curr = new Date(curr.valueOf() + interval * 1000);
            else if (dateTimeUnit === 'minute')
                curr = new Date(curr.valueOf() + interval * 60000);
            else if (dateTimeUnit === 'hour') {
                curr = new Date(curr.valueOf() + interval * 60000 * 24);
            }
            else if (dateTimeUnit === 'day')
                curr.setDate(curr.getDate() + interval);
            else if (dateTimeUnit === 'month')
                curr.setMonth(curr.getMonth() + interval);
            else if (dateTimeUnit === 'year')
                curr.setFullYear(curr.getFullYear() + interval);

            cnt++;
        }

        return cnt;
    }

    /** @private */
    _estAxisInterval(min, max, groupIndex, axisSize, baseUnit, avgItemWidth) {
        if (isNaN(min) || isNaN(max))
            return NaN;

        let scale = [1, 2, 5, 10, 15, 20, 50, 100, 200, 500];

        let i = 0;
        let prefCount = axisSize / ((!isNaN(avgItemWidth) && avgItemWidth > 0) ? avgItemWidth : 50);

        if (this._renderData &&
            this._renderData.length > groupIndex &&
            this._renderData[groupIndex].xAxis &&
            !isNaN(this._renderData[groupIndex].xAxis.avgWidth)) {
            let avgWidth = Math.max(1, this._renderData[groupIndex].xAxis.avgWidth);
            if (avgWidth !== 0 && isNaN(avgItemWidth)) {
                // use average text size and 90% axis size to account
                // for padding between text items
                prefCount = 0.9 * axisSize / avgWidth;
            }
        }

        if (prefCount <= 1)
            return Math.abs(max - min);

        let itemsCount = 0,
            intSize;

        while (true) {
            intSize = i >= scale.length ? Math.pow(10, 3 + i - scale.length) : scale[i];

            if (this._isDate(min) && this._isDate(max))
                itemsCount = this._getDTIntCnt(min, max, intSize, baseUnit);
            else
                itemsCount = (max - min) / intSize;

            if (itemsCount <= prefCount)
                break;

            i++;
        }

        let group = this.seriesGroups[groupIndex];
        if (group.spider || group.polar) {
            if (2 * intSize > max - min)
                intSize = max - min;
        }

        return intSize;
    }

    /** @private */
    _getPaddingSize(axisStats, axis, valuesOnTicks, axisSize, isPolar, isClosedCircle, hasColumnSeries) {
        var min = axisStats.min;
        var max = axisStats.max;

        if (axisStats.logAxis.enabled) {
            min = axisStats.logAxis.minPow;
            max = axisStats.logAxis.maxPow;
        }

        var unitInterval = axisStats.interval;
        var dateTimeUnit = axisStats.dateTimeUnit;

        if (isPolar) {
            var padding = (axisSize / Math.max(1, max - min + unitInterval)) * unitInterval;

            if (isClosedCircle) {
                return { left: 0, right: padding };
            }
            else {
                if (valuesOnTicks)
                    return { left: 0, right: 0 };

                return { left: padding / 2, right: padding / 2 };
            }
        }


        if (valuesOnTicks && !hasColumnSeries)
            return { left: 0, right: 0 };

        if (this._isDate(min) && this._isDate(max)) {
            var itemsCount = this._getDTIntCnt(min, max, Math.min(unitInterval, max - min), dateTimeUnit);
            var itemWidth = axisSize / Math.max(2, itemsCount);
            return { left: itemWidth / 2, right: itemWidth / 2 };
        }

        var itemsCount = Math.max(1, max - min);
        if (itemsCount === 1) {
            const sz = axisSize / 4;
            return { left: sz, right: sz };
        }

        var itemWidth = axisSize / (itemsCount + 1);

        return { left: itemWidth / 2, right: itemWidth / 2 };
    }

    /** @private */
    _calculateXOffsets(groupIndex, axisSize) {
        var g = this.seriesGroups[groupIndex];

        var xAxis = this._getXAxis(groupIndex);
        var xoffsets = [];
        var xvalues = [];
        var dataLength = this._getDataLen(groupIndex);

        var axisStats = this._getXAxisStats(groupIndex, xAxis, axisSize);
        var min = axisStats.min;
        var max = axisStats.max;

        var isDateTime = axisStats.isDateTime;
        var isTimeUnit = axisStats.isTimeUnit;

        var hasColumnSeries = this._hasColumnSeries();

        var isPolar = g.polar || g.spider;
        var startAngle = this._get([g.startAngle, g.minAngle, 0]);
        var endAngle = this._get([g.endAngle, g.maxAngle, 360]);
        var isClosedCircle = isPolar && !(Math.abs(Math.abs(endAngle - startAngle) - 360) > 0.0001);

        var valuesOnTicks = this._alignValuesWithTicks(groupIndex);

        var padding = this._getPaddingSize(axisStats, xAxis, valuesOnTicks, axisSize, isPolar, isClosedCircle, hasColumnSeries);

        var rangeLength = max - min;
        var filterRange = axisStats.filterRange;

        if (rangeLength === 0)
            rangeLength = 1;

        var plotSize = axisSize - padding.left - padding.right;
        if (isPolar && valuesOnTicks && !isClosedCircle)
            padding.left = padding.right = 0;

        var first = -1, last = -1;
        for (let i = 0; i < dataLength; i++) {
            var value = (xAxis.dataField === undefined) ? i : this._getDataValue(i, xAxis.dataField, groupIndex);

            if (axisStats.useIndeces) {
                if (i < filterRange.min || i > filterRange.max) {
                    xoffsets.push(NaN);
                    xvalues.push(undefined);
                    continue;
                }

                x = padding.left + (i - min) / rangeLength * plotSize;

                if (axisStats.logAxis.enabled === true) {
                    var logBase = axisStats.logAxis.base;

                    x = this._lwPlot.scale(
                        value,
                        {
                            min: min.valueOf(),
                            max: max.valueOf(),
                            type: 'logarithmic',
                            base: logBase
                        },
                        {
                            min: 0,
                            max: plotSize,
                            flip: false
                        }
                    );
                }

                xoffsets.push(this.renderer._ptrnd(x));
                xvalues.push(value);

                if (first === -1)
                    first = i;
                if (last === -1 || last < i)
                    last = i;
                continue;
            }

            value = isDateTime ? this._castAsDate(value, xAxis.dateFormat) : this._castAsNumber(value);
            if (isNaN(value) || value < filterRange.min || value > filterRange.max) {
                xoffsets.push(NaN);
                xvalues.push(undefined);
                continue;
            }

            var x = 0;
            if (axisStats.logAxis.enabled === true) {
                var logBase = axisStats.logAxis.base;

                x = this._lwPlot.scale(
                    value,
                    {
                        min: min.valueOf(),
                        max: max.valueOf(),
                        type: 'logarithmic',
                        base: logBase
                    },
                    {
                        min: 0,
                        max: plotSize,
                        flip: false
                    }
                );
            }
            else if (!isDateTime || (isDateTime && isTimeUnit)) {
                //diffFromMin = value - min;
                x = (value - min) * plotSize / rangeLength;
            }
            else {
                x = (value.valueOf() - min.valueOf()) / (max.valueOf() - min.valueOf()) * plotSize;
            }

            x = this.renderer._ptrnd(padding.left + x);

            xoffsets.push(x);
            xvalues.push(value);

            if (first === -1)
                first = i;
            if (last === -1 || last < i)
                last = i;
        }

        if (xAxis.flip === true) {
            for (let i = 0; i < xoffsets.length; i++)
                if (!isNaN(xoffsets[i]))
                    xoffsets[i] = axisSize - xoffsets[i];
        }

        if (isTimeUnit || isDateTime) {
            rangeLength = this._getDateDiff(min, max, xAxis.baseUnit);
            rangeLength = this.renderer._rnd(rangeLength, 1, false);
        }

        var itemsCount = Math.max(1, rangeLength);
        var itemWidth = plotSize / itemsCount;

        if (first === last && itemsCount === 1)
            xoffsets[first] = padding.left + plotSize / 2;

        return {
            axisStats: axisStats,
            data: xoffsets,
            xvalues: xvalues,
            first: first,
            last: last,
            length: last === -1 ? 0 : last - first + 1,
            itemWidth: itemWidth,
            intervalWidth: itemWidth * axisStats.interval,
            rangeLength: rangeLength,
            useIndeces: axisStats.useIndeces,
            padding: padding,
            axisSize: plotSize
        };
    }

    /** @private */
    _getXAxis(gidx) {
        if (gidx === undefined || gidx === null || this.seriesGroups.length <= gidx)
            return this.xAxis;

        return this.seriesGroups[gidx].xAxis || this.xAxis;
    }

    /** @private */
    _isGreyScale(groupIndex, seriesIndex) {
        let g = this.seriesGroups[groupIndex];
        let s = g.series[seriesIndex];

        if (s.greyScale === true)
            return true;
        else if (s.greyScale === false)
            return false;

        if (g.greyScale === true)
            return true;
        else if (g.greyScale === false)
            return false;

        return this.greyScale === true;
    }

    /** @private */
    _getSeriesColors(groupIndex, seriesIndex, itemIndex) {
        let colors = this._getSeriesColorsInternal(groupIndex, seriesIndex, itemIndex);

        if (this._isGreyScale(groupIndex, seriesIndex)) {
            for (let i in colors)
                colors[i] = this._draw.toGreyScale(colors[i]);
        }

        return colors;
    }

    _getColorFromScheme(groupIndex, serieIndex, itemIndex) {
        let color = '#000000';
        let group = this.seriesGroups[groupIndex];
        let serie = group.series[serieIndex];

        if (this._isPieGroup(groupIndex)) {
            let dataLength = this._getDataLen(groupIndex);
            color = this._getItemColorFromScheme(serie.colorScheme || group.colorScheme || this.colorScheme, serieIndex * dataLength + itemIndex, groupIndex, serieIndex);
        }
        else {
            let sidx = 0;
            for (let i = 0; i <= groupIndex; i++) {
                for (let j = 0; j < this.seriesGroups[i].series.length; j++) {
                    if (i === groupIndex && parseInt(j) === serieIndex)
                        break;
                    else
                        sidx++;
                }
            }

            let colorScheme = this.colorScheme;
            if (group.colorScheme) {
                colorScheme = group.colorScheme;
            }

            if (colorScheme === undefined || colorScheme === null || colorScheme === '')
                colorScheme = this.colorSchemes[0].name;

            if (!colorScheme)
                return color;

            for (let i = 0; i < this.colorSchemes.length; i++) {
                let cs = this.colorSchemes[i];
                if (cs.name === colorScheme) {
                    while (sidx > cs.colors.length) {
                        sidx -= cs.colors.length;
                        if (++i >= this.colorSchemes.length)
                            i = 0;
                        cs = this.colorSchemes[i];
                    }

                    color = cs.colors[sidx % cs.colors.length];
                }
            }
        } // else

        return color;
    }

    /** @private */
    _createColorsCache() {
        this._colorsCache = {
            get: function (cacheKey) {
                if (this._store[cacheKey])
                    return this._store[cacheKey];
            },
            set: function (cacheKey, color) {
                if (this._size < 10000) {
                    this._store[cacheKey] = color;
                    this._size++;
                }
            },

            clear: function () {
                this._store = {};
                this._size = 0;
            },

            _size: 0,
            _store: {}
        };
    }

    /** @private */
    _getSeriesColorsInternal(groupIndex, seriesIndex, itemIndex) {
        let g = this.seriesGroups[groupIndex];
        let s = g.series[seriesIndex];

        if (!typeof s.colorFunction === 'function' && g.type !== 'pie' && g.type !== 'donut')
            itemIndex = NaN;

        let cacheKey = groupIndex + '_' + seriesIndex + '_' + (isNaN(itemIndex) ? 'NaN' : itemIndex);

        if (this._colorsCache.get(cacheKey))
            return this._colorsCache.get(cacheKey);

        let colors =
            {
                lineColor: '#222222',
                lineColorSelected: '#151515',
                lineColorSymbol: '#222222',
                lineColorSymbolSelected: '#151515',
                fillColor: '#222222',
                fillColorSelected: '#333333',
                fillColorSymbol: '#222222',
                fillColorSymbolSelected: '#333333',
                fillColorAlt: '#222222',
                fillColorAltSelected: '#333333'
            };

        let customColors;
        if (typeof s.colorFunction === 'function') {
            let value = !isNaN(itemIndex) ? this._getDataValue(itemIndex, s.dataField, groupIndex) : NaN;
            if (g.type.indexOf('range') !== -1 && !isNaN(itemIndex)) {
                let valueFrom = this._getDataValue(itemIndex, s.dataFieldFrom, groupIndex);
                let valueTo = this._getDataValue(itemIndex, s.dataFieldTo, groupIndex);
                value = { from: valueFrom, to: valueTo };
            }

            customColors = s.colorFunction(value, itemIndex, s, g);
            if (typeof (customColors) === 'object') {
                for (let key in customColors)
                    colors[key] = customColors[key];
            }
            else {
                colors.fillColor = customColors;
            }
        }
        else {
            for (let key in colors) {
                if (s[key])
                    colors[key] = s[key];
            }

            if (!s.fillColor && !s.color) {
                colors.fillColor = this._getColorFromScheme(groupIndex, seriesIndex, itemIndex);
            }
            else {
                s.fillColor = s.fillColor || s.color;
            }
        }

        let colorDeriveMap =
            {
                fillColor: { baseColor: 'fillColor', adjust: 1.0 },
                fillColorSelected: { baseColor: 'fillColor', adjust: 1.1 },
                fillColorSymbol: { baseColor: 'fillColor', adjust: 1.0 },
                fillColorSymbolSelected: { baseColor: 'fillColorSymbol', adjust: 2.0 },
                fillColorAlt: { baseColor: 'fillColor', adjust: 4.0 },
                fillColorAltSelected: { baseColor: 'fillColor', adjust: 3.0 },
                lineColor: { baseColor: 'fillColor', adjust: 0.95 },
                lineColorSelected: { baseColor: 'lineColor', adjust: 0.95 },
                lineColorSymbol: { baseColor: 'lineColor', adjust: 1.0 },
                lineColorSymbolSelected: { baseColor: 'lineColorSelected', adjust: 1.0 }
            };

        // assign colors
        for (let key in colors) {
            if (typeof (customColors) !== 'object' || !customColors[key]) {
                if (s[key])
                    colors[key] = s[key];
            }
        }

        // derive colors
        for (let key in colors) {
            if (typeof (customColors) !== 'object' || !customColors[key]) {
                if (!s[key])
                    colors[key] = this.renderer.adjustColor(colors[colorDeriveMap[key].baseColor], colorDeriveMap[key].adjust);
            }
        }

        this._colorsCache.set(cacheKey, colors);

        return colors;
    }

    /** @private */
    _getItemColorFromScheme(scheme, index, gidx, sidx) {
        let i;

        if (scheme === undefined || scheme === '')
            scheme = this.colorSchemes[0].name;

        for (i = 0; i < this.colorSchemes.length; i++)
            if (scheme === this.colorSchemes[i].name)
                break;

        let j = 0;
        while (j <= index) {
            if (i === this.colorSchemes.length)
                i = 0;

            let schLen = this.colorSchemes[i].colors.length;
            if (j + schLen <= index) {
                j += schLen;
                i++;
            }
            else {
                let color = this.colorSchemes[i].colors[index - j];

                if (this._isGreyScale(gidx, sidx) && color.indexOf('#') === 0)
                    color = this._draw.toGreyScale(color);

                return color;
            }
        }
    }

    getColorScheme(scheme) {
        for (let i = 0; i < this.colorSchemes.length; i++) {
            if (this.colorSchemes[i].name === scheme)
                return this.colorSchemes[i].colors;
        }

        return undefined;
    }

    addColorScheme(scheme, colors) {
        for (let i = 0; i < this.colorSchemes.length; i++) {
            if (this.colorSchemes[i].name === scheme) {
                this.colorSchemes[i].colors = colors;
                return;
            }
        }

        this.colorSchemes.push({ name: scheme, colors: colors });
    }

    removeColorScheme(scheme) {
        for (let i = 0; i < this.colorSchemes.length; i++) {
            if (this.colorSchemes[i].name === scheme) {
                this.colorSchemes.splice(i, 1);
                break;
            }
        }
    }

    /** @private */
    _formatValue(value, formatSettings, formatFunction, groupIndex, serieIndex, itemIndex) {
        if (value === undefined || value === null)
            return '';

        if (this._isObject(value) && !this._isDate(value) && !formatFunction)
            return '';

        if (formatFunction) {
            if (typeof formatFunction !== 'function')
                return value.toString();

            try {
                return formatFunction(value, itemIndex, serieIndex, groupIndex);
            }
            catch (e) {
                return e.message;
            }
        }

        if (this._isNumber(value))
            return this._formatNumber(value, formatSettings);

        if (this._isDate(value))
            return this._formatDate(value, formatSettings);

        if (formatSettings) {
            return (formatSettings.prefix || '') + value.toString() + (formatSettings.sufix || '');
        }

        return value.toString();
    }

    /** @private */
    _getFormattedValue(groupIndex, serieIndex, itemIndex, formatSettings, formatFunction, valuesOnly) {
        let g = this.seriesGroups[groupIndex];
        let s = g.series[serieIndex];
        let text = '';

        let fs = formatSettings, fn = formatFunction;

        if (s.labels) {
            fs = fs || this._getFormatSettings(s.labels);
            fn = fn || s.labels.formatFunction;
        }

        if (!fs && !fn) {
            fs = this._getFormatSettings(s);
            fn = s.formatFunction;

            if (!fs && !fn) {
                fs = this._getFormatSettings(g);
                fn = g.formatFunction;
            }
        }

        let value = {}, cnt = 0;
        for (let field in s)
            if (field.indexOf('dataField') === 0) {
                value[field.substring(9).toLowerCase()] = this._getDataValue(itemIndex, s[field], groupIndex);
                cnt++;
            }

        if (cnt === 0)
            value = this._getDataValue(itemIndex, undefined, groupIndex);

        if (g.type.indexOf('waterfall') !== -1 && this._isSummary(groupIndex, itemIndex)) {
            value = this._renderData[groupIndex].offsets[serieIndex][itemIndex].value;
            cnt = 0;
        }

        if (fn && typeof fn === 'function') {
            try {
                return fn(cnt === 1 ? value[''] : value, itemIndex, s, g);
            }
            catch (e) {
                return e.message;
            }
        }

        if (cnt === 1 && this._isPieGroup(groupIndex)) {
            return this._formatValue(value[''], fs, fn, groupIndex, serieIndex, itemIndex);
        }

        if (cnt > 0) {
            let i = 0;
            for (let field in value) {
                if (i > 0 && text !== '')
                    text += '<br>';

                let dataField = 'dataField' + (field.length > 0 ? field.substring(0, 1).toUpperCase() + field.substring(1) : '');
                let displayField = 'displayText' + (field.length > 0 ? field.substring(0, 1).toUpperCase() + field.substring(1) : '');
                let displayText = s[displayField] || s[dataField];

                let currValue = value[field];
                if (undefined !== currValue) {
                    currValue = this._formatValue(currValue, fs, fn, groupIndex, serieIndex, itemIndex);
                }
                else
                    continue;

                if (valuesOnly === true)
                    text += currValue;
                else
                    text += displayText + ': ' + currValue;

                i++;
            }
        }
        else {
            if (value !== undefined && value !== null)
                text = this._formatValue(value, fs, fn, groupIndex, serieIndex, itemIndex);
        }

        return text || '';
    }

    /** @private */
    _isNumberAsString(text) {
        if (typeof (text) !== 'string')
            return false;

        text = text.trim();
        for (let i = 0; i < text.length; i++) {
            let ch = text.charAt(i);
            if ((ch >= '0' && ch <= '9') || ch === ',' || ch === '.')
                continue;

            if (ch === '-' && i === 0)
                continue;

            if ((ch === '(' && i === 0) || (ch === ')' && i === text.length - 1))
                continue;

            return false;
        }

        return true;
    }

    /** @private */
    _castAsDate(value, dateFormat) {
        if (value instanceof Date && !isNaN(value))
            return value;

        if (typeof value === 'string') {
            let result = new Date(value);

            if (this._isDate(result)) {
                if (value.indexOf(':') === -1)
                    result.setHours(0, 0, 0, 0);

                return result;
            }

            try {
                if (dateFormat) {
                    result = LW.Utilities.DateTime.parseDateString(value, undefined, dateFormat).toDate();

                    if (this._isDate(result))
                        return result;
                }

                // try formats detected earlier
                if (this._autoDateFormats) {
                    for (let i = 0; i < this._autoDateFormats.length; i++) {
                        result = LW.Utilities.DateTime.parseDateString(value, undefined, this._autoDateFormats[i]).toDate();

                        if (this._isDate(result))
                            return result;
                    }
                }

                // try all formats
                let detectedFormat = this._detectDateFormat(value);
                if (detectedFormat) {
                    result = LW.Utilities.DateTime.parseDateString(value, undefined, detectedFormat).toDate();

                    if (this._isDate(result)) {
                        this._autoDateFormats.push(detectedFormat);
                        return result;
                    }
                }
            }
            catch (error) {
                //
            }
        }

        return undefined;
    }

    /** @private */
    _castAsNumber(value) {
        if (value instanceof Date && !isNaN(value))
            return value.valueOf();

        if (typeof (value) === 'string') {
            if (this._isNumber(value)) {
                value = parseFloat(value);
            }
            else {
                if (!/[a-zA-Z]/.test(value)) {
                    let date = new Date(value);
                    if (date !== undefined && date !== null)
                        value = date.valueOf();
                }
            }
        }

        if (isNaN(value)) {
            return undefined;
        }

        return value;
    }

    /** @private */
    _isNumber(value) {
        if (typeof (value) === 'string') {
            if (this._isNumberAsString(value))
                value = parseFloat(value);
        }
        return typeof value === 'number' && isFinite(value);
    }

    /** @private */
    _isDate(value) {
        return value instanceof Date && !isNaN(value.getDate());
    }

    /** @private */
    _isBoolean(value) {
        return typeof value === 'boolean';
    }

    /** @private */
    _isObject(value) {
        return (value && (typeof value === 'object' || typeof value === 'function')) || false;
    }

    /** @private */
    _formatDate(value, settings) {
        let result = value.toString();

        if (settings) {
            if (settings.dateFormat)
                result = new LW.Utilities.DateTime(value).toString(settings.dateFormat);

            result = (settings.prefix || '') + result + (settings.sufix || '');
        }

        return result;
    }

    /** @private */
    _formatNumber(value, settings) {
        if (!this._isNumber(value))
            return value;

        settings = settings || {};

        const self = this;
        let decimalSeparator = self.localization.decimalSeparator,
            thousandsSeparator = self.localization.thousandsSeparator;

        if (settings.decimalSeparator)
            decimalSeparator = settings.decimalSeparator;

        if (settings.thousandsSeparator)
            thousandsSeparator = settings.thousandsSeparator;

        let prefix = settings.prefix || '';
        let sufix = settings.sufix || '';
        let decimalPlaces = settings.decimalPlaces;
        if (isNaN(decimalPlaces))
            decimalPlaces = this._getDecimalPlaces([value], undefined, 3);

        let negativeWithBrackets = settings.negativeWithBrackets || false;

        let negative = (value < 0);

        if (negative && negativeWithBrackets)
            value *= -1;

        let output = value.toString();
        let decimalindex;

        let decimal = Math.pow(10, decimalPlaces);
        output = (Math.round(value * decimal) / decimal).toString();
        if (isNaN(output)) {
            output = '';
        }

        decimalindex = output.lastIndexOf('.');
        if (decimalPlaces > 0) {
            if (decimalindex < 0) {
                output += decimalSeparator;
                decimalindex = output.length - 1;
            }
            else if (decimalSeparator !== '.') {
                output = output.replace('.', decimalSeparator);
            }
            while ((output.length - 1 - decimalindex) < decimalPlaces) {
                output += '0';
            }
        }

        decimalindex = output.lastIndexOf(decimalSeparator);
        decimalindex = (decimalindex > -1) ? decimalindex : output.length;
        let newoutput = output.substring(decimalindex);
        let cnt = 0;
        for (let i = decimalindex; i > 0; i-- , cnt++) {
            if ((cnt % 3 === 0) && (i !== decimalindex) && (!negative || (i > 1) || (negative && negativeWithBrackets))) {
                newoutput = thousandsSeparator + newoutput;
            }
            newoutput = output.charAt(i - 1) + newoutput;
        }
        output = newoutput;

        if (negative && negativeWithBrackets)
            output = '(' + output + ')';

        return prefix + output + sufix;
    }


    /** @private */
    _calculateControlPoints(arr, offset) {
        let x0 = arr[offset],
            y0 = arr[offset + 1],
            x1 = arr[offset + 2],
            y1 = arr[offset + 3],
            x2 = arr[offset + 4],
            y2 = arr[offset + 5];

        let tension = 0.4;

        let distP0P1 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        let distP1P2 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        let denom = (distP0P1 + distP1P2);
        if (denom === 0)
            denom = 1;
        let factorA = tension * distP0P1 / denom;
        let factorB = tension - factorA;

        return [
            x1 + factorA * (x0 - x2) /* x1 */, y1 + factorA * (y0 - y2) /* y1 */,
            x1 - factorB * (x0 - x2) /* x2 */, y1 - factorB * (y0 - y2) /* y2 */
        ];
    }

    /** @private */
    _getBezierPoints(arr) {
        let result = '';
        let points = [], controlPoints = [];
        let split = arr.split(' ');
        for (let i = 0; i < split.length; i++) {
            let pt = split[i].split(',');
            points.push(parseFloat(pt[0]));
            points.push(parseFloat(pt[1]));
            if (isNaN(points[points.length - 1]) || isNaN(points[points.length - 2]))
                continue;
        }

        let len = points.length;
        if (len <= 1)
            return '';
        else if (len === 2) {
            result = 'M' + this.renderer._ptrnd(points[0]) + ',' + this.renderer._ptrnd(points[1]) +
                ' L' + this.renderer._ptrnd(points[0] + 1) + ',' + this.renderer._ptrnd(points[1] + 1) + ' '
            return result;
        }

        for (let i = 0; i < len - 4; i += 2)
            controlPoints = controlPoints.concat(this._calculateControlPoints(points, i));

        for (let i = 2; i < len - 5; i += 2) {
            result += ' C' +
                this.renderer._ptrnd(controlPoints[2 * i - 2]) + ',' + this.renderer._ptrnd(controlPoints[2 * i - 1]) + ' ' +
                this.renderer._ptrnd(controlPoints[2 * i]) + ',' + this.renderer._ptrnd(controlPoints[2 * i + 1]) + ' ' +
                this.renderer._ptrnd(points[i + 2]) + ',' + this.renderer._ptrnd(points[i + 3]) + ' ';
        }

        // check the x & y diff between the 1st and 2nd point and connect with either a line or quadratic curve
        if (len <= 4 || (Math.abs(points[0] - points[2]) < 3 || Math.abs(points[1] - points[3]) < 3)) {
            result = 'M' + this.renderer._ptrnd(points[0]) + ',' + this.renderer._ptrnd(points[1]) +
                ' L' + this.renderer._ptrnd(points[2]) + ',' + this.renderer._ptrnd(points[3]) + ' ' + result;
        }
        else {
            result = 'M' + this.renderer._ptrnd(points[0]) + ',' + this.renderer._ptrnd(points[1]) +
                ' Q' +
                this.renderer._ptrnd(controlPoints[0]) + ',' + this.renderer._ptrnd(controlPoints[1]) + ' ' +
                this.renderer._ptrnd(points[2]) + ',' + this.renderer._ptrnd(points[3]) + ' ' + result;
        }

        // check the x & y diff between the last 2 points and connect with either a line or quadratic curve
        if (len >= 4 && (Math.abs(points[len - 2] - points[len - 4]) < 3 || Math.abs(points[len - 1] - points[len - 3]) < 3)) {
            result += ' L' + this.renderer._ptrnd(points[len - 2]) + ',' + this.renderer._ptrnd(points[len - 1]) + ' ';
        }
        else if (len >= 5) {
            result += ' Q' +
                this.renderer._ptrnd(controlPoints[len * 2 - 10]) + ',' + this.renderer._ptrnd(controlPoints[len * 2 - 9]) + ' ' +
                this.renderer._ptrnd(points[len - 2]) + ',' + this.renderer._ptrnd(points[len - 1]) + ' ';
        }

        return result;
    }



    /** @private */
    _createAnimationGroup(groupId) {
        if (!this._animGroups) {
            this._animGroups = {};
        }

        this._animGroups[groupId] = { animations: [], startTick: NaN };
    }

    /** @private */
    _startAnimation(groupId) {
        let d = new Date();
        let currentTick = d.getTime();
        this._animGroups[groupId].startTick = currentTick;
        this._runAnimation();
        this._enableAnimTimer();
    }

    /** @private */
    _enqueueAnimation(groupId, element, properties, duration, fn, context, easing) {
        if (duration < 0)
            duration = 0;

        if (easing === undefined)
            easing = 'easeInOutSine';

        this._animGroups[groupId].animations.push({ key: element, properties: properties, duration: duration, fn: fn, context: context, easing: easing });
    }

    /** @private */
    _stopAnimations() {
        clearTimeout(this._animtimer);
        this._animtimer = undefined;
        this._animGroups = undefined;
    }

    /** @private */
    _enableAnimTimer() {
        if (!this._animtimer) {
            let self = this;
            this._animtimer = setTimeout(function () {
                self._runAnimation();
            }, this._animTickInt);
        }
    }

    /** @private */
    _runAnimation() {

        if (this._animGroups) {
            let d = new Date();
            let currentTick = d.getTime();

            let animGroupsNewList = {};
            for (let j in this._animGroups) {
                let list = this._animGroups[j].animations;
                let startTick = this._animGroups[j].startTick;

                let maxDuration = 0;
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];

                    let tSince = (currentTick - startTick);
                    if (item.duration > maxDuration)
                        maxDuration = item.duration;

                    let percent = item.duration > 0 ? tSince / item.duration : 1;
                    let easePercent = percent;
                    if (item.easing && item.duration !== 0 && item.duration !== false)
                        easePercent = LW.Utilities.Animation.Easings[item.easing](tSince, 0, 1, item.duration);

                    if (percent > 1) {
                        percent = 1;
                        easePercent = 1;
                    }

                    if (item.fn) {
                        // custom function
                        item.fn(item.key, item.context, easePercent);
                        continue;
                    }

                    let params = {};
                    for (let j = 0; j < item.properties.length; j++) {
                        let p = item.properties[j];
                        let val = 0;

                        if (percent === 1) {
                            val = p.to;
                        }
                        else {
                            val = easePercent * (p.to - p.from) + p.from;
                        }

                        params[p.key] = val;
                    }
                    this.renderer.attr(item.key, params);
                } // for i

                if (startTick + maxDuration > currentTick)
                    animGroupsNewList[j] = ({ startTick: startTick, animations: list });
            } // for j

            this._animGroups = animGroupsNewList;

            if (this.renderer instanceof LW.Utilities.HTML5Renderer)
                this.renderer.refresh();
        }

        this._animtimer = null;

        if (Object.values(this._animGroups).length > 0) {
            this._enableAnimTimer();
        }
    }

    _fixCoords(rect, groupIndex) {
        var swapXY = this.seriesGroups[groupIndex].orientation === 'horizontal';
        if (!swapXY)
            return rect;

        var tmp = rect.x;
        rect.x = rect.y;
        rect.y = tmp + this._plotRect.y - this._plotRect.x;

        var tmp = rect.width;
        rect.width = rect.height;
        rect.height = tmp;

        return rect;
    }

    getItemCoord(groupIndex, serieIndex, itemIndex) {
        var self = this;

        if (self._isPieGroup(groupIndex) &&
            (
                !self._isSerieVisible(groupIndex, serieIndex, itemIndex) ||
                !self._renderData ||
                self._renderData.length <= groupIndex
            )
        ) {
            return { x: NaN, y: NaN };
        }

        if (!self._isSerieVisible(groupIndex, serieIndex) ||
            !self._renderData ||
            self._renderData.length <= groupIndex
        ) {
            return { x: NaN, y: NaN };
        }

        var g = self.seriesGroups[groupIndex]
        var s = g.series[serieIndex];

        var coord = self._getItemCoord(groupIndex, serieIndex, itemIndex);
        if (self._isPieGroup(groupIndex)) {
            if (isNaN(coord.x) || isNaN(coord.y) || isNaN(coord.fromAngle) || isNaN(coord.toAngle))
                return { x: NaN, y: NaN };

            var plotRect = this._plotRect;

            var fromAngle = coord.fromAngle * (Math.PI / 180);
            var toAngle = coord.toAngle * (Math.PI / 180);

            const x1 = plotRect.x + coord.center.x + Math.cos(fromAngle) * coord.outerRadius,
                x2 = plotRect.x + coord.center.x + Math.cos(toAngle) * coord.outerRadius,
                y1 = plotRect.y + coord.center.y - Math.sin(fromAngle) * coord.outerRadius,
                y2 = plotRect.y + coord.center.y - Math.sin(toAngle) * coord.outerRadius;

            var x = Math.min(x1, x2);
            var width = Math.abs(x2 - x1);
            let y = Math.min(y1, y2);
            var height = Math.abs(y2 - y1);

            coord =
                {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    center: coord.center,
                    centerOffset: coord.centerOffset,
                    innerRadius: coord.innerRadius,
                    outerRadius: coord.outerRadius,
                    selectedRadiusChange: coord.selectedRadiusChange,
                    fromAngle: coord.fromAngle,
                    toAngle: coord.toAngle
                };

            return coord;
        }

        if (g.type.indexOf('column') !== -1 || g.type.indexOf('waterfall') !== -1) {
            var offsetAndWidth = this._getColumnSerieWidthAndOffset(groupIndex, serieIndex);
            coord.height = Math.abs(coord.y.to - coord.y.from);
            coord.y = Math.min(coord.y.to, coord.y.from);

            coord.x += offsetAndWidth.offset;
            coord.width = offsetAndWidth.width;
        }
        else if (g.type.indexOf('ohlc') !== -1 || g.type.indexOf('candlestick') !== -1) {
            var offsetAndWidth = this._getColumnSerieWidthAndOffset(groupIndex, serieIndex);
            let y = coord.y;
            var minY = Math.min(y.Open, y.Close, y.Low, y.High);
            var maxY = Math.max(y.Open, y.Close, y.Low, y.High);

            coord.height = Math.abs(maxY - minY);
            coord.y = minY

            coord.x += offsetAndWidth.offset;
            coord.width = offsetAndWidth.width;
        }
        else if (g.type.indexOf('line') !== -1 || g.type.indexOf('area') !== -1) {
            coord.width = coord.height = 0;
            coord.y = coord.y.to;
        }
        else if (g.type.indexOf('bubble') !== -1 || g.type.indexOf('scatter') !== -1) {
            coord.center = { x: coord.x, y: coord.y.to };
            var radius = coord.y.radius;
            if (s.symbolType !== 'circle' && s.symbolType !== undefined && s.symbolType !== null)
                radius /= 2;

            coord.y = coord.y.to;
            coord.radius = radius;

            coord.width = 2 * radius;
            coord.height = 2 * radius;
        }

        coord = this._fixCoords(coord, groupIndex);

        if (g.polar || g.spider) {
            var point = this._toPolarCoord(this._renderData[groupIndex].polarCoords, this._plotRect, coord.x, coord.y);
            coord.x = point.x;
            coord.y = point.y;
            if (coord.center) {
                coord.center = this._toPolarCoord(this._renderData[groupIndex].polarCoords, this._plotRect, coord.center.x, coord.center.y);
            }
        }

        if (g.type.indexOf('bubble') !== -1 || g.type.indexOf('scatter') !== -1) {
            coord.x -= radius;
            coord.y -= radius;
        }

        return coord;
    }

    _getItemCoord(groupIndex, serieIndex, itemIndex) {
        let g = this.seriesGroups[groupIndex],
            x,
            y;

        if (!g || !this._renderData)
            return { x: NaN, y: NaN };

        let serie = g.series[serieIndex];
        if (!serie)
            return { x: NaN, y: NaN };

        let plotRect = this._plotRect;

        if (this._isPieGroup(groupIndex)) {
            let slice = this._renderData[groupIndex].offsets[serieIndex][itemIndex];
            if (!slice)
                return { x: NaN, y: NaN };

            let angle = (slice.fromAngle + slice.toAngle) / 2 * (Math.PI / 180);

            x = plotRect.x + slice.x + Math.cos(angle) * slice.outerRadius;
            y = plotRect.y + slice.y - Math.sin(angle) * slice.outerRadius;

            return {
                x: x,
                y: y,
                center: { x: slice.x, y: slice.y },
                centerOffset: slice.centerOffset,
                innerRadius: slice.innerRadius,
                outerRadius: slice.outerRadius,
                selectedRadiusChange: slice.selectedRadiusChange,
                fromAngle: slice.fromAngle,
                toAngle: slice.toAngle
            };
        }
        else {
            x = plotRect.x + this._renderData[groupIndex].xoffsets.data[itemIndex];
            y = this._renderData[groupIndex].offsets[serieIndex][itemIndex];

            if (isNaN(x) || !y)
                return { x: NaN, y: NaN };
        }

        let yOut = {};
        for (let i in y) {
            yOut[i] = y[i];
        }

        return { x: x, y: yOut };
    }

    getXAxisValue(offset, groupIndex) {
        var group = this.seriesGroups[groupIndex];
        if (!group)
            return undefined;

        var xAxis = this._getXAxis(groupIndex);

        var rect = this._plotRect;
        var axisSize = 0;

        var pos = NaN;

        var xAxisStats = this._renderData[0].xoffsets.axisStats;

        var min = 0, max = 0;
        if (group.polar || group.spider) {
            if (isNaN(offset.x) || isNaN(offset.y))
                return NaN;

            var polarCoords = this._getPolarAxisCoords(groupIndex, rect);

            var dist = this.renderer._ptdist(offset.x, offset.y, polarCoords.x, polarCoords.y);
            if (dist > polarCoords.r)
                return NaN;

            var posAngle = Math.atan2(polarCoords.y - offset.y, offset.x - polarCoords.x);

            posAngle = Math.PI / 2 - posAngle;
            if (posAngle < 0)
                posAngle = 2 * Math.PI + posAngle;

            pos = posAngle * polarCoords.r;

            var startAngle = polarCoords.startAngle + Math.PI / 2;
            var endAngle = polarCoords.endAngle + Math.PI / 2;

            min = startAngle * polarCoords.r;
            max = endAngle * polarCoords.r;

            axisSize = (endAngle - startAngle) * polarCoords.r;

            var padding = this._getPaddingSize(xAxisStats, xAxis, xAxis.valuesOnTicks, axisSize, true, polarCoords.isClosedCircle, this._hasColumnSeries());

            if (polarCoords.isClosedCircle) {
                axisSize -= (padding.left + padding.right);
                max -= (padding.left + padding.right);
            }
            else {
                if (!xAxis.valuesOnTicks) {
                    min += padding.left;
                    max -= padding.right;
                }
            }

        }
        else {
            if (group.orientation !== 'horizontal') {
                if (offset < rect.x || offset > rect.x + rect.width)
                    return NaN;

                pos = offset - rect.x;
                axisSize = rect.width;
            }
            else {
                if (offset < rect.y || offset > rect.y + rect.height)
                    return NaN;

                pos = offset - rect.y;
                axisSize = rect.height;
            }

            if (this._renderData[groupIndex] && this._renderData[groupIndex].xoffsets) {
                var padding = this._renderData[groupIndex].xoffsets.padding;
                axisSize -= (padding.left + padding.right);
                pos -= padding.left;
            }

            max = axisSize;
        }

        var value = this._lwPlot.scale(
            pos,
            {
                min: min,
                max: max
            },
            {
                min: xAxisStats.min.valueOf(),
                max: xAxisStats.max.valueOf(),
                type: xAxisStats.logAxis.enabled ? 'logarithmic' : 'linear',
                base: xAxisStats.logAxis.base,
                flip: xAxis.flip
            }
        );

        return value;
    }

    getValueAxisValue(offset, groupIndex) {
        let group = this.seriesGroups[groupIndex];
        if (!group)
            return undefined;

        let valueAxis = this._getValueAxis(groupIndex);

        let rect = this._plotRect;
        let axisSize = 0;

        let pos = NaN;

        if (group.polar || group.spider) {
            if (isNaN(offset.x) || isNaN(offset.y))
                return NaN;

            let polarCoords = this._getPolarAxisCoords(groupIndex, rect);
            pos = this.renderer._ptdist(offset.x, offset.y, polarCoords.x, polarCoords.y);
            axisSize = polarCoords.r;
            pos = axisSize - pos;
        }
        else {
            if (group.orientation === 'horizontal') {
                if (offset < rect.x || offset > rect.x + rect.width)
                    return NaN;

                pos = offset - rect.x;

                axisSize = rect.width;
            }
            else {
                if (offset < rect.y || offset > rect.y + rect.height)
                    return NaN;

                pos = offset - rect.y;

                axisSize = rect.height;
            }
        }

        let gstat = this._stats.seriesGroups[groupIndex];

        let value = this._lwPlot.scale(
            pos,
            {
                min: 0,
                max: axisSize
            },
            {
                min: gstat.min.valueOf(),
                max: gstat.max.valueOf(),
                type: gstat.logarithmic ? 'logarithmic' : 'linear',
                base: gstat.logBase,
                flip: !valueAxis.flip
            }
        );

        return value;
    }

    _detectDateFormat(samples, additionalFormats) {
        let formats = {
            // en-US
            // short date pattern
            en_US_d: 'M/d/yyyy',
            // long date pattern
            en_US_D: 'dddd, MMMM dd, yyyy',
            // short time pattern
            en_US_t: 'h:mm tt',
            // long time pattern
            en_US_T: 'h:mm:ss tt',
            // long date, short time pattern
            en_US_f: 'dddd, MMMM dd, yyyy h:mm tt',
            // long date, long time pattern
            en_US_F: 'dddd, MMMM dd, yyyy h:mm:ss tt',
            // month/day pattern
            en_US_M: 'MMMM dd',
            // month/year pattern
            en_US_Y: 'yyyy MMMM',
            // S is a sortable format that does not vary by culture
            en_US_S: 'yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss',

            // en-CA
            en_CA_d: 'dd/MM/yyyy',
            en_CA_D: 'MMMM-dd-yy',
            en_CA_f: 'MMMM-dd-yy h:mm tt',
            en_CA_F: 'MMMM-dd-yy h:mm:ss tt',

            // formatting of dates in MySQL Databases
            ISO: 'yyyy-MM-dd hh:mm:ss',
            ISO2: 'yyyy-MM-dd HH:mm:ss',
            d1: 'dd.MM.yyyy',
            d2: 'dd-MM-yyyy',
            zone1: 'yyyy-MM-ddTHH:mm:ss-HH:mm',
            zone2: 'yyyy-MM-ddTHH:mm:ss+HH:mm',
            custom: 'yyyy-MM-ddTHH:mm:ss.fff',
            custom2: 'yyyy-MM-dd HH:mm:ss.fff',

            // de-DE
            de_DE_d: 'dd.MM.yyyy',
            de_DE_D: 'dddd, d. MMMM yyyy',
            de_DE_t: 'HH:mm',
            de_DE_T: 'HH:mm:ss',
            de_DE_f: 'dddd, d. MMMM yyyy HH:mm',
            de_DE_F: 'dddd, d. MMMM yyyy HH:mm:ss',
            de_DE_M: 'dd MMMM',
            de_DE_Y: 'MMMM yyyy',

            // fr-FR
            fr_FR_d: 'dd/MM/yyyy',
            fr_FR_D: 'dddd d MMMM yyyy',
            fr_FR_t: 'HH:mm',
            fr_FR_T: 'HH:mm:ss',
            fr_FR_f: 'dddd d MMMM yyyy HH:mm',
            fr_FR_F: 'dddd d MMMM yyyy HH:mm:ss',
            fr_FR_M: 'd MMMM',
            fr_FR_Y: 'MMMM yyyy',

            // it-IT
            it_IT_d: 'dd/MM/yyyy',
            it_IT_D: 'dddd d MMMM yyyy',
            it_IT_t: 'HH:mm',
            it_IT_T: 'HH:mm:ss',
            it_IT_f: 'dddd d MMMM yyyy HH:mm',
            it_IT_F: 'dddd d MMMM yyyy HH:mm:ss',
            it_IT_M: 'dd MMMM',
            it_IT_Y: 'MMMM yyyy',

            // Ru
            ru_RU_d: 'dd.MM.yyyy',
            ru_RU_D: 'd MMMM yyyy \'?.\'',
            ru_RU_t: 'H:mm',
            ru_RU_T: 'H:mm:ss',
            ru_RU_f: 'd MMMM yyyy \'?.\' H:mm',
            ru_RU_F: 'd MMMM yyyy \'?.\' H:mm:ss',
            ru_RU_Y: 'MMMM yyyy',

            // cs-CZ
            cs_CZ_d: 'd.M.yyyy',
            cs_CZ_D: 'd. MMMM yyyy',
            cs_CZ_t: 'H:mm',
            cs_CZ_T: 'H:mm:ss',
            cs_CZ_f: 'd. MMMM yyyy H:mm',
            cs_CZ_F: 'd. MMMM yyyy H:mm:ss',
            cs_CZ_M: 'dd MMMM',
            cs_CZ_Y: 'MMMM yyyy',

            // he-IL
            he_IL_d: 'dd MMMM yyyy',
            he_IL_D: 'dddd dd MMMM yyyy',
            he_IL_t: 'HH:mm',
            he_IL_T: 'HH:mm:ss',
            he_IL_f: 'dddd dd MMMM yyyy HH:mm',
            he_IL_F: 'dddd dd MMMM yyyy HH:mm:ss',
            he_IL_M: 'dd MMMM',
            he_IL_Y: 'MMMM yyyy',

            // hr-HR
            hr_HR_d: 'd.M.yyyy.',
            hr_HR_D: 'd. MMMM yyyy.',
            hr_HR_t: 'H:mm',
            hr_HR_T: 'H:mm:ss',
            hr_HR_f: 'd. MMMM yyyy. H:mm',
            hr_HR_F: 'd. MMMM yyyy. H:mm:ss',
            hr_HR_M: 'd. MMMM',

            // hu-HU
            hu_HU_d: 'yyyy.MM.dd.',
            hu_HU_D: 'yyyy. MMMM d.',
            hu_HU_t: 'H:mm',
            hu_HU_T: 'H:mm:ss',
            hu_HU_f: 'yyyy. MMMM d. H:mm',
            hu_HU_F: 'yyyy. MMMM d. H:mm:ss',
            hu_HU_M: 'MMMM d.',
            hu_HU_Y: 'yyyy. MMMM',

            // jp-JP
            jp_JP_d: 'gg y/M/d',
            jp_JP_D: 'gg y\'?\'M\'?\'d\'?\'',
            jp_JP_t: 'H:mm',
            jp_JP_T: 'H:mm:ss',
            jp_JP_f: 'gg y\'?\'M\'?\'d\'?\' H:mm',
            jp_JP_F: 'gg y\'?\'M\'?\'d\'?\' H:mm:ss',
            jp_JP_M: 'M\'?\'d\'?\'',
            jp_JP_Y: 'gg y\'?\'M\'?\'',

            // LT
            lt_LT_d: 'yyyy.MM.dd',
            lt_LT_D: 'yyyy \'m.\' MMMM d \'d.\'',
            lt_LT_t: 'HH:mm',
            lt_LT_T: 'HH:mm:ss',
            lt_LT_f: 'yyyy \'m.\' MMMM d \'d.\' HH:mm',
            lt_LT_F: 'yyyy \'m.\' MMMM d \'d.\' HH:mm:ss',
            lt_LT_M: 'MMMM d \'d.\'',
            lt_LT_Y: 'yyyy \'m.\' MMMM',

            // sa-IN
            sa_IN_d: 'dd-MM-yyyy',
            sa_IN_D: 'dd MMMM yyyy dddd',
            sa_IN_t: 'HH:mm',
            sa_IN_T: 'HH:mm:ss',
            sa_IN_f: 'dd MMMM yyyy dddd HH:mm',
            sa_IN_F: 'dd MMMM yyyy dddd HH:mm:ss',
            sa_IN_M: 'dd MMMM',

            // basic
            basic_y: 'yyyy',
            basic_ym: 'yyyy-MM',
            basic_d: 'yyyy-MM-dd',
            basic_dhm: 'yyyy-MM-dd hh:mm',
            basic_bhms: 'yyyy-MM-dd hh:mm:ss',
            basic2_ym: 'MM-yyyy',
            basic2_d: 'MM-dd-yyyy',
            basic2_dhm: 'MM-dd-yyyy hh:mm',
            basic2_dhms: 'MM-dd-yyyy hh:mm:ss',

            basic3_ym: 'yyyy/MM',
            basic3_d: 'yyyy/MM/dd',
            basic3_dhm: 'yyyy/MM/dd hh:mm',
            basic3_bhms: 'yyyy/MM/dd hh:mm:ss',
            basic4_ym: 'MM/yyyy',
            basic4_d: 'MM/dd/yyyy',
            basic4_dhm: 'MM/dd/yyyy hh:mm',
            basic4_dhms: 'MM/dd/yyyy hh:mm:ss'
        };

        if (additionalFormats)
            formats = Object.assign({}, formats, additionalFormats);

        let arr = [];
        if (!Array.isArray(samples))
            arr.push(samples);
        else
            arr = samples;

        for (let j in formats)
            formats[j] = { format: formats[j], count: 0 };

        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            if (value === null || value === undefined)
                continue;

            for (let j in formats) {
                try {
                    const result = value instanceof Date || LW.Utilities.DateTime.parseDateString(value, undefined, formats[j].format);

                    if (result) {
                        formats[j].count++;
                    }
                }
                catch (error) {
                    //
                }
            }
        }

        let best = { key: undefined, count: 0 };
        for (let j in formats) {
            if (formats[j].count > best.count) {
                best.key = j;
                best.count = formats[j].count;
            }
        }

        return best.key ? formats[best.key].format : '';
    }

    _testXAxisDateFormat(groupIndex) {
        let self = this;

        let xAxis = self._getXAxis(groupIndex);
        let dataLength = self._getDataLen(groupIndex);

        let localizationFormats = {};
        if (self.localization.patterns) {
            for (let key in self.localization.patterns)
                localizationFormats['local_' + key] = self.localization.patterns[key];
        }

        let samples = [];
        for (let i = 0; i < dataLength && i < 10; i++) {
            const value = self._getDataValue(i, xAxis.dataField, groupIndex);
            if (value === null || value === undefined)
                continue;

            samples.push(value);
        }

        let dateFormat = self._detectDateFormat(samples, localizationFormats);
        return dateFormat;
    }

    _getThemeColor(which) {
        if (this.theme === 'light') {
            switch (which) {
                case 'background':
                    return '#FFFFFF';
                case 'line':
                    return '#BCBCBC';
                case 'band':
                    return '#AAAAAA';
            }
        }

        switch (which) {
            case 'background':
                return '#2E2E2E';
            case 'line':
                return '#707070';
            case 'band':
                return '#565656';
        }
    }
});
