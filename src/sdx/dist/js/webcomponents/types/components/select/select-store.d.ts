import { Reducer } from "redux";
import { Selection, SelectDirection } from "./types";
import { SelectOption } from "./select-option/select-option";
export declare type SelectionBatchStrategy = "add" | "remove";
export interface SelectState {
    selection: Selection;
    selectionBatch: Selection;
    selectionSorted: Selection;
    multiple: boolean;
    direction: SelectDirection;
    select: (option: SelectOption, strategy: SelectionBatchStrategy, close?: boolean) => void;
    animationDuration: number;
    optionEls: HTMLSdxSelectOptionElement[];
    optionElsBatch: HTMLSdxSelectOptionElement[];
    optionElsSorted: HTMLSdxSelectOptionElement[];
    optgroupEls: HTMLSdxSelectOptgroupElement[];
    optgroupElsBatch: HTMLSdxSelectOptgroupElement[];
    filter: string;
    filterFunction: (optionEl: HTMLSdxSelectOptionElement, keyword: string) => boolean;
}
export declare type SelectActions = {
    type: "SET_SELECTION_BATCH";
    optionEls: SelectState["selection"];
} | {
    type: "COMMIT_SELECTION_BATCH";
} | {
    type: "SELECT";
    optionEl: HTMLSdxSelectOptionElement | null;
    strategy: SelectionBatchStrategy;
} | {
    type: "SET_MULTIPLE";
    multiple: SelectState["multiple"];
} | {
    type: "SET_DIRECTION";
    direction: SelectState["direction"];
} | {
    type: "SET_SELECT";
    select: SelectState["select"];
} | {
    type: "SET_ANIMATION_DURATION";
    animationDuration: SelectState["animationDuration"];
} | {
    type: "TOGGLE_OPTION_EL";
    optionEl: HTMLSdxSelectOptionElement;
} | {
    type: "COMMIT_OPTION_ELS_BATCH";
} | {
    type: "TOGGLE_OPTGROUP_EL";
    optgroupEl: HTMLSdxSelectOptgroupElement;
} | {
    type: "COMMIT_OPTGROUP_ELS_BATCH";
} | {
    type: "SET_FILTER";
    filter: SelectState["filter"];
} | {
    type: "SET_FILTER_FUNCTION";
    filterFunction: SelectState["filterFunction"];
};
export declare const selectReducer: Reducer<SelectState, SelectActions>;
