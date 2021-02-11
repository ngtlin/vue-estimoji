import { Component, h, Listen, Prop, Host } from "@stencil/core";
const padding = 16;
export class StickerCircle {
    constructor() {
        /**
         * The size (diameter) in px.
         */
        this.size = 112;
        /**
         * SDX predefined color class for the text and border.
         */
        this.colorClass = "sc-white";
        /**
         * SDX predefined color class (or transparent) for the sticker background.
         */
        this.bgColorClass = "orchid";
        /**
         * Description text read by the screen reader.
         */
        this.srHint = "";
    }
    /**
     * Listen to window resize events, and resize sticker accordingly
     */
    onWindowResizeThrottled() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            this.resize();
        }, 10);
    }
    componentDidLoad() {
        this.resize();
    }
    resize() {
        if (this.wrapperEl && this.stickerEl && this.contentWidth) {
            this.stickerEl.style.transform = `scale(${this.wrapperEl.clientWidth / this.contentWidth})`;
        }
    }
    getClassNames() {
        return {
            sticker: true,
            [this.colorClass]: true,
            [`bg-${this.bgColorClass}`]: true
        };
    }
    getStyles() {
        const isScalingEnabled = this.contentWidth !== undefined;
        return {
            sticker: {
                width: `${this.size}px`,
                height: `${this.size}px`,
                top: `${this.top}%`,
                bottom: `${this.bottom}%`,
                left: `${this.left}%`,
                right: `${this.right}%`,
                transformOrigin: `${this.top !== undefined ? "top" : "bottom"} ${this.left !== undefined ? "left" : "right"}`
            },
            inner: {
                maxWidth: `${this.size - 2 * padding}px`,
                maxHeight: `${this.size - 2 * padding}px`
            },
            slot: {
                minWidth: `${isScalingEnabled ? 0 : this.size}px`,
                minHeight: `${isScalingEnabled ? 0 : this.size}px`
            }
        };
    }
    render() {
        return (h(Host, null,
            h("div", { class: "wrapper", ref: (el) => this.wrapperEl = el },
                h("div", { class: this.getClassNames(), style: this.getStyles().sticker, ref: (el) => this.stickerEl = el },
                    h("div", { class: "inner", style: this.getStyles().inner, "aria-hidden": "true" },
                        h("slot", { name: "text" }))),
                h("div", { class: "slot", style: this.getStyles().slot },
                    h("slot", null))),
            h("span", { class: "sr-only" }, this.srHint)));
    }
    static get is() { return "sdx-sticker-circle"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["sticker-circle.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["sticker-circle.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The size (diameter) in px."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "112"
        },
        "contentWidth": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The content width at which the sticker should be normal size (nonscaled)."
            },
            "attribute": "content-width",
            "reflect": false
        },
        "colorClass": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "SDX predefined color class for the text and border."
            },
            "attribute": "color-class",
            "reflect": false,
            "defaultValue": "\"sc-white\""
        },
        "bgColorClass": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "SDX predefined color class (or transparent) for the sticker background."
            },
            "attribute": "bg-color-class",
            "reflect": false,
            "defaultValue": "\"orchid\""
        },
        "top": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Offset from the top edge, in % of the content's height."
            },
            "attribute": "top",
            "reflect": false
        },
        "bottom": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Offset from the bottom edge, in % of the content's height."
            },
            "attribute": "bottom",
            "reflect": false
        },
        "left": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Offset from the left edge, in % of the content's width."
            },
            "attribute": "left",
            "reflect": false
        },
        "right": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Offset from the right edge, in % of the content's width."
            },
            "attribute": "right",
            "reflect": false
        },
        "srHint": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Description text read by the screen reader."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get listeners() { return [{
            "name": "resize",
            "method": "onWindowResizeThrottled",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
