import DomElement from "../DomElement";
export interface Formatter {
    (value: number, short: boolean): string;
}
export interface Option {
    value: number;
    label: string | number;
}
/**
 * The range slider component definition.
 */
declare class Range extends DomElement<HTMLInputElement> {
    private _downHandler;
    private _moveHandler;
    private _endHandler;
    private _keydownHandler;
    private _focusHandler;
    private _blurHandler;
    private _resizeHandler;
    private _wrapperElement;
    private _rangeContainer;
    private _rangeTrack;
    private _rangeProgress;
    private _ticksWrapper;
    private _rangeThumb;
    private _thumbValue;
    private _outputLabel?;
    private _minValue;
    private _maxValue;
    private _trackValueTotal;
    private _grabPosition;
    private _trackWidth;
    private _trackPositionMin;
    private _trackPositionMax;
    private _trackLeftPosition;
    private _itemWidth;
    private _formatter;
    constructor(element: HTMLInputElement);
    /**
     * Initializes the range slider component.
     *
     * This method inspects the select definition and its options and
     * generates new stylable DOM elements around the original range input-element
     * definitions.
     * @private
     */
    protected _initialize(): void;
    protected _getOptionsList(): Option[];
    protected _addTicks(dataItems: Option[]): void;
    protected _isEventOnLabel(event: Event): boolean;
    protected _handleDown(event: MouseEvent | TouchEvent): void;
    protected _handleMove(event: MouseEvent | TouchEvent): void;
    protected _handleEnd(event: MouseEvent | TouchEvent): void;
    protected _handleKeydown(event: KeyboardEvent): void;
    protected _handleFocus(): void;
    protected _handleBlur(): void;
    protected _unfocus(): void;
    protected _getRelativePosition(event: MouseEvent | TouchEvent): number;
    /**
     * Validates and updates the position and sets the corresponding value on the slider.
     * @param {position} the new position to set.
     * @param {updateValue} true if the value should be updated as well; otherwise false.
     * @param {snap} true if snapping should be used; otherwise false.
     * @param {animate} true if the UI update should be animated; otherwise false.
     * @private
     */
    protected _setPosition(position: number, updateValue?: boolean, snap?: boolean, animate?: boolean): void;
    /**
     * Gets the snap value corresponding to the given value.
     * @param {value} the target value.
     * @returns an object containing the snap position and the corresponding value.
     * @private
     */
    protected _getSnapValue(value: number): {
        value: number;
        position: number;
    };
    /**
     * Gets the snap position corresponding to the given position.
     * @param {position} the target position.
     * @returns an object containing the snap position and the corresponding value.
     * @private
     */
    protected _getSnapPosition(position?: number | null): {
        value: number;
        position: number;
    };
    /**
     * Gets the next value in the given direction with regards to snapping.
     * @param {value} The current value.
     * @param {direction} The direction (positive or negative integer).
     * @returns The next value.
     * @private
     */
    protected _getNextValue(value: number, direction: number): number;
    protected _updateTickState(): void;
    protected _adjustTickLabelPosition(tickItem: Element, left: boolean): void;
    protected _formatOutput(value: number, short: boolean): string;
    /**
     * Validates and updates the range value.
     * @param {value} the new value to set.
     * @param {update} true if the UI should be updated; otherwise false.
     * @param {animate} true if the UI update should be animated; otherwise false.
     * @private
     */
    protected _setValue(value: number, update?: boolean, animate?: boolean): void;
    /**
     * Sets the value of the range slider.
     */
    set value(value: number);
    /**
     * Gets the current value.
     */
    get value(): number;
    /**
     * Force the component to re-layout itself.
     */
    layout(): void;
    /**
     * Destroys the components and frees all references.
     */
    destroy(): void;
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    destoy(): void;
    /**
     * Sets the component to the enabled state.
     */
    enable(): void;
    /**
     * Sets the component to the disabled state.
     */
    disable(): void;
}
export declare function init(): void;
export default Range;
