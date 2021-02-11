import { __extends, __values } from "tslib";
import { searchAndInitialize, preventDefault } from "../Utils";
import { empty, addClass, removeClass, hasClass } from "../DomFunctions";
import DomElement from "../DomElement";
import * as Inputs from "../Inputs";
var QUERY_DROPDOWN = ".js-autocomplete";
var CLASS_RESULT = "autocomplete__result";
var CLASS_OPEN = "is-open";
var CLASS_HOVER = "js-hover";
var ATTRIBUTE_VALUE = "data-value";
var TIMEOUT_BLUR = 400;
/**
 * Autocomplete component
 * @fires Autocomplete#change
 */
var Autocomplete = /** @class */ (function (_super) {
    __extends(Autocomplete, _super);
    function Autocomplete(element, configuration) {
        var _this = _super.call(this, element) || this;
        _this._input = _this.element.querySelector("input");
        _this._dropdown = _this.element.querySelector(QUERY_DROPDOWN);
        // Setup event context
        _this._clickHandler = _this._handleClick.bind(_this);
        _this._windowClickHandler = _this._handleWindowClick.bind(_this);
        _this._keyUpHandler = _this._handleKeyUp.bind(_this);
        _this._keyDownHandler = _this._handleKeyDown.bind(_this);
        _this._blurHandler = _this._handleBlur.bind(_this);
        if (configuration) {
            _this._minChars = configuration.minChars;
            _this._source = configuration.source;
        }
        if (!_this._minChars || _this._minChars < 0) {
            _this._minChars = 2;
        }
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the Autocomplete component.
     * @private
     */
    Autocomplete.prototype._initialize = function () {
        this._clearSuggestions();
        if (this._input.getAttribute("disabled")) {
            this.disable();
        }
        else {
            this.enable();
        }
        // Disable browser autofill
        this._input.setAttribute("autocomplete", "off");
    };
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
    Autocomplete.prototype.configure = function (configuration) {
        if (!configuration) {
            return;
        }
        if (configuration.minChars) {
            this._minChars = Math.min(configuration.minChars, 1);
        }
        if (configuration.source) {
            this._source = configuration.source;
        }
        this._clearSuggestions();
    };
    /**
     * Sets the select control to the enabled state.
     */
    Autocomplete.prototype.enable = function () {
        if (!this._input) {
            return;
        }
        this._input.removeAttribute("disabled");
        this._input.addEventListener("keyup", this._keyUpHandler);
        this._input.addEventListener("keydown", this._keyDownHandler);
        this._input.addEventListener("blur", this._blurHandler);
    };
    /**
     * Sets the select control to the disabled state.
     */
    Autocomplete.prototype.disable = function () {
        if (!this._input) {
            return;
        }
        this._input.setAttribute("disabled", "true");
        this._input.removeEventListener("keyup", this._keyUpHandler);
        this._input.removeEventListener("keydown", this._keyDownHandler);
        this._input.removeEventListener("blur", this._blurHandler);
        this.close();
    };
    /**
     * Destroys the component and frees all references.
     */
    Autocomplete.prototype.destroy = function () {
        this.disable();
        this._keyUpHandler = undefined;
        this._keyDownHandler = undefined;
        this._windowClickHandler = undefined;
        this._blurHandler = undefined;
        this._input = undefined;
    };
    /**
     * Closes the suggestions dropdown.
     */
    Autocomplete.prototype.open = function () {
        this._dropdown.addEventListener("click", this._clickHandler);
        window.addEventListener("click", this._windowClickHandler);
        this.addClass(CLASS_OPEN);
    };
    /**
     * Opens the suggestions dropdown.
     */
    Autocomplete.prototype.close = function () {
        this._dropdown.removeEventListener("click", this._clickHandler);
        window.removeEventListener("click", this._windowClickHandler);
        this.removeClass(CLASS_OPEN);
    };
    Object.defineProperty(Autocomplete.prototype, "value", {
        /**
         * Gets the value of the input field.
         * @returns {String} The value of the input field.
         */
        get: function () {
            return this._input.value;
        },
        enumerable: false,
        configurable: true
    });
    Autocomplete.prototype._handleClick = function (event) {
        if (!this._isDropdownTarget(event.target)) {
            return;
        }
        var current = event.target;
        while (current.nodeName !== "LI" && current.parentNode) {
            current = current.parentNode;
        }
        if (current.nodeName === "LI") {
            preventDefault(event);
            this._selectItem(current);
        }
    };
    Autocomplete.prototype._handleBlur = function () {
        var _this = this;
        setTimeout(function () {
            _this.close();
        }, TIMEOUT_BLUR);
    };
    Autocomplete.prototype._handleKeyUp = function (evt) {
        var keycode = evt.which || evt.keyCode;
        if (Inputs.containsKey(keycode, [Inputs.KEY_ARROW_UP, Inputs.KEY_ARROW_DOWN, Inputs.KEY_ENTER, Inputs.KEY_TAB])) {
            // Do not handle these events on keyup
            preventDefault(evt);
            return;
        }
        var target = evt.currentTarget;
        if (evt.currentTarget && target.value && target.value.length >= this._minChars) {
            this._getSuggestion(target.value);
        }
        else {
            this.close();
        }
    };
    Autocomplete.prototype._handleKeyDown = function (evt) {
        var keycode = evt.which || evt.keyCode;
        var isOpen = hasClass(this.element, CLASS_OPEN);
        if (keycode === Inputs.KEY_ESCAPE && isOpen === true) {
            // handle Escape key (ESC)
            this.close();
            preventDefault(evt);
            return;
        }
        if (isOpen === true && Inputs.containsKey(keycode, [Inputs.KEY_ENTER, Inputs.KEY_TAB])) {
            var focusedElement = this._suggestionList.querySelector("." + CLASS_HOVER);
            preventDefault(evt);
            this._selectItem(focusedElement);
            return;
        }
        if (isOpen === true && Inputs.containsKey(keycode, [Inputs.KEY_ARROW_UP, Inputs.KEY_ARROW_DOWN])) {
            // Up and down arrows
            var focusedElement = this._suggestionList.querySelector("." + CLASS_HOVER);
            if (focusedElement) {
                removeClass(focusedElement, CLASS_HOVER);
                var children = Array.prototype.slice.call(this._suggestionList.childNodes);
                var totalNodes = children.length - 1;
                var direction = keycode === Inputs.KEY_ARROW_UP ? -1 : 1;
                var index = children.indexOf(focusedElement);
                index = Math.max(Math.min(index + direction, totalNodes), 0);
                focusedElement = this._suggestionList.childNodes[index];
            }
            else {
                focusedElement = this._suggestionList.querySelector("li");
            }
            addClass(focusedElement, CLASS_HOVER);
            preventDefault(evt);
            return;
        }
    };
    Autocomplete.prototype._handleWindowClick = function (event) {
        if (this._isDropdownTarget(event.target)) {
            return;
        }
        this.close();
    };
    Autocomplete.prototype._selectItem = function (item) {
        if (!item) {
            return;
        }
        var text = item.getAttribute(ATTRIBUTE_VALUE);
        if (text) {
            this._input.value = text;
            // Dispatch the changed event
            this.dispatchEvent("change");
        }
        this.close();
    };
    Autocomplete.prototype._isDropdownTarget = function (target) {
        var current = target;
        while (current !== this._dropdown && current.parentNode) {
            current = current.parentNode;
        }
        return current === this._dropdown;
    };
    Autocomplete.prototype._clearSuggestions = function () {
        // Clear the dropdown item
        empty(this._dropdown);
        this._suggestionList = document.createElement("ul");
        this._dropdown.appendChild(this._suggestionList);
    };
    Autocomplete.prototype._addSuggestion = function (text, term) {
        var sanitizedTerm = term.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var html = text.replace(new RegExp("(" + sanitizedTerm + ")", "gi"), "<strong>$1</strong>");
        var textElement = new DomElement("span")
            .setHtml(html);
        var innerElement = new DomElement("div")
            .addClass(CLASS_RESULT)
            .appendChild(textElement);
        var liElement = new DomElement("li")
            .setAttribute(ATTRIBUTE_VALUE, text)
            .appendChild(innerElement);
        this._suggestionList.appendChild(liElement.element);
    };
    Autocomplete.prototype._getSuggestion = function (term) {
        var _this = this;
        if (!this._source) {
            throw new Error("The source function is undefined, cannot load suggestions");
        }
        this._source(term, function (matches, termused) {
            _this._onMatchesReceived(matches, termused);
        });
    };
    Autocomplete.prototype._onMatchesReceived = function (matches, term) {
        var e_1, _a;
        this._clearSuggestions();
        if (!matches || matches.length === 0) {
            this.close();
        }
        else {
            // Clear the dropdown item
            empty(this._suggestionList);
            try {
                for (var matches_1 = __values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                    var match = matches_1_1.value;
                    this._addSuggestion(match, term);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.open();
        }
    };
    return Autocomplete;
}(DomElement));
/**
 * Change event
 *
 * @event Autocomplete#change
 * @type {object}
 */
export function init() {
    searchAndInitialize(".input-field--autocomplete", function (e) {
        new Autocomplete(e);
    });
}
export default Autocomplete;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2Zvcm0vQXV0b2NvbXBsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUN4RSxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxXQUFXLENBQUE7QUFFbkMsSUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQUE7QUFDekMsSUFBTSxZQUFZLEdBQUcsc0JBQXNCLENBQUE7QUFDM0MsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFBO0FBQzVCLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQTtBQUM5QixJQUFNLGVBQWUsR0FBRyxZQUFZLENBQUE7QUFFcEMsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBO0FBY3hCOzs7R0FHRztBQUNIO0lBQTJCLGdDQUF1QjtJQWNoRCxzQkFBWSxPQUFvQixFQUFFLGFBQWtDO1FBQXBFLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBc0JmO1FBcEJDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFFLENBQUE7UUFDbEQsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQWlCLENBQUE7UUFFM0Usc0JBQXNCO1FBQ3RCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUE7UUFDakQsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUE7UUFDN0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsWUFBWSxD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SSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQXRWQSxBQXNWQyxDQXRWMEIsVUFBVSxHQXNWcEM7QUFFRDs7Ozs7R0FLRztBQUVILE1BQU0sVUFBVSxJQUFJO0lBQ2xCLG1CQUFtQixDQUFjLDRCQUE0QixFQUFFLFVBQUMsQ0FBQztRQUMvRCxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxlQUFlLFlBQVksQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9mb3JtL0F1dG9jb21wbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlYXJjaEFuZEluaXRpYWxpemUsIHByZXZlbnREZWZhdWx0IH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCB7IGVtcHR5LCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIGhhc0NsYXNzIH0gZnJvbSBcIi4uL0RvbUZ1bmN0aW9uc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5pbXBvcnQgKiBhcyBJbnB1dHMgZnJvbSBcIi4uL0lucHV0c1wiXG5cbmNvbnN0IFFVRVJZX0RST1BET1dOID0gXCIuanMtYXV0b2NvbXBsZXRlXCJcbmNvbnN0IENMQVNTX1JFU1VMVCA9IFwiYXV0b2NvbXBsZXRlX19yZXN1bHRcIlxuY29uc3QgQ0xBU1NfT1BFTiA9IFwiaXMtb3BlblwiXG5jb25zdCBDTEFTU19IT1ZFUiA9IFwianMtaG92ZXJcIlxuY29uc3QgQVRUUklCVVRFX1ZBTFVFID0gXCJkYXRhLXZhbHVlXCJcblxuY29uc3QgVElNRU9VVF9CTFVSID0gNDAwXG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlIHtcbiAgKFxuICAgIHRlcm06IHN0cmluZyxcbiAgICBjYWxsYmFjazogKG1hdGNoZXM6IHN0cmluZ1tdLCB0ZXJtdXNlZDogc3RyaW5nKSA9PiB2b2lkXG4gICk6IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdXRvY29tcGxldGVDb25maWcge1xuICBtaW5DaGFyczogbnVtYmVyXG4gIHNvdXJjZTogU291cmNlXG59XG5cbi8qKlxuICogQXV0b2NvbXBsZXRlIGNvbXBvbmVudFxuICogQGZpcmVzIEF1dG9jb21wbGV0ZSNjaGFuZ2VcbiAqL1xuY2xhc3MgQXV0b2NvbXBsZXRlIGV4dGVuZHMgRG9tRWxlbWVudDxIVE1MRWxlbWVudD4ge1xuICBwcml2YXRlIF9zb3VyY2UhOiBTb3VyY2VcbiAgcHJpdmF0ZSBfbWluQ2hhcnMhOiBudW1iZXJcblxuICBwcml2YXRlIF9pbnB1dDogSFRNTElucHV0RWxlbWVudFxuICBwcml2YXRlIF9zdWdnZXN0aW9uTGlzdCE6IEhUTUxVTGlzdEVsZW1lbnRcbiAgcHJpdmF0ZSBfZHJvcGRvd246IEhUTUxFbGVtZW50XG5cbiAgcHJpdmF0ZSBfY2xpY2tIYW5kbGVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfd2luZG93Q2xpY2tIYW5kbGVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfa2V5VXBIYW5kbGVyOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfa2V5RG93bkhhbmRsZXI6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9ibHVySGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZFxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uPzogQXV0b2NvbXBsZXRlQ29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudClcblxuICAgIHRoaXMuX2lucHV0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKSFcbiAgICB0aGlzLl9kcm9wZG93biA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFFVRVJZX0RST1BET1dOKSEgYXMgSFRNTEVsZW1lbnRcblxuICAgIC8vIFNldHVwIGV2ZW50IGNvbnRleHRcbiAgICB0aGlzLl9jbGlja0hhbmRsZXIgPSB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5fd2luZG93Q2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlV2luZG93Q2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX2tleVVwSGFuZGxlciA9IHRoaXMuX2hhbmRsZUtleVVwLmJpbmQodGhpcylcbiAgICB0aGlzLl9rZXlEb3duSGFuZGxlciA9IHRoaXMuX2hhbmRsZUtleURvd24uYmluZCh0aGlzKVxuICAgIHRoaXMuX2JsdXJIYW5kbGVyID0gdGhpcy5faGFuZGxlQmx1ci5iaW5kKHRoaXMpXG5cbiAgICBpZiAoY29uZmlndXJhdGlvbikge1xuICAgICAgdGhpcy5fbWluQ2hhcnMgPSBjb25maWd1cmF0aW9uLm1pbkNoYXJzXG4gICAgICB0aGlzLl9zb3VyY2UgPSBjb25maWd1cmF0aW9uLnNvdXJjZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fbWluQ2hhcnMgfHwgdGhpcy5fbWluQ2hhcnMgPCAwKSB7XG4gICAgICB0aGlzLl9taW5DaGFycyA9IDJcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgQXV0b2NvbXBsZXRlIGNvbXBvbmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9jbGVhclN1Z2dlc3Rpb25zKClcblxuICAgIGlmICh0aGlzLl9pbnB1dC5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGUoKVxuICAgIH1cblxuICAgIC8vIERpc2FibGUgYnJvd3NlciBhdXRvZmlsbFxuICAgIHRoaXMuX2lucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb21wbGV0ZVwiLCBcIm9mZlwiKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBBdXRvY29tcGxldGUgY29tcG9uZW50IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqIEBjYWxsYmFjayBBdXRvY29tcGxldGV+U3VnZ2VzdFxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gdGVybSAtIFRoZSBjdXJyZW50IHNlYXJjaCB0ZXJtLlxuICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSBtYXRjaGVzIC0gVGhlIGxpc3Qgb2YgbWF0Y2hpbmcgc3RyaW5ncy5cbiAgICovXG5cbiAgLyoqXG4gICAqIFRoZSBBdXRvY29tcGxldGUgY29tcG9uZW50IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqIEBjYWxsYmFjayBBdXRvY29tcGxldGV+U291cmNlXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSB0ZXJtIC0gVGhlIGN1cnJlbnQgc2VhcmNoIHRlcm0uXG4gICAqIEBwcm9wZXJ0eSB7QXV0b2NvbXBsZXRlflN1Z2dlc3R9IHN1Z2dlc3QgLSBUaGUgYXV0b2NvbXBsZXRlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlcG9ydCB0aGUgcmVzdWx0cy5cbiAgICovXG5cbiAgLyoqXG4gICAqIFRoZSBBdXRvY29tcGxldGUgY29tcG9uZW50IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IEF1dG9jb21wbGV0ZX5Db25maWdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1pbkNoYXJzIC0gVGhlIG1pbmltYWwgcmVxdWlyZWQgY2hhcmFjdGVycyB0byBzdGFydCBxdWVyeWluZyBmb3IgYXV0b2NvbXBsZXRlIG1hdGNoZXMuXG4gICAqIEBwcm9wZXJ0eSB7QXV0b2NvbXBsZXRlflNvdXJjZX0gc291cmNlIC0gVGhlIGF1dG9jb21wbGV0ZSBzb3VyY2UgZnVuY3Rpb24uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBhdXRvY29tcGxldGUgY29tcG9uZW50IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBjdXJyZW50IGluc3RhbmNlXG4gICAqIEBwYXJhbSB7QXV0b2NvbXBsZXRlfkNvbmZpZ30gY29uZmlndXJhdGlvbiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBjb25maWd1cmUoY29uZmlndXJhdGlvbj86IEF1dG9jb21wbGV0ZUNvbmZpZykge1xuICAgIGlmICghY29uZmlndXJhdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZ3VyYXRpb24ubWluQ2hhcnMpIHtcbiAgICAgIHRoaXMuX21pbkNoYXJzID0gTWF0aC5taW4oY29uZmlndXJhdGlvbi5taW5DaGFycywgMSlcbiAgICB9XG5cbiAgICBpZiAoY29uZmlndXJhdGlvbi5zb3VyY2UpIHtcbiAgICAgIHRoaXMuX3NvdXJjZSA9IGNvbmZpZ3VyYXRpb24uc291cmNlXG4gICAgfVxuXG4gICAgdGhpcy5fY2xlYXJTdWdnZXN0aW9ucygpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0IGNvbnRyb2wgdG8gdGhlIGVuYWJsZWQgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5faW5wdXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpXG5cbiAgICB0aGlzLl9pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5fa2V5VXBIYW5kbGVyKVxuICAgIHRoaXMuX2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2tleURvd25IYW5kbGVyKVxuICAgIHRoaXMuX2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX2JsdXJIYW5kbGVyKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdCBjb250cm9sIHRvIHRoZSBkaXNhYmxlZCBzdGF0ZS5cbiAgICovXG4gIHB1YmxpYyBkaXNhYmxlKCkge1xuICAgIGlmICghdGhpcy5faW5wdXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKVxuXG4gICAgdGhpcy5faW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2tleVVwSGFuZGxlcilcbiAgICB0aGlzLl9pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9rZXlEb3duSGFuZGxlcilcbiAgICB0aGlzLl9pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLl9ibHVySGFuZGxlcilcblxuICAgIHRoaXMuY2xvc2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBjb21wb25lbnQgYW5kIGZyZWVzIGFsbCByZWZlcmVuY2VzLlxuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAodGhpcyBhcyBhbnkpLl9rZXlVcEhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgKHRoaXMgYXMgYW55KS5fa2V5RG93bkhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgKHRoaXMgYXMgYW55KS5fd2luZG93Q2xpY2tIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICh0aGlzIGFzIGFueSkuX2JsdXJIYW5kbGVyID0gdW5kZWZpbmVkO1xuXG4gICAgKHRoaXMgYXMgYW55KS5faW5wdXQgPSB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHN1Z2dlc3Rpb25zIGRyb3Bkb3duLlxuICAgKi9cbiAgcHVibGljIG9wZW4oKSB7XG4gICAgdGhpcy5fZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2NsaWNrSGFuZGxlcilcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcblxuICAgIHRoaXMuYWRkQ2xhc3MoQ0xBU1NfT1BFTilcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgc3VnZ2VzdGlvbnMgZHJvcGRvd24uXG4gICAqL1xuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5fZHJvcGRvd24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2NsaWNrSGFuZGxlcilcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoQ0xBU1NfT1BFTilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0LnZhbHVlXG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pc0Ryb3Bkb3duVGFyZ2V0KGV2ZW50LnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnRcbiAgICB3aGlsZSAoY3VycmVudC5ub2RlTmFtZSAhPT0gXCJMSVwiICYmIGN1cnJlbnQucGFyZW50Tm9kZSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudFxuICAgIH1cblxuICAgIGlmIChjdXJyZW50Lm5vZGVOYW1lID09PSBcIkxJXCIpIHtcbiAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KVxuICAgICAgdGhpcy5fc2VsZWN0SXRlbShjdXJyZW50KVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQmx1cigpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKVxuICAgIH0sIFRJTUVPVVRfQkxVUilcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlS2V5VXAoZXZ0OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgbGV0IGtleWNvZGUgPSBldnQud2hpY2ggfHwgZXZ0LmtleUNvZGVcblxuICAgIGlmIChJbnB1dHMuY29udGFpbnNLZXkoa2V5Y29kZSwgWyBJbnB1dHMuS0VZX0FSUk9XX1VQLCBJbnB1dHMuS0VZX0FSUk9XX0RPV04sIElucHV0cy5LRVlfRU5URVIsIElucHV0cy5LRVlfVEFCIF0pKSB7XG4gICAgICAvLyBEbyBub3QgaGFuZGxlIHRoZXNlIGV2ZW50cyBvbiBrZXl1cFxuICAgICAgcHJldmVudERlZmF1bHQoZXZ0KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudFxuXG4gICAgaWYgKGV2dC5jdXJyZW50VGFyZ2V0ICYmIHRhcmdldC52YWx1ZSAmJiB0YXJnZXQudmFsdWUubGVuZ3RoID49IHRoaXMuX21pbkNoYXJzKSB7XG4gICAgICB0aGlzLl9nZXRTdWdnZXN0aW9uKHRhcmdldC52YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVLZXlEb3duKGV2dDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGxldCBrZXljb2RlID0gZXZ0LndoaWNoIHx8IGV2dC5rZXlDb2RlXG4gICAgY29uc3QgaXNPcGVuID0gaGFzQ2xhc3ModGhpcy5lbGVtZW50LCBDTEFTU19PUEVOKVxuXG4gICAgaWYgKGtleWNvZGUgPT09IElucHV0cy5LRVlfRVNDQVBFICYmIGlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgLy8gaGFuZGxlIEVzY2FwZSBrZXkgKEVTQylcbiAgICAgIHRoaXMuY2xvc2UoKVxuICAgICAgcHJldmVudERlZmF1bHQoZXZ0KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGlzT3BlbiA9PT0gdHJ1ZSAmJiBJbnB1dHMuY29udGFpbnNLZXkoa2V5Y29kZSwgWyBJbnB1dHMuS0VZX0VOVEVSLCBJbnB1dHMuS0VZX1RBQiBdKSkge1xuICAgICAgbGV0IGZvY3VzZWRFbGVtZW50ID0gdGhpcy5fc3VnZ2VzdGlvbkxpc3QucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NfSE9WRVJ9YClcblxuICAgICAgcHJldmVudERlZmF1bHQoZXZ0KVxuICAgICAgdGhpcy5fc2VsZWN0SXRlbShmb2N1c2VkRWxlbWVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpc09wZW4gPT09IHRydWUgJiYgSW5wdXRzLmNvbnRhaW5zS2V5KGtleWNvZGUsIFsgSW5wdXRzLktFWV9BUlJPV19VUCwgSW5wdXRzLktFWV9BUlJPV19ET1dOIF0pKSB7XG4gICAgICAvLyBVcCBhbmQgZG93biBhcnJvd3NcblxuICAgICAgbGV0IGZvY3VzZWRFbGVtZW50ID0gdGhpcy5fc3VnZ2VzdGlvbkxpc3QucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NfSE9WRVJ9YCkhXG4gICAgICBpZiAoZm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZm9jdXNlZEVsZW1lbnQsIENMQVNTX0hPVkVSKVxuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fc3VnZ2VzdGlvbkxpc3QuY2hpbGROb2RlcykgYXMgRWxlbWVudFtdXG5cbiAgICAgICAgY29uc3QgdG90YWxOb2RlcyA9IGNoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0ga2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19VUCA/IC0xIDogMVxuXG4gICAgICAgIGxldCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoZm9jdXNlZEVsZW1lbnQpXG5cbiAgICAgICAgaW5kZXggPSBNYXRoLm1heChNYXRoLm1pbihpbmRleCArIGRpcmVjdGlvbiwgdG90YWxOb2RlcyksIDApXG4gICAgICAgIGZvY3VzZWRFbGVtZW50ID0gdGhpcy5fc3VnZ2VzdGlvbkxpc3QuY2hpbGROb2Rlc1tpbmRleF0gYXMgRWxlbWVudFxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb2N1c2VkRWxlbWVudCA9IHRoaXMuX3N1Z2dlc3Rpb25MaXN0LnF1ZXJ5U2VsZWN0b3IoXCJsaVwiKSBhcyBFbGVtZW50XG4gICAgICB9XG5cbiAgICAgIGFkZENsYXNzKGZvY3VzZWRFbGVtZW50LCBDTEFTU19IT1ZFUilcbiAgICAgIHByZXZlbnREZWZhdWx0KGV2dClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlV2luZG93Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNEcm9wZG93blRhcmdldChldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zZWxlY3RJdGVtKGl0ZW0/OiBFbGVtZW50IHwgbnVsbCkge1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGl0ZW0uZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9WQUxVRSlcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGhpcy5faW5wdXQudmFsdWUgPSB0ZXh0XG5cbiAgICAgIC8vIERpc3BhdGNoIHRoZSBjaGFuZ2VkIGV2ZW50XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJjaGFuZ2VcIilcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaXNEcm9wZG93blRhcmdldCh0YXJnZXQ6IE5vZGUpIHtcbiAgICBsZXQgY3VycmVudCA9IHRhcmdldFxuICAgIHdoaWxlIChjdXJyZW50ICE9PSB0aGlzLl9kcm9wZG93biAmJiBjdXJyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudCA9PT0gdGhpcy5fZHJvcGRvd25cbiAgfVxuXG4gIHByb3RlY3RlZCBfY2xlYXJTdWdnZXN0aW9ucygpIHtcbiAgICAvLyBDbGVhciB0aGUgZHJvcGRvd24gaXRlbVxuICAgIGVtcHR5KHRoaXMuX2Ryb3Bkb3duKVxuXG4gICAgdGhpcy5fc3VnZ2VzdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICB0aGlzLl9kcm9wZG93bi5hcHBlbmRDaGlsZCh0aGlzLl9zdWdnZXN0aW9uTGlzdClcbiAgfVxuXG4gIHByb3RlY3RlZCBfYWRkU3VnZ2VzdGlvbih0ZXh0OiBzdHJpbmcsIHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHNhbml0aXplZFRlcm0gPSB0ZXJtLnJlcGxhY2UoL1stXFxcXF4kKis/LigpfFtcXF17fV0vZywgXCJcXFxcJCZcIilcbiAgICBjb25zdCBodG1sID0gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke3Nhbml0aXplZFRlcm19KWAsIFwiZ2lcIiksIFwiPHN0cm9uZz4kMTwvc3Ryb25nPlwiKVxuXG4gICAgY29uc3QgdGV4dEVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcInNwYW5cIilcbiAgICAgIC5zZXRIdG1sKGh0bWwpXG5cbiAgICBjb25zdCBpbm5lckVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgLmFkZENsYXNzKENMQVNTX1JFU1VMVClcbiAgICAgIC5hcHBlbmRDaGlsZCh0ZXh0RWxlbWVudClcblxuICAgIGNvbnN0IGxpRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwibGlcIilcbiAgICAgIC5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1ZBTFVFLCB0ZXh0KVxuICAgICAgLmFwcGVuZENoaWxkKGlubmVyRWxlbWVudClcblxuICAgIHRoaXMuX3N1Z2dlc3Rpb25MaXN0LmFwcGVuZENoaWxkKGxpRWxlbWVudC5lbGVtZW50KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRTdWdnZXN0aW9uKHRlcm06IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fc291cmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc291cmNlIGZ1bmN0aW9uIGlzIHVuZGVmaW5lZCwgY2Fubm90IGxvYWQgc3VnZ2VzdGlvbnNcIilcbiAgICB9XG5cbiAgICB0aGlzLl9zb3VyY2UodGVybSwgKG1hdGNoZXMsIHRlcm11c2VkKSA9PiB7XG4gICAgICB0aGlzLl9vbk1hdGNoZXNSZWNlaXZlZChtYXRjaGVzLCB0ZXJtdXNlZClcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vbk1hdGNoZXNSZWNlaXZlZChtYXRjaGVzOiBzdHJpbmdbXSwgdGVybTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2xlYXJTdWdnZXN0aW9ucygpXG5cbiAgICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2xvc2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDbGVhciB0aGUgZHJvcGRvd24gaXRlbVxuICAgICAgZW1wdHkodGhpcy5fc3VnZ2VzdGlvbkxpc3QpXG5cbiAgICAgIGZvciAobGV0IG1hdGNoIG9mIG1hdGNoZXMpIHtcbiAgICAgICAgdGhpcy5fYWRkU3VnZ2VzdGlvbihtYXRjaCwgdGVybSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcGVuKClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDaGFuZ2UgZXZlbnRcbiAqXG4gKiBAZXZlbnQgQXV0b2NvbXBsZXRlI2NoYW5nZVxuICogQHR5cGUge29iamVjdH1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZTxIVE1MRWxlbWVudD4oXCIuaW5wdXQtZmllbGQtLWF1dG9jb21wbGV0ZVwiLCAoZSkgPT4ge1xuICAgIG5ldyBBdXRvY29tcGxldGUoZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlXG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
