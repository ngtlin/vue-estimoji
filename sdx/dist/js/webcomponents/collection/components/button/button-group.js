import { Component, h, Prop, Host } from "@stencil/core";
export class ButtonGroup {
    constructor() {
        /**
         * Defines how buttons are aligned, sized and distributed.
         */
        this.layout = "responsive";
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.layout]: true
        };
    }
    render() {
        return (h(Host, { class: this.layout },
            h("div", { class: this.getComponentClassNames() },
                h("slot", null))));
    }
    static get is() { return "sdx-button-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["button-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["button-group.css"]
    }; }
    static get properties() { return {
        "layout": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonGroupLayout",
                "resolved": "\"fill\" | \"fixed\" | \"fullwidth\" | \"responsive\"",
                "references": {
                    "ButtonGroupLayout": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Defines how buttons are aligned, sized and distributed."
            },
            "attribute": "layout",
            "reflect": false,
            "defaultValue": "\"responsive\""
        }
    }; }
}
