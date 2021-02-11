import { Component, h, Element, Prop, State, Watch } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class NumericStepper {
    constructor() {
        this.invokeChangeCallback = () => null;
        this.srHintValue = "";
        this.decreaseDisabled = true;
        this.increaseDisabled = true;
        /**
         * Text that will be written on the top of the numeric stepper. Make sure to include the maximum possible value here
         * for the user.
         */
        this.label = "";
        /**
         * Text for the screen reader describing the numeric stepper.
         */
        this.srHint = "";
        /**
         * Minimum value. Cannot be negative.
         */
        this.min = 1;
        /**
         * Maximum value. Cannot be set greater than 999.
         */
        this.max = 999;
        /**
         * Initial value. Must be between 0 and 999 including.
         */
        this.value = this.min;
        /**
         * Step size.
         */
        this.step = 1;
        /**
         * Disabled and not focusable using tab.
         */
        this.disabled = false;
        /**
         * valueState reflects the validated input value of the number input field.
         * When trying to put a value outside the valid range, the input gets blocked and keeps the old and still valid value.
         */
        this.valueState = 0;
        this.inputElValue = "";
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    valueChanged() {
        this.setValueState(this.value);
    }
    valueStateChanged() {
        this.invokeChangeCallback(this.valueState);
    }
    componentWillLoad() {
        this.setValueState(this.value);
        this.setInvokeChangeCallback();
        this.srHintValue = `${this.label} ${this.srHint}`;
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    decrease() {
        if (this.valueState !== undefined) {
            this.setValueState(this.valueState - 1);
            this.el.blur();
        }
    }
    increase() {
        if (this.valueState !== undefined) {
            this.setValueState(this.valueState + 1);
            this.el.blur();
        }
    }
    setValueState(value) {
        let valueAsNumber;
        if (typeof value === "string") {
            const parsedValue = parseFloat(value);
            valueAsNumber = isNaN(parsedValue) ? undefined : parsedValue;
        }
        else {
            valueAsNumber = value;
        }
        // Set new value within range
        if (valueAsNumber !== undefined && valueAsNumber > this.max) {
            this.valueState = this.max;
        }
        else if (valueAsNumber !== undefined && valueAsNumber < this.min) {
            this.valueState = this.min;
        }
        else {
            this.valueState = valueAsNumber;
        }
        // Sync value prop
        this.value = this.valueState;
        // Sync input field
        this.inputElValue = JSON.stringify(this.valueState);
        // Update button states
        this.increaseDisabled = this.valueState === undefined || this.valueState >= this.max;
        this.decreaseDisabled = this.valueState === undefined || this.valueState <= this.min;
    }
    focusInputField() {
        this.sdxInputEl.focus();
    }
    getInputStyle() {
        return {
            textAlign: "center",
            padding: "0 56px"
        };
    }
    getComponentClassNames() {
        return {
            component: true
        };
    }
    getButtonClassNames(position) {
        return {
            [position]: true,
            invalid: this.valid === false
        };
    }
    render() {
        return (h("div", { class: this.getComponentClassNames() },
            this.label &&
                h("label", { class: "label", onClick: () => this.focusInputField(), "aria-hidden": "true" }, this.label),
            h("div", { class: "wrapper" },
                h("sdx-input", { srHint: this.srHintValue, type: "number", ref: (el) => this.sdxInputEl = el, inputCallback: (value) => this.inputElValue = value, blurCallback: () => this.setValueState(this.inputElValue), inputStyle: this.getInputStyle(), value: this.inputElValue, min: this.min, max: this.max, disabled: this.disabled, valid: this.valid, validationMessage: this.validationMessage }),
                h("sdx-button", { theme: "transparent", class: this.getButtonClassNames("left"), iconName: "icon-minus", iconSize: 3, disabled: this.decreaseDisabled || this.disabled, onClick: () => this.decrease(), tabindex: "-1", "aria-hidden": "true", valid: this.valid && this.validationMessage !== "" }),
                h("sdx-button", { theme: "transparent", class: this.getButtonClassNames("right"), iconName: "icon-plus", iconSize: 3, disabled: this.increaseDisabled || this.disabled, onClick: () => this.increase(), tabindex: "-1", "aria-hidden": "true", valid: this.valid && this.validationMessage !== "" }))));
    }
    static get is() { return "sdx-numeric-stepper"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["numeric-stepper.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["numeric-stepper.css"]
    }; }
    static get properties() { return {
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
                "text": "Text that will be written on the top of the numeric stepper. Make sure to include the maximum possible value here\nfor the user."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
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
                "text": "Text for the screen reader describing the numeric stepper."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "min": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Minimum value. Cannot be negative."
            },
            "attribute": "min",
            "reflect": false,
            "defaultValue": "1"
        },
        "max": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Maximum value. Cannot be set greater than 999."
            },
            "attribute": "max",
            "reflect": false,
            "defaultValue": "999"
        },
        "value": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number | undefined",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Initial value. Must be between 0 and 999 including."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "this.min"
        },
        "step": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Step size."
            },
            "attribute": "step",
            "reflect": false,
            "defaultValue": "1"
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
                "text": "Callback that will fire on change."
            },
            "attribute": "change-callback",
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
                "text": "Set this to false to declare the component as invalid (and use the \"validation-message\" attribute to explain why).\nIt can also be set to true, but this should only be done in rare cases (e.g. when checking a user name for\navailabilty using server-side validation)."
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
                "text": "Disabled and not focusable using tab."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "valueState": {},
        "inputElValue": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "valueState",
            "methodName": "valueStateChanged"
        }]; }
}
