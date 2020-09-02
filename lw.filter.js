
LW.Utilities.Assign('FilterGroup', class FilterGroup {
    constructor() {
        const that = this;

        that.stringConditions = ['EMPTY', 'NOT_EMPTY', 'CONTAINS', 'CONTAINS_CASE_SENSITIVE',
            'DOES_NOT_CONTAIN', 'DOES_NOT_CONTAIN_CASE_SENSITIVE', 'STARTS_WITH', 'STARTS_WITH_CASE_SENSITIVE',
            'ENDS_WITH', 'ENDS_WITH_CASE_SENSITIVE', 'EQUAL', 'NOT_EQUAL', 'EQUAL_CASE_SENSITIVE', 'NOT_EQUAL_CASE_SENSITIVE', 'NULL', 'NOT_NULL'];
        that.numericConditions = ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN', 'GREATER_THAN_OR_EQUAL', 'NULL', 'NOT_NULL'];
        that.dateConditions = ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN', 'GREATER_THAN_OR_EQUAL', 'NULL', 'NOT_NULL'];
        that.booleanConditions = ['EQUAL', 'NOT_EQUAL', 'NULL', 'NOT_NULL'];

        that.filters = new Array();
        that.logicalOperators = new Array();
    }

    evaluate(value) {
        const that = this;
        let result = true;

        for (let i = 0; i < that.filters.length; i++) {
            let currentResult = that.filters[i].evaluate(value);

            if (i === 0) {
                result = currentResult;
            }
            else {
                if (that.logicalOperators[i] === 1 || that.logicalOperators[i] === 'or') {
                    result = result || currentResult;
                }
                else {
                    result = result && currentResult;
                }
            }
        }

        return result;
    }

    getFiltersCount() {
        return this.filters.length;
    }

    setConditions(filterType, conditions) {
        const that = this;

        switch (filterType) {
            case 'numeric':
                that.numericConditions = conditions;
                break;
            case 'string':
                that.stringConditions = conditions;
                break;
            case 'date':
            case 'time':
                that.dateConditions = conditions;
                break;
            case 'bool':
            case 'boolean':
                that.booleanConditions = conditions;
                break;
        }
    }

    getConditions(filterType) {
        const that = this;
        let array = new Array();

        switch (filterType) {
            case 'numeric':
                array = that.numericConditions.slice(0);
                break;
            case 'string':
                array = that.stringConditions.slice(0);
                break;
            case 'date':
            case 'time':
                array = that.dateConditions.slice(0);
                break;
            case 'bool':
            case 'boolean':
                array = that.booleanConditions.slice(0);
                break;
        }
        return array;
    }

    generateFilterKey() {
        const S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + '-' + S4() + '-' + S4());
    }

    createFilter(filterType, filterValue, filterCondition, customfilter, formatString, locale, timeOnly) {
        if (filterType === null || filterType === undefined) {
            return null;
        }

        switch (filterType) {
            case 'int':
            case 'float':
            case 'int64':
            case 'double':
            case 'numeric':
            case 'number':
            case 'numericFilter':
                return new LW.Utilities.NumericFilter(filterValue, filterCondition.toUpperCase());
            case 'string':
            case 'stringFilter':
                return new LW.Utilities.StringFilter(filterValue, filterCondition.toUpperCase(), locale);
            case 'date':
            case 'time':
            case 'dateFilter':
                return new LW.Utilities.DateFilter(filterValue, filterCondition.toUpperCase(), formatString, locale, timeOnly);
            case 'bool':
            case 'boolean':
            case 'booleanFilter':
                return new LW.Utilities.BooleanFilter(filterValue, filterCondition.toUpperCase());
            case 'custom':
                return new LW.Utilities.CustomFilter(filterValue, filterCondition.toUpperCase(), customfilter);
        }

        throw new Error('lwGrid: There is no such filter type. The available filter types are: "numericFilter", "stringFilter", "dateFilter" and "booleanFilter"');
    }

    getFilters() {
        const that = this;
        let filtersArray = new Array();

        for (let i = 0; i < that.filters.length; i++) {
            const filter = that.filters[i];

            if (filter instanceof FilterGroup) {
                let filters = filter.getFilters();

                filtersArray.push({ value: filters, logicalOperator: that.logicalOperators[i], type: 'FilterGroup' });
            }
            else {
                const filterObject = { value: filter.value, condition: filter.condition, logicalOperator: that.logicalOperators[i], type: filter.type };

                if (filter.data) {
                    filterObject.id = filter.data;
                }

                filtersArray.push(filterObject);
            }
        }

        return filtersArray;
    }

    addFilter(logicalOperator, filter) {
        const that = this;

        that.filters[that.filters.length] = filter;
        filter.key = that.generateFilterKey();
        that.logicalOperators[that.logicalOperators.length] = logicalOperator;
    }

    removeFilter(filter) {
        const that = this;

        for (let i = 0; i < that.filters.length; i++) {
            if (that.filters[i].key === filter.key) {
                that.filters.splice(i, 1);
                that.logicalOperators.splice(i, 1);
                break;
            }
        }
    }

    getOperatorAt(index) {
        const that = this;

        if (index === undefined || index === null) {
            return null;
        }

        if (index < 0 || index > that.filters.length) {
            return null;
        }

        return that.logicalOperators[index];
    }

    setOperatorAt(index, logicalOperator) {
        const that = this;

        if (index === undefined || index === null) {
            return null;
        }

        if (index < 0 || index > that.filters.length) {
            return null;
        }

        that.logicalOperators[logicalOperator] = logicalOperator;
    }

    getFilterAt(index) {
        const that = this;

        if (index === undefined || index === null) {
            return null;
        }

        if (index < 0 || index > that.filters.length) {
            return null;
        }

        return that.filters[index];
    }

    setFilterAt(index, filter) {
        const that = this;

        if (index === undefined || index === null) {
            return null;
        }

        if (index < 0 || index > that.filters.length) {
            return null;
        }

        filter.key = that.generateFilterKey();
        that.filters[index] = filter;
    }

    clear() {
        const that = this;

        that.filters = new Array();
        that.logicalOperators = new Array();
    }

    getUniqueValues(details, context) {
        const data = details.data,
            uniqueValues = [],
            treeViewSource = [],
            timeOnly = details.filterType === 'dateFilter' && details.displayMode === 'timePicker';
        let compareFunction,
            blanks = false;

        for (let i = 0; i < data.length; i++) {
            let currentValue = data[i][details.dataField];

            if (currentValue === '' || currentValue === null || currentValue === undefined) {
                blanks = true;
                continue;
            }

            let label;

            if (timeOnly) {
                label = new LW.Utilities.DateTime(currentValue).toString(details.formatString);
            }
            else {
                label = currentValue.toString();
            }

            if (uniqueValues.indexOf(label) === -1) {
                uniqueValues.push(label);
                treeViewSource.push({ label: label, value: currentValue, customAttribute: 'default-item' });
            }
        }

        switch (details.filterType) {
            case 'numericFilter':
            case 'booleanFilter':
                compareFunction = function (a, b) {
                    return a.value - b.value;
                };
                break;
            case 'stringFilter':
                compareFunction = function (a, b) {
                    return new Intl.Collator().compare(a.value, b.value);
                };
                break;
            case 'dateFilter':
                if (timeOnly) {
                    compareFunction = function (a, b) {
                        try {
                            const aHours = a.value.getHours(),
                                bHours = b.value.getHours();

                            if (aHours !== bHours) {
                                return aHours - bHours;
                            }

                            const aMinutes = a.value.getMinutes(),
                                bMinutes = b.value.getMinutes();

                            if (aMinutes !== bMinutes) {
                                return aMinutes - bMinutes;
                            }

                            const aSeconds = a.value.getSeconds(),
                                bSeconds = b.value.getSeconds();

                            if (aSeconds !== bSeconds) {
                                return aSeconds - bSeconds;
                            }

                            return 0;
                        }
                        catch (error) {
                            return -1;
                        }
                    };
                }
                else {
                    compareFunction = function (a, b) {
                        try {
                            return a.value.getTime() - b.value.getTime();
                        }
                        catch (error) {
                            return -1;
                        }
                    };
                }

                break;
        }

        treeViewSource.sort(compareFunction);

        if (details.filterType === 'booleanFilter') {
            treeViewSource.map(function (item) {
                item.label = item.label.toUpperCase();
            });
        }

        if (blanks) {
            treeViewSource.push({ label: context.localize('blanks'), value: '', customAttribute: 'default-item' });
        }

        return treeViewSource;
    }
});

