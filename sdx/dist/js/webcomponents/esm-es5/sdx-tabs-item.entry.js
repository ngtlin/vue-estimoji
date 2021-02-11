import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var tabsItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.component{display:none}.component.selected{display:block}";
var TabsItem = /** @class */ (function () {
    function TabsItem(hostRef) {
        registerInstance(this, hostRef);
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
    TabsItem.prototype.selectedChanged = function () {
        var _a;
        if (this.selected) {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_TABS_ITEM_EL", tabsItemEl: this.el });
        }
    };
    TabsItem.prototype.componentWillLoad = function () {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "selectedTabsItemEl"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_TABS_ITEM_EL", tabsItemEl: this.el });
    };
    TabsItem.prototype.componentDidLoad = function () {
        var _a;
        if (this.selected) {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_TABS_ITEM_EL", tabsItemEl: this.el });
        }
    };
    TabsItem.prototype.componentDidUnload = function () {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_TABS_ITEM_EL", tabsItemEl: this.el });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    };
    TabsItem.prototype.getComponentClassNames = function () {
        return {
            component: true,
            selected: this.el === this.selectedTabsItemEl,
            disabled: this.disabled
        };
    };
    TabsItem.prototype.render = function () {
        return (h("div", { class: this.getComponentClassNames() }, h("slot", null)));
    };
    Object.defineProperty(TabsItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsItem, "watchers", {
        get: function () {
            return {
                "selected": ["selectedChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return TabsItem;
}());
TabsItem.style = tabsItemCss;
export { TabsItem as sdx_tabs_item };
