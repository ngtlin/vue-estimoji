import { Component, h, Element, Prop, State, Watch } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class ColorPicker {
    constructor() {
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
        this.colorsState = wcHelpers.parseJson(this.colors) || [];
    }
    componentWillLoad() {
        this.colorsState = wcHelpers.parseJson(this.colors) || [];
    }
    render() {
        return (h("div", { class: "component" },
            h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.colorsState.map((color) => (h("sdx-input-item", { value: color.name, hideCheckedIcon: true, labelStyle: { padding: "2px" }, checked: color.checked },
                h("div", { class: "color", style: { background: color.code } })))))));
    }
    static get is() { return "sdx-color-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["color-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["color-picker.css"]
    }; }
    static get properties() { return {
        "colors": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Color[] | string",
                "resolved": "Color[] | string",
                "references": {
                    "Color": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "List of selectable colors."
            },
            "attribute": "colors",
            "reflect": false,
            "defaultValue": "[]"
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((selection: string[]) => void) | string | undefined",
                "resolved": "((selection: string[]) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Callback when the checking an option."
            },
            "attribute": "change-callback",
            "reflect": false
        },
        "multiple": {
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
                "text": "Enable multi select."
            },
            "attribute": "multiple",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "colorsState": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "colors",
            "methodName": "colorsChanged"
        }]; }
}
