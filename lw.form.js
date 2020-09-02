

class Control {
    constructor(formState = null) {
        const that = this;

        that._parent = null;
        that._updating = false;
        that._touched = false;
        that._pristine = true;
        that._disabled = false;

        that.status = 'valid';
        that._onChange = [];

        that.registerOnChange((value) => {
          that.writeValue(value);
        });
        that._applyFormState(formState);
    }

    registerOnChange(fn) {
       this._onChange.push(fn);
    }

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    get valid() {
        return this.status === 'valid';
    }

    get invalid() {
        return this.status === 'invalid';
    }

    get dirty() {
        return !this._pristine;
    }

    get untouched() {
        return !this._touched;
    }

    get disabled() {
        return this._disabled;
    }

    get enabled() {
        return this._disabled === false;
    }

    get value() {
        const that = this;

        if (that._value && typeof(that._value) === 'object' && that._value.toDate) {
            return that._value.toDate();
        }

        return that._value;
    }

    set value(value) {
        this.setValue(value);
    }

    setValue(value, options = {}) {
        const that = this;

        that._value = that._pendingValue = value;

        if (that._onChange.length && options.emitModelToViewChange !== false) {
            that._onChange.forEach((
            (changeFn) => changeFn(that.value, options.emitViewToModelChange !== false)));
        }

        that.updateValueAndValidate(options);
    }
    /**
     * Patches the value of a control.
     *
     * This function is functionally the same as {\@link FormControl#setValue setValue} at this level.
     * It exists for symmetry with {\@link FormGroup#patchValue patchValue} on `FormGroups` and
     * `FormArrays`, where it does behave differently.
     */
    patchValue(value, options = {}) {
        this.setValue(value, options);
    }

    reset(formState = null, options = {}) {
        this._applyFormState(formState);
        this.markAsPristine(options);
        this.markAsUntouched(options);
        this.setValue(this.value, options);
        this._pendingChange = false;
    }

    _isBoxedValue(formState) {
        return typeof formState === 'object' && formState !== null &&
            Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
    }

    _applyFormState(formState) {
        if (this._isBoxedValue(formState)) {
            (( (this))).value = this._pendingValue = formState.value;
            formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
                this.enable({ onlySelf: true, emitEvent: false });
        }
        else {
            this._value = this._pendingValue = formState;
        }
    }

    _runValidator() {
        return this._validate();
    }

    _validate() {

        return null;
    }

    updateValueAndValidate(options={}) {
        const that = this;

        that._setInitialStatus();
        that._updateValue();

        if (that.enabled) {
            that.errors = that._runValidator();
            that.status = that._calculateStatus();
        }

        if (options.emitEvent !== false) {
            if (that.onValueChanges) {
                that.onValueChanges(that.value);
            }

            if (that.onStatusChanges) {
                that.onStatusChanges(that.status);
            }
        }

        if (that._onValueAndStatusUpdate) {
            that._onValueAndStatusUpdate();
        }

        if (that._parent && !options.onlySelf) {
            that._parent.updateValueAndValidate(options);
        }

        if (that.tabItem) {
            that.tabItem.tab.classList.remove('lw-invalid');
            that.tabItem.row.classList.remove('lw-invalid');
            that.tabItem.tab.classList.remove('lw-valid');
            that.tabItem.row.classList.remove('lw-valid');

            if (that.status === 'invalid') {
                that.tabItem.tab.classList.add('lw-invalid');
                that.tabItem.row.classList.add('lw-invalid');

                if (that.tabItem.tab.classList.contains('selected')) {
                    that.nextButton.disabled = true;
                    that.backButton.disabled = true;
                }
            }
            else {
                that.tabItem.tab.classList.add('lw-valid');
                that.tabItem.row.classList.add('lw-valid');

                if (that.tabItem.tab.classList.contains('selected')) {
                    that.nextButton.disabled = false;
                    that.backButton.disabled = false;
                }
            }
        }
    }


    _setInitialStatus() {
        this.status = this._allControlsDisabled() ? 'disabled' : 'valid';
    }

    _updateValue() {
    }

    _allControlsDisabled() {
        return this._allControls('disabled');
    }

    _allControls(condition) {
        return this[condition];
    }

    _anyControls(condition) {
        return this[condition];
    }

    _anyControlsTouched() {
        return this._anyControls((
        (control) => control.touched));
    }

    _calculateStatus() {
        const that = this;

        if (that._allControls('disabled')) {
            return 'disabled';
        }
        if (that.errors) {
            return 'invalid';
        }
        if (that._anyControls('pending')) {
            return 'pending';
        }
        if (that._anyControls('invalid')) {
            return 'invalid';
        }

        return 'valid';
    }

    markAsUntouched(opts={}) {
        this._touched = false;
         this._forEachChild((
         (control)=>{
             control.markAsUntouched({
                 onlySelf: true
             });
         }
         ));
         if (this._parent && !opts.onlySelf) {
             this._parent._updateTouched(opts);
         }
     }

     markAsTouched(opts = {}) {
        this._touched = true;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsTouched(opts);
        }
    }

     _updateTouched(opts={}) {
         ((
         (this)))._touched = this._anyControlsTouched();
         if (this._parent && !opts.onlySelf) {
             this._parent._updateTouched(opts);
         }
     }


    markAsPristine(opts={}) {
        this._pristine = true;
        this._forEachChild((
        (control)=>{
            control.markAsPristine({
                onlySelf: true
            });
        }
        ));
        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts);
        }
    }

    markAsDirty(opts = {}) {
        this._pristine = false;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsDirty(opts);
        }
    }

    _updatePristine(opts = {}) {
        const that = this;

        that._pristine = !this._anyControls('dirty');

        if (that._parent) {
            that._parent._updatePristine(opts);
        }
    }

    _parentMarkedDirty(onlySelf) {
        const parentDirty = this._parent && this._parent.dirty;
        return !onlySelf && parentDirty && !this._parent._anyControlsDirty();
    }

    _forEachChild() { }

    disable(opts = {}) {
        const that = this;
        const skipPristineCheck = that._parentMarkedDirty(opts.onlySelf);
        that.status = 'disabled';
        that.errors = null;
        that._disabled = true;

        that._forEachChild((
        (control) => {
        control.disable(Object.assign({}, opts, { onlySelf: true }));
        }));
        that._updateValue();
        if (opts.emitEvent !== false) {
            if (that.onValueChanges) {
                that.onValueChanges(this.value);
            }

            if (that.onStatusChanges) {
                that.onStatusChanges(this.status);
            }
        }
        that._updateAncestors(Object.assign({}, opts, { skipPristineCheck }));
    }

    enable(opts = {}) {
        const that = this;
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
        that.status = 'valid';
        that._forEachChild((
        (control) => {
        control.enable(Object.assign({}, opts, { onlySelf: true }));
        }));
        that.updateValueAndValidate({ onlySelf: true, emitEvent: opts.emitEvent });
        that._updateAncestors(Object.assign({}, opts, { skipPristineCheck }));
    }

    _updateAncestors(opts) {
        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidate(opts);
            if (!opts.skipPristineCheck) {
                this._parent._updatePristine();
            }
            this._parent._updateTouched();
        }
    }
}

LW('lw-form-control', class HTMLFormControl extends LW.BaseElement {

    static get properties() {
        return {
            'action': {
                value: '',
                type: 'string'
            },
            'controlType': {
                value: 'input',
                type: 'string'
            },
            'columnSpan': {
                value: 1,
                type: 'number?'
            },
            'dataField': {
                value: '',
                type: 'string'
            },
            'disabled': {
                value: false,
                type: 'boolean'
            },
            'hint': {
                value: '',
                type: 'string'
            },
            'info': {
                value: '',
                type: 'string'
            },
            'label': {
                value: '',
                type: 'string'
            },
            'labelPosition': {
                value: 'left',
                type: 'string'
            },
            'placeholder': {
                value: '',
                type: 'string'
            },
            'readonly': {
                value: false,
                type: 'boolean'
            },
            'required': {
                value: false,
                type: 'boolean'
            },
            'validationRules': {
                value: [],
                type: 'any'
            },
            'value': {
                value: '',
                type: 'any'
            }
        }
    }

    template() {
        return '<div id="control"></div>'
    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        let parent = that.parentElement;
        while(parent) {
            if (parent.nodeName === 'LW-FORM') {
                const control = parent.getControl(that.controlOptions.dataField);
                control[propertyName] = newValue;
                break;
            }
            parent = parent.parentElement;
        }
        that.controlOptions[propertyName] = newValue;
    }

    render() {
        super.render();
    }

    get controlOptions() {
        const that = this;

        if (!that._controlOptions && that._properties) {
            let controlOptions = {};

            for (let propertyName in that._properties) {
                if (that._properties[propertyName].value !== that._properties[propertyName].defaultValue) {
                    controlOptions[propertyName] = that._properties[propertyName].value;
                }
            }

            that.classList.remove('lw-element');
            that.classList.remove('lw-form-control');
            controlOptions.cssClass = that.className;

            if (controlOptions.controlType === 'template') {
                controlOptions.template = that.innerHTML;
                that.innerHTML = '';
            }

            controlOptions.custom = true;
            that._controlOptions = controlOptions;
        }
        return that._controlOptions;
    }
});

