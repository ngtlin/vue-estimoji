import { Size } from "./types";
import { FlipDirection } from "../../core/types/types";
export declare class Icon {
    el: HTMLSdxSearchElement;
    /**
     * Name of the SDX icon (e.g. "icon-clear-circle").
     */
    iconName: string;
    /**
     * SDX predefined color class.
     */
    colorClass: string;
    /**
     * The dimension of the icon.
     */
    size: Size;
    /**
     * Mirror the icon.
     */
    flip: FlipDirection;
    /**
     * Hide the icon (animated).
     */
    hidden: boolean;
    /**
     * Description text read by the screen reader.
     */
    srHint: string;
    private getClassNames;
    render(): any;
}
