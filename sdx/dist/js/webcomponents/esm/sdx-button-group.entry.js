import { r as registerInstance, h, H as Host } from './index-28757bf2.js';

const buttonGroupCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host .component{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-direction:row-reverse;flex-direction:row-reverse;margin:-8px -8px}:host ::slotted(sdx-button){margin:8px 8px}@media (max-width: 479px){:host ::slotted(sdx-button){width:100%}}:host .fixed,:host .fullwidth{-ms-flex-direction:row;flex-direction:row}:host .fill{-ms-flex-wrap:nowrap;flex-wrap:nowrap}:host(.fill) ::slotted(sdx-button){width:100%;min-width:0;-ms-flex:0 1 auto;flex:0 1 auto}@media (max-width: 479px){:host(.fixed) ::slotted(sdx-button){width:auto}}:host(.fullwidth) ::slotted(sdx-button){width:100%}";

const ButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Defines how buttons are aligned, sized and distributed.
         */
        this.layout = "responsive";
    }
    getComponentClassNames() {
        return {
            component: true,
            [this.layout]: true
        };
    }
    render() {
        return (h(Host, { class: this.layout }, h("div", { class: this.getComponentClassNames() }, h("slot", null))));
    }
};
ButtonGroup.style = buttonGroupCss;

export { ButtonGroup as sdx_button_group };
