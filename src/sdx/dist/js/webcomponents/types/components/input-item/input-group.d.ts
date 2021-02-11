import { InputGroupState } from "./input-group-store";
import { InputItemType, Theme } from "./types";
export declare class InputGroup {
    private store;
    private unsubscribe;
    private invokeChangeCallback;
    private componentChildrenWillLoadComplete;
    private componentDidLoadComplete;
    private valueChangedInProgress;
    private selectedInputItemElsChangedInProgress;
    el: HTMLSdxInputGroupElement;
    typeState: InputGroupState["typeState"];
    themeState: InputGroupState["themeState"];
    nameState: InputGroupState["nameState"];
    groupLabel: InputGroupState["groupLabel"];
    selectedInputItemEls: InputGroupState["selectedInputItemEls"];
    selectNextInputItemElFrom: InputGroupState["selectNextInputItemElFrom"];
    selectPreviousInputItemElFrom: InputGroupState["selectPreviousInputItemElFrom"];
    inputItemElsSorted: InputGroupState["inputItemElsSorted"];
    /**
     * The form input variant of the item.
     */
    type: InputItemType;
    /**
     * Styling theme for the input items within this group.
     */
    theme: Theme;
    /**
     * Callback when the checking an option.
     */
    changeCallback: ((selection: any[]) => void) | string | undefined;
    /**
     * Name parameter (useful when the item is embedded in a traditional HTML form submit).
     */
    name: string;
    /**
     * Display all input items in a row (for maximum two items &mdash; more items should be embedded in a grid).
     */
    inline: boolean;
    /**
     * Label of the input group.
     */
    label: string;
    /**
     * The value(s) of the currently checked items(s).
     * Please note that this is always an array, even when type="checkbox",
     * for both getting and setting the value <code>(e.g. myGroup.value = [ "value1" ])</code>).
     * Note that when being used for setting the initial value, the "checked" attribute on
     * the <code>&lt;sdx-input-item /&gt;</code> has the higher priority.
     */
    value: any[];
    /**
     * Set this to false to declare the component as invalid (and use the "validation-message" attribute to explain why).
     */
    valid?: boolean;
    /**
     * Text that explains the validation status to the user.
     */
    validationMessage?: string;
    /**
     * Marks the component as required (please note that this itself does not handle validation &mdash;
     * use the "valid" and "validation-message" for that).
     */
    required: boolean;
    typeChanged(): void;
    changeCallbackChanged(): void;
    nameChanged(): void;
    groupLabelChanged(): void;
    inlineChanged(): void;
    valueChanged(): void;
    selectedInputItemElsChanged(): void;
    selectNextInputItemElFromChanged(): void;
    selectPreviousInputItemElFromChanged(): void;
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    getSelection(): Promise<any[]>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private getInitialState;
    private setInvokeChangeCallback;
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all input items matching the values will also be returned.
     */
    private getByValues;
    private getComponentClassNames;
    private getSlotClassNames;
    render(): any;
}
