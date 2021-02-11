import { Component, h, Prop } from "@stencil/core";
export class Price {
    constructor() {
        /**
         * The amount to be paid.
         */
        this.amount = 0;
        /**
         * Time period, for example "/mo.".
         */
        this.period = "";
        /**
         * The font size.
         */
        this.size = 2;
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
    }
    /**
     * Formats a price like 5.–, 5.50, –.50, or 0.–
     */
    getFormattedAmount() {
        return String(Math.round(this.amount * 100)) // 10.1 -> 1010
            .replace(/^0$/, "000") // 0 -> 000
            .replace(/^(.)$/, "0$1") // 5 -> 05
            .replace(/(..)$/, ".$1") // 1010 -> 10.10
            .replace(/00$|^(?=[.])/, "–"); // 10.00 -> 10.– and .10 -> –.10
    }
    isInteger() {
        return this.amount === Math.floor(this.amount);
    }
    getClassNames() {
        return {
            integer: this.isInteger(),
            [`text-${this.size > 6 ? "d" : "h"}${(this.size > 6 ? 9 : 6) - this.size + 1}`]: true
        };
    }
    render() {
        return [
            h("span", { class: this.getClassNames(), "aria-hidden": "true" },
                this.getFormattedAmount(),
                h("span", { class: "period" }, this.period)),
            h("span", { class: "sr-only" }, this.srHint)
        ];
    }
    static get is() { return "sdx-price"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["price.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["price.css"]
    }; }
    static get properties() { return {
        "amount": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The amount to be paid."
            },
            "attribute": "amount",
            "reflect": false,
            "defaultValue": "0"
        },
        "period": {
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
                "text": "Time period, for example \"/mo.\"."
            },
            "attribute": "period",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "Size",
                "resolved": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
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
                "text": "The font size."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "2"
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
