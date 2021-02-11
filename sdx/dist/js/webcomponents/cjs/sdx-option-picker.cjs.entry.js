'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');

const optionPickerCss = "";

const OptionPicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.optionsState = webcomponentHelpers.parseJson(this.options) || [];
    }
    componentWillLoad() {
        this.optionsState = webcomponentHelpers.parseJson(this.options) || [];
    }
    render() {
        return (index.h("div", { class: "component" }, index.h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.optionsState.map((option) => (index.h("sdx-input-item", { hideCheckedIcon: true, value: option.value, checked: option.checked }, option.name))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "options": ["optionsChanged"]
    }; }
};
OptionPicker.style = optionPickerCss;

exports.sdx_option_picker = OptionPicker;
