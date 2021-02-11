import "flatpickr/dist/l10n/it.js";
import "flatpickr/dist/l10n/fr.js";
import "flatpickr/dist/l10n/de.js";
import { InputType } from "./types";
export declare class Input {
    private invokeHitEnterCallback;
    private invokeChangeCallback;
    private invokeInputCallback;
    private invokeFocusCallback;
    private invokeBlurCallback;
    private invokeKeyDownCallback;
    private minHeight?;
    private flatpickrInstance?;
    private inputEl?;
    private lightDOMHiddenFormInputEl;
    private static readonly flatpickrOptions;
    el: HTMLSdxInputElement;
    hasInputElFocus: boolean;
    /**
     * Text for the screen reader labelling the input field.
     */
    srHint: string;
    /**
     * Callback that will fire on hitting enter.
     */
    hitEnterCallback?: (() => void) | string;
    /**
     * Callback that will fire when the value has changed, regardless of method (keyboard or programmatical).
     */
    changeCallback?: ((value: string) => void) | string;
    /**
     * Callback that will fire when the value changes using the keyboard.
     */
    inputCallback?: ((value: string) => void) | string;
    /**
     * Callback that will fire when the input gets focus.
     */
    focusCallback?: (() => void) | string;
    /**
     * Callback that will fire when the input loses focus.
     */
    blurCallback?: (() => void) | string;
    /**
     * Callback that will fire when the a key is pressed down.
     */
    keyDownCallback?: ((e: Event) => void) | string;
    /**
     * Default text that will be shown unless there's a value.
     */
    placeholder: string;
    /**
     * Default input field type (e.g. "search", "password", "date", etc.). When set to "date", flatpickr will take over. Caution: flatpickr does not fulfill the accessibility requirements of SDX, yet (but we're on it...).
     */
    type: InputType;
    /**
     * Can be used for both reading and writing the value.
     */
    value: string;
    /**
     * For input type="number", step size.
     */
    step?: number;
    /**
     * For input type="number", minimum valid input value.
     */
    min?: number;
    /**
     * For input type="number", maximum valid input value.
     */
    max?: number;
    /**
     * Marks the text within the input on focus.
     */
    selectTextOnFocus: boolean;
    /**
     * @private
     * CSS styles applied to the input element.
     */
    inputStyle: {
        [key: string]: string;
    };
    /**
     * Specifies the input fields native autocomplete behavior on modern browsers (e.g. "off", "username" or "new-password").
     */
    autocomplete?: string;
    /**
     * Disabled, but focussable using tab.
     */
    readonly: boolean;
    /**
     * Disabled and not focussable using tab.
     */
    disabled: boolean;
    /**
     * @private
     * Renders a div that looks exactly like an input field. Overflowing content will have an ellipsis.
     * Only implemented for `type="text"`.
     */
    editable: boolean;
    /**
     * Text that will be written on the top.
     */
    label: string;
    /**
     * Allowed number of characters.
     */
    maxlength?: number;
    /**
     * Datepicker settings.
     * When <code>type="date"</code>, flatpickr is used and can be configured via this attribute.
     * Examples: <code>{ locale: "fr" }</code>, <code>{ minDate: "today" }</code> or <code>{ "altInput": true, "altFormat": "l j. F, Y" }</code>.
     * See available options: https://sdx.swisscom.com/components_-_picker_(date).html
     */
    flatpickrOptions: any;
    /**
     * Name parameter (useful when the item is embedded in a traditional HTML form submit).
     */
    name?: string;
    /**
     * Set this to false to declare the component as invalid (and use the "validation-message" attribute to explain why). It can also be set to true, but this should only be done in rare cases (e.g. when checking a user name for availabilty using server-side validation).
     */
    valid?: boolean;
    /**
     * Text that explains the validation status to the user.
     */
    validationMessage?: string;
    /**
     * Marks the component as required (please note that this itself does not handle validation &mdash; use the "valid" and "validation-message" for that).
     */
    required: boolean;
    valueChanged(): void;
    nameChanged(): void;
    hitEnterCallbackChanged(): void;
    changeCallbackChanged(): void;
    inputCallbackChanged(): void;
    focusCallbackChanged(): void;
    blurCallbackChanged(): void;
    keyDownCallbackChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidRender(): void;
    componentDidUnload(): void;
    onFocus(): void;
    onBlur(): void;
    private onInputElKeyPress;
    private onInputElKeyDown;
    private openDatePicker;
    private onInputElInput;
    private customInputCallback;
    private defaultInputCallback;
    private setInvokeHitEnterCallback;
    private setInvokeChangeCallback;
    private setInvokeInputCallback;
    private setInvokeFocusCallback;
    private setInvokeBlurCallback;
    private setInvokeKeyDownCallback;
    private onInputElFocus;
    private onInputElBlur;
    private selectText;
    /**
     * Calculate and set the autocomplete height.
     * If it's empty and focussed, it should grow.
     * If it's still empty not focussed anymore, it should shrink back.
     * If it has content, it should shrink or grow based on the content (within a certain range).
     */
    private updateHeight;
    private initHiddenFormInputEl;
    private updateHiddenFormInputEl;
    private updateInputElValueIfOutOfSync;
    private isInputElement;
    private createLabel;
    private getCommonInputFieldProps;
    private getComponentClassNames;
    private createInputField;
    private createNumberInputField;
    private createDateInputField;
    private createTextArea;
    /**
     * Parses and returns the flatpickrOptions prop.
     */
    private getParsedFlatpickrOptions;
    render(): any;
}
