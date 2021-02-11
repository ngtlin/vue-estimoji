'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');
const anime_es = require('./anime.es-517c0b36.js');

const accordionCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}.component{border:1px solid #d6d6d6}";

const Accordion = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.openedItems = [];
        /**
         * Position of the arrow in the header.
         */
        this.arrowPosition = "right";
        /**
         * Allow to keep multiple accordion items opened.
         */
        this.keepOpen = false;
        /**
         * @private
         */
        this.componentStyle = {};
    }
    arrowPropertyChanged() {
        this.initiateComponent();
    }
    componentWillLoad() {
        this.initiateComponent();
    }
    componentDidLoad() {
        webcomponentHelpers.installSlotObserver(this.el, () => this.onSlotChange()); // Listen to children changes
    }
    /**
     * Fired by the MutationObserver whenever children change.
     */
    onSlotChange() {
        this.initiateComponent();
    }
    /**
     * Closes the accordion item.
     * @param index Index of the accordion item.
     */
    async close(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            itemEl.setAttribute("open", "false");
            this.trackOpenItems(index, "false");
        }
    }
    /**
     * Closes all accordion items.
     */
    async closeAll() {
        this.openedItems = [];
        for (let i = 0; i < this.accordionItemEls.length; i++) {
            let itemEl = this.accordionItemEls[i];
            const headerEl = itemEl.querySelector("sdx-accordion-item-header");
            if (headerEl) {
                itemEl.setAttribute("open", "false");
                this.trackOpenItems(i, "false");
            }
        }
    }
    /**
     * Toggle display of the accordion item.
     * @param index Index of the accordion item.
     */
    async toggle(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            const itemFound = itemEl.getAttribute("open") || "false";
            const isOpen = itemFound === "false" ? "true" : "false";
            itemEl.setAttribute("open", isOpen);
            this.trackOpenItems(index, isOpen);
        }
    }
    /**
     * Opens the accordion item.
     * @param index Index of the accordion item.
     */
    async open(index) {
        let itemEl = this.accordionItemEls[index];
        if (!this.keepOpen) {
            this.closeNotIgnoredItems(index);
        }
        const headerEl = itemEl.querySelector("sdx-accordion-item-header");
        if (headerEl) {
            itemEl.setAttribute("open", "true");
            this.trackOpenItems(index, "true");
        }
    }
    /**
     * Opens all accordion items.
     */
    async openAll() {
        if (this.keepOpen || this.accordionItemEls.length === 1) {
            this.openedItems = [];
            for (let i = 0; i < this.accordionItemEls.length; i++) {
                let itemEl = this.accordionItemEls[i];
                const headerEl = itemEl.querySelector("sdx-accordion-item-header");
                if (headerEl) {
                    itemEl.setAttribute("open", "true");
                    this.trackOpenItems(i, "true");
                }
            }
        }
    }
    initiateComponent() {
        this.setChildElementsReferences();
        this.initiateAccordionItems();
    }
    /**
     * Sets child reference and add to every header a toggle function.
     */
    setChildElementsReferences() {
        this.accordionItemEls = this.el.querySelectorAll("sdx-accordion-item");
    }
    /**
     * Modify items with initial settings.
     */
    initiateAccordionItems() {
        this.openedItems = [];
        for (let i = 0; i < this.accordionItemEls.length; ++i) {
            const itemEl = this.accordionItemEls[i];
            const headerEl = itemEl.querySelector("sdx-accordion-item-header");
            if (headerEl) {
                let isOpen = "false";
                if (itemEl.hasAttribute("open") && itemEl.getAttribute("open") !== "false") {
                    isOpen = "true";
                }
                itemEl.setAttribute("open", isOpen);
                itemEl.setAttribute("arrow-position", this.arrowPosition);
                headerEl.setAttribute("arrow-position", this.arrowPosition);
                const bodyEl = itemEl.querySelector("sdx-accordion-item-body");
                if (bodyEl) {
                    bodyEl.setAttribute("arrow-position", this.arrowPosition);
                }
                this.trackOpenItems(i, isOpen);
                headerEl.toggle = this.toggle.bind(this, i);
            }
        }
    }
    /**
     * Closes all items when keepOpen is false, to ensure only 1 accordion item is opened max.
     * @param ignoreIndex Index for which the closing of item will be ignored.
     */
    closeNotIgnoredItems(ignoreIndex) {
        for (let i = 0; i < this.openedItems.length; i++) {
            if (this.openedItems[i] !== ignoreIndex) {
                const itemEl = this.accordionItemEls[this.openedItems[i]];
                itemEl.setAttribute("open", "false");
            }
        }
        this.openedItems = [];
    }
    /**
     * Track which item is opened in case keepOpen is set to true.
     * @param index Index of the opened item.
     * @param isOpen Open state of the item.
     */
    trackOpenItems(index, isOpen) {
        if (!this.keepOpen && isOpen === "true") {
            this.openedItems.push(index);
        }
    }
    render() {
        return (index.h("div", { class: "component", style: this.componentStyle }, index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "arrowPosition": ["arrowPropertyChanged"],
        "keepOpen": ["arrowPropertyChanged"]
    }; }
};
Accordion.style = accordionCss;

const accordionItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host p{padding:13px 13px 14px 19px}:host([arrow-position=center]){padding:0}:host(:not(:last-of-type)) .component{border-bottom:1px solid #d6d6d6}.component{position:relative}";

const AccordionItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * If the accordion item is initially open.
         */
        this.open = false;
    }
    activeItemChanged() {
        this.decideCollapseHeaderDisplay();
        this.decideCollapseBodyDisplay();
    }
    componentWillLoad() {
        this.setChildElementsReferences();
        this.decideCollapseHeaderDisplay();
    }
    componentDidLoad() {
        this.decideCollapseBodyDisplay();
    }
    /**
     * Assign element references to used properties.
     */
    setChildElementsReferences() {
        this.itemHeaderEl = this.el.querySelector("sdx-accordion-item-header");
        this.itemBodyEl = this.el.querySelector("sdx-accordion-item-body");
    }
    /**
     * Decides based on open property the display of header and its and behaviour.
     */
    decideCollapseHeaderDisplay() {
        if (this.itemHeaderEl) {
            this.itemHeaderEl.setAttribute("expand", this.open.toString());
        }
    }
    /**
     * Decides based on open property the display of body.
     */
    decideCollapseBodyDisplay() {
        if (this.itemBodyEl) {
            this.itemBodyEl.toggle(this.open);
        }
    }
    render() {
        return (index.h("div", { class: "component" }, index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["activeItemChanged"]
    }; }
};
AccordionItem.style = accordionItemCss;

const accordionItemBodyCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{overflow:hidden;display:block}:host(:not(.open)){display:none;opacity:0}:host([arrow-position=left]) .component{margin-left:24px}.component{margin:0 13px 14px 19px}";

