import{r as t,h as i,g as s}from"./p-95c9f71a.js";import{a as e}from"./p-30dd5ee1.js";import{a as o}from"./p-a449c1f7.js";import"./p-e6688a7b.js";import{t as h}from"./p-516083a5.js";import{c as n,m as r}from"./p-486db20f.js";const l=(t={},i)=>{switch(i.type){case"SET_DISPLAY":return Object.assign(Object.assign({},t),{display:i.display});case"SET_DIRECTION":return Object.assign(Object.assign({},t),{directionState:i.directionState});case"SET_TOGGLE":return Object.assign(Object.assign({},t),{toggle:i.toggle});case"SET_CONTENT_EL":return Object.assign(Object.assign({},t),{contentEl:i.contentEl});case"SET_TOGGLE_EL":return Object.assign(Object.assign({},t),{toggleEl:i.toggleEl});case"TOGGLE_ARROW_EL":return Object.assign(Object.assign({},t),{arrowEls:h(t.arrowEls,i.arrowEl)});default:return t}},a=class{constructor(i){t(this,i),this.invokeDisplayChangeCallback=()=>null,this.animationDuration=300,this.isClicking=!1,this.oppositeDirection={x:{"top-right":"top-left","top-left":"top-right","bottom-right":"bottom-left","bottom-left":"bottom-right"},y:{"top-right":"bottom-right","top-left":"bottom-left","bottom-right":"top-right","bottom-left":"top-left"}},this.arrowUnrotatedWidth=14,this.offset=16,this.display="closed",this.direction="bottom-right",this.closeOnClick=!1}directionChanged(){"closed"!==this.display?this.close().then(()=>{this.dispatchDirection(this.direction),this.open()}):this.dispatchDirection(this.direction)}toggleElChanged(){this.toggleElChild=this.toggleEl?this.toggleEl.children[0]:void 0}displayChangeCallbackChanged(){this.setInvokeDisplayChangeCallback()}componentWillLoad(){this.setInvokeDisplayChangeCallback(),this.store=n(this,l,this.getInitialState()),this.unsubscribe=r(this,this.store,["display","directionState","contentEl","toggleEl","arrowEls"]),this.dispatchDirection(this.direction),this.store.dispatch({type:"SET_TOGGLE",toggle:this.toggle.bind(this)})}displayChanged(){this.invokeDisplayChangeCallback(this.display)}componentDidLoad(){this.close()}componentDidUnload(){this.unsubscribe()}getInitialState(){return{display:"closed",directionState:"bottom-right",toggle:()=>Promise.resolve(),contentEl:void 0,toggleEl:void 0,arrowEls:[]}}onClick(){this.isClicking=!0}onWindowClick(){(!this.isClicking||"open"===this.display&&this.closeOnClick)&&this.close(),this.isClicking=!1}toggle(){return"open"===this.display?this.close():"closed"===this.display?this.open():Promise.resolve()}open(){return new Promise(t=>{if(!this.contentEl)return;if("closed"!==this.display&&"closing"!==this.display)return void t();const i=this.contentEl;let s=this.directionState;this.store.dispatch({type:"SET_DISPLAY",display:"opening"}),i.style.display="block",this.positionContentEl(s),this.originalWidth=i.clientWidth;const e=this.hasEnoughSpace(s,"x"),h=this.hasEnoughSpace(s,"y");if(!e){const t=this.oppositeDirection.x[s];this.positionContentEl(t,"x"),this.hasEnoughSpace(t,"x")?(s=t,this.dispatchDirection(s)):this.positionContentEl(t,"x",!0)}if(!h){const t=this.oppositeDirection.y[s];this.positionContentEl(t,"y"),this.hasEnoughSpace(t,"y")?this.dispatchDirection(t):this.positionContentEl(s,"y")}const n="top-left"===this.directionState||"top-right"===this.directionState?-this.offset:this.offset;o.remove(i),o({targets:i,duration:this.animationDuration,translateY:n,opacity:1,easing:"cubicBezier(0.550, 0.085, 0.320, 1)",complete:()=>{this.store.dispatch({type:"SET_DISPLAY",display:"open"}),t()}})})}close(){return new Promise(t=>{const i=this.contentEl;i&&("closed"===this.display?(i.style.display="none",i.style.opacity="0",t()):(this.store.dispatch({type:"SET_DISPLAY",display:"closing"}),o.remove(i),o({targets:i,duration:this.animationDuration,translateY:0,opacity:0,easing:"cubicBezier(0.550, 0.085, 0.320, 1)",complete:()=>{i.style.display="none",this.dispatchDirection(this.direction),i.style.width=this.originalWidth+"px",this.store.dispatch({type:"SET_DISPLAY",display:"closed"}),t()}})))})}setInvokeDisplayChangeCallback(){this.invokeDisplayChangeCallback=e(this.displayChangeCallback)}dispatchDirection(t){this.store.dispatch({type:"SET_DIRECTION",directionState:t})}hasEnoughSpace(t,i){if(!this.contentEl)return!1;const s=this.el.getBoundingClientRect(),e=this.contentEl.getBoundingClientRect();switch(i){case"x":{let i;return i="top-left"===t||"bottom-left"===t?s.left:innerWidth-s.left,e.width<i}case"y":let i,o;return"bottom-right"===t||"bottom-left"===t?(i=innerHeight-s.bottom,o=i-(innerHeight-e.bottom)):(i=s.top,o=innerHeight-(innerHeight-s.top)-e.top),o+=this.offset,o<i;default:return!0}}positionContentEl(t,i,s){if(!this.contentEl||!this.toggleEl)return;const e=this.contentEl,o=this.getContentElPosition(t);if(e.style.opacity="0",e.style.transform="translateY(0)",i&&"x"!==i||(e.style.left=o[0]+"px"),i&&"y"!==i||(e.style.top=o[1]+"px"),s){e.style.width=innerWidth-2*this.offset+"px";const i=this.toggleEl.getBoundingClientRect();e.style.left=`-${i.left-this.offset}px`;const s=this.getContentElPosition(t);e.style.top=s[1]+"px"}const h=this.contentEl.getBoundingClientRect(),n=this.toggleEl.getBoundingClientRect();this.arrowEls.forEach(t=>{t.style.left=n.left-h.left+n.width/2-this.arrowUnrotatedWidth/2+"px"})}getContentElPosition(t){if(!this.contentEl||!this.toggleElChild)return[0,0];const i=this.contentEl.getBoundingClientRect(),s=this.toggleElChild.getBoundingClientRect(),e=-i.height,o=s.height,h=s.width/2-(this.offset+this.arrowUnrotatedWidth),n=-(i.width-s.width)-h;switch(t){case"bottom-right":return[h,o];case"bottom-left":return[n,o];case"top-right":return[h,e];case"top-left":return[n,e];default:return[0,0]}}render(){return i("slot",null)}get el(){return s(this)}static get watchers(){return{direction:["directionChanged"],toggleEl:["toggleElChanged"],displayChangeCallback:["displayChangeCallbackChanged"],display:["displayChanged"]}}};a.style=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:inline-block}";export{a as sdx_menu_flyout}