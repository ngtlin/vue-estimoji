import { Component, h, Prop, State, Element, Listen, Host } from "@stencil/core";
import { mapStateToProps, getStore } from "../../../../core/helpers/store-helpers";
import { computedProperty } from "../../../../core/helpers/webcomponent-helpers";
export class MenuFlyoutListItem {
    constructor() {
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
        return (h(Host, { class: this.getHostClassNames() },
            h("div", { class: "item" },
                h("div", { class: "arrow", ref: (el) => this.arrowEl = el }),
                h("a", { href: this.href, hreflang: this.hreflang, class: this.getLinkClassNames() },
                    h("slot", null)))));
    }
    static get is() { return "sdx-menu-flyout-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout-list-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout-list-item.css"]
    }; }
    static get properties() { return {
        "selectable": {
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
                "text": "If the item is not selectable, it is neither highlighted nor has it cursor: pointer."
            },
            "attribute": "selectable",
            "reflect": false,
            "defaultValue": "true"
        },
        "href": {
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
                "text": "The URL this item should link to (if it\u2019s a regular link not handled by JS)."
            },
            "attribute": "href",
            "reflect": false,
            "defaultValue": "\"javascript:void(0);\""
        },
        "hreflang": {
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
                "text": "Optional language of the page the URL points to"
            },
            "attribute": "hreflang",
            "reflect": false,
            "defaultValue": "\"\""
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
                "text": "Whether the item is disabled."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "directionState": {}
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
