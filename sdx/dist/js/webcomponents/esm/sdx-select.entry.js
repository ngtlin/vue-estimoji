import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement } from './index-28757bf2.js';
import { s as sortByAppearanceInDomTree, a as parseFunction, g as getPreviousFromList, b as getNextFromList, d as closest } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';
import './isNil-ec331784.js';
import { t as toggle } from './immutability-helpers-cb2779d7.js';
import { c as createAndInstallStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
import { i as isDesktopOrLarger } from './breakpoint-helpers-27552a59.js';
import { c as createCommonjsModule, a as commonjsGlobal, u as unwrapExports } from './_commonjsHelpers-97e6d7b1.js';

var bodyScrollLock_min = createCommonjsModule(function (module, exports) {
!function(e,t){t(exports);}(commonjsGlobal,function(exports){function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0;}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e);}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return !(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return !!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0);});};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY);},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()));},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0);}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px");}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden");});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o]);}var n;},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null;}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[]);},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1);}else(c=c.filter(function(e){return e.targetElement!==t})).length||o();};});
});

const bodyScrollLock = unwrapExports(bodyScrollLock_min);

const selectReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTION_BATCH":
            return Object.assign(Object.assign({}, state), { selectionBatch: action.optionEls });
        case "COMMIT_SELECTION_BATCH":
            let selectionSorted = state.selectionSorted;
            if (state.selection !== state.selectionBatch) { // selection has changed
                // Sort selection by the options appearance in the DOM tree
                selectionSorted = state.selectionBatch.concat().sort((a, b) => {
                    const aIndex = state.optionElsSorted.indexOf(a);
                    const bIndex = state.optionElsSorted.indexOf(b);
                    if (aIndex > bIndex) {
                        return 1;
                    }
                    if (aIndex < bIndex) {
                        return -1;
                    }
                    return 0;
                });
            }
            return Object.assign(Object.assign({}, state), { selection: state.selectionBatch, selectionSorted });
        case "SELECT":
            let selectionBatch = state.selectionBatch;
            if (action.optionEl) { // selecting a "real" option (not the placeholder)
                if (state.multiple) { // multi-select
                    const selectionIndex = selectionBatch.indexOf(action.optionEl);
                    const alreadySelected = selectionIndex > -1;
                    if (alreadySelected || action.strategy === "remove") { // remove from selection
                        selectionBatch = selectionBatch.filter((optionElFromSelection) => optionElFromSelection !== action.optionEl);
                    }
                    else { // "add" to selection
                        selectionBatch = selectionBatch.concat(action.optionEl);
                    }
                }
                else { // single select
                    const alreadySelected = selectionBatch[0] === action.optionEl;
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
            return Object.assign(Object.assign({}, state), { selectionBatch });
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
            let optionElsSorted = state.optionElsSorted;
            if (state.optionEls !== state.optionElsBatch) { // options have changed
                optionElsSorted = [...state.optionElsBatch].sort(sortByAppearanceInDomTree);
            }
            return Object.assign(Object.assign({}, state), { optionEls: state.optionElsBatch, optionElsSorted });
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

const selectCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}:host{outline:none}.component .wrapper{position:relative}.component .wrapper .header-wrapper{overflow:hidden;background:#fff;color:#333;border-radius:5px;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header{position:relative}.component .wrapper .header-wrapper .header .selection,.component .wrapper .header-wrapper .header .thumb{-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header .thumb{width:30px;position:absolute;right:-1px;top:-1px;bottom:-1px;pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.component .wrapper .header-wrapper .header .thumb>.icon{position:relative;width:100%;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.component .wrapper .header-wrapper .header .thumb>.icon::before,.component .wrapper .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#086adb;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component .wrapper .header-wrapper .header .thumb>.icon::before{left:0}.component .wrapper .header-wrapper .header .thumb>.icon::after{left:6px}.component .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component .wrapper .list-container{-webkit-overflow-scrolling:touch;overflow-y:auto;background:#fff;position:absolute;left:0;right:0;z-index:999999;-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:none}.component .wrapper .list-container .list{overflow:hidden}.component .wrapper .list-container .list .no-matches-found{height:48px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 16px;color:#bbb}.component.top .wrapper .list-container{margin-bottom:-1px}.component.bottom .wrapper .list-container{margin-top:-1px}.component.open .wrapper .header-wrapper,.component.opening .wrapper .header-wrapper{-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1);box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1)}.component.open .wrapper .header-wrapper .header .thumb>.icon::before,.component.opening .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.open .wrapper .header-wrapper .header .thumb>.icon::after,.component.opening .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.open.top .wrapper .header-wrapper,.component.opening.top .wrapper .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.open.top .wrapper .list-container,.component.open.top .wrapper .list-container .list,.component.opening.top .wrapper .list-container,.component.opening.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.open.bottom .wrapper .header-wrapper,.component.opening.bottom .wrapper .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.open.bottom .wrapper .list-container,.component.open.bottom .wrapper .list-container .list,.component.opening.bottom .wrapper .list-container,.component.opening.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.closing.top .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.closing.top .wrapper .list-container,.component.closing.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.closing.bottom .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.closing.bottom .wrapper .list-container,.component.closing.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.disabled .label,.component.disabled .wrapper,.component.loading .label,.component.loading .wrapper{pointer-events:none}.component.disabled{cursor:not-allowed}.component.disabled .label,.component.disabled .wrapper .header-wrapper .header .thumb{opacity:0.4}.component.loading sdx-loading-spinner{position:relative;right:8px}.component:not(.disabled):not(.loading) .header-wrapper .header{cursor:pointer}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon{position:relative}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before,.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{left:6px}.component.focus sdx-validation-message{display:none}.component.dark .label{color:#fff}.component.autocomplete:not(.loading) .wrapper .header-wrapper .header{padding-right:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#d12;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{left:6px}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#be0000 !important;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{left:6px}";

const Select = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.invokeSelectCallback = () => null;
        this.invokeChangeCallback = () => null;
        this.invokeFocusCallback = () => null;
        this.invokeBlurCallback = () => null;
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
    valueChanged() {
        // Update the filter when "autocomplete" and stop doing anything else
        if (this.isAutocomplete()) {
            const filter = this.value[0] || "";
            this.store.dispatch({ type: "SET_FILTER", filter });
            this.filterInputElValue = filter;
            this.updateHiddenFormInputEl();
            this.invokeChangeCallback(this.value);
            return;
        }
        const { validValues, validatedValues, optionEls } = this.getByValues(this.value);
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
            this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls });
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        // Invoke select callback (after component has been fully initialized)
        if (this.componentDidLoadComplete) {
            this.invokeSelectCallback(this.value);
        }
        this.valueChangedInProgress = false;
    }
    selectionSortedChanged() {
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
            const { validatedValues } = this.getByValues(this.selectionSorted.map((el) => el.value));
            this.value = validatedValues;
        }
        // Set the filter input field to the selected value
        if (this.isFilterable()) {
            this.resetFilterInputEl();
        }
        this.selectionSortedChangedInProgress = false;
    }
    selectCallbackChanged() {
        this.setInvokeSelectCallback();
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    focusCallbackChanged() {
        this.setInvokeFocusCallback();
    }
    blurCallbackChanged() {
        this.setInvokeBlurCallback();
    }
    placeholderChanged() {
        this.resetFilter();
    }
    nameChanged() {
        this.updateHiddenFormInputEl();
    }
    filterFunctionChanged() {
        this.setFilterFunction();
    }
    multipleChanged() {
        this.store.dispatch({ type: "SET_MULTIPLE", multiple: this.multiple });
    }
    onFocus() {
        this.focussed = true;
    }
    onMouseDown() {
        this.clicking = true;
    }
    onMouseUp() {
        this.clicking = false;
    }
    onBlur() {
        // Ignore if focus is lost by clicking - this will be handled in onClick
        if (!this.clicking) {
            this.close();
        }
        this.focussed = false;
    }
    onWindowClick(e) {
        if (!this.isSelectEl(e.target)) {
            this.close();
        }
    }
    onKeyDown(e) {
        // Only listen to key events if Select is focussed
        if (!this.focussed) {
            return;
        }
        switch (e.which) {
            // Open focussed select
            case 32: // "space"
                const shadowRoot = this.el.shadowRoot;
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
                const key = e.key.toLowerCase();
                const isValidKey = key.length === 1; // exclude key names like "Shift" or "LeftArrow"
                if (isValidKey) { // Assume an alphanumeric key was hit
                    // Only focus by letter if not filterable
                    if (!this.isFilterable()) {
                        this.setFocussedElByFirstLetter(key);
                    }
                }
        }
    }
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    async getSelection() {
        return this.value;
    }
    /**
     * Toggles the sdx-select.
     */
    toggle() {
        return new Promise((resolve) => {
            // When "autocomplete" is set, only open the menu on a certain input field value length
            if (this.isAutocomplete()) {
                if (this.isValidAutocomplete(this.filterInputElValue)) {
                    this.open().then(resolve);
                }
                else {
                    resolve();
                }
                return;
            }
            if (this.isOpenOrOpening()) {
                this.close().then(resolve);
            }
            else if (this.isClosedOrClosing()) {
                this.open().then(resolve);
            }
            else {
                resolve();
            }
        });
    }
    /**
     * Opens the sdx-select.
     */
    open() {
        return new Promise((resolve) => {
            // Only a closed select can be opened
            if (!this.isClosedOrClosing()) {
                resolve();
                return;
            }
            if (this.blockScrollingWhenOpened) {
                bodyScrollLock.disableBodyScroll(this.listContainerEl, {
                    allowTouchMove: (el) => {
                        let currentEl = el;
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
            this.placeholderWhenOpened = this.showPlaceholder();
            // Set dimensions
            this.positionListContainerEl();
            this.display = "opening";
            anime({
                targets: this.listContainerEl,
                scaleY: 1,
                opacity: 1,
                duration: this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.display = "open";
                    if (this.listContainerEl) {
                        this.listContainerEl.style.transform = "";
                    }
                    resolve();
                }
            });
        });
    }
    /**
     * Closes the sdx-select.
     */
    close() {
        return new Promise((resolve) => {
            // Only an open select can be closed
            if (this.display !== "open") {
                resolve();
                return;
            }
            if (this.blockScrollingWhenOpened) {
                bodyScrollLock.enableBodyScroll(this.listContainerEl);
            }
            this.display = "closing";
            // Reset focussed element
            this.setFocussedEl(null);
            anime({
                targets: this.listContainerEl,
                scaleY: 0,
                opacity: .2,
                duration: this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.display = "closed";
                    this.placeholderWhenOpened = null;
                    // Blur input field (if filterable) - only an opened Select should be filterable
                    if (this.isKeyboardBehavior("filter")) {
                        this.filterInputEl.blur();
                    }
                    resolve();
                }
            });
        });
    }
    componentWillLoad() {
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
    }
    componentDidLoad() {
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
            const { validValues, optionEls } = this.getByValues(this.value);
            if (validValues) {
                this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls });
                this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
            }
        }
        // Initial settings for list container element
        this.listContainerEl.style.opacity = ".2";
        this.listContainerEl.style.transform = "scaleY(0)";
        this.positionListContainerEl();
        this.componentDidLoadComplete = true;
    }
    componentDidUpdate() {
        // Here, it's certain that all child elements were handled
        this.store.dispatch({ type: "COMMIT_OPTION_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_OPTGROUP_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    getInitialState() {
        const initialSelection = [];
        const initialOptionEls = [];
        const initialOptgroupEls = [];
        return {
            selection: initialSelection,
            selectionBatch: initialSelection,
            selectionSorted: initialSelection,
            multiple: false,
            direction: "bottom",
            select: () => null,
            animationDuration: this.animated ? 200 : 0,
            optionEls: initialOptionEls,
            optionElsBatch: initialOptionEls,
            optionElsSorted: initialOptionEls,
            optgroupEls: initialOptgroupEls,
            optgroupElsBatch: initialOptgroupEls,
            filter: "",
            filterFunction: () => true
        };
    }
    // Resets the whole filter system
    resetFilter() {
        if (this.isFilterable()) {
            this.resetFilterInputEl();
            this.clearFilter();
        }
    }
    // Parses and injects the "filter-function" prop into the store
    setFilterFunction() {
        this.store.dispatch({
            type: "SET_FILTER_FUNCTION",
            filterFunction: this.optionElMatchesFilter.bind(this)
        });
    }
    // Write the current selection into the filter input field
    resetFilterInputEl() {
        this.filterInputElValue = this.getFormattedSelection();
    }
    // Clears the filter
    clearFilter() {
        this.store.dispatch({ type: "SET_FILTER", filter: "" });
    }
    /**
     * Set dimensions of list container element.
     */
    positionListContainerEl() {
        if (!(this.componentEl && this.wrapperEl && this.listContainerEl)) {
            return;
        }
        // Height calculation
        this.listContainerEl.style.maxHeight = this.getMaxHeight() || "none";
        const wrapperElRect = this.wrapperEl.getBoundingClientRect();
        const listContainerElHeight = this.listContainerEl.clientHeight;
        const spaceTowardsTop = wrapperElRect.top - Select.minSpaceToWindow;
        const spaceTowardsBottom = innerHeight - wrapperElRect.bottom - Select.minSpaceToWindow;
        let maxHeight = this.listContainerEl.style.maxHeight;
        if (spaceTowardsBottom >= listContainerElHeight) { // enough space towards bottom
            this.direction = "bottom";
        }
        else if (spaceTowardsTop >= listContainerElHeight) { // enough space towards top
            this.direction = "top";
        }
        else if (spaceTowardsTop > spaceTowardsBottom) { // not enough space, take top if larger
            maxHeight = `${spaceTowardsTop}px`;
            this.direction = "top";
        }
        else { // not enough space anywhere, fall back to bottom
            maxHeight = `${spaceTowardsBottom}px`;
            this.direction = "bottom";
        }
        this.listContainerEl.style.maxHeight = maxHeight;
        if (this.direction === "bottom") {
            this.listContainerEl.style.bottom = "auto"; // "Reset" if opened towards "top" before
        }
        else {
            this.listContainerEl.style.bottom = `${this.wrapperEl.clientHeight}px`;
        }
        this.listContainerEl.style.transformOrigin = (this.direction === "top") ? "0 100%" : "50% 0";
        // Propagate newly calculated direction
        this.store.dispatch({
            type: "SET_DIRECTION",
            direction: this.direction
        });
    }
    // If no "filter-function" is present, fall back to this
    defaultFilterFunction(optionEl, keyword) {
        const textContent = optionEl.textContent;
        if (!textContent) {
            return false;
        }
        return textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    }
    /**
     * Returns true if an option element matches the filter (e.g. in "ca" in "Car").
     * @param el The option to be tested.
     * @param keyword The Filter to be tested.
     */
    optionElMatchesFilter(el, keyword) {
        let filterFunction = this.defaultFilterFunction;
        // If a "filter-function" prop has been passed, use this instead
        if (this.filterFunction) {
            filterFunction = parseFunction(this.filterFunction);
        }
        let match = filterFunction(el, keyword);
        // When "autocomplete", all options should be hidden when there's no keyword,
        // while when in "filter", all options should be shown when there's no keyword
        if (this.isAutocomplete() && !keyword) {
            match = false;
        }
        // In "autocomplete", display only a certain number of option elements (UX)
        if (this.isAutocomplete()) {
            const allOptionEls = this.el.querySelectorAll("sdx-select-option");
            let visibleOptionElsCount = 0;
            for (let i = 0; i < allOptionEls.length; i++) {
                const optionEl = allOptionEls[i];
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
    }
    // Checks whether the keyword fulfills the requirements of being a filter.
    isValidFilter(keyword) {
        return (keyword.length >= 2 &&
            keyword !== this.getFormattedSelection() // Ignore selection as filter
        );
    }
    // Checks whether the current keyword fulfills the requirements of being an autocomplete filter.
    isValidAutocomplete(keyword) {
        return keyword.length >= 3;
    }
    setFocussedEl(which) {
        // First, unfocus all
        for (let i = 0; i < this.optionElsSorted.length; i++) {
            const optionEl = this.optionElsSorted[i];
            optionEl.classList.remove("focus");
        }
        // If no element is to be selected, clear and abort
        if (which === null) {
            delete this.focussedEl;
            return;
        }
        if (which === "previous" || which === "next") {
            const lastSelectedOptionEl = this.selectionSorted[this.selectionSorted.length - 1];
            // If there's no currently focussed element, start from the last selected element
            let focussedEl = this.focussedEl || lastSelectedOptionEl;
            if (which === "previous") {
                let previousElement = getPreviousFromList(this.optionElsSorted, focussedEl);
                let count = 0;
                while (previousElement !== focussedEl && (previousElement.disabled || previousElement.style.display === "none") && (count < this.optionElsSorted.length)) {
                    previousElement = getPreviousFromList(this.optionElsSorted, previousElement);
                    count++;
                }
                this.focussedEl = previousElement;
            }
            else { // "next"
                let nextElement = getNextFromList(this.optionElsSorted, focussedEl);
                let count = 0;
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
    }
    /**
     * Scrolls the list the way that an option is visible in the center.
     */
    scrollToOption(option) {
        const parent = this.listContainerEl;
        const optionRect = option.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const isFullyVisible = optionRect.top >= parentRect.top && optionRect.bottom <= parentRect.top + parent.clientHeight;
        if (!isFullyVisible) {
            parent.scrollTop = optionRect.top + parent.scrollTop - parentRect.top;
        }
    }
    /**
     * Returns all options starting with a certain letter.
     * @param letter Key value to look for.
     */
    getOptionsByFirstLetter(letter) {
        const results = [];
        for (let i = 0; i < this.optionElsSorted.length; i++) {
            const option = this.optionElsSorted[i];
            if (option.textContent && option.textContent.toLowerCase().charAt(0) === letter) {
                results.push(option);
            }
        }
        return results;
    }
    /**
     * Sets the focussed option starting by a given letter.
     * @param letter Key value to look for.
     */
    setFocussedElByFirstLetter(letter) {
        const optionsByFirstLetter = this.getOptionsByFirstLetter(letter);
        if (optionsByFirstLetter.length) {
            let startIndex = 0;
            if (this.focussedEl) {
                const focussedElIndex = optionsByFirstLetter.indexOf(this.focussedEl);
                if (focussedElIndex > -1) {
                    startIndex = focussedElIndex;
                }
            }
            let option = optionsByFirstLetter[startIndex];
            if (option.disabled || option === this.focussedEl) {
                for (let i = 0; i < optionsByFirstLetter.length; i++) {
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
    }
    /**
     * Checks if a given element is part of the sdx-select or the sdx-select itself.
     * Warning: this only works if the sdx-select isn't inside of a shadow-root!
     * @param el Element to check.
     */
    isSelectEl(el) {
        return !!closest(el, this.el);
    }
    /**
     * Determines whether the placeholder option should be rendered:
     *  - when no selection is in progress (user experience: list should not rerender while open),
     *  - when something is selected,
     *  - the placeholder prop exists
     *  - and when single select
     */
    showPlaceholder() {
        const showPlaceholder = !!this.selectionSorted.length && !!this.placeholder && !this.multiple && !this.required;
        if (this.placeholderWhenOpened !== null) {
            return this.placeholderWhenOpened;
        }
        return showPlaceholder;
    }
    /**
     * Get the text that will be displayed in the selection header.
     * Fall back to an empty string if there's no selection.
     */
    getFormattedSelection() {
        return this.selectionSorted.length
            ? this.selectionSorted.map((optionEl) => {
                const text = optionEl.textContent;
                return text ? text.trim() : "";
            }).join(", ")
            : "";
    }
    setInvokeSelectCallback() {
        this.invokeSelectCallback = parseFunction(this.selectCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    }
    setInvokeFocusCallback() {
        this.invokeFocusCallback = parseFunction(this.focusCallback);
    }
    setInvokeBlurCallback() {
        this.invokeBlurCallback = parseFunction(this.blurCallback);
    }
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all options matching the values will also be returned.
     */
    getByValues(values) {
        if (Array.isArray(values)) {
            if (!values.length) {
                // Nothing to do, don't replace [] with [] because of change detection
                return { validValues: true, validatedValues: values, optionEls: [] };
            }
            // Filter out undefined values
            const definedValues = values.filter((value) => value !== undefined);
            if (!definedValues.length) {
                // Either only undefined values or completely empty
                return { validValues: false, validatedValues: [], optionEls: [] };
            }
            const validatedValues = [];
            const optionEls = [];
            let isValid = true;
            // Check if values exist in the options
            for (let i = 0; i < definedValues.length; i++) {
                const value = definedValues[i];
                const foundOptionEl = this.optionElsSorted.find((el) => el.value === value);
                if (foundOptionEl) {
                    if (this.multiple || (!this.multiple && i === 0)) {
                        optionEls.push(foundOptionEl);
                        validatedValues.push(foundOptionEl.value);
                    }
                    else {
                        // Single select should only respect one value
                        isValid = false;
                    }
                }
            }
            if (validatedValues.length === 0) { // no values found
                return { validValues: false, validatedValues, optionEls };
            }
            return { validValues: isValid, validatedValues, optionEls };
        }
        // All non-array types will be reset (to an empty array)
        return { validValues: false, validatedValues: [], optionEls: [] };
    }
    onHeaderClick(e) {
        const targetEl = e.target;
        const didClickOnSdxInputEl = !!closest(targetEl, this.filterInputEl);
        if (this.isFilterable() && this.isOpenOrOpening() && didClickOnSdxInputEl && !this.hadFilterInputElFocus) ;
        else {
            this.toggle();
        }
        this.hadFilterInputElFocus = this.hasFilterInputElFocus;
    }
    onFilterInputElFocus() {
        this.hasFilterInputElFocus = true;
        this.invokeFocusCallback();
    }
    onFilterInputElBlur() {
        this.hasFilterInputElFocus = false;
        this.invokeBlurCallback();
    }
    onFilterInputElChange(value) {
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
    }
    onFilterInputElInput(value) {
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
    }
    /**
     * Marks an option for selection (but does not commit yet - this happens in this.componentDidUpdate()).
     * @param option Instance of SelectOption to be selected.
     * @param strategy How to handle the selection (e.g. add or remove).
     * @param didClick If invoked by the user
     */
    select(option, strategy, didClick = false) {
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
                strategy
            });
        }
        // After single select:
        // Auto close (with a little delay for the user to see what was selected)
        if (!this.multiple) {
            if (!this.isAutocomplete()) {
                this.resetFilterInputEl();
            }
            setTimeout(() => {
                let close = Promise.resolve();
                if (didClick) {
                    close = this.close();
                }
                close.then(() => {
                    if (!this.isAutocomplete()) {
                        this.clearFilter();
                    }
                });
            }, this.animationDuration);
        }
    }
    updateHiddenFormInputEl() {
        if (this.value && this.name) {
            // Remove old hidden input elements
            this.lightDOMHiddenFormInputEls.forEach((lightDOMHiddenFormInputEl) => {
                this.el.removeChild(lightDOMHiddenFormInputEl);
            });
            this.lightDOMHiddenFormInputEls = [];
            // Create new hidden input elements
            for (let i = 0; i < this.value.length; i++) {
                const value = this.value[i];
                const lightDOMHiddenFormInputEl = document.createElement("input");
                lightDOMHiddenFormInputEl.type = "hidden";
                lightDOMHiddenFormInputEl.name = this.name;
                lightDOMHiddenFormInputEl.value = value;
                this.lightDOMHiddenFormInputEls.push(lightDOMHiddenFormInputEl);
                this.el.appendChild(lightDOMHiddenFormInputEl);
            }
        }
    }
    /**
     * True if this sdx-select is filterable using a filter input field.
     */
    isFilterable() {
        return this.isKeyboardBehavior("filter") || this.isKeyboardBehavior("autocomplete");
    }
    /**
     * Checks which "keyboard-behavior" prop is set, including backwards
     * compatibility with the deprecated "filterable" prop.
     * @param keyboardBehavior Behavior to test.
     */
    isKeyboardBehavior(keyboardBehavior) {
        const isMatch = keyboardBehavior === this.keyboardBehavior;
        if (keyboardBehavior === "filter" && (isMatch || this.filterable)) {
            return true;
        }
        return isMatch;
    }
    // Returns how many options are visible
    getMatchingOptionElsCount() {
        const optionEls = this.el.querySelectorAll("sdx-select-option");
        let count = 0;
        for (let i = 0; i < optionEls.length; i++) {
            if (optionEls[i].style.display !== "none") {
                count++;
            }
        }
        return count;
    }
    isAutocomplete() {
        return this.keyboardBehavior === "autocomplete";
    }
    hasVisibleOptionEls() {
        return this.optionElsSorted.some((optioneEl) => optioneEl.style.display !== "none");
    }
    isOpenOrOpening() {
        return this.display === "open" || this.display === "opening";
    }
    isClosedOrClosing() {
        return this.display === "closed" || this.display === "closing";
    }
    /**
     * Normalizes max-height prop, e.g.:
     * 200 => "200px"
     * "50vh" => "50vh"
     */
    getMaxHeight() {
        // No max-height prop given
        if (!this.maxHeight) {
            return undefined;
        }
        // If number, add "px"
        if (Number(this.maxHeight)) {
            return `${this.maxHeight}px`;
        }
        // Unit is already given
        return String(this.maxHeight); // TS bug? String() shouldn't be needed because of above Number()
    }
    getDefaultInputFieldProps() {
        return {
            disabled: this.disabled,
            valid: this.valid,
            srHint: `${this.label} ${this.srHint} ${this.validationMessage}`,
            required: this.required
        };
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.backgroundTheme]: true,
            [this.display]: true,
            [this.direction]: true,
            disabled: this.disabled,
            loading: this.loading,
            filterable: this.isFilterable(),
            autocomplete: this.isAutocomplete(),
            focus: this.focussed,
            invalid: this.valid === false
        };
    }
    getInputStyle() {
        const notClosed = this.display !== "closed";
        const openTowardsTop = this.direction === "top";
        const openTowardsBottom = this.direction === "bottom";
        return {
            paddingRight: this.isAutocomplete() ? "" : "48px",
            borderTopLeftRadius: notClosed && openTowardsTop ? "0" : "",
            borderTopRightRadius: notClosed && openTowardsTop ? "0" : "",
            borderBottomLeftRadius: notClosed && openTowardsBottom ? "0" : "",
            borderBottomRightRadius: notClosed && openTowardsBottom ? "0" : ""
        };
    }
    render() {
        return (h(Host, { "aria-expanded": (this.display === "open").toString() }, h("div", { class: this.getComponentClassNames(), ref: (el) => this.componentEl = el }, this.label && h("label", { class: "label", onClick: () => this.toggle() }, this.label, " ", this.required && h("span", { "aria-hidden": "true" }, "*")), h("div", { class: "wrapper", ref: (el) => this.wrapperEl = el }, h("div", { class: "header-wrapper" }, h("div", { class: "header", onClick: (e) => this.onHeaderClick(e) }, h("div", { class: "selection" }, this.isFilterable()
            ? (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.filterInputElValue, ref: (el) => this.filterInputEl = el, changeCallback: (value) => this.onFilterInputElChange(value), inputCallback: (value) => this.onFilterInputElInput(value), focusCallback: () => this.onFilterInputElFocus(), blurCallback: () => this.onFilterInputElBlur(), autocomplete: "off", placeholder: this.placeholder, selectTextOnFocus: this.isKeyboardBehavior("filter"), inputStyle: this.getInputStyle() })))
            : (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.getFormattedSelection() || this.placeholder, editable: false, inputStyle: Object.assign(Object.assign({}, this.getInputStyle()), { color: this.isOpenOrOpening() ? "#1781e3" : "" // $color-int-blue
                }) })))), (!this.isAutocomplete() || this.loading) &&
            h("div", { class: "thumb" }, this.loading
                ? h("sdx-loading-spinner", null)
                : h("div", { class: "icon" })))), h("div", { class: "list-container", ref: (el) => this.listContainerEl = el, tabIndex: -1 }, h("div", { class: "list" }, this.showPlaceholder() &&
            h("sdx-select-option", { placeholder: true }, this.placeholder), h("div", { class: "slot" }, h("slot", null)), this.isValidFilter(this.filter) && this.getMatchingOptionElsCount() === 0 &&
            h("div", { class: "no-matches-found" }, this.noMatchesFoundLabel)))), this.validationMessage &&
            h("sdx-validation-message", { validationMessage: this.validationMessage }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
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
    }; }
};
Select.maxAutocompleteOptionsMobile = 5;
Select.maxAutocompleteOptionsDesktop = 10;
Select.minSpaceToWindow = 24; // $baseline-3
Select.style = selectCss;

export { Select as sdx_select };
