'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const menuFlyoutListItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:block}:host>.item>.body{position:relative;background-color:#fff;color:#086adb;display:block;padding:12px 24px;text-align:center;text-decoration:none;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(.selectable)>.item>.body{cursor:pointer}:host(:not(.selectable))>.item>.body{cursor:not-allowed}:host(.selectable:hover)>.item>.arrow,:host(.selectable:hover)>.item>.body{color:#fff;background-color:#086adb !important}:host(.disabled)>.item>.body{color:#d6d6d6}:host(.disabled)>.item>.body.disabled,:host(.disabled)>.item>.body:disabled{cursor:not-allowed}:host(.disabled)>.item>.body.disabled:active,:host(.disabled)>.item>.body:disabled:active{pointer-events:none;-webkit-transform:none;transform:none}:host(:last-of-type)>.item>.body{border-bottom:none}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right:first-of-type)>.item>.arrow,:host(.bottom-left:first-of-type)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right:last-of-type)>.item>.arrow,:host(.top-left:last-of-type)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}";

const MenuFlyoutListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * If the item is not selectable, it is neither highlighted nor has it cursor: pointer.
         */
        this.selectable = true;
        /**
         * The URL this item should link to (if it’s a regular link not handled by JS).
         */
        this.href = "javascript:void(0);";
        /**
         * Optional language of the page the URL points to
         */
        this.hreflang = "";
        /**
         * Whether the item is disabled.
         */
        this.disabled = false;
    }
    onClick(e) {
        if (this.disabled) {
            e.stopPropagation();
        }
    }
    componentWillLoad() {
        this.store = storeHelpers.getStore(this);
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, [
            "directionState"
        ]);
    }
    componentDidLoad() {
        var _a;
        // Register arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister arrow el
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_ARROW_EL", arrowEl: this.arrowEl });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    getHostClassNames() {
        return Object.assign({ selectable: this.selectable && !this.disabled, disabled: this.disabled }, webcomponentHelpers.computedProperty(this.directionState));
    }
    getLinkClassNames() {
        return {
            body: true,
            disabled: this.disabled
        };
    }
    render() {
        return (index.h(index.Host, { class: this.getHostClassNames() }, index.h("div", { class: "item" }, index.h("div", { class: "arrow", ref: (el) => this.arrowEl = el }), index.h("a", { href: this.href, hreflang: this.hreflang, class: this.getLinkClassNames() }, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
MenuFlyoutListItem.style = menuFlyoutListItemCss;

exports.sdx_menu_flyout_list_item = MenuFlyoutListItem;
