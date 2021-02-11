'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const tabsItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.component{display:none}.component.selected{display:block}";

const TabsItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Title of the tab.
         */
        this.label = "";
        /**
         * The tab is active.
         */
        this.selected = false;
        /**
         * The tab is not selectable.
         */
        this.disabled = false;
        /**
         * Which icon to display.
         */
        this.iconName = "";
    }
    selectedChanged() {
        var _a;
        if (this.selected) {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_TABS_ITEM_EL", tabsItemEl: this.el });
        }
    }
    componentWillLoad() {
        var _a;
        this.store = storeHelpers.getStore(this);
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, [
            "selectedTabsItemEl"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_TABS_ITEM_EL", tabsItemEl: this.el });
    }
    componentDidLoad() {
        var _a;
        if (this.selected) {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_TABS_ITEM_EL", tabsItemEl: this.el });
        }
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_TABS_ITEM_EL", tabsItemEl: this.el });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    getComponentClassNames() {
        return {
            component: true,
            selected: this.el === this.selectedTabsItemEl,
            disabled: this.disabled
        };
    }
    render() {
        return (index.h("div", { class: this.getComponentClassNames() }, index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selected": ["selectedChanged"]
    }; }
};
TabsItem.style = tabsItemCss;

exports.sdx_tabs_item = TabsItem;
