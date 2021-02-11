import { sortByAppearanceInDomTree } from "../../core/helpers/webcomponent-helpers";
import { toggle } from "../../core/helpers/immutability-helpers";
export const tabsReducer = (state = {}, action) => {
    switch (action.type) {
        case "TOGGLE_TABS_ITEM_EL":
            const tabsItemEls = toggle(state.tabsItemEls, action.tabsItemEl);
            return Object.assign(Object.assign({}, state), { tabsItemEls, tabsItemElsSorted: [...tabsItemEls].sort(sortByAppearanceInDomTree) });
        case "SELECT_TABS_ITEM_EL":
            return Object.assign(Object.assign({}, state), { selectedTabsItemEl: action.tabsItemEl });
        default:
            return state;
    }
};
