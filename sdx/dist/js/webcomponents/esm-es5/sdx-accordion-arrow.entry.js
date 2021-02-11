import { r as registerInstance, h } from './index-28757bf2.js';
var accordionArrowCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:none}:host([hover=true]){position:relative}:host([hover=true])::before,:host([hover=true])::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}:host([hover=true])::before{left:0}:host([hover=true])::after{left:6px}:host([arrow-position=right]),:host([arrow-position=left]),:host([arrow-position=center]){position:relative;top:4px;left:0;width:16px;height:16px;pointer-events:none;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}:host([arrow-position=right])::before,:host([arrow-position=right])::after,:host([arrow-position=left])::before,:host([arrow-position=left])::after,:host([arrow-position=center])::before,:host([arrow-position=center])::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#086adb;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}:host([arrow-position=right])::before,:host([arrow-position=left])::before,:host([arrow-position=center])::before{left:0}:host([arrow-position=right])::after,:host([arrow-position=left])::after,:host([arrow-position=center])::after{left:6px}:host([arrow-position=right])::before,:host([arrow-position=left])::before,:host([arrow-position=center])::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host([arrow-position=right])::after,:host([arrow-position=left])::after,:host([arrow-position=center])::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([hover=true][arrow-position=right]),:host([hover=true][arrow-position=left]),:host([hover=true][arrow-position=center]){position:relative}:host([hover=true][arrow-position=right])::before,:host([hover=true][arrow-position=right])::after,:host([hover=true][arrow-position=left])::before,:host([hover=true][arrow-position=left])::after,:host([hover=true][arrow-position=center])::before,:host([hover=true][arrow-position=center])::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:\"\"}:host([hover=true][arrow-position=right])::before,:host([hover=true][arrow-position=left])::before,:host([hover=true][arrow-position=center])::before{left:0}:host([hover=true][arrow-position=right])::after,:host([hover=true][arrow-position=left])::after,:host([hover=true][arrow-position=center])::after{left:6px}:host([direction=up][arrow-position=right])::before,:host([direction=up][arrow-position=left])::before,:host([direction=up][arrow-position=center])::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([direction=up][arrow-position=right])::after,:host([direction=up][arrow-position=left])::after,:host([direction=up][arrow-position=center])::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host([arrow-position=right]){display:inline-block;float:right}:host([arrow-position=left]){display:inline-block;float:left}:host([arrow-position=center]){display:table;margin:-13px auto 0 auto;float:none;top:6px}";
var AccordionArrow = /** @class */ (function () {
    function AccordionArrow(hostRef) {
        registerInstance(this, hostRef);
        /**
         * @private
         */
        this.direction = "down";
        /**
         * @private
         */
        this.hover = false;
        /**
         * @private
         */
        this.arrowPosition = "right";
    }
    AccordionArrow.prototype.render = function () {
        return (h("slot", null));
    };
    return AccordionArrow;
}());
AccordionArrow.style = accordionArrowCss;
export { AccordionArrow as sdx_accordion_arrow };
