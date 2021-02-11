import { Component, h, Prop, Element, Watch } from "@stencil/core";
import anime from "animejs";
export class Animation {
    constructor() {
        this.animationDuration = 200;
        /**
         * Callback that will fire when the animation starts.
         */
        this.animationBeginCallback = () => undefined;
    }
    animationNameChanged() {
        // Prepare the animation
        let animeParams = {
            targets: this.el,
            duration: this.animationDuration,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            begin: () => {
                this.el.style.display = "inline-block";
                this.animationBeginCallback();
            }
        };
        switch (this.animationName) {
            case "scale-in":
                animeParams = Object.assign(Object.assign({}, animeParams), { scale: 1 });
                break;
            case "scale-out":
                animeParams = Object.assign(Object.assign({}, animeParams), { scale: 0 });
                break;
            case "fade-in":
                animeParams = Object.assign(Object.assign({}, animeParams), { opacity: 1 });
                break;
            case "fade-out":
                animeParams = Object.assign(Object.assign({}, animeParams), { opacity: 0, complete: () => this.el.style.display = "none" });
                break;
            default:
                break;
        }
        // Run the animation
        anime(animeParams);
    }
    componentWillLoad() {
        // Set initial values to be ready for an animation
        switch (this.animationName) {
            case "scale-in":
                this.el.style.transform = "scale(1)";
                break;
            case "scale-out":
                this.el.style.transform = "scale(0)";
                this.el.style.display = "none";
                break;
            case "fade-in":
                this.el.style.opacity = "1";
                this.el.style.display = "inline-block";
                break;
            case "fade-out":
                this.el.style.opacity = "0";
                this.el.style.display = "none";
                break;
            default:
                break;
        }
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "sdx-animation"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationName": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "AnimationName",
                "resolved": "\"fade-in\" | \"fade-out\" | \"scale-in\" | \"scale-out\" | undefined",
                "references": {
                    "AnimationName": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The animation to play."
            },
            "attribute": "animation-name",
            "reflect": false
        },
        "animationBeginCallback": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(() => void)",
                "resolved": "() => void",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Callback that will fire when the animation starts."
            },
            "defaultValue": "() => undefined"
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "animationName",
            "methodName": "animationNameChanged"
        }]; }
}
