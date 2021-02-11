import DomElement from "../DomElement";
/**
 * A component for the flyout menu.
 */
declare class MenuFlyout extends DomElement {
    private _clickHandler;
    private _windowClickHandler;
    private _animationDuration;
    private _dynamicPlacement;
    private _hiddenIndicator?;
    private _flyoutElement;
    private _popperInstance?;
    /**
     * Creates and initializes the flyout component.
     * @param element - The root element of the flyout menu component.
     */
    constructor(element: Element);
    /**
     * Initializes the flyout component.
     * @private
     */
    protected _initialize(): void;
    private _initFlyoutElement;
    protected _handleClick(): void;
    protected _handleWindowClick(event: MouseEvent | TouchEvent): boolean;
    protected _useDynamicPlacement(): Element | undefined;
    protected _openMenu(el: HTMLElement): void;
    protected _closeMenu(el: HTMLElement): void;
    /**
     * Sets the opening animation duration.
     * @param {durationInSeconds} - The animation duration in seconds.
     */
    set animationDuration(durationInSeconds: number);
    /**
     * Opens the flyout menu.
     * @fires Modal#opened
     */
    open(): void;
    /**
     * Closes the flyout menu.
     * @fires Modal#closed
     */
    close(): void;
    /**
     * Toggles the flyout menu.
     * @fires Modal#opened
     * @fires Modal#closed
     */
    toggle(): void;
    /**
     * Removes all event handlers and clears references.
     */
    destroy(): void;
}
export declare function init(): void;
export default MenuFlyout;
