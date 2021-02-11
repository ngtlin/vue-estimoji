import { Component, h, Prop, Listen, Element, Watch, Method } from "@stencil/core";
export class AccordionItemHeader {
    constructor() {
        /**
         * @private
         */
        this.arrowPosition = "right";
        /**
         * @private
         */
        this.expand = false;
        /**
         * @private
         */
        this.buttonStyle = {};
        /**
         * Triggers toggle information in accordion
         */
        this.toggle = () => "";
    }
    arrowPositionChanged() {
        this.setArrowPosition();
    }
    activeItemChanged() {
        this.setArrowDirection();
    }
    componentDidLoad() {
        this.setChildElementsReferences();
        this.setArrowPosition();
        this.setArrowDirection();
    }
    onClick() {
        this.toggle();
    }
    onMouseOver() {
        this.setArrowHover("true");
    }
    onMouseOut() {
        this.setArrowHover("false");
    }
    /**
     * Closes this accordion item.
     */
    async closeItem() {
        if (this.expand) {
            this.toggle();
        }
    }
    /**
     * Opens this accordion item.
     */
    async openItem() {
        if (!this.expand) {
            this.toggle();
        }
    }
    /**
     * Sets child reference of the arrow.
     */
    setChildElementsReferences() {
        if (this.el.shadowRoot) {
            this.arrowEl = this.el.shadowRoot.querySelector("sdx-accordion-arrow");
        }
    }
    /**
     * Sets the arrow position.
     */
    setArrowPosition() {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("arrow-position", this.arrowPosition);
        }
    }
    /**
     * Sets the arrow direction.
     */
    setArrowDirection() {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("direction", this.expand ? "up" : "down");
        }
    }
    /**
     * Sets the arrow hover.
     */
    setArrowHover(value) {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("hover", value);
        }
    }
    render() {
        return (h("button", { type: "button", class: "content", style: this.buttonStyle, "aria-expanded": this.expand.toString() },
            h("div", { class: "header" },
                h("slot", null)),
            h("sdx-accordion-arrow", null)));
    }
    static get is() { return "sdx-accordion-item-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion-item-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion-item-header.css"]
    }; }
    static get properties() { return {
        "arrowPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ArrowPosition",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {
                    "ArrowPosition": {
                        "location": "import",
                        "path": "../../types"
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
        },
        "expand": {
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
            "attribute": "expand",
            "reflect": false,
            "defaultValue": "false"
        },
        "buttonStyle": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "CSSRules",
                "resolved": "{ [key: string]: string | undefined; }",
                "references": {
                    "CSSRules": {
                        "location": "import",
                        "path": "../../../../core/types/types"
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
            "defaultValue": "{}"
        },
        "toggle": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "() => void",
                "resolved": "() => void",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Triggers toggle information in accordion"
            },
            "defaultValue": "() => \"\""
        }
    }; }
    static get methods() { return {
        "closeItem": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Closes this accordion item.",
                "tags": []
            }
        },
        "openItem": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Opens this accordion item.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "arrowPosition",
            "methodName": "arrowPositionChanged"
        }, {
            "propName": "expand",
            "methodName": "activeItemChanged"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "mouseover",
            "method": "onMouseOver",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "mouseout",
            "method": "onMouseOut",
            "target": undefined,
            "capture": false,
            "passive": true
        }]; }
}
