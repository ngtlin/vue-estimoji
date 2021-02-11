import { __extends, __read } from "tslib";
import { searchAndInitialize, clamp, preventDefault, remove } from "../Utils";
import DomElement from "../DomElement";
import * as Inputs from "../Inputs";
import * as Dom from "../DomFunctions";
var QUERY_SLIDER = ".carousel__container";
var QUERY_SLIDE_AREA = ".carousel__slider";
var QUERY_WRAPPER = ".carousel__slider-wrapper";
var QUERY_PAGINATION = ".carousel__pagination";
var CLASS_ACTIVE = "slide--active";
var CLASS_PREV = "slide--prev";
var CLASS_NEXT = "slide--next";
var CLASS_BULLET = "pagination-bullet";
var CLASS_BULLET_ACTIVE = "pagination-bullet--active";
var QUERY_BTN_PREV = ".carousel__button-prev";
var QUERY_BTN_NEXT = ".carousel__button-next";
var QUERY_BTN_WRAPPER = ".carousel__button-wrapper";
var ATTRIBUTE_INDEX = "js-index";
var ANIMATION_DURATION = 350;
var ANIMATION_EASING = "ease-in-out";
var TOUCH_DURATION = 300;
var TOUCH_DELTA_MIN = 25;
/**
 * The carousel component definition.
 */
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    /**
     * Creates and initializes the carousel component.
     * @param {DomElement} element - The root element of the Carousel component.
     * @param {Number} index - The initial index.
     */
    function Carousel(element, index) {
        if (index === void 0) { index = 0; }
        var _this = _super.call(this, element) || this;
        _this._slider = _this.element.querySelector(QUERY_SLIDER);
        _this._wrapper = _this._slider.querySelector(QUERY_WRAPPER);
        _this._pagination = _this._slider.querySelector(QUERY_PAGINATION);
        _this._slideArea = _this._slider.querySelector(QUERY_SLIDE_AREA);
        _this._btnWrapper = _this.element.querySelector(QUERY_BTN_WRAPPER);
        _this._prevCtrl = _this.element.querySelector(QUERY_BTN_PREV);
        _this._nextCtrl = _this.element.querySelector(QUERY_BTN_NEXT);
        _this._slides = [];
        _this._index = index || 0;
        _this._slidesPerGroup = 1;
        _this._sliderWrapper = new SliderWrapper(_this._wrapper, _this._slideArea, _this.element);
        _this._sliderWrapper.index = _this._index;
        _this._additionalSlideMargin = 0;
        _this._resizeHandler = _this._onresize.bind(_this);
        _this._prevHandler = _this.prev.bind(_this);
        _this._nextHandler = _this.next.bind(_this);
        _this._paginationClickHandler = _this._handlePaginationClick.bind(_this);
        _this._keydownHandler = _this._handleKeydown.bind(_this);
        _this._handleTouchstart = _this._onTouchstart.bind(_this);
        _this._handleTouchmove = _this._onTouchmove.bind(_this);
        _this._handleTouchend = _this._onTouchend.bind(_this);
        _this._initialize();
        _this.slide(_this._index, 0, false);
        _this._updateCtrlOffsets();
        return _this;
    }
    /**
     * Initializes the carousel component.
     * @private
     */
    Carousel.prototype._initialize = function () {
        // responsive helpers
        this._breakpointPhone = new DomElement("div")
            .addClass("js-phone")
            .element;
        this._breakpointTablet = new DomElement("div")
            .addClass("js-tablet")
            .element;
        this._breakpointDesktop = new DomElement("div")
            .addClass("js-desktop")
            .element;
        this.element.appendChild(this._breakpointPhone);
        this.element.appendChild(this._breakpointTablet);
        this.element.appendChild(this._breakpointDesktop);
        if (this._prevCtrl && this._nextCtrl) {
            this._prevCtrl.addEventListener("click", this._prevHandler);
            this._nextCtrl.addEventListener("click", this._nextHandler);
        }
        if (this._pagination) {
            this._pagination.addEventListener("click", this._paginationClickHandler);
        }
        this._slides = Array.from(this._wrapper.children);
        if (this._slides.length === 0) {
            throw Error("Provide at least one slide to the slider");
        }
        for (var i = 0; i < this._slides.length; i++) {
            var slide = this._slides[i];
            slide.setAttribute(ATTRIBUTE_INDEX, String(i));
        }
        this._updateResponsiveOptions();
        this._sliderWrapper.initialize();
        this.reset();
        this.element.addEventListener("keydown", this._keydownHandler);
        this._slideArea.addEventListener("mousedown", this._handleTouchstart);
        this._slideArea.addEventListener("touchstart", this._handleTouchstart);
        window.addEventListener("resize", this._resizeHandler);
        window.addEventListener("orientationchange", this._resizeHandler);
    };
    Carousel.prototype._isBreakpointActive = function (breakpoint) {
        var style = window.getComputedStyle(breakpoint);
        return style.visibility === "visible";
    };
    Carousel.prototype._onresize = function () {
        this.reset();
        this._updateCtrlOffsets();
    };
    /**
     * Makes sure the index is always in the range of available slide
     * In case it's to high or to low it is wrapped around
     * @param {Number} index - The index to adjust and sanitize
     * @returns {Number} index - The adjusted index
     * @private
     */
    Carousel.prototype._adjustIndex = function (index) {
        if (typeof index !== "number") {
            index = 0;
        }
        if (index < 0) {
            index = this._wrapround(index, 0, this._slides.length);
        }
        else if (index >= this._slides.length) {
            index %= this._slides.length;
        }
        return Math.floor(index / this._slidesPerGroup) * this._slidesPerGroup;
    };
    Carousel.prototype._wrapround = function (n, min, max) {
        if (n >= max) {
            return min;
        }
        if (n < min) {
            return max - 1;
        }
        return n;
    };
    Carousel.prototype._wraproundCount = function (a, b, min, max, direction) {
        if (direction === 0) {
            return 0;
        }
        if (a < min || a >= max) {
            throw new Error("Argument 'a' is out of range, Value: " + a + " Min: " + min + ", Max: " + max);
        }
        if (b < min || b >= max) {
            throw new Error("Argument 'b' is out of range, Value: " + b + " Min: " + min + ", Max: " + max);
        }
        var i = 0;
        while (a !== b) {
            i++;
            a = this._wrapround(a + direction, min, max);
        }
        return i;
    };
    Carousel.prototype._updateCtrlOffsets = function () {
        if (!this._nextCtrl || !this._prevCtrl || !this._btnWrapper) {
            return;
        }
        var prevCtrlMargin = 0;
        var nextCtrlMargin = 0;
        if (this._slidesPerGroup > 1) {
            var wrapperRect = this._btnWrapper.getBoundingClientRect();
            var prevSlideCount = Math.floor(0.5 * this._slidesPerGroup);
            var rightIndex = this._sliderWrapper.index + prevSlideCount + 1;
            var leftIndex = this._sliderWrapper.index - 1;
            if (this._slidesPerGroup % 2 !== 0) {
                leftIndex -= prevSlideCount;
            }
            if ((leftIndex >= 0 && leftIndex < this._wrapper.children.length) &&
                (rightIndex >= 0 && rightIndex < this._wrapper.children.length)) {
                var leftSlide = this._sliderWrapper.getSlideProperties(leftIndex);
                var rightSlide = this._sliderWrapper.getSlideProperties(rightIndex);
                var btnWidth = this._prevCtrl.offsetWidth;
                if (btnWidth <= 0) {
                    btnWidth = 60;
                }
                prevCtrlMargin = leftSlide.right - wrapperRect.left - btnWidth;
                nextCtrlMargin = wrapperRect.right - rightSlide.left - btnWidth;
            }
        }
        var left = prevCtrlMargin !== 0 ? prevCtrlMargin + "px" : "";
        this._prevCtrl.style.left = left;
        var right = nextCtrlMargin !== 0 ? nextCtrlMargin + "px" : "";
        this._nextCtrl.style.right = right;
    };
    Carousel.prototype._updateActiveSlides = function (nextIndex) {
        var prevSlideCount = Math.floor(0.5 * (this._slidesPerGroup - 1));
        var evenGroup = this._slidesPerGroup % 2 === 0;
        for (var i = 0; i < this._wrapper.children.length; i++) {
            var slide = this._wrapper.children[i];
            if (i === nextIndex || (evenGroup && i === nextIndex + 1)) {
                Dom.addClass(slide, CLASS_ACTIVE);
            }
            else {
                Dom.removeClass(slide, CLASS_ACTIVE);
            }
            if (i < nextIndex && i >= nextIndex - prevSlideCount) {
                Dom.addClass(slide, CLASS_PREV);
            }
            else {
                Dom.removeClass(slide, CLASS_PREV);
            }
            if (i > nextIndex && (i <= nextIndex + prevSlideCount || (evenGroup && i <= nextIndex + 1 + prevSlideCount))) {
                Dom.addClass(slide, CLASS_NEXT);
            }
            else {
                Dom.removeClass(slide, CLASS_NEXT);
            }
        }
    };
    /**
     * Updates and creates the pagination bullets.
     * @private
     */
    Carousel.prototype._updatePagination = function () {
        if (!this._pagination) {
            return;
        }
        var to = this._index;
        var bullets = this._pagination.children;
        var totalItems = Math.max(this._slides.length, bullets.length);
        var slideCount = Math.ceil(this._slides.length / this._slidesPerGroup);
        var activeSlideIndex = Math.floor(to / this._slidesPerGroup);
        for (var i = 0; i < totalItems; i++) {
            var bullet = void 0;
            if (bullets.length > i) {
                if (bullets.length <= slideCount) {
                    bullet = bullets[i];
                }
                else {
                    remove(bullets[i]);
                }
            }
            else if (i < slideCount) {
                bullet = new DomElement("div")
                    .addClass(CLASS_BULLET)
                    .element;
                this._pagination.appendChild(bullet);
            }
            if (bullet && i < slideCount) {
                if (i === activeSlideIndex) {
                    Dom.addClass(bullet, CLASS_BULLET_ACTIVE);
                }
                else {
                    Dom.removeClass(bullet, CLASS_BULLET_ACTIVE);
                }
            }
        }
    };
    Carousel.prototype._handlePaginationClick = function (e) {
        if (!Dom.hasClass(e.target, CLASS_BULLET)) {
            return;
        }
        var index = Array.from(this._pagination.children).indexOf(e.target);
        var slideNumber = index * this._slidesPerGroup;
        this.slideTo(slideNumber);
    };
    Carousel.prototype._handleKeydown = function (event) {
        var keycode = event.which || event.keyCode;
        switch (keycode) {
            case Inputs.KEY_ARROW_LEFT:
                this.prev();
                break;
            case Inputs.KEY_ARROW_RIGHT:
                this.next();
                break;
            case Inputs.KEY_ESCAPE:
                this.element.blur();
                break;
            default:
        }
    };
    Carousel.prototype._onTouchstart = function (event) {
        var touch = event.touches ? event.touches[0] : event;
        this._slideArea.removeEventListener("mousedown", this._handleTouchstart);
        this._slideArea.removeEventListener("touchstart", this._handleTouchstart);
        this._sliderWrapper.beginDrag();
        var pageX = touch.pageX;
        this._touchOffset = {
            x: pageX,
            time: Date.now()
        };
        this._delta = {
            x: 0,
            lastMove: pageX
        };
        document.addEventListener("mousemove", this._handleTouchmove);
        document.addEventListener("touchmove", this._handleTouchmove);
        document.addEventListener("mouseup", this._handleTouchend);
        document.addEventListener("mouseleave", this._handleTouchend);
        document.addEventListener("touchend", this._handleTouchend);
    };
    Carousel.prototype._onTouchmove = function (event) {
        var touch = event.touches ? event.touches[0] : event;
        var pageX = touch.pageX;
        var deltaMove = pageX - this._delta.lastMove;
        this._delta = {
            x: pageX - this._touchOffset.x,
            lastMove: pageX
        };
        if (this._touchOffset) {
            preventDefault(event);
            this._sliderWrapper.move(deltaMove);
            this._cloneSlidesToFitWrapper(false, deltaMove);
        }
    };
    Carousel.prototype._onTouchend = function () {
        var duration = this._touchOffset ? Date.now() - this._touchOffset.time : undefined;
        var isValid = Number(duration) < TOUCH_DURATION &&
            Math.abs(this._delta.x) > TOUCH_DELTA_MIN ||
            Math.abs(this._delta.x) > this._frameWidth / 3;
        if (isValid) {
            var direction = clamp(this._delta.x, -1, 1) * -1;
            this.slide(false, direction, true);
            this._sliderWrapper.endDrag();
        }
        else {
            // Slide back to the starting point of the drag operation
            this._sliderWrapper.cancelDrag();
        }
        this._touchOffset = undefined;
        this._slideArea.addEventListener("mousedown", this._handleTouchstart);
        this._slideArea.addEventListener("touchstart", this._handleTouchstart);
        document.removeEventListener("mousemove", this._handleTouchmove);
        document.removeEventListener("mouseup", this._handleTouchend);
        document.removeEventListener("mouseleave", this._handleTouchend);
        document.removeEventListener("touchmove", this._handleTouchmove);
        document.removeEventListener("touchend", this._handleTouchend);
    };
    /**
     * Updated parameters in regard to the currently active responsive
     * breakpoint.
     * @private
     */
    Carousel.prototype._updateResponsiveOptions = function () {
        if (this._isBreakpointActive(this._breakpointPhone)) {
            this._slidesPerGroup = 1;
        }
        if (this._isBreakpointActive(this._breakpointTablet)) {
            this._slidesPerGroup = 2;
        }
        if (this._isBreakpointActive(this._breakpointDesktop)) {
            this._slidesPerGroup = 3;
        }
        this._sliderWrapper.slidesPerGroup = this._slidesPerGroup;
    };
    /**
     * Clones the requested slide and adds it to the slider.
     * @param {Number} index - The original slide index of the template slide
     * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
     * @private
     */
    Carousel.prototype._cloneSlide = function (index, direction) {
        var clone = this._slides[index].cloneNode(true);
        Dom.removeClass(clone, CLASS_ACTIVE);
        Dom.removeClass(clone, CLASS_PREV);
        Dom.removeClass(clone, CLASS_NEXT);
        this._sliderWrapper.addSlide(clone, direction);
        var slideMargin = this._additionalSlideMargin > 0 ? this._additionalSlideMargin + "px" : "";
        clone.style.marginLeft = slideMargin;
        clone.style.marginRight = slideMargin;
        return clone.offsetWidth;
    };
    /**
     * Clones and adds the requested ammount of slides.
     * @param {Number} slideCount - The number of slides to add
     * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
     * @private
     */
    Carousel.prototype._cloneSlidesByCount = function (slideCount, direction) {
        var originalIndex = direction < 0 ? 0 : this._wrapper.children.length - 1;
        var index = parseInt(this._wrapper.children[originalIndex].getAttribute(ATTRIBUTE_INDEX), 10);
        while (slideCount > 0) {
            index = this._wrapround(index + direction, 0, this._slides.length);
            this._cloneSlide(index, direction);
            slideCount--;
        }
    };
    /**
     * Calculates the scroll clount and inserts the required ammount of slides
     * in the apropriate direction.
     * @param {Number} nextIndex - The slide to scroll to
     * @param {Number} direction - The direction of the scroll
     * @private
     */
    Carousel.prototype._cloneSlidesByScrollCount = function (nextIndex, direction) {
        var scrollCount = this._wraproundCount(this._index, nextIndex, 0, this._slides.length, direction);
        var outerSlideProps = this._sliderWrapper.getSlideProperties(direction > 0 ? this._wrapper.children.length - 1 : 0);
        var indexToOuterSlideCount = this._wraproundCount(this._index, outerSlideProps.index, 0, this._slides.length, direction);
        var slidesToInsert = scrollCount - indexToOuterSlideCount;
        if (slidesToInsert > 0) {
            this._cloneSlidesByCount(slidesToInsert, direction);
        }
    };
    Carousel.prototype._cloneSlidesByToFill = function (spaceToFill, direction) {
        var originalIndex = direction < 0 ? 0 : this._wrapper.children.length - 1;
        var index = parseInt(this._wrapper.children[originalIndex].getAttribute(ATTRIBUTE_INDEX), 10);
        while (spaceToFill > 0) {
            index = this._wrapround(index + direction, 0, this._slides.length);
            spaceToFill -= this._cloneSlide(index, direction);
        }
    };
    Carousel.prototype._cloneSlidesToFitWrapper = function (cleanup, slideDelta) {
        if (cleanup === void 0) { cleanup = true; }
        if (slideDelta === void 0) { slideDelta = 0; }
        var realIndex = this._sliderWrapper.index;
        var first;
        var last;
        if (cleanup === false) {
            first = this._sliderWrapper.getSlideProperties(0);
            last = this._sliderWrapper.getSlideProperties(this._wrapper.children.length - 1);
        }
        else {
            var result = this._sliderWrapper.getRemovableSlides(slideDelta);
            first = result.first;
            last = result.last;
            // Remove the slides from view
            for (var i = result.slides.length - 1; i >= 0; i--) {
                if (result.slides[i] === true) {
                    this._sliderWrapper.removeSlide(i);
                }
            }
        }
        var spaceToFill = this._sliderWrapper.getEmptySpace(first.left, last.right);
        // Check if additional slides are required on the left
        if (first.visible === true && spaceToFill.left > 0) {
            this._cloneSlidesByToFill(spaceToFill.left, -1);
        }
        // Check if additional slides are required on the right
        if (last.visible === true && spaceToFill.right > 0) {
            this._cloneSlidesByToFill(spaceToFill.right, 1);
        }
        return realIndex - this._sliderWrapper.index;
    };
    /**
     * Gets the real (wrapper) index for the slide with the given original index
     * @param {Number} index - The index to search for
     * @param {Number} direction - The direction in which to search
     * @returns {Number} The wrapper index
     * @private
     */
    Carousel.prototype._getRealIndexFor = function (index, direction) {
        var i = this._sliderWrapper.index;
        while (i >= 0 && i < this._wrapper.children.length) {
            var slideIndex = parseInt(this._wrapper.children[i].getAttribute(ATTRIBUTE_INDEX), 10);
            if (slideIndex === index) {
                return i;
            }
            i += direction;
        }
        throw new Error("Cloud not find real index for slide " + index + " in direction " + direction);
    };
    Object.defineProperty(Carousel.prototype, "index", {
        /**
         * Gets the index of the current active slide. If the slides are grouped evenly
         * the active slide is always the first in the group.
         * @returns {Number} The index of the active slide.
         */
        get: function () {
            return this._index;
        },
        enumerable: false,
        configurable: true
    });
    Carousel.prototype.reset = function () {
        this._frameWidth = this._slider.getBoundingClientRect()
            .width || this._slider.offsetWidth;
        this._updateResponsiveOptions();
        if (this._nextCtrl) {
            this._nextCtrl.disabled = false;
        }
        if (this._prevCtrl) {
            this._prevCtrl.disabled = false;
        }
        if (this._slidesPerGroup === 1) {
            var style = window.getComputedStyle(this._slider.parentElement);
            var parentWidth = this._slider.parentElement.clientWidth + (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
            var outerMargin = Math.ceil(parentWidth - this._frameWidth);
            this._additionalSlideMargin = Math.ceil(outerMargin * 0.5) + 1;
        }
        else {
            this._additionalSlideMargin = 0;
        }
        var slideMargin = this._additionalSlideMargin > 0 ? this._additionalSlideMargin + "px" : "";
        for (var i = 0; i < this._wrapper.children.length; i++) {
            var slide = this._wrapper.children[i];
            slide.style.marginLeft = slideMargin;
            slide.style.marginRight = slideMargin;
        }
        this._sliderWrapper.onresize();
        this._cloneSlidesToFitWrapper(false);
        this._sliderWrapper.moveTo(this._sliderWrapper.index);
        this._updatePagination();
        this._updateActiveSlides(this._sliderWrapper.index);
    };
    /**
     * Moves the slider to the next item.
     */
    Carousel.prototype.prev = function () {
        this.slide(false, -1);
    };
    /**
     * Moves the slider to the previous item.
     */
    Carousel.prototype.next = function () {
        this.slide(false, 1);
    };
    Carousel.prototype.slide = function (nextIndex, direction, animate) {
        if (animate === void 0) { animate = true; }
        if (typeof nextIndex !== "number") {
            if (direction > 0) {
                nextIndex = this._index + this._slidesPerGroup;
                direction = 1;
            }
            else {
                nextIndex = this._index - this._slidesPerGroup;
                direction = -1;
            }
        }
        nextIndex = this._adjustIndex(nextIndex);
        if (!direction) {
            direction = clamp(nextIndex - this._index, -1, 1);
        }
        // Make sure there are enought slides on screen
        this._cloneSlidesToFitWrapper(false);
        // Make sure there are enough slides for the scroll operation
        this._cloneSlidesByScrollCount(nextIndex, direction);
        var realIndex = this._getRealIndexFor(nextIndex, direction);
        var slideDelta = this._sliderWrapper.getSlideDelta(realIndex);
        realIndex = Math.max(realIndex - this._cloneSlidesToFitWrapper(true, slideDelta), 0);
        this._sliderWrapper.moveTo(realIndex, undefined, animate);
        // Update the active index
        this._index = nextIndex;
        // Mark slides as active
        this._updatePagination();
        this._updateActiveSlides(realIndex);
        // console.log(`Performed slide to ${this._index}, realIndex: ${this._sliderWrapper.index}`)
    };
    /**
     * Moves the slider to the selected slide.
     * @param {Number} index - The index of the slide to slide to.
     * @param {Boolean} animate - `True` if the slide should be animated; otherwise `false`. Defaults to `true`.
     */
    Carousel.prototype.slideTo = function (index, animate) {
        if (animate === void 0) { animate = true; }
        this.slide(index, undefined, animate);
    };
    /**
     * Destroys the components and frees all references.
     */
    Carousel.prototype.destroy = function () {
        window.removeEventListener("resize", this._resizeHandler);
        window.removeEventListener("orientationchange", this._resizeHandler);
        this.element.removeEventListener("keydown", this._keydownHandler);
        this._slideArea.removeEventListener("mousedown", this._handleTouchstart);
        this._slideArea.removeEventListener("touchstart", this._handleTouchstart);
        this._breakpointPhone.remove();
        this._breakpointTablet.remove();
        this._breakpointDesktop.remove();
        if (this._prevCtrl && this._nextCtrl) {
            this._prevCtrl.removeEventListener("click", this._prevHandler);
            this._nextCtrl.removeEventListener("click", this._nextHandler);
        }
        this._prevCtrl = undefined;
        this._nextCtrl = undefined;
        if (this._pagination) {
            this._pagination.removeEventListener("click", this._paginationClickHandler);
            this._pagination = undefined;
        }
        this._sliderWrapper.destroy();
        this._sliderWrapper = undefined;
    };
    return Carousel;
}(DomElement));
var TRANSFORM = "transform";
var DURATION = "transitionDuration";
var TIMING = "transitionTimingFunction";
var SliderWrapper = /** @class */ (function () {
    function SliderWrapper(wrapperElement, slideAreaElement, carouselElement) {
        this._wrapperElement = wrapperElement;
        this._slideAreaElement = slideAreaElement;
        this._carouselElement = carouselElement;
        this._position = 0;
        this._index = 0;
        this._isdragging = false;
    }
    SliderWrapper.prototype._getSlide = function (index) {
        if (index < 0 || index >= this._wrapperElement.children.length) {
            throw new Error("Argument 'index' is out of range, Value: " + index + " Min: 0, Max: " + (this._wrapperElement.children.length - 1));
        }
        return this._wrapperElement.children[index];
    };
    SliderWrapper.prototype._setTransform = function (targetPosition, animated, duration, ease) {
        if (animated === void 0) { animated = false; }
        if (duration === void 0) { duration = ANIMATION_DURATION; }
        if (ease === void 0) { ease = ANIMATION_EASING; }
        if (animated === false) {
            duration = 0;
        }
        var style = this._wrapperElement.style;
        if (style) {
            style[DURATION] = duration + "ms";
            style[TIMING] = ease;
            // No sub pixel transitions.
            targetPosition = Math.floor(targetPosition);
            style[TRANSFORM] = "translate(" + targetPosition + "px, 0)";
            this._position = targetPosition;
        }
    };
    SliderWrapper.prototype._getWrapperSlidePosition = function (index) {
        var wrapperCenter = (0.5 * this._wrapperElement.offsetWidth);
        var slide = this._getSlide(index);
        var result = 0;
        // Calculate the position of the slide (centered)
        if (this._slidesPerGroup % 2 === 0) {
            var slideStyle = window.getComputedStyle(slide);
            var slideMargin = slideStyle ? parseInt(slideStyle.marginRight, 10) : 0;
            // Centered to the space between the two center slides of the group
            result = -slide.offsetLeft - (slide.clientWidth) + wrapperCenter - slideMargin;
        }
        else {
            result = -slide.offsetLeft - (0.5 * slide.clientWidth) + wrapperCenter;
        }
        return result;
    };
    Object.defineProperty(SliderWrapper.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliderWrapper.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (index) {
            this._index = index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliderWrapper.prototype, "slidesPerGroup", {
        set: function (value) {
            this._slidesPerGroup = value;
        },
        enumerable: false,
        configurable: true
    });
    SliderWrapper.prototype.initialize = function () {
        this.onresize();
    };
    SliderWrapper.prototype.onresize = function () {
        // update the area offset for slide position calculation
        this._areaOffset = this._slideAreaElement.getBoundingClientRect().left;
        // Get the container dimensions
        var containerRect = this._carouselElement.getBoundingClientRect();
        this._containerMin = containerRect.left;
        this._containerMax = containerRect.right;
    };
    SliderWrapper.prototype.beginDrag = function () {
        this._isdragging = true;
        this._dragStartPosition = this._position;
    };
    SliderWrapper.prototype.cancelDrag = function () {
        this._isdragging = false;
        this._setTransform(this._dragStartPosition, true, ANIMATION_DURATION, ANIMATION_EASING);
        this._dragStartPosition = undefined;
    };
    SliderWrapper.prototype.endDrag = function () {
        this._isdragging = false;
        this._dragStartPosition = undefined;
    };
    SliderWrapper.prototype.move = function (delta, animated, duration, ease) {
        if (animated === void 0) { animated = false; }
        if (duration === void 0) { duration = ANIMATION_DURATION; }
        if (ease === void 0) { ease = ANIMATION_EASING; }
        delta = Math.trunc(delta);
        if (Math.abs(delta) <= 0) {
            return;
        }
        var targetPosition = this._position += delta;
        this._setTransform(targetPosition, animated, duration, ease);
    };
    SliderWrapper.prototype.moveTo = function (index, delta, animated) {
        if (animated === void 0) { animated = false; }
        var newPosition = 0;
        if (!delta) {
            newPosition = this._getWrapperSlidePosition(index);
        }
        else {
            newPosition = this._position += delta;
        }
        this._index = index;
        this._setTransform(newPosition, animated);
    };
    SliderWrapper.prototype.addSlide = function (slide, position) {
        if (!slide) {
            throw new Error("Cannot add an undefined slide");
        }
        if (position !== -1 && position !== 1) {
            throw new Error("Argument out of range, 'position' must be either 1 or -1. Value " + position);
        }
        if (position > 0) {
            this._wrapperElement.appendChild(slide);
        }
        else {
            this._wrapperElement.insertBefore(slide, this._wrapperElement.children[0]);
            this._index++;
        }
        if (position < 0) {
            var width = slide.offsetWidth;
            var style = window.getComputedStyle(slide);
            var marginLeft = style ? parseInt(style.marginLeft, 10) : 0;
            var marginRight = style ? parseInt(style.marginRight, 10) : 0;
            this.move(-(width + marginLeft + marginRight));
        }
    };
    SliderWrapper.prototype.removeSlide = function (index) {
        var slide = this._getSlide(index);
        var width = slide.offsetWidth;
        if (index <= this._index) {
            width *= -1;
            this._index--;
        }
        remove(slide);
        if (width < 0) {
            this.move(-width);
        }
    };
    SliderWrapper.prototype.getSlideDelta = function (index) {
        var currentPosition = this._position;
        if (this._isdragging === true) {
            currentPosition = this._dragStartPosition - this._position;
        }
        var newPosition = this._getWrapperSlidePosition(index);
        return newPosition - currentPosition;
    };
    SliderWrapper.prototype.getSlideProperties = function (index, delta) {
        if (delta === void 0) { delta = 0; }
        var currentOffset = this._areaOffset + this._position + delta;
        var currentLeft = currentOffset;
        var currentRight = currentOffset;
        var _a = __read([0, 0], 2), currentMarginLeft = _a[0], currentMarginRight = _a[1];
        var slide = this._getSlide(index);
        var slideIndex = parseInt(slide.getAttribute(ATTRIBUTE_INDEX), 10);
        for (var i = 0; i <= index; i++) {
            slide = this._getSlide(i);
            var slideStyle = window.getComputedStyle(slide);
            currentMarginLeft = parseInt(slideStyle.marginLeft, 10);
            currentMarginRight = parseInt(slideStyle.marginRight, 10);
            currentOffset += currentMarginLeft;
            currentLeft = currentOffset;
            currentRight = currentLeft + slide.offsetWidth;
            if (i < index) {
                currentOffset = currentRight + currentMarginRight;
            }
        }
        var visible = false;
        if ((currentLeft > this._containerMin && currentLeft < this._containerMax) ||
            (currentRight > this._containerMin && currentRight < this._containerMax)) {
            visible = true;
        }
        return {
            visible: visible,
            index: slideIndex,
            left: currentLeft,
            right: currentRight,
            width: currentRight - currentLeft,
            marginLeft: currentMarginLeft,
            marginRight: currentMarginRight
        };
    };
    SliderWrapper.prototype.getRemovableSlides = function (delta) {
        var slides = [];
        var first;
        var last;
        var index = this._wrapperElement.children.length;
        while (index > 0) {
            index--;
            var propsNow = this.getSlideProperties(index);
            var propsNew = this.getSlideProperties(index, delta);
            if (index === this._wrapperElement.children.length - 1) {
                last = propsNew;
            }
            if (index === 0) {
                first = propsNew;
            }
            if (propsNow.visible === false && propsNew.visible === false &&
                index !== this._index && this._isdragging === false) {
                slides.push(true);
            }
            else {
                slides.push(false);
            }
        }
        slides.reverse();
        var firstToKeep = slides.indexOf(false);
        var lastToKeep = slides.lastIndexOf(false);
        for (var i = firstToKeep; i < lastToKeep; i++) {
            slides[i] = false;
        }
        return {
            slides: slides,
            first: first,
            last: last
        };
    };
    SliderWrapper.prototype.getEmptySpace = function (left, right) {
        return {
            left: Math.max(Math.ceil(left - this._containerMin), 0),
            right: Math.max(Math.ceil(this._containerMax - right), 0)
        };
    };
    SliderWrapper.prototype.destroy = function () {
        this._wrapperElement = null;
        this._slideAreaElement = null;
        this._carouselElement = null;
    };
    /**
     * @deprecated use destroy() instead.
     * @todo remove in version 2.0.0
     */
    SliderWrapper.prototype.destory = function () {
        this.destroy();
    };
    return SliderWrapper;
}());
export function init() {
    searchAndInitialize(".carousel", function (e) {
        new Carousel(e);
    });
}
export default Carousel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2Nhcm91c2VsL0Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDN0UsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBQ25DLE9BQU8sS0FBSyxHQUFHLE1BQU0saUJBQWlCLENBQUE7QUFFdEMsSUFBTSxZQUFZLEdBQUcsc0JBQXNCLENBQUE7QUFDM0MsSUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQTtBQUM1QyxJQUFNLGFBQWEsR0FBRywyQkFBMkIsQ0FBQTtBQUVqRCxJQUFNLGdCQUFnQixHQUFHLHVCQUF1QixDQUFBO0FBRWhELElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQTtBQUNwQyxJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUE7QUFDaEMsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFBO0FBRWhDLElBQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFBO0FBQ3hDLElBQU0sbUJBQW1CLEdBQUcsMkJBQTJCLENBQUE7QUFFdkQsSUFBTSxjQUFjLEdBQUcsd0JBQXdCLENBQUE7QUFDL0MsSUFBTSxjQUFjLEdBQUcsd0JBQXdCLENBQUE7QUFDL0MsSUFBTSxpQkFBaUIsR0FBRywyQkFBMkIsQ0FBQTtBQUVyRCxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUE7QUFFbEMsSUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUE7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUE7QUFFdEMsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFBO0FBQzFCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQTtBQWMxQjs7R0FFRztBQUNIO0lBQXVCLDRCQUF1QjtJQTZDNUM7Ozs7T0FJRztJQUNILGtCQUFZLE9BQW9CLEVBQUUsS0FBUztRQUFULHNCQUFBLEVB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QUFJLFFBQVEsQ0FBQyxDQUFnQixDQUFDLENBQUE7SUFDaEMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxRQUFRLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvY2Fyb3VzZWwvQ2Fyb3VzZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZWFyY2hBbmRJbml0aWFsaXplLCBjbGFtcCwgcHJldmVudERlZmF1bHQsIHJlbW92ZSB9IGZyb20gXCIuLi9VdGlsc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5pbXBvcnQgKiBhcyBJbnB1dHMgZnJvbSBcIi4uL0lucHV0c1wiXG5pbXBvcnQgKiBhcyBEb20gZnJvbSBcIi4uL0RvbUZ1bmN0aW9uc1wiXG5cbmNvbnN0IFFVRVJZX1NMSURFUiA9IFwiLmNhcm91c2VsX19jb250YWluZXJcIlxuY29uc3QgUVVFUllfU0xJREVfQVJFQSA9IFwiLmNhcm91c2VsX19zbGlkZXJcIlxuY29uc3QgUVVFUllfV1JBUFBFUiA9IFwiLmNhcm91c2VsX19zbGlkZXItd3JhcHBlclwiXG5cbmNvbnN0IFFVRVJZX1BBR0lOQVRJT04gPSBcIi5jYXJvdXNlbF9fcGFnaW5hdGlvblwiXG5cbmNvbnN0IENMQVNTX0FDVElWRSA9IFwic2xpZGUtLWFjdGl2ZVwiXG5jb25zdCBDTEFTU19QUkVWID0gXCJzbGlkZS0tcHJldlwiXG5jb25zdCBDTEFTU19ORVhUID0gXCJzbGlkZS0tbmV4dFwiXG5cbmNvbnN0IENMQVNTX0JVTExFVCA9IFwicGFnaW5hdGlvbi1idWxsZXRcIlxuY29uc3QgQ0xBU1NfQlVMTEVUX0FDVElWRSA9IFwicGFnaW5hdGlvbi1idWxsZXQtLWFjdGl2ZVwiXG5cbmNvbnN0IFFVRVJZX0JUTl9QUkVWID0gXCIuY2Fyb3VzZWxfX2J1dHRvbi1wcmV2XCJcbmNvbnN0IFFVRVJZX0JUTl9ORVhUID0gXCIuY2Fyb3VzZWxfX2J1dHRvbi1uZXh0XCJcbmNvbnN0IFFVRVJZX0JUTl9XUkFQUEVSID0gXCIuY2Fyb3VzZWxfX2J1dHRvbi13cmFwcGVyXCJcblxuY29uc3QgQVRUUklCVVRFX0lOREVYID0gXCJqcy1pbmRleFwiXG5cbmNvbnN0IEFOSU1BVElPTl9EVVJBVElPTiA9IDM1MFxuY29uc3QgQU5JTUFUSU9OX0VBU0lORyA9IFwiZWFzZS1pbi1vdXRcIlxuXG5jb25zdCBUT1VDSF9EVVJBVElPTiA9IDMwMFxuY29uc3QgVE9VQ0hfREVMVEFfTUlOID0gMjVcblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZVByb3BlcnRpZXMge1xuICByaWdodDogbnVtYmVyXG4gIGxlZnQ6IG51bWJlclxuICB2aXNpYmxlOiBib29sZWFuXG4gIGluZGV4OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBtYXJnaW5MZWZ0OiBudW1iZXJcbiAgbWFyZ2luUmlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBEaXJlY3Rpb24gPSAwIHwgLTEgfCAxXG5cbi8qKlxuICogVGhlIGNhcm91c2VsIGNvbXBvbmVudCBkZWZpbml0aW9uLlxuICovXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIERvbUVsZW1lbnQ8SFRNTEVsZW1lbnQ+IHtcbiAgcHJpdmF0ZSBfc2xpZGVyOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF93cmFwcGVyOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9wYWdpbmF0aW9uPzogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBfc2xpZGVBcmVhOiBIVE1MRWxlbWVudFxuXG4gIHByaXZhdGUgX2J0bldyYXBwZXI6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgX3ByZXZDdHJsOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9uZXh0Q3RybDogSFRNTEVsZW1lbnRcblxuICBwcml2YXRlIF9zbGlkZXM6IEhUTUxFbGVtZW50W11cblxuICBwcml2YXRlIF9pbmRleDogbnVtYmVyXG4gIHByaXZhdGUgX3NsaWRlc1Blckdyb3VwOiBudW1iZXJcblxuICBwcml2YXRlIF9zbGlkZXJXcmFwcGVyOiBTbGlkZXJXcmFwcGVyXG5cbiAgcHJpdmF0ZSBfYWRkaXRpb25hbFNsaWRlTWFyZ2luOiBudW1iZXJcblxuICBwcml2YXRlIF9yZXNpemVIYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX3ByZXZIYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX25leHRIYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkXG4gIHByaXZhdGUgX3BhZ2luYXRpb25DbGlja0hhbmRsZXI6IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9rZXlkb3duSGFuZGxlcjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkXG5cbiAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hzdGFydDogKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9oYW5kbGVUb3VjaG1vdmU6IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfaGFuZGxlVG91Y2hlbmQ6IChldmVudDogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIF9icmVha3BvaW50UGhvbmUhOiBIVE1MRGl2RWxlbWVudFxuICBwcml2YXRlIF9icmVha3BvaW50VGFibGV0ITogSFRNTERpdkVsZW1lbnRcbiAgcHJpdmF0ZSBfYnJlYWtwb2ludERlc2t0b3AhOiBIVE1MRGl2RWxlbWVudFxuXG4gIHByaXZhdGUgX3RvdWNoT2Zmc2V0Pzoge1xuICAgIHg6IG51bWJlcjtcbiAgICB0aW1lOiBudW1iZXI7XG4gIH1cblxuICBwcml2YXRlIF9kZWx0YT86IHtcbiAgICB4OiBudW1iZXI7XG4gICAgbGFzdE1vdmU6IG51bWJlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2ZyYW1lV2lkdGg/OiBudW1iZXJcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIGNhcm91c2VsIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHtEb21FbGVtZW50fSBlbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgQ2Fyb3VzZWwgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBUaGUgaW5pdGlhbCBpbmRleC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBpbmRleCA9IDApIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgdGhpcy5fc2xpZGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfU0xJREVSKSEgYXMgSFRNTEVsZW1lbnRcbiAgICB0aGlzLl93cmFwcGVyID0gdGhpcy5fc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoUVVFUllfV1JBUFBFUikhIGFzIEhUTUxFbGVtZW50XG4gICAgdGhpcy5fcGFnaW5hdGlvbiA9IHRoaXMuX3NsaWRlci5xdWVyeVNlbGVjdG9yKFFVRVJZX1BBR0lOQVRJT04pIGFzIEhUTUxFbGVtZW50XG4gICAgdGhpcy5fc2xpZGVBcmVhID0gdGhpcy5fc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoUVVFUllfU0xJREVfQVJFQSkhIGFzIEhUTUxFbGVtZW50XG5cbiAgICB0aGlzLl9idG5XcmFwcGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfQlROX1dSQVBQRVIpISBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuX3ByZXZDdHJsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfQlROX1BSRVYpISBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuX25leHRDdHJsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfQlROX05FWFQpISBhcyBIVE1MRWxlbWVudFxuXG4gICAgdGhpcy5fc2xpZGVzID0gW11cblxuICAgIHRoaXMuX2luZGV4ID0gaW5kZXggfHwgMFxuICAgIHRoaXMuX3NsaWRlc1Blckdyb3VwID0gMVxuXG4gICAgdGhpcy5fc2xpZGVyV3JhcHBlciA9IG5ldyBTbGlkZXJXcmFwcGVyKHRoaXMuX3dyYXBwZXIsIHRoaXMuX3NsaWRlQXJlYSwgdGhpcy5lbGVtZW50KVxuICAgIHRoaXMuX3NsaWRlcldyYXBwZXIuaW5kZXggPSB0aGlzLl9pbmRleFxuICAgIHRoaXMuX2FkZGl0aW9uYWxTbGlkZU1hcmdpbiA9IDBcblxuICAgIHRoaXMuX3Jlc2l6ZUhhbmRsZXIgPSB0aGlzLl9vbnJlc2l6ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5fcHJldkhhbmRsZXIgPSB0aGlzLnByZXYuYmluZCh0aGlzKVxuICAgIHRoaXMuX25leHRIYW5kbGVyID0gdGhpcy5uZXh0LmJpbmQodGhpcylcbiAgICB0aGlzLl9wYWdpbmF0aW9uQ2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlUGFnaW5hdGlvbkNsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLl9rZXlkb3duSGFuZGxlciA9IHRoaXMuX2hhbmRsZUtleWRvd24uYmluZCh0aGlzKVxuXG4gICAgdGhpcy5faGFuZGxlVG91Y2hzdGFydCA9IHRoaXMuX29uVG91Y2hzdGFydC5iaW5kKHRoaXMpXG4gICAgdGhpcy5faGFuZGxlVG91Y2htb3ZlID0gdGhpcy5fb25Ub3VjaG1vdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuX2hhbmRsZVRvdWNoZW5kID0gdGhpcy5fb25Ub3VjaGVuZC5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgICB0aGlzLnNsaWRlKHRoaXMuX2luZGV4LCAwLCBmYWxzZSlcblxuICAgIHRoaXMuX3VwZGF0ZUN0cmxPZmZzZXRzKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY2Fyb3VzZWwgY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIC8vIHJlc3BvbnNpdmUgaGVscGVyc1xuICAgIHRoaXMuX2JyZWFrcG9pbnRQaG9uZSA9IG5ldyBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKVxuICAgICAgLmFkZENsYXNzKFwianMtcGhvbmVcIilcbiAgICAgIC5lbGVtZW50XG5cbiAgICB0aGlzLl9icmVha3BvaW50VGFibGV0ID0gbmV3IERvbUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIpXG4gICAgICAuYWRkQ2xhc3MoXCJqcy10YWJsZXRcIilcbiAgICAgIC5lbGVtZW50XG5cbiAgICB0aGlzLl9icmVha3BvaW50RGVza3RvcCA9IG5ldyBEb21FbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKVxuICAgICAgLmFkZENsYXNzKFwianMtZGVza3RvcFwiKVxuICAgICAgLmVsZW1lbnRcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9icmVha3BvaW50UGhvbmUpXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2JyZWFrcG9pbnRUYWJsZXQpXG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2JyZWFrcG9pbnREZXNrdG9wKVxuXG4gICAgaWYgKHRoaXMuX3ByZXZDdHJsICYmIHRoaXMuX25leHRDdHJsKSB7XG4gICAgICB0aGlzLl9wcmV2Q3RybC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fcHJldkhhbmRsZXIpXG4gICAgICB0aGlzLl9uZXh0Q3RybC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fbmV4dEhhbmRsZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3BhZ2luYXRpb25DbGlja0hhbmRsZXIpXG4gICAgfVxuXG4gICAgdGhpcy5fc2xpZGVzID0gQXJyYXkuZnJvbSh0aGlzLl93cmFwcGVyLmNoaWxkcmVuKSBhcyBIVE1MRWxlbWVudFtdXG4gICAgaWYgKHRoaXMuX3NsaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKFwiUHJvdmlkZSBhdCBsZWFzdCBvbmUgc2xpZGUgdG8gdGhlIHNsaWRlclwiKVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2xpZGUgPSB0aGlzLl9zbGlkZXNbaV1cbiAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfSU5ERVgsIFN0cmluZyhpKSlcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVSZXNwb25zaXZlT3B0aW9ucygpXG4gICAgdGhpcy5fc2xpZGVyV3JhcHBlci5pbml0aWFsaXplKClcblxuICAgIHRoaXMucmVzZXQoKVxuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2tleWRvd25IYW5kbGVyKVxuXG4gICAgdGhpcy5fc2xpZGVBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5faGFuZGxlVG91Y2hzdGFydClcbiAgICB0aGlzLl9zbGlkZUFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5faGFuZGxlVG91Y2hzdGFydClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3Jlc2l6ZUhhbmRsZXIpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB0aGlzLl9yZXNpemVIYW5kbGVyKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pc0JyZWFrcG9pbnRBY3RpdmUoYnJlYWtwb2ludDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShicmVha3BvaW50KVxuICAgIHJldHVybiBzdHlsZS52aXNpYmlsaXR5ID09PSBcInZpc2libGVcIlxuICB9XG5cbiAgcHJvdGVjdGVkIF9vbnJlc2l6ZSgpIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLl91cGRhdGVDdHJsT2Zmc2V0cygpXG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgc3VyZSB0aGUgaW5kZXggaXMgYWx3YXlzIGluIHRoZSByYW5nZSBvZiBhdmFpbGFibGUgc2xpZGVcbiAgICogSW4gY2FzZSBpdCdzIHRvIGhpZ2ggb3IgdG8gbG93IGl0IGlzIHdyYXBwZWQgYXJvdW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCB0byBhZGp1c3QgYW5kIHNhbml0aXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGluZGV4IC0gVGhlIGFkanVzdGVkIGluZGV4XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2FkanVzdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGluZGV4ICE9PSBcIm51bWJlclwiKSB7XG4gICAgICBpbmRleCA9IDBcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpbmRleCA9IHRoaXMuX3dyYXByb3VuZChpbmRleCwgMCwgdGhpcy5fc2xpZGVzLmxlbmd0aClcbiAgICB9IGVsc2UgaWYgKGluZGV4ID49IHRoaXMuX3NsaWRlcy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ICU9IHRoaXMuX3NsaWRlcy5sZW5ndGhcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuX3NsaWRlc1Blckdyb3VwKSAqIHRoaXMuX3NsaWRlc1Blckdyb3VwXG4gIH1cblxuICBwcm90ZWN0ZWQgX3dyYXByb3VuZChuOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIGlmIChuID49IG1heCkge1xuICAgICAgcmV0dXJuIG1pblxuICAgIH1cblxuICAgIGlmIChuIDwgbWluKSB7XG4gICAgICByZXR1cm4gbWF4IC0gMVxuICAgIH1cblxuICAgIHJldHVybiBuXG4gIH1cblxuICBwcm90ZWN0ZWQgX3dyYXByb3VuZENvdW50KGE6IG51bWJlciwgYjogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBpZiAoYSA8IG1pbiB8fCBhID49IG1heCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBcmd1bWVudCAnYScgaXMgb3V0IG9mIHJhbmdlLCBWYWx1ZTogJHthfSBNaW46ICR7bWlufSwgTWF4OiAke21heH1gKVxuICAgIH1cblxuICAgIGlmIChiIDwgbWluIHx8IGIgPj0gbWF4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFyZ3VtZW50ICdiJyBpcyBvdXQgb2YgcmFuZ2UsIFZhbHVlOiAke2J9IE1pbjogJHttaW59LCBNYXg6ICR7bWF4fWApXG4gICAgfVxuXG4gICAgbGV0IGkgPSAwXG4gICAgd2hpbGUgKGEgIT09IGIpIHtcbiAgICAgIGkrK1xuICAgICAgYSA9IHRoaXMuX3dyYXByb3VuZChhICsgZGlyZWN0aW9uLCBtaW4sIG1heClcbiAgICB9XG5cbiAgICByZXR1cm4gaVxuICB9XG5cbiAgcHJvdGVjdGVkIF91cGRhdGVDdHJsT2Zmc2V0cygpIHtcbiAgICBpZiAoIXRoaXMuX25leHRDdHJsIHx8ICF0aGlzLl9wcmV2Q3RybCB8fCAhdGhpcy5fYnRuV3JhcHBlcikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHByZXZDdHJsTWFyZ2luID0gMFxuICAgIGxldCBuZXh0Q3RybE1hcmdpbiA9IDBcblxuICAgIGlmICh0aGlzLl9zbGlkZXNQZXJHcm91cCA+IDEpIHtcbiAgICAgIGxldCB3cmFwcGVyUmVjdCA9IHRoaXMuX2J0bldyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgY29uc3QgcHJldlNsaWRlQ291bnQgPSBNYXRoLmZsb29yKDAuNSAqIHRoaXMuX3NsaWRlc1Blckdyb3VwKVxuICAgICAgY29uc3QgcmlnaHRJbmRleCA9IHRoaXMuX3NsaWRlcldyYXBwZXIuaW5kZXggKyBwcmV2U2xpZGVDb3VudCArIDFcblxuICAgICAgbGV0IGxlZnRJbmRleCA9IHRoaXMuX3NsaWRlcldyYXBwZXIuaW5kZXggLSAxXG4gICAgICBpZiAodGhpcy5fc2xpZGVzUGVyR3JvdXAgJSAyICE9PSAwKSB7XG4gICAgICAgIGxlZnRJbmRleCAtPSBwcmV2U2xpZGVDb3VudFxuICAgICAgfVxuXG4gICAgICBpZiAoKGxlZnRJbmRleCA+PSAwICYmIGxlZnRJbmRleCA8IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoKSAmJlxuICAgICAgICAocmlnaHRJbmRleCA+PSAwICYmIHJpZ2h0SW5kZXggPCB0aGlzLl93cmFwcGVyLmNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgbGV0IGxlZnRTbGlkZSA9IHRoaXMuX3NsaWRlcldyYXBwZXIuZ2V0U2xpZGVQcm9wZXJ0aWVzKGxlZnRJbmRleClcbiAgICAgICAgbGV0IHJpZ2h0U2xpZGUgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldFNsaWRlUHJvcGVydGllcyhyaWdodEluZGV4KVxuXG4gICAgICAgIGxldCBidG5XaWR0aCA9IHRoaXMuX3ByZXZDdHJsLm9mZnNldFdpZHRoXG4gICAgICAgIGlmIChidG5XaWR0aCA8PSAwKSB7XG4gICAgICAgICAgYnRuV2lkdGggPSA2MFxuICAgICAgICB9XG5cbiAgICAgICAgcHJldkN0cmxNYXJnaW4gPSBsZWZ0U2xpZGUucmlnaHQgLSB3cmFwcGVyUmVjdC5sZWZ0IC0gYnRuV2lkdGhcbiAgICAgICAgbmV4dEN0cmxNYXJnaW4gPSB3cmFwcGVyUmVjdC5yaWdodCAtIHJpZ2h0U2xpZGUubGVmdCAtIGJ0bldpZHRoXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxlZnQgPSBwcmV2Q3RybE1hcmdpbiAhPT0gMCA/IGAke3ByZXZDdHJsTWFyZ2lufXB4YCA6IFwiXCJcbiAgICB0aGlzLl9wcmV2Q3RybC5zdHlsZS5sZWZ0ID0gbGVmdFxuXG4gICAgbGV0IHJpZ2h0ID0gbmV4dEN0cmxNYXJnaW4gIT09IDAgPyBgJHtuZXh0Q3RybE1hcmdpbn1weGAgOiBcIlwiXG4gICAgdGhpcy5fbmV4dEN0cmwuc3R5bGUucmlnaHQgPSByaWdodFxuICB9XG5cbiAgcHJvdGVjdGVkIF91cGRhdGVBY3RpdmVTbGlkZXMobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBwcmV2U2xpZGVDb3VudCA9IE1hdGguZmxvb3IoMC41ICogKHRoaXMuX3NsaWRlc1Blckdyb3VwIC0gMSkpXG4gICAgY29uc3QgZXZlbkdyb3VwID0gdGhpcy5fc2xpZGVzUGVyR3JvdXAgJSAyID09PSAwXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzbGlkZSA9IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW5baV1cblxuICAgICAgaWYgKGkgPT09IG5leHRJbmRleCB8fCAoZXZlbkdyb3VwICYmIGkgPT09IG5leHRJbmRleCArIDEpKSB7XG4gICAgICAgIERvbS5hZGRDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKHNsaWRlLCBDTEFTU19BQ1RJVkUpXG4gICAgICB9XG5cbiAgICAgIGlmIChpIDwgbmV4dEluZGV4ICYmIGkgPj0gbmV4dEluZGV4IC0gcHJldlNsaWRlQ291bnQpIHtcbiAgICAgICAgRG9tLmFkZENsYXNzKHNsaWRlLCBDTEFTU19QUkVWKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKHNsaWRlLCBDTEFTU19QUkVWKVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA+IG5leHRJbmRleCAmJiAoaSA8PSBuZXh0SW5kZXggKyBwcmV2U2xpZGVDb3VudCB8fCAoZXZlbkdyb3VwICYmIGkgPD0gbmV4dEluZGV4ICsgMSArIHByZXZTbGlkZUNvdW50KSkpIHtcbiAgICAgICAgRG9tLmFkZENsYXNzKHNsaWRlLCBDTEFTU19ORVhUKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKHNsaWRlLCBDTEFTU19ORVhUKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFuZCBjcmVhdGVzIHRoZSBwYWdpbmF0aW9uIGJ1bGxldHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3VwZGF0ZVBhZ2luYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgdG8gPSB0aGlzLl9pbmRleFxuXG4gICAgbGV0IGJ1bGxldHMgPSB0aGlzLl9wYWdpbmF0aW9uLmNoaWxkcmVuXG4gICAgbGV0IHRvdGFsSXRlbXMgPSBNYXRoLm1heCh0aGlzLl9zbGlkZXMubGVuZ3RoLCBidWxsZXRzLmxlbmd0aClcbiAgICBsZXQgc2xpZGVDb3VudCA9IE1hdGguY2VpbCh0aGlzLl9zbGlkZXMubGVuZ3RoIC8gdGhpcy5fc2xpZGVzUGVyR3JvdXApXG4gICAgbGV0IGFjdGl2ZVNsaWRlSW5kZXggPSBNYXRoLmZsb29yKHRvIC8gdGhpcy5fc2xpZGVzUGVyR3JvdXApXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsSXRlbXM7IGkrKykge1xuICAgICAgbGV0IGJ1bGxldFxuXG4gICAgICBpZiAoYnVsbGV0cy5sZW5ndGggPiBpKSB7XG4gICAgICAgIGlmIChidWxsZXRzLmxlbmd0aCA8PSBzbGlkZUNvdW50KSB7XG4gICAgICAgICAgYnVsbGV0ID0gYnVsbGV0c1tpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbW92ZShidWxsZXRzW2ldKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGkgPCBzbGlkZUNvdW50KSB7XG4gICAgICAgIGJ1bGxldCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgLmFkZENsYXNzKENMQVNTX0JVTExFVClcbiAgICAgICAgICAuZWxlbWVudFxuICAgICAgICB0aGlzLl9wYWdpbmF0aW9uLmFwcGVuZENoaWxkKGJ1bGxldClcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1bGxldCAmJiBpIDwgc2xpZGVDb3VudCkge1xuICAgICAgICBpZiAoaSA9PT0gYWN0aXZlU2xpZGVJbmRleCkge1xuICAgICAgICAgIERvbS5hZGRDbGFzcyhidWxsZXQsIENMQVNTX0JVTExFVF9BQ1RJVkUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRG9tLnJlbW92ZUNsYXNzKGJ1bGxldCwgQ0xBU1NfQlVMTEVUX0FDVElWRSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfaGFuZGxlUGFnaW5hdGlvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIURvbS5oYXNDbGFzcyhlLnRhcmdldCBhcyBFbGVtZW50LCBDTEFTU19CVUxMRVQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgaW5kZXggPSBBcnJheS5mcm9tKHRoaXMuX3BhZ2luYXRpb24hLmNoaWxkcmVuKS5pbmRleE9mKGUudGFyZ2V0IGFzIEVsZW1lbnQpXG4gICAgbGV0IHNsaWRlTnVtYmVyID0gaW5kZXggKiB0aGlzLl9zbGlkZXNQZXJHcm91cFxuXG4gICAgdGhpcy5zbGlkZVRvKHNsaWRlTnVtYmVyKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgbGV0IGtleWNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXG5cbiAgICBzd2l0Y2ggKGtleWNvZGUpIHtcbiAgICAgIGNhc2UgSW5wdXRzLktFWV9BUlJPV19MRUZUOlxuICAgICAgICB0aGlzLnByZXYoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBJbnB1dHMuS0VZX0FSUk9XX1JJR0hUOlxuICAgICAgICB0aGlzLm5leHQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBJbnB1dHMuS0VZX0VTQ0FQRTpcbiAgICAgICAgdGhpcy5lbGVtZW50LmJsdXIoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uVG91Y2hzdGFydChldmVudDogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCB0b3VjaCA9IChldmVudCBhcyBUb3VjaEV2ZW50KS50b3VjaGVzID8gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLnRvdWNoZXNbMF0gOiBldmVudCBhcyBNb3VzZUV2ZW50XG5cbiAgICB0aGlzLl9zbGlkZUFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9oYW5kbGVUb3VjaHN0YXJ0KVxuICAgIHRoaXMuX3NsaWRlQXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9oYW5kbGVUb3VjaHN0YXJ0KVxuXG4gICAgdGhpcy5fc2xpZGVyV3JhcHBlci5iZWdpbkRyYWcoKVxuICAgIGNvbnN0IHsgcGFnZVggfSA9IHRvdWNoXG5cbiAgICB0aGlzLl90b3VjaE9mZnNldCA9IHtcbiAgICAgIHg6IHBhZ2VYLFxuICAgICAgdGltZTogRGF0ZS5ub3coKVxuICAgIH1cblxuICAgIHRoaXMuX2RlbHRhID0ge1xuICAgICAgeDogMCxcbiAgICAgIGxhc3RNb3ZlOiBwYWdlWFxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlVG91Y2htb3ZlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5faGFuZGxlVG91Y2htb3ZlKVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlVG91Y2hlbmQpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5faGFuZGxlVG91Y2hlbmQpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX2hhbmRsZVRvdWNoZW5kKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vblRvdWNobW92ZShldmVudDogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCB0b3VjaCA9IChldmVudCBhcyBUb3VjaEV2ZW50KS50b3VjaGVzID8gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLnRvdWNoZXNbMF0gOiBldmVudCBhcyBNb3VzZUV2ZW50XG4gICAgY29uc3QgeyBwYWdlWCB9ID0gdG91Y2hcblxuICAgIGxldCBkZWx0YU1vdmUgPSBwYWdlWCAtIHRoaXMuX2RlbHRhIS5sYXN0TW92ZVxuXG4gICAgdGhpcy5fZGVsdGEgPSB7XG4gICAgICB4OiBwYWdlWCAtIHRoaXMuX3RvdWNoT2Zmc2V0IS54LFxuICAgICAgbGFzdE1vdmU6IHBhZ2VYXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RvdWNoT2Zmc2V0KSB7XG4gICAgICBwcmV2ZW50RGVmYXVsdChldmVudClcblxuICAgICAgdGhpcy5fc2xpZGVyV3JhcHBlci5tb3ZlKGRlbHRhTW92ZSlcbiAgICAgIHRoaXMuX2Nsb25lU2xpZGVzVG9GaXRXcmFwcGVyKGZhbHNlLCBkZWx0YU1vdmUpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vblRvdWNoZW5kKCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5fdG91Y2hPZmZzZXQgPyBEYXRlLm5vdygpIC0gdGhpcy5fdG91Y2hPZmZzZXQudGltZSA6IHVuZGVmaW5lZFxuXG4gICAgY29uc3QgaXNWYWxpZCA9IE51bWJlcihkdXJhdGlvbikgPCBUT1VDSF9EVVJBVElPTiAmJlxuICAgICAgTWF0aC5hYnModGhpcy5fZGVsdGEhLngpID4gVE9VQ0hfREVMVEFfTUlOIHx8XG4gICAgICBNYXRoLmFicyh0aGlzLl9kZWx0YSEueCkgPiB0aGlzLl9mcmFtZVdpZHRoISAvIDNcblxuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBjbGFtcCh0aGlzLl9kZWx0YSEueCwgLTEsIDEpICogLTEgYXMgRGlyZWN0aW9uXG4gICAgICB0aGlzLnNsaWRlKGZhbHNlLCBkaXJlY3Rpb24sIHRydWUpXG5cbiAgICAgIHRoaXMuX3NsaWRlcldyYXBwZXIuZW5kRHJhZygpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNsaWRlIGJhY2sgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBkcmFnIG9wZXJhdGlvblxuICAgICAgdGhpcy5fc2xpZGVyV3JhcHBlci5jYW5jZWxEcmFnKClcbiAgICB9XG5cbiAgICB0aGlzLl90b3VjaE9mZnNldCA9IHVuZGVmaW5lZFxuXG4gICAgdGhpcy5fc2xpZGVBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5faGFuZGxlVG91Y2hzdGFydClcbiAgICB0aGlzLl9zbGlkZUFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5faGFuZGxlVG91Y2hzdGFydClcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlVG91Y2htb3ZlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZVRvdWNoZW5kKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuX2hhbmRsZVRvdWNoZW5kKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5faGFuZGxlVG91Y2htb3ZlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl9oYW5kbGVUb3VjaGVuZClcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVkIHBhcmFtZXRlcnMgaW4gcmVnYXJkIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIHJlc3BvbnNpdmVcbiAgICogYnJlYWtwb2ludC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfdXBkYXRlUmVzcG9uc2l2ZU9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMuX2lzQnJlYWtwb2ludEFjdGl2ZSh0aGlzLl9icmVha3BvaW50UGhvbmUpKSB7XG4gICAgICB0aGlzLl9zbGlkZXNQZXJHcm91cCA9IDFcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNCcmVha3BvaW50QWN0aXZlKHRoaXMuX2JyZWFrcG9pbnRUYWJsZXQpKSB7XG4gICAgICB0aGlzLl9zbGlkZXNQZXJHcm91cCA9IDJcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNCcmVha3BvaW50QWN0aXZlKHRoaXMuX2JyZWFrcG9pbnREZXNrdG9wKSkge1xuICAgICAgdGhpcy5fc2xpZGVzUGVyR3JvdXAgPSAzXG4gICAgfVxuXG4gICAgdGhpcy5fc2xpZGVyV3JhcHBlci5zbGlkZXNQZXJHcm91cCA9IHRoaXMuX3NsaWRlc1Blckdyb3VwXG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHRoZSByZXF1ZXN0ZWQgc2xpZGUgYW5kIGFkZHMgaXQgdG8gdGhlIHNsaWRlci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gVGhlIG9yaWdpbmFsIHNsaWRlIGluZGV4IG9mIHRoZSB0ZW1wbGF0ZSBzbGlkZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uIC0gVGhlIGRpcmVjdGlvbiBpbiB3aGljaCB0byBhZGQgdGhlIHNsaWRlcywgLTEgZm9yIGxlZnQsIDEgZm9yIHJpZ2h0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2Nsb25lU2xpZGUoaW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICBsZXQgY2xvbmUgPSB0aGlzLl9zbGlkZXNbaW5kZXhdLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudFxuICAgIERvbS5yZW1vdmVDbGFzcyhjbG9uZSwgQ0xBU1NfQUNUSVZFKVxuICAgIERvbS5yZW1vdmVDbGFzcyhjbG9uZSwgQ0xBU1NfUFJFVilcbiAgICBEb20ucmVtb3ZlQ2xhc3MoY2xvbmUsIENMQVNTX05FWFQpXG5cbiAgICB0aGlzLl9zbGlkZXJXcmFwcGVyLmFkZFNsaWRlKGNsb25lLCBkaXJlY3Rpb24pXG5cbiAgICBsZXQgc2xpZGVNYXJnaW4gPSB0aGlzLl9hZGRpdGlvbmFsU2xpZGVNYXJnaW4gPiAwID8gYCR7dGhpcy5fYWRkaXRpb25hbFNsaWRlTWFyZ2lufXB4YCA6IFwiXCJcbiAgICBjbG9uZS5zdHlsZS5tYXJnaW5MZWZ0ID0gc2xpZGVNYXJnaW5cbiAgICBjbG9uZS5zdHlsZS5tYXJnaW5SaWdodCA9IHNsaWRlTWFyZ2luXG5cbiAgICByZXR1cm4gY2xvbmUub2Zmc2V0V2lkdGhcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgYW5kIGFkZHMgdGhlIHJlcXVlc3RlZCBhbW1vdW50IG9mIHNsaWRlcy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNsaWRlQ291bnQgLSBUaGUgbnVtYmVyIG9mIHNsaWRlcyB0byBhZGRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIFRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggdG8gYWRkIHRoZSBzbGlkZXMsIC0xIGZvciBsZWZ0LCAxIGZvciByaWdodFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9jbG9uZVNsaWRlc0J5Q291bnQoc2xpZGVDb3VudDogbnVtYmVyLCBkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgIGxldCBvcmlnaW5hbEluZGV4ID0gZGlyZWN0aW9uIDwgMCA/IDAgOiB0aGlzLl93cmFwcGVyLmNoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCh0aGlzLl93cmFwcGVyLmNoaWxkcmVuW29yaWdpbmFsSW5kZXhdLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfSU5ERVgpISwgMTApXG5cbiAgICB3aGlsZSAoc2xpZGVDb3VudCA+IDApIHtcbiAgICAgIGluZGV4ID0gdGhpcy5fd3JhcHJvdW5kKGluZGV4ICsgZGlyZWN0aW9uLCAwLCB0aGlzLl9zbGlkZXMubGVuZ3RoKVxuICAgICAgdGhpcy5fY2xvbmVTbGlkZShpbmRleCwgZGlyZWN0aW9uKVxuICAgICAgc2xpZGVDb3VudC0tXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNjcm9sbCBjbG91bnQgYW5kIGluc2VydHMgdGhlIHJlcXVpcmVkIGFtbW91bnQgb2Ygc2xpZGVzXG4gICAqIGluIHRoZSBhcHJvcHJpYXRlIGRpcmVjdGlvbi5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5leHRJbmRleCAtIFRoZSBzbGlkZSB0byBzY3JvbGwgdG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIFRoZSBkaXJlY3Rpb24gb2YgdGhlIHNjcm9sbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9jbG9uZVNsaWRlc0J5U2Nyb2xsQ291bnQobmV4dEluZGV4OiBudW1iZXIsIGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgc2Nyb2xsQ291bnQgPSB0aGlzLl93cmFwcm91bmRDb3VudCh0aGlzLl9pbmRleCwgbmV4dEluZGV4LCAwLCB0aGlzLl9zbGlkZXMubGVuZ3RoLCBkaXJlY3Rpb24pXG5cbiAgICBjb25zdCBvdXRlclNsaWRlUHJvcHMgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldFNsaWRlUHJvcGVydGllcyhkaXJlY3Rpb24gPiAwID8gdGhpcy5fd3JhcHBlci5jaGlsZHJlbi5sZW5ndGggLSAxIDogMClcbiAgICBjb25zdCBpbmRleFRvT3V0ZXJTbGlkZUNvdW50ID0gdGhpcy5fd3JhcHJvdW5kQ291bnQodGhpcy5faW5kZXgsIG91dGVyU2xpZGVQcm9wcy5pbmRleCwgMCwgdGhpcy5fc2xpZGVzLmxlbmd0aCwgZGlyZWN0aW9uKVxuXG4gICAgY29uc3Qgc2xpZGVzVG9JbnNlcnQgPSBzY3JvbGxDb3VudCAtIGluZGV4VG9PdXRlclNsaWRlQ291bnRcbiAgICBpZiAoc2xpZGVzVG9JbnNlcnQgPiAwKSB7XG4gICAgICB0aGlzLl9jbG9uZVNsaWRlc0J5Q291bnQoc2xpZGVzVG9JbnNlcnQsIGRpcmVjdGlvbilcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Nsb25lU2xpZGVzQnlUb0ZpbGwoc3BhY2VUb0ZpbGw6IG51bWJlciwgZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICBsZXQgb3JpZ2luYWxJbmRleCA9IGRpcmVjdGlvbiA8IDAgPyAwIDogdGhpcy5fd3JhcHBlci5jaGlsZHJlbi5sZW5ndGggLSAxXG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQodGhpcy5fd3JhcHBlci5jaGlsZHJlbltvcmlnaW5hbEluZGV4XS5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0lOREVYKSEsIDEwKVxuXG4gICAgd2hpbGUgKHNwYWNlVG9GaWxsID4gMCkge1xuICAgICAgaW5kZXggPSB0aGlzLl93cmFwcm91bmQoaW5kZXggKyBkaXJlY3Rpb24sIDAsIHRoaXMuX3NsaWRlcy5sZW5ndGgpXG4gICAgICBzcGFjZVRvRmlsbCAtPSB0aGlzLl9jbG9uZVNsaWRlKGluZGV4LCBkaXJlY3Rpb24pXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jbG9uZVNsaWRlc1RvRml0V3JhcHBlcihjbGVhbnVwID0gdHJ1ZSwgc2xpZGVEZWx0YSA9IDApIHtcbiAgICBjb25zdCByZWFsSW5kZXggPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmluZGV4XG4gICAgbGV0IGZpcnN0OiBTbGlkZVByb3BlcnRpZXNcbiAgICBsZXQgbGFzdDogU2xpZGVQcm9wZXJ0aWVzXG5cbiAgICBpZiAoY2xlYW51cCA9PT0gZmFsc2UpIHtcbiAgICAgIGZpcnN0ID0gdGhpcy5fc2xpZGVyV3JhcHBlci5nZXRTbGlkZVByb3BlcnRpZXMoMClcbiAgICAgIGxhc3QgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldFNsaWRlUHJvcGVydGllcyh0aGlzLl93cmFwcGVyLmNoaWxkcmVuLmxlbmd0aCAtIDEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldFJlbW92YWJsZVNsaWRlcyhzbGlkZURlbHRhKVxuICAgICAgZmlyc3QgPSByZXN1bHQuZmlyc3QhXG4gICAgICBsYXN0ID0gcmVzdWx0Lmxhc3QhXG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgc2xpZGVzIGZyb20gdmlld1xuICAgICAgZm9yIChsZXQgaSA9IHJlc3VsdC5zbGlkZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zbGlkZXNbaV0gPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLl9zbGlkZXJXcmFwcGVyLnJlbW92ZVNsaWRlKGkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc3BhY2VUb0ZpbGwgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldEVtcHR5U3BhY2UoZmlyc3QubGVmdCwgbGFzdC5yaWdodClcblxuICAgIC8vIENoZWNrIGlmIGFkZGl0aW9uYWwgc2xpZGVzIGFyZSByZXF1aXJlZCBvbiB0aGUgbGVmdFxuICAgIGlmIChmaXJzdC52aXNpYmxlID09PSB0cnVlICYmIHNwYWNlVG9GaWxsLmxlZnQgPiAwKSB7XG4gICAgICB0aGlzLl9jbG9uZVNsaWRlc0J5VG9GaWxsKHNwYWNlVG9GaWxsLmxlZnQsIC0xKVxuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGFkZGl0aW9uYWwgc2xpZGVzIGFyZSByZXF1aXJlZCBvbiB0aGUgcmlnaHRcbiAgICBpZiAobGFzdC52aXNpYmxlID09PSB0cnVlICYmIHNwYWNlVG9GaWxsLnJpZ2h0ID4gMCkge1xuICAgICAgdGhpcy5fY2xvbmVTbGlkZXNCeVRvRmlsbChzcGFjZVRvRmlsbC5yaWdodCwgMSlcbiAgICB9XG5cbiAgICByZXR1cm4gcmVhbEluZGV4IC0gdGhpcy5fc2xpZGVyV3JhcHBlci5pbmRleFxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJlYWwgKHdyYXBwZXIpIGluZGV4IGZvciB0aGUgc2xpZGUgd2l0aCB0aGUgZ2l2ZW4gb3JpZ2luYWwgaW5kZXhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIFRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggdG8gc2VhcmNoXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSB3cmFwcGVyIGluZGV4XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldFJlYWxJbmRleEZvcihpbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgIGxldCBpID0gdGhpcy5fc2xpZGVyV3JhcHBlci5pbmRleFxuICAgIHdoaWxlIChpID49IDAgJiYgaSA8IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBsZXQgc2xpZGVJbmRleCA9IHBhcnNlSW50KHRoaXMuX3dyYXBwZXIuY2hpbGRyZW5baV0uZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9JTkRFWCkhLCAxMClcbiAgICAgIGlmIChzbGlkZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuXG4gICAgICBpICs9IGRpcmVjdGlvblxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgQ2xvdWQgbm90IGZpbmQgcmVhbCBpbmRleCBmb3Igc2xpZGUgJHtpbmRleH0gaW4gZGlyZWN0aW9uICR7ZGlyZWN0aW9ufWApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgYWN0aXZlIHNsaWRlLiBJZiB0aGUgc2xpZGVzIGFyZSBncm91cGVkIGV2ZW5seVxuICAgKiB0aGUgYWN0aXZlIHNsaWRlIGlzIGFsd2F5cyB0aGUgZmlyc3QgaW4gdGhlIGdyb3VwLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBzbGlkZS5cbiAgICovXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXhcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLl9mcmFtZVdpZHRoID0gdGhpcy5fc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAud2lkdGggfHwgdGhpcy5fc2xpZGVyLm9mZnNldFdpZHRoXG5cbiAgICB0aGlzLl91cGRhdGVSZXNwb25zaXZlT3B0aW9ucygpXG5cbiAgICBpZiAodGhpcy5fbmV4dEN0cmwpIHtcbiAgICAgICh0aGlzLl9uZXh0Q3RybCBhcyBhbnkpLmRpc2FibGVkID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJldkN0cmwpIHtcbiAgICAgICh0aGlzLl9wcmV2Q3RybCBhcyBhbnkpLmRpc2FibGVkID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2xpZGVzUGVyR3JvdXAgPT09IDEpIHtcbiAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX3NsaWRlci5wYXJlbnRFbGVtZW50ISlcbiAgICAgIGxldCBwYXJlbnRXaWR0aCA9IHRoaXMuX3NsaWRlci5wYXJlbnRFbGVtZW50IS5jbGllbnRXaWR0aCArIChwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkxlZnQhKSB8fCAwKSArIChwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblJpZ2h0ISkgfHwgMClcblxuICAgICAgbGV0IG91dGVyTWFyZ2luID0gTWF0aC5jZWlsKHBhcmVudFdpZHRoIC0gdGhpcy5fZnJhbWVXaWR0aClcbiAgICAgIHRoaXMuX2FkZGl0aW9uYWxTbGlkZU1hcmdpbiA9IE1hdGguY2VpbChvdXRlck1hcmdpbiAqIDAuNSkgKyAxXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FkZGl0aW9uYWxTbGlkZU1hcmdpbiA9IDBcbiAgICB9XG5cbiAgICBsZXQgc2xpZGVNYXJnaW4gPSB0aGlzLl9hZGRpdGlvbmFsU2xpZGVNYXJnaW4gPiAwID8gYCR7dGhpcy5fYWRkaXRpb25hbFNsaWRlTWFyZ2lufXB4YCA6IFwiXCJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzbGlkZSA9IHRoaXMuX3dyYXBwZXIuY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnRcbiAgICAgIHNsaWRlLnN0eWxlLm1hcmdpbkxlZnQgPSBzbGlkZU1hcmdpblxuICAgICAgc2xpZGUuc3R5bGUubWFyZ2luUmlnaHQgPSBzbGlkZU1hcmdpblxuICAgIH1cblxuICAgIHRoaXMuX3NsaWRlcldyYXBwZXIub25yZXNpemUoKVxuICAgIHRoaXMuX2Nsb25lU2xpZGVzVG9GaXRXcmFwcGVyKGZhbHNlKVxuICAgIHRoaXMuX3NsaWRlcldyYXBwZXIubW92ZVRvKHRoaXMuX3NsaWRlcldyYXBwZXIuaW5kZXgpXG5cbiAgICB0aGlzLl91cGRhdGVQYWdpbmF0aW9uKClcbiAgICB0aGlzLl91cGRhdGVBY3RpdmVTbGlkZXModGhpcy5fc2xpZGVyV3JhcHBlci5pbmRleClcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgc2xpZGVyIHRvIHRoZSBuZXh0IGl0ZW0uXG4gICAqL1xuICBwdWJsaWMgcHJldigpIHtcbiAgICB0aGlzLnNsaWRlKGZhbHNlLCAtMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgc2xpZGVyIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgdGhpcy5zbGlkZShmYWxzZSwgMSlcbiAgfVxuXG4gIHB1YmxpYyBzbGlkZShuZXh0SW5kZXg6IG51bWJlciB8IGZhbHNlLCBkaXJlY3Rpb24/OiBEaXJlY3Rpb24sIGFuaW1hdGUgPSB0cnVlKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0SW5kZXggIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24hID4gMCkge1xuICAgICAgICBuZXh0SW5kZXggPSB0aGlzLl9pbmRleCArIHRoaXMuX3NsaWRlc1Blckdyb3VwXG4gICAgICAgIGRpcmVjdGlvbiA9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRJbmRleCA9IHRoaXMuX2luZGV4IC0gdGhpcy5fc2xpZGVzUGVyR3JvdXBcbiAgICAgICAgZGlyZWN0aW9uID0gLTFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0SW5kZXggPSB0aGlzLl9hZGp1c3RJbmRleChuZXh0SW5kZXgpXG5cbiAgICBpZiAoIWRpcmVjdGlvbikge1xuICAgICAgZGlyZWN0aW9uID0gY2xhbXAobmV4dEluZGV4IC0gdGhpcy5faW5kZXgsIC0xLCAxKSBhcyBEaXJlY3Rpb25cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIGVub3VnaHQgc2xpZGVzIG9uIHNjcmVlblxuICAgIHRoaXMuX2Nsb25lU2xpZGVzVG9GaXRXcmFwcGVyKGZhbHNlKVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBlbm91Z2ggc2xpZGVzIGZvciB0aGUgc2Nyb2xsIG9wZXJhdGlvblxuICAgIHRoaXMuX2Nsb25lU2xpZGVzQnlTY3JvbGxDb3VudChuZXh0SW5kZXgsIGRpcmVjdGlvbilcblxuICAgIGxldCByZWFsSW5kZXggPSB0aGlzLl9nZXRSZWFsSW5kZXhGb3IobmV4dEluZGV4LCBkaXJlY3Rpb24pXG4gICAgbGV0IHNsaWRlRGVsdGEgPSB0aGlzLl9zbGlkZXJXcmFwcGVyLmdldFNsaWRlRGVsdGEocmVhbEluZGV4KVxuICAgIHJlYWxJbmRleCA9IE1hdGgubWF4KHJlYWxJbmRleCAtIHRoaXMuX2Nsb25lU2xpZGVzVG9GaXRXcmFwcGVyKHRydWUsIHNsaWRlRGVsdGEpLCAwKVxuXG4gICAgdGhpcy5fc2xpZGVyV3JhcHBlci5tb3ZlVG8ocmVhbEluZGV4LCB1bmRlZmluZWQsIGFuaW1hdGUpXG5cbiAgICAvLyBVcGRhdGUgdGhlIGFjdGl2ZSBpbmRleFxuICAgIHRoaXMuX2luZGV4ID0gbmV4dEluZGV4XG5cbiAgICAvLyBNYXJrIHNsaWRlcyBhcyBhY3RpdmVcbiAgICB0aGlzLl91cGRhdGVQYWdpbmF0aW9uKClcbiAgICB0aGlzLl91cGRhdGVBY3RpdmVTbGlkZXMocmVhbEluZGV4KVxuXG4gICAgLy8gY29uc29sZS5sb2coYFBlcmZvcm1lZCBzbGlkZSB0byAke3RoaXMuX2luZGV4fSwgcmVhbEluZGV4OiAke3RoaXMuX3NsaWRlcldyYXBwZXIuaW5kZXh9YClcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgc2xpZGVyIHRvIHRoZSBzZWxlY3RlZCBzbGlkZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBzbGlkZSB0byBzbGlkZSB0by5cbiAgICogQHBhcmFtIHtCb29sZWFufSBhbmltYXRlIC0gYFRydWVgIGlmIHRoZSBzbGlkZSBzaG91bGQgYmUgYW5pbWF0ZWQ7IG90aGVyd2lzZSBgZmFsc2VgLiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG4gICAqL1xuICBwdWJsaWMgc2xpZGVUbyhpbmRleDogbnVtYmVyLCBhbmltYXRlID0gdHJ1ZSkge1xuICAgIHRoaXMuc2xpZGUoaW5kZXgsIHVuZGVmaW5lZCwgYW5pbWF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgY29tcG9uZW50cyBhbmQgZnJlZXMgYWxsIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9yZXNpemVIYW5kbGVyKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgdGhpcy5fcmVzaXplSGFuZGxlcilcblxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9rZXlkb3duSGFuZGxlcilcbiAgICB0aGlzLl9zbGlkZUFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl9oYW5kbGVUb3VjaHN0YXJ0KVxuICAgIHRoaXMuX3NsaWRlQXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9oYW5kbGVUb3VjaHN0YXJ0KVxuXG4gICAgdGhpcy5fYnJlYWtwb2ludFBob25lLnJlbW92ZSgpXG4gICAgdGhpcy5fYnJlYWtwb2ludFRhYmxldC5yZW1vdmUoKVxuICAgIHRoaXMuX2JyZWFrcG9pbnREZXNrdG9wLnJlbW92ZSgpXG5cbiAgICBpZiAodGhpcy5fcHJldkN0cmwgJiYgdGhpcy5fbmV4dEN0cmwpIHtcbiAgICAgIHRoaXMuX3ByZXZDdHJsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9wcmV2SGFuZGxlcilcbiAgICAgIHRoaXMuX25leHRDdHJsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9uZXh0SGFuZGxlcilcbiAgICB9XG5cbiAgICAodGhpcyBhcyBhbnkpLl9wcmV2Q3RybCA9IHVuZGVmaW5lZDtcbiAgICAodGhpcyBhcyBhbnkpLl9uZXh0Q3RybCA9IHVuZGVmaW5lZFxuXG4gICAgaWYgKHRoaXMuX3BhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3BhZ2luYXRpb25DbGlja0hhbmRsZXIpO1xuICAgICAgKHRoaXMgYXMgYW55KS5fcGFnaW5hdGlvbiA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMuX3NsaWRlcldyYXBwZXIuZGVzdHJveSgpO1xuICAgICh0aGlzIGFzIGFueSkuX3NsaWRlcldyYXBwZXIgPSB1bmRlZmluZWRcbiAgfVxufVxuXG5jb25zdCBUUkFOU0ZPUk0gPSBcInRyYW5zZm9ybVwiXG5jb25zdCBEVVJBVElPTiA9IFwidHJhbnNpdGlvbkR1cmF0aW9uXCJcbmNvbnN0IFRJTUlORyA9IFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXCJcblxuY2xhc3MgU2xpZGVyV3JhcHBlciB7XG4gIHByaXZhdGUgX3dyYXBwZXJFbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9zbGlkZUFyZWFFbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIF9jYXJvdXNlbEVsZW1lbnQ6IEhUTUxFbGVtZW50XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlclxuICBwcml2YXRlIF9pbmRleDogbnVtYmVyXG5cbiAgcHJpdmF0ZSBfaXNkcmFnZ2luZzogYm9vbGVhblxuICBwcml2YXRlIF9kcmFnU3RhcnRQb3NpdGlvbj86IG51bWJlclxuXG4gIHByaXZhdGUgX2FyZWFPZmZzZXQ/OiBudW1iZXJcblxuICBwcml2YXRlIF9zbGlkZXNQZXJHcm91cCE6IG51bWJlclxuXG4gIHByaXZhdGUgX2NvbnRhaW5lck1pbiE6IG51bWJlclxuICBwcml2YXRlIF9jb250YWluZXJNYXghOiBudW1iZXJcblxuICBjb25zdHJ1Y3Rvcih3cmFwcGVyRWxlbWVudDogSFRNTEVsZW1lbnQsIHNsaWRlQXJlYUVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjYXJvdXNlbEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fd3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxlbWVudFxuICAgIHRoaXMuX3NsaWRlQXJlYUVsZW1lbnQgPSBzbGlkZUFyZWFFbGVtZW50XG4gICAgdGhpcy5fY2Fyb3VzZWxFbGVtZW50ID0gY2Fyb3VzZWxFbGVtZW50XG5cbiAgICB0aGlzLl9wb3NpdGlvbiA9IDBcbiAgICB0aGlzLl9pbmRleCA9IDBcbiAgICB0aGlzLl9pc2RyYWdnaW5nID0gZmFsc2VcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0U2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5fd3JhcHBlckVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFyZ3VtZW50ICdpbmRleCcgaXMgb3V0IG9mIHJhbmdlLCBWYWx1ZTogJHtpbmRleH0gTWluOiAwLCBNYXg6ICR7dGhpcy5fd3JhcHBlckVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMX1gKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93cmFwcGVyRWxlbWVudC5jaGlsZHJlbltpbmRleF0gYXMgSFRNTEVsZW1lbnRcbiAgfVxuXG4gIHByb3RlY3RlZCBfc2V0VHJhbnNmb3JtKHRhcmdldFBvc2l0aW9uOiBudW1iZXIsIGFuaW1hdGVkID0gZmFsc2UsIGR1cmF0aW9uID0gQU5JTUFUSU9OX0RVUkFUSU9OLCBlYXNlID0gQU5JTUFUSU9OX0VBU0lORykge1xuICAgIGlmIChhbmltYXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIGR1cmF0aW9uID0gMFxuICAgIH1cblxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5fd3JhcHBlckVsZW1lbnQuc3R5bGVcbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIHN0eWxlW0RVUkFUSU9OXSA9IGAke2R1cmF0aW9ufW1zYFxuICAgICAgc3R5bGVbVElNSU5HXSA9IGVhc2VcblxuICAgICAgLy8gTm8gc3ViIHBpeGVsIHRyYW5zaXRpb25zLlxuICAgICAgdGFyZ2V0UG9zaXRpb24gPSBNYXRoLmZsb29yKHRhcmdldFBvc2l0aW9uKVxuXG4gICAgICBzdHlsZVtUUkFOU0ZPUk1dID0gYHRyYW5zbGF0ZSgke3RhcmdldFBvc2l0aW9ufXB4LCAwKWBcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb25cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldFdyYXBwZXJTbGlkZVBvc2l0aW9uKGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCB3cmFwcGVyQ2VudGVyID0gKDAuNSAqIHRoaXMuX3dyYXBwZXJFbGVtZW50Lm9mZnNldFdpZHRoKVxuICAgIGNvbnN0IHNsaWRlID0gdGhpcy5fZ2V0U2xpZGUoaW5kZXgpXG5cbiAgICBsZXQgcmVzdWx0ID0gMFxuICAgIC8vIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIHNsaWRlIChjZW50ZXJlZClcbiAgICBpZiAodGhpcy5fc2xpZGVzUGVyR3JvdXAgJSAyID09PSAwKSB7XG4gICAgICBsZXQgc2xpZGVTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlKVxuICAgICAgbGV0IHNsaWRlTWFyZ2luID0gc2xpZGVTdHlsZSA/IHBhcnNlSW50KHNsaWRlU3R5bGUubWFyZ2luUmlnaHQhLCAxMCkgOiAwXG4gICAgICAvLyBDZW50ZXJlZCB0byB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgdHdvIGNlbnRlciBzbGlkZXMgb2YgdGhlIGdyb3VwXG4gICAgICByZXN1bHQgPSAtc2xpZGUub2Zmc2V0TGVmdCAtIChzbGlkZS5jbGllbnRXaWR0aCkgKyB3cmFwcGVyQ2VudGVyIC0gc2xpZGVNYXJnaW5cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gLXNsaWRlLm9mZnNldExlZnQgLSAoMC41ICogc2xpZGUuY2xpZW50V2lkdGgpICsgd3JhcHBlckNlbnRlclxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGdldCBwb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25cbiAgfVxuXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXhcbiAgfVxuXG4gIHNldCBpbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleFxuICB9XG5cbiAgc2V0IHNsaWRlc1Blckdyb3VwKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zbGlkZXNQZXJHcm91cCA9IHZhbHVlXG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLm9ucmVzaXplKClcbiAgfVxuXG4gIHB1YmxpYyBvbnJlc2l6ZSgpIHtcbiAgICAvLyB1cGRhdGUgdGhlIGFyZWEgb2Zmc2V0IGZvciBzbGlkZSBwb3NpdGlvbiBjYWxjdWxhdGlvblxuICAgIHRoaXMuX2FyZWFPZmZzZXQgPSB0aGlzLl9zbGlkZUFyZWFFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcblxuICAgIC8vIEdldCB0aGUgY29udGFpbmVyIGRpbWVuc2lvbnNcbiAgICBjb25zdCBjb250YWluZXJSZWN0ID0gdGhpcy5fY2Fyb3VzZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdGhpcy5fY29udGFpbmVyTWluID0gY29udGFpbmVyUmVjdC5sZWZ0XG4gICAgdGhpcy5fY29udGFpbmVyTWF4ID0gY29udGFpbmVyUmVjdC5yaWdodFxuICB9XG5cbiAgcHVibGljIGJlZ2luRHJhZygpIHtcbiAgICB0aGlzLl9pc2RyYWdnaW5nID0gdHJ1ZVxuICAgIHRoaXMuX2RyYWdTdGFydFBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb25cbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxEcmFnKCkge1xuICAgIHRoaXMuX2lzZHJhZ2dpbmcgPSBmYWxzZVxuICAgIHRoaXMuX3NldFRyYW5zZm9ybSh0aGlzLl9kcmFnU3RhcnRQb3NpdGlvbiEsIHRydWUsIEFOSU1BVElPTl9EVVJBVElPTiwgQU5JTUFUSU9OX0VBU0lORylcblxuICAgIHRoaXMuX2RyYWdTdGFydFBvc2l0aW9uID0gdW5kZWZpbmVkXG4gIH1cblxuICBwdWJsaWMgZW5kRHJhZygpIHtcbiAgICB0aGlzLl9pc2RyYWdnaW5nID0gZmFsc2VcbiAgICB0aGlzLl9kcmFnU3RhcnRQb3NpdGlvbiA9IHVuZGVmaW5lZFxuICB9XG5cbiAgcHVibGljIG1vdmUoZGVsdGE6IG51bWJlciwgYW5pbWF0ZWQgPSBmYWxzZSwgZHVyYXRpb24gPSBBTklNQVRJT05fRFVSQVRJT04sIGVhc2UgPSBBTklNQVRJT05fRUFTSU5HKSB7XG4gICAgZGVsdGEgPSBNYXRoLnRydW5jKGRlbHRhKVxuICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPD0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHRhcmdldFBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gKz0gZGVsdGFcbiAgICB0aGlzLl9zZXRUcmFuc2Zvcm0odGFyZ2V0UG9zaXRpb24sIGFuaW1hdGVkLCBkdXJhdGlvbiwgZWFzZSlcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVG8oaW5kZXg6IG51bWJlciwgZGVsdGE/OiBudW1iZXIsIGFuaW1hdGVkID0gZmFsc2UpIHtcbiAgICBsZXQgbmV3UG9zaXRpb24gPSAwXG4gICAgaWYgKCFkZWx0YSkge1xuICAgICAgbmV3UG9zaXRpb24gPSB0aGlzLl9nZXRXcmFwcGVyU2xpZGVQb3NpdGlvbihpbmRleClcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbiArPSBkZWx0YVxuICAgIH1cblxuICAgIHRoaXMuX2luZGV4ID0gaW5kZXhcbiAgICB0aGlzLl9zZXRUcmFuc2Zvcm0obmV3UG9zaXRpb24sIGFuaW1hdGVkKVxuICB9XG5cbiAgcHVibGljIGFkZFNsaWRlKHNsaWRlOiBIVE1MRWxlbWVudCwgcG9zaXRpb246IG51bWJlcikge1xuICAgIGlmICghc2xpZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYW4gdW5kZWZpbmVkIHNsaWRlXCIpXG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uICE9PSAtMSAmJiBwb3NpdGlvbiAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBcmd1bWVudCBvdXQgb2YgcmFuZ2UsICdwb3NpdGlvbicgbXVzdCBiZSBlaXRoZXIgMSBvciAtMS4gVmFsdWUgJHtwb3NpdGlvbn1gKVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA+IDApIHtcbiAgICAgIHRoaXMuX3dyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93cmFwcGVyRWxlbWVudC5pbnNlcnRCZWZvcmUoc2xpZGUsIHRoaXMuX3dyYXBwZXJFbGVtZW50LmNoaWxkcmVuWzBdKVxuICAgICAgdGhpcy5faW5kZXgrK1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgIGxldCB3aWR0aCA9IHNsaWRlLm9mZnNldFdpZHRoXG5cbiAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlKVxuICAgICAgbGV0IG1hcmdpbkxlZnQgPSBzdHlsZSA/IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQhLCAxMCkgOiAwXG4gICAgICBsZXQgbWFyZ2luUmlnaHQgPSBzdHlsZSA/IHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0ISwgMTApIDogMFxuXG4gICAgICB0aGlzLm1vdmUoLSh3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodCkpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZVNsaWRlKGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBzbGlkZSA9IHRoaXMuX2dldFNsaWRlKGluZGV4KVxuICAgIGxldCB3aWR0aCA9IHNsaWRlLm9mZnNldFdpZHRoXG5cbiAgICBpZiAoaW5kZXggPD0gdGhpcy5faW5kZXgpIHtcbiAgICAgIHdpZHRoICo9IC0xXG4gICAgICB0aGlzLl9pbmRleC0tXG4gICAgfVxuXG4gICAgcmVtb3ZlKHNsaWRlKVxuXG4gICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgdGhpcy5tb3ZlKC13aWR0aClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U2xpZGVEZWx0YShpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uXG4gICAgaWYgKHRoaXMuX2lzZHJhZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuX2RyYWdTdGFydFBvc2l0aW9uISAtIHRoaXMuX3Bvc2l0aW9uXG4gICAgfVxuXG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSB0aGlzLl9nZXRXcmFwcGVyU2xpZGVQb3NpdGlvbihpbmRleClcbiAgICByZXR1cm4gbmV3UG9zaXRpb24gLSBjdXJyZW50UG9zaXRpb25cbiAgfVxuXG4gIHB1YmxpYyBnZXRTbGlkZVByb3BlcnRpZXMoaW5kZXg6IG51bWJlciwgZGVsdGEgPSAwKTogU2xpZGVQcm9wZXJ0aWVzIHtcbiAgICBsZXQgY3VycmVudE9mZnNldCA9IHRoaXMuX2FyZWFPZmZzZXQhICsgdGhpcy5fcG9zaXRpb24gKyBkZWx0YVxuICAgIGxldCBjdXJyZW50TGVmdCA9IGN1cnJlbnRPZmZzZXRcbiAgICBsZXQgY3VycmVudFJpZ2h0ID0gY3VycmVudE9mZnNldFxuICAgIGxldCBbIGN1cnJlbnRNYXJnaW5MZWZ0LCBjdXJyZW50TWFyZ2luUmlnaHQgXSA9IFsgMCwgMCBdXG5cbiAgICBsZXQgc2xpZGUgPSB0aGlzLl9nZXRTbGlkZShpbmRleClcbiAgICBsZXQgc2xpZGVJbmRleCA9IHBhcnNlSW50KHNsaWRlLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfSU5ERVgpISwgMTApXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICBzbGlkZSA9IHRoaXMuX2dldFNsaWRlKGkpXG4gICAgICBsZXQgc2xpZGVTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlKVxuXG4gICAgICBjdXJyZW50TWFyZ2luTGVmdCA9IHBhcnNlSW50KHNsaWRlU3R5bGUubWFyZ2luTGVmdCEsIDEwKVxuICAgICAgY3VycmVudE1hcmdpblJpZ2h0ID0gcGFyc2VJbnQoc2xpZGVTdHlsZS5tYXJnaW5SaWdodCEsIDEwKVxuXG4gICAgICBjdXJyZW50T2Zmc2V0ICs9IGN1cnJlbnRNYXJnaW5MZWZ0XG4gICAgICBjdXJyZW50TGVmdCA9IGN1cnJlbnRPZmZzZXRcbiAgICAgIGN1cnJlbnRSaWdodCA9IGN1cnJlbnRMZWZ0ICsgc2xpZGUub2Zmc2V0V2lkdGhcblxuICAgICAgaWYgKGkgPCBpbmRleCkge1xuICAgICAgICBjdXJyZW50T2Zmc2V0ID0gY3VycmVudFJpZ2h0ICsgY3VycmVudE1hcmdpblJpZ2h0XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHZpc2libGUgPSBmYWxzZVxuICAgIGlmICgoY3VycmVudExlZnQgPiB0aGlzLl9jb250YWluZXJNaW4gJiYgY3VycmVudExlZnQgPCB0aGlzLl9jb250YWluZXJNYXgpIHx8XG4gICAgICAoY3VycmVudFJpZ2h0ID4gdGhpcy5fY29udGFpbmVyTWluICYmIGN1cnJlbnRSaWdodCA8IHRoaXMuX2NvbnRhaW5lck1heCkpIHtcbiAgICAgIHZpc2libGUgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc2libGUsXG4gICAgICBpbmRleDogc2xpZGVJbmRleCxcbiAgICAgIGxlZnQ6IGN1cnJlbnRMZWZ0LFxuICAgICAgcmlnaHQ6IGN1cnJlbnRSaWdodCxcbiAgICAgIHdpZHRoOiBjdXJyZW50UmlnaHQgLSBjdXJyZW50TGVmdCxcbiAgICAgIG1hcmdpbkxlZnQ6IGN1cnJlbnRNYXJnaW5MZWZ0LFxuICAgICAgbWFyZ2luUmlnaHQ6IGN1cnJlbnRNYXJnaW5SaWdodFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRSZW1vdmFibGVTbGlkZXMoZGVsdGE6IG51bWJlcikge1xuICAgIGxldCBzbGlkZXMgPSBbXVxuICAgIGxldCBmaXJzdDogU2xpZGVQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkXG4gICAgbGV0IGxhc3Q6IFNsaWRlUHJvcGVydGllcyB8IHVuZGVmaW5lZFxuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5fd3JhcHBlckVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoXG4gICAgd2hpbGUgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLVxuXG4gICAgICBsZXQgcHJvcHNOb3cgPSB0aGlzLmdldFNsaWRlUHJvcGVydGllcyhpbmRleClcbiAgICAgIGxldCBwcm9wc05ldyA9IHRoaXMuZ2V0U2xpZGVQcm9wZXJ0aWVzKGluZGV4LCBkZWx0YSlcblxuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLl93cmFwcGVyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSB7XG4gICAgICAgIGxhc3QgPSBwcm9wc05ld1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgZmlyc3QgPSBwcm9wc05ld1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHNOb3cudmlzaWJsZSA9PT0gZmFsc2UgJiYgcHJvcHNOZXcudmlzaWJsZSA9PT0gZmFsc2UgJiZcbiAgICAgICAgaW5kZXggIT09IHRoaXMuX2luZGV4ICYmIHRoaXMuX2lzZHJhZ2dpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgIHNsaWRlcy5wdXNoKHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXMucHVzaChmYWxzZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzbGlkZXMucmV2ZXJzZSgpXG5cbiAgICBsZXQgZmlyc3RUb0tlZXAgPSBzbGlkZXMuaW5kZXhPZihmYWxzZSlcbiAgICBsZXQgbGFzdFRvS2VlcCA9IHNsaWRlcy5sYXN0SW5kZXhPZihmYWxzZSlcblxuICAgIGZvciAobGV0IGkgPSBmaXJzdFRvS2VlcDsgaSA8IGxhc3RUb0tlZXA7IGkrKykge1xuICAgICAgc2xpZGVzW2ldID0gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2xpZGVzLFxuICAgICAgZmlyc3Q6IGZpcnN0IGFzIFNsaWRlUHJvcGVydGllcyxcbiAgICAgIGxhc3Q6IGxhc3QgYXMgU2xpZGVQcm9wZXJ0aWVzXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEVtcHR5U3BhY2UobGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IE1hdGgubWF4KE1hdGguY2VpbChsZWZ0IC0gdGhpcy5fY29udGFpbmVyTWluKSwgMCksXG4gICAgICByaWdodDogTWF0aC5tYXgoTWF0aC5jZWlsKHRoaXMuX2NvbnRhaW5lck1heCAtIHJpZ2h0KSwgMClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAodGhpcyBhcyBhbnkpLl93cmFwcGVyRWxlbWVudCA9IG51bGw7XG4gICAgKHRoaXMgYXMgYW55KS5fc2xpZGVBcmVhRWxlbWVudCA9IG51bGw7XG4gICAgKHRoaXMgYXMgYW55KS5fY2Fyb3VzZWxFbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBkZXN0cm95KCkgaW5zdGVhZC5cbiAgICogQHRvZG8gcmVtb3ZlIGluIHZlcnNpb24gMi4wLjBcbiAgICovXG4gIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgIHRoaXMuZGVzdHJveSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHNlYXJjaEFuZEluaXRpYWxpemUoXCIuY2Fyb3VzZWxcIiwgKGUpID0+IHtcbiAgICBuZXcgQ2Fyb3VzZWwoZSBhcyBIVE1MRWxlbWVudClcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWxcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
