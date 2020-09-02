
function sortByMultipleColumns(dataSource, sortColumns, directions, customSortingCallback) {
    if (!dataSource || !(Array.isArray(dataSource)) || dataSource.length === 0 ||
        !sortColumns || Array.isArray(sortColumns) && sortColumns.length === 0) {
        return;
    }

    if (typeof sortColumns === 'string') {
        sortColumns = [sortColumns];
    }

    const directionCoefficients = [],
        compareFunctions = [];

    if (directions === undefined) {
        directions = [];
    }

    for (let i = 0; i < sortColumns.length; i++) {
        if (directions[i] === undefined || directions[i] === 'asc' || directions[i] === 'ascending') {
            directionCoefficients[i] = 1;
        }
        else {
            directionCoefficients[i] = -1;
        }

        compareFunctions[i] = getCompareFunction(dataSource[0][sortColumns[i]]);
    }

    if (customSortingCallback) {
        customSortingCallback(dataSource, sortColumns, directions, compareFunctions);
        return;
    }

    dataSource.sort(function (a, b) {
        for (let i = 0; i < sortColumns.length; i++) {
            const result = compareFunctions[i](a[sortColumns[i]], b[sortColumns[i]]);

            if (result === 0) {
                if (sortColumns[i + 1]) {
                    continue;
                }
                else if (a._index !== undefined) {
                    // makes sorting stable
                    return (a._index - b._index) * directionCoefficients[i];
                }

                return 0;
            }

            return result * directionCoefficients[i];
        }
    });
}

