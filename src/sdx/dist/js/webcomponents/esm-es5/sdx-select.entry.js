import { __awaiter, __generator, __spreadArrays } from "tslib";
import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement } from './index-28757bf2.js';
import { s as sortByAppearanceInDomTree, a as parseFunction, g as getPreviousFromList, b as getNextFromList, d as closest } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';
import './isNil-ec331784.js';
import { t as toggle } from './immutability-helpers-cb2779d7.js';
import { c as createAndInstallStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
import { i as isDesktopOrLarger } from './breakpoint-helpers-27552a59.js';
import { c as createCommonjsModule, a as commonjsGlobal, u as unwrapExports } from './_commonjsHelpers-97e6d7b1.js';
var bodyScrollLock_min = createCommonjsModule(function (module, exports) {
    !function (e, t) { t(exports); }(commonjsGlobal, function (exports) { function r(e) { if (Array.isArray(e)) {
        for (var t = 0, o = Array(e.length); t < e.length; t++)
            o[t] = e[t];
        return o;
    } return Array.from(e); } Object.defineProperty(exports, "__esModule", { value: !0 }); var l = !1; if ("undefined" != typeof window) {
        var e = { get passive() { l = !0; } };
        window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
    } var d = "undefined" != typeof window && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform), c = [], u = !1, a = -1, s = void 0, v = void 0, f = function (t) { return c.some(function (e) { return !(!e.options.allowTouchMove || !e.options.allowTouchMove(t)); }); }, m = function (e) { var t = e || window.event; return !!f(t.target) || (1 < t.touches.length || (t.preventDefault && t.preventDefault(), !1)); }, o = function () { setTimeout(function () { void 0 !== v && (document.body.style.paddingRight = v, v = void 0), void 0 !== s && (document.body.style.overflow = s, s = void 0); }); }; exports.disableBodyScroll = function (i, e) { if (d) {
        if (!i)
            return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
        if (i && !c.some(function (e) { return e.targetElement === i; })) {
            var t = { targetElement: i, options: e || {} };
            c = [].concat(r(c), [t]), i.ontouchstart = function (e) { 1 === e.targetTouches.length && (a = e.targetTouches[0].clientY); }, i.ontouchmove = function (e) { var t, o, n, r; 1 === e.targetTouches.length && (o = i, r = (t = e).targetTouches[0].clientY - a, !f(t.target) && (o && 0 === o.scrollTop && 0 < r ? m(t) : (n = o) && n.scrollHeight - n.scrollTop <= n.clientHeight && r < 0 ? m(t) : t.stopPropagation())); }, u || (document.addEventListener("touchmove", m, l ? { passive: !1 } : void 0), u = !0);
        }
    }
    else {
        n = e, setTimeout(function () { if (void 0 === v) {
            var e = !!n && !0 === n.reserveScrollBarGap, t = window.innerWidth - document.documentElement.clientWidth;
            e && 0 < t && (v = document.body.style.paddingRight, document.body.style.paddingRight = t + "px");
        } void 0 === s && (s = document.body.style.overflow, document.body.style.overflow = "hidden"); });
        var o = { targetElement: i, options: e || {} };
        c = [].concat(r(c), [o]);
    } var n; }, exports.clearAllBodyScrollLocks = function () { d ? (c.forEach(function (e) { e.targetElement.ontouchstart = null, e.targetElement.ontouchmove = null; }), u && (document.removeEventListener("touchmove", m, l ? { passive: !1 } : void 0), u = !1), c = [], a = -1) : (o(), c = []); }, exports.enableBodyScroll = function (t) { if (d) {
        if (!t)
            return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
        t.ontouchstart = null, t.ontouchmove = null, c = c.filter(function (e) { return e.targetElement !== t; }), u && 0 === c.length && (document.removeEventListener("touchmove", m, l ? { passive: !1 } : void 0), u = !1);
    }
    else
        (c = c.filter(function (e) { return e.targetElement !== t; })).length || o(); }; });
});
var bodyScrollLock = unwrapExports(bodyScrollLock_min);
var selectReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "SET_SELECTION_BATCH":
            return Object.assign(Object.assign({}, state), { selectionBatch: action.optionEls });
        case "COMMIT_SELECTION_BATCH":
            var selectionSorted = state.selectionSorted;
            if (state.selection !== state.selectionBatch) { // selection has changed
                // Sort selection by the options appearance in the DOM tree
                selectionSorted = state.selectionBatch.concat().sort(function (a, b) {
                    var aIndex = state.optionElsSorted.indexOf(a);
                    var bIndex = state.optionElsSorted.indexOf(b);
                    if (aIndex > bIndex) {
                        return 1;
                    }
                    if (aIndex < bIndex) {
                        return -1;
                    }
                    return 0;
                });
            }
            return Object.assign(Object.assign({}, state), { selection: state.selectionBatch, selectionSorted: selectionSorted });
        case "SELECT":
            var selectionBatch = state.selectionBatch;
            if (action.optionEl) { // selecting a "real" option (not the placeholder)
                if (state.multiple) { // multi-select
                    var selectionIndex = selectionBatch.indexOf(action.optionEl);
                    var alreadySelected = selectionIndex > -1;
                    if (alreadySelected || action.strategy === "remove") { // remove from selection
                        selectionBatch = selectionBatch.filter(function (optionElFromSelection) { return optionElFromSelection !== action.optionEl; });
                    }
                    else { // "add" to selection
                        selectionBatch = selectionBatch.concat(action.optionEl);
                    }
                }
                else { // single select
                    var alreadySelected = selectionBatch[0] === action.optionEl;
                    if (alreadySelected) {
                        if (action.strategy === "remove") {
                            selectionBatch = [];
                        }
                    }
                    else {
                        if (action.strategy === "add") {
                            selectionBatch = [action.optionEl];
                        }
                    }
                }
            }
            else { // selecting the placeholder
                if (selectionBatch.length) {
                    selectionBatch = [];
                }
            }
            return Object.assign(Object.assign({}, state), { selectionBatch: selectionBatch });
        case "SET_MULTIPLE":
            return Object.assign(Object.assign({}, state), { multiple: action.multiple });
        case "SET_DIRECTION":
            return Object.assign(Object.assign({}, state), { direction: action.direction });
        case "SET_SELECT":
            return Object.assign(Object.assign({}, state), { select: action.select });
        case "SET_ANIMATION_DURATION":
            return Object.assign(Object.assign({}, state), { animationDuration: action.animationDuration });
        case "TOGGLE_OPTION_EL":
            return Object.assign(Object.assign({}, state), { optionElsBatch: toggle(state.optionElsBatch, action.optionEl) });
        case "TOGGLE_OPTGROUP_EL":
            return Object.assign(Object.assign({}, state), { optgroupElsBatch: toggle(state.optgroupElsBatch, action.optgroupEl) });
        case "COMMIT_OPTION_ELS_BATCH":
            var optionElsSorted = state.optionElsSorted;
            if (state.optionEls !== state.optionElsBatch) { // options have changed
                optionElsSorted = __spreadArrays(state.optionElsBatch).sort(sortByAppearanceInDomTree);
            }
            return Object.assign(Object.assign({}, state), { optionEls: state.optionElsBatch, optionElsSorted: optionElsSorted });
        case "COMMIT_OPTGROUP_ELS_BATCH":
            return Object.assign(Object.assign({}, state), { optgroupEls: state.optgroupElsBatch });
        case "SET_FILTER":
            return Object.assign(Object.assign({}, state), { filter: action.filter });
        case "SET_FILTER_FUNCTION":
            return Object.assign(Object.assign({}, state), { filterFunction: action.filterFunction });
        default:
            return state;
    }
};
var selectCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}:host{outline:none}.component .wrapper{position:relative}.component .wrapper .header-wrapper{overflow:hidden;background:#fff;color:#333;border-radius:5px;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header{position:relative}.component .wrapper .header-wrapper .header .selection,.component .wrapper .header-wrapper .header .thumb{-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header .thumb{width:30px;position:absolute;right:-1px;top:-1px;bottom:-1px;pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.component .wrapper .header-wrapper .header .thumb>.icon{position:relative;width:100%;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.component .wrapper .header-wrapper .header .thumb>.icon::before,.component .wrapper .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#086adb;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component .wrapper .header-wrapper .header .thumb>.icon::before{left:0}.component .wrapper .header-wrapper .header .thumb>.icon::after{left:6px}.component .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component .wrapper .list-container{-webkit-overflow-scrolling:touch;overflow-y:auto;background:#fff;position:absolute;left:0;right:0;z-index:999999;-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:none}.component .wrapper .list-container .list{overflow:hidden}.component .wrapper .list-container .list .no-matches-found{height:48px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 16px;color:#bbb}.component.top .wrapper .list-container{margin-bottom:-1px}.component.bottom .wrapper .list-container{margin-top:-1px}.component.open .wrapper .header-wrapper,.component.opening .wrapper .header-wrapper{-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1);box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1)}.component.open .wrapper .header-wrapper .header .thumb>.icon::before,.component.opening .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.open .wrapper .header-wrapper .header .thumb>.icon::after,.component.opening .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.open.top .wrapper .header-wrapper,.component.opening.top .wrapper .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.open.top .wrapper .list-container,.component.open.top .wrapper .list-container .list,.component.opening.top .wrapper .list-container,.component.opening.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.open.bottom .wrapper .header-wrapper,.component.opening.bottom .wrapper .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.open.bottom .wrapper .list-container,.component.open.bottom .wrapper .list-container .list,.component.opening.bottom .wrapper .list-container,.component.opening.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.closing.top .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.closing.top .wrapper .list-container,.component.closing.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.closing.bottom .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.closing.bottom .wrapper .list-container,.component.closing.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.disabled .label,.component.disabled .wrapper,.component.loading .label,.component.loading .wrapper{pointer-events:none}.component.disabled{cursor:not-allowed}.component.disabled .label,.component.disabled .wrapper .header-wrapper .header .thumb{opacity:0.4}.component.loading sdx-loading-spinner{position:relative;right:8px}.component:not(.disabled):not(.loading) .header-wrapper .header{cursor:pointer}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon{position:relative}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before,.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{left:6px}.component.focus sdx-validation-message{display:none}.component.dark .label{color:#fff}.component.autocomplete:not(.loading) .wrapper .header-wrapper .header{padding-right:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#d12;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{left:6px}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#be0000 !important;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{left:6px}";
var Select = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.invokeSelectCallback = function () { return null; };
        this.invokeChangeCallback = function () { return null; };
        this.invokeFocusCallback = function () { return null; };
        this.invokeBlurCallback = function () { return null; };
        this.direction = "bottom";
        this.clicking = false;
        this.placeholderWhenOpened = null;
        this.componentChildrenWillLoadComplete = false;
        this.componentDidLoadComplete = false;
        this.hasFilterInputElFocus = false;
        this.hadFilterInputElFocus = false;
        // A "native" hidden DOM element that is submitted
        // when the sdx-select is used in a traditional form,
        // one for each value (in case of "multiple").
        this.lightDOMHiddenFormInputEls = [];
        // Disable scrolling when open:
        // It should not be possible to scroll the page while a select is open (just
        // like with a native select), but doing so removes the scrollbars on Windows,
        // which leads to a nasty glitch ("jumpy content"). There are "thin scrollbars"
        // in Windows 10 since v1804 (April 2018), but browsers do not seem to
        // implement that, see:
        // https://stackoverflow.com/questions/57160504/windows-10-thin-scrollbars-but-not-in-all-apps
        // That's why it's currently turned off, until there's no solution from Microsoft.
        this.blockScrollingWhenOpened = false;
        // When the selection changes by setting `this.value = [ "one", "two", ... ]`,
        // the selected options will be updated - but syncing back to "this.value"
        // is necessary, as long as `this.value` is valid.
        // These flag control in which way the sync happens.
        this.valueChangedInProgress = false;
        this.selectionSortedChangedInProgress = false;
        this.filter = "";
        this.display = "closed";
        this.foundMatches = 0;
        this.focussed = false;
        this.filterInputElValue = "";
        /**
         * Text to be displayed when nothing is selected.
         */
        this.placeholder = "";
        /**
         * Enable multi select.
         */
        this.multiple = false;
        /**
         * Will be written on the top of the sdx-select.
         */
        this.label = "";
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
        /**
         * Disables the sdx-select.
         */
        this.disabled = false;
        /**
         * Shows a loading spinner and disables the sdx-select.
         */
        this.loading = false;
        /**
         * How the component should behave when the user types something on the keyboard.
         * "focus" jumps to and focuses the option starting with the typed character.
         * "filter" lists only options (and optgroups) that match the entered keyword.
         * "autocomplete" is similar to "filter", but makes the component behave more
         * like an input field, e.g. the "value" reflects the content of the filter and
         * there is no thumb to open or close.
         */
        this.keyboardBehavior = "focus";
        /**
         * @private Deprecated, use "keyboard-behavior"
         * Filter the options of the sdx-select by typing.
         * Shortcut for keyboard-behavior="filter"
         */
        this.filterable = false;
        /**
         * Label for "no matches found".
         */
        this.noMatchesFoundLabel = "No matches found...";
        /**
         * Background color scheme.
         */
        this.backgroundTheme = "light";
        /**
         * The value(s) of the currently selected option(s).
         * Please note that this is always an array, even without the "multiple" attribute,
         * for both getting and setting the value <code>(e.g. mySelect.value = [ "value1" ])</code>).
         * Note that when being used for setting the initial value, the "selected" attribute on
         * the <code>&lt;sdx-select-option /&gt;</code> has the higher priority.
         */
        this.value = [];
        /**
         * Name parameter (useful when the item is embedded in a traditional HTML form submit).
         */
        this.name = undefined;
        /**
         * Marks the component as required (please note that this itself does not handle validation &mdash; use the "valid" and "validation-message" for that).
         */
        this.required = false;
        /**
         * @private
         * Disable animations for testing.
         */
        this.animated = true;
    }
    class_1.prototype.valueChanged = function () {
        // Update the filter when "autocomplete" and stop doing anything else
        if (this.isAutocomplete()) {
            var filter = this.value[0] || "";
            this.store.dispatch({ type: "SET_FILTER", filter: filter });
            this.filterInputElValue = filter;
            this.updateHiddenFormInputEl();
            this.invokeChangeCallback(this.value);
            return;
        }
        var _a = this.getByValues(this.value), validValues = _a.validValues, validatedValues = _a.validatedValues, optionEls = _a.optionEls;
        this.valueChangedInProgress = true;
        if (!validValues) {
            this.value = validatedValues;
            return;
        }
        this.updateHiddenFormInputEl();
        // Invoke change callback (after component has been fully initialized)
        if (this.componentDidLoadComplete) {
            this.invokeChangeCallback(this.value);
        }
        // Update the selection
        if (!this.selectionSortedChangedInProgress) {
            // Set selection
            this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls: optionEls });
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        // Invoke select callback (after component has been fully initialized)
        if (this.componentDidLoadComplete) {
            this.invokeSelectCallback(this.value);
        }
        this.valueChangedInProgress = false;
    };
    class_1.prototype.selectionSortedChanged = function () {
        // Wait for the component and its children to be initialized
        // completely (store setup, etc.) before continuing
        if (!this.componentChildrenWillLoadComplete) {
            return;
        }
        this.selectionSortedChangedInProgress = true;
        // If there are options, but without default selection, and no placeholder,
        // fall back by selecting first option element
        if (this.optionElsSorted.length && !this.selectionSorted.length && !this.placeholder) {
            this.store.dispatch({
                type: "SELECT",
                optionEl: this.optionElsSorted[0],
                strategy: "add"
            });
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        // Update the "value"
        if (!this.valueChangedInProgress) {
            var validatedValues = this.getByValues(this.selectionSorted.map(function (el) { return el.value; })).validatedValues;
            this.value = validatedValues;
        }
        // Set the filter input field to the selected value
        if (this.isFilterable()) {
            this.resetFilterInputEl();
        }
        this.selectionSortedChangedInProgress = false;
    };
    class_1.prototype.selectCallbackChanged = function () {
        this.setInvokeSelectCallback();
    };
    class_1.prototype.changeCallbackChanged = function () {
        this.setInvokeChangeCallback();
    };
    class_1.prototype.focusCallbackChanged = function () {
        this.setInvokeFocusCallback();
    };
    class_1.prototype.blurCallbackChanged = function () {
        this.setInvokeBlurCallback();
    };
    class_1.prototype.placeholderChanged = function () {
        this.resetFilter();
    };
    class_1.prototype.nameChanged = function () {
        this.updateHiddenFormInputEl();
    };
    class_1.prototype.filterFunctionChanged = function () {
        this.setFilterFunction();
    };
    class_1.prototype.multipleChanged = function () {
        this.store.dispatch({ type: "SET_MULTIPLE", multiple: this.multiple });
    };
    class_1.prototype.onFocus = function () {
        this.focussed = true;
    };
    class_1.prototype.onMouseDown = function () {
        this.clicking = true;
    };
    class_1.prototype.onMouseUp = function () {
        this.clicking = false;
    };
    class_1.prototype.onBlur = function () {
        // Ignore if focus is lost by clicking - this will be handled in onClick
        if (!this.clicking) {
            this.close();
        }
        this.focussed = false;
    };
    class_1.prototype.onWindowClick = function (e) {
        if (!this.isSelectEl(e.target)) {
            this.close();
        }
    };
    class_1.prototype.onKeyDown = function (e) {
        // Only listen to key events if Select is focussed
        if (!this.focussed) {
            return;
        }
        switch (e.which) {
            // Open focussed select
            case 32: // "space"
                var shadowRoot = this.el.shadowRoot;
                // Only listen to "space" keydown if the input element (for filterable) is not focussed,
                // otherwise the user wouldn't be able to type white spaces anymore.
                // Make sure it also works on old browsers by checking if shadowRoot.activeElement,
                // which never exists on them.
                if (!shadowRoot.activeElement || shadowRoot.activeElement !== this.filterInputEl) {
                    e.preventDefault(); // Prevent scrolling
                    // For single select, it's possible to select with space
                    if (this.isOpenOrOpening() && !this.multiple && this.focussedEl) {
                        this.focussedEl.click();
                    }
                    else {
                        this.toggle();
                    }
                }
                break;
            // Select currently focussed element
            case 13: // "enter"
                e.preventDefault(); // Prevent form submit on IE11 / Edge
                if (this.focussedEl) {
                    // Just act like the user has clicked on it
                    this.focussedEl.click();
                }
                break;
            // Focus previous element
            case 38: // "up"
                e.preventDefault(); // Prevent scrolling
                this.setFocussedEl("previous");
                if (this.hasVisibleOptionEls()) {
                    this.open();
                }
                break;
            // Focus next element
            case 40: // "down"
                e.preventDefault(); // Prevent scrolling
                this.setFocussedEl("next");
                if (this.hasVisibleOptionEls()) {
                    this.open();
                }
                break;
            // Close select
            case 27: // "esc"
                this.close();
                break;
            default: // any key
                var key = e.key.toLowerCase();
                var isValidKey = key.length === 1; // exclude key names like "Shift" or "LeftArrow"
                if (isValidKey) { // Assume an alphanumeric key was hit
                    // Only focus by letter if not filterable
                    if (!this.isFilterable()) {
                        this.setFocussedElByFirstLetter(key);
                    }
                }
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
    /**
     * Toggles the sdx-select.
     */
    class_1.prototype.toggle = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // When "autocomplete" is set, only open the menu on a certain input field value length
            if (_this.isAutocomplete()) {
                if (_this.isValidAutocomplete(_this.filterInputElValue)) {
                    _this.open().then(resolve);
                }
                else {
                    resolve();
                }
                return;
            }
            if (_this.isOpenOrOpening()) {
                _this.close().then(resolve);
            }
            else if (_this.isClosedOrClosing()) {
                _this.open().then(resolve);
            }
            else {
                resolve();
            }
        });
    };
    /**
     * Opens the sdx-select.
     */
    class_1.prototype.open = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Only a closed select can be opened
            if (!_this.isClosedOrClosing()) {
                resolve();
                return;
            }
            if (_this.blockScrollingWhenOpened) {
                bodyScrollLock.disableBodyScroll(_this.listContainerEl, {
                    allowTouchMove: function (el) {
                        var currentEl = el;
                        while (currentEl && currentEl !== document.body) {
                            // Check if the user is scrolling the modal body
                            if (currentEl.classList.contains("list-container")) {
                                // Check if the element overflows
                                if (currentEl.scrollHeight > currentEl.clientHeight) {
                                    return true;
                                }
                            }
                            currentEl = currentEl.parentNode;
                        }
                        return false;
                    }
                });
            }
            // Was the placeholder displayed when opening?
            _this.placeholderWhenOpened = _this.showPlaceholder();
            // Set dimensions
            _this.positionListContainerEl();
            _this.display = "opening";
            anime({
                targets: _this.listContainerEl,
                scaleY: 1,
                opacity: 1,
                duration: _this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: function () {
                    _this.display = "open";
                    if (_this.listContainerEl) {
                        _this.listContainerEl.style.transform = "";
                    }
                    resolve();
                }
            });
        });
    };
    /**
     * Closes the sdx-select.
     */
    class_1.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Only an open select can be closed
            if (_this.display !== "open") {
                resolve();
                return;
            }
            if (_this.blockScrollingWhenOpened) {
                bodyScrollLock.enableBodyScroll(_this.listContainerEl);
            }
            _this.display = "closing";
            // Reset focussed element
            _this.setFocussedEl(null);
            anime({
                targets: _this.listContainerEl,
                scaleY: 0,
                opacity: .2,
                duration: _this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: function () {
                    _this.display = "closed";
                    _this.placeholderWhenOpened = null;
                    // Blur input field (if filterable) - only an opened Select should be filterable
                    if (_this.isKeyboardBehavior("filter")) {
                        _this.filterInputEl.blur();
                    }
                    resolve();
                }
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.updateHiddenFormInputEl();
        this.store = createAndInstallStore(this, selectReducer, this.getInitialState());
        this.unsubscribe = mapStateToProps(this, this.store, [
            "selectionBatch",
            "selectionSorted",
            "animationDuration",
            "optionElsSorted",
            "optgroupEls",
            "filter"
        ]);
        this.store.dispatch({ type: "SET_MULTIPLE", multiple: this.multiple });
        this.store.dispatch({ type: "SET_SELECT", select: this.select.bind(this) });
        this.store.dispatch({ type: "SET_ANIMATION_DURATION", animationDuration: this.animationDuration });
        this.setInvokeSelectCallback();
        this.setInvokeChangeCallback();
        this.setInvokeFocusCallback();
        this.setInvokeBlurCallback();
        this.setFilterFunction();
        // Default filter value
        this.resetFilterInputEl();
    };
    class_1.prototype.componentDidLoad = function () {
        // All children are now ready
        this.componentChildrenWillLoadComplete = true;
        this.store.dispatch({ type: "COMMIT_OPTION_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_OPTGROUP_ELS_BATCH" });
        // Initial selection:
        // If there are "selected" options, use those.
        // If not, check if there's a value prop on the component and use that instead.
        // Otherwise, it will fall back to the first option at a later point in time.
        if (this.selectionBatch.length) {
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        else {
            var _a = this.getByValues(this.value), validValues = _a.validValues, optionEls = _a.optionEls;
            if (validValues) {
                this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls: optionEls });
                this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
            }
        }
        // Initial settings for list container element
        this.listContainerEl.style.opacity = ".2";
        this.listContainerEl.style.transform = "scaleY(0)";
        this.positionListContainerEl();
        this.componentDidLoadComplete = true;
    };
    class_1.prototype.componentDidUpdate = function () {
        // Here, it's certain that all child elements were handled
        this.store.dispatch({ type: "COMMIT_OPTION_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_OPTGROUP_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
    };
    class_1.prototype.componentDidUnload = function () {
        this.unsubscribe();
    };
    class_1.prototype.getInitialState = function () {
        var initialSelection = [];
        var initialOptionEls = [];
        var initialOptgroupEls = [];
        return {
            selection: initialSelection,
            selectionBatch: initialSelection,
            selectionSorted: initialSelection,
            multiple: false,
            direction: "bottom",
            select: function () { return null; },
            animationDuration: this.animated ? 200 : 0,
            optionEls: initialOptionEls,
            optionElsBatch: initialOptionEls,
            optionElsSorted: initialOptionEls,
            optgroupEls: initialOptgroupEls,
            optgroupElsBatch: initialOptgroupEls,
            filter: "",
            filterFunction: function () { return true; }
        };
    };
    // Resets the whole filter system
    class_1.prototype.resetFilter = function () {
        if (this.isFilterable()) {
            this.resetFilterInputEl();
            this.clearFilter();
        }
    };
    // Parses and injects the "filter-function" prop into the store
    class_1.prototype.setFilterFunction = function () {
        this.store.dispatch({
            type: "SET_FILTER_FUNCTION",
            filterFunction: this.optionElMatchesFilter.bind(this)
        });
    };
    // Write the current selection into the filter input field
    class_1.prototype.resetFilterInputEl = function () {
        this.filterInputElValue = this.getFormattedSelection();
    };
    // Clears the filter
    class_1.prototype.clearFilter = function () {
        this.store.dispatch({ type: "SET_FILTER", filter: "" });
    };
    /**
     * Set dimensions of list container element.
     */
    class_1.prototype.positionListContainerEl = function () {
        if (!(this.componentEl && this.wrapperEl && this.listContainerEl)) {
            return;
        }
        // Height calculation
        this.listContainerEl.style.maxHeight = this.getMaxHeight() || "none";
        var wrapperElRect = this.wrapperEl.getBoundingClientRect();
        var listContainerElHeight = this.listContainerEl.clientHeight;
        var spaceTowardsTop = wrapperElRect.top - Select.minSpaceToWindow;
        var spaceTowardsBottom = innerHeight - wrapperElRect.bottom - Select.minSpaceToWindow;
        var maxHeight = this.listContainerEl.style.maxHeight;
        if (spaceTowardsBottom >= listContainerElHeight) { // enough space towards bottom
            this.direction = "bottom";
        }
        else if (spaceTowardsTop >= listContainerElHeight) { // enough space towards top
            this.direction = "top";
        }
        else if (spaceTowardsTop > spaceTowardsBottom) { // not enough space, take top if larger
            maxHeight = spaceTowardsTop + "px";
            this.direction = "top";
        }
        else { // not enough space anywhere, fall back to bottom
            maxHeight = spaceTowardsBottom + "px";
            this.direction = "bottom";
        }
        this.listContainerEl.style.maxHeight = maxHeight;
        if (this.direction === "bottom") {
            this.listContainerEl.style.bottom = "auto"; // "Reset" if opened towards "top" before
        }
        else {
            this.listContainerEl.style.bottom = this.wrapperEl.clientHeight + "px";
        }
        this.listContainerEl.style.transformOrigin = (this.direction === "top") ? "0 100%" : "50% 0";
        // Propagate newly calculated direction
        this.store.dispatch({
            type: "SET_DIRECTION",
            direction: this.direction
        });
    };
    // If no "filter-function" is present, fall back to this
    class_1.prototype.defaultFilterFunction = function (optionEl, keyword) {
        var textContent = optionEl.textContent;
        if (!textContent) {
            return false;
        }
        return textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    };
    /**
     * Returns true if an option element matches the filter (e.g. in "ca" in "Car").
     * @param el The option to be tested.
     * @param keyword The Filter to be tested.
     */
    class_1.prototype.optionElMatchesFilter = function (el, keyword) {
        var filterFunction = this.defaultFilterFunction;
        // If a "filter-function" prop has been passed, use this instead
        if (this.filterFunction) {
            filterFunction = parseFunction(this.filterFunction);
        }
        var match = filterFunction(el, keyword);
        // When "autocomplete", all options should be hidden when there's no keyword,
        // while when in "filter", all options should be shown when there's no keyword
        if (this.isAutocomplete() && !keyword) {
            match = false;
        }
        // In "autocomplete", display only a certain number of option elements (UX)
        if (this.isAutocomplete()) {
            var allOptionEls = this.el.querySelectorAll("sdx-select-option");
            var visibleOptionElsCount = 0;
            for (var i = 0; i < allOptionEls.length; i++) {
                var optionEl = allOptionEls[i];
                if (el !== optionEl && optionEl.style.display !== "none") {
                    visibleOptionElsCount++;
                }
            }
            if ((isDesktopOrLarger() && visibleOptionElsCount >= Select.maxAutocompleteOptionsDesktop)
                ||
                    (!isDesktopOrLarger() && visibleOptionElsCount >= Select.maxAutocompleteOptionsMobile)) {
                match = false;
            }
        }
        // Make sure this.getMatchingOptionsCount() gets called again
        forceUpdate(this.el);
        return match;
    };
    // Checks whether the keyword fulfills the requirements of being a filter.
    class_1.prototype.isValidFilter = function (keyword) {
        return (keyword.length >= 2 &&
            keyword !== this.getFormattedSelection() // Ignore selection as filter
        );
    };
    // Checks whether the current keyword fulfills the requirements of being an autocomplete filter.
    class_1.prototype.isValidAutocomplete = function (keyword) {
        return keyword.length >= 3;
    };
    class_1.prototype.setFocussedEl = function (which) {
        // First, unfocus all
        for (var i = 0; i < this.optionElsSorted.length; i++) {
            var optionEl = this.optionElsSorted[i];
            optionEl.classList.remove("focus");
        }
        // If no element is to be selected, clear and abort
        if (which === null) {
            delete this.focussedEl;
            return;
        }
        if (which === "previous" || which === "next") {
            var lastSelectedOptionEl = this.selectionSorted[this.selectionSorted.length - 1];
            // If there's no currently focussed element, start from the last selected element
            var focussedEl = this.focussedEl || lastSelectedOptionEl;
            if (which === "previous") {
                var previousElement = getPreviousFromList(this.optionElsSorted, focussedEl);
                var count = 0;
                while (previousElement !== focussedEl && (previousElement.disabled || previousElement.style.display === "none") && (count < this.optionElsSorted.length)) {
                    previousElement = getPreviousFromList(this.optionElsSorted, previousElement);
                    count++;
                }
                this.focussedEl = previousElement;
            }
            else { // "next"
                var nextElement = getNextFromList(this.optionElsSorted, focussedEl);
                var count = 0;
                while (nextElement !== focussedEl && (nextElement.disabled || nextElement.style.display === "none") && (count < this.optionElsSorted.length)) {
                    nextElement = getNextFromList(this.optionElsSorted, nextElement);
                    count++;
                }
                this.focussedEl = nextElement;
            }
        }
        else { // "which" is an element
            this.focussedEl = which;
        }
        if (this.focussedEl) {
            this.focussedEl.classList.add("focus");
            this.scrollToOption(this.focussedEl);
        }
    };
    /**
     * Scrolls the list the way that an option is visible in the center.
     */
    class_1.prototype.scrollToOption = function (option) {
        var parent = this.listContainerEl;
        var optionRect = option.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        var isFullyVisible = optionRect.top >= parentRect.top && optionRect.bottom <= parentRect.top + parent.clientHeight;
        if (!isFullyVisible) {
            parent.scrollTop = optionRect.top + parent.scrollTop - parentRect.top;
        }
    };
    /**
     * Returns all options starting with a certain letter.
     * @param letter Key value to look for.
     */
    class_1.prototype.getOptionsByFirstLetter = function (letter) {
        var results = [];
        for (var i = 0; i < this.optionElsSorted.length; i++) {
            var option = this.optionElsSorted[i];
            if (option.textContent && option.textContent.toLowerCase().charAt(0) === letter) {
                results.push(option);
            }
        }
        return results;
    };
    /**
     * Sets the focussed option starting by a given letter.
     * @param letter Key value to look for.
     */
    class_1.prototype.setFocussedElByFirstLetter = function (letter) {
        var optionsByFirstLetter = this.getOptionsByFirstLetter(letter);
        if (optionsByFirstLetter.length) {
            var startIndex = 0;
            if (this.focussedEl) {
                var focussedElIndex = optionsByFirstLetter.indexOf(this.focussedEl);
                if (focussedElIndex > -1) {
                    startIndex = focussedElIndex;
                }
            }
            var option = optionsByFirstLetter[startIndex];
            if (option.disabled || option === this.focussedEl) {
                for (var i = 0; i < optionsByFirstLetter.length; i++) {
                    option = getNextFromList(optionsByFirstLetter, optionsByFirstLetter[startIndex]);
                    if (option.disabled) {
                        option = null;
                    }
                    else {
                        break;
                    }
                    // Look behind
                    if (startIndex < optionsByFirstLetter.length) {
                        startIndex++;
                    }
                    else {
                        startIndex = 0;
                    }
                }
            }
            if (option) {
                this.setFocussedEl(option);
            }
        }
    };
    /**
     * Checks if a given element is part of the sdx-select or the sdx-select itself.
     * Warning: this only works if the sdx-select isn't inside of a shadow-root!
     * @param el Element to check.
     */
    class_1.prototype.isSelectEl = function (el) {
        return !!closest(el, this.el);
    };
    /**
     * Determines whether the placeholder option should be rendered:
     *  - when no selection is in progress (user experience: list should not rerender while open),
     *  - when something is selected,
     *  - the placeholder prop exists
     *  - and when single select
     */
    class_1.prototype.showPlaceholder = function () {
        var showPlaceholder = !!this.selectionSorted.length && !!this.placeholder && !this.multiple && !this.required;
        if (this.placeholderWhenOpened !== null) {
            return this.placeholderWhenOpened;
        }
        return showPlaceholder;
    };
    /**
     * Get the text that will be displayed in the selection header.
     * Fall back to an empty string if there's no selection.
     */
    class_1.prototype.getFormattedSelection = function () {
        return this.selectionSorted.length
            ? this.selectionSorted.map(function (optionEl) {
                var text = optionEl.textContent;
                return text ? text.trim() : "";
            }).join(", ")
            : "";
    };
    class_1.prototype.setInvokeSelectCallback = function () {
        this.invokeSelectCallback = parseFunction(this.selectCallback);
    };
    class_1.prototype.setInvokeChangeCallback = function () {
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    };
    class_1.prototype.setInvokeFocusCallback = function () {
        this.invokeFocusCallback = parseFunction(this.focusCallback);
    };
    class_1.prototype.setInvokeBlurCallback = function () {
        this.invokeBlurCallback = parseFunction(this.blurCallback);
    };
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all options matching the values will also be returned.
     */
    class_1.prototype.getByValues = function (values) {
        if (Array.isArray(values)) {
            if (!values.length) {
                // Nothing to do, don't replace [] with [] because of change detection
                return { validValues: true, validatedValues: values, optionEls: [] };
            }
            // Filter out undefined values
            var definedValues = values.filter(function (value) { return value !== undefined; });
            if (!definedValues.length) {
                // Either only undefined values or completely empty
                return { validValues: false, validatedValues: [], optionEls: [] };
            }
            var validatedValues = [];
            var optionEls = [];
            var isValid = true;
            var _loop_1 = function (i) {
                var value = definedValues[i];
                var foundOptionEl = this_1.optionElsSorted.find(function (el) { return el.value === value; });
                if (foundOptionEl) {
                    if (this_1.multiple || (!this_1.multiple && i === 0)) {
                        optionEls.push(foundOptionEl);
                        validatedValues.push(foundOptionEl.value);
                    }
                    else {
                        // Single select should only respect one value
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
                return { validValues: false, validatedValues: validatedValues, optionEls: optionEls };
            }
            return { validValues: isValid, validatedValues: validatedValues, optionEls: optionEls };
        }
        // All non-array types will be reset (to an empty array)
        return { validValues: false, validatedValues: [], optionEls: [] };
    };
    class_1.prototype.onHeaderClick = function (e) {
        var targetEl = e.target;
        var didClickOnSdxInputEl = !!closest(targetEl, this.filterInputEl);
        if (this.isFilterable() && this.isOpenOrOpening() && didClickOnSdxInputEl && !this.hadFilterInputElFocus)
            ;
        else {
            this.toggle();
        }
        this.hadFilterInputElFocus = this.hasFilterInputElFocus;
    };
    class_1.prototype.onFilterInputElFocus = function () {
        this.hasFilterInputElFocus = true;
        this.invokeFocusCallback();
    };
    class_1.prototype.onFilterInputElBlur = function () {
        this.hasFilterInputElFocus = false;
        this.invokeBlurCallback();
    };
    class_1.prototype.onFilterInputElChange = function (value) {
        this.filterInputElValue = value;
        // Update the value field if "autocomplete"
        if (this.isAutocomplete()) {
            this.value = [value];
        }
        // Set filter itself
        this.store.dispatch({
            type: "SET_FILTER",
            filter: this.isValidFilter(value) ? value : ""
        });
    };
    class_1.prototype.onFilterInputElInput = function (value) {
        this.filterInputElValue = value;
        // Open or close the select if the user is typing something
        if (this.isKeyboardBehavior("filter")) {
            if (this.isValidFilter(this.filter)) {
                this.open();
            }
        }
        else if (this.isKeyboardBehavior("autocomplete")) {
            if (this.isValidAutocomplete(value)) {
                this.open();
            }
            else {
                this.close();
            }
        }
    };
    /**
     * Marks an option for selection (but does not commit yet - this happens in this.componentDidUpdate()).
     * @param option Instance of SelectOption to be selected.
     * @param strategy How to handle the selection (e.g. add or remove).
     * @param didClick If invoked by the user
     */
    class_1.prototype.select = function (option, strategy, didClick) {
        var _this = this;
        if (didClick === void 0) { didClick = false; }
        if (this.multiple) {
            // Do nothing at all when disabled
            if (option.disabled && didClick) {
                return;
            }
        }
        else { // single select
            // Close immediately if the chosen option is either disabled or already selected
            if (option.isSelected() || option.disabled) { // close immediately
                if (didClick) {
                    this.close();
                }
                // Do nothing at all when disabled
                if (option.disabled) {
                    return;
                }
                // Reset filter if the user has selected an already-selected option
                this.resetFilter();
            }
        }
        if (this.isAutocomplete()) {
            if (strategy === "add") {
                // Don't select anything if "autocomplete", only set the filter
                this.filterInputElValue = option.el.textContent;
            }
        }
        else {
            // Set selection
            this.store.dispatch({
                type: "SELECT",
                optionEl: option.placeholder === true ? null : option.el,
                strategy: strategy
            });
        }
        // After single select:
        // Auto close (with a little delay for the user to see what was selected)
        if (!this.multiple) {
            if (!this.isAutocomplete()) {
                this.resetFilterInputEl();
            }
            setTimeout(function () {
                var close = Promise.resolve();
                if (didClick) {
                    close = _this.close();
                }
                close.then(function () {
                    if (!_this.isAutocomplete()) {
                        _this.clearFilter();
                    }
                });
            }, this.animationDuration);
        }
    };
    class_1.prototype.updateHiddenFormInputEl = function () {
        var _this = this;
        if (this.value && this.name) {
            // Remove old hidden input elements
            this.lightDOMHiddenFormInputEls.forEach(function (lightDOMHiddenFormInputEl) {
                _this.el.removeChild(lightDOMHiddenFormInputEl);
            });
            this.lightDOMHiddenFormInputEls = [];
            // Create new hidden input elements
            for (var i = 0; i < this.value.length; i++) {
                var value = this.value[i];
                var lightDOMHiddenFormInputEl = document.createElement("input");
                lightDOMHiddenFormInputEl.type = "hidden";
                lightDOMHiddenFormInputEl.name = this.name;
                lightDOMHiddenFormInputEl.value = value;
                this.lightDOMHiddenFormInputEls.push(lightDOMHiddenFormInputEl);
                this.el.appendChild(lightDOMHiddenFormInputEl);
            }
        }
    };
    /**
     * True if this sdx-select is filterable using a filter input field.
     */
    class_1.prototype.isFilterable = function () {
        return this.isKeyboardBehavior("filter") || this.isKeyboardBehavior("autocomplete");
    };
    /**
     * Checks which "keyboard-behavior" prop is set, including backwards
     * compatibility with the deprecated "filterable" prop.
     * @param keyboardBehavior Behavior to test.
     */
    class_1.prototype.isKeyboardBehavior = function (keyboardBehavior) {
        var isMatch = keyboardBehavior === this.keyboardBehavior;
        if (keyboardBehavior === "filter" && (isMatch || this.filterable)) {
            return true;
        }
        return isMatch;
    };
    // Returns how many options are visible
    class_1.prototype.getMatchingOptionElsCount = function () {
        var optionEls = this.el.querySelectorAll("sdx-select-option");
        var count = 0;
        for (var i = 0; i < optionEls.length; i++) {
            if (optionEls[i].style.display !== "none") {
                count++;
            }
        }
        return count;
    };
    class_1.prototype.isAutocomplete = function () {
        return this.keyboardBehavior === "autocomplete";
    };
    class_1.prototype.hasVisibleOptionEls = function () {
        return this.optionElsSorted.some(function (optioneEl) { return optioneEl.style.display !== "none"; });
    };
    class_1.prototype.isOpenOrOpening = function () {
        return this.display === "open" || this.display === "opening";
    };
    class_1.prototype.isClosedOrClosing = function () {
        return this.display === "closed" || this.display === "closing";
    };
    /**
     * Normalizes max-height prop, e.g.:
     * 200 => "200px"
     * "50vh" => "50vh"
     */
    class_1.prototype.getMaxHeight = function () {
        // No max-height prop given
        if (!this.maxHeight) {
            return undefined;
        }
        // If number, add "px"
        if (Number(this.maxHeight)) {
            return this.maxHeight + "px";
        }
        // Unit is already given
        return String(this.maxHeight); // TS bug? String() shouldn't be needed because of above Number()
    };
    class_1.prototype.getDefaultInputFieldProps = function () {
        return {
            disabled: this.disabled,
            valid: this.valid,
            srHint: this.label + " " + this.srHint + " " + this.validationMessage,
            required: this.required
        };
    };
    class_1.prototype.getComponentClassNames = function () {
        var _a;
        return _a = {
                component: true
            },
            _a[this.backgroundTheme] = true,
            _a[this.display] = true,
            _a[this.direction] = true,
            _a.disabled = this.disabled,
            _a.loading = this.loading,
            _a.filterable = this.isFilterable(),
            _a.autocomplete = this.isAutocomplete(),
            _a.focus = this.focussed,
            _a.invalid = this.valid === false,
            _a;
    };
    class_1.prototype.getInputStyle = function () {
        var notClosed = this.display !== "closed";
        var openTowardsTop = this.direction === "top";
        var openTowardsBottom = this.direction === "bottom";
        return {
            paddingRight: this.isAutocomplete() ? "" : "48px",
            borderTopLeftRadius: notClosed && openTowardsTop ? "0" : "",
            borderTopRightRadius: notClosed && openTowardsTop ? "0" : "",
            borderBottomLeftRadius: notClosed && openTowardsBottom ? "0" : "",
            borderBottomRightRadius: notClosed && openTowardsBottom ? "0" : ""
        };
    };
    class_1.prototype.render = function () {
        var _this = this;
        return (h(Host, { "aria-expanded": (this.display === "open").toString() }, h("div", { class: this.getComponentClassNames(), ref: function (el) { return _this.componentEl = el; } }, this.label && h("label", { class: "label", onClick: function () { return _this.toggle(); } }, this.label, " ", this.required && h("span", { "aria-hidden": "true" }, "*")), h("div", { class: "wrapper", ref: function (el) { return _this.wrapperEl = el; } }, h("div", { class: "header-wrapper" }, h("div", { class: "header", onClick: function (e) { return _this.onHeaderClick(e); } }, h("div", { class: "selection" }, this.isFilterable()
            ? (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.filterInputElValue, ref: function (el) { return _this.filterInputEl = el; }, changeCallback: function (value) { return _this.onFilterInputElChange(value); }, inputCallback: function (value) { return _this.onFilterInputElInput(value); }, focusCallback: function () { return _this.onFilterInputElFocus(); }, blurCallback: function () { return _this.onFilterInputElBlur(); }, autocomplete: "off", placeholder: this.placeholder, selectTextOnFocus: this.isKeyboardBehavior("filter"), inputStyle: this.getInputStyle() })))
            : (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.getFormattedSelection() || this.placeholder, editable: false, inputStyle: Object.assign(Object.assign({}, this.getInputStyle()), { color: this.isOpenOrOpening() ? "#1781e3" : "" // $color-int-blue
                }) })))), (!this.isAutocomplete() || this.loading) &&
            h("div", { class: "thumb" }, this.loading
                ? h("sdx-loading-spinner", null)
                : h("div", { class: "icon" })))), h("div", { class: "list-container", ref: function (el) { return _this.listContainerEl = el; }, tabIndex: -1 }, h("div", { class: "list" }, this.showPlaceholder() &&
            h("sdx-select-option", { placeholder: true }, this.placeholder), h("div", { class: "slot" }, h("slot", null)), this.isValidFilter(this.filter) && this.getMatchingOptionElsCount() === 0 &&
            h("div", { class: "no-matches-found" }, this.noMatchesFoundLabel)))), this.validationMessage &&
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
                "value": ["valueChanged"],
                "selectionSorted": ["selectionSortedChanged"],
                "selectCallback": ["selectCallbackChanged"],
                "changeCallback": ["changeCallbackChanged"],
                "focusCallback": ["focusCallbackChanged"],
                "blurCallback": ["blurCallbackChanged"],
                "placeholder": ["placeholderChanged"],
                "name": ["nameChanged"],
                "filterFunction": ["filterFunctionChanged"],
                "multiple": ["multipleChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
Select.maxAutocompleteOptionsMobile = 5;
Select.maxAutocompleteOptionsDesktop = 10;
Select.minSpaceToWindow = 24; // $baseline-3
Select.style = selectCss;
export { Select as sdx_select };
