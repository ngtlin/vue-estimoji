'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const breakpointHelpers = require('./breakpoint-helpers-9a01926c.js');

const searchCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.wrapper{position:relative}.wrapper .search-button,.wrapper .clear-button{position:absolute;top:0}.wrapper .search-button{right:0;padding:7px}.wrapper .clear-button{right:40px;padding:11px 16px}";

const Search = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            index.forceUpdate(this.el);
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
        this.invokeSearchSubmitCallback = webcomponentHelpers.parseFunction(this.searchSubmitCallback);
    }
    setInvokeValueChangeCallback() {
        this.invokeValueChangeCallback = webcomponentHelpers.parseFunction(this.valueChangeCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = webcomponentHelpers.parseFunction(this.changeCallback);
    }
    isClearIconHidden() {
        return breakpointHelpers.isDesktopOrLarger() || !this.value.length;
    }
    clear() {
        this.value = "";
    }
    render() {
        return (index.h("div", { class: "wrapper" }, index.h("sdx-input", { value: this.value, srHint: this.srHint, type: "search", placeholder: this.placeholder, hitEnterCallback: () => this.submitSearch(), inputCallback: (value) => this.value = value, ref: (el) => this.sdxInputEl = el, role: "search", inputStyle: {
                paddingRight: this.isClearIconHidden()
                    ? "48px" /* $baseline-6 (space for search icon) */
                    : "88px" /* $baseline-11 (space for search icon AND clear icon) */
            } }), index.h("div", { class: "search-button" }, index.h("sdx-button", { theme: "transparent", onClick: () => this.submitSearch(), srHint: this.srHintForButton, iconName: "icon-search", iconSize: 3 })), index.h("div", { class: "clear-button" }, index.h("sdx-animation", { animationName: this.isClearIconHidden() ? "scale-out" : "scale-in" }, index.h("sdx-button", { theme: "transparent", onClick: () => this.clear(), iconName: "icon-close", "aria-hidden": "true" })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueChanged"],
        "searchSubmitCallback": ["searchSubmitCallbackChanged"],
        "changeCallback": ["changeCallbackChanged"],
        "valueChangeCallback": ["valueChangeCallbackChanged"]
    }; }
};
Search.style = searchCss;

exports.sdx_search = Search;
