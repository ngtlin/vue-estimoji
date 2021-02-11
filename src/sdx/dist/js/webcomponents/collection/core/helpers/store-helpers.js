/**
 * A collection of useful Stencil/Redux binding helper components methods
 */
import { createStore } from "redux";
// Under this key the store will be created on a DOM node
const storeProperty = "__store";
/**
 * Creates a new store and installs it on a given component instance (on its DOM node).
 * If there's already a store installed, return that one instead.
 * @param component Component the store will be installed on.
 * @param reducer Reducer function.
 * @param initialState Default state of this store.
 */
export function createAndInstallStore(component, reducer, initialState) {
    let store = component.el[storeProperty];
    if (!store) {
        store = component.el[storeProperty] = createStore(reducer, initialState);
    }
    return store;
}
/**
 * Returns the store installed on a given component instance (on its DOM node).
 * If none is found, traverse parent elements and return the first store found.
 * @param component Component that requests the store.
 */
export function getStore(component) {
    // Look for nearest store in parent elements
    let store;
    let currentEl = component.el;
    while (!store) {
        const shadowRootHost = currentEl.getRootNode && currentEl.getRootNode().host;
        currentEl = currentEl.parentElement || shadowRootHost; // shadowRoot
        // Reached the top of the DOM tree
        if (!currentEl) {
            break;
        }
        // Found a store
        if (currentEl[storeProperty]) {
            store = currentEl[storeProperty];
            break;
        }
    }
    return store;
}
/**
 * Listen to store changes.
 * @param component The component whose state properties will be updated.
 * @param properties List of properties that will be updated (if changed).
 */
export function mapStateToProps(component, store, properties) {
    if (!store) {
        return () => undefined;
    }
    const updateComponent = () => {
        const state = store.getState();
        properties.forEach((property) => {
            if (property in component && property in state) {
                component[property] = state[property];
            }
        });
    };
    updateComponent();
    const unsubscribe = store.subscribe(updateComponent);
    return unsubscribe;
}
