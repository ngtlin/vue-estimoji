System.register(["./p-08964242.system.js","./p-437fcc1c.system.js"],(function(t){"use strict";var e,n,i;return{setters:[function(t){e=t.r;n=t.h},function(t){i=t.a}],execute:function(){var s=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host>div{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host>div .count{margin-right:24px}@media (max-width: 1279px){:host>div{-ms-flex-flow:column;flex-flow:column}:host>div .count{margin-bottom:8px;margin-right:0}}";var r=t("sdx_show_more",function(){function t(t){e(this,t);this.start=1;this.invokeIncrementCallback=function(){return null};this.currentlyDisplayedItems=0;this.incrementBy=10;this.initialItems=0;this.totalItems=0;this.fromLabel="from";this.moreLabel="Show more";this.buttonTheme="primary"}t.prototype.totalItemsChanged=function(){this.reset()};t.prototype.incrementCallbackChanged=function(){this.setInvokeIncrementCallback()};t.prototype.componentWillLoad=function(){this.setInvokeIncrementCallback();this.reset()};t.prototype.reset=function(){this.currentlyDisplayedItems=this.initialItems||this.incrementBy};t.prototype.showMore=function(){var t=this.totalItems-this.currentlyDisplayedItems;if(t<=0){return}if(t>this.incrementBy){this.currentlyDisplayedItems+=this.incrementBy}else{this.currentlyDisplayedItems+=t}this.invokeIncrementCallback(this.currentlyDisplayedItems)};t.prototype.setInvokeIncrementCallback=function(){this.invokeIncrementCallback=i(this.incrementCallback)};t.prototype.render=function(){var t=this;return n("div",null,n("span",{class:"count"},this.start," – ",this.currentlyDisplayedItems," ",this.fromLabel," ",this.totalItems),n("sdx-button",{label:this.moreLabel,onClick:function(){return t.showMore()},theme:this.buttonTheme}))};Object.defineProperty(t,"watchers",{get:function(){return{totalItems:["totalItemsChanged"],incrementCallback:["incrementCallbackChanged"]}},enumerable:true,configurable:true});return t}());r.style=s}}}));