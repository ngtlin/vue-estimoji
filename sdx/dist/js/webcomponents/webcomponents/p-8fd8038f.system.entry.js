System.register(["./p-08964242.system.js","./p-dea0be5d.system.js"],(function(t){"use strict";var e,o,n,r,i;return{setters:[function(t){e=t.r;o=t.h;n=t.g},function(t){r=t.g;i=t.m}],execute:function(){var s=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.toggle{padding:0;background-color:transparent;color:#086adb;border:none;font:inherit;outline:none;cursor:pointer}.toggle:hover,.toggle:focus{color:#0048CF}";var l=t("sdx_menu_flyout_toggle",function(){function t(t){e(this,t)}t.prototype.onClick=function(){var t;(t=this.toggle)===null||t===void 0?void 0:t.call(this)};t.prototype.handleKeyDown=function(t){var e;var o=t.key;if(o==="Spacebar"||o===" "||o==="Enter"){t.preventDefault();(e=this.toggle)===null||e===void 0?void 0:e.call(this)}};t.prototype.componentWillLoad=function(){var t;this.store=r(this);this.unsubscribe=i(this,this.store,["display","toggle"]);(t=this.store)===null||t===void 0?void 0:t.dispatch({type:"SET_TOGGLE_EL",toggleEl:this.el})};t.prototype.componentDidUnload=function(){var t,e;(t=this.store)===null||t===void 0?void 0:t.dispatch({type:"SET_TOGGLE_EL",toggleEl:undefined});(e=this.unsubscribe)===null||e===void 0?void 0:e.call(this)};t.prototype.getAriaExpanded=function(){return this.display==="open"?"true":"false"};t.prototype.render=function(){return o("button",{type:"button",class:"toggle","aria-expanded":this.getAriaExpanded()},o("slot",null))};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:true,configurable:true});return t}());l.style=s}}}));