import { FlipDirection } from "../../core/types/types";
export declare class Flip {
    el: HTMLSdxFlipElement;
    /**
     * Mirror the content across one or both axes (or none at all).
     */
    direction: FlipDirection;
    componentWillLoad(): void;
    private getFlipTransformStyle;
    render(): any;
}
