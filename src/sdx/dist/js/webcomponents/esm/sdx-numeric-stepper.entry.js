import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';

const numericStepperCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}:host{display:block}.component .wrapper{position:relative;width:144px}.component .wrapper .left,.component .wrapper .right{position:absolute;top:0;display:inline-block;margin:8px}.component .wrapper .left{left:0}.component .wrapper .right{left:96px}";

const NumericStepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.invokeChangeCallback = parseFunction(this.changeCallback);
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
        return (h("div", { class: this.getComponentClassNames() }, this.label &&
            h("label", { class: "label", onClick: () => this.focusInputField(), "aria-hidden": "true" }, this.label), h("div", { class: "wrapper" }, h("sdx-input", { srHint: this.srHintValue, type: "number", ref: (el) => this.sdxInputEl = el, inputCallback: (value) => this.inputElValue = value, blurCallback: () => this.setValueState(this.inputElValue), inputStyle: this.getInputStyle(), value: this.inputElValue, min: this.min, max: this.max, disabled: this.disabled, valid: this.valid, validationMessage: this.validationMessage }), h("sdx-button", { theme: "transparent", class: this.getButtonClassNames("left"), iconName: "icon-minus", iconSize: 3, disabled: this.decreaseDisabled || this.disabled, onClick: () => this.decrease(), tabindex: "-1", "aria-hidden": "true", valid: this.valid && this.validationMessage !== "" }), h("sdx-button", { theme: "transparent", class: this.getButtonClassNames("right"), iconName: "icon-plus", iconSize: 3, disabled: this.increaseDisabled || this.disabled, onClick: () => this.increase(), tabindex: "-1", "aria-hidden": "true", valid: this.valid && this.validationMessage !== "" }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "changeCallback": ["changeCallbackChanged"],
        "value": ["valueChanged"],
        "valueState": ["valueStateChanged"]
    }; }
};
NumericStepper.style = numericStepperCss;

export { NumericStepper as sdx_numeric_stepper };
