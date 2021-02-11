import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { c as computedProperty } from './webcomponent-helpers-5a1adad8.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';

const menuFlyoutListItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host>.item>.arrow{display:none;position:absolute;background-color:#fff;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host{display:block}:host>.item>.body{position:relative;background-color:#fff;color:#086adb;display:block;padding:12px 24px;text-align:center;text-decoration:none;-webkit-transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:border-bottom 200ms cubic-bezier(0.4, 0, 0.6, 1), color 200ms cubic-bezier(0.4, 0, 0.6, 1)}:host(.selectable)>.item>.body{cursor:pointer}:host(:not(.selectable))>.item>.body{cursor:not-allowed}:host(.selectable:hover)>.item>.arrow,:host(.selectable:hover)>.item>.body{color:#fff;background-color:#086adb !important}:host(.disabled)>.item>.body{color:#d6d6d6}:host(.disabled)>.item>.body.disabled,:host(.disabled)>.item>.body:disabled{cursor:not-allowed}:host(.disabled)>.item>.body.disabled:active,:host(.disabled)>.item>.body:disabled:active{pointer-events:none;-webkit-transform:none;transform:none}:host(:last-of-type)>.item>.body{border-bottom:none}:host(:not(:last-of-type))>.item>.body{border-bottom:1px solid #e4e9ec}:host(.bottom-right:first-of-type)>.item>.arrow,:host(.bottom-left:first-of-type)>.item>.arrow{display:block;top:-7px;-webkit-box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:-1px -1px 2px 0 rgba(0, 0, 0, 0.15)}:host(.top-right:last-of-type)>.item>.arrow,:host(.top-left:last-of-type)>.item>.arrow{display:block;bottom:-7px;-webkit-box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15);box-shadow:1px 1px 2px 0 rgba(0, 0, 0, 0.15)}";

const MenuFlyoutListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
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
        return Object.assign({ selectable: this.selectable && !this.disabled, disabled: this.disabled }, computedProperty(this.directionState));
    }
    getLinkClassNames() {
        return {
            body: true,
            disabled: this.disabled
        };
    }
    render() {
        return (h(Host, { class: this.getHostClassNames() }, h("div", { class: "item" }, h("div", { class: "arrow", ref: (el) => this.arrowEl = el }), h("a", { href: this.href, hreflang: this.hreflang, class: this.getLinkClassNames() }, h("slot", null)))));
    }
    get el() { return getElement(this); }
};
MenuFlyoutListItem.style = menuFlyoutListItemCss;

export { MenuFlyoutListItem as sdx_menu_flyout_list_item };
