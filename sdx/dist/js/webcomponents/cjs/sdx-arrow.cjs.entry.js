'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');

const arrowCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex}.component{width:40px;height:100%;display:-ms-flexbox;display:flex;cursor:pointer}.component:hover .arrow-container .arrow{position:relative}.component:hover .arrow-container .arrow::before,.component:hover .arrow-container .arrow::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component:hover .arrow-container .arrow::before{left:0}.component:hover .arrow-container .arrow::after{left:6px}.component.left{-ms-flex-pack:start;justify-content:flex-start;background:-webkit-gradient(linear, right top, left top, from(rgba(255, 255, 255, 0)), color-stop(rgba(255, 255, 255, 0.85)), to(white));background:linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.85), white)}.component.left .arrow-container{left:2px}.component.left .arrow-container .arrow::before{top:6px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.left .arrow-container .arrow::after{left:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.right{-ms-flex-pack:end;justify-content:flex-end;background:-webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), color-stop(rgba(255, 255, 255, 0.85)), to(white));background:linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.85), white)}.component.right .arrow-container{right:2px}.component.right .arrow-container .arrow::before{right:0;top:6px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.right .arrow-container .arrow::after{left:0;right:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.up{background:-webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), color-stop(rgba(255, 255, 255, 0.85)), to(white));background:linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.85), white)}.component.up .arrow-container .arrow::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.up .arrow-container .arrow::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.down{background:-webkit-gradient(linear, left bottom, left top, from(rgba(255, 255, 255, 0)), color-stop(rgba(255, 255, 255, 0.85)), to(white));background:linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.85), white)}.component.down .arrow-container .arrow::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.down .arrow-container .arrow::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component .arrow-container{width:10px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative}.component .arrow-container .arrow{position:relative;top:-3px}.component .arrow-container .arrow::before,.component .arrow-container .arrow::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#086adb;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}.component .arrow-container .arrow::before{left:0}.component .arrow-container .arrow::after{left:6px}";

const Arrow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Which side it looks towards.
         */
        this.direction = "down";
        /**
         * Hide the arrow (animated).
         */
        this.hideArrow = false;
        /**
         * Hide the background.
         */
        this.hideBackground = false;
        /**
         * Callback that will fire when the animation starts.
         */
        this.animationBeginCallback = () => undefined;
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.direction]: true
        };
    }
    render() {
        return (index.h("sdx-animation", { animationName: this.hideBackground ? "fade-out" : "fade-in", animationBeginCallback: this.animationBeginCallback }, index.h("div", { class: this.getComponentClassNames() }, index.h("div", { class: "arrow-container" }, index.h("sdx-animation", { animationName: this.hideArrow ? "scale-out" : "scale-in" }, index.h("div", { class: "arrow" }))))));
    }
};
Arrow.style = arrowCss;

exports.sdx_arrow = Arrow;
