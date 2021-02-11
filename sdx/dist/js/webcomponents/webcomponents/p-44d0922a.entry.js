import{r as t,h as s,g as i}from"./p-95c9f71a.js";import{i as h,a as e}from"./p-30dd5ee1.js";import{a as n}from"./p-a449c1f7.js";const o=class{constructor(s){t(this,s),this.lastSentActiveStep=-1,this.initIndex=1,this.stepsCount=0,this.allowedVisibleSteps=1,this.minVisible=0,this.maxVisible=0,this.minPossibleBars=3,this.invokeStepChangeCallback=()=>null,this.activeStep=-1,this.previousActiveStep=void 0,this.step=1,this.stepsLabel="",this.animated=!0}stepChanged(){this.setActiveStep(this.step,this.animated)}stepChangeCallbackChanged(){this.setInvokeStepChangeCallback()}componentWillLoad(){this.setInvokeStepChangeCallback(),this.activeStep<0&&(this.activeStep=this.activeStep&&-1!==this.activeStep?this.activeStep:this.step)}componentDidLoad(){this.setChildElementsReferences(),this.setEventsOnSteps(),this.setActiveStep(this.activeStep,this.animated),h(this.el,()=>this.onSlotChange())}onWindowResizeThrottled(){this.resizeTimer&&clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.setActiveStep(this.activeStep,!1)},10)}onSlotChange(){this.setChildElementsReferences(),this.setEventsOnSteps()}async nextStep(){this.stepEls&&this.activeStep<this.stepsCount&&this.setActiveStep(++this.activeStep,this.animated)}async previousStep(){this.stepEls&&this.activeStep>this.indexUpdate(0)&&this.setActiveStep(--this.activeStep,this.animated)}async getActiveStep(){return this.activeStep}async setActiveStep(t,s){this.stepEls&&(this.activeStep=isNaN(t)||t<1?this.initIndex:t>this.stepsCount?this.stepsCount+this.initIndex-1:t,this.calculateVisibleSteps(),this.updateStepElements(s),this.setPreviousStep(this.activeStep))}scrollLeft(){this.stepEls&&this.shouldDisplayLeftArrow()&&(this.shiftVisibleStepLeft(),this.updateStepElements(this.animated))}scrollRight(){this.stepEls&&this.shouldDisplayRightArrow()&&(this.shiftVisibleStepRight(),this.updateStepElements(this.animated))}setChildElementsReferences(){if(this.stepEls=this.el.querySelectorAll("sdx-progress-full-step"),this.stepEls&&(this.stepsCount=this.stepEls.length),!this.el.shadowRoot)return;const t=this.el.shadowRoot.querySelectorAll("sdx-arrow.left");t&&t.length>0&&(this.leftArrowEl=t[0]);const s=this.el.shadowRoot.querySelectorAll("sdx-arrow.right");s&&s.length>0&&(this.rightArrowEl=s[0])}setEventsOnSteps(){for(let t=0;t<this.stepsCount;t++)this.stepEls[t].stepClickCallback=this.setActiveStep.bind(this,this.indexUpdate(t),this.animated)}calculateVisibleSteps(){this.allowedVisibleSteps=Math.floor(this.el.offsetWidth/100),this.stepsCount<=this.minPossibleBars?this.allowedVisibleSteps=this.stepsCount:this.allowedVisibleSteps<this.minPossibleBars?this.allowedVisibleSteps=this.minPossibleBars:this.stepsCount<this.allowedVisibleSteps&&(this.allowedVisibleSteps=this.stepsCount),this.activeStep<this.allowedVisibleSteps?(this.minVisible=1,this.maxVisible=this.allowedVisibleSteps):this.activeStep<this.stepsCount-1?(this.minVisible=this.activeStep-this.allowedVisibleSteps+2,this.maxVisible=this.activeStep+1):(this.minVisible=this.stepsCount-this.allowedVisibleSteps+1,this.maxVisible=this.stepsCount)}shiftVisibleStepLeft(){this.minVisible>1&&(this.minVisible--,this.maxVisible--)}shiftVisibleStepRight(){this.maxVisible<this.stepsCount&&(this.minVisible++,this.maxVisible++)}updateStepElements(t){if(this.stepEls){this.updateInfoElement(),this.updateArrows();for(let s=0;s<this.stepsCount;s++)this.updateStepElement(s,t);this.informActiveStepChanged()}}updateArrows(){this.leftArrowEl&&this.rightArrowEl&&(this.shouldDisplayLeftArrow()?(this.leftArrowEl.hideArrow=!1,this.leftArrowEl.hideBackground=!1):(this.leftArrowEl.hideArrow=!0,this.leftArrowEl.hideBackground=!0),this.rightArrowEl.hideArrow=!this.shouldDisplayRightArrow(),this.rightArrowEl.hideBackground=!this.isRightOutOfSight(this.stepsCount),this.shouldDisplayArrows()?this.el.classList.remove("hide-arrows"):this.el.classList.add("hide-arrows"))}shouldDisplayArrows(){return this.allowedVisibleSteps!==this.stepsCount}shouldDisplayRightArrow(){return this.maxVisible<this.stepsCount&&this.activeStep>=this.maxVisible}shouldDisplayLeftArrow(){return this.minVisible>1}updateStepElement(t,s){const i=this.indexUpdate(t);this.setStepElementAttributes(t,i),n.remove(this.stepEls[t]),this.isLeftOutOfSight(i)||this.isRightOutOfSight(i)?this.handleOutofSightElement(s,t,i):this.handleInSightElement(s,t)}handleInSightElement(t,s){const i=this.stepEls[s];i.style.display="inline-block",i.style.width=this.getCorrectWidth(),this.shouldAnimateElementFadeIn(t,s)?this.fadeInElement(s):this.showElement(s)}handleOutofSightElement(t,s,i){const h="-"+this.getCorrectWidth();this.shouldAnimateElementFadeOut(t,s)?this.fadeOutElement(s,i,h):this.hideElement(s,i,h)}showElement(t){const s=this.stepEls[t];s.style.removeProperty("margin-left"),s.style.removeProperty("margin-right"),s.style.removeProperty("opacity"),s.classList.add("open"),s.classList.remove("hide-content")}fadeInElement(t){const s=this.stepEls[t];n({targets:s,duration:400,marginLeft:"0",marginRight:"0",opacity:1,easing:"easeOutQuad",complete:()=>{s.classList.add("open"),s.classList.remove("hide-content")}})}hideElement(t,s,i){const h=this.stepEls[t];h.style.display="none",h.style.marginLeft=this.isLeftOutOfSight(s)?i:"0",h.style.marginRight=this.isRightOutOfSight(s)?i:"0",h.classList.add("hide-content"),h.classList.remove("open")}fadeOutElement(t,s,i){const h=this.stepEls[t];n({targets:h,duration:400,marginLeft:this.isLeftOutOfSight(s)?i:"0",marginRight:this.isRightOutOfSight(s)?i:"0",opacity:0,easing:"easeOutQuad",complete:()=>{h.style.display="none",h.classList.add("hide-content"),h.classList.remove("open")}})}shouldAnimateElementFadeIn(t,s){return t&&this.stepEls[s].classList.contains("hide-content")}shouldAnimateElementFadeOut(t,s){return t&&this.stepEls[s].classList.contains("open")}setStepElementAttributes(t,s){const i=this.stepEls[t];i.setAttribute("status",this.getStepStatus(s)),i.setAttribute("value",s.toString()),i.setAttribute("total",this.allowedVisibleSteps.toString()),i.setAttribute("position",this.recalculateStepPosition(s))}getStepStatus(t){return t>this.activeStep?"none":t===this.activeStep?"active":"completed"}isRightOutOfSight(t){return t>this.maxVisible}isLeftOutOfSight(t){return t<this.minVisible}updateInfoElement(){this.allowedVisibleSteps!==this.stepsCount&&this.stepsLabel?this.el.classList.remove("hide-steps-label"):this.el.classList.add("hide-steps-label")}recalculateStepPosition(t){return 1===t?"first":t===this.stepsCount?"last":t===this.minVisible?"middle-left":t===this.maxVisible?"middle-right":t>1&&t<this.stepsCount?"middle":"none"}indexUpdate(t){return t+this.initIndex}getCorrectWidth(){return this.el.clientWidth/this.allowedVisibleSteps+"px"}informActiveStepChanged(){this.lastSentActiveStep!==this.activeStep&&(this.lastSentActiveStep=this.activeStep,this.invokeStepChangeCallback(this.activeStep,this.previousActiveStep))}setPreviousStep(t){this.previousActiveStep=t}setInvokeStepChangeCallback(){this.invokeStepChangeCallback=e(this.stepChangeCallback)}render(){return[s("div",{class:"info-content"},this.stepsCount," ",this.stepsLabel),s("slot",null),s("sdx-arrow",{class:"left",direction:"left",hideArrow:!0,onClick:()=>this.scrollLeft()}),s("sdx-arrow",{class:"right",direction:"right",hideArrow:!0,onClick:()=>this.scrollRight()})]}get el(){return i(this)}static get watchers(){return{stepsLabel:["stepChanged"],step:["stepChanged"],stepChangeCallback:["stepChangeCallbackChanged"]}}};o.style=":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;position:relative;width:100%;padding:24px 0;text-align:center;display:inline-block;min-width:240px;outline:none;font-size:0;overflow:hidden;white-space:nowrap}:host .info-content{padding-bottom:14px;line-height:24px;letter-spacing:0.1px;font-size:10px;font-weight:400}:host(.hide-steps-label) .info-content{display:none}:host(.hide-steps-label) sdx-arrow{top:-5px}:host(.hide-arrows) sdx-arrow{display:none}sdx-arrow{position:absolute;top:33px;height:80px;width:40px}sdx-arrow.left{left:0}sdx-arrow.right{right:0}";export{o as sdx_progress_full}