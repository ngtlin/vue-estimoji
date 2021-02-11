import DomElement from "../DomElement";
/**
 * Full progress bar component
 */
declare class ProgressFull extends DomElement {
    private _buttonClickHandler;
    private _keydownHandler;
    private _headerElement;
    private _pages;
    private _minValue;
    private _value;
    private _total;
    /**
     * Creates and initializes the ProgressFull component.
     * @param {DomElement} - The root element of the ProgressFull component.
     */
    constructor(element: Element);
    /**
     * Initializes the loader bar component.
     * @private
     */
    protected _initialize(): void;
    protected _addIncicators(): void;
    protected _update(oldValue: number, newValue: number, animate?: boolean): void;
    protected _handleButtonClick(event: Event): void;
    protected _handleKeydown(event: Event): void;
    /**
     * Gets the current progress value in the range of 1..total.
     */
    get value(): number;
    /**
     * Sets the current progress.
     * @param {number} - The progress in the range of 1..total.
     */
    set value(val: number);
    /**
     * Gets the total progress value.
     */
    get total(): number;
}
export declare function init(): void;
export default ProgressFull;
