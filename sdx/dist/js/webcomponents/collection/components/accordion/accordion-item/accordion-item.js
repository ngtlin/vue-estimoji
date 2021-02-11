import { Component, h, Prop, Watch, Element } from "@stencil/core";
export class AccordionItem {
    constructor() {
        /**
         * If the accordion item is initially open.
         */
        this.open = false;
    }
    activeItemChanged() {
        this.decideCollapseHeaderDisplay();
        this.decideCollapseBodyDisplay();
    }
    componentWillLoad() {
        this.setChildElementsReferences();
        this.decideCollapseHeaderDisplay();
    }
    componentDidLoad() {
        this.decideCollapseBodyDisplay();
    }
    /**
     * Assign element references to used properties.
     */
    setChildElementsReferences() {
        this.itemHeaderEl = this.el.querySelector("sdx-accordion-item-header");
        this.itemBodyEl = this.el.querySelector("sdx-accordion-item-body");
    }
    /**
     * Decides based on open property the display of header and its and behaviour.
     */
    decideCollapseHeaderDisplay() {
        if (this.itemHeaderEl) {
            this.itemHeaderEl.setAttribute("expand", this.open.toString());
        }
    }
    /**
     * Decides based on open property the display of body.
     */
    decideCollapseBodyDisplay() {
        if (this.itemBodyEl) {
            this.itemBodyEl.toggle(this.open);
        }
    }
    render() {
        return (h("div", { class: "component" },
            h("slot", null)));
    }
    static get is() { return "sdx-accordion-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion-item.css"]
    }; }
    static get properties() { return {
        "open": {
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
                "text": "If the accordion item is initially open."
            },
            "attribute": "open",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "open",
            "methodName": "activeItemChanged"
        }]; }
}
