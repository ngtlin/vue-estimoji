import { MenuFlyoutState } from "../menu-flyout-store";
export declare class MenuFlyoutContent {
    private store?;
    private unsubscribe?;
    private arrowEl?;
    el: HTMLSdxMenuFlyoutListElement;
    directionState?: MenuFlyoutState["directionState"];
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private getHostClassNames;
    render(): any;
}
