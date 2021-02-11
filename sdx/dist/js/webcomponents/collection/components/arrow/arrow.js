import { Component, h, Prop } from "@stencil/core";
export class Arrow {
    constructor() {
        /**
         * Which side it looks towards.
         */
        this.direction = "down";
        /**
         * Hide the arrow (animated).
         */
        this.hideArrow = false;
        /**
         * Hide the background.
         */
        this.hideBackground = false;
        /**
         * Callback that will fire when the animation starts.
         */
        this.animationBeginCallback = () => undefined;
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.direction]: true
        };
    }
    render() {
        return (h("sdx-animation", { animationName: this.hideBackground ? "fade-out" : "fade-in", animationBeginCallback: this.animationBeginCallback },
            h("div", { class: this.getComponentClassNames() },
                h("div", { class: "arrow-container" },
                    h("sdx-animation", { animationName: this.hideArrow ? "scale-out" : "scale-in" },
                        h("div", { class: "arrow" }))))));
    }
    static get is() { return "sdx-arrow"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["arrow.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["arrow.css"]
    }; }
    static get properties() { return {
        "direction": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"down\" | \"up\" | \"left\" | \"right\"",
                "resolved": "\"down\" | \"left\" | \"right\" | \"up\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Which side it looks towards."
            },
            "attribute": "direction",
            "reflect": false,
            "defaultValue": "\"down\""
        },
        "hideArrow": {
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
                "text": "Hide the arrow (animated)."
            },
            "attribute": "hide-arrow",
            "reflect": false,
            "defaultValue": "false"
        },
        "hideBackground": {
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
                "text": "Hide the background."
            },
            "attribute": "hide-background",
            "reflect": false,
            "defaultValue": "false"
        },
        "animationBeginCallback": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(() => void)",
                "resolved": "() => void",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the animation starts."
            },
            "defaultValue": "() => undefined"
        }
    }; }
}
