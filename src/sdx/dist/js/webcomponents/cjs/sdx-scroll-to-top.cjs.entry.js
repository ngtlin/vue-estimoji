'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const anime_es = require('./anime.es-517c0b36.js');

const scrollToTopCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{z-index:50000;display:none}.scroll-to-top{border:2px solid #086adb;border-radius:50%;background-color:rgba(255, 255, 255, 0.8);color:#086adb;height:48px;width:48px;padding:6px;outline:none;cursor:pointer}.scroll-to-top:hover{border-color:#0048CF;color:#0048CF}@media (hover: none){.scroll-to-top{border-color:#086adb;color:#086adb}}.scroll-to-top:focus,.scroll-to-top:active{border-color:#0048CF;color:#0048CF}.scroll-to-top:active{-webkit-transform:scale(0.98);transform:scale(0.98)}";

const ScrollToTop = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            anime_es.anime({
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
            anime_es.anime({
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
        index.forceUpdate(this.el);
    }
    scrollToTop() {
        window.scroll({ top: 0, behavior: "smooth" });
    }
    render() {
        return (index.h("button", { type: "button", class: "scroll-to-top", "aria-hidden": "true" }, index.h("sdx-icon", { "icon-name": "icon-arrow-up", size: 3 })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "visible": ["onVisibleChanged"]
    }; }
};
ScrollToTop.style = scrollToTopCss;

exports.sdx_scroll_to_top = ScrollToTop;
