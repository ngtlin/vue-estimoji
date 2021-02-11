import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { c as computedProperty } from './webcomponent-helpers-5a1adad8.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var menuFlyoutContentCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:none;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2)}:host>.item>.body{position:relative;background-color:#fff;padding:24px;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right)>.item>.arrow,:host(.bottom-left)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right)>.item>.arrow,:host(.top-left)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}";
var MenuFlyoutContent = /** @class */ (function () {
    function MenuFlyoutContent(hostRef) {
        registerInstance(this, hostRef);
    }
    MenuFlyoutContent.prototype.componentWillLoad = function () {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "directionState"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SET_CONTENT_EL", contentEl: this.el });
    };
    MenuFlyoutContent.prototype.componentDidLoad = function () {
        var _a;
        // Register arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
    };
    MenuFlyoutContent.prototype.componentDidUnload = function () {
        var _a, _b, _c;
        // Unregister arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
        // Unregister self
        (_b = this.store) === null || _b === void 0 ? void 0 : _b.dispatch({ type: "SET_CONTENT_EL", contentEl: undefined });
        (_c = this.unsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
    };
    MenuFlyoutContent.prototype.getHostClassNames = function () {
        return Object.assign({}, computedProperty(this.directionState));
    };
    MenuFlyoutContent.prototype.render = function () {
        var _this = this;
        return (h(Host, { class: this.getHostClassNames() }, h("div", { class: "item" }, h("div", { class: "arrow", ref: function (el) { return _this.arrowEl = el; } }), h("div", { class: "body" }, h("slot", null)))));
    };
    Object.defineProperty(MenuFlyoutContent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return MenuFlyoutContent;
}());
MenuFlyoutContent.style = menuFlyoutContentCss;
export { MenuFlyoutContent as sdx_menu_flyout_content };
