import { Reducer } from "redux";
import { InputItemType, Theme } from "./types";
export interface InputGroupState {
    typeState: InputItemType;
    themeState: Theme;
    nameState: string;
    inline: boolean;
    inputItemElsSorted: HTMLSdxInputItemElement[];
    selectedInputItemEls: HTMLSdxInputItemElement[];
    selectNextInputItemElFrom?: HTMLSdxInputItemElement;
    selectPreviousInputItemElFrom?: HTMLSdxInputItemElement;
    groupLabel: string;
}
export declare type InputGroupActions = {
    type: "SET_TYPE";
    typeState: InputGroupState["typeState"];
} | {
    type: "SET_THEME";
    themeState: InputGroupState["themeState"];
} | {
    type: "SET_NAME";
    nameState: InputGroupState["nameState"];
} | {
    type: "SET_GROUP_LABEL";
    groupLabel: string;
} | {
    type: "SET_INLINE";
    inline: InputGroupState["inline"];
} | {
    type: "SET_SELECTED_INPUT_ITEM_ELS";
    selectedInputItemEls: InputGroupState["selectedInputItemEls"];
} | {
    type: "SELECT_INPUT_ITEM_EL";
    inputItemEl: HTMLSdxInputItemElement;
} | {
    type: "SELECT_NEXT_INPUT_ITEM_EL";
    currentSelectedInputItemEl: HTMLSdxInputItemElement;
} | {
    type: "SELECT_PREVIOUS_INPUT_ITEM_EL";
    currentSelectedInputItemEl: HTMLSdxInputItemElement;
} | {
    type: "REGISTER_INPUT_ITEM_EL";
    inputItemEl: HTMLSdxInputItemElement;
} | {
    type: "UNREGISTER_INPUT_ITEM_EL";
    inputItemEl: HTMLSdxInputItemElement;
};
export declare const inputGroupReducer: Reducer<InputGroupState, InputGroupActions>;
