import { Component, h, Element, Listen, Prop, State, Watch, Host } from "@stencil/core";
import { getStore, mapStateToProps } from "../../../core/helpers/store-helpers";
import { computedProperty } from "../../../core/helpers/webcomponent-helpers";
export class SelectOption {
    constructor() {
        /**
         * Whether this option is initially selected.
         */
        this.selected = false;
        /**
         * Not selectable (event propagation will be stopped).
         */
        this.disabled = false;
        /**
         * @private
         * Whether this option is the placeholder element.
         */
        this.placeholder = false;
    }
    onClick() {
        var _a;
        (_a = this.select) === null || _a === void 0 ? void 0 : _a.call(this, this, "add", true);
    }
    selectedChanged() {
        var _a;
        (_a = this.select) === null || _a === void 0 ? void 0 : _a.call(this, this, this.selected ? "add" : "remove");
    }
    componentWillLoad() {
        var _a, _b;
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
            "selectionSorted",
            "multiple",
            "direction",
            "select",
            "filter",
            "filterFunction"
        ]);
        // Register self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_OPTION_EL", optionEl: this.el });
        if (this.selected) {
            (_b = this.select) === null || _b === void 0 ? void 0 : _b.call(this, this, "add");
        }
    }
    componentDidUnload() {
        var _a, _b, _c;
        // Unregister self
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "TOGGLE_OPTION_EL", optionEl: this.el });
        (_b = this.select) === null || _b === void 0 ? void 0 : _b.call(this, this, "remove");
        (_c = this.unsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
    }
    isSelected() {
        var _a;
        return !!((_a = this.selectionSorted) === null || _a === void 0 ? void 0 : _a.includes(this.el));
    }
    getHostClassNames() {
        return Object.assign({ selected: this.isSelected(), multiple: !!this.multiple, disabled: this.disabled }, computedProperty(this.direction));
    }
    render() {
        var _a, _b;
        return (h(Host, { class: this.getHostClassNames(), style: { display: ((_a = this.filterFunction) === null || _a === void 0 ? void 0 : _a.call(this, this.el, (_b = this.filter) !== null && _b !== void 0 ? _b : "")) ? "" : "none" } },
            h("div", { class: "component" }, this.multiple
                ? (h("sdx-input-item", { type: "checkbox", class: "option", checked: this.isSelected(), disabled: this.disabled, disableFocus: true },
                    h("sdx-text-truncate", null,
                        h("slot", null))))
                : (h("div", { class: "option" },
                    h("sdx-text-truncate", null,
                        h("slot", null)))))));
    }
    static get is() { return "sdx-select-option"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["select-option.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["select-option.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Value of the option that will be returned in the selection."
            },
            "attribute": "value",
            "reflect": false
        },
        "selected": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Whether this option is initially selected."
            },
            "attribute": "selected",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Not selectable (event propagation will be stopped)."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Whether this option is the placeholder element.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "selectionSorted": {},
        "multiple": {},
        "direction": {},
        "select": {},
        "filter": {},
        "filterFunction": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "selectedChanged"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
