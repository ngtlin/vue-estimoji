import { __extends, __values } from "tslib";
import anime from "animejs";
import Popper from "popper.js";
import DomElement from "../DomElement";
import { addClass, hasClass, removeClass, isHidden, parentWithClass } from "../DomFunctions";
var CLASS_OPEN = "is-open";
var CLASS_MENU = "js-flyout";
var CLASS_TABS = "tabs";
var ANIMATION_OPEN = 300;
/**
 * A component for the flyout menu.
 */
var MenuFlyout = /** @class */ (function (_super) {
    __extends(MenuFlyout, _super);
    /**
     * Creates and initializes the flyout component.
     * @param element - The root element of the flyout menu component.
     */
    function MenuFlyout(element) {
        var _this = _super.call(this, element) || this;
        _this._animationDuration = ANIMATION_OPEN;
        _this._dynamicPlacement = false;
        _this._clickHandler = _this._handleClick.bind(_this);
        _this._windowClickHandler = _this._handleWindowClick.bind(_this);
        _this._initialize();
        return _this;
    }
    /**
     * Initializes the flyout component.
     * @private
     */
    MenuFlyout.prototype._initialize = function () {
        var dataTarget = this.element.getAttribute("data-target");
        if (dataTarget === null || dataTarget === "") {
            /* tslint:disable:no-console */
            console.error("A flyout menu element requires a 'data-target' that specifies the element to collapse");
            console.info(this.element);
            /* tslint:enable:no-console */
            return;
        }
        if (this._useDynamicPlacement()) {
            this._dynamicPlacement = true;
        }
        var hiddenTarget = this.element.getAttribute("data-hidden");
        if (hiddenTarget !== null && hiddenTarget !== "") {
            this._hiddenIndicator = document.querySelector(hiddenTarget) || undefined;
        }
        this._initFlyoutElement(dataTarget);
        this.element.addEventListener("click", this._clickHandler);
    };
    MenuFlyout.prototype._initFlyoutElement = function (dataTarget) {
        this._flyoutElement = document.querySelector(dataTarget);
        this._flyoutElement.style.opacity = "0";
        this._flyoutElement.style.transform = "translateY(-20px)";
    };
    MenuFlyout.prototype._handleClick = function () {
        this.toggle();
    };
    MenuFlyout.prototype._handleWindowClick = function (event) {
        var target = event.target;
        if (parentWithClass(target, CLASS_MENU) === this._flyoutElement) {
            return false;
        }
        while (target !== this.element && target.parentElement) {
            target = target.parentElement;
        }
        if (target !== this.element) {
            this.close();
            return false;
        }
        return true;
    };
    MenuFlyout.prototype._useDynamicPlacement = function () {
        return parentWithClass(this.element, CLASS_TABS);
    };
    MenuFlyout.prototype._openMenu = function (el) {
        anime.remove(el);
        if (this._dynamicPlacement === true) {
            var popperOptions = {
                placement: "bottom",
                modifiers: {
                    flip: {
                        enabled: false
                    }
                },
                eventsEnabled: false
            };
            this._popperInstance = new Popper(this.element, this._flyoutElement, popperOptions);
        }
        anime({
            targets: el,
            duration: this._animationDuration,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            opacity: 1,
            translateY: "0px",
            begin: function () {
                el.style.display = "block";
            },
            complete: function () {
                addClass(el, CLASS_OPEN);
            }
        });
        // set aria expanded
        el.setAttribute("aria-expanded", "true");
        this.dispatchEvent("opened");
    };
    MenuFlyout.prototype._closeMenu = function (el) {
        anime.remove(el);
        if (this._popperInstance) {
            this._popperInstance.destroy();
            this._popperInstance = undefined;
        }
        anime({
            targets: el,
            duration: this._animationDuration,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            opacity: 0,
            translateY: "-20px",
            complete: function () {
                el.style.display = "none";
                removeClass(el, CLASS_OPEN);
            }
        });
        // set aria expanded
        el.setAttribute("aria-expanded", "false");
        this.dispatchEvent("closed");
    };
    Object.defineProperty(MenuFlyout.prototype, "animationDuration", {
        /**
         * Sets the opening animation duration.
         * @param {durationInSeconds} - The animation duration in seconds.
         */
        set: function (durationInSeconds) {
            this._animationDuration = durationInSeconds;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Opens the flyout menu.
     * @fires Modal#opened
     */
    MenuFlyout.prototype.open = function () {
        var _this = this;
        if (this._hiddenIndicator && isHidden(this._hiddenIndicator, false) === true) {
            return;
        }
        if (hasClass(this.element, CLASS_OPEN) === true) {
            return;
        }
        addClass(this.element, CLASS_OPEN);
        this._openMenu(this._flyoutElement);
        setTimeout(function () {
            window.addEventListener("click", _this._windowClickHandler);
            window.addEventListener("touchend", _this._windowClickHandler);
        }, 50);
    };
    /**
     * Closes the flyout menu.
     * @fires Modal#closed
     */
    MenuFlyout.prototype.close = function () {
        if (this._hiddenIndicator && isHidden(this._hiddenIndicator, false) === true) {
            return;
        }
        if (hasClass(this.element, CLASS_OPEN) === false) {
            return;
        }
        removeClass(this.element, CLASS_OPEN);
        window.removeEventListener("click", this._windowClickHandler);
        window.removeEventListener("touchend", this._windowClickHandler);
        this._closeMenu(this._flyoutElement);
    };
    /**
     * Toggles the flyout menu.
     * @fires Modal#opened
     * @fires Modal#closed
     */
    MenuFlyout.prototype.toggle = function () {
        if (hasClass(this.element, CLASS_OPEN) === false) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * Removes all event handlers and clears references.
     */
    MenuFlyout.prototype.destroy = function () {
        this._flyoutElement = null;
        window.removeEventListener("click", this._windowClickHandler);
        window.removeEventListener("touchend", this._windowClickHandler);
        if (this._clickHandler) {
            this.element.removeEventListener("click", this._clickHandler);
        }
        if (this._popperInstance) {
            this._popperInstance.destroy();
            this._popperInstance = undefined;
        }
        this._clickHandler = null;
        this._windowClickHandler = null;
        this.element = null;
    };
    return MenuFlyout;
}(DomElement));
export function init() {
    var e_1, _a;
    var elements = document.querySelectorAll("[data-toggle='flyout']");
    try {
        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
            var e = elements_1_1.value;
            if (e.getAttribute("data-init") === "auto") {
                new MenuFlyout(e);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
export default MenuFlyout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL21lbnUvTWVudUZseW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBQzNCLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQTtBQUU5QixPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUU1RixJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUE7QUFDNUIsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFBO0FBQzlCLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQTtBQUV6QixJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7QUFFMUI7O0dBRUc7QUFDSDtJQUF5Qiw4QkFBVTtJQWFqQzs7O09BR0c7SUFDSCxvQkFBWSxPQUFnQjtRQUE1QixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQU1mO1FBcEJPLHdCQUFrQixHQUFHLGNBQWMsQ0FBQTtRQUVuQyx1QkFBaUIsR0FBRyxLQUFLLENBQUE7UUFjL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUNqRCxLQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQTtRQUU3RCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7O0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxnQ0FBVyxHQUFyQjtRQUNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3pELElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxFQUFFO1lBRTVDLCtCQUErQjtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLHVG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QUFBLFNBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO1lBQW5CLElBQUksQ0FBQyxxQkFBQTtZQUNSLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQzFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2xCO1NBQ0Y7Ozs7Ozs7OztBQUNILENBQUM7QUFFRCxlQUFlLFVBQVUsQ0FBQSIsImZpbGUiOiJtYWluL3NyYy9tZW51L01lbnVGbHlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5pbWUgZnJvbSBcImFuaW1lanNcIlxuaW1wb3J0IFBvcHBlciBmcm9tIFwicG9wcGVyLmpzXCJcblxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0IHsgYWRkQ2xhc3MsIGhhc0NsYXNzLCByZW1vdmVDbGFzcywgaXNIaWRkZW4sIHBhcmVudFdpdGhDbGFzcyB9IGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuXG5jb25zdCBDTEFTU19PUEVOID0gXCJpcy1vcGVuXCJcbmNvbnN0IENMQVNTX01FTlUgPSBcImpzLWZseW91dFwiXG5jb25zdCBDTEFTU19UQUJTID0gXCJ0YWJzXCJcblxuY29uc3QgQU5JTUFUSU9OX09QRU4gPSAzMDBcblxuLyoqXG4gKiBBIGNvbXBvbmVudCBmb3IgdGhlIGZseW91dCBtZW51LlxuICovXG5jbGFzcyBNZW51Rmx5b3V0IGV4dGVuZHMgRG9tRWxlbWVudCB7XG4gIHByaXZhdGUgX2NsaWNrSGFuZGxlcjogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX3dpbmRvd0NsaWNrSGFuZGxlcjogKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB2b2lkXG5cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uRHVyYXRpb24gPSBBTklNQVRJT05fT1BFTlxuXG4gIHByaXZhdGUgX2R5bmFtaWNQbGFjZW1lbnQgPSBmYWxzZVxuXG4gIHByaXZhdGUgX2hpZGRlbkluZGljYXRvcj86IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgX2ZseW91dEVsZW1lbnQhOiBIVE1MRWxlbWVudFxuXG4gIHByaXZhdGUgX3BvcHBlckluc3RhbmNlPzogUG9wcGVyXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBmbHlvdXQgY29tcG9uZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgb2YgdGhlIGZseW91dCBtZW51IGNvbXBvbmVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgdGhpcy5fY2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlciA9IHRoaXMuX2hhbmRsZVdpbmRvd0NsaWNrLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRpYWxpemUoKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBmbHlvdXQgY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIGxldCBkYXRhVGFyZ2V0ID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFyZ2V0XCIpXG4gICAgaWYgKGRhdGFUYXJnZXQgPT09IG51bGwgfHwgZGF0YVRhcmdldCA9PT0gXCJcIikge1xuXG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlICovXG4gICAgICBjb25zb2xlLmVycm9yKFwiQSBmbHlvdXQgbWVudSBlbGVtZW50IHJlcXVpcmVzIGEgJ2RhdGEtdGFyZ2V0JyB0aGF0IHNwZWNpZmllcyB0aGUgZWxlbWVudCB0byBjb2xsYXBzZVwiKVxuICAgICAgY29uc29sZS5pbmZvKHRoaXMuZWxlbWVudClcbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tY29uc29sZSAqL1xuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdXNlRHluYW1pY1BsYWNlbWVudCgpKSB7XG4gICAgICB0aGlzLl9keW5hbWljUGxhY2VtZW50ID0gdHJ1ZVxuICAgIH1cblxuICAgIGxldCBoaWRkZW5UYXJnZXQgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1oaWRkZW5cIilcbiAgICBpZiAoaGlkZGVuVGFyZ2V0ICE9PSBudWxsICYmIGhpZGRlblRhcmdldCAhPT0gXCJcIikge1xuICAgICAgdGhpcy5faGlkZGVuSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoaWRkZW5UYXJnZXQpIGFzIEhUTUxFbGVtZW50IHx8IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMuX2luaXRGbHlvdXRFbGVtZW50KGRhdGFUYXJnZXQpXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9jbGlja0hhbmRsZXIpXG4gIH1cblxuICBwcml2YXRlIF9pbml0Rmx5b3V0RWxlbWVudChkYXRhVGFyZ2V0OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mbHlvdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhVGFyZ2V0KSEgYXMgSFRNTEVsZW1lbnRcbiAgICB0aGlzLl9mbHlvdXRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIlxuICAgIHRoaXMuX2ZseW91dEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKC0yMHB4KVwiXG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlV2luZG93Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudFxuXG4gICAgaWYgKHBhcmVudFdpdGhDbGFzcyh0YXJnZXQsIENMQVNTX01FTlUpID09PSB0aGlzLl9mbHlvdXRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB3aGlsZSAodGFyZ2V0ICE9PSB0aGlzLmVsZW1lbnQgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCAhPT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmNsb3NlKClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBwcm90ZWN0ZWQgX3VzZUR5bmFtaWNQbGFjZW1lbnQoKSB7XG4gICAgcmV0dXJuIHBhcmVudFdpdGhDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX1RBQlMpXG4gIH1cblxuICBwcm90ZWN0ZWQgX29wZW5NZW51KGVsOiBIVE1MRWxlbWVudCkge1xuICAgIGFuaW1lLnJlbW92ZShlbClcblxuICAgIGlmICh0aGlzLl9keW5hbWljUGxhY2VtZW50ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBwb3BwZXJPcHRpb25zOiBQb3BwZXIuUG9wcGVyT3B0aW9ucyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiBcImJvdHRvbVwiLFxuICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXZlbnRzRW5hYmxlZDogZmFsc2VcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMuZWxlbWVudCwgdGhpcy5fZmx5b3V0RWxlbWVudCwgcG9wcGVyT3B0aW9ucylcbiAgICB9XG5cbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiBlbCxcbiAgICAgIGR1cmF0aW9uOiB0aGlzLl9hbmltYXRpb25EdXJhdGlvbixcbiAgICAgIGVhc2luZzogXCJjdWJpY0JlemllcigwLjU1MCwgMC4wODUsIDAuMzIwLCAxKVwiLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zbGF0ZVk6IFwiMHB4XCIsXG4gICAgICBiZWdpbjogKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgYWRkQ2xhc3MoZWwsIENMQVNTX09QRU4pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIHNldCBhcmlhIGV4cGFuZGVkXG4gICAgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIilcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcIm9wZW5lZFwiKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jbG9zZU1lbnUoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgYW5pbWUucmVtb3ZlKGVsKVxuXG4gICAgaWYgKHRoaXMuX3BvcHBlckluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5kZXN0cm95KClcbiAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgYW5pbWUoe1xuICAgICAgdGFyZ2V0czogZWwsXG4gICAgICBkdXJhdGlvbjogdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBlYXNpbmc6IFwiY3ViaWNCZXppZXIoMC41NTAsIDAuMDg1LCAwLjMyMCwgMSlcIixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2xhdGVZOiBcIi0yMHB4XCIsXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsIENMQVNTX09QRU4pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIHNldCBhcmlhIGV4cGFuZGVkXG4gICAgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpXG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJjbG9zZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBvcGVuaW5nIGFuaW1hdGlvbiBkdXJhdGlvbi5cbiAgICogQHBhcmFtIHtkdXJhdGlvbkluU2Vjb25kc30gLSBUaGUgYW5pbWF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHMuXG4gICAqL1xuICBzZXQgYW5pbWF0aW9uRHVyYXRpb24oZHVyYXRpb25JblNlY29uZHM6IG51bWJlcikge1xuICAgIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uID0gZHVyYXRpb25JblNlY29uZHNcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZmx5b3V0IG1lbnUuXG4gICAqIEBmaXJlcyBNb2RhbCNvcGVuZWRcbiAgICovXG4gIHB1YmxpYyBvcGVuKCkge1xuICAgIGlmICh0aGlzLl9oaWRkZW5JbmRpY2F0b3IgJiYgaXNIaWRkZW4odGhpcy5faGlkZGVuSW5kaWNhdG9yLCBmYWxzZSkgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChoYXNDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX09QRU4pID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX09QRU4pXG4gICAgdGhpcy5fb3Blbk1lbnUodGhpcy5fZmx5b3V0RWxlbWVudClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl93aW5kb3dDbGlja0hhbmRsZXIpXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcbiAgICB9LCA1MClcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGZseW91dCBtZW51LlxuICAgKiBAZmlyZXMgTW9kYWwjY2xvc2VkXG4gICAqL1xuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuX2hpZGRlbkluZGljYXRvciAmJiBpc0hpZGRlbih0aGlzLl9oaWRkZW5JbmRpY2F0b3IsIGZhbHNlKSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGhhc0NsYXNzKHRoaXMuZWxlbWVudCwgQ0xBU1NfT1BFTikgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX09QRU4pXG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcblxuICAgIHRoaXMuX2Nsb3NlTWVudSh0aGlzLl9mbHlvdXRFbGVtZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGZseW91dCBtZW51LlxuICAgKiBAZmlyZXMgTW9kYWwjb3BlbmVkXG4gICAqIEBmaXJlcyBNb2RhbCNjbG9zZWRcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgaWYgKGhhc0NsYXNzKHRoaXMuZWxlbWVudCwgQ0xBU1NfT1BFTikgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLm9wZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgZXZlbnQgaGFuZGxlcnMgYW5kIGNsZWFycyByZWZlcmVuY2VzLlxuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgKHRoaXMgYXMgYW55KS5fZmx5b3V0RWxlbWVudCA9IG51bGxcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fd2luZG93Q2xpY2tIYW5kbGVyKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fd2luZG93Q2xpY2tIYW5kbGVyKVxuXG4gICAgaWYgKHRoaXMuX2NsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9jbGlja0hhbmRsZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BvcHBlckluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5kZXN0cm95KClcbiAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgKHRoaXMgYXMgYW55KS5fY2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICAodGhpcyBhcyBhbnkpLl93aW5kb3dDbGlja0hhbmRsZXIgPSBudWxsO1xuICAgICh0aGlzIGFzIGFueSkuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlZCB3aGVuIHRoZSBmbHlvdXQgbWVudSBpcyBvcGVuZWQgYnkgdGhlIGFuY2hvciBsaW5rIG9yIHVzaW5nIHRoZVxuICAgKiB7QGxpbmsgTWVudUZseW91dCNvcGVufSBtZXRob2QuXG4gICAqIEBldmVudCBNZW51Rmx5b3V0I29wZW5lZFxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKi9cblxuICAvKipcbiAgICogRmlyZWQgd2hlbiB0aGUgZmx5b3V0IG1lbnUgaXMgY2xvc2VkIGJ5IHRoZSB1c2VyIG9yIHVzaW5nIHRoZVxuICAgKiB7QGxpbmsgTWVudUZseW91dCNjbG9zZX0gbWV0aG9kLlxuICAgKiBAZXZlbnQgTWVudUZseW91dCNjbG9zZWRcbiAgICogQHR5cGUge29iamVjdH1cbiAgICovXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdG9nZ2xlPSdmbHlvdXQnXVwiKVxuICBmb3IgKGxldCBlIG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbml0XCIpID09PSBcImF1dG9cIikge1xuICAgICAgbmV3IE1lbnVGbHlvdXQoZSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVudUZseW91dFxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
