
LW.Utilities.Assign('ConditionalFormatter', class ConditionalFormatter {
    constructor(data) {
        const that = this;

        that.data = data || [];
        //that._conditions = ['duplicate', 'greaterThan', 'lessThan', 'between', 'equal', 'notEqual', 'contains', 'doesNotContain', 'dateOccur', 'custom'];

        //Used to defined the min and max for the colorRanges
        //that.min;
        //that.max;

        //Used by almost all Conditions. Must be a HEX value
        //that.color 

        //Used by colorScales, colorBars and colorIcons. Can be a string representing the actual schemeName or a number pointing to it's index in colorSchemes
        //that.colorScheme 

        that._allowedDateComparators = ['yesterday', 'today', 'tomorrow', 'last7Days', 'lastWeek', 'thisWeek', 'nextWeek', 'lastMonth', 'thisMonth', 'nextMonth', 'lastYear', 'thisYear', 'nextYear'];
        that._colorSchemes = [
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

            //MS Excel Color Scales
            { name: 'scheme28', colors: ['#63BE7B', '#FDD17F', '#F8696B'] },
            { name: 'scheme29', colors: ['#F8696B', '#FDD17F', '#63BE7B'] },
            { name: 'scheme30', colors: ['#63BE7B', '#FCFCFF', '#F8696B'] },
            { name: 'scheme31', colors: ['#F8696B', '#FCFCFF', '#63BE7B'] },
            { name: 'scheme32', colors: ['#5A8AC6', '#FCFCFF', '#F8696B'] },
            { name: 'scheme33', colors: ['#F8696B', '#FCFCFF', '#5A8AC6'] },
            { name: 'scheme34', colors: ['#FCFCFF', '#F8696B'] },
            { name: 'scheme35', colors: ['#F8696B', '#FCFCFF'] },
            { name: 'scheme36', colors: ['#63BE7B', '#FCFCFF'] },
            { name: 'scheme37', colors: ['#FCFCFF', '#63BE7B'] },
            { name: 'scheme38', colors: ['#63BE7B', '#FFEF9C'] },
            { name: 'scheme39', colors: ['#FFEF9C', '#63BE7B'] },

            //Additional
            { name: 'scheme40', colors: ['#000000', '#8b0000 ', '#FFFF00', '#FFFFFF'] }, //Incandescent
            { name: 'scheme41', colors: ['#63BE7B', '#FDD17F ', '#F8696B', '#FF69B4'] }, //4 colors 
            { name: 'scheme42', colors: ['#63BE7B', '#FDD17F ', '#FDD17F', '#F8696B'] }, //4 colors, 2 are the same
            { name: 'scheme00', colors: ['#63BE7B', '#FDD17F', '#FDD17F', '#FDD17F', '#F8696B'] }, //5 colors, 3 are the same
        ];
    }

    /**
     * Applies the style to the cells
     */
    format(condition, columns, comparator) {
        const that = this,
            data = that.data;

        if (data.length === 0) {
            return;
        }

        if (condition) {
            that.condition = condition;
        }
        else {
            condition = that.condition;
        }

        if (!condition) {
            return;
        }

        if (that.comparator === undefined || that.comparator === null) {
            that.comparator = comparator;
        }

        if (columns) {
            that.columns = columns;
        }
        else {
            columns = that.columns;
        }

        //Validate the 'color' property
        if (that.color) {
            that.color = /^#[0-9A-F]{6}$/i.test(that.color) ? that.color : undefined;
        }

        if (!columns || !(Array.isArray(columns)) || (Array.isArray(columns) && columns.length === 0)) {
            //columns = Object.keys(data[0]);
            columns = that.columns = [];
        }

        let styles = {};

        for (let c = 0; c < columns.length; c++) {
            const columnData = columns[c];

            if (data[0][columnData] !== null && data[0][columnData] !== undefined) {
                styles[columnData] = that._validateColumnData(columnData);
            }
        }

        if (Object.keys(styles).length === 0) {
            return;
        }

        return styles;
    }

    /**
     * Applies a color scale/iconSet
     */
    _applyColorScale(items) {
        const that = this,
            itemsCount = items.length;

        function getGroupNumber(item) {
            let groupIndex = 0;

            while (groupIndex < colorGroupsCount) {
                if (item <= groupLimits[groupIndex].max) {
                    return groupIndex;
                }

                groupIndex++;
            }

            return Math.max(0, Math.min(colorGroupsCount - 1, groupIndex));
        }

        if (itemsCount === 0) {
            return;
        }

        const schemeColors = that.colorScheme !== undefined ? that._getSchemeColors() : [that.color];

        if (schemeColors.length === 0 || schemeColors[0] === undefined || schemeColors[0] === null) {
            return;
        }

        let result = {},
            groupLimits = {}, groupNumber, colorShade;
        const colorGroupsCount = schemeColors.length - (that.condition === 'iconSet' ? 0 : 1),
            columnRange = that._getColumnRange(items),
            min = parseFloat(that.min) || columnRange.min,
            max = Math.max(min, parseFloat(that.max) || columnRange.max);

        //Set the min and max for each colorGroup
        for (let g = 0; g < colorGroupsCount; g++) {
            groupLimits[g] = {
                min: groupLimits[g - 1] ? groupLimits[g - 1].max : min,
                max: min + (max - min) * ((g + 1) / colorGroupsCount)
            };
        }

        if (colorGroupsCount === 0) {
            groupLimits[0] = { min: min, max: max };
        }

        for (let i = 0; i < itemsCount; i++) {
            let itemValue = items[i] instanceof Date ? items[i].getTime() : items[i];

            itemValue = Math.min(max, Math.max(min, itemValue));

            if (typeof itemValue !== 'number') {
                continue;
            }

            groupNumber = getGroupNumber(itemValue) || 0;

            if (that.condition === 'iconSet') {
                result[i] = {
                    '--icon-set': ' ',
                    '--icon-set-color': schemeColors[groupNumber],
                    '--icon-set-rotation-angle': that._getRotationAngle((groupNumber / (colorGroupsCount - 1) || 0)) + 'deg'
                };
            }
            else {
                colorShade = 1 - ((itemValue - groupLimits[groupNumber].min) / (groupLimits[groupNumber].max - groupLimits[groupNumber].min) || 0);
                result[i] = that._getCellStyle(that._mixColors(schemeColors[groupNumber], schemeColors[Math.min(groupNumber + 1, colorGroupsCount)], colorShade));
            }
        }

        return result;
    }

    /**
     * Applies the styles for the Data Bars
     * @param {any} items
     */
    _applyColorBar(items) {
        const that = this,
            itemsCount = items.length,
            range = that._getColumnRange(items),
            min = that.min ? parseFloat(that.min) || 0 : range.min,
            max = that.max ? parseFloat(that.max) || 0 : range.max,
            gradientPosition = 'left',
            colors = that.colorScheme !== undefined ? that._getSchemeColors() : [that.color];
        let barColor,
            gradientColors = '',
            result = {};

        for (let c = 0; c < colors.length; c++) {
            if (colors[c] !== undefined && colors[c] !== null) {
                gradientColors += colors[c] + ',';
            }
        }

        if (!gradientColors) {
            // eslint-disable-next-line
            console.log('Invalid color/colorScheme detected.')
            return;
        }

        //removes the last ',' separator
        gradientColors = gradientColors.slice(0, -1);

        barColor = colors.length === 1 ? colors[0] : '-webkit-linear-gradient(' + gradientPosition + ',' + gradientColors + ')';

        for (let i = 0; i < itemsCount; i++) {
            let itemValue = items[i] instanceof Date ? items[i].getTime() : items[i];

            itemValue = Math.min(max, Math.max(min, items[i]));

            if (typeof itemValue !== 'number') {
                continue;
            }

            result[i] = { '--color-bar': ' ', '--bar-width': ((itemValue - min) / (max - min) * 100 || 0) + '%', '--bar-color': barColor };
        }

        return result;
    }

    /**
    * Applies the rule to the data
    */
    _applyRule(items) {
        const that = this,
            itemsCount = items.length,
            condition = typeof that.condition === 'string' ? that.condition.trim() : '';
        let min = parseFloat(that.min) || 0,
            max = Math.max(min, (parseFloat(that.max) || 0)), comparator, nItems, average;

        if (condition === 'dateOccur') {
            comparator = typeof that.comparator === 'string' && that._allowedDateComparators.indexOf(that.comparator.trim()) > -1 ? that.comparator.trim() : undefined;
        }
        else {
            comparator = Array.isArray(that.comparator) ? that.comparator[0].trim() : that.comparator;
        }

        function applyCondition(item) {
            switch (condition) {
                case 'between': {
                    if (item instanceof Date) {
                        item = item.getTime();
                    }

                    if (item >= min && item <= max) {
                        return item;
                    }
                    break;
                }
                case 'contains':
                    if ((item + '').indexOf(comparator) > -1) {
                        return item;
                    }
                    break;
                case 'duplicate':
                    {
                        let duplicateCounter = 0;

                        for (let i = 0; i < itemsCount; i++) {
                            if (items[i] === item) {
                                duplicateCounter++;
                            }

                            if (duplicateCounter > 1) {
                                return item;
                            }
                        }

                        break;
                    }
                case 'dateOccur': {
                    const dateRange = that._getDateRange(item, comparator)

                    if (!dateRange) {
                        break;
                    }

                    item = new Date(item);

                    if (isNaN(item.getTime())) {
                        break;
                    }

                    const itemTime = item.getTime(),
                        startTime = dateRange.min.getTime(),
                        endTime = dateRange.max.getTime();

                    if (itemTime >= startTime && itemTime <= endTime) {
                        return item;
                    }

                    break;
                }
                case 'doesNotContain':
                    if ((item + '').indexOf(comparator) < 0) {
                        return item;
                    }
                    break;
                case 'equal':
                    if (typeof item === 'number' && item === parseFloat(comparator)) {
                        return item;
                    }
                    else if (typeof item === 'string' && item.localeCompare(comparator + '') === 0) {
                        return item;
                    }
                    else if (typeof item === 'boolean' && item + '' === comparator + '') {
                        return item;
                    }
                    else if (item instanceof Date && item.getTime() === new Date(comparator).getTime()) {
                        return item;
                    }
                    break;
                case 'greaterThan':
                    if (item > parseFloat(comparator)) {
                        return item;
                    }
                    break;
                case 'lessThan':
                    if (item < parseFloat(comparator)) {
                        return item;
                    }
                    break;
                case 'notEqual':
                    if (typeof item === 'number' && item !== parseFloat(comparator)) {
                        return item;
                    }
                    else if (typeof item === 'string' && item.localeCompare(comparator + '') !== 0) {
                        return item;
                    }
                    else if (typeof item === 'boolean' && item + '' !== comparator + '') {
                        return item;
                    }
                    else if (item instanceof Date && item.getTime() !== new Date(comparator).getTime()) {
                        return item;
                    }
                    break;
                case 'topNItems':
                case 'bottomNItems':
                case 'topNPercent':
                case 'bottomNPercent':
                    if (!nItems) {
                        nItems = items.slice(0)
                            .sort(condition.indexOf('top') === 0 ? ((a, b) => a < b ? 1 : a > b ? -1 : 0) : ((a, b) => a > b ? 1 : a < b ? -1 : 0))
                            .slice(0, parseInt(condition.indexOf('Percent') > 0 ? itemsCount * comparator / 100 : comparator));
                    }

                    if (nItems.indexOf(item) > -1) {
                        return item;
                    }
                    break;
                case 'aboveAverage':
                case 'belowAverage':
                    if (!average) {
                        let total = 0;

                        items.map(item => total += parseFloat(item));
                        average = total / itemsCount;
                    }

                    if (condition === 'aboveAverage' && item > average) {
                        return item;
                    }
                    else if (condition === 'belowAverage' && item < average) {
                        return item;
                    }
                    break;
            }

            return null;
        }

        if (!items || items.length === 0) {
            return;
        }

        if (['odd', 'even', 'duplicate', 'dateOccur', 'between', 'aboveAverage', 'belowAverage'].indexOf(condition) < 0 &&
            condition.indexOf('everyN') !== 0 && (comparator === undefined || comparator === null)) {
            //Throw a warnining
            // eslint-disable-next-line
            console.warn(that.condition + ' requires a comparator.');
            return [];
        }

        if (condition === 'odd' || condition === 'even' || condition.indexOf('everyN') === 0) {
            return that._getAlternateItems(items);
        }

        let filteredItem, result = [];

        for (let i = 0; i < itemsCount; i++) {
            filteredItem = applyCondition(items[i], i);

            if (filteredItem !== undefined && filteredItem !== null) {
                result.push(i);
            }
        }

        return result;
    }

    /**
     * Possible values: 'even', 'odd', 'everyN' - where N can be any number, 'all' - when all is applied the formatting uses that.colorScheme not that.color
     * Returns the item if it's alternate
     * @param {any} itemIndex
     */
    _getAlternateItems(items) {
        const that = this,
            itemsCount = items.length,
            condition = typeof that.condition === 'string' ? that.condition.trim() : '',
            min = parseInt(that.min) || 0,
            max = Math.max(min, parseInt(that.max) || itemsCount) - 1,
            alternationTarget = parseInt(that.comparator);
        let alternateItems = [],
            alternationCounter = 0;

        for (let i = 0; i <= itemsCount; i++) {
            if (i < min) {
                continue;
            }

            if (i > max) {
                break;
            }

            if (condition === 'even' && (i + 1) % 2 === 0) {
                alternateItems.push(i);
            }
            else if (condition === 'odd' && (i + 1) % 2 !== 0) {
                alternateItems.push(i);
            }
            else if (alternationTarget !== undefined && !isNaN(alternationTarget)) {
                if (alternationCounter === alternationTarget) {
                    alternateItems.push(i);
                    alternationCounter = 0;
                }
                else {
                    alternationCounter++;
                }
            }
        }

        return alternateItems;
    }

    /**
    * Returns the min and max values in the Array
    * @param {any} items
    */
    _getColumnRange(items) {
        const itemsCount = items.length;
        let min, itemValue,
            max = 0;

        //Find the min and max in the array
        for (let i = 0; i < itemsCount; i++) {
            itemValue = items[i];

            if (itemValue instanceof Date) {
                itemValue = itemValue.getTime();
            }

            if (itemValue > max) {
                max = itemValue;
            }

            if (min === undefined) {
                min = itemValue;
            }

            if (itemValue < min) {
                min = itemValue;
            }
        }

        return { min: parseFloat(min) || 0, max: parseFloat(max) || 0 };
    }

    /**
     * Returns the style of the cell
     * @param {any} hexColor
     * @param {any} opacity
     */
    _getCellStyle(hexColor, opacity) {
        var background = this._hexToRgba(hexColor, opacity).toString();
        var border = hexColor;
        var color = this._getTextElementByColor(this._hexToRgba(hexColor, 0.7));

        return { background: background, color: color, border: border };
    }

    /**
     * Returns the Date Range Condtition for 'DateOccurance' formatting
     * @param {any} itemDate
     */
    _getDateRange(itemDate, comparator) {
        const targetDate = new Date(itemDate);
        let max, min;

        if (!(targetDate instanceof Date) || !comparator) {
            return;
        }

        const today = new Date();

        switch (comparator) {
            case 'yesterday':
            case 'today':
            case 'tomorrow': {
                if (comparator === 'yesterday') {
                    min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                }
                else if (comparator === 'today') {
                    min = new Date();
                    min.setHours(0, 0, 0, 0);
                }
                else {
                    min = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                }

                max = min;
                break;
            }
            case 'last7Days':
                min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
                max = new Date(today);
                break;
            case 'lastWeek':
            case 'thisWeek':
            case 'nextWeek':
                if (comparator === 'lastWeek') {
                    min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6 - today.getDay());
                }
                else if (comparator === 'thisWeek') {
                    min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - Math.abs(1 - today.getDay()));
                }
                else {
                    min = new Date(today.getFullYear(), today.getMonth(), today.getDate() + Math.abs(7 - today.getDay()));
                }

                max = new Date(min.getFullYear(), min.getMonth(), min.getDate() + 6);
                break;
            case 'lastMonth':
            case 'thisMonth':
            case 'nextMonth':
                if (comparator === 'lastMonth') {
                    max = new Date(today.getFullYear(), today.getMonth(), 0);
                    min = new Date(max.getFullYear(), max.getMonth(), 1);
                }
                else if (comparator === 'thisMonth') {
                    min = new Date(today.getFullYear(), today.getMonth(), 1);
                    max = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                }
                else {
                    min = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                    max = new Date(today.getFullYear(), today.getMonth() + 2, 0);
                }

                break;
            case 'lastYear':
            case 'thisYear':
            case 'nextYear':
                if (comparator === 'lastYear') {
                    min = new Date(today.getFullYear() - 1, 0, 1);
                    max = new Date(today.getFullYear() - 1, 12, 0);
                }
                else if (comparator === 'thisYear') {
                    min = new Date(today.getFullYear(), 0, 1);
                    max = new Date(today.getFullYear(), 12, 0);
                }
                else {
                    min = new Date(today.getFullYear() + 1, 0, 1);
                    max = new Date(today.getFullYear() + 1, 12, 0);
                }

                break;
        }

        return { min: min, max: max };
    }

    /**
    * Validates the rotation angle for the Icon Set and returns it. The angle must be in the range 0 - 180 deg and it's always a 'perfect' angle
    * Perfect angles are those that devide by 2 without residue. Example: 0, 45, 90, 135, 180, etc ...
    * @param {any} angle
    */
    _getRotationAngle(angle) {
        let validAngle = angle;

        if (angle < 0.25) {
            validAngle = Math.round(angle) ? 0.25 : 0;
        }
        else if (angle > 0.25 && angle < 0.5) {
            validAngle = Math.round(angle) ? 0.5 : 0.25;
        }
        else if (angle > 0.5 && angle < 0.75) {
            validAngle = Math.round(angle) ? 0.75 : 0.5;
        }
        else if (angle > 0.75 && angle < 1) {
            validAngle = Math.round(angle) ? 1 : 0.75;
        }

        return validAngle * 180;
    }

    /**
   * Returns the desired scheme colors depending on the schosen colorScheme
   */
    _getSchemeColors() {
        const that = this;
        let schemeColors;

        if (typeof that.colorScheme === 'string') {
            schemeColors = that.colorScheme.indexOf('scheme') === 0 ? that._colorSchemes.filter(colorScheme => colorScheme.name === that.colorScheme)[0] : undefined;
        }
        else if (typeof that.colorScheme === 'number') {
            schemeColors = that._colorSchemes[that.colorScheme] ? that._colorSchemes[that.colorScheme] : undefined;
        }
        else {
            return [];
        }

        return schemeColors = typeof schemeColors === 'object' ? schemeColors.colors : that._colorSchemes[0].colors;
    }

    /**
    * Returns the color of the text
    * @param {any} color
    */
    _getTextElementByColor(color) {
        //nThreshold - 128
        return (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114) >= 125 ? 'Black' : 'White';
    }

    /**
    * Converts HEX to RGB
    * @param {any} hex - hexademical representation of a color
    * @param {any} alpha - the alpha ot the color ( transparency )
    */
    _hexToRgba(hex, alpha) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var toString = function () {
            if (this.alpha > 1 || this.alpha === undefined || this.alpha === null) {
                this.alpha = 1;
            }
            else if (this.alpha < 0) {
                this.alpha = 0;
            }

            return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
        }
        if (alpha === undefined) {
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                toString: toString
            } : null;
        }
        if (alpha > 1) {
            alpha = 1;
        }
        else if (alpha < 0) {
            alpha = 0;
        }
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            alpha: alpha,
            toString: toString
        } : null;
    }

    /**
     * Mixes two colors with a shade 
     * @param {any} colorA - HEX value of colorA
     * @param {any} colorB - HEX value of colorB
     * @param {any} shade - from 0 to 1
     */
    _mixColors(colorA, colorB, shade) {
        const decToHex = d => d.toString(16),
            hexToDec = h => parseInt(h, 16);
        let mixedColorPair,
            colorBlend = '#';

        shade = (typeof (shade) !== 'undefined') ? shade : 0.5;

        //Remove the # sign
        colorA = colorA.replace(/#/g, '');
        colorB = colorB.replace(/#/g, '');

        // Get the R,G,B value pairs
        for (let i = 0; i <= 5; i += 2) {
            const colorPair1 = hexToDec(colorA.substr(i, 2)),
                colorPair2 = hexToDec(colorB.substr(i, 2));

            //Mixing the pairs from every color by appling specified shade
            mixedColorPair = decToHex(Math.floor(colorPair2 + (colorPair1 - colorPair2) * (shade)));

            //Adds a leading zero if value is shorter
            while (mixedColorPair.length < 2) {
                mixedColorPair = '0' + mixedColorPair;
            }

            colorBlend += mixedColorPair;
        }

        //Return the new color as a HEX value by prepending the # sign
        return colorBlend;
    }

    /**
     * Returns a shade of a color
     * @param {any} color
     * @param {any} percent
     */
    _shadeColor(color, percent) {
        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

    /**
     * Returns the matching rows and their styles
     * @param {any} column
     */
    _validateColumnData(column) {
        const that = this,
            records = [],
            data = that.data;
        let result = {},
            rows;

        for (let d = 0; d < data.length; d++) {
            records.push(data[d][column]);
        }

        //Apply colorSchemes
        if (that.condition === 'colorScale' || that.condition === 'iconSet') {
            return that._applyColorScale(records);
        }

        if (that.condition === 'colorBar') {
            return that._applyColorBar(records);
        }

        rows = that._applyRule(records);

        if (!rows) {
            return;
        }

        if (!that.color) {
            //Throw a Warning
            // eslint-disable-next-line
            console.warn('No color is provided. "color" property is not set.')
            return;
        }

        for (let r = 0; r < rows.length; r++) {
            result[rows[r]] = that._getCellStyle(that.color);
        }

        return result;
    }
});