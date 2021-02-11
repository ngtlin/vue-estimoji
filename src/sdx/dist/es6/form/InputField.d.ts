import DomElement from "../DomElement";
/**
 * Input field component
 */
declare class InputField extends DomElement<HTMLInputElement> {
    private _changedHandler;
    private _animationStartHandler;
    private _flatpickrInstance;
    private _datePickerOptions;
    constructor(element: HTMLInputElement, datePickerOptions?: any);
    /**
     * Initializes the input field component.
     * @private
     */
    protected _initialize(): void;
    protected _initializeDatePicker(): void;
    protected _destroyDatePicker(): void;
    protected _onAnimationStart(e: AnimationEvent): void;
    /**
     * Notifies the input field component that it's value has been changed.
     */
    onValueChanged(force?: boolean): void;
    /**
     * Destroys the component and frees all references.
     */
    destroy(): void;
    /**
     * Displays the specified error text underneath the input field.
     * @param {text} text The error text/html to display; or undefined to hide the message.
     */
    showError(text: string): void;
}
export declare function init(): void;
export default InputField;
