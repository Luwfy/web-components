
/**
* lwFileUpload custom element.
*/
LW('lw-file-upload', class FileUpload extends LW.BaseElement {
    /**
    * Element's properties
    */
    static get properties() {
        return {
            'accept': {
                value: null,
                type: 'string?'
            },
            'appendTo': {
                value: null,
                type: 'any'
            },
            'autoUpload': {
                value: false,
                type: 'boolean'
            },
            'directory': {
                value: false,
                type: 'boolean'
            },
            'dropZone': {
                value: null,
                type: 'any'
            },
            'hideFooter': {
                value: false,
                type: 'boolean'
            },
            'itemTemplate': {
                value: null,
                type: 'any'
            },
            'messages': {
                value: {
                    'en': {
                        'browse': 'Browse',
                        'uploadFile': 'Upload File',
                        'cancelFile': 'Cancel File',
                        'pauseFile': 'Pause File',
                        'uploadAll': 'Upload All',
                        'cancelAll': 'Cancel All',
                        'pauseAll': 'Pause All',
                        'totalFiles': 'Total files: ',
                        'connectionError': '{{elementType}}: File Upload requires connection to the server.',
                        'wrongItemIndex': '{{elementType}}: There is no file with such an index in the list of uploaded files.',
                        'tooLongFileName': '{{elementType}}: File name is too long.'
                    }
                },
                type: 'object',
                extend: true
            },
            'multiple': {
                value: false,
                type: 'boolean'
            },
            'name': {
                value: '',
                type: 'string'
            },
            'responseHandler': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'setHeaders': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'showProgress': {
                value: false,
                type: 'boolean'
            },
            'validateFile': {
                value: null,
                type: 'function?',
                reflectToAttribute: false
            },
            'uploadUrl': {
                value: '',
                type: 'string',
                reflectToAttribute: false
            }
        }
    }

    /**
    * Element's event listeners.
    */
    static get listeners() {
        return {
            'browseButton.click': 'browse',
            'browseButton.focus': '_focusHandler',
            'browseButton.blur': '_blurHandler',
            'browseInput.change': '_browseInputChangeHandler',
            'selectedFiles.click': '_selectedFilesClickHandler',
            'uploadAllButton.click': 'uploadAll',
            'cancelAllButton.click': 'cancelAll',
            'pauseAllButton.click': 'pauseAll',
            'dropZone.dragenter': '_dropZoneHandler',
            'dropZone.dragleave': '_dropZoneHandler',
            'dropZone.dragover': '_dropZoneHandler',
            'dropZone.drop': '_dropZoneHandler',

            'resize': '_handleComponentsByAvailableHeight'
        }
    }

    _blurHandler() {
        this.$.fireEvent('blur');
    }

    _focusHandler() {
        this.$.fireEvent('focus');
    }

    /**
    * Checks for missing modules.
    */
    static get requires() {
        return {
            'LW.Button': 'lw.button.js',
            'LW.ProgressBar': 'lw.progressbar.js'
        }
    }

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.fileupload.css'
        ]
    }

    /**
    * Element's HTML template.
    */
    template() {
        return `<div id="container" role="presentation">
                    <div id="fileUploadHeader" class="lw-file-upload-header" role="presentation">
                        <lw-button class="lw-browse-button" id="browseButton" disabled="[[disabled]]" theme="[[theme]]" right-to-left="[[rightToLeft]]"></lw-button>
                        <input type="file" class="lw-browse-input" id="browseInput" name="[[name]]" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]" multiple="[[multiple]]" webkitdirectory="[[directory]]" mozdirectory="[[directory]]" />
                    </div>
                    <div id="fileUploadContainer" class="lw-file-upload-container">
                        <div id="dropZone" class="lw-drop-zone" aria-label="Drag files here"></div>
                        <div id="selectedFiles" class="lw-selected-files" role="list" aria-label="Selected files"></div>
                    </div>
                    <div id="totalFiles" class="lw-total-files lw-hidden" role="presentation">Total flies: 0</div>
                    <div id="fileUploadFooter" class="lw-file-upload-footer lw-hidden">`+
            '<lw-button class="lw-upload-all-button success" id="uploadAllButton" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]"" theme="[[theme]]" right-to-left="[[rightToLeft]]"></lw-button>' +
            '<lw-button class="lw-cancel-all-button error" id="cancelAllButton" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]" theme="[[theme]]" right-to-left="[[rightToLeft]]"></lw-button>' +
            '<lw-button class="lw-pause-all-button primary" id="pauseAllButton" animation="[[animation]]" disabled="[[disabled]]" unfocusable="[[unfocusable]]" theme="[[theme]]" right-to-left="[[rightToLeft]]"></lw-button>' +
            `</div>
                </div>`;
    }

    /**
    * Updates the element when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        super.propertyChangedHandler(propertyName, oldValue, newValue);

        switch (propertyName) {
            case 'accept':
                that.$.browseInput.accept = newValue;
                break;
            case 'dropZone':
            case 'appendTo':
                that._handleContainers();
                break;
            case 'messages':
            case 'locale':
                that._updateTextValues();
                break;
            case 'multiple':
                that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;

                if (!newValue && that._selectedFiles.length > 1) {
                    that._selectedFiles.splice(1);
                    that._renderSelectedFiles();
                }
                break;
            case 'itemTemplate':
                if (that._items.length > 0) {
                    that._renderSelectedFiles();

                    that._handleComponentsByAvailableHeight();
                }
                break;
            case 'rightToLeft':
                if (that._items) {
                    that._items.forEach(item => {
                        const progressBar = item.querySelector('lw-progress-bar');

                        if (progressBar) {
                            progressBar.rightToLeft = newValue;
                        }

                        newValue ? item.setAttribute('right-to-left', '') : item.removeAttribute('right-to-left');
                    });
                }

                if (newValue) {
                    that.$.dropZone.setAttribute('right-to-left', '');
                }
                else {
                    that.$.dropZone.removeAttribute('right-to-left');
                }
                break;
        }
    }

    /**
    * Called when the element is attached to the DOM.
    */
    attached() {
        super.attached();
        const that = this;

        that._handleContainers();
    }

    /**
    * Called when the element is detached from the DOM.
    */
    detached() {
        super.detached();
        const that = this;

        if (!that.$.fileUploadContainer.contains(that.$.dropZone)) {
            that.$.fileUploadContainer.insertBefore(that.$.dropZone, that.$.fileUploadContainer.firstChild);
        }

        if (!that.$.fileUploadContainer.contains(that.$.selectedFiles)) {
            that.$.fileUploadContainer.appendChild(that.$.selectedFiles);
        }
    }

    /**
    * Element's ready method.
    */
    ready() {
        super.ready();
        const that = this;

        if (!that.$.dropZone.id) {
            that.$.dropZone.id = that.id + 'DropZone';
        }

        if (!that.$.selectedFiles.id) {
            that.$.selectedFiles.id = that.id + 'SelectedFiles';
        }

        that.$.fileUploadContainer.setAttribute('aria-owns', that.$.dropZone.id + ' ' + that.$.selectedFiles.id);

        that.setAttribute('role', 'dialog');

        if (that.rightToLeft) {
            that.$.dropZone.setAttribute('right-to-left', '');
        }
        else {
            that.$.dropZone.removeAttribute('right-to-left');
        }

        that._setInitialValues();
        that._updateTextValues();
        that._handleContainers();
        that._handleComponentsByAvailableHeight();
        
    }

    /**
    * Browses for a file
    */
    browse() {
        const that = this;

        if (that.disabled || (!that.multiple && that._selectedFiles.length > 0)) {
            return;
        }

        that.$.browseInput.click();
    }

    /**
    * Cancels all selected files
    */
    cancelAll() {
        const that = this;

        if (that.disabled || that._items.length === 0) {
            return;
        }

        for (let i = that._items.length - 1; i >= 0; i--) {
            that.cancelFile(that._items[i].index);
        }

        that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;
    }

    /**
    * Cancels single file.
    * @param {number/string} index - File index.
    */
    cancelFile(index) {
        const that = this;

        if (!(typeof index === 'number') || that.disabled || that._selectedFiles.length === 0) {
            return;
        }

        const item = that._getFileItem(index, true);

        if (!item) {
            that.error(that.localize('wrongItemIndex', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        const itemIndexInArray = that._items.indexOf(item);

        that.$.selectedFiles.removeChild(item);

        if (item && item.xhr) {
            item.xhr.abort();
        }

        that._selectedFiles.splice(itemIndexInArray, 1);
        that._items.splice(itemIndexInArray, 1);

        that.$.fireEvent('uploadCanceled', {
            'filename': item.file.name,
            'type': item.file.type,
            'size': item.file.size,
            'index': item.index
        });

        that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;

        if (that._selectedFiles.length === 0) {
            that.$.fileUploadFooter.classList.add('lw-hidden');
        }

        that._handleComponentsByAvailableHeight();
    }

    get value() {
        const that = this;

        return that._selectedFiles;
    }
    /**
    * Pauses upload of all files
    */
    pauseAll() {
        const that = this;

        if (that.disabled || that._items.length === 0) {
            return;
        }

        for (let i = that._items.length - 1; i >= 0; i--) {
            let item = that._items[i];

            if (item.xhr) {
                item.xhr.abort();
            }
        }
    }

    /**
    * Pauses particular file upload
    * @param {number/string} index - File index.
    */
    pauseFile(index) {
        const that = this;

        if ((typeof index !== 'number' && typeof index !== 'string') || that.disabled || that._items.length === 0) {
            return;
        }

        const item = that._getFileItem(index, true);

        if (!item) {
            that.error(that.localize('wrongItemIndex', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        item.classList.remove('lw-uploading-start');

        if (item && item.xhr) {
            item.xhr.abort();
        }

        that.$.fireEvent('uploadPaused', {
            'filename': item.file.name,
            'type': item.file.type,
            'size': item.file.size,
            'index': item.index
        });
    }

    /**
    * Uploads all selected files
    */
    uploadAll() {
        const that = this;

        if (that.disabled || that._items.length === 0) {
            return;
        }

        for (let i = that._items.length - 1; i >= 0; i--) {
            if (!that._items[i].uploading) {
                that.uploadFile(that._items[i].index);
            }
        }
    }

    /**
    * Uploads single file. Selection by index
    * @param {number/string} index - File index.
    */
    uploadFile(index) {
        const that = this;
        let isOnProgress = false;

        if (!(typeof index === 'number') || that.disabled || that._selectedFiles.length === 0) {
            return;
        }

        const selectedItem = that._getFileItem(index, true);

        if (!selectedItem) {
            return;
        }

        let formData = new FormData(),
            progressBar = that.showProgress ? selectedItem.getElementsByTagName('lw-progress-bar')[0] : null, // to be handled case with custom template
            selectedFile = selectedItem.file;

        selectedItem.classList.remove('lw-pause', 'lw-error');
        selectedItem.classList.add('lw-uploading-start');
        formData.append('userfile[]', selectedFile);

        let request = new XMLHttpRequest();

        request.open('POST', that.uploadUrl);

        if (that.setHeaders && typeof that.setHeaders === 'function') {
            that.setHeaders(request, selectedFile);
        }

        that.$.fireEvent('uploadStarted', {
            'filename': selectedItem.file.name,
            'type': selectedItem.file.type,
            'size': selectedItem.file.size,
            'index': selectedItem.index
        });

        request.upload.onprogress = function (event) {
            if (!isOnProgress) {
                isOnProgress = true;
                selectedItem.classList.remove('lw-uploading-start');
                selectedItem.classList.add('lw-uploading');
                selectedItem.uploading = true;
                selectedItem.xhr = request;
            }

            if (progressBar) {
                progressBar.value = Math.round((event.loaded / event.total) * 100);
            }

            selectedItem.classList.remove('lw-pause', 'lw-error');
        };

        request.onabort = function () {
            selectedItem.classList.remove('lw-uploading-start', 'lw-uploading');
            selectedItem.classList.add('lw-pause');

            selectedItem.addEventListener('animationend', function () {
                selectedItem.classList.remove('lw-pause', 'lw-error');
            });
        };

        request.onerror = function () {
            selectedItem.classList.remove('lw-uploading-start', 'lw-uploading');
            selectedItem.classList.add('lw-error');

            selectedItem.addEventListener('animationend', function () {
                selectedItem.classList.remove('lw-pause', 'lw-error');
            });
        };

        request.onload = function () {
            isOnProgress = false;
            selectedItem.classList.remove('lw-uploading-start', 'lw-uploading');

            if (request.status >= 200 && request.status <= 299) {
                let actualIndex = that._items.indexOf(selectedItem);

                that.$.selectedFiles.removeChild(selectedItem);
                that._selectedFiles.splice(that._selectedFiles.indexOf(selectedFile), 1);
                that._items.splice(actualIndex, 1);
                that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;

                that.$.fireEvent('uploadCompleted', {
                    'filename': selectedItem.file.name,
                    'type': selectedItem.file.type,
                    'size': selectedItem.file.size,
                    'status': request.status,
                    'index': selectedItem.index
                });

                if (that._selectedFiles.length === 0) {
                    that.$.fileUploadFooter.classList.add('lw-hidden');
                }
            }
            else {
                selectedItem.classList.add('lw-error');
                selectedItem.classList.remove('lw-uploading');

                that.$.fireEvent('uploadError', {
                    'filename': selectedItem.file.name,
                    'type': selectedItem.file.type,
                    'size': selectedItem.file.size,
                    'status': request.status,
                    'index': selectedItem.index
                });
            }
        };

        request.onreadystatechange = function () {
            if (!that.responseHandler || typeof that.responseHandler !== 'function') {
                return;
            }

            that.responseHandler(request);
        };

        request.send(formData);
    }

    /**
     * Click handler about "selectedFiles" container
     */
    _selectedFilesClickHandler(event) {
        const that = this;

        if (that.disabled) {
            return;
        }

        const target = event.target,
            isItemUploadClicked = target.closest('.lw-item-upload-button'),
            isItemCancelClicked = target.closest('.lw-item-cancel-button'),
            isItemAbortClicked = target.closest('.lw-item-pause-button'),
            clickedItem = target.closest('.lw-file');

        if (isItemUploadClicked) {
            that.uploadFile(clickedItem.index);
        }
        else if (isItemCancelClicked) {
            that.cancelFile(clickedItem.index);
        }
        else if (isItemAbortClicked) {
            that.pauseFile(clickedItem.index);
        }
    }

    /**
    * Change handler of the browse input. When files are selected, they are updated into files array and rendered in the file list
    **/
    _browseInputChangeHandler() {
        const that = this,
            selectedFiles = that._filterNewFiles(Array.from(that.$.browseInput.files));
        let validNewFiles = [];

        if (that.disabled || selectedFiles.length === 0) {
            return;
        }

        if (that.validateFile && typeof that.validateFile === 'function') {
            validNewFiles = selectedFiles.filter(file => {
                if (that.validateFile(file)) {
                    return true;
                }

                that.$.fireEvent('validationError', {
                    'filename': file.name,
                    'type': file.type,
                    'size': file.size
                });

                return false;
            });
        }
        else {
            validNewFiles = selectedFiles;
        }

        that._selectedFiles = that._selectedFiles.concat(validNewFiles);

        if (that._selectedFiles.length === 0) {
            return;
        }

        that._renderSelectedFiles(validNewFiles);
        that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;
        that.$.browseInput.value = '';

        if (that.autoUpload) {
            that.uploadAll();
        }
    }

    /**
    * Returns the default item template
    * @param {string} fileName
    */
    _defaultItemTemplate(fileName, index) {
        const that = this,
            uploadString = that.localize('uploadFile'),
            cancelString = that.localize('cancelFile'),
            pauseString = that.localize('pauseFile'),
            rightToLeft = that.rightToLeft ? 'right-to-left ' : '';

        return `<span id="${that.id + 'File' + index + 'Name'}" class="lw-item-name">${fileName}</span>` +
            `<span class="lw-item-upload-button" title="${uploadString}" role="button" aria-label="${uploadString}"></span>` +
            `<span class="lw-item-cancel-button" title="${cancelString}" role="button" aria-label="${cancelString}"></span>` +
            `<span class="lw-item-pause-button" title="${pauseString}" role="button" aria-label="${pauseString}"></span>` +
            `<lw-progress-bar ${rightToLeft}aria-label="Upload progress"></lw-progress-bar>`;
    }

    /**
     * dropZone event handler
     */
    _dropZoneHandler(event) {
        const that = this;

        event.preventDefault();
        event.stopPropagation();

        if (that.disabled) {
            return;
        }

        if (event.type === 'dragenter' || event.type === 'dragleave') {
            event.type === 'dragenter' ? that.$.dropZone.classList.add('lw-drag-over') : that.$.dropZone.classList.remove('lw-drag-over');
            return;
        }

        if (event.type === 'drop') {
            that.$.dropZone.classList.remove('lw-drag-over');

            if (!that.multiple && that._selectedFiles.length > 0) {
                return;
            }

            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
                const droppedFiles = that._filterNewFiles(Array.from(event.dataTransfer.files));

                if (droppedFiles.length === 0) {
                    return;
                }

                if (!that.multiple) {
                    droppedFiles.splice(1);
                }

                that._selectedFiles = that._selectedFiles.concat(droppedFiles);
                that._renderSelectedFiles(droppedFiles);
            }

            that.$.browseButton.disabled = (!that.multiple && that._selectedFiles.length > 0) || that.disabled ? true : false;
        }
    }

    /**
    * Check for duplicated items during selection and add only new items in the selection list
    * @param {array} newSelection - an array with selected files
    **/
    _filterNewFiles(newSelection) {
        const that = this;
        let newFiles = [];

        for (let i = 0; i < newSelection.length; i++) {
            let notYetSelected = true;

            for (let j = 0; j < that._selectedFiles.length; j++) {
                const oldFile = that._selectedFiles[j],
                    newFile = newSelection[i];

                if (newFile.name === oldFile.name && newFile.size === oldFile.size && newFile.type === oldFile.type && newFile.lastModified === oldFile.lastModified) {
                    notYetSelected = false;
                    break;
                }
            }

            if (notYetSelected) {
                newFiles.push(newSelection[i]);
            }
        }

        return newFiles;
    }

    /**
     * Gets an item from the array with files if it matches particular file name or index
     */
    _getFileItem(value, byIndex) {
        const that = this;
        let match = null;

        if (!value || (typeof value !== 'string' && typeof value !== 'number')) {
            return;
        }

        if (!that._items || that._items.length === 0) {
            return null;
        }

        for (let i = 0; i < that._items.length; i++) {
            const item = that._items[i];

            if ((byIndex && item.index === parseInt(value)) || (item.file.name === value)) {
                match = item;
            }
        }

        return match;
    }

    /**
     * Handles "dropZone" and "selectedFiles" contaners if they are append to external elements
     */
    _handleContainers() {
        const that = this,
            dropZone = that._validateDOMElement(that.dropZone),
            appendTo = that._validateDOMElement(that.appendTo);

        if (dropZone) {
            dropZone.appendChild(that.$.dropZone);
        }
        else {
            that.$.fileUploadContainer.insertBefore(that.$.dropZone, that.$.fileUploadContainer.firstChild);
        }

        if (appendTo) {
            appendTo.appendChild(that.$.selectedFiles);
        }
        else {
            that.$.fileUploadContainer.appendChild(that.$.selectedFiles);
        }
    }

    /**
    * Applies the item template
    * @param {string} fileName
    */
    _handleItemTemplate(filename, index) {
        const that = this;
        let template = that.itemTemplate;

        if (!('content' in document.createElement('template'))) {
            that.error(that.localize('htmlTemplateNotSuported', { elementType: that.nodeName.toLowerCase() }));
            return;
        }

        if (!template) {
            return that._defaultItemTemplate(filename, index);
        }

        if (typeof template === 'string') {
            template = document.getElementById(template);
        }

        if (template === null || !('content' in template)) {
            that.error(that.localize('invalidTemplate', { elementType: that.nodeName.toLowerCase(), property: 'template' }));
            return;
        }

        const content = template.innerHTML,
            regex = /{{\w+}}/g;

        return content.replace(regex, filename);
    }

    /**
    * Renders selected files - by defauld file name, upload button, cancel button
    * @param {array} files - Array with all selected files.
    **/
    _renderSelectedFiles(files) {
        const that = this,
            itemsFragment = document.createDocumentFragment(),
            filesToRender = files || that._selectedFiles;

        if (!files) {
            that._items = [];
            that.$.selectedFiles.innerHTML = '';
        }

        for (let i = 0; i < filesToRender.length; i++) {
            const fileName = that.directory ? filesToRender[i].webkitRelativePath : filesToRender[i].name,
                item = document.createElement('div');

            that._incrementIndex++;
            item.className = 'lw-file';
            item.index = that._incrementIndex;
            item.setAttribute('item-id', that._incrementIndex);
            item.innerHTML = that.itemTemplate ? that._handleItemTemplate(fileName, that._incrementIndex) : that._defaultItemTemplate(fileName, that._incrementIndex);
            item.file = filesToRender[i];
            item.uploading = false;
            item.xhr = null;

            item.setAttribute('role', 'listitem');
            item.setAttribute('aria-labelledby', that.id + 'File' + that._incrementIndex + 'Name');

            if (that.rightToLeft) {
                item.setAttribute('right-to-left', '');
            }

            itemsFragment.appendChild(item);
            that._items.push(item);

            that.$.fireEvent('fileSelected', {
                'filename': filesToRender[i].name,
                'type': filesToRender[i].type,
                'size': filesToRender[i].size,
                'index': item.index
            });
        }

        that.$.selectedFiles.appendChild(itemsFragment);
        that.$.fileUploadFooter.classList.remove('lw-hidden');

        that._handleComponentsByAvailableHeight(); // flag about cancel all to prevent recalculations every time when file is canceled
    }

    /**
    * Sets values on initialization
    **/
    _setInitialValues() {
        const that = this;

        that.$.browseInput.accept = that.accept;
        that._selectedFiles = [];
        that._items = [];
        that._incrementIndex = 0;
    }

    /**
    * Updates the values of all file uploads buttons an popups
    **/
    _updateTextValues() {
        const that = this,
            buttons = ['browse', 'uploadAll', 'cancelAll', 'pauseAll'];

        for (let i = 0; i < buttons.length; i++) {
            const localizationString = buttons[i],
                buttonName = localizationString + 'Button';

            that.$[buttonName].innerHTML = that.localize(localizationString);
        }

        for (let i = 0; i < that._selectedFiles.length; i++) {
            const item = that._items[i];

            item.querySelector('.lw-item-upload-button').title = that.localize('uploadFile');
            item.querySelector('.lw-item-cancel-button').title = that.localize('cancelFile');
            item.querySelector('.lw-item-pause-button').title = that.localize('pauseFile');
        }
    }

    /**
    * Validates if an element exists in DOM
    * @param {string} fileName
    **/
    _validateDOMElement(element) {
        if (!element) {
            return;
        }

        if (typeof element === 'string') {
            return document.getElementById(element);
        }
        else if (element instanceof HTMLElement) {
            return element;
        }
    }


    /**
    * Validates element's height
    **/
    _handleComponentsByAvailableHeight() {
        const that = this;

        that._calculateAvailableContainerHeight();

        if (that._elementsAutoHeight > that.offsetHeight) {
            that.$.container.classList.add('lw-overflow');
            that._containerOverflows = true;

            if (that._rowHeight) {
                const remainingFiles = parseInt(that._availableHeight / that._rowHeight);

                for (let i = 0; i < that._items.length; i++) {
                    const item = that._items[i];
                    i < remainingFiles ? item.classList.remove('lw-hidden') : item.classList.add('lw-hidden');
                }

                if (that._items.length > remainingFiles) {
                    that.$.totalFiles.innerHTML = that.localize('totalFiles') + that._items.length;
                    that.$.totalFiles.classList.remove('lw-hidden');
                }
                else {
                    that.$.totalFiles.classList.add('lw-hidden');
                }
            }
        }
        else if (that.dropZone === '' && that._elementsAutoHeight < that.offsetHeight) {
            that.$.container.classList.remove('lw-overflow');
            that._containerOverflows = false;
        }

    }

    /**
    * Calculates available container height
    **/
    _calculateAvailableContainerHeight() {
        const that = this,
            containerStyles = window.getComputedStyle(that.$.fileUploadContainer, null),
            fileUploadContainerOffset = parseInt(containerStyles.getPropertyValue('margin-top')) + parseInt(containerStyles.getPropertyValue('margin-bottom')) + parseInt(containerStyles.getPropertyValue('padding-top')) + parseInt(containerStyles.getPropertyValue('padding-bottom')),
            fileRow = that.$.container.querySelector('.lw-file'),
            headersHeight = that.$.fileUploadHeader.offsetHeight,
            footersHeight = that.$.fileUploadFooter.offsetHeight,
            inlineHeight = that.style.height;
        let totalFilesContainerHeight = 0;

        if (fileRow) {
            that._rowHeight = fileRow.offsetHeight;
        }

        that.style.height = 'auto';

        if (that._containerOverflows) {
            that.$.container.classList.remove('lw-overflow');
        }

        that._elementsAutoHeight = that.offsetHeight;
        that.style.height = inlineHeight;

        if (that._containerOverflows) {
            that.$.container.classList.add('lw-overflow');
        }

        if (that.$.totalFiles.classList.contains('lw-hidden')) {
            that.$.totalFiles.classList.remove('lw-hidden');
            totalFilesContainerHeight = that.$.totalFiles.offsetHeight;
            that.$.totalFiles.classList.add('lw-hidden');
        }

        that._availableHeight = that.offsetHeight - (headersHeight + footersHeight) - fileUploadContainerOffset - totalFilesContainerHeight;
    }
});
