System.register(["./p-08964242.system.js","./p-437fcc1c.system.js","./p-156c7e10.system.js"],(function(e){"use strict";var t,a,n,i,o,r;return{setters:[function(e){t=e.r;a=e.f;n=e.h;i=e.g},function(e){o=e.a},function(e){r=e.i}],execute:function(){var l='@charset "UTF-8";:host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.wrapper{position:relative}.wrapper .search-button,.wrapper .clear-button{position:absolute;top:0}.wrapper .search-button{right:0;padding:7px}.wrapper .clear-button{right:40px;padding:11px 16px}';var c=e("sdx_search",function(){function e(e){t(this,e);this.invokeSearchSubmitCallback=function(){return null};this.invokeValueChangeCallback=function(){return null};this.invokeChangeCallback=function(){return null};this.value="";this.placeholder="";this.srHint="";this.srHintForButton=""}e.prototype.valueChanged=function(){this.invokeAllChangeCallbacks()};e.prototype.searchSubmitCallbackChanged=function(){this.setInvokeSearchSubmitCallback()};e.prototype.changeCallbackChanged=function(){this.setInvokeChangeCallback()};e.prototype.valueChangeCallbackChanged=function(){this.setInvokeValueChangeCallback()};e.prototype.onWindowResizeThrottled=function(){var e=this;if(this.resizeTimer){clearTimeout(this.resizeTimer)}this.resizeTimer=setTimeout((function(){a(e.el)}),10)};e.prototype.componentWillLoad=function(){this.setInvokeSearchSubmitCallback();this.setInvokeChangeCallback();this.setInvokeValueChangeCallback()};e.prototype.submitSearch=function(){if(this.sdxInputEl){this.invokeSearchSubmitCallback(this.sdxInputEl.value)}};e.prototype.invokeAllChangeCallbacks=function(){this.invokeChangeCallback(this.value);this.invokeValueChangeCallback(this.value)};e.prototype.setInvokeSearchSubmitCallback=function(){this.invokeSearchSubmitCallback=o(this.searchSubmitCallback)};e.prototype.setInvokeValueChangeCallback=function(){this.invokeValueChangeCallback=o(this.valueChangeCallback)};e.prototype.setInvokeChangeCallback=function(){this.invokeChangeCallback=o(this.changeCallback)};e.prototype.isClearIconHidden=function(){return r()||!this.value.length};e.prototype.clear=function(){this.value=""};e.prototype.render=function(){var e=this;return n("div",{class:"wrapper"},n("sdx-input",{value:this.value,srHint:this.srHint,type:"search",placeholder:this.placeholder,hitEnterCallback:function(){return e.submitSearch()},inputCallback:function(t){return e.value=t},ref:function(t){return e.sdxInputEl=t},role:"search",inputStyle:{paddingRight:this.isClearIconHidden()?"48px":"88px"}}),n("div",{class:"search-button"},n("sdx-button",{theme:"transparent",onClick:function(){return e.submitSearch()},srHint:this.srHintForButton,iconName:"icon-search",iconSize:3})),n("div",{class:"clear-button"},n("sdx-animation",{animationName:this.isClearIconHidden()?"scale-out":"scale-in"},n("sdx-button",{theme:"transparent",onClick:function(){return e.clear()},iconName:"icon-close","aria-hidden":"true"}))))};Object.defineProperty(e.prototype,"el",{get:function(){return i(this)},enumerable:true,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{value:["valueChanged"],searchSubmitCallback:["searchSubmitCallbackChanged"],changeCallback:["changeCallbackChanged"],valueChangeCallback:["valueChangeCallbackChanged"]}},enumerable:true,configurable:true});return e}());c.style=l}}}));