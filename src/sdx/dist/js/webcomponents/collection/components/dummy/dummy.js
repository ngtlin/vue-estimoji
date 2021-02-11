import { Component, h } from "@stencil/core";
/**
 * This is a dummy component that does nothing but printing its children.
 * Used only for test or debug purposes.
 */
export class Dummy {
    render() {
        return (h("slot", null));
    }
    static get is() { return "sdx-dummy"; }
    static get encapsulation() { return "shadow"; }
}
