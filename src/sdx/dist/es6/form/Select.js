import { __extends, __values } from "tslib";
import { searchAndInitialize, preventDefault, find, remove, internetExplorerOrEdgeVersion, scrollIntoView } from "../Utils";
import DomElement from "../DomElement";
import * as Inputs from "../Inputs";
import * as Dom from "../DomFunctions";
var CLASS_PLACEHOLDER = "select__placeholder";
var CLASS_THUMB = "select__thumb";
var CLASS_BUTTON = "select__button";
var CLASS_DROPDOWN = "select__dropdown";
var CLASS_OPEN = "select--open";
var CLASS_CLOSED = "select--closed";
var CLASS_DISABLED = "select--disabled";
var CLASS_FILTERABLE = "select--filterable";
var CLASS_ITEM = "dropdown-item";
var CLASS_ITEM_SELECTED = "dropdown-item--selected";
var CLASS_ITEM_FOCUSED = "dropdown-item--focused";
var CLASS_ITEM_DISABLED = "dropdown-item--disabled";
var CLASS_GROUP_ITEM = "dropdown-group";
var CLASS_GROUP_HEADER = "dropdown-group__item";
var QUERY_MESSAGE = ".message";
var TIMEOUT_CLOSE = 150;
var TIMEOUT_BLUR = 400;
/**
 * The select component API.
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(element) {
        var _this = _super.call(this, element) || this;
        // Minimum filter length
        _this._minFilterLength = 2;
        // The options the Select was initially created upon
        // These will be used as a basis for filtering
        _this._initialOptions = Array.prototype.slice.call(_this.element.children);
        _this._openByFocus = false;
        // Check for multi-selection
        _this._multiselection = _this.element.hasAttribute("multiple") === true;
        // Setup event context
        _this._clickHandler = _this._handleClick.bind(_this);
        _this._handleDropdownClick = _this._handleClick.bind(_this);
        _this._keydownHandler = _this._handleKeydown.bind(_this);
        _this._focusHandler = _this._handleFocus.bind(_this);
        _this._blurHandler = _this._handleBlur.bind(_this);
        _this._windowClickHandler = _this._handleWindowClick.bind(_this);
        _this._filterKeydownHandler = _this._handleFilterKeydown.bind(_this);
        _this._filterKeyupHandler = _this._handleFilterKeyup.bind(_this);
        _this._filterFocusHandler = _this._handleFilterFocus.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the select component.
     *
     * This method inspects the select definition and its options and
     * generates new stylable DOM elements around the original select-element
     * definitions.
     * @private
     */
    Select.prototype._initialize = function () {
        var e_1, _a;
        var selectedOption = this.element.querySelector("option[selected]");
        var firstOption = this.element.querySelector("option");
        // Per default, set the last selected option to either the option with a "selected" attribute,
        // or, if not found, to the first available option
        this._lastSelectedOption = selectedOption || firstOption;
        this._wrapperElement = new DomElement(this.element.parentElement)
            .addClass(CLASS_CLOSED);
        try {
            for (var _b = __values(this.classes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cls = _c.value;
                this._wrapperElement.addClass(cls);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._dropdownElement = new DomElement("div")
            .addClass(CLASS_DROPDOWN);
        if (internetExplorerOrEdgeVersion() > 0 && internetExplorerOrEdgeVersion() < 12) {
            // This is a workaround for IE browsers 11 and earlier where focusing
            // a scrollable dropdown list will close the dropdown prematurely.
            this._dropdownElement.element.addEventListener("mousedown", function (event) { return event.preventDefault(); });
        }
        this._setupTarget();
        this._setupPlaceholder();
        this._wrapperElement.appendChild(this._dropdownElement);
        this._createOptions(this.element);
        this._updateSize();
        this._updateMessage();
        if (this.element.disabled) {
            this.disable();
        }
        else {
            this.enable();
        }
    };
    Select.prototype._setupTarget = function () {
        // move the id from the select element to the wrapper
        var id = this.element.getAttribute("id");
        if (id) {
            this.element.removeAttribute("id");
            this._wrapperElement.setAttribute("id", id);
        }
        // Apply the tab index
        var tabIndex = this.element.getAttribute("tabindex");
        if (tabIndex) {
            this._wrapperElement.setAttribute("tabIndex", tabIndex);
        }
    };
    Select.prototype._setupPlaceholder = function () {
        var _this = this;
        if (!this._selectButtonElement) {
            this._selectButtonElement = new DomElement("div")
                .addClass(CLASS_BUTTON);
            this._wrapperElement.appendChild(this._selectButtonElement);
        }
        if (!this._thumbElement) {
            this._thumbElement = new DomElement("div")
                .addClass(CLASS_THUMB);
            var thumbIcon = new DomElement("div")
                .addClass("thumb-icon");
            var loader = new DomElement("div")
                .addClass("loader-spinner")
                .addClass("loader-spinner--small");
            this._thumbElement.appendChild(loader);
            this._thumbElement.appendChild(thumbIcon);
            this._selectButtonElement.appendChild(this._thumbElement);
        }
        var placeholderText = "";
        this._placeholderOption = this.element.querySelector("option[selected][disabled]") || undefined;
        if (this._placeholderOption) {
            placeholderText = Dom.text(this._placeholderOption);
            if (this._multiselection === true) {
                this._placeholderOption.selected = false;
            }
        }
        var selectedOption = this.element.querySelector("option[selected]:not([disabled])");
        if (selectedOption) {
            placeholderText = Dom.text(selectedOption);
        }
        if (!this._placeholderElement) {
            // When the Select is filterable, create an "input" as the placeholder element, otherwise a "span"
            if (this._isFilterable()) {
                this._placeholderElement = new DomElement("input");
                this._placeholderElement.addEventListener("keyup", function (e) { return _this._handleFilterKeyup(e); });
                this._placeholderElement.addEventListener("keydown", function (e) { return _this._handleFilterKeydown(e); });
                this._placeholderElement.addEventListener("focus", function (e) { return _this._handleFilterFocus(e); });
            }
            else {
                this._placeholderElement = new DomElement("span");
            }
            this._placeholderElement.addClass(CLASS_PLACEHOLDER);
            this._selectButtonElement.appendChild(this._placeholderElement);
        }
        this._setPlaceholder(placeholderText);
        this._placeholderText = placeholderText;
        if (selectedOption && selectedOption !== this._placeholderOption) {
            this._updatePlaceholder(true);
        }
    };
    Select.prototype._updateMessage = function () {
        var messageNode = this._wrapperElement.element.querySelector(QUERY_MESSAGE);
        if (messageNode !== null) {
            this._wrapperElement.appendChild(new DomElement(messageNode));
        }
    };
    Select.prototype._isOptGroup = function (element) {
        return element.tagName.toUpperCase() === "OPTGROUP";
    };
    Select.prototype._isOption = function (element) {
        return element.tagName.toUpperCase() === "OPTION";
    };
    Select.prototype._createOptions = function (element) {
        for (var i = 0; i < element.children.length; i++) {
            var child = element.children[i];
            if (this._isOptGroup(child)) {
                this._appendGroup(child);
            }
            if (this._isOption(child)) {
                var option = this._createOption(child);
                if (option) {
                    this._dropdownElement.appendChild(option);
                }
            }
        }
    };
    Select.prototype._createOption = function (option) {
        var html = option.innerHTML;
        if (this._activeFilter) {
            var sanitizedActiveFilter = this._activeFilter.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
            html = html.replace(new RegExp("(" + sanitizedActiveFilter + ")", "gi"), "<strong>$1</strong>");
        }
        var opt = new DomElement("div")
            .addClass(CLASS_ITEM)
            .setHtml(html);
        if (option.selected) {
            opt.addClass(CLASS_ITEM_SELECTED);
        }
        if (option.disabled) {
            opt.addClass(CLASS_ITEM_DISABLED);
        }
        if (!this._isPlaceholder(option)) {
            opt.setAttribute("data-value", option.value);
            return opt;
        }
        return undefined;
    };
    Select.prototype._appendGroup = function (optgroup) {
        var e_2, _a;
        var label = optgroup.getAttribute("label");
        var group = new DomElement("div")
            .addClass(CLASS_GROUP_ITEM);
        var groupHeader = new DomElement("div")
            .addClass(CLASS_GROUP_HEADER)
            .setHtml(label);
        group.appendChild(groupHeader);
        var options = optgroup.querySelectorAll("option");
        try {
            for (var options_1 = __values(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
                var entry = options_1_1.value;
                var option = this._createOption(entry);
                if (option) {
                    group.appendChild(option);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (options_1_1 && !options_1_1.done && (_a = options_1.return)) _a.call(options_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._dropdownElement.appendChild(group);
        return group;
    };
    Select.prototype._updateSize = function () {
        var e_3, _a;
        // Note: Mirroring the DOM and measuring the items using their clientWidth was very
        // unreliable, therefore measuring was switched to the new HTML5 measureText method
        // margins and paddings arround the text are copied from the original placeholder items
        // dimension
        var placeholderStyle = window.getComputedStyle(this._placeholderElement.element);
        var paddingRight = parseFloat(placeholderStyle.paddingRight);
        var paddingLeft = parseFloat(placeholderStyle.paddingLeft);
        var font = this._placeholderElement.css("font");
        var textWidth = Dom.textWidth(this._placeholderText, font);
        var maxWidth = paddingLeft + paddingRight + textWidth;
        var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);
        try {
            for (var options_2 = __values(options), options_2_1 = options_2.next(); !options_2_1.done; options_2_1 = options_2.next()) {
                var entry = options_2_1.value;
                var width = Dom.textWidth(Dom.text(entry), font) + paddingLeft + paddingRight;
                if (width > maxWidth) {
                    maxWidth = width;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (options_2_1 && !options_2_1.done && (_a = options_2.return)) _a.call(options_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    Select.prototype._isButtonTarget = function (target) {
        return (target === this._wrapperElement.element ||
            target === this._placeholderElement.element ||
            target === this._selectButtonElement.element ||
            target === this._thumbElement.element);
    };
    Select.prototype._isDropdownTarget = function (target) {
        var current = target;
        while (current !== this._dropdownElement.element && current.parentElement) {
            current = current.parentElement;
        }
        return current === this._dropdownElement.element;
    };
    /**
     * Updates the UI if the selection has changed and makes sure the
     * select control and the generated markup are synchronized.
     * @private
     */
    Select.prototype._selectedItemChanged = function (newItem, autoClose, multiselect) {
        var _this = this;
        if (autoClose === void 0) { autoClose = true; }
        if (multiselect === void 0) { multiselect = false; }
        var oldItems = this._dropdownElement.element.querySelectorAll("." + CLASS_ITEM_SELECTED);
        if (!newItem) {
            setTimeout(function () { return _this.close(); }, TIMEOUT_CLOSE);
            return;
        }
        if (Dom.hasClass(newItem, CLASS_ITEM_DISABLED)) {
            return;
        }
        if ((oldItems.length === 0) && !newItem) {
            throw new Error("Can not select undefined elements");
        }
        var oldItem = oldItems[0];
        if (multiselect === true) {
            oldItem = find(oldItems, function (x) { return x.getAttribute("data-value") === newItem.getAttribute("data-value"); });
        }
        var isDeselect = false;
        if (newItem && oldItem && oldItem === newItem) {
            // Click on a previously selected element -> deselect
            isDeselect = true;
            if (!this._placeholderOption && !multiselect) {
                // If there is no placeholder option, non multiselect options cannot be deselected
                return;
            }
            delete this._lastSelectedOption;
        }
        if (oldItem) {
            // Remove selection on the element
            var oldValue_1 = oldItem.getAttribute("data-value");
            var optElement = find(this.element.options, function (x) { return !x.disabled && x.value === oldValue_1; });
            if (!optElement) {
                throw new Error("The option with value " + oldValue_1 + " does not exist");
            }
            // Unset Select value
            optElement.selected = false;
            Dom.removeClass(oldItem, CLASS_ITEM_SELECTED);
        }
        if (!isDeselect) { // Select an option
            // Select a new item
            var newValue_1 = newItem.getAttribute("data-value");
            var optElement = find(this.element.options, function (x) { return !x.disabled && x.value === newValue_1; });
            if (!optElement) {
                throw new Error("The option with value " + newValue_1 + " does not exist");
            }
            // Set Select value
            optElement.selected = true;
            Dom.addClass(newItem, CLASS_ITEM_SELECTED);
            // Preserve selection
            this._lastSelectedOption = optElement;
        }
        else { // Deselect an option
            // Keep track of falling back to the placeholder (if any)
            if (this._placeholderOption) {
                this._lastSelectedOption = this._placeholderOption;
            }
        }
        var hasSelectedItems = true;
        if (this._multiselection === false && isDeselect) {
            // Handle no selection for non-multiselect states
            this._placeholderOption.selected = true;
            hasSelectedItems = false;
        }
        if (this._multiselection === true && this._getSelectedOptions().length === 0) {
            hasSelectedItems = false;
        }
        // Reset the filter if filterable
        if (this._activeFilter) {
            this._clearFilter();
        }
        this._updatePlaceholder(hasSelectedItems);
        // Dispatch the changed event
        this.dispatchEvent("change");
        if (autoClose && !multiselect) {
            setTimeout(function () {
                _this.close();
            }, TIMEOUT_CLOSE);
        }
    };
    Select.prototype._updatePlaceholder = function (hasSelectedItems) {
        var e_4, _a;
        var text = this._placeholderOption ? Dom.text(this._placeholderOption) : " ";
        if (hasSelectedItems === true) {
            var selectedItems = this._getSelectedOptions();
            if (selectedItems.length > 0) {
                text = "";
                try {
                    for (var selectedItems_1 = __values(selectedItems), selectedItems_1_1 = selectedItems_1.next(); !selectedItems_1_1.done; selectedItems_1_1 = selectedItems_1.next()) {
                        var item = selectedItems_1_1.value;
                        text += Dom.text(item) + ", ";
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (selectedItems_1_1 && !selectedItems_1_1.done && (_a = selectedItems_1.return)) _a.call(selectedItems_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                text = text.substring(0, text.length - 2);
            }
        }
        this._setPlaceholder(text);
    };
    Select.prototype._getSelectedOptions = function () {
        var selectedOptions = [];
        if (this.element.options) {
            [].forEach.call(this.element.options, (function (option) {
                if (option.selected && !option.disabled) {
                    selectedOptions.push(option);
                }
            }));
        }
        return selectedOptions;
    };
    /**
     * Clone all of the initially set options (and optgroups) and returns them in a new array.
     * This serves as the basis for filtering. If a filter is present, it will be respected.
     */
    Select.prototype.getInitialOptions = function () {
        var filter = this._activeFilter || "";
        var filtered = [];
        var initialOptions = this._initialOptions;
        for (var i = 0; i < initialOptions.length; i++) {
            var child = initialOptions[i];
            if (this._isOptGroup(child)) { // handle <optgroup>
                var optGroupClone = child.cloneNode(false);
                var found = false;
                for (var j = 0; j < child.children.length; j++) {
                    var optionClone = child.children[j].cloneNode(true);
                    // Append on match
                    if (this._containsWord(optionClone.innerHTML, filter)) {
                        optGroupClone.appendChild(optionClone);
                        found = true;
                    }
                }
                // Push if any matches found
                if (found) {
                    filtered.push(optGroupClone);
                }
            }
            else if (this._isOption(child)) { // handle <option>
                var optionClone = child.cloneNode(true);
                // Push on match
                if (this._containsWord(optionClone.innerHTML, filter)) {
                    filtered.push(optionClone);
                }
            }
        }
        return filtered;
    };
    /**
     * Returns true if a text contains a given keyword, e.g. in "ca" in "Car"
     */
    Select.prototype._containsWord = function (text, keyword) {
        return text.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    };
    Select.prototype._handleFocus = function () {
        var _this = this;
        this.open();
        this._openByFocus = true;
        setTimeout(function () {
            _this._openByFocus = false;
        }, TIMEOUT_BLUR);
    };
    Select.prototype._handleBlur = function () {
        this.close();
    };
    Select.prototype._handleClick = function (event) {
        var handled = false;
        if (this._lastHandledEvent === event) {
            this._lastHandledEvent = undefined;
            return;
        }
        if (this._isButtonTarget(event.target) && this._openByFocus === false) {
            // handle header item clicks and toggle dropdown
            this.toggle();
            handled = true;
        }
        var newItem = event.target;
        if (!handled && Dom.hasClass(newItem, CLASS_ITEM)) {
            // handle clicks on dropdown items
            this._selectedItemChanged(newItem, true, this._multiselection);
            handled = true;
        }
        if (handled) {
            this._lastHandledEvent = event;
            preventDefault(event);
        }
    };
    Select.prototype._handleWindowClick = function (event) {
        if (this._isDropdownTarget(event.target) || this._isButtonTarget(event.target)) {
            return;
        }
        this.close();
    };
    Select.prototype._focusOptionStartingWith = function (keycode, startIndex, options) {
        for (var index = startIndex; index < options.length; index++) {
            var item = new DomElement(options[index]);
            var value = item.innerText.toLowerCase();
            if (index > options.length) {
                index = 0;
            }
            if (value.startsWith(Inputs.getKeyValue(keycode))) {
                var newOption = new DomElement(options[index]);
                if (!newOption.hasClass(CLASS_ITEM_DISABLED)) {
                    scrollIntoView(options[index]);
                    newOption.addClass(CLASS_ITEM_FOCUSED);
                    return newOption;
                }
            }
        }
        return undefined;
    };
    Select.prototype._handleKeydown = function (event) {
        var keyboardEvent = event;
        var evt = keyboardEvent || window.event;
        var keycode = keyboardEvent.which || keyboardEvent.keyCode;
        if (keycode === Inputs.KEY_ESCAPE) {
            // handle Escape key (ESC)
            if (this.isOpen()) {
                this.close();
            }
            evt.preventDefault();
            return;
        }
        if (keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_DOWN) {
            // Up and down arrows
            var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);
            if (options.length > 0) {
                var newIndex = 0;
                var oldOption = void 0;
                var focusedElement = this._wrapperElement.find("." + CLASS_ITEM_FOCUSED);
                var searchFor = focusedElement ? CLASS_ITEM_FOCUSED : CLASS_ITEM_SELECTED;
                var newElement = void 0;
                for (var index = 0; index < options.length; index++) {
                    var direction = keycode === Inputs.KEY_ARROW_DOWN ? 1 : -1;
                    var item = new DomElement(options[index]);
                    // search for selected or focusedElement elements
                    if (item.hasClass(searchFor)) {
                        oldOption = item;
                        newIndex = index;
                        // get the next not disabled element in the appropriate direction
                        for (var count = 0; count < options.length; count++) {
                            newIndex += direction;
                            newIndex %= options.length;
                            if (newIndex < 0) {
                                newIndex = options.length - 1;
                            }
                            newElement = new DomElement(options[newIndex]);
                            if (!newElement.hasClass(CLASS_ITEM_DISABLED)) {
                                break;
                            }
                        }
                    }
                }
                // set the new element focused
                scrollIntoView(options[newIndex]);
                var newOption = new DomElement(options[newIndex]);
                newOption.addClass(CLASS_ITEM_FOCUSED);
                if (oldOption) {
                    oldOption.removeClass(CLASS_ITEM_FOCUSED);
                }
            }
            evt.preventDefault();
            return;
        }
        if (Inputs.getKeyValue(keycode) && !this._isFilterable()) {
            // Keyboard keys
            var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);
            if (options.length > 0) {
                var oldFocusIndex = 0;
                var hasFocusedOption = false;
                for (var index = 0; index < options.length; index++) {
                    var item = new DomElement(options[index]);
                    if (item.hasClass(CLASS_ITEM_FOCUSED)) {
                        item.removeClass(CLASS_ITEM_FOCUSED);
                        var value = item.innerText.toLowerCase();
                        if (value.startsWith(Inputs.getKeyValue(keycode))) {
                            hasFocusedOption = true;
                            oldFocusIndex = index;
                        }
                    }
                }
                var newOption = this._focusOptionStartingWith(keycode, hasFocusedOption ? oldFocusIndex + 1 : 0, options);
                if (newOption === undefined) {
                    this._focusOptionStartingWith(keycode, 0, options);
                }
            }
            evt.preventDefault();
            return;
        }
        if (keycode === Inputs.KEY_ENTER || keycode === Inputs.KEY_TAB) {
            // Handle enter and tab key by selecting the currently focused element
            var newItem = this._dropdownElement.element.querySelector("." + CLASS_ITEM_FOCUSED);
            this._selectedItemChanged(newItem, true, this._multiselection);
        }
    };
    /**
     * Fired when the user presses a key in the filter field
     */
    Select.prototype._handleFilterKeydown = function (e) {
        var keyboardEvent = e;
        var keycode = keyboardEvent.which || keyboardEvent.keyCode;
        // If the user hits the enter key while filtering and there's a single match, select it
        if (keycode === Inputs.KEY_ENTER) {
            var dropdownElements = this._dropdownElement.element.querySelectorAll("." + CLASS_ITEM);
            if (dropdownElements.length === 1) {
                this._selectedItemChanged(dropdownElements[0], true, this._multiselection);
                e.stopPropagation();
            }
        }
    };
    /**
     * Fired when the user releases a key in the filter field
     */
    Select.prototype._handleFilterKeyup = function (e) {
        var target = e.target;
        // Filter has changed
        if (target.value !== this._activeFilter && target.value !== this._placeholderText && target.value !== this._lastSelectedOption.innerHTML) {
            this._setFilter(target.value);
        }
    };
    /**
     * Fired when the user focusses the filter input field
     */
    Select.prototype._handleFilterFocus = function (e) {
        var target = e.target;
        setTimeout(function () {
            target.select();
        });
    };
    /**
     * Filters the Select by a given filter keyword
     * @param filter Keyword to filter by
     */
    Select.prototype._setFilter = function (filter) {
        if (filter === void 0) { filter = ""; }
        this._activeFilter = (filter.length >= this._minFilterLength) ? filter : "";
        this.setOptions(this.getInitialOptions());
    };
    /**
     * Resets the filter
     */
    Select.prototype._clearFilter = function () {
        delete this._activeFilter;
        this.setOptions(this.getInitialOptions());
    };
    /**
     * Set new content and reload the Select
     * @param elements Array of new option (or optgroup) elements to display
     */
    Select.prototype.setOptions = function (options) {
        var _this = this;
        this._emptyNode(this.element);
        options.forEach(function (option) {
            _this.element.appendChild(option);
        });
        // Preserve selected value if the selected
        this.element.value = this._lastSelectedOption.value;
        this.reload();
    };
    /**
     * Clear all children of a given node
     * @param node Node
     */
    Select.prototype._emptyNode = function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };
    /**
     * Returns whether an option is a placeholder option
     */
    Select.prototype._isPlaceholder = function (option) {
        return option.hasAttribute("disabled") && option.hasAttribute("selected");
    };
    /**
     * Update placeholder value
     * @param text Content of the placeholder
     */
    Select.prototype._setPlaceholder = function (text) {
        if (this._placeholderElement && text) {
            if (this._isFilterable()) {
                this._placeholderElement.element.value = text;
            }
            else {
                this._placeholderElement.setHtml(text);
            }
        }
    };
    Object.defineProperty(Select.prototype, "value", {
        /**
         * Gets the value of the currently selected option.
         * If multiple selection is enabled this property returns an array of values.
         */
        get: function () {
            if (this._multiselection) {
                return this._getSelectedOptions().map(function (x) { return x.value; });
            }
            if (this.element.value === "") {
                return null;
            }
            return this.element.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "disabled", {
        /**
         * Enables or disables the select component depending on the
         * 'value' parameter.
         * @param {value} If true disables the control; false enables it.
         */
        set: function (value) {
            if (value) {
                this.disable();
            }
            else {
                this.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Reloads the dropdown's option data definitions from the DOM and updates
     * the generated dropdown display items.
     */
    Select.prototype.reload = function () {
        // Remove all existing child elements
        this._emptyNode(this._dropdownElement.element);
        if (this._activeFilter === undefined) { // If the user is filtering, let the placeholder "input" alive
            this._setupPlaceholder();
        }
        this._createOptions(this.element);
        this._updateSize();
        this._updateMessage();
        if (!this._isFilterable()) {
            this._updatePlaceholder(!!this.value);
        }
    };
    /**
     * Sets the select control to the enabled state.
     */
    Select.prototype.enable = function () {
        this.element.removeAttribute("disabled");
        this._wrapperElement.removeClass(CLASS_DISABLED);
        window.addEventListener("click", this._windowClickHandler);
        this._wrapperElement.element.addEventListener("click", this._clickHandler);
        this._wrapperElement.element.addEventListener("keydown", this._keydownHandler);
        this._wrapperElement.element.addEventListener("focus", this._focusHandler);
        this._wrapperElement.element.addEventListener("blur", this._blurHandler);
    };
    /**
     * Sets the select control to the disabled state.
     */
    Select.prototype.disable = function () {
        this.element.setAttribute("disabled", "");
        this._wrapperElement.addClass(CLASS_DISABLED);
        window.removeEventListener("click", this._windowClickHandler);
        this._wrapperElement.element.removeEventListener("click", this._clickHandler);
        this._wrapperElement.element.removeEventListener("keydown", this._keydownHandler);
        this._wrapperElement.element.removeEventListener("focus", this._focusHandler);
        this._wrapperElement.element.removeEventListener("blur", this._blurHandler);
        this.close();
    };
    /**
     * Toggles the open/closed state of the select dropdown.
     */
    Select.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Gets if the select dropdown is open or closed.
     * @return {boolean} True if open; otherwise false.
     */
    Select.prototype.isOpen = function () {
        return this._wrapperElement.hasClass(CLASS_OPEN);
    };
    /**
     * Opens the select dropdown.
     */
    Select.prototype.open = function () {
        if (!this.isOpen()) {
            this._openByFocus = false;
            this._wrapperElement.removeClass(CLASS_CLOSED);
            this._wrapperElement.addClass(CLASS_OPEN);
            this._dropdownElement.element.addEventListener("click", this._handleDropdownClick);
            this._dropdownElement.element.addEventListener("tap", this._handleDropdownClick);
        }
    };
    /**
     * Closes the select dropdown.
     */
    Select.prototype.close = function () {
        if (this.isOpen()) {
            this._openByFocus = false;
            this._wrapperElement.removeClass(CLASS_OPEN);
            this._wrapperElement.addClass(CLASS_CLOSED);
            // If the Select is filterable and therefore has an input field,
            // reset the value of it to the chosen option
            if (this._isFilterable()) {
                // Unfocus input field
                this._placeholderElement.element.blur();
                if (!this._activeFilter || this._activeFilter === this._lastSelectedOption.innerHTML) {
                    this._setPlaceholder(this._lastSelectedOption.innerHTML);
                }
            }
            this._dropdownElement.element.removeEventListener("click", this._handleDropdownClick);
            this._dropdownElement.element.removeEventListener("tap", this._handleDropdownClick);
            var focusedItem = this._wrapperElement.find("." + CLASS_ITEM_FOCUSED);
            if (focusedItem) {
                focusedItem.removeClass(CLASS_ITEM_FOCUSED);
            }
        }
    };
    /**
     * Returns true when the element has the filter modifier class
     */
    Select.prototype._isFilterable = function () {
        return this._wrapperElement.hasClass(CLASS_FILTERABLE);
    };
    /**
     * Destroys the component and clears all references.
     */
    Select.prototype.destroy = function () {
        window.removeEventListener("click", this._windowClickHandler);
        if (this._dropdownElement) {
            this._dropdownElement.element.removeEventListener("click", this._handleDropdownClick);
            this._dropdownElement.element.removeEventListener("tap", this._handleDropdownClick);
            remove(this._dropdownElement.element);
            this._dropdownElement = undefined;
        }
        if (this._placeholderElement) {
            this._placeholderElement.removeEventListener("keydown", this._filterKeydownHandler);
            this._placeholderElement.removeEventListener("keyup", this._filterKeyupHandler);
            this._placeholderElement.removeEventListener("focus", this._filterFocusHandler);
        }
        if (this._wrapperElement) {
            this._wrapperElement.element.removeEventListener("click", this._clickHandler);
            this._wrapperElement.element.removeEventListener("keydown", this._keydownHandler);
            this._wrapperElement.element.removeEventListener("focus", this._focusHandler);
            this._wrapperElement.element.removeEventListener("blur", this._blurHandler);
            this._wrapperElement = undefined;
        }
        if (this._selectButtonElement) {
            remove(this._selectButtonElement.element);
            this._selectButtonElement = undefined;
        }
        this.removeClass(CLASS_CLOSED);
    };
    return Select;
}(DomElement));
export function init() {
    searchAndInitialize("select", function (e) {
        new Select(e);
    });
}
export default Select;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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T0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1NBQ2hGO1FBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDN0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzdFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0UsSUFBWSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUE7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLElBQVksQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUE7U0FDL0M7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0F2OUJBLEFBdTlCQyxDQXY5Qm9CLFVBQVUsR0F1OUI5QjtBQUVELE1BQU0sVUFBVSxJQUFJO0lBQ2xCLG1CQUFtQixDQUFvQixRQUFRLEVBQUUsVUFBQyxDQUFDO1FBQ2pELElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxNQUFNLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvZm9ybS9TZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZWFyY2hBbmRJbml0aWFsaXplLCBwcmV2ZW50RGVmYXVsdCwgZmluZCwgcmVtb3ZlLCBpbnRlcm5ldEV4cGxvcmVyT3JFZGdlVmVyc2lvbiwgc2Nyb2xsSW50b1ZpZXcgfSBmcm9tIFwiLi4vVXRpbHNcIlxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0ICogYXMgSW5wdXRzIGZyb20gXCIuLi9JbnB1dHNcIlxuaW1wb3J0ICogYXMgRG9tIGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuXG5jb25zdCBDTEFTU19QTEFDRUhPTERFUiA9IFwic2VsZWN0X19wbGFjZWhvbGRlclwiXG5jb25zdCBDTEFTU19USFVNQiA9IFwic2VsZWN0X190aHVtYlwiXG5jb25zdCBDTEFTU19CVVRUT04gPSBcInNlbGVjdF9fYnV0dG9uXCJcbmNvbnN0IENMQVNTX0RST1BET1dOID0gXCJzZWxlY3RfX2Ryb3Bkb3duXCJcblxuY29uc3QgQ0xBU1NfT1BFTiA9IFwic2VsZWN0LS1vcGVuXCJcbmNvbnN0IENMQVNTX0NMT1NFRCA9IFwic2VsZWN0LS1jbG9zZWRcIlxuY29uc3QgQ0xBU1NfRElTQUJMRUQgPSBcInNlbGVjdC0tZGlzYWJsZWRcIlxuY29uc3QgQ0xBU1NfRklMVEVSQUJMRSA9IFwic2VsZWN0LS1maWx0ZXJhYmxlXCJcblxuY29uc3QgQ0xBU1NfSVRFTSA9IFwiZHJvcGRvd24taXRlbVwiXG5jb25zdCBDTEFTU19JVEVNX1NFTEVDVEVEID0gXCJkcm9wZG93bi1pdGVtLS1zZWxlY3RlZFwiXG5jb25zdCBDTEFTU19JVEVNX0ZPQ1VTRUQgPSBcImRyb3Bkb3duLWl0ZW0tLWZvY3VzZWRcIlxuY29uc3QgQ0xBU1NfSVRFTV9ESVNBQkxFRCA9IFwiZHJvcGRvd24taXRlbS0tZGlzYWJsZWRcIlxuXG5jb25zdCBDTEFTU19HUk9VUF9JVEVNID0gXCJkcm9wZG93bi1ncm91cFwiXG5jb25zdCBDTEFTU19HUk9VUF9IRUFERVIgPSBcImRyb3Bkb3duLWdyb3VwX19pdGVtXCJcblxuY29uc3QgUVVFUllfTUVTU0FHRSA9IFwiLm1lc3NhZ2VcIlxuXG5jb25zdCBUSU1FT1VUX0NMT1NFID0gMTUwXG5jb25zdCBUSU1FT1VUX0JMVVIgPSA0MDBcblxuLyoqXG4gKiBUaGUgc2VsZWN0IGNvbXBvbmVudCBBUEkuXG4gKi9cbmNsYXNzIFNlbGVjdCBleHRlbmRzIERvbUVsZW1lbnQ8SFRNTFNlbGVjdEVsZW1lbnQ+IHtcbiAgcHJpdmF0ZSBfb3BlbkJ5Rm9jdXM6IGJvb2xlYW5cbiAgcHJpdmF0ZSBfbXVsdGlzZWxlY3Rpb246IGJvb2xlYW5cbiAgcHJpdmF0ZSBfY2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfaGFuZGxlRHJvcGRvd25DbGljazogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX2tleWRvd25IYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfZm9jdXNIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfYmx1ckhhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF93aW5kb3dDbGlja0hhbmRsZXI6IChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX2ZpbHRlcktleWRvd25IYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfZmlsdGVyS2V5dXBIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfZmlsdGVyRm9jdXNIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIF93cmFwcGVyRWxlbWVudCE6IERvbUVsZW1lbnRcbiAgcHJpdmF0ZSBfZHJvcGRvd25FbGVtZW50ITogRG9tRWxlbWVudDxIVE1MRWxlbWVudD5cblxuICBwcml2YXRlIF9zZWxlY3RCdXR0b25FbGVtZW50ITogRG9tRWxlbWVudFxuICBwcml2YXRlIF90aHVtYkVsZW1lbnQhOiBEb21FbGVtZW50XG5cbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudFxuICBwcml2YXRlIF9wbGFjZWhvbGRlckVsZW1lbnQhOiBEb21FbGVtZW50XG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyVGV4dCE6IHN0cmluZ1xuXG4gIHByaXZhdGUgX2xhc3RIYW5kbGVkRXZlbnQ/OiBFdmVudFxuICBwcml2YXRlIF9sYXN0U2VsZWN0ZWRPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudFxuXG4gIC8vIE1pbmltdW0gZmlsdGVyIGxlbmd0aFxuICBwcml2YXRlIF9taW5GaWx0ZXJMZW5ndGggPSAyXG5cbiAgLy8gVGhlIGtleXdvcmQgdGhlIFNlbGVjdCBpcyBjdXJyZW50bHkgZmlsdGVyZWQgYnlcbiAgcHJpdmF0ZSBfYWN0aXZlRmlsdGVyPzogc3RyaW5nXG5cbiAgLy8gVGhlIG9wdGlvbnMgdGhlIFNlbGVjdCB3YXMgaW5pdGlhbGx5IGNyZWF0ZWQgdXBvblxuICAvLyBUaGVzZSB3aWxsIGJlIHVzZWQgYXMgYSBiYXNpcyBmb3IgZmlsdGVyaW5nXG4gIHByaXZhdGUgX2luaXRpYWxPcHRpb25zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50LmNoaWxkcmVuKVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcblxuICAgIHRoaXMuX29wZW5CeUZvY3VzID0gZmFsc2VcblxuICAgIC8vIENoZWNrIGZvciBtdWx0aS1zZWxlY3Rpb25cbiAgICB0aGlzLl9tdWx0aXNlbGVjdGlvbiA9IHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSA9PT0gdHJ1ZVxuXG4gICAgLy8gU2V0dXAgZXZlbnQgY29udGV4dFxuICAgIHRoaXMuX2NsaWNrSGFuZGxlciA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLl9oYW5kbGVEcm9wZG93bkNsaWNrID0gdGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX2tleWRvd25IYW5kbGVyID0gdGhpcy5faGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpXG4gICAgdGhpcy5fZm9jdXNIYW5kbGVyID0gdGhpcy5faGFuZGxlRm9jdXMuYmluZCh0aGlzKVxuICAgIHRoaXMuX2JsdXJIYW5kbGVyID0gdGhpcy5faGFuZGxlQmx1ci5iaW5kKHRoaXMpXG4gICAgdGhpcy5fd2luZG93Q2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlV2luZG93Q2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX2ZpbHRlcktleWRvd25IYW5kbGVyID0gdGhpcy5faGFuZGxlRmlsdGVyS2V5ZG93bi5iaW5kKHRoaXMpXG4gICAgdGhpcy5fZmlsdGVyS2V5dXBIYW5kbGVyID0gdGhpcy5faGFuZGxlRmlsdGVyS2V5dXAuYmluZCh0aGlzKVxuICAgIHRoaXMuX2ZpbHRlckZvY3VzSGFuZGxlciA9IHRoaXMuX2hhbmRsZUZpbHRlckZvY3VzLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzZWxlY3QgY29tcG9uZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpbnNwZWN0cyB0aGUgc2VsZWN0IGRlZmluaXRpb24gYW5kIGl0cyBvcHRpb25zIGFuZFxuICAgKiBnZW5lcmF0ZXMgbmV3IHN0eWxhYmxlIERPTSBlbGVtZW50cyBhcm91bmQgdGhlIG9yaWdpbmFsIHNlbGVjdC1lbGVtZW50XG4gICAqIGRlZmluaXRpb25zLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJvcHRpb25bc2VsZWN0ZWRdXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50XG4gICAgY29uc3QgZmlyc3RPcHRpb24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudFxuXG4gICAgLy8gUGVyIGRlZmF1bHQsIHNldCB0aGUgbGFzdCBzZWxlY3RlZCBvcHRpb24gdG8gZWl0aGVyIHRoZSBvcHRpb24gd2l0aCBhIFwic2VsZWN0ZWRcIiBhdHRyaWJ1dGUsXG4gICAgLy8gb3IsIGlmIG5vdCBmb3VuZCwgdG8gdGhlIGZpcnN0IGF2YWlsYWJsZSBvcHRpb25cbiAgICB0aGlzLl9sYXN0U2VsZWN0ZWRPcHRpb24gPSBzZWxlY3RlZE9wdGlvbiB8fCBmaXJzdE9wdGlvblxuXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudCh0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudCEpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfQ0xPU0VEKVxuXG4gICAgZm9yIChsZXQgY2xzIG9mIHRoaXMuY2xhc3Nlcykge1xuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuYWRkQ2xhc3MoY2xzKVxuICAgIH1cblxuICAgIHRoaXMuX2Ryb3Bkb3duRWxlbWVudCA9IG5ldyBEb21FbGVtZW50PEhUTUxFbGVtZW50PihcImRpdlwiKVxuICAgICAgLmFkZENsYXNzKENMQVNTX0RST1BET1dOKVxuXG4gICAgaWYgKGludGVybmV0RXhwbG9yZXJPckVkZ2VWZXJzaW9uKCkgPiAwICYmIGludGVybmV0RXhwbG9yZXJPckVkZ2VWZXJzaW9uKCkgPCAxMikge1xuICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIElFIGJyb3dzZXJzIDExIGFuZCBlYXJsaWVyIHdoZXJlIGZvY3VzaW5nXG4gICAgICAvLyBhIHNjcm9sbGFibGUgZHJvcGRvd24gbGlzdCB3aWxsIGNsb3NlIHRoZSBkcm9wZG93biBwcmVtYXR1cmVseS5cbiAgICAgIHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIH1cblxuICAgIHRoaXMuX3NldHVwVGFyZ2V0KClcbiAgICB0aGlzLl9zZXR1cFBsYWNlaG9sZGVyKClcblxuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2Ryb3Bkb3duRWxlbWVudClcblxuICAgIHRoaXMuX2NyZWF0ZU9wdGlvbnModGhpcy5lbGVtZW50KVxuXG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpXG4gICAgdGhpcy5fdXBkYXRlTWVzc2FnZSgpXG5cbiAgICBpZiAodGhpcy5lbGVtZW50LmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuYWJsZSgpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zZXR1cFRhcmdldCgpIHtcbiAgICAvLyBtb3ZlIHRoZSBpZCBmcm9tIHRoZSBzZWxlY3QgZWxlbWVudCB0byB0aGUgd3JhcHBlclxuICAgIGNvbnN0IGlkID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpXG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIilcbiAgICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKVxuICAgIH1cblxuICAgIC8vIEFwcGx5IHRoZSB0YWIgaW5kZXhcbiAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKVxuICAgIGlmICh0YWJJbmRleCkge1xuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgdGFiSW5kZXgpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zZXR1cFBsYWNlaG9sZGVyKCkge1xuICAgIGlmICghdGhpcy5fc2VsZWN0QnV0dG9uRWxlbWVudCkge1xuICAgICAgdGhpcy5fc2VsZWN0QnV0dG9uRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC5hZGRDbGFzcyhDTEFTU19CVVRUT04pXG5cbiAgICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdEJ1dHRvbkVsZW1lbnQpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90aHVtYkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3RodW1iRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC5hZGRDbGFzcyhDTEFTU19USFVNQilcblxuICAgICAgbGV0IHRodW1iSWNvbiA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC5hZGRDbGFzcyhcInRodW1iLWljb25cIilcblxuICAgICAgbGV0IGxvYWRlciA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImxvYWRlci1zcGlubmVyXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImxvYWRlci1zcGlubmVyLS1zbWFsbFwiKVxuXG4gICAgICB0aGlzLl90aHVtYkVsZW1lbnQuYXBwZW5kQ2hpbGQobG9hZGVyKVxuICAgICAgdGhpcy5fdGh1bWJFbGVtZW50LmFwcGVuZENoaWxkKHRodW1iSWNvbilcbiAgICAgIHRoaXMuX3NlbGVjdEJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fdGh1bWJFbGVtZW50KVxuICAgIH1cblxuICAgIGxldCBwbGFjZWhvbGRlclRleHQgPSBcIlwiXG5cbiAgICB0aGlzLl9wbGFjZWhvbGRlck9wdGlvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwib3B0aW9uW3NlbGVjdGVkXVtkaXNhYmxlZF1cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQgfHwgdW5kZWZpbmVkXG5cbiAgICBpZiAodGhpcy5fcGxhY2Vob2xkZXJPcHRpb24pIHtcbiAgICAgIHBsYWNlaG9sZGVyVGV4dCA9IERvbS50ZXh0KHRoaXMuX3BsYWNlaG9sZGVyT3B0aW9uKVxuXG4gICAgICBpZiAodGhpcy5fbXVsdGlzZWxlY3Rpb24gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJPcHRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwib3B0aW9uW3NlbGVjdGVkXTpub3QoW2Rpc2FibGVkXSlcIilcblxuICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgcGxhY2Vob2xkZXJUZXh0ID0gRG9tLnRleHQoc2VsZWN0ZWRPcHRpb24pXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQpIHtcbiAgICAgIC8vIFdoZW4gdGhlIFNlbGVjdCBpcyBmaWx0ZXJhYmxlLCBjcmVhdGUgYW4gXCJpbnB1dFwiIGFzIHRoZSBwbGFjZWhvbGRlciBlbGVtZW50LCBvdGhlcndpc2UgYSBcInNwYW5cIlxuICAgICAgaWYgKHRoaXMuX2lzRmlsdGVyYWJsZSgpKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiaW5wdXRcIilcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4gdGhpcy5faGFuZGxlRmlsdGVyS2V5dXAoZSkpXG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5faGFuZGxlRmlsdGVyS2V5ZG93bihlKSlcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoZSkgPT4gdGhpcy5faGFuZGxlRmlsdGVyRm9jdXMoZSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcInNwYW5cIilcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LmFkZENsYXNzKENMQVNTX1BMQUNFSE9MREVSKVxuICAgICAgdGhpcy5fc2VsZWN0QnV0dG9uRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQpXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0UGxhY2Vob2xkZXIocGxhY2Vob2xkZXJUZXh0KVxuICAgIHRoaXMuX3BsYWNlaG9sZGVyVGV4dCA9IHBsYWNlaG9sZGVyVGV4dFxuXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uICYmIHNlbGVjdGVkT3B0aW9uICE9PSB0aGlzLl9wbGFjZWhvbGRlck9wdGlvbikge1xuICAgICAgdGhpcy5fdXBkYXRlUGxhY2Vob2xkZXIodHJ1ZSlcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZU1lc3NhZ2UoKSB7XG4gICAgY29uc3QgbWVzc2FnZU5vZGUgPSB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfTUVTU0FHRSlcbiAgICBpZiAobWVzc2FnZU5vZGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKG5ldyBEb21FbGVtZW50KG1lc3NhZ2VOb2RlKSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc09wdEdyb3VwKGVsZW1lbnQ6IEVsZW1lbnQpOiBlbGVtZW50IGlzIEhUTUxPcHRHcm91cEVsZW1lbnQge1xuICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJPUFRHUk9VUFwiXG4gIH1cblxuICBwcml2YXRlIF9pc09wdGlvbihlbGVtZW50OiBFbGVtZW50KTogZWxlbWVudCBpcyBIVE1MT3B0aW9uRWxlbWVudCB7XG4gICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIk9QVElPTlwiXG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZU9wdGlvbnMoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IGVsZW1lbnQuY2hpbGRyZW5baV1cblxuICAgICAgaWYgKHRoaXMuX2lzT3B0R3JvdXAoY2hpbGQpKSB7XG4gICAgICAgIHRoaXMuX2FwcGVuZEdyb3VwKGNoaWxkIGFzIEhUTUxPcHRHcm91cEVsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc09wdGlvbihjaGlsZCkpIHtcbiAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMuX2NyZWF0ZU9wdGlvbihjaGlsZCBhcyBIVE1MT3B0aW9uRWxlbWVudClcblxuICAgICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZHJvcGRvd25FbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlT3B0aW9uKG9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBsZXQgaHRtbCA9IG9wdGlvbi5pbm5lckhUTUxcblxuICAgIGlmICh0aGlzLl9hY3RpdmVGaWx0ZXIpIHtcbiAgICAgIGNvbnN0IHNhbml0aXplZEFjdGl2ZUZpbHRlciA9IHRoaXMuX2FjdGl2ZUZpbHRlci5yZXBsYWNlKC9bLVxcXFxeJCorPy4oKXxbXFxde31dL2csIFwiXFxcXCQmXCIpXG4gICAgICBodG1sID0gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke3Nhbml0aXplZEFjdGl2ZUZpbHRlcn0pYCwgXCJnaVwiKSwgXCI8c3Ryb25nPiQxPC9zdHJvbmc+XCIpXG4gICAgfVxuXG4gICAgbGV0IG9wdCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfSVRFTSlcbiAgICAgIC5zZXRIdG1sKGh0bWwpXG5cbiAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICBvcHQuYWRkQ2xhc3MoQ0xBU1NfSVRFTV9TRUxFQ1RFRClcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICBvcHQuYWRkQ2xhc3MoQ0xBU1NfSVRFTV9ESVNBQkxFRClcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2lzUGxhY2Vob2xkZXIob3B0aW9uKSkge1xuICAgICAgb3B0LnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgb3B0aW9uLnZhbHVlKVxuICAgICAgcmV0dXJuIG9wdFxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHByb3RlY3RlZCBfYXBwZW5kR3JvdXAob3B0Z3JvdXA6IEhUTUxPcHRHcm91cEVsZW1lbnQpIHtcbiAgICBsZXQgbGFiZWwgPSBvcHRncm91cC5nZXRBdHRyaWJ1dGUoXCJsYWJlbFwiKSFcblxuICAgIGxldCBncm91cCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfR1JPVVBfSVRFTSlcblxuICAgIGxldCBncm91cEhlYWRlciA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfR1JPVVBfSEVBREVSKVxuICAgICAgLnNldEh0bWwobGFiZWwpXG5cbiAgICBncm91cC5hcHBlbmRDaGlsZChncm91cEhlYWRlcilcblxuICAgIGxldCBvcHRpb25zID0gb3B0Z3JvdXAucXVlcnlTZWxlY3RvckFsbChcIm9wdGlvblwiKVxuICAgIGZvciAobGV0IGVudHJ5IG9mIG9wdGlvbnMpIHtcbiAgICAgIGxldCBvcHRpb24gPSB0aGlzLl9jcmVhdGVPcHRpb24oZW50cnkpXG4gICAgICBpZiAob3B0aW9uKSB7XG4gICAgICAgIGdyb3VwLmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9kcm9wZG93bkVsZW1lbnQuYXBwZW5kQ2hpbGQoZ3JvdXApXG4gICAgcmV0dXJuIGdyb3VwXG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZVNpemUoKSB7XG4gICAgLy8gTm90ZTogTWlycm9yaW5nIHRoZSBET00gYW5kIG1lYXN1cmluZyB0aGUgaXRlbXMgdXNpbmcgdGhlaXIgY2xpZW50V2lkdGggd2FzIHZlcnlcbiAgICAvLyB1bnJlbGlhYmxlLCB0aGVyZWZvcmUgbWVhc3VyaW5nIHdhcyBzd2l0Y2hlZCB0byB0aGUgbmV3IEhUTUw1IG1lYXN1cmVUZXh0IG1ldGhvZFxuICAgIC8vIG1hcmdpbnMgYW5kIHBhZGRpbmdzIGFycm91bmQgdGhlIHRleHQgYXJlIGNvcGllZCBmcm9tIHRoZSBvcmlnaW5hbCBwbGFjZWhvbGRlciBpdGVtc1xuICAgIC8vIGRpbWVuc2lvblxuICAgIGNvbnN0IHBsYWNlaG9sZGVyU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQuZWxlbWVudClcblxuICAgIGxldCBwYWRkaW5nUmlnaHQgPSBwYXJzZUZsb2F0KHBsYWNlaG9sZGVyU3R5bGUucGFkZGluZ1JpZ2h0ISlcbiAgICBsZXQgcGFkZGluZ0xlZnQgPSBwYXJzZUZsb2F0KHBsYWNlaG9sZGVyU3R5bGUucGFkZGluZ0xlZnQhKVxuXG4gICAgbGV0IGZvbnQgPSB0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQuY3NzKFwiZm9udFwiKVxuICAgIGxldCB0ZXh0V2lkdGggPSBEb20udGV4dFdpZHRoKHRoaXMuX3BsYWNlaG9sZGVyVGV4dCwgZm9udClcbiAgICBsZXQgbWF4V2lkdGggPSBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCArIHRleHRXaWR0aFxuXG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0NMQVNTX0lURU19YClcbiAgICBmb3IgKGxldCBlbnRyeSBvZiBvcHRpb25zKSB7XG4gICAgICBsZXQgd2lkdGggPSBEb20udGV4dFdpZHRoKERvbS50ZXh0KGVudHJ5KSwgZm9udCkgKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodFxuXG4gICAgICBpZiAod2lkdGggPiBtYXhXaWR0aCkge1xuICAgICAgICBtYXhXaWR0aCA9IHdpZHRoXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzQnV0dG9uVGFyZ2V0KHRhcmdldDogRXZlbnRUYXJnZXQpIHtcbiAgICByZXR1cm4gKHRhcmdldCA9PT0gdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudCB8fFxuICAgICAgdGFyZ2V0ID09PSB0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQuZWxlbWVudCB8fFxuICAgICAgdGFyZ2V0ID09PSB0aGlzLl9zZWxlY3RCdXR0b25FbGVtZW50LmVsZW1lbnQgfHxcbiAgICAgIHRhcmdldCA9PT0gdGhpcy5fdGh1bWJFbGVtZW50LmVsZW1lbnQpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzRHJvcGRvd25UYXJnZXQodGFyZ2V0OiBFdmVudFRhcmdldCkge1xuICAgIGxldCBjdXJyZW50ID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50XG4gICAgd2hpbGUgKGN1cnJlbnQgIT09IHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50ICYmIGN1cnJlbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudFxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50ID09PSB0aGlzLl9kcm9wZG93bkVsZW1lbnQuZWxlbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFVJIGlmIHRoZSBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIG1ha2VzIHN1cmUgdGhlXG4gICAqIHNlbGVjdCBjb250cm9sIGFuZCB0aGUgZ2VuZXJhdGVkIG1hcmt1cCBhcmUgc3luY2hyb25pemVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zZWxlY3RlZEl0ZW1DaGFuZ2VkKFxuICAgIG5ld0l0ZW06IEVsZW1lbnQsXG4gICAgYXV0b0Nsb3NlID0gdHJ1ZSxcbiAgICBtdWx0aXNlbGVjdCA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IG9sZEl0ZW1zID0gdGhpcy5fZHJvcGRvd25FbGVtZW50LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Q0xBU1NfSVRFTV9TRUxFQ1RFRH1gKVxuXG4gICAgaWYgKCFuZXdJdGVtKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2xvc2UoKSwgVElNRU9VVF9DTE9TRSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChEb20uaGFzQ2xhc3MobmV3SXRlbSwgQ0xBU1NfSVRFTV9ESVNBQkxFRCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICgob2xkSXRlbXMubGVuZ3RoID09PSAwKSAmJiAhbmV3SXRlbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG5vdCBzZWxlY3QgdW5kZWZpbmVkIGVsZW1lbnRzXCIpXG4gICAgfVxuXG4gICAgbGV0IG9sZEl0ZW0gPSBvbGRJdGVtc1swXVxuXG4gICAgaWYgKG11bHRpc2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICBvbGRJdGVtID0gZmluZChvbGRJdGVtcywgKHgpID0+IHguZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKSA9PT0gbmV3SXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpKSFcbiAgICB9XG5cbiAgICBsZXQgaXNEZXNlbGVjdCA9IGZhbHNlXG5cbiAgICBpZiAobmV3SXRlbSAmJiBvbGRJdGVtICYmIG9sZEl0ZW0gPT09IG5ld0l0ZW0pIHtcbiAgICAgIC8vIENsaWNrIG9uIGEgcHJldmlvdXNseSBzZWxlY3RlZCBlbGVtZW50IC0+IGRlc2VsZWN0XG4gICAgICBpc0Rlc2VsZWN0ID0gdHJ1ZVxuXG4gICAgICBpZiAoIXRoaXMuX3BsYWNlaG9sZGVyT3B0aW9uICYmICFtdWx0aXNlbGVjdCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBwbGFjZWhvbGRlciBvcHRpb24sIG5vbiBtdWx0aXNlbGVjdCBvcHRpb25zIGNhbm5vdCBiZSBkZXNlbGVjdGVkXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBkZWxldGUgdGhpcy5fbGFzdFNlbGVjdGVkT3B0aW9uXG4gICAgfVxuXG4gICAgaWYgKG9sZEl0ZW0pIHtcbiAgICAgIC8vIFJlbW92ZSBzZWxlY3Rpb24gb24gdGhlIGVsZW1lbnRcbiAgICAgIGxldCBvbGRWYWx1ZSA9IG9sZEl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKVxuICAgICAgbGV0IG9wdEVsZW1lbnQgPSBmaW5kKHRoaXMuZWxlbWVudC5vcHRpb25zLCAoeCkgPT4gIXguZGlzYWJsZWQgJiYgeC52YWx1ZSA9PT0gb2xkVmFsdWUpXG5cbiAgICAgIGlmICghb3B0RWxlbWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBvcHRpb24gd2l0aCB2YWx1ZSAke29sZFZhbHVlfSBkb2VzIG5vdCBleGlzdGApXG4gICAgICB9XG5cbiAgICAgIC8vIFVuc2V0IFNlbGVjdCB2YWx1ZVxuICAgICAgb3B0RWxlbWVudC5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICBEb20ucmVtb3ZlQ2xhc3Mob2xkSXRlbSwgQ0xBU1NfSVRFTV9TRUxFQ1RFRClcbiAgICB9XG5cbiAgICBpZiAoIWlzRGVzZWxlY3QpIHsgLy8gU2VsZWN0IGFuIG9wdGlvblxuICAgICAgLy8gU2VsZWN0IGEgbmV3IGl0ZW1cbiAgICAgIGxldCBuZXdWYWx1ZSA9IG5ld0l0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKVxuICAgICAgbGV0IG9wdEVsZW1lbnQgPSBmaW5kKHRoaXMuZWxlbWVudC5vcHRpb25zLCAoeCkgPT4gIXguZGlzYWJsZWQgJiYgeC52YWx1ZSA9PT0gbmV3VmFsdWUpXG5cbiAgICAgIGlmICghb3B0RWxlbWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBvcHRpb24gd2l0aCB2YWx1ZSAke25ld1ZhbHVlfSBkb2VzIG5vdCBleGlzdGApXG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBTZWxlY3QgdmFsdWVcbiAgICAgIG9wdEVsZW1lbnQuc2VsZWN0ZWQgPSB0cnVlXG4gICAgICBEb20uYWRkQ2xhc3MobmV3SXRlbSwgQ0xBU1NfSVRFTV9TRUxFQ1RFRClcblxuICAgICAgLy8gUHJlc2VydmUgc2VsZWN0aW9uXG4gICAgICB0aGlzLl9sYXN0U2VsZWN0ZWRPcHRpb24gPSBvcHRFbGVtZW50XG5cbiAgICB9IGVsc2UgeyAvLyBEZXNlbGVjdCBhbiBvcHRpb25cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgZmFsbGluZyBiYWNrIHRvIHRoZSBwbGFjZWhvbGRlciAoaWYgYW55KVxuICAgICAgaWYgKHRoaXMuX3BsYWNlaG9sZGVyT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTZWxlY3RlZE9wdGlvbiA9IHRoaXMuX3BsYWNlaG9sZGVyT3B0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGhhc1NlbGVjdGVkSXRlbXMgPSB0cnVlXG5cbiAgICBpZiAodGhpcy5fbXVsdGlzZWxlY3Rpb24gPT09IGZhbHNlICYmIGlzRGVzZWxlY3QpIHtcbiAgICAgIC8vIEhhbmRsZSBubyBzZWxlY3Rpb24gZm9yIG5vbi1tdWx0aXNlbGVjdCBzdGF0ZXNcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyT3B0aW9uIS5zZWxlY3RlZCA9IHRydWVcbiAgICAgIGhhc1NlbGVjdGVkSXRlbXMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9tdWx0aXNlbGVjdGlvbiA9PT0gdHJ1ZSAmJiB0aGlzLl9nZXRTZWxlY3RlZE9wdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGhhc1NlbGVjdGVkSXRlbXMgPSBmYWxzZVxuICAgIH1cblxuICAgIC8vIFJlc2V0IHRoZSBmaWx0ZXIgaWYgZmlsdGVyYWJsZVxuICAgIGlmICh0aGlzLl9hY3RpdmVGaWx0ZXIpIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyKClcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQbGFjZWhvbGRlcihoYXNTZWxlY3RlZEl0ZW1zKVxuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGNoYW5nZWQgZXZlbnRcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJjaGFuZ2VcIilcblxuICAgIGlmIChhdXRvQ2xvc2UgJiYgIW11bHRpc2VsZWN0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgICB9LCBUSU1FT1VUX0NMT1NFKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfdXBkYXRlUGxhY2Vob2xkZXIoaGFzU2VsZWN0ZWRJdGVtczogYm9vbGVhbikge1xuICAgIGxldCB0ZXh0ID0gdGhpcy5fcGxhY2Vob2xkZXJPcHRpb24gPyBEb20udGV4dCh0aGlzLl9wbGFjZWhvbGRlck9wdGlvbikgOiBcIiBcIlxuXG4gICAgaWYgKGhhc1NlbGVjdGVkSXRlbXMgPT09IHRydWUpIHtcbiAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gdGhpcy5fZ2V0U2VsZWN0ZWRPcHRpb25zKClcblxuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0ZXh0ID0gXCJcIlxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICB0ZXh0ICs9IGAke0RvbS50ZXh0KGl0ZW0pfSwgYFxuICAgICAgICB9XG4gICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCB0ZXh0Lmxlbmd0aCAtIDIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0UGxhY2Vob2xkZXIodGV4dClcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0U2VsZWN0ZWRPcHRpb25zKCkge1xuICAgIGxldCBzZWxlY3RlZE9wdGlvbnM6IEhUTUxPcHRpb25FbGVtZW50W10gPSBbXVxuICAgIGlmICh0aGlzLmVsZW1lbnQub3B0aW9ucykge1xuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudC5vcHRpb25zLCAoKG9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uKVxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uc1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lIGFsbCBvZiB0aGUgaW5pdGlhbGx5IHNldCBvcHRpb25zIChhbmQgb3B0Z3JvdXBzKSBhbmQgcmV0dXJucyB0aGVtIGluIGEgbmV3IGFycmF5LlxuICAgKiBUaGlzIHNlcnZlcyBhcyB0aGUgYmFzaXMgZm9yIGZpbHRlcmluZy4gSWYgYSBmaWx0ZXIgaXMgcHJlc2VudCwgaXQgd2lsbCBiZSByZXNwZWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxPcHRpb25zKCk6IEVsZW1lbnRbXSB7XG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5fYWN0aXZlRmlsdGVyIHx8IFwiXCJcbiAgICBjb25zdCBmaWx0ZXJlZDogRWxlbWVudFtdID0gW11cbiAgICBjb25zdCBpbml0aWFsT3B0aW9ucyA9IHRoaXMuX2luaXRpYWxPcHRpb25zXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGlsZDogRWxlbWVudCA9IGluaXRpYWxPcHRpb25zW2ldIGFzIEVsZW1lbnRcblxuICAgICAgaWYgKHRoaXMuX2lzT3B0R3JvdXAoY2hpbGQpKSB7IC8vIGhhbmRsZSA8b3B0Z3JvdXA+XG4gICAgICAgIGNvbnN0IG9wdEdyb3VwQ2xvbmU6IEVsZW1lbnQgPSBjaGlsZC5jbG9uZU5vZGUoZmFsc2UpIGFzIEVsZW1lbnRcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2VcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uQ2xvbmU6IEVsZW1lbnQgPSBjaGlsZC5jaGlsZHJlbltqXS5jbG9uZU5vZGUodHJ1ZSkgYXMgRWxlbWVudFxuXG4gICAgICAgICAgLy8gQXBwZW5kIG9uIG1hdGNoXG4gICAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5zV29yZChvcHRpb25DbG9uZS5pbm5lckhUTUwsIGZpbHRlcikpIHtcbiAgICAgICAgICAgIG9wdEdyb3VwQ2xvbmUuYXBwZW5kQ2hpbGQob3B0aW9uQ2xvbmUpXG4gICAgICAgICAgICBmb3VuZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQdXNoIGlmIGFueSBtYXRjaGVzIGZvdW5kXG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIGZpbHRlcmVkLnB1c2gob3B0R3JvdXBDbG9uZSlcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2lzT3B0aW9uKGNoaWxkKSkgeyAvLyBoYW5kbGUgPG9wdGlvbj5cbiAgICAgICAgY29uc3Qgb3B0aW9uQ2xvbmU6IEVsZW1lbnQgPSBjaGlsZC5jbG9uZU5vZGUodHJ1ZSkgYXMgRWxlbWVudFxuXG4gICAgICAgIC8vIFB1c2ggb24gbWF0Y2hcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5zV29yZChvcHRpb25DbG9uZS5pbm5lckhUTUwsIGZpbHRlcikpIHtcbiAgICAgICAgICBmaWx0ZXJlZC5wdXNoKG9wdGlvbkNsb25lKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgdGV4dCBjb250YWlucyBhIGdpdmVuIGtleXdvcmQsIGUuZy4gaW4gXCJjYVwiIGluIFwiQ2FyXCJcbiAgICovXG4gIHByaXZhdGUgX2NvbnRhaW5zV29yZCh0ZXh0OiBzdHJpbmcsIGtleXdvcmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihrZXl3b3JkLnRvTG93ZXJDYXNlKCkpID4gLTFcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5vcGVuKClcbiAgICB0aGlzLl9vcGVuQnlGb2N1cyA9IHRydWVcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fb3BlbkJ5Rm9jdXMgPSBmYWxzZVxuICAgIH0sIFRJTUVPVVRfQkxVUilcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLmNsb3NlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgbGV0IGhhbmRsZWQgPSBmYWxzZVxuXG4gICAgaWYgKHRoaXMuX2xhc3RIYW5kbGVkRXZlbnQgPT09IGV2ZW50KSB7XG4gICAgICB0aGlzLl9sYXN0SGFuZGxlZEV2ZW50ID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNCdXR0b25UYXJnZXQoZXZlbnQudGFyZ2V0ISkgJiYgdGhpcy5fb3BlbkJ5Rm9jdXMgPT09IGZhbHNlKSB7XG4gICAgICAvLyBoYW5kbGUgaGVhZGVyIGl0ZW0gY2xpY2tzIGFuZCB0b2dnbGUgZHJvcGRvd25cbiAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgIGhhbmRsZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgbGV0IG5ld0l0ZW0gPSBldmVudC50YXJnZXQgYXMgRWxlbWVudFxuXG4gICAgaWYgKCFoYW5kbGVkICYmIERvbS5oYXNDbGFzcyhuZXdJdGVtLCBDTEFTU19JVEVNKSkge1xuICAgICAgLy8gaGFuZGxlIGNsaWNrcyBvbiBkcm9wZG93biBpdGVtc1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZChuZXdJdGVtLCB0cnVlLCB0aGlzLl9tdWx0aXNlbGVjdGlvbilcbiAgICAgIGhhbmRsZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgIHRoaXMuX2xhc3RIYW5kbGVkRXZlbnQgPSBldmVudFxuICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVXaW5kb3dDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLl9pc0Ryb3Bkb3duVGFyZ2V0KGV2ZW50LnRhcmdldCEpIHx8IHRoaXMuX2lzQnV0dG9uVGFyZ2V0KGV2ZW50LnRhcmdldCEpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfZm9jdXNPcHRpb25TdGFydGluZ1dpdGgoa2V5Y29kZTogbnVtYmVyLCBzdGFydEluZGV4OiBudW1iZXIsIG9wdGlvbnM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydEluZGV4OyBpbmRleCA8IG9wdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgaXRlbSA9IG5ldyBEb21FbGVtZW50KG9wdGlvbnNbaW5kZXhdKVxuICAgICAgbGV0IHZhbHVlID0gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKVxuXG4gICAgICBpZiAoaW5kZXggPiBvcHRpb25zLmxlbmd0aCkge1xuICAgICAgICBpbmRleCA9IDBcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoSW5wdXRzLmdldEtleVZhbHVlKGtleWNvZGUpKSkge1xuICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IERvbUVsZW1lbnQob3B0aW9uc1tpbmRleF0pXG5cbiAgICAgICAgaWYgKCFuZXdPcHRpb24uaGFzQ2xhc3MoQ0xBU1NfSVRFTV9ESVNBQkxFRCkpIHtcbiAgICAgICAgICBzY3JvbGxJbnRvVmlldyhvcHRpb25zW2luZGV4XSlcbiAgICAgICAgICBuZXdPcHRpb24uYWRkQ2xhc3MoQ0xBU1NfSVRFTV9GT0NVU0VEKVxuICAgICAgICAgIHJldHVybiBuZXdPcHRpb25cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3Qga2V5Ym9hcmRFdmVudCA9IGV2ZW50IGFzIEtleWJvYXJkRXZlbnRcbiAgICBsZXQgZXZ0ID0ga2V5Ym9hcmRFdmVudCB8fCB3aW5kb3cuZXZlbnRcbiAgICBsZXQga2V5Y29kZSA9IGtleWJvYXJkRXZlbnQud2hpY2ggfHwga2V5Ym9hcmRFdmVudC5rZXlDb2RlXG5cbiAgICBpZiAoa2V5Y29kZSA9PT0gSW5wdXRzLktFWV9FU0NBUEUpIHtcbiAgICAgIC8vIGhhbmRsZSBFc2NhcGUga2V5IChFU0MpXG4gICAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgIH1cbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoa2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19VUCB8fCBrZXljb2RlID09PSBJbnB1dHMuS0VZX0FSUk9XX0RPV04pIHtcbiAgICAgIC8vIFVwIGFuZCBkb3duIGFycm93c1xuXG4gICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX3dyYXBwZXJFbGVtZW50LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Q0xBU1NfSVRFTX1gKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PlxuICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGxldCBuZXdJbmRleCA9IDBcbiAgICAgICAgbGV0IG9sZE9wdGlvblxuXG4gICAgICAgIGxldCBmb2N1c2VkRWxlbWVudCA9IHRoaXMuX3dyYXBwZXJFbGVtZW50LmZpbmQoYC4ke0NMQVNTX0lURU1fRk9DVVNFRH1gKVxuICAgICAgICBsZXQgc2VhcmNoRm9yID0gZm9jdXNlZEVsZW1lbnQgPyBDTEFTU19JVEVNX0ZPQ1VTRUQgOiBDTEFTU19JVEVNX1NFTEVDVEVEXG5cbiAgICAgICAgbGV0IG5ld0VsZW1lbnRcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3B0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBsZXQgZGlyZWN0aW9uID0ga2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19ET1dOID8gMSA6IC0xXG5cbiAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBEb21FbGVtZW50KG9wdGlvbnNbaW5kZXhdKVxuXG4gICAgICAgICAgLy8gc2VhcmNoIGZvciBzZWxlY3RlZCBvciBmb2N1c2VkRWxlbWVudCBlbGVtZW50c1xuICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKHNlYXJjaEZvcikpIHtcbiAgICAgICAgICAgIG9sZE9wdGlvbiA9IGl0ZW1cbiAgICAgICAgICAgIG5ld0luZGV4ID0gaW5kZXhcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IG5vdCBkaXNhYmxlZCBlbGVtZW50IGluIHRoZSBhcHByb3ByaWF0ZSBkaXJlY3Rpb25cbiAgICAgICAgICAgIGZvciAobGV0IGNvdW50ID0gMDsgY291bnQgPCBvcHRpb25zLmxlbmd0aDsgY291bnQrKykge1xuICAgICAgICAgICAgICBuZXdJbmRleCArPSBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgbmV3SW5kZXggJT0gb3B0aW9ucy5sZW5ndGhcblxuICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5ld0VsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChvcHRpb25zW25ld0luZGV4XSlcbiAgICAgICAgICAgICAgaWYgKCFuZXdFbGVtZW50Lmhhc0NsYXNzKENMQVNTX0lURU1fRElTQUJMRUQpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgbmV3IGVsZW1lbnQgZm9jdXNlZFxuICAgICAgICBzY3JvbGxJbnRvVmlldyhvcHRpb25zW25ld0luZGV4XSlcbiAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBEb21FbGVtZW50KG9wdGlvbnNbbmV3SW5kZXhdKVxuICAgICAgICBuZXdPcHRpb24uYWRkQ2xhc3MoQ0xBU1NfSVRFTV9GT0NVU0VEKVxuXG4gICAgICAgIGlmIChvbGRPcHRpb24pIHtcbiAgICAgICAgICBvbGRPcHRpb24ucmVtb3ZlQ2xhc3MoQ0xBU1NfSVRFTV9GT0NVU0VEKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoSW5wdXRzLmdldEtleVZhbHVlKGtleWNvZGUpICYmICF0aGlzLl9pc0ZpbHRlcmFibGUoKSkge1xuICAgICAgLy8gS2V5Ym9hcmQga2V5c1xuXG4gICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX3dyYXBwZXJFbGVtZW50LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Q0xBU1NfSVRFTX1gKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PlxuICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGxldCBvbGRGb2N1c0luZGV4ID0gMFxuICAgICAgICBsZXQgaGFzRm9jdXNlZE9wdGlvbiA9IGZhbHNlXG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9wdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgRG9tRWxlbWVudChvcHRpb25zW2luZGV4XSlcblxuICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKENMQVNTX0lURU1fRk9DVVNFRCkpIHtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoQ0xBU1NfSVRFTV9GT0NVU0VEKVxuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpdGVtLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICBpZiAodmFsdWUuc3RhcnRzV2l0aChJbnB1dHMuZ2V0S2V5VmFsdWUoa2V5Y29kZSkpKSB7XG4gICAgICAgICAgICAgIGhhc0ZvY3VzZWRPcHRpb24gPSB0cnVlXG4gICAgICAgICAgICAgIG9sZEZvY3VzSW5kZXggPSBpbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdPcHRpb24gPSB0aGlzLl9mb2N1c09wdGlvblN0YXJ0aW5nV2l0aChrZXljb2RlLCBoYXNGb2N1c2VkT3B0aW9uID8gb2xkRm9jdXNJbmRleCArIDEgOiAwLCBvcHRpb25zKVxuICAgICAgICBpZiAobmV3T3B0aW9uID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgIHRoaXMuX2ZvY3VzT3B0aW9uU3RhcnRpbmdXaXRoKGtleWNvZGUsIDAsIG9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChrZXljb2RlID09PSBJbnB1dHMuS0VZX0VOVEVSIHx8IGtleWNvZGUgPT09IElucHV0cy5LRVlfVEFCKSB7XG4gICAgICAvLyBIYW5kbGUgZW50ZXIgYW5kIHRhYiBrZXkgYnkgc2VsZWN0aW5nIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICBsZXQgbmV3SXRlbSA9IHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0NMQVNTX0lURU1fRk9DVVNFRH1gKSFcbiAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbUNoYW5nZWQobmV3SXRlbSwgdHJ1ZSwgdGhpcy5fbXVsdGlzZWxlY3Rpb24pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleSBpbiB0aGUgZmlsdGVyIGZpZWxkXG4gICAqL1xuICBwcml2YXRlIF9oYW5kbGVGaWx0ZXJLZXlkb3duKGU6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Ym9hcmRFdmVudCA9IGUgYXMgS2V5Ym9hcmRFdmVudFxuICAgIGNvbnN0IGtleWNvZGUgPSBrZXlib2FyZEV2ZW50LndoaWNoIHx8IGtleWJvYXJkRXZlbnQua2V5Q29kZVxuXG4gICAgLy8gSWYgdGhlIHVzZXIgaGl0cyB0aGUgZW50ZXIga2V5IHdoaWxlIGZpbHRlcmluZyBhbmQgdGhlcmUncyBhIHNpbmdsZSBtYXRjaCwgc2VsZWN0IGl0XG4gICAgaWYgKGtleWNvZGUgPT09IElucHV0cy5LRVlfRU5URVIpIHtcbiAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudHMgPSB0aGlzLl9kcm9wZG93bkVsZW1lbnQuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU19JVEVNfWApXG5cbiAgICAgIGlmIChkcm9wZG93bkVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZEl0ZW1DaGFuZ2VkKGRyb3Bkb3duRWxlbWVudHNbMF0sIHRydWUsIHRoaXMuX211bHRpc2VsZWN0aW9uKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgcmVsZWFzZXMgYSBrZXkgaW4gdGhlIGZpbHRlciBmaWVsZFxuICAgKi9cbiAgcHJpdmF0ZSBfaGFuZGxlRmlsdGVyS2V5dXAoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG5cbiAgICAvLyBGaWx0ZXIgaGFzIGNoYW5nZWRcbiAgICBpZiAodGFyZ2V0LnZhbHVlICE9PSB0aGlzLl9hY3RpdmVGaWx0ZXIgJiYgdGFyZ2V0LnZhbHVlICE9PSB0aGlzLl9wbGFjZWhvbGRlclRleHQgJiYgdGFyZ2V0LnZhbHVlICE9PSB0aGlzLl9sYXN0U2VsZWN0ZWRPcHRpb24hLmlubmVySFRNTCkge1xuICAgICAgdGhpcy5fc2V0RmlsdGVyKHRhcmdldC52YWx1ZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlyZWQgd2hlbiB0aGUgdXNlciBmb2N1c3NlcyB0aGUgZmlsdGVyIGlucHV0IGZpZWxkXG4gICAqL1xuICBwcml2YXRlIF9oYW5kbGVGaWx0ZXJGb2N1cyhlOiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LnNlbGVjdCgpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIHRoZSBTZWxlY3QgYnkgYSBnaXZlbiBmaWx0ZXIga2V5d29yZFxuICAgKiBAcGFyYW0gZmlsdGVyIEtleXdvcmQgdG8gZmlsdGVyIGJ5XG4gICAqL1xuICBwcml2YXRlIF9zZXRGaWx0ZXIoZmlsdGVyOiBzdHJpbmcgPSBcIlwiKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlRmlsdGVyID0gKGZpbHRlci5sZW5ndGggPj0gdGhpcy5fbWluRmlsdGVyTGVuZ3RoKSA/IGZpbHRlciA6IFwiXCJcbiAgICB0aGlzLnNldE9wdGlvbnModGhpcy5nZXRJbml0aWFsT3B0aW9ucygpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgZmlsdGVyXG4gICAqL1xuICBwcml2YXRlIF9jbGVhckZpbHRlcigpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5fYWN0aXZlRmlsdGVyXG4gICAgdGhpcy5zZXRPcHRpb25zKHRoaXMuZ2V0SW5pdGlhbE9wdGlvbnMoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGNvbnRlbnQgYW5kIHJlbG9hZCB0aGUgU2VsZWN0XG4gICAqIEBwYXJhbSBlbGVtZW50cyBBcnJheSBvZiBuZXcgb3B0aW9uIChvciBvcHRncm91cCkgZWxlbWVudHMgdG8gZGlzcGxheVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKG9wdGlvbnM6IEVsZW1lbnRbXSk6IHZvaWQge1xuICAgIHRoaXMuX2VtcHR5Tm9kZSh0aGlzLmVsZW1lbnQpXG5cbiAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9KVxuXG4gICAgLy8gUHJlc2VydmUgc2VsZWN0ZWQgdmFsdWUgaWYgdGhlIHNlbGVjdGVkXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy5fbGFzdFNlbGVjdGVkT3B0aW9uIS52YWx1ZVxuXG4gICAgdGhpcy5yZWxvYWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBjaGlsZHJlbiBvZiBhIGdpdmVuIG5vZGVcbiAgICogQHBhcmFtIG5vZGUgTm9kZVxuICAgKi9cbiAgcHJpdmF0ZSBfZW1wdHlOb2RlKG5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIGFuIG9wdGlvbiBpcyBhIHBsYWNlaG9sZGVyIG9wdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfaXNQbGFjZWhvbGRlcihvcHRpb246IEhUTUxPcHRpb25FbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9wdGlvbi5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSAmJiBvcHRpb24uaGFzQXR0cmlidXRlKFwic2VsZWN0ZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGxhY2Vob2xkZXIgdmFsdWVcbiAgICogQHBhcmFtIHRleHQgQ29udGVudCBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICovXG4gIHByb3RlY3RlZCBfc2V0UGxhY2Vob2xkZXIodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudCAmJiB0ZXh0KSB7XG4gICAgICBpZiAodGhpcy5faXNGaWx0ZXJhYmxlKCkpIHtcbiAgICAgICAgKHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudCBhcyBEb21FbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KS5lbGVtZW50LnZhbHVlID0gdGV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LnNldEh0bWwodGV4dClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb24uXG4gICAqIElmIG11bHRpcGxlIHNlbGVjdGlvbiBpcyBlbmFibGVkIHRoaXMgcHJvcGVydHkgcmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMuXG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuX211bHRpc2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0U2VsZWN0ZWRPcHRpb25zKCkubWFwKCh4KSA9PiB4LnZhbHVlKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC52YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlIHNlbGVjdCBjb21wb25lbnQgZGVwZW5kaW5nIG9uIHRoZVxuICAgKiAndmFsdWUnIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHt2YWx1ZX0gSWYgdHJ1ZSBkaXNhYmxlcyB0aGUgY29udHJvbDsgZmFsc2UgZW5hYmxlcyBpdC5cbiAgICovXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGUoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWRzIHRoZSBkcm9wZG93bidzIG9wdGlvbiBkYXRhIGRlZmluaXRpb25zIGZyb20gdGhlIERPTSBhbmQgdXBkYXRlc1xuICAgKiB0aGUgZ2VuZXJhdGVkIGRyb3Bkb3duIGRpc3BsYXkgaXRlbXMuXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkKCkge1xuICAgIC8vIFJlbW92ZSBhbGwgZXhpc3RpbmcgY2hpbGQgZWxlbWVudHNcbiAgICB0aGlzLl9lbXB0eU5vZGUodGhpcy5fZHJvcGRvd25FbGVtZW50LmVsZW1lbnQpXG5cbiAgICBpZiAodGhpcy5fYWN0aXZlRmlsdGVyID09PSB1bmRlZmluZWQpIHsgLy8gSWYgdGhlIHVzZXIgaXMgZmlsdGVyaW5nLCBsZXQgdGhlIHBsYWNlaG9sZGVyIFwiaW5wdXRcIiBhbGl2ZVxuICAgICAgdGhpcy5fc2V0dXBQbGFjZWhvbGRlcigpXG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlT3B0aW9ucyh0aGlzLmVsZW1lbnQpXG5cbiAgICB0aGlzLl91cGRhdGVTaXplKClcbiAgICB0aGlzLl91cGRhdGVNZXNzYWdlKClcblxuICAgIGlmICghdGhpcy5faXNGaWx0ZXJhYmxlKCkpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBsYWNlaG9sZGVyKCEhdGhpcy52YWx1ZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0IGNvbnRyb2wgdG8gdGhlIGVuYWJsZWQgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKVxuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LnJlbW92ZUNsYXNzKENMQVNTX0RJU0FCTEVEKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl93aW5kb3dDbGlja0hhbmRsZXIpXG5cbiAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9jbGlja0hhbmRsZXIpXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9rZXlkb3duSGFuZGxlcilcbiAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLl9mb2N1c0hhbmRsZXIpXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9ibHVySGFuZGxlcilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWxlY3QgY29udHJvbCB0byB0aGUgZGlzYWJsZWQgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIilcbiAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5hZGRDbGFzcyhDTEFTU19ESVNBQkxFRClcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fd2luZG93Q2xpY2tIYW5kbGVyKVxuXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fY2xpY2tIYW5kbGVyKVxuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fa2V5ZG93bkhhbmRsZXIpXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5fZm9jdXNIYW5kbGVyKVxuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgdGhpcy5fYmx1ckhhbmRsZXIpXG5cbiAgICB0aGlzLmNsb3NlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvcGVuL2Nsb3NlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0IGRyb3Bkb3duLlxuICAgKi9cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgaWYgdGhlIHNlbGVjdCBkcm9wZG93biBpcyBvcGVuIG9yIGNsb3NlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBvcGVuOyBvdGhlcndpc2UgZmFsc2UuXG4gICAqL1xuICBwdWJsaWMgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl93cmFwcGVyRWxlbWVudC5oYXNDbGFzcyhDTEFTU19PUEVOKVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBzZWxlY3QgZHJvcGRvd24uXG4gICAqL1xuICBwdWJsaWMgb3BlbigpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuX29wZW5CeUZvY3VzID0gZmFsc2VcblxuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQucmVtb3ZlQ2xhc3MoQ0xBU1NfQ0xPU0VEKVxuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuYWRkQ2xhc3MoQ0xBU1NfT1BFTilcblxuICAgICAgdGhpcy5fZHJvcGRvd25FbGVtZW50LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZURyb3Bkb3duQ2xpY2spXG4gICAgICB0aGlzLl9kcm9wZG93bkVsZW1lbnQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidGFwXCIsIHRoaXMuX2hhbmRsZURyb3Bkb3duQ2xpY2spXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc2VsZWN0IGRyb3Bkb3duLlxuICAgKi9cbiAgcHVibGljIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLl9vcGVuQnlGb2N1cyA9IGZhbHNlXG5cbiAgICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LnJlbW92ZUNsYXNzKENMQVNTX09QRU4pXG4gICAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5hZGRDbGFzcyhDTEFTU19DTE9TRUQpXG5cbiAgICAgIC8vIElmIHRoZSBTZWxlY3QgaXMgZmlsdGVyYWJsZSBhbmQgdGhlcmVmb3JlIGhhcyBhbiBpbnB1dCBmaWVsZCxcbiAgICAgIC8vIHJlc2V0IHRoZSB2YWx1ZSBvZiBpdCB0byB0aGUgY2hvc2VuIG9wdGlvblxuICAgICAgaWYgKHRoaXMuX2lzRmlsdGVyYWJsZSgpKSB7XG4gICAgICAgIC8vIFVuZm9jdXMgaW5wdXQgZmllbGRcbiAgICAgICAgKHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudC5lbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmJsdXIoKVxuXG4gICAgICAgIGlmICghdGhpcy5fYWN0aXZlRmlsdGVyIHx8IHRoaXMuX2FjdGl2ZUZpbHRlciA9PT0gdGhpcy5fbGFzdFNlbGVjdGVkT3B0aW9uIS5pbm5lckhUTUwpIHtcbiAgICAgICAgICB0aGlzLl9zZXRQbGFjZWhvbGRlcih0aGlzLl9sYXN0U2VsZWN0ZWRPcHRpb24hLmlubmVySFRNTClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9kcm9wZG93bkVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlRHJvcGRvd25DbGljaylcbiAgICAgIHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0YXBcIiwgdGhpcy5faGFuZGxlRHJvcGRvd25DbGljaylcblxuICAgICAgbGV0IGZvY3VzZWRJdGVtID0gdGhpcy5fd3JhcHBlckVsZW1lbnQuZmluZChgLiR7Q0xBU1NfSVRFTV9GT0NVU0VEfWApXG5cbiAgICAgIGlmIChmb2N1c2VkSXRlbSkge1xuICAgICAgICBmb2N1c2VkSXRlbS5yZW1vdmVDbGFzcyhDTEFTU19JVEVNX0ZPQ1VTRUQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBlbGVtZW50IGhhcyB0aGUgZmlsdGVyIG1vZGlmaWVyIGNsYXNzXG4gICAqL1xuICBwcml2YXRlIF9pc0ZpbHRlcmFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZXJFbGVtZW50Lmhhc0NsYXNzKENMQVNTX0ZJTFRFUkFCTEUpXG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGNvbXBvbmVudCBhbmQgY2xlYXJzIGFsbCByZWZlcmVuY2VzLlxuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl93aW5kb3dDbGlja0hhbmRsZXIpXG5cbiAgICBpZiAodGhpcy5fZHJvcGRvd25FbGVtZW50KSB7XG4gICAgICB0aGlzLl9kcm9wZG93bkVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlRHJvcGRvd25DbGljaylcbiAgICAgIHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0YXBcIiwgdGhpcy5faGFuZGxlRHJvcGRvd25DbGljaylcblxuICAgICAgcmVtb3ZlKHRoaXMuX2Ryb3Bkb3duRWxlbWVudC5lbGVtZW50KTtcbiAgICAgICh0aGlzIGFzIGFueSkuX2Ryb3Bkb3duRWxlbWVudCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9wbGFjZWhvbGRlckVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9maWx0ZXJLZXlkb3duSGFuZGxlcilcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5fZmlsdGVyS2V5dXBIYW5kbGVyKVxuICAgICAgdGhpcy5fcGxhY2Vob2xkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLl9maWx0ZXJGb2N1c0hhbmRsZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3dyYXBwZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9jbGlja0hhbmRsZXIpXG4gICAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2tleWRvd25IYW5kbGVyKVxuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5fZm9jdXNIYW5kbGVyKVxuICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9ibHVySGFuZGxlcik7XG5cbiAgICAgICh0aGlzIGFzIGFueSkuX3dyYXBwZXJFbGVtZW50ID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NlbGVjdEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIHJlbW92ZSh0aGlzLl9zZWxlY3RCdXR0b25FbGVtZW50LmVsZW1lbnQpO1xuICAgICAgKHRoaXMgYXMgYW55KS5fc2VsZWN0QnV0dG9uRWxlbWVudCA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoQ0xBU1NfQ0xPU0VEKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplPEhUTUxTZWxlY3RFbGVtZW50PihcInNlbGVjdFwiLCAoZSkgPT4ge1xuICAgIG5ldyBTZWxlY3QoZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
