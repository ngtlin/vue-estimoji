import DomElement from "../DomElement";
/**
 * The navigation component definition.
 */
declare class Navigation extends DomElement {
    _navLevel0: HTMLElement;
    _navLevel0Body: HTMLElement;
    _navLevel1: HTMLElement;
    _hamburgerElement: HTMLElement;
    private _navMobile;
    private _searchComponents;
    private _level0ClickHandler;
    private _level1ClickHandler;
    private _windowClickHandler;
    private _searchClickHandler;
    private animation;
    private _searchDesktop?;
    constructor(element: Element);
    protected _resetMainTimeline(...elements: HTMLElement[]): void;
    protected _isMobile(): boolean;
    protected _handleLevel0Click(event: Event): void;
    protected _handleLevel1Click(event: Event): boolean;
    protected _toggleContainer(navLink: HTMLElement, navContainer?: HTMLElement, navSection?: HTMLElement, navFooter?: HTMLElement, previousNavLink?: HTMLElement, previousNavContainer?: HTMLElement, previousNavSection?: HTMLElement, previousNavFooter?: HTMLElement, animateContainer?: boolean): void;
    protected _onNavigationOpened(): void;
    protected _onNavigationClosed(): void;
    protected _handleWindowClick(event: Event): boolean;
    protected _openSection(navContainer?: HTMLElement, navSection?: HTMLElement, navFooter?: HTMLElement, animateColumns?: boolean, animateContainer?: boolean): void;
    protected _closeSection(navContainer?: HTMLElement, navSection?: HTMLElement, navFooter?: HTMLElement, animateColumns?: boolean, animateContainer?: boolean): void;
    protected _handleSearchClick(): void;
    /**
     * Initializes the navigation component.
     * @private
     */
    protected _initialize(): void;
    /**
     * Closes the navigation.
     */
    close(): void;
}
export declare function init(): void;
export default Navigation;
