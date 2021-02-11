import { r as registerInstance, f as forceUpdate, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { i as isDesktopOrLarger } from './breakpoint-helpers-27552a59.js';
var searchCss = "@charset \"UTF-8\";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.wrapper{position:relative}.wrapper .search-button,.wrapper .clear-button{position:absolute;top:0}.wrapper .search-button{right:0;padding:7px}.wrapper .clear-button{right:40px;padding:11px 16px}";
var Search = /** @class */ (function () {
    function Search(hostRef) {
        registerInstance(this, hostRef);
        this.invokeSearchSubmitCallback = function () { return null; };
        this.invokeValueChangeCallback = function () { return null; };
        this.invokeChangeCallback = function () { return null; };
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
    Search.prototype.valueChanged = function () {
        this.invokeAllChangeCallbacks();
    };
    Search.prototype.searchSubmitCallbackChanged = function () {
        this.setInvokeSearchSubmitCallback();
    };
    Search.prototype.changeCallbackChanged = function () {
        this.setInvokeChangeCallback();
    };
    Search.prototype.valueChangeCallbackChanged = function () {
        this.setInvokeValueChangeCallback();
    };
    Search.prototype.onWindowResizeThrottled = function () {
        var _this = this;
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(function () {
            forceUpdate(_this.el);
        }, 10);
    };
    Search.prototype.componentWillLoad = function () {
        this.setInvokeSearchSubmitCallback();
        this.setInvokeChangeCallback();
        this.setInvokeValueChangeCallback();
    };
    Search.prototype.submitSearch = function () {
        if (this.sdxInputEl) {
            this.invokeSearchSubmitCallback(this.sdxInputEl.value);
        }
    };
    Search.prototype.invokeAllChangeCallbacks = function () {
        this.invokeChangeCallback(this.value);
        this.invokeValueChangeCallback(this.value);
    };
    Search.prototype.setInvokeSearchSubmitCallback = function () {
        this.invokeSearchSubmitCallback = parseFunction(this.searchSubmitCallback);
    };
    Search.prototype.setInvokeValueChangeCallback = function () {
        this.invokeValueChangeCallback = parseFunction(this.valueChangeCallback);
    };
    Search.prototype.setInvokeChangeCallback = function () {
        this.invokeChangeCallback = parseFunction(this.changeCallback);
    };
    Search.prototype.isClearIconHidden = function () {
        return isDesktopOrLarger() || !this.value.length;
    };
    Search.prototype.clear = function () {
        this.value = "";
    };
    Search.prototype.render = function () {
        var _this = this;
        return (h("div", { class: "wrapper" }, h("sdx-input", { value: this.value, srHint: this.srHint, type: "search", placeholder: this.placeholder, hitEnterCallback: function () { return _this.submitSearch(); }, inputCallback: function (value) { return _this.value = value; }, ref: function (el) { return _this.sdxInputEl = el; }, role: "search", inputStyle: {
                paddingRight: this.isClearIconHidden()
                    ? "48px" /* $baseline-6 (space for search icon) */
                    : "88px" /* $baseline-11 (space for search icon AND clear icon) */
            } }), h("div", { class: "search-button" }, h("sdx-button", { theme: "transparent", onClick: function () { return _this.submitSearch(); }, srHint: this.srHintForButton, iconName: "icon-search", iconSize: 3 })), h("div", { class: "clear-button" }, h("sdx-animation", { animationName: this.isClearIconHidden() ? "scale-out" : "scale-in" }, h("sdx-button", { theme: "transparent", onClick: function () { return _this.clear(); }, iconName: "icon-close", "aria-hidden": "true" })))));
    };
    Object.defineProperty(Search.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Search, "watchers", {
        get: function () {
            return {
                "value": ["valueChanged"],
                "searchSubmitCallback": ["searchSubmitCallbackChanged"],
                "changeCallback": ["changeCallbackChanged"],
                "valueChangeCallback": ["valueChangeCallbackChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return Search;
}());
Search.style = searchCss;
export { Search as sdx_search };
