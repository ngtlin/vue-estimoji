import { Component, h, Prop, Host } from "@stencil/core";
export class Ribbon {
    constructor() {
        /**
         * Text content.
         */
        this.label = "Ribbon";
        /**
         * Look.
         */
        this.design = "loop";
        /**
         * Location.
         */
        this.position = "right";
        /**
         * Dimension.
         */
        this.size = "normal";
    }
    render() {
        return (h(Host, { class: `${this.design} ${this.position} ${this.size}` },
            h("div", { class: "wrapper" },
                h("div", { class: "slot" },
                    h("slot", null)),
                h("div", { class: "ribbon-container" }, this.design === "loop"
                    ? (h("div", { class: "content" }, this.label))
                    : (this.label)))));
    }
    static get is() { return "sdx-ribbon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["ribbon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["ribbon.css"]
    }; }
    static get properties() { return {
        "label": {
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
                "text": "Text content."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"Ribbon\""
        },
        "design": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Design",
                "resolved": "\"bookmark\" | \"loop\"",
                "references": {
                    "Design": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Look."
            },
            "attribute": "design",
            "reflect": false,
            "defaultValue": "\"loop\""
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Position",
                "resolved": "\"left\" | \"right\"",
                "references": {
                    "Position": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Location."
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "\"right\""
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Size",
                "resolved": "\"large\" | \"normal\" | \"small\"",
                "references": {
                    "Size": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Dimension."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"normal\""
        }
    }; }
}