LW.Utilities.Assign('StringFilter', class StringFilter {
    constructor(filterValue, condition, locale) {
        const that = this;

        that.value = filterValue;
        that.condition = condition;
        that.locale = locale || 'en';
        that.type = 'stringFilter';
    }

    evaluate(value) {
        const that = this,
            filterValue = that.value,
            condition = that.condition;

        if (value === null || value === undefined || value === '') {
            if (condition === 'NULL')
                return true;

            if (condition === 'EQUAL' && value === filterValue) {
                return true;
            }

            if (condition === 'NOT_EQUAL' && value !== filterValue) {
                return true;
            }

            if (condition !== 'EMPTY')
                return false;
            else if (value === '')
                return true;
        }

        let val = '';

        try {
            val = value.toString();
        }
        catch (error) {
            return true;
        }

        const compare = function (val, filterValue) {
            const locale = that.locale;

            switch (condition) {
                case 'EQUAL':
                    return val.localeCompare(filterValue, locale, { sensitivity: 'accent' }) === 0;
                case 'EQUAL_CASE_SENSITIVE':
                    return val.localeCompare(filterValue, locale, { sensitivity: 'variant' }) === 0;
                case 'NOT_EQUAL':
                    return val.localeCompare(filterValue, locale, { sensitivity: 'accent' }) !== 0;
                case 'NOT_EQUAL_CASE_SENSITIVE':
                    return val.localeCompare(filterValue, locale, { sensitivity: 'variant' }) !== 0;
                case 'CONTAINS':
                    return val.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
                case 'CONTAINS_CASE_SENSITIVE':
                    return val.indexOf(filterValue) !== -1;
                case 'DOES_NOT_CONTAIN':
                    return val.toLowerCase().indexOf(filterValue.toLowerCase()) === -1;
                case 'DOES_NOT_CONTAIN_CASE_SENSITIVE':
                    return val.indexOf(filterValue) === -1;
                case 'EMPTY':
                    return val === '';
                case 'NOT_EMPTY':
                    return val !== '';
                case 'NOT_NULL':
                    return val !== null;
                case 'STARTS_WITH':
                    val = val.substring(0, filterValue.length);
                    return val.localeCompare(filterValue, locale, { sensitivity: 'accent' }) === 0;
                case 'ENDS_WITH':
                    val = val.substring(val.length - filterValue.length, val.length);
                    return val.localeCompare(filterValue, locale, { sensitivity: 'accent' }) === 0;
                case 'ENDS_WITH_CASE_SENSITIVE':
                    val = val.substring(val.length - filterValue.length, val.length);
                    return val.localeCompare(filterValue, locale, { sensitivity: 'variant' }) === 0;
                case 'STARTS_WITH_CASE_SENSITIVE':
                    val = val.substring(0, filterValue.length);
                    return val.localeCompare(filterValue, locale, { sensitivity: 'variant' }) === 0;
                default:
                    return false;
            }
        }

        const filterValues = new Array();

        if (filterValue && filterValue.indexOf)
            if (filterValue.indexOf('|') >= 0 || filterValue.indexOf(' AND ') >= 0 || filterValue.indexOf(' OR ') >= 0 || filterValue.indexOf(' and ') >= 0 || filterValue.indexOf(' or ') >= 0) {
                const result = compare(val, filterValue);

                if (result) {
                    return result;
                }

                const andLowerCaseFilters = filterValue.indexOf(' and ') >= 0 ? filterValue.split(' and ') : new Array(),
                    orLowerCaseFilters = filterValue.indexOf(' or ') >= 0 ? filterValue.split(' or ') : new Array(),
                    delimiterFilters = filterValue.indexOf('|') >= 0 ? filterValue.split('|') : new Array();
                let andFilters = filterValue.indexOf(' AND ') >= 0 ? filterValue.split(' AND ') : new Array(),
                    orFilters = filterValue.indexOf(' OR ') >= 0 ? filterValue.split(' OR ') : new Array();

                if (delimiterFilters.length > 0) {
                    for (let i = 0; i < delimiterFilters.length; i++) {
                        delimiterFilters[i] = delimiterFilters[i].trim;
                    }
                }

                const commaFilters = filterValue.indexOf(' ') >= 0 ? filterValue.split(' ') : new Array();

                if (commaFilters.length > 0) {
                    for (let i = 0; i < commaFilters.length; i++) {
                        commaFilters[i] = commaFilters[i].trim;
                    }
                }

                andFilters = andFilters.concat(commaFilters);
                andFilters = andFilters.concat(andLowerCaseFilters);
                orFilters = orFilters.concat(delimiterFilters);
                orFilters = orFilters.concat(orLowerCaseFilters);

                if (andFilters.length > 0) {
                    for (let i = 0; i < andFilters.length; i++) {
                        if (!andFilters[i].indexOf(' OR ') >= 0) {
                            filterValues.push(andFilters[i]);
                        }
                    }
                }
                if (orFilters.length > 0) {
                    for (let i = 0; i < orFilters.length; i++) {
                        if (!orFilters[i].indexOf(' AND ') >= 0) {
                            filterValues.push(orFilters[i]);
                        }
                    }
                }

                let filterresult = undefined;

                for (let j = 0; j < filterValues.length; j++) {
                    const value = filterValues[j],
                        result = compare(val, value),
                        filteroperator = j < andFilters.length ? 'and' : 'or';

                    if (filterresult === undefined) {
                        filterresult = result;
                    }
                    else {
                        if (filteroperator === 'or') {
                            filterresult = filterresult || result;
                        }
                        else {
                            filterresult = filterresult && result;
                        }
                    }
                }
                return filterresult;
            }

        return compare(val, filterValue);
    }
});

