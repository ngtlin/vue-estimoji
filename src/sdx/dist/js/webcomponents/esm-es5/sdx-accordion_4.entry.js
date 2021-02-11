import { __awaiter, __generator } from "tslib";
import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { i as installSlotObserver } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';
var accordionCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}.component{border:1px solid #d6d6d6}";
var Accordion = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.arrowPropertyChanged = function () {
        this.initiateComponent();
    };
    class_1.prototype.componentWillLoad = function () {
        this.initiateComponent();
    };
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        installSlotObserver(this.el, function () { return _this.onSlotChange(); }); // Listen to children changes
    };
    /**
     * Fired by the MutationObserver whenever children change.
     */
    class_1.prototype.onSlotChange = function () {
        this.initiateComponent();
    };
    /**
     * Closes the accordion item.
     * @param index Index of the accordion item.
     */
    class_1.prototype.close = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var itemEl, headerEl;
            return __generator(this, function (_a) {
                itemEl = this.accordionItemEls[index];
                if (!this.keepOpen) {
                    this.closeNotIgnoredItems(index);
                }
                headerEl = itemEl.querySelector("sdx-accordion-item-header");
                if (headerEl) {
                    itemEl.setAttribute("open", "false");
                    this.trackOpenItems(index, "false");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Closes all accordion items.
     */
    class_1.prototype.closeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, itemEl, headerEl;
            return __generator(this, function (_a) {
                this.openedItems = [];
                for (i = 0; i < this.accordionItemEls.length; i++) {
                    itemEl = this.accordionItemEls[i];
                    headerEl = itemEl.querySelector("sdx-accordion-item-header");
                    if (headerEl) {
                        itemEl.setAttribute("open", "false");
                        this.trackOpenItems(i, "false");
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Toggle display of the accordion item.
     * @param index Index of the accordion item.
     */
    class_1.prototype.toggle = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var itemEl, headerEl, itemFound, isOpen;
            return __generator(this, function (_a) {
                itemEl = this.accordionItemEls[index];
                if (!this.keepOpen) {
                    this.closeNotIgnoredItems(index);
                }
                headerEl = itemEl.querySelector("sdx-accordion-item-header");
                if (headerEl) {
                    itemFound = itemEl.getAttribute("open") || "false";
                    isOpen = itemFound === "false" ? "true" : "false";
                    itemEl.setAttribute("open", isOpen);
                    this.trackOpenItems(index, isOpen);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Opens the accordion item.
     * @param index Index of the accordion item.
     */
    class_1.prototype.open = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var itemEl, headerEl;
            return __generator(this, function (_a) {
                itemEl = this.accordionItemEls[index];
                if (!this.keepOpen) {
                    this.closeNotIgnoredItems(index);
                }
                headerEl = itemEl.querySelector("sdx-accordion-item-header");
                if (headerEl) {
                    itemEl.setAttribute("open", "true");
                    this.trackOpenItems(index, "true");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Opens all accordion items.
     */
    class_1.prototype.openAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, itemEl, headerEl;
            return __generator(this, function (_a) {
                if (this.keepOpen || this.accordionItemEls.length === 1) {
                    this.openedItems = [];
                    for (i = 0; i < this.accordionItemEls.length; i++) {
                        itemEl = this.accordionItemEls[i];
                        headerEl = itemEl.querySelector("sdx-accordion-item-header");
                        if (headerEl) {
                            itemEl.setAttribute("open", "true");
                            this.trackOpenItems(i, "true");
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.initiateComponent = function () {
        this.setChildElementsReferences();
        this.initiateAccordionItems();
    };
    /**
     * Sets child reference and add to every header a toggle function.
     */
    class_1.prototype.setChildElementsReferences = function () {
        this.accordionItemEls = this.el.querySelectorAll("sdx-accordion-item");
    };
    /**
     * Modify items with initial settings.
     */
    class_1.prototype.initiateAccordionItems = function () {
        this.openedItems = [];
        for (var i = 0; i < this.accordionItemEls.length; ++i) {
            var itemEl = this.accordionItemEls[i];
            var headerEl = itemEl.querySelector("sdx-accordion-item-header");
            if (headerEl) {
                var isOpen = "false";
                if (itemEl.hasAttribute("open") && itemEl.getAttribute("open") !== "false") {
                    isOpen = "true";
                }
                itemEl.setAttribute("open", isOpen);
                itemEl.setAttribute("arrow-position", this.arrowPosition);
                headerEl.setAttribute("arrow-position", this.arrowPosition);
                var bodyEl = itemEl.querySelector("sdx-accordion-item-body");
                if (bodyEl) {
                    bodyEl.setAttribute("arrow-position", this.arrowPosition);
                }
                this.trackOpenItems(i, isOpen);
                headerEl.toggle = this.toggle.bind(this, i);
            }
        }
    };
    /**
     * Closes all items when keepOpen is false, to ensure only 1 accordion item is opened max.
     * @param ignoreIndex Index for which the closing of item will be ignored.
     */
    class_1.prototype.closeNotIgnoredItems = function (ignoreIndex) {
        for (var i = 0; i < this.openedItems.length; i++) {
            if (this.openedItems[i] !== ignoreIndex) {
                var itemEl = this.accordionItemEls[this.openedItems[i]];
                itemEl.setAttribute("open", "false");
            }
        }
        this.openedItems = [];
    };
    /**
     * Track which item is opened in case keepOpen is set to true.
     * @param index Index of the opened item.
     * @param isOpen Open state of the item.
     */
    class_1.prototype.trackOpenItems = function (index, isOpen) {
        if (!this.keepOpen && isOpen === "true") {
            this.openedItems.push(index);
        }
    };
    class_1.prototype.render = function () {
        return (h("div", { class: "component", style: this.componentStyle }, h("slot", null)));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "arrowPosition": ["arrowPropertyChanged"],
                "keepOpen": ["arrowPropertyChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
Accordion.style = accordionCss;
var accordionItemCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}:host p{padding:13px 13px 14px 19px}:host([arrow-position=center]){padding:0}:host(:not(:last-of-type)) .component{border-bottom:1px solid #d6d6d6}.component{position:relative}";
var AccordionItem = /** @class */ (function () {
    function AccordionItem(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If the accordion item is initially open.
         */
        this.open = false;
    }
    AccordionItem.prototype.activeItemChanged = function () {
        this.decideCollapseHeaderDisplay();
        this.decideCollapseBodyDisplay();
    };
    AccordionItem.prototype.componentWillLoad = function () {
        this.setChildElementsReferences();
        this.decideCollapseHeaderDisplay();
    };
    AccordionItem.prototype.componentDidLoad = function () {
        this.decideCollapseBodyDisplay();
    };
    /**
     * Assign element references to used properties.
     */
    AccordionItem.prototype.setChildElementsReferences = function () {
        this.itemHeaderEl = this.el.querySelector("sdx-accordion-item-header");
        this.itemBodyEl = this.el.querySelector("sdx-accordion-item-body");
    };
    /**
     * Decides based on open property the display of header and its and behaviour.
     */
    AccordionItem.prototype.decideCollapseHeaderDisplay = function () {
        if (this.itemHeaderEl) {
            this.itemHeaderEl.setAttribute("expand", this.open.toString());
        }
    };
    /**
     * Decides based on open property the display of body.
     */
    AccordionItem.prototype.decideCollapseBodyDisplay = function () {
        if (this.itemBodyEl) {
            this.itemBodyEl.toggle(this.open);
        }
    };
    AccordionItem.prototype.render = function () {
        return (h("div", { class: "component" }, h("slot", null)));
    };
    Object.defineProperty(AccordionItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionItem, "watchers", {
        get: function () {
            return {
                "open": ["activeItemChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return AccordionItem;
}());
AccordionItem.style = accordionItemCss;
var accordionItemBodyCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{overflow:hidden;display:block}:host(:not(.open)){display:none;opacity:0}:host([arrow-position=left]) .component{margin-left:24px}.component{margin:0 13px 14px 19px}";
var AccordionItemBody = /** @class */ (function () {
    function class_2(hostRef) {
        registerInstance(this, hostRef);
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
    class_2.prototype.toggle = function (isOpen) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.initialLoad) {
                    this.initiateOpenState(isOpen);
                }
                else if (isOpen) {
                    this.openCollapseSection();
                }
                else {
                    this.closeCollapseSection();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Sets class to handle immediately the open/close state.
     * @param newState Open State of the accordion item.
     */
    class_2.prototype.initiateOpenState = function (newState) {
        if (newState) {
            this.el.classList.add("open");
        }
        this.initialLoad = false;
    };
    /**
     * Opens section with an animation.
     */
    class_2.prototype.openCollapseSection = function () {
        var _this = this;
        this.el.style.display = "block";
        this.el.style.height = "0px";
        anime({
            targets: this.el,
            duration: this.animationDuration,
            height: this.el.scrollHeight,
            opacity: 1,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                _this.el.setAttribute("aria-expanded", "true");
                _this.el.classList.add("open");
                _this.el.style.height = "auto"; // allow to grow or shrink with content
            }
        });
    };
    /**
     * Closes section with an animation.
     */
    class_2.prototype.closeCollapseSection = function () {
        var _this = this;
        // Can't animate "auto", therefore update to current height
        this.el.style.height = this.el.scrollHeight + "px";
        anime({
            targets: this.el,
            duration: this.animationDuration,
            height: 0,
            opacity: 0,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                _this.el.setAttribute("aria-expanded", "false");
                _this.el.classList.remove("open");
            }
        });
    };
    class_2.prototype.render = function () {
        return (h("div", { class: "component", style: this.componentStyle }, h("slot", null)));
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
AccordionItemBody.style = accordionItemBodyCss;
var accordionItemHeaderCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host .header{width:100%}:host .content{color:#333;display:block;margin:0;padding:13px 13px 14px 19px;border:0;width:100%;cursor:pointer;outline:none}:host button{font-family:inherit;margin:0;background:transparent;text-align:left}:host([arrow-position=left]) .header{padding-left:8px}:host([arrow-position=left]) .header,:host([arrow-position=right]) .header{width:calc(100% - 35px);margin:0px;display:inline-block;position:relative}:host([arrow-position=center]) .header{display:none}:host([arrow-position=center]) .content{width:100%;min-height:32px;border-top:1px solid #d6d6d6}";
var AccordionItemHeader = /** @class */ (function () {
    function class_3(hostRef) {
        registerInstance(this, hostRef);
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
        this.toggle = function () { return ""; };
    }
    class_3.prototype.arrowPositionChanged = function () {
        this.setArrowPosition();
    };
    class_3.prototype.activeItemChanged = function () {
        this.setArrowDirection();
    };
    class_3.prototype.componentDidLoad = function () {
        this.setChildElementsReferences();
        this.setArrowPosition();
        this.setArrowDirection();
    };
    class_3.prototype.onClick = function () {
        this.toggle();
    };
    class_3.prototype.onMouseOver = function () {
        this.setArrowHover("true");
    };
    class_3.prototype.onMouseOut = function () {
        this.setArrowHover("false");
    };
    /**
     * Closes this accordion item.
     */
    class_3.prototype.closeItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.expand) {
                    this.toggle();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Opens this accordion item.
     */
    class_3.prototype.openItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.expand) {
                    this.toggle();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Sets child reference of the arrow.
     */
    class_3.prototype.setChildElementsReferences = function () {
        if (this.el.shadowRoot) {
            this.arrowEl = this.el.shadowRoot.querySelector("sdx-accordion-arrow");
        }
    };
    /**
     * Sets the arrow position.
     */
    class_3.prototype.setArrowPosition = function () {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("arrow-position", this.arrowPosition);
        }
    };
    /**
     * Sets the arrow direction.
     */
    class_3.prototype.setArrowDirection = function () {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("direction", this.expand ? "up" : "down");
        }
    };
    /**
     * Sets the arrow hover.
     */
    class_3.prototype.setArrowHover = function (value) {
        if (this.arrowEl) {
            this.arrowEl.setAttribute("hover", value);
        }
    };
    class_3.prototype.render = function () {
        return (h("button", { type: "button", class: "content", style: this.buttonStyle, "aria-expanded": this.expand.toString() }, h("div", { class: "header" }, h("slot", null)), h("sdx-accordion-arrow", null)));
    };
    Object.defineProperty(class_3.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "watchers", {
        get: function () {
            return {
                "arrowPosition": ["arrowPositionChanged"],
                "expand": ["activeItemChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_3;
}());
AccordionItemHeader.style = accordionItemHeaderCss;
export { Accordion as sdx_accordion, AccordionItem as sdx_accordion_item, AccordionItemBody as sdx_accordion_item_body, AccordionItemHeader as sdx_accordion_item_header };
