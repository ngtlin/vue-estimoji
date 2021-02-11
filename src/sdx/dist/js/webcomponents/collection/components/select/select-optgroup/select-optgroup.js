import { Component, h, Prop, State, Element, Host } from "@stencil/core";
import { getStore, mapStateToProps } from "../../../core/helpers/store-helpers";
export class SelectOptGroup {
    constructor() {
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
        return (h(Host, { class: this.direction, style: { display: this.optgroupElMatchesFilter(this.el, this.filter) ? "" : "none" } },
            h("div", { class: "wrapper" },
                this.name && h("div", { class: "title" }, this.name),
                h("slot", null))));
    }
    static get is() { return "sdx-select-optgroup"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["select-optgroup.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["select-optgroup.css"]
    }; }
    static get properties() { return {
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label of the group to be displayed."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get states() { return {
        "direction": {},
        "filter": {},
        "filterFunction": {}
    }; }
    static get elementRef() { return "el"; }
}
