import { MenuFlyoutState } from "../../menu-flyout-store";
export declare class MenuFlyoutListItem {
    private store?;
    private unsubscribe?;
    private arrowEl?;
    el: HTMLSdxMenuFlyoutElement;
    directionState?: MenuFlyoutState["directionState"];
    /**
     * If the item is not selectable, it is neither highlighted nor has it cursor: pointer.
     */
    selectable: boolean;
    /**
     * The URL this item should link to (if it’s a regular link not handled by JS).
     */
    href: string;
    /**
     * Optional language of the page the URL points to
     */
    hreflang: string;
    /**
     * Whether the item is disabled.
     */
    disabled: boolean;
    onClick(e: MouseEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private getHostClassNames;
    private getLinkClassNames;
    render(): any;
}
