import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';

const selectOptgroupCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host ::slotted(sdx-select-option){border-top:none;border-bottom:none}:host .wrapper{border-top:1px solid #d6d6d6;border-bottom:1px solid #d6d6d6}:host .wrapper .title{font-weight:600;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 16px;height:48px;border-left:1px solid #d6d6d6;border-right:1px solid #d6d6d6}:host(.top) .wrapper{border-top:none}:host(.bottom) .wrapper{border-bottom:none}";

const SelectOptGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Label of the group to be displayed.
         */
        this.name = "";
    }
    componentWillLoad() {
        var _a;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "direction",
            "filter",
            "filterFunction"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_OPTGROUP_EL", optgroupEl: this.el });
    }
    componentDidUnload() {
        var _a, _b;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_OPTGROUP_EL", optgroupEl: this.el });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    /**
     * Returns true if an optgroup element matches the filter (or one of its option element children).
     * @param el The optgroup to be tested.
     * @param filter The keyword to be tested.
     */
    optgroupElMatchesFilter(el, filter = "") {
        var _a;
        let anyOptionElMatchesFilter = false;
        for (let optionEl of el.querySelectorAll("sdx-select-option")) {
            if ((_a = this.filterFunction) === null || _a === void 0 ? void 0 : _a.call(this, optionEl, filter)) {
                anyOptionElMatchesFilter = true;
                break;
            }
        }
        return anyOptionElMatchesFilter;
    }
    render() {
        return (h(Host, { class: this.direction, style: { display: this.optgroupElMatchesFilter(this.el, this.filter) ? "" : "none" } }, h("div", { class: "wrapper" }, this.name && h("div", { class: "title" }, this.name), h("slot", null))));
    }
    get el() { return getElement(this); }
};
SelectOptGroup.style = selectOptgroupCss;

export { SelectOptGroup as sdx_select_optgroup };
