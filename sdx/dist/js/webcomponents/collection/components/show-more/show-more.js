import { Component, h, Prop, State, Watch } from "@stencil/core";
import * as wcHelpers from "../../core/helpers/webcomponent-helpers";
export class ShowMore {
    constructor() {
        this.start = 1;
        this.invokeIncrementCallback = () => null;
        /**
         * How many items are currently shown (counter).
         */
        this.currentlyDisplayedItems = 0;
        /**
         * How many items to add by each turn.
         */
        this.incrementBy = 10;
        /**
         * Number of items to start from.
         */
        this.initialItems = 0;
        /**
         * Number of all items in total.
         */
        this.totalItems = 0;
        /**
         * Label for "from".
         */
        this.fromLabel = "from";
        /**
         * Label for "more".
         */
        this.moreLabel = "Show more";
        /**
         * Button theme.
         */
        this.buttonTheme = "primary";
    }
    totalItemsChanged() {
        this.reset();
    }
    incrementCallbackChanged() {
        this.setInvokeIncrementCallback();
    }
    componentWillLoad() {
        this.setInvokeIncrementCallback();
        this.reset();
    }
    reset() {
        this.currentlyDisplayedItems = this.initialItems || this.incrementBy;
    }
    showMore() {
        const deltaToMax = this.totalItems - this.currentlyDisplayedItems;
        // Reached total items
        if (deltaToMax <= 0) {
            return;
        }
        if (deltaToMax > this.incrementBy) {
            this.currentlyDisplayedItems += this.incrementBy;
        }
        else {
            this.currentlyDisplayedItems += deltaToMax;
        }
        this.invokeIncrementCallback(this.currentlyDisplayedItems);
    }
    setInvokeIncrementCallback() {
        this.invokeIncrementCallback = wcHelpers.parseFunction(this.incrementCallback);
    }
    render() {
        return (h("div", null,
            h("span", { class: "count" },
                this.start,
                " \u2013 ",
                this.currentlyDisplayedItems,
                " ",
                this.fromLabel,
                " ",
                this.totalItems),
            h("sdx-button", { label: this.moreLabel, onClick: () => this.showMore(), theme: this.buttonTheme })));
    }
    static get is() { return "sdx-show-more"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["show-more.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["show-more.css"]
    }; }
    static get properties() { return {
        "incrementBy": {
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
                "tags": [],
                "text": "How many items to add by each turn."
            },
            "attribute": "increment-by",
            "reflect": false,
            "defaultValue": "10"
        },
        "initialItems": {
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
                "tags": [],
                "text": "Number of items to start from."
            },
            "attribute": "initial-items",
            "reflect": false,
            "defaultValue": "0"
        },
        "totalItems": {
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
                "tags": [],
                "text": "Number of all items in total."
            },
            "attribute": "total-items",
            "reflect": false,
            "defaultValue": "0"
        },
        "fromLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label for \"from\"."
            },
            "attribute": "from-label",
            "reflect": false,
            "defaultValue": "\"from\""
        },
        "moreLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label for \"more\"."
            },
            "attribute": "more-label",
            "reflect": false,
            "defaultValue": "\"Show more\""
        },
        "incrementCallback": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "((count: number) => void) | string",
                "resolved": "((count: number) => void) | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Triggered when the number of displayed items has incremented."
            },
            "attribute": "increment-callback",
            "reflect": false
        },
        "buttonTheme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonTheme",
                "resolved": "\"confirm\" | \"primary\" | \"secondary\" | \"transparent\"",
                "references": {
                    "ButtonTheme": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Button theme."
            },
            "attribute": "button-theme",
            "reflect": false,
            "defaultValue": "\"primary\""
        }
    }; }
    static get states() { return {
        "currentlyDisplayedItems": {}
    }; }
    static get watchers() { return [{
            "propName": "totalItems",
            "methodName": "totalItemsChanged"
        }, {
            "propName": "incrementCallback",
            "methodName": "incrementCallbackChanged"
        }]; }
}
