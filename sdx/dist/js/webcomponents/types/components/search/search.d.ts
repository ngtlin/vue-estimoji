export declare class Search {
    private sdxInputEl?;
    private invokeSearchSubmitCallback;
    private invokeValueChangeCallback;
    private invokeChangeCallback;
    private resizeTimer?;
    el: HTMLSdxSearchElement;
    /**
     * Can be used for both reading and writing the value.
     */
    value: string;
    /**
     * Default text that will disappear on type.
     */
    placeholder: string;
    /**
     * Text for the screen reader labelling the search input field.
     */
    srHint: string;
    /**
     * Button text for the screen reader to read in place of the search icon.
     */
    srHintForButton: string;
    /**
     * Callback that will fire on hitting enter or on clicking the button.
     */
    searchSubmitCallback?: ((value: string) => void) | string;
    /**
     * Callback that will fire when the value has changed, regardless of method (keyboard or programmatical).
     */
    changeCallback?: ((value: string) => void) | string;
    /**
     * @private Deprecated, use "changeCallback"
     * Callback that will fire when the value has changed, regardless of method (keyboard or programmatical). Same as changeCallback.
     */
    valueChangeCallback?: ((value: string) => void) | string;
    valueChanged(): void;
    searchSubmitCallbackChanged(): void;
    changeCallbackChanged(): void;
    valueChangeCallbackChanged(): void;
    onWindowResizeThrottled(): void;
    componentWillLoad(): void;
    private submitSearch;
    private invokeAllChangeCallbacks;
    private setInvokeSearchSubmitCallback;
    private setInvokeValueChangeCallback;
    private setInvokeChangeCallback;
    private isClearIconHidden;
    private clear;
    render(): any;
}
