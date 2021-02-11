'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');

const showMoreCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host>div{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host>div .count{margin-right:24px}@media (max-width: 1279px){:host>div{-ms-flex-flow:column;flex-flow:column}:host>div .count{margin-bottom:8px;margin-right:0}}";

const ShowMore = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.start = 1;
        this.invokeIncrementCallback = () => null;
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
    totalItemsChanged() {
        this.reset();
    }
    incrementCallbackChanged() {
        this.setInvokeIncrementCallback();
    }
    componentWillLoad() {
        this.setInvokeIncrementCallback();
        this.reset();
    }
    reset() {
        this.currentlyDisplayedItems = this.initialItems || this.incrementBy;
    }
    showMore() {
        const deltaToMax = this.totalItems - this.currentlyDisplayedItems;
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
    }
    setInvokeIncrementCallback() {
        this.invokeIncrementCallback = webcomponentHelpers.parseFunction(this.incrementCallback);
    }
    render() {
        return (index.h("div", null, index.h("span", { class: "count" }, this.start, " \u2013 ", this.currentlyDisplayedItems, " ", this.fromLabel, " ", this.totalItems), index.h("sdx-button", { label: this.moreLabel, onClick: () => this.showMore(), theme: this.buttonTheme })));
    }
    static get watchers() { return {
        "totalItems": ["totalItemsChanged"],
        "incrementCallback": ["incrementCallbackChanged"]
    }; }
};
ShowMore.style = showMoreCss;

exports.sdx_show_more = ShowMore;
