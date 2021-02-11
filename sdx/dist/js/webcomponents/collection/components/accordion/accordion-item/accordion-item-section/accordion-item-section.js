import { Component, h } from "@stencil/core";
export class AccordionItemSection {
    render() {
        return (h("slot", null));
    }
    static get is() { return "sdx-accordion-item-section"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accordion-item-section.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["accordion-item-section.css"]
    }; }
}
