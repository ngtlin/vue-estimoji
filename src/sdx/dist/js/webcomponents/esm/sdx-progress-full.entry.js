import { r as registerInstance, h, g as getElement } from './index-28757bf2.js';
import { i as installSlotObserver, a as parseFunction } from './webcomponent-helpers-5a1adad8.js';
import { a as anime } from './anime.es-7aa2f713.js';

const progressFullCss = ":host,*,*:before,*:after{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;position:relative;width:100%;padding:24px 0;text-align:center;display:inline-block;min-width:240px;outline:none;font-size:0;overflow:hidden;white-space:nowrap}:host .info-content{padding-bottom:14px;line-height:24px;letter-spacing:0.1px;font-size:10px;font-weight:400}:host(.hide-steps-label) .info-content{display:none}:host(.hide-steps-label) sdx-arrow{top:-5px}:host(.hide-arrows) sdx-arrow{display:none}sdx-arrow{position:absolute;top:33px;height:80px;width:40px}sdx-arrow.left{left:0}sdx-arrow.right{right:0}";

const OPEN_CLASSNAME = "open";
const CLOSE_CLASSNAME = "hide-content";
const HIDE_ARROWS_CLASSNAME = "hide-arrows";
const STEP_CHANGE_ANIMATION = 400;
const ProgressFull = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.lastSentActiveStep = -1;
        this.initIndex = 1; // arrays are counted from 0, steps from 1
        this.stepsCount = 0;
        this.allowedVisibleSteps = 1;
        this.minVisible = 0;
        this.maxVisible = 0;
        this.minPossibleBars = 3;
        this.invokeStepChangeCallback = () => null;
        /**
         * Current active step of the progress bar.
         */
        this.activeStep = -1;
        /**
         * Current active step of the progress bar.
         */
        this.previousActiveStep = undefined;
        /**
         * Current active step of the progress bar.
         */
        this.step = 1;
        /**
         * Label used next to total amount of steps when not all steps are being displayed.
         */
        this.stepsLabel = "";
        /**
         * @private
         * Disable animations for testing.
         */
        this.animated = true;
    }
    stepChanged() {
        this.setActiveStep(this.step, this.animated);
    }
    stepChangeCallbackChanged() {
        this.setInvokeStepChangeCallback();
    }
    componentWillLoad() {
        this.setInvokeStepChangeCallback();
        if (this.activeStep < 0) {
            this.activeStep = this.activeStep && this.activeStep !== -1 ? this.activeStep : this.step;
        }
    }
    componentDidLoad() {
        this.setChildElementsReferences();
        this.setEventsOnSteps();
        this.setActiveStep(this.activeStep, this.animated);
        installSlotObserver(this.el, () => this.onSlotChange()); // Listen to children changes
    }
    /**
     * Listen to window resize, so steps can be redrawn based on the width.
     */
    onWindowResizeThrottled() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            this.setActiveStep(this.activeStep, false);
        }, 10);
    }
    /**
     * Fired by the MutationObserver whenever children change.
     */
    onSlotChange() {
        this.setChildElementsReferences();
        this.setEventsOnSteps();
    }
    /**
     * Move to next step if its available.
     */
    async nextStep() {
        if (this.stepEls) {
            if (this.activeStep < this.stepsCount) {
                this.setActiveStep(++this.activeStep, this.animated);
            }
        }
    }
    /**
     * Move to previous step if its available.
     */
    async previousStep() {
        if (this.stepEls) {
            if (this.activeStep > this.indexUpdate(0)) {
                this.setActiveStep(--this.activeStep, this.animated);
            }
        }
    }
    /**
     * Get the current active step.
     */
    async getActiveStep() {
        return this.activeStep;
    }
    /**
     * Set a step as active based on an index.
     * @param index Index of the new active step.
     * @param animation Allow animations when moving between steps.
     */
    async setActiveStep(index, animation) {
        if (!this.stepEls) {
            return;
        }
        if (isNaN(index) || index < 1) {
            this.activeStep = this.initIndex;
        }
        else if (index > this.stepsCount) {
            this.activeStep = this.stepsCount + this.initIndex - 1;
        }
        else {
            this.activeStep = index;
        }
        this.calculateVisibleSteps();
        this.updateStepElements(animation);
        this.setPreviousStep(this.activeStep);
    }
    /**
     * Scroll the visible steps one step to the left.
     * This does not change the activeStep.
     */
    scrollLeft() {
        if (!this.stepEls || !this.shouldDisplayLeftArrow()) {
            return;
        }
        this.shiftVisibleStepLeft();
        this.updateStepElements(this.animated);
    }
    /**
     * Scroll the visible steps one step to the right.
     * This does not change the activeStep.
     */
    scrollRight() {
        if (!this.stepEls || !this.shouldDisplayRightArrow()) {
            return;
        }
        this.shiftVisibleStepRight();
        this.updateStepElements(this.animated);
    }
    /**
     * Traverse through child components, keep references and pass props to them.
     */
    setChildElementsReferences() {
        this.stepEls = this.el.querySelectorAll("sdx-progress-full-step");
        if (this.stepEls) {
            this.stepsCount = this.stepEls.length;
        }
        if (!this.el.shadowRoot) {
            return;
        }
        const leftArrowEls = this.el.shadowRoot.querySelectorAll("sdx-arrow.left");
        if (leftArrowEls && leftArrowEls.length > 0) {
            this.leftArrowEl = leftArrowEls[0];
        }
        const rightArrowEls = this.el.shadowRoot.querySelectorAll("sdx-arrow.right");
        if (rightArrowEls && rightArrowEls.length > 0) {
            this.rightArrowEl = rightArrowEls[0];
        }
    }
    /**
     * Set on step element the functionality to change step. For example when user clicks a completed button
     */
    setEventsOnSteps() {
        for (let i = 0; i < this.stepsCount; i++) {
            this.stepEls[i].stepClickCallback = this.setActiveStep.bind(this, this.indexUpdate(i), this.animated);
        }
    }
    /**
     * Calculates steps, that should be displayed to the user based on the width of the parent element.
     */
    calculateVisibleSteps() {
        this.allowedVisibleSteps = Math.floor(this.el.offsetWidth / 100);
        // Calculate how many steps should be displayed
        if (this.stepsCount <= this.minPossibleBars) {
            this.allowedVisibleSteps = this.stepsCount;
        }
        else if (this.allowedVisibleSteps < this.minPossibleBars) {
            this.allowedVisibleSteps = this.minPossibleBars;
        }
        else if (this.stepsCount < this.allowedVisibleSteps) {
            this.allowedVisibleSteps = this.stepsCount;
        }
        // Set min and max step to be visible
        if (this.activeStep < this.allowedVisibleSteps) {
            this.minVisible = 1;
            this.maxVisible = this.allowedVisibleSteps;
        }
        else if (this.activeStep < this.stepsCount - 1) {
            this.minVisible = this.activeStep - this.allowedVisibleSteps + 2;
            this.maxVisible = this.activeStep + 1;
        }
        else {
            this.minVisible = this.stepsCount - this.allowedVisibleSteps + 1;
            this.maxVisible = this.stepsCount;
        }
    }
    shiftVisibleStepLeft() {
        if (this.minVisible > 1) {
            this.minVisible--;
            this.maxVisible--;
        }
    }
    shiftVisibleStepRight() {
        if (this.maxVisible < this.stepsCount) {
            this.minVisible++;
            this.maxVisible++;
        }
    }
    /**
     * Updates attributes and classes of the step element, which controls what step will be displayed / hidden.
     * @param animation Animate the state change transition.
     */
    updateStepElements(animation) {
        if (!this.stepEls) {
            return;
        }
        this.updateInfoElement();
        this.updateArrows();
        for (let i = 0; i < this.stepsCount; i++) {
            this.updateStepElement(i, animation);
        }
        this.informActiveStepChanged();
    }
    updateArrows() {
        if (!this.leftArrowEl || !this.rightArrowEl) {
            return;
        }
        if (this.shouldDisplayLeftArrow()) {
            this.leftArrowEl.hideArrow = false;
            this.leftArrowEl.hideBackground = false;
        }
        else {
            this.leftArrowEl.hideArrow = true;
            this.leftArrowEl.hideBackground = true;
        }
        if (this.shouldDisplayRightArrow()) {
            this.rightArrowEl.hideArrow = false;
        }
        else {
            this.rightArrowEl.hideArrow = true;
        }
        if (this.isRightOutOfSight(this.stepsCount)) {
            this.rightArrowEl.hideBackground = false;
        }
        else {
            this.rightArrowEl.hideBackground = true;
        }
        if (this.shouldDisplayArrows()) {
            this.el.classList.remove(HIDE_ARROWS_CLASSNAME);
        }
        else {
            this.el.classList.add(HIDE_ARROWS_CLASSNAME);
        }
    }
    shouldDisplayArrows() {
        return this.allowedVisibleSteps !== this.stepsCount;
    }
    shouldDisplayRightArrow() {
        return this.maxVisible < this.stepsCount && this.activeStep >= this.maxVisible;
    }
    shouldDisplayLeftArrow() {
        return this.minVisible > 1;
    }
    updateStepElement(elIndex, animation) {
        const stepIndex = this.indexUpdate(elIndex);
        this.setStepElementAttributes(elIndex, stepIndex);
        anime.remove(this.stepEls[elIndex]);
        if (this.isLeftOutOfSight(stepIndex) || this.isRightOutOfSight(stepIndex)) {
            this.handleOutofSightElement(animation, elIndex, stepIndex);
        }
        else {
            this.handleInSightElement(animation, elIndex);
        }
    }
    handleInSightElement(animation, elIndex) {
        const stepElement = this.stepEls[elIndex];
        stepElement.style.display = "inline-block";
        stepElement.style.width = this.getCorrectWidth();
        if (this.shouldAnimateElementFadeIn(animation, elIndex)) {
            this.fadeInElement(elIndex);
        }
        else {
            this.showElement(elIndex);
        }
    }
    handleOutofSightElement(animation, elIndex, stepIndex) {
        const marginOutOfSight = "-" + this.getCorrectWidth();
        if (this.shouldAnimateElementFadeOut(animation, elIndex)) {
            this.fadeOutElement(elIndex, stepIndex, marginOutOfSight);
        }
        else {
            this.hideElement(elIndex, stepIndex, marginOutOfSight);
        }
    }
    showElement(elIndex) {
        const stepElement = this.stepEls[elIndex];
        stepElement.style.removeProperty("margin-left");
        stepElement.style.removeProperty("margin-right");
        stepElement.style.removeProperty("opacity");
        stepElement.classList.add(OPEN_CLASSNAME);
        stepElement.classList.remove(CLOSE_CLASSNAME);
    }
    fadeInElement(elIndex) {
        const stepElement = this.stepEls[elIndex];
        anime({
            targets: stepElement,
            duration: STEP_CHANGE_ANIMATION,
            marginLeft: "0",
            marginRight: "0",
            opacity: 1,
            easing: "easeOutQuad",
            complete: () => {
                stepElement.classList.add(OPEN_CLASSNAME);
                stepElement.classList.remove(CLOSE_CLASSNAME);
            }
        });
    }
    hideElement(elIndex, stepIndex, marginOutOfSight) {
        const stepElement = this.stepEls[elIndex];
        stepElement.style.display = "none";
        stepElement.style.marginLeft = this.isLeftOutOfSight(stepIndex) ? marginOutOfSight : "0";
        stepElement.style.marginRight = this.isRightOutOfSight(stepIndex) ? marginOutOfSight : "0";
        stepElement.classList.add(CLOSE_CLASSNAME);
        stepElement.classList.remove(OPEN_CLASSNAME);
    }
    fadeOutElement(elIndex, stepIndex, marginOutOfSight) {
        const stepElement = this.stepEls[elIndex];
        anime({
            targets: stepElement,
            duration: STEP_CHANGE_ANIMATION,
            marginLeft: this.isLeftOutOfSight(stepIndex) ? marginOutOfSight : "0",
            marginRight: this.isRightOutOfSight(stepIndex) ? marginOutOfSight : "0",
            opacity: 0,
            easing: "easeOutQuad",
            complete: () => {
                stepElement.style.display = "none";
                stepElement.classList.add(CLOSE_CLASSNAME);
                stepElement.classList.remove(OPEN_CLASSNAME);
            }
        });
    }
    shouldAnimateElementFadeIn(animation, elIndex) {
        return animation && this.stepEls[elIndex].classList.contains(CLOSE_CLASSNAME);
    }
    shouldAnimateElementFadeOut(animation, elIndex) {
        return animation && this.stepEls[elIndex].classList.contains(OPEN_CLASSNAME);
    }
    setStepElementAttributes(elIndex, stepIndex) {
        const stepElement = this.stepEls[elIndex];
        stepElement.setAttribute("status", this.getStepStatus(stepIndex));
        stepElement.setAttribute("value", stepIndex.toString());
        stepElement.setAttribute("total", (this.allowedVisibleSteps).toString());
        stepElement.setAttribute("position", this.recalculateStepPosition(stepIndex));
    }
    getStepStatus(index) {
        if (index > this.activeStep) {
            return "none";
        }
        else if (index === this.activeStep) {
            return "active";
        }
        return "completed";
    }
    isRightOutOfSight(index) {
        return index > this.maxVisible;
    }
    isLeftOutOfSight(index) {
        return index < this.minVisible;
    }
    /**
     * Updates steps label to be visible.
     */
    updateInfoElement() {
        if (this.allowedVisibleSteps !== this.stepsCount && this.stepsLabel) {
            this.el.classList.remove("hide-steps-label");
        }
        else {
            this.el.classList.add("hide-steps-label");
        }
    }
    /**
     * Based on the position and ammount of visible steps a css class name is recalculuated for the step.
     * @param index Position of the step.
     */
    recalculateStepPosition(index) {
        if (index === 1) {
            return "first";
        }
        else if (index === this.stepsCount) {
            return "last";
        }
        else if (index === this.minVisible) {
            return "middle-left";
        }
        else if (index === this.maxVisible) {
            return "middle-right";
        }
        else if (index > 1 && index < this.stepsCount) {
            return "middle";
        }
        return "none";
    }
    /**
     * Adjusts the index when we convert from element index to step index
     * @param index Index, that will be updated to reflect true position.
     */
    indexUpdate(index) {
        return index + this.initIndex;
    }
    /**
     * Retrieves width of every step based on the parent element width.
     */
    getCorrectWidth() {
        return this.el.clientWidth / this.allowedVisibleSteps + "px";
    }
    /**
     * Calls a function, that is attached to the onSelectChange function when active step has changed.
     */
    informActiveStepChanged() {
        if (this.lastSentActiveStep !== this.activeStep) {
            this.lastSentActiveStep = this.activeStep;
            this.invokeStepChangeCallback(this.activeStep, this.previousActiveStep);
        }
    }
    setPreviousStep(previousStep) {
        this.previousActiveStep = previousStep;
    }
    setInvokeStepChangeCallback() {
        this.invokeStepChangeCallback = parseFunction(this.stepChangeCallback);
    }
    render() {
        return [
            h("div", { class: "info-content" }, this.stepsCount, " ", this.stepsLabel),
            h("slot", null),
            h("sdx-arrow", { class: "left", direction: "left", hideArrow: true, onClick: () => this.scrollLeft() }),
            h("sdx-arrow", { class: "right", direction: "right", hideArrow: true, onClick: () => this.scrollRight() })
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "stepsLabel": ["stepChanged"],
        "step": ["stepChanged"],
        "stepChangeCallback": ["stepChangeCallbackChanged"]
    }; }
};
ProgressFull.style = progressFullCss;

export { ProgressFull as sdx_progress_full };
