import { __extends } from "tslib";
import anime from "animejs";
import { searchAndInitialize, clamp, preventDefault } from "../Utils";
import * as Inputs from "../Inputs";
import DomElement from "../DomElement";
var CLASS_HEADER = ".progress-full__bar";
var CLASS_SECTIONS = ".progress-full__sections > span";
var CLASS_SECTION_ACTIVE = "section--active";
var CLASS_INDICATOR = "indicator";
var CLASS_INDICATOR_CURRENT = "indicator--current";
var CLASS_INDICATOR_COMPLETED = "indicator--completed";
/**
 * Full progress bar component
 */
var ProgressFull = /** @class */ (function (_super) {
    __extends(ProgressFull, _super);
    /**
     * Creates and initializes the ProgressFull component.
     * @param {DomElement} - The root element of the ProgressFull component.
     */
    function ProgressFull(element) {
        var _this = _super.call(this, element) || this;
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the loader bar component.
     * @private
     */
    ProgressFull.prototype._initialize = function () {
        this._buttonClickHandler = this._handleButtonClick.bind(this);
        this._keydownHandler = this._handleKeydown.bind(this);
        this._headerElement = this.find(CLASS_HEADER);
        this._pages = this.element.querySelectorAll(CLASS_SECTIONS);
        this._minValue = 1;
        this._value = 1;
        this._total = this._pages.length;
        for (var index = 0; index < this._pages.length; index++) {
            if (this._pages[index].classList.contains(CLASS_SECTION_ACTIVE)) {
                this._value = index + 1;
            }
        }
        this._addIncicators();
        this._update(-1, this._value, false);
        // Apply the tab index
        var tabIndex = this.getAttribute("tabindex");
        if (tabIndex) {
            this.setAttribute("tabindex", "");
            this._headerElement.setAttribute("tabindex", tabIndex);
        }
        this._headerElement.element.addEventListener("click", this._buttonClickHandler);
        this._headerElement.element.addEventListener("keydown", this._keydownHandler);
    };
    ProgressFull.prototype._addIncicators = function () {
        for (var i = this._pages.length - 1; i >= 0; i--) {
            var indicatorElement = new DomElement("button")
                .addClass(CLASS_INDICATOR)
                .setAttribute("data-value", "" + (i + 1))
                .setHtml((i + 1).toString());
            this._headerElement.prependChild(indicatorElement);
        }
    };
    ProgressFull.prototype._update = function (oldValue, newValue, animate) {
        if (animate === void 0) { animate = true; }
        var indicators = this._headerElement.element.childNodes;
        for (var index = 0; index < indicators.length; index++) {
            var indicatorElement = new DomElement(indicators[index]);
            if (index + 1 < this._value) {
                indicatorElement
                    .removeClass(CLASS_INDICATOR_CURRENT)
                    .addClass(CLASS_INDICATOR_COMPLETED);
            }
            if (index + 1 === this._value) {
                indicatorElement
                    .removeClass(CLASS_INDICATOR_COMPLETED)
                    .addClass(CLASS_INDICATOR_CURRENT);
            }
            if (index + 1 > this._value) {
                indicatorElement
                    .removeClass(CLASS_INDICATOR_COMPLETED)
                    .removeClass(CLASS_INDICATOR_CURRENT);
            }
        }
        if (oldValue !== newValue) {
            var direction = Math.sign(oldValue - newValue);
            if (oldValue > 0 && oldValue !== newValue) {
                var oldSection_1 = new DomElement(this._pages[oldValue - 1]);
                if (animate) {
                    anime({
                        targets: oldSection_1.element,
                        duration: 300,
                        left: 100 * direction,
                        opacity: 0,
                        easing: "easeInOutQuint",
                        complete: function () {
                            oldSection_1.removeClass(CLASS_SECTION_ACTIVE);
                            oldSection_1.setAttribute("style", "");
                        }
                    });
                }
                else {
                    oldSection_1.removeClass(CLASS_SECTION_ACTIVE);
                    oldSection_1.setAttribute("style", "");
                }
            }
            var newSection_1 = new DomElement(this._pages[newValue - 1]);
            if (animate) {
                var el = newSection_1.element;
                el.style.left = -100 * direction + "px";
                el.style.opacity = "0";
                newSection_1.addClass(CLASS_SECTION_ACTIVE);
                anime({
                    targets: newSection_1.element,
                    duration: 300,
                    left: 0,
                    opacity: 1,
                    easing: "easeInOutQuint",
                    complete: function () {
                        newSection_1.setAttribute("style", "");
                    }
                });
            }
            else {
                newSection_1.addClass(CLASS_SECTION_ACTIVE);
                newSection_1.setAttribute("style", "");
            }
        }
    };
    ProgressFull.prototype._handleButtonClick = function (event) {
        var element = new DomElement(event.target);
        if (!element.hasClass(CLASS_INDICATOR)) {
            return;
        }
        var value = element.getAttribute("data-value");
        this.value = parseFloat(value);
    };
    ProgressFull.prototype._handleKeydown = function (event) {
        var keyboardEvent = event;
        var keycode = keyboardEvent.which || keyboardEvent.keyCode;
        if (keycode === Inputs.KEY_ARROW_RIGHT) {
            this.value++;
            preventDefault(keyboardEvent);
            return;
        }
        if (keycode === Inputs.KEY_ARROW_LEFT) {
            this.value--;
            preventDefault(keyboardEvent);
            return;
        }
        if (keycode >= Inputs.KEY_NR_0 && keycode <= Inputs.KEY_NR_9) {
            this.value = keycode - Inputs.KEY_NR_0;
            preventDefault(keyboardEvent);
            return;
        }
    };
    Object.defineProperty(ProgressFull.prototype, "value", {
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
            var oldValue = this._value;
            this._value = clamp(val, this._minValue, this._total);
            this._update(oldValue, this._value, true);
            this.dispatchEvent("changed");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProgressFull.prototype, "total", {
        /**
         * Gets the total progress value.
         */
        get: function () {
            return this._total;
        },
        enumerable: false,
        configurable: true
    });
    return ProgressFull;
}(DomElement));
export function init() {
    searchAndInitialize(".progress-full", function (e) {
        new ProgressFull(e);
    });
}
export default ProgressFull;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL3Byb2dyZXNzL1Byb2dyZXNzRnVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBQzNCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3JFLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBQ25DLE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUV0QyxJQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQTtBQUMxQyxJQUFNLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQTtBQUN4RCxJQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFBO0FBRTlDLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTtBQUNuQyxJQUFNLHVCQUF1QixHQUFHLG9CQUFvQixDQUFBO0FBQ3BELElBQU0seUJBQXlCLEdBQUcsc0JBQXNCLENBQUE7QUFFeEQ7O0dBRUc7QUFDSDtJQUEyQixnQ0FBVTtJQVduQzs7O09BR0c7SUFDSCxzQkFBWSxPQUFnQjtRQUE1QixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1FBREMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sa0NBQVcsR0FBckI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQTtRQUU5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFFM0QsSUFBSSxD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QUFBRCxDQXpNQSxBQXlNQyxDQXpNMEIsVUFBVSxHQXlNcEM7QUFFRCxNQUFNLFVBQVUsSUFBSTtJQUNsQixtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLENBQUM7UUFDdEMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxZQUFZLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvcHJvZ3Jlc3MvUHJvZ3Jlc3NGdWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFuaW1lIGZyb20gXCJhbmltZWpzXCJcbmltcG9ydCB7IHNlYXJjaEFuZEluaXRpYWxpemUsIGNsYW1wLCBwcmV2ZW50RGVmYXVsdCB9IGZyb20gXCIuLi9VdGlsc1wiXG5pbXBvcnQgKiBhcyBJbnB1dHMgZnJvbSBcIi4uL0lucHV0c1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5cbmNvbnN0IENMQVNTX0hFQURFUiA9IFwiLnByb2dyZXNzLWZ1bGxfX2JhclwiXG5jb25zdCBDTEFTU19TRUNUSU9OUyA9IFwiLnByb2dyZXNzLWZ1bGxfX3NlY3Rpb25zID4gc3BhblwiXG5jb25zdCBDTEFTU19TRUNUSU9OX0FDVElWRSA9IFwic2VjdGlvbi0tYWN0aXZlXCJcblxuY29uc3QgQ0xBU1NfSU5ESUNBVE9SID0gXCJpbmRpY2F0b3JcIlxuY29uc3QgQ0xBU1NfSU5ESUNBVE9SX0NVUlJFTlQgPSBcImluZGljYXRvci0tY3VycmVudFwiXG5jb25zdCBDTEFTU19JTkRJQ0FUT1JfQ09NUExFVEVEID0gXCJpbmRpY2F0b3ItLWNvbXBsZXRlZFwiXG5cbi8qKlxuICogRnVsbCBwcm9ncmVzcyBiYXIgY29tcG9uZW50XG4gKi9cbmNsYXNzIFByb2dyZXNzRnVsbCBleHRlbmRzIERvbUVsZW1lbnQge1xuICBwcml2YXRlIF9idXR0b25DbGlja0hhbmRsZXIhOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfa2V5ZG93bkhhbmRsZXIhOiAoZTogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIF9oZWFkZXJFbGVtZW50ITogRG9tRWxlbWVudDxFbGVtZW50PlxuICBwcml2YXRlIF9wYWdlcyE6IE5vZGVMaXN0T2Y8RWxlbWVudD5cblxuICBwcml2YXRlIF9taW5WYWx1ZSE6IG51bWJlclxuICBwcml2YXRlIF92YWx1ZSE6IG51bWJlclxuICBwcml2YXRlIF90b3RhbCE6IG51bWJlclxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgUHJvZ3Jlc3NGdWxsIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHtEb21FbGVtZW50fSAtIFRoZSByb290IGVsZW1lbnQgb2YgdGhlIFByb2dyZXNzRnVsbCBjb21wb25lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbG9hZGVyIGJhciBjb21wb25lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fYnV0dG9uQ2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX2tleWRvd25IYW5kbGVyID0gdGhpcy5faGFuZGxlS2V5ZG93bi5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9oZWFkZXJFbGVtZW50ID0gdGhpcy5maW5kKENMQVNTX0hFQURFUikhXG5cbiAgICB0aGlzLl9wYWdlcyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKENMQVNTX1NFQ1RJT05TKVxuXG4gICAgdGhpcy5fbWluVmFsdWUgPSAxXG4gICAgdGhpcy5fdmFsdWUgPSAxXG4gICAgdGhpcy5fdG90YWwgPSB0aGlzLl9wYWdlcy5sZW5ndGhcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9wYWdlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLl9wYWdlc1tpbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX1NFQ1RJT05fQUNUSVZFKSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IGluZGV4ICsgMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2FkZEluY2ljYXRvcnMoKVxuICAgIHRoaXMuX3VwZGF0ZSgtMSwgdGhpcy5fdmFsdWUsIGZhbHNlKVxuXG4gICAgLy8gQXBwbHkgdGhlIHRhYiBpbmRleFxuICAgIGNvbnN0IHRhYkluZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKVxuICAgIGlmICh0YWJJbmRleCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIlwiKVxuICAgICAgdGhpcy5faGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJJbmRleClcbiAgICB9XG5cbiAgICB0aGlzLl9oZWFkZXJFbGVtZW50LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2J1dHRvbkNsaWNrSGFuZGxlcilcbiAgICB0aGlzLl9oZWFkZXJFbGVtZW50LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fa2V5ZG93bkhhbmRsZXIpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2FkZEluY2ljYXRvcnMoKSB7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgaW5kaWNhdG9yRWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgIC5hZGRDbGFzcyhDTEFTU19JTkRJQ0FUT1IpXG4gICAgICAgIC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGAke2kgKyAxfWApXG4gICAgICAgIC5zZXRIdG1sKChpICsgMSkudG9TdHJpbmcoKSlcblxuICAgICAgdGhpcy5faGVhZGVyRWxlbWVudC5wcmVwZW5kQ2hpbGQoaW5kaWNhdG9yRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZShvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyLCBhbmltYXRlID0gdHJ1ZSkge1xuICAgIGxldCBpbmRpY2F0b3JzID0gdGhpcy5faGVhZGVyRWxlbWVudC5lbGVtZW50LmNoaWxkTm9kZXNcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgbGV0IGluZGljYXRvckVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudChpbmRpY2F0b3JzW2luZGV4XSBhcyBFbGVtZW50KVxuXG4gICAgICBpZiAoaW5kZXggKyAxIDwgdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgaW5kaWNhdG9yRWxlbWVudFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhDTEFTU19JTkRJQ0FUT1JfQ1VSUkVOVClcbiAgICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfSU5ESUNBVE9SX0NPTVBMRVRFRClcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgaW5kaWNhdG9yRWxlbWVudFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhDTEFTU19JTkRJQ0FUT1JfQ09NUExFVEVEKVxuICAgICAgICAgIC5hZGRDbGFzcyhDTEFTU19JTkRJQ0FUT1JfQ1VSUkVOVClcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ICsgMSA+IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIGluZGljYXRvckVsZW1lbnRcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ0xBU1NfSU5ESUNBVE9SX0NPTVBMRVRFRClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ0xBU1NfSU5ESUNBVE9SX0NVUlJFTlQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgbGV0IGRpcmVjdGlvbiA9IE1hdGguc2lnbihvbGRWYWx1ZSAtIG5ld1ZhbHVlKVxuXG4gICAgICBpZiAob2xkVmFsdWUgPiAwICYmIG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBsZXQgb2xkU2VjdGlvbiA9IG5ldyBEb21FbGVtZW50KHRoaXMuX3BhZ2VzW29sZFZhbHVlIC0gMV0pXG5cbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICB0YXJnZXRzOiBvbGRTZWN0aW9uLmVsZW1lbnQsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgbGVmdDogMTAwICogZGlyZWN0aW9uLFxuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRRdWludFwiLFxuICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgb2xkU2VjdGlvbi5yZW1vdmVDbGFzcyhDTEFTU19TRUNUSU9OX0FDVElWRSlcbiAgICAgICAgICAgICAgb2xkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2xkU2VjdGlvbi5yZW1vdmVDbGFzcyhDTEFTU19TRUNUSU9OX0FDVElWRSlcbiAgICAgICAgICBvbGRTZWN0aW9uLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IG5ld1NlY3Rpb24gPSBuZXcgRG9tRWxlbWVudCh0aGlzLl9wYWdlc1tuZXdWYWx1ZSAtIDFdKVxuXG4gICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICBjb25zdCBlbCA9IG5ld1NlY3Rpb24uZWxlbWVudCBhcyBIVE1MRWxlbWVudFxuICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7LTEwMCAqIGRpcmVjdGlvbn1weGBcbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgICAgIG5ld1NlY3Rpb24uYWRkQ2xhc3MoQ0xBU1NfU0VDVElPTl9BQ1RJVkUpXG4gICAgICAgIGFuaW1lKHtcbiAgICAgICAgICB0YXJnZXRzOiBuZXdTZWN0aW9uLmVsZW1lbnQsXG4gICAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFF1aW50XCIsXG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIG5ld1NlY3Rpb24uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdTZWN0aW9uLmFkZENsYXNzKENMQVNTX1NFQ1RJT05fQUNUSVZFKVxuICAgICAgICBuZXdTZWN0aW9uLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVCdXR0b25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICBsZXQgZWxlbWVudCA9IG5ldyBEb21FbGVtZW50KGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KVxuICAgIGlmICghZWxlbWVudC5oYXNDbGFzcyhDTEFTU19JTkRJQ0FUT1IpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIilcbiAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSEpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3Qga2V5Ym9hcmRFdmVudCA9IGV2ZW50IGFzIEtleWJvYXJkRXZlbnRcbiAgICBsZXQga2V5Y29kZSA9IGtleWJvYXJkRXZlbnQud2hpY2ggfHwga2V5Ym9hcmRFdmVudC5rZXlDb2RlXG5cbiAgICBpZiAoa2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19SSUdIVCkge1xuICAgICAgdGhpcy52YWx1ZSsrXG5cbiAgICAgIHByZXZlbnREZWZhdWx0KGtleWJvYXJkRXZlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoa2V5Y29kZSA9PT0gSW5wdXRzLktFWV9BUlJPV19MRUZUKSB7XG4gICAgICB0aGlzLnZhbHVlLS1cblxuICAgICAgcHJldmVudERlZmF1bHQoa2V5Ym9hcmRFdmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChrZXljb2RlID49IElucHV0cy5LRVlfTlJfMCAmJiBrZXljb2RlIDw9IElucHV0cy5LRVlfTlJfOSkge1xuICAgICAgdGhpcy52YWx1ZSA9IGtleWNvZGUgLSBJbnB1dHMuS0VZX05SXzBcbiAgICAgIHByZXZlbnREZWZhdWx0KGtleWJvYXJkRXZlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBwcm9ncmVzcyB2YWx1ZSBpbiB0aGUgcmFuZ2Ugb2YgMS4udG90YWwuXG4gICAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBwcm9ncmVzcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IC0gVGhlIHByb2dyZXNzIGluIHRoZSByYW5nZSBvZiAxLi50b3RhbC5cbiAgICovXG4gIHNldCB2YWx1ZSh2YWw6IG51bWJlcikge1xuICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWVcblxuICAgIHRoaXMuX3ZhbHVlID0gY2xhbXAodmFsLCB0aGlzLl9taW5WYWx1ZSwgdGhpcy5fdG90YWwpXG4gICAgdGhpcy5fdXBkYXRlKG9sZFZhbHVlLCB0aGlzLl92YWx1ZSwgdHJ1ZSlcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcImNoYW5nZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0b3RhbCBwcm9ncmVzcyB2YWx1ZS5cbiAgICovXG4gIGdldCB0b3RhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZShcIi5wcm9ncmVzcy1mdWxsXCIsIChlKSA9PiB7XG4gICAgbmV3IFByb2dyZXNzRnVsbChlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0Z1bGxcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
