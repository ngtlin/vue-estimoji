import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { c as computedProperty } from './webcomponent-helpers-5a1adad8.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var menuFlyoutCtaCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:block;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);min-width:254px;max-width:850px}:host>.item>.body{position:relative;background-color:#fff;padding:12px 24px;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right)>.item>.arrow,:host(.bottom-left)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right)>.item>.arrow,:host(.top-left)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.bottom-left)>.item>.arrow,:host(.top-left)>.item>.arrow{right:24px}:host(.bottom-right)>.item>.arrow,:host(.top-right)>.item>.arrow{left:24px}:host(.small)>.item>.body{width:254px}:host(.medium)>.item>.body{width:480px}:host(.large)>.item>.body{width:850px}";
var MenuFlyoutCta = /** @class */ (function () {
    function MenuFlyoutCta(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Width of the flyout. If none is set, the Flyout grows dynamically (up to a certain point) based on the content.
         */
        this.size = "auto";
    }
    MenuFlyoutCta.prototype.componentWillLoad = function () {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "directionState"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    };
    MenuFlyoutCta.prototype.componentDidUnload = function () {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    };
    MenuFlyoutCta.prototype.getHostClassNames = function () {
        var _c;
        return Object.assign((_c = {}, _c[this.size] = true, _c), computedProperty(this.directionState));
    };
    MenuFlyoutCta.prototype.render = function () {
        return (h(Host, { class: this.getHostClassNames() }, h("div", { class: "item" }, h("div", { class: "arrow" }), h("div", { class: "body" }, h("slot", null)))));
    };
    Object.defineProperty(MenuFlyoutCta.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return MenuFlyoutCta;
}());
MenuFlyoutCta.style = menuFlyoutCtaCss;
export { MenuFlyoutCta as sdx_menu_flyout_cta };
