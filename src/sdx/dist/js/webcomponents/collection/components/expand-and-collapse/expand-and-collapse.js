import { Component, h, Prop, State } from "@stencil/core";
export class ExpandAndCollapse {
    constructor() {
        this.isExpanded = false;
        /**
         * Label that shows when the component is collapsed and ready to be expanded.
         */
        this.expandLabel = "";
        /**
         * Label that shows when the component is expanded and ready to be collapsed.
         */
        this.collapseLabel = "";
    }
    // TMP Fix until SDX-486 ("displayChangeCallback" should be implemented and used instead of onClick)
    toggle() {
        this.isExpanded = !this.isExpanded;
    }
    getAccordionStyles() {
        return {
            accordion: {
                border: "none"
            },
            header: {
                fontSize: "inherit",
                padding: "0"
            },
            body: {
                paddingTop: "12px"
            }
        };
    }
    render() {
        return (h("sdx-accordion", { "arrow-position": "left", componentStyle: this.getAccordionStyles().accordion },
            h("sdx-accordion-item", null,
                h("sdx-accordion-item-header", { onClick: () => this.toggle(), id: "id", buttonStyle: this.getAccordionStyles().header },
                    h("span", null, this.isExpanded ? this.collapseLabel : this.expandLabel)),
                h("sdx-accordion-item-body", { role: "region", "aria-labelledby": "id", componentStyle: this.getAccordionStyles().body },
                    h("slot", null)))));
    }
    static get is() { return "sdx-expand-and-collapse"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["expand-and-collapse.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["expand-and-collapse.css"]
    }; }
    static get properties() { return {
        "expandLabel": {
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
                "text": "Label that shows when the component is collapsed and ready to be expanded."
            },
            "attribute": "expand-label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "collapseLabel": {
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
                "text": "Label that shows when the component is expanded and ready to be collapsed."
            },
            "attribute": "collapse-label",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get states() { return {
        "isExpanded": {}
    }; }
}
