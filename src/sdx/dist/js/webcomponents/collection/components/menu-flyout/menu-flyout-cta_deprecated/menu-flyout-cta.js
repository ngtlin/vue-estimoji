// WARNING
// This component has been deprecated in favor of <menu-flyout-content />.
// Do not make change in this file - it only exists for backwards compatibility.
import { Component, h, Prop, State, Element, Host } from "@stencil/core";
import { mapStateToProps, getStore } from "../../../core/helpers/store-helpers";
import { computedProperty } from "../../../core/helpers/webcomponent-helpers";
export class MenuFlyoutCta {
    constructor() {
        /**
         * Width of the flyout. If none is set, the Flyout grows dynamically (up to a certain point) based on the content.
         */
        this.size = "auto";
    }
    componentWillLoad() {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "directionState"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    getHostClassNames() {
        return Object.assign({ [this.size]: true }, computedProperty(this.directionState));
    }
    render() {
        return (h(Host, { class: this.getHostClassNames() },
            h("div", { class: "item" },
                h("div", { class: "arrow" }),
                h("div", { class: "body" },
                    h("slot", null)))));
    }
    static get is() { return "sdx-menu-flyout-cta"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout-cta.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout-cta.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"small\" | \"medium\" | \"large\" | \"auto\"",
                "resolved": "\"auto\" | \"large\" | \"medium\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Width of the flyout. If none is set, the Flyout grows dynamically (up to a certain point) based on the content."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "\"auto\""
        }
    }; }
    static get states() { return {
        "directionState": {}
    }; }
    static get elementRef() { return "el"; }
}