LW.Utilities.Assign('BooleanFilter', class BooleanFilter {
    constructor(filterValue, condition) {
        const that = this;

        that.value = filterValue;
        that.condition = condition;
        that.type = 'booleanFilter';
    }

    evaluate(value) {
        const that = this,
            filterValue = that.value,
            condition = that.condition;

        const val = value;

        switch (condition) {
            case 'EQUAL':
                return val === filterValue;
            case 'NOT_EQUAL':
                return val !== filterValue;
            case 'NULL':
                return value === null || value === undefined || value === '';
            case 'NOT_NULL':
                return !(value === null || value === undefined || value === '');
            default:
                return false;
        }
    }
});

LW.Utilities.Assign('NumericFilter', class NumericFilter {
    constructor(filterValue, condition) {
        const that = this;

        that.value = filterValue;
        that.condition = condition;
        that.type = 'numericFilter';
    }

    evaluate(value) {
        const that = this;
        let filterValue = that.value,
            condition = that.condition;

        if (value === null || value === undefined || value === '') {
            if (condition === 'NOT_NULL')
                return false;

            if (condition === 'NULL')
                return true;
            else {
                switch (condition) {
                    case 'EQUAL':
                        return value === filterValue;
                    case 'NOT_EQUAL':
                        return value !== filterValue;
                }
                return false;
            }
        }
        else {
            if (condition === 'NULL')
                return false;

            if (condition === 'NOT_NULL')
                return true;
        }

        let val = value;

        try {
            val = parseFloat(val);
        }
        catch (error) {
            if (value.toString() !== '')
                return false;
        }

        const compare = function (val, filterValue) {
            if (typeof val === 'number' && typeof filterValue !== 'number') {
                filterValue = parseFloat(filterValue);
            }

            switch (condition) {
                case 'EQUAL':
                    return val === filterValue;
                case 'NOT_EQUAL':
                    return val !== filterValue;
                case 'GREATER_THAN':
                    return val > filterValue;
                case 'GREATER_THAN_OR_EQUAL':
                    return val >= filterValue;
                case 'LESS_THAN':
                    return val < filterValue;
                case 'LESS_THAN_OR_EQUAL':
                    return val <= filterValue;
                case 'STARTS_WITH':
                    filterValue = filterValue.toString().toLowerCase();
                    return val.toString().toLowerCase().substring(0, filterValue.length) === filterValue;
                case 'ENDS_WITH':
                    val = val.toString().toLowerCase();
                    filterValue = filterValue.toString().toLowerCase();
                    return val.substring(val.length - filterValue.length, val.length) === filterValue;
                case 'ENDS_WITH_CASE_SENSITIVE':
                    val = val.toString();
                    filterValue = filterValue.toString();
                    return val.substring(val.length - filterValue.length, val.length) === filterValue;
                case 'STARTS_WITH_CASE_SENSITIVE':
                    filterValue = filterValue.toString();
                    return val.toString().substring(0, filterValue.length) === filterValue;
                case 'CONTAINS':
                    return val.toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) !== -1;
                case 'CONTAINS_CASE_SENSITIVE':
                    return val.toString().indexOf(filterValue.toString()) !== -1;
                case 'DOES_NOT_CONTAIN':
                    return val.toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) === -1;
                case 'DOES_NOT_CONTAIN_CASE_SENSITIVE':
                    return val.toString().indexOf(filterValue.toString()) === -1;
                default:
                    return true;
            }
        }

        let filterValues = new Array();

        if (filterValue && filterValue.indexOf)
            if (filterValue.indexOf('|') >= 0 || filterValue.indexOf(' AND ') >= 0 || filterValue.indexOf(' OR ') >= 0 || filterValue.indexOf(' and ') >= 0 || filterValue.indexOf(' or ') >= 0) {
                let result = compare(val, filterValue);

                if (result) {
                    return result;
                }

                filterValue = filterValue.toString();
                const andLowerCaseFilters = filterValue.indexOf(' and ') >= 0 ? filterValue.split(' and ') : new Array(),
                    orLowerCaseFilters = filterValue.indexOf(' or ') >= 0 ? filterValue.split(' or ') : new Array(),
                    delimiterFilters = filterValue.indexOf('|') >= 0 ? filterValue.split('|') : new Array();
                let andFilters = filterValue.indexOf(' AND ') >= 0 ? filterValue.split(' AND ') : new Array(),
                    orFilters = filterValue.indexOf(' OR ') >= 0 ? filterValue.split(' OR ') : new Array();

                andFilters = andFilters.concat(andLowerCaseFilters);
                orFilters = orFilters.concat(orLowerCaseFilters);
                if (delimiterFilters.length > 0) {
                    for (let i = 0; i < delimiterFilters.length; i++) {
                        delimiterFilters[i] = delimiterFilters[i].trim;
                    }
                }
                orFilters = orFilters.concat(delimiterFilters);

                if (andFilters.length > 0) {
                    for (let i = 0; i < andFilters.length; i++) {
                        if (!andFilters[i].indexOf(' OR ') >= 0) {
                            filterValues.push(andFilters[i]);
                        }
                    }
                }
                if (orFilters.length > 0) {
                    for (let i = 0; i < orFilters.length; i++) {
                        if (!orFilters[i].indexOf(' AND ') >= 0) {
                            filterValues.push(orFilters[i]);
                        }
                    }
                }

                let filterresult = undefined;

                for (let j = 0; j < filterValues.length; j++) {
                    const value = filterValues[j];

                    if (value && value.indexOf && value.indexOf('..') >= 0) {
                        const values = value.toString().split('..');

                        if (values.length === 2) {
                            result = val >= values[0] && val <= values[1];
                        }
                    }
                    else {
                        result = compare(val, value);
                    }

                    const filteroperator = j < andFilters.length ? 'and' : 'or';

                    if (filterresult === undefined) {
                        filterresult = result;
                    }
                    else {
                        if (filteroperator === 'or') {
                            filterresult = filterresult || result;
                        }
                        else {
                            filterresult = filterresult && result;
                        }
                    }
                }
                return filterresult;
            }
        if (filterValue && filterValue.indexOf && filterValue.indexOf('..') >= 0) {
            filterValues = filterValue.toString().split('..');
            if (filterValues.length === 2) {
                return val >= filterValues[0] && val <= filterValues[1];
            }
        }
        return compare(val, filterValue);
    }
});

