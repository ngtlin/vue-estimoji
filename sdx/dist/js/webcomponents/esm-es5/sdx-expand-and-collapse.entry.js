import { r as registerInstance, h } from './index-28757bf2.js';
var expandAndCollapseCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}sdx-accordion-item-header:hover span{color:#0048CF}sdx-accordion-item-header span{color:#086adb;-webkit-transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1)}";
var ExpandAndCollapse = /** @class */ (function () {
    function ExpandAndCollapse(hostRef) {
        registerInstance(this, hostRef);
        this.isExpanded = false;
        /**
         * Label that shows when the component is collapsed and ready to be expanded.
         */
        this.expandLabel = "";
        /**
         * Label that shows when the component is expanded and ready to be collapsed.
         */
        this.collapseLabel = "";
    }
    // TMP Fix until SDX-486 ("displayChangeCallback" should be implemented and used instead of onClick)
    ExpandAndCollapse.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    ExpandAndCollapse.prototype.getAccordionStyles = function () {
        return {
            accordion: {
                border: "none"
            },
            header: {
                fontSize: "inherit",
                padding: "0"
            },
            body: {
                paddingTop: "12px"
            }
        };
    };
    ExpandAndCollapse.prototype.render = function () {
        var _this = this;
        return (h("sdx-accordion", { "arrow-position": "left", componentStyle: this.getAccordionStyles().accordion }, h("sdx-accordion-item", null, h("sdx-accordion-item-header", { onClick: function () { return _this.toggle(); }, id: "id", buttonStyle: this.getAccordionStyles().header }, h("span", null, this.isExpanded ? this.collapseLabel : this.expandLabel)), h("sdx-accordion-item-body", { role: "region", "aria-labelledby": "id", componentStyle: this.getAccordionStyles().body }, h("slot", null)))));
    };
    return ExpandAndCollapse;
}());
ExpandAndCollapse.style = expandAndCollapseCss;
export { ExpandAndCollapse as sdx_expand_and_collapse };
