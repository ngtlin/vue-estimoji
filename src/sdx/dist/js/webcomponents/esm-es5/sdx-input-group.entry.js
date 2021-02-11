import { __awaiter, __generator } from "tslib";
import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { s as sortByAppearanceInDomTree, b as getNextFromList, g as getPreviousFromList, a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { c as createAndInstallStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var inputGroupReducer = function (state, action) {
    if (state === void 0) { state = {}; }
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
            var selectedInputItemEls = state.selectedInputItemEls;
            if (state.typeState === "radio") {
                var alreadySelected = state.selectedInputItemEls[0] === action.inputItemEl;
                if (!alreadySelected) {
                    selectedInputItemEls = [action.inputItemEl];
                }
            }
            else { // "checkbox"
                var selectionIndex = state.selectedInputItemEls.indexOf(action.inputItemEl);
                var alreadySelected = selectionIndex > -1;
                if (alreadySelected) { // remove from selection
                    selectedInputItemEls = selectedInputItemEls.filter(function (inputItemElFromSelection) { return inputItemElFromSelection !== action.inputItemEl; });
                }
                else { // add to selection
                    selectedInputItemEls = selectedInputItemEls.concat(action.inputItemEl);
                }
            }
            return Object.assign(Object.assign({}, state), { selectedInputItemEls: selectedInputItemEls, selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: undefined });
        case "SELECT_NEXT_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: action.currentSelectedInputItemEl, selectPreviousInputItemElFrom: undefined });
        case "SELECT_PREVIOUS_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: action.currentSelectedInputItemEl });
        case "REGISTER_INPUT_ITEM_EL":
            var inputItemEls = state.inputItemElsSorted;
            inputItemEls.push(action.inputItemEl);
            return Object.assign(Object.assign({}, state), { inputItemElsSorted: inputItemEls.sort(sortByAppearanceInDomTree) });
        case "UNREGISTER_INPUT_ITEM_EL":
            var deleteIndex = state.inputItemElsSorted.indexOf(action.inputItemEl);
            if (deleteIndex >= 0) {
                state.inputItemElsSorted.splice(deleteIndex, 1);
            }
            return state;
        default:
            return state;
    }
};
var inputGroupCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}.component .inline{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:stretch;align-content:stretch;margin-right:-27px;margin-bottom:-27px}.component .inline ::slotted(sdx-input-item){margin-right:27px;margin-bottom:27px}.component .inline.input-container{margin-right:-16px;margin-bottom:-16px}.component .inline.input-container ::slotted(sdx-input-item){width:auto;margin-right:16px;margin-bottom:16px}.component .inline.input-container ::slotted(sdx-input-item:not(:last-of-type)){margin-right:16px}";
var InputGroup = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.invokeChangeCallback = function () { return null; };
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
    class_1.prototype.typeChanged = function () {
        this.store.dispatch({ type: "SET_TYPE", typeState: this.type });
    };
    class_1.prototype.changeCallbackChanged = function () {
        this.setInvokeChangeCallback();
    };
    class_1.prototype.nameChanged = function () {
        this.store.dispatch({ type: "SET_NAME", nameState: this.name });
    };
    class_1.prototype.groupLabelChanged = function () {
        this.store.dispatch({ type: "SET_GROUP_LABEL", groupLabel: this.label });
    };
    class_1.prototype.inlineChanged = function () {
        this.store.dispatch({ type: "SET_INLINE", inline: this.inline });
    };
    class_1.prototype.valueChanged = function () {
        this.valueChangedInProgress = true;
        var _a = this.getByValues(this.value), validValues = _a.validValues, validatedValues = _a.validatedValues, inputItemEls = _a.inputItemEls;
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
    };
    class_1.prototype.selectedInputItemElsChanged = function () {
        // Wait for the component and its children to be initialized
        // completely (store setup, etc.) before continuing
        if (!this.componentChildrenWillLoadComplete) {
            return;
        }
        this.selectedInputItemElsChangedInProgress = true;
        // Update the "value"
        if (!this.valueChangedInProgress) {
            var validatedValues = this.getByValues(this.selectedInputItemEls.map(function (el) { return el.value; })).validatedValues;
            this.value = validatedValues;
        }
        this.selectedInputItemElsChangedInProgress = false;
    };
    class_1.prototype.selectNextInputItemElFromChanged = function () {
        if (this.selectNextInputItemElFrom) {
            var nextEl = getNextFromList(this.inputItemElsSorted, this.selectNextInputItemElFrom);
            while (nextEl !== this.selectNextInputItemElFrom && nextEl.disabled) {
                nextEl = getNextFromList(this.inputItemElsSorted, nextEl);
            }
            this.store.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: nextEl });
        }
    };
    class_1.prototype.selectPreviousInputItemElFromChanged = function () {
        if (this.selectPreviousInputItemElFrom) {
            var prevEl = getPreviousFromList(this.inputItemElsSorted, this.selectPreviousInputItemElFrom);
            while (prevEl !== this.selectPreviousInputItemElFrom && prevEl.disabled) {
                prevEl = getPreviousFromList(this.inputItemElsSorted, prevEl);
            }
            this.store.dispatch({ type: "SELECT_INPUT_ITEM_EL", inputItemEl: prevEl });
        }
    };
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    class_1.prototype.getSelection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.value];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
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
    };
    class_1.prototype.componentDidLoad = function () {
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
            var _a = this.getByValues(this.value), validValues = _a.validValues, inputItemEls = _a.inputItemEls;
            if (validValues) {
                this.store.dispatch({
                    type: "SET_SELECTED_INPUT_ITEM_ELS",
                    selectedInputItemEls: inputItemEls
                });
            }
        }
        this.componentDidLoadComplete = true;
    };
    class_1.prototype.componentDidUnload = function () {
        this.unsubscribe();
    };
    class_1.prototype.getInitialState = function () {
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
    };
    class_1.prototype.setInvokeChangeCallback = function () {
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    };
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all input items matching the values will also be returned.
     */
    class_1.prototype.getByValues = function (values) {
        if (Array.isArray(values)) {
            if (!values.length) {
                // Nothing to do, don't replace [] with [] because of change detection
                return { validValues: true, validatedValues: values, inputItemEls: [] };
            }
            // Filter out undefined values
            var definedValues = values.filter(function (value) { return value !== undefined; });
            if (!definedValues.length) {
                // Either only undefined values or completely empty
                return { validValues: false, validatedValues: [], inputItemEls: [] };
            }
            var validatedValues = [];
            var inputItemEls = [];
            var isValid = true;
            var _loop_1 = function (i) {
                var value = definedValues[i];
                var foundInputItemEl = this_1.inputItemElsSorted.find(function (el) { return el.value === value; });
                if (foundInputItemEl) {
                    if (this_1.type === "checkbox" || (this_1.type === "radio" && i === 0)) {
                        inputItemEls.push(foundInputItemEl);
                        validatedValues.push(foundInputItemEl.value);
                    }
                    else {
                        // Radios should only respect one value
                        isValid = false;
                    }
                }
            };
            var this_1 = this;
            // Check if values exist in the options
            for (var i = 0; i < definedValues.length; i++) {
                _loop_1(i);
            }
            if (validatedValues.length === 0) { // no values found
                return { validValues: false, validatedValues: validatedValues, inputItemEls: inputItemEls };
            }
            return { validValues: isValid, validatedValues: validatedValues, inputItemEls: inputItemEls };
        }
        // All non-array types will be reset (to an empty array)
        return { validValues: false, validatedValues: [], inputItemEls: [] };
    };
    class_1.prototype.getComponentClassNames = function () {
        return {
            component: true
        };
    };
    class_1.prototype.getSlotClassNames = function () {
        return {
            slot: true,
            inline: this.inline,
            "input-container": this.themeState === "container"
        };
    };
    class_1.prototype.render = function () {
        return (h(Host, { role: this.typeState === "radio" ? "radiogroup" : null }, h("div", { class: this.getComponentClassNames() }, this.label && h("label", null, this.label, this.required ? h("span", { "aria-hidden": "true" }, " *") : null), h("div", { class: this.getSlotClassNames() }, h("slot", null)), this.validationMessage &&
            h("sdx-validation-message", { validationMessage: this.validationMessage }))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "type": ["typeChanged"],
                "changeCallback": ["changeCallbackChanged"],
                "name": ["nameChanged"],
                "label": ["groupLabelChanged"],
                "inline": ["inlineChanged"],
                "value": ["valueChanged"],
                "selectedInputItemEls": ["selectedInputItemElsChanged"],
                "selectNextInputItemElFrom": ["selectNextInputItemElFromChanged"],
                "selectPreviousInputItemElFrom": ["selectPreviousInputItemElFromChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
InputGroup.style = inputGroupCss;
export { InputGroup as sdx_input_group };
