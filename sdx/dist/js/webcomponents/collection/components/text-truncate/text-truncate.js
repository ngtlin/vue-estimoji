import { Component, h } from "@stencil/core";
export class TextTruncate {
    render() {
        return (h("div", { class: "slot" },
            h("slot", null)));
    }
    static get is() { return "sdx-text-truncate"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["text-truncate.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["text-truncate.css"]
    }; }
}
