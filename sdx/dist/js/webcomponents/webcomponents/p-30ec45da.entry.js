import{r as o,h as i}from"./p-95c9f71a.js";const e=class{constructor(i){o(this,i),this.isExpanded=!1,this.expandLabel="",this.collapseLabel=""}toggle(){this.isExpanded=!this.isExpanded}getAccordionStyles(){return{accordion:{border:"none"},header:{fontSize:"inherit",padding:"0"},body:{paddingTop:"12px"}}}render(){return i("sdx-accordion",{"arrow-position":"left",componentStyle:this.getAccordionStyles().accordion},i("sdx-accordion-item",null,i("sdx-accordion-item-header",{onClick:()=>this.toggle(),id:"id",buttonStyle:this.getAccordionStyles().header},i("span",null,this.isExpanded?this.collapseLabel:this.expandLabel)),i("sdx-accordion-item-body",{role:"region","aria-labelledby":"id",componentStyle:this.getAccordionStyles().body},i("slot",null))))}};e.style=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}sdx-accordion-item-header:hover span{color:#0048CF}sdx-accordion-item-header span{color:#086adb;-webkit-transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1);transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1)}";export{e as sdx_expand_and_collapse}