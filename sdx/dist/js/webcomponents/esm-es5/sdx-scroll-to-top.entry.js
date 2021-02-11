import { r as registerInstance, f as forceUpdate, h, g as getElement } from './index-28757bf2.js';
import { a as anime } from './anime.es-7aa2f713.js';
var scrollToTopCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{z-index:50000;display:none}.scroll-to-top{border:2px solid #086adb;border-radius:50%;background-color:rgba(255, 255, 255, 0.8);color:#086adb;height:48px;width:48px;padding:6px;outline:none;cursor:pointer}.scroll-to-top:hover{border-color:#0048CF;color:#0048CF}@media (hover: none){.scroll-to-top{border-color:#086adb;color:#086adb}}.scroll-to-top:focus,.scroll-to-top:active{border-color:#0048CF;color:#0048CF}.scroll-to-top:active{-webkit-transform:scale(0.98);transform:scale(0.98)}";
var ScrollToTop = /** @class */ (function () {
    function ScrollToTop(hostRef) {
        registerInstance(this, hostRef);
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
    ScrollToTop.prototype.componentWillLoad = function () {
        this.visible = this.isVisible();
        this.updateVisibility();
    };
    ScrollToTop.prototype.onWindowScroll = function () {
        this.visible = this.isVisible();
    };
    ScrollToTop.prototype.onTouchStart = function () {
        // NOP - make sure touchstart is noticed. touchstart event needed for the animations (note: tracking on prod)
    };
    ScrollToTop.prototype.isVisible = function () {
        // should always be visible when "demo"; only used for demo on SDX documentation site
        return this.demo || this.hasScrolledOverWindowHeight();
    };
    ScrollToTop.prototype.hasScrolledOverWindowHeight = function () {
        return window.pageYOffset > window.innerHeight;
    };
    ScrollToTop.prototype.onClick = function () {
        this.scrollToTop();
    };
    ScrollToTop.prototype.onVisibleChanged = function () {
        this.updateVisibility();
    };
    ScrollToTop.prototype.updateVisibility = function () {
        var _this = this;
        if (this.visible) {
            anime({
                targets: this.el,
                duration: this.animationDuration,
                opacity: 1,
                translateY: 0,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                begin: function () {
                    _this.el.style.display = "block";
                    if (_this.position === "fixed") {
                        _this.el.style.position = "fixed";
                        _this.el.style.bottom = "32px"; // $baseline-4
                        _this.el.style.right = "32px"; // $baseline-4
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
                complete: function () {
                    _this.el.style.display = "none";
                }
            });
        }
        forceUpdate(this.el);
    };
    ScrollToTop.prototype.scrollToTop = function () {
        window.scroll({ top: 0, behavior: "smooth" });
    };
    ScrollToTop.prototype.render = function () {
        return (h("button", { type: "button", class: "scroll-to-top", "aria-hidden": "true" }, h("sdx-icon", { "icon-name": "icon-arrow-up", size: 3 })));
    };
    Object.defineProperty(ScrollToTop.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollToTop, "watchers", {
        get: function () {
            return {
                "visible": ["onVisibleChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return ScrollToTop;
}());
ScrollToTop.style = scrollToTopCss;
export { ScrollToTop as sdx_scroll_to_top };
