import { Component, h, Element, State, Watch, Listen, Prop } from "@stencil/core";
import anime from "animejs";
import Hammer from "hammerjs";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
import { createAndInstallStore, mapStateToProps } from "../../core/helpers/store-helpers";
import { tabsReducer } from "./tabs-store";
export class Tabs {
    constructor() {
        this.componentDidLoadComplete = false;
        this.isInitialSelect = true;
        this.animationInProgress = false;
        this.invokeChangeCallback = () => null;
        // If the component needs to scroll to the right initially,
        // because the selected tab is out of sight
        this.initiallyShowRightArrow = false;
        this.showLeftArrow = false;
        this.showRightArrow = false;
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    selectedTabsItemElChanged() {
        if (!this.componentDidLoadComplete) {
            return;
        }
        // A tab change has happened (e.g. using click or programatically)
        this.isInitialSelect = false;
        // Ensure visibility of selected tabs item el (if any)
        if (!this.selectedTabsItemEl) {
            return;
        }
        this.scrollUntilVisibleIfHidden(this.selectedTabsItemEl);
        this.animateIndicatorElToSelectedTab();
        this.invokeChangeCallback(this.selectedTabsItemEl);
    }
    onWindowResizeThrottled() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            this.showArrowsIfNeeded();
            // When enough space, scroll back to zero
            const hasEnoughSpace = this.headerEl.clientWidth - this.scrollableEl.clientWidth >= 0;
            if (hasEnoughSpace) {
                this.animateScrollableEl("0");
            }
        }, 10);
    }
    componentWillLoad() {
        this.setInvokeChangeCallback();
        this.store = createAndInstallStore(this, tabsReducer, this.getInitialState());
        this.unsubscribe = mapStateToProps(this, this.store, [
            "tabsItemElsSorted",
            "selectedTabsItemEl"
        ]);
    }
    componentDidLoad() {
        this.showArrowsIfNeeded();
        this.initiallyShowRightArrow = this.showRightArrow;
        this.selectDefaultTabsItem();
        this.animateIndicatorElToSelectedTab();
        this.initTouch();
        this.componentDidLoadComplete = true;
    }
    componentDidUnload() {
        this.unsubscribe();
        this.destroyTouch();
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    initTouch() {
        this.hammer = new Hammer(this.headerEl);
        this.hammer.on("swipeleft", () => this.scroll("right"));
        this.hammer.on("swiperight", () => this.scroll("left"));
    }
    destroyTouch() {
        this.hammer.destroy();
    }
    /**
     * If no tabs item is selected initially, use the first one
     */
    selectDefaultTabsItem() {
        if (!this.selectedTabsItemEl) {
            this.store.dispatch({
                type: "SELECT_TABS_ITEM_EL",
                tabsItemEl: this.tabsItemElsSorted[0]
            });
        }
    }
    getInitialState() {
        return {
            tabsItemEls: [],
            tabsItemElsSorted: [],
            selectedTabsItemEl: undefined
        };
    }
    animateIndicatorElToSelectedTab() {
        const selectedTabsItemButtonEl = this.tabsItemsWithButtonEl.get(this.selectedTabsItemEl);
        const buttonElRect = selectedTabsItemButtonEl.getBoundingClientRect();
        const headerElRect = this.headerEl.getBoundingClientRect();
        const translatableElRect = this.scrollableEl.getBoundingClientRect();
        anime({
            targets: this.indicatorEl,
            begin: () => this.indicatorEl.style.display = this.isInitialSelect ? "none" : "",
            complete: () => this.indicatorEl.style.display = "",
            duration: this.isInitialSelect ? 0 : 200,
            easing: "easeOutQuad",
            translateX: (headerElRect.left - translatableElRect.left) + buttonElRect.left - headerElRect.left,
            width: buttonElRect.right - buttonElRect.left
        });
    }
    animateScrollableEl(translateX) {
        if (this.animationInProgress) {
            return;
        }
        // Animation starts
        this.animationInProgress = true;
        anime({
            targets: this.scrollableEl,
            easing: "easeOutQuad",
            duration: 200,
            translateX,
            complete: () => {
                this.animationInProgress = false;
                this.showArrowsIfNeeded();
            }
        });
    }
    select(tabsItemEl) {
        this.store.dispatch({ type: "SELECT_TABS_ITEM_EL", tabsItemEl });
    }
    hasOverflowToLeft() {
        const headerElRect = this.headerEl.getBoundingClientRect();
        const listElRect = this.listEl.getBoundingClientRect();
        return Math.floor(headerElRect.left - listElRect.left) > 0;
    }
    hasOverflowToRight() {
        const headerElRect = this.headerEl.getBoundingClientRect();
        const listElRect = this.listEl.getBoundingClientRect();
        return Math.ceil(headerElRect.right - listElRect.right) < 0;
    }
    /**
     * Checks whether a tabs item el is hidden (or partly hidden) and on what side.
     * @param tabsItemEl Element to check.
     */
    isTabsItemElHidden(tabsItemEl) {
        const buttonEl = this.tabsItemsWithButtonEl.get(tabsItemEl);
        const buttonElRect = buttonEl.getBoundingClientRect();
        const headerElRect = this.headerEl.getBoundingClientRect();
        // Also take arrow width into account to ensure tabs items below don't count as "visible"
        if (Math.ceil(buttonElRect.left) < headerElRect.left + this.leftArrowEl.offsetWidth) {
            return "left";
        }
        if (Math.floor(buttonElRect.right) > headerElRect.right - this.rightArrowEl.offsetWidth) {
            return "right";
        }
        // Not hidden
        return false;
    }
    /**
     * Find next button that is hidden (or partly hidden).
     * @param direction Whether to check to the left or to the right side.
     */
    getNextInvisibleTabsItem(direction) {
        let index = direction === "left"
            ? this.tabsItemElsSorted.length - 1
            : 0;
        let nextHiddenTabsItemEl = this.tabsItemElsSorted[index];
        while (nextHiddenTabsItemEl && this.isTabsItemElHidden(nextHiddenTabsItemEl) !== direction) {
            index = direction === "left" ? index - 1 : index + 1;
            nextHiddenTabsItemEl = this.tabsItemElsSorted[index];
        }
        return nextHiddenTabsItemEl;
    }
    /**
     * Scroll until the first hidden (or partly hidden) tabs item is fully visible.
     */
    scroll(direction) {
        // It's already scrolling
        if (this.animationInProgress) {
            return;
        }
        // No need to scroll when there's no overflow
        if (direction === "left" && !this.hasOverflowToLeft() || direction === "right" && !this.hasOverflowToRight) {
            return;
        }
        // Find next button that is hidden (or partly hidden) and scroll to it
        const nextHiddenTabsItemEl = this.getNextInvisibleTabsItem(direction);
        if (!nextHiddenTabsItemEl) {
            return;
        }
        this.scrollUntilVisible(nextHiddenTabsItemEl, direction);
    }
    scrollUntilVisible(tabsItemEl, direction) {
        const headerElRect = this.headerEl.getBoundingClientRect();
        const listElRect = this.listEl.getBoundingClientRect();
        const nextHiddenTabsItemButtonEl = this.tabsItemsWithButtonEl.get(tabsItemEl);
        const buttonElRect = nextHiddenTabsItemButtonEl.getBoundingClientRect();
        const translateX = direction === "left"
            ? -(headerElRect.left - buttonElRect.left) - this.leftArrowEl.offsetWidth
            : -(headerElRect.right - buttonElRect.right) + this.rightArrowEl.offsetWidth;
        const overflow = Math.floor(listElRect[direction] - headerElRect[direction]);
        this.animateScrollableEl(`-=${Math[direction === "left" ? "max" : "min"](translateX, overflow)}`);
    }
    scrollUntilVisibleIfHidden(tabsItemEl) {
        // Make sure the selected element is always visible
        const direction = this.isTabsItemElHidden(tabsItemEl);
        if (direction) {
            this.scrollUntilVisible(tabsItemEl, direction);
        }
    }
    showArrowsIfNeeded() {
        this.showLeftArrow = this.hasOverflowToLeft();
        this.showRightArrow = this.hasOverflowToRight();
    }
    getComponentClassNames() {
        return {
            component: true
        };
    }
    getTabsItemButtonClassNames(tabsItemEl) {
        return {
            ["button-reset"]: true,
            selected: tabsItemEl === this.selectedTabsItemEl
        };
    }
    render() {
        this.tabsItemsWithButtonEl = new WeakMap(); // clear previous entries
        return (h("div", { class: this.getComponentClassNames() },
            h("div", { class: "header", ref: (el) => this.headerEl = el },
                h("div", { class: "scrollable", ref: (el) => this.scrollableEl = el },
                    h("div", { class: "indicator", ref: (el) => this.indicatorEl = el, style: { display: "none" /* will be displayed during animation */ } }),
                    h("ul", { ref: (el) => this.listEl = el, role: "tablist" }, this.tabsItemElsSorted.map((tabsItemEl) => h("li", null,
                        h("button", { ref: (el) => this.tabsItemsWithButtonEl.set(tabsItemEl, el), class: this.getTabsItemButtonClassNames(tabsItemEl), onClick: () => this.select(tabsItemEl), title: tabsItemEl.label, disabled: tabsItemEl.disabled, role: "tab", "aria-expanded": (tabsItemEl === this.selectedTabsItemEl).toString(), "aria-selected": (tabsItemEl === this.selectedTabsItemEl).toString(), onFocus: (e) => {
                                e.preventDefault(); // Play animation instead of "hard jump" to the focussed tab
                                this.scrollUntilVisibleIfHidden(tabsItemEl);
                            } },
                            h("sdx-icon", { iconName: tabsItemEl.iconName }),
                            " ",
                            tabsItemEl.label)))),
                    h("div", { class: "line" })),
                h("sdx-arrow", { ref: (el) => this.leftArrowEl = el, class: "left", direction: "left", hideBackground: !this.showLeftArrow, hideArrow: !this.showLeftArrow, onClick: () => this.scroll("left") }),
                h("sdx-arrow", { ref: (el) => this.rightArrowEl = el, class: "right", direction: "right", hideBackground: !this.showRightArrow, hideArrow: !this.showRightArrow, onClick: () => this.scroll("right"), animationBeginCallback: () => {
                        // Initially scroll to selected tab (if hidden)
                        if (this.initiallyShowRightArrow) {
                            this.scrollUntilVisibleIfHidden(this.selectedTabsItemEl);
                        }
                        this.initiallyShowRightArrow = false;
                    } })),
            h("div", { class: "body" },
                h("slot", null))));
    }
    static get is() { return "sdx-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tabs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tabs.css"]
    }; }
    static get properties() { return {
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((activeTab: Node) => void) | string",
                "resolved": "((activeTab: Node) => void) | string | undefined",
                "references": {
                    "Node": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the active tab has changed.\nProvides the active tab DOM node."
            },
            "attribute": "change-callback",
            "reflect": false
        }
    }; }
    static get states() { return {
        "tabsItemElsSorted": {},
        "selectedTabsItemEl": {},
        "showLeftArrow": {},
        "showRightArrow": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "selectedTabsItemEl",
            "methodName": "selectedTabsItemElChanged"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "onWindowResizeThrottled",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
