import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var menuFlyoutToggleCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.toggle{padding:0;background-color:transparent;color:#086adb;border:none;font:inherit;outline:none;cursor:pointer}.toggle:hover,.toggle:focus{color:#0048CF}";
var MenuFlyoutToggle = /** @class */ (function () {
    function MenuFlyoutToggle(hostRef) {
        registerInstance(this, hostRef);
    }
    MenuFlyoutToggle.prototype.onClick = function () {
        var _a;
        (_a = this.toggle) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    MenuFlyoutToggle.prototype.handleKeyDown = function (e) {
        var _a;
        var key = e.key;
        if (key === "Spacebar" || key === " " || key === "Enter") {
            e.preventDefault(); // prevent scrolling, for space
            (_a = this.toggle) === null || _a === void 0 ? void 0 : _a.call(// prevent scrolling, for space
            this);
        }
    };
    MenuFlyoutToggle.prototype.componentWillLoad = function () {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "display",
            "toggle"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_TOGGLE_EL", toggleEl: this.el });
    };
    MenuFlyoutToggle.prototype.componentDidUnload = function () {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_TOGGLE_EL", toggleEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    };
    MenuFlyoutToggle.prototype.getAriaExpanded = function () {
        return this.display === "open" ? "true" : "false";
    };
    MenuFlyoutToggle.prototype.render = function () {
        return (h("button", { type: "button", class: "toggle", "aria-expanded": this.getAriaExpanded() }, h("slot", null)));
    };
    Object.defineProperty(MenuFlyoutToggle.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return MenuFlyoutToggle;
}());
MenuFlyoutToggle.style = menuFlyoutToggleCss;
export { MenuFlyoutToggle as sdx_menu_flyout_toggle };
