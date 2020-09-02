
function Ajax(source, settings) {
    let method = 'GET',
        url = source.url,
        body = null,
        async = true;

    if (source.type) {
        method = source.type;
    }

    if (source.data) {
        if (method === 'GET') {
            url += '?';

            for (let prop in source.data) {
                if (source.data.hasOwnProperty(prop)) {
                    url += encodeURI(prop + '=' + source.data[prop] + '&');
                }
            }

            if (url.charAt(url.length - 1) === '&') {
                url = url.slice(0, url.length - 1);
            }
        }
        else if (method === 'POST') {
            body = JSON.stringify(source.data);
        }
    }

    if (settings && settings.async === false && settings.dataType !== 'xlsx') {
        async = false;
    }

    if (window.fetch !== undefined && async) {
        AjaxFetch(source, settings, method, url, body);
    }
    else {
        AjaxXMLHttpRequest(source, settings, method, url, body, async);
    }
}

function AjaxFetch(source, settings, method, url, body) {
    // prepare fetch settings
    const fetchInit = { method: method };
    let parseMethod;

    switch (source.dataType) {
        case 'json':
            parseMethod = 'json';
            break;
        case 'xlsx':
            parseMethod = 'arrayBuffer';
            break;
        default:
            parseMethod = 'text';
    }

    if (settings) {
        if (settings.contentType) {
            fetchInit.headers = new Headers({
                'Content-Type': settings.contentType
            });
        }
    }

    if (body !== null) {
        fetchInit.body = body;
    }

    let status, fetchTimeout, timeouted;

    if (source.timeout) {
        fetchTimeout = setTimeout(function () {
            timeouted = true;
        }, source.timeout);
    }

    if (settings.beforeSend) {
        const beforeSendResult = settings.beforeSend(fetchInit, settings);

        if (beforeSendResult === false) {
            return;
        }
    }

    // fetch resource
    fetch(url, fetchInit)
        .then(function (response) {
            if (timeouted) {
                status = 408;
                throw new Error('timeout');
            }

            if (fetchTimeout) {
                clearTimeout(fetchTimeout);
            }

            status = response.status;

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response[parseMethod]();
        })
        .then(function (data) {
            if (parseMethod === 'arrayBuffer') {
                return JSZip.loadAsync(data).then(function (zipData) {
                    // "data" represents the whole XLSX/ZIP file
                    return zipData.files['xl/worksheets/sheet1.xml'].async('text').then(function (sheet1) {
                        return zipData.files['xl/sharedStrings.xml'].async('text').then(function (sharedStrings) {
                            const parsedData = parseXLSXData(sheet1, sharedStrings);

                            AjaxComplete(settings, parsedData, status);
                        });
                    });
                });
            }
            else {
                AjaxComplete(settings, data, status);
            }
        })
        .catch(function (error) {
            if (error.message === 'JSZip is not defined') {
                error.message = 'JSZip is not defined. Please include a reference to JSZip to be able to load data from XLSX files.';
            }

            if (settings && settings.loadError) {
                settings.loadError(status, error);
            }
        });
}

function AjaxXMLHttpRequest(source, settings, method, url, body, async) {
    const request = new XMLHttpRequest();

    request.open(method, url, async);

    request.ontimeout = function () {
        if (settings && settings.loadError) {
            settings.loadError(408, 'timeout');
        }
    };

    request.onload = function () {
        if (request.readyState === 4) {
            const status = request.status;
            let data = request.response;

            if (status >= 200 && status <= 299) {
                if (source.dataType === 'json') {
                    data = JSON.parse(data);
                }

                AjaxComplete(settings, data, status);
            }
            else if (settings && settings.loadError) {
                settings.loadError(status, data);
            }
        }
    };

    request.onerror = function () {
        if (settings && settings.loadError) {
            settings.loadError(request.status, request.response);
        }
    };

    if (settings && settings.contentType) {
        request.setRequestHeader('Content-Type', settings.contentType);
    }

    if (async && source.timeout) {
        request.timeout = source.timeout;
    }

    if (settings.beforeSend) {
        const beforeSendResult = settings.beforeSend(request, settings);

        if (beforeSendResult === false) {
            return;
        }
    }

    request.send(body);
}

function AjaxComplete(settings, data, status) {
    if (!settings) {
        return;
    }

    if (settings.beforeLoadComplete) {
        const processedData = settings.beforeLoadComplete(data);

        if (processedData) {
            data = processedData;
        }
    }

    if (settings.loadComplete) {
        settings.loadComplete(data, status);
    }
}

function parseXLSXData(sheet1, sharedStrings) {
    const parser = new DOMParser(),
        sharedStringsDocument = parser.parseFromString(sharedStrings, 'text/xml'),
        sharedStringsContainers = Array.from(sharedStringsDocument.getElementsByTagName('si')),
        sharedStringsCollection = [],
        sheet1Document = parser.parseFromString(sheet1, 'text/xml'),
        rows = Array.from(sheet1Document.getElementsByTagName('row')),
        parsedData = [];

    sharedStringsContainers.forEach(function (si) {
        let texts = si.getElementsByTagName('t');

        if (texts.length === 1) {
            sharedStringsCollection.push(texts[0].innerHTML);
        }
        else {
            let text = '';

            texts = Array.from(texts);
            texts.forEach(function (t) {
                text += t.innerHTML;
            });
            sharedStringsCollection.push(text);
        }
    });

    rows.forEach(function (row) {
        const rowObject = {},
            cells = Array.from(row.getElementsByTagName('c'));

        cells.forEach(function (cell, index) {
            const column = cell.getAttribute('r').match(/\D+/)[0],
                type = cell.getAttribute('t'),
                xmlValue = cell.getElementsByTagName('v')[0].innerHTML;
            let value;

            switch (type) {
                case 's':
                    // string                    
                    value = sharedStringsCollection[parseFloat(xmlValue)];
                    break;
                case 'b':
                    // boolean
                    value = parseFloat(xmlValue) === 1;
                    break;
                default:
                    // number or date
                    value = parseFloat(xmlValue);
            }

            rowObject[column] = value;
        });

        parsedData.push(rowObject);
    });

    return parsedData;
}
