import { Component, h, Prop, Element } from "@stencil/core";
export class Flip {
    constructor() {
        /**
         * Mirror the content across one or both axes (or none at all).
         */
        this.direction = "none";
    }
    componentWillLoad() {
        this.el.style.display = "inline-block"; // make transformable
        this.el.style.transform = `scaleX(${this.getFlipTransformStyle("x")}) scaleY(${this.getFlipTransformStyle("y")})`;
    }
    getFlipTransformStyle(axis) {
        const map = {
            none: {
                x: 1,
                y: 1
            },
            horizontal: {
                x: -1,
                y: 1
            },
            vertical: {
                x: 1,
                y: -1
            },
            both: {
                x: -1,
                y: -1
            }
        };
        return map[this.direction][axis];
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "sdx-flip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "direction": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "FlipDirection",
                "resolved": "\"both\" | \"horizontal\" | \"none\" | \"vertical\"",
                "references": {
                    "FlipDirection": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Mirror the content across one or both axes (or none at all)."
            },
            "attribute": "direction",
            "reflect": false,
            "defaultValue": "\"none\""
        }
    }; }
    static get elementRef() { return "el"; }
}
