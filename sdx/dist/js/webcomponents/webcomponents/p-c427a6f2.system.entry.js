var __awaiter=this&&this.__awaiter||function(e,t,i,o){function n(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,r){function s(e){try{l(o.next(e))}catch(t){r(t)}}function a(e){try{l(o["throw"](e))}catch(t){r(t)}}function l(e){e.done?i(e.value):n(e.value).then(s,a)}l((o=o.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},o,n,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(e){return function(t){return l([e,t])}}function l(s){if(o)throw new TypeError("Generator is already executing.");while(i)try{if(o=1,n&&(r=s[0]&2?n["return"]:s[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;if(n=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:i.label++;return{value:s[1],done:false};case 5:i.label++;n=s[1];s=[0];continue;case 7:s=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){i=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(s[0]===6&&i.label<r[1]){i.label=r[1];r=s;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(s);break}if(r[2])i.ops.pop();i.trys.pop();continue}s=t.call(e,i)}catch(a){s=[6,a];n=0}finally{o=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,i=arguments.length;t<i;t++)e+=arguments[t].length;for(var o=Array(e),n=0,t=0;t<i;t++)for(var r=arguments[t],s=0,a=r.length;s<a;s++,n++)o[n]=r[s];return o};System.register(["./p-08964242.system.js","./p-437fcc1c.system.js","./p-9bcef615.system.js","./p-0fbe9704.system.js","./p-463bf629.system.js","./p-dea0be5d.system.js","./p-156c7e10.system.js","./p-50f9a219.system.js"],(function(e){"use strict";var t,i,o,n,r,s,a,l,p,c,h,u,d,f,b,m,g,v;return{setters:[function(e){t=e.r;i=e.f;o=e.h;n=e.H;r=e.g},function(e){s=e.s;a=e.a;l=e.g;p=e.b;c=e.d},function(e){h=e.a},function(){},function(e){u=e.t},function(e){d=e.c;f=e.m},function(e){b=e.i},function(e){m=e.c;g=e.a;v=e.u}],execute:function(){var E=m((function(e,t){!function(e,i){i(t)}(g,(function(e){function t(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var i=!1;if("undefined"!=typeof window){var o={get passive(){i=!0}};window.addEventListener("testPassive",null,o),window.removeEventListener("testPassive",null,o)}var n="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),r=[],s=!1,a=-1,l=void 0,p=void 0,c=function(e){return r.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},h=function(e){var t=e||window.event;return!!c(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},u=function(){setTimeout((function(){void 0!==p&&(document.body.style.paddingRight=p,p=void 0),void 0!==l&&(document.body.style.overflow=l,l=void 0)}))};e.disableBodyScroll=function(e,o){if(n){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(e&&!r.some((function(t){return t.targetElement===e}))){var u={targetElement:e,options:o||{}};r=[].concat(t(r),[u]),e.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var i,o,n,r;1===t.targetTouches.length&&(o=e,r=(i=t).targetTouches[0].clientY-a,!c(i.target)&&(o&&0===o.scrollTop&&0<r?h(i):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?h(i):i.stopPropagation()))},s||(document.addEventListener("touchmove",h,i?{passive:!1}:void 0),s=!0)}}else{f=o,setTimeout((function(){if(void 0===p){var e=!!f&&!0===f.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(p=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===l&&(l=document.body.style.overflow,document.body.style.overflow="hidden")}));var d={targetElement:e,options:o||{}};r=[].concat(t(r),[d])}var f},e.clearAllBodyScrollLocks=function(){n?(r.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),s&&(document.removeEventListener("touchmove",h,i?{passive:!1}:void 0),s=!1),r=[],a=-1):(u(),r=[])},e.enableBodyScroll=function(e){if(n){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");e.ontouchstart=null,e.ontouchmove=null,r=r.filter((function(t){return t.targetElement!==e})),s&&0===r.length&&(document.removeEventListener("touchmove",h,i?{passive:!1}:void 0),s=!1)}else(r=r.filter((function(t){return t.targetElement!==e}))).length||u()}}))}));var y=v(E);var w=function(e,t){if(e===void 0){e={}}switch(t.type){case"SET_SELECTION_BATCH":return Object.assign(Object.assign({},e),{selectionBatch:t.optionEls});case"COMMIT_SELECTION_BATCH":var i=e.selectionSorted;if(e.selection!==e.selectionBatch){i=e.selectionBatch.concat().sort((function(t,i){var o=e.optionElsSorted.indexOf(t);var n=e.optionElsSorted.indexOf(i);if(o>n){return 1}if(o<n){return-1}return 0}))}return Object.assign(Object.assign({},e),{selection:e.selectionBatch,selectionSorted:i});case"SELECT":var o=e.selectionBatch;if(t.optionEl){if(e.multiple){var n=o.indexOf(t.optionEl);var r=n>-1;if(r||t.strategy==="remove"){o=o.filter((function(e){return e!==t.optionEl}))}else{o=o.concat(t.optionEl)}}else{var r=o[0]===t.optionEl;if(r){if(t.strategy==="remove"){o=[]}}else{if(t.strategy==="add"){o=[t.optionEl]}}}}else{if(o.length){o=[]}}return Object.assign(Object.assign({},e),{selectionBatch:o});case"SET_MULTIPLE":return Object.assign(Object.assign({},e),{multiple:t.multiple});case"SET_DIRECTION":return Object.assign(Object.assign({},e),{direction:t.direction});case"SET_SELECT":return Object.assign(Object.assign({},e),{select:t.select});case"SET_ANIMATION_DURATION":return Object.assign(Object.assign({},e),{animationDuration:t.animationDuration});case"TOGGLE_OPTION_EL":return Object.assign(Object.assign({},e),{optionElsBatch:u(e.optionElsBatch,t.optionEl)});case"TOGGLE_OPTGROUP_EL":return Object.assign(Object.assign({},e),{optgroupElsBatch:u(e.optgroupElsBatch,t.optgroupEl)});case"COMMIT_OPTION_ELS_BATCH":var a=e.optionElsSorted;if(e.optionEls!==e.optionElsBatch){a=__spreadArrays(e.optionElsBatch).sort(s)}return Object.assign(Object.assign({},e),{optionEls:e.optionElsBatch,optionElsSorted:a});case"COMMIT_OPTGROUP_ELS_BATCH":return Object.assign(Object.assign({},e),{optgroupEls:e.optgroupElsBatch});case"SET_FILTER":return Object.assign(Object.assign({},e),{filter:t.filter});case"SET_FILTER_FUNCTION":return Object.assign(Object.assign({},e),{filterFunction:t.filterFunction});default:return e}};var C=':host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}label{display:block;margin-bottom:4px;cursor:text;color:#666;font-size:16px}:host{outline:none}.component .wrapper{position:relative}.component .wrapper .header-wrapper{overflow:hidden;background:#fff;color:#333;border-radius:5px;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header{position:relative}.component .wrapper .header-wrapper .header .selection,.component .wrapper .header-wrapper .header .thumb{-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1)}.component .wrapper .header-wrapper .header .thumb{width:30px;position:absolute;right:-1px;top:-1px;bottom:-1px;pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.component .wrapper .header-wrapper .header .thumb>.icon{position:relative;width:100%;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}.component .wrapper .header-wrapper .header .thumb>.icon::before,.component .wrapper .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#086adb;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:""}.component .wrapper .header-wrapper .header .thumb>.icon::before{left:0}.component .wrapper .header-wrapper .header .thumb>.icon::after{left:6px}.component .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component .wrapper .list-container{-webkit-overflow-scrolling:touch;overflow-y:auto;background:#fff;position:absolute;left:0;right:0;z-index:999999;-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1), inset 0 0 0 1px #d6d6d6;-webkit-backface-visibility:hidden;backface-visibility:hidden;outline:none}.component .wrapper .list-container .list{overflow:hidden}.component .wrapper .list-container .list .no-matches-found{height:48px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 16px;color:#bbb}.component.top .wrapper .list-container{margin-bottom:-1px}.component.bottom .wrapper .list-container{margin-top:-1px}.component.open .wrapper .header-wrapper,.component.opening .wrapper .header-wrapper{-webkit-box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1);box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.1)}.component.open .wrapper .header-wrapper .header .thumb>.icon::before,.component.opening .wrapper .header-wrapper .header .thumb>.icon::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.component.open .wrapper .header-wrapper .header .thumb>.icon::after,.component.opening .wrapper .header-wrapper .header .thumb>.icon::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.component.open.top .wrapper .header-wrapper,.component.opening.top .wrapper .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.open.top .wrapper .list-container,.component.open.top .wrapper .list-container .list,.component.opening.top .wrapper .list-container,.component.opening.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.open.bottom .wrapper .header-wrapper,.component.opening.bottom .wrapper .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.open.bottom .wrapper .list-container,.component.open.bottom .wrapper .list-container .list,.component.opening.bottom .wrapper .list-container,.component.opening.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.closing.top .header-wrapper{border-top-left-radius:0;border-top-right-radius:0}.component.closing.top .wrapper .list-container,.component.closing.top .wrapper .list-container .list{border-radius:5px 5px 0 0}.component.closing.bottom .header-wrapper{border-bottom-left-radius:0;border-bottom-right-radius:0}.component.closing.bottom .wrapper .list-container,.component.closing.bottom .wrapper .list-container .list{border-radius:0 0 5px 5px}.component.disabled .label,.component.disabled .wrapper,.component.loading .label,.component.loading .wrapper{pointer-events:none}.component.disabled{cursor:not-allowed}.component.disabled .label,.component.disabled .wrapper .header-wrapper .header .thumb{opacity:0.4}.component.loading sdx-loading-spinner{position:relative;right:8px}.component:not(.disabled):not(.loading) .header-wrapper .header{cursor:pointer}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon{position:relative}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before,.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#0048CF;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:""}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component:not(.disabled):not(.loading):not(.autocomplete) .header-wrapper .header:hover .thumb>.icon::after{left:6px}.component.focus sdx-validation-message{display:none}.component.dark .label{color:#fff}.component.autocomplete:not(.loading) .wrapper .header-wrapper .header{padding-right:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#d12;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:""}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header .thumb>.icon::after{left:6px}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon{position:relative}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before,.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{position:absolute;top:50%;-webkit-transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);transition:all 200ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#be0000 !important;width:10px;height:2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;content:""}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::before{left:0}.component.invalid:not(.focus) .header-wrapper .header:hover .thumb>.icon::after{left:6px}';var k=e("sdx_select",function(){function e(e){t(this,e);this.invokeSelectCallback=function(){return null};this.invokeChangeCallback=function(){return null};this.invokeFocusCallback=function(){return null};this.invokeBlurCallback=function(){return null};this.direction="bottom";this.clicking=false;this.placeholderWhenOpened=null;this.componentChildrenWillLoadComplete=false;this.componentDidLoadComplete=false;this.hasFilterInputElFocus=false;this.hadFilterInputElFocus=false;this.lightDOMHiddenFormInputEls=[];this.blockScrollingWhenOpened=false;this.valueChangedInProgress=false;this.selectionSortedChangedInProgress=false;this.filter="";this.display="closed";this.foundMatches=0;this.focussed=false;this.filterInputElValue="";this.placeholder="";this.multiple=false;this.label="";this.srHint="";this.disabled=false;this.loading=false;this.keyboardBehavior="focus";this.filterable=false;this.noMatchesFoundLabel="No matches found...";this.backgroundTheme="light";this.value=[];this.name=undefined;this.required=false;this.animated=true}e.prototype.valueChanged=function(){if(this.isAutocomplete()){var e=this.value[0]||"";this.store.dispatch({type:"SET_FILTER",filter:e});this.filterInputElValue=e;this.updateHiddenFormInputEl();this.invokeChangeCallback(this.value);return}var t=this.getByValues(this.value),i=t.validValues,o=t.validatedValues,n=t.optionEls;this.valueChangedInProgress=true;if(!i){this.value=o;return}this.updateHiddenFormInputEl();if(this.componentDidLoadComplete){this.invokeChangeCallback(this.value)}if(!this.selectionSortedChangedInProgress){this.store.dispatch({type:"SET_SELECTION_BATCH",optionEls:n});this.store.dispatch({type:"COMMIT_SELECTION_BATCH"})}if(this.componentDidLoadComplete){this.invokeSelectCallback(this.value)}this.valueChangedInProgress=false};e.prototype.selectionSortedChanged=function(){if(!this.componentChildrenWillLoadComplete){return}this.selectionSortedChangedInProgress=true;if(this.optionElsSorted.length&&!this.selectionSorted.length&&!this.placeholder){this.store.dispatch({type:"SELECT",optionEl:this.optionElsSorted[0],strategy:"add"});this.store.dispatch({type:"COMMIT_SELECTION_BATCH"})}if(!this.valueChangedInProgress){var e=this.getByValues(this.selectionSorted.map((function(e){return e.value}))).validatedValues;this.value=e}if(this.isFilterable()){this.resetFilterInputEl()}this.selectionSortedChangedInProgress=false};e.prototype.selectCallbackChanged=function(){this.setInvokeSelectCallback()};e.prototype.changeCallbackChanged=function(){this.setInvokeChangeCallback()};e.prototype.focusCallbackChanged=function(){this.setInvokeFocusCallback()};e.prototype.blurCallbackChanged=function(){this.setInvokeBlurCallback()};e.prototype.placeholderChanged=function(){this.resetFilter()};e.prototype.nameChanged=function(){this.updateHiddenFormInputEl()};e.prototype.filterFunctionChanged=function(){this.setFilterFunction()};e.prototype.multipleChanged=function(){this.store.dispatch({type:"SET_MULTIPLE",multiple:this.multiple})};e.prototype.onFocus=function(){this.focussed=true};e.prototype.onMouseDown=function(){this.clicking=true};e.prototype.onMouseUp=function(){this.clicking=false};e.prototype.onBlur=function(){if(!this.clicking){this.close()}this.focussed=false};e.prototype.onWindowClick=function(e){if(!this.isSelectEl(e.target)){this.close()}};e.prototype.onKeyDown=function(e){if(!this.focussed){return}switch(e.which){case 32:var t=this.el.shadowRoot;if(!t.activeElement||t.activeElement!==this.filterInputEl){e.preventDefault();if(this.isOpenOrOpening()&&!this.multiple&&this.focussedEl){this.focussedEl.click()}else{this.toggle()}}break;case 13:e.preventDefault();if(this.focussedEl){this.focussedEl.click()}break;case 38:e.preventDefault();this.setFocussedEl("previous");if(this.hasVisibleOptionEls()){this.open()}break;case 40:e.preventDefault();this.setFocussedEl("next");if(this.hasVisibleOptionEls()){this.open()}break;case 27:this.close();break;default:var i=e.key.toLowerCase();var o=i.length===1;if(o){if(!this.isFilterable()){this.setFocussedElByFirstLetter(i)}}}};e.prototype.getSelection=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){return[2,this.value]}))}))};e.prototype.toggle=function(){var e=this;return new Promise((function(t){if(e.isAutocomplete()){if(e.isValidAutocomplete(e.filterInputElValue)){e.open().then(t)}else{t()}return}if(e.isOpenOrOpening()){e.close().then(t)}else if(e.isClosedOrClosing()){e.open().then(t)}else{t()}}))};e.prototype.open=function(){var e=this;return new Promise((function(t){if(!e.isClosedOrClosing()){t();return}if(e.blockScrollingWhenOpened){y.disableBodyScroll(e.listContainerEl,{allowTouchMove:function(e){var t=e;while(t&&t!==document.body){if(t.classList.contains("list-container")){if(t.scrollHeight>t.clientHeight){return true}}t=t.parentNode}return false}})}e.placeholderWhenOpened=e.showPlaceholder();e.positionListContainerEl();e.display="opening";h({targets:e.listContainerEl,scaleY:1,opacity:1,duration:e.animationDuration,easing:"cubicBezier(0.550, 0.085, 0.320, 1)",complete:function(){e.display="open";if(e.listContainerEl){e.listContainerEl.style.transform=""}t()}})}))};e.prototype.close=function(){var e=this;return new Promise((function(t){if(e.display!=="open"){t();return}if(e.blockScrollingWhenOpened){y.enableBodyScroll(e.listContainerEl)}e.display="closing";e.setFocussedEl(null);h({targets:e.listContainerEl,scaleY:0,opacity:.2,duration:e.animationDuration,easing:"cubicBezier(0.550, 0.085, 0.320, 1)",complete:function(){e.display="closed";e.placeholderWhenOpened=null;if(e.isKeyboardBehavior("filter")){e.filterInputEl.blur()}t()}})}))};e.prototype.componentWillLoad=function(){this.updateHiddenFormInputEl();this.store=d(this,w,this.getInitialState());this.unsubscribe=f(this,this.store,["selectionBatch","selectionSorted","animationDuration","optionElsSorted","optgroupEls","filter"]);this.store.dispatch({type:"SET_MULTIPLE",multiple:this.multiple});this.store.dispatch({type:"SET_SELECT",select:this.select.bind(this)});this.store.dispatch({type:"SET_ANIMATION_DURATION",animationDuration:this.animationDuration});this.setInvokeSelectCallback();this.setInvokeChangeCallback();this.setInvokeFocusCallback();this.setInvokeBlurCallback();this.setFilterFunction();this.resetFilterInputEl()};e.prototype.componentDidLoad=function(){this.componentChildrenWillLoadComplete=true;this.store.dispatch({type:"COMMIT_OPTION_ELS_BATCH"});this.store.dispatch({type:"COMMIT_OPTGROUP_ELS_BATCH"});if(this.selectionBatch.length){this.store.dispatch({type:"COMMIT_SELECTION_BATCH"})}else{var e=this.getByValues(this.value),t=e.validValues,i=e.optionEls;if(t){this.store.dispatch({type:"SET_SELECTION_BATCH",optionEls:i});this.store.dispatch({type:"COMMIT_SELECTION_BATCH"})}}this.listContainerEl.style.opacity=".2";this.listContainerEl.style.transform="scaleY(0)";this.positionListContainerEl();this.componentDidLoadComplete=true};e.prototype.componentDidUpdate=function(){this.store.dispatch({type:"COMMIT_OPTION_ELS_BATCH"});this.store.dispatch({type:"COMMIT_OPTGROUP_ELS_BATCH"});this.store.dispatch({type:"COMMIT_SELECTION_BATCH"})};e.prototype.componentDidUnload=function(){this.unsubscribe()};e.prototype.getInitialState=function(){var e=[];var t=[];var i=[];return{selection:e,selectionBatch:e,selectionSorted:e,multiple:false,direction:"bottom",select:function(){return null},animationDuration:this.animated?200:0,optionEls:t,optionElsBatch:t,optionElsSorted:t,optgroupEls:i,optgroupElsBatch:i,filter:"",filterFunction:function(){return true}}};e.prototype.resetFilter=function(){if(this.isFilterable()){this.resetFilterInputEl();this.clearFilter()}};e.prototype.setFilterFunction=function(){this.store.dispatch({type:"SET_FILTER_FUNCTION",filterFunction:this.optionElMatchesFilter.bind(this)})};e.prototype.resetFilterInputEl=function(){this.filterInputElValue=this.getFormattedSelection()};e.prototype.clearFilter=function(){this.store.dispatch({type:"SET_FILTER",filter:""})};e.prototype.positionListContainerEl=function(){if(!(this.componentEl&&this.wrapperEl&&this.listContainerEl)){return}this.listContainerEl.style.maxHeight=this.getMaxHeight()||"none";var e=this.wrapperEl.getBoundingClientRect();var t=this.listContainerEl.clientHeight;var i=e.top-k.minSpaceToWindow;var o=innerHeight-e.bottom-k.minSpaceToWindow;var n=this.listContainerEl.style.maxHeight;if(o>=t){this.direction="bottom"}else if(i>=t){this.direction="top"}else if(i>o){n=i+"px";this.direction="top"}else{n=o+"px";this.direction="bottom"}this.listContainerEl.style.maxHeight=n;if(this.direction==="bottom"){this.listContainerEl.style.bottom="auto"}else{this.listContainerEl.style.bottom=this.wrapperEl.clientHeight+"px"}this.listContainerEl.style.transformOrigin=this.direction==="top"?"0 100%":"50% 0";this.store.dispatch({type:"SET_DIRECTION",direction:this.direction})};e.prototype.defaultFilterFunction=function(e,t){var i=e.textContent;if(!i){return false}return i.toLowerCase().indexOf(t.toLowerCase())>-1};e.prototype.optionElMatchesFilter=function(e,t){var o=this.defaultFilterFunction;if(this.filterFunction){o=a(this.filterFunction)}var n=o(e,t);if(this.isAutocomplete()&&!t){n=false}if(this.isAutocomplete()){var r=this.el.querySelectorAll("sdx-select-option");var s=0;for(var l=0;l<r.length;l++){var p=r[l];if(e!==p&&p.style.display!=="none"){s++}}if(b()&&s>=k.maxAutocompleteOptionsDesktop||!b()&&s>=k.maxAutocompleteOptionsMobile){n=false}}i(this.el);return n};e.prototype.isValidFilter=function(e){return e.length>=2&&e!==this.getFormattedSelection()};e.prototype.isValidAutocomplete=function(e){return e.length>=3};e.prototype.setFocussedEl=function(e){for(var t=0;t<this.optionElsSorted.length;t++){var i=this.optionElsSorted[t];i.classList.remove("focus")}if(e===null){delete this.focussedEl;return}if(e==="previous"||e==="next"){var o=this.selectionSorted[this.selectionSorted.length-1];var n=this.focussedEl||o;if(e==="previous"){var r=l(this.optionElsSorted,n);var s=0;while(r!==n&&(r.disabled||r.style.display==="none")&&s<this.optionElsSorted.length){r=l(this.optionElsSorted,r);s++}this.focussedEl=r}else{var a=p(this.optionElsSorted,n);var s=0;while(a!==n&&(a.disabled||a.style.display==="none")&&s<this.optionElsSorted.length){a=p(this.optionElsSorted,a);s++}this.focussedEl=a}}else{this.focussedEl=e}if(this.focussedEl){this.focussedEl.classList.add("focus");this.scrollToOption(this.focussedEl)}};e.prototype.scrollToOption=function(e){var t=this.listContainerEl;var i=e.getBoundingClientRect();var o=t.getBoundingClientRect();var n=i.top>=o.top&&i.bottom<=o.top+t.clientHeight;if(!n){t.scrollTop=i.top+t.scrollTop-o.top}};e.prototype.getOptionsByFirstLetter=function(e){var t=[];for(var i=0;i<this.optionElsSorted.length;i++){var o=this.optionElsSorted[i];if(o.textContent&&o.textContent.toLowerCase().charAt(0)===e){t.push(o)}}return t};e.prototype.setFocussedElByFirstLetter=function(e){var t=this.getOptionsByFirstLetter(e);if(t.length){var i=0;if(this.focussedEl){var o=t.indexOf(this.focussedEl);if(o>-1){i=o}}var n=t[i];if(n.disabled||n===this.focussedEl){for(var r=0;r<t.length;r++){n=p(t,t[i]);if(n.disabled){n=null}else{break}if(i<t.length){i++}else{i=0}}}if(n){this.setFocussedEl(n)}}};e.prototype.isSelectEl=function(e){return!!c(e,this.el)};e.prototype.showPlaceholder=function(){var e=!!this.selectionSorted.length&&!!this.placeholder&&!this.multiple&&!this.required;if(this.placeholderWhenOpened!==null){return this.placeholderWhenOpened}return e};e.prototype.getFormattedSelection=function(){return this.selectionSorted.length?this.selectionSorted.map((function(e){var t=e.textContent;return t?t.trim():""})).join(", "):""};e.prototype.setInvokeSelectCallback=function(){this.invokeSelectCallback=a(this.selectCallback)};e.prototype.setInvokeChangeCallback=function(){this.invokeChangeCallback=a(this.changeCallback)};e.prototype.setInvokeFocusCallback=function(){this.invokeFocusCallback=a(this.focusCallback)};e.prototype.setInvokeBlurCallback=function(){this.invokeBlurCallback=a(this.blurCallback)};e.prototype.getByValues=function(e){if(Array.isArray(e)){if(!e.length){return{validValues:true,validatedValues:e,optionEls:[]}}var t=e.filter((function(e){return e!==undefined}));if(!t.length){return{validValues:false,validatedValues:[],optionEls:[]}}var i=[];var o=[];var n=true;var r=function(e){var r=t[e];var a=s.optionElsSorted.find((function(e){return e.value===r}));if(a){if(s.multiple||!s.multiple&&e===0){o.push(a);i.push(a.value)}else{n=false}}};var s=this;for(var a=0;a<t.length;a++){r(a)}if(i.length===0){return{validValues:false,validatedValues:i,optionEls:o}}return{validValues:n,validatedValues:i,optionEls:o}}return{validValues:false,validatedValues:[],optionEls:[]}};e.prototype.onHeaderClick=function(e){var t=e.target;var i=!!c(t,this.filterInputEl);if(this.isFilterable()&&this.isOpenOrOpening()&&i&&!this.hadFilterInputElFocus);else{this.toggle()}this.hadFilterInputElFocus=this.hasFilterInputElFocus};e.prototype.onFilterInputElFocus=function(){this.hasFilterInputElFocus=true;this.invokeFocusCallback()};e.prototype.onFilterInputElBlur=function(){this.hasFilterInputElFocus=false;this.invokeBlurCallback()};e.prototype.onFilterInputElChange=function(e){this.filterInputElValue=e;if(this.isAutocomplete()){this.value=[e]}this.store.dispatch({type:"SET_FILTER",filter:this.isValidFilter(e)?e:""})};e.prototype.onFilterInputElInput=function(e){this.filterInputElValue=e;if(this.isKeyboardBehavior("filter")){if(this.isValidFilter(this.filter)){this.open()}}else if(this.isKeyboardBehavior("autocomplete")){if(this.isValidAutocomplete(e)){this.open()}else{this.close()}}};e.prototype.select=function(e,t,i){var o=this;if(i===void 0){i=false}if(this.multiple){if(e.disabled&&i){return}}else{if(e.isSelected()||e.disabled){if(i){this.close()}if(e.disabled){return}this.resetFilter()}}if(this.isAutocomplete()){if(t==="add"){this.filterInputElValue=e.el.textContent}}else{this.store.dispatch({type:"SELECT",optionEl:e.placeholder===true?null:e.el,strategy:t})}if(!this.multiple){if(!this.isAutocomplete()){this.resetFilterInputEl()}setTimeout((function(){var e=Promise.resolve();if(i){e=o.close()}e.then((function(){if(!o.isAutocomplete()){o.clearFilter()}}))}),this.animationDuration)}};e.prototype.updateHiddenFormInputEl=function(){var e=this;if(this.value&&this.name){this.lightDOMHiddenFormInputEls.forEach((function(t){e.el.removeChild(t)}));this.lightDOMHiddenFormInputEls=[];for(var t=0;t<this.value.length;t++){var i=this.value[t];var o=document.createElement("input");o.type="hidden";o.name=this.name;o.value=i;this.lightDOMHiddenFormInputEls.push(o);this.el.appendChild(o)}}};e.prototype.isFilterable=function(){return this.isKeyboardBehavior("filter")||this.isKeyboardBehavior("autocomplete")};e.prototype.isKeyboardBehavior=function(e){var t=e===this.keyboardBehavior;if(e==="filter"&&(t||this.filterable)){return true}return t};e.prototype.getMatchingOptionElsCount=function(){var e=this.el.querySelectorAll("sdx-select-option");var t=0;for(var i=0;i<e.length;i++){if(e[i].style.display!=="none"){t++}}return t};e.prototype.isAutocomplete=function(){return this.keyboardBehavior==="autocomplete"};e.prototype.hasVisibleOptionEls=function(){return this.optionElsSorted.some((function(e){return e.style.display!=="none"}))};e.prototype.isOpenOrOpening=function(){return this.display==="open"||this.display==="opening"};e.prototype.isClosedOrClosing=function(){return this.display==="closed"||this.display==="closing"};e.prototype.getMaxHeight=function(){if(!this.maxHeight){return undefined}if(Number(this.maxHeight)){return this.maxHeight+"px"}return String(this.maxHeight)};e.prototype.getDefaultInputFieldProps=function(){return{disabled:this.disabled,valid:this.valid,srHint:this.label+" "+this.srHint+" "+this.validationMessage,required:this.required}};e.prototype.getComponentClassNames=function(){var e;return e={component:true},e[this.backgroundTheme]=true,e[this.display]=true,e[this.direction]=true,e.disabled=this.disabled,e.loading=this.loading,e.filterable=this.isFilterable(),e.autocomplete=this.isAutocomplete(),e.focus=this.focussed,e.invalid=this.valid===false,e};e.prototype.getInputStyle=function(){var e=this.display!=="closed";var t=this.direction==="top";var i=this.direction==="bottom";return{paddingRight:this.isAutocomplete()?"":"48px",borderTopLeftRadius:e&&t?"0":"",borderTopRightRadius:e&&t?"0":"",borderBottomLeftRadius:e&&i?"0":"",borderBottomRightRadius:e&&i?"0":""}};e.prototype.render=function(){var e=this;return o(n,{"aria-expanded":(this.display==="open").toString()},o("div",{class:this.getComponentClassNames(),ref:function(t){return e.componentEl=t}},this.label&&o("label",{class:"label",onClick:function(){return e.toggle()}},this.label," ",this.required&&o("span",{"aria-hidden":"true"},"*")),o("div",{class:"wrapper",ref:function(t){return e.wrapperEl=t}},o("div",{class:"header-wrapper"},o("div",{class:"header",onClick:function(t){return e.onHeaderClick(t)}},o("div",{class:"selection"},this.isFilterable()?o("sdx-input",Object.assign({},this.getDefaultInputFieldProps(),{value:this.filterInputElValue,ref:function(t){return e.filterInputEl=t},changeCallback:function(t){return e.onFilterInputElChange(t)},inputCallback:function(t){return e.onFilterInputElInput(t)},focusCallback:function(){return e.onFilterInputElFocus()},blurCallback:function(){return e.onFilterInputElBlur()},autocomplete:"off",placeholder:this.placeholder,selectTextOnFocus:this.isKeyboardBehavior("filter"),inputStyle:this.getInputStyle()})):o("sdx-input",Object.assign({},this.getDefaultInputFieldProps(),{value:this.getFormattedSelection()||this.placeholder,editable:false,inputStyle:Object.assign(Object.assign({},this.getInputStyle()),{color:this.isOpenOrOpening()?"#1781e3":""})}))),(!this.isAutocomplete()||this.loading)&&o("div",{class:"thumb"},this.loading?o("sdx-loading-spinner",null):o("div",{class:"icon"})))),o("div",{class:"list-container",ref:function(t){return e.listContainerEl=t},tabIndex:-1},o("div",{class:"list"},this.showPlaceholder()&&o("sdx-select-option",{placeholder:true},this.placeholder),o("div",{class:"slot"},o("slot",null)),this.isValidFilter(this.filter)&&this.getMatchingOptionElsCount()===0&&o("div",{class:"no-matches-found"},this.noMatchesFoundLabel)))),this.validationMessage&&o("sdx-validation-message",{validationMessage:this.validationMessage})))};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:true,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{value:["valueChanged"],selectionSorted:["selectionSortedChanged"],selectCallback:["selectCallbackChanged"],changeCallback:["changeCallbackChanged"],focusCallback:["focusCallbackChanged"],blurCallback:["blurCallbackChanged"],placeholder:["placeholderChanged"],name:["nameChanged"],filterFunction:["filterFunctionChanged"],multiple:["multipleChanged"]}},enumerable:true,configurable:true});return e}());k.maxAutocompleteOptionsMobile=5;k.maxAutocompleteOptionsDesktop=10;k.minSpaceToWindow=24;k.style=C}}}));