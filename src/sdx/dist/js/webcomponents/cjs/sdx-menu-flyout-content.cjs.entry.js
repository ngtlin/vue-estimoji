'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const menuFlyoutContentCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:none;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2)}:host>.item>.body{position:relative;background-color:#fff;padding:24px;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right)>.item>.arrow,:host(.bottom-left)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right)>.item>.arrow,:host(.top-left)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}";

const MenuFlyoutContent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return Object.assign({}, webcomponentHelpers.computedProperty(this.directionState));
    }
    render() {
        return (index.h(index.Host, { class: this.getHostClassNames() }, index.h("div", { class: "item" }, index.h("div", { class: "arrow", ref: (el) => this.arrowEl = el }), index.h("div", { class: "body" }, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
MenuFlyoutContent.style = menuFlyoutContentCss;

exports.sdx_menu_flyout_content = MenuFlyoutContent;
