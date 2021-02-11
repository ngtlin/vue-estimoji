import DomElement from "../DomElement";
/**
 * The search input component definition.
 */
declare class SearchInput extends DomElement {
    private _input;
    private _form;
    private _btnClose;
    private _liveSuggestions?;
    private _liveFooter?;
    private _liveContainer?;
    private _focusHandler;
    private _blurHandler;
    private _closeHandler;
    private _windowClickHandler;
    private _keydownHandler;
    private _resizeHandler;
    private _isOpen;
    private animation;
    constructor(element: HTMLElement);
    protected _initialize(): void;
    protected _handleInputFocus(): void;
    protected _handleInputBlur(): void;
    protected _handleWindowClick(event: MouseEvent | TouchEvent): boolean;
    protected _handleKeydown(event: KeyboardEvent): void;
    protected _handleResize(): void;
    protected _resetMainTimeline(): void;
    /**
     * Gets the search input text content.
     * @returns {String} The input text.
     */
    get value(): string;
    /**
     * Opens/activates the search input.
     */
    open(): void;
    /**
     * Closes/deactivates the search input.
     */
    close(): void;
    /**
     * Opens the live search suggestions.
     */
    openLiveSearch(): void;
    /**
     * Closes the live search suggestions.
     */
    closeLiveSearch(): void;
    /**
     * Destroys the component and clears all references.
     */
    destroy(): void;
    /**
     * Determines if the SearchInput is open/visible.
     * @return {Boolean} - True if open; otherwise false.
     */
    isOpen(): boolean;
}
export declare function init(): void;
export default SearchInput;
