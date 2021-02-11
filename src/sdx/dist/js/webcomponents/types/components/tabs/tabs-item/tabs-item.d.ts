import { TabsState } from "../tabs-store";
export declare class TabsItem {
    private store?;
    private unsubscribe?;
    el: HTMLSdxTabsItemElement;
    selectedTabsItemEl?: TabsState["selectedTabsItemEl"];
    /**
     * Title of the tab.
     */
    label: string;
    /**
     * The tab is active.
     */
    selected: boolean;
    /**
     * The tab is not selectable.
     */
    disabled: boolean;
    /**
     * Which icon to display.
     */
    iconName: string;
    selectedChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private getComponentClassNames;
    render(): any;
}
