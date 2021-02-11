import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as anime } from './anime.es-7aa2f713.js';

const Animation = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        }
    }
    render() {
        return (h("slot", null));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "animationName": ["animationNameChanged"]
    }; }
};

const Flip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Mirror the content across one or both axes (or none at all).
         */
        this.direction = "none";
    }
    componentWillLoad() {
        this.el.style.display = "inline-block"; // make transformable
        this.el.style.transform = `scaleX(${this.getFlipTransformStyle("x")}) scaleY(${this.getFlipTransformStyle("y")})`;
    }
    getFlipTransformStyle(axis) {
        const map = {
            none: {
                x: 1,
                y: 1
            },
            horizontal: {
                x: -1,
                y: 1
            },
            vertical: {
                x: 1,
                y: -1
            },
            both: {
                x: -1,
                y: -1
            }
        };
        return map[this.direction][axis];
    }
    render() {
        return h("slot", null);
    }
    get el() { return getElement(this); }
};

export { Animation as sdx_animation, Flip as sdx_flip };
