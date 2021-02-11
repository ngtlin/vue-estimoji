export declare class Arrow {
    /**
     * Which side it looks towards.
     */
    direction: "down" | "up" | "left" | "right";
    /**
     * Hide the arrow (animated).
     */
    hideArrow: boolean;
    /**
     * Hide the background.
     */
    hideBackground: boolean;
    /**
     * Callback that will fire when the animation starts.
     */
    animationBeginCallback: (() => void);
    private getComponentClassNames;
    render(): any;
}
