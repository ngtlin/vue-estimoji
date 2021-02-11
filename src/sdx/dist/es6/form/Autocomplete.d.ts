import DomElement from "../DomElement";
export interface Source {
    (term: string, callback: (matches: string[], termused: string) => void): void;
}
export interface AutocompleteConfig {
    minChars: number;
    source: Source;
}
/**
 * Autocomplete component
 * @fires Autocomplete#change
 */
declare class Autocomplete extends DomElement<HTMLElement> {
    private _source;
    private _minChars;
    private _input;
    private _suggestionList;
    private _dropdown;
    private _clickHandler;
    private _windowClickHandler;
    private _keyUpHandler;
    private _keyDownHandler;
    private _blurHandler;
    constructor(element: HTMLElement, configuration?: AutocompleteConfig);
    /**
     * Initializes the Autocomplete component.
     * @private
     */
    protected _initialize(): void;
    /**
     * The Autocomplete component configuration object
     * @callback Autocomplete~Suggest
     * @property {String} term - The current search term.
     * @property {String[]} matches - The list of matching strings.
     */
    /**
     * The Autocomplete component configuration object
     * @callback Autocomplete~Source
     * @property {String} term - The current search term.
     * @property {Autocomplete~Suggest} suggest - The autocomplete callback function to report the results.
     */
    /**
     * The Autocomplete component configuration object
     * @typedef {Object} Autocomplete~Config
     * @property {Number} minChars - The minimal required characters to start querying for autocomplete matches.
     * @property {Autocomplete~Source} source - The autocomplete source function.
     */
    /**
     * Updates the autocomplete component configuration for the current instance
     * @param {Autocomplete~Config} configuration The configuration object
     */
    configure(configuration?: AutocompleteConfig): void;
    /**
     * Sets the select control to the enabled state.
     */
    enable(): void;
    /**
     * Sets the select control to the disabled state.
     */
    disable(): void;
    /**
     * Destroys the component and frees all references.
     */
    destroy(): void;
    /**
     * Closes the suggestions dropdown.
     */
    open(): void;
    /**
     * Opens the suggestions dropdown.
     */
    close(): void;
    /**
     * Gets the value of the input field.
     * @returns {String} The value of the input field.
     */
    get value(): string;
    protected _handleClick(event: MouseEvent): void;
    protected _handleBlur(): void;
    protected _handleKeyUp(evt: KeyboardEvent): void;
    protected _handleKeyDown(evt: KeyboardEvent): void;
    protected _handleWindowClick(event: MouseEvent): void;
    protected _selectItem(item?: Element | null): void;
    protected _isDropdownTarget(target: Node): boolean;
    protected _clearSuggestions(): void;
    protected _addSuggestion(text: string, term: string): void;
    protected _getSuggestion(term: string): void;
    protected _onMatchesReceived(matches: string[], term: string): void;
}
/**
 * Change event
 *
 * @event Autocomplete#change
 * @type {object}
 */
export declare function init(): void;
export default Autocomplete;
