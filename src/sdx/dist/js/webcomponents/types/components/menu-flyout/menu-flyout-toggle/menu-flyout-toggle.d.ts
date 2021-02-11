import { MenuFlyoutState } from "../menu-flyout-store";
export declare class MenuFlyoutToggle {
    private store?;
    private unsubscribe?;
    el: HTMLSdxMenuFlyoutToggleElement;
    display?: MenuFlyoutState["display"];
    toggle?: MenuFlyoutState["toggle"];
    onClick(): void;
    handleKeyDown(e: KeyboardEvent): void;
    componentWillLoad(): void;
    componentDidUnload(): void;
    private getAriaExpanded;
    render(): any;
}