class FormControl extends Control {

    constructor(element, value, controlOptions) {
        super(value, controlOptions);

        const that = this;

        that.element = element;
        that._initProps(controlOptions);

        if (controlOptions.custom) {
            that._setupCustomInput();
        }
        else {
            const parentElement = that.element.parentElement;
            that.input = element;
            that.input.value = value;
            that.labelElement = that.element.parentElement.querySelector('label');
            that.label = that.labelElement ? that.labelElement.innerHTML.trim() : '';
            that.element = document.createElement('div');
            that.element.setAttribute('form-control-name', that.input.getAttribute('form-control-name'));
            that.element.appendChild(that.input);
            parentElement.appendChild(that.element);
        }

        that.element.classList.add('lw-untouched');
        that.element.classList.add('lw-pristine');
        that.element.classList.add('lw-form-control');

        that._disabled = that.input.disabled !== undefined ? that.input.disabled : false;
        that._setupInput();
        that.updateValueAndValidate();
        that._onValueAndStatusUpdate = () => {
            if (that.element) {
                that.element.classList.remove('lw-valid');
                that.element.classList.remove('lw-invalid');

                that.element.classList.add('lw-' + that.status);
            }
        }

        that.refresh();
    }

    _initProps(controlOptions) {
        const that = this;

        Object.keys(controlOptions).forEach((value) => {
            that['_' + value] = controlOptions[value];
        });

        if (!that.name) {
            that.name = controlOptions.name;
        }

        if (!that.name) {
            const id = that.element.nodeName.toLowerCase() + LW.Utilities.Core.createGUID();
            that.name = id.replace(/-/ig, '');
        }

        if (!that._validationRules) {
            that._validationRules = [];
        }

        if (!that._readonly) {
            that._readonly = false;
        }

        if (!that._controlType) {
            that._controlType = 'text';
        }

        if (!that._labelPosition) {
            that._labelPosition = 'left';
        }

        if (!that._label) {
            that._label = '';
        }

        if (!that._hint) {
            that._hint = '';
        }

        if (!that._controlOptions) {
            that._controlOptions = {};
        }

        if (!that._info) {
            that._info = '';
        }

        if (that._placeholder) {
            that._controlOptions.placeholder = that._placeholder;
        }

        if (!that._columnSpan) {
            that._columnSpan = 1;
        }
    }

    _setupCustomInput() {
        const that = this;

        let element = that.element;
        let input = null;

        switch(that._controlType) {
            case 'submit':
            case 'button': {
                if (LW.Button) {
                    input = document.createElement('lw-button');
                }
                else {
                    input = document.createElement('button');
                    input.classList.add('lw-button');
                    input.innerHTML = that._label || '';
                }

                input.type = that._controlType;
                input.innerHTML = that._label || '';

                if (that._action === 'submit') {
                    input.type = 'submit';
                }

                if (input.type === 'submit') {
                    that._action = 'submit';
                }

                if (that._action) {
                    input.onclick = ()=> {
                        switch(that._action) {
                            case 'reset':
                                if (that.root) {
                                    that.root.reset();
                                }
                                break;
                            case 'submit':
                                if (that.root) {
                                    that.root.submit();
                                }
                                break;

                        }
                    }
                }
                break;
            }
            case 'boolean':
            case 'bool':
            case 'checkBox':
            case 'checkbox':
            case 'radio':
            case 'radioButton':
            case 'option': {
                input = document.createElement('div');

                const isRadio = that._controlType.toLowerCase() === 'checkbox' || that._controlType === 'boolean' || that._controlType === 'bool' ? false : true;

                const createOption = (option) => {
                    const optionElement = document.createElement('div');
                    const label = typeof option === 'string' ? option : option.label || option.value;
                    const value = typeof option === 'string' ? '' : option.value || '';

                    let btn = document.createElement('input');

                    optionElement.classList.add('lw-form-option');

                    if (LW.RadioButton &&  LW.CheckBox) {
                        btn = isRadio ? document.createElement('lw-radio-button') : document.createElement('lw-check-box');
                        btn.value = value;
                        btn.innerHTML = label;
                        btn.name = that.name;
                        btn.groupName = that.name;
                        optionElement.appendChild(btn);
                    }
                    else {
                        const labelElement = document.createElement('span');
                        labelElement.innerHTML = label;
                        btn.value = value;
                        btn.type = isRadio ? 'radio': 'checkbox';
                        btn.name = that.name;

                        labelElement.onpointerdown = () => {
                            btn.click();
                        }

                        optionElement.appendChild(btn);
                        optionElement.appendChild(labelElement);
                    }

                    input.appendChild(optionElement);
                }

                if (that._options) {
                    for(let i = 0; i < that._options.length; i++) {
                        const option = that._options[i];

                        createOption(option);
                    }
                }
                else {
                    createOption(that.label);
                }


                if (that._optionsLayout === 'horizontal') {
                    input.classList.add('lw-form-options-horizontal');
                }
                break;
            }
            case 'textArea':
            case 'textarea': {
                if (LW.TextArea) {
                    input = document.createElement('lw-text-area');
                    input.dropDownAppendTo = 'body';
                }
                else {
                    input = document.createElement('textarea');
                    input.classList.add('lw-input');
                }
                break;
            }
            case 'text':
            case 'input': {
                if (LW.Input) {
                    input = document.createElement('lw-input');
                    input.dropDownAppendTo = 'body';
                }
                else {
                    input = document.createElement('input');
                    input.classList.add('lw-input');
                }
                break;
            }
            case 'mask':
                if (LW.MaskedTextBox) {
                    input = document.createElement('lw-masked-text-box');
                }
                else {
                    input = document.createElement('input');
                    input.classList.add('lw-input');
                    break;
                }

                break;
            case 'date':
            case 'time':
            case 'datetime': {
                if (LW.DateTimePicker) {
                    input = document.createElement('lw-date-time-picker');
                    input.calendarButton = true;

                    if (that._controlType === 'datetime') {
                        input.formatString = 'F';
                        input.dropDownDisplayMode = 'default';
                    }
                    else if (that._controlType === 'date') {
                        input.formatString = 'd';
                        input.dropDownDisplayMode = 'calendar';
                    }
                    else if (that._controlType === 'time') {
                        input.formatString = 'T';
                        input.dropDownDisplayMode = 'timePicker';
                    }

                    input.dropDownAppendTo = 'body';
                }
                else if (LW.DateRangeInput) {
                    input = document.createElement('lw-date-range-input');
                    input.dropDownAppendTo = 'body';
                }
                else {
                    input = document.createElement('input');
                    input.classList.add('lw-input');
                    input.type = 'date';
                    break;
                }
                break;
            }
            case 'numberinput':
            case 'numberInput':
            case 'numeric':
            case 'number':
                if (LW.NumericTextBox) {
                    input = document.createElement('lw-numeric-text-box');
                    input.spinButtons = true;
                }
                else {
                    input = document.createElement('input');
                    input.type = 'number';
                    input.classList.add('lw-input');
                    break;
                }
                break;
            case 'password':
            case 'passwordInput':
            case 'passwordinput': {
                if (LW.PasswordTextBox) {
                    input = document.createElement('lw-password-text-box');
                }
                else {
                    input = document.createElement('input');
                    input.type = 'password';
                    input.classList.add('lw-input');
                    break;
                }
                break;
            }
            case 'checkInput':
            case 'checkinput': {
                input = document.createElement('lw-check-input');
                input.dropDownAppendTo = 'body';
                break;
            }
            case 'multiInput':
            case 'multiinput': {
                input = document.createElement('lw-multi-input');
                input.dropDownAppendTo = 'body';
                break;
            }
            case 'multiComboInput':
            case 'multicomboinput': {
                input = document.createElement('lw-multi-combo-input');
                input.dropDownAppendTo = 'body';
                break;
            }
            case 'comboBox':
            case 'combobox': {
                input = document.createElement('lw-drop-down-list');
                input.dropDownAppendTo = 'body';
                break;
            }
            case 'dropDownList':
            case 'dropdownlist': {
                input = document.createElement('lw-drop-down-list');
                input.dropDownAppendTo = 'body';
                break;
            }
            case 'template': {
                input = document.createElement('div');

                input.innerHTML = '<div class="lw-form-template">' + that._template || that._value + '</div>';
                break;
            }
            case 'label': {
                input = document.createElement('label');
                input.innerHTML = that.label;
                break;
            }
        }

        input.setAttribute('editor', that._controlType);

        for(let option in that._controlOptions) {
            input[option] = that._controlOptions[option];
        }

        that.input = input;

        if (this.value) {
            this.writeValue(this.value);
        }

        element.appendChild(input);
    }