LW.Utilities.Assign('DateFilter', class DateFilter {
    constructor(filterValue, condition, formatString, locale, timeOnly) {
        const that = this,
            parseAttemptDateTime = new LW.Utilities.DateTime();

        that.value = filterValue;
        that.type = 'dateFilter';

        if (formatString !== undefined) {
            const parsedDate = parseAttemptDateTime.parseDate(filterValue, formatString);

            if (parsedDate !== null) {
                that.filterdate = parsedDate;
            }
            else {
                const result = parseAttemptDateTime.tryparseDate(filterValue);

                if (result !== null) {
                    that.filterdate = result;
                }
            }
        }
        else {
            const tmpvalue = new Date(filterValue);

            if (tmpvalue.toString() === 'NaN' || tmpvalue.toString() === 'Invalid Date') {
                that.filterdate = parseAttemptDateTime.tryparseDate(filterValue);
            }
            else {
                that.filterdate = tmpvalue;
            }
        }
        if (!that.filterdate) {
            const tmpvalue = new Date(filterValue);

            if (tmpvalue.toString() === 'NaN' || tmpvalue.toString() === 'Invalid Date') {
                that.filterdate = parseAttemptDateTime.tryparseDate(filterValue);
            }
            else {
                that.filterdate = tmpvalue;
            }
        }

        that.condition = condition;
        that.formatString = formatString;
        that.timeOnly = timeOnly;
    }

    evaluate(value) {
        const that = this,
            condition = that.condition,
            formatString = that.formatString;
        let filterValue = that.value;

        if (that.timeOnly) {
            return that.evaluateTimeOnly(value);
        }

        if (value === null || value === undefined || value === '') {
            if (condition === 'NOT_NULL') {
                return false;
            }

            if (condition === 'NULL') {
                return true;
            }
            else {
                switch (condition) {
                    case 'EQUAL':
                        return value === filterValue;
                    case 'NOT_EQUAL':
                        return value !== filterValue;
                }
                return false;
            }
        }
        else {
            if (condition === 'NULL')
                return false;

            if (condition === 'NOT_NULL')
                return true;
        }

        let val = new Date(),
            compareTimePart;

        val.setFullYear(1900, 0, 1);
        val.setHours(12, 0, 0, 0);

        try {
            const parseAttemptDateTime = new LW.Utilities.DateTime(),
                tmpvalue = new Date(value);

            if (tmpvalue.toString() === 'NaN' || tmpvalue.toString() === 'Invalid Date') {
                value = parseAttemptDateTime.tryparseDate(value);
            }
            else {
                value = tmpvalue;
            }

            val = value;
            compareTimePart = false;

            if (formatString !== undefined) {
                if (formatString.indexOf('t') >= 0 || formatString.indexOf('T') >= 0 || formatString.indexOf(':') >= 0 || formatString.indexOf('f') >= 0) {
                    compareTimePart = true;
                    if (filterValue && filterValue.toString().indexOf(':') === -1) {
                        const result = parseAttemptDateTime.tryparseDate(filterValue.toString() + ':00');

                        if (result !== null) {
                            that.filterdate = result;
                        }
                    }
                }
            }
            if (!compareTimePart) {
                val.setHours(0);
                val.setMinutes(0);
                val.setSeconds(0);
            }
        }
        catch (error) {
            if (value.toString() !== '')
                return false;
        }

        if (that.filterdate !== null) {
            filterValue = that.filterdate;
        }
        else if (filterValue && filterValue.indexOf &&
            (filterValue.indexOf(':') !== -1 || !isNaN(parseInt(filterValue)))) {

            const tmpFilter = new Date(val);

            tmpFilter.setHours(12, 0, 0, 0);

            const timeStrings = filterValue.split(':');

            for (let i = 0; i < timeStrings.length; i++) {
                if (i === 0) {
                    tmpFilter.setHours(timeStrings[i]);
                }
                if (i === 1) {
                    tmpFilter.setMinutes(timeStrings[i]);
                }
                if (i === 2) {
                    tmpFilter.setSeconds(timeStrings[i]);
                }
            }

            filterValue = tmpFilter;
        }

        if (compareTimePart) {
            if (filterValue && filterValue.setFullYear) {
                if (val && val.getFullYear) {
                    if (formatString.indexOf('d') === -1 && formatString.indexOf('M') === -1 && formatString.indexOf('y') === -1) {
                        filterValue.setFullYear(val.getFullYear(), val.getMonth(), val.getDate());
                    }
                }
            }
        }

        const compare = function (val, filterValue) {
            if (val === null) val = '';
            switch (condition) {
                case 'EQUAL':
                    return val.toString() === filterValue.toString();
                case 'NOT_EQUAL':
                    return val.toString() !== filterValue.toString();
                case 'GREATER_THAN':
                    return val > filterValue;
                case 'GREATER_THAN_OR_EQUAL':
                    return val >= filterValue;
                case 'LESS_THAN':
                    return val < filterValue;
                case 'LESS_THAN_OR_EQUAL':
                    return val <= filterValue;
                case 'STARTS_WITH':
                    filterValue = filterValue.toString().toLowerCase();
                    return val.toString().toLowerCase().substring(0, filterValue.length) === filterValue;
                case 'ENDS_WITH':
                    val = val.toString().toLowerCase();
                    filterValue = filterValue.toString().toLowerCase();
                    return val.substring(val.length - filterValue.length, val.length) === filterValue;
                case 'ENDS_WITH_CASE_SENSITIVE':
                    val = val.toString();
                    filterValue = filterValue.toString();
                    return val.substring(val.length - filterValue.length, val.length) === filterValue;
                case 'STARTS_WITH_CASE_SENSITIVE':
                    filterValue = filterValue.toString();
                    return val.toString().substring(0, filterValue.length) === filterValue;
                case 'CONTAINS':
                    return val.toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) !== -1;
                case 'CONTAINS_CASE_SENSITIVE':
                    return val.toString().indexOf(filterValue.toString()) !== -1;
                case 'DOES_NOT_CONTAIN':
                    return val.toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) === -1;
                case 'DOES_NOT_CONTAIN_CASE_SENSITIVE':
                    return val.toString().indexOf(filterValue.toString()) === -1;
                default:
                    return true;
            }
        }

        let filterValues = new Array();

        if (filterValue && filterValue.indexOf)
            if (filterValue.indexOf('|') >= 0 || filterValue.indexOf(' AND ') >= 0 || filterValue.indexOf(' OR ') >= 0 || filterValue.indexOf(' and ') >= 0 || filterValue.indexOf(' or ') >= 0) {
                let result = compare(val, filterValue);

                if (result) {
                    return result;
                }

                const andLowerCaseFilters = filterValue.indexOf(' and ') >= 0 ? filterValue.split(' and ') : new Array(),
                    orLowerCaseFilters = filterValue.indexOf(' or ') >= 0 ? filterValue.split(' or ') : new Array(),
                    delimiterFilters = filterValue.indexOf('|') >= 0 ? filterValue.split('|') : new Array();
                let andFilters = filterValue.indexOf(' AND ') >= 0 ? filterValue.split(' AND ') : new Array(),
                    orFilters = filterValue.indexOf(' OR ') >= 0 ? filterValue.split(' OR ') : new Array();

                andFilters = andFilters.concat(andLowerCaseFilters);
                orFilters = orFilters.concat(orLowerCaseFilters);
                if (delimiterFilters.length > 0) {
                    for (let i = 0; i < delimiterFilters.length; i++) {
                        delimiterFilters[i] = delimiterFilters[i].trim;
                    }
                }
                orFilters = orFilters.concat(delimiterFilters);

                if (andFilters.length > 0) {
                    for (let i = 0; i < andFilters.length; i++) {
                        if (!andFilters[i].indexOf(' OR ') >= 0) {
                            filterValues.push(andFilters[i]);
                        }
                    }
                }
                if (orFilters.length > 0) {
                    for (let i = 0; i < orFilters.length; i++) {
                        if (!orFilters[i].indexOf(' AND ') >= 0) {
                            filterValues.push(orFilters[i]);
                        }
                    }
                }

                let filterresult = undefined;

                for (let j = 0; j < filterValues.length; j++) {
                    const value = filterValues[j];
                    if (value && value.indexOf && value.indexOf('..') >= 0) {
                        const values = value.toString().split('..');
                        if (values.length === 2) {
                            result = val >= values[0] && val <= values[1];
                        }
                    }
                    else {
                        result = compare(val, value);
                    }

                    const filteroperator = j < andFilters.length ? 'and' : 'or';

                    if (filterresult === undefined) {
                        filterresult = result;
                    }
                    else {
                        if (filteroperator === 'or') {
                            filterresult = filterresult || result;
                        }
                        else {
                            filterresult = filterresult && result;
                        }
                    }
                }

                return filterresult;
            }
        if (filterValue && filterValue.indexOf && filterValue.indexOf('..') >= 0) {
            filterValues = filterValue.toString().split('..');
            if (filterValues.length === 2) {
                return val >= filterValues[0] && val <= filterValues[1];
            }
        }
        return compare(val, filterValue);
    }

    evaluateTimeOnly(value) {
        const that = this,
            filterValue = that.value;

        if (!filterValue) {
            if (!value) {
                return true;
            }

            return false;
        }
        else if (!value || !(value instanceof Date)) {
            return false;
        }

        const valueHours = value.getHours(),
            filterValueHours = filterValue.getHours();

        if (valueHours !== filterValueHours) {
            return false;
        }

        const valueMinutes = value.getMinutes(),
            filterValueMinutes = filterValue.getMinutes();

        if (valueMinutes !== filterValueMinutes) {
            return false;
        }

        const valueSeconds = value.getSeconds(),
            filterValueSeconds = filterValue.getSeconds();

        if (valueSeconds !== filterValueSeconds) {
            return false;
        }

        return true;
    }
});

LW.Utilities.Assign('CustomFilter', class CustomFilter {
    constructor(filterValue, condition, customfilter) {
        const that = this;

        that.value = filterValue;
        that.condition = condition;
        that.customfilter = customfilter;
    }

    evaluate(value) {
        const that = this;

        return that.customfilter(that.value, value, that.condition);
    }
});

LW.FilterGroup = LW.Utilities.FilterGroup;
LW.StringFilter = LW.Utilities.StringFilter;
LW.NumericFilter = LW.Utilities.NumericFilter;
LW.DateFilter = LW.Utilities.DateFilter;
LW.CustomFilter = LW.Utilities.CustomFilter;
