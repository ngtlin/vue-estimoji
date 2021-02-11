import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';

const menuFlyoutToggleCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.toggle{padding:0;background-color:transparent;color:#086adb;border:none;font:inherit;outline:none;cursor:pointer}.toggle:hover,.toggle:focus{color:#0048CF}";

const MenuFlyoutToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        return (h("button", { type: "button", class: "toggle", "aria-expanded": this.getAriaExpanded() }, h("slot", null)));
    }
    get el() { return getElement(this); }
};
MenuFlyoutToggle.style = menuFlyoutToggleCss;

export { MenuFlyoutToggle as sdx_menu_flyout_toggle };
