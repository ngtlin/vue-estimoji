import { Component, h, Element, Prop, Watch, Listen, forceUpdate } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
import { isDesktopOrLarger } from "../../core/helpers/breakpoint-helpers";
export class Search {
    constructor() {
        this.invokeSearchSubmitCallback = () => null;
        this.invokeValueChangeCallback = () => null;
        this.invokeChangeCallback = () => null;
        /**
         * Can be used for both reading and writing the value.
         */
        this.value = "";
        /**
         * Default text that will disappear on type.
         */
        this.placeholder = "";
        /**
         * Text for the screen reader labelling the search input field.
         */
        this.srHint = "";
        /**
         * Button text for the screen reader to read in place of the search icon.
         */
        this.srHintForButton = "";
    }
    valueChanged() {
        this.invokeAllChangeCallbacks();
    }
    searchSubmitCallbackChanged() {
        this.setInvokeSearchSubmitCallback();
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    valueChangeCallbackChanged() {
        this.setInvokeValueChangeCallback();
    }
    onWindowResizeThrottled() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            forceUpdate(this.el);
        }, 10);
    }
    componentWillLoad() {
        this.setInvokeSearchSubmitCallback();
        this.setInvokeChangeCallback();
        this.setInvokeValueChangeCallback();
    }
    submitSearch() {
        if (this.sdxInputEl) {
            this.invokeSearchSubmitCallback(this.sdxInputEl.value);
        }
    }
    invokeAllChangeCallbacks() {
        this.invokeChangeCallback(this.value);
        this.invokeValueChangeCallback(this.value);
    }
    setInvokeSearchSubmitCallback() {
        this.invokeSearchSubmitCallback = wcHelpers.parseFunction(this.searchSubmitCallback);
    }
    setInvokeValueChangeCallback() {
        this.invokeValueChangeCallback = wcHelpers.parseFunction(this.valueChangeCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    isClearIconHidden() {
        return isDesktopOrLarger() || !this.value.length;
    }
    clear() {
        this.value = "";
    }
    render() {
        return (h("div", { class: "wrapper" },
            h("sdx-input", { value: this.value, srHint: this.srHint, type: "search", placeholder: this.placeholder, hitEnterCallback: () => this.submitSearch(), inputCallback: (value) => this.value = value, ref: (el) => this.sdxInputEl = el, role: "search", inputStyle: {
                    paddingRight: this.isClearIconHidden()
                        ? "48px" /* $baseline-6 (space for search icon) */
                        : "88px" /* $baseline-11 (space for search icon AND clear icon) */
                } }),
            h("div", { class: "search-button" },
                h("sdx-button", { theme: "transparent", onClick: () => this.submitSearch(), srHint: this.srHintForButton, iconName: "icon-search", iconSize: 3 })),
            h("div", { class: "clear-button" },
                h("sdx-animation", { animationName: this.isClearIconHidden() ? "scale-out" : "scale-in" },
                    h("sdx-button", { theme: "transparent", onClick: () => this.clear(), iconName: "icon-close", "aria-hidden": "true" })))));
    }
    static get is() { return "sdx-search"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["search.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["search.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Can be used for both reading and writing the value."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "placeholder": {
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
                "text": "Default text that will disappear on type."
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "srHint": {
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
                "text": "Text for the screen reader labelling the search input field."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "srHintForButton": {
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
                "text": "Button text for the screen reader to read in place of the search icon."
            },
            "attribute": "sr-hint-for-button",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "searchSubmitCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((value: string) => void) | string",
                "resolved": "((value: string) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire on hitting enter or on clicking the button."
            },
            "attribute": "search-submit-callback",
            "reflect": false
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((value: string) => void) | string",
                "resolved": "((value: string) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the value has changed, regardless of method (keyboard or programmatical)."
            },
            "attribute": "change-callback",
            "reflect": false
        },
        "valueChangeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((value: string) => void) | string",
                "resolved": "((value: string) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "Deprecated, use \"changeCallback\"\nCallback that will fire when the value has changed, regardless of method (keyboard or programmatical). Same as changeCallback.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "value-change-callback",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "searchSubmitCallback",
            "methodName": "searchSubmitCallbackChanged"
        }, {
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "valueChangeCallback",
            "methodName": "valueChangeCallbackChanged"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "onWindowResizeThrottled",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