    _setupInput() {
        const that = this;

        const _onTouched = that.onTouched.bind(that);
        const _onChange = that.onChange.bind(that);

        const attach = () => {
            if (!that._attached) {
                that.input.addEventListener('blur', _onTouched);
                that.input.addEventListener('change', _onChange);

                if (that.input.nodeName === 'INPUT') {
                    that.input.addEventListener('keyup', _onChange);
                }
                else if (that.input.querySelector('input')) {
                    that.input.querySelector('input').addEventListener('keyup', _onChange);
                }

                if (that.input instanceof HTMLDivElement) {
                    const inputs = that.input.querySelectorAll('input');
                    const radios = that.input.querySelectorAll('lw-radio-button');
                    const checks = that.input.querySelectorAll('lw-check-box');
                    const switches = that.input.querySelectorAll('lw-switch-button');

                    for(let i = 0; i < radios.length; i++){
                        radios[i].addEventListener('blur', _onTouched);
                    }

                    for(let i = 0; i < checks.length; i++){
                        checks[i].addEventListener('blur', _onTouched);
                    }

                    for(let i = 0; i < switches.length; i++){
                        switches[i].addEventListener('blur', _onTouched);
                    }

                    for(let i = 0; i < inputs.length; i++){
                        inputs[i].addEventListener('blur', _onTouched);
                        inputs[i].addEventListener('change', _onChange);
                    }
                }

                that._attached = true;
            }
         }

        that.input.whenRendered ? that.input.whenRendered(() => {
            attach();
        }) : attach();

        that.input.onAttached = () => {
            attach();
        }

        that.input.onDetached = () => {
            that.input.removeEventListener('blur', _onTouched);
            that.input.removeEventListener('change', _onChange);
            if (that.input.nodeName === 'INPUT') {
                that.input.removeEventListener('keyup', _onChange);
            }
            else if (that.input.querySelector('input')) {
                that.input.querySelector('input').removeEventListener('keyup', _onChange);
            }

            if (that.input instanceof HTMLDivElement) {
                const inputs = that.input.querySelectorAll('input');
                const radios = that.input.querySelectorAll('lw-radio-button');
                const checks = that.input.querySelectorAll('lw-check-box');
                const switches = that.input.querySelectorAll('lw-switch-button');

                for(let i = 0; i < radios.length; i++){
                    radios[i].removeEventListener('blur', _onTouched);
                }

                for(let i = 0; i < checks.length; i++){
                    checks[i].removeEventListener('blur', _onTouched);
                }

                for(let i = 0; i < switches.length; i++){
                    switches[i].removeEventListener('blur', _onTouched);
                }

                for(let i = 0; i < inputs.length; i++){
                    inputs[i].removeEventListener('blur', _onTouched);
                    inputs[i].removeEventListener('change', _onChange);
                }
            }

            that._attached = false;
        }

        that.element.name = that.name;
        that.input.name = that.element.name;

        if (that.input instanceof HTMLDivElement) {
            const children = that.input.querySelectorAll('input');

            for(let i = 0; i < children.length; i++) {
                children[i].name = that.name;
            }
        }

        that.input.setAttribute('name', that.input.name);

        if (!that.input.id) {
            if (!document.getElementById(that.name)){
                that.input.id = that.name
            }
            else {
                const id = that.name + '_' + LW.Utilities.Core.createGUID();

                that.input.id = id.replace(/-/ig, '');
            }
        }

        that.input.classList.add('lw-form-editor');

    }

    get root() {
        let x = this;
        while (x.parent) {
            x = x.parent;
        }
        return x;
    }

    get prepend() {
        return this._prepend;
    }

    get append() {
        return this._append;
    }

    get columnSpan() {
        return this._columnSpan;
    }

    set columnSpan(value) {
        const that = this;

        that._columnSpan = value;

        if (that._parent) {
            that._parent.refresh();
        }
    }

    get cssClass() {
        return this._cssClass;
    }

    set cssClass(value) {
        const that = this;

        that.input.classList.remove(that.cssClass);
        that._cssClass = value;
        that.input.classList.add(that.cssClass);
    }

    get required() {
        return this._required;
    }

    get controlType() {
        return this._controlType;
    }

    get validationRules() {
        return this._validationRules;
    }

    set validationRules(value) {
        this._validationRules = value;
        this.refresh();
    }

    get readonly() {
        return this._readonly;
    }

    set readonly(value) {
        const that = this;

        that._readonly = value;

        if (!that.element) {
            return;
        }

        if (value) {
            if (that.labelElement) {
                that.labelElement.setAttribute('readonly', '');
            }

            that.element.setAttribute('readonly', '');
        }
        else {
            that.element.removeAttribute('readonly');

            if (that.labelElement) {
                that.labelElement.removeAttribute('readonly');
            }
        }
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
        this.refresh();
    }

    get labelPosition() {
        return this._labelPosition;
    }

    set labelPosition(value) {
        this._labelPosition = value;
        this.refresh();
    }

    get hint() {
        return this._hint;
    }

    set hint(value) {
        this._hint = value;
        this.refresh();
    }

    get info () {
        return this._info ;
    }

    set info (value) {
        this._info  = value;
        this.refresh();
    }

    refresh() {
        const that = this;

        if (that.infoElement) {
            that.infoElement.remove();
        }

        if (that.appendElement) {
            that.appendElement.remove();
        }

        if (that.prependElement) {
            that.prependElement.remove();
        }

        if (that.cssClass) {
            that.input.classList.add(that.cssClass);
        }

        if (that.controlType === 'blank' || that.controlType === 'separator' || that.controlType === 'label' || that.controlType === 'boolean' || that.controlType === 'radio' ||
            that.controlType === 'checkBox' || that.controlType === 'checkbox') {
            return;
        }

        if (that._align) {
            that.element.classList.remove('left');
            that.element.classList.remove('center');
            that.element.classList.remove('right');
            that.element.classList.add(that._align);
        }

        that.infoElement = document.createElement('div');
        that.infoElementInner = document.createElement('span');
        that.infoElementInner.classList.add('lw-grid-icon', 'lw-form-control-icon', 'lw-icon-help-circled', 'show', 'lw-visibility-hidden');
        that.infoElementInner.setAttribute('tooltip', that.info);
        that.infoElement.appendChild(that.infoElementInner);

        that.appendElement = document.createElement('div');
        that.appendElement.classList.add('lw-form-control-addon');

        that.prependElement = document.createElement('div');
        that.prependElement.classList.add('lw-form-control-addon');

        if (that.info) {
            that.infoElementInner.classList.remove('lw-hidden');
            that.infoElementInner.classList.remove('lw-visibility-hidden');
        }

        if (that.append) {
            that.appendElement.innerHTML = '<span>' + that.append + '</span>';
            that.element.appendChild(that.appendElement);
        }

        if (that.prepend) {
            that.prependElement.innerHTML =  '<span>' + that.prepend + '</span>';
            that.element.insertBefore(that.prependElement, that.input);
        }

        that.element.appendChild(that.infoElement);

        if (that.label && that.controlType !== 'button' && that.controlType !== 'submit') {
            const labelElement = !that.labelElement ? document.createElement('label') : that.labelElement;

            labelElement.classList.add('lw-form-control-label');

            labelElement.setAttribute('for', that.input.id);

            if (that.validationRules.length > 0 || that.required) {
                labelElement.setAttribute('required', '');
            }

            labelElement.innerHTML = that.label;
            that.labelElement = labelElement;
        }

        if (that.parent) {
            that.parent.refresh();
        }
    }

    writeValue(value) {
        const that = this;

        that._setControlValue(value);
    }

