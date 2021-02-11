import { Component, h, Element, Prop, Watch, Listen, State, forceUpdate } from "@stencil/core";
import isNil from "lodash-es/isNil";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n/it.js";
import "flatpickr/dist/l10n/fr.js";
import "flatpickr/dist/l10n/de.js";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class Input {
    constructor() {
        this.invokeHitEnterCallback = () => null;
        this.invokeChangeCallback = () => null;
        this.invokeInputCallback = () => null;
        this.invokeFocusCallback = () => null;
        this.invokeBlurCallback = () => null;
        this.invokeKeyDownCallback = () => null;
        this.hasInputElFocus = false;
        /**
         * Text for the screen reader labelling the input field.
         */
        this.srHint = "";
        /**
         * Default text that will be shown unless there's a value.
         */
        this.placeholder = "";
        /**
         * Default input field type (e.g. "search", "password", "date", etc.). When set to "date", flatpickr will take over. Caution: flatpickr does not fulfill the accessibility requirements of SDX, yet (but we're on it...).
         */
        this.type = "text";
        /**
         * Can be used for both reading and writing the value.
         */
        this.value = "";
        /**
         * Marks the text within the input on focus.
         */
        this.selectTextOnFocus = false;
        /**
         * @private
         * CSS styles applied to the input element.
         */
        this.inputStyle = {};
        /**
         * Disabled, but focussable using tab.
         */
        this.readonly = false;
        /**
         * Disabled and not focussable using tab.
         */
        this.disabled = false;
        /**
         * @private
         * Renders a div that looks exactly like an input field. Overflowing content will have an ellipsis.
         * Only implemented for `type="text"`.
         */
        this.editable = true;
        /**
         * Text that will be written on the top.
         */
        this.label = "";
        /**
         * Marks the component as required (please note that this itself does not handle validation &mdash; use the "valid" and "validation-message" for that).
         */
        this.required = false;
    }
    valueChanged() {
        var _a;
        // Transfer value into flatpickr
        (_a = this.flatpickrInstance) === null || _a === void 0 ? void 0 : _a.setDate(this.value);
        this.updateHeight();
        this.updateHiddenFormInputEl();
        this.invokeChangeCallback(this.value);
    }
    nameChanged() {
        this.updateHiddenFormInputEl();
    }
    hitEnterCallbackChanged() {
        this.setInvokeHitEnterCallback();
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    inputCallbackChanged() {
        this.setInvokeInputCallback();
    }
    focusCallbackChanged() {
        this.setInvokeFocusCallback();
    }
    blurCallbackChanged() {
        this.setInvokeBlurCallback();
    }
    keyDownCallbackChanged() {
        this.setInvokeKeyDownCallback();
    }
    componentWillLoad() {
        this.setInvokeHitEnterCallback();
        this.setInvokeChangeCallback();
        this.setInvokeInputCallback();
        this.setInvokeFocusCallback();
        this.setInvokeBlurCallback();
        this.setInvokeKeyDownCallback();
        this.initHiddenFormInputEl();
    }
    componentDidLoad() {
        // Remember the initial height to calculate the animated height later (textarea only)
        this.minHeight = parseFloat(getComputedStyle(this.inputEl).height);
        // Init flatpickr on date input fields
        if (this.type === "date") {
            this.flatpickrInstance = flatpickr(this.inputEl.parentElement, Object.assign(Object.assign(Object.assign({}, Input.flatpickrOptions), this.getParsedFlatpickrOptions()), { defaultDate: this.value }));
        }
        this.updateHeight();
    }
    componentDidRender() {
        this.updateInputElValueIfOutOfSync();
    }
    componentDidUnload() {
        if (this.type === "date") {
            this.flatpickrInstance.destroy();
        }
    }
    onFocus() {
        this.hasInputElFocus = true;
        if (this.selectTextOnFocus) {
            this.selectText();
        }
    }
    onBlur() {
        this.hasInputElFocus = false;
    }
    onInputElKeyPress(e) {
        const keyboardEvent = e;
        if (keyboardEvent.which === 13) {
            this.invokeHitEnterCallback();
        }
    }
    onInputElKeyDown(e) {
        const keyboardEvent = e;
        if (keyboardEvent.key === "Enter" || keyboardEvent.keyCode === 13) {
            this.openDatePicker();
        }
        this.invokeKeyDownCallback(e);
    }
    openDatePicker() {
        if (this.type === "date") {
            this.flatpickrInstance.open(); // make sure it opens in all cases
            setTimeout(() => this.flatpickrInstance.set("allowInput", false)); // workaround to enable keyboard navigation
        }
    }
    onInputElInput(e) {
        const value = e.target.value;
        this.invokeInputCallback(value);
    }
    // Used when "inputCallback" prop is provided
    customInputCallback(value) {
        wcHelpers.parseFunction(this.inputCallback)(value);
        // After invoking the above callback, "this.value" is now updated.
        // If it holds another value than what the user has typed, overwrite
        // that users input with "this.value".
        // However, this is only possible *after* render, therefore a rerender is triggered.
        if (this.value !== value) {
            forceUpdate(this.el);
        }
    }
    // Used when *no* "inputCallback" prop is provided
    defaultInputCallback(value) {
        this.value = value;
    }
    setInvokeHitEnterCallback() {
        this.invokeHitEnterCallback = wcHelpers.parseFunction(this.hitEnterCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    setInvokeInputCallback() {
        if (this.inputCallback) {
            this.invokeInputCallback = this.customInputCallback;
        }
        else {
            this.invokeInputCallback = this.defaultInputCallback;
        }
    }
    setInvokeFocusCallback() {
        this.invokeFocusCallback = wcHelpers.parseFunction(this.focusCallback);
    }
    setInvokeBlurCallback() {
        this.invokeBlurCallback = wcHelpers.parseFunction(this.blurCallback);
    }
    setInvokeKeyDownCallback() {
        this.invokeKeyDownCallback = wcHelpers.parseFunction(this.keyDownCallback);
    }
    onInputElFocus() {
        this.hasInputElFocus = true;
        // Readonly input fields can receive focus, but their height shouldn't change
        if (!this.readonly) {
            this.updateHeight();
        }
        this.invokeFocusCallback();
    }
    onInputElBlur() {
        this.hasInputElFocus = false;
        this.updateHeight();
        this.invokeBlurCallback();
    }
    selectText() {
        setTimeout(() => {
            if (!this.isInputElement(this.inputEl)) {
                return;
            }
            this.inputEl.setSelectionRange(0, this.inputEl.value.length);
        });
    }
    /**
     * Calculate and set the autocomplete height.
     * If it's empty and focussed, it should grow.
     * If it's still empty not focussed anymore, it should shrink back.
     * If it has content, it should shrink or grow based on the content (within a certain range).
     */
    updateHeight() {
        // Only change the height of textareas
        if (this.type !== "textarea") {
            return;
        }
        const inputEl = this.inputEl;
        const minHeight = this.minHeight;
        const lineHeight = parseFloat(getComputedStyle(inputEl).lineHeight);
        const offsetHeight = inputEl.offsetHeight;
        const clientHeight = inputEl.clientHeight;
        const border = offsetHeight - clientHeight;
        const focussedHeight = minHeight + (lineHeight * 4);
        const maxHeight = minHeight + (lineHeight * 10);
        let newHeight = minHeight;
        // Scrolling is disabled by default
        inputEl.style.overflow = "hidden";
        if (this.value) {
            // Shortly set the height to the current text content to take measure
            inputEl.style.height = "auto";
            const newHeightBasedOnContent = inputEl.scrollHeight + border + lineHeight;
            // Activate scrolling if max height has been reached
            if (newHeightBasedOnContent > maxHeight) {
                inputEl.style.overflow = "auto";
            }
            newHeight = Math.min(Math.max(focussedHeight, newHeightBasedOnContent), maxHeight);
        }
        else {
            if (this.hasInputElFocus) {
                newHeight = focussedHeight;
            }
        }
        inputEl.style.height = `${newHeight}px`;
    }
    initHiddenFormInputEl() {
        this.lightDOMHiddenFormInputEl = document.createElement("input");
        this.lightDOMHiddenFormInputEl.type = "hidden";
        this.updateHiddenFormInputEl();
        this.el.appendChild(this.lightDOMHiddenFormInputEl);
    }
    updateHiddenFormInputEl() {
        // Make sure the input el will not appear in the submit URL
        // This is necessary for IE11 because .name = "" would actually work
        delete this.lightDOMHiddenFormInputEl.name;
        this.lightDOMHiddenFormInputEl.removeAttribute("name");
        if (this.name && this.value) {
            // The name should only be set if there's actually a value
            // in order to prevent empty URL params like "?name="
            this.lightDOMHiddenFormInputEl.name = this.name;
            this.lightDOMHiddenFormInputEl.value = this.value;
        }
    }
    // Make sure the input el never has its "own" state but reflects "this.value"
    updateInputElValueIfOutOfSync() {
        if (!this.isInputElement(this.inputEl)) {
            return;
        }
        if (this.inputEl.value !== this.value) {
            this.inputEl.value = this.value;
        }
    }
    isInputElement(el) {
        return !isNil(el) && "value" in el;
    }
    createLabel() {
        const srHint = this.validationMessage ?
            `${this.srHint} ${this.validationMessage}`
            : this.srHint;
        if (this.label) {
            return (h("label", { class: "label", htmlFor: "id" },
                this.label,
                this.required && h("span", { "aria-hidden": "true" }, " *"),
                srHint && h("span", { class: "sr-only" },
                    " ",
                    srHint)));
        }
        return (h("label", { class: "sr-only", htmlFor: "id" }, srHint));
    }
    getCommonInputFieldProps() {
        return {
            id: "id",
            placeholder: this.placeholder,
            onInput: (e) => this.onInputElInput(e),
            onKeyPress: (e) => this.onInputElKeyPress(e),
            onKeyDown: (e) => this.onInputElKeyDown(e),
            onFocus: () => this.onInputElFocus(),
            onBlur: () => this.onInputElBlur(),
            ref: (el) => this.inputEl = el,
            style: this.inputStyle,
            autoComplete: this.autocomplete,
            autoCorrect: "off",
            autoCapitalize: "off",
            maxLength: this.maxlength,
            required: this.required,
            disabled: this.disabled,
            readonly: this.readonly
        };
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.type]: true,
            readonly: this.readonly,
            disabled: this.disabled,
            editable: this.editable,
            focus: this.hasInputElFocus,
            valid: this.valid === true,
            invalid: this.valid === false
        };
    }
    createInputField() {
        return (h("div", { class: "wrapper" },
            this.editable &&
                h("input", Object.assign({}, this.getCommonInputFieldProps(), { class: "input", type: this.type, value: this.value, spellCheck: "false" })),
            !this.editable &&
                h("div", { class: "input", style: this.inputStyle, tabIndex: this.disabled ? undefined : 0, ref: (el) => this.inputEl = el },
                    h("sdx-text-truncate", null, this.value)),
            this.valid &&
                h("sdx-icon", { class: "checkmark-icon", iconName: "icon-check-mark", size: 3 })));
    }
    createNumberInputField() {
        return (h("div", { class: "wrapper" },
            h("input", Object.assign({}, this.getCommonInputFieldProps(), { class: "input", type: this.type, value: this.value, step: this.step, min: this.min, max: this.max }))));
    }
    createDateInputField() {
        return (h("div", { class: "wrapper" },
            h("input", Object.assign({}, this.getCommonInputFieldProps(), { class: "input", type: "date", value: this.value, "data-input": true })),
            h("sdx-button", { tabindex: "-1", class: "calendar-button", theme: "transparent", srHint: "Calendar", iconName: "icon-calendar", iconSize: 3, "data-toggle": true, disabled: this.disabled || this.readonly, valid: !(this.valid === false && !this.hasInputElFocus) })));
    }
    createTextArea() {
        return (h("div", { class: "wrapper" },
            h("textarea", Object.assign({}, this.getCommonInputFieldProps(), { class: "input textarea", value: this.value }))));
    }
    /**
     * Parses and returns the flatpickrOptions prop.
     */
    getParsedFlatpickrOptions() {
        let flatpickrOptions = {};
        if (this.flatpickrOptions) {
            if (typeof this.flatpickrOptions === "string") {
                flatpickrOptions = JSON.parse(this.flatpickrOptions);
            }
            else { // assume it's a valid flatpickr options object
                flatpickrOptions = this.flatpickrOptions;
            }
        }
        return flatpickrOptions;
    }
    render() {
        return (h("div", { class: this.getComponentClassNames() },
            this.createLabel(),
            (() => {
                switch (this.type) {
                    case "textarea":
                        return this.createTextArea();
                    case "date":
                        return this.createDateInputField();
                    case "number":
                        return this.createNumberInputField();
                    default:
                        return this.createInputField();
                }
            })(),
            this.validationMessage &&
                h("sdx-validation-message", { validationMessage: this.validationMessage })));
    }
    static get is() { return "sdx-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["input.css"]
    }; }
    static get properties() { return {
        "srHint": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text for the screen reader labelling the input field."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "hitEnterCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire on hitting enter."
            },
            "attribute": "hit-enter-callback",
            "reflect": false
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((value: string) => void) | string",
                "resolved": "((value: string) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the value has changed, regardless of method (keyboard or programmatical)."
            },
            "attribute": "change-callback",
            "reflect": false
        },
        "inputCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((value: string) => void) | string",
                "resolved": "((value: string) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the value changes using the keyboard."
            },
            "attribute": "input-callback",
            "reflect": false
        },
        "focusCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the input gets focus."
            },
            "attribute": "focus-callback",
            "reflect": false
        },
        "blurCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the input loses focus."
            },
            "attribute": "blur-callback",
            "reflect": false
        },
        "keyDownCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((e: Event) => void) | string",
                "resolved": "((e: Event) => void) | string | undefined",
                "references": {
                    "Event": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the a key is pressed down."
            },
            "attribute": "key-down-callback",
            "reflect": false
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Default text that will be shown unless there's a value."
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputType",
                "resolved": "\"date\" | \"email\" | \"number\" | \"search\" | \"tel\" | \"text\" | \"textarea\" | \"url\"",
                "references": {
                    "InputType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Default input field type (e.g. \"search\", \"password\", \"date\", etc.). When set to \"date\", flatpickr will take over. Caution: flatpickr does not fulfill the accessibility requirements of SDX, yet (but we're on it...)."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"text\""
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Can be used for both reading and writing the value."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "step": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "For input type=\"number\", step size."
            },
            "attribute": "step",
            "reflect": false
        },
        "min": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "For input type=\"number\", minimum valid input value."
            },
            "attribute": "min",
            "reflect": false
        },
        "max": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "For input type=\"number\", maximum valid input value."
            },
            "attribute": "max",
            "reflect": false
        },
        "selectTextOnFocus": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Marks the text within the input on focus."
            },
            "attribute": "select-text-on-focus",
            "reflect": false,
            "defaultValue": "false"
        },
        "inputStyle": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ [ key: string ]: string }",
                "resolved": "{ [key: string]: string; }",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "CSS styles applied to the input element.",
                        "name": "private"
                    }],
                "text": ""
            },
            "defaultValue": "{}"
        },
        "autocomplete": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Specifies the input fields native autocomplete behavior on modern browsers (e.g. \"off\", \"username\" or \"new-password\")."
            },
            "attribute": "autocomplete",
            "reflect": false
        },
        "readonly": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Disabled, but focussable using tab."
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Disabled and not focussable using tab."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "editable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Renders a div that looks exactly like an input field. Overflowing content will have an ellipsis.\nOnly implemented for `type=\"text\"`.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "editable",
            "reflect": false,
            "defaultValue": "true"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text that will be written on the top."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "maxlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Allowed number of characters."
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "flatpickrOptions": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Datepicker settings.\nWhen <code>type=\"date\"</code>, flatpickr is used and can be configured via this attribute.\nExamples: <code>{ locale: \"fr\" }</code>, <code>{ minDate: \"today\" }</code> or <code>{ \"altInput\": true, \"altFormat\": \"l j. F, Y\" }</code>.\nSee available options: https://sdx.swisscom.com/components_-_picker_(date).html"
            },
            "attribute": "flatpickr-options",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Name parameter (useful when the item is embedded in a traditional HTML form submit)."
            },
            "attribute": "name",
            "reflect": false
        },
        "valid": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Set this to false to declare the component as invalid (and use the \"validation-message\" attribute to explain why). It can also be set to true, but this should only be done in rare cases (e.g. when checking a user name for availabilty using server-side validation)."
            },
            "attribute": "valid",
            "reflect": false
        },
        "validationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Text that explains the validation status to the user."
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Marks the component as required (please note that this itself does not handle validation &mdash; use the \"valid\" and \"validation-message\" for that)."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "hasInputElFocus": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "name",
            "methodName": "nameChanged"
        }, {
            "propName": "hitEnterCallback",
            "methodName": "hitEnterCallbackChanged"
        }, {
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "inputCallback",
            "methodName": "inputCallbackChanged"
        }, {
            "propName": "focusCallback",
            "methodName": "focusCallbackChanged"
        }, {
            "propName": "blurCallback",
            "methodName": "blurCallbackChanged"
        }, {
            "propName": "keyDownCallback",
            "methodName": "keyDownCallbackChanged"
        }]; }
    static get listeners() { return [{
            "name": "focus",
            "method": "onFocus",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "blur",
            "method": "onBlur",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
Input.flatpickrOptions = {
    wrap: true,
    allowInput: true,
    locale: "de",
    dateFormat: "d.m.Y",
    time_24hr: true,
    onClose: ({}, {}, instance) => instance.set("allowInput", true)
};
