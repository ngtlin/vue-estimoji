import { r as registerInstance, h } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
var showMoreCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host>div{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host>div .count{margin-right:24px}@media (max-width: 1279px){:host>div{-ms-flex-flow:column;flex-flow:column}:host>div .count{margin-bottom:8px;margin-right:0}}";
var ShowMore = /** @class */ (function () {
    function ShowMore(hostRef) {
        registerInstance(this, hostRef);
        this.start = 1;
        this.invokeIncrementCallback = function () { return null; };
        /**
         * How many items are currently shown (counter).
         */
        this.currentlyDisplayedItems = 0;
        /**
         * How many items to add by each turn.
         */
        this.incrementBy = 10;
        /**
         * Number of items to start from.
         */
        this.initialItems = 0;
        /**
         * Number of all items in total.
         */
        this.totalItems = 0;
        /**
         * Label for "from".
         */
        this.fromLabel = "from";
        /**
         * Label for "more".
         */
        this.moreLabel = "Show more";
        /**
         * Button theme.
         */
        this.buttonTheme = "primary";
    }
    ShowMore.prototype.totalItemsChanged = function () {
        this.reset();
    };
    ShowMore.prototype.incrementCallbackChanged = function () {
        this.setInvokeIncrementCallback();
    };
    ShowMore.prototype.componentWillLoad = function () {
        this.setInvokeIncrementCallback();
        this.reset();
    };
    ShowMore.prototype.reset = function () {
        this.currentlyDisplayedItems = this.initialItems || this.incrementBy;
    };
    ShowMore.prototype.showMore = function () {
        var deltaToMax = this.totalItems - this.currentlyDisplayedItems;
        // Reached total items
        if (deltaToMax <= 0) {
            return;
        }
        if (deltaToMax > this.incrementBy) {
            this.currentlyDisplayedItems += this.incrementBy;
        }
        else {
            this.currentlyDisplayedItems += deltaToMax;
        }
        this.invokeIncrementCallback(this.currentlyDisplayedItems);
    };
    ShowMore.prototype.setInvokeIncrementCallback = function () {
        this.invokeIncrementCallback = parseFunction(this.incrementCallback);
    };
    ShowMore.prototype.render = function () {
        var _this = this;
        return (h("div", null, h("span", { class: "count" }, this.start, " \u2013 ", this.currentlyDisplayedItems, " ", this.fromLabel, " ", this.totalItems), h("sdx-button", { label: this.moreLabel, onClick: function () { return _this.showMore(); }, theme: this.buttonTheme })));
    };
    Object.defineProperty(ShowMore, "watchers", {
        get: function () {
            return {
                "totalItems": ["totalItemsChanged"],
                "incrementCallback": ["incrementCallbackChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return ShowMore;
}());
ShowMore.style = showMoreCss;
export { ShowMore as sdx_show_more };