    _setControlValue(value) {
        const that = this;

        that._updating = true;

        if (value === null) {
            if (that.input.selectedValues) {
                that.input.selectedValues = [];
            }

            if (that.input.selectedDates) {
                that.input.selectedDates = [];
            }

            if (that.input.checked !== undefined) {
                that.input.checked = false;
            }

            that.input.value = '';

            that._updating = false;
            return;
        }

        if (that.input.selectedValues) {
            if (Array.isArray(value)) {
                that.input.selectedValues = value;
            }
            else {
                that.input.selectedValues = [value];
            }

            that._updating = false;
            return;
        }

        if (that.input.selectedDates) {
            if (Array.isArray(value)) {
                that.input.selectedDates = value;
            }
            else {
                that.input.selectedDates =[value];
            }

            that._updating = false;
            return;
        }

        if (that.input.checked !== undefined) {
            if (value === '') {
                value = null;
            }

            const normalizedValue = typeof value === 'string' ? (value === 'true' ? true : false) : value;
            that.input.checked = normalizedValue;
        }

        if (that.input instanceof HTMLDivElement) {
            const inputs = that.input.querySelectorAll('input');
            const radioButtons = that.input.querySelectorAll('lw-radio-button');
            const checkBoxes = that.input.querySelectorAll('lw-check-box');
            const imageTemplate = that.input.querySelector('.lw-form-image-template');
            const template = that.input.querySelector('.lw-form-template');

            const setValues = (inputs) => {
                for(let i = 0; i < inputs.length; i++) {
                    const input = inputs[i];

                    if (typeof value === 'string') {
                        if (input.value === value) {
                            input.checked = true;
                        }
                        else {
                            input.checked = false;
                        }
                    }
                    else if (Array.isArray(value)) {
                        if(value.indexOf(input.value) >= 0) {
                            input.checked = true;
                        }
                        else {
                            input.checked = false;
                        }
                    }
                    else if (typeof value === 'boolean') {
                        input.checked = value;
                    }
                }
            }

            setValues( radioButtons.length > 0 ? radioButtons : (checkBoxes.length > 0 ? checkBoxes : inputs));

            if (imageTemplate) {
                imageTemplate.innerHTML = '<img src="' + value + '"/>';
            }
            else if (template) {
                template.innerHTML = value;
            }
        }

        that.input.value = value;

        that._updating = false;
    }

    _getControlValue() {
        const that = this;

        const selectedValues = that.input.selectedValues !== undefined ? 'selectedValues' : that.input.selectedDates !== undefined ? 'selectedDates' : null;

        if (selectedValues) {


            if (that.input[selectedValues].length > 1) {
                return that.input.selectedValues;
            }
            else if (that.input[selectedValues].length === 1) {
                if (that.input.selectedDates !== undefined) {
                    return that.input.selectedDates[0].toDate();
                }

                return that.input.selectedValues[0];
            }
            else if (that.input.querySelector('input')) {
                return that.input.querySelector('input').value;
            }
            else {
                return null;
            }
        }
        else if (that.input.checked !== undefined && this.input.nodeName.toLowerCase().startsWith('lw')) {
            return that.input.checked;
        }
        else if (that.input instanceof HTMLDivElement) {
            const inputs = that.input.querySelectorAll('input');
            const radioButtons = that.input.querySelectorAll('lw-radio-button');
            const checkBoxes = that.input.querySelectorAll('lw-check-box');

            const getValues = (inputs) => {
                let values = [];

                for(let i = 0; i < inputs.length; i++) {
                    const input = inputs[i];

                    if (input.value === '' && input.checked) {
                        values.push(true);
                    }
                    else if (input.value === '' && input.checked === false) {
                        values.push(false);
                    }
                    else if (input.checked) {
                        values.push(input.value);
                    }
                }

                if (values.length === 1) {
                    return values[0];
                }

                if (values.length === 0) {
                    return '';
                }

                return values;
            }

            return getValues( radioButtons.length > 0 ? radioButtons : (checkBoxes.length > 0 ? checkBoxes : inputs))
        }
        else {
            return that.input.value;
        }
    }

    reset() {
        const that = this;

        super.reset();

        that.element.classList.remove('lw-untouched');
        that.element.classList.remove('lw-touched');
        that.element.classList.remove('lw-dirty');
        that.element.classList.remove('lw-pristine');
        that.element.classList.remove('lw-valid');
        that.element.classList.remove('lw-invalid');
    }

    onTouched() {
        const that = this;

        if (that._updating) {
            return;
        }

        that.element.classList.remove('lw-untouched');
        that.element.classList.add('lw-touched');
        that.element.touched = true;

        that.markAsTouched();
        that.updateValueAndValidate();
    }

    onChange() {
        const that = this;

        if (that._updating) {
            return;
        }

        setTimeout(() => {
            that.element.classList.remove('lw-pristine');
            that.element.classList.add('lw-dirty');
            that.element.pristine = false;
            that._pristine = false;

            that._pendingValue = that._getControlValue();
            that._pendingChange = true;
            that._pendingDirty = true;

            that.updateControl(that);
        });
    }

    updateControl(control) {
        if (control._pendingDirty)
            control.markAsDirty();
        control.setValue(control._pendingValue, { emitModelToViewChange: false });
        control._pendingChange = false;
    }

    _validate() {
        const that = this;
        const input = that.input;

        if (that.form && that.form.validator) {
            that.form.validator.validate(null, '#' + input.id);
        }

        const errors = {};
        let hasErrors = false;

        for (let error in input.errors) {
            if (input.errors[error] === true) {
                errors[error] = true;
                hasErrors = true;
            }
        }

        return hasErrors ? errors : null;
    }

    disable() {
        super.disable();

        this.element.disabled = true;
        this.input.disabled = true;
    }

    enable() {
        super.enable();

        this.element.disabled = false;
        this.input.disabled = false;
    }

    show() {
        this.element.parentElement.classList.remove('lw-hidden');
    }

    hide() {
        this.element.parentElement.classList.add('lw-hidden');
    }
}

LW('lw-form-group', class HTMLFormGroup extends LW.BaseElement {
    static get properties() {
        return {
            'controlType': {
                value: 'input',
                type: 'string'
            },
            'columnSpan': {
                value: 1,
                type: 'number?'
            },
            'columns': {
                value: 1,
                type: 'number?'
            },
            'dataField': {
                value: '',
                type: 'string'
            },
            'disabled': {
                value: false,
                type: 'boolean'
            },
            'hint': {
                value: '',
                type: 'string'
            },
            'info': {
                value: '',
                type: 'string'
            },
            'label': {
                value: '',
                type: 'string'
            },
            'labelPosition': {
                value: 'left',
                type: 'string'
            },
            'onValueChanges': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'onStatusChanges': {
                value: null,
                type: 'any',
                reflectToAttribute: false
            },
            'showColorAfterLabel': {
                value: false,
                type: 'boolean'
            },
            'viewMode': {
                value: '',
                type: 'string'
            },
            'readonly': {
                value: false,
                type: 'boolean'
            },
            'validationRules': {
                value: [],
                type: 'any'
            },
            'value': {
                value: '',
                type: 'any'
            }
        }
    }

    template() {
        return '<div id="group"></div>'
    }

    render() {
        const that = this;

        const controls = [];

        if (that.value && that.value.indexOf && that.value.indexOf('{') >= 0) {
            that.value = JSON.parse(that.value);
        }

        for(let i = 0; i < that.$.group.children.length; i++) {
            const childControl = that.$.group.children[i];

            controls.push(childControl.controlOptions);
        }

        that.controlOptions.controls = controls;
        that.controlOptions.controlType = 'group';

        super.render();
    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        let parent = that.parentElement;
        while(parent) {
            if (parent.nodeName === 'LW-FORM') {
                const control = parent.getControl(that.controlOptions.dataField);
                control[propertyName] = newValue;
                break;
            }
            parent = parent.parentElement;
        }

        that.controlOptions[propertyName] = newValue;
    }

    get controlOptions() {
        const that = this;

        if (!that._controlOptions && that._properties) {
            let controlOptions = {};

            for (let propertyName in that._properties) {
                if (that._properties[propertyName].value !== that._properties[propertyName].defaultValue) {
                    controlOptions[propertyName] = that._properties[propertyName].value;
                }
            }

            controlOptions.custom = true;
            that._controlOptions = controlOptions;
        }
        return that._controlOptions;
    }
});

LW('lw-form', class HTMLForm extends LW.FormGroup {
    render() {
        super.render();
        const that = this;

        const controlOptions = that.controlOptions;
        that.form = new Form('#' + that.id, controlOptions);
    }

    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        if (that.form) {
          that.form[propertyName] = newValue;
        }
    }

    getControl(controlName) {
        return this.form.getControl(controlName);
    }

    validate() {
        this.form.validate();
    }

    submit(options) {
        this.form.submit(options);
    }

    reset() {
        this.form.reset();
    }

    get state() {
        if (this.form) {
            return this.form.state;
        }

        return null;
    }

    set state(value) {

    }
});

