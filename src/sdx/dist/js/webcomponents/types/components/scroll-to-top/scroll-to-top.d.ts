import { Position } from "./types";
export declare class ScrollToTop {
    el: HTMLSdxScrollToTopElement;
    private readonly animationDuration;
    private readonly animationTranslationY;
    /**
     * @private
     */
    position: Position;
    /**
     * @private
     */
    demo: boolean;
    private visible;
    componentWillLoad(): void;
    onWindowScroll(): void;
    onTouchStart(): void;
    private isVisible;
    private hasScrolledOverWindowHeight;
    onClick(): void;
    onVisibleChanged(): void;
    private updateVisibility;
    scrollToTop(): void;
    render(): any;
}
