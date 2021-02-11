import { Component, h, Prop, Element } from "@stencil/core";
export class Icon {
    constructor() {
        /**
         * Name of the SDX icon (e.g. "icon-clear-circle").
         */
        this.iconName = "";
        /**
         * SDX predefined color class.
         */
        this.colorClass = "";
        /**
         * The dimension of the icon.
         */
        this.size = 1;
        /**
         * Mirror the icon.
         */
        this.flip = "none";
        /**
         * Hide the icon (animated).
         */
        this.hidden = false;
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
    }
    getClassNames() {
        return {
            icon: true,
            [this.iconName]: true,
            [this.colorClass]: true,
            [`icon--s${this.size}`]: true
        };
    }
    render() {
        return (h("sdx-animation", { animationName: this.hidden ? "scale-out" : "scale-in" },
            h("sdx-flip", { direction: this.flip },
                h("span", { class: this.getClassNames(), "aria-hidden": "true" }),
                h("span", { class: "sr-only" }, this.srHint))));
    }
    static get is() { return "sdx-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["icon.css"]
    }; }
    static get properties() { return {
        "iconName": {
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
                "text": "Name of the SDX icon (e.g. \"icon-clear-circle\")."
            },
            "attribute": "icon-name",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "colorClass": {
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
                "text": "SDX predefined color class."
            },
            "attribute": "color-class",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "Size",
                "resolved": "1 | 2 | 3 | 4 | 5 | 6",
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
                "text": "The dimension of the icon."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "1"
        },
        "flip": {
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
                "text": "Mirror the icon."
            },
            "attribute": "flip",
            "reflect": false,
            "defaultValue": "\"none\""
        },
        "hidden": {
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
                "text": "Hide the icon (animated)."
            },
            "attribute": "hidden",
            "reflect": false,
            "defaultValue": "false"
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
    static get elementRef() { return "el"; }
}
