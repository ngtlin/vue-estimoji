import DomElement from "../DomElement";
/**
 * The Collapse component.
 */
declare class Collapse extends DomElement {
    private _hiddenIndicator;
    private _collapsibleElements;
    private _clickHandler;
    /**
     * Creates and initializes the Collapse component.
     * @param {DomElement} - The root element of the Collapse component.
     */
    constructor(element: HTMLElement);
    /**
     * Initializes the Collapse component.
     * @private
     */
    protected _initialize(): void;
    protected _handleClick(event: Event): void;
    /**
     * Toggles the collapseible.
     */
    toggle(): void;
    protected _openCollapse(el: HTMLElement): void;
    protected _closeCollapse(el: HTMLElement): void;
    /**
     * Removes all event handlers and clears references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Collapse;