class FormGroup extends Control {
    constructor(template, config) {
        super(null, config);

        const that = this;

        if (template.value && !template.controls) {
            let controls = [];

            for (let name in template.value) {
                const controlValue = template.value[name];
                let controlType = name.toLowerCase().indexOf('date') >= 0 || controlValue instanceof Date ? 'date' : controlValue.length < 40 ? 'text' : 'textarea';

                if (typeof controlValue === 'number' || (controlType !== 'date' && !isNaN(new Number(controlValue)))) {
                    controlType = 'number';
                }

                if (controlValue === 'true' || controlValue === 'false' || controlValue === true || controlValue === false) {
                    controlType = 'boolean';
                }

                if (controlValue.indexOf('.jpg') >= 0 || controlValue.indexOf('.png') >= 0 || controlValue.indexOf('.gif') >= 0) {
                    controlType = 'template';
                }

                const control = {
                    dataField: name,
                    label: name,
                    value: controlValue,
                    controlType: controlType
                }

                if (controlType === 'template') {
                    control.template = '<div class="lw-form-image-template"><img src="' + controlValue + '"/></div>'
                }

                controls.push(control);
            }

            template.controls = controls;
        }

        if (template.controls) {
            that._labelPosition = template.labelPosition || '';
            that._labelOffset = template.labelOffset || 10;
            that._showColonAfterLabel = template.showColonAfterLabel || false;
            that._columnSpan = template.columnSpan || 1;
            that._controls = {};
            that._columns = template.columns || 1;
            that._label = template.label || '';
            that._viewMode = template.viewMode || '';
            that._readonly = template.readonly || false;
            that._labelAlign = template.labelAlign || '';
            that._showButtons = template.showButtons || '';
            that._nextButtonLabel = template.nextButtonLabel || 'Next';
            that._backButtonLabel = template.backButtonLabel || 'Back';

            if (template.onValueChanges) {
                that.onValueChanges = template.onValueChanges;
            }

            if (template.onStatusChanges) {
                that.onStatusChanges = template.onStatusChanges;
            }

            if (!template.name) {
                template.name = template.dataField;
            }
            else if (!template.dataField) {
                template.dataField = template.name;
            }

            that.name = template.name || '';
            that.dataField = template.dataField || '';

            that.element = document.createElement('div');
            that.labelElement = document.createElement('div');
            that.contentElement = document.createElement('div');

            that.element.appendChild(that.labelElement);
            that.element.appendChild(that.contentElement);

            that.labelElement.classList.add('lw-form-group-label');
            that.contentElement.classList.add('lw-form-group-content');

            if (!that.label) {
                that.labelElement.classList.add('lw-hidden');
            }

            that.element.classList.add('lw-form-group');

            if (that.viewMode === '') {
                that.element.setAttribute('columns', that.columns);
            }

            that.labelElement.innerHTML = that.label + (that._showColonAfterLabel ? ':' : '');

            for(let i = 0; i < template.controls.length; i++) {
                let templateControl = template.controls[i];

                if (typeof templateControl === 'string') {
                    const normalizedControl = {
                        dataField: templateControl,
                        label: templateControl,
                        type: 'text'
                    };

                    templateControl = normalizedControl;
                }

                const formControlOptions = templateControl;

                that._addControl = (formControlOptions) => {
                    const rowElement = document.createElement('div');

                    if (!formControlOptions.labelPosition) {
                        formControlOptions.labelPosition = that._labelPosition;
                    }

                    if (!formControlOptions.name) {
                        formControlOptions.name = formControlOptions.dataField;
                    }
                    else if (!formControlOptions.dataField) {
                        formControlOptions.dataField = formControlOptions.name;
                    }

                    const control = that._createControl(formControlOptions.name, formControlOptions);

                    if (formControlOptions.name) {
                        that._controls[formControlOptions.name] = control;
                    }

                    if (!that._controls.$) {
                        that._controls.$ = [];
                    }

                    that._controls.$.push(control);

                    control._parent = this;
                    rowElement.classList.add('lw-form-row');

                    if (control.labelElement) {
                        rowElement.appendChild(control.labelElement);
                    }

                    rowElement.appendChild(control.element);

                    that.contentElement.appendChild(rowElement);

                    return control;
                }

                that._addControl(formControlOptions);
            }

           that.refresh();
        }
        else {
            that._controls = that._reduceControls(template);
        }

        that._onValueAndStatusUpdate = () => {
            if (that.element) {
                that.element.classList.remove('lw-valid');
                that.element.classList.remove('lw-invalid');

                that.element.classList.add('lw-' + that.status);
            }
        }

        that._setUpControls();

        that.updateValueAndValidate({ onlySelf: true, emitEvent: false });
    }

    addControl(controlOptions) {
        const that = this;

        const control = that._addControl(controlOptions);
        that[control.name] = control;
        that.refresh();
    }

    insertControl(index, controlOptions) {
        const that = this;

        const row = that.contentElement.querySelectorAll('.lw-form-row')[index];

        const control = that._addControl(controlOptions);
        that[control.name] = control;

        that.contentElement.insertBefore(control.element.parentElement, row);
        that.refresh();
    }

    removeControl(controlName) {
        const that = this;

        if (that[controlName]) {
            that[controlName].element.parentElement.remove();
            const index = that.controls.$.indexOf(that[controlName]);

            that.controls.$.splice(index, 1);

            delete that[controlName];
            delete that._controls[controlName];
        }
    }

