'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-933d28ad.js');

const accordionItemSectionCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{padding-top:16px;padding-bottom:16px;padding-left:15px;padding-right:15px;display:inline-block;position:relative}";

const AccordionItemSection = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("slot", null));
    }
};
AccordionItemSection.style = accordionItemSectionCss;

exports.sdx_accordion_item_section = AccordionItemSection;
