import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';
import './isNil-ec331784.js';
import { t as toggle } from './immutability-helpers-cb2779d7.js';
import { c as createAndInstallStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';
var menuFlyoutReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "SET_DISPLAY":
            return Object.assign(Object.assign({}, state), { display: action.display });
        case "SET_DIRECTION":
            return Object.assign(Object.assign({}, state), { directionState: action.directionState });
        case "SET_TOGGLE":
            return Object.assign(Object.assign({}, state), { toggle: action.toggle });
        case "SET_CONTENT_EL":
            return Object.assign(Object.assign({}, state), { contentEl: action.contentEl });
        case "SET_TOGGLE_EL":
            return Object.assign(Object.assign({}, state), { toggleEl: action.toggleEl });
        case "TOGGLE_ARROW_EL":
            return Object.assign(Object.assign({}, state), { arrowEls: toggle(state.arrowEls, action.arrowEl) });
        default:
            return state;
    }
};
var menuFlyoutCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:inline-block}";
var MenuFlyout = /** @class */ (function () {
    function MenuFlyout(hostRef) {
        registerInstance(this, hostRef);
        this.invokeDisplayChangeCallback = function () { return null; };
        this.animationDuration = 300;
        this.isClicking = false;
        this.oppositeDirection = {
            x: {
                "top-right": "top-left",
                "top-left": "top-right",
                "bottom-right": "bottom-left",
                "bottom-left": "bottom-right"
            },
            y: {
                "top-right": "bottom-right",
                "top-left": "bottom-left",
                "bottom-right": "top-right",
                "bottom-left": "top-left"
            }
        };
        /**
         * The arrow is a 14px square (rotated by 45°).
         */
        this.arrowUnrotatedWidth = 14;
        /**
         * Distance from the toggle to the arrow (and, on mobiles, to the screen).
         */
        this.offset = 16;
        this.display = "closed";
        /**
         * In which direction the flyout opens.
         */
        this.direction = "bottom-right";
        /**
         * Close if the user clicks on the flyout.
         */
        this.closeOnClick = false;
    }
    MenuFlyout.prototype.directionChanged = function () {
        var _this = this;
        if (this.display !== "closed") { // If the flyout is open, re-open it with new direction
            this.close().then(function () {
                _this.dispatchDirection(_this.direction);
                _this.open();
            });
        }
        else {
            this.dispatchDirection(this.direction);
        }
    };
    MenuFlyout.prototype.toggleElChanged = function () {
        // Keep a reference to the content elements first
        // child from which the position will be read
        this.toggleElChild = this.toggleEl
            ? this.toggleEl.children[0]
            : undefined;
    };
    MenuFlyout.prototype.displayChangeCallbackChanged = function () {
        this.setInvokeDisplayChangeCallback();
    };
    MenuFlyout.prototype.componentWillLoad = function () {
        this.setInvokeDisplayChangeCallback();
        this.store = createAndInstallStore(this, menuFlyoutReducer, this.getInitialState());
        this.unsubscribe = mapStateToProps(this, this.store, [
            "display",
            "directionState",
            "contentEl",
            "toggleEl",
            "arrowEls"
        ]);
        this.dispatchDirection(this.direction);
        this.store.dispatch({ type: "SET_TOGGLE", toggle: this.toggle.bind(this) });
    };
    MenuFlyout.prototype.displayChanged = function () {
        this.invokeDisplayChangeCallback(this.display);
    };
    MenuFlyout.prototype.componentDidLoad = function () {
        // Close by default
        this.close();
    };
    MenuFlyout.prototype.componentDidUnload = function () {
        this.unsubscribe();
    };
    MenuFlyout.prototype.getInitialState = function () {
        return {
            display: "closed",
            directionState: "bottom-right",
            toggle: function () { return Promise.resolve(); },
            contentEl: undefined,
            toggleEl: undefined,
            arrowEls: []
        };
    };
    MenuFlyout.prototype.onClick = function () {
        // Let the component know that a click event is happening (for later handling of global "window:click")
        this.isClicking = true;
    };
    MenuFlyout.prototype.onWindowClick = function () {
        // Close the flyout if the user clicks anywhere on the screen
        // except on the flyout itself (if not overriden by this.closeOnClick)
        if (!this.isClicking || (this.display === "open" && this.closeOnClick)) {
            this.close();
        }
        this.isClicking = false;
    };
    /**
     * Toggles the flyout.
     */
    MenuFlyout.prototype.toggle = function () {
        if (this.display === "open") {
            return this.close();
        }
        else if (this.display === "closed") {
            return this.open();
        }
        return Promise.resolve();
    };
    /**
     * Opens the flyout.
     */
    MenuFlyout.prototype.open = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.contentEl) {
                return;
            }
            // Only a closed flyout can be opened
            if (!(_this.display === "closed" || _this.display === "closing")) {
                resolve();
                return;
            }
            var contentEl = _this.contentEl;
            var direction = _this.directionState;
            _this.store.dispatch({ type: "SET_DISPLAY", display: "opening" });
            // Initial show
            contentEl.style.display = "block";
            // Temporarily position the contentEl to be able to take its measurements
            _this.positionContentEl(direction);
            // Keep the original width to reset it later (because it might be overridden for fitting in window)
            _this.originalWidth = contentEl.clientWidth;
            // Check if there's enough space towards the desired direction
            var hasEnoughSpaceOnX = _this.hasEnoughSpace(direction, "x");
            var hasEnoughSpaceOnY = _this.hasEnoughSpace(direction, "y");
            if (!hasEnoughSpaceOnX) {
                var oppositeDirection = _this.oppositeDirection.x[direction];
                _this.positionContentEl(oppositeDirection, "x");
                if (_this.hasEnoughSpace(oppositeDirection, "x")) { // check opposite direction
                    // Update direction
                    direction = oppositeDirection;
                    _this.dispatchDirection(direction);
                }
                else { // No space in either direction, use full screen width
                    _this.positionContentEl(oppositeDirection, "x", true);
                }
            }
            if (!hasEnoughSpaceOnY) {
                var oppositeDirection = _this.oppositeDirection.y[direction];
                _this.positionContentEl(oppositeDirection, "y");
                if (_this.hasEnoughSpace(oppositeDirection, "y")) { // check opposite direction
                    _this.dispatchDirection(oppositeDirection);
                }
                else { // No space in either direction, fall back to the desired direction
                    _this.positionContentEl(direction, "y");
                }
            }
            var animationOffset = _this.directionState === "top-left" || _this.directionState === "top-right"
                ? -_this.offset
                : _this.offset;
            anime.remove(contentEl);
            anime({
                targets: contentEl,
                duration: _this.animationDuration,
                translateY: animationOffset,
                opacity: 1,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: function () {
                    _this.store.dispatch({ type: "SET_DISPLAY", display: "open" });
                    resolve();
                }
            });
        });
    };
    /**
     * Closes the flyout.
     */
    MenuFlyout.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var contentEl = _this.contentEl;
            if (!contentEl) {
                return;
            }
            if (_this.display === "closed") { // close() was called while flyout was closed already
                contentEl.style.display = "none";
                contentEl.style.opacity = "0";
                resolve();
            }
            else { // Flyout is open
                _this.store.dispatch({ type: "SET_DISPLAY", display: "closing" });
                anime.remove(contentEl);
                anime({
                    targets: contentEl,
                    duration: _this.animationDuration,
                    translateY: 0,
                    opacity: 0,
                    easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                    complete: function () {
                        contentEl.style.display = "none";
                        // Reset to original direction (it might have changed during opening because of not enough space)
                        _this.dispatchDirection(_this.direction);
                        // Reset to original width (in case it was changed to full window width)
                        contentEl.style.width = _this.originalWidth + "px";
                        _this.store.dispatch({ type: "SET_DISPLAY", display: "closed" });
                        resolve();
                    }
                });
            }
        });
    };
    MenuFlyout.prototype.setInvokeDisplayChangeCallback = function () {
        this.invokeDisplayChangeCallback = parseFunction(this.displayChangeCallback);
    };
    MenuFlyout.prototype.dispatchDirection = function (direction) {
        this.store.dispatch({ type: "SET_DIRECTION", directionState: direction });
    };
    /**
     * Checks if there's enough space to open the flyout (above or below the toggle)
     * @param direction Desired direction to check
     * @param axis Whether to check vertically or horizontally
     */
    MenuFlyout.prototype.hasEnoughSpace = function (direction, axis) {
        if (!this.contentEl) {
            return false;
        }
        var elRect = this.el.getBoundingClientRect();
        var contentElRect = this.contentEl.getBoundingClientRect();
        switch (axis) {
            case "x": {
                var directionIsLeft = direction === "top-left" || direction === "bottom-left";
                var remainingSpace_1;
                var totalWidth = contentElRect.width;
                if (directionIsLeft) { // check towards left
                    remainingSpace_1 = elRect.left;
                }
                else { // check towards right
                    remainingSpace_1 = innerWidth - elRect.left;
                }
                return totalWidth < remainingSpace_1;
            }
            case "y":
                var directionIsBottom = direction === "bottom-right" || direction === "bottom-left";
                var remainingSpace = void 0;
                var totalHeight = void 0;
                if (directionIsBottom) { // check towards bottom
                    remainingSpace = innerHeight - elRect.bottom;
                    totalHeight = remainingSpace - (innerHeight - contentElRect.bottom);
                }
                else { // check towards top
                    remainingSpace = elRect.top;
                    totalHeight = innerHeight - (innerHeight - elRect.top) - contentElRect.top;
                }
                totalHeight = totalHeight + this.offset;
                return totalHeight < remainingSpace;
            default:
                return true;
        }
    };
    MenuFlyout.prototype.positionContentEl = function (direction, axis, fullWidth) {
        var _this = this;
        if (!(this.contentEl && this.toggleEl)) {
            return;
        }
        var contentEl = this.contentEl;
        var contentElPosition = this.getContentElPosition(direction);
        contentEl.style.opacity = "0";
        contentEl.style.transform = "translateY(0)";
        // Place the contentEl
        if (!axis || axis === "x") {
            contentEl.style.left = contentElPosition[0] + "px";
        }
        if (!axis || axis === "y") {
            contentEl.style.top = contentElPosition[1] + "px";
        }
        // Stretch to the screen
        if (fullWidth) {
            contentEl.style.width = innerWidth - (this.offset * 2) + "px";
            var toggleElRect_1 = this.toggleEl.getBoundingClientRect();
            contentEl.style.left = "-" + (toggleElRect_1.left - this.offset) + "px";
            var contentElPosition_1 = this.getContentElPosition(direction);
            contentEl.style.top = contentElPosition_1[1] + "px";
        }
        // Place its arrow
        var contentElRect = this.contentEl.getBoundingClientRect();
        var toggleElRect = this.toggleEl.getBoundingClientRect();
        this.arrowEls.forEach(function (arrowEl) {
            arrowEl.style.left = toggleElRect.left - contentElRect.left + (toggleElRect.width / 2) - (_this.arrowUnrotatedWidth / 2) + "px";
        });
    };
    /**
     * Return the position where the flyout will appear (depending on the direction).
     * @param direction Desired direction to check
     */
    MenuFlyout.prototype.getContentElPosition = function (direction) {
        if (!(this.contentEl && this.toggleElChild)) {
            return [0, 0];
        }
        var contentElRect = this.contentEl.getBoundingClientRect();
        var toggleElChildRect = this.toggleElChild.getBoundingClientRect();
        var top = -contentElRect.height;
        var bottom = toggleElChildRect.height;
        var right = (toggleElChildRect.width / 2) - (this.offset + this.arrowUnrotatedWidth);
        var left = -(contentElRect.width - toggleElChildRect.width) - right;
        switch (direction) {
            case "bottom-right":
                return [right, bottom];
            case "bottom-left":
                return [left, bottom];
            case "top-right":
                return [right, top];
            case "top-left":
                return [left, top];
            default:
                return [0, 0];
        }
    };
    MenuFlyout.prototype.render = function () {
        return (h("slot", null));
    };
    Object.defineProperty(MenuFlyout.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuFlyout, "watchers", {
        get: function () {
            return {
                "direction": ["directionChanged"],
                "toggleEl": ["toggleElChanged"],
                "displayChangeCallback": ["displayChangeCallbackChanged"],
                "display": ["displayChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return MenuFlyout;
}());
MenuFlyout.style = menuFlyoutCss;
export { MenuFlyout as sdx_menu_flyout };
