import anime from "animejs";
import { Component, h, Element, Prop, State, Listen, Method, Watch } from "@stencil/core";
import { menuFlyoutReducer } from "./menu-flyout-store";
import { createAndInstallStore, mapStateToProps } from "../../core/helpers/store-helpers";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class MenuFlyout {
    constructor() {
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
        else {
            // Ignore "opening" and "closing"
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
        this.invokeDisplayChangeCallback = wcHelpers.parseFunction(this.displayChangeCallback);
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
    static get is() { return "sdx-menu-flyout"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-flyout.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-flyout.css"]
    }; }
    static get properties() { return {
        "direction": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Direction",
                "resolved": "\"bottom-left\" | \"bottom-right\" | \"top-left\" | \"top-right\"",
                "references": {
                    "Direction": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "In which direction the flyout opens."
            },
            "attribute": "direction",
            "reflect": false,
            "defaultValue": "\"bottom-right\""
        },
        "closeOnClick": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Close if the user clicks on the flyout."
            },
            "attribute": "close-on-click",
            "reflect": false,
            "defaultValue": "false"
        },
        "displayChangeCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((display: Display) => void) | string",
                "resolved": "((display: Display) => void) | string | undefined",
                "references": {
                    "Display": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Callback that will fire after the flyouts display status has changed."
            },
            "attribute": "display-change-callback",
            "reflect": false
        }
    }; }
    static get states() { return {
        "display": {},
        "directionState": {},
        "contentEl": {},
        "toggleEl": {},
        "arrowEls": {}
    }; }
    static get methods() { return {
        "toggle": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Toggles the flyout.",
                "tags": []
            }
        },
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Opens the flyout.",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Closes the flyout.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "direction",
            "methodName": "directionChanged"
        }, {
            "propName": "toggleEl",
            "methodName": "toggleElChanged"
        }, {
            "propName": "displayChangeCallback",
            "methodName": "displayChangeCallbackChanged"
        }, {
            "propName": "display",
            "methodName": "displayChanged"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "touchend",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "onWindowClick",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "touchend",
            "method": "onWindowClick",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
