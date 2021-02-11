import { r as registerInstance, h, H as Host } from './index-28757bf2.js';
var ribbonCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;position:relative}:host(.loop)>.wrapper>.ribbon-container{position:absolute;overflow:hidden;top:-5px}:host(.loop)>.wrapper>.ribbon-container .content{color:#fff;background-color:#a63297;text-align:center;position:absolute;width:calc(100% * 1.414);-webkit-transform-origin:bottom left;-moz-transform-origin:bottom left;-ms-transform-origin:bottom left;-o-transform-origin:bottom left;transform-origin:bottom left}:host(.loop)>.wrapper>.ribbon-container .content::before,:host(.loop)>.wrapper>.ribbon-container .content::after{content:\"\";position:absolute;bottom:-4px;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid #7f2879}:host(.loop)>.wrapper>.ribbon-container .content::before{left:0}:host(.loop)>.wrapper>.ribbon-container .content::after{right:0}:host(.small)>.wrapper>.slot{min-height:96px}:host(.normal)>.wrapper>.slot{min-height:112px}:host(.large)>.wrapper>.slot{min-height:128px}:host(.loop.small)>.wrapper>.ribbon-container{font-size:14px;width:96px;height:96px}:host(.loop.normal)>.wrapper>.ribbon-container{font-size:16px;width:112px;height:112px}:host(.loop.large)>.wrapper>.ribbon-container{font-size:18px;width:128px;height:128px}:host(.loop.left)>.wrapper>.ribbon-container{left:-5px}:host(.loop.left)>.wrapper>.ribbon-container .content{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);bottom:0}:host(.loop.right)>.wrapper>.ribbon-container{right:-5px}:host(.loop.right)>.wrapper>.ribbon-container .content{top:-24px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}:host(.bookmark)>.wrapper>.ribbon-container{position:absolute;top:6px;min-width:70px;background-color:#0eaba9;color:#fff}:host(.bookmark)>.wrapper>.ribbon-container::after{content:\"\";position:absolute;bottom:-8px;border-top:8px solid #0c847e}:host(.bookmark.right)>.wrapper>.ribbon-container{right:-8px}:host(.bookmark.right)>.wrapper>.ribbon-container::after{right:0;border-right:8px solid transparent}:host(.bookmark.left)>.wrapper>.ribbon-container{left:-8px}:host(.bookmark.left)>.wrapper>.ribbon-container::after{left:0;border-left:8px solid transparent}:host(.bookmark.small)>.wrapper>.ribbon-container{font-size:14px;padding:4px 8px 4px}:host(.bookmark.normal)>.wrapper>.ribbon-container{font-size:16px;padding:6px 8px 6px}:host(.bookmark.large)>.wrapper>.ribbon-container{font-size:18px;padding:8px 8px 8px}";
var Ribbon = /** @class */ (function () {
    function Ribbon(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Text content.
         */
        this.label = "Ribbon";
        /**
         * Look.
         */
        this.design = "loop";
        /**
         * Location.
         */
        this.position = "right";
        /**
         * Dimension.
         */
        this.size = "normal";
    }
    Ribbon.prototype.render = function () {
        return (h(Host, { class: this.design + " " + this.position + " " + this.size }, h("div", { class: "wrapper" }, h("div", { class: "slot" }, h("slot", null)), h("div", { class: "ribbon-container" }, this.design === "loop"
            ? (h("div", { class: "content" }, this.label))
            : (this.label)))));
    };
    return Ribbon;
}());
Ribbon.style = ribbonCss;
export { Ribbon as sdx_ribbon };
