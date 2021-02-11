import { Component, h, Element, Listen, Prop, State, Watch, forceUpdate } from "@stencil/core";
import anime from "animejs";
export class ScrollToTop {
    constructor() {
        this.animationDuration = 500;
        this.animationTranslationY = 112;
        /**
         * @private
         */
        this.position = "fixed";
        /**
         * @private
         */
        this.demo = false;
        this.visible = false;
    }
    componentWillLoad() {
        this.visible = this.isVisible();
        this.updateVisibility();
    }
    onWindowScroll() {
        this.visible = this.isVisible();
    }
    onTouchStart() {
        // NOP - make sure touchstart is noticed. touchstart event needed for the animations (note: tracking on prod)
    }
    isVisible() {
        // should always be visible when "demo"; only used for demo on SDX documentation site
        return this.demo || this.hasScrolledOverWindowHeight();
    }
    hasScrolledOverWindowHeight() {
        return window.pageYOffset > window.innerHeight;
    }
    onClick() {
        this.scrollToTop();
    }
    onVisibleChanged() {
        this.updateVisibility();
    }
    updateVisibility() {
        if (this.visible) {
            anime({
                targets: this.el,
                duration: this.animationDuration,
                opacity: 1,
                translateY: 0,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                begin: () => {
                    this.el.style.display = "block";
                    if (this.position === "fixed") {
                        this.el.style.position = "fixed";
                        this.el.style.bottom = "32px"; // $baseline-4
                        this.el.style.right = "32px"; // $baseline-4
                    }
                }
            });
        }
        else {
            anime({
                targets: this.el,
                duration: this.animationDuration,
                opacity: 0,
                translateY: this.animationTranslationY,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                complete: () => {
                    this.el.style.display = "none";
                }
            });
        }
        forceUpdate(this.el);
    }
    scrollToTop() {
        window.scroll({ top: 0, behavior: "smooth" });
    }
    render() {
        return (h("button", { type: "button", class: "scroll-to-top", "aria-hidden": "true" },
            h("sdx-icon", { "icon-name": "icon-arrow-up", size: 3 })));
    }
    static get is() { return "sdx-scroll-to-top"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["scroll-to-top.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["scroll-to-top.css"]
    }; }
    static get properties() { return {
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Position",
                "resolved": "\"fixed\" | \"static\"",
                "references": {
                    "Position": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "\"fixed\""
        },
        "demo": {
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
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "demo",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "visible": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "visible",
            "methodName": "onVisibleChanged"
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "onWindowScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "touchstart",
            "method": "onTouchStart",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
