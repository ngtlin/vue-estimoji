import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { p as parseJson } from './webcomponent-helpers-5a1adad8.js';

const colorPickerCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.color{height:40px;width:40px;border-radius:2px}";

const ColorPicker = class {
    constructor(hostRef) {
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
    colorsChanged() {
        this.colorsState = parseJson(this.colors) || [];
    }
    componentWillLoad() {
        this.colorsState = parseJson(this.colors) || [];
    }
    render() {
        return (h("div", { class: "component" }, h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.colorsState.map((color) => (h("sdx-input-item", { value: color.name, hideCheckedIcon: true, labelStyle: { padding: "2px" }, checked: color.checked }, h("div", { class: "color", style: { background: color.code } })))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "colors": ["colorsChanged"]
    }; }
};
ColorPicker.style = colorPickerCss;

export { ColorPicker as sdx_color_picker };
