import { TabsState } from "./tabs-store";
export declare class Tabs {
    private store;
    private unsubscribe;
    private indicatorEl?;
    private headerEl?;
    private scrollableEl?;
    private listEl?;
    private leftArrowEl?;
    private rightArrowEl?;
    private componentDidLoadComplete;
    private isInitialSelect;
    private tabsItemsWithButtonEl;
    private animationInProgress;
    private resizeTimer?;
    private hammer?;
    private invokeChangeCallback;
    private initiallyShowRightArrow;
    el: HTMLSdxTabsElement;
    tabsItemElsSorted: TabsState["tabsItemElsSorted"];
    selectedTabsItemEl: TabsState["selectedTabsItemEl"];
    showLeftArrow: boolean;
    showRightArrow: boolean;
    /**
     * Callback that will fire when the active tab has changed.
     * Provides the active tab DOM node.
     */
    changeCallback?: ((activeTab: Node) => void) | string;
    changeCallbackChanged(): void;
    selectedTabsItemElChanged(): void;
    onWindowResizeThrottled(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private setInvokeChangeCallback;
    private initTouch;
    private destroyTouch;
    /**
     * If no tabs item is selected initially, use the first one
     */
    private selectDefaultTabsItem;
    private getInitialState;
    private animateIndicatorElToSelectedTab;
    private animateScrollableEl;
    private select;
    private hasOverflowToLeft;
    private hasOverflowToRight;
    /**
     * Checks whether a tabs item el is hidden (or partly hidden) and on what side.
     * @param tabsItemEl Element to check.
     */
    private isTabsItemElHidden;
    /**
     * Find next button that is hidden (or partly hidden).
     * @param direction Whether to check to the left or to the right side.
     */
    private getNextInvisibleTabsItem;
    /**
     * Scroll until the first hidden (or partly hidden) tabs item is fully visible.
     */
    private scroll;
    private scrollUntilVisible;
    private scrollUntilVisibleIfHidden;
    private showArrowsIfNeeded;
    private getComponentClassNames;
    private getTabsItemButtonClassNames;
    render(): any;
}
