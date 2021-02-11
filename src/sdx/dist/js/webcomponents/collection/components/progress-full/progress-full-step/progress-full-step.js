import { Component, h, Prop, Element, Watch } from "@stencil/core";
import * as wcHelpers from "../../../core/helpers/webcomponent-helpers";
export class ProgressFullStep {
    constructor() {
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
        this.invokeStepClickCallback = wcHelpers.parseFunction(this.stepClickCallback);
    }
    render() {
        return (h("div", { class: "step-container" },
            h("div", { class: "progress-line-right" }),
            h("div", { class: "progress-line-left" }),
            h("div", { class: "button-container" },
                h("button", { type: "button", onClick: () => this.clicked() }, this.value)),
            h("br", { class: "br-hide" }),
            h("div", { onClick: () => this.clicked(), class: "progress-content" },
                h("slot", null))));
    }
    static get is() { return "sdx-progress-full-step"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["progress-full-step.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["progress-full-step.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        },
        "status": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Status",
                "resolved": "\"active\" | \"completed\" | \"disabled\" | \"none\"",
                "references": {
                    "Status": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "status",
            "reflect": false,
            "defaultValue": "\"none\""
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "StepPosition",
                "resolved": "\"first\" | \"last\" | \"middle\" | \"middle-left\" | \"middle-right\" | \"none\"",
                "references": {
                    "StepPosition": {
                        "location": "import",
                        "path": "../types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "\"none\""
        },
        "stepClickCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "(() => void) | string",
                "resolved": "(() => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Triggered when a user clicks on the button or description of a completed step."
            },
            "attribute": "step-click-callback",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "stepClickCallback",
            "methodName": "stepClickCallbackChanged"
        }]; }
}
