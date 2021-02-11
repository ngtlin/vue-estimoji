import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { p as parseJson } from './webcomponent-helpers-5a1adad8.js';
var optionPickerCss = "";
var OptionPicker = /** @class */ (function () {
    function OptionPicker(hostRef) {
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
    OptionPicker.prototype.optionsChanged = function () {
        this.optionsState = parseJson(this.options) || [];
    };
    OptionPicker.prototype.componentWillLoad = function () {
        this.optionsState = parseJson(this.options) || [];
    };
    OptionPicker.prototype.render = function () {
        return (h("div", { class: "component" }, h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.optionsState.map(function (option) { return (h("sdx-input-item", { hideCheckedIcon: true, value: option.value, checked: option.checked }, option.name)); }))));
    };
    Object.defineProperty(OptionPicker.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionPicker, "watchers", {
        get: function () {
            return {
                "options": ["optionsChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return OptionPicker;
}());
OptionPicker.style = optionPickerCss;
export { OptionPicker as sdx_option_picker };