const AccordionItemBody = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.initialLoad = true;
        this.animationDuration = 300;
        /**
         * @private
         */
        this.arrowPosition = "right";
        /**
         * @private
         */
        this.componentStyle = {};
    }
    /**
     * Toggles body directly when initial load or with an animation.
     * @param isOpen Open state of the accordion item.
     */
    async toggle(isOpen) {
        if (this.initialLoad) {
            this.initiateOpenState(isOpen);
        }
        else if (isOpen) {
            this.openCollapseSection();
        }
        else {
            this.closeCollapseSection();
        }
    }
    /**
     * Sets class to handle immediately the open/close state.
     * @param newState Open State of the accordion item.
     */
    initiateOpenState(newState) {
        if (newState) {
            this.el.classList.add("open");
        }
        this.initialLoad = false;
    }
    /**
     * Opens section with an animation.
     */
    openCollapseSection() {
        this.el.style.display = "block";
        this.el.style.height = "0px";
        anime_es.anime({
            targets: this.el,
            duration: this.animationDuration,
            height: this.el.scrollHeight,
            opacity: 1,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: () => {
                this.el.setAttribute("aria-expanded", "true");
                this.el.classList.add("open");
                this.el.style.height = "auto"; // allow to grow or shrink with content
            }
        });
    }
    /**
     * Closes section with an animation.
     */
    closeCollapseSection() {
        // Can't animate "auto", therefore update to current height
        this.el.style.height = `${this.el.scrollHeight}px`;
        anime_es.anime({
            targets: this.el,
            duration: this.animationDuration,
            height: 0,
            opacity: 0,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: () => {
                this.el.setAttribute("aria-expanded", "false");
                this.el.classList.remove("open");
            }
        });
    }
    render() {
        return (index.h("div", { class: "component", style: this.componentStyle }, index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
};
AccordionItemBody.style = accordionItemBodyCss;

const accordionItemHeaderCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host .header{width:100%}:host .content{color:#333;display:block;margin:0;padding:13px 13px 14px 19px;border:0;width:100%;cursor:pointer;outline:none}:host button{font-family:inherit;margin:0;background:transparent;text-align:left}:host([arrow-position=left]) .header{padding-left:8px}:host([arrow-position=left]) .header,:host([arrow-position=right]) .header{width:calc(100% - 35px);margin:0px;display:inline-block;position:relative}:host([arrow-position=center]) .header{display:none}:host([arrow-position=center]) .content{width:100%;min-height:32px;border-top:1px solid #d6d6d6}";

const AccordionItemHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @private
         */
        this.arrowPosition = "right";
        /**
         * @private
         */
        this.expand = false;
        /**
         * @private
         */
        this.buttonStyle = {};
        /**
         * Triggers toggle information in accordion
         */
        this.toggle = () => "";
    }
    arrowPositionChanged() {
        this.setArrowPosition();
    }
    activeItemChanged() {
        this.setArrowDirection();
    }
    componentDidLoad() {
        this.setChildElementsReferences();
        this.setArrowPosition();
        this.setArrowDirection();
    }
    onClick() {
        this.toggle();
    }
    onMouseOver() {
        this.setArrowHover("true");
    }
    onMouseOut() {
        this.setArrowHover("false");
    }
    /**
     * Closes this accordion item.
     */
    async closeItem() {
        if (this.expand) {
            this.toggle();
        }
    }
    /**
     * Opens this accordion item.
     */
    async openItem() {
        if (!this.expand) {
            this.toggle();
        }
    }
    /**
     * Sets child reference of the arrow.
     */
    setChildElementsReferences() {
        if (this.el.shadowRoot) {
            this.arrowEl = this.el.shadowRoot.querySelector("sdx-accordion-arrow");
        }
    }
    /**
     * Sets the arrow position.
     */
    setArrowPosition() {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("arrow-position", this.arrowPosition);
        }
    }
    /**
     * Sets the arrow direction.
     */
    setArrowDirection() {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("direction", this.expand ? "up" : "down");
        }
    }
    /**
     * Sets the arrow hover.
     */
    setArrowHover(value) {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("hover", value);
        }
    }
    render() {
        return (index.h("button", { type: "button", class: "content", style: this.buttonStyle, "aria-expanded": this.expand.toString() }, index.h("div", { class: "header" }, index.h("slot", null)), index.h("sdx-accordion-arrow", null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "arrowPosition": ["arrowPositionChanged"],
        "expand": ["activeItemChanged"]
    }; }
};
AccordionItemHeader.style = accordionItemHeaderCss;

exports.sdx_accordion = Accordion;
exports.sdx_accordion_item = AccordionItem;
exports.sdx_accordion_item_body = AccordionItemBody;
exports.sdx_accordion_item_header = AccordionItemHeader;
