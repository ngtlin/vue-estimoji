import { Component, h, Element, Method, Listen, Prop, State, Watch, Host, forceUpdate } from "@stencil/core";
import anime from "animejs";
import bodyScrollLock from "body-scroll-lock";
import { selectReducer } from "./select-store";
import { isDesktopOrLarger } from "../../core/helpers/breakpoint-helpers";
import { createAndInstallStore, mapStateToProps } from "../../core/helpers/store-helpers";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class Select {
    constructor() {
        this.invokeSelectCallback = () => null;
        this.invokeChangeCallback = () => null;
        this.invokeFocusCallback = () => null;
        this.invokeBlurCallback = () => null;
        this.direction = "bottom";
        this.clicking = false;
        this.placeholderWhenOpened = null;
        this.componentChildrenWillLoadComplete = false;
        this.componentDidLoadComplete = false;
        this.hasFilterInputElFocus = false;
        this.hadFilterInputElFocus = false;
        // A "native" hidden DOM element that is submitted
        // when the sdx-select is used in a traditional form,
        // one for each value (in case of "multiple").
        this.lightDOMHiddenFormInputEls = [];
        // Disable scrolling when open:
        // It should not be possible to scroll the page while a select is open (just
        // like with a native select), but doing so removes the scrollbars on Windows,
        // which leads to a nasty glitch ("jumpy content"). There are "thin scrollbars"
        // in Windows 10 since v1804 (April 2018), but browsers do not seem to
        // implement that, see:
        // https://stackoverflow.com/questions/57160504/windows-10-thin-scrollbars-but-not-in-all-apps
        // That's why it's currently turned off, until there's no solution from Microsoft.
        this.blockScrollingWhenOpened = false;
        // When the selection changes by setting `this.value = [ "one", "two", ... ]`,
        // the selected options will be updated - but syncing back to "this.value"
        // is necessary, as long as `this.value` is valid.
        // These flag control in which way the sync happens.
        this.valueChangedInProgress = false;
        this.selectionSortedChangedInProgress = false;
        this.filter = "";
        this.display = "closed";
        this.foundMatches = 0;
        this.focussed = false;
        this.filterInputElValue = "";
        /**
         * Text to be displayed when nothing is selected.
         */
        this.placeholder = "";
        /**
         * Enable multi select.
         */
        this.multiple = false;
        /**
         * Will be written on the top of the sdx-select.
         */
        this.label = "";
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
        /**
         * Disables the sdx-select.
         */
        this.disabled = false;
        /**
         * Shows a loading spinner and disables the sdx-select.
         */
        this.loading = false;
        /**
         * How the component should behave when the user types something on the keyboard.
         * "focus" jumps to and focuses the option starting with the typed character.
         * "filter" lists only options (and optgroups) that match the entered keyword.
         * "autocomplete" is similar to "filter", but makes the component behave more
         * like an input field, e.g. the "value" reflects the content of the filter and
         * there is no thumb to open or close.
         */
        this.keyboardBehavior = "focus";
        /**
         * @private Deprecated, use "keyboard-behavior"
         * Filter the options of the sdx-select by typing.
         * Shortcut for keyboard-behavior="filter"
         */
        this.filterable = false;
        /**
         * Label for "no matches found".
         */
        this.noMatchesFoundLabel = "No matches found...";
        /**
         * Background color scheme.
         */
        this.backgroundTheme = "light";
        /**
         * The value(s) of the currently selected option(s).
         * Please note that this is always an array, even without the "multiple" attribute,
         * for both getting and setting the value <code>(e.g. mySelect.value = [ "value1" ])</code>).
         * Note that when being used for setting the initial value, the "selected" attribute on
         * the <code>&lt;sdx-select-option /&gt;</code> has the higher priority.
         */
        this.value = [];
        /**
         * Name parameter (useful when the item is embedded in a traditional HTML form submit).
         */
        this.name = undefined;
        /**
         * Marks the component as required (please note that this itself does not handle validation &mdash; use the "valid" and "validation-message" for that).
         */
        this.required = false;
        /**
         * @private
         * Disable animations for testing.
         */
        this.animated = true;
    }
    valueChanged() {
        // Update the filter when "autocomplete" and stop doing anything else
        if (this.isAutocomplete()) {
            const filter = this.value[0] || "";
            this.store.dispatch({ type: "SET_FILTER", filter });
            this.filterInputElValue = filter;
            this.updateHiddenFormInputEl();
            this.invokeChangeCallback(this.value);
            return;
        }
        const { validValues, validatedValues, optionEls } = this.getByValues(this.value);
        this.valueChangedInProgress = true;
        if (!validValues) {
            this.value = validatedValues;
            return;
        }
        this.updateHiddenFormInputEl();
        // Invoke change callback (after component has been fully initialized)
        if (this.componentDidLoadComplete) {
            this.invokeChangeCallback(this.value);
        }
        // Update the selection
        if (!this.selectionSortedChangedInProgress) {
            // Set selection
            this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls });
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        // Invoke select callback (after component has been fully initialized)
        if (this.componentDidLoadComplete) {
            this.invokeSelectCallback(this.value);
        }
        this.valueChangedInProgress = false;
    }
    selectionSortedChanged() {
        // Wait for the component and its children to be initialized
        // completely (store setup, etc.) before continuing
        if (!this.componentChildrenWillLoadComplete) {
            return;
        }
        this.selectionSortedChangedInProgress = true;
        // If there are options, but without default selection, and no placeholder,
        // fall back by selecting first option element
        if (this.optionElsSorted.length && !this.selectionSorted.length && !this.placeholder) {
            this.store.dispatch({
                type: "SELECT",
                optionEl: this.optionElsSorted[0],
                strategy: "add"
            });
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        // Update the "value"
        if (!this.valueChangedInProgress) {
            const { validatedValues } = this.getByValues(this.selectionSorted.map((el) => el.value));
            this.value = validatedValues;
        }
        // Set the filter input field to the selected value
        if (this.isFilterable()) {
            this.resetFilterInputEl();
        }
        this.selectionSortedChangedInProgress = false;
    }
    selectCallbackChanged() {
        this.setInvokeSelectCallback();
    }
    changeCallbackChanged() {
        this.setInvokeChangeCallback();
    }
    focusCallbackChanged() {
        this.setInvokeFocusCallback();
    }
    blurCallbackChanged() {
        this.setInvokeBlurCallback();
    }
    placeholderChanged() {
        this.resetFilter();
    }
    nameChanged() {
        this.updateHiddenFormInputEl();
    }
    filterFunctionChanged() {
        this.setFilterFunction();
    }
    multipleChanged() {
        this.store.dispatch({ type: "SET_MULTIPLE", multiple: this.multiple });
    }
    onFocus() {
        // Ignore if focus is gained by clicking - this will be handled in onClick
        if (!this.clicking) {
            // NOP
        }
        this.focussed = true;
    }
    onMouseDown() {
        this.clicking = true;
    }
    onMouseUp() {
        this.clicking = false;
    }
    onBlur() {
        // Ignore if focus is lost by clicking - this will be handled in onClick
        if (!this.clicking) {
            this.close();
        }
        this.focussed = false;
    }
    onWindowClick(e) {
        if (!this.isSelectEl(e.target)) {
            this.close();
        }
    }
    onKeyDown(e) {
        // Only listen to key events if Select is focussed
        if (!this.focussed) {
            return;
        }
        switch (e.which) {
            // Open focussed select
            case 32: // "space"
                const shadowRoot = this.el.shadowRoot;
                // Only listen to "space" keydown if the input element (for filterable) is not focussed,
                // otherwise the user wouldn't be able to type white spaces anymore.
                // Make sure it also works on old browsers by checking if shadowRoot.activeElement,
                // which never exists on them.
                if (!shadowRoot.activeElement || shadowRoot.activeElement !== this.filterInputEl) {
                    e.preventDefault(); // Prevent scrolling
                    // For single select, it's possible to select with space
                    if (this.isOpenOrOpening() && !this.multiple && this.focussedEl) {
                        this.focussedEl.click();
                    }
                    else {
                        this.toggle();
                    }
                }
                break;
            // Select currently focussed element
            case 13: // "enter"
                e.preventDefault(); // Prevent form submit on IE11 / Edge
                if (this.focussedEl) {
                    // Just act like the user has clicked on it
                    this.focussedEl.click();
                }
                break;
            // Focus previous element
            case 38: // "up"
                e.preventDefault(); // Prevent scrolling
                this.setFocussedEl("previous");
                if (this.hasVisibleOptionEls()) {
                    this.open();
                }
                break;
            // Focus next element
            case 40: // "down"
                e.preventDefault(); // Prevent scrolling
                this.setFocussedEl("next");
                if (this.hasVisibleOptionEls()) {
                    this.open();
                }
                break;
            // Close select
            case 27: // "esc"
                this.close();
                break;
            default: // any key
                const key = e.key.toLowerCase();
                const isValidKey = key.length === 1; // exclude key names like "Shift" or "LeftArrow"
                if (isValidKey) { // Assume an alphanumeric key was hit
                    // Only focus by letter if not filterable
                    if (!this.isFilterable()) {
                        this.setFocussedElByFirstLetter(key);
                    }
                }
        }
    }
    /**
     * @deprecated read the "value" prop instead
     * Returns the current selection.
     */
    async getSelection() {
        return this.value;
    }
    /**
     * Toggles the sdx-select.
     */
    toggle() {
        return new Promise((resolve) => {
            // When "autocomplete" is set, only open the menu on a certain input field value length
            if (this.isAutocomplete()) {
                if (this.isValidAutocomplete(this.filterInputElValue)) {
                    this.open().then(resolve);
                }
                else {
                    resolve();
                }
                return;
            }
            if (this.isOpenOrOpening()) {
                this.close().then(resolve);
            }
            else if (this.isClosedOrClosing()) {
                this.open().then(resolve);
            }
            else {
                resolve();
            }
        });
    }
    /**
     * Opens the sdx-select.
     */
    open() {
        return new Promise((resolve) => {
            // Only a closed select can be opened
            if (!this.isClosedOrClosing()) {
                resolve();
                return;
            }
            if (this.blockScrollingWhenOpened) {
                bodyScrollLock.disableBodyScroll(this.listContainerEl, {
                    allowTouchMove: (el) => {
                        let currentEl = el;
                        while (currentEl && currentEl !== document.body) {
                            // Check if the user is scrolling the modal body
                            if (currentEl.classList.contains("list-container")) {
                                // Check if the element overflows
                                if (currentEl.scrollHeight > currentEl.clientHeight) {
                                    return true;
                                }
                            }
                            currentEl = currentEl.parentNode;
                        }
                        return false;
                    }
                });
            }
            // Was the placeholder displayed when opening?
            this.placeholderWhenOpened = this.showPlaceholder();
            // Set dimensions
            this.positionListContainerEl();
            this.display = "opening";
            anime({
                targets: this.listContainerEl,
                scaleY: 1,
                opacity: 1,
                duration: this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.display = "open";
                    if (this.listContainerEl) {
                        this.listContainerEl.style.transform = "";
                    }
                    resolve();
                }
            });
        });
    }
    /**
     * Closes the sdx-select.
     */
    close() {
        return new Promise((resolve) => {
            // Only an open select can be closed
            if (this.display !== "open") {
                resolve();
                return;
            }
            if (this.blockScrollingWhenOpened) {
                bodyScrollLock.enableBodyScroll(this.listContainerEl);
            }
            this.display = "closing";
            // Reset focussed element
            this.setFocussedEl(null);
            anime({
                targets: this.listContainerEl,
                scaleY: 0,
                opacity: .2,
                duration: this.animationDuration,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.display = "closed";
                    this.placeholderWhenOpened = null;
                    // Blur input field (if filterable) - only an opened Select should be filterable
                    if (this.isKeyboardBehavior("filter")) {
                        this.filterInputEl.blur();
                    }
                    resolve();
                }
            });
        });
    }
    componentWillLoad() {
        this.updateHiddenFormInputEl();
        this.store = createAndInstallStore(this, selectReducer, this.getInitialState());
        this.unsubscribe = mapStateToProps(this, this.store, [
            "selectionBatch",
            "selectionSorted",
            "animationDuration",
            "optionElsSorted",
            "optgroupEls",
            "filter"
        ]);
        this.store.dispatch({ type: "SET_MULTIPLE", multiple: this.multiple });
        this.store.dispatch({ type: "SET_SELECT", select: this.select.bind(this) });
        this.store.dispatch({ type: "SET_ANIMATION_DURATION", animationDuration: this.animationDuration });
        this.setInvokeSelectCallback();
        this.setInvokeChangeCallback();
        this.setInvokeFocusCallback();
        this.setInvokeBlurCallback();
        this.setFilterFunction();
        // Default filter value
        this.resetFilterInputEl();
    }
    componentDidLoad() {
        // All children are now ready
        this.componentChildrenWillLoadComplete = true;
        this.store.dispatch({ type: "COMMIT_OPTION_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_OPTGROUP_ELS_BATCH" });
        // Initial selection:
        // If there are "selected" options, use those.
        // If not, check if there's a value prop on the component and use that instead.
        // Otherwise, it will fall back to the first option at a later point in time.
        if (this.selectionBatch.length) {
            this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
        }
        else {
            const { validValues, optionEls } = this.getByValues(this.value);
            if (validValues) {
                this.store.dispatch({ type: "SET_SELECTION_BATCH", optionEls });
                this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
            }
        }
        // Initial settings for list container element
        this.listContainerEl.style.opacity = ".2";
        this.listContainerEl.style.transform = "scaleY(0)";
        this.positionListContainerEl();
        this.componentDidLoadComplete = true;
    }
    componentDidUpdate() {
        // Here, it's certain that all child elements were handled
        this.store.dispatch({ type: "COMMIT_OPTION_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_OPTGROUP_ELS_BATCH" });
        this.store.dispatch({ type: "COMMIT_SELECTION_BATCH" });
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    getInitialState() {
        const initialSelection = [];
        const initialOptionEls = [];
        const initialOptgroupEls = [];
        return {
            selection: initialSelection,
            selectionBatch: initialSelection,
            selectionSorted: initialSelection,
            multiple: false,
            direction: "bottom",
            select: () => null,
            animationDuration: this.animated ? 200 : 0,
            optionEls: initialOptionEls,
            optionElsBatch: initialOptionEls,
            optionElsSorted: initialOptionEls,
            optgroupEls: initialOptgroupEls,
            optgroupElsBatch: initialOptgroupEls,
            filter: "",
            filterFunction: () => true
        };
    }
    // Resets the whole filter system
    resetFilter() {
        if (this.isFilterable()) {
            this.resetFilterInputEl();
            this.clearFilter();
        }
    }
    // Parses and injects the "filter-function" prop into the store
    setFilterFunction() {
        this.store.dispatch({
            type: "SET_FILTER_FUNCTION",
            filterFunction: this.optionElMatchesFilter.bind(this)
        });
    }
    // Write the current selection into the filter input field
    resetFilterInputEl() {
        this.filterInputElValue = this.getFormattedSelection();
    }
    // Clears the filter
    clearFilter() {
        this.store.dispatch({ type: "SET_FILTER", filter: "" });
    }
    /**
     * Set dimensions of list container element.
     */
    positionListContainerEl() {
        if (!(this.componentEl && this.wrapperEl && this.listContainerEl)) {
            return;
        }
        // Height calculation
        this.listContainerEl.style.maxHeight = this.getMaxHeight() || "none";
        const wrapperElRect = this.wrapperEl.getBoundingClientRect();
        const listContainerElHeight = this.listContainerEl.clientHeight;
        const spaceTowardsTop = wrapperElRect.top - Select.minSpaceToWindow;
        const spaceTowardsBottom = innerHeight - wrapperElRect.bottom - Select.minSpaceToWindow;
        let maxHeight = this.listContainerEl.style.maxHeight;
        if (spaceTowardsBottom >= listContainerElHeight) { // enough space towards bottom
            this.direction = "bottom";
        }
        else if (spaceTowardsTop >= listContainerElHeight) { // enough space towards top
            this.direction = "top";
        }
        else if (spaceTowardsTop > spaceTowardsBottom) { // not enough space, take top if larger
            maxHeight = `${spaceTowardsTop}px`;
            this.direction = "top";
        }
        else { // not enough space anywhere, fall back to bottom
            maxHeight = `${spaceTowardsBottom}px`;
            this.direction = "bottom";
        }
        this.listContainerEl.style.maxHeight = maxHeight;
        if (this.direction === "bottom") {
            this.listContainerEl.style.bottom = "auto"; // "Reset" if opened towards "top" before
        }
        else {
            this.listContainerEl.style.bottom = `${this.wrapperEl.clientHeight}px`;
        }
        this.listContainerEl.style.transformOrigin = (this.direction === "top") ? "0 100%" : "50% 0";
        // Propagate newly calculated direction
        this.store.dispatch({
            type: "SET_DIRECTION",
            direction: this.direction
        });
    }
    // If no "filter-function" is present, fall back to this
    defaultFilterFunction(optionEl, keyword) {
        const textContent = optionEl.textContent;
        if (!textContent) {
            return false;
        }
        return textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    }
    /**
     * Returns true if an option element matches the filter (e.g. in "ca" in "Car").
     * @param el The option to be tested.
     * @param keyword The Filter to be tested.
     */
    optionElMatchesFilter(el, keyword) {
        let filterFunction = this.defaultFilterFunction;
        // If a "filter-function" prop has been passed, use this instead
        if (this.filterFunction) {
            filterFunction = wcHelpers.parseFunction(this.filterFunction);
        }
        let match = filterFunction(el, keyword);
        // When "autocomplete", all options should be hidden when there's no keyword,
        // while when in "filter", all options should be shown when there's no keyword
        if (this.isAutocomplete() && !keyword) {
            match = false;
        }
        // In "autocomplete", display only a certain number of option elements (UX)
        if (this.isAutocomplete()) {
            const allOptionEls = this.el.querySelectorAll("sdx-select-option");
            let visibleOptionElsCount = 0;
            for (let i = 0; i < allOptionEls.length; i++) {
                const optionEl = allOptionEls[i];
                if (el !== optionEl && optionEl.style.display !== "none") {
                    visibleOptionElsCount++;
                }
            }
            if ((isDesktopOrLarger() && visibleOptionElsCount >= Select.maxAutocompleteOptionsDesktop)
                ||
                    (!isDesktopOrLarger() && visibleOptionElsCount >= Select.maxAutocompleteOptionsMobile)) {
                match = false;
            }
        }
        // Make sure this.getMatchingOptionsCount() gets called again
        forceUpdate(this.el);
        return match;
    }
    // Checks whether the keyword fulfills the requirements of being a filter.
    isValidFilter(keyword) {
        return (keyword.length >= 2 &&
            keyword !== this.getFormattedSelection() // Ignore selection as filter
        );
    }
    // Checks whether the current keyword fulfills the requirements of being an autocomplete filter.
    isValidAutocomplete(keyword) {
        return keyword.length >= 3;
    }
    setFocussedEl(which) {
        // First, unfocus all
        for (let i = 0; i < this.optionElsSorted.length; i++) {
            const optionEl = this.optionElsSorted[i];
            optionEl.classList.remove("focus");
        }
        // If no element is to be selected, clear and abort
        if (which === null) {
            delete this.focussedEl;
            return;
        }
        if (which === "previous" || which === "next") {
            const lastSelectedOptionEl = this.selectionSorted[this.selectionSorted.length - 1];
            // If there's no currently focussed element, start from the last selected element
            let focussedEl = this.focussedEl || lastSelectedOptionEl;
            if (which === "previous") {
                let previousElement = wcHelpers.getPreviousFromList(this.optionElsSorted, focussedEl);
                let count = 0;
                while (previousElement !== focussedEl && (previousElement.disabled || previousElement.style.display === "none") && (count < this.optionElsSorted.length)) {
                    previousElement = wcHelpers.getPreviousFromList(this.optionElsSorted, previousElement);
                    count++;
                }
                this.focussedEl = previousElement;
            }
            else { // "next"
                let nextElement = wcHelpers.getNextFromList(this.optionElsSorted, focussedEl);
                let count = 0;
                while (nextElement !== focussedEl && (nextElement.disabled || nextElement.style.display === "none") && (count < this.optionElsSorted.length)) {
                    nextElement = wcHelpers.getNextFromList(this.optionElsSorted, nextElement);
                    count++;
                }
                this.focussedEl = nextElement;
            }
        }
        else { // "which" is an element
            this.focussedEl = which;
        }
        if (this.focussedEl) {
            this.focussedEl.classList.add("focus");
            this.scrollToOption(this.focussedEl);
        }
    }
    /**
     * Scrolls the list the way that an option is visible in the center.
     */
    scrollToOption(option) {
        const parent = this.listContainerEl;
        const optionRect = option.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const isFullyVisible = optionRect.top >= parentRect.top && optionRect.bottom <= parentRect.top + parent.clientHeight;
        if (!isFullyVisible) {
            parent.scrollTop = optionRect.top + parent.scrollTop - parentRect.top;
        }
    }
    /**
     * Returns all options starting with a certain letter.
     * @param letter Key value to look for.
     */
    getOptionsByFirstLetter(letter) {
        const results = [];
        for (let i = 0; i < this.optionElsSorted.length; i++) {
            const option = this.optionElsSorted[i];
            if (option.textContent && option.textContent.toLowerCase().charAt(0) === letter) {
                results.push(option);
            }
        }
        return results;
    }
    /**
     * Sets the focussed option starting by a given letter.
     * @param letter Key value to look for.
     */
    setFocussedElByFirstLetter(letter) {
        const optionsByFirstLetter = this.getOptionsByFirstLetter(letter);
        if (optionsByFirstLetter.length) {
            let startIndex = 0;
            if (this.focussedEl) {
                const focussedElIndex = optionsByFirstLetter.indexOf(this.focussedEl);
                if (focussedElIndex > -1) {
                    startIndex = focussedElIndex;
                }
            }
            let option = optionsByFirstLetter[startIndex];
            if (option.disabled || option === this.focussedEl) {
                for (let i = 0; i < optionsByFirstLetter.length; i++) {
                    option = wcHelpers.getNextFromList(optionsByFirstLetter, optionsByFirstLetter[startIndex]);
                    if (option.disabled) {
                        option = null;
                    }
                    else {
                        break;
                    }
                    // Look behind
                    if (startIndex < optionsByFirstLetter.length) {
                        startIndex++;
                    }
                    else {
                        startIndex = 0;
                    }
                }
            }
            if (option) {
                this.setFocussedEl(option);
            }
        }
    }
    /**
     * Checks if a given element is part of the sdx-select or the sdx-select itself.
     * Warning: this only works if the sdx-select isn't inside of a shadow-root!
     * @param el Element to check.
     */
    isSelectEl(el) {
        return !!wcHelpers.closest(el, this.el);
    }
    /**
     * Determines whether the placeholder option should be rendered:
     *  - when no selection is in progress (user experience: list should not rerender while open),
     *  - when something is selected,
     *  - the placeholder prop exists
     *  - and when single select
     */
    showPlaceholder() {
        const showPlaceholder = !!this.selectionSorted.length && !!this.placeholder && !this.multiple && !this.required;
        if (this.placeholderWhenOpened !== null) {
            return this.placeholderWhenOpened;
        }
        return showPlaceholder;
    }
    /**
     * Get the text that will be displayed in the selection header.
     * Fall back to an empty string if there's no selection.
     */
    getFormattedSelection() {
        return this.selectionSorted.length
            ? this.selectionSorted.map((optionEl) => {
                const text = optionEl.textContent;
                return text ? text.trim() : "";
            }).join(", ")
            : "";
    }
    setInvokeSelectCallback() {
        this.invokeSelectCallback = wcHelpers.parseFunction(this.selectCallback);
    }
    setInvokeChangeCallback() {
        this.invokeChangeCallback = wcHelpers.parseFunction(this.changeCallback);
    }
    setInvokeFocusCallback() {
        this.invokeFocusCallback = wcHelpers.parseFunction(this.focusCallback);
    }
    setInvokeBlurCallback() {
        this.invokeBlurCallback = wcHelpers.parseFunction(this.blurCallback);
    }
    /**
     * Checks if an array of values is valid and create a valid version of it.
     * For convenience, all options matching the values will also be returned.
     */
    getByValues(values) {
        if (Array.isArray(values)) {
            if (!values.length) {
                // Nothing to do, don't replace [] with [] because of change detection
                return { validValues: true, validatedValues: values, optionEls: [] };
            }
            // Filter out undefined values
            const definedValues = values.filter((value) => value !== undefined);
            if (!definedValues.length) {
                // Either only undefined values or completely empty
                return { validValues: false, validatedValues: [], optionEls: [] };
            }
            const validatedValues = [];
            const optionEls = [];
            let isValid = true;
            // Check if values exist in the options
            for (let i = 0; i < definedValues.length; i++) {
                const value = definedValues[i];
                const foundOptionEl = this.optionElsSorted.find((el) => el.value === value);
                if (foundOptionEl) {
                    if (this.multiple || (!this.multiple && i === 0)) {
                        optionEls.push(foundOptionEl);
                        validatedValues.push(foundOptionEl.value);
                    }
                    else {
                        // Single select should only respect one value
                        isValid = false;
                    }
                }
            }
            if (validatedValues.length === 0) { // no values found
                return { validValues: false, validatedValues, optionEls };
            }
            return { validValues: isValid, validatedValues, optionEls };
        }
        // All non-array types will be reset (to an empty array)
        return { validValues: false, validatedValues: [], optionEls: [] };
    }
    onHeaderClick(e) {
        const targetEl = e.target;
        const didClickOnSdxInputEl = !!wcHelpers.closest(targetEl, this.filterInputEl);
        if (this.isFilterable() && this.isOpenOrOpening() && didClickOnSdxInputEl && !this.hadFilterInputElFocus) {
            // Don't toggle when the user clicks on the filter input field
        }
        else {
            this.toggle();
        }
        this.hadFilterInputElFocus = this.hasFilterInputElFocus;
    }
    onFilterInputElFocus() {
        this.hasFilterInputElFocus = true;
        this.invokeFocusCallback();
    }
    onFilterInputElBlur() {
        this.hasFilterInputElFocus = false;
        this.invokeBlurCallback();
    }
    onFilterInputElChange(value) {
        this.filterInputElValue = value;
        // Update the value field if "autocomplete"
        if (this.isAutocomplete()) {
            this.value = [value];
        }
        // Set filter itself
        this.store.dispatch({
            type: "SET_FILTER",
            filter: this.isValidFilter(value) ? value : ""
        });
    }
    onFilterInputElInput(value) {
        this.filterInputElValue = value;
        // Open or close the select if the user is typing something
        if (this.isKeyboardBehavior("filter")) {
            if (this.isValidFilter(this.filter)) {
                this.open();
            }
        }
        else if (this.isKeyboardBehavior("autocomplete")) {
            if (this.isValidAutocomplete(value)) {
                this.open();
            }
            else {
                this.close();
            }
        }
    }
    /**
     * Marks an option for selection (but does not commit yet - this happens in this.componentDidUpdate()).
     * @param option Instance of SelectOption to be selected.
     * @param strategy How to handle the selection (e.g. add or remove).
     * @param didClick If invoked by the user
     */
    select(option, strategy, didClick = false) {
        if (this.multiple) {
            // Do nothing at all when disabled
            if (option.disabled && didClick) {
                return;
            }
        }
        else { // single select
            // Close immediately if the chosen option is either disabled or already selected
            if (option.isSelected() || option.disabled) { // close immediately
                if (didClick) {
                    this.close();
                }
                // Do nothing at all when disabled
                if (option.disabled) {
                    return;
                }
                // Reset filter if the user has selected an already-selected option
                this.resetFilter();
            }
        }
        if (this.isAutocomplete()) {
            if (strategy === "add") {
                // Don't select anything if "autocomplete", only set the filter
                this.filterInputElValue = option.el.textContent;
            }
        }
        else {
            // Set selection
            this.store.dispatch({
                type: "SELECT",
                optionEl: option.placeholder === true ? null : option.el,
                strategy
            });
        }
        // After single select:
        // Auto close (with a little delay for the user to see what was selected)
        if (!this.multiple) {
            if (!this.isAutocomplete()) {
                this.resetFilterInputEl();
            }
            setTimeout(() => {
                let close = Promise.resolve();
                if (didClick) {
                    close = this.close();
                }
                close.then(() => {
                    if (!this.isAutocomplete()) {
                        this.clearFilter();
                    }
                });
            }, this.animationDuration);
        }
    }
    updateHiddenFormInputEl() {
        if (this.value && this.name) {
            // Remove old hidden input elements
            this.lightDOMHiddenFormInputEls.forEach((lightDOMHiddenFormInputEl) => {
                this.el.removeChild(lightDOMHiddenFormInputEl);
            });
            this.lightDOMHiddenFormInputEls = [];
            // Create new hidden input elements
            for (let i = 0; i < this.value.length; i++) {
                const value = this.value[i];
                const lightDOMHiddenFormInputEl = document.createElement("input");
                lightDOMHiddenFormInputEl.type = "hidden";
                lightDOMHiddenFormInputEl.name = this.name;
                lightDOMHiddenFormInputEl.value = value;
                this.lightDOMHiddenFormInputEls.push(lightDOMHiddenFormInputEl);
                this.el.appendChild(lightDOMHiddenFormInputEl);
            }
        }
    }
    /**
     * True if this sdx-select is filterable using a filter input field.
     */
    isFilterable() {
        return this.isKeyboardBehavior("filter") || this.isKeyboardBehavior("autocomplete");
    }
    /**
     * Checks which "keyboard-behavior" prop is set, including backwards
     * compatibility with the deprecated "filterable" prop.
     * @param keyboardBehavior Behavior to test.
     */
    isKeyboardBehavior(keyboardBehavior) {
        const isMatch = keyboardBehavior === this.keyboardBehavior;
        if (keyboardBehavior === "filter" && (isMatch || this.filterable)) {
            return true;
        }
        return isMatch;
    }
    // Returns how many options are visible
    getMatchingOptionElsCount() {
        const optionEls = this.el.querySelectorAll("sdx-select-option");
        let count = 0;
        for (let i = 0; i < optionEls.length; i++) {
            if (optionEls[i].style.display !== "none") {
                count++;
            }
        }
        return count;
    }
    isAutocomplete() {
        return this.keyboardBehavior === "autocomplete";
    }
    hasVisibleOptionEls() {
        return this.optionElsSorted.some((optioneEl) => optioneEl.style.display !== "none");
    }
    isOpenOrOpening() {
        return this.display === "open" || this.display === "opening";
    }
    isClosedOrClosing() {
        return this.display === "closed" || this.display === "closing";
    }
    /**
     * Normalizes max-height prop, e.g.:
     * 200 => "200px"
     * "50vh" => "50vh"
     */
    getMaxHeight() {
        // No max-height prop given
        if (!this.maxHeight) {
            return undefined;
        }
        // If number, add "px"
        if (Number(this.maxHeight)) {
            return `${this.maxHeight}px`;
        }
        // Unit is already given
        return String(this.maxHeight); // TS bug? String() shouldn't be needed because of above Number()
    }
    getDefaultInputFieldProps() {
        return {
            disabled: this.disabled,
            valid: this.valid,
            srHint: `${this.label} ${this.srHint} ${this.validationMessage}`,
            required: this.required
        };
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.backgroundTheme]: true,
            [this.display]: true,
            [this.direction]: true,
            disabled: this.disabled,
            loading: this.loading,
            filterable: this.isFilterable(),
            autocomplete: this.isAutocomplete(),
            focus: this.focussed,
            invalid: this.valid === false
        };
    }
    getInputStyle() {
        const notClosed = this.display !== "closed";
        const openTowardsTop = this.direction === "top";
        const openTowardsBottom = this.direction === "bottom";
        return {
            paddingRight: this.isAutocomplete() ? "" : "48px",
            borderTopLeftRadius: notClosed && openTowardsTop ? "0" : "",
            borderTopRightRadius: notClosed && openTowardsTop ? "0" : "",
            borderBottomLeftRadius: notClosed && openTowardsBottom ? "0" : "",
            borderBottomRightRadius: notClosed && openTowardsBottom ? "0" : ""
        };
    }
    render() {
        return (h(Host, { "aria-expanded": (this.display === "open").toString() },
            h("div", { class: this.getComponentClassNames(), ref: (el) => this.componentEl = el },
                this.label && h("label", { class: "label", onClick: () => this.toggle() },
                    this.label,
                    " ",
                    this.required && h("span", { "aria-hidden": "true" }, "*")),
                h("div", { class: "wrapper", ref: (el) => this.wrapperEl = el },
                    h("div", { class: "header-wrapper" },
                        h("div", { class: "header", onClick: (e) => this.onHeaderClick(e) },
                            h("div", { class: "selection" }, this.isFilterable()
                                ? (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.filterInputElValue, ref: (el) => this.filterInputEl = el, changeCallback: (value) => this.onFilterInputElChange(value), inputCallback: (value) => this.onFilterInputElInput(value), focusCallback: () => this.onFilterInputElFocus(), blurCallback: () => this.onFilterInputElBlur(), autocomplete: "off", placeholder: this.placeholder, selectTextOnFocus: this.isKeyboardBehavior("filter"), inputStyle: this.getInputStyle() })))
                                : (h("sdx-input", Object.assign({}, this.getDefaultInputFieldProps(), { value: this.getFormattedSelection() || this.placeholder, editable: false, inputStyle: Object.assign(Object.assign({}, this.getInputStyle()), { color: this.isOpenOrOpening() ? "#1781e3" : "" // $color-int-blue
                                     }) })))),
                            (!this.isAutocomplete() || this.loading) &&
                                h("div", { class: "thumb" }, this.loading
                                    ? h("sdx-loading-spinner", null)
                                    : h("div", { class: "icon" })))),
                    h("div", { class: "list-container", ref: (el) => this.listContainerEl = el, tabIndex: -1 },
                        h("div", { class: "list" },
                            this.showPlaceholder() &&
                                h("sdx-select-option", { placeholder: true }, this.placeholder),
                            h("div", { class: "slot" },
                                h("slot", null)),
                            this.isValidFilter(this.filter) && this.getMatchingOptionElsCount() === 0 &&
                                h("div", { class: "no-matches-found" }, this.noMatchesFoundLabel)))),
                this.validationMessage &&
                    h("sdx-validation-message", { validationMessage: this.validationMessage }))));
    }
    static get is() { return "sdx-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["select.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["select.css"]
    }; }
    static get properties() { return {
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text to be displayed when nothing is selected."
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "multiple": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Enable multi select."
            },
            "attribute": "multiple",
            "reflect": false,
            "defaultValue": "false"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Will be written on the top of the sdx-select."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "srHint": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Description text read by the screen reader."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Disables the sdx-select."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "loading": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Shows a loading spinner and disables the sdx-select."
            },
            "attribute": "loading",
            "reflect": false,
            "defaultValue": "false"
        },
        "keyboardBehavior": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "KeyboardBehavior",
                "resolved": "\"autocomplete\" | \"filter\" | \"focus\"",
                "references": {
                    "KeyboardBehavior": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "How the component should behave when the user types something on the keyboard.\n\"focus\" jumps to and focuses the option starting with the typed character.\n\"filter\" lists only options (and optgroups) that match the entered keyword.\n\"autocomplete\" is similar to \"filter\", but makes the component behave more\nlike an input field, e.g. the \"value\" reflects the content of the filter and\nthere is no thumb to open or close."
            },
            "attribute": "keyboard-behavior",
            "reflect": false,
            "defaultValue": "\"focus\""
        },
        "filterable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Deprecated, use \"keyboard-behavior\"\nFilter the options of the sdx-select by typing.\nShortcut for keyboard-behavior=\"filter\"",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "filterable",
            "reflect": false,
            "defaultValue": "false"
        },
        "maxHeight": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "string | number",
                "resolved": "number | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Maximum dropdown height (e.g. \"300px\"), supported units are \"px\" and \"vh\".\nIf no unit is provided, \"px\" will be used."
            },
            "attribute": "max-height",
            "reflect": false
        },
        "selectCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((selection: any[]) => void) | string",
                "resolved": "((selection: any[]) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback when user selects an option (and the select is *not* in \"autocomplete\" mode)."
            },
            "attribute": "select-callback",
            "reflect": false
        },
        "changeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((selection: any[]) => void) | string",
                "resolved": "((selection: any[]) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback when user selects an option (or types something while in \"autocomplete\" mode)."
            },
            "attribute": "change-callback",
            "reflect": false
        },
        "focusCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the input gets focus. Used when \"keyboard-behavior\" is \"filter\" or \"autocomplete\"."
            },
            "attribute": "focus-callback",
            "reflect": false
        },
        "blurCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the input loses focus. Used when \"keyboard-behavior\" is \"filter\" or \"autocomplete\"."
            },
            "attribute": "blur-callback",
            "reflect": false
        },
        "noMatchesFoundLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label for \"no matches found\"."
            },
            "attribute": "no-matches-found-label",
            "reflect": false,
            "defaultValue": "\"No matches found...\""
        },
        "backgroundTheme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "BackgroundTheme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "BackgroundTheme": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Background color scheme."
            },
            "attribute": "background-theme",
            "reflect": false,
            "defaultValue": "\"light\""
        },
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The value(s) of the currently selected option(s).\nPlease note that this is always an array, even without the \"multiple\" attribute,\nfor both getting and setting the value <code>(e.g. mySelect.value = [ \"value1\" ])</code>).\nNote that when being used for setting the initial value, the \"selected\" attribute on\nthe <code>&lt;sdx-select-option /&gt;</code> has the higher priority."
            },
            "defaultValue": "[]"
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Name parameter (useful when the item is embedded in a traditional HTML form submit)."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "undefined"
        },
        "filterFunction": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((optionEl: HTMLSdxSelectOptionElement, keyword: string) => boolean) | string",
                "resolved": "((optionEl: HTMLSdxSelectOptionElement, keyword: string) => boolean) | string | undefined",
                "references": {
                    "HTMLSdxSelectOptionElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Function that decides whether an option element matches a filter by returning true or\nfalse. Defaults to a function that performs a simple string match test on the option\nelements textContent property. Used when \"keyboard-behavior\" is \"filter\" or \"autocomplete\"."
            },
            "attribute": "filter-function",
            "reflect": false
        },
        "valid": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Set this to false to declare the component as invalid (note that this only works with when the \"validation-message\" attribute is set - and vice versa)."
            },
            "attribute": "valid",
            "reflect": false
        },
        "validationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Text that explains the validation status to the user."
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Marks the component as required (please note that this itself does not handle validation &mdash; use the \"valid\" and \"validation-message\" for that)."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "animated": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Disable animations for testing.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "animated",
            "reflect": false,
            "defaultValue": "true"
        }
    }; }
    static get states() { return {
        "selectionSorted": {},
        "selectionBatch": {},
        "animationDuration": {},
        "optionElsSorted": {},
        "optgroupEls": {},
        "filter": {},
        "display": {},
        "foundMatches": {},
        "focussed": {},
        "filterInputElValue": {}
    }; }
    static get methods() { return {
        "getSelection": {
            "complexType": {
                "signature": "() => Promise<any[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any[]>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "deprecated",
                        "text": "read the \"value\" prop instead\nReturns the current selection."
                    }]
            }
        },
        "toggle": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Toggles the sdx-select.",
                "tags": []
            }
        },
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Opens the sdx-select.",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Closes the sdx-select.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "selectionSorted",
            "methodName": "selectionSortedChanged"
        }, {
            "propName": "selectCallback",
            "methodName": "selectCallbackChanged"
        }, {
            "propName": "changeCallback",
            "methodName": "changeCallbackChanged"
        }, {
            "propName": "focusCallback",
            "methodName": "focusCallbackChanged"
        }, {
            "propName": "blurCallback",
            "methodName": "blurCallbackChanged"
        }, {
            "propName": "placeholder",
            "methodName": "placeholderChanged"
        }, {
            "propName": "name",
            "methodName": "nameChanged"
        }, {
            "propName": "filterFunction",
            "methodName": "filterFunctionChanged"
        }, {
            "propName": "multiple",
            "methodName": "multipleChanged"
        }]; }
    static get listeners() { return [{
            "name": "focus",
            "method": "onFocus",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "mousedown",
            "method": "onMouseDown",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "mouseup",
            "method": "onMouseUp",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "blur",
            "method": "onBlur",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "onWindowClick",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "touchend",
            "method": "onWindowClick",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "keydown",
            "method": "onKeyDown",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
Select.maxAutocompleteOptionsMobile = 5;
Select.maxAutocompleteOptionsDesktop = 10;
Select.minSpaceToWindow = 24; // $baseline-3
