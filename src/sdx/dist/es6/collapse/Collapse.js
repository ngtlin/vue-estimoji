import { __extends, __values } from "tslib";
import { preventDefault } from "../Utils";
import anime from "animejs";
import DomElement from "../DomElement";
import { addClass, hasClass, removeClass, isHidden } from "../DomFunctions";
var CLASS_OPEN = "is-open";
var ANIMATION_OPEN = 300;
/**
 * The Collapse component.
 */
var Collapse = /** @class */ (function (_super) {
    __extends(Collapse, _super);
    /**
     * Creates and initializes the Collapse component.
     * @param {DomElement} - The root element of the Collapse component.
     */
    function Collapse(element) {
        var _this = _super.call(this, element) || this;
        _this._clickHandler = _this._handleClick.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the Collapse component.
     * @private
     */
    Collapse.prototype._initialize = function () {
        var dataTarget = this.element.getAttribute("data-target");
        if (dataTarget === null || dataTarget === "") {
            /* tslint:disable:no-console */
            console.error("A collapsible element requires a 'data-target' that specifies the element to collapse");
            console.info(this.element);
            /* tslint:enable:no-console */
            return;
        }
        var hiddenTarget = this.element.getAttribute("data-hidden");
        if (hiddenTarget !== null && hiddenTarget !== "") {
            this._hiddenIndicator = document.querySelector(hiddenTarget);
        }
        this._collapsibleElements = document.querySelectorAll(dataTarget);
        this.element.addEventListener("click", this._clickHandler);
    };
    Collapse.prototype._handleClick = function (event) {
        preventDefault(event);
        this.toggle();
    };
    /**
     * Toggles the collapseible.
     */
    Collapse.prototype.toggle = function () {
        var e_1, _a, e_2, _b;
        if (this._hiddenIndicator && isHidden(this._hiddenIndicator, false) === true) {
            return;
        }
        if (hasClass(this.element, CLASS_OPEN) === false) {
            addClass(this.element, CLASS_OPEN);
            try {
                for (var _c = __values(this._collapsibleElements), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var s = _d.value;
                    this._openCollapse(s);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            removeClass(this.element, CLASS_OPEN);
            try {
                for (var _e = __values(this._collapsibleElements), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var s = _f.value;
                    this._closeCollapse(s);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    Collapse.prototype._openCollapse = function (el) {
        anime.remove(el);
        el.style.display = "block";
        anime({
            targets: el,
            duration: ANIMATION_OPEN,
            height: el.scrollHeight + "px",
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                var domEl = new DomElement(el);
                domEl.addClass(CLASS_OPEN);
                domEl.setAttribute("style", "");
            }
        });
        // set aria expanded
        el.setAttribute("aria-expanded", "true");
    };
    Collapse.prototype._closeCollapse = function (el) {
        anime.remove(el);
        anime({
            targets: el,
            duration: ANIMATION_OPEN,
            height: 0,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            complete: function () {
                var domEl = new DomElement(el);
                domEl.removeClass(CLASS_OPEN);
                domEl.setAttribute("style", "");
            }
        });
        // set aria expanded
        el.setAttribute("aria-expanded", "false");
    };
    /**
     * Removes all event handlers and clears references.
     */
    Collapse.prototype.destroy = function () {
        this._collapsibleElements = null;
        if (this._clickHandler) {
            this.element.removeEventListener("click", this._clickHandler);
        }
        this.element = null;
    };
    return Collapse;
}(DomElement));
export function init() {
    var e_3, _a;
    var elements = document.querySelectorAll("[data-toggle='collapse']");
    try {
        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
            var e = elements_1_1.value;
            if (e.getAttribute("data-init") === "auto") {
                new Collapse(e);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
}
export default Collapse;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2NvbGxhcHNlL0NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3pDLE9BQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQTtBQUMzQixPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRTNFLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQTtBQUU1QixJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7QUFFMUI7O0dBRUc7QUFDSDtJQUF1Qiw0QkFBVTtJQUsvQjs7O09BR0c7SUFDSCxrQkFBWSxPQUFvQjtRQUFoQyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUlmO1FBRkMsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUNqRCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7O0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDTyw4QkFBVyxHQUFyQjtRQUNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3pELElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxFQUFFO1lBRTVDLCtCQUErQjtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLHVGQUF1RixDQUFDLENBQUE7WUFDdEcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDMUIsOEJBQThCO1lBRTlCLE9BQU07U0FDUDtRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzNELElBQUksWUFBWSxLQUFLLElBQUksSUFBSSxZ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QW9CO1FBQ3BCLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNJLDBCQUFPLEdBQWQ7UUFDRyxJQUFZLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFBO1FBRXpDLElBQUssSUFBWSxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDOUQ7UUFFQSxJQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtJQUM5QixDQUFDO0lBQ0gsZUFBQztBQUFELENBekhBLEFBeUhDLENBekhzQixVQUFVLEdBeUhoQztBQUVELE1BQU0sVUFBVSxJQUFJOztJQUNsQixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsQ0FBQTs7UUFDcEUsS0FBYyxJQUFBLGFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUEsd0RBQUU7WUFBbkIsSUFBSSxDQUFDLHFCQUFBO1lBQ1IsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDMUMsSUFBSSxRQUFRLENBQUMsQ0FBZ0IsQ0FBQyxDQUFBO2FBQy9CO1NBQ0Y7Ozs7Ozs7OztBQUNILENBQUM7QUFFRCxlQUFlLFFBQVEsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9jb2xsYXBzZS9Db2xsYXBzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByZXZlbnREZWZhdWx0IH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5pbXBvcnQgeyBhZGRDbGFzcywgaGFzQ2xhc3MsIHJlbW92ZUNsYXNzLCBpc0hpZGRlbiB9IGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuXG5jb25zdCBDTEFTU19PUEVOID0gXCJpcy1vcGVuXCJcblxuY29uc3QgQU5JTUFUSU9OX09QRU4gPSAzMDBcblxuLyoqXG4gKiBUaGUgQ29sbGFwc2UgY29tcG9uZW50LlxuICovXG5jbGFzcyBDb2xsYXBzZSBleHRlbmRzIERvbUVsZW1lbnQge1xuICBwcml2YXRlIF9oaWRkZW5JbmRpY2F0b3IhOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9jb2xsYXBzaWJsZUVsZW1lbnRzITogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5cbiAgcHJpdmF0ZSBfY2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIENvbGxhcHNlIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHtEb21FbGVtZW50fSAtIFRoZSByb290IGVsZW1lbnQgb2YgdGhlIENvbGxhcHNlIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcblxuICAgIHRoaXMuX2NsaWNrSGFuZGxlciA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgQ29sbGFwc2UgY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIGxldCBkYXRhVGFyZ2V0ID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFyZ2V0XCIpXG4gICAgaWYgKGRhdGFUYXJnZXQgPT09IG51bGwgfHwgZGF0YVRhcmdldCA9PT0gXCJcIikge1xuXG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlICovXG4gICAgICBjb25zb2xlLmVycm9yKFwiQSBjb2xsYXBzaWJsZSBlbGVtZW50IHJlcXVpcmVzIGEgJ2RhdGEtdGFyZ2V0JyB0aGF0IHNwZWNpZmllcyB0aGUgZWxlbWVudCB0byBjb2xsYXBzZVwiKVxuICAgICAgY29uc29sZS5pbmZvKHRoaXMuZWxlbWVudClcbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tY29uc29sZSAqL1xuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgaGlkZGVuVGFyZ2V0ID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaGlkZGVuXCIpXG4gICAgaWYgKGhpZGRlblRhcmdldCAhPT0gbnVsbCAmJiBoaWRkZW5UYXJnZXQgIT09IFwiXCIpIHtcbiAgICAgIHRoaXMuX2hpZGRlbkluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGlkZGVuVGFyZ2V0KSEgYXMgSFRNTEVsZW1lbnRcbiAgICB9XG5cbiAgICB0aGlzLl9jb2xsYXBzaWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhVGFyZ2V0KVxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fY2xpY2tIYW5kbGVyKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBwcmV2ZW50RGVmYXVsdChldmVudClcbiAgICB0aGlzLnRvZ2dsZSgpXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgY29sbGFwc2VpYmxlLlxuICAgKi9cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5faGlkZGVuSW5kaWNhdG9yICYmIGlzSGlkZGVuKHRoaXMuX2hpZGRlbkluZGljYXRvciwgZmFsc2UpID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaGFzQ2xhc3ModGhpcy5lbGVtZW50LCBDTEFTU19PUEVOKSA9PT0gZmFsc2UpIHtcbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgQ0xBU1NfT1BFTilcblxuICAgICAgZm9yIChsZXQgcyBvZiB0aGlzLl9jb2xsYXBzaWJsZUVsZW1lbnRzKSB7XG4gICAgICAgIHRoaXMuX29wZW5Db2xsYXBzZShzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX09QRU4pXG5cbiAgICAgIGZvciAobGV0IHMgb2YgdGhpcy5fY29sbGFwc2libGVFbGVtZW50cykge1xuICAgICAgICB0aGlzLl9jbG9zZUNvbGxhcHNlKHMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vcGVuQ29sbGFwc2UoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgYW5pbWUucmVtb3ZlKGVsKVxuXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuXG4gICAgYW5pbWUoe1xuICAgICAgdGFyZ2V0czogZWwsXG4gICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX09QRU4sXG4gICAgICBoZWlnaHQ6IGVsLnNjcm9sbEhlaWdodCArIFwicHhcIixcbiAgICAgIGVhc2luZzogXCJjdWJpY0JlemllcigwLjU1MCwgMC4wODUsIDAuMzIwLCAxKVwiLFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZG9tRWwgPSBuZXcgRG9tRWxlbWVudChlbClcbiAgICAgICAgZG9tRWwuYWRkQ2xhc3MoQ0xBU1NfT1BFTilcbiAgICAgICAgZG9tRWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIilcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gc2V0IGFyaWEgZXhwYW5kZWRcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jbG9zZUNvbGxhcHNlKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGFuaW1lLnJlbW92ZShlbClcblxuICAgIGFuaW1lKHtcbiAgICAgIHRhcmdldHM6IGVsLFxuICAgICAgZHVyYXRpb246IEFOSU1BVElPTl9PUEVOLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgZWFzaW5nOiBcImN1YmljQmV6aWVyKDAuNTUwLCAwLjA4NSwgMC4zMjAsIDEpXCIsXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBkb21FbCA9IG5ldyBEb21FbGVtZW50KGVsKVxuICAgICAgICBkb21FbC5yZW1vdmVDbGFzcyhDTEFTU19PUEVOKVxuICAgICAgICBkb21FbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBzZXQgYXJpYSBleHBhbmRlZFxuICAgIGVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGV2ZW50IGhhbmRsZXJzIGFuZCBjbGVhcnMgcmVmZXJlbmNlcy5cbiAgICovXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICh0aGlzIGFzIGFueSkuX2NvbGxhcHNpYmxlRWxlbWVudHMgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMgYXMgYW55KS5fY2xpY2tIYW5kbGVyKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2NsaWNrSGFuZGxlcilcbiAgICB9XG5cbiAgICAodGhpcyBhcyBhbnkpLmVsZW1lbnQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS10b2dnbGU9J2NvbGxhcHNlJ11cIilcbiAgZm9yIChsZXQgZSBvZiBlbGVtZW50cykge1xuICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtaW5pdFwiKSA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIG5ldyBDb2xsYXBzZShlIGFzIEhUTUxFbGVtZW50KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
