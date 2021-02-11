import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as anime } from './anime.es-7aa2f713.js';
var Animation = /** @class */ (function () {
    function Animation(hostRef) {
        registerInstance(this, hostRef);
        this.animationDuration = 200;
        /**
         * Callback that will fire when the animation starts.
         */
        this.animationBeginCallback = function () { return undefined; };
    }
    Animation.prototype.animationNameChanged = function () {
        var _this = this;
        // Prepare the animation
        var animeParams = {
            targets: this.el,
            duration: this.animationDuration,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            begin: function () {
                _this.el.style.display = "inline-block";
                _this.animationBeginCallback();
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
                animeParams = Object.assign(Object.assign({}, animeParams), { opacity: 0, complete: function () { return _this.el.style.display = "none"; } });
                break;
        }
        // Run the animation
        anime(animeParams);
    };
    Animation.prototype.componentWillLoad = function () {
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
    };
    Animation.prototype.render = function () {
        return (h("slot", null));
    };
    Object.defineProperty(Animation.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation, "watchers", {
        get: function () {
            return {
                "animationName": ["animationNameChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return Animation;
}());
var Flip = /** @class */ (function () {
    function Flip(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Mirror the content across one or both axes (or none at all).
         */
        this.direction = "none";
    }
    Flip.prototype.componentWillLoad = function () {
        this.el.style.display = "inline-block"; // make transformable
        this.el.style.transform = "scaleX(" + this.getFlipTransformStyle("x") + ") scaleY(" + this.getFlipTransformStyle("y") + ")";
    };
    Flip.prototype.getFlipTransformStyle = function (axis) {
        var map = {
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
    };
    Flip.prototype.render = function () {
        return h("slot", null);
    };
    Object.defineProperty(Flip.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return Flip;
}());
export { Animation as sdx_animation, Flip as sdx_flip };
