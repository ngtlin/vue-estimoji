import { AnimationName } from "./types";
export declare class Animation {
    private animationDuration;
    el: HTMLSdxAnimationElement;
    /**
     * The animation to play.
     */
    animationName?: AnimationName;
    /**
     * Callback that will fire when the animation starts.
     */
    animationBeginCallback: (() => void);
    animationNameChanged(): void;
    componentWillLoad(): void;
    render(): any;
}
