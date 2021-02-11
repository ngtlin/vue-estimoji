import { Component, h, Prop } from "@stencil/core";
export class LoadingSpinner {
    constructor() {
        /**
         * Dimension of the spinner.
         */
        this.size = "small";
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.size]: true
        };
    }
    render() {
        return (h("div", { class: this.getComponentClassNames() },
            h("span", { class: "sr-only" }, this.srHint)));
    }
    static get is() { return "sdx-loading-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["loading-spinner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["loading-spinner.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"small\" | \"large\"",
                "resolved": "\"large\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Dimension of the spinner."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"small\""
        },
        "srHint": {
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
                "text": "Description text read by the screen reader."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
}
