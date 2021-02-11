import { sortByAppearanceInDomTree } from "../../core/helpers/webcomponent-helpers";
export const inputGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_TYPE":
            return Object.assign(Object.assign({}, state), { typeState: action.typeState });
        case "SET_THEME":
            return Object.assign(Object.assign({}, state), { themeState: action.themeState });
        case "SET_NAME":
            return Object.assign(Object.assign({}, state), { nameState: action.nameState });
        case "SET_GROUP_LABEL":
            return Object.assign(Object.assign({}, state), { groupLabel: action.groupLabel });
        case "SET_INLINE":
            return Object.assign(Object.assign({}, state), { inline: action.inline });
        case "SET_SELECTED_INPUT_ITEM_ELS":
            return Object.assign(Object.assign({}, state), { selectedInputItemEls: action.selectedInputItemEls });
        case "SELECT_INPUT_ITEM_EL":
            let selectedInputItemEls = state.selectedInputItemEls;
            if (state.typeState === "radio") {
                const alreadySelected = state.selectedInputItemEls[0] === action.inputItemEl;
                if (!alreadySelected) {
                    selectedInputItemEls = [action.inputItemEl];
                }
            }
            else { // "checkbox"
                const selectionIndex = state.selectedInputItemEls.indexOf(action.inputItemEl);
                const alreadySelected = selectionIndex > -1;
                if (alreadySelected) { // remove from selection
                    selectedInputItemEls = selectedInputItemEls.filter((inputItemElFromSelection) => inputItemElFromSelection !== action.inputItemEl);
                }
                else { // add to selection
                    selectedInputItemEls = selectedInputItemEls.concat(action.inputItemEl);
                }
            }
            return Object.assign(Object.assign({}, state), { selectedInputItemEls, selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: undefined });
        case "SELECT_NEXT_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: action.currentSelectedInputItemEl, selectPreviousInputItemElFrom: undefined });
        case "SELECT_PREVIOUS_INPUT_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectNextInputItemElFrom: undefined, selectPreviousInputItemElFrom: action.currentSelectedInputItemEl });
        case "REGISTER_INPUT_ITEM_EL":
            const inputItemEls = state.inputItemElsSorted;
            inputItemEls.push(action.inputItemEl);
            return Object.assign(Object.assign({}, state), { inputItemElsSorted: inputItemEls.sort(sortByAppearanceInDomTree) });
        case "UNREGISTER_INPUT_ITEM_EL":
            const deleteIndex = state.inputItemElsSorted.indexOf(action.inputItemEl);
            if (deleteIndex >= 0) {
                state.inputItemElsSorted.splice(deleteIndex, 1);
            }
            return state;
        default:
            return state;
    }
};
