import { Component, h, Element, Method, Prop, Watch } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class Accordion {
    constructor() {
        this.openedItems = [];
        /**
         * Position of the arrow in the header.
         */
        this.arrowPosition = "right";
        /**
         * Allow to keep multiple accordion items opened.
         */
        this.keepOpen = false;
        /**
         * @private
         */
        this.componentStyle = {};
    }
    arrowPropertyChanged() {
        this.initiateComponent();
    }
    componentWillLoad() {
        this.initiateComponent();
    }
    componentDidLoad() {
        wcHelpers.installSlotObserver(this.el, () => this.onSlotChange()); // Listen to children changes
    }
    /**
     * Fired by the MutationObserver whenever children change.
     */
    onSlotChange() {
        this.initiateComponent();
    }
    /**
     * Closes the accordion item.
     * @param index Index of the accordion item.
     */
    async close(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            itemEl.setAttribute("open", "false");
            this.trackOpenItems(index, "false");
        }
    }
    /**
     * Closes all accordion items.
     */
    async closeAll() {
        this.openedItems = [];
        for (let i = 0; i < this.accordionItemEls.length; i++) {
            let itemEl = this.accordionItemEls[i];
            const headerEl = itemEl.querySelector("sdx-accordion-item-header");
            if (headerEl) {
                itemEl.setAttribute("open", "false");
                this.trackOpenItems(i, "false");
            }
        }
    }
    /**
     * Toggle display of the accordion item.
     * @param index Index of the accordion item.
     */
    async toggle(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            const itemFound = itemEl.getAttribute("open") || "false";
            const isOpen = itemFound === "false" ? "true" : "false";
            itemEl.setAttribute("open", isOpen);
            this.trackOpenItems(index, isOpen);
        }
    }
    /**
     * Opens the accordion item.
     * @param index Index of the accordion item.
     */
    async open(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            itemEl.setAttribute("open", "true");
            this.trackOpenItems(index, "true");
        }
    }
    /**
     * Opens all accordion items.
     */
    async openAll() {
        if (this.keepOpen || this.accordionItemEls.length === 1) {
            this.openedItems = [];
            for (let i = 0; i < this.accordionItemEls.length; i++) {
                let itemEl = this.accordionItemEls[i];
                const headerEl = itemEl.querySelector("sdx-accordion-item-header");
                if (headerEl) {
                    itemEl.setAttribute("open", "true");
                    this.trackOpenItems(i, "true");
                }
            }
        }
    }
    initiateComponent() {
        this.setChildElementsReferences();
        this.initiateAccordionItems();
    }
    /**
     * Sets child reference and add to every header a toggle function.
     */
    setChildElementsReferences() {
        this.accordionItemEls = this.el.querySelectorAll("sdx-accordion-item");
    }
    /**
     * Modify items with initial settings.
     */
    initiateAccordionItems() {
        this.openedItems = [];
        for (let i = 0; i < this.accordionItemEls.length; ++i) {
            const itemEl = this.accordionItemEls[i];
            const headerEl = itemEl.querySelector("sdx-accordion-item-header");
            if (headerEl) {
                let isOpen = "false";
                if (itemEl.hasAttribute("open") && itemEl.getAttribute("open") !== "false") {
                    isOpen = "true";
                }
                itemEl.setAttribute("open", isOpen);
                itemEl.setAttribute("arrow-position", this.arrowPosition);
                headerEl.setAttribute("arrow-position", this.arrowPosition);
                const bodyEl = itemEl.querySelector("sdx-accordion-item-body");
                if (bodyEl) {
                    bodyEl.setAttribute("arrow-position", this.arrowPosition);
                }
                this.trackOpenItems(i, isOpen);
                headerEl.toggle = this.toggle.bind(this, i);
            }
        }
    }
    /**
     * Closes all items when keepOpen is false, to ensure only 1 accordion item is opened max.
     * @param ignoreIndex Index for which the closing of item will be ignored.
     */
    closeNotIgnoredItems(ignoreIndex) {
        for (let i = 0; i < this.openedItems.length; i++) {
            if (this.openedItems[i] !== ignoreIndex) {
                const itemEl = this.accordionItemEls[this.openedItems[i]];
                itemEl.setAttribute("open", "false");
            }
        }
        this.openedItems = [];
    }
    /**
     * Track which item is opened in case keepOpen is set to true.
     * @param index Index of the opened item.
     * @param isOpen Open state of the item.
     */
    trackOpenItems(index, isOpen) {
        if (!this.keepOpen && isOpen === "true") {
            this.openedItems.push(index);
        }
    }
    render() {
        return (h("div", { class: "component", style: this.componentStyle },
            h("slot", null)));
    }
    static get is() { return "sdx-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion.css"]
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
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Position of the arrow in the header."
            },
            "attribute": "arrow-position",
            "reflect": false,
            "defaultValue": "\"right\""
        },
        "keepOpen": {
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
                "text": "Allow to keep multiple accordion items opened."
            },
            "attribute": "keep-open",
            "reflect": false,
            "defaultValue": "false"
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
                        "path": "../../core/types/types"
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
        "close": {
            "complexType": {
                "signature": "(index: number) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index Index of the accordion item.",
                                "name": "param"
                            }],
                        "text": "Index of the accordion item."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Closes the accordion item.",
                "tags": [{
                        "name": "param",
                        "text": "index Index of the accordion item."
                    }]
            }
        },
        "closeAll": {
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
                "text": "Closes all accordion items.",
                "tags": []
            }
        },
        "toggle": {
            "complexType": {
                "signature": "(index: number) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index Index of the accordion item.",
                                "name": "param"
                            }],
                        "text": "Index of the accordion item."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Toggle display of the accordion item.",
                "tags": [{
                        "name": "param",
                        "text": "index Index of the accordion item."
                    }]
            }
        },
        "open": {
            "complexType": {
                "signature": "(index: number) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index Index of the accordion item.",
                                "name": "param"
                            }],
                        "text": "Index of the accordion item."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Opens the accordion item.",
                "tags": [{
                        "name": "param",
                        "text": "index Index of the accordion item."
                    }]
            }
        },
        "openAll": {
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
                "text": "Opens all accordion items.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "arrowPosition",
            "methodName": "arrowPropertyChanged"
        }, {
            "propName": "keepOpen",
            "methodName": "arrowPropertyChanged"
        }]; }
}
