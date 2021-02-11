import { __extends, __values } from "tslib";
import anime from "animejs";
import { searchAndInitialize, clamp } from "../Utils";
import DomElement from "../DomElement";
var CLASS_BAR = ".progress-light__bar";
var CLASS_PROGRESS = ".bar__progress";
var CLASS_PROGRESS_COMPLETED = "bar__progress--complete";
var CLASS_TICK = "bar__tick";
var CLASS_PAGE_CURRENT = ".detail__currentpage";
var CLASS_PAGE_TOTAL = ".detail__totalpage";
var CLASS_DISABLED = "arrow--disabled";
var CLASS_BUTTON_LEFT = ".arrow--left";
var CLASS_BUTTON_RIGHT = ".arrow--right";
/**
 * Light progress bar component
 */
var ProgressLight = /** @class */ (function (_super) {
    __extends(ProgressLight, _super);
    /**
     * Creates and initializes the ProgressLight component.
     * @param {DomElement} - The root element of the ProgressLight component.
     */
    function ProgressLight(element) {
        var _this = _super.call(this, element) || this;
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the loader bar component.
     * @private
     */
    ProgressLight.prototype._initialize = function () {
        this._buttonClickHandler = this._handleButtonClick.bind(this);
        this._animationCompletedHandler = this._handleAnimationCompleted.bind(this);
        this._barElement = this.find(CLASS_BAR);
        this._progressElement = this.find(CLASS_PROGRESS);
        this._pageCurrentElement = this.find(CLASS_PAGE_CURRENT);
        this._pageTotalElement = this.find(CLASS_PAGE_TOTAL);
        this._buttonLeft = this.find(CLASS_BUTTON_LEFT);
        this._buttonRight = this.find(CLASS_BUTTON_RIGHT);
        this._minValue = 1;
        this._total = Math.max(parseInt(this.getAttribute("total") || "100", 10), this._minValue);
        this._value = clamp(parseInt(this.getAttribute("value") || "1", 10), this._minValue, this._total);
        this._layout();
        this._addTicks();
        this._update(false);
        this.enable();
    };
    ProgressLight.prototype._addTicks = function () {
        for (var i = 1; i < this._total; i++) {
            var position = this._itemWidth * i;
            var tickElement = new DomElement("div")
                .addClass(CLASS_TICK)
                .setAttribute("style", "left: " + position + "%");
            this._barElement.prependChild(tickElement);
        }
    };
    ProgressLight.prototype._update = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        this._pageCurrentElement.setHtml(this._value.toString());
        this._pageTotalElement.setHtml(this._total.toString());
        var position = this._value * this._itemWidth;
        // Add additional width to the last element to make sure
        // the rounded border on the left is filled as well
        if (this._value === this._total) {
            position += 5;
        }
        if (this._value >= this._total) {
            this._buttonRight.addClass(CLASS_DISABLED);
        }
        else {
            this._buttonRight.removeClass(CLASS_DISABLED);
        }
        if (this._value <= this._minValue) {
            this._buttonLeft.addClass(CLASS_DISABLED);
        }
        else {
            this._buttonLeft.removeClass(CLASS_DISABLED);
        }
        var el = this._progressElement.element;
        if (animate) {
            anime({
                targets: this._progressElement.element,
                duration: 200,
                easing: "easeInOutQuint",
                width: this._barElement.element.clientWidth * position / 100,
                complete: function () {
                    el.style.width = position + "%";
                    _this._animationCompletedHandler({});
                }
            });
        }
        else {
            el.style.width = position + "%";
            this._animationCompletedHandler({});
        }
    };
    ProgressLight.prototype._layout = function () {
        this._itemWidth = Math.floor(100 / this._total);
    };
    ProgressLight.prototype._handleButtonClick = function (event) {
        if (event.target === this._buttonLeft.element) {
            this.value = this._value - 1;
        }
        else if (event.target === this._buttonRight.element) {
            this.value = this._value + 1;
        }
    };
    ProgressLight.prototype._handleAnimationCompleted = function () {
        if (this._value === this._total) {
            this._progressElement.addClass(CLASS_PROGRESS_COMPLETED);
        }
        else {
            this._progressElement.removeClass(CLASS_PROGRESS_COMPLETED);
        }
    };
    Object.defineProperty(ProgressLight.prototype, "value", {
        /**
         * Gets the current progress value in the range of 1..total.
         */
        get: function () {
            return this._value;
        },
        /**
         * Sets the current progress.
         * @param {number} - The progress in the range of 1..total.
         */
        set: function (val) {
            this._value = clamp(val, this._minValue, this._total);
            this._update(true);
            this.dispatchEvent("changed");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProgressLight.prototype, "total", {
        /**
         * Gets the total progress value.
         */
        get: function () {
            return this._total;
        },
        /**
         * Sets the total progress value and updates the UI accordingly.
         * @param {number} - The total progress positive integer value.
         */
        set: function (value) {
            var e_1, _a;
            if (this._total === value) {
                return;
            }
            this._total = Math.max(value, this._minValue);
            this._value = clamp(this._value, this._minValue, this._total);
            try {
                // Clear the ticks
                for (var _b = __values(this.element.querySelectorAll("." + CLASS_TICK)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var tick = _c.value;
                    this._barElement.element.removeChild(tick);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._layout();
            this._addTicks();
            this._update(false);
            this.dispatchEvent("totalchanged");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Enables the component.
     */
    ProgressLight.prototype.enable = function () {
        this._buttonLeft.element.addEventListener("click", this._buttonClickHandler);
        this._buttonRight.element.addEventListener("click", this._buttonClickHandler);
    };
    /**
     * Disables the component.
     */
    ProgressLight.prototype.disable = function () {
        this._buttonLeft.element.removeEventListener("click", this._buttonClickHandler);
        this._buttonRight.element.removeEventListener("click", this._buttonClickHandler);
    };
    return ProgressLight;
}(DomElement));
export function init() {
    searchAndInitialize(".progress-light", function (e) {
        new ProgressLight(e);
    });
}
export default ProgressLight;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL3Byb2dyZXNzL1Byb2dyZXNzTGlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQTtBQUMzQixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3JELE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUV0QyxJQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQTtBQUN4QyxJQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN2QyxJQUFNLHdCQUF3QixHQUFHLHlCQUF5QixDQUFBO0FBQzFELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQTtBQUM5QixJQUFNLGtCQUFrQixHQUFHLHNCQUFzQixDQUFBO0FBQ2pELElBQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUE7QUFFN0MsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUE7QUFDeEMsSUFBTSxpQkFBaUIsR0FBRyxjQUFjLENBQUE7QUFDeEMsSUFBTSxrQkFBa0IsR0FBRyxlQUFlLENBQUE7QUFFMUM7O0dBRUc7QUFDSDtJQUE0QixpQ0FBVTtJQWlCcEM7OztPQUdHO0lBQ0gsdUJBQVksT0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtRQURDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTs7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNPLG1DQUFXLEdBQXJCO1FBRUUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFM0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FB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QUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxhQUFhLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvcHJvZ3Jlc3MvUHJvZ3Jlc3NMaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5pbXBvcnQgeyBzZWFyY2hBbmRJbml0aWFsaXplLCBjbGFtcCB9IGZyb20gXCIuLi9VdGlsc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5cbmNvbnN0IENMQVNTX0JBUiA9IFwiLnByb2dyZXNzLWxpZ2h0X19iYXJcIlxuY29uc3QgQ0xBU1NfUFJPR1JFU1MgPSBcIi5iYXJfX3Byb2dyZXNzXCJcbmNvbnN0IENMQVNTX1BST0dSRVNTX0NPTVBMRVRFRCA9IFwiYmFyX19wcm9ncmVzcy0tY29tcGxldGVcIlxuY29uc3QgQ0xBU1NfVElDSyA9IFwiYmFyX190aWNrXCJcbmNvbnN0IENMQVNTX1BBR0VfQ1VSUkVOVCA9IFwiLmRldGFpbF9fY3VycmVudHBhZ2VcIlxuY29uc3QgQ0xBU1NfUEFHRV9UT1RBTCA9IFwiLmRldGFpbF9fdG90YWxwYWdlXCJcblxuY29uc3QgQ0xBU1NfRElTQUJMRUQgPSBcImFycm93LS1kaXNhYmxlZFwiXG5jb25zdCBDTEFTU19CVVRUT05fTEVGVCA9IFwiLmFycm93LS1sZWZ0XCJcbmNvbnN0IENMQVNTX0JVVFRPTl9SSUdIVCA9IFwiLmFycm93LS1yaWdodFwiXG5cbi8qKlxuICogTGlnaHQgcHJvZ3Jlc3MgYmFyIGNvbXBvbmVudFxuICovXG5jbGFzcyBQcm9ncmVzc0xpZ2h0IGV4dGVuZHMgRG9tRWxlbWVudCB7XG4gIHByaXZhdGUgX2J1dHRvbkNsaWNrSGFuZGxlciE6IChldmVudDogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uQ29tcGxldGVkSGFuZGxlciE6IChldmVudDogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIF9iYXJFbGVtZW50ITogRG9tRWxlbWVudDxFbGVtZW50PlxuICBwcml2YXRlIF9wcm9ncmVzc0VsZW1lbnQhOiBEb21FbGVtZW50PEVsZW1lbnQ+XG4gIHByaXZhdGUgX3BhZ2VDdXJyZW50RWxlbWVudCE6IERvbUVsZW1lbnQ8RWxlbWVudD5cbiAgcHJpdmF0ZSBfcGFnZVRvdGFsRWxlbWVudCE6IERvbUVsZW1lbnQ8RWxlbWVudD5cbiAgcHJpdmF0ZSBfYnV0dG9uTGVmdCE6IERvbUVsZW1lbnQ8RWxlbWVudD5cbiAgcHJpdmF0ZSBfYnV0dG9uUmlnaHQhOiBEb21FbGVtZW50PEVsZW1lbnQ+XG5cbiAgcHJpdmF0ZSBfbWluVmFsdWUhOiBudW1iZXJcbiAgcHJpdmF0ZSBfdG90YWwhOiBudW1iZXJcbiAgcHJpdmF0ZSBfdmFsdWUhOiBudW1iZXJcblxuICBwcml2YXRlIF9pdGVtV2lkdGg/OiBudW1iZXJcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIFByb2dyZXNzTGlnaHQgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge0RvbUVsZW1lbnR9IC0gVGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgUHJvZ3Jlc3NMaWdodCBjb21wb25lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbG9hZGVyIGJhciBjb21wb25lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG5cbiAgICB0aGlzLl9idXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLl9oYW5kbGVCdXR0b25DbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5fYW5pbWF0aW9uQ29tcGxldGVkSGFuZGxlciA9IHRoaXMuX2hhbmRsZUFuaW1hdGlvbkNvbXBsZXRlZC5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9iYXJFbGVtZW50ID0gdGhpcy5maW5kKENMQVNTX0JBUikhXG4gICAgdGhpcy5fcHJvZ3Jlc3NFbGVtZW50ID0gdGhpcy5maW5kKENMQVNTX1BST0dSRVNTKSFcbiAgICB0aGlzLl9wYWdlQ3VycmVudEVsZW1lbnQgPSB0aGlzLmZpbmQoQ0xBU1NfUEFHRV9DVVJSRU5UKSFcbiAgICB0aGlzLl9wYWdlVG90YWxFbGVtZW50ID0gdGhpcy5maW5kKENMQVNTX1BBR0VfVE9UQUwpIVxuICAgIHRoaXMuX2J1dHRvbkxlZnQgPSB0aGlzLmZpbmQoQ0xBU1NfQlVUVE9OX0xFRlQpIVxuICAgIHRoaXMuX2J1dHRvblJpZ2h0ID0gdGhpcy5maW5kKENMQVNTX0JVVFRPTl9SSUdIVCkhXG5cbiAgICB0aGlzLl9taW5WYWx1ZSA9IDFcbiAgICB0aGlzLl90b3RhbCA9IE1hdGgubWF4KHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKFwidG90YWxcIikgfHwgXCIxMDBcIiwgMTApLCB0aGlzLl9taW5WYWx1ZSlcbiAgICB0aGlzLl92YWx1ZSA9IGNsYW1wKHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikgfHwgXCIxXCIsIDEwKSwgdGhpcy5fbWluVmFsdWUsIHRoaXMuX3RvdGFsKVxuXG4gICAgdGhpcy5fbGF5b3V0KClcblxuICAgIHRoaXMuX2FkZFRpY2tzKClcbiAgICB0aGlzLl91cGRhdGUoZmFsc2UpXG5cbiAgICB0aGlzLmVuYWJsZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2FkZFRpY2tzKCkge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5fdG90YWw7IGkrKykge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9pdGVtV2lkdGghICogaVxuXG4gICAgICBsZXQgdGlja0VsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChcImRpdlwiKVxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfVElDSylcbiAgICAgICAgLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBsZWZ0OiAke3Bvc2l0aW9ufSVgKVxuXG4gICAgICB0aGlzLl9iYXJFbGVtZW50LnByZXBlbmRDaGlsZCh0aWNrRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZShhbmltYXRlID0gdHJ1ZSkge1xuICAgIHRoaXMuX3BhZ2VDdXJyZW50RWxlbWVudC5zZXRIdG1sKHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpXG4gICAgdGhpcy5fcGFnZVRvdGFsRWxlbWVudC5zZXRIdG1sKHRoaXMuX3RvdGFsLnRvU3RyaW5nKCkpXG5cbiAgICBsZXQgcG9zaXRpb24gPSB0aGlzLl92YWx1ZSAqIHRoaXMuX2l0ZW1XaWR0aCFcblxuICAgIC8vIEFkZCBhZGRpdGlvbmFsIHdpZHRoIHRvIHRoZSBsYXN0IGVsZW1lbnQgdG8gbWFrZSBzdXJlXG4gICAgLy8gdGhlIHJvdW5kZWQgYm9yZGVyIG9uIHRoZSBsZWZ0IGlzIGZpbGxlZCBhcyB3ZWxsXG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSB0aGlzLl90b3RhbCkge1xuICAgICAgcG9zaXRpb24gKz0gNVxuICAgIH1cblxuICAgIGlmICh0aGlzLl92YWx1ZSA+PSB0aGlzLl90b3RhbCkge1xuICAgICAgdGhpcy5fYnV0dG9uUmlnaHQuYWRkQ2xhc3MoQ0xBU1NfRElTQUJMRUQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvblJpZ2h0LnJlbW92ZUNsYXNzKENMQVNTX0RJU0FCTEVEKVxuICAgIH1cblxuICAgIGlmICh0aGlzLl92YWx1ZSA8PSB0aGlzLl9taW5WYWx1ZSkge1xuICAgICAgdGhpcy5fYnV0dG9uTGVmdC5hZGRDbGFzcyhDTEFTU19ESVNBQkxFRClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uTGVmdC5yZW1vdmVDbGFzcyhDTEFTU19ESVNBQkxFRClcbiAgICB9XG5cbiAgICBjb25zdCBlbCA9IHRoaXMuX3Byb2dyZXNzRWxlbWVudC5lbGVtZW50IGFzIEhUTUxFbGVtZW50XG4gICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgIGFuaW1lKHtcbiAgICAgICAgdGFyZ2V0czogdGhpcy5fcHJvZ3Jlc3NFbGVtZW50LmVsZW1lbnQsXG4gICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRRdWludFwiLFxuICAgICAgICB3aWR0aDogdGhpcy5fYmFyRWxlbWVudC5lbGVtZW50LmNsaWVudFdpZHRoICogcG9zaXRpb24gLyAxMDAsXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtwb3NpdGlvbn0lYFxuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNvbXBsZXRlZEhhbmRsZXIoPEV2ZW50Pnt9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IGAke3Bvc2l0aW9ufSVgXG4gICAgICB0aGlzLl9hbmltYXRpb25Db21wbGV0ZWRIYW5kbGVyKDxFdmVudD57fSlcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2xheW91dCgpIHtcbiAgICB0aGlzLl9pdGVtV2lkdGggPSBNYXRoLmZsb29yKDEwMCAvIHRoaXMuX3RvdGFsKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVCdXR0b25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9idXR0b25MZWZ0LmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZSAtIDFcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fYnV0dG9uUmlnaHQuZWxlbWVudCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX3ZhbHVlICsgMVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlQW5pbWF0aW9uQ29tcGxldGVkKCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdGhpcy5fdG90YWwpIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzRWxlbWVudC5hZGRDbGFzcyhDTEFTU19QUk9HUkVTU19DT01QTEVURUQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzRWxlbWVudC5yZW1vdmVDbGFzcyhDTEFTU19QUk9HUkVTU19DT01QTEVURUQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgdmFsdWUgaW4gdGhlIHJhbmdlIG9mIDEuLnRvdGFsLlxuICAgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAtIFRoZSBwcm9ncmVzcyBpbiB0aGUgcmFuZ2Ugb2YgMS4udG90YWwuXG4gICAqL1xuICBzZXQgdmFsdWUodmFsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBjbGFtcCh2YWwsIHRoaXMuX21pblZhbHVlLCB0aGlzLl90b3RhbClcbiAgICB0aGlzLl91cGRhdGUodHJ1ZSlcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcImNoYW5nZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0b3RhbCBwcm9ncmVzcyB2YWx1ZS5cbiAgICovXG4gIGdldCB0b3RhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0b3RhbCBwcm9ncmVzcyB2YWx1ZSBhbmQgdXBkYXRlcyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAtIFRoZSB0b3RhbCBwcm9ncmVzcyBwb3NpdGl2ZSBpbnRlZ2VyIHZhbHVlLlxuICAgKi9cbiAgc2V0IHRvdGFsKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3RvdGFsID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fdG90YWwgPSBNYXRoLm1heCh2YWx1ZSwgdGhpcy5fbWluVmFsdWUpXG4gICAgdGhpcy5fdmFsdWUgPSBjbGFtcCh0aGlzLl92YWx1ZSwgdGhpcy5fbWluVmFsdWUsIHRoaXMuX3RvdGFsKVxuXG4gICAgLy8gQ2xlYXIgdGhlIHRpY2tzXG4gICAgZm9yIChsZXQgdGljayBvZiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Q0xBU1NfVElDS31gKSkge1xuICAgICAgdGhpcy5fYmFyRWxlbWVudC5lbGVtZW50LnJlbW92ZUNoaWxkKHRpY2spXG4gICAgfVxuXG4gICAgdGhpcy5fbGF5b3V0KClcbiAgICB0aGlzLl9hZGRUaWNrcygpXG5cbiAgICB0aGlzLl91cGRhdGUoZmFsc2UpXG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJ0b3RhbGNoYW5nZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlKCkge1xuICAgIHRoaXMuX2J1dHRvbkxlZnQuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fYnV0dG9uQ2xpY2tIYW5kbGVyKVxuICAgIHRoaXMuX2J1dHRvblJpZ2h0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2J1dHRvbkNsaWNrSGFuZGxlcilcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgdGhpcy5fYnV0dG9uTGVmdC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9idXR0b25DbGlja0hhbmRsZXIpXG4gICAgdGhpcy5fYnV0dG9uUmlnaHQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fYnV0dG9uQ2xpY2tIYW5kbGVyKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplKFwiLnByb2dyZXNzLWxpZ2h0XCIsIChlKSA9PiB7XG4gICAgbmV3IFByb2dyZXNzTGlnaHQoZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NMaWdodFxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
