import { Component, h, Prop } from "@stencil/core";
export class ValidationMessage {
    constructor() {
        this.valid = false;
        this.validationMessage = "";
    }
    getComponentClassNames() {
        return {
            component: true
        };
    }
    render() {
        return (h("div", { class: this.getComponentClassNames(), "aria-hidden": "true" },
            h("sdx-icon", { "icon-name": "icon-exclamation-mark" }),
            " ",
            this.validationMessage));
    }
    static get is() { return "sdx-validation-message"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["validation-message.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["validation-message.css"]
    }; }
    static get properties() { return {
        "valid": {
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
                "text": ""
            },
            "attribute": "valid",
            "reflect": false,
            "defaultValue": "false"
        },
        "validationMessage": {
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
                "text": ""
            },
            "attribute": "validation-message",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
}
