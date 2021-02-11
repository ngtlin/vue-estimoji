'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');

const colorPickerCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.color{height:40px;width:40px;border-radius:2px}";

const ColorPicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.colorsState = webcomponentHelpers.parseJson(this.colors) || [];
    }
    componentWillLoad() {
        this.colorsState = webcomponentHelpers.parseJson(this.colors) || [];
    }
    render() {
        return (index.h("div", { class: "component" }, index.h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.colorsState.map((color) => (index.h("sdx-input-item", { value: color.name, hideCheckedIcon: true, labelStyle: { padding: "2px" }, checked: color.checked }, index.h("div", { class: "color", style: { background: color.code } })))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "colors": ["colorsChanged"]
    }; }
};
ColorPicker.style = colorPickerCss;

exports.sdx_color_picker = ColorPicker;
