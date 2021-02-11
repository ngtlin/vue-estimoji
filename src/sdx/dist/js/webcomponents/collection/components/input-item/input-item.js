import { Component, h, Element, Prop, State, Watch, Listen, Host } from "@stencil/core";
import uniqueId from "lodash-es/uniqueId";
import { getStore, mapStateToProps } from "../../core/helpers/store-helpers";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class InputItem {
    constructor() {
        this.invokeChangeCallback = () => null;
        /**
         * The form input type of the item (radio or checkbox).
         */
        this.type = "radio";
        /**
         * Icon size of the icon inside the container variation.
         */
        this.iconSize = 2;
        /**
         * Whether the item is turned on or off.
         */
        this.checked = false;
        /**
         * Not selectable.
         */
        this.disabled = false;
        /**
         * Name parameter (useful when the item is embedded in a traditional HTML form submit).
         */
        this.name = undefined;
        /**
         * Make sure that the input item does not receive focus.
         * Use this when the input item is used within a component that already
         * handles focus (e.g. sdx-select-option in sdx-select with multiselect).
         */
        this.disableFocus = false;
        /**
         * Marks the component as required (please note that this itself does not handle validation &mdash; use the "valid" and "validation-message" for that).
         */
        this.required = false;
        /**
         * @private
         * Hide the checkbox or radio checked indicator icon.
         */
        this.hideCheckedIcon = false;
        /**
         * @private
         */
        this.labelStyle = {};
    }
    valueChanged() {
        this.updateHiddenFormInputEl();
    }
    nameChanged() {
        this.updateHiddenFormInputEl();
    }
    nameStateChanged() {
        this.updateHiddenFormInputEl();
    }
    checkedChanged() {
        var _a, _b, _c, _d, _e;
        if (this.getInputType() === "radio") {
            if (this.checked) {
                (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: this.el });
            }
        }
        else { // "checkbox"
            if (this.checked && !((_b = this.selectedInputItemEls) === null || _b === void 0 ? void 0 : _b.includes(this.el))) {
                // ...is now "checked" but not yet in selection => add it
                (_c = this.store) === null || _c === void 0 ? void 0 : _c.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: this.el });
            }
            else if (!this.checked && ((_d = this.selectedInputItemEls) === null || _d === void 0 ? void 0 : _d.includes(this.el))) {
                // ... is now unchecked but still in selection => remove it
                (_e = this.store) === null || _e === void 0 ? void 0 : _e.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: this.el });
            }
        }
        this.updateHiddenFormInputEl();
    }
    selectedInputItemElsChanged() {
        var _a;
        // Update "checked" when selection has changed.
        // When "radio" and another item has been checked, make sure to uncheck
        if (this.getInputType() === "radio") {
            if (this.selectedInputItemEls && this.selectedInputItemEls[0] !== this.el) {
                this.checked = false;
            }
            else if (!this.checked) { // only check if it isn't already checked
                this.checked = true;
                this.inputEl.focus();
            }
        }
        else { // "checkbox"
            this.checked = !!((_a = this.selectedInputItemEls) === null || _a === void 0 ? void 0 : _a.includes(this.el));
        }
        this.updateHiddenFormInputEl();
        this.invokeChangeCallback(this.checked);
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    onClick(e) {
        // Prevent checkbox from getting focussed if needed
        if (this.disableFocus) {
            e.preventDefault();
        }
    }
    handleKeyDown(e) {
        var _a, _b;
        const key = e.key;
        if (key === "ArrowDown" || key === "ArrowRight") {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({
                type: "SELECT_NEXT_INPUT_ITEM_EL",
                currentSelectedInputItemEl: this.el
            });
            // Prevent default behaviour: scrolling of the page
            e.preventDefault();
        }
        else if (key === "ArrowUp" || key === "ArrowLeft") {
            (_b = this.store) === null || _b === void 0 ? void 0 : _b.dispatch({
                type: "SELECT_PREVIOUS_INPUT_ITEM_EL",
                currentSelectedInputItemEl: this.el
            });
            // Prevent default behaviour: scrolling of the page
            e.preventDefault();
        }
    }
    componentWillLoad() {
        var _a, _b;
        this.uniqueId = uniqueId();
        this.store = getStore(this);
        this.setInvokeChangeCallback();
        this.initHiddenFormInputEl();
        if (this.checked) {
            (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: this.el });
        }
        this.unsubscribe = mapStateToProps(this, this.store, [
            "typeState",
            "themeState",
            "nameState",
            "groupLabel",
            "inline",
            "selectedInputItemEls"
        ]);
        (_b = this.store) === null || _b === void 0 ? void 0 : _b.dispatch({ type: "REGISTER_INPUT_ITEM_EL", inputItemEl: this.el });
    }
    componentDidUnload() {
        var _a, _b;
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch({ type: "UNREGISTER_INPUT_ITEM_EL", inputItemEl: this.el });
        (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    getInputType() {
        return this.typeState || this.type;
    }
    check() {
        if (this.getInputType() === "radio") { // "radio"
            if (!this.checked) { // only check radio when it's not checked yet
                this.checked = true;
                this.invokeChangeCallback(this.checked);
            }
        }
        else { // "checkbox"
            this.checked = !this.checked;
            this.invokeChangeCallback(this.checked);
        }
    }
    initHiddenFormInputEl() {
        this.lightDOMHiddenFormInputEl = document.createElement("input");
        this.lightDOMHiddenFormInputEl.type = "hidden";
        this.updateHiddenFormInputEl();
        this.el.appendChild(this.lightDOMHiddenFormInputEl);
    }
    updateHiddenFormInputEl() {
        // Make sure the input el will not appear in the submit URL
        // This is necessary for IE11 because .name = "" would actually work
        delete this.lightDOMHiddenFormInputEl.name;
        this.lightDOMHiddenFormInputEl.removeAttribute("name");
        const name = this.getName();
        if (this.checked && name) {
            // The name should only be set if there's actually a value
            // in order to prevent empty URL params like "?name="
            this.lightDOMHiddenFormInputEl.name = name;
            this.lightDOMHiddenFormInputEl.value = this.getInputType() === "radio" ? this.value : "on";
        }
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    getName() {
        return this.nameState || this.name;
    }
    description() {
        return (h("span", { id: "description", class: "description" },
            h("slot", { name: "description" })));
    }
    getHostClassNames() {
        return {
            "input-container": this.themeState === "container"
        };
    }
    getComponentClassNames() {
        return {
            component: true,
            disabled: this.disabled,
            invalid: this.valid === false,
            inline: !!this.inline,
            "hide-checked-icon": this.hideCheckedIcon,
            [this.getInputType()]: true
        };
    }
    render() {
        return (h(Host, { class: this.getHostClassNames() },
            h("div", { class: this.getComponentClassNames() },
                this.groupLabel && h("div", { class: "sr-only", id: "groupLabel" }, this.groupLabel),
                h("input", { id: this.uniqueId, type: this.getInputType(), checked: this.checked, disabled: this.disabled, "aria-describedby": "groupLabel description validationMessage", ref: (el) => this.inputEl = el, tabindex: this.disableFocus ? -1 : undefined, onClick: () => this.check(), value: undefined }),
                h("label", { htmlFor: this.uniqueId, style: this.labelStyle },
                    h("slot", null),
                    " ",
                    this.required && h("span", null, "*"),
                    this.themeState === "container" &&
                        this.description(),
                    this.themeState === "container" && this.iconName &&
                        h("div", null,
                            h("sdx-icon", { class: "icon-placeholder", "icon-name": this.iconName, size: this.iconSize, "aria-hidden": "true" }),
                            h("sdx-icon", { class: "icon", "icon-name": this.iconName, size: this.iconSize, "aria-hidden": "true" }))),
                this.themeState === "none" &&
                    this.description(),
                this.validationMessage &&
                    h("sdx-validation-message", { id: "validationMessage", validationMessage: this.validationMessage }))));
    }
    static get is() { return "sdx-input-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["input-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["input-item.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputItemType",
                "resolved": "\"checkbox\" | \"radio\"",
                "references": {
                    "InputItemType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The form input type of the item (radio or checkbox)."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"radio\""
        },
        "iconName": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Icon name of the icon inside the container variation."
            },
            "attribute": "icon-name",
            "reflect": false
        },
        "iconSize": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "Size",
                "resolved": "1 | 2 | 3 | 4 | 5 | 6 | undefined",
                "references": {
                    "Size": {
                        "location": "import",
                        "path": "../icon/types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Icon size of the icon inside the container variation."
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "2"
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Whether the item is turned on or off."
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        },
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
                "text": "The current value."
            },
            "attribute": "value",
            "reflect": false
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
                "text": "Not selectable."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((checked: boolean) => void) | string",
                "resolved": "((checked: boolean) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback whenever the user checks/unchecks the component."
            },
            "attribute": "change-callback",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Name parameter (useful when the item is embedded in a traditional HTML form submit)."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "undefined"
        },
        "disableFocus": {
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
                "text": "Make sure that the input item does not receive focus.\nUse this when the input item is used within a component that already\nhandles focus (e.g. sdx-select-option in sdx-select with multiselect)."
            },
            "attribute": "disable-focus",
            "reflect": false,
            "defaultValue": "false"
        },
        "valid": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Set this to false to declare the component as invalid (and use the \"validation-message\" attribute to explain why)."
            },
            "attribute": "valid",
            "reflect": false
        },
        "validationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Text that explains the validation status to the user."
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "required": {
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
                "text": "Marks the component as required (please note that this itself does not handle validation &mdash; use the \"valid\" and \"validation-message\" for that)."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "hideCheckedIcon": {
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
                        "text": "Hide the checkbox or radio checked indicator icon.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "hide-checked-icon",
            "reflect": false,
            "defaultValue": "false"
        },
        "labelStyle": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "CSSRules",
                "resolved": "{ [key: string]: string | undefined; }",
                "references": {
                    "CSSRules": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "defaultValue": "{}"
        }
    }; }
    static get states() { return {
        "typeState": {},
        "themeState": {},
        "nameState": {},
        "inline": {},
        "selectedInputItemEls": {},
        "groupLabel": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "name",
            "methodName": "nameChanged"
        }, {
            "propName": "nameState",
            "methodName": "nameStateChanged"
        }, {
            "propName": "checked",
            "methodName": "checkedChanged"
        }, {
            "propName": "selectedInputItemEls",
            "methodName": "selectedInputItemElsChanged"
        }, {
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
