import { r as registerInstance, h } from './index-28757bf2.js';

const accordionItemSectionCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{padding-top:16px;padding-bottom:16px;padding-left:15px;padding-right:15px;display:inline-block;position:relative}";

const AccordionItemSection = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("slot", null));
    }
};
AccordionItemSection.style = accordionItemSectionCss;

export { AccordionItemSection as sdx_accordion_item_section };
