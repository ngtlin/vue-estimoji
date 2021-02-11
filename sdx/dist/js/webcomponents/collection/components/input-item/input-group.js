import { Component, h, Element, Prop, State, Watch, Method, Host } from "@stencil/core";
import { createAndInstallStore, mapStateToProps } from "../../core/helpers/store-helpers";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
import { inputGroupReducer } from "./input-group-store";
export class InputGroup {
    constructor() {
        this.invokeChangeCallback = () => null;
        this.componentChildrenWillLoadComplete = false;
        this.componentDidLoadComplete = false;
        // When the selection changes by setting `this.value = [ "one", "two", ... ]`,
        // the checked item els will be updated - but syncing back to "this.value"
        // is necessary, as long as `this.value` is valid.
        // These flag control in which way the sync happens.
        this.valueChangedInProgress = false;
        this.selectedInputItemElsChangedInProgress = false;
        /**
         * The form input variant of the item.
         */
        this.type = "radio";
        /**
         * Styling theme for the input items within this group.
         */
        this.theme = "none";
        /**
         * Name parameter (useful when the item is embedded in a traditional HTML form submit).
         */
        this.name = "";
        /**
         * Display all input items in a row (for maximum two items &mdash; more items should be embedded in a grid).
         */
        this.inline = false;
        /**
         * Label of the input group.
         */
        this.label = "";
        /**
         * The value(s) of the currently checked items(s).
         * Please note that this is always an array, even when type="checkbox",
         * for both getting and setting the value <code>(e.g. myGroup.value = [ "value1" ])</code>).
         * Note that when being used for setting the initial value, the "checked" attribute on
         * the <code>&lt;sdx-input-item /&gt;</code> has the higher priority.
         */
        this.value = [];
        /**
         * Marks the component as required (please note that this itself does not handle validation &mdash;
         * use the "valid" and "validation-message" for that).
         */
        this.required = false;
    }
    typeChanged() {
        this.store.dispatch({ type: "SET_TYPE", typeState: this.type });
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    nameChanged() {
        this.store.dispatch({ type: "SET_NAME", nameState: this.name });
    }
    groupLabelChanged() {
        this.store.dispatch({ type: "SET_GROUP_LABEL", groupLabel: this.label });
    }
    inlineChanged() {
        this.store.dispatch({ type: "SET_INLINE", inline: this.inline });
    }
    valueChanged() {
        this.valueChangedInProgress = true;
        const { validValues, validatedValues, inputItemEls } = this.getByValues(this.value);
        if (!validValues) {
            this.value = validatedValues;
            return;
        }
        // Update the selection
        if (!this.selectedInputItemElsChangedInProgress) {
            // Set selection
            this.store.dispatch({
                type: "SET_SELECTED_INPUT_ITEM_ELS",
                selectedInputItemEls: inputItemEls
            });
        }
        if (this.componentDidLoadComplete) {
            this.invokeChangeCallback(this.value);
        }
        this.valueChangedInProgress = false;
    }
    selectedInputItemElsChanged() {
        // Wait for the component and its children to be initialized
        // completely (store setup, etc.) before continuing
        if (!this.componentChildrenWillLoadComplete) {
            return;
        }
        this.selectedInputItemElsChangedInProgress = true;
        // Update the "value"
        if (!this.valueChangedInProgress) {
            const { validatedValues } = this.getByValues(this.selectedInputItemEls.map((el) => el.value));
            this.value = validatedValues;
        }
        this.selectedInputItemElsChangedInProgress = false;
    }
    selectNextInputItemElFromChanged() {
        if (this.selectNextInputItemElFrom) {
            let nextEl = wcHelpers.getNextFromList(this.inputItemElsSorted, this.selectNextInputItemElFrom);
            while (nextEl !== this.selectNextInputItemElFrom && nextEl.disabled) {
                nextEl = wcHelpers.getNextFromList(this.inputItemElsSorted, nextEl);
            }
            this.store.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: nextEl });
        }
    }
    selectPreviousInputItemElFromChanged() {
        if (this.selectPreviousInputItemElFrom) {
            let prevEl = wcHelpers.getPreviousFromList(this.inputItemElsSorted, this.selectPreviousInputItemElFrom);
            while (prevEl !== this.selectPreviousInputItemElFrom && prevEl.disabled) {
                prevEl = wcHelpers.getPreviousFromList(this.inputItemElsSorted, prevEl);
            }
            this.store.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: prevEl });
        }
    }
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    async getSelection() {
        return this.value;
    }
    componentWillLoad() {
        this.setInvokeChangeCallback();
        this.store = createAndInstallStore(this, inputGroupReducer, this.getInitialState());
        this.unsubscribe = mapStateToProps(this, this.store, [
            "typeState",
            "themeState",
            "selectedInputItemEls",
            "selectNextInputItemElFrom",
            "selectPreviousInputItemElFrom",
            "inputItemElsSorted"
        ]);
        this.store.dispatch({ type: "SET_TYPE", typeState: this.type });
        this.store.dispatch({ type: "SET_THEME", themeState: this.theme });
    }
    componentDidLoad() {
        // All children are now ready
        this.componentChildrenWillLoadComplete = true;
        if (this.name) {
            this.store.dispatch({ type: "SET_NAME", nameState: this.name });
        }
        if (this.label) {
            this.store.dispatch({ type: "SET_GROUP_LABEL", groupLabel: this.label });
        }
        this.store.dispatch({ type: "SET_INLINE", inline: this.inline });
        this.store.dispatch({ type: "SET_GROUP_LABEL", groupLabel: this.label });
        // Initial selection:
        // If there are "checked" items, use those.
        // If not, check if there's a value prop on the component and use that instead.
        if (!this.selectedInputItemEls.length) {
            const { validValues, inputItemEls } = this.getByValues(this.value);
            if (validValues) {
                this.store.dispatch({
                    type: "SET_SELECTED_INPUT_ITEM_ELS",
                    selectedInputItemEls: inputItemEls
                });
            }
        }
        this.componentDidLoadComplete = true;
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    getInitialState() {
        return {
            typeState: "radio",
            themeState: "none",
            nameState: "",
            groupLabel: "",
            inline: false,
            selectedInputItemEls: [],
            selectNextInputItemElFrom: undefined,
            selectPreviousInputItemElFrom: undefined,
            inputItemElsSorted: []
        };
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all input items matching the values will also be returned.
     */
    getByValues(values) {
        if (Array.isArray(values)) {
            if (!values.length) {
                // Nothing to do, don't replace [] with [] because of change detection
                return { validValues: true, validatedValues: values, inputItemEls: [] };
            }
            // Filter out undefined values
            const definedValues = values.filter((value) => value !== undefined);
            if (!definedValues.length) {
                // Either only undefined values or completely empty
                return { validValues: false, validatedValues: [], inputItemEls: [] };
            }
            const validatedValues = [];
            const inputItemEls = [];
            let isValid = true;
            // Check if values exist in the options
            for (let i = 0; i < definedValues.length; i++) {
                const value = definedValues[i];
                const foundInputItemEl = this.inputItemElsSorted.find((el) => el.value === value);
                if (foundInputItemEl) {
                    if (this.type === "checkbox" || (this.type === "radio" && i === 0)) {
                        inputItemEls.push(foundInputItemEl);
                        validatedValues.push(foundInputItemEl.value);
                    }
                    else {
                        // Radios should only respect one value
                        isValid = false;
                    }
                }
            }
            if (validatedValues.length === 0) { // no values found
                return { validValues: false, validatedValues, inputItemEls };
            }
            return { validValues: isValid, validatedValues, inputItemEls };
        }
        // All non-array types will be reset (to an empty array)
        return { validValues: false, validatedValues: [], inputItemEls: [] };
    }
    getComponentClassNames() {
        return {
            component: true
        };
    }
    getSlotClassNames() {
        return {
            slot: true,
            inline: this.inline,
            "input-container": this.themeState === "container"
        };
    }
    render() {
        return (h(Host, { role: this.typeState === "radio" ? "radiogroup" : null },
            h("div", { class: this.getComponentClassNames() },
                this.label && h("label", null,
                    this.label,
                    this.required ? h("span", { "aria-hidden": "true" }, " *") : null),
                h("div", { class: this.getSlotClassNames() },
                    h("slot", null)),
                this.validationMessage &&
                    h("sdx-validation-message", { validationMessage: this.validationMessage }))));
    }
    static get is() { return "sdx-input-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["input-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["input-group.css"]
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
                "text": "The form input variant of the item."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"radio\""
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Theme",
                "resolved": "\"container\" | \"none\"",
                "references": {
                    "Theme": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Styling theme for the input items within this group."
            },
            "attribute": "theme",
            "reflect": false,
            "defaultValue": "\"none\""
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((selection: any[]) => void) | string | undefined",
                "resolved": "((selection: any[]) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Callback when the checking an option."
            },
            "attribute": "change-callback",
            "reflect": false
        },
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
                "text": "Name parameter (useful when the item is embedded in a traditional HTML form submit)."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "inline": {
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
                "text": "Display all input items in a row (for maximum two items &mdash; more items should be embedded in a grid)."
            },
            "attribute": "inline",
            "reflect": false,
            "defaultValue": "false"
        },
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
                "text": "Label of the input group."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The value(s) of the currently checked items(s).\nPlease note that this is always an array, even when type=\"checkbox\",\nfor both getting and setting the value <code>(e.g. myGroup.value = [ \"value1\" ])</code>).\nNote that when being used for setting the initial value, the \"checked\" attribute on\nthe <code>&lt;sdx-input-item /&gt;</code> has the higher priority."
            },
            "defaultValue": "[]"
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
                "text": "Marks the component as required (please note that this itself does not handle validation &mdash;\nuse the \"valid\" and \"validation-message\" for that)."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "typeState": {},
        "themeState": {},
        "nameState": {},
        "groupLabel": {},
        "selectedInputItemEls": {},
        "selectNextInputItemElFrom": {},
        "selectPreviousInputItemElFrom": {},
        "inputItemElsSorted": {}
    }; }
    static get methods() { return {
        "getSelection": {
            "complexType": {
                "signature": "() => Promise<any[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any[]>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "deprecated",
                        "text": "read the \"value\" prop instead\nReturns the current selection."
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "type",
            "methodName": "typeChanged"
        }, {
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "name",
            "methodName": "nameChanged"
        }, {
            "propName": "label",
            "methodName": "groupLabelChanged"
        }, {
            "propName": "inline",
            "methodName": "inlineChanged"
        }, {
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "selectedInputItemEls",
            "methodName": "selectedInputItemElsChanged"
        }, {
            "propName": "selectNextInputItemElFrom",
            "methodName": "selectNextInputItemElFromChanged"
        }, {
            "propName": "selectPreviousInputItemElFrom",
            "methodName": "selectPreviousInputItemElFromChanged"
        }]; }
}
