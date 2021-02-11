import anime from "animejs";
import { Component, h, Element, Method, Prop } from "@stencil/core";
export class AccordionItemBody {
    constructor() {
        this.initialLoad = true;
        this.animationDuration = 300;
        /**
         * @private
         */
        this.arrowPosition = "right";
        /**
         * @private
         */
        this.componentStyle = {};
    }
    /**
     * Toggles body directly when initial load or with an animation.
     * @param isOpen Open state of the accordion item.
     */
    async toggle(isOpen) {
        if (this.initialLoad) {
            this.initiateOpenState(isOpen);
        }
        else if (isOpen) {
            this.openCollapseSection();
        }
        else {
            this.closeCollapseSection();
        }
    }
    /**
     * Sets class to handle immediately the open/close state.
     * @param newState Open State of the accordion item.
     */
    initiateOpenState(newState) {
        if (newState) {
            this.el.classList.add("open");
        }
        this.initialLoad = false;
    }
    /**
     * Opens section with an animation.
     */
    openCollapseSection() {
        this.el.style.display = "block";
        this.el.style.height = "0px";
        anime({
            targets: this.el,
            duration: this.animationDuration,
            height: this.el.scrollHeight,
            opacity: 1,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: () => {
                this.el.setAttribute("aria-expanded", "true");
                this.el.classList.add("open");
                this.el.style.height = "auto"; // allow to grow or shrink with content
            }
        });
    }
    /**
     * Closes section with an animation.
     */
    closeCollapseSection() {
        // Can't animate "auto", therefore update to current height
        this.el.style.height = `${this.el.scrollHeight}px`;
        anime({
            targets: this.el,
            duration: this.animationDuration,
            height: 0,
            opacity: 0,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: () => {
                this.el.setAttribute("aria-expanded", "false");
                this.el.classList.remove("open");
            }
        });
    }
    render() {
        return (h("div", { class: "component", style: this.componentStyle },
            h("slot", null)));
    }
    static get is() { return "sdx-accordion-item-body"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion-item-body.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion-item-body.css"]
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
        "componentStyle": {
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
        }
    }; }
    static get methods() { return {
        "toggle": {
            "complexType": {
                "signature": "(isOpen: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "isOpen Open state of the accordion item.",
                                "name": "param"
                            }],
                        "text": "Open state of the accordion item."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Toggles body directly when initial load or with an animation.",
                "tags": [{
                        "name": "param",
                        "text": "isOpen Open state of the accordion item."
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
