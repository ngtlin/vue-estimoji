import{r as t,h as e,g as s}from"./p-95c9f71a.js";import{a}from"./p-a449c1f7.js";const i=class{constructor(e){t(this,e),this.animationDuration=200,this.animationBeginCallback=()=>{}}animationNameChanged(){let t={targets:this.el,duration:this.animationDuration,easing:"cubicBezier(0.550, 0.085, 0.320, 1)",begin:()=>{this.el.style.display="inline-block",this.animationBeginCallback()}};switch(this.animationName){case"scale-in":t=Object.assign(Object.assign({},t),{scale:1});break;case"scale-out":t=Object.assign(Object.assign({},t),{scale:0});break;case"fade-in":t=Object.assign(Object.assign({},t),{opacity:1});break;case"fade-out":t=Object.assign(Object.assign({},t),{opacity:0,complete:()=>this.el.style.display="none"})}a(t)}componentWillLoad(){switch(this.animationName){case"scale-in":this.el.style.transform="scale(1)";break;case"scale-out":this.el.style.transform="scale(0)",this.el.style.display="none";break;case"fade-in":this.el.style.opacity="1",this.el.style.display="inline-block";break;case"fade-out":this.el.style.opacity="0",this.el.style.display="none"}}render(){return e("slot",null)}get el(){return s(this)}static get watchers(){return{animationName:["animationNameChanged"]}}},n=class{constructor(e){t(this,e),this.direction="none"}componentWillLoad(){this.el.style.display="inline-block",this.el.style.transform=`scaleX(${this.getFlipTransformStyle("x")}) scaleY(${this.getFlipTransformStyle("y")})`}getFlipTransformStyle(t){return{none:{x:1,y:1},horizontal:{x:-1,y:1},vertical:{x:1,y:-1},both:{x:-1,y:-1}}[this.direction][t]}render(){return e("slot",null)}get el(){return s(this)}};export{i as sdx_animation,n as sdx_flip}