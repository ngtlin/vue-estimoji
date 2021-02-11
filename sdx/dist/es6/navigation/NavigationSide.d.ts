import DomElement from "../DomElement";
/**
 * The navigation side component definition.
 */
declare class NavigationSide extends DomElement {
    private _clickHandler;
    private _windowClickHandler;
    private _siteWrapper;
    private _hamburgerElement;
    private _navItems;
    constructor(element: Element);
    protected _initialize(): void;
    protected _handleClick(event: Event): void;
    protected _handleWindowClick(event: Event): boolean;
    /**
     * Toggles the side navigation.
     */
    toggle(): void;
    /**
     * Opens the slide navigation.
     */
    open(): void;
    /**
     * Closes the side navigation.
     */
    close(): void;
    /**
     * Destroys the component and removes all event
     * subscriptions and references.
     */
    destroy(): void;
}
export declare function init(): void;
export default NavigationSide;
