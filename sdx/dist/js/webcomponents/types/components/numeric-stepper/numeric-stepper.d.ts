export declare class NumericStepper {
    private sdxInputEl?;
    private invokeChangeCallback;
    private srHintValue;
    private decreaseDisabled;
    private increaseDisabled;
    el: HTMLSdxNumericStepperElement;
    /**
     * Text that will be written on the top of the numeric stepper. Make sure to include the maximum possible value here
     * for the user.
     */
    label: string;
    /**
     * Text for the screen reader describing the numeric stepper.
     */
    srHint: string;
    /**
     * Minimum value. Cannot be negative.
     */
    min: number;
    /**
     * Maximum value. Cannot be set greater than 999.
     */
    max: number;
    /**
     * Initial value. Must be between 0 and 999 including.
     */
    value: number | undefined;
    /**
     * Step size.
     */
    step: number;
    /**
     * Callback that will fire on change.
     */
    changeCallback?: ((value: string) => void) | string;
    /**
     * Set this to false to declare the component as invalid (and use the "validation-message" attribute to explain why).
     * It can also be set to true, but this should only be done in rare cases (e.g. when checking a user name for
     * availabilty using server-side validation).
     */
    valid?: boolean;
    /**
     * Text that explains the validation status to the user.
     */
    validationMessage?: string;
    /**
     * Disabled and not focusable using tab.
     */
    disabled: boolean;
    /**
     * valueState reflects the validated input value of the number input field.
     * When trying to put a value outside the valid range, the input gets blocked and keeps the old and still valid value.
     */
    valueState: number | undefined;
    inputElValue: string | undefined;
    changeCallbackChanged(): void;
    valueChanged(): void;
    valueStateChanged(): void;
    componentWillLoad(): void;
    private setInvokeChangeCallback;
    private decrease;
    private increase;
    private setValueState;
    private focusInputField;
    private getInputStyle;
    private getComponentClassNames;
    private getButtonClassNames;
    render(): any;
}
