import DomElement from "../DomElement";
/**
 * Light progress bar component
 */
declare class ProgressLight extends DomElement {
    private _buttonClickHandler;
    private _animationCompletedHandler;
    private _barElement;
    private _progressElement;
    private _pageCurrentElement;
    private _pageTotalElement;
    private _buttonLeft;
    private _buttonRight;
    private _minValue;
    private _total;
    private _value;
    private _itemWidth?;
    /**
     * Creates and initializes the ProgressLight component.
     * @param {DomElement} - The root element of the ProgressLight component.
     */
    constructor(element: Element);
    /**
     * Initializes the loader bar component.
     * @private
     */
    protected _initialize(): void;
    protected _addTicks(): void;
    protected _update(animate?: boolean): void;
    protected _layout(): void;
    protected _handleButtonClick(event: Event): void;
    protected _handleAnimationCompleted(): void;
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
    /**
     * Sets the total progress value and updates the UI accordingly.
     * @param {number} - The total progress positive integer value.
     */
    set total(value: number);
    /**
     * Enables the component.
     */
    enable(): void;
    /**
     * Disables the component.
     */
    disable(): void;
}
export declare function init(): void;
export default ProgressLight;
