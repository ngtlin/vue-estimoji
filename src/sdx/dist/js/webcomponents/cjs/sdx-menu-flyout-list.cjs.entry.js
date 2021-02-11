'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const menuFlyoutListCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:none;position:absolute;top:0;left:0;z-index:60000;-webkit-box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.2);width:254px}";

const MenuFlyoutList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    componentWillLoad() {
        var _a;
        this.store = storeHelpers.getStore(this);
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, []);
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
        return (index.h("slot", null));
    }
    get el() { return index.getElement(this); }
};
MenuFlyoutList.style = menuFlyoutListCss;

exports.sdx_menu_flyout_list = MenuFlyoutList;
