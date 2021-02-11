import { KeyboardBehavior } from "./types";
import { SelectState } from "./select-store";
import { BackgroundTheme, Display } from "../../core/types/types";
export declare class Select {
    private listContainerEl?;
    private componentEl?;
    private wrapperEl?;
    private filterInputEl?;
    private focussedEl?;
    private invokeSelectCallback;
    private invokeChangeCallback;
    private invokeFocusCallback;
    private invokeBlurCallback;
    private direction;
    private clicking;
    private placeholderWhenOpened;
    private componentChildrenWillLoadComplete;
    private componentDidLoadComplete;
    private store;
    private unsubscribe;
    private hasFilterInputElFocus;
    private hadFilterInputElFocus;
    private static readonly maxAutocompleteOptionsMobile;
    private static readonly maxAutocompleteOptionsDesktop;
    private static readonly minSpaceToWindow;
    private lightDOMHiddenFormInputEls;
    private blockScrollingWhenOpened;
    private valueChangedInProgress;
    private selectionSortedChangedInProgress;
    el: HTMLSdxSelectElement;
    selectionSorted: SelectState["selectionSorted"];
    selectionBatch: SelectState["selectionBatch"];
    animationDuration: SelectState["animationDuration"];
    optionElsSorted: SelectState["optionElsSorted"];
    optgroupEls: SelectState["optgroupEls"];
    filter: SelectState["filter"];
    display: Display;
    foundMatches: number;
    focussed: boolean;
    filterInputElValue: SelectState["filter"];
    /**
     * Text to be displayed when nothing is selected.
     */
    placeholder: string;
    /**
     * Enable multi select.
     */
    multiple: boolean;
    /**
     * Will be written on the top of the sdx-select.
     */
    label: string;
    /**
     * Description text read by the screen reader.
     */
    srHint: string;
    /**
     * Disables the sdx-select.
     */
    disabled: boolean;
    /**
     * Shows a loading spinner and disables the sdx-select.
     */
    loading: boolean;
    /**
     * How the component should behave when the user types something on the keyboard.
     * "focus" jumps to and focuses the option starting with the typed character.
     * "filter" lists only options (and optgroups) that match the entered keyword.
     * "autocomplete" is similar to "filter", but makes the component behave more
     * like an input field, e.g. the "value" reflects the content of the filter and
     * there is no thumb to open or close.
     */
    keyboardBehavior: KeyboardBehavior;
    /**
     * @private Deprecated, use "keyboard-behavior"
     * Filter the options of the sdx-select by typing.
     * Shortcut for keyboard-behavior="filter"
     */
    filterable: boolean;
    /**
     * Maximum dropdown height (e.g. "300px"), supported units are "px" and "vh".
     * If no unit is provided, "px" will be used.
     */
    maxHeight?: string | number;
    /**
     * Callback when user selects an option (and the select is *not* in "autocomplete" mode).
     */
    selectCallback?: ((selection: any[]) => void) | string;
    /**
     * Callback when user selects an option (or types something while in "autocomplete" mode).
     */
    changeCallback?: ((selection: any[]) => void) | string;
    /**
     * Callback that will fire when the input gets focus. Used when "keyboard-behavior" is "filter" or "autocomplete".
     */
    focusCallback?: (() => void) | string;
    /**
     * Callback that will fire when the input loses focus. Used when "keyboard-behavior" is "filter" or "autocomplete".
     */
    blurCallback?: (() => void) | string;
    /**
     * Label for "no matches found".
     */
    noMatchesFoundLabel: string;
    /**
     * Background color scheme.
     */
    backgroundTheme: BackgroundTheme;
    /**
     * The value(s) of the currently selected option(s).
     * Please note that this is always an array, even without the "multiple" attribute,
     * for both getting and setting the value <code>(e.g. mySelect.value = [ "value1" ])</code>).
     * Note that when being used for setting the initial value, the "selected" attribute on
     * the <code>&lt;sdx-select-option /&gt;</code> has the higher priority.
     */
    value: any[];
    /**
     * Name parameter (useful when the item is embedded in a traditional HTML form submit).
     */
    name?: string;
    /**
     * Function that decides whether an option element matches a filter by returning true or
     * false. Defaults to a function that performs a simple string match test on the option
     * elements textContent property. Used when "keyboard-behavior" is "filter" or "autocomplete".
     */
    filterFunction?: ((optionEl: HTMLSdxSelectOptionElement, keyword: string) => boolean) | string;
    /**
     * Set this to false to declare the component as invalid (note that this only works with when the "validation-message" attribute is set - and vice versa).
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
     * Disable animations for testing.
     */
    animated: boolean;
    valueChanged(): void;
    selectionSortedChanged(): void;
    selectCallbackChanged(): void;
    changeCallbackChanged(): void;
    focusCallbackChanged(): void;
    blurCallbackChanged(): void;
    placeholderChanged(): void;
    nameChanged(): void;
    filterFunctionChanged(): void;
    multipleChanged(): void;
    onFocus(): void;
    onMouseDown(): void;
    onMouseUp(): void;
    onBlur(): void;
    onWindowClick(e: MouseEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    getSelection(): Promise<any[]>;
    /**
     * Toggles the sdx-select.
     */
    toggle(): Promise<void>;
    /**
     * Opens the sdx-select.
     */
    open(): Promise<void>;
    /**
     * Closes the sdx-select.
     */
    close(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    private getInitialState;
    private resetFilter;
    private setFilterFunction;
    private resetFilterInputEl;
    private clearFilter;
    /**
     * Set dimensions of list container element.
     */
    private positionListContainerEl;
    private defaultFilterFunction;
    /**
     * Returns true if an option element matches the filter (e.g. in "ca" in "Car").
     * @param el The option to be tested.
     * @param keyword The Filter to be tested.
     */
    private optionElMatchesFilter;
    private isValidFilter;
    private isValidAutocomplete;
    private setFocussedEl;
    /**
     * Scrolls the list the way that an option is visible in the center.
     */
    private scrollToOption;
    /**
     * Returns all options starting with a certain letter.
     * @param letter Key value to look for.
     */
    private getOptionsByFirstLetter;
    /**
     * Sets the focussed option starting by a given letter.
     * @param letter Key value to look for.
     */
    private setFocussedElByFirstLetter;
    /**
     * Checks if a given element is part of the sdx-select or the sdx-select itself.
     * Warning: this only works if the sdx-select isn't inside of a shadow-root!
     * @param el Element to check.
     */
    private isSelectEl;
    /**
     * Determines whether the placeholder option should be rendered:
     *  - when no selection is in progress (user experience: list should not rerender while open),
     *  - when something is selected,
     *  - the placeholder prop exists
     *  - and when single select
     */
    private showPlaceholder;
    /**
     * Get the text that will be displayed in the selection header.
     * Fall back to an empty string if there's no selection.
     */
    private getFormattedSelection;
    private setInvokeSelectCallback;
    private setInvokeChangeCallback;
    private setInvokeFocusCallback;
    private setInvokeBlurCallback;
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all options matching the values will also be returned.
     */
    private getByValues;
    private onHeaderClick;
    private onFilterInputElFocus;
    private onFilterInputElBlur;
    private onFilterInputElChange;
    private onFilterInputElInput;
    /**
     * Marks an option for selection (but does not commit yet - this happens in this.componentDidUpdate()).
     * @param option Instance of SelectOption to be selected.
     * @param strategy How to handle the selection (e.g. add or remove).
     * @param didClick If invoked by the user
     */
    private select;
    private updateHiddenFormInputEl;
    /**
     * True if this sdx-select is filterable using a filter input field.
     */
    private isFilterable;
    /**
     * Checks which "keyboard-behavior" prop is set, including backwards
     * compatibility with the deprecated "filterable" prop.
     * @param keyboardBehavior Behavior to test.
     */
    private isKeyboardBehavior;
    private getMatchingOptionElsCount;
    private isAutocomplete;
    private hasVisibleOptionEls;
    private isOpenOrOpening;
    private isClosedOrClosing;
    /**
     * Normalizes max-height prop, e.g.:
     * 200 => "200px"
     * "50vh" => "50vh"
     */
    private getMaxHeight;
    private getDefaultInputFieldProps;
    private getComponentClassNames;
    private getInputStyle;
    render(): any;
}
