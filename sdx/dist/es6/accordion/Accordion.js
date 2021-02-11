import { __extends, __values } from "tslib";
import { searchAndInitialize } from "../Utils";
import anime from "animejs";
import DomElement from "../DomElement";
import * as Dom from "../DomFunctions";
var QUERY_TOGGLE = ".accordion__toggle";
var QUERY_OPEN_SECTION = ".accordion__item.is-open";
var QUERY_COLLAPSE = ".accordion__collapse";
var CLASS_ITEM = "accordion__item";
var CLASS_OPEN = "is-open";
var CLASS_KEEP_OPEN = "accordion__keep-open";
var REGEX_HIDDEN = /accordion--hidden-.*/;
var ANIMATION_OPEN = 300;
/**
 * The Accordion component
 */
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    /**
     * Creates and initializes the Accordion component.
     * @param {DomElement} - The root element of the Accordion component.
     */
    function Accordion(element) {
        var _this = _super.call(this, element) || this;
        _this._sectionClickHandler = _this._handleSectionClick.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the Accordion component.
     * @private
     */
    Accordion.prototype._initialize = function () {
        var e_1, _a;
        if (this.element.className.split(" ").some(function (c) { return REGEX_HIDDEN.test(c); })) {
            var indicator = new DomElement("input")
                .setAttribute("type", "hidden")
                .addClass("js-hidden");
            this.appendChild(indicator);
            this._hiddenIndicator = indicator.element;
        }
        try {
            for (var _b = __values(this.element.querySelectorAll(QUERY_TOGGLE)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toggle = _c.value;
                toggle.addEventListener("click", this._sectionClickHandler);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Accordion.prototype._handleSectionClick = function (event) {
        if (this._hiddenIndicator) {
            var style = window.getComputedStyle(this._hiddenIndicator);
            if (style.visibility !== "visible") {
                return;
            }
        }
        var navSection = event.target.parentElement;
        while (!Dom.hasClass(navSection, CLASS_ITEM) && navSection.parentElement) {
            navSection = navSection.parentElement;
        }
        var prevSection = this.element.querySelector(QUERY_OPEN_SECTION);
        if (prevSection && prevSection !== navSection) {
            if (!Dom.hasClass(this.element, CLASS_KEEP_OPEN)) {
                this._toggleSection(prevSection);
            }
        }
        this._toggleSection(navSection);
    };
    Accordion.prototype._toggleSection = function (accSection) {
        var collapseElement = accSection.querySelector(QUERY_COLLAPSE);
        if (Dom.hasClass(accSection, CLASS_OPEN)) {
            Dom.removeClass(accSection, CLASS_OPEN);
            this._closeCollapseSection(collapseElement);
        }
        else {
            Dom.addClass(accSection, CLASS_OPEN);
            if (collapseElement) { // to ignore the case when there is no collapsible element (see sdx doku navigation, "all the basics") in a list of accordion
                this._openCollapseSection(collapseElement);
            }
        }
    };
    Accordion.prototype._openCollapseSection = function (el) {
        el.style.display = "block";
        anime({
            targets: el,
            duration: ANIMATION_OPEN,
            height: el.scrollHeight,
            opacity: 1,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                el.setAttribute("aria-expanded", "true");
                el.classList.add(CLASS_OPEN);
                el.style.height = "auto"; // allow to grow or shrink with content
            }
        });
    };
    Accordion.prototype._closeCollapseSection = function (el) {
        // Can't animate "auto", therefore update to current height
        el.style.height = el.scrollHeight + "px";
        anime({
            targets: el,
            duration: ANIMATION_OPEN,
            height: 0,
            opacity: 0,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                el.setAttribute("aria-expanded", "false");
                el.style.removeProperty("display"); // removes extra padding in Footer after opening and closing
                el.style.removeProperty("height"); // SDX-691 Missing items in Footer after resizing
                el.style.removeProperty("opacity"); // SDX-691 Missing items in Footer after resizing
                el.classList.remove(CLASS_OPEN);
            }
        });
    };
    /**
     * Removes all event handlers and clears references.
     */
    Accordion.prototype.destroy = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.element.querySelectorAll(QUERY_TOGGLE)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toggle = _c.value;
                toggle.removeEventListener("click", this._sectionClickHandler);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._sectionClickHandler = null;
        this.element = null;
    };
    return Accordion;
}(DomElement));
export function init() {
    searchAndInitialize(".accordion", function (e) {
        new Accordion(e);
    });
}
export default Accordion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2FjY29yZGlvbi9BY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUM5QyxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUE7QUFDM0IsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sS0FBSyxHQUFHLE1BQU0saUJBQWlCLENBQUE7QUFFdEMsSUFBTSxZQUFZLEdBQUcsb0JBQW9CLENBQUE7QUFDekMsSUFBTSxrQkFBa0IsR0FBRywwQkFBMEIsQ0FBQTtBQUNyRCxJQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQTtBQUU3QyxJQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQTtBQUNwQyxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUE7QUFDNUIsSUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUE7QUFFOUMsSUFBTSxZQUFZLEdBQUcsc0JBQXNCLENBQUE7QUFFM0MsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBO0FBRTFCOztHQUVHO0FBQ0g7SUFBd0IsNkJBQVU7SUFJaEM7OztPQUdHO0lBQ0gsbUJBQVksT0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FJZjtRQUZDLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFBO1FBQy9ELEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTs7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNPLCtCQUFXLEdBQXJCOztRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUMsRUFBRTtZQUN2RSxJQUFJLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBbUIsT0FBTyxDQUFDO2lCQUN0RCxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztpQkFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBRXhCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUE7U0FDMUM7O1lBRUQsS0FBbUIsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBM0QsSUFBSSxNQUFNLFdBQUE7Z0JBQ2IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTthQUM1RDs7Ozs7Ozs7O0lBQ0gsQ0FBQztJQUVTLHVDQUFtQixHQUE3QixVQUE4QixLQUFZO1FBQ3hDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUUxRCxJQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFNO2FBQ1A7U0FDRjtRQUVELElBQUksVUFBVSxHQUFJLEtBQUssQ0FBQyxNQUFzQixDQUFDLGFBQWMsQ0FBQTtRQUU3RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUN4RSxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQTtTQUN0QztRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFFaEUsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxFQUFDO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2FBQ2pDO1NBQ0Y7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFUyxrQ0FBYyxHQUF4QixVQUF5QixVQUFtQjtRQUMxQyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBaUIsQ0FBQTtRQUU5RSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ3hDLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUM1QzthQUFNO1lBQ0wsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDcEMsSUFBSSxlQUFlLEVBQUUsRUFBRSw2SEFBNkg7Z0JBQ2xKLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQTthQUMzQztTQUNGO0lBQ0gsQ0FBQztJQUVTLHdDQUFvQixHQUE5QixVQUErQixFQUFlO1FBQzVDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUUxQixLQUFLLENBQUM7WUFDSixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLE1BQU0sRUFBRSxFQUFFLENBQUMsWUFBWTtZQUN2QixPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU0sRUFBRSxxQ0FBcUM7WUFDN0MsUUFBUSxFQUFFO2dCQUNSLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUN4QyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBLENBQUMsdUNBQXVDO1lBQ2xFLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRVMseUNBQXFCLEdBQS9CLFVBQWdDLEVBQWU7UUFDN0MsMkRBQTJEO1FBQzNELEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFNLEVBQUUsQ0FBQyxZQUFZLE9BQUksQ0FBQTtRQUV4QyxLQUFLLENBQUM7WUFDSixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUscUNBQXFDO1lBQzdDLFFBQVEsRUFBRTtnQkFDUixFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDekMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyw0REFBNEQ7Z0JBQy9GLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsaURBQWlEO2dCQUNuRixFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLGlEQUFpRDtnQkFDcEYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakMsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLDJCQUFPLEdBQWQ7OztZQUNFLEtBQW1CLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTNELElBQUksTUFBTSxXQUFBO2dCQUNiLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7YUFDL0Q7Ozs7Ozs7OztRQUVBLElBQVksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7SUFDOUIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0ExSEEsQUEwSEMsQ0ExSHVCLFVBQVUsR0EwSGpDO0FBRUQsTUFBTSxVQUFVLElBQUk7SUFDbEIsbUJBQW1CLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztRQUNsQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxlQUFlLFNBQVMsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9hY2NvcmRpb24vQWNjb3JkaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VhcmNoQW5kSW5pdGlhbGl6ZSB9IGZyb20gXCIuLi9VdGlsc1wiXG5pbXBvcnQgYW5pbWUgZnJvbSBcImFuaW1lanNcIlxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0ICogYXMgRG9tIGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuXG5jb25zdCBRVUVSWV9UT0dHTEUgPSBcIi5hY2NvcmRpb25fX3RvZ2dsZVwiXG5jb25zdCBRVUVSWV9PUEVOX1NFQ1RJT04gPSBcIi5hY2NvcmRpb25fX2l0ZW0uaXMtb3BlblwiXG5jb25zdCBRVUVSWV9DT0xMQVBTRSA9IFwiLmFjY29yZGlvbl9fY29sbGFwc2VcIlxuXG5jb25zdCBDTEFTU19JVEVNID0gXCJhY2NvcmRpb25fX2l0ZW1cIlxuY29uc3QgQ0xBU1NfT1BFTiA9IFwiaXMtb3BlblwiXG5jb25zdCBDTEFTU19LRUVQX09QRU4gPSBcImFjY29yZGlvbl9fa2VlcC1vcGVuXCJcblxuY29uc3QgUkVHRVhfSElEREVOID0gL2FjY29yZGlvbi0taGlkZGVuLS4qL1xuXG5jb25zdCBBTklNQVRJT05fT1BFTiA9IDMwMFxuXG4vKipcbiAqIFRoZSBBY2NvcmRpb24gY29tcG9uZW50XG4gKi9cbmNsYXNzIEFjY29yZGlvbiBleHRlbmRzIERvbUVsZW1lbnQge1xuICBwcml2YXRlIF9zZWN0aW9uQ2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfaGlkZGVuSW5kaWNhdG9yITogSFRNTElucHV0RWxlbWVudFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgQWNjb3JkaW9uIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHtEb21FbGVtZW50fSAtIFRoZSByb290IGVsZW1lbnQgb2YgdGhlIEFjY29yZGlvbiBjb21wb25lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcblxuICAgIHRoaXMuX3NlY3Rpb25DbGlja0hhbmRsZXIgPSB0aGlzLl9oYW5kbGVTZWN0aW9uQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBBY2NvcmRpb24gY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKS5zb21lKChjKSA9PiBSRUdFWF9ISURERU4udGVzdChjKSkpIHtcbiAgICAgIGxldCBpbmRpY2F0b3IgPSBuZXcgRG9tRWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0XCIpXG4gICAgICAgIC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiaGlkZGVuXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImpzLWhpZGRlblwiKVxuXG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGluZGljYXRvcilcbiAgICAgIHRoaXMuX2hpZGRlbkluZGljYXRvciA9IGluZGljYXRvci5lbGVtZW50XG4gICAgfVxuXG4gICAgZm9yIChsZXQgdG9nZ2xlIG9mIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFFVRVJZX1RPR0dMRSkpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fc2VjdGlvbkNsaWNrSGFuZGxlcilcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZVNlY3Rpb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faGlkZGVuSW5kaWNhdG9yKSB7XG4gICAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9oaWRkZW5JbmRpY2F0b3IpXG5cbiAgICAgIGlmIChzdHlsZS52aXNpYmlsaXR5ICE9PSBcInZpc2libGVcIikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmF2U2VjdGlvbiA9IChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQhXG5cbiAgICB3aGlsZSAoIURvbS5oYXNDbGFzcyhuYXZTZWN0aW9uLCBDTEFTU19JVEVNKSAmJiBuYXZTZWN0aW9uLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIG5hdlNlY3Rpb24gPSBuYXZTZWN0aW9uLnBhcmVudEVsZW1lbnRcbiAgICB9XG5cbiAgICBsZXQgcHJldlNlY3Rpb24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9PUEVOX1NFQ1RJT04pXG5cbiAgICBpZiAocHJldlNlY3Rpb24gJiYgcHJldlNlY3Rpb24gIT09IG5hdlNlY3Rpb24pIHtcbiAgICAgIGlmICghRG9tLmhhc0NsYXNzKHRoaXMuZWxlbWVudCwgQ0xBU1NfS0VFUF9PUEVOKSl7XG4gICAgICAgIHRoaXMuX3RvZ2dsZVNlY3Rpb24ocHJldlNlY3Rpb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fdG9nZ2xlU2VjdGlvbihuYXZTZWN0aW9uKVxuICB9XG5cbiAgcHJvdGVjdGVkIF90b2dnbGVTZWN0aW9uKGFjY1NlY3Rpb246IEVsZW1lbnQpIHtcbiAgICBsZXQgY29sbGFwc2VFbGVtZW50ID0gYWNjU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFFVRVJZX0NPTExBUFNFKSEgYXMgSFRNTEVsZW1lbnRcblxuICAgIGlmIChEb20uaGFzQ2xhc3MoYWNjU2VjdGlvbiwgQ0xBU1NfT1BFTikpIHtcbiAgICAgIERvbS5yZW1vdmVDbGFzcyhhY2NTZWN0aW9uLCBDTEFTU19PUEVOKVxuICAgICAgdGhpcy5fY2xvc2VDb2xsYXBzZVNlY3Rpb24oY29sbGFwc2VFbGVtZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICBEb20uYWRkQ2xhc3MoYWNjU2VjdGlvbiwgQ0xBU1NfT1BFTilcbiAgICAgIGlmIChjb2xsYXBzZUVsZW1lbnQpIHsgLy8gdG8gaWdub3JlIHRoZSBjYXNlIHdoZW4gdGhlcmUgaXMgbm8gY29sbGFwc2libGUgZWxlbWVudCAoc2VlIHNkeCBkb2t1IG5hdmlnYXRpb24sIFwiYWxsIHRoZSBiYXNpY3NcIikgaW4gYSBsaXN0IG9mIGFjY29yZGlvblxuICAgICAgICB0aGlzLl9vcGVuQ29sbGFwc2VTZWN0aW9uKGNvbGxhcHNlRWxlbWVudClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX29wZW5Db2xsYXBzZVNlY3Rpb24oZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuXG4gICAgYW5pbWUoe1xuICAgICAgdGFyZ2V0czogZWwsXG4gICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX09QRU4sXG4gICAgICBoZWlnaHQ6IGVsLnNjcm9sbEhlaWdodCxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBlYXNpbmc6IFwiY3ViaWNCZXppZXIoMC41NTAsIDAuMDg1LCAwLjMyMCwgMSlcIixcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoQ0xBU1NfT1BFTilcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCIgLy8gYWxsb3cgdG8gZ3JvdyBvciBzaHJpbmsgd2l0aCBjb250ZW50XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2xvc2VDb2xsYXBzZVNlY3Rpb24oZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gQ2FuJ3QgYW5pbWF0ZSBcImF1dG9cIiwgdGhlcmVmb3JlIHVwZGF0ZSB0byBjdXJyZW50IGhlaWdodFxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2VsLnNjcm9sbEhlaWdodH1weGBcblxuICAgIGFuaW1lKHtcbiAgICAgIHRhcmdldHM6IGVsLFxuICAgICAgZHVyYXRpb246IEFOSU1BVElPTl9PUEVOLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGVhc2luZzogXCJjdWJpY0JlemllcigwLjU1MCwgMC4wODUsIDAuMzIwLCAxKVwiLFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpXG4gICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKSAvLyByZW1vdmVzIGV4dHJhIHBhZGRpbmcgaW4gRm9vdGVyIGFmdGVyIG9wZW5pbmcgYW5kIGNsb3NpbmdcbiAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJoZWlnaHRcIikgLy8gU0RYLTY5MSBNaXNzaW5nIGl0ZW1zIGluIEZvb3RlciBhZnRlciByZXNpemluZ1xuICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIikgLy8gU0RYLTY5MSBNaXNzaW5nIGl0ZW1zIGluIEZvb3RlciBhZnRlciByZXNpemluZ1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX09QRU4pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBldmVudCBoYW5kbGVycyBhbmQgY2xlYXJzIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCB0b2dnbGUgb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfVE9HR0xFKSkge1xuICAgICAgdG9nZ2xlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9zZWN0aW9uQ2xpY2tIYW5kbGVyKVxuICAgIH1cblxuICAgICh0aGlzIGFzIGFueSkuX3NlY3Rpb25DbGlja0hhbmRsZXIgPSBudWxsO1xuICAgICh0aGlzIGFzIGFueSkuZWxlbWVudCA9IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZShcIi5hY2NvcmRpb25cIiwgKGUpID0+IHtcbiAgICBuZXcgQWNjb3JkaW9uKGUpXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY29yZGlvblxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
