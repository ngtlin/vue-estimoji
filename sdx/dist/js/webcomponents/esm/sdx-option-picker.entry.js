import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { p as parseJson } from './webcomponent-helpers-5a1adad8.js';

const optionPickerCss = "";

const OptionPicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.optionsState = [];
        /**
         * List of selectable options.
         */
        this.options = [];
        /**
         * Enable multi select.
         */
        this.multiple = false;
    }
    optionsChanged() {
        this.optionsState = parseJson(this.options) || [];
    }
    componentWillLoad() {
        this.optionsState = parseJson(this.options) || [];
    }
    render() {
        return (h("div", { class: "component" }, h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.optionsState.map((option) => (h("sdx-input-item", { hideCheckedIcon: true, value: option.value, checked: option.checked }, option.name))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["optionsChanged"]
    }; }
};
OptionPicker.style = optionPickerCss;

export { OptionPicker as sdx_option_picker };
