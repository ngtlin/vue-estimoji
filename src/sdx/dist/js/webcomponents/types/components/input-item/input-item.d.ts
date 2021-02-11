import { InputItemType } from "./types";
import { InputGroupState } from "./input-group-store";
import { Size } from "../icon/types";
import { CSSRules } from "../../core/types/types";
export declare class InputItem {
    private store?;
    private unsubscribe?;
    private inputEl;
    private invokeChangeCallback;
    private uniqueId;
    private lightDOMHiddenFormInputEl;
    el: HTMLSdxInputItemElement;
    typeState?: InputGroupState["typeState"];
    themeState?: InputGroupState["themeState"];
    nameState?: InputGroupState["nameState"];
    inline?: InputGroupState["inline"];
    selectedInputItemEls?: InputGroupState["selectedInputItemEls"];
    groupLabel?: InputGroupState["groupLabel"];
    /**
     * The form input type of the item (radio or checkbox).
     */
    type: InputItemType;
    /**
     * Icon name of the icon inside the container variation.
     */
    iconName?: string;
    /**
     * Icon size of the icon inside the container variation.
     */
    iconSize?: Size;
    /**
     * Whether the item is turned on or off.
     */
    checked: boolean;
    /**
     * The current value.
     */
    value: any;
    /**
     * Not selectable.
     */
    disabled: boolean;
    /**
     * Callback whenever the user checks/unchecks the component.
     */
    changeCallback?: ((checked: boolean) => void) | string;
    /**
     * Name parameter (useful when the item is embedded in a traditional HTML form submit).
     */
    name?: string;
    /**
     * Make sure that the input item does not receive focus.
     * Use this when the input item is used within a component that already
     * handles focus (e.g. sdx-select-option in sdx-select with multiselect).
     */
    disableFocus: boolean;
    /**
     * Set this to false to declare the component as invalid (and use the "validation-message" attribute to explain why).
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
    /**
     * @private
     * Hide the checkbox or radio checked indicator icon.
     */
    hideCheckedIcon: boolean;
    /**
     * @private
     */
    labelStyle: CSSRules;
    valueChanged(): void;
    nameChanged(): void;
    nameStateChanged(): void;
    checkedChanged(): void;
    selectedInputItemElsChanged(): void;
    changeCallbackChanged(): void;
    onClick(e: MouseEvent): void;
    handleKeyDown(e: KeyboardEvent): void;
    componentWillLoad(): void;
    componentDidUnload(): void;
    private getInputType;
    private check;
    private initHiddenFormInputEl;
    private updateHiddenFormInputEl;
    private setInvokeChangeCallback;
    private getName;
    private description;
    private getHostClassNames;
    private getComponentClassNames;
    render(): any;
}
