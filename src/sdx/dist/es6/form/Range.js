import { __extends, __values } from "tslib";
import anime from "animejs";
import { searchAndInitialize, clamp, preventDefault } from "../Utils";
import * as Inputs from "../Inputs";
import DomElement from "../DomElement";
var MARGIN_TICK = 32;
var CLASS_HTML5 = "html5";
var RANGE_LIGHT = "range--light";
var CLASS_CONTAINER = "range-container";
var CLASS_SLIDER = "range-slider";
var CLASS_ACTIVE = "range--active";
var CLASS_TRACK = "range-track";
var CLASS_TRACK_PROGRESS = "range-track__progress";
var CLASS_TICK = "range-tick";
var CLASS_TICK_LABEL = "range-tick__label";
var CLASS_TICK_ACTIVE = "range-tick--active";
var CLASS_THUMB = "range-thumb";
var CLASS_THUMB_VALUE = "range-thumb__value";
var CLASS_DISABLED = "range--disabled";
var CLASS_DRAGGING = "range--dragging";
/**
 * The range slider component definition.
 */
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range(element) {
        var _this = _super.call(this, element) || this;
        // Setup event context
        _this._downHandler = _this._handleDown.bind(_this);
        _this._moveHandler = _this._handleMove.bind(_this);
        _this._endHandler = _this._handleEnd.bind(_this);
        _this._keydownHandler = _this._handleKeydown.bind(_this);
        _this._focusHandler = _this._handleFocus.bind(_this);
        _this._blurHandler = _this._handleBlur.bind(_this);
        _this._resizeHandler = _this.layout.bind(_this);
        _this._initialize();
        if (_this.element.disabled) {
            _this.disable();
        }
        else {
            _this.enable();
        }
        return _this;
    }
    /**
     * Initializes the range slider component.
     *
     * This method inspects the select definition and its options and
     * generates new stylable DOM elements around the original range input-element
     * definitions.
     * @private
     */
    Range.prototype._initialize = function () {
        if (this.hasClass(CLASS_HTML5)) {
            // This element uses HTML5 styling, do not touch it...
            return;
        }
        this._wrapperElement = new DomElement(this.element.parentElement);
        this._rangeContainer = new DomElement("div")
            .addClass(CLASS_CONTAINER);
        this._rangeTrack = new DomElement("div")
            .addClass(CLASS_TRACK);
        // check if range--light slider then add progress
        if (this._wrapperElement.hasClass(RANGE_LIGHT)) {
            this._rangeProgress = new DomElement("div")
                .addClass(CLASS_TRACK_PROGRESS);
            this._rangeTrack.appendChild(this._rangeProgress);
        }
        this._rangeThumb = new DomElement("div")
            .addClass(CLASS_THUMB);
        this._ticksWrapper = new DomElement("div")
            .addClass(CLASS_SLIDER);
        this._rangeContainer.appendChild(this._rangeTrack);
        this._rangeContainer.appendChild(this._ticksWrapper);
        this._rangeContainer.appendChild(this._rangeThumb);
        // add container to wrapper
        this._wrapperElement.appendChild(this._rangeContainer);
        // get min & max definitions
        this._minValue = parseFloat(this.element.min) || 0;
        this._maxValue = parseFloat(this.element.max) || 1;
        // get the label/output format string
        this._formatter = window[this.getAttribute("formatter")];
        // get the output label and move it below the container
        if (this.element.id) {
            this._outputLabel = this._wrapperElement.find("output[for='" + this.element.id + "']");
            if (this._outputLabel) {
                this._wrapperElement.appendChild(this._outputLabel);
            }
        }
        if (!this.element.step) {
            // fix issues with float sliders if the step is undefined
            this.element.step = "any";
        }
        var options = this._getOptionsList();
        if (options && options.length) {
            this._addTicks(options);
        }
        if (this._rangeContainer.element.querySelectorAll("." + CLASS_TICK_LABEL).length <= 1) {
            this._thumbValue = new DomElement("div")
                .addClass(CLASS_THUMB_VALUE);
            this._rangeThumb.appendChild(this._thumbValue);
        }
        this._trackValueTotal = this._maxValue - this._minValue;
        this.layout();
        this._updateTickState();
        // Apply the tab index
        var tabIndex = this.element.getAttribute("tabindex");
        if (tabIndex) {
            this._rangeContainer.setAttribute("tabindex", tabIndex);
        }
        window.addEventListener("resize", this._resizeHandler);
        window.addEventListener("orientationchange", this._resizeHandler);
    };
    Range.prototype._getOptionsList = function () {
        var e_1, _a;
        var options = [];
        var listId = this.getAttribute("list");
        if (listId) {
            var dataList = document.querySelector("#" + listId);
            if (dataList) {
                try {
                    for (var _b = __values(dataList.querySelectorAll("option")), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var entry = _c.value;
                        var value = parseFloat(entry.innerText);
                        var label = entry.getAttribute("label") || parseFloat(value.toFixed(2));
                        options.push({
                            value: value,
                            label: label
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        // Sort the list to enable snapping
        options = options.sort(function (a, b) { return a.value - b.value; });
        if (options.length > 1) {
            this._minValue = Number.MAX_VALUE;
            this._maxValue = Number.MIN_VALUE;
            for (var i = 0; i < options.length; i++) {
                this._minValue = Math.min(this._minValue, options[i].value);
                this._maxValue = Math.max(this._maxValue, options[i].value);
            }
        }
        return options;
    };
    Range.prototype._addTicks = function (dataItems) {
        var e_2, _a;
        try {
            for (var dataItems_1 = __values(dataItems), dataItems_1_1 = dataItems_1.next(); !dataItems_1_1.done; dataItems_1_1 = dataItems_1.next()) {
                var entry = dataItems_1_1.value;
                var tickElement = new DomElement("div")
                    .setAttribute("data-value", String(entry.value))
                    .addClass(CLASS_TICK);
                var tickLabel = new DomElement("span")
                    .addClass(CLASS_TICK_LABEL)
                    .setHtml(String(entry.label));
                tickElement.appendChild(tickLabel);
                this._ticksWrapper.appendChild(tickElement);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (dataItems_1_1 && !dataItems_1_1.done && (_a = dataItems_1.return)) _a.call(dataItems_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Range.prototype._isEventOnLabel = function (event) {
        var el = event.target;
        return !!(el === null || el === void 0 ? void 0 : el.classList.contains(CLASS_TICK_LABEL));
    };
    Range.prototype._handleDown = function (event) {
        this._wrapperElement.addClass(CLASS_DRAGGING);
        this._rangeContainer.element.addEventListener("mouseup", this._endHandler);
        document.addEventListener("mousemove", this._moveHandler);
        document.addEventListener("mouseup", this._endHandler);
        this._rangeContainer.element.addEventListener("touchmove", this._moveHandler);
        document.addEventListener("touchend", this._endHandler);
        // Ignore clicks directly on the thumb
        if (event.target !== this._rangeThumb.element && !this._isEventOnLabel(event)) {
            var pos = this._getRelativePosition(event);
            this._setPosition(pos, true, false, false);
        }
    };
    Range.prototype._handleMove = function (event) {
        preventDefault(event);
        this._unfocus();
        if (!this._isEventOnLabel(event)) {
            var pos = this._getRelativePosition(event);
            this._setPosition(pos, true, false, false);
        }
    };
    Range.prototype._handleEnd = function (event) {
        this._wrapperElement.removeClass(CLASS_DRAGGING);
        this._rangeContainer.element.removeEventListener("mouseup", this._endHandler);
        document.removeEventListener("mouseup", this._endHandler);
        document.removeEventListener("mousemove", this._moveHandler);
        this._rangeContainer.element.removeEventListener("touchmove", this._moveHandler);
        document.removeEventListener("touchend", this._endHandler);
        var pos = this._getRelativePosition(event);
        this._setPosition(pos, true, true, true);
        this._handleBlur();
    };
    Range.prototype._handleKeydown = function (event) {
        var keycode = event.which || event.keyCode;
        if (keycode === Inputs.KEY_ESCAPE) {
            // handle Escape key (ESC)
            this._rangeContainer.element.blur();
            return;
        }
        var isUp = keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_RIGHT
            || keycode === Inputs.KEY_PAGE_UP;
        var isDown = keycode === Inputs.KEY_ARROW_DOWN || keycode === Inputs.KEY_ARROW_LEFT
            || keycode === Inputs.KEY_PAGE_DOWN;
        if (isUp || isDown) {
            event.preventDefault();
            var direction = isDown ? -1 : 1;
            // make a larger step if its the vertical arrow or page keys
            if (keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_DOWN ||
                keycode === Inputs.KEY_PAGE_UP || keycode === Inputs.KEY_PAGE_DOWN) {
                direction *= 10;
            }
            var val = this.value;
            if (this._ticksWrapper.element.childNodes.length > 1) {
                val = this._getNextValue(val, direction);
            }
            else {
                var step = this.element.step;
                if (!step || step === "any") {
                    step = "0.1";
                }
                var newVal = val + (parseFloat(step) * direction);
                val = newVal;
            }
            this._setValue(val, true, true);
            return;
        }
    };
    Range.prototype._handleFocus = function () {
        this._rangeContainer.addClass(CLASS_ACTIVE);
    };
    Range.prototype._handleBlur = function () {
        this._rangeContainer.removeClass(CLASS_ACTIVE);
    };
    Range.prototype._unfocus = function () {
        if (document.selection) {
            document.selection.empty();
        }
        else {
            window.getSelection().removeAllRanges();
        }
    };
    Range.prototype._getRelativePosition = function (event) {
        var pageX;
        if ("pageX" in event) {
            pageX = event.pageX;
        }
        else {
            pageX = (event.touches[0] || event.changedTouches[0]).pageX;
        }
        return pageX - this._trackLeftPosition + this._grabPosition;
    };
    /**
     * Validates and updates the position and sets the corresponding value on the slider.
     * @param {position} the new position to set.
     * @param {updateValue} true if the value should be updated as well; otherwise false.
     * @param {snap} true if snapping should be used; otherwise false.
     * @param {animate} true if the UI update should be animated; otherwise false.
     * @private
     */
    Range.prototype._setPosition = function (position, updateValue, snap, animate) {
        if (updateValue === void 0) { updateValue = true; }
        if (snap === void 0) { snap = false; }
        if (animate === void 0) { animate = true; }
        if (position === undefined || position === null || Number.isNaN(position)) {
            throw new Error("Position is not a number");
        }
        // Clamp to min and max range
        var newPos = clamp(position, this._trackPositionMin, this._trackPositionMax);
        if (updateValue) {
            var value = (this._trackValueTotal / this._trackWidth) * newPos + this._minValue;
            if (this._ticksWrapper.element.childNodes.length > 1 && snap) {
                var snapPos = this._getSnapPosition(newPos);
                newPos = snapPos.position;
                value = snapPos.value;
            }
            else if (this.element.step && this.element.step !== "any") {
                var step = parseFloat(this.element.step);
                value = Math.round(value / step) * step;
            }
            this._setValue(value, false, false);
        }
        if (animate && updateValue) {
            this._updateTickState();
        }
        if (animate) {
            anime({
                targets: this._rangeThumb.element,
                duration: 200,
                left: newPos,
                easing: "easeInOutQuint"
            });
            if (this._rangeProgress) {
                anime({
                    targets: this._rangeProgress.element,
                    duration: 200,
                    width: newPos,
                    easing: "easeInOutQuint"
                });
            }
        }
        else {
            this._rangeThumb.element.style.left = newPos + "px";
            if (this._rangeProgress) {
                this._rangeProgress.element.style.width = newPos + "px";
            }
        }
    };
    /**
     * Gets the snap value corresponding to the given value.
     * @param {value} the target value.
     * @returns an object containing the snap position and the corresponding value.
     * @private
     */
    Range.prototype._getSnapValue = function (value) {
        var ticks = this._ticksWrapper.element.children;
        var currentPosition = 0;
        for (var i = 0; i < ticks.length; i++) {
            var currentElement = new DomElement(ticks[i]);
            var currentValue = parseFloat(currentElement.getAttribute("data-value"));
            var currentWidth = currentElement.element.clientWidth;
            var nextElement = void 0;
            var nextValue = Number.MAX_VALUE;
            if (i < ticks.length - 1) {
                nextElement = new DomElement(ticks[i + 1]);
                nextValue = parseFloat(nextElement.getAttribute("data-value"));
            }
            // left most element
            if (i === 0 && value <= currentValue) {
                return {
                    value: currentValue,
                    position: MARGIN_TICK - this._grabPosition
                };
            }
            // right most element
            if (!nextElement && value >= currentValue) {
                return {
                    value: currentValue,
                    position: currentPosition + (currentWidth - MARGIN_TICK) - this._grabPosition - 1
                };
            }
            if (value >= currentValue && value < nextValue) {
                return {
                    value: currentValue,
                    position: currentPosition + (0.5 * currentWidth) - this._grabPosition
                };
            }
            currentPosition += currentWidth;
        }
        throw new Error("Could not determine snap value");
    };
    /**
     * Gets the snap position corresponding to the given position.
     * @param {position} the target position.
     * @returns an object containing the snap position and the corresponding value.
     * @private
     */
    Range.prototype._getSnapPosition = function (position) {
        if (position === undefined || position === null || Number.isNaN(position)) {
            throw new Error("position is not a number");
        }
        var ticks = this._ticksWrapper.element.children;
        var currentPosition = 0;
        for (var i = 0; i < ticks.length; i++) {
            var currentElement = new DomElement(ticks[i]);
            var currentValue = parseFloat(currentElement.getAttribute("data-value"));
            var currentWidth = currentElement.element.clientWidth;
            var nextElement = void 0;
            if (i < ticks.length - 1) {
                nextElement = new DomElement(ticks[i + 1]);
            }
            // left most element
            if (i === 0 && position <= currentPosition + currentWidth) {
                return {
                    value: currentValue,
                    position: MARGIN_TICK - this._grabPosition
                };
            }
            // right most element
            if (!nextElement && position >= currentPosition) {
                return {
                    value: currentValue,
                    position: currentPosition + (currentWidth - MARGIN_TICK) - this._grabPosition - 1
                };
            }
            if (position >= currentPosition && position < (currentPosition + currentWidth)) {
                return {
                    value: currentValue,
                    position: currentPosition + (0.5 * currentWidth) - this._grabPosition
                };
            }
            currentPosition += currentWidth;
        }
        // No ticks found (e.g. for "Free Slider")
        return {
            value: 0,
            position: 0
        };
    };
    /**
     * Gets the next value in the given direction with regards to snapping.
     * @param {value} The current value.
     * @param {direction} The direction (positive or negative integer).
     * @returns The next value.
     * @private
     */
    Range.prototype._getNextValue = function (value, direction) {
        var ticks = this._ticksWrapper.element.children;
        for (var i = 0; i < ticks.length; i++) {
            var currentElement = new DomElement(ticks[i]);
            var currentVal = parseFloat(currentElement.getAttribute("data-value"));
            if (value === currentVal) {
                var index = clamp(i + direction, 0, ticks.length - 1);
                value = parseFloat(ticks[index].getAttribute("data-value"));
            }
        }
        return value;
    };
    Range.prototype._updateTickState = function () {
        if (this._ticksWrapper.element.childNodes.length > 1) {
            var activeTick = this._ticksWrapper.find("." + CLASS_TICK_ACTIVE);
            if (activeTick) {
                activeTick.removeClass(CLASS_TICK_ACTIVE);
            }
            var newActiveTick = this._ticksWrapper.find("." + CLASS_TICK + "[data-value='" + this.value + "']");
            if (newActiveTick) {
                newActiveTick.addClass(CLASS_TICK_ACTIVE);
            }
        }
    };
    Range.prototype._adjustTickLabelPosition = function (tickItem, left) {
        var label = new DomElement(tickItem.querySelector("." + CLASS_TICK_LABEL));
        var dummyElement = new DomElement("span")
            .addClass(CLASS_TICK_LABEL)
            .setAttribute("style", "visibility: hidden; display: inline-block;")
            .setHtml(label.innerText);
        this._rangeContainer.appendChild(dummyElement);
        var width = dummyElement.element.clientWidth / 2;
        this._rangeContainer.removeChild(dummyElement);
        var floatPosition = left ? "left" : "right";
        if (width < MARGIN_TICK) {
            // center small items on the tick
            label.setAttribute("style", floatPosition + ": " + (MARGIN_TICK - Math.floor(width)) + "px; text-align: " + floatPosition + ";");
        }
    };
    Range.prototype._formatOutput = function (value, short) {
        if (this._formatter) {
            return this._formatter(value, short);
        }
        var str = parseFloat(value.toFixed(2));
        return str.toString();
    };
    /**
     * Validates and updates the range value.
     * @param {value} the new value to set.
     * @param {update} true if the UI should be updated; otherwise false.
     * @param {animate} true if the UI update should be animated; otherwise false.
     * @private
     */
    Range.prototype._setValue = function (value, update, animate) {
        if (update === void 0) { update = true; }
        if (animate === void 0) { animate = false; }
        var val = clamp(value, this._minValue, this._maxValue);
        var position;
        if (this._ticksWrapper.element.childNodes.length > 1) { // at least 2 ticks present
            var snapValue = this._getSnapValue(val);
            position = snapValue.position;
            val = snapValue.value;
        }
        else if (this._ticksWrapper.element.childNodes.length === 1) { // only 1 tick present
            // This shouldn't happen (but it does, e.g. when generating Sliders based on incomplete data).
            // Fall back to the first tick position and disable the component.
            position = this._getSnapPosition(val).position;
            this.disable();
        }
        else { // no ticks present, e.g. "Free Slider"
            position = (this._trackWidth / this._trackValueTotal) * (value - this._minValue);
        }
        this.element.value = String(val);
        if (this._thumbValue) {
            this._thumbValue.setHtml(this._formatOutput(val, true));
        }
        if (this._outputLabel) {
            this._outputLabel.setHtml(this._formatOutput(val, false));
        }
        if (update) {
            this._setPosition(position, false, false, animate);
            this._updateTickState();
        }
        this.dispatchEvent("input");
    };
    Object.defineProperty(Range.prototype, "value", {
        /**
         * Gets the current value.
         */
        get: function () {
            return parseFloat(this.element.value);
        },
        /**
         * Sets the value of the range slider.
         */
        set: function (value) {
            this._setValue(value, true, true);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Force the component to re-layout itself.
     */
    Range.prototype.layout = function () {
        this._grabPosition = Math.round(this._rangeThumb.element.offsetWidth / 2);
        var tickItems = this._rangeContainer.element.querySelectorAll("." + CLASS_TICK);
        var ticksOffset = tickItems && tickItems.length > 0 ? (2 * MARGIN_TICK) : MARGIN_TICK;
        this._trackWidth = this._rangeTrack.element.offsetWidth - ticksOffset;
        this._trackPositionMin = 0;
        this._trackPositionMax = this._rangeTrack.element.clientWidth - this._rangeThumb.element.offsetWidth + 1;
        this._trackLeftPosition = this._rangeTrack.element.getBoundingClientRect().left + MARGIN_TICK;
        var itemCount = tickItems.length - 1;
        this._itemWidth = this._trackWidth / itemCount;
        var outerItemsWidth = (this._itemWidth * 0.5) + MARGIN_TICK;
        for (var i = 0; i <= itemCount; i++) {
            var width = this._itemWidth;
            if (i === 0 || i === itemCount) {
                width = outerItemsWidth;
            }
            var item = new DomElement(tickItems[i]);
            item.setAttribute("style", "width: " + Math.floor(width) + "px;");
        }
        // adjust first and last label positions
        if (tickItems.length > 1) {
            this._adjustTickLabelPosition(tickItems[0], true);
            this._adjustTickLabelPosition(tickItems[tickItems.length - 1], false);
        }
        // update the value
        this._setValue(parseFloat(this.element.value), true, false);
    };
    /**
     * Destroys the components and frees all references.
     */
    Range.prototype.destroy = function () {
        window.removeEventListener("resize", this._resizeHandler);
        window.removeEventListener("orientationchange", this._resizeHandler);
        this._downHandler = null;
        this._moveHandler = null;
        this._endHandler = null;
        this._focusHandler = null;
        this._blurHandler = null;
        this.element = null;
        this._rangeContainer = null;
        this._wrapperElement = null;
    };
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    Range.prototype.destoy = function () {
        this.destroy();
    };
    /**
     * Sets the component to the enabled state.
     */
    Range.prototype.enable = function () {
        this.element.removeAttribute("disabled");
        this._wrapperElement.removeClass(CLASS_DISABLED);
        this._rangeContainer.element.addEventListener("mousedown", this._downHandler);
        this._rangeContainer.element.addEventListener("touchstart", this._downHandler);
        this._rangeContainer.element.addEventListener("keydown", this._keydownHandler);
        this._rangeContainer.element.addEventListener("focus", this._focusHandler);
        this._rangeContainer.element.addEventListener("blur", this._blurHandler);
    };
    /**
     * Sets the component to the disabled state.
     */
    Range.prototype.disable = function () {
        this.element.setAttribute("disabled", "");
        this._wrapperElement.addClass(CLASS_DISABLED);
        this._rangeContainer.element.removeEventListener("mousedown", this._downHandler);
        this._rangeContainer.element.removeEventListener("mouseup", this._endHandler);
        this._rangeContainer.element.removeEventListener("mousemove", this._moveHandler);
        this._rangeContainer.element.removeEventListener("touchstart", this._downHandler);
        this._rangeContainer.element.removeEventListener("focus", this._focusHandler);
        this._rangeContainer.element.removeEventListener("blur", this._blurHandler);
    };
    return Range;
}(DomElement));
export function init() {
    searchAndInitialize("input[type='range']", function (e) {
        new Range(e);
    });
}
export default Range;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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bUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRWhGLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFakYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM3RSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzdFLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0F6c0JBLEFBeXNCQyxDQXpzQm1CLFVBQVUsR0F5c0I3QjtBQUVELE1BQU0sVUFBVSxJQUFJO0lBQ2xCLG1CQUFtQixDQUFtQixxQkFBcUIsRUFBRSxVQUFDLENBQUM7UUFDN0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxlQUFlLEtBQUssQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9mb3JtL1JhbmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFuaW1lIGZyb20gXCJhbmltZWpzXCJcblxuaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSwgY2xhbXAsIHByZXZlbnREZWZhdWx0IH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCAqIGFzIElucHV0cyBmcm9tIFwiLi4vSW5wdXRzXCJcbmltcG9ydCBEb21FbGVtZW50IGZyb20gXCIuLi9Eb21FbGVtZW50XCJcblxuY29uc3QgTUFSR0lOX1RJQ0sgPSAzMlxuY29uc3QgQ0xBU1NfSFRNTDUgPSBcImh0bWw1XCJcbmNvbnN0IFJBTkdFX0xJR0hUID0gXCJyYW5nZS0tbGlnaHRcIlxuXG5jb25zdCBDTEFTU19DT05UQUlORVIgPSBcInJhbmdlLWNvbnRhaW5lclwiXG5jb25zdCBDTEFTU19TTElERVIgPSBcInJhbmdlLXNsaWRlclwiXG5jb25zdCBDTEFTU19BQ1RJVkUgPSBcInJhbmdlLS1hY3RpdmVcIlxuXG5jb25zdCBDTEFTU19UUkFDSyA9IFwicmFuZ2UtdHJhY2tcIlxuY29uc3QgQ0xBU1NfVFJBQ0tfUFJPR1JFU1MgPSBcInJhbmdlLXRyYWNrX19wcm9ncmVzc1wiXG5cbmNvbnN0IENMQVNTX1RJQ0sgPSBcInJhbmdlLXRpY2tcIlxuY29uc3QgQ0xBU1NfVElDS19MQUJFTCA9IFwicmFuZ2UtdGlja19fbGFiZWxcIlxuY29uc3QgQ0xBU1NfVElDS19BQ1RJVkUgPSBcInJhbmdlLXRpY2stLWFjdGl2ZVwiXG5cbmNvbnN0IENMQVNTX1RIVU1CID0gXCJyYW5nZS10aHVtYlwiXG5jb25zdCBDTEFTU19USFVNQl9WQUxVRSA9IFwicmFuZ2UtdGh1bWJfX3ZhbHVlXCJcbmNvbnN0IENMQVNTX0RJU0FCTEVEID0gXCJyYW5nZS0tZGlzYWJsZWRcIlxuXG5jb25zdCBDTEFTU19EUkFHR0lORyA9IFwicmFuZ2UtLWRyYWdnaW5nXCJcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXIge1xuICAodmFsdWU6IG51bWJlciwgc2hvcnQ6IGJvb2xlYW4pOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb24ge1xuICB2YWx1ZTogbnVtYmVyXG4gIGxhYmVsOiBzdHJpbmcgfCBudW1iZXJcbn1cblxuLyoqXG4gKiBUaGUgcmFuZ2Ugc2xpZGVyIGNvbXBvbmVudCBkZWZpbml0aW9uLlxuICovXG5jbGFzcyBSYW5nZSBleHRlbmRzIERvbUVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4ge1xuICBwcml2YXRlIF9kb3duSGFuZGxlcjogKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX21vdmVIYW5kbGVyOiAoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfZW5kSGFuZGxlcjogKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX2tleWRvd25IYW5kbGVyOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9mb2N1c0hhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9ibHVySGFuZGxlcjogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX3Jlc2l6ZUhhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuXG4gIHByaXZhdGUgX3dyYXBwZXJFbGVtZW50ITogRG9tRWxlbWVudDxIVE1MRWxlbWVudD5cbiAgcHJpdmF0ZSBfcmFuZ2VDb250YWluZXIhOiBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PlxuICBwcml2YXRlIF9yYW5nZVRyYWNrITogRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD5cbiAgcHJpdmF0ZSBfcmFuZ2VQcm9ncmVzcyE6IERvbUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+XG4gIHByaXZhdGUgX3RpY2tzV3JhcHBlciE6IERvbUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+XG4gIHByaXZhdGUgX3JhbmdlVGh1bWIhOiBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PlxuICBwcml2YXRlIF90aHVtYlZhbHVlITogRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD5cbiAgcHJpdmF0ZSBfb3V0cHV0TGFiZWw/OiBEb21FbGVtZW50PEVsZW1lbnQ+XG5cbiAgcHJpdmF0ZSBfbWluVmFsdWUhOiBudW1iZXJcbiAgcHJpdmF0ZSBfbWF4VmFsdWUhOiBudW1iZXJcbiAgcHJpdmF0ZSBfdHJhY2tWYWx1ZVRvdGFsITogbnVtYmVyXG5cbiAgcHJpdmF0ZSBfZ3JhYlBvc2l0aW9uITogbnVtYmVyXG4gIHByaXZhdGUgX3RyYWNrV2lkdGghOiBudW1iZXJcbiAgcHJpdmF0ZSBfdHJhY2tQb3NpdGlvbk1pbiE6IG51bWJlclxuICBwcml2YXRlIF90cmFja1Bvc2l0aW9uTWF4ITogbnVtYmVyXG4gIHByaXZhdGUgX3RyYWNrTGVmdFBvc2l0aW9uITogbnVtYmVyXG4gIHByaXZhdGUgX2l0ZW1XaWR0aCE6IG51bWJlclxuXG4gIHByaXZhdGUgX2Zvcm1hdHRlciE6IEZvcm1hdHRlclxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgLy8gU2V0dXAgZXZlbnQgY29udGV4dFxuICAgIHRoaXMuX2Rvd25IYW5kbGVyID0gdGhpcy5faGFuZGxlRG93bi5iaW5kKHRoaXMpXG4gICAgdGhpcy5fbW92ZUhhbmRsZXIgPSB0aGlzLl9oYW5kbGVNb3ZlLmJpbmQodGhpcylcbiAgICB0aGlzLl9lbmRIYW5kbGVyID0gdGhpcy5faGFuZGxlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLl9rZXlkb3duSGFuZGxlciA9IHRoaXMuX2hhbmRsZUtleWRvd24uYmluZCh0aGlzKVxuXG4gICAgdGhpcy5fZm9jdXNIYW5kbGVyID0gdGhpcy5faGFuZGxlRm9jdXMuYmluZCh0aGlzKVxuICAgIHRoaXMuX2JsdXJIYW5kbGVyID0gdGhpcy5faGFuZGxlQmx1ci5iaW5kKHRoaXMpXG4gICAgdGhpcy5fcmVzaXplSGFuZGxlciA9IHRoaXMubGF5b3V0LmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuXG4gICAgaWYgKHRoaXMuZWxlbWVudC5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGUoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcmFuZ2Ugc2xpZGVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaW5zcGVjdHMgdGhlIHNlbGVjdCBkZWZpbml0aW9uIGFuZCBpdHMgb3B0aW9ucyBhbmRcbiAgICogZ2VuZXJhdGVzIG5ldyBzdHlsYWJsZSBET00gZWxlbWVudHMgYXJvdW5kIHRoZSBvcmlnaW5hbCByYW5nZSBpbnB1dC1lbGVtZW50XG4gICAqIGRlZmluaXRpb25zLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuXG4gICAgaWYgKHRoaXMuaGFzQ2xhc3MoQ0xBU1NfSFRNTDUpKSB7XG4gICAgICAvLyBUaGlzIGVsZW1lbnQgdXNlcyBIVE1MNSBzdHlsaW5nLCBkbyBub3QgdG91Y2ggaXQuLi5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQodGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQhKVxuXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIgPSBuZXcgRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19DT05UQUlORVIpXG5cbiAgICB0aGlzLl9yYW5nZVRyYWNrID0gbmV3IERvbUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfVFJBQ0spXG5cbiAgICAvLyBjaGVjayBpZiByYW5nZS0tbGlnaHQgc2xpZGVyIHRoZW4gYWRkIHByb2dyZXNzXG4gICAgaWYgKHRoaXMuX3dyYXBwZXJFbGVtZW50Lmhhc0NsYXNzKFJBTkdFX0xJR0hUKSkge1xuICAgICAgdGhpcy5fcmFuZ2VQcm9ncmVzcyA9IG5ldyBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfVFJBQ0tfUFJPR1JFU1MpXG5cbiAgICAgIHRoaXMuX3JhbmdlVHJhY2suYXBwZW5kQ2hpbGQodGhpcy5fcmFuZ2VQcm9ncmVzcylcbiAgICB9XG5cbiAgICB0aGlzLl9yYW5nZVRodW1iID0gbmV3IERvbUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfVEhVTUIpXG5cbiAgICB0aGlzLl90aWNrc1dyYXBwZXIgPSBuZXcgRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIilcbiAgICAgIC5hZGRDbGFzcyhDTEFTU19TTElERVIpXG5cbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9yYW5nZVRyYWNrKVxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3RpY2tzV3JhcHBlcilcbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9yYW5nZVRodW1iKVxuXG4gICAgLy8gYWRkIGNvbnRhaW5lciB0byB3cmFwcGVyXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fcmFuZ2VDb250YWluZXIpXG5cbiAgICAvLyBnZXQgbWluICYgbWF4IGRlZmluaXRpb25zXG4gICAgdGhpcy5fbWluVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuZWxlbWVudC5taW4pIHx8IDBcbiAgICB0aGlzLl9tYXhWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5lbGVtZW50Lm1heCkgfHwgMVxuXG4gICAgLy8gZ2V0IHRoZSBsYWJlbC9vdXRwdXQgZm9ybWF0IHN0cmluZ1xuICAgIHRoaXMuX2Zvcm1hdHRlciA9ICh3aW5kb3cgYXMgYW55KVt0aGlzLmdldEF0dHJpYnV0ZShcImZvcm1hdHRlclwiKSFdXG5cbiAgICAvLyBnZXQgdGhlIG91dHB1dCBsYWJlbCBhbmQgbW92ZSBpdCBiZWxvdyB0aGUgY29udGFpbmVyXG4gICAgaWYgKHRoaXMuZWxlbWVudC5pZCkge1xuICAgICAgdGhpcy5fb3V0cHV0TGFiZWwgPSB0aGlzLl93cmFwcGVyRWxlbWVudC5maW5kKGBvdXRwdXRbZm9yPScke3RoaXMuZWxlbWVudC5pZH0nXWApXG4gICAgICBpZiAodGhpcy5fb3V0cHV0TGFiZWwpIHtcbiAgICAgICAgdGhpcy5fd3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fb3V0cHV0TGFiZWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc3RlcCkge1xuICAgICAgLy8gZml4IGlzc3VlcyB3aXRoIGZsb2F0IHNsaWRlcnMgaWYgdGhlIHN0ZXAgaXMgdW5kZWZpbmVkXG4gICAgICB0aGlzLmVsZW1lbnQuc3RlcCA9IFwiYW55XCJcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9uc0xpc3QoKVxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9hZGRUaWNrcyhvcHRpb25zKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0NMQVNTX1RJQ0tfTEFCRUx9YCkubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHRoaXMuX3RodW1iVmFsdWUgPSBuZXcgRG9tRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIilcbiAgICAgICAgLmFkZENsYXNzKENMQVNTX1RIVU1CX1ZBTFVFKVxuXG4gICAgICB0aGlzLl9yYW5nZVRodW1iLmFwcGVuZENoaWxkKHRoaXMuX3RodW1iVmFsdWUpXG4gICAgfVxuXG4gICAgdGhpcy5fdHJhY2tWYWx1ZVRvdGFsID0gdGhpcy5fbWF4VmFsdWUgLSB0aGlzLl9taW5WYWx1ZVxuICAgIHRoaXMubGF5b3V0KClcblxuICAgIHRoaXMuX3VwZGF0ZVRpY2tTdGF0ZSgpXG5cbiAgICAvLyBBcHBseSB0aGUgdGFiIGluZGV4XG4gICAgY29uc3QgdGFiSW5kZXggPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIilcbiAgICBpZiAodGFiSW5kZXgpIHtcbiAgICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYkluZGV4KVxuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3Jlc2l6ZUhhbmRsZXIpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB0aGlzLl9yZXNpemVIYW5kbGVyKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRPcHRpb25zTGlzdCgpIHtcbiAgICBsZXQgb3B0aW9uczogT3B0aW9uW10gPSBbXVxuXG4gICAgbGV0IGxpc3RJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwibGlzdFwiKVxuICAgIGlmIChsaXN0SWQpIHtcbiAgICAgIGxldCBkYXRhTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2xpc3RJZH1gKVxuICAgICAgaWYgKGRhdGFMaXN0KSB7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIGRhdGFMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIikpIHtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KGVudHJ5LmlubmVyVGV4dClcbiAgICAgICAgICBsZXQgbGFiZWwgPSBlbnRyeS5nZXRBdHRyaWJ1dGUoXCJsYWJlbFwiKSB8fCBwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQoMikpXG5cbiAgICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBsYWJlbFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTb3J0IHRoZSBsaXN0IHRvIGVuYWJsZSBzbmFwcGluZ1xuICAgIG9wdGlvbnMgPSBvcHRpb25zLnNvcnQoKGEsIGIpID0+IGEudmFsdWUgLSBiLnZhbHVlKVxuXG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5fbWluVmFsdWUgPSBOdW1iZXIuTUFYX1ZBTFVFXG4gICAgICB0aGlzLl9tYXhWYWx1ZSA9IE51bWJlci5NSU5fVkFMVUVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX21pblZhbHVlID0gTWF0aC5taW4odGhpcy5fbWluVmFsdWUsIG9wdGlvbnNbaV0udmFsdWUpXG4gICAgICAgIHRoaXMuX21heFZhbHVlID0gTWF0aC5tYXgodGhpcy5fbWF4VmFsdWUsIG9wdGlvbnNbaV0udmFsdWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBfYWRkVGlja3MoZGF0YUl0ZW1zOiBPcHRpb25bXSkge1xuICAgIGZvciAobGV0IGVudHJ5IG9mIGRhdGFJdGVtcykge1xuICAgICAgbGV0IHRpY2tFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgU3RyaW5nKGVudHJ5LnZhbHVlKSlcbiAgICAgICAgLmFkZENsYXNzKENMQVNTX1RJQ0spXG5cbiAgICAgIGxldCB0aWNrTGFiZWwgPSBuZXcgRG9tRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgLmFkZENsYXNzKENMQVNTX1RJQ0tfTEFCRUwpXG4gICAgICAgIC5zZXRIdG1sKFN0cmluZyhlbnRyeS5sYWJlbCkpXG5cbiAgICAgIHRpY2tFbGVtZW50LmFwcGVuZENoaWxkKHRpY2tMYWJlbClcbiAgICAgIHRoaXMuX3RpY2tzV3JhcHBlci5hcHBlbmRDaGlsZCh0aWNrRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzRXZlbnRPbkxhYmVsKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnRcblxuICAgIHJldHVybiAhIWVsPy5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfVElDS19MQUJFTClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlRG93bihldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5hZGRDbGFzcyhDTEFTU19EUkFHR0lORylcblxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fZW5kSGFuZGxlcilcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX21vdmVIYW5kbGVyKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2VuZEhhbmRsZXIpXG5cbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fbW92ZUhhbmRsZXIpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX2VuZEhhbmRsZXIpXG5cbiAgICAvLyBJZ25vcmUgY2xpY2tzIGRpcmVjdGx5IG9uIHRoZSB0aHVtYlxuICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX3JhbmdlVGh1bWIuZWxlbWVudCAmJiAhdGhpcy5faXNFdmVudE9uTGFiZWwoZXZlbnQpKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5fZ2V0UmVsYXRpdmVQb3NpdGlvbihldmVudClcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKHBvcywgdHJ1ZSwgZmFsc2UsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlTW92ZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICBwcmV2ZW50RGVmYXVsdChldmVudClcbiAgICB0aGlzLl91bmZvY3VzKClcblxuICAgIGlmICghdGhpcy5faXNFdmVudE9uTGFiZWwoZXZlbnQpKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5fZ2V0UmVsYXRpdmVQb3NpdGlvbihldmVudClcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKHBvcywgdHJ1ZSwgZmFsc2UsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlRW5kKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LnJlbW92ZUNsYXNzKENMQVNTX0RSQUdHSU5HKVxuXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9lbmRIYW5kbGVyKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2VuZEhhbmRsZXIpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9tb3ZlSGFuZGxlcilcblxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9tb3ZlSGFuZGxlcilcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fZW5kSGFuZGxlcilcblxuICAgIGxldCBwb3MgPSB0aGlzLl9nZXRSZWxhdGl2ZVBvc2l0aW9uKGV2ZW50KVxuICAgIHRoaXMuX3NldFBvc2l0aW9uKHBvcywgdHJ1ZSwgdHJ1ZSwgdHJ1ZSlcbiAgICB0aGlzLl9oYW5kbGVCbHVyKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGxldCBrZXljb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZVxuXG4gICAgaWYgKGtleWNvZGUgPT09IElucHV0cy5LRVlfRVNDQVBFKSB7XG4gICAgICAvLyBoYW5kbGUgRXNjYXBlIGtleSAoRVNDKVxuICAgICAgdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5ibHVyKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGlzVXAgPSBrZXljb2RlID09PSBJbnB1dHMuS0VZX0FSUk9XX1VQIHx8IGtleWNvZGUgPT09IElucHV0cy5LRVlfQVJST1dfUklHSFRcbiAgICAgIHx8IGtleWNvZGUgPT09IElucHV0cy5LRVlfUEFHRV9VUFxuXG4gICAgY29uc3QgaXNEb3duID0ga2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19ET1dOIHx8IGtleWNvZGUgPT09IElucHV0cy5LRVlfQVJST1dfTEVGVFxuICAgICAgfHwga2V5Y29kZSA9PT0gSW5wdXRzLktFWV9QQUdFX0RPV05cblxuICAgIGlmIChpc1VwIHx8IGlzRG93bikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBsZXQgZGlyZWN0aW9uID0gaXNEb3duID8gLTEgOiAxXG5cbiAgICAgIC8vIG1ha2UgYSBsYXJnZXIgc3RlcCBpZiBpdHMgdGhlIHZlcnRpY2FsIGFycm93IG9yIHBhZ2Uga2V5c1xuICAgICAgaWYgKGtleWNvZGUgPT09IElucHV0cy5LRVlfQVJST1dfVVAgfHwga2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19ET1dOIHx8XG4gICAgICAgIGtleWNvZGUgPT09IElucHV0cy5LRVlfUEFHRV9VUCB8fCBrZXljb2RlID09PSBJbnB1dHMuS0VZX1BBR0VfRE9XTikge1xuICAgICAgICBkaXJlY3Rpb24gKj0gMTBcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWVcbiAgICAgIGlmICh0aGlzLl90aWNrc1dyYXBwZXIuZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFsID0gdGhpcy5fZ2V0TmV4dFZhbHVlKHZhbCwgZGlyZWN0aW9uKVxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsZXQgc3RlcDogc3RyaW5nIHwgbnVtYmVyID0gdGhpcy5lbGVtZW50LnN0ZXBcbiAgICAgICAgaWYgKCFzdGVwIHx8IHN0ZXAgPT09IFwiYW55XCIpIHtcbiAgICAgICAgICBzdGVwID0gXCIwLjFcIlxuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdWYWwgPSB2YWwgKyAocGFyc2VGbG9hdChzdGVwKSAqIGRpcmVjdGlvbilcbiAgICAgICAgdmFsID0gbmV3VmFsXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldFZhbHVlKHZhbCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuYWRkQ2xhc3MoQ0xBU1NfQUNUSVZFKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLnJlbW92ZUNsYXNzKENMQVNTX0FDVElWRSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5mb2N1cygpIHtcbiAgICBpZiAoKGRvY3VtZW50IGFzIGFueSkuc2VsZWN0aW9uKSB7XG4gICAgICAoZG9jdW1lbnQgYXMgYW55KS5zZWxlY3Rpb24uZW1wdHkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkhLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRSZWxhdGl2ZVBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIGxldCBwYWdlWFxuICAgIGlmIChcInBhZ2VYXCIgaW4gZXZlbnQpIHtcbiAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZVggPSAoZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSkucGFnZVhcbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZVggLSB0aGlzLl90cmFja0xlZnRQb3NpdGlvbiArIHRoaXMuX2dyYWJQb3NpdGlvblxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBhbmQgdXBkYXRlcyB0aGUgcG9zaXRpb24gYW5kIHNldHMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb24gdGhlIHNsaWRlci5cbiAgICogQHBhcmFtIHtwb3NpdGlvbn0gdGhlIG5ldyBwb3NpdGlvbiB0byBzZXQuXG4gICAqIEBwYXJhbSB7dXBkYXRlVmFsdWV9IHRydWUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSB1cGRhdGVkIGFzIHdlbGw7IG90aGVyd2lzZSBmYWxzZS5cbiAgICogQHBhcmFtIHtzbmFwfSB0cnVlIGlmIHNuYXBwaW5nIHNob3VsZCBiZSB1c2VkOyBvdGhlcndpc2UgZmFsc2UuXG4gICAqIEBwYXJhbSB7YW5pbWF0ZX0gdHJ1ZSBpZiB0aGUgVUkgdXBkYXRlIHNob3VsZCBiZSBhbmltYXRlZDsgb3RoZXJ3aXNlIGZhbHNlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zZXRQb3NpdGlvbihcbiAgICBwb3NpdGlvbjogbnVtYmVyLFxuICAgIHVwZGF0ZVZhbHVlID0gdHJ1ZSxcbiAgICBzbmFwID0gZmFsc2UsXG4gICAgYW5pbWF0ZSA9IHRydWVcbiAgKSB7XG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPT09IG51bGwgfHwgTnVtYmVyLmlzTmFOKHBvc2l0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gaXMgbm90IGEgbnVtYmVyXCIpXG4gICAgfVxuXG4gICAgLy8gQ2xhbXAgdG8gbWluIGFuZCBtYXggcmFuZ2VcbiAgICBsZXQgbmV3UG9zID0gY2xhbXAocG9zaXRpb24sIHRoaXMuX3RyYWNrUG9zaXRpb25NaW4sIHRoaXMuX3RyYWNrUG9zaXRpb25NYXgpXG4gICAgaWYgKHVwZGF0ZVZhbHVlKSB7XG4gICAgICBsZXQgdmFsdWUgPSAodGhpcy5fdHJhY2tWYWx1ZVRvdGFsIC8gdGhpcy5fdHJhY2tXaWR0aCkgKiBuZXdQb3MgKyB0aGlzLl9taW5WYWx1ZVxuXG4gICAgICBpZiAodGhpcy5fdGlja3NXcmFwcGVyLmVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAxICYmIHNuYXApIHtcbiAgICAgICAgbGV0IHNuYXBQb3MgPSB0aGlzLl9nZXRTbmFwUG9zaXRpb24obmV3UG9zKVxuICAgICAgICBuZXdQb3MgPSBzbmFwUG9zLnBvc2l0aW9uXG4gICAgICAgIHZhbHVlID0gc25hcFBvcy52YWx1ZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnQuc3RlcCAmJiB0aGlzLmVsZW1lbnQuc3RlcCAhPT0gXCJhbnlcIikge1xuICAgICAgICBjb25zdCBzdGVwID0gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnQuc3RlcClcbiAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gc3RlcCkgKiBzdGVwXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldFZhbHVlKHZhbHVlLCBmYWxzZSwgZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGUgJiYgdXBkYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVRpY2tTdGF0ZSgpXG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgIGFuaW1lKHtcbiAgICAgICAgdGFyZ2V0czogdGhpcy5fcmFuZ2VUaHVtYi5lbGVtZW50LFxuICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICBsZWZ0OiBuZXdQb3MsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRRdWludFwiXG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy5fcmFuZ2VQcm9ncmVzcykge1xuICAgICAgICBhbmltZSh7XG4gICAgICAgICAgdGFyZ2V0czogdGhpcy5fcmFuZ2VQcm9ncmVzcy5lbGVtZW50LFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgd2lkdGg6IG5ld1BvcyxcbiAgICAgICAgICBlYXNpbmc6IFwiZWFzZUluT3V0UXVpbnRcIlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yYW5nZVRodW1iLmVsZW1lbnQuc3R5bGUubGVmdCA9IG5ld1BvcyArIFwicHhcIlxuXG4gICAgICBpZiAodGhpcy5fcmFuZ2VQcm9ncmVzcykge1xuICAgICAgICB0aGlzLl9yYW5nZVByb2dyZXNzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBuZXdQb3MgKyBcInB4XCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc25hcCB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICogQHBhcmFtIHt2YWx1ZX0gdGhlIHRhcmdldCB2YWx1ZS5cbiAgICogQHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHNuYXAgcG9zaXRpb24gYW5kIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRTbmFwVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IHRpY2tzID0gdGhpcy5fdGlja3NXcmFwcGVyLmVsZW1lbnQuY2hpbGRyZW5cbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWNrcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudCh0aWNrc1tpXSlcbiAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBwYXJzZUZsb2F0KGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikhKVxuICAgICAgbGV0IGN1cnJlbnRXaWR0aCA9IGN1cnJlbnRFbGVtZW50LmVsZW1lbnQuY2xpZW50V2lkdGhcblxuICAgICAgbGV0IG5leHRFbGVtZW50XG4gICAgICBsZXQgbmV4dFZhbHVlID0gTnVtYmVyLk1BWF9WQUxVRVxuXG4gICAgICBpZiAoaSA8IHRpY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudCh0aWNrc1tpICsgMV0pXG4gICAgICAgIG5leHRWYWx1ZSA9IHBhcnNlRmxvYXQobmV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKSEpXG4gICAgICB9XG5cbiAgICAgIC8vIGxlZnQgbW9zdCBlbGVtZW50XG4gICAgICBpZiAoaSA9PT0gMCAmJiB2YWx1ZSA8PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogY3VycmVudFZhbHVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBNQVJHSU5fVElDSyAtIHRoaXMuX2dyYWJQb3NpdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJpZ2h0IG1vc3QgZWxlbWVudFxuICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiB2YWx1ZSA+PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogY3VycmVudFZhbHVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb24gKyAoY3VycmVudFdpZHRoIC0gTUFSR0lOX1RJQ0spIC0gdGhpcy5fZ3JhYlBvc2l0aW9uIC0gMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSA+PSBjdXJyZW50VmFsdWUgJiYgdmFsdWUgPCBuZXh0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogY3VycmVudFZhbHVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb24gKyAoMC41ICogY3VycmVudFdpZHRoKSAtIHRoaXMuX2dyYWJQb3NpdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRQb3NpdGlvbiArPSBjdXJyZW50V2lkdGhcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGV0ZXJtaW5lIHNuYXAgdmFsdWVcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzbmFwIHBvc2l0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0ge3Bvc2l0aW9ufSB0aGUgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgc25hcCBwb3NpdGlvbiBhbmQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldFNuYXBQb3NpdGlvbihwb3NpdGlvbj86IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA9PT0gbnVsbCB8fCBOdW1iZXIuaXNOYU4ocG9zaXRpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwb3NpdGlvbiBpcyBub3QgYSBudW1iZXJcIilcbiAgICB9XG5cbiAgICBjb25zdCB0aWNrcyA9IHRoaXMuX3RpY2tzV3JhcHBlci5lbGVtZW50LmNoaWxkcmVuXG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IG5ldyBEb21FbGVtZW50KHRpY2tzW2ldKVxuICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKSEpXG4gICAgICBsZXQgY3VycmVudFdpZHRoID0gY3VycmVudEVsZW1lbnQuZWxlbWVudC5jbGllbnRXaWR0aFxuXG4gICAgICBsZXQgbmV4dEVsZW1lbnRcblxuICAgICAgaWYgKGkgPCB0aWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIG5leHRFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQodGlja3NbaSArIDFdKVxuICAgICAgfVxuXG4gICAgICAvLyBsZWZ0IG1vc3QgZWxlbWVudFxuICAgICAgaWYgKGkgPT09IDAgJiYgcG9zaXRpb24gPD0gY3VycmVudFBvc2l0aW9uICsgY3VycmVudFdpZHRoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogTUFSR0lOX1RJQ0sgLSB0aGlzLl9ncmFiUG9zaXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByaWdodCBtb3N0IGVsZW1lbnRcbiAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgcG9zaXRpb24gPj0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogY3VycmVudFBvc2l0aW9uICsgKGN1cnJlbnRXaWR0aCAtIE1BUkdJTl9USUNLKSAtIHRoaXMuX2dyYWJQb3NpdGlvbiAtIDFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24gPj0gY3VycmVudFBvc2l0aW9uICYmIHBvc2l0aW9uIDwgKGN1cnJlbnRQb3NpdGlvbiArIGN1cnJlbnRXaWR0aCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogY3VycmVudFZhbHVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb24gKyAoMC41ICogY3VycmVudFdpZHRoKSAtIHRoaXMuX2dyYWJQb3NpdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRQb3NpdGlvbiArPSBjdXJyZW50V2lkdGhcbiAgICB9XG5cbiAgICAvLyBObyB0aWNrcyBmb3VuZCAoZS5nLiBmb3IgXCJGcmVlIFNsaWRlclwiKVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogMCxcbiAgICAgIHBvc2l0aW9uOiAwXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG5leHQgdmFsdWUgaW4gdGhlIGdpdmVuIGRpcmVjdGlvbiB3aXRoIHJlZ2FyZHMgdG8gc25hcHBpbmcuXG4gICAqIEBwYXJhbSB7dmFsdWV9IFRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBAcGFyYW0ge2RpcmVjdGlvbn0gVGhlIGRpcmVjdGlvbiAocG9zaXRpdmUgb3IgbmVnYXRpdmUgaW50ZWdlcikuXG4gICAqIEByZXR1cm5zIFRoZSBuZXh0IHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXROZXh0VmFsdWUodmFsdWU6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCB0aWNrcyA9IHRoaXMuX3RpY2tzV3JhcHBlci5lbGVtZW50LmNoaWxkcmVuXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IG5ldyBEb21FbGVtZW50KHRpY2tzW2ldKVxuICAgICAgbGV0IGN1cnJlbnRWYWwgPSBwYXJzZUZsb2F0KGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikhKVxuXG4gICAgICBpZiAodmFsdWUgPT09IGN1cnJlbnRWYWwpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gY2xhbXAoaSArIGRpcmVjdGlvbiwgMCwgdGlja3MubGVuZ3RoIC0gMSlcbiAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHRpY2tzW2luZGV4XS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpISlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHByb3RlY3RlZCBfdXBkYXRlVGlja1N0YXRlKCkge1xuICAgIGlmICh0aGlzLl90aWNrc1dyYXBwZXIuZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxldCBhY3RpdmVUaWNrID0gdGhpcy5fdGlja3NXcmFwcGVyLmZpbmQoYC4ke0NMQVNTX1RJQ0tfQUNUSVZFfWApXG4gICAgICBpZiAoYWN0aXZlVGljaykge1xuICAgICAgICBhY3RpdmVUaWNrLnJlbW92ZUNsYXNzKENMQVNTX1RJQ0tfQUNUSVZFKVxuICAgICAgfVxuICAgICAgbGV0IG5ld0FjdGl2ZVRpY2sgPSB0aGlzLl90aWNrc1dyYXBwZXIuZmluZChgLiR7Q0xBU1NfVElDS31bZGF0YS12YWx1ZT0nJHt0aGlzLnZhbHVlfSddYClcbiAgICAgIGlmIChuZXdBY3RpdmVUaWNrKSB7XG4gICAgICAgIG5ld0FjdGl2ZVRpY2suYWRkQ2xhc3MoQ0xBU1NfVElDS19BQ1RJVkUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hZGp1c3RUaWNrTGFiZWxQb3NpdGlvbihcbiAgICB0aWNrSXRlbTogRWxlbWVudCxcbiAgICBsZWZ0OiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IGxhYmVsID0gbmV3IERvbUVsZW1lbnQodGlja0l0ZW0ucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NfVElDS19MQUJFTH1gKSEpXG5cbiAgICBsZXQgZHVtbXlFbGVtZW50ID0gbmV3IERvbUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NfVElDS19MQUJFTClcbiAgICAgIC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInZpc2liaWxpdHk6IGhpZGRlbjsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiKVxuICAgICAgLnNldEh0bWwobGFiZWwuaW5uZXJUZXh0KVxuXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVtbXlFbGVtZW50KVxuXG4gICAgbGV0IHdpZHRoID0gZHVtbXlFbGVtZW50LmVsZW1lbnQuY2xpZW50V2lkdGggLyAyXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIucmVtb3ZlQ2hpbGQoZHVtbXlFbGVtZW50KVxuXG4gICAgY29uc3QgZmxvYXRQb3NpdGlvbiA9IGxlZnQgPyBcImxlZnRcIiA6IFwicmlnaHRcIlxuXG4gICAgaWYgKHdpZHRoIDwgTUFSR0lOX1RJQ0spIHtcbiAgICAgIC8vIGNlbnRlciBzbWFsbCBpdGVtcyBvbiB0aGUgdGlja1xuICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgYCR7ZmxvYXRQb3NpdGlvbn06ICR7TUFSR0lOX1RJQ0sgLSBNYXRoLmZsb29yKHdpZHRoKX1weDsgdGV4dC1hbGlnbjogJHtmbG9hdFBvc2l0aW9ufTtgKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZm9ybWF0T3V0cHV0KHZhbHVlOiBudW1iZXIsIHNob3J0OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2Zvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlcih2YWx1ZSwgc2hvcnQpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RyID0gcGFyc2VGbG9hdCh2YWx1ZS50b0ZpeGVkKDIpKVxuICAgIHJldHVybiBzdHIudG9TdHJpbmcoKVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBhbmQgdXBkYXRlcyB0aGUgcmFuZ2UgdmFsdWUuXG4gICAqIEBwYXJhbSB7dmFsdWV9IHRoZSBuZXcgdmFsdWUgdG8gc2V0LlxuICAgKiBAcGFyYW0ge3VwZGF0ZX0gdHJ1ZSBpZiB0aGUgVUkgc2hvdWxkIGJlIHVwZGF0ZWQ7IG90aGVyd2lzZSBmYWxzZS5cbiAgICogQHBhcmFtIHthbmltYXRlfSB0cnVlIGlmIHRoZSBVSSB1cGRhdGUgc2hvdWxkIGJlIGFuaW1hdGVkOyBvdGhlcndpc2UgZmFsc2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NldFZhbHVlKFxuICAgIHZhbHVlOiBudW1iZXIsXG4gICAgdXBkYXRlID0gdHJ1ZSxcbiAgICBhbmltYXRlID0gZmFsc2VcbiAgKSB7XG4gICAgbGV0IHZhbCA9IGNsYW1wKHZhbHVlLCB0aGlzLl9taW5WYWx1ZSwgdGhpcy5fbWF4VmFsdWUpXG4gICAgbGV0IHBvc2l0aW9uXG5cbiAgICBpZiAodGhpcy5fdGlja3NXcmFwcGVyLmVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7IC8vIGF0IGxlYXN0IDIgdGlja3MgcHJlc2VudFxuICAgICAgY29uc3Qgc25hcFZhbHVlID0gdGhpcy5fZ2V0U25hcFZhbHVlKHZhbClcbiAgICAgIHBvc2l0aW9uID0gc25hcFZhbHVlLnBvc2l0aW9uXG4gICAgICB2YWwgPSBzbmFwVmFsdWUudmFsdWVcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3RpY2tzV3JhcHBlci5lbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxKSB7IC8vIG9ubHkgMSB0aWNrIHByZXNlbnRcbiAgICAgIC8vIFRoaXMgc2hvdWxkbid0IGhhcHBlbiAoYnV0IGl0IGRvZXMsIGUuZy4gd2hlbiBnZW5lcmF0aW5nIFNsaWRlcnMgYmFzZWQgb24gaW5jb21wbGV0ZSBkYXRhKS5cbiAgICAgIC8vIEZhbGwgYmFjayB0byB0aGUgZmlyc3QgdGljayBwb3NpdGlvbiBhbmQgZGlzYWJsZSB0aGUgY29tcG9uZW50LlxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRTbmFwUG9zaXRpb24odmFsKS5wb3NpdGlvblxuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9IGVsc2UgeyAvLyBubyB0aWNrcyBwcmVzZW50LCBlLmcuIFwiRnJlZSBTbGlkZXJcIlxuICAgICAgcG9zaXRpb24gPSAodGhpcy5fdHJhY2tXaWR0aCAvIHRoaXMuX3RyYWNrVmFsdWVUb3RhbCkgKiAodmFsdWUgLSB0aGlzLl9taW5WYWx1ZSlcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBTdHJpbmcodmFsKVxuXG4gICAgaWYgKHRoaXMuX3RodW1iVmFsdWUpIHtcbiAgICAgIHRoaXMuX3RodW1iVmFsdWUuc2V0SHRtbCh0aGlzLl9mb3JtYXRPdXRwdXQodmFsLCB0cnVlKSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3V0cHV0TGFiZWwpIHtcbiAgICAgIHRoaXMuX291dHB1dExhYmVsLnNldEh0bWwodGhpcy5fZm9ybWF0T3V0cHV0KHZhbCwgZmFsc2UpKVxuICAgIH1cblxuICAgIGlmICh1cGRhdGUpIHtcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKHBvc2l0aW9uLCBmYWxzZSwgZmFsc2UsIGFuaW1hdGUpXG4gICAgICB0aGlzLl91cGRhdGVUaWNrU3RhdGUoKVxuICAgIH1cblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcImlucHV0XCIpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHJhbmdlIHNsaWRlci5cbiAgICovXG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0VmFsdWUodmFsdWUsIHRydWUsIHRydWUpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnQudmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgdGhlIGNvbXBvbmVudCB0byByZS1sYXlvdXQgaXRzZWxmLlxuICAgKi9cbiAgcHVibGljIGxheW91dCgpIHtcbiAgICB0aGlzLl9ncmFiUG9zaXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuX3JhbmdlVGh1bWIuZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpXG4gICAgY29uc3QgdGlja0l0ZW1zID0gdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtDTEFTU19USUNLfWApXG4gICAgY29uc3QgdGlja3NPZmZzZXQgPSB0aWNrSXRlbXMgJiYgdGlja0l0ZW1zLmxlbmd0aCA+IDAgPyAoMiAqIE1BUkdJTl9USUNLKSA6IE1BUkdJTl9USUNLXG5cbiAgICB0aGlzLl90cmFja1dpZHRoID0gdGhpcy5fcmFuZ2VUcmFjay5lbGVtZW50Lm9mZnNldFdpZHRoIC0gdGlja3NPZmZzZXRcblxuICAgIHRoaXMuX3RyYWNrUG9zaXRpb25NaW4gPSAwXG4gICAgdGhpcy5fdHJhY2tQb3NpdGlvbk1heCA9IHRoaXMuX3JhbmdlVHJhY2suZWxlbWVudC5jbGllbnRXaWR0aCAtIHRoaXMuX3JhbmdlVGh1bWIuZWxlbWVudC5vZmZzZXRXaWR0aCArIDFcbiAgICB0aGlzLl90cmFja0xlZnRQb3NpdGlvbiA9IHRoaXMuX3JhbmdlVHJhY2suZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgTUFSR0lOX1RJQ0tcblxuICAgIGxldCBpdGVtQ291bnQgPSB0aWNrSXRlbXMubGVuZ3RoIC0gMVxuXG4gICAgdGhpcy5faXRlbVdpZHRoID0gdGhpcy5fdHJhY2tXaWR0aCAvIGl0ZW1Db3VudFxuICAgIGNvbnN0IG91dGVySXRlbXNXaWR0aCA9ICh0aGlzLl9pdGVtV2lkdGggKiAwLjUpICsgTUFSR0lOX1RJQ0tcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGl0ZW1Db3VudDsgaSsrKSB7XG4gICAgICBsZXQgd2lkdGggPSB0aGlzLl9pdGVtV2lkdGhcblxuICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gaXRlbUNvdW50KSB7XG4gICAgICAgIHdpZHRoID0gb3V0ZXJJdGVtc1dpZHRoXG4gICAgICB9XG5cbiAgICAgIGxldCBpdGVtID0gbmV3IERvbUVsZW1lbnQodGlja0l0ZW1zW2ldKVxuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgd2lkdGg6ICR7TWF0aC5mbG9vcih3aWR0aCl9cHg7YClcbiAgICB9XG5cbiAgICAvLyBhZGp1c3QgZmlyc3QgYW5kIGxhc3QgbGFiZWwgcG9zaXRpb25zXG4gICAgaWYgKHRpY2tJdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLl9hZGp1c3RUaWNrTGFiZWxQb3NpdGlvbih0aWNrSXRlbXNbMF0sIHRydWUpXG4gICAgICB0aGlzLl9hZGp1c3RUaWNrTGFiZWxQb3NpdGlvbih0aWNrSXRlbXNbdGlja0l0ZW1zLmxlbmd0aCAtIDFdLCBmYWxzZSlcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdGhlIHZhbHVlXG4gICAgdGhpcy5fc2V0VmFsdWUocGFyc2VGbG9hdCh0aGlzLmVsZW1lbnQudmFsdWUpLCB0cnVlLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgY29tcG9uZW50cyBhbmQgZnJlZXMgYWxsIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9yZXNpemVIYW5kbGVyKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgdGhpcy5fcmVzaXplSGFuZGxlcik7XG5cbiAgICAodGhpcyBhcyBhbnkpLl9kb3duSGFuZGxlciA9IG51bGw7XG4gICAgKHRoaXMgYXMgYW55KS5fbW92ZUhhbmRsZXIgPSBudWxsO1xuICAgICh0aGlzIGFzIGFueSkuX2VuZEhhbmRsZXIgPSBudWxsO1xuICAgICh0aGlzIGFzIGFueSkuX2ZvY3VzSGFuZGxlciA9IG51bGw7XG4gICAgKHRoaXMgYXMgYW55KS5fYmx1ckhhbmRsZXIgPSBudWxsO1xuXG4gICAgKHRoaXMgYXMgYW55KS5lbGVtZW50ID0gbnVsbDtcbiAgICAodGhpcyBhcyBhbnkpLl9yYW5nZUNvbnRhaW5lciA9IG51bGw7XG4gICAgKHRoaXMgYXMgYW55KS5fd3JhcHBlckVsZW1lbnQgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGRlc3Ryb3koKSBpbnN0ZWFkLlxuICAgKiBAdG9kbyByZW1vdmUgaW4gdmVyc2lvbiAyLjAuMFxuICAgKi9cbiAgcHVibGljIGRlc3RveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbXBvbmVudCB0byB0aGUgZW5hYmxlZCBzdGF0ZS5cbiAgICovXG4gIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpXG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQucmVtb3ZlQ2xhc3MoQ0xBU1NfRElTQUJMRUQpXG5cbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fZG93bkhhbmRsZXIpXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9kb3duSGFuZGxlcilcbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2tleWRvd25IYW5kbGVyKVxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMuX2ZvY3VzSGFuZGxlcilcbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX2JsdXJIYW5kbGVyKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbXBvbmVudCB0byB0aGUgZGlzYWJsZWQgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIilcbiAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5hZGRDbGFzcyhDTEFTU19ESVNBQkxFRClcblxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9kb3duSGFuZGxlcilcbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2VuZEhhbmRsZXIpXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX21vdmVIYW5kbGVyKVxuXG4gICAgdGhpcy5fcmFuZ2VDb250YWluZXIuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9kb3duSGFuZGxlcilcblxuICAgIHRoaXMuX3JhbmdlQ29udGFpbmVyLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMuX2ZvY3VzSGFuZGxlcilcbiAgICB0aGlzLl9yYW5nZUNvbnRhaW5lci5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuX2JsdXJIYW5kbGVyKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplPEhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRbdHlwZT0ncmFuZ2UnXVwiLCAoZSkgPT4ge1xuICAgIG5ldyBSYW5nZShlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
