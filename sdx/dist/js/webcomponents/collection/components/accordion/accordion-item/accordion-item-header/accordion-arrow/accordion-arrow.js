import { Component, h, Prop } from "@stencil/core";
export class AccordionArrow {
    constructor() {
        /**
         * @private
         */
        this.direction = "down";
        /**
         * @private
         */
        this.hover = false;
        /**
         * @private
         */
        this.arrowPosition = "right";
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "sdx-accordion-arrow"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion-arrow.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion-arrow.css"]
    }; }
    static get properties() { return {
        "direction": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ArrowDirection",
                "resolved": "\"down\" | \"up\"",
                "references": {
                    "ArrowDirection": {
                        "location": "import",
                        "path": "../../../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "direction",
            "reflect": false,
            "defaultValue": "\"down\""
        },
        "hover": {
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
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "hover",
            "reflect": false,
            "defaultValue": "false"
        },
        "arrowPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ArrowPosition",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {
                    "ArrowPosition": {
                        "location": "import",
                        "path": "../../../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "arrow-position",
            "reflect": false,
            "defaultValue": "\"right\""
        }
    }; }
}