    refresh() {
        const that = this;

        let longestLabel = '';

        if (that.viewMode === '') {
            that.element.setAttribute('columns', that.columns);
        }
        that.labelElement.innerHTML = that.label + (that.controlType !== 'group' && that.showColonAfterLabel ? ':' : '');

        that.labelElement.className = 'lw-form-group-label';

        if (!that.label) {
            that.labelElement.classList.add('lw-hidden');
        }

        if (that.labelAlign) {
            that.labelElement.classList.add(that.labelAlign);
        }

        if (!that._controls) {
            that._controls = {$: []};
        }
        else if (that._controls && !that._controls.$) {
            that._controls.$ = [];
        }

        for(let i = 0; i < that._controls.$.length; i++) {
            const control = that._controls.$[i];

            if (control._controlType === 'group') {
                continue;
            }

            if (control.labelElement) {
                if (longestLabel.length < control.label.length) {
                    longestLabel = control.label;
                }
            }
        }

        const calculatedLabelWidth = (() => {
            const label = document.createElement('label');
            label.classList.add('lw-form-control-label');
            label.innerHTML = longestLabel;
            document.body.appendChild(label);
            const width = label.offsetWidth + that._labelOffset;
            label.remove();

            return width;
        })();

        for(let i = 0; i < that._controls.$.length; i++) {
            const control = that._controls.$[i];
            const rowElement = control.element.parentElement;

            if (!control.labelElement || control.controlType === 'group') {
                continue;
            }

            if (control.labelPosition === 'left') {
                rowElement.style.display = 'grid';
                rowElement.style.gridTemplateColumns = calculatedLabelWidth + 'px auto';
            }
            else {
                rowElement.style.display = '';
                rowElement.style.gridTemplateColumns = '';
            }
        }

        const tabItems = [];

        for(let i = 0; i < that._controls.$.length; i++) {
            const control = that._controls.$[i];
            const rowElement = control.element.parentElement;

            control.readonly = that.readonly;
            control.showColonAfterLabel = that.showColonAfterLabel;

            if (control.columnSpan > 1 && control.columnSpan <= that.columns) {
                rowElement.style.gridColumn = 'span ' + control.columnSpan;
            }
            else {
                rowElement.style.gridColumn = '';
            }

            if (control.labelElement) {
                control.labelElement.innerHTML = control.label + (control.controlType !== 'group' && that._showColonAfterLabel ? ':' : '');

                if (that.viewMode === 'tabs' || that.viewMode === 'accordion' || that.viewMode === 'breadcrumb') {
                    if (control.label && control._controlType !== 'button' && control._controlType !== 'label' && control._controlType !== 'submit') {
                        tabItems.push({label: control.label, control: control, id: control.name, row: rowElement});
                    }
                }
            }

            if (control.labelElement && !rowElement.contains(control.labelElement)) {
                rowElement.firstElementChild.remove();
                rowElement.insertBefore(control.labelElement, control.element);
            }
        }

        that._refreshButtons();

        if (that.viewMode === 'tabs' || that.viewMode === 'accordion' || that.viewMode === 'breadcrumb') {
            if (that.tabs) {
                that.tabs.remove();
            }

            const tabs = document.createElement('div');

            tabs.classList.add('lw-form-tab-strip');

            if (that.viewMode === 'accordion') {
                tabs.setAttribute('vertical', '');
            }
            else if (that.viewMode === 'breadcrumb') {
                tabs.setAttribute('breadcrumb', '');
            }

            for(let i = 0; i < tabItems.length; i++) {
                const tab = document.createElement('div');
                const tabItem = tabItems[i];

                if (i === 0) {
                    tab.classList.add('selected');
                    tabItem.row.classList.add('selected');
                    that._currentTabItem = tabItem;
                }

                tab.classList.add('lw-form-tab');

                if (that.viewMode === 'breadcrumb') {
                    tab.innerHTML = '<div class="lw-form-tab-label">' +  '<span class="circle">' + (1+i) + '</span>' + '<span>' + tabItem.label + '</span>' + '</div>';
                }
                else {
                    tab.innerHTML = '<div class="lw-form-tab-label">' + tabItem.label + '</div>';
                }

                if (that.viewMode === 'accordion') {
                    tab.innerHTML += '<div class="lw-form-tab-button"><span class="lw-arrow lw-arrow-up"></span></div>'
                }

                tab.dataField = tabItem.control.name;
                tabItem.control.tabItem = tabItem;
                tabItem.control.nextButton = that.nextButton;
                tabItem.control.backButton = that.backButton;

                tab.onclick = function() {
                    let currentTabItem = null;

                    if (that._currentTabItem.control.status === 'invalid') {
                        return;
                    }

                    for(let i = 0; i < tabItems.length; i++) {
                        const tabItem = tabItems[i];

                        tabItem.tab.classList.remove('selected');
                        tabItem.row.classList.remove('selected');

                        if (tabItem.tab === this) {
                            currentTabItem = tabItem;
                            that._currentTabItem = tabItem;
                            if (that.showButtons) {
                                that.backButton.classList.remove('lw-hidden');
                                that.nextButton.classList.remove('lw-hidden');

                                if (i === 0) {
                                    that.backButton.classList.add('lw-hidden');
                                }
                                else if (i === tabItems.length - 1) {
                                    that.nextButton.classList.add('lw-hidden');
                                }
                            }
                        }
                    }

                    this.classList.add('selected');

                    requestAnimationFrame(() => {
                        currentTabItem.row.classList.add('selected');

                        if (that.viewMode === 'accordion') {
                            tabs.insertBefore(currentTabItem.row, this.nextSibling);
                        }
                    });
                }

                tabItem.tab = tab;
                tabItem.row.classList.add('lw-form-tab-control');

                tabs.appendChild(tab);

                if (that.viewMode === 'accordion') {
                    if (i === 0 ) {
                        tabs.appendChild(tabItem.row);
                    }

                    tabItem.row.setAttribute('vertical', '');
                }
            }

            that.tabs = tabs;
            that.contentElement.insertBefore(tabs, that.contentElement.firstElementChild);


        }
    }

    _refreshButtons() {
        const that = this;

        if (that.buttonsContainer) {
            that.buttonsContainer.remove();
        }

        that.nextButton = document.createElement('lw-button');
        that.backButton = document.createElement('lw-button');

        that.nextButton.classList.add('primary');
        that.backButton.classList.add('flat');

        that.nextButton.innerHTML = that.nextButtonLabel;
        that.backButton.innerHTML = that.backButtonLabel;

        const buttonsContainer = document.createElement('div');

        buttonsContainer.classList.add('lw-form-group-buttons', 'lw-form-row');
        buttonsContainer.appendChild(that.backButton);
        buttonsContainer.appendChild(that.nextButton);

        that.contentElement.appendChild(buttonsContainer);
        that.buttonsContainer = buttonsContainer;

        that.backButton.classList.add('lw-hidden');
        that.nextButton.onclick = () => {
            const tabs = that.contentElement.querySelectorAll('.lw-form-tab');

            for(let i = 0; i < tabs.length; i++) {
                const tab = tabs[i];

                if (tab.classList.contains('selected')) {
                    const nextTab = tabs[i+1];

                    if (nextTab) {
                        nextTab.click();
                        break;
                    }
                }
            }
        }

        that.backButton.onclick = () => {
            const tabs = that.contentElement.querySelectorAll('.lw-form-tab');

            for(let i = 0; i < tabs.length; i++) {
                const tab = tabs[i];

                if (tab.classList.contains('selected')) {
                    const prevTab = tabs[i-1];

                    if (prevTab) {
                        prevTab.click();
                        break;
                    }
                }
            }
        }

        if (!that.showButtons) {
            that.backButton.classList.add('lw-hidden');
            that.nextButton.classList.add('lw-hidden');
        }
    }

    get labelAlign() {
        return this._labelAlign;
    }

    set labelAlign(value) {
        this._labelAlign = value;
        this.refresh();
    }

    get showButtons() {
        return this._showButtons;
    }

    set showButtons(value) {
        this._showButtons = value;
        this.refresh();
    }

    get nextButtonLabel() {
        return this._nextButtonLabel;
    }

    set nextButtonLabel(value) {
        this._nextButtonLabel = value;
        this.refresh();
    }

    get backButtonLabel() {
        return this._backButtonLabel;
    }

    set backButtonLabel(value) {
        this._backButtonLabel = value;
        this.refresh();
    }

    get viewMode() {
        return this._viewMode;
    }

    set viewMode(value) {
        this._viewMode = value;
        this.refresh();
    }

    get columnSpan() {
        return this._columnSpan;
    }

    set columnSpan(value) {
        const that = this;

        that._columnSpan = value;

        if (that._parent) {
            that._parent.refresh();
        }
    }

    get controlType() {
        return 'group';
    }

    get labelOffset() {
        return this._labelOffset;
    }

    set labelOffset(value) {
        const that = this;

        that._labelOffset = value;

        that.refresh();
    }

    get readonly() {
        return this._readonly;
    }

    set readonly(value) {
        const that = this;

        that._readonly = value;

        that.refresh();
    }


    get showColonAfterLabel() {
        return this._showColonAfterLabel;
    }

    set showColonAfterLabel(value) {
        const that = this;

        that._showColonAfterLabel = value;

        that.refresh();
    }

    get labelPosition() {
        return this._labelPosition;
    }

    set labelPosition(value) {
        const that = this;

        that._labelPosition = value;

        for(let i = 0; i < that.controls.$.length; i++) {
            that.controls.$[i].labelPosition = value;
        }

        that.refresh();
    }

    get columns() {
        return this._columns;
    }

    set columns(value) {
        const that = this;

        that._columns = value;

        that.refresh();
    }

    get label() {
        return this._label;
    }

    set label(value) {
        const that = this;

        that._label = value;
        that.refresh();
    }

    _group(controls, options) {
        controls = this._reduceControls(controls);

        const formGroup = new FormGroup(controls, options);

        return formGroup;
    }

    _reduceControls(controlsConfig) {
        const that = this;
        const controls = {};

        Object.keys(controlsConfig).forEach((
        controlName=>{
            if (controlName !== '') {
                controls[controlName] = that._createControl(controlName, controlsConfig[controlName]);
            }
        }
        ));

        return controls;
    }

    _createControl(controlName, controlOptions) {
        const that = this;

        let control = document.querySelector(`[form-control-name="${controlName}"]`);
        let group = document.querySelector(`[form-group-name="${controlName}"]`);

        if (group && !(controlOptions instanceof FormGroup)) {
            return this._group(controlOptions, {});
        }

        if (controlOptions instanceof FormControl || controlOptions instanceof FormGroup) {
            controlOptions.name = controlName;

            if (group) {
                controlOptions.element = group;
            }

            if (controlOptions instanceof FormControl) {
                controlOptions.element.setAttribute('form-control-name', controlName);
            }
            else if (controlOptions instanceof FormGroup) {
                controlOptions.element.setAttribute('form-group-name', controlName);
            }

            return controlOptions;
        }
         else if (Array.isArray(controlOptions)) {
            const value = controlOptions[0];
            const controlConfig = controlOptions.length > 1 ? controlOptions[1] : {};

            controlConfig.name = controlName;

            if (!control) {
                return that._createTemplateControl(controlConfig);
            }

            return new FormControl(control, value, controlConfig);
        }
        else {
            if (!control) {
                return that._createTemplateControl(controlName, controlOptions);
            }

            control.name = controlName;

            return new FormControl(control, '');
        }
    }

