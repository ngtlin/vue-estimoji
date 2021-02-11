'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');
const webcomponentHelpers = require('./webcomponent-helpers-9b098f73.js');

const progressFullStepCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host .step-container{position:relative}:host([position=first]) .progress-line-right,:host([position^=middle]) .progress-line-right{-webkit-transition:all 200ms ease;transition:all 200ms ease;width:35%;height:1px;position:absolute;top:12px;right:0}:host([position=last]) .progress-line-left,:host([position^=middle]) .progress-line-left{-webkit-transition:all 200ms ease;transition:all 200ms ease;width:35%;height:1px;position:absolute;top:12px;left:0}:host{display:inline-block;overflow:hidden;vertical-align:top}:host br.br-hide{visibility:hidden}:host button{border:1px solid #086adb;color:#086adb;border-radius:100%;width:24px;height:24px;outline:none;background-color:transparent;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;line-height:normal;font-family:inherit}:host button,:host .progress-content{cursor:default;letter-spacing:normal;text-align:center;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}:host .progress-content{font-weight:400;font-size:16px;word-wrap:break-word;white-space:normal}:host .button-container button{font-weight:600;display:-ms-inline-flexbox;display:inline-flex;font-size:14px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0}:host([status=active]) button{color:#fff;border-color:#086adb;background-color:#086adb}:host([status=active]) button:hover{color:#fff;border-color:#0048CF;background-color:#0048CF}:host([status=completed]) button,:host([status=completed]) .progress-content{cursor:pointer}:host([status=completed]) button{color:#fff;border-color:#1B8712;background-color:#1B8712}:host([status=completed]) button:hover{color:#fff;border-color:#0D6F2C;background-color:#0D6F2C}:host .progress-line-left,:host .progress-line-right{background:#adadad}:host([position=first]) .progress-line-left{background:none}:host([position=last]) .progress-line-right{background:none}:host([status=active]) .progress-line-left,:host([status=completed]) .progress-line-left{background:#1B8712}:host([status=completed]) .progress-line-right{background:#1B8712}";

const ProgressFullStep = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.invokeStepClickCallback = () => null;
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
    stepClickCallbackChanged() {
        this.setInvokeStepClickCallback();
    }
    componentWillLoad() {
        this.setInvokeStepClickCallback();
    }
    /**
     * Trigger click event when completed.
     */
    clicked() {
        if (this.status === "completed") {
            this.invokeStepClickCallback();
        }
    }
    setInvokeStepClickCallback() {
        this.invokeStepClickCallback = webcomponentHelpers.parseFunction(this.stepClickCallback);
    }
    render() {
        return (index.h("div", { class: "step-container" }, index.h("div", { class: "progress-line-right" }), index.h("div", { class: "progress-line-left" }), index.h("div", { class: "button-container" }, index.h("button", { type: "button", onClick: () => this.clicked() }, this.value)), index.h("br", { class: "br-hide" }), index.h("div", { onClick: () => this.clicked(), class: "progress-content" }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "stepClickCallback": ["stepClickCallbackChanged"]
    }; }
};
ProgressFullStep.style = progressFullStepCss;

exports.sdx_progress_full_step = ProgressFullStep;
