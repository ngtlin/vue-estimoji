import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { p as parseJson } from './webcomponent-helpers-5a1adad8.js';
var colorPickerCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.color{height:40px;width:40px;border-radius:2px}";
var ColorPicker = /** @class */ (function () {
    function ColorPicker(hostRef) {
        registerInstance(this, hostRef);
        this.colorsState = [];
        /**
         * List of selectable colors.
         */
        this.colors = [];
        /**
         * Enable multi select.
         */
        this.multiple = false;
    }
    ColorPicker.prototype.colorsChanged = function () {
        this.colorsState = parseJson(this.colors) || [];
    };
    ColorPicker.prototype.componentWillLoad = function () {
        this.colorsState = parseJson(this.colors) || [];
    };
    ColorPicker.prototype.render = function () {
        return (h("div", { class: "component" }, h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.colorsState.map(function (color) { return (h("sdx-input-item", { value: color.name, hideCheckedIcon: true, labelStyle: { padding: "2px" }, checked: color.checked }, h("div", { class: "color", style: { background: color.code } }))); }))));
    };
    Object.defineProperty(ColorPicker.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker, "watchers", {
        get: function () {
            return {
                "colors": ["colorsChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return ColorPicker;
}());
ColorPicker.style = colorPickerCss;
export { ColorPicker as sdx_color_picker };
