'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const menuFlyoutCtaCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:block;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);min-width:254px;max-width:850px}:host>.item>.body{position:relative;background-color:#fff;padding:12px 24px;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right)>.item>.arrow,:host(.bottom-left)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right)>.item>.arrow,:host(.top-left)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.bottom-left)>.item>.arrow,:host(.top-left)>.item>.arrow{right:24px}:host(.bottom-right)>.item>.arrow,:host(.top-right)>.item>.arrow{left:24px}:host(.small)>.item>.body{width:254px}:host(.medium)>.item>.body{width:480px}:host(.large)>.item>.body{width:850px}";

const MenuFlyoutCta = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Width of the flyout. If none is set, the Flyout grows dynamically (up to a certain point) based on the content.
         */
        this.size = "auto";
    }
    componentWillLoad() {
        var _a;
        this.store = storeHelpers.getStore(this);
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, [
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
        return Object.assign({ [this.size]: true }, webcomponentHelpers.computedProperty(this.directionState));
    }
    render() {
        return (index.h(index.Host, { class: this.getHostClassNames() }, index.h("div", { class: "item" }, index.h("div", { class: "arrow" }), index.h("div", { class: "body" }, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
MenuFlyoutCta.style = menuFlyoutCtaCss;

exports.sdx_menu_flyout_cta = MenuFlyoutCta;
