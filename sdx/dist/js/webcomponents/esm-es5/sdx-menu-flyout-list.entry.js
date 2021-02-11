import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var menuFlyoutListCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:none;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);width:254px}";
var MenuFlyoutList = /** @class */ (function () {
    function MenuFlyoutList(hostRef) {
        registerInstance(this, hostRef);
    }
    MenuFlyoutList.prototype.componentWillLoad = function () {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, []);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    };
    MenuFlyoutList.prototype.componentDidUnload = function () {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    };
    MenuFlyoutList.prototype.render = function () {
        return (h("slot", null));
    };
    Object.defineProperty(MenuFlyoutList.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return MenuFlyoutList;
}());
MenuFlyoutList.style = menuFlyoutListCss;
export { MenuFlyoutList as sdx_menu_flyout_list };
