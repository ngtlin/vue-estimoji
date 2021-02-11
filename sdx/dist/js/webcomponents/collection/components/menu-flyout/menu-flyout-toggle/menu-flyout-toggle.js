import { Component, h, Element, Listen, State } from "@stencil/core";
import { getStore, mapStateToProps } from "../../../core/helpers/store-helpers";
export class MenuFlyoutToggle {
    onClick() {
        var _a;
        (_a = this.toggle) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    handleKeyDown(e) {
        var _a;
        const key = e.key;
        if (key === "Spacebar" || key === " " || key === "Enter") {
            e.preventDefault(); // prevent scrolling, for space
            (_a = this.toggle) === null || _a === void 0 ? void 0 : _a.call(// prevent scrolling, for space
            this);
        }
    }
    componentWillLoad() {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "display",
            "toggle"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_TOGGLE_EL", toggleEl: this.el });
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_TOGGLE_EL", toggleEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    getAriaExpanded() {
        return this.display === "open" ? "true" : "false";
    }
    render() {
        return (h("button", { type: "button", class: "toggle", "aria-expanded": this.getAriaExpanded() },
            h("slot", null)));
    }
    static get is() { return "sdx-menu-flyout-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout-toggle.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout-toggle.css"]
    }; }
    static get states() { return {
        "display": {},
        "toggle": {}
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