    _createTemplateControl(controlName, controlOptions = {}) {
        const element = document.createElement('div');

        if (controlName) {
            element.setAttribute('form-control-name', controlName);
        }

        controlOptions.custom = true;

        if (controlOptions.controlType === 'group') {
            return new FormGroup(controlOptions);
        }

        return new FormControl(element, controlOptions.value || '', controlOptions);
    }

    _setUpControls() {
        const that = this;
        this._forEachChild((
        (control)=>{
            control.parent = that;
            that[control.name] = control;
        }
        ));
    }

    _forEachChild(cb) {
        const that = this;

        const keys = Object.keys(that.controls);

        for(let i = 0; i < keys.length; i++) {
            const controlKey = keys[i];

            if (controlKey === '$') {
                continue;
            }

            const control = that.controls[controlKey];

            cb(control, controlKey);
        }
    }

    _checkAllValuesPresent(value) {
        this._forEachChild((
        (control,name)=>{
            if (name !== '$' && value[name] === undefined && value[name] !== '') {
                throw new Error(`Must supply a value for form control with name: '${name}'.`);
            }
        }
        ));
    }

    get controls() {
        return this._controls;
    }

    setValue(value, options={emitEvent:false}) {
        const that = this;

        if (value === null) {
            this._forEachChild((
                (control)=>{
                    control.value = null;
                }
                ));
            that.updateValueAndValidate(options);
            return;
        }

        that._checkAllValuesPresent(value);
        Object.keys(value).forEach((

        name=>{
            that._throwIfControlMissing(name);
            that.controls[name].setValue(value[name], {
                onlySelf: true,
                emitEvent: options.emitEvent
            });
        }
        ));

        that.updateValueAndValidate(options);
    }

    _throwIfControlMissing(index) {
        if (!this.at(index)) {
            throw new Error(`Cannot find form control at index ${index}`);
        }
    }

    at(index) {
        return this.controls[index];
    }

    patchValue(value, options={emitEvent: false}) {
        Object.keys(value).forEach((
                   name=>{
                       if (this.controls[name]) {
                           this.controls[name].patchValue(value[name], {
                               onlySelf: true,
                               emitEvent: options.emitEvent
                           });
                       }
                   }
                   ));
                   this.updateValueAndValidate(options);
    }

    get root() {
        let x = this;
        while (x.parent) {
            x = x.parent;
        }
        return x;
    }

    _allControls(condition) {
        let result = true;

        this._forEachChild((
        (control)=>{
            result = result && control[condition];
        }
        ));

        return result;
    }

    _anyControls(condition) {
        let result = false;

        this._forEachChild((
            (control)=>{
                result = result || control[condition];
            }
            ));

        return result;
    }

    _updateValue() {
       this._value = this._reduceValue();
    }

    _reduceValue() {
        return this._reduceChildren({}, (

        (acc,control,name)=>{
            if (control.enabled || this.disabled) {
                acc[name] = control.value;
            }
            return acc;
        }
        ));
    }

    _reduceChildren(initValue, fn) {
        let res = initValue;
        this._forEachChild((
        (control,name)=>{
            res = fn(res, control, name);
        }
        ));
        return res;
    }
}

class Form extends Control {
    constructor(selector, options) {
        super();
        const that = this;

        that.element = document.querySelector(selector);

        if (!that.element) {
            that.element = document.createElement('div');
        }

        that.element.classList.add('lw-form');

        that.submitted = false;
        that.selector = selector;

        that.rootFormGroup = new FormGroup(options);
        that.rootFormGroup.parent = that;

        if (that.rootFormGroup.element && !that.element.contains(that.rootFormGroup.element)) {
            that.element.appendChild(that.rootFormGroup.element);
        }
        else {
            that.rootFormGroup.element = that.element;
        }

        let validationRules = [];

        // Validator
        const summary = document.createElement('div');
        summary.classList.add('lw-form-row', 'lw-validation-summary');
        summary.id = that.element.id + '_validationSummary';

        that.summary = summary;

        that.rootFormGroup._forEachChild((
            (control, controlName)=>{
                that[controlName] = control;
                control.form = that;

                const setupControlRules = (control) => {
                    const controlName = control.name;

                    if (control.validationRules && control.validationRules.length > 0) {
                        for(let i = 0; i < control.validationRules.length; i++) {
                            const rule = control.validationRules[i];
                            const validationRule = rule;

                            if (!rule.type) {
                                rule.type = 'required';
                            }

                            if (!rule.message) {
                                rule.message = 'Invalid Input';
                            }

                            rule.input = '#' + control.input.id;
                            rule.action = 'keyup, blur, change';

                            validationRules.push(validationRule);
                        }
                    }
                    else if (control.required){
                        const rule = {type: 'required', message: `${controlName} is required`, action: 'keyup, blur, change', input: '#' + control.input.id}
                        validationRules.push(rule);
                    }
                }

                setupControlRules(control);

                const loopThroughChildren = (control) => {
                    control._forEachChild((control) => {
                            control.form = that;
                            setupControlRules(control);

                            if (control instanceof FormGroup) {
                                loopThroughChildren(control);
                            }
                        })
                    }

                    if (control instanceof FormGroup) {
                        loopThroughChildren(control);
                    }
               }
        ));


        that.element.appendChild(summary);

        that.validator = new LW.Utilities.Validator(validationRules, '#' + summary.id);

        const isValid = that.validator.validate();

        that.element.addEventListener('submit', (event) => {
            if (that.async) {
                event.preventDefault();
                that.submit({async: true})
            }
        });

        that.rootFormGroup._onValueAndStatusUpdate = () => {
            if (that.rootFormGroup.status === 'invalid') {
                that._handleValidity(false);
            }
            else {
                that._handleValidity(true);
            }

            that.element.classList.remove('lw-valid');
            that.element.classList.remove('lw-invalid');

            that.element.classList.add('lw-' + that.rootFormGroup.status);
        }

        that._showSummary = options.showSummary !== undefined ? options.showSummary : true;
        that._readonly = options.readonly || false;
        that._async = options.async || false;
        that._showColonAfterLabel = options.showColonAfterLabel || false;

        if (window.LW.RenderMode === 'manual') {
            window.LW.Render();
        }

        that._handleSummaryVisibility();
        that._handleValidity(isValid);

        if (options.value) {
            that.value = options.value;
        }

        that._updateStatus();

        if (document.readyState !== 'complete') {
            window.addEventListener('load', () => {
                that._handleSummaryVisibility();
                that._handleValidity(isValid);
                that._updateStatus();
            });
        }
    }

    _updateStatus() {
        const that = this;

        that.rootFormGroup._forEachChild((
            (control)=>{
                const loopThroughChildren = (control) => {
                    control._forEachChild((control) => {
                            if (control instanceof FormGroup) {
                                loopThroughChildren(control);
                            }
                            else {
                                control.updateValueAndValidate();
                            }
                        })
                    }

                    if (control instanceof FormGroup) {
                        loopThroughChildren(control);
                    }
                    else {
                       control.updateValueAndValidate();
                    }
            }
        ));
    }

    getControl(controlName) {
        const that = this;

        let formControl = null;

        that.rootFormGroup._forEachChild((
            (control)=>{
                const loopThroughChildren = (control) => {
                    control._forEachChild((control) => {
                            if (control instanceof FormGroup) {
                                loopThroughChildren(control);
                            }

                            if (control.name === controlName){
                                formControl = control;
                            }
                        })
                    }

                    if (control.dataField === controlName){
                        formControl = control;
                    }

                    if (control instanceof FormGroup) {
                        loopThroughChildren(control);
                    }
            }
        ));

        return formControl;
    }

    _handleValidity(isValid) {
        const that = this;

        const submitButton = that.element.querySelector('[type="submit"]');

        if (!submitButton) {
            return;
        }

        submitButton.disabled = !isValid;
    }

    get readonly() {
        return this._readonly;
    }

    set readonly(value) {
        const that = this;

        that._readonly = value;

        if (this.rootFormGroup) {
            this.rootFormGroup.readonly = value;
        }
    }

    get showColonAfterLabel() {
        return this._showColonAfterLabel;
    }

    set showColonAfterLabel(value) {
        const that = this;

        that._showColonAfterLabel = value;

        if (this.rootFormGroup) {
            this.rootFormGroup.showColonAfterLabel = value;
        }
    }

    get showSummary() {
        return this._showSummary;
    }

    set showSummary(value) {
        const that = this;

        that._showSummary = value;
        that._handleSummaryVisibility();
    }

