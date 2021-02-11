import { r as registerInstance, f as forceUpdate, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { i as isDesktopOrLarger } from './breakpoint-helpers-27552a59.js';

const searchCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.wrapper{position:relative}.wrapper .search-button,.wrapper .clear-button{position:absolute;top:0}.wrapper .search-button{right:0;padding:7px}.wrapper .clear-button{right:40px;padding:11px 16px}";

const Search = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.invokeSearchSubmitCallback = parseFunction(this.searchSubmitCallback);
    }
    setInvokeValueChangeCallback() {
        this.invokeValueChangeCallback = parseFunction(this.valueChangeCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    }
    isClearIconHidden() {
        return isDesktopOrLarger() || !this.value.length;
    }
    clear() {
        this.value = "";
    }
    render() {
        return (h("div", { class: "wrapper" }, h("sdx-input", { value: this.value, srHint: this.srHint, type: "search", placeholder: this.placeholder, hitEnterCallback: () => this.submitSearch(), inputCallback: (value) => this.value = value, ref: (el) => this.sdxInputEl = el, role: "search", inputStyle: {
                paddingRight: this.isClearIconHidden()
                    ? "48px" /* $baseline-6 (space for search icon) */
                    : "88px" /* $baseline-11 (space for search icon AND clear icon) */
            } }), h("div", { class: "search-button" }, h("sdx-button", { theme: "transparent", onClick: () => this.submitSearch(), srHint: this.srHintForButton, iconName: "icon-search", iconSize: 3 })), h("div", { class: "clear-button" }, h("sdx-animation", { animationName: this.isClearIconHidden() ? "scale-out" : "scale-in" }, h("sdx-button", { theme: "transparent", onClick: () => this.clear(), iconName: "icon-close", "aria-hidden": "true" })))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["valueChanged"],
        "searchSubmitCallback": ["searchSubmitCallbackChanged"],
        "changeCallback": ["changeCallbackChanged"],
        "valueChangeCallback": ["valueChangeCallbackChanged"]
    }; }
};
Search.style = searchCss;

export { Search as sdx_search };
