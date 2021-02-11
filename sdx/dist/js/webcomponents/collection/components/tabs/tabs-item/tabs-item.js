import { Component, h, Element, State, Prop, Watch } from "@stencil/core";
import { mapStateToProps, getStore } from "../../../core/helpers/store-helpers";
export class TabsItem {
    constructor() {
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
        this.store = getStore(this);
        this.unsubscribe = mapStateToProps(this, this.store, [
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
        return (h("div", { class: this.getComponentClassNames() },
            h("slot", null)));
    }
    static get is() { return "sdx-tabs-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tabs-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tabs-item.css"]
    }; }
    static get properties() { return {
        "label": {
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
                "text": "Title of the tab."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
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
                "text": "The tab is active."
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
                "text": "The tab is not selectable."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconName": {
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
                "text": "Which icon to display."
            },
            "attribute": "icon-name",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get states() { return {
        "selectedTabsItemEl": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "selectedChanged"
        }]; }
}
