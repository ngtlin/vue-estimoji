import DomElement from "../DomElement";
/**
 * The Accordion component
 */
declare class Accordion extends DomElement {
    private _sectionClickHandler;
    private _hiddenIndicator;
    /**
     * Creates and initializes the Accordion component.
     * @param {DomElement} - The root element of the Accordion component.
     */
    constructor(element: Element);
    /**
     * Initializes the Accordion component.
     * @private
     */
    protected _initialize(): void;
    protected _handleSectionClick(event: Event): void;
    protected _toggleSection(accSection: Element): void;
    protected _openCollapseSection(el: HTMLElement): void;
    protected _closeCollapseSection(el: HTMLElement): void;
    /**
     * Removes all event handlers and clears references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Accordion;
