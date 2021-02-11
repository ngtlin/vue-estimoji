import { r as registerInstance, h, H as Host, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { i as isSymbol, S as Symbol } from './isSymbol-c5c79e92.js';
import { g as getStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

const inputItemCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}:host(.input-container){display:block}:host(.input-container) .component:hover input:checked+label{border-color:#0048CF;color:#0048CF}:host(.input-container) .component:hover input:checked+label .icon{color:#0048CF}:host(.input-container) .component:hover label{border-color:#858585}:host(.input-container) .component:hover label .icon{color:#858585}:host(.input-container) .component.inline{height:100%}:host(.input-container) .component.hide-checked-icon label{padding-left:10px}:host(.input-container) .component.hide-checked-icon label::before,:host(.input-container) .component.hide-checked-icon label::after{display:none}:host(.input-container) .component input:focus+label{border-color:#086adb}:host(.input-container) .component input:checked+label{border-color:#086adb;color:#086adb}:host(.input-container) .component input:checked+label .icon{color:#086adb}:host(.input-container) .component label{border:2px solid #adadad;border-radius:5px;padding:10px;padding-left:47px;-webkit-transition:border 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:border 200ms cubic-bezier(0.4, 0, 0.2, 1)}:host(.input-container) .component label::before,:host(.input-container) .component label::after{margin:11px}:host(.input-container) .component ::slotted([slot=description]){padding-left:0}:host{display:inline-block;max-width:100%}:host .component{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column}:host .component:hover input:focus:checked+label::before{border-color:#0048CF}:host .component:hover input:checked+label::before{border-color:#0048CF}:host .component:hover input:checked+label::after{color:#0048CF;border-color:#0048CF}:host .component:hover label::before{border-color:#858585}:host .component:hover label::after{-webkit-transform:scale(0.5) translateZ(0);transform:scale(0.5) translateZ(0)}:host .component.invalid:hover label::before{border-color:#adadad}:host .component.invalid label::before{border-color:#d12}:host .component.disabled:hover input:checked+label::before{border-color:#adadad}:host .component.disabled:hover input:checked+label::after{color:#adadad;border-color:#adadad;-webkit-transform:scale(1) translateZ(0);transform:scale(1) translateZ(0)}:host .component.disabled:hover label::before{border-color:#adadad}:host .component.disabled:hover label::after{color:#adadad;-webkit-transform:scale(0) translateZ(0);transform:scale(0) translateZ(0)}:host .component.disabled input:checked+label::before{border-color:#adadad}:host .component.disabled input:checked+label::after{color:#adadad;border-color:#adadad}:host .component.disabled label{opacity:0.4;cursor:not-allowed;pointer-events:auto}:host .component.disabled label::after{-webkit-transform:scale(0) translateZ(0);transform:scale(0) translateZ(0)}:host .component.disabled ::slotted([slot=description]){opacity:0.4}:host .component input:focus:checked+label::before{border-color:#086adb}:host .component input:focus+label::before{border-color:#086adb}:host .component input:checked+label::before{border-color:#086adb}:host .component input:checked+label::after{-webkit-transform:scale(1) translateZ(0);transform:scale(1) translateZ(0);color:#086adb;border-color:#086adb}:host .component ::slotted([slot=description]){display:block;font-weight:400;line-height:24px;letter-spacing:0;font-size:16px;padding-top:5px;padding-bottom:3px;padding-left:37px;color:#666}:host .component input{position:absolute;opacity:0;height:0;width:0}:host .component label{cursor:pointer;-ms-flex-positive:1;flex-grow:1;padding-left:37px;color:#333;font-weight:400;line-height:24px;font-size:18px;margin-bottom:0;position:relative}:host .component label::before,:host .component label::after{content:\"\";position:absolute;top:0;left:0;margin-top:1px;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%}:host .component label::before{border:2px solid #adadad}:host .component label::after{-webkit-transform:scale(0) translateZ(0);transform:scale(0) translateZ(0)}:host .component .icon-placeholder{margin-top:6px;visibility:hidden}:host .component .icon{position:absolute;bottom:10px;left:0;right:0;text-align:center;-webkit-transition:color 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 200ms cubic-bezier(0.4, 0, 0.2, 1);color:#adadad}:host .component.checkbox:hover label::after{color:#858585}:host .component.checkbox label::before{border-radius:5px;width:22px;height:22px}:host .component.checkbox label::after{font-family:sdx-icons;content:\"\";color:#adadad;font-size:18px;text-align:left;line-height:normal;width:auto;left:2px;top:2px}:host .component.radio:hover label::after{border-color:#858585}:host .component.radio label::before{border-radius:50%;width:22px;height:22px}:host .component.radio label::after{top:6px;left:6px;border:5px solid #adadad;border-radius:50%}";

const InputItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    }
    getName() {
        return this.nameState || this.name;
    }
    description() {
        return (h("span", { id: "description", class: "description" }, h("slot", { name: "description" })));
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
        return (h(Host, { class: this.getHostClassNames() }, h("div", { class: this.getComponentClassNames() }, this.groupLabel && h("div", { class: "sr-only", id: "groupLabel" }, this.groupLabel), h("input", { id: this.uniqueId, type: this.getInputType(), checked: this.checked, disabled: this.disabled, "aria-describedby": "groupLabel description validationMessage", ref: (el) => this.inputEl = el, tabindex: this.disableFocus ? -1 : undefined, onClick: () => this.check(), value: undefined }), h("label", { htmlFor: this.uniqueId, style: this.labelStyle }, h("slot", null), " ", this.required && h("span", null, "*"), this.themeState === "container" &&
            this.description(), this.themeState === "container" && this.iconName &&
            h("div", null, h("sdx-icon", { class: "icon-placeholder", "icon-name": this.iconName, size: this.iconSize, "aria-hidden": "true" }), h("sdx-icon", { class: "icon", "icon-name": this.iconName, size: this.iconSize, "aria-hidden": "true" }))), this.themeState === "none" &&
            this.description(), this.validationMessage &&
            h("sdx-validation-message", { id: "validationMessage", validationMessage: this.validationMessage }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["valueChanged"],
        "name": ["nameChanged"],
        "nameState": ["nameStateChanged"],
        "checked": ["checkedChanged"],
        "selectedInputItemEls": ["selectedInputItemElsChanged"],
        "changeCallback": ["changeCallbackChanged"]
    }; }
};
InputItem.style = inputItemCss;

export { InputItem as sdx_input_item };
