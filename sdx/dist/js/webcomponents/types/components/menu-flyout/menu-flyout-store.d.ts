import { Reducer } from "redux";
import { Direction } from "./types";
import { Display } from "../../core/types/types";
export interface MenuFlyoutState {
    display: Display;
    directionState: Direction;
    toggle: () => Promise<void>;
    arrowEls: HTMLElement[];
    contentEl?: HTMLSdxMenuFlyoutListElement | HTMLSdxMenuFlyoutCtaElement;
    toggleEl?: HTMLSdxMenuFlyoutToggleElement;
}
export declare type MenuFlyoutActions = {
    type: "SET_DISPLAY";
    display: MenuFlyoutState["display"];
} | {
    type: "SET_DIRECTION";
    directionState: MenuFlyoutState["directionState"];
} | {
    type: "SET_TOGGLE";
    toggle: MenuFlyoutState["toggle"];
} | {
    type: "SET_CONTENT_EL";
    contentEl: MenuFlyoutState["contentEl"];
} | {
    type: "SET_TOGGLE_EL";
    toggleEl: MenuFlyoutState["toggleEl"];
} | {
    type: "TOGGLE_ARROW_EL";
    arrowEl: HTMLElement;
};
export declare const menuFlyoutReducer: Reducer<MenuFlyoutState, MenuFlyoutActions>;
