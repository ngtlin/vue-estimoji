import { ArrowPosition } from "../../types";
import { CSSRules } from "../../../../core/types/types";
export declare class AccordionItemBody {
    private initialLoad;
    private animationDuration;
    el: HTMLSdxAccordionItemBodyElement;
    /**
     * @private
     */
    arrowPosition: ArrowPosition;
    /**
     * @private
     */
    componentStyle: CSSRules;
    /**
     * Toggles body directly when initial load or with an animation.
     * @param isOpen Open state of the accordion item.
     */
    toggle(isOpen: boolean): Promise<void>;
    /**
     * Sets class to handle immediately the open/close state.
     * @param newState Open State of the accordion item.
     */
    private initiateOpenState;
    /**
     * Opens section with an animation.
     */
    private openCollapseSection;
    /**
     * Closes section with an animation.
     */
    private closeCollapseSection;
    render(): any;
}