    get async() {
        return this._async;
    }

    set async(value) {
        this._async = value;
    }

    addControl(controlOptions) {
        if (this.rootFormGroup) {
            this.rootFormGroup.addControl(controlOptions);
        }
    }

    insertControl(index, controlOptions) {
        if (this.rootFormGroup) {
            this.rootFormGroup.insertControl(index, controlOptions);
        }
    }

    removeControl(controlName) {
        if (this.rootFormGroup) {
            this.rootFormGroup.removeControl(controlName);
        }

        delete this[controlName];
    }

    _handleSummaryVisibility() {
        const that = this;

        if (!that.showSummary) {
            that.summary.classList.add('lw-hidden');
        }
        else {
            that.summary.classList.remove('lw-hidden');
        }
    }

    get status() {
        if (this.rootFormGroup) {
            this.rootFormGroup._calculateStatus();
        }

        return this.rootFormGroup.status;
    }

    set status(value) {

    }

    get labelPosition() {
        if (this.rootFormGroup) {
            return this.rootFormGroup.labelPosition;
        }

        return 'top';
    }

    set labelPosition(value) {
        if (this.rootFormGroup) {
            this.rootFormGroup.labelPosition = value;
        }
    }

    get columns() {
        if (this.rootFormGroup) {
            return this.rootFormGroup.columns;
        }

        return 1;
    }

    set columns(value) {
        if (this.rootFormGroup) {
            this.rootFormGroup.columns = value;
        }
    }

    get onValueChanges() {
        return this.rootFormGroup ? this.rootFormGroup.onValueChanges : null;
    }

    set onValueChanges(value) {
        if (this.rootFormGroup) {
            this.rootFormGroup.onValueChanges = value;
        }
    }

    get onStatusChanges() {
        return this.rootFormGroup ? this.rootFormGroup.onStatusChanges : null;
    }

    set onStatusChanges(value) {
        const that = this;

        if (this.rootFormGroup) {
            this.rootFormGroup.onStatusChanges = () => {
                value(that.state);
            };
        }
    }

    get state() {
        const that = this;
        const status = {'form': that.status};
        const state = {};

        status.state = state;

        that.rootFormGroup._forEachChild((
            (control, controlName)=>{
                const loopThroughChildren = (control) => {
                    control._forEachChild((control, controlName) => {
                            if (control instanceof FormGroup) {
                                loopThroughChildren(control);
                            }
                            else {
                                status[controlName] = control.status;
                            }
                        })
                    }

                    if (control instanceof FormGroup) {
                        loopThroughChildren(control);
                    }
                    else {
                        status[controlName] = control.status;
                        state[controlName] = {dirty: control.dirty, untouched: control.untouched, disabled: control.disabled}
                    }
            }
        ));

        return status;
    }

    get control() {
        return this.rootFormGroup;
    }

    get value() {
        return this.control.value;
    }

    set value(value) {
        const that = this;

        that.control.setValue(value);

        if (that.validator) {
            const isValid = that.validator.validate();
            that._handleValidity(isValid);
        }
    }

    patchValue(value, options) {
        this.control.patchValue(value, options);
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    validate() {
        const that = this;

        if (that.validator) {
            const isValid = that.validator.validate();
            that._handleValidity(isValid);
        }
    }

    submit (config) {
        const that = this;

        if (!config) {
            config = {};

            if (that.element.action) {
                config.action = that.element.action;
            }

            if (that.element.target) {
                config.target = that.element.target;
            }

            if (that.element.method) {
                config.method = that.element.method;
            }
        }

        const action = config.action;
        const target = config.target;
        const method = config.method;
        const async = config.async || that.async;

        if (!async) {
            if (that.element.nodeName === 'form') {
                that.element.submit();
            }
            else {
                let html = '<form id=\'lw_formToSubmit\'';

                if (action) {
                    html += ' action="' + action + '"';
                }
                if (target) {
                    html += ' target="' + target + '"';
                }

                if (method && method.toString().toLowerCase() === 'get')
                    html += ' method="GET"';
                else
                    html += ' method="POST"';

                if (config.acceptCharset) {
                    html += ' accept-charset="' + config.acceptCharset + '"';
                }

                if (config.enctype) {
                    html += ' enctype="' + config.enctype + '"';
                }

                if (config.name) {
                    html += ' name="' + config.name + '"';
                }

                if (config.enctype) {
                    html += ' id="' + config.id + '"';
                }

                html += '>';

                that.rootFormGroup._forEachChild((
                    (control, controlName)=>{
                        const loopThroughChildren = (control) => {
                            control._forEachChild((control, controlName) => {
                                    if (control instanceof FormGroup) {
                                        loopThroughChildren(control);
                                    }
                                    else {
                                        html += '<input type="hidden" ';
                                        html += ' name="' + controlName + '"';
                                        html += ' value="' + control.value + '"';
                                        html += '>';
                                    }
                                })
                            }

                            if (control instanceof FormGroup) {
                                loopThroughChildren(control);
                            }
                            else {
                                html += '<input type="hidden" ';
                                html += ' name="' + controlName + '"';
                                html += ' value="' + control.value + '"';
                                html += '>';
                            }
                    }
                ));


                html += '</form>';

                const form = document.createElement('div');
                form.innerHTML = html;
                that.element.appendChild(form);
                form.querySelector('#lw_formToSubmit').submit();
                that.element.removeChild(form);
            }
        }
        else {
            const XHR = new XMLHttpRequest(),
            FD  = new FormData();


            that.rootFormGroup._forEachChild((
                (control, controlName)=>{
                    const loopThroughChildren = (control) => {
                        control._forEachChild((control, controlName) => {
                                if (control instanceof FormGroup) {
                                    loopThroughChildren(control);
                                }
                                else {
                                    FD.append( controlName, control.value  );
                                }
                            })
                        }

                        if (control instanceof FormGroup) {
                            loopThroughChildren(control);
                        }
                        else {
                            // Push our data into our FormData object
                            FD.append( controlName, control.value  );
                        }
                }
            ));

            // Define what happens on successful data submission
            XHR.addEventListener( 'load', function( event ) {
                // eslint-disable-next-line
                console.log(event.target.responseText);
            } );

            // Define what happens in case of error
            XHR.addEventListener(' error', function( event ) {
                // eslint-disable-next-line
                console.log(event.target.responseText);
            } );

            // Set up our request
            XHR.open( 'POST', action, true );

            // Send our FormData object; HTTP headers are set automatically
            XHR.send( FD );
        }

        this.submitted = true;
    }

    reset() {
        const that = this;

        that.submitted = false;
        that.value = null;
    }
}

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
// eslint-disable-next-line
function isEmptyInputValue(value) {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
}

class FormValidator {

    static null(control) {
        return control.value === null;
    }

    static email(control) {
        if (isEmptyInputValue(control.value)) {
            return null; // don't validate empty values to allow optional controls
        }
        return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
    }

    static min(control, min) {
        return (
        (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null; // don't validate empty values to allow optional controls
            }
            const value = parseFloat(control.value);
            // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
            return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
        });
    }

    static max(control, max) {
        return (
        (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null; // don't validate empty values to allow optional controls
            }
            const value = parseFloat(control.value);
            // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
            return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
        });
    }

    static required(control) {
        return isEmptyInputValue(control.value) ? { 'required': true } : null;
    }

    static requiredTrue(control) {
        return control.value === true ? null : { 'required': true };
    }

    static minLength(control, minLength) {
        return (
        (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }

            const length = control.value ? control.value.length : 0;
            return length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': length } } :
                null;
        });
    }

    static maxLength(control, maxLength) {
        return (
        (control) => {
             const length = control.value ? control.value.length : 0;
            return length > maxLength ?
                { 'maxlength': { 'requiredLength': maxLength, 'actualLength': length } } :
                null;
        });
    }

    static pattern(control, pattern) {
        if (!pattern)
            return FormValidator.null;
        let regex;
        let regexStr;
        if (typeof pattern === 'string') {
            regexStr = '';
            if (pattern.charAt(0) !== '^')
                regexStr += '^';
            regexStr += pattern;
            if (pattern.charAt(pattern.length - 1) !== '$')
                regexStr += '$';
            regex = new RegExp(regexStr);
        }
        else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        return (
        (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }

            const value = control.value;
            return regex.test(value) ? null :
                { 'pattern': { 'requiredPattern': regexStr, 'actualValue': value } };
        });
    }
}
LW.Form = Form;
LW.FormControl = FormControl;
LW.FormGroup = FormGroup;
LW.FormValidator = FormValidator;
