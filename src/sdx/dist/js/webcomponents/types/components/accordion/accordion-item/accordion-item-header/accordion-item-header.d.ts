import { ArrowPosition } from "../../types";
import { CSSRules } from "../../../../core/types/types";
export declare class AccordionItemHeader {
    private arrowEl;
    el: HTMLSdxAccordionItemHeaderElement;
    /**
     * @private
     */
    arrowPosition: ArrowPosition;
    /**
     * @private
     */
    expand: boolean;
    /**
     * @private
     */
    buttonStyle: CSSRules;
    /**
     * Triggers toggle information in accordion
     */
    toggle: () => void;
    arrowPositionChanged(): void;
    activeItemChanged(): void;
    componentDidLoad(): void;
    onClick(): void;
    onMouseOver(): void;
    onMouseOut(): void;
    /**
     * Closes this accordion item.
     */
    closeItem(): Promise<void>;
    /**
     * Opens this accordion item.
     */
    openItem(): Promise<void>;
    /**
     * Sets child reference of the arrow.
     */
    setChildElementsReferences(): void;
    /**
     * Sets the arrow position.
     */
    private setArrowPosition;
    /**
     * Sets the arrow direction.
     */
    private setArrowDirection;
    /**
     * Sets the arrow hover.
     */
    private setArrowHover;
    render(): any;
}
