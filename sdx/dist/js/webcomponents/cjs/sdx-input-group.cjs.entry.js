'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const storeHelpers = require('./store-helpers-9f2c656a.js');

const inputGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_TYPE":
            return Object.assign(Object.assign({}, state), { typeState: action.typeState });
        case "SET_THEME":
            return Object.assign(Object.assign({}, state), { themeState: action.themeState });
        case "SET_NAME":
            return Object.assign(Object.assign({}, state), { nameState: action.nameState });
        case "SET_GROUP_LABEL":
            return Object.assign(Object.assign({}, state), { groupLabel: action.groupLabel });
        case "SET_INLINE":
            return Object.assign(Object.assign({}, state), { inline: action.inline });
        case "SET_SELECTED_INPUT_ITEM_ELS":
            return Object.assign(Object.assign({}, state), { selectedInputItemEls: action.selectedInputItemEls });
        case "SELECT_INPUT_ITEM_EL":
            let selectedInputItemEls = state.selectedInputItemEls;
            if (state.typeState === "radio") {
                const alreadySelected = state.selectedInputItemEls[0] === action.inputItemEl;
                if (!alreadySelected) {
                    selectedInputItemEls = [action.inputItemEl];
                }
            }
            else { // "checkbox"
                const selectionIndex = state.selectedInputItemEls.indexOf(action.inputItemEl);
                const alreadySelected = selectionIndex > -1;
                if (alreadySelected) { // remove from selection
                    selectedInputItemEls = selectedInputItemEls.filter((inputItemElFromSelection) => inputItemElFromSelection !== action.inputItemEl);
                }
                else { // add to selection
                    selectedInputItemEls = selectedInputItemEls.concat(action.inputItemEl);
                }
            }
            return Object.assign(Object.assign({}, state), { selectedInputItemEls, selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: undefined });
        case "SELECT_NEXT_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: action.currentSelectedInputItemEl, selectPreviousInputItemElFrom: undefined });
        case "SELECT_PREVIOUS_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: action.currentSelectedInputItemEl });
        case "REGISTER_INPUT_ITEM_EL":
            const inputItemEls = state.inputItemElsSorted;
            inputItemEls.push(action.inputItemEl);
            return Object.assign(Object.assign({}, state), { inputItemElsSorted: inputItemEls.sort(webcomponentHelpers.sortByAppearanceInDomTree) });
        case "UNREGISTER_INPUT_ITEM_EL":
            const deleteIndex = state.inputItemElsSorted.indexOf(action.inputItemEl);
            if (deleteIndex >= 0) {
                state.inputItemElsSorted.splice(deleteIndex, 1);
            }
            return state;
        default:
            return state;
    }
};

const inputGroupCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}.component .inline{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:stretch;align-content:stretch;margin-right:-27px;margin-bottom:-27px}.component .inline ::slotted(sdx-input-item){margin-right:27px;margin-bottom:27px}.component .inline.input-container{margin-right:-16px;margin-bottom:-16px}.component .inline.input-container ::slotted(sdx-input-item){width:auto;margin-right:16px;margin-bottom:16px}.component .inline.input-container ::slotted(sdx-input-item:not(:last-of-type)){margin-right:16px}";

const InputGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            let nextEl = webcomponentHelpers.getNextFromList(this.inputItemElsSorted, this.selectNextInputItemElFrom);
            while (nextEl !== this.selectNextInputItemElFrom && nextEl.disabled) {
                nextEl = webcomponentHelpers.getNextFromList(this.inputItemElsSorted, nextEl);
            }
            this.store.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: nextEl });
        }
    }
    selectPreviousInputItemElFromChanged() {
        if (this.selectPreviousInputItemElFrom) {
            let prevEl = webcomponentHelpers.getPreviousFromList(this.inputItemElsSorted, this.selectPreviousInputItemElFrom);
            while (prevEl !== this.selectPreviousInputItemElFrom && prevEl.disabled) {
                prevEl = webcomponentHelpers.getPreviousFromList(this.inputItemElsSorted, prevEl);
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
        this.store = storeHelpers.createAndInstallStore(this, inputGroupReducer, this.getInitialState());
        this.unsubscribe = storeHelpers.mapStateToProps(this, this.store, [
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
        this.invokeChangeCallback = webcomponentHelpers.parseFunction(this.changeCallback);
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
        return (index.h(index.Host, { role: this.typeState === "radio" ? "radiogroup" : null }, index.h("div", { class: this.getComponentClassNames() }, this.label && index.h("label", null, this.label, this.required ? index.h("span", { "aria-hidden": "true" }, " *") : null), index.h("div", { class: this.getSlotClassNames() }, index.h("slot", null)), this.validationMessage &&
            index.h("sdx-validation-message", { validationMessage: this.validationMessage }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "type": ["typeChanged"],
        "changeCallback": ["changeCallbackChanged"],
        "name": ["nameChanged"],
        "label": ["groupLabelChanged"],
        "inline": ["inlineChanged"],
        "value": ["valueChanged"],
        "selectedInputItemEls": ["selectedInputItemElsChanged"],
        "selectNextInputItemElFrom": ["selectNextInputItemElFromChanged"],
        "selectPreviousInputItemElFrom": ["selectPreviousInputItemElFromChanged"]
    }; }
};
InputGroup.style = inputGroupCss;

exports.sdx_input_group = InputGroup;
