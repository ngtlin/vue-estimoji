'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const selectOptgroupCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host ::slotted(sdx-select-option){border-top:none;border-bottom:none}:host .wrapper{border-top:1px solid #d6d6d6;border-bottom:1px solid #d6d6d6}:host .wrapper .title{font-weight:600;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 16px;height:48px;border-left:1px solid #d6d6d6;border-right:1px solid #d6d6d6}:host(.top) .wrapper{border-top:none}:host(.bottom) .wrapper{border-bottom:none}";

const SelectOptGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Label of the group to be displayed.
         */
        this.name = "";
    }
    componentWillLoad() {
        var _a;
        this.store = storeHelpers.getStore(this);
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, [
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
        return (index.h(index.Host, { class: this.direction, style: { display: this.optgroupElMatchesFilter(this.el, this.filter) ? "" : "none" } }, index.h("div", { class: "wrapper" }, this.name && index.h("div", { class: "title" }, this.name), index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
SelectOptGroup.style = selectOptgroupCss;

exports.sdx_select_optgroup = SelectOptGroup;
