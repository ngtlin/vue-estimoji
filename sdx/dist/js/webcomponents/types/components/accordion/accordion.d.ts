import { ArrowPosition } from "./types";
import { CSSRules } from "../../core/types/types";
export declare class Accordion {
    private accordionItemEls;
    private openedItems;
    el: HTMLSdxAccordionElement;
    /**
     * Position of the arrow in the header.
     */
    arrowPosition: ArrowPosition;
    /**
     * Allow to keep multiple accordion items opened.
     */
    keepOpen: boolean;
    /**
     * @private
     */
    componentStyle: CSSRules;
    arrowPropertyChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    /**
     * Fired by the MutationObserver whenever children change.
     */
    onSlotChange(): void;
    /**
     * Closes the accordion item.
     * @param index Index of the accordion item.
     */
    close(index: number): Promise<void>;
    /**
     * Closes all accordion items.
     */
    closeAll(): Promise<void>;
    /**
     * Toggle display of the accordion item.
     * @param index Index of the accordion item.
     */
    toggle(index: number): Promise<void>;
    /**
     * Opens the accordion item.
     * @param index Index of the accordion item.
     */
    open(index: number): Promise<void>;
    /**
     * Opens all accordion items.
     */
    openAll(): Promise<void>;
    private initiateComponent;
    /**
     * Sets child reference and add to every header a toggle function.
     */
    private setChildElementsReferences;
    /**
     * Modify items with initial settings.
     */
    private initiateAccordionItems;
    /**
     * Closes all items when keepOpen is false, to ensure only 1 accordion item is opened max.
     * @param ignoreIndex Index for which the closing of item will be ignored.
     */
    private closeNotIgnoredItems;
    /**
     * Track which item is opened in case keepOpen is set to true.
     * @param index Index of the opened item.
     * @param isOpen Open state of the item.
     */
    private trackOpenItems;
    render(): any;
}
