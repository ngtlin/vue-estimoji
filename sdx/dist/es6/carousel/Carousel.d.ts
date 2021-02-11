import DomElement from "../DomElement";
export interface SlideProperties {
    right: number;
    left: number;
    visible: boolean;
    index: number;
    width: number;
    marginLeft: number;
    marginRight: number;
}
export declare type Direction = 0 | -1 | 1;
/**
 * The carousel component definition.
 */
declare class Carousel extends DomElement<HTMLElement> {
    private _slider;
    private _wrapper;
    private _pagination?;
    private _slideArea;
    private _btnWrapper;
    private _prevCtrl;
    private _nextCtrl;
    private _slides;
    private _index;
    private _slidesPerGroup;
    private _sliderWrapper;
    private _additionalSlideMargin;
    private _resizeHandler;
    private _prevHandler;
    private _nextHandler;
    private _paginationClickHandler;
    private _keydownHandler;
    private _handleTouchstart;
    private _handleTouchmove;
    private _handleTouchend;
    private _breakpointPhone;
    private _breakpointTablet;
    private _breakpointDesktop;
    private _touchOffset?;
    private _delta?;
    private _frameWidth?;
    /**
     * Creates and initializes the carousel component.
     * @param {DomElement} element - The root element of the Carousel component.
     * @param {Number} index - The initial index.
     */
    constructor(element: HTMLElement, index?: number);
    /**
     * Initializes the carousel component.
     * @private
     */
    protected _initialize(): void;
    protected _isBreakpointActive(breakpoint: HTMLDivElement): boolean;
    protected _onresize(): void;
    /**
     * Makes sure the index is always in the range of available slide
     * In case it's to high or to low it is wrapped around
     * @param {Number} index - The index to adjust and sanitize
     * @returns {Number} index - The adjusted index
     * @private
     */
    protected _adjustIndex(index: number): number;
    protected _wrapround(n: number, min: number, max: number): number;
    protected _wraproundCount(a: number, b: number, min: number, max: number, direction: Direction): number;
    protected _updateCtrlOffsets(): void;
    protected _updateActiveSlides(nextIndex: number): void;
    /**
     * Updates and creates the pagination bullets.
     * @private
     */
    protected _updatePagination(): void;
    protected _handlePaginationClick(e: MouseEvent): void;
    protected _handleKeydown(event: KeyboardEvent): void;
    protected _onTouchstart(event: TouchEvent | MouseEvent): void;
    protected _onTouchmove(event: TouchEvent | MouseEvent): void;
    protected _onTouchend(): void;
    /**
     * Updated parameters in regard to the currently active responsive
     * breakpoint.
     * @private
     */
    protected _updateResponsiveOptions(): void;
    /**
     * Clones the requested slide and adds it to the slider.
     * @param {Number} index - The original slide index of the template slide
     * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
     * @private
     */
    protected _cloneSlide(index: number, direction: number): number;
    /**
     * Clones and adds the requested ammount of slides.
     * @param {Number} slideCount - The number of slides to add
     * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
     * @private
     */
    protected _cloneSlidesByCount(slideCount: number, direction: Direction): void;
    /**
     * Calculates the scroll clount and inserts the required ammount of slides
     * in the apropriate direction.
     * @param {Number} nextIndex - The slide to scroll to
     * @param {Number} direction - The direction of the scroll
     * @private
     */
    protected _cloneSlidesByScrollCount(nextIndex: number, direction: Direction): void;
    protected _cloneSlidesByToFill(spaceToFill: number, direction: Direction): void;
    protected _cloneSlidesToFitWrapper(cleanup?: boolean, slideDelta?: number): number;
    /**
     * Gets the real (wrapper) index for the slide with the given original index
     * @param {Number} index - The index to search for
     * @param {Number} direction - The direction in which to search
     * @returns {Number} The wrapper index
     * @private
     */
    protected _getRealIndexFor(index: number, direction: Direction): number;
    /**
     * Gets the index of the current active slide. If the slides are grouped evenly
     * the active slide is always the first in the group.
     * @returns {Number} The index of the active slide.
     */
    get index(): number;
    reset(): void;
    /**
     * Moves the slider to the next item.
     */
    prev(): void;
    /**
     * Moves the slider to the previous item.
     */
    next(): void;
    slide(nextIndex: number | false, direction?: Direction, animate?: boolean): void;
    /**
     * Moves the slider to the selected slide.
     * @param {Number} index - The index of the slide to slide to.
     * @param {Boolean} animate - `True` if the slide should be animated; otherwise `false`. Defaults to `true`.
     */
    slideTo(index: number, animate?: boolean): void;
    /**
     * Destroys the components and frees all references.
     */
    destroy(): void;
}
export declare function init(): void;
export default Carousel;
