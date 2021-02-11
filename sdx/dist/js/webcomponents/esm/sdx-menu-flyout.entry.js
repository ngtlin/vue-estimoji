import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';
import './isNil-ec331784.js';
import { t as toggle } from './immutability-helpers-cb2779d7.js';
import { c as createAndInstallStore, m as mapStateToProps } from './store-helpers-24be1cb4.js';

const menuFlyoutReducer = (state = {}, action) => {
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

const menuFlyoutCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:inline-block}";

const MenuFlyout = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.invokeDisplayChangeCallback = () => null;
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
    directionChanged() {
        if (this.display !== "closed") { // If the flyout is open, re-open it with new direction
            this.close().then(() => {
                this.dispatchDirection(this.direction);
                this.open();
            });
        }
        else {
            this.dispatchDirection(this.direction);
        }
    }
    toggleElChanged() {
        // Keep a reference to the content elements first
        // child from which the position will be read
        this.toggleElChild = this.toggleEl
            ? this.toggleEl.children[0]
            : undefined;
    }
    displayChangeCallbackChanged() {
        this.setInvokeDisplayChangeCallback();
    }
    componentWillLoad() {
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
    }
    displayChanged() {
        this.invokeDisplayChangeCallback(this.display);
    }
    componentDidLoad() {
        // Close by default
        this.close();
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    getInitialState() {
        return {
            display: "closed",
            directionState: "bottom-right",
            toggle: () => Promise.resolve(),
            contentEl: undefined,
            toggleEl: undefined,
            arrowEls: []
        };
    }
    onClick() {
        // Let the component know that a click event is happening (for later handling of global "window:click")
        this.isClicking = true;
    }
    onWindowClick() {
        // Close the flyout if the user clicks anywhere on the screen
        // except on the flyout itself (if not overriden by this.closeOnClick)
        if (!this.isClicking || (this.display === "open" && this.closeOnClick)) {
            this.close();
        }
        this.isClicking = false;
    }
    /**
     * Toggles the flyout.
     */
    toggle() {
        if (this.display === "open") {
            return this.close();
        }
        else if (this.display === "closed") {
            return this.open();
        }
        return Promise.resolve();
    }
    /**
     * Opens the flyout.
     */
    open() {
        return new Promise((resolve) => {
            if (!this.contentEl) {
                return;
            }
            // Only a closed flyout can be opened
            if (!(this.display === "closed" || this.display === "closing")) {
                resolve();
                return;
            }
            const contentEl = this.contentEl;
            let direction = this.directionState;
            this.store.dispatch({ type: "SET_DISPLAY", display: "opening" });
            // Initial show
            contentEl.style.display = "block";
            // Temporarily position the contentEl to be able to take its measurements
            this.positionContentEl(direction);
            // Keep the original width to reset it later (because it might be overridden for fitting in window)
            this.originalWidth = contentEl.clientWidth;
            // Check if there's enough space towards the desired direction
            const hasEnoughSpaceOnX = this.hasEnoughSpace(direction, "x");
            const hasEnoughSpaceOnY = this.hasEnoughSpace(direction, "y");
            if (!hasEnoughSpaceOnX) {
                const oppositeDirection = this.oppositeDirection.x[direction];
                this.positionContentEl(oppositeDirection, "x");
                if (this.hasEnoughSpace(oppositeDirection, "x")) { // check opposite direction
                    // Update direction
                    direction = oppositeDirection;
                    this.dispatchDirection(direction);
                }
                else { // No space in either direction, use full screen width
                    this.positionContentEl(oppositeDirection, "x", true);
                }
            }
            if (!hasEnoughSpaceOnY) {
                const oppositeDirection = this.oppositeDirection.y[direction];
                this.positionContentEl(oppositeDirection, "y");
                if (this.hasEnoughSpace(oppositeDirection, "y")) { // check opposite direction
                    this.dispatchDirection(oppositeDirection);
                }
                else { // No space in either direction, fall back to the desired direction
                    this.positionContentEl(direction, "y");
                }
            }
            const animationOffset = this.directionState === "top-left" || this.directionState === "top-right"
                ? -this.offset
                : this.offset;
            anime.remove(contentEl);
            anime({
                targets: contentEl,
                duration: this.animationDuration,
                translateY: animationOffset,
                opacity: 1,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.store.dispatch({ type: "SET_DISPLAY", display: "open" });
                    resolve();
                }
            });
        });
    }
    /**
     * Closes the flyout.
     */
    close() {
        return new Promise((resolve) => {
            const contentEl = this.contentEl;
            if (!contentEl) {
                return;
            }
            if (this.display === "closed") { // close() was called while flyout was closed already
                contentEl.style.display = "none";
                contentEl.style.opacity = "0";
                resolve();
            }
            else { // Flyout is open
                this.store.dispatch({ type: "SET_DISPLAY", display: "closing" });
                anime.remove(contentEl);
                anime({
                    targets: contentEl,
                    duration: this.animationDuration,
                    translateY: 0,
                    opacity: 0,
                    easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                    complete: () => {
                        contentEl.style.display = "none";
                        // Reset to original direction (it might have changed during opening because of not enough space)
                        this.dispatchDirection(this.direction);
                        // Reset to original width (in case it was changed to full window width)
                        contentEl.style.width = `${this.originalWidth}px`;
                        this.store.dispatch({ type: "SET_DISPLAY", display: "closed" });
                        resolve();
                    }
                });
            }
        });
    }
    setInvokeDisplayChangeCallback() {
        this.invokeDisplayChangeCallback = parseFunction(this.displayChangeCallback);
    }
    dispatchDirection(direction) {
        this.store.dispatch({ type: "SET_DIRECTION", directionState: direction });
    }
    /**
     * Checks if there's enough space to open the flyout (above or below the toggle)
     * @param direction Desired direction to check
     * @param axis Whether to check vertically or horizontally
     */
    hasEnoughSpace(direction, axis) {
        if (!this.contentEl) {
            return false;
        }
        const elRect = this.el.getBoundingClientRect();
        const contentElRect = this.contentEl.getBoundingClientRect();
        switch (axis) {
            case "x": {
                const directionIsLeft = direction === "top-left" || direction === "bottom-left";
                let remainingSpace;
                let totalWidth = contentElRect.width;
                if (directionIsLeft) { // check towards left
                    remainingSpace = elRect.left;
                }
                else { // check towards right
                    remainingSpace = innerWidth - elRect.left;
                }
                return totalWidth < remainingSpace;
            }
            case "y":
                const directionIsBottom = direction === "bottom-right" || direction === "bottom-left";
                let remainingSpace;
                let totalHeight;
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
    }
    positionContentEl(direction, axis, fullWidth) {
        if (!(this.contentEl && this.toggleEl)) {
            return;
        }
        const contentEl = this.contentEl;
        const contentElPosition = this.getContentElPosition(direction);
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
            contentEl.style.width = `${innerWidth - (this.offset * 2)}px`;
            const toggleElRect = this.toggleEl.getBoundingClientRect();
            contentEl.style.left = `-${toggleElRect.left - this.offset}px`;
            const contentElPosition = this.getContentElPosition(direction);
            contentEl.style.top = `${contentElPosition[1]}px`;
        }
        // Place its arrow
        const contentElRect = this.contentEl.getBoundingClientRect();
        const toggleElRect = this.toggleEl.getBoundingClientRect();
        this.arrowEls.forEach((arrowEl) => {
            arrowEl.style.left = `${toggleElRect.left - contentElRect.left + (toggleElRect.width / 2) - (this.arrowUnrotatedWidth / 2)}px`;
        });
    }
    /**
     * Return the position where the flyout will appear (depending on the direction).
     * @param direction Desired direction to check
     */
    getContentElPosition(direction) {
        if (!(this.contentEl && this.toggleElChild)) {
            return [0, 0];
        }
        const contentElRect = this.contentEl.getBoundingClientRect();
        const toggleElChildRect = this.toggleElChild.getBoundingClientRect();
        const top = -contentElRect.height;
        const bottom = toggleElChildRect.height;
        const right = (toggleElChildRect.width / 2) - (this.offset + this.arrowUnrotatedWidth);
        const left = -(contentElRect.width - toggleElChildRect.width) - right;
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
    }
    render() {
        return (h("slot", null));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "direction": ["directionChanged"],
        "toggleEl": ["toggleElChanged"],
        "displayChangeCallback": ["displayChangeCallbackChanged"],
        "display": ["displayChanged"]
    }; }
};
MenuFlyout.style = menuFlyoutCss;

export { MenuFlyout as sdx_menu_flyout };
