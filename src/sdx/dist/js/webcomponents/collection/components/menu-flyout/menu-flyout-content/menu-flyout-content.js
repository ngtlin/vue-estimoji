import { Component, h, State, Element, Host } from "@stencil/core";
import { mapStateToProps, getStore } from "../../../core/helpers/store-helpers";
import { computedProperty } from "../../../core/helpers/webcomponent-helpers";
export class MenuFlyoutContent {
    componentWillLoad() {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "directionState"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    }
    componentDidLoad() {
        var _a;
        // Register arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
    }
    componentDidUnload() {
        var _a, _b, _c;
        // Unregister arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
        // Unregister self
        (_b = this.store) === null || _b === void 0 ? void 0 : _b.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_c = this.unsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
    }
    getHostClassNames() {
        return Object.assign({}, computedProperty(this.directionState));
    }
    render() {
        return (h(Host, { class: this.getHostClassNames() },
            h("div", { class: "item" },
                h("div", { class: "arrow", ref: (el) => this.arrowEl = el }),
                h("div", { class: "body" },
                    h("slot", null)))));
    }
    static get is() { return "sdx-menu-flyout-content"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout-content.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout-content.css"]
    }; }
    static get states() { return {
        "directionState": {}
    }; }
    static get elementRef() { return "el"; }
}
