import { Component, h, Listen, Prop, Host } from "@stencil/core";
export class Button {
    constructor() {
        /**
         * Button theme. For further information about the different themes, see designers' section: https://sdx.swisscom.ch/components_-_buttons.html#design
         */
        this.theme = "primary";
        /**
         * Background theme. Use "dark" to make button colorless, whenever it is used on a colored or dark background (single color or image).
         */
        this.background = "light";
        /**
         * Button disabled.
         */
        this.disabled = false;
        /**
         * "href" when used as a link looking like a button.
         */
        this.href = "";
        /**
         * Button text.
         */
        this.label = "";
        /**
         * Which icon to display.
         */
        this.iconName = "";
        /**
         * Size of the displayed icon. Can only be modified when theme="transparent". Font-size will be adjusted automatically.
         */
        this.iconSize = 1;
        /**
         * Description text read by the screen reader. Will be appended to the button content.
         */
        this.srHint = "";
        /**
         * Button type.
         */
        this.type = "button";
    }
    onTouchStart() {
        // NOP - make sure touchstart is noticed. touchstart event needed for the animations (note: tracking on prod)
    }
    getHostClassNames() {
        return {
            transparent: this.theme === "transparent"
        };
    }
    getComponentClassNames() {
        return {
            component: true,
            "button-reset": true,
            [this.theme]: true,
            colorless: this.background === "dark",
            disabled: this.disabled,
            invalid: this.valid === false,
            "text-h4": this.getIconSize() > 4 // icons with size 5+ have a larger font-size
        };
    }
    getAriaExpanded() {
        if (this.ariaExpandedOnButton === true) {
            return "true";
        }
        else if (this.ariaExpandedOnButton === false) {
            return "false";
        }
        else {
            return undefined;
        }
    }
    // Make sure that only theme="transparent" allows other sizes
    getIconSize() {
        if (this.theme === "transparent") {
            return this.iconSize;
        }
        return 1;
    }
    render() {
        return (h(Host, { class: this.getHostClassNames() }, this.href
            ?
                h("a", { class: this.getComponentClassNames(), href: this.href, target: this.target },
                    this.iconName &&
                        h("sdx-icon", { iconName: this.iconName, size: this.getIconSize() }),
                    this.label,
                    " ",
                    h("span", { class: "sr-only" }, this.srHint))
            :
                h("button", { class: this.getComponentClassNames(), disabled: this.disabled, type: this.type, "aria-expanded": this.getAriaExpanded() },
                    this.iconName &&
                        h("sdx-icon", { iconName: this.iconName, size: this.getIconSize() }),
                    this.label,
                    " ",
                    h("span", { class: "sr-only" }, this.srHint))));
    }
    static get is() { return "sdx-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["button.css"]
    }; }
    static get properties() { return {
        "theme": {
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
                "text": "Button theme. For further information about the different themes, see designers' section: https://sdx.swisscom.ch/components_-_buttons.html#design"
            },
            "attribute": "theme",
            "reflect": false,
            "defaultValue": "\"primary\""
        },
        "background": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "BackgroundTheme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "BackgroundTheme": {
                        "location": "import",
                        "path": "../../core/types/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Background theme. Use \"dark\" to make button colorless, whenever it is used on a colored or dark background (single color or image)."
            },
            "attribute": "background",
            "reflect": false,
            "defaultValue": "\"light\""
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Button disabled."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "href": {
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
                "text": "\"href\" when used as a link looking like a button."
            },
            "attribute": "href",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "target": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "\"target\" when used as a link looking like a button."
            },
            "attribute": "target",
            "reflect": false
        },
        "label": {
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
                "text": "Button text."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "iconName": {
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
                "text": "Which icon to display."
            },
            "attribute": "icon-name",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "iconSize": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "Size",
                "resolved": "1 | 2 | 3 | 4 | 5 | 6",
                "references": {
                    "Size": {
                        "location": "import",
                        "path": "../icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of the displayed icon. Can only be modified when theme=\"transparent\". Font-size will be adjusted automatically."
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "1"
        },
        "srHint": {
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
                "text": "Description text read by the screen reader. Will be appended to the button content."
            },
            "attribute": "sr-hint",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "ariaExpandedOnButton": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Value for aria-expanded that will be applied to the button element. Used for buttons\nthat trigger expanding/collapsing such as an accordion, dropdown menu or tooltip."
            },
            "attribute": "aria-expanded-on-button",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonType",
                "resolved": "\"button\" | \"reset\" | \"submit\"",
                "references": {
                    "ButtonType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Button type."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"button\""
        },
        "valid": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "only used for icon-buttons within input fields such as numeric stepper, search, select, datepicker etc.",
                        "name": "private"
                    }],
                "text": ""
            },
            "attribute": "valid",
            "reflect": false
        }
    }; }
    static get listeners() { return [{
            "name": "touchstart",
            "method": "onTouchStart",
            "target": undefined,
            "capture": false,
            "passive": true
        }]; }
}
