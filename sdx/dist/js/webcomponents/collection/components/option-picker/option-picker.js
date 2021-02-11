import { Component, h, Element, Prop, State, Watch } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class OptionPicker {
    constructor() {
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
        this.optionsState = wcHelpers.parseJson(this.options) || [];
    }
    componentWillLoad() {
        this.optionsState = wcHelpers.parseJson(this.options) || [];
    }
    render() {
        return (h("div", { class: "component" },
            h("sdx-input-group", { inline: true, theme: "container", changeCallback: this.changeCallback, type: this.multiple ? "checkbox" : "radio" }, this.optionsState.map((option) => (h("sdx-input-item", { hideCheckedIcon: true, value: option.value, checked: option.checked }, option.name))))));
    }
    static get is() { return "sdx-option-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["option-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["option-picker.css"]
    }; }
    static get properties() { return {
        "options": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Option[] | string",
                "resolved": "Option[] | string",
                "references": {
                    "Option": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "List of selectable options."
            },
            "attribute": "options",
            "reflect": false,
            "defaultValue": "[]"
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((selection: any[]) => void) | string | undefined",
                "resolved": "((selection: any[]) => void) | string | undefined",
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
        "optionsState": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "optionsChanged"
        }]; }
}
