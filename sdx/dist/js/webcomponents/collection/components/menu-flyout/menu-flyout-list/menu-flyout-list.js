import { Component, h, Element } from "@stencil/core";
import { mapStateToProps, getStore } from "../../../core/helpers/store-helpers";
export class MenuFlyoutList {
    componentWillLoad() {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, []);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "sdx-menu-flyout-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout-list.css"]
    }; }
    static get elementRef() { return "el"; }
}
