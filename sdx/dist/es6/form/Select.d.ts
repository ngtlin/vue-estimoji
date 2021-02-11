import DomElement from "../DomElement";
/**
 * The select component API.
 */
declare class Select extends DomElement<HTMLSelectElement> {
    private _openByFocus;
    private _multiselection;
    private _clickHandler;
    private _handleDropdownClick;
    private _keydownHandler;
    private _focusHandler;
    private _blurHandler;
    private _windowClickHandler;
    private _filterKeydownHandler;
    private _filterKeyupHandler;
    private _filterFocusHandler;
    private _wrapperElement;
    private _dropdownElement;
    private _selectButtonElement;
    private _thumbElement;
    private _placeholderOption?;
    private _placeholderElement;
    private _placeholderText;
    private _lastHandledEvent?;
    private _lastSelectedOption?;
    private _minFilterLength;
    private _activeFilter?;
    private _initialOptions;
    constructor(element: HTMLSelectElement);
    /**
     * Initializes the select component.
     *
     * This method inspects the select definition and its options and
     * generates new stylable DOM elements around the original select-element
     * definitions.
     * @private
     */
    protected _initialize(): void;
    protected _setupTarget(): void;
    protected _setupPlaceholder(): void;
    protected _updateMessage(): void;
    private _isOptGroup;
    private _isOption;
    protected _createOptions(element: HTMLSelectElement): void;
    protected _createOption(option: HTMLOptionElement): DomElement<Element> | undefined;
    protected _appendGroup(optgroup: HTMLOptGroupElement): DomElement<Element>;
    protected _updateSize(): void;
    protected _isButtonTarget(target: EventTarget): boolean;
    protected _isDropdownTarget(target: EventTarget): boolean;
    /**
     * Updates the UI if the selection has changed and makes sure the
     * select control and the generated markup are synchronized.
     * @private
     */
    protected _selectedItemChanged(newItem: Element, autoClose?: boolean, multiselect?: boolean): void;
    protected _updatePlaceholder(hasSelectedItems: boolean): void;
    protected _getSelectedOptions(): HTMLOptionElement[];
    /**
     * Clone all of the initially set options (and optgroups) and returns them in a new array.
     * This serves as the basis for filtering. If a filter is present, it will be respected.
     */
    private getInitialOptions;
    /**
     * Returns true if a text contains a given keyword, e.g. in "ca" in "Car"
     */
    private _containsWord;
    protected _handleFocus(): void;
    protected _handleBlur(): void;
    protected _handleClick(event: Event): void;
    protected _handleWindowClick(event: MouseEvent): void;
    protected _focusOptionStartingWith(keycode: number, startIndex: number, options: NodeListOf<HTMLElement>): DomElement<HTMLElement> | undefined;
    protected _handleKeydown(event: Event): void;
    /**
     * Fired when the user presses a key in the filter field
     */
    private _handleFilterKeydown;
    /**
     * Fired when the user releases a key in the filter field
     */
    private _handleFilterKeyup;
    /**
     * Fired when the user focusses the filter input field
     */
    private _handleFilterFocus;
    /**
     * Filters the Select by a given filter keyword
     * @param filter Keyword to filter by
     */
    private _setFilter;
    /**
     * Resets the filter
     */
    private _clearFilter;
    /**
     * Set new content and reload the Select
     * @param elements Array of new option (or optgroup) elements to display
     */
    private setOptions;
    /**
     * Clear all children of a given node
     * @param node Node
     */
    private _emptyNode;
    /**
     * Returns whether an option is a placeholder option
     */
    private _isPlaceholder;
    /**
     * Update placeholder value
     * @param text Content of the placeholder
     */
    protected _setPlaceholder(text: string): void;
    /**
     * Gets the value of the currently selected option.
     * If multiple selection is enabled this property returns an array of values.
     */
    get value(): string | string[] | null;
    /**
     * Enables or disables the select component depending on the
     * 'value' parameter.
     * @param {value} If true disables the control; false enables it.
     */
    set disabled(value: boolean);
    /**
     * Reloads the dropdown's option data definitions from the DOM and updates
     * the generated dropdown display items.
     */
    reload(): void;
    /**
     * Sets the select control to the enabled state.
     */
    enable(): void;
    /**
     * Sets the select control to the disabled state.
     */
    disable(): void;
    /**
     * Toggles the open/closed state of the select dropdown.
     */
    toggle(): void;
    /**
     * Gets if the select dropdown is open or closed.
     * @return {boolean} True if open; otherwise false.
     */
    isOpen(): boolean;
    /**
     * Opens the select dropdown.
     */
    open(): void;
    /**
     * Closes the select dropdown.
     */
    close(): void;
    /**
     * Returns true when the element has the filter modifier class
     */
    private _isFilterable;
    /**
     * Destroys the component and clears all references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Select;
