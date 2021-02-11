import { toggle } from "../../core/helpers/immutability-helpers";
export const menuFlyoutReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_DISPLAY":
            return Object.assign(Object.assign({}, state), { display: action.display });
        case "SET_DIRECTION":
            return Object.assign(Object.assign({}, state), { directionState: action.directionState });
        case "SET_TOGGLE":
            return Object.assign(Object.assign({}, state), { toggle: action.toggle });
        case "SET_CONTENT_EL":
            return Object.assign(Object.assign({}, state), { contentEl: action.contentEl });
        case "SET_TOGGLE_EL":
            return Object.assign(Object.assign({}, state), { toggleEl: action.toggleEl });
        case "TOGGLE_ARROW_EL":
            return Object.assign(Object.assign({}, state), { arrowEls: toggle(state.arrowEls, action.arrowEl) });
        default:
            return state;
    }
};
