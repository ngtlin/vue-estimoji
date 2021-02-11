import { sortByAppearanceInDomTree } from "../../core/helpers/webcomponent-helpers";
import { toggle } from "../../core/helpers/immutability-helpers";
export const selectReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTION_BATCH":
            return Object.assign(Object.assign({}, state), { selectionBatch: action.optionEls });
        case "COMMIT_SELECTION_BATCH":
            let selectionSorted = state.selectionSorted;
            if (state.selection !== state.selectionBatch) { // selection has changed
                // Sort selection by the options appearance in the DOM tree
                selectionSorted = state.selectionBatch.concat().sort((a, b) => {
                    const aIndex = state.optionElsSorted.indexOf(a);
                    const bIndex = state.optionElsSorted.indexOf(b);
                    if (aIndex > bIndex) {
                        return 1;
                    }
                    if (aIndex < bIndex) {
                        return -1;
                    }
                    return 0;
                });
            }
            return Object.assign(Object.assign({}, state), { selection: state.selectionBatch, selectionSorted });
        case "SELECT":
            let selectionBatch = state.selectionBatch;
            if (action.optionEl) { // selecting a "real" option (not the placeholder)
                if (state.multiple) { // multi-select
                    const selectionIndex = selectionBatch.indexOf(action.optionEl);
                    const alreadySelected = selectionIndex > -1;
                    if (alreadySelected || action.strategy === "remove") { // remove from selection
                        selectionBatch = selectionBatch.filter((optionElFromSelection) => optionElFromSelection !== action.optionEl);
                    }
                    else { // "add" to selection
                        selectionBatch = selectionBatch.concat(action.optionEl);
                    }
                }
                else { // single select
                    const alreadySelected = selectionBatch[0] === action.optionEl;
                    if (alreadySelected) {
                        if (action.strategy === "remove") {
                            selectionBatch = [];
                        }
                    }
                    else {
                        if (action.strategy === "add") {
                            selectionBatch = [action.optionEl];
                        }
                    }
                }
            }
            else { // selecting the placeholder
                if (selectionBatch.length) {
                    selectionBatch = [];
                }
                else {
                    // NOP - batch is already empty - no need to create a new array
                }
            }
            return Object.assign(Object.assign({}, state), { selectionBatch });
        case "SET_MULTIPLE":
            return Object.assign(Object.assign({}, state), { multiple: action.multiple });
        case "SET_DIRECTION":
            return Object.assign(Object.assign({}, state), { direction: action.direction });
        case "SET_SELECT":
            return Object.assign(Object.assign({}, state), { select: action.select });
        case "SET_ANIMATION_DURATION":
            return Object.assign(Object.assign({}, state), { animationDuration: action.animationDuration });
        case "TOGGLE_OPTION_EL":
            return Object.assign(Object.assign({}, state), { optionElsBatch: toggle(state.optionElsBatch, action.optionEl) });
        case "TOGGLE_OPTGROUP_EL":
            return Object.assign(Object.assign({}, state), { optgroupElsBatch: toggle(state.optgroupElsBatch, action.optgroupEl) });
        case "COMMIT_OPTION_ELS_BATCH":
            let optionElsSorted = state.optionElsSorted;
            if (state.optionEls !== state.optionElsBatch) { // options have changed
                optionElsSorted = [...state.optionElsBatch].sort(sortByAppearanceInDomTree);
            }
            return Object.assign(Object.assign({}, state), { optionEls: state.optionElsBatch, optionElsSorted });
        case "COMMIT_OPTGROUP_ELS_BATCH":
            return Object.assign(Object.assign({}, state), { optgroupEls: state.optgroupElsBatch });
        case "SET_FILTER":
            return Object.assign(Object.assign({}, state), { filter: action.filter });
        case "SET_FILTER_FUNCTION":
            return Object.assign(Object.assign({}, state), { filterFunction: action.filterFunction });
        default:
            return state;
    }
};
