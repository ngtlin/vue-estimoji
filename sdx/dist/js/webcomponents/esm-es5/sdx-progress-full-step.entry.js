import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
var progressFullStepCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host .step-container{position:relative}:host([position=first]) .progress-line-right,:host([position^=middle]) .progress-line-right{-webkit-transition:all 200ms ease;transition:all 200ms ease;width:35%;height:1px;position:absolute;top:12px;right:0}:host([position=last]) .progress-line-left,:host([position^=middle]) .progress-line-left{-webkit-transition:all 200ms ease;transition:all 200ms ease;width:35%;height:1px;position:absolute;top:12px;left:0}:host{display:inline-block;overflow:hidden;vertical-align:top}:host br.br-hide{visibility:hidden}:host button{border:1px solid #086adb;color:#086adb;border-radius:100%;width:24px;height:24px;outline:none;background-color:transparent;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;line-height:normal;font-family:inherit}:host button,:host .progress-content{cursor:default;letter-spacing:normal;text-align:center;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}:host .progress-content{font-weight:400;font-size:16px;word-wrap:break-word;white-space:normal}:host .button-container button{font-weight:600;display:-ms-inline-flexbox;display:inline-flex;font-size:14px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0}:host([status=active]) button{color:#fff;border-color:#086adb;background-color:#086adb}:host([status=active]) button:hover{color:#fff;border-color:#0048CF;background-color:#0048CF}:host([status=completed]) button,:host([status=completed]) .progress-content{cursor:pointer}:host([status=completed]) button{color:#fff;border-color:#1B8712;background-color:#1B8712}:host([status=completed]) button:hover{color:#fff;border-color:#0D6F2C;background-color:#0D6F2C}:host .progress-line-left,:host .progress-line-right{background:#adadad}:host([position=first]) .progress-line-left{background:none}:host([position=last]) .progress-line-right{background:none}:host([status=active]) .progress-line-left,:host([status=completed]) .progress-line-left{background:#1B8712}:host([status=completed]) .progress-line-right{background:#1B8712}";
var ProgressFullStep = /** @class */ (function () {
    function ProgressFullStep(hostRef) {
        registerInstance(this, hostRef);
        this.invokeStepClickCallback = function () { return null; };
        /**
         * @private
         */
        this.value = 0;
        /**
         * @private
         */
        this.status = "none";
        /**
         * @private
         */
        this.position = "none";
    }
    ProgressFullStep.prototype.stepClickCallbackChanged = function () {
        this.setInvokeStepClickCallback();
    };
    ProgressFullStep.prototype.componentWillLoad = function () {
        this.setInvokeStepClickCallback();
    };
    /**
     * Trigger click event when completed.
     */
    ProgressFullStep.prototype.clicked = function () {
        if (this.status === "completed") {
            this.invokeStepClickCallback();
        }
    };
    ProgressFullStep.prototype.setInvokeStepClickCallback = function () {
        this.invokeStepClickCallback = parseFunction(this.stepClickCallback);
    };
    ProgressFullStep.prototype.render = function () {
        var _this = this;
        return (h("div", { class: "step-container" }, h("div", { class: "progress-line-right" }), h("div", { class: "progress-line-left" }), h("div", { class: "button-container" }, h("button", { type: "button", onClick: function () { return _this.clicked(); } }, this.value)), h("br", { class: "br-hide" }), h("div", { onClick: function () { return _this.clicked(); }, class: "progress-content" }, h("slot", null))));
    };
    Object.defineProperty(ProgressFullStep.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressFullStep, "watchers", {
        get: function () {
            return {
                "stepClickCallback": ["stepClickCallbackChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return ProgressFullStep;
}());
ProgressFullStep.style = progressFullStepCss;
export { ProgressFullStep as sdx_progress_full_step };
