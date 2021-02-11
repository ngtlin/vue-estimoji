import { Reducer } from "redux";
export interface TabsState {
    tabsItemEls: HTMLSdxTabsItemElement[];
    tabsItemElsSorted: HTMLSdxTabsItemElement[];
    selectedTabsItemEl?: HTMLSdxTabsItemElement;
}
export declare type TabsActions = {
    type: "TOGGLE_TABS_ITEM_EL";
    tabsItemEl: HTMLSdxTabsItemElement;
} | {
    type: "SELECT_TABS_ITEM_EL";
    tabsItemEl: HTMLSdxTabsItemElement;
};
export declare const tabsReducer: Reducer<TabsState, TabsActions>;
