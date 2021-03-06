/**
 * A collection of useful Stencil/Redux binding helper components methods
 */
import { Store, Action, Reducer, Unsubscribe } from "redux";
import { Dictionary } from "../types/types";
declare type IndexableElement = Dictionary & Element;
declare type ComponentWithEl = {
    el: IndexableElement;
};
/**
 * Creates a new store and installs it on a given component instance (on its DOM node).
 * If there's already a store installed, return that one instead.
 * @param component Component the store will be installed on.
 * @param reducer Reducer function.
 * @param initialState Default state of this store.
 */
export declare function createAndInstallStore<C extends ComponentWithEl, S, A, T extends Action<A>>(component: C, reducer: Reducer<any, any>, initialState?: any): Store<S, T>;
/**
 * Returns the store installed on a given component instance (on its DOM node).
 * If none is found, traverse parent elements and return the first store found.
 * @param component Component that requests the store.
 */
export declare function getStore<C extends ComponentWithEl, S, A, T extends Action<A>>(component: C): Store<S, T> | undefined;
/**
 * Listen to store changes.
 * @param component The component whose state properties will be updated.
 * @param properties List of properties that will be updated (if changed).
 */
export declare function mapStateToProps<C extends ComponentWithEl>(component: C, store: Store<any, any> | undefined, properties: (keyof C)[]): Unsubscribe;
export {};
